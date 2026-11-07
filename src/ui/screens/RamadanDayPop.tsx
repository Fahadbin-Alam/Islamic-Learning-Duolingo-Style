import React, { useRef } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { IOS_APP_LIVE } from "../../services/shareApp";
import { Confetti } from "../Confetti";
import { GameButton } from "../GameButton";
import { Icon } from "../Icon";
import { PopIn } from "../PopIn";
import { Portal } from "../Portal";
import { Tappable } from "../Tappable";
import { colors, darken, fonts, lighten, radii, space, text } from "../theme";
import { formatNumber } from "./FormattedCount";
import { useBackToClose } from "./sheetParts";
import { t } from "../../i18n";

export type RamadanDayPopProps = {
  visible: boolean;
  /** Today's day of Ramadan, 1 to 30. */
  day: number;
  /** How many days this Ramadan has (29 or 30). */
  length: number;
  /** The days of this Ramadan with a lesson done, as day numbers. */
  doneDays: number[];
  streak: number;
  accent: string;
  /** Gets the card's face, to share as a picture (shareCard.native.ts). */
  onShare: (card: View | null) => void;
  onClose: () => void;
};

/**
 * The "I finished day N" card: pops up once when today's Ramadan lesson is done, with the month's days as a row
 * of moons (lit for each day learned) and a button that shares it through the phone's share menu.
 */
export function RamadanDayPop({ visible, day, length, doneDays, streak, accent, onShare, onClose }: RamadanDayPopProps) {
  useBackToClose(visible, onClose);
  const face = useRef<View>(null);
  if (!visible) {
    return null;
  }

  const done = new Set(doneDays);
  const ink = darken(accent, 0.3);

  return (
    <Portal>
      <View style={styles.layer} testID="ramadan-day-pop">
        <Tappable onPress={onClose} pressScale={1} style={StyleSheet.absoluteFill} accessibilityLabel={t("Close")}>
          <View style={[StyleSheet.absoluteFill, styles.backdrop]} />
        </Tappable>
        <Confetti active count={36} />
        <PopIn style={styles.card}>
          {/* The face is what gets shared as a picture, so it carries the app's name and where to get it. */}
          <View ref={face} collapsable={false} style={[styles.face, { backgroundColor: lighten(accent, 0.86), borderColor: lighten(accent, 0.55) }]} testID="ramadan-day-card">
            <View style={[styles.emblem, { backgroundColor: accent, borderBottomColor: darken(accent) }]}>
              <Icon name="moon" size={40} />
            </View>
            <Text style={[styles.title, { color: ink }]} accessibilityRole="header" testID="ramadan-day-title">
              {t("Day {day} of Ramadan done!", { day: formatNumber(day) })}
            </Text>
            {streak > 1 ? (
              <View style={styles.streak}>
                <Icon name="flame" size={22} />
                <Text style={styles.streakText}>{t("{count} days in a row.", { count: formatNumber(streak) })}</Text>
              </View>
            ) : null}
            <View style={styles.moons} testID="ramadan-day-moons">
              {Array.from({ length }, (_, index) => {
                const number = index + 1;
                const lit = done.has(number);
                return (
                  <View
                    key={number}
                    style={[styles.moon, lit ? { backgroundColor: accent, borderColor: darken(accent) } : null, number === day ? styles.today : null]}
                    testID={lit ? `ramadan-moon-lit-${number}` : undefined}
                  />
                );
              })}
            </View>
            <Text style={styles.brand}>Muslimo</Text>
            <Text style={styles.store}>{Platform.OS === "ios" || IOS_APP_LIVE ? t("Learn Islam daily. Free on Google Play and the App Store.") : t("Learn Islam daily. Free on Google Play.")}</Text>
          </View>
          <GameButton label={t("Share")} color={accent} fullWidth onPress={() => onShare(face.current)} testID="ramadan-day-share" />
          <GameButton label={t("Not now")} variant="ghost" fullWidth onPress={onClose} testID="ramadan-day-close" />
        </PopIn>
      </View>
    </Portal>
  );
}

const MOON = 16;

const styles = StyleSheet.create({
  layer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
    padding: space.xl
  },
  backdrop: {
    backgroundColor: "rgba(20, 32, 27, 0.5)"
  },
  card: {
    width: "100%",
    maxWidth: 360,
    alignItems: "stretch",
    gap: space.sm,
    padding: space.lg,
    borderRadius: radii.xl,
    backgroundColor: colors.white
  },
  face: {
    alignItems: "center",
    gap: space.md,
    padding: space.lg,
    marginBottom: space.sm,
    borderRadius: radii.lg,
    borderWidth: 2
  },
  emblem: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderBottomWidth: 5,
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    fontFamily: fonts.displayHeavy,
    fontSize: 22,
    lineHeight: 28,
    textAlign: "center"
  },
  streak: {
    flexDirection: "row",
    alignItems: "center",
    gap: space.xs
  },
  streakText: {
    ...text.small,
    fontFamily: fonts.displayHeavy,
    color: darken(colors.flame, 0.25)
  },
  moons: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 6,
    maxWidth: 10 * (MOON + 6)
  },
  moon: {
    width: MOON,
    height: MOON,
    borderRadius: MOON / 2,
    borderWidth: 2,
    borderColor: colors.line,
    backgroundColor: colors.white
  },
  today: {
    transform: [{ scale: 1.25 }]
  },
  brand: {
    fontFamily: fonts.displayHeavy,
    fontSize: 18,
    lineHeight: 22,
    letterSpacing: 1,
    color: colors.ink
  },
  store: {
    ...text.tiny,
    textAlign: "center",
    marginTop: -space.sm
  }
});
