import React, { useEffect, useMemo, useRef } from "react";
import { Animated, Easing, StyleSheet, Text, View } from "react-native";
import { SvgXml } from "react-native-svg";
import type { SkyScene } from "../../data/daySky";
import { t } from "../../i18n";
import { useLiteMotion } from "../liteMotion";
import { fonts } from "../theme";
import {
  ARROW,
  CALF_BODY,
  CALF_LEGS_A,
  CALF_LEGS_B,
  DARK_KEYS,
  HEAT,
  LOW_SUN,
  MOON,
  PALM,
  SMALL_PALM,
  STAR,
  STAR_KEYS,
  SUN_KEYS,
  WORD,
  arrowAt,
  arrowPath,
  calvesAt,
  dawnBandSvg,
  dayHour,
  groundSvg,
  hillPaths,
  hillShadowSvg,
  keyed,
  overHours,
  palmAt,
  palmShadowSvg,
  skyKeysFor,
  skyLayerSvg,
  skyLayout,
  smallPalmAt,
  sunAt,
  sunHeight,
  sunSvg,
  threadAt,
  type SkyFrame,
  type WordBox
} from "./skyArt";

/**
 * The day's sky over the sand near Madinah, facing south: the sun rises in the east on the left and sets in the west
 * on the right. A scene plays the sky from one hour to another, the sun moving along its arc and the sky's colours
 * changing with it, the stars and the moon coming out at night, the palm's shadow and the hills' shadows turning with
 * the sun; then its touches (the white thread of dawn, the midday heat, the young camels, the arrow after Maghrib,
 * night coming from the east) and the prayers' names as the day reaches each. Nothing in it is a person or an angel.
 *
 * Everything moves on the native driver, from the one value of the hour; with reduce motion (or Calm mode) the sky
 * shows its end at once and stands still, and on a slow phone it keeps fewer stars and the palm does not sway.
 */

export type DaySkyProps = {
  scene: SkyScene;
  width: number;
  height: number;
  still?: boolean;
  /** Bump to play the sky again. */
  play?: number;
  delay?: number;
  /** Called once the sky has played to its end. */
  onDrawn?: () => void;
};

/** How long a sky takes to play: longer for more hours, never too quick or too slow. */
export const skyDuration = (scene: SkyScene) => Math.round(Math.min(5200, Math.max(2000, 1300 + (scene.to - scene.from) * 330)));

// Each sky's gradients get their own names, so two skies on one web page keep their own colours.
let skyCount = 0;

/** A value that runs from 0 to 1 again and again, `ms` each time (a lone loop does not run on the web; in a sequence it does). */
function useLoop(ms: number, still: boolean) {
  const value = useRef(new Animated.Value(still ? 0.4 : 0)).current;
  useEffect(() => {
    if (still) return undefined;
    const loop = Animated.loop(Animated.sequence([Animated.timing(value, { toValue: 1, duration: ms, easing: Easing.linear, useNativeDriver: true })]));
    loop.start();
    return () => loop.stop();
  }, [ms, still, value]);
  return value;
}

/** A small, steady random number for the `index`th star of a sky. */
const rand = (seed: number, index: number) => {
  const x = Math.sin(seed * 12.9898 + index * 78.233) * 43758.5453;
  return x - Math.floor(x);
};

