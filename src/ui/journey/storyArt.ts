import { DAY_SKY, animalAt, cloud, flower, glow, n, palm, peaks, rainStreaks, sky, stars, tuft, type SignArt, type SignKeys } from "./signDraw";

/**
 * The signs in the stories of the Prophets, drawn as the signs in creation are (signArt.ts): Nuh's ark on the flood
 * (Quran 11:37 to 11:44, 54:11 to 54:13), the sea parted for Musa (Quran 26:63, 20:77), the twelve springs from the
 * rock with the clouds' shade, the manna and the quails (Quran 2:57, 2:60), the she-camel of Salih and her day to
 * drink (Quran 26:149, 26:155, 26:156, 91:13), the valley of the ants (Quran 27:18, 27:19), the hoopoe's news from
 * Saba (Quran 27:20 to 27:28) and the king's dream of seven cows (Quran 12:43 to 12:49). Only the sign is drawn: the
 * ark, the sea, the rock, the animals and the land. No Prophet, no person and no angel is ever drawn.
 */

const SUN = (x: number, y: number) => `${glow(x, y, 16, "#FFE7A0", 0.12)}<circle cx="${x}" cy="${y}" r="8" fill="#FFC93C"/>`;
const LAND = (fill: string, line = 96) => `<rect y="${line}" width="160" height="${120 - line}" fill="${fill}"/>`;
/** Water up to `top`, its top edge rippling, down past the box's foot. */
const waterTo = (top: number, fill: string, edge: string) =>
  `<path d="M0 ${top} C10 ${top - 1.6} 20 ${top - 1.6} 30 ${top} C40 ${top + 1.6} 50 ${top + 1.6} 60 ${top} C70 ${top - 1.6} 80 ${top - 1.6} 90 ${top} C100 ${top + 1.6} 110 ${top + 1.6} 120 ${top} C130 ${top - 1.6} 140 ${top - 1.6} 150 ${top} C155 ${top + 0.8} 158 ${top + 0.8} 160 ${top} L160 120 L0 120 Z" fill="${fill}"/>` +
  `<path d="M0 ${top} C10 ${top - 1.6} 20 ${top - 1.6} 30 ${top} C40 ${top + 1.6} 50 ${top + 1.6} 60 ${top} C70 ${top - 1.6} 80 ${top - 1.6} 90 ${top} C100 ${top + 1.6} 110 ${top + 1.6} 120 ${top} C130 ${top - 1.6} 140 ${top - 1.6} 150 ${top} C155 ${top + 0.8} 158 ${top + 0.8} 160 ${top}" stroke="${edge}" stroke-width="1.2" fill="none"/>`;
/** Little waves: short curls along a row, `y` down, every `gap` across. */
const curls = (y: number, gap: number, color: string, width = 1, from = 4) => {
  let d = "";
  for (let x = from; x < 160; x += gap) d += `M${n(x)} ${y} q3 -2.2 6 0 q3 2.2 6 0 `;
  return `<path d="${d.trim()}" stroke="${color}" stroke-width="${width}" fill="none" stroke-linecap="round"/>`;
};
/** A time through the story, kept to three places (n() keeps one, for drawing). */
const at3 = (value: number) => Math.round(value * 1000) / 1000;
/** Keys that hold a part out of sight until `from`, show it by `to`, and keep it. */
const showFrom = (from: number, to: number): SignKeys => ({ at: [0, from, to], opacity: [0, 0, 1] });

