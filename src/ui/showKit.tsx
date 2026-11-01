import React, { type ReactNode } from "react";
import { Animated, StyleSheet, View, type StyleProp, type ViewStyle } from "react-native";
import Svg, { Circle, Ellipse, G, Path } from "react-native-svg";
import { sampleCurve, smoothKeys } from "./motion";
import { Floater, Word } from "./reactions";

/**
 * The building blocks the tap shows beside the path are made of: keyframe helpers on one 0..1 clock,
 * things that fall, hop and float, and little props (dates, leaves, bubbles, a rainbow, splashes).
 */

export type Node = Animated.AnimatedInterpolation<number | string> | number | string;
export type Transform = Record<string, Node>;
export type Look = {
  /** Moves the picture itself (from its bottom middle). */
  moves?: Transform[];
  /** Drawn behind / in front of the picture, on the picture's box. */
  behind?: ReactNode;
  front?: ReactNode;
  /** Draws the picture itself differently for this show (a part of it moves on its own). */
  art?: ReactNode;
  /** The well's bucket: how far down it goes, in px. */
  bucketY?: Node;
};

export const DATE_DARK = "#8E3A1B";
export const DATE = "#A3471F";
export const LEAF = "#21B573";
export const LEAF_DEEP = "#178A56";
export const WATER_LIGHT = "#8FD3FF";
export const INK = "#1F2D27";

export const k = (t: Animated.Value, keys: number[], values: number[]) => t.interpolate(smoothKeys(keys, values));
export const deg = (t: Animated.Value, keys: number[], values: number[]) => t.interpolate(smoothKeys(keys, values.map((value) => `${value}deg`)));

/** Shows something between `from` and `to` of the clock, fading in and out. */
export function windowOf(t: Animated.Value, from: number, to: number) {
  const edge = Math.min(0.05, (to - from) / 4);
  return t.interpolate({ inputRange: [0, from, from + edge, to - edge, to, 1], outputRange: [0, 0, 1, 1, 0, 0], extrapolate: "clamp" });
}

export function Abs({ x, y, style, children }: { x: number; y: number; style?: StyleProp<ViewStyle>; children?: ReactNode }) {
  return (
    <Animated.View pointerEvents="none" style={[styles.abs, { left: x, top: y }, style]}>
      {children}
    </Animated.View>
  );
}

/** Pads keyframes out to the whole 0..1 clock, holding the first and last values. */
export function within(input: number[], output: number[]) {
  const inputRange = [...input];
  const outputRange = [...output];
  if (inputRange[0] > 0) {
    inputRange.unshift(0);
    outputRange.unshift(outputRange[0]);
  }
  if (inputRange[inputRange.length - 1] < 1) {
    inputRange.push(1);
    outputRange.push(outputRange[outputRange.length - 1]);
  }
  return { inputRange, outputRange, extrapolate: "clamp" as const };
}

/** Falls from (x, y) by `fall` px between `from` and `to`, with a little bounce where it lands. */
export function Faller({ t, from, to, x, y, fall, drift = 0, spin = 0, children }: { t: Animated.Value; from: number; to: number; x: number; y: number; fall: number; drift?: number; spin?: number; children: ReactNode }) {
  const land = from + (to - from) * 0.55;
  const bounce = from + (to - from) * 0.72;
  const settle = from + (to - from) * 0.86;
  const fallCurve = sampleCurve(from, land, 8, (p) => fall * Math.pow((p - from) / (land - from), 2));
  const translateY = t.interpolate(within([...fallCurve.inputRange, bounce, settle], [...fallCurve.outputRange, fall - Math.min(8, fall * 0.18), fall]));
  const translateX = t.interpolate({ inputRange: [0, from, settle, 1], outputRange: [0, 0, drift, drift], extrapolate: "clamp" });
  const rotate = t.interpolate({ inputRange: [0, from, settle, 1], outputRange: ["0deg", "0deg", `${spin}deg`, `${spin}deg`], extrapolate: "clamp" });
  return (
    <Abs x={x} y={y} style={{ opacity: windowOf(t, from, Math.min(1, to)), transform: [{ translateX }, { translateY }, { rotate }] }}>
      {children}
    </Abs>
  );
}

