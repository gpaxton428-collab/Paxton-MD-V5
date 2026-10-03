# Paxton Tech 2.2.0

Paxton Tech WhatsApp bot — menu style 4, one-message menu buttons, endpoint-backed AI, Savplay music, group protection, and 250+ commands.

## What changed

- **Menu Style 4 only** — old menu layouts are removed from the active menu.
- **One menu message** — the rotating supplied logo, menu caption and interactive buttons are sent together. The bot no longer sends a separate buttons-only message.
- **Four supplied menu logos** are installed as `Paxton/media/menu-logos/logo-1.jpg` through `logo-4.jpg`.
- **250 unique commands** are loaded from `Paxton/commands/`.
- **Savplay/Railway is music-only** for `.play`/song commands.
- **Wolvarex Apix** is the primary API-backed AI provider, with OpenAI/Anthropic fallback when configured.
- Added extra anti-group controls: anti-flood, anti-spam, anti-mention, anti-sticker, anti-image, anti-video, anti-invite.
- Added owner developer reaction command: `.devreact <emoji>` by replying to a message.
- `.repo`, `.gitstatus`, `.reload`, `.cleardata` and additional utility/AI commands.
- Keeps the project on the bundled Baileys 7.x line and uses `fetchLatestBaileysVersion()` at runtime.

## Endpoints

```env
SAVPLAY_API_URL=https://savplay-production.up.railway.app
WOLVAREX_API_URL=https://apix.wolvarex.com/api
SAVPLAY_PLAY_PATH=/play
SAVPLAY_SEARCH_PATH=/search
WOLVAREX_AI_PATH=/ai
WOLVAREX_CHAT_PATH=/chat
SAVPLAY_API_KEY=
WOLVAREX_API_KEY=
```

**Important:** API keys stay in `.env`; do not commit them to GitHub. If your API deployment uses different route names, change the four `*_PATH` variables rather than changing command code.

## Core commands

- `.menu`
- `.play <song>` — Savplay/Railway only
- `.ask <question>` / `.gpt4 <question>`
- `.repo`
- `.update`
- `.devreact <emoji>` — owner only, reply to a message
- `.antilink on|off|all`
- `.antipromote on|off`
- `.antidemote on|off`
- `.antiflood on|off`
- `.antispam on|off`
- `.antimention on|off`
- `.antisticker on|off`
- `.antivv`
- `.vv` / `.vv2`

## Termux

```bash
rm -rf ~/Paxton-Tech-2.1.0
unzip ~/storage/downloads/Paxton-Tech-2.2.0.zip -d $HOME
cd ~/Paxton-Tech-2.2.0
npm install
npm start
```
