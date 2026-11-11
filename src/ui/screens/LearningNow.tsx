import React from "react";
import { StyleSheet, Text, View } from "react-native";
import type { LearningLabel } from "../../services/familyCode";
import { t } from "../../i18n";
import { Icon } from "../Icon";
import { ProgressBar } from "../ProgressBar";
import { colors, fonts, radii, space, text } from "../theme";

/** "Wudu · Prayer", or just the topic when no unit is known. */
export function learningText(label: LearningLabel) {
  return label.topic && label.topic !== label.unit ? `${label.unit} · ${label.topic}` : label.unit;
}

/** One line under a friend's or a learner's name: what they have open now. */
export function LearningNowLine({ label, testID }: { label: LearningLabel; testID: string }) {
  return (
    <Text style={styles.line} numberOfLines={1} testID={testID}>
      {t("Learning: {what}", { what: learningText(label) })}
    </Text>
  );
}

/**
 * A card with what a friend or linked learner is learning now: the unit and topic, how far through the unit they
 * are (when known), and how many lessons they have finished in all.
 */
export function LearningNowCard({ label, lessonsDone, accent = colors.gem, testID }: { label?: LearningLabel; lessonsDone?: number; accent?: string; testID: string }) {
  if (!label && lessonsDone === undefined) return null;
  const known = label?.total !== undefined && label.total > 0;
  return (
    <View style={styles.card} testID={testID}>
      <View style={styles.head}>
        <View style={[styles.icon, { backgroundColor: accent }]}>
          <Icon name="bookOpen" size={20} color={colors.white} />
        </View>
        <View style={styles.main}>
          <Text style={styles.title} numberOfLines={1}>
            {t("Learning now")}
          </Text>
          <Text style={styles.what} numberOfLines={2} testID={`${testID}-what`}>
            {label ? learningText(label) : t("No lessons yet")}
          </Text>
        </View>
      </View>
      {label && known ? (
        <>
          <ProgressBar progress={(label.done ?? 0) / (label.total as number)} color={accent} height={8} />
          <Text style={styles.line} numberOfLines={1} testID={`${testID}-unit`}>
            {t("{done} of {total} lessons in this unit", { done: label.done ?? 0, total: label.total as number })}
          </Text>
        </>
      ) : null}
      {lessonsDone !== undefined ? (
        <Text style={styles.line} numberOfLines={1} testID={`${testID}-lessons`}>
          {t("{count} lessons done in all", { count: lessonsDone })}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    alignSelf: "stretch",
    gap: 6,
    padding: space.md,
    borderRadius: radii.tile,
    borderWidth: 2,
    borderBottomWidth: 4,
    borderColor: colors.line,
    borderBottomColor: colors.lineLip,
    backgroundColor: colors.white
  },
  head: { flexDirection: "row", alignItems: "center", gap: space.sm },
  icon: { width: 36, height: 36, borderRadius: 18, alignItems: "center", justifyContent: "center" },
  main: { flex: 1, minWidth: 0 },
  title: { ...text.tiny },
  what: { fontFamily: fonts.displayHeavy, fontSize: 16, lineHeight: 21, color: colors.ink },
  line: { ...text.tiny, flexShrink: 1 }
});
