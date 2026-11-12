import React, { useEffect, useMemo, useRef } from "react";
import { Animated, Easing, Platform, StyleSheet, Text, View } from "react-native";
import { SvgXml } from "react-native-svg";
import { MAP_PLACES, SEA_LABELS, shownFor, type LabelSide, type MapLeg, type MapScene } from "../../data/seerahMap";
import type { LatLon } from "../../data/seerahMapGeo";
import { t } from "../../i18n";
import { colors, fonts } from "../theme";
import { besideLine, distance, evenPoints, fitView, kmBetween, lineLength, pixels, pointAlong, roundKm, smoothLine, type Pt } from "./mapGeometry";
import { useLiteMotion } from "../liteMotion";
import { MapTouch, Night } from "./mapEffects";
import { seaShown, terrainSvg } from "./mapTerrain";

/**
 * One Seerah map: the land (mapTerrain), the places with their names, and the roads, which draw themselves dot by dot
 * behind a moving marker, one after the other, in the order they were travelled. Notes ("Three nights") come up as the
 * road reaches their place. Everything moves from one value on the native driver; with reduce motion (`still`) the
 * whole map shows at once.
 *
 * Only places, roads, weather and things are drawn: never the Prophet ﷺ, a Companion, or anyone at all. The marker
 * at the head of a road is a plain glowing dot.
 */

export type JourneyMapProps = {
  scene: MapScene;
  width: number;
  height: number;
  /** The lesson the map is for: its own roads, notes and touches show (none when the whole life plays). */
  lessonSlug?: string;
  /** The place the lesson is about: it gets a pulsing ring. */
  focus?: string;
  still?: boolean;
  /** Changing it draws the roads again. */
  play?: number;
  delay?: number;
  /** Called once the roads are drawn. */
  onDrawn?: () => void;
};

export const ROAD_LOOK: Record<MapLeg["kind"], { color: string; dot: number; ring: number; gap: number }> = {
  his: { color: "#E04E2B", dot: 7.5, ring: 1.6, gap: 8.5 },
  home: { color: "#F08A5D", dot: 6, ring: 1.3, gap: 8.5 },
  army: { color: "#7E57C8", dot: 6.5, ring: 1.4, gap: 8 },
  pilgrims: { color: "#1E9E6A", dot: 6.5, ring: 1.4, gap: 8 },
  sea: { color: "#1D5E9E", dot: 6.5, ring: 1.4, gap: 8 },
  letter: { color: "#2F7FD8", dot: 6, ring: 1.3, gap: 7.5 },
  trench: { color: "#5B3A21", dot: 4.5, ring: 0, gap: 2.2 }
};

const PER_SEGMENT = 12;
// The roads are drawn between these two moments of the map's progress; the rest is for the notes to settle.
const DRAW_FROM = 0.04;
const DRAW_TO = 0.9;
const GLYPH_RADIUS = 13;
const MAX_DOTS = 170;
const HEAD = 16;

type Track = {
  index: number;
  leg: MapLeg;
  line: Pt[];
  ends: [LatLon, LatLon];
  dots: (Pt & { along: number })[];
  /** How far along the road each of its named places is (0 to 1). */
  stops: Record<string, number>;
  start: number;
  end: number;
};

const resolve = (point: string | LatLon): LatLon => (typeof point === "string" ? MAP_PLACES[point].at : point);

/** Strictly rising input for interpolate (equal keys are nudged apart). */
function rising(keys: number[]) {
  const out: number[] = [];
  keys.forEach((key, index) => out.push(index > 0 && key <= out[index - 1] ? out[index - 1] + 1e-4 : key));
  return out;
}

/** 0 before `at`, 1 a moment after it. */
function appear(progress: Animated.Value, at: number, span = 0.03) {
  const from = Math.max(0, Math.min(at, 1 - span));
  return progress.interpolate({ inputRange: [from, from + span], outputRange: [0, 1], extrapolate: "clamp" });
}

