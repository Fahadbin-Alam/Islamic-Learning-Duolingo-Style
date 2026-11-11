// Builds src/data/ayahWordTimes.json: where each word of every ayah starts in Sheikh Mishary Alafasy's recitation
// (the everyayah.com recordings the app streams, see src/services/quranAudio.ts), so an ayah's words can light up as
// he recites them. From the word-by-word timings of quran-align by Collin Fair (https://github.com/cpfair/quran-align),
// whose data is licensed CC BY 4.0 (https://creativecommons.org/licenses/by/4.0/): its release file
// Alafasy_128kbps.json (also at https://raw.githubusercontent.com/darvin/quran-align-data-2016-11-24/main/Alafasy_128kbps.json).
//
// A "word" is as quran-align counts them: the Tanzil Uthmani text split at its spaces. Each ayah becomes a line of
// centiseconds: when its first word starts, then how long until each next word starts, then until the last one ends
// (so n words give n + 1 numbers). Words the aligner heard as one are shared out evenly; a word it missed gets the
// time between its neighbours.
//
// Usage: node scripts/quran-word-times/build.mjs <Alafasy_128kbps.json>
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const [input] = process.argv.slice(2);
if (!input) {
  console.error("Usage: node scripts/quran-word-times/build.mjs <Alafasy_128kbps.json>");
  process.exit(1);
}
const root = join(dirname(fileURLToPath(import.meta.url)), "../..");
const entries = JSON.parse(readFileSync(input, "utf8"));

function wordStarts(segments) {
  const count = Math.max(0, ...segments.map((segment) => segment[1]));
  const starts = new Array(count).fill(undefined);
  for (const [from, to, start, end] of segments) {
    for (let word = from; word < to; word++) starts[word] ??= start + ((end - start) * (word - from)) / (to - from);
  }
  // A word with no time of its own: between the words around it.
  for (let word = 0; word < count; word++) {
    if (starts[word] !== undefined) continue;
    let next = word + 1;
    while (next < count && starts[next] === undefined) next++;
    const before = word > 0 ? starts[word - 1] : 0;
    const after = next < count ? starts[next] : Math.max(...segments.map((segment) => segment[3]));
    starts[word] = before + (after - before) / (next - word + 1);
  }
  // Never earlier than the word before.
  for (let word = 1; word < count; word++) starts[word] = Math.max(starts[word], starts[word - 1]);
  const end = Math.max(starts[count - 1] ?? 0, ...segments.map((segment) => segment[3]));
  return { starts, end };
}

const table = {};
const sorted = [...entries].sort((a, b) => a.surah - b.surah || a.ayah - b.ayah);
for (const { surah, ayah, segments } of sorted) {
  if (!segments.length) continue;
  const { starts, end } = wordStarts(segments);
  const centis = [...starts, end].map((ms) => Math.round(ms / 10));
  table[`${surah}:${ayah}`] = centis.map((value, index) => (index === 0 ? value : value - centis[index - 1])).join(" ");
}
const out = join(root, "src/data/ayahWordTimes.json");
writeFileSync(out, `${JSON.stringify(table, null, 0).replace(/","/g, '",\n"').replace(/^\{/, "{\n").replace(/\}$/, "\n}")}\n`);
console.log(`${Object.keys(table).length} ayahs -> ${out}`);
