import React, { useEffect, useMemo, useRef } from "react";
import { Animated, Easing, Platform, StyleSheet, Text, View } from "react-native";
import { SvgXml } from "react-native-svg";
import { MAP_PLACES, SEA_LABELS, shownFor, type LabelSide, type MapLeg, type MapScene } from "../../data/seerahMap";
import type { LatLon } from "../../data/seerahMapGeo";
import { t } from "../../i18n";
import { colors, fonts } from "../theme";
import { besideLine, distance, evenPoints, fitView, kmBetween, lineLength, pixels, pointAlong, roundKm, smoothLine, type Pt } from "./mapGeometry";
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

export function JourneyMap({ scene, width, height, lessonSlug, focus, still = false, play = 0, delay = 0, onDrawn }: JourneyMapProps) {
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

  /** The moment the roads first reach a place (0 when no road goes there). */
  const reaches = (placeId: string) => {
    const times = tracks.filter((track) => track.stops[placeId] !== undefined).map((track) => track.start + track.stops[placeId] * (track.end - track.start));
    return times.length ? Math.min(...times) : 0;
  };
  const effects = (scene.effects ?? []).filter((effect) => shownFor(effect, lessonSlug));
  const night = effects.some((effect) => effect.kind === "night");
  const notes = (scene.notes ?? []).filter((note) => shownFor(note, lessonSlug));
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
          const from = typeof effect.at === "string" ? reaches(effect.at) : 0;
          return (
            <Animated.View key={`${effect.kind}-${index}`} style={[StyleSheet.absoluteFill, { opacity: appear(progress, from, 0.05) }]} pointerEvents="none">
              <MapTouch kind={effect.kind} at={point} still={still} color={night ? "#FFE58A" : ROAD_LOOK.his.color} />
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
      {notes.map((note, index) => {
        let point: Pt | undefined;
        let from = 0.1;
        let text = t(note.text);
        if (note.leg !== undefined) {
          const track = tracks.find((each) => each.index === note.leg);
          if (!track) return null;
          const middle = pointAlong(track.line, 0.5);
          const after = pointAlong(track.line, 0.53);
          const dx = after.x - middle.x;
          const dy = after.y - middle.y;
          const length = Math.hypot(dx, dy) || 1;
          // Beside the road's middle, on its left (seen going along it), clear of the dots.
          point = { x: middle.x + (dy / length) * 22, y: middle.y - (dx / length) * 22 };
          from = track.end;
          if (note.distance) text = t(note.text, { km: roundKm(kmBetween(track.ends[0], track.ends[1])).toLocaleString("en-US") });
        } else if (note.at && MAP_PLACES[note.at]) {
          const at = map.of(MAP_PLACES[note.at].at);
          const side = note.side ?? (sideOf(note.at) === "top" ? "bottom" : "top");
          const room = Math.min(150, text.length * 6.4 + 18) / 2 + GLYPH_RADIUS + 2;
          point =
            side === "left"
              ? { x: at.x - room, y: at.y }
              : side === "right"
                ? { x: at.x + room, y: at.y }
                : { x: at.x, y: at.y + (side === "bottom" ? GLYPH_RADIUS + 22 : -GLYPH_RADIUS - 22) };
          from = reaches(note.at) || 0.1;
        }
        if (!point) return null;
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
