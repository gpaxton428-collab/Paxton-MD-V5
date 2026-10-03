import { reply } from '../../lib/extraCommands.js';
export default { name:'resetwarnings', description:'Group utility: resetwarnings.', async execute(sock,msg,args){ const {setGroupSetting}=await import('../../lib/settingsStore.js'); setGroupSetting(msg.key.remoteJid,'warnings',{}); return reply(sock,msg,'✅ Group warnings reset.'); } };
