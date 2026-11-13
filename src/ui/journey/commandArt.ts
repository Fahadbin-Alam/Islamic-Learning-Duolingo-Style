import { ANIMAL_ART } from "../lesson/animalArt";
import { kabah } from "./historyArt";
import { GUSTS, animalAt, cloud, glow, n, nightSky, palm, peaks, sky, stars, tuft, type SignArt, type SignKeys } from "./signDraw";
import { at3, showFrom } from "./storyArt";
import { crescent } from "./trialArt";

/**
 * Allah's commands, and the stories told with them, drawn as the other stories are (storyArt.ts, trialArt.ts): the
 * measure and the balance, taken in full and given short, then given in full and weighed straight; Ibrahim's dream,
 * and the great sacrifice his son was ransomed with; the qiblah turned from Jerusalem to the Ka'bah; the two gardens
 * of Saba, the flood of the dam, and the bitter fruit after it; and the cow Bani Isra'il were told to sacrifice. Only
 * the land, the sky, water, plants, animals and things are drawn. No Prophet, no person and no angel is ever drawn:
 * things move by themselves.
 */

/** Keys that show a part from `from` to `to`, then hide it from `hide` to `gone`. */
const showWhile = (from: number, to: number, hide: number, gone: number): SignKeys => ({ at: [0, from, to, hide, gone], opacity: [0, 0, 1, 1, 0] });
/** Keys that show a part from the start, then hide it from `from` to `gone`. */
const hideFrom = (from: number, gone: number): SignKeys => ({ at: [0, from, gone], opacity: [1, 1, 0] });

/** A keyed value at `t` of the story: straight between its times, held before the first and after the last. */
function valueAt(at: number[], values: number[], t: number) {
  if (t <= at[0]) return values[0];
  for (let i = 1; i < at.length; i += 1) if (t <= at[i]) return values[i - 1] + ((values[i] - values[i - 1]) * (t - at[i - 1])) / (at[i] - at[i - 1]);
  return values[values.length - 1];
}

/** Keys that move a part as `move` moves another part, and show it as `show` says: both, at every time of either. */
function together(move: SignKeys, show: { at: number[]; opacity: number[] }): SignKeys {
  const at = [...new Set([...move.at, ...show.at])].sort((a, b) => a - b);
  const keys: SignKeys = { at, opacity: at.map((t) => at3(valueAt(show.at, show.opacity, t))) };
  for (const key of ["x", "y", "rotate", "scale", "scaleX", "scaleY"] as const) {
    const values = move[key];
    if (values) keys[key] = at.map((t) => n(valueAt(move.at, values, t)));
  }
  return keys;
}

/** A card's animal drawn again with its colors changed (`colors`: from, to), its box's corner at (x, y), `s` its size. */
function recolored(kind: "cow" | "sheep", colors: [string, string][], x: number, y: number, s: number, left = false, drop: RegExp[] = []) {
  let inner = ANIMAL_ART[kind]().body.replace(/^<svg[^>]*>/, "").replace(/<\/svg>$/, "");
  for (const pattern of drop) inner = inner.replace(pattern, "");
  for (const [from, to] of colors) inner = inner.split(from).join(to);
  return `<g transform="translate(${left ? n(x + 100 * s) : x} ${y}) scale(${left ? -s : s} ${s})">${inner}</g>`;
}

/** A small bird on the ground, pecking: its feet's middle at (x, y), facing left (or right). */
const groundBird = (x: number, y: number, body: string, right = false) => {
  const d = right ? -1 : 1;
  const p = (dx: number, dy: number) => `${n(x + dx * d)} ${n(y + dy)}`;
  return (
    `<path d="M${p(-0.6, 0)} L${p(-1.2, -2)} M${p(0.8, 0)} L${p(0.4, -2)}" stroke="#7A5A3A" stroke-width="0.4"/>` +
    `<path d="M${p(-3.2, -3.4)} C${p(-3, -5.8)} ${p(2.4, -6)} ${p(3.6, -3.8)} L${p(5.6, -3)} L${p(3, -2.2)} C${p(1, -1.6)} ${p(-2, -1.8)} ${p(-3.2, -3.4)} Z" fill="${body}"/>` +
    `<circle cx="${n(x - 3.4 * d)}" cy="${n(y - 4.8)}" r="1.5" fill="${body}"/><path d="M${p(-4.8, -4.9)} L${p(-6, -4.5)} L${p(-4.8, -4.3)} Z" fill="#E0A23C"/>` +
    `<circle cx="${n(x - 3.8 * d)}" cy="${n(y - 5.1)}" r="0.3" fill="#2B2B2B"/>`
  );
};

/** A tree of the gardens, its foot at (x, y), `s` times its size: a trunk and a round, leafy crown. */
const fruitTree = (x: number, y: number, s: number) =>
  `<path d="M${n(x - 1 * s)} ${y} L${n(x - 0.7 * s)} ${n(y - 8 * s)} L${n(x + 0.7 * s)} ${n(y - 8 * s)} L${n(x + 1 * s)} ${y} Z" fill="#8A5A33"/>` +
  `<circle cx="${n(x - 3.8 * s)}" cy="${n(y - 10 * s)}" r="${n(4.4 * s)}" fill="#3F8A34"/><circle cx="${n(x + 3.8 * s)}" cy="${n(y - 10 * s)}" r="${n(4.4 * s)}" fill="#3F8A34"/>` +
  `<circle cx="${x}" cy="${n(y - 13 * s)}" r="${n(6 * s)}" fill="#4F9A3C"/><circle cx="${n(x - 1.6 * s)}" cy="${n(y - 14.6 * s)}" r="${n(2.6 * s)}" fill="#64B04B"/>`;

/** Ripe fruit on a garden tree whose foot is at (x, y), `s` times its size. */
const fruitOn = (x: number, y: number, s: number) =>
  [
    [-4.4, -9.6, "#E5533D"],
    [3.6, -8.8, "#F29A2E"],
    [-1.4, -12.2, "#F29A2E"],
    [2.4, -14.8, "#E5533D"],
    [5.2, -12.4, "#E5533D"],
    [-5, -13, "#F29A2E"]
  ]
    .map(([dx, dy, fill]) => `<circle cx="${n(x + (dx as number) * s)}" cy="${n(y + (dy as number) * s)}" r="${n(1.05 * s)}" fill="${fill}"/>`)
    .join("");

