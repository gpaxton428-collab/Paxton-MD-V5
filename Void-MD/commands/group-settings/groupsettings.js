import { getGroupSettings, setGroupSetting } from '../../lib/settingsStore.js';
import { isSenderAdmin, replyText } from '../../lib/groupHelper.js';
import { sendInteractive, quickButton } from '../../lib/helpers/interactive.js';

const BOOL_KEYS = {
  welcome: 'welcome',
  goodbye: 'goodbye',
  antilink: 'antilink',
  antibadword: 'antibadword',
  antitag: 'antitag',
  antimention: 'antimention',
  antiforward: 'antiforward',
  antisticker: 'antisticker',
  antiimage: 'antiimage',
  antivideo: 'antivideo',
  antiaudio: 'antiaudio',
  antispam: 'antispam',
  antifake: 'antifake',
  autosavevcf: 'autosavevcf',
  chatbot: 'chatbotFullReply'
};

const on = (v) => v ? '🟢 ON' : '🔴 OFF';

function render(jid, s, prefix) {
  return [
    '╭━━〔 ⚙️ *GROUP SETTINGS* 〕',
    `┃ 👥 Group: ${jid.split('@')[0]}`,
    `┃ 👋 Welcome: ${on(s.welcome)}`,
    `┃ 👋 Goodbye: ${on(s.goodbye)}`,
    `┃ 🔗 AntiLink: ${on(s.antilink)}`,
    `┃ 🚫 AntiBadword: ${on(s.antibadword)}`,
    `┃ 🏷️ AntiTag: ${on(s.antitag)}`,
    `┃ 💬 AntiMention: ${on(s.antimention)}`,
    `┃ 📢 AntiForward: ${on(s.antiforward)}`,
    `┃ 🛡️ AntiSpam: ${on(s.antispam)}`,
    `┃ 📇 AutoSaveVCF: ${on(s.autosavevcf)}`,
    `┃ 🤖 Chatbot: ${on(s.chatbotFullReply)}`,
    '╰━━━━━━━━━━━━┈⊷',
    `
💡 Toggle: *${prefix}groupsettings <name> [on|off]*`
  ].join('\n');
}

export default {
  name: 'groupsettings',
  alias: ['gsettings', 'groupsetting'],
  description: 'View and toggle per-group settings. Admin only.',
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    if (!chatId?.endsWith('@g.us')) return replyText(sock, msg, '❌ This command only works in groups.');
    const sender = msg.key.participant || chatId;
    if (!(await isSenderAdmin(sock, chatId, sender).catch(() => false))) return;

    const key = String(args[0] || '').toLowerCase();
    if (key && BOOL_KEYS[key]) {
      const current = getGroupSettings(chatId);
      const next = args[1] ? /^(on|1|true|yes)$/i.test(args[1]) : !current[BOOL_KEYS[key]];
      setGroupSetting(chatId, BOOL_KEYS[key], next);
    }

    const s = getGroupSettings(chatId);
    const text = render(chatId, s, prefix);
    return sendInteractive(sock, chatId, {
      text,
      footer: '⚡ Paxton-Tech • Group controls',
      buttons: [
        quickButton(`👋 Welcome ${s.welcome ? 'ON' : 'OFF'}`, `${prefix}groupsettings welcome`),
        quickButton(`🔗 AntiLink ${s.antilink ? 'ON' : 'OFF'}`, `${prefix}groupsettings antilink`),
        quickButton('🏠 Group Menu', `${prefix}groupmenu`)
      ],
      fallbackText: text
    }, { quoted: msg });
  }
};
