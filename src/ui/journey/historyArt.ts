import { DAY_SKY, animalAt, cloud, glow, n, peaks, sky, stars, tuft, type SignArt, type SignKeys } from "./signDraw";

/**
 * Signs told in the Quran's stories of places, drawn as the signs in creation are (signArt.ts): the cave where the
 * young believers slept for years while the sun turned away from them, their dog at its entrance (Quran 18:10,
 * 18:11, 18:17, 18:18); the elephant held back from Makkah, and the birds in flocks with their stones of baked clay
 * (Quran 105:1 to 105:5, Sahih al-Bukhari 2731); and the winter and summer journeys of Quraysh, fed against hunger and
 * safe from fear (Quran 106:1 to 106:4). No person is drawn: the sleepers stay inside the dark cave, and the army is
 * only its dust.
 */

const SUN = (x: number, y: number) => `${glow(x, y, 16, "#FFE7A0", 0.12)}<circle cx="${x}" cy="${y}" r="8" fill="#FFC93C"/>`;
/** A time through the story, kept to three places (n() keeps one, for drawing). */
const at3 = (value: number) => Math.round(value * 1000) / 1000;
/** Keys that hold a part out of sight until `from`, show it by `to`, and keep it. */
const showFrom = (from: number, to: number): SignKeys => ({ at: [0, from, to], opacity: [0, 0, 1] });

