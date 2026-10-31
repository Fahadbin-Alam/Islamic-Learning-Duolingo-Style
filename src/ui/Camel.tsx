import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Animated, Dimensions, Easing, Pressable, StyleSheet, View, type StyleProp, type ViewStyle } from "react-native";
import Svg, { Circle, Ellipse, G, Path, Rect } from "react-native-svg";
import type { GameSoundEvent } from "../services/gameSoundLibrary";
import { sampleCurve, smoothKeys, useReduceMotion } from "./motion";
import { Drop, Floater, Heart, Puff, Sparkle, Word, shake, useCycle, useOneShot } from "./reactions";
import { Snooze, useScene } from "./sceneMood";
import { feedback } from "./sound";
import { colors, darken, lighten } from "./theme";

export { useReduceMotion };

export type CamelProps = {
  /** Width of the camel in px. Default 64. */
  size?: number;
  /** Saddle cloth color. Default: the brand green. */
  accent?: string;
  /** Walk back and forth over `range` px. Off: the camel stands still. */
  walking?: boolean;
  /** How far it walks, in px. The box is `size + range` wide. Default 0. */
  range?: number;
  /** Start facing left (walking toward the left end). */
  faceLeft?: boolean;
  /**
   * Walk right across a row this wide instead of pacing in `range`: the camel walks off one edge of the
   * screen, comes back in from the other, rests at `home`, turns round and does it the other way.
   * The box is `wrapWidth` wide.
   */
  wrapWidth?: number;
  /** With `wrapWidth`: where the camel rests between trips, px from the box's left. */
  home?: number;
  /** Each tap plays the next reaction (see CAMEL_REACTIONS). */
  tappable?: boolean;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

const VIEW_W = 120;
const VIEW_H = 100;

const FUR = "#E3A857";
const FUR_DEEP = "#C4863A";
const FUR_FAR = "#B5772F";
const FUR_LIGHT = "#F4CB8A";
const EYE = "#2A2833";
const CHEEK = "#FF8FA3";

/** One step (both leg frames) in ms. */
const STEP_MS = 440;
/** Steps per walk from one end to the other. */
const STEPS = 6;
const REST_MS = 900;
/** Easing into and out of a walk, so the legs start and stop softly. */
const STRIDE_MS = 220;
/** Turning round at either end, taken out of the rest. */
const TURN_MS = 260;

// Each leg swings on its own about its hip on a smooth cosine; diagonal pairs swing together, like a
// real walk. `stride` (0..1) blends from a stand into the full swing, so a walk can start or stop at
// any moment without the legs snapping.
const SWING = 14;
const STAND_ANGLE = 4;
const LEGS = [
  // Drawn back to front: far legs first, in the darker fur.
  { x: 38, sign: 1, color: FUR_FAR },
  { x: 72, sign: -1, color: FUR_FAR },
  { x: 30, sign: -1, color: FUR_DEEP },
  { x: 64, sign: 1, color: FUR_DEEP }
] as const;
const HIP_Y = 62;

function Leg({ x, color }: { x: number; color: string }) {
  // A leg hangs from (x, HIP_Y); the knee is a little knob halfway down.
  return (
    <Svg width="100%" height="100%" viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}>
      <Rect x={x - 3.6} y={60} width={7.2} height={34} rx={3.6} fill={color} />
      <Ellipse cx={x} cy={79} rx={4.6} ry={3.4} fill={color} />
      <Ellipse cx={x + 1.2} cy={94} rx={5.6} ry={2.8} fill={darken(color, 0.12)} />
    </Svg>
  );
}

type CamelFaceKind = "calm" | "happy" | "laugh" | "sad" | "puff" | "spit" | "baby" | "sleep";

