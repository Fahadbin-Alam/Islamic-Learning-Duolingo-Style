import { animalAt, cloud, glow, n, nightSky, palm, peaks, rainStreaks, sky, stars, tuft, type SignArt, type SignKeys } from "./signDraw";
import { at3, curls, showFrom } from "./storyArt";
import { crescent, home } from "./trialArt";

/**
 * Allah's power in the stories, drawn as the other stories are (storyArt.ts, trialArt.ts, commandArt.ts): Lut's town
 * turned upside down and the stones of baked clay on it; the signs sent on Pharaoh's people one after another; the
 * town by the sea whose fish came on their Sabbath; Dhul-Qarnayn's way to where the sun sets and to where it rises;
 * Ibrahim's four birds coming back to life; the ruined town, the hundred years, and the donkey raised from its bones;
 * and Yusuf's shirt, its scent carried to his father, and his sight come back. Only the land, the sky, water, plants,
 * animals and things are drawn. No Prophet, no person and no angel is ever drawn: things move by themselves.
 */

/** Keys that show a part from `from` to `to`, then hide it from `hide` to `gone`. */
const showWhile = (from: number, to: number, hide: number, gone: number): SignKeys => ({ at: [0, from, to, hide, gone], opacity: [0, 0, 1, 1, 0] });
/** Keys that show a part from the start, then hide it from `from` to `gone`. */
const hideFrom = (from: number, gone: number): SignKeys => ({ at: [0, from, gone], opacity: [1, 1, 0] });
/** Keys that show a part over each of `spans` ([from, to], to 1 to keep it), each coming and going quickly. */
function litDuring(spans: [number, number][]): SignKeys {
  const at = [0];
  const opacity = [spans[0][0] === 0 ? 1 : 0];
  for (const [from, to] of spans) {
    if (from > 0) at.push(from, at3(from + 0.008)), opacity.push(0, 1);
    if (to < 1) at.push(to, at3(to + 0.008)), opacity.push(1, 0);
  }
  return { at, opacity };
}

// Lut's town: leave with your family in a part of the night (Quran 11:81, 15:65); their appointed time is the morning;
// is not the morning near? (11:81); when Our command came, We turned it upside down and rained on it stones of baked
// clay, layer on layer (11:82), marked by your Lord (11:83); and We left of it a clear sign for people who reason
// (29:35). Lut and his family are not drawn, and no one of his people: only the way out of the town, lit by night, the
// town, its homes and palms, its land turned over, and the stones.

/** A stone of baked clay, its middle at (x, y), `s` times its size, with its mark on it. */
const clayStone = (x: number, y: number, s = 1) =>
  `<ellipse cx="${x}" cy="${y}" rx="${n(1.5 * s)}" ry="${n(1.15 * s)}" fill="#8E4F2E"/>` +
  `<ellipse cx="${n(x - 0.4 * s)}" cy="${n(y - 0.4 * s)}" rx="${n(0.7 * s)}" ry="${n(0.45 * s)}" fill="#B26A41"/>` +
  `<path d="M${n(x - 0.6 * s)} ${n(y + 0.3 * s)} L${n(x + 0.7 * s)} ${n(y - 0.1 * s)}" stroke="#F3D9A0" stroke-width="${n(0.35 * s)}" stroke-linecap="round"/>`;

