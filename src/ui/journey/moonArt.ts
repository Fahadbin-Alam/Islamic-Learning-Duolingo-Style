import { MONTHS, MOON_WORDS, type MoonKind, type MoonScene } from "../../data/moonSky";
import { SKY_HOURS, SKY_WORDS } from "../../data/daySky";
import { WORD_HEIGHT, skyFrame, sunAt, wordWidth, type SkyFrame } from "./skyArt";

/**
 * The moon's skies (MoonSky.tsx), without React: the moon's shape on any night of the month, the mountain of Hira,
 * where the moon, the star and the sun are as a sky plays, the months' grid, and where every word sits, so the tests
 * can check that the words stay in the sky and clear of each other.
 *
 * A sky plays a clock `t` from 0 to 1. Skies that go through the hours (the new moon after sunset, what Ibrahim saw
 * set, the sun and the moon in their orbits) turn it into hours of the day's sky (skyArt.ts), so their colours, the
 * sun and the stars are the day's; the others stand at night.
 */

export type Rect = { x: number; y: number; w: number; h: number };
export type MoonWordBox = Rect & { anchor: "left" | "right" | "center" };
export type MoonWord = { key: string; text: string; rect: MoonWordBox; from: number; to: number };

const clamp = (value: number, low: number, high: number) => Math.min(high, Math.max(low, value));

/** A month by the moon, in days. */
export const MONTH_DAYS = 29.53;

/** How much of the moon is lit at `age` days: 0 at the new moon, 1 when it is full. */
export const litShare = (age: number) => (1 - Math.cos((2 * Math.PI * age) / MONTH_DAYS)) / 2;

/**
 * The lit part of a moon of radius `r` with its middle at (cx, cy), at `age` days: lit on the right while it grows
 * (the sun is to its west, on the right), on the left while it wanes. The edge of the light is half an ellipse,
 * as wide as the moon at the new moon and when full, and a straight line at the quarters.
 */
export function moonLitPath(cx: number, cy: number, r: number, age: number) {
  const phase = (((age % MONTH_DAYS) + MONTH_DAYS) % MONTH_DAYS) / MONTH_DAYS;
  const growing = phase <= 0.5;
  // How far the edge of the light bulges right of the middle (left, when below 0).
  const bulge = (growing ? 1 : -1) * r * Math.cos(2 * Math.PI * phase);
  const f = (n: number) => n.toFixed(2);
  return `M${f(cx)} ${f(cy - r)}A${f(r)} ${f(r)} 0 0 ${growing ? 1 : 0} ${f(cx)} ${f(cy + r)}A${f(Math.max(0.01, Math.abs(bulge)))} ${f(r)} 0 0 ${bulge > 0 ? 0 : 1} ${f(cx)} ${f(cy - r)}Z`;
}

const MOON_LIGHT = "#FFF0B0";
const MOON_SHADE = "#2B3463";
/** The darker plains on the full moon: where they sit, as shares of its radius. */
const PLAINS: readonly [number, number, number][] = [
  [-0.32, -0.18, 0.24],
  [0.22, -0.3, 0.16],
  [0.28, 0.22, 0.2],
  [-0.12, 0.42, 0.13]
];

/** A soft glow round the moon: four rings, each wider and fainter where it stands alone, so it has no hard edge. */
const glowRings = (c: number, from: number, to: number, opacity: number) =>
  [1, 2, 3, 4].map((ring) => `<circle cx="${c}" cy="${c}" r="${(from + ((to - from) * ring) / 4).toFixed(2)}" fill="#FFF3B8" opacity="${(opacity / 4).toFixed(3)}"/>`).join("");

/**
 * The moon at `age` days, in a square `size` wide: its unlit part faint (`shade`, 0 to hide it, as in the light after
 * sunset), its lit part, the plains when it is nearly full, and a soft glow as it fills. `tilt` turns it, in degrees.
 */
