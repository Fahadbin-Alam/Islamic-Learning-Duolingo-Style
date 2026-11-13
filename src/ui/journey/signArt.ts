import type { SignKind } from "../../data/signScenes";
import { ANIMAL_ART } from "../lesson/animalArt";

/**
 * The scenes of the signs in creation (signScenes.ts), drawn in a box 160 wide and 120 high (4:3, the lesson photo's
 * shape), each a story told on one clock: its parts come and go, move, grow and turn at set times through the story
 * (`keys`), and some move round and round on their own as long as it is seen (`loop`): rain falling, waves going by,
 * a palm swaying. A word or two at a time says what is shown (`words`). Nothing drawn is a person or an angel.
 */

export const SIGN_BOX = { width: 160, height: 120 } as const;

/** Values at times through the story (0 to 1), straight between; before the first and after the last, held. */
export type SignKeys = {
  at: number[];
  opacity?: number[];
  /** Moved, in the box's units. */
  x?: number[];
  y?: number[];
  scale?: number[];
  scaleX?: number[];
  scaleY?: number[];
  /** Turned, in degrees, about the part's `origin`. */
  rotate?: number[];
};

/**
 * A part's own motion, round and round: falling down (rain) or sliding across to the right (waves, ripples, gusts;
 * `reverse`: to the left) as two copies, one `period` apart (the box's height or width when not given); bobbing to
 * and fro; twinkling; swaying about its origin; swimming there and back, turning at each end; or a drop falling
 * and fading.
 */
export type SignLoop =
  | { move: "fall" | "slide"; ms: number; period?: number; reverse?: boolean }
  | { move: "bob"; ms: number; x?: number; y?: number; rotate?: number; phase?: number }
  | { move: "twinkle"; ms: number; low?: number; phase?: number }
  | { move: "sway"; ms: number; angle: number; phase?: number }
  | { move: "swim"; ms: number; x: number; phase?: number }
  | { move: "drip"; ms: number; distance: number; phase?: number };

export type SignPart = {
  name: string;
  /** Its shapes, in the box's units (an SVG fragment, without the <svg> around it). */
  svg: string;
  keys?: SignKeys;
  loop?: SignLoop;
  /** The point it grows and turns about (the box's middle when not given). */
  origin?: { x: number; y: number };
  /** Only this part of the box shows it (rain from under a cloud). */
  clip?: { x: number; y: number; w: number; h: number };
};

/** A word or two shown over the scene while the story is between `from` and `to`. */
export type SignWord = { text: string; from: number; to: number };

/**
 * A scene: its story's length, its parts and its words. `stillAt` is where in its story it stands still with reduce
 * motion, when its end does not show the sign (the crops' story ends on bare soil); else at its end.
 */
export type SignArt = { kind: SignKind; ms: number; parts: SignPart[]; words: SignWord[]; stillAt?: number };

const n = (value: number) => Number(value.toFixed(1));

// Skies, ground and weather shared by the scenes.

const sky = (top: string, low: string, line = 62) => `<rect width="160" height="120" fill="${top}"/><rect y="${line}" width="160" height="${120 - line}" fill="${low}"/>`;
const DAY_SKY = sky("#BFE3FA", "#DDF1FC");

/** A cloud of three puffs on a flat foot, `s` times its size, its foot's middle at (x, y). */
function cloud(x: number, y: number, s: number, fill: string, opacity = 1) {
  const p = (dx: number, dy: number) => `${n(x + dx * s)} ${n(y + dy * s)}`;
  return (
    `<path d="M${p(-16, 0)} C${p(-22, 0)} ${p(-22, -8)} ${p(-15, -8)} C${p(-15, -15)} ${p(-6, -18)} ${p(-1, -12)} ` +
    `C${p(3, -20)} ${p(15, -18)} ${p(15, -9)} C${p(22, -10)} ${p(24, 0)} ${p(17, 0)} Z" fill="${fill}" opacity="${opacity}"/>`
  );
}

/** A swirl of wind: a few long strokes with curled ends, across the whole box. */
const GUSTS =
  `<g fill="none" stroke="#FFFFFF" stroke-width="1.3" stroke-linecap="round" opacity="0.85">` +
  `<path d="M6 30 C26 26 44 32 60 28 C66 26 66 20 61 21"/><path d="M84 46 C104 42 120 48 138 43 C144 41 143 35 138 36"/>` +
  `<path d="M20 58 C34 55 46 60 58 57"/><path d="M100 22 C112 19 122 23 132 20"/></g>`;

/** Rain: thin slanting streaks over the whole box, in a pattern that repeats every 120 down. */
function rainStreaks(left = 0, right = 160, top = 0, bottom = 120, color = "#5B8FC7") {
  let d = "";
  let k = 0;
  for (let y = top; y < bottom; y += 10) {
    for (let x = left + ((k * 7) % 13); x < right; x += 13) d += `M${n(x)} ${n(y)} l-1.2 5 `;
    k += 1;
  }
  return `<path d="${d.trim()}" stroke="${color}" stroke-width="0.9" stroke-linecap="round" opacity="0.85"/>`;
}

/** A tuft of grass with its foot at (x, y). */
const tuft = (x: number, y: number, color = "#5FA344", h = 6) =>
  `<path d="M${n(x - 3)} ${y} Q${n(x - 3)} ${n(y - h * 0.6)} ${n(x - 4.5)} ${n(y - h)} Q${n(x - 1.4)} ${n(y - h * 0.5)} ${n(x)} ${n(y - h * 1.15)} Q${n(x + 1.4)} ${n(y - h * 0.5)} ${n(x + 4.5)} ${n(y - h)} Q${n(x + 3)} ${n(y - h * 0.6)} ${n(x + 3)} ${y} Z" fill="${color}"/>`;

/** A flower on its stem, its foot at (x, y). */
const flower = (x: number, y: number, petal: string, h = 9) =>
  `<path d="M${x} ${y} L${x} ${n(y - h)}" stroke="#4E9A3A" stroke-width="1.1"/>` +
  `<circle cx="${n(x - 2)}" cy="${n(y - h)}" r="1.9" fill="${petal}"/><circle cx="${n(x + 2)}" cy="${n(y - h)}" r="1.9" fill="${petal}"/>` +
  `<circle cx="${x}" cy="${n(y - h - 2)}" r="1.9" fill="${petal}"/><circle cx="${x}" cy="${n(y - h + 2)}" r="1.9" fill="${petal}"/>` +
  `<circle cx="${x}" cy="${n(y - h)}" r="1.4" fill="#FFD84A"/>`;

/** Mountains: a range of peaks, each [x of its foot's middle, height, half width], their feet on `base`. */
function peaks(list: [number, number, number][], base: number, fill: string, snow = true) {
  return list
    .map(([x, h, w]) => {
      const top = base - h;
      const cap = snow
        ? `<path d="M${n(x - w * 0.24)} ${n(top + h * 0.24)} L${x} ${top} L${n(x + w * 0.24)} ${n(top + h * 0.24)} L${n(x + w * 0.1)} ${n(top + h * 0.2)} L${n(x)} ${n(top + h * 0.27)} L${n(x - w * 0.1)} ${n(top + h * 0.2)} Z" fill="#FFFFFF"/>`
        : "";
      return `<path d="M${n(x - w)} ${base} L${x} ${top} L${n(x + w)} ${base} Z" fill="${fill}"/><path d="M${x} ${top} L${n(x + w)} ${base} L${n(x + w * 0.35)} ${base} Z" fill="#000000" opacity="0.12"/>${cap}`;
    })
    .join("");
}

