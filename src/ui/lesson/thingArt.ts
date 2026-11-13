import type { CardArt, CardHome, CardLayer, CardMotion } from "./cardArt";

/**
 * The things of the picture cards (cardQuestions.ts, CardGame.tsx), each in a box 100 wide and 80 high, in plain
 * shapes like the animals (animalArt.ts): foods on a table, plants in the ground, the sun, the moon and the weather in
 * the sky, the earth's waters and stones, metals, and a few made things. Each moves its own way: the rain falls, a
 * fire leaps, a river and the sea flow, the sun's rays turn, steam rises from bread, a glint comes and goes on gold.
 *
 * Only things are drawn: never a person, a face, or anything that stands for one; never a scripture; and never
 * anything forbidden to eat or drink.
 */

export type ThingKind =
  // Foods and drinks
  | "dates"
  | "milk"
  | "honey"
  | "water"
  | "bread"
  | "meat"
  | "barley"
  | "wheat"
  | "grapes"
  | "figs"
  | "olives"
  | "oil"
  | "pomegranate"
  | "banana"
  | "apple"
  | "mango"
  | "rice"
  | "gourd"
  | "vinegar"
  | "garlic"
  | "mint"
  | "citron"
  | "coffee"
  | "fruit"
  // Plants
  | "tree"
  | "palm"
  | "leaves"
  | "seed"
  | "garden"
  | "thorn"
  // The sky and the weather
  | "sun"
  | "moon"
  | "star"
  | "cloud"
  | "rain"
  | "wind"
  | "air"
  | "snow"
  | "ice"
  // The earth and its waters
  | "sand"
  | "dust"
  | "smoke"
  | "fire"
  | "river"
  | "sea"
  | "mountain"
  | "stone"
  | "clay"
  | "light"
  // Metals and other stuff
  | "gold"
  | "silver"
  | "iron"
  | "copper"
  | "pearl"
  | "wood"
  // Made things
  | "lamp"
  | "pen"
  | "ship"
  | "sword"
  | "crown"
  | "rope"
  | "tent"
  | "house"
  | "staff"
  | "wall";

/** A number, short. */
const f = (value: number) => Number(value.toFixed(2));
/** A drawing in the box, fitted into the picture. */
const svg = (inner: string) => `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="80" viewBox="0 0 100 80">${inner}</svg>`;
/** A drawing stretched to fill the picture, like its home: a scene, or rain over all of it. */
const wide = (inner: string) => `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="80" viewBox="0 0 100 80" preserveAspectRatio="none">${inner}</svg>`;
/** A shadow on the table or the ground. */
const shadow = (cx: number, rx: number, cy = 67) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="2.6" fill="#000000" opacity="0.12"/>`;
/** A four-pointed glint. */
const glint = (x: number, y: number, r = 3, color = "#FFFFFF") => {
  const k = f(r * 0.22);
  return `<path d="M${x} ${f(y - r)} Q${f(x + k)} ${f(y - k)} ${f(x + r)} ${y} Q${f(x + k)} ${f(y + k)} ${x} ${f(y + r)} Q${f(x - k)} ${f(y + k)} ${f(x - r)} ${y} Q${f(x - k)} ${f(y - k)} ${x} ${f(y - r)} Z" fill="${color}"/>`;
};
/** A wisp of steam or scent, rising `rise` from (x, y). */
const wisp = (x: number, y: number, rise = 14, color = "#FFFFFF", width = 2.2) => {
  const q = f(rise / 4);
  return `<path d="M${x} ${y} c-3 ${-q} 3 ${-q} 0 ${-2 * q} c-3 ${-q} 3 ${-q} 0 ${-2 * q}" stroke="${color}" stroke-width="${width}" fill="none" stroke-linecap="round" opacity="0.9"/>`;
};
/** A leaf, `size` long, turned `turn` degrees. */
const leaf = (x: number, y: number, turn: number, color: string, size = 1, vein = "#3F7F2E") =>
  `<g transform="translate(${x} ${y}) rotate(${turn}) scale(${size})"><path d="M0 -8 C5 -4 5 4 0 8 C-5 4 -5 -4 0 -8 Z" fill="${color}"/><path d="M0 -6.6 L0 6.6" stroke="${vein}" stroke-width="0.8" stroke-linecap="round"/></g>`;
/** A tuft of grass, standing at (x, y). */
const tuft = (x: number, y: number, color = "#6FAE45") => `<path d="M${x} ${y} q-2 -6 -5 -9 M${x} ${y} q0 -7 1 -11 M${x} ${y} q2 -6 6 -8" stroke="${color}" stroke-width="1.7" fill="none" stroke-linecap="round"/>`;
/** A five-pointed star. */
const starPath = (cx: number, cy: number, outer: number, inner: number) => {
  let d = "";
  for (let index = 0; index < 10; index += 1) {
    const r = index % 2 ? inner : outer;
    const a = -Math.PI / 2 + (index * Math.PI) / 5;
    d += `${index ? "L" : "M"}${f(cx + r * Math.cos(a))} ${f(cy + r * Math.sin(a))} `;
  }
  return `${d}Z`;
};
/** Rays about (cx, cy), from `inner` out to `outer`. */
const rays = (cx: number, cy: number, inner: number, outer: number, count: number, width: number, color: string, every = 1) =>
  Array.from({ length: count }, (_, index) => {
    const a = (index / count) * Math.PI * 2;
    const reach = index % every ? inner + (outer - inner) * 0.55 : outer;
    return `<path d="M${f(cx + inner * Math.cos(a))} ${f(cy + inner * Math.sin(a))} L${f(cx + reach * Math.cos(a))} ${f(cy + reach * Math.sin(a))}" stroke="${color}" stroke-width="${width}" stroke-linecap="round"/>`;
  }).join("");

/** A drawing made `k` times bigger about the point (x, y): its foot stays where it stands. */
type Grow = { k: number; x: number; y: number };
const grown = (inner: string, by?: Grow) => (by ? `<g transform="translate(${by.x} ${by.y}) scale(${by.k}) translate(${-by.x} ${-by.y})">${inner}</g>` : inner);

/** Glints coming and going in turn, each at (x, y) and `r` big (on a drawing made bigger `by`, where they fall on it). */
const glints = (spots: [number, number, number?][], ms = 2400, by?: Grow): CardLayer[] =>
  spots.map(([x, y, r], index) => ({
    svg: svg(grown(glint(x, y, r ?? 2.6), by)),
    move: "twinkle",
    ms,
    phase: index / spots.length
  }));
/** Wisps of steam rising in turn, from each spot. */
const steam = (spots: [number, number][], ms = 2600): CardLayer[] =>
  spots.map(([x, y], index) => ({
    svg: svg(wisp(x, y)),
    move: "rise",
    distance: -10,
    ms,
    phase: index / spots.length
  }));
/** A tuft of grass swaying at (x, y). */
const swayingTuft = (x: number, y: number, phase = 0): CardLayer => ({
  svg: svg(tuft(x, y)),
  move: "sway",
  center: { x, y },
  angle: 7,
  ms: 2600,
  phase
});

const thing = (kind: ThingKind, home: CardHome, motion: CardMotion, body: string, more: Partial<CardArt> = {}): CardArt => ({ kind, home, motion, body, ...more });

// ---- Foods and drinks, most of them on a table ----

/** A plate on the table, `rx` wide. */
const plate = (cx: number, rx: number, cy = 64) =>
  shadow(cx, rx + 1, cy + 4) + `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${f(rx * 0.24)}" fill="#FFFFFF"/>` + `<ellipse cx="${cx}" cy="${f(cy - 0.8)}" rx="${f(rx * 0.78)}" ry="${f(rx * 0.16)}" fill="#EEEAE0"/>`;

const date = (x: number, y: number, turn: number) =>
  `<g transform="translate(${x} ${y}) rotate(${turn})">` +
  `<ellipse rx="7.4" ry="4.4" fill="#86401F"/>` +
  `<path d="M-4.6 1.8 Q0 0.4 4.6 2" stroke="#5E2A12" stroke-width="0.9" fill="none" stroke-linecap="round"/>` +
  `<ellipse cx="-1.6" cy="-1.6" rx="3.8" ry="1.4" fill="#B86E3E" opacity="0.9"/>` +
  `<path d="M6.6 -0.6 L8.6 -1.4" stroke="#4E2410" stroke-width="1.3" stroke-linecap="round"/>` +
  `</g>`;

const DATES_GROW: Grow = { k: 1.22, x: 50, y: 63 };
function dates() {
  return svg(plate(50, 33) + grown(date(36, 60, -8) + date(64, 60, 14) + date(50, 61.5, 4) + date(43, 53.5, -22) + date(57, 53.5, 18) + date(50, 46.5, -4), DATES_GROW));
}

function milk() {
  return svg(
    shadow(50, 15, 68) +
      `<path d="M36 26 L64 26 L60.5 65 C60.3 67 59 68 57 68 L43 68 C41 68 39.7 67 39.5 65 Z" fill="#E4F2FA" stroke="#B9D7E8" stroke-width="1.2"/>` +
      `<path d="M37.4 35 L62.6 35 L59.6 64.6 C59.4 66 58.4 66.8 57 66.8 L43 66.8 C41.6 66.8 40.6 66 40.4 64.6 Z" fill="#FFFFFF"/>` +
      `<path d="M58 40 L56.4 63" stroke="#EEF1F2" stroke-width="2.4" stroke-linecap="round"/>` +
      `<ellipse cx="50" cy="35" rx="12.6" ry="2.6" fill="#F4F6F1" stroke="#E2E7EA" stroke-width="0.8"/>` +
      `<ellipse cx="50" cy="26" rx="14" ry="2.8" fill="none" stroke="#B9D7E8" stroke-width="1.2"/>` +
      `<path d="M41.2 28.4 L41.6 33" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round"/>`
  );
}
const MILK_DROP = svg(`<path d="M50 9 C52.6 13 54 15.4 54 17.4 C54 19.6 52.2 21.2 50 21.2 C47.8 21.2 46 19.6 46 17.4 C46 15.4 47.4 13 50 9 Z" fill="#FFFFFF" stroke="#C9DAE5" stroke-width="0.9"/>`);

function honey() {
  return svg(
    shadow(50, 22, 68) +
      `<path d="M33 41 C30 51 32 62 39 66.5 L61 66.5 C68 62 70 51 67 41 C64.5 35 59 33.5 50 33.5 C41 33.5 35.5 35 33 41 Z" fill="#F0A22C"/>` +
      `<path d="M33.6 55 C35 62 39 66.5 44 66.5 L56 66.5 C61 66.5 65 62 66.4 55 C60 59 40 59 33.6 55 Z" fill="#D9861A" opacity="0.75"/>` +
      `<path d="M38 45 C37 50 37.5 54 39.5 58" stroke="#FFD27A" stroke-width="3" fill="none" stroke-linecap="round" opacity="0.85"/>` +
      // The cloth over its mouth, tied with a string.
      `<path d="M35 34.5 C35 27 65 27 65 34.5 L67.5 38 C61 41.5 39 41.5 32.5 38 Z" fill="#F6E5BE"/>` +
      `<ellipse cx="50" cy="29.5" rx="13" ry="3.6" fill="#FBEFD2"/>` +
      `<path d="M34 37 C42 40.4 58 40.4 66 37" stroke="#B4452C" stroke-width="1.8" fill="none" stroke-linecap="round"/>` +
      `<path d="M62 38.6 L65 44 M63 38.8 L61.4 44.6" stroke="#B4452C" stroke-width="1.3" stroke-linecap="round"/>` +
      // Honey running down from under the cloth.
      `<path d="M43 40.6 C43 44 43.6 47.6 45 47.6 C46.4 47.6 47 45 47 40.8 Z" fill="#E08A10"/>` +
      `<path d="M52 41 C52 43 52.4 44.6 53.4 44.6 C54.4 44.6 54.8 43 54.8 41 Z" fill="#E08A10"/>`
  );
}
const HONEY_DROP = svg(`<path d="M45 47.6 C46.4 49.8 47.2 51.2 47.2 52.4 C47.2 53.7 46.2 54.6 45 54.6 C43.8 54.6 42.8 53.7 42.8 52.4 C42.8 51.2 43.6 49.8 45 47.6 Z" fill="#E08A10"/>`);

function water() {
  return svg(
    `<path d="M50 10 C58 22 66 32 66 44 C66 54 59 61 50 61 C41 61 34 54 34 44 C34 32 42 22 50 10 Z" fill="#4BB3F0"/>` +
      `<path d="M60.4 37 C64 45 63 53 56 58" stroke="#2E95D6" stroke-width="2.4" fill="none" stroke-linecap="round" opacity="0.6"/>` +
      `<path d="M41.6 41 C41 47 43 51.6 47 54.4" stroke="#BFE7FF" stroke-width="3" fill="none" stroke-linecap="round"/>` +
      `<circle cx="44.4" cy="35" r="1.9" fill="#E1F4FF"/>`
  );
}
const WATER_POOL = wide(`<ellipse cx="50" cy="69.5" rx="25" ry="4.2" fill="#9AD8FA"/><ellipse cx="50" cy="69.5" rx="15" ry="2.3" fill="none" stroke="#FFFFFF" stroke-width="1" opacity="0.8"/>`);

function bread() {
  return svg(
    shadow(50, 28, 68) +
      `<ellipse cx="50" cy="64" rx="27" ry="4.6" fill="#A8692E"/>` +
      `<path d="M23 63 C23 45 35 34 50 34 C65 34 77 45 77 63 C70 66.5 30 66.5 23 63 Z" fill="#D58F45"/>` +
      `<path d="M28 56 C29 46 37 39 47 37.6" stroke="#EDB66C" stroke-width="4" fill="none" stroke-linecap="round" opacity="0.9"/>` +
      `<path d="M36 47 L43 54 M46 41.5 L54 50 M57 42 L64 49.5" stroke="#A9662A" stroke-width="2.4" stroke-linecap="round"/>` +
      `<path d="M37 46 L42.4 51.4 M47 40.6 L53 47 M58 41.2 L63 46.6" stroke="#F3CF8E" stroke-width="1" stroke-linecap="round" opacity="0.8"/>`
  );
}

