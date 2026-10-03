import dotenv from 'dotenv';
import { BOT, ENDPOINTS, API_KEYS, hasKey } from './Paxton/endpoints.js';

dotenv.config({ path: './.env' });

export const config = Object.freeze({
  botName: process.env.BOT_NAME || BOT.name,
  prefix: process.env.PREFIX || BOT.prefix,
  version: BOT.version,
  ownerName: process.env.OWNER_NAME || 'Paxton',
  ownerNumber: process.env.OWNER_NUMBER || '',
  sessionId: process.env.SESSION_ID || '',
  mode: process.env.BOT_MODE || 'public',
  updateChannel: process.env.UPDATE_CHANNEL || '120363427360133880@newsletter'
});

export { BOT, ENDPOINTS, API_KEYS, hasKey };
export default config;
