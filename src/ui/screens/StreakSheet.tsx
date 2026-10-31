import React from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { GameButton } from "../GameButton";
import { Icon } from "../Icon";
import { PopIn, useShake } from "../PopIn";
import { Sheet } from "../Sheet";
import { feedback } from "../sound";
import { colors, darken, fonts, lighten, radii, space, text } from "../theme";
import { formatNumber } from "./FormattedCount";
import { useBackToClose } from "./sheetParts";
import { MAX_STREAK_FREEZES, STREAK_FREEZE_PRICE } from "../../services/streakFreeze";
import { t } from "../../i18n";

export type StreakSheetProps = {
  visible: boolean;
  streakDays: number;
  /** Streak freezes owned. Leave out to hide the freeze card. */
  freezes?: number;
  gems?: number;
  /** Buy one freeze with gems. Leave out to show the count only. */
  onBuyFreeze?: () => void;
  onClose: () => void;
};

/** Flame orange a step darker, so the title reads well on white. */
const FLAME_INK = darken(colors.flame, 0.25);
const ICE_INK = darken(colors.gem, 0.3);

/** The top-bar flame's sheet: the streak, how to keep it, and the streak freezes that guard it. */
export function StreakSheet({ visible, streakDays, freezes, gems = 0, onBuyFreeze, onClose }: StreakSheetProps) {
  useBackToClose(visible, onClose);
  const lit = streakDays > 0;

  return (
    <Sheet visible={visible} onClose={onClose} testID="streak-sheet">
      <View style={styles.stack}>
        <PopIn key={visible ? "open" : "closed"} delay={80} style={[styles.flame, { backgroundColor: lit ? lighten(colors.flame, 0.82) : colors.mist }]}>
          <Icon name="flame" size={64} color={lit ? undefined : colors.lockedLip} />
        </PopIn>
        <Text style={[styles.title, { color: lit ? FLAME_INK : colors.inkSoft }]} accessibilityRole="header" testID="streak-title">
          {lit ? t("{count} day streak!", { count: formatNumber(streakDays) }) : t("No streak yet")}
        </Text>
        <Text style={styles.line} testID="streak-line">
          {lit ? t("Finish a lesson each day to keep it!") : t("Finish a lesson today to start one!")}
        </Text>
        {freezes === undefined ? null : <FreezeCard freezes={freezes} gems={gems} onBuy={onBuyFreeze} />}
        <GameButton label={t("Got it")} fullWidth onPress={onClose} testID="streak-close" />
      </View>
    </Sheet>
  );
}

/** Two ice slots, filled for each freeze owned, and the gem button that fills the next one. */
function FreezeCard({ freezes, gems, onBuy }: { freezes: number; gems: number; onBuy?: () => void }) {
  const { style: shakeStyle, shake } = useShake(6);
  const full = freezes >= MAX_STREAK_FREEZES;
  const short = full ? 0 : Math.max(0, STREAK_FREEZE_PRICE - gems);
  const press = () => {
    if (short) {
      shake();
      feedback("wrong", "error");
      return;
    }
    onBuy?.();
  };

  return (
    <View style={styles.freezeCard} testID="streak-freezes">
      <View style={styles.slots} accessibilityLabel={t("{count} of {max} streak freezes", { count: freezes, max: MAX_STREAK_FREEZES })}>
        {Array.from({ length: MAX_STREAK_FREEZES }, (_, index) => (
          <View key={index} style={[styles.slot, index < freezes ? styles.slotOn : null]} testID={index < freezes ? "streak-freeze-on" : "streak-freeze-off"}>
            <Icon name="freeze" size={30} color={index < freezes ? undefined : colors.lockedLip} />
          </View>
        ))}
      </View>
      <View style={styles.freezeText}>
        <Text style={styles.freezeTitle} numberOfLines={2}>{t("Streak freeze")}</Text>
        <Text style={[styles.freezeLine, short ? styles.freezeShort : null]} numberOfLines={3} testID="streak-freeze-line">
          {full ? t("Covers {count} missed days.", { count: MAX_STREAK_FREEZES }) : short ? t("Need {count} more", { count: formatNumber(short) }) : t("Saves your streak if you miss a day.")}
        </Text>
      </View>
      {onBuy && !full ? (
        <Animated.View style={shakeStyle}>
          <GameButton
            label={formatNumber(STREAK_FREEZE_PRICE)}
            size="sm"
            icon={short ? "lock" : "gem"}
            variant="blue"
            sound={short ? false : undefined}
            onPress={press}
            accessibilityLabel={t("Buy a streak freeze for {count} gems", { count: formatNumber(STREAK_FREEZE_PRICE) })}
            testID="streak-buy-freeze"
          />
        </Animated.View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  stack: {
    alignItems: "center",
    gap: space.md,
    paddingBottom: space.xs
  },
  flame: {
    width: 96,
    height: 96,
    borderRadius: 48,
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    fontFamily: fonts.displayHeavy,
    fontSize: 26,
    lineHeight: 32,
    textAlign: "center"
  },
  line: {
    ...text.bodyBold,
    textAlign: "center"
  },
  freezeCard: {
    alignSelf: "stretch",
    flexDirection: "row",
    alignItems: "center",
    gap: space.sm,
    padding: space.sm,
    borderRadius: radii.lg,
    borderWidth: 2,
    borderColor: lighten(colors.gem, 0.6),
    backgroundColor: lighten(colors.gem, 0.9)
  },
  slots: {
    flexDirection: "row",
    gap: 4
  },
  slot: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.mist
  },
  slotOn: {
    backgroundColor: colors.white
  },
  freezeText: {
    flex: 1,
    minWidth: 0
  },
  freezeTitle: {
    ...text.bodyBold,
    color: ICE_INK
  },
  freezeLine: {
    ...text.small,
    color: colors.inkSoft
  },
  freezeShort: {
    color: colors.heart
  }
});
