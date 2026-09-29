import { askAi, cleanPrompt } from '../../lib/api/ai.js';
import { endpointText } from '../../lib/api/endpointTools.js';
import { reply, replyError, usage } from '../../lib/helpers/reply.js';
const NVIDIA={
  chat:'/nvidia/chat','llama-fast':'/nvidia/llama-fast',llama3:'/nvidia/llama3',nemotron:'/nvidia/nemotron',phi:'/nvidia/phi','mistral-medium':'/nvidia/mistral-medium',glm:'/nvidia/glm'
};
export default {name:'nvidia',alias:['nv','ask'],description:'Ask the NVIDIA/Wolvarex AI endpoints. Usage: .nvidia <question> or .nvidia llama-fast <question>',requires:['WOLVAREX_API_KEY'],async execute(sock,msg,args,prefix){
 const mode=(args[0]||'chat').toLowerCase(); const provider=NVIDIA[mode]?mode:'chat'; const q=provider===mode?args.slice(1).join(' '):args.join(' ');
 if(!q)return reply(sock,msg,usage(prefix,'nvidia [chat|llama-fast|llama3|nemotron|phi|mistral-medium|glm] <question>','nvidia explain quantum computing simply'));
 try{const text=provider==='chat'?await endpointText(NVIDIA.chat,cleanPrompt(q)):await endpointText(NVIDIA[provider],cleanPrompt(q)); return reply(sock,msg,`🤖 *${provider.toUpperCase()}*\n\n${text}`)}catch(e){return replyError(sock,msg,e,'nvidia')}
}};
