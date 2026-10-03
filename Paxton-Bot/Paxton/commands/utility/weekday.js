import { reply } from '../../lib/extraCommands.js';
export default { name:'weekday', description:'Find the weekday for a date.', async execute(sock,msg,args){ const d=new Date(args.join(' ')); if(Number.isNaN(d.getTime()))return reply(sock,msg,'Usage: .weekday <date>'); return reply(sock,msg,new Intl.DateTimeFormat('en',{weekday:'long',dateStyle:'full'}).format(d)); } };
