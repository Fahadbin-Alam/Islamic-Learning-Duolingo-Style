import { GUSTS, animalAt, flame, glow, n, peaks, sky, stars, type SignArt, type SignKeys } from "./signDraw";
import { at3, curls, showFrom } from "./storyArt";

/**
 * Allah's favors to His Prophets, drawn as the other stories are (storyArt.ts, prophetArt.ts): the mountains and the
 * birds glorifying Allah with Dawud, and the iron made soft for him; the House raised in a valley without crops, and
 * the call to Hajj; Safa and Marwah, and the water of Zamzam; the queen's throne brought in the blink of an eye, and
 * the palace paved with glass; the provision Zakariyya found with Maryam in the mihrab; and the fire made cool and
 * safe for Ibrahim. Only the signs are drawn: the land, the sky, water, plants, animals and things. No Prophet, no
 * person and no angel is ever drawn: things move by themselves, as the ark's planks do.
 */

/** Keys that show a part from `from` to `to`, then hide it from `hide` to `gone`. */
const showWhile = (from: number, to: number, hide: number, gone: number): SignKeys => ({ at: [0, from, to, hide, gone], opacity: [0, 0, 1, 1, 0] });
/** Keys that show a part from the start, then hide it from `from` to `gone`. */
const hideFrom = (from: number, gone: number): SignKeys => ({ at: [0, from, gone], opacity: [1, 1, 0] });

/** Is (x, y) inside the polygon `points`? */
function inside(points: [number, number][], x: number, y: number) {
  let found = false;
  for (let i = 0, j = points.length - 1; i < points.length; j = i, i += 1) {
    const [xi, yi] = points[i];
    const [xj, yj] = points[j];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) found = !found;
  }
  return found;
}

/** Arcs of soft light over a mountain's top at (x, y): its glorifying, with him. */
const praiseArcs = (x: number, y: number) =>
  [6, 10.5, 15]
    .map((r, i) => `<path d="M${n(x - r)} ${n(y + 1)} A${r} ${r} 0 0 1 ${n(x + r)} ${n(y + 1)}" stroke="#FFF6DC" stroke-width="${i ? 0.8 : 1.1}" fill="none" opacity="${n(0.95 - i * 0.25)}" stroke-linecap="round"/>`)
    .join("");

// The coat of mail, standing: its shoulders, short sleeves and hem.
const COAT: [number, number][] = [
  [68, 64],
  [74, 61],
  [86, 61],
  [92, 64],
  [99, 74],
  [93.5, 77],
  [91, 71],
  [91, 95],
  [69, 95],
  [69, 71],
  [66.5, 77],
  [61, 74]
];

/** The rings of the coat of mail whose middles are between `top` and `foot`, in even rows, each row half a ring along. */
function coatRings(top: number, foot: number) {
  let d = "";
  for (let row = 0, y = 62.6; y < 95; row += 1, y = n(62.6 + row * 2.7)) {
    if (y < top || y >= foot) continue;
    for (let x = 60 + (row % 2 ? 1.5 : 0); x < 100; x += 3) {
      const near = [
        [x - 1.1, y],
        [x + 1.1, y],
        [x, y - 1.1],
        [x, y + 1.1]
      ];
      if (near.every(([px, py]) => inside(COAT, px, py))) d += `M${n(x - 1.25)} ${y} a1.25 1.25 0 1 0 2.5 0 a1.25 1.25 0 1 0 -2.5 0 `;
    }
  }
  return `<path d="${d.trim()}" stroke="#5F6871" stroke-width="0.55" fill="none"/>`;
}

