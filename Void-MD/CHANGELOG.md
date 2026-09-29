# Void MD 1.0.2

- Bot name/branding is Void everywhere; session strings and the pairing web use VOID-MD (old PAXTON-MD / INTIMIDATOR-MD strings still load).
- Owner name, repo links and credits are unchanged (Paxton).
- Startup: real error is printed instead of only "Connection failed"; WhatsApp Web version falls back to a known-good one if the lookup fails.

# Void MD 1.0.0

- Rebranded runtime to Void MD.
- Added a distinct Void Grid menu system.
- Disabled prefixless natural-language/AI wake commands.
- Session generator preserved unchanged from source archive.

# Changelog

## 2.6.1

**Menus**: every command is listed on its own line under its category (Tools → .ping / .runtime / …) in all eight styles. New `.adstag` sets the label above the menu ad (`MENU_ADS_TAG`); `.setmenuads` and `.reloadconfig` show it. The menu message also carries a WhatsApp-style "Ad" badge (`.adstag badge on|off`).
**Status replies**: `.ping`, `.runtime`, `.alive`, `.botinfo`, `.version`, `.stats`, `.sysinfo`, `.botcore` carry a cosmetic "Forwarded many times" label (`BOT_FORWARDED_TAG=off` to hide). `.ping` now sends the result as a new message and removes the "Pinging…" placeholder, because an edit cannot carry the label.
**Dev commands**: `uptime2.js` renamed to `processinfo.js`; all dev commands are `strictOwner` (hidden from sudo users who cannot run them); `.fixsettings` keeps a `.bak` copy; `.npm` only accepts package names and `--depth/--json/--long`; `.devcheck`/`.errorlog` cope with errors that have no scope; `.botcore` uses the same runtime format as `.ping`; wrong "$-prefix" wording removed.

## 2.6.0 — Void MD V2 clean release

**API layer**: single Wolvarex client (`lib/api/`) with timeouts, retry, redaction and tolerant response parsing; music, AI, fun, upload, search, screenshot, weather, Instagram and converter endpoints all use it. Fun commands fall back to their offline lists.
**Fixed**: `.play` rewritten on `/music/ytmp3-search` → `/music/ytmp3-download` with audio validation; `.setbotpp` no longer depends on Baileys' image library (also fixes `.groupicon`); API key was read before `.env` was loaded (empty key when supplied via `.env`); `watermark` imported an undeclared `jimp`; duplicate/dead code in ping/runtime.
**Menus**: text-only, six views × eight styles, ads block (`.setmenuads`), new USER / DOWNLOAD / SEARCH / UTILITY categories. Button menus and the `gifted-btns` / `my-md-btns` dependencies were removed.
**New commands**: `userinfo profile avatar afk reminder usermenu songs plugins reloadplugins setmenuads` and menu shortcuts per category.
**Security**: no secrets in the repo, SSRF guard, sandboxed file commands, strict-owner tier, `.eval`/`.update`/auto-join opt-in, hard-coded developer-number shortcut replaced by `DEV_NUMBERS`, global output redaction.
**Ops**: Dockerfile, compose, Fly.io, Koyeb, graceful SIGTERM, `/health` + `/healthz`, unit tests.
**Removed**: `.buttonmenu`, `.buttontest`, `.video` (guessed endpoints), `wouldyourather2`, unused deps (`pino`, `dotenv`).