// The cave: the sun turning away from it as it rises and as it sets, their dog lying at its entrance, and the years
// passing over them asleep (Quran 18:10, 18:11, 18:17, 18:18). Its entrance faced north (Ibn Kathir), so the sun goes
// over the far side of the mountain and its light never falls into the cave.
function cave(): SignArt {
  const mountain =
    `<path d="M0 100 C8 84 20 66 40 52 C56 41 70 36 82 37 C98 38 114 48 128 62 C142 76 152 88 160 94 L160 120 L0 120 Z" fill="#8C7B6B"/>` +
    `<path d="M82 37 C98 38 114 48 128 62 C142 76 152 88 160 94 L160 120 L104 120 C110 96 98 64 82 37 Z" fill="#000000" opacity="0.1"/>` +
    `<path d="M30 76 l8 -4 M44 62 l6 -2 M116 66 l7 4 M134 84 l6 3 M52 90 l6 2" stroke="#6F604F" stroke-width="0.9"/>`;
  const ground = `<path d="M0 100 C40 98 120 99 160 100 L160 120 L0 120 Z" fill="#A08C72"/><path d="M0 100 C40 98 120 99 160 100" stroke="#B9A487" stroke-width="1"/>`;
  const mouth = `<path d="M66 101 C66 86 73 74 82 74 C91 74 98 86 98 101 Z" fill="#2A211B"/><path d="M70 101 C70 89 75 80 82 80 C89 80 94 89 94 101 Z" fill="#150F0B"/>`;
  // Their dog lying at the threshold, its forelegs stretched out before it.
  const dog =
    `<path d="M74 99.6 C74 95.6 78 94.2 82 94.4 C86 94.6 88 96 88.4 99.6 Z" fill="#C98B52"/>` +
    `<ellipse cx="76.4" cy="98.4" rx="3" ry="2" fill="#B57A45"/>` +
    `<path d="M86 99 L95.6 99.4 L95.6 100.6 L86 100.6 Z" fill="#B57A45"/><path d="M86.4 97.8 L94.6 98.2 L94.6 99.2 L86.4 99.2 Z" fill="#C98B52"/>` +
    `<circle cx="90.2" cy="93.8" r="2.7" fill="#C98B52"/><path d="M92.4 93.6 L95 94.4 L94.6 95.8 L92 95.4 Z" fill="#D9A06A"/><circle cx="95" cy="94.6" r="0.6" fill="#2B2B2B"/>` +
    `<path d="M88.6 91.8 C87.4 92.4 87 94.8 88 96.4 C89 95.6 89.6 93.6 88.6 91.8 Z" fill="#7A4E2A"/><circle cx="91.4" cy="93.2" r="0.5" fill="#2B2B2B"/>`;
  const tail = `<path d="M74.4 98.6 C71 98.4 69.4 96.6 70 94.6" stroke="#B57A45" stroke-width="1.3" fill="none" stroke-linecap="round"/>`;
  const bush =
    `<circle cx="108" cy="97" r="4" fill="#6E8F4A"/><circle cx="113" cy="98" r="3.4" fill="#7DA055"/><circle cx="104" cy="98.4" r="3" fill="#7DA055"/>` + tuft(58, 101, "#6E8F4A", 5) + tuft(120, 101, "#6E8F4A", 5);
  // Each day the sun rises behind the left slope, goes over the far side of the mountain, and sets behind the right one.
  const path = [
    [14, 74],
    [34, 50],
    [60, 38],
    [100, 38],
    [126, 50],
    [146, 74]
  ];
  // Out of sight behind the slopes before it rises and after it sets.
  const day = (from: number, to: number): SignKeys => {
    const at = path.map((_, i) => at3(from + ((to - from) * i) / (path.length - 1)));
    const xs = path.map(([x]) => x - 80);
    const ys = path.map(([, y]) => y - 40);
    return {
      at: [0, at3(from - 0.005), ...at, at3(to + 0.005)],
      x: [xs[0], xs[0], ...xs, xs[xs.length - 1]],
      y: [ys[0], ys[0], ...ys, ys[ys.length - 1]],
      opacity: [0, 0, ...path.map(() => 1), 0]
    };
  };
  const nights = { at: [0, 0.26, 0.31, 0.37, 0.42, 0.6, 0.65, 0.7, 0.75, 0.86, 0.9, 0.94, 0.98], opacity: [0, 0, 0.7, 0.7, 0, 0, 0.7, 0.7, 0, 0, 0.7, 0.7, 0] };
  const starry = { at: nights.at, opacity: nights.opacity.map((value) => (value ? 1 : 0)) };
  const leftLight = { at: [0, 0.06, 0.12, 0.18, 0.44, 0.5, 0.56, 0.76, 0.79, 0.82], opacity: [0, 0.3, 0.3, 0, 0.3, 0.3, 0, 0.3, 0.3, 0] };
  const rightLight = { at: [0, 0.16, 0.22, 0.28, 0.54, 0.6, 0.66, 0.8, 0.83, 0.86], opacity: [0, 0, 0.3, 0, 0, 0.3, 0, 0, 0.3, 0] };
  return {
    kind: "cave",
    ms: 11000,
    stillAt: 0.1,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 58) },
      { name: "sun, first day", svg: SUN(80, 40), keys: day(0.02, 0.3) },
      { name: "sun, second day", svg: SUN(80, 40), keys: day(0.4, 0.64) },
      { name: "sun, third day", svg: SUN(80, 40), keys: day(0.74, 0.88) },
      { name: "sun rising again", svg: SUN(80, 40), keys: { at: [0, 0.95, 0.955, 1], x: [-66, -66, -66, -46], y: [34, 34, 34, 10], opacity: [0, 0, 1, 1] } },
      { name: "mountain", svg: mountain },
      { name: "morning light on the left", svg: `<path d="M0 100 C8 84 20 66 40 52 C56 41 70 36 82 37 C80 60 70 80 66 101 Z" fill="#FFE7A0"/>`, keys: leftLight },
      { name: "evening light on the right", svg: `<path d="M82 37 C98 38 114 48 128 62 C142 76 152 88 160 94 L160 101 L98 101 C96 80 88 60 82 37 Z" fill="#FFE7A0"/>`, keys: rightLight },
      { name: "ground", svg: ground },
      { name: "the cave", svg: mouth },
      { name: "bush growing over the years", svg: bush, origin: { x: 108, y: 101 }, keys: { at: [0, 0.2, 1], scale: [0.4, 0.4, 1] }, loop: { move: "bob", ms: 3000, x: 0.4 } },
      { name: "their dog", svg: dog },
      { name: "its tail", svg: tail, origin: { x: 74.4, y: 98.6 }, loop: { move: "sway", ms: 2400, angle: 8 } },
      { name: "night", svg: `<rect width="160" height="120" fill="#0F1C3A"/>`, keys: nights },
      {
        name: "stars",
        svg: stars([
          [12, 12],
          [30, 24],
          [52, 10],
          [74, 20],
          [102, 12],
          [124, 26],
          [148, 14],
          [140, 40],
          [18, 44]
        ]),
        keys: starry,
        loop: { move: "twinkle", ms: 1200, low: 0.4 }
      }
    ],
    words: [
      { text: "Shelter in the cave", from: 0.02, to: 0.2 },
      { text: "The sun turned from their cave", from: 0.22, to: 0.44 },
      { text: "Their dog at the entrance", from: 0.46, to: 0.7 },
      { text: "Years of sleep", from: 0.72, to: 1 }
    ]
  };
}

