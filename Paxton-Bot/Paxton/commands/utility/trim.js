export default {
  name: 'trim',
  description: 'Clean extra whitespace.',
  async execute(sock, msg, args, prefix, ctx) {
    const chatId = msg.key.remoteJid;
    await sock.sendMessage(chatId,{text:(args.join(' ')||'').replace(/\s+/g,' ').trim()||'Usage: trim <text>'},{quoted:msg});
  }
};
