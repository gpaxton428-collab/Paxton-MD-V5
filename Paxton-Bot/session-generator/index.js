// ============================================================
//  Paxton Tech — Session ID Generator
//  Standalone web tool. Produces a PAXTON-TECH: session
//  string to paste into SESSION_ID.
// ============================================================
import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { randomUUID } from 'crypto';
import { gzipSync } from 'zlib';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TEMP_ROOT = path.join(__dirname, 'temp_sessions');
if (!fs.existsSync(TEMP_ROOT)) fs.mkdirSync(TEMP_ROOT, { recursive: true });

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const jobs = new Map();

const RESTART_REQUIRED = 515;
const LOGGED_OUT = 401;
const MAX_RECONNECT_ATTEMPTS = 6;
const MAX_PAIRING_CODE_ATTEMPTS = 3;
const REPO_URL = process.env.GITHUB_REPO_URL || '';

function cleanupJob(job) {
    if (job.timer) { clearTimeout(job.timer); job.timer = null; }
    try { job.sock?.ev?.removeAllListeners(); } catch {}
    try { job.sock?.ws?.close(); } catch {}
    try { job.sock?.end?.(); } catch {}
    try { if (job.dir && fs.existsSync(job.dir)) fs.rmSync(job.dir, { recursive: true, force: true }); } catch {}
}

setInterval(() => {
    const now = Date.now();
    for (const [key, job] of jobs.entries()) {
        if (now - job.createdAt > 10 * 60 * 1000) {
            cleanupJob(job);
            jobs.delete(key);
        }
    }
}, 60 * 1000);

async function requestPairingCodeWithRetry(job, sock, phone, attempt = 1) {
    if (job.codeRequested) return;
    try {
        const code = await sock.requestPairingCode(phone);
        job.codeRequested = true;
        job.code = code.match(/.{1,4}/g)?.join('-') || code;
        job.status = 'code';
    } catch (error) {
        if (attempt < MAX_PAIRING_CODE_ATTEMPTS && job.status !== 'connected') {
            job.timer = setTimeout(() => requestPairingCodeWithRetry(job, sock, phone, attempt + 1), 2500);
        } else {
            job.status = 'error';
            job.error = error.message || 'Failed to request pairing code from WhatsApp.';
        }
    }
}

