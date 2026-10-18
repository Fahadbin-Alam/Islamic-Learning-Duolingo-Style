// Builds the public support, privacy, terms and account deletion pages into _site/.
// Values in site/site.config.json replace {{KEY}} placeholders; the build fails while any is blank
// so a page with placeholder text can never be published.
import { copyFileSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const siteDir = join(root, "site");
const outDir = join(root, "_site");
const config = JSON.parse(readFileSync(join(siteDir, "site.config.json"), "utf8"));

const blank = Object.entries(config).filter(([, value]) => !String(value).trim()).map(([key]) => key);
if (blank.length > 0) {
  console.error(`Fill in ${blank.join(", ")} in site/site.config.json before building the site.`);
  process.exit(1);
}

const escapeHtml = (value) =>
  String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

rmSync(outDir, { recursive: true, force: true });
mkdirSync(outDir, { recursive: true });

for (const file of readdirSync(siteDir)) {
  if (file === "site.config.json") {
    continue;
  }

  if (!file.endsWith(".html")) {
    copyFileSync(join(siteDir, file), join(outDir, file));
    continue;
  }

  const html = readFileSync(join(siteDir, file), "utf8").replace(/\{\{(\w+)\}\}/g, (match, key) => {
    if (!(key in config)) {
      console.error(`${file} uses {{${key}}}, which is not in site/site.config.json.`);
      process.exit(1);
    }
    return escapeHtml(config[key]);
  });
  writeFileSync(join(outDir, file), html);
}

copyFileSync(join(root, "assets", "icon.png"), join(outDir, "icon.png"));
copyFileSync(join(root, "assets", "favicon.png"), join(outDir, "favicon.png"));
writeFileSync(join(outDir, ".nojekyll"), "");

console.log(`Built ${readdirSync(outDir).length} files into _site/`);
