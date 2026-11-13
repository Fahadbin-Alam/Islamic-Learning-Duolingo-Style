import type { SignKind } from "../../data/signScenes";
import { ANIMAL_ART, type AnimalKind } from "../lesson/animalArt";

/**
 * What the scenes of the signs (signArt.ts, parableArt.ts) are made of: a scene's parts, keys, loops and words; and
 * the shapes they share, in the box 160 wide and 120 high that every scene is drawn in: skies, clouds, wind, rain,
 * grass, flowers, mountains, palms, fire, stars, and the animals of the picture cards. Nothing drawn is a person.
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

export const n = (value: number) => Number(value.toFixed(1));

// Skies, ground and weather shared by the scenes.

export const sky = (top: string, low: string, line = 62) => `<rect width="160" height="120" fill="${top}"/><rect y="${line}" width="160" height="${120 - line}" fill="${low}"/>`;
export const DAY_SKY = sky("#BFE3FA", "#DDF1FC");

/** A cloud of three puffs on a flat foot, `s` times its size, its foot's middle at (x, y). */
export function cloud(x: number, y: number, s: number, fill: string, opacity = 1) {
  const p = (dx: number, dy: number) => `${n(x + dx * s)} ${n(y + dy * s)}`;
  return (
    `<path d="M${p(-16, 0)} C${p(-22, 0)} ${p(-22, -8)} ${p(-15, -8)} C${p(-15, -15)} ${p(-6, -18)} ${p(-1, -12)} ` +
    `C${p(3, -20)} ${p(15, -18)} ${p(15, -9)} C${p(22, -10)} ${p(24, 0)} ${p(17, 0)} Z" fill="${fill}" opacity="${opacity}"/>`
  );
}

/** A swirl of wind: a few long strokes with curled ends, across the whole box. */
export const GUSTS =
  `<g fill="none" stroke="#FFFFFF" stroke-width="1.3" stroke-linecap="round" opacity="0.85">` +
  `<path d="M6 30 C26 26 44 32 60 28 C66 26 66 20 61 21"/><path d="M84 46 C104 42 120 48 138 43 C144 41 143 35 138 36"/>` +
  `<path d="M20 58 C34 55 46 60 58 57"/><path d="M100 22 C112 19 122 23 132 20"/></g>`;

/** Rain: thin slanting streaks over the whole box, in a pattern that repeats every 120 down. */
export function rainStreaks(left = 0, right = 160, top = 0, bottom = 120, color = "#5B8FC7") {
  let d = "";
  let k = 0;
  for (let y = top; y < bottom; y += 10) {
    for (let x = left + ((k * 7) % 13); x < right; x += 13) d += `M${n(x)} ${n(y)} l-1.2 5 `;
    k += 1;
  }
  return `<path d="${d.trim()}" stroke="${color}" stroke-width="0.9" stroke-linecap="round" opacity="0.85"/>`;
}

/** A tuft of grass with its foot at (x, y). */
export const tuft = (x: number, y: number, color = "#5FA344", h = 6) =>
  `<path d="M${n(x - 3)} ${y} Q${n(x - 3)} ${n(y - h * 0.6)} ${n(x - 4.5)} ${n(y - h)} Q${n(x - 1.4)} ${n(y - h * 0.5)} ${n(x)} ${n(y - h * 1.15)} Q${n(x + 1.4)} ${n(y - h * 0.5)} ${n(x + 4.5)} ${n(y - h)} Q${n(x + 3)} ${n(y - h * 0.6)} ${n(x + 3)} ${y} Z" fill="${color}"/>`;

/** A flower on its stem, its foot at (x, y). */
export const flower = (x: number, y: number, petal: string, h = 9) =>
  `<path d="M${x} ${y} L${x} ${n(y - h)}" stroke="#4E9A3A" stroke-width="1.1"/>` +
  `<circle cx="${n(x - 2)}" cy="${n(y - h)}" r="1.9" fill="${petal}"/><circle cx="${n(x + 2)}" cy="${n(y - h)}" r="1.9" fill="${petal}"/>` +
  `<circle cx="${x}" cy="${n(y - h - 2)}" r="1.9" fill="${petal}"/><circle cx="${x}" cy="${n(y - h + 2)}" r="1.9" fill="${petal}"/>` +
  `<circle cx="${x}" cy="${n(y - h)}" r="1.4" fill="#FFD84A"/>`;

/** Mountains: a range of peaks, each [x of its foot's middle, height, half width], their feet on `base`. */
export function peaks(list: [number, number, number][], base: number, fill: string, snow = true) {
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
export function palm(x: number, y: number, h: number, fronds = "#4F9A3C") {
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
export const dateBunch = (x: number, y: number) =>
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

/**
 * An animal of the picture cards (its box 100 wide and 80 high, facing right), set in the scene with its box's corner
 * at (x, y), `s` times its card's size; `left`: facing left.
 */
export function animalAt(kind: AnimalKind, x: number, y: number, s: number, left = false) {
  const art = ANIMAL_ART[kind]();
  const inner = (svg: string) => svg.replace(/^<svg[^>]*>/, "").replace(/<\/svg>$/, "");
  const body = inner(art.body) + (art.wings ? inner(art.wings) : "");
  return `<g transform="translate(${left ? n(x + 100 * s) : x} ${y}) scale(${left ? -s : s} ${s})">${body}</g>`;
}

/** The camel of the animal cards, set in the scene at (x, y), `s` times its card's size. */
export const camelAt = (x: number, y: number, s: number) => animalAt("camel", x, y, s);

/** A night sky: dark at the top, a little lighter down to the land. */
export const nightSky = (line = 62) => `<rect width="160" height="120" fill="#0F1C3A"/><rect y="34" width="160" height="86" fill="#16284C"/><rect y="${line}" width="160" height="${120 - line}" fill="#1F3560"/>`;

/** Small stars at (x, y), each a dot with a faint ring. */
export const stars = (list: [number, number][]) =>
  list.map(([x, y], i) => `<circle cx="${x}" cy="${y}" r="${i % 3 ? 0.6 : 0.85}" fill="#FFFFFF"/><circle cx="${x}" cy="${y}" r="1.8" fill="#FFFFFF" opacity="0.12"/>`).join("");

/** A flame `h` high, its foot's middle at (x, y): red outside, then orange, then yellow inside. */
export function flame(x: number, y: number, h: number) {
  const tongue = (k: number, fill: string) => {
    const w = h * 0.34 * k;
    const top = y - h * k;
    return `<path d="M${n(x - w)} ${y} C${n(x - w * 1.25)} ${n(y - h * 0.36 * k)} ${n(x - w * 0.2)} ${n(y - h * 0.62 * k)} ${x} ${n(top)} C${n(x + w * 0.35)} ${n(y - h * 0.58 * k)} ${n(x + w * 1.25)} ${n(y - h * 0.4 * k)} ${n(x + w)} ${y} Z" fill="${fill}"/>`;
  };
  return tongue(1, "#E2483C") + tongue(0.78, "#F28C28") + tongue(0.52, "#FFD84A");
}

/** A soft glow about (x, y): rings of light, brightest in the middle. */
export const glow = (x: number, y: number, r: number, color: string, opacity = 0.08) =>
  [1, 0.86, 0.72, 0.6, 0.48, 0.37, 0.27, 0.18].map((k) => `<circle cx="${x}" cy="${y}" r="${n(r * k)}" fill="${color}" opacity="${opacity}"/>`).join("");
