import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Icon } from "../Icon";
import { StatChip } from "../StatChip";
import { Tappable } from "../Tappable";
import { colors, darken, fonts, topicPalette } from "../theme";
import { worldIcon } from "./TopicPicker";

export type AppTopBarProps = {
  topicId: string;
  topicTitle: string;
  accent: string;
  streakDays: number;
  gems: number;
  hearts: { current: number; max: number; unlimited: boolean };
  /** Tap the topic button. */
  onOpenTopics: () => void;
  /** Tap gems or hearts. */
  onOpenShop: () => void;
  onStreak?: () => void;
  /** Extra top padding (status bar). Default 0. */
  topInset?: number;
};

/** Same grey as the kit's dimmed StatChip value. */
const DIM_INK = darken(colors.lockedLip, 0.12);

/** Slim game bar: topic world button, streak, gems and hearts. Icons and numbers only. */
export function AppTopBar({
  topicId,
  topicTitle,
  accent,
  streakDays,
  gems,
  hearts,
  onOpenTopics,
  onOpenShop,
  onStreak,
  topInset = 0
}: AppTopBarProps) {
  const palette = topicPalette(accent);
  const heartLabel = hearts.unlimited ? "Unlimited hearts" : `${hearts.current} of ${hearts.max} hearts`;

  return (
    <View style={[styles.bar, { paddingTop: topInset }]} testID="app-top-bar">
      <View style={styles.row}>
        <Tappable
          onPress={onOpenTopics}
          sound="node_tap"
          pressScale={0.92}
          hitSlop={6}
          accessibilityLabel={`${topicTitle}. Change topic`}
          testID="top-bar-topic"
          style={styles.topicButton}
        >
          <View style={[styles.emblem, { backgroundColor: palette.light, borderColor: palette.soft, borderBottomColor: palette.lip }]}>
            <Icon name={worldIcon(topicId)} size={26} />
          </View>
          <Icon name="chevronDown" size={16} color={colors.inkSoft} />
        </Tappable>

        <View style={styles.stats}>
          {onStreak ? (
            <StatChip
              icon="flame"
              value={streakDays}
              color={colors.flame}
              dim={streakDays <= 0}
              onPress={onStreak}
              accessibilityLabel={`${streakDays} day streak`}
              testID="top-bar-streak"
            />
          ) : (
            // No handler: show the streak without a button role or tap sound.
            <View style={styles.staticChip} accessible accessibilityLabel={`${streakDays} day streak`} testID="top-bar-streak">
              <View style={streakDays <= 0 ? styles.dim : null}>
                <Icon name="flame" size={26} color={streakDays <= 0 ? colors.lockedLip : undefined} />
              </View>
              <Text style={[styles.staticValue, { color: streakDays <= 0 ? DIM_INK : colors.flame }]} numberOfLines={1}>
                {streakDays}
              </Text>
            </View>
          )}
          <StatChip icon="gem" value={gems} color={colors.gem} onPress={onOpenShop} accessibilityLabel={`${gems} gems`} testID="top-bar-gems" />
          {hearts.unlimited ? (
            <Tappable
              onPress={onOpenShop}
              pressScale={0.92}
              hitSlop={6}
              accessibilityLabel={heartLabel}
              testID="top-bar-hearts"
              style={styles.heartChip}
            >
              <Icon name="heart" size={26} />
              <View style={styles.infinity} testID="top-bar-hearts-unlimited">
                <Icon name="infinity" size={22} color={colors.heart} />
              </View>
            </Tappable>
          ) : (
            <StatChip
              icon="heart"
              value={hearts.current}
              color={colors.heart}
              dim={hearts.current <= 0}
              onPress={onOpenShop}
              accessibilityLabel={heartLabel}
              testID="top-bar-hearts"
            />
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    backgroundColor: colors.white,
    borderBottomWidth: 2,
    borderBottomColor: colors.line
  },
  row: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12
  },
  topicButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 4,
    paddingRight: 2,
    borderRadius: 14
  },
  emblem: {
    width: 40,
    height: 40,
    borderRadius: 12,
    borderWidth: 2,
    borderBottomWidth: 4,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 2
  },
  stats: {
    flex: 1,
    minWidth: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly"
  },
  heartChip: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 12
  },
  infinity: {
    marginLeft: 4
  },
  staticChip: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 6,
    paddingVertical: 4
  },
  dim: {
    opacity: 0.9
  },
  staticValue: {
    marginLeft: 5,
    fontFamily: fonts.displayHeavy,
    fontSize: 18,
    lineHeight: 24,
    includeFontPadding: false
  }
});
