import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { highlightFor } from "../../data/sourceHighlights";
import { t } from "../../i18n";
import { ArabicText, withHonorifics } from "../ArabicText";
import { Icon } from "../Icon";
import { colors, fonts, radii, space } from "../theme";
import { noBreakHyphens } from "./lessonText";

const ARABIC = /[؀-ۿ]/;

/** The words a source's link highlights, or the ones picked for it in sourceHighlights.json. */
export function lookForWords(source: { url?: string; highlight?: string; summary?: string } | undefined) {
  if (!source?.url) return undefined;
  const words = source.highlight ?? (source.summary ? highlightFor({ url: source.url, summary: source.summary }) : undefined);
  return words?.trim() || undefined;
}

/**
 * Under a source chip: the line the link opens on, highlighted, so the reader knows what to look for even
 * where the browser cannot highlight it. An Arabic line (the old books on Shamela) is shown with what it says
 * in English.
 */
export function LookFor({ words, summary, testID = "learn-look-for" }: { words: string; summary?: string; testID?: string }) {
  const arabic = ARABIC.test(words);
  return (
    <View style={styles.box} testID={testID}>
      <View style={styles.head}>
        <Icon name="search" size={14} color={colors.inkSoft} />
        <Text style={styles.label}>{t("On the page, look for")}</Text>
      </View>
      {arabic ? (
        <>
          <ArabicText size={17} color={colors.ink} align="right" style={styles.arabic} testID={`${testID}-arabic`}>
            {words}
          </ArabicText>
          {summary ? (
            <Text style={styles.says}>
              <Text style={styles.saysLabel}>{t("In English:")} </Text>
              {withHonorifics(noBreakHyphens(summary.trim()))}
            </Text>
          ) : null}
        </>
      ) : (
        <Text style={styles.words}>{`“${withHonorifics(noBreakHyphens(words))}”`}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    marginTop: space.sm,
    alignSelf: "stretch",
    paddingHorizontal: space.md,
    paddingVertical: space.sm,
    borderRadius: radii.md,
    borderLeftWidth: 4,
    borderLeftColor: "#F5C542",
    backgroundColor: "rgba(245, 197, 66, 0.14)"
  },
  head: { flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 4 },
  label: { fontFamily: fonts.bodyHeavy, fontSize: 12, lineHeight: 16, color: colors.inkSoft, textTransform: "uppercase" },
  words: { fontFamily: fonts.bodyBold, fontSize: 14, lineHeight: 20, color: colors.ink },
  arabic: { lineHeight: 30 },
  says: { marginTop: 4, fontFamily: fonts.bodyBold, fontSize: 13, lineHeight: 18, color: colors.inkSoft },
  saysLabel: { fontFamily: fonts.bodyHeavy, color: colors.inkSoft }
});