/** A date palm: its trunk from its foot at (x, y) up to its crown, `h` high, bending a little to the right. */
function palm(x: number, y: number, h: number, fronds = "#4F9A3C") {
  const top = y - h;
  const tx = x + h * 0.08;
  let rings = "";
  for (let i = 1; i < 7; i += 1) {
    const yy = n(y - (h * i) / 7);
    const xx = n(x + (tx - x) * (i / 7));
    rings += `<path d="M${n(xx - 2.2)} ${yy} Q${xx} ${n(yy + 1.4)} ${n(xx + 2.2)} ${yy}" stroke="#8A5A33" stroke-width="0.8" fill="none"/>`;
  }
  const frond = (dx: number, dy: number) =>
    `<path d="M${n(tx)} ${n(top)} Q${n(tx + dx * 0.5)} ${n(top + dy * 0.2 - 6)} ${n(tx + dx)} ${n(top + dy)} Q${n(tx + dx * 0.45)} ${n(top + dy * 0.2 - 2)} ${n(tx)} ${n(top + 1.5)} Z" fill="${fronds}"/>`;
  return (
    `<path d="M${n(x - 2.6)} ${y} Q${n(x + (tx - x) * 0.4 - 2.6)} ${n(y - h * 0.5)} ${n(tx - 1.6)} ${n(top)} L${n(tx + 1.6)} ${n(top)} Q${n(x + (tx - x) * 0.4 + 2.6)} ${n(y - h * 0.5)} ${n(x + 2.6)} ${y} Z" fill="#A87444"/>` +
    rings +
    frond(-h * 0.55, h * 0.1) +
    frond(h * 0.55, h * 0.12) +
    frond(-h * 0.42, -h * 0.12) +
    frond(h * 0.42, -h * 0.1) +
    frond(-h * 0.2, -h * 0.2) +
    frond(h * 0.22, -h * 0.2)
  );
}

/** Ripe dates hanging under a palm's crown at (x, y). */
const dateBunch = (x: number, y: number) =>
  [
    [0, 0],
    [2.4, 0.8],
    [-2.4, 0.8],
    [1.2, 2.6],
    [-1.2, 2.6],
    [0, 4.2]
  ]
    .map(([dx, dy]) => `<ellipse cx="${n(x + dx)}" cy="${n(y + dy)}" rx="1.3" ry="1.7" fill="#9C3D1E"/>`)
    .join("") + `<path d="M${x} ${n(y - 3)} L${x} ${y}" stroke="#C9A25A" stroke-width="0.8"/>`;

/** The camel of the animal cards, set in the scene at (x, y), `s` times its card's size. */
function camelAt(x: number, y: number, s: number) {
  const body = ANIMAL_ART.camel()
    .body.replace(/^<svg[^>]*>/, "")
    .replace(/<\/svg>$/, "");
  return `<g transform="translate(${x} ${y}) scale(${s})">${body}</g>`;
}

/** The rain's clouds: driven in from the left, over the land while it rains, then on to the right. */
const CLOUD_AT = [0, 0.06, 0.18, 0.32, 0.68, 0.72, 0.8, 0.96];
const CLOUD_X = [-175, -175, -94.2, 0, 0, 0, 56.7, 170];

// Rain on a dead land, which comes to life (Quran 35:9, 7:57).
function rain(): SignArt {
  const greenHills = `<path d="M0 80 C30 72 60 76 90 73 C120 70 140 74 160 72 L160 92 L0 92 Z" fill="#9CCB7A"/>`;
  const dryHills = greenHills.replace("#9CCB7A", "#D9B98A");
  const ground = (top: string, low: string) =>
    `<path d="M0 88 C40 84 80 86 120 85 C140 84 150 85 160 86 L160 120 L0 120 Z" fill="${top}"/><path d="M0 102 C40 99 80 101 120 100 C140 99 150 100 160 101 L160 120 L0 120 Z" fill="${low}"/>`;
  const cracks = `<path d="M18 96 l6 3 l-2 5 M24 99 l5 -2 M58 106 l5 -3 l4 4 M98 95 l-4 5 l6 3 M126 108 l6 -4 l3 3 M140 94 l4 3" stroke="#A9773F" stroke-width="0.9" fill="none" stroke-linecap="round"/>`;
  const twigs = `<g stroke="#8E6B43" stroke-width="1.1" fill="none" stroke-linecap="round"><path d="M30 88 L30 80 M30 83 L26 79 M30 82 L34 77"/><path d="M118 86 L118 79 M118 82 L114 78 M118 81 L122 77 M122 77 L124 78"/><path d="M72 87 L71 82 M71 84 L68 82"/></g>`;
  const clouds = (fill: string) => cloud(46, 34, 1.15, fill) + cloud(98, 28, 1.3, fill) + cloud(136, 40, 0.9, fill);
  const sprouts = [14, 40, 52, 86, 104, 132, 150].map((x, i) => tuft(x, 92 + (i % 3), i % 2 ? "#5FA344" : "#6DB24F", 6 + (i % 3))).join("");
  const flowers = flower(24, 98, "#F47C9B") + flower(64, 100, "#FFFFFF") + flower(96, 97, "#F6B73C") + flower(144, 99, "#F47C9B") + flower(116, 104, "#B98BE8");
  const bush = `<circle cx="34" cy="80" r="7" fill="#4F9A3C"/><circle cx="28" cy="83" r="5" fill="#5FA344"/><circle cx="40" cy="83" r="5" fill="#5FA344"/><path d="M34 88 L34 82" stroke="#7A5230" stroke-width="1.6"/>`;
  const fruit = `<circle cx="31" cy="78" r="1.5" fill="#E2483C"/><circle cx="37" cy="80" r="1.5" fill="#E2483C"/><circle cx="34" cy="84" r="1.5" fill="#E2483C"/><circle cx="29" cy="84" r="1.4" fill="#E2483C"/>`;
  const sun = `<circle cx="132" cy="22" r="13" fill="#FFE7A0" opacity="0.6"/><circle cx="132" cy="22" r="8.5" fill="#FFC93C"/>`;
  return {
    kind: "rain",
    ms: 9500,
    parts: [
      { name: "dry sky", svg: sky("#F1D9A8", "#F6E6C4"), keys: { at: [0, 0.2, 0.34], opacity: [1, 1, 0] } },
      { name: "grey sky", svg: sky("#9DAEC0", "#B6C4D2"), keys: { at: [0, 0.18, 0.32, 0.7, 0.84], opacity: [0, 0, 1, 1, 0] } },
      { name: "clear sky", svg: DAY_SKY, keys: { at: [0, 0.7, 0.86], opacity: [0, 0, 1] } },
      { name: "sun", svg: sun, keys: { at: [0, 0.14, 0.26, 0.8, 0.92], opacity: [1, 1, 0, 0, 1] }, loop: { move: "twinkle", ms: 2600, low: 0.8 } },
      { name: "dry hills", svg: dryHills },
      { name: "green hills", svg: greenHills, keys: { at: [0, 0.58, 0.76], opacity: [0, 0, 1] } },
      { name: "dry ground", svg: ground("#D8A86A", "#C9955A") },
      { name: "cracks", svg: cracks, keys: { at: [0, 0.5, 0.62], opacity: [1, 1, 0] } },
      { name: "green ground", svg: ground("#8CC56A", "#79B65A"), keys: { at: [0, 0.54, 0.72], opacity: [0, 0, 1] } },
      { name: "dead twigs", svg: twigs, keys: { at: [0, 0.5, 0.62], opacity: [1, 1, 0] } },
      { name: "winds", svg: GUSTS, keys: { at: [0, 0.04, 0.1, 0.3, 0.38], opacity: [0, 0, 1, 1, 0] }, loop: { move: "slide", ms: 2200 } },
      // The rain behind its clouds, so it falls from under them.
      { name: "rain", svg: rainStreaks(), keys: { at: [0, 0.34, 0.38, 0.68, 0.74], opacity: [0, 0, 1, 1, 0] }, loop: { move: "fall", ms: 650 } },
      { name: "white clouds", svg: clouds("#FFFFFF"), keys: { at: CLOUD_AT, x: CLOUD_X } },
      { name: "rain clouds", svg: clouds("#7F8EA1"), keys: { at: CLOUD_AT, x: CLOUD_X, opacity: [0, 0, 0, 1, 1, 0.67, 0, 0] } },
      { name: "grass", svg: sprouts, origin: { x: 80, y: 94 }, keys: { at: [0, 0.56, 0.7], scaleY: [0, 0, 1] }, loop: { move: "bob", ms: 3000, x: 0.6 } },
      { name: "bush", svg: bush, origin: { x: 34, y: 88 }, keys: { at: [0, 0.6, 0.76], scale: [0, 0, 1] } },
      { name: "fruit", svg: fruit, origin: { x: 34, y: 81 }, keys: { at: [0, 0.8, 0.88], scale: [0, 0, 1] }, loop: { move: "twinkle", ms: 2200, low: 0.75 } },
      { name: "flowers", svg: flowers, origin: { x: 80, y: 100 }, keys: { at: [0, 0.68, 0.8], scaleY: [0, 0, 1] }, loop: { move: "bob", ms: 2600, x: 0.5, phase: 0.3 } }
    ],
    words: [
      { text: "A dead land", from: 0.02, to: 0.18 },
      { text: "The winds bring the clouds", from: 0.19, to: 0.36 },
      { text: "The rain falls", from: 0.37, to: 0.56 },
      { text: "The land comes to life", from: 0.6, to: 1 }
    ]
  };
}

