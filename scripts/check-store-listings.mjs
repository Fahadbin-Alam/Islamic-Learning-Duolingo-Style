// Checks every "(max N)" block in the store listings against its character limit.
// Usage: node scripts/check-store-listings.mjs
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const FILES = [
  "store/google-play/listing.en-US.md",
  "store/app-store/listing.en-US.md",
  ...fs.readdirSync(path.join(ROOT, "store/localized")).filter((name) => name.endsWith(".md")).map((name) => `store/localized/${name}`)
];

let problems = 0;
for (const file of FILES) {
  const text = fs.readFileSync(path.join(ROOT, file), "utf8");
  // A heading with "(max 1,234 ...)" followed (after optional prose) by a fenced block.
  const pattern = /^#{2,3} ([^\n]*?)\(max ([\d,]+)[^)]*\)\n[\s\S]*?```\n([\s\S]*?)\n```/gm;
  let match;
  let checked = 0;
  while ((match = pattern.exec(text))) {
    const [, label, maxText, block] = match;
    const max = Number(maxText.replace(/,/g, ""));
    // Stores count characters, not bytes; Array.from counts each code point once.
    // Apple's keyword field is limited in bytes (UTF-8), which matters for Bangla, Urdu and Arabic letters.
    const inBytes = /bytes/i.test(match[0].split("\n")[0]);
    const length = inBytes ? Buffer.byteLength(block, "utf8") : Array.from(block).length;
    checked += 1;
    if (length > max) {
      problems += 1;
      console.error(`${file}: "${label.trim()}" is ${length} ${inBytes ? "bytes" : "characters"}, max ${max}`);
    }
    if (/keywords/i.test(label) && /,\s|\s,/.test(block)) {
      problems += 1;
      console.error(`${file}: keywords must have no spaces around commas`);
    }
  }
  console.log(`${file}: ${checked} fields checked`);
}
if (problems) {
  process.exitCode = 1;
} else {
  console.log("All store listing fields fit.");
}
