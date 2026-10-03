export default {
  name: 'lowercase',
  description: 'Convert text to lowercase.',
  async execute(sock, msg, args, prefix, ctx) {
    const chatId = msg.key.remoteJid;
    await sock.sendMessage(chatId,{text:(args.join(' ')||'').toLowerCase()||'Usage: lowercase <text>'},{quoted:msg});
  }
};
