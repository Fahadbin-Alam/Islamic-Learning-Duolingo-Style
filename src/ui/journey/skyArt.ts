import { SKY_HOURS, SKY_WORDS, type DayMoment, type SkyScene } from "../../data/daySky";
import type { Rect } from "./JourneyMap";

/**
 * The drawing of the day's sky (src/ui/journey/DaySky.tsx): where the sun is at each hour, the sky's colours through
 * the day, the sand, the far hills and a date palm, and where the prayers' names and the sky's other words sit. All
 * of it is worked out here from the frame's size, so the tests can check that no word covers another on any phone.
 */

export type SkyFrame = {
  width: number;
  height: number;
  /** The line where the sky meets the sand. */
  horizon: number;
  /** The sun's arc: its middle, how wide and how high it goes. */
  cx: number;
  rx: number;
  ry: number;
  sunR: number;
  moon: { x: number; y: number; r: number };
};

const clamp = (value: number, low: number, high: number) => Math.min(high, Math.max(low, value));

export function skyFrame(width: number, height: number): SkyFrame {
  const horizon = Math.round(height * 0.7);
  const top = Math.max(18, Math.round(height * 0.13));
  return {
    width,
    height,
    horizon,
    cx: width / 2,
    rx: width * 0.4,
    ry: horizon - top,
    sunR: Math.round(clamp(height * 0.072, 10, 16)),
    moon: { x: Math.round(width * 0.2), y: Math.round(height * 0.2), r: Math.round(clamp(height * 0.05, 8, 13)) }
  };
}

/** The hour of the day (0 to 24) for an hour of the sky's day, which runs on past midnight. */
export const dayHour = (hour: number) => ((hour % 24) + 24) % 24;

/**
 * Where the sun's middle is at `hour`: on its arc from the east (left) at sunrise to the west (right) at sunset, and
 * under the sand before and after. At night it waits under the ground on the side it went down, or will come up.
 */
export function sunAt(frame: SkyFrame, hour: number) {
  const h = clamp(dayHour(hour), 4.2, 19.8);
  const angle = (Math.PI * (h - SKY_HOURS.sunrise)) / (SKY_HOURS.sunset - SKY_HOURS.sunrise);
  return { x: frame.cx - frame.rx * Math.cos(angle), y: frame.horizon - frame.ry * Math.sin(angle) };
}

/** How high the sun stands, in degrees (it is never right overhead at Madinah near the equinox). */
export function sunHeight(hour: number) {
  const h = dayHour(hour);
  if (h <= SKY_HOURS.sunrise || h >= SKY_HOURS.sunset) return 0;
  return 66 * Math.sin((Math.PI * (h - SKY_HOURS.sunrise)) / (SKY_HOURS.sunset - SKY_HOURS.sunrise));
}

/**
 * The sky's colours through the day, at the top and down at the horizon: the night, the first light of dawn, its pink,
 * sunrise, the blue of the day, the warm afternoon, sunset's red, the afterglow, and the night again once twilight goes.
 */
export const SKY_KEYS: readonly { hour: number; top: string; low: string }[] = [
  { hour: 0, top: "#0A1233", low: "#18224F" },
  { hour: 4, top: "#0A1233", low: "#18224F" },
  { hour: 4.75, top: "#0E1944", low: "#2C3B7A" },
  { hour: 5.4, top: "#1C2A63", low: "#8E80B8" },
  { hour: 5.85, top: "#3B5AA6", low: "#F0A78A" },
  { hour: 6.25, top: "#5C8ED6", low: "#FFD29A" },
  { hour: 7.5, top: "#4A9AE8", low: "#BFE2F8" },
  { hour: 12, top: "#2E8DE6", low: "#CDEBFC" },
  { hour: 15.5, top: "#4396E0", low: "#EEDFB2" },
  { hour: 17.3, top: "#5A7FC6", low: "#FFC07A" },
  { hour: 18, top: "#454F8F", low: "#FF8A55" },
  { hour: 18.5, top: "#2A2E68", low: "#B9577A" },
  { hour: 19.25, top: "#121A44", low: "#2A3367" },
  { hour: 20.5, top: "#0B1438", low: "#1A2554" }
];

