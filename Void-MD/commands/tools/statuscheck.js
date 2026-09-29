import { reply } from '../../lib/helpers/reply.js';
export default {
  name: 'statuscheck',
  alias: ['botstatus', 'online'],
  description: 'Show a quick live bot status snapshot.',
  async execute(sock, msg, args, prefix, ctx) {
    const up = Math.floor(process.uptime());
    const h = Math.floor(up / 3600), m = Math.floor((up % 3600) / 60), s = up % 60;
    return reply(sock, msg, `╭━━〔 🟢 LIVE STATUS 〕━━╮\n┃ Bot: ${ctx.BOT_NAME}\n┃ State: ${ctx.isWhatsAppConnected?.() ? 'ONLINE' : 'OFFLINE'}\n┃ Uptime: ${h}h ${m}m ${s}s\n┃ Commands: ${ctx.getTotalCommandCount?.() ?? '—'}\n┃ Version: ${ctx.VERSION}\n╰━━━━━━━━━━━━━━━━━━━━━━╯`);
  }
};