// How low and orange the sun is: all orange by the horizon, none once it is high.
const LOW_KEYS: readonly [number, number][] = [
  [0, 1],
  [6.5, 1],
  [8, 0],
  [16.2, 0],
  [17.6, 1],
  [24, 1]
];
// Sunrise's warm glow in the east.
const EAST_GLOW: readonly [number, number][] = [
  [0, 0],
  [5, 0],
  [5.6, 0.5],
  [6, 0.9],
  [6.6, 0.3],
  [7.3, 0],
  [24, 0]
];
// The first light of dawn, white along the horizon in the east.
const DAWN_BAND: readonly [number, number][] = [
  [0, 0],
  [4.4, 0],
  [4.95, 0.75],
  [5.5, 0.85],
  [6, 0.3],
  [6.4, 0],
  [24, 0]
];
const WEST_GLOW: readonly [number, number][] = [
  [0, 0],
  [17, 0],
  [17.8, 0.6],
  [18.2, 0.9],
  [18.8, 0.45],
  [19.4, 0],
  [24, 0]
];
// The hills' shadows: west of them in the morning, east of them in the afternoon (Sahih al-Bukhari 539).
const WEST_SHADE: readonly [number, number][] = [
  [0, 0],
  [6.2, 0],
  [7, 0.55],
  [10.5, 0.25],
  [11.8, 0],
  [24, 0]
];
const EAST_SHADE: readonly [number, number][] = [
  [0, 0],
  [12.2, 0],
  [13.4, 0.4],
  [15, 0.55],
  [17.6, 0.55],
  [18.2, 0],
  [24, 0]
];
const THREAD_KEYS: readonly [number, number][] = [
  [0, 0],
  [4, 0],
  [4.75, 1],
  [5.6, 1],
  [6.2, 0],
  [24, 0]
];
// The midday heat, gone once it has cooled.
const HEAT_KEYS: readonly [number, number][] = [
  [0, 0],
  [11, 0],
  [11.8, 1],
  [12.7, 1],
  [13.8, 0],
  [24, 0]
];
// Night coming from the east as the sun goes down in the west (Sahih al-Bukhari 1954, 1956).
const VEIL_KEYS: readonly [number, number][] = [
  [0, 0.85],
  [6, 0.85],
  [6.5, 0],
  [17.2, 0],
  [18.2, 0.85],
  [24, 0.85]
];
const AFTER_SUNSET: readonly [number, number][] = [
  [0, 1],
  [6, 1],
  [6.1, 0],
  [18, 0],
  [18.25, 1],
  [24, 1]
];

/** The palm's shadow, as long as the sun is low (the palm's height over the tangent of the sun's height). */
function shadowLength(palmTall: number, hour: number) {
  const height = sunHeight(hour);
  if (height <= 4) return 0;
  return Math.min(2.4 * palmTall, palmTall / Math.tan((height * Math.PI) / 180));
}

/** A dark copy of a picture, for the night. */
const darken = (svg: string, color = "#0B1233") => svg.replace(/fill="#[0-9A-Fa-f]{6}"/g, `fill="${color}"`).replace(/stroke="#[0-9A-Fa-f]{6}"/g, `stroke="${color}"`);

function Calf({ size, step, flip, shift }: { size: number; step: Animated.AnimatedInterpolation<number> | Animated.Value; flip?: boolean; shift: number }) {
  const width = Math.round(size * 1.25);
  const color = "#B9864F";
  const legs = (d: string) => `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${size}" viewBox="0 0 36 28"><path d="${d}" stroke="${color}" stroke-width="2.2" stroke-linecap="round" fill="none"/></svg>`;
  const body = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${size}" viewBox="0 0 36 28"><path d="${CALF_BODY}" fill="${color}"/><path d="M5.4 15 Q3.2 17.6 4.2 21" stroke="${color}" stroke-width="1.3" stroke-linecap="round" fill="none"/><circle cx="29.3" cy="8.6" r="0.75" fill="#3B2412"/></svg>`;
  const phase = Animated.modulo(Animated.add(step, shift), 1);
  const a = phase.interpolate({ inputRange: [0, 0.49, 0.5, 1], outputRange: [1, 1, 0, 0] });
  const b = phase.interpolate({ inputRange: [0, 0.49, 0.5, 1], outputRange: [0, 0, 1, 1] });
  const hop = phase.interpolate({ inputRange: [0, 0.25, 0.5, 0.75, 1], outputRange: [0, -1.2, 0, -1.2, 0] });
  return (
    <Animated.View style={{ width, height: size, transform: [{ translateY: hop }, { scaleX: flip ? -1 : 1 }] }}>
      <Animated.View style={[StyleSheet.absoluteFill, { opacity: a }]}>
        <SvgXml xml={legs(CALF_LEGS_A)} width={width} height={size} />
      </Animated.View>
      <Animated.View style={[StyleSheet.absoluteFill, { opacity: b }]}>
        <SvgXml xml={legs(CALF_LEGS_B)} width={width} height={size} />
      </Animated.View>
      <SvgXml xml={body} width={width} height={size} />
    </Animated.View>
  );
}

const ANCHOR = { left: "flex-start", right: "flex-end" } as const;

/** A word in the sky: a small dark pill, as wide as its word, so it reads by day and by night. */
function Word({ text, rect, opacity, testID }: { text: string; rect: WordBox; opacity?: Animated.AnimatedInterpolation<number>; testID?: string }) {
  return (
    <Animated.View pointerEvents="none" style={[styles.wordBox, { left: rect.x, top: rect.y, width: rect.w, height: rect.h, alignItems: ANCHOR[rect.anchor], opacity: opacity ?? 1 }]}>
      <View style={styles.word} testID={testID}>
        <Text style={styles.wordText} numberOfLines={1}>
          {text}
        </Text>
      </View>
    </Animated.View>
  );
}

