export default {
  name: 'length',
  description: 'Count characters in text.',
  async execute(sock, msg, args, prefix, ctx) {
    const chatId = msg.key.remoteJid;
    const t=args.join(' '); await sock.sendMessage(chatId,{text:`📏 Length: ${t.length}`},{quoted:msg});
  }
};
