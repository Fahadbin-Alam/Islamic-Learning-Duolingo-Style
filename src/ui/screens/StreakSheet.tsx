import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { GameButton } from "../GameButton";
import { Icon } from "../Icon";
import { PopIn } from "../PopIn";
import { Sheet } from "../Sheet";
import { colors, darken, fonts, lighten, space, text } from "../theme";
import { formatNumber } from "./FormattedCount";
import { useBackToClose } from "./sheetParts";
import { t } from "../../i18n";

export type StreakSheetProps = {
  visible: boolean;
  streakDays: number;
  onClose: () => void;
};

/** Flame orange a step darker, so the title reads well on white. */
const FLAME_INK = darken(colors.flame, 0.25);

/** The top-bar flame's sheet: the streak and, in a few words, how to keep it. */
export function StreakSheet({ visible, streakDays, onClose }: StreakSheetProps) {
  useBackToClose(visible, onClose);
  const lit = streakDays > 0;

  return (
    <Sheet visible={visible} onClose={onClose} testID="streak-sheet">
      <View style={styles.stack}>
        <PopIn key={visible ? "open" : "closed"} delay={80} style={[styles.flame, { backgroundColor: lit ? lighten(colors.flame, 0.82) : colors.mist }]}>
          <Icon name="flame" size={64} color={lit ? undefined : colors.lockedLip} />
        </PopIn>
        <Text style={[styles.title, { color: lit ? FLAME_INK : colors.inkSoft }]} accessibilityRole="header" testID="streak-title">
          {lit ? t("{count} day streak!", { count: formatNumber(streakDays) }) : t("No streak yet")}
        </Text>
        <Text style={styles.line} testID="streak-line">
          {lit ? t("Finish a lesson each day to keep it!") : t("Finish a lesson today to start one!")}
        </Text>
        <GameButton label={t("Got it")} fullWidth onPress={onClose} testID="streak-close" />
      </View>
    </Sheet>
  );
}

const styles = StyleSheet.create({
  stack: {
    alignItems: "center",
    gap: space.md,
    paddingBottom: space.xs
  },
  flame: {
    width: 96,
    height: 96,
    borderRadius: 48,
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    fontFamily: fonts.displayHeavy,
    fontSize: 26,
    lineHeight: 32,
    textAlign: "center"
  },
  line: {
    ...text.bodyBold,
    textAlign: "center"
  }
});
