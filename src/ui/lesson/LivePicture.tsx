import React, { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Animated, Easing, StyleSheet, View, type LayoutChangeEvent } from "react-native";
import Svg, { Circle, Defs, Ellipse, LinearGradient, Path, RadialGradient, Stop } from "react-native-svg";
import { sampleCurve, smoothKeys, useReduceMotion } from "../motion";
import type { Life } from "./pictureLife";

/**
 * A lesson picture that lives: the camera drifts slowly over it (a gentle zoom and pan, like a nature film) and its
 * own little things move on it (see pictureLife.ts): birds, clouds, a glowing sun, blowing sand, rain, ripples,
 * steam, ants, a far-off caravan. All on the native driver, looping quietly so it never pulls the eye off the words.
 * Turned off when the phone asks for less motion.
 *
 * It fills its parent. `aspect` is the picture's width over its height: the life is laid over the picture where it
 * shows (cover: cut to fill the box, as the lesson pages show it), so a halo sits on the sun whatever the box's shape.
 * `cheer`: change it (a count) to make the picture give a happy little bounce and gleam, as when a question is right.
 */
export function LiveFrame({ aspect, life, children, still, cheer }: { aspect: number; life?: Life[]; children: ReactNode; still?: boolean; cheer?: number | string }) {
  const reduceMotion = useReduceMotion();
  const [box, setBox] = useState<{ width: number; height: number } | null>(null);
  // Nothing runs until the picture is on screen and knows its size.
  const moving = !still && !reduceMotion && box !== null;
  const drift = useLoopClock(32000, moving);
  const pop = useRef(new Animated.Value(1)).current;
  const gleam = useRef(new Animated.Value(0)).current;
  const lastCheer = useRef(cheer);

  useEffect(() => {
    if (cheer === lastCheer.current) return;
    lastCheer.current = cheer;
    if (reduceMotion || cheer === undefined) return;
    pop.setValue(1);
    gleam.setValue(0);
    const animation = Animated.parallel([
      Animated.sequence([
        Animated.timing(pop, { toValue: 1.06, duration: 160, easing: Easing.out(Easing.quad), useNativeDriver: true }),
        Animated.spring(pop, { toValue: 1, friction: 4, tension: 160, useNativeDriver: true })
      ]),
      Animated.timing(gleam, { toValue: 1, duration: 700, easing: Easing.inOut(Easing.quad), useNativeDriver: true })
    ]);
    animation.start();
    return () => animation.stop();
  }, [cheer, reduceMotion, pop, gleam]);

  const onLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    if (!box || Math.abs(box.width - width) > 0.5 || Math.abs(box.height - height) > 0.5) setBox({ width, height });
  };

  // Where the picture shows inside the box (cover): its own size and offset, so the life lines up with it.
  const frame = useMemo(() => (box ? coverRect(box.width, box.height, aspect) : null), [box, aspect]);
  const camera = useMemo(() => {
    if (!moving || !frame) return { scale: 1, translateX: 0, translateY: 0 };
    return {
      scale: drift.interpolate(sampleCurve(0, 1, 48, (x) => 1.04 - 0.04 * Math.cos(2 * Math.PI * x))),
      translateX: drift.interpolate(sampleCurve(0, 1, 48, (x) => frame.width * 0.016 * Math.sin(2 * Math.PI * x))),
      translateY: drift.interpolate(sampleCurve(0, 1, 48, (x) => frame.height * 0.01 * Math.sin(4 * Math.PI * x)))
    };
  }, [moving, frame, drift]);
  const { scale, translateX, translateY } = camera;

  return (
    <View style={StyleSheet.absoluteFill} onLayout={onLayout} pointerEvents="box-none" testID="live-frame">
      <Animated.View style={[StyleSheet.absoluteFill, { transform: [{ scale: pop }] }]} pointerEvents="box-none">
        <Animated.View style={[StyleSheet.absoluteFill, { transform: [{ translateX }, { translateY }, { scale }] }]} pointerEvents="box-none">
          {children}
          {frame && moving && life?.length ? (
            <View pointerEvents="none" style={[styles.frame, { left: frame.left, top: frame.top, width: frame.width, height: frame.height }]} testID="picture-life">
              {life.map((each, index) => (
                <LifeView key={`${each.kind}-${index}`} life={each} width={frame.width} height={frame.height} seed={index + 1} />
              ))}
            </View>
          ) : null}
        </Animated.View>
        {box && cheer !== undefined && !reduceMotion ? <Sweep t={gleam} width={box.width} height={box.height} strength={0.55} /> : null}
      </Animated.View>
    </View>
  );
}

