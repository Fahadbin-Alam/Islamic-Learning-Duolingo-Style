import React, { useEffect, useMemo, useRef } from "react";
import { Animated, Easing, StyleSheet, Text, View, type ViewStyle } from "react-native";
import { SvgXml } from "react-native-svg";
import type { SignScene } from "../../data/signScenes";
import { t } from "../../i18n";
import { LITE_LIFE, useLiteMotion } from "../liteMotion";
import { sampleCurve } from "../motion";
import { fonts } from "../theme";
import { SIGN_BOX, signArt, type SignLoop, type SignPart, type SignWord } from "./signArt";

/**
 * A sign in creation, alive (signArt.ts draws each one): its story plays once on one clock, on the native driver, its
 * words shown a few at a time over it; its rain, waves, wind and swaying palms keep moving while it is seen. Tap it
 * (SignCard) to watch the story again. With reduce motion (or Calm mode) it stands still, at its story's end or where
 * its art says (stillAt); on a slow phone fewer of its parts keep moving.
 */

export type SignSceneProps = {
  scene: SignScene;
  width: number;
  height: number;
  still?: boolean;
  /** Bump to play the story again. */
  play?: number;
  delay?: number;
  testID?: string;
};

/** The box, scaled to cover the picture, its middle on the picture's middle. */
type Frame = { s: number; left: number; top: number; w: number; h: number };

function cover(width: number, height: number): Frame {
  const s = Math.max(width / SIGN_BOX.width, height / SIGN_BOX.height);
  return { s, left: (width - SIGN_BOX.width * s) / 2, top: (height - SIGN_BOX.height * s) / 2, w: SIGN_BOX.width * s, h: SIGN_BOX.height * s };
}

const wrap = (svg: string) => `<svg xmlns="http://www.w3.org/2000/svg" width="${SIGN_BOX.width}" height="${SIGN_BOX.height}" viewBox="0 0 ${SIGN_BOX.width} ${SIGN_BOX.height}">${svg}</svg>`;

/** Where a still loop stands, a quarter of the way round: a bobbing part at its side, a twinkle half lit. */
const STILL_LOOP = 0.25;

const TAU = Math.PI * 2;

/** A loop from 0 to 1 again and again (a lone loop does not run on the web; in a sequence it does). */
function useLoops(msList: number[], running: boolean[]) {
  const values = useMemo(() => msList.map(() => new Animated.Value(STILL_LOOP)), [msList]);
  const key = running.join(",");
  useEffect(() => {
    const loops: Animated.CompositeAnimation[] = [];
    values.forEach((value, index) => {
      if (!running[index]) {
        value.setValue(STILL_LOOP);
        return;
      }
      value.setValue(0);
      loops.push(Animated.loop(Animated.sequence([Animated.timing(value, { toValue: 1, duration: msList[index], easing: Easing.linear, useNativeDriver: true })])));
    });
    loops.forEach((loop) => loop.start());
    return () => loops.forEach((loop) => loop.stop());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values, key]);
  return values;
}

export function SignSceneView({ scene, width, height, still = false, play = 0, delay = 0, testID = "sign-scene" }: SignSceneProps) {
  const lite = useLiteMotion();
  const art = signArt(scene.kind);
  const frame = useMemo(() => cover(width, height), [width, height]);
  const rest = art.stillAt ?? 1;
  const clock = useRef(new Animated.Value(still ? rest : 0)).current;

  useEffect(() => {
    if (still) {
      clock.setValue(rest);
      return undefined;
    }
    clock.setValue(0);
    const story = Animated.sequence([Animated.delay(delay), Animated.timing(clock, { toValue: 1, duration: art.ms, easing: Easing.linear, useNativeDriver: true })]);
    story.start();
    return () => story.stop();
  }, [art.ms, clock, delay, play, rest, still]);

  // The parts that move on their own share a clock for each length of round. On a slow phone only the first few
  // clocks run; the parts on the others stand still.
  const msList = useMemo(() => [...new Set(art.parts.flatMap((part) => (part.loop ? [part.loop.ms] : [])))], [art]);
  const running = msList.map((_, index) => !still && (!lite || index < LITE_LIFE + 1));
  const loops = useLoops(msList, running);

  return (
    <View style={[styles.root, { width, height }]} testID={testID} pointerEvents="none" accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
      {art.parts.map((part, index) => (
        <PartView key={index} part={part} frame={frame} clock={clock} loop={part.loop ? loops[msList.indexOf(part.loop.ms)] : undefined} testID={`${testID}-part-${index}`} />
      ))}
      <Words words={art.words} clock={clock} width={width} testID={`${testID}-words`} />
    </View>
  );
}