// Nuh's ark: built of planks and nails on dry land, the animals boarding two of each kind, the gates of the sky opened
// with pouring water and the earth bursting with springs, the ark sailing on waves like mountains, then the water
// swallowed and the ark at rest on al-Judi (Quran 11:37 to 11:44, 54:11 to 54:13).
function ark(): SignArt {
  // The hull's sides slant in, so each row of planks is a little shorter than the one above it.
  const strip = (top: number, fill: string) => {
    const left = 44 + (top - 84);
    const right = 92 - (top - 84);
    let nails = "";
    for (let x = left + 4; x < right - 2; x += 6) nails += `<circle cx="${n(x)}" cy="${top + 2}" r="0.45" fill="#3A2716"/>`;
    return `<path d="M${left} ${top} L${right} ${top} L${right - 4} ${top + 4} L${left + 4} ${top + 4} Z" fill="${fill}"/><path d="M${left} ${top} L${right} ${top}" stroke="#5E3B1B" stroke-width="0.6"/>${nails}`;
  };
  const keel = strip(92, "#8A5A2A");
  const middle = strip(88, "#9C6834");
  const deck = strip(84, "#94622F") + `<rect x="49" y="85.2" width="4" height="4" rx="0.6" fill="#3B2A1A"/>`;
  const posts = `<path d="M44 84 L40.6 77.6 L43.4 77.2 L46.4 84 Z" fill="#7A4A22"/><path d="M92 84 L95.4 77.6 L92.6 77.2 L89.6 84 Z" fill="#7A4A22"/>`;
  const house =
    `<rect x="54" y="75" width="28" height="9" fill="#B07A44"/><path d="M54 78 L82 78 M54 81 L82 81" stroke="#8C5A2E" stroke-width="0.5"/>` +
    `<rect x="58" y="76.6" width="3.4" height="2.6" fill="#3B2A1A"/><rect x="66.3" y="76.6" width="3.4" height="2.6" fill="#3B2A1A"/><rect x="74.6" y="76.6" width="3.4" height="2.6" fill="#3B2A1A"/>` +
    `<path d="M51 75.6 L68 69 L85 75.6 Z" fill="#7A4A22"/><path d="M51 75.6 L85 75.6" stroke="#5E3B1B" stroke-width="0.8"/>`;
  const wholeArk = keel + middle + deck + posts + house;
  const ramp = `<path d="M30 96 L49.4 89.4" stroke="#8B5A2B" stroke-width="2.4" stroke-linecap="round"/><path d="M34 94.2 l0.6 1.6 M38 92.8 l0.6 1.6 M42 91.4 l0.6 1.6 M46 90.1 l0.6 1.6" stroke="#5E3B1B" stroke-width="0.5"/>`;
  const hills = `<path d="M0 90 C12 80 26 78 40 85 C50 90 60 84 74 88 L74 97 L0 97 Z" fill="#A9BB8A"/>`;
  // Al-Judi, on the right: a mountain with a flat top, where the ark comes to rest.
  const judi =
    `<path d="M80 97 C92 90 100 80 107 74 L135 74 C142 80 150 88 160 92 L160 97 Z" fill="#8E7B66"/>` +
    `<path d="M124 74 L135 74 C142 80 150 88 160 92 L160 97 L136 97 Z" fill="#000000" opacity="0.12"/><path d="M96 86 l6 -2 M112 82 l7 0 M140 86 l6 2" stroke="#6F5E4D" stroke-width="0.7"/>`;
  const land = LAND("#9CB46A") + `<rect y="96" width="160" height="1.6" fill="#B5C97F"/>` + [8, 70, 98, 120, 150].map((x, i) => tuft(x, 104 + (i % 2) * 6, "#6E9A44", 5)).join("");
  const wetLand = LAND("#6E7F55");
  const springs = [10, 104, 150]
    .map(
      (x) =>
        `<path d="M${x - 2} 97 C${x - 2.4} 91 ${x - 1} 87 ${x} 84 C${x + 1} 87 ${x + 2.4} 91 ${x + 2} 97 Z" fill="#9CCBEB"/><path d="M${x} 84 q-3 -1 -4 2 M${x} 84 q3 -1 4 2" stroke="#D6ECFA" stroke-width="0.8" fill="none"/>`
    )
    .join("");
  const flood = waterTo(64, "#3F6585", "#7FA4C4");
  // Swells as tall as mountains, one every third of the box, so they roll on without a seam.
  const swells =
    `<path d="M0 46 C10 46 18 60 26.7 66 C35 60 43 46 53.3 46 C63 46 71 60 80 66 C89 60 97 46 106.7 46 C117 46 125 60 133.3 66 C142 60 150 46 160 46 L160 80 L0 80 Z" fill="#33506E"/>` +
    `<path d="M-4 47.4 C2 45 6 45 10 47.4 M49.3 47.4 C55.3 45 59.3 45 63.3 47.4 M102.7 47.4 C108.7 45 112.7 45 116.7 47.4 M156 47.4 C162 45 166 45 170 47.4" stroke="#E8F1F7" stroke-width="1.3" fill="none" stroke-linecap="round"/>`;
  const front = curls(66, 18, "#C9DDEB", 1.1);
  // The ark rises with the water, drifts on the swells, and comes down on al-Judi as the water goes.
  // (Its keel stays a little under the water's top: the water reaches it at 0.45 and is at its height, 64, by 0.52.)
  const afloat: SignKeys = {
    at: [0, 0.44, 0.45, 0.52, 0.62, 0.72, 0.8, 0.83, 0.84, 1],
    x: [0, 0, 0, 2, 12, 28, 53, 53, 53, 53],
    y: [0, 0, -1, -30, -30, -30, -22.6, -22, -22, -22],
    opacity: [0, 0, 1, 1, 1, 1, 1, 1, 0, 0]
  };
  const water = { at: [0, 0.38, 0.52, 0.74, 0.84, 0.97], y: [58, 58, 0, 0, 12, 58] };
  const onLand = (from: number, to: number): SignKeys => ({ at: [0, from, to, 0.44, 0.45], opacity: [0, 0, 1, 1, 0] });
  // Each animal walks in from the left, up the ramp, and in at the door.
  const boards = (kind: "camel" | "sheep", s: number, from: number) => ({
    svg: animalAt(kind, 12, n(96 - 73 * s), s),
    keys: { at: [0, from, at3(from + 0.07), at3(from + 0.1), at3(from + 0.105)], x: [-72, -72, 0, 18, 18], y: [0, 0, 0, -5.6, -5.6], opacity: [1, 1, 1, 1, 0] }
  });
  const animals = [boards("camel", 0.2, 0.18), boards("camel", 0.2, 0.205), boards("sheep", 0.16, 0.235), boards("sheep", 0.16, 0.26)];
  return {
    kind: "ark",
    ms: 11000,
    stillAt: 0.64,
    parts: [
      { name: "sky", svg: DAY_SKY },
      { name: "sun", svg: SUN(138, 30), keys: { at: [0, 0.32, 0.38, 0.86, 0.94], opacity: [1, 1, 0, 0, 1] } },
      { name: "hills", svg: hills },
      { name: "al-Judi", svg: judi },
      { name: "land", svg: land },
      { name: "wet land", svg: wetLand, keys: { at: [0, 0.42, 0.44, 0.9, 1], opacity: [0, 0, 1, 1, 0.6] } },
      { name: "springs", svg: springs, origin: { x: 80, y: 97 }, keys: { at: [0, 0.37, 0.42, 0.74, 0.8], scaleY: [0, 0, 1, 1, 0] }, loop: { move: "bob", ms: 500, y: 0.7 } },
      { name: "storm", svg: `<rect width="160" height="120" fill="#2E3A4C"/>`, keys: { at: [0, 0.34, 0.4, 0.74, 0.84], opacity: [0, 0, 0.82, 0.82, 0] } },
      { name: "keel planks", svg: keel, keys: onLand(0.03, 0.05) },
      { name: "middle planks", svg: middle, keys: onLand(0.06, 0.08) },
      { name: "deck planks", svg: deck, keys: onLand(0.09, 0.11) },
      { name: "bow and stern", svg: posts, keys: onLand(0.11, 0.13) },
      { name: "house on the ark", svg: house, keys: onLand(0.13, 0.16) },
      { name: "ramp", svg: ramp, keys: { at: [0, 0.16, 0.18, 0.37, 0.39], opacity: [0, 0, 1, 1, 0] } },
      ...animals.map((each, i) => ({
        name: ["first camel", "second camel", "first sheep", "second sheep"][i],
        svg: each.svg,
        keys: each.keys,
        loop: { move: "bob" as const, ms: i < 2 ? 520 : 420, y: 0.6, phase: i * 0.3 }
      })),
      {
        name: "two doves",
        svg: animalAt("dove", 46, 70, 0.1) + animalAt("dove", 36, 66, 0.1),
        keys: { at: [0, 0.28, 0.35, 0.36], x: [-84, -84, 0, 0], y: [-20, -20, 0, 0], opacity: [1, 1, 1, 0] },
        loop: { move: "bob", ms: 420, y: 0.8 }
      },
      { name: "great waves", svg: swells, keys: { at: [0, 0.5, 0.56, 0.72, 0.8], opacity: [0, 0, 1, 1, 0] }, loop: { move: "slide", ms: 3400 } },
      { name: "flood", svg: flood, keys: water },
      { name: "ark afloat", svg: wholeArk, origin: { x: 68, y: 86 }, keys: afloat, loop: { move: "bob", ms: 2200, y: 1, rotate: 3.5 } },
      { name: "ark on al-Judi", svg: wholeArk, keys: { at: [0, 0.83, 0.84], x: [53, 53, 53], y: [-22, -22, -22], opacity: [0, 0, 1] } },
      { name: "waves", svg: front, keys: water, loop: { move: "slide", ms: 2600 } },
      { name: "pouring water", svg: rainStreaks(0, 160, 0, 120, "#B8CDE0") + rainStreaks(6, 160, 5, 120, "#93AECA"), keys: { at: [0, 0.36, 0.4, 0.74, 0.8], opacity: [0, 0, 1, 1, 0] }, loop: { move: "fall", ms: 420 } }
    ],
    words: [
      { text: "Build the ark", from: 0.02, to: 0.18 },
      { text: "Of each kind, two", from: 0.2, to: 0.36 },
      { text: "The gates of the sky opened", from: 0.38, to: 0.54 },
      { text: "Waves like mountains", from: 0.56, to: 0.74 },
      { text: "It came to rest on al-Judi", from: 0.76, to: 1 }
    ]
  };
}