// The measure and the balance: woe to those who give less, who take in full when they take a measure from people,
// and give less when they measure or weigh for them (Quran 83:1 to 83:3); give full measure, and weigh with a straight
// balance (26:181, 26:182, 17:35). No one is drawn: the measure scoops and pours by itself, and the sacks fill.
function measure(): SignArt {
  const scene = sky("#CDE5F2", "#E4EEF1", 50);
  const town =
    [
      [8, 18, 12],
      [24, 14, 16],
      [42, 20, 10],
      [118, 16, 14],
      [136, 20, 11],
      [152, 14, 15]
    ]
      .map(([x, w, h]) => `<rect x="${n(x - w / 2)}" y="${n(64 - h)}" width="${w}" height="${h}" fill="#E8D6B4"/><rect x="${n(x - w / 2 - 0.6)}" y="${n(64 - h - 1.2)}" width="${n(w + 1.2)}" height="1.3" fill="#D9C29C"/><rect x="${n(x - 1.2)}" y="${n(64 - h + 3)}" width="2.4" height="2.6" fill="#B79A72"/>`)
      .join("") + `<path d="M58 64 L58 52 Q64 46 70 52 L70 64 Z M90 64 L90 50 Q96 44 102 50 L102 64 Z" fill="#E1CBA4"/>`;
  const street =
    `<rect y="64" width="160" height="56" fill="#DEC596"/><rect y="98" width="160" height="22" fill="#D4B886"/>` +
    `<ellipse cx="30" cy="106" rx="3" ry="1.1" fill="#C4A673"/><ellipse cx="88" cy="104" rx="2.4" ry="0.9" fill="#C4A673"/><ellipse cx="118" cy="108" rx="3.2" ry="1.1" fill="#C4A673"/>`;
  const sun = `${glow(22, 24, 13, "#FFF0C0", 0.12)}<circle cx="22" cy="24" r="5.5" fill="#FFD25A"/>`;
  const clouds = cloud(26, 30, 0.85, "#A7B0BA") + cloud(134, 28, 0.95, "#AEB6C0") + cloud(60, 22, 0.6, "#B7BEC7");
  const poles = `<rect x="25" y="34" width="2" height="66" fill="#8A6340"/><rect x="133" y="34" width="2" height="66" fill="#8A6340"/>`;
  let stripes = "";
  for (let i = 0; i < 16; i += 1) stripes += `<rect x="${n(22 + i * 7.25)}" y="33" width="7.25" height="9" fill="${i % 2 ? "#F2E3C6" : "#C8553D"}"/>`;
  const awning = `${stripes}<rect x="22" y="33" width="116" height="1.4" fill="#000000" opacity="0.12"/><rect x="22" y="40.6" width="116" height="1.4" fill="#000000" opacity="0.1"/>`;
  let scallops = "";
  for (let i = 0; i < 16; i += 1) scallops += `<path d="M${n(22 + i * 7.25)} 42 A3.6 3.2 0 0 0 ${n(29.25 + i * 7.25)} 42 Z" fill="${i % 2 ? "#E8D5B0" : "#B24A35"}"/>`;
  const counter =
    `<rect x="36" y="72.6" width="88" height="21.4" fill="#9A6537"/>` +
    [47, 58, 69, 80, 91, 102, 113].map((x) => `<path d="M${x} 73 L${x} 94" stroke="#86552C" stroke-width="0.6"/>`).join("") +
    `<rect x="36" y="72.6" width="88" height="2" fill="#000000" opacity="0.16"/><rect x="34" y="70" width="92" height="2.8" rx="0.6" fill="#B07A47"/>`;
  const stand = `<rect x="51.5" y="68" width="9" height="2" rx="0.6" fill="#8C6A3A"/><rect x="55.2" y="46" width="1.6" height="22.4" fill="#A47C46"/><circle cx="56" cy="45" r="1.6" fill="#C9A055"/>`;
  const beam = `<rect x="40" y="45.4" width="32" height="1.3" rx="0.6" fill="#B98E4E"/><circle cx="40.6" cy="46" r="0.9" fill="#8C6A3A"/><circle cx="71.4" cy="46" r="0.9" fill="#8C6A3A"/>`;
  const pan = (x: number) => `<path d="M${n(x)} 46.6 L${n(x - 5.6)} 61 M${n(x)} 46.6 L${n(x + 5.6)} 61" stroke="#6E5532" stroke-width="0.4"/><path d="M${n(x - 6.6)} 61 Q${n(x)} 66.4 ${n(x + 6.6)} 61 Z" fill="#C9A055"/><path d="M${n(x - 6.6)} 61 L${n(x + 6.6)} 61" stroke="#A88438" stroke-width="0.6"/>`;
  const weight = `<path d="M38.4 61 L38.8 57.8 Q40.6 56.6 42.4 57.8 L42.8 61 Z" fill="#8F8F94"/><circle cx="40.6" cy="57" r="0.8" fill="#77777C"/>`;
  const panGrain = `<ellipse cx="71.4" cy="60.6" rx="4" ry="1.3" fill="#E8BE55"/>`;
  const moreGrain = `<ellipse cx="71.4" cy="59.6" rx="2.8" ry="1.3" fill="#E8BE55"/><circle cx="70.4" cy="59.4" r="0.35" fill="#C99A36"/><circle cx="72.4" cy="59.8" r="0.35" fill="#C99A36"/>`;
  const dropping = `<g fill="#E8BE55"><circle cx="71" cy="50" r="0.55"/><circle cx="72" cy="52.6" r="0.55"/><circle cx="71.3" cy="55" r="0.55"/></g>`;
  let speckles = "";
  for (const [x, y] of [
    [94, 59],
    [97, 55],
    [100, 52.6],
    [103, 56],
    [106, 59],
    [99, 58.4],
    [92.6, 60.4],
    [107.6, 60.4]
  ])
    speckles += `<circle cx="${x}" cy="${y}" r="0.45" fill="#C99A36"/>`;
  const basket =
    `<path d="M88 70 L90 61 L110 61 L112 70 Z" fill="#B98B4E"/><path d="M89 64 L111 64 M88.6 67 L111.4 67" stroke="#9C6F3A" stroke-width="0.6"/>` +
    `<path d="M90.4 61 Q100 49 109.6 61 Z" fill="#E8BE55"/>${speckles}<ellipse cx="100" cy="61" rx="10.2" ry="1.4" fill="none" stroke="#9C6F3A" stroke-width="0.9"/>`;
  const sack = (x: number) =>
    `<path d="M${n(x - 8)} 104 C${n(x - 10)} 96 ${n(x - 9)} 86 ${n(x - 7)} 81 L${n(x + 7)} 81 C${n(x + 9)} 86 ${n(x + 10)} 96 ${n(x + 8)} 104 Z" fill="#C9A46E"/>` +
    `<path d="M${n(x + 2)} 81 C${n(x + 5)} 88 ${n(x + 6)} 96 ${n(x + 4)} 104 L${n(x + 8)} 104 C${n(x + 10)} 96 ${n(x + 9)} 86 ${n(x + 7)} 81 Z" fill="#000000" opacity="0.12"/>` +
    `<path d="M${n(x - 7)} 92 L${n(x + 7)} 92 M${n(x - 7.6)} 98 L${n(x + 7.6)} 98" stroke="#B08A55" stroke-width="0.5"/>` +
    `<ellipse cx="${x}" cy="81" rx="7.6" ry="1.9" fill="#B8915A"/><ellipse cx="${x}" cy="81" rx="6.2" ry="1.3" fill="#6B4F2E"/>`;
  const heaped = (x: number) => `<path d="M${n(x - 6.4)} 81 Q${x} 73.6 ${n(x + 6.4)} 81 Z" fill="#E8BE55"/><circle cx="${n(x - 2)}" cy="79" r="0.45" fill="#C99A36"/><circle cx="${n(x + 2.4)}" cy="79.6" r="0.45" fill="#C99A36"/>`;
  const stream = (x: number, dots: number) => {
    let svg = "";
    for (let y = 66; y < 90; y += 24 / dots) svg += `<circle cx="${n(x + ((y * 7) % 3) * 0.4 - 0.4)}" cy="${n(y)}" r="0.6" fill="#E8BE55"/>`;
    return svg;
  };
  const bowl =
    `<path d="M114.6 62 L115.6 70 L122.4 70 L123.4 62 Z" fill="#8B5A2B"/><path d="M119.8 62 L119.8 70 L122.4 70 L123.4 62 Z" fill="#000000" opacity="0.15"/>` +
    `<path d="M114.9 64 L123.1 64 M115.4 68 L122.6 68" stroke="#5E3A17" stroke-width="0.8"/><ellipse cx="119" cy="62" rx="4.4" ry="1.2" fill="#4A2E12" stroke="#A97440" stroke-width="0.6"/>`;
  const bowlHeaped = `<path d="M114.9 62 Q119 55.8 123.1 62 Z" fill="#E8BE55"/><circle cx="118" cy="60" r="0.4" fill="#C99A36"/><circle cx="120.2" cy="60.6" r="0.4" fill="#C99A36"/>`;
  const bowlShort = `<ellipse cx="119" cy="62.5" rx="3" ry="0.55" fill="#C99A36"/>`;
  const bowlFull = `<ellipse cx="119" cy="62" rx="4.1" ry="1" fill="#E8BE55"/><circle cx="118" cy="61.9" r="0.35" fill="#C99A36"/><circle cx="120.4" cy="62.1" r="0.35" fill="#C99A36"/>`;
  // The measure's trips: scooped from the heap, carried to their own sack and poured; scooped short and poured into the
  // other sack; then scooped full and poured into the other sack; and back to its place. Each trip is made within its
  // words, and the measure stands upright, still, as each line ends (a story question waits and stops there).
  const trip: SignKeys = {
    at: [0, 0.22, 0.245, 0.265, 0.29, 0.315, 0.33, 0.362, 0.375, 0.44, 0.47, 0.485, 0.505, 0.52, 0.533, 0.56, 0.572, 0.64, 0.665, 0.68, 0.7, 0.715, 0.728, 0.758, 0.77, 0.84, 0.87],
    x: [0, 0, -19, -19, -60, -105, -105, -105, -105, -105, -19, -19, 0, 27, 27, 27, 27, 27, -19, -19, 0, 27, 27, 27, 27, 27, 0],
    y: [0, 0, -12, -12, -24, -2, -2, -2, -2, -2, -12, -12, -24, -2, -2, -2, -2, -2, -12, -12, -24, -2, -2, -2, -2, -2, 0],
    rotate: [0, 0, 0, 0, 0, 0, -115, -115, 0, 0, 0, 0, 0, 0, 115, 115, 0, 0, 0, 0, 0, 0, 115, 115, 0, 0, 0]
  };
  const balance = { at: [0, 0.86, 0.9, 0.93, 0.96] };
  const rightPan: SignKeys = { ...balance, y: [-2.5, -2.5, 0.7, -0.3, 0] };
  const pecking = (phase: number) => ({ move: "bob" as const, ms: 1300, rotate: 14, phase });
  return {
    kind: "measure",
    ms: 12000,
    parts: [
      { name: "sky", svg: scene },
      { name: "the sun", svg: sun },
      { name: "clouds over the market", svg: clouds, keys: hideFrom(0.62, 0.7), loop: { move: "bob", ms: 6000, x: 1.6 } },
      { name: "town behind the market", svg: town },
      { name: "the market street", svg: street },
      { name: "poles of the stall", svg: poles },
      { name: "awning of the stall", svg: awning },
      { name: "fringe of the awning", svg: scallops, loop: { move: "bob", ms: 1700, y: 0.45 } },
      { name: "the counter", svg: counter },
      { name: "stand of the balance", svg: stand },
      { name: "beam of the balance", svg: beam, origin: { x: 56, y: 46 }, keys: { ...balance, rotate: [-9, -9, 2.5, -1, 0] } },
      { name: "pan with the weight", svg: pan(40.6) + weight, keys: { ...balance, y: [2.5, 2.5, -0.7, 0.3, 0] } },
      { name: "pan with the grain", svg: pan(71.4) + panGrain, keys: rightPan },
      { name: "grain dropping onto the pan", svg: dropping, keys: showWhile(0.84, 0.85, 0.87, 0.88), loop: { move: "drip", ms: 600, distance: 5 } },
      { name: "a little more grain on the pan", svg: moreGrain, keys: together(rightPan, { at: [0, 0.85, 0.87], opacity: [0, 0, 1] }) },
      { name: "heap of grain", svg: basket },
      { name: "their own sack", svg: sack(12), origin: { x: 12, y: 104 }, keys: { at: [0, 0.332, 0.362], scaleY: [0.62, 0.62, 1] } },
      { name: "grain heaped in their own sack", svg: heaped(12), keys: showFrom(0.356, 0.366) },
      { name: "the other sack", svg: sack(146), origin: { x: 146, y: 104 }, keys: { at: [0, 0.535, 0.555, 0.73, 0.755], scaleY: [0.62, 0.62, 0.7, 0.7, 1] } },
      { name: "grain heaped in the other sack", svg: heaped(146), keys: showFrom(0.75, 0.76) },
      { name: "grain poured into their own sack", svg: stream(10.4, 8), clip: { x: 6, y: 66, w: 9, h: 24 }, keys: showWhile(0.326, 0.332, 0.358, 0.364), loop: { move: "fall", ms: 500, period: 24 } },
      { name: "grain poured short into the other sack", svg: stream(149.6, 3), clip: { x: 145, y: 66, w: 9, h: 24 }, keys: showWhile(0.529, 0.535, 0.553, 0.559), loop: { move: "fall", ms: 500, period: 24 } },
      { name: "grain poured in full into the other sack", svg: stream(149.6, 8), clip: { x: 145, y: 66, w: 9, h: 24 }, keys: showWhile(0.724, 0.73, 0.752, 0.758), loop: { move: "fall", ms: 500, period: 24 } },
      { name: "the measure", svg: bowl, origin: { x: 119, y: 66 }, keys: trip },
      { name: "measure heaped", svg: bowlHeaped, origin: { x: 119, y: 66 }, keys: together(trip, { at: [0, 0.245, 0.255, 0.33, 0.345], opacity: [0, 0, 1, 1, 0] }) },
      { name: "measure short", svg: bowlShort, origin: { x: 119, y: 66 }, keys: together(trip, { at: [0, 0.47, 0.48, 0.535, 0.55], opacity: [0, 0, 1, 1, 0] }) },
      { name: "measure full", svg: bowlFull, origin: { x: 119, y: 66 }, keys: together(trip, { at: [0, 0.665, 0.675, 0.73, 0.745], opacity: [0, 0, 1, 1, 0] }) },
      { name: "sparrow pecking, left", svg: groundBird(30, 104, "#A97C58"), origin: { x: 30, y: 104 }, loop: pecking(0) },
      { name: "sparrow pecking, right", svg: groundBird(126, 105, "#9A7050", true), origin: { x: 126, y: 105 }, loop: pecking(0.45) },
      { name: "dim over the market", svg: `<rect width="160" height="120" fill="#2B2B3A" opacity="0.13"/>`, keys: hideFrom(0.62, 0.7) },
      { name: "light of the straight balance", svg: glow(56, 56, 22, "#FFF4D0", 0.08), keys: showFrom(0.9, 0.96), loop: { move: "twinkle", ms: 2400, low: 0.6 } }
    ],
    words: [
      { text: "Woe to those who give less", from: 0.02, to: 0.2 },
      { text: "When they take, they take in full", from: 0.22, to: 0.42 },
      { text: "When they give, they give less", from: 0.44, to: 0.62 },
      { text: "Give full measure", from: 0.64, to: 0.82 },
      { text: "Weigh with a straight balance", from: 0.84, to: 1 }
    ]
  };
}

