export default {
  name: 'platform',
  description: 'Show platform information.',
  async execute(sock, msg, args, prefix, ctx) {
    const chatId = msg.key.remoteJid;
    await sock.sendMessage(chatId,{text:`📱 ${process.platform} / ${process.arch}`},{quoted:msg});
  }
};
