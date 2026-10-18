// Captures store screenshots from the web build and frames them with captions,
// then renders the Google Play feature graphic. Output goes to store/graphics/.
//
//   npx expo export -p web --output-dir dist
//   npx serve dist -l 8090          (any static server on port 8090 works)
//   npm i --no-save playwright && node scripts/store-graphics.mjs
//
// Pass a device prefix (for example "iphone") to redo only that size.
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const APP_URL = process.env.APP_URL ?? "http://localhost:8090/";
const ROOT = resolve(import.meta.dirname, "..");
const OUT = join(ROOT, "store", "graphics");
const SOURCE = join(OUT, "source");
const RAW = join(tmpdir(), "sira-path-raw-screens");
mkdirSync(RAW, { recursive: true });

// Viewport in points, scale factor, the store folder and whether to use the tablet frame.
const DEVICES = {
  "iphone-6.9": { w: 440, h: 956, dpr: 3, dir: "app-store/iphone-6.9", tablet: false }, // 1320 x 2868
  "ipad-13": { w: 1032, h: 1376, dpr: 2, dir: "app-store/ipad-13", tablet: true }, // 2064 x 2752
  "android-phone": { w: 405, h: 720, dpr: 8 / 3, dir: "google-play/phone", tablet: false }, // 1080 x 1920
  "android-tablet": { w: 720, h: 1280, dpr: 2, dir: "google-play/tablet", tablet: true } // 1440 x 2560
};

const CAPTIONS = {
  "01-home": "Learn Islam a few minutes a day",
  "02-path": "Wudu and salah, step by step",
  "03-question": "One clear question at a time",
  "04-feedback": "Answer, learn why, keep going",
  "05-complete": "Keep your streak, earn rewards",
  "06-topics": "Quran, Sahabah, manners and more",
  "07-shop": "Start free, upgrade anytime",
  "08-profile": "Watch your progress grow"
};

// A learner three lessons into the wudu branch with a 23 day streak, partway to today's goal.
const SEED_PROFILE = () => {
  const key = "sira-path-user-profile";
  const today = new Date().toISOString().slice(0, 10);
  const user = JSON.parse(localStorage[key]);
  const nodes = ["what-wudu-is", "why-wudu-matters", "conditions-before-wudu"].map((slug) => `prayer-wudu-${slug}`);
  Object.assign(user, {
    displayName: "Aisha Khan",
    avatarInitials: "AK",
    username: "aisha",
    hasAccount: true,
    accountProvider: "email",
    accountEmail: "aisha@example.com",
    streakDays: 23,
    totalXp: 340,
    dailyXp: { date: today, xp: 24 },
    gems: 640,
    completedNodeIds: nodes,
    completedLessonIds: nodes.map((id) => `lesson-${id}`)
  });
  localStorage[key] = JSON.stringify(user);
};

const byText = (page, text, exact = true) => page.getByText(text, { exact }).first();
const pause = (page, ms) => page.waitForTimeout(ms);
async function tap(page, text, exact = true, wait = 900) {
  await byText(page, text, exact).click();
  await pause(page, wait);
}
async function scrollTo(page, text, block = "start") {
  await byText(page, text).evaluate((el, b) => el.scrollIntoView({ block: b }), block);
  await pause(page, 600);
}

async function openLessonQuestion(page) {
  await tap(page, "Continue topic");
  await tap(page, "Start lesson");
  await tap(page, "Continue");
  await tap(page, "Read now");
  await tap(page, "Continue to practice");
  await tap(page, "Reveal the takeaway");
  await tap(page, "Try it");
  await page.getByText("Start using the phrase or habit in the next", { exact: false }).nth(1).click();
  await pause(page, 500);
  await tap(page, "Check practice");
  await tap(page, "Go to question");
}