/** The great ram: the sheep of the picture cards, white, with curled horns, facing left, its box's corner at (x, y). */
function ramAt(x: number, y: number, s: number) {
  const inner = ANIMAL_ART.sheep().body.replace(/^<svg[^>]*>/, "").replace(/<\/svg>$/, "");
  const curl = "M70 27 C68.6 16.6 55.4 14 52.6 23 C50.6 29.8 56.4 36 61.8 33 C65.2 31 64.2 26.2 60.6 26.8";
  const horn =
    `<path d="${curl}" stroke="#9C8758" stroke-width="6" fill="none" stroke-linecap="round"/><path d="${curl}" stroke="#E6D7B0" stroke-width="4.2" fill="none" stroke-linecap="round"/>` +
    `<path d="M67 20.4 L64.6 23 M61.4 17.4 L60.8 20.8 M55.8 19.4 L57.8 22.2 M53 25.8 L56.4 25.4 M55.2 31.6 L57.8 29.4" stroke="#B9A57A" stroke-width="1"/>`;
  return `<g transform="translate(${n(x + 100 * s)} ${y}) scale(${-s} ${s})">${inner}${horn}</g>`;
}

/** A small sparkle of four points at (x, y), `r` from its middle to a point. */
const sparkle = (x: number, y: number, r: number, fill = "#FFF6D8") =>
  `<path d="M${x} ${n(y - r)} L${n(x + r * 0.28)} ${n(y - r * 0.28)} L${n(x + r)} ${y} L${n(x + r * 0.28)} ${n(y + r * 0.28)} L${x} ${n(y + r)} L${n(x - r * 0.28)} ${n(y + r * 0.28)} L${n(x - r)} ${y} L${n(x - r * 0.28)} ${n(y - r * 0.28)} Z" fill="${fill}"/>`;