/** The roads of a scene as dots in pixels, each with the moment it appears. */
function buildTracks(scene: MapScene, lessonSlug: string | undefined, at: (latLon: LatLon) => Pt) {
  const shown = scene.legs.map((leg, index) => ({ leg, index })).filter(({ leg }) => shownFor(leg, lessonSlug));
  const twoWays = shown.some(({ leg }) => leg.kind === "home");
  const tracks: Track[] = shown.map(({ leg, index }) => {
    const latLons = leg.path.map(resolve);
    const raw = latLons.map(at);
    let line = smoothLine(raw, PER_SEGMENT);
    // There and back on the same road: each way keeps to its own side.
    if (twoWays && (leg.kind === "his" || leg.kind === "home")) line = besideLine(line, 3.5);
    const total = lineLength(line) || 1;
    const stops: Record<string, number> = {};
    let walked = 0;
    let pointIndex = 0;
    leg.path.forEach((point, order) => {
      const target = raw.length < 3 ? order : order * PER_SEGMENT;
      while (pointIndex < target && pointIndex < line.length - 1) {
        walked += distance(line[pointIndex], line[pointIndex + 1]);
        pointIndex += 1;
      }
      if (typeof point === "string" && stops[point] === undefined) stops[point] = walked / total;
    });
    return { index, leg, line, ends: [latLons[0], latLons[latLons.length - 1]], dots: [], stops, start: 0, end: 0 };
  });

  // Each road takes time by its length; the letters go out together; a short rest between one road and the next.
  const weights = tracks.map((track) => Math.max(0.5, lineLength(track.line) / 150));
  const windows: { from: number; to: number }[] = [];
  let cursor = 0;
  tracks.forEach((track, order) => {
    const withPrevious = order > 0 && track.leg.kind === "letter" && tracks[order - 1].leg.kind === "letter";
    if (withPrevious) {
      const previous = windows[order - 1];
      windows.push(previous);
      const longer = Math.max(previous.to - previous.from, weights[order]);
      previous.to = previous.from + longer;
      cursor = previous.to;
      return;
    }
    const from = order === 0 ? 0 : cursor + 0.35;
    windows.push({ from, to: from + weights[order] });
    cursor = from + weights[order];
  });
  const span = Math.max(cursor, 1e-3);
  tracks.forEach((track, order) => {
    track.start = DRAW_FROM + (windows[order].from / span) * (DRAW_TO - DRAW_FROM);
    track.end = DRAW_FROM + (windows[order].to / span) * (DRAW_TO - DRAW_FROM);
  });

  // Dots along each road, sparser when there would be too many, kept off the places' own pictures.
  const places = scene.places.map((id) => at(MAP_PLACES[id].at));
  const length = tracks.reduce((sum, track) => sum + lineLength(track.line) / ROAD_LOOK[track.leg.kind].gap, 0);
  const thin = Math.max(1, length / MAX_DOTS);
  tracks.forEach((track) => {
    const look = ROAD_LOOK[track.leg.kind];
    track.dots = evenPoints(track.line, look.gap * thin).filter((dot) => track.leg.kind === "trench" || places.every((place) => distance(place, dot) > GLYPH_RADIUS - 1));
  });
  return { tracks, weight: cursor };
}

/** Where a place's name goes: on its side, flipped when it would leave the frame. */
function labelBox(at: Pt, side: LabelSide, text: string, width: number, height: number) {
  const guess = Math.min(150, Math.max(28, text.length * 6.6 + 12));
  let where = side;
  if (where === "left" && at.x - GLYPH_RADIUS - guess < 2) where = "right";
  else if (where === "right" && at.x + GLYPH_RADIUS + guess > width - 2) where = "left";
  if (where === "top" && at.y - GLYPH_RADIUS - 34 < 0) where = "bottom";
  else if (where === "bottom" && at.y + GLYPH_RADIUS + 34 > height) where = "top";
  const box = 156;
  switch (where) {
    case "left":
      return { where, style: { left: at.x - GLYPH_RADIUS - box, top: at.y - 9, width: box, alignItems: "flex-end" as const } };
    case "right":
      return { where, style: { left: at.x + GLYPH_RADIUS, top: at.y - 9, width: box, alignItems: "flex-start" as const } };
    case "top":
      return { where, style: { left: Math.max(2 - box / 2 + guess / 2, Math.min(width - 2 - box / 2 - guess / 2, at.x - box / 2)), top: at.y - GLYPH_RADIUS - 20, width: box, alignItems: "center" as const } };
    default:
      return { where, style: { left: Math.max(2 - box / 2 + guess / 2, Math.min(width - 2 - box / 2 - guess / 2, at.x - box / 2)), top: at.y + GLYPH_RADIUS + 2, width: box, alignItems: "center" as const } };
  }
}

