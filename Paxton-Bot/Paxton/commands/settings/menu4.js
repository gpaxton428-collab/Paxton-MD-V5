import { setGlobalSetting } from '../../lib/settingsStore.js';
export default { name:'menu4', ownerOnly:true, description:'Lock the bot to menu style 4.', async execute(sock,msg){ setGlobalSetting('menuStyle',4); await sock.sendMessage(msg.key.remoteJid,{text:'✅ Menu style locked to 4.'},{quoted:msg}); } };
