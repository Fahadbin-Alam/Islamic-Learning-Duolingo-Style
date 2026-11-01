import React, { memo, useEffect, useRef, useState } from "react";
import { Animated, Easing, Pressable, StyleSheet, View } from "react-native";
import Svg, { Circle, Defs, Ellipse, G, LinearGradient, Path, Rect, Stop } from "react-native-svg";
import { useReduceMotion } from "./Camel";
import type { GameSoundEvent } from "../services/gameSoundLibrary";
import { sampleCurve, smoothKeys } from "./motion";
import { Drop, Floater, Heart, Sparkle, Word, shake, useCycle, useOneShot } from "./reactions";
import { useScene } from "./sceneMood";
import { BACKDROP_H, WorldBackdrop, type PathWorld } from "./pathWorlds";
import { feedback, playUi } from "./sound";
import { METEOR_HIT, bigLook } from "./bigShows";

/**
 * The sky behind a unit of the path. Each unit has its own weather, so walking down the path feels
 * like days going by: a sunny sky, a breezy one, clouds, a little rain, a sunset, birds flying by. Tapping
 * the sun turns it into a full moon and night falls over the path (see sceneMood.tsx); tapping the moon
 * shows its phases (full, gibbous, half), then brings the day back. Only plain weather: never a thin
 * crescent, and no stars (see the content rule in docs/design-system.md).
 */
export type Weather = "sunny" | "breeze" | "cloudy" | "rain" | "sunset";

const ORDER: Weather[] = ["sunny", "breeze", "cloudy", "rain", "sunset"];

/** A unit's weather: the units take turns through ORDER, each topic starting at its own place. */
export function weatherFor(topicId: string, unitIndex: number): Weather {
  let seed = 0;
  for (let index = 0; index < topicId.length; index += 1) seed = (seed + topicId.charCodeAt(index)) % ORDER.length;
  return ORDER[(seed + unitIndex) % ORDER.length];
}

type Sky = { top: string; bottom: string; cloud: string; cloudLip: string };

const SKIES: Record<Weather, Sky> = {
  sunny: { top: "#DDF1FF", bottom: "#FFFFFF", cloud: "#FFFFFF", cloudLip: "#D5E7F3" },
  breeze: { top: "#E2F5EE", bottom: "#FFFFFF", cloud: "#FFFFFF", cloudLip: "#D3E8E0" },
  cloudy: { top: "#E8EEF3", bottom: "#FFFFFF", cloud: "#FFFFFF", cloudLip: "#D2DCE4" },
  rain: { top: "#DDE5EE", bottom: "#F7FAFC", cloud: "#C9D5E0", cloudLip: "#AEBDCB" },
  sunset: { top: "#FFE6D2", bottom: "#FFFFFF", cloud: "#FFF4EA", cloudLip: "#F6D4BD" }
};

/** One stretch of sky; long units repeat it down the path. */
const BAND = 420;
/** Px from the unit's top until its sky is at full color (the banner sits over most of it). */
const SKY_IN = 150;
/** How far the sky runs on past the bottom of its unit (LearnPath adds it to the unit's height). */
const SKY_TAIL = 40;
const CLOUD_W = 84;
const CLOUD_H = 40;

function useLoopValue(active: boolean, duration: number, delay = 0) {
  const value = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    value.setValue(0);
    if (!active) return undefined;
    const loop = Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(value, { toValue: 1, duration, easing: Easing.linear, useNativeDriver: true })
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [active, duration, delay, value]);
  return value;
}

function CloudShape({ color, lip, width }: { color: string; lip: string; width: number }) {
  return (
    <Svg width={width} height={(width * CLOUD_H) / CLOUD_W} viewBox={`0 0 ${CLOUD_W} ${CLOUD_H}`}>
      <Path d="M14 38C6 38 2 33 2 28C2 22 7 18 13 19C14 11 21 6 29 8C33 2 42 0 49 4C55 1 64 3 67 10C75 9 82 15 82 23C82 31 76 38 68 38Z" fill={lip} />
      <Path d="M14 35C6 35 2 30 2 25C2 19 7 15 13 16C14 8 21 3 29 5C33 -1 42 -3 49 1C55 -2 64 0 67 7C75 6 82 12 82 20C82 28 76 35 68 35Z" fill={color} />
    </Svg>
  );
}

type CloudShow = "rain" | "storm" | "sunny";
/** Tapping a cloud: it rains, then it storms, then it clears to a rainbow and comes back. */
const CLOUD_SHOWS: { kind: CloudShow; sound: GameSoundEvent; ms: number }[] = [
  { kind: "rain", sound: "splash", ms: 2600 },
  { kind: "storm", sound: "thunder", ms: 2600 },
  { kind: "sunny", sound: "sparkle", ms: 2600 }
];

