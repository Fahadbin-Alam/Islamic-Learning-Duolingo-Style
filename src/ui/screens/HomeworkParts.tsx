import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { daysBetween, shiftDateKey } from "../../services/familyCode";
import { t } from "../../i18n";
import { GameButton } from "../GameButton";
import { Icon } from "../Icon";
import { ProgressBar } from "../ProgressBar";
import { Tappable } from "../Tappable";
import { colors, fonts, radii, space, text, topicPalette } from "../theme";

/**
 * Homework a linked parent or teacher gives a learner: one unit, maybe by a day. The grown-up sees whether it is
 * done on their Family page, and the learner sees it on top of the Learn path (backend/app/api/routes/family.py).
 */
export type HomeworkView = {
  id: number;
  topicId: string;
  unitId: string;
  /** The unit's name in the app's language. */
  title: string;
  topicTitle: string;
  accent: string;
  doneCount: number;
  total: number;
  done: boolean;
  /** Local day it is due, YYYY-MM-DD. */
  dueDate?: string | null;
  /** The grown-up who gave it. */
  setByName: string;
};

/** A topic and its units, for picking homework. */
export type HomeworkTopic = {
  topicId: string;
  title: string;
  accent: string;
  units: { id: string; title: string; nodeIds: string[] }[];
};

/** "Due tomorrow", "2 days late"... Done homework says so instead. */
export function homeworkDueLine(view: Pick<HomeworkView, "done" | "dueDate">, today: string) {
  if (view.done) return t("Done!");
  if (!view.dueDate) return t("No due date");
  const days = daysBetween(today, view.dueDate);
  if (days < -1) return t("{count} days late", { count: -days });
  if (days === -1) return t("1 day late");
  if (days === 0) return t("Due today");
  if (days === 1) return t("Due tomorrow");
  return t("Due in {count} days", { count: days });
}

/** Open homework first, the soonest due first; homework with no date after dated homework. */
export function sortHomework<T extends Pick<HomeworkView, "done" | "dueDate" | "id">>(list: T[]) {
  return [...list].sort((a, b) => {
    if (a.done !== b.done) return a.done ? 1 : -1;
    const dueA = a.dueDate ?? "9999-12-31";
    const dueB = b.dueDate ?? "9999-12-31";
    return dueA === dueB ? a.id - b.id : dueA < dueB ? -1 : 1;
  });
}

function isLate(view: HomeworkView, today: string) {
  return !view.done && Boolean(view.dueDate) && daysBetween(today, view.dueDate as string) < 0;
}