function meat() {
  return svg(
    plate(48, 32) +
      `<path d="M66 50.5 L77 47" stroke="#F3EADB" stroke-width="5.4" stroke-linecap="round"/>` +
      `<circle cx="78.4" cy="44.2" r="3.4" fill="#F3EADB"/><circle cx="80.4" cy="48.8" r="3.4" fill="#F3EADB"/>` +
      `<path d="M67 52 L76 49.2" stroke="#DCCDB4" stroke-width="1.2" stroke-linecap="round"/>` +
      `<path d="M24 56 C22 46 31 38.5 43 38.5 C55 38.5 64 44 68.5 51 C64 58.5 52 64 40 63 C31 62.4 25 60.4 24 56 Z" fill="#B4562C"/>` +
      `<path d="M28 57 C34 61 46 62 56 59.5 C50 63.4 34 63.6 28 57 Z" fill="#8E3F1E" opacity="0.7"/>` +
      `<path d="M32 46 C36 42 44 41 51 42.6" stroke="#DA8752" stroke-width="3" fill="none" stroke-linecap="round"/>` +
      `<path d="M37 51 L43 47 M43.5 56 L51.5 50 M52 58 L58.5 53" stroke="#8A3B1A" stroke-width="1.8" stroke-linecap="round"/>`
  );
}

/** An ear of grain whose foot is at (x, top + 20), leaning `lean` degrees: its grains in two rows, and their awns. */
function ear(x: number, top: number, lean: number, grain: string, awn: number, plump: number) {
  let out = "";
  for (let index = 0; index < 6; index += 1) {
    const y = top + index * 3.3;
    const left = { x: f(x - 1.7), y: f(y) };
    const right = { x: f(x + 1.7), y: f(y + 1.6) };
    if (awn) {
      out +=
        `<path d="M${f(left.x - 0.8)} ${f(left.y - 2.4)} L${f(left.x - 0.8 - awn * 0.3)} ${f(left.y - 2.4 - awn)}" stroke="${grain}" stroke-width="0.7" stroke-linecap="round"/>` +
        `<path d="M${f(right.x + 0.8)} ${f(right.y - 2.4)} L${f(right.x + 0.8 + awn * 0.3)} ${f(right.y - 2.4 - awn)}" stroke="${grain}" stroke-width="0.7" stroke-linecap="round"/>`;
    }
    out +=
      `<ellipse cx="${left.x}" cy="${left.y}" rx="${plump}" ry="3.1" transform="rotate(-24 ${left.x} ${left.y})" fill="${grain}"/>` +
      `<ellipse cx="${right.x}" cy="${right.y}" rx="${plump}" ry="3.1" transform="rotate(24 ${right.x} ${right.y})" fill="${grain}"/>`;
  }
  return `<g transform="rotate(${lean} ${x} ${top + 20})">${out}</g>`;
}

/** Stalks of grain standing in the field: each [foot x, ear x, ear top, lean]. */
function grain(stalks: [number, number, number, number][], color: { grain: string; stalk: string; blade: string }, awn: number, plump: number) {
  const stems = stalks
    .map(([foot, x, top]) => `<path d="M${foot} 72 Q${f((foot + x) / 2)} ${f((72 + top + 20) / 2 + 3)} ${x} ${top + 19}" stroke="${color.stalk}" stroke-width="1.8" fill="none" stroke-linecap="round"/>`)
    .join("");
  const blades = stalks
    .map(([foot], index) => {
      const side = index % 2 ? 1 : -1;
      return `<path d="M${foot} 64 C${foot + side * 6} 58 ${foot + side * 11} 55 ${foot + side * 16} 54 C${foot + side * 10} 57 ${foot + side * 5} 60 ${foot} 66 Z" fill="${color.blade}"/>`;
    })
    .join("");
  return svg(shadow(50, 18, 73) + stems + blades + stalks.map(([, x, top, lean]) => ear(x, top, lean, color.grain, awn, plump)).join(""));
}

const barley = () =>
  grain(
    [
      [44, 36, 18, -14],
      [50, 51, 12, 2],
      [56, 65, 20, 16]
    ],
    { grain: "#D7B04E", stalk: "#B8913A", blade: "#BFAE4A" },
    13,
    1.9
  );
const wheat = () =>
  grain(
    [
      [42, 32, 22, -16],
      [48, 45, 14, -4],
      [53, 57, 15, 6],
      [58, 69, 23, 17]
    ],
    { grain: "#E2B348", stalk: "#C49A3E", blade: "#C8B04A" },
    4,
    2.3
  );

function grapes() {
  const berries: [number, number][] = [
    [41.5, 33],
    [50.5, 32],
    [59.5, 33],
    [37, 40.5],
    [46, 40],
    [55, 40],
    [64, 40.5],
    [41.5, 47.5],
    [50.5, 47.5],
    [59.5, 47.5],
    [46, 55],
    [55, 55],
    [50.5, 62]
  ];
  return svg(
    shadow(50, 16, 68) +
      `<path d="M51 30 C51 24 53 19 57 15" stroke="#6B4A2A" stroke-width="2.4" fill="none" stroke-linecap="round"/>` +
      // A vine leaf, and a curl of the vine.
      `<path d="M56 18 C60 10 70 8 76 12 C80 15 80 20 76 22 C80 25 78 30 72 29 C68 29 64 26 62 24 C60 22 57 21 56 18 Z" fill="#6AA848"/>` +
      `<path d="M57 18 C63 18 70 20 75 22 M63 19 C67 15 70 13 73 12 M65 21 C67 25 69 27 71 28" stroke="#4E8A34" stroke-width="0.9" fill="none" stroke-linecap="round"/>` +
      `<path d="M50 27 C46 24 43.6 26 44.6 28.4 C45.6 30.4 48 28.6 46.6 27.2" stroke="#7DB04A" stroke-width="1" fill="none" stroke-linecap="round"/>` +
      berries.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="4.9" fill="#6A3489" stroke="#4E2468" stroke-width="0.7"/><circle cx="${f(x - 1.5)}" cy="${f(y - 1.6)}" r="1.4" fill="#A877C6"/>`).join("")
  );
}

function figs() {
  const seeds: [number, number][] = [
    [64, 50],
    [68, 52],
    [63, 56],
    [67.4, 57],
    [65.6, 60],
    [69.6, 55.4],
    [62.4, 59],
    [66, 47.6]
  ];
  return svg(
    shadow(52, 28, 68) +
      // A whole fig.
      `<path d="M36 34 C38 32 40 32 41 34 C46 40 52 48 52 56 C52 63 46 67 39 67 C32 67 26 63 26 56 C26 48 32 40 36 34 Z" fill="#7A3E66"/>` +
      `<path d="M38.4 33.6 L37.6 28" stroke="#6E7A3A" stroke-width="2.2" stroke-linecap="round"/>` +
      `<path d="M31 53 C31 48 33 45 35.4 42.6" stroke="#A86A93" stroke-width="2.4" fill="none" stroke-linecap="round"/>` +
      // One opened: its pale rim, the pink inside and the seeds.
      `<path d="M64 36 C66 34 68 34 69 36 C74 42 78 50 78 57 C78 64 72 68 66 68 C60 68 54 64 54 57 C54 50 59 42 64 36 Z" fill="#7A3E66"/>` +
      `<path d="M66.5 39.4 C71 45 74.6 51 74.6 57 C74.6 62 70.6 65.2 66 65.2 C61.4 65.2 57.4 62 57.4 57 C57.4 51 61.6 45 66.5 39.4 Z" fill="#F3E3C0"/>` +
      `<path d="M66.4 43.6 C69.4 48 71.6 52.6 71.6 57 C71.6 60.6 69 62.6 66 62.6 C63 62.6 60.4 60.6 60.4 57 C60.4 52.6 63 48 66.4 43.6 Z" fill="#E2506F"/>` +
      seeds.map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="0.8" ry="0.6" fill="#FBE3B0"/>`).join("")
  );
}

const OLIVES_GROW: Grow = { k: 1.24, x: 50, y: 67 };
function olives() {
  const fruit: [number, number, string][] = [
    [44, 44.4, "#8A9A3A"],
    [53, 43.4, "#4B3A52"],
    [40, 49, "#4B3A52"],
    [48, 47.6, "#8A9A3A"],
    [56, 48.6, "#8A9A3A"],
    [62, 50, "#4B3A52"]
  ];
  return svg(
    shadow(50, 27, 68) +
      grown(
        // A sprig of the olive tree, with two olives on it.
        `<path d="M62 42 C68 36 76 31 86 28" stroke="#7B6A4A" stroke-width="1.4" fill="none" stroke-linecap="round"/>` +
          leaf(72, 31.6, 62, "#9CB07A", 0.8, "#7A8E58") +
          leaf(80, 26.4, 30, "#9CB07A", 0.8, "#7A8E58") +
          leaf(70, 38.6, 120, "#A9BC88", 0.75, "#7A8E58") +
          leaf(84, 33.4, 110, "#A9BC88", 0.7, "#7A8E58") +
          `<ellipse cx="76.6" cy="35" rx="2.8" ry="2" fill="#4B3A52"/><ellipse cx="66" cy="42.6" rx="2.8" ry="2" fill="#8A9A3A"/>` +
          // The bowl of olives.
          fruit.map(([x, y, color]) => `<ellipse cx="${x}" cy="${y}" rx="4.6" ry="3.3" fill="${color}"/><ellipse cx="${f(x - 1.4)}" cy="${f(y - 1.2)}" rx="1.4" ry="0.8" fill="#FFFFFF" opacity="0.45"/>`).join("") +
          `<path d="M30 51 L70 51 C69 60.6 62 67 50 67 C38 67 31 60.6 30 51 Z" fill="#E6DDC8"/>` +
          `<path d="M30 51 C38 53.4 62 53.4 70 51" stroke="#F6F1E6" stroke-width="2" fill="none" stroke-linecap="round"/>` +
          `<path d="M35 58 C40 61 60 61 65 58" stroke="#5C8AB8" stroke-width="1.6" fill="none" stroke-linecap="round"/>`,
        OLIVES_GROW
      )
  );
}

function oil() {
  return svg(
    shadow(50, 20, 68) +
      `<path d="M44 21 L56 21 L56 31 C64 35 68 42 68 52 C68 61 61 67 50 67 C39 67 32 61 32 52 C32 42 36 35 44 31 Z" fill="#EEF5E8" stroke="#C3D3BC" stroke-width="1"/>` +
      `<path d="M33.2 46 L66.8 46 C67.6 48 68 50 68 52 C68 61 61 67 50 67 C39 67 32 61 32 52 C32 50 32.4 48 33.2 46 Z" fill="#C9B232"/>` +
      `<ellipse cx="50" cy="46" rx="16.8" ry="2.6" fill="#DCC852"/>` +
      `<path d="M37 52 C37 57 40 61 44 63" stroke="#E6D46E" stroke-width="2" fill="none" stroke-linecap="round" opacity="0.8"/>` +
      `<path d="M38.6 37 C36.6 39.6 35.4 41.6 35 43.6" stroke="#FFFFFF" stroke-width="2" fill="none" stroke-linecap="round"/>` +
      `<rect x="42.6" y="19.4" width="14.8" height="3.2" rx="1.6" fill="#D5E4CF"/>` +
      `<rect x="45" y="12.6" width="10" height="8" rx="2" fill="#B98552"/>` +
      // A sprig of the olive tree by it.
      `<path d="M70 66 C72 60 76 56 82 53" stroke="#7B6A4A" stroke-width="1.3" fill="none" stroke-linecap="round"/>` +
      leaf(76.6, 54.6, 50, "#9CB07A", 0.75, "#7A8E58") +
      leaf(80, 60, 110, "#A9BC88", 0.7, "#7A8E58") +
      `<ellipse cx="73.6" cy="60" rx="2.6" ry="1.9" fill="#8A9A3A"/>`
  );
}

function pomegranate() {
  const seeds: [number, number][] = [
    [62, 48.6],
    [66, 47.6],
    [71, 47.8],
    [75, 49.4],
    [60.6, 52.4],
    [64.6, 52],
    [71.6, 52],
    [75.8, 53.6],
    [62.4, 57],
    [66.4, 57.4],
    [70.6, 57.6],
    [74.4, 57]
  ];
  return svg(
    shadow(52, 30, 68) +
      // A whole one, with its crown.
      `<circle cx="38" cy="50" r="15.5" fill="#C42536"/>` +
      `<path d="M32.5 36.5 L33.4 30.6 L36 34 L38 29.4 L40 34 L42.6 30.6 L43.5 36.5 Z" fill="#A31D2C"/>` +
      `<path d="M28 46 C29 41 32 38 36 37" stroke="#E8707A" stroke-width="2.8" fill="none" stroke-linecap="round"/>` +
      `<path d="M45 61 C49 58 52 54 53 49" stroke="#9E1B2A" stroke-width="2" fill="none" stroke-linecap="round" opacity="0.6"/>` +
      // One opened: its rind, its pith and the red seeds.
      `<ellipse cx="68" cy="54" rx="16" ry="13" fill="#B82233"/>` +
      `<ellipse cx="68" cy="53" rx="13.4" ry="10.6" fill="#F5DFCF"/>` +
      seeds.map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="2.1" ry="1.8" fill="#D81E3C"/><circle cx="${f(x - 0.7)}" cy="${f(y - 0.6)}" r="0.6" fill="#FF9AA8"/>`).join("") +
      `<path d="M68.4 43.4 L68.2 62.6 M56 54.6 L80 54.4" stroke="#F5DFCF" stroke-width="1.5"/>`
  );
}

function banana() {
  const one = (dy: number, color: string, edge: string) =>
    `<g transform="translate(0 ${dy})"><path d="M24 50 C32 62 56 66 74 52 C76 50 78.6 50.6 78 53 C66 70 34 70 22 54 C21 51.6 22.6 48.6 24 50 Z" fill="${color}"/>` +
    `<path d="M26 54 C36 64 56 66 72 56" stroke="${edge}" stroke-width="1.2" fill="none" opacity="0.7"/><circle cx="22.6" cy="52.4" r="1.4" fill="#5E4318"/></g>`;
  return svg(
    shadow(50, 28, 68) +
      one(-10, "#EFC52C", "#C99A16") +
      one(-5, "#F4CF38", "#CFA21C") +
      one(0, "#F9DA48", "#D3A820") +
      `<path d="M75 43 C77.4 46 77.6 49 76.4 52" stroke="#A89434" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M76 44 L83 37" stroke="#8C7A2C" stroke-width="3.6" stroke-linecap="round"/>`
  );
}

