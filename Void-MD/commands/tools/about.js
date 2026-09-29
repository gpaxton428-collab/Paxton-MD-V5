import { sendInteractive, quickButton, urlButton } from '../../lib/helpers/interactive.js';
import { config } from '../../config/index.js';

export default {
  name: 'about',
  alias: ['botabout', 'infox'],
  description: 'Show Void MD version, runtime and project information.',
  async execute(sock, msg, args, prefix, ctx) {
    const chatId = msg.key.remoteJid;
    const text = [
      '╭━━〔 ⚡ VOID MD V1 〕━━╮',
      `┃ Version: ${ctx.VERSION || config.version}`,
      `┃ Node: ${process.version}`,
      `┃ Uptime: ${Math.floor(process.uptime() / 3600)}h ${Math.floor((process.uptime() % 3600) / 60)}m`,
      `┃ Commands: ${ctx.getTotalCommandCount?.() ?? '—'}`,
      `┃ Status: ${ctx.isWhatsAppConnected?.() ? '🟢 Online' : '🔴 Offline'}`,
      '╰━━━━━━━━━━━━━━━━━━━━━━╯'
    ].join('\n');
    await sendInteractive(sock, chatId, {
      title: '⚡ VOID MD', text, caption: text, footer: 'Built for speed • clean controls • persistent settings',
      buttons: [
        urlButton('⭐ GitHub', 'https://github.com/gpaxton428-collab/Paxton-MD-V5'),
        quickButton('📋 Menu', `${prefix}menu`),
        quickButton('🏓 Ping', `${prefix}ping`),
        quickButton('⚙️ Settings', `${prefix}settings`)
      ],
      fallbackText: `${text}\n\n${prefix}menu • ${prefix}ping • ${prefix}settings`
    }, { quoted: msg });
  }
};