// Ibrahim's dream: I saw in a dream; do what you are commanded; when they had both submitted; O Ibrahim, you have
// fulfilled the dream; this was the clear test; and We ransomed him with a great sacrifice (Quran 37:102 to 37:107).
// Ibrahim and his son are not drawn, nor anything of the sacrifice: only the night and their tent, the dawn, the way
// up the hill, the light on it, and the great ram there.
function ram(): SignArt {
  const night = nightSky(80);
  const dawn = sky("#F2C6A0", "#F9E3C6", 62) + glow(26, 70, 46, "#FFE2AE", 0.09);
  const day = sky("#BFE3FA", "#E2F2FB", 62);
  const starry = stars([
    [10, 16],
    [30, 28],
    [52, 14],
    [76, 34],
    [98, 20],
    [118, 36],
    [146, 14],
    [154, 38],
    [6, 44],
    [66, 48],
    [104, 46],
    [134, 50]
  ]);
  const moon = `${glow(134, 22, 10, "#F4F1DE", 0.06)}${crescent(134, 22, 5, 2.4, "#F4F1DE")}`;
  const sun = `${glow(26, 40, 16, "#FFE7A0", 0.12)}<circle cx="26" cy="40" r="6.5" fill="#FFD25A"/>`;
  const hills = peaks(
    [
      [10, 30, 26],
      [46, 38, 28],
      [88, 30, 26],
      [126, 36, 26],
      [158, 28, 22]
    ],
    80,
    "#A0805F",
    false
  );
  const valley =
    `<rect y="80" width="160" height="40" fill="#D8BD8C"/><path d="M0 80 L160 80" stroke="#C4A574" stroke-width="0.8"/>` +
    `<ellipse cx="14" cy="106" rx="3" ry="1.1" fill="#C3A473"/><ellipse cx="64" cy="108" rx="2.6" ry="1" fill="#C3A473"/><ellipse cx="84" cy="90" rx="2.2" ry="0.8" fill="#C3A473"/>`;
  const hill =
    `<path d="M70 120 C80 104 92 86 104 78 C112 72 126 70 136 72 C146 74 154 80 160 84 L160 120 Z" fill="#B48F66"/>` +
    `<path d="M136 72 C146 74 154 80 160 84 L160 120 L132 120 C140 104 141 88 136 72 Z" fill="#000000" opacity="0.1"/>` +
    `<ellipse cx="96" cy="100" rx="3" ry="1.2" fill="#9E7C55"/><ellipse cx="146" cy="96" rx="2.6" ry="1" fill="#9E7C55"/>`;
  const tent =
    `<path d="M30 86 L18 100 M50 86 L62 100" stroke="#7B6655" stroke-width="0.6"/>` +
    `<path d="M24 100 L30 86 L40 81 L50 86 L56 100 Z" fill="#4D3D33"/><path d="M27 93 L53 93" stroke="#5E4B3F" stroke-width="1"/>` +
    `<path d="M37 100 L40 89 L43 100 Z" fill="#241A15"/>`;
  const lamp = `${glow(40, 96, 10, "#FFD27A", 0.14)}<circle cx="40" cy="97" r="0.9" fill="#FFE29A"/>`;
  const dreamLight = glow(40, 72, 20, "#FFE9A8", 0.1) + sparkle(30, 70, 2) + sparkle(50, 64, 2.4) + sparkle(40, 56, 1.8) + sparkle(46, 76, 1.4);
  const way = `<path d="M58 99 C74 98 86 94 96 88 C104 83 110 78 118 74" stroke="#FFF3CF" stroke-width="1.4" stroke-dasharray="2 2.4" fill="none" stroke-linecap="round"/>`;
  const rays =
    `<path d="M100 0 L108 0 L121 70 Z" fill="#FFF6DC" opacity="0.22"/><path d="M116 0 L126 0 L121 70 Z" fill="#FFF6DC" opacity="0.26"/>` +
    `<path d="M134 0 L142 0 L121 70 Z" fill="#FFF6DC" opacity="0.22"/>`;
  const birds = [
    [20, 30],
    [27, 26],
    [70, 40],
    [112, 30]
  ]
    .map(([x, y]) => `<path d="M${x} ${y} q1.8 -1.5 3.6 0 q1.8 -1.5 3.6 0" stroke="#5A5A5A" stroke-width="0.6" fill="none" stroke-linecap="round"/>`)
    .join("");
  const grass = [6, 22, 62, 86, 108, 128, 150].map((x, i) => tuft(x, i % 2 ? 108 : 104, "#9BAA5C", 4.5)).join("");
  return {
    kind: "ram",
    ms: 12000,
    parts: [
      { name: "night sky", svg: night },
      { name: "dawn", svg: dawn, keys: showFrom(0.2, 0.3) },
      { name: "morning", svg: day, keys: showFrom(0.42, 0.52) },
      { name: "stars", svg: starry, keys: hideFrom(0.2, 0.28), loop: { move: "twinkle", ms: 2400, low: 0.5 } },
      { name: "the moon", svg: moon, keys: hideFrom(0.2, 0.28) },
      { name: "the sun rising", svg: sun, keys: { at: [0, 0.2, 0.26, 0.56], opacity: [0, 0, 1, 1], y: [34, 34, 24, 0] } },
      { name: "birds of the morning", svg: birds, keys: showFrom(0.46, 0.52), loop: { move: "slide", ms: 11000 } },
      { name: "far hills", svg: hills },
      { name: "the valley", svg: valley },
      { name: "the hill", svg: hill },
      { name: "their tent", svg: tent },
      { name: "grass", svg: grass, loop: { move: "sway", ms: 2600, angle: 1.5 } },
      { name: "night over the land", svg: `<rect y="40" width="160" height="80" fill="#0F1C3A" opacity="0.5"/>`, keys: hideFrom(0.2, 0.32) },
      { name: "lamp in the tent", svg: lamp, keys: hideFrom(0.22, 0.3), loop: { move: "twinkle", ms: 900, low: 0.6 } },
      { name: "the dream", svg: dreamLight, keys: showWhile(0.04, 0.1, 0.2, 0.24), loop: { move: "twinkle", ms: 1600, low: 0.5 } },
      { name: "the way up the hill", svg: way, keys: showWhile(0.24, 0.32, 0.42, 0.48) },
      { name: "light on the hilltop", svg: glow(121, 70, 22, "#FFF4D6", 0.09), keys: showFrom(0.44, 0.52), loop: { move: "twinkle", ms: 2600, low: 0.75 } },
      { name: "light from the sky", svg: rays, keys: { at: [0, 0.58, 0.64, 0.78, 0.86], opacity: [0, 0, 1, 1, 0.45] }, loop: { move: "twinkle", ms: 2000, low: 0.7 } },
      { name: "the great ram", svg: ramAt(101, n(72 - 73 * 0.4), 0.4), keys: showFrom(0.78, 0.84), origin: { x: 121, y: 71 }, loop: { move: "bob", ms: 2400, rotate: 1.2 } },
      { name: "light of the great sacrifice", svg: glow(121, 58, 24, "#FFFFFF", 0.08), keys: showFrom(0.8, 0.86), loop: { move: "twinkle", ms: 2200, low: 0.6 } }
    ],
    words: [
      { text: "I saw in a dream", from: 0.02, to: 0.2 },
      { text: "Do what you are commanded", from: 0.22, to: 0.4 },
      { text: "When they had both submitted", from: 0.42, to: 0.56 },
      { text: "O Ibrahim, you have fulfilled the dream", from: 0.58, to: 0.76 },
      { text: "We ransomed him with a great sacrifice", from: 0.78, to: 1 }
    ]
  };
}

