import { animalAt, cloud, glow, GUSTS, n, palm, peaks, sky, tuft, type SignArt, type SignKeys, type SignPart } from "./signDraw";
import { basketOfDates, showWhile, sparkle, wall, way } from "./giveArt";
import { at3, showFrom } from "./storyArt";
import { home } from "./trialArt";

/**
 * Everyday charity, drawn as the stories are (giveArt.ts): water for a thirsty dog, a thorny branch moved out of the
 * way, a tree planted that a bird, a person and an animal eat from, and Umar's land at Khaybar kept for charity. Only
 * the land, the sky, homes, plants, animals and things are drawn. No Prophet, no Companion and no person is ever
 * drawn: things move by themselves, and where someone went, a dashed way shows it. A good deed's reward is sparks
 * rising from where it was done, never light coming down.
 */

/**
 * Sparks rising from each of `list`, one after another from `start`, `step` apart, each rising `rise`; gone once risen,
 * or, with `stay`, staying where it rose, twinkling.
 */
function risingSparks(label: string, list: [number, number][], start: number, step: number, { color = "#FFE7A0", rise = 30, stay = false } = {}): SignPart[] {
  return list.map(([x, y], i) => {
    const from = at3(start + i * step);
    const keys: SignKeys = stay
      ? { at: [0, from, at3(from + 0.01), at3(from + 0.05)], opacity: [0, 0, 1, 1], y: [0, 0, n(-rise * 0.2), -rise] }
      : { at: [0, from, at3(from + 0.01), at3(from + 0.05), at3(from + 0.06)], opacity: [0, 0, 1, 1, 0], y: [0, 0, n(-rise * 0.2), -rise, n(-rise * 1.2)] };
    return { name: `${label} ${i + 1}`, svg: sparkle(x, y, i % 2 ? 2 : 2.6, color), keys, loop: { move: "twinkle" as const, ms: 1000, low: 0.5, phase: i / list.length } };
  });
}

/** Keys that hold a part out of sight and away by (x, y), then bring it in, fading in at once, by `to`. */
const comeIn = (from: number, to: number, x: number, y = 0): SignKeys => ({
  at: [0, from, at3(from + 0.006), to],
  opacity: [0, 0, 1, 1],
  x: [x, x, n(x * (1 - 0.006 / (to - from))), 0],
  y: [y, y, n(y * (1 - 0.006 / (to - from))), 0]
});

// Water for a thirsty dog. A man walking on a way grew very thirsty, went down a well and drank. Coming out, he saw a
// dog panting and licking mud from thirst, and said: this dog is as thirsty as I was. He went down again, filled his
// shoe with water, and gave the dog a drink. Allah thanked him and forgave him; and there is a reward for serving any
// living being (Sahih al-Bukhari 2363, 2466). No one is drawn: a dashed way comes to the well and goes down into it,
// and the shoe rises out of the well by itself, full of water, and pours it out for the dog.

/** A khuff, the leather shoe, standing with its toe to the right, its middle at (x, y), full of water. */
const shoe = (x: number, y: number) =>
  `<path d="M${n(x - 2.4)} ${n(y - 4.2)} L${n(x + 1.6)} ${n(y - 4.2)} L${n(x + 2)} ${n(y + 0.8)} C${n(x + 4.2)} ${n(y + 1)} ${n(x + 6)} ${n(y + 2)} ${n(x + 6.2)} ${n(y + 3.6)} L${n(x - 2.6)} ${n(y + 3.6)} Z" fill="#6E4A2C"/>` +
  `<rect x="${n(x - 2.4)}" y="${n(y - 3.2)}" width="4" height="0.8" fill="#8E6640"/>` +
  `<path d="M${n(x - 2.6)} ${n(y + 3.6)} L${n(x + 6.2)} ${n(y + 3.6)}" stroke="#3E2816" stroke-width="0.7"/>` +
  `<ellipse cx="${n(x - 0.4)}" cy="${n(y - 4.2)}" rx="2" ry="0.6" fill="#3E2816"/><ellipse cx="${n(x - 0.4)}" cy="${n(y - 4.1)}" rx="1.7" ry="0.45" fill="#6CC0EE"/>`;

const DOG = "#C98B4D";
const DOG_FAR = "#A86F37";
const DOG_LIGHT = "#F1D3A8";
const INK = "#2B2B2B";

