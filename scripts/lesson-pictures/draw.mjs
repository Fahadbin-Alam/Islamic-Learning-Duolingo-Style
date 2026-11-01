// Draws the "long ago" lesson pictures: Makkah, the Ka'bah, Madinah and the places around them as they looked in
// the early years of Islam (no towers, cranes, lamps, roads or crowds), from what the seerah books describe:
// a dry valley of dark mountains with flat-roofed houses round the Ka'bah, Madinah's date-palm groves and black
// lava fields with Uhud to the north, the open plains of Mina, Muzdalifah and Arafah. Only places: never a person.
//
//   node scripts/lesson-pictures/draw.mjs            writes assets/pictures/<id>.jpg (1024x576)
//   node scripts/lesson-pictures/draw.mjs --sheet    also writes /tmp/drawn-sheet.png to look them over
//
// Uses the Playwright that is already installed (require('playwright')).
import { createRequire } from "node:module";
import { mkdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const W = 1024;
const H = 576;

// ---------- small drawing kit ----------

/** A seeded random, so every run draws the same picture. */
function rng(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

const sky = (id, top, bottom) =>
  `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${top}"/><stop offset="1" stop-color="${bottom}"/></linearGradient></defs><rect width="${W}" height="${H}" fill="url(#${id})"/>`;

/** A mountain ridge from x0 to x1 with peaks [[x, y], ...], filled down to the bottom. */
function ridge(points, fill, base = H, extra = "") {
  const [first, ...rest] = points;
  let d = `M${first[0]},${base} L${first[0]},${first[1]}`;
  for (let i = 0; i < rest.length; i += 1) {
    const [x, y] = rest[i];
    const [px, py] = i === 0 ? first : rest[i - 1];
    const cx = (px + x) / 2;
    d += ` Q${cx},${Math.min(py, y) - 6} ${x},${y}`;
  }
  d += ` L${points[points.length - 1][0]},${base} Z`;
  return `<path d="${d}" fill="${fill}" ${extra}/>`;
}

/** A jagged rocky ridge: straight lines between the points. */
function rocks(points, fill, base = H, extra = "") {
  const d = `M${points[0][0]},${base} ` + points.map(([x, y]) => `L${x},${y}`).join(" ") + ` L${points[points.length - 1][0]},${base} Z`;
  return `<path d="${d}" fill="${fill}" ${extra}/>`;
}

/** Light-side facets on a jagged ridge, for a sunlit look. */
function facets(points, fill) {
  let out = "";
  for (let i = 1; i < points.length - 1; i += 1) {
    const [x, y] = points[i];
    const [nx, ny] = points[i + 1];
    if (ny > y) out += `<path d="M${x},${y} L${nx},${ny} L${x + (nx - x) * 0.35},${ny + 40} Z" fill="${fill}"/>`;
  }
  return out;
}

/** A flat-roofed mud-brick house: front wall, darker side, a door and small windows. */
function house(x, y, w, h, wall = "#d9a86a", side = "#b9854d", seed = 1) {
  const r = rng(seed);
  const depth = w * 0.28;
  let s = `<rect x="${x}" y="${y - h}" width="${w}" height="${h}" fill="${wall}"/>`;
  s += `<path d="M${x + w},${y - h} l${depth},${-depth * 0.35} l0,${h} l${-depth},${depth * 0.35} Z" fill="${side}"/>`;
  s += `<path d="M${x},${y - h} l${depth},${-depth * 0.35} l${w},0 l${-depth},${depth * 0.35} Z" fill="${shade(wall, 0.1)}"/>`;
  // a low parapet line and wooden roof beams poking out
  s += `<rect x="${x}" y="${y - h}" width="${w}" height="${Math.max(2, h * 0.08)}" fill="${shade(wall, -0.12)}"/>`;
  for (let bx = x + 5; bx < x + w - 3; bx += 11) s += `<rect x="${bx}" y="${y - h + h * 0.14}" width="3" height="3" fill="#6b4a2b"/>`;
  if (w > 26) {
    const dw = Math.max(6, w * 0.18);
    const dx = x + w * (0.2 + r() * 0.5);
    s += `<path d="M${dx},${y} l0,${-h * 0.5} q${dw / 2},${-dw * 0.6} ${dw},0 l0,${h * 0.5} Z" fill="#5a3b22"/>`;
  }
  if (h > 24 && w > 36) {
    const wx = x + w * 0.12;
    s += `<rect x="${wx}" y="${y - h * 0.7}" width="${w * 0.1}" height="${h * 0.14}" fill="#5a3b22"/>`;
  }
  return s;
}

/** Mixes a hex colour towards white (+) or black (-). */
function shade(hex, amount) {
  const n = parseInt(hex.slice(1), 16);
  const ch = [n >> 16, (n >> 8) & 255, n & 255].map((c) => Math.round(amount >= 0 ? c + (255 - c) * amount : c * (1 + amount)));
  return `#${ch.map((c) => Math.max(0, Math.min(255, c)).toString(16).padStart(2, "0")).join("")}`;
}

/** A date palm: a curved trunk with rings and a crown of fronds, sometimes with date bunches. */
function palm(x, y, height, lean = 0, seed = 1, colors = { trunk: "#8a6239", leaf: "#4f8a3a", dark: "#3d6e2c" }) {
  const r = rng(seed);
  const topX = x + lean;
  const topY = y - height;
  let s = `<path d="M${x - 5},${y} Q${x + lean * 0.3},${y - height * 0.5} ${topX - 2},${topY} L${topX + 2},${topY} Q${x + lean * 0.3 + 6},${y - height * 0.5} ${x + 5},${y} Z" fill="${colors.trunk}"/>`;
  for (let i = 1; i < 9; i += 1) {
    const t = i / 9;
    const px = x + (topX - x) * t * t * 0.9 + lean * 0.05;
    s += `<path d="M${px - 4.5},${y - height * t} l9,-2" stroke="${shade(colors.trunk, -0.25)}" stroke-width="1.6"/>`;
  }
  const fronds = 9;
  for (let i = 0; i < fronds; i += 1) {
    const a = -Math.PI + (i / (fronds - 1)) * Math.PI + (r() - 0.5) * 0.25;
    const len = height * (0.42 + r() * 0.14);
    const ex = topX + Math.cos(a) * len;
    const ey = topY + Math.sin(a) * len * 0.55 + len * 0.35;
    const mx = topX + Math.cos(a) * len * 0.5;
    const my = topY + Math.sin(a) * len * 0.5 - 10;
    const fill = i % 2 ? colors.leaf : colors.dark;
    s += `<path d="M${topX},${topY} Q${mx},${my - 8} ${ex},${ey} Q${mx},${my + 8} ${topX},${topY + 4} Z" fill="${fill}"/>`;
  }
  if (r() > 0.4) {
    s += `<ellipse cx="${topX - 7}" cy="${topY + 10}" rx="6" ry="9" fill="#c8741f"/><ellipse cx="${topX + 8}" cy="${topY + 11}" rx="5" ry="8" fill="#b4621a"/>`;
  }
  return s;
}

/** A small round desert shrub. */
const bush = (x, y, r, fill = "#7d8f3f") =>
  `<ellipse cx="${x}" cy="${y - r * 0.5}" rx="${r}" ry="${r * 0.6}" fill="${fill}"/><ellipse cx="${x - r * 0.35}" cy="${y - r * 0.75}" rx="${r * 0.5}" ry="${r * 0.4}" fill="${shade(fill, 0.15)}"/>`;

/** A scatter of pebbles. */
function pebbles(x0, x1, y0, y1, n, seed, fills = ["#a98c6a", "#8e7354", "#c2a682"]) {
  const r = rng(seed);
  let s = "";
  for (let i = 0; i < n; i += 1) {
    const x = x0 + r() * (x1 - x0);
    const y = y0 + r() * (y1 - y0);
    s += `<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="${(2 + r() * 4).toFixed(1)}" ry="${(1.5 + r() * 2.5).toFixed(1)}" fill="${fills[i % fills.length]}"/>`;
  }
  return s;
}

/** Soft clouds. */
const cloud = (x, y, s, fill = "#ffffff", op = 0.85) =>
  `<g opacity="${op}" fill="${fill}"><ellipse cx="${x}" cy="${y}" rx="${46 * s}" ry="${16 * s}"/><ellipse cx="${x - 22 * s}" cy="${y - 8 * s}" rx="${24 * s}" ry="${16 * s}"/><ellipse cx="${x + 16 * s}" cy="${y - 12 * s}" rx="${28 * s}" ry="${20 * s}"/></g>`;

/** Stars for night skies. */
function stars(n, seed, maxY = H * 0.55) {
  const r = rng(seed);
  let s = "";
  for (let i = 0; i < n; i += 1) {
    const x = r() * W;
    const y = r() * maxY;
    const big = r() > 0.88;
    s += big
      ? `<path d="M${x},${y - 5} L${x + 1.4},${y - 1.4} L${x + 5},${y} L${x + 1.4},${y + 1.4} L${x},${y + 5} L${x - 1.4},${y + 1.4} L${x - 5},${y} L${x - 1.4},${y - 1.4} Z" fill="#fff6d6"/>`
      : `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(0.7 + r() * 1.3).toFixed(1)}" fill="#ffffff" opacity="${(0.5 + r() * 0.5).toFixed(2)}"/>`;
  }
  return s;
}

const sun = (x, y, r, fill = "#ffe08a", glow = "#fff3c4") =>
  `<circle cx="${x}" cy="${y}" r="${r * 2.2}" fill="${glow}" opacity="0.35"/><circle cx="${x}" cy="${y}" r="${r * 1.45}" fill="${glow}" opacity="0.45"/><circle cx="${x}" cy="${y}" r="${r}" fill="${fill}"/>`;

let crescentCount = 0;
/** A crescent moon cut with a mask, so it sits right on any sky. */
function crescent(x, y, r) {
  crescentCount += 1;
  const id = `moon${crescentCount}`;
  return `<defs><mask id="${id}"><rect width="${W}" height="${H}" fill="#fff"/><circle cx="${x + r * 0.45}" cy="${y - r * 0.2}" r="${r * 0.9}" fill="#000"/></mask></defs><circle cx="${x}" cy="${y}" r="${r * 2}" fill="#fff8dc" opacity="0.12"/><circle cx="${x}" cy="${y}" r="${r}" fill="#fff4c2" mask="url(#${id})"/>`;
}

/** The Ka'bah: a dark cloth-covered cube seen from a corner, plain (no later gold band), its door raised up. */
function kaaba(cx, base, size) {
  const front = size;
  const side = size * 0.62;
  const h = size * 1.02;
  const top = base - h;
  let s = `<ellipse cx="${cx + side * 0.2}" cy="${base + 4}" rx="${(front + side) * 0.62}" ry="${size * 0.09}" fill="#000" opacity="0.18"/>`;
  s += `<path d="M${cx - front / 2},${base} L${cx - front / 2},${top} L${cx + front / 2},${top} L${cx + front / 2},${base} Z" fill="#23201f"/>`;
  s += `<path d="M${cx + front / 2},${base} L${cx + front / 2},${top} L${cx + front / 2 + side},${top - side * 0.3} L${cx + front / 2 + side},${base - side * 0.3} Z" fill="#161414"/>`;
  s += `<path d="M${cx - front / 2},${top} L${cx - front / 2 + side},${top - side * 0.3} L${cx + front / 2 + side},${top - side * 0.3} L${cx + front / 2},${top} Z" fill="#3a3533"/>`;
  // folds in the cloth
  for (let i = 1; i < 6; i += 1) {
    const x = cx - front / 2 + (front / 6) * i;
    s += `<path d="M${x},${top + 3} L${x},${base - 2}" stroke="#2f2b29" stroke-width="2"/>`;
  }
  // the raised door
  const dw = front * 0.18;
  s += `<rect x="${cx + front * 0.12}" y="${base - h * 0.62}" width="${dw}" height="${h * 0.4}" rx="2" fill="#4a3b2a"/>`;
  // a low stone plinth (the shadharwan) along the front
  s += `<rect x="${cx - front / 2 - 3}" y="${base - 7}" width="${front + 6}" height="9" fill="#9a8a78"/>`;
  s += `<path d="M${cx + front / 2 + 3},${base - 7} L${cx + front / 2 + side + 3},${base - side * 0.3 - 7} L${cx + front / 2 + side + 3},${base - side * 0.3 + 2} L${cx + front / 2 + 3},${base + 2} Z" fill="#857664"/>`;
  return s;
}

/** A simple well: a ring of stones, a wooden frame and a leather bucket on a rope. */
function well(cx, base, size) {
  const r = size;
  let s = `<ellipse cx="${cx}" cy="${base + 6}" rx="${r * 1.35}" ry="${r * 0.32}" fill="#000" opacity="0.15"/>`;
  s += `<path d="M${cx - r},${base - r * 0.55} L${cx - r},${base} Q${cx},${base + r * 0.4} ${cx + r},${base} L${cx + r},${base - r * 0.55} Z" fill="#a08566"/>`;
  const rr = rng(7);
  for (let row = 0; row < 3; row += 1) {
    for (let i = 0; i < 7; i += 1) {
      const x = cx - r + (i + (row % 2) * 0.5) * (2 * r / 7);
      const y = base - r * 0.5 + row * r * 0.19;
      if (x + r * 0.26 > cx + r) continue;
      s += `<rect x="${x + 1}" y="${y}" width="${r * 0.26}" height="${r * 0.16}" rx="3" fill="${shade("#b39572", (rr() - 0.5) * 0.25)}"/>`;
    }
  }
  s += `<ellipse cx="${cx}" cy="${base - r * 0.55}" rx="${r}" ry="${r * 0.28}" fill="#c4a883"/><ellipse cx="${cx}" cy="${base - r * 0.53}" rx="${r * 0.78}" ry="${r * 0.19}" fill="#2a2420"/>`;
  s += `<ellipse cx="${cx}" cy="${base - r * 0.51}" rx="${r * 0.5}" ry="${r * 0.08}" fill="#4f7f96" opacity="0.8"/>`;
  // frame
  s += `<rect x="${cx - r * 0.95}" y="${base - r * 1.75}" width="${r * 0.12}" height="${r * 1.25}" fill="#7a5530"/><rect x="${cx + r * 0.83}" y="${base - r * 1.75}" width="${r * 0.12}" height="${r * 1.25}" fill="#6b4a29"/>`;
  s += `<rect x="${cx - r * 1.02}" y="${base - r * 1.82}" width="${r * 2.04}" height="${r * 0.13}" rx="3" fill="#8a6239"/>`;
  s += `<path d="M${cx},${base - r * 1.7} L${cx},${base - r * 0.98}" stroke="#d9c39a" stroke-width="2.5"/>`;
  s += `<path d="M${cx - r * 0.16},${base - r * 1.0} L${cx + r * 0.16},${base - r * 1.0} L${cx + r * 0.12},${base - r * 0.72} L${cx - r * 0.12},${base - r * 0.72} Z" fill="#6b3f22"/>`;
  return s;
}

/** An old-style tent of woven goat hair: a dark sloped roof on poles. */
function tent(x, base, w, fill = "#6b5643", seed = 1) {
  const h = w * 0.42;
  const r = rng(seed);
  let s = `<ellipse cx="${x + w / 2}" cy="${base + 2}" rx="${w * 0.6}" ry="${w * 0.07}" fill="#000" opacity="0.15"/>`;
  s += `<path d="M${x},${base} L${x + w * 0.12},${base - h} Q${x + w * 0.5},${base - h - w * 0.12} ${x + w * 0.88},${base - h} L${x + w},${base} Z" fill="${fill}"/>`;
  for (let i = 1; i < 4; i += 1) s += `<path d="M${x + w * 0.1 + i * w * 0.2},${base - h - 2} L${x + w * 0.06 + i * w * 0.22},${base}" stroke="${shade(fill, -0.25)}" stroke-width="1.5" opacity="0.6"/>`;
  s += `<path d="M${x + w * 0.38},${base} L${x + w * 0.42},${base - h * 0.62} L${x + w * 0.6},${base - h * 0.62} L${x + w * 0.64},${base} Z" fill="${shade(fill, -0.45)}"/>`;
  if (r() > 0.5) s += `<path d="M${x + w},${base} L${x + w + w * 0.18},${base - h * 0.15}" stroke="#5a4636" stroke-width="1.5"/>`;
  return s;
}

/** A stone city wall with towers along a line. */
function cityWall(x0, x1, base, h, fill = "#cdb48f") {
  let s = `<rect x="${x0}" y="${base - h}" width="${x1 - x0}" height="${h}" fill="${fill}"/>`;
  for (let x = x0; x < x1; x += 14) s += `<rect x="${x}" y="${base - h - 7}" width="8" height="7" fill="${fill}"/>`;
  for (let x = x0 + 40; x < x1 - 20; x += 150) {
    s += `<rect x="${x}" y="${base - h - 26}" width="34" height="${h + 26}" fill="${shade(fill, -0.06)}"/>`;
    for (let k = 0; k < 3; k += 1) s += `<rect x="${x + k * 13}" y="${base - h - 33}" width="8" height="7" fill="${shade(fill, -0.06)}"/>`;
    s += `<rect x="${x + 14}" y="${base - h - 12}" width="5" height="10" fill="#6a5640"/>`;
  }
  for (let y = base - h + 8; y < base; y += 10) s += `<path d="M${x0},${y} L${x1},${y}" stroke="${shade(fill, -0.12)}" stroke-width="1" opacity="0.5"/>`;
  return s;
}

/** An olive tree: a twisted trunk and a silvery-green crown. */
const olive = (x, y, s = 1) =>
  `<path d="M${x - 4 * s},${y} Q${x - 8 * s},${y - 18 * s} ${x},${y - 30 * s} Q${x + 6 * s},${y - 16 * s} ${x + 4 * s},${y} Z" fill="#6f5a43"/>` +
  `<ellipse cx="${x}" cy="${y - 38 * s}" rx="${26 * s}" ry="${16 * s}" fill="#7f9a6a"/><ellipse cx="${x - 12 * s}" cy="${y - 44 * s}" rx="${14 * s}" ry="${10 * s}" fill="#93ad7d"/><ellipse cx="${x + 12 * s}" cy="${y - 42 * s}" rx="${13 * s}" ry="${9 * s}" fill="#6d8a5a"/>`;

/** Rows of houses, nearest last, seeded so the town looks the same each run. */
function town(rows, seed) {
  const r = rng(seed);
  let s = "";
  for (const row of rows) {
    let x = row.x0;
    while (x < row.x1) {
      const w = row.w[0] + r() * (row.w[1] - row.w[0]);
      const h = row.h[0] + r() * (row.h[1] - row.h[0]);
      if (!row.skip || !(x + w > row.skip[0] && x < row.skip[1])) {
        const tone = r();
        s += house(x, row.y + r() * 6, w, h, tone > 0.5 ? "#d7a466" : "#cf9a5c", tone > 0.5 ? "#b38049" : "#a97644", Math.floor(r() * 1000));
      }
      x += w + 2 + r() * row.gap;
    }
  }
  return s;
}

// ---------- the pictures ----------

const valleySand = "#e6c48c";

const PICTURES = {
  // Makkah: a dry valley ringed by dark mountains, houses close round the open space of the Ka'bah.
  makkah: () => {
    const back = [[0, 210], [90, 150], [170, 205], [260, 130], [350, 190], [430, 160], [520, 215], [610, 140], [700, 185], [790, 120], [880, 180], [960, 150], [1024, 200]];
    const mid = [[0, 300], [70, 250], [150, 290], [230, 240], [300, 300], [700, 300], [780, 230], [860, 270], [940, 225], [1024, 280]];
    return (
      sky("s", "#7fc4e8", "#f7e2b8") +
      sun(820, 95, 34) +
      cloud(200, 90, 1.1) +
      cloud(560, 70, 0.8, "#fff", 0.7) +
      rocks(back, "#9a7b67") +
      facets(back, "#ad8f78") +
      rocks(mid, "#6e564a") +
      facets(mid, "#806658") +
      `<path d="M0,340 Q512,300 1024,340 L1024,576 L0,576 Z" fill="${valleySand}"/>` +
      town([{ x0: 40, x1: 980, y: 352, w: [38, 70], h: [26, 46], gap: 6, skip: [400, 640] }], 11) +
      `<ellipse cx="512" cy="420" rx="210" ry="46" fill="#efd6a6"/>` +
      kaaba(490, 428, 90) +
      town([{ x0: -20, x1: 1040, y: 520, w: [70, 120], h: [50, 90], gap: 8, skip: [330, 690] }], 23) +
      pebbles(300, 720, 470, 560, 40, 5)
    );
  },

  // The Ka'bah up close in its open sandy square, low houses round it and the mountains behind.
  kaaba: () => {
    const back = [[0, 240], [120, 160], [230, 225], [330, 150], [430, 210], [600, 200], [700, 140], [820, 205], [930, 165], [1024, 225]];
    return (
      sky("s", "#86c8ea", "#f8e6c2") +
      sun(180, 90, 30) +
      cloud(780, 80, 1) +
      rocks(back, "#7a6152") +
      facets(back, "#8f7564") +
      `<path d="M0,330 L1024,330 L1024,576 L0,576 Z" fill="${valleySand}"/>` +
      town([{ x0: -10, x1: 1040, y: 345, w: [50, 90], h: [40, 70], gap: 5 }], 31) +
      `<ellipse cx="512" cy="470" rx="420" ry="80" fill="#f0d9ab"/>` +
      kaaba(470, 470, 168) +
      pebbles(60, 980, 480, 570, 60, 9)
    );
  },

  // Madinah: an oasis of date palms, low mud-brick homes, black lava fields and Mount Uhud to the north.
  madinah: () => {
    const uhud = [[380, 330], [430, 250], [500, 205], [560, 230], [640, 190], [720, 235], [800, 260], [880, 330]];
    return (
      sky("s", "#8fd0ee", "#fbeacb") +
      sun(150, 100, 32) +
      cloud(860, 90, 1.05) +
      cloud(430, 60, 0.7, "#fff", 0.7) +
      ridge([[0, 300], [180, 270], [360, 300], [1024, 290]], "#c9a882") +
      rocks(uhud, "#a7684a") +
      facets(uhud, "#bb7d5c") +
      `<path d="M0,330 Q512,305 1024,330 L1024,576 L0,576 Z" fill="#dcc08e"/>` +
      // the black lava fields (harrah) at the edges
      `<path d="M0,345 Q120,330 260,352 Q170,380 0,392 Z" fill="#4b4441"/>` +
      `<path d="M1024,350 Q900,335 780,358 Q880,388 1024,400 Z" fill="#4b4441"/>` +
      pebbles(0, 240, 345, 390, 30, 3, ["#3a3431", "#5c5450"]) +
      pebbles(800, 1024, 350, 398, 30, 4, ["#3a3431", "#5c5450"]) +
      [140, 230, 330, 690, 780, 880, 960].map((x, i) => palm(x, 372 + (i % 2) * 6, 82 + (i % 3) * 10, (i % 2 ? 1 : -1) * 8, 40 + i)).join("") +
      town([{ x0: 250, x1: 760, y: 400, w: [40, 64], h: [26, 40], gap: 8 }], 51) +
      [60, 170, 290, 420, 560, 640, 760, 900, 990].map((x, i) => palm(x, 470 + (i % 3) * 10, 120 + (i % 4) * 14, (i % 2 ? 1 : -1) * 12, 70 + i)).join("") +
      town([{ x0: 100, x1: 980, y: 545, w: [80, 130], h: [56, 84], gap: 40, skip: [380, 600] }], 61) +
      bush(470, 560, 22) +
      bush(560, 566, 16)
    );
  },

  // Mount an-Nur at dusk: a steep rocky peak, the cave a dark mouth near the top, the first stars out.
  hira: () => {
    const peak = [[170, 576], [300, 360], [380, 300], [440, 210], [500, 130], [540, 150], [600, 230], [680, 300], [760, 380], [880, 576]];
    return (
      sky("s", "#2b3a6b", "#f2a96b") +
      stars(70, 12, 260) +
      crescent(830, 110, 26, "#3a4875") +
      rocks([[0, 420], [100, 380], [190, 430], [260, 576]], "#5b4652") +
      rocks([[740, 576], [840, 400], [930, 360], [1024, 410]], "#5b4652") +
      rocks(peak, "#6b4f4a") +
      facets(peak, "#86625a") +
      `<path d="M520,182 q12,-12 26,0 l4,20 q-17,6 -32,0 Z" fill="#1d1416"/>` +
      `<path d="M0,500 Q512,470 1024,500 L1024,576 L0,576 Z" fill="#7a5a52"/>` +
      pebbles(0, 1024, 505, 570, 50, 13, ["#5d4540", "#8a6a60"])
    );
  },

  // Mount Uhud: a long red mountain, the small hill in front of it, palms at its feet.
  uhud: () => {
    const uhud = [[0, 300], [80, 250], [170, 200], [250, 225], [330, 170], [420, 215], [520, 160], [610, 210], [700, 180], [790, 230], [880, 205], [960, 250], [1024, 240]];
    return (
      sky("s", "#7dc2ea", "#fbe7c4") +
      sun(880, 80, 30) +
      cloud(260, 90, 1.1) +
      rocks(uhud, "#a35f42") +
      facets(uhud, "#bd7656") +
      `<path d="M0,360 Q512,330 1024,360 L1024,576 L0,576 Z" fill="#dcc08e"/>` +
      ridge([[300, 430], [420, 372], [520, 362], [640, 430]], "#b08a62", 440) +
      [70, 150, 820, 900, 980].map((x, i) => palm(x, 390, 90 + (i % 2) * 14, (i % 2 ? 1 : -1) * 8, 90 + i)).join("") +
      `<path d="M0,440 Q512,420 1024,440 L1024,576 L0,576 Z" fill="#e3c899"/>` +
      bush(120, 500, 26) +
      bush(860, 520, 30) +
      pebbles(0, 1024, 450, 570, 70, 17)
    );
  },

  // Zamzam long ago: a stone well in the dry valley, with a frame, a rope and a bucket.
  zamzam: () => {
    const back = [[0, 260], [140, 170], [260, 240], [380, 190], [520, 250], [640, 170], [760, 230], [900, 160], [1024, 230]];
    return (
      sky("s", "#8ccbec", "#f8e5bf") +
      sun(140, 90, 30) +
      cloud(700, 80, 1) +
      rocks(back, "#7d6455") +
      facets(back, "#937867") +
      `<path d="M0,350 Q512,320 1024,350 L1024,576 L0,576 Z" fill="${valleySand}"/>` +
      town([{ x0: 40, x1: 360, y: 368, w: [40, 60], h: [24, 36], gap: 30 }, { x0: 680, x1: 1000, y: 372, w: [40, 60], h: [24, 36], gap: 30 }], 71) +
      `<ellipse cx="512" cy="500" rx="300" ry="54" fill="#efd5a3"/>` +
      well(512, 498, 110) +
      pebbles(100, 920, 470, 570, 50, 19)
    );
  },

  // Safa and Marwah: two small rocky hills, the open valley floor between them.
  "safa-marwa": () => {
    const back = [[0, 230], [160, 160], [300, 220], [440, 170], [600, 230], [760, 160], [900, 210], [1024, 180]];
    const safa = [[20, 576], [80, 380], [150, 330], [230, 345], [300, 400], [360, 576]];
    const marwa = [[660, 576], [720, 410], [800, 350], [880, 340], [950, 395], [1010, 576]];
    return (
      sky("s", "#86c8ea", "#f9e7c3") +
      sun(512, 90, 32) +
      cloud(260, 70, 0.9) +
      cloud(800, 95, 0.9, "#fff", 0.75) +
      rocks(back, "#8a6e5c") +
      facets(back, "#a2846f") +
      `<path d="M0,380 Q512,350 1024,380 L1024,576 L0,576 Z" fill="${valleySand}"/>` +
      `<path d="M330,500 Q512,470 690,500 L690,530 Q512,505 330,530 Z" fill="#f2dcb0"/>` +
      rocks(safa, "#8f705e") +
      facets(safa, "#a88a75") +
      rocks(marwa, "#8a6b5a") +
      facets(marwa, "#a3846f") +
      pebbles(340, 690, 520, 570, 40, 21)
    );
  },

  // The plain of Arafah: wide open ground, the small rocky Mount of Mercy, mountains far off.
  arafah: () => {
    const back = [[0, 260], [180, 200], [360, 250], [520, 190], [700, 245], [880, 195], [1024, 240]];
    const hill = [[360, 420], [420, 340], [470, 300], [520, 290], [570, 305], [630, 350], [690, 420]];
    return (
      sky("s", "#7fc4ea", "#fbe9c6") +
      sun(840, 90, 34) +
      cloud(200, 80, 1.1) +
      ridge(back, "#b49272") +
      `<path d="M0,330 Q512,310 1024,330 L1024,576 L0,576 Z" fill="#e2c592"/>` +
      rocks(hill, "#8c6f5b", 430) +
      facets(hill, "#a88a74") +
      `<path d="M0,420 Q512,400 1024,420 L1024,576 L0,576 Z" fill="#e8cd9c"/>` +
      bush(140, 470, 24) +
      bush(300, 520, 18) +
      bush(820, 480, 26) +
      bush(950, 540, 20) +
      pebbles(0, 1024, 440, 570, 60, 23)
    );
  },

  // Mina: a narrow valley between mountains, with simple tents of woven hair.
  mina: () => {
    const left = [[0, 180], [90, 150], [180, 210], [280, 260], [360, 330], [420, 576]];
    const right = [[600, 576], [680, 320], [770, 250], [860, 200], [950, 160], [1024, 190]];
    return (
      sky("s", "#82c6ea", "#f9e6c2") +
      sun(512, 110, 30) +
      cloud(640, 70, 0.9) +
      ridge([[200, 300], [400, 240], [620, 250], [820, 300]], "#b3906f") +
      `<path d="M0,360 Q512,330 1024,360 L1024,576 L0,576 Z" fill="${valleySand}"/>` +
      rocks(left, "#7b6050") +
      facets(left, "#917564") +
      rocks(right, "#77604f") +
      facets(right, "#8d7462") +
      [[330, 400, 70], [430, 392, 60], [520, 398, 66], [610, 404, 62], [380, 455, 96], [520, 462, 104], [650, 450, 92], [250, 520, 120], [700, 528, 128]]
        .map(([x, y, w], i) => tent(x - w / 2, y, w, ["#6b5643", "#7a6450", "#5e4a3a"][i % 3], i + 1))
        .join("") +
      pebbles(150, 900, 540, 572, 30, 29)
    );
  },

  // Muzdalifah at night: the open plain under the stars, pebbles on the ground.
  muzdalifah: () => {
    const back = [[0, 330], [160, 280], [320, 320], [480, 270], [660, 330], [820, 280], [1024, 320]];
    return (
      sky("s", "#0f1b3d", "#3c3f6e") +
      stars(140, 31, 330) +
      crescent(220, 110, 30, "#16224a") +
      ridge(back, "#2b2c4a") +
      `<path d="M0,400 Q512,380 1024,400 L1024,576 L0,576 Z" fill="#4a4560"/>` +
      `<ellipse cx="512" cy="520" rx="420" ry="60" fill="#55506c"/>` +
      pebbles(60, 960, 470, 570, 120, 37, ["#7d7894", "#9a95ad", "#68637f"]) +
      bush(150, 450, 20, "#3e4a3a") +
      bush(880, 460, 24, "#3e4a3a")
    );
  },

  // Ta'if: cooler green mountains, terraced fields and orchards, stone-walled farms.
  taif: () => {
    const back = [[0, 200], [140, 130], [280, 190], [420, 120], [560, 180], [700, 110], [860, 170], [1024, 130]];
    const mid = [[0, 300], [200, 230], [420, 290], [640, 220], [860, 280], [1024, 240]];
    let terraces = "";
    for (let i = 0; i < 6; i += 1) {
      const y = 330 + i * 40;
      terraces += `<path d="M0,${y} Q512,${y - 24} 1024,${y} L1024,${y + 40} Q512,${y + 16} 0,${y + 40} Z" fill="${["#9cb86a", "#8aa95c", "#a7c177"][i % 3]}"/>`;
      terraces += `<path d="M0,${y} Q512,${y - 24} 1024,${y}" stroke="#7a6a52" stroke-width="3" fill="none"/>`;
    }
    const r = rng(41);
    let trees = "";
    for (let i = 0; i < 26; i += 1) {
      const x = r() * W;
      const y = 350 + Math.floor(r() * 5) * 40 + 20;
      trees += `<ellipse cx="${x}" cy="${y}" rx="16" ry="12" fill="${r() > 0.5 ? "#4f7d3a" : "#5e8c44"}"/><circle cx="${x - 5}" cy="${y - 2}" r="2.5" fill="#c0392b" opacity="${r() > 0.5 ? 0.9 : 0}"/>`;
    }
    return (
      sky("s", "#9fd3ee", "#eef3d6") +
      sun(880, 80, 28) +
      cloud(300, 80, 1.1) +
      cloud(620, 60, 0.8, "#fff", 0.8) +
      ridge(back, "#8a9a7a") +
      ridge(mid, "#6f8c58") +
      terraces +
      trees +
      house(160, 400, 60, 34, "#cbb08a", "#a98f6b", 3) +
      house(760, 440, 70, 38, "#cbb08a", "#a98f6b", 4)
    );
  },

  // Old Jerusalem: a walled city of stone on its hills, olive trees outside the walls.
  jerusalem: () => {
    const hills = [[0, 300], [200, 250], [420, 280], [640, 230], [860, 270], [1024, 250]];
    return (
      sky("s", "#88c6ea", "#f7ecd2") +
      sun(160, 90, 30) +
      cloud(760, 80, 1) +
      ridge(hills, "#b7a582") +
      `<path d="M0,330 Q512,300 1024,330 L1024,576 L0,576 Z" fill="#cdb98f"/>` +
      town([{ x0: 140, x1: 900, y: 330, w: [36, 64], h: [30, 56], gap: 3 }], 81).replaceAll("#d7a466", "#e2d2b0").replaceAll("#cf9a5c", "#d8c6a0").replaceAll("#b38049", "#bfa982").replaceAll("#a97644", "#b39e78") +
      cityWall(100, 940, 400, 58, "#b89a6c") +
      `<path d="M0,410 Q512,392 1024,410 L1024,576 L0,576 Z" fill="#c2ad7f"/>` +
      [80, 200, 330, 700, 840, 960].map((x, i) => olive(x, 500 + (i % 2) * 24, 1.1 + (i % 3) * 0.15)).join("") +
      pebbles(0, 1024, 520, 572, 40, 43)
    );
  },
  // ---- Things the Quran and the hadith describe, drawn only to help a learner picture them (never a person or an
  // angel). The unseen ones (the bridge, the scales, the Pool, the gardens) say they are only a drawing.

  // The bridge over Jahannam: a thin bridge across a dark gulf with fire far below, light at the far side.
  sirat: () => {
    const r = rng(101);
    let hooks = "";
    for (let x = 90; x < 940; x += 46) {
      const y = 300 + Math.sin((x / 1024) * Math.PI) * -18;
      hooks += `<path d="M${x},${y + 4} l0,${22 + r() * 16} q0,10 -9,8" stroke="#7a6e6a" stroke-width="3" fill="none"/>`;
    }
    return (
      sky("s", "#0d0b1a", "#3a1f2a") +
      stars(60, 103, 200) +
      `<defs><radialGradient id="fire" cx="0.5" cy="1" r="0.8"><stop offset="0" stop-color="#ff7a1a"/><stop offset="0.45" stop-color="#9c2a12"/><stop offset="1" stop-color="#1a0b10" stop-opacity="0"/></radialGradient>` +
      `<radialGradient id="glow" cx="1" cy="0.45" r="0.6"><stop offset="0" stop-color="#e9ffd9"/><stop offset="0.5" stop-color="#9fe0a0" stop-opacity="0.5"/><stop offset="1" stop-color="#9fe0a0" stop-opacity="0"/></radialGradient></defs>` +
      `<rect x="0" y="300" width="${W}" height="276" fill="url(#fire)"/>` +
      `<rect x="560" y="80" width="464" height="420" fill="url(#glow)"/>` +
      rocks([[0, 250], [40, 260], [80, 330], [110, 576]], "#241720") +
      rocks([[930, 576], [960, 330], [1000, 270], [1024, 260]], "#2c3a2c") +
      `<path d="M60,300 Q512,262 980,290" stroke="#c9c1b8" stroke-width="4" fill="none"/>` +
      `<path d="M60,306 Q512,268 980,296" stroke="#5e5550" stroke-width="2" fill="none"/>` +
      hooks
    );
  },

  // The scales: a great balance under the night sky, its two pans level.
  scales: () => {
    const cx = 512;
    return (
      sky("s", "#141a3a", "#4a4a78") +
      stars(110, 107, 330) +
      `<path d="M0,470 Q512,440 1024,470 L1024,576 L0,576 Z" fill="#2b2f4f"/>` +
      `<rect x="${cx - 8}" y="150" width="16" height="300" fill="#d9b45a"/>` +
      `<path d="M${cx - 70},460 L${cx + 70},460 L${cx + 40},440 L${cx - 40},440 Z" fill="#c9a24a"/>` +
      `<rect x="${cx - 260}" y="160" width="520" height="12" rx="6" fill="#e3c06a"/>` +
      `<circle cx="${cx}" cy="150" r="18" fill="#f1d27a"/>` +
      [cx - 250, cx + 250].map((x) => `<path d="M${x},172 L${x - 70},330 M${x},172 L${x + 70},330" stroke="#e8d7a8" stroke-width="2.5"/><path d="M${x - 90},330 Q${x},380 ${x + 90},330 Z" fill="#d9b45a"/><path d="M${x - 90},330 L${x + 90},330" stroke="#f1d27a" stroke-width="4"/>`).join("")
    );
  },

  // The Pool: wide still water under the stars, with cups along its edge.
  pool: () => {
    const r = rng(109);
    let cups = "";
    for (let i = 0; i < 22; i += 1) {
      const x = 80 + i * 41 + r() * 8;
      const y = 470 + (i % 2) * 22;
      cups += `<path d="M${x - 9},${y - 16} L${x + 9},${y - 16} L${x + 6},${y} L${x - 6},${y} Z" fill="#e9eef7"/><ellipse cx="${x}" cy="${y - 16}" rx="9" ry="3" fill="#bfd0ea"/>`;
    }
    return (
      sky("s", "#0f1d44", "#3d5a8f") +
      stars(150, 111, 300) +
      `<path d="M0,330 Q512,300 1024,330 L1024,576 L0,576 Z" fill="#d7c9a6"/>` +
      `<ellipse cx="512" cy="400" rx="470" ry="70" fill="#f4f8ff"/>` +
      `<ellipse cx="512" cy="398" rx="440" ry="58" fill="#e4eefc"/>` +
      `<ellipse cx="420" cy="392" rx="160" ry="10" fill="#ffffff" opacity="0.8"/>` +
      cups
    );
  },

  // Gardens with rivers under trees: only a picture; no eye has seen what Allah has made ready.
  garden: () => {
    const r = rng(113);
    let trees = "";
    for (let i = 0; i < 16; i += 1) {
      const x = r() * W;
      const y = 300 + r() * 160;
      const s = 26 + r() * 22;
      trees += `<rect x="${x - 3}" y="${y}" width="6" height="${s}" fill="#7a5a36"/><ellipse cx="${x}" cy="${y}" rx="${s}" ry="${s * 0.7}" fill="${r() > 0.5 ? "#3f9a4f" : "#57b05e"}"/><circle cx="${x - s * 0.3}" cy="${y - 4}" r="3" fill="#f2c94c" opacity="${r() > 0.4 ? 1 : 0}"/>`;
    }
    return (
      sky("s", "#9fdcf5", "#f4fbe9") +
      sun(820, 90, 30) +
      cloud(260, 90, 1.1) +
      ridge([[0, 270], [200, 220], [420, 250], [640, 200], [860, 240], [1024, 220]], "#8fcf86") +
      `<path d="M0,300 Q512,270 1024,300 L1024,576 L0,576 Z" fill="#7cc46f"/>` +
      `<path d="M470,300 Q440,400 330,576 L560,576 Q520,420 540,300 Z" fill="#8fd3f0"/>` +
      `<path d="M500,330 Q480,420 420,560" stroke="#ffffff" stroke-width="4" opacity="0.6" fill="none"/>` +
      trees +
      [80, 160, 880, 960].map((x, i) => palm(x, 560, 150 + (i % 2) * 20, (i % 2 ? 1 : -1) * 10, 115 + i)).join("")
    );
  },

  // A grave in the desert: a low mound with two plain stones, under a quiet evening sky.
  grave: () =>
    sky("s", "#2a3560", "#e7a77a") +
    crescent(820, 110, 24) +
    ridge([[0, 330], [240, 290], [520, 320], [780, 280], [1024, 320]], "#6e5a6a") +
    `<path d="M0,380 Q512,350 1024,380 L1024,576 L0,576 Z" fill="#c9a77e"/>` +
    `<ellipse cx="512" cy="470" rx="190" ry="34" fill="#b08e66"/>` +
    `<ellipse cx="512" cy="462" rx="170" ry="24" fill="#bf9c72"/>` +
    `<path d="M312,470 l0,-46 q8,-10 16,0 l0,46 Z" fill="#8c7b6b"/><path d="M696,470 l0,-36 q8,-8 16,0 l0,36 Z" fill="#8c7b6b"/>` +
    pebbles(330, 700, 440, 490, 40, 117, ["#9c8164", "#d2b48c"]) +
    bush(150, 470, 22, "#6f7a45") +
    bush(880, 490, 26, "#6f7a45"),

  // The sun coming up in the west: a sun rising over the desert at the wrong side of the day.
  "sun-west": () =>
    sky("s", "#3b2a5a", "#f2a65a") +
    sun(512, 330, 54, "#ffd36a", "#ffe9b0") +
    ridge([[0, 360], [200, 330], [420, 350], [640, 320], [860, 350], [1024, 330]], "#5a3d4a") +
    `<path d="M0,400 Q512,380 1024,400 L1024,576 L0,576 Z" fill="#8a5a4a"/>` +
    `<path d="M0,470 Q512,450 1024,470 L1024,576 L0,576 Z" fill="#a46c52"/>` +
    pebbles(0, 1024, 480, 570, 50, 119, ["#7a4c3d", "#b47c60"]),

  // Nuh's Ark: a great wooden ship riding high waves under the rain.
  ark: () => {
    let rain = "";
    const r = rng(121);
    for (let i = 0; i < 160; i += 1) {
      const x = r() * W;
      const y = r() * 420;
      rain += `<path d="M${x},${y} l-6,18" stroke="#c9d6e8" stroke-width="1.5" opacity="0.6"/>`;
    }
    const wave = (y, fill, amp, seed) => {
      const rr = rng(seed);
      let d = `M0,${H} L0,${y}`;
      for (let x = 0; x <= W; x += 64) d += ` Q${x + 32},${y - amp - rr() * amp} ${x + 64},${y}`;
      return `<path d="${d} L${W},${H} Z" fill="${fill}"/>`;
    };
    return (
      sky("s", "#3c4a5e", "#7d8c9e") +
      cloud(200, 80, 2, "#5a6a80", 0.9) +
      cloud(700, 60, 2.4, "#55657a", 0.9) +
      rain +
      wave(400, "#33546e", 26, 123) +
      `<path d="M250,360 L780,360 L720,440 L310,440 Z" fill="#7a5130"/>` +
      `<path d="M250,360 L780,360 L770,372 L260,372 Z" fill="#9a6a40"/>` +
      [300, 380, 460, 540, 620, 700].map((x) => `<path d="M${x},372 L${x + 6},440" stroke="#5e3d22" stroke-width="3"/>`).join("") +
      `<rect x="360" y="300" width="300" height="60" fill="#8a5c36"/><path d="M340,300 L680,300 L640,268 L380,268 Z" fill="#6b4528"/>` +
      [400, 470, 540, 610].map((x) => `<rect x="${x}" y="318" width="22" height="16" fill="#3b2614"/>`).join("") +
      wave(450, "#2a4760", 22, 125) +
      wave(510, "#213b52", 18, 127)
    );
  },

  // The sea split for Musa: two walls of water and a dry path of sand between them.
  "sea-split": () =>
    sky("s", "#7fb8e0", "#f3e2c0") +
    sun(860, 80, 28) +
    `<path d="M0,250 L1024,250 L1024,576 L0,576 Z" fill="#e2c592"/>` +
    `<path d="M0,250 L440,250 Q400,420 470,576 L0,576 Z" fill="#2f6f9a"/>` +
    `<path d="M1024,250 L584,250 Q624,420 554,576 L1024,576 Z" fill="#2f6f9a"/>` +
    `<path d="M440,250 Q400,420 470,576 L440,576 Q372,420 412,250 Z" fill="#5fa3cf"/>` +
    `<path d="M584,250 Q624,420 554,576 L584,576 Q652,420 612,250 Z" fill="#5fa3cf"/>` +
    `<path d="M0,250 Q220,232 440,250 M584,250 Q804,232 1024,250" stroke="#d9eef9" stroke-width="5" fill="none"/>` +
    pebbles(460, 570, 300, 570, 40, 129, ["#c9a877", "#b8955f"]),

  // The big fish in the dark sea at night: Yunus's three darknesses.
  "big-fish": () =>
    sky("s", "#050a1c", "#0b2747") +
    stars(40, 131, 140) +
    crescent(160, 80, 20) +
    `<path d="M0,170 Q256,160 512,172 Q768,184 1024,170 L1024,576 L0,576 Z" fill="#0d3354"/>` +
    `<path d="M0,250 L1024,250 L1024,576 L0,576 Z" fill="#082440" opacity="0.8"/>` +
    `<path d="M220,380 Q400,250 650,320 Q760,350 800,380 Q760,410 650,430 Q400,500 220,380 Z" fill="#3b5d7a"/>` +
    `<path d="M800,380 L900,320 L880,380 L900,440 Z" fill="#33536e"/>` +
    `<path d="M240,392 Q420,470 650,420" stroke="#6f93b0" stroke-width="3" fill="none"/>` +
    `<circle cx="300" cy="360" r="7" fill="#d9e6f2"/>` +
    [[340, 220], [420, 190], [380, 150]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="6" fill="none" stroke="#8fb3d1" stroke-width="2"/>`).join(""),

  // A desert well with stone troughs, where shepherds water their flocks (Yusuf's well, the well of Madyan).
  "desert-well": () => {
    const back = [[0, 280], [180, 220], [360, 260], [560, 210], [760, 250], [1024, 220]];
    return (
      sky("s", "#86c8ea", "#f9e7c3") +
      sun(820, 90, 30) +
      cloud(260, 80, 1) +
      ridge(back, "#b8946e") +
      `<path d="M0,360 Q512,330 1024,360 L1024,576 L0,576 Z" fill="${valleySand}"/>` +
      well(470, 470, 100) +
      `<rect x="640" y="452" width="200" height="26" rx="6" fill="#9a8466"/><rect x="650" y="456" width="180" height="10" fill="#6fa6c9"/>` +
      [[160, 470], [250, 500], [900, 490]].map(([x, y], i) => `<ellipse cx="${x}" cy="${y}" rx="34" ry="22" fill="#f4efe4"/><circle cx="${x + (i % 2 ? -34 : 34)}" cy="${y - 10}" r="12" fill="#3f3a36"/><rect x="${x - 20}" y="${y + 16}" width="5" height="16" fill="#3f3a36"/><rect x="${x + 14}" y="${y + 16}" width="5" height="16" fill="#3f3a36"/>`).join("") +
      pebbles(0, 1024, 480, 570, 40, 133)
    );
  },

  // The valley of the ants: a big ant hill on the ground, close up.
  ants: () => {
    const r = rng(137);
    let ants = "";
    for (let i = 0; i < 26; i += 1) {
      const x = 120 + r() * 800;
      const y = 430 + r() * 120;
      const a = r() * 360;
      ants += `<g transform="translate(${x.toFixed(0)},${y.toFixed(0)}) rotate(${a.toFixed(0)})"><ellipse cx="-9" cy="0" rx="6" ry="4.5" fill="#2a1c14"/><circle cx="0" cy="0" r="3.5" fill="#2a1c14"/><circle cx="7" cy="0" r="4" fill="#2a1c14"/><path d="M-2,-3 l-3,-7 M2,-3 l3,-7 M-2,3 l-3,7 M2,3 l3,7 M0,-3 l0,-8 M0,3 l0,8" stroke="#2a1c14" stroke-width="1.4"/></g>`;
    }
    return (
      sky("s", "#9fd3ee", "#f3ecd0") +
      sun(860, 80, 28) +
      ridge([[0, 260], [260, 210], [520, 250], [780, 200], [1024, 240]], "#b2a07a") +
      `<path d="M0,330 Q512,300 1024,330 L1024,576 L0,576 Z" fill="#d8b98a"/>` +
      `<path d="M380,440 Q512,330 644,440 Z" fill="#b58c5e"/><ellipse cx="512" cy="372" rx="14" ry="7" fill="#3b2a1c"/>` +
      bush(140, 420, 34, "#7c9a45") +
      bush(900, 430, 30, "#7c9a45") +
      ants
    );
  },

  // The Nile long ago: a wide river with reeds and palms, and a little basket floating on it.
  nile: () =>
    sky("s", "#8fd0f0", "#f8ecc8") +
    sun(180, 90, 30) +
    cloud(700, 80, 1) +
    `<path d="M0,280 Q512,250 1024,280 L1024,576 L0,576 Z" fill="#cdb27a"/>` +
    `<path d="M0,340 Q512,310 1024,340 L1024,500 Q512,470 0,500 Z" fill="#3f8fb8"/>` +
    `<path d="M120,380 Q512,360 900,390" stroke="#9fd0ec" stroke-width="3" fill="none" opacity="0.7"/>` +
    `<path d="M470,420 Q512,440 554,420 L548,404 L476,404 Z" fill="#b8874a"/><path d="M476,404 Q512,386 548,404" fill="#d2a364"/>` +
    [60, 140, 860, 950].map((x, i) => palm(x, 320, 110 + (i % 2) * 18, (i % 2 ? 1 : -1) * 8, 139 + i)).join("") +
    Array.from({ length: 24 }, (_, i) => `<path d="M${40 + i * 42},500 l${(i % 3) - 1 * 4},-${30 + (i % 4) * 8}" stroke="#5f8a3a" stroke-width="3"/>`).join(""),

  // The sands of al-Ahqaf, the land of 'Ad: tall dunes blown by a strong wind.
  ahqaf: () =>
    sky("s", "#c99a6a", "#f2d6a8") +
    sun(820, 110, 26, "#fff0c0", "#ffe7b5") +
    ridge([[0, 300], [180, 220], [400, 280], [620, 200], [840, 270], [1024, 230]], "#d39a5c") +
    ridge([[0, 400], [260, 320], [520, 390], [760, 330], [1024, 380]], "#c4874a") +
    `<path d="M0,470 Q512,430 1024,470 L1024,576 L0,576 Z" fill="#dba468"/>` +
    Array.from({ length: 10 }, (_, i) => `<path d="M${-40 + i * 40},${140 + i * 30} Q${300 + i * 20},${120 + i * 30} ${700 + i * 30},${160 + i * 30}" stroke="#fbe6c4" stroke-width="3" opacity="0.5" fill="none"/>`).join("")
};

const svgOf = (id) => `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">${PICTURES[id]()}</svg>`;

async function main() {
  const { chromium } = require("playwright");
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: W, height: H } });
  const outDir = path.join(ROOT, "assets/pictures");
  mkdirSync(outDir, { recursive: true });
  for (const id of Object.keys(PICTURES)) {
    await page.setContent(`<html><body style="margin:0">${svgOf(id)}</body></html>`);
    await page.screenshot({ path: path.join(outDir, `${id}.jpg`), type: "jpeg", quality: 82, clip: { x: 0, y: 0, width: W, height: H } });
    console.log(`drew ${id}`);
  }
  if (process.argv.includes("--sheet")) {
    const ids = Object.keys(PICTURES);
    const cells = ids.map((id) => `<div style="position:relative">${svgOf(id).replace(`width="${W}" height="${H}"`, 'width="340" height="191"')}<span style="position:absolute;left:4px;top:2px;font:bold 12px sans-serif;background:#fff8">${id}</span></div>`).join("");
    await page.setViewportSize({ width: 1032, height: 200 * Math.ceil(ids.length / 3) });
    await page.setContent(`<html><body style="margin:0;display:grid;grid-template-columns:repeat(3,344px);gap:0">${cells}</body></html>`);
    await page.screenshot({ path: "/tmp/drawn-sheet.png", fullPage: true });
  }
  await browser.close();
}

export const DRAWN_PICTURE_IDS = Object.keys(PICTURES);

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  await main();
}
