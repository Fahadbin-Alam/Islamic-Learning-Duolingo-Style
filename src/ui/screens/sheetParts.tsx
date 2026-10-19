import React, { forwardRef, useEffect, useRef, useState } from "react";
import { Animated, BackHandler, Platform, StyleSheet, Text, TextInput, View, type TextInputProps } from "react-native";
import type { GameSoundEvent } from "../../services/gameSoundLibrary";
import { Icon, type IconName } from "../Icon";
import { Mascot, type MascotMood } from "../Mascot";
import { useShake } from "../PopIn";
import { feedback, type HapticKind } from "../sound";
import { SpeechBubble } from "../SpeechBubble";
import { Tappable } from "../Tappable";
import { colors, fonts, lighten, radii, space, text } from "../theme";
// Small pieces shared by the app sheets (account, settings, refill, language, notices).

/** Android back button closes the sheet instead of leaving the app. */
export function useBackToClose(visible: boolean, onClose?: () => void) {
  useEffect(() => {
    if (!visible || !onClose || Platform.OS !== "android") {
      return;
    }
    const subscription = BackHandler.addEventListener("hardwareBackPress", () => {
      onClose();
      return true;
    });
    return () => subscription.remove();
  }, [onClose, visible]);
}

/** A sheet's opening sound by its mascot's mood: sad, the wrong sound; cheer, unlock; others, the soft tap. */
export function moodSound(mood: MascotMood | undefined): GameSoundEvent {
  if (mood === "sad") return "wrong";
  if (mood === "cheer") return "unlock";
  return "soft_ui";
}

function soundHaptic(sound: GameSoundEvent): HapticKind {
  if (sound === "wrong") return "warning";
  if (sound === "soft_ui" || sound === "node_tap") return "light";
  return "success";
}

/**
 * Plays a sheet's sound (and haptic) once when it opens, and again when it shows a new message while
 * open. Every app sheet with a mascot opens this way: notices, confirms and the out-of-hearts sheet.
 */
export function useOpenSound(visible: boolean, sound: GameSoundEvent | false, message: string) {
  const played = useRef<string | undefined>(undefined);
  useEffect(() => {
    if (!visible) {
      played.current = undefined;
      return;
    }
    if (played.current === message) return;
    played.current = message;
    if (sound) feedback(sound, soundHaptic(sound));
  }, [message, sound, visible]);
}

export function MascotSays({ variant, mood, line, accent }: { variant: string; mood: MascotMood; line: string; accent?: string }) {
  return (
    <View style={styles.mascotRow}>
      <Mascot variant={variant} mood={mood} size={84} accent={accent} />
      <SpeechBubble style={styles.bubble}>{line}</SpeechBubble>
    </View>
  );
}

/** Sheet title with the round close button on the right (same as the grown-up gate). */
export function SheetTitle({ title, onClose, closeTestID }: { title: string; onClose?: () => void; closeTestID?: string }) {
  return (
    <View style={styles.titleRow}>
      {onClose ? <View style={styles.closeSpacer} /> : null}
      <Text style={styles.title} accessibilityRole="header" numberOfLines={2}>
        {title}
      </Text>
      {onClose ? (
        <Tappable onPress={onClose} style={styles.close} accessibilityLabel="Close" hitSlop={8} pressScale={0.9} testID={closeTestID}>
          <Icon name="close" size={20} color={colors.inkSoft} />
        </Tappable>
      ) : null}
    </View>
  );
}

/** On/off track whose knob springs across. */
export function SwitchTrack({ value }: { value: boolean }) {
  const knob = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    const animation = Animated.spring(knob, { toValue: value ? 1 : 0, friction: 7, tension: 140, useNativeDriver: true });
    animation.start();
    return () => animation.stop();
  }, [knob, value]);

  return (
    <View style={[styles.track, value && styles.trackOn]}>
      <Animated.View style={[styles.knob, { transform: [{ translateX: knob.interpolate({ inputRange: [0, 1], outputRange: [0, 20] }) }] }]} />
    </View>
  );
}

export function Toggle({ label, icon, value, onToggle, testID }: { label: string; icon: IconName; value: boolean; onToggle: () => void; testID: string }) {
  return (
    <Tappable
      onPress={onToggle}
      pressScale={0.98}
      style={styles.toggleRow}
      accessibilityRole="switch"
      accessibilityState={{ checked: value }}
      accessibilityLabel={label}
      testID={testID}
    >
      <Icon name={icon} size={26} />
      <Text style={styles.toggleLabel}>{label}</Text>
      <SwitchTrack value={value} />
    </Tappable>
  );
}

