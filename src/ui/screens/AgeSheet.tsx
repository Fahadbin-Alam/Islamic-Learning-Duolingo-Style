import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import type { AgeGroup } from "../../services/monetizationConfig";
import { GameButton } from "../GameButton";
import { Sheet } from "../Sheet";
import { Tappable } from "../Tappable";
import { colors, fonts, lighten, radii, space, text } from "../theme";
import { useBackToClose } from "./sheetParts";

export type AgeSheetProps = {
  visible: boolean;
  onSave: (ageGroup: AgeGroup) => void;
};

// A neutral age screen (Google Play Families, COPPA): every band looks the same, none is picked for you,
// and nothing hints that one answer unlocks more. The answer decides which ads are allowed, and an
// under-13 sign-up takes a parent's name and email.
const OPTIONS: Array<{ id: AgeGroup; label: string; spoken: string }> = [
  { id: "6-9", label: "9 or under", spoken: "9 or under" },
  { id: "10-12", label: "10 to 12", spoken: "10 to 12" },
  { id: "13-17", label: "13 to 17", spoken: "13 to 17" },
  { id: "18+", label: "18 or older", spoken: "18 or older" }
];

export function AgeSheet({ visible, onSave }: AgeSheetProps) {
  const [selected, setSelected] = useState<AgeGroup | undefined>(undefined);
  const save = () => {
    if (selected) onSave(selected);
  };
  // Back does nothing until an age is picked: the sheet has to be answered once.
  useBackToClose(visible, save);

  return (
    <Sheet visible={visible} dismissOnBackdrop={false} testID="age-sheet">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.stack}>
        <Text style={styles.title} accessibilityRole="header">How old are you?</Text>
        <View style={styles.grid}>
          {OPTIONS.map((option) => {
            const active = option.id === selected;
            return (
              <Tappable
                key={option.id}
                onPress={() => setSelected(option.id)}
                style={[styles.tile, active && styles.tileActive]}
                accessibilityRole="radio"
                accessibilityState={{ selected: active }}
                accessibilityLabel={option.spoken}
                testID={`age-${option.id}`}
              >
                <Text style={[styles.label, active && styles.labelActive]} numberOfLines={1} adjustsFontSizeToFit>
                  {option.label}
                </Text>
              </Tappable>
            );
          })}
        </View>
        <GameButton label="Continue" fullWidth disabled={!selected} onPress={save} testID="age-save" />
      </ScrollView>
    </Sheet>
  );
}

const styles = StyleSheet.create({
  stack: {
    gap: space.md,
    paddingBottom: space.xs
  },
  title: {
    ...text.h2,
    textAlign: "center"
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: space.sm
  },
  tile: {
    flexBasis: "47%",
    flexGrow: 1,
    minWidth: 0,
    minHeight: 64,
    borderRadius: radii.tile,
    borderWidth: 2,
    borderColor: colors.line,
    borderBottomWidth: 4,
    borderBottomColor: colors.lineLip,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
    padding: space.sm
  },
  tileActive: {
    borderColor: colors.gem,
    borderBottomColor: colors.gemLip,
    backgroundColor: lighten(colors.gem, 0.86)
  },
  label: {
    fontFamily: fonts.displayHeavy,
    fontSize: 18,
    lineHeight: 26,
    color: colors.ink,
    textAlign: "center"
  },
  labelActive: {
    color: colors.gemLip
  }
});
