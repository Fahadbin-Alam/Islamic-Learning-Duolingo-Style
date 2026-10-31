// Captures store screenshots from the web build and frames them with captions,
// then renders the Google Play feature graphic. Output goes to store/graphics/.
//
//   EXPO_PUBLIC_MONETIZATION_MODE=sandbox npx expo export -p web --output-dir dist
//   npx serve dist -l 8090          (any static server on port 8090 works)
//   npm i --no-save playwright && node scripts/store-graphics.mjs
//
// Sandbox mode turns on the simulated store, so the shop shows the Premium plans and packs the store build sells,
// at the built-in prices; without it the shop shows only its "Almost every lesson is free!" note.
// Pass a device prefix (for example "iphone") to redo only that size.
// NO_FEATURE_GRAPHIC=1 leaves google-play/feature-graphic.png as it is and redoes only the screenshots.
// APP_URL points it at another server (default http://localhost:8090/), CHROMIUM_PATH at another Chromium.
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const APP_URL = process.env.APP_URL ?? "http://localhost:8090/";
const FEATURE_GRAPHIC = !["1", "true", "yes"].includes((process.env.NO_FEATURE_GRAPHIC ?? "").toLowerCase());
const ROOT = resolve(import.meta.dirname, "..");
const OUT = join(ROOT, "store", "graphics");
const SOURCE = join(OUT, "source");
const RAW = join(tmpdir(), "muslimo-raw-screens");
mkdirSync(RAW, { recursive: true });

// Viewport in points, scale factor, the store folder and whether to use the tablet frame.
const DEVICES = {
  "iphone-6.9": { w: 440, h: 956, dpr: 3, dir: "app-store/iphone-6.9", tablet: false }, // 1320 x 2868
  "ipad-13": { w: 1032, h: 1376, dpr: 2, dir: "app-store/ipad-13", tablet: true }, // 2064 x 2752
  "android-phone": { w: 405, h: 720, dpr: 8 / 3, dir: "google-play/phone", tablet: false }, // 1080 x 1920
  "android-tablet": { w: 720, h: 1280, dpr: 2, dir: "google-play/tablet", tablet: true } // 1440 x 2560
};

// The 06 caption names only topics whose tiles show on every size, and the 08 caption the Me tab's own labels.
// A no-break space keeps a phrase on one line where a two-line caption would split it ("a few minutes", "learn
// why", "clear question": the frame balances the two lines, which would otherwise end the first on "One clear").
// "Free" stays out of the captions: Google Play asks for screenshots without words like "free" or "best".
const CAPTIONS = {
  "01-learn": "Learn Islam a\u00a0few\u00a0minutes a day",
  "02-path": "Wudu and salah, step by step",
  "03-question": "One clear\u00a0question at a time",
  "04-feedback": "Answer, learn\u00a0why, keep going",
  "05-complete": "Keep your streak, earn stars",
  "06-topics": "Prayer, Quran, manners and more",
  "07-shop": "Learn now, upgrade anytime",
  "08-profile": "See your streak, XP and stars"
};

// A learner three lessons into the wudu branch, with a 24 day streak that today's lessons already kept, partway
// to today's goal and on the Prayer topic, so every screen shows the same streak and topic. One heart is gone
// from today's five, so every hearts row in the shop can be used (at full hearts the refill and the heart video
// are muted).
const SEED_PROFILE = () => {
  const key = "sira-path-user-profile";
  // The app keys the day's XP by the local calendar day.
  const now = new Date();
  const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
  const user = JSON.parse(localStorage[key]);
  const nodes = ["what-wudu-is", "why-wudu-matters", "conditions-before-wudu"].map((slug) => `prayer-wudu-${slug}`);
  Object.assign(user, {
    displayName: "Aisha Khan",
    avatarInitials: "AK",
    username: "aisha",
    hasAccount: true,
    accountProvider: "email",
    accountEmail: "aisha@example.com",
    streakDays: 24,
    lastStreakDate: today,
    lastTopicId: "prayer",
    totalXp: 340,
    dailyXp: { date: today, xp: 24 },
    gems: 640,
    hearts: { ...user.hearts, current: user.hearts.max - 1, lastRefillDate: today },
    completedNodeIds: nodes,
    completedLessonIds: nodes.map((id) => `lesson-${id}`)
  });
  localStorage[key] = JSON.stringify(user);
};

