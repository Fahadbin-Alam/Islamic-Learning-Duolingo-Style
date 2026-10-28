import React, { useEffect, useMemo, useState } from "react";
import { Platform, ScrollView, StyleSheet, Text, TextInput, View, type DimensionValue } from "react-native";
import type { ArabicTerm } from "../../data/arabicTerms";
import { ArabicText } from "../ArabicText";
import { Icon, topicIcon, type IconName } from "../Icon";
import { ProgressBar } from "../ProgressBar";
import { Sheet } from "../Sheet";
import { Tappable } from "../Tappable";
import { colors, darken, fonts, lighten, text, topicPalette } from "../theme";
import { isRtlLanguage, t } from "../../i18n";
import type { TopicSearchHit } from "../../utils/topicSearch";

export type TopicPickerUnit = {
  id: string;
  title: string;
  arabic?: ArabicTerm;
  done: number;
  total: number;
  /** On a family tree (Scholars): the unit's row, oldest first, with its years and who it learned from. */
  tree?: { row: number; years: string; note: string };
};

export type TopicPickerTopic = {
  topicId: string;
  title: string;
  accent: string;
  arabic?: ArabicTerm;
  done: number;
  total: number;
  /**
   * The topic's sub-topics (a companion, a surah). With two or more, tapping the tile opens their list, and the
   * learner picks one to learn on its own, or the whole topic.
   */
  units?: TopicPickerUnit[];
};

export type TopicPickerProps = {
  visible: boolean;
  onClose: () => void;
  topics: TopicPickerTopic[];
  activeTopicId: string;
  /** The sub-topic the path shows on its own, if any. */
  activeUnitId?: string;
  /** A tile or sub-topic row (unitId), or a search hit: a unit hit names its unit and first circle, a lesson hit its unit and circle. */
  onSelect: (topicId: string, unitId?: string, nodeId?: string) => void;
  /** Finds topics, units and lessons for the search field (searchTopics). Without it there is no search field. */
  search?: (query: string) => TopicSearchHit[];
  /** Gap above the sheet. Default 40. */
  topGap?: number;
  /** Bottom safe-area inset; tiles scroll to the screen edge and clear it. Default 0. */
  bottomInset?: number;
};

