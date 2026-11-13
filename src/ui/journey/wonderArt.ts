import { animalAt, cloud, flame, glow, n, nightSky, palm, peaks, rainStreaks, sky, stars, tuft, type SignArt, type SignKeys } from "./signDraw";
import { at3, showFrom } from "./storyArt";
import { home } from "./trialArt";

/**
 * More wonders of the stories, drawn as the others are (storyArt.ts, trialArt.ts, powerArt.ts): Ibrahim's honored
 * guests, the roasted calf they did not eat, and the good news of Ishaq and, after him, Ya'qub; the rain, wealth,
 * gardens and rivers promised to those who ask their Lord's forgiveness; the wind made to serve Sulayman, a month's
 * journey each way, and the spring of molten copper; Iram of the pillars, Thamud who carved the rocks, and Pharaoh,
 * and the scourge poured on them; the drinking cup put in a bag of the caravan and brought out of it; the bird Isa
 * shaped from clay, which became a bird by Allah's permission; and the parable of the fire that went out and the
 * storm. Only the land, the sky, water, plants, animals and things are drawn. No Prophet, no person and no angel is
 * ever drawn: things move by themselves.
 */

/** Keys that show a part from `from` to `to`, then hide it from `hide` to `gone`. */
const showWhile = (from: number, to: number, hide: number, gone: number): SignKeys => ({ at: [0, from, to, hide, gone], opacity: [0, 0, 1, 1, 0] });
/** Keys that show a part from the start, then hide it from `from` to `gone`. */
const hideFrom = (from: number, gone: number): SignKeys => ({ at: [0, from, gone], opacity: [1, 1, 0] });
/** Keys that show a part over each of `spans` ([from, to]), each coming and going quickly. */
function litDuring(spans: [number, number][]): SignKeys {
  const at = [0];
  const opacity = [0];
  for (const [from, to] of spans) at.push(from, at3(from + 0.008), to, at3(to + 0.008)), opacity.push(0, 1, 1, 0);
  return { at, opacity };
}

/** A four-pointed spark of light, its middle at (x, y), `r` from its middle to its points. */
const sparkle = (x: number, y: number, r: number, fill: string) => {
  const k = r * 0.26;
  return `<path d="M${x} ${n(y - r)} L${n(x + k)} ${n(y - k)} L${n(x + r)} ${y} L${n(x + k)} ${n(y + k)} L${x} ${n(y + r)} L${n(x - k)} ${n(y + k)} L${n(x - r)} ${y} L${n(x - k)} ${n(y - k)} Z" fill="${fill}"/>`;
};

/** An olive tree, its foot at (x, y), `s` times its size. */
const oliveTree = (x: number, y: number, s = 1) =>
  `<path d="M${x} ${y} L${n(x + 0.4 * s)} ${n(y - 10 * s)}" stroke="#7A5A3A" stroke-width="${n(1.6 * s)}" stroke-linecap="round"/>` +
  `<circle cx="${n(x - 3.4 * s)}" cy="${n(y - 11 * s)}" r="${n(4.4 * s)}" fill="#7F9A5A"/><circle cx="${n(x + 3.6 * s)}" cy="${n(y - 12 * s)}" r="${n(4 * s)}" fill="#8AA664"/>` +
  `<circle cx="${n(x + 0.2 * s)}" cy="${n(y - 15.4 * s)}" r="${n(4.2 * s)}" fill="#94AE6C"/>`;

/** Rings of a sound about (x, y), each wider and lower than tall. */
const ring = (x: number, y: number, r: number, color = "#FFF3CF") => `<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${n(r * 0.55)}" stroke="${color}" stroke-width="1" fill="none"/>`;

// Ibrahim's honored guests: they came in to him and said: Peace; he said: Peace (Quran 51:24, 51:25, 11:69); he went
// quietly to his household and brought a fat calf, roasted (51:26, 11:69), set it near them and said: will you not
// eat? (51:27); when he saw their hands not reaching for it, he felt fear of them; they said: do not fear (11:70,
// 51:28), and gave him good news of a knowing son (51:28): Ishaq, and after Ishaq, Ya'qub (11:71). The guests, Ibrahim
// and his wife are not drawn: only his tent, the rug laid out, the fire, the roasted calf on its platter, and two lights
// of the good news over the tent. The ayahs do not say the hour, so the day is not made to end.

/** A goat-hair tent, the middle of its front at (x, y). */
function tent(x: number, y: number) {
  const stripes = [-16, -6, 4, 14].map((dx) => `<path d="M${x + dx} ${y - 21} L${n(x + dx * 1.2)} ${y}" stroke="#86603F" stroke-width="1.4"/>`).join("");
  return (
    `<path d="M${x - 30} ${y} L${x - 24} ${y - 20} L${x + 24} ${y - 22} L${x + 30} ${y} Z" fill="#6E4C32"/>` +
    stripes +
    `<path d="M${x - 24} ${y - 20} L${x + 24} ${y - 22}" stroke="#5A3C26" stroke-width="1.2"/>` +
    `<path d="M${x - 6} ${y} L${n(x - 4.5)} ${y - 14} L${n(x + 4.5)} ${n(y - 14.4)} L${x + 6} ${y} Z" fill="#2E1F14"/>` +
    `<path d="M${x - 24} ${y - 20} L${x - 36} ${y + 1} M${x + 24} ${y - 22} L${x + 37} ${y + 1}" stroke="#A88A62" stroke-width="0.5"/>` +
    `<rect x="${x - 37}" y="${y}" width="1.4" height="1.6" fill="#7A5A3A"/><rect x="${x + 36}" y="${y}" width="1.4" height="1.6" fill="#7A5A3A"/>`
  );
}

/** A roasted calf on a brass platter, the platter's middle at (x, y). */
const roastOnPlatter = (x: number, y: number) =>
  `<ellipse cx="${x}" cy="${y}" rx="9" ry="2.5" fill="#B8923E"/><ellipse cx="${x}" cy="${n(y - 0.4)}" rx="7.8" ry="1.8" fill="#E0C068"/>` +
  `<path d="M${n(x - 6.6)} ${n(y - 0.8)} C${n(x - 7)} ${n(y - 6.2)} ${n(x + 4.8)} ${n(y - 7.2)} ${n(x + 6.4)} ${n(y - 1)} Z" fill="#94562C"/>` +
  `<path d="M${n(x - 4.4)} ${n(y - 3.4)} C${n(x - 2.2)} ${n(y - 5.6)} ${n(x + 2.2)} ${n(y - 5.8)} ${n(x + 4.2)} ${n(y - 3.8)}" stroke="#C98A4E" stroke-width="0.9" fill="none" stroke-linecap="round"/>` +
  `<path d="M${n(x + 5.4)} ${n(y - 2.4)} L${n(x + 8.4)} ${n(y - 4.6)}" stroke="#F1E6CF" stroke-width="1.1" stroke-linecap="round"/>` +
  `<circle cx="${n(x + 8.8)}" cy="${n(y - 5)}" r="0.9" fill="#F1E6CF"/>` +
  `<circle cx="${n(x - 3.2)}" cy="${n(y - 1.3)}" r="0.6" fill="#5E8E3A"/><circle cx="${n(x + 2.8)}" cy="${n(y - 1.2)}" r="0.6" fill="#5E8E3A"/>`;

/** Steam going up from (x, y). */
const steam = (x: number, y: number) =>
  [-3, 0, 3]
    .map((dx) => `<path d="M${x + dx} ${y} c-1.2 -1.6 1.2 -3 0 -4.6 c-1.2 -1.6 1.2 -3 0 -4.6" stroke="#FFFFFF" stroke-width="0.7" fill="none" stroke-linecap="round" opacity="0.85"/>`)
    .join("");