// The circle START sits on for that learner: its Learn card (the word النِّيَّةُ), a fill-in question, then a
// True / False one. The wrong answer is "mouth", the mistake the fill-in's Why line ("you don't have to say it out
// loud") answers.
const LESSON_NODE = "prayer-wudu-intention-basics";
const RIGHT_ANSWERS = ["heart", "True"];
const WRONG_ANSWER = "mouth";
// The path's pinned unit banner with a one-line title (STICKY_MIN in LearnPath), until it measures itself.
const PATH_STICKY = 64;

// On web the app sits in a 520 pt column over a patterned backdrop; on a tablet it fills the screen,
// so the capture lifts that cap as soon as the column is drawn.
const FULL_WIDTH = () => {
  const lift = () => {
    for (const el of document.querySelectorAll("div")) {
      if (getComputedStyle(el).maxWidth === "520px") {
        el.style.maxWidth = "none";
        return true;
      }
    }
    return false;
  };
  new MutationObserver((_, observer) => {
    if (lift()) observer.disconnect();
  }).observe(document, { childList: true, subtree: true });
};

// Sheets and pop-ups that may show only on the screen named with them. Any other one open (a guest "Save your
// progress" ask, a notice, the age screen, the grown-up check) would cover the screen, so the capture stops instead.
const SHEETS = [
  "account-sheet",
  "notice-sheet",
  "confirm-sheet",
  "streak-sheet",
  "refill-sheet",
  "settings-sheet",
  "language-sheet",
  "age-sheet",
  "grownup-gate",
  "crew-invite-sheet",
  "crew-friend-sheet",
  "test-out-sheet",
  "test-out-result",
  "reward-pop",
  "quit-sheet",
  "topic-picker",
  "feedback-sheet"
];
const SHEET_FOR = { "04-feedback": "feedback-sheet", "06-topics": "topic-picker" };

const tid = (id) => `[data-testid="${id}"]`;
const pause = (page, ms) => page.waitForTimeout(ms);
async function tap(page, id, wait = 900) {
  const target = page.locator(tid(id)).first();
  await target.scrollIntoViewIfNeeded();
  await target.click();
  await pause(page, wait);
}
async function pick(page, label, wait = 500) {
  await page.locator('[data-testid^="choice-"]').filter({ hasText: new RegExp(`^\\s*${label}\\s*$`) }).first().click();
  await pause(page, wait);
}
async function isOpen(page, id) {
  return (await page.locator(tid(id)).count()) > 0;
}

async function openPrayer(page) {
  await tap(page, "top-bar-topic", 1200);
  await tap(page, "topic-tile-prayer", 1800);
}

// From the path to the lesson's Learn card: the circle's card, then START.
async function openLearnCard(page) {
  await openPrayer(page);
  await tap(page, `path-node-${LESSON_NODE}`, 1000);
  await tap(page, "node-card-start", 1500);
  await page.locator(tid("learn-card")).waitFor();
}

// Then the Learn card's CONTINUE, to the first question.
async function openLessonQuestion(page) {
  await openLearnCard(page);
  await tap(page, "learn-continue", 1500);
}

async function answer(page, label) {
  await pick(page, label);
  await tap(page, "exercise-check", 1500);
  await tap(page, "feedback-continue", 1500);
}

