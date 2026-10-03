import { reply } from '../../lib/extraCommands.js';
export default { name:'sqrt', description:'Calculate a square root.', async execute(sock,msg,args){ const n=Number(args[0]); if(!Number.isFinite(n)||n<0)return reply(sock,msg,'Usage: .sqrt <non-negative number>'); return reply(sock,msg,`√${n} = ${Math.sqrt(n)}`); } };
