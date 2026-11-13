/**
 * The animals of the animal questions (animalQuestions.ts), drawn for their picture cards (AnimalGame.tsx): each in a
 * box 100 wide and 80 high, facing right, in plain shapes. A flying animal's wings are drawn apart (`wings`), so they
 * can beat; each animal moves its own way (`motion`) in its own place (`home`). Only animals are drawn: never a
 * person, and nothing that stands for one.
 */

export type AnimalKind =
  | "camel"
  | "horse"
  | "donkey"
  | "mule"
  | "cow"
  | "goat"
  | "sheep"
  | "dog"
  | "cat"
  | "lion"
  | "wolf"
  | "bear"
  | "deer"
  | "elephant"
  | "bird"
  | "crow"
  | "eagle"
  | "dove"
  | "hoopoe"
  | "sparrow"
  | "fish"
  | "whale"
  | "ant"
  | "bee"
  | "spider"
  | "mosquito"
  | "fly"
  | "locust"
  | "scorpion"
  | "snake";

/** How an animal moves: walks on the spot, flies with beating wings, buzzes about, swims, or creeps along. */
export type AnimalMotion = "walk" | "fly" | "buzz" | "swim" | "creep";
/** Where it is drawn: on the sand under the sky, in the sky, in the sea, or on the ground close up. */
export type AnimalHome = "land" | "sky" | "sea" | "ground";

export type AnimalArt = {
  kind: AnimalKind;
  motion: AnimalMotion;
  home: AnimalHome;
  /** The animal, but for the wings of one that flies. */
  body: string;
  /** The wings, drawn over the body, beating up and down about `pivot` (the line where they join the body). */
  wings?: string;
  pivot?: number;
};

export const ANIMAL_BOX = { width: 100, height: 80 } as const;

const INK = "#2B2B2B";
const svg = (inner: string) => `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="80" viewBox="0 0 100 80">${inner}</svg>`;
/** An eye: dark, with a glint. */
const eye = (x: number, y: number, r = 1.7) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${INK}"/><circle cx="${x + r * 0.35}" cy="${y - r * 0.35}" r="${(r * 0.4).toFixed(2)}" fill="#FFFFFF"/>`;
/** A leg standing on the ground (y 73), with its hoof or foot. */
const leg = (x: number, top: number, width: number, color: string, foot?: string) =>
  `<rect x="${x}" y="${top}" width="${width}" height="${73 - top}" rx="${(width / 2).toFixed(1)}" fill="${color}"/>` +
  (foot ? `<rect x="${x - 0.4}" y="70" width="${width + 0.8}" height="3.4" rx="1.2" fill="${foot}"/>` : "");
/** The animal's shadow on the ground. */
const shadow = (cx: number, rx: number) => `<ellipse cx="${cx}" cy="74" rx="${rx}" ry="2.6" fill="#000000" opacity="0.12"/>`;

function camel() {
  const main = "#E2AC62";
  const far = "#C48A42";
  return svg(
    shadow(48, 30) +
      leg(37, 46, 5, far, "#9C6A30") +
      leg(62, 46, 5, far, "#9C6A30") +
      `<path d="M23 40 Q17 47 19 57" stroke="${far}" stroke-width="2.4" fill="none" stroke-linecap="round"/><path d="M17.5 55 L19 61 L21 55 Z" fill="#8A5A26"/>` +
      `<ellipse cx="44" cy="41" rx="22" ry="10.5" fill="${main}"/>` +
      `<path d="M27 38 C28 20 50 13 58 36 Z" fill="${main}"/>` +
      leg(30, 47, 5.4, main, "#9C6A30") +
      leg(55, 47, 5.4, main, "#9C6A30") +
      `<rect x="30" y="58" width="5.4" height="3" rx="1.5" fill="${far}"/><rect x="55" y="58" width="5.4" height="3" rx="1.5" fill="${far}"/>` +
      `<path d="M58 34 C66 33 69 28 71 20 C72 15 75 12 79 12 L82 17 C79 18 78 21 77 26 C75 37 70 45 61 48 Z" fill="${main}"/>` +
      `<path d="M75 13 C79 8 88 9 92 13 C95 16 94 20 90 21 L82 21 C77 20 74 17 75 13 Z" fill="${main}"/>` +
      `<path d="M77 11 L76 6.5 L80 10 Z" fill="${far}"/>` +
      eye(83, 13.5) +
      `<path d="M89 18 Q91.5 19 93 17.5" stroke="#8A5A26" stroke-width="1.1" fill="none" stroke-linecap="round"/>`
  );
}

function horseLike({ main, far, light, mane, ears, tail }: { main: string; far: string; light?: string; mane: string; ears: "short" | "long"; tail: "full" | "tuft" }) {
  const earShapes =
    ears === "long"
      ? `<ellipse cx="66" cy="11" rx="2.4" ry="8" transform="rotate(-18 66 11)" fill="${far}"/><ellipse cx="70.5" cy="10" rx="2.6" ry="8.4" transform="rotate(8 70.5 10)" fill="${main}"/><ellipse cx="70.6" cy="10.5" rx="1.1" ry="5.6" transform="rotate(8 70.6 10.5)" fill="${light ?? far}"/>`
      : `<path d="M67 14 L68 7 L71 13 Z" fill="${far}"/><path d="M70 14 L72 7.5 L74 14 Z" fill="${main}"/>`;
  const tailShape =
    tail === "full"
      ? `<path d="M26 35 C12 37 9 54 15 65 C17 57 20 50 27 45 Z" fill="${mane}"/>`
      : `<path d="M25 38 Q19 44 20 55" stroke="${main}" stroke-width="2.2" fill="none" stroke-linecap="round"/><path d="M18 53 Q20 61 22 53 Z" fill="${mane}"/>`;
  return svg(
    shadow(47, 28) +
      leg(34, 44, 4.6, far, "#3B2A20") +
      leg(58, 44, 4.6, far, "#3B2A20") +
      tailShape +
      `<ellipse cx="44" cy="41" rx="21" ry="10" fill="${main}"/>` +
      (light ? `<ellipse cx="44" cy="46.5" rx="15" ry="4.5" fill="${light}"/>` : "") +
      leg(28, 45, 5, main, "#3B2A20") +
      leg(53, 45, 5, main, "#3B2A20") +
      `<path d="M55 34 C59 28 62 22 65 17 L73 19 C72 27 69 36 64 46 Z" fill="${main}"/>` +
      `<path d="M64 15 C67 11 73 11 76 14 L88 25 C91 28 89 33 85 32 L74 28 C68 26 64 21 64 15 Z" fill="${main}"/>` +
      (light ? `<ellipse cx="86" cy="29" rx="4.6" ry="3.6" fill="${light}"/>` : "") +
      earShapes +
      `<path d="M64 14 C60 20 57 27 54 34 L58 35 C60 29 62 24 66 18 Z" fill="${mane}"/>` +
      eye(73, 17.5) +
      `<circle cx="86.5" cy="27.5" r="0.9" fill="${INK}"/>`
  );
}

