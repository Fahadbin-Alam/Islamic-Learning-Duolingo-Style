import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
// Type-only and pure helpers: the codes need no device storage, which a presentational screen must not load.
import {
  daysBetween,
  daysLearned,
  MAX_NICKNAME_LENGTH,
  streakOnDay,
  weekTotal,
  type AddKidResult,
  type FamilyKid,
  type FamilySnapshot
} from "../../services/familyCode";
import type { TopicId } from "../../types";
import { GameButton } from "../GameButton";
import { Icon, type IconName } from "../Icon";
import { PopIn } from "../PopIn";
import { ProgressBar } from "../ProgressBar";
import { Sheet } from "../Sheet";
import { Tappable } from "../Tappable";
import { colors, darken, fonts, lighten, radii, space, text } from "../theme";
import { formatNumber } from "./FormattedCount";
import { MascotSays, SegmentButton, SheetTitle, TextField, useBackToClose } from "./sheetParts";
import { t } from "../../i18n";

export type FamilyTab = "report" | "kids";

export type FamilyTopic = { topicId: TopicId; title: string; accent: string; total: number };

export type FamilySheetProps = {
  visible: boolean;
  onClose: () => void;
  /** This phone's progress, as a parent would see it. */
  report: FamilySnapshot;
  /** Opens the share sheet with the report; returns the code it sent, shown so it can be copied too. */
  onShareReport: () => string | undefined;
  topics: FamilyTopic[];
  /** Children this phone follows, from codes pasted here. */
  kids: FamilyKid[];
  onAddKid: (text: string, nickname: string) => AddKidResult["status"];
  onRemoveKid: (id: string) => void;
  /** Local day, YYYY-MM-DD. */
  today: string;
  /** A parent account opens on My kids. */
  initialTab?: FamilyTab;
  mascotVariant?: string;
  accent?: string;
};

const ADD_ERRORS: Record<string, string> = {
  invalid: "That code didn't work. Paste the whole message.",
  older: "You already have a newer one.",
  full: "You can follow up to 10 kids.",
  self: "That code is from this phone."
};

function updatedLine(date: string, today: string) {
  const days = Math.max(0, daysBetween(date, today));
  if (days === 0) return t("Updated today");
  if (days === 1) return t("Updated yesterday");
  return t("Updated {count} days ago", { count: days });
}

function lastLearnedLine(snapshot: FamilySnapshot, today: string) {
  if (!snapshot.lastLearnedDate) return t("No lessons yet");
  const days = Math.max(0, daysBetween(snapshot.lastLearnedDate, today));
  if (days === 0) return t("Learned today");
  if (days === 1) return t("Learned yesterday");
  return t("Learned {count} days ago", { count: days });
}

function MiniStat({ icon, value, label, testID }: { icon: IconName; value: number; label: string; testID: string }) {
  return (
    <View style={styles.miniStat} testID={testID} accessibilityLabel={`${formatNumber(value)} ${label}`}>
      <Icon name={icon} size={24} color={icon === "flame" && value <= 0 ? colors.lockedLip : undefined} />
      <Text style={styles.miniValue} numberOfLines={1}>
        {formatNumber(value)}
      </Text>
      <Text style={styles.miniLabel} numberOfLines={1}>
        {label}
      </Text>
    </View>
  );
}

