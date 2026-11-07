import React, { useRef } from "react";
import { Animated, Pressable, StyleSheet, Text, View, type StyleProp, type ViewStyle } from "react-native";
import type { GameSoundEvent } from "../services/gameSoundLibrary";
import { Icon, type IconName } from "./Icon";
import { haptic, playUi } from "./sound";
import { colors, darken, fonts, radii } from "./theme";

export type GameButtonVariant = "primary" | "secondary" | "gold" | "blue" | "danger" | "ghost" | "white";
export type GameButtonSize = "lg" | "md" | "sm";

export type GameButtonProps = {
  label: string;
  onPress?: () => void;
  variant?: GameButtonVariant;
  /** Custom face color (overrides the variant's face; lip = darken(color)). */
  color?: string;
  size?: GameButtonSize;
  icon?: IconName;
  disabled?: boolean;
  sound?: GameSoundEvent | false;
  fullWidth?: boolean;
  style?: StyleProp<ViewStyle>;
  testID?: string;
  accessibilityLabel?: string;
};

const LIP = 4;

const SIZES: Record<GameButtonSize, { height: number; font: number; padding: number; icon: number; radius: number }> = {
  lg: { height: 54, font: 17, padding: 20, icon: 24, radius: radii.button },
  md: { height: 46, font: 16, padding: 16, icon: 20, radius: radii.button },
  sm: { height: 38, font: 14, padding: 12, icon: 18, radius: 13 }
};

type Look = {
  face: string;
  lip: string;
  label: string;
  border?: string;
  /** Icon drawn as a silhouette in the label color (true) or in full color (false). */
  monoIcon: boolean;
  flat?: boolean;
};

function resolveLook(variant: GameButtonVariant, color: string | undefined, disabled: boolean | undefined): Look {
  if (disabled) {
    return { face: colors.locked, lip: colors.lockedLip, label: "#A3AFA9", monoIcon: true, flat: variant === "ghost" };
  }
  switch (variant) {
    case "secondary":
      return { face: colors.white, lip: colors.lineLip, label: color ?? colors.gem, border: colors.line, monoIcon: false };
    case "ghost":
      return { face: "transparent", lip: "transparent", label: color ?? colors.gem, monoIcon: false, flat: true };
    case "white":
      return { face: colors.white, lip: "#DCE4E0", label: color ?? colors.green, monoIcon: false };
    case "gold":
      return { face: color ?? colors.gold, lip: color ? darken(color) : colors.goldLip, label: "#6B4500", monoIcon: true };
    case "blue":
      return { face: color ?? colors.gem, lip: color ? darken(color) : colors.gemLip, label: colors.white, monoIcon: true };
    case "danger":
      return { face: color ?? colors.heart, lip: color ? darken(color) : colors.heartLip, label: colors.white, monoIcon: true };
    case "primary":
    default:
      return { face: color ?? colors.green, lip: color ? darken(color) : colors.greenLip, label: colors.white, monoIcon: true };
  }
}

/** Duolingo-style 3D button: a face sitting on a darker lip that presses down. */
export function GameButton({
  label,
  onPress,
  variant = "primary",
  color,
  size = "lg",
  icon,
  disabled,
  sound = "soft_ui",
  fullWidth,
  style,
  testID,
  accessibilityLabel
}: GameButtonProps) {
  const press = useRef(new Animated.Value(0)).current;
  const look = resolveLook(variant, color, disabled);
  const metrics = SIZES[size];
  const lip = look.flat ? 0 : LIP;

  const pressIn = () => {
    if (disabled || look.flat) {
      return;
    }
    Animated.timing(press, { toValue: 1, duration: 60, useNativeDriver: true }).start();
  };
  const pressOut = () => {
    Animated.spring(press, { toValue: 0, friction: 5, tension: 260, useNativeDriver: true }).start();
  };

  const translateY = press.interpolate({ inputRange: [0, 1], outputRange: [0, lip] });
  const ghostOpacity = press.interpolate({ inputRange: [0, 1], outputRange: [1, 0.6] });

  return (
    <Pressable
      onPress={() => {
        if (disabled) {
          return;
        }
        if (sound) {
          playUi(sound);
        }
        haptic("light");
        onPress?.();
      }}
      onPressIn={pressIn}
      onPressOut={pressOut}
      disabled={disabled}
      testID={testID}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityState={{ disabled: Boolean(disabled) }}
      style={[styles.root, { paddingBottom: lip }, fullWidth ? styles.fullWidth : null, style]}
    >
      {lip > 0 ? (
        <View
          pointerEvents="none"
          style={[styles.lip, { top: lip, backgroundColor: look.lip, borderRadius: metrics.radius }]}
        />
      ) : null}
      <Animated.View
        style={[
          styles.face,
          {
            minHeight: metrics.height,
            paddingHorizontal: metrics.padding,
            borderRadius: metrics.radius,
            backgroundColor: look.face,
            transform: [{ translateY }]
          },
          look.border ? { borderWidth: 2, borderColor: look.border } : null,
          look.flat ? { opacity: ghostOpacity } : null
        ]}
      >
        {icon ? (
          <View style={styles.icon}>
            <Icon name={icon} size={metrics.icon} color={look.monoIcon ? look.label : undefined} detailColor={look.monoIcon && icon === "date" ? look.face : undefined} />
          </View>
        ) : null}
        <Text
          numberOfLines={2}
          style={[
            styles.label,
            { color: look.label, fontSize: metrics.font, lineHeight: Math.round(metrics.font * 1.25) }
          ]}
        >
          {label.toUpperCase()}
        </Text>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: {
    position: "relative",
    maxWidth: "100%"
  },
  fullWidth: {
    alignSelf: "stretch",
    width: "100%"
  },
  lip: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0
  },
  face: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 6
  },
  icon: {
    marginEnd: 8
  },
  label: {
    fontFamily: fonts.displayHeavy,
    letterSpacing: 0.6,
    textAlign: "center",
    flexShrink: 1,
    includeFontPadding: false
  }
});
