import React, { useEffect, useMemo, useRef, type ReactNode } from "react";
import { Animated, Easing, View } from "react-native";
import { sampleCurve, smoothKeys } from "./motion";

/**
 * The animals beside the path wander their whole row by themselves, the way the camel does: the sheep
 * trots along to a new spot, turns round to face the way it goes, stops to nibble the grass and trots on;
 * the rabbit hops across in big bunny hops and sits up to sniff; the turtle plods slowly along and tucks
 * into its shell; the crab scuttles sideways; the goat and the horse trot. Every so often one walks right
 * off the edge of the screen and comes back in from the other side, like the camel. A tap stops it and
 * it turns to face you for its tap show, then it wanders on. All on the native driver.
 */

export type RoamKind = "sheep" | "goat" | "horse" | "rabbit" | "turtle" | "crab";

export const ROAMERS: ReadonlySet<string> = new Set<RoamKind>(["sheep", "goat", "horse", "rabbit", "turtle", "crab"]);

type Gait = {
  /** px per second at size 64. */
  speed: number;
  /** One step (or hop) covers this part of the picture's width. */
  step: number;
  /** How long it stops between walks, ms (a little more is added at random). */
  rest: number;
  /** Crabs walk sideways, so they never turn round. */
  turns: boolean;
};

export const GAITS: Record<RoamKind, Gait> = {
  sheep: { speed: 30, step: 0.2, rest: 2600, turns: true },
  goat: { speed: 36, step: 0.22, rest: 2200, turns: true },
  horse: { speed: 44, step: 0.26, rest: 2400, turns: true },
  rabbit: { speed: 70, step: 0.42, rest: 2000, turns: true },
  turtle: { speed: 11, step: 0.12, rest: 3200, turns: true },
  crab: { speed: 38, step: 0.12, rest: 1800, turns: false }
};

const TURN_MS = 260;
const STRIDE_MS = 160;
/** One walk in this many goes off the edge of the screen and comes back in from the other side. */
const WRAP_EVERY = 3;
/** How long a tap holds it still for its tap show, ms. */
const PAUSE_MS = 2600;

/** A seeded 0..1 random, so each animal wanders its own way but tests stay the same every run. */
function seeded(seed: number) {
  let state = (seed * 9301 + 49297) % 233280 || 1;
  return () => {
    state = (state * 9301 + 49297) % 233280;
    return state / 233280;
  };
}

export type RoamerProps = {
  kind: RoamKind;
  size: number;
  /** The row's width, px. */
  width: number;
  /** Where the picture's box stands in the row, px from the left. */
  left: number;
  /** Wanders while true; stops where it is otherwise (asleep, off screen, reduced motion). */
  active: boolean;
  seed?: number;
  children: ReactNode;
};