/** The sky's colours for the hours a scene plays, on its own day (after midnight they come round again). */
export function skyKeysFor(from: number, to: number) {
  const keys: { hour: number; top: string; low: string }[] = [];
  for (const day of [0, 24]) for (const key of SKY_KEYS) keys.push({ ...key, hour: key.hour + day });
  keys.push({ ...SKY_KEYS[1], hour: 48 });
  // The key at or before the start, then every key up to the first at or after the end.
  const first = Math.max(0, keys.findIndex((key) => key.hour > from) - 1);
  const afterEnd = keys.findIndex((key) => key.hour >= to);
  return keys.slice(first, (afterEnd < 0 ? keys.length - 1 : afterEnd) + 1);
}

/**
 * How dark it is, from 0 (the day) to 1 (the night), for the sand, the hills and the palm, and for the stars: the
 * hours where it changes, and the darkness at each.
 */
export const DARK_KEYS: readonly [number, number][] = [
  [0, 1],
  [4.75, 1],
  [5.5, 0.72],
  [6.1, 0.25],
  [7, 0],
  [17.4, 0],
  [18.1, 0.3],
  [18.7, 0.65],
  [19.3, 1],
  [24, 1]
];

/** How much the stars and the moon show (1 at night, gone once the day is light), and the sun (over the sand by day). */
export const STAR_KEYS: readonly [number, number][] = [
  [0, 1],
  [4.6, 1],
  [5.5, 0],
  [18.6, 0],
  [19.5, 1],
  [24, 1]
];
export const SUN_KEYS: readonly [number, number][] = [
  [0, 0],
  [5.3, 0],
  [5.85, 1],
  [18.15, 1],
  [18.7, 0],
  [24, 0]
];

/** A value from keys like DARK_KEYS at `hour`. */
export function keyed(keys: readonly [number, number][], hour: number) {
  const h = dayHour(hour);
  for (let index = 1; index < keys.length; index += 1) {
    const [a, va] = keys[index - 1];
    const [b, vb] = keys[index];
    if (h <= b) return va + ((vb - va) * (h - a)) / (b - a || 1);
  }
  return keys[keys.length - 1][1];
}

/** Samples of `fn` over a scene's hours, for an interpolate config (enough to make the steps between them too short to see). */
export function overHours(from: number, to: number, fn: (hour: number) => number) {
  const count = Math.max(8, Math.ceil((to - from) * 6));
  const inputRange: number[] = [];
  const outputRange: number[] = [];
  for (let index = 0; index <= count; index += 1) {
    const hour = from + ((to - from) * index) / count;
    inputRange.push(Number(hour.toFixed(4)));
    outputRange.push(Number(fn(hour).toFixed(4)));
  }
  return { inputRange, outputRange, extrapolate: "clamp" as const };
}

// The pictures. Every gradient is named for its own sky, so two skies on one web page keep their own colours.

export const skyLayerSvg = (frame: SkyFrame, top: string, low: string, id: string) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${frame.width}" height="${frame.height}" viewBox="0 0 ${frame.width} ${frame.height}"><defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${top}"/><stop offset="${(frame.horizon / frame.height).toFixed(3)}" stop-color="${low}"/><stop offset="1" stop-color="${low}"/></linearGradient></defs><rect width="${frame.width}" height="${frame.height}" fill="url(#${id})"/></svg>`;

export const sunSvg = (size: number, id: string) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 100 100"><defs><radialGradient id="${id}" cx="50%" cy="50%" r="50%"><stop offset="0.3" stop-color="#FFF6C9" stop-opacity="0.95"/><stop offset="0.5" stop-color="#FFE27A" stop-opacity="0.42"/><stop offset="1" stop-color="#FFD25A" stop-opacity="0"/></radialGradient></defs><circle cx="50" cy="50" r="50" fill="url(#${id})"/><circle cx="50" cy="50" r="19" fill="#FFF3B8"/><circle cx="50" cy="50" r="15.5" fill="#FFE070"/></svg>`;