/** A short note in a pill, centred on its point and kept inside the frame (by a guess at how wide its words are). */
function pillBox(at: Pt, text: string, width: number, height: number) {
  const box = 200;
  const half = Math.min(box, text.length * 6.4 + 18) / 2;
  const x = Math.max(half + 3, Math.min(width - half - 3, at.x));
  return { left: x - box / 2, top: Math.max(2, Math.min(height - 24, at.y - 11)), width: box };
}

export type Rect = { x: number; y: number; w: number; h: number };

const overlapArea = (a: Rect, b: Rect) =>
  Math.max(0, Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x)) * Math.max(0, Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y));

/** How far a point is from the nearest edge of a box (0 inside it). */
const gapTo = (rect: Rect, at: Pt) => Math.hypot(Math.max(rect.x - at.x, 0, at.x - rect.x - rect.w), Math.max(rect.y - at.y, 0, at.y - rect.y - rect.h));

/** The box a place's name takes on the map (as labelBox puts it, by a guess at how wide its words are). */
function labelRect(at: Pt, side: LabelSide, text: string, width: number, height: number): Rect {
  const guess = Math.min(150, Math.max(28, text.length * 6.6 + 12));
  const { style } = labelBox(at, side, text, width, height);
  const x = style.alignItems === "flex-end" ? style.left + style.width - guess : style.alignItems === "flex-start" ? style.left : style.left + style.width / 2 - guess / 2;
  return { x, y: style.top, w: guess, h: 17 };
}

/** The box a note's pill takes, centred on its point and kept inside the frame. */
function noteRect(point: Pt, text: string, width: number, height: number): Rect {
  const box = pillBox(point, text, width, height);
  const half = Math.min(200, text.length * 6.4 + 18) / 2;
  return { x: box.left + 100 - half, y: box.top, w: half * 2, h: 21 };
}

/** Where a road's note may sit: how far along the road (its middle first), on its left (1) or its right (-1). */
const ROAD_SPOTS: readonly (readonly [number, number])[] = [
  [0.5, 1],
  [0.5, -1],
  [0.4, 1],
  [0.6, 1],
  [0.4, -1],
  [0.6, -1],
  [0.3, 1],
  [0.7, 1],
  [0.3, -1],
  [0.7, -1]
];

/** The spots a note may take around its place: its four sides, past its name (above or below), then its corners. */
type NoteSide = LabelSide | "top-far" | "bottom-far" | "top-left" | "top-right" | "bottom-left" | "bottom-right";
const CORNERS: NoteSide[] = ["top-right", "top-left", "bottom-right", "bottom-left"];

/** Where a note on `side` of its place is centred (clear of the place's picture, and of its name for "-far"). */
function notePoint(at: Pt, side: NoteSide, text: string): Pt {
  const half = Math.min(200, text.length * 6.4 + 18) / 2;
  if (side === "left") return { x: at.x - half - GLYPH_RADIUS - 2, y: at.y };
  if (side === "right") return { x: at.x + half + GLYPH_RADIUS + 2, y: at.y };
  if (side === "top" || side === "bottom") return { x: at.x, y: at.y + (side === "bottom" ? GLYPH_RADIUS + 22 : -GLYPH_RADIUS - 22) };
  if (side === "top-far" || side === "bottom-far") return { x: at.x, y: at.y + (side === "bottom-far" ? GLYPH_RADIUS + 37 : -GLYPH_RADIUS - 37) };
  const x = at.x + (side.endsWith("right") ? half + GLYPH_RADIUS + 2 : -half - GLYPH_RADIUS - 2);
  return { x, y: at.y + (side.startsWith("bottom") ? GLYPH_RADIUS + 12 : -GLYPH_RADIUS - 12) };
}

/** The moment the roads first reach a place (0 when no road goes there). */
function reachesIn(tracks: Track[], placeId: string) {
  const times = tracks.filter((track) => track.stops[placeId] !== undefined).map((track) => track.start + track.stops[placeId] * (track.end - track.start));
  return times.length ? Math.min(...times) : 0;
}