export function moonSvg(size: number, age: number, { shade = 0.55, tilt = 0 }: { shade?: number; tilt?: number } = {}) {
  const c = size / 2;
  const r = size * 0.34;
  const lit = litShare(age);
  const glow = lit > 0.4 ? glowRings(c, r, size * 0.49, 0.06 + 0.16 * lit) : "";
  const plains = lit > 0.97 ? PLAINS.map(([x, y, s]) => `<circle cx="${(c + x * r).toFixed(2)}" cy="${(c + y * r).toFixed(2)}" r="${(s * r).toFixed(2)}" fill="#E8D48E" opacity="0.6"/>`).join("") : "";
  const dark = shade > 0 ? `<circle cx="${c}" cy="${c}" r="${r.toFixed(2)}" fill="${MOON_SHADE}" opacity="${shade}"/>` : "";
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">${glow}<g transform="rotate(${tilt} ${c} ${c})">${dark}<path d="${moonLitPath(c, c, r, age)}" fill="${MOON_LIGHT}"/>${plains}</g></svg>`;
}

/** One half of the full moon, as it split: the left half, its cut edge on the right, or the right half. */
export function halfMoonSvg(size: number, side: "left" | "right") {
  const c = size / 2;
  const r = size * 0.34;
  const f = (n: number) => n.toFixed(2);
  const d = side === "left" ? `M${f(c)} ${f(c - r)}A${f(r)} ${f(r)} 0 0 0 ${f(c)} ${f(c + r)}Z` : `M${f(c)} ${f(c - r)}A${f(r)} ${f(r)} 0 0 1 ${f(c)} ${f(c + r)}Z`;
  const plains = PLAINS.filter(([x, , s]) => (side === "left" ? x + s < -0.02 : x - s > 0.02))
    .map(([x, y, s]) => `<circle cx="${f(c + x * r)}" cy="${f(c + y * r)}" r="${f(s * r)}" fill="#E8D48E" opacity="0.6"/>`)
    .join("");
  // The cut edge glows a little.
  const edge = `<path d="M${f(c)} ${f(c - r)}V${f(c + r)}" stroke="#FFFBE0" stroke-width="1.4" opacity="0.8"/>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}"><path d="${d}" fill="${MOON_LIGHT}"/>${plains}${edge}</svg>`;
}

// The skies' clocks: each kind plays this long, and the ones that go through the day's hours turn `t` into hours.

export const MOON_DURATION: Record<MoonKind, number> = { split: 5200, newMoon: 5200, stages: 7600, ibrahim: 10500, courses: 9000, months: 6000 };

/**
 * The hours a sky plays through, as [t, hour] points (after midnight the hours go on past 24): the new moon from just
 * before sunset into the night; Ibrahim's night, the star setting, the moon rising and setting, then the day from dawn
 * to sunset; the sun and the moon in their orbits from sunrise round to the next sunrise. The rest stand at night.
 */
export const MOON_HOURS: Record<MoonKind, readonly [number, number][]> = {
  split: [
    [0, 22],
    [1, 22]
  ],
  stages: [
    [0, 22],
    [1, 22]
  ],
  months: [
    [0, 22],
    [1, 22]
  ],
  newMoon: [
    [0, 17.7],
    [1, 19.1]
  ],
  ibrahim: [
    [0, 19.6],
    [0.3, 22],
    [0.58, 28.4],
    [0.66, 30.1],
    [0.94, 41.9],
    [1, 42.6]
  ],
  courses: [
    [0, 5.9],
    [0.47, 18.2],
    [0.53, 18.9],
    [1, 30.2]
  ]
};

/** The hour a sky stands at, `t` of the way through it. */
export function moonHour(kind: MoonKind, t: number) {
  const points = MOON_HOURS[kind];
  for (let index = 1; index < points.length; index += 1) {
    const [a, ha] = points[index - 1];
    const [b, hb] = points[index];
    if (t <= b) return ha + ((hb - ha) * (clamp(t, a, b) - a)) / (b - a || 1);
  }
  return points[points.length - 1][1];
}

/** When in a sky's clock it reaches `hour` (the first time; the skies' hours only go forward). */
export function moonClockAt(kind: MoonKind, hour: number) {
  const points = MOON_HOURS[kind];
  for (let index = 1; index < points.length; index += 1) {
    const [a, ha] = points[index - 1];
    const [b, hb] = points[index];
    if (hour <= hb) return hb === ha ? a : a + ((b - a) * (Math.max(hour, ha) - ha)) / (hb - ha);
  }
  return 1;
}

