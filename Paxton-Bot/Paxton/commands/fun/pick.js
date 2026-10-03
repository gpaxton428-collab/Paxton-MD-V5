export default {
  name: 'pick',
  description: 'Pick one option from a list.',
  async execute(sock, msg, args, prefix, ctx) {
    const chatId = msg.key.remoteJid;
    const t=args.join(' ').split('|').map(x=>x.trim()).filter(Boolean); await sock.sendMessage(chatId,{text:t.length?`🎯 ${t[Math.floor(Math.random()*t.length)]}`:'Usage: pick one | two | three'},{quoted:msg});
  }
};
