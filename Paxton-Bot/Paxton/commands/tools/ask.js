import { reply } from '../../lib/extraCommands.js';
export default { name:'ask', description:'Ask the configured AI provider.', async execute(sock,msg,args){ const q=args.join(' '); if(!q)return reply(sock,msg,'Usage: .ask <question>'); const {getAiReply}=await import('../../lib/aiApi.js'); const r=await getAiReply(q); return reply(sock,msg,r||'❌ No AI provider is configured or reachable.'); } };
