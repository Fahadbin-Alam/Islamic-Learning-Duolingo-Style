import type { MapBox } from "../../data/seerahMap";
import type { LatLon } from "../../data/seerahMapGeo";

/**
 * The map's ruler. Places are put on a flat map in kilometres (an equirectangular projection, true at 26° north, the
 * middle of the Hijaz), so a road a hundred kilometres long is drawn as long wherever it is. A view is the part of the
 * flat map one frame shows; `pixels` turns map kilometres into the frame's pixels.
 */

export type Pt = { x: number; y: number };
export type View = { x: number; y: number; w: number; h: number };

const KM_PER_DEGREE = 111.32;
const EAST_SCALE = Math.cos((26 * Math.PI) / 180);
const EARTH_RADIUS_KM = 6371;

/** A [lat, lon] point on the flat map, in km east and south of 34°N 30°E. */
export function project([lat, lon]: LatLon): Pt {
  return { x: (lon - 30) * KM_PER_DEGREE * EAST_SCALE, y: (34 - lat) * KM_PER_DEGREE };
}

/** Kilometres per degree of latitude, for sizes given in km (an oasis's radius). */
export const KM_PER_LAT = KM_PER_DEGREE;
/** Kilometres per degree of longitude on the flat map. */
export const KM_PER_LON = KM_PER_DEGREE * EAST_SCALE;

/**
 * The view that shows `box` with a margin, widened in one direction to fill a frame `aspect` wide (width over height),
 * so nothing is squeezed.
 */
export function fitView(box: MapBox, aspect: number, margin = 0.06): View {
  const topLeft = project([box.north, box.west]);
  const bottomRight = project([box.south, box.east]);
  let w = Math.max(1, bottomRight.x - topLeft.x);
  let h = Math.max(1, bottomRight.y - topLeft.y);
  w *= 1 + 2 * margin;
  h *= 1 + 2 * margin;
  if (w / h < aspect) w = h * aspect;
  else h = w / aspect;
  const cx = (topLeft.x + bottomRight.x) / 2;
  const cy = (topLeft.y + bottomRight.y) / 2;
  return { x: cx - w / 2, y: cy - h / 2, w, h };
}

/** Map km to a frame's pixels (the frame has the view's own aspect). */
export function pixels(view: View, width: number) {
  const scale = width / view.w;
  return {
    scale,
    at: (point: Pt): Pt => ({ x: (point.x - view.x) * scale, y: (point.y - view.y) * scale }),
    of: (latLon: LatLon): Pt => {
      const point = project(latLon);
      return { x: (point.x - view.x) * scale, y: (point.y - view.y) * scale };
    }
  };
}

export function distance(a: Pt, b: Pt) {
  return Math.hypot(b.x - a.x, b.y - a.y);
}

/** The great-circle distance between two [lat, lon] points, in km. */
export function kmBetween([lat1, lon1]: LatLon, [lat2, lon2]: LatLon) {
  const rad = Math.PI / 180;
  const dLat = (lat2 - lat1) * rad;
  const dLon = (lon2 - lon1) * rad;
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * rad) * Math.cos(lat2 * rad) * Math.sin(dLon / 2) ** 2;
  return 2 * EARTH_RADIUS_KM * Math.asin(Math.min(1, Math.sqrt(a)));
}

/** A distance said the way people say it: 1,230 km is about 1,200; 342 about 340; 46 about 45. */
export function roundKm(km: number) {
  const step = km >= 1000 ? 100 : km >= 100 ? 10 : 5;
  return Math.max(step, Math.round(km / step) * step);
}

/**
 * A smooth road through its points (centripetal Catmull-Rom: it bends through every point without loops or
 * overshoot, even where two points sit close together, as Quba and Madinah do).
 */
export function smoothLine(points: Pt[], perSegment = 12): Pt[] {
  if (points.length < 3) return points.slice();
  const out: Pt[] = [];
  const last = points.length - 1;
  const mirror = (a: Pt, b: Pt): Pt => ({ x: 2 * a.x - b.x, y: 2 * a.y - b.y });
  for (let index = 0; index < last; index += 1) {
    const p1 = points[index];
    const p2 = points[index + 1];
    const p0 = index > 0 ? points[index - 1] : mirror(p1, p2);
    const p3 = index + 2 <= last ? points[index + 2] : mirror(p2, p1);
    for (let step = 0; step < perSegment; step += 1) out.push(centripetal(p0, p1, p2, p3, step / perSegment));
  }
  out.push(points[last]);
  return out;
}