// The sea parted for Musa: the sea before them, then split, each side like a great mountain, and a dry path between
// (Quran 26:63, 20:77). Nobody is drawn: only the sea, its walls and the path.
function sea(): SignArt {
  const dawn = sky("#F4C08E", "#FBE0BE", 40) + `<rect y="40" width="160" height="10" fill="#FCEBD2"/>`;
  const shore = peaks(
    [
      [26, 9, 30],
      [80, 6, 26],
      [130, 10, 34]
    ],
    50,
    "#A8888C",
    false
  );
  const seaPlane = `<rect y="50" width="160" height="46" fill="#3D83C0"/><rect y="50" width="160" height="7" fill="#79AEDB"/>`;
  const seaWaves = curls(62, 22, "#9CC6E8", 0.8) + curls(74, 26, "#9CC6E8", 0.9, 12) + curls(88, 30, "#B9D8F0", 1.1, 2);
  const sand = `<path d="M0 96 L160 96 L160 120 L0 120 Z" fill="#E8D3A4"/><path d="M0 96 C30 98 50 95 80 97 C110 99 130 95 160 97" stroke="#FFFFFF" stroke-width="1.2" fill="none" opacity="0.9"/>`;
  // A path's commands and points, drawn on the left or mirrored onto the right.
  const shape = (flip: boolean, segments: (string | number)[][]) =>
    segments.map(([command, ...values]) => command + (values as number[]).map((value, i) => (i % 2 === 0 ? n(flip ? 160 - value : value) : value)).join(" ")).join(" ");
  // The crests along a wall's top, from its outer edge to the path, rolling like mountains.
  const crestLine: (string | number)[][] = [
    ["M", 0, 30],
    ["C", 3, 29, 7, 24, 13, 24],
    ["C", 19, 24, 23, 31, 29, 31],
    ["C", 35, 31, 39, 22, 45, 22],
    ["C", 51, 22, 56, 27, 60, 31]
  ];
  // Rows of little waves across a wall's front.
  const wallCurls = (flip: boolean) => {
    const k = flip ? -1 : 1;
    const d = [
      [4, 48],
      [30, 50],
      [14, 62],
      [40, 64],
      [4, 76],
      [30, 74]
    ]
      .map(([x, y]) => `M${n(flip ? 160 - x : x)} ${y} q${3 * k} -2 ${6 * k} 0 q${3 * k} 2 ${6 * k} 0`)
      .join(" ");
    return `<path d="${d}" stroke="#7DB4E2" stroke-width="0.9" fill="none" stroke-linecap="round"/>`;
  };
  // A wall of water each side: its front, lighter near its crests and darker at its foot, waves across it, and its
  // face toward the path, going away into the distance.
  const wall = (flip: boolean) =>
    `<path d="${shape(flip, [["M", 0, 96], ["L", 60, 96], ["L", 77, 50], ["L", 77, 46], ["C", 72, 41, 66, 35, 60, 31], ["C", 56, 27, 51, 22, 45, 22], ["C", 39, 22, 35, 31, 29, 31], ["C", 23, 31, 19, 24, 13, 24], ["C", 7, 24, 3, 29, 0, 30], ["Z"]])}" fill="#2F78B8"/>` +
    `<path d="${shape(flip, [...crestLine, ["L", 60, 39], ["C", 56, 35, 51, 30, 45, 30], ["C", 39, 30, 35, 39, 29, 39], ["C", 23, 39, 19, 32, 13, 32], ["C", 7, 32, 3, 37, 0, 38], ["Z"]])}" fill="#4A90CC"/>` +
    `<path d="${shape(flip, [["M", 0, 82], ["C", 20, 80, 40, 84, 60, 81], ["L", 60, 96], ["L", 0, 96], ["Z"]])}" fill="#286AA6"/>` +
    wallCurls(flip) +
    `<path d="${shape(flip, [["M", 60, 96], ["L", 77, 50], ["L", 77, 46], ["C", 72, 41, 66, 35, 60, 31], ["Z"]])}" fill="#1F5C96"/>` +
    `<path d="${shape(flip, [
      ["M", 60, 44],
      ["L", 77, 47.2],
      ["M", 60, 58],
      ["L", 77, 48.2],
      ["M", 60, 72],
      ["L", 77, 49],
      ["M", 60, 86],
      ["L", 77, 49.6]
    ])}" stroke="#3B7DBA" stroke-width="0.7"/>`;
  const foam = (flip: boolean) =>
    `<path d="${shape(flip, [...crestLine, ["C", 66, 35, 72, 41, 77, 46]])}" stroke="#FFFFFF" stroke-width="1.8" fill="none" stroke-linecap="round"/>` +
    [
      [11, 22.4],
      [15, 22.6],
      [43, 20.4],
      [47, 20.6],
      [27, 29.6]
    ]
      .map(([x, y]) => `<circle cx="${n(flip ? 160 - x : x)}" cy="${y}" r="0.9" fill="#FFFFFF"/>`)
      .join("");
  const path = `<path d="M60 96 L100 96 L83 50 L77 50 Z" fill="#E6CF98"/><path d="M66 90 l4 0 M88 92 l3 0 M74 76 l3 0 M84 70 l2 0 M78 60 l2 0" stroke="#C9AE72" stroke-width="0.8" stroke-linecap="round"/>`;
  const light = glow(80, 52, 14, "#FFF6D8", 0.12);
  // The walls rise from the sea, quickly at first, to their full height.
  const rise: SignKeys = { at: [0, 0.28, 0.31, 0.42], opacity: [0, 0, 1, 1], scaleY: [0.1, 0.1, 0.35, 1] };
  return {
    kind: "sea",
    ms: 10500,
    parts: [
      { name: "dawn sky", svg: dawn },
      { name: "sun rising", svg: SUN(124, 46), keys: { at: [0, 0.3], y: [8, -6] } },
      { name: "far shore", svg: shore },
      { name: "the sea", svg: seaPlane },
      { name: "waves on the sea", svg: seaWaves, clip: { x: 0, y: 52, w: 160, h: 44 }, loop: { move: "slide", ms: 5200 } },
      {
        name: "the sea splits",
        svg: `<path d="M80 95 L80 52" stroke="#FFFFFF" stroke-width="1.6" stroke-linecap="round"/><path d="M76 92 l-2 -2 M84 92 l2 -2 M77 80 l-1.6 -1.6 M83 80 l1.6 -1.6" stroke="#FFFFFF" stroke-width="0.9" stroke-linecap="round"/>`,
        origin: { x: 80, y: 96 },
        keys: { at: [0, 0.24, 0.28, 0.32, 0.36], opacity: [0, 0, 1, 1, 0], scaleY: [0, 0, 1, 1, 1] }
      },
      { name: "dry path", svg: path, keys: showFrom(0.3, 0.4) },
      { name: "light on the path", svg: light, keys: showFrom(0.44, 0.56), loop: { move: "twinkle", ms: 2400, low: 0.5 } },
      { name: "left wall of water", svg: wall(false), origin: { x: 40, y: 96 }, keys: rise, loop: { move: "bob", ms: 2600, y: 0.5 } },
      { name: "right wall of water", svg: wall(true), origin: { x: 120, y: 96 }, keys: rise, loop: { move: "bob", ms: 2600, y: 0.5, phase: 0.5 } },
      { name: "foam on the crests", svg: foam(false) + foam(true), keys: { at: [0, 0.38, 0.44], opacity: [0, 0, 1] }, loop: { move: "twinkle", ms: 1100, low: 0.55 } },
      { name: "shore", svg: sand }
    ],
    words: [
      { text: "The sea before them", from: 0.02, to: 0.22 },
      { text: "The sea split", from: 0.24, to: 0.48 },
      { text: "Each side like a great mountain", from: 0.5, to: 0.74 },
      { text: "A dry path through the sea", from: 0.76, to: 1 }
    ]
  };
}

