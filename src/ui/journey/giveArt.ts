import { animalAt, cloud, dateBunch, glow, n, palm, peaks, rainStreaks, sky, stars, tuft, type SignArt, type SignKeys } from "./signDraw";
import { towerHouse } from "./commandArt";
import { at3, showFrom } from "./storyArt";
import { crescent, home } from "./trialArt";

/**
 * Zakat, giving and the morning of Eid, drawn as the stories are (wonderArt.ts, commandArt.ts): what zakat is due on
 * (five camels and one sheep, one part in forty of silver, a tenth or half a tenth of the crops); Mu'adh sent to
 * Yemen with the order to teach; Abu Talhah's garden of Bayruha, given for Allah; zakat al-Fitr, a sa' for every one,
 * given before the Eid prayer; and the morning of Eid: dates first, out to the open prayer ground, and home by
 * another way. Only the land, the sky, homes, plants, animals and things are drawn. No Prophet, no Companion and no
 * person is ever drawn: things move by themselves, and where someone went, a dashed way shows it.
 */

/** Keys that show a part from `from` to `to`, then hide it from `hide` to `gone`. */
export const showWhile = (from: number, to: number, hide: number, gone: number): SignKeys => ({ at: [0, from, to, hide, gone], opacity: [0, 0, 1, 1, 0] });

/** A four-pointed spark of light, its middle at (x, y), `r` from its middle to its points. */
export const sparkle = (x: number, y: number, r: number, fill: string) => {
  const k = r * 0.26;
  return `<path d="M${x} ${n(y - r)} L${n(x + k)} ${n(y - k)} L${n(x + r)} ${y} L${n(x + k)} ${n(y + k)} L${x} ${n(y + r)} L${n(x - k)} ${n(y + k)} L${n(x - r)} ${y} L${n(x - k)} ${n(y - k)} Z" fill="${fill}"/>`;
};

/** Rings of a voice about (x, y), each wider than tall. */
const ring = (x: number, y: number, r: number, color = "#FFF3CF") => `<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${n(r * 0.55)}" stroke="${color}" stroke-width="0.9" fill="none"/>`;

/** A dashed way along `d` (an SVG path). */
export const way = (d: string, color = "#FFF0C4", width = 1.2) => `<path d="${d}" stroke="${color}" stroke-width="${width}" stroke-dasharray="2 2.2" fill="none" stroke-linecap="round"/>`;

/** A sack of grain tied at its neck, its foot's middle at (x, y), `s` times its size (6.4 wide). */
const sack = (x: number, y: number, s = 1, fill = "#C9A66B") =>
  `<path d="M${n(x - 3.2 * s)} ${y} C${n(x - 4 * s)} ${n(y - 3.4 * s)} ${n(x - 2.6 * s)} ${n(y - 5.6 * s)} ${n(x - 1.2 * s)} ${n(y - 6.2 * s)} L${n(x + 1.2 * s)} ${n(y - 6.2 * s)} C${n(x + 2.6 * s)} ${n(y - 5.6 * s)} ${n(x + 4 * s)} ${n(y - 3.4 * s)} ${n(x + 3.2 * s)} ${y} Z" fill="${fill}"/>` +
  `<path d="M${n(x - 1.2 * s)} ${n(y - 6.2 * s)} L${n(x - 1.8 * s)} ${n(y - 7.6 * s)} M${n(x + 1.2 * s)} ${n(y - 6.2 * s)} L${n(x + 1.8 * s)} ${n(y - 7.6 * s)}" stroke="${fill}" stroke-width="${n(0.9 * s)}" stroke-linecap="round"/>` +
  `<path d="M${n(x - 1.4 * s)} ${n(y - 6 * s)} L${n(x + 1.4 * s)} ${n(y - 6 * s)}" stroke="#7A5A30" stroke-width="${n(0.6 * s)}"/>` +
  `<path d="M${n(x + 1.2 * s)} ${n(y - 0.4 * s)} C${n(x + 2.4 * s)} ${n(y - 2.4 * s)} ${n(x + 2.4 * s)} ${n(y - 4 * s)} ${n(x + 1.4 * s)} ${n(y - 5.4 * s)}" stroke="#000000" stroke-width="${n(0.5 * s)}" fill="none" opacity="0.12"/>`;

/** A silver coin, its middle at (x, y). */
const coin = (x: number, y: number, r = 1.5) =>
  `<circle cx="${x}" cy="${y}" r="${r}" fill="#DDE2E8" stroke="#98A2AD" stroke-width="0.4"/><circle cx="${x}" cy="${y}" r="${n(r * 0.55)}" fill="none" stroke="#B8C0C9" stroke-width="0.3"/>`;

/** A basket heaped with dates, its foot's middle at (x, y). */
export const basketOfDates = (x: number, y: number) =>
  `<path d="M${n(x - 4)} ${n(y - 4)} L${n(x + 4)} ${n(y - 4)} L${n(x + 3)} ${y} L${n(x - 3)} ${y} Z" fill="#B88A4A"/>` +
  `<path d="M${n(x - 3.6)} ${n(y - 2.6)} L${n(x + 3.6)} ${n(y - 2.6)} M${n(x - 3.3)} ${n(y - 1.3)} L${n(x + 3.3)} ${n(y - 1.3)}" stroke="#946A34" stroke-width="0.4"/>` +
  [-2.4, -0.8, 0.8, 2.4, -1.6, 0, 1.6, -0.8, 0.8]
    .map((dx, i) => `<ellipse cx="${n(x + dx)}" cy="${n(y - 4.6 - (i < 4 ? 0 : i < 7 ? 1.1 : 2.1))}" rx="0.9" ry="0.7" fill="${i % 2 ? "#7A2E14" : "#93391B"}"/>`)
    .join("");

/** A sa', the wooden measure, its foot's middle at (x, y): 8 wide and 6.4 high. */
const measure = (x: number, y: number) =>
  `<rect x="${n(x - 4)}" y="${n(y - 6.4)}" width="8" height="6.4" fill="#A8743F"/><rect x="${n(x - 4)}" y="${n(y - 4.4)}" width="8" height="0.9" fill="#8A5A2E"/>` +
  `<rect x="${n(x + 0.8)}" y="${n(y - 6.4)}" width="3.2" height="6.4" fill="#000000" opacity="0.1"/><ellipse cx="${x}" cy="${n(y - 6.4)}" rx="4" ry="1.1" fill="#6E4524"/>`;
