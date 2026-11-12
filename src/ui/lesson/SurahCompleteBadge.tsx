import React, { useEffect, useRef, useState } from "react";
import { Animated, Easing, StyleSheet, Text, View } from "react-native";
import { ArabicText } from "../ArabicText";
import { Icon } from "../Icon";
import { useReduceMotion } from "../motion";
import { ProgressBar } from "../ProgressBar";
import { formatNumber } from "../screens/FormattedCount";
import { colors, darken, fonts, lighten, radii, space } from "../theme";
import { t } from "../../i18n";

/** A surah of Memorize surahs that a practice has just made complete: every part of it practised to the end. */
export type SurahComplete = {
  surah: number;
  /** "Surah Al-Ikhlas", in the learner's language. */
  title: string;
  /** The surah's name in Arabic, when the title is not in Arabic letters already. */
  arabic?: string;
  /** The surahs complete now, this one in, out of all the surahs to memorize. */
  done: number;
  total: number;
};

const GOLD_INK = darken(colors.gold, 0.45);

/**
 * The gold badge on a practice's complete card when it finished the last part of a surah: the surah's star turns and
 * lands, "Surah complete!" with its name, and the bar of all the surahs to memorize grows by one. With less motion it
 * simply shows, the bar already full to the new count.
 */
export function SurahCompleteBadge({ surah, title, arabic, done, total, delay = 0 }: SurahComplete & { delay?: number }) {
  const reduceMotion = useReduceMotion();
  const land = useRef(new Animated.Value(reduceMotion ? 1 : 0)).current;
  const [grown, setGrown] = useState(reduceMotion);
  useEffect(() => {
    if (reduceMotion) {
      land.setValue(1);
      setGrown(true);
      return undefined;
    }
    const animation = Animated.sequence([
      Animated.delay(delay),
      Animated.timing(land, { toValue: 1, duration: 650, easing: Easing.out(Easing.back(2)), useNativeDriver: true })
    ]);
    animation.start();
    // The bar grows once the star has landed.
    const timer = setTimeout(() => setGrown(true), delay + 450);
    return () => {
      animation.stop();
      clearTimeout(timer);
    };
  }, [delay, land, reduceMotion]);
  const rotate = land.interpolate({ inputRange: [0, 1], outputRange: ["-140deg", "0deg"] });
  const scale = land.interpolate({ inputRange: [0, 1], outputRange: [0.3, 1] });
  const count = t("{count} of {total} surahs complete", { count: formatNumber(done), total: formatNumber(total) });
  return (
    <View style={styles.badge} testID="complete-surah" accessible accessibilityLabel={`${t("Surah complete!")} ${title}. ${count}`}>
      <Animated.View style={[styles.emblem, { transform: [{ rotate }, { scale }] }]}>
        <Icon name="star8" size={54} color={colors.gold} />
        <Text style={styles.emblemNumber} numberOfLines={1}>
          {surah}
        </Text>
      </Animated.View>
      <View style={styles.words}>
        <Text style={styles.eyebrow}>{t("Surah complete!")}</Text>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
        {arabic ? (
          <ArabicText size={15} weight="bold" color={GOLD_INK} style={styles.arabic}>
            {arabic}
          </ArabicText>
        ) : null}
        <ProgressBar
          progress={(grown ? done : done - 1) / Math.max(1, total)}
          color={colors.gold}
          trackColor={lighten(colors.gold, 0.55)}
          height={10}
          style={styles.bar}
          testID="complete-surah-bar"
        />
        <Text style={styles.count} testID="complete-surah-count">
          {count}
        </Text>
      </View>
      <Icon name="crown" size={26} />
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: "stretch",
    flexDirection: "row",
    alignItems: "center",
    gap: space.sm,
    marginTop: space.md,
    paddingVertical: space.sm,
    paddingHorizontal: space.sm,
    borderRadius: radii.lg,
    borderWidth: 2,
    borderColor: colors.goldLip,
    backgroundColor: lighten(colors.gold, 0.78)
  },
  emblem: {
    width: 58,
    height: 58,
    alignItems: "center",
    justifyContent: "center"
  },
  emblemNumber: {
    position: "absolute",
    fontFamily: fonts.displayHeavy,
    fontSize: 15,
    color: GOLD_INK
  },
  words: {
    flex: 1,
    minWidth: 0
  },
  eyebrow: {
    fontFamily: fonts.bodyHeavy,
    fontSize: 12,
    letterSpacing: 0.6,
    textTransform: "uppercase",
    color: GOLD_INK
  },
  title: {
    fontFamily: fonts.displayHeavy,
    fontSize: 17,
    color: colors.ink
  },
  arabic: {
    marginTop: 2
  },
  bar: {
    marginTop: space.xs
  },
  count: {
    marginTop: 4,
    fontFamily: fonts.bodyBold,
    fontSize: 13,
    color: GOLD_INK
  }
});