const STORM = { cloud: "#8E9AA8", cloudLip: "#6F7C8B" };

/** A cloud you can tap (see CLOUD_SHOWS). */
function TapCloud({ sky, size, reduceMotion }: { sky: Sky; size: number; reduceMotion: boolean }) {
  const [show, setShow] = useState<CloudShow | null>(null);
  const { value: t, play } = useOneShot();
  const next = useCycle(CLOUD_SHOWS.length);
  const height = (size * CLOUD_H) / CLOUD_W;
  const onTap = () => {
    if (show) return;
    const pick = CLOUD_SHOWS[next()];
    feedback(pick.sound, pick.kind === "storm" ? "medium" : "light");
    setShow(pick.kind);
    play(reduceMotion ? 700 : pick.ms, () => setShow(null));
  };
  const moves = show !== null && !reduceMotion;
  const dark = show === "storm" ? 1 : show === "rain" ? 0.55 : 0;
  // The "sunny" cloud squeezes away, leaving a rainbow, then puffs back.
  const away = show === "sunny" && !reduceMotion ? t.interpolate(smoothKeys([0, 0.18, 0.8, 1], [1, 0.05, 0.05, 1])) : 1;
  const drops = show === "storm" ? 14 : 9;
  return (
    <Pressable onPress={onTap} hitSlop={8} accessibilityRole="button" accessibilityLabel="cloud" style={{ width: size, height }}>
      {moves && (show === "rain" || show === "storm")
        ? Array.from({ length: drops }, (_, index) => {
            const from = (index / drops) * 0.75;
            return (
              <Floater key={index} t={t} from={from} to={from + (show === "storm" ? 0.16 : 0.22)} x={size * (0.15 + ((index * 37) % 70) / 100)} y={height * 0.7} rise={-size * 0.6} drift={show === "storm" ? -size * 0.08 : 0} pop={false}>
                <Drop size={show === "storm" ? 6 : 5} color={show === "storm" ? "#5E9FD8" : "#7CC2F2"} />
              </Floater>
            );
          })
        : null}
      {moves && show === "storm"
        ? [0.12, 0.5].map((from) => (
            <Animated.View
              key={from}
              pointerEvents="none"
              style={[styles.abs, { left: size * 0.38, top: height * 0.6, opacity: t.interpolate({ inputRange: [0, from, from + 0.02, from + 0.08, from + 0.1, 1], outputRange: [0, 0, 1, 1, 0, 0] }) }]}
            >
              <Svg width={size * 0.26} height={size * 0.4} viewBox="0 0 20 30">
                <Path d="M12 0L2 16H9L6 30L18 11H11L14 0Z" fill="#FFD43B" stroke="#F2A900" strokeWidth={1} strokeLinejoin="round" />
              </Svg>
            </Animated.View>
          ))
        : null}
      {moves && show === "sunny" ? (
        <Animated.View
          pointerEvents="none"
          style={[
            styles.abs,
            {
              left: size * 0.05,
              top: -height * 0.15,
              opacity: t.interpolate({ inputRange: [0, 0.15, 0.3, 0.75, 0.9, 1], outputRange: [0, 0, 1, 1, 0, 0] }),
              transform: [{ scale: t.interpolate(smoothKeys([0, 0.15, 0.35, 1], [0.4, 0.4, 1, 1])) }]
            }
          ]}
        >
          <Svg width={size * 0.9} height={size * 0.5} viewBox="0 0 90 50">
            {["#FF5A5A", "#FF9F1C", "#FFD43B", "#21B573", "#4C9BFF", "#8E5CF7"].map((color, index) => (
              <Path key={color} d={`M${8 + index * 4} 48A${37 - index * 4} ${37 - index * 4} 0 0 1 ${82 - index * 4} 48`} stroke={color} strokeWidth={4} fill="none" />
            ))}
          </Svg>
        </Animated.View>
      ) : null}
      {moves && show === "sunny"
        ? [0, 1, 2].map((index) => (
            <Floater key={index} t={t} from={0.12 + index * 0.06} to={0.45 + index * 0.06} x={size * (0.2 + index * 0.25)} y={height * 0.3} rise={height * 0.4}>
              <Sparkle size={10} color="#FFFFFF" />
            </Floater>
          ))
        : null}
      <Animated.View style={{ transform: [{ scale: away }, ...(moves && show === "storm" ? [{ translateX: shake(t, 0.1, 0.6, 2, 6, "") }] : [])] }}>
        <CloudShape color={sky.cloud} lip={sky.cloudLip} width={size} />
        {dark > 0 ? (
          <View style={StyleSheet.absoluteFill} pointerEvents="none">
            <View style={{ opacity: dark }}>
              <CloudShape color={STORM.cloud} lip={STORM.cloudLip} width={size} />
            </View>
          </View>
        ) : null}
      </Animated.View>
    </Pressable>
  );
}