/** A sa' heaped with dates, or with barley, over a measure at (x, y). */
const heapOf = (x: number, y: number, grain: "dates" | "barley") =>
  grain === "dates"
    ? `<path d="M${n(x - 4)} ${n(y - 6.4)} Q${x} ${n(y - 11)} ${n(x + 4)} ${n(y - 6.4)} Z" fill="#7E3016"/>` +
      [-2.2, 0, 2.2, -1.1, 1.1, 0].map((dx, i) => `<ellipse cx="${n(x + dx)}" cy="${n(y - 7.4 - (i < 3 ? 0 : i < 5 ? 1.4 : 2.6))}" rx="1" ry="0.75" fill="#A2441F"/>`).join("")
    : `<path d="M${n(x - 4)} ${n(y - 6.4)} Q${x} ${n(y - 11)} ${n(x + 4)} ${n(y - 6.4)} Z" fill="#E2C374"/>` +
      [-2.4, -0.8, 0.8, 2.4, -1.6, 0, 1.6, -0.6, 0.8].map((dx, i) => `<ellipse cx="${n(x + dx)}" cy="${n(y - 7 - (i < 4 ? 0 : i < 7 ? 1.2 : 2.4))}" rx="0.6" ry="0.36" fill="#C9A24A"/>`).join("");

/** A short spear planted in the ground, its foot at (x, y), `h` high. */
const spear = (x: number, y: number, h: number) =>
  `<path d="M${x} ${y} L${x} ${n(y - h)}" stroke="#7A5A3A" stroke-width="0.9" stroke-linecap="round"/>` +
  `<path d="M${x} ${n(y - h - 3.4)} L${n(x + 1)} ${n(y - h - 0.6)} L${x} ${n(y - h + 0.2)} L${n(x - 1)} ${n(y - h - 0.6)} Z" fill="#A3ACB6"/>` +
  `<ellipse cx="${x}" cy="${y}" rx="1.6" ry="0.5" fill="#000000" opacity="0.15"/>`;

/** A low mud-brick wall from x1 to x2, its foot at y. */
export const wall = (x1: number, x2: number, y: number, h = 3) =>
  `<rect x="${x1}" y="${n(y - h)}" width="${n(x2 - x1)}" height="${h}" fill="#C7A272"/><path d="M${x1} ${n(y - h)} L${x2} ${n(y - h)}" stroke="#AD8758" stroke-width="0.6"/>`;

/** Ripe crops in a row from x1 to x2, their foot at y. */
const cropRow = (x1: number, x2: number, y: number, color: string) => {
  let out = "";
  for (let x = x1; x <= x2; x += 5) out += tuft(x, y, color, 5);
  return out;
};

