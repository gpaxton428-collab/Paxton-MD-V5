export default {
  name: 'env',
  description: 'Show safe runtime configuration, never secret values.',
  async execute(sock, msg, args, prefix, ctx) {
    const chatId = msg.key.remoteJid;
    await sock.sendMessage(chatId,{text:`⚙️ *CONFIG*\nBot: ${ctx.BOT_NAME}\nPrefix: ${prefix}\nNode: ${process.version}\nMode: ${process.env.NODE_ENV||'development'}`},{quoted:msg});
  }
};
