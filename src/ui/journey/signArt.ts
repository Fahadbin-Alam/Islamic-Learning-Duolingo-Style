import type { SignKind } from "../../data/signScenes";
import { COMMAND_ART } from "./commandArt";
import { FAVOR_ART } from "./favorArt";
import { HISTORY_ART } from "./historyArt";
import { PARABLE_ART } from "./parableArt";
import { PROPHET_ART } from "./prophetArt";
import { STORY_ART } from "./storyArt";
import { TRIAL_ART } from "./trialArt";
import { DAY_SKY, GUSTS, animalAt, camelAt, cloud, dateBunch, flame, flower, glow, n, nightSky, palm, peaks, rainStreaks, sky, stars, tuft, type SignArt, type SignPart } from "./signDraw";

export { SIGN_BOX, type SignArt, type SignKeys, type SignLoop, type SignPart, type SignWord } from "./signDraw";

/**
 * The scenes of the signs in creation (signScenes.ts), drawn in a box 160 wide and 120 high (4:3, the lesson photo's
 * shape), each a story told on one clock: its parts come and go, move, grow and turn at set times through the story
 * (`keys`), and some move round and round on their own as long as it is seen (`loop`): rain falling, waves going by,
 * a palm swaying. A word or two at a time says what is shown (`words`). Nothing drawn is a person or an angel.
 */

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

/**
 * A swallow seen from below, its head up, its middle at (x, y), `s` times its size: its body, and each wing apart
 * (each turning about its shoulder), so its wings can beat, spread and fold.
 */
function swallow(x: number, y: number, s: number) {
  const p = (dx: number, dy: number) => `${n(x + dx * s)} ${n(y + dy * s)}`;
  const body =
    `<path d="M${p(-2.2, 4)} L${p(-4.8, 13.5)} L${p(-1.1, 7.6)} L${p(0, 8.8)} L${p(1.1, 7.6)} L${p(4.8, 13.5)} L${p(2.2, 4)} Z" fill="#22324D"/>` +
    `<ellipse cx="${x}" cy="${n(y + s)}" rx="${n(4.2 * s)}" ry="${n(6.6 * s)}" fill="#22324D"/>` +
    `<ellipse cx="${x}" cy="${n(y + 2.8 * s)}" rx="${n(2.8 * s)}" ry="${n(4.4 * s)}" fill="#F4F1EA"/>` +
    `<circle cx="${x}" cy="${n(y - 5.4 * s)}" r="${n(3.4 * s)}" fill="#22324D"/>` +
    `<ellipse cx="${x}" cy="${n(y - 3 * s)}" rx="${n(2.4 * s)}" ry="${n(1.5 * s)}" fill="#C8553D"/>` +
    `<circle cx="${n(x - 1.3 * s)}" cy="${n(y - 6 * s)}" r="${n(0.55 * s)}" fill="#FFFFFF"/><circle cx="${n(x + 1.3 * s)}" cy="${n(y - 6 * s)}" r="${n(0.55 * s)}" fill="#FFFFFF"/>`;
  // A long wing swept out to its point, a paler stripe under it; `side` -1 for the left wing, 1 for the right.
  const wing = (side: number) => {
    const sx = x + side * 2.6 * s;
    const sy = y - 1.4 * s;
    const q = (dx: number, dy: number) => `${n(sx + side * dx * s)} ${n(sy + dy * s)}`;
    return {
      svg:
        `<path d="M${q(0, -2)} C${q(9, -6.4)} ${q(20, -5.8)} ${q(29, 1.5)} C${q(20, -0.8)} ${q(10, 1.4)} ${q(0, 3)} Z" fill="#2A3B5C"/>` +
        `<path d="M${q(2, 1)} C${q(10, -1.8)} ${q(19, -1.6)} ${q(25.5, 0.9)} C${q(18, 0.3)} ${q(10, 1.8)} ${q(2, 2.4)} Z" fill="#4A6185"/>`,
      origin: { x: n(sx), y: n(sy) }
    };
  };
  return { body, left: wing(-1), right: wing(1) };
}

/** How a bird's wings go through its story: [time, how far raised (degrees, + up), how far spread (1 open)]. */
type WingStroke = [number, number, number];

/** Beats of the wings from `from` to `to`, each `beat` long: up, level, down, level. */
function beating(from: number, to: number, beat: number, up = 34, down = 26): WingStroke[] {
  const out: WingStroke[] = [];
  // Whole beats only, so the last one ends by `to`.
  const beats = Math.floor((to - from) / beat + 1e-9);
  for (let i = 0; i < beats; i += 1) {
    const t = from + i * beat;
    out.push([t, 0, 1], [t + beat * 0.25, up, 1], [t + beat * 0.5, 0, 1], [t + beat * 0.75, -down, 1]);
  }
  out.push([to, 0, 1]);
  return out;
}

