import React, { memo, useEffect, useMemo, useRef } from "react";
import { Animated, Easing, Pressable, StyleSheet, View, type StyleProp, type ViewStyle } from "react-native";
import Svg, { Circle, Ellipse, G, Path, Rect } from "react-native-svg";
import { sampleCurve, smoothKeys, useReduceMotion } from "./motion";

export { useReduceMotion };
import { feedback } from "./sound";
import { colors, darken, lighten } from "./theme";

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
  /** A tap makes the camel jump with a silly grunt and a puff of dust. */
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
/** Turning round at either end, taken out of the rest. */
const TURN_MS = 260;

// Each leg swings on its own about its hip, on a smooth sine: diagonal pairs swing together, like a
// real walk. The swing grows from a stand over the first half step and settles back over the last.
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

/** How far into a full swing the legs are at `s` steps: 0 at the ends of a walk, 1 in between. */
function swingAmount(s: number) {
  return Math.min(1, s / 0.5, (STEPS - s) / 0.5);
}

function legAngle(s: number, sign: number) {
  const amount = swingAmount(s);
  return sign * (STAND_ANGLE * (1 - amount) + amount * SWING * Math.cos(2 * Math.PI * s));
}

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

function Body({ accent }: { accent: string }) {
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
      <Path d="M101 28.5Q105 31.5 109.5 28.8" stroke="#8A4B1E" strokeWidth={1.6} strokeLinecap="round" fill="none" />
      <Ellipse cx={99} cy={25.5} rx={3} ry={2} fill={CHEEK} opacity={0.65} />
      <Circle cx={96.5} cy={17} r={3.2} fill={EYE} />
      <Circle cx={97.6} cy={15.8} r={1.1} fill="#FFFFFF" />
      <Path d="M92.8 12.6Q96 10.6 99.6 12.2" stroke={EYE} strokeWidth={1.3} strokeLinecap="round" fill="none" />
    </Svg>
  );
}

/**
 * The path's camel: a small cartoon dromedary with a saddle cloth in the topic color. While `walking`
 * it paces back and forth over `range` px (turning round at each end, a short rest), each leg swinging
 * smoothly and the body bobbing with every footfall. All of it runs on the native driver, so it costs the JS thread nothing.
 */