/** The sun low in the sky: deep orange (it shows over the bright sun near the horizon). */
export const LOW_SUN = `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"><circle cx="20" cy="20" r="7.6" fill="#FFB052"/><circle cx="20" cy="20" r="6.2" fill="#FF8A3D"/></svg>`;

export const MOON = `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"><circle cx="20" cy="20" r="19" fill="#FFF3B8" opacity="0.14"/><path d="M24.5 6.5A14 14 0 1 0 33.5 26 11 11 0 0 1 24.5 6.5Z" fill="#FFF0B0"/></svg>`;

export const STAR = `<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10"><path d="M5 0.6l1 3.4 3.4 1-3.4 1L5 9.4l-1-3.4L0.6 5l3.4-1Z" fill="#FFFFFF"/></svg>`;

/** A small dune in a seeded spot: the same sky draws the same sand. */
function seeded(seed: string) {
  let value = 7;
  for (const char of seed) value = (value * 31 + char.charCodeAt(0)) % 9973;
  return (index: number) => {
    const x = Math.sin(value * 12.9898 + index * 78.233) * 43758.5453;
    return x - Math.floor(x);
  };
}

/** The far hills on the horizon: two low ranges, one on each side, with a gap where the sun is at its height. */
export function hillPaths(frame: SkyFrame) {
  const { width: w, horizon: y } = frame;
  const tall = Math.max(8, Math.round(frame.height * 0.07));
  const left = `M${-4} ${y} Q${w * 0.06} ${y - tall * 0.7} ${w * 0.13} ${y - tall * 0.95} Q${w * 0.19} ${y - tall * 1.1} ${w * 0.24} ${y - tall * 0.55} Q${w * 0.29} ${y - tall * 0.15} ${w * 0.34} ${y}Z`;
  const right = `M${w * 0.6} ${y} Q${w * 0.66} ${y - tall * 0.75} ${w * 0.72} ${y - tall * 0.9} Q${w * 0.8} ${y - tall * 1.05} ${w * 0.86} ${y - tall * 0.6} Q${w * 0.93} ${y - tall * 0.25} ${w + 4} ${y - tall * 0.15} L${w + 4} ${y}Z`;
  return { left, right, tall };
}

/** The sand, and the far hills on it. */
export function groundSvg(frame: SkyFrame, seed: string, id: string) {
  const { width: w, height: h, horizon: y } = frame;
  const rand = seeded(seed);
  const { left, right } = hillPaths(frame);
  const dunes = [0, 1, 2]
    .map((index) => {
      const x = w * (0.1 + 0.32 * index + rand(index) * 0.12);
      const top = y + (h - y) * (0.34 + rand(index + 5) * 0.3);
      return `<path d="M${x - w * 0.22} ${h + 2} Q${x} ${top} ${x + w * 0.24} ${h + 2}Z" fill="#E3B877" opacity="0.55"/>`;
    })
    .join("");
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">` +
    `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#E9C88E"/><stop offset="1" stop-color="#D9AE6B"/></linearGradient></defs>` +
    `<path d="${left}" fill="#C49460"/><path d="${right}" fill="#BD8C58"/>` +
    `<rect x="0" y="${y}" width="${w}" height="${h - y}" fill="url(#${id})"/>` +
    `<path d="M0 ${y + 0.5}H${w}" stroke="#F4DDB0" stroke-width="1"/>` +
    dunes +
    `</svg>`
  );
}

/**
 * The hills' shade, on the side away from the sun: their west slopes in the morning, their east slopes in the
 * afternoon, when the shadows of the hillocks show (Sahih al-Bukhari 539). It deepens away from each range's top.
 */
