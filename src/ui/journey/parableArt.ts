import { DAY_SKY, GUSTS, animalAt, cloud, flame, flower, n, palm, peaks, rainStreaks, sky, stars, tuft, type SignArt, type SignPart } from "./signDraw";

/**
 * The parables of the Quran and the Sunnah that show a thing in creation, drawn as the signs are (signArt.ts): the
 * foam on the flood and on melted metal (Quran 13:17), the rain on three lands (Sahih al-Bukhari 79, Quran 7:58), the
 * ashes in a stormy wind (Quran 14:18), the garden struck at night (Quran 68:17 to 68:20) and the two gardens
 * (Quran 18:32 to 18:42). Only the land, the weather, plants, animals and things are drawn: never the people of a
 * parable.
 */

const SUN = `<circle cx="134" cy="24" r="13" fill="#FFE7A0" opacity="0.6"/><circle cx="134" cy="24" r="8.5" fill="#FFC93C"/>`;
const GREY_SKY = sky("#9DAEC0", "#B6C4D2");
const sparkle = (x: number, y: number, r = 1) =>
  `<path d="M${x} ${n(y - 2.6 * r)} l${n(0.8 * r)} ${n(1.8 * r)} l${n(1.8 * r)} ${n(0.8 * r)} l${n(-1.8 * r)} ${n(0.8 * r)} l${n(-0.8 * r)} ${n(1.8 * r)} l${n(-0.8 * r)} ${n(-1.8 * r)} l${n(-1.8 * r)} ${n(-0.8 * r)} l${n(1.8 * r)} ${n(-0.8 * r)} Z" fill="#FFFFFF"/>`;
/** Bubbles of foam: white puffs about (x, y), `k` times their size. */
const foamAt = (x: number, y: number, k = 1) =>
  [
    [0, 0, 2.2],
    [2.6, -0.8, 1.7],
    [-2.6, -0.4, 1.8],
    [1.2, -2.2, 1.4],
    [-1, 1.2, 1.2],
    [4.4, 0.4, 1.1]
  ]
    .map(([dx, dy, r]) => `<circle cx="${n(x + dx * k)}" cy="${n(y + dy * k)}" r="${n(r * k)}" fill="#FFFFFF"/>`)
    .join("");

