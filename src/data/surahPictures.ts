/**
 * A picture of what a surah's name means, shown first on the surah's own lesson, so a learner sees it before
 * reading it: Al-Baqarah a cow, Yusuf the sun, the moon and eleven stars of his dream, An-Nahl a bee at its
 * honeycomb, Al-Fil an elephant. Drawn here as SVG (no image files, sharp on every phone, works offline).
 *
 * Only things, animals and places: never a person, a prophet or an angel. A name that cannot be drawn without
 * one (Ta-Ha, Ya-Sin, Muhammad, Al-Ikhlas, An-Nas...) gets its name in big Arabic letters on a patterned card.
 */
import { SURAH_NAMES } from "./surahMeanings";
import { ALL_SURAH_MEANINGS } from "./surahMeanings/all";

const W = 400;
const H = 225;

type Scene = "day" | "night" | "dawn" | "dusk" | "sea";
type Motif = { scene: Scene; draw: () => string };

// ---------- drawing kit ----------

function shade(hex: string, amount: number) {
  const n = parseInt(hex.slice(1), 16);
  const ch = [n >> 16, (n >> 8) & 255, n & 255].map((c) => Math.round(amount >= 0 ? c + (255 - c) * amount : c * (1 + amount)));
  return `#${ch.map((c) => Math.max(0, Math.min(255, c)).toString(16).padStart(2, "0")).join("")}`;
}

function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

const SKIES: Record<Scene, [string, string, string]> = {
  // top, bottom, ground
  day: ["#7cc6ee", "#e9f6ff", "#e4c890"],
  night: ["#121d45", "#3a4a86", "#4b4664"],
  dawn: ["#f6a76b", "#ffe2b5", "#d9b583"],
  dusk: ["#4a3f7d", "#f2a96b", "#a07858"],
  sea: ["#7cc6ee", "#e9f6ff", "#2f8fcf"]
};

function backdrop(scene: Scene) {
  const [top, bottom, ground] = SKIES[scene];
  let s = `<defs><linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${top}"/><stop offset="1" stop-color="${bottom}"/></linearGradient></defs>`;
  s += `<rect width="${W}" height="${H}" fill="url(#sky)"/>`;
  if (scene === "night" || scene === "dusk") s += stars(scene === "night" ? 40 : 16, 5, scene === "night" ? 150 : 80);
  if (scene === "sea") {
    s += `<path d="M0,150 Q100,140 200,150 T400,150 L400,225 L0,225 Z" fill="${ground}"/>`;
    s += `<path d="M0,165 Q50,158 100,165 T200,165 T300,165 T400,165" stroke="#9fd6f5" stroke-width="3" fill="none" opacity="0.7"/>`;
    s += `<path d="M0,190 Q50,183 100,190 T200,190 T300,190 T400,190" stroke="#9fd6f5" stroke-width="3" fill="none" opacity="0.5"/>`;
  } else {
    s += `<path d="M0,120 L60,92 L120,118 L180,86 L250,120 L320,90 L400,116 L400,225 L0,225 Z" fill="${shade(ground, scene === "night" ? -0.2 : -0.18)}" opacity="0.55"/>`;
    s += `<path d="M0,170 Q200,150 400,170 L400,225 L0,225 Z" fill="${ground}"/>`;
  }
  return s;
}

function stars(n: number, seed: number, maxY: number) {
  const r = rng(seed);
  let s = "";
  for (let i = 0; i < n; i += 1) {
    s += `<circle cx="${(r() * W).toFixed(1)}" cy="${(r() * maxY).toFixed(1)}" r="${(0.6 + r() * 1.2).toFixed(1)}" fill="#fff" opacity="${(0.5 + r() * 0.5).toFixed(2)}"/>`;
  }
  return s;
}

const star = (x: number, y: number, r: number, fill = "#ffd84d") => {
  const pts: string[] = [];
  for (let i = 0; i < 10; i += 1) {
    const a = -Math.PI / 2 + (i * Math.PI) / 5;
    const rr = i % 2 ? r * 0.45 : r;
    pts.push(`${(x + Math.cos(a) * rr).toFixed(1)},${(y + Math.sin(a) * rr).toFixed(1)}`);
  }
  return `<polygon points="${pts.join(" ")}" fill="${fill}"/>`;
};

const sun = (x: number, y: number, r: number) =>
  `<circle cx="${x}" cy="${y}" r="${r * 1.9}" fill="#fff3c4" opacity="0.35"/><circle cx="${x}" cy="${y}" r="${r * 1.4}" fill="#fff3c4" opacity="0.5"/><circle cx="${x}" cy="${y}" r="${r}" fill="#ffcf4a"/>`;

let maskCount = 0;
function moon(x: number, y: number, r: number) {
  maskCount += 1;
  const id = `m${maskCount}`;
  return `<defs><mask id="${id}"><rect width="${W}" height="${H}" fill="#fff"/><circle cx="${x + r * 0.45}" cy="${y - r * 0.25}" r="${r * 0.88}" fill="#000"/></mask></defs><circle cx="${x}" cy="${y}" r="${r * 1.8}" fill="#fff6d0" opacity="0.15"/><circle cx="${x}" cy="${y}" r="${r}" fill="#fff1b8" mask="url(#${id})"/>`;
}

const fullMoon = (x: number, y: number, r: number) =>
  `<circle cx="${x}" cy="${y}" r="${r * 1.7}" fill="#fff6d0" opacity="0.18"/><circle cx="${x}" cy="${y}" r="${r}" fill="#fff1c4"/><circle cx="${x - r * 0.3}" cy="${y - r * 0.2}" r="${r * 0.18}" fill="#ecdca0"/><circle cx="${x + r * 0.28}" cy="${y + r * 0.25}" r="${r * 0.13}" fill="#ecdca0"/>`;

const cloud = (x: number, y: number, k: number, fill = "#ffffff", op = 0.9) =>
  `<g opacity="${op}" fill="${fill}"><ellipse cx="${x}" cy="${y}" rx="${30 * k}" ry="${11 * k}"/><ellipse cx="${x - 14 * k}" cy="${y - 6 * k}" rx="${16 * k}" ry="${11 * k}"/><ellipse cx="${x + 10 * k}" cy="${y - 8 * k}" rx="${18 * k}" ry="${13 * k}"/></g>`;

const shadow = (x: number, y: number, rx: number) => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${rx * 0.14}" fill="#000" opacity="0.16"/>`;

function palm(x: number, y: number, h: number, lean = 0) {
  const tx = x + lean;
  const ty = y - h;
  let s = `<path d="M${x - 3.5},${y} Q${x + lean * 0.3},${y - h / 2} ${tx - 1.5},${ty} L${tx + 1.5},${ty} Q${x + lean * 0.3 + 4},${y - h / 2} ${x + 3.5},${y} Z" fill="#8a6239"/>`;
  for (let i = 0; i < 8; i += 1) {
    const a = -Math.PI + (i / 7) * Math.PI;
    const len = h * 0.5;
    const ex = tx + Math.cos(a) * len;
    const ey = ty + Math.sin(a) * len * 0.5 + len * 0.35;
    s += `<path d="M${tx},${ty} Q${tx + Math.cos(a) * len * 0.5},${ty + Math.sin(a) * len * 0.5 - 10} ${ex.toFixed(1)},${ey.toFixed(1)} Q${tx + Math.cos(a) * len * 0.5},${ty + Math.sin(a) * len * 0.5 - 2} ${tx},${ty + 3} Z" fill="${i % 2 ? "#4f8a3a" : "#3d6e2c"}"/>`;
  }
  return s + `<ellipse cx="${tx - 5}" cy="${ty + 8}" rx="4.5" ry="7" fill="#c8741f"/><ellipse cx="${tx + 6}" cy="${ty + 9}" rx="4" ry="6" fill="#b4621a"/>`;
}

