import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Confetti } from "../Confetti";
import { CountUp } from "../CountUp";
import { GameButton } from "../GameButton";
import { Icon } from "../Icon";
import { PopIn } from "../PopIn";
import { Tappable } from "../Tappable";
import { colors, fonts, radii, space, text } from "../theme";
import { useBackToClose } from "./sheetParts";

export type RewardPopProps = {
  visible: boolean;
  gems: number;
  onClose: () => void;
};

/** Chest opened: confetti, the chest pops, gems count up. */
export function RewardPop({ visible, gems, onClose }: RewardPopProps) {
  useBackToClose(visible, onClose);

  if (!visible) {
    return null;
  }

  return (
    <View style={styles.popLayer} testID="reward-pop">
      <Tappable onPress={onClose} sound={false} hapticKind={false} pressScale={1} style={StyleSheet.absoluteFill} accessibilityLabel="Close">
        <View style={[StyleSheet.absoluteFill, styles.popBackdrop]} />
      </Tappable>
      <PopIn style={styles.popCard}>
        <Confetti active count={36} />
        <PopIn delay={120}>
          <Icon name="chest" size={96} />
        </PopIn>
        <Text style={styles.popTitle} accessibilityRole="header">Chest opened!</Text>
        <View style={styles.gemRow}>
          <Icon name="gem" size={34} />
          <CountUp value={gems} prefix="+" duration={800} style={styles.gemValue} />
        </View>
        <GameButton label="Collect" color={colors.gem} fullWidth onPress={onClose} sound="xp" testID="reward-collect" />
      </PopIn>
    </View>
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
    backgroundColor: colors.white,
    overflow: "hidden"
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
    color: colors.gemLip
  }
});