// The clouds driven, brought together and piled up, and the rain from within them (Quran 24:43, 30:48).
function clouds(): SignArt {
  const hills = `<path d="M0 90 C30 82 56 86 84 83 C112 80 136 84 160 82 L160 120 L0 120 Z" fill="#8CC56A"/><path d="M0 104 C40 100 80 102 120 101 C140 100 150 101 160 102 L160 120 L0 120 Z" fill="#79B65A"/>`;
  const trees = `<circle cx="22" cy="84" r="5" fill="#4F9A3C"/><path d="M22 90 L22 86" stroke="#7A5230" stroke-width="1.4"/><circle cx="140" cy="82" r="6" fill="#4F9A3C"/><path d="M140 89 L140 85" stroke="#7A5230" stroke-width="1.4"/>`;
  // The great cloud the small ones become: a tall heap with a flat dark foot.
  const heap =
    `<path d="M44 62 C34 62 34 50 44 50 C42 38 56 32 64 38 C66 24 86 18 94 30 C100 22 116 26 114 38 C124 36 130 48 122 52 C130 54 128 62 120 62 Z" fill="#E9EEF4"/>` +
    `<path d="M44 62 C40 58 44 54 50 56 C60 52 70 58 80 55 C92 52 104 58 120 56 C126 58 124 62 120 62 Z" fill="#B9C4D1"/>`;
  const heapDark = heap.replace("#E9EEF4", "#7D8B9E").replace("#B9C4D1", "#5E6B7D");
  const bolt = `<path d="M86 60 L80 74 L85 74 L79 88 L92 70 L86 70 L91 60 Z" fill="#FFF3A6"/>`;
  const flash = `<rect width="160" height="120" fill="#FFFFFF"/>`;
  const flashes = { at: [0, 0.6, 0.61, 0.63, 0.66, 0.67, 0.69, 0.8, 0.81, 0.83], opacity: [0, 0, 1, 0, 0, 1, 0, 0, 1, 0] };
  return {
    kind: "clouds",
    ms: 9000,
    parts: [
      { name: "sky", svg: DAY_SKY },
      { name: "dim sky", svg: sky("#8FA2B6", "#A9B8C7"), keys: { at: [0, 0.42, 0.6], opacity: [0, 0, 1] } },
      { name: "flash", svg: flash, keys: { ...flashes, opacity: flashes.opacity.map((o) => o * 0.35) } },
      { name: "hills", svg: hills },
      { name: "trees", svg: trees },
      { name: "winds", svg: GUSTS, keys: { at: [0, 0.3, 0.42], opacity: [1, 1, 0] }, loop: { move: "slide", ms: 2400 } },
      // Small clouds driven in from both sides, brought together in the middle, then gone into the heap.
      { name: "cloud 1", svg: cloud(30, 30, 0.7, "#FFFFFF"), keys: { at: [0, 0.3, 0.44, 0.5], x: [-60, 0, 36, 40], y: [0, 0, 16, 18], opacity: [1, 1, 1, 0] } },
      { name: "cloud 2", svg: cloud(130, 24, 0.65, "#FFFFFF"), keys: { at: [0, 0.3, 0.44, 0.5], x: [60, 0, -40, -44], y: [0, 0, 20, 22], opacity: [1, 1, 1, 0] } },
      { name: "cloud 3", svg: cloud(40, 54, 0.55, "#FFFFFF"), keys: { at: [0, 0.3, 0.44, 0.5], x: [-70, 0, 28, 30], y: [0, 0, 2, 2], opacity: [1, 1, 1, 0] } },
      { name: "cloud 4", svg: cloud(124, 50, 0.6, "#FFFFFF"), keys: { at: [0, 0.3, 0.44, 0.5], x: [70, 0, -34, -36], y: [0, 0, 6, 6], opacity: [1, 1, 1, 0] } },
      { name: "rain", svg: rainStreaks(48, 122, 62, 104, "#4E7FB4"), clip: { x: 44, y: 60, w: 82, h: 44 }, keys: { at: [0, 0.62, 0.66], opacity: [0, 0, 1] }, loop: { move: "fall", ms: 520, period: 42 } },
      { name: "heap", svg: heap, origin: { x: 82, y: 62 }, keys: { at: [0, 0.4, 0.44, 0.58], scale: [0, 0, 0.35, 1], opacity: [0, 0, 1, 1] } },
      { name: "dark heap", svg: heapDark, origin: { x: 82, y: 62 }, keys: { at: [0, 0.44, 0.58, 0.66], scale: [0.35, 0.35, 1, 1], opacity: [0, 0, 0.4, 0.85] } },
      { name: "lightning", svg: bolt, keys: flashes }
    ],
    words: [
      { text: "Allah drives the clouds", from: 0.02, to: 0.3 },
      { text: "He brings them together", from: 0.31, to: 0.44 },
      { text: "He piles them up", from: 0.45, to: 0.6 },
      { text: "Rain comes out from within", from: 0.62, to: 1 }
    ]
  };
}