// Dawud: the mountains glorifying Allah with him, and the birds gathered to him (Quran 21:79, 34:10, 38:18, 38:19);
// the iron made soft for him, and the coats of mail he was taught to make, their rings just right (21:80, 34:10,
// 34:11; Mujahid's word on the rings, as the course teaches it). He is not drawn: the praise is light about the
// mountains, and the iron bends and the rings join by themselves.
function dawud(): SignArt {
  const scene = sky("#F4D8B2", "#FBEAD3", 66) + glow(34, 62, 20, "#FFE6B0", 0.08) + `<circle cx="34" cy="62" r="7" fill="#FFE1A0"/>`;
  const back = peaks(
    [
      [52, 30, 30],
      [110, 34, 30]
    ],
    88,
    "#BAA78D",
    false
  );
  const front = peaks(
    [
      [20, 34, 30],
      [80, 44, 36],
      [140, 38, 32]
    ],
    88,
    "#9E8970",
    false
  );
  const ground =
    `<rect y="88" width="160" height="32" fill="#D9C39B"/><path d="M0 88 L160 88" stroke="#C4AC80" stroke-width="1"/>` +
    `<ellipse cx="22" cy="100" rx="4" ry="1.6" fill="#BFA47A"/><ellipse cx="136" cy="104" rx="5" ry="1.8" fill="#BFA47A"/><path d="M40 106 l6 0 M112 96 l5 0" stroke="#C4AC80" stroke-width="0.8" stroke-linecap="round"/>`;
  const leftBirds = animalAt("dove", 22, 32, 0.16) + animalAt("sparrow", 40, 44, 0.14) + animalAt("bird", 4, 44, 0.14);
  const rightBirds = animalAt("dove", 110, 34, 0.16, true) + animalAt("bird", 126, 46, 0.14, true) + animalAt("sparrow", 142, 34, 0.14, true);
  const stone = `<path d="M56 104 L60 96 L100 96 L104 104 Z" fill="#8F8A82"/><path d="M60 96 L100 96 L98 94.4 L62 94.4 Z" fill="#ABA69D"/>`;
  const bar = `<rect x="66" y="91" width="28" height="3.4" rx="1.2" fill="#5D646C"/><path d="M68 91.8 L92 91.8" stroke="#8C949D" stroke-width="0.6" stroke-linecap="round"/>`;
  const bent = `<path d="M68 94 C68 82 92 82 92 94" stroke="#5D646C" stroke-width="3.4" fill="none" stroke-linecap="round"/><path d="M69.6 92 C70 84.6 90 84.6 90.4 92" stroke="#8C949D" stroke-width="0.6" fill="none" stroke-linecap="round"/>`;
  const outline = `M${COAT.map(([x, y]) => `${x} ${y}`).join(" L")} Z`;
  const coat = `<path d="${outline}" fill="#BAC1C8" opacity="0.55" stroke="#5F6871" stroke-width="0.8" stroke-linejoin="round"/>`;
  const bands = [
    [60, 70],
    [70, 79],
    [79, 87],
    [87, 96]
  ];
  const glints = `<path d="M73 69 l1 -2.2 l1 2.2 l-1 2.2 Z M86 77 l1 -2.2 l1 2.2 l-1 2.2 Z M76 88 l0.9 -2 l0.9 2 l-0.9 2 Z M95 72 l0.8 -1.8 l0.8 1.8 l-0.8 1.8 Z" fill="#FFFFFF"/>`;
  return {
    kind: "dawud",
    ms: 11500,
    parts: [
      { name: "morning sky", svg: scene },
      { name: "far mountains", svg: back },
      { name: "praise from the far mountains", svg: praiseArcs(52, 58) + praiseArcs(110, 54), keys: showFrom(0.04, 0.12), loop: { move: "twinkle", ms: 2000, low: 0.25, phase: 0.5 } },
      { name: "the mountains", svg: front },
      { name: "praise from the mountains", svg: praiseArcs(20, 54) + praiseArcs(80, 44) + praiseArcs(140, 50), keys: showFrom(0.03, 0.1), loop: { move: "twinkle", ms: 1800, low: 0.25 } },
      { name: "ground", svg: ground },
      { name: "birds gathered, left", svg: leftBirds, keys: { at: [0, 0.22, 0.3], opacity: [0, 0, 1], x: [-44, -44, 0], y: [-8, -8, 0] }, loop: { move: "bob", ms: 1400, y: 1.2 } },
      { name: "birds gathered, right", svg: rightBirds, keys: { at: [0, 0.24, 0.32], opacity: [0, 0, 1], x: [44, 44, 0], y: [-8, -8, 0] }, loop: { move: "bob", ms: 1400, y: 1.2, phase: 0.5 } },
      { name: "stone", svg: stone },
      { name: "iron glowing", svg: glow(80, 92, 16, "#FFB66E", 0.08), keys: showWhile(0.42, 0.46, 0.58, 0.64), loop: { move: "twinkle", ms: 900, low: 0.6 } },
      { name: "iron", svg: bar, keys: hideFrom(0.48, 0.54) },
      { name: "iron bending", svg: bent, keys: showWhile(0.48, 0.54, 0.62, 0.66) },
      { name: "coat of mail", svg: coat, keys: showFrom(0.62, 0.66) },
      ...bands.map(([top, foot], index) => {
        const from = at3(0.64 + index * 0.032);
        return { name: `rings of the coat, band ${index + 1}`, svg: coatRings(top, foot), keys: { at: [0, from, at3(from + 0.03)], opacity: [0, 0, 1], y: [-3, -3, 0] } };
      }),
      { name: "rings shining", svg: glints, keys: showFrom(0.84, 0.88), loop: { move: "twinkle", ms: 1300, low: 0.15 } }
    ],
    words: [
      { text: "The mountains glorified with him", from: 0.02, to: 0.2 },
      { text: "And the birds, gathered", from: 0.22, to: 0.4 },
      { text: "Iron made soft for him", from: 0.42, to: 0.6 },
      { text: "Make coats of mail", from: 0.62, to: 0.8 },
      { text: "The rings just right", from: 0.82, to: 1 }
    ]
  };
}

/** Bare mountains about Makkah, their feet on `base`. */
const bareMountains = (list: [number, number, number][], base: number) => peaks(list, base, "#9C7E5E", false);