/** The arrow of the qiblah, pointing left, its middle at (x, y), `k` times its size (32 long). */
const arrowAt = (x: number, y: number, k: number) => {
  const p = (dx: number, dy: number) => `${n(x + dx * k)} ${n(y + dy * k)}`;
  return `<path d="M${p(-16, 0)} L${p(-8, -5.6)} L${p(-8, -1.7)} L${p(16, -1.7)} L${p(16, 1.7)} L${p(-8, 1.7)} L${p(-8, 5.6)} Z" fill="#F2C14E" stroke="#B8862B" stroke-width="${n(0.7 * Math.max(k, 0.6))}" stroke-linejoin="round"/>`;
};

/** A small tent of goat hair, its foot's middle at (x, y). */
const smallTent = (x: number, y: number) =>
  `<path d="M${n(x - 7)} ${y} L${n(x - 4)} ${n(y - 7)} L${x} ${n(y - 9)} L${n(x + 4)} ${n(y - 7)} L${n(x + 7)} ${y} Z" fill="#5A473B"/><path d="M${n(x - 1.2)} ${y} L${x} ${n(y - 5)} L${n(x + 1.2)} ${y} Z" fill="#2A201B"/>`;

// The qiblah: in Madinah, he ﷺ prayed facing Jerusalem for sixteen or seventeen months (Sahih al-Bukhari 40); We see
// your face turning to the sky; turn your face toward al-Masjid al-Haram; and wherever you are, turn your faces toward
// it (Quran 2:144); to Allah belong the east and the west (2:142). Jerusalem is north of Madinah, on the left, and
// Makkah is south, on the right, so the qiblah turned right round. No one is drawn: only the land, the masjid in
// Madinah as it was built (walls of mud brick, a roof of palm leaves on palm trunks), and the arrows of the qiblah.
function qiblah(): SignArt {
  const scene = sky("#BFE3FA", "#E0F1FB", 62);
  const north = peaks(
    [
      [14, 18, 22],
      [40, 13, 20]
    ],
    70,
    "#B9A88C",
    false
  );
  const south = peaks(
    [
      [122, 18, 18],
      [154, 24, 22]
    ],
    72,
    "#A78B69",
    false
  );
  const land = `<rect y="70" width="160" height="50" fill="#E2CB9C"/><rect y="98" width="160" height="22" fill="#D9BF8C"/><path d="M0 70 L160 70" stroke="#CDB283" stroke-width="0.7"/>`;
  // Jerusalem far away: stone houses, and al-Masjid al-Aqsa as a house of prayer of stone with arched doors (no dome:
  // none stood there then).
  const jerusalem =
    `<rect x="9" y="62" width="7" height="7" fill="#E6DCC4"/><rect x="31" y="61" width="7" height="8" fill="#E6DCC4"/>` +
    `<rect x="16" y="58" width="15" height="11" fill="#EDE6D3" stroke="#9C8E73" stroke-width="0.5"/><rect x="15.4" y="57.4" width="16.2" height="1.4" fill="#B9AC8E"/>` +
    [19, 23.5, 28].map((x) => `<path d="M${n(x - 1.3)} 69 L${n(x - 1.3)} 65.6 A1.3 1.3 0 0 1 ${n(x + 1.3)} 65.6 L${n(x + 1.3)} 69 Z" fill="#7C6E56"/>`).join("");
  const makkah = `<ellipse cx="137.5" cy="72.4" rx="9" ry="1.8" fill="#F6F0E2"/>${kabah(133, 72, 8)}`;
  const masjid =
    `<rect x="56" y="80.4" width="48" height="10" fill="#7E6447"/>` +
    [60, 68, 76, 84, 92, 100].map((x) => `<rect x="${n(x - 0.8)}" y="80.4" width="1.6" height="10" fill="#A9895C"/>`).join("") +
    `<rect x="56" y="90" width="48" height="6" fill="#D8B98A"/><path d="M56 90 L104 90" stroke="#B89A6C" stroke-width="0.6"/><rect x="77.6" y="90" width="4.8" height="6" fill="#6E5638"/>` +
    `<path d="M53.6 81 L106.4 81 L104.6 77 L55.4 77 Z" fill="#6E8F3A"/><path d="M57 79 L61 77.6 M63 79.4 L67 77.8 M69 79 L73 77.6 M75 79.4 L79 77.8 M81 79 L85 77.6 M87 79.4 L91 77.8 M93 79 L97 77.6 M99 79.4 L103 77.8" stroke="#56742B" stroke-width="0.6"/>`;
  const palms = palm(46, 97, 20) + palm(36, 99, 14) + palm(114, 97, 18) + palm(124, 99, 13);
  const toJerusalem = `<path d="M56 89 C46 86 38 78 30 70" stroke="#F2C14E" stroke-width="1.3" stroke-dasharray="1.8 2" fill="none" stroke-linecap="round"/>`;
  const toKabah = `<path d="M104 89 C116 86 126 79 136 72" stroke="#F2C14E" stroke-width="1.3" stroke-dasharray="1.8 2" fill="none" stroke-linecap="round"/>`;
  const rays =
    `<path d="M66 8 L72 8 L80 76 Z" fill="#FFF6DC" opacity="0.3"/><path d="M77 8 L83 8 L80 76 Z" fill="#FFF6DC" opacity="0.34"/><path d="M88 8 L94 8 L80 76 Z" fill="#FFF6DC" opacity="0.3"/>`;
  // The others: a tent in the desert, Jerusalem's own houses, and a house on the way to Makkah, each shown in its turn,
  // at "wherever you are", facing Jerusalem as all had, and turning toward the Ka'bah.
  const others = [
    { name: "a tent in the desert", x: 14, y: 104, place: smallTent(14, 104), arrow: [14, 90], from: 0.76 },
    { name: "Jerusalem's houses", x: 24, y: 50, place: "", arrow: [24, 50], from: 0.8 },
    { name: "a house on the way to Makkah", x: 110, y: 71, place: `<rect x="106.5" y="65.6" width="7" height="5.6" fill="#D9B98A"/><rect x="106" y="64.8" width="8" height="1.2" fill="#B99A6A"/><rect x="109.2" y="68" width="1.8" height="3.2" fill="#6E5638"/>`, arrow: [110, 58], from: 0.84 }
  ];
  const turn = (from: number) => ({ at: [0, at3(from - 0.03), from, at3(from + 0.05), at3(from + 0.07)], opacity: [0, 0, 1, 1, 1], rotate: [0, 0, 0, 186, 180] });
  return {
    kind: "qiblah",
    ms: 12000,
    parts: [
      { name: "sky", svg: scene },
      { name: "hills to the north", svg: north },
      { name: "hills of Makkah to the south", svg: south },
      { name: "the land", svg: land },
      { name: "Jerusalem, far to the north", svg: jerusalem },
      { name: "the Ka'bah, far to the south", svg: makkah },
      { name: "the Ka'bah lit", svg: glow(137, 66, 16, "#FFF1C4", 0.12), keys: showFrom(0.54, 0.62), loop: { move: "twinkle", ms: 2400, low: 0.6 } },
      { name: "the way toward Jerusalem", svg: toJerusalem, keys: showWhile(0.04, 0.1, 0.46, 0.5) },
      { name: "the way toward the Ka'bah", svg: toKabah, keys: showFrom(0.54, 0.6) },
      { name: "palms of Madinah", svg: palms, origin: { x: 80, y: 98 }, loop: { move: "sway", ms: 3400, angle: 0.6 } },
      ...others.filter((other) => other.place).map((other) => ({ name: other.name, svg: other.place })),
      { name: "the masjid in Madinah", svg: masjid },
      { name: "light from the sky", svg: rays, keys: showWhile(0.24, 0.3, 0.44, 0.5), loop: { move: "twinkle", ms: 1300, low: 0.45 } },
      { name: "the arrow of the qiblah", svg: arrowAt(80, 60, 1), origin: { x: 80, y: 60 }, keys: { at: [0, 0.04, 0.1, 0.48, 0.53, 0.56, 0.58], opacity: [0, 0, 1, 1, 1, 1, 1], rotate: [0, 0, 0, 0, 150, 186, 180] } },
      ...others.map((other) => ({ name: `the qiblah of ${other.name}`, svg: arrowAt(other.arrow[0], other.arrow[1], 0.36), origin: { x: other.arrow[0], y: other.arrow[1] }, keys: turn(other.from) }))
    ],
    words: [
      { text: "Facing Jerusalem at first", from: 0.02, to: 0.22 },
      { text: "Your face turning to the sky", from: 0.24, to: 0.44 },
      { text: "Turn toward al-Masjid al-Haram", from: 0.46, to: 0.7 },
      { text: "Wherever you are, turn to it", from: 0.72, to: 1 }
    ]
  };
}