/** The week as seven dots (today last), the week's XP, three stats and the topics started. */
export function ProgressReport({ snapshot, today, topics, testID }: { snapshot: FamilySnapshot; today: string; topics: FamilyTopic[]; testID: string }) {
  // A code made days ago still shows its own week, ending on the day it was made.
  const started = topics.filter((topic) => (snapshot.topicsDone[topic.topicId] ?? 0) > 0);
  const learnedDays = daysLearned(snapshot);

  return (
    <View style={styles.report} testID={testID}>
      <View style={styles.card}>
        <View style={styles.cardHead}>
          <Text style={styles.cardTitle} numberOfLines={1}>
            {t("This week")}
          </Text>
          <View style={styles.xpPill}>
            <Icon name="bolt" size={16} />
            <Text style={styles.xpText} numberOfLines={1} testID={`${testID}-week-xp`}>
              {t("{count} XP", { count: formatNumber(weekTotal(snapshot)) })}
            </Text>
          </View>
        </View>
        <View style={styles.dots} accessibilityLabel={t("{count} of 7 days", { count: learnedDays })}>
          {snapshot.weekXp.map((xp, index) => {
            const last = index === snapshot.weekXp.length - 1;
            return (
              <View key={index} style={styles.dotColumn}>
                <View style={[styles.dot, xp > 0 ? styles.dotOn : null, last ? styles.dotToday : null]} testID={`${testID}-day-${index}`}>
                  {xp > 0 ? <Icon name="check" size={16} color={colors.white} /> : null}
                </View>
                {last ? (
                  <Text style={styles.dotLabel} numberOfLines={1}>
                    {daysBetween(snapshot.date, today) === 0 ? t("Today") : ""}
                  </Text>
                ) : null}
              </View>
            );
          })}
        </View>
        <Text style={styles.cardLine} numberOfLines={2} testID={`${testID}-days`}>
          {t("{count} of 7 days", { count: learnedDays })} · {lastLearnedLine(snapshot, today)}
        </Text>
      </View>

      <View style={styles.miniRow}>
        <MiniStat icon="flame" value={streakOnDay(snapshot, today)} label={t("Day streak")} testID={`${testID}-streak`} />
        <MiniStat icon="book" value={snapshot.lessonsDone} label={t("Lessons")} testID={`${testID}-lessons`} />
        <MiniStat icon="star" value={snapshot.stars} label={t("Stars")} testID={`${testID}-stars`} />
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle} numberOfLines={1}>
          {t("Topics")}
        </Text>
        {started.length === 0 ? (
          <Text style={styles.cardLine}>{t("No lessons yet")}</Text>
        ) : (
          started.map((topic) => {
            const done = Math.min(snapshot.topicsDone[topic.topicId] ?? 0, topic.total);
            return (
              <View key={topic.topicId} style={styles.topicRow} testID={`${testID}-topic-${topic.topicId}`}>
                <View style={styles.topicHead}>
                  <Text style={styles.topicTitle} numberOfLines={1}>
                    {topic.title}
                  </Text>
                  <Text style={styles.topicCount} numberOfLines={1}>
                    {`${done}/${topic.total}`}
                  </Text>
                </View>
                <ProgressBar progress={topic.total > 0 ? done / topic.total : 0} color={topic.accent} height={10} />
              </View>
            );
          })
        )}
      </View>
    </View>
  );
}

function KidRow({ kid, index, today, topics, onRemove }: { kid: FamilyKid; index: number; today: string; topics: FamilyTopic[]; onRemove: () => void }) {
  const [open, setOpen] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const name = kid.nickname || t("Child {count}", { count: index + 1 });
  const id = kid.snapshot.id;

  return (
    <View style={styles.kid} testID={`family-kid-${id}`}>
      <Tappable onPress={() => setOpen((value) => !value)} style={styles.kidHead} accessibilityRole="button" accessibilityState={{ expanded: open }} testID={`family-kid-${id}-open`} pressScale={0.98}>
        <View style={styles.kidAvatar}>
          <Text style={styles.kidInitial}>{(name.charAt(0) || "?").toUpperCase()}</Text>
        </View>
        <View style={styles.kidMain}>
          <Text style={styles.kidName} numberOfLines={1}>
            {name}
          </Text>
          <Text style={styles.kidSub} numberOfLines={1}>
            {updatedLine(kid.snapshot.date, today)}
          </Text>
        </View>
        <View style={styles.kidScore}>
          <Icon name="flame" size={18} color={streakOnDay(kid.snapshot, today) > 0 ? undefined : colors.lockedLip} />
          <Text style={styles.kidScoreText}>{formatNumber(streakOnDay(kid.snapshot, today))}</Text>
          <Icon name="bolt" size={18} />
          <Text style={styles.kidScoreText}>{formatNumber(weekTotal(kid.snapshot))}</Text>
        </View>
        <Icon name={open ? "chevronDown" : "chevronRight"} size={20} color={colors.lineLip} />
      </Tappable>
      {open ? (
        <PopIn from="up" style={styles.kidBody}>
          <ProgressReport snapshot={kid.snapshot} today={today} topics={topics} testID={`family-kid-${id}-report`} />
          {confirm ? (
            <View style={styles.confirmRow}>
              <GameButton label={t("Keep")} size="sm" variant="secondary" onPress={() => setConfirm(false)} testID={`family-kid-${id}-keep`} />
              <GameButton label={t("Remove")} size="sm" color={colors.wrongInk} onPress={onRemove} testID={`family-kid-${id}-remove-yes`} />
            </View>
          ) : (
            <Tappable onPress={() => setConfirm(true)} style={styles.linkButton} accessibilityRole="button" testID={`family-kid-${id}-remove`}>
              <Text style={styles.dangerLink}>{t("Remove")}</Text>
            </Tappable>
          )}
        </PopIn>
      ) : null}
    </View>
  );
}

