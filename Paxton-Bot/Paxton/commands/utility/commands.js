export default {
  name: 'commands',
  description: 'Show the number of loaded commands.',
  async execute(sock, msg, args, prefix, ctx) {
    const chatId = msg.key.remoteJid;
    await sock.sendMessage(chatId,{text:`🧩 ${ctx.BOT_NAME} currently has ${globalThis.__PAXTON_COMMAND_COUNT__||'200+'} loaded commands.`},{quoted:msg});
  }
};