export function DaySky({ scene, width, height, still = false, play = 0, delay = 0, onDrawn }: DaySkyProps) {
  const lite = useLiteMotion();
  const id = useRef(`sky${(skyCount += 1)}`).current;
  const layout = useMemo(() => skyLayout(scene, width, height, (text) => t(text)), [scene, width, height]);
  const frame: SkyFrame = layout.frame;
  const keys = useMemo(() => skyKeysFor(scene.from, scene.to), [scene.from, scene.to]);
  const layers = useMemo(() => keys.map((key, index) => skyLayerSvg(frame, key.top, key.low, `${id}k${index}`)), [keys, frame, id]);
  const ground = useMemo(() => groundSvg(frame, scene.id, `${id}g`), [frame, scene.id, id]);
  const groundDark = useMemo(() => {
    const { left, right } = hillPaths(frame);
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${frame.width}" height="${frame.height}" viewBox="0 0 ${frame.width} ${frame.height}"><path d="${left}" fill="#0B1233"/><path d="${right}" fill="#0B1233"/><rect x="0" y="${frame.horizon}" width="${frame.width}" height="${frame.height - frame.horizon}" fill="#0B1233"/></svg>`;
  }, [frame]);
  const shades = useMemo(() => ({ east: hillShadowSvg(frame, "east", `${id}e`), west: hillShadowSvg(frame, "west", `${id}w`) }), [frame, id]);
  const dawnBand = useMemo(() => dawnBandSvg(frame, `${id}d`), [frame, id]);
  const glow = useMemo(
    () => (side: "east" | "west") =>
      `<svg xmlns="http://www.w3.org/2000/svg" width="${frame.width}" height="${frame.height}" viewBox="0 0 ${frame.width} ${frame.height}"><defs><radialGradient id="${id}${side}" cx="${side === "east" ? 0.1 : 0.9}" cy="1" r="0.62"><stop offset="0" stop-color="${side === "east" ? "#FFE3B0" : "#FFB070"}" stop-opacity="0.9"/><stop offset="0.45" stop-color="${side === "east" ? "#F7B9A0" : "#F07A5A"}" stop-opacity="0.35"/><stop offset="1" stop-color="#F07A5A" stop-opacity="0"/></radialGradient></defs><rect width="${frame.width}" height="${frame.horizon}" fill="url(#${id}${side})"/></svg>`,
    [frame, id]
  );
  const veil = useMemo(
    () =>
      `<svg xmlns="http://www.w3.org/2000/svg" width="${frame.width}" height="${frame.height}" viewBox="0 0 ${frame.width} ${frame.height}"><defs><linearGradient id="${id}v" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#0B1438" stop-opacity="0.92"/><stop offset="0.55" stop-color="#0B1438" stop-opacity="0.45"/><stop offset="1" stop-color="#0B1438" stop-opacity="0"/></linearGradient></defs><rect width="${frame.width}" height="${frame.horizon}" fill="url(#${id}v)"/></svg>`,
    [frame, id]
  );

  const hour = useRef(new Animated.Value(still ? scene.to : scene.from)).current;
  const drawnRef = useRef(onDrawn);
  drawnRef.current = onDrawn;
  const duration = skyDuration(scene);

  useEffect(() => {
    if (still) {
      hour.setValue(scene.to);
      const timer = setTimeout(() => drawnRef.current?.(), 0);
      return () => clearTimeout(timer);
    }
    hour.setValue(scene.from);
    const run = Animated.timing(hour, { toValue: scene.to, duration, delay, easing: Easing.inOut(Easing.quad), useNativeDriver: true });
    run.start();
    // Timing callbacks are not reliable everywhere (the tests run them at once): the clock says when it has played.
    const timer = setTimeout(() => drawnRef.current?.(), delay + duration + 250);
    return () => {
      run.stop();
      clearTimeout(timer);
    };
  }, [play, still, duration, delay, hour, scene.from, scene.to, scene.id]);

  const slow = useLoop(5200, still || lite);
  const fast = useLoop(900, still);
  const flight = useLoop(3400, still);

  const by = (keysFor: readonly [number, number][], scale = 1) => hour.interpolate(overHours(scene.from, scene.to, (h) => keyed(keysFor, h) * scale));
  const touches = new Set(scene.touches ?? []);

  // The sun on its arc.
  const sunBox = Math.round((frame.sunR * 100) / 19);
  const sunX = hour.interpolate(overHours(scene.from, scene.to, (h) => sunAt(frame, h).x - sunBox / 2));
  const sunY = hour.interpolate(overHours(scene.from, scene.to, (h) => sunAt(frame, h).y - sunBox / 2));
  const sunShown = by(SUN_KEYS);
  const lowSun = hour.interpolate(overHours(scene.from, scene.to, (h) => keyed(SUN_KEYS, h) * keyed(LOW_KEYS, h)));

  // The stars, the fewer on a slow phone.
  const starCount = lite ? 10 : 22;
  const seed = scene.id.length * 7 + 3;
  const stars = Array.from({ length: starCount }, (_, index) => ({
    x: Math.round(rand(seed, index) * (frame.width - 8)),
    y: Math.round(4 + rand(seed, index + 40) * (frame.horizon - 26)),
    size: 4 + Math.round(rand(seed, index + 80) * 4),
    shift: rand(seed, index + 120)
  }));
  const starsShown = by(STAR_KEYS);

  // The palm, its shadow turning with the sun, and dark at night.
  const palm = palmAt(frame);
  const small = smallPalmAt(frame);
  const maxShadow = Math.round(2.4 * palm.tall);
  const palmShadow = useMemo(() => palmShadowSvg(maxShadow), [maxShadow]);
  // Its length, to the west (right) in the morning and to the east (left, flipped) in the afternoon.
  const shadowReach = hour.interpolate(overHours(scene.from, scene.to, (h) => Math.max(0.01, shadowLength(palm.tall, h) / maxShadow) * (dayHour(h) < 12 ? 1 : -1)));
  const shadowShown = by(SUN_KEYS, 0.3);
  const sway = slow.interpolate({ inputRange: [0, 0.25, 0.5, 0.75, 1], outputRange: ["0deg", "1.6deg", "0deg", "-1.4deg", "0deg"] });
  const dark = by(DARK_KEYS);

  // The arrow: it flies from the left, lands on the right, rests, and flies again.
  const flightKeys = Array.from({ length: 13 }, (_, index) => index / 12);
  const fly = (fn: (p: number) => number, rest: number) => ({
    inputRange: [...flightKeys.map((p) => p * 0.5), 0.999, 1],
    outputRange: [...flightKeys.map((p) => fn(p)), rest, fn(0)]
  });
  const landed = arrowAt(frame, 1);
  const arrowX = flight.interpolate(fly((p) => arrowAt(frame, p).x - 19.5, landed.x - 19.5));
  const arrowY = flight.interpolate(fly((p) => arrowAt(frame, p).y - 6, landed.y - 6));
  const arrowTurn = flight.interpolate({ ...fly((p) => arrowAt(frame, p).angle, landed.angle), outputRange: fly((p) => arrowAt(frame, p).angle, landed.angle).outputRange.map((deg) => `${deg.toFixed(1)}deg`) });
  // Its flight, a faint dashed curve, and a glint where it lands.
  const arrowTrail = useMemo(() => {
    const points = Array.from({ length: 25 }, (_, index) => arrowAt(frame, index / 24));
    const d = points.map((point, index) => `${index ? "L" : "M"}${point.x.toFixed(1)} ${point.y.toFixed(1)}`).join(" ");
    const end = arrowPath(frame).to;
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${frame.width}" height="${frame.height}" viewBox="0 0 ${frame.width} ${frame.height}"><path d="${d}" fill="none" stroke="#FFF3D6" stroke-width="1.4" stroke-dasharray="5 5" stroke-linecap="round" opacity="0.5"/><ellipse cx="${end.x.toFixed(1)}" cy="${(end.y + 3).toFixed(1)}" rx="9" ry="3.5" fill="#FFF3D6" opacity="0.4"/></svg>`;
  }, [frame]);

  const threadGrow = hour.interpolate(overHours(scene.from, scene.to, (h) => 0.12 + 0.88 * Math.min(1, Math.max(0, (dayHour(h) - 4) / 0.9))));
  const veilIn = hour.interpolate(overHours(scene.from, scene.to, (h) => -frame.width * 0.7 * (1 - Math.min(1, Math.max(0, (dayHour(h) - 17.2) / 1)))));

  return (
    <View style={[styles.frame, { width, height }]} pointerEvents="none" testID="day-sky">
      {layers.map((xml, index) => (
        <Animated.View
          key={`${scene.id}-${index}`}
          style={[StyleSheet.absoluteFill, index === 0 ? null : { opacity: hour.interpolate({ inputRange: [keys[index - 1].hour, keys[index].hour], outputRange: [0, 1], extrapolate: "clamp" }) }]}
        >
          <SvgXml xml={xml} width={width} height={height} />
        </Animated.View>
      ))}
      <Animated.View style={[StyleSheet.absoluteFill, { opacity: by(EAST_GLOW) }]}>
        <SvgXml xml={glow("east")} width={width} height={height} />
      </Animated.View>
      <Animated.View style={[StyleSheet.absoluteFill, { opacity: by(WEST_GLOW) }]}>
        <SvgXml xml={glow("west")} width={width} height={height} />
      </Animated.View>
      <Animated.View style={[StyleSheet.absoluteFill, { opacity: by(DAWN_BAND) }]} testID="sky-dawn">
        <SvgXml xml={dawnBand} width={width} height={height} />
      </Animated.View>
      {touches.has("nightFalls") ? (
        <Animated.View style={[StyleSheet.absoluteFill, { opacity: by(VEIL_KEYS), transform: [{ translateX: veilIn }] }]} testID="sky-night-falls">
          <SvgXml xml={veil} width={width} height={height} />
        </Animated.View>
      ) : null}
      <Animated.View style={[StyleSheet.absoluteFill, { opacity: starsShown }]}>
        {stars.map((star, index) => (
          <Animated.View
            key={index}
            style={[
              styles.abs,
              {
                left: star.x,
                top: star.y,
                opacity: still ? 0.85 : Animated.modulo(Animated.add(slow, star.shift), 1).interpolate({ inputRange: [0, 0.5, 1], outputRange: [0.95, 0.35, 0.95] })
              }
            ]}
          >
            <SvgXml xml={STAR} width={star.size} height={star.size} />
          </Animated.View>
        ))}
        <View style={[styles.abs, { left: frame.moon.x - frame.moon.r * 1.6, top: frame.moon.y - frame.moon.r * 1.6 }]}>
          <SvgXml xml={MOON} width={frame.moon.r * 3.2} height={frame.moon.r * 3.2} />
        </View>
      </Animated.View>
      <Animated.View style={[styles.abs, { left: 0, top: 0, width: sunBox, height: sunBox, opacity: sunShown, transform: [{ translateX: sunX }, { translateY: sunY }] }]} testID="sky-sun">
        <SvgXml xml={sunSvg(sunBox, `${id}s`)} width={sunBox} height={sunBox} />
        <Animated.View style={[StyleSheet.absoluteFill, { opacity: lowSun }]}>
          <SvgXml xml={LOW_SUN} width={sunBox} height={sunBox} />
        </Animated.View>
      </Animated.View>
      <SvgXml xml={ground} width={width} height={height} style={StyleSheet.absoluteFill} />
      <Animated.View style={[StyleSheet.absoluteFill, { opacity: by(WEST_SHADE) }]}>
        <SvgXml xml={shades.west} width={width} height={height} />
      </Animated.View>
      <Animated.View style={[StyleSheet.absoluteFill, { opacity: by(EAST_SHADE) }]} testID="sky-hill-shadows">
        <SvgXml xml={shades.east} width={width} height={height} />
      </Animated.View>
      {/* The palm's shadow: to the west (right) in the morning, to the east (left) in the afternoon. */}
      <Animated.View style={[styles.abs, { left: palm.x, top: palm.y - 6, width: maxShadow, height: 12, opacity: shadowShown, transformOrigin: "left", transform: [{ scaleX: shadowReach }] }]} testID="sky-palm-shadow">
        <SvgXml xml={palmShadow} width={maxShadow} height={12} />
      </Animated.View>
      <View style={[styles.abs, { left: small.x - small.wide / 2, top: small.y - small.tall }]}>
        <SvgXml xml={SMALL_PALM} width={small.wide} height={small.tall} />
      </View>
      <Animated.View style={[styles.abs, { left: palm.x - palm.wide / 2, top: palm.y - palm.tall, width: palm.wide, height: palm.tall, transformOrigin: "bottom", transform: lite || still ? [] : [{ rotate: sway }] }]}>
        <SvgXml xml={PALM} width={palm.wide} height={palm.tall} />
        <Animated.View style={[StyleSheet.absoluteFill, { opacity: by(DARK_KEYS, 0.72) }]}>
          <SvgXml xml={darken(PALM)} width={palm.wide} height={palm.tall} />
        </Animated.View>
      </Animated.View>
      {touches.has("camels")
        ? calvesAt(frame).map((calf, index) => (
            <View key={index} style={[styles.abs, { left: calf.x - Math.round(calf.size * 0.62), top: calf.y - calf.size }]} testID="sky-camel">
              <Calf size={calf.size} step={fast} flip={calf.flip} shift={index * 0.37} />
            </View>
          ))
        : null}
      {touches.has("heat") ? (
        <Animated.View style={[StyleSheet.absoluteFill, { opacity: by(HEAT_KEYS) }]} testID="sky-heat">
          {[0.22, 0.4, 0.62, 0.8].slice(0, lite ? 2 : 4).map((share, index) => (
            <Animated.View
              key={index}
              style={[
                styles.abs,
                {
                  left: frame.width * share - 17,
                  top: frame.horizon + (frame.height - frame.horizon) * (index % 2 ? 0.2 : 0.42) - 26,
                  opacity: still ? 0.6 : Animated.modulo(Animated.add(fast, index * 0.29), 1).interpolate({ inputRange: [0, 0.3, 0.7, 1], outputRange: [0, 1, 1, 0] }),
                  transform: [{ translateY: still ? -4 : Animated.modulo(Animated.add(fast, index * 0.29), 1).interpolate({ inputRange: [0, 1], outputRange: [0, -10] }) }]
                }
              ]}
            >
              <SvgXml xml={HEAT} width={34} height={26} />
            </Animated.View>
          ))}
        </Animated.View>
      ) : null}
      <Animated.View style={[StyleSheet.absoluteFill, { opacity: by(DARK_KEYS, 0.72) }]}>
        <SvgXml xml={groundDark} width={width} height={height} />
      </Animated.View>
      {touches.has("thread") ? (
        <Animated.View style={[styles.abs, styles.thread, { left: 0, top: threadAt(frame) - 1, width: frame.width * 0.66, opacity: by(THREAD_KEYS), transform: [{ scaleX: threadGrow }] }]} testID="sky-thread" />
      ) : null}
      {touches.has("arrow") ? (
        <Animated.View style={[StyleSheet.absoluteFill, { opacity: by(AFTER_SUNSET) }]} testID="sky-arrow">
          <SvgXml xml={arrowTrail} width={width} height={height} />
          <Animated.View
            style={[
              styles.abs,
              { left: 0, top: 0, width: 39, height: 12 },
              still ? { transform: [{ translateX: landed.x - 19.5 }, { translateY: landed.y - 6 }, { rotate: `${landed.angle.toFixed(1)}deg` }] } : { transform: [{ translateX: arrowX }, { translateY: arrowY }, { rotate: arrowTurn }] }
            ]}
          >
            <SvgXml xml={ARROW} width={39} height={12} />
          </Animated.View>
        </Animated.View>
      ) : null}
      {layout.threads.map((word, index) => (
        <Word key={`thread-${index}`} text={word.text} rect={word.rect} opacity={by(THREAD_KEYS)} testID={index === 0 ? "sky-white-thread" : "sky-black-thread"} />
      ))}
      {layout.sides.map((word, index) => (
        <Word key={`side-${index}`} text={word.text} rect={word.rect} testID={index === 0 ? "sky-east" : "sky-west"} />
      ))}
      {layout.marks.map((mark, index) => (
        <Word
          key={`mark-${index}`}
          text={mark.text}
          rect={mark.rect}
          opacity={hour.interpolate({ inputRange: [mark.hour - 0.25, mark.hour], outputRange: [0, 1], extrapolate: "clamp" })}
          testID={`sky-mark-${index}`}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  frame: { overflow: "hidden", backgroundColor: "#0A1233" },
  abs: { position: "absolute" },
  thread: { height: 3, borderRadius: 2, backgroundColor: "#FFFFFF", shadowColor: "#FFFFFF", shadowOpacity: 0.9, shadowRadius: 6, transformOrigin: "left" },
  wordBox: { position: "absolute", justifyContent: "center" },
  word: {
    borderRadius: 9,
    paddingHorizontal: WORD.padX,
    paddingVertical: WORD.padY,
    backgroundColor: "rgba(16,22,58,0.62)",
    alignItems: "center",
    justifyContent: "center"
  },
  wordText: { fontFamily: fonts.bodyHeavy, fontSize: WORD.font, lineHeight: WORD.line, color: "#FFFFFF" }
});
