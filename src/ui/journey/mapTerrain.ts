import type { MapLevel, MapPlaceKind } from "../../data/seerahMap";
import {
  GALILEE,
  JORDAN_RIVER,
  LAVA_FIELDS,
  MADINAH_GROVES,
  MADINAH_HILLS,
  MADINAH_LAVA,
  MAKKAH_OPEN,
  MOUNTAIN_CHAINS,
  OASES,
  SAND_SEA,
  UHUD_RIDGE,
  WATERS,
  type LatLon
} from "../../data/seerahMapGeo";
import { distance, evenPoints, inside, KM_PER_LAT, n, pixels, seeded, smoothLine, type Pt, type View } from "./mapGeometry";

/**
 * The land under a Seerah map, drawn as one SVG: sand, the seas with their shores and waves, the lava fields, the
 * mountains, the sand sea's dunes, the green oases, and the places themselves (the Ka'bah, the Prophet's ﷺ mosque as
 * it was, a cave, a well). Only land, water and buildings: no people, no animals.
 *
 * Everything is in the frame's own pixels, so a hill or a wave is the same size on every map whatever its scale.
 */

export const TERRAIN = {
  land: "#F1DFB9",
  landLight: "#F8ECD2",
  sand: "#EFCB8A",
  dune: "#D2A35E",
  lava: "#5A4940",
  lavaDot: "#3E322C",
  rock: "#C8956A",
  rockShade: "#A0704A",
  rockLight: "#DDB48A",
  red: "#B8694A",
  redShade: "#8F4B33",
  water: "#8DCFEA",
  waterDeep: "#6FBEE0",
  shore: "#E8F6FA",
  coast: "#4FA6CF",
  green: "#7DBE6E",
  greenDark: "#4F9A50",
  trunk: "#8A5B33",
  wall: "#F6EEDC",
  wallLine: "#B49D74"
} as const;

export type TerrainPlace = { kind: MapPlaceKind; at: Pt };

type Glyph = { y: number; svg: string };

const polygonPath = (points: Pt[]) => (points.length ? `M${points.map((point) => `${n(point.x)} ${n(point.y)}`).join("L")}Z` : "");
const linePath = (points: Pt[]) => (points.length ? `M${points.map((point) => `${n(point.x)} ${n(point.y)}`).join("L")}` : "");

/** A closed shape smoothed into soft curves (a lava field, a ridge). */
function blobPath(points: Pt[]) {
  if (points.length < 3) return polygonPath(points);
  const ring = [...points, points[0], points[1], points[2]];
  const smooth = smoothLine(ring, 8);
  // Keep one turn of the ring: from the second point round to it again.
  const perSegment = 8;
  return polygonPath(smooth.slice(perSegment, perSegment * (points.length + 1) + 1));
}

/**
 * Soft hills and hollows from -1 to 1 over the frame (a few slow waves added up), so the hills round Makkah gather into
 * ranges with open ground between them instead of an even carpet.
 */
function rolling(seed: string, wavelength: number) {
  const random = seeded(`${seed}-rolling`);
  const waves = Array.from({ length: 6 }, (_, index) => {
    const angle = random() * Math.PI * 2;
    const k = ((Math.PI * 2) / wavelength) * (0.6 + index * 0.28 + random() * 0.3);
    return { fx: Math.cos(angle) * k, fy: Math.sin(angle) * k, phase: random() * Math.PI * 2, amp: 1 / (1 + index * 0.45) };
  });
  const total = waves.reduce((sum, wave) => sum + wave.amp, 0);
  return (x: number, y: number) => waves.reduce((sum, wave) => sum + wave.amp * Math.sin(wave.fx * x + wave.fy * y + wave.phase), 0) / (total * 0.62);
}