export function Roamer({ kind, size, width, left, active, seed = 0, children }: RoamerProps) {
  const gait = GAITS[kind];
  const u = size / 64;
  const pos = useRef(new Animated.Value(0)).current;
  const step = useRef(new Animated.Value(0)).current;
  const stride = useRef(new Animated.Value(0)).current;
  const dir = useRef(new Animated.Value(1)).current;
  const act = useRef(new Animated.Value(0)).current;
  const state = useRef({ pos: 0, step: 0, facing: 1 as 1 | -1, trips: 0, running: false, current: undefined as Animated.CompositeAnimation | undefined, timer: undefined as ReturnType<typeof setTimeout> | undefined, random: seeded(seed + 1) });
  /** A tap pauses the walk for a moment and the animal turns to face you (set while it wanders). */
  const pause = useRef<() => void>(() => undefined);

  useEffect(() => {
    const s = state.current;
    if (!active || width <= size) return undefined;
    s.running = true;
    const minX = -left + 4;
    const maxX = width - size - left - 4;
    const offLeft = -left - size - 8;
    const offRight = width - left + 8;

    const later = (ms: number, fn: () => void) => {
      if (s.timer) clearTimeout(s.timer);
      s.timer = setTimeout(fn, ms);
    };
    const run = (animation: Animated.CompositeAnimation, done: () => void) => {
      s.current = animation;
      animation.start(({ finished }) => {
        if (finished && s.running) done();
      });
    };
    const face = (facing: 1 | -1, done: () => void) => {
      if (!gait.turns || facing === s.facing) {
        s.facing = facing;
        done();
        return;
      }
      s.facing = facing;
      run(Animated.timing(dir, { toValue: facing, duration: TURN_MS, easing: Easing.inOut(Easing.sin), useNativeDriver: true }), done);
    };
    const walkTo = (target: number, done: () => void) => {
      const distance = Math.abs(target - s.pos);
      const duration = Math.max(400, (distance / (gait.speed * u)) * 1000);
      const steps = Math.max(1, Math.round(distance / (size * gait.step)));
      const stepTo = s.step + steps;
      run(
        Animated.parallel([
          Animated.timing(pos, { toValue: target, duration, easing: Easing.linear, useNativeDriver: true }),
          Animated.timing(step, { toValue: stepTo, duration, easing: Easing.linear, useNativeDriver: true }),
          Animated.sequence([
            Animated.timing(stride, { toValue: 1, duration: STRIDE_MS, useNativeDriver: true }),
            Animated.delay(Math.max(0, duration - STRIDE_MS * 2)),
            Animated.timing(stride, { toValue: 0, duration: STRIDE_MS, useNativeDriver: true })
          ])
        ]),
        () => {
          s.pos = target;
          s.step = stepTo;
          done();
        }
      );
    };
    const rest = (done: () => void) => {
      const ms = gait.rest + s.random() * 1400;
      act.setValue(0);
      run(Animated.timing(act, { toValue: 1, duration: ms, easing: Easing.linear, useNativeDriver: true }), done);
    };
    const trip = () => {
      if (!s.running) return;
      s.trips += 1;
      if (s.trips % WRAP_EVERY === 0) {
        // Off the edge it faces, back in from the other side, on to a new spot.
        const out = s.facing > 0 ? offRight : offLeft;
        const back = s.facing > 0 ? offLeft : offRight;
        walkTo(out, () => {
          pos.setValue(back);
          s.pos = back;
          const spot = minX + (maxX - minX) * (0.2 + s.random() * 0.6);
          walkTo(spot, () => rest(trip));
        });
        return;
      }
      // A new spot at least a body length away, mostly the other way from the last walk.
      let target = minX + (maxX - minX) * s.random();
      if (Math.abs(target - s.pos) < size * 1.2) target = s.pos > (minX + maxX) / 2 ? minX + (maxX - minX) * 0.15 * s.random() : maxX - (maxX - minX) * 0.15 * s.random();
      target = Math.max(minX, Math.min(maxX, target));
      face(target >= s.pos ? 1 : -1, () => walkTo(target, () => rest(trip)));
    };
    const halt = (soft = true) => {
      if (s.timer) clearTimeout(s.timer);
      s.current?.stop();
      s.current = undefined;
      pos.stopAnimation((value) => {
        s.pos = value;
      });
      step.stopAnimation((value) => {
        s.step = value;
      });
      if (soft) {
        Animated.timing(stride, { toValue: 0, duration: STRIDE_MS, useNativeDriver: true }).start();
        Animated.timing(act, { toValue: 0, duration: STRIDE_MS, useNativeDriver: true }).start();
      } else {
        stride.setValue(0);
        act.setValue(0);
      }
    };
    pause.current = () => {
      // Stops where it is (still on screen), turns to face the learner, and wanders on after the show.
      if (s.pos < minX - 1 || s.pos > maxX + 1) return;
      halt();
      if (gait.turns && s.facing < 0) {
        s.facing = 1;
        Animated.timing(dir, { toValue: 1, duration: TURN_MS, easing: Easing.inOut(Easing.sin), useNativeDriver: true }).start();
      }
      later(PAUSE_MS, trip);
    };
    // Each animal starts on its own beat so a row of them never sets off together.
    later(400 + ((seed * 677) % 2200), () => rest(trip));
    return () => {
      s.running = false;
      pause.current = () => undefined;
      halt(false);
    };
  }, [active, width, left, size, u, gait, pos, step, stride, dir, act, seed]);

  const moves = useMemo(() => gaitMoves(kind, step, stride, act, u), [kind, step, stride, act, u]);

  return (
    <Animated.View
      pointerEvents="box-none"
      style={{ width: size, height: size, transform: [{ translateX: pos }] }}
      // A tap: stop for a moment and turn to face the learner (the tap show's words read the right way).
      onStartShouldSetResponderCapture={() => {
        pause.current();
        return false;
      }}
      testID={`roam-${kind}`}
    >
      <Animated.View pointerEvents="box-none" style={{ width: size, height: size, transformOrigin: "bottom", transform: [{ scaleX: dir }, ...(moves as never[])] }}>
        <View pointerEvents="box-none" style={{ width: size, height: size }}>
          {children}
        </View>
      </Animated.View>
    </Animated.View>
  );
}

