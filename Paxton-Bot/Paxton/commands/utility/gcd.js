import { reply } from '../../lib/extraCommands.js';
export default { name:'gcd', description:'Find the greatest common divisor.', async execute(sock,msg,args){ const n=args.map(Number).filter(Number.isInteger).map(Math.abs); if(n.length<2)return reply(sock,msg,'Usage: .gcd <a> <b>'); const g=(a,b)=>b?g(b,a%b):a; return reply(sock,msg,`GCD: ${n.reduce(g)}`); } };
