import { DAY_SKY, GUSTS, animalAt, cloud, dateBunch, flame, glow, n, nightSky, palm, sky, stars, tuft, type SignArt, type SignKeys } from "./signDraw";
import { at3, curls, showFrom } from "./storyArt";

/**
 * More signs in the stories of the Prophets, drawn as the others are (storyArt.ts): the fire Musa saw by the mount,
 * and the call from the tree in the holy valley of Tuwa; his staff that swallowed what the sorcerers faked; his journey
 * to where the two seas meet, with the fish, the boat and the wall; the barrier of iron and copper between two
 * mountains; Yunus, the laden ship and the great fish; and the palm tree, the stream and the dates for Maryam. Only the
 * signs are drawn: the land, the sky, the sea, plants, animals and things. No Prophet, no person and no angel is ever
 * drawn: things move by themselves, as the ark's planks do.
 */

/** Keys that show a part from `from` to `to`, then hide it from `hide` to `gone`. */
const showWhile = (from: number, to: number, hide: number, gone: number): SignKeys => ({ at: [0, from, to, hide, gone], opacity: [0, 0, 1, 1, 0] });

/** A bush of leafy clumps on a few thin branches, its foot's middle at (x, y), `s` times its size: `dark` clumps behind, `light` ones in front. */
const bushOf = (x: number, y: number, s: number, dark: string, light: string) => {
  const p = (dx: number, dy: number) => `${n(x + dx * s)} ${n(y + dy * s)}`;
  const clump = (dx: number, dy: number, r: number, fill: string) => `<circle cx="${n(x + dx * s)}" cy="${n(y + dy * s)}" r="${n(r * s)}" fill="${fill}"/>`;
  return (
    `<path d="M${p(0, 0)} L${p(0, -4)} L${p(-5, -9)} M${p(0, -4)} L${p(4, -10)} M${p(0, -6)} L${p(1, -13)}" stroke="#5B4126" stroke-width="${n(1.1 * s)}" fill="none" stroke-linecap="round"/>` +
    clump(-8, -6, 3.6, dark) +
    clump(8, -6.4, 3.6, dark) +
    clump(-5, -12, 4.2, dark) +
    clump(5, -12.6, 4.4, dark) +
    clump(0, -16, 4.2, dark) +
    clump(-4, -7, 3.8, light) +
    clump(4, -8, 4, light) +
    clump(0, -11.6, 4.2, light) +
    clump(-7.6, -10.4, 2.6, light) +
    clump(7.8, -11, 2.8, light) +
    clump(1.6, -15.6, 2.8, light)
  );
};

/** A wooden staff lying on the ground, from (x1, y1) to (x2, y2). */
const staffOf = (x1: number, y1: number, x2: number, y2: number) =>
  `<path d="M${x1} ${y1} L${x2} ${y2}" stroke="#7A4E25" stroke-width="2.2" stroke-linecap="round"/><path d="M${x1} ${y1} L${x2} ${y2}" stroke="#A8743E" stroke-width="0.7" stroke-linecap="round"/>` +
  `<path d="M${x2} ${y2} q2.6 -0.6 2.8 -3" stroke="#7A4E25" stroke-width="2.2" fill="none" stroke-linecap="round"/>`;