const tree = (x: number, y: number, k = 1, leaf = "#5c9a45") =>
  `<rect x="${x - 4 * k}" y="${y - 34 * k}" width="${8 * k}" height="${34 * k}" rx="${3 * k}" fill="#8a6239"/><circle cx="${x}" cy="${y - 48 * k}" r="${24 * k}" fill="${leaf}"/><circle cx="${x - 16 * k}" cy="${y - 38 * k}" r="${15 * k}" fill="${shade(leaf, -0.12)}"/><circle cx="${x + 17 * k}" cy="${y - 40 * k}" r="${16 * k}" fill="${shade(leaf, 0.12)}"/>`;

const house = (x: number, y: number, w: number, h: number, wall = "#d9a86a") =>
  `<rect x="${x}" y="${y - h}" width="${w}" height="${h}" fill="${wall}"/><path d="M${x + w},${y - h} l${w * 0.25},${-w * 0.08} l0,${h} l${-w * 0.25},${w * 0.08} Z" fill="${shade(wall, -0.18)}"/><path d="M${x},${y - h} l${w * 0.25},${-w * 0.08} l${w},0 l${-w * 0.25},${w * 0.08} Z" fill="${shade(wall, 0.12)}"/><path d="M${x + w * 0.4},${y} l0,${-h * 0.5} q${w * 0.1},${-w * 0.12} ${w * 0.2},0 l0,${h * 0.5} Z" fill="#5a3b22"/>`;

function kaaba(cx: number, base: number, size: number) {
  const f = size;
  const sd = size * 0.6;
  const h = size;
  return (
    shadow(cx + sd * 0.3, base + 2, (f + sd) * 0.62) +
    `<rect x="${cx - f / 2}" y="${base - h}" width="${f}" height="${h}" fill="#25211f"/>` +
    `<path d="M${cx + f / 2},${base} L${cx + f / 2},${base - h} L${cx + f / 2 + sd},${base - h - sd * 0.3} L${cx + f / 2 + sd},${base - sd * 0.3} Z" fill="#171414"/>` +
    `<path d="M${cx - f / 2},${base - h} L${cx - f / 2 + sd},${base - h - sd * 0.3} L${cx + f / 2 + sd},${base - h - sd * 0.3} L${cx + f / 2},${base - h} Z" fill="#3a3533"/>` +
    `<rect x="${cx + f * 0.12}" y="${base - h * 0.6}" width="${f * 0.18}" height="${h * 0.4}" rx="2" fill="#c9a54a"/>`
  );
}

const openBook = (cx: number, cy: number, k = 1, cover = "#2f7d5b") =>
  shadow(cx, cy + 34 * k, 70 * k) +
  `<path d="M${cx},${cy + 30 * k} L${cx - 72 * k},${cy + 22 * k} L${cx - 72 * k},${cy - 30 * k} L${cx},${cy - 22 * k} Z" fill="${cover}"/>` +
  `<path d="M${cx},${cy + 30 * k} L${cx + 72 * k},${cy + 22 * k} L${cx + 72 * k},${cy - 30 * k} L${cx},${cy - 22 * k} Z" fill="${shade(cover, -0.15)}"/>` +
  `<path d="M${cx},${cy + 24 * k} Q${cx - 34 * k},${cy + 10 * k} ${cx - 66 * k},${cy + 18 * k} L${cx - 66 * k},${cy - 34 * k} Q${cx - 34 * k},${cy - 42 * k} ${cx},${cy - 28 * k} Z" fill="#fff8e6"/>` +
  `<path d="M${cx},${cy + 24 * k} Q${cx + 34 * k},${cy + 10 * k} ${cx + 66 * k},${cy + 18 * k} L${cx + 66 * k},${cy - 34 * k} Q${cx + 34 * k},${cy - 42 * k} ${cx},${cy - 28 * k} Z" fill="#fdf1d3"/>` +
  [0, 1, 2, 3, 4]
    .map((i) => `<path d="M${cx - 56 * k},${cy - 22 * k + i * 9 * k} Q${cx - 30 * k},${cy - 28 * k + i * 9 * k} ${cx - 8 * k},${cy - 18 * k + i * 9 * k}" stroke="#b9a37a" stroke-width="${2 * k}" fill="none"/><path d="M${cx + 8 * k},${cy - 18 * k + i * 9 * k} Q${cx + 30 * k},${cy - 28 * k + i * 9 * k} ${cx + 56 * k},${cy - 22 * k + i * 9 * k}" stroke="#b9a37a" stroke-width="${2 * k}" fill="none"/>`)
    .join("");

function scale(cx: number, base: number) {
  return (
    shadow(cx, base + 2, 50) +
    `<rect x="${cx - 4}" y="${base - 100}" width="8" height="100" rx="3" fill="#a87a2e"/><rect x="${cx - 28}" y="${base - 6}" width="56" height="8" rx="4" fill="#8c6424"/>` +
    `<rect x="${cx - 80}" y="${base - 104}" width="160" height="7" rx="3.5" fill="#c99a3d"/><circle cx="${cx}" cy="${base - 104}" r="8" fill="#e0b450"/>` +
    `<path d="M${cx - 74},${base - 100} L${cx - 96},${base - 50} M${cx - 74},${base - 100} L${cx - 52},${base - 50} M${cx + 74},${base - 100} L${cx + 52},${base - 50} M${cx + 74},${base - 100} L${cx + 96},${base - 50}" stroke="#a87a2e" stroke-width="2"/>` +
    `<path d="M${cx - 102},${base - 50} Q${cx - 74},${base - 30} ${cx - 46},${base - 50} Z" fill="#e0b450"/><path d="M${cx + 46},${base - 50} Q${cx + 74},${base - 30} ${cx + 102},${base - 50} Z" fill="#e0b450"/>`
  );
}

function mountain(cx: number, base: number, w: number, h: number, fill = "#8c6f5b") {
  return `<path d="M${cx - w / 2},${base} L${cx - w * 0.18},${base - h * 0.7} L${cx},${base - h} L${cx + w * 0.16},${base - h * 0.78} L${cx + w / 2},${base} Z" fill="${fill}"/><path d="M${cx},${base - h} L${cx + w * 0.16},${base - h * 0.78} L${cx + w / 2},${base} L${cx + w * 0.08},${base} Z" fill="${shade(fill, 0.14)}"/>`;
}

function cave(cx: number, base: number) {
  return (
    `<path d="M${cx - 150},${base} Q${cx - 120},${base - 120} ${cx},${base - 130} Q${cx + 120},${base - 120} ${cx + 150},${base} Z" fill="#8c6f5b"/>` +
    `<path d="M${cx},${base - 130} Q${cx + 120},${base - 120} ${cx + 150},${base} L${cx + 60},${base} Z" fill="#a0826c"/>` +
    `<path d="M${cx - 44},${base} Q${cx - 40},${base - 70} ${cx},${base - 74} Q${cx + 40},${base - 70} ${cx + 44},${base} Z" fill="#2a1f1c"/>`
  );
}

function lamp(cx: number, cy: number) {
  return (
    `<path d="M${cx - 60},${cy + 70} L${cx - 60},${cy - 30} Q${cx},${cy - 100} ${cx + 60},${cy - 30} L${cx + 60},${cy + 70} Z" fill="#d7b98a"/>` +
    `<path d="M${cx - 46},${cy + 70} L${cx - 46},${cy - 24} Q${cx},${cy - 82} ${cx + 46},${cy - 24} L${cx + 46},${cy + 70} Z" fill="#5a4636"/>` +
    `<circle cx="${cx}" cy="${cy}" r="58" fill="#ffe9a0" opacity="0.35"/>` +
    `<path d="M${cx},${cy - 60} L${cx},${cy - 30}" stroke="#a87a2e" stroke-width="2"/>` +
    `<path d="M${cx - 20},${cy - 30} L${cx + 20},${cy - 30} L${cx + 14},${cy + 22} Q${cx},${cy + 30} ${cx - 14},${cy + 22} Z" fill="#cfefff" opacity="0.9"/>` +
    `<path d="M${cx},${cy - 6} Q${cx + 8},${cy + 6} ${cx},${cy + 14} Q${cx - 8},${cy + 6} ${cx},${cy - 6} Z" fill="#ffb02e"/>` +
    `<circle cx="${cx}" cy="${cy + 6}" r="16" fill="#ffd25a" opacity="0.5"/>`
  );
}