// Green, then yellow, then broken straw, scattered by the winds (Quran 57:20, 18:45).
function fade(): SignArt {
  const soil = `<path d="M0 90 C40 87 80 89 120 88 C140 87 150 88 160 89 L160 120 L0 120 Z" fill="#B88355"/><path d="M0 100 L160 99 M0 108 L160 107.5 M0 116 L160 115.5" stroke="#9E6C42" stroke-width="1.2"/>`;
  const stalks = (stem: string, ear: string, bent = false) => {
    let out = "";
    for (let i = 0; i < 11; i += 1) {
      const x = 10 + i * 14;
      const y = 96 + (i % 2) * 3;
      if (bent) {
        out += `<path d="M${x} ${y} Q${x + 1} ${y - 14} ${x + 9} ${y - 20}" stroke="${stem}" stroke-width="1.4" fill="none"/><path d="M${x + 9} ${y - 20} l6 4" stroke="${ear}" stroke-width="2.2" stroke-linecap="round"/>`;
        out += `<path d="M${x + 4} ${y} l-5 -9" stroke="${stem}" stroke-width="1.1"/>`;
      } else {
        out += `<path d="M${x} ${y} L${x} ${y - 30}" stroke="${stem}" stroke-width="1.4"/><ellipse cx="${x}" cy="${y - 34}" rx="2.3" ry="5.4" fill="${ear}"/>`;
        out += `<path d="M${x} ${y - 10} Q${x - 6} ${y - 16} ${x - 8} ${y - 22}" stroke="${stem}" stroke-width="1.1" fill="none"/><path d="M${x} ${y - 16} Q${x + 5} ${y - 21} ${x + 7} ${y - 26}" stroke="${stem}" stroke-width="1.1" fill="none"/>`;
      }
    }
    return out;
  };
  const bits = Array.from({ length: 16 }, (_, i) => {
    const x = 12 + ((i * 37) % 140);
    const y = 70 + ((i * 23) % 26);
    const a = (i * 47) % 180;
    return `<path d="M${x} ${y} l${n(5 * Math.cos((a * Math.PI) / 180))} ${n(5 * Math.sin((a * Math.PI) / 180))}" stroke="#D9C38A" stroke-width="1.3" stroke-linecap="round"/>`;
  }).join("");
  const sun = `<circle cx="132" cy="22" r="13" fill="#FFE7A0" opacity="0.6"/><circle cx="132" cy="22" r="8.5" fill="#FFC93C"/>`;
  return {
    kind: "fade",
    ms: 10500,
    // Standing still, the crops are broken straw: the end of the story is bare soil.
    stillAt: 0.72,
    parts: [
      { name: "sky", svg: DAY_SKY },
      { name: "sun", svg: sun, loop: { move: "twinkle", ms: 2600, low: 0.8 } },
      { name: "rain", svg: rainStreaks(), keys: { at: [0, 0.02, 0.12, 0.16], opacity: [0, 1, 1, 0] }, loop: { move: "fall", ms: 650 } },
      { name: "rain cloud", svg: cloud(60, 34, 1.3, "#8D9BAD") + cloud(108, 30, 1, "#8D9BAD"), keys: { at: [0, 0.12, 0.22], x: [0, 10, 60], opacity: [1, 1, 0] } },
      { name: "soil", svg: soil },
      {
        name: "green crops",
        svg: stalks("#4E9A3A", "#6DB24F"),
        origin: { x: 80, y: 98 },
        keys: { at: [0, 0.1, 0.32, 0.46, 0.58], scaleY: [0, 0, 1, 1, 1], opacity: [1, 1, 1, 1, 0] },
        loop: { move: "bob", ms: 3200, x: 1 }
      },
      { name: "yellow crops", svg: stalks("#C9A43A", "#E2C048"), origin: { x: 80, y: 98 }, keys: { at: [0, 0.44, 0.56, 0.64, 0.7], opacity: [0, 0, 1, 1, 0] }, loop: { move: "bob", ms: 3200, x: 1 } },
      { name: "broken straw", svg: stalks("#CDB77E", "#D9C38A", true), keys: { at: [0, 0.62, 0.7, 0.8, 0.86], opacity: [0, 0, 1, 1, 0] } },
      { name: "winds", svg: GUSTS, keys: { at: [0, 0.74, 0.78, 0.94, 1], opacity: [0, 0, 1, 1, 0] }, loop: { move: "slide", ms: 1800 } },
      { name: "straw blown away", svg: bits, origin: { x: 80, y: 84 }, keys: { at: [0, 0.79, 0.81, 0.9, 0.98], x: [0, 0, 0, 70, 150], y: [0, 0, 0, -14, -24], rotate: [0, 0, 0, 8, 14], opacity: [0, 0, 1, 1, 0] } }
    ],
    words: [
      { text: "Green", from: 0.14, to: 0.44 },
      { text: "Then yellow", from: 0.46, to: 0.62 },
      { text: "Then broken straw", from: 0.64, to: 0.78 },
      { text: "Scattered by the winds", from: 0.8, to: 1 }
    ]
  };
}

// The seed that grows seven ears, a hundred grains in each (Quran 2:261).
function seed(): SignArt {
  const soil = `<rect y="88" width="160" height="32" fill="#9A6A42"/><rect y="88" width="160" height="3" fill="#7FB45A"/><path d="M0 100 C40 98 80 101 120 99 C140 98 150 99 160 100 M0 111 C40 109 80 112 120 110 C140 109 150 110 160 111" stroke="#86593A" stroke-width="1" fill="none"/>`;
  const grain = `<ellipse cx="80" cy="96" rx="3.2" ry="2.1" fill="#E9C46A"/><path d="M77.6 96 L82.4 96" stroke="#C9A24A" stroke-width="0.6"/>`;
  const roots = `<path d="M80 97 Q79 104 76 110 M80 98 Q82 106 86 112 M79 101 Q74 104 70 104 M81 102 Q86 104 90 103 M78 106 Q75 110 73 116 M84 108 Q86 112 88 117" stroke="#E8DDC8" stroke-width="0.9" fill="none" stroke-linecap="round"/>`;
  const stem = `<path d="M80 95 Q79 76 80 58" stroke="#5A9E3E" stroke-width="2" fill="none"/><path d="M80 87 Q70 81 66 73 Q74 77 80 83 Z" fill="#6DB24F"/><path d="M80 78 Q90 72 94 64 Q86 69 80 74 Z" fill="#6DB24F"/>`;
  // Seven ears on short stalks spread from the top of the stem.
  const spots: [number, number, number][] = [
    [80, 38, 0],
    [66, 42, -32],
    [94, 42, 32],
    [55, 50, -55],
    [105, 50, 55],
    [52, 62, -72],
    [108, 62, 72]
  ];
  const ear = (x: number, y: number, a: number, fill: string) =>
    `<path d="M80 58 Q${n((80 + x) / 2)} ${n(Math.min(58, y) + 6)} ${x} ${y + 6}" stroke="#5A9E3E" stroke-width="1.1" fill="none"/>` +
    `<g transform="rotate(${a} ${x} ${y})"><ellipse cx="${x}" cy="${y}" rx="3" ry="7" fill="${fill}"/>` +
    `<path d="M${x} ${y - 7} L${x} ${y - 11} M${x - 1.6} ${y - 6} L${x - 3} ${y - 10} M${x + 1.6} ${y - 6} L${x + 3} ${y - 10}" stroke="${fill}" stroke-width="0.6"/>` +
    `<path d="M${x - 2.4} ${y - 3} L${x + 2.4} ${y - 3} M${x - 2.8} ${y} L${x + 2.8} ${y} M${x - 2.4} ${y + 3} L${x + 2.4} ${y + 3}" stroke="#000000" stroke-width="0.35" opacity="0.18"/></g>`;
  const parts: SignPart[] = [
    { name: "sky", svg: DAY_SKY },
    { name: "soil", svg: soil },
    { name: "seed", svg: grain, origin: { x: 80, y: 96 }, keys: { at: [0, 0.05], scale: [0, 1] } },
    { name: "roots", svg: roots, origin: { x: 80, y: 97 }, keys: { at: [0, 0.1, 0.28], scaleY: [0, 0, 1] } },
    { name: "stem", svg: stem, origin: { x: 80, y: 95 }, keys: { at: [0, 0.16, 0.42], scaleY: [0, 0, 1] }, loop: { move: "sway", ms: 3600, angle: 1.4 } }
  ];
  // The ears come out one by one, green; then all of them ripen together.
  spots.forEach(([x, y, a], i) => {
    const t = 0.44 + i * 0.035;
    parts.push({
      name: `green ear ${i + 1}`,
      svg: ear(x, y, a, "#8CC56A"),
      origin: { x: 80, y: 58 },
      keys: { at: [0, t, t + 0.05, 0.72, 0.8], scale: [0, 0, 1, 1, 1], opacity: [1, 1, 1, 1, 0] },
      loop: { move: "sway", ms: 3600, angle: 1.4 }
    });
  });
  parts.push({
    name: "ripe ears",
    svg: spots.map(([x, y, a]) => ear(x, y, a, "#E2BE4E")).join(""),
    origin: { x: 80, y: 58 },
    keys: { at: [0, 0.72, 0.8], opacity: [0, 0, 1] },
    loop: { move: "sway", ms: 3600, angle: 1.4 }
  });
  const glints = spots.map(([x, y]) => `<path d="M${x + 4} ${y - 6} l0.8 1.8 l1.8 0.8 l-1.8 0.8 l-0.8 1.8 l-0.8 -1.8 l-1.8 -0.8 l1.8 -0.8 Z" fill="#FFFFFF"/>`).join("");
  parts.push({ name: "glints", svg: glints, keys: { at: [0, 0.8, 0.84], opacity: [0, 0, 1] }, loop: { move: "twinkle", ms: 1600, low: 0.2 } });
  return {
    kind: "seed",
    ms: 10000,
    parts,
    words: [
      { text: "One seed", from: 0.02, to: 0.4 },
      { text: "Seven ears", from: 0.44, to: 0.7 },
      { text: "A hundred grains in each", from: 0.72, to: 0.88 },
      { text: "Allah gives more to whom He wills", from: 0.89, to: 1 }
    ]
  };
}