export function hillShadowSvg(frame: SkyFrame, side: "east" | "west", id: string) {
  const { width: w, height: h } = frame;
  const { left, right } = hillPaths(frame);
  // Each range's top is near the middle of its width, so one fade serves both.
  const stops = side === "east" ? `<stop offset="0" stop-opacity="1"/><stop offset="0.5" stop-opacity="0"/>` : `<stop offset="0.5" stop-opacity="0"/><stop offset="1" stop-opacity="1"/>`;
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">` +
    `<defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="0">${stops.replace(/<stop /g, '<stop stop-color="#4A2E16" ')}</linearGradient></defs>` +
    `<path d="${left}" fill="url(#${id})"/><path d="${right}" fill="url(#${id})"/>` +
    `</svg>`
  );
}

/**
 * The first light of dawn: a white glow along the horizon in the east, low under the dark (the true dawn spreads
 * along the horizon).
 */
export function dawnBandSvg(frame: SkyFrame, id: string) {
  const { width: w, height: h, horizon: y } = frame;
  const tall = frame.ry * 0.34;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><defs><radialGradient id="${id}" cx="0.36" cy="0.5" r="0.5"><stop offset="0" stop-color="#FFFFFF" stop-opacity="0.9"/><stop offset="0.45" stop-color="#E6ECFF" stop-opacity="0.45"/><stop offset="1" stop-color="#C9D4FF" stop-opacity="0"/></radialGradient></defs><rect x="${-w * 0.12}" y="${y - tall}" width="${w * 0.95}" height="${tall * 2}" fill="url(#${id})"/></svg>`;
}

/** The palm's shadow, pointing right from its foot (flipped for the afternoon): the trunk, then the crown at its end. */
export function palmShadowSvg(length: number) {
  const w = Math.max(10, Math.round(length));
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="12" viewBox="0 0 ${w} 12"><g fill="#3B2410"><path d="M0 4.6 L${w * 0.74} 5.3 L${w * 0.74} 6.7 L0 7.4Z"/><ellipse cx="${w * 0.84}" cy="6" rx="${w * 0.16}" ry="4.2"/></g></svg>`;
}

/** A date palm, 60 by 84, its foot at the bottom middle. */
export const PALM = `<svg xmlns="http://www.w3.org/2000/svg" width="60" height="84" viewBox="0 0 60 84"><path d="M28 84 Q27 52 30.5 24 L33.5 24 Q31 52 33 84Z" fill="#8B5E34"/><path d="M28.6 74h4.2M28.4 64h4M28.6 54h3.8M29.2 44h3.4M29.8 34h3" stroke="#6E4824" stroke-width="1.4" stroke-linecap="round"/><g fill="none" stroke-linecap="round"><path d="M32 24 Q18 12 4 22" stroke="#2F8A3E" stroke-width="4.2"/><path d="M32 24 Q22 6 8 8" stroke="#3A9C48" stroke-width="4"/><path d="M32 24 Q32 4 40 2" stroke="#3A9C48" stroke-width="3.8"/><path d="M32 24 Q46 8 58 14" stroke="#2F8A3E" stroke-width="4.2"/><path d="M32 24 Q48 20 56 34" stroke="#277A35" stroke-width="4"/><path d="M32 24 Q16 24 8 38" stroke="#277A35" stroke-width="4"/></g><g fill="none" stroke="#7CC46F" stroke-width="1.2" stroke-linecap="round"><path d="M31 23 Q19 14 7 21"/><path d="M33 23 Q46 11 56 15"/></g><circle cx="29" cy="28.5" r="2.4" fill="#B5652A"/><circle cx="32.5" cy="29.5" r="2.4" fill="#A3561F"/><circle cx="30.5" cy="31.8" r="2.2" fill="#C2722F"/></svg>`;

/** A small palm, far off. */
export const SMALL_PALM = PALM.replace('width="60" height="84"', 'width="30" height="42"');