/** A quail: a small round brown bird with a speckled breast, its feet at (x, y); `left`: facing left. */
function quail(x: number, y: number, left = false) {
  const d = left ? -1 : 1;
  const p = (dx: number, dy: number) => `${n(x + dx * d)} ${n(y + dy)}`;
  return (
    `<path d="M${p(-4.6, -3.4)} L${p(-6.4, -4.6)} L${p(-6, -2.8)} Z" fill="#6E5139"/>` +
    `<ellipse cx="${n(x)}" cy="${n(y - 3.2)}" rx="4.2" ry="2.9" fill="#9B7653"/>` +
    `<circle cx="${n(x + 3.6 * d)}" cy="${n(y - 5.6)}" r="1.7" fill="#7A5A3E"/><path d="M${p(5.1, -5.8)} L${p(6.3, -5.4)} L${p(5.1, -5)} Z" fill="#3A2A1A"/>` +
    `<circle cx="${n(x + 4 * d)}" cy="${n(y - 6)}" r="0.35" fill="#1A1A1A"/>` +
    `<circle cx="${p(1.2, -3.4).split(" ")[0]}" cy="${n(y - 3.4)}" r="0.4" fill="#F2E6D2"/><circle cx="${p(-0.8, -2.4).split(" ")[0]}" cy="${n(y - 2.4)}" r="0.4" fill="#F2E6D2"/><circle cx="${p(2.4, -2.2).split(" ")[0]}" cy="${n(y - 2.2)}" r="0.4" fill="#F2E6D2"/>` +
    `<path d="M${p(-1, -0.4)} L${p(-1.2, 0)} M${p(1, -0.4)} L${p(1.2, 0)}" stroke="#6E5139" stroke-width="0.6"/>`
  );
}

/** A low desert bush, its foot's middle at (x, y). */
const bush = (x: number, y: number) =>
  `<circle cx="${x - 3.4}" cy="${y - 2.6}" r="3" fill="#6E9A4A"/><circle cx="${x + 3.4}" cy="${y - 2.6}" r="3" fill="#6E9A4A"/><circle cx="${x}" cy="${y - 4.6}" r="3.6" fill="#7DAA55"/>`;

// The Children of Israel in the desert: shaded with clouds, fed the manna and the quails, and twelve springs gushing
// from the rock, each tribe knowing its own drinking place (Quran 2:57, 2:60). The rock is struck by no one drawn.
function springs(): SignArt {
  const dunes = `<path d="M0 66 C20 58 40 60 60 64 C80 68 100 58 124 60 C140 62 150 64 160 62 L160 72 L0 72 Z" fill="#E0C089"/>`;
  const ground = `<rect y="68" width="160" height="52" fill="#ECD5A2"/><path d="M8 84 l5 0 M120 82 l6 0 M30 112 l5 0 M140 114 l4 0" stroke="#D2B47C" stroke-width="0.8" stroke-linecap="round"/>`;
  const tent = (x: number, y: number) =>
    `<path d="M${x - 6} ${y} L${x} ${y - 9} L${x + 6} ${y} Z" fill="#C9A77A"/><path d="M${x} ${y - 9} L${x + 6} ${y} L${x + 2.6} ${y} Z" fill="#A8875D"/><path d="M${x - 1.4} ${y} L${x} ${y - 4.4} L${x + 1.4} ${y} Z" fill="#5E4129"/>`;
  const tents = [
    [10, 76],
    [24, 74],
    [38, 77],
    [122, 76],
    [136, 73],
    [150, 77]
  ]
    .map(([x, y]) => tent(x, y))
    .join("");
  const rock =
    `<path d="M64 88 C61 80 65 70 75 67 C84 64 94 66 97 74 C100 82 97 88 91 89.4 L70 89.4 C66 89.4 64.4 89 64 88 Z" fill="#8D8378"/>` +
    `<path d="M84 66 C92 66 96 70 97 74 C100 82 97 88 91 89.4 L84 89.4 Z" fill="#000000" opacity="0.13"/><path d="M70 74 l5 -2 M78 80 l6 1 M88 72 l4 2" stroke="#A59B8F" stroke-width="0.8"/>`;
  const cracks = `<path d="M74 70 L76 76 L73 81 L76 88 M86 68 L84 75 L88 81 L86 88 M80 72 L80 80" stroke="#4E463F" stroke-width="0.8" fill="none"/>`;
  const pools = Array.from({ length: 12 }, (_, i) => 8 + i * 13.1);
  const streams = pools.map((x, i) => {
    const sx = 68 + (i * 24) / 11;
    return `M${n(sx)} 87 C${n(sx)} 95 ${n(x)} 96 ${n(x)} 103`;
  });
  const streamSvg = `<path d="${streams.join(" ")}" stroke="#5AA7DE" stroke-width="1.6" fill="none" stroke-linecap="round"/>`;
  const flowing = `<path d="${streams.join(" ")}" stroke="#E4F3FC" stroke-width="0.6" fill="none" stroke-dasharray="1.6 3.2"/>`;
  const poolSvg = pools.map((x) => `<ellipse cx="${n(x)}" cy="104.4" rx="4.6" ry="1.7" fill="#4F9EDB"/><path d="M${n(x - 2)} 104 l2 0" stroke="#D8EEFB" stroke-width="0.5"/>`).join("");
  const spray = [70, 74, 78, 82, 86, 90].map((x, i) => `<circle cx="${x}" cy="${86 + (i % 2) * 1.6}" r="0.7" fill="#FFFFFF"/>`).join("");
  const bushAt = [
    [14, 84],
    [46, 86],
    [114, 86],
    [146, 84]
  ];
  const bushes = bushAt.map(([x, y]) => bush(x, y)).join("");
  // The manna settles white on the bushes, like dew.
  const manna = bushAt
    .map(
      ([x, y]) =>
        `<circle cx="${x - 3}" cy="${y - 5}" r="1.1" fill="#FFFDF2"/><circle cx="${x + 1}" cy="${y - 7.6}" r="1.1" fill="#FFFDF2"/><circle cx="${x + 4}" cy="${y - 4.6}" r="1.1" fill="#FFFDF2"/><circle cx="${x - 0.6}" cy="${y - 3}" r="0.9" fill="#FFFDF2"/>`
    )
    .join("");
  const falling = [
    [12, 40],
    [30, 56],
    [48, 34],
    [66, 62],
    [94, 44],
    [112, 30],
    [130, 58],
    [148, 40],
    [22, 90],
    [138, 84]
  ]
    .map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.2" fill="#FFFDF2"/>`)
    .join("");
  const quails = quail(16, 93) + quail(30, 95, true) + quail(46, 92) + quail(114, 93, true) + quail(130, 95) + quail(146, 92, true);
  return {
    kind: "springs",
    ms: 11000,
    parts: [
      { name: "sky", svg: DAY_SKY },
      { name: "hot sun", svg: SUN(140, 24), loop: { move: "twinkle", ms: 1800, low: 0.75 } },
      { name: "dunes", svg: dunes },
      { name: "desert", svg: ground },
      { name: "tents", svg: tents },
      { name: "shade of the clouds", svg: `<rect y="62" width="160" height="58" fill="#23303D"/>`, keys: { at: [0, 0.1, 0.2], opacity: [0, 0, 0.14] } },
      { name: "clouds", svg: cloud(30, 44, 1.2, "#FFFFFF") + cloud(84, 38, 1.4, "#FFFFFF") + cloud(132, 46, 1.1, "#FFFFFF"), keys: { at: [0, 0.04, 0.2], x: [-170, -170, 0] }, loop: { move: "bob", ms: 6000, x: 3 } },
      { name: "rock", svg: rock },
      { name: "cracks in the rock", svg: cracks, keys: showFrom(0.5, 0.53) },
      { name: "twelve springs", svg: streamSvg, origin: { x: 80, y: 87 }, keys: { at: [0, 0.53, 0.62], scale: [0, 0, 1] } },
      { name: "flowing water", svg: flowing, keys: showFrom(0.6, 0.64), loop: { move: "twinkle", ms: 700, low: 0.3 } },
      { name: "spray", svg: spray, keys: showFrom(0.53, 0.56), loop: { move: "bob", ms: 400, y: 0.8 } },
      { name: "twelve pools", svg: poolSvg, origin: { x: 80, y: 104.4 }, keys: { at: [0, 0.6, 0.7], scaleY: [0, 0, 1] } },
      { name: "bushes", svg: bushes },
      { name: "manna falling", svg: falling, clip: { x: 0, y: 24, w: 160, h: 82 }, keys: { at: [0, 0.27, 0.3, 0.44, 0.48], opacity: [0, 0, 1, 1, 0] }, loop: { move: "fall", ms: 2400 } },
      { name: "manna on the bushes", svg: manna, keys: showFrom(0.32, 0.44) },
      { name: "quails", svg: quails, keys: { at: [0, 0.29, 0.3, 0.42], x: [150, 150, 150, 0], y: [-60, -60, -60, 0], opacity: [0, 0, 1, 1] }, loop: { move: "bob", ms: 900, y: 0.5 } }
    ],
    words: [
      { text: "Shaded by clouds", from: 0.02, to: 0.24 },
      { text: "Manna and quails", from: 0.26, to: 0.48 },
      { text: "Twelve springs gushed out", from: 0.5, to: 0.74 },
      { text: "Each knew its drinking place", from: 0.76, to: 1 }
    ]
  };
}

