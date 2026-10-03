export default {
  name: 'node',
  description: 'Show Node.js runtime information.',
  async execute(sock, msg, args, prefix, ctx) {
    const chatId = msg.key.remoteJid;
    await sock.sendMessage(chatId,{text:`🟢 *NODE*\nVersion: ${process.version}\nPlatform: ${process.platform}\nArch: ${process.arch}`},{quoted:msg});
  }
};