export const Camel = memo(function Camel({
  size = 64,
  accent = colors.green,
  walking = false,
  range = 0,
  faceLeft = false,
  tappable = false,
  style,
  testID
}: CamelProps) {
  const reduceMotion = useReduceMotion();
  const moving = walking && !reduceMotion;
  const height = Math.round((size * VIEW_H) / VIEW_W);
  const travel = Math.max(0, range);
  const step = useRef(new Animated.Value(0)).current;
  const pos = useRef(new Animated.Value(faceLeft ? 1 : 0)).current;
  const dir = useRef(new Animated.Value(faceLeft ? -1 : 1)).current;

  useEffect(() => {
    step.setValue(0);
    pos.setValue(faceLeft ? 1 : 0);
    dir.setValue(faceLeft ? -1 : 1);
    if (!moving) return undefined;
    const walkTo = (target: 0 | 1, facing: 1 | -1) =>
      Animated.sequence([
        // Turn round by squeezing through side-on, instead of flipping in one frame.
        Animated.timing(dir, { toValue: facing, duration: TURN_MS, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        Animated.timing(step, { toValue: 0, duration: 0, useNativeDriver: true }),
        Animated.parallel([
          Animated.timing(step, { toValue: STEPS, duration: STEPS * STEP_MS, easing: Easing.linear, useNativeDriver: true }),
          Animated.timing(pos, { toValue: target, duration: STEPS * STEP_MS, easing: Easing.linear, useNativeDriver: true })
        ]),
        Animated.timing(step, { toValue: 0, duration: 0, useNativeDriver: true }),
        Animated.delay(REST_MS - TURN_MS)
      ]);
    const trip = faceLeft ? [walkTo(0, -1), walkTo(1, 1)] : [walkTo(1, 1), walkTo(0, -1)];
    const loop = Animated.loop(Animated.sequence(trip));
    loop.start();
    return () => loop.stop();
  }, [moving, faceLeft, step, pos, dir]);

  const anim = useMemo(() => {
    // Samples per step: enough that the straight pieces between them can't be seen.
    const samples = STEPS * 16;
    return {
      legs: LEGS.map((leg) =>
        step
          .interpolate(sampleCurve(0, STEPS, samples, (s) => legAngle(s, leg.sign)))
          .interpolate({ inputRange: [-90, 90], outputRange: ["-90deg", "90deg"] })
      ),
      // Two soft dips per step, one for each footfall, on a cosine so it never jerks.
      bob: step.interpolate(sampleCurve(0, STEPS, samples, (s) => -1.25 * swingAmount(s) * (1 - Math.cos(4 * Math.PI * s)))),
      x: pos.interpolate({ inputRange: [0, 1], outputRange: [0, travel] })
    };
  }, [step, pos, travel]);

  const jump = useRef(new Animated.Value(0)).current;
  const jumping = useRef(false);
  const onTap = () => {
    feedback("camel", "medium");
    if (reduceMotion || jumping.current) return;
    jumping.current = true;
    jump.setValue(0);
    Animated.timing(jump, { toValue: 1, duration: 760, easing: Easing.linear, useNativeDriver: true }).start(() => {
      jumping.current = false;
      jump.setValue(0);
    });
  };
  const hop = useMemo(
    () => ({
      // Crouch, leap, land with a squash, settle: eased between every key so nothing snaps.
      y: jump.interpolate(smoothKeys([0, 0.12, 0.4, 0.66, 0.76, 0.88, 1], [0, 2, -size * 0.36, 0, 1.5, -3, 0])),
      squash: jump.interpolate(smoothKeys([0, 0.12, 0.3, 0.66, 0.74, 0.86, 1], [1, 0.88, 1.08, 1, 0.86, 1.03, 1])),
      spin: jump.interpolate(smoothKeys([0, 0.2, 0.45, 0.66, 1], ["0deg", "-6deg", "-12deg", "4deg", "0deg"])),
      shadow: jump.interpolate(smoothKeys([0, 0.4, 0.66, 1], [1, 0.55, 1, 1])),
      puff: jump.interpolate({ inputRange: [0, 0.64, 0.66, 0.95, 1], outputRange: [0, 0, 1, 0, 0] }),
      puffSpread: jump.interpolate({ inputRange: [0, 0.66, 1], outputRange: [0, 0, 1] })
    }),
    [jump, size]
  );

  const still = !moving;
  const camel = (
    <>
      <Animated.View style={[styles.shadow, { width: size * 0.62, left: size * 0.16, transform: [{ translateX: anim.x }, { scaleX: hop.shadow }] }]} />
      {tappable
        ? // Two dust puffs kicked up where the camel lands.
          ([-1, 1] as const).map((side) => (
            <Animated.View
              key={side}
              pointerEvents="none"
              style={[
                styles.puff,
                {
                  left: size * 0.5 - 7,
                  opacity: hop.puff,
                  transform: [
                    { translateX: anim.x },
                    { translateX: hop.puffSpread.interpolate({ inputRange: [0, 1], outputRange: [side * size * 0.2, side * size * 0.48] }) },
                    { scale: hop.puffSpread.interpolate({ inputRange: [0, 1], outputRange: [0.6, 1.3] }) }
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
          transform: [{ translateX: anim.x }, { translateY: hop.y }, { scaleX: still ? (faceLeft ? -1 : 1) : dir }, { rotate: hop.spin }, { scaleY: hop.squash }]
        }}
      >
        {LEGS.map((leg, index) => (
          <Animated.View
            key={leg.x}
            style={[
              StyleSheet.absoluteFill,
              {
                transformOrigin: `${(leg.x / VIEW_W) * 100}% ${(HIP_Y / VIEW_H) * 100}%`,
                transform: [{ rotate: still ? `${leg.sign * STAND_ANGLE}deg` : anim.legs[index] }]
              }
            ]}
          >
            <Leg x={leg.x} color={leg.color} />
          </Animated.View>
        ))}
        <Animated.View style={[StyleSheet.absoluteFill, { transform: [{ translateY: still ? 0 : anim.bob }] }]}>
          <Body accent={accent} />
        </Animated.View>
      </Animated.View>
    </>
  );
  if (!tappable) {
    return (
      <View style={[{ width: size + travel, height }, style]} pointerEvents="none" testID={testID}>
        {camel}
      </View>
    );
  }
  return (
    <Pressable onPress={onTap} hitSlop={8} accessibilityRole="button" accessibilityLabel="camel" style={[{ width: size + travel, height }, style]} testID={testID}>
      {camel}
    </Pressable>
  );
});

const styles = StyleSheet.create({
  puff: {
    position: "absolute",
    bottom: -2,
    width: 14,
    height: 10,
    borderRadius: 6,
    backgroundColor: "#F3D598"
  },
  shadow: {
    position: "absolute",
    bottom: 0,
    height: 7,
    borderRadius: 4,
    backgroundColor: "rgba(31,45,39,0.08)"
  }
});
