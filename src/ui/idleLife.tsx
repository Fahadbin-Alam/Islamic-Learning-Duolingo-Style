import React, { useEffect, useRef, type ReactNode } from "react";
import { Animated, Easing, View } from "react-native";
import { sampleCurve, smoothKeys } from "./motion";
import { Floater, Puff, Sparkle, Word } from "./reactions";

/**
 * Every picture beside the path moves a little by itself, so nothing on the path stands frozen: the
 * sheep grazes and wanders, the tent breathes in the wind, the boat rocks, the dunes ripple, the coins
 * glint, a little cloud slides past the mountain top. One slow looping 0..1 clock per picture on the
 * native driver, so it costs almost nothing. Buildings (the Kaaba, the mosque) never wobble; they only
 * catch a glint of light.
 */

/** How a picture moves by itself. */
export type IdleKind =
  | "graze"
  | "walk"
  | "scuttle"
  | "crawl"
  | "hop"
  | "breathe"
  | "flap"
  | "rock"
  | "ripple"
  | "wobble"
  | "bounce"
  | "castle"
  | "peek"
  | "glint"
  | "peak"
  | "sway"
  | "sleep";

export const IDLE_OF: Record<string, IdleKind> = {
  sheep: "graze",
  goat: "graze",
  horse: "walk",
  crab: "scuttle",
  turtle: "crawl",
  snail: "crawl",
  rabbit: "hop",
  tent: "flap",
  banner: "sway",
  boat: "rock",
  shield: "rock",
  oasis: "ripple",
  well: "ripple",
  dunes: "ripple",
  dates: "wobble",
  inkpot: "wobble",
  bookStand: "wobble",
  shell: "wobble",
  mushroom: "bounce",
  sandcastle: "castle",
  log: "breathe",
  cave: "peek",
  mountain: "peak",
  palm: "sway",
  pine: "sway",
  bush: "sway",
  flowers: "sway",
  rocks: "glint",
  coins: "glint",
  mosque: "glint",
  kaaba: "glint"
};

/** Animals: they curl up and snore while the path is asleep; everything else just breathes slowly. */
export const SLEEPERS = new Set(["sheep", "goat", "horse", "crab", "turtle", "snail", "rabbit"]);

export function idleKindFor(kind: string): IdleKind {
  return IDLE_OF[kind] ?? "breathe";
}

/** One slow lap of the idle clock, by kind (ms). Spread by `seed` so neighbours never move in step. */
export const IDLE_PERIOD: Record<IdleKind, number> = {
  graze: 7600,
  walk: 6400,
  scuttle: 5200,
  crawl: 8000,
  hop: 6200,
  breathe: 3800,
  flap: 3400,
  rock: 3200,
  ripple: 4200,
  wobble: 5200,
  bounce: 3600,
  castle: 6000,
  peek: 6800,
  glint: 4600,
  peak: 8000,
  sway: 4600,
  sleep: 4400
};

/** A looping 0..1 clock that only runs while `active`. */
export function useIdleClock(active: boolean, period: number, seed = 0) {
  const value = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    value.setValue(0);
    if (!active) return undefined;
    // A short start delay by seed, then the same lap forever. Wrapped in a sequence for the web preview.
    const loop = Animated.loop(
      Animated.sequence([Animated.timing(value, { toValue: 1, duration: period, easing: Easing.linear, useNativeDriver: true })])
    );
    const start = setTimeout(() => loop.start(), (seed * 433) % 1500);
    return () => {
      clearTimeout(start);
      loop.stop();
    };
  }, [active, period, seed, value]);
  return value;
}

type Moves = Record<string, Animated.AnimatedInterpolation<number | string>>[];

/** Little steps: a bounce that only runs while `walking(p)` is true. */
function steps(t: Animated.Value, height: number, rate: number, walking: (p: number) => boolean) {
  return t.interpolate(sampleCurve(0, 1, 90, (p) => (walking(p) ? -height * Math.abs(Math.sin(p * Math.PI * rate)) : 0)));
}

/** Like sampleCurve, but in degrees. */
function sampleDeg(count: number, fn: (p: number) => number) {
  const curve = sampleCurve(0, 1, count, fn);
  return { ...curve, outputRange: curve.outputRange.map((value) => `${value}deg`) };
}

/** A waddle from side to side that runs with the steps. */
function waddle(t: Animated.Value, amount: number, rate: number, walking: (p: number) => boolean) {
  return t.interpolate(sampleDeg(90, (p) => (walking(p) ? amount * Math.sin(p * Math.PI * rate) : 0)));
}

