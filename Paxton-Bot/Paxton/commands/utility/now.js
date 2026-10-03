export default {
  name: 'now',
  description: 'Show an ISO timestamp.',
  async execute(sock, msg, args, prefix, ctx) {
    const chatId = msg.key.remoteJid;
    await sock.sendMessage(chatId,{text:new Date().toISOString()},{quoted:msg});
  }
};
