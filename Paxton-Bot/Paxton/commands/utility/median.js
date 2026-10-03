import { reply } from '../../lib/extraCommands.js';
export default { name:'median', description:'Calculate a median.', async execute(sock,msg,args){ const n=args.map(Number).filter(Number.isFinite).sort((a,b)=>a-b); if(!n.length)return reply(sock,msg,'Usage: .median <numbers>'); const m=Math.floor(n.length/2); return reply(sock,msg,`📊 Median: ${n.length%2?n[m]:(n[m-1]+n[m])/2}`); } };