function overturned(): SignArt {
  const starry = stars([
    [12, 14],
    [30, 32],
    [50, 12],
    [70, 26],
    [92, 10],
    [112, 24],
    [132, 12],
    [152, 30],
    [20, 46],
    [62, 44],
    [100, 40],
    [146, 50]
  ]);
  const evening = `<rect y="50" width="160" height="34" fill="#7A5C86" opacity="0.35"/><rect y="68" width="160" height="16" fill="#C08A86" opacity="0.3"/>`;
  const moon = glow(28, 22, 10, "#F4F1DE", 0.06) + crescent(28, 22, 5, 2.4, "#F4F1DE");
  const sun = glow(136, 44, 16, "#FFE7A0", 0.12) + `<circle cx="136" cy="44" r="6.5" fill="#FFD25A"/>`;
  const hills = peaks(
    [
      [10, 14, 22],
      [44, 20, 26],
      [80, 12, 24],
      [120, 22, 28],
      [156, 18, 22]
    ],
    84,
    "#8E7A66",
    false
  );
  // The town on its land: its homes and a palm on top, and the land's underside (earth, rocks and roots) under the
  // ground's line, out of sight until the town is turned upside down about the middle of its streets.
  const rocks = [
    [36, 89, 2.6],
    [52, 96, 3.2],
    [66, 101, 2.4],
    [82, 97, 3],
    [98, 92, 2.6],
    [74, 92, 1.8],
    [46, 91, 1.6]
  ]
    .map(([x, y, r]) => `<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${n(r * 0.7)}" fill="#4F3A2B"/><ellipse cx="${n(x - r * 0.3)}" cy="${n(y - r * 0.3)}" rx="${n(r * 0.4)}" ry="${n(r * 0.25)}" fill="#7C5E46"/>`)
    .join("");
  const roots = `<path d="M44 85 C45 89 43 92 45 95 M60 85 C59 90 62 93 60 98 M90 85 C91 89 88 93 90 96 M104 85 C103 88 106 90 104 92" stroke="#3E2C20" stroke-width="0.6" fill="none"/>`;
  const underside =
    `<path d="M24 84 C32 97 52 105 70 105 C88 105 108 97 116 84 Z" fill="#6E513C"/>` +
    `<path d="M29 89 C46 94 94 94 111 89 M38 97 C56 101 84 101 102 97" stroke="#5A4130" stroke-width="1.2" fill="none"/>` +
    rocks +
    roots;
  const streets = `<rect x="24" y="82" width="92" height="2.4" fill="#CBB088"/>`;
  const homes = home(33, 82, 12, 9) + home(47, 82, 14, 13) + home(61, 82, 11, 10) + palm(72, 82, 14) + home(85, 82, 15, 12) + home(100, 82, 12, 9) + home(111, 82, 8, 7);
  const windows = [
    [35, 75.4],
    [49, 71.4],
    [87, 72.4],
    [102, 75.4]
  ]
    .map(([x, y]) => `${glow(x + 1.3, y + 1.3, 4, "#FFD77A", 0.12)}<rect x="${x}" y="${y}" width="2.6" height="2.6" fill="#FFD77A"/>`)
    .join("");
  const ground =
    `<rect y="84" width="160" height="36" fill="#D3BA8F"/><path d="M0 84 L160 84" stroke="#BFA57A" stroke-width="0.8"/>` +
    [
      [8, 92],
      [30, 116],
      [58, 94],
      [118, 114],
      [140, 92],
      [96, 116]
    ]
      .map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="1.6" ry="0.7" fill="#BFA57A"/>`)
      .join("") +
    [6, 22, 132, 150].map((x, i) => tuft(x, i % 2 ? 90 : 88, "#A7A45E", 4)).join("");
  const road =
    `<path d="M0 104 C40 100 92 102 160 97 L160 105 C92 110 40 108 0 112 Z" fill="#E4D1A8"/>` +
    `<path d="M0 104 C40 100 92 102 160 97 M0 112 C40 108 92 110 160 105" stroke="#C9AE7E" stroke-width="0.6" fill="none"/>`;
  const way = `<path d="M114 88 C124 90 134 89 142 86 C148 84 154 82 160 81" stroke="#FFF0C4" stroke-width="1.1" stroke-dasharray="2 2.2" fill="none" stroke-linecap="round"/>`;
  const falling = [
    [16, 6],
    [34, 30],
    [52, 14],
    [70, 40],
    [88, 8],
    [106, 26],
    [124, 46],
    [24, 62],
    [44, 86],
    [62, 70],
    [80, 100],
    [98, 64],
    [116, 88],
    [30, 108],
    [72, 114],
    [110, 112]
  ]
    .map(([x, y]) => clayStone(x, y, 0.9))
    .join("");
  // On the land turned over (its top from (24, 84) up to (70, 63) and down to (116, 84)), and on the ground about it.
  const firstLayer = [
    [29, 81],
    [38, 74.6],
    [48, 69.6],
    [58, 66.4],
    [70, 65.2],
    [82, 66.2],
    [92, 68.6],
    [102, 73],
    [110, 78.6],
    [20, 88],
    [122, 88]
  ]
    .map(([x, y]) => clayStone(x, y))
    .join("");
  const secondLayer = [
    [33, 76.4],
    [43, 70.6],
    [53, 66.6],
    [64, 63.4],
    [76, 63.6],
    [87, 65.4],
    [97, 69.2],
    [106, 74.4],
    [16, 94],
    [128, 92],
    [60, 90],
    [92, 91]
  ]
    .map(([x, y]) => clayStone(x, y))
    .join("");
  const dust = [
    [22, 80, 1.1],
    [118, 80, 1.1],
    [44, 66, 0.8],
    [98, 66, 0.8]
  ]
    .map(([x, y, s]) => cloud(x, y, s * 0.6, "#B49A7A", 0.55))
    .join("");
  return {
    kind: "overturned",
    ms: 12000,
    parts: [
      { name: "night sky", svg: nightSky(84) },
      { name: "evening light", svg: evening, keys: hideFrom(0.02, 0.08) },
      { name: "dawn", svg: `${sky("#F0C3A2", "#F8E1C8", 84)}${glow(136, 80, 50, "#FFE3B0", 0.1)}`, keys: showFrom(0.2, 0.26) },
      { name: "morning", svg: sky("#BEDDF2", "#E2F0F9", 84), keys: showFrom(0.28, 0.34) },
      { name: "stars", svg: starry, keys: hideFrom(0.2, 0.26), loop: { move: "twinkle", ms: 2400, low: 0.5 } },
      { name: "the moon", svg: moon, keys: hideFrom(0.2, 0.26) },
      { name: "the sun rising", svg: sun, keys: { at: [0, 0.22, 0.24, 0.34], opacity: [0, 0, 1, 1], y: [34, 34, 34, 0] } },
      { name: "far hills", svg: hills },
      { name: "dark sky of the stones", svg: `<rect width="160" height="84" fill="#4A2A26" opacity="0.5"/>`, keys: showWhile(0.58, 0.62, 0.78, 0.84) },
      {
        name: "clouds of the stones",
        svg: cloud(30, 22, 1.3, "#5B4440") + cloud(80, 16, 1.5, "#4E3A37") + cloud(128, 22, 1.3, "#5B4440"),
        keys: showWhile(0.58, 0.62, 0.78, 0.84),
        loop: { move: "bob", ms: 3000, x: 2 }
      },
      // Turned right round about the middle of its streets, rising a little as it turns.
      {
        name: "the town",
        svg: underside + streets + homes,
        origin: { x: 70, y: 84 },
        keys: { at: [0, 0.42, 0.47, 0.52], rotate: [0, 0, 90, 180], y: [0, 0, -18, 0] }
      },
      { name: "dust of the town turned over", svg: dust, keys: showWhile(0.49, 0.52, 0.6, 0.66), loop: { move: "bob", ms: 1800, y: -1.2 } },
      { name: "the ground", svg: ground },
      { name: "the road by it", svg: road },
      { name: "night over the land", svg: `<rect y="40" width="160" height="80" fill="#0F1C3A" opacity="0.45"/>`, keys: hideFrom(0.2, 0.3) },
      { name: "lamps in the homes", svg: windows, keys: hideFrom(0.2, 0.26), loop: { move: "twinkle", ms: 1100, low: 0.65 } },
      { name: "the way out of the town by night", svg: way, keys: showWhile(0.06, 0.12, 0.26, 0.32) },
      { name: "light where the way leads", svg: glow(156, 82, 9, "#FFF0C4", 0.12), keys: showWhile(0.08, 0.14, 0.26, 0.32), loop: { move: "twinkle", ms: 1600, low: 0.6 } },
      {
        name: "stones of baked clay falling",
        svg: falling,
        clip: { x: 10, y: 24, w: 120, h: 60 },
        keys: showWhile(0.6, 0.62, 0.78, 0.8),
        loop: { move: "fall", ms: 900 }
      },
      { name: "stones on it, a first layer", svg: firstLayer, keys: showFrom(0.64, 0.68) },
      { name: "stones on it, layer on layer", svg: secondLayer, keys: showFrom(0.7, 0.74) },
      { name: "a clear sign", svg: glow(70, 72, 34, "#FFF4D6", 0.07), keys: showFrom(0.84, 0.9), loop: { move: "twinkle", ms: 2600, low: 0.75 } }
    ],
    words: [
      { text: "Leave by night", from: 0.02, to: 0.18 },
      { text: "Their appointed time is the morning", from: 0.22, to: 0.38 },
      { text: "We turned it upside down", from: 0.42, to: 0.58 },
      { text: "Stones of baked clay, layer on layer", from: 0.62, to: 0.78 },
      { text: "We left a clear sign", from: 0.82, to: 1 }
    ]
  };
}

// The signs on Pharaoh's people: We seized them with years of drought and too little fruit (Quran 7:130); then We
// sent on them the flood, the locusts, the lice, the frogs and the blood, signs made clear, one after another
// (7:133); and each time the torment was lifted from them, they broke their word (7:135, 43:50). No one is drawn: only
// their land by the river, its fields, homes and water jars, and each sign as it comes and is lifted.

/** A water jar of clay, its foot's middle at (x, y). */
const jar = (x: number, y: number) =>
  `<path d="M${n(x - 1.6)} ${y} C${n(x - 2.6)} ${n(y - 2)} ${n(x - 2.2)} ${n(y - 3.8)} ${n(x - 1)} ${n(y - 4.4)} L${n(x - 1)} ${n(y - 5.2)} L${n(x + 1)} ${n(y - 5.2)} L${n(x + 1)} ${n(y - 4.4)} C${n(x + 2.2)} ${n(y - 3.8)} ${n(x + 2.6)} ${n(y - 2)} ${n(x + 1.6)} ${y} Z" fill="#B5703E"/>` +
  `<ellipse cx="${x}" cy="${n(y - 5.2)}" rx="1.1" ry="0.4" fill="#3E6E8E"/>`;

/** A frog sitting, its foot's middle at (x, y), `s` times its size, facing right (or left). */
const frog = (x: number, y: number, s = 1, left = false) => {
  const d = left ? -1 : 1;
  const p = (dx: number, dy: number) => `${n(x + dx * s * d)} ${n(y + dy * s)}`;
  return (
    `<path d="M${p(-2.8, 0)} C${p(-3.6, -1.8)} ${p(-1.8, -2.8)} ${p(-0.4, -1.6)} L${p(0.4, 0)} Z" fill="#3E7D2E"/>` +
    `<path d="M${p(-2.8, -0.8)} C${p(-2.6, -3.4)} ${p(0.6, -4.2)} ${p(2.4, -3.2)} C${p(3.4, -2.6)} ${p(3.2, -0.9)} ${p(2, -0.5)} Z" fill="#5BA03F"/>` +
    `<path d="M${p(-1.4, -0.7)} C${p(-0.2, -1.6)} ${p(1.3, -1.3)} ${p(2, -0.5)} Z" fill="#B8D88A"/>` +
    `<path d="M${p(1.3, -1.1)} L${p(1.7, 0)} L${p(2.7, 0)}" stroke="#3E7D2E" stroke-width="${n(0.5 * s)}" fill="none" stroke-linecap="round"/>` +
    `<circle cx="${n(x + 1.5 * s * d)}" cy="${n(y - 3.5 * s)}" r="${n(0.8 * s)}" fill="#5BA03F"/>` +
    `<circle cx="${n(x + 1.7 * s * d)}" cy="${n(y - 3.6 * s)}" r="${n(0.38 * s)}" fill="#1F2A1A"/>`
  );
};

/** A locust in flight, its middle at (x, y), `s` times its size, facing right. */
const flyingLocust = (x: number, y: number, s = 1) =>
  `<ellipse cx="${x}" cy="${y}" rx="${n(2.2 * s)}" ry="${n(0.7 * s)}" fill="#7A8A3A"/>` +
  `<path d="M${n(x - 1.4 * s)} ${n(y - 0.3 * s)} L${n(x + 0.2 * s)} ${n(y - 2.6 * s)} L${n(x + 1 * s)} ${n(y - 0.4 * s)} Z" fill="#D6D29A" opacity="0.85"/>` +
  `<circle cx="${n(x + 2.2 * s)}" cy="${n(y - 0.2 * s)}" r="${n(0.6 * s)}" fill="#6A7A30"/>`;

/** A locust on a crop, its middle at (x, y), `s` times its size, facing right (or left). */
const restingLocust = (x: number, y: number, left = false, s = 1.4) => {
  const d = left ? -1 : 1;
  const p = (dx: number, dy: number) => `${n(x + dx * s * d)} ${n(y + dy * s)}`;
  return (
    `<ellipse cx="${x}" cy="${y}" rx="${n(2.4 * s)}" ry="${n(0.85 * s)}" fill="#7A8A3A"/><path d="M${p(-1.8, -0.4)} L${p(1.6, -1.5)} L${p(2, -0.5)} Z" fill="#9AAA4E"/>` +
    `<circle cx="${n(x + 2.4 * s * d)}" cy="${n(y - 0.1 * s)}" r="${n(0.65 * s)}" fill="#6A7A30"/>` +
    `<path d="M${p(0.4, 0.6)} L${p(1.8, 1.9)} M${p(-0.8, 0.6)} L${p(-2.2, 2)} L${p(-1, 1.1)}" stroke="#5E6A2A" stroke-width="${n(0.4 * s)}" fill="none"/>`
  );
};

function fiveSigns(): SignArt {
  const scene = sky("#F6E2BC", "#FAF0DC", 60);
  const sun = `${glow(28, 22, 14, "#FFF0C0", 0.12)}<circle cx="28" cy="22" r="6" fill="#FFE29A"/>`;
  let columns = "";
  for (let x = 114; x < 152; x += 7) columns += `<rect x="${x}" y="48" width="2.4" height="15" fill="#D3BD8C"/><rect x="${n(x - 0.5)}" y="47.2" width="3.4" height="1.2" fill="#C2A976"/>`;
  const farBank =
    `<rect y="60" width="160" height="10" fill="#D9C08C"/>` +
    `<rect x="110" y="44" width="44" height="19" fill="#E8D7AE"/><rect x="108" y="41" width="48" height="3.4" fill="#CDB47F"/>${columns}` +
    palm(12, 64, 11) +
    palm(26, 65, 8) +
    palm(60, 63, 12) +
    palm(90, 64, 9);
  const water = `<rect y="68" width="160" height="16" fill="#6BAFD6"/><rect y="68" width="160" height="1.6" fill="#8CC5E6"/>`;
  const ripples = curls(74, 20, "#A9D8F2", 0.7) + curls(80, 24, "#A9D8F2", 0.7, 14);
  let crops = "";
  for (let row = 0; row < 3; row += 1) for (let x = 60 + row * 3; x < 158; x += 7) crops += tuft(x, 89 + row * 6, row % 2 ? "#5E9A3A" : "#6BAA44", 4.2);
  const fields = `<rect y="84" width="160" height="20" fill="#B9C97A"/>${crops}`;
  const homes = home(14, 100, 18, 14, "#C9A26E", "#B08654", "#5E3F25") + home(34, 101, 14, 11, "#C9A26E", "#B08654", "#5E3F25") + jar(46, 101) + jar(51, 102);
  const path = `<rect y="104" width="160" height="16" fill="#D8C08E"/><path d="M0 104 L160 104" stroke="#C4A878" stroke-width="0.6"/>`;
  // Years of drought: the fields dry, the river low between banks of sand.
  let stalks = "";
  for (let row = 0; row < 3; row += 1) for (let x = 60 + row * 3; x < 158; x += 7) stalks += `<path d="M${x} ${89 + row * 6} l-1 -3 M${x} ${89 + row * 6} l0.4 -3.4 M${x} ${89 + row * 6} l1.4 -2.6" stroke="#A88A4E" stroke-width="0.6"/>`;
  const dryFields = `<rect y="84" width="160" height="20" fill="#CDB57E"/><path d="M62 92 l6 2 l4 -1 M96 98 l5 -2 l6 2 M128 90 l4 3 l6 -1" stroke="#A88A5A" stroke-width="0.5" fill="none"/>${stalks}`;
  const lowRiver =
    `<path d="M0 72 C40 70 80 74 120 71 C140 70 150 72 160 71 L160 80 C120 82 80 78 40 81 C20 82 10 80 0 81 Z" fill="#D9C08C"/>` +
    `<path d="M20 76 l5 1 l3 -1 M70 75 l4 2 l5 -1 M118 76 l6 1" stroke="#B9A06C" stroke-width="0.5" fill="none"/>`;
  // The flood: rain from dark clouds, and the water over the fields and up the walls.
  const flood =
    `<path d="M0 82 C14 80 26 84 40 82 C54 80 66 84 80 82 C94 80 106 84 120 82 C134 80 146 84 160 82 L160 106 L0 106 Z" fill="#5E9FCB" opacity="0.9"/>` +
    curls(88, 18, "#A9D8F2", 0.7, 6) +
    curls(96, 22, "#A9D8F2", 0.7, 16);
  // The locusts: a swarm across the sky, and more of them on the crops.
  const swarm = [
    [8, 30],
    [20, 44],
    [30, 22],
    [42, 52],
    [52, 34],
    [64, 18],
    [72, 46],
    [84, 28],
    [96, 54],
    [104, 36],
    [116, 20],
    [124, 48],
    [136, 30],
    [148, 42],
    [156, 24],
    [14, 58],
    [60, 60],
    [110, 60],
    [26, 36],
    [78, 12],
    [92, 40],
    [132, 14],
    [142, 56],
    [36, 10],
    [66, 32],
    [152, 52]
  ]
    .map(([x, y], i) => flyingLocust(x, y, i % 3 ? 1.3 : 1.6))
    .join("");
  const onTheCrops = [
    [64, 87, false],
    [80, 93, true],
    [96, 88, false],
    [110, 99, false],
    [124, 92, true],
    [140, 88, false],
    [150, 98, true],
    [72, 100, true],
    [88, 86, false],
    [134, 101, true],
    [104, 93, true]
  ]
    .map(([x, y, left]) => restingLocust(x as number, y as number, left as boolean))
    .join("");
  // The lice: tiny specks over the fields, the homes and the ground.
  const lice = [
    [10, 94], [12, 97], [16, 92], [20, 96], [8, 90], [30, 95], [33, 98], [36, 93], [44, 98], [49, 99],
    [58, 88], [61, 92], [66, 96], [70, 90], [76, 98], [82, 88], [86, 94], [92, 101], [98, 90], [104, 95],
    [110, 89], [114, 98], [120, 93], [126, 100], [132, 88], [136, 95], [142, 101], [148, 90], [152, 96], [156, 92],
    [6, 108], [16, 112], [28, 107], [40, 114], [52, 109], [64, 115], [78, 108], [90, 113], [102, 107], [116, 112],
    [128, 108], [140, 115], [150, 109], [22, 103], [74, 104], [124, 103],
    [11, 90], [18, 89], [31, 93], [37, 97], [63, 86], [68, 99], [80, 92], [88, 98], [95, 87], [101, 101],
    [107, 92], [117, 87], [123, 96], [129, 91], [139, 98], [145, 87], [153, 100], [58, 101], [84, 102], [112, 102]
  ]
    .map(([x, y], i) => `<ellipse cx="${x}" cy="${y}" rx="${i % 2 ? 0.8 : 0.7}" ry="0.5" fill="#3A2A20"/>`)
    .join("");
  // The frogs: on the fields, by the homes and the jars, on the bank and on the path.
  const frogs = [
    [6, 103, 1, false],
    [24, 102, 0.9, true],
    [42, 103, 1, false],
    [56, 86, 0.9, true],
    [66, 95, 1.1, false],
    [84, 90, 1, true],
    [98, 99, 1.1, false],
    [112, 87, 0.9, false],
    [126, 96, 1, true],
    [144, 91, 1, false],
    [154, 101, 0.9, true],
    [16, 112, 1.2, false],
    [48, 115, 1.1, true],
    [80, 111, 1.2, false],
    [118, 116, 1.1, true],
    [146, 112, 1.2, false]
  ]
    .map(([x, y, s, left]) => frog(x as number, y as number, s as number, left as boolean))
    .join("");
  const blood = `<rect y="68" width="160" height="16" fill="#A3322B"/><rect y="68" width="160" height="1.6" fill="#C24A40"/>${curls(74, 20, "#C9574C", 0.7)}${curls(80, 24, "#C9574C", 0.7, 14)}`;
  const bloodInJars = `<ellipse cx="46" cy="95.8" rx="1.1" ry="0.4" fill="#A3322B"/><ellipse cx="51" cy="96.8" rx="1.1" ry="0.4" fill="#A3322B"/>`;
  const bloodKeys: SignKeys = { at: [0, 0.69, 0.72, 0.84, 0.88], opacity: [0, 0, 1, 1, 0] };
  return {
    kind: "five-signs",
    ms: 12000,
    parts: [
      { name: "sky", svg: scene },
      { name: "the sun", svg: sun },
      { name: "the burning sun of the drought", svg: glow(28, 22, 30, "#FFD27A", 0.1), keys: showWhile(0.02, 0.07, 0.13, 0.15) },
      { name: "storm clouds", svg: cloud(30, 24, 1.4, "#7D8794") + cloud(80, 18, 1.6, "#6E7884") + cloud(130, 24, 1.4, "#7D8794"), keys: showWhile(0.14, 0.17, 0.27, 0.29), loop: { move: "bob", ms: 3200, x: 2 } },
      { name: "far bank and the palace", svg: farBank },
      { name: "the river", svg: water },
      { name: "the river flowing", svg: ripples, loop: { move: "slide", ms: 7000 } },
      { name: "the river run low", svg: lowRiver, keys: showWhile(0.02, 0.07, 0.13, 0.15) },
      { name: "the river turned to blood", svg: blood, keys: bloodKeys },
      { name: "their fields", svg: fields, origin: { x: 110, y: 100 }, loop: { move: "sway", ms: 2600, angle: 0.6 } },
      { name: "their fields dried up", svg: dryFields, keys: showWhile(0.02, 0.07, 0.13, 0.15) },
      { name: "their homes and water jars", svg: homes },
      { name: "blood in their jars", svg: bloodInJars, keys: bloodKeys },
      { name: "the path", svg: path },
      { name: "the flood", svg: flood, keys: { at: [0, 0.15, 0.21, 0.27, 0.29], opacity: [0, 0, 1, 1, 0], y: [22, 22, 0, 0, 6] } },
      { name: "rain", svg: rainStreaks(), keys: showWhile(0.15, 0.17, 0.27, 0.29), loop: { move: "fall", ms: 700 } },
      { name: "a swarm of locusts", svg: swarm, keys: showWhile(0.28, 0.31, 0.41, 0.43), loop: { move: "slide", ms: 2600 } },
      { name: "locusts on the crops", svg: onTheCrops, keys: showWhile(0.28, 0.31, 0.41, 0.43), loop: { move: "bob", ms: 500, y: -0.5 } },
      { name: "lice", svg: lice, keys: showWhile(0.42, 0.45, 0.54, 0.56), loop: { move: "twinkle", ms: 600, low: 0.45 } },
      { name: "frogs", svg: frogs, keys: showWhile(0.55, 0.58, 0.68, 0.7), loop: { move: "bob", ms: 650, y: -1.4 } }
    ],
    words: [
      { text: "Years of drought", from: 0.02, to: 0.13 },
      { text: "The flood", from: 0.15, to: 0.27 },
      { text: "The locusts", from: 0.29, to: 0.41 },
      { text: "The lice", from: 0.43, to: 0.54 },
      { text: "The frogs", from: 0.56, to: 0.68 },
      { text: "The blood", from: 0.7, to: 0.82 },
      { text: "Each time it was lifted, they broke their word", from: 0.84, to: 1 }
    ]
  };
}

// The town by the sea: their fish came to them on their Sabbath day, showing on the surface, and on the days that were
// not their Sabbath, they did not come; thus We tested them, for their disobedience (Quran 7:163). No one is drawn, and
// nothing of what they did or of what befell them: only the town, its boats left on the beach, the sea, its fish, and
// the days of the week going by, the Sabbath gold among them.

/** A fish at the sea's top, its back and fin showing, its middle at (x, y), `k` times its size, facing right (or left). */
const surfacingFish = (x: number, y: number, left = false, k = 1.35) => {
  const d = left ? -1 : 1;
  const p = (dx: number, dy: number) => `${n(x + dx * k * d)} ${n(y + dy * k)}`;
  return (
    `<ellipse cx="${x}" cy="${n(y + 0.6 * k)}" rx="${n(5.6 * k)}" ry="${n(1.2 * k)}" fill="#8FC1E2" opacity="0.7"/>` +
    `<path d="M${p(-3.6, 0.5)} C${p(-2.4, -2.6)} ${p(2.2, -2.8)} ${p(3.8, 0.5)} Z" fill="#A3B6C4"/>` +
    `<path d="M${p(-0.6, -1.9)} L${p(0.6, -3.7)} L${p(1.5, -1.8)} Z" fill="#6E8597"/>` +
    `<path d="M${p(-3.4, 0.3)} L${p(-5.6, -1.7)} L${p(-5.1, 0.7)} Z" fill="#7F96A8"/>` +
    `<circle cx="${n(x + 2.6 * k * d)}" cy="${n(y - 0.6 * k)}" r="${n(0.4 * k)}" fill="#1F2A33"/>`
  );
};

/** A fish leaping from the sea, its middle at (x, y), turned `turn` degrees. */
const leapingFish = (x: number, y: number, turn: number) =>
  `<g transform="translate(${x} ${y}) rotate(${turn}) scale(1.3)"><ellipse cx="0" cy="0" rx="4" ry="1.5" fill="#A3B6C4"/><path d="M-3.6 0 L-6 -1.8 L-5.6 1.8 Z" fill="#7F96A8"/>` +
  `<path d="M-0.6 -1.3 L0.6 -2.8 L1.4 -1.2 Z" fill="#6E8597"/><circle cx="2.8" cy="-0.4" r="0.4" fill="#1F2A33"/></g>`;

/** A small boat drawn up on the beach, its keel's middle at (x, y). */
const beachedBoat = (x: number, y: number) =>
  `<path d="M${n(x - 7)} ${n(y - 3)} L${n(x + 7)} ${n(y - 3)} L${n(x + 5)} ${y} L${n(x - 5)} ${y} Z" fill="#8A5A33"/>` +
  `<path d="M${n(x - 7)} ${n(y - 3)} L${n(x + 7)} ${n(y - 3)}" stroke="#5E3B1B" stroke-width="0.7"/><path d="M${n(x - 3)} ${n(y - 3.6)} L${n(x + 6)} ${n(y - 6.4)}" stroke="#A8865C" stroke-width="0.6"/>`;

function sabbath(): SignArt {
  const scene = sky("#C4E4F6", "#E4F3FB", 62);
  const sun = `${glow(80, 30, 12, "#FFF2C2", 0.1)}<circle cx="80" cy="30" r="5.5" fill="#FFE08A"/>`;
  const land = `<path d="M0 54 C14 52 30 56 50 62 C40 78 24 94 0 104 Z" fill="#D2BF94"/>`;
  const beach = `<path d="M50 62 C40 78 24 94 0 104 L0 112 C28 100 46 82 58 62 Z" fill="#EADBB0"/>`;
  const sea =
    `<path d="M58 62 L160 62 L160 120 L0 120 L0 112 C28 100 46 82 58 62 Z" fill="#4A90C2"/>` +
    `<path d="M58 62 L160 62 L160 68 L55 68 Z" fill="#6FAAD2"/>` +
    `<path d="M0 112 C28 100 46 82 58 62" stroke="#F4F8FB" stroke-width="1" fill="none" opacity="0.8"/>`;
  const waves = curls(78, 22, "#8CC0E2", 0.7, 64) + curls(92, 26, "#8CC0E2", 0.7, 50) + curls(108, 24, "#8CC0E2", 0.7, 30);
  const town = home(10, 72, 12, 10) + home(25, 76, 13, 10) + home(12, 88, 10, 8) + palm(36, 70, 11);
  const boats = beachedBoat(36, 92) + beachedBoat(20, 104);
  // The fish, at the top of the sea in every part of it, and a few leaping.
  const fish = [
    [70, 74, false],
    [90, 80, true],
    [112, 72, false],
    [132, 84, true],
    [150, 74, false],
    [78, 96, true],
    [102, 100, false],
    [126, 106, true],
    [148, 98, false],
    [62, 110, false],
    [92, 114, true]
  ]
    .map(([x, y, left]) => surfacingFish(x as number, y as number, left as boolean))
    .join("");
  const leaping = leapingFish(104, 86, -30) + leapingFish(142, 90, 25);
  // The days of the week, from the first to the Sabbath, the last, ringed in gold: the day it is, lit.
  const dayX = (i: number) => n(100 + i * 8.6);
  const week = Array.from({ length: 7 }, (_, i) => `<circle cx="${dayX(i)}" cy="42" r="2.6" fill="#FFFFFF" opacity="0.35" stroke="${i === 6 ? "#E2B33E" : "#FFFFFF"}" stroke-width="0.7"/>`).join("");
  const today = (i: number) => `${glow(dayX(i), 42, 6, i === 6 ? "#FFE08A" : "#FFFFFF", 0.14)}<circle cx="${dayX(i)}" cy="42" r="2.6" fill="${i === 6 ? "#F2C14E" : "#FFFFFF"}"/>`;
  const DAYS: [number, number][][] = [
    [[0.43, 0.46]],
    [[0.46, 0.49]],
    [[0.49, 0.52]],
    [[0.52, 0.55]],
    [[0.55, 0.58]],
    [
      [0, 0.2],
      [0.58, 0.64]
    ],
    [
      [0.2, 0.42],
      [0.64, 1]
    ]
  ];
  const sabbathFish: SignKeys = { at: [0, 0.2, 0.27, 0.4, 0.43, 0.64, 0.71], opacity: [0, 0, 1, 1, 0, 0, 1] };
  return {
    kind: "sabbath",
    ms: 11000,
    parts: [
      { name: "sky", svg: scene },
      { name: "the sun", svg: sun },
      { name: "the days of the week", svg: week },
      ...DAYS.map((spans, i) => ({ name: i === 6 ? "the Sabbath, the day it is" : `day ${i + 1} of the week, the day it is`, svg: today(i), keys: litDuring(spans) })),
      { name: "the sea", svg: sea },
      { name: "waves", svg: waves, loop: { move: "slide" as const, ms: 8000 } },
      { name: "the land by the sea", svg: land },
      { name: "the beach", svg: beach },
      { name: "the town by the sea", svg: town },
      { name: "their boats on the beach", svg: boats },
      { name: "fish showing on the sea", svg: fish, keys: sabbathFish, loop: { move: "bob" as const, ms: 1300, y: 0.8 } },
      { name: "fish leaping", svg: leaping, keys: sabbathFish, origin: { x: 123, y: 88 }, loop: { move: "bob" as const, ms: 900, y: -2.4, rotate: 4 } }
    ],
    words: [
      { text: "The town by the sea", from: 0.02, to: 0.18 },
      { text: "Their fish came on their Sabbath", from: 0.2, to: 0.4 },
      { text: "On other days, they did not come", from: 0.42, to: 0.62 },
      { text: "Thus We tested them", from: 0.64, to: 1 }
    ]
  };
}

