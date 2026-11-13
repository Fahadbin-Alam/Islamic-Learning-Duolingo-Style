import { ANIMAL_ART, type AnimalKind } from "../lesson/animalArt";
import { GUSTS, animalAt, cloud, flower, glow, n, nightSky, palm, sky, stars, tuft, type SignArt, type SignKeys } from "./signDraw";
import { at3, curls, showFrom } from "./storyArt";

/**
 * The trials of the Prophets and of the peoples they were sent to, drawn as the other stories are (storyArt.ts,
 * prophetArt.ts, favorArt.ts): 'Ad's towers, the cloud they took for rain, and the wind that ended them; the chest
 * Musa's mother cast into the river, and Allah returning him to her; Qarun's treasure, and the earth swallowing his
 * home; the well of Madyan, where Musa watered the flock that was held back; Ayyub's cry, the cool spring, and the
 * golden locusts; and Yusuf's dream of eleven stars, the sun and the moon. Only the signs are drawn: the land, the sky,
 * water, plants, animals and things. No Prophet, no person and no angel is ever drawn: things move by themselves.
 */

/** Keys that show a part from `from` to `to`, then hide it from `hide` to `gone`. */
const showWhile = (from: number, to: number, hide: number, gone: number): SignKeys => ({ at: [0, from, to, hide, gone], opacity: [0, 0, 1, 1, 0] });
/** Keys that show a part from the start, then hide it from `from` to `gone`. */
const hideFrom = (from: number, gone: number): SignKeys => ({ at: [0, from, gone], opacity: [1, 1, 0] });

/** An animal of the picture cards with a cloth laid over its back (drawn in the card's own units), as animalAt sets it. */
function deckedAt(kind: AnimalKind, cloth: string, x: number, y: number, s: number, left = false) {
  const inner = (svg: string) => svg.replace(/^<svg[^>]*>/, "").replace(/<\/svg>$/, "");
  return `<g transform="translate(${left ? n(x + 100 * s) : x} ${y}) scale(${left ? -s : s} ${s})">${inner(ANIMAL_ART[kind]().body)}${cloth}</g>`;
}

/** A tower on a high place, its foot's middle at (x, y), `h` high and `w` wide: a shaft of stone, slits, and a battlement. */
function tower(x: number, y: number, h: number, w: number) {
  const l = n(x - w / 2);
  const r = n(x + w / 2);
  const top = n(y - h);
  let slits = "";
  for (let yy = top + 5; yy < y - 5; yy += 7) slits += `<rect x="${n(x - 0.8)}" y="${n(yy)}" width="1.6" height="3.2" rx="0.8" fill="#7A5434"/>`;
  return (
    `<path d="M${l} ${y} L${n(l + 0.6)} ${top} L${n(r - 0.6)} ${top} L${r} ${y} Z" fill="#C99C66"/>` +
    `<path d="M${n(x + w * 0.1)} ${top} L${n(r - 0.6)} ${top} L${r} ${y} L${n(x + w * 0.1)} ${y} Z" fill="#000000" opacity="0.13"/>` +
    `<rect x="${n(l - 1)}" y="${n(top - 1.8)}" width="${n(w + 2)}" height="1.8" fill="#B98A55"/>` +
    [n(l - 1), n(x - 1.1), n(r - 1.2)].map((mx) => `<rect x="${mx}" y="${n(top - 4.2)}" width="2.2" height="2.4" fill="#B98A55"/>`).join("") +
    slits
  );
}

/**
 * A range of mountains, its ridge through `ridge` (points from left to right, the first at x 0 and the last at x 160)
 * and its foot at `base`; the side of each peak away from the sun shaded, from the peak to the foot of the next valley.
 */
function range(ridge: [number, number][], base: number, fill: string, shade: string) {
  let faces = "";
  for (let i = 1; i < ridge.length - 1; i += 1) {
    const [x, y] = ridge[i];
    const [x2, y2] = ridge[i + 1];
    if (y < ridge[i - 1][1] && y < y2) faces += `<path d="M${x} ${y} L${x2} ${y2} L${x2} ${base} L${n(x + (x2 - x) * 0.35)} ${base} Z" fill="${shade}"/>`;
  }
  return `<path d="M0 ${base} L${ridge.map(([x, y]) => `${x} ${y}`).join(" L")} L160 ${base} Z" fill="${fill}"/>${faces}`;
}

/** A crescent moon, its middle at (x, y), `r` across to its edge: lit on the right, its inner edge `bulge` (0 to r) in. */
const crescent = (x: number, y: number, r: number, bulge: number, fill: string) =>
  `<path d="M${x} ${n(y - r)} A${r} ${r} 0 0 1 ${x} ${n(y + r)} A${n(bulge)} ${r} 0 0 0 ${x} ${n(y - r)} Z" fill="${fill}"/>`;

/** A flat-roofed home, its foot's middle at (x, y), `w` wide and `h` high, with its door and a window. */
function home(x: number, y: number, w: number, h: number, wall = "#D3A872", trim = "#BC9060", dark = "#6B4A2E") {
  const l = n(x - w / 2);
  const top = n(y - h);
  return (
    `<rect x="${l}" y="${top}" width="${w}" height="${h}" fill="${wall}"/>` +
    `<rect x="${n(x + w * 0.1)}" y="${top}" width="${n(w * 0.4)}" height="${h}" fill="#000000" opacity="0.1"/>` +
    `<rect x="${n(l - 0.8)}" y="${n(top - 1.4)}" width="${n(w + 1.6)}" height="1.6" fill="${trim}"/>` +
    `<path d="M${n(x - 3.6)} ${y} L${n(x - 3.6)} ${n(y - 5.4)} Q${n(x - 1.8)} ${n(y - 7.6)} ${x} ${n(y - 5.4)} L${x} ${y} Z" fill="${dark}"/>` +
    `<rect x="${n(x + 2)}" y="${n(top + 2.4)}" width="2.6" height="2.6" fill="${dark}"/>`
  );
}

