export default {
  name: 'buttontest',
  ownerOnly: true,
  description: 'Check the menu button feature. Buttons are intentionally limited to .menu.',
  async execute(sock, msg) {
    await sock.sendMessage(
      msg.key.remoteJid,
      { text: 'ℹ️ Buttons are enabled only on the .menu message in Paxton Tech.' },
      { quoted: msg }
    );
  }
};
