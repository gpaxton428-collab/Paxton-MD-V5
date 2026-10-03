import { reply } from '../../lib/extraCommands.js';
export default { name:'ascii', description:'Convert text to character codes.', async execute(sock,msg,args){ const t=args.join(' '); if(!t) return reply(sock,msg,'Usage: .ascii <text>'); return reply(sock,msg, [...t].map(c=>c.charCodeAt(0)).join(' ')); } };