/** A young camel, standing (two poses of its legs, so it can shift from foot to foot on the hot sand). */
export const CALF_BODY = "M5 17 C5 13 8 9.5 13 9.5 C17 9.5 19 12.5 22 13 C23.6 13.3 24.4 12 25 10 C25.8 7.6 27.4 6.6 29 7 L31.4 7.8 C32.4 8.2 32.2 9.4 31.4 9.6 L29.8 9.8 C29 12.6 28 15.6 25.6 17.2 C24 18.4 21.6 18.6 20 18.6 L10 18.6 C7 18.6 5 18.6 5 17 Z";
export const CALF_LEGS_A = "M9 18 L8.4 27 M12.4 18 L13 27 M20 18 L19.4 27 M23.4 17.4 L24.2 27";
export const CALF_LEGS_B = "M9 18 L9.8 25.4 M12.4 18 L11.6 27 M20 18 L20.8 25.4 M23.4 17.4 L22.6 27";

/** An arrow in flight, 26 by 8, its point on the right (drawn half as big again). */
export const ARROW = `<svg xmlns="http://www.w3.org/2000/svg" width="26" height="8" viewBox="0 0 26 8"><path d="M3 4H21" stroke="#5A3A1E" stroke-width="1.6" stroke-linecap="round"/><path d="M26 4L19.5 1.2V6.8Z" fill="#6F7378"/><path d="M1 1.2L5.5 4 1 6.8M3.6 1.2L8 4 3.6 6.8" fill="none" stroke="#E04E2B" stroke-width="1.3" stroke-linejoin="round"/></svg>`;

/** The heat rising off the sand at midday: three wavy streaks. */
export const HEAT = `<svg xmlns="http://www.w3.org/2000/svg" width="34" height="26" viewBox="0 0 34 26"><g fill="none" stroke="#FFFFFF" stroke-width="1.6" stroke-linecap="round" opacity="0.8"><path d="M6 25 q-3 -4 0 -8 t0 -8 t0 -8"/><path d="M17 25 q-3 -4 0 -8 t0 -8 t0 -8"/><path d="M28 25 q-3 -4 0 -8 t0 -8 t0 -8"/></g></svg>`;

/** Where the palm stands: its foot, and how tall it is. */
export function palmAt(frame: SkyFrame) {
  const tall = Math.round((frame.height - frame.horizon) * 0.62 + frame.height * 0.16);
  return { x: Math.round(frame.width * 0.47), y: Math.round(frame.height - (frame.height - frame.horizon) * 0.16), tall, wide: Math.round((tall * 60) / 84) };
}

/** Where the far palm stands, small, at the front of the sand on the left. */
export function smallPalmAt(frame: SkyFrame) {
  const tall = Math.round((frame.height - frame.horizon) * 0.5);
  return { x: Math.round(frame.width * 0.09), y: frame.height - 2, tall, wide: Math.round((tall * 30) / 42) };
}

/** Where the two young camels stand in the forenoon heat (Sahih Muslim 748a). */
export function calvesAt(frame: SkyFrame) {
  const size = Math.round(clamp((frame.height - frame.horizon) * 0.46, 18, 40));
  const foot = Math.round(frame.height - (frame.height - frame.horizon) * 0.14);
  return [
    { x: Math.round(frame.width * 0.66), y: foot, size },
    { x: Math.round(frame.width * 0.8), y: foot - 4, size: Math.round(size * 0.86), flip: true }
  ];
}

/** The arrow's flight after Maghrib: from the left, up over the sand, down where it lands on the right (Sahih al-Bukhari 559). */
export function arrowPath(frame: SkyFrame) {
  const { width: w, height: h, horizon: y } = frame;
  return { from: { x: w * 0.12, y: y + (h - y) * 0.5 }, peak: { x: w * 0.47, y: y - frame.ry * 0.42 }, to: { x: w * 0.84, y: y + (h - y) * 0.62 } };
}

