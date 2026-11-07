import React, { useEffect, useRef, useState } from "react";
import { Animated, Easing, Pressable, View } from "react-native";
import Svg, { Circle, Ellipse, Path, Rect } from "react-native-svg";
import type { GameSoundEvent } from "../services/gameSoundLibrary";
import { smoothKeys } from "./motion";
import { Floater, Heart, Sparkle, Word, useCycle, useOneShot } from "./reactions";
import { PathScenery } from "./PathScenery";
import { useScene } from "./sceneMood";
import { Abs, Splash, deg, k, windowOf } from "./showKit";
import { feedback } from "./sound";

/**
 * What sails on the beach's sea, down in the water of the strip at the bottom of the unit (not up in the
 * air beside the path): the little sailing boat bobs along to and fro all the time, and every so often
 * Nuh's Ark (the Ark of Noah, peace be upon him) sails right across with the animals looking out. Both can
 * be tapped. The Ark carries animals only, no people, and the words it shows are from Hud 11:41
 * ("In the name of Allah is its course and its anchorage").
 */

const WATER = "#2FA8FF";
const WATER_LIGHT = "#8FD3FF";
const WOOD = "#B86B2E";
const WOOD_DEEP = "#8A4B1E";
const WOOD_LIGHT = "#D9904F";
const INK = "#1F2D27";

const BOAT = 46;
/** The boat's waterline sits this far down the strip (px), between the far and the near wave. */
const BOAT_TOP = 2;
/** One trip from one side to the other, ms. */
const BOAT_TRIP_MS = 15000;

export const ARK_W = 104;
export const ARK_H = 70;
/** The Ark first sails by soon after the learner arrives, then once in a while. */
export const ARK_FIRST_MS = 6000;
export const ARK_EVERY_MS = 42000;
export const ARK_CROSS_MS = 20000;

function useLoop(active: boolean, duration: number) {
  const value = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    value.setValue(0);
    if (!active) return undefined;
    const loop = Animated.loop(Animated.sequence([Animated.timing(value, { toValue: 1, duration, easing: Easing.linear, useNativeDriver: true })]));
    loop.start();
    return () => loop.stop();
  }, [active, duration, value]);
  return value;
}

/** The sailing boat, out on the water, sailing to and fro (it turns round at each end) and bobbing on the waves. */
export function SailingBoat({ width, top, moving }: { width: number; top: number; moving: boolean }) {
  const trip = useLoop(moving, BOAT_TRIP_MS * 2);
  const bob = useLoop(moving, 2600);
  const from = width * 0.08;
  const to = Math.max(from, width * 0.92 - BOAT);
  const x = trip.interpolate(smoothKeys([0, 0.06, 0.44, 0.56, 0.94, 1], [from, from, to, to, from, from]));
  // Turns round while it waits at each end.
  const face = trip.interpolate({ inputRange: [0, 0.47, 0.53, 0.97, 1], outputRange: [1, 1, -1, -1, 1] });
  const y = bob.interpolate(smoothKeys([0, 0.25, 0.5, 0.75, 1], [0, -2.5, 0, -2.5, 0]));
  const tip = bob.interpolate(smoothKeys([0, 0.25, 0.5, 0.75, 1], ["0deg", "5deg", "0deg", "-5deg", "0deg"]));
  return (
    <Animated.View
      pointerEvents="box-none"
      style={{ position: "absolute", left: 0, top: top + BOAT_TOP, width: BOAT, height: BOAT, transform: moving ? [{ translateX: x }, { translateY: y }] : [{ translateX: width * 0.7 }] }}
      testID="sea-boat"
    >
      <Animated.View pointerEvents="box-none" style={{ transformOrigin: "bottom", transform: moving ? [{ scaleX: face }, { rotate: tip }] : [] }}>
        <PathScenery kind="boat" size={BOAT} tappable />
      </Animated.View>
    </Animated.View>
  );
}

type ArkShow = { name: "animals" | "splash" | "wave" | "bismillah"; sound: GameSoundEvent; ms: number };
export const ARK_SHOWS: ArkShow[] = [
  { name: "animals", sound: "giggle", ms: 1800 },
  { name: "splash", sound: "splash", ms: 1500 },
  { name: "wave", sound: "whoosh", ms: 1900 },
  { name: "bismillah", sound: "sparkle", ms: 2200 }
];