/** The Ka'bah, a black cube with its band of gold, its front's foot at (x, y), `w` wide. */
export function kabah(x: number, y: number, w: number) {
  const d = w * 0.3;
  return (
    `<path d="M${x} ${y} L${x} ${n(y - w)} L${n(x + w)} ${n(y - w)} L${n(x + w)} ${y} Z" fill="#1E1E1E"/>` +
    `<path d="M${n(x + w)} ${y} L${n(x + w)} ${n(y - w)} L${n(x + w + d)} ${n(y - w - d * 0.6)} L${n(x + w + d)} ${n(y - d * 0.6)} Z" fill="#111111"/>` +
    `<path d="M${x} ${n(y - w)} L${n(x + d)} ${n(y - w - d * 0.6)} L${n(x + w + d)} ${n(y - w - d * 0.6)} L${n(x + w)} ${n(y - w)} Z" fill="#2E2E2E"/>` +
    `<path d="M${x} ${n(y - w * 0.74)} L${n(x + w)} ${n(y - w * 0.74)} L${n(x + w + d)} ${n(y - w * 0.74 - d * 0.6)}" stroke="#D4A93C" stroke-width="${n(w * 0.07)}" fill="none"/>` +
    `<rect x="${n(x + w * 0.62)}" y="${n(y - w * 0.56)}" width="${n(w * 0.2)}" height="${n(w * 0.34)}" fill="#C9A03A"/>`
  );
}

const MAKKAH = (fill: string) =>
  peaks(
    [
      [16, 34, 26],
      [50, 24, 22],
      [114, 28, 24],
      [148, 38, 26]
    ],
    84,
    fill,
    false
  );