/** One course of the House's stones, the `i`th from the ground: its front, its side and its top. */
function course(i: number) {
  const y0 = n(98 - 5.6 * i);
  const y1 = n(y0 - 5.6);
  let joints = "";
  for (let x = 66 + (i % 2 ? 3.5 : 7); x < 94; x += 7) joints += `M${n(x)} ${y1} L${n(x)} ${y0} `;
  return (
    `<path d="M66 ${y0} L66 ${y1} L94 ${y1} L94 ${y0} Z" fill="#A88C68"/>` +
    `<path d="M94 ${y0} L94 ${y1} L102.4 ${n(y1 - 5)} L102.4 ${n(y0 - 5)} Z" fill="#8D7455"/>` +
    `<path d="M66 ${y1} L74.4 ${n(y1 - 5)} L102.4 ${n(y1 - 5)} L94 ${y1} Z" fill="#C2A67F"/>` +
    `<path d="${joints}M66 ${y0} L94 ${y0} L102.4 ${n(y0 - 5)} M98.2 ${n(y0 - 2.5)} L98.2 ${n(y1 - 2.5)}" stroke="#7E6346" stroke-width="0.5" fill="none"/>`
  );
}

// The House: a valley without crops, by Allah's sacred House (Quran 14:37); its foundations raised, course by
// course, with the prayer: our Lord, accept from us (2:127); the call to Hajj going out, and the lean camels coming
// from every distant path (22:26, 22:27). Ibrahim and Ismail are not drawn: the stones rise by themselves.
function house(): SignArt {
  const scene = sky("#CFE5F3", "#E9F2F7", 66);
  const range = bareMountains(
    [
      [12, 34, 24],
      [44, 24, 22],
      [118, 28, 24],
      [150, 36, 24]
    ],
    86
  );
  const valley =
    `<rect y="86" width="160" height="34" fill="#E4CB97"/><path d="M0 86 L160 86" stroke="#CDB07C" stroke-width="1"/>` +
    `<ellipse cx="30" cy="104" rx="3.4" ry="1.4" fill="#C7A877"/><ellipse cx="126" cy="106" rx="4" ry="1.5" fill="#C7A877"/><ellipse cx="48" cy="94" rx="2.4" ry="1" fill="#C7A877"/>` +
    `<path d="M14 96 l5 1.4 l3 -1 M134 98 l4 1.2 l4 -1.4 M58 108 l4 -1 l3 1" stroke="#CDAE78" stroke-width="0.7" fill="none" stroke-linecap="round"/>`;
  const paths = `<path d="M30 86 C34 90 48 95 64 98 M0 97 C18 96 40 99 62 101 M160 95 C142 95 122 97 104 99 M134 86 C130 90 118 94 106 97" stroke="#F2DFB4" stroke-width="2.6" fill="none" stroke-linecap="round" opacity="0.85"/>`;
  const ring = `<circle cx="84" cy="82" r="12" fill="none" stroke="#FFFFFF" stroke-width="1.1"/>`;
  const call = (from: number): SignKeys => ({ at: [0, from, at3(from + 0.01), at3(from + 0.12)], opacity: [0, 0, 0.9, 0], scale: [0.4, 0.4, 0.5, 3.4] });
  const walking = { move: "bob" as const, ms: 620, y: 0.5 };
  return {
    kind: "house",
    ms: 12000,
    parts: [
      { name: "sky", svg: scene },
      { name: "bare mountains", svg: range },
      { name: "the valley", svg: valley },
      { name: "dry wind", svg: GUSTS, keys: { at: [0, 0.02, 0.06, 0.16, 0.2], opacity: [0, 0, 0.35, 0.35, 0] }, loop: { move: "slide", ms: 4000 } },
      { name: "paths to the House", svg: paths, keys: showFrom(0.82, 0.88) },
      ...[0, 1, 2, 3, 4].map((i) => {
        const from = at3(0.22 + i * 0.05);
        return { name: `stones of the House, course ${i + 1}`, svg: course(i), keys: { at: [0, from, at3(from + 0.04)], opacity: [0, 0, 1], y: [-14, -14, 0] } };
      }),
      { name: "accepted", svg: glow(84, 82, 34, "#FFF6DA", 0.07), keys: showFrom(0.52, 0.6), loop: { move: "twinkle", ms: 2400, low: 0.6 } },
      ...[0.68, 0.72, 0.76].map((from, index) => ({ name: `the call going out, ${index + 1}`, svg: ring, origin: { x: 84, y: 82 }, keys: call(from) })),
      { name: "camel coming, left", svg: animalAt("camel", 22, n(97 - 73 * 0.17), 0.17), keys: { at: [0, 0.84, 0.97], opacity: [0, 0, 1], x: [-40, -40, 0] }, loop: walking },
      { name: "camel coming behind, left", svg: animalAt("camel", 2, n(102 - 73 * 0.15), 0.15), keys: { at: [0, 0.86, 0.99], opacity: [0, 0, 1], x: [-30, -30, 0] }, loop: { ...walking, phase: 0.4 } },
      { name: "camel coming, right", svg: animalAt("camel", 112, n(98 - 73 * 0.17), 0.17, true), keys: { at: [0, 0.84, 0.97], opacity: [0, 0, 1], x: [40, 40, 0] }, loop: { ...walking, phase: 0.2 } },
      { name: "camel coming behind, right", svg: animalAt("camel", 140, n(103 - 73 * 0.15), 0.15, true), keys: { at: [0, 0.86, 0.99], opacity: [0, 0, 1], x: [30, 30, 0] }, loop: { ...walking, phase: 0.6 } }
    ],
    words: [
      { text: "A valley without crops", from: 0.02, to: 0.18 },
      { text: "Raising the foundations of the House", from: 0.2, to: 0.5 },
      { text: "Our Lord, accept from us", from: 0.52, to: 0.66 },
      { text: "Proclaim the Hajj to the people", from: 0.68, to: 0.82 },
      { text: "From every distant path", from: 0.84, to: 1 }
    ]
  };
}

