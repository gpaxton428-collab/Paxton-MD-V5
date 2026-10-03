import { reply } from '../../lib/extraCommands.js';
export default { name:'average', description:'Calculate an average.', async execute(sock,msg,args){ const n=args.map(Number).filter(Number.isFinite); if(!n.length)return reply(sock,msg,'Usage: .average <numbers>'); return reply(sock,msg,`📊 Average: ${n.reduce((a,b)=>a+b,0)/n.length}`); } };
