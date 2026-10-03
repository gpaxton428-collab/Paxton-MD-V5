import { reply } from '../../lib/extraCommands.js';
export default { name:'cube', description:'Cube a number.', async execute(sock,msg,args){ const n=Number(args[0]); if(!Number.isFinite(n))return reply(sock,msg,'Usage: .cube <number>'); return reply(sock,msg,`${n}³ = ${n*n*n}`); } };
