// Paxton Tech — central endpoint configuration.
// Secrets are read from .env and are never hard-coded.
import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

export const BOT = Object.freeze({
  name: process.env.BOT_NAME || 'Paxton Tech',
  prefix: process.env.PREFIX || '.',
  version: process.env.BOT_VERSION || '2.2.0',
  repo: process.env.GITHUB_REPO_URL || 'https://github.com/gpaxton428-collab/Paxton-MD.git'
});

export const ENDPOINTS = Object.freeze({
  savplay: process.env.SAVPLAY_API_URL || 'https://savplay-production.up.railway.app',
  wolvarex: process.env.WOLVAREX_API_URL || 'https://apix.wolvarex.com/api'
});

export const API_KEYS = Object.freeze({
  savplay: process.env.SAVPLAY_API_KEY || '',
  wolvarex: process.env.WOLVAREX_API_KEY || '',
  openai: process.env.OPENAI_API_KEY || '',
  anthropic: process.env.ANTHROPIC_API_KEY || '',
  removebg: process.env.REMOVEBG_API_KEY || '',
  weather: process.env.OPENWEATHER_API_KEY || ''
});

export const API_ROUTES = Object.freeze({
  // Savplay is intentionally reserved for music/song commands.
  savplayPlay: process.env.SAVPLAY_PLAY_PATH || '/play',
  savplaySearch: process.env.SAVPLAY_SEARCH_PATH || '/search',
  // Wolvarex Apix is used for AI and general API-backed commands.
  wolvarexAi: process.env.WOLVAREX_AI_PATH || '/ai',
  wolvarexChat: process.env.WOLVAREX_CHAT_PATH || '/chat'
});

export const hasKey = (name) => Boolean(API_KEYS[name]?.trim());
