export default {
  name: 'date',
  description: 'Show the current date and time.',
  async execute(sock, msg, args, prefix, ctx) {
    const chatId = msg.key.remoteJid;
    await sock.sendMessage(chatId,{text:`📅 ${new Date().toLocaleString()}`},{quoted:msg});
  }
};
