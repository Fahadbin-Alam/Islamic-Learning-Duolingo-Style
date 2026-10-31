import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import type { ArabicTerm } from "../../data/arabicTerms";
import { ArabicText } from "../ArabicText";
import { GameButton } from "../GameButton";
import { Icon } from "../Icon";
import { ProgressBar } from "../ProgressBar";
import { Sheet } from "../Sheet";
import { Tappable } from "../Tappable";
import { colors, darken, fonts, lighten, text, topicPalette } from "../theme";
import { worldIcon } from "./TopicPicker";
import { useBackToClose } from "./sheetParts";
import { t } from "../../i18n";

export type QuizSheetUnit = {
  id: string;
  title: string;
  arabic?: ArabicTerm;
  /** Best score, in percent; unset until the unit quiz is taken. */
  best?: number;
};

export type QuizSheetTopic = {
  topicId: string;
  title: string;
  accent: string;
  arabic?: ArabicTerm;
  best?: number;
  /** Units with a quiz of their own. With fewer than two, the topic quiz is the only one. */
  units: QuizSheetUnit[];
};

export type QuizSheetProps = {
  visible: boolean;
  onClose: () => void;
  /** Topics with a quiz, in course order. */
  topics: QuizSheetTopic[];
  /** The topic the sheet opens on (the one the path shows); the list of topics is one tap back. */
  topicId?: string;
  /** A topic quiz (no unitId) or a unit quiz. */
  onStart: (topicId: string, unitId?: string) => void;
  /** Gap above the sheet. Default 40. */
  topGap?: number;
  bottomInset?: number;
};

/** A best score as a small pill: gold at 100, green from 80, blue below; "NEW" before the first try. */
function ScorePill({ best, testID }: { best?: number; testID?: string }) {
  const taken = best !== undefined;
  const face = !taken ? colors.mist : best >= 100 ? colors.gold : best >= 80 ? colors.green : colors.gem;
  const ink = !taken ? colors.inkSoft : best >= 100 ? darken(colors.goldLip, 0.5) : colors.white;
  return (
    <View style={[styles.pill, { backgroundColor: face }]} testID={testID}>
      {taken && best >= 100 ? <Icon name="crown" size={16} color={ink} /> : null}
      <Text style={[styles.pillText, { color: ink }]} numberOfLines={1}>
        {taken ? `${best}%` : t("NEW")}
      </Text>
    </View>
  );
}

function TopicRow({ topic, onPress }: { topic: QuizSheetTopic; onPress: () => void }) {
  const palette = topicPalette(topic.accent);
  return (
    <Tappable
      onPress={onPress}
      sound="node_tap"
      pressScale={0.97}
      accessibilityLabel={topic.best !== undefined ? `${topic.title}, ${topic.best}%` : topic.title}
      testID={`quiz-topic-${topic.topicId}`}
      style={styles.row}
    >
      <View style={[styles.emblem, { backgroundColor: palette.main, borderBottomColor: palette.lip }]}>
        <Icon name={worldIcon(topic.topicId)} size={26} />
      </View>
      <View style={styles.rowText}>
        <Text style={styles.rowTitle} numberOfLines={2}>
          {topic.title}
        </Text>
        {topic.arabic ? (
          <ArabicText size={15} weight="bold" color={palette.ink} style={styles.rowArabic}>
            {topic.arabic.ar}
          </ArabicText>
        ) : null}
      </View>
      <ScorePill best={topic.best} />
      <Icon name="chevronRight" size={20} color={colors.inkSoft} />
    </Tappable>
  );
}