/** Samples of `fn` over a sky's clock, for an interpolate config. */
export function overT(fn: (t: number) => number, count = 72) {
  const inputRange: number[] = [];
  const outputRange: number[] = [];
  for (let index = 0; index <= count; index += 1) {
    const t = index / count;
    inputRange.push(Number(t.toFixed(4)));
    outputRange.push(Number(fn(t).toFixed(4)));
  }
  return { inputRange, outputRange, extrapolate: "clamp" as const };
}

/** A value that is 0 before `a`, rises to 1 by `b`, holds, and falls back to 0 from `c` to `d` (no fall without c). */
export function shownBetween(t: number, a: number, b: number, c = 2, d = 3) {
  if (t <= a || t >= d) return 0;
  if (t < b) return (t - a) / (b - a);
  if (t <= c) return 1;
  return 1 - (t - c) / (d - c);
}

// The moon's stages: the nights it shows, as days of its age, and when in the sky's clock each is at its fullest.

/** The nights the stages show (as the moon's age in days): the new moon, growing, full, waning, the old date stalk. */
export const STAGE_AGES: readonly number[] = [2.6, 4.5, 6.5, 8.5, 10.5, 12.5, 14.4, 16.4, 18.6, 20.8, 22.9, 24.8, 26.7];
/** Where in the sky's clock each stage is at its clearest: the full moon holds for a while, and so does the stalk. */
export const STAGE_AT: readonly number[] = [0.06, 0.13, 0.19, 0.25, 0.31, 0.38, 0.5, 0.61, 0.67, 0.73, 0.79, 0.85, 0.94];

/** How much stage `index` shows at `t`: one fades into the next. */
export function stageShown(index: number, t: number) {
  const at = STAGE_AT[index];
  const before = index > 0 ? STAGE_AT[index - 1] : -1;
  const after = index < STAGE_AT.length - 1 ? STAGE_AT[index + 1] : 2;
  if (t <= at) return index === 0 ? 1 : clamp((t - before) / (at - before), 0, 1);
  return index === STAGE_AT.length - 1 ? 1 : clamp(1 - (t - at) / (after - at), 0, 1);
}

/** The moon of the stages: in the middle of the sky. */
export function stagesMoonAt(frame: SkyFrame) {
  const size = Math.round(clamp(frame.height * 0.36, 52, 96));
  return { x: Math.round(frame.cx), y: Math.round(frame.horizon * 0.44), size };
}

// The new moon after sunset: low in the west, over where the sun went down, its lit side turned to the sun.

export function newMoonAt(frame: SkyFrame, hour: number) {
  const size = Math.round(clamp(frame.height * 0.2, 30, 54));
  const sink = clamp((hour - 18.3) / 0.8, 0, 1);
  return { x: Math.round(frame.width * 0.76), y: Math.round(frame.horizon - frame.ry * (0.42 - 0.14 * sink)), size, tilt: 52 };
}

/** How much the new moon shows: once the sky after sunset has darkened enough to see it. */
export const newMoonShown = (hour: number) => clamp((hour - 18.3) / 0.35, 0, 1);

// The moon split: the full moon over the mountain of Hira, then its two halves, with Hira between them.

/** Hira's top, and the foot of the mountain on each side. */
export function hiraAt(frame: SkyFrame) {
  const top = { x: Math.round(frame.cx + frame.width * 0.01), y: Math.round(frame.horizon * 0.52) };
  return { top, left: Math.round(frame.width * 0.24), right: Math.round(frame.width * 0.78) };
}

