import React, { useEffect, useRef } from "react";
import { Animated, BackHandler, Platform, StyleSheet, Text, View } from "react-native";
import { Icon, type IconName } from "../Icon";
import { Mascot, type MascotMood } from "../Mascot";
import { SpeechBubble } from "../SpeechBubble";
import { Tappable } from "../Tappable";
import { colors, fonts, lighten, radii, space, text } from "../theme";
// Small pieces shared by the app sheets (account, settings, refill, language).

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

export function MascotSays({ variant, mood, line }: { variant: string; mood: MascotMood; line: string }) {
  return (
    <View style={styles.mascotRow}>
      <Mascot variant={variant} mood={mood} size={84} />
      <SpeechBubble style={styles.bubble}>{line}</SpeechBubble>
    </View>
  );
}

export function Toggle({ label, icon, value, onToggle, testID }: { label: string; icon: IconName; value: boolean; onToggle: () => void; testID: string }) {
  const knob = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    const animation = Animated.spring(knob, { toValue: value ? 1 : 0, friction: 7, tension: 140, useNativeDriver: true });
    animation.start();
    return () => animation.stop();
  }, [knob, value]);

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
      <View style={[styles.track, value && styles.trackOn]}>
        <Animated.View style={[styles.knob, { transform: [{ translateX: knob.interpolate({ inputRange: [0, 1], outputRange: [0, 20] }) }] }]} />
      </View>
    </Tappable>
  );
}

export function SegmentButton({ label, active, onPress, testID }: { label: string; active: boolean; onPress: () => void; testID: string }) {
  return (
    <Tappable
      onPress={onPress}
      style={[styles.segment, active && styles.segmentActive]}
      accessibilityRole="tab"
      accessibilityState={{ selected: active }}
      testID={testID}
    >
      <Text style={[styles.segmentText, active && styles.segmentTextActive]} numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.8}>
        {label}
      </Text>
    </Tappable>
  );
}

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
  segment: {
    flex: 1,
    minWidth: 0,
    minHeight: 46,
    borderRadius: radii.button,
    borderWidth: 2,
    borderColor: colors.line,
    borderBottomWidth: 4,
    borderBottomColor: colors.lineLip,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: space.sm
  },
  segmentActive: {
    borderColor: colors.gem,
    borderBottomColor: colors.gemLip,
    backgroundColor: lighten(colors.gem, 0.86)
  },
  segmentText: {
    fontFamily: fonts.displayHeavy,
    fontSize: 16,
    color: colors.inkSoft
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
  }
});
