import { config } from '../../config/index.js';
export default {
  name:'songapi', strictOwner:true,ownerOnly:true,
  description:'Developer song-provider diagnostic.',
  async execute(sock,msg){
    const base=config.savplay?.baseUrl || 'disabled'; const chat=msg.key.remoteJid;
    let text=`🎵 *SONG API DIAGNOSTIC*\nBase: ${base}\nKey: ${config.savplay?.key?'configured':'not configured'}\nSearch: ${config.savplay?.searchPath || 'n/a'}\nDownload: ${config.savplay?.downloadPath || 'n/a'}\nVideo: ${config.savplay?.videoPath || 'n/a'}`;
    try{if(base!=='disabled'){const r=await fetch(base,{method:'GET',signal:AbortSignal.timeout(6000)});text+=`\nHealth HTTP: ${r.status}`;}}catch(e){text+=`\nHealth: unavailable (${e.message})`;}
    return sock.sendMessage(chat,{text},{quoted:msg});
  }
};
