import { reply } from '../../lib/extraCommands.js';
export default { name:'admincheck', description:'Group utility: admincheck.', async execute(sock,msg,args){ const j=msg.key.participant||msg.key.remoteJid; const {isSenderAdmin}=await import('../../lib/groupHelper.js'); return reply(sock,msg,(await isSenderAdmin(sock,msg.key.remoteJid,j))?'✅ You are an admin.':'❌ You are not an admin.'); } };