/** A cloud drifting across the width, starting at `start` (0..1 of the trip), wrapping round. */
function Cloud({ sky, top, width, size, duration, start, moving, reduceMotion }: { sky: Sky; top: number; width: number; size: number; duration: number; start: number; moving: boolean; reduceMotion: boolean }) {
  const t = useLoopValue(moving, duration);
  const span = width + size;
  // Shifted by `start` so clouds sharing a loop length are spread out; the wrap happens off screen.
  const translateX = t.interpolate({
    inputRange: [0, 1 - start, 1 - start + 0.0001, 1],
    outputRange: [start * span - size, span - size, -size, start * span - size]
  });
  // A slow float up and down and a soft puff in and out, so even a cloud that's far from the edge looks alive.
  const bob = useLoopValue(moving, 4200 + Math.round(start * 1800));
  const translateY = bob.interpolate(smoothKeys([0, 0.5, 1], [0, -5, 0]));
  const puff = bob.interpolate(smoothKeys([0, 0.25, 0.75, 1], [1, 1.04, 0.97, 1]));
  // Dimmer at night, so they don't glare against the dark sky.
  const { dark } = useScene();
  return (
    <Animated.View style={[styles.abs, { top, opacity: dark.interpolate({ inputRange: [0, 1], outputRange: [1, 0.5] }), transform: [{ translateX: moving ? translateX : start * span - size }, { translateY: moving ? translateY : 0 }, { scaleX: moving ? puff : 1 }] }]}>
      <TapCloud sky={sky} size={size} reduceMotion={reduceMotion} />
    </Animated.View>
  );
}

type SunShow = "shine" | "cool" | "wink";
/**
 * Tapping the sun: first it sets and the moon comes up (night over the whole path; tap the moon to see
 * it full, gibbous and half lit, then once more for day). The next taps: it beams and glows, puts on sunglasses, winks, then night again.
 */
export const SUN_SHOWS: { kind: SunShow | "night"; sound: GameSoundEvent; ms: number }[] = [
  { kind: "night", sound: "night", ms: 0 },
  { kind: "shine", sound: "grow", ms: 1800 },
  { kind: "cool", sound: "boing", ms: 2000 },
  { kind: "wink", sound: "giggle", ms: 1700 }
];

function SunFace({ show }: { show: SunShow }) {
  return (
    <Svg width={70} height={70} viewBox="0 0 70 70" style={StyleSheet.absoluteFill}>
      {show === "cool" ? (
        <G>
          <Path d="M24 31H46" stroke="#1F2D27" strokeWidth={2} />
          <Rect x={24} y={29} width={9.5} height={6.5} rx={3} fill="#1F2D27" />
          <Rect x={36.5} y={29} width={9.5} height={6.5} rx={3} fill="#1F2D27" />
          <Path d="M26 31L28 30" stroke="#FFFFFF" strokeWidth={1.2} strokeLinecap="round" />
        </G>
      ) : show === "wink" ? (
        <G stroke="#8A4B1E" strokeWidth={2} strokeLinecap="round" fill="none">
          <Path d="M27 32Q29.5 29 32 32" />
          <Path d="M38 32H43" />
        </G>
      ) : (
        <G fill="#8A4B1E">
          <Circle cx={30} cy={32} r={1.8} />
          <Circle cx={40} cy={32} r={1.8} />
        </G>
      )}
      <Path d="M29.5 38Q35 43 40.5 38" stroke="#8A4B1E" strokeWidth={2} strokeLinecap="round" fill="none" />
      <Circle cx={26.5} cy={37} r={2} fill="#FF8FA3" opacity={0.7} />
      <Circle cx={43.5} cy={37} r={2} fill="#FF8FA3" opacity={0.7} />
    </Svg>
  );
}

/**
 * The moon's looks, in the order a tap on the moon goes through them: full, then fuller on one side
 * (gibbous), then half lit. One more tap brings the day back. Never a thin crescent, and no stars
 * (content rule).
 */
export const MOON_PHASES = ["full", "gibbous", "half"] as const;
export type MoonPhase = (typeof MOON_PHASES)[number];

