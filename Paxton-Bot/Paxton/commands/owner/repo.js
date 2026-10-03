import { reply } from '../../lib/extraCommands.js';
export default { name:'repo', ownerOnly:true, description:'Owner utility: repo.', async execute(sock,msg,args){ const {BOT}=await import('../../endpoints.js'); return reply(sock,msg,`📦 *PAXTON TECH REPO*\n${BOT.repo}`); } };