/** When a note or touch that waits for a road comes: in the rest after that road, before the next one starts. */
function afterRoad(tracks: Track[], index: number) {
  const road = tracks.find((each) => each.index === index);
  if (!road) return undefined;
  const next = tracks.filter((each) => each.start > road.end).sort((a, b) => a.start - b.start)[0];
  return Math.min(0.96, next ? (road.end + next.start) / 2 : road.end + 0.03);
}

export type NoteSpot = { point: Pt; rect: Rect; text: string; from: number };

/**
 * Where a scene's notes go, and when each comes. Each note takes its usual spot when that is free, or else the spot
 * that covers the least: the places' names and pictures and the notes placed before it most of all, then the touches
 * and the roads' dots. A note on a road stays beside its road (its middle first, then along it, on either side). A
 * note on a place stays around its place: its own side, the other sides, past its name, then its corners. A note on a
 * place that would still cover a name, a picture or a note (a small phone, a long translation) is left out, as is one
 * that could only sit nearer another place than its own: the caption under the map says it too. Undefined for a note
 * this lesson does not show.
 */
export function placeNotes({
  scene,
  lessonSlug,
  width,
  height,
  map,
  tracks,
  say = (text, params) => t(text, params)
}: {
  scene: MapScene;
  lessonSlug?: string;
  width: number;
  height: number;
  map: { of: (latLon: LatLon) => Pt };
  tracks: Track[];
  say?: (text: string, params?: Record<string, string>) => string;
}): (NoteSpot | undefined)[] {
  const sideOf = (placeId: string): LabelSide => scene.labels?.[placeId] ?? MAP_PLACES[placeId]?.side ?? "bottom";
  // What a note must not cover (names, pictures, notes: `hard`), and what it had better not (touches, roads).
  const busy: { rect: Rect; weight: number; hard?: boolean }[] = [];
  for (const id of scene.places) {
    const at = map.of(MAP_PLACES[id].at);
    busy.push({ rect: { x: at.x - GLYPH_RADIUS, y: at.y - GLYPH_RADIUS, w: GLYPH_RADIUS * 2, h: GLYPH_RADIUS * 2 }, weight: 5, hard: true });
    busy.push({ rect: labelRect(at, sideOf(id), say(MAP_PLACES[id].name), width, height), weight: 5, hard: true });
  }
  for (const effect of scene.effects ?? []) {
    if (!shownFor(effect, lessonSlug) || effect.at === undefined || (effect.kind !== "pebbles" && effect.kind !== "sunset")) continue;
    const at = typeof effect.at === "string" ? map.of(MAP_PLACES[effect.at].at) : map.of(effect.at);
    // Where the pebbles fall (Pebbles), or the sun goes down (Sunset).
    busy.push({ rect: effect.kind === "pebbles" ? { x: at.x - 10, y: at.y - 38, w: 20, h: 40 } : { x: at.x - 30, y: at.y - 46, w: 60, h: 48 }, weight: 3 });
  }
  for (const track of tracks) for (const dot of track.dots) busy.push({ rect: { x: dot.x - 3.5, y: dot.y - 3.5, w: 7, h: 7 }, weight: 1 });
  const cost = (rect: Rect) => busy.reduce((sum, item) => sum + overlapArea(rect, item.rect) * item.weight, 0);
  const covers = (rect: Rect) => busy.reduce((sum, item) => sum + (item.hard ? overlapArea(rect, item.rect) : 0), 0);

  const spots: (NoteSpot | undefined)[] = (scene.notes ?? []).map(() => undefined);
  // Notes on roads first: they stay by their road wherever they go.
  (scene.notes ?? []).forEach((note, index) => {
    if (note.leg === undefined || !shownFor(note, lessonSlug)) return;
    const track = tracks.find((each) => each.index === note.leg);
    if (!track) return;
    const text = note.distance ? say(note.text, { km: roundKm(kmBetween(track.ends[0], track.ends[1])).toLocaleString("en-US") }) : say(note.text);
    let best: { point: Pt; rect: Rect; cost: number } | undefined;
    for (const [order, [along, side]] of ROAD_SPOTS.entries()) {
      const middle = pointAlong(track.line, along);
      const ahead = pointAlong(track.line, along + 0.03);
      const dx = ahead.x - middle.x;
      const dy = ahead.y - middle.y;
      const length = Math.hypot(dx, dy) || 1;
      // Beside the road, on its left (seen going along it) or its right, clear of the dots.
      const point = { x: middle.x + side * (dy / length) * 22, y: middle.y - side * (dx / length) * 22 };
      const rect = noteRect(point, text, width, height);
      const covered = cost(rect);
      const score = covered === 0 ? 0 : covered + order * 12;
      if (!best || score < best.cost) best = { point, rect, cost: score };
      if (score === 0) break;
    }
    spots[index] = { point: best!.point, rect: best!.rect, text, from: track.end };
    busy.push({ rect: best!.rect, weight: 5, hard: true });
  });
  (scene.notes ?? []).forEach((note, index) => {
    if (note.leg !== undefined || !note.at || !MAP_PLACES[note.at] || !shownFor(note, lessonSlug)) return;
    const at = map.of(MAP_PLACES[note.at].at);
    const text = say(note.text);
    const own: LabelSide = note.side ?? (sideOf(note.at) === "top" ? "bottom" : "top");
    const named = sideOf(note.at);
    const past: NoteSide[] = named === "top" ? ["top-far"] : named === "bottom" ? ["bottom-far"] : [];
    const sides: NoteSide[] = [own, ...(["top", "bottom", "right", "left"] as LabelSide[]).filter((side) => side !== own && side !== named), ...past, ...CORNERS];
    // A note must sit nearer its own place than any other, or it would seem to be about that one.
    const others = scene.places.filter((id) => id !== note.at).map((id) => map.of(MAP_PLACES[id].at));
    const strays = (rect: Rect) => others.some((other) => gapTo(rect, other) < gapTo(rect, at));
    let best: { point: Pt; rect: Rect; cost: number } | undefined;
    for (const [order, side] of sides.entries()) {
      const point = notePoint(at, side, text);
      const rect = noteRect(point, text, width, height);
      // A little more for each spot further down the list, so a note leaves its own side only to get clear.
      const covered = cost(rect) + (strays(rect) ? 4000 : 0);
      const score = covered === 0 ? 0 : covered + order * 12;
      if (!best || score < best.cost) best = { point, rect, cost: score };
      if (score === 0) break;
    }
    // Left out rather than laid over a name, a picture or a note (a sliver of a corner is let be), or beside another place.
    if (covers(best!.rect) > 30 || strays(best!.rect)) return;
    const from = (note.after !== undefined ? afterRoad(tracks, note.after) : undefined) ?? (reachesIn(tracks, note.at) || 0.1);
    spots[index] = { point: best!.point, rect: best!.rect, text, from };
    busy.push({ rect: best!.rect, weight: 5, hard: true });
  });
  return spots;
}

