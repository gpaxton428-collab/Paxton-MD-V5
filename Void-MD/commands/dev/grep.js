import fs from 'fs';
import path from 'path';
export default {
  name: 'grep', strictOwner: true, ownerOnly: true,
  description: 'Developer source search. Usage: $grep <text>',
  async execute(sock,msg,args) {
    const q=args.join(' ').trim(); const chat=msg.key.remoteJid;
    if(!q) return sock.sendMessage(chat,{text:'Usage: $grep <text>'},{quoted:msg});
    const root=process.cwd(), hits=[]; const skip=new Set(['node_modules','.git','session','database/cache','database/backups']);
    function walk(dir){
      let es=[]; try{es=fs.readdirSync(dir,{withFileTypes:true});}catch{return;}
      for(const e of es){const p=path.join(dir,e.name), rel=path.relative(root,p);
        if(skip.has(rel)||[...skip].some(x=>rel.startsWith(x+'/')))continue;
        if(e.isDirectory())walk(p); else if(/\.(js|mjs|json|md|yml|yaml|env)$/.test(e.name)){
          let t='';try{t=fs.readFileSync(p,'utf8');}catch{}
          t.split(/\r?\n/).forEach((line,i)=>{if(line.toLowerCase().includes(q.toLowerCase())&&hits.length<80)hits.push(`${rel}:${i+1}: ${line.trim().slice(0,180)}`);});
        }
      }
    } walk(root);
    return sock.sendMessage(chat,{text:hits.length?`🔎 *$grep ${q}*\n\n${hits.join('\n')}`:`🔎 No matches for "${q}".`},{quoted:msg});
  }
};