// The two seas, sweet and salty, and the barrier between them (Quran 25:53, 55:19, 55:20).
function seas(): SignArt {
  const water =
    `<rect width="160" height="120" fill="#2C78BE"/>` +
    `<path d="M0 0 L84 0 C78 20 88 40 80 60 C72 80 86 100 78 120 L0 120 Z" fill="#56C2BE"/>` +
    `<path d="M0 0 L40 0 C30 10 22 8 14 16 C8 22 4 20 0 22 Z" fill="#E6CF95"/><path d="M0 100 C8 98 14 104 22 110 C28 114 30 118 32 120 L0 120 Z" fill="#E6CF95"/>` +
    `<path d="M0 22 C4 20 8 22 14 16 L0 16 Z" fill="#8CC56A"/>`;
  const seam = `<path d="M84 0 C78 20 88 40 80 60 C72 80 86 100 78 120" stroke="#FFFFFF" stroke-width="1.6" stroke-dasharray="2 3" fill="none"/>`;
  const sweetRipples = `<g stroke="#FFFFFF" stroke-width="0.9" fill="none" opacity="0.7"><path d="M8 36 q4 -2 8 0 M30 52 q4 -2 8 0 M14 70 q4 -2 8 0 M44 84 q4 -2 8 0 M52 30 q4 -2 8 0 M26 96 q4 -2 8 0"/></g>`;
  const saltWaves = `<g stroke="#9FD0F2" stroke-width="1" fill="none" opacity="0.8"><path d="M96 20 q4 -3 8 0 q4 3 8 0 M118 46 q4 -3 8 0 q4 3 8 0 M100 70 q4 -3 8 0 q4 3 8 0 M128 92 q4 -3 8 0 q4 3 8 0 M140 22 q4 -3 8 0 M104 106 q4 -3 8 0"/></g>`;
  const fish = (x: number, y: number, body: string, k = 1.7) =>
    `<path d="M${n(x - 5 * k)} ${y} Q${x} ${n(y - 3.4 * k)} ${n(x + 5 * k)} ${y} Q${x} ${n(y + 3.4 * k)} ${n(x - 5 * k)} ${y} Z" fill="${body}"/>` +
    `<path d="M${n(x - 5 * k)} ${y} L${n(x - 9 * k)} ${n(y - 2.6 * k)} L${n(x - 9 * k)} ${n(y + 2.6 * k)} Z" fill="${body}"/><circle cx="${n(x + 2.6 * k)}" cy="${n(y - 0.6 * k)}" r="${n(0.6 * k)}" fill="#1F2A3A"/>`;
  const pearls = `<circle cx="34" cy="108" r="1.6" fill="#FFF8EC"/><circle cx="130" cy="110" r="1.8" fill="#FFF8EC"/><path d="M120 116 q2 -6 5 -2 q2 -6 4 0" stroke="#F07C7C" stroke-width="1.4" fill="none"/>`;
  return {
    kind: "seas",
    ms: 8500,
    parts: [
      { name: "two waters", svg: water },
      { name: "sweet ripples", svg: sweetRipples, clip: { x: 0, y: 0, w: 76, h: 120 }, loop: { move: "slide", ms: 4200, period: 76 } },
      { name: "salt waves", svg: saltWaves, clip: { x: 86, y: 0, w: 74, h: 120 }, loop: { move: "slide", ms: 5200, period: 74, reverse: true } },
      { name: "barrier", svg: seam, keys: { at: [0, 0.3, 0.42], opacity: [0, 0, 1] }, loop: { move: "twinkle", ms: 1800, low: 0.35 } },
      { name: "river fish", svg: fish(40, 62, "#F2A541"), keys: { at: [0, 0.5, 0.56], opacity: [0, 0, 1] }, loop: { move: "swim", ms: 5200, x: 16 } },
      { name: "sea fish", svg: fish(122, 58, "#C5D6E8"), keys: { at: [0, 0.52, 0.58], opacity: [0, 0, 1] }, loop: { move: "swim", ms: 6000, x: 14, phase: 0.5 } },
      { name: "pearls and coral", svg: pearls, keys: { at: [0, 0.74, 0.8], opacity: [0, 0, 1] }, loop: { move: "twinkle", ms: 2000, low: 0.4 } }
    ],
    words: [
      { text: "Sweet water", from: 0.04, to: 0.26 },
      { text: "Salty water", from: 0.27, to: 0.5 },
      { text: "A barrier between them", from: 0.52, to: 1 }
    ]
  };
}

// The ships sailing the sea by His command, tall like mountains (Quran 22:65, 42:32, 45:12).
function ships(): SignArt {
  const scene = `${DAY_SKY}${peaks(
    [
      [22, 26, 22],
      [56, 34, 26],
      [140, 30, 24]
    ],
    74,
    "#8FA9C4"
  )}<rect y="72" width="160" height="48" fill="#2F86C9"/><rect y="72" width="160" height="5" fill="#5AA7DE"/>`;
  const wavesFar = `<g stroke="#9FD0F2" stroke-width="1" fill="none" opacity="0.8"><path d="M6 82 q4 -3 8 0 q4 3 8 0 M46 86 q4 -3 8 0 q4 3 8 0 M92 80 q4 -3 8 0 q4 3 8 0 M128 88 q4 -3 8 0 q4 3 8 0"/></g>`;
  const wavesNear = `<g stroke="#FFFFFF" stroke-width="1.4" fill="none" opacity="0.85"><path d="M2 108 q6 -4 12 0 q6 4 12 0 M50 114 q6 -4 12 0 q6 4 12 0 M98 106 q6 -4 12 0 q6 4 12 0 M134 116 q6 -4 12 0"/></g>`;
  const ship = (x: number, y: number, s: number) => {
    const p = (dx: number, dy: number) => `${n(x + dx * s)} ${n(y + dy * s)}`;
    return (
      `<path d="M${p(-22, 0)} L${p(22, 0)} L${p(16, 9)} L${p(-17, 9)} Z" fill="#8A5530"/><path d="M${p(-21, 2.4)} L${p(21, 2.4)}" stroke="#C88B52" stroke-width="${n(1.2 * s)}"/>` +
      `<path d="M${p(-2, 0)} L${p(-2, -42)}" stroke="#6B4226" stroke-width="${n(1.6 * s)}"/><path d="M${p(12, 0)} L${p(12, -30)}" stroke="#6B4226" stroke-width="${n(1.3 * s)}"/>` +
      `<path d="M${p(-1, -40)} Q${p(13, -26)} ${p(-1, -6)} Z" fill="#FFFDF5"/><path d="M${p(-3, -38)} Q${p(-17, -24)} ${p(-3, -8)} Z" fill="#F4ECDA"/><path d="M${p(13, -28)} Q${p(23, -18)} ${p(13, -6)} Z" fill="#FFFDF5"/>` +
      `<path d="M${p(-2, -42)} L${p(6, -40)} L${p(-2, -38)} Z" fill="#E2483C"/>`
    );
  };
  return {
    kind: "ships",
    ms: 9000,
    parts: [
      { name: "sky, mountains and sea", svg: scene },
      { name: "far waves", svg: wavesFar, loop: { move: "slide", ms: 7000 } },
      { name: "winds", svg: GUSTS, loop: { move: "slide", ms: 2600 } },
      { name: "small ship", svg: ship(118, 80, 0.42), keys: { at: [0, 1], x: [-30, 24] }, loop: { move: "bob", ms: 2400, y: 0.6, rotate: 1.5, phase: 0.4 }, origin: { x: 118, y: 80 } },
      { name: "tall ship", svg: ship(56, 96, 1), keys: { at: [0, 0.4, 1], x: [-110, 0, 22] }, loop: { move: "bob", ms: 2800, y: 1.2, rotate: 2.2 }, origin: { x: 56, y: 96 } },
      { name: "near waves", svg: wavesNear, loop: { move: "slide", ms: 4200 } }
    ],
    words: [
      { text: "The ships sail the sea", from: 0.04, to: 0.4 },
      { text: "Tall like mountains", from: 0.42, to: 0.7 },
      { text: "By His command", from: 0.72, to: 1 }
    ]
  };
}