/** Footprints along the way, the front ones darkest, going to the right; `x` is the middle. */
const footsteps = (x: number, y: number) =>
  [-8, -4, 0, 4, 8]
    .map((dx, i) => `<ellipse cx="${n(x + dx)}" cy="${n(y + (i % 2 ? 0.9 : -0.9))}" rx="1.15" ry="0.62" fill="#A5835C" opacity="${n(0.35 + i * 0.15)}"/>`)
    .join("");

// Safa and Marwah, among the signs of Allah (Quran 2:158): Hajar went between them seven times, looking for water
// for her baby; then the water of Zamzam came out; and a bird circling over it showed others there was water (Sahih
// al-Bukhari 3364). She is not drawn, nor her baby, nor the angel: only her footprints on the way, seven times.
function zamzam(): SignArt {
  const scene = sky("#CFE5F3", "#EAF2F6", 64);
  const range = bareMountains(
    [
      [20, 30, 26],
      [62, 22, 22],
      [104, 26, 24],
      [146, 32, 26]
    ],
    82
  );
  const valley = `<rect y="82" width="160" height="38" fill="#E6CF9E"/><path d="M0 82 L160 82" stroke="#CFB27E" stroke-width="1"/><ellipse cx="128" cy="110" rx="4" ry="1.4" fill="#CBAD7B"/><ellipse cx="22" cy="108" rx="3" ry="1.2" fill="#CBAD7B"/>`;
  const hill = (x0: number, x1: number, top: number) => {
    const mid = (x0 + x1) / 2;
    return (
      `<path d="M${x0} 90 C${n(x0 + 4)} ${n(top + 10)} ${n(mid - 12)} ${top} ${mid} ${top} C${n(mid + 12)} ${top} ${n(x1 - 4)} ${n(top + 10)} ${x1} 90 Z" fill="#A9896A"/>` +
      `<path d="M${mid} ${top} C${n(mid + 12)} ${top} ${n(x1 - 4)} ${n(top + 10)} ${x1} 90 L${mid} 90 Z" fill="#000000" opacity="0.1"/>` +
      `<ellipse cx="${n(mid - 8)}" cy="${n(top + 9)}" rx="3" ry="1.6" fill="#94775A"/><ellipse cx="${n(mid + 5)}" cy="${n(top + 14)}" rx="2.4" ry="1.3" fill="#94775A"/>`
    );
  };
  const hills = hill(4, 56, 70) + hill(104, 156, 72);
  const way = `<path d="M50 93 C68 91.6 92 94.4 110 93" stroke="#F4E3BC" stroke-width="4.4" fill="none" stroke-linecap="round"/>`;
  const counts = [62, 68, 74, 80, 86, 92, 98];
  const empty = counts.map((x) => `<circle cx="${x}" cy="86.4" r="1.5" fill="#F7EBCF" stroke="#B2916A" stroke-width="0.5"/>`).join("");
  const spring =
    `<path d="M80 104 C78.6 99 76.4 96.6 74.4 96 M80 104 C80 99 80 96 80 94 M80 104 C81.4 99 83.6 96.6 85.6 96" stroke="#7FC3EB" stroke-width="1.5" fill="none" stroke-linecap="round"/>` +
    `<circle cx="74" cy="96.6" r="0.9" fill="#A9DBF7"/><circle cx="86" cy="96.6" r="0.9" fill="#A9DBF7"/><circle cx="80" cy="93.4" r="0.9" fill="#A9DBF7"/>`;
  const pool = `<ellipse cx="80" cy="104.4" rx="12" ry="2.8" fill="#5FB0E0"/><ellipse cx="77" cy="103.8" rx="5" ry="0.8" fill="#9ED3F2"/>`;
  return {
    kind: "zamzam",
    ms: 12000,
    parts: [
      { name: "sky", svg: scene },
      { name: "bare mountains", svg: range },
      { name: "the valley", svg: valley },
      { name: "Safa and Marwah", svg: hills },
      { name: "the way between them", svg: way },
      { name: "seven times, to count", svg: empty, keys: showFrom(0.2, 0.24) },
      ...counts.map((x, k) => {
        const from = at3(0.2 + (k + 1) * 0.048);
        return { name: `time ${k + 1}`, svg: `<circle cx="${x}" cy="86.4" r="1.5" fill="#E0A23A"/>`, keys: showFrom(at3(from - 0.012), from) };
      }),
      { name: "footsteps between them", svg: footsteps(80, 93), origin: { x: 80, y: 93 }, keys: showWhile(0.2, 0.23, 0.58, 0.61), loop: { move: "swim", ms: 1400, x: 24 } },
      { name: "the water of Zamzam", svg: pool, origin: { x: 80, y: 104.4 }, keys: { at: [0, 0.62, 0.7], opacity: [0, 0, 1], scaleX: [0.1, 0.1, 1] }, loop: { move: "twinkle", ms: 1600, low: 0.85 } },
      { name: "water coming out", svg: spring, origin: { x: 80, y: 104 }, keys: { at: [0, 0.6, 0.64], opacity: [0, 0, 1], scaleY: [0.1, 0.1, 1] }, loop: { move: "bob", ms: 420, y: 0.5 } },
      { name: "a bird circling over the water", svg: animalAt("bird", 71, 58, 0.18), origin: { x: 80, y: 67 }, keys: { at: [0, 0.78, 0.86], opacity: [0, 0, 1], y: [-30, -30, 0] }, loop: { move: "swim", ms: 3200, x: 18 } }
    ],
    words: [
      { text: "Safa and Marwah", from: 0.02, to: 0.18 },
      { text: "Seven times between them", from: 0.2, to: 0.58 },
      { text: "The water of Zamzam", from: 0.6, to: 0.76 },
      { text: "A bird circling over the water", from: 0.78, to: 1 }
    ]
  };
}

