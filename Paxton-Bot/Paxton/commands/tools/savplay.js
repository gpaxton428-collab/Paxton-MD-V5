import { reply } from '../../lib/extraCommands.js';
export default { name:'savplay', description:'Inspect the Savplay song endpoint.', async execute(sock,msg,args){ const {ENDPOINTS,API_ROUTES}=await import('../../endpoints.js'); return reply(sock,msg,`🎵 SAVPLAY\n${ENDPOINTS.savplay}\nPlay path: ${API_ROUTES.savplayPlay}\nSearch path: ${API_ROUTES.savplaySearch}`); } };
