import React, { memo, useEffect, useRef, useState } from "react";
import { Animated, Easing, Pressable, StyleSheet, View } from "react-native";
import Svg, { Circle, Defs, Ellipse, G, LinearGradient, Path, Rect, Stop } from "react-native-svg";
import { useReduceMotion } from "./Camel";
import type { GameSoundEvent } from "../services/gameSoundLibrary";
import { smoothKeys } from "./motion";
import { Drop, Floater, Sparkle, shake, useCycle, useOneShot } from "./reactions";
import { feedback } from "./sound";

/**
 * The sky behind a unit of the path. Each unit has its own weather, so walking down the path feels
 * like days going by: a sunny sky, a breezy one, clouds, a little rain, a sunset, birds flying by. Only plain weather:
 * no moon or stars (see the content rule in docs/design-system.md).
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
  return (
    <Animated.View style={[styles.abs, { top, transform: [{ translateX: moving ? translateX : start * span - size }] }]}>
      <TapCloud sky={sky} size={size} reduceMotion={reduceMotion} />
    </Animated.View>
  );
}

type SunShow = "shine" | "cool" | "wink";
/** Tapping the sun: it beams and glows, then puts on sunglasses, then winks. */
const SUN_SHOWS: { kind: SunShow; sound: GameSoundEvent; ms: number }[] = [
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

function Sun({ top, left, low, moving, reduceMotion }: { top: number; left: number; low?: boolean; moving: boolean; reduceMotion: boolean }) {
  const spin = useLoopValue(moving, 24000);
  const rotate = spin.interpolate({ inputRange: [0, 1], outputRange: ["0deg", "360deg"] });
  const size = 70;
  const rays = Array.from({ length: 12 }, (_, index) => index * 30);
  const [show, setShow] = useState<SunShow | null>(null);
  const { value: t, play } = useOneShot();
  const next = useCycle(SUN_SHOWS.length);
  const onTap = () => {
    if (show) return;
    const pick = SUN_SHOWS[next()];
    feedback(pick.sound, "light");
    setShow(pick.kind);
    play(reduceMotion ? 900 : pick.ms, () => setShow(null));
  };
  const moves = show !== null && !reduceMotion;
  const grow = moves ? t.interpolate(smoothKeys([0, 0.15, 0.3, 0.45, 0.85, 1], show === "shine" ? [1, 1.28, 1.12, 1.25, 1.2, 1] : [1, 1.12, 1, 1.06, 1.06, 1])) : 1;
  const glow = moves && show === "shine" ? t.interpolate({ inputRange: [0, 0.15, 0.8, 1], outputRange: [0, 0.7, 0.5, 0] }) : 0;
  return (
    <Pressable onPress={onTap} hitSlop={6} accessibilityRole="button" accessibilityLabel="sun" style={[styles.abs, { top, left, width: size, height: size }]}>
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

/** Three little birds flapping across the sky together. */
function Birds({ top, width, moving }: { top: number; width: number; moving: boolean }) {
  const t = useLoopValue(moving, 15000, 2500);
  const flap = useLoopValue(moving, 520);
  const translateX = t.interpolate({ inputRange: [0, 1], outputRange: [-70, width + 10] });
  const wings = flap.interpolate(smoothKeys([0, 0.5, 1], [1, 0.35, 1]));
  const flock = [
    { x: 0, y: 8, s: 1 },
    { x: 22, y: 0, s: 0.8 },
    { x: 30, y: 16, s: 0.7 }
  ];
  return (
    <Animated.View style={[styles.abs, { top, width: 60, height: 30, transform: [{ translateX: moving ? translateX : width * 0.18 }] }]}>
      {flock.map((bird) => (
        <Animated.View key={bird.x} style={[styles.abs, { left: bird.x, top: bird.y, transform: [{ scale: bird.s }, { scaleY: moving ? wings : 1 }] }]}>
          <Svg width={22} height={12} viewBox="0 0 22 12">
            <Path d="M1 4C5 1 9 2 11 7C13 2 17 1 21 4" stroke="#5D6B74" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </Svg>
        </Animated.View>
      ))}
    </Animated.View>
  );
}

export type PathWeatherProps = {
  weather: Weather;
  width: number;
  height: number;
  /** Clouds drift, the sun turns, rain falls. Units far from the current one pass false. */
  animated?: boolean;
};

export const PathWeather = memo(function PathWeather({ weather, width, height, animated = false }: PathWeatherProps) {
  const reduceMotion = useReduceMotion();
  const moving = animated && !reduceMotion;
  const sky = SKIES[weather];
  const bands = Math.max(1, Math.ceil(height / BAND));
  const gradientId = `sky-${weather}`;

  return (
    <View style={[StyleSheet.absoluteFill, styles.clip]} pointerEvents="box-none" testID={`weather-${weather}`}>
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
      {Array.from({ length: bands }, (_, band) => {
        const y = band * BAND;
        const first = band === 0;
        return (
          <React.Fragment key={band}>
            {weather === "sunny" && first ? <Sun top={y + 152} left={width - 80} moving={moving} reduceMotion={reduceMotion} /> : null}
            {weather === "sunset" && first ? <Sun top={y + 152} left={width - 80} low moving={moving} reduceMotion={reduceMotion} /> : null}
            <Cloud sky={sky} top={y + 150} width={width} size={weather === "rain" ? 92 : 76} duration={weather === "breeze" ? 16000 : 30000} start={0.15 + 0.3 * (band % 3)} moving={moving} reduceMotion={reduceMotion} />
            {weather === "cloudy" || weather === "breeze" ? (
              <Cloud sky={sky} top={y + 300} width={width} size={58} duration={weather === "breeze" ? 12000 : 40000} start={0.65} moving={moving} reduceMotion={reduceMotion} />
            ) : null}
            {weather === "breeze" ? (
              <>
                <Gust top={y + 210} width={width} delay={0} moving={moving} />
                <Gust top={y + 360} width={width} delay={1300} moving={moving} />
              </>
            ) : null}
            {(weather === "sunny" || weather === "breeze" || weather === "sunset") && band % 2 === 0 ? (
              <Birds top={y + (first ? 250 : 200)} width={width} moving={moving} />
            ) : null}
            {weather === "rain" ? <RainUnderCloud top={y + 150} width={width} band={band} moving={moving} reduceMotion={reduceMotion} /> : null}
          </React.Fragment>
        );
      })}
    </View>
  );
});

/** Rain under a still cloud at the screen's side, so the drops have a source. */
function RainUnderCloud({ top, width, band, moving, reduceMotion }: { top: number; width: number; band: number; moving: boolean; reduceMotion: boolean }) {
  const left = band % 2 === 0 ? 8 : width - 100;
  const sky = SKIES.rain;
  return (
    <>
      <View style={[styles.abs, { top: top + 110, left }]}>
        <TapCloud sky={sky} size={92} reduceMotion={reduceMotion} />
      </View>
      <Rain top={top + 150} left={left + 4} moving={moving} />
    </>
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