/** The boxes of a scene's place names, for checking that none covers another (tests, the gallery). */
export function placeLabelRects(scene: MapScene, width: number, height: number, say: (text: string) => string = (text) => t(text)) {
  const map = pixels(fitView(scene.box, width / height), width);
  return scene.places.map((id) => ({ id, rect: labelRect(map.of(MAP_PLACES[id].at), scene.labels?.[id] ?? MAP_PLACES[id].side ?? "bottom", say(MAP_PLACES[id].name), width, height), at: map.of(MAP_PLACES[id].at) }));
}

/** Everything a scene's map places, for checks: the roads (as dots), the place names and the notes. */
export function sceneLayout(scene: MapScene, width: number, height: number, lessonSlug?: string, say?: (text: string, params?: Record<string, string>) => string) {
  const map = pixels(fitView(scene.box, width / height), width);
  const { tracks } = buildTracks(scene, lessonSlug, map.of);
  return { tracks, labels: placeLabelRects(scene, width, height, say), notes: placeNotes({ scene, lessonSlug, width, height, map, tracks, say }) };
}

export function JourneyMap({ scene, width, height, lessonSlug, focus, still = false, play = 0, delay = 0, onDrawn }: JourneyMapProps) {
  // A slow phone keeps the touches but with fewer moving pieces.
  const lite = useLiteMotion();
  const view = useMemo(() => fitView(scene.box, width / height), [scene.box, width, height]);
  const map = useMemo(() => pixels(view, width), [view, width]);
  const places = useMemo(() => scene.places.map((id) => ({ place: MAP_PLACES[id], at: map.of(MAP_PLACES[id].at) })), [scene.places, map]);
  const terrain = useMemo(
    () => terrainSvg({ level: scene.level, view, width, height, places: places.map(({ place, at }) => ({ kind: place.kind, at })), seed: scene.id }),
    [scene.level, scene.id, view, width, height, places]
  );
  const { tracks, weight } = useMemo(() => buildTracks(scene, lessonSlug, map.of), [scene, lessonSlug, map]);
  const duration = Math.round(Math.min(5600, Math.max(2000, 1300 + weight * 700)));
  const progress = useRef(new Animated.Value(still ? 1 : 0)).current;
  const drawnRef = useRef(onDrawn);
  drawnRef.current = onDrawn;

  useEffect(() => {
    if (still) {
      progress.setValue(1);
      const timer = setTimeout(() => drawnRef.current?.(), 0);
      return () => clearTimeout(timer);
    }
    progress.setValue(0);
    const run = Animated.timing(progress, { toValue: 1, duration, delay, easing: Easing.linear, useNativeDriver: true });
    run.start();
    // Timing callbacks are not reliable everywhere (the tests run them at once): the clock says when it is drawn.
    const timer = setTimeout(() => drawnRef.current?.(), delay + duration * DRAW_TO + 250);
    return () => {
      run.stop();
      clearTimeout(timer);
    };
  }, [play, still, duration, delay, progress, scene.id, lessonSlug]);

  const reaches = (placeId: string) => reachesIn(tracks, placeId);
  const effects = (scene.effects ?? []).filter((effect) => shownFor(effect, lessonSlug));
  const night = effects.some((effect) => effect.kind === "night");
  const notes = placeNotes({ scene, lessonSlug, width, height, map, tracks });
  const focusPlace = focus ? places.find(({ place }) => place.id === focus) : undefined;
  const sideOf = (placeId: string): LabelSide => scene.labels?.[placeId] ?? MAP_PLACES[placeId]?.side ?? "bottom";
  // A sea's name once on a map, where its water is.
  const seaNames = new Set<string>();

  return (
    <View style={[styles.frame, { width, height }]} pointerEvents="none">
      <SvgXml xml={terrain} width={width} height={height} />
      {night ? <Night still={still} /> : null}
      {effects
        .filter((effect) => effect.kind !== "night" && effect.at !== undefined)
        .map((effect, index) => {
          const point = typeof effect.at === "string" ? map.of(MAP_PLACES[effect.at].at) : map.of(effect.at as LatLon);
          const from = (effect.after !== undefined ? afterRoad(tracks, effect.after) : undefined) ?? (typeof effect.at === "string" ? reaches(effect.at) : 0);
          return (
            <Animated.View key={`${effect.kind}-${index}`} style={[StyleSheet.absoluteFill, { opacity: appear(progress, from, 0.05) }]} pointerEvents="none">
              <MapTouch kind={effect.kind} at={point} still={still} lite={lite} color={night ? "#FFE58A" : ROAD_LOOK.his.color} />
              {effect.label ? (
                <View style={[styles.abs, labelBox({ x: point.x, y: point.y + 4 }, "bottom", t(effect.label), width, height).style]}>
                  <Text style={styles.campLabel} numberOfLines={2}>
                    {t(effect.label)}
                  </Text>
                </View>
              ) : null}
            </Animated.View>
          );
        })}
      {focusPlace ? <FocusRing at={focusPlace.at} still={still} shown={appear(progress, reaches(focusPlace.place.id), 0.04)} /> : null}
      {tracks.map((track) =>
        track.dots.map((dot, index) => {
          const look = ROAD_LOOK[track.leg.kind];
          const at = track.start + dot.along * (track.end - track.start);
          return (
            <Animated.View
              key={`${track.index}-${index}`}
              style={[
                styles.dot,
                {
                  left: dot.x - look.dot / 2,
                  top: dot.y - look.dot / 2,
                  width: look.dot,
                  height: look.dot,
                  borderRadius: look.dot / 2,
                  borderWidth: look.ring,
                  backgroundColor: look.color,
                  opacity: appear(progress, at, 0.012)
                }
              ]}
            />
          );
        })
      )}
      {still ? null : tracks.filter((track) => track.leg.kind !== "trench").map((track) => <RoadHead key={`head-${track.index}`} track={track} progress={progress} />)}
      {SEA_LABELS.map((sea, index) => {
        const point = seaNames.has(sea.name) ? undefined : seaShown(sea.at, view, width, height);
        if (!point) return null;
        seaNames.add(sea.name);
        return (
          <View key={`sea-${index}`} style={[styles.abs, { left: point.x - 60, top: point.y - 8, width: 120, alignItems: "center" }]}>
            <Text style={[styles.sea, night ? styles.seaNight : null]} numberOfLines={1}>
              {t(sea.name)}
            </Text>
          </View>
        );
      })}
      {places.map(({ place, at }) => {
        const name = t(place.name);
        const box = labelBox(at, sideOf(place.id), name, width, height);
        const main = place.id === focus;
        return (
          <View key={place.id} style={[styles.abs, box.style]}>
            <Text style={[styles.place, main ? styles.placeMain : null]} numberOfLines={2}>
              {name}
            </Text>
          </View>
        );
      })}
      {tracks
        .filter((track) => track.leg.label)
        .map((track) => {
          const atEnd = track.leg.kind === "letter";
          const point = pointAlong(track.line, atEnd ? 1 : 0.5);
          const from = atEnd ? track.end : track.start + 0.5 * (track.end - track.start);
          return (
            <Animated.View key={`label-${track.index}`} style={[styles.abs, pillBox({ x: point.x, y: point.y + (atEnd ? 14 : 12) }, t(track.leg.label!), width, height), styles.center, { opacity: appear(progress, from, 0.04) }]}>
              <Text style={[styles.roadLabel, { backgroundColor: ROAD_LOOK[track.leg.kind].color }]} numberOfLines={1}>
                {t(track.leg.label!)}
              </Text>
            </Animated.View>
          );
        })}
      {notes.map((spot, index) => {
        if (!spot) return null;
        const { point, text, from } = spot;
        return (
          <Animated.View
            key={`note-${index}`}
            style={[
              styles.abs,
              pillBox(point, text, width, height),
              styles.center,
              { opacity: appear(progress, from, 0.04), transform: [{ scale: progress.interpolate({ inputRange: rising([Math.max(0, from - 0.001), from + 0.03, from + 0.06]), outputRange: [0.6, 1.08, 1], extrapolate: "clamp" }) }] }
            ]}
          >
            <Text style={styles.note} numberOfLines={1}>
              {text}
            </Text>
          </Animated.View>
        );
      })}
    </View>
  );
}