function guests(): SignArt {
  const sun = `${glow(128, 36, 16, "#FFE7A0", 0.12)}<circle cx="128" cy="36" r="6.5" fill="#FFD25A"/>`;
  const hills = peaks(
    [
      [14, 18, 26],
      [52, 24, 30],
      [100, 20, 30],
      [146, 26, 28]
    ],
    80,
    "#B9A57A",
    false
  );
  const land = `<rect y="79" width="160" height="41" fill="#D8C79A"/>` + [8, 34, 112, 126, 154, 46, 140].map((x, i) => tuft(x, i < 5 ? 86 + (i % 2) * 4 : 112, "#9DAE6A", 4)).join("");
  const rug =
    `<rect x="64" y="96.6" width="30" height="5.2" rx="0.8" fill="#B5473A"/><rect x="65.3" y="97.8" width="27.4" height="2.8" fill="none" stroke="#E9C46A" stroke-width="0.5"/>` +
    [70, 79, 88].map((cx) => `<path d="M${cx} 98.1 L${n(cx + 1.2)} 99.2 L${cx} 100.3 L${n(cx - 1.2)} 99.2 Z" fill="#E9C46A"/>`).join("");
  const fire = `<ellipse cx="26" cy="104" rx="5" ry="1.4" fill="#5A4A3A"/>${[22, 25, 28, 31].map((x) => `<circle cx="${x}" cy="103.8" r="1.2" fill="#8A7A6A"/>`).join("")}${flame(26, 103, 8)}`;
  const smoke = `<path d="M26 92 c-1.6 -2 1.6 -4 0 -6 c-1.6 -2 1.6 -4 0 -6" stroke="#E6E2DA" stroke-width="1" fill="none" stroke-linecap="round" opacity="0.6"/>`;
  // From the fire to the rug, set near them.
  const toRug: SignKeys = { at: [0, 0.21, 0.25, 0.35, 0.41], opacity: [0, 0, 1, 1, 1], x: [0, 0, 0, 0, 52], y: [0, 0, 0, 0, -4] };
  return {
    kind: "guests",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#F4DDB0", "#FAEBCB", 72) },
      { name: "the sun", svg: sun },
      { name: "clouds", svg: cloud(44, 24, 0.9, "#FFFFFF", 0.85) + cloud(98, 16, 0.8, "#FFFFFF", 0.8), loop: { move: "slide", ms: 12000 } },
      { name: "the hills", svg: hills },
      { name: "the land", svg: land },
      { name: "olive trees", svg: oliveTree(10, 90, 0.9) + oliveTree(148, 90, 1.1) },
      { name: "the tent", svg: tent(68, 95) },
      { name: "the rug laid out", svg: rug, keys: { at: [0, 0.03, 0.07], scaleX: [0.05, 0.05, 1], opacity: [0, 0, 1] }, origin: { x: 64, y: 99 } },
      ...[6, 10, 14].map((r, i) => ({
        name: `the greeting, ring ${i + 1}`,
        svg: ring(68, 86, r),
        keys: showWhile(0.04, 0.06, 0.18, 0.2),
        loop: { move: "twinkle" as const, ms: 1100, low: 0.1, phase: i / 3 }
      })),
      { name: "the fire", svg: fire, keys: showFrom(0.17, 0.2), origin: { x: 26, y: 103 }, loop: { move: "sway", ms: 900, angle: 3 } },
      { name: "smoke of the fire", svg: smoke, keys: showFrom(0.18, 0.22), loop: { move: "bob", ms: 1600, y: -2 } },
      { name: "the roasted calf on its platter", svg: roastOnPlatter(28, 103.4), keys: toRug },
      { name: "steam of the roasted calf", svg: steam(28, 95), keys: { at: [0, 0.22, 0.26, 0.35, 0.41, 0.44], opacity: [0, 0, 1, 1, 1, 0], x: [0, 0, 0, 0, 52, 52], y: [0, 0, 0, 0, -4, -4] }, loop: { move: "bob", ms: 1300, y: -1.2 } },
      { name: "calm about the tent", svg: glow(68, 86, 34, "#FFF3D0", 0.08), keys: showFrom(0.51, 0.56), loop: { move: "twinkle", ms: 2200, low: 0.7 } },
      { name: "good news: a light over the tent", svg: `${glow(68, 54, 15, "#FFFFFF", 0.22)}${sparkle(68, 54, 6.4, "#E9A93A")}`, keys: showFrom(0.66, 0.71), loop: { move: "twinkle", ms: 1600, low: 0.75 } },
      { name: "a second light, after it", svg: `${glow(94, 60, 11, "#FFFFFF", 0.22)}${sparkle(94, 60, 4.6, "#E9A93A")}`, keys: showFrom(0.84, 0.9), loop: { move: "twinkle", ms: 1600, low: 0.75, phase: 0.5 } }
    ],
    words: [
      { text: "They said Peace; he said Peace", from: 0.02, to: 0.15 },
      { text: "He brought a roasted calf", from: 0.17, to: 0.32 },
      { text: "Will you not eat?", from: 0.34, to: 0.48 },
      { text: "Do not fear", from: 0.5, to: 0.63 },
      { text: "Good news of a knowing son", from: 0.65, to: 0.8 },
      { text: "Ishaq, and after him Ya'qub", from: 0.82, to: 1 }
    ]
  };
}

// Ask your Lord's forgiveness: He is ever forgiving. He will send the sky upon you in abundant rain, and give you more
// wealth and children, and make gardens for you and make rivers for you (Quran 71:10 to 71:12), Nuh told his people; and
// Hud told his: ask forgiveness of your Lord, He will send the sky upon you in abundant rain (11:52). No one is drawn:
// only a dry land, its homes, the light of asking going up, the rain, the flocks, the gardens and the river.

/** A tree with fruit, its foot at (x, y), `s` times its size. */
const fruitTree = (x: number, y: number, s = 1) =>
  `<path d="M${x} ${y} L${x} ${n(y - 9 * s)}" stroke="#7A5A3A" stroke-width="${n(1.5 * s)}" stroke-linecap="round"/>` +
  `<circle cx="${x}" cy="${n(y - 12 * s)}" r="${n(5.4 * s)}" fill="#5E9E44"/><circle cx="${n(x - 3 * s)}" cy="${n(y - 10 * s)}" r="${n(3.4 * s)}" fill="#6BAA4E"/><circle cx="${n(x + 3.2 * s)}" cy="${n(y - 10.4 * s)}" r="${n(3.2 * s)}" fill="#6BAA4E"/>`;
const fruitOn = (x: number, y: number, s = 1) =>
  [
    [-2.6, -12],
    [2.2, -14],
    [0.4, -9.6],
    [3.6, -10],
    [-3.4, -9]
  ]
    .map(([dx, dy]) => `<circle cx="${n(x + dx * s)}" cy="${n(y + dy * s)}" r="${n(0.9 * s)}" fill="#E0573A"/>`)
    .join("");
/** A bare tree, its foot at (x, y). */
const bareTree = (x: number, y: number) =>
  `<path d="M${x} ${y} L${x} ${y - 10} M${x} ${y - 6} L${x - 4} ${y - 10} M${x} ${y - 8} L${x + 3.6} ${y - 12} M${x} ${y - 10} L${x - 1.6} ${y - 14}" stroke="#8A6A4A" stroke-width="1" fill="none" stroke-linecap="round"/>`;