// The elephant: the army that came with it to pull down the Ka'bah, the elephant held back from Makkah, the birds in
// flocks throwing stones of baked clay, and the army left like straw that cattle have eaten (Quran 105:1 to 105:5;
// "He who held back the elephant", Sahih al-Bukhari 2731). The army is only its dust; the elephant kneels, facing the
// Ka'bah, and goes no further.
function elephant(): SignArt {
  const valley = `<rect y="82" width="160" height="38" fill="#E3CDA0"/><path d="M0 82 C40 80 120 81 160 82" stroke="#CDB385" stroke-width="1"/>`;
  const dust = `<g fill="#D9C39A"><circle cx="122" cy="88" r="9"/><circle cx="136" cy="84" r="11"/><circle cx="150" cy="88" r="9"/><circle cx="128" cy="96" r="8"/><circle cx="146" cy="97" r="8"/><circle cx="114" cy="96" r="6"/></g>`;
  // A flock: four small birds, each with its three stones, one in its beak and two in its feet.
  const flock = (x: number, y: number) =>
    [
      [0, 0],
      [12, -5],
      [22, 2],
      [9, 8]
    ]
      .map(([dx, dy]) => {
        const bx = x + dx;
        const by = y + dy;
        return (
          animalAt("sparrow", n(bx), n(by), 0.1) +
          `<circle cx="${n(bx + 9.8)}" cy="${n(by + 4.6)}" r="0.7" fill="#6B3A22"/><circle cx="${n(bx + 4.8)}" cy="${n(by + 7.2)}" r="0.7" fill="#6B3A22"/><circle cx="${n(bx + 6.2)}" cy="${n(by + 7.4)}" r="0.7" fill="#6B3A22"/>`
        );
      })
      .join("");
  // In from far off on the left; after the stones, away to the right.
  const flockKeys = (from: number): SignKeys => ({ at: [0, from, at3(from + 0.14), 0.8, 0.9], x: [-200, -200, 0, 0, 90], opacity: [1, 1, 1, 1, 0] });
  const stones = [
    [116, 10],
    [126, 40],
    [136, 22],
    [146, 52],
    [156, 8],
    [120, 70],
    [130, 96],
    [140, 80],
    [150, 110],
    [158, 66]
  ]
    .map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="0.9" ry="1.1" fill="#7A4A2A"/>`)
    .join("");
  const straw = [
    [118, 94, 8],
    [128, 100, -12],
    [136, 92, 20],
    [142, 104, -6],
    [150, 96, 14],
    [156, 106, -18],
    [122, 108, 4],
    [146, 110, -10],
    [132, 112, 16]
  ]
    .map(([x, y, a]) => `<path d="M${x - 3} ${y} L${x + 3} ${y}" stroke="${a > 0 ? "#D9B65A" : "#C49A44"}" stroke-width="1" stroke-linecap="round" transform="rotate(${a} ${x} ${y})"/>`)
    .join("");
  const big = animalAt("elephant", 70, n(104 - 73 * 0.42), 0.42, true);
  return {
    kind: "elephant",
    ms: 11000,
    stillAt: 0.7,
    parts: [
      { name: "sky", svg: DAY_SKY },
      { name: "mountains of Makkah", svg: MAKKAH("#A08E7B") },
      { name: "valley", svg: valley },
      { name: "the Ka'bah", svg: kabah(26, 88, 18) },
      { name: "army's dust", svg: dust, keys: { at: [0, 0.02, 0.14, 0.8, 0.9], opacity: [0, 0, 1, 1, 0], x: [60, 60, 0, 0, 0] }, loop: { move: "bob", ms: 700, x: 1, y: 0.6 } },
      { name: "eaten straw", svg: straw, keys: showFrom(0.84, 0.92) },
      {
        name: "the elephant",
        svg: big,
        origin: { x: 91, y: 104 },
        keys: { at: [0, 0.02, 0.18, 0.22, 0.3], x: [100, 100, 0, 0, 0], scaleY: [1, 1, 1, 1, 0.82], rotate: [0, 0, 0, 0, -5] },
        loop: { move: "bob", ms: 900, y: 0.5 }
      },
      { name: "first flock", svg: flock(106, 40), keys: flockKeys(0.42), loop: { move: "bob", ms: 420, y: 0.8 } },
      { name: "second flock", svg: flock(124, 54), keys: flockKeys(0.46), loop: { move: "bob", ms: 440, y: 0.8, phase: 0.3 } },
      { name: "third flock", svg: flock(128, 30), keys: flockKeys(0.5), loop: { move: "bob", ms: 460, y: 0.8, phase: 0.6 } },
      { name: "stones of baked clay", svg: stones, clip: { x: 112, y: 52, w: 48, h: 52 }, keys: { at: [0, 0.62, 0.64, 0.8, 0.82], opacity: [0, 0, 1, 1, 0] }, loop: { move: "drip", ms: 700, distance: 26 } }
    ],
    words: [
      { text: "The army of the elephant", from: 0.02, to: 0.2 },
      { text: "The elephant was held back", from: 0.22, to: 0.4 },
      { text: "Birds in flocks", from: 0.42, to: 0.6 },
      { text: "Stones of baked clay", from: 0.62, to: 0.8 },
      { text: "Like eaten straw", from: 0.82, to: 1 }
    ]
  };
}

/** A camel of the caravan with its load, its box's corner at (x, y), `s` times a card's camel; `left`: facing left. */
function loaded(x: number, y: number, s: number, left: boolean) {
  const hump = left ? x + 100 * s - 40 * s : x + 40 * s;
  const top = y + 26 * s;
  return (
    animalAt("camel", n(x), n(y), s, left) +
    `<rect x="${n(hump - 9 * s)}" y="${n(top - 2 * s)}" width="${n(18 * s)}" height="${n(5 * s)}" rx="${n(2 * s)}" fill="#9C3D1E"/>` +
    `<rect x="${n(hump - 13 * s)}" y="${n(top + 2 * s)}" width="${n(9 * s)}" height="${n(14 * s)}" rx="${n(2 * s)}" fill="#C8A274"/><rect x="${n(hump + 4 * s)}" y="${n(top + 2 * s)}" width="${n(9 * s)}" height="${n(14 * s)}" rx="${n(2 * s)}" fill="#B58D5E"/>`
  );
}

