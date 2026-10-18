import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { GameButton } from "../GameButton";
import { Mascot } from "../Mascot";
import { Sheet } from "../Sheet";
import { colors, space, text } from "../theme";

export type QuitSheetProps = {
  visible: boolean;
  onKeepLearning: () => void;
  onQuit: () => void;
  mascotVariant?: string;
  accent?: string;
  bottomInset?: number;
};

/** "Wait, don't go!" sheet shown when the learner taps X in a lesson. Place it last in the lesson screen. */
export function QuitSheet({ visible, onKeepLearning, onQuit, mascotVariant = "girl", accent, bottomInset }: QuitSheetProps) {
  return (
    <Sheet visible={visible} onClose={onKeepLearning} bottomInset={bottomInset} testID="quit-sheet">
      <View style={styles.body}>
        <Mascot variant={mascotVariant} mood="sad" accent={accent} size={96} />
        <Text style={styles.title} accessibilityRole="header">
          Wait, don&apos;t go!
        </Text>
        <Text style={styles.line}>You&apos;ll lose this lesson&apos;s progress.</Text>
      </View>
      <GameButton label="Keep learning" fullWidth onPress={onKeepLearning} testID="quit-keep" />
      <GameButton label="End lesson" variant="ghost" color={colors.heart} fullWidth onPress={onQuit} style={styles.ghost} testID="quit-end" />
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