// 'Ad: their towers on every high place, built to show off (Quran 26:128), in al-Ahqaf, the land of curved sandhills
// (46:21); the cloud they saw coming toward their valleys and took for rain, which was a wind with a painful
// punishment (46:24), sent on them for seven nights and eight days (69:7); and then nothing was seen but their homes
// (46:25). The Prophet ﷺ said that 'Ad were destroyed by the west wind (Sahih al-Bukhari 1035): the cloud and the wind
// come from the west, on the left. Hud and his people are not drawn: only the land, the towers, the homes, the cloud
// and the wind.
function adWind(): SignArt {
  const scene = sky("#F2DBB2", "#F8E9CF", 66);
  const sun = `${glow(26, 26, 14, "#FFF0C0", 0.12)}<circle cx="26" cy="26" r="6.5" fill="#FFE6A0"/>`;
  const sandhills =
    `<path d="M0 82 C12 72 26 70 38 76 C50 68 62 68 74 78 C90 70 104 64 120 70 C134 64 148 66 160 74 L160 96 L0 96 Z" fill="#E6C48D"/>` +
    `<path d="M38 76 C50 68 62 68 74 78 M120 70 C134 64 148 66 160 74 M0 82 C12 72 26 70 38 76" stroke="#D6AE72" stroke-width="1" fill="none"/>`;
  const towers: [number, number, number, number][] = [
    [30, 74, 28, 8],
    [122, 70, 34, 9],
    [76, 77, 20, 7]
  ];
  const nearSand =
    `<path d="M0 94 C30 90 60 93 90 91 C120 89 140 92 160 91 L160 120 L0 120 Z" fill="#EBCB95"/>` +
    `<path d="M12 106 c6 -2 12 -2 18 0 M104 113 c6 -2 12 -2 18 0 M60 117 c5 -1.6 10 -1.6 15 0" stroke="#D9B47C" stroke-width="0.9" fill="none" stroke-linecap="round"/>`;
  const homes = home(46, 100, 16, 10) + home(102, 99, 18, 11) + home(142, 101, 13, 9);
  const palms = palm(18, 102, 18) + palm(70, 101, 14) + palm(124, 104, 15);
  const darkCloud = cloud(64, 40, 1.2, "#6E6874") + cloud(136, 36, 1, "#77717C") + cloud(102, 46, 1.7, "#5E5866");
  const darkness = `<rect width="160" height="120" fill="#5B3F26" opacity="0.42"/>`;
  const sand =
    `<g stroke="#D7AF72" stroke-width="1.1" stroke-linecap="round" fill="none"><path d="M4 70 C20 68 36 71 52 69"/><path d="M70 84 C88 82 104 85 122 83"/>` +
    `<path d="M14 100 C30 98 44 101 60 99"/><path d="M96 62 C110 60 122 62 136 60"/><path d="M120 106 C134 104 146 107 158 105"/></g>`;
  // Seven nights and eight days, in turn: a day first, then a night, and so on, ending on the eighth day.
  const count = Array.from({ length: 15 }, (_, i) => 38 + i * 6);
  // Low on the sand below their homes, still inside what a question's frame shows (y 11 to 109).
  const slots = `<rect x="32.5" y="101.4" width="95" height="7.2" rx="3.6" fill="#000000" opacity="0.14"/>` + count.map((x) => `<circle cx="${x}" cy="105" r="1.7" fill="#F8EBD2" stroke="#B48C5A" stroke-width="0.5"/>`).join("");
  const dayMark = (x: number) => `<circle cx="${x}" cy="105" r="1.7" fill="#FFC93C"/>`;
  const nightMark = (x: number) => `<circle cx="${x}" cy="105" r="1.7" fill="#2E3A66"/><path d="M${n(x + 0.4)} 103.65 A1.35 1.35 0 1 0 ${n(x + 0.4)} 106.35 A1.08 1.08 0 1 1 ${n(x + 0.4)} 103.65 Z" fill="#F4F1DE"/>`;
  const drifts = `<path d="M33 100.4 C38 96.6 46 96.4 52 100.4 Z M88 99.4 C94 95.6 104 95.4 112 99.4 Z M133 101.4 C137 98.4 143 98.4 149 101.4 Z" fill="#E2BE85"/>`;
  const motes = `<g fill="#FFFFFF" opacity="0.75"><circle cx="30" cy="60" r="0.7"/><circle cx="64" cy="52" r="0.6"/><circle cx="96" cy="66" r="0.7"/><circle cx="132" cy="56" r="0.6"/><circle cx="112" cy="82" r="0.6"/></g>`;
  return {
    kind: "ad-wind",
    ms: 12000,
    parts: [
      { name: "sky", svg: scene },
      { name: "the sun", svg: sun, loop: { move: "twinkle", ms: 2600, low: 0.75 } },
      { name: "sandhills", svg: sandhills },
      ...towers.map(([x, y, h, w], i) => ({
        name: `tower on a high place, ${i + 1}`,
        svg: tower(x, y, h, w),
        origin: { x, y },
        keys: { at: [0, at3(0.03 + i * 0.04), at3(0.09 + i * 0.04), at3(0.7 + i * 0.02), at3(0.76 + i * 0.02)], scaleY: [0, 0, 1, 1, 0], opacity: [1, 1, 1, 1, 0] }
      })),
      { name: "near sand", svg: nearSand },
      { name: "their homes", svg: homes },
      { name: "palm trees", svg: palms, origin: { x: 80, y: 104 }, keys: hideFrom(0.62, 0.7), loop: { move: "sway", ms: 2600, angle: 1.2 } },
      { name: "the cloud", svg: darkCloud, keys: { at: [0, 0.22, 0.24, 0.34, 0.42, 0.48], x: [-130, -130, -112, 0, 0, 0], opacity: [0, 0, 1, 1, 1, 0] }, loop: { move: "bob", ms: 3000, x: 1.5 } },
      { name: "darkness of the storm", svg: darkness, keys: showWhile(0.38, 0.46, 0.82, 0.88) },
      { name: "the wind", svg: GUSTS, keys: showWhile(0.4, 0.44, 0.82, 0.86), loop: { move: "slide", ms: 700 } },
      { name: "blowing sand", svg: sand, keys: showWhile(0.4, 0.44, 0.82, 0.86), loop: { move: "slide", ms: 900 } },
      { name: "nights and days, to count", svg: slots, keys: showFrom(0.6, 0.62) },
      ...count.map((x, i) => {
        const from = at3(0.62 + (i + 1) * 0.011);
        return { name: i % 2 ? `night ${(i + 1) / 2}` : `day ${i / 2 + 1}`, svg: i % 2 ? nightMark(x) : dayMark(x), keys: showFrom(at3(from - 0.008), from) };
      }),
      { name: "sand drifted at their homes", svg: drifts, keys: showFrom(0.82, 0.9) },
      { name: "dust settling", svg: motes, keys: showFrom(0.86, 0.92), loop: { move: "twinkle", ms: 1800, low: 0.2 } }
    ],
    words: [
      { text: "Towers on every high place", from: 0.02, to: 0.2 },
      { text: "A cloud facing their valleys", from: 0.22, to: 0.38 },
      { text: "A wind with a painful punishment", from: 0.4, to: 0.6 },
      { text: "Seven nights and eight days", from: 0.62, to: 0.82 },
      { text: "Nothing seen but their homes", from: 0.84, to: 1 }
    ]
  };
}

/** A chest of wood, its middle at (x, y): its body, banded. */
const chestBody = (x: number, y: number) =>
  `<rect x="${n(x - 6)}" y="${n(y - 3)}" width="12" height="6.4" rx="0.8" fill="#9A6A3A"/>` +
  `<path d="M${n(x - 6)} ${n(y - 0.4)} L${n(x + 6)} ${n(y - 0.4)} M${n(x - 3)} ${n(y - 3)} L${n(x - 3)} ${n(y + 3.4)} M${n(x + 3)} ${n(y - 3)} L${n(x + 3)} ${n(y + 3.4)}" stroke="#6E4524" stroke-width="0.6"/>`;
/** The chest's lid, shut; its hinge is at the right end of the chest's top. */
const chestLid = (x: number, y: number) =>
  `<path d="M${n(x - 6.6)} ${n(y - 3)} L${n(x - 6.2)} ${n(y - 5.2)} Q${x} ${n(y - 6.8)} ${n(x + 6.2)} ${n(y - 5.2)} L${n(x + 6.6)} ${n(y - 3)} Z" fill="#B07C46"/>` +
  `<path d="M${n(x - 6.2)} ${n(y - 4.2)} Q${x} ${n(y - 5.6)} ${n(x + 6.2)} ${n(y - 4.2)}" stroke="#8A5A30" stroke-width="0.5" fill="none"/>`;
