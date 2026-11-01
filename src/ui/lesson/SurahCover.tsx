import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SvgXml } from "react-native-svg";
import { surahHasDrawing, surahPictureXml } from "../../data/surahPictures";
import { t } from "../../i18n";
import { ArabicText, withHonorifics } from "../ArabicText";
import { PopIn } from "../PopIn";
import { colors, fonts, radii, space, topicPalette } from "../theme";
import { noBreakHyphens } from "./lessonText";

const SHOWN_PARTS = 5;

/**
 * First thing on a surah's own lesson: a picture of what its name means (a cow for Al-Baqarah, the sun, the moon
 * and eleven stars for Yusuf), its meaning in big letters on it. A name that cannot be drawn shows its Arabic.
 */
export function SurahCover({ surah, meaning, arabicName, short }: { surah: number; meaning?: string; arabicName?: string; short?: boolean }) {
  const drawn = surahHasDrawing(surah);
  return (
    <PopIn style={[styles.wrap, short ? styles.wrapShort : null]}>
      <View style={[styles.picture, short ? styles.pictureShort : null]} testID="surah-cover" accessible accessibilityRole="image" accessibilityLabel={meaning ? t(meaning) : undefined}>
        <SvgXml xml={surahPictureXml(surah)} width="100%" height="100%" preserveAspectRatio="xMidYMid slice" />
        {!drawn && arabicName ? (
          <View style={styles.lettersBox} pointerEvents="none">
            <ArabicText size={short ? 30 : 38} weight="bold" color={colors.ink} testID="surah-cover-arabic">
              {arabicName}
            </ArabicText>
          </View>
        ) : null}
        {/* A letters card shows the name itself; the meaning is on the word card under it. */}
        {meaning && (drawn || !arabicName) ? (
          <View style={styles.meaningChip} pointerEvents="none">
            <Text style={styles.meaningText} numberOfLines={2} testID="surah-cover-meaning">
              {withHonorifics(noBreakHyphens(t(meaning)))}
            </Text>
          </View>
        ) : null}
      </View>
    </PopIn>
  );
}

/** "Inside this surah": the parts it is taught in, one per row, so the learner sees what is coming. */
export function SurahParts({ parts, accent, short }: { parts: string[]; accent: string; short?: boolean }) {
  if (!parts.length) return null;
  const palette = topicPalette(accent);
  const shown = parts.slice(0, SHOWN_PARTS);
  const more = parts.length - shown.length;
  return (
    <PopIn delay={520} from="up" style={[styles.parts, short ? styles.partsShort : null, { borderColor: palette.soft }]}>
      <View testID="surah-parts">
        <Text style={[styles.partsHead, { color: palette.ink }]} accessibilityRole="header">
          {t("Inside this surah")}
        </Text>
        {shown.map((part, index) => (
          <View key={`${index}-${part}`} style={styles.partRow}>
            <View style={[styles.partDot, { backgroundColor: palette.main }]} />
            <Text style={styles.partText}>{withHonorifics(noBreakHyphens(t(part)))}</Text>
          </View>
        ))}
        {more > 0 ? <Text style={styles.partMore}>{t("And {count} more parts", { count: more })}</Text> : null}
      </View>
    </PopIn>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignSelf: "stretch",
    marginTop: space.sm,
    marginBottom: space.xs
  },
  wrapShort: {
    marginTop: 0
  },
  picture: {
    width: "100%",
    aspectRatio: 16 / 9,
    maxHeight: 220,
    borderRadius: radii.lg,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: colors.line,
    backgroundColor: colors.mist
  },
  pictureShort: {
    maxHeight: 140
  },
  lettersBox: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center"
  },
  meaningChip: {
    position: "absolute",
    left: space.sm,
    right: space.sm,
    bottom: space.sm,
    alignItems: "center"
  },
  meaningText: {
    fontFamily: fonts.displayHeavy,
    fontSize: 18,
    lineHeight: 24,
    color: colors.white,
    textAlign: "center",
    backgroundColor: "rgba(31,45,39,0.72)",
    borderRadius: radii.sm,
    overflow: "hidden",
    paddingHorizontal: 12,
    paddingVertical: 3
  },
  parts: {
    alignSelf: "stretch",
    marginTop: space.lg,
    borderWidth: 2,
    borderRadius: radii.lg,
    backgroundColor: colors.white,
    paddingHorizontal: space.md,
    paddingVertical: space.sm
  },
  partsShort: {
    marginTop: space.sm
  },
  partsHead: {
    fontFamily: fonts.displayHeavy,
    fontSize: 15,
    lineHeight: 20,
    letterSpacing: 0.5,
    marginBottom: 2
  },
  partRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: 5
  },
  partDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 9,
    marginEnd: 10
  },
  partText: {
    flex: 1,
    fontFamily: fonts.bodyHeavy,
    fontSize: 18,
    lineHeight: 25,
    color: colors.ink
  },
  partMore: {
    fontFamily: fonts.bodyBold,
    fontSize: 14,
    lineHeight: 19,
    color: colors.inkSoft,
    marginTop: 2,
    marginStart: 18
  }
});