/** A point on the arrow's flight, `p` from 0 to 1 (a curve through its peak), and the way it points, in degrees. */
export function arrowAt(frame: SkyFrame, p: number) {
  const { from, peak, to } = arrowPath(frame);
  const c = { x: 2 * peak.x - (from.x + to.x) / 2, y: 2 * peak.y - (from.y + to.y) / 2 };
  const x = (1 - p) * (1 - p) * from.x + 2 * (1 - p) * p * c.x + p * p * to.x;
  const y = (1 - p) * (1 - p) * from.y + 2 * (1 - p) * p * c.y + p * p * to.y;
  const dx = 2 * (1 - p) * (c.x - from.x) + 2 * p * (to.x - c.x);
  const dy = 2 * (1 - p) * (c.y - from.y) + 2 * p * (to.y - c.y);
  return { x, y, angle: (Math.atan2(dy, dx) * 180) / Math.PI };
}

// The words in the sky, and where each sits. A word is a small pill; its width is a guess from its letters, as on the maps.

export const WORD = { font: 12, line: 15, padX: 7, padY: 2.5 } as const;
/**
 * How wide a word's pill is at most: its letters at the widest they are drawn in any of the four languages (measured
 * in the browser), and its padding. The pill itself is as wide as its word, held at this box's left, right or middle.
 */
export const wordWidth = (text: string) => Math.min(180, Math.round(text.length * 7.6 + WORD.padX * 2 + 8));
export const WORD_HEIGHT = WORD.line + WORD.padY * 2;

/** A word's box in the sky, and which edge of it the pill keeps to. */
export type WordBox = Rect & { anchor: "left" | "right" };

/** Where a prayer's name goes at `hour`: by the dawn's light, by the sun, by the setting sun, or by the moon at night. */
export function markRect(frame: SkyFrame, hour: number, text: string): WordBox {
  const w = wordWidth(text);
  const h = WORD_HEIGHT;
  const at = dayHour(hour);
  if (at < 5.9) return { x: 6, y: frame.horizon - 8 - h, w, h, anchor: "left" };
  if (at >= 17.9 && at < 19) return { x: frame.width - 6 - w, y: frame.horizon - 8 - h, w, h, anchor: "right" };
  if (at >= 19) return { x: frame.moon.x + frame.moon.r + 6, y: frame.moon.y - h / 2, w, h, anchor: "left" };
  const sun = sunAt(frame, hour);
  // High up, the name sits beside the sun on the side it is going to (clear of the names lower down the arc); lower
  // down, it sits on the inside of the sun's arc.
  if (sunHeight(hour) > 50) return sun.x >= frame.cx ? { x: sun.x + frame.sunR + 6, y: sun.y - h / 2, w, h, anchor: "left" } : { x: sun.x - frame.sunR - 6 - w, y: sun.y - h / 2, w, h, anchor: "right" };
  return sun.x > frame.cx
    ? { x: sun.x - frame.sunR - 6 - w, y: sun.y - h / 2, w, h, anchor: "right" }
    : { x: sun.x + frame.sunR + 6, y: sun.y - h / 2, w, h, anchor: "left" };
}

/** The two sides of the sky, on the sand: east on the left, west on the right. */
export function sideRects(frame: SkyFrame, say: (text: string) => string) {
  const east = say(SKY_WORDS.east);
  const west = say(SKY_WORDS.west);
  const y = frame.horizon + 5;
  return [
    { text: east, rect: { x: 6, y, w: wordWidth(east), h: WORD_HEIGHT, anchor: "left" } as WordBox },
    { text: west, rect: { x: frame.width - 6 - wordWidth(west), y, w: wordWidth(west), h: WORD_HEIGHT, anchor: "right" } as WordBox }
  ];
}

/** How high the white thread of dawn lies: along the tops of the far hills. */
export const threadAt = (frame: SkyFrame) => Math.round(frame.horizon - hillPaths(frame).tall * 1.15 - 2);

/** The white thread on the horizon, and the black thread of the night above it (Quran 2:187). */
export function threadRects(frame: SkyFrame, say: (text: string) => string) {
  const white = say(SKY_WORDS.white);
  const black = say(SKY_WORDS.black);
  const low = threadAt(frame) - 6 - WORD_HEIGHT;
  return [
    { text: white, rect: { x: 6, y: low, w: wordWidth(white), h: WORD_HEIGHT, anchor: "left" } as WordBox },
    { text: black, rect: { x: 6, y: Math.round(low - WORD_HEIGHT - Math.max(8, frame.ry * 0.16)), w: wordWidth(black), h: WORD_HEIGHT, anchor: "left" } as WordBox }
  ];
}