/** The parts of a swallow on its way through the story: its wings by their strokes, all of it along `path`. */
function swallowParts(name: string, x: number, y: number, s: number, strokes: WingStroke[], path: { at: number[]; x: number[]; y: number[] }, bob: SignPart["loop"]): SignPart[] {
  const bird = swallow(x, y, s);
  const at = strokes.map(([time]) => n(time * 1000) / 1000);
  // Its path, at the times its wings use, so its body and wings go together.
  const along = (values: number[]) => at.map((time) => n(keyAt(path.at, values, time)));
  const wing = (side: number, own: { svg: string; origin: { x: number; y: number } }): SignPart => ({
    name: `${name} ${side < 0 ? "left" : "right"} wing`,
    svg: own.svg,
    origin: own.origin,
    keys: { at, x: along(path.x), y: along(path.y), rotate: strokes.map(([, up]) => n(-side * up)), scaleX: strokes.map(([, , open]) => open) },
    loop: bob
  });
  return [wing(-1, bird.left), wing(1, bird.right), { name, svg: bird.body, origin: { x, y }, keys: { at, x: along(path.x), y: along(path.y) }, loop: bob }];
}

// The birds above them, their wings spread and folded in: none holds them up but the Most Merciful
// (Quran 67:19, 16:79, 24:41).
function birds(): SignArt {
  const air = `<rect width="160" height="120" fill="#8DCBF3"/><rect y="38" width="160" height="82" fill="#AFDCF7"/><rect y="72" width="160" height="48" fill="#D2EDFB"/>`;
  const sun = `<circle cx="24" cy="34" r="12" fill="#FFF2C4" opacity="0.6"/><circle cx="24" cy="34" r="7.4" fill="#FFE07A"/>`;
  const hills =
    `<path d="M0 100 C24 92 52 96 80 93 C108 90 132 95 160 92 L160 120 L0 120 Z" fill="#8CC56A"/>` +
    `<circle cx="22" cy="94" r="5" fill="#4F9A3C"/><circle cx="30" cy="96" r="4" fill="#5FA344"/><circle cx="138" cy="91" r="5.5" fill="#4F9A3C"/>` +
    `<path d="M0 108 C40 104 80 106 120 104 C140 103 150 104 160 105 L160 120 L0 120 Z" fill="#79B65A"/>`;
  const far = (x: number, y: number) => `<path d="M${x - 4} ${y - 1.4} Q${x - 2} ${y - 2.6} ${x} ${y} Q${x + 2} ${y - 2.6} ${x + 4} ${y - 1.4}" stroke="#3E5568" stroke-width="0.9" fill="none" stroke-linecap="round"/>`;
  // Both swallows: rising in with their wings beating, gliding with them spread, folding them in to dip, and
  // spreading them again, held up in the air.
  const strokes = (lag: number): WingStroke[] => [
    ...beating(0, 0.24 + lag, 0.034),
    ...beating(0.27 + lag, 0.31 + lag, 0.04, 26, 18).slice(1),
    [0.34 + lag, 8, 1],
    [0.52 + lag, 8, 1],
    [0.56 + lag, -40, 0.42],
    [0.6 + lag, -42, 0.4],
    [0.63 + lag, 10, 1],
    [0.65 + lag, 8, 1],
    [0.68 + lag, -40, 0.42],
    [0.71 + lag, 10, 1],
    [1, 8, 1]
  ];
  const path = (lag: number, dx: number, rise: number) => ({
    at: [0, 0.24 + lag, 0.34 + lag, 0.52 + lag, 0.6 + lag, 0.63 + lag, 0.68 + lag, 0.71 + lag, 1],
    x: [dx, 0, 1.5, 4, 5, 5.5, 6, 6.5, 9],
    y: [rise, 0, -1, -3, 6, 2, 7, 0, -2]
  });
  return {
    kind: "birds",
    ms: 10500,
    parts: [
      { name: "sky", svg: air },
      { name: "sun", svg: sun },
      { name: "clouds", svg: cloud(132, 30, 0.75, "#FFFFFF") + cloud(58, 52, 0.5, "#FFFFFF", 0.85), loop: { move: "bob", ms: 9000, x: 4 } },
      { name: "hills", svg: hills },
      { name: "far birds", svg: far(36, 52) + far(46, 47) + far(140, 66), keys: { at: [0, 1], x: [0, 22] }, loop: { move: "bob", ms: 3400, y: 1.4 } },
      ...swallowParts("small swallow", 124, 50, 0.6, strokes(0.02), path(0.02, 16, 70), { move: "bob", ms: 2600, y: 1.2, phase: 0.4 }),
      ...swallowParts("swallow", 70, 68, 1, strokes(0), path(0, -18, 60), { move: "bob", ms: 2600, y: 1.4 })
    ],
    words: [
      { text: "Birds in the sky", from: 0.02, to: 0.28 },
      { text: "Their wings spread", from: 0.3, to: 0.5 },
      { text: "And folded in", from: 0.52, to: 0.74 },
      { text: "None holds them up but the Most Merciful", from: 0.76, to: 1 }
    ]
  };
}