/** A tall house of Saba, of mud brick and stone, its foot's middle at (x, y): its windows framed in white. */
export function towerHouse(x: number, y: number, w: number, h: number) {
  const l = n(x - w / 2);
  let windows = "";
  for (let yy = y - h + 3; yy < y - 4; yy += 5) windows += `<rect x="${n(x - 1.4)}" y="${n(yy)}" width="2.8" height="2.6" fill="#5A3E28" stroke="#FFFFFF" stroke-width="0.5"/>`;
  return `<rect x="${l}" y="${n(y - h)}" width="${w}" height="${h}" fill="#C79A6A"/><rect x="${n(x + w * 0.15)}" y="${n(y - h)}" width="${n(w * 0.35)}" height="${h}" fill="#000000" opacity="0.1"/><rect x="${n(l - 0.6)}" y="${n(y - h - 1.4)}" width="${n(w + 1.2)}" height="1.6" fill="#F2EEE6"/>${windows}`;
}

/** A bush of bitter fruit, its foot at (x, y): thorny, dark, with small dark berries. */
const bitterBush = (x: number, y: number) =>
  `<path d="M${n(x - 5)} ${y} C${n(x - 6)} ${n(y - 5)} ${n(x - 2)} ${n(y - 8)} ${x} ${n(y - 7)} C${n(x + 3)} ${n(y - 9)} ${n(x + 6)} ${n(y - 5)} ${n(x + 5)} ${y} Z" fill="#4F6B3A"/>` +
  `<path d="M${n(x - 4)} ${n(y - 5)} l-1.4 -1 M${n(x + 4)} ${n(y - 5)} l1.4 -1 M${x} ${n(y - 7)} l0 -1.6" stroke="#4F6B3A" stroke-width="0.5"/>` +
  `<circle cx="${n(x - 2)}" cy="${n(y - 4)}" r="0.7" fill="#5A2E3A"/><circle cx="${n(x + 2.2)}" cy="${n(y - 5)}" r="0.7" fill="#5A2E3A"/><circle cx="${n(x + 0.4)}" cy="${n(y - 2.4)}" r="0.7" fill="#5A2E3A"/>`;

/** A tamarisk, its foot at (x, y): thin stems and grey-green, feathery fronds. */
const tamarisk = (x: number, y: number) =>
  `<path d="M${x} ${y} L${n(x - 0.6)} ${n(y - 9)} M${x} ${n(y - 4)} L${n(x + 3)} ${n(y - 10)} M${x} ${n(y - 4)} L${n(x - 3.6)} ${n(y - 9)}" stroke="#7A6450" stroke-width="0.7"/>` +
  `<ellipse cx="${n(x - 0.6)}" cy="${n(y - 12)}" rx="2.2" ry="4.4" fill="#8FA58A"/><ellipse cx="${n(x + 3.4)}" cy="${n(y - 12)}" rx="1.8" ry="3.8" fill="#9DB297"/><ellipse cx="${n(x - 4)}" cy="${n(y - 11)}" rx="1.8" ry="3.6" fill="#86A081"/>`;

/** A small lote tree, its foot at (x, y): a short trunk, small round leaves and a few yellow fruits. */
const loteTree = (x: number, y: number) =>
  `<path d="M${x} ${y} L${x} ${n(y - 6)}" stroke="#7A5434" stroke-width="1.2"/><ellipse cx="${x}" cy="${n(y - 9)}" rx="5" ry="3.8" fill="#6E8F3A"/>` +
  `<circle cx="${n(x - 2)}" cy="${n(y - 8.6)}" r="0.7" fill="#D9A93A"/><circle cx="${n(x + 2.2)}" cy="${n(y - 9.8)}" r="0.7" fill="#D9A93A"/>`;

