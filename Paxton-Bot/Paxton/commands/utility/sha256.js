import { reply } from '../../lib/extraCommands.js';
export default { name:'sha256', description:'Create a SHA-256 hash.', async execute(sock,msg,args){ const t=args.join(' '); if(!t)return reply(sock,msg,'Usage: .sha256 <text>'); const {createHash}=await import('crypto'); return reply(sock,msg,createHash('sha256').update(t).digest('hex')); } };
