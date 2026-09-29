// Persistent per-message interactive action guard.
// Single-action buttons are marked complete by source message + action.
// Menu/settings navigation stays reusable; destructive/download actions do not.
const done = new Map();
const recent = new Map();
const TTL = 15 * 60 * 1000;

const reusable = /^(?:menu|settings|botsettings|help|commands|ping|alive|repo|owner|menustyle|settingsmenu|groupsettings|gsettings|groupmenu|status|statusstats|pending|togstatus|autostatus|autoreact|autoread|refresh|cancel)$/i;
const keyOf = (msg, action) => `${msg?.key?.remoteJid || ''}|${msg?.key?.id || ''}|${action || ''}`;

function sweep(now) {
  for (const [k,t] of done) if (now - t > TTL) done.delete(k);
  for (const [k,t] of recent) if (now - t > TTL) recent.delete(k);
}

export function guardInteractiveAction(msg, action, settings = {}) {
  const now = Date.now();
  sweep(now);
  if (!settings.buttonGuard) return { allowed: true, completed: false };
  const a = String(action || '').replace(/^[.$!/]/, '').split(/\s+/)[0].toLowerCase();
  if (reusable.test(a)) return { allowed: true, completed: false };
  const key = keyOf(msg, action);
  if (done.has(key) || recent.has(key)) return { allowed: false, completed: true };
  const ms = Math.max(250, Number(settings.buttonGuardMs) || 1500);
  recent.set(key, now);
  done.set(key, now);
  setTimeout(() => recent.delete(key), ms).unref?.();
  return { allowed: true, completed: false };
}