/** The picture's own rect when it covers a width x height box (cut to fill, centred). */
export function coverRect(width: number, height: number, aspect: number) {
  if (width / Math.max(1, height) > aspect) {
    const h = width / aspect;
    return { left: 0, top: (height - h) / 2, width, height: h };
  }
  const w = height * aspect;
  return { left: (width - w) / 2, top: 0, width: w, height };
}

/** A 0..1 clock that loops for as long as `run`. Wrapped in a sequence, as a lone looping timing does not run on web. */
function useLoopClock(ms: number, run: boolean) {
  const value = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (!run) return;
    value.setValue(0);
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(value, { toValue: 1, duration: ms, easing: Easing.linear, useNativeDriver: true }),
        Animated.timing(value, { toValue: 0, duration: 0, useNativeDriver: true })
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [ms, run, value]);
  return value;
}

/** The clock moved on by `phase` (0..1) and wrapped, so several things share one clock without moving together. */
function phased(t: Animated.Value, phase: number): Animated.AnimatedInterpolation<number> | Animated.Value {
  const p = ((phase % 1) + 1) % 1;
  if (p < 0.001) return t;
  return t.interpolate({ inputRange: [0, 1 - p, 1 - p + 0.0001, 1], outputRange: [p, 1, 0, p], extrapolate: "clamp" });
}

/** A steady pseudo-random number 0..1 for (seed, index): the same picture always lays its life out the same way. */
function rand(seed: number, index: number) {
  const x = Math.sin(seed * 127.1 + index * 311.7) * 43758.5453;
  return x - Math.floor(x);
}

const FADE_ENDS = { inputRange: [0, 0.12, 0.85, 1], outputRange: [0, 1, 1, 0], extrapolate: "clamp" as const };

let gradientCount = 0;
function useGradientId(prefix: string) {
  const id = useRef<string | null>(null);
  if (!id.current) {
    gradientCount += 1;
    id.current = `${prefix}${gradientCount}`;
  }
  return id.current;
}

type LifeProps = { width: number; height: number; seed: number };

function LifeView({ life, ...size }: { life: Life } & LifeProps) {
  switch (life.kind) {
    case "birds":
      return <Birds {...size} life={life} />;
    case "cloud":
      return <Cloud {...size} life={life} />;
    case "glow":
      return <Glow {...size} life={life} />;
    case "dust":
      return <Specks {...size} top={life.top} bottom={life.bottom} />;
    case "motes":
      return <Motes {...size} life={life} />;
    case "waves":
      return <Waves {...size} life={life} />;
    case "rain":
      return <Rain {...size} />;
    case "bubbles":
      return <Bubbles {...size} life={life} />;
    case "shine":
      return <Shine {...size} />;
    case "butterflies":
      return <Butterflies {...size} life={life} />;
    case "steam":
      return <Steam {...size} life={life} />;
    case "ants":
      return <Ants {...size} life={life} />;
    case "drops":
      return <Drops {...size} life={life} />;
    case "embers":
      return <Embers {...size} />;
    case "caravan":
      return <Caravan {...size} life={life} />;
    default:
      return null;
  }
}

// ---------- the sky ----------

