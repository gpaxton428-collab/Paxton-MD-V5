import { reply } from '../../lib/extraCommands.js';
export default { name:'square', description:'Square a number.', async execute(sock,msg,args){ const n=Number(args[0]); if(!Number.isFinite(n))return reply(sock,msg,'Usage: .square <number>'); return reply(sock,msg,`${n}² = ${n*n}`); } };