/** A list of moves, built up as a part needs them, for an animated view's transform. */
type Moves = object[];
const asTransform = (moves: Moves) => moves as unknown as Animated.WithAnimatedValue<ViewStyle>["transform"];

/** A value of the story's clock, from a part's keys. */
const keyed = (clock: Animated.Value, at: number[], values: number[]) => clock.interpolate({ inputRange: at, outputRange: values, extrapolate: "clamp" });

/** Turns about a point: a transform list that moves the point to the view's middle, turns, and moves it back. */
function about(dx: number, dy: number, inner: Moves): Moves {
  if (!dx && !dy) return inner;
  return [{ translateX: dx }, { translateY: dy }, ...inner, { translateX: -dx }, { translateY: -dy }];
}

function PartView({ part, frame, clock, loop, testID }: { part: SignPart; frame: Frame; clock: Animated.Value; loop?: Animated.Value; testID: string }) {
  const { s } = frame;
  const origin = part.origin ?? { x: SIGN_BOX.width / 2, y: SIGN_BOX.height / 2 };
  const dx = (origin.x - SIGN_BOX.width / 2) * s;
  const dy = (origin.y - SIGN_BOX.height / 2) * s;
  const keys = part.keys;
  const story = useMemo(() => {
    if (!keys) return { opacity: 1, transform: [] as Moves };
    const moves: Moves = [];
    if (keys.x)
      moves.push({
        translateX: keyed(
          clock,
          keys.at,
          keys.x.map((value) => value * s)
        )
      });
    if (keys.y)
      moves.push({
        translateY: keyed(
          clock,
          keys.at,
          keys.y.map((value) => value * s)
        )
      });
    const turns: Moves = [];
    if (keys.rotate) turns.push({ rotate: keyed(clock, keys.at, keys.rotate).interpolate({ inputRange: [-360, 360], outputRange: ["-360deg", "360deg"] }) });
    if (keys.scale) turns.push({ scale: keyed(clock, keys.at, keys.scale) });
    if (keys.scaleX) turns.push({ scaleX: keyed(clock, keys.at, keys.scaleX) });
    if (keys.scaleY) turns.push({ scaleY: keyed(clock, keys.at, keys.scaleY) });
    return { opacity: keys.opacity ? keyed(clock, keys.at, keys.opacity) : 1, transform: [...moves, ...about(dx, dy, turns)] };
  }, [clock, dx, dy, keys, s]);
  const own = useMemo(() => (part.loop && loop ? loopStyle(part.loop, loop, frame, dx, dy) : undefined), [dx, dy, frame, loop, part.loop]);
  const xml = useMemo(() => wrap(part.svg), [part.svg]);
  const clip = part.clip;
  const sliding = part.loop && (part.loop.move === "fall" || part.loop.move === "slide") ? part.loop : undefined;
  const period = sliding ? (sliding.period ?? (sliding.move === "fall" ? SIGN_BOX.height : SIGN_BOX.width)) * s : 0;
  const copy = sliding ? (sliding.move === "fall" ? { top: -period } : { left: sliding.reverse ? period : -period }) : undefined;
  const box = { position: "absolute" as const, width: frame.w, height: frame.h, left: clip ? -clip.x * s : frame.left, top: clip ? -clip.y * s : frame.top };
  const picture = (
    <Animated.View style={[box, own ? { opacity: own.opacity ?? 1, transform: asTransform(own.transform) } : null]}>
      <SvgXml xml={xml} width={frame.w} height={frame.h} />
      {copy ? (
        <View style={[StyleSheet.absoluteFill, copy]}>
          <SvgXml xml={xml} width={frame.w} height={frame.h} />
        </View>
      ) : null}
    </Animated.View>
  );
  return (
    <Animated.View style={[StyleSheet.absoluteFill, { opacity: story.opacity, transform: asTransform(story.transform) }]} testID={testID}>
      {clip ? <View style={{ position: "absolute", overflow: "hidden", left: frame.left + clip.x * s, top: frame.top + clip.y * s, width: clip.w * s, height: clip.h * s }}>{picture}</View> : picture}
    </Animated.View>
  );
}

/** A loop's values through its round (0 to 1), sampled; `phase` is where in its round it starts. */
const round = (loop: Animated.Value, phase: number, fn: (q: number) => number, steps = 24) => loop.interpolate(sampleCurve(0, 1, steps, (q) => fn((q + phase) % 1)));