/** A throne with a high back, on a step, its feet's middle at (x, y), `s` times its size, in `metal` with its gems. */
function throneOf(x: number, y: number, s: number, metal: string, dark: string, gem: string, gems: string) {
  const r = (x0: number, y0: number, w: number, h: number, fill: string, rx = 0) =>
    `<rect x="${n(x + x0 * s)}" y="${n(y + y0 * s)}" width="${n(w * s)}" height="${n(h * s)}" rx="${n(rx * s)}" fill="${fill}"/>`;
  const c = (dx: number, dy: number, rad: number, fill: string) => `<circle cx="${n(x + dx * s)}" cy="${n(y + dy * s)}" r="${n(rad * s)}" fill="${fill}"/>`;
  return (
    r(-19, 3, 38, 3, dark, 0.6) +
    r(-16, 0, 32, 3.2, metal, 0.6) +
    r(-10, -38, 20, 26, metal, 4) +
    r(-7.5, -34.5, 15, 19, dark, 3) +
    r(-13, -24, 4, 9, metal, 1) +
    r(9, -24, 4, 9, metal, 1) +
    r(-13, -16, 26, 5, dark, 1) +
    r(-11.5, -11, 3, 11, metal) +
    r(8.5, -11, 3, 11, metal) +
    c(0, -32, 2.4, gem) +
    c(-4.6, -25, 1.3, gems) +
    c(4.6, -25, 1.3, gems) +
    c(0, -20, 1.3, gems)
  );
}