// The rain that fills the valleys, the foam on the flood and on the metal in the fire: the foam passes away, and
// what benefits people remains on the earth (Quran 13:17).
function foam(): SignArt {
  const hills = peaks(
    [
      [22, 40, 32],
      [86, 52, 38],
      [148, 42, 30]
    ],
    76,
    "#8C9C88",
    false
  );
  // Down each valley a stream as big as the valley: a wide one and a thin one.
  const streams = `<path d="M54 44 C52 54 56 64 53 76" stroke="#A9C3D2" stroke-width="7" fill="none" stroke-linecap="round"/><path d="M118 52 C120 60 116 68 118 76" stroke="#A9C3D2" stroke-width="3" fill="none" stroke-linecap="round"/>`;
  const falling = `<path d="M53 46 l0 4 M55 58 l0 4 M52 68 l0 4 M118 55 l0 3 M117 66 l0 3" stroke="#E8F1F6" stroke-width="1" stroke-linecap="round"/>`;
  const flood = (top: string, deep: string) =>
    `<path d="M0 78 C20 75 40 79 60 77 C80 75 100 79 120 77 C140 75 150 78 160 77 L160 98 L0 98 Z" fill="${top}"/><path d="M0 86 C40 84 80 87 120 85 C140 84 150 85 160 86 L160 98 L0 98 Z" fill="${deep}"/>`;
  const waves = `<g stroke="#EADFC8" stroke-width="0.9" fill="none" opacity="0.8"><path d="M6 84 q4 -2.4 8 0 q4 2.4 8 0 M50 90 q4 -2.4 8 0 q4 2.4 8 0 M96 82 q4 -2.4 8 0 q4 2.4 8 0 M134 91 q4 -2.4 8 0"/></g>`;
  const froth =
    foamAt(10, 78, 1.1) +
    foamAt(34, 80, 0.9) +
    foamAt(58, 78, 1.2) +
    foamAt(84, 79, 1) +
    foamAt(108, 78, 1.1) +
    foamAt(132, 80, 0.9) +
    foamAt(150, 78, 1) +
    foamAt(22, 88, 0.7) +
    foamAt(70, 90, 0.8) +
    foamAt(118, 89, 0.7);
  const bank = (fill: string) => `<path d="M0 96 C40 94 80 97 120 95 C140 94 150 95 160 96 L160 120 L0 120 Z" fill="${fill}"/>`;
  const plants =
    [8, 22, 40, 58, 76, 94].map((x, i) => tuft(x, 102 + (i % 2) * 3, i % 2 ? "#5FA344" : "#6DB24F", 6)).join("") + flower(30, 106, "#F47C9B", 8) + flower(66, 104, "#F6B73C", 9) + flower(100, 106, "#FFFFFF", 7);
  // The metal melted in the fire: a pot of gold on its stones, its foam on top.
  const pot =
    `<ellipse cx="128" cy="105" rx="10" ry="2.6" fill="#7B7368"/><ellipse cx="122" cy="104" rx="3" ry="1.8" fill="#9A9184"/><ellipse cx="134" cy="104" rx="3" ry="1.8" fill="#9A9184"/>` +
    `<path d="M119 92 L137 92 L134 102 L122 102 Z" fill="#5E4A3E"/><ellipse cx="128" cy="92" rx="9" ry="2.4" fill="#4A3A30"/><ellipse cx="128" cy="92.2" rx="7.6" ry="1.8" fill="#F2B632"/>`;
  const potFire = flame(128, 104, 6);
  const scum = foamAt(125, 91, 0.55) + foamAt(131, 91.4, 0.5);
  const gone = { at: [0, 0.26, 0.34, 0.54, 0.68], x: [0, 0, 0, 6, 40], opacity: [0, 0, 1, 1, 0] };
  return {
    kind: "foam",
    ms: 10500,
    parts: [
      { name: "clear sky", svg: DAY_SKY },
      { name: "grey sky", svg: GREY_SKY, keys: { at: [0, 0.5, 0.66], opacity: [1, 1, 0] } },
      { name: "sun", svg: SUN, keys: { at: [0, 0.56, 0.68], opacity: [0, 0, 1] }, loop: { move: "twinkle", ms: 2600, low: 0.8 } },
      { name: "hills", svg: hills },
      { name: "streams", svg: streams, origin: { x: 86, y: 44 }, keys: { at: [0, 0.06, 0.18], scaleY: [0, 0, 1] } },
      { name: "falling water", svg: falling, clip: { x: 46, y: 44, w: 76, h: 32 }, keys: { at: [0, 0.14, 0.2], opacity: [0, 0, 1] }, loop: { move: "fall", ms: 900, period: 32 } },
      { name: "rain", svg: rainStreaks(), keys: { at: [0, 0.02, 0.26, 0.34], opacity: [1, 1, 1, 0] }, loop: { move: "fall", ms: 650 } },
      { name: "rain clouds", svg: cloud(40, 30, 1.1, "#7F8EA1") + cloud(96, 24, 1.3, "#7F8EA1") + cloud(140, 34, 0.9, "#7F8EA1"), keys: { at: [0, 0.3, 0.5], x: [0, 0, 170] } },
      { name: "flood", svg: flood("#A08B6A", "#8A7758"), keys: { at: [0, 0.12, 0.26], y: [16, 16, 0] } },
      { name: "clear water", svg: flood("#5AA7DE", "#3E8ED0"), keys: { at: [0, 0.6, 0.74], opacity: [0, 0, 1] } },
      { name: "waves", svg: waves, clip: { x: 0, y: 76, w: 160, h: 22 }, keys: { at: [0, 0.12, 0.26], y: [16, 16, 0] }, loop: { move: "slide", ms: 3200 } },
      { name: "foam", svg: froth, clip: { x: 0, y: 72, w: 160, h: 26 }, keys: gone, loop: { move: "slide", ms: 3200 } },
      { name: "wet bank", svg: bank("#A68A64") },
      { name: "green bank", svg: bank("#8CC56A"), keys: { at: [0, 0.74, 0.84], opacity: [0, 0, 1] } },
      { name: "plants", svg: plants, origin: { x: 60, y: 104 }, keys: { at: [0, 0.76, 0.88], scaleY: [0, 0, 1] }, loop: { move: "bob", ms: 2600, x: 0.6 } },
      { name: "pot of gold", svg: pot },
      { name: "fire under it", svg: potFire, origin: { x: 128, y: 104 }, loop: { move: "sway", ms: 900, angle: 5 } },
      { name: "foam on the gold", svg: scum, keys: gone },
      { name: "gold shining", svg: sparkle(124, 90, 0.8) + sparkle(133, 89, 0.7), keys: { at: [0, 0.76, 0.8], opacity: [0, 0, 1] }, loop: { move: "twinkle", ms: 1400, low: 0.15 } }
    ],
    words: [
      { text: "Rain fills the valleys", from: 0.02, to: 0.26 },
      { text: "Foam rises on the flood", from: 0.28, to: 0.52 },
      { text: "The foam passes away", from: 0.54, to: 0.74 },
      { text: "What benefits people remains", from: 0.76, to: 1 }
    ]
  };
}

