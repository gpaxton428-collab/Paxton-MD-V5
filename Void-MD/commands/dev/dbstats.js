import fs from 'fs';
import path from 'path';
export default {name:'dbstats',strictOwner:true,ownerOnly:true,description:'Developer database health.',
async execute(sock,msg){const root=path.join(process.cwd(),'database'), rows=[];for(const d of ['groups','users','owners','warnings','sessions','settings','cache','backups']){const p=path.join(root,d);let n=0;try{n=fs.readdirSync(p).filter(x=>x!=='.gitkeep').length}catch{}rows.push(`┃ ${d.padEnd(10)} ${n}`)}return sock.sendMessage(msg.key.remoteJid,{text:`╭━━〔 🗄️ DATABASE 〕\n${rows.join('\n')}\n╰━━━━━━━━━━━━┈⊷`},{quoted:msg});}};