/** A papyrus reed, its foot at (x, y), `h` high, with its fan of a head. */
const papyrus = (x: number, y: number, h: number) =>
  `<path d="M${x} ${y} L${x} ${n(y - h)}" stroke="#5E8F3A" stroke-width="0.8"/>` +
  `<path d="M${x} ${n(y - h)} l-3 -2.6 M${x} ${n(y - h)} l-1.4 -3.6 M${x} ${n(y - h)} l0 -4 M${x} ${n(y - h)} l1.4 -3.6 M${x} ${n(y - h)} l3 -2.6" stroke="#7DAF4E" stroke-width="0.7" stroke-linecap="round"/>`;

// Musa's mother, inspired: put him into the chest and cast it into the river, and the river will cast it on the shore
// (Quran 20:39); do not fear and do not grieve (28:7); her heart became empty, and she told his sister: follow him, and
// she watched him from afar (28:10, 28:11); Pharaoh's family picked it up, and Pharaoh's wife said: do not kill him
// (28:8, 28:9); and Allah returned him to his mother, so that she would be comforted (28:13). Musa, his mother and his
// sister are not drawn: only their home, the river, the palace and the chest, which shuts and sails by itself, and his
// sister's footprints along the bank, following it.
function river(): SignArt {
  const scene = sky("#F7DDBD", "#FBEEDD", 58);
  const farBank = `<path d="M0 64 C30 62 60 65 90 63 C120 62 140 64 160 63 L160 80 L0 80 Z" fill="#D8C08C"/>`;
  const trees = palm(46, 70, 14) + palm(62, 72, 11) + palm(90, 69, 15);
  const theirHome =
    home(20, 72, 24, 16, "#C99F6B", "#B08654", "#5E3F25") + papyrus(36, 80, 8) + papyrus(39, 80, 10) + papyrus(52, 80, 7);
  let columns = "";
  for (let x = 107; x < 154; x += 8.6) columns += `<rect x="${n(x)}" y="46" width="3.2" height="26" fill="#D3BD8C"/><rect x="${n(x - 0.6)}" y="45" width="4.4" height="1.6" fill="#C2A976"/>`;
  const palace =
    `<rect x="104" y="44" width="52" height="30" fill="#E8D7AE"/>` +
    `<rect x="102" y="40" width="56" height="4.4" fill="#CDB47F"/><path d="M102 42.2 L158 42.2" stroke="#E2B33E" stroke-width="0.8"/>` +
    columns +
    `<rect x="124" y="58" width="12" height="16" fill="#6E5A3A"/>` +
    `<path d="M116 74 L144 74 L148 80 L112 80 Z" fill="#D9C79B"/><path d="M114 77 L146 77" stroke="#BFAA7A" stroke-width="0.6"/>`;
  const water = `<rect y="78" width="160" height="26" fill="#6BAFD6"/><rect y="78" width="160" height="2.6" fill="#8CC5E6"/>`;
  const waves = curls(87, 18, "#A9D8F2", 0.8) + curls(95, 22, "#A9D8F2", 0.8, 12);
  const nearBank = `<path d="M0 102 C40 99 80 103 120 100 C140 99 150 101 160 100 L160 120 L0 120 Z" fill="#CFB37C"/>`;
  const reeds = papyrus(6, 106, 12) + papyrus(10, 108, 15) + papyrus(15, 106, 11) + papyrus(140, 105, 13) + papyrus(146, 107, 16) + papyrus(152, 105, 12);
  const evening = `<rect width="160" height="120" fill="#2B2756" opacity="0.3"/>`;
  const lit = `${glow(23.3, 64.6, 10, "#FFD77A", 0.12)}<rect x="22" y="63.3" width="2.6" height="2.6" fill="#FFD77A"/>`;
  // The chest: first by the bank below their home, its lid open; it shuts, slides into the river, sails along it and
  // comes to the shore by the palace, where it is taken up.
  const [cx, cy] = [40, 80];
  const sails = { at: [0, 0.18, 0.28, 0.6, 0.74, 0.76, 0.8], x: [0, 0, 6, 50, 82, 82, 82], y: [0, 0, 5, 8, 2, 2, 2], opacity: [1, 1, 1, 1, 1, 1, 0] };
  // His sister's footprints along the far bank, one after another, from their home toward the palace, behind the chest.
  const steps = Array.from({ length: 13 }, (_, i) => ({ x: 34 + i * 6, y: i % 2 ? 76.3 : 74.9, from: at3(0.48 + i * 0.02) }));
  const print = (x: number, y: number) => `<ellipse cx="${x}" cy="${y}" rx="1.15" ry="0.62" fill="#9C7A52"/><circle cx="${n(x + 1.6)}" cy="${y}" r="0.45" fill="#9C7A52"/>`;
  const bobbing = { move: "bob" as const, ms: 1700, y: 0.7 };
  return {
    kind: "river",
    ms: 12000,
    stillAt: 0.68,
    parts: [
      { name: "dawn sky", svg: scene },
      { name: "far bank", svg: farBank },
      { name: "palm trees", svg: trees, origin: { x: 66, y: 72 }, loop: { move: "sway", ms: 3000, angle: 1 } },
      { name: "their home by the river", svg: theirHome },
      { name: "the palace", svg: palace },
      ...steps.map(({ x, y, from }, i) => ({ name: `footprints following the chest, step ${i + 1}`, svg: print(x, y), keys: showFrom(at3(from - 0.012), from) })),
      { name: "the river", svg: water },
      { name: "the river flowing", svg: waves, loop: { move: "slide", ms: 6000 } },
      { name: "under His care", svg: glow(cx, cy, 14, "#FFF6DA", 0.1), keys: { at: [0, 0.34, 0.42, 0.6, 0.74, 0.78], x: [14.3, 14.3, 25.3, 50, 82, 82], y: [5.6, 5.6, 6.3, 8, 2, 2], opacity: [0, 0, 1, 1, 1, 0] } },
      { name: "the chest", svg: chestBody(cx, cy), keys: sails, loop: bobbing },
      {
        name: "the chest's lid",
        svg: chestLid(cx, cy),
        origin: { x: cx + 6.6, y: cy - 3 },
        keys: { at: [0, 0.06, 0.13, ...sails.at.slice(1)], rotate: [80, 80, 0, 0, 0, 0, 0, 0, 0], x: [0, 0, 0, ...sails.x.slice(1)], y: [0, 0, 0, ...sails.y.slice(1)], opacity: [1, 1, 1, ...sails.opacity.slice(1)] },
        loop: bobbing
      },
      { name: "near bank", svg: nearBank },
      { name: "reeds", svg: reeds, origin: { x: 80, y: 106 }, loop: { move: "sway", ms: 2400, angle: 1.4 } },
      { name: "evening", svg: evening, keys: showFrom(0.78, 0.88) },
      { name: "evening stars", svg: stars([[60, 10], [92, 18], [134, 12], [20, 26], [150, 30]]), keys: showFrom(0.86, 0.94), loop: { move: "twinkle", ms: 1600, low: 0.3 } },
      { name: "light in their home", svg: lit, keys: showFrom(0.82, 0.9), loop: { move: "twinkle", ms: 2200, low: 0.75 } }
    ],
    words: [
      { text: "Put him into the chest", from: 0.02, to: 0.16 },
      { text: "Cast it into the river", from: 0.18, to: 0.3 },
      { text: "Do not fear, do not grieve", from: 0.32, to: 0.46 },
      { text: "Follow him", from: 0.48, to: 0.6 },
      { text: "The river cast it on the shore", from: 0.62, to: 0.76 },
      { text: "We returned him to his mother", from: 0.78, to: 1 }
    ]
  };
}