// The rain that falls on three lands: good land that grows grass, hard land that holds the water for people and their
// animals, and barren land that keeps nothing (Sahih al-Bukhari 79; the good land, Quran 7:58).
function lands(): SignArt {
  const plot = (x: number, w: number, fill: string) => `<path d="M${x} 78 L${x + w} 78 L${x + w} 120 L${x} 120 Z" fill="${fill}"/>`;
  const ground =
    plot(0, 54, "#7A5230") +
    plot(54, 52, "#A39B90") +
    plot(106, 54, "#E3D3AE") +
    `<path d="M0 78 C40 76 80 79 120 77 C140 76 150 77 160 78" stroke="#8CA36A" stroke-width="1.4" fill="none"/>` +
    // Soft soil; hard rock with a hollow; barren, cracked ground.
    `<path d="M8 90 l3 0 M20 98 l4 0 M34 88 l3 0 M12 106 l4 0 M40 102 l3 0" stroke="#5E3D22" stroke-width="1.2" stroke-linecap="round"/>` +
    `<ellipse cx="80" cy="94" rx="19" ry="5.6" fill="#857D72"/><path d="M58 84 l6 3 M96 104 l5 -3 M62 106 l4 -2" stroke="#857D72" stroke-width="0.9"/>` +
    `<path d="M114 88 l5 3 l-2 4 M126 96 l6 -2 l3 4 M140 86 l-3 5 l5 3 M118 106 l6 -3 M146 102 l4 3" stroke="#B9A57E" stroke-width="0.9" fill="none" stroke-linecap="round"/>` +
    `<path d="M54 78 L54 120 M106 78 L106 120" stroke="#6F6A5E" stroke-width="1" stroke-dasharray="2 2" opacity="0.6"/>`;
  const hills = `<path d="M0 78 C30 66 60 72 90 68 C120 64 140 70 160 66 L160 80 L0 80 Z" fill="#B7C9A0"/>`;
  const wet = `<path d="M0 79 L160 79 L160 120 L0 120 Z" fill="#2E3E52" opacity="0.18"/>`;
  const pool = `<ellipse cx="80" cy="94" rx="17" ry="4.6" fill="#4F9EDB"/><path d="M70 93 q3 -1.2 6 0 M84 95 q3 -1.2 6 0" stroke="#FFFFFF" stroke-width="0.7" fill="none" opacity="0.8"/>`;
  const grown =
    [6, 16, 26, 36, 46, 12, 32, 42].map((x, i) => tuft(x, 88 + (i % 4) * 5, i % 2 ? "#5FA344" : "#6DB24F", 7)).join("") +
    flower(20, 96, "#F47C9B", 9) +
    flower(40, 92, "#FFFFFF", 8) +
    flower(10, 102, "#F6B73C", 8) +
    `<circle cx="30" cy="80" r="6" fill="#4F9A3C"/><circle cx="25" cy="83" r="4.4" fill="#5FA344"/><circle cx="35" cy="83" r="4.4" fill="#5FA344"/><path d="M30 88 L30 82" stroke="#7A5230" stroke-width="1.6"/>`;
  const dust = `<g stroke="#D9C49A" stroke-width="1.2" fill="none" stroke-linecap="round" opacity="0.9"><path d="M110 90 C120 86 130 92 142 88 M114 100 C124 97 134 102 150 98 M120 82 C128 80 136 84 146 81"/></g>`;
  const dim = (x: number, w: number) => `<rect x="${x}" y="78" width="${w}" height="42" fill="#1C2A3A" opacity="0.38"/>`;
  // Each land in its turn: the others dimmed, then all three shown together at the end.
  const turn = (on: number[]) => ({ at: [0, 0.32, 0.34, 0.52, 0.54, 0.74, 0.76, 0.94, 1], opacity: on });
  return {
    kind: "lands",
    ms: 10500,
    parts: [
      { name: "clear sky", svg: DAY_SKY },
      { name: "grey sky", svg: GREY_SKY, keys: { at: [0, 0.28, 0.38], opacity: [1, 1, 0] } },
      { name: "sun", svg: SUN, keys: { at: [0, 0.3, 0.4], opacity: [0, 0, 1] }, loop: { move: "twinkle", ms: 2600, low: 0.8 } },
      { name: "hills", svg: hills },
      { name: "three lands", svg: ground },
      { name: "wet ground", svg: wet, keys: { at: [0, 0.08, 0.16, 0.3, 0.42], opacity: [0, 0, 1, 1, 0] } },
      { name: "rain", svg: rainStreaks(), clip: { x: 0, y: 36, w: 160, h: 84 }, keys: { at: [0, 0.04, 0.08, 0.28, 0.32], opacity: [0, 0, 1, 1, 0] }, loop: { move: "fall", ms: 650 } },
      { name: "rain clouds", svg: cloud(30, 36, 1, "#7F8EA1") + cloud(80, 30, 1.25, "#7F8EA1") + cloud(132, 38, 1, "#7F8EA1"), keys: { at: [0, 0.3, 0.42], x: [0, 0, 170] } },
      { name: "grass on the good land", svg: grown, origin: { x: 27, y: 104 }, keys: { at: [0, 0.34, 0.48], scaleY: [0, 0, 1] }, loop: { move: "bob", ms: 2600, x: 0.6 } },
      { name: "water held in the hard land", svg: pool, origin: { x: 80, y: 94 }, keys: { at: [0, 0.12, 0.3], scale: [0, 0, 1] }, loop: { move: "twinkle", ms: 2000, low: 0.85 } },
      { name: "goat", svg: animalAt("goat", 42, 70, 0.3), origin: { x: 57, y: 91 }, keys: { at: [0, 0.54, 0.66], x: [-90, -90, 0] }, loop: { move: "bob", ms: 1300, y: 0.4, rotate: 1 } },
      { name: "dust on the barren land", svg: dust, clip: { x: 106, y: 78, w: 54, h: 42 }, keys: { at: [0, 0.76, 0.8, 0.94, 1], opacity: [0, 0, 1, 1, 0] }, loop: { move: "slide", ms: 1800, period: 54 } },
      { name: "good land dimmed", svg: dim(0, 54), keys: turn([0, 0, 0, 0, 1, 1, 1, 1, 0]) },
      { name: "hard land dimmed", svg: dim(54, 52), keys: turn([0, 0, 1, 1, 0, 0, 1, 1, 0]) },
      { name: "barren land dimmed", svg: dim(106, 54), keys: turn([0, 0, 1, 1, 1, 1, 0, 0, 0]) }
    ],
    words: [
      { text: "Rain falls on three lands", from: 0.02, to: 0.3 },
      { text: "Good land grows grass", from: 0.32, to: 0.52 },
      { text: "Hard land holds water", from: 0.54, to: 0.74 },
      { text: "Barren land keeps nothing", from: 0.76, to: 1 }
    ]
  };
}

