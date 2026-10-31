import React, { useState, type ReactNode } from "react";
import { Animated, Pressable, StyleSheet, View, type StyleProp, type ViewStyle } from "react-native";
import Svg, { Circle, Ellipse, G, Path, Rect } from "react-native-svg";
import type { GameSoundEvent } from "../services/gameSoundLibrary";
import { sampleCurve, smoothKeys } from "./motion";
import { Drop, Floater, Heart, Puff, Sparkle, Word, shake, useCycle, useOneShot } from "./reactions";
import { Snooze, useScene } from "./sceneMood";
import { feedback } from "./sound";

/**
 * Tap shows for the pictures beside the path that have the most to play with: the well, the date palm,
 * the sheep, the tent, the basket of dates and the pond. Each tap plays the next show in turn (7 or 8
 * each), and a tap during a show skips straight to the next one, so taps never feel ignored. Everything
 * runs on one 0..1 clock on the native driver, eased with smoothKeys, and stands still when the phone
 * asks for reduced motion (the sound still plays).
 */

export type ShowKind = "well" | "palm" | "sheep" | "tent" | "dates" | "oasis";
export type SceneryShow = { name: string; sound: GameSoundEvent; ms: number; strong?: boolean };

export const SCENERY_SHOWS: Record<ShowKind, SceneryShow[]> = {
  well: [
    { name: "bucket", sound: "splash", ms: 1200 },
    { name: "grow", sound: "grow", ms: 2400 },
    { name: "fountain", sound: "splash", ms: 1700 },
    { name: "echo", sound: "giggle", ms: 1800 },
    { name: "bubbles", sound: "pop", ms: 1700 },
    { name: "yoyo", sound: "boing", ms: 1400 },
    { name: "rainbow", sound: "sparkle", ms: 2200 }
  ],
  palm: [
    { name: "wind", sound: "whoosh", ms: 1700 },
    { name: "drop", sound: "pop", ms: 1600 },
    { name: "bird", sound: "chirp", ms: 2400 },
    { name: "tall", sound: "grow", ms: 1700 },
    { name: "leaves", sound: "whoosh", ms: 2000 },
    { name: "dance", sound: "giggle", ms: 2000 },
    { name: "spin", sound: "zoom", ms: 1300 },
    { name: "harvest", sound: "sparkle", ms: 2200 }
  ],
  sheep: [
    { name: "baa", sound: "baa", ms: 1300 },
    { name: "fluff", sound: "grow", ms: 2000 },
    { name: "roll", sound: "zoom", ms: 1300 },
    { name: "munch", sound: "pop", ms: 1800 },
    { name: "love", sound: "sparkle", ms: 1800 },
    { name: "lamb", sound: "baa", ms: 2400 },
    { name: "bounce", sound: "boing", ms: 1500 }
  ],
  tent: [
    { name: "peek", sound: "giggle", ms: 1900 },
    { name: "wind", sound: "whoosh", ms: 1700 },
    { name: "fire", sound: "sizzle", ms: 2400 },
    { name: "bounce", sound: "boing", ms: 1500 },
    { name: "flag", sound: "sparkle", ms: 2000 },
    { name: "nap", sound: "snore", ms: 2400 },
    { name: "pop", sound: "pop", ms: 1400, strong: true }
  ],
  dates: [
    { name: "juggle", sound: "boing", ms: 1800 },
    { name: "tip", sound: "pop", ms: 2200, strong: true },
    { name: "fly", sound: "sparkle", ms: 1700 },
    { name: "rattle", sound: "grumble", ms: 1300 },
    { name: "heap", sound: "grow", ms: 2000 },
    { name: "wave", sound: "giggle", ms: 1800 },
    { name: "yum", sound: "sparkle", ms: 1800 }
  ],
  oasis: [
    { name: "splash", sound: "splash", ms: 1100 },
    { name: "fish", sound: "splash", ms: 1500 },
    { name: "ripples", sound: "pop", ms: 1800 },
    { name: "duck", sound: "giggle", ms: 2600 },
    { name: "frog", sound: "boing", ms: 1700 },
    { name: "lily", sound: "grow", ms: 2200 },
    { name: "bubbles", sound: "pop", ms: 1700 },
    { name: "rainbow", sound: "sparkle", ms: 2200 }
  ]
};

export function hasShows(kind: string): kind is ShowKind {
  return Object.prototype.hasOwnProperty.call(SCENERY_SHOWS, kind);
}

type Node = Animated.AnimatedInterpolation<number | string> | number | string;
type Transform = Record<string, Node>;
type Look = {
  /** Moves the picture itself (from its bottom middle). */
  moves?: Transform[];
  /** Drawn behind / in front of the picture, on the picture's box. */
  behind?: ReactNode;
  front?: ReactNode;
  /** The well's bucket: how far down it goes, in px. */
  bucketY?: Node;
};

const DATE_DARK = "#8E3A1B";
const DATE = "#A3471F";
const LEAF = "#21B573";
const LEAF_DEEP = "#178A56";
const WATER_LIGHT = "#8FD3FF";
const INK = "#1F2D27";

const k = (t: Animated.Value, keys: number[], values: number[]) => t.interpolate(smoothKeys(keys, values));
const deg = (t: Animated.Value, keys: number[], values: number[]) => t.interpolate(smoothKeys(keys, values.map((value) => `${value}deg`)));