// What zakat is due on. No zakat is due on fewer than five camels, five uqiyahs of silver or five wasqs of dates
// (Sahih al-Bukhari 1459); for every five camels, up to twenty-four, one sheep; on silver, a quarter of a tenth: one
// part in forty (Sahih al-Bukhari 1454); on what is watered by rivers and clouds, a tenth, and on what is watered by
// the camel at the well, half a tenth (Sahih Muslim 981). The camels come one by one, and nothing is due until the
// fifth; then one sheep goes. Forty coins, and one goes. Two fields, one under the rain and by a river, one watered
// by a camel drawing from a well: ten sacks from each, and one sack goes from the first, half a sack from the second.
// No one is drawn: what is given goes along a dashed way to a home of the poor.
function zakat(): SignArt {
  const hills = peaks(
    [
      [16, 14, 24],
      [58, 20, 30],
      [108, 16, 28],
      [150, 22, 24]
    ],
    72,
    "#C8B184",
    false
  );
  const land = `<rect y="71" width="160" height="49" fill="#DCC694"/><path d="M0 71 L160 71" stroke="#C9B07C" stroke-width="0.7"/>` + [30, 70, 112, 150].map((x, i) => tuft(x, i % 2 ? 76 : 78, "#A8B46A", 4)).join("");
  const poorHome = home(11, 100, 13, 9, "#CDB086", "#B39368", "#5E432A");
  // Five camels, each walking in from the right to its place: four, and once their words are read, the fifth.
  const slots = [30, 50, 70, 90, 110];
  const start = [0.005, 0.03, 0.055, 0.075, 0.16];
  const arrive = [0.055, 0.08, 0.105, 0.125, 0.2];
  const camels = slots.map((x, i) => ({
    name: `camel ${i + 1}`,
    svg: animalAt("camel", x, 72, 0.19, true),
    keys: { at: [0, start[i], arrive[i], 0.305, 0.325], x: [170 - x, 170 - x, 0, 0, 0], opacity: [1, 1, 1, 1, 0] },
    origin: { x: x + 9, y: 86 },
    loop: { move: "bob" as const, ms: 900, y: -0.5, rotate: 0.8, phase: i / 5 }
  }));
  const pip = (i: number) => 66 + i * 7;
  const pipRings = slots.map((_, i) => `<circle cx="${pip(i)}" cy="18" r="2.2" fill="#FFFFFF" opacity="0.5" stroke="#B88A4A" stroke-width="0.6"/>`).join("");
  const sheepAt = (x: number, y: number) => animalAt("sheep", x, y, 0.12);
  const flock = sheepAt(132, 92) + sheepAt(143, 95);
  // The way the sheep goes, and later the coin and the sack: to the home of the poor.
  const toPoor = way("M126 104 C100 106 60 107 22 102");
  // Silver on a cloth: forty coins, eight in a row, one row at a time; the last one goes.
  const coinX = (c: number) => n(52 + c * 8);
  const coinY = (r: number) => 84 + r * 4.6;
  const cloth = `<rect x="44" y="79" width="72" height="27" rx="1" fill="#7E3A33"/><rect x="45.6" y="80.6" width="68.8" height="23.8" rx="0.8" fill="none" stroke="#D9A85C" stroke-width="0.6"/>`;
  const rows = [0, 1, 2, 3, 4].map((r) => ({
    name: `silver coins, row ${r + 1}`,
    svg: [0, 1, 2, 3, 4, 5, 6, 7]
      .filter((c) => !(r === 4 && c === 7))
      .map((c) => coin(coinX(c), coinY(r)))
      .join(""),
    keys: { at: [0, at3(0.33 + r * 0.014), at3(0.342 + r * 0.014), 0.505, 0.52], opacity: [0, 0, 1, 1, 0], y: [-6, -6, 0, 0, 0] }
  }));
  // Two fields: the first under the rain, by a river; the second watered by a camel drawing from a well.
  const fields =
    `<rect x="24" y="77" width="52" height="17" fill="#A98458"/><rect x="84" y="77" width="52" height="17" fill="#A98458"/>` +
    [80, 84, 88, 92].map((y) => `<path d="M25 ${y} L75 ${y} M85 ${y} L135 ${y}" stroke="#94704A" stroke-width="0.5"/>`).join("");
  const river = `<path d="M0 74.2 C20 73 40 75.4 60 74 C68 73.4 74 74.6 80 74 L80 76.4 C72 77 66 75.8 58 76.4 C40 77.6 20 75.4 0 76.6 Z" fill="#5EA9DA"/>`;
  // The first field grows under the rain; the second only once the camel has drawn water for it.
  const green = cropRow(28, 73, 81, "#6FAF4C") + cropRow(28, 73, 87, "#6FAF4C") + cropRow(28, 73, 93, "#6FAF4C");
  const greenRight = cropRow(88, 133, 81, "#6FAF4C") + cropRow(88, 133, 87, "#6FAF4C") + cropRow(88, 133, 93, "#6FAF4C");
  const gold = cropRow(28, 73, 81, "#D9B44A") + cropRow(28, 73, 87, "#D9B44A") + cropRow(28, 73, 93, "#D9B44A");
  const goldRight = cropRow(88, 133, 81, "#D9B44A") + cropRow(88, 133, 87, "#D9B44A") + cropRow(88, 133, 93, "#D9B44A");
  const shown = [0, 0.505, 0.525];
  const well =
    `<rect x="139" y="78" width="14" height="6" fill="#A89276"/><path d="M139 80.4 L153 80.4 M143 78 L143 80.4 M149 80.4 L149 84 M146 78 L146 80.4" stroke="#8A7458" stroke-width="0.5"/>` +
    `<path d="M139 78 A7 1.8 0 0 0 153 78" stroke="#6E5A44" stroke-width="0.9" fill="none"/>`;
  const wellMouth = `<ellipse cx="146" cy="78" rx="7" ry="1.8" fill="#6E5A44"/><ellipse cx="146" cy="78" rx="5.4" ry="1.1" fill="#3C7FB0"/>`;
  const frame = `<path d="M140 78 L140 66 M152 78 L152 66 M139 66 L153 66" stroke="#7A5A3A" stroke-width="1.1" stroke-linecap="round"/><circle cx="146" cy="67.6" r="1.6" fill="#8A6A44" stroke="#5E432A" stroke-width="0.5"/>`;
  const channel = `<path d="M139 82 C137 84 136 85 134 86" stroke="#5EA9DA" stroke-width="1.2" fill="none" stroke-linecap="round"/>`;
  // The camel at the well walks away to draw the bucket up, and back to let it down: three times.
  const pull = [0.76, 0.78, 0.8, 0.82, 0.84, 0.86, 0.88];
  const away = [0, -12, 0, -12, 0, -12, 0];
  const wellCamel = animalAt("camel", 110, 63.5, 0.15, true);
  const rope = `<path d="M124 67.6 L146 67.6" stroke="#8A6A44" stroke-width="0.5"/>`;
  const bucket = `<path d="M144.4 77 L147.6 77 L147.2 80 L144.8 80 Z" fill="#7A5A3A"/><path d="M144.6 77 Q146 75.4 147.4 77" stroke="#5E432A" stroke-width="0.4" fill="none"/>`;
  const sackRow = (x0: number, y: number, skip = -1) =>
    [0, 1, 2, 3, 4]
      .filter((i) => i !== skip)
      .map((i) => sack(x0 + i * 9, y, 0.85))
      .join("");
  const rain = rainStreaks(20, 80, 34, 78);
  return {
    kind: "zakat",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 60) },
      { name: "the sun", svg: `${glow(134, 26, 14, "#FFF0C0", 0.12)}<circle cx="134" cy="26" r="6" fill="#FFE07A"/>`, keys: { at: [0, 0.505, 0.53], opacity: [1, 1, 0] } },
      { name: "clouds", svg: cloud(40, 22, 0.8, "#FFFFFF", 0.85) + cloud(100, 14, 0.7, "#FFFFFF", 0.8), loop: { move: "slide", ms: 12000 } },
      { name: "the hills", svg: hills },
      { name: "the land", svg: land },
      { name: "the home of the poor", svg: poorHome },
      // The camels, and the five marks of their count.
      { name: "five marks of the count", svg: pipRings, keys: { at: [0, 0.01, 0.03, 0.305, 0.325], opacity: [0, 0, 1, 1, 0] } },
      ...slots.map((_, i) => ({
        name: `mark ${i + 1} of the count`,
        svg: `<circle cx="${pip(i)}" cy="18" r="1.8" fill="#E0A63A"/>`,
        keys: { at: [0, at3(arrive[i] - 0.004), arrive[i], 0.305, 0.325], opacity: [0, 0, 1, 1, 0] }
      })),
      { name: "five: zakat is due", svg: glow(80, 18, 22, "#FFE7A8", 0.18), keys: showWhile(0.2, 0.21, 0.305, 0.325), loop: { move: "twinkle", ms: 1100, low: 0.55 } },
      { name: "the flock", svg: flock, keys: { at: [0, 0.305, 0.325], opacity: [1, 1, 0] }, loop: { move: "bob", ms: 1600, y: -0.4 } },
      ...camels,
      { name: "the way to the home of the poor", svg: toPoor, keys: showWhile(0.2, 0.21, 0.505, 0.52) },
      {
        name: "one sheep, given",
        svg: animalAt("sheep", 124, 96, 0.12, true),
        keys: { at: [0, 0.21, 0.26, 0.305, 0.325], x: [0, 0, -98, -98, -98], y: [0, 0, -2, -2, -2], opacity: [1, 1, 1, 1, 0] },
        origin: { x: 130, y: 104 },
        loop: { move: "bob", ms: 700, y: -0.6 }
      },
      // Silver: one part in forty.
      { name: "a cloth for the silver", svg: cloth, keys: showWhile(0.315, 0.33, 0.505, 0.52) },
      ...rows,
      {
        name: "the fortieth coin, given",
        svg: coin(coinX(7), coinY(4)),
        keys: { at: [0, 0.386, 0.398, 0.41, 0.455, 0.505, 0.52], opacity: [0, 0, 1, 1, 1, 1, 0], x: [0, 0, 0, 0, -96, -96, -96], y: [-6, -6, 0, 0, 0, 0, 0] }
      },
      { name: "light on the fortieth coin", svg: `${glow(coinX(7), coinY(4), 6, "#FFFFFF", 0.4)}${sparkle(coinX(7), n(coinY(4) - 3.4), 2, "#FFFFFF")}`, keys: { at: [0, 0.398, 0.403, 0.41, 0.455, 0.505, 0.52], opacity: [0, 0, 1, 1, 1, 1, 0], x: [0, 0, 0, 0, -96, -96, -96] } },
      // The crops: a tenth from the field under the rain, then half a tenth from the field the camel waters.
      { name: "the river by the first field", svg: river, keys: showFrom(0.505, 0.525), loop: { move: "twinkle", ms: 1800, low: 0.8 } },
      { name: "the two fields", svg: fields, keys: showFrom(0.505, 0.525) },
      { name: "rain clouds", svg: cloud(26, 30, 1.2, "#8A96A6") + cloud(50, 34, 1, "#7D8896"), keys: { at: [0, 0.51, 0.54, 0.64, 0.67], opacity: [0, 0, 1, 1, 0.3] } },
      { name: "rain on the first field", svg: rain, keys: { at: [0, 0.53, 0.55, 0.63, 0.66], opacity: [0, 0, 1, 1, 0] }, loop: { move: "fall", ms: 700, period: 50 }, clip: { x: 20, y: 34, w: 60, h: 44 } },
      { name: "the mouth of the well", svg: wellMouth, keys: showFrom(0.505, 0.525) },
      { name: "the bucket", svg: bucket, keys: { at: [...shown, ...pull], opacity: [0, 0, 1, 1, 1, 1, 1, 1, 1, 1], y: [0, 0, 0, 0, -8, 0, -8, 0, -8, 0] } },
      { name: "the well", svg: well, keys: showFrom(0.505, 0.525) },
      { name: "the well's frame", svg: frame, keys: showFrom(0.505, 0.525) },
      { name: "the rope", svg: rope, keys: { at: [...shown, ...pull], opacity: [0, 0, 1, 1, 1, 1, 1, 1, 1, 1], scaleX: [1, 1, 1, 1, 1.55, 1, 1.55, 1, 1.55, 1] }, origin: { x: 146, y: 67.6 } },
      { name: "the camel drawing water", svg: wellCamel, keys: { at: [...shown, ...pull], opacity: [0, 0, 1, 1, 1, 1, 1, 1, 1, 1], x: [0, 0, 0, ...away] }, origin: { x: 118, y: 74 } },
      { name: "green crops of the first field", svg: green, keys: { at: [0, 0.55, 0.6, 0.61, 0.635], opacity: [0, 0, 1, 1, 0], scaleY: [0.15, 0.15, 1, 1, 1] }, origin: { x: 50, y: 94 } },
      { name: "ripe crops of the first field", svg: gold, keys: showFrom(0.6, 0.635), origin: { x: 50, y: 94 }, loop: { move: "sway", ms: 2400, angle: 0.4 } },
      { name: "ten sacks from the first field", svg: sackRow(32, 100) + sackRow(32, 107, 0), keys: showFrom(0.635, 0.65) },
      { name: "a tenth, given", svg: sack(32, 107, 0.85), keys: { at: [0, 0.635, 0.65, 0.66, 0.69], opacity: [0, 0, 1, 1, 1], x: [0, 0, 0, 0, -16], y: [0, 0, 0, 0, -6] } },
      { name: "water to the second field", svg: channel, keys: showFrom(0.77, 0.785), loop: { move: "twinkle", ms: 900, low: 0.6 } },
      { name: "green crops of the second field", svg: greenRight, keys: { at: [0, 0.78, 0.84, 0.855, 0.875], opacity: [0, 0, 1, 1, 0], scaleY: [0.15, 0.15, 1, 1, 1] }, origin: { x: 110, y: 94 } },
      { name: "ripe crops of the second field", svg: goldRight, keys: showFrom(0.85, 0.875), origin: { x: 110, y: 94 }, loop: { move: "sway", ms: 2400, angle: 0.4 } },
      { name: "ten sacks from the second field", svg: sackRow(92, 100) + sackRow(92, 107, 4), keys: showFrom(0.875, 0.89) },
      { name: "the last sack of the second field", svg: sack(128, 107, 0.85), keys: { at: [0, 0.875, 0.89, 0.895, 0.91], opacity: [0, 0, 1, 1, 1], scaleY: [1, 1, 1, 1, 0.5] }, origin: { x: 128, y: 107 } },
      { name: "half a tenth, given", svg: sack(128, 107, 0.85), keys: { at: [0, 0.91, 0.912, 0.915, 0.96], opacity: [0, 0, 1, 1, 1], scaleY: [0.5, 0.5, 0.5, 0.5, 0.5], x: [0, 0, 0, 0, -112], y: [0, 0, 0, 0, -6] }, origin: { x: 128, y: 107 } },
      {
        name: "light over the home of the poor",
        svg: glow(11, 92, 16, "#FFF1C4", 0.16),
        keys: { at: [0, 0.26, 0.265, 0.31, 0.325, 0.455, 0.46, 0.505, 0.52, 0.69, 0.695, 0.745, 0.76, 0.96, 0.965], opacity: [0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1] },
        loop: { move: "twinkle", ms: 2000, low: 0.7 }
      }
    ],
    words: [
      { text: "Fewer than five camels: nothing is due", from: 0.02, to: 0.16 },
      { text: "Five camels: one sheep", from: 0.18, to: 0.3 },
      { text: "On silver: one part in forty", from: 0.32, to: 0.5 },
      { text: "Watered by rain: a tenth", from: 0.52, to: 0.74 },
      { text: "Watered by a camel: half a tenth", from: 0.76, to: 1 }
    ]
  };
}

