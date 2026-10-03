import { reply } from '../../lib/extraCommands.js';
export default { name:'lcm', description:'Find the least common multiple.', async execute(sock,msg,args){ const n=args.map(Number).filter(Number.isInteger).map(Math.abs); if(n.length<2)return reply(sock,msg,'Usage: .lcm <a> <b>'); const g=(a,b)=>b?g(b,a%b):a; return reply(sock,msg,`LCM: ${n.reduce((a,b)=>a/g(a,b)*b)}`); } };
