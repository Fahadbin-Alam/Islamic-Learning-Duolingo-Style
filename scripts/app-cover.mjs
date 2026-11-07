// Renders the app cover (store/graphics/source/cover.html) into the app icon, the Android adaptive icon,
// the splash image, the favicon, and the Google Play icon and feature graphic.
//
//   npm i --no-save playwright && node scripts/app-cover.mjs
//
// CHROMIUM_PATH points it at another Chromium. Opaque parts come out without an alpha channel, which App Store
// Connect needs for the icon; the adaptive foreground and splash keep their clear background.
import { chromium } from "playwright";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const ROOT = resolve(import.meta.dirname, "..");
const PAGE = pathToFileURL(join(ROOT, "store", "graphics", "source", "cover.html")).href;
const asset = (name) => join(ROOT, "assets", name);
const play = (name) => join(ROOT, "store", "graphics", "google-play", name);

// [part, output, width, height, scale, keep the clear background]
const SHOTS = [
  ["icon", asset("icon.png"), 1024, 1024, 1, false],
  ["icon", asset("favicon.png"), 1024, 1024, 0.25, false],
  ["icon", play("icon-512.png"), 1024, 1024, 0.5, false],
  ["adaptive-bg", asset("adaptive-icon-background.png"), 1024, 1024, 1, false],
  ["adaptive-fg", asset("adaptive-icon.png"), 1024, 1024, 1, true],
  ["splash", asset("splash-icon.png"), 1024, 1024, 1, true],
  // Last: the feature graphic shows the icon.png made above.
  ["feature", play("feature-graphic.png"), 1024, 500, 1, false]
];

const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
for (const [part, file, width, height, scale, clear] of SHOTS) {
  const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: scale });
  await page.goto(`${PAGE}?part=${part}`);
  await page.evaluate(() => document.fonts.ready);
  await page.waitForLoadState("networkidle");
  await page.screenshot({ path: file, omitBackground: clear });
  await page.close();
  console.log(file.slice(ROOT.length + 1));
}
await browser.close();