/** The moon, with a sleepy smile on its lit side. */
function MoonArt({ size, phase = "full" }: { size: number; phase?: MoonPhase }) {
  // The lit part: the right half, plus (gibbous) a bulge over the left half. The rest is the dim night side.
  const lit = phase === "full" ? null : phase === "half" ? "M35 17A18 18 0 0 1 35 53Z" : "M35 17A18 18 0 0 1 35 53A9 18 0 0 1 35 17Z";
  const faceShift = phase === "half" ? 6 : phase === "gibbous" ? 3 : 0;
  return (
    <Svg width={size} height={size} viewBox="0 0 70 70">
      <Circle cx={35} cy={35} r={24} fill="#FFF6CC" opacity={0.25} />
      {lit ? (
        <G>
          <Circle cx={35} cy={35} r={18} fill="#3D4C7E" />
          <Path d={lit} fill="#FFF1B8" />
          <Circle cx={44} cy={42} r={3.4} fill="#F0E2A0" />
          <Circle cx={42} cy={25} r={2} fill="#F0E2A0" />
        </G>
      ) : (
        <G>
          <Circle cx={35} cy={35} r={18} fill="#FFF1B8" />
          <Circle cx={28} cy={27} r={3.2} fill="#F0E2A0" />
          <Circle cx={44} cy={42} r={4} fill="#F0E2A0" />
          <Circle cx={41} cy={25} r={2} fill="#F0E2A0" />
        </G>
      )}
      <G stroke="#8A7A3E" strokeWidth={1.8} strokeLinecap="round" fill="none" transform={`translate(${faceShift} 0)`}>
        {phase === "half" ? (
          <>
            <Path d="M36 33Q38.5 35.5 41 33" />
            <Path d="M37.5 40Q40 42 42.5 40" />
          </>
        ) : (
          <>
            <Path d="M27 34Q30 36.5 33 34" />
            <Path d="M37 34Q40 36.5 43 34" />
            <Path d="M31.5 40Q35 42.5 38.5 40" />
          </>
        )}
      </G>
    </Svg>
  );
}

function Sun({ top, left, low, moving, reduceMotion }: { top: number; left: number; low?: boolean; moving: boolean; reduceMotion: boolean }) {
  const { night, setNight, dark } = useScene();
  const spin = useLoopValue(moving, 24000);
  const rotate = spin.interpolate({ inputRange: [0, 1], outputRange: ["0deg", "360deg"] });
  const size = 70;
  const rays = Array.from({ length: 12 }, (_, index) => index * 30);
  const [show, setShow] = useState<SunShow | null>(null);
  const { value: t, play } = useOneShot();
  const next = useCycle(SUN_SHOWS.length);
  const [phase, setPhase] = useState(0);
  const { value: moonT, play: playMoon } = useOneShot();
  // However night ended (a tap, or a touch waking everyone), the next one starts with a full moon.
  useEffect(() => {
    if (!night) setPhase(0);
  }, [night]);
  const onTap = () => {
    if (night) {
      // The moon: each tap shows its next look (full, gibbous, half), then the day comes back.
      if (phase + 1 < MOON_PHASES.length) {
        feedback("sparkle", "light");
        setPhase(phase + 1);
        playMoon(reduceMotion ? 300 : 700);
        return;
      }
      feedback("sparkle", "light");
      setPhase(0);
      setNight(false);
      return;
    }
    if (show) return;
    const pick = SUN_SHOWS[next()];
    feedback(pick.sound, "light");
    if (pick.kind === "night") {
      setNight(true);
      return;
    }
    setShow(pick.kind);
    play(reduceMotion ? 900 : pick.ms, () => setShow(null));
  };
  const sunUp = dark.interpolate({ inputRange: [0, 1], outputRange: [1, 0] });
  const sunSet = dark.interpolate({ inputRange: [0, 1], outputRange: [0, size * 0.5] });
  const moves = show !== null && !reduceMotion;
  const grow = moves ? t.interpolate(smoothKeys([0, 0.15, 0.3, 0.45, 0.85, 1], show === "shine" ? [1, 1.28, 1.12, 1.25, 1.2, 1] : [1, 1.12, 1, 1.06, 1.06, 1])) : 1;
  const glow = moves && show === "shine" ? t.interpolate({ inputRange: [0, 0.15, 0.8, 1], outputRange: [0, 0.7, 0.5, 0] }) : 0;
  return (
    <Pressable onPress={onTap} hitSlop={6} accessibilityRole="button" accessibilityLabel={night ? "moon" : "sun"} style={[styles.abs, { top, left, width: size, height: size }]}>
      <Animated.View pointerEvents="none" style={[StyleSheet.absoluteFill, { opacity: dark, transform: [{ translateY: dark.interpolate({ inputRange: [0, 1], outputRange: [size * 0.5, 0] }) }] }]}>
        <Animated.View style={{ transform: [{ scale: moonT.interpolate(smoothKeys([0, 0.3, 0.6, 1], [1, 0.85, 1.08, 1])) }, { rotate: moonT.interpolate(smoothKeys([0, 0.5, 1], ["0deg", "-12deg", "0deg"])) }] }}>
          <MoonArt size={size} phase={MOON_PHASES[phase]} />
        </Animated.View>
      </Animated.View>
      <Animated.View pointerEvents="none" style={[StyleSheet.absoluteFill, { opacity: sunUp, transform: [{ translateY: sunSet }] }]}>
      {show === "shine" ? <Animated.View pointerEvents="none" style={[styles.glow, { opacity: glow, transform: [{ scale: grow }] }]} /> : null}
      {moves && show === "wink"
        ? [0, 1, 2].map((index) => (
            <Floater key={index} t={t} from={0.2 + index * 0.12} to={0.6 + index * 0.12} x={10 + index * 22} y={6 + (index % 2) * 40} rise={14}>
              <Sparkle size={11} />
            </Floater>
          ))
        : null}
      <Animated.View style={[StyleSheet.absoluteFill, { transform: [{ scale: grow }] }]}>
      <Animated.View style={[StyleSheet.absoluteFill, { transform: moving ? [{ rotate }] : [] }]}>
        <Svg width={size} height={size} viewBox="0 0 70 70">
          {rays.map((angle) => (
            <Path key={angle} d="M35 3L38 13H32Z" fill={low ? "#FFB37A" : "#FFE27A"} transform={`rotate(${angle} 35 35)`} />
          ))}
        </Svg>
      </Animated.View>
      <Svg width={size} height={size} viewBox="0 0 70 70" style={StyleSheet.absoluteFill}>
        <Circle cx={35} cy={35} r={18} fill={low ? "#FF9F5A" : "#FFC21A"} />
        <Circle cx={35} cy={35} r={13} fill={low ? "#FFC08A" : "#FFE27A"} />
      </Svg>
      {show ? <SunFace show={show} /> : null}
      </Animated.View>
      </Animated.View>
    </Pressable>
  );
}

