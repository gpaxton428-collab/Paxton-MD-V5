export default {
  name: 'random',
  description: 'Generate a random number.',
  async execute(sock, msg, args, prefix, ctx) {
    const chatId = msg.key.remoteJid;
    const min=Number(args[0]??1),max=Number(args[1]??100); if(!Number.isFinite(min)||!Number.isFinite(max)||max<min) return sock.sendMessage(chatId,{text:'Usage: random [min] [max]'},{quoted:msg}); await sock.sendMessage(chatId,{text:`🎲 ${Math.floor(Math.random()*(max-min+1))+min}`},{quoted:msg});
  }
};
