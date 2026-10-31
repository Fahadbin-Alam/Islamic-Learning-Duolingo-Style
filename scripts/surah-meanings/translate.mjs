// Adds the Bengali, Urdu and Arabic of the surah meaning lessons (src/data/surahMeanings) to the content catalogs.
//
// Usage: I18N_DUMP=1 npx jest src/__tests__/contentSource.test.ts   (lists every text, scripts/i18n/content-source.json)
//        node scripts/surah-meanings/translate.mjs
// Each text a catalog is missing is looked up in scripts/surah-meanings/translations/*.json
// ({ "English": ["Bengali", "Urdu", "Arabic"] }), or built from its parts when it is one of the patterns the
// lessons repeat ("Quran 2:1-7", "Ayahs 1-7: what are they about?"...). A text already in a catalog is never changed.
// Texts it cannot find are listed at the end. The texts it added are kept in added.json, so one the lessons stop
// using is taken out of the catalogs again.
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "../..");
const LANGUAGES = ["bn", "ur", "ar"];
const dir = path.join(root, "scripts/surah-meanings/translations");
const known = {};
for (const file of fs.readdirSync(dir).filter((name) => name.endsWith(".json")).sort()) {
  for (const [english, texts] of Object.entries(JSON.parse(fs.readFileSync(path.join(dir, file), "utf8")))) {
    if (!Array.isArray(texts) || texts.length !== 3 || texts.some((text) => typeof text !== "string" || !text.trim())) throw new Error(`${file}: ${english}`);
    if (known[english] && known[english].join("|") !== texts.join("|")) throw new Error(`${file}: "${english}" is translated twice, differently`);
    known[english] = texts;
  }
}
const catalogs = Object.fromEntries(LANGUAGES.map((language) => [language, JSON.parse(fs.readFileSync(path.join(root, `src/translations/content/${language}.json`), "utf8"))]));
// The app looks words up in the screens' catalog too (src/translations/index.ts), so a word there is translated.
const screens = Object.fromEntries(LANGUAGES.map((language) => [language, JSON.parse(fs.readFileSync(path.join(root, `src/translations/ui/${language}.json`), "utf8"))]));

// {r} is an ayah or a range, kept as written; {x} is another text, translated on its own.
const PATTERNS = [
  [/^Quran (\d+:\d+(?:-\d+)?)$/, { bn: "কুরআন {r}", ur: "قرآن {r}", ar: "القرآن {r}" }],
  [/^Tafsir Ibn Kathir (\d+:\d+(?:-\d+)?)$/, { bn: "তাফসীর ইবনে কাসীর {r}", ur: "تفسیر ابن کثیر {r}", ar: "تفسير ابن كثير {r}" }],
  [/^Tafsir as-Sa'di (\d+:\d+(?:-\d+)?)$/, { bn: "তাফসীর আস-সা'দী {r}", ur: "تفسیر السعدی {r}", ar: "تفسير السعدي {r}" }],
  [/^Ayahs (\d+-\d+): what are they about\?$/, { bn: "আয়াত {r}: এগুলো কী নিয়ে?", ur: "آیات {r}: یہ کس بارے میں ہیں؟", ar: "الآيات {r}: عمّ تتحدث؟" }],
  [/^Ayah (\d+): what is it about\?$/, { bn: "আয়াত {r}: এটি কী নিয়ে?", ur: "آیت {r}: یہ کس بارے میں ہے؟", ar: "الآية {r}: عمّ تتحدث؟" }],
  [/^Ayahs (\d+-\d+) say: (.+)$/, { bn: "আয়াত {r} বলে: {x}", ur: "آیات {r} کہتی ہیں: {x}", ar: "تقول الآيات {r}: {x}" }],
  [/^Ayah (\d+) says: (.+)$/, { bn: "আয়াত {r} বলে: {x}", ur: "آیت {r} کہتی ہے: {x}", ar: "تقول الآية {r}: {x}" }],
  [/^()Surah (.+)$/, { bn: "সূরা {x}", ur: "سورۃ {x}", ar: "سورة {x}" }],
  [/^()Every ayah of (.+), in simple words\.$/, { bn: "{x}-এর প্রতিটি আয়াত, সহজ কথায়।", ur: "{x} کی ہر آیت، آسان الفاظ میں۔", ar: "كل آيات سورة {x} بكلمات بسيطة." }],
  [/^()Can you still remember these about (.+)\?$/, { bn: "{x} সম্পর্কে এগুলো কি এখনো মনে আছে?", ur: "کیا {x} کے بارے میں یہ باتیں اب بھی یاد ہیں؟", ar: "هل ما زلت تذكر هذه عن سورة {x}؟" }],
  [/^()The last test: everything about (.+)!$/, { bn: "শেষ পরীক্ষা: {x}-এর সবকিছু!", ur: "آخری امتحان: {x} کے بارے میں سب کچھ!", ar: "الاختبار الأخير: كل شيء عن سورة {x}!" }]
];

function translate(text, index) {
  if (known[text]) return known[text][index];
  const language = LANGUAGES[index];
  if (catalogs[language][text] || screens[language][text]) return catalogs[language][text] || screens[language][text];
  for (const [pattern, forms] of PATTERNS) {
    const match = pattern.exec(text);
    if (!match) continue;
    const [, range, part] = match;
    const inner = part === undefined ? "" : translate(part, index);
    if (inner === undefined) return undefined;
    return forms[LANGUAGES[index]].replace("{r}", range).replace("{x}", inner);
  }
  return undefined;
}

const source = JSON.parse(fs.readFileSync(path.join(root, "scripts/i18n/content-source.json"), "utf8"));
const used = new Set(source.map(({ text }) => text));
const manifestPath = path.join(root, "scripts/surah-meanings/added.json");
const ours = new Set(fs.existsSync(manifestPath) ? JSON.parse(fs.readFileSync(manifestPath, "utf8")) : []);
const unknown = new Set();
let added = 0;
let removed = 0;
LANGUAGES.forEach((language, index) => {
  const catalog = catalogs[language];
  for (const text of ours) {
    if (!used.has(text) && catalog[text]) {
      delete catalog[text];
      removed += 1;
    }
  }
  for (const { text } of source) {
    if (catalog[text] || screens[language][text]) continue;
    const translated = translate(text, index);
    if (translated) {
      catalog[text] = translated;
      ours.add(text);
      added += 1;
    } else {
      unknown.add(text);
    }
  }
  const sorted = Object.fromEntries(Object.keys(catalog).sort().map((key) => [key, catalog[key]]));
  fs.writeFileSync(path.join(root, `src/translations/content/${language}.json`), `${JSON.stringify(sorted, null, 2)}\n`);
});
fs.writeFileSync(manifestPath, `${JSON.stringify([...ours].filter((text) => used.has(text)).sort(), null, 1)}\n`);
console.log(`added ${added}, removed ${removed}`);
if (unknown.size) {
  console.log(`not translated (${unknown.size}):`);
  for (const text of unknown) console.log(JSON.stringify(text));
  process.exitCode = 1;
}
