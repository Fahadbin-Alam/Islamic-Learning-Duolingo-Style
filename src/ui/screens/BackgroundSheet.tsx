import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import type { LearnerBackground } from "../../data/introToIslam";
import { GameButton } from "../GameButton";
import { Icon, type IconName } from "../Icon";
import { Sheet } from "../Sheet";
import { Tappable } from "../Tappable";
import { colors, fonts, lighten, radii, space, text } from "../theme";
import { useBackToClose } from "./sheetParts";
import { t } from "../../i18n";

export type BackgroundSheetProps = {
  visible: boolean;
  onSave: (background: LearnerBackground) => void;
};

// Asked once, on a first launch, after the language and the age: who the learner is, so someone who is not Muslim
// (or is new to Islam) starts on the beginner path instead of the Muslim one. Nothing is picked for them.
const OPTIONS: Array<{ id: LearnerBackground; label: string; icon: IconName }> = [
  { id: "muslim", label: "I'm Muslim", icon: "mosque" },
  { id: "new_muslim", label: "I'm new to Islam", icon: "sparkle" },
  { id: "christian", label: "I'm Christian", icon: "bookOpen" },
  { id: "jewish", label: "I'm Jewish", icon: "scroll" },
  { id: "curious", label: "I'm just curious", icon: "search" }
];

export function BackgroundSheet({ visible, onSave }: BackgroundSheetProps) {
  const [selected, setSelected] = useState<LearnerBackground | undefined>(undefined);
  const save = () => {
    if (selected) onSave(selected);
  };
  // Back does nothing until an answer is picked: the sheet has to be answered once.
  useBackToClose(visible, save);

  return (
    <Sheet visible={visible} dismissOnBackdrop={false} style={styles.tallPanel} testID="background-sheet">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.stack}>
        <Text style={styles.title} accessibilityRole="header">{t("Tell us about you")}</Text>
        <Text style={styles.line}>{t("We'll start you in the right place.")}</Text>
        <View style={styles.list}>
          {OPTIONS.map((option) => {
            const active = option.id === selected;
            return (
              <Tappable
                key={option.id}
                onPress={() => setSelected(option.id)}
                style={[styles.tile, active && styles.tileActive]}
                accessibilityRole="radio"
                accessibilityState={{ selected: active }}
                accessibilityLabel={t(option.label)}
                testID={`background-${option.id}`}
              >
                <Icon name={option.icon} size={24} color={active ? colors.gemLip : colors.inkSoft} />
                <Text style={[styles.label, active && styles.labelActive]} numberOfLines={2}>
                  {t(option.label)}
                </Text>
              </Tappable>
            );
          })}
        </View>
        <GameButton label={t("Continue")} fullWidth disabled={!selected} onPress={save} testID="background-save" />
      </ScrollView>
    </Sheet>
  );
}

const styles = StyleSheet.create({
  tallPanel: {
    maxHeight: "92%"
  },
  stack: {
    gap: space.md,
    paddingBottom: space.xs
  },
  title: {
    ...text.h2,
    textAlign: "center"
  },
  line: {
    ...text.body,
    color: colors.inkSoft,
    textAlign: "center"
  },
  list: {
    gap: space.sm
  },
  tile: {
    flexDirection: "row",
    alignItems: "center",
    gap: space.sm,
    minHeight: 56,
    borderRadius: radii.tile,
    borderWidth: 2,
    borderColor: colors.line,
    borderBottomWidth: 4,
    borderBottomColor: colors.lineLip,
    backgroundColor: colors.white,
    paddingHorizontal: space.md,
    paddingVertical: space.sm
  },
  tileActive: {
    borderColor: colors.gem,
    borderBottomColor: colors.gemLip,
    backgroundColor: lighten(colors.gem, 0.86)
  },
  label: {
    fontFamily: fonts.displayHeavy,
    fontSize: 18,
    lineHeight: 24,
    color: colors.ink,
    flexShrink: 1
  },
  labelActive: {
    color: colors.gemLip
  }
});