function thirstyDog(): SignArt {
  const dunes =
    `<path d="M-4 66 C14 57 34 56 54 66 Z M40 66 C62 54 90 53 112 66 Z M100 66 C120 58 146 57 166 66 Z" fill="#EBCB92"/>` +
    `<path d="M24 57.6 C34 58 44 61 54 66 L40 66 C36 62 30 59 24 57.6 Z M78 54.4 C92 55 104 60 112 66 L96 66 C92 61 86 57 78 54.4 Z" fill="#000000" opacity="0.06"/>`;
  const land =
    `<rect y="65" width="160" height="55" fill="#E9D3A2"/><path d="M0 65 L160 65" stroke="#D6BC88" stroke-width="0.7"/>` +
    [
      [14, 74],
      [72, 71],
      [146, 76],
      [30, 112],
      [150, 110],
      [128, 70]
    ]
      .map(([x, y]) => tuft(x, y, "#B9A35E", 3.6))
      .join("");
  const heat = [
    [18, 70],
    [64, 68],
    [104, 69],
    [140, 71]
  ]
    .map(([x, y]) => `<path d="M${x} ${y} q1.5 -1.4 3 0 q1.5 1.4 3 0 q1.5 -1.4 3 0" stroke="#FFFFFF" stroke-width="0.5" fill="none" opacity="0.5"/>`)
    .join("");
  const wellMouth = `<ellipse cx="52" cy="84" rx="9" ry="2.3" fill="#7D6A52"/><ellipse cx="52" cy="84.3" rx="7" ry="1.5" fill="#3F86B8"/>`;
  const well =
    `<ellipse cx="52" cy="91.2" rx="10.4" ry="1.3" fill="#000000" opacity="0.1"/>` +
    `<path d="M43 84 A9 2.3 0 0 0 61 84 L61 91 L43 91 Z" fill="#A89276"/>` +
    `<path d="M43 87.8 L61 87.8 M47.6 86.2 L47.6 87.8 M56.4 86.2 L56.4 87.8 M45.4 87.8 L45.4 91 M52 87.8 L52 91 M58.6 87.8 L58.6 91" stroke="#8A7458" stroke-width="0.5"/>` +
    `<path d="M43 84 A9 2.3 0 0 0 61 84" stroke="#6E5A44" stroke-width="0.9" fill="none"/>`;
  const ripples = `<ellipse cx="52" cy="84.3" rx="2.4" ry="0.5" stroke="#FFFFFF" stroke-width="0.4" fill="none"/><ellipse cx="52" cy="84.3" rx="4.4" ry="0.9" stroke="#FFFFFF" stroke-width="0.35" fill="none" opacity="0.7"/>`;
  const brown = "#A97E4C";
  const mud = `<ellipse cx="104" cy="100.4" rx="6.8" ry="1.8" fill="#8A6640"/><ellipse cx="102" cy="100.2" rx="2.4" ry="0.6" fill="#6E4E2E"/><ellipse cx="107" cy="100.8" rx="1.8" ry="0.5" fill="#6E4E2E"/>`;
  const pool = `<ellipse cx="104" cy="100.4" rx="7" ry="1.9" fill="#5EB1E4"/><ellipse cx="102" cy="100" rx="3" ry="0.5" fill="#FFFFFF" opacity="0.5"/>`;
  const stream = `<path d="M100.6 88.2 C102.6 89.4 103.6 93.4 103.4 99.6" stroke="#6CC0EE" stroke-width="1.3" fill="none" stroke-linecap="round"/>`;
  const drops = `<ellipse cx="53" cy="83.2" rx="0.45" ry="0.65" fill="#6CC0EE"/><ellipse cx="56.4" cy="82.8" rx="0.4" ry="0.6" fill="#6CC0EE"/>`;
  // The dog, facing left: its body and legs; its head and neck, turning about the shoulder to lick the ground; its tail.
  const dogBody =
    `<ellipse cx="124" cy="100.6" rx="10" ry="1.4" fill="#000000" opacity="0.12"/>` +
    `<rect x="128.6" y="91" width="2.4" height="9.6" rx="1.2" fill="${DOG_FAR}"/><rect x="117.4" y="91" width="2.4" height="9.6" rx="1.2" fill="${DOG_FAR}"/>` +
    `<ellipse cx="124.6" cy="89.6" rx="9.6" ry="4.6" fill="${DOG}"/><ellipse cx="120.6" cy="91.4" rx="4.4" ry="2.4" fill="${DOG_LIGHT}"/>` +
    `<rect x="131" y="91.6" width="2.6" height="9" rx="1.3" fill="${DOG}"/><rect x="119.8" y="91.6" width="2.6" height="9" rx="1.3" fill="${DOG}"/>`;
  const dogHead =
    `<path d="M119 86 C116.6 84 114.6 82.6 112.6 81.6 L109.6 85.6 C112 87.4 114.6 89.4 117.4 91.6 Z" fill="${DOG}"/>` +
    `<circle cx="110" cy="81" r="5" fill="${DOG}"/><ellipse cx="105.4" cy="83" rx="4.2" ry="2.7" fill="${DOG_LIGHT}"/>` +
    `<ellipse cx="101.6" cy="82" rx="1.4" ry="1.1" fill="${INK}"/>` +
    `<path d="M112.4 76.6 C115 77 115.8 81.6 114.2 84.8 C112.8 83.8 112 80.8 111.8 77.6 Z" fill="#7E4E24"/>` +
    `<circle cx="108.2" cy="79.6" r="0.95" fill="${INK}"/><circle cx="108.5" cy="79.3" r="0.38" fill="#FFFFFF"/>` +
    `<path d="M103.6 85 C103.2 87.6 104.6 88.8 105.8 87.8 L105.8 85.2 Z" fill="#E8737A"/>`;
  const tailDown = `<path d="M133.6 87.6 C136.6 89 137.6 92.6 137.2 96 C136 93.6 134.6 91.4 132.8 90 Z" fill="${DOG}"/>`;
  const tailUp = `<path d="M133.4 87.4 C136.4 85.6 137.6 82 136.6 78.6 C135.6 81.6 134.2 83.6 132.4 85.4 Z" fill="${DOG}"/>`;
  const walk = [0, 0.166, 0.176, 0.214];
  const pant = { move: "bob" as const, ms: 520, y: -0.35 };
  // The shoe rises out of the well, full, then goes along the way to the dog and pours the water out.
  const shoeAt = [0, 0.326, 0.34, 0.38, 0.44, 0.49, 0.53, 0.545, 0.6, 0.646, 0.66];
  const shoeMoves = { x: [0, 0, 0, 0, 0, 0, 44, 44, 44, 44, 44], y: [8, 8, 8, 8, -6, -6, 10, 10, 10, 10, 10], scale: [0.5, 0.5, 0.5, 0.5, 1, 1, 1, 1, 1, 1, 1], rotate: [0, 0, 0, 0, 0, 0, 0, 95, 95, 95, 95] };
  return {
    kind: "thirsty-dog",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#F8E3B4", "#FBEED3", 60) },
      { name: "the hot sun", svg: `${glow(132, 22, 18, "#FFE9A8", 0.1)}<circle cx="132" cy="22" r="7" fill="#FFD45E"/>`, loop: { move: "twinkle", ms: 2200, low: 0.85 } },
      { name: "dunes far away", svg: dunes },
      { name: "a palm far away", svg: palm(150, 68, 11), origin: { x: 150, y: 68 }, loop: { move: "sway", ms: 3600, angle: 0.8 } },
      { name: "the land", svg: land },
      { name: "heat rising from the land", svg: heat, loop: { move: "drip", ms: 2400, distance: -6 } },
      { name: "the way to the well", svg: way("M-2 101 C12 100 26 97 38 92", brown, 1.1), keys: showFrom(0.006, 0.03) },
      { name: "the top of the well", svg: wellMouth },
      { name: "ripples where the water was drunk", svg: ripples, keys: { at: [0, 0.06, 0.07, 0.11, 0.12], opacity: [0, 0, 1, 1, 0], scale: [0.5, 0.5, 0.7, 1.2, 1.3] }, origin: { x: 52, y: 84.3 } },
      { name: "the shoe, full of water", svg: shoe(52, 78), keys: { at: shoeAt, opacity: [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0], ...shoeMoves }, origin: { x: 52, y: 78 } },
      { name: "drops from the shoe", svg: drops, keys: { at: shoeAt, opacity: [0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0], ...shoeMoves }, origin: { x: 52, y: 78 }, loop: { move: "drip", ms: 700, distance: 4 } },
      { name: "the well", svg: well },
      { name: "the way down into the well", svg: way("M38 92 C40.6 90.4 42.6 87.6 46 84.6", brown, 1.1), keys: showFrom(0.034, 0.056) },
      { name: "mud the dog licks", svg: mud, keys: showFrom(0.166, 0.186) },
      { name: "water poured out for the dog", svg: pool, keys: { at: [0, 0.552, 0.596], opacity: [0, 0, 1], scale: [0.3, 0.3, 1] }, origin: { x: 104, y: 100.4 }, loop: { move: "twinkle", ms: 1500, low: 0.8 } },
      { name: "the way to the dog", svg: way("M61 89.4 C70 92.6 82 96 93 97", brown, 1.1), keys: showFrom(0.486, 0.5) },
      { name: "light where the good was done", svg: glow(92, 90, 20, "#FFE9A8", 0.12), keys: showFrom(0.648, 0.672), loop: { move: "twinkle", ms: 1600, low: 0.6 } },
      ...risingSparks(
        "a spark of the good deed, rising",
        [
          [86, 95],
          [92, 93],
          [98, 95],
          [89, 91],
          [95, 92]
        ],
        0.65,
        0.016,
        { stay: true, rise: 24 }
      ),
      { name: "water pouring from the shoe", svg: stream, keys: { at: [0, 0.546, 0.554, 0.59, 0.6], opacity: [0, 0, 1, 1, 0] }, loop: { move: "twinkle", ms: 400, low: 0.6 } },
      { name: "the dog's tail, hanging", svg: tailDown, keys: { at: [...walk, 0.65, 0.662], opacity: [0, 0, 1, 1, 1, 0], x: [44, 44, 36, 0, 0, 0] }, loop: pant },
      { name: "the dog's tail, wagging", svg: tailUp, keys: { at: [0, 0.65, 0.662], opacity: [0, 0, 1] }, origin: { x: 133, y: 87.4 }, loop: { move: "sway", ms: 420, angle: 18 } },
      { name: "the thirsty dog", svg: dogBody, keys: { at: walk, opacity: [0, 0, 1, 1], x: [44, 44, 36, 0] }, loop: pant },
      {
        name: "the dog's head, licking",
        svg: dogHead,
        keys: { at: [...walk, 0.23, 0.256, 0.65, 0.672], opacity: [0, 0, 1, 1, 1, 1, 1, 1], x: [44, 44, 36, 0, 0, 0, 0, 0], rotate: [0, 0, 0, 0, 0, -68, -68, 8] },
        origin: { x: 116, y: 87 },
        loop: { ...pant, rotate: 3.5 }
      },
      // Any living being: a lamb and two sparrows come to the water too.
      { name: "a lamb comes to drink", svg: animalAt("sheep", 85, 89.8, 0.14), keys: comeIn(0.826, 0.9, -98), origin: { x: 92, y: 99 }, loop: { move: "bob", ms: 800, y: -0.4 } },
      { name: "a sparrow comes to drink", svg: animalAt("sparrow", 102, 94.4, 0.11, true), keys: comeIn(0.83, 0.884, 30, -56), loop: { move: "bob", ms: 600, y: -0.8 } },
      { name: "another sparrow comes to drink", svg: animalAt("sparrow", 108.6, 95, 0.1, true), keys: comeIn(0.84, 0.894, 36, -60), loop: { move: "bob", ms: 600, y: -0.8, phase: 0.5 } },
      ...risingSparks(
        "a spark of reward for a living being",
        [
          [91, 88],
          [104, 91],
          [110, 90],
          [112, 76]
        ],
        0.9,
        0.012,
        { color: "#FFF0B8", rise: 20 }
      )
    ],
    words: [
      { text: "Thirsty, he drank from a well", from: 0.02, to: 0.16 },
      { text: "A dog licking mud from thirst", from: 0.18, to: 0.32 },
      { text: "He filled his shoe with water", from: 0.34, to: 0.48 },
      { text: "And gave the dog a drink", from: 0.5, to: 0.64 },
      { text: "Allah thanked him and forgave him", from: 0.66, to: 0.82 },
      { text: "A reward for any living being", from: 0.84, to: 1 }
    ]
  };
}

