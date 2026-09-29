import AdmZip from 'adm-zip';
import { getGroupMetadata, isSenderAdmin, replyText } from '../../lib/groupHelper.js';

function safeName(value) {
  return String(value || 'WhatsApp Contact').replace(/[\\/:*?"<>|\r\n]+/g, ' ').trim().slice(0, 80) || 'WhatsApp Contact';
}

function vcard(name, number) {
  const clean = String(number || '').replace(/[^0-9]/g, '');
  const display = clean ? `+${clean}` : safeName(name);
  return [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `FN:${safeName(name || display)}`,
    `TEL;TYPE=CELL;TYPE=VOICE;waid=${clean}:${display}`,
    'END:VCARD',
    ''
  ].join('\n');
}

export default {
  name: 'vcfall',
  alias: ['groupvcf', 'exportvcf'],
  description: 'Export the current group participants as individual VCF files inside a ZIP. Group admin only.',
  async execute(sock, msg) {
    const chatId = msg.key.remoteJid;
    if (!chatId?.endsWith('@g.us')) return replyText(sock, msg, '❌ This command only works in groups.');
    const sender = msg.key.participant || chatId;
    if (!(await isSenderAdmin(sock, chatId, sender))) return replyText(sock, msg, '❌ Group admins only.');
    const metadata = await getGroupMetadata(sock, chatId, { fresh: true });
    if (!metadata?.participants?.length) return replyText(sock, msg, '❌ Could not read the group participants.');

    const zip = new AdmZip();
    const seen = new Set();
    let count = 0;
    for (const participant of metadata.participants) {
      const jid = participant.id || participant.jid || participant.phoneNumber;
      const number = String(participant.phoneNumber || jid || '').split('@')[0].split(':')[0].replace(/[^0-9]/g, '');
      if (!number || number.length < 6 || seen.has(number)) continue;
      seen.add(number);
      const name = participant.name || participant.notify || `Contact ${number}`;
      zip.addFile(`${String(++count).padStart(4, '0')}-${safeName(name)}.vcf`, Buffer.from(vcard(name, number), 'utf8'));
    }
    if (!count) return replyText(sock, msg, '❌ No phone-number contacts were available to export.');
    const buffer = zip.toBuffer();
    const subject = safeName(metadata.subject || 'WhatsApp Group');
    await sock.sendMessage(chatId, {
      document: buffer,
      mimetype: 'application/zip',
      fileName: `${subject}-contacts.zip`,
      caption: `📇 *VCF EXPORT COMPLETE*\n\n👥 Group: ${metadata.subject || 'Unknown'}\\n📦 Contacts: ${count}\\n🗜️ Format: ZIP of VCF files`
    }, { quoted: msg });
  }
};