// The queen's throne: far off in Saba; brought before the glance returned, and Sulayman said: this is from the favor
// of my Lord (Quran 27:38, 27:40); changed, so it would not be known at once (27:41); and the palace paved smooth with
// glass, over water (27:44). No one is drawn: not Sulayman, nor the one who brought it, nor the queen.
function throne(): SignArt {
  const hall =
    `<rect width="160" height="120" fill="#EDE0C4"/><rect y="18" width="160" height="5" fill="#D8C29A"/><path d="M0 23 L160 23" stroke="#C4A877" stroke-width="0.8"/>` +
    `<rect x="3" y="23" width="12" height="69" fill="#E2D2B0"/><rect x="1" y="23" width="16" height="4" fill="#CDB385"/><rect x="1" y="88" width="16" height="4" fill="#CDB385"/><path d="M7 28 L7 87 M11 28 L11 87" stroke="#D2BE96" stroke-width="0.8"/>` +
    `<rect x="145" y="23" width="12" height="69" fill="#E2D2B0"/><rect x="143" y="23" width="16" height="4" fill="#CDB385"/><rect x="143" y="88" width="16" height="4" fill="#CDB385"/><path d="M149 28 L149 87 M153 28 L153 87" stroke="#D2BE96" stroke-width="0.8"/>`;
  const window =
    `<path d="M98 88 L98 60 A21 21 0 0 1 140 60 L140 88 Z" fill="#CFE6F4"/>` +
    `<path d="M98 80 C106 75 114 77 122 73 C130 70 135 74 140 74 L140 88 L98 88 Z" fill="#C9B58C"/><path d="M98 84 C110 81 124 83 140 81 L140 88 L98 88 Z" fill="#B8A279"/>` +
    `<path d="M98 88 L98 60 A21 21 0 0 1 140 60 L140 88" stroke="#B89A6A" stroke-width="2.2" fill="none"/><rect x="95" y="87" width="48" height="3" fill="#B89A6A"/>`;
  const floor = `<rect y="92" width="160" height="28" fill="#D6BE94"/><path d="M0 92 L160 92 M0 100 L160 100 M0 110 L160 110 M22 92 L16 120 M60 92 L58 120 M100 92 L102 120 M138 92 L144 120" stroke="#C4AA7E" stroke-width="0.6" fill="none"/>`;
  const water = `<rect y="92" width="160" height="28" fill="#79BCE3"/><path d="M0 92 L160 92" stroke="#E8F6FD" stroke-width="1"/>`;
  const ripples = curls(100, 22, "#D5EEFB", 0.8) + curls(110, 26, "#D5EEFB", 0.8, 14);
  const glass = `<path d="M0 100 L160 100 M0 110 L160 110 M22 92 L16 120 M60 92 L58 120 M100 92 L102 120 M138 92 L144 120" stroke="#FFFFFF" stroke-width="0.6" opacity="0.8" fill="none"/><path d="M30 96 L40 92 M34 106 L48 100 M112 98 L124 93 M118 112 L132 104" stroke="#FFFFFF" stroke-width="1.2" opacity="0.6" stroke-linecap="round"/>`;
  const gold = throneOf(62, 89, 1, "#E2B13C", "#B8862A", "#D2373C", "#3FA36B");
  const changed = throneOf(62, 89, 1, "#C6CED8", "#8F9AA8", "#3E6FD1", "#9B5BC4");
  const far = throneOf(119, 83, 0.3, "#E2B13C", "#B8862A", "#D2373C", "#3FA36B");
  const flash = glow(62, 70, 26, "#FFFFFF", 0.12) + `<path d="M62 52 L64 66 L78 68 L64 70 L62 84 L60 70 L46 68 L60 66 Z" fill="#FFFFFF" opacity="0.9"/>`;
  return {
    kind: "throne",
    ms: 11500,
    parts: [
      { name: "the hall", svg: hall },
      { name: "far off, Saba", svg: window },
      { name: "her throne, far off", svg: far, keys: hideFrom(0.24, 0.25), loop: { move: "twinkle", ms: 1400, low: 0.6 } },
      { name: "floor", svg: floor },
      { name: "water under the glass", svg: water, keys: showFrom(0.74, 0.82) },
      { name: "ripples under the glass", svg: ripples, keys: showFrom(0.74, 0.82), loop: { move: "slide", ms: 5200 } },
      { name: "the glass", svg: glass, keys: showFrom(0.76, 0.84) },
      { name: "her throne, here", svg: gold, keys: showWhile(0.245, 0.26, 0.6, 0.66) },
      { name: "her throne, changed", svg: changed, keys: showFrom(0.6, 0.66) },
      { name: "in the blink of an eye", svg: flash, keys: showWhile(0.24, 0.25, 0.28, 0.36) },
      { name: "the favor of his Lord", svg: glow(62, 72, 30, "#FFE9A8", 0.07), keys: showFrom(0.4, 0.48), loop: { move: "twinkle", ms: 2200, low: 0.6 } }
    ],
    words: [
      { text: "Her throne, far away", from: 0.02, to: 0.22 },
      { text: "Before your glance returns", from: 0.24, to: 0.38 },
      { text: "From the favor of my Lord", from: 0.4, to: 0.56 },
      { text: "Her throne, disguised", from: 0.58, to: 0.72 },
      { text: "A palace paved with glass", from: 0.74, to: 1 }
    ]
  };
}