// The thorny branch. While a man was walking along a way, he found a thorny branch on it and moved it out of the way;
// Allah thanked him for it and forgave him (Sahih al-Bukhari 652); and removing harm from the way is charity (Sahih
// al-Bukhari 2989). No one is drawn: a dashed way goes along the road; the wind blows a thorny branch across it, and
// the branch moves itself off the road; sparks rise from where it lay, and camels, a donkey and sheep pass along the
// clear road.

/** A thorny branch lying from (x1, y1) to (x2, y2): a stick with twigs, thorns along it, and a few small leaves. */
function thornyBranchArt(x1: number, y1: number, x2: number, y2: number) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy);
  const ux = dx / len;
  const uy = dy / len;
  const at = (t: number, side: number) => [x1 + dx * t + -uy * side, y1 + dy * t + ux * side];
  const stick = `<path d="M${n(x1)} ${n(y1)} L${n(x2)} ${n(y2)}" stroke="#7A5634" stroke-width="1.5" stroke-linecap="round"/>`;
  const twigs = [
    [0.28, -1],
    [0.56, 1],
    [0.78, -1]
  ]
    .map(([t, side]) => {
      const [bx, by] = at(t, 0);
      const ex = bx + ux * 3.2 + -uy * 4.4 * side;
      const ey = by + uy * 3.2 + ux * 4.4 * side;
      return `<path d="M${n(bx)} ${n(by)} L${n(ex)} ${n(ey)}" stroke="#7A5634" stroke-width="0.8" stroke-linecap="round"/><ellipse cx="${n(ex)}" cy="${n(ey)}" rx="1.3" ry="0.7" fill="#7FA650"/>`;
    })
    .join("");
  let thorns = "";
  const count = Math.round(len / 2.2);
  for (let i = 1; i < count; i += 1) {
    const t = i / count;
    const side = i % 2 ? 1 : -1;
    const [bx, by] = at(t, side * 0.5);
    thorns += `<path d="M${n(bx)} ${n(by)} L${n(bx + ux * 0.7 + -uy * 1.7 * side)} ${n(by + uy * 0.7 + ux * 1.7 * side)}" stroke="#5E3F22" stroke-width="0.55" stroke-linecap="round"/>`;
  }
  return stick + twigs + thorns;
}