/**
 * Everything a sky places, for checks and for drawing: the prayers' names, the thread's two names, east and west, and
 * where the sun (or the moon, at night) ends up.
 */
export function skyLayout(scene: SkyScene, width: number, height: number, say: (text: string) => string) {
  const frame = skyFrame(width, height);
  const marks = (scene.marks ?? []).map((mark) => ({ hour: mark.hour, text: say(mark.label), rect: markRect(frame, mark.hour, say(mark.label)) }));
  const threads = scene.touches?.includes("thread") ? threadRects(frame, say) : [];
  const sides = sideRects(frame, say);
  const sun = sunAt(frame, scene.to);
  const glyphs: Rect[] = [];
  // The sun and the moon as the sky ends, wherever they still show, however faintly.
  if (keyed(SUN_KEYS, scene.to) > 0) {
    // Only the part over the sand shows: the sand hides the rest as it rises or sets.
    const top = sun.y - frame.sunR;
    const bottom = Math.min(sun.y + frame.sunR, frame.horizon);
    if (bottom > top) glyphs.push({ x: sun.x - frame.sunR, y: top, w: frame.sunR * 2, h: bottom - top });
  }
  if (keyed(STAR_KEYS, scene.to) > 0) glyphs.push({ x: frame.moon.x - frame.moon.r, y: frame.moon.y - frame.moon.r, w: frame.moon.r * 2, h: frame.moon.r * 2 });
  return { frame, marks, threads, sides, glyphs };
}

/** A small picture of each time of the day for the bar under the sky: where the sun (or the moon) is, over a line of sand. */
export function momentIcon(moment: DayMoment, on: boolean) {
  const ink = on ? "#FFFFFF" : "#A79A84";
  const sun = on ? "#FFE070" : "#C9BBA2";
  const ground = `<path d="M1 12.5H21" stroke="${ink}" stroke-width="1.4" stroke-linecap="round" opacity="0.85"/>`;
  const disc = (x: number, y: number, r = 3.4) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${sun}"/>`;
  const half = (x: number) => `<path d="M${x - 4} 12.5A4 4 0 0 1 ${x + 4} 12.5Z" fill="${sun}"/>`;
  const star = (x: number, y: number) => `<circle cx="${x}" cy="${y}" r="0.9" fill="${ink}"/>`;
  const moon = (x: number, y: number) => `<path d="M${x + 1.2} ${y - 3.6}A3.8 3.8 0 1 0 ${x + 3.4} ${y + 1.9} 3 3 0 0 1 ${x + 1.2} ${y - 3.6}Z" fill="${on ? "#FFF0B0" : "#C9BBA2"}"/>`;
  const art: Record<DayMoment, string> = {
    dawn: `<path d="M1 12.4Q6 9.4 12 11.2" stroke="${on ? "#FFFFFF" : "#C9BBA2"}" stroke-width="1.6" fill="none" stroke-linecap="round"/>${star(15, 3.5)}${star(19, 6.5)}`,
    sunrise: `${half(6)}<path d="M6 6.2V5M1.8 8.2 1 7.4M10.2 8.2 11 7.4" stroke="${sun}" stroke-width="1.2" stroke-linecap="round"/>`,
    forenoon: disc(6.5, 6.5),
    midday: disc(11, 3.8),
    afternoon: disc(15.5, 6.5),
    sunset: half(16),
    night: `${moon(9, 6)}${star(16, 3.5)}${star(18.5, 8)}`,
    lastThird: `${moon(15, 7.5)}${star(4, 3)}${star(8, 6.5)}${star(11.5, 2.5)}`
  };
  return `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="14" viewBox="0 0 22 14">${art[moment]}${ground}</svg>`;
}
