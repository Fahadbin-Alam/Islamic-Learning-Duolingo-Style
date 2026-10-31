// Downloads the lesson photos named in places.json from Wikimedia Commons and records who to credit.
// Usage: node scripts/lesson-pictures/fetch.mjs   (Node 18+; needs internet to commons.wikimedia.org)
// Only Public domain, CC0, CC BY and CC BY-SA files are accepted. The photos are saved (Commons serves ~960px) in
// assets/pictures/<id>.jpg and the credits in src/data/lessonPictureCredits.json. Afterwards shrink each to 640px wide
// (JPEG, under 90 KB), add it to src/data/lessonPictureImages.ts and docs/photo-credits.md, and look at every photo:
// places and things only, never a picture of a prophet, a Companion or anyone meant to stand for them.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const places = JSON.parse(fs.readFileSync(path.join(ROOT, "scripts/lesson-pictures/places.json"), "utf8"));
const OUT = path.join(ROOT, "assets/pictures");
const CREDITS = path.join(ROOT, "src/data/lessonPictureCredits.json");
const UA = { "User-Agent": "MuslimoLessonPictures/1.0 (https://github.com/Fahadbin-Alam/Islamic-Learning-Duolingo-Style)" };
const FREE = /^(public domain|pd\b|cc0|cc[- ]by(-sa)?[- ]\d)/i;
const NOT_FREE = /\b(nc|nd|fair use|non-?free)\b/i;

const strip = (html = "") => html.replace(/<[^>]*>/g, "").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/\s+/g, " ").trim();

fs.mkdirSync(OUT, { recursive: true });
const credits = {};
let failed = 0;
for (const place of places) {
  if (!place.file) {
    console.error(`${place.id}: no file chosen`);
    failed++;
    continue;
  }
  const title = place.file.startsWith("File:") ? place.file : `File:${place.file}`;
  const api = `https://commons.wikimedia.org/w/api.php?action=query&format=json&prop=imageinfo&iiprop=url|extmetadata&iiurlwidth=800&titles=${encodeURIComponent(title)}`;
  const data = await (await fetch(api, { headers: UA })).json();
  const page = Object.values(data.query.pages)[0];
  const info = page?.imageinfo?.[0];
  if (!info) {
    console.error(`${place.id}: ${title} not found`);
    failed++;
    continue;
  }
  const meta = info.extmetadata ?? {};
  const license = strip(meta.LicenseShortName?.value);
  if (!FREE.test(license) || NOT_FREE.test(license)) {
    console.error(`${place.id}: ${title} has license "${license}", not free enough`);
    failed++;
    continue;
  }
  const image = await fetch(info.thumburl ?? info.url, { headers: UA });
  fs.writeFileSync(path.join(OUT, `${place.id}.jpg`), Buffer.from(await image.arrayBuffer()));
  credits[place.id] = {
    file: page.title,
    page: info.descriptionurl,
    author: strip(meta.Artist?.value) || "Unknown author",
    license,
    licenseUrl: meta.LicenseUrl?.value ?? ""
  };
  console.log(`${place.id}: ${page.title} (${license})`);
}
fs.writeFileSync(CREDITS, `${JSON.stringify(credits, null, 2)}\n`);
console.log(`${Object.keys(credits).length} saved, ${failed} failed`);
process.exitCode = failed ? 1 : 0;
