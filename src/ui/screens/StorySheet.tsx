import React, { useEffect, useMemo, useRef, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import type { Story, StoryGroup, StoryScene } from "../../data/stories";
import { t } from "../../i18n";
import { localizeLessonContent, translateStudyText } from "../../services/contentLocalization";
import { openSource } from "../../services/sourceLink";
import type { Challenge, SupportedLanguage } from "../../types";
import { withHonorifics } from "../ArabicText";
import { ChoiceTile, type ChoiceTileState } from "../ChoiceTile";
import { GameButton } from "../GameButton";
import { Icon } from "../Icon";
import { LessonPhoto } from "../lesson/LessonPhoto";
import { noBreakHyphens } from "../lesson/lessonText";
import { localizedWhy } from "../lesson/localizedLines";
import { Teacher, talkTime, teacherFor } from "../lesson/Teacher";
import { PopIn } from "../PopIn";
import { ProgressBar } from "../ProgressBar";
import { Sheet } from "../Sheet";
import { feedback } from "../sound";
import { SpeechBubble } from "../SpeechBubble";
import { Tappable } from "../Tappable";
import { colors, fonts, lighten, text, topicPalette } from "../theme";
import { useBackToClose } from "./sheetParts";

export type StorySheetProps = {
  visible: boolean;
  onClose: () => void;
  /** Every story, in order (src/data/stories.ts). */
  stories: readonly Story[];
  /** Ids of the stories already read to the end. */
  readIds: ReadonlySet<string>;
  /** The shelf the sheet opens on. */
  group?: StoryGroup;
  /** Opens straight into this story. */
  storyId?: string;
  language: SupportedLanguage;
  mascotVariant: string;
  accent: string;
  /** A story read to the end, with how many questions were right on the first try. Returns the XP it gave. */
  onFinish: (storyId: string, firstTryRight: number) => number;
  topGap?: number;
  bottomInset?: number;
};

const GROUPS: StoryGroup[] = ["seerah", "sahaba"];

/** "Part 2 of 5" under a story told in parts. */
function partLabel(story: Story) {
  return story.parts > 1 ? t("Part {part} of {parts}", { part: story.part, parts: story.parts }) : undefined;
}

type Step = { kind: "scene"; scene: StoryScene; index: number } | { kind: "question"; question: Challenge; index: number };

/** A story as the steps it is read in: each scene, and its question right after it. */
export function storySteps(story: Story): Step[] {
  return story.scenes.flatMap((scene, index): Step[] => [
    { kind: "scene", scene, index },
    ...(scene.question ? [{ kind: "question" as const, question: scene.question, index }] : [])
  ]);
}

function StoryRow({ story, read, accent, onPress }: { story: Story; read: boolean; accent: string; onPress: () => void }) {
  const palette = topicPalette(accent);
  const part = partLabel(story);
  return (
    <Tappable onPress={onPress} sound="node_tap" pressScale={0.97} accessibilityLabel={[t(story.title), part, read ? t("Read") : undefined].filter(Boolean).join(", ")} testID={`story-row-${story.id}`} style={styles.row}>
      <View style={[styles.cover, { backgroundColor: palette.light, borderColor: palette.soft }]}>
        {story.cover ? <Image source={story.cover.image} style={styles.coverImage} resizeMode="cover" /> : <Icon name="scroll" size={30} />}
        {read ? (
          <View style={styles.readBadge} testID={`story-read-${story.id}`}>
            <Icon name="check" size={13} color={colors.white} />
          </View>
        ) : null}
      </View>
      <View style={styles.rowText}>
        <Text style={styles.rowTitle} numberOfLines={2}>
          {withHonorifics(noBreakHyphens(t(story.title)))}
        </Text>
        <Text style={styles.rowLine} numberOfLines={1}>
          {[part, t("{count} scenes", { count: story.scenes.length })].filter(Boolean).join(" · ")}
        </Text>
      </View>
      <Icon name="chevronRight" size={20} color={colors.inkSoft} />
    </Tappable>
  );
}

function SceneView({ scene, language, accent, mascotVariant, look, talk }: { scene: StoryScene; language: SupportedLanguage; accent: string; mascotVariant: string; look: ReturnType<typeof teacherFor>; talk: boolean }) {
  const palette = topicPalette(accent);
  const lesson = useMemo(() => localizeLessonContent(scene.lesson, language), [language, scene.lesson]);
  const line = lesson.learnLine ?? lesson.intro;
  const source = scene.source;
  const facts = lesson.learnFacts ?? [];
  return (
    <PopIn from="up">
      <View style={styles.scene} testID={`story-scene-${scene.lesson.id}`}>
      <Text style={[styles.sceneTitle, { color: palette.ink }]} numberOfLines={2}>
        {withHonorifics(noBreakHyphens(lesson.title))}
      </Text>
      <View style={styles.tellRow}>
        <Teacher look={look} variant={mascotVariant} accent={accent} size={58} talkMs={talk ? talkTime(line) : 0} testID="story-teacher" />
        <SpeechBubble style={styles.bubble}>{line}</SpeechBubble>
      </View>
      {scene.picture ? <LessonPhoto picture={scene.picture} short delay={120} /> : null}
      {facts.length ? (
        <View style={styles.facts}>
          {facts.map((fact) => (
            <View key={fact} style={styles.factRow}>
              <View style={[styles.factDot, { backgroundColor: palette.main }]} />
              <Text style={styles.factText}>{withHonorifics(noBreakHyphens(fact))}</Text>
            </View>
          ))}
        </View>
      ) : null}
      {source?.summary ? (
        <View style={[styles.told, { backgroundColor: palette.light, borderColor: palette.soft }]} testID="story-source">
          <Text style={[styles.toldLabel, { color: palette.ink }]}>{t("What the source says")}</Text>
          <Text style={styles.toldText}>{withHonorifics(noBreakHyphens(source.summary))}</Text>
          <Tappable onPress={() => openSource(source)} sound="soft_ui" pressScale={0.96} accessibilityRole="link" accessibilityLabel={`${t("Open source")}: ${source.reference ?? source.title}`} style={styles.sourceChip} testID="story-source-chip">
            <Icon name="bookOpen" size={16} />
            <Text style={styles.sourceText} numberOfLines={2}>
              {[source.reference ?? source.title, source.grade && source.grade !== "Quran" ? source.grade : undefined].filter(Boolean).join(" · ")}
            </Text>
          </Tappable>
        </View>
      ) : null}
      </View>
    </PopIn>
  );
}

function QuestionView({ question, language, tried, solved, onPick }: { question: Challenge; language: SupportedLanguage; tried: string[]; solved: boolean; onPick: (choiceId: string) => void }) {
  const why = solved ? localizedWhy(question, language) : undefined;
  const prompt = translateStudyText(question.prompt, language);
  const choices = useMemo(() => question.choices.map((choice) => ({ ...choice, label: translateStudyText(choice.label, language) })), [language, question.choices]);
  const stateOf = (id: string): ChoiceTileState => {
    if (solved) return id === question.correctChoiceId ? "correct" : "disabled";
    return tried.includes(id) ? "wrong" : "idle";
  };
  return (
    <PopIn from="up">
      <View style={styles.question} testID={`story-question-${question.id}`}>
      <View style={styles.questionHead}>
        <Icon name="star8" size={20} />
        <Text style={styles.questionEyebrow}>{t("Your turn")}</Text>
      </View>
      <Text style={styles.prompt}>{withHonorifics(noBreakHyphens(prompt))}</Text>
      <View style={styles.choices}>
        {choices.map((choice) => (
          <ChoiceTile
            key={choice.id}
            label={choice.label}
            state={stateOf(choice.id)}
            onPress={solved || tried.includes(choice.id) ? undefined : () => onPick(choice.id)}
            testID={`story-choice-${question.id}-${choice.id}`}
          />
        ))}
      </View>
      {why ? (
        <PopIn from="up">
          <View style={styles.why} testID={`story-why-${question.id}`}>
            <Icon name="check" size={18} color={colors.correctInk} />
            <Text style={styles.whyText}>{withHonorifics(why)}</Text>
          </View>
        </PopIn>
      ) : tried.length ? (
        <Text style={styles.tryAgain} testID={`story-try-again-${question.id}`}>
          {t("Not quite. Try again!")}
        </Text>
      ) : null}
      </View>
    </PopIn>
  );
}

function StoryPlayer({
  story,
  next,
  language,
  mascotVariant,
  accent,
  onFinish,
  onNext,
  onDone,
  bottomInset
}: {
  story: Story;
  next?: Story;
  language: SupportedLanguage;
  mascotVariant: string;
  accent: string;
  onFinish: (firstTryRight: number) => number;
  onNext: () => void;
  onDone: () => void;
  bottomInset: number;
}) {
  const steps = useMemo(() => storySteps(story), [story]);
  const [shown, setShown] = useState(1);
  const [tried, setTried] = useState<Record<string, string[]>>({});
  const [solved, setSolved] = useState<Record<string, boolean>>({});
  const [result, setResult] = useState<{ xp: number; right: number; asked: number }>();
  const scroll = useRef<ScrollView>(null);
  const look = teacherFor(story.topicId);

  useEffect(() => {
    const timer = setTimeout(() => scroll.current?.scrollToEnd({ animated: true }), 80);
    return () => clearTimeout(timer);
  }, [shown, solved]);

  const last = steps[shown - 1];
  const waiting = last?.kind === "question" && !solved[last.question.id];
  const asked = steps.filter((step) => step.kind === "question");

  const pick = (question: Challenge, choiceId: string) => {
    if (choiceId === question.correctChoiceId) {
      feedback("correct", "success");
      setSolved((before) => ({ ...before, [question.id]: true }));
    } else {
      feedback("wrong", "error");
      setTried((before) => ({ ...before, [question.id]: [...(before[question.id] ?? []), choiceId] }));
    }
  };

  const goOn = () => {
    if (waiting) return;
    if (shown < steps.length) {
      setShown(shown + 1);
      return;
    }
    const right = asked.filter((step) => step.kind === "question" && !(tried[step.question.id]?.length)).length;
    feedback("lesson_complete", "success");
    setResult({ xp: onFinish(right), right, asked: asked.length });
  };

  if (result) {
    return (
      <View style={[styles.done, { paddingBottom: 24 + bottomInset }]} testID="story-complete">
        <PopIn from="scale">
          <Teacher look={look} variant={mascotVariant} accent={accent} size={120} mood="cheer" talkMs={1200} testID="story-teacher-done" />
        </PopIn>
        <Text style={styles.doneTitle}>{t("Story complete!")}</Text>
        <Text style={styles.doneLine} numberOfLines={2}>
          {withHonorifics(noBreakHyphens(t(story.title)))}
        </Text>
        <View style={styles.doneStats}>
          <View style={styles.stat} testID="story-xp">
            <Icon name="bolt" size={22} />
            <Text style={styles.statText}>{t("{count} XP", { count: result.xp })}</Text>
          </View>
          {result.asked ? (
            <View style={styles.stat} testID="story-right">
              <Icon name="check" size={20} color={colors.correctInk} />
              <Text style={styles.statText}>{`${result.right}/${result.asked}`}</Text>
            </View>
          ) : null}
        </View>
        <View style={styles.doneButtons}>
          {next ? <GameButton label={t("Next story")} fullWidth onPress={onNext} testID="story-next" /> : null}
          <GameButton label={t("Done")} variant={next ? "secondary" : "primary"} fullWidth onPress={onDone} testID="story-done" />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.player} testID={`story-player-${story.id}`}>
      <ProgressBar progress={shown / (steps.length + 1)} color={topicPalette(accent).main} height={12} style={styles.progress} />
      <ScrollView ref={scroll} style={styles.scroll} contentContainerStyle={styles.playerContent} showsVerticalScrollIndicator={false}>
        {steps.slice(0, shown).map((step, index) =>
          step.kind === "scene" ? (
            <SceneView key={`scene-${step.index}`} scene={step.scene} language={language} accent={accent} mascotVariant={mascotVariant} look={look} talk={index === shown - 1} />
          ) : (
            <QuestionView
              key={`question-${step.question.id}`}
              question={step.question}
              language={language}
              tried={tried[step.question.id] ?? []}
              solved={Boolean(solved[step.question.id])}
              onPick={(choiceId) => pick(step.question, choiceId)}
            />
          )
        )}
      </ScrollView>
      <View style={[styles.footer, { paddingBottom: 12 + bottomInset }]}>
        <GameButton
          label={shown >= steps.length ? t("Finish story") : t("Continue")}
          fullWidth
          disabled={waiting}
          sound={waiting ? false : "soft_ui"}
          onPress={goOn}
          testID="story-continue"
        />
      </View>
    </View>
  );
}

/**
 * Story mode: the Seerah and the Companions told as stories. Opens on a shelf of stories (Seerah or Sahabah);
 * a story is read scene by scene, the teacher telling each one with its source, and a question after every
 * second scene. A wrong answer can be tried again; only first-try answers give XP.
 */
export function StorySheet({ visible, onClose, stories, readIds, group = "seerah", storyId, language, mascotVariant, accent, onFinish, topGap = 40, bottomInset = 0 }: StorySheetProps) {
  const [shelf, setShelf] = useState<StoryGroup>(group);
  const [openId, setOpenId] = useState<string | undefined>(storyId);
  const [round, setRound] = useState(0);
  const open = openId ? stories.find((story) => story.id === openId) : undefined;
  const list = stories.filter((story) => story.group === shelf);
  useBackToClose(visible, open ? () => setOpenId(undefined) : onClose);

  useEffect(() => {
    if (visible) {
      setShelf(group);
      setOpenId(storyId);
    }
  }, [group, storyId, visible]);

  const openStory = (id: string) => {
    setRound((value) => value + 1);
    setOpenId(id);
  };
  const next = open ? stories[stories.indexOf(open) + 1] : undefined;
  const firstUnread = list.find((story) => !readIds.has(story.id));
  const readCount = list.filter((story) => readIds.has(story.id)).length;

  return (
    <Sheet visible={visible} onClose={onClose} bottomInset={0} style={[styles.sheet, { top: topGap, paddingBottom: 0 }]} testID="story-sheet">
      <View style={styles.header}>
        {open ? (
          <Tappable onPress={() => setOpenId(undefined)} accessibilityLabel={t("All stories")} testID="story-sheet-back" style={[styles.close, styles.back]} hitSlop={8} pressScale={0.88}>
            <Icon name="arrowLeft" size={22} color={colors.inkSoft} />
          </Tappable>
        ) : null}
        <View style={styles.headerText}>
          <Text style={styles.heading} accessibilityRole="header" numberOfLines={2}>
            {open ? withHonorifics(noBreakHyphens(t(open.title))) : t("Story mode")}
          </Text>
          {open && partLabel(open) ? <Text style={styles.headerPart}>{partLabel(open)}</Text> : null}
        </View>
        <Tappable onPress={onClose} accessibilityLabel={t("Close")} testID="story-sheet-close" style={styles.close} hitSlop={8} pressScale={0.88}>
          <Icon name="close" size={22} color={colors.inkSoft} />
        </Tappable>
      </View>
      {open ? (
        <StoryPlayer
          key={`${open.id}-${round}`}
          story={open}
          next={next}
          language={language}
          mascotVariant={mascotVariant}
          accent={accent}
          bottomInset={bottomInset}
          onFinish={(right) => onFinish(open.id, right)}
          onNext={() => next && openStory(next.id)}
          onDone={() => setOpenId(undefined)}
        />
      ) : (
        <>
          <View style={styles.tabs} accessibilityRole="tablist">
            {GROUPS.map((item) => (
              <Tappable
                key={item}
                onPress={() => setShelf(item)}
                sound="soft_ui"
                accessibilityRole="tab"
                accessibilityState={{ selected: shelf === item }}
                testID={`story-shelf-${item}`}
                style={[styles.tab, shelf === item ? { backgroundColor: topicPalette(accent).main, borderBottomColor: topicPalette(accent).lip } : null]}
              >
                <Text style={[styles.tabText, shelf === item ? styles.tabTextOn : null]}>{t(item === "seerah" ? "Seerah" : "Sahabah")}</Text>
              </Tappable>
            ))}
          </View>
          <ScrollView style={styles.scroll} contentContainerStyle={{ paddingBottom: 32 + bottomInset }} showsVerticalScrollIndicator={false} testID={`story-list-${shelf}`}>
            <View style={[styles.hero, { backgroundColor: topicPalette(accent).light, borderColor: topicPalette(accent).soft }]}>
              <Teacher look={teacherFor(shelf === "seerah" ? "prophets" : "sahabah")} variant={mascotVariant} accent={accent} size={64} testID="story-shelf-teacher" />
              <View style={styles.heroText}>
                <Text style={styles.heroLine}>
                  {withHonorifics(t(shelf === "seerah" ? "The life of the Prophet ﷺ, told as stories." : "The Companions' lives, told as stories."))}
                </Text>
                <Text style={styles.heroCount}>{t("{done} of {total} read", { done: readCount, total: list.length })}</Text>
              </View>
            </View>
            {firstUnread ? <GameButton label={t(readCount ? "Keep reading" : "Start reading")} fullWidth onPress={() => openStory(firstUnread.id)} testID="story-start" style={styles.start} /> : null}
            {list.map((story) => (
              <StoryRow key={story.id} story={story} read={readIds.has(story.id)} accent={accent} onPress={() => openStory(story.id)} />
            ))}
          </ScrollView>
        </>
      )}
    </Sheet>
  );
}

/** On the Seerah and Sahabah paths: a card that opens story mode on that shelf. */
export function StoryBanner({ group, accent, read, total, onOpen }: { group: StoryGroup; accent: string; read: number; total: number; onOpen: () => void }) {
  const palette = topicPalette(accent);
  return (
    <Tappable onPress={onOpen} sound="node_tap" pressScale={0.97} accessibilityLabel={`${t("Story mode")}, ${t("{done} of {total} read", { done: read, total })}`} testID={`story-banner-${group}`} style={[styles.banner, { backgroundColor: palette.light, borderColor: palette.soft, borderBottomColor: palette.lip }]}>
      <View style={[styles.bannerIcon, { backgroundColor: palette.main }]}>
        <Icon name="scroll" size={28} />
      </View>
      <View style={styles.rowText}>
        <Text style={styles.rowTitle} numberOfLines={1}>
          {t("Story mode")}
        </Text>
        <Text style={styles.rowLine} numberOfLines={2}>
          {withHonorifics(t(group === "seerah" ? "The life of the Prophet ﷺ, told as stories." : "The Companions' lives, told as stories."))}
        </Text>
      </View>
      <Text style={[styles.bannerCount, { color: palette.ink }]}>{`${read}/${total}`}</Text>
      <Icon name="chevronRight" size={20} color={palette.ink} />
    </Tappable>
  );
}

const styles = StyleSheet.create({
  sheet: { paddingTop: 14 },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 12, gap: 10 },
  headerText: { flex: 1, minWidth: 0 },
  heading: { ...text.h2 },
  headerPart: { ...text.small, color: colors.inkSoft },
  back: {},
  close: { width: 40, height: 40, borderRadius: 20, alignItems: "center", justifyContent: "center", backgroundColor: colors.mist },
  scroll: { flex: 1 },
  tabs: { flexDirection: "row", gap: 10, marginBottom: 12 },
  tab: { flex: 1, minHeight: 44, borderRadius: 14, borderWidth: 2, borderColor: colors.line, borderBottomWidth: 4, borderBottomColor: colors.lineLip, alignItems: "center", justifyContent: "center", backgroundColor: colors.white },
  tabText: { fontFamily: fonts.displayHeavy, fontSize: 16, color: colors.inkSoft },
  tabTextOn: { color: colors.white },
  hero: { flexDirection: "row", alignItems: "center", gap: 12, borderRadius: 20, borderWidth: 2, padding: 12, marginBottom: 12 },
  heroText: { flex: 1, minWidth: 0 },
  heroLine: { ...text.bodyBold, color: colors.ink },
  heroCount: { ...text.small, color: colors.inkSoft, marginTop: 2 },
  start: { marginBottom: 14 },
  row: { flexDirection: "row", alignItems: "center", gap: 12, minHeight: 72, marginBottom: 10, paddingHorizontal: 10, paddingVertical: 8, borderWidth: 2, borderColor: colors.line, borderBottomWidth: 5, borderBottomColor: colors.lineLip, borderRadius: 18, backgroundColor: colors.white },
  cover: { width: 56, height: 56, borderRadius: 14, borderWidth: 2, overflow: "hidden", alignItems: "center", justifyContent: "center" },
  coverImage: { width: "100%", height: "100%" },
  readBadge: { position: "absolute", right: 2, bottom: 2, width: 20, height: 20, borderRadius: 10, backgroundColor: colors.green, alignItems: "center", justifyContent: "center" },
  rowText: { flex: 1, minWidth: 0 },
  rowTitle: { fontFamily: fonts.displayHeavy, fontSize: 16, lineHeight: 20, color: colors.ink },
  rowLine: { ...text.small, color: colors.inkSoft },
  player: { flex: 1 },
  progress: { marginBottom: 10 },
  playerContent: { paddingBottom: 24, gap: 16 },
  scene: { gap: 10 },
  sceneTitle: { fontFamily: fonts.displayHeavy, fontSize: 15, lineHeight: 20, textTransform: "uppercase", letterSpacing: 0.4 },
  tellRow: { flexDirection: "row", alignItems: "flex-end", gap: 8 },
  bubble: { flex: 1, minWidth: 0 },
  facts: { gap: 6, paddingStart: 4 },
  factRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  factDot: { width: 8, height: 8, borderRadius: 4 },
  factText: { ...text.bodyBold, color: colors.ink, flex: 1 },
  told: { borderRadius: 16, borderWidth: 2, padding: 12, gap: 6 },
  toldLabel: { fontFamily: fonts.displayHeavy, fontSize: 13, textTransform: "uppercase", letterSpacing: 0.4 },
  toldText: { ...text.body, color: colors.ink },
  sourceChip: { flexDirection: "row", alignItems: "center", alignSelf: "flex-start", gap: 6, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 999, backgroundColor: colors.white, borderWidth: 2, borderColor: colors.line, maxWidth: "100%" },
  sourceText: { fontFamily: fonts.bodyBold, fontSize: 13, color: colors.ink, flexShrink: 1 },
  question: { borderRadius: 20, borderWidth: 2, borderColor: lighten(colors.gold, 0.4), backgroundColor: lighten(colors.gold, 0.88), padding: 12, gap: 10 },
  questionHead: { flexDirection: "row", alignItems: "center", gap: 6 },
  questionEyebrow: { fontFamily: fonts.displayHeavy, fontSize: 13, color: colors.ink, textTransform: "uppercase", letterSpacing: 0.4 },
  prompt: { fontFamily: fonts.displayHeavy, fontSize: 18, lineHeight: 24, color: colors.ink },
  choices: { gap: 8 },
  why: { flexDirection: "row", gap: 8, alignItems: "flex-start", backgroundColor: colors.correctBg, borderRadius: 14, padding: 10 },
  whyText: { ...text.bodyBold, color: colors.correctInk, flex: 1 },
  tryAgain: { ...text.bodyBold, color: colors.wrongInk },
  footer: { paddingTop: 10, borderTopWidth: 2, borderTopColor: colors.line },
  done: { flex: 1, alignItems: "center", justifyContent: "center", gap: 10, paddingHorizontal: 8 },
  doneTitle: { ...text.h1, textAlign: "center" },
  doneLine: { ...text.bodyBold, color: colors.inkSoft, textAlign: "center" },
  doneStats: { flexDirection: "row", gap: 12, marginVertical: 8 },
  stat: { flexDirection: "row", alignItems: "center", gap: 6, paddingHorizontal: 14, paddingVertical: 8, borderRadius: 999, borderWidth: 2, borderColor: colors.line, backgroundColor: colors.white },
  statText: { fontFamily: fonts.displayHeavy, fontSize: 18, color: colors.ink },
  doneButtons: { alignSelf: "stretch", gap: 10, marginTop: 8 },
  banner: { flexDirection: "row", alignItems: "center", gap: 10, marginHorizontal: 16, marginTop: 8, marginBottom: 4, paddingHorizontal: 12, paddingVertical: 10, borderRadius: 18, borderWidth: 2, borderBottomWidth: 5 },
  bannerIcon: { width: 44, height: 44, borderRadius: 22, alignItems: "center", justifyContent: "center" },
  bannerCount: { fontFamily: fonts.displayHeavy, fontSize: 15 }
});