/** The camel's eye, cheek and mouth for each feeling. */
function CamelFace({ face }: { face: CamelFaceKind }) {
  const mouthColor = "#8A4B1E";
  const eye =
    face === "sleep" ? (
      <Path d="M93.2 17Q96.5 20 99.8 17" stroke={EYE} strokeWidth={1.8} strokeLinecap="round" fill="none" />
    ) : face === "happy" || face === "laugh" ? (
      <Path d={face === "laugh" ? "M93.5 14.5L98.5 17L93.5 19.5" : "M93.5 18Q96.5 13.5 99.5 18"} stroke={EYE} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" fill="none" />
    ) : face === "sad" ? (
      <G>
        <Circle cx={96.5} cy={17.5} r={2.8} fill={EYE} />
        <Circle cx={97.4} cy={16.5} r={0.9} fill="#FFFFFF" />
        <Path d="M93 11.8Q96.5 11.6 99.8 14" stroke={EYE} strokeWidth={1.3} strokeLinecap="round" fill="none" />
      </G>
    ) : face === "baby" ? (
      <G>
        <Circle cx={96.5} cy={17} r={4.4} fill={EYE} />
        <Circle cx={98} cy={15.4} r={1.6} fill="#FFFFFF" />
        <Circle cx={95.3} cy={18.8} r={0.8} fill="#FFFFFF" />
      </G>
    ) : (
      <G>
        <Circle cx={96.5} cy={17} r={3.2} fill={EYE} />
        <Circle cx={97.6} cy={15.8} r={1.1} fill="#FFFFFF" />
        <Path d="M92.8 12.6Q96 10.6 99.6 12.2" stroke={EYE} strokeWidth={1.3} strokeLinecap="round" fill="none" />
      </G>
    );
  const mouth =
    face === "happy" ? (
      <Path d="M100.5 27.5Q105 33.5 110 28" stroke={mouthColor} strokeWidth={1.8} strokeLinecap="round" fill="none" />
    ) : face === "laugh" ? (
      <G>
        <Path d="M100 27Q105 26 111 27Q110 34 105 34Q101 34 100 27Z" fill={mouthColor} />
        <Path d="M102 31.5Q105 29.5 108.5 31.5Q107 34 105 34Q103 34 102 31.5Z" fill="#FF7E8E" />
      </G>
    ) : face === "sad" ? (
      <Path d="M101.5 30.5Q105.5 27 109.5 30.2" stroke={mouthColor} strokeWidth={1.6} strokeLinecap="round" fill="none" />
    ) : face === "puff" ? (
      <Path d="M103 29.5L108 29.5" stroke={mouthColor} strokeWidth={1.8} strokeLinecap="round" />
    ) : face === "spit" ? (
      <Ellipse cx={107.5} cy={29.5} rx={2} ry={2.4} fill={mouthColor} />
    ) : (
      <Path d="M101 28.5Q105 31.5 109.5 28.8" stroke={mouthColor} strokeWidth={1.6} strokeLinecap="round" fill="none" />
    );
  const cheek =
    face === "puff" ? <Ellipse cx={103} cy={26} rx={6.5} ry={5} fill={FUR_LIGHT} stroke={FUR_DEEP} strokeWidth={0.8} /> : <Ellipse cx={99} cy={25.5} rx={3} ry={2} fill={CHEEK} opacity={face === "baby" || face === "happy" ? 0.9 : 0.65} />;
  return (
    <G>
      {cheek}
      {mouth}
      {eye}
      {face === "baby" ? (
        // A little bow on the baby camel's head.
        <G>
          <Path d="M90 9L84 5L84 13Z M90 9L96 5L96 13Z" fill="#FF82AB" />
          <Circle cx={90} cy={9} r={2} fill="#FF5C8A" />
        </G>
      ) : null}
    </G>
  );
}

