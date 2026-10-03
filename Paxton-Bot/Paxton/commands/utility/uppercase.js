export default {
  name: 'uppercase',
  description: 'Convert text to uppercase.',
  async execute(sock, msg, args, prefix, ctx) {
    const chatId = msg.key.remoteJid;
    await sock.sendMessage(chatId,{text:(args.join(' ')||'').toUpperCase()||'Usage: uppercase <text>'},{quoted:msg});
  }
};
