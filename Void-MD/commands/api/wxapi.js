import { getAuto, getJson } from '../../lib/api/wolvarex.js';
import { pretty, cleanQ } from '../../lib/api/endpointTools.js';
import { reply, replyError, usage } from '../../lib/helpers/reply.js';
const GROUPS={
 search:['wiki','news','github','npm','pypi','stackoverflow','reddit','urbandictionary','emoji','country','images','videos'],
 fun:['jokes','advice','quotes','motivation','flirt','pickuplines','truth','dares','riddles','trivia','funfacts','puns','roasts','compliments','wouldyourather','goodmorning','goodnight','valentines','birthday','love','friendship','shayari','humor','wisdom','success','heartbreak','sorry','halloween','christmas','newyear','thankyou','gratitude','roseday','fathersday','mothersday','girlfriendsday','boyfriendsday','chucknorris'],
 stalk:['github','ip','npm','tiktok','instagram','twitter','telegram','numberplate'],
 nvidia:['chat','llama-fast','llama3','nemotron','phi','mistral-medium','glm','status'],
 ai:['translate','summarize','code','scanner','humanizer','removebg'],
 image:['dall-e','pixabay','lorem-picsum','lorem-flickr','dog','cat','bing']
};
function pathFor(group,name){return `/${group}/${name}`}
export default {name:'wxapi',alias:['wolvarex','api'],description:'Direct Paxton API tools: .wxapi <group> <endpoint> <query>',requires:['WOLVAREX_API_KEY'],async execute(sock,msg,args,prefix){
 const group=(args.shift()||'').toLowerCase(), name=(args.shift()||'').toLowerCase(), q=args.join(' ').trim();
 if(!GROUPS[group]||!GROUPS[group].includes(name)) return reply(sock,msg,`🧩 *Paxton API*\n\nGroups: ${Object.keys(GROUPS).join(', ')}\nExample: ${prefix}wxapi search wiki black holes\nExample: ${prefix}wxapi fun jokes\nExample: ${prefix}wxapi stalk github octocat`);
 try{
   if(['jokes','advice','quotes','motivation','flirt','pickuplines','truth','dares','riddles','trivia','funfacts','puns','roasts','compliments','wouldyourather','goodmorning','goodnight','valentines','birthday','love','friendship','shayari','humor','wisdom','success','heartbreak','sorry','halloween','christmas','newyear','thankyou','gratitude','roseday','fathersday','mothersday','girlfriendsday','chucknorris'].includes(name)){
      const data=await getJson(pathFor('fun',name),{q:q||'random'}); return reply(sock,msg,`✨ ${pretty(data,3500)}`);
   }
   if(name==='status'&&group==='nvidia'){const data=await getJson('/nvidia/status',{}); return reply(sock,msg,`📡 *NVIDIA API STATUS*\n\n${pretty(data,3500)}`)}
   const data=await getJson(pathFor(group,name),{q:cleanQ(q||'random')}); return reply(sock,msg,`⚡ *${group}/${name}*\n\n${pretty(data,4500)}`)
 }catch(e){return replyError(sock,msg,e,'wxapi')}
}};