/**
 * Family, behind the grown-up gate. My progress: this phone's week, with SEND TO A PARENT (a short code in a
 * message). My kids: codes pasted from a child's phone, so a parent can follow along with no account or server.
 */
export function FamilySheet({
  visible,
  onClose,
  report,
  onShareReport,
  topics,
  kids,
  onAddKid,
  onRemoveKid,
  today,
  initialTab = "report",
  mascotVariant = "hijabi",
  accent
}: FamilySheetProps) {
  useBackToClose(visible, onClose);
  const [tab, setTab] = useState<FamilyTab>(initialTab);
  const [sharedCode, setSharedCode] = useState<string | undefined>(undefined);
  const [adding, setAdding] = useState(false);
  const [pasted, setPasted] = useState("");
  const [nickname, setNickname] = useState("");
  const [error, setError] = useState<string | undefined>(undefined);
  const [shakeKey, setShakeKey] = useState(0);
  const [added, setAdded] = useState<string | undefined>(undefined);

  // Each opening starts on the tab that fits the account, with the add form closed.
  useEffect(() => {
    if (!visible) return;
    setTab(initialTab);
    setAdding(false);
    setPasted("");
    setNickname("");
    setError(undefined);
    setAdded(undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  // With no kids yet the form is the whole tab.
  const formOpen = adding || kids.length === 0;
  const share = () => setSharedCode(onShareReport());

  const add = () => {
    const status = onAddKid(pasted, nickname);
    if (status === "added" || status === "updated") {
      setAdded(status === "added" ? t("Added!") : t("Updated!"));
      setAdding(false);
      setPasted("");
      setNickname("");
      setError(undefined);
      return;
    }
    setError(t(ADD_ERRORS[status] ?? ADD_ERRORS.invalid));
    setShakeKey((value) => value + 1);
  };

  return (
    <Sheet visible={visible} onClose={onClose} style={styles.tallPanel} testID="family-sheet">
      <SheetTitle title={t("Family")} onClose={onClose} closeTestID="family-close" />
      <View style={styles.segments}>
        <SegmentButton label={t("My progress")} icon="profile" active={tab === "report"} onPress={() => setTab("report")} testID="family-tab-report" />
        <SegmentButton label={t("My kids")} icon="family" active={tab === "kids"} onPress={() => setTab("kids")} testID="family-tab-kids" />
      </View>
      <ScrollView style={styles.scrollArea} contentContainerStyle={styles.stack} keyboardShouldPersistTaps="handled" testID="family-scroll">
        {tab === "report" ? (
          <>
            <ProgressReport snapshot={report} today={today} topics={topics} testID="family-report" />
            <GameButton label={t("Send to a parent")} icon="family" fullWidth onPress={share} testID="family-share" />
            <Text style={styles.hint}>{t("They paste it in Muslimo on their phone: Me, Family, My kids.")}</Text>
            {sharedCode ? (
              <View style={styles.codeBox} testID="family-code">
                <Text style={styles.codeLabel}>{t("Or copy this code")}</Text>
                <Text style={styles.codeText} selectable testID="family-code-text">
                  {sharedCode}
                </Text>
              </View>
            ) : null}
          </>
        ) : (
          <>
            {kids.length === 0 ? <MascotSays variant={mascotVariant} mood="wave" accent={accent} line={t("Follow your child's learning!")} /> : null}
            {added ? (
              <Text style={styles.added} accessibilityLiveRegion="polite" testID="family-added">
                {added}
              </Text>
            ) : null}
            {kids.map((kid, index) => (
              <KidRow key={kid.snapshot.id} kid={kid} index={index} today={today} topics={topics} onRemove={() => onRemoveKid(kid.snapshot.id)} />
            ))}
            {formOpen ? (
              <View style={styles.addCard} testID="family-add-form">
                <Text style={styles.cardTitle}>{t("Add a child")}</Text>
                <Text style={styles.cardLine}>{t("On your child's phone: Me, Family, Send to a parent. Then paste the message here.")}</Text>
                <TextField
                  value={pasted}
                  onChangeText={(value) => {
                    setPasted(value);
                    setError(undefined);
                  }}
                  placeholder={t("Paste the message")}
                  autoCapitalize="none"
                  autoCorrect={false}
                  multiline
                  error={error}
                  shakeKey={shakeKey}
                  style={styles.pasteField}
                  testID="family-paste"
                  accessibilityLabel={t("Paste the message")}
                />
                <TextField
                  value={nickname}
                  onChangeText={setNickname}
                  placeholder={t("Nickname (optional)")}
                  maxLength={MAX_NICKNAME_LENGTH}
                  returnKeyType="done"
                  onSubmitEditing={add}
                  testID="family-nickname"
                  accessibilityLabel={t("Nickname (optional)")}
                />
                <GameButton label={t("Add")} icon="plus" fullWidth disabled={!pasted.trim()} onPress={add} testID="family-add" />
              </View>
            ) : (
              <GameButton
                label={t("Add or update a child")}
                icon="plus"
                variant="secondary"
                fullWidth
                onPress={() => {
                  setAdding(true);
                  setAdded(undefined);
                }}
                testID="family-add-open"
              />
            )}
          </>
        )}
      </ScrollView>
    </Sheet>
  );
}

const styles = StyleSheet.create({
  tallPanel: {
    maxHeight: "92%"
  },
  segments: {
    flexDirection: "row",
    gap: space.sm,
    marginTop: space.md
  },
  scrollArea: {
    flexShrink: 1,
    minHeight: 0,
    marginTop: space.md
  },
  stack: {
    gap: space.md,
    paddingBottom: space.lg
  },
  report: {
    gap: space.md
  },
  card: {
    gap: space.sm,
    padding: space.md,
    borderRadius: radii.tile,
    borderWidth: 2,
    borderBottomWidth: 4,
    borderColor: colors.line,
    borderBottomColor: colors.lineLip,
    backgroundColor: colors.white
  },
  cardHead: {
    flexDirection: "row",
    alignItems: "center",
    gap: space.sm
  },
  cardTitle: {
    fontFamily: fonts.displayHeavy,
    fontSize: 19,
    lineHeight: 24,
    color: colors.ink,
    flex: 1,
    minWidth: 0
  },
  cardLine: {
    ...text.small
  },
  xpPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: radii.pill,
    backgroundColor: lighten(colors.gold, 0.8)
  },
  xpText: {
    fontFamily: fonts.displayHeavy,
    fontSize: 15,
    lineHeight: 20,
    color: darken(colors.gold, 0.45)
  },
  dots: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  dotColumn: {
    alignItems: "center",
    width: 36
  },
  dot: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.locked,
    borderBottomWidth: 3,
    borderBottomColor: colors.lockedLip,
    alignItems: "center",
    justifyContent: "center"
  },
  dotOn: {
    backgroundColor: colors.green,
    borderBottomColor: colors.greenLip
  },
  dotToday: {
    borderWidth: 2,
    borderColor: colors.gold
  },
  dotLabel: {
    ...text.tiny,
    fontSize: 11,
    lineHeight: 15,
    marginTop: 2
  },
  miniRow: {
    flexDirection: "row",
    gap: space.sm
  },
  miniStat: {
    flex: 1,
    flexBasis: 0,
    minWidth: 0,
    alignItems: "center",
    paddingVertical: space.sm,
    paddingHorizontal: 4,
    borderRadius: radii.tile,
    borderWidth: 2,
    borderBottomWidth: 4,
    borderColor: colors.line,
    borderBottomColor: colors.lineLip,
    backgroundColor: colors.white
  },
  miniValue: {
    fontFamily: fonts.displayHeavy,
    fontSize: 20,
    lineHeight: 26,
    color: colors.ink
  },
  miniLabel: {
    ...text.tiny,
    fontSize: 12,
    lineHeight: 16
  },
  topicRow: {
    gap: 4
  },
  topicHead: {
    flexDirection: "row",
    alignItems: "center",
    gap: space.sm
  },
  topicTitle: {
    fontFamily: fonts.bodyHeavy,
    fontSize: 15,
    lineHeight: 20,
    color: colors.ink,
    flex: 1,
    minWidth: 0
  },
  topicCount: {
    ...text.tiny
  },
  hint: {
    ...text.small,
    textAlign: "center"
  },
  codeBox: {
    gap: 4,
    padding: space.md,
    borderRadius: radii.tile,
    backgroundColor: colors.mist,
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: colors.lineLip
  },
  codeLabel: {
    ...text.tiny
  },
  codeText: {
    fontFamily: fonts.bodyHeavy,
    fontSize: 14,
    lineHeight: 20,
    color: colors.ink
  },
  added: {
    fontFamily: fonts.displayHeavy,
    fontSize: 18,
    lineHeight: 24,
    color: colors.correctInk,
    textAlign: "center"
  },
  kid: {
    borderRadius: radii.tile,
    borderWidth: 2,
    borderBottomWidth: 4,
    borderColor: colors.line,
    borderBottomColor: colors.lineLip,
    backgroundColor: colors.white,
    overflow: "hidden"
  },
  kidHead: {
    flexDirection: "row",
    alignItems: "center",
    gap: space.sm,
    padding: space.md
  },
  kidAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.gem,
    borderBottomWidth: 3,
    borderBottomColor: colors.gemLip,
    alignItems: "center",
    justifyContent: "center"
  },
  kidInitial: {
    fontFamily: fonts.displayHeavy,
    fontSize: 18,
    lineHeight: 24,
    color: colors.white
  },
  kidMain: {
    flex: 1,
    minWidth: 0
  },
  kidName: {
    fontFamily: fonts.displayHeavy,
    fontSize: 17,
    lineHeight: 22,
    color: colors.ink
  },
  kidSub: {
    ...text.tiny
  },
  kidScore: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3
  },
  kidScoreText: {
    fontFamily: fonts.displayHeavy,
    fontSize: 15,
    lineHeight: 20,
    color: colors.ink,
    marginRight: 4
  },
  kidBody: {
    paddingHorizontal: space.md,
    paddingBottom: space.md,
    gap: space.sm,
    backgroundColor: colors.mist
  },
  confirmRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: space.sm
  },
  linkButton: {
    alignSelf: "center",
    paddingVertical: space.sm,
    paddingHorizontal: space.lg
  },
  dangerLink: {
    fontFamily: fonts.displayHeavy,
    fontSize: 15,
    color: colors.wrongInk
  },
  addCard: {
    gap: space.sm,
    padding: space.md,
    borderRadius: radii.tile,
    borderWidth: 2,
    borderBottomWidth: 4,
    borderColor: lighten(colors.gem, 0.6),
    borderBottomColor: lighten(colors.gem, 0.35),
    backgroundColor: lighten(colors.gem, 0.9)
  },
  pasteField: {
    minHeight: 84,
    textAlignVertical: "top"
  }
});
