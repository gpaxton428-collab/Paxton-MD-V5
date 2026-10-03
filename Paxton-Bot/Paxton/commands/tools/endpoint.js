export default {
  name: 'endpoint',
  description: 'Check configured endpoint names without exposing keys.',
  async execute(sock, msg, args, prefix, ctx) {
    const chatId = msg.key.remoteJid;
    const {ENDPOINTS}=await import('../../endpoints.js'); await sock.sendMessage(chatId,{text:`🔗 *ENDPOINTS*\nSavplay: ${ENDPOINTS.savplay}\nWolvarex: ${ENDPOINTS.wolvarex}`},{quoted:msg});
  }
};
