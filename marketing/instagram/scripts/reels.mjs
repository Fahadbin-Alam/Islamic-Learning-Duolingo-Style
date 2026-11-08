import { chromium } from "playwright";
import { pathToFileURL } from "node:url"; import { writeFileSync, readFileSync, mkdirSync } from "node:fs";
const R = process.env.MUSLIMO_ROOT ?? "C:/Users/Mihad/Desktop/Islamic-Learning-Duolingo-Style"; const S = process.cwd().replaceAll("\\", "/");
mkdirSync(`${S}/out`, { recursive: true });
mkdirSync(`${S}/frames`, { recursive: true });
const u = p => pathToFileURL(`${R}/${p}`).href;
const css = `
@font-face{font-family:Baloo;src:url(${u("node_modules/@expo-google-fonts/baloo-bhaijaan-2/800ExtraBold/BalooBhaijaan2_800ExtraBold.ttf")})}
@font-face{font-family:Nun;src:url(${u("node_modules/@expo-google-fonts/nunito/800ExtraBold/Nunito_800ExtraBold.ttf")})}
@font-face{font-family:NunB;src:url(${u("node_modules/@expo-google-fonts/nunito/700Bold/Nunito_700Bold.ttf")})}
@font-face{font-family:Naskh;src:url(${u("node_modules/@expo-google-fonts/noto-naskh-arabic/700Bold/NotoNaskhArabic_700Bold.ttf")})}
.saw{font-family:Naskh;font-size:1.05em}
*{margin:0;box-sizing:border-box} body{width:1080px;height:1920px;overflow:hidden;position:relative;font-family:Nun;color:#fff}
.sun{background:linear-gradient(180deg,#FFC65A 0%,#FF9F45 60%,#FF8A3D 100%)} .cream{background:#FFF6E6;color:#3B2A1A}
.pad{position:absolute;inset:0;padding:260px 80px 0;display:flex;flex-direction:column}
h1{font:120px/1.05 Baloo} h2{font:84px/1.08 Baloo} p{font:48px/1.3 Nun}
.tag{display:inline-block;border-radius:999px;padding:12px 30px;font:38px Nun;align-self:flex-start;background:#FF9F45;color:#fff}
.opt{background:#fff;color:#3B2A1A;border:5px solid #E7DCCB;border-bottom-width:12px;border-radius:34px;padding:36px 40px;font:50px Nun;margin-top:30px;display:flex;gap:28px;align-items:center}
.opt b{display:inline-flex;width:76px;height:76px;border-radius:20px;background:#F1E8DA;align-items:center;justify-content:center;font:44px Baloo;color:#9a7a55;flex:none}
.opt.ok{border-color:#58CC02;background:#E9FBD9}.opt.ok b{background:#58CC02;color:#fff} .opt.dim{opacity:.4}
.quote{font:54px/1.32 NunB;background:#fff;border-left:14px solid #FF9F45;border-radius:24px;padding:44px 48px;margin-top:44px;color:#3B2A1A}
.src{font:38px/1.3 NunB;margin-top:30px;color:#8a6a45}
.foot{position:absolute;left:80px;right:80px;bottom:300px;display:flex;align-items:center;gap:22px;font:40px Nun;color:#8a6a45}
.foot img{width:96px;height:96px;border-radius:24px}`;
const foot = `<div class="foot"><img src="${u("store/graphics/google-play/icon-512.png")}">Muslimo · free on Android</div>`;
const Q = "Who should you greet with salam?", OPTS = ["Only people you know", "People you know and people you don't", "Only people older than you"], OK = 1;
const opts = st => OPTS.map((o, i) => `<div class="opt ${st === "reveal" ? (i === OK ? "ok" : "dim") : ""}"><b>${"ABC"[i]}</b>${o}</div>`).join("");
const frames = {
  hook: `<body class="sun"><div class="pad" style="align-items:center;text-align:center;justify-content:center;padding-top:0">
   <h1 style="margin-top:-520px">Can you answer<br>in 5 seconds?</h1><p style="margin-top:40px">A hadith quiz from Muslimo</p></div>
   <img src="${u("store/graphics/source/cover/camel.png")}" style="position:absolute;width:620px;left:230px;bottom:150px"></body>`,
  q: `<body class="cream"><div class="pad"><span class="tag">Hadith quiz</span><h2 style="margin-top:56px">${Q}</h2>${opts()}</div>${foot}</body>`,
  reveal: `<body class="cream"><div class="pad"><span class="tag" style="background:#58CC02">Answer</span><h2 style="margin-top:56px">${Q}</h2>${opts("reveal")}</div>${foot}</body>`,
  quote: `<body class="cream"><div class="pad"><span class="tag" style="background:#58CC02">The hadith</span>
   <p style="margin-top:56px;color:#3B2A1A">A man asked the Prophet ﷺ which deeds of Islam are best. He said:</p>
   <div class="quote">“To feed (the poor) and greet those whom you know and those whom you don't know.”</div>
   <div class="src">Sahih al-Bukhari 28 · narrated by Abdullah ibn Amr</div></div>${foot}</body>`,
  cta: `<body class="sun"><div class="pad" style="align-items:center;text-align:center;justify-content:center;padding-top:0">
   <img src="${u("store/graphics/google-play/icon-512.png")}" style="width:340px;border-radius:80px;border:8px solid #fff">
   <h2 style="margin-top:70px">Learn one every day</h2><p style="margin-top:30px">Muslimo · free on Android<br>Link in bio</p></div></body>`,
};
const b = await chromium.launch({ channel: "chrome", args: ["--allow-file-access-from-files"] });
const pg = await b.newPage({ viewport: { width: 1080, height: 1920 } });
for (const [k, body] of Object.entries(frames)) {
  writeFileSync(`${S}/t.html`, `<html><head><meta charset="utf-8"><style>${css}</style></head>${body.replaceAll("ﷺ", '<span class="saw">ﷺ</span>')}</html>`);
  await pg.goto(pathToFileURL(`${S}/t.html`).href); await pg.evaluate(() => document.fonts.ready); await pg.waitForTimeout(150);
  await pg.screenshot({ path: `${S}/frames/${k}.png` });
}
const ph = f => pathToFileURL(`${R}/store/graphics/google-play/phone/${f}.png`).href, fr = k => pathToFileURL(`${S}/frames/${k}.png`).href;
const REELS = {
  "reel-1-salam-quiz": [{ src: fr("hook"), d: 2.2 }, { src: fr("q"), d: 5, timer: true }, { src: fr("reveal"), d: 2.5 }, { src: fr("quote"), d: 5 }, { src: fr("cta"), d: 3 }],
  "reel-2-app-tour": [{ src: ph("01-learn"), d: 2.4 }, { src: ph("02-path"), d: 2.4 }, { src: ph("03-question"), d: 2.4 }, { src: ph("04-feedback"), d: 2.4 }, { src: ph("05-complete"), d: 2.4 }, { src: ph("06-topics"), d: 2.4 }, { src: fr("cta"), d: 3 }],
};
writeFileSync(`${S}/enc.html`, `<html><body><canvas id=c width=1080 height=1920></canvas></body></html>`);
await pg.goto(pathToFileURL(`${S}/enc.html`).href);
await pg.addScriptTag({ content: readFileSync(`${S}/node_modules/mp4-muxer/build/mp4-muxer.js`, "utf8") });
for (const [name, scenes] of Object.entries(REELS)) {
  const b64 = await pg.evaluate(async (scenes) => {
    const FPS = 30, W = 1080, H = 1920, FADE = 0.3;
    const imgs = await Promise.all(scenes.map(s => new Promise((r, j) => { const i = new Image(); i.onload = () => r(i); i.onerror = j; i.src = s.src; })));
    const c = document.getElementById("c"), x = c.getContext("2d");
    const muxer = new Mp4Muxer.Muxer({ target: new Mp4Muxer.ArrayBufferTarget(), video: { codec: "avc", width: W, height: H }, fastStart: "in-memory" });
    let err = null;
    const enc = new VideoEncoder({ output: (ch, m) => muxer.addVideoChunk(ch, m), error: e => { err = e; } });
    enc.configure({ codec: "avc1.640033", width: W, height: H, bitrate: 8_000_000, framerate: FPS });
    const total = scenes.reduce((a, s) => a + s.d, 0); const N = Math.round(total * FPS);
    for (let n = 0; n < N; n++) {
      const t = n / FPS;
      let acc = 0, i = 0; while (i < scenes.length - 1 && t >= acc + scenes[i].d) acc += scenes[i++].d;
      const lt = t - acc, s = scenes[i];
      const zoom = 1 + 0.03 * (lt / s.d);
      const draw = (img, a, z) => { x.globalAlpha = a; const w = W * z, h = H * z; x.drawImage(img, (W - w) / 2, (H - h) / 2, w, h); };
      x.globalAlpha = 1; x.fillStyle = "#000"; x.fillRect(0, 0, W, H);
      if (i > 0 && lt < FADE) { draw(imgs[i - 1], 1, 1.03); draw(imgs[i], lt / FADE, zoom); } else draw(imgs[i], 1, zoom);
      x.globalAlpha = 1;
      if (s.timer) {
        const left = Math.max(0, s.d - lt); x.fillStyle = "#F1E8DA"; x.fillRect(80, 1290, 920, 34);
        x.fillStyle = left < 2 ? "#FF4B4B" : "#58CC02"; x.fillRect(80, 1290, 920 * (left / s.d), 34);
        x.font = "800 96px Nunito, Arial, sans-serif"; x.fillStyle = "#3B2A1A"; x.textAlign = "center"; x.fillText(String(Math.ceil(left)), 540, 1430);
      }
      const f = new VideoFrame(c, { timestamp: Math.round(n * 1e6 / FPS), duration: Math.round(1e6 / FPS) });
      enc.encode(f, { keyFrame: n % 60 === 0 }); f.close();
      while (enc.encodeQueueSize > 8) await new Promise(r => setTimeout(r, 5));
      if (err) throw err;
    }
    await enc.flush(); muxer.finalize();
    const buf = new Uint8Array(muxer.target.buffer); let s2 = ""; for (let k = 0; k < buf.length; k += 0x8000) s2 += String.fromCharCode(...buf.subarray(k, k + 0x8000));
    return btoa(s2);
  }, scenes);
  writeFileSync(`${S}/out/${name}.mp4`, Buffer.from(b64, "base64")); console.log(name, Math.round(b64.length * 0.75 / 1024), "KB");
}
await b.close();
