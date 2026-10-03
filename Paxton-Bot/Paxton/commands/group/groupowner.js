import { reply } from '../../lib/extraCommands.js';
export default { name:'groupowner', description:'Group utility: groupowner.', async execute(sock,msg,args){ const m=await sock.groupMetadata(msg.key.remoteJid); const o=m.participants.find(p=>p.admin==='superadmin'); return reply(sock,msg,o?`👑 Owner: @${o.id.split('@')[0]}`:'❌ Owner not found.'); } };