function Gust({ top, width, delay, moving }: { top: number; width: number; delay: number; moving: boolean }) {
  const t = useLoopValue(moving, 2600, delay);
  const translateX = t.interpolate({ inputRange: [0, 1], outputRange: [-60, width + 20] });
  const opacity = t.interpolate({ inputRange: [0, 0.2, 0.8, 1], outputRange: [0, 0.9, 0.9, 0] });
  if (!moving) return null;
  return (
    <Animated.View style={[styles.abs, { top, opacity, transform: [{ translateX }] }]}>
      <Svg width={60} height={16} viewBox="0 0 60 16">
        <Path d="M2 6H40C46 6 48 1 44 1M10 13H52C57 13 58 8 55 7" stroke="#B9DCCD" strokeWidth={2.4} strokeLinecap="round" fill="none" />
      </Svg>
    </Animated.View>
  );
}

function Rain({ top, left, moving }: { top: number; left: number; moving: boolean }) {
  // Drops fall under the rain cloud: one loop, each drop at its own point of the fall.
  const t = useLoopValue(moving, 900);
  const drops = [
    { x: 10, phase: 0.9 },
    { x: 26, phase: 0.45 },
    { x: 42, phase: 0.2 },
    { x: 58, phase: 0.7 },
    { x: 72, phase: 0.35 }
  ];
  return (
    <View style={[styles.abs, { top, left, width: 84, height: 60 }]}>
      {drops.map((drop) => {
        const fall = 46;
        const cut = 1 - drop.phase;
        const translateY = t.interpolate({
          inputRange: [0, cut, cut + 0.0001, 1],
          outputRange: [drop.phase * fall, fall, 0, drop.phase * fall]
        });
        return (
          <Animated.View key={drop.x} style={[styles.abs, { left: drop.x, transform: [{ translateY: moving ? translateY : drop.phase * fall }] }]}>
            <Svg width={6} height={12} viewBox="0 0 6 12">
              <Path d="M3 0C4.5 4 6 6 6 8.5A3 3 0 0 1 0 8.5C0 6 1.5 4 3 0Z" fill="#7CC2F2" />
            </Svg>
          </Animated.View>
        );
      })}
    </View>
  );
}

type BirdShow = "scatter" | "loop" | "sing" | "love" | "swoop" | "feathers" | "speed";
/** Tapping the birds: each tap plays the next one. A tap mid-show skips to the next. */
export const BIRD_SHOWS: { kind: BirdShow; sound: GameSoundEvent; ms: number }[] = [
  { kind: "scatter", sound: "chirp", ms: 1800 },
  { kind: "loop", sound: "zoom", ms: 1600 },
  { kind: "sing", sound: "chirp", ms: 2000 },
  { kind: "love", sound: "sparkle", ms: 1800 },
  { kind: "swoop", sound: "whoosh", ms: 1500 },
  { kind: "feathers", sound: "boing", ms: 1900 },
  { kind: "speed", sound: "zoom", ms: 1400 }
];

const FLOCK = [
  { x: 0, y: 8, s: 1, away: { x: -26, y: -18 } },
  { x: 22, y: 0, s: 0.8, away: { x: 8, y: -30 } },
  { x: 30, y: 16, s: 0.7, away: { x: 30, y: 10 } }
];