/** Jumps from (x, y) up by `height` and over by `drift`, landing back at its own height. */
export function Hopper({ t, from, to, x, y, height, drift = 0, spin = 0, fade = true, children }: { t: Animated.Value; from: number; to: number; x: number; y: number; height: number; drift?: number; spin?: number; fade?: boolean; children: ReactNode }) {
  const arc = sampleCurve(from, to, 12, (p) => -height * Math.sin(Math.PI * ((p - from) / (to - from))));
  const translateY = t.interpolate(within(arc.inputRange, arc.outputRange));
  const translateX = t.interpolate({ inputRange: [0, from, to, 1], outputRange: [0, 0, drift, drift], extrapolate: "clamp" });
  const rotate = t.interpolate({ inputRange: [0, from, to, 1], outputRange: ["0deg", "0deg", `${spin}deg`, `${spin}deg`], extrapolate: "clamp" });
  return (
    <Abs x={x} y={y} style={{ opacity: fade ? windowOf(t, Math.max(0, from - 0.03), Math.min(1, to + 0.03)) : 1, transform: [{ translateX }, { translateY }, { rotate }] }}>
      {children}
    </Abs>
  );
}

export function DateFruit({ s }: { s: number }) {
  return <View style={{ width: s, height: s * 0.7, borderRadius: s * 0.35, backgroundColor: DATE, borderWidth: Math.max(1, s * 0.08), borderColor: DATE_DARK }} />;
}

export function Leaf({ s }: { s: number }) {
  return (
    <Svg width={s} height={s * 0.6} viewBox="0 0 20 12">
      <Path d="M1 6C5 0 15 0 19 6C15 12 5 12 1 6Z" fill={LEAF} />
      <Path d="M2 6H18" stroke={LEAF_DEEP} strokeWidth={1.2} />
    </Svg>
  );
}

export function Bubble({ s }: { s: number }) {
  return (
    <View style={{ width: s, height: s, borderRadius: s / 2, borderWidth: 1.4, borderColor: "#5BBDFF", backgroundColor: "rgba(255,255,255,0.5)" }}>
      <View style={{ position: "absolute", left: s * 0.2, top: s * 0.18, width: s * 0.25, height: s * 0.25, borderRadius: s, backgroundColor: "#FFFFFF" }} />
    </View>
  );
}

export function Note({ s }: { s: number }) {
  return <Word size={s} color="#8E5CF7">♪</Word>;
}

export function Rainbow({ w }: { w: number }) {
  return (
    <Svg width={w} height={w * 0.55} viewBox="0 0 90 50">
      {["#FF5A5A", "#FF9F1C", "#FFD43B", "#21B573", "#4C9BFF", "#8E5CF7"].map((color, index) => (
        <Path key={color} d={`M${8 + index * 4} 48A${37 - index * 4} ${37 - index * 4} 0 0 1 ${82 - index * 4} 48`} stroke={color} strokeWidth={4} fill="none" />
      ))}
    </Svg>
  );
}

export function Fish({ s }: { s: number }) {
  return (
    <Svg width={s} height={s * 0.6} viewBox="0 0 30 18">
      <Path d="M2 9C8 1 18 1 23 9C18 17 8 17 2 9Z" fill="#FF8A1F" />
      <Path d="M22 9L29 3V15Z" fill="#FF8A1F" />
      <Circle cx={8} cy={8} r={1.6} fill={INK} />
      <Path d="M12 5C14 8 14 11 12 13" stroke="#D96A0A" strokeWidth={1.2} fill="none" />
    </Svg>
  );
}