function forgiveness(): SignArt {
  const river = `M160 80 C134 84 118 88 98 92 C76 96 56 100 34 106 C20 110 8 112 0 114 L0 121 L10 121 C24 117 40 113 58 108 C80 103 100 99 120 95 C136 92 148 90 160 88 Z`;
  const cracks = `<g stroke="#B8955E" stroke-width="0.6" fill="none">${[
    [62, 84],
    [86, 112],
    [118, 108],
    [140, 102],
    [48, 116],
    [104, 82]
  ]
    .map(([x, y]) => `<path d="M${x - 5} ${y} L${x - 2} ${y - 1.2} L${x} ${y + 0.6} L${x + 3} ${y - 0.8} L${x + 5} ${y + 0.4} M${x} ${y + 0.6} L${x + 0.6} ${y + 2.4}"/>`)
    .join("")}</g>`;
  const town = home(14, 88, 14, 10, "#D8BC8C", "#BFA070", "#6B4A2E") + home(32, 92, 12, 9, "#D3B585", "#BC9A6A", "#6B4A2E") + home(22, 80, 10, 7, "#DCC394", "#C2A474", "#6B4A2E");
  const rays =
    `<path d="M20 78 L14 0 L20 0 Z" fill="#FFF6DC" opacity="0.3"/><path d="M23 78 L22 0 L28 0 Z" fill="#FFF6DC" opacity="0.35"/>` +
    `<path d="M26 78 L30 0 L36 0 Z" fill="#FFF6DC" opacity="0.3"/>`;
  const rainCloud = (x: number, y: number) => cloud(x, y, 1.5, "#7D8896") + cloud(x + 18, y + 4, 1.2, "#6E7986");
  const flocks = [
    { kind: "sheep" as const, x: 100, y: 107.5, s: 0.13 },
    { kind: "sheep" as const, x: 114, y: 108.6, s: 0.12 },
    { kind: "sheep" as const, x: 128, y: 105.6, s: 0.13 },
    { kind: "sheep" as const, x: 142, y: 108.2, s: 0.12 },
    { kind: "camel" as const, x: 104, y: 76, s: 0.17 },
    { kind: "camel" as const, x: 126, y: 74, s: 0.16 }
  ];
  const fields = [70, 78, 86, 94, 62, 140, 148, 156].map((x, i) => tuft(x, i < 4 ? 112 + (i % 2) * 2 : i < 5 ? 113 : 82 + (i % 2) * 2, "#5FA344", 5)).join("");
  const grow = (from: number): SignKeys => ({ at: [0, from, at3(from + 0.09)], scaleY: [0.12, 0.12, 1], opacity: [0, 0, 1] });
  return {
    kind: "forgiveness",
    ms: 12000,
    parts: [
      { name: "sky, dry", svg: sky("#F3DDB0", "#F8E8C8", 70) },
      { name: "the hot sun", svg: `${glow(128, 30, 18, "#FFD98A", 0.14)}<circle cx="128" cy="30" r="7" fill="#FFC94A"/>`, keys: hideFrom(0.2, 0.24), loop: { move: "twinkle", ms: 1400, low: 0.8 } },
      { name: "grey sky of the rain", svg: `<rect width="160" height="120" fill="#5C6B7A" opacity="0.42"/>`, keys: showWhile(0.2, 0.25, 0.42, 0.46) },
      { name: "clear sky after the rain", svg: sky("#BFE3FA", "#DDF1FC", 70), keys: showFrom(0.42, 0.46) },
      { name: "the kind sun", svg: `${glow(132, 24, 14, "#FFF0C0", 0.12)}<circle cx="132" cy="24" r="6" fill="#FFE07A"/>`, keys: showFrom(0.43, 0.47) },
      { name: "rain clouds from the left", svg: rainCloud(14, 26), keys: { at: [0, 0.2, 0.26, 0.42, 0.46], opacity: [0, 0, 1, 1, 0], x: [-30, -30, 0, 0, 0] } },
      { name: "rain clouds from the right", svg: rainCloud(96, 20), keys: { at: [0, 0.2, 0.26, 0.42, 0.46], opacity: [0, 0, 1, 1, 0], x: [30, 30, 0, 0, 0] } },
      {
        name: "the hills, dry",
        svg: peaks(
          [
            [20, 14, 24],
            [70, 20, 30],
            [124, 16, 28],
            [156, 12, 18]
          ],
          76,
          "#C9AE7E",
          false
        )
      },
      {
        name: "the hills, green",
        svg: peaks(
          [
            [20, 14, 24],
            [70, 20, 30],
            [124, 16, 28],
            [156, 12, 18]
          ],
          76,
          "#8FB46A",
          false
        ),
        keys: showFrom(0.6, 0.68)
      },
      { name: "the land, dry", svg: `<rect y="75" width="160" height="45" fill="#D9BE8A"/>` },
      { name: "cracks in the dry land", svg: cracks, keys: hideFrom(0.28, 0.33) },
      { name: "the land, watered", svg: `<rect y="75" width="160" height="45" fill="#B6C58A"/>`, keys: showFrom(0.28, 0.34) },
      { name: "the riverbed, dry", svg: `<path d="${river}" fill="#C8A874"/>` },
      { name: "the river", svg: `<path d="${river}" fill="#5EA9DA"/>`, keys: showFrom(0.81, 0.87) },
      {
        name: "ripples on the river",
        svg: `<g stroke="#D6EEFA" stroke-width="0.8" fill="none" stroke-linecap="round"><path d="M140 86 q3 -1.2 6 0"/><path d="M104 94 q3 -1.2 6 0"/><path d="M70 101 q3 -1.2 6 0"/><path d="M36 109 q3 -1.2 6 0"/><path d="M8 115 q3 -1.2 6 0"/></g>`,
        keys: showFrom(0.82, 0.88),
        loop: { move: "bob", ms: 1400, x: -2 }
      },
      { name: "the homes", svg: town },
      { name: "bare trees", svg: bareTree(56, 92) + bareTree(84, 86) + bareTree(148, 96), keys: hideFrom(0.61, 0.66) },
      { name: "light of asking, going up", svg: rays + glow(23, 78, 12, "#FFF6DC", 0.12), keys: showWhile(0.04, 0.09, 0.2, 0.23), loop: { move: "twinkle", ms: 1800, low: 0.6 } },
      { name: "rain", svg: rainStreaks(0, 160, 20, 120, "#6E9CC8"), keys: showWhile(0.24, 0.28, 0.42, 0.45), loop: { move: "fall", ms: 800 } },
      { name: "fields", svg: fields, keys: showFrom(0.6, 0.66) },
      { name: "a palm", svg: palm(56, 96, 16), keys: grow(0.61), origin: { x: 56, y: 96 }, loop: { move: "sway", ms: 3000, angle: 1.5 } },
      { name: "a second palm", svg: palm(70, 92, 13), keys: grow(0.62), origin: { x: 70, y: 92 }, loop: { move: "sway", ms: 3400, angle: 1.5, phase: 0.4 } },
      { name: "a fruit tree", svg: fruitTree(84, 88, 1), keys: grow(0.62), origin: { x: 84, y: 88 } },
      { name: "a second fruit tree", svg: fruitTree(148, 98, 1.1), keys: grow(0.63), origin: { x: 148, y: 98 } },
      { name: "fruit on the trees", svg: fruitOn(84, 88, 1) + fruitOn(148, 98, 1.1), keys: showFrom(0.68, 0.72) },
      ...flocks.map((animal, i) => ({
        name: `${animal.kind === "sheep" ? "a sheep" : "a camel"} of the flocks, ${i + 1}`,
        svg: animalAt(animal.kind, animal.x, animal.y - 80 * animal.s, animal.s, true),
        keys: { at: [0, 0.43, 0.46, 0.52], opacity: [0, 0, 1, 1], x: [44, 44, 30, 0] },
        origin: { x: animal.x + 50 * animal.s, y: animal.y },
        loop: { move: "bob" as const, ms: 1300 + i * 120, y: -0.5, phase: i * 0.2 }
      }))
    ],
    words: [
      { text: "Ask your Lord's forgiveness", from: 0.02, to: 0.18 },
      { text: "He will send rain in abundance", from: 0.2, to: 0.4 },
      { text: "And give you more wealth", from: 0.42, to: 0.58 },
      { text: "And make gardens for you", from: 0.6, to: 0.78 },
      { text: "And make rivers for you", from: 0.8, to: 1 }
    ]
  };
}

// The wind for Sulayman: its morning course was a month's journey, and its evening course a month's journey; and We
// made a spring of molten copper flow for him (Quran 34:12); it blew by his command, gently, wherever he willed
// (38:36), to the land We had blessed (21:81); they made for him what he willed: high places of prayer, basins like
// reservoirs and cauldrons fixed in place. Work, family of Dawud, in thanks (34:13). Sulayman is not drawn, and no one
// who worked for him: only the wind, the days of the journey it makes, the spring, what was made, and his city.

/** A walled city on a hill, its gate's middle at (x, y). */
function city(x: number, y: number) {
  const towers = [-14, -2, 10]
    .map((dx, i) => `<rect x="${x + dx}" y="${y - 22 - (i === 1 ? 6 : 0)}" width="6" height="${22 + (i === 1 ? 6 : 0)}" fill="#D9C08C"/><rect x="${x + dx - 0.6}" y="${y - 23.4 - (i === 1 ? 6 : 0)}" width="7.2" height="1.6" fill="#BFA270"/>`)
    .join("");
  return (
    `<rect x="${x - 18}" y="${y - 14}" width="36" height="14" fill="#E3CC9A"/>` +
    towers +
    `<path d="M${x - 3} ${y} L${x - 3} ${y - 6} Q${x} ${y - 9} ${x + 3} ${y - 6} L${x + 3} ${y} Z" fill="#6B4A2E"/>` +
    [-12, 6, 13].map((dx) => `<rect x="${x + dx}" y="${y - 10}" width="1.8" height="2.4" fill="#6B4A2E"/>`).join("")
  );
}

/** A wide basin like a reservoir, its middle at (x, y). */
const basin = (x: number, y: number) =>
  `<path d="M${x - 10} ${y - 4} L${x + 10} ${y - 4} L${x + 8} ${y} L${x - 8} ${y} Z" fill="#B98A55"/><ellipse cx="${x}" cy="${y - 4}" rx="10" ry="1.6" fill="#7FB6DA"/>`;
/** A great cauldron fixed on its stones, its foot's middle at (x, y). */
const cauldron = (x: number, y: number) =>
  `<rect x="${x - 6.4}" y="${y - 5}" width="3" height="5.4" fill="#8A7A6A"/><rect x="${x + 3.4}" y="${y - 5}" width="3" height="5.4" fill="#8A7A6A"/>` +
  `<path d="M${x - 7} ${y - 10} L${x + 7} ${y - 10} C${x + 7} ${y - 2} ${x - 7} ${y - 2} ${x - 7} ${y - 10} Z" fill="#4E4A46"/><ellipse cx="${x}" cy="${y - 10}" rx="7" ry="1.4" fill="#6A645E"/>`;