/** Topic emblem: the topic's own icon (Fasting has the dates the Prophet ﷺ broke his fast with). */
export function worldIcon(topicId: string): IconName {
  return topicIcon(topicId);
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

/** One search hit: its topic's emblem, its name, and where it sits (topic, or unit and topic). */
function SearchRow({ hit, topic, onPress }: { hit: TopicSearchHit; topic?: TopicPickerTopic; onPress: () => void }) {
  const palette = topicPalette(topic?.accent ?? colors.gem);
  const title = hit.kind === "topic" ? topic?.title ?? t(hit.title) : t(hit.title);
  const where = hit.kind === "topic" ? t("Topic") : hit.unitTitle ? `${t(hit.unitTitle)} · ${topic?.title ?? ""}` : topic?.title ?? "";
  return (
    <Tappable
      onPress={onPress}
      sound="node_tap"
      pressScale={0.97}
      accessibilityLabel={`${title}, ${where}`}
      testID={`topic-search-hit-${hit.nodeId ?? hit.unitId ?? hit.topicId}`}
      style={styles.hit}
    >
      <View style={[styles.hitEmblem, { backgroundColor: palette.main, borderBottomColor: palette.lip }]}>
        <Icon name={worldIcon(hit.topicId)} size={24} />
      </View>
      <View style={styles.hitText}>
        <Text style={styles.hitTitle} numberOfLines={2}>
          {title}
        </Text>
        <Text style={styles.hitWhere} numberOfLines={1}>
          {where}
        </Text>
      </View>
      <Icon name="chevronRight" size={20} color={colors.inkSoft} />
    </Tappable>
  );
}

function UnitRow({ unit, accent, active, onPress }: { unit: TopicPickerUnit; accent: string; active: boolean; onPress: () => void }) {
  const palette = topicPalette(accent);
  const finished = unit.total > 0 && unit.done >= unit.total;
  return (
    <Tappable
      onPress={onPress}
      sound="node_tap"
      pressScale={0.97}
      accessibilityLabel={t("{topic}, {done} of {total}", { topic: unit.title, done: unit.done, total: unit.total })}
      accessibilityState={{ selected: active }}
      testID={`topic-unit-${unit.id}`}
      style={[styles.unitRow, active ? styles.tileActive : null]}
    >
      <View style={styles.unitText}>
        <Text style={styles.unitTitle} numberOfLines={2}>
          {unit.title}
        </Text>
        {unit.arabic ? (
          <ArabicText size={15} weight="bold" color={palette.ink} style={styles.unitArabic}>
            {unit.arabic.ar}
          </ArabicText>
        ) : null}
      </View>
      {finished ? (
        <Icon name="crown" size={22} color={colors.goldLip} />
      ) : (
        <View style={styles.unitProgress}>
          <ProgressBar progress={unit.total > 0 ? unit.done / unit.total : 0} color={palette.main} height={8} style={styles.bar} />
          <Text style={styles.count} numberOfLines={1}>{`${unit.done}/${unit.total}`}</Text>
        </View>
      )}
    </Tappable>
  );
}

/** One scholar on the family tree: his name, years, who he learned from, and his progress. */
function TreeCard({ unit, accent, active, onPress }: { unit: TopicPickerUnit; accent: string; active: boolean; onPress: () => void }) {
  const palette = topicPalette(accent);
  const finished = unit.total > 0 && unit.done >= unit.total;
  return (
    <Tappable
      onPress={onPress}
      sound="node_tap"
      pressScale={0.96}
      accessibilityLabel={t("{topic}, {done} of {total}", { topic: unit.title, done: unit.done, total: unit.total })}
      accessibilityState={{ selected: active }}
      testID={`topic-unit-${unit.id}`}
      style={[styles.treeCard, { borderTopColor: palette.main }, active ? styles.tileActive : null]}
    >
      <Text style={styles.treeName} numberOfLines={2}>
        {unit.title}
      </Text>
      {unit.arabic ? (
        <ArabicText size={15} weight="bold" color={palette.ink} style={styles.treeArabic}>
          {unit.arabic.ar}
        </ArabicText>
      ) : null}
      {unit.tree ? <Text style={styles.treeYears}>{unit.tree.years}</Text> : null}
      {unit.tree ? (
        <Text style={styles.treeNote} numberOfLines={4}>
          {unit.tree.note}
        </Text>
      ) : null}
      {finished ? (
        <Icon name="crown" size={20} color={colors.goldLip} />
      ) : (
        <View style={styles.treeProgress}>
          <ProgressBar progress={unit.total > 0 ? unit.done / unit.total : 0} color={palette.main} height={6} style={styles.bar} />
          <Text style={styles.count} numberOfLines={1}>{`${unit.done}/${unit.total}`}</Text>
        </View>
      )}
    </Tappable>
  );
}

/** The units as a family tree: one row per generation, oldest at the top, a line down to the next. */
function FamilyTree({ units, accent, activeUnitId, onPick }: { units: TopicPickerUnit[]; accent: string; activeUnitId?: string; onPick: (unitId: string) => void }) {
  const palette = topicPalette(accent);
  const rows = [...new Set(units.map((unit) => unit.tree?.row ?? 0))].sort((a, b) => a - b);
  return (
    <View testID="topic-family-tree">
      <Text style={styles.treeHeading}>{t("Family tree")}</Text>
      {rows.map((row, index) => (
        <View key={row}>
          {index > 0 ? <View style={[styles.treeLink, { backgroundColor: palette.main }]} /> : null}
          <View style={styles.treeRow}>
            {units
              .filter((unit) => (unit.tree?.row ?? 0) === row)
              .map((unit) => (
                <TreeCard key={unit.id} unit={unit} accent={accent} active={unit.id === activeUnitId} onPress={() => onPick(unit.id)} />
              ))}
          </View>
        </View>
      ))}
    </View>
  );
}

/** A topic's sub-topics: the whole topic first, then each unit (a companion, a surah) to learn on its own. */
function UnitList({ topic, activeUnitId, onPick }: { topic: TopicPickerTopic; activeUnitId?: string; onPick: (unitId?: string) => void }) {
  const palette = topicPalette(topic.accent);
  return (
    <View testID={`topic-units-${topic.topicId}`}>
      <Tappable
        onPress={() => onPick(undefined)}
        sound="node_tap"
        pressScale={0.97}
        accessibilityLabel={t("All of {topic}", { topic: topic.title })}
        accessibilityState={{ selected: !activeUnitId }}
        testID="topic-unit-all"
        style={[styles.unitRow, styles.allRow, { backgroundColor: palette.main, borderColor: palette.lip, borderBottomColor: palette.lip }]}
      >
        <Icon name={worldIcon(topic.topicId)} size={30} />
        <Text style={[styles.unitTitle, styles.allTitle]} numberOfLines={2}>
          {t("All of {topic}", { topic: topic.title })}
        </Text>
      </Tappable>
      {(topic.units ?? []).every((unit) => unit.tree) ? (
        <FamilyTree units={topic.units ?? []} accent={topic.accent} activeUnitId={activeUnitId} onPick={onPick} />
      ) : (
        (topic.units ?? []).map((unit) => (
          <UnitRow key={unit.id} unit={unit} accent={topic.accent} active={unit.id === activeUnitId} onPress={() => onPick(unit.id)} />
        ))
      )}
    </View>
  );
}

/** Full-height sheet with a search field and a grid of topic worlds; while the field has text, its hits replace the grid. */
export function TopicPicker({ visible, onClose, topics, activeTopicId, activeUnitId, onSelect, search, topGap = 40, bottomInset = 0 }: TopicPickerProps) {
  const [gridWidth, setGridWidth] = useState(0);
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const hits = useMemo(() => (search && query.trim() ? search(query) : undefined), [query, search]);
  const topicById = useMemo(() => new Map(topics.map((topic) => [topic.topicId, topic])), [topics]);
  const rtl = isRtlLanguage();
  // The topic whose sub-topics are listed; the grid shows again each time the sheet opens.
  const [openTopicId, setOpenTopicId] = useState<string | undefined>(undefined);

  // Each opening starts on the grid.
  useEffect(() => {
    if (!visible) {
      setQuery("");
      setOpenTopicId(undefined);
    }
  }, [visible]);
  const openTopic = topics.find((topic) => topic.topicId === openTopicId);
  const columns = gridWidth > 0 && gridWidth < 260 ? 1 : 2;
  const tileWidth: DimensionValue = gridWidth > 0 ? Math.floor((gridWidth - GAP * (columns - 1)) / columns) : "47%";

  return (
    <Sheet visible={visible} onClose={onClose} bottomInset={0} style={[styles.sheet, { top: topGap, paddingBottom: 0 }]} testID="topic-picker">
      <View style={styles.header}>
        {openTopic ? (
          <Tappable onPress={() => setOpenTopicId(undefined)} accessibilityLabel={t("Back")} testID="topic-picker-back" style={[styles.close, styles.back]} hitSlop={8} pressScale={0.88}>
            <Icon name="arrowLeft" size={22} color={colors.inkSoft} />
          </Tappable>
        ) : null}
        <Text style={styles.heading} numberOfLines={2}>
          {openTopic ? openTopic.title : t("Choose a topic")}
        </Text>
        <Tappable onPress={onClose} accessibilityLabel={t("Close")} testID="topic-picker-close" style={styles.close} hitSlop={8} pressScale={0.88}>
          <Icon name="close" size={22} color={colors.inkSoft} />
        </Tappable>
      </View>
      {search ? (
        <View style={[styles.searchBox, focused ? styles.searchBoxFocused : null]}>
          <Icon name="search" size={20} />
          <TextInput
            value={query}
            onChangeText={setQuery}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder={t("Search topics and people")}
            placeholderTextColor={colors.inkSoft}
            returnKeyType="search"
            autoCorrect={false}
            autoCapitalize="none"
            accessibilityLabel={t("Search topics and people")}
            testID="topic-search"
            style={[styles.searchInput, { textAlign: rtl ? "right" : "left", writingDirection: rtl ? "rtl" : "ltr" }]}
          />
          {query ? (
            <Tappable onPress={() => setQuery("")} accessibilityLabel={t("Clear search")} testID="topic-search-clear" hitSlop={8} pressScale={0.88} style={styles.searchClear}>
              <Icon name="close" size={14} color={colors.white} />
            </Tappable>
          ) : null}
        </View>
      ) : null}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={{ paddingBottom: 32 + bottomInset }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
      >
        {hits ? (
          <View style={styles.hits} testID="topic-search-results">
            {hits.length ? (
              hits.map((hit) => (
                <SearchRow
                  key={`${hit.kind}-${hit.nodeId ?? hit.unitId ?? hit.topicId}`}
                  hit={hit}
                  topic={topicById.get(hit.topicId)}
                  onPress={() => {
                    onSelect(hit.topicId, hit.unitId, hit.nodeId);
                    onClose();
                  }}
                />
              ))
            ) : (
              <Text style={styles.noHits} testID="topic-search-empty">
                {t("Nothing found. Try another name.")}
              </Text>
            )}
          </View>
        ) : openTopic ? (
          <UnitList
            topic={openTopic}
            activeUnitId={openTopic.topicId === activeTopicId ? activeUnitId : undefined}
            onPick={(unitId) => {
              onSelect(openTopic.topicId, unitId);
              onClose();
            }}
          />
        ) : (
          <View style={styles.grid} onLayout={(event) => setGridWidth(event.nativeEvent.layout.width)}>
            {topics.map((topic) => (
              <TopicTile
                key={topic.topicId}
                topic={topic}
                width={tileWidth}
                active={topic.topicId === activeTopicId}
                onPress={() => {
                  if ((topic.units?.length ?? 0) > 1) {
                    setOpenTopicId(topic.topicId);
                    return;
                  }
                  onSelect(topic.topicId);
                  onClose();
                }}
              />
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
  unitRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    minHeight: 64,
    marginBottom: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 2,
    borderColor: colors.line,
    borderBottomWidth: 5,
    borderBottomColor: colors.lineLip,
    borderRadius: 18,
    backgroundColor: colors.white
  },
  allRow: {
    justifyContent: "flex-start"
  },
  unitText: {
    flex: 1,
    minWidth: 0
  },
  unitTitle: {
    fontFamily: fonts.displayHeavy,
    fontSize: 16,
    lineHeight: 20,
    color: colors.ink,
    flexShrink: 1
  },
  allTitle: {
    flex: 1,
    color: colors.white
  },
  unitArabic: {
    alignSelf: "flex-start",
    maxWidth: "100%"
  },
  unitProgress: {
    flexDirection: "row",
    alignItems: "center",
    width: 96
  },
  treeHeading: {
    fontFamily: fonts.displayHeavy,
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: 0.6,
    color: colors.inkSoft,
    textAlign: "center",
    marginBottom: 8
  },
  treeRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10
  },
  treeLink: {
    alignSelf: "center",
    width: 4,
    height: 18,
    borderRadius: 2
  },
  treeCard: {
    flex: 1,
    maxWidth: 220,
    minWidth: 0,
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderWidth: 2,
    borderTopWidth: 6,
    borderColor: colors.line,
    borderBottomWidth: 5,
    borderBottomColor: colors.lineLip,
    borderRadius: 18,
    backgroundColor: colors.white
  },
  treeName: {
    fontFamily: fonts.displayHeavy,
    fontSize: 15,
    lineHeight: 19,
    color: colors.ink,
    textAlign: "center"
  },
  treeArabic: {
    maxWidth: "100%"
  },
  treeYears: {
    fontFamily: fonts.displayHeavy,
    fontSize: 13,
    lineHeight: 17,
    color: colors.inkSoft
  },
  treeNote: {
    marginTop: 4,
    fontFamily: fonts.body,
    fontSize: 12,
    lineHeight: 16,
    color: colors.inkSoft,
    textAlign: "center"
  },
  treeProgress: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "stretch",
    marginTop: 6
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
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 50,
    paddingHorizontal: 14,
    marginBottom: 12,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: colors.line,
    backgroundColor: colors.mist
  },
  searchBoxFocused: {
    borderColor: colors.gem,
    backgroundColor: colors.white
  },
  searchInput: {
    flex: 1,
    minWidth: 0,
    alignSelf: "stretch",
    marginHorizontal: 10,
    fontFamily: fonts.bodyBold,
    fontSize: 16,
    color: colors.ink,
    // The box border shows focus; no browser focus ring.
    ...(Platform.OS === "web" ? ({ outlineWidth: 0, outlineStyle: "none" } as object) : null)
  },
  searchClear: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.inkSoft
  },
  hits: {
    gap: 10
  },
  hit: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: colors.line,
    borderBottomWidth: 4,
    borderBottomColor: colors.lineLip,
    backgroundColor: colors.white
  },
  hitEmblem: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderBottomWidth: 3,
    alignItems: "center",
    justifyContent: "center"
  },
  hitText: {
    flex: 1,
    minWidth: 0
  },
  hitTitle: {
    fontFamily: fonts.displayHeavy,
    fontSize: 16,
    lineHeight: 20,
    color: colors.ink
  },
  hitWhere: {
    marginTop: 2,
    fontFamily: fonts.bodyBold,
    fontSize: 13,
    lineHeight: 17,
    color: colors.inkSoft
  },
  noHits: {
    ...text.body,
    marginTop: 24,
    textAlign: "center",
    color: colors.inkSoft
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
