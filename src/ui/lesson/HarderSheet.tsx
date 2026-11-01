import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { GameButton } from "../GameButton";
import { Mascot } from "../Mascot";
import { Sheet } from "../Sheet";
import { colors, space, text } from "../theme";
import { t } from "../../i18n";

export type HarderSheetProps = {
  visible: boolean;
  /** How many the learner got right in a row. */
  inARow: number;
  onHarder: () => void;
  onKeep: () => void;
  mascotVariant?: string;
  accent?: string;
};

/**
 * "Want it harder?": after a few right first time in a row, the lesson asks. YES adds harder questions now and
 * makes the next lessons a step harder; NO keeps the lesson as it is (and the lesson does not ask again).
 */
export function HarderSheet({ visible, inARow, onHarder, onKeep, mascotVariant = "girl", accent }: HarderSheetProps) {
  return (
    <Sheet visible={visible} onClose={onKeep} testID="harder-sheet">
      <View style={styles.body}>
        <Mascot variant={mascotVariant} mood="cheer" accent={accent} size={96} />
        <Text style={styles.streak}>{t("{count} right in a row!", { count: inARow })}</Text>
        <Text style={styles.title} accessibilityRole="header">
          {t("Want it harder?")}
        </Text>
        <Text style={styles.line}>{t("Tougher questions from now on. You can change it in Settings.")}</Text>
      </View>
      <GameButton label={t("Yes, make it harder")} color={accent} fullWidth onPress={onHarder} testID="harder-yes" />
      <GameButton label={t("Keep it as it is")} variant="ghost" color={colors.inkSoft} fullWidth onPress={onKeep} style={styles.ghost} testID="harder-no" />
    </Sheet>
  );
}

const styles = StyleSheet.create({
  body: {
    alignItems: "center",
    marginBottom: space.xl
  },
  streak: {
    ...text.small,
    fontFamily: text.bodyBold.fontFamily,
    color: colors.flame,
    textAlign: "center",
    marginTop: space.sm
  },
  title: {
    ...text.h2,
    textAlign: "center",
    marginTop: space.xs,
    flexShrink: 1
  },
  line: {
    ...text.small,
    fontFamily: text.bodyBold.fontFamily,
    textAlign: "center",
    marginTop: space.xs,
    flexShrink: 1
  },
  ghost: {
    marginTop: space.xs
  }
});