/** Green terraces on a mountain: its outline `d`, and terrace lines at the heights in `ys` from x1 to x2. */
const terraces = (d: string, fill: string, lines: [number, number, number][]) =>
  `<path d="${d}" fill="${fill}"/>` + lines.map(([x1, x2, y]) => `<path d="M${x1} ${y} Q${n((x1 + x2) / 2)} ${n(y + 1.6)} ${x2} ${y}" stroke="#A6CF7E" stroke-width="0.9" fill="none"/>`).join("");

// Mu'adh sent to Yemen: call them first to bear witness that none has the right to be worshipped but Allah and that
// Muhammad is His Messenger; if they obey, teach them that Allah has made five prayers their duty in every day and night; if they obey, teach them that
// Allah has made zakat their duty, taken from their rich and given back to their poor (Sahih al-Bukhari 1395, 1496).
// Yemen's green terraced mountains and its tall houses of stone and mud brick, the homes of the poor below. Mu'adh is
// not drawn: a dashed way comes down from the north. The light of the testimony; the sun crossing the sky and the
// night, with five lamps lit one by one; and from the tall houses, sacks and a sheep go down to the homes of the poor.
function yemen(): SignArt {
  const left = terraces("M0 74 L0 52 C12 44 22 38 32 40 C44 42 56 56 70 74 Z", "#7FB45A", [
    [6, 34, 52],
    [4, 46, 60],
    [2, 58, 68]
  ]);
  const right = terraces("M60 76 C76 62 96 40 118 36 C136 34 150 44 160 50 L160 76 Z", "#6FA84E", [
    [100, 140, 44],
    [86, 154, 52],
    [74, 160, 60],
    [66, 160, 68]
  ]);
  const land = `<rect y="75" width="160" height="45" fill="#B9A06E"/><path d="M0 75 L160 75" stroke="#A88E5E" stroke-width="0.7"/>` + [20, 54, 92, 146].map((x, i) => tuft(x, i % 2 ? 82 : 80, "#8AA45A", 4)).join("");
  const rich = towerHouse(104, 82, 9, 24) + towerHouse(118, 80, 10, 30) + towerHouse(133, 82, 9, 22);
  const poor = home(26, 102, 12, 8, "#C9AE84", "#B09468", "#5E432A") + home(44, 105, 11, 7, "#C4A87E", "#AA8E62", "#5E432A") + home(60, 102, 10, 7, "#CBB088", "#B2966A", "#5E432A");
  const fromNorth = ["M0 58 C10 60 18 62 26 66", "M26 66 C38 70 52 74 66 78", "M66 78 C76 81 86 83 96 84"];
  const lamps = [58, 69, 80, 91, 102];
  const lampAt = [0.47, 0.535, 0.565, 0.615, 0.645];
  const sunKeys: SignKeys = {
    at: [0, 0.445, 0.455, 0.475, 0.49, 0.53, 0.57, 0.6, 0.61],
    x: [-30, -30, -66, -66, -56, 0, 42, 66, 66],
    y: [10, 10, 44, 44, 26, 0, 12, 40, 48],
    opacity: [1, 1, 0, 0, 1, 1, 1, 1, 0]
  };
  const down = way("M112 86 C98 90 84 96 70 100 C62 102 54 103 46 104");
  return {
    kind: "yemen",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 62) },
      { name: "the sun", svg: `${glow(80, 14, 13, "#FFF0C0", 0.12)}<circle cx="80" cy="14" r="5.6" fill="#FFE07A"/>`, keys: sunKeys },
      { name: "clouds", svg: cloud(30, 18, 0.7, "#FFFFFF", 0.85) + cloud(126, 12, 0.6, "#FFFFFF", 0.8), loop: { move: "slide", ms: 12000 } },
      { name: "terraced mountains to the north", svg: left },
      { name: "terraced mountains of Yemen", svg: right },
      { name: "the land", svg: land },
      { name: "tall houses of the rich", svg: rich },
      { name: "homes of the poor", svg: poor },
      ...fromNorth.map((d, i) => ({ name: `the way from the north, part ${i + 1}`, svg: way(d), keys: { at: [0, at3(0.04 + i * 0.05), at3(0.07 + i * 0.05), 0.22, 0.28], opacity: [0, 0, 1, 1, 0.35] } })),
      { name: "light of the testimony", svg: glow(92, 66, 30, "#FFF4D0", 0.09), keys: { at: [0, 0.24, 0.32, 0.44, 0.48], opacity: [0, 0, 1, 1, 0], scale: [0.2, 0.2, 1, 1, 1] }, origin: { x: 92, y: 66 }, loop: { move: "twinkle", ms: 2600, low: 0.75 } },
      { name: "a spark of the testimony", svg: sparkle(92, 56, 4.4, "#FFE7A0"), keys: showWhile(0.26, 0.3, 0.445, 0.46), loop: { move: "twinkle", ms: 1200, low: 0.5 } },
      { name: "before dawn", svg: `<rect width="160" height="120" fill="#22305A" opacity="0.5"/>`, keys: showWhile(0.445, 0.455, 0.475, 0.49) },
      { name: "night", svg: `<rect width="160" height="120" fill="#0F1C3A" opacity="0.62"/>`, keys: { at: [0, 0.6, 0.625, 0.675, 0.69], opacity: [0, 0, 1, 1, 0] } },
      { name: "the moon", svg: crescent(128, 18, 4.4, 2, "#FFF3C4"), keys: { at: [0, 0.61, 0.635, 0.675, 0.69], opacity: [0, 0, 1, 1, 0] } },
      { name: "stars", svg: stars([[22, 12], [44, 22], [66, 10], [104, 16], [148, 26], [140, 8]]), keys: { at: [0, 0.61, 0.635, 0.675, 0.69], opacity: [0, 0, 1, 1, 0] }, loop: { move: "twinkle", ms: 1400, low: 0.4 } },
      { name: "the sun again", svg: `${glow(80, 14, 13, "#FFF0C0", 0.12)}<circle cx="80" cy="14" r="5.6" fill="#FFE07A"/>`, keys: { at: [0, 0.675, 0.695], opacity: [0, 0, 1], x: [-66, -66, -36], y: [40, 40, 8] } },
      ...lamps.map((x, i) => ({
        name: `lamp of prayer ${i + 1}`,
        svg: `${glow(x, 44, 5, "#FFFFFF", 0.3)}${sparkle(x, 44, 2.6, "#FFD25A")}`,
        keys: { at: [0, at3(lampAt[i] - 0.005), lampAt[i]], opacity: [0, 0, 1], scale: [0.2, 0.2, 1] },
        origin: { x, y: 44 },
        loop: { move: "twinkle" as const, ms: 1600, low: 0.7, phase: i / 5 }
      })),
      { name: "the way down to the poor", svg: down, keys: showFrom(0.76, 0.78) },
      ...[
        { name: "a sack of grain from the tall houses", svg: sack(112, 86, 0.9), at: 0.87, dx: -62, dy: 19 },
        { name: "a second sack", svg: sack(122, 86, 0.9, "#BF9A5E"), at: 0.885, dx: -56, dy: 16 },
        { name: "a sheep from the tall houses", svg: animalAt("sheep", 126, 77, 0.11, true), at: 0.9, dx: -92, dy: 17 }
      ].map((each, i) => ({
        name: each.name,
        svg: each.svg,
        keys: { at: [0, 0.72, 0.75, each.at, at3(each.at + 0.06)], opacity: [0, 0, 1, 1, 1], x: [0, 0, 0, 0, each.dx], y: [0, 0, 0, 0, each.dy] },
        origin: { x: 116, y: 86 },
        ...(i === 2 ? { loop: { move: "bob" as const, ms: 700, y: -0.5 } } : {})
      })),
      { name: "light over the homes of the poor", svg: glow(44, 98, 24, "#FFF1C4", 0.08), keys: showFrom(0.96, 0.975), loop: { move: "twinkle", ms: 2000, low: 0.65 } }
    ],
    words: [
      { text: "Sent to Yemen", from: 0.02, to: 0.22 },
      { text: "First: the shahadah", from: 0.24, to: 0.44 },
      { text: "Then five prayers, day and night", from: 0.46, to: 0.7 },
      { text: "Then zakat from their rich", from: 0.72, to: 0.86 },
      { text: "Given to their poor", from: 0.88, to: 1 }
    ]
  };
}