function Birds({ width, height, seed, life }: LifeProps & { life: Extract<Life, { kind: "birds" }> }) {
  const count = life.count ?? 3;
  const cross = useLoopClock(26000 + seed * 1700, true);
  const flap = useLoopClock(640, true);
  const wing = flap.interpolate(smoothKeys([0, 0.5, 1], [1, -0.55, 1]));
  const size = Math.max(14, width * 0.045);
  return (
    <>
      {Array.from({ length: count }, (_, index) => {
        const at = phased(cross, index / count + rand(seed, index) * 0.12);
        const row = life.top + (life.bottom - life.top) * rand(seed, index + 10);
        const bird = size * (0.75 + 0.4 * rand(seed, index + 20));
        const rightward = index % 3 !== 2;
        const translateX = at.interpolate({ inputRange: [0, 1], outputRange: rightward ? [-bird * 2, width + bird] : [width + bird, -bird * 2] });
        const translateY = at.interpolate(sampleCurve(0, 1, 24, (x) => height * 0.025 * Math.sin(x * Math.PI * 4 + index)));
        return (
          <Animated.View key={index} style={[styles.abs, { top: row * height, left: 0, transform: [{ translateX }, { translateY }] }]}>
            <Animated.View style={{ transform: [{ scaleY: wing }] }}>
              <Svg width={bird} height={bird * 0.5} viewBox="0 0 20 10">
                <Path d="M1 3 Q5 1 10 6 Q15 1 19 3" stroke={life.color ?? "#3a3a46"} strokeWidth={2} strokeLinecap="round" fill="none" />
              </Svg>
            </Animated.View>
          </Animated.View>
        );
      })}
    </>
  );
}

function Cloud({ width, height, seed, life }: LifeProps & { life: Extract<Life, { kind: "cloud" }> }) {
  const t = useLoopClock(60000 + seed * 3000, true);
  const at = phased(t, rand(seed, 3));
  const w = width * (life.size ?? 0.12) * 1.6;
  const h = w * 0.45;
  const translateX = at.interpolate({ inputRange: [0, 1], outputRange: [-w, width] });
  const color = life.dark ? "rgba(200,206,226,0.35)" : "rgba(255,255,255,0.88)";
  return (
    <Animated.View style={[styles.abs, { top: life.y * height - h / 2, left: 0, width: w, height: h, transform: [{ translateX }] }]}>
      <View style={[styles.puff, { left: 0, top: h * 0.35, width: w * 0.45, height: h * 0.65, backgroundColor: color }]} />
      <View style={[styles.puff, { left: w * 0.22, top: 0, width: w * 0.5, height: h * 0.95, backgroundColor: color }]} />
      <View style={[styles.puff, { left: w * 0.52, top: h * 0.25, width: w * 0.48, height: h * 0.75, backgroundColor: color }]} />
    </Animated.View>
  );
}

function Glow({ width, height, life }: LifeProps & { life: Extract<Life, { kind: "glow" }> }) {
  const id = useGradientId("glow");
  const t = useLoopClock(5200, true);
  const size = life.r * width * 3.2;
  const scale = t.interpolate(sampleCurve(0, 1, 32, (x) => 1 + 0.12 * Math.sin(2 * Math.PI * x)));
  const opacity = t.interpolate(sampleCurve(0, 1, 32, (x) => 0.7 + 0.3 * Math.sin(2 * Math.PI * x)));
  const color = life.moon ? "#f2f0ff" : "#fff1a8";
  return (
    <Animated.View style={[styles.abs, { left: life.x * width - size / 2, top: life.y * height - size / 2, width: size, height: size, opacity, transform: [{ scale }] }]}>
      <Svg width={size} height={size}>
        <Defs>
          <RadialGradient id={id} cx="50%" cy="50%" r="50%">
            <Stop offset="0" stopColor={color} stopOpacity={life.moon ? 0.55 : 0.75} />
            <Stop offset="0.35" stopColor={color} stopOpacity={life.moon ? 0.25 : 0.35} />
            <Stop offset="1" stopColor={color} stopOpacity={0} />
          </RadialGradient>
        </Defs>
        <Circle cx={size / 2} cy={size / 2} r={size / 2} fill={`url(#${id})`} />
      </Svg>
    </Animated.View>
  );
}

// ---------- the ground and the air ----------

function Specks({ width, height, seed, top, bottom }: LifeProps & { top: number; bottom: number }) {
  const t = useLoopClock(7000, true);
  return (
    <>
      {Array.from({ length: 10 }, (_, index) => {
        const at = phased(t, index / 10 + rand(seed, index) * 0.05);
        const y = (top + (bottom - top) * rand(seed, index + 30)) * height;
        const size = 1.5 + 1.8 * rand(seed, index + 40);
        const translateX = at.interpolate({ inputRange: [0, 1], outputRange: [-0.05 * width, 1.05 * width] });
        const translateY = at.interpolate(sampleCurve(0, 1, 16, (x) => -height * 0.04 * x + 2 * Math.sin(x * 12)));
        const opacity = at.interpolate(FADE_ENDS);
        return <Animated.View key={index} style={[styles.abs, styles.dot, { top: y, left: 0, width: size, height: size, backgroundColor: "rgba(255,244,214,0.85)", opacity, transform: [{ translateX }, { translateY }] }]} />;
      })}
    </>
  );
}