// The winter and summer journeys of Quraysh, made easy for them: the caravans go out and come home, and Allah feeds
// them against hunger and keeps them safe from fear, so they worship the Lord of this House (Quran 106:1 to 106:4).
function journeys(): SignArt {
  const valley = `<rect y="84" width="160" height="36" fill="#E3CDA0"/><path d="M0 84 C40 82 120 83 160 84" stroke="#CDB385" stroke-width="1"/>`;
  const s = 0.24;
  const feet = n(106 - 73 * s);
  const caravan = (xs: number[], left: boolean) => xs.map((x) => loaded(x, feet, s, left)).join("");
  const goods =
    `<path d="M30 106 C28 100 30 96 34 96 C38 96 40 100 38 106 Z" fill="#C8A274"/><path d="M32 96.6 L36 96.6" stroke="#8C6A44" stroke-width="1"/>` +
    `<path d="M40 106 C38 101 40 97.6 44 97.6 C48 97.6 50 101 48 106 Z" fill="#B58D5E"/><path d="M42 98.2 L46 98.2" stroke="#8C6A44" stroke-width="1"/>` +
    `<path d="M52 106 L54 100 L64 100 L66 106 Z" fill="#A8794A"/>` +
    [55, 57.6, 60.2, 62.8, 56.3, 58.9, 61.5].map((x, i) => `<ellipse cx="${x}" cy="${i < 4 ? 99.6 : 98.2}" rx="1.3" ry="1.6" fill="#7A2E16"/>`).join("");
  const doves = animalAt("dove", 40, 46, 0.1) + animalAt("dove", 100, 40, 0.1, true) + animalAt("dove", 120, 54, 0.09);
  return {
    kind: "journeys",
    ms: 11000,
    parts: [
      { name: "winter sky", svg: sky("#AFC0D2", "#CFDBE6", 60) },
      { name: "summer sky", svg: DAY_SKY, keys: { at: [0, 0.24, 0.28], opacity: [0, 0, 1] } },
      { name: "evening sky", svg: sky("#F4C08E", "#FBE0BE", 60), keys: { at: [0, 0.74, 0.8], opacity: [0, 0, 1] } },
      { name: "winter clouds", svg: cloud(30, 34, 1.1, "#E9EEF3") + cloud(124, 30, 1.3, "#E9EEF3"), keys: { at: [0, 0.22, 0.27], opacity: [1, 1, 0] }, loop: { move: "bob", ms: 6000, x: 3 } },
      { name: "summer sun", svg: SUN(136, 34), keys: { at: [0, 0.24, 0.28, 0.72, 0.78], opacity: [0, 0, 1, 1, 0] }, loop: { move: "twinkle", ms: 1800, low: 0.75 } },
      { name: "mountains of Makkah", svg: MAKKAH("#A08E7B") },
      { name: "valley", svg: valley },
      { name: "the Ka'bah", svg: kabah(72, 92, 18) },
      { name: "food brought home", svg: goods, keys: showFrom(0.64, 0.72) },
      { name: "winter caravan", svg: caravan([92, 114, 136], true), keys: { at: [0, 0.04, 0.22], x: [0, 0, -170] }, loop: { move: "bob", ms: 560, y: 0.5 } },
      { name: "summer caravan", svg: caravan([2, 24, 46], false), keys: { at: [0, 0.26, 0.48], x: [-90, -90, 170] }, loop: { move: "bob", ms: 560, y: 0.5, phase: 0.4 } },
      { name: "caravan home", svg: caravan([92, 114, 136], true), keys: { at: [0, 0.52, 0.66], x: [130, 130, 0] }, loop: { move: "bob", ms: 1800, y: 0.4 } },
      { name: "doves, safe", svg: doves, keys: { at: [0, 0.78, 0.86], opacity: [0, 0, 1], y: [-30, -30, 0] }, loop: { move: "bob", ms: 1400, y: 1.2, x: 1.4 } },
      {
        name: "evening stars",
        svg: stars([
          [20, 14],
          [60, 8],
          [104, 16],
          [146, 10]
        ]),
        keys: { at: [0, 0.86, 0.94], opacity: [0, 0, 1] },
        loop: { move: "twinkle", ms: 1300, low: 0.3 }
      }
    ],
    words: [
      { text: "The winter journey", from: 0.02, to: 0.24 },
      { text: "The summer journey", from: 0.26, to: 0.5 },
      { text: "Fed against hunger", from: 0.52, to: 0.76 },
      { text: "Safe from fear", from: 0.78, to: 1 }
    ]
  };
}

export const HISTORY_ART = { cave, elephant, journeys };