function cow() {
  return svg(
    shadow(46, 28) +
      leg(34, 48, 6, "#E2DED4", "#4A4A4A") +
      leg(56, 48, 6, "#E2DED4", "#4A4A4A") +
      `<path d="M23 36 Q16 44 18 55" stroke="#E2DED4" stroke-width="2.2" fill="none" stroke-linecap="round"/><path d="M16 53 Q18 61 20.5 53 Z" fill="#3A3A3A"/>` +
      `<rect x="21" y="29" width="46" height="24" rx="11" fill="#F6F3EB"/>` +
      `<path d="M30 30 C36 29 40 34 37 39 C34 44 27 41 27 36 Z" fill="#3A3A3A"/><path d="M48 38 C54 36 59 40 57 45 C55 50 47 49 46 44 Z" fill="#3A3A3A"/><path d="M58 29 C62 29 65 31 66 35 C62 36 58 34 58 29 Z" fill="#3A3A3A"/>` +
      leg(27, 49, 6, "#F6F3EB", "#4A4A4A") +
      leg(50, 49, 6, "#F6F3EB", "#4A4A4A") +
      `<path d="M66 20 L64 14 L68.5 18 Z" fill="#E8D9AE"/><path d="M76 19 L79 13 L79 19.5 Z" fill="#E8D9AE"/>` +
      `<ellipse cx="62" cy="25" rx="5" ry="2.6" transform="rotate(-20 62 25)" fill="#3A3A3A"/>` +
      `<path d="M64 22 C66 17 76 16 80 20 C84 24 86 32 86 36 C86 42 80 45 74 44 C68 43 65 38 64 33 Z" fill="#F6F3EB"/>` +
      `<ellipse cx="79" cy="39" rx="7.4" ry="5.6" fill="#F2B6B0"/>` +
      `<circle cx="76.5" cy="39.5" r="1" fill="#B9706A"/><circle cx="81.5" cy="39.5" r="1" fill="#B9706A"/>` +
      eye(76, 27.5)
  );
}

function goat() {
  const main = "#D9B88E";
  const far = "#B8946A";
  return svg(
    shadow(46, 26) +
      leg(35, 46, 4.4, far, "#4B3A2A") +
      leg(57, 46, 4.4, far, "#4B3A2A") +
      `<path d="M24 36 L19 30 L25 33 Z" fill="${main}"/>` +
      `<ellipse cx="43" cy="41" rx="20" ry="9.5" fill="${main}"/>` +
      leg(29, 46, 4.8, main, "#4B3A2A") +
      leg(52, 46, 4.8, main, "#4B3A2A") +
      `<path d="M55 36 C58 30 61 25 64 21 L71 24 C69 30 66 37 62 44 Z" fill="${main}"/>` +
      `<path d="M66 15 C62 9 55 9 52 13 C56 12 60 14 63 19 Z" fill="#7D6448"/>` +
      `<path d="M63 18 C66 13 73 13 76 17 L84 26 C86 30 82 33 78 31 L70 27 C65 25 62 22 63 18 Z" fill="${main}"/>` +
      `<ellipse cx="64" cy="22" rx="5" ry="2" transform="rotate(25 64 22)" fill="${far}"/>` +
      `<path d="M74 29 L73 37 L77 30 Z" fill="#8B7356"/>` +
      eye(72, 19.5) +
      `<circle cx="83" cy="27" r="0.9" fill="${INK}"/>`
  );
}

function sheep() {
  const wool = "#F7F5EF";
  const face = "#4C4248";
  const puffs = [
    [30, 38, 9],
    [40, 33, 10],
    [51, 34, 10],
    [59, 40, 9],
    [26, 46, 8],
    [37, 47, 10],
    [49, 47, 10],
    [58, 48, 8],
    [44, 40, 11]
  ]
    .map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${wool}"/>`)
    .join("");
  return svg(
    shadow(46, 26) +
      leg(36, 50, 4, "#3E363B") +
      leg(56, 50, 4, "#3E363B") +
      `<circle cx="44" cy="41" r="16" fill="#E6E2D8"/>` +
      puffs +
      leg(31, 52, 4.4, face) +
      leg(51, 52, 4.4, face) +
      `<ellipse cx="63" cy="34" rx="6" ry="2.4" transform="rotate(25 63 34)" fill="${face}"/>` +
      `<ellipse cx="72" cy="36" rx="7" ry="9.5" transform="rotate(-32 72 36)" fill="${face}"/>` +
      `<circle cx="67" cy="28" r="5.5" fill="${wool}"/><circle cx="71" cy="26.5" r="3.6" fill="${wool}"/>` +
      `<circle cx="74" cy="33" r="2" fill="#FFFFFF"/><circle cx="74.5" cy="33.3" r="1.15" fill="${INK}"/>` +
      `<ellipse cx="78.5" cy="41" rx="1" ry="0.7" fill="#2A2228"/>`
  );
}

