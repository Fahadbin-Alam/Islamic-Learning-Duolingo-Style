import React, { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet, Text, View } from "react-native";
import { t } from "../../i18n";
import { QUEST_CHEST_DATES, type Quest, type QuestBoard } from "../../services/dailyQuests";
import { GameButton } from "../GameButton";
import { Icon, type IconName } from "../Icon";
import { useReduceMotion } from "../motion";
import { ProgressBar } from "../ProgressBar";
import { Sheet } from "../Sheet";
import { Tappable } from "../Tappable";
import { colors, darken, fonts, lighten, radii, space, text } from "../theme";
import { SheetTitle, useBackToClose } from "./sheetParts";

const QUEST_ICON: Record<Quest["kind"], IconName> = {
  lessons: "book",
  inARow: "flame",
  perfect: "star",
  correct: "check",
  xp: "bolt"
};

/** A quest in plain words, in the learner's language. */
export function questLabel(quest: Quest) {
  switch (quest.kind) {
    case "lessons":
      return t("Finish {count} lessons", { count: quest.target });
    case "inARow":
      return t("Get {count} right in a row", { count: quest.target });
    case "perfect":
      return t("Finish a lesson with no mistakes");
    case "correct":
      return t("Answer {count} questions right", { count: quest.target });
    case "xp":
    default:
      return t("Earn {count} XP", { count: quest.target });
  }
}

const INK = darken(colors.gold, 0.5);

/** The day's chest: closed, it wiggles while it waits to be opened; open once claimed. */
function QuestChest({ ready, claimed, size = 34 }: { ready: boolean; claimed: boolean; size?: number }) {
  const reduceMotion = useReduceMotion();
  const wiggle = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    wiggle.setValue(0);
    if (!ready || claimed || reduceMotion) return undefined;
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(wiggle, { toValue: 1, duration: 520, easing: Easing.linear, useNativeDriver: true }),
        Animated.delay(900)
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [ready, claimed, reduceMotion, wiggle]);
  const rotate = wiggle.interpolate({ inputRange: [0, 0.2, 0.4, 0.6, 0.8, 1], outputRange: ["0deg", "-10deg", "9deg", "-6deg", "3deg", "0deg"] });
  const scale = wiggle.interpolate({ inputRange: [0, 0.3, 1], outputRange: [1, 1.12, 1] });
  return (
    <Animated.View style={{ transform: [{ rotate }, { scale }] }}>
      <Icon name={claimed ? "chestOpen" : "chest"} size={size} color={ready || claimed ? undefined : colors.lockedLip} />
    </Animated.View>
  );
}

/** On top of the path: today's quests in one line, three little bars and the chest. A tap opens them all. */
export function QuestsBanner({ board, onOpen }: { board: QuestBoard; onOpen: () => void }) {
  const ready = board.allDone && !board.claimed;
  const line = board.claimed
    ? t("All done today! New quests tomorrow.")
    : ready
      ? t("All done! Open your chest.")
      : t("{done} of {total} done", { done: board.doneCount, total: board.quests.length });
  return (
    <Tappable
      onPress={onOpen}
      sound="node_tap"
      pressScale={0.97}
      accessibilityLabel={`${t("Daily quests")}, ${line}`}
      testID="path-quests-banner"
      style={[styles.banner, ready ? styles.bannerReady : null]}
    >
      <View style={styles.bannerIcon}>
        <Icon name="trophy" size={26} />
      </View>
      <View style={styles.body}>
        <Text style={styles.title} numberOfLines={1}>
          {t("Daily quests")}
        </Text>
        <View style={styles.dots}>
          {board.quests.map((status) => (
            <View key={status.quest.id} style={styles.dotTrack}>
              <View style={[styles.dotFill, { width: `${Math.round((status.progress / status.quest.target) * 100)}%` }]} />
            </View>
          ))}
        </View>
        <Text style={styles.line} numberOfLines={1} testID="path-quests-line">
          {line}
        </Text>
      </View>
      <QuestChest ready={ready} claimed={board.claimed} />
    </Tappable>
  );
}

