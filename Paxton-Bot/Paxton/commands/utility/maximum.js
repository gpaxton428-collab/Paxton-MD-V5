import { reply } from '../../lib/extraCommands.js';
export default { name:'maximum', description:'Find the maximum number.', async execute(sock,msg,args){ const n=args.map(Number).filter(Number.isFinite); if(!n.length)return reply(sock,msg,'Usage: .maximum <numbers>'); return reply(sock,msg,`🔼 Maximum: ${Math.max(...n)}`); } };