// The earth spread out, and the mountains set firm on it like pegs (Quran 78:6, 78:7, 16:15).
function mountains(): SignArt {
  // Wider than the box, its ends sloping down out of sight: while it spreads it is a mound, not a block.
  const plain =
    `<path d="M-60 120 C-50 100 -30 86 -10 84 C30 80 70 82 110 81 C140 80 160 82 170 83 C190 85 210 100 220 120 Z" fill="#9CCB7A"/>` +
    `<path d="M-60 120 C-50 112 -30 101 -10 100 C30 97 70 99 110 98 C140 97 160 98 170 99 C190 101 210 112 220 120 Z" fill="#88BC66"/>`;
  const range1 = peaks([[34, 40, 28]], 84, "#8A7E74");
  const range2 = peaks([[78, 52, 34]], 84, "#7C7068");
  const range3 = peaks([[124, 36, 26]], 84, "#928678");
  const grass = [10, 50, 98, 146, 64].map((x, i) => tuft(x, 92 + (i % 2) * 6, "#5FA344", 6)).join("");
  // A tent held fast by its ropes and pegs: what a peg is.
  const tent =
    `<path d="M108 96 L122 80 L136 96 Z" fill="#E9D8B4"/><path d="M122 80 L136 96 L128 96 Z" fill="#CDB98F"/><path d="M122 80 L122 76" stroke="#8A5A33" stroke-width="1"/>` +
    `<path d="M108 96 L101 100 M136 96 L143 100 M115 88 L104 94 M129 88 L140 94" stroke="#8A5A33" stroke-width="0.6"/>`;
  const pegs = `<path d="M101 98 L101 102 M143 98 L143 102 M104 92 L103.4 96 M140 92 L140.6 96" stroke="#5A3A22" stroke-width="1.4" stroke-linecap="round"/>`;
  const ring = `<circle cx="101" cy="100" r="3.4" fill="none" stroke="#FFFFFF" stroke-width="0.9"/><circle cx="143" cy="100" r="3.4" fill="none" stroke="#FFFFFF" stroke-width="0.9"/>`;
  const flap = `<path d="M122 82 L118 96 L126 96 Z" fill="#B9A47A"/>`;
  const drop = (t: number) => ({ at: [0, t, t + 0.01, t + 0.1, t + 0.13, t + 0.16], y: [-100, -100, -100, 3, -1.2, 0], opacity: [0, 0, 1, 1, 1, 1] });
  return {
    kind: "mountains",
    ms: 9000,
    parts: [
      { name: "sky", svg: DAY_SKY },
      { name: "clouds", svg: cloud(28, 26, 0.8, "#FFFFFF") + cloud(132, 18, 0.7, "#FFFFFF"), loop: { move: "bob", ms: 8000, x: 6 } },
      { name: "the earth", svg: plain, origin: { x: 80, y: 100 }, keys: { at: [0, 0.03, 0.26], scaleX: [0.08, 0.08, 1], opacity: [0, 1, 1] } },
      { name: "mountain 1", svg: range1, keys: drop(0.3) },
      { name: "mountain 2", svg: range2, keys: drop(0.36) },
      { name: "mountain 3", svg: range3, keys: drop(0.42) },
      { name: "grass", svg: grass, origin: { x: 80, y: 96 }, keys: { at: [0, 0.2, 0.3], scaleY: [0, 0, 1] }, loop: { move: "bob", ms: 1600, x: 1.2 } },
      { name: "tent", svg: tent, origin: { x: 122, y: 96 }, keys: { at: [0, 0.58, 0.66], scale: [0, 0, 1.3] } },
      { name: "tent flap", svg: flap, origin: { x: 122, y: 96 }, keys: { at: [0, 0.58, 0.66], opacity: [0, 0, 1], scale: [1.3, 1.3, 1.3] }, loop: { move: "sway", ms: 1400, angle: 5 } },
      { name: "pegs", svg: pegs, origin: { x: 122, y: 96 }, keys: { at: [0, 0.6, 0.66], opacity: [0, 0, 1], scale: [1.3, 1.3, 1.3] } },
      { name: "pegs shown", svg: ring, origin: { x: 122, y: 96 }, keys: { at: [0, 0.62, 0.66, 0.78, 0.82], opacity: [0, 0, 1, 1, 0], scale: [1.3, 1.3, 1.3, 1.3, 1.3] }, loop: { move: "twinkle", ms: 900, low: 0.3 } },
      { name: "winds", svg: GUSTS, keys: { at: [0, 0.68, 0.74], opacity: [0, 0, 1] }, loop: { move: "slide", ms: 2000 } }
    ],
    words: [
      { text: "The earth spread out", from: 0.02, to: 0.28 },
      { text: "Mountains set firm", from: 0.3, to: 0.58 },
      { text: "Like pegs", from: 0.6, to: 0.78 },
      { text: "The earth stays steady", from: 0.8, to: 1 }
    ]
  };
}