/** The mountains around Makkah at night: a far range, and Hira, high and steep, in front of it. */
export function mountainsSvg(frame: SkyFrame) {
  const { width: w, height: h, horizon: y } = frame;
  const hira = hiraAt(frame);
  const f = (n: number) => n.toFixed(1);
  const far = `M-4 ${f(y)} L${f(w * 0.08)} ${f(y - frame.ry * 0.22)} L${f(w * 0.17)} ${f(y - frame.ry * 0.12)} L${f(w * 0.3)} ${f(y - frame.ry * 0.3)} L${f(w * 0.44)} ${f(y - frame.ry * 0.16)} L${f(w * 0.6)} ${f(y - frame.ry * 0.28)} L${f(w * 0.74)} ${f(y - frame.ry * 0.14)} L${f(w * 0.88)} ${f(y - frame.ry * 0.26)} L${f(w + 4)} ${f(y - frame.ry * 0.1)} L${f(w + 4)} ${f(h)} L-4 ${f(h)}Z`;
  const peak = `M${f(hira.left)} ${f(y + 2)} L${f(hira.top.x - w * 0.12)} ${f(y - (y - hira.top.y) * 0.5)} L${f(hira.top.x - w * 0.045)} ${f(hira.top.y + 6)} L${f(hira.top.x)} ${f(hira.top.y)} L${f(hira.top.x + w * 0.05)} ${f(hira.top.y + 9)} L${f(hira.top.x + w * 0.13)} ${f(y - (y - hira.top.y) * 0.42)} L${f(hira.right)} ${f(y + 2)}Z`;
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">` +
    `<path d="${far}" fill="#1B2350"/>` +
    `<path d="${peak}" fill="#10163A"/>` +
    `<rect x="0" y="${f(y + 1)}" width="${w}" height="${f(h - y)}" fill="#151B3F"/>` +
    `</svg>`
  );
}

/** The full moon over Hira, then where its halves go: one to each side, with Hira's top between them. */
export function splitAt(frame: SkyFrame) {
  const size = Math.round(clamp(frame.height * 0.36, 52, 100));
  const whole = { x: Math.round(frame.cx), y: Math.round(frame.horizon * 0.33) };
  const apart = Math.round(Math.max(size * 0.62, frame.width * 0.19));
  return { size, whole, left: { x: whole.x - apart, y: whole.y + Math.round(size * 0.06) }, right: { x: whole.x + apart, y: whole.y - Math.round(size * 0.04) } };
}

// What Ibrahim saw set: a star in the west, then the moon from east to west, then the sun from east to west.

/** The star: high in the western sky at nightfall, going down until it sets at the end of its part of the night. */
export function ibrahimStarAt(frame: SkyFrame, t: number) {
  const p = clamp((t - 0.04) / 0.24, 0, 1);
  return { x: frame.width * (0.66 + 0.2 * p), y: frame.horizon * 0.3 + (frame.horizon * 0.72 + 6) * p, size: Math.round(clamp(frame.height * 0.13, 18, 30)) };
}

/** A moon going across the night sky, from rising in the east to setting in the west, `p` from 0 to 1. */
export function nightMoonAt(frame: SkyFrame, p: number) {
  const angle = Math.PI * clamp(p, -0.1, 1.1);
  const size = Math.round(clamp(frame.height * 0.24, 36, 64));
  return { x: frame.cx - frame.rx * 0.92 * Math.cos(angle), y: frame.horizon + size * 0.1 - frame.ry * 0.86 * Math.sin(angle), size };
}

/**
 * Each in its orbit: the dots of the sun's way across the day and of the moon's across the night (inside the sun's),
 * and when in the sky's clock each is passed, so each way is drawn behind its sun or moon as it goes.
 */
export function orbitDots(frame: SkyFrame, body: "sun" | "moon", count = 18) {
  return Array.from({ length: count }, (_, index) => {
    const share = (index + 0.5) / count;
    if (body === "sun") {
      const hour = SKY_HOURS.sunrise + (SKY_HOURS.sunset - SKY_HOURS.sunrise) * share;
      return { ...sunAt(frame, hour), at: moonClockAt("courses", hour) };
    }
    const at = nightMoonAt(frame, share);
    return { x: at.x, y: at.y, at: moonClockAt("courses", 18 + 12 * share) };
  });
}

/** Where Ibrahim's moon is in its part of the night. */
export const ibrahimMoonP = (t: number) => (t - 0.31) / (0.56 - 0.31);
/** Where the moon of the orbits is in its night: it rises as the sun sets, and sets as it rises. */
export const coursesMoonP = (t: number) => (moonHour("courses", t) - 18) / 12;

// The months: twelve in four rows of three, each a small moon and its name beside it.

