import React, { useRef } from "react";
import {
  Animated,
  Platform,
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
  /** Also told when a press starts and ends, e.g. to squish a card around it. */
  onPressIn?: () => void;
  onPressOut?: () => void;
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
  /**
   * Catches taps only (e.g. on a card's edges, around a button that sits on it): screen readers and the keyboard skip
   * it, so the card's real buttons are each reached on their own. Give it no children: on the web it is an empty
   * presentation box (aria-hidden there would clash with the focus a click gives it).
   */
  hiddenFromAccessibility?: boolean;
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const WEB = Platform.OS === "web";

/** Pressable that plays a sound, a light haptic and springs a little when tapped. */
export function Tappable({
  children,
  onPress,
  onLongPress,
  onPressIn,
  onPressOut,
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
  accessibilityState,
  hiddenFromAccessibility
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
      onPressIn={() => {
        if (!disabled) {
          springTo(pressScale);
          onPressIn?.();
        }
      }}
      onPressOut={() => {
        springTo(1);
        onPressOut?.();
      }}
      disabled={disabled}
      hitSlop={hitSlop}
      testID={testID}
      accessible={hiddenFromAccessibility ? false : undefined}
      focusable={hiddenFromAccessibility ? false : undefined}
      tabIndex={hiddenFromAccessibility ? -1 : undefined}
      aria-hidden={(hiddenFromAccessibility && !WEB) || undefined}
      importantForAccessibility={hiddenFromAccessibility && !WEB ? "no-hide-descendants" : undefined}
      accessibilityElementsHidden={(hiddenFromAccessibility && !WEB) || undefined}
      accessibilityRole={hiddenFromAccessibility ? "none" : accessibilityRole}
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