/** A mountain: two faces, the sunny one and the shaded one. */
function mountain(x: number, y: number, size: number, tall = 0.9) {
  const half = size / 2;
  const top = y - size * tall * 0.55;
  const foot = y + size * 0.32;
  return (
    `<path d="M${n(x - half)} ${n(foot)}L${n(x)} ${n(top)}L${n(x + half)} ${n(foot)}Z" fill="${TERRAIN.rock}"/>` +
    `<path d="M${n(x)} ${n(top)}L${n(x + half)} ${n(foot)}L${n(x + half * 0.15)} ${n(foot)}Z" fill="${TERRAIN.rockShade}"/>` +
    `<path d="M${n(x)} ${n(top)}L${n(x - half * 0.32)} ${n(top + (foot - top) * 0.36)}L${n(x - half * 0.08)} ${n(top + (foot - top) * 0.3)}Z" fill="${TERRAIN.rockLight}"/>`
  );
}

/** A low rounded hill, as the hills round Makkah are drawn. */
function hill(x: number, y: number, size: number, color: string = TERRAIN.rock, shade: string = TERRAIN.rockShade) {
  const half = size / 2;
  const top = y - size * 0.42;
  const foot = y + size * 0.22;
  return (
    `<path d="M${n(x - half)} ${n(foot)}Q${n(x - half * 0.55)} ${n(top)} ${n(x)} ${n(top)}Q${n(x + half * 0.6)} ${n(top)} ${n(x + half)} ${n(foot)}Z" fill="${color}"/>` +
    `<path d="M${n(x + half * 0.05)} ${n(top + 0.4)}Q${n(x + half * 0.62)} ${n(top + 0.6)} ${n(x + half)} ${n(foot)}L${n(x + half * 0.2)} ${n(foot)}Z" fill="${shade}"/>`
  );
}

function palm(x: number, y: number, size: number) {
  const top = y - size;
  const leaf = size * 0.55;
  return (
    `<path d="M${n(x)} ${n(y)}Q${n(x + size * 0.12)} ${n(y - size * 0.5)} ${n(x + size * 0.04)} ${n(top)}" stroke="${TERRAIN.trunk}" stroke-width="${n(Math.max(1, size * 0.13))}" fill="none" stroke-linecap="round"/>` +
    `<path d="M${n(x + size * 0.04)} ${n(top)}q${n(-leaf * 0.5)} ${n(-leaf * 0.35)} ${n(-leaf)} ${n(leaf * 0.25)}M${n(x + size * 0.04)} ${n(top)}q${n(leaf * 0.5)} ${n(-leaf * 0.35)} ${n(leaf)} ${n(leaf * 0.25)}M${n(x + size * 0.04)} ${n(top)}q${n(-leaf * 0.2)} ${n(-leaf * 0.5)} ${n(-leaf * 0.6)} ${n(-leaf * 0.35)}M${n(x + size * 0.04)} ${n(top)}q${n(leaf * 0.2)} ${n(-leaf * 0.5)} ${n(leaf * 0.6)} ${n(-leaf * 0.35)}" stroke="${TERRAIN.greenDark}" stroke-width="${n(Math.max(1.2, size * 0.16))}" fill="none" stroke-linecap="round"/>`
  );
}

/** A small flat-roofed house of mud brick, seen a little from above. */
function house(x: number, y: number, size: number) {
  const w = size;
  const h = size * 0.72;
  return (
    `<path d="M${n(x - w / 2)} ${n(y - h / 2)}h${n(w)}v${n(h)}h${n(-w)}Z" fill="${TERRAIN.wall}" stroke="${TERRAIN.wallLine}" stroke-width="0.8"/>` +
    `<path d="M${n(x - w / 2)} ${n(y - h / 2)}l${n(w * 0.18)} ${n(-h * 0.32)}h${n(w)}l${n(-w * 0.18)} ${n(h * 0.32)}Z" fill="#FFF8EA" stroke="${TERRAIN.wallLine}" stroke-width="0.8"/>` +
    `<path d="M${n(x + w / 2)} ${n(y - h / 2)}l${n(w * 0.18)} ${n(-h * 0.32)}v${n(h)}l${n(-w * 0.18)} ${n(h * 0.32)}Z" fill="#E3D3B1" stroke="${TERRAIN.wallLine}" stroke-width="0.8"/>`
  );
}