function Feather() {
  return (
    <Svg width={12} height={7} viewBox="0 0 12 7">
      <Path d="M1 6C3 1 8 0 11 1C9 4 5 6 1 6Z" fill="#E8EEF3" stroke="#93A2AE" strokeWidth={0.8} />
    </Svg>
  );
}

/** Three little birds flapping across the sky together. Tap them for a show (BIRD_SHOWS). At night they've gone home. */
function Birds({ top, width, moving, reduceMotion }: { top: number; width: number; moving: boolean; reduceMotion: boolean }) {
  const t = useLoopValue(moving, 15000, 2500);
  const flap = useLoopValue(moving, 520);
  const { night, dark } = useScene();
  const [show, setShow] = useState<BirdShow | null>(null);
  const { value: s, play } = useOneShot();
  const next = useCycle(BIRD_SHOWS.length);
  const translateX = t.interpolate({ inputRange: [0, 1], outputRange: [-70, width + 10] });
  const wings = flap.interpolate(smoothKeys([0, 0.5, 1], [1, 0.35, 1]));
  const onTap = () => {
    const pick = BIRD_SHOWS[next()];
    feedback(pick.sound, "light");
    setShow(pick.kind);
    play(reduceMotion ? 500 : pick.ms, () => setShow(null));
  };
  const moves = show !== null && !reduceMotion;
  const k = (keys: number[], values: number[]) => s.interpolate(smoothKeys(keys, values));
  let flock: object[] = [];
  let flockOpacity: Animated.AnimatedInterpolation<number> | number = 1;
  if (moves) {
    switch (show) {
      case "loop":
        flock = [
          { translateX: s.interpolate(sampleCurve(0, 1, 32, (p) => 26 * Math.sin(2 * Math.PI * p))) },
          { translateY: s.interpolate(sampleCurve(0, 1, 32, (p) => -26 * (1 - Math.cos(2 * Math.PI * p)))) }
        ];
        break;
      case "swoop":
        flock = [{ translateY: k([0, 0.4, 0.75, 1], [0, 46, -10, 0]) }, { translateX: k([0, 0.5, 1], [0, 30, 0]) }];
        break;
      case "speed":
        flock = [{ translateX: k([0, 0.4, 0.41, 1], [0, 170, -120, 0]) }];
        flockOpacity = s.interpolate({ inputRange: [0, 0.3, 0.4, 0.5, 0.75, 1], outputRange: [1, 1, 0, 0, 1, 1] });
        break;
      case "feathers":
        flock = [{ translateY: shake(s, 0, 0.4, 3, 4, "") }];
        break;
      case "sing":
      case "love":
        flock = [{ translateY: k([0, 0.15, 0.3, 0.45, 0.6, 0.75, 1], [0, -4, 0, -4, 0, -4, 0]) }];
        break;
      default:
        break;
    }
  }
  return (
    <Animated.View
      style={[styles.abs, { top, width: 60, height: 30, opacity: dark.interpolate({ inputRange: [0, 1], outputRange: [1, 0] }), transform: [{ translateX: moving ? translateX : width * 0.18 }] }]}
      pointerEvents={night ? "none" : "box-none"}
    >
      <Pressable onPress={onTap} hitSlop={14} accessibilityRole="button" accessibilityLabel="birds" style={{ width: 60, height: 30 }} testID="sky-birds">
        <Animated.View style={[StyleSheet.absoluteFill, { opacity: flockOpacity, transform: flock as never[] }]}>
          {FLOCK.map((bird) => {
            const away =
              moves && show === "scatter"
                ? [
                    { translateX: k([0, 0.3, 0.7, 1], [0, bird.away.x, bird.away.x, 0]) },
                    { translateY: k([0, 0.3, 0.7, 1], [0, bird.away.y, bird.away.y, 0]) }
                  ]
                : [];
            return (
              <Animated.View key={bird.x} style={[styles.abs, { left: bird.x, top: bird.y, transform: [...away, { scale: bird.s }, { scaleY: moving || moves ? wings : 1 }] }]}>
                <Svg width={22} height={12} viewBox="0 0 22 12">
                  <Path d="M1 4C5 1 9 2 11 7C13 2 17 1 21 4" stroke="#5D6B74" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </Svg>
              </Animated.View>
            );
          })}
        </Animated.View>
        {moves && show === "speed"
          ? [0, 1, 2].map((line) => (
              <Animated.View key={line} pointerEvents="none" style={[styles.abs, styles.speed, { left: -20 - line * 6, top: 6 + line * 8, width: 26, opacity: s.interpolate({ inputRange: [0, 0.05, 0.35, 0.45, 1], outputRange: [0, 1, 1, 0, 0] }) }]} />
            ))
          : null}
        {moves && show === "sing"
          ? [0.05, 0.3, 0.55].map((from, index) => (
              <Floater key={from} t={s} from={from} to={from + 0.4} x={10 + index * 16} y={-4} rise={20} drift={(index - 1) * 8}>
                <Word size={13} color="#8E5CF7">♪</Word>
              </Floater>
            ))
          : null}
        {moves && show === "love"
          ? [0, 0.2, 0.4].map((from, index) => (
              <Floater key={from} t={s} from={from} to={from + 0.5} x={8 + index * 16} y={-2} rise={22} drift={(index - 1) * 6}>
                <Heart size={11} />
              </Floater>
            ))
          : null}
        {moves && show === "feathers"
          ? [0.1, 0.25, 0.4].map((from, index) => (
              <Floater key={from} t={s} from={from} to={from + 0.55} x={6 + index * 18} y={14} rise={-40} drift={(index % 2 ? 1 : -1) * 12} pop={false}>
                <Feather />
              </Floater>
            ))
          : null}
      </Pressable>
    </Animated.View>
  );
}

