export default {
  name: 'words',
  description: 'Count words in text.',
  async execute(sock, msg, args, prefix, ctx) {
    const chatId = msg.key.remoteJid;
    const t=args.join(' ').trim(); await sock.sendMessage(chatId,{text:`🔤 Words: ${t?t.split(/\s+/).length:0}`},{quoted:msg});
  }
};