/** The masjid in Madinah as it was built: walls of mud brick, a roof of palm leaves on palm trunks; its foot's left at
 * (x, y), `s` times its size (48 wide). */
const madinahMasjid = (x: number, y: number, s: number) =>
  `<g transform="translate(${x} ${y}) scale(${s})">` +
  `<rect x="0" y="-15.6" width="48" height="10" fill="#7E6447"/>` +
  [4, 12, 20, 28, 36, 44].map((px) => `<rect x="${n(px - 0.8)}" y="-15.6" width="1.6" height="10" fill="#A9895C"/>`).join("") +
  `<rect x="0" y="-6" width="48" height="6" fill="#D8B98A"/><path d="M0 -6 L48 -6" stroke="#B89A6C" stroke-width="0.6"/><rect x="21.6" y="-6" width="4.8" height="6" fill="#6E5638"/>` +
  `<path d="M-2.4 -15 L50.4 -15 L48.6 -19 L-0.6 -19 Z" fill="#6E8F3A"/><path d="M1 -17 L5 -18.4 M7 -16.6 L11 -18.2 M13 -17 L17 -18.4 M19 -16.6 L23 -18.2 M25 -17 L29 -18.4 M31 -16.6 L35 -18.2 M37 -17 L41 -18.4 M43 -16.6 L47 -18.2" stroke="#56742B" stroke-width="0.6"/>` +
  `</g>`;