/** The months' cells, in the order they are read: from the left, or from the right in Urdu and Arabic (`rtl`). */
export function monthCells(frame: SkyFrame, rtl = false) {
  const padX = Math.round(clamp(frame.width * 0.02, 5, 12));
  const padY = Math.round(clamp(frame.height * 0.04, 5, 12));
  const w = (frame.width - padX * 2) / 3;
  const h = (frame.height - padY * 2) / 4;
  return MONTHS.map((month, index) => {
    const column = rtl ? 2 - (index % 3) : index % 3;
    return {
      index,
      name: month.name,
      sacred: month.sacred,
      rect: { x: Math.round(padX + column * w), y: Math.round(padY + Math.floor(index / 3) * h), w: Math.floor(w), h: Math.floor(h) }
    };
  });
}

/**
 * How a month's cell is set: drawn `inset` inside its place, its padding, the size of its moon and the gap after it,
 * and the room and size of its name beside it (12 px where there is room for it, else 11).
 */
export function monthCellLook(cell: Rect) {
  const inset = 2;
  const padX = 4;
  const gap = 4;
  const moon = Math.round(clamp(cell.h * 0.4, 12, 22));
  const text = cell.w - inset * 2 - padX * 2 - moon - gap;
  const font = text >= 70 ? 12 : 11;
  return { inset, padX, gap, moon, font, line: font + 3, text };
}

/** When month `index` lights up, as the year goes by. */
export const monthAt = (index: number) => 0.05 + index * 0.065;

/**
 * Each English letter's width, in em, in the app's font (Nunito ExtraBold) as the browser draws it. Bangla letters
 * and the Arabic letters of Urdu and Arabic, drawn in the phone's own fonts, are given a little more than the most
 * any of them takes in a long word (BANGLA_EM, ARABIC_EM), and anything else more still.
 */
const LETTER_EM: Record<string, number> = {
  a: 0.56, b: 0.61, c: 0.48, d: 0.61, e: 0.55, f: 0.38, g: 0.61, h: 0.59, i: 0.27, j: 0.27, k: 0.56, l: 0.33, m: 0.89,
  n: 0.59, o: 0.59, p: 0.61, q: 0.61, r: 0.41, s: 0.49, t: 0.4, u: 0.59, v: 0.53, w: 0.86, x: 0.56, y: 0.53, z: 0.48,
  A: 0.75, B: 0.69, C: 0.68, D: 0.77, E: 0.6, F: 0.57, G: 0.74, H: 0.78, I: 0.3, J: 0.37, K: 0.69, L: 0.57, M: 0.88,
  N: 0.75, O: 0.8, P: 0.66, Q: 0.8, R: 0.7, S: 0.64, T: 0.63, U: 0.74, V: 0.73, W: 1.12, X: 0.68, Y: 0.63, Z: 0.61,
  "'": 0.26, "\u2019": 0.26, "-": 0.44, " ": 0.28, ".": 0.26, ",": 0.26
};
const BANGLA_EM = 0.55;
const ARABIC_EM = 0.62;

/** About how wide `text` is drawn at `font` px, and a little more to be safe. */
export function textWidth(text: string, font: number) {
  let em = 0;
  for (const letter of text) {
    em += LETTER_EM[letter] ?? (/[\u0980-\u09FF]/.test(letter) ? BANGLA_EM : /[\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFF]/.test(letter) ? ARABIC_EM : 0.8);
  }
  return em * font * 1.06;
}

/**
 * Whether a name fits in two lines of `width` px at `font` px, its lines breaking where a phone breaks them: at a space,
 * or after a hyphen ("Dhul-" and "Qa'dah"), and no part of it wider than a line.
 */
export function fitsTwoLines(text: string, width: number, font: number) {
  const space = textWidth(" ", font);
  let lines = 1;
  let used = 0;
  for (const word of text.split(/\s+/).filter(Boolean)) {
    const parts = word.replace(/-/g, "-\n").split("\n").filter(Boolean);
    for (const [index, part] of parts.entries()) {
      const wide = textWidth(part, font);
      if (wide > width) return false;
      const need = used === 0 ? wide : used + (index === 0 ? space : 0) + wide;
      if (need > width) {
        lines += 1;
        used = wide;
      } else used = need;
    }
  }
  return lines <= 2;
}