function Motes({ width, height, seed, life }: LifeProps & { life: Extract<Life, { kind: "motes" }> }) {
  const t = useLoopClock(9000, true);
  return (
    <>
      {Array.from({ length: 9 }, (_, index) => {
        const at = phased(t, index / 9);
        const x = (life.left + (life.right - life.left) * rand(seed, index + 50)) * width;
        const size = 2 + 2 * rand(seed, index + 60);
        const span = (life.bottom - life.top) * height;
        const translateY = at.interpolate({ inputRange: [0, 1], outputRange: [life.bottom * height, life.bottom * height - span] });
        const translateX = at.interpolate(sampleCurve(0, 1, 16, (p) => 6 * Math.sin(p * Math.PI * 2 + index)));
        const opacity = at.interpolate({ inputRange: [0, 0.2, 0.5, 0.8, 1], outputRange: [0, 0.9, 0.5, 0.9, 0], extrapolate: "clamp" });
        return <Animated.View key={index} style={[styles.abs, styles.dot, { left: x, top: 0, width: size, height: size, backgroundColor: "rgba(255,236,160,0.95)", opacity, transform: [{ translateX }, { translateY }] }]} />;
      })}
    </>
  );
}

function Waves({ width, height, seed, life }: LifeProps & { life: Extract<Life, { kind: "waves" }> }) {
  const t = useLoopClock(4200, true);
  const left = life.left ?? 0;
  const right = life.right ?? 1;
  const span = (right - left) * width;
  return (
    <>
      {Array.from({ length: 7 }, (_, index) => {
        const at = phased(t, rand(seed, index + 70));
        const w = Math.max(14, span * (0.14 + 0.12 * rand(seed, index + 80)));
        const x = left * width + (span - w) * rand(seed, index + 90);
        const y = (life.top + (life.bottom - life.top) * ((index + 0.5) / 7)) * height;
        const translateX = at.interpolate(sampleCurve(0, 1, 24, (p) => width * 0.025 * Math.sin(2 * Math.PI * p)));
        const opacity = at.interpolate(sampleCurve(0, 1, 24, (p) => 0.45 + 0.35 * Math.sin(2 * Math.PI * p + 1.2)));
        return <Animated.View key={index} style={[styles.abs, { left: x, top: y, width: w, height: 2.5, borderRadius: 2, backgroundColor: "rgba(255,255,255,0.8)", opacity, transform: [{ translateX }] }]} />;
      })}
    </>
  );
}

function Rain({ width, height, seed }: LifeProps) {
  const t = useLoopClock(950, true);
  const drop = Math.max(10, height * 0.08);
  return (
    <>
      {Array.from({ length: 18 }, (_, index) => {
        const at = phased(t, rand(seed, index + 100));
        const x = width * rand(seed, index + 110);
        const translateY = at.interpolate({ inputRange: [0, 1], outputRange: [-drop * 1.5, height] });
        const translateX = at.interpolate({ inputRange: [0, 1], outputRange: [0, -height * 0.18] });
        return <Animated.View key={index} style={[styles.abs, { left: x, top: 0, width: 1.6, height: drop, backgroundColor: "rgba(225,236,255,0.75)", transform: [{ translateX }, { translateY }, { rotate: "12deg" }] }]} />;
      })}
    </>
  );
}

function Bubbles({ width, height, seed, life }: LifeProps & { life: Extract<Life, { kind: "bubbles" }> }) {
  const t = useLoopClock(6000, true);
  return (
    <>
      {Array.from({ length: 7 }, (_, index) => {
        const at = phased(t, index / 7);
        const x = (life.left + (life.right - life.left) * rand(seed, index + 120)) * width;
        const size = 5 + 5 * rand(seed, index + 130);
        const translateY = at.interpolate({ inputRange: [0, 1], outputRange: [life.bottom * height, life.top * height] });
        const translateX = at.interpolate(sampleCurve(0, 1, 16, (p) => 4 * Math.sin(p * Math.PI * 5 + index)));
        const scale = at.interpolate({ inputRange: [0, 1], outputRange: [0.6, 1.2] });
        const opacity = at.interpolate(FADE_ENDS);
        return <Animated.View key={index} style={[styles.abs, styles.bubble, { left: x, top: 0, width: size, height: size, opacity, transform: [{ translateX }, { translateY }, { scale }] }]} />;
      })}
    </>
  );
}

