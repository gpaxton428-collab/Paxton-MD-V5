import { getTrackDownload } from '../../lib/api/music.js';
import { downloadBuffer, looksLikeAudio } from '../../lib/utils/http.js';
import { config } from '../../config/index.js';
import { reply, replyError } from '../../lib/helpers/reply.js';
const busy=new Set();
export default { name:'playmp3', alias:['mp3','songmp3'], description:'Download the selected song as audio.',
  async execute(sock,msg,args,prefix){
    const id=decodeURIComponent(args[0]||''); if(!id)return reply(sock,msg,`Usage: ${prefix}playmp3 <track>`);
    const key=`${msg.key.remoteJid}|${id}`; if(busy.has(key))return reply(sock,msg,'⏳ This download is already running.');
    busy.add(key);
    try{const dl=await getTrackDownload(id); const {buffer,contentType}=await downloadBuffer(dl.url,{maxBytes:config.limits.maxAudioMb*1024*1024,timeoutMs:config.wolvarex.downloadTimeoutMs});
      if(!/^audio\//i.test(contentType)&&!looksLikeAudio(buffer))throw new Error('Provider returned a non-audio file');
      await sock.sendMessage(msg.key.remoteJid,{audio:buffer,mimetype:/mp4|m4a|aac/i.test(contentType)?'audio/mp4':'audio/mpeg',fileName:`${dl.title||'Paxton-MD'}.mp3`,ptt:false},{quoted:msg});
    }catch(e){await replyError(sock,msg,e,'playmp3');}finally{busy.delete(key);}
  }
};
