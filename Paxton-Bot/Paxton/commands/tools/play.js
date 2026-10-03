import { searchAndGetSong } from '../../lib/musicApi.js';

export default {
  name: 'play',
  alias: ['song', 'music', 'ytmp3'],
  description: 'Search and download a song through Savplay (Railway). Usage: .play <song name>',
  async execute(sock, msg, args) {
    const chatId = msg.key.remoteJid;
    const query = args.join(' ').trim();
    if (!query) return sock.sendMessage(chatId, { text: '🎵 Usage: .play <song name>' }, { quoted: msg });
    try {
      await sock.sendMessage(chatId, { text: `🎵 Searching Savplay for *${query}*...` }, { quoted: msg });
      const result = await searchAndGetSong(query);
      if (!result?.audio) throw new Error('Savplay returned no playable audio URL.');
      const audioUrl = result.audio;
      const title = result.title || query;
      await sock.sendMessage(chatId, {
        audio: { url: audioUrl },
        mimetype: 'audio/mpeg',
        fileName: `${title.replace(/[\\/:*?"<>|]/g, '_')}.mp3`,
        caption: `🎵 *${title}*\n🎧 Powered by Savplay`
      }, { quoted: msg });
    } catch (error) {
      await sock.sendMessage(chatId, {
        text: `❌ Play failed: ${error.message}\n\nMake sure SAVPLAY_API_URL/SAVPLAY_API_KEY and SAVPLAY_PLAY_PATH are configured.`
      }, { quoted: msg });
    }
  }
};
