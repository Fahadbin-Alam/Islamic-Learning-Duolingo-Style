import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View, type DimensionValue } from "react-native";
import type { ArabicTerm } from "../../data/arabicTerms";
import { ArabicText } from "../ArabicText";
import { Icon, topicIcon, type IconName } from "../Icon";
import { ProgressBar } from "../ProgressBar";
import { Sheet } from "../Sheet";
import { Tappable } from "../Tappable";
import { colors, darken, fonts, lighten, text, topicPalette } from "../theme";
import { t } from "../../i18n";

export type TopicPickerTopic = {
  topicId: string;
  title: string;
  accent: string;
  arabic?: ArabicTerm;
  done: number;
  total: number;
};

export type TopicPickerProps = {
  visible: boolean;
  onClose: () => void;
  topics: TopicPickerTopic[];
  activeTopicId: string;
  onSelect: (topicId: string) => void;
  /** Gap above the sheet. Default 40. */
  topGap?: number;
  /** Bottom safe-area inset; tiles scroll to the screen edge and clear it. Default 0. */
  bottomInset?: number;
};

/** Topic emblem. Fasting gets the Ramadan lantern so it does not look like Foundation's crescent. */
export function worldIcon(topicId: string): IconName {
  return topicId === "fasting" ? "lantern" : topicIcon(topicId);
}

const GAP = 12;
/** Dark brown label on gold, as in the kit's gold GameButton. */
const GOLD_INK = darken(colors.goldLip, 0.52);

function TopicTile({ topic, active, width, onPress }: { topic: TopicPickerTopic; active: boolean; width: DimensionValue; onPress: () => void }) {
  const palette = topicPalette(topic.accent);
  const progress = topic.total > 0 ? topic.done / topic.total : 0;
  const finished = topic.total > 0 && topic.done >= topic.total;
  return (
    <Tappable
      onPress={onPress}
      sound="node_tap"
      pressScale={0.95}
      accessibilityLabel={t("{topic}, {done} of {total}", { topic: topic.title, done: topic.done, total: topic.total })}
      accessibilityState={{ selected: active }}
      testID={`topic-tile-${topic.topicId}`}
      style={[styles.tile, { width }, active ? styles.tileActive : null]}
    >
      <View style={[styles.emblem, { backgroundColor: palette.main, borderBottomColor: palette.lip }]}>
        <Icon name={worldIcon(topic.topicId)} size={38} />
      </View>
      <Text style={styles.title} numberOfLines={2}>
        {topic.title}
      </Text>
      {topic.arabic ? (
        // Never cut: a long name drops a size and may wrap (web ignores adjustsFontSizeToFit).
        <ArabicText size={topic.arabic.ar.length > 12 ? 15 : 18} weight="bold" color={palette.ink} style={styles.arabic}>
          {topic.arabic.ar}
        </ArabicText>
      ) : null}
      {finished ? (
        <View style={styles.donePill} testID={`topic-done-${topic.topicId}`}>
          <Icon name="crown" size={18} color={colors.white} />
          <Text style={styles.doneText}>{t("DONE")}</Text>
        </View>
      ) : (
        <View style={styles.progressRow}>
          <ProgressBar progress={progress} color={palette.main} height={8} style={styles.bar} />
          <Text style={styles.count} numberOfLines={1}>{`${topic.done}/${topic.total}`}</Text>
        </View>
      )}
      {active ? (
        <View style={styles.activeBadge}>
          <Icon name="check" size={14} color={colors.white} />
        </View>
      ) : null}
    </Tappable>
  );
}

/** Full-height sheet with a grid of topic worlds. */
export function TopicPicker({ visible, onClose, topics, activeTopicId, onSelect, topGap = 40, bottomInset = 0 }: TopicPickerProps) {
  const [gridWidth, setGridWidth] = useState(0);
  const columns = gridWidth > 0 && gridWidth < 260 ? 1 : 2;
  const tileWidth: DimensionValue = gridWidth > 0 ? Math.floor((gridWidth - GAP * (columns - 1)) / columns) : "47%";

  return (
    <Sheet visible={visible} onClose={onClose} bottomInset={0} style={[styles.sheet, { top: topGap, paddingBottom: 0 }]} testID="topic-picker">
      <View style={styles.header}>
        <Text style={styles.heading} numberOfLines={2}>
          {t("Choose a topic")}
        </Text>
        <Tappable onPress={onClose} accessibilityLabel={t("Close")} testID="topic-picker-close" style={styles.close} hitSlop={8} pressScale={0.88}>
          <Icon name="close" size={22} color={colors.inkSoft} />
        </Tappable>
      </View>
      <ScrollView style={styles.scroll} contentContainerStyle={{ paddingBottom: 32 + bottomInset }} showsVerticalScrollIndicator={false}>
        <View style={styles.grid} onLayout={(event) => setGridWidth(event.nativeEvent.layout.width)}>
          {topics.map((topic) => (
                <TopicTile
                  key={topic.topicId}
                  topic={topic}
                  width={tileWidth}
                  active={topic.topicId === activeTopicId}
                  onPress={() => {
                    onSelect(topic.topicId);
                    onClose();
                  }}
                />
              ))}
        </View>
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
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: GAP,
    minHeight: 1
  },
  tile: {
    alignItems: "center",
    borderWidth: 2,
    borderColor: colors.line,
    borderBottomWidth: 5,
    borderBottomColor: colors.lineLip,
    borderRadius: 18,
    backgroundColor: colors.white,
    paddingHorizontal: 10,
    paddingTop: 14,
    paddingBottom: 12
  },
  tileActive: {
    borderColor: colors.gem,
    borderBottomColor: colors.gemLip,
    backgroundColor: lighten(colors.gem, 0.92)
  },
  emblem: {
    width: 62,
    height: 62,
    borderRadius: 31,
    borderBottomWidth: 5,
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    marginTop: 8,
    fontFamily: fonts.displayHeavy,
    fontSize: 16,
    lineHeight: 20,
    color: colors.ink,
    textAlign: "center",
    flexShrink: 1,
    maxWidth: "100%"
  },
  arabic: {
    marginTop: 0,
    maxWidth: "100%"
  },
  progressRow: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "stretch",
    marginTop: "auto",
    paddingTop: 6
  },
  bar: {
    flex: 1,
    width: undefined,
    minWidth: 0
  },
  donePill: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: "auto",
    paddingStart: 8,
    paddingEnd: 12,
    paddingVertical: 2,
    borderRadius: 999,
    backgroundColor: colors.gold,
    borderBottomWidth: 3,
    borderBottomColor: colors.goldLip
  },
  doneText: {
    marginStart: 4,
    fontFamily: fonts.displayHeavy,
    fontSize: 13,
    lineHeight: 18,
    letterSpacing: 0.6,
    color: GOLD_INK
  },
  count: {
    marginStart: 6,
    fontFamily: fonts.displayHeavy,
    fontSize: 13,
    lineHeight: 17,
    color: colors.inkSoft
  },
  activeBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: colors.gem,
    alignItems: "center",
    justifyContent: "center"
  }
});
