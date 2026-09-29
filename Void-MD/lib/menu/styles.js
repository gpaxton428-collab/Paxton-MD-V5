// Void MD menu renderer.
// The default style is intentionally distinct from the old Void MD boxed-panel look.
// Commands remain vertical for readability, but the visual language is a VOID/terminal grid.
export const STYLE_COUNT = 4;

export const STYLE_DESCRIPTIONS = {
  1: 'Void Grid — terminal-inspired panels with feature header',
  2: 'Void Line — clean command stream',
  3: 'Void Index — numbered command matrix',
  4: 'Void Cards — angled command sections'
};

const BOLD = '𝐀𝐁𝐂𝐃𝐄𝐅𝐆𝐇𝐈𝐉𝐊𝐋𝐌𝐍𝐎𝐏𝐐𝐑𝐒𝐓𝐔𝐕𝐖𝐗𝐘𝐙𝐚𝐛𝐜𝐝𝐞𝐟𝐠𝐡𝐢𝐣𝐤𝐥𝐦𝐧𝐨𝐩𝐪𝐫𝐬𝐭𝐮𝐯𝐰𝐱𝐲𝐳𝟎𝟏𝟐𝟑𝟒𝟓𝟔𝟕𝟖𝟗';
const PLAIN = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const boldSerif = (s) => [...String(s)].map((c) => { const i = PLAIN.indexOf(c); return i === -1 ? c : [...BOLD][i]; }).join('');
const tag = (i) => (i.flagged ? ' ⚠️' : '');

const cmdLines = (items, prefix, numbered = false, start = 1) =>
  items.map((i, n) => `${numbered ? `${start + n}. ` : ''}${prefix}${i.name}${tag(i)}`);

const block = (items, prefix, lead = '', numbered = false, start = 1) =>
  cmdLines(items, prefix, numbered, start).map((l) => `${lead}${l}`).join('\n');

const tail = (m) => `${m.ads ? `\n\n${m.ads}` : ''}\n\n${m.footer}`;

const pick = (m, label, fallback = '—') =>
  m.info.find(([, l]) => l === label)?.[2] ?? fallback;

const featureHeader = (m) => {
  const user = String(pick(m, 'User', '@operator')).replace(/^@?/, '@');
  const status = pick(m, 'Status', 'ONLINE');
  const prefix = pick(m, 'Prefix', '.');
  return [
    '╔══════════════════════════════════════╗',
    `║  ◈ ${m.brand} // CORE ${status === '🟢 ONLINE' ? 'ONLINE' : 'ACTIVE'} ◈`,
    '╠══════════════════════════════════════╣',
    `║  👋 Hey, ${user}`,
    `║  ⚡ Fast command core  •  🧩 Modular plugins`,
    `║  🛡️ Group tools  •  🤖 AI  •  🛠️ Utilities`,
    `║  💬 Prefix: ${prefix}`,
    '╚══════════════════════════════════════╝'
  ].join('\n');
};

const sectionGrid = (s, prefix) => {
  const head = `┌─[ ${s.icon} ${s.label} // ${s.items.length} ]`;
  const body = block(s.items, prefix, '│  ');
  return `${head}\n${body}\n└────────────────────────`;
};

const sectionLine = (s, prefix) =>
  `◆ ${s.icon} ${s.label} · ${s.items.length}\n${block(s.items, prefix, '  ├ ')}\n  └────────`;

const sectionNumbered = (s, prefix, start) =>
  `▰ ${s.icon} ${s.label} [${s.items.length}]\n${block(s.items, prefix, '   ', true, start)}`;

const STYLES = {
  1: (m) => {
    let t = `${featureHeader(m)}\n`;
    for (const s of m.sections) t += `\n${sectionGrid(s, m.prefix)}\n`;
    return `${t}${tail(m)}`;
  },
  2: (m) => {
    let t = `◈ ${m.brand} / ${m.scope.title}\n`;
    t += `STATUS ${pick(m, 'Status', 'ONLINE')}  •  USER ${pick(m, 'User')}  •  PREFIX ${pick(m, 'Prefix')}\n`;
    t += '════════════════════════════════════\n';
    for (const s of m.sections) t += `\n${sectionLine(s, m.prefix)}\n`;
    return `${t}${tail(m)}`;
  },
  3: (m) => {
    let t = `╭── VOID COMMAND MATRIX ──╮\n│ ${boldSerif(m.brand)}\n│ ${m.scope.icon} ${m.scope.title}\n╰─────────────────────────╯\n`;
    let n = 1;
    for (const s of m.sections) {
      t += `\n${sectionNumbered(s, m.prefix, n)}\n`;
      n += s.items.length;
    }
    return `${t}${tail(m)}`;
  },
  4: (m) => {
    let t = `⟦ ${m.brand} ⟧\n${m.scope.icon} ${m.scope.title}  |  ${pick(m, 'Prefix')}\n`;
    for (const s of m.sections) {
      t += `\n╭─◇ ${s.icon} ${s.label} ◇─\n${block(s.items, m.prefix, '│ ')}\n╰────────────────────\n`;
    }
    return `${t}${tail(m)}`;
  }
};

export function renderMenu(style, model) {
  return (STYLES[style] || STYLES[1])(model);
}

export function renderHeader(model) {
  return featureHeader(model);
}

export function renderIndex(model, categoryLines) {
  return `${featureHeader(model)}\n\n${categoryLines.join('\n')}\n\n→ Send *${model.prefix}menu <category>* for details.${tail(model)}`;
}

export function renderCategoryPage({ prefix, section, meta, page, pages, total }) {
  let t = `╭─◇ ${section.icon} ${section.label} ◇─\n`;
  t += `│ ${meta.tagline}\n│ ${total} command${total === 1 ? '' : 's'} • page ${page}/${pages}\n╰────────────────────\n\n`;
  for (const i of section.items) {
    const desc = String(i.description || '').split(/\.?\s*Usage:/)[0].split('\n')[0].trim();
    t += `• *${prefix}${i.name}*${tag(i)}\n  ${desc.length > 70 ? `${desc.slice(0, 67)}...` : desc || '—'}\n`;
  }
  t += `\n◇ ${prefix}menu · ${prefix}cmdinfo <command>`;
  if (pages > 1) t += `\n◇ Next: ${prefix}menu ${section.key} ${page < pages ? page + 1 : 1}`;
  return t;
}
