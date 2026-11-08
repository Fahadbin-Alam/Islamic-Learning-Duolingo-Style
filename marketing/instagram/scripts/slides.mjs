import { chromium } from "playwright";
import { pathToFileURL } from "node:url"; import { writeFileSync } from "node:fs";
const R = "C:/Users/Mihad/Desktop/Islamic-Learning-Duolingo-Style";
const u = p => pathToFileURL(`${R}/${p}`).href;
const OUT = process.argv[2];
const css = `
@font-face{font-family:Baloo;src:url(${u("node_modules/@expo-google-fonts/baloo-bhaijaan-2/800ExtraBold/BalooBhaijaan2_800ExtraBold.ttf")})}
@font-face{font-family:Nun;src:url(${u("node_modules/@expo-google-fonts/nunito/800ExtraBold/Nunito_800ExtraBold.ttf")})}
@font-face{font-family:NunB;src:url(${u("node_modules/@expo-google-fonts/nunito/700Bold/Nunito_700Bold.ttf")})}
@font-face{font-family:Naskh;src:url(${u("node_modules/@expo-google-fonts/noto-naskh-arabic/700Bold/NotoNaskhArabic_700Bold.ttf")})}
.saw{font-family:Naskh;font-size:1.05em;font-weight:700}
*{margin:0;box-sizing:border-box}
body{width:1080px;height:1350px;overflow:hidden;position:relative;font-family:Nun;color:#fff}
.sun{background:linear-gradient(180deg,#FFC65A 0%,#FF9F45 60%,#FF8A3D 100%)}
.green{background:linear-gradient(160deg,#2CC57A 0%,#14A95F 60%,#0E8F4F 100%)}
.cream{background:#FFF6E6;color:#3B2A1A}
h1{font:110px/1 Baloo;text-shadow:0 5px 0 rgba(0,0,0,.12)}
h2{font:76px/1.05 Baloo}
p{font:42px/1.25 Nun}
.pad{position:absolute;inset:0;padding:90px 80px;display:flex;flex-direction:column}
.tag{display:inline-block;background:rgba(255,255,255,.22);border:3px solid rgba(255,255,255,.45);border-radius:999px;padding:10px 26px;font:32px Nun;align-self:flex-start}
.foot{position:absolute;left:80px;right:80px;bottom:60px;display:flex;align-items:center;gap:18px;font:34px Nun}
.foot img{width:76px;height:76px;border-radius:20px;border:3px solid rgba(255,255,255,.9)}
.cream .foot{color:#8a6a45}
.opt{background:#fff;color:#3B2A1A;border:4px solid #E7DCCB;border-bottom-width:10px;border-radius:30px;padding:30px 36px;font:44px Nun;margin-top:26px;display:flex;gap:26px;align-items:center}
.opt b{display:inline-flex;width:66px;height:66px;border-radius:18px;background:#F1E8DA;align-items:center;justify-content:center;font:38px Baloo;color:#9a7a55;flex:none}
.opt.ok{border-color:#58CC02;background:#E9FBD9}.opt.ok b{background:#58CC02;color:#fff}
.quote{font:48px/1.3 NunB;background:rgba(255,255,255,.16);border-left:12px solid #FFE58A;border-radius:20px;padding:40px 44px;margin-top:40px}
.cream .quote{background:#fff;border-left-color:#FF9F45;color:#3B2A1A}
.src{font:32px/1.3 NunB;margin-top:28px;opacity:.9}
.phone{position:absolute;left:50%;transform:translateX(-50%);border-radius:44px;box-shadow:0 24px 60px rgba(0,0,0,.28)}
`;
const foot = (t="Muslimo · free on Android") => `<div class="foot"><img src="${u("store/graphics/google-play/icon-512.png")}">${t}</div>`;
const shot = (f,top=430,w=620) => `<img class="phone" style="top:${top}px;width:${w}px" src="${u(`store/graphics/google-play/phone/${f}.png`)}">`;
const quiz = (n, q, opts, okIdx, src, quote, label) => [
 [`${n}-1`, `<body class="cream"><div class="pad"><span class="tag" style="background:#FF9F45;border-color:#FF9F45;color:#fff">${label}</span>
   <h2 style="margin-top:50px;color:#3B2A1A">${q}</h2>${opts.map((o,i)=>`<div class="opt"><b>${"ABC"[i]}</b>${o}</div>`).join("")}
   <p style="margin-top:44px;font-size:36px;color:#8a6a45">Answer in the comments, then swipe →</p></div>${foot()}</body>`],
 [`${n}-2`, `<body class="cream"><div class="pad"><span class="tag" style="background:#58CC02;border-color:#58CC02;color:#fff">Answer</span>
   ${opts.map((o,i)=>i===okIdx?`<div class="opt ok" style="margin-top:50px"><b>${"ABC"[i]}</b>${o}</div>`:"").join("")}
   <div class="quote">${quote}</div><div class="src" style="color:#8a6a45">${src}</div>
   <p style="margin-top:auto;margin-bottom:110px;font-size:38px;color:#3B2A1A">Learn one like this every day in Muslimo 🐪</p></div>${foot()}</body>`]
];
const slides = [
 ["01-intro-1", `<body class="sun"><div class="pad" style="align-items:center;text-align:center">
   <h1 style="margin-top:40px">Meet Muslimo</h1><p style="margin-top:28px">Learn Islam in 5 minutes a day</p></div>
   <img src="${u("store/graphics/source/cover/camel.png")}" style="position:absolute;width:720px;left:180px;top:470px">
   <div style="position:absolute;left:-200px;right:-200px;bottom:-520px;height:760px;border-radius:50%;background:#F7D58A"></div>${foot("Swipe to see inside →")}</body>`],
 ["01-intro-2", `<body class="green"><div class="pad"><h2>A path that grows with you</h2><p style="margin-top:20px">Short lessons on Quran, hadith, Seerah and salah</p></div>${shot("02-path")}</body>`],
 ["01-intro-3", `<body class="green"><div class="pad"><h2>Answer, learn why</h2><p style="margin-top:20px">Every answer comes with an explanation and its source</p></div>${shot("04-feedback")}</body>`],
 ["01-intro-4", `<body class="green"><div class="pad"><h2>Streaks, XP and rewards</h2><p style="margin-top:20px">Keep your streak and race your friends each week</p></div>${shot("05-complete")}</body>`],
 ["01-intro-5", `<body class="sun"><div class="pad" style="align-items:center;text-align:center;justify-content:center">
   <img src="${u("store/graphics/google-play/icon-512.png")}" style="width:300px;border-radius:70px;border:8px solid #fff;box-shadow:0 20px 50px rgba(0,0,0,.25)">
   <h2 style="margin-top:60px">Free on Android</h2><p style="margin-top:24px">For kids, teens and adults.<br>Link in bio.</p>
   <p style="margin-top:60px;font-size:34px;opacity:.9">A learning tool, not a fatwa service.<br>Every lesson links to its source.</p></div></body>`],
 ...quiz("02-quiz-strong","Who did the Prophet ﷺ call truly strong?",["The one who wins every fight","The one who controls himself when angry","The one who lifts the most"],1,
   "Sahih al-Bukhari 6114 · narrated by Abu Hurayrah","“The strong is not the one who overcomes the people by his strength, but the strong is the one who controls himself while in anger.”","Hadith quiz"),
 ...quiz("03-quiz-khalid","What did the Prophet ﷺ call Khalid ibn al-Walid at Mu'tah?",["The lion of Allah","One of the swords of Allah","The trustworthy one"],1,
   "Sahih al-Bukhari 3757 · narrated by Anas ibn Malik (summary)","At Mu'tah, Zaid, Ja'far and Ibn Rawaha fell carrying the flag. Then the Prophet ﷺ said one of Allah's swords took it, and Allah gave victory.","Sahabah quiz"),
 ["04-hadith-smile", `<body class="green"><div class="pad"><span class="tag">Daily hadith</span>
   <h2 style="margin-top:60px">Even a smile counts</h2>
   <div class="quote">“Don't consider anything insignificant out of good things even if it is that you meet your brother with a cheerful countenance.”</div>
   <div class="src">Sahih Muslim 2626 · narrated by Abu Dharr</div>
   <p style="margin-top:60px">Who will you smile at today? 🙂</p></div>${foot()}</body>`],
];
const b = await chromium.launch({channel:"chrome"}); const pg = await b.newPage({ viewport:{width:1080,height:1350} });
for (let [name, body] of slides) { body = body.replaceAll("ﷺ", "<span class=\"saw\">ﷺ</span>"); writeFileSync(`${OUT}/../t.html`,`<html><head><meta charset="utf-8"><style>${css}</style></head>${body}</html>`); await pg.goto(pathToFileURL(`${OUT}/../t.html`).href); await pg.evaluate(()=>document.fonts.ready); await pg.waitForTimeout(150); await pg.screenshot({ path: `${OUT}/${name}.png` }); }
await b.close(); console.log("ok", slides.length);