function thornyBranch(): SignArt {
  const hills = peaks(
    [
      [30, 16, 30],
      [84, 22, 36],
      [140, 14, 28]
    ],
    68,
    "#B7A27A",
    false
  );
  const land =
    `<rect y="67" width="160" height="53" fill="#D3D7A0"/><path d="M0 67 L160 67" stroke="#BFC48A" stroke-width="0.7"/>` +
    [
      [10, 76],
      [48, 74],
      [100, 75],
      [150, 77],
      [20, 112],
      [96, 110],
      [140, 114],
      [118, 104]
    ]
      .map(([x, y], i) => tuft(x, y, i % 2 ? "#8FAE58" : "#7FA650", 4))
      .join("");
  const road =
    `<path d="M0 84 C40 82.4 100 81 160 79.4 L160 96 C100 97.6 40 99 0 100.4 Z" fill="#E7D2A6"/>` +
    `<path d="M0 84 C40 82.4 100 81 160 79.4 M0 100.4 C40 99 100 97.6 160 96" stroke="#CFB486" stroke-width="0.7" fill="none"/>`;
  const stones = `<ellipse cx="34" cy="102.4" rx="1.6" ry="0.9" fill="#B9A988"/><ellipse cx="122" cy="99" rx="1.4" ry="0.8" fill="#B9A988"/><ellipse cx="148" cy="78" rx="1.2" ry="0.7" fill="#B9A988"/>`;
  const walking = ["M-2 92.6 C8 92.3 18 92 28 91.6", "M28 91.6 C36 91.3 44 91 52 90.7", "M52 90.7 C56 90.6 60 90.5 64 90.4"];
  const walkingOn = ["M64 90.4 C72 90.2 80 90 88 89.6", "M88 89.6 C104 89.2 120 88.8 136 88.4", "M136 88.4 C146 88.2 154 88 162 87.8"];
  const dust = `<circle cx="72" cy="92" r="1.6" fill="#EADBB8"/><circle cx="76" cy="91" r="2" fill="#EADBB8"/><circle cx="80.6" cy="92.2" r="1.5" fill="#EADBB8"/>`;
  return {
    kind: "thorny-branch",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 62) },
      { name: "the sun", svg: `${glow(24, 20, 12, "#FFF0C0", 0.12)}<circle cx="24" cy="20" r="5.4" fill="#FFE07A"/>` },
      { name: "clouds", svg: cloud(70, 18, 0.7, "#FFFFFF", 0.9) + cloud(124, 28, 0.6, "#FFFFFF", 0.85), loop: { move: "slide", ms: 12000 } },
      { name: "the hills", svg: hills },
      { name: "the land", svg: land },
      { name: "palms by the road", svg: palm(16, 81, 21) + palm(136, 77, 17), origin: { x: 74, y: 80 }, loop: { move: "sway", ms: 3400, angle: 0.6 } },
      { name: "the road", svg: road },
      { name: "stones by the road", svg: stones },
      ...walking.map((d, i) => ({ name: `the way along the road ${i + 1}`, svg: way(d, "#9C7A4C", 1.1), keys: showFrom(at3(0.01 + i * 0.04), at3(0.03 + i * 0.04)) })),
      ...walkingOn.map((d, i) => ({ name: `the way on along the road ${i + 1}`, svg: way(d, "#9C7A4C", 1.1), keys: showFrom(at3(0.5 + i * 0.02), at3(0.515 + i * 0.02)) })),
      { name: "a gust of wind", svg: GUSTS, keys: showWhile(0.186, 0.2, 0.3, 0.33), loop: { move: "slide", ms: 2000 } },
      { name: "dust where the branch fell", svg: dust, keys: { at: [0, 0.3, 0.315, 0.34, 0.36], opacity: [0, 0, 1, 1, 0], scale: [0.4, 0.4, 0.9, 1.2, 1.3] }, origin: { x: 76, y: 92 } },
      { name: "light where the road was cleared", svg: glow(76, 89, 20, "#FFF4D0", 0.09), keys: showFrom(0.606, 0.63), loop: { move: "twinkle", ms: 1600, low: 0.6 } },
      ...risingSparks(
        "a spark of the good deed, rising",
        [
          [70, 90],
          [76, 88],
          [82, 89],
          [73, 86],
          [79, 86]
        ],
        0.61,
        0.016,
        { stay: true, rise: 24 }
      ),
      {
        name: "the thorny branch",
        svg: thornyBranchArt(64, 97, 88, 83),
        keys: {
          at: [0, 0.19, 0.2, 0.3, 0.33, 0.43, 0.45, 0.53, 0.55],
          opacity: [0, 0, 1, 1, 1, 1, 1, 1, 1],
          x: [96, 96, 86, 4, 0, 0, 0, -12, -14],
          y: [-34, -34, -30, -1, 0, 0, -3, 16, 17],
          rotate: [200, 200, 180, -12, 0, 0, 0, 26, 30]
        },
        origin: { x: 76, y: 90 }
      },
      // Along the clear road: two camels, a donkey and two sheep, safely past where the branch lay.
      { name: "a camel on the road", svg: animalAt("camel", 22, 75.4, 0.22, true), keys: comeIn(0.806, 0.97, 140), origin: { x: 33, y: 91 }, loop: { move: "bob", ms: 900, y: -0.5, rotate: 0.8 } },
      { name: "another camel on the road", svg: animalAt("camel", 48, 75.6, 0.2, true), keys: comeIn(0.816, 0.975, 116), origin: { x: 58, y: 90 }, loop: { move: "bob", ms: 900, y: -0.5, rotate: 0.8, phase: 0.4 } },
      { name: "a donkey on the road", svg: animalAt("donkey", 74, 77.2, 0.17, true), keys: comeIn(0.83, 0.98, 90), origin: { x: 82, y: 89 }, loop: { move: "bob", ms: 700, y: -0.4, rotate: 0.6 } },
      { name: "sheep on the road", svg: animalAt("sheep", 98, 79.6, 0.12, true) + animalAt("sheep", 111, 79.2, 0.12, true), keys: comeIn(0.846, 0.99, 64), origin: { x: 110, y: 88 }, loop: { move: "bob", ms: 600, y: -0.4 } }
    ],
    words: [
      { text: "Walking along a way", from: 0.02, to: 0.18 },
      { text: "A thorny branch across the way", from: 0.2, to: 0.4 },
      { text: "He moved it out of the way", from: 0.42, to: 0.6 },
      { text: "Allah thanked him and forgave him", from: 0.62, to: 0.8 },
      { text: "Removing harm from the way is charity", from: 0.82, to: 1 }
    ]
  };
}