/** An apple at (x, y), `size` big. */
const appleAt = (x: number, y: number, size: number, color: string, light: string) =>
  `<g transform="translate(${x} ${y}) scale(${size})">` +
  `<path d="M0 -16 C-6 -22 -20 -20 -21 -5 C-22 8 -12 18 -4 16 C-2 15.5 2 15.5 4 16 C12 18 22 8 21 -5 C20 -20 6 -22 0 -16 Z" fill="${color}"/>` +
  `<path d="M-14 -8 C-13 -12 -10 -14 -7 -14.5" stroke="${light}" stroke-width="3" fill="none" stroke-linecap="round"/>` +
  `<path d="M0 -16 C0 -21 1 -24 3 -27" stroke="#6B4A2A" stroke-width="2.4" fill="none" stroke-linecap="round"/>` +
  `</g>`;

function apple() {
  return svg(shadow(48, 30, 68) + appleAt(65, 50.5, 0.78, "#8CC63F", "#C8E68A") + appleAt(42, 50, 1, "#DE302E", "#FF8E80") + `<path d="M45 23 C49 17 56 17 59 19 C55 24 49 25 45 23 Z" fill="#5FAE3E"/>`);
}

function mango() {
  return svg(
    shadow(50, 24, 68) +
      `<path d="M27 50 C27 38 39 31 54 32 C67 33 76 41 74 52 C72 62 62 67.5 49 67 C36 66.5 27 60 27 50 Z" fill="#F5B03C"/>` +
      `<path d="M54 32 C67 33 76 41 74 52 C69 46 61 41 49 39.5 C48.6 36 50.6 33 54 32 Z" fill="#E85D3A" opacity="0.9"/>` +
      `<path d="M33 46 C34 41 38 37.6 43 36.4" stroke="#FFD98A" stroke-width="3" fill="none" stroke-linecap="round"/>` +
      `<path d="M30 56 C34 62 42 65 50 65" stroke="#E0952A" stroke-width="1.6" fill="none" opacity="0.6"/>` +
      `<path d="M55 32 L58.4 26.6" stroke="#5E7A2E" stroke-width="2.4" stroke-linecap="round"/>` +
      `<path d="M58.4 26.6 C65 18.6 77 16.6 86 18.6 C80 26 70 29 58.4 26.6 Z" fill="#4E9A3C"/>` +
      `<path d="M60 26 C68 23 76 21 84 19" stroke="#3C7E2C" stroke-width="0.9" fill="none"/>`
  );
}

function rice() {
  const grains: [number, number, number][] = [
    [38, 44, -20],
    [44, 40, 15],
    [50, 37.5, -10],
    [56, 40, 25],
    [62, 44, -15],
    [42, 45.6, 40],
    [48, 43, 0],
    [54, 44.5, -35],
    [60, 46.4, 10],
    [35, 46.6, 5],
    [65, 46.8, 30],
    [46, 36.6, 30],
    [56, 36.8, -25]
  ];
  return svg(
    shadow(50, 22, 68) +
      `<path d="M29 48 C30 37.6 40 32.6 50 32.6 C60 32.6 70 37.6 71 48 Z" fill="#FBFAF3"/>` +
      grains.map(([x, y, turn]) => `<ellipse cx="${x}" cy="${y}" rx="1.7" ry="0.65" transform="rotate(${turn} ${x} ${y})" fill="#E1DAC6"/>`).join("") +
      `<path d="M27 47.4 L73 47.4 C72 58.6 63.6 66 50 66 C36.4 66 28 58.6 27 47.4 Z" fill="#4A7FC1"/>` +
      `<path d="M30 53.6 C40 56.6 60 56.6 70 53.6" stroke="#F2F6FC" stroke-width="1.6" fill="none"/>` +
      `<circle cx="40" cy="59" r="1.3" fill="#F2F6FC"/><circle cx="50" cy="60.5" r="1.3" fill="#F2F6FC"/><circle cx="60" cy="59" r="1.3" fill="#F2F6FC"/>` +
      `<rect x="42" y="64.6" width="16" height="3" rx="1.5" fill="#3C6BA8"/>`
  );
}

function gourd() {
  return svg(
    shadow(50, 18, 68) +
      `<path d="M62 22 C68 15 78 17 80.6 25.4 C74 29.6 66 29.4 62 22 Z" fill="#5FA845"/><path d="M63 22.4 C69 23.4 74 24.4 79 25.2" stroke="#3E8A33" stroke-width="0.8" fill="none"/>` +
      `<path d="M47 20 C44 20 43 24 44 30 C45 36 40 40 36 46 C31 54 33 64 42 67 C47 68.5 53 68.5 58 67 C67 64 69 54 64 46 C60 40 55 36 56 30 C57 24 56 20 53 20 Z" fill="#9CCB5E"/>` +
      `<path d="M40 50 C39 56 41 62 45 65 M50 42 L50 66.4 M60 50 C61 56 59 62 55 65 M47 24 L47 33 M53 24 L53 33" stroke="#7DB04A" stroke-width="1.6" fill="none" stroke-linecap="round"/>` +
      `<path d="M38 51 C38 47 40 44 42.6 42" stroke="#C8E89A" stroke-width="2.6" fill="none" stroke-linecap="round"/>` +
      `<path d="M50 20.4 C50 16 52 13 55.4 12" stroke="#6B7A3A" stroke-width="2.2" fill="none" stroke-linecap="round"/>` +
      `<path d="M55.4 12 C60.4 11 62.4 15.4 59.4 16.6 C57.4 17.4 57 14.6 59 14.6" stroke="#7DB04A" stroke-width="1" fill="none" stroke-linecap="round"/>`
  );
}

function vinegar() {
  return svg(
    shadow(46, 22, 68) +
      // A little dish of it, for bread.
      `<ellipse cx="75" cy="64.5" rx="13" ry="3.8" fill="#FFFFFF"/><ellipse cx="75" cy="64" rx="9" ry="2.2" fill="#B9742E"/>` +
      // The cruet.
      `<path d="M41 22 L49 22 L49 34 C58 37 62 44 62 52 C62 61 55 67.5 45 67.5 C35 67.5 28 61 28 52 C28 44 32 37 41 34 Z" fill="#EAF2EE" stroke="#BCCFC6" stroke-width="1"/>` +
      `<path d="M29.4 47 L60.6 47 C61.6 49 62 50.6 62 52 C62 61 55 67.5 45 67.5 C35 67.5 28 61 28 52 C28 50.6 28.4 49 29.4 47 Z" fill="#C27A2C"/>` +
      `<ellipse cx="45" cy="47" rx="15.6" ry="2.4" fill="#D69444"/>` +
      `<path d="M33 52 C33 57 36 61 40 63" stroke="#E7AE68" stroke-width="2" fill="none" stroke-linecap="round" opacity="0.8"/>` +
      `<path d="M35 38.4 C33 41 32 43 31.6 45" stroke="#FFFFFF" stroke-width="2" fill="none" stroke-linecap="round"/>` +
      `<rect x="39.6" y="20" width="10.8" height="3" rx="1.5" fill="#C6D6CE"/>` +
      `<rect x="43.4" y="17" width="3.2" height="4" fill="#D9E7E0"/><circle cx="45" cy="15" r="4.4" fill="#D9E7E0" stroke="#BCCFC6" stroke-width="1"/>`
  );
}

function garlic() {
  return svg(
    shadow(52, 22, 69) +
      `<path d="M50 24 C52 30 60 34 64 42 C70 54 64 66 50 66 C36 66 30 54 36 42 C40 34 48 30 50 24 Z" fill="#F7F1E6" stroke="#C4B496" stroke-width="1.2"/>` +
      `<path d="M50 30 C46 40 44 52 46 65.4 M50 30 C54 40 56 52 54 65.4 M49 31 C40 38 36 50 40 62.4 M51 31 C60 38 64 50 60 62.4" stroke="#DCCFB9" stroke-width="1" fill="none"/>` +
      `<path d="M43 48 C42.6 54 43.6 59 46 63 M57 48 C57.4 54 56.4 59 54 63" stroke="#C9A3C6" stroke-width="1.6" fill="none" stroke-linecap="round" opacity="0.7"/>` +
      `<path d="M50 24.4 C49 20 50 16 52.4 14" stroke="#D7CBB0" stroke-width="2.4" fill="none" stroke-linecap="round"/>` +
      `<path d="M45 66 L44 69 M48 66 L48 70 M52 66 L52 70 M55 66 L56 69" stroke="#C9B996" stroke-width="1" stroke-linecap="round"/>` +
      // A clove by it.
      `<path d="M69 66.6 C67 60.6 71 54.6 76 52.6 C77 57.6 75 63.6 69 66.6 Z" fill="#F4ECDD" stroke="#D9CDB8" stroke-width="0.8"/>`
  );
}

/** A small clay pot on the table, for the mint. */
const MINT_POT =
  shadow(50, 16, 68) +
  `<path d="M38 50 L62 50 L59 66.4 L41 66.4 Z" fill="#C8744A"/>` +
  `<path d="M40 54 L60 54" stroke="#B0603A" stroke-width="1.2"/>` +
  `<rect x="36" y="47" width="28" height="5" rx="2" fill="#D9875C"/>` +
  `<ellipse cx="50" cy="47.6" rx="11.6" ry="1.4" fill="#6E4A30"/>`;
function mintSprig() {
  const mintLeaf = (x: number, y: number, turn: number, size = 1) =>
    `<g transform="translate(${x} ${y}) rotate(${turn}) scale(${size})"><path d="M0 0 C2 -4.6 9 -5.6 12.6 -1 C9.6 3.6 2.6 3.4 0 0 Z" fill="#4CAF58"/><path d="M0.6 -0.2 L10.8 -1.1" stroke="#2F8A40" stroke-width="0.8" fill="none" stroke-linecap="round"/></g>`;
  return svg(
    `<path d="M49 48 C48.4 38 47 30 45.6 20 M51 48 C52.6 40 55.6 33 59.6 25" stroke="#3C8C46" stroke-width="2" fill="none" stroke-linecap="round"/>` +
      mintLeaf(48.6, 42, 200) +
      mintLeaf(48, 36, -10, 0.95) +
      mintLeaf(47, 30, 195, 0.9) +
      mintLeaf(46.4, 24, -25, 0.8) +
      mintLeaf(52.6, 41, -12, 0.95) +
      mintLeaf(54.6, 35, 190, 0.9) +
      mintLeaf(57, 30, -30, 0.85) +
      mintLeaf(59.4, 25.6, 205, 0.75) +
      `<path d="M45.6 20 C44 16 45 13 47 12 C48 15 47.4 18 45.6 20 Z M59.6 25 C60 20.6 62 18.6 64.4 18.4 C64 21.4 62.4 23.6 59.6 25 Z" fill="#5EC06A"/>`
  );
}

function citron() {
  const bumps: [number, number][] = [
    [36, 44],
    [44, 39],
    [54, 38],
    [64, 42],
    [70, 50],
    [62, 58],
    [50, 61],
    [38, 57],
    [46, 50],
    [57, 49],
    [32, 51]
  ];
  return svg(
    shadow(52, 26, 68) +
      `<path d="M26 50 C26 38 38 32 52 32 C66 32 76 40 76 50 C76 60 66 67 52 67 C38 67 26 62 26 50 Z" fill="#F4D23E"/>` +
      `<path d="M30 57 C36 64 56 67 68 61 C62 66.6 40 68 30 57 Z" fill="#DDB52A" opacity="0.8"/>` +
      bumps.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="0.9" fill="#E0B92A"/>`).join("") +
      `<path d="M33 44 C35 39 40 36 46 35" stroke="#FCEA8E" stroke-width="3" fill="none" stroke-linecap="round"/>` +
      `<circle cx="76.6" cy="50" r="1.8" fill="#D9B528"/>` +
      `<path d="M26.6 47 L20 42" stroke="#6B7A3A" stroke-width="2" stroke-linecap="round"/>` +
      `<path d="M20 42 C13.6 34.6 15.6 26.6 23.6 24.6 C25.6 32.6 23.6 38.6 20 42 Z" fill="#4E9A3C"/><path d="M20 41 C21 35 22 30 23.2 25.6" stroke="#3C7E2C" stroke-width="0.8" fill="none"/>`
  );
}

function coffee() {
  return svg(
    `<ellipse cx="50" cy="66" rx="25" ry="4.8" fill="#F3EEE4" stroke="#DCD3C2" stroke-width="1"/>` +
      `<ellipse cx="50" cy="65.4" rx="15" ry="2.4" fill="#E5DDCD"/>` +
      `<path d="M65 45 C74 44 75 55 64.4 56.6" stroke="#2E7F8C" stroke-width="3.6" fill="none" stroke-linecap="round"/>` +
      `<path d="M33.5 40 L66.5 40 L63.6 58.6 C62.8 63 58 65.4 50 65.4 C42 65.4 37.2 63 36.4 58.6 Z" fill="#3A97A6"/>` +
      `<path d="M37.4 46 C38 52 38.8 56 40.4 59" stroke="#7CC6D2" stroke-width="2.4" fill="none" stroke-linecap="round"/>` +
      `<ellipse cx="50" cy="40" rx="16.5" ry="3.4" fill="#2E7F8C"/>` +
      `<ellipse cx="50" cy="40.4" rx="14.6" ry="2.6" fill="#5A3218"/>` +
      `<ellipse cx="46" cy="40" rx="5" ry="0.9" fill="#8A5634" opacity="0.8"/>`
  );
}

const FRUIT_GROW: Grow = { k: 1.2, x: 50, y: 67 };
function fruit() {
  return svg(
    shadow(50, 32, 68) +
      grown(
        // A banana across the back, grapes, an orange and an apple, in a wooden bowl.
        `<path d="M28 40 C36 32 58 30 72 38 C73.6 39 73 41 71.4 40.6 C58 35 38 36 30 42.6 C28.6 43.6 27 41.6 28 40 Z" fill="#F6D23C"/>` +
          [
            [62, 40],
            [68, 41],
            [65, 45.4],
            [71, 46],
            [59, 45.6],
            [68, 50]
          ]
            .map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3.6" fill="#6A3489" stroke="#4E2468" stroke-width="0.6"/><circle cx="${x - 1}" cy="${y - 1.2}" r="1" fill="#A877C6"/>`)
            .join("") +
          `<circle cx="37" cy="45" r="8.6" fill="#F59A2C"/><circle cx="35" cy="42.6" r="2.2" fill="#FFC27A"/><circle cx="37.6" cy="37.4" r="0.9" fill="#6B8A2E"/>` +
          appleAt(51, 46.4, 0.5, "#DE302E", "#FF8E80") +
          `<path d="M24 50 L76 50 C75 60 66 67 50 67 C34 67 25 60 24 50 Z" fill="#B97A45"/>` +
          `<path d="M24 50 C34 53 66 53 76 50" stroke="#D59A62" stroke-width="2.2" fill="none" stroke-linecap="round"/>` +
          `<path d="M30 58 C40 61 60 61 70 58" stroke="#9C6436" stroke-width="1.2" fill="none" opacity="0.7"/>`,
        FRUIT_GROW
      )
  );
}

