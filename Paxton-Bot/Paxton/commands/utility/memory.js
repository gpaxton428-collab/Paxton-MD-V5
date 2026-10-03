export default {
  name: 'memory',
  description: 'Show process memory usage.',
  async execute(sock, msg, args, prefix, ctx) {
    const chatId = msg.key.remoteJid;
    const m=process.memoryUsage(); await sock.sendMessage(chatId,{text:`🧠 *MEMORY*\nRSS: ${(m.rss/1048576).toFixed(1)} MB\nHeap: ${(m.heapUsed/1048576).toFixed(1)} / ${(m.heapTotal/1048576).toFixed(1)} MB`},{quoted:msg});
  }
};
