import { reply } from '../../lib/extraCommands.js';
export default { name:'md5', description:'Create an MD5 hash.', async execute(sock,msg,args){ const t=args.join(' '); if(!t)return reply(sock,msg,'Usage: .md5 <text>'); const {createHash}=await import('crypto'); return reply(sock,msg,createHash('md5').update(t).digest('hex')); } };
