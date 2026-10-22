import React, { useRef } from "react";
import {
  Animated,
  Platform,
  Pressable,
  type GestureResponderEvent,
  type Insets,
  type StyleProp,
  type ViewProps,
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
   * it, so the card's real buttons are each reached on their own. Give it no children. On the web it is a plain box,
   * aria-hidden and never focusable (so a click never puts focus inside something hidden), that answers the click
   * itself with the same sound, haptic and spring.
   */
  hiddenFromAccessibility?: boolean;
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
/** What react-native-web's Pressable gives a box, kept on a tap-only one: the hand cursor and no double-tap zoom. */
const WEB_PRESS_STYLE = { cursor: "pointer", touchAction: "manipulation" } as ViewStyle;

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
  const held = useRef(false);

  const springTo = (toValue: number) =>
    Animated.spring(scale, { toValue, friction: 5, tension: 300, useNativeDriver: true }).start();
  const press = (event: GestureResponderEvent) => {
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
  };
  const pressIn = () => {
    if (!disabled) {
      springTo(pressScale);
      onPressIn?.();
    }
  };
  const pressOut = () => {
    springTo(1);
    onPressOut?.();
  };

  if (hiddenFromAccessibility && Platform.OS === "web") {
    // A pressable on the web always takes a tabindex, and so focus on a click; a plain box takes neither. The click
    // is the browser's own tap, never sent after a drag or a scroll. React Native's types leave onClick out, but
    // react-native-web hands it to the box.
    const click = { onClick: press } as ViewProps;
    const release = () => {
      if (held.current) {
        held.current = false;
        pressOut();
      }
    };
    return (
      <Animated.View
        {...click}
        onPointerDown={(event) => {
          // The box keeps the pointer until it is let go, so a press at the card's very edge still lands here once
          // the card has squished out from under it.
          (event.currentTarget as unknown as Partial<Element>).setPointerCapture?.(event.nativeEvent.pointerId);
          held.current = true;
          pressIn();
        }}
        onPointerUp={release}
        onPointerCancel={release}
        onPointerLeave={release}
        aria-hidden
        testID={testID}
        style={[WEB_PRESS_STYLE, style, { transform: [{ scale }] }]}
      >
        {children}
      </Animated.View>
    );
  }

  return (
    <AnimatedPressable
      onPress={press}
      onLongPress={onLongPress}
      onPressIn={pressIn}
      onPressOut={pressOut}
      disabled={disabled}
      hitSlop={hitSlop}
      testID={testID}
      accessible={hiddenFromAccessibility ? false : undefined}
      focusable={hiddenFromAccessibility ? false : undefined}
      tabIndex={hiddenFromAccessibility ? -1 : undefined}
      aria-hidden={hiddenFromAccessibility || undefined}
      importantForAccessibility={hiddenFromAccessibility ? "no-hide-descendants" : undefined}
      accessibilityElementsHidden={hiddenFromAccessibility || undefined}
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
