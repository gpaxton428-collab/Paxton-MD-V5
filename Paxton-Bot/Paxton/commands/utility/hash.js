import { createHash } from 'crypto';
export default { name:'hash', description:'Create a SHA-256 hash of text.', async execute(sock,msg,args,prefix){ const t=args.join(' '); if(!t)return sock.sendMessage(msg.key.remoteJid,{text:`Usage: ${prefix}hash <text>`},{quoted:msg}); await sock.sendMessage(msg.key.remoteJid,{text:createHash('sha256').update(t).digest('hex')},{quoted:msg}); } };
