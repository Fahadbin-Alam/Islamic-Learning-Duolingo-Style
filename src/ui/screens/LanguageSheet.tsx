import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { GameButton } from "../GameButton";
import { Sheet } from "../Sheet";
import { Tappable } from "../Tappable";
import { colors, fonts, lighten, radii, space, text } from "../theme";
import { useBackToClose } from "./sheetParts";

export type LanguageSheetProps = {
  visible: boolean;
  options: Array<{ id: string; code: string; nativeLabel: string; label: string }>;
  selected: string;
  canClose: boolean;
  onSelect: (id: string) => void;
  onSave: () => void;
  onClose: () => void;
};

/** Web ignores adjustsFontSizeToFit: a long name starts a size smaller (a tile is about 120 px wide at 320). */
function nativeSize(label: string) {
  return label.length > 9 ? styles.languageNativeLong : null;
}

export function LanguageSheet({ visible, options, selected, canClose, onSelect, onSave, onClose }: LanguageSheetProps) {
  useBackToClose(visible, canClose ? onClose : onSave);

  return (
    <Sheet visible={visible} onClose={canClose ? onClose : undefined} dismissOnBackdrop={canClose} style={styles.tallPanel} testID="language-sheet">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.stack}>
        <Text style={styles.title} accessibilityRole="header">Language</Text>
        <View style={styles.languageGrid}>
          {options.map((option) => {
            const active = option.id === selected;
            return (
              <Tappable
                key={option.id}
                onPress={() => onSelect(option.id)}
                style={[styles.languageTile, active && styles.languageTileActive]}
                accessibilityRole="radio"
                accessibilityState={{ selected: active }}
                accessibilityLabel={option.label}
                testID={`language-${option.id}`}
              >
                <Text style={[styles.languageNative, nativeSize(option.nativeLabel), active && styles.languageNativeActive]} numberOfLines={2}>
                  {option.nativeLabel}
                </Text>
                <Text style={styles.languageLabel} numberOfLines={1}>{option.label}</Text>
              </Tappable>
            );
          })}
        </View>
        <GameButton label="Save" fullWidth onPress={onSave} testID="language-save" />
        {canClose ? <GameButton label="Later" variant="ghost" fullWidth onPress={onClose} testID="language-later" /> : null}
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
  languageGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: space.sm
  },
  languageTile: {
    flexBasis: "47%",
    flexGrow: 1,
    minWidth: 0,
    minHeight: 72,
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
  languageTileActive: {
    borderColor: colors.gem,
    borderBottomColor: colors.gemLip,
    backgroundColor: lighten(colors.gem, 0.86)
  },
  languageNative: {
    fontFamily: fonts.displayHeavy,
    fontSize: 20,
    lineHeight: 28,
    color: colors.ink,
    textAlign: "center",
    flexShrink: 1
  },
  languageNativeLong: {
    fontSize: 16,
    lineHeight: 22
  },
  languageNativeActive: {
    color: colors.gemLip
  },
  languageLabel: {
    ...text.tiny
  }
});