// Musa's fire: a cold, dark night on the way, the family's tent waiting by it, a fire seen on the side of the mount;
// near, the fire burns in a green tree that only grows greener (as Ibn Kathir tells of 27:8, and the course teaches),
// from which he was called; light on the holy valley of Tuwa; and the staff thrown down there becomes a snake, moving
// fast (Quran 20:10, 20:12, 20:20, 27:7, 28:29, 28:30). Nothing is drawn for the call, nor is he, nor his family.
function tur(): SignArt {
  const night = nightSky(78);
  const starry = stars([
    [10, 12],
    [26, 26],
    [44, 10],
    [58, 30],
    [74, 16],
    [92, 8],
    [104, 22],
    [140, 12],
    [152, 26],
    [18, 44],
    [6, 60],
    [36, 52]
  ]);
  const mountain =
    `<path d="M58 98 C70 84 84 64 98 48 C106 38 114 30 122 26 C130 30 138 38 146 46 C152 52 156 56 160 58 L160 98 Z" fill="#2B2F45"/>` +
    `<path d="M122 26 C130 30 138 38 146 46 C152 52 156 56 160 58 L160 98 L126 98 C128 80 126 52 122 26 Z" fill="#000000" opacity="0.22"/>` +
    `<path d="M88 74 l8 -3 M104 60 l6 -1 M136 70 l6 2 M118 84 l8 0" stroke="#3A4060" stroke-width="0.8" stroke-linecap="round"/>`;
  const farHills = `<path d="M0 84 C14 78 26 76 40 80 C50 83 58 80 70 84 L70 98 L0 98 Z" fill="#232A44"/>`;
  const ground = `<rect y="96" width="160" height="24" fill="#2A2A3E"/><path d="M0 96 C30 94 60 98 90 95 C120 93 140 97 160 95" stroke="#38384F" stroke-width="1.2" fill="none"/>`;
  // The way they lost: a faint track that fades into the dark.
  const track = `<path d="M4 116 C24 110 40 106 52 102 C60 99 66 98 72 97.4" stroke="#4A4A66" stroke-width="2" fill="none" stroke-linecap="round" stroke-dasharray="3 3"/>`;
  const tent =
    `<path d="M14 98 L24 86 L34 98 Z" fill="#5C4632"/><path d="M24 86 L34 98 L28 98 Z" fill="#46352A"/><path d="M22.4 98 L24 92.6 L25.6 98 Z" fill="#1E1812"/>` +
    `<path d="M24 86 L24 83.6" stroke="#5C4632" stroke-width="0.8"/>`;
  const stones = [
    [46, 108],
    [96, 104],
    [138, 112],
    [76, 114]
  ]
    .map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="3.2" ry="1.4" fill="#3A3A52"/>`)
    .join("");
  const grass = [40, 62, 110, 150].map((x, i) => tuft(x, 100 + (i % 2) * 6, "#2F4A3A", 4)).join("");
  // Seen from afar: a small light on the mountain's side.
  const farFire = `${glow(112, 66, 9, "#FFB347", 0.14)}<circle cx="112" cy="66" r="1.6" fill="#FFD27A"/>`;
  // Near: the bush, green inside the fire.
  const nearGlow = glow(112, 68, 26, "#FFC266", 0.07);
  // Its flames rise all round the bush, their feet hidden behind a mound of the mountain's side.
  const fireBehind = flame(92, 86, 30) + flame(132, 86, 30) + flame(101, 84, 42) + flame(123, 84, 42) + flame(112, 82, 54) + `<ellipse cx="112" cy="89" rx="30" ry="5" fill="#2B2F45"/>`;
  const greenBush = bushOf(112, 90, 2, "#2F7D3B", "#3E9A48");
  const greener = bushOf(112, 90, 2, "#3FA24A", "#62C65A");
  const fireInBush = `<g opacity="0.85">${flame(102, 74, 9)}${flame(121, 70, 10)}${flame(111, 62, 8)}</g>`;
  // The valley, lit.
  const valleyLight = `<path d="M0 96 L160 96 L160 120 L0 120 Z" fill="#FFF3D0" opacity="0.14"/>${glow(112, 96, 50, "#FFF0C8", 0.035)}`;
  const staff = staffOf(38, 104, 64, 100);
  const snake = animalAt("snake", 34, 78, 0.36);
  const near = { x: 112, y: 90 };
  // The bush grows from the far light to near, as the fire is come to (once the far fire's words are gone).
  const approach: SignKeys = { at: [0, at3(0.38), at3(0.48)], opacity: [0, 0, 1], scale: [0.18, 0.18, 1], y: [-20, -20, 0] };
  return {
    kind: "tur",
    ms: 12000,
    parts: [
      { name: "night sky", svg: night },
      { name: "stars", svg: starry, loop: { move: "twinkle", ms: 2600, low: 0.5 } },
      { name: "cold wind", svg: GUSTS, keys: { at: [0, 0.02, 0.06, 0.2, 0.24], opacity: [0, 0, 0.5, 0.5, 0] }, loop: { move: "slide", ms: 3600 } },
      { name: "far hills", svg: farHills },
      { name: "the mountain", svg: mountain },
      { name: "ground", svg: ground },
      { name: "lost track", svg: track, keys: { at: [0, 0.08, 0.18], opacity: [1, 1, 0.25] } },
      { name: "stones", svg: stones },
      { name: "grass", svg: grass, loop: { move: "sway", ms: 2400, angle: 2 } },
      { name: "family's tent", svg: tent },
      { name: "far fire", svg: farFire, keys: showWhile(0.2, 0.26, 0.38, 0.44), loop: { move: "twinkle", ms: 700, low: 0.55 } },
      { name: "light of the fire", svg: nearGlow, keys: showFrom(0.4, 0.5), loop: { move: "twinkle", ms: 1400, low: 0.6 } },
      { name: "fire behind the bush", svg: fireBehind, origin: near, keys: approach, loop: { move: "bob", ms: 500, y: 0.6 } },
      { name: "green bush", svg: greenBush, origin: near, keys: approach },
      { name: "greener bush", svg: greener, origin: near, keys: showFrom(0.5, 0.58) },
      { name: "fire in the bush", svg: fireInBush, origin: near, keys: approach, loop: { move: "twinkle", ms: 600, low: 0.6 } },
      { name: "holy valley lit", svg: valleyLight, keys: showFrom(0.62, 0.7), loop: { move: "twinkle", ms: 3000, low: 0.7 } },
      { name: "staff", svg: staff, keys: { at: [0, 0.8, 0.82, 0.86, 0.88], opacity: [0, 0, 1, 1, 0], y: [-20, -20, 0, 0, 0] } },
      { name: "snake", svg: snake, keys: showFrom(0.86, 0.88), loop: { move: "swim", ms: 2200, x: 6 } }
    ],
    words: [
      { text: "A cold, dark night", from: 0.02, to: 0.18 },
      { text: "A fire on the side of the mountain", from: 0.2, to: 0.38 },
      { text: "Called from the tree", from: 0.4, to: 0.58 },
      { text: "The holy valley of Tuwa", from: 0.6, to: 0.78 },
      { text: "The staff became a snake", from: 0.8, to: 1 }
    ]
  };
}

/** A rope lying on the ground in loose curves, from (x, y), `w` long; `k` bends it the other way. */
const ropeOf = (x: number, y: number, w: number, k = 1) =>
  `<path d="M${x} ${y} c${n(w * 0.2)} ${n(-3 * k)} ${n(w * 0.3)} ${n(3 * k)} ${n(w * 0.5)} 0 s${n(w * 0.3)} ${n(-3 * k)} ${n(w * 0.5)} 0" stroke="#A9824F" stroke-width="1.6" fill="none" stroke-linecap="round"/>` +
  `<path d="M${x} ${y} c${n(w * 0.2)} ${n(-3 * k)} ${n(w * 0.3)} ${n(3 * k)} ${n(w * 0.5)} 0 s${n(w * 0.3)} ${n(-3 * k)} ${n(w * 0.5)} 0" stroke="#D2B37E" stroke-width="0.5" fill="none" stroke-linecap="round" stroke-dasharray="1 1.4"/>`;

// The day of the gathering before Pharaoh's palace: the sorcerers' ropes and staffs thrown down, which seemed by their
// magic to move; Musa's staff thrown down, which swallowed up what they had faked, drawn as the serpent it became
// (7:107); and the truth stood (Quran 7:117, 7:118, 20:66, 26:44, 26:45). No one is drawn: not Musa, nor Pharaoh, nor
// the sorcerers.
function staff(): SignArt {
  const daySky = `<rect width="160" height="120" fill="#F6D9A6"/><rect y="40" width="160" height="80" fill="#F9E6C2"/>`;
  const sun = `${glow(28, 24, 14, "#FFF1C2", 0.14)}<circle cx="28" cy="24" r="7" fill="#FFD25C"/>`;
  // The palace: a long hall of columns on a raised floor, with a gate in the middle.
  let columns = "";
  for (let x = 56; x <= 146; x += 10) columns += `<rect x="${x}" y="46" width="4" height="30" fill="#D9C29A"/><rect x="${x - 1}" y="44.6" width="6" height="2" fill="#C4A97B"/>`;
  const palace =
    `<rect x="50" y="40" width="104" height="6" fill="#C9AE80"/><path d="M48 40 L156 40 L152 34 L52 34 Z" fill="#B8996A"/>` +
    `<rect x="52" y="46" width="100" height="30" fill="#E8D7B4"/>${columns}` +
    `<rect x="94" y="54" width="16" height="22" rx="1" fill="#6B5236"/><rect x="46" y="76" width="112" height="4" fill="#C9AE80"/><rect x="42" y="80" width="120" height="3" fill="#B8996A"/>`;
  const palms = `<path d="M22 84 L22 58" stroke="#8A6A45" stroke-width="2.4"/><path d="M22 58 C14 54 8 56 4 60 M22 58 C30 54 36 56 40 60 M22 58 C18 50 12 48 8 48 M22 58 C26 50 32 48 36 48" stroke="#4F8A3C" stroke-width="2.6" fill="none" stroke-linecap="round"/>`;
  const ground = `<rect y="83" width="160" height="37" fill="#E9CF98"/><path d="M0 84 C40 86 80 83 120 85 C140 86 150 84 160 85" stroke="#D8B97A" stroke-width="1" fill="none"/><path d="M14 92 l6 0 M120 106 l7 0 M60 106 l5 0" stroke="#D4B272" stroke-width="0.8" stroke-linecap="round"/>`;
  // Their ropes and staffs on the ground, on both sides of the middle, where Musa's staff will fall.
  const thin = (x1: number, y1: number, x2: number, y2: number) => staffOf(x1, y1, x2, y2).replace(/stroke-width="2.2"/g, 'stroke-width="1.6"');
  const leftThings = ropeOf(6, 96, 26) + ropeOf(30, 103, 24, -1) + thin(10, 104, 26, 99) + thin(40, 94, 56, 91);
  const rightThings = ropeOf(102, 103, 24) + ropeOf(128, 96, 26, -1) + thin(110, 94, 126, 91) + thin(134, 104, 150, 99);
  const fall: SignKeys = { at: [0, 0.04, 0.12, 0.24, 0.26], opacity: [0, 0, 1, 1, 0], y: [-50, -50, 0, 0, 0] };
  // By their magic they seemed to move, until the serpent came to them.
  const seemsToMove = (gone: number): SignKeys => ({ at: [0, 0.24, 0.26, gone - 0.04, gone], opacity: [0, 0, 1, 1, 0] });
  const wriggle = { move: "bob" as const, ms: 500, y: 1.2, rotate: 2 };
  const musaStaff = staffOf(68, 99, 92, 95);
  // The great serpent, larger than all of them, gliding to the right and to the left over the ground.
  const serpent = animalAt("snake", 39, 42, 0.8);
  const light = `${glow(80, 98, 46, "#FFFFFF", 0.05)}`;
  return {
    kind: "staff",
    ms: 11500,
    parts: [
      { name: "day sky", svg: daySky },
      { name: "sun", svg: sun, loop: { move: "twinkle", ms: 2400, low: 0.8 } },
      { name: "palace", svg: palace },
      { name: "palm", svg: palms, origin: { x: 22, y: 84 }, loop: { move: "sway", ms: 3600, angle: 1.5 } },
      { name: "ground", svg: ground },
      { name: "the truth stands", svg: light, keys: showFrom(0.82, 0.9), loop: { move: "twinkle", ms: 2000, low: 0.6 } },
      { name: "ropes and staffs thrown, left", svg: leftThings, keys: fall },
      { name: "ropes and staffs thrown, right", svg: rightThings, keys: fall },
      { name: "seeming to move, left", svg: leftThings, keys: seemsToMove(0.76), origin: { x: 32, y: 100 }, loop: wriggle },
      { name: "seeming to move, right", svg: rightThings, keys: seemsToMove(0.68), origin: { x: 128, y: 100 }, loop: wriggle },
      { name: "Musa's staff", svg: musaStaff, keys: { at: [0, 0.44, 0.48, 0.5, 0.54], opacity: [0, 0, 1, 1, 0], y: [-40, -40, 0, 0, 0] } },
      {
        name: "great serpent",
        svg: serpent,
        origin: { x: 80, y: 97 },
        keys: {
          at: [0, 0.5, 0.54, 0.64, 0.68, 0.7, 0.76, 0.78, 0.8, 0.84],
          opacity: [0, 0, 1, 1, 1, 1, 1, 1, 1, 1],
          scale: [0.5, 0.5, 1, 1, 1, 1, 1, 1, 1, 1],
          x: [0, 0, 0, 0, 34, 34, -40, -40, -40, 0],
          scaleX: [1, 1, 1, 1, 1, -1, -1, -1, 1, 1]
        },
        loop: { move: "bob", ms: 900, y: 0.8 }
      }
    ],
    words: [
      { text: "Their ropes and staffs", from: 0.02, to: 0.22 },
      { text: "They seemed to move", from: 0.24, to: 0.42 },
      { text: "Musa threw down his staff", from: 0.44, to: 0.62 },
      { text: "It swallowed what they faked", from: 0.64, to: 0.8 },
      { text: "The truth stood firm", from: 0.82, to: 1 }
    ]
  };
}

/** A small fish facing right, its middle at (x, y), `k` times its size. */
const fishOf = (x: number, y: number, k: number, body: string) =>
  `<path d="M${n(x - 5 * k)} ${y} Q${x} ${n(y - 3.4 * k)} ${n(x + 5 * k)} ${y} Q${x} ${n(y + 3.4 * k)} ${n(x - 5 * k)} ${y} Z" fill="${body}"/>` +
  `<path d="M${n(x - 5 * k)} ${y} L${n(x - 9 * k)} ${n(y - 2.6 * k)} L${n(x - 9 * k)} ${n(y + 2.6 * k)} Z" fill="${body}"/><circle cx="${n(x + 2.6 * k)}" cy="${n(y - 0.6 * k)}" r="${n(0.6 * k)}" fill="#1F2A3A"/>`;

/** A boat with one mast and its sails, the middle of its deck at (x, y). */
const boatOf = (x: number, y: number) =>
  `<path d="M${x - 20} ${y} L${x + 20} ${y} L${x + 14} ${y + 8} L${x - 15} ${y + 8} Z" fill="#8A5530"/>` +
  `<path d="M${x - 19} ${y + 2.6} L${x + 19} ${y + 2.6} M${x - 17} ${y + 5.4} L${x + 16.6} ${y + 5.4}" stroke="#A86C3C" stroke-width="0.8"/>` +
  `<path d="M${x} ${y} L${x} ${y - 30}" stroke="#6B4226" stroke-width="1.4"/>` +
  `<path d="M${x + 1} ${y - 28} Q${x + 16} ${y - 16} ${x + 1} ${y - 3} Z" fill="#FFFDF5"/><path d="M${x - 1} ${y - 26} Q${x - 12} ${y - 15} ${x - 1} ${y - 4} Z" fill="#F4ECDA"/>` +
  `<path d="M${x} ${y - 30} L${x + 7} ${y - 28} L${x} ${y - 26} Z" fill="#E2483C"/>`;

/** A house of the town: a flat-roofed box with a door and small windows. */
const houseOf = (x: number, y: number, w: number, h: number, fill: string, shade: string) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}"/><rect x="${x + w - 4}" y="${y}" width="4" height="${h}" fill="${shade}"/><rect x="${x - 1}" y="${y - 2}" width="${w + 2}" height="2.4" fill="${shade}"/>` +
  `<rect x="${n(x + w * 0.3)}" y="${n(y + h * 0.3)}" width="3.4" height="3.4" fill="#6B4A2E"/><rect x="${n(x + w * 0.55)}" y="${n(y + h - 9)}" width="5" height="9" rx="2" fill="#6B4A2E"/>`;

/** Rows of bricks from (x, y), `w` wide and `h` high. */
function bricksOf(x: number, y: number, w: number, h: number) {
  let lines = `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#C98F5A"/>`;
  for (let row = 0, top = y; top < y + h - 0.1; row += 1, top += 4.4) {
    lines += `<path d="M${x} ${n(top)} L${x + w} ${n(top)}" stroke="#A8703F" stroke-width="0.6"/>`;
    for (let left = x + (row % 2 ? 4 : 8); left < x + w; left += 9) lines += `<path d="M${n(left)} ${n(top)} L${n(left)} ${n(Math.min(top + 4.4, y + h))}" stroke="#A8703F" stroke-width="0.6"/>`;
  }
  return lines;
}

// Musa's journey to learn: to the rock where the two seas meet, where the fish they forgot took its way into the sea
// like a tunnel; the hole made in the boat; the wall about to fall that was set straight; and beneath it the orphans'
// treasure (Quran 18:60, 18:61, 18:63, 18:71, 18:77, 18:82). The servant of Allah he followed is not drawn, nor he, nor
// his young helper, nor the people of the boat and the town; nor the boy of 18:74.
function khidr(): SignArt {
  const scene =
    `${DAY_SKY}<path d="M0 56 C20 52 36 54 52 56 L52 57 L0 57 Z" fill="#9DB48A"/><path d="M118 56 C132 53 146 53 160 55 L160 57 L118 57 Z" fill="#B7B08A"/>` +
    `<rect y="56" width="160" height="64" fill="#2A6FB4"/>` +
    `<path d="M0 56 L94 56 C88 66 98 76 90 86 C84 94 90 102 84 120 L0 120 Z" fill="#43A6D6"/>`;
  const seam = `<path d="M94 56 C88 66 98 76 90 86 C84 94 90 102 84 120" stroke="#FFFFFF" stroke-width="1.2" stroke-dasharray="2 3" fill="none" opacity="0.8"/>`;
  const waves = `<g opacity="0.75">${curls(66, 26, "#BFE6FA", 0.9, 6)}${curls(78, 30, "#BFE6FA", 0.9, 18)}${curls(94, 28, "#DDF3FF", 1, 2)}</g>`;
  const sand = `<path d="M0 90 C14 86 30 86 46 90 C60 94 68 100 74 120 L0 120 Z" fill="#E6CF95"/><path d="M2 100 l5 0 M30 106 l6 0 M50 112 l5 0" stroke="#CDB277" stroke-width="0.8" stroke-linecap="round"/>`;
  const rock = `<path d="M12 92 C12 81 20 75 31 75 C42 75 50 81 50 92 Z" fill="#8F8B84"/><path d="M18 84 C20 79 25 77 30 77" stroke="#B4B0A8" stroke-width="1.6" fill="none" stroke-linecap="round"/><path d="M38 88 l6 -3" stroke="#77736C" stroke-width="0.8"/>`;
  const fish = fishOf(32, 72.6, 1.2, "#E9A24A");
  // The way it took through the sea, like a tunnel, growing from where it went in.
  const tunnel = `<path d="M70 86 C92 81 116 84 146 77" stroke="#8FD0F0" stroke-width="6.4" fill="none" stroke-linecap="round" opacity="0.9"/><path d="M70 86 C92 81 116 84 146 77" stroke="#1B4F86" stroke-width="4" fill="none" stroke-linecap="round"/>`;
  const boat = boatOf(116, 78);
  const plank = `<rect x="104" y="80.4" width="10" height="2.6" rx="0.6" fill="#9A6236" stroke="#6B4226" stroke-width="0.4"/>`;
  const hole = `<rect x="104" y="80.4" width="10" height="2.6" rx="0.6" fill="#24150B"/>`;
  const bob = { move: "bob" as const, ms: 2400, y: 0.8 };
  // The town: houses behind, the wall about to fall in front, and the treasure beneath it.
  const town =
    `<rect width="160" height="120" fill="#F3DDB0"/><rect y="40" width="160" height="80" fill="#F7E7C4"/>` +
    houseOf(2, 58, 26, 30, "#E3C08D", "#CDA570") +
    houseOf(30, 64, 20, 24, "#EBCB98", "#D2AE78") +
    houseOf(114, 54, 26, 34, "#E3C08D", "#CDA570") +
    houseOf(140, 62, 20, 26, "#EBCB98", "#D2AE78");
  // The wall leans over, about to fall, its foot sunk on one side; set straight, it stands upright on the ground.
  const wall = bricksOf(52, 62.4, 56, 25.6) + `<rect x="51" y="61" width="58" height="2" fill="#B07A47"/>`;
  const cracks = `<path d="M70 62.4 l3 5 l-2 4 l4 6 M94 63 l-2 6 l3 5 M84 76 l2 5 l-2 5" stroke="#6E4524" stroke-width="0.9" fill="none" stroke-linejoin="round"/>`;
  const leaning = { at: [0, 0.52, 0.56, 0.7, 0.76], opacity: [0, 0, 1, 1, 1], rotate: [8, 8, 8, 8, 0] };
  const frontGround = `<rect y="88" width="160" height="32" fill="#DDBB82"/><path d="M0 88 L160 88" stroke="#C9A468" stroke-width="1"/><path d="M8 100 l6 0 M128 104 l7 0 M30 108 l5 0" stroke="#C9A468" stroke-width="0.8" stroke-linecap="round"/>`;
  const townPalm = palm(111, 88, 36, "#4F8A3C");
  const cutaway = `<path d="M60 92 L100 92 L100 107 L60 107 Z" fill="#B58A54" opacity="0.9"/><path d="M60 92 L100 92" stroke="#9C7342" stroke-width="0.8" stroke-dasharray="2 2"/>`;
  const chest =
    `<rect x="70" y="97" width="20" height="9" rx="1" fill="#7A4A22"/><path d="M70 97 C70 93 90 93 90 97 Z" fill="#8F5A2B"/>` +
    `<rect x="70" y="97" width="20" height="1.4" fill="#E2B33C"/><rect x="78.6" y="96" width="2.8" height="4.2" rx="0.6" fill="#E2B33C"/>` +
    `<circle cx="66" cy="104.6" r="1.6" fill="#FFD54A"/><circle cx="94" cy="104" r="1.4" fill="#FFD54A"/><circle cx="96.6" cy="105.6" r="1.2" fill="#F2C230"/>`;
  const glints = `<path d="M74 92 l0 -3 M72.6 90.6 l2.8 0 M88 91 l0 -2.4 M86.8 89.8 l2.4 0" stroke="#FFF3B0" stroke-width="0.8" stroke-linecap="round"/>`;
  return {
    kind: "khidr",
    ms: 12000,
    parts: [
      { name: "sky and the two seas", svg: scene },
      { name: "where they meet", svg: seam, loop: { move: "twinkle", ms: 2000, low: 0.4 } },
      { name: "waves", svg: waves, loop: { move: "slide", ms: 6000 } },
      { name: "sand", svg: sand },
      { name: "the rock", svg: rock },
      { name: "tunnel in the sea", svg: tunnel, origin: { x: 70, y: 86 }, keys: { at: [0, 0.26, 0.27, 0.34], opacity: [0, 0, 1, 1], scaleX: [0.04, 0.04, 0.1, 1] } },
      {
        name: "the fish",
        svg: fish,
        origin: { x: 32, y: 72.6 },
        keys: { at: [0, 0.18, 0.21, 0.24, 0.26, 0.34, 0.36], x: [0, 0, 18, 32, 38, 110, 114], y: [0, 0, -12, 4, 13, 4, 4], rotate: [0, 0, -25, 30, 0, -4, -4], opacity: [1, 1, 1, 1, 1, 1, 0] }
      },
      { name: "boat", svg: boat, origin: { x: 116, y: 82 }, keys: { at: [0, 0.36, 0.42], x: [60, 60, 0], opacity: [0, 0, 1] }, loop: bob },
      { name: "hole in the boat", svg: hole, keys: { at: [0, 0.45, 0.46], opacity: [0, 0, 1] }, loop: bob },
      {
        name: "plank pulled out",
        svg: plank,
        origin: { x: 109, y: 81.7 },
        keys: { at: [0, 0.36, 0.42, 0.45, 0.48, 0.51, 0.52], x: [60, 60, 0, 0, -4, -8, -8], y: [0, 0, 0, 0, -9, 10, 10], rotate: [0, 0, 0, 0, -40, -90, -90], opacity: [0, 0, 1, 1, 1, 0, 0] },
        loop: bob
      },
      { name: "the town", svg: town, keys: { at: [0, 0.52, 0.56], opacity: [0, 0, 1] } },
      { name: "palm of the town", svg: townPalm, origin: { x: 111, y: 88 }, keys: { at: [0, 0.52, 0.56], opacity: [0, 0, 1] }, loop: { move: "sway", ms: 3400, angle: 1.6 } },
      { name: "wall about to fall", svg: wall, origin: { x: 52, y: 88 }, keys: leaning },
      { name: "cracks", svg: cracks, origin: { x: 52, y: 88 }, keys: { ...leaning, opacity: [0, 0, 1, 1, 0] } },
      { name: "ground in front", svg: frontGround, keys: { at: [0, 0.52, 0.56], opacity: [0, 0, 1] } },
      { name: "under the wall", svg: cutaway, keys: showFrom(0.84, 0.88) },
      { name: "the orphans' treasure", svg: chest, keys: { at: [0, 0.86, 0.9], opacity: [0, 0, 1], y: [6, 6, 0] } },
      { name: "gold glints", svg: glints, keys: showFrom(0.9, 0.92), loop: { move: "twinkle", ms: 900, low: 0.2 } }
    ],
    words: [
      { text: "Where the two seas meet", from: 0.02, to: 0.16 },
      { text: "The fish took its way into the sea", from: 0.18, to: 0.34 },
      { text: "A hole in the boat", from: 0.36, to: 0.52 },
      { text: "A wall about to fall", from: 0.54, to: 0.68 },
      { text: "It was set straight", from: 0.7, to: 0.82 },
      { text: "The orphans' treasure beneath", from: 0.84, to: 1 }
    ]
  };
}

/** Where the mountains' inner sides are, `y` down: the left one from (44, 50) to (64, 96), the right one from (116, 50) to (96, 96). */
const sideAt = (y: number) => ({ left: n(44 + (20 * (y - 50)) / 46), right: n(116 - (20 * (y - 50)) / 46) });

/** The gap between the mountains from `top` down to `foot`, as a shape. */
const gapShape = (top: number, foot: number) => {
  const a = sideAt(top);
  const b = sideAt(foot);
  return `M${a.left} ${top} L${a.right} ${top} L${b.right} ${foot} L${b.left} ${foot} Z`;
};

/** A row of iron blocks filling the gap from `top` to `foot`. */
function ironRow(top: number, foot: number, offset: number) {
  const mid = n((top + foot) / 2);
  const a = sideAt(top);
  const b = sideAt(foot);
  let seams = `<path d="M${sideAt(mid).left} ${mid} L${sideAt(mid).right} ${mid}" stroke="#4D535A" stroke-width="0.7"/>`;
  for (let x = a.left + offset; x < a.right - 2; x += 11) seams += `<path d="M${n(x)} ${top} L${n(x)} ${mid}" stroke="#4D535A" stroke-width="0.7"/>`;
  for (let x = b.left + offset + 5.5; x < b.right - 2; x += 11) seams += `<path d="M${n(x)} ${mid} L${n(x)} ${foot}" stroke="#4D535A" stroke-width="0.7"/>`;
  return `<path d="${gapShape(top, foot)}" fill="#6E747C"/><path d="M${a.left} ${n(top + 0.6)} L${a.right} ${n(top + 0.6)}" stroke="#9AA1A9" stroke-width="1.1"/>${seams}`;
}

/** A pot for the molten copper, its foot's middle at (x, y). */
const potOf = (x: number, y: number) =>
  `<path d="M${x - 6} ${y - 9} L${x + 6} ${y - 9} L${x + 5} ${y - 2} C${x + 4} ${y + 1} ${x - 4} ${y + 1} ${x - 5} ${y - 2} Z" fill="#3E3A36"/><rect x="${x - 7}" y="${y - 10.4}" width="14" height="2" rx="1" fill="#55504A"/>` +
  `<ellipse cx="${x}" cy="${y - 9.4}" rx="5" ry="0.9" fill="#F29A3A"/>`;

/** A stream of molten copper running down the barrier from (x, top) to its foot. */
const copperStream = (x: number, top: number, foot: number) =>
  `<path d="M${x - 2.4} ${top} C${x - 3.4} ${n(top + (foot - top) * 0.35)} ${x - 1.4} ${n(top + (foot - top) * 0.65)} ${x - 3} ${foot} L${x + 3} ${foot} C${x + 1.6} ${n(top + (foot - top) * 0.65)} ${x + 3.4} ${n(top + (foot - top) * 0.35)} ${x + 2.4} ${top} Z" fill="#E5862F"/>` +
  `<path d="M${x} ${top + 2} C${x - 1} ${n(top + (foot - top) * 0.4)} ${x + 0.6} ${n(top + (foot - top) * 0.7)} ${x - 0.6} ${foot - 2}" stroke="#FFC46B" stroke-width="0.9" fill="none" stroke-linecap="round"/>`;

// The barrier between the two mountains: a gap between their sides, blocks of iron brought until it was filled level
// with them, up to their tops (Ibn Kathir on 18:96), blown upon until it was like fire, molten copper poured over it, and it stood: Gog and Magog could not
// climb over it nor dig through it (Quran 18:93, 18:96, 18:97). No one is drawn: not Dhul-Qarnayn, nor the people who
// asked for the barrier, nor those behind it; the blocks and the copper come to their places by themselves.
function barrier(): SignArt {
  const scene = `${sky("#C9E4F5", "#E4F0F6", 60)}<path d="M54 96 C66 88 94 88 106 96 Z" fill="#B9C7B0"/>`;
  const clouds = cloud(24, 26, 0.7, "#FFFFFF", 0.9) + cloud(104, 18, 0.55, "#FFFFFF", 0.85) + cloud(148, 30, 0.6, "#FFFFFF", 0.9);
  const mountains =
    `<path d="M0 96 L0 57 C5 54 10 51 16 51 C20 51 23 49 27 49 C31 49 34 51 38 50.4 C41 49.9 43 49.8 44 50 L64 96 Z" fill="#8C7B6A"/><path d="M32 50.6 C38 50.2 42 49.8 44 50 L64 96 L46 96 C44 78 39 62 32 50.6 Z" fill="#000000" opacity="0.14"/>` +
    `<path d="M160 96 L160 57 C155 54 150 51 144 51 C140 51 137 49 133 49 C129 49 126 51 122 50.4 C119 49.9 117 49.8 116 50 L96 96 Z" fill="#8C7B6A"/><path d="M144 51 C150 51 155 54 160 57 L160 96 L142 96 C143 80 144 64 144 51 Z" fill="#000000" opacity="0.14"/>` +
    `<path d="M14 62 l6 -2 M22 78 l7 1 M138 66 l6 2 M146 82 l6 -1" stroke="#7A6A5A" stroke-width="0.9" stroke-linecap="round"/>`;
  const ground = `<rect y="96" width="160" height="24" fill="#C9B48E"/><path d="M0 96 L160 96" stroke="#B49E76" stroke-width="1"/><path d="M10 104 l6 0 M120 106 l7 0 M70 108 l5 0" stroke="#B49E76" stroke-width="0.8" stroke-linecap="round"/>`;
  const rows = [
    [84.5, 96, 3],
    [73, 84.5, 8],
    [61.5, 73, 4],
    [50, 61.5, 9]
  ];
  const blockKeys = (index: number): SignKeys => {
    const from = at3(0.2 + index * 0.04);
    return { at: [0, from, at3(from + 0.03)], opacity: [0, 0, 1], y: [-36, -36, 0] };
  };
  const whole = gapShape(50, 96);
  const seams = [61.5, 73, 84.5].map((y) => `M${sideAt(y).left} ${y} L${sideAt(y).right} ${y}`).join(" ");
  const redHot = `<path d="${whole}" fill="#FF6A2A" opacity="0.88"/><path d="${seams}" stroke="#FFC15A" stroke-width="0.9" opacity="0.8"/>`;
  const heat = `${glow(80, 76, 30, "#FFB060", 0.05)}`;
  const fires = flame(68, 97, 12) + flame(80, 97, 15) + flame(92, 97, 12);
  const coated = `<path d="${whole}" fill="#B8743F" opacity="0.92"/><path d="M${n(sideAt(54).left + 3)} 54 L${n(sideAt(54).right - 3)} 54" stroke="#E0A56A" stroke-width="1.2" stroke-linecap="round"/><path d="M58 66 L70 92 M92 60 L100 78" stroke="#D69257" stroke-width="1.4" stroke-linecap="round" opacity="0.7"/>`;
  const shine = `<path d="M60 60 l2 -3 l2 3 l-2 3 Z M98 70 l1.6 -2.4 l1.6 2.4 l-1.6 2.4 Z M76 84 l1.4 -2 l1.4 2 l-1.4 2 Z" fill="#FFF1D2"/>`;
  return {
    kind: "barrier",
    ms: 11500,
    parts: [
      { name: "sky and the land beyond", svg: scene },
      { name: "clouds", svg: clouds, loop: { move: "slide", ms: 12000 } },
      { name: "two mountains", svg: mountains },
      { name: "ground", svg: ground },
      ...rows.map(([top, foot, offset], index) => ({ name: `blocks of iron, row ${index + 1}`, svg: ironRow(top, foot, offset), keys: blockKeys(index) })),
      { name: "heat", svg: heat, keys: { at: [0, 0.4, 0.46, 0.6, 0.66], opacity: [0, 0, 1, 1, 0] }, loop: { move: "twinkle", ms: 900, low: 0.5 } },
      { name: "iron like fire", svg: redHot, keys: { at: [0, 0.42, 0.5, 0.74, 0.78], opacity: [0, 0, 1, 1, 0] }, loop: { move: "twinkle", ms: 1100, low: 0.75 } },
      { name: "fires at the foot", svg: fires, keys: { at: [0, 0.4, 0.44, 0.58, 0.62], opacity: [0, 0, 1, 1, 0] }, loop: { move: "bob", ms: 500, y: 0.6 } },
      { name: "left pot", svg: potOf(38, 50), origin: { x: 38, y: 50 }, keys: { at: [0, 0.58, 0.62, 0.64, 0.76, 0.8], opacity: [0, 0, 1, 1, 1, 0], rotate: [0, 0, 0, 50, 50, 50] } },
      { name: "right pot", svg: potOf(122, 50), origin: { x: 122, y: 50 }, keys: { at: [0, 0.58, 0.62, 0.64, 0.76, 0.8], opacity: [0, 0, 1, 1, 1, 0], rotate: [0, 0, 0, -50, -50, -50] } },
      { name: "molten copper", svg: copperStream(56, 50, 96) + copperStream(80, 50, 96) + copperStream(104, 50, 96), origin: { x: 80, y: 50 }, keys: { at: [0, 0.63, 0.64, 0.72, 0.76, 0.8], opacity: [0, 0, 1, 1, 1, 0], scaleY: [0.02, 0.02, 0.04, 1, 1, 1] } },
      { name: "barrier of iron and copper", svg: coated, keys: showFrom(0.72, 0.78) },
      { name: "shine", svg: shine, keys: showFrom(0.82, 0.86), loop: { move: "twinkle", ms: 1300, low: 0.15 } }
    ],
    words: [
      { text: "Between two mountains", from: 0.02, to: 0.18 },
      { text: "Blocks of iron", from: 0.2, to: 0.38 },
      { text: "Blown until it was like fire", from: 0.4, to: 0.58 },
      { text: "Molten copper poured over it", from: 0.6, to: 0.78 },
      { text: "They could not climb over it", from: 0.8, to: 1 }
    ]
  };
}

/** A broad leaf of the gourd plant, its stalk at (x, y), pointing `angle` degrees from straight up. */
const gourdLeaf = (x: number, y: number, size: number, angle: number) =>
  `<g transform="translate(${x} ${y}) rotate(${angle})"><path d="M0 0 C${n(-size * 0.9)} ${n(-size * 0.3)} ${n(-size * 0.8)} ${n(-size * 1.2)} 0 ${n(-size * 0.95)} C${n(size * 0.8)} ${n(-size * 1.2)} ${n(size * 0.9)} ${n(-size * 0.3)} 0 0 Z" fill="#4E9E3E"/>` +
  `<path d="M0 0 L0 ${n(-size * 0.85)}" stroke="#3B7F2E" stroke-width="0.6"/></g>`;

// Yunus: the laden ship; the great fish; the darknesses of the night, the sea and the fish, in which he called out to
// Allah; cast on the open shore; the gourd plant that grew over him; and his people, who believed (Quran 37:140,
// 37:142, 37:145 to 37:148, 21:87, 21:88, 10:98). He is not drawn, nor anyone of the ship or of his people: only the
// sea, the ship, the fish, the shore, the plant and the town.
function yunus(): SignArt {
  const scene = `${sky("#AFC9DE", "#CFDFEA", 58)}<path d="M0 60 C10 54 22 52 34 55 C44 57 52 56 60 60 L60 62 L0 62 Z" fill="#8FA294"/>`;
  const sea = `<rect y="62" width="160" height="58" fill="#2F6FA8"/><rect y="62" width="160" height="4" fill="#4E8DC2"/>`;
  const waves = `<g opacity="0.8">${curls(72, 24, "#9CC8EC", 0.9, 4)}${curls(86, 28, "#9CC8EC", 1, 14)}${curls(100, 26, "#C6E2F7", 1.1, 2)}</g>`;
  const cargo =
    `<rect x="98" y="66" width="7" height="6" rx="0.8" fill="#C9A15E"/><rect x="106" y="67" width="6" height="5" rx="0.8" fill="#B88A48"/><ellipse cx="124" cy="69.6" rx="4.2" ry="2.6" fill="#D8C08A"/>` +
    `<ellipse cx="131" cy="70" rx="3.4" ry="2.2" fill="#C9A15E"/><rect x="99" y="61" width="5" height="5" rx="0.8" fill="#D2AE6C"/>`;
  const ship = boatOf(116, 72) + cargo;
  const fish = animalAt("whale", 6, 60, 0.6, true);
  const dark = `<rect width="160" height="120" fill="#0B1530"/>`;
  const bubbles = `<circle cx="58" cy="70" r="1.4" fill="none" stroke="#9CC8EC" stroke-width="0.6"/><circle cx="62" cy="62" r="1" fill="none" stroke="#9CC8EC" stroke-width="0.6"/><circle cx="56" cy="54" r="1.8" fill="none" stroke="#9CC8EC" stroke-width="0.6"/>`;
  const faintStars = stars([
    [12, 14],
    [40, 30],
    [70, 10],
    [118, 18],
    [146, 34]
  ]);
  const shore = `<path d="M110 120 C112 98 118 84 130 78 C140 74 150 73 160 73 L160 120 Z" fill="#E3CC92"/><path d="M110 120 C112 98 118 84 130 78 C140 74 150 73 160 73" stroke="#F4E6BE" stroke-width="1.4" fill="none"/><path d="M134 96 l6 0 M146 108 l5 0" stroke="#CDB277" stroke-width="0.8" stroke-linecap="round"/>`;
  const plant =
    `<path d="M138 84 C136 78 132 74 126 72 M138 84 C140 77 146 73 152 72 M138 84 C138 78 139 72 138 66" stroke="#3B7F2E" stroke-width="1.1" fill="none" stroke-linecap="round"/>` +
    gourdLeaf(127, 73, 10, -60) +
    gourdLeaf(151, 73, 10, 60) +
    gourdLeaf(138, 67, 11, 0) +
    gourdLeaf(131, 79, 8, -34) +
    gourdLeaf(146, 79, 8, 36) +
    gourdLeaf(132, 70, 8, -18) +
    gourdLeaf(144, 70, 8, 20) +
    `<ellipse cx="146" cy="84" rx="4.6" ry="3" fill="#B9D77A"/><path d="M127 82 l2 -2.4 l2 2.4 l-2 1.6 Z" fill="#F4D03F"/>`;
  // Far away, the houses of his people's town, in a soft light.
  const farHouse = (x: number, y: number, w: number, h: number, fill: string) =>
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}"/><rect x="${n(x - 0.6)}" y="${n(y - 1)}" width="${n(w + 1.2)}" height="1.2" fill="#C9A26C"/>` +
    `<rect x="${n(x + w * 0.58)}" y="${n(y + h * 0.5)}" width="${n(w * 0.22)}" height="${n(h * 0.5)}" fill="#7A5634"/><rect x="${n(x + w * 0.2)}" y="${n(y + h * 0.28)}" width="${n(w * 0.16)}" height="${n(w * 0.16)}" fill="#7A5634"/>`;
  const town =
    `${glow(30, 54, 24, "#FFF4C8", 0.06)}` +
    farHouse(8, 51, 10, 8, "#E8CB9A") +
    farHouse(19, 48, 11, 11, "#F0D6A8") +
    farHouse(31, 50, 9, 9, "#E8CB9A") +
    farHouse(41, 52.6, 8, 7, "#F0D6A8") +
    farHouse(50, 54.4, 7, 5.6, "#E8CB9A");
  const shown = (from: number, to: number, hide: number, gone: number) => ({ at: [0, from, to, hide, gone], opacity: [0, 0, 1, 1, 0] });
  return {
    kind: "yunus",
    ms: 12000,
    parts: [
      { name: "sky and far land", svg: scene },
      { name: "far town", svg: town, keys: showFrom(0.84, 0.9), loop: { move: "twinkle", ms: 2200, low: 0.75 } },
      { name: "sea", svg: sea },
      { name: "waves", svg: waves, loop: { move: "slide", ms: 5200 } },
      { name: "laden ship", svg: ship, origin: { x: 116, y: 76 }, keys: { at: [0, 0.32, 0.4], x: [0, 0, 70], opacity: [1, 1, 0] }, loop: { move: "bob", ms: 2200, y: 1, rotate: 2.4 } },
      {
        name: "great fish",
        svg: fish,
        origin: { x: 38, y: 78 },
        keys: {
          at: [0, 0.18, 0.24, 0.34, 0.4, 0.5, 0.56, 0.62, 0.68],
          opacity: [0, 0, 1, 1, 1, 1, 1, 1, 0],
          x: [0, 0, 0, 0, 0, 0, 56, 56, -40],
          y: [30, 30, 0, 0, 16, 16, 2, 2, 8]
        },
        loop: { move: "bob", ms: 1800, y: 1.2, rotate: 1.4 }
      },
      { name: "the darknesses", svg: dark, keys: { at: [0, 0.34, 0.4, 0.5, 0.54], opacity: [0, 0, 0.8, 0.8, 0] } },
      { name: "night stars", svg: faintStars, keys: shown(0.36, 0.4, 0.5, 0.54), loop: { move: "twinkle", ms: 1800, low: 0.4 } },
      { name: "bubbles", svg: bubbles, keys: shown(0.38, 0.42, 0.48, 0.52), loop: { move: "bob", ms: 1400, y: -3 } },
      { name: "open shore", svg: shore, keys: showFrom(0.5, 0.56) },
      { name: "gourd plant", svg: plant, origin: { x: 138, y: 84 }, keys: { at: [0, 0.68, 0.76], opacity: [0, 0, 1], scale: [0.1, 0.1, 1] }, loop: { move: "sway", ms: 3000, angle: 1.4 } }
    ],
    words: [
      { text: "The laden ship", from: 0.02, to: 0.16 },
      { text: "A great fish", from: 0.18, to: 0.32 },
      { text: "In the darknesses", from: 0.34, to: 0.5 },
      { text: "Cast on the open shore", from: 0.52, to: 0.66 },
      { text: "A gourd plant grew", from: 0.68, to: 0.82 },
      { text: "His people believed", from: 0.84, to: 1 }
    ]
  };
}

