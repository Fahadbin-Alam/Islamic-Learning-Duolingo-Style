// Draws the "long ago" lesson pictures: Makkah, the Ka'bah, Madinah and the places around them as they looked in
// the early years of Islam (no towers, cranes, lamps, roads or crowds), from what the seerah books describe:
// a dry valley of dark mountains with flat-roofed houses round the Ka'bah, Madinah's date-palm groves and black
// lava fields with Uhud to the north, the open plains of Mina, Muzdalifah and Arafah. Only places: never a person.
//
//   node scripts/lesson-pictures/draw.mjs            writes assets/pictures/<id>.jpg (1024x576)
//   node scripts/lesson-pictures/draw.mjs --sheet    also writes /tmp/drawn-sheet.png to look them over
//   node scripts/lesson-pictures/draw.mjs --only=sirat,mizan   draws only those
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
  }
};

// ---------- what lessons teach (not places) ----------
// Things a lesson talks about, drawn simply so a learner can picture them: never a person or an animal that
// stands for one. The unseen things of the Last Day (the bridge, the scales, the Pool, Jannah) are only a
// picture to help imagine: the app says under them that only Allah knows how they truly are.

/** Soft light rays fanning down from a point. */
function rays(x, y, n, len, color = "#fff6d0", op = 0.18, spread = 1.3) {
  let s = "";
  for (let i = 0; i < n; i += 1) {
    const a = Math.PI / 2 + (i / (n - 1) - 0.5) * spread;
    const ex = x + Math.cos(a) * len;
    const ey = y + Math.sin(a) * len;
    const w = len * 0.05;
    s += `<path d="M${x},${y} L${ex - w},${ey} L${ex + w},${ey} Z" fill="${color}" opacity="${op}"/>`;
  }
  return s;
}

/** Wavy water bands across a width. */
function waves(y, amp, fill, x0 = 0, x1 = W, step = 64, base = H) {
  let d = `M${x0},${base} L${x0},${y}`;
  for (let x = x0; x < x1; x += step) d += ` q${step / 4},${-amp} ${step / 2},0 t${step / 2},0`;
  d += ` L${x1},${base} Z`;
  return `<path d="${d}" fill="${fill}"/>`;
}

/** A fruit tree with a round crown and a few fruits. */
function fruitTree(x, y, s, seed, fruit = "#e8a33a") {
  const r = rng(seed);
  let out = `<path d="M${x - 6 * s},${y} Q${x - 3 * s},${y - 40 * s} ${x},${y - 60 * s} Q${x + 4 * s},${y - 40 * s} ${x + 6 * s},${y} Z" fill="#7a5532"/>`;
  out += `<ellipse cx="${x}" cy="${y - 82 * s}" rx="${46 * s}" ry="${36 * s}" fill="#3f8a3e"/><ellipse cx="${x - 20 * s}" cy="${y - 92 * s}" rx="${26 * s}" ry="${20 * s}" fill="#56a64c"/><ellipse cx="${x + 18 * s}" cy="${y - 96 * s}" rx="${22 * s}" ry="${17 * s}" fill="#4c9a45"/>`;
  for (let i = 0; i < 6; i += 1) out += `<circle cx="${x + (r() - 0.5) * 70 * s}" cy="${y - 70 * s - r() * 34 * s}" r="${4.2 * s}" fill="${fruit}"/>`;
  return out;
}

