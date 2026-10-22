import React, { memo, useEffect, useMemo, useRef, useState } from "react";
import { AccessibilityInfo, Animated, Easing, Pressable, StyleSheet, View, type StyleProp, type ViewStyle } from "react-native";
import Svg, { Circle, Ellipse, G, Path, Rect } from "react-native-svg";
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

// One listener for the whole app: the path draws many moving pictures and each asks for this.
let reduceMotionNow = false;
let reduceMotionRead = false;
const reduceMotionSubscribers = new Set<(value: boolean) => void>();

function watchReduceMotion() {
  if (reduceMotionRead) return;
  reduceMotionRead = true;
  const publish = (value: boolean) => {
    reduceMotionNow = Boolean(value);
    reduceMotionSubscribers.forEach((notify) => notify(reduceMotionNow));
  };
  AccessibilityInfo.isReduceMotionEnabled?.()
    .then(publish)
    .catch(() => undefined);
  AccessibilityInfo.addEventListener?.("reduceMotionChanged", publish);
}

/** True while the phone asks apps to cut motion. Starts false and updates once the setting is read. */
export function useReduceMotion() {
  const [reduce, setReduce] = useState(reduceMotionNow);
  useEffect(() => {
    watchReduceMotion();
    reduceMotionSubscribers.add(setReduce);
    setReduce(reduceMotionNow);
    return () => {
      reduceMotionSubscribers.delete(setReduce);
    };
  }, []);
  return reduce;
}

type LegPose = { backFar: number; backNear: number; frontFar: number; frontNear: number };

// Two frames, swapped every half step: diagonal pairs swing together, like a real walk.
const POSE_A: LegPose = { backFar: 14, backNear: -14, frontFar: -14, frontNear: 14 };
const POSE_B: LegPose = { backFar: -14, backNear: 14, frontFar: 14, frontNear: -14 };
const STAND: LegPose = { backFar: 4, backNear: -4, frontFar: -4, frontNear: 4 };

function Leg({ x, angle, color }: { x: number; angle: number; color: string }) {
  // A leg hangs from (x, 62) and turns about that hip; the knee is a little knob halfway down.
  return (
    <G transform={`rotate(${angle} ${x} 62)`}>
      <Rect x={x - 3.6} y={60} width={7.2} height={34} rx={3.6} fill={color} />
      <Ellipse cx={x} cy={79} rx={4.6} ry={3.4} fill={color} />
      <Ellipse cx={x + 1.2} cy={94} rx={5.6} ry={2.8} fill={darken(color, 0.12)} />
    </G>
  );
}

function Legs({ pose }: { pose: LegPose }) {
  return (
    <Svg width="100%" height="100%" viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}>
      <Leg x={38} angle={pose.backFar} color={FUR_FAR} />
      <Leg x={72} angle={pose.frontFar} color={FUR_FAR} />
      <Leg x={30} angle={pose.backNear} color={FUR_DEEP} />
      <Leg x={64} angle={pose.frontNear} color={FUR_DEEP} />
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

function legsOpacity(step: Animated.Value, frame: 0 | 1) {
  // step runs 0..STEPS over a walk; frame A shows in the first half of each step, B in the second.
  const input: number[] = [];
  const output: number[] = [];
  for (let index = 0; index < STEPS; index += 1) {
    input.push(index, index + 0.4999, index + 0.5, index + 0.9999);
    output.push(frame === 0 ? 1 : 0, frame === 0 ? 1 : 0, frame === 0 ? 0 : 1, frame === 0 ? 0 : 1);
  }
  input.push(STEPS);
  output.push(frame === 0 ? 1 : 0);
  return step.interpolate({ inputRange: input, outputRange: output, extrapolate: "clamp" });
}

/**
 * The path's camel: a small cartoon dromedary with a saddle cloth in the topic color. While `walking`
 * it paces back and forth over `range` px (turning at each end, a short rest), legs stepping and body
 * bobbing. All of it runs on the native driver, so it costs the JS thread nothing.
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
        Animated.timing(dir, { toValue: facing, duration: 0, useNativeDriver: true }),
        Animated.timing(step, { toValue: 0, duration: 0, useNativeDriver: true }),
        Animated.parallel([
          Animated.timing(step, { toValue: STEPS, duration: STEPS * STEP_MS, easing: Easing.linear, useNativeDriver: true }),
          Animated.timing(pos, { toValue: target, duration: STEPS * STEP_MS, easing: Easing.linear, useNativeDriver: true })
        ]),
        Animated.timing(step, { toValue: 0, duration: 0, useNativeDriver: true }),
        Animated.delay(REST_MS)
      ]);
    const trip = faceLeft ? [walkTo(0, -1), walkTo(1, 1)] : [walkTo(1, 1), walkTo(0, -1)];
    const loop = Animated.loop(Animated.sequence(trip));
    loop.start();
    return () => loop.stop();
  }, [moving, faceLeft, step, pos, dir]);

  const anim = useMemo(() => {
    const bobInput: number[] = [];
    const bobOutput: number[] = [];
    for (let index = 0; index <= STEPS * 2; index += 1) {
      bobInput.push(index / 2);
      bobOutput.push(index % 2 === 0 ? 0 : -2.5);
    }
    return {
      a: legsOpacity(step, 0),
      b: legsOpacity(step, 1),
      bob: step.interpolate({ inputRange: bobInput, outputRange: bobOutput, extrapolate: "clamp" }),
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
      // Crouch, leap, land with a squash, settle.
      y: jump.interpolate({ inputRange: [0, 0.12, 0.4, 0.66, 0.76, 0.88, 1], outputRange: [0, 2, -size * 0.36, 0, 1.5, -3, 0] }),
      squash: jump.interpolate({ inputRange: [0, 0.12, 0.3, 0.66, 0.74, 0.86, 1], outputRange: [1, 0.88, 1.08, 1, 0.86, 1.03, 1] }),
      spin: jump.interpolate({ inputRange: [0, 0.2, 0.45, 0.66, 1], outputRange: ["0deg", "-6deg", "-12deg", "4deg", "0deg"] }),
      shadow: jump.interpolate({ inputRange: [0, 0.4, 0.66, 1], outputRange: [1, 0.55, 1, 1] }),
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
        {still ? (
          <View style={StyleSheet.absoluteFill}>
            <Legs pose={STAND} />
          </View>
        ) : (
          <>
            <Animated.View style={[StyleSheet.absoluteFill, { opacity: anim.a }]}>
              <Legs pose={POSE_A} />
            </Animated.View>
            <Animated.View style={[StyleSheet.absoluteFill, { opacity: anim.b }]}>
              <Legs pose={POSE_B} />
            </Animated.View>
          </>
        )}
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
