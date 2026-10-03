import { Buffer } from 'buffer';
export default { name:'hex', description:'Encode text as hexadecimal.', async execute(sock,msg,args,prefix){ const t=args.join(' '); if(!t)return sock.sendMessage(msg.key.remoteJid,{text:`Usage: ${prefix}hex <text>`},{quoted:msg}); await sock.sendMessage(msg.key.remoteJid,{text:Buffer.from(t).toString('hex')},{quoted:msg}); } };