function Body({ accent, face }: { accent: string; face: CamelFaceKind }) {
  const cloth = accent;
  const clothLip = darken(accent, 0.18);
  return (
    <Svg width="100%" height="100%" viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}>
      {/* Tail */}
      <Path d="M22 50 Q12 54 15 66" stroke={FUR_DEEP} strokeWidth={3.4} strokeLinecap="round" fill="none" />
      <Ellipse cx={15} cy={67} rx={2.8} ry={3.6} fill={FUR_FAR} />
      {/* Body and hump */}
      <Path d="M20 54C20 42 28 37 36 36C40 20 60 18 64 34C74 34 82 40 82 52C82 64 72 70 52 70C30 70 20 66 20 54Z" fill={FUR} />
      <Path d="M24 60C30 66 40 68 52 68C66 68 76 64 80 56C78 66 68 71 52 71C36 71 26 67 24 60Z" fill={FUR_DEEP} />
      <Path d="M30 46C30 40 34 38 38 37" stroke={FUR_LIGHT} strokeWidth={2.4} strokeLinecap="round" fill="none" />
      {/* Saddle cloth over the hump, with a fringe */}
      <Path d="M36 38C40 27 58 26 63 37L63 50C55 53 44 53 36 50Z" fill={cloth} />
      <Path d="M36 47C44 50 55 50 63 47L63 50C55 53 44 53 36 50Z" fill={clothLip} />
      <Path d="M41 34C44 30 50 29 54 30" stroke={lighten(cloth, 0.45)} strokeWidth={2} strokeLinecap="round" fill="none" />
      <Circle cx={40} cy={53.5} r={1.7} fill={colors.gold} />
      <Circle cx={47} cy={54.6} r={1.7} fill={colors.gold} />
      <Circle cx={54} cy={54.6} r={1.7} fill={colors.gold} />
      <Circle cx={61} cy={53.5} r={1.7} fill={colors.gold} />
      {/* Neck */}
      <Path d="M70 44C78 40 82 32 84 22L96 21C96 34 90 46 80 54Z" fill={FUR} />
      <Path d="M90 30C89 38 86 45 80 51" stroke={FUR_DEEP} strokeWidth={2} strokeLinecap="round" fill="none" />
      {/* Head */}
      <Ellipse cx={88} cy={11} rx={3.2} ry={4.6} fill={FUR_DEEP} transform="rotate(-24 88 11)" />
      <Ellipse cx={96} cy={20} rx={13} ry={10.5} fill={FUR} />
      <Ellipse cx={106} cy={25} rx={9} ry={7.4} fill={FUR_LIGHT} />
      <Path d="M110.5 21.5Q112.5 22.5 111.8 24.5" stroke={FUR_DEEP} strokeWidth={1.4} strokeLinecap="round" fill="none" />
      <CamelFace face={face} />
    </Svg>
  );
}

type CamelReaction = "happy" | "cooked" | "sad" | "zoom" | "spit" | "laugh" | "baby" | "jump";

/** Each tap plays the next one, in this order. */
export const CAMEL_REACTIONS: { kind: CamelReaction; sound: GameSoundEvent; ms: number }[] = [
  { kind: "happy", sound: "sparkle", ms: 1600 },
  // Poof! Cooked into a roast on the bone... nom nom... and poof, back again, just kidding.
  { kind: "cooked", sound: "sizzle", ms: 3200 },
  { kind: "sad", sound: "sad", ms: 2200 },
  { kind: "zoom", sound: "zoom", ms: 1700 },
  { kind: "spit", sound: "spit", ms: 1600 },
  { kind: "laugh", sound: "giggle", ms: 1800 },
  { kind: "baby", sound: "sparkle", ms: 2800 },
  { kind: "jump", sound: "camel", ms: 760 }
];

const FACE_FOR: Record<CamelReaction, CamelFaceKind> = {
  happy: "happy",
  cooked: "happy",
  sad: "sad",
  zoom: "happy",
  spit: "puff",
  laugh: "laugh",
  baby: "baby",
  jump: "calm"
};

/**
 * The path's camel: a small cartoon dromedary with a saddle cloth in the topic color. While `walking`
 * it paces back and forth over `range` px (turning round at each end, a short rest), each leg swinging
 * smoothly and the body bobbing with every footfall. A tap stops it for a little show (see
 * CAMEL_REACTIONS); then it walks on from where it stood. All motion runs on the native driver.
 */
