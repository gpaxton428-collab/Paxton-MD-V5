export default {
  name: 'eightball',
  description: 'Ask a harmless yes/no question.',
  async execute(sock, msg, args, prefix, ctx) {
    const chatId = msg.key.remoteJid;
    const q=['Yes.','Probably.','Not today.','Maybe.','Ask again later.','Absolutely.']; await sock.sendMessage(chatId,{text:`🎱 ${q[Math.floor(Math.random()*q.length)]}`},{quoted:msg});
  }
};