// Scrolls a list the least it takes for its top and bottom edges to fall between lines of text, so the
// screen edge never slices a word in half, and for the `keep` elements (with any line of `keepText`) to show
// whole. Cards matched by `whole` show whole or not at all at both edges; with `hideAtTop`, a card the top edge
// cuts is hidden instead, at the scroll that leaves the least of it on screen. On a path (`sticky` set) a unit banner
// shows whole or has scrolled past the top, where the path pins a copy of it about `sticky` points tall (the edge
// that counts is then that copy's bottom), and so do the circles with their rings, the chests, and the lantern,
// palm or mosque and the mascot beside them. Those come every 98 points or so, which on most screens leaves no
// scroll where both edges fall between them while START shows: the top edge always does, and a picture the bottom
// edge would cut is hidden, at the scroll that leaves the least of it on screen, so only blank path shows there.
// The scrolls that leave the first unit banner whole in the path come first: they show it with its Arabic name and
// the circles above START, where a pinned copy would cover the first of them.
async function scrollClearOfText(page, inside, { keep = [], keepText, whole, hideAtTop = false, sticky = 0, measured = false } = {}) {
  const result = await page.locator(tid(inside)).first().evaluate(
    (root, { keep, keepText, whole, hideAtTop, sticky }) => {
      const list = [root, ...root.querySelectorAll("div")].find(
        (el) => el.scrollHeight > el.clientHeight + 1 && /auto|scroll/.test(getComputedStyle(el).overflowY)
      );
      if (!list) return { hidden: 0 };
      // Bring back what an earlier pass hid.
      for (const el of list.querySelectorAll("[data-capture-hidden]")) {
        el.style.visibility = "";
        el.removeAttribute("data-capture-hidden");
      }
      const origin = list.getBoundingClientRect().top - list.scrollTop;
      const span = (box) => [box.top - origin, box.bottom - origin];
      // What is drawn in an element, such as the START circle and the ring around it, but not the empty room
      // the element leaves for a ring on circles that have none.
      const extent = (box) => {
        const inner = [...box.querySelectorAll("*")];
        const parts = (inner.length ? inner : [box])
          .map((el) => el.getBoundingClientRect())
          .filter((rect) => rect.width > 0 && rect.height > 0)
          .map(span);
        return [Math.min(...parts.map(([top]) => top)), Math.max(...parts.map(([, bottom]) => bottom))];
      };
      // Where each line's glyphs are drawn, not its whole line box: the leading above and below may be cut.
      const pen = document.createElement("canvas").getContext("2d");
      const lines = [];
      const kept = [];
      const walker = document.createTreeWalker(list, NodeFilter.SHOW_TEXT);
      for (let node = walker.nextNode(); node; node = walker.nextNode()) {
        if (!node.textContent.trim()) continue;
        const style = getComputedStyle(node.parentElement);
        pen.font = `${style.fontStyle} ${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
        const metrics = pen.measureText(node.textContent);
        const range = document.createRange();
        range.selectNodeContents(node);
        for (const box of range.getClientRects()) {
          const leading = (box.height - metrics.fontBoundingBoxAscent - metrics.fontBoundingBoxDescent) / 2;
          const baseline = box.top + leading + metrics.fontBoundingBoxAscent;
          const glyphs = span({ top: baseline - metrics.actualBoundingBoxAscent, bottom: baseline + metrics.actualBoundingBoxDescent });
          lines.push(glyphs);
          if (node.textContent.trim() === keepText) kept.push(span(box));
        }
      }
      for (const id of keep) kept.push(extent(list.querySelector(`[data-testid="${id}"]`).parentElement));
      const cards = whole ? [...list.querySelectorAll(whole)].map((el) => ({ el, at: extent(el) })) : [];
      const banners = sticky ? [...list.querySelectorAll('[data-testid^="unit-banner-"]')].map((el) => span(el.getBoundingClientRect())) : [];
      const onPath = '[data-testid^="path-node-"], [data-testid^="path-chest-"], [data-testid^="unit-banner-"]';
      const pictures = (sticky
        ? [
            ...[...list.querySelectorAll('[data-testid^="path-node-"]')].map((el) => el.parentElement),
            ...list.querySelectorAll('[data-testid^="path-chest-"]'),
            // The lantern, palm or mosque beside the circles, and the mascot, with the shadow under them.
            ...[...list.querySelectorAll("svg")]
              .filter((svg) => svg.getBoundingClientRect().height >= 48 && !svg.closest(onPath))
              .map((svg) => (svg.parentElement.getBoundingClientRect().height < svg.getBoundingClientRect().height + 24 ? svg.parentElement : svg))
          ]
        : []
      ).map((el) => ({ el, at: extent(el) }));
      // A line inside a card that is hidden (`skip`) may be cut.
      const slices = (edge, skip = []) =>
        lines.some(([top, bottom]) => top - 4 < edge && edge < bottom + 4 && !skip.some(([start, end]) => start <= top && bottom <= end));
      const across = (edge) => ([start, bottom]) => start < edge && edge < bottom;
      const height = list.clientHeight;
      const last = list.scrollHeight - height;
      const search = (from, to) => {
        let best;
        for (let y = from; y <= to; y += 1) {
          const pinned = banners.some(([, bottom]) => bottom <= y);
          const top = pinned ? y + sticky : y;
          const end = y + height;
          if (banners.some(([start, bottom]) => (start < y && y < bottom) || (pinned && start >= y && start < top) || across(end)([start, bottom]))) continue;
          const topCut = cards.filter(({ at }) => across(top)(at));
          if (topCut.length && !hideAtTop) continue;
          if (slices(top, topCut.map(({ at }) => at)) || slices(end)) continue;
          if (kept.some(([start, bottom]) => start < top || bottom > end)) continue;
          if (cards.some(({ at }) => across(end)(at))) continue;
          if (pictures.some(({ at }) => across(top)(at))) continue;
          // How much shows of the pictures across the bottom edge and of the cards across the top one, which are
          // then hidden.
          const bottomCut = pictures.filter(({ at }) => across(end)(at));
          const cut = [...bottomCut, ...topCut];
          const shows = Math.max(0, ...bottomCut.map(({ at: [start] }) => end - start), ...topCut.map(({ at: [, bottom] }) => bottom - top));
          if (!best || shows < best.shows) best = { y, cut, shows };
          if (!shows) break;
        }
        return best;
      };
      const firstBanner = banners.length ? Math.min(...banners.map(([start]) => start)) : -1;
      const best = (firstBanner >= 0 && search(0, Math.min(firstBanner, last))) || search(0, last);
      if (!best) return undefined;
      list.scrollTop = best.y;
      for (const { el } of best.cut) {
        el.style.visibility = "hidden";
        el.setAttribute("data-capture-hidden", "");
      }
      return { hidden: best.cut.length };
    },
    { keep, keepText, whole, hideAtTop, sticky }
  );
  if (!result) console.warn(`  ${inside}: no scroll keeps every line whole, left as it was`);
  else if (result.hidden) console.log(`  ${inside}: hid ${result.hidden} picture(s) or card(s) an edge would cut`);
  await pause(page, 900);
  // Check the guess against the pinned banner the scroll brought up, and redo it with its real height.
  if (sticky && !measured && (await isOpen(page, "path-sticky"))) {
    const box = await page.locator(tid("path-sticky")).boundingBox();
    if (Math.abs(box.height - sticky) > 0.5) await scrollClearOfText(page, inside, { keep, keepText, whole, hideAtTop, sticky: box.height, measured: true });
  }
}

// Holds the page on one frame for the capture. It waits until no drawing has changed for 200 ms (longer than a
// mascot's blink, so no eye is caught shut and no waving hand mid-way) and, on Lesson complete, until the cheering
// mascot that never stops jumping has landed; then it stops every timer and animation frame.
async function holdStill(page, jumper) {
  await page.evaluate(
    (jumper) =>
      new Promise((done) => {
        const drawing = () => [...document.querySelectorAll("svg")].map((svg) => svg.innerHTML).join("");
        const mascot = jumper ? document.querySelector(jumper) : null;
        const start = performance.now();
        let lowest = -Infinity;
        let last = drawing();
        let changedAt = start;
        const frame = () => {
          const now = performance.now();
          const shown = drawing();
          if (shown !== last) {
            last = shown;
            changedAt = now;
          }
          const top = mascot ? mascot.getBoundingClientRect().top : 0;
          if (mascot && now - start < 2500) lowest = Math.max(lowest, top);
          const landed = !mascot || (now - start >= 2500 && top >= lowest - 1);
          if (landed && now - changedAt >= 200) {
            const lastFrame = requestAnimationFrame(() => {});
            for (let id = 0; id <= lastFrame; id += 1) cancelAnimationFrame(id);
            window.requestAnimationFrame = () => 0;
            const lastTimer = setTimeout(() => {}, 0);
            for (let id = 0; id <= lastTimer; id += 1) clearTimeout(id);
            done();
            return;
          }
          requestAnimationFrame(frame);
        };
        requestAnimationFrame(frame);
      }),
    jumper
  );
}

const SCREENS = {
  async "01-learn"(page) {
    await openLearnCard(page);
  },
  async "02-path"(page) {
    await openPrayer(page);
    // As near the top of the path as shows START whole: on a tall screen the whole Wudu banner, with its Arabic
    // name, and the three finished circles above START; the Android phone is too short for that, so it shows the
    // pinned copy of the banner and the last two finished circles under it.
    await scrollClearOfText(page, "learn-path-prayer", { keep: [`path-node-${LESSON_NODE}`], keepText: "START", sticky: PATH_STICKY });
  },
  async "03-question"(page) {
    // The True / False card, with True picked before CHECK.
    await openLessonQuestion(page);
    await answer(page, RIGHT_ANSWERS[0]);
    await pick(page, RIGHT_ANSWERS[1]);
  },
  async "04-feedback"(page) {
    // A wrong answer, the only kind that shows Why, on the fill-in's first try. Its second try (after the True /
    // False, so the progress bar would be past 03's) shuffles "mouth" to the last tile, which on the Android phone
    // sits under the feedback sheet, so the shot would not show the answer it corrects.
    await openLessonQuestion(page);
    await pick(page, WRONG_ANSWER);
    await tap(page, "exercise-check", 1500);
    await tap(page, "feedback-why", 1200);
  },
  async "05-complete"(page) {
    await openLessonQuestion(page);
    for (const label of RIGHT_ANSWERS) await answer(page, label);
    // Confetti, the cards popping in, the counters and the stars all finish within about three seconds.
    await page.locator(tid("lesson-complete")).waitFor();
    await pause(page, 3500);
  },
  async "06-topics"(page) {
    // Left as it opens, so the top row shows whole under "Choose a topic". No scroll that keeps it whole also puts
    // the bottom edge in a gap between rows (tiles are 175 points tall, 12 apart), so the tiles the bottom edge cuts
    // are hidden and the sheet ends on whole tiles.
    await tap(page, "top-bar-topic", 1500);
    const hidden = await page.locator(tid("topic-picker")).evaluate((sheet) => {
      const list = [...sheet.querySelectorAll("div")].find((el) => el.scrollHeight > el.clientHeight + 1 && /auto|scroll/.test(getComputedStyle(el).overflowY));
      const edge = Math.min(window.innerHeight, list ? list.getBoundingClientRect().bottom : Infinity);
      const cut = [...sheet.querySelectorAll('[data-testid^="topic-tile-"]')].filter((tile) => {
        const box = tile.getBoundingClientRect();
        return box.top < edge && box.bottom > edge;
      });
      for (const tile of cut) tile.style.visibility = "hidden";
      return cut.length;
    });
    if (hidden) console.log(`  topic-picker: hid ${hidden} tile(s) the bottom edge would cut`);
  },
  async "07-shop"(page) {
    await tap(page, "tab-shop", 1500);
    // The note a build without purchases shows in place of Premium would make the caption untrue.
    if (await isOpen(page, "shop-app-hint")) throw new Error("07-shop: the shop has no Premium plans; export the web build in sandbox mode");
    // Everything from the Premium card down (both plans, Restore purchases, the renewal line, Terms and Privacy),
    // and as much of the shop above it as fits. A pack row or the gem balance the top edge would cut is hidden, so
    // the list starts in the gap above a heading or the Premium card, and no row shows without its heading.
    await scrollClearOfText(page, "shop-view", {
      keep: ["shop-premium", "shop-terms"],
      whole: '[data-testid^="shop-row-"]:not([data-testid^="shop-row-edge-"]), [data-testid="shop-balance"]',
      hideAtTop: true
    });
  },
  async "08-profile"(page) {
    await tap(page, "tab-me", 1500);
  }
};

async function captureScreen(browser, device, name) {
  const context = await browser.newContext({
    viewport: { width: device.w, height: device.h },
    // A whole scale: at 8/3 the browser draws a stray line of the pinned path banner's blue under it, and a line
    // of the circle behind it above it. The frame scales the shot to fit, so the extra pixels cost nothing.
    deviceScaleFactor: Math.ceil(device.dpr),
    hasTouch: true
  });
  if (device.tablet) await context.addInitScript(FULL_WIDTH);
  const page = await context.newPage();
  await page.goto(APP_URL);
  await page.locator(tid("bottom-tabs")).waitFor();
  await page.evaluate(SEED_PROFILE);
  await page.reload();
  await page.locator(tid("bottom-tabs")).waitFor();
  // The path's rings fill and its circles pop in.
  await pause(page, 2000);
  await SCREENS[name](page);
  // Reset sideways-scrolled rows and move the pointer off any hover state.
  await page.evaluate(() => document.querySelectorAll("*").forEach((el) => { if (el.scrollLeft) el.scrollLeft = 0; }));
  await page.mouse.move(0, 0);
  await pause(page, 700);
  for (const sheet of SHEETS) {
    if (sheet !== SHEET_FOR[name] && (await isOpen(page, sheet))) {
      throw new Error(`${device.key} ${name}: ${sheet} is open over the screen`);
    }
  }
  await holdStill(page, name === "05-complete" ? '[data-testid="lesson-complete"] svg' : undefined);
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

// The banner is the app cover (source/cover.html), the same one scripts/app-cover.mjs renders.
async function featureGraphic(browser) {
  const page = await browser.newPage({ viewport: { width: 1024, height: 500 } });
  await page.goto(`${pathToFileURL(join(SOURCE, "cover.html")).href}?part=feature`);
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
    if (FEATURE_GRAPHIC && key === "iphone-6.9" && name === "02-path") await featureGraphic(browser);
    console.log(`${device.dir}/${name}.png`);
  }
}
await browser.close();
