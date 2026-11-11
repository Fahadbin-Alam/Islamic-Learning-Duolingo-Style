import type { Challenge } from "../../types";
import { MAP_PLACES, type MapLevel } from "../../data/seerahMap";
import type { LatLon } from "../../data/seerahMapGeo";
import { distance, project, type Pt, type View } from "../journey/mapGeometry";

/**
 * Place questions asked on a map: when every answer of a question is a place the Seerah maps know (Makkah, Badr,
 * the cave of Hira, Arafah...), the learner taps the answer where it is, on a living map of the land. Nothing new
 * is written: the question, its answers, its right answer and its source stay the checked ones; the map only puts
 * each answer at its real place (src/data/seerahMap.ts), so the learner sees where it all happened.
 */

/** Names an answer can be written with, besides the map's own names. */
const ALIASES: Record<string, string> = {
  mecca: "makkah",
  bakkah: "makkah",
  "bakkah, makkah": "makkah",
  "ka'bah": "makkah",
  kabah: "makkah",
  kaaba: "makkah",
  "al-haram": "makkah",
  "al-masjid al-haram": "makkah",
  "sacred mosque": "makkah",
  "sacred mosque in makkah": "makkah",
  medina: "madinah",
  "al-madinah": "madinah",
  yathrib: "madinah",
  "an-nabawi": "madinah",
  "masjid an-nabawi": "madinah",
  "prophet's mosque": "madinah",
  taif: "taif",
  jerusalem: "aqsa",
  "al-aqsa": "aqsa",
  "masjid al-aqsa": "aqsa",
  "quba mosque": "quba",
  arafat: "arafah",
  "valley of mina": "mina",
  "al-aqabah": "aqabah",
  hudaybiyyah: "hudaybiyah",
  "al-hudaybiyah": "hudaybiyah",
  "dhul-hulaifah": "dhulhulayfah",
  "ji'ranah": "jiranah",
  "jabal an-nur": "hira"
};

// "At Badr", "In Makkah", "To Ta'if", "The cave of Hira", "Mount Uhud": the place is what is left.
const LEADING = /^(at|in|to|from|near|the|cave of|mount)\s+/;