/** A key of the treasure lying on the ground, its bow at (x, y), `s` long, turned `turn` degrees. */
const treasureKey = (x: number, y: number, s: number, turn: number) =>
  `<g transform="translate(${x} ${y}) rotate(${turn})"><circle cx="0" cy="0" r="${n(s * 0.18)}" fill="none" stroke="#C99A2E" stroke-width="${n(s * 0.1)}"/>` +
  `<path d="M${n(s * 0.18)} 0 L${n(s)} 0 M${n(s * 0.76)} 0 L${n(s * 0.76)} ${n(s * 0.24)} M${n(s * 0.94)} 0 L${n(s * 0.94)} ${n(s * 0.28)}" stroke="#C99A2E" stroke-width="${n(s * 0.1)}" stroke-linecap="round"/></g>`;
/** A chest of treasure, its foot's middle at (x, y), heaped with gold. */
const treasure = (x: number, y: number) =>
  `<rect x="${n(x - 6)}" y="${n(y - 6)}" width="12" height="6" rx="0.8" fill="#A06A28"/><path d="M${n(x - 6)} ${n(y - 3.4)} L${n(x + 6)} ${n(y - 3.4)}" stroke="#E2B33E" stroke-width="0.8"/>` +
  [-4, -1.4, 1.2, 3.8, -2.6, 0, 2.6, -1.2, 1.4]
    .map((dx, i) => `<circle cx="${n(x + dx)}" cy="${n(y - 6.4 - (i > 4 ? (i > 6 ? 2.6 : 1.3) : 0))}" r="1.3" fill="${i % 2 ? "#F2C744" : "#E2B33E"}"/>`)
    .join("");
/** Glints of gold about (x, y). */
const glints = (list: [number, number][]) => list.map(([x, y]) => `<path d="M${x} ${n(y - 1.6)} L${n(x + 0.5)} ${n(y - 0.5)} L${n(x + 1.6)} ${y} L${n(x + 0.5)} ${n(y + 0.5)} L${x} ${n(y + 1.6)} L${n(x - 0.5)} ${n(y + 0.5)} L${n(x - 1.6)} ${y} L${n(x - 0.5)} ${n(y - 0.5)} Z" fill="#FFF6C8"/>`).join("");

// Qarun: given treasures whose keys were a heavy load for a band of strong men (Quran 28:76), he said he had them by
// his own knowledge (28:78); he went out before his people in his finery (28:79); and Allah made the earth swallow him
// and his home, and there was no band to help him (28:81). He is not drawn, nor his people: only his home, his
// treasure, his keys, his beasts in their finery, and the earth.
function qarun(): SignArt {
  const scene = sky("#CFE6F4", "#E8F2F7", 66);
  const hills = `<path d="M0 80 C14 72 30 70 46 75 C62 79 78 70 96 71 C114 72 128 76 142 72 C150 70 156 71 160 72 L160 82 L0 82 Z" fill="#D7C29A"/>`;
  const farLand = `<rect y="78" width="160" height="16" fill="#E8D6AA"/>`;
  let columns = "";
  for (const x of [72, 85]) columns += `<rect x="${x}" y="72" width="3" height="20" fill="#D9C69A"/><path d="M${x - 1.2} 72 L${x + 4.2} 72 L${x + 3.2} 69.6 L${x - 0.2} 69.6 Z" fill="#E2B33E"/>`;
  const house =
    `<path d="M50 92 L53 58 L107 58 L110 92 Z" fill="#EEDDB6"/><path d="M80 58 L107 58 L110 92 L80 92 Z" fill="#000000" opacity="0.06"/>` +
    `<rect x="50" y="53.4" width="60" height="5" fill="#E2CFA2"/><path d="M50 56 L110 56" stroke="#E2B33E" stroke-width="1.2"/>` +
    [58, 66, 94, 102].map((x) => `<circle cx="${x}" cy="62.6" r="1.6" fill="#E2B33E"/>`).join("") +
    `<path d="M58 84 L58 76 Q61 72.6 64 76 L64 84 Z M96 84 L96 76 Q99 72.6 102 76 L102 84 Z" fill="#5A3A20"/><path d="M58 76 Q61 72.6 64 76 M96 76 Q99 72.6 102 76" stroke="#E2B33E" stroke-width="0.6" fill="none"/>` +
    `<rect x="75" y="74" width="10" height="18" fill="#5A3A20"/>` +
    columns;
  const chests = treasure(62, 92) + treasure(98, 92) + treasure(110, 92);
  const keyPlaces: [number, number, number, number][] = [
    [118, 90.6, 9, -8],
    [126, 91.2, 10, 4],
    [134, 90.4, 8, -14],
    [121, 88, 9, 10],
    [129, 87.6, 10, -6],
    [137, 88.4, 8, 12],
    [124, 85.2, 9, -2],
    [132, 84.6, 9, 8]
  ];
  const ground =
    `<rect y="92" width="160" height="28" fill="#E3CC9C"/><path d="M0 92 L160 92" stroke="#CDB07C" stroke-width="1"/>` +
    `<ellipse cx="22" cy="110" rx="3" ry="1.2" fill="#CDB07C"/><ellipse cx="140" cy="114" rx="3.6" ry="1.3" fill="#CDB07C"/><ellipse cx="96" cy="116" rx="2.4" ry="1" fill="#CDB07C"/>`;
  const horseCloth = `<path d="M30 33 Q44 28 57 33 L55 47 Q44 50 32 47 Z" fill="#B8322E" stroke="#E9B93A" stroke-width="1.6"/><path d="M33 47 L33 50 M38 48.4 L38 51.4 M44 48.8 L44 51.8 M50 48.4 L50 51.4" stroke="#E9B93A" stroke-width="1.4" stroke-linecap="round"/>`;
  const camelCloth = `<path d="M28 37 C30 24 50 18 57 36 L55 47 Q44 50 31 47 Z" fill="#1F6E8C" stroke="#E9B93A" stroke-width="1.6"/><circle cx="43" cy="31" r="2.6" fill="#E9B93A"/>`;
  const finery: [AnimalKind, string, number][] = [
    ["horse", horseCloth, 0.25],
    ["camel", camelCloth, 0.29],
    ["horse", horseCloth, 0.24]
  ];
  const cracks = `<path d="M44 92 L40 97 L44 101 L39 106 M80 92 L82 98 L77 103 L80 110 M116 92 L121 97 L117 102 L122 107 M60 92 L56 95 M100 92 L104 96" stroke="#7E6440" stroke-width="1" fill="none" stroke-linecap="round"/>`;
  const hollow = `<path d="M46 92 C60 97 100 97 114 92 Z" fill="#B99B6C"/>`;
  const dust = cloud(58, 92, 0.9, "#D9C39A", 0.85) + cloud(104, 92, 1, "#D9C39A", 0.85) + cloud(80, 90, 1.2, "#E3D0AA", 0.85);
  const motes = `<g fill="#C9B080"><circle cx="40" cy="80" r="0.8"/><circle cx="70" cy="74" r="0.7"/><circle cx="92" cy="82" r="0.8"/><circle cx="120" cy="76" r="0.7"/><circle cx="104" cy="70" r="0.6"/></g>`;
  const sinks = { at: [0, 0.5, 0.56, 0.7], y: [0, 0, 6, 44] };
  return {
    kind: "qarun",
    ms: 12000,
    stillAt: 0.58,
    parts: [
      { name: "sky", svg: scene },
      { name: "far hills", svg: hills },
      { name: "far land", svg: farLand },
      { name: "his home", svg: house, keys: sinks },
      { name: "his treasure", svg: chests, keys: { at: [0, 0.02, 0.08, 0.5, 0.56, 0.7], opacity: [0, 0, 1, 1, 1, 1], y: [0, 0, 0, 0, 6, 44] } },
      { name: "gold glinting", svg: glints([[58, 82], [66, 83.6], [100, 82.4], [112, 83], [105, 84.6]]), keys: showWhile(0.06, 0.1, 0.5, 0.54), loop: { move: "twinkle", ms: 1100, low: 0.1 } },
      ...keyPlaces.map(([x, y, s, turn], i) => {
        const from = at3(0.05 + i * 0.018);
        return { name: `key ${i + 1}`, svg: treasureKey(x, y, s, turn), keys: { at: [0, from, at3(from + 0.02), 0.5, 0.56, 0.7], opacity: [0, 0, 1, 1, 1, 1], y: [0, 0, 0, 0, 6, 44] } };
      }),
      { name: "the ground", svg: ground },
      // One after another out of his door, walking slowly to the left so all three are seen while he goes out in his
      // finery; then gone, as the moment ends.
      ...finery.map(([kind, cloth, s], i) => {
        const from = at3(0.26 + i * 0.07);
        const out = at3(from + 0.03);
        const far = n(-8 - 2.6 * Math.round((0.46 - out) * 100));
        return {
          name: `${kind} in finery, ${i + 1}`,
          svg: deckedAt(kind, cloth, 70, n(104 - 73 * s), s, true),
          keys: { at: [0, from, out, 0.46, 0.48], opacity: [0, 0, 1, 1, 0], x: [0, 0, -8, far, n(far - 5)] },
          loop: { move: "bob" as const, ms: 620, y: 0.5, phase: i * 0.3 }
        };
      }),
      { name: "the earth cracking", svg: cracks, keys: showWhile(0.5, 0.54, 0.86, 0.94) },
      { name: "where it was swallowed", svg: hollow, keys: showFrom(0.62, 0.7) },
      { name: "dust rising", svg: dust, origin: { x: 80, y: 92 }, keys: { at: [0, 0.54, 0.6, 0.74, 0.86], opacity: [0, 0, 1, 1, 0], scale: [0.6, 0.6, 1, 1.2, 1.3] }, loop: { move: "bob", ms: 1400, y: 0.8 } },
      { name: "dust settling", svg: motes, keys: showFrom(0.8, 0.88), loop: { move: "twinkle", ms: 1700, low: 0.2 } }
    ],
    words: [
      { text: "Treasures with heavy keys", from: 0.02, to: 0.24 },
      { text: "He went out in his finery", from: 0.26, to: 0.48 },
      { text: "The earth swallowed his home", from: 0.5, to: 0.74 },
      { text: "No one could help him", from: 0.76, to: 1 }
    ]
  };
}