// Planting. No Muslim plants a tree or sows a seed, and then a bird, a person or an animal eats from it, but it is
// charity for him (Sahih al-Bukhari 2320, 6012). No one is drawn: a dashed way comes to the field and a seed falls into
// the soil; a tree grows from it and bears fruit; a bird eats, a fruit goes along a dashed way to a home, and a goat
// eats; then sparks rise from the tree.

/** A ripe pomegranate at (x, y). */
const fruit = (x: number, y: number, r = 1.7) =>
  `<circle cx="${x}" cy="${y}" r="${r}" fill="#D2413A"/><path d="M${n(x - 0.6)} ${n(y - r + 0.2)} L${x} ${n(y - r - 0.9)} L${n(x + 0.6)} ${n(y - r + 0.2)} Z" fill="#9C2A26"/><circle cx="${n(x - r * 0.4)}" cy="${n(y - r * 0.35)}" r="${n(r * 0.3)}" fill="#F08A7A"/>`;

function planting(): SignArt {
  const hills = peaks(
    [
      [20, 14, 28],
      [74, 20, 34],
      [130, 16, 30]
    ],
    66,
    "#9CBF7A",
    false
  );
  const land =
    `<rect y="65" width="160" height="55" fill="#C3D98F"/><path d="M0 65 L160 65" stroke="#AFC77C" stroke-width="0.7"/>` +
    [
      [8, 74],
      [44, 72],
      [118, 73],
      [152, 76],
      [10, 112],
      [56, 114],
      [124, 112],
      [150, 104]
    ]
      .map(([x, y], i) => tuft(x, y, i % 2 ? "#6FA548" : "#5E9A3E", 4.4))
      .join("");
  const soil = `<ellipse cx="80" cy="98" rx="17" ry="3.6" fill="#A9845A"/><path d="M66 98 L94 98 M68.6 99.6 L91.4 99.6 M68.6 96.4 L91.4 96.4" stroke="#94704A" stroke-width="0.5"/>`;
  const seed = `<ellipse cx="80" cy="84" rx="1.1" ry="1.5" fill="#6E4A2C"/>`;
  const mound = `<ellipse cx="80" cy="96.6" rx="3.4" ry="1.3" fill="#8E6A42"/>`;
  const sprout =
    `<path d="M80 96.4 L80 91.6" stroke="#5E9E45" stroke-width="0.9"/>` +
    `<path d="M80 93 C77 91 76 89 77 88 C79 89 80 91 80 93 Z M80 92.4 C83 90.6 84 88.6 83 87.6 C81 88.4 80 90.4 80 92.4 Z" fill="#6FB24E"/>`;
  const crown = [
    [68, 73, 8.5],
    [78, 67, 10],
    [90, 71, 9],
    [72, 80, 7],
    [89, 79, 7.5],
    [80, 75, 10]
  ];
  const tree =
    `<path d="M93 80 C96 82.4 98 84.4 98.4 85.8" stroke="#8A5E3A" stroke-width="0.8" fill="none" stroke-linecap="round"/><ellipse cx="96.6" cy="83.2" rx="1.6" ry="0.8" fill="#5E9E45"/>` +
    `<path d="M78.4 97 C79 91 78.6 86 77 80.6 L79.2 80 C80.2 83 80.8 85 81.4 87 C82.6 84 84 82 86 80.2 L87 81.2 C84.6 83.6 82.6 87.4 82 91 L81.8 97 Z" fill="#8A5E3A"/>` +
    crown.map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#5E9E45"/>`).join("") +
    crown.map(([x, y, r]) => `<circle cx="${n(x - r * 0.25)}" cy="${n(y - r * 0.3)}" r="${n(r * 0.55)}" fill="#79B65A"/>`).join("");
  const onTree = [
    [70, 76],
    [76, 69],
    [86, 66],
    [92, 75],
    [82, 79],
    [66, 70],
    [84, 72]
  ];
  // The fruit a bird eats, the fruit a person takes home, and the low fruit a goat eats.
  const birdFruit = [90, 68.6];
  const takenFruit = [71, 81.4];
  const lowFruit = [98.4, 87.4];
  const ripen = (more: { at: number[]; opacity: number[]; scale?: number[]; x?: number[]; y?: number[] }): SignKeys => ({
    at: [0, 0.25, 0.28, ...more.at],
    opacity: [0, 0, 1, ...more.opacity],
    scale: [0.4, 0.4, 1, ...(more.scale ?? more.at.map(() => 1))],
    ...(more.x ? { x: [0, 0, 0, ...more.x] } : {}),
    ...(more.y ? { y: [0, 0, 0, ...more.y] } : {})
  });
  const homeX = 18;
  return {
    kind: "planting",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 60) },
      { name: "the sun", svg: `${glow(138, 20, 13, "#FFF0C0", 0.12)}<circle cx="138" cy="20" r="5.6" fill="#FFE07A"/>` },
      { name: "clouds", svg: cloud(40, 20, 0.7, "#FFFFFF", 0.9) + cloud(100, 14, 0.6, "#FFFFFF", 0.85), loop: { move: "slide", ms: 12000 } },
      { name: "the hills", svg: hills },
      { name: "the land", svg: land },
      { name: "a home", svg: home(homeX, 102, 16, 11, "#D9B98A", "#C29C6A", "#6B4A2E") },
      { name: "soil for planting", svg: soil },
      { name: "light behind the tree", svg: glow(80, 76, 28, "#FFF1C4", 0.1), keys: showFrom(0.846, 0.87), loop: { move: "twinkle", ms: 1600, low: 0.6 } },
      { name: "the way to the soil", svg: way("M162 110 C134 110 112 105 95 99.6", "#FFF6DC", 1.1), keys: showFrom(0.006, 0.026) },
      { name: "a seed, sown", svg: seed, keys: { at: [0, 0.03, 0.036, 0.07, 0.08], opacity: [0, 0, 1, 1, 0], y: [0, 0, 0, 12, 12] } },
      { name: "the soil over the seed", svg: mound, keys: showFrom(0.07, 0.09) },
      { name: "a sprout", svg: sprout, keys: { at: [0, 0.166, 0.186, 0.2, 0.22], opacity: [0, 0, 1, 1, 0], scale: [0.2, 0.2, 1, 1, 1] }, origin: { x: 80, y: 96.6 } },
      { name: "the tree, grown", svg: tree, keys: { at: [0, 0.19, 0.2, 0.25], opacity: [0, 0, 1, 1], scale: [0.1, 0.1, 0.16, 1] }, origin: { x: 80, y: 97 } },
      { name: "fruit on the tree", svg: onTree.map(([x, y]) => fruit(x, y)).join(""), keys: { at: [0, 0.25, 0.28], opacity: [0, 0, 1], scale: [0.6, 0.6, 1] }, origin: { x: 80, y: 74 } },
      { name: "the fruit the bird eats", svg: fruit(birdFruit[0], birdFruit[1]), keys: ripen({ at: [0.39, 0.42], opacity: [1, 0], scale: [1, 0.3] }), origin: { x: birdFruit[0], y: birdFruit[1] } },
      {
        name: "the fruit taken home",
        svg: fruit(takenFruit[0], takenFruit[1]),
        keys: ripen({ at: [0.5, 0.52, 0.6, 0.646, 0.66], opacity: [1, 1, 1, 1, 0], x: [0, 0, -55, -55, -55], y: [0, 16, 18.6, 18.6, 18.6] }),
        origin: { x: takenFruit[0], y: takenFruit[1] }
      },
      { name: "the low fruit the goat eats", svg: fruit(lowFruit[0], lowFruit[1]), keys: ripen({ at: [0.72, 0.75], opacity: [1, 0], scale: [1, 0.3] }), origin: { x: lowFruit[0], y: lowFruit[1] } },
      { name: "the way from the home to the tree", svg: way("M26 101 C40 101.4 56 100.2 70 97.6", "#FFF6DC", 1.1), keys: showFrom(0.486, 0.5) },
      { name: "a bird eats", svg: animalAt("sparrow", 87.5, 63.4, 0.14, true), keys: comeIn(0.326, 0.37, 44, -40), origin: { x: 94, y: 68 }, loop: { move: "bob", ms: 700, y: -0.5, rotate: 5 } },
      { name: "a goat eats", svg: animalAt("goat", 95.2, 82.4, 0.2, true), keys: comeIn(0.646, 0.7, 70), origin: { x: 105, y: 96 }, loop: { move: "bob", ms: 800, y: -0.4, rotate: 1.5 } },
      ...risingSparks(
        "a spark of charity, rising",
        [
          [92, 64],
          [71, 80],
          [98, 84],
          [80, 92],
          [86, 72]
        ],
        0.85,
        0.02,
        { stay: true, rise: 22 }
      )
    ],
    words: [
      { text: "Plant a tree or sow a seed", from: 0.02, to: 0.16 },
      { text: "It grows and bears fruit", from: 0.18, to: 0.32 },
      { text: "A bird eats from it", from: 0.34, to: 0.48 },
      { text: "A person eats from it", from: 0.5, to: 0.64 },
      { text: "An animal eats from it", from: 0.66, to: 0.82 },
      { text: "Charity for the one who planted it", from: 0.84, to: 1 }
    ]
  };
}

