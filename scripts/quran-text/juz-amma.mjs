// Adds to src/data/quranAyahs.ts the ayahs of Juz 'Amma (surahs 78 to 114) that it does not have yet, so each of
// those surahs is there whole: Memorize surahs can then offer it, and the listening questions can use all its ayahs.
//
// Usage: node scripts/quran-text/juz-amma.mjs <path to quran-json@3.1.2 dist/quran.json>
//   (get it with: npm pack quran-json@3.1.2 && tar xzf quran-json-3.1.2.tgz)
// Each ayah is copied exactly from quran-json, the source of src/data/quranAyahs.ts; nothing is typed by hand. The
// ayahs go in one section at the end of QURAN_AYAHS, written again on each run. It also checks that every ayah of
// those surahs already in the file is the same as quran-json's, mark for mark.
import fs from "node:fs";
import path from "node:path";

const FIRST = 78;
const LAST = 114;
const SECTION = "  // Juz 'Amma whole: its other ayahs, for Memorize surahs (scripts/quran-text/juz-amma.mjs)";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "../..");
const quranPath = process.argv[2];
if (!quranPath) throw new Error("Pass the path to quran-json's dist/quran.json");
const quran = JSON.parse(fs.readFileSync(quranPath, "utf8"));
const file = path.join(root, "src/data/quranAyahs.ts");
const lines = fs.readFileSync(file, "utf8").split("\n");

// The object's lines, without this script's section from an earlier run.
const start = lines.findIndex((line) => line.startsWith("export const QURAN_AYAHS"));
const end = lines.findIndex((line, index) => index > start && line === "};");
if (start < 0 || end < 0) throw new Error("QURAN_AYAHS not found");
let body = lines.slice(start + 1, end);
const sectionAt = body.indexOf(SECTION);
if (sectionAt >= 0) {
  const after = body.findIndex((line, index) => index > sectionAt && line.startsWith("  // "));
  body = [...body.slice(0, sectionAt), ...(after < 0 ? [] : body.slice(after))];
}

const have = new Map();
for (const line of body) {
  const match = /^ {2}"(\d+:\d+)": ("(?:[^"\\]|\\.)*"),/.exec(line);
  if (match) have.set(match[1], JSON.parse(match[2]));
}

const added = [];
for (let surah = FIRST; surah <= LAST; surah += 1) {
  const chapter = quran[surah - 1];
  if (!chapter || chapter.id !== surah) throw new Error(`No surah ${surah}`);
  for (const verse of chapter.verses) {
    const key = `${surah}:${verse.id}`;
    if (have.has(key)) {
      if (have.get(key) !== verse.text) throw new Error(`${key} is not quran-json's text`);
      continue;
    }
    added.push(`  ${JSON.stringify(key)}: ${JSON.stringify(verse.text)}, // ${chapter.transliteration}`);
  }
}

const section = added.length ? [SECTION, ...added] : [];
fs.writeFileSync(file, [...lines.slice(0, start + 1), ...body, ...section, ...lines.slice(end)].join("\n"));
console.log(`${added.length} ayahs added`);