/** Through a round, with an exact break where it starts again (rain, waves): from `from` to `to`, then back at once. */
function sawtooth(loop: Animated.Value, phase: number, from: number, to: number) {
  if (!phase) return loop.interpolate({ inputRange: [0, 1], outputRange: [from, to] });
  const cut = 1 - phase;
  return loop.interpolate({ inputRange: [0, cut, cut + 0.0001, 1], outputRange: [from + (to - from) * phase, to, from, from + (to - from) * phase] });
}

/** Fades in at the start of a fall and out before its end. */
const fade = (q: number) => (q < 0.15 ? q / 0.15 : q > 0.7 ? Math.max(0, (1 - q) / 0.3) : 1);

function loopStyle(spec: SignLoop, loop: Animated.Value, frame: Frame, dx: number, dy: number): { opacity?: Animated.AnimatedInterpolation<number>; transform: Moves } {
  const { s } = frame;
  const phase = "phase" in spec && spec.phase ? spec.phase : 0;
  switch (spec.move) {
    case "fall": {
      const period = (spec.period ?? SIGN_BOX.height) * s;
      return { transform: [{ translateY: sawtooth(loop, phase, 0, period) }] };
    }
    case "slide": {
      const period = (spec.period ?? SIGN_BOX.width) * s;
      return { transform: [{ translateX: sawtooth(loop, phase, 0, spec.reverse ? -period : period) }] };
    }
    case "bob": {
      const transform: Moves = [];
      if (spec.x) transform.push({ translateX: round(loop, phase, (q) => (spec.x ?? 0) * s * Math.sin(TAU * q)) });
      if (spec.y) transform.push({ translateY: round(loop, phase, (q) => (spec.y ?? 0) * s * Math.sin(TAU * q)) });
      if (spec.rotate)
        transform.push(...about(dx, dy, [{ rotate: round(loop, phase, (q) => (spec.rotate ?? 0) * Math.sin(TAU * q + Math.PI / 3)).interpolate({ inputRange: [-360, 360], outputRange: ["-360deg", "360deg"] }) }]));
      return { transform };
    }
    case "twinkle": {
      const low = spec.low ?? 0.2;
      return { opacity: round(loop, phase, (q) => low + (1 - low) * (0.5 - 0.5 * Math.cos(TAU * q))), transform: [] };
    }
    case "sway":
      return { transform: about(dx, dy, [{ rotate: round(loop, phase, (q) => spec.angle * Math.sin(TAU * q)).interpolate({ inputRange: [-360, 360], outputRange: ["-360deg", "360deg"] }) }]) };
    case "swim":
      // There and back, turning at each end (the turn is a quick flip through its edge).
      return {
        transform: [{ translateX: round(loop, phase, (q) => spec.x * s * Math.sin(TAU * q), 32) }, ...about(dx, dy, [{ scaleX: round(loop, phase, (q) => Math.max(-1, Math.min(1, 5 * Math.cos(TAU * q))), 32) }])]
      };
    case "drip":
      return { opacity: round(loop, phase, fade), transform: [{ translateY: round(loop, phase, (q) => spec.distance * s * q) }] };
  }
}

/** The words over the scene, one at a time, in a small dark pill at its top. */
function Words({ words, clock, width, testID }: { words: SignWord[]; clock: Animated.Value; width: number; testID: string }) {
  return (
    <View style={[styles.words, { width }]} pointerEvents="none">
      {words.map((word, index) => {
        const last = word.to >= 1;
        const opacity = last
          ? clock.interpolate({ inputRange: [0, word.from, Math.min(1, word.from + 0.03), 1], outputRange: [0, 0, 1, 1], extrapolate: "clamp" })
          : clock.interpolate({ inputRange: [0, word.from, word.from + 0.025, word.to - 0.025, word.to, 1], outputRange: [0, 0, 1, 1, 0, 0], extrapolate: "clamp" });
        return (
          <Animated.View key={index} style={[styles.wordSlot, { opacity }]} testID={`${testID}-${index}`}>
            <View style={[styles.word, { maxWidth: width - 20 }]}>
              <Text style={styles.wordText} numberOfLines={2}>
                {t(word.text)}
              </Text>
            </View>
          </Animated.View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { overflow: "hidden" },
  words: { position: "absolute", top: 8, left: 0, alignItems: "center" },
  wordSlot: { position: "absolute", top: 0, left: 0, right: 0, alignItems: "center" },
  word: { backgroundColor: "rgba(16, 24, 40, 0.62)", borderRadius: 10, paddingHorizontal: 10, paddingVertical: 4 },
  wordText: { color: "#FFFFFF", fontFamily: fonts.bodyHeavy, fontSize: 13, lineHeight: 18, textAlign: "center" }
});