/** The glowing dot at the head of a road while it is drawn. */
function RoadHead({ track, progress }: { track: Track; progress: Animated.Value }) {
  const samples = 28;
  const keys: number[] = [];
  const xs: number[] = [];
  const ys: number[] = [];
  for (let index = 0; index <= samples; index += 1) {
    const along = index / samples;
    const point = pointAlong(track.line, along);
    keys.push(track.start + along * (track.end - track.start));
    xs.push(point.x - HEAD / 2);
    ys.push(point.y - HEAD / 2);
  }
  const inputRange = rising(keys);
  const color = ROAD_LOOK[track.leg.kind].color;
  return (
    <Animated.View
      style={[
        styles.head,
        {
          opacity: progress.interpolate({ inputRange: rising([Math.max(0, track.start - 0.01), track.start, track.end, Math.min(1, track.end + 0.03)]), outputRange: [0, 1, 1, 0], extrapolate: "clamp" }),
          transform: [
            { translateX: progress.interpolate({ inputRange, outputRange: xs, extrapolate: "clamp" }) },
            { translateY: progress.interpolate({ inputRange, outputRange: ys, extrapolate: "clamp" }) }
          ]
        }
      ]}
    >
      <View style={[styles.headGlow, { backgroundColor: color }]} />
      <View style={[styles.headDot, { borderColor: color }]} />
    </Animated.View>
  );
}

