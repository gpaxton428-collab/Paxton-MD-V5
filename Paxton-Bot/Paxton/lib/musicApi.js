import { API_KEYS, ENDPOINTS, API_ROUTES } from '../endpoints.js';

function pick(data, keys) {
  for (const key of keys) {
    const parts = key.split('.');
    let v = data;
    for (const p of parts) v = v?.[p];
    if (typeof v === 'string' && v.trim()) return v.trim();
  }
  return null;
}

async function call(url, method, body) {
  const key = API_KEYS.savplay;
  const headers = {
    'Content-Type': 'application/json',
    ...(key ? { 'X-API-Key': key, Authorization: `Bearer ${key}` } : {})
  };
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), Number(process.env.SAVPLAY_TIMEOUT_MS || 30000));
  try {
    const opts = { method, headers, signal: controller.signal };
    if (method === 'POST') opts.body = JSON.stringify(body);
    const res = await fetch(url, opts);
    const raw = await res.text();
    let data; try { data = JSON.parse(raw); } catch { data = raw; }
    if (!res.ok) throw new Error(`HTTP ${res.status}: ${typeof data === 'string' ? data.slice(0, 250) : 'Savplay request failed'}`);
    return data;
  } finally { clearTimeout(timer); }
}

export async function searchAndGetSong(query) {
  const base = ENDPOINTS.savplay.replace(/\/$/, '');
  const key = API_KEYS.savplay;
  const queryParam = `query=${encodeURIComponent(query)}`;
  const keyParam = key ? `&apikey=${encodeURIComponent(key)}` : '';
  const paths = [API_ROUTES.savplayPlay, API_ROUTES.savplaySearch];
  let lastError = null;

  for (const p of [...new Set(paths)]) {
    const path = p.startsWith('/') ? p : `/${p}`;
    for (const method of ['GET', 'POST']) {
      try {
        const url = method === 'GET'
          ? `${base}${path}?${queryParam}${keyParam}`
          : `${base}${path}`;
        const data = await call(url, method, { query, q: query, apikey: key || undefined, apiKey: key || undefined });
        const audio = pick(data, ['audio','audioUrl','download','downloadUrl','url','result.audio','result.download','data.audio','data.download']);
        const title = pick(data, ['title','name','result.title','data.title']) || query;
        const thumb = pick(data, ['thumbnail','thumb','image','result.thumbnail','data.thumbnail']);
        if (audio) return { audio, title, thumbnail: thumb, raw: data };
      } catch (e) { lastError = e; }
    }
  }
  if (lastError) throw lastError;
  return null;
}
