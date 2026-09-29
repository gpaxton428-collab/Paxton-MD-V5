import fs from 'fs';
import os from 'os';
import { getGlobalSettings } from '../../lib/settingsStore.js';

export default {
  name: 'doctor',
  alias: ['diagnose', 'selfcheck'],
  ownerOnly: true,
  strictOwner: true,
  description: 'Run a lightweight Void self-check for plugins, runtime, session and configuration.',
  async execute(sock, msg, args, prefix, ctx) {
    const report = ctx.pluginReport || {};
    const failures = report.failed || [];
    const settings = getGlobalSettings();
    const sessionExists = fs.existsSync('./session') && fs.readdirSync('./session').length > 0;
    const mem = process.memoryUsage();
    const lines = [
      '╭━━〔 🩺 VOID DOCTOR 〕━━╮',
      `┃ Connection: ${ctx.isWhatsAppConnected?.() ? '🟢 ONLINE' : '🔴 OFFLINE'}`,
      `┃ Plugins: ${report.loaded ?? ctx.getTotalCommandCount?.() ?? 0}`,
      `┃ Plugin errors: ${failures.length}`,
      `┃ Session files: ${sessionExists ? '🟢 FOUND' : '🟡 NONE'}`,
      `┃ Node: ${process.version}`,
      `┃ Platform: ${os.platform()} ${os.arch()}`,
      `┃ RSS: ${Math.round(mem.rss / 1048576)} MB`,
      `┃ Silent permissions: ${settings.silentPermissions !== false ? 'ON' : 'OFF'}`,
      '╰━━━━━━━━━━━━━━━━━━━━━━╯'
    ];
    if (failures.length) {
      lines.push('', '⚠️ *Plugin load issues*');
      for (const item of failures.slice(0, 8)) lines.push(`• ${item.file}: ${item.error}`);
    } else {
      lines.push('', '✅ No command-loader errors were reported.');
    }
    await sock.sendMessage(msg.key.remoteJid, { text: lines.join('\n') }, { quoted: msg });
  }
};