export function Duck({ s }: { s: number }) {
  return (
    <Svg width={s} height={s * 0.8} viewBox="0 0 30 24">
      <Path d="M4 14C4 10 8 9 12 10C14 6 22 6 26 12C27 18 22 22 14 22C8 22 4 19 4 14Z" fill="#FFD43B" />
      <Circle cx={10} cy={8} r={6} fill="#FFD43B" />
      <Path d="M2 8L5 6.5L5 10Z" fill="#FF8A1F" />
      <Circle cx={8.5} cy={6.6} r={1.2} fill={INK} />
      <Path d="M15 14C18 16 21 16 23 13" stroke="#F2A900" strokeWidth={1.4} fill="none" strokeLinecap="round" />
    </Svg>
  );
}

export function Frog({ s }: { s: number }) {
  return (
    <Svg width={s} height={s * 0.8} viewBox="0 0 30 24">
      <Ellipse cx={15} cy={16} rx={11} ry={7} fill="#3CC46E" />
      <Circle cx={9} cy={8} r={4.4} fill="#3CC46E" />
      <Circle cx={21} cy={8} r={4.4} fill="#3CC46E" />
      <Circle cx={9} cy={8} r={2.4} fill="#FFFFFF" />
      <Circle cx={21} cy={8} r={2.4} fill="#FFFFFF" />
      <Circle cx={9.4} cy={8.3} r={1.2} fill={INK} />
      <Circle cx={21.4} cy={8.3} r={1.2} fill={INK} />
      <Path d="M10 16Q15 20 20 16" stroke="#178A56" strokeWidth={1.6} fill="none" strokeLinecap="round" />
    </Svg>
  );
}

export function Lily({ s }: { s: number }) {
  return (
    <Svg width={s} height={s * 0.7} viewBox="0 0 30 21">
      <Path d="M15 15L28 13C28 19 22 21 15 21C7 21 2 19 2 15C2 11 8 9 15 9Z" fill="#21B573" />
      <Path d="M15 15L10 4L15 8L20 4Z" fill="#FF82AB" />
      <Path d="M15 15L6 8L12 10Z M15 15L24 8L18 10Z" fill="#FFB3CC" />
      <Circle cx={15} cy={12} r={2} fill="#FFD43B" />
    </Svg>
  );
}

export function Bird({ s }: { s: number }) {
  return (
    <Svg width={s} height={s * 0.8} viewBox="0 0 20 16">
      <Ellipse cx={10} cy={10} rx={6.5} ry={5} fill="#4C9BFF" />
      <Circle cx={14} cy={6} r={3.6} fill="#4C9BFF" />
      <Path d="M17 6L20 7L17 8Z" fill="#FF9F1C" />
      <Circle cx={15} cy={5.4} r={0.9} fill={INK} />
      <Path d="M6 9C8 7 11 7 12 10" stroke="#2F7CD6" strokeWidth={1.4} fill="none" strokeLinecap="round" />
      <Path d="M8 15V16.5M11 15V16.5" stroke="#FF9F1C" strokeWidth={1.2} strokeLinecap="round" />
    </Svg>
  );
}

export function Flame({ s, t }: { s: number; t: Animated.Value }) {
  const flicker = t.interpolate(sampleCurve(0, 1, 40, (p) => 1 + 0.14 * Math.sin(p * 2 * Math.PI * 9)));
  return (
    <View style={{ width: s, height: s }}>
      <Svg width={s} height={s} viewBox="0 0 30 30" style={StyleSheet.absoluteFill}>
        <Path d="M4 26L26 22M4 22L26 26" stroke="#9A5724" strokeWidth={3} strokeLinecap="round" />
      </Svg>
      <Animated.View style={[StyleSheet.absoluteFill, { transformOrigin: "bottom", transform: [{ scaleY: flicker }] }]}>
        <Svg width={s} height={s} viewBox="0 0 30 30">
          <Path d="M15 3C19 9 23 12 23 18C23 22 19 25 15 25C11 25 7 22 7 18C7 13 11 11 12 7C14 10 14 12 15 13C16 10 16 7 15 3Z" fill="#FF8A1F" />
          <Path d="M15 12C17 15 19 17 19 20C19 22.5 17 24 15 24C13 24 11 22.5 11 20C11 17.5 13 16 15 12Z" fill="#FFD43B" />
        </Svg>
      </Animated.View>
    </View>
  );
}