// ---------- animals and things ----------

function cow(cx: number, base: number) {
  return (
    shadow(cx, base + 2, 70) +
    [-46, -26, 26, 46].map((dx) => `<rect x="${cx + dx - 6}" y="${base - 36}" width="12" height="38" rx="5" fill="#e9e0d4"/><rect x="${cx + dx - 6}" y="${base - 4}" width="12" height="7" rx="2" fill="#5a4636"/>`).join("") +
    `<ellipse cx="${cx}" cy="${base - 52}" rx="64" ry="34" fill="#fbf5ea"/>` +
    `<path d="M${cx - 20},${base - 80} q18,8 10,28 q-16,4 -26,-10 Z" fill="#c9a24a"/><ellipse cx="${cx + 24}" cy="${base - 40}" rx="16" ry="12" fill="#c9a24a"/>` +
    `<path d="M${cx - 64},${base - 60} q-14,10 -10,34" stroke="#d9cfc0" stroke-width="4" fill="none"/>` +
    `<ellipse cx="${cx + 72}" cy="${base - 66}" rx="24" ry="20" fill="#fbf5ea"/><ellipse cx="${cx + 84}" cy="${base - 56}" rx="14" ry="10" fill="#f2b8a8"/>` +
    `<circle cx="${cx + 80}" cy="${base - 58}" r="2" fill="#7a4a3a"/><circle cx="${cx + 88}" cy="${base - 57}" r="2" fill="#7a4a3a"/>` +
    `<circle cx="${cx + 68}" cy="${base - 72}" r="3.5" fill="#2b2522"/>` +
    `<path d="M${cx + 56},${base - 82} q-10,-14 -2,-20" stroke="#efe3c4" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M${cx + 82},${base - 84} q8,-14 0,-20" stroke="#efe3c4" stroke-width="5" fill="none" stroke-linecap="round"/>` +
    `<ellipse cx="${cx + 52}" cy="${base - 76}" rx="9" ry="5" fill="#e9dfcf" transform="rotate(-20 ${cx + 52} ${base - 76})"/>`
  );
}

function sheep(cx: number, base: number, k = 1) {
  return (
    shadow(cx, base + 2, 34 * k) +
    [-18, -8, 10, 20].map((dx) => `<rect x="${cx + dx * k - 3 * k}" y="${base - 18 * k}" width="${6 * k}" height="${20 * k}" rx="${2 * k}" fill="#4b403a"/>`).join("") +
    [-20, -6, 8, 22, -12, 2, 16].map((dx, i) => `<circle cx="${cx + dx * k}" cy="${base - (i < 4 ? 30 : 42) * k}" r="${13 * k}" fill="#f7f2e8"/>`).join("") +
    `<ellipse cx="${cx + 34 * k}" cy="${base - 38 * k}" rx="${10 * k}" ry="${13 * k}" fill="#4b403a"/><circle cx="${cx + 37 * k}" cy="${base - 41 * k}" r="${2 * k}" fill="#fff"/>`
  );
}

function camel(cx: number, base: number, k = 1) {
  return (
    shadow(cx, base + 2, 46 * k) +
    [-28, -16, 16, 28].map((dx) => `<rect x="${cx + dx * k - 3.5 * k}" y="${base - 48 * k}" width="${7 * k}" height="${50 * k}" rx="${3 * k}" fill="#b98545"/>`).join("") +
    `<path d="M${cx - 40 * k},${base - 44 * k} Q${cx - 36 * k},${base - 86 * k} ${cx - 8 * k},${base - 80 * k} Q${cx + 4 * k},${base - 100 * k} ${cx + 20 * k},${base - 78 * k} Q${cx + 40 * k},${base - 70 * k} ${cx + 38 * k},${base - 44 * k} Z" fill="#d39b55"/>` +
    `<path d="M${cx + 34 * k},${base - 58 * k} Q${cx + 50 * k},${base - 70 * k} ${cx + 52 * k},${base - 96 * k} L${cx + 62 * k},${base - 98 * k} Q${cx + 60 * k},${base - 66 * k} ${cx + 40 * k},${base - 46 * k} Z" fill="#d39b55"/>` +
    `<ellipse cx="${cx + 62 * k}" cy="${base - 100 * k}" rx="${13 * k}" ry="${8 * k}" fill="#d39b55"/><circle cx="${cx + 64 * k}" cy="${base - 103 * k}" r="${2 * k}" fill="#2b2522"/>`
  );
}

function elephant(cx: number, base: number) {
  return (
    shadow(cx, base + 2, 80) +
    [-40, -18, 22, 44].map((dx) => `<rect x="${cx + dx - 11}" y="${base - 46}" width="22" height="48" rx="8" fill="#8e98a3"/>`).join("") +
    `<ellipse cx="${cx}" cy="${base - 66}" rx="70" ry="44" fill="#a3adb8"/>` +
    `<ellipse cx="${cx + 66}" cy="${base - 84}" rx="34" ry="32" fill="#a3adb8"/>` +
    `<path d="M${cx + 54},${base - 106} Q${cx + 30},${base - 110} ${cx + 32},${base - 72} Q${cx + 40},${base - 52} ${cx + 58},${base - 64} Z" fill="#8e98a3"/>` +
    `<path d="M${cx + 92},${base - 78} Q${cx + 110},${base - 50} ${cx + 100},${base - 20} Q${cx + 108},${base - 14} ${cx + 112},${base - 22} Q${cx + 124},${base - 56} ${cx + 98},${base - 92} Z" fill="#a3adb8"/>` +
    `<circle cx="${cx + 78}" cy="${base - 92}" r="4" fill="#2b2522"/><path d="M${cx + 88},${base - 66} q8,8 18,4" stroke="#f4efe4" stroke-width="5" stroke-linecap="round" fill="none"/>`
  );
}

const bird = (x: number, y: number, k = 1, fill = "#3a3a46") => `<path d="M${x - 12 * k},${y} Q${x - 6 * k},${y - 8 * k} ${x},${y} Q${x + 6 * k},${y - 8 * k} ${x + 12 * k},${y}" stroke="${fill}" stroke-width="${2.6 * k}" fill="none" stroke-linecap="round"/>`;

function bee(cx: number, cy: number, k = 1) {
  return (
    `<ellipse cx="${cx - 4 * k}" cy="${cy - 14 * k}" rx="${12 * k}" ry="${8 * k}" fill="#e8f6ff" opacity="0.9" transform="rotate(-25 ${cx} ${cy})"/><ellipse cx="${cx + 8 * k}" cy="${cy - 14 * k}" rx="${12 * k}" ry="${8 * k}" fill="#e8f6ff" opacity="0.9" transform="rotate(25 ${cx} ${cy})"/>` +
    `<ellipse cx="${cx}" cy="${cy}" rx="${18 * k}" ry="${12 * k}" fill="#ffc21a"/>` +
    [-6, 2, 10].map((dx) => `<rect x="${cx + dx * k - 2.5 * k}" y="${cy - 11 * k}" width="${5 * k}" height="${22 * k}" fill="#3a2d1f"/>`).join("") +
    `<circle cx="${cx - 18 * k}" cy="${cy - 2 * k}" r="${7 * k}" fill="#3a2d1f"/><circle cx="${cx - 20 * k}" cy="${cy - 4 * k}" r="${1.6 * k}" fill="#fff"/>`
  );
}

function honeycomb(cx: number, cy: number) {
  let s = "";
  const r = 15;
  for (let row = 0; row < 4; row += 1) {
    for (let col = 0; col < 5; col += 1) {
      const x = cx - 60 + col * r * 1.74 + (row % 2) * r * 0.87;
      const y = cy - 40 + row * r * 1.5;
      const pts = Array.from({ length: 6 }, (_, i) => {
        const a = Math.PI / 6 + (i * Math.PI) / 3;
        return `${(x + Math.cos(a) * r).toFixed(1)},${(y + Math.sin(a) * r).toFixed(1)}`;
      }).join(" ");
      s += `<polygon points="${pts}" fill="${(row + col) % 3 ? "#f2a91c" : "#ffcf4a"}" stroke="#c98500" stroke-width="2"/>`;
    }
  }
  return s;
}