export type PathWeatherProps = {
  weather: Weather;
  /** The place this unit walks through: its strip runs along the bottom (see pathWorlds.tsx). */
  world?: PathWorld;
  width: number;
  height: number;
  /** Clouds drift, the sun turns, rain falls. Units far from the current one pass false. */
  animated?: boolean;
};

export const PathWeather = memo(function PathWeather({ weather, world = "desert", width, height, animated = false }: PathWeatherProps) {
  const reduceMotion = useReduceMotion();
  const moving = animated && !reduceMotion;
  // Clouds and the place's strip always move (cheap loops on the native driver); the rest only near the learner.
  const drifting = !reduceMotion;
  const sky = SKIES[weather];
  const bands = Math.max(1, Math.ceil(height / BAND));
  const gradientId = `sky-${weather}`;
  // At night the day sky fades away and the dark sky behind the path shows through.
  const { dark } = useScene();
  const daySky = dark.interpolate({ inputRange: [0, 1], outputRange: [1, 0] });

  return (
    <View style={[StyleSheet.absoluteFill, styles.clip]} pointerEvents="box-none" testID={`weather-${weather}`}>
      <Animated.View style={[StyleSheet.absoluteFill, { opacity: daySky }]} pointerEvents="none">
      <Svg width={width} height={height} style={StyleSheet.absoluteFill} pointerEvents="none">
        <Defs>
          {/* Fades in under the banner and out at the end, so one unit's sky melts into the next. */}
          <LinearGradient id={gradientId} x1="0" y1="0" x2="0" y2={height} gradientUnits="userSpaceOnUse">
            <Stop offset="0" stopColor={sky.top} stopOpacity={0} />
            <Stop offset={Math.min(0.3, SKY_IN / height)} stopColor={sky.top} />
            <Stop offset="0.6" stopColor={sky.top} stopOpacity={0.6} />
            <Stop offset="1" stopColor={sky.bottom} stopOpacity={0} />
          </LinearGradient>
        </Defs>
        <Rect x={0} y={0} width={width} height={height} fill={`url(#${gradientId})`} />
        {weather === "sunset" ? (
          <G opacity={0.5}>
            <Ellipse cx={width * 0.2} cy={height} rx={width * 0.5} ry={60} fill="#FFD9B8" />
            <Ellipse cx={width * 0.85} cy={height + 10} rx={width * 0.45} ry={50} fill="#FFE3C8" />
          </G>
        ) : null}
      </Svg>
      </Animated.View>
      {Array.from({ length: bands }, (_, band) => {
        const y = band * BAND;
        const first = band === 0;
        return (
          <React.Fragment key={band}>
            {weather === "sunny" && first ? <Sun top={y + 152} left={width - 80} moving={moving} reduceMotion={reduceMotion} /> : null}
            {weather === "sunset" && first ? <Sun top={y + 152} left={width - 80} low moving={moving} reduceMotion={reduceMotion} /> : null}
            <Cloud sky={sky} top={y + 150} width={width} size={weather === "rain" ? 92 : 76} duration={weather === "breeze" ? 14000 : 22000} start={0.15 + 0.3 * (band % 3)} moving={drifting} reduceMotion={reduceMotion} />
            {weather === "cloudy" || weather === "breeze" ? (
              <Cloud sky={sky} top={y + 300} width={width} size={58} duration={weather === "breeze" ? 11000 : 28000} start={0.65} moving={drifting} reduceMotion={reduceMotion} />
            ) : null}
            {weather === "sunny" || weather === "sunset" ? (
              // A small cloud far behind, drifting more slowly.
              <Cloud sky={sky} top={y + 330} width={width} size={46} duration={34000} start={0.45 + 0.2 * (band % 2)} moving={drifting} reduceMotion={reduceMotion} />
            ) : null}
            {weather === "breeze" ? (
              <>
                <Gust top={y + 210} width={width} delay={0} moving={moving} />
                <Gust top={y + 360} width={width} delay={1300} moving={moving} />
              </>
            ) : null}
            {(weather === "sunny" || weather === "breeze" || weather === "sunset") && band % 2 === 0 ? (
              <Birds top={y + (first ? 250 : 200)} width={width} moving={moving} reduceMotion={reduceMotion} />
            ) : null}
            {weather === "rain" ? <RainUnderCloud top={y + 150} width={width} band={band} moving={moving} drifting={drifting} reduceMotion={reduceMotion} /> : null}
            {first ? <SkyMeteor width={width} moving={moving} /> : null}
          </React.Fragment>
        );
      })}
      {/* The unit itself ends SKY_TAIL above the sky's bottom (the sky runs on to melt into the next one). */}
      <WorldBackdrop world={world} width={width} top={height - SKY_TAIL - BACKDROP_H + 14} moving={drifting} />
    </View>
  );
});

