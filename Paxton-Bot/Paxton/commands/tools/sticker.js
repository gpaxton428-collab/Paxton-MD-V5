import { reply } from '../../lib/extraCommands.js';
export default {
  name:'sticker', alias:['s'],
  description:'Convert a replied image into a sticker.',
  async execute(sock,msg){
    const ctx=msg.message?.extendedTextMessage?.contextInfo;
    const quoted=ctx?.quotedMessage;
    const image=quoted?.imageMessage;
    if(!image) return reply(sock,msg,'🖼️ Reply to an image with .sticker');
    try {
      const { downloadContentFromMessage } = await import('@whiskeysockets/baileys');
      const sharp=(await import('sharp')).default;
      const stream=await downloadContentFromMessage(image,'image');
      const chunks=[]; for await(const c of stream) chunks.push(c);
      const webp=await sharp(Buffer.concat(chunks)).resize(512,512,{fit:'contain'}).webp({quality:85}).toBuffer();
      await sock.sendMessage(msg.key.remoteJid,{sticker:webp},{quoted:msg});
    } catch(e){ await reply(sock,msg,'❌ Sticker conversion failed: '+e.message); }
  }
};