// Dhul-Qarnayn: We established him in the land and gave him the means to all things (Quran 18:84); he followed a way
// until he reached where the sun sets, and found it setting in a murky spring (18:85, 18:86); then he followed a way
// until he reached where the sun rises, and found it rising on a people for whom We had made no shelter from it
// (18:89, 18:90). He is not drawn, and no one of the peoples he found: only the land, the ways he followed, the spring
// in the far west, and the bare land in the far east.
function westEast(): SignArt {
  const starry = stars([
    [12, 12],
    [34, 28],
    [56, 10],
    [78, 32],
    [100, 14],
    [122, 30],
    [146, 10],
    [154, 40],
    [66, 50],
    [110, 52],
    [24, 48]
  ]);
  const land =
    `<rect y="76" width="160" height="44" fill="#D9C192"/><path d="M0 76 L160 76" stroke="#C9AE7E" stroke-width="0.6"/>` +
    `<path d="M40 92 C60 90 80 94 100 91 M70 108 C92 105 116 109 140 106 M14 112 C30 110 44 113 58 111" stroke="#CDB27F" stroke-width="0.8" fill="none"/>` +
    [
      [52, 100],
      [92, 98],
      [118, 114],
      [142, 96],
      [30, 104],
      [74, 116]
    ]
      .map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="1.2" ry="0.6" fill="#BFA57A"/>`)
      .join("");
  const spring =
    `<ellipse cx="18" cy="80.5" rx="28" ry="7" fill="#7A6A48"/><ellipse cx="17" cy="80.5" rx="24" ry="5.4" fill="#4A4532"/>` +
    `<ellipse cx="14" cy="81" rx="14" ry="2.6" fill="#3A3627"/>` +
    `<path d="M40 79 l-1 -4 M42 80 l0.4 -4.6 M44 79.4 l1.4 -3.6 M3 84 l-0.6 -3.6 M6 85 l0.6 -4" stroke="#5E5A3A" stroke-width="0.6"/>`;
  const springStill = `<path d="M4 81.4 q2 -1 4 0 q2 1 4 0 M17 79.6 q2 -1 4 0 q2 1 4 0 M28 81.6 q2 -1 4 0" stroke="#5E5A44" stroke-width="0.6" fill="none" stroke-linecap="round"/>`;
  const sunAt = (x: number, y: number) => `${glow(x, y, 15, "#FFE7A0", 0.12)}<circle cx="${x}" cy="${y}" r="6.5" fill="#FFC93C"/>`;
  // The ways: every way open to him, in all directions; then the way west, to the spring; then the way east.
  const means = [
    [8, 90],
    [24, 82],
    [58, 79],
    [102, 79],
    [136, 82],
    [152, 92],
    [132, 114],
    [28, 114]
  ]
    .map(([x, y]) => `<path d="M80 98 L${x} ${y}" stroke="#FFF6D8" stroke-width="0.9" stroke-dasharray="1.2 2" stroke-linecap="round"/>`)
    .join("");
  const westSteps = Array.from({ length: 9 }, (_, i) => {
    const k = i / 8;
    return { x: n(76 - 42 * k), y: n(97 - 8 * k + 3 * Math.sin(Math.PI * k)), from: at3(0.2 + i * 0.013) };
  });
  const eastSteps = Array.from({ length: 14 }, (_, i) => {
    const k = i / 13;
    return { x: n(36 + 114 * k), y: n(88 + 14 * Math.sin(Math.PI * k) - 2 * k), from: at3(0.6 + i * 0.008) };
  });
  const dash = (x: number, y: number) => `<path d="M${n(x - 1.6)} ${y} L${n(x + 1.6)} ${y}" stroke="#FFF3CF" stroke-width="1.3" stroke-linecap="round"/>`;
  const heat =
    `<path d="M100 86 q2 -1.6 4 0 q2 1.6 4 0 q2 -1.6 4 0 M120 81 q2 -1.6 4 0 q2 1.6 4 0 q2 -1.6 4 0 M136 89 q2 -1.6 4 0 q2 1.6 4 0 q2 -1.6 4 0 ` +
    `M110 96 q2 -1.6 4 0 q2 1.6 4 0 q2 -1.6 4 0 M140 99 q2 -1.6 4 0 q2 1.6 4 0 M124 106 q2 -1.6 4 0 q2 1.6 4 0 q2 -1.6 4 0" stroke="#FFFFFF" stroke-width="1.1" fill="none" opacity="0.9" stroke-linecap="round"/>`;
  return {
    kind: "west-east",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 76) },
      { name: "evening in the west", svg: `${sky("#E8A57A", "#F2C79A", 76)}${glow(20, 74, 50, "#FFB070", 0.08)}`, keys: showWhile(0.38, 0.44, 0.5, 0.54) },
      { name: "night", svg: nightSky(76), keys: showWhile(0.46, 0.52, 0.6, 0.66) },
      { name: "stars", svg: starry, keys: showWhile(0.48, 0.52, 0.6, 0.64), loop: { move: "twinkle", ms: 2200, low: 0.5 } },
      { name: "dawn in the east", svg: `${sky("#F2C6A0", "#F9E3C6", 76)}${glow(140, 76, 50, "#FFE2AE", 0.09)}`, keys: showWhile(0.58, 0.63, 0.67, 0.72) },
      { name: "the heat of the day", svg: `<rect width="160" height="76" fill="#FFE9B0" opacity="0.3"/>`, keys: showFrom(0.78, 0.86) },
      {
        name: "the sun going down in the west",
        svg: sunAt(80, 24),
        keys: { at: [0, 0.2, 0.34, 0.4, 0.5, 0.52], x: [0, 0, -56, -56, -60, -60], y: [0, 0, 40, 40, 60, 60], opacity: [1, 1, 1, 1, 1, 0] }
      },
      { name: "the sun rising in the east", svg: sunAt(140, 52), keys: { at: [0, 0.6, 0.7, 0.78, 0.86], y: [32, 32, 0, 0, -22], opacity: [0, 0, 1, 1, 1] } },
      { name: "the land", svg: land },
      { name: "the murky spring", svg: spring },
      { name: "the spring's still water", svg: springStill, loop: { move: "bob", ms: 2600, x: 0.8 } },
      { name: "the setting sun on the spring", svg: glow(20, 79, 16, "#FF9A5A", 0.12), keys: showWhile(0.38, 0.44, 0.5, 0.56) },
      { name: "the means to all things", svg: `${means}${glow(80, 98, 10, "#FFF6D8", 0.12)}`, keys: showWhile(0.03, 0.1, 0.2, 0.26), loop: { move: "twinkle", ms: 1800, low: 0.6 } },
      ...westSteps.map(({ x, y, from }, i) => ({ name: `the way to where the sun sets, step ${i + 1}`, svg: dash(x, y), keys: showFrom(at3(from - 0.01), from) })),
      ...eastSteps.map(({ x, y, from }, i) => ({ name: `the way to where the sun rises, step ${i + 1}`, svg: dash(x, y), keys: showFrom(at3(from - 0.008), from) })),
      { name: "no shelter from the sun", svg: heat, keys: showFrom(0.8, 0.86), loop: { move: "bob", ms: 1400, y: -1.2 } }
    ],
    words: [
      { text: "We gave him the means to all things", from: 0.02, to: 0.18 },
      { text: "To where the sun sets", from: 0.2, to: 0.38 },
      { text: "Setting in a murky spring", from: 0.4, to: 0.56 },
      { text: "To where the sun rises", from: 0.58, to: 0.76 },
      { text: "No shelter from the sun", from: 0.78, to: 1 }
    ]
  };
}