function web(cx: number, cy: number, r: number) {
  let s = "";
  for (let i = 0; i < 8; i += 1) {
    const a = (i * Math.PI) / 4;
    s += `<path d="M${cx},${cy} L${(cx + Math.cos(a) * r).toFixed(1)},${(cy + Math.sin(a) * r).toFixed(1)}" stroke="#ffffff" stroke-width="1.6" opacity="0.85"/>`;
  }
  for (let ring = 1; ring <= 5; ring += 1) {
    const rr = (r * ring) / 5;
    const pts = Array.from({ length: 9 }, (_, i) => `${(cx + Math.cos((i * Math.PI) / 4) * rr).toFixed(1)},${(cy + Math.sin((i * Math.PI) / 4) * rr).toFixed(1)}`).join(" ");
    s += `<polyline points="${pts}" stroke="#ffffff" stroke-width="1.4" fill="none" opacity="0.8"/>`;
  }
  return s + `<path d="M${cx},${cy - r} L${cx},${cy + 18}" stroke="#fff" stroke-width="1"/><ellipse cx="${cx}" cy="${cy + 24}" rx="7" ry="9" fill="#2b2522"/><circle cx="${cx}" cy="${cy + 14}" r="5" fill="#2b2522"/>`;
}

function ant(x: number, y: number, k = 1) {
  return (
    `<circle cx="${x}" cy="${y}" r="${4 * k}" fill="#3a2a22"/><ellipse cx="${x + 8 * k}" cy="${y}" rx="${4 * k}" ry="${3.5 * k}" fill="#3a2a22"/><ellipse cx="${x + 18 * k}" cy="${y}" rx="${7 * k}" ry="${5 * k}" fill="#3a2a22"/>` +
    [-1, 0, 1].map((i) => `<path d="M${x + 8 * k + i * 3 * k},${y} l${i * 3 * k - 2 * k},${7 * k} M${x + 8 * k + i * 3 * k},${y} l${i * 3 * k - 2 * k},${-7 * k}" stroke="#3a2a22" stroke-width="${1.4 * k}"/>`).join("") +
    `<path d="M${x - 2 * k},${y - 3 * k} q${-5 * k},${-6 * k} ${-8 * k},${-4 * k}" stroke="#3a2a22" stroke-width="${1.2 * k}" fill="none"/>`
  );
}

function whale(cx: number, cy: number) {
  return (
    `<path d="M${cx - 90},${cy} Q${cx - 80},${cy - 50} ${cx},${cy - 46} Q${cx + 70},${cy - 40} ${cx + 92},${cy - 6} L${cx + 120},${cy - 30} Q${cx + 118},${cy} ${cx + 128},${cy + 18} L${cx + 96},${cy + 8} Q${cx + 40},${cy + 34} ${cx - 40},${cy + 26} Q${cx - 90},${cy + 22} ${cx - 90},${cy} Z" fill="#3b6f9a"/>` +
    `<path d="M${cx - 86},${cy + 6} Q${cx - 20},${cy + 30} ${cx + 60},${cy + 14} Q${cx},${cy + 34} ${cx - 50},${cy + 24} Z" fill="#cfe2ee"/>` +
    `<circle cx="${cx - 56}" cy="${cy - 12}" r="4.5" fill="#1a2a3a"/>` +
    `<path d="M${cx - 30},${cy - 48} q-6,-18 -18,-24 M${cx - 30},${cy - 48} q4,-20 16,-26 M${cx - 30},${cy - 48} l0,-26" stroke="#bfe6ff" stroke-width="4" stroke-linecap="round" fill="none"/>`
  );
}

function ship(cx: number, base: number, k = 1) {
  return (
    `<path d="M${cx - 110 * k},${base - 30 * k} L${cx + 110 * k},${base - 30 * k} Q${cx + 96 * k},${base + 8 * k} ${cx + 60 * k},${base + 10 * k} L${cx - 60 * k},${base + 10 * k} Q${cx - 96 * k},${base + 8 * k} ${cx - 110 * k},${base - 30 * k} Z" fill="#8a5a32"/>` +
    [0, 1, 2].map((i) => `<path d="M${cx - 104 * k + i * 4 * k},${base - 20 * k + i * 10 * k} L${cx + 104 * k - i * 6 * k},${base - 20 * k + i * 10 * k}" stroke="#6b4426" stroke-width="${2 * k}"/>`).join("") +
    `<rect x="${cx - 60 * k}" y="${base - 66 * k}" width="${120 * k}" height="${36 * k}" fill="#a87346"/><path d="M${cx - 66 * k},${base - 66 * k} L${cx},${base - 92 * k} L${cx + 66 * k},${base - 66 * k} Z" fill="#7a4d2a"/>` +
    [-36, 0, 36].map((dx) => `<rect x="${cx + dx * k - 7 * k}" y="${base - 58 * k}" width="${14 * k}" height="${12 * k}" rx="2" fill="#4a2f1a"/>`).join("")
  );
}

function scroll(cx: number, cy: number, k = 1) {
  return (
    shadow(cx, cy + 50 * k, 60 * k) +
    `<rect x="${cx - 52 * k}" y="${cy - 40 * k}" width="${104 * k}" height="${82 * k}" fill="#f8e2ae"/>` +
    `<rect x="${cx - 62 * k}" y="${cy - 52 * k}" width="${124 * k}" height="${16 * k}" rx="${8 * k}" fill="#e2bd72"/><rect x="${cx - 62 * k}" y="${cy + 36 * k}" width="${124 * k}" height="${16 * k}" rx="${8 * k}" fill="#e2bd72"/>` +
    [0, 1, 2, 3, 4].map((i) => `<path d="M${cx - 38 * k},${cy - 24 * k + i * 13 * k} L${cx + 38 * k - (i % 2) * 14 * k},${cy - 24 * k + i * 13 * k}" stroke="#9a7a48" stroke-width="${3 * k}" stroke-linecap="round"/>`).join("")
  );
}

function quill(cx: number, cy: number) {
  return (
    scroll(cx - 30, cy + 10, 0.85) +
    `<path d="M${cx + 70},${cy - 70} Q${cx + 40},${cy - 40} ${cx + 22},${cy + 20} L${cx + 28},${cy + 22} Q${cx + 60},${cy - 30} ${cx + 92},${cy - 64} Q${cx + 86},${cy - 76} ${cx + 70},${cy - 70} Z" fill="#fdfcf8" stroke="#c9c2b2" stroke-width="1.5"/>` +
    `<path d="M${cx + 80},${cy - 68} L${cx + 24},${cy + 22}" stroke="#a89f8c" stroke-width="1.5"/>` +
    `<path d="M${cx + 54},${cy + 28} q-8,-14 0,-22 h22 q8,8 0,22 Z" fill="#2b2d33"/>`
  );
}

function hourglass(cx: number, cy: number) {
  return (
    `<rect x="${cx - 46}" y="${cy - 70}" width="92" height="10" rx="4" fill="#9a5724"/><rect x="${cx - 46}" y="${cy + 60}" width="92" height="10" rx="4" fill="#9a5724"/>` +
    `<path d="M${cx - 36},${cy - 60} L${cx + 36},${cy - 60} Q${cx + 34},${cy - 20} ${cx + 6},${cy} Q${cx + 34},${cy + 20} ${cx + 36},${cy + 60} L${cx - 36},${cy + 60} Q${cx - 34},${cy + 20} ${cx - 6},${cy} Q${cx - 34},${cy - 20} ${cx - 36},${cy - 60} Z" fill="#e8f6ff" opacity="0.85" stroke="#c7d0cb" stroke-width="2"/>` +
    `<path d="M${cx - 22},${cy - 30} L${cx + 22},${cy - 30} Q${cx + 12},${cy - 10} ${cx},${cy - 4} Q${cx - 12},${cy - 10} ${cx - 22},${cy - 30} Z" fill="#e2bd72"/>` +
    `<path d="M${cx},${cy} L${cx},${cy + 40}" stroke="#e2bd72" stroke-width="2"/><path d="M${cx - 32},${cy + 58} Q${cx},${cy + 26} ${cx + 32},${cy + 58} Z" fill="#e2bd72"/>`
  );
}