/** An old book seen from the front: two pages open on a cover. */
function openBook(cx, cy, w, cover = "#7a3f22", page = "#fbf1dc") {
  const h = w * 0.42;
  let s = `<ellipse cx="${cx}" cy="${cy + h * 0.62}" rx="${w * 0.58}" ry="${h * 0.12}" fill="#000" opacity="0.18"/>`;
  s += `<path d="M${cx - w / 2 - 6},${cy - h / 2 + 8} Q${cx - w / 4},${cy - h / 2 - 6} ${cx},${cy - h / 2 + 10} Q${cx + w / 4},${cy - h / 2 - 6} ${cx + w / 2 + 6},${cy - h / 2 + 8} L${cx + w / 2 + 6},${cy + h / 2 + 8} Q${cx + w / 4},${cy + h / 2 - 4} ${cx},${cy + h / 2 + 12} Q${cx - w / 4},${cy + h / 2 - 4} ${cx - w / 2 - 6},${cy + h / 2 + 8} Z" fill="${cover}"/>`;
  s += `<path d="M${cx - w / 2},${cy - h / 2 + 4} Q${cx - w / 4},${cy - h / 2 - 10} ${cx},${cy - h / 2 + 6} L${cx},${cy + h / 2 + 6} Q${cx - w / 4},${cy + h / 2 - 10} ${cx - w / 2},${cy + h / 2} Z" fill="${page}"/>`;
  s += `<path d="M${cx + w / 2},${cy - h / 2 + 4} Q${cx + w / 4},${cy - h / 2 - 10} ${cx},${cy - h / 2 + 6} L${cx},${cy + h / 2 + 6} Q${cx + w / 4},${cy + h / 2 - 10} ${cx + w / 2},${cy + h / 2} Z" fill="${shade(page, -0.04)}"/>`;
  for (let i = 0; i < 6; i += 1) {
    const y = cy - h / 2 + 14 + i * (h - 22) / 6;
    s += `<path d="M${cx - w / 2 + 14},${y + 2} Q${cx - w / 4},${y - 6} ${cx - 10},${y + 4}" stroke="#b9a37c" stroke-width="2" fill="none" opacity="0.8"/>`;
    s += `<path d="M${cx + 10},${y + 4} Q${cx + w / 4},${y - 6} ${cx + w / 2 - 14},${y + 2}" stroke="#b9a37c" stroke-width="2" fill="none" opacity="0.8"/>`;
  }
  return s;
}

/** A closed book standing on a shelf. */
function spine(x, base, w, h, fill) {
  return `<rect x="${x}" y="${base - h}" width="${w}" height="${h}" rx="2" fill="${fill}"/><rect x="${x}" y="${base - h + h * 0.15}" width="${w}" height="3" fill="${shade(fill, 0.35)}" opacity="0.7"/><rect x="${x}" y="${base - h * 0.2}" width="${w}" height="3" fill="${shade(fill, 0.35)}" opacity="0.7"/>`;
}

/** A small clay cup. */
const cup = (x, y, s = 1, fill = "#b8643a") =>
  `<path d="M${x - 14 * s},${y - 26 * s} L${x + 14 * s},${y - 26 * s} L${x + 10 * s},${y} L${x - 10 * s},${y} Z" fill="${fill}"/><ellipse cx="${x}" cy="${y - 26 * s}" rx="${14 * s}" ry="${4 * s}" fill="${shade(fill, -0.3)}"/><ellipse cx="${x}" cy="${y - 25 * s}" rx="${11 * s}" ry="${2.6 * s}" fill="#9fd0e6"/>`;

/** A date (the fruit). */
const date = (x, y, a = 0) => `<g transform="rotate(${a} ${x} ${y})"><ellipse cx="${x}" cy="${y}" rx="15" ry="8" fill="#6b2e14"/><ellipse cx="${x - 4}" cy="${y - 3}" rx="6" ry="2" fill="#a8552a" opacity="0.7"/></g>`;

/** An arched opening (a window or a niche). */
const arch = (x, base, w, h, fill) => `<path d="M${x},${base} L${x},${base - h + w / 2} A${w / 2},${w / 2} 0 0 1 ${x + w},${base - h + w / 2} L${x + w},${base} Z" fill="${fill}"/>`;