// Ibrahim and the four birds: my Lord, show me how You give life to the dead; so that my heart may be at rest; take
// four birds and draw them to you; then put a part of them on each hill; then call them, and they will come to you in
// haste; and know that Allah is Almighty, All-Wise (Quran 2:260). Ibrahim is not drawn, and nothing of the birds cut
// apart: they are gone, a light is on every hill, the call goes out, and they come flying back, alive.

/** A bird standing, its feet's middle at (x, y), `k` times its size, facing right (or left). */
const standingBird = (x: number, y: number, body: string, wing: string, left = false, k = 1.6) => {
  const d = left ? -1 : 1;
  const p = (dx: number, dy: number) => `${n(x + dx * k * d)} ${n(y + dy * k)}`;
  return (
    `<path d="M${p(-0.6, 0)} L${p(-0.4, -2.2)} M${p(0.8, 0)} L${p(0.6, -2.2)}" stroke="#C98A3A" stroke-width="${n(0.5 * k)}"/>` +
    `<path d="M${p(-4.4, -3.4)} L${p(-6.6, -5)} L${p(-6, -2.6)} Z" fill="${wing}"/>` +
    `<ellipse cx="${n(x - 0.6 * k * d)}" cy="${n(y - 4 * k)}" rx="${n(4 * k)}" ry="${n(2.4 * k)}" fill="${body}"/>` +
    `<path d="M${p(-3, -4.6)} C${p(-1.6, -5.8)} ${p(1, -5.4)} ${p(1.6, -4)} C${p(0.4, -3.4)} ${p(-1.8, -3.2)} ${p(-3, -4.6)} Z" fill="${wing}"/>` +
    `<circle cx="${n(x + 2.8 * k * d)}" cy="${n(y - 6.2 * k)}" r="${n(1.7 * k)}" fill="${body}"/>` +
    `<path d="M${p(4.3, -6.5)} L${p(5.9, -6)} L${p(4.3, -5.6)} Z" fill="#E0A23C"/>` +
    `<circle cx="${n(x + 3.2 * k * d)}" cy="${n(y - 6.6 * k)}" r="${n(0.35 * k)}" fill="#1F1F1F"/>`
  );
};