/** A soft band of light crossing the picture: `t` 0..1 carries it from left to right. */
function Sweep({ t, width, height, strength = 0.4 }: { t: Animated.Value | Animated.AnimatedInterpolation<number>; width: number; height: number; strength?: number }) {
  const id = useGradientId("sweep");
  const w = Math.max(40, width * 0.28);
  const translateX = t.interpolate({ inputRange: [0, 1], outputRange: [-w * 1.6, width + w * 0.6] });
  return (
    <Animated.View pointerEvents="none" style={[styles.abs, { left: 0, top: -height * 0.3, width: w, height: height * 1.6, transform: [{ translateX }, { rotate: "18deg" }] }]}>
      <Svg width={w} height={height * 1.6}>
        <Defs>
          <LinearGradient id={id} x1="0" y1="0" x2="1" y2="0">
            <Stop offset="0" stopColor="#ffffff" stopOpacity={0} />
            <Stop offset="0.5" stopColor="#ffffff" stopOpacity={strength} />
            <Stop offset="1" stopColor="#ffffff" stopOpacity={0} />
          </LinearGradient>
        </Defs>
        <Path d={`M0 0 H${w} V${height * 1.6} H0 Z`} fill={`url(#${id})`} />
      </Svg>
    </Animated.View>
  );
}

function Shine({ width, height, seed }: LifeProps) {
  const t = useLoopClock(7000 + seed * 400, true);
  // Crosses in the first third of the clock, then rests out of sight.
  const sweep = t.interpolate({ inputRange: [0, 0.3, 1], outputRange: [0, 1, 1], extrapolate: "clamp" });
  return <Sweep t={sweep} width={width} height={height} strength={0.3} />;
}

const WINGS = [
  ["#f7b733", "#f39c12"],
  ["#e86ea8", "#c94f8c"],
  ["#7fc8f8", "#4ea8de"]
];

function Butterflies({ width, height, seed, life }: LifeProps & { life: Extract<Life, { kind: "butterflies" }> }) {
  const t = useLoopClock(16000, true);
  const flap = useLoopClock(300, true);
  const wing = flap.interpolate(smoothKeys([0, 0.5, 1], [1, 0.25, 1]));
  const size = Math.max(10, width * 0.03);
  return (
    <>
      {[0, 1].map((index) => {
        const p = rand(seed, index + 140) * 6;
        const translateX = t.interpolate(sampleCurve(0, 1, 60, (x) => width * (0.15 + 0.7 * (0.5 + 0.5 * Math.sin(2 * Math.PI * x + p)))));
        const translateY = t.interpolate(sampleCurve(0, 1, 60, (x) => height * (life.top + (life.bottom - life.top) * (0.5 + 0.5 * Math.sin(6 * Math.PI * x + p * 2)))));
        const [a, b] = WINGS[(seed + index) % WINGS.length];
        return (
          <Animated.View key={index} style={[styles.abs, { left: 0, top: 0, transform: [{ translateX }, { translateY }] }]}>
            <Animated.View style={{ transform: [{ scaleX: wing }] }}>
              <Svg width={size} height={size * 0.8} viewBox="0 0 20 16">
                <Ellipse cx={6} cy={6} rx={5} ry={5.5} fill={a} />
                <Ellipse cx={14} cy={6} rx={5} ry={5.5} fill={a} />
                <Ellipse cx={7} cy={12} rx={3.5} ry={3} fill={b} />
                <Ellipse cx={13} cy={12} rx={3.5} ry={3} fill={b} />
                <Path d="M10 3 V14" stroke="#3b2a20" strokeWidth={1.6} strokeLinecap="round" />
              </Svg>
            </Animated.View>
          </Animated.View>
        );
      })}
    </>
  );
}