// Abu Talhah had more palm gardens than anyone of the Ansar in Madinah, and the one he loved most was Bayruha, facing
// the masjid; the Prophet ﷺ would go into it and drink of its good water. When the ayah came down: you will not attain
// righteousness until you spend from what you love (Quran 3:92), he gave it for Allah, and he ﷺ said: I think you
// should give it to your relatives; so Abu Talhah shared it among his relatives and his cousins (Sahih al-Bukhari
// 1461). No one is drawn: the garden, its well, the masjid facing it, the light of the gift going up, and baskets of its
// dates going along dashed ways to the homes of his relatives.
function bayruha(): SignArt {
  const uhud = peaks(
    [
      [40, 22, 34],
      [86, 28, 40],
      [132, 18, 30]
    ],
    66,
    "#B9876A",
    false
  );
  const land = `<rect y="65" width="160" height="55" fill="#E2CB9C"/><path d="M0 65 L160 65" stroke="#CDB283" stroke-width="0.7"/>`;
  const garden = `<rect x="6" y="70" width="74" height="26" fill="#BFC98A"/>` + [12, 26, 40, 54, 68, 20, 48, 62].map((x, i) => tuft(x, i < 5 ? 94 : 82, "#7FA650", 4)).join("");
  const palms = palm(14, 88, 20) + palm(30, 84, 24) + palm(52, 86, 22) + palm(70, 88, 18);
  const dates = dateBunch(16.6, 70.6) + dateBunch(33, 63) + dateBunch(54.8, 66.4) + dateBunch(72.4, 72.4) + dateBunch(29, 63.6) + dateBunch(50.6, 66.8);
  const gardenWall = wall(4, 82, 97, 3.2) + wall(4, 6.4, 97, 26) + wall(79.6, 82, 97, 26);
  const well =
    `<rect x="35" y="90" width="14" height="5.4" fill="#A89276"/><path d="M35 92.4 L49 92.4 M39 90 L39 92.4 M45 90 L45 92.4 M42 92.4 L42 95.4" stroke="#8A7458" stroke-width="0.5"/>` +
    `<ellipse cx="42" cy="90" rx="7" ry="1.9" fill="#6E5A44"/><ellipse cx="42" cy="90" rx="5.4" ry="1.2" fill="#3C9AD0"/>`;
  const relatives = [
    { x: 102, y: 106, w: 12, h: 8 },
    { x: 124, y: 104, w: 11, h: 8 },
    { x: 146, y: 106, w: 12, h: 9 }
  ];
  const homes = relatives.map((each) => home(each.x, each.y, each.w, each.h, "#D3B585", "#BC9A6A", "#6B4A2E")).join("");
  const ways = relatives.map((each, i) => way(`M70 99 C${82 + i * 6} ${101 + i} ${n(each.x - 12)} ${n(each.y - 2)} ${n(each.x - 3)} ${n(each.y - 1)}`, "#F4E3BC", 1.1));
  return {
    kind: "bayruha",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 60) },
      { name: "the sun", svg: `${glow(146, 18, 12, "#FFF0C0", 0.12)}<circle cx="146" cy="18" r="5.4" fill="#FFE07A"/>` },
      { name: "clouds", svg: cloud(64, 16, 0.7, "#FFFFFF", 0.85) + cloud(116, 26, 0.6, "#FFFFFF", 0.8), loop: { move: "slide", ms: 12000 } },
      { name: "Uhud far away", svg: uhud },
      { name: "the land", svg: land },
      { name: "the masjid, facing the garden", svg: madinahMasjid(98, 88, 1.05) },
      { name: "the garden of Bayruha", svg: garden },
      { name: "its well", svg: well },
      { name: "sweet water in the well", svg: sparkle(40, 89.6, 2, "#FFFFFF") + sparkle(44.6, 90.2, 1.4, "#FFFFFF"), keys: showFrom(0.24, 0.3), loop: { move: "twinkle", ms: 900, low: 0.2 } },
      { name: "its palms", svg: palms, origin: { x: 42, y: 88 }, loop: { move: "sway", ms: 3200, angle: 0.8 } },
      { name: "ripe dates", svg: dates, keys: { at: [0, 0.05, 0.12], opacity: [0, 0, 1], scale: [0.6, 0.6, 1] }, origin: { x: 44, y: 68 } },
      { name: "the garden's wall", svg: gardenWall },
      { name: "birds over the garden", svg: [[22, 40], [30, 36], [60, 44]].map(([x, y]) => `<path d="M${x} ${y} q1.8 -1.5 3.6 0 q1.8 -1.5 3.6 0" stroke="#5A5A5A" stroke-width="0.6" fill="none" stroke-linecap="round"/>`).join(""), loop: { move: "bob", ms: 2600, x: 4, y: -1.5 } },
      { name: "light on the masjid", svg: glow(123, 78, 20, "#FFF4D0", 0.09), keys: showWhile(0.22, 0.27, 0.425, 0.44), loop: { move: "twinkle", ms: 1800, low: 0.6 } },
      { name: "the garden, loved", svg: glow(42, 80, 30, "#FFE9C4", 0.09), keys: showWhile(0.44, 0.5, 0.625, 0.64), loop: { move: "twinkle", ms: 1600, low: 0.6 } },
      { name: "light over the garden, given", svg: glow(42, 80, 24, "#FFF4D0", 0.1), keys: showWhile(0.64, 0.7, 0.805, 0.82), loop: { move: "twinkle", ms: 1300, low: 0.6 } },
      // Sparks of the gift rise from the garden, one after another.
      ...[24, 36, 48, 60, 42].map((x, i) => {
        const start = at3(0.645 + i * 0.015);
        return {
          name: `a spark of the gift, rising ${i + 1}`,
          svg: sparkle(x, 70, i % 2 ? 2.2 : 2.8, "#FFE7A0"),
          keys: { at: [0, start, at3(start + 0.01), at3(start + 0.05), at3(start + 0.06)], opacity: [0, 0, 1, 1, 0], y: [0, 0, -6, -30, -36] },
          loop: { move: "twinkle" as const, ms: 1000, low: 0.5, phase: i / 5 }
        };
      }),
      { name: "homes of his relatives", svg: homes },
      ...ways.map((svg, i) => ({ name: `the way to a relative's home ${i + 1}`, svg, keys: showFrom(at3(0.825 + i * 0.02), at3(0.845 + i * 0.02)) })),
      ...relatives.map((each, i) => ({
        name: `a basket of dates for a relative ${i + 1}`,
        svg: basketOfDates(70, 99),
        keys: { at: [0, at3(0.83 + i * 0.03), at3(0.85 + i * 0.03), at3(0.93 + i * 0.02)], opacity: [0, 0, 1, 1], x: [0, 0, 0, n(each.x - 76)], y: [0, 0, 0, n(each.y - 99)] }
      }))
    ],
    words: [
      { text: "Bayruha, the garden he loved most", from: 0.02, to: 0.2 },
      { text: "Facing the masjid, its water sweet", from: 0.22, to: 0.42 },
      { text: "Spend from what you love", from: 0.44, to: 0.62 },
      { text: "He gave it for Allah", from: 0.64, to: 0.8 },
      { text: "Shared among his relatives", from: 0.82, to: 1 }
    ]
  };
}