/** The Ark: a big wooden boat with a house on its deck, a giraffe looking out of the roof and animals at the windows. */
function ArkArt({ peek }: { peek?: Animated.AnimatedInterpolation<number> }) {
  return (
    <View style={{ width: ARK_W, height: ARK_H }}>
      {/* The giraffe's neck comes up through the roof (and stretches up higher when tapped). */}
      <Animated.View style={{ position: "absolute", left: 0, top: 0, width: ARK_W, height: ARK_H, transform: peek ? [{ translateY: peek }] : [] }}>
        <Svg width={ARK_W} height={ARK_H} viewBox="0 0 104 70">
          <Path d="M64 30V8" stroke="#F2B544" strokeWidth={5} strokeLinecap="round" />
          <Circle cx={64.5} cy={12} r={1.3} fill="#B9772A" />
          <Circle cx={63.5} cy={20} r={1.4} fill="#B9772A" />
          <Ellipse cx={67} cy={6} rx={5.2} ry={3.6} fill="#F2B544" />
          <Path d="M62 2.6V0.4M65 2.4V0.2" stroke="#B9772A" strokeWidth={1.4} strokeLinecap="round" />
          <Circle cx={68} cy={5} r={0.9} fill={INK} />
        </Svg>
      </Animated.View>
      <Svg width={ARK_W} height={ARK_H} viewBox="0 0 104 70" style={{ position: "absolute", left: 0, top: 0 }}>
        {/* The house on the deck, with its roof and windows. */}
        <Rect x={30} y={30} width={46} height={18} rx={2} fill={WOOD_LIGHT} />
        <Path d="M26 31L53 20L80 31Z" fill={WOOD_DEEP} />
        <Path d="M36 34H70" stroke={WOOD} strokeWidth={1.2} />
        <Rect x={35} y={36} width={9} height={8} rx={1.6} fill="#5A3416" />
        <Rect x={49} y={36} width={9} height={8} rx={1.6} fill="#5A3416" />
        <Rect x={63} y={36} width={9} height={8} rx={1.6} fill="#5A3416" />
        {/* A lion and a sheep look out of the windows. */}
        <Circle cx={39.5} cy={40.5} r={3.6} fill="#E08A2A" />
        <Circle cx={39.5} cy={40.8} r={2.3} fill="#F7C46B" />
        <Circle cx={38.7} cy={40} r={0.5} fill={INK} />
        <Circle cx={40.4} cy={40} r={0.5} fill={INK} />
        <Circle cx={67.5} cy={40.5} r={3.2} fill="#FFFFFF" />
        <Ellipse cx={67.5} cy={41.4} rx={1.8} ry={2} fill="#5A4A42" />
        <Circle cx={67} cy={41} r={0.45} fill="#FFFFFF" />
        <Circle cx={68} cy={41} r={0.45} fill="#FFFFFF" />
        {/* The hull. */}
        <Path d="M6 46H98L90 60C76 64 28 64 14 60Z" fill={WOOD} />
        <Path d="M10 51H94M14 56H90" stroke={WOOD_DEEP} strokeWidth={1.6} />
        <Path d="M6 46L2 40L10 46ZM98 46L102 40L94 46Z" fill={WOOD_DEEP} />
        {/* Its own water, so it sits in the sea. */}
        <Path d="M0 60Q8 56 16 60T32 60T48 60T64 60T80 60T96 60T112 60V70H0Z" fill={WATER} />
        <Path d="M6 63Q11 61 16 63M40 64Q45 62 50 64M74 63Q79 61 84 63" stroke={WATER_LIGHT} strokeWidth={1.4} strokeLinecap="round" fill="none" />
      </Svg>
    </View>
  );
}

