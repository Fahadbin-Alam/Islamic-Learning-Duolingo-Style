import React, { useEffect, useRef, type ReactNode } from "react";
import { Animated, Easing, View } from "react-native";
import { sampleCurve, smoothKeys } from "./motion";
import { Puff, Sparkle } from "./reactions";

/**
 * Every picture beside the path moves a little by itself, so nothing on the path stands frozen: the
 * sheep grazes and wanders, the tent breathes in the wind, the boat rocks, the dunes ripple, the coins
 * glint, a little cloud slides past the mountain top. One slow looping 0..1 clock per picture on the
 * native driver, so it costs almost nothing. Buildings (the Kaaba, the mosque) never wobble; they only
 * catch a glint of light.
 */

/** How a picture moves by itself. */
export type IdleKind = "graze" | "walk" | "scuttle" | "crawl" | "breathe" | "rock" | "ripple" | "wobble" | "bounce" | "look" | "glint" | "peak" | "sway";

export const IDLE_OF: Record<string, IdleKind> = {
  sheep: "graze",
  goat: "graze",
  horse: "walk",
  crab: "scuttle",
  turtle: "crawl",
  snail: "crawl",
  owl: "look",
  tent: "breathe",
  banner: "sway",
  boat: "rock",
  oasis: "ripple",
  well: "ripple",
  dunes: "ripple",
  dates: "wobble",
  inkpot: "wobble",
  bookStand: "wobble",
  mushroom: "bounce",
  sandcastle: "breathe",
  log: "breathe",
  mountain: "peak",
  palm: "sway",
  pine: "sway",
  bush: "sway",
  flowers: "sway",
  rocks: "glint",
  coins: "glint",
  shell: "glint",
  shield: "glint",
  cave: "glint",
  mosque: "glint",
  kaaba: "glint"
};

export function idleKindFor(kind: string): IdleKind {
  return IDLE_OF[kind] ?? "breathe";
}

/** One slow lap of the idle clock, by kind (ms). Spread by `seed` so neighbours never move in step. */
export const IDLE_PERIOD: Record<IdleKind, number> = {
  graze: 7200,
  walk: 6400,
  scuttle: 5200,
  crawl: 9000,
  breathe: 4200,
  rock: 3600,
  ripple: 4800,
  wobble: 5600,
  bounce: 3800,
  look: 6000,
  glint: 5000,
  peak: 9000,
  sway: 5200
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

/** The picture's own moves for one lap (from its bottom middle). */
export function idleMoves(kind: IdleKind, t: Animated.Value, size: number): Moves {
  const u = size / 64;
  const k = (keys: number[], values: number[]) => t.interpolate(smoothKeys(keys, values));
  const d = (keys: number[], values: number[]) => t.interpolate(smoothKeys(keys, values.map((value) => `${value}deg`)));
  switch (kind) {
    case "graze":
      // Wanders a few steps one way with little steps, dips to nibble, wanders back, nibbles again.
      return [
        { translateX: k([0, 0.3, 0.45, 0.8, 1], [0, 5 * u, 5 * u, -3 * u, 0]) },
        { translateY: t.interpolate(sampleCurve(0, 1, 60, (p) => (p < 0.3 || (p > 0.45 && p < 0.8) ? -1.2 * u * Math.abs(Math.sin(p * Math.PI * 22)) : 0))) },
        { rotate: d([0, 0.32, 0.36, 0.42, 0.45, 0.82, 0.86, 0.94, 1], [0, 0, 4, 4, 0, 0, 4, 4, 0]) }
      ];
    case "walk":
      return [
        { translateX: k([0, 0.45, 0.55, 1], [-4 * u, 4 * u, 4 * u, -4 * u]) },
        { translateY: t.interpolate(sampleCurve(0, 1, 60, (p) => -1.4 * u * Math.abs(Math.sin(p * Math.PI * 16)))) }
      ];
    case "scuttle":
      return [{ translateX: k([0, 0.2, 0.35, 0.55, 0.75, 1], [0, 6 * u, 6 * u, -6 * u, -6 * u, 0]) }, { rotate: d([0, 0.1, 0.2, 0.55, 0.65, 1], [0, 3, 0, 0, -3, 0]) }];
    case "crawl":
      return [{ translateX: k([0, 0.5, 1], [-3 * u, 3 * u, -3 * u]) }, { scaleX: k([0, 0.25, 0.5, 0.75, 1], [1, 1.04, 1, 1.04, 1]) }];
    case "rock":
      return [{ rotate: d([0, 0.25, 0.75, 1], [0, 5, -5, 0]) }, { translateY: k([0, 0.5, 1], [0, -2 * u, 0]) }];
    case "ripple":
      return [{ scaleX: k([0, 0.5, 1], [1, 1.035, 1]) }, { scaleY: k([0, 0.5, 1], [1, 0.975, 1]) }];
    case "wobble":
      // Still most of the lap, then a little wiggle, like something knocked it.
      return [{ rotate: d([0, 0.7, 0.76, 0.82, 0.88, 0.94, 1], [0, 0, -4, 3.5, -2, 1, 0]) }];
    case "bounce":
      return [{ scaleY: k([0, 0.4, 0.5, 0.6, 1], [1, 1, 0.9, 1.06, 1]) }, { scaleX: k([0, 0.4, 0.5, 0.6, 1], [1, 1, 1.06, 0.97, 1]) }];
    case "look":
      return [{ rotate: d([0, 0.2, 0.4, 0.6, 0.8, 1], [0, -5, -5, 5, 5, 0]) }];
    case "sway":
      // Plants already sway in the wind; this adds a slow lean and stretch on top.
      return [{ scaleY: k([0, 0.5, 1], [1, 1.04, 1]) }, { skewX: d([0, 0.5, 1], [0, 2.5, 0]) }];
    case "glint":
    case "peak":
      return [];
    case "breathe":
    default:
      return [{ scaleY: k([0, 0.5, 1], [1, 1.03, 1]) }, { scaleX: k([0, 0.5, 1], [1, 0.99, 1]) }];
  }
}

/** Bits drawn on top of the picture for its idle lap: a glint of light, a cloud past a peak. */
export function IdleBits({ kind, t, size }: { kind: IdleKind; t: Animated.Value; size: number }): ReactNode {
  if (kind === "glint") {
    // A twinkle on one corner, then on the other.
    return [
      { x: 0.68, y: 0.12, from: 0.1 },
      { x: 0.12, y: 0.36, from: 0.6 }
    ].map((spot) => (
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
    ));
  }
  if (kind === "peak") {
    // A puffy little cloud slides past the mountain top and on out of sight.
    return (
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
        <Puff size={size * 0.16} />
        <View style={{ marginLeft: -size * 0.06 }}>
          <Puff size={size * 0.22} />
        </View>
        <View style={{ marginLeft: -size * 0.07 }}>
          <Puff size={size * 0.15} />
        </View>
      </Animated.View>
    );
  }
  return null;
}
