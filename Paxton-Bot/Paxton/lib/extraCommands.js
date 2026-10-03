export async function reply(sock, msg, text) {
  return sock.sendMessage(msg.key.remoteJid, { text }, { quoted: msg });
}
export function argText(args) { return args.join(' ').trim(); }