// The bee in the mountains and the trees, the flowers, and its honey of many colors (Quran 16:68, 16:69).
function bee(): SignArt {
  const land =
    `${DAY_SKY}${peaks([[30, 58, 40]], 92, "#9A8A7A", false)}` +
    `<path d="M0 92 C40 88 80 90 120 89 C140 88 150 89 160 90 L160 120 L0 120 Z" fill="#9CCB7A"/>` +
    `<path d="M48 92 L48 58" stroke="#8A5A33" stroke-width="3.4"/><path d="M48 66 L60 56" stroke="#8A5A33" stroke-width="2"/>` +
    `<circle cx="48" cy="46" r="15" fill="#4F9A3C"/><circle cx="36" cy="54" r="9" fill="#5FA344"/><circle cx="62" cy="50" r="10" fill="#5FA344"/>`;
  // The comb hangs from the branch.
  const comb = `<path d="M54 58 Q52 70 58 76 Q64 70 62 58 Z" fill="#E7A93B"/><path d="M55 62 L61 62 M55 66 L61.5 66 M56 70 L60.5 70" stroke="#B9791F" stroke-width="0.6"/>`;
  const flowers = flower(98, 104, "#F47C9B", 11) + flower(112, 100, "#B98BE8", 13) + flower(126, 106, "#FFFFFF", 10) + flower(140, 101, "#F6B73C", 12) + flower(150, 108, "#F47C9B", 9);
  const beeAt = (x: number, y: number) =>
    `<ellipse cx="${x}" cy="${y}" rx="4" ry="2.8" fill="#F2B632"/><path d="M${n(x - 1)} ${n(y - 2.6)} L${n(x - 1)} ${n(y + 2.6)} M${n(x + 1.5)} ${n(y - 2.4)} L${n(x + 1.5)} ${n(y + 2.4)}" stroke="#2B2B2B" stroke-width="1"/>` +
    `<circle cx="${n(x + 3.6)}" cy="${n(y - 0.4)}" r="1.3" fill="#2B2B2B"/><ellipse cx="${n(x - 0.8)}" cy="${n(y - 3.6)}" rx="2.3" ry="1.5" fill="#FFFFFF" opacity="0.85"/><ellipse cx="${n(x + 1.4)}" cy="${n(y - 3.4)}" rx="1.8" ry="1.2" fill="#FFFFFF" opacity="0.7"/>`;
  // Out from the comb to a flower and home again, each bee on its own road and time.
  const trip = (fx: number, fy: number, t: number) => ({
    at: [0, t, t + 0.08, t + 0.16, t + 0.24, t + 0.32, t + 0.4],
    x: [0, 0, (fx - 58) * 0.5, fx - 58, fx - 58, (fx - 58) * 0.5, 0],
    y: [0, 0, (fy - 74) * 0.5 - 16, fy - 74, fy - 74, (fy - 74) * 0.5 - 12, 0],
    opacity: [0, 1, 1, 1, 1, 1, 1]
  });
  const drop = (x: number, color: string) => `<ellipse cx="${x}" cy="78" rx="1.3" ry="1.8" fill="${color}"/>`;
  return {
    kind: "bee",
    ms: 9500,
    parts: [
      { name: "mountain, tree and meadow", svg: land },
      { name: "comb", svg: comb },
      { name: "flowers", svg: flowers, origin: { x: 124, y: 104 }, loop: { move: "bob", ms: 2600, x: 0.8 } },
      { name: "bee 1", svg: beeAt(58, 74), keys: trip(112, 87, 0.08), loop: { move: "bob", ms: 600, y: 1 } },
      { name: "bee 2", svg: beeAt(58, 74), keys: trip(140, 89, 0.16), loop: { move: "bob", ms: 520, y: 1, phase: 0.4 } },
      { name: "bee 3", svg: beeAt(58, 74), keys: trip(98, 93, 0.24), loop: { move: "bob", ms: 680, y: 1, phase: 0.7 } },
      { name: "golden honey", svg: drop(56, "#F2B632"), keys: { at: [0, 0.66, 0.7], opacity: [0, 0, 1] }, loop: { move: "drip", ms: 1800, distance: 12 } },
      { name: "amber honey", svg: drop(58.5, "#D9822B"), keys: { at: [0, 0.7, 0.74], opacity: [0, 0, 1] }, loop: { move: "drip", ms: 1800, distance: 12, phase: 0.33 } },
      { name: "dark honey", svg: drop(61, "#8E4A1C"), keys: { at: [0, 0.74, 0.78], opacity: [0, 0, 1] }, loop: { move: "drip", ms: 1800, distance: 12, phase: 0.66 } }
    ],
    words: [
      { text: "Homes in the mountains and trees", from: 0.02, to: 0.24 },
      { text: "Eat from every fruit", from: 0.26, to: 0.62 },
      { text: "Honey of many colors", from: 0.64, to: 0.84 },
      { text: "Healing for people", from: 0.86, to: 1 }
    ]
  };
}

// The spider's house, the weakest of houses (Quran 29:41).
function spider(): SignArt {
  const ground = `${sky("#E4EEF3", "#EEF4F0", 70)}<path d="M0 102 C40 99 80 101 120 100 C140 99 150 100 160 101 L160 120 L0 120 Z" fill="#B7D49A"/>`;
  // Two stems and a twig across their tops: the web hangs between them.
  const leaf = (x: number, y: number, a: number) => `<ellipse cx="${x}" cy="${y}" rx="4.4" ry="2" fill="#6DB24F" transform="rotate(${a} ${x} ${y})"/>`;
  const twigs =
    `<g stroke="#6E8F3A" fill="none" stroke-linecap="round"><path d="M40 104 C37 74 43 44 40 12" stroke-width="2.2"/><path d="M144 104 C147 74 141 44 144 10" stroke-width="2.2"/></g>` +
    `<path d="M0 12 C40 2 80 10 120 4 C136 2 150 6 160 2" stroke="#7A5230" stroke-width="3" fill="none" stroke-linecap="round"/>` +
    leaf(46, 34, -30) +
    leaf(35, 60, 30) +
    leaf(46, 82, -25) +
    leaf(138, 40, 30) +
    leaf(149, 66, -30) +
    leaf(138, 88, 25) +
    leaf(20, 8, 15) +
    leaf(118, 9, -15) +
    leaf(70, 6, 10);
  const cx = 92;
  const cy = 52;
  const ends: [number, number][] = [
    [41, 14],
    [92, 7],
    [143, 12],
    [144, 52],
    [144, 92],
    [92, 100],
    [40, 92],
    [41, 52]
  ];
  const spokes = `<g stroke="#FFFFFF" stroke-width="0.7" opacity="0.95">${ends.map(([x, y]) => `<path d="M${cx} ${cy} L${x} ${y}"/>`).join("")}</g>`;
  const ring = (f: number) => `M${ends.map(([x, y]) => `${n(cx + (x - cx) * f)} ${n(cy + (y - cy) * f)}`).join(" L")} Z`;
  const whole = `<g stroke="#FFFFFF" stroke-width="0.6" fill="none" opacity="0.95"><path d="${[0.18, 0.32, 0.46, 0.6, 0.74].map(ring).join(" ")}"/></g>`;
  const outer = `<g stroke="#FFFFFF" stroke-width="0.6" fill="none" opacity="0.95"><path d="${ring(0.88)}"/></g>`;
  const thread = `<path d="M${cx} 7 L${cx} ${cy}" stroke="#FFFFFF" stroke-width="0.5" opacity="0.9"/>`;
  const spiderAt = `<circle cx="${cx}" cy="${cy}" r="2.6" fill="#3A2E2A"/><circle cx="${cx}" cy="${cy - 3}" r="1.6" fill="#3A2E2A"/><path d="M${cx - 2} ${cy - 1} l-4 -3 M${cx - 2} ${cy} l-5 0 M${cx - 2} ${cy + 1} l-4 3 M${cx + 2} ${cy - 1} l4 -3 M${cx + 2} ${cy} l5 0 M${cx + 2} ${cy + 1} l4 3" stroke="#3A2E2A" stroke-width="0.8"/>`;
  // The gust: the web is thrown about and its outer thread breaks.
  const at = [0, 0.04, 0.1, 0.44, 0.62, 0.67, 0.72, 0.78, 0.84];
  const rotate = [0, 0, 0, 0, 0, 6, -5, 2.5, 0];
  const breeze = { move: "sway" as const, ms: 3400, angle: 1.2 };
  const top = { x: 92, y: 7 };
  return {
    kind: "spider",
    ms: 8000,
    parts: [
      { name: "air and grass", svg: ground },
      { name: "stems", svg: twigs },
      { name: "thread", svg: thread, origin: top, keys: { at, opacity: [0, 1, 1, 1, 1, 1, 1, 1, 1], rotate }, loop: breeze },
      { name: "spokes", svg: spokes, origin: top, keys: { at, opacity: [0, 0, 1, 1, 1, 1, 1, 1, 1], rotate }, loop: breeze },
      { name: "web", svg: whole, origin: top, keys: { at, opacity: [0, 0, 0, 1, 1, 1, 1, 1, 1], rotate }, loop: breeze },
      { name: "outer thread", svg: outer, origin: top, keys: { at, opacity: [0, 0, 0, 1, 1, 1, 0, 0, 0], rotate }, loop: breeze },
      { name: "spider", svg: spiderAt, origin: top, keys: { at, y: [-45, -45, -45, 0, 0, 0, 0, 0, 0], rotate }, loop: breeze },
      { name: "winds", svg: GUSTS, keys: { at: [0, 0.6, 0.64, 0.82, 0.86], opacity: [0, 0, 1, 1, 0] }, loop: { move: "slide", ms: 1600 } }
    ],
    words: [
      { text: "The spider builds a house", from: 0.04, to: 0.56 },
      { text: "The weakest of houses", from: 0.64, to: 1 }
    ]
  };
}