/** Rain under a cloud at the screen's side, so the drops have a source. The cloud wanders slowly to and fro, the rain with it. */
function RainUnderCloud({ top, width, band, moving, drifting, reduceMotion }: { top: number; width: number; band: number; moving: boolean; drifting: boolean; reduceMotion: boolean }) {
  const left = band % 2 === 0 ? 8 : width - 100;
  const sky = SKIES.rain;
  const wander = useLoopValue(drifting, 12000 + band * 900);
  const reach = Math.min(70, width * 0.18) * (band % 2 === 0 ? 1 : -1);
  const translateX = wander.interpolate(smoothKeys([0, 0.5, 1], [0, reach, 0]));
  const translateY = wander.interpolate(smoothKeys([0, 0.25, 0.5, 0.75, 1], [0, -4, 0, -4, 0]));
  return (
    <Animated.View pointerEvents="box-none" style={[StyleSheet.absoluteFill, { transform: [{ translateX: drifting ? translateX : 0 }] }]}>
      <Animated.View style={[styles.abs, { top: top + 110, left, transform: [{ translateY: drifting ? translateY : 0 }] }]}>
        <TapCloud sky={sky} size={92} reduceMotion={reduceMotion} />
      </Animated.View>
      <Rain top={top + 150} left={left + 4} moving={moving} />
    </Animated.View>
  );
}

/** Where the sky's meteor lands, in turn: as parts of the width, and px down the unit. */
const METEOR_SPOTS = [
  { x: 0.18, y: 420 },
  { x: 0.82, y: 330 },
  { x: 0.24, y: 560 }
];
/** The first meteor comes soon after the learner arrives; the next ones once in a while. */
const METEOR_FIRST_MS = 9000;
const METEOR_EVERY_MS = 45000;
const METEOR_MS = 2400;
const METEOR_BOX = 110;

/**
 * Once in a while a little meteor falls out of the sky beside the path: a fiery tail, a BONK, a flash and
 * a puff of dust, and the whole path gives a shake. Then it all settles back to normal. Not while
 * everyone sleeps.
 */
function SkyMeteor({ width, moving }: { width: number; moving: boolean }) {
  const { asleep, rumble } = useScene();
  const { value: t, play } = useOneShot();
  const [spot, setSpot] = useState<number | null>(null);
  useEffect(() => {
    if (!moving || asleep) return undefined;
    let turn = 0;
    let bump: ReturnType<typeof setTimeout> | undefined;
    let timer: ReturnType<typeof setTimeout>;
    const fall = (wait: number) => {
      timer = setTimeout(() => {
        const index = turn % METEOR_SPOTS.length;
        turn += 1;
        setSpot(index);
        playUi("meteor");
        play(METEOR_MS, () => setSpot(null));
        bump = setTimeout(rumble, METEOR_MS * METEOR_HIT);
        fall(METEOR_EVERY_MS);
      }, wait);
    };
    fall(METEOR_FIRST_MS);
    return () => {
      clearTimeout(timer);
      if (bump) clearTimeout(bump);
    };
  }, [moving, asleep, play, rumble]);
  if (spot === null) return null;
  const at = METEOR_SPOTS[spot];
  const look = bigLook("meteor", t, METEOR_BOX);
  return (
    <View pointerEvents="none" style={[styles.abs, { left: at.x * width - METEOR_BOX / 2, top: at.y - METEOR_BOX * 0.72, width: METEOR_BOX, height: METEOR_BOX }]} testID="sky-meteor">
      {look?.behind}
      {look?.front}
    </View>
  );
}

const styles = StyleSheet.create({
  abs: {
    position: "absolute",
    left: 0
  },
  clip: {
    overflow: "hidden"
  },
  speed: {
    height: 2,
    borderRadius: 2,
    backgroundColor: "rgba(93,107,116,0.5)"
  },
  glow: {
    position: "absolute",
    left: 5,
    top: 5,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#FFE27A"
  }
});
