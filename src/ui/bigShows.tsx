import React, { type ReactNode } from "react";
import { Animated, View } from "react-native";
import { sampleCurve } from "./motion";
import { Floater, Puff, Sparkle, Word, shake } from "./reactions";
import { Abs, Faller, Leaf, deg, k, type Look } from "./showKit";

/**
 * The two big tap shows Fahad asked for:
 * - "giant": a tree grows huge, filling a good part of the screen, sways up there, then shrinks back
 *   with a pop and a few leaves floating down.
 * - "meteor": a little rock with a fiery tail falls out of the sky and lands with a BONK, a flash and a
 *   puff of dust; the picture shakes, a small crater shows, then it all settles back to normal.
 * Both run on the show's 0..1 clock, so they skip and restart like every other tap show.
 */

/** Where the meteor lands in the clock: everything after this point is the bump and the clean-up. */
export const METEOR_HIT = 0.36;

/** The rock and its fiery tail, drawn at `r` (the rock's radius). */
export function MeteorRock({ r }: { r: number }) {
  // The tail streams up and to the left, behind the rock, in shrinking puffs of fire.
  const tail = [
    { at: 1.1, size: 1.7, color: "#FFB020" },
    { at: 2.0, size: 1.4, color: "#FF8A1F" },
    { at: 2.8, size: 1.1, color: "#FFD27A" },
    { at: 3.5, size: 0.8, color: "#FFE9B0" }
  ];
  return (
    <View style={{ width: r * 2, height: r * 2 }}>
      {tail
        .slice()
        .reverse()
        .map((puff) => (
          <View
            key={puff.at}
            style={{
              position: "absolute",
              left: r - puff.size * r * 0.5 - puff.at * r * 0.57,
              top: r - puff.size * r * 0.5 - puff.at * r * 0.82,
              width: puff.size * r,
              height: puff.size * r,
              borderRadius: puff.size * r,
              backgroundColor: puff.color,
              opacity: 0.9
            }}
          />
        ))}
      <View style={{ width: r * 2, height: r * 2, borderRadius: r, backgroundColor: "#8A5A3C", borderWidth: Math.max(1, r * 0.22), borderColor: "#FF8A1F" }}>
        <View style={{ position: "absolute", left: r * 0.4, top: r * 0.35, width: r * 0.5, height: r * 0.4, borderRadius: r, backgroundColor: "#6E4630" }} />
      </View>
    </View>
  );
}

/** Dust puffs that burst out sideways from a landing spot. */
export function DustBurst({ t, x, y, s, from }: { t: Animated.Value; x: number; y: number; s: number; from: number }): ReactNode {
  return [-1, -0.45, 0.45, 1].map((dir, index) => (
    <Floater key={dir} t={t} from={from + index * 0.02} to={Math.min(1, from + 0.45 + index * 0.02)} x={x - s * 0.08} y={y - s * 0.08} rise={s * (0.12 + Math.abs(dir) * 0.08)} drift={dir * s * 0.55} pop>
      <Puff size={s * (0.2 - Math.abs(dir) * 0.04)} color="#F1DFB8" />
    </Floater>
  ));
}

/** A tap show that any picture can do (or null when `name` is not one of these). */
export function bigLook(name: string, t: Animated.Value, s: number): Look | null {
  if (name === "giant") {
    // Up and up (a little overshoot each step), a sway at the top, then down with a squash and a wobble.
    return {
      moves: [
        { scale: k(t, [0, 0.08, 0.13, 0.22, 0.3, 0.48, 0.58, 0.64, 0.72, 0.8, 1], [1, 1.35, 1.25, 2.1, 2.7, 2.7, 0.85, 1.1, 0.96, 1, 1]) },
        { rotate: deg(t, [0, 0.3, 0.35, 0.41, 0.48, 1], [0, 0, -4, 4, 0, 0]) }
      ],
      front: (
        <>
          {[0, 1, 2, 3].map((index) => (
            <Faller key={index} t={t} from={0.5 + index * 0.05} to={0.95} x={s * (0.05 + index * 0.27)} y={-s * 0.4} fall={s * 1.1} drift={(index % 2 ? 1 : -1) * s * 0.2} spin={(index % 2 ? 1 : -1) * 200}>
              <Leaf s={Math.max(10, s * 0.2)} />
            </Faller>
          ))}
          {[0, 1].map((index) => (
            <Floater key={`s${index}`} t={t} from={0.58 + index * 0.04} to={0.9} x={s * (0.15 + index * 0.55)} y={s * 0.3} rise={s * 0.2}>
              <Sparkle size={Math.max(9, s * 0.16)} />
            </Floater>
          ))}
        </>
      )
    };
  }
  if (name === "meteor") {
    const hit = METEOR_HIT;
    const r = Math.max(5, s * 0.12);
    const landX = s * 0.5;
    const landY = s * 0.72;
    // It speeds up as it falls (a curve, not a straight slide).
    const fall = sampleCurve(0, hit, 10, (p) => Math.pow(1 - p / hit, 1.6));
    const along = t.interpolate({ inputRange: [...fall.inputRange, 1], outputRange: [...fall.outputRange, 0], extrapolate: "clamp" });
    return {
      moves: [
        { translateX: shake(t, hit, hit + 0.26, s * 0.05, 6, "") as never },
        { scaleY: k(t, [0, hit, hit + 0.04, hit + 0.12, 1], [1, 1, 0.86, 1.04, 1]) }
      ],
      behind: (
        // A small crater where it landed, which fades away again.
        <Abs
          x={landX - s * 0.34}
          y={s * 0.84}
          style={{ width: s * 0.68, height: s * 0.14, borderRadius: s, backgroundColor: "rgba(110,70,40,0.35)", opacity: t.interpolate({ inputRange: [0, hit, hit + 0.04, 0.85, 1], outputRange: [0, 0, 1, 1, 0], extrapolate: "clamp" }) }}
        />
      ),
      front: (
        <>
          <Abs
            x={landX - r}
            y={landY - r}
            style={{
              opacity: t.interpolate({ inputRange: [0, 0.02, hit, hit + 0.03, 1], outputRange: [0, 1, 1, 0, 0], extrapolate: "clamp" }),
              transform: [
                { translateX: along.interpolate({ inputRange: [0, 1], outputRange: [0, -s * 1.7] }) },
                { translateY: along.interpolate({ inputRange: [0, 1], outputRange: [0, -s * 2.5] }) }
              ]
            }}
          >
            <MeteorRock r={r} />
          </Abs>
          {/* The flash where it hits. */}
          <Abs
            x={landX - s * 0.2}
            y={landY - s * 0.2}
            style={{
              width: s * 0.4,
              height: s * 0.4,
              borderRadius: s,
              backgroundColor: "#FFF2B0",
              opacity: t.interpolate({ inputRange: [0, hit - 0.01, hit + 0.02, hit + 0.22, 1], outputRange: [0, 0, 0.95, 0, 0], extrapolate: "clamp" }),
              transform: [{ scale: k(t, [0, hit - 0.01, hit + 0.06, hit + 0.22, 1], [0.2, 0.2, 2.2, 3, 3]) }]
            }}
          />
          <DustBurst t={t} x={landX} y={landY} s={s} from={hit + 0.01} />
          <Floater t={t} from={hit + 0.02} to={hit + 0.5} x={s * 0.45} y={-s * 0.05} rise={s * 0.25}>
            <Word size={Math.max(11, s * 0.2)} color="#FF8A1F">BONK!</Word>
          </Floater>
        </>
      )
    };
  }
  return null;
}