/** Each place's own little picture, drawn about 26 pixels across around its point. */
export function placeGlyph(kind: MapPlaceKind, x: number, y: number) {
  switch (kind) {
    case "kaaba":
      // The Ka'bah: a black cube with its gold band, on the white ground round it.
      return (
        `<ellipse cx="${n(x)}" cy="${n(y + 6)}" rx="13" ry="5.5" fill="#FBF6EA" stroke="#D9CBAA" stroke-width="0.8"/>` +
        `<path d="M${n(x - 7)} ${n(y - 6)}l4 -3.2h10.4l-4 3.2Z" fill="#3A3A3A"/>` +
        `<path d="M${n(x + 3.4)} ${n(y - 6)}l4 -3.2v12.6l-4 3.2Z" fill="#111111"/>` +
        `<path d="M${n(x - 7)} ${n(y - 6)}h10.4v12.6h-10.4Z" fill="#222222"/>` +
        `<path d="M${n(x - 7)} ${n(y - 3.4)}h10.4v1.8h-10.4Z" fill="#E2B33C"/>` +
        `<path d="M${n(x + 3.4)} ${n(y - 3.4)}l4 -3.2v1.8l-4 3.2Z" fill="#B88A22"/>`
      );
    case "masjid":
      // His mosque ﷺ as it was built: low walls of mud brick, a roof of palm leaves on palm trunks.
      return (
        `<path d="M${n(x - 11)} ${n(y - 4)}h22v10h-22Z" fill="${TERRAIN.wall}" stroke="${TERRAIN.wallLine}" stroke-width="1"/>` +
        `<path d="M${n(x - 12)} ${n(y - 4.5)}h24" stroke="#6E8F3A" stroke-width="2.6" stroke-linecap="round"/>` +
        `<path d="M${n(x - 7)} ${n(y - 3)}v8M${n(x - 2.5)} ${n(y - 3)}v8M${n(x + 2.5)} ${n(y - 3)}v8M${n(x + 7)} ${n(y - 3)}v8" stroke="#A9895C" stroke-width="1.1"/>` +
        `<path d="M${n(x - 1.8)} ${n(y + 6)}v-4.6h3.6v4.6Z" fill="#8A6A44"/>` +
        palm(x + 15, y + 6, 11)
      );
    case "aqsa":
      // Al-Masjid al-Aqsa: a house of prayer of stone with arched doors (no dome: none stood there then).
      return (
        `<path d="M${n(x - 11)} ${n(y - 6)}h22v12h-22Z" fill="#EDE6D3" stroke="#9C8E73" stroke-width="1"/>` +
        `<path d="M${n(x - 12)} ${n(y - 6.5)}h24" stroke="#B9AC8E" stroke-width="2" stroke-linecap="round"/>` +
        [-6.5, 0, 6.5].map((dx) => `<path d="M${n(x + dx - 2.2)} ${n(y + 6)}v-4.5a2.2 2.2 0 0 1 4.4 0v4.5Z" fill="#7C6E56"/>`).join("")
      );
    case "city":
      return house(x - 6, y + 2, 8) + house(x + 5, y + 4, 7) + house(x + 1, y - 4, 7);
    case "cave":
      // A mountain with the cave's dark mouth in its side.
      return (
        mountain(x, y + 3, 32, 1.05).replace(new RegExp(TERRAIN.rock, "g"), "#A9774E").replace(new RegExp(TERRAIN.rockShade, "g"), "#7E5434") +
        `<path d="M${n(x - 3.4)} ${n(y + 11)}v-3.6a3.4 3.4 0 0 1 6.8 0v3.6Z" fill="#2E241E"/>`
      );
    case "mount":
      return hill(x, y + 4, 30, TERRAIN.red, TERRAIN.redShade) + hill(x + 9, y + 6, 18, TERRAIN.red, TERRAIN.redShade);
    case "hill":
      return hill(x, y + 4, 22, "#C79A70", "#A87B52");
    case "well":
      return (
        `<circle cx="${n(x)}" cy="${n(y)}" r="6.5" fill="#9C8B76" stroke="#6F6150" stroke-width="1"/>` +
        `<circle cx="${n(x)}" cy="${n(y)}" r="3.6" fill="#4FA6CF" stroke="#3B88AE" stroke-width="0.8"/>` +
        `<path d="M${n(x - 2)} ${n(y - 1)}q1 -1 2 0" stroke="#D6F0FA" stroke-width="0.8" fill="none"/>`
      );
    case "palms":
      return (
        `<ellipse cx="${n(x)}" cy="${n(y + 6)}" rx="12" ry="4.5" fill="${TERRAIN.green}" opacity="0.75"/>` + palm(x - 5, y + 6, 13) + palm(x + 5, y + 7, 15) + palm(x, y + 5, 10)
      );
    case "ruins":
      // The rock tombs of al-Hijr, cut into a sandstone hill.
      return (
        hill(x, y + 7, 28, "#D19A6C", "#AF7A4F") +
        `<path d="M${n(x - 6)} ${n(y + 7)}v-5h3.6v5ZM${n(x + 2.5)} ${n(y + 7)}v-5h3.6v5Z" fill="#6D4A33"/>` +
        `<path d="M${n(x - 6.6)} ${n(y + 1.6)}l2.4 -2l2.4 2ZM${n(x + 1.9)} ${n(y + 1.6)}l2.4 -2l2.4 2Z" fill="#6D4A33"/>`
      );
    case "point":
    default:
      return `<circle cx="${n(x)}" cy="${n(y)}" r="5.5" fill="#FFFFFF" stroke="#178A56" stroke-width="2.4"/><circle cx="${n(x)}" cy="${n(y)}" r="2" fill="#178A56"/>`;
  }
}

