import { config } from '../../config/index.js';
export default {name:'buildinfo',alias:['devversion','build'],strictOwner:true,ownerOnly:true,description:'Developer version/build information.',
async execute(sock,msg){return sock.sendMessage(msg.key.remoteJid,{text:`⚡ Void MD\nVersion: ${config.version}\nNode: ${process.version}\nBaileys: 7.0.0-rc14\nButtons: persistent + 1.5s guard\nProvider: SavPlay + fallback`},{quoted:msg});}};