function dog() {
  const main = "#C98B4D";
  const far = "#A86F37";
  return svg(
    shadow(47, 24) +
      leg(37, 47, 4.6, far) +
      leg(56, 47, 4.6, far) +
      `<path d="M29 40 C23 36 21 29 24 24 C26 30 29 33 33 36 Z" fill="${main}"/>` +
      `<ellipse cx="45" cy="44" rx="18" ry="8.5" fill="${main}"/>` +
      `<ellipse cx="54" cy="47" rx="8" ry="4.5" fill="#F1D3A8"/>` +
      leg(32, 48, 5, main) +
      leg(51, 48, 5, main) +
      `<circle cx="66" cy="33" r="10" fill="${main}"/>` +
      `<ellipse cx="75" cy="37" rx="8" ry="5" fill="#F1D3A8"/>` +
      `<ellipse cx="82" cy="35" rx="2.6" ry="2.1" fill="${INK}"/>` +
      `<path d="M60 26 C55 27 54 36 57 42 C60 40 62 34 62 28 Z" fill="#7E4E24"/>` +
      eye(69, 30) +
      `<path d="M76 41 Q78 42.5 80 41" stroke="#7E4E24" stroke-width="1" fill="none" stroke-linecap="round"/>`
  );
}

function cat() {
  const main = "#F2A24E";
  const stripe = "#D27E2C";
  return svg(
    shadow(46, 20) +
      `<path d="M30 70 C18 70 16 60 24 58 C20 63 24 67 32 67 Z" fill="${main}"/>` +
      `<path d="M34 72 C30 60 34 44 46 42 C58 44 62 60 58 72 Z" fill="${main}"/>` +
      `<path d="M38 52 Q46 54 54 52 M37 59 Q46 61 56 59" stroke="${stripe}" stroke-width="2" fill="none" stroke-linecap="round"/>` +
      `<ellipse cx="46" cy="64" rx="8" ry="7" fill="#FBE3C2"/>` +
      `<rect x="40" y="64" width="5" height="9" rx="2.5" fill="${main}"/><rect x="48" y="64" width="5" height="9" rx="2.5" fill="${main}"/>` +
      `<path d="M38 26 L37 12 L46 20 Z" fill="${main}"/><path d="M54 20 L63 12 L62 26 Z" fill="${main}"/>` +
      `<path d="M39 23 L38.5 15.5 L43.5 20 Z" fill="#F7B9B0"/><path d="M57 20 L61.5 15.5 L61 23 Z" fill="#F7B9B0"/>` +
      `<ellipse cx="50" cy="30" rx="13" ry="11" fill="${main}"/>` +
      `<path d="M45 21 L46 25 M50 20 L50 24 M55 21 L54 25" stroke="${stripe}" stroke-width="1.6" stroke-linecap="round"/>` +
      eye(45, 29, 1.8) +
      eye(55, 29, 1.8) +
      `<path d="M48.6 33 L51.4 33 L50 34.6 Z" fill="#E07A7A"/>` +
      `<path d="M50 34.6 Q48 37 46 36 M50 34.6 Q52 37 54 36" stroke="#8A5A2A" stroke-width="0.9" fill="none" stroke-linecap="round"/>` +
      `<path d="M41 33 L33 32 M41 35 L33 36.5 M59 33 L67 32 M59 35 L67 36.5" stroke="#8A5A2A" stroke-width="0.7" stroke-linecap="round"/>`
  );
}