function coins(cx: number, base: number) {
  let s = shadow(cx, base + 2, 70);
  const stacks = [[-50, 5], [-18, 8], [16, 6], [48, 4]];
  for (const [dx, n] of stacks) {
    for (let i = 0; i < n; i += 1) s += `<ellipse cx="${cx + dx}" cy="${base - i * 8}" rx="18" ry="6" fill="${i % 2 ? "#e0a800" : "#ffc21a"}" stroke="#c98500" stroke-width="1.2"/>`;
  }
  return s;
}

function heart(cx: number, cy: number, r: number) {
  return `<circle cx="${cx}" cy="${cy}" r="${r * 1.7}" fill="#ffd6dc" opacity="0.5"/><path d="M${cx},${cy + r} C${cx - r * 1.6},${cy - r * 0.1} ${cx - r * 0.9},${cy - r * 1.3} ${cx},${cy - r * 0.45} C${cx + r * 0.9},${cy - r * 1.3} ${cx + r * 1.6},${cy - r * 0.1} ${cx},${cy + r} Z" fill="#ff4d5e"/><ellipse cx="${cx - r * 0.45}" cy="${cy - r * 0.45}" rx="${r * 0.2}" ry="${r * 0.12}" fill="#fff" opacity="0.6"/>`;
}

function rose(cx: number, base: number) {
  return (
    `<path d="M${cx},${base} Q${cx - 6},${base - 60} ${cx},${base - 110}" stroke="#3d7a35" stroke-width="5" fill="none"/>` +
    `<path d="M${cx - 2},${base - 50} q-30,-10 -40,8 q24,10 40,-8 Z" fill="#4f9a45"/><path d="M${cx + 1},${base - 72} q30,-12 42,4 q-22,12 -42,-4 Z" fill="#4f9a45"/>` +
    `<circle cx="${cx}" cy="${base - 120}" r="26" fill="#e8455e"/><path d="M${cx - 18},${base - 124} q18,-22 36,0 q-18,14 -36,0 Z" fill="#ff6b80"/><path d="M${cx - 8},${base - 130} q8,-10 16,0 q-8,8 -16,0 Z" fill="#c9304a"/>`
  );
}

function table(cx: number, base: number) {
  return (
    shadow(cx, base + 2, 110) +
    `<path d="M${cx - 120},${base - 50} L${cx + 120},${base - 50} L${cx + 100},${base - 70} L${cx - 100},${base - 70} Z" fill="#f4ead6"/>` +
    `<path d="M${cx - 120},${base - 50} L${cx + 120},${base - 50} L${cx + 120},${base - 36} Q${cx},${base - 26} ${cx - 120},${base - 36} Z" fill="#e7d6b4"/>` +
    `<rect x="${cx - 108}" y="${base - 38}" width="10" height="38" fill="#9a6a3a"/><rect x="${cx + 98}" y="${base - 38}" width="10" height="38" fill="#9a6a3a"/>` +
    `<ellipse cx="${cx - 50}" cy="${base - 66}" rx="30" ry="9" fill="#c47a3a"/><ellipse cx="${cx - 50}" cy="${base - 72}" rx="22" ry="10" fill="#e5a24e"/>` +
    `<ellipse cx="${cx + 10}" cy="${base - 66}" rx="26" ry="8" fill="#c47a3a"/>` +
    [0, 1, 2, 3, 4].map((i) => `<circle cx="${cx + i * 7}" cy="${base - 74 - (i % 2) * 5}" r="6" fill="${i % 2 ? "#8e3a1b" : "#a3471f"}"/>`).join("") +
    `<ellipse cx="${cx + 62}" cy="${base - 66}" rx="24" ry="8" fill="#c47a3a"/><circle cx="${cx + 56}" cy="${base - 76}" r="9" fill="#e8455e"/><circle cx="${cx + 70}" cy="${base - 74}" r="8" fill="#ffb02e"/>`
  );
}

function wall(cx: number, base: number) {
  return (
    `<rect x="${cx - 26}" y="${base - 130}" width="52" height="130" fill="#b79b78"/>` +
    [0, 1, 2, 3, 4, 5, 6].map((i) => `<path d="M${cx - 26},${base - 18 - i * 17} L${cx + 26},${base - 18 - i * 17}" stroke="#9c8262" stroke-width="2"/>`).join("") +
    `<rect x="${cx - 32}" y="${base - 138}" width="64" height="10" fill="#9c8262"/>` +
    `<path d="M0,${base} Q${cx - 100},${base - 20} ${cx - 26},${base - 6} L${cx - 26},${base} Z" fill="#8fbf6a"/>` +
    `<path d="M${cx + 26},${base - 6} Q${cx + 100},${base - 20} 400,${base} Z" fill="#c7a77a"/>`
  );
}

function door(cx: number, base: number) {
  return (
    `<circle cx="${cx}" cy="${base - 70}" r="90" fill="#fff3c4" opacity="0.35"/>` +
    `<path d="M${cx - 44},${base} L${cx - 44},${base - 100} Q${cx},${base - 150} ${cx + 44},${base - 100} L${cx + 44},${base} Z" fill="#c47a3a"/>` +
    `<path d="M${cx - 34},${base} L${cx - 34},${base - 96} Q${cx},${base - 134} ${cx + 34},${base - 96} L${cx + 34},${base} Z" fill="#fff6cf"/>` +
    `<path d="M${cx - 34},${base} L${cx - 34},${base - 96} Q${cx - 20},${base - 112} ${cx - 6},${base - 118} L${cx - 14},${base - 6} Z" fill="#7a421a"/>` +
    `<path d="M${cx - 30},${base + 2} L${cx - 70},${base + 30} L${cx + 70},${base + 30} L${cx + 30},${base + 2} Z" fill="#fff6cf" opacity="0.7"/>`
  );
}

function storm() {
  return (
    cloud(150, 70, 2.6, "#5d6a7e", 1) +
    cloud(260, 60, 2.2, "#4b576a", 1) +
    `<path d="M200,92 L180,140 L200,138 L184,190 L232,124 L208,126 L226,92 Z" fill="#ffd84d"/>` +
    [70, 110, 290, 330, 250].map((x, i) => `<path d="M${x},${100 + (i % 2) * 8} l-6,16" stroke="#9fd6f5" stroke-width="3" stroke-linecap="round"/>`).join("")
  );
}

function wind() {
  return [60, 100, 140]
    .map((y, i) => `<path d="M${60 + i * 30},${y} Q${200},${y - 30} ${280},${y} Q${330},${y + 20} ${310},${y - 14} Q${296},${y - 30} ${280},${y - 10}" stroke="#ffffff" stroke-width="5" fill="none" stroke-linecap="round" opacity="0.9"/>`)
    .join("");
}

function dunes() {
  return `<path d="M0,170 Q90,120 180,160 Q260,110 400,150 L400,225 L0,225 Z" fill="#e8b96e"/><path d="M0,190 Q120,150 220,185 Q310,160 400,180 L400,225 L0,225 Z" fill="#d9a35a"/>`;
}

function rockHomes(cx: number, base: number) {
  return (
    `<path d="M${cx - 170},${base} L${cx - 150},${base - 120} Q${cx},${base - 150} ${cx + 150},${base - 120} L${cx + 170},${base} Z" fill="#d49a63"/>` +
    [-90, 0, 90].map((dx) => `<path d="M${cx + dx - 22},${base} L${cx + dx - 22},${base - 56} Q${cx + dx},${base - 76} ${cx + dx + 22},${base - 56} L${cx + dx + 22},${base} Z" fill="#5a3b22"/><rect x="${cx + dx - 34}" y="${base - 92}" width="68" height="8" fill="#b97f4d"/>`).join("")
  );
}