/** A home carved in the rock: a tall doorway in a recess, a stepped crown above it. */
const carved = (x: number, y: number, w: number, h: number) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#B37548"/>` +
  `<path d="M${x} ${y} L${n(x + w * 0.2)} ${y - 2.2} L${n(x + w * 0.4)} ${y} L${n(x + w * 0.6)} ${y - 2.2} L${n(x + w * 0.8)} ${y} L${x + w} ${y - 2.2} L${x + w} ${y} Z" fill="#A4673D"/>` +
  `<rect x="${n(x + w * 0.32)}" y="${n(y + h * 0.36)}" width="${n(w * 0.36)}" height="${n(h * 0.64)}" fill="#4A2F1E"/>` +
  `<path d="M${n(x + w * 0.24)} ${n(y + h * 0.3)} L${n(x + w * 0.76)} ${n(y + h * 0.3)}" stroke="#8C5530" stroke-width="0.8"/>`;

// The she-camel of Salih among Thamud's homes carved in the mountains: she comes, a sign from Allah, drinks on her day,
// and the people draw water on theirs; "do not harm her" (Quran 26:149, 26:155, 26:156, 91:13). Salih is not drawn.
function sheCamel(): SignArt {
  const cliffs =
    `<path d="M0 28 C10 26 22 29 32 34 C42 40 48 48 51 60 L53 97 L0 97 Z" fill="#C98A5C"/><path d="M32 34 C42 40 48 48 51 60 L53 97 L40 97 Z" fill="#000000" opacity="0.1"/>` +
    `<path d="M160 32 C150 30 138 33 128 40 C118 47 114 56 112 66 L110 97 L160 97 Z" fill="#C4855A"/><path d="M128 40 C118 47 114 56 112 66 L110 97 L122 97 Z" fill="#FFFFFF" opacity="0.08"/>`;
  const homes = carved(6, 52, 16, 22) + carved(28, 66, 14, 20) + carved(122, 56, 15, 22) + carved(141, 68, 14, 20);
  const ground = LAND("#E5C99A", 96) + `<path d="M60 110 l6 0 M100 114 l5 0 M20 108 l4 0" stroke="#CDAE7A" stroke-width="0.8" stroke-linecap="round"/>`;
  const palms = palm(64, 97, 28) + palm(96, 97, 22) + tuft(56, 98, "#6E9A44", 5) + tuft(104, 98, "#6E9A44", 5);
  const well =
    `<rect x="62" y="96" width="16" height="9" fill="#9A8B78"/><path d="M62 99 L78 99 M62 102 L78 102 M66 96 L66 99 M73 99 L73 102 M68 102 L68 105" stroke="#7D705F" stroke-width="0.6"/>` +
    `<ellipse cx="70" cy="96" rx="8" ry="2.2" fill="#B2A491"/><ellipse cx="70" cy="96" rx="6" ry="1.4" fill="#2E2A26"/>` +
    `<path d="M63 96 L63 86 M77 96 L77 86 M62 86 L78 86" stroke="#7A5230" stroke-width="1.2"/><path d="M70 86 L70 92" stroke="#C9B48A" stroke-width="0.5"/><rect x="68.6" y="92" width="2.8" height="2.4" fill="#7A5230"/>`;
  const trough = `<path d="M80 101 L106 101 L104 106 L82 106 Z" fill="#8F8170"/>`;
  const troughWater = `<rect x="82" y="101.6" width="22" height="2.6" fill="#5AA7DE"/>`;
  const jars = [50, 55, 60]
    .map(
      (x) =>
        `<path d="M${x - 2} 105 C${x - 3} 102 ${x - 2.6} 99 ${x - 1.2} 98.4 L${x - 1.2} 97.4 L${x + 1.2} 97.4 L${x + 1.2} 98.4 C${x + 2.6} 99 ${x + 3} 102 ${x + 2} 105 Z" fill="#B5643A"/><ellipse cx="${x}" cy="97.4" rx="1.2" ry="0.4" fill="#5AA7DE"/>`
    )
    .join("");
  const shrub = `<circle cx="140" cy="104" r="3.4" fill="#7DAA55"/><circle cx="145" cy="105" r="2.8" fill="#6E9A4A"/><circle cx="136" cy="105.4" r="2.6" fill="#6E9A4A"/>`;
  return {
    kind: "sheCamel",
    ms: 11000,
    stillAt: 0.56,
    parts: [
      { name: "sky", svg: DAY_SKY },
      { name: "sun", svg: SUN(84, 22), keys: { at: [0, 0.66, 0.72, 0.78, 0.84], y: [0, 0, 40, 40, 0], opacity: [1, 1, 0, 0, 1] } },
      { name: "cliffs", svg: cliffs },
      { name: "homes carved in the mountains", svg: homes },
      { name: "palms", svg: palms, origin: { x: 80, y: 97 }, loop: { move: "sway", ms: 4200, angle: 1.2 } },
      { name: "ground", svg: ground },
      { name: "shrub", svg: shrub },
      { name: "well", svg: well },
      { name: "trough", svg: trough },
      { name: "water in the trough", svg: troughWater, origin: { x: 93, y: 104.2 }, keys: { at: [0, 0.48, 0.66, 0.74, 0.8], scaleY: [1, 1, 0.15, 0.15, 1] } },
      {
        name: "she-camel drinking",
        svg: animalAt("camel", 90, n(104 - 73 * 0.44), 0.44, true),
        keys: { at: [0, 0.24, 0.38, 0.7, 0.71], x: [80, 80, 0, 0, 0], opacity: [1, 1, 1, 1, 0] },
        loop: { move: "bob", ms: 700, y: 0.5 }
      },
      { name: "she-camel grazing", svg: animalAt("camel", 112, n(104 - 73 * 0.44), 0.44), keys: showFrom(0.7, 0.71), loop: { move: "bob", ms: 1400, y: 0.4 } },
      { name: "water jars", svg: jars, keys: showFrom(0.76, 0.8) },
      { name: "night", svg: `<rect width="160" height="120" fill="#16284C"/>`, keys: { at: [0, 0.66, 0.71, 0.73, 0.78], opacity: [0, 0, 0.72, 0.72, 0] } },
      {
        name: "stars",
        svg: stars([
          [20, 14],
          [44, 22],
          [70, 10],
          [100, 18],
          [128, 12],
          [150, 24]
        ]),
        keys: { at: [0, 0.68, 0.71, 0.73, 0.76], opacity: [0, 0, 1, 1, 0] },
        loop: { move: "twinkle", ms: 900, low: 0.4 }
      }
    ],
    words: [
      { text: "Homes carved in the mountains", from: 0.02, to: 0.2 },
      { text: "The she-camel of Allah", from: 0.22, to: 0.44 },
      { text: "Her day to drink", from: 0.46, to: 0.64 },
      { text: "Your day to drink", from: 0.66, to: 0.84 },
      { text: "Do not harm her", from: 0.86, to: 1 }
    ]
  };
}

