import { reply } from '../../lib/extraCommands.js';
export default { name:'leapyear', description:'Check whether a year is a leap year.', async execute(sock,msg,args){ const y=Number(args[0]); if(!Number.isInteger(y))return reply(sock,msg,'Usage: .leapyear <year>'); return reply(sock,msg,`${y} is ${((y%4===0&&y%100!==0)||y%400===0)?'a leap year':'not a leap year'}.`); } };
