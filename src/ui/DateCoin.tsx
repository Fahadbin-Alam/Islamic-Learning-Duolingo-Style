import React, { useEffect, useRef } from "react";
import { Animated, Easing } from "react-native";
import { Icon } from "./Icon";
import { smoothKeys, useReduceMotion } from "./motion";

export type DateCoinProps = {
  size?: number;
  /** Change it (a new count, a tap) and the date hops, wiggles and lands with a little squish. */
  playKey?: unknown;
  /** Also give a small hop every few seconds on its own, so the top bar's date feels alive. Default false. */
  idle?: boolean;
  /** Play the hop as it first appears too. Default false. */
  playOnMount?: boolean;
  /** Silhouette color, as on Icon (a white date on a button). */
  color?: string;
  testID?: string;
};

const HOP_MS = 720;
const IDLE_EVERY_MS = 7000;

/** The app's coin: a date that hops and wiggles when it is earned, spent or tapped. Native driver only. */
export function DateCoin({ size = 26, playKey, idle = false, playOnMount = false, color, testID }: DateCoinProps) {
  const reduceMotion = useReduceMotion();
  const hop = useRef(new Animated.Value(1)).current;
  const first = useRef(true);

  const play = () => {
    if (reduceMotion) return;
    hop.stopAnimation();
    hop.setValue(0);
    Animated.timing(hop, { toValue: 1, duration: HOP_MS, easing: Easing.linear, useNativeDriver: true }).start();
  };

  useEffect(() => {
    if (first.current) {
      first.current = false;
      if (!playOnMount) return;
    }
    play();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playKey]);

  useEffect(() => {
    if (!idle || reduceMotion) return;
    const timer = setInterval(play, IDLE_EVERY_MS);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idle, reduceMotion]);

  const lift = size * 0.3;
  const style = {
    transform: [
      { translateY: hop.interpolate(smoothKeys([0, 0.3, 0.55, 0.75, 1], [0, -lift, 0, -lift * 0.25, 0])) },
      { rotate: hop.interpolate(smoothKeys([0, 0.2, 0.45, 0.7, 1], ["0deg", "-16deg", "12deg", "-5deg", "0deg"])) },
      { scaleX: hop.interpolate(smoothKeys([0, 0.5, 0.6, 0.78, 1], [1, 0.94, 1.14, 0.98, 1])) },
      { scaleY: hop.interpolate(smoothKeys([0, 0.5, 0.6, 0.78, 1], [1, 1.08, 0.84, 1.03, 1])) }
    ]
  };

  return (
    <Animated.View style={style} testID={testID}>
      <Icon name="date" size={size} color={color} />
    </Animated.View>
  );
}
