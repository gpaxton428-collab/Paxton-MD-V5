export default {
  name: 'slug',
  description: 'Create a URL-friendly slug.',
  async execute(sock, msg, args, prefix, ctx) {
    const chatId = msg.key.remoteJid;
    const t=args.join(' '); const out=t.normalize('NFKD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,''); await sock.sendMessage(chatId,{text:out||'Usage: slug <text>'},{quoted:msg});
  }
};