function columns(cx: number, base: number) {
  let s = `<path d="M${cx - 130},${base - 120} L${cx},${base - 160} L${cx + 130},${base - 120} Z" fill="#e9e1d0"/><rect x="${cx - 130}" y="${base - 122}" width="260" height="12" fill="#d8cdb6"/>`;
  for (let i = 0; i < 5; i += 1) {
    const x = cx - 110 + i * 55;
    s += `<rect x="${x - 10}" y="${base - 110}" width="20" height="104" fill="#f2ebdc"/><rect x="${x - 4}" y="${base - 110}" width="3" height="104" fill="#d8cdb6"/><rect x="${x - 14}" y="${base - 10}" width="28" height="10" fill="#d8cdb6"/>`;
  }
  return s;
}

function dam(cx: number, base: number) {
  return (
    `<path d="M0,${base - 40} L${cx - 30},${base - 40} L${cx - 30},${base} L0,${base} Z" fill="#4a9ad4"/>` +
    `<rect x="${cx - 30}" y="${base - 70}" width="60" height="70" fill="#b39572"/>` +
    [0, 1, 2, 3].map((i) => `<path d="M${cx - 30},${base - 54 + i * 14} L${cx + 30},${base - 54 + i * 14}" stroke="#987b5a" stroke-width="2"/>`).join("") +
    tree(cx + 80, base, 0.9, "#5c9a45") +
    tree(cx + 140, base, 0.8, "#6aa84f") +
    `<circle cx="${cx + 70}" cy="${base - 50}" r="4" fill="#e8455e"/><circle cx="${cx + 136}" cy="${base - 44}" r="4" fill="#ffb02e"/>`
  );
}

function tents(cx: number, base: number) {
  return [[-110, 0.8], [-40, 1], [40, 1.1], [110, 0.85]]
    .map(([dx, k]) => {
      const w = 70 * k;
      const h = 44 * k;
      const x = cx + dx - w / 2;
      return `${shadow(cx + dx, base + 2, w * 0.6)}<path d="M${x},${base} L${x + w * 0.1},${base - h} Q${x + w / 2},${base - h - 10 * k} ${x + w * 0.9},${base - h} L${x + w},${base} Z" fill="${dx > 0 ? "#6b5643" : "#7a6450"}"/><path d="M${x + w * 0.38},${base} L${x + w * 0.42},${base - h * 0.6} L${x + w * 0.58},${base - h * 0.6} L${x + w * 0.62},${base} Z" fill="#3a2d22"/>`;
    })
    .join("");
}

function mosque(cx: number, base: number) {
  return (
    shadow(cx, base + 2, 110) +
    `<rect x="${cx - 90}" y="${base - 60}" width="180" height="60" fill="#f4ead6"/>` +
    `<path d="M${cx - 44},${base - 60} Q${cx - 44},${base - 120} ${cx},${base - 124} Q${cx + 44},${base - 120} ${cx + 44},${base - 60} Z" fill="#2fa86f"/>` +
    `<rect x="${cx + 96}" y="${base - 130}" width="18" height="130" fill="#f4ead6"/><path d="M${cx + 92},${base - 130} L${cx + 105},${base - 154} L${cx + 118},${base - 130} Z" fill="#2fa86f"/>` +
    [-60, -20, 20, 60].map((dx) => `<path d="M${cx + dx - 10},${base} L${cx + dx - 10},${base - 30} Q${cx + dx},${base - 42} ${cx + dx + 10},${base - 30} L${cx + dx + 10},${base} Z" fill="#c9a24a"/>`).join("") +
    moon(cx, base - 138, 8)
  );
}

function prayerMat(cx: number, base: number) {
  return (
    `<path d="M${cx - 60},${base} L${cx - 40},${base - 120} L${cx + 40},${base - 120} L${cx + 60},${base} Z" fill="#b8323f"/>` +
    `<path d="M${cx - 48},${base - 8} L${cx - 32},${base - 112} L${cx + 32},${base - 112} L${cx + 48},${base - 8} Z" fill="none" stroke="#f2c76b" stroke-width="3"/>` +
    `<path d="M${cx - 22},${base - 70} L${cx - 22},${base - 92} Q${cx},${base - 108} ${cx + 22},${base - 92} L${cx + 22},${base - 70} Z" fill="#f2c76b"/>` +
    [-40, -20, 0, 20, 40].map((dx) => `<path d="M${cx + dx * 1.3},${base} l0,8" stroke="#f2c76b" stroke-width="2"/>`).join("")
  );
}

function crown(cx: number, cy: number) {
  return (
    `<circle cx="${cx}" cy="${cy + 60}" r="44" fill="#4c8bd4"/><path d="M${cx - 36},${cy + 50} q20,-18 30,6 q14,22 34,-4" stroke="#5fd69c" stroke-width="10" fill="none" stroke-linecap="round"/>` +
    `<path d="M${cx - 50},${cy} L${cx - 54},${cy - 50} L${cx - 26},${cy - 22} L${cx},${cy - 60} L${cx + 26},${cy - 22} L${cx + 54},${cy - 50} L${cx + 50},${cy} Z" fill="#ffc21a" stroke="#c98500" stroke-width="2"/>` +
    `<circle cx="${cx}" cy="${cy - 16}" r="7" fill="#e8455e"/><circle cx="${cx - 30}" cy="${cy - 10}" r="5" fill="#2fa8ff"/><circle cx="${cx + 30}" cy="${cy - 10}" r="5" fill="#2fa8ff"/>`
  );
}

function stairs(cx: number, base: number) {
  let s = "";
  for (let i = 0; i < 7; i += 1) s += `<rect x="${cx - 120 + i * 30}" y="${base - 18 - i * 18}" width="${240 - i * 30}" height="18" fill="${i % 2 ? "#f2ebdc" : "#e3d8c2"}"/>`;
  return s + `<circle cx="${cx + 110}" cy="${base - 150}" r="34" fill="#fff3c4" opacity="0.6"/>`;
}

function anvil(cx: number, base: number) {
  return (
    shadow(cx, base + 2, 80) +
    `<path d="M${cx - 90},${base - 80} L${cx + 60},${base - 80} Q${cx + 110},${base - 76} ${cx + 120},${base - 60} L${cx + 40},${base - 56} L${cx + 30},${base - 30} L${cx + 50},${base} L${cx - 50},${base} L${cx - 30},${base - 30} L${cx - 40},${base - 56} L${cx - 90},${base - 60} Z" fill="#5d6570"/>` +
    `<path d="M${cx - 90},${base - 80} L${cx + 60},${base - 80} Q${cx + 110},${base - 76} ${cx + 120},${base - 60} L${cx - 90},${base - 70} Z" fill="#8a94a0"/>` +
    [0, 1, 2].map((i) => `<rect x="${cx - 120 + i * 26}" y="${base - 18 - (i % 2) * 2}" width="24" height="14" rx="2" fill="#7a828c"/>`).join("")
  );
}

function figOlive(cx: number, base: number) {
  return (
    tree(cx - 70, base, 1.3, "#7f9a6a") +
    tree(cx + 70, base, 1.3, "#4f8a3a") +
    [[-84, -66], [-60, -74], [-72, -50]].map(([dx, dy]) => `<ellipse cx="${cx + dx}" cy="${base + dy}" rx="4" ry="6" fill="#3d5a2c"/>`).join("") +
    [[58, -70], [82, -62], [70, -48]].map(([dx, dy]) => `<circle cx="${cx + dx}" cy="${base + dy}" r="7" fill="#7a3d6b"/>`).join("")
  );
}

function river(cx: number) {
  return `<path d="M${cx - 30},100 Q${cx + 40},140 ${cx - 20},170 Q${cx - 70},200 ${cx + 10},225 L${cx + 70},225 Q${cx - 10},200 ${cx + 30},170 Q${cx + 90},140 ${cx + 20},100 Z" fill="#5fb6ea"/><path d="M${cx - 10},120 q20,10 0,20 M${cx + 10},180 q-20,10 0,20" stroke="#cfefff" stroke-width="3" fill="none" stroke-linecap="round"/>`;
}