/** Web ignores adjustsFontSizeToFit: a longer label starts a size smaller and may wrap to two lines. */
function segmentSize(label: string) {
  return label.length > 8 ? styles.segmentTextLong : null;
}

export function SegmentButton({ label, active, onPress, testID, icon }: { label: string; active: boolean; onPress: () => void; testID: string; icon?: IconName }) {
  return (
    <Tappable
      onPress={onPress}
      style={[styles.segment, active && styles.segmentActive]}
      accessibilityRole="tab"
      accessibilityState={{ selected: active }}
      testID={testID}
    >
      {icon ? <Icon name={icon} size={24} /> : null}
      <Text style={[styles.segmentText, segmentSize(label), active && styles.segmentTextActive]} numberOfLines={2}>
        {label}
      </Text>
    </Tappable>
  );
}

export type TextFieldProps = TextInputProps & {
  /** Short red hint under the field ("Add your email"). The border turns red too. */
  error?: string;
  /** Bump to shake the field again (each failed submit). */
  shakeKey?: number;
};

/** Rounded mist input: blue border while focused, red border, shake and a short hint on error. */
export const TextField = forwardRef<TextInput, TextFieldProps>(function TextField({ error, shakeKey = 0, style, onFocus, onBlur, ...rest }, ref) {
  const [focused, setFocused] = useState(false);
  const { style: shakeStyle, shake } = useShake(6);
  const hasError = Boolean(error);

  useEffect(() => {
    if (shakeKey > 0 && hasError) shake();
  }, [hasError, shake, shakeKey]);

  return (
    <Animated.View style={shakeStyle}>
      <TextInput
        ref={ref}
        placeholderTextColor={colors.inkSoft}
        {...rest}
        onFocus={(event) => {
          setFocused(true);
          onFocus?.(event);
        }}
        onBlur={(event) => {
          setFocused(false);
          onBlur?.(event);
        }}
        style={[styles.input, focused ? styles.inputFocused : null, hasError ? styles.inputError : null, style]}
      />
      {error ? (
        <Text style={styles.fieldError} accessibilityLiveRegion="polite" testID={rest.testID ? `${rest.testID}-error` : undefined}>
          {error}
        </Text>
      ) : null}
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  mascotRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: space.sm
  },
  bubble: {
    flex: 1,
    minWidth: 0
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: space.md
  },
  title: {
    ...text.h2,
    textAlign: "center",
    flex: 1,
    minWidth: 0
  },
  closeSpacer: {
    width: 36
  },
  close: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.mist,
    alignItems: "center",
    justifyContent: "center"
  },
  segment: {
    flex: 1,
    minWidth: 0,
    minHeight: 46,
    flexDirection: "row",
    gap: space.xs,
    borderRadius: radii.button,
    borderWidth: 2,
    borderColor: colors.line,
    borderBottomWidth: 4,
    borderBottomColor: colors.lineLip,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: space.xs
  },
  segmentActive: {
    borderColor: colors.gem,
    borderBottomColor: colors.gemLip,
    backgroundColor: lighten(colors.gem, 0.86)
  },
  segmentText: {
    fontFamily: fonts.displayHeavy,
    fontSize: 16,
    lineHeight: 21,
    color: colors.inkSoft,
    textAlign: "center",
    flexShrink: 1
  },
  segmentTextLong: {
    fontSize: 14,
    lineHeight: 18
  },
  segmentTextActive: {
    color: colors.gemLip
  },
  toggleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: space.md,
    minHeight: 58
  },
  toggleLabel: {
    ...text.bodyBold,
    flex: 1,
    minWidth: 0,
    flexShrink: 1
  },
  track: {
    width: 50,
    height: 30,
    borderRadius: radii.pill,
    backgroundColor: colors.locked,
    padding: 3
  },
  trackOn: {
    backgroundColor: colors.green
  },
  knob: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.white
  },
  input: {
    minHeight: 54,
    paddingHorizontal: 16,
    borderRadius: radii.md,
    borderWidth: 2,
    borderColor: colors.line,
    backgroundColor: colors.mist,
    fontFamily: fonts.bodyBold,
    fontSize: 16,
    color: colors.ink,
    minWidth: 0,
    // The kit border shows focus; no browser focus ring.
    ...(Platform.OS === "web" ? { outlineWidth: 0 } : null)
  },
  inputFocused: {
    borderColor: colors.gem,
    backgroundColor: colors.white
  },
  inputError: {
    borderColor: colors.wrongInk
  },
  fieldError: {
    ...text.tiny,
    color: colors.wrongInk,
    marginTop: space.xs,
    marginLeft: space.xs
  }
});