// Saba: a sign in their land, two gardens on the right and the left; eat from your Lord's provision and be grateful
// to Him (Quran 34:15); they turned away, so the flood of the dam was sent on them, and their two gardens were changed
// for gardens of bitter fruit, tamarisk and a few lote trees (34:16); and they were scattered far and wide (34:19). No
// one is drawn: only the valley, the dam and its lake, the gardens, their tall houses, and their camels going away.
function saba(): SignArt {
  const scene = sky("#BFE3FA", "#E2F2FB", 58);
  const left = peaks(
    [
      [18, 40, 30],
      [56, 34, 22]
    ],
    76,
    "#A98B6A",
    false
  );
  const right = peaks(
    [
      [104, 34, 22],
      [142, 42, 30]
    ],
    76,
    "#A98B6A",
    false
  );
  const lake = `<path d="M62.6 48 L97.4 48 L96.6 52.4 L63.4 52.4 Z" fill="#7FB6E0"/><path d="M66 50 L72 50 M78 49.4 L86 49.4 M90 50.6 L95 50.6" stroke="#B9DDF5" stroke-width="0.6"/>`;
  const sides = `<path d="M62.6 52 L70 52 L74 74 L68.4 61 Z M90 52 L97.4 52 L91.6 61 L86 74 Z" fill="#9C8B74"/>`;
  let blocks = "";
  for (let y = 55; y < 74; y += 4) blocks += `<path d="M${n(63 + (y - 52) * 0.6)} ${y} L${n(97 - (y - 52) * 0.6)} ${y}" stroke="#86765F" stroke-width="0.5"/>`;
  const middle = `<path d="M70 52 L90 52 L86 74 L74 74 Z" fill="#A89880"/>${blocks}`;
  const cracks = `<path d="M80 52.4 L78.6 56 L81 59 L79 63 L80.6 67 M75 58 L77.6 60 M85 62 L82.4 64" stroke="#3E342A" stroke-width="0.6" fill="none"/>`;
  const valley =
    `<rect y="74" width="160" height="46" fill="#B9D88C"/><path d="M0 74 L160 74" stroke="#9FC273" stroke-width="0.8"/>` +
    `<path d="M76 74 C76 88 70 104 66 120 L94 120 C90 104 84 88 84 74 Z" fill="#C9B184"/>`;
  const streams =
    `<path d="M80 74 C79 90 76 104 74 120" stroke="#7FB6E0" stroke-width="1.6" fill="none"/><path d="M79 82 C66 84 50 86 30 90 M81 82 C94 84 110 86 130 90" stroke="#7FB6E0" stroke-width="0.9" fill="none"/>`;
  const gardenTrees = (side: "left" | "right") => {
    const rows = side === "left" ? [[10, 26, 42, 58].map((x) => [x, 86, 0.8]), [4, 20, 36, 52].map((x) => [x, 100, 1])] : [[102, 118, 134, 150].map((x) => [x, 86, 0.8]), [108, 124, 140, 156].map((x) => [x, 100, 1])];
    return rows.flat() as [number, number, number][];
  };
  const trees = (side: "left" | "right") => gardenTrees(side).map(([x, y, s]) => fruitTree(x, y, s)).join("");
  const fruit = (side: "left" | "right") => gardenTrees(side).map(([x, y, s]) => fruitOn(x, y, s)).join("");
  const houses = towerHouse(12, 76, 8, 18) + towerHouse(24, 76, 9, 14) + towerHouse(136, 76, 9, 15) + towerHouse(148, 76, 8, 19);
  const burst = `<path d="M70.6 51 L89.4 51 L86.4 74 L73.6 74 Z" fill="#5E93C4"/><path d="M74 55 C77 57 83 57 86 55 M75 62 C78 64 82 64 85 62 M75.6 69 C78 71 82 71 84.4 69" stroke="#D8ECF8" stroke-width="1" fill="none" stroke-linecap="round"/>`;
  const flood =
    `<path d="M-24 70 C10 69 52 70 74 70 L86 70 C108 70 150 69 184 70 L184 118 C150 138 10 138 -24 118 Z" fill="#5E93C4" opacity="0.95"/>` +
    `<path d="M62 76 C72 79 88 79 98 76 M24 86 C50 91 110 91 136 86 M4 100 C40 105 120 105 156 100 M30 112 C60 115 100 115 130 112" stroke="#D8ECF8" stroke-width="1.1" fill="none" stroke-linecap="round"/>`;
  const after = `<rect y="74" width="160" height="46" fill="#C8B58A"/><path d="M76 74 C76 88 70 104 66 120 L94 120 C90 104 84 88 84 74 Z" fill="#B9A275"/><path d="M0 74 L160 74" stroke="#B5A278" stroke-width="0.8"/>`;
  const bitter =
    [6, 30, 54].map((x, i) => bitterBush(x, i % 2 ? 98 : 102)).join("") +
    [110, 134, 156].map((x, i) => bitterBush(x, i % 2 ? 100 : 96)).join("") +
    tamarisk(18, 88) +
    tamarisk(44, 92) +
    tamarisk(122, 88) +
    tamarisk(146, 90) +
    loteTree(62, 88) +
    loteTree(100, 90);
  const leaving = { move: "bob" as const, ms: 640, y: 0.5 };
  // The two gardens grow up out of the valley, right and left, and are gone under the flood.
  const growing: SignKeys = { at: [0, 0.03, 0.13, 0.5, 0.52], opacity: [0, 0, 1, 1, 0], scaleY: [0.2, 0.2, 1, 1, 1] };
  return {
    kind: "saba",
    ms: 12000,
    parts: [
      { name: "sky", svg: scene },
      { name: "mountains on the left", svg: left },
      { name: "mountains on the right", svg: right },
      { name: "the lake behind the dam", svg: lake, keys: hideFrom(0.44, 0.5), loop: { move: "bob", ms: 2600, x: 0.4 } },
      { name: "the dam's sides", svg: sides },
      { name: "the dam", svg: middle, keys: { at: [0, 0.44, 0.47], opacity: [1, 1, 0], y: [0, 0, 6] } },
      { name: "the dam cracking", svg: cracks, keys: showWhile(0.38, 0.42, 0.44, 0.46) },
      { name: "the valley", svg: valley },
      { name: "streams to the gardens", svg: streams, keys: hideFrom(0.44, 0.5) },
      { name: "their tall houses", svg: houses, keys: { at: [0, 0.82, 0.92], opacity: [1, 1, 0.3] } },
      { name: "the garden on the left", svg: trees("left"), keys: growing, origin: { x: 30, y: 100 }, loop: { move: "sway", ms: 3000, angle: 0.8 } },
      { name: "the garden on the right", svg: trees("right"), keys: growing, origin: { x: 130, y: 100 }, loop: { move: "sway", ms: 3000, angle: 0.8, phase: 0.4 } },
      { name: "fruit of the garden on the left", svg: fruit("left"), keys: showWhile(0.2, 0.26, 0.5, 0.52) },
      { name: "fruit of the garden on the right", svg: fruit("right"), keys: showWhile(0.22, 0.28, 0.5, 0.52) },
      { name: "plenty", svg: glow(80, 92, 60, "#FFF4C8", 0.05), keys: showWhile(0.24, 0.3, 0.36, 0.4), loop: { move: "twinkle", ms: 2400, low: 0.6 } },
      { name: "the land after the flood", svg: after, keys: showFrom(0.5, 0.52) },
      { name: "bitter fruit, tamarisk and a few lote trees", svg: bitter, keys: showFrom(0.58, 0.66) },
      { name: "the flood bursting through", svg: burst, keys: { at: [0, 0.44, 0.45, 0.56, 0.62], opacity: [0, 0, 1, 1, 0] }, loop: { move: "bob", ms: 700, y: 0.5 } },
      { name: "the flood of the dam", svg: flood, origin: { x: 80, y: 70 }, keys: { at: [0, 0.45, 0.46, 0.52, 0.56, 0.62], opacity: [0, 0, 1, 1, 1, 0], scale: [0.1, 0.1, 0.16, 1, 1, 1] }, loop: { move: "bob", ms: 900, y: 0.6 } },
      { name: "camel going away, left", svg: animalAt("camel", 52, n(104 - 73 * 0.16), 0.16, true), keys: { at: [0, 0.78, 0.8, 0.98, 1], opacity: [0, 0, 1, 1, 0.6], x: [0, 0, 0, -50, -52] }, loop: leaving },
      { name: "camel going away, right", svg: animalAt("camel", 92, n(106 - 73 * 0.16), 0.16), keys: { at: [0, 0.8, 0.82, 0.98, 1], opacity: [0, 0, 1, 1, 0.6], x: [0, 0, 0, 52, 54] }, loop: { ...leaving, phase: 0.5 } },
      { name: "dust on the wind", svg: GUSTS, keys: showWhile(0.8, 0.86, 0.96, 1), loop: { move: "slide", ms: 3600 } }
    ],
    words: [
      { text: "Two gardens, right and left", from: 0.02, to: 0.18 },
      { text: "Eat, and be grateful to Him", from: 0.2, to: 0.36 },
      { text: "The flood of the dam", from: 0.38, to: 0.56 },
      { text: "Bitter fruit and tamarisk", from: 0.58, to: 0.76 },
      { text: "Scattered far and wide", from: 0.78, to: 1 }
    ]
  };
}