// ---- Plants ----

function tree() {
  return svg(
    shadow(50, 22, 73) +
      `<path d="M45 73 C46.5 62 46.5 52 44 44 L56 44 C53.5 52 53.5 62 55 73 Z" fill="#8A5A34"/>` +
      `<path d="M48 50 C44 46 40 44 36 43 M52 48 C56 44 60 42 64 42" stroke="#8A5A34" stroke-width="3" fill="none" stroke-linecap="round"/>` +
      `<path d="M50.4 58 L50.6 70" stroke="#6E4628" stroke-width="1.4" stroke-linecap="round" opacity="0.6"/>` +
      `<circle cx="34" cy="36" r="12.5" fill="#4C9C3F"/><circle cx="66" cy="36" r="12.5" fill="#4C9C3F"/>` +
      `<circle cx="50" cy="30" r="18" fill="#5BAE4A"/>` +
      `<circle cx="41" cy="20" r="11" fill="#6ABE55"/><circle cx="59" cy="21" r="10" fill="#6ABE55"/>` +
      `<circle cx="44" cy="16.4" r="3.6" fill="#8ED673" opacity="0.8"/><circle cx="62" cy="18.6" r="2.6" fill="#8ED673" opacity="0.8"/>` +
      `<path d="M30 44 C36 48 44 49 50 48 C56 49 64 48 70 44" stroke="#3E8A33" stroke-width="2" fill="none" opacity="0.6"/>`
  );
}

/** A date palm whose trunk stands at (foot, ground), as tall as `top`: its fronds, and clusters of dates under them. */
function palmAt(foot: number, top: number, size = 1, ground = 73) {
  const height = ground - top;
  const x = (y: number) => foot + ((ground - y) / height) * 6;
  const rings = Array.from({ length: Math.floor((height - 8) / 6) }, (_, index) => {
    const y = ground - 6 * (index + 1);
    return `<path d="M${f(x(y) - 1.6 * size)} ${y} q${f(2.6 * size)} ${f(1.4 * size)} ${f(5.2 * size)} 0" stroke="#7A5030" stroke-width="1.2" fill="none" stroke-linecap="round"/>`;
  }).join("");
  const crown = { x: f(x(top) + 1.6 * size), y: top };
  const frond = (d: string, color: string) => `<path d="${d}" fill="${color}" transform="translate(${crown.x} ${crown.y}) scale(${size})"/>`;
  const fronds =
    frond("M0 0 C-10 -8 -24 -8 -36 2 C-24 -2 -12 -2 0 3 Z", "#4FA444") +
    frond("M0 0 C-8 -12 -18 -18 -30 -18 C-18 -14 -8 -8 -1 2 Z", "#3E8E36") +
    frond("M1 -1 C2 -12 8 -20 18 -22 C10 -16 6 -8 3 1 Z", "#4FA444") +
    frond("M2 0 C12 -10 26 -12 36 -4 C26 -6 14 -4 3 3 Z", "#3E8E36") +
    frond("M2 1 C14 0 26 6 32 16 C24 8 12 4 2 4 Z", "#4FA444") +
    frond("M-1 2 C-12 4 -24 10 -30 20 C-20 12 -10 7 0 5 Z", "#3E8E36");
  const dates = [
    [-5, 6],
    [-7.6, 9],
    [-4, 10],
    [-8, 5.6],
    [6, 6],
    [8.6, 9],
    [5, 10],
    [9.4, 5.4]
  ]
    .map(([dx, dy], index) => `<circle cx="${f(crown.x + dx * size)}" cy="${f(crown.y + dy * size)}" r="${f(1.7 * size)}" fill="${index % 3 ? "#C2621E" : "#9A4A16"}"/>`)
    .join("");
  return (
    `<path d="M${f(foot - 3.6 * size)} ${ground} C${f(foot - 2.6 * size)} ${f(ground - height * 0.4)} ${f(x(top) - 3 * size)} ${f(top + height * 0.3)} ${f(x(top) - 0.6 * size)} ${top + 1} L${f(x(top) + 3.8 * size)} ${top + 1} C${f(x(top) + 1.4 * size)} ${f(top + height * 0.3)} ${f(foot + 2.4 * size)} ${f(ground - height * 0.4)} ${f(foot + 3.4 * size)} ${ground} Z" fill="#9A6A3C"/>` +
    rings +
    dates +
    fronds
  );
}

const palm = () => svg(shadow(52, 18, 73) + palmAt(50, 28));

function leaves() {
  return svg(
    // A branch at the top, and the leaves fallen on the ground.
    `<path d="M0 9 C14 11 26 13 42 10" stroke="#7E5430" stroke-width="2.4" fill="none" stroke-linecap="round"/>` +
      leaf(16, 15.4, 160, "#5DAE4B", 0.9) +
      leaf(28, 7.6, 30, "#6ABE55", 0.85) +
      leaf(38, 15, 150, "#8CC24A", 0.8) +
      leaf(30, 68, 70, "#A9C94A", 1.1, "#7A9A30") +
      leaf(46, 66, -60, "#5DAE4B", 1.1) +
      leaf(62, 69, 100, "#E3A13B", 1.1, "#B57A22") +
      leaf(74, 66, -30, "#8CC24A", 1, "#5E8F2E") +
      leaf(54, 71, 20, "#C9B23A", 0.95, "#9A8A22")
  );
}

function seed() {
  return svg(
    shadow(46, 18, 68) +
      // The tiny seeds on the ground.
      `<circle cx="24" cy="64" r="1.2" fill="#B98A2E"/><circle cx="28.6" cy="65.6" r="1" fill="#B98A2E"/><circle cx="64" cy="66.4" r="1.1" fill="#B98A2E"/>` +
      // A glass over one, showing it big.
      `<path d="M57.6 55.6 L72 70" stroke="#6E4E2E" stroke-width="6.4" stroke-linecap="round"/>` +
      `<path d="M57.4 55.4 L61 59" stroke="#B9B9C0" stroke-width="6.6"/>` +
      `<circle cx="46" cy="44" r="16" fill="#E6F4FB" opacity="0.88"/>` +
      `<circle cx="46" cy="47" r="6.4" fill="#C8952E"/><circle cx="44" cy="45" r="2" fill="#E9C46E"/>` +
      `<path d="M41.6 50.6 C44.6 53 48.6 53 51.4 50.4" stroke="#9E7022" stroke-width="1" fill="none" stroke-linecap="round"/>` +
      `<circle cx="46" cy="44" r="16" fill="none" stroke="#8A6A44" stroke-width="3.6"/>` +
      `<path d="M36 36 C38 32 42 30 46 30" stroke="#FFFFFF" stroke-width="2.4" fill="none" stroke-linecap="round" opacity="0.9"/>`
  );
}

const GARDEN_GRASS = wide(`<path d="M0 56 C22 52 40 55 60 53 C78 52 90 54 100 55 L100 80 L0 80 Z" fill="#8ACB5C"/><path d="M0 68 C30 64 60 67 100 65 L100 80 L0 80 Z" fill="#79BC4E"/>`);
function garden() {
  const flower = (x: number, y: number, color: string) =>
    [0, 72, 144, 216, 288].map((a) => `<circle cx="${f(x + 2.2 * Math.cos((a * Math.PI) / 180))}" cy="${f(y + 2.2 * Math.sin((a * Math.PI) / 180))}" r="1.8" fill="${color}"/>`).join("") +
    `<circle cx="${x}" cy="${y}" r="1.4" fill="#FFD23F"/>`;
  return svg(
    // A fruit tree, a date palm, and flowers.
    `<rect x="27.6" y="44" width="5" height="26" rx="2" fill="#8A5A34"/>` +
      `<circle cx="30" cy="36" r="14" fill="#56A845"/><circle cx="23.6" cy="30" r="8" fill="#68BA55"/><circle cx="37" cy="29" r="7.4" fill="#68BA55"/>` +
      `<circle cx="25" cy="38" r="2.2" fill="#E2413A"/><circle cx="35" cy="34" r="2.2" fill="#E2413A"/><circle cx="31" cy="42.6" r="2.2" fill="#E2413A"/><circle cx="28" cy="27" r="2" fill="#E2413A"/>` +
      palmAt(70, 26, 0.8, 70) +
      flower(44, 66, "#F28AB2") +
      flower(54.6, 69.4, "#FFFFFF") +
      flower(62, 64.6, "#F7A23B") +
      flower(18, 70, "#F28AB2") +
      flower(86, 69, "#FFFFFF") +
      `<path d="M44 68 L44 72 M54.6 71.4 L54.6 74 M62 66.6 L62 71 M18 72 L18 75 M86 71 L86 74" stroke="#4E9A3C" stroke-width="1" stroke-linecap="round"/>`
  );
}

function thorn() {
  const spikes: [number, number, number][] = [
    [49.6, 60, -1],
    [50.6, 52, 1],
    [49.4, 44, -1],
    [50.8, 37, 1],
    [50.2, 29, -1],
    [51.2, 22, 1],
    [57, 41.6, 1],
    [63, 37.6, -1],
    [43, 32, 1],
    [37.6, 27.4, -1]
  ];
  return svg(
    shadow(50, 14, 68) +
      `<path d="M50 68 C49 58 52 48 50 38 C48.6 30 50 24 52 16" stroke="#7A5A3A" stroke-width="3" fill="none" stroke-linecap="round"/>` +
      `<path d="M50.6 46 C56 43 62 40 68 34 M49.6 36 C44 33 39 30 34 24" stroke="#7A5A3A" stroke-width="2.2" fill="none" stroke-linecap="round"/>` +
      spikes.map(([x, y, side]) => `<path d="M${x} ${f(y - 1.5)} L${f(x + side * 6.4)} ${f(y - 3.6)} L${x} ${f(y + 1.5)} Z" fill="#5E4128"/>`).join("") +
      leaf(70, 31.6, 50, "#7DA84A", 0.6, "#5A7E32") +
      leaf(32.6, 21.6, -40, "#7DA84A", 0.6, "#5A7E32") +
      leaf(53, 13.6, 20, "#7DA84A", 0.55, "#5A7E32")
  );
}

// ---- The sky and the weather ----

function sun() {
  return svg(
    `<circle cx="50" cy="40" r="23" fill="#FFF0B3" opacity="0.6"/>` +
      `<circle cx="50" cy="40" r="16.5" fill="#FFC531"/><circle cx="50" cy="40" r="13" fill="#FFD655"/>` +
      `<path d="M42 34 C44 31 47 29.6 50 29.4" stroke="#FFF2B8" stroke-width="2.6" fill="none" stroke-linecap="round"/>`
  );
}
const SUN_RAYS = svg(rays(50, 40, 25, 34, 12, 3.6, "#FFC531") + rays(50, 40, 25.5, 30, 12, 2, "#FFE07A"));

function moon() {
  return svg(
    `<circle cx="50" cy="38" r="16" fill="#F4F0DC"/>` +
      `<circle cx="44" cy="33" r="3.2" fill="#DCD6BC"/><circle cx="56" cy="42" r="4" fill="#DCD6BC"/><circle cx="46.6" cy="45.4" r="2" fill="#DCD6BC"/><circle cx="57" cy="31" r="1.8" fill="#DCD6BC"/><circle cx="38.6" cy="41" r="1.4" fill="#DCD6BC"/>` +
      `<path d="M37 32 C39 27 43 24.4 47 23.6" stroke="#FFFFFF" stroke-width="2" fill="none" stroke-linecap="round" opacity="0.7"/>`
  );
}
const MOON_GLOW = svg(`<circle cx="50" cy="38" r="25" fill="#FFF6D6" opacity="0.14"/><circle cx="50" cy="38" r="20.5" fill="#FFF6D6" opacity="0.2"/>`);