function cracks() {
  return `<path d="M60,190 L120,176 L150,200 L210,172 L240,196 L300,180 L340,205" stroke="#5a3b22" stroke-width="5" fill="none" stroke-linejoin="round"/><path d="M150,200 L160,222 M240,196 L232,222" stroke="#5a3b22" stroke-width="4"/>` +
    house(150, 172, 46, 40, "#d9a86a").replace(/<rect/, `<rect transform="rotate(-6 170 150)"`);
}

function rope(cx: number, cy: number) {
  let s = "";
  for (let i = 0; i < 9; i += 1) s += `<ellipse cx="${cx - 100 + i * 25}" cy="${cy + Math.sin(i) * 10}" rx="16" ry="9" fill="${i % 2 ? "#a0703c" : "#b9854d"}" transform="rotate(30 ${cx - 100 + i * 25} ${cy})"/>`;
  return s;
}

function twoPaths(cx: number, base: number) {
  return `<path d="M${cx - 20},${base + 60} L${cx - 150},${base - 60} L${cx - 110},${base - 60} L${cx + 6},${base + 60} Z" fill="#e8d4a6"/><path d="M${cx + 20},${base + 60} L${cx + 150},${base - 60} L${cx + 110},${base - 60} L${cx - 6},${base + 60} Z" fill="#cbb382"/>` + sun(cx - 140, base - 90, 14);
}

function bowl(cx: number, base: number) {
  return shadow(cx, base + 2, 60) + `<path d="M${cx - 60},${base - 50} Q${cx - 56},${base} ${cx},${base} Q${cx + 56},${base} ${cx + 60},${base - 50} Z" fill="#c47a3a"/><ellipse cx="${cx}" cy="${base - 50}" rx="60" ry="12" fill="#e5a24e"/><ellipse cx="${cx}" cy="${base - 50}" rx="50" ry="8" fill="#f4ead6"/>` + [-20, 0, 20].map((dx) => `<circle cx="${cx + dx}" cy="${base - 56}" r="7" fill="#a3471f"/>`).join("");
}

// ---------- motifs by surah ----------

const center = 200;
const ground = 182;