/** The picture's own moves for one lap (from its bottom middle). Big enough to see from arm's length. */
export function idleMoves(kind: IdleKind, t: Animated.Value, size: number): Moves {
  const u = size / 64;
  const k = (keys: number[], values: number[]) => t.interpolate(smoothKeys(keys, values));
  const d = (keys: number[], values: number[]) => t.interpolate(smoothKeys(keys, values.map((value) => `${value}deg`)));
  switch (kind) {
    case "graze": {
      // Trots a few steps one way, dips its head to nibble twice, trots back past home, nibbles, and home.
      const walking = (p: number) => p < 0.28 || (p > 0.44 && p < 0.78) || p > 0.92;
      return [
        { translateX: k([0, 0.28, 0.44, 0.78, 0.92, 1], [0, 13 * u, 13 * u, -9 * u, -9 * u, 0]) },
        { translateY: steps(t, 3 * u, 30, walking) },
        { rotate: t.interpolate(sampleDeg(120, (p) => {
          if (walking(p)) return 3 * Math.sin(p * Math.PI * 30);
          const nibble = (from: number) => (p > from && p < from + 0.07 ? 9 * Math.sin(((p - from) / 0.07) * Math.PI) : 0);
          return nibble(0.29) + nibble(0.36) + nibble(0.8) + nibble(0.85);
        })) }
      ];
    }
    case "walk": {
      const walking = (p: number) => p < 0.42 || (p > 0.55 && p < 0.97);
      return [
        { translateX: k([0, 0.42, 0.55, 0.97, 1], [-10 * u, 10 * u, 10 * u, -10 * u, -10 * u]) },
        { translateY: steps(t, 3.4 * u, 34, walking) },
        { rotate: waddle(t, 2.5, 34, walking) }
      ];
    }
    case "scuttle": {
      const walking = (p: number) => (p > 0.05 && p < 0.25) || (p > 0.45 && p < 0.7) || (p > 0.85 && p < 0.97);
      return [
        { translateX: k([0, 0.05, 0.25, 0.45, 0.7, 0.85, 0.97, 1], [0, 0, 12 * u, 12 * u, -10 * u, -10 * u, 0, 0]) },
        { translateY: steps(t, 1.6 * u, 60, walking) },
        { rotate: waddle(t, 4, 60, walking) }
      ];
    }
    case "crawl":
      return [
        { translateX: k([0, 0.45, 0.55, 1], [-8 * u, 8 * u, 8 * u, -8 * u]) },
        { scaleX: t.interpolate(sampleCurve(0, 1, 60, (p) => 1 + 0.05 * Math.abs(Math.sin(p * Math.PI * 10)))) },
        { translateY: t.interpolate(sampleCurve(0, 1, 60, (p) => -1 * u * Math.abs(Math.sin(p * Math.PI * 10)))) }
      ];
    case "hop": {
      // Three bunny hops out, a sniff (little nose twitches), three hops back.
      const arc = (p: number, from: number, to: number) => (p > from && p < to ? -9 * u * Math.sin(((p - from) / (to - from)) * Math.PI) : 0);
      const hops = [0.04, 0.14, 0.24, 0.56, 0.66, 0.76];
      return [
        { translateX: k([0, 0.04, 0.32, 0.56, 0.84, 1], [0, 0, 14 * u, 14 * u, 0, 0]) },
        { translateY: t.interpolate(sampleCurve(0, 1, 120, (p) => hops.reduce((sum, from) => sum + arc(p, from, from + 0.08), 0))) },
        { scaleY: t.interpolate(sampleCurve(0, 1, 120, (p) => (p > 0.36 && p < 0.52 ? 1 + 0.04 * Math.sin(p * Math.PI * 50) : 1))) }
      ];
    }
    case "flap":
      // The tent breathes in the wind and its cloth leans one way, then the other.
      return [{ scaleY: k([0, 0.3, 0.5, 0.8, 1], [1, 1.07, 0.98, 1.05, 1]) }, { skewX: d([0, 0.3, 0.6, 1], [0, 5, -3, 0]) }];
    case "rock":
      // Rocks on the waves: tips both ways, bobs up and down and drifts a little.
      return [
        { translateX: k([0, 0.5, 1], [-4 * u, 4 * u, -4 * u]) },
        { translateY: k([0, 0.25, 0.5, 0.75, 1], [0, -4 * u, 0, -4 * u, 0]) },
        { rotate: d([0, 0.25, 0.5, 0.75, 1], [0, 9, 0, -9, 0]) }
      ];
    case "ripple":
      return [{ scaleX: k([0, 0.5, 1], [1, 1.06, 1]) }, { scaleY: k([0, 0.5, 1], [1, 0.95, 1]) }];
    case "wobble":
      // Rests a moment, then a jiggle like something knocked it, and a little hop.
      return [
        { rotate: d([0, 0.45, 0.52, 0.6, 0.68, 0.76, 0.84, 1], [0, 0, -9, 8, -6, 4, 0, 0]) },
        { translateY: k([0, 0.82, 0.88, 0.94, 1], [0, 0, -6 * u, 0, 0]) }
      ];
    case "bounce":
      return [
        { scaleY: k([0, 0.35, 0.45, 0.55, 0.7, 1], [1, 1, 0.82, 1.12, 1, 1]) },
        { scaleX: k([0, 0.35, 0.45, 0.55, 0.7, 1], [1, 1, 1.12, 0.92, 1, 1]) },
        { translateY: k([0, 0.5, 0.6, 0.7, 1], [0, 0, -7 * u, 0, 0]) }
      ];
    case "castle":
      // The sand castle settles, shivers as a breeze blows sand off its top, and stands tall again.
      return [
        { scaleY: k([0, 0.15, 0.3, 0.4, 0.55, 0.7, 0.85, 1], [1, 1.04, 1, 0.94, 1.06, 1, 1.04, 1]) },
        { rotate: d([0, 0.55, 0.6, 0.65, 0.7, 0.75, 1], [0, 0, -3, 3, -2, 0, 0]) }
      ];
    case "peek":
      return [{ scaleY: k([0, 0.5, 1], [1, 1.015, 1]) }];
    case "peak":
      // A mountain breathes very slowly: a cloud and a bird pass it by (IdleBits).
      return [{ scaleY: k([0, 0.5, 1], [1, 1.025, 1]) }, { scaleX: k([0, 0.5, 1], [1, 0.995, 1]) }];
    case "sway":
      // Plants already sway in the wind; this adds a slow lean and stretch on top.
      return [{ scaleY: k([0, 0.5, 1], [1, 1.06, 1]) }, { skewX: d([0, 0.25, 0.75, 1], [0, 5, -4, 0]) }];
    case "glint":
      return [{ scale: k([0, 0.1, 0.18, 0.6, 0.68, 1], [1, 1, 1.04, 1, 1.04, 1]) }];
    case "sleep":
      // Slow, deep breaths.
      return [{ scaleY: k([0, 0.45, 1], [1, 1.06, 1]) }, { scaleX: k([0, 0.45, 1], [1, 1.02, 1]) }];
    case "breathe":
    default:
      return [{ scaleY: k([0, 0.5, 1], [1, 1.06, 1]) }, { scaleX: k([0, 0.5, 1], [1, 0.98, 1]) }];
  }
}