// Umar's land at Khaybar. Umar got land at Khaybar, the best he ever had, and asked the Prophet ﷺ what to do with it.
// He said: if you wish, keep the land itself and give its fruit in charity. So Umar gave it, on condition that it is
// never sold, given away or inherited, for the poor, relatives and others; and whoever keeps it may eat from it fairly
// and feed a friend, storing nothing for himself (Sahih al-Bukhari 2737, 2777). No one is drawn: the palms of Khaybar,
// a wall that rises around them, and baskets of dates going out along dashed ways; silver comes to buy the land and
// goes back; the keeper's home, and his storeroom, left empty.
function waqf(): SignArt {
  const hills = peaks(
    [
      [18, 12, 26],
      [62, 16, 30],
      [110, 11, 26],
      [148, 14, 24]
    ],
    62,
    "#8C7766",
    false
  );
  const land = `<rect y="61" width="160" height="59" fill="#DCC694"/><path d="M0 61 L160 61" stroke="#C9B07C" stroke-width="0.7"/>`;
  const grove = `<path d="M26 68 L134 68 L139 96 L21 96 Z" fill="#A9C77C"/>`;
  const spring = `<path d="M23 84 C48 82 70 86 94 83 C110 81 122 84 137 83" stroke="#5EA9DA" stroke-width="1.6" fill="none" stroke-linecap="round"/>`;
  const backRow: [number, number][] = [38, 56, 74, 92, 110, 126].map((x) => [x, 77]);
  const frontRow: [number, number][] = [30, 46, 62, 120, 133].map((x) => [x, 92]);
  // Small bunches of ripe dates under each crown.
  const bunch = (x: number, y: number) =>
    [
      [0, 0],
      [1.6, 0.6],
      [-1.6, 0.6],
      [0.8, 1.9],
      [-0.8, 1.9]
    ]
      .map(([dx, dy]) => `<ellipse cx="${n(x + dx)}" cy="${n(y + dy)}" rx="0.9" ry="1.2" fill="#9C3D1E"/>`)
      .join("");
  const bunches = [...backRow.map(([x, y]) => [x + 14 * 0.08, y - 14 + 2.2]), ...frontRow.map(([x, y]) => [x + 16 * 0.08, y - 16 + 2.4])]
    .map(([x, y]) => bunch(n(x), n(y)))
    .join("");
  const backWall = wall(26, 134, 68, 2.4);
  const sideWalls = `<path d="M26 68 L21 96 L22.8 96 L27.6 68 Z M134 68 L139 96 L137.2 96 L132.4 68 Z" fill="#C7A272"/>`;
  const frontWall = wall(19, 73, 96, 3.6) + wall(87, 141, 96, 3.6);
  const gate = `<rect x="72.4" y="89.6" width="2.4" height="6.4" fill="#AD8758"/><rect x="85.2" y="89.6" width="2.4" height="6.4" fill="#AD8758"/><path d="M72.6 90 Q80 85 87.4 90" stroke="#AD8758" stroke-width="1.6" fill="none"/>`;
  const homes =
    home(18, 114, 16, 11, "#CDB086", "#B39368", "#5E432A") + home(144, 114, 16, 11, "#D3B585", "#BC9A6A", "#6B4A2E") + home(50, 116, 12, 9, "#D9BB8C", "#C29F6E", "#6B4A2E");
  const keeperHome = home(98, 93, 11, 8, "#D6B07C", "#BD9462", "#6B4A2E");
  const storeroom =
    `<rect x="106" y="86.6" width="8" height="6.4" fill="#C9A878"/><rect x="105.4" y="85.4" width="9.2" height="1.4" fill="#B08C5C"/>` +
    `<rect x="108.4" y="88.4" width="3.2" height="4.6" fill="#3A2818"/><path d="M111.6 88.4 L113.6 89 L113.6 93.3 L111.6 93 Z" fill="#8A6440"/>`;
  const coins = [-2.4, 0, 2.4, -1.2, 1.2, 0]
    .map((dx, i) => `<circle cx="${n(152 + dx)}" cy="${n(99 - (i < 3 ? 0 : i < 5 ? 1.6 : 3.2))}" r="1.3" fill="#DDE2E8" stroke="#98A2AD" stroke-width="0.35"/>`)
    .join("");
  const cream = "#FFF6DC";
  return {
    kind: "waqf",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 58) },
      { name: "the sun", svg: `${glow(142, 16, 12, "#FFF0C0", 0.12)}<circle cx="142" cy="16" r="5.4" fill="#FFE07A"/>` },
      { name: "clouds", svg: cloud(50, 16, 0.7, "#FFFFFF", 0.9) + cloud(104, 24, 0.6, "#FFFFFF", 0.85), loop: { move: "slide", ms: 12000 } },
      { name: "the dark hills of Khaybar", svg: hills },
      { name: "the land", svg: land },
      { name: "the land at Khaybar", svg: grove },
      { name: "the best he had", svg: glow(80, 82, 30, "#FFF4D0", 0.09), keys: showFrom(0.04, 0.09), loop: { move: "twinkle", ms: 1800, low: 0.6 } },
      { name: "its spring", svg: spring, loop: { move: "twinkle", ms: 1400, low: 0.7 } },
      { name: "the back wall", svg: backWall, keys: { at: [0, 0.17, 0.21], opacity: [0, 0, 1], scaleY: [0.1, 0.1, 1] }, origin: { x: 80, y: 68 } },
      { name: "palms of Khaybar", svg: backRow.map(([x, y]) => palm(x, y, 14)).join(""), origin: { x: 80, y: 77 }, loop: { move: "sway", ms: 3400, angle: 0.5 } },
      { name: "the side walls", svg: sideWalls, keys: showFrom(0.18, 0.22) },
      { name: "more palms of Khaybar", svg: frontRow.map(([x, y]) => palm(x, y, 16)).join(""), origin: { x: 80, y: 92 }, loop: { move: "sway", ms: 3800, angle: 0.5 } },
      // Ripe dates; picked when its fruit is given; ripe again.
      { name: "ripe dates", svg: bunches, keys: { at: [0, 0.03, 0.08, 0.34, 0.356, 0.36, 0.56, 0.6], opacity: [0, 0, 1, 1, 0, 0, 0, 1], scale: [0.6, 0.6, 1, 1, 1, 0.6, 0.6, 1] }, origin: { x: 80, y: 72 } },
      // The keeper's home and his storeroom, inside the wall.
      { name: "the keeper's home", svg: keeperHome, keys: showFrom(0.646, 0.662) },
      { name: "the keeper's storeroom, empty", svg: storeroom, keys: showFrom(0.646, 0.662) },
      { name: "the front wall", svg: frontWall, keys: { at: [0, 0.17, 0.21], opacity: [0, 0, 1], scaleY: [0.1, 0.1, 1] }, origin: { x: 80, y: 96 } },
      { name: "the gate", svg: gate, keys: { at: [0, 0.2, 0.23], opacity: [0, 0, 1], scaleY: [0.2, 0.2, 1] }, origin: { x: 80, y: 96 } },
      { name: "homes of the poor, of relatives and of a friend", svg: homes },
      // Its fruit given: baskets go out of the gate to a home of the poor and to relatives.
      { name: "the way to a home of the poor", svg: way("M77 98.6 C62 102 44 106 28 108.6", cream, 1.1), keys: showWhile(0.336, 0.35, 0.486, 0.5) },
      { name: "the way to relatives", svg: way("M83 98.6 C98 102 116 106 132 108.6", cream, 1.1), keys: showWhile(0.336, 0.35, 0.486, 0.5) },
      { name: "a basket of its dates for the poor", svg: basketOfDates(80, 100), keys: { at: [0, 0.34, 0.356, 0.43, 0.486, 0.5], opacity: [0, 0, 1, 1, 1, 0], x: [0, 0, 0, -50, -50, -50], y: [0, 0, 0, 10, 10, 10] } },
      { name: "a basket of its dates for relatives", svg: basketOfDates(80, 100), keys: { at: [0, 0.34, 0.356, 0.43, 0.486, 0.5], opacity: [0, 0, 1, 1, 1, 0], x: [0, 0, 0, 50, 50, 50], y: [0, 0, 0, 10, 10, 10] } },
      // Never sold: silver comes along the road to buy it, and goes back.
      { name: "the road", svg: way("M162 99.6 C140 99.8 112 99.8 90 99.2", cream, 1.1), keys: showWhile(0.486, 0.5, 0.646, 0.66) },
      { name: "the gate stays shut", svg: glow(80, 92, 10, "#FFF4D0", 0.2), keys: showWhile(0.53, 0.54, 0.58, 0.6) },
      { name: "silver to buy the land, sent back", svg: coins, keys: { at: [0, 0.49, 0.5, 0.53, 0.545, 0.58, 0.646, 0.66], opacity: [0, 0, 1, 1, 1, 1, 1, 0], x: [0, 0, 0, -58, -58, 0, 0, 0] } },
      // The keeper eats from it, and feeds a friend.
      { name: "dates for the keeper", svg: basketOfDates(121, 95), keys: { at: [0, 0.662, 0.67, 0.7], opacity: [0, 0, 1, 1], x: [0, 0, 0, -26], y: [0, 0, 0, -1] } },
      { name: "the way to a friend's home", svg: way("M93 94.6 C90 96.4 86 98 80 98.6 C72 101.6 64 106 58 109", cream, 1.1), keys: showWhile(0.71, 0.72, 0.826, 0.836) },
      { name: "dates for a friend", svg: basketOfDates(95, 95), keys: { at: [0, 0.716, 0.726, 0.746, 0.77], opacity: [0, 0, 1, 1, 1], x: [0, 0, 0, -15, -36], y: [0, 0, 0, 4.6, 16] } },
      // Storing nothing: a basket goes toward the storeroom, stops, and goes out to the home of the poor instead.
      { name: "the way out to the poor", svg: way("M112 95 C100 96.6 90 98 80 98.6 C64 102 46 106 30 108.6", cream, 1.1), keys: showFrom(0.836, 0.846) },
      {
        name: "a basket not stored",
        svg: basketOfDates(121, 95),
        keys: { at: [0, 0.83, 0.84, 0.86, 0.88, 0.91, 0.96], opacity: [0, 0, 1, 1, 1, 1, 1], x: [0, 0, 0, -9, -9, -41, -91], y: [0, 0, 0, 0, 0, 4.6, 15] }
      }
    ],
    words: [
      { text: "Land at Khaybar, the best he had", from: 0.02, to: 0.16 },
      { text: "Keep the land itself", from: 0.18, to: 0.32 },
      { text: "And give its fruit in charity", from: 0.34, to: 0.48 },
      { text: "Never sold, gifted or inherited", from: 0.5, to: 0.64 },
      { text: "Its keeper may eat and feed a friend", from: 0.66, to: 0.82 },
      { text: "Storing nothing for himself", from: 0.84, to: 1 }
    ]
  };
}

export const CHARITY_ART = { "thirsty-dog": thirstyDog, "thorny-branch": thornyBranch, planting, waqf };