function star() {
  return svg(
    `<circle cx="50" cy="41" r="21" fill="#FFF3B0" opacity="0.16"/>` +
      `<path d="${starPath(50, 41.6, 17, 7.4)}" fill="#FFD23F" stroke="#F2B51F" stroke-width="1.4" stroke-linejoin="round"/>` +
      `<path d="${starPath(50, 41.6, 8.6, 3.8)}" fill="#FFE98A"/>`
  );
}
const littleStars = (spots: [number, number, number][]) => svg(spots.map(([x, y, r]) => `<path d="${starPath(x, y, r, r * 0.45)}" fill="#FFF1A8"/>`).join(""));

function cloud() {
  return svg(
    `<g fill="#FFFFFF"><circle cx="34" cy="44" r="12"/><circle cx="50" cy="35" r="15.5"/><circle cx="66" cy="43" r="12.5"/><circle cx="76.4" cy="50.4" r="8"/><circle cx="23.6" cy="51.4" r="8"/><rect x="23.6" y="44" width="52.8" height="15.4" rx="7.7"/></g>` +
      `<path d="M17 54 C24 61 74 61.6 84 53.4 C82.4 58.6 77 60 72 60 L28 60 C22 60 18.4 57.6 17 54 Z" fill="#DCE9F5"/>` +
      `<path d="M58 30 C62 32 64 35 64.6 38" stroke="#E3EEF8" stroke-width="2.2" fill="none" stroke-linecap="round"/>`
  );
}

function rainCloud() {
  return svg(
    `<g fill="#7F90A4"><circle cx="27" cy="22" r="12"/><circle cx="43" cy="14" r="14"/><circle cx="59" cy="15" r="13"/><circle cx="74" cy="22" r="12"/><rect x="15" y="20" width="71" height="15" rx="7.5"/></g>` +
      `<g fill="#95A5B7"><circle cx="43" cy="12" r="10"/><circle cx="59" cy="13" r="8.6"/><circle cx="28" cy="20" r="7"/></g>` +
      `<path d="M18 30 C30 35 70 35 83 30" stroke="#6E7F93" stroke-width="2" fill="none" stroke-linecap="round" opacity="0.7"/>`
  );
}
const RAIN_DROPS = wide(
  (
    [
      [12, 6],
      [30, 3],
      [48, 8],
      [66, 4],
      [84, 7],
      [20, 18],
      [40, 22],
      [58, 19],
      [76, 21],
      [92, 16],
      [10, 32],
      [28, 36],
      [50, 33],
      [68, 37],
      [86, 31],
      [18, 48],
      [38, 50],
      [58, 47],
      [78, 51],
      [94, 45],
      [8, 62],
      [28, 64],
      [46, 60],
      [66, 63],
      [86, 61]
    ] as [number, number][]
  )
    .map(([x, y]) => `<path d="M${x} ${y} l-1.2 6" stroke="#EAF4FF" stroke-width="1.6" stroke-linecap="round"/>`)
    .join("")
);
const RAIN_SPLASHES = wide(`<path d="M16 74 q3 -3 6 0 M44 77 q3 -3 6 0 M72 73 q3 -3 6 0 M88 77 q2.4 -2.4 4.8 0" stroke="#EAF4FF" stroke-width="1.2" fill="none" stroke-linecap="round"/>`);

/** Lines of wind, white over a soft blue edge so they show on the sky. */
const gust = (d: string, width = 3.2) =>
  `<path d="${d}" stroke="#A5D3F2" stroke-width="${width + 2}" fill="none" stroke-linecap="round"/><path d="${d}" stroke="#FFFFFF" stroke-width="${width}" fill="none" stroke-linecap="round"/>`;
function wind() {
  return svg(
    gust("M12 30 C28 30 42 28 54 28 C63 28 67 21.6 63 17.6 C59 13.6 53 17 55.6 21") +
      gust("M18 44 C38 44 58 44 70 44 C79 44 83 37.6 79 33.6 C75 29.6 69 33 71.6 37") +
      gust("M10 58 C24 58 36 58 46 58 C53 58 57 62.6 53.6 66.4 C50 70 45.6 66.6 47.6 63.6")
  );
}
const WIND_LEAVES = wide(
  leaf(22, 22, 70, "#7CC25A", 0.65) +
    leaf(60, 52, -20, "#E0A43A", 0.65, "#B57A22") +
    leaf(86, 34, 110, "#A6C94A", 0.6, "#6E8E2E") +
    `<path d="M30 70 L44 70 M70 14 L82 14 M4 46 L14 46" stroke="#FFFFFF" stroke-width="1.6" stroke-linecap="round" opacity="0.9"/>`
);

function air() {
  return svg(
    gust("M50 42 m-17 0 a17 13 0 1 1 34 0 a12.6 9.6 0 1 1 -25.2 0 a7.8 6 0 1 1 15.6 0", 2.6) +
      gust("M14 64 C26 60 36 66 48 62", 2.2) +
      gust("M60 18 C68 14 76 18 86 14", 2.2) +
      `<circle cx="24" cy="30" r="1.6" fill="#FFFFFF"/><circle cx="80" cy="56" r="1.8" fill="#FFFFFF"/><circle cx="74" cy="64" r="1.1" fill="#FFFFFF"/>`
  );
}
const AIR_WISPS = wide(`<path d="M6 30 C14 28 20 32 28 30 M64 70 C72 68 78 72 86 70 M40 10 C46 8 52 12 58 10" stroke="#FFFFFF" stroke-width="1.4" fill="none" stroke-linecap="round" opacity="0.85"/>`);

/** A snowflake about (cx, cy), its arms `r` long, white over a blue edge. */
function snowflake(cx: number, cy: number, r: number) {
  let d = "";
  for (let index = 0; index < 6; index += 1) {
    const a = (index * Math.PI) / 3 - Math.PI / 2;
    d += `M${cx} ${cy} L${f(cx + r * Math.cos(a))} ${f(cy + r * Math.sin(a))} `;
    for (const [at, length] of [
      [0.52, 0.3],
      [0.78, 0.22]
    ]) {
      const bx = cx + r * at * Math.cos(a);
      const by = cy + r * at * Math.sin(a);
      for (const side of [-1, 1]) {
        const b = a + (side * Math.PI) / 4;
        d += `M${f(bx)} ${f(by)} L${f(bx + r * length * Math.cos(b))} ${f(by + r * length * Math.sin(b))} `;
      }
    }
  }
  return `<path d="${d}" stroke="#8FC0E4" stroke-width="4.4" stroke-linecap="round" fill="none"/><path d="${d}" stroke="#FFFFFF" stroke-width="2.4" stroke-linecap="round" fill="none"/><circle cx="${cx}" cy="${cy}" r="3" fill="#FFFFFF"/>`;
}
const SNOW_DRIFT = svg(`<path d="M18 70 C26 62 38 61 48 65 C56 60 70 60 82 70 Z" fill="#FFFFFF"/><path d="M26 68 C34 64 42 64 48 66.4" stroke="#D6E8F5" stroke-width="1.4" fill="none" stroke-linecap="round"/>`);
const SNOW_FLAKES = wide(
  (
    [
      [10, 8, 1.6],
      [34, 4, 1.3],
      [58, 10, 1.8],
      [82, 5, 1.4],
      [22, 22, 1.4],
      [46, 26, 1.2],
      [70, 21, 1.6],
      [92, 27, 1.3],
      [8, 40, 1.3],
      [30, 44, 1.7],
      [56, 40, 1.3],
      [80, 46, 1.6],
      [18, 60, 1.6],
      [42, 58, 1.3],
      [66, 62, 1.5],
      [90, 59, 1.2],
      [30, 73, 1.2],
      [76, 74, 1.4]
    ] as [number, number, number][]
  )
    .map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#FFFFFF"/>`)
    .join("")
);

/** An ice cube with its top at (cx, cy), `s` across. */
function cube(cx: number, cy: number, s: number) {
  const h = s * 0.5;
  return (
    `<path d="M${cx} ${f(cy - h)} L${f(cx + s)} ${cy} L${cx} ${f(cy + h)} L${f(cx - s)} ${cy} Z" fill="#EAF7FF"/>` +
    `<path d="M${f(cx - s)} ${cy} L${cx} ${f(cy + h)} L${cx} ${f(cy + h + s)} L${f(cx - s)} ${f(cy + s)} Z" fill="#BFE4F7"/>` +
    `<path d="M${cx} ${f(cy + h)} L${f(cx + s)} ${cy} L${f(cx + s)} ${f(cy + s)} L${cx} ${f(cy + h + s)} Z" fill="#A2D2EE"/>` +
    `<path d="M${f(cx - s * 0.7)} ${f(cy + s * 0.3)} L${f(cx - s * 0.7)} ${f(cy + s * 0.75)}" stroke="#FFFFFF" stroke-width="1.6" stroke-linecap="round"/>` +
    `<path d="M${f(cx - s * 0.4)} ${f(cy - h * 0.2)} L${f(cx + s * 0.1)} ${f(cy - h * 0.6)}" stroke="#FFFFFF" stroke-width="1.4" stroke-linecap="round"/>`
  );
}
const ICE_GROW: Grow = { k: 1.3, x: 50, y: 67 };
function ice() {
  return svg(grown(shadow(50, 26, 68) + `<ellipse cx="50" cy="67" rx="24" ry="3" fill="#CFEAF8" opacity="0.8"/>` + cube(36, 50, 11) + cube(62, 51, 11) + cube(49, 36, 10), ICE_GROW));
}

// ---- The earth and its waters ----

const SAND_DUNES = wide(
  `<path d="M0 48 C18 40 34 42 50 48 C64 42 82 38 100 46 L100 80 L0 80 Z" fill="#EBC27E"/>` +
    `<path d="M0 60 C22 54 44 56 60 62 C76 56 90 56 100 58 L100 80 L0 80 Z" fill="#F2D295"/>` +
    `<path d="M14 52 C24 49 32 50 40 53 M60 50 C70 47 80 46 90 49 M8 68 C18 65 28 66 36 69 M66 68 C76 65 86 65 94 67" stroke="#D9A85C" stroke-width="1" fill="none" stroke-linecap="round" opacity="0.8"/>`
);
const SAND_HEAP = svg(
  shadow(50, 28, 72) +
    `<path d="M22 71 C30 57 41 50 50 50 C59 50 70 57 78 71 Z" fill="#DCA352"/>` +
    `<path d="M50 50 C59 50 70 57 78 71 L62 71 C60 62 56 55 50 50 Z" fill="#C98E40" opacity="0.6"/>` +
    `<path d="M33 64 C41 60 50 60 58 62.4 M39.6 57.6 C45 55.6 51 55.6 56 56.6 M28 69 C40 66 56 66 70 68" stroke="#B57E36" stroke-width="1.2" fill="none" stroke-linecap="round"/>` +
    `<path d="M44 52 C46.6 51 50 50.6 53 51" stroke="#F6D9A2" stroke-width="2" fill="none" stroke-linecap="round"/>`
);
const SAND_BLOWING = wide(
  `<path d="M10 40 l5 0 M40 30 l6 0 M70 44 l5 0 M24 58 l4 0 M86 26 l5 0" stroke="#F7E2B6" stroke-width="1.4" stroke-linecap="round"/><circle cx="18" cy="36" r="0.9" fill="#D9A85C"/><circle cx="52" cy="40" r="0.8" fill="#D9A85C"/><circle cx="80" cy="34" r="0.9" fill="#D9A85C"/><circle cx="34" cy="50" r="0.8" fill="#D9A85C"/><circle cx="64" cy="56" r="0.9" fill="#D9A85C"/>`
);