// The well of Madyan: Musa came to its water and found many people watering their flocks, and apart from them two
// women holding back their flock until the shepherds had gone (Quran 28:23); so he watered it for them, then turned to
// the shade and said: my Lord, I am in need of whatever good You send down to me (28:24). He is not drawn, nor the two
// women, nor the shepherds: only the well, the trough, the flocks, the tree and its shade; the bucket rises by itself,
// pours and goes back.
function madyan(): SignArt {
  const scene = sky("#CFE6F4", "#EAF3F7", 62);
  const mountains = range(
    [
      [0, 70],
      [12, 64],
      [22, 68],
      [38, 58],
      [52, 66],
      [66, 61],
      [84, 52],
      [100, 63],
      [112, 60],
      [126, 66],
      [142, 56],
      [160, 64]
    ],
    86,
    "#B9A07E",
    "#A68C6A"
  );
  const ground = `<rect y="84" width="160" height="36" fill="#E3CD9C"/><path d="M0 84 L160 84" stroke="#CDB07C" stroke-width="1"/><ellipse cx="128" cy="112" rx="3.4" ry="1.2" fill="#CDB07C"/><ellipse cx="70" cy="114" rx="2.6" ry="1" fill="#CDB07C"/>`;
  const trunk = `<path d="M15.6 98 L16.8 72 L19 72 L20.4 98 Z" fill="#8A5E36"/><path d="M17.4 80 L10 71 M18.6 78 L26 69" stroke="#8A5E36" stroke-width="1.4" stroke-linecap="round"/>`;
  const crown = `<ellipse cx="18" cy="65" rx="16" ry="7" fill="#6E9F52"/><ellipse cx="11" cy="61.6" rx="7" ry="4" fill="#7FB060"/><ellipse cx="25" cy="61.2" rx="7" ry="4" fill="#7FB060"/>`;
  const shade = `<ellipse cx="18" cy="99" rx="17" ry="3.2" fill="#000000" opacity="0.13"/>`;
  const wellMouth = `<ellipse cx="52" cy="85" rx="9" ry="2.6" fill="#3F3A34"/>`;
  const wellFront =
    `<path d="M43 85 L43 94 Q52 97 61 94 L61 85 Q52 88 43 85 Z" fill="#A89C8C"/>` +
    `<path d="M43 89.6 Q52 92.6 61 89.6 M48 86.6 L48 91.4 M56 86.6 L56 91.4 M52 91.6 L52 95.8" stroke="#8E8374" stroke-width="0.6" fill="none"/>` +
    `<path d="M43 85 Q52 88 61 85" stroke="#8E8374" stroke-width="0.9" fill="none"/>`;
  const frame = `<path d="M45 86 L45 70 M59 86 L59 70" stroke="#7A5634" stroke-width="1.6"/><path d="M43.6 70 L60.4 70" stroke="#7A5634" stroke-width="1.8" stroke-linecap="round"/><circle cx="52" cy="71.6" r="1.8" fill="#5E4128"/>`;
  const rope = `<path d="M52 73.4 L52 81" stroke="#C9B48E" stroke-width="0.6"/>`;
  const bucket = `<path d="M48.4 83 L55.6 83 L54.6 88.6 L49.4 88.6 Z" fill="#7A5634"/><path d="M48.4 83 L55.6 83" stroke="#5E4128" stroke-width="0.7"/><path d="M49.4 83 Q52 79.6 54.6 83" stroke="#5E4128" stroke-width="0.6" fill="none"/>`;
  const trough = `<rect x="66" y="92" width="86" height="6" rx="1" fill="#9A8F82"/><rect x="67.4" y="92.6" width="83.2" height="2" fill="#6FB3D8"/><path d="M66 95.6 L152 95.6" stroke="#857A6E" stroke-width="0.5"/>`;
  const pour = `<g fill="#7FC3EB"><ellipse cx="74" cy="82" rx="0.7" ry="1.1"/><ellipse cx="75" cy="85.4" rx="0.7" ry="1.1"/><ellipse cx="74.2" cy="88.8" rx="0.7" ry="1.1"/></g>`;
  const crowd: [AnimalKind, number, number, boolean][] = [
    ["sheep", 101, 0.2, false],
    ["goat", 112, 0.2, true],
    ["sheep", 123, 0.2, true],
    ["goat", 134, 0.2, false],
    ["sheep", 145, 0.2, true]
  ];
  const held: [number, number][] = [
    [1, 89],
    [14, 90.6],
    [27, 89.4]
  ];
  return {
    kind: "madyan",
    ms: 12000,
    parts: [
      { name: "sky", svg: scene },
      { name: "mountains", svg: mountains },
      { name: "the ground", svg: ground },
      { name: "shade of the tree", svg: shade },
      { name: "tree trunk", svg: trunk },
      { name: "leaves of the tree", svg: crown, origin: { x: 18, y: 72 }, loop: { move: "sway", ms: 3000, angle: 1.6 } },
      { name: "mouth of the well", svg: wellMouth },
      { name: "rope going up", svg: rope, origin: { x: 52, y: 73.4 }, keys: { at: [0, 0.6, 0.66, 0.68, 0.82, 0.84, 0.88], scaleY: [1, 1, 0.1, 0.1, 0.1, 0.1, 1], opacity: [1, 1, 1, 0, 0, 1, 1] } },
      { name: "the bucket", svg: bucket, origin: { x: 52, y: 86 }, keys: { at: [0, 0.6, 0.66, 0.7, 0.78, 0.82, 0.88], x: [0, 0, 0, 20, 20, 0, 0], y: [0, 0, -9, -4, -4, -9, 0], rotate: [0, 0, 0, 60, 60, 0, 0] } },
      { name: "wall of the well", svg: wellFront },
      { name: "frame of the well", svg: frame },
      ...crowd.map(([kind, x, s, left], i) => ({
        name: `many flocks drinking, ${i + 1}`,
        svg: animalAt(kind, x, n(94.6 - 73 * s), s, left),
        keys: { at: [0, 0.22, 0.26, at3(0.3 + i * 0.012)], opacity: [0, 0, 1, 1], x: [70, 70, 50, 0] },
        loop: { move: "bob" as const, ms: 1300, y: 0.5, phase: i * 0.2 }
      })),
      ...held.map(([x, top], i) => ({
        name: `flock held back, ${i + 1}`,
        svg: animalAt("sheep", x, top, 0.2, false),
        keys: { at: [0, 0.42, 0.48, 0.62, 0.74], opacity: [0, 0, 1, 1, 1], x: [-40, -40, 0, 0, 58], y: [0, 0, 0, 0, n(94.6 - 73 * 0.2 - top)] },
        loop: { move: "bob" as const, ms: 1500, y: 0.4, phase: i * 0.3 }
      })),
      { name: "the trough", svg: trough },
      { name: "water poured", svg: pour, keys: showWhile(0.7, 0.72, 0.78, 0.8), loop: { move: "drip", ms: 600, distance: 6 } },
      { name: "turned to the shade", svg: glow(18, 90, 20, "#FFF7DC", 0.1), keys: showFrom(0.8, 0.88), loop: { move: "twinkle", ms: 2400, low: 0.6 } }
    ],
    words: [
      { text: "The water of Madyan", from: 0.02, to: 0.2 },
      { text: "Many watering their flocks", from: 0.22, to: 0.4 },
      { text: "Two women held back their flock", from: 0.42, to: 0.58 },
      { text: "So he watered for them", from: 0.6, to: 0.78 },
      { text: "My Lord, I am in need", from: 0.8, to: 1 }
    ]
  };
}

