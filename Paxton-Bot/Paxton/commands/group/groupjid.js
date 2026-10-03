import { reply } from '../../lib/extraCommands.js';
export default { name:'groupjid', description:'Group utility: groupjid.', async execute(sock,msg,args){ return reply(sock,msg,`🆔 ${msg.key.remoteJid}`); } };