function wind(): SignArt {
  const farLand =
    peaks(
      [
        [134, 18, 18],
        [156, 24, 16]
      ],
      84,
      "#A7B88A",
      false
    ) +
    `<rect x="138" y="74" width="4" height="10" fill="#D8C49A"/><rect x="144" y="70" width="5" height="14" fill="#D3BD8C"/><rect x="151" y="76" width="4" height="8" fill="#D8C49A"/>`;
  const land = `<rect y="82" width="160" height="38" fill="#CDBF8E"/><path d="M0 82 C40 80 100 84 160 82 L160 86 L0 86 Z" fill="#BFB07E"/>`;
  const dots = Array.from({ length: 30 }, (_, i) => `<circle cx="${n(34 + i * 3.2)}" cy="90" r="0.75" fill="#8E7A54"/>`).join("");
  const gusts = (left: boolean) => {
    const d = left ? -1 : 1;
    const g = (x: number, y: number, w: number) => `<path d="M${x} ${y} C${n(x + d * w * 0.3)} ${y - 2.4} ${n(x + d * w * 0.6)} ${y + 2.4} ${n(x + d * w)} ${y}" />`;
    return `<g stroke="#FFFFFF" stroke-width="1.3" fill="none" stroke-linecap="round" opacity="0.9">${g(26, 58, 22)}${g(20, 66, 18)}${g(30, 74, 16)}</g>${cloud(left ? 26 : 38, 56, 0.7, "#FFFFFF", 0.95)}`;
  };
  const swirls = `<g stroke="#FFFFFF" stroke-width="1" fill="none" stroke-linecap="round" opacity="0.8"><path d="M40 60 c6 -4 12 4 18 0 c3 -2 3 -6 0 -6"/><path d="M84 50 c6 4 12 -4 18 0 c3 2 3 6 0 6"/><path d="M60 72 c5 -3 10 3 15 0"/><path d="M104 66 c5 3 10 -3 15 0"/></g>`;
  const copper = `<path d="M86 109 C83 112 77 113 71 114.4 C65 115.8 59 116 54 117 L54 119 C61 118.4 68 117.6 74 116.2 C80 114.8 86 113 89 110 Z" fill="#E8843A"/><path d="M85 111 C82 113 76 114.6 70 115.6" stroke="#FFC47A" stroke-width="0.8" fill="none" stroke-linecap="round"/>`;
  const rock = `<path d="M84 111 C84 105 88 101 94 101 C100 101 104 105 104 111 Z" fill="#8F8478"/><path d="M90 105 C92 103 96 103 98 105" stroke="#A89E92" stroke-width="0.8" fill="none"/>`;
  // Morning: from the east up to the top of the sky; evening: down to the west, where it sets; then the day again.
  const sunKeys: SignKeys = {
    at: [0, 0.03, 0.15, 0.23, 0.33, 0.36, 0.43, 0.431, 0.46],
    x: [0, 0, 64, 64, 128, 128, 128, 64, 64],
    y: [0, 0, -46, -46, 0, 0, 0, -46, -46],
    opacity: [1, 1, 1, 1, 1, 0, 0, 0, 1]
  };
  return {
    kind: "wind",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#CFE8F7", "#E9F5FB", 74) },
      { name: "evening light", svg: `<rect width="160" height="84" fill="#F2B880" opacity="0.38"/>`, keys: showWhile(0.3, 0.36, 0.42, 0.46) },
      { name: "the sun", svg: `${glow(14, 64, 14, "#FFF0C0", 0.12)}<circle cx="14" cy="64" r="6" fill="#FFD65A"/>`, keys: sunKeys },
      { name: "the far land", svg: farLand },
      { name: "the land", svg: land },
      { name: "the city in the blessed land", svg: city(16, 84) + palm(40, 86, 11) },
      { name: "the days of a month's journey", svg: dots },
      { name: "a month's journey, going", svg: `<rect x="34" y="92.4" width="93" height="1.4" rx="0.7" fill="#F2B84A"/>`, keys: { at: [0, 0.04, 0.16], scaleX: [0.02, 0.02, 1], opacity: [0, 0, 1] }, origin: { x: 34, y: 93 } },
      { name: "a month's journey, coming back", svg: `<rect x="34" y="94.8" width="93" height="1.4" rx="0.7" fill="#6E8FD0"/>`, keys: { at: [0, 0.23, 0.36], scaleX: [0.02, 0.02, 1], opacity: [0, 0, 1] }, origin: { x: 127, y: 95.5 } },
      { name: "the wind going", svg: gusts(false), keys: { at: [0, 0.03, 0.04, 0.16, 0.22, 0.23], opacity: [0, 0, 1, 1, 1, 0], x: [0, 0, 0, 92, 92, 92] }, loop: { move: "bob", ms: 600, x: 1.4 } },
      { name: "the wind coming back", svg: gusts(true), keys: { at: [0, 0.22, 0.23, 0.36, 0.42, 0.44], opacity: [0, 0, 1, 1, 1, 0], x: [92, 92, 92, 0, 0, 0] }, loop: { move: "bob", ms: 600, x: -1.4 } },
      { name: "the wind, gentle", svg: swirls, keys: showFrom(0.43, 0.48), loop: { move: "bob", ms: 2600, x: 3, y: -1.5 } },
      { name: "the rock of the spring", svg: rock },
      { name: "the spring of molten copper", svg: copper + glow(76, 114, 12, "#FFB46A", 0.12), keys: { at: [0, 0.61, 0.67], opacity: [0, 0, 1], scaleX: [0.1, 0.1, 1] }, origin: { x: 89, y: 112 }, loop: { move: "twinkle", ms: 1200, low: 0.75 } },
      { name: "basins like reservoirs", svg: basin(30, 112) + basin(124, 113), keys: showFrom(0.67, 0.72) },
      { name: "a cauldron fixed in place", svg: cauldron(147, 117), keys: showFrom(0.68, 0.73) },
      { name: "thanks, going up from the city", svg: `${glow(16, 70, 22, "#FFF3CF", 0.1)}<path d="M12 62 L8 0 L14 0 Z" fill="#FFF6DC" opacity="0.3"/><path d="M18 62 L20 0 L26 0 Z" fill="#FFF6DC" opacity="0.3"/>`, keys: showFrom(0.81, 0.86), loop: { move: "twinkle", ms: 1800, low: 0.6 } }
    ],
    words: [
      { text: "Its morning course, a month's journey", from: 0.02, to: 0.2 },
      { text: "Its evening course, a month's journey", from: 0.22, to: 0.4 },
      { text: "Gently, wherever he willed", from: 0.42, to: 0.58 },
      { text: "A spring of molten copper", from: 0.6, to: 0.78 },
      { text: "Work, family of Dawud, in thanks", from: 0.8, to: 1 }
    ]
  };
}

// Have you not seen how your Lord dealt with 'Ad, Iram of the pillars, whose like was never made in the lands; and
// Thamud, who carved the rocks in the valley; and Pharaoh, owner of the stakes? They transgressed in the lands and
// spread much corruption there, so your Lord poured on them a scourge of punishment. Your Lord is ever watchful (Quran
// 89:6 to 89:14). No one is drawn, and nothing of the stakes, which are explained in more than one way: only the
// pillars, the homes carved in the rock, the palace by the river, their lights, the dark haze, the scourge, and the
// places left empty, still standing, as their homes were (46:25, 27:52).

/** A tall pillar, its foot's middle at (x, y), `h` high; `shade`: its shape only, in that color. */
const pillar = (x: number, y: number, h: number, shade?: string) =>
  `<rect x="${n(x - 2.4)}" y="${n(y - h)}" width="4.8" height="${h}" fill="${shade ?? "#E2C690"}"/>` +
  (shade ? "" : `<rect x="${n(x + 0.6)}" y="${n(y - h)}" width="1.8" height="${h}" fill="#000000" opacity="0.1"/>`) +
  `<rect x="${n(x - 3.6)}" y="${n(y - h - 2)}" width="7.2" height="2.2" fill="${shade ?? "#CDAE74"}"/><rect x="${n(x - 3.6)}" y="${n(y - 1.6)}" width="7.2" height="1.6" fill="${shade ?? "#CDAE74"}"/>`;
/** A home carved in the rock, its door's foot at (x, y). */
const carvedHome = (x: number, y: number, s = 1) =>
  `<path d="M${n(x - 5 * s)} ${y} L${n(x - 5 * s)} ${n(y - 12 * s)} L${x} ${n(y - 16 * s)} L${n(x + 5 * s)} ${n(y - 12 * s)} L${n(x + 5 * s)} ${y} Z" fill="#DDA878"/>` +
  `<path d="M${n(x - 6 * s)} ${n(y - 12 * s)} L${x} ${n(y - 16.6 * s)} L${n(x + 6 * s)} ${n(y - 12 * s)}" stroke="#B87A4A" stroke-width="${n(0.8 * s)}" fill="none"/>` +
  `<rect x="${n(x - 2 * s)}" y="${n(y - 7 * s)}" width="${n(4 * s)}" height="${n(7 * s)}" fill="#4E2E1C"/>`;

