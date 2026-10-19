import React, { useRef } from "react";
import {
  Animated,
  Pressable,
  type GestureResponderEvent,
  type Insets,
  type StyleProp,
  type ViewStyle,
  type AccessibilityRole,
  type AccessibilityState
} from "react-native";
import type { GameSoundEvent } from "../services/gameSoundLibrary";
import { haptic, playUi, type HapticKind } from "./sound";

export type TappableProps = {
  children?: React.ReactNode;
  onPress?: (event: GestureResponderEvent) => void;
  onLongPress?: (event: GestureResponderEvent) => void;
  sound?: GameSoundEvent | false;
  hapticKind?: HapticKind | false;
  pressScale?: number;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  hitSlop?: number | Insets;
  testID?: string;
  accessibilityLabel?: string;
  accessibilityHint?: string;
  accessibilityRole?: AccessibilityRole;
  accessibilityState?: AccessibilityState;
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

/** Pressable that plays a sound, a light haptic and springs a little when tapped. */
export function Tappable({
  children,
  onPress,
  onLongPress,
  sound = "soft_ui",
  hapticKind = "light",
  pressScale = 0.97,
  disabled,
  style,
  hitSlop,
  testID,
  accessibilityLabel,
  accessibilityHint,
  accessibilityRole = "button",
  accessibilityState
}: TappableProps) {
  const scale = useRef(new Animated.Value(1)).current;

  const springTo = (toValue: number) =>
    Animated.spring(scale, { toValue, friction: 5, tension: 300, useNativeDriver: true }).start();

  return (
    <AnimatedPressable
      onPress={(event: GestureResponderEvent) => {
        if (disabled) {
          return;
        }
        if (sound) {
          playUi(sound);
        }
        if (hapticKind) {
          haptic(hapticKind);
        }
        onPress?.(event);
      }}
      onLongPress={onLongPress}
      onPressIn={() => !disabled && springTo(pressScale)}
      onPressOut={() => springTo(1)}
      disabled={disabled}
      hitSlop={hitSlop}
      testID={testID}
      accessibilityRole={accessibilityRole}
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
      accessibilityState={{ disabled: Boolean(disabled), ...accessibilityState }}
      // react-native-web reads the aria props, not accessibilityState, for switches and tabs.
      aria-checked={accessibilityState?.checked}
      aria-selected={accessibilityState?.selected}
      style={[style, { transform: [{ scale }] }]}
    >
      {children}
    </AnimatedPressable>
  );
}