function dust() {
  const specks: [number, number][] = [
    [36, 62],
    [44, 56],
    [56, 58],
    [62, 64],
    [50, 66],
    [40, 68],
    [66, 69],
    [30, 68]
  ];
  return svg(
    shadow(50, 30, 70) +
      `<path d="M20 69 C28 55 41 48 50 48 C59 48 72 55 80 69 Z" fill="#9C7552"/>` +
      `<path d="M30 60 C36 53 44 50 50 50 C42 52 36 56 32 62 Z" fill="#B48C68"/>` +
      specks.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="0.9" fill="#7A5638"/>`).join("") +
      `<ellipse cx="50" cy="69" rx="30" ry="2" fill="#8A6444"/>`
  );
}
/** A puff of dust or smoke. */
const puff = (x: number, y: number, r: number, color: string, opacity = 0.85) =>
  `<g opacity="${opacity}"><circle cx="${x}" cy="${y}" r="${r}" fill="${color}"/><circle cx="${f(x - r * 0.8)}" cy="${f(y + r * 0.3)}" r="${f(r * 0.7)}" fill="${color}"/><circle cx="${f(x + r * 0.8)}" cy="${f(y + r * 0.25)}" r="${f(r * 0.65)}" fill="${color}"/></g>`;

function smoke() {
  return svg(
    `<ellipse cx="50" cy="67" rx="16" ry="2.4" fill="#000000" opacity="0.1"/>` +
      puff(50, 62, 6.4, "#8E98A3", 0.95) +
      puff(47.6, 48.6, 7.4, "#9CA6B0", 0.8) +
      puff(53, 34.6, 8.6, "#AEB6BE", 0.62) +
      puff(48.6, 20.6, 9.6, "#BEC5CC", 0.45)
  );
}

function fireLogs() {
  return svg(
    `<circle cx="50" cy="44" r="27" fill="#FFB347" opacity="0.14"/>` +
      `<ellipse cx="50" cy="66" rx="28" ry="6" fill="#FF9A3C" opacity="0.3"/>` +
      `<path d="M28 58 L72 68" stroke="#7A4A2A" stroke-width="7.4" stroke-linecap="round"/>` +
      `<path d="M28 68 L72 58" stroke="#8C5A32" stroke-width="7.4" stroke-linecap="round"/>` +
      `<circle cx="72.4" cy="57.8" r="3.4" fill="#D9A56A"/><circle cx="27.6" cy="67.8" r="3.4" fill="#C99558"/>`
  );
}
const FLAMES = svg(
  `<path d="M50 14 C56 26 66 34 66 46 C66 56 59 63 50 63 C41 63 34 56 34 46 C34 38 40 32 42 24 C45 30 46 34 48 36 C48 28 48 22 50 14 Z" fill="#FF7A1F"/>` +
    `<path d="M50 28 C54 36 60 42 60 50 C60 57 55 62 50 62 C45 62 40 57 40 50 C40 44 44 40 46 34 C47 38 48 40 49 41 C49 36 49 32 50 28 Z" fill="#FFB52E"/>` +
    `<path d="M50 40 C53 45 55 49 55 53 C55 58 53 61 50 61 C47 61 45 58 45 53 C45 49 47 45 50 40 Z" fill="#FFE68A"/>`
);
const spark = (x: number, y: number) => svg(`<circle cx="${x}" cy="${y}" r="1.3" fill="#FFD36E"/>`);

const RIVER_BANKS = wide(
  `<path d="M0 36 C16 32 30 35 46 33 C62 31 80 34 100 32 L100 48 L0 48 Z" fill="#9BCF6A"/>` +
    `<circle cx="14" cy="34" r="5" fill="#6BB04F"/><circle cx="22" cy="33" r="4" fill="#5FA445"/><circle cx="78" cy="32" r="5.4" fill="#6BB04F"/><circle cx="87" cy="33" r="4" fill="#5FA445"/>` +
    `<rect y="46" width="100" height="17" fill="#4FAEE6"/>` +
    `<path d="M0 46 C20 47.4 40 45.6 60 47 C76 48 90 46 100 47 L100 49 L0 49 Z" fill="#86CBF2"/>` +
    `<path d="M0 62 C20 60 40 62.6 60 61 C78 60 90 62 100 61 L100 80 L0 80 Z" fill="#8ACB5C"/>` +
    `<path d="M0 63 C20 61 40 63.6 60 62 C78 61 90 63 100 62" stroke="#6FAE45" stroke-width="1.2" fill="none"/>` +
    `<ellipse cx="62" cy="70" rx="4" ry="2" fill="#B3B3A6"/><ellipse cx="68" cy="71.4" rx="2.6" ry="1.4" fill="#C9C9BC"/>`
);
const RIVER_RIPPLES = wide(
  `<path d="M6 51 q4 -2 8 0 M34 55 q4 -2 8 0 M62 50.6 q4 -2 8 0 M86 56 q4 -2 8 0 M20 59 q3 -1.6 6 0 M50 58.4 q3 -1.6 6 0 M76 53 q3 -1.6 6 0" stroke="#FFFFFF" stroke-width="1.2" fill="none" stroke-linecap="round" opacity="0.9"/>`
);
const REEDS = svg(
  `<path d="M18 74 C18 64 17 56 15 48 M21 74 C21 66 22 58 24 51 M24 74 C25 68 27 62 30 57" stroke="#5E9A3A" stroke-width="1.6" fill="none" stroke-linecap="round"/>` +
    `<rect x="13.6" y="44" width="3" height="8" rx="1.5" fill="#8A5A34" transform="rotate(-12 15 48)"/><rect x="22.6" y="47" width="3" height="8" rx="1.5" fill="#8A5A34" transform="rotate(14 24 51)"/>`
);

const SEA_WATER = wide(
  `<rect y="36" width="100" height="44" fill="#2F8FD0"/><rect y="36" width="100" height="5" fill="#5DB0E6"/><rect y="56" width="100" height="24" fill="#2A82C2"/><path d="M0 36 L100 36" stroke="#9BD3F5" stroke-width="1"/>`
);
const SEA_WAVES_NEAR = wide(
  `<path d="M2 66 q6 -5 12 0 M30 72 q6 -5 12 0 M58 65 q6 -5 12 0 M82 73 q6 -5 12 0 M14 78 q5 -4 10 0 M66 79 q5 -4 10 0" stroke="#FFFFFF" stroke-width="1.8" fill="none" stroke-linecap="round" opacity="0.9"/>`
);
const SEA_WAVES_FAR = wide(
  `<path d="M8 45 q4 -2.6 8 0 M36 49 q4 -2.6 8 0 M64 44 q4 -2.6 8 0 M86 50 q4 -2.6 8 0 M20 55 q4 -2.6 8 0 M52 56 q4 -2.6 8 0" stroke="#D9F0FF" stroke-width="1.3" fill="none" stroke-linecap="round" opacity="0.9"/>`
);

const MOUNTAIN_FIELD = wide(`<path d="M0 64 C30 60 70 60 100 64 L100 80 L0 80 Z" fill="#8DC062"/><path d="M0 72 C30 69 70 70 100 72 L100 80 L0 80 Z" fill="#7DB352"/>`);
function mountain() {
  return svg(
    `<path d="M2 68 L26 34 L40 52 L50 66 Z" fill="#9C8B7A"/>` +
      `<path d="M58 66 L76 36 L98 68 Z" fill="#9C8B7A"/><path d="M76 36 L98 68 L84 68 L80 52 Z" fill="#84735F"/>` +
      `<path d="M14 68 L46 18 L80 68 Z" fill="#8C7B6B"/>` +
      `<path d="M46 18 L80 68 L60 68 L54 46 Z" fill="#74624F"/>` +
      `<path d="M46 18 L53.4 29.4 L50 28 L47 31.6 L43.4 28.4 L39.8 30 Z" fill="#FFFFFF"/>` +
      `<path d="M26 34 L30.4 40.4 L27.6 39.4 L25.4 41.4 L23 39.2 Z" fill="#FFFFFF"/><path d="M76 36 L80.6 43.6 L77.6 42.4 L75 44.4 L72.4 41.6 Z" fill="#FFFFFF"/>` +
      `<path d="M4 70 C20 64 34 64 46 68 C58 63 76 63 96 70 Z" fill="#7DB35A"/>`
  );
}
const DRIFTING_CLOUD = wide(`<g fill="#FFFFFF" opacity="0.92"><ellipse cx="20" cy="14" rx="9" ry="3.6"/><ellipse cx="26" cy="11.6" rx="5.4" ry="3.4"/><ellipse cx="16" cy="12.4" rx="4" ry="2.6"/></g>`);

function stone() {
  return svg(
    shadow(50, 30, 70) +
      `<path d="M20 69 C18 60 24 52 34 51 C44 50 50 56 50 63 C50 68 46 70 40 70 L24 70 C22 70 20.4 69.6 20 69 Z" fill="#9A9A96"/>` +
      `<path d="M48 70 C46 62 52 55 62 55 C72 55 80 60 80 66 C80 69 78 70.4 74 70.4 L52 70.4 C50 70.4 48.4 70.4 48 70 Z" fill="#85857F"/>` +
      `<path d="M34 54 C34 46 40 40 48 40 C56 40 61 45 60.4 51 C60 56 55 59 48 59 C40 59 34 58 34 54 Z" fill="#B0AFA9"/>` +
      `<path d="M38 50 C39 46 42 43.6 46 43" stroke="#CFCEC8" stroke-width="2.4" fill="none" stroke-linecap="round"/>` +
      `<path d="M24 60 C25 57 28 55 31 54.4 M54 61 C56 59 59 58 62 58" stroke="#B9B8B2" stroke-width="2" fill="none" stroke-linecap="round"/>` +
      `<ellipse cx="86" cy="70" rx="3.4" ry="2" fill="#A3A39D"/><ellipse cx="14" cy="71" rx="2.6" ry="1.5" fill="#A3A39D"/>`
  );
}

function clay() {
  return svg(
    shadow(48, 30, 70) +
      `<path d="M20 69 C18 58 28 48 42 46 C54 44.4 66 48 72 56 C76 62 74 69 68 70 L24 70 C22 70 20.4 69.8 20 69 Z" fill="#B5654A"/>` +
      `<path d="M26 66 C32 68 56 68.6 70 66 C68 69.4 62 70 56 70 L28 70 C26 70 25 68 26 66 Z" fill="#94503A"/>` +
      `<path d="M30 58 C34 52 42 49 50 49 M40 62 C46 58 56 57 64 59" stroke="#C97E62" stroke-width="2" fill="none" stroke-linecap="round"/>` +
      `<path d="M34 54 C37 51 41 49.6 45 49" stroke="#E9A88E" stroke-width="2.4" fill="none" stroke-linecap="round" opacity="0.9"/>` +
      `<circle cx="80" cy="66.4" r="4" fill="#B5654A"/><circle cx="78.8" cy="65.2" r="1.1" fill="#E9A88E"/>`
  );
}

function light() {
  return svg(
    `<circle cx="50" cy="40" r="26" fill="#FFF8D8" opacity="0.14"/>` +
      `<circle cx="50" cy="40" r="19" fill="#FFF8D8" opacity="0.24"/>` +
      `<circle cx="50" cy="40" r="13" fill="#FFF6CC" opacity="0.5"/>` +
      `<circle cx="50" cy="40" r="8.4" fill="#FFFDF2"/>`
  );
}
const LIGHT_RAYS = svg(rays(50, 40, 11, 36, 16, 1.6, "#FFF2B8", 2));

// ---- Metals and other stuff ----

/** A bar of metal on the floor, its foot from x to x + 26 at y: its top face, its front, and their edges. */
const bar = (x: number, y: number, metal: { top: string; front: string; edge: string; shine: string }) =>
  `<path d="M${x + 5.4} ${y - 12} L${x + 20.6} ${y - 12} L${x + 23} ${y - 8} L${x + 3} ${y - 8} Z" fill="${metal.top}" stroke="${metal.edge}" stroke-width="0.8" stroke-linejoin="round"/>` +
  `<path d="M${x + 3} ${y - 8} L${x + 23} ${y - 8} L${x + 26} ${y} L${x} ${y} Z" fill="${metal.front}" stroke="${metal.edge}" stroke-width="0.8" stroke-linejoin="round"/>` +
  `<path d="M${x + 5} ${y - 5.6} L${x + 12} ${y - 5.6}" stroke="${metal.shine}" stroke-width="1.2" stroke-linecap="round"/>`;
const BARS_GROW: Grow = { k: 1.5, x: 50, y: 66 };
const bars = (metal: { top: string; front: string; edge: string; shine: string }) => svg(grown(shadow(50, 30, 66.4) + bar(22, 66, metal) + bar(52, 66, metal) + bar(37, 54, metal), BARS_GROW));

const GOLD = {
  top: "#FFE27C",
  front: "#F2B824",
  edge: "#C78A12",
  shine: "#FFF1B8"
};
const SILVER = {
  top: "#F4F7FA",
  front: "#C9D2DB",
  edge: "#8E9AA6",
  shine: "#FFFFFF"
};
const COPPER = {
  top: "#F5AE84",
  front: "#C9693A",
  edge: "#93461F",
  shine: "#FFD2B6"
};

const IRON_GROW: Grow = { k: 1.2, x: 50, y: 66 };
function iron() {
  const link = (x: number, y: number, turn: number) =>
    `<ellipse cx="${x}" cy="${y}" rx="5.6" ry="3.4" transform="rotate(${turn} ${x} ${y})" fill="none" stroke="#3E454D" stroke-width="2.6"/><ellipse cx="${x}" cy="${y}" rx="5.6" ry="3.4" transform="rotate(${turn} ${x} ${y})" fill="none" stroke="#6E7782" stroke-width="1"/>`;
  return svg(
    grown(
      shadow(50, 32, 68) +
        // A rough bar of iron, and a chain made of it.
        `<path d="M24 52 L70 52 L76 60 L76 66 L22 66 L18 60 Z" fill="#545C66"/>` +
        `<path d="M24 52 L70 52 L76 60 L18 60 Z" fill="#6E7782"/>` +
        `<path d="M26 56 L40 56 M52 55 L62 55" stroke="#8A939D" stroke-width="1.2" stroke-linecap="round"/>` +
        `<path d="M24 63 L30 63 M46 64 L54 64" stroke="#464D55" stroke-width="1.2" stroke-linecap="round"/>` +
        link(30, 46, -20) +
        link(39, 43, 20) +
        link(48, 44, -15) +
        link(57, 47, 25) +
        link(65, 50.6, -10),
      IRON_GROW
    )
  );
}

function pearl() {
  return svg(
    `<ellipse cx="50" cy="66" rx="26" ry="3" fill="#000000" opacity="0.14"/>` +
      // The shell opened, the pearl in it.
      `<path d="M26 46 C24 34 36 24 50 24 C64 24 76 34 74 46 C66 42 34 42 26 46 Z" fill="#8E7FA6"/>` +
      `<path d="M30 44 C30 36 40 29 50 29 C60 29 70 36 70 44 C62 41.6 38 41.6 30 44 Z" fill="#E9DFF0"/>` +
      `<path d="M38 30 L42 42 M50 28 L50 41 M62 30 L58 42" stroke="#7A6C92" stroke-width="1" opacity="0.6"/>` +
      `<path d="M24 50 C30 46 70 46 76 50 C74 60 64 66 50 66 C36 66 26 60 24 50 Z" fill="#8E7FA6"/>` +
      `<path d="M28 51 C34 48.6 66 48.6 72 51 C70 58 62 62.6 50 62.6 C38 62.6 30 58 28 51 Z" fill="#F3E9F3"/>` +
      `<circle cx="50" cy="52" r="7" fill="#FFFFFF" stroke="#E2D6E6" stroke-width="0.8"/><circle cx="47.6" cy="49.6" r="2.2" fill="#FFF6FB"/><path d="M45 55.6 C47 57.6 52 57.8 55 55" stroke="#F0DCEA" stroke-width="1.2" fill="none"/>`
  );
}
const BUBBLES = svg(`<circle cx="66" cy="38" r="2" fill="none" stroke="#FFFFFF" stroke-width="0.9" opacity="0.9"/><circle cx="69" cy="30" r="1.3" fill="none" stroke="#FFFFFF" stroke-width="0.8" opacity="0.9"/>`);

function wood() {
  const log = (x: number, y: number, length: number) =>
    `<rect x="${x}" y="${y - 7}" width="${length}" height="14" rx="7" fill="#8A5A34"/>` +
    `<path d="M${x + 6} ${y - 3} L${x + length * 0.5} ${y - 3} M${x + length * 0.3} ${y + 2.6} L${x + length - 10} ${y + 2.6}" stroke="#6E4628" stroke-width="1.2" stroke-linecap="round"/>` +
    `<ellipse cx="${x + length - 4}" cy="${y}" rx="5.4" ry="7" fill="#E2B57A"/>` +
    `<ellipse cx="${x + length - 4}" cy="${y}" rx="3.4" ry="4.6" fill="none" stroke="#C99A5C" stroke-width="0.9"/><ellipse cx="${x + length - 4}" cy="${y}" rx="1.4" ry="2" fill="#C99A5C"/>`;
  return svg(shadow(50, 32, 71) + log(18, 63, 46) + log(40, 63, 44) + log(28, 50, 46) + `<path d="M76 70 L80 66 M80 66 L84 64 M80 66 L82 62" stroke="#7E5430" stroke-width="1.2" stroke-linecap="round"/>`);
}

// ---- Made things ----

function lamp() {
  return svg(
    `<circle cx="80" cy="36" r="15" fill="#FFD27A" opacity="0.16"/>` +
      `<ellipse cx="52" cy="66" rx="26" ry="3" fill="#000000" opacity="0.25"/>` +
      `<path d="M28 54.6 C20 52 17.4 60 25.6 61.4" stroke="#B5743E" stroke-width="3.2" fill="none" stroke-linecap="round"/>` +
      `<path d="M26 58 C26 50 40 46 52 46 C62 46 70 47.6 76.4 44 C80 42 84.4 41.6 84.4 44.6 C84.4 47.6 78.4 50 74.4 54 C70 60 62 64 50 64 C38 64 26 64 26 58 Z" fill="#C9874E"/>` +
      `<path d="M30 56 C34 52 42 50 50 50" stroke="#E2A56C" stroke-width="2" fill="none" stroke-linecap="round"/>` +
      `<ellipse cx="48" cy="49" rx="6" ry="1.8" fill="#7A4A2A"/>` +
      `<ellipse cx="50" cy="64" rx="14" ry="2.4" fill="#A86B3A"/>` +
      `<path d="M81.6 43 L82.4 41" stroke="#3E2A1C" stroke-width="1.4" stroke-linecap="round"/>`
  );
}
const LAMP_FLAME = svg(
  `<path d="M82 22 C86 30 88 34 88 37.6 C88 41 85.6 43 82 43 C78.4 43 76 41 76 37.6 C76 34 78 30 82 22 Z" fill="#FFB52E"/>` +
    `<path d="M82 30 C84 33.6 85 35.6 85 38 C85 40.2 83.6 41.4 82 41.4 C80.4 41.4 79 40.2 79 38 C79 35.6 80 33.6 82 30 Z" fill="#FFF0A8"/>`
);
const LAMP_HALO = svg(`<circle cx="82" cy="35" r="11" fill="#FFE29A" opacity="0.28"/>`);

const PEN_GROW: Grow = { k: 1.16, x: 58, y: 66 };
function pen() {
  return svg(
    grown(
      shadow(64, 13, 66.4) +
        // A reed pen standing in its inkwell.
        `<path d="M30 14 L63.4 49" stroke="#C9A06A" stroke-width="4.2" stroke-linecap="round"/>` +
        `<path d="M31.4 13.2 L62.6 46" stroke="#E2C08E" stroke-width="1.2" stroke-linecap="round"/>` +
        `<path d="M40.6 23.6 L42.6 25.6 M50.6 34 L52.6 36" stroke="#A6804C" stroke-width="2.6"/>` +
        `<path d="M55 50 C55 46.6 73 46.6 73 50 L75 62 C75 66.4 53 66.4 53 62 Z" fill="#3A3F58"/>` +
        `<rect x="58.6" y="44" width="10.8" height="4.4" rx="1.6" fill="#2A2E44"/>` +
        `<ellipse cx="64" cy="44.2" rx="5.4" ry="1.2" fill="#14172A"/>` +
        `<path d="M57.4 53 C57.4 57 58 60 59.4 62" stroke="#6E7499" stroke-width="2" fill="none" stroke-linecap="round"/>`,
      PEN_GROW
    )
  );
}

const SHIP_SEA = wide(`<rect y="56" width="100" height="24" fill="#3C9BD8"/><rect y="56" width="100" height="3.4" fill="#7CC4F0"/><rect y="68" width="100" height="12" fill="#3590CD"/>`);
const SHIP_WAVES = wide(
  `<path d="M4 64 q5 -4 10 0 M30 70 q5 -4 10 0 M56 63 q5 -4 10 0 M80 71 q5 -4 10 0 M16 76 q5 -4 10 0 M66 77 q5 -4 10 0" stroke="#FFFFFF" stroke-width="1.6" fill="none" stroke-linecap="round" opacity="0.9"/>`
);
function ship() {
  return svg(
    `<rect x="48.6" y="12" width="3" height="44" fill="#6E4A2A"/>` +
      `<path d="M51.6 13 L51.6 51 L78 47 Z" fill="#F7F1E3"/><path d="M51.6 13 L78 47 L72 48 Z" fill="#E6DCC6"/>` +
      `<path d="M48.6 22 L48.6 51 L28 49 Z" fill="#EFE6D2"/>` +
      `<path d="M51.6 12 L58 14 L51.6 16.4 Z" fill="#3E9A5A"/>` +
      `<path d="M18 52 L82 52 C79 61 70 65 50 65 C32 65 22 61 18 52 Z" fill="#8A5A34"/>` +
      `<path d="M18 52 L82 52 L81 55 L19 55 Z" fill="#A87444"/>` +
      `<path d="M26 58.6 L74 58.6" stroke="#6E4628" stroke-width="1.2" stroke-linecap="round"/>` +
      `<circle cx="34" cy="56" r="1.2" fill="#5A3A20"/><circle cx="50" cy="56" r="1.2" fill="#5A3A20"/><circle cx="66" cy="56" r="1.2" fill="#5A3A20"/>`
  );
}

function sword() {
  return svg(
    `<ellipse cx="50" cy="64" rx="34" ry="3" fill="#000000" opacity="0.12"/>` +
      `<g transform="rotate(-32 50 42)">` +
      `<path d="M34 39 L86 39 L92 42 L86 45 L34 45 Z" fill="#D7DEE5" stroke="#8E9AA6" stroke-width="0.9" stroke-linejoin="round"/>` +
      `<path d="M36 42 L84 42" stroke="#A9B4BF" stroke-width="1.2" stroke-linecap="round"/>` +
      `<path d="M38 40.4 L70 40.4" stroke="#FFFFFF" stroke-width="1" stroke-linecap="round" opacity="0.9"/>` +
      `<rect x="30.4" y="31" width="4.6" height="22" rx="2" fill="#C9A23A"/>` +
      `<rect x="16" y="39" width="15" height="6" rx="2.6" fill="#6B3E22"/>` +
      `<path d="M19 39 L18 45 M22.6 39 L21.6 45 M26.2 39 L25.2 45" stroke="#8A5534" stroke-width="1"/>` +
      `<circle cx="14.6" cy="42" r="3.6" fill="#C9A23A"/>` +
      `</g>`
  );
}

function crown() {
  return svg(
    shadow(50, 26, 66) +
      `<path d="M27 54 L27 29 L38.6 42 L50 23 L61.4 42 L73 29 L73 54 Z" fill="#FFCB3D" stroke="#D99A12" stroke-width="1" stroke-linejoin="round"/>` +
      `<path d="M31 50 L31 38 L38.6 46 L50 31 L61.4 46 L69 38 L69 50 Z" fill="#FFD966" opacity="0.7"/>` +
      `<rect x="26" y="52" width="48" height="12" rx="2" fill="#F2B824" stroke="#D99A12" stroke-width="1"/>` +
      `<circle cx="27" cy="28.4" r="2.6" fill="#FFE27C"/><circle cx="50" cy="22" r="3" fill="#FFE27C"/><circle cx="73" cy="28.4" r="2.6" fill="#FFE27C"/>` +
      `<circle cx="38" cy="58" r="2.8" fill="#3E9A5A"/><circle cx="50" cy="58" r="3.4" fill="#D8343F"/><circle cx="62" cy="58" r="2.8" fill="#3A7FD0"/>` +
      `<circle cx="49" cy="57" r="1" fill="#FF9AA0"/>`
  );
}

function rope() {
  const loop = (rx: number, ry: number, cy: number) =>
    `<ellipse cx="48" cy="${cy}" rx="${rx}" ry="${ry}" fill="none" stroke="#B48A52" stroke-width="5"/>` +
    `<ellipse cx="48" cy="${cy}" rx="${rx}" ry="${ry}" fill="none" stroke="#D8B47A" stroke-width="3.4" stroke-dasharray="2.4 2"/>`;
  return svg(
    shadow(50, 32, 69) +
      loop(27, 8.4, 62) +
      loop(23, 7, 58) +
      loop(18, 5.4, 55) +
      loop(12, 3.6, 52.6) +
      `<path d="M74 62 C80 64 84 68 90 67" stroke="#B48A52" stroke-width="5" fill="none" stroke-linecap="round"/>` +
      `<path d="M74 62 C80 64 84 68 90 67" stroke="#D8B47A" stroke-width="3.4" fill="none" stroke-dasharray="2.4 2"/>` +
      `<path d="M90 67 L93 65.6 M90 67 L93.4 68.6" stroke="#C9A06A" stroke-width="1" stroke-linecap="round"/>`
  );
}

function tent() {
  return svg(
    shadow(50, 38, 73) +
      `<path d="M8 72 L20 50 M92 72 L80 50" stroke="#7E6A54" stroke-width="0.9"/>` +
      `<path d="M14 72 L24 44 L50 36 L76 44 L86 72 Z" fill="#5A4636"/>` +
      `<path d="M24 44 L50 36 L76 44 L74 50 L50 43 L26 50 Z" fill="#6E5A48"/>` +
      `<path d="M18.6 60 L81.4 60" stroke="#C9B08A" stroke-width="2.6"/>` +
      `<path d="M16.2 66 L83.8 66" stroke="#8E7A62" stroke-width="1.6"/>` +
      `<path d="M42 72 L50 48 L58 72 Z" fill="#2E241C"/>` +
      `<rect x="49" y="26" width="2" height="12" fill="#6E4A2A"/>` +
      `<rect x="23" y="41" width="2" height="6" fill="#6E4A2A"/><rect x="75" y="41" width="2" height="6" fill="#6E4A2A"/>`
  );
}
const PENNANT = svg(`<path d="M51 26.6 L61 29.6 L51 32.6 Z" fill="#3E9A5A"/>`);

function house() {
  return svg(
    shadow(50, 32, 73) +
      `<rect x="24" y="38" width="52" height="34" fill="#D9A86C"/>` +
      `<rect x="22" y="34" width="56" height="5" rx="1" fill="#C99558"/>` +
      `<circle cx="30" cy="41.4" r="1.2" fill="#8A5A34"/><circle cx="42" cy="41.4" r="1.2" fill="#8A5A34"/><circle cx="58" cy="41.4" r="1.2" fill="#8A5A34"/><circle cx="70" cy="41.4" r="1.2" fill="#8A5A34"/>` +
      `<path d="M28 48 L36 48 M60 62 L70 62 M30 64 L38 64 M64 50 L72 50" stroke="#C99558" stroke-width="1.2" stroke-linecap="round"/>` +
      `<path d="M44 72 L44 58 C44 53 56 53 56 58 L56 72 Z" fill="#7A4A2A"/>` +
      `<path d="M50 54.6 L50 72" stroke="#5E3820" stroke-width="1"/><circle cx="53.4" cy="63.6" r="0.9" fill="#E2B57A"/>` +
      `<rect x="30" y="50" width="9" height="9" rx="1" fill="#5E3820"/><rect x="61" y="50" width="9" height="9" rx="1" fill="#5E3820"/>` +
      `<path d="M34.5 50 L34.5 59 M30 54.5 L39 54.5 M65.5 50 L65.5 59 M61 54.5 L70 54.5" stroke="#B5743E" stroke-width="1"/>`
  );
}
const CURTAIN = svg(`<path d="M61.6 50.6 L69.4 50.6 C68 54 66.6 56 65.5 58.4 C64.4 56 63 54 61.6 50.6 Z" fill="#E8604A" opacity="0.9"/>`);

function staff() {
  return svg(
    `<ellipse cx="50" cy="70.4" rx="10" ry="2" fill="#000000" opacity="0.14"/>` +
      `<path d="M50 70 L50 24 C50 15 59.4 13 61 19.4" stroke="#8A5A34" stroke-width="5" fill="none" stroke-linecap="round"/>` +
      `<path d="M48.8 66 L48.8 26" stroke="#A87444" stroke-width="1.4" stroke-linecap="round"/>` +
      `<path d="M51 40 L51.6 46 M50.6 55 L51.2 60" stroke="#6E4628" stroke-width="1" stroke-linecap="round"/>`
  );
}

function wall() {
  const rows = [0, 1, 2, 3, 4];
  const stones = rows
    .map((row) => {
      const y = 36 + row * 7.2;
      const shift = row % 2 ? 6 : 0;
      return Array.from({ length: 6 }, (_, index) => {
        const x = 14 + shift + index * 12 - (row % 2 ? 12 : 0);
        const left = Math.max(14, x);
        const right = Math.min(86, x + 11);
        if (right - left < 3) return "";
        return `<rect x="${left}" y="${y}" width="${f(right - left)}" height="6.4" rx="1.2" fill="${(row + index) % 3 ? "#CDBB9F" : "#BCA98C"}"/>`;
      }).join("");
    })
    .join("");
  return svg(shadow(50, 38, 73) + `<rect x="13" y="34" width="74" height="38" fill="#A39176"/>` + stones + `<rect x="11" y="30" width="78" height="5" rx="1.4" fill="#B7A587"/>`);
}