function lion() {
  const main = "#E7AA4C";
  const far = "#C98A33";
  const mane = "#B3612A";
  const spikes = Array.from({ length: 14 }, (_, index) => {
    const a = (index / 14) * Math.PI * 2;
    const x = 70 + Math.cos(a) * 14;
    const y = 31 + Math.sin(a) * 14;
    return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="5" fill="${mane}"/>`;
  }).join("");
  return svg(
    shadow(46, 28) +
      leg(34, 46, 5.6, far) +
      leg(55, 46, 5.6, far) +
      `<path d="M24 40 Q14 44 14 56" stroke="${main}" stroke-width="2.4" fill="none" stroke-linecap="round"/><ellipse cx="14" cy="57" rx="3" ry="3.8" fill="${mane}"/>` +
      `<ellipse cx="43" cy="43" rx="21" ry="10" fill="${main}"/>` +
      leg(28, 47, 6, main) +
      leg(49, 47, 6, main) +
      spikes +
      `<circle cx="70" cy="31" r="14" fill="${mane}"/>` +
      `<circle cx="72" cy="32" r="9.5" fill="#F0BC5E"/>` +
      `<ellipse cx="77" cy="36" rx="5.5" ry="4" fill="#F7D79A"/>` +
      `<path d="M79 33 L83 33 L81 35.5 Z" fill="#5A3A22"/>` +
      eye(73, 28.5, 1.6) +
      `<path d="M81 35.5 Q80 38 77.5 38" stroke="#5A3A22" stroke-width="0.9" fill="none" stroke-linecap="round"/>`
  );
}

function wolf() {
  const main = "#8E97A1";
  const far = "#717A84";
  return svg(
    shadow(47, 27) +
      leg(36, 46, 4.4, far) +
      leg(57, 46, 4.4, far) +
      `<path d="M26 38 C16 40 12 50 14 58 C18 52 22 48 28 45 Z" fill="${main}"/><path d="M14 58 C14 54 15 52 17 51 L18 55 Z" fill="#E9ECEF"/>` +
      `<ellipse cx="44" cy="41" rx="20" ry="9" fill="${main}"/>` +
      `<ellipse cx="46" cy="46" rx="14" ry="4" fill="#C9CED3"/>` +
      leg(30, 47, 4.8, main) +
      leg(52, 47, 4.8, main) +
      `<path d="M56 36 C60 30 64 26 68 24 L72 30 C68 34 64 40 62 45 Z" fill="${main}"/>` +
      `<path d="M63 20 L65 9 L70 18 Z" fill="${far}"/><path d="M68 18 L72 8 L74 18 Z" fill="${main}"/>` +
      `<path d="M62 22 C64 16 72 15 76 19 L88 26 C90 28 88 31 85 31 L74 31 C67 31 62 28 62 22 Z" fill="${main}"/>` +
      `<path d="M72 30 L86 30 C84 33 76 34 72 30 Z" fill="#E9ECEF"/>` +
      `<circle cx="88" cy="27" r="1.6" fill="${INK}"/>` +
      eye(71, 21.5, 1.5)
  );
}

function bear() {
  const main = "#7B4F2E";
  const far = "#62401F";
  return svg(
    shadow(46, 28) +
      leg(34, 48, 7, far) +
      leg(56, 48, 7, far) +
      `<path d="M20 38 C18 28 34 24 48 25 C62 26 68 34 68 44 C68 54 58 56 44 56 C28 56 21 50 20 38 Z" fill="${main}"/>` +
      leg(26, 49, 8, main) +
      leg(48, 49, 8, main) +
      `<circle cx="66" cy="23" r="4" fill="${main}"/><circle cx="66" cy="23" r="2" fill="#A8774F"/>` +
      `<circle cx="72" cy="31" r="10.5" fill="${main}"/>` +
      `<ellipse cx="80" cy="35" rx="6" ry="4.5" fill="#B88A60"/>` +
      `<ellipse cx="84" cy="33.5" rx="2.2" ry="1.7" fill="${INK}"/>` +
      eye(74, 28, 1.5)
  );
}

function deer() {
  const main = "#C78E58";
  const far = "#A77443";
  return svg(
    shadow(46, 24) +
      leg(37, 44, 3.6, far, "#3B2A20") +
      leg(57, 44, 3.6, far, "#3B2A20") +
      `<ellipse cx="26" cy="37" rx="3.2" ry="4.2" fill="#FFFFFF"/>` +
      `<ellipse cx="44" cy="40" rx="19" ry="8.5" fill="${main}"/>` +
      `<ellipse cx="45" cy="45" rx="12" ry="3.4" fill="#F1DFC6"/>` +
      leg(31, 45, 4, main, "#3B2A20") +
      leg(52, 45, 4, main, "#3B2A20") +
      `<path d="M56 35 C59 28 62 22 65 18 L71 20 C69 27 66 34 62 42 Z" fill="${main}"/>` +
      `<path d="M66 12 C64 6 60 4 57 5 M64 9 L59 9 M71 12 C72 6 76 3 79 4 M73 8 L77 9" stroke="#8B5E34" stroke-width="1.8" fill="none" stroke-linecap="round"/>` +
      `<ellipse cx="64" cy="15" rx="4.4" ry="2" transform="rotate(-30 64 15)" fill="${far}"/>` +
      `<path d="M64 15 C67 11 73 11 76 14 L84 22 C86 26 82 28 79 27 L71 24 C66 22 63 19 64 15 Z" fill="${main}"/>` +
      `<circle cx="84" cy="23" r="1.2" fill="${INK}"/>` +
      eye(72, 16.5, 1.5)
  );
}

function elephant() {
  const main = "#9DA6AF";
  const far = "#7F8993";
  return svg(
    shadow(46, 30) +
      leg(30, 50, 9, far) +
      leg(54, 50, 9, far) +
      `<path d="M18 38 Q12 44 14 52" stroke="${main}" stroke-width="2" fill="none" stroke-linecap="round"/>` +
      `<path d="M18 40 C18 26 32 20 48 21 C62 22 70 30 70 42 C70 52 62 56 46 56 C30 56 18 52 18 40 Z" fill="${main}"/>` +
      leg(22, 50, 10, main) +
      leg(46, 50, 10, main) +
      `<path d="M72 30 C80 28 86 34 86 44 C86 52 84 60 88 66 C90 69 94 67 93 64" stroke="${main}" stroke-width="7" fill="none" stroke-linecap="round"/>` +
      `<circle cx="70" cy="30" r="13" fill="${main}"/>` +
      `<path d="M60 22 C52 20 48 30 50 40 C52 46 58 47 62 42 C64 36 64 28 60 22 Z" fill="#8A939C"/>` +
      `<path d="M78 41 C82 44 85 45 88 44" stroke="#FFFFFF" stroke-width="3" fill="none" stroke-linecap="round"/>` +
      eye(73, 27, 1.6)
  );
}

/** A bird in flight, facing right: its body, head and tail; and its wing, drawn apart, raised. */
function flyingBird({ main, wing, belly, beak, beakPath, head, crest, tail, size = 1 }: { main: string; wing: string; belly?: string; beak: string; beakPath?: string; head?: string; crest?: string; tail?: string; size?: number }) {
  const s = (n: number) => (n * size).toFixed(1);
  const cx = 50;
  const cy = 42;
  const at = (dx: number, dy: number) => `${(cx + dx * size).toFixed(1)} ${(cy + dy * size).toFixed(1)}`;
  const body =
    `<path d="M${at(-16, -2)} L${at(-30, -8)} L${at(-28, 2)} L${at(-30, 8)} L${at(-16, 4)} Z" fill="${tail ?? main}"/>` +
    `<ellipse cx="${cx}" cy="${cy}" rx="${s(18)}" ry="${s(9)}" fill="${main}"/>` +
    (belly ? `<ellipse cx="${(cx + 2 * size).toFixed(1)}" cy="${(cy + 3.5 * size).toFixed(1)}" rx="${s(12)}" ry="${s(5)}" fill="${belly}"/>` : "") +
    (crest ?? "") +
    `<circle cx="${(cx + 16 * size).toFixed(1)}" cy="${(cy - 6 * size).toFixed(1)}" r="${s(8)}" fill="${head ?? main}"/>` +
    `<path d="${beakPath ?? `M${at(22, -9)} L${at(32, -5)} L${at(22, -3)} Z`}" fill="${beak}"/>` +
    eye(Number((cx + 18 * size).toFixed(1)), Number((cy - 8 * size).toFixed(1)), 1.6 * size);
  const wings = `<path d="M${at(-8, -2)} C${at(-14, -22)} ${at(0, -34)} ${at(8, -30)} C${at(6, -20)} ${at(8, -10)} ${at(6, -2)} Z" fill="${wing}"/>`;
  return { body: svg(body), wings: svg(wings), pivot: cy - 2 * size };
}

function eagle() {
  const art = flyingBird({ main: "#6E4524", wing: "#55341A", beak: "#F2B33D", head: "#F4F1EA", tail: "#F4F1EA" });
  // A hooked beak, and yellow feet tucked under.
  const extra = `<path d="M72 33 C77 33 80 36 80 39 L76 38 Z" fill="#F2B33D"/><path d="M44 50 L42 55 M48 50 L47 55" stroke="#F2B33D" stroke-width="1.8" stroke-linecap="round"/>`;
  return { ...art, body: art.body.replace("</svg>", `${extra}</svg>`) };
}

function hoopoe() {
  // The crest: a fan of orange feathers with black tips, standing up from the head.
  const crest = [-165, -142, -118, -95, -72]
    .map((angle) => {
      const a = (angle * Math.PI) / 180;
      const at = (r: number) => `${(64 + Math.cos(a) * r).toFixed(1)}" cy="${(31 + Math.sin(a) * r).toFixed(1)}`;
      return `<ellipse cx="${at(8)}" rx="7.5" ry="2.5" transform="rotate(${angle} ${(64 + Math.cos(a) * 8).toFixed(1)} ${(31 + Math.sin(a) * 8).toFixed(1)})" fill="#EE9F68"/><ellipse cx="${at(14)}" rx="2.6" ry="2.1" transform="rotate(${angle} ${(64 + Math.cos(a) * 14).toFixed(1)} ${(31 + Math.sin(a) * 14).toFixed(1)})" fill="${INK}"/>`;
    })
    .join("");
  // A long, thin beak, a little bent.
  const art = flyingBird({ main: "#E89A62", wing: "#2F2A28", beak: "#3A3330", beakPath: "M72 34 C78 34 86 37 91 42 C85 39.5 78 38.5 72 38.5 Z", crest, tail: "#2F2A28" });
  // White bars across the black wing.
  const bars = `<path d="M44 27 L56 25 M43 22 L55 19 M45 17 L55 14" stroke="#FFFFFF" stroke-width="2.2" stroke-linecap="round"/>`;
  return { ...art, wings: art.wings.replace("</svg>", `${bars}</svg>`) };
}

function sparrow() {
  const art = flyingBird({ main: "#A97C58", wing: "#7A5232", belly: "#E9DCC8", beak: "#4A3A2E", head: "#9097A0", size: 0.9 });
  const cheek = `<ellipse cx="66" cy="38.5" rx="4" ry="2.6" fill="#FFFFFF"/><path d="M62 42 C64 46 68 46 70 43 Z" fill="${INK}"/>`;
  const streaks = `<path d="M47 24 L53 22 M46 19 L52 17" stroke="#4A3220" stroke-width="1.6" stroke-linecap="round"/>`;
  return { ...art, body: art.body.replace("</svg>", `${cheek}</svg>`), wings: art.wings.replace("</svg>", `${streaks}</svg>`) };
}

function fish() {
  return svg(
    `<path d="M18 40 C30 22 56 22 68 40 C56 58 30 58 18 40 Z" fill="#FF8A2A"/>` +
      `<path d="M66 40 L84 28 L80 40 L84 52 Z" fill="#FF8A2A"/>` +
      `<path d="M38 26 C42 20 50 20 54 25 Z" fill="#F27012"/>` +
      `<path d="M34 28 C38 34 38 46 34 52 M46 26 C50 34 50 46 46 54" stroke="#FFFFFF" stroke-width="2.4" fill="none" opacity="0.8"/>` +
      eye(26, 37, 2)
  );
}

function whale() {
  return svg(
    `<path d="M50 14 C48 9 44 8 42 10 M50 14 C52 9 56 8 58 10 M50 14 L50 8" stroke="#9FD3FF" stroke-width="2.4" fill="none" stroke-linecap="round"/>` +
      `<path d="M12 42 C12 26 30 18 50 18 C70 18 80 30 84 36 L94 26 C96 30 95 38 90 42 C95 46 96 52 94 56 L84 46 C78 56 62 62 44 62 C24 62 12 56 12 42 Z" fill="#4C80C2"/>` +
      `<path d="M16 46 C24 56 48 60 66 52 C56 58 30 60 16 46 Z" fill="#A9C9EE"/>` +
      `<path d="M14 46 C24 52 40 54 52 52" stroke="#A9C9EE" stroke-width="5" fill="none" stroke-linecap="round"/>` +
      `<path d="M40 48 C42 54 48 56 52 54" stroke="#3B6AA6" stroke-width="2" fill="none" stroke-linecap="round"/>` +
      eye(26, 38, 1.9)
  );
}

function ant() {
  const body = "#3D2B22";
  const legs = [
    [44, 46, 36, 56, 32, 60],
    [48, 46, 46, 58, 44, 64],
    [52, 46, 58, 57, 62, 62]
  ]
    .map(([x1, y1, x2, y2, x3, y3]) => `<path d="M${x1} ${y1} L${x2} ${y2} L${x3} ${y3}" stroke="${body}" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`)
    .join("");
  return svg(
    shadow(50, 24) +
      legs +
      `<ellipse cx="30" cy="42" rx="13" ry="9" fill="${body}"/>` +
      `<ellipse cx="49" cy="42" rx="7" ry="5" fill="${body}"/>` +
      `<circle cx="64" cy="38" r="7.5" fill="${body}"/>` +
      `<path d="M67 31 C70 24 74 21 78 22 M69 33 C74 28 79 27 82 29" stroke="${body}" stroke-width="1.6" fill="none" stroke-linecap="round"/>` +
      `<path d="M28 36 C31 35 34 36 36 38" stroke="#6B5246" stroke-width="1.6" fill="none" stroke-linecap="round"/>` +
      eye(66.5, 36.5, 1.5)
  );
}

function bee() {
  const body =
    `<path d="M24 44 L16 46 L24 48 Z" fill="${INK}"/>` +
    `<ellipse cx="44" cy="46" rx="20" ry="13" fill="#FFC83A"/>` +
    `<path d="M36 34 C39 40 39 52 36 58 M46 33 C49 40 49 52 46 59" stroke="${INK}" stroke-width="5" fill="none"/>` +
    `<circle cx="67" cy="42" r="9" fill="${INK}"/>` +
    `<path d="M70 34 C72 28 76 26 79 27 M73 36 C76 31 80 30 83 32" stroke="${INK}" stroke-width="1.5" fill="none" stroke-linecap="round"/>` +
    `<circle cx="70" cy="40" r="2.2" fill="#FFFFFF"/><circle cx="70.6" cy="40.2" r="1.2" fill="${INK}"/>`;
  const wings = `<ellipse cx="42" cy="24" rx="9" ry="14" transform="rotate(-20 42 24)" fill="#E8F6FF" opacity="0.9"/><ellipse cx="52" cy="25" rx="7" ry="11" transform="rotate(15 52 25)" fill="#D2ECFF" opacity="0.9"/>`;
  return { body: svg(body), wings: svg(wings), pivot: 34 };
}

function spider() {
  const color = "#2E2B36";
  const legs = [-1, 1]
    .flatMap((side) =>
      [0, 1, 2, 3].map((index) => {
        const y = 40 + index * 4;
        const x = 50 + side * 8;
        const knee = 50 + side * (18 + index * 2);
        const foot = 50 + side * (24 + index * 3);
        return `<path d="M${x} ${y} L${knee} ${y - 12 + index * 3} L${foot} ${y + 10 + index * 2}" stroke="${color}" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
      })
    )
    .join("");
  return svg(
    `<path d="M50 0 L50 32" stroke="#C8CCD6" stroke-width="1"/>` +
      legs +
      `<ellipse cx="50" cy="48" rx="11" ry="12" fill="${color}"/>` +
      `<circle cx="50" cy="35" r="7" fill="${color}"/>` +
      `<circle cx="47" cy="34" r="2" fill="#FFFFFF"/><circle cx="53" cy="34" r="2" fill="#FFFFFF"/>` +
      `<circle cx="47.3" cy="34.4" r="1.1" fill="${INK}"/><circle cx="53.3" cy="34.4" r="1.1" fill="${INK}"/>` +
      `<path d="M45 46 C48 44 52 44 55 46" stroke="#55505F" stroke-width="1.6" fill="none" stroke-linecap="round"/>`
  );
}