/** A bird in flight, its middle at (x, y), `k` times its size, facing right (or left), its wings up. */
const flyingBird = (x: number, y: number, body: string, wing: string, left = false, k = 1.6) => {
  const d = left ? -1 : 1;
  const p = (dx: number, dy: number) => `${n(x + dx * k * d)} ${n(y + dy * k)}`;
  return (
    `<path d="M${p(-1.4, -0.8)} L${p(-4.2, -5.6)} L${p(1, -1)} Z" fill="${wing}" opacity="0.75"/>` +
    `<path d="M${p(-3.4, -0.2)} L${p(-6, -1.6)} L${p(-5.6, 0.8)} Z" fill="${wing}"/>` +
    `<ellipse cx="${x}" cy="${y}" rx="${n(3.8 * k)}" ry="${n(1.6 * k)}" fill="${body}"/>` +
    `<path d="M${p(-0.4, -0.6)} L${p(0.8, -6)} L${p(2.6, -0.8)} Z" fill="${wing}"/>` +
    `<circle cx="${n(x + 3.4 * k * d)}" cy="${n(y - 0.8 * k)}" r="${n(1.4 * k)}" fill="${body}"/>` +
    `<path d="M${p(4.6, -1)} L${p(6, -0.6)} L${p(4.6, -0.2)} Z" fill="#E0A23C"/>` +
    `<circle cx="${n(x + 3.8 * k * d)}" cy="${n(y - 1.1 * k)}" r="${n(0.3 * k)}" fill="#1F1F1F"/>`
  );
};