function Glints({ t, size, spots }: { t: Animated.Value; size: number; spots: { x: number; y: number; from: number }[] }) {
  return (
    <>
      {spots.map((spot) => (
        <Animated.View
          key={spot.from}
          pointerEvents="none"
          style={{
            position: "absolute",
            left: spot.x * size,
            top: spot.y * size,
            opacity: t.interpolate({ inputRange: [0, spot.from, spot.from + 0.08, spot.from + 0.2, 1], outputRange: [0, 0, 1, 0, 0], extrapolate: "clamp" }),
            transform: [{ scale: t.interpolate(smoothKeys([0, spot.from, spot.from + 0.08, spot.from + 0.2, 1], [0.2, 0.2, 1.1, 0.3, 0.2])) }, { rotate: t.interpolate({ inputRange: [0, 1], outputRange: ["0deg", "180deg"] }) }]
          }}
        >
          <Sparkle size={Math.max(8, size * 0.17)} color="#FFE27A" />
        </Animated.View>
      ))}
    </>
  );
}

/** Bits drawn on top of the picture for its idle lap: a glint of light, a cloud past a peak, eyes in a cave, snores. */
export function IdleBits({ kind, t, size }: { kind: IdleKind; t: Animated.Value; size: number }): ReactNode {
  if (kind === "glint") {
    return <Glints t={t} size={size} spots={[{ x: 0.68, y: 0.12, from: 0.1 }, { x: 0.12, y: 0.36, from: 0.6 }]} />;
  }
  if (kind === "castle") {
    // Sand blows off the top as it shivers, and the castle sparkles.
    return (
      <>
        {[0, 1, 2].map((index) => (
          <Floater key={index} t={t} from={0.55 + index * 0.04} to={0.85 + index * 0.04} x={size * (0.4 + index * 0.08)} y={size * 0.1} rise={size * 0.12} drift={size * 0.35} pop={false}>
            <View style={{ width: Math.max(3, size * 0.05), height: Math.max(3, size * 0.05), borderRadius: size, backgroundColor: "#E2B967" }} />
          </Floater>
        ))}
        <Glints t={t} size={size} spots={[{ x: 0.2, y: 0.2, from: 0.15 }]} />
      </>
    );
  }
  if (kind === "ripple") {
    // A ring of light spreads across the water.
    return (
      <Animated.View
        pointerEvents="none"
        style={{
          position: "absolute",
          left: size * 0.3,
          top: size * 0.72,
          width: size * 0.4,
          height: size * 0.12,
          borderRadius: size,
          borderWidth: Math.max(1.5, size * 0.03),
          borderColor: "rgba(255,255,255,0.85)",
          opacity: t.interpolate({ inputRange: [0, 0.1, 0.6, 1], outputRange: [0, 0.9, 0, 0] }),
          transform: [{ scale: t.interpolate({ inputRange: [0, 0.6, 1], outputRange: [0.3, 1.5, 1.5] }) }]
        }}
      />
    );
  }
  if (kind === "peek") {
    // Two eyes open in the dark of the cave, look about, blink and shut.
    return (
      <Animated.View
        pointerEvents="none"
        style={{
          position: "absolute",
          left: size * 0.39,
          top: size * 0.7,
          flexDirection: "row",
          opacity: t.interpolate({ inputRange: [0, 0.2, 0.24, 0.7, 0.74, 1], outputRange: [0, 0, 1, 1, 0, 0] }),
          transform: [
            { translateX: t.interpolate(smoothKeys([0, 0.3, 0.42, 0.55, 0.66, 1], [0, 0, -size * 0.05, size * 0.05, 0, 0])) },
            { scaleY: t.interpolate({ inputRange: [0, 0.48, 0.5, 0.52, 1], outputRange: [1, 1, 0.1, 1, 1] }) }
          ]
        }}
      >
        {[0, 1].map((index) => (
          <View key={index} style={{ width: size * 0.07, height: size * 0.07, borderRadius: size, backgroundColor: "#FFE27A", marginRight: size * 0.07 }} />
        ))}
      </Animated.View>
    );
  }
  if (kind === "sleep") {
    return ["z", "Z"].map((letter, index) => (
      <Floater key={letter} t={t} from={index * 0.4} to={index * 0.4 + 0.55} x={size * (0.62 + index * 0.08)} y={size * 0.12} rise={size * 0.3} drift={size * 0.12}>
        <Word size={Math.max(10, size * (0.2 + index * 0.06))} color="#8FA3FF">{letter}</Word>
      </Floater>
    ));
  }
  if (kind === "peak") {
    // A puffy little cloud slides past the mountain top and on out of sight, and a bird glides over.
    return (
      <>
        <Animated.View
          pointerEvents="none"
          style={{
            position: "absolute",
            top: size * 0.08,
            left: 0,
            flexDirection: "row",
            alignItems: "flex-end",
            opacity: t.interpolate({ inputRange: [0, 0.1, 0.85, 1], outputRange: [0, 0.95, 0.95, 0] }),
            transform: [{ translateX: t.interpolate({ inputRange: [0, 1], outputRange: [-size * 0.35, size * 0.95] }) }]
          }}
        >
          <Puff size={size * 0.2} />
          <View style={{ marginLeft: -size * 0.07 }}>
            <Puff size={size * 0.28} />
          </View>
          <View style={{ marginLeft: -size * 0.08 }}>
            <Puff size={size * 0.18} />
          </View>
        </Animated.View>
        <Animated.View
          pointerEvents="none"
          style={{
            position: "absolute",
            top: -size * 0.12,
            left: 0,
            opacity: t.interpolate({ inputRange: [0, 0.35, 0.4, 0.9, 0.95, 1], outputRange: [0, 0, 1, 1, 0, 0] }),
            transform: [
              { translateX: t.interpolate({ inputRange: [0, 0.35, 0.95, 1], outputRange: [size, size, -size * 0.2, -size * 0.2] }) },
              { translateY: t.interpolate(sampleCurve(0.35, 0.95, 30, (p) => -size * 0.06 * Math.sin((p - 0.35) * 30))) }
            ]
          }}
        >
          <GlideBird size={size * 0.22} />
        </Animated.View>
      </>
    );
  }
  return null;
}

/** A bird far away: just a soft "v" of two wings. */
function GlideBird({ size }: { size: number }) {
  const wing = { width: size * 0.55, height: size * 0.12, borderRadius: size, backgroundColor: "#5B6B66" };
  return (
    <View style={{ width: size, height: size * 0.4, flexDirection: "row", justifyContent: "center" }}>
      <View style={[wing, { transform: [{ rotate: "20deg" }], marginRight: -size * 0.06 }]} />
      <View style={[wing, { transform: [{ rotate: "-20deg" }] }]} />
    </View>
  );
}
