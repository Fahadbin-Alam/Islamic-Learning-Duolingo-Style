// Writes src/data/surahMeaningAyahs.ts: the Arabic of the one ayah each surah meaning card shows.
//
// Usage: node scripts/surah-meanings/pick-ayahs.mjs <path to quran-json@3.1.2 dist/quran.json>
//   (get it with: npm pack quran-json@3.1.2 && tar xzf quran-json-3.1.2.tgz)
// A passage shows the ayah its data names (ayah: N), else its first ayah. Each ayah is copied exactly from
// quran-json, the same source as src/data/quranAyahs.ts; nothing is typed by hand.
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "../..");
const quranPath = process.argv[2];
if (!quranPath) throw new Error("Pass the path to quran-json's dist/quran.json");
const quran = JSON.parse(fs.readFileSync(quranPath, "utf8"));
const dir = path.join(root, "src/data/surahMeanings");
const picked = [];
for (const file of fs.readdirSync(dir).filter((name) => /^s\d{3}\.ts$/.test(name)).sort()) {
  const text = fs.readFileSync(path.join(dir, file), "utf8");
  const surah = Number(/surah: (\d+)/.exec(text)[1]);
  for (const block of text.split(/\n\s*\{\n\s*at: /).slice(1)) {
    const at = /^"([\d-]+)"/.exec(block)[1];
    const named = /\n\s*ayah: (\d+)/.exec(block.split(/\n\s*\}/)[0]);
    const ayah = named ? Number(named[1]) : Number(at.split("-")[0]);
    if (ayah === 0) continue;
    const verse = quran[surah - 1].verses[ayah - 1];
    if (!verse || verse.id !== ayah) throw new Error(`No ayah ${surah}:${ayah}`);
    picked.push([`${surah}:${ayah}`, verse.text, quran[surah - 1].transliteration]);
  }
}
const lines = picked.map(([key, text, name]) => `  ${JSON.stringify(key)}: ${JSON.stringify(text)}, // ${name}`);
fs.writeFileSync(
  path.join(root, "src/data/surahMeaningAyahs.ts"),
  `/**
 * The Arabic of the ayah each surah meaning card shows (src/data/surahMeanings), one per passage.
 *
 * Text: the Uthmani script of the King Fahd Glorious Quran Printing Complex (Madinah), as published by
 * The Noble Qur'an Encyclopedia (https://quranenc.com) and packaged in quran-json@3.1.2
 * (https://github.com/risan/quran-json, Risan Bagja Pradana), licensed CC BY-SA 4.0
 * (https://creativecommons.org/licenses/by-sa/4.0/). Written by scripts/surah-meanings/pick-ayahs.mjs; do not edit.
 */
export const SURAH_MEANING_AYAHS: Record<string, string> = {
${lines.join("\n")}
};
`
);
console.log(`${picked.length} ayahs`);