const SCREENS = {
  async "01-home"() {},
  async "02-path"(page) {
    await tap(page, "Prayer");
    await tap(page, "Wudu");
    // Put the top of the lesson path just under the top bar, past the recommended-step card.
    const button = byText(page, "Test out cluster 1");
    await button.evaluate((el) => el.scrollIntoView({ block: "start" }));
    await pause(page, 300);
    const box = await button.boundingBox();
    await page.mouse.move(box.x, box.y + 200);
    await page.mouse.wheel(0, box.height + 44);
    await pause(page, 700);
  },
  async "03-question"(page) {
    await openLessonQuestion(page);
    await tap(page, "As-salamu alaikum");
  },
  async "04-feedback"(page) {
    await openLessonQuestion(page);
    await tap(page, "As-salamu alaikum");
    await tap(page, "Check", true, 1500);
  },
  async "05-complete"(page) {
    await openLessonQuestion(page);
    for (const answer of ["As-salamu alaikum", "False", "Peace and warmth"]) {
      await tap(page, answer);
      await tap(page, "Check");
      await tap(page, "Continue", true, 1200);
    }
    await pause(page, 3500);
  },
  async "06-topics"(page) {
    await scrollTo(page, "Choose a topic");
  },
  async "07-shop"(page) {
    await tap(page, "Shop");
  },
  async "08-profile"(page) {
    await tap(page, "Aisha");
  }
};

async function captureScreen(browser, device, name) {
  const context = await browser.newContext({
    viewport: { width: device.w, height: device.h },
    deviceScaleFactor: device.dpr,
    hasTouch: true
  });
  const page = await context.newPage();
  // "Read now" opens the source in a new tab; close it and stay in the lesson.
  context.on("page", async (other) => {
    if (other !== page) {
      await other.close().catch(() => {});
      await page.bringToFront();
    }
  });
  await page.goto(APP_URL);
  await pause(page, 1500);
  await tap(page, "Save language", true, 500);
  await page.evaluate(SEED_PROFILE);
  await page.reload();
  await pause(page, 1500);
  await SCREENS[name](page);
  // Reset sideways-scrolled rows and move the pointer off any hover state.
  await page.evaluate(() => document.querySelectorAll("*").forEach((el) => { if (el.scrollLeft) el.scrollLeft = 0; }));
  await page.mouse.move(0, 0);
  await pause(page, 700);
  const file = join(RAW, `${device.key}-${name}.png`);
  await page.screenshot({ path: file });
  await context.close();
  return file;
}

async function frame(browser, device, name, rawFile) {
  const width = Math.round(device.w * device.dpr);
  const height = Math.round(device.h * device.dpr);
  const page = await browser.newPage({ viewport: { width, height } });
  const query = new URLSearchParams({
    w: width,
    h: height,
    tablet: device.tablet ? "1" : "0",
    cap: CAPTIONS[name],
    img: pathToFileURL(rawFile).href
  });
  await page.goto(`${pathToFileURL(join(SOURCE, "frame.html")).href}?${query}`);
  await pause(page, 200);
  // The page is fully opaque, so the PNG has no alpha channel, which App Store Connect rejects.
  await page.screenshot({ path: join(OUT, device.dir, `${name}.png`) });
  await page.close();
}

async function featureGraphic(browser, rawFile) {
  const page = await browser.newPage({ viewport: { width: 1024, height: 500 } });
  const query = new URLSearchParams({ img: pathToFileURL(rawFile).href });
  await page.goto(`${pathToFileURL(join(SOURCE, "feature.html")).href}?${query}`);
  await pause(page, 300);
  await page.screenshot({ path: join(OUT, "google-play", "feature-graphic.png") });
  await page.close();
}

const only = process.argv[2];
const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
for (const [key, device] of Object.entries(DEVICES)) {
  if (only && !key.startsWith(only)) continue;
  mkdirSync(join(OUT, device.dir), { recursive: true });
  for (const name of Object.keys(CAPTIONS)) {
    const raw = await captureScreen(browser, { ...device, key }, name);
    await frame(browser, device, name, raw);
    if (key === "iphone-6.9" && name === "02-path") await featureGraphic(browser, raw);
    console.log(`${device.dir}/${name}.png`);
  }
}
await browser.close();
