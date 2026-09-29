import { getJson } from '../../lib/api/wolvarex.js';
import { reply, replyError } from '../../lib/helpers/reply.js';
export default {name:'apihealth',alias:['wxhealth'],description:'Check the Wolvarex v2 API health.',requires:['WOLVAREX_API_KEY'],async execute(sock,msg){try{const d=await getJson('/v2/health',{});return reply(sock,msg,`🟢 *WOLVAREX API HEALTH*\n\n${JSON.stringify(d,null,2).slice(0,4000)}`)}catch(e){return replyError(sock,msg,e,'apihealth')}}};