async function connectSocket(job, phone) {
    if (job.status === 'connected' || job.cancelled) return;

    const { default: makeWASocket, useMultiFileAuthState, fetchLatestBaileysVersion, makeCacheableSignalKeyStore, Browsers } = await import('@whiskeysockets/baileys');

    try { job.sock?.ev?.removeAllListeners(); } catch {}
    try { job.sock?.ws?.close(); } catch {}

    const { state, saveCreds } = await useMultiFileAuthState(job.dir);
    const { version } = await fetchLatestBaileysVersion();
    const silentLogger = { level: 'silent', trace(){}, debug(){}, info(){}, warn(){}, error(){}, fatal(){}, child(){ return silentLogger; } };
    const sock = makeWASocket({
        version,
        logger: silentLogger,
        browser: Browsers.ubuntu('Chrome'),
        printQRInTerminal: false,
        connectTimeoutMs: 60000,
        keepAliveIntervalMs: 20000,
        auth: { creds: state.creds, keys: makeCacheableSignalKeyStore(state.keys, silentLogger) }
    });
    job.sock = sock;
    sock.ev.on('creds.update', saveCreds);

    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update;

        if (connection === 'connecting' && !state.creds.registered && !job.codeRequested) {
            job.timer = setTimeout(() => requestPairingCodeWithRetry(job, sock, phone), 1500);
        }

        if (connection === 'open') {
            try {
                const files = {};
                const entries = fs.readdirSync(job.dir, { withFileTypes: true });
                for (const entry of entries) {
                    if (!entry.isFile()) continue;
                    const name = entry.name;
                    if (!/^[a-zA-Z0-9._-]+$/.test(name)) continue;
                    files[name] = fs.readFileSync(path.join(job.dir, name)).toString('base64');
                }
                const payload = JSON.stringify({ format: 'paxton-tech-auth-v2', createdAt: new Date().toISOString(), files });
                // Compress the complete multi-file auth bundle before encoding it.
                // This keeps the session string much shorter while retaining every
                // Baileys auth key required for restoring the connection.
                const compressed = gzipSync(Buffer.from(payload, 'utf8'), { level: 9 });
                job.sessionId = `PAXTON-TECH:GZ1:${compressed.toString('base64url')}`;
                job.status = 'connected';

                (async () => {
                    try {
                        const rawJid = sock.user?.id || '';
                        const userJid = rawJid.includes('@')
                            ? `${rawJid.split(':')[0].split('@')[0]}@${rawJid.split('@')[1]}`
                            : `${rawJid.split(':')[0]}@s.whatsapp.net`;
                        const text = `✅ *Paxton Tech — Linked!*\n\n` +
                                  `Your compact session string is ready. Copy it into your bot's \`SESSION_ID\`:\n\n` +
                                  `${job.sessionId}\n\n` +
                                  (REPO_URL ? `📦 Repo: ${REPO_URL}\n\n` : '') +
                                  `⚠️ Keep this private — it gives access to this WhatsApp account.`;
                        await sock.sendMessage(userJid, { text });
                    } catch (error) {
                        job.inboxError = error?.message || 'Could not send the session to the WhatsApp inbox.';
                    }
                })();
            } catch (error) {
                job.status = 'error';
                job.error = `Connected but failed to read session: ${error.message}`;
            }
            setTimeout(() => cleanupJob(job), 5000);
        }

        if (connection === 'close') {
            if (job.status === 'connected' || job.cancelled) return;
            const statusCode = lastDisconnect?.error?.output?.statusCode;

            if (statusCode === LOGGED_OUT) {
                job.status = 'error';
                job.error = 'Linking was cancelled or logged out on the phone. Please try again.';
                cleanupJob(job);
                return;
            }

            job.reconnectAttempts = (job.reconnectAttempts || 0) + 1;
            if (job.reconnectAttempts > MAX_RECONNECT_ATTEMPTS) {
                job.status = 'error';
                job.error = 'Could not finish connecting after the code was entered. Please try again.';
                cleanupJob(job);
                return;
            }

            const delayMs = statusCode === RESTART_REQUIRED ? 300 : Math.min(1500 * job.reconnectAttempts, 6000);
            job.timer = setTimeout(() => {
                connectSocket(job, phone).catch((error) => {
                    job.status = 'error';
                    job.error = error.message;
                });
            }, delayMs);
        }
    });
}

function createJob(phone) {
    const sessionKey = randomUUID();
    const dir = path.join(TEMP_ROOT, sessionKey);
    fs.mkdirSync(dir, { recursive: true });
    const job = {
        status: 'connecting',
        code: null,
        codeRequested: false,
        sessionId: null,
        error: null,
        sock: null,
        dir,
        reconnectAttempts: 0,
        cancelled: false,
        timer: null,
        createdAt: Date.now()
    };
    jobs.set(sessionKey, job);
    return { sessionKey, job };
}

app.post('/api/request-code', async (req, res) => {
    const phone = (req.body?.phone || '').replace(/[^0-9]/g, '');
    if (phone.length < 8) return res.status(400).json({ error: 'Enter a valid phone number with country code, no +' });

    const { sessionKey, job } = createJob(phone);
    res.json({ sessionKey });

    try {
        await connectSocket(job, phone);
    } catch (error) {
        job.status = 'error';
        job.error = error.message;
    }
});

app.get('/api/status/:sessionKey', (req, res) => {
    const job = jobs.get(req.params.sessionKey);
    if (!job) return res.status(404).json({ error: 'Session not found or expired' });
    res.json({ status: job.status, code: job.code, sessionId: job.sessionId, error: job.error, repoUrl: REPO_URL });
});

const PORT = process.env.PORT || process.env.SESSION_GEN_PORT || 4000;
app.listen(PORT, () => {
    console.log(`🔑 Paxton Tech session generator running on port ${PORT}`);
});