const UNSEEN_PICTURES = {
  // The bridge over Jahannam: thinner than a hair and sharper than a sword (Sahih Muslim 183), so only a thin line
  // of light from edge to edge, hooks beneath it, a dark drop below and a soft light where it ends.
  sirat: () => {
    const left = [[0, 300], [80, 290], [180, 312], [230, 340], [250, 576]];
    const right = [[774, 576], [800, 336], [850, 306], [940, 290], [1024, 296]];
    let hooks = "";
    for (let x = 290; x < 740; x += 46) hooks += `<path d="M${x},${318 - Math.sin(((x - 250) / 524) * Math.PI) * 20 + 2} l0,18 q0,10 -8,8" stroke="#3a3048" stroke-width="3" fill="none"/>`;
    return (
      sky("s", "#1b1733", "#4b3a5c") +
      `<radialGradient id="glow" cx="0.5" cy="1" r="0.7"><stop offset="0" stop-color="#7a2e1c" stop-opacity="0.75"/><stop offset="1" stop-color="#1b1733" stop-opacity="0"/></radialGradient><rect x="200" y="330" width="624" height="246" fill="url(#glow)"/>` +
      `<radialGradient id="end" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="#fff2c2" stop-opacity="0.9"/><stop offset="1" stop-color="#fff2c2" stop-opacity="0"/></radialGradient><ellipse cx="930" cy="250" rx="190" ry="150" fill="url(#end)"/>` +
      cloud(220, 120, 1.4, "#6a5a7e", 0.35) +
      cloud(640, 90, 1.2, "#6a5a7e", 0.3) +
      rocks(left, "#2c2638") +
      rocks(right, "#2c2638") +
      `<path d="M250,320 Q512,280 776,320" stroke="#fff3c8" stroke-width="10" opacity="0.18" fill="none"/>` +
      `<path d="M250,320 Q512,280 776,320" stroke="#fff6d6" stroke-width="2.4" fill="none"/>` +
      hooks +
      `<path d="M240,576 L250,420 L300,576 Z M760,576 L776,430 L800,576 Z" fill="#221d2c"/>`
    );
  },

  // The scales (al-Mizan): a great balance on a cloud, the pan of good deeds heavier and full of light.
  mizan: () => {
    const cx = 512;
    const tilt = 9;
    const lx = cx - 230;
    const rx = cx + 230;
    const ly = 196 - tilt * 4;
    const ry = 196 + tilt * 4;
    const pan = (x, y, glow) =>
      `<path d="M${x - 70},${y + 70} L${x},${y} L${x + 70},${y + 70}" stroke="#c99a3a" stroke-width="3" fill="none"/>` +
      (glow ? `<ellipse cx="${x}" cy="${y + 64}" rx="90" ry="40" fill="#fff4c4" opacity="0.6"/>` : "") +
      `<path d="M${x - 86},${y + 70} Q${x},${y + 128} ${x + 86},${y + 70} Z" fill="#d9a83f"/><ellipse cx="${x}" cy="${y + 70}" rx="86" ry="14" fill="#f0c766"/>`;
    return (
      sky("s", "#cfe3f7", "#fbf2dc") +
      rays(cx, 40, 9, 560, "#fff8dc", 0.22, 1.8) +
      cloud(160, 470, 2.6, "#ffffff", 0.95) +
      cloud(860, 480, 2.8, "#ffffff", 0.95) +
      cloud(512, 520, 3.4, "#ffffff", 1) +
      `<rect x="${cx - 9}" y="140" width="18" height="300" rx="6" fill="#b88a2e"/><path d="M${cx - 70},450 Q${cx},410 ${cx + 70},450 Z" fill="#a67a27"/>` +
      `<circle cx="${cx}" cy="134" r="16" fill="#e2b24a"/>` +
      `<path d="M${lx},${ly} L${rx},${ry}" stroke="#c99a3a" stroke-width="12" stroke-linecap="round"/>` +
      pan(lx, ly, false) +
      pan(rx, ry, true) +
      `<circle cx="${rx - 26}" cy="${ry + 62}" r="9" fill="#fffbe6"/><circle cx="${rx + 4}" cy="${ry + 58}" r="11" fill="#fffbe6"/><circle cx="${rx + 30}" cy="${ry + 64}" r="8" fill="#fffbe6"/>`
    );
  },

  // The Pool (al-Kawthar): water whiter than milk, with cups around it as many as the stars (Sahih al-Bukhari 6579).
  kawthar: () => {
    let cups = "";
    for (let i = 0; i < 26; i += 1) {
      const a = Math.PI * (0.05 + (i / 25) * 0.9);
      const x = 512 - Math.cos(a) * 440;
      const y = 420 + Math.sin(a) * 120;
      cups += `<g opacity="${0.75 + (i % 3) * 0.08}"><ellipse cx="${x}" cy="${y}" rx="11" ry="4" fill="#e9eef5"/><path d="M${x - 11},${y} L${x - 8},${y + 14} L${x + 8},${y + 14} L${x + 11},${y} Z" fill="#cfd8e3"/></g>`;
    }
    return (
      sky("s", "#bfe0f2", "#fff6e0") +
      rays(512, 0, 11, 520, "#ffffff", 0.2, 1.6) +
      `<path d="M0,300 Q512,270 1024,300 L1024,576 L0,576 Z" fill="#e8f1d8"/>` +
      `<ellipse cx="512" cy="420" rx="470" ry="150" fill="#e6c98e"/><ellipse cx="512" cy="414" rx="440" ry="128" fill="#f7f3ea"/>` +
      `<ellipse cx="512" cy="408" rx="400" ry="104" fill="#ffffff"/>` +
      `<path d="M260,400 Q330,392 400,402 M560,420 Q640,410 720,420 M420,450 Q500,442 580,452" stroke="#dfe9f2" stroke-width="3" fill="none"/>` +
      cups +
      fruitTree(70, 340, 0.9, 3) +
      fruitTree(960, 344, 1, 5)
    );
  },

  // The great gathering: one wide, flat, white land (Sahih al-Bukhari 6521), the sun brought close.
  gathering: () => {
    let shimmer = "";
    for (let y = 350; y < 560; y += 26) shimmer += `<path d="M0,${y} Q256,${y - 6} 512,${y} T1024,${y}" stroke="#ffffff" stroke-width="2" opacity="0.35" fill="none"/>`;
    return (
      sky("s", "#f6d9a6", "#fff6e6") +
      `<circle cx="512" cy="150" r="230" fill="#fff1c0" opacity="0.35"/><circle cx="512" cy="150" r="150" fill="#ffe7a0" opacity="0.5"/>` +
      sun(512, 150, 96, "#ffd76a", "#fff0b8") +
      `<path d="M0,330 Q512,318 1024,330 L1024,576 L0,576 Z" fill="#f4efe4"/>` +
      `<path d="M0,420 Q512,404 1024,420 L1024,576 L0,576 Z" fill="#efe8da"/>` +
      shimmer
    );
  },

  // Jannah: gardens under which rivers flow, fruit close to hand, and homes of light far away.
  jannah: () => {
    let domes = "";
    [[360, 250, 34], [470, 236, 46], [600, 244, 38], [700, 256, 28]].forEach(([x, y, r]) => {
      domes += `<rect x="${x - r}" y="${y}" width="${r * 2}" height="${r * 1.2}" fill="#fff4dc"/><path d="M${x - r},${y} A${r},${r} 0 0 1 ${x + r},${y} Z" fill="#ffe6a8"/>` + arch(x - r * 0.25, y + r * 1.2, r * 0.5, r * 0.8, "#f1d79e");
    });
    return (
      sky("s", "#9fd8f2", "#fff4dc") +
      rays(512, 0, 9, 420, "#ffffff", 0.18, 1.5) +
      `<circle cx="530" cy="230" r="220" fill="#fff6d8" opacity="0.5"/>` +
      ridge([[0, 300], [200, 250], [420, 290], [640, 240], [860, 286], [1024, 260]], "#9fd3a0") +
      domes +
      `<path d="M0,320 Q512,296 1024,320 L1024,576 L0,576 Z" fill="#6cc06a"/>` +
      `<path d="M440,320 Q470,400 380,470 Q300,530 340,576 L520,576 Q470,520 540,460 Q610,400 560,320 Z" fill="#7fd0ee"/>` +
      `<path d="M470,330 Q500,400 420,470 Q360,520 390,576" stroke="#cfefff" stroke-width="5" fill="none" opacity="0.8"/>` +
      `<path d="M640,322 Q700,380 780,420 Q880,470 1024,470 L1024,520 Q860,520 760,470 Q680,430 610,322 Z" fill="#fbfbf6"/>` +
      fruitTree(140, 470, 1.6, 11) +
      fruitTree(860, 560, 1.4, 13, "#d9534a") +
      fruitTree(280, 380, 0.9, 17) +
      palm(640, 560, 210, 20, 7) +
      bush(560, 560, 26, "#4fa64a") +
      bush(70, 560, 30, "#4fa64a") +
      [[250, 540], [620, 520], [960, 410]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="7" fill="#ffffff"/><circle cx="${x}" cy="${y}" r="3" fill="#ffd34d"/>`).join("")
    );
  },

  // The book of deeds: an open book held up in light, every deed written in it.
  "book-deeds": () =>
    sky("s", "#d7e6f6", "#fbf2df") +
    rays(512, 120, 13, 520, "#fff8dc", 0.22, 2.4) +
    `<circle cx="512" cy="300" r="190" fill="#fff6d2" opacity="0.6"/>` +
    cloud(180, 500, 2.4, "#ffffff", 0.95) +
    cloud(850, 505, 2.6, "#ffffff", 0.95) +
    cloud(512, 540, 3.2) +
    openBook(512, 300, 420, "#6e3a20")
};

const LIFE_PICTURES = {
  // A grave in the old way: a low mound of earth, a plain stone at the head and the foot, under a quiet sky.
  grave: () =>
    sky("s", "#9fb7d6", "#f2d9b4") +
    sun(820, 300, 30, "#ffd9a0", "#ffe9c8") +
    ridge([[0, 320], [200, 280], [420, 310], [640, 270], [860, 300], [1024, 280]], "#b49678") +
    `<path d="M0,350 Q512,330 1024,350 L1024,576 L0,576 Z" fill="#dcc196"/>` +
    `<path d="M330,470 Q512,400 700,470 Z" fill="#b8956a"/><path d="M330,470 Q512,430 700,470 L700,478 L330,478 Z" fill="#a8855c"/>` +
    `<path d="M300,478 l8,-58 q12,-10 24,0 l8,58 Z" fill="#9c958c"/><path d="M690,478 l6,-40 q10,-8 20,0 l6,40 Z" fill="#9c958c"/>` +
    palm(150, 470, 190, -14, 3) +
    bush(860, 480, 24) +
    pebbles(200, 820, 490, 570, 40, 51),

  // Wudu: an old jug pouring a stream of water into a stone basin.
  wudu: () => {
    let tiles = "";
    for (let y = 0; y < 330; y += 48) for (let x = (y / 48) % 2 ? -24 : 0; x < W; x += 48) tiles += `<path d="M${x + 24},${y} L${x + 48},${y + 24} L${x + 24},${y + 48} L${x},${y + 24} Z" fill="${(x / 48 + y / 48) % 2 ? "#5d9bb0" : "#e7dcc6"}" opacity="0.55"/>`;
    return (
      `<rect width="${W}" height="${H}" fill="#efe4cf"/>` +
      tiles +
      `<rect x="0" y="330" width="${W}" height="246" fill="#c9b08a"/><rect x="0" y="330" width="${W}" height="10" fill="#b39673"/>` +
      `<ellipse cx="560" cy="470" rx="230" ry="44" fill="#000" opacity="0.15"/>` +
      `<path d="M350,400 Q560,520 770,400 L770,380 L350,380 Z" fill="#a89a88"/><ellipse cx="560" cy="380" rx="210" ry="40" fill="#bdb09d"/><ellipse cx="560" cy="384" rx="180" ry="28" fill="#6fb3cc"/>` +
      `<path d="M470,388 Q520,380 570,390 M590,394 Q630,386 670,394" stroke="#c4e6f2" stroke-width="3" fill="none"/>` +
      `<path d="M552,190 Q548,290 560,382" stroke="#bfe6f4" stroke-width="9" fill="none" opacity="0.9"/><path d="M552,190 Q548,290 560,382" stroke="#ffffff" stroke-width="3" fill="none" opacity="0.8"/>` +
      `<g transform="rotate(-28 420 170)"><path d="M360,120 Q340,170 360,230 Q420,262 480,230 Q500,170 480,120 Z" fill="#b06a35"/><rect x="380" y="92" width="80" height="30" rx="8" fill="#9a5a2c"/><path d="M480,150 Q540,140 572,168 L566,178 Q536,156 482,170 Z" fill="#9a5a2c"/><path d="M362,140 Q320,170 360,210" stroke="#8a4f26" stroke-width="10" fill="none"/><path d="M372,170 Q420,186 470,170" stroke="#d48a4e" stroke-width="5" fill="none"/></g>`
    );
  },

  // Salah: a prayer rug laid in front of the niche (mihrab) of a simple old mosque, light from a high window.
  prayer: () =>
    `<rect width="${W}" height="${H}" fill="#e9dcc2"/>` +
    `<rect x="0" y="400" width="${W}" height="176" fill="#cfb68e"/>` +
    arch(402, 400, 220, 330, "#d6c3a0") +
    arch(422, 400, 180, 300, "#bfa47a") +
    arch(150, 250, 70, 130, "#9fd2ec") +
    arch(804, 250, 70, 130, "#9fd2ec") +
    rays(185, 200, 5, 300, "#fff8e0", 0.25, 0.5) +
    rays(839, 200, 5, 300, "#fff8e0", 0.25, 0.5) +
    `<path d="M300,560 L724,560 L660,420 L364,420 Z" fill="#a33b32"/><path d="M330,546 L694,546 L644,432 L380,432 Z" fill="none" stroke="#e8b04a" stroke-width="6"/>` +
    `<path d="M470,452 L512,424 L554,452 L554,470 L470,470 Z" fill="#e8b04a" opacity="0.9"/>` +
    `<path d="M370,520 L654,520" stroke="#e8b04a" stroke-width="4"/>`,

  // Iftar: dates and a cup of water at sunset, by an open window.
  iftar: () =>
    `<rect width="${W}" height="${H}" fill="#e2c9a0"/>` +
    `<defs><linearGradient id="dusk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5b5d9e"/><stop offset="0.6" stop-color="#f08a5d"/><stop offset="1" stop-color="#ffd27a"/></linearGradient></defs>` +
    arch(332, 330, 360, 300, "url(#dusk)") +
    `<circle cx="512" cy="300" r="40" fill="#ffd27a"/>` +
    ridge([[332, 300], [440, 280], [560, 296], [692, 284]], "#6b4a5a", 330) +
    `<rect x="300" y="330" width="424" height="18" fill="#b08a5a"/>` +
    `<rect x="0" y="420" width="${W}" height="156" fill="#8a5a33"/><rect x="0" y="420" width="${W}" height="12" fill="#a06c40"/>` +
    `<ellipse cx="440" cy="470" rx="150" ry="30" fill="#d9c6a0"/><ellipse cx="440" cy="466" rx="130" ry="22" fill="#efe2c4"/>` +
    date(380, 462, -10) + date(420, 468, 8) + date(462, 460, -4) + date(500, 470, 12) + date(440, 452, 2) +
    cup(660, 490, 2.2),

  // Zakat: a share of what one has: a sack of grain, a basket of dates and coins on a cloth.
  zakat: () => {
    let coins = "";
    for (let i = 0; i < 7; i += 1) coins += `<ellipse cx="720" cy="${480 - i * 9}" rx="40" ry="12" fill="${i % 2 ? "#e2b24a" : "#d29f36"}"/>`;
    for (let i = 0; i < 4; i += 1) coins += `<ellipse cx="800" cy="${494 - i * 9}" rx="32" ry="10" fill="${i % 2 ? "#d8dde4" : "#c3c9d2"}"/>`;
    return (
      sky("s", "#a9d6ee", "#f8ead0") +
      `<rect x="0" y="330" width="${W}" height="246" fill="#d8bd8c"/>` +
      `<path d="M160,520 L880,520 L840,420 L200,420 Z" fill="#3f7c8c"/><path d="M180,510 L860,510" stroke="#e8b04a" stroke-width="4"/>` +
      `<path d="M230,470 Q220,330 300,300 Q360,290 380,320 Q440,330 420,470 Z" fill="#cfae7a"/><path d="M290,300 Q330,280 380,320" stroke="#8a6a3c" stroke-width="5" fill="none"/>` +
      `<ellipse cx="330" cy="304" rx="40" ry="12" fill="#e9cf8c"/>` +
      [[310, 300], [330, 296], [350, 302], [322, 306]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="5" ry="3" fill="#c79a3c"/>`).join("") +
      `<path d="M470,470 L610,470 L630,400 L450,400 Z" fill="#a8743a"/><path d="M450,400 L630,400" stroke="#8a5a2a" stroke-width="6"/>` +
      date(500, 392, -8) + date(540, 386, 10) + date(580, 392, -4) + date(520, 376, 4) + date(560, 372, -12) +
      coins
    );
  },

  // Books of knowledge: shelves of old books, an open book, an inkwell and a reed pen by a lamp.
  books: () => {
    let shelves = "";
    const r = rng(61);
    for (let row = 0; row < 3; row += 1) {
      const base = 120 + row * 110;
      shelves += `<rect x="40" y="${base}" width="944" height="10" fill="#6b4a2b"/>`;
      let x = 50;
      while (x < 970) {
        const w = 18 + r() * 22;
        const h = 60 + r() * 30;
        shelves += spine(x, base, w, h, ["#7a3f22", "#3f5a7a", "#5e7a3f", "#8a6a2c", "#6a3550"][Math.floor(r() * 5)]);
        x += w + 3;
      }
    }
    return (
      `<rect width="${W}" height="${H}" fill="#caa978"/>` +
      `<rect x="30" y="0" width="964" height="350" fill="#8f6b43"/>` +
      shelves +
      `<rect x="0" y="380" width="${W}" height="196" fill="#7a5532"/><rect x="0" y="380" width="${W}" height="12" fill="#946a40"/>` +
      openBook(470, 455, 360) +
      `<ellipse cx="760" cy="470" rx="34" ry="10" fill="#2a2420"/><path d="M730,470 Q728,430 760,426 Q792,430 790,470 Z" fill="#3a3330"/><path d="M752,428 L800,330" stroke="#c9a46a" stroke-width="5" stroke-linecap="round"/>` +
      `<path d="M860,470 Q860,440 900,436 Q940,440 940,470 Z" fill="#c99a3a"/><path d="M900,436 Q896,410 902,396 Q910,414 900,436" fill="#ffb84d"/><circle cx="901" cy="414" r="26" fill="#ffd27a" opacity="0.25"/>`
    );
  }
};

const STORY_PICTURES = {
  // Nuh's ark on the flood, rain falling, a mountain far off.
  ark: () => {
    let rain = "";
    const r = rng(71);
    for (let i = 0; i < 90; i += 1) {
      const x = r() * W;
      const y = r() * 380;
      rain += `<path d="M${x},${y} l-6,18" stroke="#c9d8e6" stroke-width="1.6" opacity="0.6"/>`;
    }
    return (
      sky("s", "#5d6b80", "#a9b6c2") +
      cloud(200, 70, 2.2, "#4b5668", 0.9) +
      cloud(620, 60, 2.6, "#4b5668", 0.9) +
      cloud(920, 90, 1.8, "#4b5668", 0.9) +
      ridge([[620, 330], [760, 250], [900, 310]], "#6f7a72", 360) +
      rain +
      waves(360, 18, "#3f6f8a") +
      `<path d="M220,330 L800,330 L740,420 L280,420 Z" fill="#6b4524"/>` +
      [0, 1, 2, 3].map((i) => `<path d="M${236 + i * 6},${352 + i * 18} L${786 - i * 12},${352 + i * 18}" stroke="#53351b" stroke-width="2"/>`).join("") +
      `<path d="M330,330 L330,250 L690,250 L690,330 Z" fill="#7d5530"/><path d="M310,252 L512,196 L712,252 Z" fill="#5a3a1c"/>` +
      [380, 450, 520, 590].map((x) => `<rect x="${x}" y="276" width="26" height="22" fill="#3d2914"/>`).join("") +
      waves(410, 20, "#2f5b75") +
      waves(470, 22, "#264d66")
    );
  },

  // The sea parted for Musa: two walls of water and a dry path between them (Quran 26:63).
  "sea-split": () =>
    sky("s", "#8cc9ea", "#f6e7c6") +
    sun(512, 80, 28) +
    `<path d="M0,250 L360,250 Q420,330 440,576 L0,576 Z" fill="#2f7fa8"/><path d="M1024,250 L664,250 Q604,330 584,576 L1024,576 Z" fill="#2f7fa8"/>` +
    `<path d="M360,250 Q420,330 440,576 L410,576 Q392,340 336,250 Z" fill="#62b3d6"/><path d="M664,250 Q604,330 584,576 L614,576 Q632,340 688,250 Z" fill="#62b3d6"/>` +
    waves(250, 12, "#4a9cc4", 0, 360, 60, 270) +
    waves(250, 12, "#4a9cc4", 664, 1024, 60, 270) +
    `<path d="M360,250 L664,250 Q604,330 584,576 L440,576 Q420,330 360,250 Z" fill="#d8bf8e"/>` +
    pebbles(440, 590, 420, 570, 30, 81, ["#b89c70", "#a48a62", "#c9b088"]) +
    `<path d="M380,252 L644,252" stroke="#c3a777" stroke-width="3"/>`,

  // Yunus: the great fish at the shore at night, and the gourd plant Allah grew for him (Quran 37:145-146).
  whale: () =>
    sky("s", "#16254a", "#3d5a85") +
    stars(80, 91, 260) +
    `<circle cx="820" cy="110" r="38" fill="#fff4c2"/>` +
    waves(330, 14, "#1f4c74") +
    `<path d="M140,380 Q200,300 360,300 Q520,300 560,360 Q600,330 640,300 L650,340 Q620,380 600,400 Q540,440 360,440 Q200,440 140,380 Z" fill="#355f86"/>` +
    `<path d="M170,390 Q300,430 520,410" stroke="#8fb5d6" stroke-width="4" fill="none" opacity="0.7"/><circle cx="210" cy="360" r="6" fill="#0f1f33"/>` +
    `<path d="M300,300 Q290,250 270,236 M300,300 Q306,252 330,234" stroke="#9fd2ff" stroke-width="3" fill="none" opacity="0.7"/>` +
    waves(410, 12, "#1a4267") +
    `<path d="M700,576 Q760,420 1024,400 L1024,576 Z" fill="#c9a76f"/>` +
    `<path d="M820,470 Q860,420 900,440 Q940,410 980,436" stroke="#3f7d3a" stroke-width="5" fill="none"/>` +
    [[860, 430], [920, 418], [968, 428], [890, 452]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="22" ry="14" fill="#4f9a45"/>`).join("") +
    `<ellipse cx="930" cy="470" rx="22" ry="14" fill="#c9b85a"/>`,

  // The cave of the young men of Al-Kahf: a cave mouth in a mountain, the sun leaning away from it (Quran 18:17).
  cave: () => {
    const hill = [[0, 576], [0, 220], [120, 150], [260, 120], [400, 150], [520, 210], [620, 300], [700, 576]];
    return (
      sky("s", "#86c8ea", "#f8e6c2") +
      sun(900, 110, 34) +
      rays(900, 110, 7, 420, "#fff6d0", 0.12, 1.2) +
      `<path d="M0,420 Q512,400 1024,420 L1024,576 L0,576 Z" fill="${valleySand}"/>` +
      rocks(hill, "#8a6b55") +
      facets(hill, "#a3846c") +
      `<path d="M230,470 Q230,320 330,310 Q430,320 430,470 Z" fill="#2a1f1a"/><path d="M250,470 Q252,350 330,340 Q408,350 410,470 Z" fill="#1a1411"/>` +
      `<path d="M200,480 L460,480 L440,470 L220,470 Z" fill="#7a5c48"/>` +
      bush(520, 470, 24) +
      bush(780, 500, 20) +
      pebbles(420, 1000, 470, 570, 40, 93)
    );
  },

  // The Year of the Elephant: an elephant in the valley before Makkah, flocks of birds overhead (Quran 105).
  elephant: () => {
    let birds = "";
    const r = rng(101);
    for (let i = 0; i < 26; i += 1) {
      const x = 80 + r() * 860;
      const y = 50 + r() * 170;
      const s = 0.7 + r() * 0.6;
      birds += `<path d="M${x - 12 * s},${y} Q${x - 6 * s},${y - 8 * s} ${x},${y} Q${x + 6 * s},${y - 8 * s} ${x + 12 * s},${y}" stroke="#3a3530" stroke-width="${2.4 * s}" fill="none"/>`;
    }
    const back = [[0, 260], [160, 190], [300, 250], [460, 180], [620, 240], [800, 170], [1024, 240]];
    return (
      sky("s", "#8ccbec", "#f8e5bf") +
      birds +
      rocks(back, "#7d6455") +
      facets(back, "#937867") +
      `<path d="M0,360 Q512,330 1024,360 L1024,576 L0,576 Z" fill="${valleySand}"/>` +
      `<g transform="translate(330 250)">` +
      `<ellipse cx="190" cy="250" rx="200" ry="20" fill="#000" opacity="0.15"/>` +
      `<rect x="70" y="150" width="46" height="100" rx="16" fill="#7e7c86"/><rect x="250" y="150" width="46" height="100" rx="16" fill="#7e7c86"/>` +
      `<ellipse cx="180" cy="120" rx="150" ry="90" fill="#9a98a3"/>` +
      `<rect x="110" y="150" width="46" height="104" rx="16" fill="#8e8c97"/><rect x="214" y="150" width="46" height="104" rx="16" fill="#8e8c97"/>` +
      `<ellipse cx="320" cy="90" rx="66" ry="60" fill="#9a98a3"/><path d="M360,110 Q400,170 380,230 Q376,244 364,238 Q372,180 340,130 Z" fill="#9a98a3"/>` +
      `<path d="M300,60 Q250,70 252,120 Q262,160 300,150 Z" fill="#8a8893"/><circle cx="340" cy="80" r="6" fill="#2a2833"/>` +
      `<path d="M352,124 Q372,120 380,128" stroke="#f4efe2" stroke-width="7" stroke-linecap="round"/>` +
      `<path d="M30,120 Q14,150 22,180" stroke="#7e7c86" stroke-width="6" fill="none"/>` +
      `</g>` +
      pebbles(0, 1024, 520, 572, 40, 103)
    );
  }
};

Object.assign(PICTURES, UNSEEN_PICTURES, LIFE_PICTURES, STORY_PICTURES);

/** The unseen things of the Last Day: shown with a line that only Allah knows how they truly look. */
export const UNSEEN_PICTURE_IDS = Object.keys(UNSEEN_PICTURES);

const svgOf = (id) => `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">${PICTURES[id]()}</svg>`;

async function main() {
  const { chromium } = require("playwright");
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: W, height: H } });
  const outDir = path.join(ROOT, "assets/pictures");
  mkdirSync(outDir, { recursive: true });
  // --only=a,b draws just those (so the others' JPEGs are left as they are).
  const only = process.argv.find((arg) => arg.startsWith("--only="))?.slice(7).split(",");
  for (const id of Object.keys(PICTURES).filter((each) => !only || only.includes(each))) {
    await page.setContent(`<html><body style="margin:0">${svgOf(id)}</body></html>`);
    await page.screenshot({ path: path.join(outDir, `${id}.jpg`), type: "jpeg", quality: 82, clip: { x: 0, y: 0, width: W, height: H } });
    console.log(`drew ${id}`);
  }
  if (process.argv.includes("--sheet")) {
    const ids = Object.keys(PICTURES).filter((each) => !only || only.includes(each));
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