export const Camel = memo(function Camel({
  size = 64,
  accent = colors.green,
  walking = false,
  range = 0,
  faceLeft = false,
  wrapWidth,
  home = 0,
  tappable = false,
  style,
  testID
}: CamelProps) {
  const reduceMotion = useReduceMotion();
  const { asleep } = useScene();
  const wraps = Boolean(wrapWidth && wrapWidth > size);
  const height = Math.round((size * VIEW_H) / VIEW_W);
  const travel = Math.max(0, range);
  const u = size / VIEW_W;

  // Walk state. `step` only ever grows (the legs read it modulo 1); `stride` blends stand <-> walk.
  const step = useRef(new Animated.Value(0)).current;
  const stride = useRef(new Animated.Value(0)).current;
  // Lane walk: 0..1 along `range`. Wrap walk: px from the box's left.
  const pos = useRef(new Animated.Value(wraps ? home : faceLeft ? 1 : 0)).current;
  const dir = useRef(new Animated.Value(faceLeft ? -1 : 1)).current;
  const dash = useRef(new Animated.Value(0)).current;
  const facing = useRef<1 | -1>(faceLeft ? -1 : 1);
  const posNow = useRef(wraps ? home : faceLeft ? 1 : 0);
  /** Wrap walk: heading out over the edge, or back in towards home. */
  const trip = useRef<"out" | "in">("out");
  const stepNow = useRef(0);
  const walk = useRef<{ running: boolean; current?: Animated.CompositeAnimation }>({ running: false });

  const [reaction, setReaction] = useState<CamelReaction | null>(null);
  const { value: t, play } = useOneShot();
  const next = useCycle(CAMEL_REACTIONS.length);
  const moving = walking && !reduceMotion && reaction === null && !asleep;

  const stopWalk = useCallback(() => {
    walk.current.running = false;
    walk.current.current?.stop();
    walk.current.current = undefined;
    pos.stopAnimation((value) => {
      posNow.current = value;
    });
    step.stopAnimation((value) => {
      stepNow.current = value;
    });
    Animated.timing(stride, { toValue: 0, duration: STRIDE_MS, easing: Easing.out(Easing.sin), useNativeDriver: true }).start();
  }, [pos, step, stride]);

  useEffect(() => {
    if (!moving) return undefined;
    walk.current.running = true;
    const turnRound = (rest: number) => {
      facing.current = facing.current > 0 ? -1 : 1;
      const turn = Animated.sequence([
        Animated.delay(rest - TURN_MS),
        Animated.timing(dir, { toValue: facing.current, duration: TURN_MS, easing: Easing.inOut(Easing.sin), useNativeDriver: true })
      ]);
      walk.current.current = turn;
      turn.start(({ finished }) => finished && leg());
    };
    const walkTo = (target: number, steps: number) => {
      const duration = steps * STEP_MS;
      const stepTo = stepNow.current + steps;
      const going = Animated.parallel([
        Animated.timing(pos, { toValue: target, duration, easing: Easing.linear, useNativeDriver: true }),
        Animated.timing(step, { toValue: stepTo, duration, easing: Easing.linear, useNativeDriver: true }),
        Animated.sequence([
          Animated.timing(stride, { toValue: 1, duration: STRIDE_MS, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
          Animated.delay(Math.max(0, duration - STRIDE_MS * 2)),
          Animated.timing(stride, { toValue: 0, duration: STRIDE_MS, easing: Easing.inOut(Easing.sin), useNativeDriver: true })
        ])
      ]);
      walk.current.current = going;
      going.start(({ finished }) => {
        if (!finished) return;
        posNow.current = target;
        stepNow.current = stepTo;
        leg();
      });
    };
    const leg = () => {
      if (!walk.current.running) return;
      if (wraps && wrapWidth) {
        // Off one edge, back in from the other, home, a rest, turn round, and off the other way.
        const offRight = wrapWidth + 6;
        const offLeft = -size - 6;
        const target = trip.current === "out" ? (facing.current > 0 ? offRight : offLeft) : home;
        const distance = Math.abs(target - posNow.current);
        if (distance < 0.5) {
          if (trip.current === "out") {
            const enter = facing.current > 0 ? offLeft : offRight;
            pos.setValue(enter);
            posNow.current = enter;
            trip.current = "in";
            leg();
          } else {
            trip.current = "out";
            turnRound(REST_MS * 2);
          }
          return;
        }
        // About a fifth of its length per step, whatever the screen.
        walkTo(target, Math.max(1, distance / (size * 0.2)));
        return;
      }
      const target = facing.current > 0 ? 1 : 0;
      const distance = Math.abs(target - posNow.current);
      if (distance < 0.01) {
        // At the end: rest, then turn round by squeezing through side-on.
        turnRound(REST_MS);
        return;
      }
      walkTo(target, Math.max(1, distance * STEPS));
    };
    // Make sure the camel faces the way it will walk before it sets off.
    dir.setValue(facing.current);
    leg();
    return stopWalk;
  }, [moving, pos, step, stride, dir, stopWalk, wraps, wrapWidth, home, size]);

  const anim = useMemo(() => {
    const phase = Animated.modulo(step, 1);
    const swing = phase.interpolate(sampleCurve(0, 1, 32, (s) => SWING * Math.cos(2 * Math.PI * s) - STAND_ANGLE));
    // angle = stand + stride * (swing - stand), mirrored for the legs that swing the other way.
    const angle = Animated.add(Animated.multiply(stride, swing), new Animated.Value(STAND_ANGLE));
    return {
      legs: LEGS.map((leg) => angle.interpolate({ inputRange: [-90, 90], outputRange: leg.sign > 0 ? ["-90deg", "90deg"] : ["90deg", "-90deg"] })),
      // Two soft dips per step, one for each footfall, only while walking.
      bob: Animated.multiply(stride, phase.interpolate(sampleCurve(0, 1, 32, (s) => -1.25 * (1 - Math.cos(4 * Math.PI * s))))),
      x: Animated.add(wraps ? pos : pos.interpolate({ inputRange: [0, 1], outputRange: [0, travel] }), dash)
    };
  }, [step, stride, pos, dash, travel, wraps]);

  const onTap = () => {
    // One show at a time; a tap during it just gets the grunt.
    if (reaction) {
      feedback("camel", "light");
      return;
    }
    const pick = CAMEL_REACTIONS[next()];
    feedback(pick.sound, "medium");
    stopWalk();
    setReaction(pick.kind);
    if (pick.kind === "zoom" && !reduceMotion) {
      // Run off the screen the way it faces and come back in from the other side.
      const far = (Dimensions.get("window").width + size) * facing.current;
      const half = (pick.ms * 0.46) | 0;
      const from = stepNow.current;
      Animated.parallel([
        Animated.sequence([
          Animated.timing(dash, { toValue: far, duration: half, easing: Easing.in(Easing.quad), useNativeDriver: true }),
          Animated.timing(dash, { toValue: -far, duration: 0, useNativeDriver: true }),
          Animated.timing(dash, { toValue: 0, duration: half, easing: Easing.out(Easing.quad), useNativeDriver: true })
        ]),
        Animated.timing(stride, { toValue: 1, duration: 120, useNativeDriver: true }),
        Animated.timing(step, { toValue: from + 9, duration: half * 2, easing: Easing.linear, useNativeDriver: true })
      ]).start(() => {
        stepNow.current = from + 9;
      });
    }
    play(reduceMotion ? 900 : pick.ms, () => {
      dash.setValue(0);
      setReaction(null);
    });
  };

  // Body motion for each reaction, on top of the walk.
  const fx = useMemo(() => {
    const none = { y: 0 as number | Animated.AnimatedInterpolation<number>, rotate: "0deg" as string | Animated.AnimatedInterpolation<string>, scaleY: 1 as number | Animated.AnimatedInterpolation<number>, scale: 1 as number | Animated.AnimatedInterpolation<number> };
    if (reduceMotion || !reaction) return none;
    switch (reaction) {
      case "happy":
        return { ...none, y: t.interpolate(smoothKeys([0, 0.15, 0.3, 0.45, 0.6, 1], [0, -size * 0.14, 0, -size * 0.1, 0, 0])) };
      case "sad":
        return { ...none, y: t.interpolate(smoothKeys([0, 0.15, 0.85, 1], [0, 2, 2, 0])), scaleY: t.interpolate(smoothKeys([0, 0.15, 0.85, 1], [1, 0.93, 0.93, 1])) };
      case "laugh":
        return { ...none, rotate: shake(t, 0.05, 0.9, 5, 8) };
      case "spit":
        // Leans back to puff up, then throws the head forward.
        return { ...none, rotate: t.interpolate(smoothKeys([0, 0.3, 0.38, 0.5, 1], ["0deg", "-6deg", "5deg", "0deg", "0deg"])) };
      case "baby":
        return { ...none, scale: t.interpolate(smoothKeys([0, 0.08, 0.16, 0.86, 0.94, 1], [1, 1, 0.55, 0.55, 1.05, 1])) };
      case "jump":
        // Crouch, leap, land with a squash, settle.
        return {
          ...none,
          y: t.interpolate(smoothKeys([0, 0.12, 0.4, 0.66, 0.76, 0.88, 1], [0, 2, -size * 0.36, 0, 1.5, -3, 0])),
          scaleY: t.interpolate(smoothKeys([0, 0.12, 0.3, 0.66, 0.74, 0.86, 1], [1, 0.88, 1.08, 1, 0.86, 1.03, 1])),
          rotate: t.interpolate(smoothKeys([0, 0.2, 0.45, 0.66, 1], ["0deg", "-6deg", "-12deg", "4deg", "0deg"]))
        };
      default:
        return none;
    }
  }, [reaction, reduceMotion, t, size]);

  // Lies down to sleep while the path is idle (see sceneMood.tsx), and gets up again on a touch.
  const rest = useRef(new Animated.Value(0)).current;
  const sleeping = asleep && reaction === null;
  useEffect(() => {
    const animation = Animated.timing(rest, { toValue: sleeping ? 1 : 0, duration: reduceMotion ? 0 : 700, easing: Easing.inOut(Easing.sin), useNativeDriver: true });
    animation.start();
    return () => animation.stop();
  }, [sleeping, rest, reduceMotion]);
  const legsFold = rest.interpolate({ inputRange: [0, 1], outputRange: [1, 0.4] });
  const lieDown = rest.interpolate({ inputRange: [0, 1], outputRange: [0, 22 * u] });

  const face: CamelFaceKind = reaction ? (reaction === "spit" ? "spit" : FACE_FOR[reaction]) : sleeping ? "sleep" : "calm";
  const [faceNow, setFaceNow] = useState<CamelFaceKind>("calm");
  useEffect(() => {
    // The spit puffs the cheeks first, then opens the mouth.
    if (reaction !== "spit") {
      setFaceNow(face);
      return undefined;
    }
    setFaceNow("puff");
    const timer = setTimeout(() => setFaceNow("spit"), 560);
    return () => clearTimeout(timer);
  }, [reaction, face]);

  // Where the head is, in the camel's box, whichever way it faces (for the bits that pop off it).
  const headX = facing.current > 0 ? 96 * u : size - 96 * u;
  const shows = !reduceMotion && reaction !== null;
  const landing = reaction === "jump";

  const cooked = shows && reaction === "cooked";
  // Gone in a puff of smoke (0.1) and back in another (0.86).
  const cookedHide = cooked ? t.interpolate({ inputRange: [0, 0.1, 0.13, 0.84, 0.87, 1], outputRange: [1, 1, 0, 0, 1, 1] }) : 1;

  const figure = (
    <>
      <Animated.View
        style={[
          styles.shadow,
          { width: size * 0.62, left: size * 0.16, transform: [{ scaleX: landing ? t.interpolate(smoothKeys([0, 0.4, 0.66, 1], [1, 0.55, 1, 1])) : fx.scale }] }
        ]}
      />
      {landing && !reduceMotion
        ? // Two dust puffs kicked up where the camel lands.
          ([-1, 1] as const).map((side) => (
            <Animated.View
              key={side}
              style={[
                styles.puff,
                {
                  left: size * 0.5 - 7,
                  opacity: t.interpolate({ inputRange: [0, 0.64, 0.66, 0.95, 1], outputRange: [0, 0, 1, 0, 0] }),
                  transform: [
                    { translateX: t.interpolate({ inputRange: [0, 0.66, 1], outputRange: [side * size * 0.2, side * size * 0.2, side * size * 0.48] }) },
                    { scale: t.interpolate({ inputRange: [0, 0.66, 1], outputRange: [0.6, 0.6, 1.3] }) }
                  ]
                }
              ]}
            />
          ))
        : null}
      <Animated.View
        style={{
          width: size,
          height,
          transformOrigin: "bottom",
          opacity: cookedHide,
          transform: [{ translateY: fx.y }, { scaleX: dir }, { rotate: fx.rotate }, { scaleY: fx.scaleY }, { scale: fx.scale }]
        }}
      >
        <Animated.View style={[StyleSheet.absoluteFill, { transformOrigin: "bottom", transform: [{ scaleY: legsFold }] }]}>
        {LEGS.map((leg, index) => (
          <Animated.View
            key={leg.x}
            style={[
              StyleSheet.absoluteFill,
              { transformOrigin: `${(leg.x / VIEW_W) * 100}% ${(HIP_Y / VIEW_H) * 100}%`, transform: [{ rotate: anim.legs[index] }] }
            ]}
          >
            <Leg x={leg.x} color={leg.color} />
          </Animated.View>
        ))}
        </Animated.View>
        <Animated.View style={[StyleSheet.absoluteFill, { transform: [{ translateY: Animated.add(anim.bob, lieDown) }] }]}>
          <Body accent={accent} face={faceNow} />
        </Animated.View>
        {shows && reaction === "zoom"
          ? // Speed lines behind the tail.
            [0, 1, 2].map((line) => (
              <View key={line} style={[styles.speed, { left: -size * (0.3 + line * 0.08), top: height * (0.3 + line * 0.14), width: size * 0.34 }]} />
            ))
          : null}
        {shows && reaction === "spit" ? (
          // The spit: a little drop flies out of the mouth in an arc, then a splash where it lands.
          <>
            <Floater t={t} from={0.36} to={0.72} x={110 * u} y={26 * u} rise={-height * 0.45} drift={size * 0.45} pop={false}>
              <Drop size={Math.max(5, 8 * u)} color="#8FD3FF" />
            </Floater>
            <Floater t={t} from={0.7} to={1} x={110 * u + size * 0.42} y={height * 0.8} rise={2} pop>
              <View style={[styles.splat, { width: 16 * u + 6, height: 6 * u + 3 }]} />
            </Floater>
          </>
        ) : null}
      </Animated.View>
      {shows && reaction === "happy"
        ? [0, 0.2, 0.4].map((from, index) => (
            <Floater key={from} t={t} from={from} to={from + 0.55} x={headX - 6 + (index - 1) * 10 * u} y={-4} rise={22 * u} drift={(index - 1) * 6 * u}>
              <Heart size={Math.max(9, 13 * u)} />
            </Floater>
          ))
        : null}
      {shows && reaction === "sad" ? (
        <>
          <Floater t={t} from={0} to={0.95} x={headX - 14} y={-height * 0.32} rise={0} pop>
            <View style={[styles.cloud, { width: 28, height: 12 }]} />
          </Floater>
          {[0.1, 0.3, 0.5, 0.7].map((from, index) => (
            <Floater key={from} t={t} from={from} to={from + 0.25} x={headX - 10 + (index % 2) * 10} y={-height * 0.12} rise={-14} pop={false}>
              <Drop size={4} color="#7CC2F2" />
            </Floater>
          ))}
        </>
      ) : null}
      {shows && reaction === "laugh"
        ? [0.05, 0.45].map((from, index) => (
            <Floater key={from} t={t} from={from} to={from + 0.5} x={headX - 8 + (index ? 12 : -12)} y={-6} rise={18} drift={index ? 8 : -8}>
              <Word size={Math.max(10, 13 * u)} color="#FF8A1F">HA</Word>
            </Floater>
          ))
        : null}
      {shows && reaction === "baby"
        ? [
            { x: 0.1, y: 0.2, from: 0.02 },
            { x: 0.7, y: 0.05, from: 0.06 },
            { x: 0.45, y: 0.55, from: 0.1 },
            { x: 0.2, y: 0.4, from: 0.84 },
            { x: 0.75, y: 0.35, from: 0.88 }
          ].map((spark) => (
            <Floater key={`${spark.x}-${spark.from}`} t={t} from={spark.from} to={spark.from + 0.14} x={size * spark.x} y={height * spark.y} rise={8}>
              <Sparkle size={Math.max(9, 12 * u)} />
            </Floater>
          ))
        : null}
      {cooked ? <CookedShow t={t} size={size} height={height} /> : null}
      {sleeping ? <Snooze x={headX - 4 * u} y={height * 0.15} size={Math.max(10, 16 * u)} /> : null}
    </>
  );
  const boxWidth = wraps && wrapWidth ? wrapWidth : size + travel;
  if (!tappable) {
    return (
      <View style={[{ width: boxWidth, height }, style]} pointerEvents="none" testID={testID}>
        <Animated.View style={[styles.lane, { width: size, height, transform: [{ translateX: anim.x }] }]}>{figure}</Animated.View>
      </View>
    );
  }
  // Only the camel itself takes taps, wherever it has walked to: the rest of its row stays free.
  return (
    <View style={[{ width: boxWidth, height }, style]} pointerEvents="box-none">
      <Animated.View style={[styles.lane, { width: size, height, transform: [{ translateX: anim.x }] }]} pointerEvents="box-none">
        <Pressable onPress={onTap} hitSlop={8} accessibilityRole="button" accessibilityLabel="camel" style={{ width: size, height }} testID={testID}>
          {figure}
        </Pressable>
      </Animated.View>
    </View>
  );
});

/** A cartoon roast on the bone, sizzling. */
function Roast({ width }: { width: number }) {
  return (
    <Svg width={width} height={width * 0.75} viewBox="0 0 40 30">
      <Path d="M6 22L16 15" stroke="#B9A88A" strokeWidth={6} strokeLinecap="round" />
      <Circle cx={4.2} cy={20} r={4} fill="#B9A88A" />
      <Circle cx={6.4} cy={25} r={4} fill="#B9A88A" />
      <Path d="M6 22L16 15" stroke="#FFF8EA" strokeWidth={4} strokeLinecap="round" />
      <Circle cx={4.2} cy={20} r={3} fill="#FFF8EA" />
      <Circle cx={6.4} cy={25} r={3} fill="#FFF8EA" />
      <Ellipse cx={25} cy={13} rx={14} ry={11} fill="#A34B22" />
      <Ellipse cx={25.5} cy={12} rx={11.5} ry={8.6} fill="#D9773F" />
      <Path d="M18 8.5Q22 5.5 27.5 6.5" stroke="#F4B183" strokeWidth={2.2} strokeLinecap="round" fill="none" />
      <Path d="M20 15L23 13M26 17L29 15M30 10L33 8" stroke="#A34B22" strokeWidth={1.4} strokeLinecap="round" />
    </Svg>
  );
}

/** The camel's "cooked" joke: a puff of smoke, a sizzling roast, two big bites, and poof, the camel is back. */
function CookedShow({ t, size, height }: { t: Animated.Value; size: number; height: number }) {
  const meatW = size * 0.8;
  const left = size * 0.5 - meatW / 2;
  const top = height * 0.42 - meatW * 0.375;
  return (
    <>
      <Animated.View
        pointerEvents="none"
        style={{
          position: "absolute",
          left,
          top,
          opacity: t.interpolate({ inputRange: [0, 0.1, 0.14, 0.82, 0.86, 1], outputRange: [0, 0, 1, 1, 0, 0] }),
          transformOrigin: "left",
          transform: [
            { scale: t.interpolate(smoothKeys([0, 0.1, 0.2, 0.26, 1], [0.3, 0.3, 1.15, 1, 1])) },
            // Two bites off the far end: it gets shorter each time, the bone stays.
            { scaleX: t.interpolate(smoothKeys([0, 0.5, 0.55, 0.66, 0.71, 1], [1, 1, 0.78, 0.78, 0.55, 0.55])) },
            { rotate: shake(t, 0.2, 0.45, 3, 4) }
          ]
        }}
      >
        <Roast width={meatW} />
      </Animated.View>
      {/* Steam curling up off the roast. */}
      {[0.18, 0.3, 0.42].map((from, index) => (
        <Floater key={from} t={t} from={from} to={from + 0.3} x={left + meatW * (0.4 + index * 0.2)} y={top} rise={size * 0.3} drift={(index % 2 ? 1 : -1) * size * 0.06} pop={false}>
          <View style={[styles.steam, { width: 4, height: size * 0.12 }]} />
        </Floater>
      ))}
      {[0.5, 0.66].map((from, index) => (
        <Floater key={from} t={t} from={from} to={from + 0.18} x={index ? size * 0.65 : size * 0.05} y={-height * 0.05} rise={size * 0.18}>
          <Word size={Math.max(11, size * 0.18)} color="#FF8A1F">NOM</Word>
        </Floater>
      ))}
      {/* Poof in, poof out. */}
      {[0.06, 0.82].map((from) =>
        [-1, 0, 1].map((side) => (
          <Floater key={`${from}${side}`} t={t} from={from} to={from + 0.14} x={size * (0.4 + side * 0.25)} y={height * (0.35 + Math.abs(side) * 0.1)} rise={size * 0.12} drift={side * size * 0.15}>
            <Puff size={size * 0.28} color="#EEF1F0" />
          </Floater>
        ))
      )}
      {[0.86, 0.9, 0.94].map((from, index) => (
        <Floater key={from} t={t} from={from} to={Math.min(1, from + 0.1)} x={size * (0.15 + index * 0.3)} y={height * 0.1} rise={size * 0.1}>
          <Sparkle size={Math.max(9, size * 0.14)} />
        </Floater>
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  lane: {
    position: "absolute",
    left: 0,
    top: 0
  },
  speed: {
    position: "absolute",
    height: 2.5,
    borderRadius: 2,
    backgroundColor: "rgba(31,45,39,0.25)"
  },
  splat: {
    borderRadius: 8,
    backgroundColor: "#8FD3FF",
    opacity: 0.8
  },
  cloud: {
    borderRadius: 7,
    backgroundColor: "#AEBDCB"
  },
  puff: {
    position: "absolute",
    bottom: -2,
    width: 14,
    height: 10,
    borderRadius: 6,
    backgroundColor: "#F3D598"
  },
  steam: {
    borderRadius: 2,
    backgroundColor: "rgba(255,255,255,0.85)",
    borderWidth: 0.5,
    borderColor: "rgba(31,45,39,0.12)"
  },
  shadow: {
    position: "absolute",
    bottom: 0,
    height: 7,
    borderRadius: 4,
    backgroundColor: "rgba(31,45,39,0.08)"
  }
});