// The valley of the ants, seen up close: an ant warns the others to go into their homes before Sulayman's army passes
// without noticing them, and he smiles at her words and thanks Allah (Quran 27:18, 27:19). The army is only its dust,
// far off on the hills.
function ants(): SignArt {
  const hills = `<path d="M0 48 C20 40 40 42 60 46 C80 50 100 40 124 42 C140 44 150 46 160 44 L160 58 L0 58 Z" fill="#A9C48A"/>`;
  const ground =
    `<rect y="56" width="160" height="64" fill="#B9925F"/><rect y="56" width="160" height="8" fill="#9DBA74"/>` +
    [6, 24, 58, 102, 136, 154].map((x, i) => tuft(x, 64 + (i % 2) * 2, "#6E9A44", 7)).join("") +
    flower(42, 64, "#F6B73C", 7) +
    flower(118, 65, "#F47C9B", 7) +
    `<path d="M20 110 l5 0 M70 114 l4 0 M140 112 l5 0" stroke="#A47E4E" stroke-width="0.8" stroke-linecap="round"/>`;
  // Their homes: two mounds, each with its hole at the top.
  const mound = (x: number, y: number) =>
    `<path d="M${x - 22} ${y} C${x - 14} ${y - 16} ${x + 14} ${y - 16} ${x + 22} ${y} Z" fill="#9C7647"/>` +
    `<path d="M${x - 12} ${y - 6} l4 -1 M${x + 7} ${y - 5} l5 1 M${x - 3} ${y - 3} l3 0" stroke="#86633A" stroke-width="0.8" stroke-linecap="round"/><ellipse cx="${x}" cy="${y - 11}" rx="4.4" ry="1.7" fill="#3A2716"/>`;
  const mounds = mound(34, 98) + mound(126, 100);
  const pebble = `<ellipse cx="80" cy="82" rx="11" ry="4.6" fill="#A7A096"/><ellipse cx="77" cy="80.4" rx="5" ry="1.8" fill="#C2BBB1"/>`;
  // A line of ants walking left, each with a seed in its jaws: they go round and round across the valley.
  const carrier = (x: number, feet: number) => {
    const y = n(feet - 73 * 0.14);
    return animalAt("ant", x, y, 0.14, true) + `<ellipse cx="${n(x + 0.6)}" cy="${n(y + 6.6)}" rx="1.5" ry="1.05" fill="#E9C46A"/>`;
  };
  const line = Array.from({ length: 7 }, (_, i) => carrier(n(2 + i * 23), i % 2 ? 107 : 104)).join("");
  const warner = animalAt("ant", 69, n(78 - 73 * 0.22), 0.22, true);
  const calls = `<path d="M67.4 67.6 q-3 2.4 0 4.8 M64 66 q-4.6 4 0 8" stroke="#FFFFFF" stroke-width="0.9" fill="none" stroke-linecap="round"/>`;
  const dust = `<g fill="#E6D3B0"><circle cx="10" cy="44" r="3.4"/><circle cx="16" cy="42" r="4"/><circle cx="22" cy="44" r="3.2"/><circle cx="5" cy="45.4" r="2.6"/></g>`;
  // An ant hurrying into a hole: (x, feet) where it starts, `hole` where it goes in.
  const hurry = (x: number, feet: number, hole: [number, number], left: boolean, from: number) => {
    const middle = { x: x + 7, y: feet - 5 };
    return {
      svg: animalAt("ant", x, n(feet - 73 * 0.14), 0.14, left),
      origin: middle,
      keys: {
        at: [0, at3(from - 0.01), from, at3(from + 0.1), at3(from + 0.12)],
        x: [0, 0, 0, n(hole[0] - middle.x), n(hole[0] - middle.x)],
        y: [0, 0, 0, n(hole[1] - middle.y), n(hole[1] - middle.y)],
        scale: [1, 1, 1, 0.6, 0.6],
        opacity: [0, 0, 1, 1, 0]
      }
    };
  };
  const hurrying = [
    hurry(48, 104, [34, 87], true, 0.5),
    hurry(6, 107, [34, 87], false, 0.52),
    hurry(58, 100, [34, 87], true, 0.54),
    hurry(98, 107, [126, 89], false, 0.51),
    hurry(146, 104, [126, 89], true, 0.53),
    hurry(108, 101, [126, 89], false, 0.55)
  ];
  return {
    kind: "ants",
    ms: 10500,
    stillAt: 0.4,
    parts: [
      { name: "sky", svg: DAY_SKY },
      { name: "sun", svg: SUN(140, 22) },
      { name: "hills", svg: hills },
      { name: "army's dust", svg: dust, keys: { at: [0, 0.28, 0.4, 0.86, 0.96], x: [0, 0, 6, 130, 150], opacity: [0, 0, 1, 1, 0] }, loop: { move: "bob", ms: 500, y: 0.5 } },
      { name: "valley", svg: ground },
      { name: "ant hills", svg: mounds },
      { name: "pebble", svg: pebble },
      { name: "ants carrying seeds", svg: line, keys: { at: [0, 0.5, 0.56], opacity: [1, 1, 0] }, loop: { move: "slide", ms: 9000, reverse: true } },
      ...hurrying.map((each, i) => ({ name: `ant hurrying home ${i + 1}`, svg: each.svg, origin: each.origin, keys: each.keys })),
      {
        name: "the ant who warned",
        svg: warner,
        origin: { x: 80, y: 72 },
        keys: { at: [0, 0.62, 0.72, 0.74], x: [0, 0, -46, -46], y: [0, 0, 15, 15], scale: [1, 1, 0.6, 0.6], opacity: [1, 1, 1, 0] },
        loop: { move: "bob", ms: 600, y: 0.4 }
      },
      { name: "her call", svg: calls, keys: { at: [0, 0.26, 0.28, 0.5, 0.52], opacity: [0, 0, 1, 1, 0] }, loop: { move: "twinkle", ms: 500, low: 0.2 } },
      { name: "ant looking out", svg: animalAt("ant", 28, n(88.6 - 73 * 0.12), 0.12), keys: { at: [0, 0.86, 0.9], opacity: [0, 0, 1] }, loop: { move: "bob", ms: 1600, y: 0.6 } }
    ],
    words: [
      { text: "The valley of the ants", from: 0.02, to: 0.24 },
      { text: "An ant warned the others", from: 0.26, to: 0.48 },
      { text: "Into your homes!", from: 0.5, to: 0.72 },
      { text: "He smiled and thanked Allah", from: 0.74, to: 1 }
    ]
  };
}

