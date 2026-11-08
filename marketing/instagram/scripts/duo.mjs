// Mascot-led posts in the playful style: the camel's real reminder lines (src/services/comebackReminders.ts) as
// lock-screen notifications, an app-style "new word" quiz, Story highlight covers, and a frame set for reel 3.
//   node duo.mjs <out dir>      (needs playwright; uses the installed Google Chrome)
import { chromium } from "playwright";
import { pathToFileURL } from "node:url"; import { writeFileSync, mkdirSync } from "node:fs";
const R = process.env.MUSLIMO_ROOT ?? "C:/Users/Mihad/Desktop/Islamic-Learning-Duolingo-Style";
const OUT = (process.argv[2] ?? "out").replaceAll("\\", "/"); mkdirSync(`${OUT}/frames`, { recursive: true });
const u = p => pathToFileURL(`${R}/${p}`).href;
const css = (w, h) => `
@font-face{font-family:Baloo;src:url(${u("node_modules/@expo-google-fonts/baloo-bhaijaan-2/800ExtraBold/BalooBhaijaan2_800ExtraBold.ttf")})}
@font-face{font-family:Nun;src:url(${u("node_modules/@expo-google-fonts/nunito/800ExtraBold/Nunito_800ExtraBold.ttf")})}
@font-face{font-family:NunB;src:url(${u("node_modules/@expo-google-fonts/nunito/700Bold/Nunito_700Bold.ttf")})}
@font-face{font-family:Naskh;src:url(${u("node_modules/@expo-google-fonts/noto-naskh-arabic/700Bold/NotoNaskhArabic_700Bold.ttf")})}
*{margin:0;box-sizing:border-box} body{width:${w}px;height:${h}px;overflow:hidden;position:relative;font-family:Nun;color:#fff}
.dusk{background:linear-gradient(180deg,#2B2A5C 0%,#6B3F7A 45%,#F08A4B 100%)}
.cream{background:#FFF6E6;color:#3B2A1A} .sun{background:linear-gradient(180deg,#FFC65A 0%,#FF9F45 60%,#FF8A3D 100%)}
.clock{position:absolute;left:0;right:0;text-align:center;font:200px/1 Nun;letter-spacing:-4px;opacity:.95}
.date{position:absolute;left:0;right:0;text-align:center;font:44px NunB;opacity:.85}
.stack{position:absolute;left:60px;right:60px;display:flex;flex-direction:column;gap:22px}
.note{background:rgba(255,255,255,.88);color:#1d1d1f;border-radius:44px;padding:30px 36px;display:flex;gap:26px;box-shadow:0 10px 30px rgba(0,0,0,.18)}
.note img{width:96px;height:96px;border-radius:24px;flex:none}
.note .app{font:30px NunB;color:#6b6b70;display:flex;justify-content:space-between}
.note .t{font:40px/1.2 Nun;margin-top:6px} .note .b{font:36px/1.25 NunB;margin-top:6px;color:#333}
.cap{position:absolute;left:70px;right:70px;font:64px/1.1 Baloo;text-align:center;text-shadow:0 4px 12px rgba(0,0,0,.25)}
.camel{position:absolute}
.tag{display:inline-block;border-radius:999px;padding:10px 26px;font:32px Nun;background:#CE82FF;color:#fff}
.tile{background:#fff;border:4px solid #E5E5E5;border-bottom-width:10px;border-radius:28px;display:flex;flex-direction:column;align-items:center;justify-content:center;font:44px Nun;color:#3B2A1A;gap:14px}
.tile.ok{border-color:#58CC02;background:#E9FBD9}
.tile .e{font-size:110px;line-height:1}
.foot{position:absolute;left:80px;right:80px;bottom:60px;display:flex;align-items:center;gap:18px;font:34px Nun;color:#8a6a45}
.foot img{width:76px;height:76px;border-radius:20px}`;
const icon = u("store/graphics/google-play/icon-512.png"), camel = u("store/graphics/source/cover/camel.png");
// Lines taken word for word from src/services/comebackReminders.ts.
const N = [
  ["🐪 Psst... your camel is still waiting", "You stopped halfway down the path. One quick lesson and we're moving again!", "2d ago"],
  ["🐪 Your camel is pretending not to miss you", "It's not working. Come learn something good today.", "1d ago"],
  ["🐪 Your camel started talking to a palm tree", "The palm tree never answers. Come back for a quick lesson!", "5h ago"],
  ["🐪 Your camel wrote you a letter", "\"Dear friend, the path is quiet without you. See you soon, in sha Allah.\"", "now"],
];
const note = ([t, b, when], top) => `<div class="note" style="top:${top}px"><img src="${icon}"><div style="flex:1"><div class="app"><span>MUSLIMO</span><span>${when}</span></div><div class="t">${t}</div><div class="b">${b}</div></div></div>`;
const lock = (h, items, cap, capTop) => `<body class="dusk"><div class="clock" style="top:${h > 1500 ? 200 : 90}px">9:41</div><div class="date" style="top:${h > 1500 ? 410 : 300}px">Friday, 14 November</div>
  <div class="stack" style="top:${h > 1500 ? 560 : 400}px">${items.map(note).join("")}</div>${cap ? `<div class="cap" style="bottom:${h > 1500 ? 330 : 70}px">${cap}</div>` : ""}</body>`;
