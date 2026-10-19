import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { GameButton } from "../GameButton";
import { Icon } from "../Icon";
import { PopIn } from "../PopIn";
import { Sheet } from "../Sheet";
import { colors, space, text } from "../theme";
import { MascotSays, useBackToClose } from "./sheetParts";

export type RefillSheetProps = {
  visible: boolean;
  maxHearts: number;
  mascotVariant: string;
  onRefill: () => void;
  onShop: () => void;
};

/** Shown the first time a learner runs out of hearts: one free refill, then the shop. */
export function RefillSheet({ visible, maxHearts, mascotVariant, onRefill, onShop }: RefillSheetProps) {
  useBackToClose(visible, onShop);

  return (
    <Sheet visible={visible} onClose={onShop} dismissOnBackdrop={false} testID="refill-sheet">
      <View style={styles.stack}>
        <MascotSays variant={mascotVariant} mood="sad" line="Out of hearts!" />
        <View style={styles.heartRow} accessibilityLabel={`${maxHearts} hearts`}>
          {Array.from({ length: maxHearts }, (_, index) => (
            <PopIn key={index} delay={120 + index * 90}>
              <Icon name="heart" size={34} />
            </PopIn>
          ))}
        </View>
        <Text style={styles.centerLine}>Here is one free refill.</Text>
        <GameButton label="Refill hearts" color={colors.heart} fullWidth onPress={onRefill} sound="unlock" testID="refill-claim" />
        <GameButton label="Shop" variant="ghost" fullWidth onPress={onShop} testID="refill-shop" />
      </View>
    </Sheet>
  );
}

const styles = StyleSheet.create({
  stack: {
    gap: space.md,
    paddingBottom: space.xs
  },
  centerLine: {
    ...text.bodyBold,
    textAlign: "center"
  },
  heartRow: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: space.sm
  }
});