// The mihrab: Maryam's prayer room; each time Zakariyya came in to her, he found provision with her, and she said: it
// is from Allah (Quran 3:37); there, Zakariyya called on his Lord (3:38). Neither of them is drawn: the door opens by
// itself, and the fruit is there.
function mihrab(): SignArt {
  const room =
    `<rect width="160" height="120" fill="#EBDDC1"/><rect y="96" width="160" height="24" fill="#CDB48A"/><path d="M0 96 L160 96" stroke="#B89B6E" stroke-width="1"/>` +
    `<path d="M0 104 L160 104 M0 113 L160 113" stroke="#C2A87C" stroke-width="0.5"/>` +
    `<path d="M120 60 L120 46 A8 8 0 0 1 136 46 L136 60 Z" fill="#FFF4D6"/><path d="M128 38 L128 60 M120 50 L136 50" stroke="#C9AE80" stroke-width="0.8"/><path d="M120 60 L120 46 A8 8 0 0 1 136 46 L136 60 Z" stroke="#B89B6E" stroke-width="1.2" fill="none"/>`;
  const niche =
    `<path d="M57 96 L57 60 A23 23 0 0 1 103 60 L103 96 Z" fill="#D9C39E"/><path d="M57 96 L57 60 A23 23 0 0 1 103 60 L103 96" stroke="#B89B6E" stroke-width="1.2" fill="none"/>` +
    `<path d="M64 96 L64 62 A16 16 0 0 1 96 62 L96 96 Z" fill="#C7AC82"/><path d="M64 96 L64 62 A16 16 0 0 1 96 62" stroke="#AD8F62" stroke-width="0.8" fill="none"/>` +
    `<path d="M60.5 96 L60.5 61 A19.5 19.5 0 0 1 99.5 61 L99.5 96" stroke="#E8D7B4" stroke-width="0.8" stroke-dasharray="1.6 2.2" fill="none"/>`;
  const doorway = `<rect x="12" y="56" width="22" height="40" fill="#FFF3CF"/><rect x="10" y="54" width="26" height="2.4" fill="#A47B4C"/><rect x="10" y="54" width="2" height="42" fill="#A47B4C"/><rect x="34" y="54" width="2" height="42" fill="#A47B4C"/>`;
  const door = `<rect x="12" y="56" width="22" height="40" fill="#8A5A33"/><path d="M19.3 57 L19.3 95 M26.6 57 L26.6 95" stroke="#6E4524" stroke-width="0.8"/><circle cx="30.6" cy="77" r="1.1" fill="#D9B45A"/>`;
  const light = `<path d="M12 96 L34 96 L58 116 L4 116 Z" fill="#FFF3C8" opacity="0.6"/>`;
  const fruit =
    `<path d="M68 93 C68 98.6 92 98.6 92 93 Z" fill="#B5793E"/><ellipse cx="80" cy="93" rx="12" ry="1.6" fill="#C98E52"/>` +
    [
      [72.4, 88.6],
      [74.6, 88.6],
      [73.5, 90.4],
      [71.4, 90.4],
      [75.6, 90.4],
      [72.4, 92],
      [74.6, 92],
      [73.5, 86.8]
    ]
      .map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.2" fill="#6B3F8C"/>`)
      .join("") +
    `<path d="M73.5 86 L74.4 84.2" stroke="#5B8C3A" stroke-width="0.6"/>` +
    `<circle cx="81" cy="89.6" r="3.4" fill="#C8323A"/><path d="M80 86.6 L80.4 85.4 L81 86.4 L81.6 85.4 L82 86.6" stroke="#9E2229" stroke-width="0.6" fill="none"/><circle cx="80" cy="88.6" r="0.8" fill="#E8656B"/>` +
    `<path d="M86.6 92 C84.4 90.6 85 87.6 87 87.4 C89 87.6 89.6 90.6 87.4 92 Z" fill="#7A4A6E"/><path d="M89.6 92.2 C88 91 88.4 88.6 90 88.4 C91.6 88.6 92 91 90.4 92.2 Z" fill="#8C5A7E"/>` +
    `<ellipse cx="77" cy="91.6" rx="2" ry="1.4" fill="#E7B63E"/>`;
  const motes = (dx: number) =>
    [
      [74, 82],
      [82, 76],
      [88, 84],
      [78, 70],
      [86, 66]
    ]
      .map(([x, y]) => `<circle cx="${x + dx}" cy="${y}" r="0.9" fill="#FFF6D6"/>`)
      .join("");
  return {
    kind: "mihrab",
    ms: 11000,
    parts: [
      { name: "the room", svg: room },
      { name: "the mihrab", svg: niche },
      { name: "doorway", svg: doorway, keys: showFrom(0.2, 0.22) },
      { name: "the door", svg: door, origin: { x: 12, y: 76 }, keys: { at: [0, 0.22, 0.3], scaleX: [1, 1, 0.16] } },
      { name: "light coming in", svg: light, keys: showFrom(0.24, 0.32) },
      { name: "provision with her", svg: fruit, origin: { x: 80, y: 93 }, keys: { at: [0, 0.4, 0.46], opacity: [0, 0, 1], scale: [0.6, 0.6, 1] } },
      { name: "from Allah", svg: glow(80, 72, 28, "#FFF2C6", 0.08), keys: showFrom(0.6, 0.68), loop: { move: "twinkle", ms: 2400, low: 0.6 } },
      { name: "calling on his Lord", svg: motes(0), keys: showFrom(0.8, 0.84), loop: { move: "drip", ms: 2600, distance: -26 } },
      { name: "calling on his Lord, more", svg: motes(-3), keys: showFrom(0.82, 0.86), loop: { move: "drip", ms: 2600, distance: -26, phase: 0.5 } }
    ],
    words: [
      { text: "In the mihrab", from: 0.02, to: 0.18 },
      { text: "Each time he came in", from: 0.2, to: 0.38 },
      { text: "He found provision with her", from: 0.4, to: 0.58 },
      { text: "It is from Allah", from: 0.6, to: 0.78 },
      { text: "There, Zakariyya called on his Lord", from: 0.8, to: 1 }
    ]
  };
}