function pillars(): SignArt {
  const dunes = `<path d="M0 92 C14 86 30 90 52 86 L52 120 L0 120 Z" fill="#E6C88E"/><path d="M0 100 C18 96 34 100 52 96 L52 120 L0 120 Z" fill="#DDBB7E"/>`;
  const IRAM = [7, 18, 29, 40].map((x, i) => ({ x, y: 94 - (i % 2) * 2, h: 52 + (i % 2) * 4 }));
  const iram = IRAM.map((each) => pillar(each.x, each.y, each.h)).join("");
  const rockShape = "M53 96 L53 52 C60 44 70 40 80 42 C90 38 100 42 107 50 L107 96 Z";
  const cliff = `<path d="${rockShape}" fill="#C98F5E"/><path d="M53 70 C66 66 92 68 107 72" stroke="#B57A4A" stroke-width="0.8" fill="none"/><path d="M53 96 L107 96 L107 120 L53 120 Z" fill="#D9B98A"/>`;
  const carved = carvedHome(63, 70, 0.9) + carvedHome(80, 66, 1.1) + carvedHome(97, 70, 0.9) + carvedHome(70, 92, 1) + carvedHome(90, 92, 1);
  const thamudLights = [
    [63, 66.8],
    [80, 62.2],
    [97, 66.8],
    [70, 88.5],
    [90, 88.5]
  ]
    .map(([x, y]) => `${glow(x, y, 4, "#FFD98A", 0.25)}<rect x="${n(x - 1)}" y="${n(y - 1.4)}" width="2" height="2.6" fill="#FFD98A"/>`)
    .join("");
  let columns = "";
  for (let x = 116; x < 156; x += 6.6) columns += `<rect x="${n(x)}" y="64" width="2.4" height="18" fill="#D3BD8C"/>`;
  const palace = `<rect x="112" y="60" width="46" height="24" fill="#E8D7AE"/><rect x="110" y="56" width="50" height="4" fill="#CDB47F"/>${columns}<rect x="131" y="72" width="8" height="12" fill="#6E5A3A"/>`;
  const nile = `<rect x="108" y="96" width="52" height="10" fill="#5E9FCB"/><path d="M110 99 q3 -1 6 0 M126 102 q3 -1 6 0 M144 99 q3 -1 6 0" stroke="#A8D2EE" stroke-width="0.7" fill="none"/>`;
  const egyptLand = `<rect x="107" y="84" width="53" height="12" fill="#D8C49A"/><rect x="107" y="106" width="53" height="14" fill="#D8C49A"/>${palm(110, 92, 10)}`;
  const palaceLights = [118, 125, 145, 152].map((x) => `${glow(x + 1.2, 68, 3.4, "#FFD98A", 0.25)}<rect x="${x}" y="66" width="2.4" height="3" fill="#FFD98A"/>`).join("");
  const iramLights = [12.5, 23.5, 34.5].map((x) => `${glow(x, 88, 4, "#FFD98A", 0.25)}<circle cx="${x}" cy="88" r="1" fill="#FFD98A"/>`).join("");
  // Each place in the dark: its own shape, darkened, so it lights up on its own.
  const DARK = "#2A2238";
  const iramDark = `<g opacity="0.5">${IRAM.map((each) => pillar(each.x, each.y, each.h, DARK)).join("")}</g>`;
  const valleyDark = `<path d="${rockShape}" fill="${DARK}" opacity="0.5"/>`;
  const palaceDark = `<g fill="${DARK}" opacity="0.5"><rect x="112" y="60" width="46" height="24"/><rect x="110" y="56" width="50" height="4"/></g>`;
  /** Bands over the box from `top`, each `step` high, of `fill` at each of `opacities`: a soft haze. */
  const bands = (top: number, step: number, fill: string, opacities: number[]) =>
    `<g fill="${fill}">${opacities.map((opacity, i) => `<rect y="${top + i * step}" width="160" height="${step}" opacity="${opacity}"/>`).join("")}</g>`;
  const haze = bands(42, 6, "#4A3038", [0.04, 0.08, 0.12, 0.15, 0.17, 0.15, 0.12, 0.08, 0.04]);
  const darkSky = bands(0, 6, "#2A2230", [0.5, 0.46, 0.4, 0.33, 0.26, 0.19, 0.12, 0.06]);
  const lash = `<g stroke="#2E2A36" stroke-width="1.2" stroke-linecap="round" opacity="0.8">${Array.from({ length: 14 }, (_, i) => `<path d="M${6 + i * 11} 14 L${i * 11} 36"/>`).join("")}</g>`;
  const dust = `<rect y="84" width="160" height="36" fill="#C9B48A" opacity="0.35"/><path d="M0 88 C30 84 60 90 90 86 C120 82 140 88 160 85 L160 92 L0 92 Z" fill="#D8C49A" opacity="0.5"/>`;
  return {
    kind: "pillars",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#F2D9A8", "#F8E8C8", 70) },
      { name: "a dark red sky", svg: `<rect width="160" height="84" fill="#8A3A2E" opacity="0.25"/>`, keys: showWhile(0.51, 0.58, 0.87, 0.92) },
      { name: "the dunes of Iram", svg: dunes },
      { name: "Iram of the pillars", svg: iram },
      { name: "the rock in the valley", svg: cliff },
      { name: "homes carved in the rock", svg: carved, keys: { at: [0, 0.19, 0.27], opacity: [0.35, 0.35, 1] } },
      { name: "the land by the river", svg: egyptLand },
      { name: "the river", svg: nile, loop: { move: "bob", ms: 1600, x: 1.2 } },
      { name: "the palace by the river", svg: palace },
      { name: "lamps of Iram", svg: iramLights, keys: showWhile(0.04, 0.09, 0.72, 0.76), loop: { move: "twinkle", ms: 1300, low: 0.7 } },
      { name: "lamps in the carved homes", svg: thamudLights, keys: showWhile(0.2, 0.26, 0.72, 0.76), loop: { move: "twinkle", ms: 1500, low: 0.7 } },
      { name: "lamps of the palace", svg: palaceLights, keys: showWhile(0.36, 0.41, 0.72, 0.76), loop: { move: "twinkle", ms: 1400, low: 0.7 } },
      { name: "Iram in the dark", svg: iramDark, keys: hideFrom(0.03, 0.08) },
      { name: "the valley in the dark", svg: valleyDark, keys: hideFrom(0.19, 0.24) },
      { name: "the palace in the dark", svg: palaceDark, keys: hideFrom(0.35, 0.4) },
      { name: "dark haze of corruption", svg: haze, keys: showWhile(0.51, 0.58, 0.87, 0.92), loop: { move: "twinkle", ms: 2600, low: 0.7 } },
      { name: "a darkened sky, over them", svg: darkSky, keys: showWhile(0.67, 0.71, 0.87, 0.92) },
      { name: "the scourge poured on them", svg: lash, keys: showWhile(0.69, 0.72, 0.78, 0.8), loop: { move: "fall", ms: 500, period: 22 } },
      { name: "dust over the empty places", svg: dust, keys: showFrom(0.74, 0.79) },
      { name: "night", svg: `<rect width="160" height="120" fill="#16284C" opacity="0.6"/>`, keys: showFrom(0.87, 0.92) },
      {
        name: "stars",
        svg: stars([
          [14, 12],
          [36, 24],
          [58, 10],
          [88, 20],
          [112, 8],
          [136, 22],
          [152, 10],
          [70, 34]
        ]),
        keys: showFrom(0.88, 0.94),
        loop: { move: "twinkle", ms: 1800, low: 0.4 }
      }
    ],
    words: [
      { text: "Iram of the pillars", from: 0.02, to: 0.16 },
      { text: "Who carved the rocks in the valley", from: 0.18, to: 0.32 },
      { text: "Pharaoh, owner of the stakes", from: 0.34, to: 0.48 },
      { text: "They spread much corruption", from: 0.5, to: 0.64 },
      { text: "A scourge of punishment", from: 0.66, to: 0.84 },
      { text: "Your Lord is ever watchful", from: 0.86, to: 1 }
    ]
  };
}

// The cup in the bag: when he had furnished them with their supplies, he put the drinking cup in his brother's bag;
// then a caller called out: O caravan, you are thieves (Quran 12:70); we are missing the king's measure, and whoever
// brings it shall have a camel's load (12:72); he began with their bags before his brother's bag, then brought it out
// of his brother's bag: so did We plan for Yusuf (12:76). No one is drawn: only Egypt's storehouses and gate, the
// caravan's camels and their bags, the cup, the call, the camel's load, and the bags searched one by one.

