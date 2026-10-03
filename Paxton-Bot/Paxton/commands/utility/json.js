export default {
  name: 'json',
  description: 'Format a JSON string.',
  async execute(sock, msg, args, prefix, ctx) {
    const chatId = msg.key.remoteJid;
    const t=args.join(' '); try{await sock.sendMessage(chatId,{text:t?JSON.stringify(JSON.parse(t),null,2):'Usage: json <json>'},{quoted:msg});}catch{await sock.sendMessage(chatId,{text:'❌ Invalid JSON.'},{quoted:msg});}
  }
};