function Steam({ width, height, life }: LifeProps & { life: Extract<Life, { kind: "steam" }> }) {
  const t = useLoopClock(3200, true);
  const w = Math.max(6, width * 0.018);
  return (
    <>
      {[0, 1, 2].map((index) => {
        const at = phased(t, index / 3);
        const translateY = at.interpolate({ inputRange: [0, 1], outputRange: [0, -height * 0.16] });
        const translateX = at.interpolate(sampleCurve(0, 1, 16, (p) => (index - 1) * 5 + 4 * Math.sin(p * Math.PI * 3 + index)));
        const scale = at.interpolate({ inputRange: [0, 1], outputRange: [0.5, 1.5] });
        const opacity = at.interpolate({ inputRange: [0, 0.25, 1], outputRange: [0, 0.7, 0], extrapolate: "clamp" });
        return <Animated.View key={index} style={[styles.abs, { left: life.x * width - w / 2, top: life.y * height - w * 1.6, width: w, height: w * 1.8, borderRadius: w, backgroundColor: "rgba(255,255,255,0.85)", opacity, transform: [{ translateX }, { translateY }, { scale }] }]} />;
      })}
    </>
  );
}

function Ants({ width, height, seed, life }: LifeProps & { life: Extract<Life, { kind: "ants" }> }) {
  const t = useLoopClock(13000, true);
  const step = useLoopClock(260, true);
  const bob = step.interpolate(smoothKeys([0, 0.5, 1], [0, -1.2, 0]));
  const size = Math.max(3, width * 0.008);
  return (
    <>
      {Array.from({ length: 7 }, (_, index) => {
        const at = phased(t, index / 7);
        const translateX = at.interpolate({ inputRange: [0, 1], outputRange: [-0.04 * width, life.to * width] });
        const opacity = at.interpolate(FADE_ENDS);
        const y = life.y * height + (rand(seed, index + 150) - 0.5) * height * 0.04;
        return (
          <Animated.View key={index} style={[styles.abs, styles.ant, { left: 0, top: y, opacity, transform: [{ translateX }, { translateY: bob }] }]}>
            <View style={[styles.dot, { width: size, height: size, backgroundColor: "#2b1d14" }]} />
            <View style={[styles.dot, { width: size * 1.3, height: size * 1.1, backgroundColor: "#2b1d14", marginStart: 1 }]} />
          </Animated.View>
        );
      })}
    </>
  );
}

function Drops({ width, height, life }: LifeProps & { life: Extract<Life, { kind: "drops" }> }) {
  const t = useLoopClock(900, true);
  const size = Math.max(4, width * 0.012);
  const ring = width * 0.09;
  const ringScale = t.interpolate({ inputRange: [0, 1], outputRange: [0.3, 1.4] });
  const ringOpacity = t.interpolate({ inputRange: [0, 0.2, 1], outputRange: [0, 0.8, 0] });
  return (
    <>
      {[0, 1, 2].map((index) => {
        const at = phased(t, index / 3);
        const translateY = at.interpolate(sampleCurve(0, 1, 12, (p) => (life.to - life.y) * height * p * p));
        const opacity = at.interpolate({ inputRange: [0, 0.1, 0.9, 1], outputRange: [0, 1, 1, 0] });
        return <Animated.View key={index} style={[styles.abs, { left: life.x * width - size / 2, top: life.y * height, width: size, height: size * 1.4, borderRadius: size, backgroundColor: "rgba(160,215,255,0.95)", opacity, transform: [{ translateY }] }]} />;
      })}
      <Animated.View style={[styles.abs, styles.ring, { left: life.x * width - ring / 2, top: life.to * height - ring * 0.15, width: ring, height: ring * 0.3, borderRadius: ring, opacity: ringOpacity, transform: [{ scale: ringScale }] }]} />
    </>
  );
}