// The good word, like a good tree: a date palm, its root firm and its branches in the sky (Quran 14:24, 14:25).
function tree(): SignArt {
  const scene = `${DAY_SKY}<rect y="86" width="160" height="34" fill="#9A6A42"/><rect y="86" width="160" height="3.4" fill="#7FB45A"/><path d="M0 100 C40 98 80 101 120 99 C140 98 150 99 160 100 M0 111 C40 109 80 112 120 110 C140 109 150 110 160 111" stroke="#86593A" stroke-width="1" fill="none"/>`;
  const roots = `<path d="M80 88 Q76 95 68 100 Q62 103 55 107 M80 88 Q84 95 92 100 Q98 103 105 107 M80 88 L80 107 M80 92 Q70 96 62 96 M80 92 Q90 96 98 96 M72 100 Q70 104 68 107 M88 100 Q90 104 92 107" stroke="#D9C9A8" stroke-width="1.6" fill="none" stroke-linecap="round"/>`;
  const trunkAndCrown = palm(80, 88, 52);
  const dates = dateBunch(78, 41) + dateBunch(88, 41) + dateBunch(71, 43);
  const sway = { move: "sway" as const, ms: 4600, angle: 1.3 };
  return {
    kind: "tree",
    ms: 9500,
    parts: [
      { name: "sky and soil", svg: scene },
      { name: "clouds", svg: cloud(30, 22, 0.7, "#FFFFFF") + cloud(136, 30, 0.6, "#FFFFFF"), loop: { move: "bob", ms: 9000, x: 5 } },
      { name: "roots", svg: roots, origin: { x: 80, y: 88 }, keys: { at: [0, 0.04, 0.26], scale: [0, 0, 1] } },
      { name: "palm", svg: trunkAndCrown, origin: { x: 80, y: 88 }, keys: { at: [0, 0.26, 0.52], scale: [0, 0, 1] }, loop: sway },
      { name: "dates", svg: dates, origin: { x: 80, y: 88 }, keys: { at: [0, 0.6, 0.66], opacity: [0, 0, 1] }, loop: sway },
      {
        name: "glints",
        svg: `<path d="M96 35 l0.9 2 l2 0.9 l-2 0.9 l-0.9 2 l-0.9 -2 l-2 -0.9 l2 -0.9 Z M63 39 l0.8 1.8 l1.8 0.8 l-1.8 0.8 l-0.8 1.8 l-0.8 -1.8 l-1.8 -0.8 l1.8 -0.8 Z" fill="#FFFFFF"/>`,
        keys: { at: [0, 0.66, 0.7], opacity: [0, 0, 1] },
        loop: { move: "twinkle", ms: 1500, low: 0.15 }
      }
    ],
    words: [
      { text: "Its root is firm", from: 0.02, to: 0.26 },
      { text: "Its branches are in the sky", from: 0.28, to: 0.58 },
      { text: "Its fruit at every time", from: 0.6, to: 1 }
    ]
  };
}

// The camel, the sky, the mountains and the earth (Quran 88:17 to 88:20).
function look(): SignArt {
  const highSky = `<rect width="160" height="120" fill="#A9D8F7"/><rect y="40" width="160" height="80" fill="#CBE8FB"/><rect y="70" width="160" height="50" fill="#E2F3FD"/>`;
  const lowSky = `<rect width="160" height="120" fill="#E9DCC0"/>`;
  const sand = `<path d="M0 84 C30 80 60 82 100 81 C130 80 150 82 160 83 L160 120 L0 120 Z" fill="#EBC98F"/><path d="M0 98 C30 95 60 97 100 96 C130 95 150 96 160 97 L160 120 L0 120 Z" fill="#DDB574"/>`;
  // The earth spread out: rings of light spreading over the land, wider and wider.
  const ripple = `<ellipse cx="80" cy="102" rx="24" ry="5" fill="none" stroke="#FFF6DA" stroke-width="1.4"/>`;
  const range = peaks(
    [
      [36, 34, 26],
      [70, 44, 30],
      [128, 30, 24]
    ],
    84,
    "#B59A7C",
    false
  );
  const sun = `<circle cx="128" cy="20" r="12" fill="#FFE7A0" opacity="0.55"/><circle cx="128" cy="20" r="7.6" fill="#FFC93C"/>`;
  return {
    kind: "look",
    ms: 11000,
    parts: [
      { name: "low sky", svg: lowSky },
      { name: "sky raised high", svg: highSky, keys: { at: [0, 0.27, 0.29, 0.46], y: [60, 60, 56, 0], opacity: [0, 0, 1, 1] } },
      { name: "sun", svg: sun, keys: { at: [0, 0.3, 0.46], y: [50, 50, 0], opacity: [0, 0, 1] }, loop: { move: "twinkle", ms: 2800, low: 0.8 } },
      { name: "clouds", svg: cloud(36, 26, 0.7, "#FFFFFF") + cloud(92, 18, 0.6, "#FFFFFF"), keys: { at: [0, 0.3, 0.46], y: [50, 50, 0], opacity: [0, 0, 1] }, loop: { move: "bob", ms: 9000, x: 5 } },
      { name: "mountains", svg: range, keys: { at: [0, 0.48, 0.58, 0.61, 0.64], y: [-100, -100, 3, -1, 0], opacity: [0, 0, 1, 1, 1] } },
      { name: "the earth", svg: sand },
      { name: "ripple 1", svg: ripple, origin: { x: 80, y: 102 }, keys: { at: [0, 0.69, 0.72, 0.86], scale: [0.3, 0.3, 0.5, 3.6], opacity: [0, 0, 1, 0] } },
      { name: "ripple 2", svg: ripple, origin: { x: 80, y: 102 }, keys: { at: [0, 0.75, 0.78, 0.94], scale: [0.3, 0.3, 0.5, 3.6], opacity: [0, 0, 1, 0] } },
      { name: "camel behind", svg: camelAt(100, 57, 0.42), keys: { at: [0, 0.05, 0.24], x: [-150, -150, 0] }, loop: { move: "bob", ms: 1200, y: 0.5, rotate: 1, phase: 0.5 }, origin: { x: 121, y: 90 } },
      { name: "camel", svg: camelAt(36, 50, 0.6), keys: { at: [0, 0.02, 0.24], x: [-90, -90, 0] }, loop: { move: "bob", ms: 1200, y: 0.6, rotate: 1 }, origin: { x: 66, y: 96 } }
    ],
    words: [
      { text: "The camels, how they were created", from: 0.02, to: 0.25 },
      { text: "The sky, how it was raised", from: 0.27, to: 0.47 },
      { text: "The mountains, how they were set firm", from: 0.49, to: 0.67 },
      { text: "The earth, how it was spread out", from: 0.69, to: 1 }
    ]
  };
}

export const SIGN_ART: Record<SignKind, () => SignArt> = { rain, clouds, fade, seed, seas, ships, mountains, bee, spider, tree, look };

const drawn = new Map<SignKind, SignArt>();

/** A scene's drawing, made once. */
export function signArt(kind: SignKind): SignArt {
  let art = drawn.get(kind);
  if (!art) {
    art = SIGN_ART[kind]();
    drawn.set(kind, art);
  }
  return art;
}

/** Every English word the scenes show, for the translation catalogs. */
export function signWords(): string[] {
  const words = new Set<string>();
  for (const kind of Object.keys(SIGN_ART) as SignKind[]) signArt(kind).words.forEach((word) => words.add(word.text));
  return [...words];
}

/** A value of a part's keys at a time through the story, as the scene shows it. */
export function keyAt(at: number[], values: number[], t: number) {
  if (t <= at[0]) return values[0];
  for (let i = 1; i < at.length; i += 1) {
    if (t <= at[i]) {
      const span = at[i] - at[i - 1];
      return span > 0 ? values[i - 1] + ((values[i] - values[i - 1]) * (t - at[i - 1])) / span : values[i];
    }
  }
  return values[values.length - 1];
}