const SPOTS = [/<path d="M30 30 C36 29[^>]*\/>/, /<path d="M48 38 C54 36[^>]*\/>/, /<path d="M58 29 C62 29[^>]*\/>/];
const HORNS = [/<path d="M66 20 L64 14[^>]*\/>/, /<path d="M76 19 L79 13[^>]*\/>/];
/** The cows of the pasture, as the cow of the picture cards in their own colors. */
const COWS = {
  yellow: [
    ["#F6F3EB", "#F4C531"],
    ["#E2DED4", "#D9A824"],
    ["#3A3A3A", "#C9921A"],
    ["#F2B6B0", "#EDB58A"],
    ["#B9706A", "#A86A44"]
  ],
  old: [
    ["#F6F3EB", "#BCB1A5"],
    ["#E2DED4", "#A0958A"],
    ["#3A3A3A", "#857A70"],
    ["#F2B6B0", "#D9B4AC"]
  ],
  calf: [
    ["#F6F3EB", "#E3B07A"],
    ["#E2DED4", "#C99560"],
    ["#3A3A3A", "#FFFFFF"]
  ],
  brown: [
    ["#F6F3EB", "#9A6238"],
    ["#E2DED4", "#7E4F2C"],
    ["#3A3A3A", "#5E3A20"],
    ["#F2B6B0", "#D9A08A"]
  ]
} satisfies Record<string, [string, string][]>;
const cowAt = (colors: [string, string][], x: number, foot: number, s: number, left = false, drop: RegExp[] = []) => recolored("cow", colors, x, n(foot - 73 * s), s, left, drop);

// The cow: Allah commands you to sacrifice a cow (Quran 2:67); neither old nor young, but in between (2:68); yellow,
// bright in color, pleasing to those who see it (2:69); not trained to plough the earth or water the crops, sound,
// with no blemish on it (2:71). No one is drawn, and nothing of the sacrifice: only the pasture, the cows (the old one
// and the calf walk off, then the ones that are not yellow, as the yellow cow comes), and the plough and water wheel
// standing idle.
function cow(): SignArt {
  const scene = sky("#BFE3FA", "#E2F2FB", 52);
  const clouds = cloud(30, 28, 0.8, "#FFFFFF", 0.95) + cloud(122, 22, 1, "#FFFFFF", 0.95);
  const hills = `<path d="M0 56 C30 46 60 50 90 47 C120 44 140 50 160 47 L160 70 L0 70 Z" fill="#9CC27A"/><path d="M0 62 C40 56 80 60 120 56 C140 54 150 57 160 56 L160 72 L0 72 Z" fill="#8DB86C"/>`;
  const field =
    `<path d="M0 60 L66 58 L70 72 L0 74 Z" fill="#B98E5E"/>` +
    [62.4, 65.2, 68, 70.8].map((y) => `<path d="M0 ${y} L${n(66.6 + (y - 60) * 0.3)} ${n(y - 2)}" stroke="#9E7448" stroke-width="0.6"/>`).join("");
  // An ard plough, its share in the furrow and its handle up, and the yoke left lying by it: nothing pulls it.
  const plough =
    `<path d="M10 62 L44 68.6" stroke="#7A5434" stroke-width="1.8" stroke-linecap="round"/><path d="M42 68.2 L51 72 L45 67 Z" fill="#8E8E92"/>` +
    `<path d="M44.6 68.4 L38 57.4" stroke="#7A5434" stroke-width="1.4" stroke-linecap="round"/><path d="M36.4 57 L39.6 57.8" stroke="#7A5434" stroke-width="1.4" stroke-linecap="round"/>` +
    `<path d="M4 72 L26 72" stroke="#8A6340" stroke-width="2" stroke-linecap="round"/><path d="M8 72 C8 75.6 12 75.6 12 72 M18 72 C18 75.6 22 75.6 22 72" stroke="#8A6340" stroke-width="0.9" fill="none"/>`;
  // A water wheel with its pots, by its channel, standing still: nothing turns it.
  const wheel = (() => {
    let spokes = "";
    let pots = "";
    for (let i = 0; i < 8; i += 1) {
      const a = (Math.PI * 2 * i) / 8 + Math.PI / 8;
      spokes += `<path d="M136 56 L${n(136 + 12 * Math.cos(a))} ${n(56 + 12 * Math.sin(a))}" stroke="#7A5434" stroke-width="0.9"/>`;
      pots += `<ellipse cx="${n(136 + 13 * Math.cos(a))}" cy="${n(56 + 13 * Math.sin(a))}" rx="1.6" ry="1.2" fill="#B8643A"/>`;
    }
    return (
      `<path d="M118 74 L154 74 L151 69.4 L121 69.4 Z" fill="#7FB6E0"/><path d="M124 71.6 L130 71.6 M138 71.2 L146 71.2" stroke="#B9DDF5" stroke-width="0.6"/>` +
      `<path d="M126 72 L136 54 L146 72" stroke="#6E4A2A" stroke-width="1.6" fill="none"/>${spokes}` +
      `<circle cx="136" cy="56" r="12" fill="none" stroke="#8A6340" stroke-width="1.5"/>${pots}<circle cx="136" cy="56" r="1.6" fill="#5E3A17"/>`
    );
  })();
  const meadow =
    `<rect y="72" width="160" height="48" fill="#A9D37F"/><ellipse cx="40" cy="100" rx="24" ry="3" fill="#B6DB8E"/><ellipse cx="124" cy="106" rx="26" ry="3" fill="#B6DB8E"/>` +
    [8, 30, 48, 96, 116, 150].map((x, i) => tuft(x, i % 2 ? 106 : 98, "#7DBA55", 4.5)).join("");
  const flowers = [
    [18, 104, "#FFFFFF"],
    [96, 108, "#FFD84A"],
    [144, 100, "#FFFFFF"],
    [100, 92, "#FFFFFF"]
  ]
    .map(([x, y, c]) => `<circle cx="${x}" cy="${y}" r="1" fill="${c}"/><circle cx="${x}" cy="${y}" r="0.4" fill="#F2A33A"/>`)
    .join("");
  const grazing = (phase: number) => ({ move: "bob" as const, ms: 2600, y: 0.4, rotate: 1, phase });
  const sparkles = sparkle(54, 84, 2.4) + sparkle(90, 78, 2) + sparkle(96, 94, 1.8) + sparkle(48, 98, 1.5) + sparkle(72, 74, 1.6);
  return {
    kind: "cow",
    ms: 12000,
    parts: [
      { name: "sky", svg: scene },
      { name: "clouds", svg: clouds, loop: { move: "bob", ms: 7000, x: 2 } },
      { name: "green hills", svg: hills },
      { name: "the field", svg: field },
      { name: "the plough, idle", svg: plough },
      { name: "the water wheel, still", svg: wheel },
      { name: "the meadow", svg: meadow },
      { name: "flowers", svg: flowers, origin: { x: 80, y: 104 }, loop: { move: "sway", ms: 2800, angle: 0.6 } },
      { name: "black and white cow", svg: cowAt([], 32, 84, 0.24, true), keys: { at: [0, 0.42, 0.54], opacity: [1, 1, 0], x: [0, 0, -36] }, origin: { x: 44, y: 84 }, loop: grazing(0.5) },
      { name: "brown cow", svg: cowAt(COWS.brown, 102, 86, 0.24), keys: { at: [0, 0.42, 0.54], opacity: [1, 1, 0], x: [0, 0, 36] }, origin: { x: 114, y: 86 }, loop: grazing(0.7) },
      { name: "old cow", svg: cowAt(COWS.old, 0, 96, 0.27, true), keys: { at: [0, 0.22, 0.34], opacity: [1, 1, 0], x: [0, 0, -30] }, origin: { x: 13, y: 96 }, loop: grazing(0.1) },
      { name: "young calf", svg: cowAt(COWS.calf, 132, 102, 0.17, false, HORNS), keys: { at: [0, 0.22, 0.34], opacity: [1, 1, 0], x: [0, 0, 28] }, origin: { x: 140, y: 102 }, loop: { move: "bob", ms: 900, y: 0.8, phase: 0.3 } },
      { name: "pleasing to see", svg: glow(70, 94, 26, "#FFE58A", 0.09), keys: showFrom(0.46, 0.52), loop: { move: "twinkle", ms: 2400, low: 0.6 } },
      { name: "the yellow cow", svg: cowAt(COWS.yellow, 52, 107, 0.36, false, SPOTS), keys: { at: [0, 0.4, 0.41, 0.52], opacity: [0, 0, 1, 1], x: [-90, -90, -82.5, 0] }, origin: { x: 70, y: 107 }, loop: grazing(0) },
      { name: "the plough left idle", svg: glow(28, 66, 16, "#FFFFFF", 0.08), keys: showWhile(0.6, 0.66, 0.78, 0.82), loop: { move: "twinkle", ms: 1800, low: 0.6 } },
      { name: "the water wheel left still", svg: glow(136, 58, 17, "#FFFFFF", 0.08), keys: showWhile(0.62, 0.68, 0.78, 0.82), loop: { move: "twinkle", ms: 1800, low: 0.6, phase: 0.5 } },
      { name: "sound, with no blemish", svg: sparkles, keys: showFrom(0.8, 0.86), loop: { move: "twinkle", ms: 1400, low: 0.35 } }
    ],
    words: [
      { text: "Allah commands you to sacrifice a cow", from: 0.02, to: 0.18 },
      { text: "Neither old nor young", from: 0.2, to: 0.38 },
      { text: "Bright yellow, pleasing to see", from: 0.4, to: 0.58 },
      { text: "Not trained to plough or water", from: 0.6, to: 0.78 },
      { text: "Sound, with no blemish", from: 0.8, to: 1 }
    ]
  };
}

export const COMMAND_ART = { measure, ram, qiblah, saba, cow };