/** All of today's quests with their bars, and the chest to open once all three are done. */
export function QuestsSheet({ visible, board, onClaim, onClose }: { visible: boolean; board: QuestBoard; onClaim: () => void; onClose: () => void }) {
  useBackToClose(visible, onClose);
  const ready = board.allDone && !board.claimed;
  return (
    <Sheet visible={visible} onClose={onClose} testID="quests-sheet">
      <SheetTitle title={t("Daily quests")} onClose={onClose} closeTestID="quests-close" />
      <View style={styles.list}>
        {board.quests.map((status) => (
          <View key={status.quest.id} style={styles.row} testID={`quest-${status.quest.id}`}>
            <View style={[styles.rowIcon, status.done ? styles.rowIconDone : null]}>
              <Icon name={status.done ? "check" : QUEST_ICON[status.quest.kind]} size={22} color={status.done ? colors.white : undefined} />
            </View>
            <View style={styles.body}>
              <Text style={styles.rowTitle}>{questLabel(status.quest)}</Text>
              <View style={styles.rowBar}>
                <View style={styles.rowBarTrack}>
                  <ProgressBar progress={status.progress / status.quest.target} color={status.done ? colors.green : colors.gold} height={12} />
                </View>
                <Text style={styles.rowCount}>
                  {status.progress}/{status.quest.target}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </View>
      <View style={styles.chestRow}>
        <QuestChest ready={ready} claimed={board.claimed} size={48} />
        <Text style={styles.chestLine}>
          {board.claimed
            ? t("You opened today's chest. New quests tomorrow!")
            : t("Finish all three for a chest with {count} dates.", { count: QUEST_CHEST_DATES })}
        </Text>
      </View>
      {ready ? (
        <GameButton label={t("Open chest")} fullWidth onPress={onClaim} sound={false} testID="quests-claim" />
      ) : (
        <GameButton label={t("Got it")} fullWidth variant="secondary" onPress={onClose} testID="quests-ok" />
      )}
    </Sheet>
  );
}

const styles = StyleSheet.create({
  banner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 4,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 18,
    borderWidth: 2,
    borderBottomWidth: 5,
    backgroundColor: colors.white,
    borderColor: colors.line,
    borderBottomColor: darken(colors.line, 0.08)
  },
  bannerReady: {
    backgroundColor: lighten(colors.gold, 0.85),
    borderColor: lighten(colors.gold, 0.4),
    borderBottomColor: colors.goldLip
  },
  bannerIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: lighten(colors.gold, 0.75)
  },
  body: { flex: 1, minWidth: 0 },
  title: { fontFamily: fonts.displayHeavy, fontSize: 16, lineHeight: 20, color: colors.ink },
  line: { ...text.small, color: colors.inkSoft },
  dots: { flexDirection: "row", gap: 4, marginTop: 4, marginBottom: 2 },
  dotTrack: { flex: 1, height: 6, borderRadius: 3, backgroundColor: colors.line, overflow: "hidden" },
  dotFill: { height: 6, borderRadius: 3, backgroundColor: colors.gold },
  list: { gap: space.md, marginTop: space.sm },
  row: { flexDirection: "row", alignItems: "center", gap: space.md },
  rowIcon: { width: 40, height: 40, borderRadius: 20, alignItems: "center", justifyContent: "center", backgroundColor: lighten(colors.gold, 0.8) },
  rowIconDone: { backgroundColor: colors.green },
  rowTitle: { fontFamily: fonts.bodyHeavy, fontSize: 16, lineHeight: 21, color: colors.ink },
  rowBar: { flexDirection: "row", alignItems: "center", gap: space.sm, marginTop: 4 },
  rowBarTrack: { flex: 1 },
  rowCount: { fontFamily: fonts.displayHeavy, fontSize: 14, color: INK, minWidth: 40, textAlign: "right" },
  chestRow: { flexDirection: "row", alignItems: "center", gap: space.md, marginVertical: space.lg, padding: space.md, borderRadius: radii.md, backgroundColor: lighten(colors.gold, 0.88) },
  chestLine: { flex: 1, fontFamily: fonts.bodyHeavy, fontSize: 15, lineHeight: 20, color: INK }
});
