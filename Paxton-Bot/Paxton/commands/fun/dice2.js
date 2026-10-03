export default {
  name: 'dice2',
  description: 'Roll two dice.',
  async execute(sock, msg, args, prefix, ctx) {
    const chatId = msg.key.remoteJid;
    const a=1+Math.floor(Math.random()*6),b=1+Math.floor(Math.random()*6); await sock.sendMessage(chatId,{text:`🎲 ${a} + ${b} = ${a+b}`},{quoted:msg});
  }
};
