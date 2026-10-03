import { reply } from '../../lib/extraCommands.js';
export default { name:'reload', ownerOnly:true, description:'Owner utility: reload.', async execute(sock,msg,args){ if(globalThis.SOCKET_INSTANCE){} return reply(sock,msg,'♻️ Command registry is reloaded on the next bot restart. Use .restart to fully reload runtime state.'); } };