// The hoopoe: missing when the birds were gathered in ranks, it comes back from far off with sure news from Saba,
// then flies off with the letter (Quran 27:17, 27:20 to 27:28). Sulayman, the queen and her people are not drawn.
function hoopoe(): SignArt {
  const far = peaks(
    [
      [124, 14, 24],
      [150, 18, 22]
    ],
    62,
    "#9DB3C8",
    false
  );
  const hills = `<path d="M0 66 C24 58 48 60 72 64 C96 68 120 60 160 62 L160 82 L0 82 Z" fill="#A9C48A"/>`;
  const ground = LAND("#93B86C", 80) + [12, 40, 70, 110, 146].map((x, i) => tuft(x, 96 + (i % 2) * 8, "#6E9A44", 6)).join("") + flower(28, 106, "#F47C9B", 8) + flower(124, 104, "#F6B73C", 8);
  // The birds gathered in a rank, hovering, each turned toward the middle, where one place is empty.
  const gathered = animalAt("dove", 2, 56, 0.22) + animalAt("sparrow", 28, 60, 0.22) + animalAt("crow", 88, 60, 0.22, true) + animalAt("eagle", 112, 55, 0.24, true) + animalAt("bird", 138, 60, 0.22, true);
  const letter = `<rect x="66.4" y="71.4" width="7" height="3" rx="1" fill="#F4ECDA"/><rect x="69.3" y="71.2" width="1.2" height="3.4" fill="#B5643A"/>`;
  // Far off by Saba, small, and back to the empty place; then the same way back with the letter.
  const far64 = { x: 64, y: -30, scale: 0.3 };
  return {
    kind: "hoopoe",
    ms: 10500,
    stillAt: 0.56,
    parts: [
      { name: "sky", svg: DAY_SKY },
      { name: "clouds", svg: cloud(30, 30, 0.8, "#FFFFFF") + cloud(126, 22, 0.7, "#FFFFFF"), loop: { move: "bob", ms: 7000, x: 4 } },
      { name: "far land of Saba", svg: far },
      { name: "sun over Saba", svg: SUN(140, 44) },
      { name: "hills", svg: hills },
      { name: "ground", svg: ground },
      { name: "birds gathered", svg: gathered, loop: { move: "bob", ms: 1200, y: 0.8 } },
      {
        name: "the hoopoe coming back",
        svg: animalAt("hoopoe", 59, 58, 0.22, true),
        origin: { x: 70, y: 66 },
        keys: {
          at: [0, 0.26, 0.27, 0.46, 0.62, 0.63],
          x: [far64.x, far64.x, far64.x, 0, 0, 0],
          y: [far64.y, far64.y, far64.y, 0, 0, 0],
          scale: [far64.scale, far64.scale, far64.scale, 1, 1, 1],
          opacity: [0, 0, 1, 1, 1, 0]
        },
        loop: { move: "bob", ms: 420, y: 0.7 }
      },
      {
        name: "the hoopoe flying off",
        svg: animalAt("hoopoe", 59, 58, 0.22),
        origin: { x: 70, y: 66 },
        keys: { at: [0, 0.62, 0.63, 0.66, 0.9, 0.92], x: [0, 0, 0, 0, far64.x, far64.x], y: [0, 0, 0, 0, far64.y, far64.y], scale: [1, 1, 1, 1, far64.scale, far64.scale], opacity: [0, 0, 1, 1, 1, 0] },
        loop: { move: "bob", ms: 420, y: 0.7 }
      },
      {
        name: "the letter",
        svg: letter,
        origin: { x: 70, y: 66 },
        keys: { at: [0, 0.5, 0.54, 0.66, 0.9, 0.92], x: [0, 0, 0, 0, far64.x, far64.x], y: [0, 0, 0, 0, far64.y, far64.y], scale: [1, 1, 1, 1, far64.scale, far64.scale], opacity: [0, 0, 1, 1, 1, 0] },
        loop: { move: "bob", ms: 420, y: 0.7 }
      }
    ],
    words: [
      { text: "Where is the hoopoe?", from: 0.02, to: 0.24 },
      { text: "News from Saba", from: 0.26, to: 0.48 },
      { text: "Carrying the letter", from: 0.5, to: 0.74 },
      { text: "Off to Saba", from: 0.76, to: 1 }
    ]
  };
}

/** A lean cow, bones showing, facing left, its box's corner at (x, y), `s` times the size of a card's animal. */
function leanCow(x: number, y: number, s: number) {
  const inner =
    `<path d="M20 34 L18 73 M27 36 L26 73 M66 36 L67 73 M73 35 L75 73" stroke="#7A6B5B" stroke-width="3.4" stroke-linecap="round"/>` +
    `<path d="M18 72 L18 74 M26 72 L26 74 M67 72 L67 74 M75 72 L75 74" stroke="#3A3028" stroke-width="3.8"/>` +
    `<path d="M16 30 C20 22 70 22 78 28 C82 34 80 40 74 40 C60 42 34 42 24 40 C18 39 14 36 16 30 Z" fill="#9A8A77"/>` +
    `<path d="M34 27 L33 39 M42 26 L41 40 M50 26 L50 40 M58 27 L58 40" stroke="#7A6B5B" stroke-width="1.6"/>` +
    `<path d="M80 30 C86 30 88 40 86 46" stroke="#7A6B5B" stroke-width="1.6" fill="none"/>` +
    `<path d="M18 28 C10 26 4 30 2 36 C1 40 4 42 8 41 C12 40 16 36 18 32 Z" fill="#8A7A68"/>` +
    `<path d="M10 26 L6 18 M14 26 L16 18" stroke="#E8DFCF" stroke-width="2" stroke-linecap="round"/><circle cx="8" cy="32" r="1.4" fill="#2B2B2B"/>`;
  return `<g transform="translate(${x} ${y}) scale(${s})">${inner}</g>`;
}

/** An ear of grain on its stalk, its foot at (x, y): green and upright, or dry, pale and bent. */
function ear(x: number, y: number, green: boolean) {
  if (green) {
    let grains = "";
    for (let i = 0; i < 5; i += 1)
      grains += `<ellipse cx="${n(x - 1.3)}" cy="${n(y - 20 + i * 2.2)}" rx="1.1" ry="1.5" fill="#6DB24F"/><ellipse cx="${n(x + 1.3)}" cy="${n(y - 19 + i * 2.2)}" rx="1.1" ry="1.5" fill="#5FA344"/>`;
    return `<path d="M${x} ${y} L${x} ${y - 10}" stroke="#4E9A3A" stroke-width="1"/><path d="M${x} ${y - 6} q-3 -2 -5 -1" stroke="#4E9A3A" stroke-width="0.8" fill="none"/>${grains}<path d="M${x} ${y - 21} l0 -4" stroke="#6DB24F" stroke-width="0.5"/>`;
  }
  let grains = "";
  for (let i = 0; i < 4; i += 1) grains += `<ellipse cx="${n(x + 4 + i * 1.6)}" cy="${n(y - 15 + i * 2)}" rx="0.8" ry="1.2" fill="#C9A35A" transform="rotate(40 ${n(x + 4 + i * 1.6)} ${n(y - 15 + i * 2)})"/>`;
  return `<path d="M${x} ${y} C${x} ${y - 10} ${x + 1} ${y - 15} ${x + 4} ${y - 16}" stroke="#B8975A" stroke-width="1" fill="none"/>${grains}`;
}