type TerrainInput = {
  level: MapLevel;
  view: View;
  width: number;
  height: number;
  places: TerrainPlace[];
  /** The scene's id: the same scene always gets the same hills. */
  seed: string;
};

/** The whole land as an SVG document for SvgXml. */
export function terrainSvg({ level, view, width, height, places, seed }: TerrainInput) {
  const map = pixels(view, width);
  const random = seeded(`${seed}-${Math.round(width)}`);
  const close = level === "makkah" || level === "madinah" || level === "valley";
  const parts: string[] = [];
  const glyphs: Glyph[] = [];
  const W = n(width);
  const H = n(height);
  const inFrame = (point: Pt, margin = 24) => point.x > -margin && point.y > -margin && point.x < width + margin && point.y < height + margin;
  const clearOfPlaces = (point: Pt, room = 15) => places.every((place) => distance(place.at, point) > room);

  // Sand, a little lighter in the middle.
  parts.push(
    `<defs><radialGradient id="glow" cx="50%" cy="45%" r="75%"><stop offset="0" stop-color="${TERRAIN.landLight}"/><stop offset="1" stop-color="${TERRAIN.land}"/></radialGradient>` +
      `<radialGradient id="edge" cx="50%" cy="50%" r="72%"><stop offset="0.72" stop-color="#8A6A3E" stop-opacity="0"/><stop offset="1" stop-color="#8A6A3E" stop-opacity="0.16"/></radialGradient></defs>`
  );
  parts.push(`<rect x="0" y="0" width="${W}" height="${H}" fill="url(#glow)"/>`);

  const waters = WATERS.map((shape) => shape.map(map.of));
  const inWater = (point: Pt) => waters.some((shape) => inside(point, shape));

  // The sand sea of the north, with its long dunes.
  if (!close) {
    const sandSea = SAND_SEA.map(map.of);
    parts.push(`<path d="${blobPath(sandSea)}" fill="${TERRAIN.sand}" opacity="0.6"/>`);
    for (let y = 8; y < height; y += 14) {
      for (let x = 6 + (Math.round(y / 14) % 2) * 9; x < width; x += 22) {
        const point = { x: x + (random() - 0.5) * 8, y: y + (random() - 0.5) * 6 };
        if (!inside(point, sandSea)) continue;
        parts.push(`<path d="M${n(point.x - 6)} ${n(point.y + 1)}q6 -5 12 0" stroke="${TERRAIN.dune}" stroke-width="1.2" fill="none" stroke-linecap="round" opacity="0.8"/>`);
      }
    }
  }

  // Lava fields: dark, rough ground.
  const lavaFields = level === "madinah" ? MADINAH_LAVA : close ? [] : LAVA_FIELDS;
  for (const field of lavaFields) {
    const shape = field.map(map.of);
    parts.push(`<path d="${blobPath(shape)}" fill="${TERRAIN.lava}" opacity="${level === "madinah" ? 0.4 : 0.32}"/>`);
    const step = 9;
    for (let y = 2; y < height; y += step) {
      for (let x = 2; x < width; x += step) {
        const point = { x: x + random() * step, y: y + random() * step };
        if (!inside(point, shape) || random() < 0.5) continue;
        parts.push(`<circle cx="${n(point.x)}" cy="${n(point.y)}" r="${n(0.8 + random() * 1.2)}" fill="${TERRAIN.lavaDot}" opacity="0.4"/>`);
      }
    }
  }

  // Green oases and palm groves.
  const groves: [number, number, number][] = level === "madinah" ? MADINAH_GROVES : OASES.map((oasis) => [oasis.at[0], oasis.at[1], oasis.km]);
  for (const [lat, lon, km] of groves) {
    const at = map.of([lat, lon]);
    if (!inFrame(at, 40)) continue;
    const radius = Math.min(level === "valley" ? 20 : 40, Math.max(close ? 6 : 2.6, km * map.scale));
    parts.push(`<circle cx="${n(at.x)}" cy="${n(at.y)}" r="${n(radius)}" fill="${TERRAIN.green}" opacity="${close ? 0.5 : 0.7}"/>`);
    if (close && radius > 7) {
      const count = Math.min(9, Math.round(radius / 5));
      for (let index = 0; index < count; index += 1) {
        const angle = random() * Math.PI * 2;
        const reach = Math.sqrt(random()) * radius * 0.75;
        const point = { x: at.x + Math.cos(angle) * reach, y: at.y + Math.sin(angle) * reach * 0.8 };
        if (clearOfPlaces(point, 11)) glyphs.push({ y: point.y, svg: palm(point.x, point.y, 9 + random() * 4) });
      }
    }
  }

  // The seas: a pale shore, the water, its coast line and its waves.
  for (const shape of waters) {
    const d = polygonPath(shape);
    parts.push(`<path d="${d}" fill="none" stroke="${TERRAIN.shore}" stroke-width="7" stroke-linejoin="round"/>`);
    parts.push(`<path d="${d}" fill="${TERRAIN.water}"/>`);
    parts.push(`<path d="${d}" fill="none" stroke="${TERRAIN.coast}" stroke-width="1" stroke-linejoin="round" opacity="0.8"/>`);
  }
  const river = JORDAN_RIVER.map(map.of);
  parts.push(`<path d="${linePath(smoothLine(river, 6))}" fill="none" stroke="${TERRAIN.water}" stroke-width="2.2" stroke-linecap="round"/>`);
  // Small lakes stay visible however far out the map is.
  for (const lake of [GALILEE]) {
    const shape = lake.map(map.of);
    const middle = shape.reduce((sum, point) => ({ x: sum.x + point.x / shape.length, y: sum.y + point.y / shape.length }), { x: 0, y: 0 });
    if (inFrame(middle)) parts.push(`<circle cx="${n(middle.x)}" cy="${n(middle.y)}" r="2.6" fill="${TERRAIN.water}" stroke="${TERRAIN.coast}" stroke-width="0.8"/>`);
  }
  const waveStep = close ? 30 : 26;
  for (let y = 10; y < height; y += waveStep * 0.6) {
    for (let x = 8 + (Math.round(y / (waveStep * 0.6)) % 2) * (waveStep / 2); x < width; x += waveStep) {
      const point = { x: x + (random() - 0.5) * 8, y: y + (random() - 0.5) * 5 };
      const room = 9;
      if (!inWater(point) || !inWater({ x: point.x - room, y: point.y }) || !inWater({ x: point.x + room, y: point.y }) || !inWater({ x: point.x, y: point.y + room * 0.6 })) continue;
      parts.push(`<path d="M${n(point.x - 6)} ${n(point.y)}q3 -3 6 0t6 0" stroke="#FFFFFF" stroke-width="1.2" fill="none" stroke-linecap="round" opacity="0.75"/>`);
    }
  }

  // Mountains along their chains (far maps), or the hills that fill every bit of ground that is not a valley (close).
  if (!close) {
    for (const chain of MOUNTAIN_CHAINS) {
      const line = smoothLine(chain.line.map(map.of), 6);
      const half = chain.half * KM_PER_LAT * map.scale;
      // Bigger mountains on a closer map, and never more than four abreast.
      const size = Math.min(24, Math.max(level === "arabia" ? 11 : 14, half * 0.32));
      const steps = evenPoints(line, size * 0.7);
      steps.forEach((point, at) => {
        const next = steps[Math.min(steps.length - 1, at + 1)];
        const before = steps[Math.max(0, at - 1)];
        const dx = next.x - before.x;
        const dy = next.y - before.y;
        const length = Math.hypot(dx, dy) || 1;
        const across = Math.min(4, Math.max(1, Math.round((2 * half) / (size * 0.95))));
        for (let index = 0; index < across; index += 1) {
          if (random() < 0.26) continue;
          const offset = across === 1 ? 0 : -half + (2 * half * index) / (across - 1);
          const jitter = (random() - 0.5) * size * 0.5;
          const spot = { x: point.x - (dy / length) * (offset + jitter) + (random() - 0.5) * 4, y: point.y + (dx / length) * (offset + jitter) + (random() - 0.5) * 4 };
          if (!inFrame(spot) || inWater(spot) || inWater({ x: spot.x, y: spot.y + size * 0.3 }) || !clearOfPlaces(spot, 14)) continue;
          glyphs.push({ y: spot.y, svg: mountain(spot.x, spot.y, size * (0.82 + random() * 0.36)) });
        }
      });
    }
  } else if (level === "makkah") {
    const open = MAKKAH_OPEN.map(([lat, lon, km]) => ({ at: map.of([lat, lon]), radius: km * map.scale }));
    const ranges = rolling(seed, Math.max(width, height) * 0.55);
    const step = 14;
    for (let y = 4; y < height + 12; y += step * 0.78) {
      for (let x = 2 + (Math.round(y / (step * 0.78)) % 2) * (step / 2); x < width + 12; x += step) {
        const spot = { x: x + (random() - 0.5) * 7, y: y + (random() - 0.5) * 5 };
        const height01 = ranges(spot.x, spot.y);
        if (height01 < -0.18 || random() < 0.1) continue;
        const size = 11 + Math.min(1, height01 + 0.18) * 11 + random() * 3;
        if (open.some((each) => distance(each.at, spot) < each.radius + size * 0.4) || !clearOfPlaces(spot, 15) || inWater(spot) || inWater({ x: spot.x, y: spot.y + size * 0.3 })) continue;
        const dark = height01 > 0.45;
        glyphs.push({ y: spot.y, svg: dark ? hill(spot.x, spot.y, size, "#B98758", "#94683F") : hill(spot.x, spot.y, size) });
      }
    }
  } else if (level === "madinah") {
    // Uhud, a long red mountain, and the small hills round the city.
    // Its foot, then its peaks one behind the other along the ridge's middle (between its north and south sides).
    const ridge = UHUD_RIDGE.map(map.of);
    parts.push(`<path d="${blobPath(ridge)}" fill="${TERRAIN.red}" opacity="0.45"/>`);
    const half = Math.floor(ridge.length / 2);
    const middles = Array.from({ length: half }, (_, index) => {
      const north = ridge[index];
      const south = ridge[ridge.length - 1 - index];
      return { x: (north.x + south.x) / 2, y: (north.y + south.y) / 2, thick: distance(north, south) };
    });
    const spine = smoothLine(middles, 6);
    const thickest = Math.max(...middles.map((each) => each.thick));
    evenPoints(spine, Math.max(7, thickest * 0.42)).forEach((point, index, all) => {
      // Tallest in the middle of the ridge, lower at its two ends.
      const rise = Math.sin(Math.PI * (0.15 + 0.7 * (index / Math.max(1, all.length - 1))));
      const size = Math.max(14, thickest * (0.62 + 0.32 * rise));
      glyphs.push({ y: point.y + size * 0.1, svg: mountain(point.x + (random() - 0.5) * 3, point.y + size * 0.12, size, 0.75).replace(new RegExp(TERRAIN.rock, "g"), TERRAIN.red).replace(new RegExp(TERRAIN.rockShade, "g"), TERRAIN.redShade).replace(new RegExp(TERRAIN.rockLight, "g"), "#D08A66") });
    });
    for (const [lat, lon, km] of MADINAH_HILLS) {
      const at = map.of([lat, lon]);
      if (inFrame(at)) glyphs.push({ y: at.y, svg: hill(at.x, at.y, Math.max(14, km * map.scale), "#C08A62", "#9C6A45") });
    }
  } else {
    // The valley of Badr: open sand in the middle, low hills round it, dunes.
    const middle = { x: width * 0.55, y: height * 0.5 };
    const reach = Math.min(width, height) * 0.36;
    const step = 16;
    for (let y = 4; y < height + 10; y += step * 0.8) {
      for (let x = 2 + (Math.round(y / (step * 0.8)) % 2) * (step / 2); x < width + 10; x += step) {
        const spot = { x: x + (random() - 0.5) * 8, y: y + (random() - 0.5) * 6 };
        const far = distance(spot, middle) / reach;
        if (far < 1 || random() > Math.min(0.85, (far - 1) * 1.6) || spot.x < width * 0.18 || !clearOfPlaces(spot, 15)) continue;
        glyphs.push({ y: spot.y, svg: hill(spot.x, spot.y, 12 + random() * 6, "#D4A877", "#B38552") });
      }
    }
    for (let y = 10; y < height; y += 18) {
      for (let x = 8 + (Math.round(y / 18) % 2) * 12; x < width; x += 26) {
        const spot = { x: x + (random() - 0.5) * 10, y: y + (random() - 0.5) * 6 };
        if (random() < 0.4) continue;
        parts.push(`<path d="M${n(spot.x - 6)} ${n(spot.y + 1)}q6 -4 12 0" stroke="${TERRAIN.dune}" stroke-width="1.1" fill="none" stroke-linecap="round" opacity="0.55"/>`);
      }
    }
  }

  // The town round the Ka'bah and round his mosque ﷺ, when the map is close enough to see houses.
  if (level === "makkah" || level === "madinah") {
    for (const place of places) {
      if (place.kind !== "kaaba" && place.kind !== "masjid") continue;
      const spread = Math.min(30, Math.max(14, (level === "makkah" ? 0.9 : 0.6) * map.scale));
      for (let index = 0; index < 9; index += 1) {
        const angle = (index / 9) * Math.PI * 2 + random() * 0.5;
        const reachOut = spread * (0.75 + random() * 0.6);
        const spot = { x: place.at.x + Math.cos(angle) * reachOut, y: place.at.y + Math.sin(angle) * reachOut * 0.7 };
        if (!inFrame(spot) || !clearOfPlaces(spot, 14) || inWater(spot)) continue;
        glyphs.push({ y: spot.y, svg: house(spot.x, spot.y, 6 + random() * 2.5) });
      }
    }
  }

  glyphs.sort((a, b) => a.y - b.y).forEach((glyph) => parts.push(glyph.svg));
  // The places on top of the land, then a soft darkening at the frame's edges.
  places.forEach((place) => parts.push(placeGlyph(place.kind, place.at.x, place.at.y)));
  parts.push(`<rect x="0" y="0" width="${W}" height="${H}" fill="url(#edge)"/>`);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">${parts.join("")}</svg>`;
}

/** A sea's name sits on its water only where the map shows that water. */
export function seaShown(at: LatLon, view: View, width: number, height: number) {
  const point = pixels(view, width).of(at);
  const margin = 40;
  if (point.x < margin || point.y < 14 || point.x > width - margin || point.y > height - 14) return undefined;
  const waters = WATERS.map((shape) => shape.map(pixels(view, width).of));
  return waters.some((shape) => inside(point, shape)) ? point : undefined;
}