/** A cool, calm flame `h` high, its foot's middle at (x, y): pale blue outside, then white. */
function coolFlame(x: number, y: number, h: number) {
  const tongue = (k: number, fill: string) => {
    const w = h * 0.3 * k;
    const top = y - h * k;
    return `<path d="M${n(x - w)} ${y} C${n(x - w * 1.2)} ${n(y - h * 0.36 * k)} ${n(x - w * 0.2)} ${n(y - h * 0.62 * k)} ${x} ${n(top)} C${n(x + w * 0.3)} ${n(y - h * 0.58 * k)} ${n(x + w * 1.2)} ${n(y - h * 0.4 * k)} ${n(x + w)} ${y} Z" fill="${fill}"/>`;
  };
  return tongue(1, "#A9D8F5") + tongue(0.72, "#D4EEFD") + tongue(0.44, "#FFFFFF");
}

// The fire made cool: they built a great fire to throw Ibrahim into (Quran 21:68, 37:97); Allah said: O fire, be
// coolness and safety for Ibrahim (21:69). He is not drawn, nor they: only the fire, blazing, then cool and calm.
function coolFire(): SignArt {
  const dusk = `<rect width="160" height="120" fill="#2D2340"/><rect y="40" width="160" height="56" fill="#3A2C4E"/>` + stars([[12, 14], [34, 30], [130, 12], [150, 30], [118, 40], [22, 46]]);
  const ground = `<rect y="96" width="160" height="24" fill="#4C3D3A"/><path d="M0 96 L160 96" stroke="#5E4C46" stroke-width="1"/>`;
  const wall = `<path d="M46 84 L52 78 L108 78 L114 84 Z" fill="#5A4C42"/>`;
  let joints = "";
  for (let x = 44; x < 118; x += 8) joints += `M${x} 84 L${x} 92 M${x + 4} 92 L${x + 4} 100 `;
  const front = `<path d="M40 100 L40 84 L120 84 L120 100 Z" fill="#7A6A5C"/><path d="${joints}M40 92 L120 92" stroke="#5F5045" stroke-width="0.7" fill="none"/>`;
  const hot = flame(58, 84, 26) + flame(72, 84, 36) + flame(88, 84, 40) + flame(102, 84, 28);
  const sparks = [[60, 54], [76, 44], [92, 40], [104, 52], [84, 50]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="0.9" fill="#FFB347"/>`).join("");
  const cool = coolFlame(60, 84, 16) + coolFlame(72, 84, 22) + coolFlame(88, 84, 24) + coolFlame(100, 84, 17);
  return {
    kind: "cool-fire",
    ms: 10000,
    parts: [
      { name: "dusk", svg: dusk },
      { name: "calm sky", svg: `<rect width="160" height="96" fill="#4C6E9C"/>`, keys: { at: [0, 0.4, 0.56], opacity: [0, 0, 0.5] } },
      { name: "ground", svg: ground },
      { name: "heat of the fire", svg: glow(80, 66, 56, "#FF7B2E", 0.07), keys: hideFrom(0.34, 0.46), loop: { move: "twinkle", ms: 700, low: 0.7 } },
      { name: "coolness", svg: glow(80, 70, 50, "#BFE4FF", 0.07), keys: showFrom(0.38, 0.52), loop: { move: "twinkle", ms: 2600, low: 0.75 } },
      { name: "back of the walls", svg: wall },
      { name: "the blazing fire", svg: hot, keys: hideFrom(0.34, 0.46), loop: { move: "bob", ms: 420, y: 0.8 } },
      { name: "sparks", svg: sparks, keys: hideFrom(0.32, 0.4), loop: { move: "drip", ms: 1100, distance: -14 } },
      { name: "the fire made cool", svg: cool, origin: { x: 80, y: 84 }, keys: showFrom(0.36, 0.5), loop: { move: "sway", ms: 2800, angle: 1.6 } },
      { name: "walls around the fire", svg: front },
      { name: "safety", svg: glow(80, 74, 30, "#FFFFFF", 0.06), keys: showFrom(0.66, 0.74), loop: { move: "twinkle", ms: 2600, low: 0.5 } }
    ],
    words: [
      { text: "A great blazing fire", from: 0.02, to: 0.3 },
      { text: "O fire, be coolness", from: 0.32, to: 0.62 },
      { text: "And safety for Ibrahim", from: 0.64, to: 1 }
    ]
  };
}

export const FAVOR_ART = { dawud, house, zamzam, throne, mihrab, "cool-fire": coolFire };
