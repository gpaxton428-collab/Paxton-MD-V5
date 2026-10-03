import { reply } from '../../lib/extraCommands.js';
export default { name:'groupadmins', description:'Group utility: groupadmins.', async execute(sock,msg,args){ const m=await sock.groupMetadata(msg.key.remoteJid); const a=m.participants.filter(p=>p.admin); return reply(sock,msg,'👑 ADMINS\n'+a.map((p,i)=>`${i+1}. @${p.id.split('@')[0]}`).join('\n')||'None'); } };
