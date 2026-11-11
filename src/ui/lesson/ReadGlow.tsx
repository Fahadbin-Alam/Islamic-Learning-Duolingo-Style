import React, { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { Animated, Easing, StyleSheet, View, type StyleProp, type ViewStyle } from "react-native";
import { useReduceMotion } from "../motion";
import { colors } from "../theme";

/**
 * The key of the part the teacher is reading aloud right now ("question", "answer-b", "line"...; see useReadAloud's
 * `lit`), given by the page or game that holds the voice. Undefined when nothing is being read.
 */
export const ReadingContext = createContext<string | undefined>(undefined);

const FADE_IN = 180;
const FADE_OUT = 300;
/** The glow breathes while its part is said: this dim at its lowest, this long each way. */
const BREATH_LOW = 0.62;
const BREATH_MS = 650;
const RING = "rgba(255, 194, 26, 0.95)";
const TINT = "rgba(255, 214, 77, 0.2)";

/**
 * A soft gold glow round the part the teacher is saying (the question, then each answer as it is said), so a child who
 * cannot read well yet follows along. It sits behind the part, a little outside its edges: nothing moves to make room,
 * and a tap still reaches the part. `part` is the key it lights for (read from ReadingContext); `lit` sets it directly.
 * Nothing is drawn while it is dark.
 */
export function ReadRing({ part, lit, radius = 16, inset = 5 }: { part?: string; lit?: boolean; radius?: number; inset?: number }) {
  const reading = useContext(ReadingContext);
  const on = lit ?? (part !== undefined && reading === part);
  const [shown, setShown] = useState(on);
  if (on && !shown) setShown(true);
  return shown ? <Glow on={on} name={part ?? "on"} radius={radius} inset={inset} onGone={() => setShown(false)} /> : null;
}

function Glow({ on, name, radius, inset, onGone }: { on: boolean; name: string; radius: number; inset: number; onGone: () => void }) {
  const reduce = useReduceMotion();
  const glow = useRef(new Animated.Value(reduce ? 1 : 0)).current;
  const gone = useRef(onGone);
  gone.current = onGone;
  useEffect(() => {
    if (reduce) {
      glow.setValue(on ? 1 : 0);
      if (!on) gone.current();
      return undefined;
    }
    // In, then a slow breath while the part is said, so the eye finds it; out when the voice moves on.
    const fade = on
      ? Animated.sequence([
          Animated.timing(glow, { toValue: 1, duration: FADE_IN, useNativeDriver: true }),
          Animated.loop(
            Animated.sequence([
              Animated.timing(glow, { toValue: BREATH_LOW, duration: BREATH_MS, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
              Animated.timing(glow, { toValue: 1, duration: BREATH_MS, easing: Easing.inOut(Easing.sin), useNativeDriver: true })
            ])
          )
        ])
      : Animated.timing(glow, { toValue: 0, duration: FADE_OUT, useNativeDriver: true });
    fade.start(({ finished }) => {
      if (finished && !on) gone.current();
    });
    return () => fade.stop();
  }, [glow, on, reduce]);
  return (
    <Animated.View
      pointerEvents="none"
      testID={on ? `read-glow-${name}` : undefined}
      style={[
        styles.glow,
        {
          top: -inset,
          left: -inset,
          right: -inset,
          bottom: -inset,
          borderRadius: radius + inset,
          opacity: glow,
          transform: [{ scale: glow.interpolate({ inputRange: [0, 1], outputRange: [0.97, 1] }) }]
        }
      ]}
    />
  );
}

/** A block of a lesson page (its line, a fact, the quote) that glows while the teacher reads it (see ReadRing). */
export function ReadGlow({ part, radius, children, style }: { part: string; radius?: number; children: ReactNode; style?: StyleProp<ViewStyle> }) {
  return (
    <View style={style}>
      <ReadRing part={part} radius={radius} />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  glow: {
    position: "absolute",
    backgroundColor: TINT,
    borderWidth: 2.5,
    borderColor: RING,
    shadowColor: colors.gold,
    shadowOpacity: 0.45,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 0 }
  }
});