type Moves = Record<string, Animated.AnimatedInterpolation<number | string> | Animated.AnimatedMultiplication<number>>[];

function degs(count: number, fn: (p: number) => number) {
  const curve = sampleCurve(0, 1, count, fn);
  return { ...curve, outputRange: curve.outputRange.map((value) => `${value}deg`) };
}

/** The body's moves: a bounce per step (only while walking), and what it does while it stops. */
export function gaitMoves(kind: RoamKind, step: Animated.Value, stride: Animated.Value, act: Animated.Value, u: number): Moves {
  const phase = Animated.modulo(step, 1);
  const walking = (curve: { inputRange: number[]; outputRange: number[] }) => Animated.multiply(stride, phase.interpolate(curve));
  const tilt = (amount: number) => Animated.multiply(stride, phase.interpolate(sampleCurve(0, 1, 24, (p) => amount * Math.sin(2 * Math.PI * p)))).interpolate({ inputRange: [-90, 90], outputRange: ["-90deg", "90deg"] });
  const restDeg = (keys: number[], values: number[]) => act.interpolate(smoothKeys(keys, values.map((value) => `${value}deg`)));
  const restK = (keys: number[], values: number[]) => act.interpolate(smoothKeys(keys, values));
  switch (kind) {
    case "rabbit":
      // Big bunny hops, squashing as it lands; while it sits it twitches its nose and sits up to look about.
      return [
        { translateY: walking(sampleCurve(0, 1, 24, (p) => -12 * u * Math.sin(Math.PI * p))) },
        { translateY: restK([0, 0.3, 0.38, 0.62, 0.7, 1], [0, 0, -4 * u, -4 * u, 0, 0]) },
        { scaleY: walking(sampleCurve(0, 1, 24, (p) => (p < 0.12 || p > 0.88 ? -0.1 : 0.05))).interpolate({ inputRange: [-1, 1], outputRange: [0, 2] }) },
        { rotate: walking(sampleCurve(0, 1, 24, (p) => -8 * Math.sin(2 * Math.PI * p))).interpolate({ inputRange: [-90, 90], outputRange: ["-90deg", "90deg"] }) },
        { scaleX: restK([0, 0.1, 0.13, 0.16, 0.19, 0.22, 0.75, 0.78, 0.81, 0.84, 1], [1, 1, 1.03, 1, 1.03, 1, 1, 1.03, 1, 1.03, 1]) }
      ];
    case "turtle":
      // A slow plod with a stretch each step; while it stops it tucks down into its shell and pops out.
      return [
        { translateY: walking(sampleCurve(0, 1, 24, (p) => -1.5 * u * Math.sin(Math.PI * p))) },
        { scaleX: walking(sampleCurve(0, 1, 24, (p) => 0.05 * Math.sin(2 * Math.PI * p))).interpolate({ inputRange: [-1, 1], outputRange: [0, 2] }) },
        { scaleY: restK([0, 0.3, 0.4, 0.65, 0.75, 1], [1, 1, 0.86, 0.86, 1, 1]) },
        { rotate: tilt(2) }
      ];
    case "crab":
      // A quick sideways scuttle, rocking side to side; while it stops it waves its claws.
      return [
        { translateY: walking(sampleCurve(0, 1, 24, (p) => -2 * u * Math.abs(Math.sin(2 * Math.PI * p)))) },
        { rotate: tilt(6) },
        { rotate: restDeg([0, 0.2, 0.28, 0.36, 0.44, 0.52, 1], [0, 0, -7, 7, -5, 0, 0]) }
      ];
    case "horse":
    case "goat":
    case "sheep":
    default:
      // A trot with a bob each step and a little rock; while it stops it dips its head to nibble twice.
      return [
        { translateY: walking(sampleCurve(0, 1, 24, (p) => -3.2 * u * Math.sin(Math.PI * p))) },
        { rotate: tilt(3) },
        { rotate: restDeg([0, 0.15, 0.25, 0.35, 0.45, 0.55, 0.65, 1], [0, 0, 9, 3, 9, 0, 0, 0]) }
      ];
  }
}