// The deeds of those who reject their Lord, like ashes the wind blows hard on a stormy day: nothing is left of them
// (Quran 14:18).
function ashes(): SignArt {
  const ground = `<path d="M0 86 C40 83 80 86 120 84 C140 83 150 84 160 85 L160 120 L0 120 Z" fill="#B4A48E"/><path d="M0 102 C40 100 80 103 120 101 C140 100 150 101 160 102 L160 120 L0 120 Z" fill="#A39079"/>`;
  const deadTree = `<g stroke="#6B5A4A" stroke-linecap="round" fill="none"><path d="M24 92 C23 80 26 70 24 58" stroke-width="2.6"/><path d="M24 74 L14 64 M24 68 L34 58 M24 62 L18 52 M14 64 L10 60 M34 58 L38 52" stroke-width="1.4"/></g>`;
  const ring = [
    [60, 99],
    [68, 102.4],
    [78, 103.6],
    [90, 103.6],
    [100, 102.4],
    [108, 99]
  ]
    .map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="4.6" ry="2.8" fill="#7E776E"/><ellipse cx="${x}" cy="${n(y - 0.8)}" rx="2.8" ry="1.3" fill="#9B958B"/>`)
    .join("");
  const heap =
    `<path d="M62 100 C64 89 74 81 84 81 C94 81 104 89 106 100 Z" fill="#8E8B88"/><path d="M70 90 C76 85 92 84 100 90 C92 87 78 87 70 90 Z" fill="#B9B6B2"/>` +
    `<circle cx="76" cy="94" r="1" fill="#6F6C69"/><circle cx="90" cy="92" r="0.9" fill="#6F6C69"/><circle cx="84" cy="97" r="1.1" fill="#6F6C69"/><circle cx="97" cy="96" r="0.8" fill="#6F6C69"/>`;
  // The ash blown off the heap: puffs of grey dust, carried away to the right one after another.
  const puff = (seed: number) =>
    Array.from({ length: 16 }, (_, i) => {
      const x = 66 + ((i * 17 + seed * 7) % 38);
      const y = 80 + ((i * 11 + seed * 5) % 16);
      return `<circle cx="${x}" cy="${y}" r="${n(0.9 + ((i + seed) % 4) * 0.4)}" fill="${i % 3 ? "#9C9894" : "#C6C2BD"}"/>`;
    }).join("");
  const blown = (t: number, seed: number): SignPart => ({
    name: `ash ${seed}`,
    svg: puff(seed),
    keys: { at: [0, t, t + 0.04, t + 0.14, t + 0.22], x: [0, 0, 14, 64, 120], y: [0, 0, -5, -16, -30], opacity: [0, 0, 1, 1, 0] }
  });
  const storm = GUSTS.replace('stroke="#FFFFFF"', 'stroke="#5E6570"');
  return {
    kind: "ashes",
    ms: 9500,
    // Standing still, the wind is blowing the ashes away: its end is the empty hearth.
    stillAt: 0.6,
    parts: [
      { name: "sky", svg: sky("#CBD2DA", "#D9DEE4") },
      { name: "stormy sky", svg: sky("#8E98A6", "#A4ADB9"), keys: { at: [0, 0.38, 0.48], opacity: [0, 0, 1] } },
      { name: "land", svg: ground },
      { name: "dead tree", svg: deadTree, origin: { x: 24, y: 92 }, loop: { move: "sway", ms: 1500, angle: 1.6 } },
      { name: "hearth", svg: ring },
      { name: "heap of ashes", svg: heap, origin: { x: 84, y: 100 }, keys: { at: [0, 0.46, 0.84], scaleY: [1, 1, 0], scaleX: [1, 1, 0.6] } },
      blown(0.46, 1),
      blown(0.54, 2),
      blown(0.62, 3),
      blown(0.7, 4),
      { name: "stormy wind", svg: storm, keys: { at: [0, 0.4, 0.46, 0.88, 0.98], opacity: [0, 0, 1, 1, 0] }, loop: { move: "slide", ms: 1300 } }
    ],
    words: [
      { text: "Deeds like ashes", from: 0.04, to: 0.4 },
      { text: "A stormy wind blows", from: 0.42, to: 0.7 },
      { text: "Nothing is left", from: 0.72, to: 1 }
    ]
  };
}