/** One homework: unit, topic, progress and when it is due. A learner taps it to start; the giver can take it back. */
export function HomeworkRow({
  view,
  today,
  onOpen,
  onRemove,
  showGiver,
  testID
}: {
  view: HomeworkView;
  today: string;
  onOpen?: () => void;
  onRemove?: () => void;
  showGiver?: boolean;
  testID: string;
}) {
  const [confirm, setConfirm] = useState(false);
  const late = isLate(view, today);
  const palette = topicPalette(view.accent);
  const due = homeworkDueLine(view, today);
  const body = (
    <>
      <View style={[styles.rowIcon, { backgroundColor: view.done ? colors.green : palette.main }]}>
        <Icon name={view.done ? "check" : "bookOpen"} size={20} color={colors.white} />
      </View>
      <View style={styles.rowMain}>
        <Text style={styles.rowTitle} numberOfLines={2}>
          {view.title}
        </Text>
        <Text style={styles.rowSub} numberOfLines={1}>
          {showGiver ? t("From {name}", { name: view.setByName }) : view.topicTitle}
        </Text>
        <ProgressBar progress={view.total > 0 ? view.doneCount / view.total : 0} color={view.done ? colors.green : view.accent} height={8} />
        <View style={styles.rowFoot}>
          <Text style={styles.rowCount} numberOfLines={1} testID={`${testID}-count`}>
            {t("{done}/{total} lessons", { done: Math.min(view.doneCount, view.total), total: view.total })}
          </Text>
          <Text style={[styles.rowDue, view.done ? styles.dueDone : late ? styles.dueLate : null]} numberOfLines={1} testID={`${testID}-due`}>
            {due}
          </Text>
        </View>
      </View>
    </>
  );

  return (
    <View style={styles.row} testID={testID}>
      {onOpen ? (
        <Tappable onPress={onOpen} style={styles.rowTap} accessibilityRole="button" accessibilityLabel={`${view.title}, ${due}`} testID={`${testID}-open`} pressScale={0.98}>
          {body}
          <Icon name="chevronRight" size={20} color={colors.lineLip} />
        </Tappable>
      ) : (
        <View style={styles.rowTap}>{body}</View>
      )}
      {onRemove ? (
        confirm ? (
          <View style={styles.confirmRow}>
            <GameButton label={t("Keep")} size="sm" variant="secondary" onPress={() => setConfirm(false)} testID={`${testID}-keep`} />
            <GameButton label={t("Remove")} size="sm" color={colors.wrongInk} onPress={onRemove} testID={`${testID}-remove-yes`} />
          </View>
        ) : (
          <Tappable onPress={() => setConfirm(true)} style={styles.removeLink} accessibilityRole="button" testID={`${testID}-remove`}>
            <Text style={styles.dangerLink}>{t("Remove")}</Text>
          </Tappable>
        )
      ) : null}
    </View>
  );
}

/** On top of the Learn path: the learner's next homework. One tap opens that unit. */
export function HomeworkBanner({ view, today, more, onOpen }: { view: HomeworkView; today: string; more: number; onOpen: () => void }) {
  const late = isLate(view, today);
  const palette = topicPalette(late ? colors.wrongInk : colors.gold);
  const due = homeworkDueLine(view, today);
  return (
    <Tappable
      onPress={onOpen}
      sound="node_tap"
      pressScale={0.97}
      accessibilityLabel={`${t("Homework from {name}", { name: view.setByName })}, ${view.title}, ${due}`}
      testID="path-homework-banner"
      style={[styles.banner, { backgroundColor: palette.light, borderColor: palette.soft, borderBottomColor: palette.lip }]}
    >
      <View style={[styles.bannerIcon, { backgroundColor: palette.main }]}>
        <Icon name="bookOpen" size={26} color={colors.white} />
      </View>
      <View style={styles.rowMain}>
        <Text style={styles.bannerTitle} numberOfLines={1}>
          {t("Homework from {name}", { name: view.setByName })}
        </Text>
        <Text style={styles.bannerLine} numberOfLines={1}>
          {view.title}
        </Text>
        <Text style={[styles.bannerLine, { color: palette.ink }]} numberOfLines={1} testID="path-homework-due">
          {`${t("{done}/{total} lessons", { done: Math.min(view.doneCount, view.total), total: view.total })} · ${due}${more > 0 ? ` · +${more}` : ""}`}
        </Text>
      </View>
      <Icon name="chevronRight" size={20} color={palette.ink} />
    </Tappable>
  );
}

const DUE_CHOICES: (number | null)[] = [null, 1, 3, 7];

function dueChoiceLabel(days: number | null) {
  if (days === null) return t("No due date");
  if (days === 1) return t("Tomorrow");
  if (days === 3) return t("In 3 days");
  return t("In a week");
}

function Chip({ label, active, onPress, accent, testID }: { label: string; active: boolean; onPress: () => void; accent?: string; testID: string }) {
  const palette = topicPalette(accent ?? colors.gem);
  return (
    <Tappable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected: active }}
      testID={testID}
      pressScale={0.95}
      style={[styles.chip, active ? { backgroundColor: palette.main, borderColor: palette.lip } : null]}
    >
      <Text style={[styles.chipText, active ? styles.chipTextOn : null]} numberOfLines={1}>
        {label}
      </Text>
    </Tappable>
  );
}