/** A drinking cup of gold, its foot's middle at (x, y), `s` times its size. */
const goldCup = (x: number, y: number, s = 1) =>
  `<path d="M${n(x - 3 * s)} ${n(y - 7 * s)} L${n(x + 3 * s)} ${n(y - 7 * s)} C${n(x + 3 * s)} ${n(y - 3.4 * s)} ${n(x + 1 * s)} ${n(y - 2.6 * s)} ${n(x + 0.6 * s)} ${n(y - 2 * s)} L${n(x + 0.6 * s)} ${n(y - 0.8 * s)} L${n(x + 2 * s)} ${y} L${n(x - 2 * s)} ${y} L${n(x - 0.6 * s)} ${n(y - 0.8 * s)} L${n(x - 0.6 * s)} ${n(y - 2 * s)} C${n(x - 1 * s)} ${n(y - 2.6 * s)} ${n(x - 3 * s)} ${n(y - 3.4 * s)} ${n(x - 3 * s)} ${n(y - 7 * s)} Z" fill="#E8B830"/>` +
  `<ellipse cx="${x}" cy="${n(y - 7 * s)}" rx="${n(3 * s)}" ry="${n(0.8 * s)}" fill="#F6D86A"/><path d="M${n(x - 1.8 * s)} ${n(y - 5.6 * s)} L${n(x - 1.2 * s)} ${n(y - 3.6 * s)}" stroke="#FFF2B0" stroke-width="${n(0.5 * s)}" stroke-linecap="round"/>`;
/** A bag of grain tied on a camel's back, its middle at (x, y). */
const grainBag = (x: number, y: number, fill: string) =>
  `<path d="M${n(x - 4.4)} ${n(y + 3.6)} C${n(x - 5.4)} ${y} ${n(x - 3.6)} ${n(y - 3.8)} ${n(x - 1.2)} ${n(y - 4.2)} L${n(x + 1.2)} ${n(y - 4.2)} C${n(x + 3.6)} ${n(y - 3.8)} ${n(x + 5.4)} ${y} ${n(x + 4.4)} ${n(y + 3.6)} Z" fill="${fill}"/>` +
  `<path d="M${n(x - 1.6)} ${n(y - 4.4)} L${n(x + 1.6)} ${n(y - 4.4)}" stroke="#7A5634" stroke-width="0.8" stroke-linecap="round"/>`;

function cup(): SignArt {
  const granaries = [6, 16, 26].map((x, i) => `<path d="M${x - 4.4} 84 L${x - 4.4} ${74 - i % 2} Q${x} ${66 - i % 2} ${x + 4.4} ${74 - i % 2} L${x + 4.4} 84 Z" fill="#E4CF9E"/><rect x="${x - 1}" y="76" width="2" height="2.6" fill="#7A5A3A"/>`).join("");
  const gate = `<rect x="30" y="66" width="8" height="34" fill="#D9C08C"/><rect x="29" y="64" width="10" height="2.4" fill="#BFA270"/><path d="M31.6 100 L31.6 90 Q34 86.4 36.4 90 L36.4 100 Z" fill="#6B4A2E"/>`;
  const wall = `<rect x="0" y="84" width="30" height="16" fill="#E3CC9A"/><rect x="0" y="82.6" width="30" height="1.6" fill="#BFA270"/>`;
  const canaan =
    peaks(
      [
        [104, 12, 24],
        [136, 18, 26],
        [162, 14, 20]
      ],
      80,
      "#A9BF86",
      false
    ) + `<path d="M40 80 C80 76 120 78 160 76 L160 82 L40 82 Z" fill="#B9CB8C"/>`;
  const land = `<rect y="80" width="160" height="40" fill="#D9C99A"/><path d="M38 100 C70 98 110 101 160 98 L160 106 C110 109 70 106 38 108 Z" fill="#E8D7AE"/>`;
  const camelS = 0.22;
  // The four camels of the caravan, facing the way home; the last bag, on the front camel, is his brother's.
  const CAMELS = [40, 66, 92, 118];
  const bagAt = (x: number) => ({ x: n(x + 10), y: 90 });
  const leaving: SignKeys = { at: [0, 0.21, 0.27], x: [0, 0, 16] };
  const front = bagAt(CAMELS[3]);
  const store = { x: 22, y: 88 };
  return {
    kind: "cup",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#CFE6F5", "#EAF4FA", 74) },
      { name: "clouds", svg: cloud(70, 22, 0.9, "#FFFFFF", 0.9) + cloud(124, 14, 0.8, "#FFFFFF", 0.85), loop: { move: "slide", ms: 12000 } },
      { name: "the hills of Canaan", svg: canaan },
      { name: "the land and the road", svg: land },
      { name: "Egypt's storehouses", svg: wall + granaries + palm(48, 82, 10) },
      { name: "the gate of the city", svg: gate },
      ...CAMELS.map((x, i) => ({
        name: `camel ${i + 1} of the caravan`,
        svg: animalAt("camel", x, n(104 - 73 * camelS), camelS),
        keys: leaving,
        origin: { x: x + 11, y: 104 },
        loop: { move: "bob" as const, ms: 1000, y: -0.4, phase: i * 0.25 }
      })),
      ...CAMELS.map((x, i) => ({
        name: i === 3 ? "the last bag, on the front camel" : `bag ${i + 1} of the caravan`,
        svg: grainBag(bagAt(x).x, bagAt(x).y, i === 3 ? "#C79A5E" : "#CFAE74"),
        keys: leaving,
        loop: { move: "bob" as const, ms: 1000, y: -0.4, phase: i * 0.25 }
      })),
      {
        name: "the cup, put in the last bag",
        svg: `${glow(store.x, store.y - 3, 6, "#FFF0B0", 0.2)}${goldCup(store.x, store.y, 1.1)}`,
        keys: { at: [0, 0.03, 0.05, 0.11, 0.14], opacity: [0, 0, 1, 1, 0], x: [0, 0, 0, n(front.x - store.x), n(front.x - store.x)], y: [0, 0, 0, n(front.y - store.y - 2), n(front.y - store.y - 2)], scale: [1, 1, 1, 1, 0.5] },
        origin: { x: store.x, y: store.y }
      },
      ...[5, 9, 13].map((r, i) => ({
        name: `the call, ring ${i + 1}`,
        svg: ring(34, 76, r, "#FFFFFF"),
        keys: { at: [0, 0.27, 0.29, 0.39, 0.41], opacity: [0, 0, 1, 1, 0] },
        loop: { move: "twinkle" as const, ms: 900, low: 0.1, phase: i / 3 }
      })),
      {
        name: "a camel's load, the reward",
        svg: `${glow(15, 97.6, 14, "#FFF0B0", 0.16)}${animalAt("camel", 4, n(108.4 - 73 * 0.2), 0.2)}${grainBag(9.4, 98.6, "#D8B87A")}${grainBag(18.6, 98.6, "#D8B87A")}${grainBag(14, 95, "#E0C488")}`,
        keys: showFrom(0.39, 0.44),
        loop: { move: "twinkle", ms: 1600, low: 0.85 }
      },
      ...CAMELS.slice(0, 3).flatMap((x, i) => {
        const from = at3(0.57 + i * 0.05);
        const bag = bagAt(x);
        return [
          { name: `bag ${i + 1}, searched`, svg: glow(bag.x + 16, bag.y, 7, "#FFFFFF", 0.22), keys: showWhile(from, at3(from + 0.01), at3(from + 0.03), at3(from + 0.04)) },
          { name: `bag ${i + 1}, opened`, svg: `<ellipse cx="${n(bag.x + 16)}" cy="${n(bag.y - 4.4)}" rx="2.2" ry="0.9" fill="#4E3420"/>`, keys: showFrom(from, at3(from + 0.01)) }
        ];
      }),
      { name: "the last bag, searched", svg: `${glow(front.x + 16, front.y, 9, "#FFF0B0", 0.24)}<ellipse cx="${n(front.x + 16)}" cy="${n(front.y - 4.4)}" rx="2.2" ry="0.9" fill="#4E3420"/>`, keys: showFrom(0.79, 0.82) },
      {
        name: "the cup, brought out of the last bag",
        svg: `${glow(front.x + 16, front.y - 6, 7, "#FFF0B0", 0.24)}${goldCup(front.x + 16, front.y - 2, 1.2)}`,
        keys: { at: [0, 0.8, 0.82, 0.87], opacity: [0, 0, 1, 1], y: [0, 0, 0, -10] },
        loop: { move: "twinkle", ms: 1400, low: 0.8 }
      }
    ],
    words: [
      { text: "He put the cup in his brother's bag", from: 0.02, to: 0.18 },
      { text: "O caravan, you are thieves!", from: 0.2, to: 0.36 },
      { text: "Whoever brings it gets a camel's load", from: 0.38, to: 0.54 },
      { text: "He began with their bags", from: 0.56, to: 0.76 },
      { text: "Out of his brother's bag", from: 0.78, to: 1 }
    ]
  };
}