// The king's dream: seven fat cows eaten by seven lean ones, seven green ears and others dry; and its meaning: sow for
// seven years and leave the grain in its ears, then seven hard years, then a year of rain (Quran 12:43, 12:47 to
// 12:49). The king and Yusuf are not drawn.
function dream(): SignArt {
  const dreamSky = sky("#4F4A8C", "#7D77BE", 64);
  const dreamStars = stars([
    [14, 12],
    [36, 26],
    [58, 8],
    [96, 14],
    [118, 30],
    [146, 10],
    [80, 36],
    [24, 46],
    [138, 48]
  ]);
  const meadow = (fill: string) => `<path d="M0 84 C40 80 80 82 120 81 C140 80 150 82 160 82 L160 120 L0 120 Z" fill="${fill}"/>`;
  // Seven cows in two rows: four at the back, three nearer and bigger.
  const backRow = [8, 46, 84, 122];
  const frontRow = [24, 68, 112];
  const fat = backRow.map((x) => animalAt("cow", x, n(94 - 73 * 0.22), 0.22, true)).join("") + frontRow.map((x) => animalAt("cow", x, n(106 - 73 * 0.27), 0.27, true)).join("");
  const lean = backRow.map((x) => leanCow(x, n(94 - 74 * 0.22), 0.22)).join("") + frontRow.map((x) => leanCow(x, n(106 - 74 * 0.27), 0.27)).join("");
  const bigEar = (x: number, green: boolean) => `<g transform="translate(${x} 104) scale(1.5)">${ear(0, 0, green)}</g>`;
  const greenEars = Array.from({ length: 7 }, (_, i) => bigEar(12 + i * 10, true)).join("");
  const dryEars = Array.from({ length: 7 }, (_, i) => bigEar(86 + i * 10, false)).join("");
  // The meaning, by day: the harvest stored in its ears, in a house of mud bricks.
  const store =
    `<path d="M84 104 L84 80 L120 72 L156 80 L156 104 Z" fill="#C8A274"/><path d="M84 80 L120 72 L156 80" stroke="#9C7A50" stroke-width="1.4" fill="none"/>` +
    `<rect x="98" y="84" width="44" height="20" fill="#5E4129"/>`;
  const sheaf = (x: number, y: number) =>
    `<path d="M${x - 3.4} ${y} L${x - 1.2} ${y - 10} L${x + 1.2} ${y - 10} L${x + 3.4} ${y} Z" fill="#E2B04A"/><path d="M${x - 2} ${y - 10} l-1 -3 M${x} ${y - 10} l0 -3.4 M${x + 2} ${y - 10} l1 -3" stroke="#E2B04A" stroke-width="1"/><path d="M${x - 2} ${y - 5} L${x + 2} ${y - 5}" stroke="#9C7A30" stroke-width="1"/>`;
  const sheaves = [
    [104, 104],
    [112, 104],
    [120, 104],
    [128, 104],
    [136, 104],
    [108, 94.6],
    [116, 94.6],
    [124, 94.6],
    [132, 94.6]
  ].map(([x, y]) => sheaf(x, y));
  const field = (color: string) => [8, 18, 28, 38, 48, 58, 68].map((x) => `<path d="M${x} 104 L${x} 94" stroke="${color}" stroke-width="1.2"/><ellipse cx="${x}" cy="92.4" rx="1.1" ry="2.4" fill="${color}"/>`).join("");
  const cracks = `<path d="M10 110 l6 2 l3 -3 M34 114 l5 -2 l4 3 M60 108 l6 3 M78 116 l4 -3" stroke="#9C7A50" stroke-width="0.8" fill="none"/>`;
  const dreaming = (from: number) => ({ at: [0, from, from + 0.02], opacity: [1, 1, 0] });
  return {
    kind: "dream",
    ms: 11000,
    stillAt: 0.34,
    parts: [
      { name: "day sky", svg: DAY_SKY },
      { name: "sky of the dream", svg: dreamSky + dreamStars, keys: dreaming(0.6) },
      { name: "stars twinkling", svg: dreamStars, keys: dreaming(0.6), loop: { move: "twinkle", ms: 1500, low: 0.2 } },
      { name: "meadow of the dream", svg: meadow("#6E9C78"), keys: dreaming(0.6) },
      { name: "green field", svg: meadow("#8CC56A"), keys: { at: [0, 0.6, 0.62, 0.7, 0.76, 0.84, 0.92], opacity: [0, 0, 1, 1, 0, 0, 1] } },
      { name: "dry land", svg: meadow("#D8B97E") + cracks, keys: { at: [0, 0.7, 0.76, 0.86, 0.92], opacity: [0, 0, 1, 1, 0] } },
      { name: "seven fat cows", svg: fat, keys: { at: [0, 0.3, 0.38], opacity: [1, 1, 0] }, loop: { move: "bob", ms: 2400, y: 0.4 } },
      { name: "seven lean cows", svg: lean, keys: { at: [0, 0.2, 0.32, 0.4, 0.44], x: [170, 170, 0, 0, 0], opacity: [1, 1, 1, 1, 0] }, loop: { move: "bob", ms: 600, y: 0.4 } },
      { name: "seven green ears", svg: greenEars, origin: { x: 42, y: 104 }, keys: { at: [0, 0.42, 0.48, 0.6, 0.62], scaleY: [0, 0, 1, 1, 1], opacity: [1, 1, 1, 1, 0] }, loop: { move: "sway", ms: 2600, angle: 2 } },
      { name: "seven dry ears", svg: dryEars, origin: { x: 120, y: 104 }, keys: { at: [0, 0.44, 0.5, 0.6, 0.62], scaleY: [0, 0, 1, 1, 1], opacity: [1, 1, 1, 1, 0] } },
      { name: "wheat growing", svg: field("#D9A93E"), origin: { x: 38, y: 104 }, keys: { at: [0, 0.62, 0.66, 0.7, 0.72], scaleY: [0, 0, 1, 1, 1], opacity: [0, 1, 1, 1, 0] }, loop: { move: "sway", ms: 2200, angle: 2 } },
      { name: "storehouse", svg: store, keys: showFrom(0.61, 0.64) },
      ...sheaves.map((svg, i) => ({
        name: `sheaf ${i + 1}`,
        svg,
        keys: { at: [0, 0.64 + i * 0.008, 0.66 + i * 0.008, 0.76 + (8 - i) * 0.008, 0.78 + (8 - i) * 0.008], opacity: [0, 0, 1, 1, i < 5 ? 1 : 0] }
      })),
      { name: "rain", svg: rainStreaks(), keys: { at: [0, 0.82, 0.86, 0.98, 1], opacity: [0, 0, 1, 1, 0.8] }, loop: { move: "fall", ms: 650 } },
      {
        name: "grass after the rain",
        svg: [10, 26, 44, 62, 78].map((x, i) => tuft(x, 110 + (i % 2) * 4, "#5FA344", 6)).join("") + flower(36, 112, "#F47C9B", 7) + flower(70, 110, "#FFFFFF", 7),
        origin: { x: 44, y: 112 },
        keys: { at: [0, 0.88, 0.96], scaleY: [0, 0, 1] },
        loop: { move: "bob", ms: 2400, x: 0.5 }
      }
    ],
    words: [
      { text: "Seven fat cows", from: 0.02, to: 0.2 },
      { text: "Eaten by seven lean ones", from: 0.22, to: 0.4 },
      { text: "Seven green ears, others dry", from: 0.42, to: 0.6 },
      { text: "Store the grain in its ears", from: 0.62, to: 0.8 },
      { text: "Then a year of rain", from: 0.82, to: 1 }
    ]
  };
}

export const STORY_ART = { ark, sea, springs, sheCamel, ants, hoopoe, dream };