// The seed you sow: is it you who make it grow, or Allah? (Quran 56:63, 56:64).
function sow(): SignArt {
  const far = `<path d="M0 64 C30 58 60 62 90 59 C120 56 140 60 160 58 L160 72 L0 72 Z" fill="#9CCB7A"/><circle cx="20" cy="60" r="4" fill="#4F9A3C"/><circle cx="146" cy="57" r="4.5" fill="#4F9A3C"/>`;
  // The plowed field: its furrows closer together further off.
  const rows = [74, 80, 88, 98, 110];
  const field =
    `<rect y="70" width="160" height="50" fill="#A0703F"/>` +
    rows
      .map(
        (y, i) =>
          `<path d="M0 ${y} C40 ${y - 1.5} 80 ${y + 1} 120 ${y - 0.5} C140 ${y - 1} 150 ${y} 160 ${y}" stroke="#7F5530" stroke-width="${n(0.8 + i * 0.5)}" fill="none"/><path d="M0 ${n(y - 1.6 - i * 0.3)} C40 ${n(y - 3 - i * 0.3)} 80 ${n(y - 0.6 - i * 0.3)} 120 ${n(y - 2 - i * 0.3)} C140 ${n(y - 2.6 - i * 0.3)} 150 ${n(y - 1.6 - i * 0.3)} 160 ${n(y - 1.6 - i * 0.3)}" stroke="#B8875A" stroke-width="${n(0.5 + i * 0.3)}" fill="none"/>`
      )
      .join("");
  const near = [18, 42, 66, 90, 114, 138];
  const back = [30, 58, 86, 114, 142];
  const seedAt = (x: number, y: number, k = 1) => `<ellipse cx="${x}" cy="${y}" rx="${n(2.3 * k)}" ry="${n(1.5 * k)}" fill="#F2CF6B" stroke="#B8902F" stroke-width="0.5"/>`;
  // The furrow raked over the seeds.
  const raked = (y: number, list: number[]) => list.map((x) => `<path d="M${x - 4} ${y} Q${x} ${y - 2.2} ${x + 4} ${y}" stroke="#7F5530" stroke-width="1.6" fill="#93653A" stroke-linecap="round"/>`).join("");
  const sprout = (x: number, y: number, k: number) =>
    `<path d="M${x} ${y} L${x} ${n(y - 4 * k)}" stroke="#5A9E3E" stroke-width="${n(1 * k)}"/><path d="M${x} ${n(y - 3.4 * k)} Q${n(x - 3.2 * k)} ${n(y - 5.6 * k)} ${n(x - 3.6 * k)} ${n(y - 3 * k)} Q${n(x - 1.6 * k)} ${n(y - 2.6 * k)} ${x} ${n(y - 3.4 * k)} Z M${x} ${n(y - 3.8 * k)} Q${n(x + 3.2 * k)} ${n(y - 6 * k)} ${n(x + 3.6 * k)} ${n(y - 3.4 * k)} Q${n(x + 1.6 * k)} ${n(y - 3 * k)} ${x} ${n(y - 3.8 * k)} Z" fill="#6DB24F"/>`;
  // A stalk of wheat with its leaves, and its ear apart (it ripens later).
  const stalk = (x: number, y: number, h: number) =>
    `<path d="M${x} ${y} Q${n(x - 0.6)} ${n(y - h * 0.5)} ${x} ${n(y - h)}" stroke="#4E9A3A" stroke-width="1.6" fill="none"/>` +
    `<path d="M${x} ${n(y - h * 0.3)} Q${n(x - h * 0.24)} ${n(y - h * 0.44)} ${n(x - h * 0.3)} ${n(y - h * 0.68)}" stroke="#5FA344" stroke-width="1.4" fill="none"/>` +
    `<path d="M${x} ${n(y - h * 0.5)} Q${n(x + h * 0.22)} ${n(y - h * 0.62)} ${n(x + h * 0.28)} ${n(y - h * 0.84)}" stroke="#5FA344" stroke-width="1.4" fill="none"/>`;
  const ear = (x: number, y: number, h: number, k: number) =>
    `<ellipse cx="${x}" cy="${n(y - h - 3.6 * k)}" rx="${n(2 * k)}" ry="${n(4.4 * k)}" fill="#E2BE4E"/><path d="M${x} ${n(y - h - 7.8 * k)} L${x} ${n(y - h - 10.8 * k)} M${n(x - 1.3 * k)} ${n(y - h - 7.2 * k)} L${n(x - 2.5 * k)} ${n(y - h - 10 * k)} M${n(x + 1.3 * k)} ${n(y - h - 7.2 * k)} L${n(x + 2.5 * k)} ${n(y - h - 10 * k)}" stroke="#E2BE4E" stroke-width="0.6"/>` +
    `<path d="M${n(x - 1.6 * k)} ${n(y - h - 4.6 * k)} L${n(x + 1.6 * k)} ${n(y - h - 4.6 * k)} M${n(x - 1.8 * k)} ${n(y - h - 2.4 * k)} L${n(x + 1.8 * k)} ${n(y - h - 2.4 * k)}" stroke="#B8902F" stroke-width="0.4" opacity="0.6"/>`;
  // A handful of seeds thrown in from the left, spreading as they fly, onto a furrow; then the earth covers them.
  const throwAt = (t: number, reach: number) => ({
    at: [0, t, t + 0.025, t + 0.05, t + 0.075, t + 0.1, 0.36, 0.42],
    x: [-reach, -reach, n(-reach * 0.62), n(-reach * 0.34), n(-reach * 0.12), 0, 0, 0],
    y: [-44, -44, -56, -56, -40, 0, 0, 0],
    scale: [0.2, 0.2, 0.42, 0.66, 0.86, 1, 1, 1],
    opacity: [0, 0, 1, 1, 1, 1, 1, 0]
  });
  const sway = { move: "bob" as const, ms: 3000, x: 0.7 };
  const sun = `<circle cx="134" cy="24" r="13" fill="#FFE7A0" opacity="0.6"/><circle cx="134" cy="24" r="8.5" fill="#FFC93C"/>`;
  return {
    kind: "sow",
    ms: 10000,
    parts: [
      { name: "sky", svg: DAY_SKY },
      { name: "sun", svg: sun, loop: { move: "twinkle", ms: 2600, low: 0.8 } },
      { name: "far fields", svg: far },
      { name: "plowed field", svg: field },
      { name: "far seeds", svg: back.map((x) => seedAt(x, 87, 0.8)).join(""), origin: { x: 86, y: 87 }, keys: throwAt(0.18, 110) },
      { name: "near seeds", svg: near.map((x) => seedAt(x, 97)).join(""), origin: { x: 78, y: 97 }, keys: throwAt(0.06, 100) },
      { name: "earth over the seeds", svg: raked(88, back) + raked(98, near), keys: { at: [0, 0.34, 0.42], opacity: [0, 0, 1] } },
      { name: "far shoots", svg: back.map((x) => sprout(x, 87, 1.1)).join(""), origin: { x: 86, y: 87 }, keys: { at: [0, 0.48, 0.58], scaleY: [0, 0, 1] } },
      { name: "near shoots", svg: near.map((x) => sprout(x, 97, 1.5)).join(""), origin: { x: 78, y: 97 }, keys: { at: [0, 0.46, 0.56], scaleY: [0, 0, 1] } },
      { name: "far wheat", svg: back.map((x) => stalk(x, 87, 20)).join(""), origin: { x: 86, y: 87 }, keys: { at: [0, 0.62, 0.8], scaleY: [0, 0, 1] }, loop: sway },
      { name: "near wheat", svg: near.map((x) => stalk(x, 97, 30)).join(""), origin: { x: 78, y: 97 }, keys: { at: [0, 0.62, 0.8], scaleY: [0, 0, 1] }, loop: sway },
      { name: "ears", svg: back.map((x) => ear(x, 87, 20, 0.85)).join("") + near.map((x) => ear(x, 97, 30, 1.15)).join(""), keys: { at: [0, 0.8, 0.86], opacity: [0, 0, 1] }, loop: sway }
    ],
    words: [
      { text: "The seed you sow", from: 0.02, to: 0.4 },
      { text: "Who makes it grow?", from: 0.42, to: 0.6 },
      { text: "Allah makes it grow", from: 0.62, to: 1 }
    ]
  };
}

