import React, { useEffect, useMemo, useRef, useState } from "react";
import { Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import Svg, { Path } from "react-native-svg";
import {
  CHAIN_BREAK_ROWS,
  CHAIN_LINKS,
  CHAIN_PEOPLE,
  chainName,
  chainPerson,
  chainToProphet,
  lineageOf,
  studentsOf,
  teachersOf,
  type ChainGeneration,
  type ChainLink,
  type ChainPerson
} from "../../data/scholarChains";
import { getActiveLanguage, t } from "../../i18n";
import { openSource } from "../../services/sourceLink";
import { ArabicText, withHonorifics } from "../ArabicText";
import { GameButton } from "../GameButton";
import { Icon } from "../Icon";
import { ProgressBar } from "../ProgressBar";
import { Sheet } from "../Sheet";
import { Tappable } from "../Tappable";
import { colors, darken, fonts, lighten } from "../theme";
import { useBackToClose } from "./sheetParts";

/** A scholar's own lesson unit, as the topic picker lists it. */
export type ScholarTreeUnit = { id: string; title: string; done: number; total: number; tree?: { years: string; note: string } };

/** A unit in another topic (a Sahabi's life, a Mother of the Believers), found by the picker: its title and topic. */
export type ElsewhereUnit = { title: string; topicTitle: string };

/**
 * On the web, a mouse can drag the tree: sideways moves the tree, up and down moves the page around it. A drag
 * never counts as a tap on the card it started on (`dragged` says so until the click after it has passed).
 */
function useMouseDrag(scroller: React.RefObject<ScrollView | null>) {
  const dragged = useRef(false);
  useEffect(() => {
    if (Platform.OS !== "web") return undefined;
    const node = (scroller.current as unknown as { getScrollableNode?: () => HTMLElement } | null)?.getScrollableNode?.();
    if (!node || typeof window === "undefined") return undefined;
    // The nearest box above the tree that scrolls up and down (the topic sheet's list).
    const pageOf = (element: HTMLElement) => {
      for (let box = element.parentElement; box; box = box.parentElement) {
        const overflow = window.getComputedStyle(box).overflowY;
        if ((overflow === "auto" || overflow === "scroll") && box.scrollHeight > box.clientHeight) return box;
      }
      return undefined;
    };
    let start: { x: number; y: number; left: number; top: number; page?: HTMLElement } | undefined;
    const move = (event: MouseEvent) => {
      if (!start) return;
      const dx = event.clientX - start.x;
      const dy = event.clientY - start.y;
      if (!dragged.current && Math.abs(dx) + Math.abs(dy) < 6) return;
      dragged.current = true;
      node.style.cursor = "grabbing";
      node.scrollLeft = start.left - dx;
      if (start.page) start.page.scrollTop = start.top - dy;
      event.preventDefault();
    };
    const up = () => {
      start = undefined;
      node.style.cursor = "grab";
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
      // The click that ends a drag comes right after mouseup: let it pass first.
      setTimeout(() => {
        dragged.current = false;
      }, 0);
    };
    const down = (event: MouseEvent) => {
      if (event.button !== 0) return;
      const page = pageOf(node);
      dragged.current = false;
      start = { x: event.clientX, y: event.clientY, left: node.scrollLeft, top: page?.scrollTop ?? 0, page };
      window.addEventListener("mousemove", move);
      window.addEventListener("mouseup", up);
    };
    node.style.cursor = "grab";
    node.addEventListener("mousedown", down);
    return () => {
      node.removeEventListener("mousedown", down);
      up();
    };
  }, [scroller]);
  return dragged;
}

// Card and grid sizes: three cards and a bit show on a 320 px phone, so it is clear the tree goes on sideways.
const CARD_W = 100;
const CARD_H = 66;
const COL_W = 112;
const ROW_H = 92;
const BREAK_H = 34;
const PAD = 14;

const GENERATION_COLOR: Record<ChainGeneration, string> = {
  prophet: colors.gold,
  sahabi: colors.green,
  tabii: "#16A3A3",
  tabiTabii: "#8C5CE6",
  scholar: colors.date
};

const GENERATION_LABEL: Record<ChainGeneration, string> = {
  prophet: "The Prophet ﷺ",
  sahabi: "Sahabah",
  tabii: "Tabi'in",
  tabiTabii: "Tabi' al-Tabi'in",
  scholar: "Imams and scholars"
};

/** The y of each row's top, with room for a "Centuries later" break before the rows that need one. */
function rowTop(row: number) {
  const breaks = CHAIN_BREAK_ROWS.filter((breakRow) => breakRow <= row).length;
  return PAD + row * ROW_H + breaks * BREAK_H;
}

function cardBox(person: ChainPerson) {
  return { x: PAD + person.col * COL_W, y: rowTop(person.row) };
}

const MAX_ROW = Math.max(...CHAIN_PEOPLE.map((person) => person.row));
const MAX_COL = Math.max(...CHAIN_PEOPLE.map((person) => person.col));
export const TREE_WIDTH = PAD * 2 + MAX_COL * COL_W + CARD_W;
export const TREE_HEIGHT = rowTop(MAX_ROW) + CARD_H + PAD;

/** The curve from a teacher's card down to his student's. */
function linkPath(link: ChainLink) {
  const teacher = cardBox(chainPerson(link.teacher) as ChainPerson);
  const student = cardBox(chainPerson(link.student) as ChainPerson);
  const x1 = teacher.x + CARD_W / 2;
  const y1 = teacher.y + CARD_H;
  const x2 = student.x + CARD_W / 2;
  const y2 = student.y;
  const bend = (y2 - y1) / 2;
  return `M${x1} ${y1} C${x1} ${y1 + bend} ${x2} ${y2 - bend} ${x2} ${y2}`;
}

function TreeCard({
  person,
  unit,
  state,
  onPress
}: {
  person: ChainPerson;
  unit?: ScholarTreeUnit;
  state: "plain" | "selected" | "lit" | "dim";
  onPress: () => void;
}) {
  const language = getActiveLanguage();
  const color = GENERATION_COLOR[person.generation];
  const { x, y } = cardBox(person);
  const finished = unit ? unit.total > 0 && unit.done >= unit.total : false;
  return (
    <Tappable
      onPress={onPress}
      sound="node_tap"
      pressScale={0.94}
      accessibilityLabel={chainName(person, language)}
      accessibilityState={{ selected: state === "selected" }}
      testID={`chain-person-${person.id}`}
      style={[
        styles.card,
        { left: x, top: y, borderTopColor: color },
        state === "selected" ? { borderColor: color, borderBottomColor: darken(color, 0.25), backgroundColor: lighten(color, 0.85) } : null,
        state === "dim" ? styles.cardDim : null
      ]}
    >
      <Text style={styles.cardName} numberOfLines={2}>
        {withHonorifics(chainName(person, language))}
      </Text>
      {language !== "ar" ? (
        <ArabicText size={12} weight="bold" color={colors.inkSoft} numberOfLines={1} style={styles.cardArabic}>
          {person.names.ar}
        </ArabicText>
      ) : null}
      {unit ? (
        finished ? (
          <Icon name="crown" size={14} color={colors.goldLip} />
        ) : (
          <ProgressBar progress={unit.total > 0 ? unit.done / unit.total : 0} color={color} height={4} style={styles.cardBar} />
        )
      ) : null}
    </Tappable>
  );
}

/** One teacher or student in the detail sheet: the name (tap to move to him) and the source for the link. */
function LinkRow({ personId, link, onPick }: { personId: string; link: ChainLink; onPick: (id: string) => void }) {
  const person = chainPerson(personId) as ChainPerson;
  return (
    <View style={styles.linkRow}>
      <Tappable onPress={() => onPick(personId)} pressScale={0.96} style={styles.linkName} accessibilityRole="button" testID={`chain-link-${personId}`}>
        <View style={[styles.dot, { backgroundColor: GENERATION_COLOR[person.generation] }]} />
        <Text style={styles.linkNameText} numberOfLines={2}>
          {withHonorifics(chainName(person, getActiveLanguage()))}
        </Text>
      </Tappable>
      <Tappable
        onPress={() => openSource(link.source)}
        pressScale={0.96}
        style={styles.source}
        accessibilityRole="link"
        accessibilityLabel={t("Source: {reference}", { reference: link.source.reference ?? link.source.title })}
        testID={`chain-source-${link.teacher}-${link.student}`}
      >
        <Icon name="book" size={14} />
        <Text style={styles.sourceText} numberOfLines={1}>
          {link.source.reference ?? link.source.title}
        </Text>
      </Tappable>
    </View>
  );
}

function PersonSheet({
  personId,
  unit,
  elsewhere,
  onPick,
  onOpenUnit,
  onOpenElsewhere,
  onClose
}: {
  personId?: string;
  unit?: ScholarTreeUnit;
  elsewhere?: ElsewhereUnit;
  onPick: (id: string) => void;
  onOpenUnit: (unitId: string) => void;
  onOpenElsewhere: () => void;
  onClose: () => void;
}) {
  const visible = personId !== undefined;
  useBackToClose(visible, onClose);
  const person = personId ? chainPerson(personId) : undefined;
  const language = getActiveLanguage();
  const chain = personId && personId !== "prophet" ? chainToProphet(personId) : undefined;
  const teachers = personId ? teachersOf(personId) : [];
  const students = personId ? studentsOf(personId) : [];
  return (
    <Sheet visible={visible} onClose={onClose} testID="chain-person-sheet">
      {person ? (
        <ScrollView contentContainerStyle={styles.sheetBody} showsVerticalScrollIndicator={false}>
          <View style={styles.sheetHeader}>
            <View style={styles.sheetTitleBox}>
              <Text style={[styles.badge, { backgroundColor: GENERATION_COLOR[person.generation] }]}>{withHonorifics(t(GENERATION_LABEL[person.generation]))}</Text>
              <Text style={styles.sheetTitle} accessibilityRole="header" testID="chain-person-name">
                {withHonorifics(chainName(person, language))}
              </Text>
              {language !== "ar" ? (
                <ArabicText size={16} weight="bold" color={colors.inkSoft}>
                  {person.names.ar}
                </ArabicText>
              ) : null}
              {unit?.tree?.years ? <Text style={styles.years}>{unit.tree.years}</Text> : null}
            </View>
            <Tappable onPress={onClose} accessibilityLabel={t("Close")} testID="chain-person-close" style={styles.close} hitSlop={8} pressScale={0.88}>
              <Icon name="close" size={20} color={colors.inkSoft} />
            </Tappable>
          </View>

          {unit ? (
            <View style={styles.section}>
              {unit.tree?.note ? <Text style={styles.note}>{unit.tree.note}</Text> : null}
              <GameButton
                label={unit.done > 0 && unit.done < unit.total ? t("Continue lessons") : t("Start lessons")}
                icon="book"
                onPress={() => onOpenUnit(unit.id)}
                fullWidth
                testID="chain-open-lessons"
              />
            </View>
          ) : null}

          {elsewhere ? (
            <Tappable
              onPress={onOpenElsewhere}
              pressScale={0.97}
              accessibilityRole="button"
              testID="chain-open-elsewhere"
              style={styles.elsewhere}
            >
              <Icon name="book" size={18} />
              <Text style={styles.elsewhereText} numberOfLines={2}>
                {t("Also in {topic}: {unit}", { topic: elsewhere.topicTitle, unit: elsewhere.title })}
              </Text>
              <Icon name="chevronRight" size={16} color={colors.inkSoft} />
            </Tappable>
          ) : null}

          {chain ? (
            <View style={styles.section} testID="chain-to-prophet">
              <Text style={styles.sectionTitle}>{withHonorifics(t("Chain back to the Prophet ﷺ"))}</Text>
              <View style={styles.chain}>
                {chain.map((id, index) => (
                  <React.Fragment key={id}>
                    {index > 0 ? (
                      // Points on toward the Prophet ﷺ, the way the line reads: the icon turns itself round in
                      // Arabic and Urdu, so turned once more it points right in English and left in those.
                      <View style={styles.chainArrow}>
                        <Icon name="arrowLeft" size={14} color={colors.inkSoft} />
                      </View>
                    ) : null}
                    <Text style={[styles.chainName, id === person.id ? styles.chainSelf : null]} onPress={id === person.id ? undefined : () => onPick(id)}>
                      {withHonorifics(chainName(chainPerson(id) as ChainPerson, language))}
                    </Text>
                  </React.Fragment>
                ))}
              </View>
            </View>
          ) : null}

          {teachers.length ? (
            <View style={styles.section} testID="chain-teachers">
              <Text style={styles.sectionTitle}>{t("Learned from")}</Text>
              {teachers.map((link) => (
                <LinkRow key={link.teacher} personId={link.teacher} link={link} onPick={onPick} />
              ))}
            </View>
          ) : null}

          {students.length ? (
            <View style={styles.section} testID="chain-students">
              <Text style={styles.sectionTitle}>{t("Taught")}</Text>
              {students.map((link) => (
                <LinkRow key={link.student} personId={link.student} link={link} onPick={onPick} />
              ))}
            </View>
          ) : null}

        </ScrollView>
      ) : null}
    </Sheet>
  );
}

/**
 * The scholars as one big family tree, the Prophet ﷺ at the top: each line is a teacher and his student, with a
 * source. It is wider than the phone, so it pans left and right. Tapping someone lights up his chain above and his
 * students below, and opens his teachers, students and sources; the seven imams with lessons open them from there.
 */
export function ScholarTree({
  units,
  onPick,
  findElsewhere,
  onPickElsewhere
}: {
  units: ScholarTreeUnit[];
  onPick: (unitId: string) => void;
  /** Looks up a unit in another topic, for the people who also have one there (a Sahabi's life, Aishah as a wife). */
  findElsewhere?: (topicId: string, unitId: string) => ElsewhereUnit | undefined;
  onPickElsewhere?: (topicId: string, unitId: string) => void;
}) {
  const [selected, setSelected] = useState<string | undefined>(undefined);
  const [sheetOpen, setSheetOpen] = useState(false);
  const scroller = useRef<ScrollView>(null);
  const [viewWidth, setViewWidth] = useState(0);
  const unitById = useMemo(() => new Map(units.map((unit) => [unit.id, unit])), [units]);
  const lineage = useMemo(() => (selected ? lineageOf(selected) : undefined), [selected]);

  const stateOf = (id: string): "plain" | "selected" | "lit" | "dim" => {
    if (!selected || !lineage) return "plain";
    if (id === selected) return "selected";
    return lineage.above.has(id) || lineage.below.has(id) ? "lit" : "dim";
  };
  const linkLit = (link: ChainLink) => {
    if (!selected || !lineage) return false;
    const up = (id: string) => id === selected || lineage.above.has(id);
    const down = (id: string) => id === selected || lineage.below.has(id);
    return (up(link.teacher) && up(link.student)) || (down(link.teacher) && down(link.student));
  };

  const dragged = useMouseDrag(scroller);

  // Moves to someone: lights up his lines and brings his card into view.
  const pick = (id: string) => {
    setSelected(id);
    setSheetOpen(true);
    const person = chainPerson(id);
    if (person && viewWidth > 0) {
      scroller.current?.scrollTo({ x: Math.max(0, cardBox(person).x + CARD_W / 2 - viewWidth / 2), animated: true });
    }
  };

  const selectedPerson = selected ? chainPerson(selected) : undefined;
  const alsoIn = selectedPerson?.alsoIn;
  const elsewhere = alsoIn && findElsewhere ? findElsewhere(alsoIn.topicId, alsoIn.unitId) : undefined;
  const lit = CHAIN_LINKS.filter(linkLit);
  const unlit = CHAIN_LINKS.filter((link) => !linkLit(link));

  return (
    <View testID="topic-family-tree">
      <Text style={styles.heading}>{t("Family tree")}</Text>
      <Text style={styles.hint}>{t("Tap anyone to learn about them and see who taught whom. Drag or swipe to move around.")}</Text>
      <View style={styles.legend}>
        {(Object.keys(GENERATION_LABEL) as ChainGeneration[]).map((generation) => (
          <View key={generation} style={styles.legendItem}>
            <View style={[styles.dot, { backgroundColor: GENERATION_COLOR[generation] }]} />
            <Text style={styles.legendText}>{withHonorifics(t(GENERATION_LABEL[generation]))}</Text>
          </View>
        ))}
      </View>
      <ScrollView
        ref={scroller}
        horizontal
        nestedScrollEnabled
        showsHorizontalScrollIndicator
        style={styles.frame}
        testID="chain-tree-scroll"
        onLayout={(event) => {
          const width = event.nativeEvent.layout.width;
          if (viewWidth === 0 && width > 0) {
            // Opens on the Prophet ﷺ at the top, in the middle of the tree.
            const prophet = cardBox(chainPerson("prophet") as ChainPerson);
            requestAnimationFrame(() => scroller.current?.scrollTo({ x: Math.max(0, prophet.x + CARD_W / 2 - width / 2), animated: false }));
          }
          setViewWidth(width);
        }}
      >
        <View style={[styles.canvas, { width: TREE_WIDTH, height: TREE_HEIGHT }]} testID="chain-tree">
          <Svg width={TREE_WIDTH} height={TREE_HEIGHT} style={StyleSheet.absoluteFill} pointerEvents="none">
            {unlit.map((link) => (
              <Path key={`${link.teacher}-${link.student}`} d={linkPath(link)} stroke={selected ? colors.line : colors.lineLip} strokeWidth={2.5} fill="none" />
            ))}
            {lit.map((link) => (
              <Path
                key={`${link.teacher}-${link.student}`}
                d={linkPath(link)}
                stroke={GENERATION_COLOR[(chainPerson(link.teacher) as ChainPerson).generation]}
                strokeWidth={4}
                strokeLinecap="round"
                fill="none"
              />
            ))}
          </Svg>
          {CHAIN_BREAK_ROWS.map((row) => (
            <View key={row} style={[styles.break, { top: rowTop(row) - BREAK_H - 4, width: TREE_WIDTH - PAD * 2 }]} pointerEvents="none">
              <View style={styles.breakLine} />
              <Text style={styles.breakText}>{t("Centuries later")}</Text>
              <View style={styles.breakLine} />
            </View>
          ))}
          {CHAIN_PEOPLE.map((person) => (
            <TreeCard key={person.id} person={person} unit={person.unitId ? unitById.get(person.unitId) : undefined} state={stateOf(person.id)} onPress={() => !dragged.current && pick(person.id)} />
          ))}
        </View>
      </ScrollView>
      <PersonSheet
        personId={sheetOpen ? selected : undefined}
        unit={selectedPerson?.unitId ? unitById.get(selectedPerson.unitId) : undefined}
        elsewhere={elsewhere}
        onPick={pick}
        onOpenElsewhere={() => {
          setSheetOpen(false);
          if (alsoIn) onPickElsewhere?.(alsoIn.topicId, alsoIn.unitId);
        }}
        onOpenUnit={(unitId) => {
          setSheetOpen(false);
          onPick(unitId);
        }}
        onClose={() => setSheetOpen(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontFamily: fonts.displayHeavy,
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: 0.6,
    color: colors.inkSoft,
    textAlign: "center"
  },
  hint: {
    marginTop: 2,
    marginBottom: 8,
    fontFamily: fonts.body,
    fontSize: 13,
    lineHeight: 18,
    color: colors.inkSoft,
    textAlign: "center"
  },
  legend: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    columnGap: 10,
    rowGap: 4,
    marginBottom: 8
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4
  },
  legendText: {
    fontFamily: fonts.bodyBold,
    fontSize: 12,
    lineHeight: 16,
    color: colors.inkSoft
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5
  },
  frame: {
    borderRadius: 18,
    backgroundColor: colors.mist
  },
  canvas: {
    direction: "ltr"
  },
  card: {
    position: "absolute",
    width: CARD_W,
    height: CARD_H,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 4,
    paddingVertical: 4,
    borderWidth: 2,
    borderTopWidth: 5,
    borderColor: colors.line,
    borderBottomWidth: 4,
    borderBottomColor: colors.lineLip,
    borderRadius: 14,
    backgroundColor: colors.white
  },
  cardDim: {
    opacity: 0.4
  },
  cardName: {
    fontFamily: fonts.displayHeavy,
    fontSize: 12,
    lineHeight: 15,
    color: colors.ink,
    textAlign: "center"
  },
  cardArabic: {
    maxWidth: "100%"
  },
  cardBar: {
    alignSelf: "stretch",
    marginTop: 2,
    marginHorizontal: 6
  },
  break: {
    position: "absolute",
    left: PAD,
    height: BREAK_H,
    flexDirection: "row",
    alignItems: "center",
    gap: 8
  },
  breakLine: {
    flex: 1,
    height: 0,
    borderTopWidth: 2,
    borderStyle: "dashed",
    borderColor: colors.lineLip
  },
  breakText: {
    fontFamily: fonts.bodyBold,
    fontSize: 12,
    color: colors.inkSoft
  },
  sheetBody: {
    paddingBottom: 12
  },
  sheetHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10
  },
  sheetTitleBox: {
    flex: 1,
    minWidth: 0,
    alignItems: "flex-start"
  },
  badge: {
    overflow: "hidden",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    fontFamily: fonts.bodyHeavy,
    fontSize: 12,
    color: colors.white
  },
  sheetTitle: {
    marginTop: 4,
    fontFamily: fonts.displayHeavy,
    fontSize: 22,
    lineHeight: 28,
    color: colors.ink
  },
  years: {
    fontFamily: fonts.displayHeavy,
    fontSize: 13,
    color: colors.inkSoft
  },
  close: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.mist
  },
  section: {
    marginTop: 14
  },
  sectionTitle: {
    marginBottom: 6,
    fontFamily: fonts.displayHeavy,
    fontSize: 15,
    lineHeight: 20,
    color: colors.ink
  },
  chain: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 4
  },
  chainArrow: {
    transform: [{ scaleX: -1 }]
  },
  chainName: {
    fontFamily: fonts.bodyBold,
    fontSize: 14,
    lineHeight: 20,
    color: colors.correctInk,
    textDecorationLine: "underline"
  },
  chainSelf: {
    color: colors.ink,
    textDecorationLine: "none"
  },
  linkRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 8,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: colors.line
  },
  linkName: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    flexGrow: 1,
    flexShrink: 1,
    minWidth: 120
  },
  linkNameText: {
    flexShrink: 1,
    fontFamily: fonts.bodyHeavy,
    fontSize: 14,
    lineHeight: 19,
    color: colors.ink
  },
  source: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    maxWidth: "100%",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: colors.mist
  },
  sourceText: {
    flexShrink: 1,
    fontFamily: fonts.bodyBold,
    fontSize: 12,
    color: colors.inkSoft
  },
  elsewhere: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 2,
    borderColor: colors.line,
    borderBottomWidth: 4,
    borderBottomColor: colors.lineLip,
    borderRadius: 14,
    backgroundColor: colors.white
  },
  elsewhereText: {
    flex: 1,
    fontFamily: fonts.bodyHeavy,
    fontSize: 14,
    lineHeight: 19,
    color: colors.ink
  },
  note: {
    marginBottom: 10,
    fontFamily: fonts.body,
    fontSize: 14,
    lineHeight: 19,
    color: colors.inkSoft
  }
});