// The bird of clay: I have come to you with a sign from your Lord: I make for you out of clay the shape of a bird,
// then I breathe into it, and it becomes a bird by Allah's permission; and I heal the blind and the leper, and give
// life to the dead, by Allah's permission; and I tell you what you eat and what you store in your homes. In that is a
// sign for you, if you believe (Quran 3:49, 5:110). Isa is not drawn, and no one he healed: only the clay, the bird
// it became, a breath, and a home with its food and its jars.

/** A bird standing, its feet's middle at (x, y), `k` times its size, facing right. */
const standingBird = (x: number, y: number, body: string, wing: string, k = 1.7) => {
  const p = (dx: number, dy: number) => `${n(x + dx * k)} ${n(y + dy * k)}`;
  return (
    `<path d="M${p(-0.6, 0)} L${p(-0.4, -2.2)} M${p(0.8, 0)} L${p(0.6, -2.2)}" stroke="${wing}" stroke-width="${n(0.5 * k)}"/>` +
    `<path d="M${p(-4.4, -3.4)} L${p(-6.6, -5)} L${p(-6, -2.6)} Z" fill="${wing}"/>` +
    `<ellipse cx="${n(x - 0.6 * k)}" cy="${n(y - 4 * k)}" rx="${n(4 * k)}" ry="${n(2.4 * k)}" fill="${body}"/>` +
    `<path d="M${p(-3, -4.6)} C${p(-1.6, -5.8)} ${p(1, -5.4)} ${p(1.6, -4)} C${p(0.4, -3.4)} ${p(-1.8, -3.2)} ${p(-3, -4.6)} Z" fill="${wing}"/>` +
    `<circle cx="${n(x + 2.8 * k)}" cy="${n(y - 6.2 * k)}" r="${n(1.7 * k)}" fill="${body}"/>` +
    `<path d="M${p(4.3, -6.5)} L${p(5.9, -6)} L${p(4.3, -5.6)} Z" fill="${wing}"/>`
  );
};

/** A bird in flight, its middle at (x, y), `k` times its size, facing right, its wings up. */
const flyingBird = (x: number, y: number, body: string, wing: string, k = 1.7) => {
  const p = (dx: number, dy: number) => `${n(x + dx * k)} ${n(y + dy * k)}`;
  return (
    `<path d="M${p(-1.4, -0.8)} L${p(-4.2, -5.6)} L${p(1, -1)} Z" fill="${wing}" opacity="0.75"/>` +
    `<path d="M${p(-3.4, -0.2)} L${p(-6, -1.6)} L${p(-5.6, 0.8)} Z" fill="${wing}"/>` +
    `<ellipse cx="${x}" cy="${y}" rx="${n(3.8 * k)}" ry="${n(1.6 * k)}" fill="${body}"/>` +
    `<path d="M${p(-0.4, -0.6)} L${p(0.8, -6)} L${p(2.6, -0.8)} Z" fill="${wing}"/>` +
    `<circle cx="${n(x + 3.4 * k)}" cy="${n(y - 0.8 * k)}" r="${n(1.4 * k)}" fill="${body}"/>` +
    `<path d="M${p(4.6, -1)} L${p(6, -0.6)} L${p(4.6, -0.2)} Z" fill="#E0A23C"/>` +
    `<circle cx="${n(x + 3.8 * k)}" cy="${n(y - 1.1 * k)}" r="${n(0.3 * k)}" fill="#1F1F1F"/>`
  );
};

function clayBird(): SignArt {
  const hills = peaks(
    [
      [20, 16, 26],
      [64, 22, 30],
      [112, 18, 28],
      [152, 22, 22]
    ],
    76,
    "#9DB77A",
    false
  );
  const land = `<rect y="75" width="160" height="45" fill="#D8C9A0"/>` + [10, 30, 100, 150, 20].map((x, i) => tuft(x, i < 4 ? 84 + (i % 2) * 4 : 112, "#93AD62", 4)).join("");
  const stone = `<path d="M38 104 L40 98 L66 98 L68 104 Z" fill="#B8A88A"/><rect x="40" y="96.8" width="26" height="1.6" rx="0.8" fill="#CFC0A2"/>`;
  const lump = `<ellipse cx="53" cy="94.4" rx="5.2" ry="2.8" fill="#A86B44"/><ellipse cx="51.6" cy="93.4" rx="2.4" ry="1" fill="#C0835A"/>`;
  const theHome = home(128, 100, 34, 22, "#E2D2AA", "#C9B486", "#6B4A2E");
  const jars = [117, 122, 138].map((x) => `<path d="M${x - 1.6} 94 C${x - 2.6} 92 ${x - 2.2} 90.2 ${x - 1} 89.6 L${x - 1} 88.8 L${x + 1} 88.8 L${x + 1} 89.6 C${x + 2.2} 90.2 ${x + 2.6} 92 ${x + 1.6} 94 Z" fill="#B5703E"/>`).join("");
  const windowsOpen = `<rect x="114" y="86" width="12" height="9" fill="#5A3E28"/><rect x="134" y="86" width="8" height="9" fill="#5A3E28"/>`;
  const food = `<rect x="88" y="104" width="20" height="4" rx="0.8" fill="#C9A66B"/><ellipse cx="93" cy="104.4" rx="3" ry="1.4" fill="#D9A15A"/><ellipse cx="98.6" cy="104.6" rx="2.4" ry="1.2" fill="#D9A15A"/>${[102.6, 104, 105.4, 103.3, 104.7].map((x, i) => `<ellipse cx="${x}" cy="${i < 3 ? 104.6 : 103.6}" rx="0.7" ry="0.5" fill="#7A3A1E"/>`).join("")}`;
  const breath = `<g stroke="#FFFFFF" stroke-width="1" fill="none" stroke-linecap="round" opacity="0.9"><path d="M22 84 c4 -2 8 2 12 0 c4 -2 8 2 12 0"/><path d="M26 89 c3 -1.6 6 1.6 9 0 c3 -1.6 6 1.6 9 0"/></g>`;
  return {
    kind: "clay-bird",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#CFE8F7", "#EAF5FB", 74) },
      { name: "clouds", svg: cloud(30, 22, 0.9, "#FFFFFF", 0.9) + cloud(108, 14, 0.8, "#FFFFFF", 0.85), loop: { move: "slide", ms: 12000 } },
      { name: "the hills", svg: hills },
      { name: "the land", svg: land },
      { name: "the home", svg: theHome + windowsOpen + jars },
      { name: "the flat stone", svg: stone },
      { name: "food by the home", svg: food },
      { name: "clay", svg: lump, keys: hideFrom(0.05, 0.1) },
      {
        name: "the shape of a bird, of clay",
        svg: standingBird(52, 97, "#A86B44", "#8A5434"),
        keys: { at: [0, 0.06, 0.11, 0.41, 0.44], opacity: [0, 0, 1, 1, 0], scale: [0.7, 0.7, 1, 1, 1] },
        origin: { x: 52, y: 97 }
      },
      { name: "a breath", svg: breath, keys: { at: [0, 0.23, 0.25, 0.3, 0.33], opacity: [0, 0, 0.9, 0.9, 0], x: [-10, -10, -6, 6, 6] }, loop: { move: "bob", ms: 900, y: -0.6 } },
      { name: "light on the clay", svg: glow(52, 90, 10, "#FFF6DC", 0.2), keys: showWhile(0.29, 0.33, 0.41, 0.45), loop: { move: "twinkle", ms: 1000, low: 0.6 } },
      { name: "a living bird", svg: standingBird(52, 97, "#F4F2EC", "#C9C4B8"), keys: { at: [0, 0.41, 0.44, 0.46, 0.47], opacity: [0, 0, 1, 1, 0] } },
      {
        name: "the bird, flying",
        svg: flyingBird(54, 88, "#F4F2EC", "#C9C4B8"),
        keys: { at: [0, 0.46, 0.47, 0.54], opacity: [0, 0, 1, 1], x: [0, 0, 0, 26], y: [0, 0, 0, -52] },
        origin: { x: 54, y: 88 },
        loop: { move: "swim", ms: 5200, x: 22 }
      },
      { name: "food, known", svg: glow(98, 104, 12, "#FFF0B0", 0.18), keys: showWhile(0.63, 0.67, 0.83, 0.86), loop: { move: "twinkle", ms: 1400, low: 0.7 } },
      { name: "jars stored in the home, known", svg: glow(120, 91, 10, "#FFF0B0", 0.2) + glow(138, 91, 7, "#FFF0B0", 0.2), keys: showWhile(0.68, 0.73, 0.83, 0.86), loop: { move: "twinkle", ms: 1400, low: 0.7 } },
      { name: "a sign, light over all", svg: glow(80, 60, 70, "#FFF6DC", 0.05), keys: showFrom(0.83, 0.88), loop: { move: "twinkle", ms: 2400, low: 0.7 } }
    ],
    words: [
      { text: "From clay, the shape of a bird", from: 0.02, to: 0.2 },
      { text: "Then I breathe into it", from: 0.22, to: 0.38 },
      { text: "It becomes a bird, by Allah's permission", from: 0.4, to: 0.6 },
      { text: "What you eat and what you store", from: 0.62, to: 0.8 },
      { text: "A sign for you, if you believe", from: 0.82, to: 1 }
    ]
  };
}