// Zakat al-Fitr: the Messenger of Allah ﷺ made it a sa' of dates or a sa' of barley, on every Muslim, slave or free,
// male or female, young or old, and ordered that it be given before the people go out to the prayer (Sahih al-Bukhari
// 1503); they gave a sa' of food, of barley, of dates, of dried curd or of raisins (Sahih al-Bukhari 1506). No one is
// drawn: the night before Eid turns to dawn; at a home's door, one sa' for each one in it, the last no smaller than the
// first; dates in three and barley in two; and before the sun is up they go along a dashed way to the homes of the
// poor. Then the sun rises over the open prayer ground.
function fitr(): SignArt {
  const night = `<rect width="160" height="120" fill="#0F1C3A"/><rect y="40" width="160" height="80" fill="#1C2F55"/>`;
  const dawn = `<rect width="160" height="120" fill="#F2C9A0"/><rect y="40" width="160" height="80" fill="#F6DDBB"/>`;
  const day = sky("#BFE3FA", "#E3F2FB", 60);
  const hills = peaks(
    [
      [20, 14, 26],
      [70, 18, 30],
      [128, 16, 30]
    ],
    72,
    "#8E7A62",
    false
  );
  const land = `<rect y="71" width="160" height="49" fill="#CDB487"/><path d="M0 71 L160 71" stroke="#B89D70" stroke-width="0.7"/>`;
  const house = home(36, 98, 26, 18, "#D3A872", "#BC9060", "#6B4A2E");
  const poor = home(112, 92, 14, 9, "#C9AE84", "#B09468", "#5E432A") + home(136, 96, 13, 9, "#C4A87E", "#AA8E62", "#5E432A");
  const ground = `<ellipse cx="148" cy="74" rx="12" ry="2.2" fill="#E8D7B0"/>`;
  const slots = [18, 27, 36, 45, 54];
  const grains: ("dates" | "barley")[] = ["dates", "dates", "dates", "barley", "barley"];
  // The first three go to the first home of the poor, the last two to the second.
  const dest = (i: number) => (i < 3 ? { x: 106 + i * 6, y: 92 } : { x: 133 + (i - 3) * 6, y: 96 });
  // Each sa' comes in turn, the last before the night's first words end; at dawn the first three go, then the last two.
  const comeAt = [0.03, 0.06, 0.09, 0.12, 0.145];
  const goAt = (i: number) => (i < 3 ? 0.62 : 0.68);
  return {
    kind: "fitr",
    ms: 12000,
    parts: [
      { name: "night before Eid", svg: night },
      { name: "dawn", svg: dawn, keys: { at: [0, 0.385, 0.5, 0.8, 0.86], opacity: [0, 0, 1, 1, 0] } },
      { name: "morning", svg: day, keys: showFrom(0.8, 0.88) },
      { name: "stars", svg: stars([[16, 12], [40, 22], [62, 8], [92, 18], [118, 10], [142, 24], [150, 8]]), keys: { at: [0, 0.385, 0.46], opacity: [1, 1, 0] }, loop: { move: "twinkle", ms: 1600, low: 0.4 } },
      { name: "the thin moon", svg: crescent(30, 22, 3.4, 1.2, "#FFF3C4"), keys: { at: [0, 0.385, 0.46], opacity: [1, 1, 0] } },
      { name: "the sun rising", svg: `${glow(148, 62, 14, "#FFF0C0", 0.14)}<circle cx="148" cy="62" r="6" fill="#FFD25A"/>`, keys: { at: [0, 0.82, 0.92], opacity: [0, 0, 1], y: [10, 10, -18] } },
      { name: "the hills", svg: hills },
      { name: "the land", svg: land },
      { name: "the open prayer ground, far away", svg: ground + spear(148, 74, 6) },
      { name: "light over the prayer ground", svg: glow(148, 70, 16, "#FFF4D0", 0.12), keys: showFrom(0.88, 0.94), loop: { move: "twinkle", ms: 1800, low: 0.6 } },
      { name: "night over the land", svg: `<rect y="71" width="160" height="49" fill="#0F1C3A" opacity="0.5"/>`, keys: { at: [0, 0.385, 0.5], opacity: [1, 1, 0] } },
      { name: "the home", svg: house },
      { name: "homes of the poor", svg: poor },
      { name: "lamp in the home", svg: `${glow(43, 85, 6, "#FFD27A", 0.3)}<rect x="41.6" y="83.6" width="2.8" height="2.6" fill="#FFD27A"/>`, keys: { at: [0, 0.555, 0.57], opacity: [1, 1, 0] }, loop: { move: "twinkle", ms: 900, low: 0.6 } },
      { name: "the way to the poor", svg: way("M54 101 C74 103 92 100 104 94 M86 100 C100 102 118 101 132 98", "#F4E3BC", 1.1), keys: showFrom(0.6, 0.63) },
      ...slots.map((x, i) => {
        const to = dest(i);
        const go = goAt(i);
        const keys: SignKeys = {
          at: [0, comeAt[i], at3(comeAt[i] + 0.02), at3(go + (i % 3) * 0.02), at3(go + 0.06 + (i % 3) * 0.02)],
          opacity: [0, 0, 1, 1, 1],
          scale: [0.2, 0.2, 1, 1, 1],
          x: [0, 0, 0, 0, n(to.x - x)],
          y: [0, 0, 0, 0, n(to.y + 4 - 104)]
        };
        return [
          { name: `a sa' for one in the home ${i + 1}`, svg: measure(x, 104), keys, origin: { x, y: 104 } },
          {
            name: `${grains[i]} in the sa' ${i + 1}`,
            svg: heapOf(x, 104, grains[i]),
            keys: { at: [0, at3(0.4 + i * 0.03), at3(0.42 + i * 0.03), keys.at[3], keys.at[4]], opacity: [0, 0, 1, 1, 1], scale: [0.2, 0.2, 1, 1, 1], x: [0, 0, 0, 0, n(to.x - x)], y: [0, 0, 0, 0, n(to.y + 4 - 104)] },
            origin: { x, y: 98 }
          },
          {
            name: `one for each: a spark over the sa' ${i + 1}`,
            svg: sparkle(x, 92, 2.2, "#FFE7A0"),
            keys: showWhile(at3(0.23 + i * 0.025), at3(0.24 + i * 0.025), 0.36, 0.375),
            loop: { move: "twinkle" as const, ms: 1000, low: 0.4, phase: i / 5 }
          }
        ];
      }).flat(),
      { name: "light over the homes of the poor", svg: glow(124, 90, 22, "#FFF1C4", 0.08), keys: showFrom(0.76, 0.765), loop: { move: "twinkle", ms: 2000, low: 0.65 } }
    ],
    words: [
      { text: "A sa' for every one", from: 0.02, to: 0.2 },
      { text: "Young or old", from: 0.22, to: 0.38 },
      { text: "Of dates or barley", from: 0.4, to: 0.58 },
      { text: "Given before the Eid prayer", from: 0.6, to: 0.8 },
      { text: "Then out to the prayer", from: 0.82, to: 1 }
    ]
  };
}

