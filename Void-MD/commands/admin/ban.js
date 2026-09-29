import { safeErrorMessage } from '../../lib/utils/errors.js';
import { getTargetJid, isSenderAdmin, isBotAdmin, replyText } from '../../lib/groupHelper.js';
export default {
  name: 'ban',
  alias: ['blockmember'],
  description: 'Remove a member and add them to the group blacklist. Admin only.',
  async execute(sock, msg, args, prefix, ctx) {
    const chatId = msg.key.remoteJid;
    if (!chatId?.endsWith('@g.us')) return replyText(sock, msg, '❌ This command only works in groups.');
    const sender = msg.key.participant || chatId;
    if (!(await isSenderAdmin(sock, chatId, sender))) return replyText(sock, msg, '❌ Only group admins can use this command.');
    if (!(await isBotAdmin(sock, chatId))) return replyText(sock, msg, '❌ I need to be an admin to do that.');
    const target = getTargetJid(msg, args);
    if (!target) return replyText(sock, msg, `❌ Reply to or mention who you want to ban.\nUsage: ${prefix}ban @user`);
    const settings = ctx.getGlobalSettings();
    const blacklist = new Set(settings.globalBlacklist || []);
    blacklist.add(target);
    ctx.setGlobalSetting('globalBlacklist', [...blacklist]);
    try { await sock.groupParticipantsUpdate(chatId, [target], 'remove'); }
    catch (e) { return replyText(sock, msg, `⚠️ Added to blacklist, but removal failed: ${safeErrorMessage(e)}`); }
    return replyText(sock, msg, `🚫 Banned @${target.split('@')[0]} from this bot's protected groups.`, [target]);
  }
};
