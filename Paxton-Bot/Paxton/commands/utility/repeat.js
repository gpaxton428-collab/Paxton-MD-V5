export default {
  name: 'repeat',
  description: 'Repeat text a limited number of times.',
  async execute(sock, msg, args, prefix, ctx) {
    const chatId = msg.key.remoteJid;
    const n=Math.min(Math.max(Number(args[0])||1,1),10); const t=args.slice(1).join(' ')||args.join(' '); await sock.sendMessage(chatId,{text:t?Array(n).fill(t).join('\n'): 'Usage: repeat <count> <text>'},{quoted:msg});
  }
};