function fourBirds(): SignArt {
  const tops: [number, number][] = [
    [16, 56],
    [48, 48],
    [80, 54],
    [112, 46],
    [144, 56]
  ];
  const hills = peaks(
    tops.map(([x, y]) => [x, 82 - y, 24] as [number, number, number]),
    82,
    "#A08A6A",
    false
  );
  const valley =
    `<rect y="82" width="160" height="38" fill="#C9D79A"/><path d="M0 82 L160 82" stroke="#B3C27E" stroke-width="0.8"/>` +
    [8, 26, 44, 116, 134, 152, 60, 100].map((x, i) => tuft(x, i < 6 ? (i % 2 ? 92 : 88) : 114, "#8FAE55", 4.5)).join("");
  const ground = `<ellipse cx="80" cy="103" rx="34" ry="6" fill="#BCCB8A"/>`;
  const BIRDS: { x: number; y: number; body: string; wing: string; left: boolean; from: [number, number] }[] = [
    { x: 58, y: 102, body: "#4A8FE0", wing: "#2F6DB8", left: false, from: [16, 44] },
    { x: 72, y: 106, body: "#B07A4A", wing: "#8A5A30", left: false, from: [48, 36] },
    { x: 89, y: 105, body: "#4FA05A", wing: "#357A3E", left: true, from: [112, 34] },
    { x: 103, y: 101, body: "#E6E6E2", wing: "#B8B8B2", left: true, from: [144, 44] }
  ];
  const standing: SignKeys = { at: [0, 0.2, 0.26, 0.38, 0.42, 0.84, 0.86], opacity: [0, 0, 1, 1, 0, 0, 1] };
  const rays =
    `<path d="M77 98 L70 0 L76 0 Z" fill="#FFF6DC" opacity="0.3"/><path d="M80 98 L78 0 L84 0 Z" fill="#FFF6DC" opacity="0.35"/>` +
    `<path d="M83 98 L86 0 L92 0 Z" fill="#FFF6DC" opacity="0.3"/>`;
  const ring = (r: number) => `<ellipse cx="80" cy="98" rx="${r}" ry="${n(r * 0.42)}" stroke="#FFF3CF" stroke-width="1" fill="none"/>`;
  return {
    kind: "four-birds",
    ms: 11000,
    parts: [
      { name: "sky", svg: sky("#CFE8F7", "#E8F4FB", 70) },
      { name: "clouds", svg: cloud(36, 24, 0.9, "#FFFFFF", 0.9) + cloud(124, 18, 1, "#FFFFFF", 0.9), loop: { move: "slide", ms: 12000 } },
      { name: "the hills", svg: hills },
      { name: "the valley", svg: valley },
      { name: "the ground in the middle", svg: ground },
      { name: "light going up to the sky", svg: rays + glow(80, 96, 12, "#FFF6DC", 0.12), keys: showWhile(0.04, 0.1, 0.18, 0.22), loop: { move: "twinkle", ms: 1800, low: 0.6 } },
      ...BIRDS.map((bird, i) => ({
        name: `bird ${i + 1}`,
        svg: standingBird(bird.x, bird.y, bird.body, bird.wing, bird.left),
        keys: standing,
        origin: { x: bird.x, y: bird.y },
        loop: { move: "bob" as const, ms: 1200 + i * 150, rotate: 3, phase: i * 0.25 }
      })),
      ...tops.map(([x, y], i) => ({
        name: `light on hill ${i + 1}`,
        svg: `${glow(x, y + 3, 9, "#FFF3CF", 0.22)}<circle cx="${x}" cy="${y + 3}" r="1.6" fill="#FFF8E0"/>`,
        keys: showWhile(0.42, 0.48, 0.72, 0.76),
        loop: { move: "twinkle" as const, ms: 1500, low: 0.55, phase: i * 0.2 }
      })),
      ...[14, 26, 38].map((r, i) => ({
        name: `the call, ring ${i + 1}`,
        svg: ring(r),
        keys: showWhile(0.56, 0.6, 0.7, 0.72),
        loop: { move: "twinkle" as const, ms: 1200, low: 0.1, phase: i / 3 }
      })),
      // From over the hills down to where they stood, quickly, then standing there again.
      ...BIRDS.map((bird, i) => ({
        name: `bird ${i + 1} coming back`,
        svg: flyingBird(bird.x, bird.y - 6, bird.body, bird.wing, bird.from[0] > bird.x),
        keys: { at: [0, 0.72, 0.74, 0.84, 0.86], x: [n(bird.from[0] - bird.x), n(bird.from[0] - bird.x), n(bird.from[0] - bird.x), 0, 0], y: [n(bird.from[1] - bird.y), n(bird.from[1] - bird.y), n(bird.from[1] - bird.y), 0, 0], opacity: [0, 0, 1, 1, 0] },
        origin: { x: bird.x, y: bird.y - 6 },
        loop: { move: "bob" as const, ms: 420, y: -0.8, rotate: 4 }
      }))
    ],
    words: [
      { text: "Show me how You give life to the dead", from: 0.02, to: 0.18 },
      { text: "Take four birds", from: 0.2, to: 0.36 },
      { text: "Then put a part of them on each hill", from: 0.38, to: 0.54 },
      { text: "Then call them", from: 0.56, to: 0.7 },
      { text: "They will come to you in haste", from: 0.72, to: 1 }
    ]
  };
}

// The town and the hundred years: one who passed by a town fallen down on its roofs, and said: how will Allah give it
// life after its death? So Allah made him die for a hundred years, then raised him. Look at your food and your drink:
// they have not changed; and look at your donkey; look at the bones, how We raise them and clothe them with flesh.
// When it became clear to him, he said: I know that Allah is able to do all things (Quran 2:259). The one who passed
// by is not drawn, nor named: only the town, the years going by, his food and drink, and his donkey.

/**
 * A home fallen down on its roof, its foot's middle at (x, y), `w` wide and `h` high: one wall standing to its full
 * height, the rest broken off low and jagged, the doorway and a window dark, and the roof's beams fallen down
 * across it to the ground among the rubble.
 */
function ruin(x: number, y: number, w: number, h: number) {
  const l = n(x - w / 2);
  const r = n(x + w / 2);
  const top = n(y - h);
  const at = (kx: number, ky: number) => `${n(l + w * kx)} ${n(top + h * ky)}`;
  return (
    `<path d="M${l} ${y} L${l} ${top} L${at(0.2, 0)} L${at(0.2, 0.16)} L${at(0.32, 0.16)} L${at(0.38, 0.34)} L${at(0.5, 0.3)} ` +
    `L${at(0.58, 0.46)} L${at(0.7, 0.42)} L${at(0.78, 0.56)} L${at(0.9, 0.52)} L${r} ${n(top + h * 0.62)} L${r} ${y} Z" fill="#C9A879"/>` +
    `<path d="M${at(0.58, 0.46)} L${at(0.7, 0.42)} L${at(0.78, 0.56)} L${at(0.9, 0.52)} L${r} ${n(top + h * 0.62)} L${r} ${y} L${n(l + w * 0.58)} ${y} Z" fill="#000000" opacity="0.12"/>` +
    `<path d="M${l} ${n(top + h * 0.5)} L${n(l + w * 0.5)} ${n(top + h * 0.5)} M${l} ${n(top + h * 0.74)} L${r} ${n(top + h * 0.74)}" stroke="#B49468" stroke-width="0.5"/>` +
    `<path d="M${n(l + w * 0.12)} ${y} L${n(l + w * 0.12)} ${n(y - h * 0.46)} Q${n(l + w * 0.22)} ${n(y - h * 0.56)} ${n(l + w * 0.32)} ${n(y - h * 0.46)} L${n(l + w * 0.32)} ${y} Z" fill="#5E4630"/>` +
    `<rect x="${n(l + w * 0.6)}" y="${n(top + h * 0.62)}" width="${n(w * 0.14)}" height="${n(h * 0.14)}" fill="#5E4630"/>` +
    `<path d="M${at(0.04, 0.08)} L${n(l + w * 0.86)} ${n(y - 0.6)} M${at(0.3, 0.3)} L${n(r + 2)} ${n(y - 0.4)}" stroke="#7A5A3A" stroke-width="1.3" stroke-linecap="round"/>` +
    `<path d="M${n(l - 2)} ${y} L${n(l + 1)} ${n(y - 2.4)} L${n(l + 4)} ${n(y - 1.2)} L${n(l + 6)} ${y} Z M${n(r - 5)} ${y} L${n(r - 2)} ${n(y - 2.2)} L${n(r + 2)} ${n(y - 1.4)} L${n(r + 4)} ${y} Z" fill="#A58A63"/>`
  );
}