/** Nuh's Ark sailing across the beach's sea once in a while. Tap it for a little show. */
export function NoahsArk({ width, top, moving }: { width: number; top: number; moving: boolean }) {
  const { asleep } = useScene();
  const sail = useRef(new Animated.Value(0)).current;
  const bob = useLoop(moving && !asleep, 3000);
  const [out, setOut] = useState(false);
  const [show, setShow] = useState<number | null>(null);
  const { value: t, play } = useOneShot();
  const next = useCycle(ARK_SHOWS.length);

  useEffect(() => {
    if (!moving || asleep) return undefined;
    let timer: ReturnType<typeof setTimeout>;
    let running: Animated.CompositeAnimation | undefined;
    const go = (wait: number) => {
      timer = setTimeout(() => {
        setOut(true);
        sail.setValue(0);
        running = Animated.timing(sail, { toValue: 1, duration: ARK_CROSS_MS, easing: Easing.linear, useNativeDriver: true });
        running.start();
        // Off the far side once the crossing is done (a timer, so it never hangs about if a frame is dropped).
        timer = setTimeout(() => {
          setOut(false);
          go(ARK_EVERY_MS);
        }, ARK_CROSS_MS + 100);
      }, wait);
    };
    go(ARK_FIRST_MS);
    return () => {
      clearTimeout(timer);
      running?.stop();
      setOut(false);
    };
  }, [moving, asleep, sail]);

  if (!out) return null;
  const name = show !== null ? ARK_SHOWS[show].name : null;
  const onTap = () => {
    const index = next();
    feedback(ARK_SHOWS[index].sound, "light");
    setShow(index);
    play(ARK_SHOWS[index].ms, () => setShow(null));
  };
  const x = sail.interpolate({ inputRange: [0, 1], outputRange: [-ARK_W - 10, width + 10] });
  const y = bob.interpolate(smoothKeys([0, 0.25, 0.5, 0.75, 1], [0, -2, 0, -2, 0]));
  const tip = bob.interpolate(smoothKeys([0, 0.25, 0.5, 0.75, 1], ["0deg", "2.5deg", "0deg", "-2.5deg", "0deg"]));
  // The show's own moves: the big wave lifts and tips it, the giraffe stretches up for "animals".
  const showMoves =
    name === "wave"
      ? [{ translateY: k(t, [0, 0.3, 0.55, 0.8, 1], [0, -10, 0, -4, 0]) }, { rotate: deg(t, [0, 0.25, 0.5, 0.75, 1], [0, -7, 6, -3, 0]) }]
      : [];
  const peek = name === "animals" ? t.interpolate(smoothKeys([0, 0.2, 0.75, 1], [0, -9, -9, 0])) : undefined;
  return (
    <Animated.View
      pointerEvents="box-none"
      style={{ position: "absolute", left: 0, top: top - 22, width: ARK_W, height: ARK_H, transform: [{ translateX: x }, { translateY: y }] }}
    >
      <Pressable onPress={onTap} hitSlop={6} accessibilityRole="button" accessibilityLabel="Nuh's Ark" testID="sea-ark">
        <Animated.View style={{ transformOrigin: "bottom", transform: [{ rotate: tip }, ...(showMoves as never[])] }}>
          <ArkArt peek={peek} />
        </Animated.View>
        {name === "animals"
          ? [0, 1, 2].map((index) => (
              <Floater key={index} t={t} from={0.15 + index * 0.12} to={0.7 + index * 0.1} x={ARK_W * (0.3 + index * 0.18)} y={ARK_H * 0.3} rise={ARK_H * 0.4}>
                <Heart size={11} />
              </Floater>
            ))
          : null}
        {name === "splash" ? <Splash t={t} s={ARK_W * 0.7} waterY={ARK_H * 0.82} from={0} to={0.8} /> : null}
        {name === "wave" ? (
          <Abs x={0} y={ARK_H * 0.72} style={{ opacity: windowOf(t, 0, 0.9), transform: [{ translateX: t.interpolate({ inputRange: [0, 1], outputRange: [-ARK_W * 0.3, ARK_W * 0.5] }) }] }}>
            <Svg width={ARK_W * 0.7} height={16} viewBox="0 0 70 16">
              <Path d="M0 16C10 4 22 0 34 6C40 9 44 6 46 2C52 8 60 12 70 16Z" fill={WATER_LIGHT} />
            </Svg>
          </Abs>
        ) : null}
        {name === "bismillah" ? (
          <>
            <Floater t={t} from={0.05} to={0.95} x={ARK_W * 0.12} y={-ARK_H * 0.05} rise={ARK_H * 0.22} pop={false}>
              <Word size={12} color="#2F7CD6">بِسْمِ اللَّهِ</Word>
            </Floater>
            {[0, 1].map((index) => (
              <Floater key={index} t={t} from={0.2 + index * 0.25} to={0.7 + index * 0.25} x={ARK_W * (0.2 + index * 0.55)} y={ARK_H * 0.25} rise={ARK_H * 0.2}>
                <Sparkle size={11} />
              </Floater>
            ))}
          </>
        ) : null}
      </Pressable>
    </Animated.View>
  );
}
