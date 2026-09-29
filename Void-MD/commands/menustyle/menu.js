import { safeErrorMessage } from '../../lib/utils/errors.js';
import { config } from '../../config/index.js';
import { isSenderAdmin, getGroupMetadata } from '../../lib/groupHelper.js';
import { planMenu, buildMainMenu, buildIndex, buildCategory, resolveCategory } from '../../lib/menu/index.js';
import { SCOPE_NAMES } from '../../lib/menu/scopes.js';
import { reply } from '../../lib/helpers/reply.js';
import { logger } from '../../lib/utils/logger.js';
import { getRandomMenuLogo } from '../../lib/menu/logo.js';

const UPDATE_CHANNEL_JID = process.env.UPDATE_CHANNEL_JID || '120363427360133880@newsletter';
const UPDATE_CHANNEL_NAME = process.env.UPDATE_CHANNEL_NAME || 'Void MD Updates';

function channelContextInfo() {
  return {
    forwardedNewsletterMessageInfo: {
      newsletterJid: UPDATE_CHANNEL_JID,
      newsletterName: UPDATE_CHANNEL_NAME,
      serverMessageId: 1
    }
  };
}

export default {
  name: 'menu',
  alias: ['help', 'commands'],
  description: 'Show the command menu. Usage: .menu [view|category|list]',
  async execute(sock, msg, args, prefix, ctx) {
    const chatId = msg.key.remoteJid;
    const senderJid = msg.key.participant || chatId;
    const inGroup = chatId.endsWith('@g.us');
    const isOwner = !!ctx.isOwner?.();
    const isOwnerOrSudo = !!ctx.isOwnerOrSudo?.();
    const isAdmin = inGroup && !isOwnerOrSudo ? await isSenderAdmin(sock, chatId, senderJid).catch(() => false) : false;

    try {
      const word = (args[0] || '').toLowerCase();
      const { scope: entitled } = planMenu(ctx, { requested: null, isOwner: isOwnerOrSudo, isAdmin, inGroup });
      let groupName;
      if (inGroup) groupName = (await getGroupMetadata(sock, chatId))?.subject;
      const mention = { mentions: [senderJid] };
      sock.sendPresenceUpdate('composing', chatId).catch(() => {});

      if (['list', 'short', 'index', 'categories'].includes(word)) {
        return await sock.sendMessage(chatId, { text: buildIndex(ctx, { scope: entitled, senderJid, isOwner }), ...mention }, { quoted: msg });
      }

      const category = resolveCategory(word);
      if (category) {
        const text = buildCategory(ctx, { category, page: args[1], scope: entitled, isOwner });
        return reply(sock, msg, text || `🔎 There are no *${word}* commands available to you here.\nSend ${prefix}menu list to see what you can use.`);
      }

      if (word && !SCOPE_NAMES.includes(word) && word !== 'all') {
        return reply(sock, msg, `❓ Unknown menu "${word.slice(0, 20)}".\nTry ${prefix}menu list, ${prefix}menu <category>, or one of: ${SCOPE_NAMES.join(', ')}.`);
      }

      const { scope } = planMenu(ctx, { requested: word === 'all' ? 'owner' : word, isOwner: isOwnerOrSudo, isAdmin, inGroup });
      const { text } = buildMainMenu(ctx, { scope, senderJid, groupName, groupJid: inGroup ? chatId : null, isOwner });
      const logo = getRandomMenuLogo();
      const image = logo ? { image: logo } : (config.menu.imageUrl ? { image: { url: config.menu.imageUrl } } : {});
      const caption = `${text}\n\n📢 *View Channel*`;

      await sock.sendMessage(chatId, {
        ...image,
        caption,
        ...mention,
        contextInfo: channelContextInfo()
      }, { quoted: msg });
    } catch (err) {
      logger.warn('menu', `menu send failed: ${safeErrorMessage(err)}`);
      throw err;
    } finally {
      sock.sendPresenceUpdate('paused', chatId).catch(() => {});
    }
  }
};