/** The donkey's bones, lying on its side: its skull's middle at (x, y), its spine going right, `s` times their size. */
function lyingBones(x: number, y: number, s: number) {
  const p = (dx: number, dy: number) => `${n(x + dx * s)} ${n(y + dy * s)}`;
  let ribs = "";
  for (let i = 0; i < 6; i += 1) ribs += `<path d="M${p(16 + i * 3.2, -1)} C${p(14 + i * 3.2, -6)} ${p(18 + i * 3.2, -9)} ${p(20 + i * 3.2, -8)}" stroke="#F2EEE4" stroke-width="${n(1.1 * s)}" fill="none" stroke-linecap="round"/>`;
  return (
    `<path d="M${p(-6, 1)} C${p(-6, -3)} ${p(2, -4)} ${p(6, -1.4)} L${p(6, 1.6)} C${p(2, 2.6)} ${p(-4, 3)} ${p(-6, 1)} Z" fill="#F2EEE4"/><circle cx="${n(x + 2.6 * s)}" cy="${n(y - 1 * s)}" r="${n(0.9 * s)}" fill="#8A8070"/>` +
    `<path d="M${p(7, 0)} C${p(20, -2)} ${p(32, -2)} ${p(44, 0)} L${p(52, 3)}" stroke="#F2EEE4" stroke-width="${n(1.6 * s)}" fill="none" stroke-linecap="round"/>` +
    ribs +
    `<path d="M${p(18, 2)} L${p(14, 14)} M${p(22, 2)} L${p(24, 14)} M${p(38, 2)} L${p(34, 14)} M${p(42, 2)} L${p(46, 13)}" stroke="#F2EEE4" stroke-width="${n(1.3 * s)}" stroke-linecap="round"/>` +
    `<path d="M${p(52, 3)} L${p(58, 8)}" stroke="#F2EEE4" stroke-width="${n(0.8 * s)}" stroke-linecap="round"/>`
  );
}

/** The donkey's bones standing up, in the picture card's own units (facing right), set as animalAt sets a card. */
function standingBones(x: number, y: number, s: number, left = false) {
  const bone = (d: string, w: number) => `<path d="${d}" stroke="#F2EEE4" stroke-width="${w}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
  let ribs = "";
  for (let i = 0; i < 6; i += 1) ribs += bone(`M${34 + i * 5} 34 C${32 + i * 5} 40 ${34 + i * 5} 46 ${37 + i * 5} 48`, 2.2);
  const inner =
    bone("M24 34 C40 30 58 30 72 26", 3.2) +
    ribs +
    bone("M72 26 L78 14", 3) +
    `<path d="M76 10 C80 6 90 8 94 14 C95 17 92 19 88 18 L80 18 Z" fill="#F2EEE4"/><circle cx="84" cy="12" r="1.6" fill="#8A8070"/>` +
    bone("M76 10 L74 2 M80 9 L80 1", 2) +
    bone("M30 36 L28 54 L30 70 M36 36 L36 54 L36 70 M62 30 L62 52 L64 70 M68 30 L70 52 L70 70", 2.8) +
    bone("M24 34 C20 40 18 50 18 56", 1.8);
  return `<g transform="translate(${left ? n(x + 100 * s) : x} ${y}) scale(${left ? -s : s} ${s})">${inner}</g>`;
}

/** A basket of fruit and a jug, side by side, their feet on y, the basket's middle at x. */
const foodAndDrink = (x: number, y: number) =>
  `<path d="M${n(x - 5)} ${n(y - 4)} L${n(x + 5)} ${n(y - 4)} L${n(x + 4)} ${y} L${n(x - 4)} ${y} Z" fill="#B98A4E"/>` +
  `<path d="M${n(x - 4.6)} ${n(y - 2.6)} L${n(x + 4.6)} ${n(y - 2.6)} M${n(x - 4.3)} ${n(y - 1.2)} L${n(x + 4.3)} ${n(y - 1.2)}" stroke="#94693A" stroke-width="0.5"/>` +
  [
    [-2.8, -4.8, "#6E3B5E"],
    [0, -5.4, "#7E4A6C"],
    [2.8, -4.8, "#6E3B5E"],
    [-1.4, -6.4, "#8A5A78"],
    [1.4, -6.4, "#6E3B5E"]
  ]
    .map(([dx, dy, fill]) => `<circle cx="${n(x + (dx as number))}" cy="${n(y + (dy as number))}" r="1.4" fill="${fill}"/>`)
    .join("") +
  `<path d="M${n(x + 8)} ${y} C${n(x + 6.6)} ${n(y - 3)} ${n(x + 7.2)} ${n(y - 6)} ${n(x + 8.6)} ${n(y - 7)} L${n(x + 8.6)} ${n(y - 8.6)} L${n(x + 11)} ${n(y - 8.6)} L${n(x + 11)} ${n(y - 7)} C${n(x + 12.4)} ${n(y - 6)} ${n(x + 13)} ${n(y - 3)} ${n(x + 11.6)} ${y} Z" fill="#C0784A"/>` +
  `<path d="M${n(x + 11.4)} ${n(y - 6.6)} C${n(x + 14)} ${n(y - 6)} ${n(x + 13.6)} ${n(y - 3)} ${n(x + 12.2)} ${n(y - 2.6)}" stroke="#A0603A" stroke-width="0.7" fill="none"/>`;

function hundredYears(): SignArt {
  const sunAt = (x: number) => `${glow(x, 22, 13, "#FFE7A0", 0.12)}<circle cx="${x}" cy="22" r="5.6" fill="#FFD25A"/>`;
  const hills = peaks(
    [
      [20, 14, 26],
      [66, 18, 30],
      [118, 12, 26],
      [154, 16, 22]
    ],
    76,
    "#B9A27C",
    false
  );
  const town = ruin(18, 84, 20, 18) + ruin(42, 82, 18, 22) + ruin(66, 85, 22, 16) + ruin(30, 92, 16, 12) + ruin(90, 86, 14, 12);
  const ground =
    `<rect y="76" width="160" height="44" fill="#D6C196"/><path d="M0 76 L160 76" stroke="#C4AC80" stroke-width="0.6"/>` +
    [
      [10, 110],
      [52, 112],
      [100, 116],
      [140, 112],
      [78, 104]
    ]
      .map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="1.5" ry="0.7" fill="#BDA67A"/>`)
      .join("");
  const years =
    [12, 26, 38, 50, 58, 72, 84, 96, 34, 62].map((x, i) => tuft(x, [86, 84, 92, 84, 88, 87, 88, 90, 94, 96][i], "#7FA34E", 5)).join("") +
    [110, 124, 146, 70, 18].map((x, i) => tuft(x, [100, 112, 104, 110, 104][i], "#7FA34E", 4)).join("");
  const tree =
    `<path d="M150 90 L150 76" stroke="#7A5A3A" stroke-width="1.4"/><circle cx="146" cy="74" r="5" fill="#6E9A44"/><circle cx="154" cy="73" r="4.6" fill="#6E9A44"/><circle cx="150" cy="69" r="5.4" fill="#7FAE4E"/>`;
  // The donkey stands by the food, facing it; its foot at y 106.
  const s = 0.42;
  const donkeyTop = n(106 - 73 * s);
  return {
    kind: "hundred-years",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#C8E4F5", "#E6F2FA", 76) },
      { name: "the sun", svg: sunAt(24), keys: { at: [0, 0.18, 0.2, 0.4, 0.42], opacity: [1, 1, 0, 0, 1] } },
      // A hundred years going by: the sun crossing the sky again and again.
      { name: "the sun, day after day", svg: sunAt(-8), keys: showWhile(0.18, 0.2, 0.4, 0.42), loop: { move: "slide", ms: 600, period: 176 } },
      { name: "far hills", svg: hills },
      { name: "the ground", svg: ground },
      { name: "the town fallen on its roofs", svg: town },
      { name: "grass of a hundred years", svg: years, keys: showFrom(0.22, 0.36), origin: { x: 60, y: 92 }, loop: { move: "sway", ms: 2600, angle: 1.2 } },
      { name: "a tree grown in a hundred years", svg: tree, keys: { at: [0, 0.2, 0.38], opacity: [0, 0, 1], scale: [0.2, 0.2, 1] }, origin: { x: 150, y: 90 } },
      { name: "his food and drink", svg: foodAndDrink(96, 106) },
      { name: "his food and drink, unchanged", svg: glow(100, 101, 13, "#FFF4C8", 0.13), keys: showWhile(0.44, 0.48, 0.58, 0.62), loop: { move: "twinkle", ms: 1600, low: 0.6 } },
      { name: "the donkey", svg: animalAt("donkey", 112, donkeyTop, s, true), keys: { at: [0, 0.24, 0.32, 0.7, 0.78], opacity: [1, 1, 0, 0, 1] }, origin: { x: 132, y: 106 }, loop: { move: "bob", ms: 2600, rotate: 1 } },
      { name: "the donkey's bones", svg: lyingBones(116, 104, 0.6), keys: { at: [0, 0.26, 0.34, 0.6, 0.64], opacity: [0, 0, 1, 1, 0] } },
      { name: "the bones raised", svg: standingBones(112, donkeyTop, s, true), keys: { at: [0, 0.6, 0.64, 0.72, 0.78], opacity: [0, 0, 1, 1, 0] } },
      { name: "Allah is able to do all things", svg: glow(96, 80, 46, "#FFF6DC", 0.06), keys: showFrom(0.84, 0.9), loop: { move: "twinkle", ms: 2600, low: 0.75 } }
    ],
    words: [
      { text: "A town fallen on its roofs", from: 0.02, to: 0.16 },
      { text: "Allah made him die for a hundred years", from: 0.18, to: 0.42 },
      { text: "Your food and drink, unchanged", from: 0.44, to: 0.58 },
      { text: "We raise the bones, then clothe them with flesh", from: 0.6, to: 0.82 },
      { text: "Allah is able to do all things", from: 0.84, to: 1 }
    ]
  };
}

