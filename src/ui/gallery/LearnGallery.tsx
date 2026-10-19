import React, { useEffect, useMemo, useState } from "react";
import { Platform, ScrollView, StyleSheet, View } from "react-native";
import { COURSE } from "../../data/course";
import { getBranchArabic, getLessonArabic, getTopicArabic } from "../../data/arabicTerms";
import type { LearningNodeView, LearningSection } from "../../types";
import { AppTopBar } from "../screens/AppTopBar";
import { BottomTabs, type TabKey } from "../screens/BottomTabs";
import { LearnPath, type PathItem, type PathUnit } from "../screens/LearnPath";
import { TopicPicker } from "../screens/TopicPicker";
import { colors } from "../theme";

type State = "foundation" | "prayer" | "card" | "locked" | "chest" | "premium" | "done" | "topics" | "tabs";
const STATES: State[] = ["foundation", "prayer", "card", "locked", "chest", "premium", "done", "topics", "tabs"];

function readState(): State {
  if (Platform.OS !== "web" || typeof window === "undefined") return "foundation";
  const suffix = window.location.hash.replace(/^#gallery-learn-?/, "");
  return (STATES as string[]).includes(suffix) ? (suffix as State) : "foundation";
}

function section(topicId: string): LearningSection {
  return COURSE.sections.find((candidate) => candidate.topicId === topicId) ?? COURSE.sections[0];
}

/**
 * Builds path units from real course data with the first `doneCount` path nodes completed.
 * Statuses follow learningApi.getPathNodes: the first open node of EVERY branch is "current"
 * when its prerequisites are done, so the path must pick a single current node itself.
 */
function buildUnits(sec: LearningSection, doneCount: number, claimed: Set<string>, maxUnits = 4, premiumFrom = 3): PathUnit[] {
  const branches = [...sec.branches].sort((a, b) => (a.order ?? 0) - (b.order ?? 0)).slice(0, maxUnits);
  const ordered = branches.flatMap((branch) => sec.nodes.filter((node) => node.branchId === branch.id));
  const completed = new Set(ordered.slice(0, doneCount).map((node) => node.id));
  let lessonNumber = 0;
  return branches.map((branch, unitIndex) => {
    const nodes = sec.nodes.filter((node) => node.branchId === branch.id);
    const firstOpen = nodes.find((node) => !completed.has(node.id));
    const items: PathItem[] = [];
    const chestAfter = nodes.length >= 4 ? 2 : nodes.length - 1;
    nodes.forEach((node, index) => {
      const ready = node.requiredNodeIds.every((id) => completed.has(id));
      const status: LearningNodeView["status"] = completed.has(node.id)
        ? "completed"
        : !ready
          ? "locked"
          : firstOpen?.id === node.id
            ? "current"
            : "available";
      lessonNumber += 1;
      items.push({
        kind: "node",
        node: { ...node, status, firstLessonId: node.lessonIds[0] },
        arabic: getLessonArabic(node.id, node.branchId),
        lessonNumber,
        progress: status === "current" && doneCount > 0 ? 0.34 : undefined
      });
      if (index === chestAfter) {
        const id = `${branch.id}-chest`;
        const unlocked = nodes.slice(0, index + 1).every((candidate) => completed.has(candidate.id));
        items.push({ kind: "chest", chest: { id, gemsReward: 20, unlocked, claimed: claimed.has(id) } });
      }
    });
    return {
      id: branch.id,
      number: unitIndex + 1,
      title: branch.title,
      arabic: getBranchArabic(branch.id),
      done: nodes.filter((node) => completed.has(node.id)).length,
      total: nodes.length,
      premiumLocked: unitIndex >= premiumFrom,
      items
    };
  });
}

const TOPIC_DONE: Record<string, number> = { foundation: 4, prayer: 5, aqidah: 20, manners: 7 };

function Screen({ state }: { state: State }) {
  const topicId = state === "prayer" || state === "card" ? "prayer" : "foundation";
  const sec = section(topicId);
  const [tab, setTab] = useState<TabKey>("learn");
  const [pickerOpen, setPickerOpen] = useState(state === "topics");

  const { units, openId, focusId } = useMemo((): { units: PathUnit[]; openId?: string; focusId?: string } => {
    if (state === "prayer" || state === "card") {
      const built = buildUnits(sec, 5, new Set(["prayer-wudu-chest"]), 4, 99);
      const current = built.flatMap((unit) => unit.items).find((item) => item.kind === "node" && item.node.status === "current");
      return { units: built, openId: state === "card" && current?.kind === "node" ? current.node.id : undefined };
    }
    if (state === "chest") {
      return { units: buildUnits(sec, 5, new Set(["foundation-greetings-chest"])), focusId: "foundation-daily-words-chest" };
    }
    if (state === "done") {
      // Every node finished and every chest opened: the end trophy is gold. Focus the last chest.
      const all = buildUnits(sec, sec.nodes.length, new Set(), 99, 99);
      const chests = all.flatMap((unit) => unit.items).flatMap((item) => (item.kind === "chest" ? [item.chest] : []));
      chests.forEach((chest) => {
        chest.claimed = true;
      });
      return { units: all, focusId: chests[chests.length - 1]?.id };
    }
    const built = buildUnits(sec, 0, new Set());
    if (state === "premium") {
      const node = built[3]?.items.find((item) => item.kind === "node");
      return { units: built, openId: node?.kind === "node" ? node.node.id : undefined };
    }
    const locked = built[1]?.items.filter((item) => item.kind === "node")[1];
    return { units: built, openId: state === "locked" && locked?.kind === "node" ? locked.node.id : undefined };
  }, [sec, state]);

  const topics = COURSE.sections.map((candidate) => ({
    topicId: candidate.topicId,
    title: candidate.title,
    accent: candidate.accentColor,
    arabic: getTopicArabic(candidate.topicId),
    done: TOPIC_DONE[candidate.topicId] ?? 0,
    total: candidate.nodes.length
  }));

  return (
    <View style={styles.root}>
      <AppTopBar
        topicId={topicId}
        topicTitle={sec.title}
        accent={sec.accentColor}
        streakDays={topicId === "prayer" ? 12 : 0}
        gems={topicId === "prayer" ? 1250 : 500}
        hearts={topicId === "prayer" ? { current: 0, max: 5, unlimited: true } : { current: 5, max: 5, unlimited: false }}
        onOpenTopics={() => setPickerOpen(true)}
        onOpenShop={() => setTab("shop")}
      />
      <LearnPath
        key={state}
        accent={sec.accentColor}
        topicId={topicId}
        mascotVariant={sec.mascot}
        units={units}
        xpForNode={(node) => node.xpReward}
        onStartNode={() => undefined}
        onClaimChest={() => undefined}
        onTestOut={() => undefined}
        onPremium={() => setTab("shop")}
        onNextTopic={() => setPickerOpen(true)}
        initialOpenNodeId={openId}
        initialFocusId={focusId}
      />
      <BottomTabs active={tab} onChange={setTab} dots={{ crew: true }} />
      <TopicPicker
        visible={pickerOpen}
        onClose={() => setPickerOpen(false)}
        topics={topics}
        activeTopicId={topicId}
        onSelect={() => undefined}
      />
    </View>
  );
}

function TabsSheet() {
  const keys: TabKey[] = ["learn", "practice", "crew", "shop", "me"];
  return (
    <ScrollView style={styles.root} contentContainerStyle={styles.tabsList}>
      {keys.map((key) => (
        <View key={key} style={styles.tabsCell}>
          <BottomTabs active={key} onChange={() => undefined} dots={key === "learn" ? { shop: true } : undefined} bottomInset={6} />
        </View>
      ))}
    </ScrollView>
  );
}

/** Learn area gallery. States: #gallery-learn-foundation | prayer | card | locked | chest | premium | done | topics | tabs. */
export default function LearnGallery() {
  const [state, setState] = useState<State>(readState);

  useEffect(() => {
    if (Platform.OS !== "web" || typeof window === "undefined") return undefined;
    const onChange = () => setState(readState());
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);

  if (state === "tabs") return <TabsSheet />;
  return <Screen key={state} state={state} />;
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.snow
  },
  tabsList: {
    paddingVertical: 24,
    gap: 24,
    backgroundColor: colors.mist,
    flexGrow: 1
  },
  tabsCell: {
    backgroundColor: colors.white
  }
});