/** A fruit tree, its foot at (x, y): its crown, and its fruit apart; or bare and black, burnt. */
const fruitTree = (x: number, y: number) => ({
  crown:
    `<path d="M${x} ${y} L${x} ${y - 18}" stroke="#7A5230" stroke-width="2.6"/>` +
    `<circle cx="${x}" cy="${y - 26}" r="11" fill="#4F9A3C"/><circle cx="${x - 8}" cy="${y - 21}" r="7" fill="#5FA344"/><circle cx="${x + 8}" cy="${y - 22}" r="7.4" fill="#5FA344"/>`,
  fruit: [
    [-5, -29],
    [3, -32],
    [6, -24],
    [-8, -21],
    [0, -22],
    [9, -18],
    [-3, -16]
  ]
    .map(([dx, dy]) => `<circle cx="${x + dx}" cy="${y + dy}" r="1.7" fill="#E2483C"/>`)
    .join(""),
  burnt: `<g stroke="#2A2522" stroke-linecap="round" fill="none"><path d="M${x} ${y} L${x} ${y - 22}" stroke-width="2.6"/><path d="M${x} ${y - 14} L${x - 9} ${y - 24} M${x} ${y - 18} L${x + 8} ${y - 28} M${x} ${y - 22} L${x - 3} ${y - 32} M${x - 9} ${y - 24} L${x - 12} ${y - 27} M${x + 8} ${y - 28} L${x + 12} ${y - 30}" stroke-width="1.4"/></g>`
});