// Yusuf's shirt: go with this shirt of mine and cast it over my father's face; he will see again (Quran 12:93); when
// the caravan left Egypt, their father said: I find the scent of Yusuf (12:94); when the bearer of good news came, he
// cast it over his face, and he could see again (12:96). No one is drawn: only Egypt, the road to Canaan, the caravan's
// camels, the shirt, its scent, and the home where the light comes back.

/** A long shirt, its collar's middle at (x, y), `s` times its size (16 long). */
const longShirt = (x: number, y: number, s: number) => {
  const p = (dx: number, dy: number) => `${n(x + dx * s)} ${n(y + dy * s)}`;
  return (
    `<path d="M${p(-3, 0)} L${p(-7, 2.4)} L${p(-8.6, 6.4)} L${p(-5.8, 7.2)} L${p(-4.4, 4.6)} L${p(-4.6, 16)} L${p(4.6, 16)} L${p(4.4, 4.6)} L${p(5.8, 7.2)} L${p(8.6, 6.4)} L${p(7, 2.4)} L${p(3, 0)} Q${p(0, 1.8)} ${p(-3, 0)} Z" fill="#F4EEDC" stroke="#D8CBA6" stroke-width="${n(0.5 * s)}"/>` +
    `<path d="M${p(0, 1.3)} L${p(0, 5)}" stroke="#D8CBA6" stroke-width="${n(0.5 * s)}"/>`
  );
};

function shirt(): SignArt {
  let columns = "";
  for (let x = 4; x < 34; x += 6.4) columns += `<rect x="${n(x)}" y="56" width="2.2" height="16" fill="#D3BD8C"/><rect x="${n(x - 0.5)}" y="55.2" width="3.2" height="1.2" fill="#C2A976"/>`;
  const egypt =
    `<rect x="0" y="52" width="38" height="22" fill="#E8D7AE"/><rect x="-2" y="49" width="42" height="3.4" fill="#CDB47F"/>${columns}` +
    `<rect x="14" y="64" width="8" height="10" fill="#6E5A3A"/>` +
    palm(44, 76, 13) +
    palm(52, 77, 10);
  const canaan =
    peaks(
      [
        [102, 12, 22],
        [130, 20, 26],
        [158, 16, 22]
      ],
      76,
      "#8FAF6A",
      false
    ) + `<path d="M96 76 C112 70 134 66 160 68 L160 76 Z" fill="#A6C07A"/>`;
  const homeThere = home(138, 80, 18, 12, "#D8C49A", "#BCA474", "#5E4630");
  const olive = `<path d="M152 82 L152 72" stroke="#7A5A3A" stroke-width="1.2"/><circle cx="149" cy="70" r="3.8" fill="#7F9A5A"/><circle cx="155" cy="69" r="3.4" fill="#8AA664"/><circle cx="152" cy="66" r="3.6" fill="#94AE6C"/>`;
  const land = `<rect y="74" width="160" height="46" fill="#D9C99A"/><path d="M92 74 C110 76 130 75 160 74 L160 120 L104 120 C100 104 96 88 92 74 Z" fill="#B9CB8C"/>`;
  const road = `<path d="M0 100 C30 98 60 102 90 98 C110 95 124 90 136 82 L141 82 C130 92 114 100 92 104 C60 108 30 105 0 108 Z" fill="#E8D7AE"/>`;
  const camelS = 0.24;
  const camelTop = (foot: number) => n(foot - 73 * camelS);
  // The caravan: waiting in Egypt; leaving; on its way, halfway; and come to the home.
  const going = { at: [0, 0.18, 0.32, 0.58, 0.72], x: [0, 0, 36, 36, 84] };
  const bundle = `${glow(46, 82, 6, "#FFF4C8", 0.16)}<rect x="43.6" y="80" width="5" height="3.2" rx="1" fill="#F4EEDC" stroke="#D8CBA6" stroke-width="0.4"/>`;
  const wisp = (x: number, y: number, width: number, opacity: number) =>
    `<path d="M${x} ${y} c3 -2.2 6 2.2 9 0 c3 -2.2 6 2.2 9 0 c3 -2.2 6 2.2 9 0" stroke="#F2BE4E" stroke-width="${width}" fill="none" stroke-linecap="round" opacity="${opacity}"/>`;
  const scent = glow(76, 80, 12, "#FFF0C0", 0.1) + wisp(62, 84, 1.3, 0.95) + wisp(68, 78, 1.1, 0.85) + wisp(58, 72, 1, 0.75);
  const windowLight = `${glow(141.3, 72.7, 9, "#FFE29A", 0.14)}<rect x="140" y="70.4" width="2.6" height="2.6" fill="#FFE29A"/>`;
  return {
    kind: "shirt",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#CFE6F5", "#EAF4FA", 74) },
      { name: "clouds", svg: cloud(70, 26, 0.9, "#FFFFFF", 0.9) + cloud(118, 16, 0.8, "#FFFFFF", 0.85), loop: { move: "slide", ms: 12000 } },
      { name: "the hills of Canaan", svg: canaan },
      { name: "Egypt, its palace and palms", svg: egypt },
      { name: "the land", svg: land },
      { name: "the road to Canaan", svg: road },
      { name: "the home in Canaan", svg: homeThere + olive },
      { name: "the shirt", svg: longShirt(26, 78, 0.9), keys: { at: [0, 0.02, 0.08, 0.18, 0.22], opacity: [0, 0, 1, 1, 0] } },
      { name: "light of the shirt", svg: glow(26, 85, 14, "#FFF4C8", 0.12), keys: showWhile(0.02, 0.08, 0.18, 0.22), loop: { move: "twinkle", ms: 1600, low: 0.6 } },
      { name: "camel of the caravan, behind", svg: animalAt("camel", 6, camelTop(100), camelS), keys: going, origin: { x: 18, y: 100 }, loop: { move: "bob", ms: 900, y: -0.6 } },
      { name: "camel of the caravan, in front", svg: animalAt("camel", 30, camelTop(101), camelS), keys: going, origin: { x: 42, y: 101 }, loop: { move: "bob", ms: 900, y: -0.6, phase: 0.5 } },
      { name: "the shirt carried with the caravan", svg: bundle, keys: { at: [0, 0.18, 0.22, 0.32, 0.58, 0.72], opacity: [0, 0, 1, 1, 1, 1], x: [0, 0, 4.5, 36, 36, 84] } },
      { name: "the scent of the shirt", svg: scent, keys: { at: [0, 0.38, 0.42, 0.52], opacity: [0, 0, 1, 1], x: [0, 0, 6, 52] }, loop: { move: "bob", ms: 1400, y: -1.4 } },
      { name: "the scent come to the home", svg: glow(136, 76, 10, "#FFF0C0", 0.1), keys: showFrom(0.48, 0.54), loop: { move: "twinkle", ms: 1800, low: 0.6 } },
      { name: "good news at the home", svg: glow(132, 84, 8, "#FFF4C8", 0.16), keys: showFrom(0.68, 0.73), loop: { move: "twinkle", ms: 1400, low: 0.6 } },
      { name: "light come back in the home", svg: windowLight, keys: showFrom(0.8, 0.86), loop: { move: "twinkle", ms: 2000, low: 0.8 } },
      { name: "sight come back", svg: glow(138, 74, 24, "#FFF6DC", 0.07), keys: showFrom(0.82, 0.9), loop: { move: "twinkle", ms: 2400, low: 0.7 } }
    ],
    words: [
      { text: "Take this shirt of mine", from: 0.02, to: 0.16 },
      { text: "When the caravan left Egypt", from: 0.18, to: 0.36 },
      { text: "I find the scent of Yusuf", from: 0.38, to: 0.56 },
      { text: "The bearer of good news came", from: 0.58, to: 0.76 },
      { text: "He could see again", from: 0.78, to: 1 }
    ]
  };
}

export const POWER_ART = { overturned, "five-signs": fiveSigns, sabbath, "west-east": westEast, "four-birds": fourBirds, "hundred-years": hundredYears, shirt };
