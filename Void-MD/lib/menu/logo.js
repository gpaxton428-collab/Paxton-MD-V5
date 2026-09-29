import fs from 'fs';
import path from 'path';

const DIR = path.join(process.cwd(), 'assets', 'menu-logos');

export function getRandomMenuLogo() {
  try {
    const files = fs.readdirSync(DIR)
      .filter((f) => /\.(png|jpe?g|webp)$/i.test(f))
      .sort();
    if (!files.length) return null;
    const pick = files[Math.floor(Math.random() * files.length)];
    return fs.readFileSync(path.join(DIR, pick));
  } catch {
    return null;
  }
}