/** A soft ring that keeps going out from the lesson's place. */
function FocusRing({ at, still, shown }: { at: Pt; still: boolean; shown: Animated.AnimatedInterpolation<number> }) {
  const pulse = useRef(new Animated.Value(still ? 0.4 : 0)).current;
  useEffect(() => {
    if (still) return undefined;
    const loop = Animated.loop(Animated.sequence([Animated.timing(pulse, { toValue: 1, duration: 1600, easing: Easing.out(Easing.quad), useNativeDriver: true })]));
    loop.start();
    return () => loop.stop();
  }, [pulse, still]);
  return (
    <Animated.View pointerEvents="none" style={[styles.abs, { left: at.x - 20, top: at.y - 20, width: 40, height: 40, opacity: shown }]}>
      <View style={styles.focusHalo} />
      <Animated.View
        style={[
          styles.focusRing,
          {
            opacity: pulse.interpolate({ inputRange: [0, 1], outputRange: [0.95, 0] }),
            transform: [{ scale: pulse.interpolate({ inputRange: [0, 1], outputRange: [0.75, 1.75] }) }]
          }
        ]}
      />
    </Animated.View>
  );
}

const halo = { textShadowColor: "rgba(255,255,255,0.95)", textShadowOffset: { width: 0, height: 0 }, textShadowRadius: 3 };

