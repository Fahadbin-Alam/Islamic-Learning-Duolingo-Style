/**
 * Keyframe helpers for Animated.interpolate. A plain interpolate moves in straight lines between its
 * keys, so a hop or a swing turns sharp corners at every key and reads as choppy on a phone. These
 * add eased in-between samples so the motion slows into and out of each key, while still running on
 * the native driver.
 */

import { useEffect, useState } from "react";
import { AccessibilityInfo } from "react-native";

type Key = number | string;

/** Cosine ease-in-out between 0 and 1. */
function ease(t: number) {
  return (1 - Math.cos(Math.PI * t)) / 2;
}

function split(value: Key): { num: number; unit: string } {
  if (typeof value === "number") return { num: value, unit: "" };
  const match = /^(-?[\d.]+)(.*)$/.exec(value);
  return match ? { num: Number(match[1]), unit: match[2] } : { num: 0, unit: "" };
}

/**
 * Turns keyframes into an interpolate config that eases into and out of every key.
 * `outputRange` may be numbers or strings like "8deg" (one unit for all keys).
 */
export function smoothKeys<T extends Key>(inputRange: number[], outputRange: T[], samples = 8) {
  const parts = outputRange.map(split);
  const unit = parts.find((part) => part.unit)?.unit ?? "";
  const asString = typeof outputRange[0] === "string";
  const input: number[] = [inputRange[0]];
  const output: Key[] = [outputRange[0]];
  for (let index = 1; index < inputRange.length; index += 1) {
    const from = inputRange[index - 1];
    const to = inputRange[index];
    const a = parts[index - 1].num;
    const b = parts[index].num;
    for (let sample = 1; sample <= samples; sample += 1) {
      const t = sample / samples;
      const value = a + (b - a) * ease(t);
      input.push(from + (to - from) * t);
      output.push(asString ? `${Number(value.toFixed(3))}${unit}` : value);
    }
  }
  return { inputRange: input, outputRange: output as T[], extrapolate: "clamp" as const };
}

/**
 * Samples `fn` over [from, to] for an interpolate config, e.g. a sine swing over a walk. Enough
 * samples make the straight pieces between them too short to see.
 */
export function sampleCurve(from: number, to: number, count: number, fn: (x: number) => number) {
  const inputRange: number[] = [];
  const outputRange: number[] = [];
  for (let index = 0; index <= count; index += 1) {
    const x = from + ((to - from) * index) / count;
    inputRange.push(x);
    outputRange.push(Number(fn(x).toFixed(4)));
  }
  return { inputRange, outputRange, extrapolate: "clamp" as const };
}

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
