import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { t } from "../../i18n";
import { ArabicText } from "../ArabicText";
import { Icon } from "../Icon";
import { Sheet } from "../Sheet";
import { Tappable } from "../Tappable";
import { colors, darken, fonts, lighten, text } from "../theme";
import { useBackToClose } from "./sheetParts";

export type MemorizeSheetRow = {
  /** "112", or "92:1-11" for part of a longer surah. */
  id: string;
  surah: number;
  /** "Surah Al-Ikhlas", in the learner's language. */
  title: string;
  /** The surah's name in Arabic, when the title is not in Arabic letters already. */
  arabic?: string;
  /** "4 ayahs", or "Ayahs 1-11" for a part. */
  line: string;
  /** The best stars so far, 0 before the first try. */
  stars: number;
};

export type MemorizeSheetProps = {
  visible: boolean;
  onClose: () => void;
  /** Al-Fatihah first, then the short surahs from An-Nas back. */
  rows: MemorizeSheetRow[];
  onStart: (id: string) => void;
  /** Gap above the sheet. Default 40. */
  topGap?: number;
  bottomInset?: number;
};

const GOLD_INK = darken(colors.gold, 0.45);

function Stars({ stars, testID }: { stars: number; testID?: string }) {
  return (
    <View style={styles.stars} testID={testID}>
      {[1, 2, 3].map((star) => (
        <Icon key={star} name="star" size={16} color={star <= stars ? colors.gold : colors.line} />
      ))}
    </View>
  );
}

/**
 * Memorize surahs: Al-Fatihah and the short surahs, each gone through ayah by ayah with the reciter. A row starts its
 * surah (or part); its stars are the best try on this phone.
 */
export function MemorizeSheet({ visible, onClose, rows, onStart, topGap = 40, bottomInset = 0 }: MemorizeSheetProps) {
  useBackToClose(visible, onClose);
  return (
    <Sheet visible={visible} onClose={onClose} bottomInset={0} style={[styles.sheet, { top: topGap, paddingBottom: 0 }]} testID="memorize-sheet">
      <View style={styles.header}>
        <Text style={styles.heading} accessibilityRole="header" numberOfLines={2}>
          {t("Memorize surahs")}
        </Text>
        <Tappable onPress={onClose} accessibilityLabel={t("Close")} testID="memorize-sheet-close" style={styles.close} hitSlop={8} pressScale={0.88}>
          <Icon name="close" size={22} color={colors.inkSoft} />
        </Tappable>
      </View>
      <ScrollView style={styles.scroll} contentContainerStyle={{ paddingBottom: 32 + bottomInset }} showsVerticalScrollIndicator={false}>
        <Text style={styles.line}>{t("Listen to the reciter, then tap each ayah that comes next.")}</Text>
        {rows.map((row) => (
          <Tappable
            key={row.id}
            onPress={() => onStart(row.id)}
            sound="node_tap"
            pressScale={0.97}
            accessibilityLabel={`${row.title}, ${row.line}${row.stars ? `, ${t("{count} of {max} stars", { count: row.stars, max: 3 })}` : ""}`}
            testID={`memorize-${row.id}`}
            style={[styles.row, row.stars >= 3 ? styles.rowDone : null]}
          >
            <View style={styles.emblem}>
              <Icon name="star8" size={46} color={row.stars ? colors.gold : lighten(colors.gold, 0.55)} />
              <Text style={styles.emblemNumber} numberOfLines={1}>
                {row.surah}
              </Text>
            </View>
            <View style={styles.rowText}>
              <Text style={styles.rowTitle} numberOfLines={2}>
                {row.title}
              </Text>
              {row.arabic ? (
                <ArabicText size={15} weight="bold" color={GOLD_INK} style={styles.rowArabic}>
                  {row.arabic}
                </ArabicText>
              ) : null}
              <Text style={styles.rowLine} numberOfLines={1}>
                {row.line}
              </Text>
            </View>
            <Stars stars={row.stars} testID={`memorize-stars-${row.id}`} />
          </Tappable>
        ))}
      </ScrollView>
    </Sheet>
  );
}

const styles = StyleSheet.create({
  sheet: {
    paddingTop: 14
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12
  },
  heading: {
    ...text.h2,
    flex: 1,
    minWidth: 0
  },
  close: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.mist
  },
  scroll: {
    flex: 1
  },
  line: {
    ...text.bodyBold,
    color: colors.inkSoft,
    marginBottom: 12
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    minHeight: 64,
    marginBottom: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 2,
    borderColor: colors.line,
    borderBottomWidth: 5,
    borderBottomColor: colors.lineLip,
    borderRadius: 18,
    backgroundColor: colors.white
  },
  rowDone: {
    borderColor: lighten(colors.gold, 0.4),
    borderBottomColor: lighten(colors.gold, 0.1),
    backgroundColor: lighten(colors.gold, 0.9)
  },
  emblem: {
    width: 46,
    height: 46,
    alignItems: "center",
    justifyContent: "center"
  },
  emblemNumber: {
    position: "absolute",
    fontFamily: fonts.displayHeavy,
    fontSize: 15,
    lineHeight: 20,
    color: GOLD_INK
  },
  rowText: {
    flex: 1,
    minWidth: 0
  },
  rowTitle: {
    fontFamily: fonts.displayHeavy,
    fontSize: 16,
    lineHeight: 20,
    color: colors.ink,
    flexShrink: 1
  },
  rowArabic: {
    alignSelf: "flex-start",
    maxWidth: "100%"
  },
  rowLine: {
    fontFamily: fonts.bodyHeavy,
    fontSize: 13,
    lineHeight: 18,
    color: colors.inkSoft
  },
  stars: {
    flexDirection: "row",
    gap: 2
  }
});
