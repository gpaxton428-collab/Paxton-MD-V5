import { reply } from '../../lib/extraCommands.js';
export default { name:'botadmin', description:'Group utility: botadmin.', async execute(sock,msg,args){ const {isBotAdmin}=await import('../../lib/groupHelper.js'); return reply(sock,msg,(await isBotAdmin(sock,msg.key.remoteJid))?'🤖✅ Bot is admin.':'🤖❌ Bot is not admin.'); } };