/** One topic: its whole-topic quiz on a big card, then a quiz for each unit. */
function TopicQuizzes({ topic, onStart }: { topic: QuizSheetTopic; onStart: (unitId?: string) => void }) {
  const palette = topicPalette(topic.accent);
  const known = topic.best ?? 0;
  return (
    <View testID={`quiz-topic-page-${topic.topicId}`}>
      <View style={[styles.hero, { backgroundColor: palette.light, borderColor: palette.soft, borderBottomColor: lighten(topic.accent, 0.35) }]}>
        <View style={styles.heroRow}>
          <View style={[styles.heroEmblem, { backgroundColor: palette.main, borderBottomColor: palette.lip }]}>
            <Icon name="trophy" size={40} />
          </View>
          <View style={styles.rowText}>
            <Text style={styles.heroTitle} numberOfLines={2}>
              {t("{topic} quiz", { topic: topic.title })}
            </Text>
            <Text style={styles.heroLine} numberOfLines={2}>
              {topic.best !== undefined ? t("You know {percent}%", { percent: topic.best }) : t("How much do you know?")}
            </Text>
          </View>
        </View>
        {topic.best !== undefined ? <ProgressBar progress={known / 100} color={palette.main} height={12} /> : null}
        <GameButton label={t("Start quiz")} fullWidth onPress={() => onStart(undefined)} testID="quiz-start-topic" />
      </View>
      {topic.units.length > 1 ? (
        <>
          <Text style={styles.heading2}>{t("Unit quizzes")}</Text>
          {topic.units.map((unit) => (
            <Tappable
              key={unit.id}
              onPress={() => onStart(unit.id)}
              sound="node_tap"
              pressScale={0.97}
              accessibilityLabel={unit.best !== undefined ? `${unit.title}, ${unit.best}%` : unit.title}
              testID={`quiz-unit-${unit.id}`}
              style={styles.row}
            >
              <View style={styles.rowText}>
                <Text style={styles.rowTitle} numberOfLines={2}>
                  {unit.title}
                </Text>
                {unit.arabic ? (
                  <ArabicText size={15} weight="bold" color={palette.ink} style={styles.rowArabic}>
                    {unit.arabic.ar}
                  </ArabicText>
                ) : null}
              </View>
              <ScorePill best={unit.best} testID={`quiz-unit-score-${unit.id}`} />
            </Tappable>
          ))}
        </>
      ) : null}
    </View>
  );
}

/**
 * Quizzes: a scored check of a whole topic or one unit, to see how much the learner knows. Opens on the path's
 * topic; BACK lists every topic with its best score.
 */
export function QuizSheet({ visible, onClose, topics, topicId, onStart, topGap = 40, bottomInset = 0 }: QuizSheetProps) {
  const [openTopicId, setOpenTopicId] = useState<string | undefined>(topicId);
  const openTopic = topics.find((topic) => topic.topicId === openTopicId);
  useBackToClose(visible, openTopic ? () => setOpenTopicId(undefined) : onClose);

  useEffect(() => {
    if (visible) {
      setOpenTopicId(topicId);
    }
  }, [topicId, visible]);

  return (
    <Sheet visible={visible} onClose={onClose} bottomInset={0} style={[styles.sheet, { top: topGap, paddingBottom: 0 }]} testID="quiz-sheet">
      <View style={styles.header}>
        {openTopic ? (
          <Tappable onPress={() => setOpenTopicId(undefined)} accessibilityLabel={t("All topics")} testID="quiz-sheet-back" style={[styles.close, styles.back]} hitSlop={8} pressScale={0.88}>
            <Icon name="arrowLeft" size={22} color={colors.inkSoft} />
          </Tappable>
        ) : null}
        <Text style={styles.heading} accessibilityRole="header" numberOfLines={2}>
          {openTopic ? openTopic.title : t("Quizzes")}
        </Text>
        <Tappable onPress={onClose} accessibilityLabel={t("Close")} testID="quiz-sheet-close" style={styles.close} hitSlop={8} pressScale={0.88}>
          <Icon name="close" size={22} color={colors.inkSoft} />
        </Tappable>
      </View>
      <ScrollView style={styles.scroll} contentContainerStyle={{ paddingBottom: 32 + bottomInset }} showsVerticalScrollIndicator={false}>
        {openTopic ? (
          <TopicQuizzes topic={openTopic} onStart={(unitId) => onStart(openTopic.topicId, unitId)} />
        ) : (
          <View testID="quiz-topic-list">
            <Text style={styles.line}>{t("How much do you know?")}</Text>
            {topics.map((topic) => (
              <TopicRow key={topic.topicId} topic={topic} onPress={() => setOpenTopicId(topic.topicId)} />
            ))}
          </View>
        )}
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
  back: {
    marginEnd: 10
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
  heading2: {
    fontFamily: fonts.displayHeavy,
    fontSize: 18,
    lineHeight: 24,
    color: colors.ink,
    marginTop: 18,
    marginBottom: 10
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
  emblem: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderBottomWidth: 3,
    alignItems: "center",
    justifyContent: "center"
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
  pill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    minWidth: 52,
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999
  },
  pillText: {
    fontFamily: fonts.displayHeavy,
    fontSize: 14,
    lineHeight: 18
  },
  hero: {
    borderRadius: 24,
    borderWidth: 2,
    borderBottomWidth: 6,
    padding: 16,
    gap: 14
  },
  heroRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14
  },
  heroEmblem: {
    width: 68,
    height: 68,
    borderRadius: 34,
    borderBottomWidth: 4,
    alignItems: "center",
    justifyContent: "center"
  },
  heroTitle: {
    ...text.h2,
    flexShrink: 1
  },
  heroLine: {
    ...text.bodyBold,
    color: colors.inkSoft,
    marginTop: 2
  }
});
