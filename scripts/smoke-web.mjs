// Opens the exported web build in a real (headless) browser and fails if the app does not start.
//
// Version 15 bundled fine and passed every test, then showed a blank screen on every phone: a lesson read data
// that wasn't there while the app was loading. Bundling never runs the code, so this script actually opens it.
//
//   npx expo export --platform web --output-dir dist-web
//   node scripts/smoke-web.mjs dist-web
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize, resolve } from "node:path";
import { chromium } from "playwright";

const root = resolve(process.argv[2] ?? "dist");
const TYPES = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".jpg": "image/jpeg", ".svg": "image/svg+xml", ".ttf": "font/ttf", ".mp3": "audio/mpeg", ".wav": "audio/wav", ".ico": "image/x-icon" };

const server = createServer(async (request, response) => {
  const path = decodeURIComponent(new URL(request.url ?? "/", "http://x").pathname);
  let file = normalize(join(root, path));
  if (!file.startsWith(root)) {
    response.writeHead(403).end();
    return;
  }
  try {
    if ((await stat(file)).isDirectory()) file = join(file, "index.html");
  } catch {
    // A page route of the single-page app: serve the app itself.
    file = join(root, "index.html");
  }
  try {
    const body = await readFile(file);
    response.writeHead(200, { "Content-Type": TYPES[extname(file)] ?? "application/octet-stream" }).end(body);
  } catch {
    response.writeHead(404).end();
  }
});
await new Promise((done) => server.listen(0, "127.0.0.1", done));
const url = `http://127.0.0.1:${server.address().port}/`;

const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
const errors = [];
let failed = false;
try {
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto(url, { waitUntil: "load", timeout: 60_000 });
  // The first screen (language picker, welcome or home) has words on it once the app has started.
  await page.waitForFunction(() => (document.getElementById("root")?.innerText ?? "").trim().length > 20, null, { timeout: 60_000 }).catch(() => undefined);
  await page.waitForTimeout(3000);
  const text = await page.evaluate(() => (document.getElementById("root")?.innerText ?? "").trim());
  if (errors.length) {
    console.error(`The app threw while starting:\n${errors.join("\n")}`);
    failed = true;
  }
  if (text.length <= 20) {
    console.error("The app shows a blank screen after start-up.");
    failed = true;
  }
  if (/something went wrong|try again/i.test(text) && text.length < 400) {
    console.error(`The app opened on its crash screen:\n${text}`);
    failed = true;
  }
  if (!failed) console.log(`The app started fine. First screen begins: ${JSON.stringify(text.slice(0, 80))}`);
} finally {
  await browser.close();
  server.close();
}
process.exit(failed ? 1 : 0);
