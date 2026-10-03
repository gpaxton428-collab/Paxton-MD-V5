import { reply } from '../../lib/extraCommands.js';
export default { name:'sha1', description:'Create a SHA-1 hash.', async execute(sock,msg,args){ const t=args.join(' '); if(!t)return reply(sock,msg,'Usage: .sha1 <text>'); const {createHash}=await import('crypto'); return reply(sock,msg,createHash('sha1').update(t).digest('hex')); } };