// The fire and the storm: their example is that of one who kindled a fire; when it lit up all around him, Allah took
// away their light and left them in darkness, unable to see (Quran 2:17); or a rainstorm from the sky, in it darkness,
// thunder and lightning (2:19); the lightning almost snatches away their sight: whenever it lights the way for them,
// they walk in it, and when it grows dark over them, they stand still (2:20). No one is drawn: only the night, the
// fire, the land it lit, the storm, and the way, lit a little at each flash.

/** An acacia tree, its foot at (x, y), `s` times its size, in `fill`. */
const acacia = (x: number, y: number, s: number, fill: string) =>
  `<path d="M${x} ${y} L${x} ${n(y - 9 * s)}" stroke="${fill}" stroke-width="${n(1.4 * s)}" stroke-linecap="round"/>` +
  `<ellipse cx="${x}" cy="${n(y - 11 * s)}" rx="${n(9 * s)}" ry="${n(3 * s)}" fill="${fill}"/>`;
/** A rock, its foot's middle at (x, y). */
const boulder = (x: number, y: number, w: number, fill: string) => `<path d="M${n(x - w)} ${y} C${n(x - w)} ${n(y - w * 0.8)} ${n(x + w)} ${n(y - w * 0.9)} ${n(x + w)} ${y} Z" fill="${fill}"/>`;
/** A bolt of lightning from (x, y) down. */
const bolt = (x: number, y: number) => `<path d="M${x} ${y} L${x - 4} ${y + 12} L${x + 1} ${y + 12} L${x - 3} ${y + 26} L${x + 6} ${y + 9} L${x + 1} ${y + 9} L${x + 4} ${y} Z" fill="#FFF7C8"/>`;

function storm(): SignArt {
  const darkThings = acacia(22, 96, 1.1, "#1C2130") + acacia(132, 92, 1.3, "#1C2130") + boulder(92, 104, 6, "#1E2332") + boulder(150, 106, 5, "#1E2332") + boulder(8, 108, 4, "#1E2332");
  const litThings = acacia(22, 96, 1.1, "#6E5A3A") + acacia(132, 92, 1.3, "#6E5A3A") + boulder(92, 104, 6, "#8A7458") + boulder(150, 106, 5, "#7E6A50") + boulder(8, 108, 4, "#8A7458");
  const fire = `<ellipse cx="56" cy="104" rx="5" ry="1.4" fill="#3A3028"/>${[52, 55, 58, 61].map((x) => `<circle cx="${x}" cy="103.8" r="1.2" fill="#6A5A4A"/>`).join("")}${flame(56, 103, 9)}`;
  const sparks = [
    [54, 92],
    [58, 88],
    [52, 84],
    [60, 94]
  ]
    .map(([x, y]) => `<circle cx="${x}" cy="${y}" r="0.6" fill="#FFD27A"/>`)
    .join("");
  const smoke = `<path d="M56 98 c-2 -2.4 2 -4.8 0 -7.2 c-2 -2.4 2 -4.8 0 -7.2" stroke="#8A8A92" stroke-width="1.4" fill="none" stroke-linecap="round" opacity="0.7"/>`;
  const clouds = cloud(4, 30, 2.2, "#2A3042") + cloud(54, 26, 2.4, "#252B3C") + cloud(108, 30, 2.2, "#2A3042");
  const way = (x1: number, x2: number) => `<path d="M${x1} 104 L${x2} 104" stroke="#E8D9B0" stroke-width="1.2" stroke-dasharray="2.4 2.2" stroke-linecap="round"/>`;
  const flashes = litDuring([
    [0.63, 0.64],
    [0.67, 0.68],
    [0.77, 0.785],
    [0.81, 0.825]
  ]);
  const thunder = (x: number, y: number) => [6, 10, 14].map((r) => `<path d="M${x - r} ${y} A${r} ${n(r * 0.6)} 0 0 1 ${x + r} ${y}" stroke="#C9D2E8" stroke-width="0.9" fill="none"/>`).join("");
  return {
    kind: "storm",
    ms: 12000,
    parts: [
      { name: "night", svg: nightSky(78) },
      {
        name: "stars",
        svg: stars([
          [12, 12],
          [34, 26],
          [58, 8],
          [84, 22],
          [110, 10],
          [136, 24],
          [152, 8],
          [70, 40]
        ]),
        keys: hideFrom(0.56, 0.6),
        loop: { move: "twinkle", ms: 1800, low: 0.4 }
      },
      { name: "the dark land", svg: `<rect y="78" width="160" height="42" fill="#232836"/>` },
      { name: "trees and rocks in the dark", svg: darkThings },
      { name: "the land lit by the fire", svg: `<ellipse cx="56" cy="100" rx="58" ry="18" fill="#6E5638" opacity="0.55"/>`, keys: showWhile(0.21, 0.29, 0.39, 0.43) },
      { name: "trees and rocks, lit", svg: litThings, keys: showWhile(0.22, 0.3, 0.39, 0.43) },
      { name: "the fire", svg: fire, keys: { at: [0, 0.03, 0.08, 0.39, 0.42], opacity: [0, 0, 1, 1, 0], scale: [0.3, 0.3, 1, 1, 0.6] }, origin: { x: 56, y: 103 }, loop: { move: "sway", ms: 800, angle: 3 } },
      { name: "sparks", svg: sparks, keys: showWhile(0.03, 0.05, 0.12, 0.14), loop: { move: "bob", ms: 700, y: -2 } },
      { name: "light all around", svg: glow(56, 96, 48, "#FFC97A", 0.07), keys: { at: [0, 0.21, 0.29, 0.39, 0.43], opacity: [0, 0, 1, 1, 0], scale: [0.2, 0.2, 1, 1, 1] }, origin: { x: 56, y: 96 }, loop: { move: "twinkle", ms: 1000, low: 0.85 } },
      { name: "smoke where the fire was", svg: smoke, keys: showWhile(0.41, 0.44, 0.47, 0.5), loop: { move: "bob", ms: 1400, y: -2 } },
      { name: "darkness", svg: `<rect width="160" height="120" fill="#05080F" opacity="0.4"/>`, keys: showFrom(0.4, 0.46) },
      { name: "storm clouds", svg: clouds, keys: showFrom(0.57, 0.62), loop: { move: "bob", ms: 3200, x: 3 } },
      { name: "rain", svg: rainStreaks(0, 160, 30, 120, "#7A8AA8"), keys: showFrom(0.6, 0.64), loop: { move: "fall", ms: 700 } },
      {
        name: "thunder",
        svg: thunder(40, 40) + thunder(120, 44),
        keys: litDuring([
          [0.645, 0.66],
          [0.68, 0.695]
        ])
      },
      { name: "a flash over all", svg: `<rect width="160" height="120" fill="#E8EEFF" opacity="0.22"/>`, keys: flashes },
      { name: "lightning", svg: bolt(70, 40) + bolt(122, 44), keys: flashes },
      { name: "the way, lit at a flash", svg: way(8, 40), keys: { at: [0, 0.77, 0.778, 0.91, 0.95], opacity: [0, 0, 1, 1, 0.3] } },
      { name: "the way, lit at the next flash", svg: way(44, 78), keys: { at: [0, 0.81, 0.818, 0.91, 0.95], opacity: [0, 0, 1, 1, 0.3] } },
      { name: "dark over them", svg: `<rect width="160" height="120" fill="#05080F" opacity="0.3"/>`, keys: showFrom(0.91, 0.95) }
    ],
    words: [
      { text: "One who kindled a fire", from: 0.02, to: 0.18 },
      { text: "When it lit up all around him", from: 0.2, to: 0.36 },
      { text: "Allah took away their light", from: 0.38, to: 0.54 },
      { text: "Darkness, thunder and lightning", from: 0.56, to: 0.74 },
      { text: "When it lights the way, they walk", from: 0.76, to: 0.88 },
      { text: "When it is dark, they stand still", from: 0.89, to: 1 }
    ]
  };
}

export const WONDER_ART = { guests, forgiveness, wind, pillars, cup, "clay-bird": clayBird, storm };
