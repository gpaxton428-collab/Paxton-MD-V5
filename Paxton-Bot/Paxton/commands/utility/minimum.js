import { reply } from '../../lib/extraCommands.js';
export default { name:'minimum', description:'Find the minimum number.', async execute(sock,msg,args){ const n=args.map(Number).filter(Number.isFinite); if(!n.length)return reply(sock,msg,'Usage: .minimum <numbers>'); return reply(sock,msg,`🔽 Minimum: ${Math.min(...n)}`); } };