/** Shows something between `from` and `to` of the clock, fading in and out. */
function windowOf(t: Animated.Value, from: number, to: number) {
  const edge = Math.min(0.05, (to - from) / 4);
  return t.interpolate({ inputRange: [0, from, from + edge, to - edge, to, 1], outputRange: [0, 0, 1, 1, 0, 0], extrapolate: "clamp" });
}

function Abs({ x, y, style, children }: { x: number; y: number; style?: StyleProp<ViewStyle>; children?: ReactNode }) {
  return (
    <Animated.View pointerEvents="none" style={[styles.abs, { left: x, top: y }, style]}>
      {children}
    </Animated.View>
  );
}

/** Pads keyframes out to the whole 0..1 clock, holding the first and last values. */
function within(input: number[], output: number[]) {
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
function Faller({ t, from, to, x, y, fall, drift = 0, spin = 0, children }: { t: Animated.Value; from: number; to: number; x: number; y: number; fall: number; drift?: number; spin?: number; children: ReactNode }) {
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
function Hopper({ t, from, to, x, y, height, drift = 0, spin = 0, fade = true, children }: { t: Animated.Value; from: number; to: number; x: number; y: number; height: number; drift?: number; spin?: number; fade?: boolean; children: ReactNode }) {
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

function DateFruit({ s }: { s: number }) {
  return <View style={{ width: s, height: s * 0.7, borderRadius: s * 0.35, backgroundColor: DATE, borderWidth: Math.max(1, s * 0.08), borderColor: DATE_DARK }} />;
}

function Leaf({ s }: { s: number }) {
  return (
    <Svg width={s} height={s * 0.6} viewBox="0 0 20 12">
      <Path d="M1 6C5 0 15 0 19 6C15 12 5 12 1 6Z" fill={LEAF} />
      <Path d="M2 6H18" stroke={LEAF_DEEP} strokeWidth={1.2} />
    </Svg>
  );
}

function Bubble({ s }: { s: number }) {
  return (
    <View style={{ width: s, height: s, borderRadius: s / 2, borderWidth: 1.4, borderColor: "#5BBDFF", backgroundColor: "rgba(255,255,255,0.5)" }}>
      <View style={{ position: "absolute", left: s * 0.2, top: s * 0.18, width: s * 0.25, height: s * 0.25, borderRadius: s, backgroundColor: "#FFFFFF" }} />
    </View>
  );
}

function Note({ s }: { s: number }) {
  return <Word size={s} color="#8E5CF7">♪</Word>;
}

function Rainbow({ w }: { w: number }) {
  return (
    <Svg width={w} height={w * 0.55} viewBox="0 0 90 50">
      {["#FF5A5A", "#FF9F1C", "#FFD43B", "#21B573", "#4C9BFF", "#8E5CF7"].map((color, index) => (
        <Path key={color} d={`M${8 + index * 4} 48A${37 - index * 4} ${37 - index * 4} 0 0 1 ${82 - index * 4} 48`} stroke={color} strokeWidth={4} fill="none" />
      ))}
    </Svg>
  );
}

function Fish({ s }: { s: number }) {
  return (
    <Svg width={s} height={s * 0.6} viewBox="0 0 30 18">
      <Path d="M2 9C8 1 18 1 23 9C18 17 8 17 2 9Z" fill="#FF8A1F" />
      <Path d="M22 9L29 3V15Z" fill="#FF8A1F" />
      <Circle cx={8} cy={8} r={1.6} fill={INK} />
      <Path d="M12 5C14 8 14 11 12 13" stroke="#D96A0A" strokeWidth={1.2} fill="none" />
    </Svg>
  );
}

function Duck({ s }: { s: number }) {
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

function Frog({ s }: { s: number }) {
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

function Lily({ s }: { s: number }) {
  return (
    <Svg width={s} height={s * 0.7} viewBox="0 0 30 21">
      <Path d="M15 15L28 13C28 19 22 21 15 21C7 21 2 19 2 15C2 11 8 9 15 9Z" fill="#21B573" />
      <Path d="M15 15L10 4L15 8L20 4Z" fill="#FF82AB" />
      <Path d="M15 15L6 8L12 10Z M15 15L24 8L18 10Z" fill="#FFB3CC" />
      <Circle cx={15} cy={12} r={2} fill="#FFD43B" />
    </Svg>
  );
}

function Bird({ s }: { s: number }) {
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

function Flame({ s, t }: { s: number; t: Animated.Value }) {
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

function Gusts({ w }: { w: number }) {
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

const SPLASH = [
  { x: -16, peak: -20, end: 6, size: 5 },
  { x: -6, peak: -28, end: 2, size: 4 },
  { x: 7, peak: -26, end: 4, size: 4.5 },
  { x: 17, peak: -18, end: 8, size: 5 }
];

/** Drops that jump out of the water at (center, waterY) between `from` and `to`. */
function Splash({ t, s, waterY, from, to, scale = 1 }: { t: Animated.Value; s: number; waterY: number; from: number; to: number; scale?: number }) {
  const u = s / 64;
  return (
    <>
      {SPLASH.map((drop) => {
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

function Rings({ t, s, cx, cy, from = 0 }: { t: Animated.Value; s: number; cx: number; cy: number; from?: number }) {
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

function Bubbles({ t, s, cx, cy }: { t: Animated.Value; s: number; cx: number; cy: number }) {
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

/** What each show looks like: moves for the picture and the bits around it. */
function lookFor(kind: ShowKind, name: string, t: Animated.Value, s: number, art: ReactNode): Look {
  const u = s / 64;
  switch (kind) {
    case "well": {
      const waterY = 36 * u;
      switch (name) {
        case "bucket":
          return { bucketY: k(t, [0, 0.25, 0.55, 1], [0, 14 * u, 14 * u, 0]), front: <Splash t={t} s={s} waterY={waterY} from={0.24} to={0.7} /> };
        case "grow":
          // Bigger, bigger, BIGGER... then pops back to its size with a sparkle.
          return {
            moves: [{ scale: k(t, [0, 0.1, 0.2, 0.32, 0.42, 0.56, 0.78, 0.86, 1], [1, 1.2, 1.14, 1.34, 1.28, 1.55, 1.55, 0.92, 1]) }],
            front: [0, 1, 2].map((index) => (
              <Floater key={index} t={t} from={0.8 + index * 0.03} to={1} x={s * (0.1 + index * 0.35)} y={s * (0.1 + (index % 2) * 0.2)} rise={s * 0.2}>
                <Sparkle size={Math.max(9, s * 0.16)} />
              </Floater>
            ))
          };
        case "fountain":
          return {
            moves: [{ scaleY: k(t, [0, 0.08, 0.16, 1], [1, 0.92, 1, 1]) }],
            front: Array.from({ length: 8 }, (_, index) => (
              <Floater key={index} t={t} from={0.05 + (index % 4) * 0.08} to={0.6 + (index % 4) * 0.08} x={s / 2 - 3} y={waterY - 2} rise={s * (0.6 + (index % 3) * 0.12)} drift={(index - 3.5) * s * 0.07} pop={false}>
                <Drop size={Math.max(5, 7 * u)} color="#5BBDFF" />
              </Floater>
            ))
          };
        case "echo":
          // "Hello!" into the well, and it calls back smaller and smaller.
          return {
            front: ["Hi!", "hi!", "hi"].map((word, index) => (
              <Floater key={word} t={t} from={index * 0.25} to={index * 0.25 + 0.4} x={s * (0.3 + index * 0.08)} y={s * 0.3} rise={s * 0.35} drift={(index % 2 ? 1 : -1) * s * 0.15}>
                <Word size={Math.max(9, (16 - index * 3) * u)} color="#2F7CD6">{word}</Word>
              </Floater>
            ))
          };
        case "bubbles":
          return { front: <Bubbles t={t} s={s} cx={s / 2 - s * 0.05} cy={waterY - 4} /> };
        case "yoyo":
          // The bucket bobs up and down like a yo-yo while the well wiggles.
          return {
            moves: [{ rotate: shake(t, 0, 0.9, 3, 4) }],
            bucketY: k(t, [0, 0.15, 0.3, 0.45, 0.6, 0.75, 1], [0, 13 * u, 0, 13 * u, 0, 13 * u, 0])
          };
        case "rainbow":
        default:
          return {
            behind: (
              <Abs
                x={s * 0.05}
                y={-s * 0.15}
                style={{ opacity: windowOf(t, 0.08, 0.95), transform: [{ scale: k(t, [0, 0.08, 0.3, 1], [0.3, 0.3, 1, 1]) }] }}
              >
                <Rainbow w={s * 0.9} />
              </Abs>
            ),
            front: <Splash t={t} s={s} waterY={waterY} from={0} to={0.4} scale={0.7} />
          };
      }
    }
    case "palm": {
      const crown = { x: 32 * u, y: 32 * u };
      switch (name) {
        case "wind":
          return {
            moves: [{ rotate: deg(t, [0, 0.15, 0.32, 0.5, 0.68, 0.84, 1], [0, 12, -6, 10, -4, 3, 0]) }],
            behind: (
              <Abs x={-s * 0.5} y={s * 0.15} style={{ opacity: windowOf(t, 0, 0.7), transform: [{ translateX: t.interpolate({ inputRange: [0, 0.7, 1], outputRange: [0, s * 1.6, s * 1.6] }) }] }}>
                <Gusts w={s * 0.8} />
              </Abs>
            )
          };
        case "drop":
          return {
            moves: [{ rotate: shake(t, 0, 0.3, 4, 3) }],
            front: [0, 1, 2].map((index) => (
              <Faller key={index} t={t} from={0.12 + index * 0.1} to={0.72 + index * 0.1} x={crown.x - 4 * u + (index - 1) * 5 * u} y={crown.y} fall={s * 0.42} drift={(index - 1) * s * 0.22} spin={(index - 1) * 120}>
                <DateFruit s={7 * u} />
              </Faller>
            ))
          };
        case "bird":
          // A little bird flies in, sits on the palm, sings, and flies off.
          return {
            front: (
              <>
                <Abs
                  x={crown.x - 6 * u}
                  y={2 * u}
                  style={{
                    opacity: windowOf(t, 0, 1),
                    transform: [
                      { translateX: k(t, [0, 0.25, 0.75, 1], [-s * 0.9, 0, 0, s * 0.9]) },
                      { translateY: k(t, [0, 0.25, 0.4, 0.5, 0.6, 0.75, 1], [-s * 0.4, 0, -3 * u, 0, -3 * u, 0, -s * 0.5]) }
                    ]
                  }}
                >
                  <Bird s={14 * u} />
                </Abs>
                {[0.3, 0.45, 0.6].map((from, index) => (
                  <Floater key={from} t={t} from={from} to={from + 0.25} x={crown.x + 6 * u} y={0} rise={s * 0.2} drift={(index - 1) * s * 0.1}>
                    <Note s={Math.max(10, 12 * u)} />
                  </Floater>
                ))}
              </>
            )
          };
        case "tall":
          return {
            moves: [
              { scaleY: k(t, [0, 0.12, 0.45, 0.62, 0.78, 0.9, 1], [1, 0.85, 1.4, 1.4, 0.9, 1.05, 1]) },
              { scaleX: k(t, [0, 0.12, 0.45, 0.62, 0.78, 1], [1, 1.1, 0.92, 0.92, 1.06, 1]) }
            ]
          };
        case "leaves":
          return {
            moves: [{ rotate: shake(t, 0, 0.35, 5, 3) }],
            front: Array.from({ length: 5 }, (_, index) => (
              <Floater key={index} t={t} from={0.05 + index * 0.1} to={0.6 + index * 0.08} x={s * (0.08 + index * 0.18)} y={s * 0.25} rise={-s * 0.55} drift={(index % 2 ? 1 : -1) * s * 0.18} pop={false}>
                <Leaf s={10 * u} />
              </Floater>
            ))
          };
        case "dance":
          return {
            moves: [
              { rotate: deg(t, [0, 0.12, 0.25, 0.37, 0.5, 0.62, 0.75, 0.87, 1], [0, -10, 10, -10, 10, -10, 10, -4, 0]) },
              { translateY: k(t, [0, 0.12, 0.18, 0.25, 0.31, 0.37, 0.43, 0.5, 0.56, 0.62, 0.68, 0.75, 1], [0, 0, -4, 0, -4, 0, -4, 0, -4, 0, -4, 0, 0]) }
            ],
            front: [0.05, 0.3, 0.55].map((from, index) => (
              <Floater key={from} t={t} from={from} to={from + 0.35} x={index % 2 ? s * 0.8 : 0} y={s * 0.2} rise={s * 0.3} drift={(index % 2 ? 1 : -1) * s * 0.1}>
                <Note s={Math.max(11, 14 * u)} />
              </Floater>
            ))
          };
        case "spin":
          return {
            moves: [
              { translateY: k(t, [0, 0.15, 0.5, 0.85, 1], [0, 2, -s * 0.25, 0, 0]) },
              { scaleX: t.interpolate(sampleCurve(0.1, 0.85, 24, (p) => Math.cos(((p - 0.1) / 0.75) * 4 * Math.PI))) }
            ]
          };
        case "harvest":
        default:
          // The dates shine gold, then a whole bunch falls into a little pile.
          return {
            front: (
              <>
                {[0, 1, 2].map((index) => (
                  <Floater key={`s${index}`} t={t} from={index * 0.08} to={0.4 + index * 0.08} x={crown.x - 8 * u + index * 6 * u} y={crown.y - 6 * u} rise={s * 0.15}>
                    <Sparkle size={Math.max(9, 11 * u)} />
                  </Floater>
                ))}
                {Array.from({ length: 5 }, (_, index) => (
                  <Faller key={index} t={t} from={0.3 + index * 0.06} to={0.85 + index * 0.03} x={crown.x - 4 * u} y={crown.y} fall={s * 0.44} drift={(index - 2) * s * 0.12} spin={index * 70}>
                    <DateFruit s={7 * u} />
                  </Faller>
                ))}
              </>
            )
          };
      }
    }
    case "sheep": {
      const head = { x: 51 * u, y: 24 * u };
      switch (name) {
        case "baa":
          return {
            moves: [
              { translateY: k(t, [0, 0.25, 0.5, 0.62, 1], [0, -s * 0.18, 0, -3, 0]) },
              { scaleY: k(t, [0, 0.45, 0.52, 0.62, 1], [1, 1, 0.88, 1.04, 1]) }
            ],
            front: (
              <Floater t={t} from={0.05} to={0.85} x={head.x - 4 * u} y={head.y - 12 * u} rise={s * 0.2} drift={s * 0.1}>
                <Word size={Math.max(11, 14 * u)} color="#8A4B1E">BAA</Word>
              </Floater>
            )
          };
        case "fluff":
          // It puffs up into a big ball of wool, and little tufts fly off when it settles.
          return {
            moves: [
              { scaleX: k(t, [0, 0.35, 0.6, 0.75, 1], [1, 1.35, 1.35, 0.95, 1]) },
              { scaleY: k(t, [0, 0.35, 0.6, 0.75, 1], [1, 1.25, 1.25, 0.95, 1]) }
            ],
            front: [0, 1, 2, 3].map((index) => (
              <Floater key={index} t={t} from={0.6 + index * 0.04} to={0.95} x={s * (0.15 + index * 0.2)} y={s * 0.35} rise={s * 0.35} drift={(index - 1.5) * s * 0.15}>
                <Puff size={Math.max(8, 10 * u)} />
              </Floater>
            ))
          };
        case "roll":
          return {
            moves: [
              { translateY: k(t, [0, 0.2, 0.5, 0.8, 1], [0, -s * 0.12, -s * 0.28, -s * 0.05, 0]) },
              { rotate: t.interpolate(smoothKeys([0, 0.15, 0.85, 1], ["0deg", "0deg", "360deg", "360deg"])) }
            ]
          };
        case "munch":
          // Head down to nibble the grass three times.
          return {
            moves: [{ rotate: deg(t, [0, 0.12, 0.25, 0.37, 0.5, 0.62, 0.75, 1], [0, 10, 3, 10, 3, 10, 0, 0]) }],
            front: (
              <>
                {[0.15, 0.4, 0.65].map((from, index) => (
                  <Floater key={from} t={t} from={from} to={from + 0.25} x={s * 0.82} y={s * 0.75} rise={s * 0.2} drift={(index - 1) * s * 0.08}>
                    <View style={{ width: 3 * u + 1, height: 6 * u + 2, borderRadius: 2, backgroundColor: LEAF }} />
                  </Floater>
                ))}
                <Floater t={t} from={0.3} to={0.95} x={s * 0.55} y={s * 0.02} rise={s * 0.15}>
                  <Word size={Math.max(9, 11 * u)} color="#178A56">munch</Word>
                </Floater>
              </>
            )
          };
        case "love":
          return {
            moves: [{ translateY: k(t, [0, 0.2, 0.4, 0.6, 1], [0, -4, 0, -4, 0]) }],
            front: [0, 0.18, 0.36].map((from, index) => (
              <Floater key={from} t={t} from={from} to={from + 0.55} x={head.x - 6 * u + (index - 1) * 8 * u} y={head.y - 8 * u} rise={s * 0.35} drift={(index - 1) * 6 * u}>
                <Heart size={Math.max(10, 12 * u)} />
              </Floater>
            ))
          };
        case "lamb":
          // A little lamb hops in beside it, says hello, and hops back out.
          return {
            behind: (
              <Abs
                x={-s * 0.35}
                y={s * 0.45}
                style={{
                  width: s,
                  height: s,
                  opacity: windowOf(t, 0, 1),
                  transform: [
                    { translateX: k(t, [0, 0.3, 0.75, 1], [-s * 0.5, 0, 0, -s * 0.5]) },
                    { translateY: k(t, [0, 0.1, 0.2, 0.3, 0.75, 0.85, 0.95, 1], [0, -6, 0, -6, 0, -6, 0, 0]) },
                    { scale: 0.45 }
                  ]
                }}
              >
                {art}
              </Abs>
            ),
            front: (
              <Floater t={t} from={0.35} to={0.75} x={s * 0.0} y={s * 0.3} rise={s * 0.15}>
                <Word size={Math.max(9, 11 * u)} color="#8A4B1E">baa!</Word>
              </Floater>
            )
          };
        case "bounce":
        default:
          return {
            moves: [
              { translateY: k(t, [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 1], [0, -s * 0.2, 0, -s * 0.28, 0, -s * 0.15, 0, 0]) },
              { scaleY: k(t, [0, 0.28, 0.32, 0.43, 0.58, 0.62, 0.73, 0.88, 0.92, 1], [1, 1, 0.84, 1.06, 1, 0.84, 1.06, 1, 0.9, 1]) }
            ]
          };
      }
    }
    case "tent": {
      const door = { x: 32 * u, y: 46 * u };
      switch (name) {
        case "peek":
          // Two eyes blink out of the dark doorway: who's in there?
          return {
            front: (
              <>
                <Abs x={door.x - 6 * u} y={door.y - 4 * u} style={{ opacity: windowOf(t, 0.05, 0.9), flexDirection: "row", gap: 3 * u, transform: [{ scaleY: k(t, [0, 0.4, 0.44, 0.48, 0.7, 0.74, 0.78, 1], [1, 1, 0.1, 1, 1, 0.1, 1, 1]) }] }}>
                  {[0, 1].map((eye) => (
                    <View key={eye} style={{ width: 5 * u, height: 5 * u, borderRadius: 5 * u, backgroundColor: "#FFFFFF", alignItems: "center", justifyContent: "center" }}>
                      <View style={{ width: 2.4 * u, height: 2.4 * u, borderRadius: 3 * u, backgroundColor: INK }} />
                    </View>
                  ))}
                </Abs>
                <Floater t={t} from={0.25} to={0.85} x={door.x + 8 * u} y={door.y - 24 * u} rise={s * 0.12}>
                  <Word size={Math.max(12, 16 * u)} color="#FF8A1F">?</Word>
                </Floater>
              </>
            )
          };
        case "wind":
          return {
            moves: [
              { scaleX: k(t, [0, 0.15, 0.3, 0.45, 0.6, 0.8, 1], [1, 1.06, 0.95, 1.05, 0.97, 1.02, 1]) },
              { rotate: deg(t, [0, 0.15, 0.3, 0.45, 0.6, 0.8, 1], [0, 4, -3, 3, -2, 1, 0]) }
            ],
            behind: (
              <Abs x={-s * 0.5} y={s * 0.2} style={{ opacity: windowOf(t, 0, 0.75), transform: [{ translateX: t.interpolate({ inputRange: [0, 0.75, 1], outputRange: [0, s * 1.6, s * 1.6] }) }] }}>
                <Gusts w={s * 0.8} />
              </Abs>
            )
          };
        case "fire":
          // A little campfire in front of the tent, with smoke curling up.
          return {
            front: (
              <>
                <Abs x={s * 0.66} y={s * 0.62} style={{ opacity: windowOf(t, 0.02, 0.95), transform: [{ scale: k(t, [0, 0.1, 0.2, 1], [0.2, 0.2, 1, 1]) }] }}>
                  <Flame s={s * 0.38} t={t} />
                </Abs>
                {[0.2, 0.4, 0.6].map((from, index) => (
                  <Floater key={from} t={t} from={from} to={from + 0.35} x={s * 0.78} y={s * 0.55} rise={s * 0.4} drift={(index % 2 ? 1 : -1) * s * 0.08} pop={false}>
                    <Puff size={Math.max(8, 10 * u)} color="#E7ECEA" />
                  </Floater>
                ))}
              </>
            )
          };
        case "bounce":
          return {
            moves: [
              { translateY: k(t, [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 1], [0, -s * 0.12, 0, -s * 0.18, 0, -s * 0.1, 0, 0]) },
              { scaleY: k(t, [0, 0.28, 0.32, 0.4, 0.58, 0.62, 0.7, 0.88, 0.92, 1], [1, 1, 0.82, 1.06, 1, 0.82, 1.06, 1, 0.9, 1]) },
              { scaleX: k(t, [0, 0.28, 0.32, 0.4, 0.58, 0.62, 0.7, 1], [1, 1, 1.12, 0.96, 1, 1.12, 0.96, 1]) }
            ]
          };
        case "flag":
          // A little flag goes up the pole and flaps in the wind.
          return {
            front: (
              <Abs
                x={33 * u}
                y={-2 * u}
                style={{
                  opacity: windowOf(t, 0.02, 0.98),
                  transformOrigin: "left",
                  transform: [{ translateY: k(t, [0, 0.25, 0.8, 1], [10 * u, 0, 0, 10 * u]) }, { scaleX: t.interpolate(sampleCurve(0, 1, 40, (p) => 0.75 + 0.25 * Math.sin(p * 2 * Math.PI * 6))) }]
                }}
              >
                <Svg width={14 * u} height={10 * u} viewBox="0 0 14 10">
                  <Path d="M0 0L14 5L0 10Z" fill="#21B573" />
                </Svg>
              </Abs>
            ),
            behind: (
              <Abs x={31.8 * u} y={-4 * u} style={{ width: 1.6 * u + 0.5, height: 12 * u, backgroundColor: "#9A5724", opacity: windowOf(t, 0, 1) }} />
            )
          };
        case "nap":
          // Somebody's napping inside: a warm glow in the door and snores.
          return {
            front: (
              <>
                <Abs x={door.x - 6 * u} y={door.y - 12 * u} style={{ width: 12 * u, height: 22 * u, borderRadius: 4 * u, backgroundColor: "#FFD43B", opacity: t.interpolate({ inputRange: [0, 0.1, 0.85, 1], outputRange: [0, 0.6, 0.6, 0] }) }} />
                {[0.1, 0.4, 0.7].map((from, index) => (
                  <Floater key={from} t={t} from={from} to={from + 0.3} x={door.x + 4 * u} y={door.y - 16 * u} rise={s * 0.3} drift={s * 0.15}>
                    <Word size={Math.max(10, (11 + index * 2) * u)} color="#4C5BD4">Z</Word>
                  </Floater>
                ))}
              </>
            )
          };
        case "pop":
        default:
          // Folds down flat... then springs back up.
          return {
            moves: [
              { scaleY: k(t, [0, 0.25, 0.5, 0.68, 0.8, 0.9, 1], [1, 0.2, 0.2, 1.2, 0.92, 1.03, 1]) },
              { scaleX: k(t, [0, 0.25, 0.5, 0.68, 0.8, 1], [1, 1.25, 1.25, 0.9, 1.04, 1]) }
            ],
            front: [0, 1, 2].map((index) => (
              <Floater key={index} t={t} from={0.62 + index * 0.04} to={0.98} x={s * (0.1 + index * 0.35)} y={s * 0.2} rise={s * 0.2}>
                <Sparkle size={Math.max(9, 11 * u)} />
              </Floater>
            ))
          };
      }
    }
    case "dates": {
      const top = { x: 32 * u, y: 26 * u };
      switch (name) {
        case "juggle":
          return {
            front: [0, 1, 2].map((index) => (
              <Hopper key={index} t={t} from={index * 0.18} to={index * 0.18 + 0.5} x={top.x - 4 * u + (index - 1) * 9 * u} y={top.y} height={s * (0.4 + index * 0.08)} drift={(1 - index) * 9 * u} spin={360}>
                <DateFruit s={8 * u} />
              </Hopper>
            ))
          };
        case "tip":
          // Tips over, the dates roll out, then it rights itself and they hop back in.
          return {
            moves: [{ rotate: deg(t, [0, 0.15, 0.3, 0.65, 0.8, 0.9, 1], [0, -10, -55, -55, 6, -2, 0]) }],
            front: [0, 1, 2].map((index) => (
              <Abs
                key={index}
                x={s * 0.15}
                y={s * 0.78}
                style={{
                  opacity: windowOf(t, 0.25, 0.85),
                  transform: [
                    { translateX: k(t, [0, 0.25, 0.5, 0.65, 0.85, 1], [0, 0, -(index + 1) * 9 * u, -(index + 1) * 9 * u, s * 0.25, s * 0.25]) },
                    { translateY: k(t, [0, 0.65, 0.75, 0.85, 1], [0, 0, -s * 0.35, -s * 0.4, -s * 0.4]) },
                    { rotate: deg(t, [0, 0.25, 0.5, 1], [0, 0, -300, -300]) }
                  ]
                }}
              >
                <DateFruit s={8 * u} />
              </Abs>
            ))
          };
        case "fly":
          return {
            moves: [{ scaleY: k(t, [0, 0.08, 0.15, 1], [1, 0.88, 1, 1]) }],
            front: (
              <>
                <Hopper t={t} from={0.05} to={0.95} x={top.x - 5 * u} y={top.y} height={s * 0.75} spin={720}>
                  <DateFruit s={10 * u} />
                </Hopper>
                {[0.3, 0.45, 0.6].map((from, index) => (
                  <Floater key={from} t={t} from={from} to={from + 0.3} x={top.x + (index - 1) * 14 * u} y={-s * 0.3} rise={s * 0.1}>
                    <Sparkle size={Math.max(9, 11 * u)} />
                  </Floater>
                ))}
              </>
            )
          };
        case "rattle":
          return {
            moves: [{ translateX: shake(t, 0, 0.85, 3 * u, 7, "") }, { rotate: shake(t, 0, 0.85, 4, 5) }],
            front: [0, 1, 2, 3].map((index) => (
              <Hopper key={index} t={t} from={0.05 + index * 0.16} to={0.2 + index * 0.16} x={top.x - 12 * u + index * 7 * u} y={top.y} height={s * 0.12} fade={false}>
                <DateFruit s={7 * u} />
              </Hopper>
            ))
          };
        case "heap":
          // More and more dates pile up on top, then roll back down into it.
          return {
            front: Array.from({ length: 6 }, (_, index) => {
              const row = index < 3 ? 0 : index < 5 ? 1 : 2;
              const at = 0.08 + index * 0.1;
              const x = top.x - 4 * u + (row === 0 ? (index - 1) * 9 * u : row === 1 ? (index - 3.5) * 9 * u : 0);
              return (
                <Abs
                  key={index}
                  x={x}
                  y={top.y - (row + 1) * 6 * u}
                  style={{
                    opacity: t.interpolate({ inputRange: [0, at, at + 0.04, 0.82, 0.92, 1], outputRange: [0, 0, 1, 1, 0, 0], extrapolate: "clamp" }),
                    transform: [{ translateY: k(t, [0, at, at + 0.08, 0.82, 0.92, 1], [-s * 0.4, -s * 0.4, 0, 0, 6 * u, 6 * u]) }]
                  }}
                >
                  <DateFruit s={8 * u} />
                </Abs>
              );
            })
          };
        case "wave":
          // The dates hop one after another, like a crowd doing a wave.
          return {
            front: Array.from({ length: 5 }, (_, index) => (
              <Hopper key={index} t={t} from={index * 0.12} to={index * 0.12 + 0.3} x={14 * u + index * 8 * u} y={top.y} height={s * 0.18} fade={false}>
                <DateFruit s={7 * u} />
              </Hopper>
            ))
          };
        case "yum":
        default:
          return {
            moves: [{ translateY: k(t, [0, 0.2, 0.35, 1], [0, -4, 0, 0]) }],
            front: (
              <>
                <Floater t={t} from={0.05} to={0.9} x={top.x - 4 * u} y={top.y - 6 * u} rise={s * 0.35}>
                  <DateFruit s={10 * u} />
                </Floater>
                <Floater t={t} from={0.3} to={0.95} x={top.x - 14 * u} y={-s * 0.05} rise={s * 0.15}>
                  <Word size={Math.max(11, 14 * u)} color="#FF8A1F">YUM</Word>
                </Floater>
                {[0.4, 0.55].map((from, index) => (
                  <Floater key={from} t={t} from={from} to={from + 0.4} x={index ? s * 0.8 : s * 0.05} y={s * 0.2} rise={s * 0.25}>
                    <Heart size={Math.max(9, 11 * u)} />
                  </Floater>
                ))}
              </>
            )
          };
      }
    }
    case "oasis":
    default: {
      const water = { x: 32 * u, y: 46 * u };
      switch (name) {
        case "splash":
          return { moves: [{ translateY: k(t, [0, 0.3, 0.55, 0.7, 1], [0, -8, 0, -2, 0]) }], front: <Splash t={t} s={s} waterY={water.y} from={0.02} to={0.8} /> };
        case "fish":
          return {
            front: (
              <>
                <Hopper t={t} from={0.05} to={0.75} x={water.x - 18 * u} y={water.y - 6 * u} height={s * 0.5} drift={22 * u} spin={140}>
                  <Fish s={14 * u} />
                </Hopper>
                <Splash t={t} s={s} waterY={water.y} from={0.68} to={1} scale={0.7} />
              </>
            )
          };
        case "ripples":
          return { front: <Rings t={t} s={s} cx={water.x} cy={water.y} /> };
        case "duck":
          // A duck paddles across the pond.
          return {
            front: (
              <Abs
                x={water.x - 7 * u}
                y={water.y - 12 * u}
                style={{
                  opacity: windowOf(t, 0, 1),
                  transform: [
                    { translateX: k(t, [0, 1], [-20 * u, 20 * u]) },
                    { translateY: t.interpolate(sampleCurve(0, 1, 30, (p) => Math.sin(p * 2 * Math.PI * 4) * 1.2 * u)) },
                    { scaleX: -1 }
                  ]
                }}
              >
                <Duck s={14 * u} />
              </Abs>
            ),
            behind: <Rings t={t} s={s} cx={water.x} cy={water.y + 2 * u} from={0.1} />
          };
        case "frog":
          return {
            front: (
              <>
                <Hopper t={t} from={0.05} to={0.6} x={water.x - 7 * u} y={water.y - 10 * u} height={s * 0.45} drift={-14 * u}>
                  <Frog s={14 * u} />
                </Hopper>
                <Floater t={t} from={0.3} to={0.95} x={water.x - 20 * u} y={0} rise={s * 0.15}>
                  <Word size={Math.max(10, 12 * u)} color="#178A56">ribbit</Word>
                </Floater>
              </>
            )
          };
        case "lily":
          return {
            front: (
              <Abs
                x={water.x - 8 * u}
                y={water.y - 10 * u}
                style={{ opacity: windowOf(t, 0.02, 0.98), transform: [{ scale: k(t, [0, 0.15, 0.4, 0.5, 0.85, 1], [0.1, 0.1, 1.15, 1, 1, 0.3]) }] }}
              >
                <Lily s={16 * u} />
              </Abs>
            )
          };
        case "bubbles":
          return { front: <Bubbles t={t} s={s} cx={water.x - 4 * u} cy={water.y - 4 * u} /> };
        case "rainbow":
        default:
          return {
            behind: (
              <Abs x={s * 0.05} y={0} style={{ opacity: windowOf(t, 0.05, 0.95), transform: [{ scale: k(t, [0, 0.05, 0.3, 1], [0.3, 0.3, 1, 1]) }] }}>
                <Rainbow w={s * 0.9} />
              </Abs>
            ),
            front: [0, 1, 2].map((index) => (
              <Floater key={index} t={t} from={0.2 + index * 0.1} to={0.6 + index * 0.1} x={s * (0.15 + index * 0.3)} y={s * 0.2} rise={s * 0.15}>
                <Sparkle size={Math.max(8, 10 * u)} color={WATER_LIGHT} />
              </Floater>
            ))
          };
      }
    }
  }
}

/** Closed eyes for the sleeping sheep, over its open one. */
function SleepyEye({ size }: { size: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 64 64" style={StyleSheet.absoluteFill} pointerEvents="none">
      <Circle cx={53.2} cy={31.2} r={2.2} fill="#5A4A42" />
      <Path d="M51 31.2Q53.2 33.4 55.4 31.2" stroke="#FFFFFF" strokeWidth={1.1} strokeLinecap="round" fill="none" />
    </Svg>
  );
}

export type ShowSceneryProps = {
  kind: ShowKind;
  size: number;
  /** The picture itself, drawn at `size`. */
  art: ReactNode;
  /** The plant sway, when the picture sways. */
  sway?: Animated.AnimatedInterpolation<string> | null;
  reduceMotion: boolean;
  style?: StyleProp<ViewStyle>;
};

/** A picture beside the path that plays SCENERY_SHOWS[kind] one per tap. */
export function ShowScenery({ kind, size, art, sway, reduceMotion, style }: ShowSceneryProps) {
  const shows = SCENERY_SHOWS[kind];
  const [show, setShow] = useState<number | null>(null);
  const { value: t, play } = useOneShot();
  const next = useCycle(shows.length);
  const { asleep } = useScene();

  const onTap = () => {
    // A tap mid-show skips to the next one at once, so every tap gets an answer.
    const index = next();
    const pick = shows[index];
    feedback(pick.sound, pick.strong ? "medium" : "light");
    setShow(index);
    play(reduceMotion ? 500 : pick.ms, () => setShow(null));
  };

  const u = size / 64;
  const look: Look = show !== null && !reduceMotion ? lookFor(kind, shows[show].name, t, size, art) : {};
  const sleeping = asleep && (kind === "sheep" || kind === "tent");
  return (
    <Pressable onPress={onTap} hitSlop={6} accessibilityRole="button" accessibilityLabel={kind} style={[{ width: size, height: size }, style]} testID={`scenery-${kind}`}>
      {look.behind}
      <Animated.View
        style={{
          width: size,
          height: size,
          transformOrigin: "bottom",
          transform: [...(sway ? [{ rotate: sway }] : []), ...((look.moves ?? []) as never[])]
        }}
      >
        {art}
        {kind === "well" ? (
          // Clipped from under the beam down to the water, so the bucket sinks out of sight.
          <View style={[styles.bucketClip, { top: 21 * u, height: 18 * u }]}>
            <Animated.View style={{ width: size, height: size, marginTop: -21 * u, transform: [{ translateY: (look.bucketY ?? 0) as number }] }}>
              <Svg width={size} height={size} viewBox="0 0 64 64">
                <WellBucket />
              </Svg>
            </Animated.View>
          </View>
        ) : null}
        {sleeping && kind === "sheep" ? <SleepyEye size={size} /> : null}
      </Animated.View>
      {look.front}
      {sleeping ? <Snooze x={kind === "sheep" ? 50 * u : 34 * u} y={kind === "sheep" ? 22 * u : 36 * u} size={Math.max(10, 12 * u)} /> : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  abs: {
    position: "absolute"
  },
  bucketClip: {
    position: "absolute",
    left: 0,
    right: 0,
    overflow: "hidden"
  }
});