// Maryam: in a place far away, the pains of birth drove her to the trunk of a palm tree; she was told not to grieve, for
// her Lord had made a stream beneath her, and to shake the trunk toward her, and fresh ripe dates would fall; so eat,
// drink and be glad (Quran 19:22 to 19:26). She is not drawn, nor anyone else: only the land, the palm tree, the stream
// and the dates. The trunk is shaken by itself.
function maryam(): SignArt {
  const scene =
    `${sky("#F4D7A8", "#F8E7C6", 58)}${SUN_LOW}` +
    `<path d="M0 74 C18 66 34 64 52 68 C66 71 76 66 92 62 C110 58 128 64 160 70 L160 84 L0 84 Z" fill="#E2BC8A"/>` +
    `<path d="M92 62 C110 58 128 64 160 70 L160 84 L120 84 C116 74 106 66 92 62 Z" fill="#000000" opacity="0.06"/>`;
  const ground = `<rect y="84" width="160" height="36" fill="#EBCF98"/><path d="M0 84 C40 86 90 83 160 85" stroke="#DDBE84" stroke-width="1" fill="none"/>`;
  const rocks = `<ellipse cx="22" cy="100" rx="5" ry="2.4" fill="#C9A878"/><ellipse cx="134" cy="94" rx="4" ry="2" fill="#C9A878"/><ellipse cx="118" cy="106" rx="3" ry="1.4" fill="#C9A878"/>`;
  const tree = palm(66, 94, 54, "#4F9A3C");
  // The stream, from the foot of the palm down across the ground.
  const streamPath = "M58 98 C70 96 84 101 96 103 C112 105 130 102 160 106";
  const stream = `<path d="${streamPath}" stroke="#4FA7DE" stroke-width="5.4" fill="none" stroke-linecap="round"/><path d="${streamPath}" stroke="#9FD6F5" stroke-width="1" fill="none" stroke-dasharray="3 5" stroke-linecap="round"/>`;
  const greenBy = [52, 78, 104, 128, 150].map((x, i) => tuft(x, i % 2 ? 99 : 110, "#5FA344", 4.4)).join("");
  const crownX = 70.3;
  const crownY = 43;
  const dates = dateBunch(n(crownX - 6), crownY) + dateBunch(n(crownX + 5), n(crownY + 1));
  // Four of them fall to the ground by the palm's foot, above the stream.
  const falling = [
    [crownX - 12, crownY + 6, 43, 0.62],
    [crownX + 6, crownY + 7, 44, 0.64],
    [crownX - 8, crownY + 8, 41, 0.66],
    [crownX + 10, crownY + 6, 46, 0.68]
  ] as const;
  const date = (x: number, y: number) => `<ellipse cx="${n(x)}" cy="${n(y)}" rx="1.5" ry="2" fill="#9C3D1E"/><ellipse cx="${n(x - 0.4)}" cy="${n(y - 0.6)}" rx="0.5" ry="0.7" fill="#C76A3E"/>`;
  const content = glow(68, 72, 40, "#FFF6D8", 0.04);
  return {
    kind: "maryam",
    ms: 11000,
    parts: [
      { name: "sky and far hills", svg: scene },
      { name: "ground", svg: ground },
      { name: "rocks", svg: rocks },
      { name: "wind over the land", svg: GUSTS, keys: { at: [0, 0.02, 0.06, 0.16, 0.2], opacity: [0, 0, 0.35, 0.35, 0] }, loop: { move: "slide", ms: 4000 } },
      { name: "a calm light", svg: content, keys: showFrom(0.82, 0.9), loop: { move: "twinkle", ms: 2400, low: 0.7 } },
      { name: "stream beneath", svg: stream, origin: { x: 58, y: 98 }, keys: { at: [0, 0.4, 0.41, 0.5], opacity: [0, 0, 1, 1], scaleX: [0.04, 0.04, 0.1, 1] }, loop: { move: "twinkle", ms: 1600, low: 0.8 } },
      { name: "green by the stream", svg: greenBy, keys: showFrom(0.5, 0.58), loop: { move: "sway", ms: 2600, angle: 2 } },
      {
        name: "palm tree",
        svg: tree,
        origin: { x: 66, y: 94 },
        keys: { at: [0, 0.6, 0.61, 0.62, 0.63, 0.64, 0.65, 0.66], rotate: [0, 0, 2.4, -2.4, 2, -1.6, 1, 0] },
        loop: { move: "sway", ms: 3800, angle: 1.2 }
      },
      { name: "ripe dates", svg: dates, origin: { x: 66, y: 94 }, keys: { at: [0, 0.58, 0.6, 0.61, 0.62, 0.63, 0.64, 0.65, 0.66], opacity: [0, 0, 1, 1, 1, 1, 1, 1, 1], rotate: [0, 0, 0, 2.4, -2.4, 2, -1.6, 1, 0] } },
      ...falling.map(([x, y, drop, from], index) => ({
        name: `falling date ${index + 1}`,
        svg: date(x, y),
        keys: { at: [0, 0.6, 0.61, at3(from), at3(from + 0.06)], opacity: [0, 0, 1, 1, 1], y: [0, 0, 0, 0, drop] }
      }))
    ],
    words: [
      { text: "A place far away", from: 0.02, to: 0.18 },
      { text: "By the trunk of a palm tree", from: 0.2, to: 0.38 },
      { text: "A stream beneath", from: 0.4, to: 0.58 },
      { text: "Fresh ripe dates fell", from: 0.6, to: 0.8 },
      { text: "Eat, drink and be glad", from: 0.82, to: 1 }
    ]
  };
}

const SUN_LOW = `${glow(132, 30, 16, "#FFE7A0", 0.12)}<circle cx="132" cy="30" r="7.6" fill="#FFC93C"/>`;

export const PROPHET_ART = { tur, staff, khidr, barrier, yunus, maryam };