function mosquito() {
  const color = "#5E534D";
  const legs = [30, 38, 46, 54, 60, 66]
    .map((x, index) => `<path d="M${46 + index * 2} 46 Q${x - 4} 56 ${x - 10 + index * 3} ${66 + (index % 2) * 4}" stroke="${color}" stroke-width="1.1" fill="none" stroke-linecap="round"/>`)
    .join("");
  const body =
    legs +
    `<path d="M20 44 C26 40 40 40 46 44 C40 48 26 48 20 44 Z" fill="${color}"/>` +
    `<path d="M24 43 L42 43" stroke="#A89B92" stroke-width="1.2"/>` +
    `<ellipse cx="52" cy="43" rx="7" ry="5" fill="${color}"/>` +
    `<circle cx="62" cy="40" r="4.6" fill="${color}"/>` +
    `<path d="M66 41 L84 48" stroke="${color}" stroke-width="1.4" stroke-linecap="round"/>` +
    `<path d="M64 36 C66 31 70 30 73 31 M65 37 C68 34 72 34 75 35" stroke="${color}" stroke-width="0.9" fill="none" stroke-linecap="round"/>` +
    eye(63, 39, 1.4);
  const wings = `<ellipse cx="46" cy="28" rx="6" ry="15" transform="rotate(-35 46 28)" fill="#E3F2FF" opacity="0.85"/><ellipse cx="53" cy="30" rx="5" ry="12" transform="rotate(-10 53 30)" fill="#CFE7FA" opacity="0.85"/>`;
  return { body: svg(body), wings: svg(wings), pivot: 41 };
}