export function Gusts({ w }: { w: number }) {
  return (
    <Svg width={w} height={w * 0.3} viewBox="0 0 60 18">
      <Path d="M2 6H40C46 6 48 1 44 1M10 14H52C57 14 58 9 55 8" stroke="#9FCFBC" strokeWidth={2.4} strokeLinecap="round" fill="none" />
    </Svg>
  );
}

/** The well's rope and bucket, hanging from the beam. */
export function WellBucket() {
  return (
    <G>
      <Path d="M32 0V30" stroke={INK} strokeWidth={1.2} />
      <Path d="M27 30H37L36 37H28Z" fill="#9A5724" />
      <Path d="M27 30H37" stroke="#7A421A" strokeWidth={1.4} />
    </G>
  );
}

const SPLASH_DROPS = [
  { x: -16, peak: -20, end: 6, size: 5 },
  { x: -6, peak: -28, end: 2, size: 4 },
  { x: 7, peak: -26, end: 4, size: 4.5 },
  { x: 17, peak: -18, end: 8, size: 5 }
];

/** Drops that jump out of the water at (center, waterY) between `from` and `to`. */
export function Splash({ t, s, waterY, from, to, scale = 1 }: { t: Animated.Value; s: number; waterY: number; from: number; to: number; scale?: number }) {
  const u = s / 64;
  return (
    <>
      {SPLASH_DROPS.map((drop) => {
        const p = (value: number) => from + (to - from) * value;
        const d = drop.size * u * scale;
        return (
          <Abs
            key={drop.x}
            x={s / 2 - d / 2}
            y={waterY}
            style={{
              width: d,
              height: d,
              borderRadius: d / 2,
              backgroundColor: "#5BBDFF",
              opacity: t.interpolate({ inputRange: [0, p(0), p(0.05), p(0.8), p(1), 1], outputRange: [0, 0, 1, 1, 0, 0] }),
              transform: [
                { translateX: t.interpolate({ inputRange: [0, p(0), p(1), 1], outputRange: [0, 0, drop.x * u * scale, drop.x * u * scale] }) },
                { translateY: t.interpolate({ inputRange: [0, p(0), p(0.45), p(1), 1], outputRange: [0, 0, drop.peak * u * scale, drop.end * u, drop.end * u] }) }
              ]
            }}
          />
        );
      })}
    </>
  );
}

export function Rings({ t, s, cx, cy, from = 0 }: { t: Animated.Value; s: number; cx: number; cy: number; from?: number }) {
  return (
    <>
      {[0, 1, 2].map((index) => {
        const start = from + index * 0.18;
        const end = Math.min(1, start + 0.5);
        const w = s * 0.3;
        return (
          <Abs
            key={index}
            x={cx - w / 2}
            y={cy - w * 0.17}
            style={{
              width: w,
              height: w * 0.34,
              borderRadius: w,
              borderWidth: 1.6,
              borderColor: "#FFFFFF",
              opacity: t.interpolate({ inputRange: [0, start, start + 0.04, end, 1], outputRange: [0, 0, 0.9, 0, 0], extrapolate: "clamp" }),
              transform: [{ scale: t.interpolate({ inputRange: [0, start, end, 1], outputRange: [0.3, 0.3, 2.2, 2.2], extrapolate: "clamp" }) }]
            }}
          />
        );
      })}
    </>
  );
}

export function Bubbles({ t, s, cx, cy }: { t: Animated.Value; s: number; cx: number; cy: number }) {
  return (
    <>
      {[0, 1, 2, 3, 4].map((index) => (
        <Floater key={index} t={t} from={index * 0.12} to={index * 0.12 + 0.45} x={cx + ((index * 13) % 5 - 2) * s * 0.06} y={cy} rise={s * (0.45 + (index % 2) * 0.15)} drift={(index % 2 ? 1 : -1) * s * 0.05}>
          <Bubble s={s * (0.08 + (index % 3) * 0.03)} />
        </Floater>
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  abs: {
    position: "absolute"
  }
});