const styles = StyleSheet.create({
  // A map reads the same in every language: east is on the right (the app's own layout turns over for Urdu and Arabic).
  frame: { overflow: "hidden", backgroundColor: "#F1DFB9", ...(Platform.OS === "web" ? null : { direction: "ltr" as const }) },
  abs: { position: "absolute" },
  center: { alignItems: "center" },
  dot: { position: "absolute", borderColor: colors.white },
  head: { position: "absolute", left: 0, top: 0, width: HEAD, height: HEAD, alignItems: "center", justifyContent: "center" },
  headGlow: { position: "absolute", width: HEAD, height: HEAD, borderRadius: HEAD / 2, opacity: 0.3 },
  headDot: { width: 10, height: 10, borderRadius: 5, borderWidth: 3, backgroundColor: colors.white },
  focusHalo: { position: "absolute", left: 4, top: 4, width: 32, height: 32, borderRadius: 16, borderWidth: 2, borderColor: "rgba(255,194,26,0.85)" },
  focusRing: { position: "absolute", left: 2, top: 2, width: 36, height: 36, borderRadius: 18, borderWidth: 3, borderColor: colors.gold },
  place: {
    fontFamily: fonts.bodyHeavy,
    fontSize: 12,
    lineHeight: 15,
    color: colors.ink,
    backgroundColor: "rgba(255,255,255,0.8)",
    borderRadius: 6,
    overflow: "hidden",
    paddingHorizontal: 5,
    paddingVertical: 1,
    maxWidth: 150,
    ...halo
  },
  placeMain: { backgroundColor: "#FFF3C4", color: "#5C4100", borderWidth: 1.5, borderColor: colors.gold },
  sea: { fontFamily: fonts.bodyBold, fontSize: 11, lineHeight: 14, letterSpacing: 0.6, color: "#2B78A0", opacity: 0.9 },
  seaNight: { color: "#CFE8F6" },
  campLabel: {
    fontFamily: fonts.bodyHeavy,
    fontSize: 11,
    lineHeight: 14,
    color: colors.ink,
    backgroundColor: "rgba(255,255,255,0.72)",
    borderRadius: 6,
    overflow: "hidden",
    paddingHorizontal: 4,
    textAlign: "center",
    maxWidth: 104
  },
  roadLabel: {
    fontFamily: fonts.bodyHeavy,
    fontSize: 11,
    lineHeight: 15,
    color: colors.white,
    borderRadius: 8,
    overflow: "hidden",
    paddingHorizontal: 7,
    paddingVertical: 1
  },
  note: {
    fontFamily: fonts.bodyHeavy,
    fontSize: 11.5,
    lineHeight: 15,
    color: "#7A2E14",
    backgroundColor: colors.white,
    borderWidth: 1.5,
    borderColor: "#E04E2B",
    borderRadius: 9,
    overflow: "hidden",
    paddingHorizontal: 7,
    paddingVertical: 2
  }
});