/** A clay water jug standing at (x, y). */
const jug = (x: number, y: number) =>
  `<path d="M${x - 4} ${y} C${n(x - 6.6)} ${y - 3} ${n(x - 6.6)} ${y - 8} ${x - 3} ${y - 10} L${n(x - 2.4)} ${y - 13} L${n(x + 2.4)} ${y - 13} L${x + 3} ${y - 10} C${n(x + 6.6)} ${y - 8} ${n(x + 6.6)} ${y - 3} ${x + 4} ${y} Z" fill="#C5703F"/>` +
  `<ellipse cx="${x}" cy="${y - 13}" rx="2.8" ry="0.9" fill="#A85A30"/><path d="M${x + 3} ${n(y - 11.5)} C${n(x + 7.5)} ${n(y - 11.5)} ${n(x + 7.5)} ${y - 6} ${n(x + 4.6)} ${y - 5}" stroke="#A85A30" stroke-width="1.1" fill="none"/>` +
  `<path d="M${n(x - 5.6)} ${y - 6} Q${x} ${n(y - 4.8)} ${n(x + 5.6)} ${y - 6}" stroke="#E3A06A" stroke-width="0.8" fill="none"/>`;

// The water you drink: sent down from the clouds, sweet and not salty, so give thanks (Quran 56:68 to 56:70).
function water(): SignArt {
  const land =
    peaks(
      [
        [30, 46, 34],
        [66, 30, 24]
      ],
      82,
      "#A08C78",
      false
    ) + `<path d="M0 80 C40 78 80 81 120 79 C140 78 150 79 160 80 L160 120 L0 120 Z" fill="#E8C99A"/><path d="M0 104 C40 101 80 104 120 102 C140 101 150 102 160 103 L160 120 L0 120 Z" fill="#DDB984"/>`;
  const stream = (width: number, color: string) => `<path d="M50 80 C54 84 46 86 52 89 C58 92 66 90 76 93" stroke="${color}" stroke-width="${width}" fill="none" stroke-linecap="round"/>`;
  const pool = `<ellipse cx="100" cy="96" rx="33" ry="7.4" fill="#7CC0EE"/><ellipse cx="100" cy="96.6" rx="30" ry="6" fill="#3E8ED0"/>`;
  const stones = [
    [66, 97, 3.4],
    [70, 101, 2.6],
    [131, 98, 3],
    [126, 102, 2.4],
    [84, 103, 2.2]
  ]
    .map(([x, y, r]) => `<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${n(r * 0.66)}" fill="#A79E92"/><ellipse cx="${x}" cy="${n(y - r * 0.2)}" rx="${n(r * 0.6)}" ry="${n(r * 0.3)}" fill="#C4BCB0"/>`)
    .join("");
  const ripples = `<g stroke="#FFFFFF" stroke-width="0.8" fill="none" opacity="0.75"><path d="M76 95 q3 -1.4 6 0 M94 98 q3 -1.4 6 0 M110 94 q3 -1.4 6 0 M122 97 q3 -1.4 6 0 M86 93 q3 -1.4 6 0"/></g>`;
  const glints = `<path d="M92 92 l0.8 1.8 l1.8 0.8 l-1.8 0.8 l-0.8 1.8 l-0.8 -1.8 l-1.8 -0.8 l1.8 -0.8 Z M114 97 l0.7 1.5 l1.5 0.7 l-1.5 0.7 l-0.7 1.5 l-0.7 -1.5 l-1.5 -0.7 l1.5 -0.7 Z M142 84 l0.7 1.5 l1.5 0.7 l-1.5 0.7 l-0.7 1.5 l-0.7 -1.5 l-1.5 -0.7 l1.5 -0.7 Z" fill="#FFFFFF"/>`;
  const green =
    [62, 74, 128, 136, 88, 116].map((x, i) => tuft(x, 92 + (i % 3) * 4, i % 2 ? "#5FA344" : "#6DB24F", 5 + (i % 2))).join("") +
    flower(72, 104, "#F47C9B", 7) +
    flower(122, 105, "#FFFFFF", 7) +
    flower(58, 99, "#F6B73C", 6);
  const sun = `<circle cx="134" cy="24" r="13" fill="#FFE7A0" opacity="0.6"/><circle cx="134" cy="24" r="8.5" fill="#FFC93C"/>`;
  const clouds = (fill: string) => cloud(30, 34, 1.05, fill) + cloud(72, 30, 1.2, fill) + cloud(108, 38, 0.8, fill);
  const away = { at: [0, 0.26, 0.36, 0.52, 0.66], x: [-130, -130, 0, 0, 150] };
  return {
    kind: "water",
    ms: 10000,
    parts: [
      { name: "clear sky", svg: DAY_SKY },
      { name: "grey sky", svg: sky("#9DAEC0", "#B6C4D2"), keys: { at: [0, 0.3, 0.38, 0.52, 0.62], opacity: [0, 0, 1, 1, 0] } },
      { name: "sun", svg: sun, keys: { at: [0, 0.3, 0.36, 0.56, 0.64], opacity: [1, 1, 0, 0, 1] }, loop: { move: "twinkle", ms: 2600, low: 0.8 } },
      { name: "mountains and sand", svg: land },
      // The rain in front of the mountains, from under the clouds.
      { name: "rain", svg: rainStreaks(4, 128, 0, 120, "#5B8FC7"), clip: { x: 4, y: 38, w: 124, h: 56 }, keys: { at: [0, 0.36, 0.4, 0.5, 0.54], opacity: [0, 0, 1, 1, 0] }, loop: { move: "fall", ms: 650 } },
      { name: "white clouds", svg: clouds("#FFFFFF"), keys: away },
      { name: "rain clouds", svg: clouds("#7F8EA1"), keys: { ...away, opacity: [0, 0, 1, 1, 0] } },
      { name: "stream", svg: stream(2.4, "#5AA7DE") },
      { name: "full stream", svg: stream(4.6, "#7CC0EE") + stream(1.6, "#3E8ED0"), keys: { at: [0, 0.4, 0.48], opacity: [0, 0, 1] } },
      { name: "pool", svg: pool, origin: { x: 100, y: 96 }, keys: { at: [0, 0.4, 0.54], scale: [0.72, 0.72, 1] } },
      { name: "ripples", svg: ripples, clip: { x: 70, y: 90, w: 60, h: 12 }, loop: { move: "slide", ms: 4200, period: 60 } },
      { name: "stones", svg: stones },
      { name: "grass and flowers", svg: green, origin: { x: 100, y: 102 }, keys: { at: [0, 0.6, 0.72], scaleY: [0, 0, 1] }, loop: { move: "bob", ms: 2600, x: 0.5 } },
      { name: "palm", svg: palm(146, 96, 40), origin: { x: 146, y: 96 }, loop: { move: "sway", ms: 4600, angle: 1.3 } },
      { name: "jug", svg: jug(134, 104) },
      { name: "camel", svg: camelAt(24, 63, 0.38), origin: { x: 42, y: 91 }, keys: { at: [0, 0.58, 0.74], x: [-120, -120, 0] }, loop: { move: "bob", ms: 1200, y: 0.5, rotate: 1 } },
      { name: "glints", svg: glints, keys: { at: [0, 0.78, 0.82], opacity: [0, 0, 1] }, loop: { move: "twinkle", ms: 1500, low: 0.15 } }
    ],
    words: [
      { text: "The water you drink", from: 0.02, to: 0.26 },
      { text: "Down from the clouds", from: 0.28, to: 0.54 },
      { text: "Sweet, not salty", from: 0.56, to: 0.78 },
      { text: "So give thanks", from: 0.8, to: 1 }
    ]
  };
}

