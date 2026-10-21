import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { GameButton } from "../GameButton";
import { Mascot } from "../Mascot";
import { Sheet } from "../Sheet";
import { colors, space, text } from "../theme";
import { t } from "../../i18n";

export type QuitSheetProps = {
  visible: boolean;
  onKeepLearning: () => void;
  onQuit: () => void;
  mascotVariant?: string;
  accent?: string;
  bottomInset?: number;
  /** The heading. Default the lesson's "Wait, don't go!". */
  title?: string;
  /** The line under it, saying what quitting does. Default the lesson's "You'll lose this lesson's progress.". */
  line?: string;
  /** The stay button. Default "Keep learning". */
  keepLabel?: string;
  /** The quit button. Default "End lesson". */
  quitLabel?: string;
};

/** "Wait, don't go!" sheet shown when the learner taps X in a lesson. Place it last in the lesson screen. */
export function QuitSheet({
  visible,
  onKeepLearning,
  onQuit,
  mascotVariant = "girl",
  accent,
  bottomInset,
  title = t("Wait, don't go!"),
  line = t("You'll lose this lesson's progress."),
  keepLabel = t("Keep learning"),
  quitLabel = t("End lesson")
}: QuitSheetProps) {
  return (
    <Sheet visible={visible} onClose={onKeepLearning} bottomInset={bottomInset} testID="quit-sheet">
      <View style={styles.body}>
        <Mascot variant={mascotVariant} mood="sad" accent={accent} size={96} />
        <Text style={styles.title} accessibilityRole="header">
          {title}
        </Text>
        <Text style={styles.line}>{line}</Text>
      </View>
      <GameButton label={keepLabel} fullWidth onPress={onKeepLearning} testID="quit-keep" />
      <GameButton label={quitLabel} variant="ghost" color={colors.heart} fullWidth onPress={onQuit} style={styles.ghost} testID="quit-end" />
    </Sheet>
  );
}

const styles = StyleSheet.create({
  body: {
    alignItems: "center",
    marginBottom: space.xl
  },
  title: {
    ...text.h2,
    textAlign: "center",
    marginTop: space.sm,
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
