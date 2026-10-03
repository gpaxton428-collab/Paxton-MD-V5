import { Buffer } from 'buffer';
export default { name:'base64', description:'Encode text to Base64.', async execute(sock,msg,args,prefix){ const t=args.join(' '); if(!t)return sock.sendMessage(msg.key.remoteJid,{text:`Usage: ${prefix}base64 <text>`},{quoted:msg}); await sock.sendMessage(msg.key.remoteJid,{text:Buffer.from(t).toString('base64')},{quoted:msg}); } };
