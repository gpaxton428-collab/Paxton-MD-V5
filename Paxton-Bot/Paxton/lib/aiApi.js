import { API_KEYS, ENDPOINTS, API_ROUTES } from '../endpoints.js';

const IDENTITY_PATTERN = /\b(who\s+(made|created|built|owns|developed)\s+you|who('?s| is)\s+your\s+(creator|developer|owner)|who\s+are\s+you)\b/i;
const IDENTITY_ANSWER = "I'm Paxton Tech — created by Paxton.";

function extractText(data) {
  if (!data) return null;
  if (typeof data === 'string') return data;
  const candidates = [
    data.text, data.reply, data.response, data.answer, data.result,
    data.message?.content, data.message?.text, data.data?.text,
    data.data?.reply, data.data?.response, data.choices?.[0]?.message?.content,
    data.choices?.[0]?.text, data.content?.[0]?.text
  ];
  return candidates.find(v => typeof v === 'string' && v.trim())?.trim() || null;
}

async function requestJson(url, options = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), Number(process.env.API_TIMEOUT_MS || 25000));
  try {
    const res = await fetch(url, { ...options, signal: controller.signal });
    const raw = await res.text();
    let data;
    try { data = JSON.parse(raw); } catch { data = raw; }
    if (!res.ok) throw new Error(`HTTP ${res.status}: ${extractText(data) || raw.slice(0, 300)}`);
    return data;
  } finally { clearTimeout(timer); }
}

function authHeaders(key) {
  return key ? {
    'Content-Type': 'application/json',
    'X-API-Key': key,
    'Authorization': `Bearer ${key}`
  } : { 'Content-Type': 'application/json' };
}

export async function getWolvarexAiReply(prompt, mode = 'chat') {
  const key = API_KEYS.wolvarex;
  if (!key) return null;
  const paths = mode === 'chat'
    ? [API_ROUTES.wolvarexChat, API_ROUTES.wolvarexAi]
    : [API_ROUTES.wolvarexAi, API_ROUTES.wolvarexChat];
  let lastError = null;
  for (const path of [...new Set(paths)]) {
    const url = `${ENDPOINTS.wolvarex.replace(/\/$/, '')}${path.startsWith('/') ? path : `/${path}`}`;
    try {
      const data = await requestJson(url, {
        method: 'POST',
        headers: authHeaders(key),
        body: JSON.stringify({ prompt, message: prompt, query: prompt, model: process.env.WOLVAREX_AI_MODEL || undefined })
      });
      const text = extractText(data);
      if (text) return text;
    } catch (e) { lastError = e; }
  }
  if (lastError) throw lastError;
  return null;
}

export async function getAiReply(prompt, options = {}) {
  const override = IDENTITY_PATTERN.test(prompt) ? IDENTITY_ANSWER : null;
  if (override) return override;

  try {
    const wolvarex = await getWolvarexAiReply(prompt, options.mode || 'chat');
    if (wolvarex) return wolvarex;
  } catch {}

  if (API_KEYS.anthropic) {
    const res = await requestJson('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEYS.anthropic,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: process.env.ANTHROPIC_MODEL || 'claude-sonnet-4-6',
        max_tokens: 500,
        messages: [{ role: 'user', content: prompt }]
      })
    });
    const text = extractText(res);
    if (text) return text;
  }

  if (API_KEYS.openai) {
    const res = await requestJson('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { ...authHeaders(API_KEYS.openai) },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
        max_tokens: 500,
        messages: [{ role: 'user', content: prompt }]
      })
    });
    const text = extractText(res);
    if (text) return text;
  }

  return null;
}
