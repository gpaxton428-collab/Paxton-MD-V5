import { reply } from '../../lib/extraCommands.js';
export default {
  name:'devreact', alias:['reactdev'], ownerOnly:true,
  description:'React to the replied message with an emoji. Usage: .devreact <emoji>',
  async execute(sock,msg,args){
    const quoted=msg.message?.extendedTextMessage?.contextInfo?.quotedMessage;
    const key=msg.message?.extendedTextMessage?.contextInfo?.stanzaId;
    const remoteJid=msg.key.remoteJid;
    if(!quoted || !key) return reply(sock,msg,'❌ Reply to a message first. Usage: .devreact ❤️');
    const emoji=args.join(' ').trim() || '❤️';
    try { await sock.sendMessage(remoteJid,{react:{text:emoji,key:{remoteJid,fromMe:false,id:key,participant:msg.message.extendedTextMessage.contextInfo.participant}}}); return reply(sock,msg,`🧑‍💻 Reacted with ${emoji}`); }
    catch(e){ return reply(sock,msg,'❌ Reaction failed: '+e.message); }
  }
};
