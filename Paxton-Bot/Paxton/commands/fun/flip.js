export default {
  name: 'flip',
  description: 'Flip a coin.',
  async execute(sock, msg, args, prefix, ctx) {
    const chatId = msg.key.remoteJid;
    await sock.sendMessage(chatId,{text:Math.random()<.5?'🪙 Heads':'🪙 Tails'},{quoted:msg});
  }
};
