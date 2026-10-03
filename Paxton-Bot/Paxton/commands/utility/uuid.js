import { randomUUID } from 'crypto';
export default { name:'uuid', description:'Generate a UUID.', async execute(sock,msg){ await sock.sendMessage(msg.key.remoteJid,{text:randomUUID()},{quoted:msg}); } };