/** Each thing's drawing, how it moves and where it is drawn. */
export const THING_ART: Record<ThingKind, () => CardArt> = {
  dates: () =>
    thing("dates", "table", "still", dates(), {
      layers: glints(
        [
          [47.6, 44.6, 2.2],
          [60.4, 51.6, 1.8]
        ],
        2400,
        DATES_GROW
      )
    }),
  milk: () =>
    thing("milk", "table", "still", milk(), {
      layers: [
        { svg: MILK_DROP, move: "rise", distance: 12, ms: 1700 },
        {
          svg: svg(`<ellipse cx="50" cy="35" rx="7" ry="1.5" fill="none" stroke="#C9D3DA" stroke-width="1"/>`),
          move: "twinkle",
          ms: 1700,
          phase: 0.5
        }
      ]
    }),
  honey: () =>
    thing("honey", "table", "still", honey(), {
      layers: [{ svg: HONEY_DROP, move: "rise", distance: 9, ms: 2400 }, ...glints([[40, 47, 2.4]])]
    }),
  water: () =>
    thing("water", "plain", "bob", water(), {
      scene: WATER_POOL,
      layers: [
        {
          svg: wide(`<ellipse cx="50" cy="69.5" rx="21" ry="3.2" fill="none" stroke="#FFFFFF" stroke-width="1"/>`),
          move: "twinkle",
          fill: true,
          ms: 1800
        }
      ]
    }),
  bread: () =>
    thing("bread", "table", "still", bread(), {
      layers: steam([
        [42, 30],
        [57, 28]
      ])
    }),
  meat: () =>
    thing("meat", "table", "still", meat(), {
      layers: steam([
        [40, 34],
        [54, 33]
      ])
    }),
  barley: () => thing("barley", "land", "sway", barley()),
  wheat: () => thing("wheat", "land", "sway", wheat()),
  grapes: () =>
    thing("grapes", "table", "still", grapes(), {
      layers: glints([
        [44, 38, 2],
        [56.4, 52.6, 1.8]
      ])
    }),
  figs: () =>
    thing("figs", "table", "still", figs(), {
      layers: glints([[31.6, 46.4, 2.2]])
    }),
  olives: () =>
    thing("olives", "table", "still", olives(), {
      layers: glints(
        [
          [46.6, 46.2, 1.8],
          [52, 41.6, 1.6]
        ],
        2400,
        OLIVES_GROW
      )
    }),
  oil: () =>
    thing("oil", "table", "still", oil(), {
      layers: glints([
        [60, 40, 2.4],
        [42, 56, 1.8]
      ])
    }),
  pomegranate: () =>
    thing("pomegranate", "table", "still", pomegranate(), {
      layers: glints([
        [33, 40.6, 2.2],
        [66, 52, 1.6]
      ])
    }),
  banana: () =>
    thing("banana", "table", "still", banana(), {
      layers: glints([[50, 47, 2]])
    }),
  apple: () =>
    thing("apple", "table", "still", apple(), {
      layers: glints([
        [30.4, 40, 2.4],
        [60, 40, 1.8]
      ])
    }),
  mango: () =>
    thing("mango", "table", "still", mango(), {
      layers: glints([[38, 41, 2.4]])
    }),
  rice: () =>
    thing("rice", "table", "still", rice(), {
      layers: steam([
        [44, 30],
        [57, 31]
      ])
    }),
  gourd: () =>
    thing("gourd", "table", "still", gourd(), {
      layers: glints([[39, 46, 2.2]])
    }),
  vinegar: () =>
    thing("vinegar", "table", "still", vinegar(), {
      layers: glints([
        [56, 41, 2.2],
        [38, 56, 1.6]
      ])
    }),
  garlic: () =>
    thing("garlic", "table", "still", garlic(), {
      layers: glints([[41, 44, 2]])
    }),
  mint: () =>
    thing("mint", "table", "still", svg(MINT_POT), {
      layers: [
        {
          svg: mintSprig(),
          move: "sway",
          center: { x: 50, y: 48 },
          angle: 5,
          ms: 2800
        }
      ]
    }),
  citron: () =>
    thing("citron", "table", "still", citron(), {
      layers: [0, 1].map((index) => ({
        svg: svg(wisp(46 + index * 12, 30, 12, "#F8E9A0", 1.8)),
        move: "rise" as const,
        distance: -10,
        ms: 3000,
        phase: index / 2
      }))
    }),
  coffee: () =>
    thing("coffee", "table", "still", coffee(), {
      layers: steam([
        [45, 34],
        [55, 33]
      ])
    }),
  fruit: () =>
    thing("fruit", "table", "still", fruit(), {
      layers: glints(
        [
          [33.6, 41.6, 2],
          [62, 38, 1.6]
        ],
        2400,
        FRUIT_GROW
      )
    }),

  tree: () => thing("tree", "land", "sway", tree()),
  palm: () => thing("palm", "land", "sway", palm()),
  leaves: () =>
    thing("leaves", "ground", "still", leaves(), {
      layers: [
        {
          svg: svg(leaf(30, 18, 40, "#8CC24A", 0.9)),
          move: "rise",
          distance: 40,
          ms: 3400
        },
        {
          svg: svg(leaf(60, 12, -30, "#E3A13B", 0.9, "#B57A22")),
          move: "rise",
          distance: 44,
          ms: 3400,
          phase: 0.5
        }
      ]
    }),
  seed: () =>
    thing("seed", "plain", "still", seed(), {
      layers: glints([[55, 35, 2.6]])
    }),
  garden: () =>
    thing("garden", "land", "sway", garden(), {
      scene: GARDEN_GRASS,
      foot: 70
    }),
  thorn: () => thing("thorn", "plain", "sway", thorn(), { foot: 68 }),

  sun: () =>
    thing("sun", "sky", "glow", sun(), {
      layers: [{ svg: SUN_RAYS, move: "spin", center: { x: 50, y: 40 }, ms: 16000 }]
    }),
  moon: () =>
    thing("moon", "night", "glow", moon(), {
      layers: [{ svg: MOON_GLOW, move: "twinkle", ms: 3600 }]
    }),
  star: () =>
    thing("star", "night", "glow", star(), {
      layers: [
        {
          svg: littleStars([
            [20, 18, 4],
            [80, 22, 3.6],
            [26, 60, 3.2],
            [62, 10, 2.6]
          ]),
          move: "twinkle",
          ms: 2200
        },
        {
          svg: littleStars([
            [74, 60, 3.4],
            [14, 40, 2.6],
            [88, 44, 2.4],
            [40, 12, 2.2]
          ]),
          move: "twinkle",
          ms: 2200,
          phase: 0.5
        }
      ]
    }),
  cloud: () => thing("cloud", "sky", "drift", cloud()),
  rain: () =>
    thing("rain", "grey", "drift", rainCloud(), {
      layers: [
        { svg: RAIN_DROPS, move: "fall", fill: true, ms: 900 },
        { svg: RAIN_SPLASHES, move: "twinkle", fill: true, ms: 900 }
      ]
    }),
  wind: () =>
    thing("wind", "sky", "drift", wind(), {
      layers: [{ svg: WIND_LEAVES, move: "slide", fill: true, ms: 2000 }]
    }),
  air: () =>
    thing("air", "sky", "drift", air(), {
      layers: [{ svg: AIR_WISPS, move: "slide", fill: true, ms: 4200 }]
    }),
  snow: () =>
    thing("snow", "winter", "still", SNOW_DRIFT, {
      layers: [
        {
          svg: svg(snowflake(50, 34, 17)),
          move: "spin",
          center: { x: 50, y: 34 },
          ms: 12000
        },
        { svg: SNOW_FLAKES, move: "fall", fill: true, ms: 4200 }
      ]
    }),
  ice: () =>
    thing("ice", "plain", "still", ice(), {
      layers: glints(
        [
          [44, 33, 2.6],
          [70, 50, 2.2]
        ],
        2400,
        ICE_GROW
      )
    }),

  sand: () =>
    thing("sand", "land", "still", SAND_HEAP, {
      scene: SAND_DUNES,
      layers: [{ svg: SAND_BLOWING, move: "slide", fill: true, ms: 2600 }]
    }),
  dust: () =>
    thing("dust", "ground", "still", dust(), {
      layers: [0, 1, 2].map((index) => ({
        svg: svg(puff(40 + index * 10, 44, 3.6, "#C7A884", 0.8)),
        move: "rise" as const,
        distance: -24,
        ms: 3000,
        phase: index / 3
      }))
    }),
  smoke: () =>
    thing("smoke", "plain", "drift", smoke(), {
      layers: [0, 1].map((index) => ({
        svg: svg(puff(50, 56, 5.6, "#9CA6B0", 0.85)),
        move: "rise" as const,
        distance: -40,
        ms: 3800,
        phase: index / 2
      }))
    }),
  fire: () =>
    thing("fire", "night", "still", fireLogs(), {
      layers: [
        { svg: FLAMES, move: "flicker", center: { x: 50, y: 63 }, ms: 1400 },
        { svg: spark(44, 24), move: "rise", distance: -16, ms: 1600 },
        {
          svg: spark(57, 20),
          move: "rise",
          distance: -16,
          ms: 1600,
          phase: 0.5
        }
      ]
    }),
  river: () =>
    thing("river", "land", "still", "", {
      scene: RIVER_BANKS,
      layers: [
        { svg: RIVER_RIPPLES, move: "slide", fill: true, ms: 3000 },
        {
          svg: REEDS,
          move: "sway",
          center: { x: 21, y: 74 },
          angle: 4,
          ms: 2800
        }
      ]
    }),
  sea: () =>
    thing("sea", "sky", "still", "", {
      scene: SEA_WATER,
      layers: [
        { svg: SEA_WAVES_NEAR, move: "slide", fill: true, ms: 3400 },
        { svg: SEA_WAVES_FAR, move: "slide", fill: true, ms: 6000 }
      ]
    }),
  mountain: () =>
    thing("mountain", "sky", "still", mountain(), {
      scene: MOUNTAIN_FIELD,
      layers: [{ svg: DRIFTING_CLOUD, move: "slide", fill: true, ms: 9000 }]
    }),
  stone: () =>
    thing("stone", "ground", "still", stone(), {
      layers: [swayingTuft(88, 68), swayingTuft(16, 69, 0.5)]
    }),
  clay: () =>
    thing("clay", "ground", "still", clay(), {
      layers: glints([
        [38, 52, 2.4],
        [56, 50, 1.8]
      ])
    }),
  light: () =>
    thing("light", "night", "glow", light(), {
      layers: [
        { svg: LIGHT_RAYS, move: "spin", center: { x: 50, y: 40 }, ms: 20000 },
        ...glints(
          [
            [22, 20, 2.4],
            [80, 58, 2.2]
          ],
          2600
        )
      ]
    }),

  gold: () =>
    thing("gold", "plain", "still", bars(GOLD), {
      layers: glints(
        [
          [44, 44.6, 2.4],
          [70, 57.6, 2]
        ],
        2400,
        BARS_GROW
      )
    }),
  silver: () =>
    thing("silver", "plain", "still", bars(SILVER), {
      layers: glints(
        [
          [44, 44.6, 2.4],
          [70, 57.6, 2]
        ],
        2400,
        BARS_GROW
      )
    }),
  iron: () =>
    thing("iron", "plain", "still", iron(), {
      layers: glints([[30, 55.6, 1.8]], 3200, IRON_GROW)
    }),
  copper: () =>
    thing("copper", "plain", "still", bars(COPPER), {
      layers: glints(
        [
          [44, 44.6, 2.2],
          [70, 57.6, 1.8]
        ],
        2400,
        BARS_GROW
      )
    }),
  pearl: () =>
    thing("pearl", "sea", "still", pearl(), {
      layers: [...glints([[47.6, 49.6, 2.4]]), { svg: BUBBLES, move: "rise", distance: -18, ms: 3000 }]
    }),
  wood: () =>
    thing("wood", "ground", "still", wood(), {
      layers: [swayingTuft(12, 70), swayingTuft(90, 69, 0.5)]
    }),

  lamp: () =>
    thing("lamp", "night", "still", lamp(), {
      layers: [
        {
          svg: LAMP_FLAME,
          move: "flicker",
          center: { x: 82, y: 43 },
          ms: 1300
        },
        { svg: LAMP_HALO, move: "twinkle", ms: 1300 }
      ]
    }),
  pen: () =>
    thing("pen", "plain", "still", pen(), {
      layers: glints(
        [
          [62, 44, 1.8],
          [40, 22.6, 1.8]
        ],
        2400,
        PEN_GROW
      )
    }),
  ship: () =>
    thing("ship", "sky", "bob", ship(), {
      scene: SHIP_SEA,
      layers: [{ svg: SHIP_WAVES, move: "slide", fill: true, ms: 3200 }]
    }),
  sword: () =>
    thing("sword", "plain", "still", sword(), {
      layers: glints([
        [60, 34.6, 2.6],
        [74, 25.4, 2]
      ])
    }),
  crown: () =>
    thing("crown", "plain", "glow", crown(), {
      layers: glints([
        [50, 22, 2.6],
        [62, 58, 1.8]
      ])
    }),
  rope: () =>
    thing("rope", "ground", "still", rope(), {
      layers: [swayingTuft(14, 70), swayingTuft(80, 72, 0.5)]
    }),
  tent: () =>
    thing("tent", "land", "still", tent(), {
      layers: [
        {
          svg: PENNANT,
          move: "sway",
          center: { x: 51, y: 29.6 },
          angle: 10,
          ms: 1600
        }
      ]
    }),
  house: () =>
    thing("house", "land", "still", house(), {
      layers: [
        {
          svg: CURTAIN,
          move: "sway",
          center: { x: 65.5, y: 50.6 },
          angle: 6,
          ms: 3000
        }
      ]
    }),
  staff: () => thing("staff", "plain", "sway", staff(), { foot: 70 }),
  wall: () =>
    thing("wall", "land", "still", wall(), {
      layers: [swayingTuft(16, 73), swayingTuft(84, 73, 0.5)]
    })
};

export const THING_KINDS = Object.keys(THING_ART) as ThingKind[];