/**
 * Giving homework, three small steps: a topic, one of its units, and when it is due. Units the learner already
 * finished are marked, and units that are already their homework can't be picked twice.
 */
export function GiveHomework({
  topics,
  today,
  finishedNodeIds,
  givenUnitIds,
  onGive,
  onCancel,
  testID
}: {
  topics: HomeworkTopic[];
  today: string;
  finishedNodeIds: string[];
  givenUnitIds: string[];
  onGive: (task: { topicId: string; unitId: string; nodeIds: string[]; dueDate?: string }) => Promise<string | undefined>;
  onCancel: () => void;
  testID: string;
}) {
  const [topicId, setTopicId] = useState<string | undefined>(undefined);
  const [unitId, setUnitId] = useState<string | undefined>(undefined);
  const [dueDays, setDueDays] = useState<number | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const topic = topics.find((entry) => entry.topicId === topicId);
  const unit = topic?.units.find((entry) => entry.id === unitId);
  const finished = new Set(finishedNodeIds);
  const given = new Set(givenUnitIds);

  const give = async () => {
    if (!topic || !unit || busy) return;
    setBusy(true);
    setError(undefined);
    const failed = await onGive({ topicId: topic.topicId, unitId: unit.id, nodeIds: unit.nodeIds, dueDate: dueDays === null ? undefined : shiftDateKey(today, dueDays) });
    setBusy(false);
    if (failed) setError(failed);
  };

  return (
    <View style={styles.form} testID={testID}>
      <Text style={styles.formTitle}>{t("Give homework")}</Text>
      <Text style={styles.step}>{t("1. Pick a topic")}</Text>
      <View style={styles.chips}>
        {topics.map((entry) => (
          <Chip
            key={entry.topicId}
            label={entry.title}
            active={entry.topicId === topicId}
            accent={entry.accent}
            onPress={() => {
              setTopicId(entry.topicId);
              setUnitId(undefined);
            }}
            testID={`${testID}-topic-${entry.topicId}`}
          />
        ))}
      </View>
      {topic ? (
        <>
          <Text style={styles.step}>{t("2. Pick a unit")}</Text>
          <View style={styles.units}>
            {topic.units.map((entry) => {
              const done = entry.nodeIds.filter((id) => finished.has(id)).length;
              const already = given.has(entry.id);
              const active = entry.id === unitId;
              return (
                <Tappable
                  key={entry.id}
                  onPress={() => setUnitId(entry.id)}
                  disabled={already}
                  accessibilityRole="button"
                  accessibilityState={{ selected: active, disabled: already }}
                  testID={`${testID}-unit-${entry.id}`}
                  pressScale={0.98}
                  style={[styles.unit, active ? { borderColor: topic.accent, backgroundColor: topicPalette(topic.accent).light } : null, already ? styles.unitGiven : null]}
                >
                  <Text style={styles.unitTitle} numberOfLines={2}>
                    {entry.title}
                  </Text>
                  <Text style={styles.unitCount} numberOfLines={1}>
                    {already ? t("Already homework") : `${done}/${entry.nodeIds.length}`}
                  </Text>
                  {active ? <Icon name="check" size={18} color={topic.accent} /> : null}
                </Tappable>
              );
            })}
          </View>
        </>
      ) : null}
      {unit ? (
        <>
          <Text style={styles.step}>{t("3. When is it due?")}</Text>
          <View style={styles.chips}>
            {DUE_CHOICES.map((days) => (
              <Chip
                key={String(days)}
                label={dueChoiceLabel(days)}
                active={dueDays === days}
                onPress={() => setDueDays(days)}
                testID={`${testID}-due-${days ?? "none"}`}
              />
            ))}
          </View>
        </>
      ) : null}
      {error ? (
        <Text style={styles.error} accessibilityLiveRegion="polite" testID={`${testID}-error`}>
          {error}
        </Text>
      ) : null}
      <GameButton label={t("Give homework")} icon="bookOpen" fullWidth disabled={!unit || busy} onPress={() => void give()} testID={`${testID}-go`} />
      <Tappable onPress={onCancel} style={styles.removeLink} accessibilityRole="button" testID={`${testID}-cancel`}>
        <Text style={styles.cancel}>{t("Cancel")}</Text>
      </Tappable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    gap: 4,
    padding: space.sm,
    borderRadius: radii.tile,
    borderWidth: 2,
    borderBottomWidth: 4,
    borderColor: colors.line,
    borderBottomColor: colors.lineLip,
    backgroundColor: colors.white
  },
  rowTap: { flexDirection: "row", alignItems: "center", gap: space.sm },
  rowIcon: { width: 36, height: 36, borderRadius: 18, alignItems: "center", justifyContent: "center" },
  rowMain: { flex: 1, minWidth: 0, gap: 2 },
  rowTitle: { fontFamily: fonts.displayHeavy, fontSize: 16, lineHeight: 21, color: colors.ink },
  rowSub: { ...text.tiny },
  rowFoot: { flexDirection: "row", alignItems: "center", gap: space.sm, flexWrap: "wrap" },
  rowCount: { ...text.tiny, flexShrink: 1 },
  rowDue: { fontFamily: fonts.bodyHeavy, fontSize: 13, lineHeight: 18, color: colors.inkSoft, marginLeft: "auto" },
  dueDone: { color: colors.correctInk },
  dueLate: { color: colors.wrongInk },
  confirmRow: { flexDirection: "row", justifyContent: "center", gap: space.sm },
  removeLink: { alignSelf: "center", paddingVertical: 6, paddingHorizontal: space.lg },
  dangerLink: { fontFamily: fonts.displayHeavy, fontSize: 14, color: colors.wrongInk },
  cancel: { fontFamily: fonts.displayHeavy, fontSize: 15, color: colors.inkSoft },
  banner: { flexDirection: "row", alignItems: "center", gap: 10, marginHorizontal: 16, marginTop: 8, marginBottom: 4, paddingHorizontal: 12, paddingVertical: 10, borderRadius: 18, borderWidth: 2, borderBottomWidth: 5 },
  bannerIcon: { width: 44, height: 44, borderRadius: 22, alignItems: "center", justifyContent: "center" },
  bannerTitle: { fontFamily: fonts.displayHeavy, fontSize: 16, lineHeight: 20, color: colors.ink },
  bannerLine: { ...text.small, color: colors.inkSoft },
  form: {
    gap: space.sm,
    padding: space.md,
    borderRadius: radii.tile,
    borderWidth: 2,
    borderBottomWidth: 4,
    borderColor: colors.line,
    borderBottomColor: colors.lineLip,
    backgroundColor: colors.white
  },
  formTitle: { fontFamily: fonts.displayHeavy, fontSize: 18, lineHeight: 24, color: colors.ink },
  step: { fontFamily: fonts.bodyHeavy, fontSize: 14, lineHeight: 19, color: colors.inkSoft },
  chips: { flexDirection: "row", flexWrap: "wrap", gap: 6 },
  chip: {
    maxWidth: "100%",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radii.pill,
    borderWidth: 2,
    borderBottomWidth: 3,
    borderColor: colors.line,
    backgroundColor: colors.white
  },
  chipText: { fontFamily: fonts.bodyHeavy, fontSize: 14, lineHeight: 19, color: colors.ink },
  chipTextOn: { color: colors.white },
  units: { gap: 6 },
  unit: {
    flexDirection: "row",
    alignItems: "center",
    gap: space.sm,
    paddingHorizontal: space.sm,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.line,
    backgroundColor: colors.white
  },
  unitGiven: { opacity: 0.5 },
  unitTitle: { fontFamily: fonts.bodyHeavy, fontSize: 14, lineHeight: 19, color: colors.ink, flex: 1, minWidth: 0 },
  unitCount: { ...text.tiny },
  error: { ...text.small, color: colors.wrongInk }
});
