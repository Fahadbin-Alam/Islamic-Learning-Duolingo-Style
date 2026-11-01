import React, { useState, type ReactNode } from "react";
import { Animated, Pressable, StyleSheet, View, type StyleProp, type ViewStyle } from "react-native";
import Svg, { Circle, Path } from "react-native-svg";
import type { GameSoundEvent } from "../services/gameSoundLibrary";
import { sampleCurve, smoothKeys } from "./motion";
import { Drop, Floater, Heart, Puff, Sparkle, Word, shake, useCycle, useOneShot } from "./reactions";
import { Snooze, useScene } from "./sceneMood";
import {
  Abs,
  Bird,
  Bubbles,
  DateFruit,
  Duck,
  Fish,
  Flame,
  Frog,
  Gusts,
  Hopper,
  Faller,
  INK,
  LEAF,
  Leaf,
  Lily,
  Note,
  Rainbow,
  Rings,
  Splash,
  WATER_LIGHT,
  WellBucket,
  deg,
  k,
  windowOf,
  type Look
} from "./showKit";
import { feedback } from "./sound";
import { BookStandArt, WORLD_SHOWS, worldLook, type WorldShowKind } from "./worldShows";

export { WellBucket };

/**
 * Tap shows for the pictures beside the path that have the most to play with: the well, the date palm,
 * the sheep, the tent, the basket of dates and the pond. Each tap plays the next show in turn (7 or 8
 * each), and a tap during a show skips straight to the next one, so taps never feel ignored. Everything
 * runs on one 0..1 clock on the native driver, eased with smoothKeys, and stands still when the phone
 * asks for reduced motion (the sound still plays).
 */

export type ShowKind = "well" | "palm" | "sheep" | "tent" | "dates" | "oasis" | WorldShowKind;
export type SceneryShow = { name: string; sound: GameSoundEvent; ms: number; strong?: boolean };

export const SCENERY_SHOWS: Record<ShowKind, SceneryShow[]> = {
  ...WORLD_SHOWS,
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
    case "oasis": {
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
    default:
      return worldLook(kind, name, t, s, art);
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

  // The book stand's book stays up on its shelf between taps until a tap brings it down.
  const [shelved, setShelved] = useState(false);

  const onTap = () => {
    // A tap mid-show skips to the next one at once, so every tap gets an answer.
    const index = next();
    const pick = shows[index];
    feedback(pick.sound, pick.strong ? "medium" : "light");
    setShow(index);
    if (kind === "bookStand") setShelved(pick.name === "shelf" ? true : pick.name === "down" ? false : shelved);
    play(reduceMotion ? 500 : pick.ms, () => setShow(null));
  };

  const u = size / 64;
  const name = show !== null ? shows[show].name : null;
  // A show that moves the book needs it on the stand; with the book shelved the others play around the empty stand.
  const restArt = kind === "bookStand" ? <BookStandArt size={size} shelved={shelved} /> : art;
  const look: Look = name !== null && !reduceMotion ? lookFor(kind, name, t, size, restArt) : {};
  const drawn = kind === "bookStand" && shelved && name !== "shelf" && look.art ? restArt : look.art ?? restArt;
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
        {drawn}
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
