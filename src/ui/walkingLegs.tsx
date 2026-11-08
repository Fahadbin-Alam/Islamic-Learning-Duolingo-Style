import React, { createContext, memo, useContext, useMemo } from "react";
import { Animated, StyleSheet } from "react-native";
import Svg, { Path, Rect } from "react-native-svg";
import { sampleCurve } from "./motion";

/**
 * Real walking legs for the animals that wander the path (sheep, goat, horse), like the camel's: each leg
 * swings about its hip in its own layer on the native driver, diagonal pairs together, and the swing fades
 * in and out with the walk so the legs never snap when it starts or stops. Before, the legs were painted on
 * the body and the animal slid along on stiff legs.
 */

/** The roamer's walk clock: `step` counts steps (read modulo 1), `stride` is 0 standing .. 1 walking. */
export type WalkClock = { step: Animated.Value; stride: Animated.Value };

export const WalkContext = createContext<WalkClock | null>(null);

export function useWalkClock() {
  return useContext(WalkContext);
}

type Leg = { x: number; width: number; top: number; bottom: number; color: string; hoof?: string; sign: 1 | -1 };
type LegSet = { hip: number; swing: number; legs: Leg[] };

// Drawn back to front: the far legs (a shade darker) first, then the near ones. Same 64 x 64 box as the pictures.
export const LEG_SETS: Record<"sheep" | "goat" | "horse", LegSet> = {
  sheep: {
    hip: 44,
    swing: 22,
    legs: [
      { x: 26.5, width: 5, top: 42, bottom: 56, color: "#463A33", sign: -1 },
      { x: 44.5, width: 5, top: 42, bottom: 56, color: "#463A33", sign: 1 },
      { x: 22.5, width: 5, top: 42, bottom: 56, color: "#5A4A42", sign: 1 },
      { x: 40.5, width: 5, top: 42, bottom: 56, color: "#5A4A42", sign: -1 }
    ]
  },
  goat: {
    hip: 44,
    swing: 24,
    legs: [
      { x: 24, width: 4.6, top: 42, bottom: 56, color: "#766E63", sign: -1 },
      { x: 42, width: 4.6, top: 42, bottom: 56, color: "#766E63", sign: 1 },
      { x: 20.3, width: 4.6, top: 42, bottom: 56, color: "#8E8579", sign: 1 },
      { x: 38.3, width: 4.6, top: 42, bottom: 56, color: "#8E8579", sign: -1 }
    ]
  },
  horse: {
    hip: 42,
    swing: 26,
    legs: [
      { x: 22.3, width: 4.6, top: 40, bottom: 56, color: "#7E5232", sign: -1 },
      { x: 42.3, width: 4.6, top: 40, bottom: 56, color: "#7E5232", sign: 1 },
      { x: 17.3, width: 4.6, top: 40, bottom: 56, color: "#A8703F", hoof: "#3B2618", sign: 1 },
      { x: 37.3, width: 4.6, top: 40, bottom: 56, color: "#A8703F", hoof: "#3B2618", sign: -1 }
    ]
  }
};

export type LeggedKind = keyof typeof LEG_SETS;

export function isLegged(kind: string): kind is LeggedKind {
  return kind === "sheep" || kind === "goat" || kind === "horse";
}

/** One leg as the picture draws it, standing straight. */
export function LegShape({ leg }: { leg: Leg }) {
  return (
    <>
      <Rect x={leg.x - leg.width / 2} y={leg.top} width={leg.width} height={leg.bottom - leg.top} rx={leg.width / 2} fill={leg.color} />
      {leg.hoof ? <Path d={`M${leg.x - 2.7} 54H${leg.x + 2.7}`} stroke={leg.hoof} strokeWidth={3} strokeLinecap="round" /> : null}
    </>
  );
}

const MemoLeg = memo(LegShape);

/** The legs, each in its own swinging layer. Goes behind the body (drawn without its legs). */
export function WalkingLegs({ kind, size, clock }: { kind: LeggedKind; size: number; clock: WalkClock | null }) {
  const set = LEG_SETS[kind];
  const angles = useMemo(() => {
    if (!clock) return null;
    const phase = Animated.modulo(clock.step, 1);
    // A smooth sine swing per step; `stride` scales it from standing (0) to a full walk (1).
    const swing = Animated.multiply(clock.stride, phase.interpolate(sampleCurve(0, 1, 32, (p) => set.swing * Math.sin(2 * Math.PI * p))));
    return {
      fore: swing.interpolate({ inputRange: [-90, 90], outputRange: ["-90deg", "90deg"] }),
      back: swing.interpolate({ inputRange: [-90, 90], outputRange: ["90deg", "-90deg"] })
    };
  }, [clock, set.swing]);
  return (
    <>
      {set.legs.map((leg) => (
        <Animated.View
          key={`${leg.x}`}
          pointerEvents="none"
          style={[
            StyleSheet.absoluteFill,
            angles
              ? { transformOrigin: `${(leg.x / 64) * 100}% ${(set.hip / 64) * 100}%`, transform: [{ rotate: leg.sign > 0 ? angles.fore : angles.back }] }
              : null
          ]}
        >
          <Svg width={size} height={size} viewBox="0 0 64 64">
            <MemoLeg leg={leg} />
          </Svg>
        </Animated.View>
      ))}
    </>
  );
}