function Embers({ width, height, seed }: LifeProps) {
  const t = useLoopClock(3800, true);
  return (
    <>
      {Array.from({ length: 12 }, (_, index) => {
        const at = phased(t, rand(seed, index + 160));
        const x = width * rand(seed, index + 170);
        const size = 2.5 + 2 * rand(seed, index + 180);
        const translateY = at.interpolate({ inputRange: [0, 1], outputRange: [height, height * 0.45] });
        const translateX = at.interpolate(sampleCurve(0, 1, 16, (p) => 6 * Math.sin(p * Math.PI * 4 + index)));
        const opacity = at.interpolate({ inputRange: [0, 0.15, 0.4, 0.6, 1], outputRange: [0, 1, 0.6, 1, 0], extrapolate: "clamp" });
        return <Animated.View key={index} style={[styles.abs, styles.dot, { left: x, top: 0, width: size, height: size, backgroundColor: index % 2 ? "#ffb347" : "#ff7a2f", opacity, transform: [{ translateX }, { translateY }] }]} />;
      })}
    </>
  );
}

const CAMEL_BODY =
  "M3 17 C3 12 7 7 13 7 C18 7 20 12 24 13 C26 13.5 27 12 28 9 C29 6 31 5 33 5.5 L36 6.5 C37 7 37 8.5 36 8.8 L34 9 C33 12 32 16 29 18 C27 20 24 20 22 20 L10 20 C6 20 3 19.5 3 17 Z";
const CAMEL_LEGS_A = "M8 19 L7 31 M12 19 L13 31 M22 19 L21 31 M26 18 L27 31";
const CAMEL_LEGS_B = "M8 19 L9 31 M12 19 L11 31 M22 19 L23 31 M26 18 L25 31";

/** One far-off camel, its legs stepping (two poses, swapped by the step clock). */
function FarCamel({ size, step, color }: { size: number; step: Animated.Value; color: string }) {
  const a = step.interpolate({ inputRange: [0, 0.49, 0.5, 1], outputRange: [1, 1, 0, 0] });
  const b = step.interpolate({ inputRange: [0, 0.49, 0.5, 1], outputRange: [0, 0, 1, 1] });
  const pose = (d: string, opacity: Animated.AnimatedInterpolation<number>) => (
    <Animated.View style={[StyleSheet.absoluteFill, { opacity }]}>
      <Svg width={size * 1.25} height={size} viewBox="0 0 40 32">
        <Path d={d} stroke={color} strokeWidth={2.4} strokeLinecap="round" />
      </Svg>
    </Animated.View>
  );
  return (
    <View style={{ width: size * 1.25, height: size }}>
      {pose(CAMEL_LEGS_A, a)}
      {pose(CAMEL_LEGS_B, b)}
      <Svg width={size * 1.25} height={size} viewBox="0 0 40 32">
        <Path d={CAMEL_BODY} fill={color} />
        <Path d="M3.5 15 Q1 18 2.2 22" stroke={color} strokeWidth={1.4} strokeLinecap="round" fill="none" />
      </Svg>
    </View>
  );
}

function Caravan({ width, height, life }: LifeProps & { life: Extract<Life, { kind: "caravan" }> }) {
  const t = useLoopClock(70000, true);
  const step = useLoopClock(700, true);
  const size = Math.max(12, height * (life.size ?? 0.09));
  const bob = step.interpolate(smoothKeys([0, 0.25, 0.5, 0.75, 1], [0, -1, 0, -1, 0]));
  return (
    <>
      {[0, 1].map((index) => {
        const translateX = t.interpolate({ inputRange: [0, 1], outputRange: [-size * 3 - index * size * 1.6, width + size * 1.5 - index * size * 1.6] });
        return (
          <Animated.View key={index} style={[styles.abs, { left: 0, top: life.y * height - size, transform: [{ translateX }, { translateY: bob }] }]}>
            <FarCamel size={size * (index ? 0.85 : 1)} step={step} color="rgba(92,62,40,0.7)" />
          </Animated.View>
        );
      })}
    </>
  );
}

const styles = StyleSheet.create({
  frame: {
    position: "absolute",
    overflow: "hidden"
  },
  abs: {
    position: "absolute"
  },
  puff: {
    position: "absolute",
    borderRadius: 999
  },
  dot: {
    borderRadius: 999
  },
  bubble: {
    borderRadius: 999,
    borderWidth: 1.5,
    borderColor: "rgba(255,255,255,0.75)",
    backgroundColor: "rgba(255,255,255,0.12)"
  },
  ant: {
    flexDirection: "row",
    alignItems: "center"
  },
  ring: {
    borderWidth: 1.5,
    borderColor: "rgba(200,235,255,0.9)"
  }
});