function centripetal(p0: Pt, p1: Pt, p2: Pt, p3: Pt, u: number): Pt {
  const knot = (a: Pt, b: Pt) => Math.max(1e-4, Math.sqrt(distance(a, b)));
  const t0 = 0;
  const t1 = t0 + knot(p0, p1);
  const t2 = t1 + knot(p1, p2);
  const t3 = t2 + knot(p2, p3);
  const t = t1 + (t2 - t1) * u;
  const mix = (a: Pt, b: Pt, ta: number, tb: number): Pt => {
    const w = (t - ta) / (tb - ta);
    return { x: a.x + (b.x - a.x) * w, y: a.y + (b.y - a.y) * w };
  };
  const a1 = mix(p0, p1, t0, t1);
  const a2 = mix(p1, p2, t1, t2);
  const a3 = mix(p2, p3, t2, t3);
  const b1 = mix(a1, a2, t0, t2);
  const b2 = mix(a2, a3, t1, t3);
  return mix(b1, b2, t1, t2);
}

export function lineLength(points: Pt[]) {
  let total = 0;
  for (let index = 1; index < points.length; index += 1) total += distance(points[index - 1], points[index]);
  return total;
}

/** The point `along` (0 to 1) of the way down a line. */
export function pointAlong(points: Pt[], along: number): Pt {
  if (points.length === 0) return { x: 0, y: 0 };
  const total = lineLength(points);
  let left = Math.max(0, Math.min(1, along)) * total;
  for (let index = 1; index < points.length; index += 1) {
    const piece = distance(points[index - 1], points[index]);
    if (piece >= left && piece > 0) {
      const w = left / piece;
      return { x: points[index - 1].x + (points[index].x - points[index - 1].x) * w, y: points[index - 1].y + (points[index].y - points[index - 1].y) * w };
    }
    left -= piece;
  }
  return points[points.length - 1];
}

/** Points every `spacing` pixels down a line, each with how far along it is (0 to 1). The two ends are always in. */
export function evenPoints(points: Pt[], spacing: number): (Pt & { along: number })[] {
  const total = lineLength(points);
  if (points.length === 0) return [];
  if (total <= 0) return [{ ...points[0], along: 1 }];
  const count = Math.max(1, Math.round(total / Math.max(1, spacing)));
  return Array.from({ length: count + 1 }, (_, index) => ({ ...pointAlong(points, index / count), along: index / count }));
}

/** The line moved `offset` pixels to its right (seen going along it): a way back drawn beside the way there. */
export function besideLine(points: Pt[], offset: number): Pt[] {
  if (points.length < 2 || offset === 0) return points.slice();
  return points.map((point, index) => {
    const before = points[Math.max(0, index - 1)];
    const after = points[Math.min(points.length - 1, index + 1)];
    const dx = after.x - before.x;
    const dy = after.y - before.y;
    const length = Math.hypot(dx, dy) || 1;
    // Screen y points down, so (-dy, dx) is to the right of the way the line goes.
    return { x: point.x - (dy / length) * offset, y: point.y + (dx / length) * offset };
  });
}

/** Is the point inside the polygon (even-odd rule)? */
export function inside(point: Pt, polygon: Pt[]) {
  let hit = false;
  for (let index = 0, previous = polygon.length - 1; index < polygon.length; previous = index, index += 1) {
    const a = polygon[index];
    const b = polygon[previous];
    if (a.y > point.y !== b.y > point.y && point.x < ((b.x - a.x) * (point.y - a.y)) / (b.y - a.y || 1e-9) + a.x) hit = !hit;
  }
  return hit;
}

/** The same random numbers every time for the same seed, so a map's hills never jump about between renders. */
export function seeded(seed: string) {
  let state = 2166136261;
  for (let index = 0; index < seed.length; index += 1) state = Math.imul(state ^ seed.charCodeAt(index), 16777619);
  return () => {
    state = (state + 0x6d2b79f5) | 0;
    let value = Math.imul(state ^ (state >>> 15), 1 | state);
    value = (value + Math.imul(value ^ (value >>> 7), 61 | value)) ^ value;
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

/** A number cut to two decimals, for short SVG paths. */
export function n(value: number) {
  return Math.round(value * 100) / 100;
}