function fly() {
  const color = "#34393F";
  const legs = [42, 50, 58].map((x) => `<path d="M${x} 50 L${x - 4} 60 M${x + 1} 50 L${x + 4} 60" stroke="${color}" stroke-width="1.5" stroke-linecap="round"/>`).join("");
  const body =
    legs +
    `<ellipse cx="44" cy="45" rx="16" ry="10" fill="${color}"/>` +
    `<path d="M32 41 C38 39 48 39 56 42" stroke="#4E8F6A" stroke-width="2" fill="none" opacity="0.8"/>` +
    `<ellipse cx="60" cy="43" rx="7" ry="7" fill="${color}"/>` +
    `<circle cx="66" cy="40" r="5.4" fill="#C63A2E"/><circle cx="64.8" cy="38.6" r="1.4" fill="#F4A79F"/>` +
    `<path d="M68 46 L71 51" stroke="${color}" stroke-width="1.8" stroke-linecap="round"/>`;
  const wings = `<ellipse cx="44" cy="28" rx="8" ry="15" transform="rotate(-30 44 28)" fill="#E6F3FF" opacity="0.85"/><ellipse cx="53" cy="30" rx="6" ry="12" transform="rotate(-5 53 30)" fill="#D3E9FB" opacity="0.85"/>`;
  return { body: svg(body), wings: svg(wings), pivot: 37 };
}

