import { reply } from '../../lib/extraCommands.js';
export default { name:'groupmembers', description:'Group utility: groupmembers.', async execute(sock,msg,args){ const m=await sock.groupMetadata(msg.key.remoteJid); return reply(sock,msg,`👥 ${m.subject}\nMembers: ${m.participants.length}`); } };