export function placeKey(label: string) {
  let key = label
    .toLowerCase()
    .replace(/[’‘`]/g, "'")
    .replace(/[.!?;:]+$/, "")
    .trim();
  for (let guard = 0; guard < 4 && LEADING.test(key); guard += 1) key = key.replace(LEADING, "");
  return key;
}

const PLACE_BY_KEY: Map<string, string> = new Map([
  ...Object.values(MAP_PLACES).map((place) => [placeKey(place.name), place.id] as [string, string]),
  ...Object.entries(ALIASES).map(([alias, id]) => [placeKey(alias), id] as [string, string])
]);

/** The map place an answer names, if it names one. */
export function placeOfAnswer(label: string): string | undefined {
  return PLACE_BY_KEY.get(placeKey(label));
}

// Questions about a name, not a place ("Another Quran name for Makkah?", "What was Yathrib later known as?"): the map
// would show the answer's spot under the asked name, so they stay tiles.
const NAME_QUESTION = /\b(another|other)\b.*\bname\b|\bnamed?\b|\bcalled\b|\bknown as\b|\bmeans?\b|\bmeaning\b/i;

/** Room round the places on a map, in pixels, for their pictures and their names. */
export const MAP_PAD = { x: 34, y: 30 };
/** The shortest a map is drawn. */
export const MAP_MIN_HEIGHT = 220;
/** The tallest a map is drawn, however much room the phone has. */
export const MAP_MAX_HEIGHT = 460;
/** The least room between two places on the map, in pixels: closer, their rings and pictures sit on each other. */
export const MIN_PIN_GAP = 34;
/**
 * The smallest maps a question is drawn on (a phone 320 wide): one map, or a main map and a close-up under it. Every
 * two places must be MIN_PIN_GAP apart there.
 */
const SMALL_MAP = { width: 288, single: 280, main: 200, close: 150 };
/** Places closer than this on the main map are drawn again on a close-up under it. */
const LINK_GAP = MIN_PIN_GAP;
/** How far the places left on the main map stand from the close-up's box at least (their rings stay off it). */
const BOX_CLEAR = MIN_PIN_GAP / 2 + 6;
/** The least land a map spans round its places, in km (Quba is 3 km from the Prophet's Masjid ﷺ). */
const LEAST_SPAN_KM = 6;

function spread(placeIds: string[]) {
  const points = placeIds.map((id) => project(MAP_PLACES[id].at));
  const xs = points.map((point) => point.x);
  const ys = points.map((point) => point.y);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  return {
    points,
    spanX: Math.max(LEAST_SPAN_KM, maxX - minX),
    spanY: Math.max(LEAST_SPAN_KM, maxY - minY),
    cx: (minX + maxX) / 2,
    cy: (minY + maxY) / 2
  };
}

/** Kilometres between two points (near enough for picking how close the map comes). */
function km([lat1, lon1]: LatLon, [lat2, lon2]: LatLon) {
  const dLat = (lat2 - lat1) * 111.32;
  const dLon = (lon2 - lon1) * 111.32 * Math.cos((((lat1 + lat2) / 2) * Math.PI) / 180);
  return Math.hypot(dLat, dLon);
}

/** How close the map comes for these places (the hills round Makkah, Madinah with Uhud, the Hijaz, or Arabia), which picks how the land is drawn. */
export function mapLevelFor(placeIds: string[]): MapLevel {
  const points = placeIds.map((id) => MAP_PLACES[id].at);
  const near = (center: LatLon, reach: number) => points.every((point) => km(point, center) <= reach);
  if (near(MAP_PLACES.makkah.at, 45)) return "makkah";
  if (near(MAP_PLACES.madinah.at, 25)) return "madinah";
  const lats = points.map(([lat]) => lat);
  return Math.max(...lats) - Math.min(...lats) > 6 ? "arabia" : "hijaz";
}

/** How many pixels a km is on a map width × height that shows these places with room round them. */
function scaleFor(placeIds: string[], width: number, height: number) {
  const { spanX, spanY } = spread(placeIds);
  return Math.min((width - 2 * MAP_PAD.x) / spanX, (height - 2 * MAP_PAD.y) / spanY);
}

/** The part of the land (in map km) a frame width × height shows: these places in its middle, with room round them. */
export function mapViewFor(placeIds: string[], width: number, height: number): View {
  const { cx, cy } = spread(placeIds);
  const scale = scaleFor(placeIds, width, height);
  const w = width / scale;
  const h = height / scale;
  return { x: cx - w / 2, y: cy - h / 2, w, h };
}

/** How tall a map `width` wide is drawn for these places: as tall as their spread needs, within the room it has. */
export function mapHeightFor(placeIds: string[], width: number, most = MAP_MAX_HEIGHT, least = MAP_MIN_HEIGHT) {
  const { spanX, spanY } = spread(placeIds);
  const scale = (width - 2 * MAP_PAD.x) / spanX;
  const top = Math.max(least, Math.min(MAP_MAX_HEIGHT, most));
  return Math.round(Math.max(least, Math.min(top, spanY * scale + 2 * MAP_PAD.y)));
}

/** Where places stand on a map width × height that shows `viewIds` (their pixels). */
export function pinPoints(placeIds: string[], viewIds: string[], width: number, height: number): Pt[] {
  const view = mapViewFor(viewIds, width, height);
  const scale = width / view.w;
  return placeIds.map((id) => {
    const point = project(MAP_PLACES[id].at);
    return { x: (point.x - view.x) * scale, y: (point.y - view.y) * scale };
  });
}

function leastGap(points: Pt[]) {
  let least = Infinity;
  points.forEach((point, index) => {
    for (const other of points.slice(index + 1)) least = Math.min(least, distance(point, other));
  });
  return least;
}

/** The box on the main map round places shown again on the close-up: round their pictures, never smaller than a ring. */
export function zoneBox(points: Pt[]) {
  const xs = points.map((point) => point.x);
  const ys = points.map((point) => point.y);
  const pad = 9;
  let x = Math.min(...xs) - pad;
  let y = Math.min(...ys) - pad;
  let w = Math.max(...xs) - Math.min(...xs) + pad * 2;
  let h = Math.max(...ys) - Math.min(...ys) + pad * 2;
  if (w < 26) {
    x -= (26 - w) / 2;
    w = 26;
  }
  if (h < 26) {
    y -= (26 - h) / 2;
    h = 26;
  }
  return { x, y, w, h };
}

function outside(point: Pt, box: { x: number; y: number; w: number; h: number }) {
  const dx = Math.max(box.x - point.x, 0, point.x - (box.x + box.w));
  const dy = Math.max(box.y - point.y, 0, point.y - (box.y + box.h));
  return Math.hypot(dx, dy);
}

export type MapPlan = {
  /** Every answer's place, in the answers' order. */
  all: string[];
  /** The places with their own ring on the main map. */
  main: string[];
  /** Places too close together to tell apart on the main map: a box marks them on it, and a close-up under it shows them. */
  close?: string[];
};

/**
 * How the places are drawn: on one map when every two stand far enough apart there; otherwise on a main map, with the
 * places that crowd each other (Hira, Thawr and Arafah round Makkah, beside Uhud far to the north) marked by a box and
 * drawn again on a close-up under it. Undefined when that does not work either (two crowds, or a crowd too tight even
 * close up): such a question is not asked on the map.
 */
export function mapPlanFor(placeIds: string[]): MapPlan | undefined {
  if (placeIds.length < 2) return undefined;
  const width = SMALL_MAP.width;
  if (closestPins(placeIds, width, mapHeightFor(placeIds, width, SMALL_MAP.single)) >= MIN_PIN_GAP) return { all: placeIds, main: placeIds };
  // Which places run into each other on the main map (shorter, with a close-up under it).
  const mainHeight = mapHeightFor(placeIds, width, SMALL_MAP.main, SMALL_MAP.main);
  const points = pinPoints(placeIds, placeIds, width, mainHeight);
  const group = placeIds.map((_, index) => index);
  const root = (index: number): number => (group[index] === index ? index : (group[index] = root(group[index])));
  points.forEach((point, index) =>
    points.forEach((other, next) => {
      if (next > index && distance(point, other) < LINK_GAP) group[root(next)] = root(index);
    })
  );
  const crowds = new Map<number, string[]>();
  placeIds.forEach((id, index) => crowds.set(root(index), [...(crowds.get(root(index)) ?? []), id]));
  const together = [...crowds.values()].filter((crowd) => crowd.length > 1);
  if (together.length !== 1) return undefined;
  const close = together[0];
  const main = placeIds.filter((id) => !close.includes(id));
  if (!main.length) return undefined;
  // On the main map, the places left stand apart from each other and from the box...
  const mainPoints = main.map((id) => points[placeIds.indexOf(id)]);
  const box = zoneBox(close.map((id) => points[placeIds.indexOf(id)]));
  if (leastGap(mainPoints) < MIN_PIN_GAP || mainPoints.some((point) => outside(point, box) < BOX_CLEAR)) return undefined;
  // ...and on the close-up, its own places stand apart.
  if (closestPins(close, width, mapHeightFor(close, width, SMALL_MAP.close, SMALL_MAP.close)) < MIN_PIN_GAP) return undefined;
  return { all: placeIds, main, close };
}

/** How close the two closest places come on a map width × height, in pixels. */
export function closestPins(placeIds: string[], width: number, height: number) {
  const { points } = spread(placeIds);
  const scale = scaleFor(placeIds, width, height);
  let least = Infinity;
  points.forEach((point, index) => {
    for (const other of points.slice(index + 1)) least = Math.min(least, distance(point, other) * scale);
  });
  return least;
}

/** The gap between the main map and its close-up. */
export const PANEL_GAP = 16;
/** With a close-up: the least each part is drawn (less on a short phone, so both fit), and the most the close-up takes. */
const MAIN_LEAST = 170;
const CLOSE_LEAST = 150;
const SHORT_MAIN_LEAST = 128;
const SHORT_CLOSE_LEAST = 112;
const CLOSE_MOST = 260;

/** The shortest map on which `fits` holds, in small steps up to `most`. */
function leastHeight(fits: (height: number) => boolean, most: number) {
  for (let height = 2 * MAP_PAD.y + 40; height < most; height += 4) if (fits(height)) return height;
  return most;
}

/**
 * The shortest a plan's maps can be drawn `width` wide: every two places on each still MIN_PIN_GAP apart, and the
 * main map's places clear of the close-up's box. A short phone shrinks the maps this far and no further (the page
 * scrolls instead), so places never sit on each other.
 */
export function leastHeights(plan: MapPlan, width: number) {
  const close = plan.close;
  if (!close) return { main: leastHeight((height) => closestPins(plan.all, width, height) >= MIN_PIN_GAP, SMALL_MAP.single), close: 0 };
  const main = leastHeight((height) => {
    const points = pinPoints(plan.all, plan.all, width, height);
    const mainPoints = plan.main.map((id) => points[plan.all.indexOf(id)]);
    const box = zoneBox(close.map((id) => points[plan.all.indexOf(id)]));
    return leastGap(mainPoints) >= MIN_PIN_GAP && mainPoints.every((point) => outside(point, box) >= BOX_CLEAR);
  }, SMALL_MAP.main);
  return { main, close: leastHeight((height) => closestPins(close, width, height) >= MIN_PIN_GAP, SMALL_MAP.close) };
}

/**
 * How tall a plan's maps are drawn `width` wide, with `free` pixels left under the question above CHECK: one map
 * fills the room; a main map and its close-up share it, the main map a little more. On a short phone both shrink,
 * but never below leastHeights.
 */
export function mapSizes(plan: MapPlan, width: number, free: number) {
  const least = leastHeights(plan, width);
  if (!plan.close) return { main: Math.max(least.main, mapHeightFor(plan.all, width, free)), close: 0 };
  const short = free < MAIN_LEAST + PANEL_GAP + CLOSE_LEAST;
  const mainLeast = Math.max(least.main, short ? SHORT_MAIN_LEAST : MAIN_LEAST);
  const closeLeast = Math.max(least.close, short ? SHORT_CLOSE_LEAST : CLOSE_LEAST);
  const main = mapHeightFor(plan.all, width, Math.max(mainLeast, (free - PANEL_GAP) * 0.56), mainLeast);
  const close = mapHeightFor(plan.close, width, Math.min(CLOSE_MOST, Math.max(closeLeast, free - PANEL_GAP - main)), closeLeast);
  return { main, close };
}

/**
 * Each answer's place (choice id -> place id), when the question can be asked on the map: at least three answers,
 * each a different place on the map, far enough apart to tell apart on a small phone, and a question about where,
 * not about a name. Read on the English question.
 */
export function mapPlacesFor(challenge: Pick<Challenge, "prompt" | "choices" | "type">): Record<string, string> | undefined {
  if (challenge.type === "true_false" || challenge.choices.length < 3 || NAME_QUESTION.test(challenge.prompt)) return undefined;
  const places: Record<string, string> = {};
  const seen = new Set<string>();
  for (const choice of challenge.choices) {
    const place = placeOfAnswer(choice.label);
    if (!place || seen.has(place)) return undefined;
    seen.add(place);
    places[choice.id] = place;
  }
  return mapPlanFor([...seen]) ? places : undefined;
}

export type LabelBox = { x: number; y: number; w: number; h: number };
export type PlacedLabel = LabelBox & { side: "right" | "left" | "top" | "bottom"; far: boolean };

/** Half the size of a place's picture on the map. */
const GLYPH = 15;
const GAP = 3;

function overlap(a: LabelBox, b: LabelBox) {
  const x = Math.max(0, Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x));
  const y = Math.max(0, Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y));
  return x * y;
}

/**
 * Where each answer's name goes next to its place, so no two names cover each other or another place's picture, and
 * every name stays inside the frame: each place tries its four sides, close and then a little farther out (with a
 * line to its place), and takes the one that covers least. The places with the most neighbours choose first.
 */
export function placeLabels(pins: { x: number; y: number; w: number; h: number }[], width: number, height: number, avoid: LabelBox[] = []): PlacedLabel[] {
  const order = pins
    .map((pin, index) => ({ index, crowd: pins.reduce((sum, other) => sum + (other === pin ? 0 : 1 / Math.max(8, Math.hypot(other.x - pin.x, other.y - pin.y))), 0) }))
    .sort((a, b) => b.crowd - a.crowd)
    .map((item) => item.index);
  const placed: (PlacedLabel | undefined)[] = pins.map(() => undefined);
  const glyphBoxes = pins.map((pin) => ({ x: pin.x - GLYPH, y: pin.y - GLYPH, w: GLYPH * 2, h: GLYPH * 2 }));
  for (const index of order) {
    const pin = pins[index];
    const options: PlacedLabel[] = [];
    for (const far of [false, true]) {
      const out = GLYPH + GAP + (far ? 22 : 0);
      options.push(
        { side: "right", far, x: pin.x + out, y: pin.y - pin.h / 2, w: pin.w, h: pin.h },
        { side: "left", far, x: pin.x - out - pin.w, y: pin.y - pin.h / 2, w: pin.w, h: pin.h },
        { side: "bottom", far, x: pin.x - pin.w / 2, y: pin.y + out - 4, w: pin.w, h: pin.h },
        { side: "top", far, x: pin.x - pin.w / 2, y: pin.y - out + 4 - pin.h, w: pin.w, h: pin.h }
      );
    }
    let best: PlacedLabel | undefined;
    let bestCost = Infinity;
    for (const option of options) {
      // Kept inside the frame (it slides along its side when it would leave it).
      const box = { ...option, x: Math.max(4, Math.min(width - 4 - option.w, option.x)), y: Math.max(4, Math.min(height - 4 - option.h, option.y)) };
      const slid = Math.abs(box.x - option.x) + Math.abs(box.y - option.y);
      let cost = slid * 2 + (option.far ? 40 : 0);
      placed.forEach((other) => {
        if (other) cost += overlap(box, other) * 10;
      });
      // Another place's picture under a name hides it; its own is beside it by design.
      glyphBoxes.forEach((glyph, other) => {
        if (other !== index) cost += overlap(box, glyph) * 6;
      });
      // Nor the close-up's box on the main map.
      avoid.forEach((area) => {
        cost += overlap(box, area) * 6;
      });
      if (cost < bestCost) {
        bestCost = cost;
        best = box;
      }
    }
    placed[index] = best;
  }
  return placed as PlacedLabel[];
}
