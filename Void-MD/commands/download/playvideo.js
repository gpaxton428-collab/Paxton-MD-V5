import { getTrackVideo } from '../../lib/api/music.js';
import { downloadBuffer } from '../../lib/utils/http.js';
import { config } from '../../config/index.js';
import { reply, replyError } from '../../lib/helpers/reply.js';
const busy=new Set();
export default { name:'playvideo', alias:['video','songvideo'], description:'Download the selected song/video.',
  async execute(sock,msg,args,prefix){
    const id=decodeURIComponent(args[0]||''); if(!id)return reply(sock,msg,`Usage: ${prefix}playvideo <track>`);
    const key=`${msg.key.remoteJid}|${id}`; if(busy.has(key))return reply(sock,msg,'⏳ This video is already downloading.');
    busy.add(key);
    try{const dl=await getTrackVideo(id); const {buffer}=await downloadBuffer(dl.url,{maxBytes:config.limits.maxMediaMb*1024*1024,timeoutMs:config.wolvarex.downloadTimeoutMs});
      await sock.sendMessage(msg.key.remoteJid,{video:buffer,caption:dl.title||'🎬 Void MD'},{quoted:msg});
    }catch(e){await replyError(sock,msg,e,'playvideo');}finally{busy.delete(key);}
  }
};
