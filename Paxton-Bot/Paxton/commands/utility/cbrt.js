import { reply } from '../../lib/extraCommands.js';
export default { name:'cbrt', description:'Calculate a cube root.', async execute(sock,msg,args){ const n=Number(args[0]); if(!Number.isFinite(n))return reply(sock,msg,'Usage: .cbrt <number>'); return reply(sock,msg,`∛${n} = ${Math.cbrt(n)}`); } };