function locust() {
  const main = "#86B83E";
  const dark = "#5E8C22";
  return svg(
    shadow(50, 30) +
      `<path d="M38 50 L34 62 M46 50 L46 63" stroke="${dark}" stroke-width="1.8" stroke-linecap="round"/>` +
      `<path d="M30 46 C36 34 52 30 60 40 L32 52 Z" fill="${dark}"/>` +
      `<path d="M18 46 C22 40 50 38 62 42 C66 46 62 52 52 52 L24 52 C18 52 16 50 18 46 Z" fill="${main}"/>` +
      `<path d="M24 44 C34 36 50 34 60 40 C50 40 34 42 24 50 Z" fill="${dark}" opacity="0.65"/>` +
      `<path d="M40 48 C48 30 56 28 60 30 C58 36 52 44 46 52 Z" fill="${dark}"/>` +
      `<path d="M58 30 L62 60" stroke="${dark}" stroke-width="2.2" stroke-linecap="round"/>` +
      `<ellipse cx="68" cy="44" rx="8" ry="7" fill="${main}"/>` +
      `<path d="M70 38 C74 26 80 20 86 18 M72 39 C78 30 84 27 90 27" stroke="${dark}" stroke-width="1.4" fill="none" stroke-linecap="round"/>` +
      eye(71, 42, 1.7)
  );
}

function scorpion() {
  const main = "#C47A3A";
  const dark = "#9C5B26";
  const legs = [32, 38, 44, 50]
    .map((x, index) => `<path d="M${x} 52 L${x - 4} 60 L${x - 6} ${66 - (index % 2)}" stroke="${dark}" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`)
    .join("");
  return svg(
    shadow(48, 30) +
      legs +
      `<path d="M24 50 C16 46 12 36 16 28 C20 20 30 18 34 24" stroke="${main}" stroke-width="6" fill="none" stroke-linecap="round"/>` +
      `<path d="M34 24 C37 21 39 24 37 27 L35 26 Z" fill="${dark}"/>` +
      `<path d="M37 27 L40 31" stroke="${dark}" stroke-width="1.6" stroke-linecap="round"/>` +
      `<ellipse cx="42" cy="50" rx="20" ry="7.5" fill="${main}"/>` +
      `<path d="M30 46 L30 54 M38 44 L38 56 M46 44 L46 56" stroke="${dark}" stroke-width="1.2" opacity="0.7"/>` +
      `<path d="M58 48 C66 42 72 40 76 42" stroke="${main}" stroke-width="3" fill="none" stroke-linecap="round"/>` +
      `<path d="M74 38 C82 34 88 38 86 42 C84 40 80 40 78 42 C82 44 84 48 80 48 C76 48 72 44 74 38 Z" fill="${main}"/>` +
      `<path d="M58 53 C66 56 72 58 76 56" stroke="${main}" stroke-width="3" fill="none" stroke-linecap="round"/>` +
      `<path d="M74 52 C82 50 88 54 86 58 C84 56 80 56 78 58 C80 61 78 63 75 62 C72 60 71 55 74 52 Z" fill="${main}"/>` +
      eye(58, 47, 1.3)
  );
}

function snake() {
  const main = "#5DB65C";
  const dark = "#3F8F3F";
  return svg(
    shadow(48, 28) +
      `<path d="M16 68 C26 74 40 74 44 66 C48 58 36 54 30 56 C22 58 22 66 34 66 C48 66 62 62 64 52 C66 42 60 36 64 30" stroke="${main}" stroke-width="9" fill="none" stroke-linecap="round" stroke-linejoin="round"/>` +
      `<path d="M18 68 C26 72 38 72 42 66 M36 62 C48 62 58 58 60 50" stroke="#B7E39A" stroke-width="2.4" fill="none" stroke-linecap="round" opacity="0.8"/>` +
      `<path d="M30 56 C34 58 38 58 40 62 M58 46 L62 44 M60 38 L64 37" stroke="${dark}" stroke-width="1.6" fill="none" stroke-linecap="round"/>` +
      `<ellipse cx="68" cy="27" rx="9" ry="6.5" fill="${main}"/>` +
      `<path d="M76 29 L84 30 L87 28 M84 30 L87 32.5" stroke="#D93B3B" stroke-width="1.3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>` +
      eye(70, 25, 1.7)
  );
}

const flyer = (kind: AnimalKind, art: { body: string; wings: string; pivot: number }, motion: AnimalMotion = "fly"): AnimalArt => ({
  kind,
  motion,
  home: "sky",
  ...art
});