/** A drawing in the dark: every color in it made one night's color. */
const inTheDark = (svg: string, color = "#26253C") => svg.replace(/fill="#[0-9A-Fa-f]{6}"/g, `fill="${color}"`).replace(/stroke="#[0-9A-Fa-f]{6}"/g, `stroke="${color}"`);

// The fire you kindle: from the green tree, a reminder, and a gift for travelers (Quran 56:71 to 56:73, 36:80).
function fire(): SignArt {
  const land = `<path d="M0 86 C30 80 60 84 96 82 C124 80 144 83 160 82 L160 120 L0 120 Z" fill="#3B3653"/><path d="M0 102 C40 99 80 102 120 100 C140 99 150 100 160 101 L160 120 L0 120 Z" fill="#302B46"/>`;
  const twinkles: [number, number][] = [
    [12, 16],
    [34, 40],
    [52, 22],
    [70, 46],
    [104, 18],
    [124, 38],
    [142, 14],
    [150, 50],
    [88, 30],
    [22, 58]
  ];
  // The green tree: a bush of green branches, its leaves dark by night and bright in the firelight.
  const tree = (leaf: string, light: string) =>
    `<path d="M24 92 L24 76 M24 82 L16 72 M24 80 L32 70" stroke="#5A4630" stroke-width="2" stroke-linecap="round"/>` +
    `<circle cx="24" cy="66" r="11" fill="${leaf}"/><circle cx="14" cy="72" r="7" fill="${light}"/><circle cx="34" cy="70" r="7.5" fill="${light}"/><circle cx="22" cy="58" r="6" fill="${light}"/>`;
  const hearth =
    [
      [70, 99],
      [77, 101.6],
      [86, 102.2],
      [95, 101],
      [100, 98]
    ]
      .map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="4" ry="2.4" fill="#6E6A78"/><ellipse cx="${x}" cy="${n(y - 0.7)}" rx="2.4" ry="1.1" fill="#8D8999"/>`)
      .join("") + `<path d="M74 98 L96 93 M76 93 L96 99" stroke="#6B4A2E" stroke-width="3" stroke-linecap="round"/>`;
  // Two green branches, one rubbed along the other till it sparks.
  const fixedStick = `<path d="M64 95 L98 89" stroke="#4E8A3A" stroke-width="2.2" stroke-linecap="round"/>`;
  const rubbed = `<path d="M70 86 L94 96" stroke="#5FA344" stroke-width="2.2" stroke-linecap="round"/>`;
  const rubs = (() => {
    const at: number[] = [0, 0.04];
    const x: number[] = [0, 0];
    for (let t = 0.06, i = 0; t <= 0.24; t += 0.02, i += 1) {
      at.push(n(t * 100) / 100);
      x.push(i % 2 ? -3.4 : 3.4);
    }
    at.push(0.27, 0.32);
    x.push(0, 0);
    return { at, x, opacity: at.map((time) => (time < 0.27 ? 1 : 0)) };
  })();
  const sparks = `<circle cx="82" cy="91" r="0.9" fill="#FFE07A"/><circle cx="79" cy="89" r="0.7" fill="#FFB347"/><circle cx="85" cy="88.6" r="0.6" fill="#FFE07A"/><circle cx="83" cy="86.4" r="0.6" fill="#FFFFFF"/>`;
  const rising = (dx: number) => `<circle cx="${82 + dx}" cy="80" r="0.8" fill="#FFD84A"/><circle cx="${87 + dx}" cy="76" r="0.6" fill="#FFB347"/><circle cx="${78 + dx}" cy="74" r="0.6" fill="#FFE07A"/>`;
  const tent = `<path d="M124 92 L140 72 L156 92 Z" fill="#B89A70"/><path d="M140 72 L156 92 L147 92 Z" fill="#9C805A"/><path d="M136 92 L140 80 L144 92 Z" fill="#5E4A34"/><path d="M124 92 L119 96" stroke="#8A5A33" stroke-width="0.7"/>`;
  // A camel resting by its tent, facing the fire.
  const camel = animalAt("camel", 102, 66, 0.3, true);
  const lit = { at: [0, 0.78, 0.88], opacity: [0, 0, 1] };
  return {
    kind: "fire",
    ms: 10500,
    parts: [
      { name: "night sky", svg: nightSky(84) },
      { name: "stars", svg: stars(twinkles), loop: { move: "twinkle", ms: 2400, low: 0.45 } },
      { name: "land", svg: land },
      { name: "glow", svg: glow(84, 92, 62, "#FFB347", 0.07), keys: { at: [0, 0.26, 0.42], opacity: [0, 0, 1] }, loop: { move: "twinkle", ms: 1800, low: 0.7 } },
      { name: "travelers by night", svg: inTheDark(tent + camel) },
      { name: "travelers in the firelight", svg: tent + camel, keys: lit },
      { name: "tree by night", svg: inTheDark(tree("#3F8F3F", "#55A64C"), "#1E3A2C") },
      { name: "green tree", svg: tree("#3F8F3F", "#55A64C"), keys: { at: [0, 0.3, 0.38], opacity: [0, 0, 1] }, loop: { move: "sway", ms: 4200, angle: 1.2 }, origin: { x: 24, y: 92 } },
      { name: "hearth", svg: hearth },
      { name: "green branch", svg: fixedStick, keys: { at: [0, 0.27, 0.32], opacity: [1, 1, 0] } },
      { name: "rubbing branch", svg: rubbed, keys: rubs },
      { name: "sparks", svg: sparks, keys: { at: [0, 0.12, 0.14, 0.27, 0.3], opacity: [0, 0, 1, 1, 0] }, loop: { move: "twinkle", ms: 400, low: 0 } },
      { name: "fire", svg: flame(85, 97, 24), origin: { x: 85, y: 97 }, keys: { at: [0, 0.24, 0.3, 0.42], scale: [0, 0, 0.4, 1] }, loop: { move: "sway", ms: 900, angle: 4 } },
      { name: "inner fire", svg: flame(86, 97, 13), origin: { x: 86, y: 97 }, keys: { at: [0, 0.26, 0.32, 0.42], scale: [0, 0, 0.5, 1] }, loop: { move: "twinkle", ms: 640, low: 0.55 } },
      { name: "rising sparks", svg: rising(0), keys: { at: [0, 0.4, 0.44], opacity: [0, 0, 1] }, loop: { move: "drip", ms: 1500, distance: -22 } },
      { name: "more rising sparks", svg: rising(4), keys: { at: [0, 0.44, 0.48], opacity: [0, 0, 1] }, loop: { move: "drip", ms: 1500, distance: -22, phase: 0.5 } }
    ],
    words: [
      { text: "The fire you kindle", from: 0.02, to: 0.28 },
      { text: "From the green tree", from: 0.3, to: 0.54 },
      { text: "A reminder", from: 0.56, to: 0.76 },
      { text: "A gift for travelers", from: 0.78, to: 1 }
    ]
  };
}

// The shade He stretches, the sun its guide, and the shade He draws in, little by little (Quran 25:45, 25:46).
function shade(): SignArt {
  const dawn = `<rect width="160" height="120" fill="#B9C6DE"/><rect y="40" width="160" height="80" fill="#D3D6E4"/><rect y="68" width="160" height="52" fill="#F2D6B8"/>`;
  const land = (dune: string, top: string, low: string) =>
    `<path d="M0 86 C20 78 40 80 56 86 Z M96 86 C116 76 140 78 160 84 L160 86 Z" fill="${dune}"/>` +
    `<path d="M0 86 C40 84 80 86 120 85 C140 84 150 85 160 86 L160 120 L0 120 Z" fill="${top}"/><path d="M0 102 C40 100 80 102 120 101 C140 100 150 101 160 102 L160 120 L0 120 Z" fill="${low}"/>`;
  const sun = `<circle cx="146" cy="96" r="14" fill="#FFE7A0" opacity="0.6"/><circle cx="146" cy="96" r="8.5" fill="#FFC93C"/>`;
  // The palm's shadow, lying away from the sun: stretched out long at sunrise, drawn in as the sun climbs.
  const palmShadow = `<path d="M60 95 L-14 95.4 L-14 100.6 L60 99.2 Z M-14 98 m-15 0 a15 5 0 1 0 30 0 a15 5 0 1 0 -30 0" fill="#4A3A2C" opacity="0.42"/>`;
  const rock = `<path d="M106 98 C106 92 110 90 114 90 C119 90 122 93 122 98 Z" fill="#B49A7A"/><path d="M114 90 C119 90 122 93 122 98 L117 98 Z" fill="#9C8263"/>`;
  const rockShadow = `<path d="M108 96.6 L78 97.4 C74 97.6 74 100.6 78 100.8 L108 100 Z" fill="#4A3A2C" opacity="0.42"/>`;
  const grass = [20, 40, 84, 98, 132, 150].map((x, i) => tuft(x, 98 + (i % 3) * 3, "#7FA34A", 5)).join("");
  const shadow = { at: [0, 0.08, 0.3, 0.4, 0.66, 1], scaleX: [0, 0, 1, 1, 0.62, 0.34], opacity: [0, 0, 1, 1, 1, 1] };
  return {
    kind: "shade",
    ms: 10500,
    parts: [
      { name: "dawn sky", svg: dawn },
      { name: "day sky", svg: DAY_SKY, keys: { at: [0, 0.36, 0.62], opacity: [0, 0, 1] } },
      { name: "clouds", svg: cloud(36, 30, 0.7, "#FFFFFF", 0.9) + cloud(92, 22, 0.55, "#FFFFFF", 0.8), loop: { move: "bob", ms: 9000, x: 5 } },
      { name: "sun", svg: sun, keys: { at: [0, 0.06, 0.3, 0.4, 0.66, 1], x: [0, 0, -2, -4, -14, -26], y: [0, 0, -12, -18, -34, -50] }, loop: { move: "twinkle", ms: 2600, low: 0.8 } },
      { name: "land", svg: land("#E2C38E", "#E9CF9F", "#DDBE88") },
      // Before the sun is up, the whole land lies in shade.
      { name: "land in shade", svg: land("#B7A386", "#BBA88A", "#B09C7C"), keys: { at: [0, 0.08, 0.3], opacity: [1, 1, 0] } },
      { name: "grass", svg: grass, loop: { move: "bob", ms: 2600, x: 0.5 } },
      { name: "palm's shadow", svg: palmShadow, origin: { x: 60, y: 97 }, keys: shadow },
      { name: "rock's shadow", svg: rockShadow, origin: { x: 108, y: 98 }, keys: shadow },
      { name: "rock", svg: rock },
      { name: "palm", svg: palm(58, 97, 50), origin: { x: 58, y: 97 }, loop: { move: "sway", ms: 4600, angle: 1.2 } }
    ],
    words: [
      { text: "He stretches the shade", from: 0.04, to: 0.38 },
      { text: "The sun is its guide", from: 0.4, to: 0.66 },
      { text: "Then He draws it in, little by little", from: 0.68, to: 1 }
    ]
  };
}

export const SIGN_ART: Record<SignKind, () => SignArt> = { rain, clouds, fade, seed, seas, ships, mountains, bee, spider, tree, look, birds, sow, water, fire, shade, ...PARABLE_ART, ...STORY_ART, ...HISTORY_ART, ...PROPHET_ART, ...FAVOR_ART, ...TRIAL_ART, ...COMMAND_ART };

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