// The morning of Eid: he ﷺ would not go out on the day of Eid al-Fitr until he had eaten some dates, and he ate them
// in an odd number (Sahih al-Bukhari 953); he went out to the open prayer ground, and a short spear was planted in front
// of him, and he prayed facing it with the people behind him (Sahih al-Bukhari 494); the first thing he did was the
// prayer, then he stood and gave the khutbah while they sat in their rows (Sahih al-Bukhari 956); and he came back by
// another way than the one he went by (Sahih al-Bukhari 986). No one is drawn: a home in Madinah, a plate of three
// dates by its door, one taken at a time; the open prayer ground with its spear; the calm of the prayer and the rings
// of the khutbah; and two dashed ways, one going and one coming back.
function eid(): SignArt {
  const hills = peaks(
    [
      [24, 16, 28],
      [80, 22, 34],
      [138, 18, 30]
    ],
    66,
    "#B9876A",
    false
  );
  const land = `<rect y="65" width="160" height="55" fill="#E2CB9C"/><path d="M0 65 L160 65" stroke="#CDB283" stroke-width="0.7"/>`;
  const homes = home(22, 92, 22, 16, "#D3A872", "#BC9060", "#6B4A2E") + home(10, 78, 12, 9, "#D8B585", "#BF9A6A", "#6B4A2E") + home(40, 76, 12, 8, "#DCBD8E", "#C2A272", "#6B4A2E");
  const ground = `<ellipse cx="122" cy="88" rx="30" ry="7" fill="#EEE0BE"/><ellipse cx="122" cy="88" rx="30" ry="7" fill="none" stroke="#D9C59A" stroke-width="0.6"/>`;
  const palms = palm(64, 72, 14) + palm(98, 70, 12) + palm(152, 74, 16) + palm(6, 100, 13);
  const plate = `<ellipse cx="25" cy="100" rx="9.5" ry="2.6" fill="#C9A86A"/><ellipse cx="25" cy="99.6" rx="8" ry="2" fill="#E6CB8E"/>`;
  const dateAt = (x: number) => `<ellipse cx="${x}" cy="98.2" rx="2.1" ry="1.5" fill="#8E3A1C"/><ellipse cx="${n(x - 0.7)}" cy="97.7" rx="0.7" ry="0.48" fill="#C26A40"/>`;
  const going = ["M32 91 C44 84 56 80 70 79", "M70 79 C82 78 92 80 100 83", "M100 83 C106 84 110 85 116 86"];
  const coming = ["M126 93 C114 100 98 104 84 105", "M84 105 C70 106 56 105 46 103", "M46 103 C40 101 34 100 30 99"];
  return {
    kind: "eid",
    ms: 12000,
    parts: [
      { name: "early sky", svg: sky("#F6D2A8", "#FBE6C8", 60) },
      { name: "morning sky", svg: sky("#BFE3FA", "#DDF1FC", 60), keys: showFrom(0.03, 0.12) },
      { name: "the sun rising", svg: `${glow(138, 40, 14, "#FFF0C0", 0.14)}<circle cx="138" cy="40" r="6" fill="#FFD25A"/>`, keys: { at: [0, 0.02, 0.12], y: [16, 16, -14] } },
      { name: "birds of the morning", svg: [[30, 18], [37, 14], [86, 16], [112, 13]].map(([x, y]) => `<path d="M${x} ${y} q1.8 -1.5 3.6 0 q1.8 -1.5 3.6 0" stroke="#5A5A5A" stroke-width="0.6" fill="none" stroke-linecap="round"/>`).join(""), keys: showFrom(0.08, 0.12), loop: { move: "slide", ms: 11000 } },
      { name: "the hills", svg: hills },
      { name: "the land", svg: land },
      { name: "the open prayer ground", svg: ground },
      { name: "palms of Madinah", svg: palms, origin: { x: 80, y: 74 }, loop: { move: "sway", ms: 3400, angle: 0.6 } },
      { name: "homes of Madinah", svg: homes },
      { name: "a plate by the door", svg: plate, keys: { at: [0, 0.165, 0.18, 0.345, 0.36], opacity: [0, 0, 1, 1, 0] } },
      ...[20, 25, 30].map((x, i) => ({
        name: `date ${i + 1} of three`,
        svg: dateAt(x),
        keys: { at: [0, 0.17, 0.185, at3(0.22 + i * 0.025), at3(0.24 + i * 0.025)], opacity: [0, 0, 1, 1, 0], y: [0, 0, 0, 0, -3] }
      })),
      { name: "an odd number: three", svg: sparkle(25, 91.5, 2.8, "#FFE7A0"), keys: showWhile(0.29, 0.295, 0.34, 0.355), loop: { move: "twinkle", ms: 700, low: 0.4 } },
      ...going.map((d, i) => ({ name: `the way out, part ${i + 1}`, svg: way(d), keys: { at: [0, at3(0.365 + i * 0.025), at3(0.39 + i * 0.025), 0.765, 0.8], opacity: [0, 0, 1, 1, 0.3] } })),
      { name: "the short spear, planted", svg: spear(122, 84, 10), keys: { at: [0, 0.445, 0.475], opacity: [0, 0, 1], scaleY: [0.1, 0.1, 1] }, origin: { x: 122, y: 84 } },
      { name: "calm of the prayer", svg: glow(122, 84, 26, "#FFF4D0", 0.1), keys: showWhile(0.54, 0.58, 0.62, 0.635), loop: { move: "twinkle", ms: 2200, low: 0.7 } },
      ...[5, 9, 13].map((r, i) => ({
        name: `the khutbah, ring ${i + 1}`,
        svg: ring(122, 66, r),
        keys: showWhile(0.635, 0.65, 0.715, 0.73),
        loop: { move: "twinkle" as const, ms: 1100, low: 0.1, phase: i / 3 }
      })),
      ...coming.map((d, i) => ({ name: `the way home, another way, part ${i + 1}`, svg: way(d, "#FFE7A0", 1.3), keys: showFrom(at3(0.77 + i * 0.05), at3(0.8 + i * 0.05)) })),
      { name: "light over the home", svg: glow(22, 86, 20, "#FFF1C4", 0.12), keys: showFrom(0.92, 0.97), loop: { move: "twinkle", ms: 2000, low: 0.7 } }
    ],
    words: [
      { text: "The morning of Eid", from: 0.02, to: 0.16 },
      { text: "Dates first, an odd number", from: 0.18, to: 0.34 },
      { text: "Out to the open prayer ground", from: 0.36, to: 0.52 },
      { text: "The prayer first, then the khutbah", from: 0.54, to: 0.74 },
      { text: "Home by another way", from: 0.76, to: 1 }
    ]
  };
}

export const GIVE_ART = { zakat, yemen, bayruha, fitr, eid };
