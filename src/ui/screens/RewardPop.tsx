import React, { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { Confetti } from "../Confetti";
import { CountUp } from "../CountUp";
import { GameButton } from "../GameButton";
import { Icon } from "../Icon";
import { PopIn } from "../PopIn";
import { Portal } from "../Portal";
import { Tappable } from "../Tappable";
import { colors, fonts, radii, space, text } from "../theme";
import { useBackToClose } from "./sheetParts";
import { t } from "../../i18n";

export type RewardPopProps = {
  visible: boolean;
  gems: number;
  onClose: () => void;
};

const LID_DELAY = 380;

/** The chest pops in shut, the lid flips open with a bounce, confetti bursts around the card and the gems count up. */
export function RewardPop({ visible, gems, onClose }: RewardPopProps) {
  useBackToClose(visible, onClose);
  const [open, setOpen] = useState(false);
  const bounce = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (!visible) {
      setOpen(false);
      return undefined;
    }
    const timer = setTimeout(() => {
      setOpen(true);
      bounce.setValue(0.8);
      Animated.spring(bounce, { toValue: 1, friction: 4, tension: 160, useNativeDriver: true }).start();
    }, LID_DELAY);
    return () => clearTimeout(timer);
  }, [bounce, visible]);

  if (!visible) {
    return null;
  }

  return (
    <Portal>
      <View style={styles.popLayer} testID="reward-pop">
        <Tappable onPress={onClose} pressScale={1} style={StyleSheet.absoluteFill} accessibilityLabel={t("Close")}>
          <View style={[StyleSheet.absoluteFill, styles.popBackdrop]} />
        </Tappable>
        {/* Behind the card, across the whole screen: the burst frames the card instead of covering the text. */}
        <Confetti active={open} count={44} />
        <PopIn style={styles.popCard}>
          <PopIn delay={120}>
            <Animated.View style={{ transform: [{ scale: bounce }] }} testID={open ? "reward-chest-open" : "reward-chest"}>
              <Icon name={open ? "chestOpen" : "chest"} size={96} />
            </Animated.View>
          </PopIn>
          <Text style={styles.popTitle} accessibilityRole="header">{t("Chest opened!")}</Text>
          <View style={styles.gemRow}>
            <Icon name="date" size={34} />
            <CountUp value={gems} prefix="+" duration={800} style={styles.gemValue} />
          </View>
          <GameButton label={t("Collect")} color={colors.date} fullWidth onPress={onClose} sound="xp" testID="reward-collect" />
        </PopIn>
      </View>
    </Portal>
  );
}

const styles = StyleSheet.create({
  popLayer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
    padding: space.xxl
  },
  popBackdrop: {
    backgroundColor: "rgba(20, 32, 27, 0.5)"
  },
  popCard: {
    width: "100%",
    maxWidth: 360,
    alignItems: "center",
    gap: space.md,
    padding: space.xxl,
    borderRadius: radii.xl,
    backgroundColor: colors.white
  },
  popTitle: {
    ...text.h2,
    textAlign: "center"
  },
  gemRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: space.sm
  },
  gemValue: {
    fontFamily: fonts.displayHeavy,
    fontSize: 34,
    lineHeight: 42,
    color: colors.dateLip
  }
});