// The words, and where each sits.

const pill = (text: string, x: number, y: number, anchor: MoonWordBox["anchor"]): MoonWordBox => {
  const w = wordWidth(text);
  const left = anchor === "left" ? x : anchor === "right" ? x - w : x - w / 2;
  return { x: Math.round(left), y: Math.round(y), w, h: WORD_HEIGHT, anchor };
};

/** East and west, on the sand at each side. */
function sides(frame: SkyFrame, say: (text: string) => string): MoonWord[] {
  const east = say(SKY_WORDS.east);
  const west = say(SKY_WORDS.west);
  const y = frame.horizon + 5;
  return [
    { key: "east", text: east, rect: pill(east, 6, y, "left"), from: 0, to: 1 },
    { key: "west", text: west, rect: pill(west, frame.width - 6, y, "right"), from: 0, to: 1 }
  ];
}

/**
 * Every word a moon's sky shows, where, and over which part of its clock; and the moon's (or the sun's) place at the
 * end, which no word may cover. The months' names are not here: each is in its own cell (monthCells).
 */
export function moonLayout(scene: MoonScene, width: number, height: number, say: (text: string) => string) {
  const frame = skyFrame(width, height);
  const words: MoonWord[] = [];
  const glyphs: Rect[] = [];
  const box = (x: number, y: number, size: number, share = 0.68): Rect => ({ x: x - (size * share) / 2, y: y - (size * share) / 2, w: size * share, h: size * share });
  if (scene.kind === "split") {
    const at = splitAt(frame);
    const hira = hiraAt(frame);
    const name = say(MOON_WORDS.hira);
    words.push({ key: "hira", text: name, rect: pill(name, hira.top.x, hira.top.y + (frame.horizon - hira.top.y) * 0.42, "center"), from: 0, to: 1 });
    glyphs.push(box(at.left.x, at.left.y, at.size), box(at.right.x, at.right.y, at.size));
  } else if (scene.kind === "newMoon") {
    const moon = newMoonAt(frame, moonHour("newMoon", 1));
    const name = say(MOON_WORDS.newMoon);
    words.push({ key: "newMoon", text: name, rect: pill(name, moon.x - moon.size * 0.42, moon.y - WORD_HEIGHT / 2, "right"), from: 0.55, to: 1 }, ...sides(frame, say));
    glyphs.push(box(moon.x, moon.y, moon.size));
  } else if (scene.kind === "stages") {
    const moon = stagesMoonAt(frame);
    const below = moon.y + moon.size * 0.4 + 6;
    const at = (key: keyof typeof MOON_WORDS, from: number, to: number) => {
      const text = say(MOON_WORDS[key]);
      words.push({ key, text, rect: pill(text, moon.x, below, "center"), from, to });
    };
    at("newMoon", 0, 0.16);
    at("full", 0.43, 0.57);
    at("stalk", 0.9, 1);
    glyphs.push(box(moon.x, moon.y, moon.size));
  } else if (scene.kind === "ibrahim" || scene.kind === "courses") {
    // The names sit low in the middle of the sky, where none of them passes but at its very top.
    const y = frame.horizon - WORD_HEIGHT - Math.max(10, frame.ry * 0.22);
    const at = (key: keyof typeof MOON_WORDS, from: number, to: number) => {
      const text = say(MOON_WORDS[key]);
      words.push({ key, text, rect: pill(text, frame.cx, y, "center"), from, to });
    };
    if (scene.kind === "ibrahim") {
      at("star", 0.04, 0.27);
      at("moon", 0.33, 0.55);
      at("sun", 0.68, 0.93);
    } else {
      at("sun", 0.05, 0.44);
      at("moon", 0.56, 0.95);
    }
    words.push(...sides(frame, say));
    const sun = sunAt(frame, moonHour(scene.kind, 1));
    if (scene.kind === "ibrahim") glyphs.push({ x: sun.x - frame.sunR, y: sun.y - frame.sunR, w: frame.sunR * 2, h: Math.max(0, Math.min(frame.sunR * 2, frame.horizon - (sun.y - frame.sunR))) });
  }
  return { frame, words, glyphs };
}