/** A golden locust, its middle at (x, y), turned `turn` degrees. */
const goldLocust = (x: number, y: number, turn = 0) =>
  `<g transform="translate(${x} ${y}) rotate(${turn})"><ellipse cx="0" cy="0" rx="2.6" ry="0.9" fill="#E3AE2C"/><path d="M-1.6 -0.4 L1.8 -1.8 L2.4 -0.6 Z" fill="#F6D66B"/>` +
  `<circle cx="2.5" cy="-0.1" r="0.7" fill="#C9921E"/><path d="M0.6 0.6 L2 2 M-0.6 0.6 L-2.2 2.2 L-1 1" stroke="#B88420" stroke-width="0.4" fill="none"/></g>`;

// Ayyub called on his Lord: harm has touched me, and You are the Most Merciful of the merciful (Quran 21:83), and He
// answered him and removed his harm (21:84): strike the ground with your foot; here is cool water to wash in and to
// drink (38:42); and once, as he bathed, golden locusts fell on him (Sahih al-Bukhari 279). We found him patient; what
// an excellent servant (38:44). He is not drawn: the ground opens by itself, and the dry land turns green.
function ayyub(): SignArt {
  const grey = sky("#B9B4AC", "#CFCAC2", 70);
  const clear = sky("#BFE3FA", "#DDF1FC", 70);
  const hillsOf = (fill: string) => `<path d="M0 78 C16 68 34 66 52 72 C68 77 82 62 102 63 C120 64 134 74 148 70 C154 68 158 69 160 70 L160 88 L0 88 Z" fill="${fill}"/>`;
  const hills = hillsOf("#A99C88");
  const greenHills = hillsOf("#8DB46A");
  const dryLand = `<rect y="86" width="160" height="34" fill="#CDB896"/><path d="M0 86 L160 86" stroke="#B9A27C" stroke-width="1"/>`;
  const cracks = `<path d="M10 100 l6 3 l4 -2 l5 3 M34 112 l5 -3 l6 2 M104 96 l6 2 l3 -3 M118 110 l5 3 l6 -2 l4 2 M138 98 l5 2 M58 108 l4 -2 l5 2" stroke="#A48D68" stroke-width="0.8" fill="none" stroke-linecap="round"/>`;
  const greenLand = `<rect y="86" width="160" height="34" fill="#B5D68A"/><path d="M0 86 L160 86" stroke="#9CC373" stroke-width="1"/>`;
  const branches = `<path d="M26 98 L27.4 70 L29.6 70 L31 98 Z" fill="#7E5A3A"/><path d="M28.4 82 L18 70 L14 72 M29 78 L40 66 L44 67 M28.6 72 L24 60 M29.4 71 L34 58" stroke="#7E5A3A" stroke-width="1.3" fill="none" stroke-linecap="round"/>`;
  const leaves = `<ellipse cx="20" cy="66" rx="9" ry="5.4" fill="#6FA35A"/><ellipse cx="38" cy="63" rx="9" ry="5.6" fill="#6FA35A"/><ellipse cx="29" cy="57" rx="9" ry="5.4" fill="#7FB565"/>`;
  const wilted = `<path d="M134 98 C134 92 136 88 141 88" stroke="#8E8466" stroke-width="1" fill="none"/><path d="M141 88 C143 89 143 92 141 93 Z" fill="#9C8E66"/><path d="M134 94 C131 92 128 93 127 95 C130 96 132 95 134 94 Z" fill="#9C8E66"/>`;
  const plants = tuft(122, 100, "#5FA344", 6) + flower(134, 100, "#F47C9B", 9) + flower(144, 102, "#FFFFFF", 7) + tuft(150, 104, "#5FA344", 5) + tuft(52, 104, "#5FA344", 5) + flower(60, 106, "#FFD84A", 7) + tuft(104, 110, "#5FA344", 6);
  const ring = `<circle cx="80" cy="98" r="10" fill="none" stroke="#FFF6D6" stroke-width="1.1"/>`;
  const opening = `<path d="M72 98 L76 96.4 L79 99 L82 96.2 L85 98.6 L88 97.4" stroke="#FFF2C8" stroke-width="1.1" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
  const spring =
    `<path d="M80 102 C78.6 97 76.4 94.6 74.4 94 M80 102 C80 97 80 94 80 92 M80 102 C81.4 97 83.6 94.6 85.6 94" stroke="#7FC3EB" stroke-width="1.5" fill="none" stroke-linecap="round"/>` +
    `<circle cx="74" cy="94.6" r="0.9" fill="#A9DBF7"/><circle cx="86" cy="94.6" r="0.9" fill="#A9DBF7"/><circle cx="80" cy="91.4" r="0.9" fill="#A9DBF7"/>`;
  const pool = `<ellipse cx="80" cy="103.6" rx="16" ry="3.4" fill="#5FB0E0"/><ellipse cx="76" cy="103" rx="6.4" ry="0.9" fill="#9ED3F2"/>`;
  const falling = [
    [14, 8, 20],
    [40, 30, -10],
    [66, 4, 30],
    [94, 22, 0],
    [120, 10, -20],
    [146, 36, 15],
    [28, 62, 10],
    [56, 50, -30],
    [108, 58, 25],
    [136, 74, -5],
    [80, 80, 12],
    [18, 96, -15]
  ]
    .map(([x, y, turn]) => goldLocust(x, y, turn))
    .join("");
  const settled = [
    [62, 106, 10],
    [70, 110, -20],
    [92, 108, 30],
    [100, 104, -8],
    [86, 112, 4],
    [110, 110, -24]
  ]
    .map(([x, y, turn]) => goldLocust(x, y, turn))
    .join("");
  const call = (from: number): SignKeys => ({ at: [0, from, at3(from + 0.01), at3(from + 0.1)], opacity: [0, 0, 0.9, 0], scale: [0.3, 0.3, 0.4, 2.4] });
  return {
    kind: "ayyub",
    ms: 12000,
    parts: [
      { name: "grey sky", svg: grey },
      { name: "clear sky", svg: clear, keys: showFrom(0.44, 0.56) },
      { name: "dry hills", svg: hills },
      { name: "green hills", svg: greenHills, keys: showFrom(0.48, 0.58) },
      { name: "dry land", svg: dryLand + cracks },
      { name: "green land", svg: greenLand, keys: showFrom(0.46, 0.56) },
      { name: "bare tree", svg: branches },
      { name: "leaves on the tree", svg: leaves, origin: { x: 29, y: 66 }, keys: { at: [0, 0.46, 0.56], opacity: [0, 0, 1], scale: [0.2, 0.2, 1] }, loop: { move: "sway", ms: 2800, angle: 1.4 } },
      { name: "wilted plant", svg: wilted, origin: { x: 134, y: 98 }, keys: hideFrom(0.46, 0.52), loop: { move: "sway", ms: 3600, angle: 2 } },
      { name: "plants and flowers", svg: plants, origin: { x: 100, y: 104 }, keys: { at: [0, 0.48, 0.58], opacity: [0, 0, 1], scaleY: [0.2, 0.2, 1] }, loop: { move: "bob", ms: 2400, x: 0.5 } },
      ...[0.24, 0.28, 0.32].map((from, i) => ({ name: `strike the ground, ${i + 1}`, svg: ring, origin: { x: 80, y: 98 }, keys: call(from) })),
      { name: "the ground opening", svg: opening, keys: showWhile(0.32, 0.36, 0.44, 0.48) },
      { name: "the cool water", svg: pool, origin: { x: 80, y: 103.6 }, keys: { at: [0, 0.42, 0.5], opacity: [0, 0, 1], scaleX: [0.1, 0.1, 1] }, loop: { move: "twinkle", ms: 1600, low: 0.85 } },
      { name: "spring coming out", svg: spring, origin: { x: 80, y: 102 }, keys: { at: [0, 0.4, 0.44], opacity: [0, 0, 1], scaleY: [0.1, 0.1, 1] }, loop: { move: "bob", ms: 420, y: 0.5 } },
      { name: "golden locusts falling", svg: falling, keys: showWhile(0.62, 0.66, 0.78, 0.82), loop: { move: "fall", ms: 2400 } },
      { name: "golden locusts on the ground", svg: settled, keys: showFrom(0.66, 0.74), loop: { move: "twinkle", ms: 1400, low: 0.55 } },
      { name: "light of his patience", svg: glow(80, 70, 52, "#FFF7DA", 0.06), keys: showFrom(0.82, 0.9), loop: { move: "twinkle", ms: 2600, low: 0.6 } }
    ],
    words: [
      { text: "Harm has touched me", from: 0.02, to: 0.2 },
      { text: "Strike the ground with your foot", from: 0.22, to: 0.38 },
      { text: "Cool water to wash and drink", from: 0.4, to: 0.6 },
      { text: "Golden locusts fell", from: 0.62, to: 0.8 },
      { text: "What an excellent servant!", from: 0.82, to: 1 }
    ]
  };
}

/** A five-pointed star, its middle at (x, y), `r` to its points, with a faint ring of light. */
function star(x: number, y: number, r: number, fill: string) {
  let d = "";
  for (let k = 0; k < 10; k += 1) {
    const a = -Math.PI / 2 + (k * Math.PI) / 5;
    const rr = k % 2 ? r * 0.42 : r;
    d += `${k ? "L" : "M"}${n(x + rr * Math.cos(a))} ${n(y + rr * Math.sin(a))} `;
  }
  return `<circle cx="${x}" cy="${y}" r="${n(r * 1.7)}" fill="${fill}" opacity="0.16"/><path d="${d.trim()} Z" fill="${fill}"/>`;
}

// Yusuf's dream: eleven stars, and the sun and the moon; I saw them bowing to me (Quran 12:4); his father told him not
// to tell his brothers (12:5); and years later: this is the meaning of my dream of before; my Lord has made it true
// (12:100). He is not drawn, nor his family: only the dream's sky, their home at night, its window shut on the secret,
// and the morning, when the eleven stars, the sun and the moon of the dream show again, bowed as they were.
function yusufDream(): SignArt {
  const dreamSky = sky("#3F3A7A", "#6A64AE", 70);
  const faint = stars([
    [6, 28],
    [40, 60],
    [70, 46],
    [100, 62],
    [154, 30],
    [152, 58],
    [60, 84],
    [104, 86]
  ]);
  const ground = "M0 98 C30 92 60 95 80 94 C100 93 130 96 160 92 L160 120 L0 120 Z";
  const dreamHill = `<path d="${ground}" fill="#2E2A5A"/>`;
  const house =
    `<rect x="58" y="73" width="44" height="24" fill="#4A4260"/><rect x="80" y="73" width="22" height="24" fill="#000000" opacity="0.12"/>` +
    `<rect x="56.6" y="70.8" width="46.8" height="2.4" fill="#3A3352"/><path d="M64 97 L64 87 Q68 82.6 72 87 L72 97 Z" fill="#241F36"/>` +
    `<rect x="83.4" y="78.4" width="11.2" height="8.2" fill="#2A2440"/>`;
  const night =
    nightSky(70) +
    stars([
      [14, 24],
      [44, 14],
      [76, 30],
      [110, 18],
      [140, 28],
      [26, 48],
      [126, 50]
    ]) +
    `<path d="${ground}" fill="#1A2440"/>` +
    house;
  const windowLight = `${glow(89, 82.5, 13, "#FFD27A", 0.12)}<rect x="84" y="79" width="10" height="7" fill="#FFD27A"/><path d="M89 79 L89 86 M84 82.5 L94 82.5" stroke="#C99A4A" stroke-width="0.6"/>`;
  const shutter = (x: number) =>
    `<rect x="${x}" y="78.6" width="5.2" height="7.8" fill="#6B5A3A"/><path d="M${n(x + 0.8)} 80.6 L${n(x + 4.4)} 80.6 M${n(x + 0.8)} 82.5 L${n(x + 4.4)} 82.5 M${n(x + 0.8)} 84.4 L${n(x + 4.4)} 84.4" stroke="#55472D" stroke-width="0.5"/>`;
  const closing = { at: [0, 0.72, 0.74, 0.78, 0.84, 0.9], opacity: [0, 0, 1, 1, 1, 0], scaleX: [0, 0, 0, 1, 1, 1] };
  const morning = sky("#F7CF8E", "#FCE7C0", 70) + `<path d="M0 96 C30 92 60 95 80 94 C100 93 130 96 160 92 L160 120 L0 120 Z" fill="#D9C08C"/>` + palm(22, 100, 16) + palm(138, 98, 18);
  // The eleven stars on an arc, the moon and the sun under it; bowing, each comes down and in, low over the land.
  const places = Array.from({ length: 11 }, (_, i) => {
    const x = n(14 + i * 13.2);
    const y = n(46 - 12 * Math.sin((Math.PI * i) / 10));
    const to = { x: n(80 + (x - 80) * 0.62), y: n(66 + 9 * (1 - Math.sin((Math.PI * i) / 10))) };
    return { x, y, dx: n(to.x - x), dy: n(to.y - y) };
  });
  const bows = (from: number, dx: number, dy: number): SignKeys => ({
    at: [0, from, at3(from + 0.02), 0.46, 0.58, 0.66, 0.72],
    opacity: [0, 0, 1, 1, 1, 1, 0],
    x: [0, 0, 0, 0, dx, dx, dx],
    y: [0, 0, 0, 0, dy, dy, dy],
    scale: [1, 1, 1, 1, 0.82, 0.82, 0.82]
  });
  const sunAt = (x: number, y: number, s: number, fill: string) => {
    let rays = "";
    for (let k = 0; k < 8; k += 1) {
      const a = (k * Math.PI) / 4;
      rays += `M${n(x + 8.6 * s * Math.cos(a))} ${n(y + 8.6 * s * Math.sin(a))} L${n(x + 10.4 * s * Math.cos(a))} ${n(y + 10.4 * s * Math.sin(a))} `;
    }
    return `${glow(x, y, 14 * s, "#FFE7A0", 0.14)}<circle cx="${x}" cy="${y}" r="${n(6.6 * s)}" fill="${fill}"/><path d="${rays.trim()}" stroke="${fill}" stroke-width="${n(1.2 * s)}" stroke-linecap="round"/>`;
  };
  const sun = sunAt(130, 60, 1, "#FFC93C");
  const moon = `${glow(30, 60, 12, "#F4F1DE", 0.12)}${crescent(30, 60, 6.4, 3.4, "#F4F1DE")}`;
  // In the morning, the dream made true: the same eleven stars, the sun and the moon, where they bowed.
  const madeTrue =
    places.map(({ x, y, dx, dy }) => star(n(x + dx), n(y + dy), n(3.2 * 0.82), "#E39A2A")).join("") +
    sunAt(112, 78, 0.82, "#F2A81E") +
    crescent(48, 78, n(6.4 * 0.82), 2.8, "#8F9BC0");
  return {
    kind: "yusuf-dream",
    ms: 12000,
    parts: [
      { name: "sky of the dream", svg: dreamSky, keys: hideFrom(0.66, 0.72) },
      { name: "far stars twinkling", svg: faint, keys: hideFrom(0.66, 0.72), loop: { move: "twinkle", ms: 1500, low: 0.2 } },
      { name: "hills of the dream", svg: dreamHill, keys: hideFrom(0.66, 0.72) },
      { name: "night at their home", svg: night, keys: showWhile(0.66, 0.72, 0.84, 0.9) },
      { name: "light in the window", svg: windowLight, keys: showWhile(0.68, 0.72, 0.84, 0.9), loop: { move: "twinkle", ms: 2000, low: 0.7 } },
      { name: "shutter closing, left", svg: shutter(83.8), origin: { x: 83.8, y: 82.5 }, keys: closing },
      { name: "shutter closing, right", svg: shutter(89), origin: { x: 94.2, y: 82.5 }, keys: closing },
      { name: "morning", svg: morning, keys: showFrom(0.84, 0.9) },
      { name: "morning light", svg: glow(80, 74, 60, "#FFF1C8", 0.06), keys: showFrom(0.86, 0.94), loop: { move: "twinkle", ms: 2600, low: 0.6 } },
      { name: "the dream made true", svg: madeTrue, keys: showFrom(0.86, 0.94), loop: { move: "twinkle", ms: 1800, low: 0.75 } },
      { name: "the moon", svg: moon, origin: { x: 30, y: 60 }, keys: bows(0.3, 18, 18) },
      { name: "the sun", svg: sun, origin: { x: 130, y: 60 }, keys: bows(0.28, -18, 18) },
      ...places.map(({ x, y, dx, dy }, i) => ({
        name: `star ${i + 1}`,
        svg: star(x, y, 3.2, "#FFE58A"),
        origin: { x, y },
        keys: bows(at3(0.02 + i * 0.016), dx, dy),
        loop: { move: "twinkle" as const, ms: 1300 + (i % 4) * 200, low: 0.7, phase: i * 0.13 }
      }))
    ],
    words: [
      { text: "Eleven stars", from: 0.02, to: 0.24 },
      { text: "The sun and the moon", from: 0.26, to: 0.44 },
      { text: "I saw them bowing to me", from: 0.46, to: 0.64 },
      { text: "Do not tell your brothers", from: 0.66, to: 0.82 },
      { text: "My Lord has made it true", from: 0.84, to: 1 }
    ]
  };
}

export const TRIAL_ART = { "ad-wind": adWind, river, qarun, madyan, ayyub, "yusuf-dream": yusufDream };