// The garden full of fruit, struck in the night while its owners slept, and by morning black and bare (Quran 68:17
// to 68:20).
function garden(): SignArt {
  const trees = [24, 60, 100, 136].map((x, i) => fruitTree(x, 98 - (i % 2) * 2));
  const ground = (fill: string, low: string) =>
    `<path d="M0 86 C40 84 80 86 120 85 C140 84 150 85 160 86 L160 120 L0 120 Z" fill="${fill}"/><path d="M0 104 C40 102 80 104 120 103 C140 102 150 103 160 104 L160 120 L0 120 Z" fill="${low}"/>`;
  const wall = `<path d="M0 84 L160 84 L160 88 L0 88 Z" fill="#C79B6A"/><path d="M0 84 L160 84" stroke="#A97E52" stroke-width="0.8"/><path d="M12 84 L12 88 M36 84 L36 88 M60 84 L60 88 M84 84 L84 88 M108 84 L108 88 M132 84 L132 88 M156 84 L156 88" stroke="#A97E52" stroke-width="0.6"/>`;
  const night = `<rect width="160" height="120" fill="#0F1C3A"/>`;
  const sweep = GUSTS.replace('stroke="#FFFFFF"', 'stroke="#141018"').replace('opacity="0.85"', 'opacity="0.9"');
  const smoke = [30, 66, 104, 140].map((x) => `<circle cx="${x}" cy="66" r="2.2" fill="#8E8B88" opacity="0.7"/><circle cx="${x + 2}" cy="60" r="1.6" fill="#A8A5A2" opacity="0.6"/>`).join("");
  return {
    kind: "garden",
    ms: 10500,
    parts: [
      { name: "sky", svg: DAY_SKY },
      { name: "sun", svg: SUN, keys: { at: [0, 0.3, 0.38], opacity: [1, 1, 0] } },
      { name: "grey morning", svg: sky("#B8BEC6", "#CDD1D6"), keys: { at: [0, 0.62, 0.74], opacity: [0, 0, 1] } },
      { name: "green ground", svg: ground("#8CC56A", "#79B65A"), keys: { at: [0, 0.48, 0.6], opacity: [1, 1, 0] } },
      { name: "burnt ground", svg: ground("#4A403A", "#3A322D"), keys: { at: [0, 0.48, 0.6], opacity: [0, 0, 1] } },
      { name: "wall", svg: wall },
      { name: "trees", svg: trees.map((tree) => tree.crown).join(""), keys: { at: [0, 0.48, 0.58], opacity: [1, 1, 0] }, origin: { x: 80, y: 98 }, loop: { move: "bob", ms: 3200, x: 0.6 } },
      { name: "fruit", svg: trees.map((tree) => tree.fruit).join(""), keys: { at: [0, 0.04, 0.16, 0.46, 0.52], opacity: [0, 0, 1, 1, 0] }, loop: { move: "bob", ms: 3200, x: 0.6 } },
      { name: "burnt trees", svg: trees.map((tree) => tree.burnt).join(""), keys: { at: [0, 0.5, 0.6], opacity: [0, 0, 1] } },
      { name: "night", svg: night, keys: { at: [0, 0.32, 0.42, 0.62, 0.74], opacity: [0, 0, 0.66, 0.66, 0] } },
      {
        name: "stars",
        svg: stars([
          [14, 20],
          [40, 14],
          [64, 34],
          [92, 16],
          [118, 30],
          [146, 18],
          [150, 44],
          [28, 46]
        ]),
        keys: { at: [0, 0.36, 0.44, 0.6, 0.7], opacity: [0, 0, 1, 1, 0] },
        loop: { move: "twinkle", ms: 2200, low: 0.4 }
      },
      { name: "the blow by night", svg: sweep, keys: { at: [0, 0.44, 0.47, 0.56, 0.6], opacity: [0, 0, 1, 1, 0] }, loop: { move: "slide", ms: 900 } },
      { name: "smoke", svg: smoke, keys: { at: [0, 0.6, 0.66], opacity: [0, 0, 1] }, loop: { move: "drip", ms: 2600, distance: -14 } }
    ],
    words: [
      { text: "A garden full of fruit", from: 0.02, to: 0.32 },
      { text: "At night, it was struck", from: 0.34, to: 0.62 },
      { text: "By morning, black and bare", from: 0.64, to: 1 }
    ]
  };
}

