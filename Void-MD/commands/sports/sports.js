import { getJson } from '../../lib/api/wolvarex.js';
import { pretty, cleanQ } from '../../lib/api/endpointTools.js';
import { reply, replyError, usage } from '../../lib/helpers/reply.js';
const P={live:'/sports/live',team:'/sports/search/team',player:'/sports/search/player',league:'/sports/search/league',leagues:'/sports/leagues',events:'/sports/events/day',venue:'/sports/venue'};
export default {name:'sports',alias:['sport'],description:'Search live sports, teams, players and leagues.',requires:['WOLVAREX_API_KEY'],async execute(sock,msg,args,prefix){const type=(args.shift()||'live').toLowerCase();if(!P[type])return reply(sock,msg,usage(prefix,'sports <live|team|player|league|leagues|events|venue> [query]','sports team Arsenal'));try{const q=args.join(' ').trim();const data=await getJson(P[type],q?{q,query:q,name:q}:{});return reply(sock,msg,`🏟️ *SPORTS • ${type.toUpperCase()}*\n\n${pretty(data,5000)}`)}catch(e){return replyError(sock,msg,e,'sports')}}};