const W = [1080, 1350], V = [1080, 1920];
const pages = [
  // Post 5: carousel, POV meme. Slide 1 one notification, slide 2 two, slide 3 all four, slide 4 the fix.
  ["05-camel-misses-you-1", W, lock(1350, N.slice(0, 1), "POV: you skipped your lesson", 1080)],
  ["05-camel-misses-you-2", W, lock(1350, N.slice(0, 2), "Day 2...", 1080)],
  ["05-camel-misses-you-3", W, lock(1350, N.slice(2, 4), "Day 7. He wrote a letter.", 1150)],
  ["05-camel-misses-you-4", W, `<body class="sun"><img class="camel" src="${camel}" style="width:600px;left:240px;top:520px">
    <div class="cap" style="top:110px">Two minutes<br>fixes everything 🐪</div><div class="cap" style="top:290px;font:44px/1.2 Nun">One short lesson keeps your streak alive</div>
    <div class="foot" style="color:#fff;bottom:40px"><img src="${icon}">Muslimo · free on Android</div></body>`],
  // Post 6: app-style "new word" quiz, then the answer with its ayah.
  ["06-new-word-sabr-1", W, `<body class="cream"><div style="position:absolute;inset:0;padding:80px">
    <span class="tag">NEW WORD</span><div style="font:58px Baloo;margin-top:36px">Select the correct meaning</div>
    <div style="font:120px/1.3 Naskh;margin-top:20px;text-align:center;color:#1CB0F6">صَبْرٌ</div><div style="font:40px NunB;text-align:center;color:#8a6a45">sabr</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:28px;margin-top:40px;height:600px">
      <div class="tile"><span class="e">😠</span>Anger</div><div class="tile"><span class="e">🤲</span>Patience</div>
      <div class="tile"><span class="e">💰</span>Wealth</div><div class="tile"><span class="e">😴</span>Sleep</div></div></div><div class="foot"><img src="${icon}">Comment your answer · Muslimo</div></body>`],
  ["06-new-word-sabr-2", W, `<body class="cream"><div style="position:absolute;inset:0;padding:80px">
    <span class="tag" style="background:#58CC02">CORRECT</span><div style="display:flex;align-items:baseline;gap:30px;margin-top:30px"><span style="font:90px Naskh;color:#1CB0F6">صَبْرٌ</span><span style="font:72px Baloo">sabr = patience</span></div>
    <div style="font:62px/1.6 Naskh;direction:rtl;text-align:center;margin-top:40px;color:#3B2A1A">إِنَّ ٱللَّهَ مَعَ ٱلصَّـٰبِرِينَ</div>
    <div style="font:50px/1.3 NunB;background:#fff;border-left:14px solid #FF9F45;border-radius:24px;padding:40px 44px;margin-top:30px">“O you who have believed, seek help through patience and prayer. Indeed, Allah is with the patient.”</div>
    <div style="font:34px NunB;margin-top:26px;color:#8a6a45">Quran, Al-Baqarah 2:153 · Sahih International · quran.com/2/153</div></div>
    <div class="foot"><img src="${icon}">Learn a new word every day in Muslimo</div></body>`],
  // Reel 3 frames: the notifications stack up one by one, then the camel.
  ...[0, 1, 2, 3].map(i => [`frames/r3-${i}`, V, lock(1920, N.slice(Math.max(0, i - 2), i + 1), ["POV: you skipped your lesson", "Day 2...", "Day 5...", "Day 7. He wrote a letter."][i], 1400)]),
  ["frames/r3-end", V, `<body class="sun"><img class="camel" src="${camel}" style="width:700px;left:190px;top:760px">
    <div class="cap" style="top:300px;font-size:88px">Two minutes<br>fixes everything 🐪</div><div class="cap" style="top:560px;font:50px/1.2 Nun">Muslimo · free on Android</div></body>`],
  // Story highlight covers: Instagram crops the centre circle.
  ...[["quiz", "🧠", "#1CB0F6"], ["hadith", "📜", "#58CC02"], ["sahabah", "⭐", "#FF9600"], ["app", "📱", "#CE82FF"], ["camel", "🐪", "#FF4B4B"]].map(([n, e, c]) =>
    [`highlight-${n}`, V, `<body style="background:${c}"><div style="position:absolute;left:0;right:0;top:0;bottom:0;display:flex;align-items:center;justify-content:center;font-size:420px">${e}</div></body>`]),
];
const b = await chromium.launch({ channel: "chrome", args: ["--allow-file-access-from-files"] });
const pg = await b.newPage();
for (const [name, [w, h], body] of pages) {
  await pg.setViewportSize({ width: w, height: h });
  writeFileSync(`${OUT}/t.html`, `<html><head><meta charset="utf-8"><style>${css(w, h)}</style></head>${body}</html>`);
  await pg.goto(pathToFileURL(`${OUT}/t.html`).href); await pg.evaluate(() => document.fonts.ready); await pg.waitForTimeout(150);
  await pg.screenshot({ path: `${OUT}/${name}.png` });
}
await b.close(); console.log("ok", pages.length);