// Two gardens of grapes, with palms around them and crops between them, and a river flowing between them; then all
// the fruit was destroyed, the vines fallen on their trellises (Quran 18:32, 18:33, 18:42).
function twoGardens(): SignArt {
  const hills = `<path d="M0 68 C30 58 60 64 90 60 C120 56 140 62 160 58 L160 74 L0 74 Z" fill="#9CCB7A"/>`;
  const ground = `<path d="M0 70 L160 70 L160 120 L0 120 Z" fill="#8CC56A"/><path d="M0 100 C40 98 80 101 120 99 C140 98 150 99 160 100 L160 120 L0 120 Z" fill="#79B65A"/>`;
  // The river, from beyond the hills down to the front, wider as it comes near.
  const river =
    `<path d="M76 66 C72 74 68 80 70 86 C72 94 76 98 70 106 C66 112 62 116 61 120 L97 120 C97 114 97 106 94 100 C91 94 84 90 83 84 C82 78 85 72 84 66 Z" fill="#4F9EDB"/>` +
    `<path d="M76 66 C72 74 68 80 70 86 C72 94 76 98 70 106 C66 112 62 116 61 120 L67 120 C69 114 74 110 76 104 C79 96 74 92 74 86 C74 80 77 72 78 66 Z" fill="#8ACBF2" opacity="0.7"/>`;
  const flow = `<path d="M79 70 l0 3 M77 82 l-0.4 4 M80 92 l0.6 4 M81 102 l-0.6 5 M79 112 l-0.8 5" stroke="#FFFFFF" stroke-width="1" stroke-linecap="round" opacity="0.85"/>`;
  // Crops along both banks of the river, between the gardens.
  const crop = (x: number, y: number, h: number) => `<path d="M${n(x)} ${n(y)} L${n(x)} ${n(y - h)}" stroke="#C9A43A" stroke-width="1.1"/><ellipse cx="${n(x)}" cy="${n(y - h - 1.8)}" rx="1" ry="2.2" fill="#E2C048"/>`;
  const crops = [72, 78, 84, 90, 96, 102, 108]
    .flatMap((y, i) => {
      const k = 0.8 + i * 0.06;
      const leftEdge = 68 - i * 1.2;
      const rightEdge = 90 + i * 1.6;
      return [crop(leftEdge - 3, y, 6 * k), crop(leftEdge - 7, y + 1, 6 * k), crop(rightEdge + 3, y, 6 * k), crop(rightEdge + 7, y + 1, 6 * k)];
    })
    .join("");
  // A row of vines on its trellis: posts and a bar, leaves along the bar, bunches of grapes under it.
  type Row = { from: number; to: number; y: number; k: number };
  const trellis = ({ from, to, y, k }: Row) => {
    let out = `<path d="M${from - 2} ${y} L${to + 2} ${y}" stroke="#8A5A33" stroke-width="${n(1.3 * k)}"/>`;
    for (let i = 0; i <= 4; i += 1) out += `<path d="M${n(from + ((to - from) * i) / 4)} ${n(y + 13 * k)} L${n(from + ((to - from) * i) / 4)} ${y}" stroke="#8A5A33" stroke-width="${n(1.3 * k)}"/>`;
    return out;
  };
  const leaves = ({ from, to, y, k }: Row, fill: string, light: string) => {
    let out = "";
    for (let x = from, i = 0; x <= to; x += 5 * k, i += 1) out += `<circle cx="${n(x)}" cy="${n(y - 1.4 + (i % 2) * 1.6)}" r="${n(3.8 * k)}" fill="${i % 3 ? fill : light}"/>`;
    return out;
  };
  const grapes = ({ from, to, y, k }: Row) => {
    let out = "";
    for (let x = from + 4 * k; x < to - 2; x += 8 * k) {
      out += [
        [0, 0],
        [-1.7, 0],
        [1.7, 0],
        [-0.85, 1.6],
        [0.85, 1.6],
        [0, 3.2]
      ]
        .map(([dx, dy]) => `<circle cx="${n(x + dx * k)}" cy="${n(y + 3.4 * k + dy * k)}" r="${n(1.25 * k)}" fill="#7B3F8C"/>`)
        .join("");
    }
    return out;
  };
  const left: Row[] = [
    { from: 12, to: 52, y: 78, k: 0.8 },
    { from: 6, to: 56, y: 92, k: 1 }
  ];
  const right: Row[] = [
    { from: 108, to: 148, y: 78, k: 0.8 },
    { from: 104, to: 154, y: 92, k: 1 }
  ];
  const vines = (rows: Row[], fill: string, light: string) => rows.map((row) => trellis(row) + leaves(row, fill, light)).join("");
  const fruit = (rows: Row[]) => rows.map(grapes).join("");
  // The palms around each garden, along its back and at its sides.
  const palms = palm(8, 72, 20) + palm(30, 70, 18) + palm(130, 70, 18) + palm(152, 72, 20);
  const fall = (side: number) => ({ at: [0, 0.74, 0.86], rotate: [0, 0, side * 10], y: [0, 0, 5] });
  const dying = (side: number) => ({ ...fall(side), opacity: [0, 0, 1] });
  const storm = { at: [0, 0.7, 0.78], opacity: [0, 0, 1] };
  return {
    kind: "twoGardens",
    ms: 11000,
    parts: [
      { name: "sky", svg: DAY_SKY },
      { name: "stormy sky", svg: sky("#7D8B9E", "#98A5B5"), keys: storm },
      { name: "hills and ground", svg: hills + ground },
      { name: "palms", svg: palms, origin: { x: 80, y: 72 }, keys: { at: [0, 0.28, 0.4], scaleY: [0, 0, 1] }, loop: { move: "sway", ms: 4600, angle: 1 } },
      { name: "river", svg: river, origin: { x: 80, y: 66 }, keys: { at: [0, 0.5, 0.6], scaleY: [0, 0, 1] } },
      { name: "flowing water", svg: flow, clip: { x: 60, y: 66, w: 40, h: 54 }, keys: { at: [0, 0.56, 0.62], opacity: [0, 0, 1] }, loop: { move: "fall", ms: 1400, period: 27 } },
      { name: "crops", svg: crops, origin: { x: 80, y: 108 }, keys: { at: [0, 0.34, 0.46, 0.74, 0.86], scaleY: [0, 0, 1, 1, 0.4] }, loop: { move: "bob", ms: 2600, x: 0.5 } },
      { name: "left vines", svg: vines(left, "#4F9A3C", "#6DB24F"), origin: { x: 31, y: 105 }, keys: { ...fall(-1), opacity: [1, 1, 0] } },
      { name: "left vines fallen", svg: vines(left, "#8A7A4A", "#A08A52"), origin: { x: 31, y: 105 }, keys: dying(-1) },
      { name: "right vines", svg: vines(right, "#4F9A3C", "#6DB24F"), origin: { x: 129, y: 105 }, keys: { ...fall(1), opacity: [1, 1, 0] } },
      { name: "right vines fallen", svg: vines(right, "#8A7A4A", "#A08A52"), origin: { x: 129, y: 105 }, keys: dying(1) },
      { name: "grapes", svg: fruit(left) + fruit(right), keys: { at: [0, 0.04, 0.2, 0.74, 0.8], opacity: [0, 0, 1, 1, 0], y: [0, 0, 0, 0, 8] } },
      { name: "storm wind", svg: GUSTS, keys: { at: [0, 0.72, 0.78], opacity: [0, 0, 1] }, loop: { move: "slide", ms: 1500 } }
    ],
    words: [
      { text: "Two gardens of grapes", from: 0.02, to: 0.26 },
      { text: "Palms around, crops between", from: 0.28, to: 0.48 },
      { text: "A river flowing between", from: 0.5, to: 0.68 },
      { text: "Then all the fruit was ruined", from: 0.7, to: 1 }
    ]
  };
}

export const PARABLE_ART = { foam, lands, ashes, garden, twoGardens };