const M = {
  book: { scene: "day", draw: () => openBook(center, 110, 1.3) },
  cow: { scene: "day", draw: () => cloud(80, 50, 1) + tree(330, ground, 0.9) + cow(180, ground) },
  family: { scene: "dusk", draw: () => house(110, ground, 80, 60) + house(220, ground, 90, 74, "#cf9a5c") + palm(340, ground, 90, 6) + `<rect x="128" y="${ground - 46}" width="12" height="12" fill="#ffd84d"/><rect x="246" y="${ground - 58}" width="14" height="14" fill="#ffd84d"/>` },
  rose: { scene: "day", draw: () => rose(center, ground + 10) + rose(center - 70, ground + 20).replace(/#e8455e/g, "#ff7fa6") + rose(center + 70, ground + 20).replace(/#e8455e/g, "#ffb02e") },
  table: { scene: "day", draw: () => table(center, ground) },
  cattle: { scene: "day", draw: () => sheep(120, ground, 1.1) + sheep(220, ground - 6, 0.9) + camel(310, ground, 0.7) },
  heights: { scene: "day", draw: () => wall(center, ground) },
  chest: { scene: "day", draw: () => coins(center, ground) },
  door: { scene: "dawn", draw: () => door(center, ground) },
  whale: { scene: "sea", draw: () => whale(190, 150) + cloud(320, 45, 1) },
  wind: { scene: "day", draw: () => dunes() + wind() },
  dream: { scene: "night", draw: () => sun(70, 60, 22) + moon(330, 60, 22) + Array.from({ length: 11 }, (_, i) => star(110 + (i % 6) * 36 + (i > 5 ? 18 : 0), i > 5 ? 120 : 90, 9)).join("") },
  thunder: { scene: "day", draw: () => storm() },
  kaaba: { scene: "day", draw: () => kaaba(185, ground + 4, 84) + palm(60, ground, 80, -6) + palm(345, ground, 70, 6) },
  rockHomes: { scene: "day", draw: () => rockHomes(center, ground) },
  bee: { scene: "day", draw: () => honeycomb(150, 120) + bee(300, 80, 1.3) + bee(260, 140, 0.9) },
  nightJourney: { scene: "night", draw: () => moon(300, 60, 26) + mosque(170, ground) },
  cave: { scene: "dusk", draw: () => cave(center, ground + 10) },
  palmStream: { scene: "day", draw: () => palm(170, ground, 140, -10) + river(260).replace(/100/g, "150") },
  scrolls: { scene: "day", draw: () => scroll(130, 110, 0.9) + scroll(270, 120, 0.8) },
  mosque: { scene: "dawn", draw: () => mosque(center, ground) },
  lamp: { scene: "night", draw: () => lamp(center, 110) },
  scale: { scene: "day", draw: () => scale(center, ground) },
  quill: { scene: "day", draw: () => quill(center, 110) },
  ants: { scene: "day", draw: () => Array.from({ length: 7 }, (_, i) => ant(60 + i * 44, 170 + (i % 2) * 14, 1.6)).join("") + `<path d="M330,190 q20,-30 40,0 Z" fill="#a98c6a"/>` },
  spider: { scene: "dusk", draw: () => web(center, 100, 90) },
  columns: { scene: "day", draw: () => columns(center, ground) },
  tree: { scene: "day", draw: () => tree(center, ground, 2) },
  prayerMat: { scene: "dawn", draw: () => prayerMat(center, ground + 20) },
  tents: { scene: "day", draw: () => tents(center, ground) },
  dam: { scene: "day", draw: () => dam(140, ground) },
  sky: { scene: "day", draw: () => sun(200, 80, 34) + cloud(90, 60, 1.2) + cloud(320, 90, 1) + bird(130, 110) + bird(160, 98, 0.8) + bird(270, 120, 0.9) },
  rows: { scene: "night", draw: () => [60, 100, 140].map((y, r) => Array.from({ length: 8 }, (_, i) => star(55 + i * 41, y, 8 - r)).join("")).join("") },
  coins: { scene: "day", draw: () => coins(center, ground) + star(110, 90, 10, "#fff6d0") + star(290, 80, 8, "#fff6d0") },
  smoke: { scene: "dusk", draw: () => [0, 1, 2, 3].map((i) => cloud(100 + i * 60, 120 - i * 18, 1.6 + i * 0.3, "#8b8696", 0.75)).join("") },
  dunes: { scene: "day", draw: () => dunes() + sun(320, 60, 22) },
  rooms: { scene: "day", draw: () => house(60, ground, 70, 56) + house(150, ground, 70, 64, "#cf9a5c") + house(240, ground, 70, 56) },
  mountain: { scene: "day", draw: () => mountain(center, ground, 280, 140) + cloud(300, 50, 1.1) },
  star: { scene: "night", draw: () => star(center, 90, 40, "#ffe27a") + `<circle cx="${center}" cy="90" r="70" fill="#fff6d0" opacity="0.12"/>` },
  moon: { scene: "night", draw: () => fullMoon(center, 90, 46) },
  garden: { scene: "day", draw: () => river(center) + tree(90, ground, 1.2) + tree(320, ground, 1.2, "#6aa84f") + `<circle cx="80" cy="120" r="5" fill="#e8455e"/><circle cx="330" cy="114" r="5" fill="#ffb02e"/>` },
  iron: { scene: "day", draw: () => anvil(center, ground) },
  speech: { scene: "day", draw: () => `<path d="M90,50 h150 q16,0 16,16 v50 q0,16 -16,16 h-100 l-24,24 v-24 h-26 q-16,0 -16,-16 v-50 q0,-16 16,-16 Z" fill="#fff"/><path d="M200,100 h110 q14,0 14,14 v40 q0,14 -14,14 h-14 v20 l-20,-20 h-76 q-14,0 -14,-14 v-40 q0,-14 14,-14 Z" fill="#dff4ff"/>` + [0, 1].map((i) => `<rect x="${110}" y="${72 + i * 18}" width="${120 - i * 40}" height="8" rx="4" fill="#c7d0cb"/>`).join("") },
  shield: { scene: "day", draw: () => `<path d="M200,40 L270,64 Q270,150 200,190 Q130,150 130,64 Z" fill="#2fa8ff"/><path d="M200,56 L254,74 Q254,140 200,172 Z" fill="#1683d1"/>` },
  crown: { scene: "night", draw: () => crown(center, 90) },
  pen: { scene: "day", draw: () => quill(center, 110) },
  sun: { scene: "day", draw: () => sun(center, 96, 46) },
  stairs: { scene: "dawn", draw: () => stairs(center, ground + 20) },
  ark: { scene: "sea", draw: () => ship(center, 150) + cloud(80, 50, 1.2, "#cfd8e3") + cloud(320, 40, 1, "#cfd8e3") },
  night: { scene: "night", draw: () => moon(290, 70, 30) + palm(110, ground, 110, -6) },
  dawn: { scene: "dawn", draw: () => sun(center, 170, 40) + `<path d="M0,170 Q200,150 400,170 L400,225 L0,225 Z" fill="#d9b583"/>` + bird(130, 90) + bird(270, 80, 0.8) },
  camel: { scene: "day", draw: () => camel(180, ground, 1.3) + sun(320, 60, 22) },
  city: { scene: "day", draw: () => house(40, ground, 60, 50) + house(110, ground, 64, 60, "#cf9a5c") + kaaba(220, ground, 50) + house(290, ground, 60, 52) },
  heart: { scene: "dawn", draw: () => heart(center, 110, 50) },
  figOlive: { scene: "day", draw: () => figOlive(center, ground) },
  earthquake: { scene: "dusk", draw: () => cracks() },
  dust: { scene: "dawn", draw: () => [0, 1, 2, 3, 4].map((i) => cloud(80 + i * 60, 160 - (i % 2) * 12, 1.2, "#e4c890", 0.85)).join("") + sun(320, 60, 18) },
  hourglass: { scene: "dusk", draw: () => hourglass(center, 112) },
  elephant: { scene: "day", draw: () => elephant(170, ground) + bird(250, 50) + bird(290, 40, 0.8) + bird(320, 60, 0.9) + bird(220, 34, 0.7) },
  caravan: { scene: "dawn", draw: () => camel(110, ground, 0.8) + camel(220, ground, 0.8) + camel(330, ground, 0.8) },
  bowl: { scene: "day", draw: () => bowl(center, ground) },
  river: { scene: "day", draw: () => river(center) + tree(110, ground, 1.1) + tree(300, ground, 1.1, "#6aa84f") },
  paths: { scene: "day", draw: () => twoPaths(center, 160) },
  victory: { scene: "dawn", draw: () => kaaba(170, ground + 4, 70) + sun(300, 70, 26) },
  rope: { scene: "day", draw: () => rope(center, 120) }
} satisfies Record<string, Motif>;

type MotifId = keyof typeof M;

/** What each surah's name means, drawn. A surah not listed gets its name in Arabic letters. */
const SURAH_MOTIF: Record<number, MotifId> = {
  1: "book", 2: "cow", 3: "family", 4: "rose", 5: "table", 6: "cattle", 7: "heights", 8: "chest", 9: "door", 10: "whale", 11: "wind",
  12: "dream", 13: "thunder", 14: "kaaba", 15: "rockHomes", 16: "bee", 17: "nightJourney", 18: "cave", 19: "palmStream", 21: "scrolls",
  22: "kaaba", 23: "mosque", 24: "lamp", 25: "scale", 26: "quill", 27: "ants", 28: "book", 29: "spider", 30: "columns", 31: "tree",
  32: "prayerMat", 33: "tents", 34: "dam", 35: "sky", 37: "rows", 39: "paths", 40: "door", 41: "book", 42: "speech", 43: "coins", 44: "smoke",
  45: "prayerMat", 46: "dunes", 48: "victory", 49: "rooms", 51: "wind", 52: "mountain", 53: "star", 54: "moon", 55: "garden", 56: "sky",
  57: "iron", 58: "speech", 59: "tents", 60: "scale", 61: "rows", 62: "mosque", 64: "scale", 65: "rooms", 66: "shield", 67: "crown",
  68: "pen", 69: "sun", 70: "stairs", 71: "ark", 72: "night", 73: "night", 74: "night", 76: "garden", 77: "wind", 78: "scrolls", 79: "rows",
  81: "sun", 82: "rows", 83: "scale", 84: "sky", 85: "rows", 86: "star", 87: "mountain", 88: "camel", 89: "dawn", 90: "city", 91: "sun",
  92: "night", 93: "sun", 94: "heart", 95: "figOlive", 96: "pen", 97: "night", 98: "book", 99: "earthquake", 100: "dust", 101: "scale",
  102: "coins", 103: "hourglass", 104: "coins", 105: "elephant", 106: "caravan", 107: "bowl", 108: "river", 109: "paths", 110: "victory",
  111: "rope", 113: "dawn"
};

const lettersCard = () => {
  let s = `<defs><linearGradient id="sky" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2f7d5b"/><stop offset="1" stop-color="#1f5a40"/></linearGradient></defs><rect width="${W}" height="${H}" fill="url(#sky)"/>`;
  for (let y = 0; y < H + 40; y += 40) {
    for (let x = (y / 40) % 2 ? 20 : 0; x < W + 40; x += 40) s += star(x, y, 9, "#3c9470");
  }
  return s + `<rect x="60" y="40" width="280" height="145" rx="22" fill="#fff8e6" opacity="0.95"/>`;
};

const key = (name: string) => name.toLowerCase().replace(/^(surah|surat|sura)\s+/, "").replace(/[^a-z]/g, "");
const NUMBER_BY_KEY = new Map(SURAH_NAMES.map((name, index) => [key(name), index + 1]));
// Other spellings the lessons use.
for (const [alias, surah] of [["anbiya", 21], ["shura", 42], ["duha", 93], ["saff", 61], ["imran", 3], ["fatiha", 1], ["yasin", 36], ["nisaa", 4]] as const) {
  NUMBER_BY_KEY.set(alias, surah);
  NUMBER_BY_KEY.set(`al${alias}`, surah);
  NUMBER_BY_KEY.set(`an${alias}`, surah);
  NUMBER_BY_KEY.set(`ash${alias}`, surah);
  NUMBER_BY_KEY.set(`ad${alias}`, surah);
  NUMBER_BY_KEY.set(`as${alias}`, surah);
}

/** The surah a lesson called "Surah Al-Baqarah" (or "Surah Ali 'Imran") is about, or undefined. */
export function surahNumberForTitle(title: string): number | undefined {
  if (!/^\s*(surah|surat|sura)\s+\S/i.test(title)) return undefined;
  return NUMBER_BY_KEY.get(key(title));
}

/** True when the surah's name is drawn as a picture (not only its Arabic letters). */
export function surahHasDrawing(surah: number) {
  return Boolean(SURAH_MOTIF[surah]);
}

/** The picture of the surah's name, an SVG document 400x225; the letters card for a name not drawn. */
export function surahPictureXml(surah: number): string {
  maskCount = 0;
  const motif = SURAH_MOTIF[surah] ? M[SURAH_MOTIF[surah]] : undefined;
  // Ids are made unique per surah, so two pictures on one web page never share a gradient or mask.
  const body = (motif ? backdrop(motif.scene) + motif.draw() : lettersCard()).replace(/id="(sky|m\d+)"/g, `id="s${surah}$1"`).replace(/url\(#(sky|m\d+)\)/g, `url(#s${surah}$1)`);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">${body}</svg>`;
}

export const SURAH_PICTURE_SIZE = { width: W, height: H };

/** The names of the parts a surah is taught in (its passages, in order), English; empty when none. */
export function surahParts(surah: number): string[] {
  return ALL_SURAH_MEANINGS.find((each) => each.surah === surah)?.passages.map((passage) => passage.title) ?? [];
}
