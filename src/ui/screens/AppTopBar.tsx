import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Icon } from "../Icon";
import { StatChip } from "../StatChip";
import { Tappable } from "../Tappable";
import { colors, topicPalette } from "../theme";
import { StreakSheet } from "./StreakSheet";
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
  /** Tap the flame. Default: a small sheet that says how the streak works. */
  onStreak?: () => void;
  /** Extra top padding (status bar). Default 0. */
  topInset?: number;
};

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
  const [streakOpen, setStreakOpen] = useState(false);
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
          <StatChip
            icon="flame"
            value={streakDays}
            color={colors.flame}
            dim={streakDays <= 0}
            onPress={onStreak ?? (() => setStreakOpen(true))}
            accessibilityLabel={`${streakDays} day streak`}
            testID="top-bar-streak"
          />
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
      {onStreak ? null : <StreakSheet visible={streakOpen} streakDays={streakDays} onClose={() => setStreakOpen(false)} />}
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
  }
});