const ART: Record<AnimalKind, () => AnimalArt> = {
  camel: () => ({ kind: "camel", motion: "walk", home: "land", body: camel() }),
  horse: () => ({ kind: "horse", motion: "walk", home: "land", body: horseLike({ main: "#A2622F", far: "#80491F", mane: "#3D2617", ears: "short", tail: "full" }) }),
  donkey: () => ({ kind: "donkey", motion: "walk", home: "land", body: horseLike({ main: "#9EA4AA", far: "#80868D", light: "#E2E4E7", mane: "#4A4F55", ears: "long", tail: "tuft" }) }),
  mule: () => ({ kind: "mule", motion: "walk", home: "land", body: horseLike({ main: "#8C6748", far: "#6E4E33", light: "#CDB096", mane: "#3B2A1D", ears: "long", tail: "full" }) }),
  cow: () => ({ kind: "cow", motion: "walk", home: "land", body: cow() }),
  goat: () => ({ kind: "goat", motion: "walk", home: "land", body: goat() }),
  sheep: () => ({ kind: "sheep", motion: "walk", home: "land", body: sheep() }),
  dog: () => ({ kind: "dog", motion: "walk", home: "land", body: dog() }),
  cat: () => ({ kind: "cat", motion: "walk", home: "land", body: cat() }),
  lion: () => ({ kind: "lion", motion: "walk", home: "land", body: lion() }),
  wolf: () => ({ kind: "wolf", motion: "walk", home: "land", body: wolf() }),
  bear: () => ({ kind: "bear", motion: "walk", home: "land", body: bear() }),
  deer: () => ({ kind: "deer", motion: "walk", home: "land", body: deer() }),
  elephant: () => ({ kind: "elephant", motion: "walk", home: "land", body: elephant() }),
  bird: () => flyer("bird", flyingBird({ main: "#4C9BFF", wing: "#2F7CD6", belly: "#BFE0FF", beak: "#FF9F1C" })),
  crow: () => flyer("crow", flyingBird({ main: "#2E2E36", wing: "#1C1C22", beak: "#5C5C66" })),
  eagle: () => flyer("eagle", eagle()),
  dove: () => flyer("dove", flyingBird({ main: "#F2F3F5", wing: "#D3D8DF", belly: "#FFFFFF", beak: "#E58A8A" })),
  hoopoe: () => flyer("hoopoe", hoopoe()),
  sparrow: () => flyer("sparrow", sparrow()),
  fish: () => ({ kind: "fish", motion: "swim", home: "sea", body: fish() }),
  whale: () => ({ kind: "whale", motion: "swim", home: "sea", body: whale() }),
  ant: () => ({ kind: "ant", motion: "creep", home: "ground", body: ant() }),
  bee: () => flyer("bee", bee(), "buzz"),
  spider: () => ({ kind: "spider", motion: "creep", home: "ground", body: spider() }),
  mosquito: () => flyer("mosquito", mosquito(), "buzz"),
  fly: () => flyer("fly", fly(), "buzz"),
  locust: () => ({ kind: "locust", motion: "creep", home: "ground", body: locust() }),
  scorpion: () => ({ kind: "scorpion", motion: "creep", home: "ground", body: scorpion() }),
  snake: () => ({ kind: "snake", motion: "creep", home: "ground", body: snake() })
};

/**
 * Where each animal is drawn, stretched to fill its card's picture: the sand under the sky, the open sky with a cloud,
 * the sea with its bubbles, or the ground close up with pebbles and grass.
 */
export function homeSvg(home: AnimalHome) {
  const box = (inner: string) => `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="80" viewBox="0 0 100 80" preserveAspectRatio="none">${inner}</svg>`;
  switch (home) {
    case "land":
      return box(
        `<rect width="100" height="80" fill="#D6EFFF"/><rect y="38" width="100" height="24" fill="#EAF6FF"/>` +
          `<path d="M0 62 C20 58 40 60 60 59 C78 58 90 60 100 61 L100 80 L0 80 Z" fill="#F3D8A2"/>` +
          `<path d="M0 72 C24 69 50 71 74 70 C86 70 94 71 100 72 L100 80 L0 80 Z" fill="#EACB8E"/>`
      );
    case "sky":
      return box(
        `<rect width="100" height="80" fill="#BFE4FF"/><rect y="50" width="100" height="30" fill="#DDF1FF"/>` +
          `<ellipse cx="18" cy="16" rx="12" ry="4.5" fill="#FFFFFF" opacity="0.9"/><ellipse cx="26" cy="13" rx="7" ry="4" fill="#FFFFFF" opacity="0.9"/>` +
          `<ellipse cx="84" cy="66" rx="13" ry="4.5" fill="#FFFFFF" opacity="0.85"/><ellipse cx="78" cy="63" rx="7" ry="4" fill="#FFFFFF" opacity="0.85"/>`
      );
    case "sea":
      return box(
        `<rect width="100" height="80" fill="#5AB7E8"/><rect y="44" width="100" height="36" fill="#3F9AD3"/>` +
          `<path d="M0 74 C14 70 24 76 40 73 C56 70 66 76 82 73 C90 72 96 74 100 73 L100 80 L0 80 Z" fill="#E9D3A0"/>` +
          `<circle cx="10" cy="56" r="2" fill="#FFFFFF" opacity="0.55"/><circle cx="15" cy="46" r="1.3" fill="#FFFFFF" opacity="0.55"/>` +
          `<circle cx="90" cy="24" r="1.8" fill="#FFFFFF" opacity="0.55"/><circle cx="94" cy="14" r="1.2" fill="#FFFFFF" opacity="0.55"/>`
      );
    case "ground":
      return box(
        `<rect width="100" height="80" fill="#F6E7C8"/><rect y="58" width="100" height="22" fill="#EAD3A6"/>` +
          `<ellipse cx="14" cy="68" rx="3.4" ry="1.6" fill="#D5B98A"/><ellipse cx="84" cy="66" rx="2.6" ry="1.3" fill="#D5B98A"/><ellipse cx="66" cy="76" rx="2" ry="1" fill="#D5B98A"/>` +
          `<path d="M6 80 L8 72 L10 80 M90 80 L92 71 L94 80 M96 80 L97 74 L99 80" fill="#9CC46A"/>`
      );
  }
}

export const ANIMAL_KINDS = Object.keys(ART) as AnimalKind[];

const drawn = new Map<AnimalKind, AnimalArt>();

/** An animal's drawing, made once. */
export function animalArt(kind: AnimalKind): AnimalArt {
  let art = drawn.get(kind);
  if (!art) {
    art = ART[kind]();
    drawn.set(kind, art);
  }
  return art;
}
