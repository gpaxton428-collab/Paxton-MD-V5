import { reply } from '../../lib/helpers/reply.js';
export default {
  name: 'logos',
  alias: ['logohelp', 'menulogo'],
  description: 'Show how to add custom Void menu logos.',
  ownerOnly: true,
  async execute(sock, msg, args, prefix) {
    await reply(sock, msg,
`🎨 *VOID MD — CUSTOM LOGOS*

📁 Local logos:
Add PNG, JPG or WEBP files to:
assets/menu-logos/

Example:
assets/menu-logos/my-logo.png
assets/menu-logos/neon.webp

🔄 The bot automatically picks a logo for menu/ping/runtime messages.

💡 Tips:
• Use a square image for the cleanest result.
• Keep files reasonably small for faster sending.
• Remove old logos you no longer want.
• Restart the bot after changing files.

🌐 Remote menu image:
${prefix}setmenuimage on
Set MENU_IMAGE_URL in .env to your image URL.

📌 This command only shows instructions — it never uploads files anywhere.`
    );
  }
};
