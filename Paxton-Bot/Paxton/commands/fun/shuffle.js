export default {
  name: 'shuffle',
  description: 'Shuffle words.',
  async execute(sock, msg, args, prefix, ctx) {
    const chatId = msg.key.remoteJid;
    const a=args.join(' ').split(/\s+/).filter(Boolean); for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];} await sock.sendMessage(chatId,{text:a.join(' ')||'Usage: shuffle <words>'},{quoted:msg});
  }
};
