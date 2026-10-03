export default {
  name: 'uptime',
  description: 'Show bot uptime.',
  async execute(sock, msg, args, prefix, ctx) {
    const chatId = msg.key.remoteJid;
    const s=Math.floor(process.uptime()); const d=Math.floor(s/86400),h=Math.floor(s%86400/3600),m=Math.floor(s%3600/60),sec=s%60; await sock.sendMessage(chatId,{text:`⏱️ *UPTIME*\n\n${d}d ${h}h ${m}m ${sec}s`},{quoted:msg});
  }
};
