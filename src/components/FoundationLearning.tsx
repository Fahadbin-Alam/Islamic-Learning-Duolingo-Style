import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Animated,
  Easing,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  type LayoutChangeEvent,
  type NativeScrollEvent,
  type NativeSyntheticEvent
} from "react-native";
import Svg, { Circle } from "react-native-svg";
import { getAssessmentXp } from "../api/islamicLearningApi";
import { getTopicArabic } from "../data/arabicTerms";
import { FOUNDATION_CATEGORY_META, FOUNDATION_PROGRESS_LABELS } from "../data/foundationQuestionBank";
import { translateStudyText } from "../services/contentLocalization";
import {
  getFoundationDashboard,
  getFoundationWordBank,
  getLearnerLevel,
  getProgressMapIndex,
  getSessionPlan,
  getSessionProgress,
  getShuffledOrderItems,
  isRetryQuestion,
  localizeFoundationQuestion,
  toEnglishAnswer,
  rotateByOne,
  seededShuffle,
  summarizeFoundationSession
} from "../services/foundationAssessment";
import type {
  FoundationAssessmentState,
  FoundationCategoryId,
  LearnerProfile,
  SupportedLanguage
} from "../types";
import {
  ArabicText,
  ChoiceTile,
  Confetti,
  CountUp,
  GameButton,
  Icon,
  Mascot,
  PopIn,
  ProgressBar,
  SpeechBubble,
  Tappable,
  colors,
  darken,
  fonts,
  lighten,
  playUi,
  radii,
  space,
  text,
  type ChoiceTileState,
  type IconName,
  type MascotMood,
  useShake,
  withHonorifics
} from "../ui";
import { FadeUnderSheet, FeedbackSheet, LessonBottomBar, PromptText, QuitSheet, shortWhy, useLessonCompact, useScrollMore } from "../ui/lesson";
import { sheetRoom, sheetScrollY, stackSpan, tilesUnderSheet, useSheetFit, type LayoutBox } from "../ui/lesson/sheetFit";
import { isRtlLanguage, t } from "../i18n";

/** The gap between answer tiles (styles.choiceList gap, styles.wordGrid rowGap). */
const ANSWER_GAP = 10;

type SelectedAnswer = string | string[] | Record<string, string> | undefined;
type Question = ReturnType<typeof localizeFoundationQuestion>;

// Arabic next to a skill name, all with full vowel marks (as on the learn cards) so a beginner can read them.
// Salah, Wudu, Zakat, Iman and Prophets are lesson words in src/data/arabicTerms.ts; Fasting, Hajj and Manners
// are their topic banners there with the marks added; Quran is the word in "Surahs of the Quran". Shahadah
// (the testimony of faith) has no term there yet.
export const SKILL_ARABIC: Record<FoundationCategoryId, string> = {
  shahadah: "الشَّهَادَةُ",
  salah: "الصَّلَاةُ",
  taharah: "الْوُضُوءُ",
  fasting: "الصِّيَامُ",
  zakat: "الزَّكَاةُ",
  hajj: "الْحَجُّ",
  iman: "الْإِيمَانُ",
  manners: "الْآدَابُ",
  quran: "الْقُرْآنُ",
  seerah: "الْأَنْبِيَاءُ"
};

/** One short name and an icon per skill, for the badge grid. */
export const SKILL_LOOK: Record<FoundationCategoryId, { name: string; icon: IconName }> = {
  shahadah: { name: "Shahadah", icon: "speech" },
  salah: { name: "Salah", icon: "mosque" },
  taharah: { name: "Wudu", icon: "water" },
  fasting: { name: "Fasting", icon: "dates" },
  zakat: { name: "Zakat", icon: "coins" },
  hajj: { name: "Hajj", icon: "kaaba" },
  iman: { name: "Iman", icon: "star8" },
  manners: { name: "Manners", icon: "handHeart" },
  quran: { name: "Quran", icon: "quran" },
  seerah: { name: "Prophets", icon: "scroll" }
};

function SkillRing({ progress, color, icon }: { progress: number; color: string; icon: IconName }) {
  const size = 60;
  const stroke = 6;
  const radius = (size - stroke) / 2;
  const length = 2 * Math.PI * radius;
  const value = Math.max(0, Math.min(1, progress));
  return (
    <View style={{ width: size, height: size, alignItems: "center", justifyContent: "center" }}>
      <Svg width={size} height={size} style={StyleSheet.absoluteFill}>
        <Circle cx={size / 2} cy={size / 2} r={radius} stroke={colors.locked} strokeWidth={stroke} fill="none" />
        {value > 0 ? (
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={stroke}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={`${length * value} ${length}`}
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
          />
        ) : null}
      </Svg>
      <Icon name={icon} size={28} color={value > 0 ? undefined : colors.lockedLip} />
    </View>
  );
}

export function FoundationDashboard({
  profile,
  onStartPlacement,
  onSkipAssessment,
  mascotVariant = "hijabi",
  accent
}: {
  profile: LearnerProfile;
  onStartPlacement: () => void;
  /** Review and the daily challenge live on the Practice tab now. Kept so old call sites type-check. */
  onStartReview?: () => void;
  onStartDailyChallenge?: () => void;
  onSkipAssessment: () => void;
  /** The top bar's topic picker replaces this. Kept so old call sites type-check. */
  onExploreFreely?: () => void;
  mascotVariant?: string;
  /** Mascot clothing color (the topic accent), so the mascot looks the same on every screen. */
  accent?: string;
}) {
  const rows = useMemo(() => getFoundationDashboard(profile), [profile]);
  const progressIndex = getProgressMapIndex(profile.readiness_label);
  const hasPlacement = profile.totalQuestionsAnswered > 0;
  const placed = profile.assessmentCompleted;
  const basics = getTopicArabic("foundation");
  const [skillsOpen, setSkillsOpen] = useState(hasPlacement);

  return (
    <View style={styles.dashboardWrap}>
      <PopIn from="up">
        <View style={styles.heroCard}>
          <View style={styles.heroRow}>
            <Mascot variant={mascotVariant} mood={placed ? "happy" : "wave"} size={78} accent={accent} />
            <View style={styles.heroText}>
              {basics ? (
                <ArabicText size={20} weight="bold" color={colors.correctInk} align={isRtlLanguage() ? "right" : "left"}>
                  {basics.ar}
                </ArabicText>
              ) : null}
              <Text style={styles.heroTitle} numberOfLines={2}>
                {placed ? t("Your map") : t("Find your level")}
              </Text>
            </View>
          </View>

          <View style={styles.mapRow} accessibilityLabel={t("Level {level}", { level: getLearnerLevel(profile.readiness_label) })}>
            {FOUNDATION_PROGRESS_LABELS.map((label, index) => {
              const active = index <= progressIndex;
              const current = index === progressIndex;
              return (
                <React.Fragment key={label}>
                  {index > 0 ? <View style={[styles.mapLine, active ? styles.mapLineActive : null]} /> : null}
                  <View style={[styles.mapDot, active ? styles.mapDotActive : null, current ? styles.mapDotCurrent : null]}>
                    {current ? <Icon name="star" size={18} /> : active ? <Icon name="check" size={12} color={colors.white} /> : null}
                  </View>
                </React.Fragment>
              );
            })}
          </View>
          <View style={styles.levelPill}>
            <Icon name="star" size={16} />
            <Text style={styles.levelText} numberOfLines={1}>
              {t("Level {level}", { level: getLearnerLevel(profile.readiness_label) })}
            </Text>
          </View>

          {/* The level check starts over each time, so it never says RESUME. */}
          <GameButton label={placed ? t("Retake") : t("Start")} icon="star8" fullWidth onPress={onStartPlacement} />
          {!placed ? <GameButton label={t("Skip for now")} variant="ghost" color={colors.inkSoft} size="sm" onPress={onSkipAssessment} /> : null}
        </View>
      </PopIn>

      <View style={styles.dashboardCard}>
        <Tappable
          onPress={() => setSkillsOpen((open) => !open)}
          style={styles.skillsHead}
          accessibilityLabel={skillsOpen ? t("Hide skills") : t("See skills")}
          accessibilityState={{ expanded: skillsOpen }}
          pressScale={0.98}
          testID="foundation-skills-toggle"
        >
          <Text style={styles.cardTitle} numberOfLines={1}>
            {t("Skills")}
          </Text>
          <View style={[styles.chevron, skillsOpen ? styles.chevronOpen : null]}>
            <Icon name="chevronDown" size={22} color={colors.inkSoft} />
          </View>
        </Tappable>
        {skillsOpen ? (
          <View style={styles.skillGrid}>
            {rows.map((row, index) => {
              const look = SKILL_LOOK[row.category];
              return (
                <PopIn key={row.category} delay={Math.min(index, 6) * 40} style={styles.skillCell}>
                  <View style={styles.skillBadge} accessibilityLabel={`${t(look.name)} ${row.mastery}%`}>
                    <SkillRing progress={row.mastery / 100} color={row.accentColor} icon={look.icon} />
                    <Text style={styles.skillName} numberOfLines={1}>
                      {t(look.name)}
                    </Text>
                    <Text style={[styles.skillMeta, { color: row.mastery > 0 ? darken(row.accentColor, 0.25) : colors.inkSoft }]} numberOfLines={1}>
                      {row.mastery > 0 ? `${row.mastery}%` : t("New")}
                    </Text>
                  </View>
                </PopIn>
              );
            })}
          </View>
        ) : null}
      </View>
    </View>
  );
}

/** Order and match prompts are short and say what to sort ("Put the wudu steps in order."), so they are shown as written. */
function titleFor(question: Question) {
  const prompt = question.prompt.trim();
  if (prompt) return prompt;
  if (question.type === "correct_order") return t("Put these in order");
  if (question.type === "match_pairs") return t("Match the pairs");
  return prompt;
}

/** What the answer sheet says: the praise word, or "Correct answer:" with the answer and one short Why line. */
type SheetContent = { correct: boolean; correctLabel?: string; correctList?: string[]; why?: string; seed: string };

function answerOf(question: Question) {
  const answer = question.correctAnswer;
  if (question.type === "match_pairs" && answer && typeof answer === "object" && !Array.isArray(answer)) {
    return { list: (question.pairs ?? []).map((pair) => `${pair.left} = ${answer[pair.left] ?? pair.right}`) };
  }
  if (question.type === "correct_order" && Array.isArray(answer)) {
    return { list: answer };
  }
  if (Array.isArray(answer)) {
    return { label: answer.join(", ") };
  }
  return { label: typeof answer === "string" ? answer : undefined };
}

/**
 * `english` is the question and feedback as the question bank writes them: the Why line is cut from the English
 * text and then translated, so every language gets the same sentence.
 */
function sheetContentFor(
  question: Question,
  selectedAnswer: SelectedAnswer,
  feedback: NonNullable<FoundationAssessmentState["feedback"]>,
  english: { question: Question; feedback: NonNullable<FoundationAssessmentState["feedback"]>; language: SupportedLanguage }
): SheetContent {
  if (feedback.correct) {
    return { correct: true, seed: question.id };
  }
  const { label, list } = answerOf(question);
  const picked = typeof selectedAnswer === "string" ? toEnglishAnswer(english.question, selectedAnswer, english.language) : undefined;
  const pickedNote = typeof picked === "string" ? english.question.wrongAnswerNotes?.[picked] : undefined;
  const why = shortWhy({
    easierExplanation: pickedNote,
    explanation: `${english.feedback.explanationShort} ${english.feedback.explanationLong}`,
    prompt: english.question.prompt,
    correctLabel: answerOf(english.question).label
  });
  return { correct: false, correctLabel: label, correctList: list, why: why && translateStudyText(why, english.language), seed: question.id };
}

/**
 * Mascot next to a speech bubble holding the question, as in lessons. Long questions use the full width. `still`: the
 * mascot hides after the question showed (to make room for the feedback sheet), so the prompt does not pop in again.
 */
function PromptBubble({
  children,
  long,
  hideMascot,
  still,
  mascotVariant,
  accent,
  mood
}: {
  children: React.ReactNode;
  long: boolean;
  hideMascot: boolean;
  still?: boolean;
  mascotVariant: string;
  accent?: string;
  mood: MascotMood;
}) {
  const { compact, narrow } = useLessonCompact();
  if (long || hideMascot) {
    return still && !long ? (
      <View style={styles.plainPrompt}>{children}</View>
    ) : (
      <PopIn from="up" delay={60} style={styles.plainPrompt}>
        {children}
      </PopIn>
    );
  }
  return (
    <View style={styles.questionRow}>
      <Mascot variant={mascotVariant} mood={mood} accent={accent} size={compact ? 64 : narrow ? 72 : 88} />
      <PopIn from="up" delay={60} style={styles.bubbleWrap}>
        <SpeechBubble>{children}</SpeechBubble>
      </PopIn>
    </View>
  );
}

const BLANK = "____";

/** Fill-in prompt: the blank is a slot that shows the tapped word. */
function BlankPrompt({ prompt, word, checked, size }: { prompt: string; word?: string; checked: boolean | undefined; size: number }) {
  const [before, ...rest] = prompt.split(BLANK);
  const after = rest.join(BLANK);
  const slotColor = checked === undefined ? colors.gemLip : checked ? colors.correctInk : colors.wrongInk;
  return (
    <Text style={[styles.prompt, { fontSize: size, lineHeight: Math.round(size * 1.4) }]} testID="blank-prompt">
      {withHonorifics(before)}
      <Text style={[styles.blankSlot, word ? { color: slotColor, textDecorationColor: slotColor } : styles.blankEmpty]}>
        {word ? `\u00A0${word}\u00A0` : "        "}
      </Text>
      {withHonorifics(after)}
    </Text>
  );
}

const CLOSE_GREY = darken(colors.lockedLip, 0.12);
// The "Try again!" chip on a missed question asked again, as in lessons.
const RETRY_INK = darken(colors.flame, 0.3);
const RETRY_BG = lighten(colors.flame, 0.85);

/** The quit sheet says what really happens: the answers given so far are kept. */
const QUIT_TITLES: Record<FoundationAssessmentState["mode"], string> = {
  placement: "Stop the level check?",
  daily_challenge: "Stop the challenge?",
  review: "Stop the review?"
};
const QUIT_LINE = "Your answers so far are saved.";

export function FoundationAssessmentScreen({
  assessment,
  language,
  selectedAnswer,
  onChangeSelectedAnswer,
  onSubmit,
  onContinue,
  onExit,
  mascotVariant = "hijabi",
  accent
}: {
  assessment: FoundationAssessmentState;
  language: SupportedLanguage;
  selectedAnswer: SelectedAnswer;
  /** The "How sure?" picker is gone; the answer sets the confidence. Kept so old call sites type-check. */
  confidence?: number;
  onChangeConfidence?: (value: number) => void;
  onChangeSelectedAnswer: (value: SelectedAnswer) => void;
  onSubmit: () => void;
  onContinue: () => void;
  /** Called after the learner confirms on the quit sheet. */
  onExit: () => void;
  mascotVariant?: string;
  /** Mascot clothing color: the topic accent the path uses, so the mascot looks the same as on the path. */
  accent?: string;
}) {
  const [quitOpen, setQuitOpen] = useState(false);
  // A missed question asked again: a "Try again!" chip and the tiles in another order.
  const retry = isRetryQuestion(assessment);
  const focus = getSessionPlan(assessment)?.focus;
  const { compact } = useLessonCompact();
  const question = useMemo(
    () => localizeFoundationQuestion(assessment.currentQuestion, language),
    [assessment.currentQuestion, language]
  );
  const feedback = useMemo(() => {
    if (!assessment.feedback || language === "en") {
      return assessment.feedback;
    }

    return {
      ...assessment.feedback,
      explanationShort: translateStudyText(assessment.feedback.explanationShort, language),
      explanationLong: translateStudyText(assessment.feedback.explanationLong, language)
    };
  }, [assessment.feedback, language]);
  const words = useMemo(
    () => getFoundationWordBank(assessment.currentQuestion, retry).map((word) => (language === "en" ? word : translateStudyText(word, language))),
    [assessment.currentQuestion, language, retry]
  );
  // The bar fills as each question is done (right, or missed on its second try), as in lessons: empty on the first
  // question and full after the last. The count keeps the total the session started with.
  const counter = getSessionProgress(assessment);
  const progress = counter.done / counter.total;
  const canSubmit = canSubmitAnswer(question.type, selectedAnswer);
  const arabic = SKILL_ARABIC[question.category];
  const categoryTitle = t(SKILL_LOOK[question.category]?.name ?? question.category.charAt(0).toUpperCase() + question.category.slice(1));
  const checked = feedback ? feedback.correct : undefined;
  const locked = checked !== undefined;
  // After CHECK the answer is frozen: taps on tiles change nothing.
  const change = (value: SelectedAnswer) => {
    if (!locked) onChangeSelectedAnswer(value);
  };

  // Keep the last sheet content so the sheet does not change while it slides away.
  const sheet =
    feedback && assessment.feedback
      ? sheetContentFor(question, selectedAnswer, feedback, { question: assessment.currentQuestion, feedback: assessment.feedback, language })
      : undefined;
  const lastSheet = useRef(sheet);
  if (sheet) {
    lastSheet.current = sheet;
  }
  const shownSheet = sheet ?? lastSheet.current;

  // --- keep the prompt and the right answer above the feedback sheet (as in lessons, see useSheetFit) ---
  const { ref: scrollRef, scrollProps, more, scrollDown } = useScrollMore();
  const [viewport, setViewport] = useState(0);
  const [barHeight, setBarHeight] = useState(0);
  const [sheetHeight, setSheetHeight] = useState(0);
  const [sheetFull, setSheetFull] = useState(0);
  const [answersHeight, setAnswersHeight] = useState(0);
  const [promptBox, setPromptBox] = useState<LayoutBox | null>(null);
  const [labelTop, setLabelTop] = useState<number | null>(null);
  const tileBoxes = useRef<Record<string, LayoutBox>>({});
  const [tileMoves, setTileMoves] = useState(0);
  const wasChecked = useRef(false);
  // A new question starts with no tile places.
  const boxesFor = useRef(question.id);
  if (boxesFor.current !== question.id) {
    boxesFor.current = question.id;
    tileBoxes.current = {};
  }

  const prompt = titleFor(question);
  const scenario = question.scenario?.trim();
  const long = prompt.length + (scenario?.length ?? 0) > 120;
  const tileCount = question.type === "fill_in_blank" ? words.length : question.options?.length ?? question.orderItems?.length ?? 0;
  // A sorting or matching game keeps all of its tiles and its own sheet (a numbered list).
  const sortOrMatch = question.type === "match_pairs" || question.type === "correct_order";
  const mascotOff = compact && (tileCount >= 4 || sortOrMatch);
  const foldable = locked && !sortOrMatch && hasGreyTiles(question, selectedAnswer, words);
  // The answers start right under the prompt: read from the prompt, whose size changes when the mascot hides (the
  // answers only move then, and a browser reports a move only with a change of size).
  const answersTop = promptBox ? promptBox.y + promptBox.height : undefined;
  /** The top-most right answer's tile (all the answers when they are not tiles), among the tiles shown. */
  const focusIn = (tiles: AnswerTiles | undefined) => {
    if (answersTop === undefined || !answersHeight) {
      return undefined;
    }
    const right = tiles?.items.find((option) => isAnswerOption(question, option));
    const span = tiles && right ? stackSpan(tiles.items, tileBoxes.current, right, ANSWER_GAP, tiles.columns) : undefined;
    return span ? { top: answersTop + span.top, bottom: answersTop + span.bottom } : { top: answersTop, bottom: answersTop + answersHeight };
  };
  const fitLayout = (tiles: AnswerTiles | undefined) => {
    const focus = focusIn(tiles);
    return focus && viewport && promptBox ? { visibleBottom: viewport + barHeight, promptTop: promptBox.y, focusTop: focus.top, focusBottom: focus.bottom } : undefined;
  };
  const layoutNow = fitLayout(answerTiles(question, selectedAnswer, words, retry));
  const fit = useSheetFit({
    open: locked && !sortOrMatch && !shownSheet?.correctList,
    fullHeight: sheetFull,
    room: layoutNow ? sheetRoom(layoutNow).room : undefined,
    layoutKey: `${promptBox?.y}|${promptBox?.height}|${answersHeight}|${tileMoves}`,
    squeezeMoves: foldable || (!mascotOff && !long)
  });
  // The question gives its room first: the grey answers fold away and the mascot hides, until the next question.
  const folded = fit.squeeze && foldable;
  const hideMascot = mascotOff || fit.squeeze;
  const tilesShown = answerTiles(question, selectedAnswer, words, retry, folded);
  const layout = folded ? fitLayout(tilesShown) : layoutNow;
  const room = layout ? sheetRoom(layout) : undefined;
  const sheetMaxHeight = locked && fit.fitted && room ? room.room : undefined;
  // Any answer the sheet's top edge would cut (or cover) fades away while it is up, as in lessons: the ones under
  // the top-most right answer that do not sit wholly above it. The next question shows them all again.
  const shownSheetHeight = sheetMaxHeight !== undefined ? Math.min(sheetHeight, sheetMaxHeight) : sheetHeight;
  const sheetTop =
    locked && fit.fitted && shownSheetHeight > 0 && layout && room ? sheetScrollY(layout, shownSheetHeight, room.furthest) + layout.visibleBottom - shownSheetHeight : undefined;
  const fadedTiles =
    tilesShown && sheetTop !== undefined && answersTop !== undefined
      ? tilesUnderSheet({
          ids: tilesShown.items,
          boxes: tileBoxes.current,
          focusId: tilesShown.items.find((option) => isAnswerOption(question, option)),
          gap: ANSWER_GAP,
          columns: tilesShown.columns,
          tilesTop: answersTop,
          sheetTop
        })
      : [];

  // Scrolled down to show the right answer, the question can stop part-way through the topic label (and its Arabic)
  // above the prompt: it is gone while the question sits scrolled past its top, so the scroll view's top edge never
  // cuts it, and back once it is scrolled up to it again.
  const scrollTarget = locked && sheetHeight && layout && room ? sheetScrollY(layout, sheetHeight, room.furthest) : 0;
  const [labelPast, setLabelPast] = useState(false);
  const labelFaded = locked && labelPast;
  const onQuestionScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    scrollProps.onScroll(event);
    const past = labelTop !== null && event.nativeEvent.contentOffset.y > labelTop + 0.5;
    setLabelPast((value) => (value === past ? value : past));
  };

  useEffect(() => {
    if (!locked) {
      if (wasChecked.current) {
        scrollRef.current?.scrollTo?.({ y: 0, animated: false });
      }
      wasChecked.current = false;
      return;
    }
    wasChecked.current = true;
    if (!sheetHeight || !layout || !room) {
      return;
    }
    // The right answer right above the sheet, but never the question scrolled away: on a short phone the prompt stays
    // whole at the top (the sheet names the right answer), also after a scroll down to reach the last answer.
    scrollRef.current?.scrollTo?.({ y: scrollTarget, animated: true });
    // The layout is read from the boxes these values follow.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [folded, layout?.focusBottom, layout?.promptTop, layout?.visibleBottom, locked, room?.furthest, scrollRef, sheetHeight]);

  const onAnswersLayout = (event: LayoutChangeEvent) => {
    setAnswersHeight(Math.round(event.nativeEvent.layout.height));
  };
  const onTileLayout = (item: string) => (event: LayoutChangeEvent) => {
    const { y, height } = event.nativeEvent.layout;
    const box = { y: Math.round(y), height: Math.round(height) };
    const before = tileBoxes.current[item];
    tileBoxes.current[item] = box;
    if (!before || before.y !== box.y || before.height !== box.height) {
      setTileMoves((count) => count + 1);
    }
  };

  const promptSize = long || compact ? 17 : 19;
  const mood: MascotMood = checked === undefined ? "think" : checked ? "cheer" : "sad";
  const extraBottom = locked && sheetHeight ? Math.max(space.xxl, sheetHeight - barHeight + space.lg) : space.xxl;

  return (
    <View style={styles.assessmentRoot} testID="assessment-screen">
      <View style={styles.assessmentTop}>
        <Tappable onPress={() => setQuitOpen(true)} style={styles.exitButton} accessibilityLabel={t("Close")} hitSlop={10} pressScale={0.88} testID="assessment-close">
          <Icon name="close" size={26} color={CLOSE_GREY} />
        </Tappable>
        <ProgressBar progress={progress} style={styles.progressBar} />
        <Text style={styles.progressCount}>
          {counter.number}/{counter.total}
        </Text>
      </View>

      <View style={styles.scrollBox} onLayout={(event) => setViewport(Math.round(event.nativeEvent.layout.height))} testID="assessment-scroll-box">
        <ScrollView
          ref={scrollRef}
          style={styles.scroll}
          contentContainerStyle={{ paddingBottom: extraBottom }}
          keyboardShouldPersistTaps="handled"
          {...scrollProps}
          onScroll={onQuestionScroll}
        >
          <View key={question.id} style={styles.assessmentWrap}>
            <FadeUnderSheet hidden={labelFaded} instantOut onLayout={(event) => setLabelTop(Math.round(event.nativeEvent.layout.y))} testID="assessment-label">
              <PopIn from="up">
                <View style={styles.categoryRow}>
                  <View style={styles.categoryPill}>
                    <Icon name={SKILL_LOOK[question.category]?.icon ?? "star8"} size={16} />
                    <Text style={styles.categoryText} numberOfLines={1}>
                      {categoryTitle}
                    </Text>
                  </View>
                  {arabic ? (
                    <ArabicText size={20} weight="bold" color={colors.correctInk}>
                      {arabic}
                    </ArabicText>
                  ) : null}
                  {retry ? (
                    <View style={styles.retryChip} testID="assessment-retry">
                      <Text style={styles.retryText}>{t("Try again!")}</Text>
                    </View>
                  ) : null}
                </View>
              </PopIn>
            </FadeUnderSheet>

            <View
              onLayout={(event) => setPromptBox({ y: Math.round(event.nativeEvent.layout.y), height: Math.round(event.nativeEvent.layout.height) })}
              testID="assessment-prompt"
            >
              <PromptBubble long={long} hideMascot={hideMascot} still={fit.squeeze && !mascotOff} mascotVariant={mascotVariant} accent={accent} mood={mood}>
                {scenario ? <Text style={[styles.scenarioText, { fontSize: promptSize - 2 }]}>{withHonorifics(scenario)}</Text> : null}
                {question.type === "fill_in_blank" ? (
                  <BlankPrompt prompt={prompt} word={typeof selectedAnswer === "string" ? selectedAnswer : undefined} checked={checked} size={promptSize} />
                ) : (
                  <PromptText size={promptSize}>{prompt}</PromptText>
                )}
                {question.type === "multi_select" ? <Text style={styles.hint}>{t("Pick all that fit")}</Text> : null}
              </PromptBubble>
            </View>

            <View pointerEvents={locked ? "none" : "auto"} testID="assessment-answers" onLayout={onAnswersLayout}>
              {renderQuestionInput(question, selectedAnswer, change, checked, words, compact, retry, folded, onTileLayout, fadedTiles)}
            </View>
          </View>
        </ScrollView>
      </View>

      <View onLayout={(event) => setBarHeight(Math.round(event.nativeEvent.layout.height))} testID="assessment-bar">
        {/* The "more below" arrow rides on the bar's top edge, where nothing covers it or its taps. */}
        <LessonBottomBar scrollHint={{ visible: more && !locked, onPress: scrollDown }}>
          {/* The correct / wrong sound follows right away, so CHECK itself stays quiet. */}
          <GameButton label={t("Check")} fullWidth sound={false} disabled={!canSubmit || locked} onPress={onSubmit} testID="assessment-check" />
        </LessonBottomBar>
      </View>

      <FeedbackSheet
        visible={locked}
        correct={Boolean(shownSheet?.correct)}
        correctLabel={shownSheet?.correctList ? undefined : shownSheet?.correctLabel}
        correctList={shownSheet?.correctList}
        why={shownSheet?.why}
        praiseSeed={shownSheet?.seed}
        onContinue={onContinue}
        maxHeight={sheetMaxHeight}
        onHeight={setSheetHeight}
        onFullHeight={setSheetFull}
      />

      <QuitSheet
        visible={quitOpen}
        mascotVariant={mascotVariant}
        accent={accent}
        title={focus ? t("Stop practice?") : t(QUIT_TITLES[assessment.mode])}
        line={t(QUIT_LINE)}
        quitLabel={t("Stop")}
        onKeepLearning={() => setQuitOpen(false)}
        onQuit={() => {
          setQuitOpen(false);
          onExit();
        }}
      />
    </View>
  );
}

type CheckState = ChoiceTileState | "missed";

function tileState(active: boolean, correct: boolean | undefined, isAnswer = false): ChoiceTileState {
  if (correct === undefined) return active ? "selected" : "idle";
  // After a wrong pick the right option lights up green.
  if (isAnswer && (active || !correct)) return "correct";
  if (!active) return "dimmed";
  return correct ? "correct" : "wrong";
}

/** Multi-select after CHECK: a right answer the learner did not tick is "missed", not a green tick. */
function checkState(active: boolean, checked: boolean | undefined, isAnswer: boolean): CheckState {
  if (checked === undefined) return active ? "selected" : "idle";
  if (active) return isAnswer ? "correct" : "wrong";
  return isAnswer ? "missed" : "dimmed";
}

function isAnswerOption(question: Question, option: string) {
  const answer = question.correctAnswer;
  if (typeof answer === "string") return answer === option || (question.acceptedAnswers ?? []).includes(option);
  if (Array.isArray(answer)) return answer.includes(option);
  return false;
}

const CHECK_LOOK: Record<CheckState, { bg: string; border: string; lip: string; text: string; box: string; boxBorder: string }> = {
  idle: { bg: colors.white, border: colors.line, lip: colors.lineLip, text: colors.ink, box: colors.white, boxBorder: colors.lineLip },
  selected: { bg: lighten(colors.gem, 0.86), border: lighten(colors.gem, 0.25), lip: colors.gem, text: colors.gemLip, box: colors.gem, boxBorder: colors.gem },
  correct: { bg: colors.correctBg, border: lighten(colors.green, 0.2), lip: colors.green, text: colors.correctInk, box: colors.green, boxBorder: colors.green },
  wrong: { bg: colors.wrongBg, border: lighten(colors.heart, 0.2), lip: colors.heart, text: colors.wrongInk, box: colors.heart, boxBorder: colors.heart },
  missed: { bg: colors.white, border: colors.green, lip: colors.green, text: colors.correctInk, box: colors.white, boxBorder: colors.green },
  disabled: { bg: colors.white, border: colors.line, lip: colors.line, text: colors.inkSoft, box: colors.white, boxBorder: colors.line },
  dimmed: { bg: colors.white, border: colors.line, lip: colors.lineLip, text: colors.ink, box: colors.white, boxBorder: colors.lineLip }
};

/** Shakes the tile once when it turns red after CHECK, as ChoiceTile does. */
function useWrongShake(wrong: boolean) {
  const { style, shake } = useShake(7);
  const wasWrong = useRef(wrong);
  useEffect(() => {
    if (wrong && !wasWrong.current) {
      shake();
    }
    wasWrong.current = wrong;
  }, [shake, wrong]);
  return style;
}

/** Multi-select tile: an empty box says "you may pick more than one"; a blue tick means picked, green only after CHECK. */
function CheckTile({ label, state, onPress }: { label: string; state: CheckState; onPress: () => void }) {
  const look = CHECK_LOOK[state];
  const ticked = state === "selected" || state === "correct" || state === "wrong";
  const missed = state === "missed";
  const shakeStyle = useWrongShake(state === "wrong");
  return (
    <Animated.View style={shakeStyle}>
      <Tappable
        onPress={onPress}
        disabled={state === "dimmed" || state === "disabled"}
        accessibilityRole="checkbox"
        accessibilityLabel={missed ? t("{label}, missed", { label }) : label}
        accessibilityState={{ checked: state === "selected" || state === "correct" }}
        pressScale={0.97}
        style={[
          styles.checkTile,
          { backgroundColor: look.bg, borderColor: look.border, borderBottomColor: look.lip },
          missed ? styles.missedTile : null,
          state === "dimmed" ? styles.dimmedTile : null
        ]}
      >
        <Text style={[styles.checkLabel, { color: look.text }]}>{withHonorifics(label)}</Text>
        <View style={[styles.checkBox, { backgroundColor: ticked ? look.box : colors.white, borderColor: look.boxBorder }, missed ? styles.missedBox : null]}>
          {ticked ? <Icon name={state === "wrong" ? "close" : "check"} size={16} color={colors.white} /> : null}
        </View>
      </Tappable>
    </Animated.View>
  );
}

type SlotVerdict = "right" | "wrong" | undefined;

/** A filled order slot: tap to take the step back out. A slot in the wrong place shakes after CHECK. */
function OrderSlot({ item, index, verdict, onPress }: { item: string; index: number; verdict: SlotVerdict; onPress: () => void }) {
  const shakeStyle = useWrongShake(verdict === "wrong");
  return (
    <PopIn from="scale">
      <Animated.View style={shakeStyle}>
        <Tappable
          onPress={onPress}
          style={[styles.slotFilled, verdict === "right" ? styles.slotRight : verdict === "wrong" ? styles.slotWrong : null]}
          accessibilityLabel={`${index + 1}: ${item}`}
          pressScale={0.95}
        >
          <View style={[styles.slotNumber, verdict === "right" ? { backgroundColor: colors.green } : verdict === "wrong" ? { backgroundColor: colors.heart } : null]}>
            <Text style={styles.slotNumberText}>{index + 1}</Text>
          </View>
          <Text style={styles.slotText}>{withHonorifics(item)}</Text>
        </Tappable>
      </Animated.View>
    </PopIn>
  );
}

function OrderInput({ question, order, onChange, checked, retry }: { question: Question; order: string[]; onChange: (value: SelectedAnswer) => void; checked: boolean | undefined; retry: boolean }) {
  const items = useMemo(() => getShuffledOrderItems(question, retry), [question, retry]);
  const remaining = items.filter((item) => !order.includes(item));
  const slotState = (index: number): SlotVerdict => {
    if (checked === undefined || !order[index]) return undefined;
    const answer = Array.isArray(question.correctAnswer) ? question.correctAnswer : [];
    return answer[index] === order[index] ? "right" : "wrong";
  };
  return (
    <View style={styles.orderWrap}>
      <View style={styles.grid}>
        {items.map((_, index) => {
          const item = order[index];
          const verdict = slotState(index);
          return (
            <View key={`slot-${index}`} style={styles.gridCell}>
              {item ? (
                <OrderSlot item={item} index={index} verdict={verdict} onPress={() => onChange(order.filter((entry) => entry !== item))} />
              ) : (
                <View style={styles.slotEmpty} accessibilityLabel={t("Slot {count}", { count: index + 1 })}>
                  <Text style={styles.slotEmptyText}>{index + 1}</Text>
                </View>
              )}
            </View>
          );
        })}
      </View>
      {checked === undefined && remaining.length ? (
        <View style={styles.choiceList}>
          {remaining.map((option) => (
            <ChoiceTile key={option} label={option} onPress={() => onChange([...order, option])} testID={`order-${option}`} />
          ))}
        </View>
      ) : null}
    </View>
  );
}

// Pair colors. Blue is left out: it means "picked, not paired yet".
const PAIR_COLORS = [colors.flame, "#8E5CF7", "#4C5BD4", colors.goldLip];

/** Match tile: picked = blue, paired = the pair's color and number, after CHECK green or red with the right pair's number. */
function PairTile({ label, state, pairNumber, onPress, testID }: { label: string; state: ChoiceTileState; pairNumber?: number; onPress: () => void; testID: string }) {
  const tint = pairNumber ? PAIR_COLORS[(pairNumber - 1) % PAIR_COLORS.length] : colors.gem;
  const checkedLook = state === "correct" || state === "wrong" || state === "dimmed" ? CHECK_LOOK[state] : undefined;
  const paired = state === "selected" && pairNumber !== undefined;
  const face = checkedLook
    ? { backgroundColor: checkedLook.bg, borderColor: checkedLook.border, borderBottomColor: checkedLook.lip }
    : state === "selected"
      ? { backgroundColor: lighten(tint, 0.86), borderColor: lighten(tint, 0.3), borderBottomColor: tint }
      : { backgroundColor: colors.white, borderColor: colors.line, borderBottomColor: colors.lineLip };
  const ink = checkedLook ? checkedLook.text : state === "selected" ? darken(tint, 0.3) : colors.ink;
  const chip = checkedLook && state !== "dimmed" ? checkedLook.box : tint;
  const shakeStyle = useWrongShake(state === "wrong");
  return (
    <Animated.View style={[styles.pairSlot, shakeStyle]}>
      <Tappable
        onPress={onPress}
        disabled={state === "dimmed"}
        style={[styles.pairTile, face, state === "dimmed" ? styles.dimmedTile : null]}
        accessibilityLabel={pairNumber ? t("{label}, pair {count}", { label, count: pairNumber }) : label}
        accessibilityState={{ selected: state === "selected" && !paired }}
        pressScale={0.96}
        testID={testID}
      >
        <Text style={[styles.pairText, { color: ink }]}>{withHonorifics(label)}</Text>
        {pairNumber ? (
          <View style={[styles.pairChip, { backgroundColor: chip }]} pointerEvents="none">
            <Text style={styles.pairChipText}>{pairNumber}</Text>
          </View>
        ) : null}
      </Tappable>
    </Animated.View>
  );
}

type Pick = { side: "left" | "right"; value: string } | undefined;

/**
 * Tap-to-pair: one tile from each side. Paired tiles share a number; tap one again to undo.
 * Each row's two tiles share a height. After CHECK every tile shows the number of its right pair.
 */
function MatchInput({ question, mapping, onChange, checked, retry }: { question: Question; mapping: Record<string, string>; onChange: (value: SelectedAnswer) => void; checked: boolean | undefined; retry: boolean }) {
  const [pick, setPick] = useState<Pick>(undefined);
  const pairLefts = (question.pairs ?? []).map((pair) => pair.left);
  const answer = question.correctAnswer && typeof question.correctAnswer === "object" && !Array.isArray(question.correctAnswer) ? question.correctAnswer : {};
  const shuffledRights = useMemo(() => {
    const shuffled = seededShuffle(question.options ?? [], question.id);
    // Never start with every meaning already next to its phrase.
    return shuffled.length > 1 && shuffled.every((right, index) => answer[pairLefts[index]] === right) ? [...shuffled.slice(1), shuffled[0]] : shuffled;
    // The shuffle depends on the question only.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [question.id, question.options]);
  // A retry moves every row (both columns together), so no meaning lands next to its phrase.
  const lefts = retry ? rotateByOne(pairLefts) : pairLefts;
  const rights = retry ? rotateByOne(shuffledRights) : shuffledRights;
  const pairedLefts = Object.keys(mapping);
  const numberOfLeft = (left: string) => pairedLefts.indexOf(left) + 1;
  const leftOfRight = (right: string) => pairedLefts.find((left) => mapping[left] === right);
  const answerLeftOf = (right: string) => lefts.find((left) => answer[left] === right);
  const isChecked = checked !== undefined;

  const pair = (left: string, right: string) => {
    const next: Record<string, string> = {};
    for (const key of pairedLefts) {
      if (key !== left && mapping[key] !== right) next[key] = mapping[key];
    }
    next[left] = right;
    setPick(undefined);
    onChange(next);
  };
  const unpair = (left: string) => {
    const next = { ...mapping };
    delete next[left];
    onChange(next);
  };

  const tapLeft = (left: string) => {
    if (mapping[left]) {
      unpair(left);
      setPick({ side: "left", value: left });
      return;
    }
    if (pick?.side === "right") pair(left, pick.value);
    else setPick(pick?.value === left ? undefined : { side: "left", value: left });
  };
  const tapRight = (right: string) => {
    const owner = leftOfRight(right);
    if (owner) {
      unpair(owner);
      setPick({ side: "right", value: right });
      return;
    }
    if (pick?.side === "left") pair(pick.value, right);
    else setPick(pick?.value === right ? undefined : { side: "right", value: right });
  };

  const stateLeft = (left: string): ChoiceTileState => {
    if (isChecked) return mapping[left] && answer[left] === mapping[left] ? "correct" : "wrong";
    return mapping[left] || (pick?.side === "left" && pick.value === left) ? "selected" : "idle";
  };
  const stateRight = (right: string): ChoiceTileState => {
    const owner = leftOfRight(right);
    if (isChecked) return owner && answer[owner] === right ? "correct" : "wrong";
    return owner || (pick?.side === "right" && pick.value === right) ? "selected" : "idle";
  };
  // Before CHECK the number is the learner's pair; after it, the right pair (left row number).
  const numberLeft = (left: string) => (isChecked ? lefts.indexOf(left) + 1 : mapping[left] ? numberOfLeft(left) : undefined);
  const numberRight = (right: string) => {
    if (isChecked) {
      const owner = answerLeftOf(right);
      return owner ? lefts.indexOf(owner) + 1 : undefined;
    }
    const owner = leftOfRight(right);
    return owner ? numberOfLeft(owner) : undefined;
  };

  return (
    <View style={styles.matchRows}>
      {Array.from({ length: Math.max(lefts.length, rights.length) }, (_, index) => {
        const left = lefts[index];
        const right = rights[index];
        return (
          <PopIn key={`${left ?? ""}|${right ?? ""}`} from="up" delay={80 + index * 60} style={styles.matchRow}>
            {left ? (
              <PairTile label={left} pairNumber={numberLeft(left)} state={stateLeft(left)} onPress={() => tapLeft(left)} testID={`match-left-${left}`} />
            ) : (
              <View style={styles.pairSpacer} />
            )}
            {right ? (
              <PairTile label={right} pairNumber={numberRight(right)} state={stateRight(right)} onPress={() => tapRight(right)} testID={`match-right-${right}`} />
            ) : (
              <View style={styles.pairSpacer} />
            )}
          </PopIn>
        );
      })}
    </View>
  );
}

function isPicked(selectedAnswer: SelectedAnswer, option: string) {
  return Array.isArray(selectedAnswer) ? selectedAnswer.includes(option) : selectedAnswer === option;
}

/** Answers shown as tiles to tap: a column (one or several to pick) or the fill-in word grid (two columns). */
type AnswerTiles = { columns: 1 | 2; items: string[] };

/**
 * The answer tiles in the order shown. `fold`: after CHECK on a short phone the grey ones (neither picked nor right)
 * fold away to make room for the sheet. Typed, order and match answers are not tiles here.
 */
function answerTiles(question: Question, selectedAnswer: SelectedAnswer, words: string[], retry: boolean, fold = false): AnswerTiles | undefined {
  const kept = (option: string) => !fold || isPicked(selectedAnswer, option) || isAnswerOption(question, option);
  if (question.type === "fill_in_blank") {
    return words.length > 1 ? { columns: 2, items: words.filter(kept) } : undefined;
  }
  if (question.type === "reflection_prompt" || question.type === "correct_order" || question.type === "match_pairs") {
    return undefined;
  }
  // A retry deals the same choices in another order (a word bank is already turned).
  const dealt = retry ? rotateByOne(question.options ?? []) : question.options ?? [];
  return { columns: 1, items: dealt.filter(kept) };
}

/** After CHECK, are there answers that are neither picked nor right (grey tiles that may fold away)? */
function hasGreyTiles(question: Question, selectedAnswer: SelectedAnswer, words: string[]) {
  const tiles = answerTiles(question, selectedAnswer, words, false);
  return Boolean(tiles?.items.some((option) => !isPicked(selectedAnswer, option) && !isAnswerOption(question, option)));
}

function renderQuestionInput(
  question: Question,
  selectedAnswer: SelectedAnswer,
  onChangeSelectedAnswer: (value: SelectedAnswer) => void,
  checked: boolean | undefined,
  words: string[],
  compact: boolean,
  retry: boolean,
  /** After CHECK on a short phone: the grey answers (not picked, not right) fold away to make room for the sheet. */
  fold = false,
  /** Each answer tile reports where it is, so the screen knows where the right one sits. */
  onTileLayout?: (item: string) => (event: LayoutChangeEvent) => void,
  /** The answers the feedback sheet's top edge would cut: they fade away while it is up. */
  faded: string[] = []
) {
  const options = answerTiles(question, selectedAnswer, words, retry, fold)?.items ?? [];
  if (question.type === "fill_in_blank" && words.length > 1) {
    // Tap the missing word: no typing.
    return (
      <View style={styles.wordGrid}>
        {options.map((word, index) => (
          <FadeUnderSheet key={word} hidden={faded.includes(word)} style={styles.wordCell} onLayout={onTileLayout?.(word)} testID={`assessment-tile-${word}`}>
            <PopIn from="up" delay={80 + index * 60}>
              <ChoiceTile
                label={word}
                compact={compact}
                state={tileState(selectedAnswer === word, checked, isAnswerOption(question, word))}
                onPress={() => onChangeSelectedAnswer(word)}
                testID={`word-${word}`}
              />
            </PopIn>
          </FadeUnderSheet>
        ))}
      </View>
    );
  }

  if (question.type === "fill_in_blank" || question.type === "reflection_prompt") {
    const typed = typeof selectedAnswer === "string" ? selectedAnswer : "";
    if (checked !== undefined) {
      return (
        <View style={styles.choiceList}>
          <ChoiceTile label={typed} state={checked ? "correct" : "wrong"} />
          {!checked && typeof question.correctAnswer === "string" ? <ChoiceTile label={question.correctAnswer} state="correct" /> : null}
        </View>
      );
    }
    return (
      <TextInput
        multiline={question.type === "reflection_prompt"}
        value={typed}
        onChangeText={(value) => onChangeSelectedAnswer(value)}
        placeholder={question.type === "reflection_prompt" ? t("Write a few words") : t("Type your answer")}
        placeholderTextColor={colors.inkSoft}
        style={[styles.input, question.type === "reflection_prompt" && styles.inputTall]}
      />
    );
  }

  if (question.type === "multi_select") {
    const selectedValues = Array.isArray(selectedAnswer) ? selectedAnswer : [];
    return (
      <View style={styles.choiceList}>
        {options.map((option, index) => {
          const active = selectedValues.includes(option);
          const next = active ? selectedValues.filter((item) => item !== option) : [...selectedValues, option];
          return (
            <FadeUnderSheet key={option} hidden={faded.includes(option)} onLayout={onTileLayout?.(option)} testID={`assessment-tile-${option}`}>
              <PopIn from="up" delay={80 + index * 60}>
                <CheckTile label={option} state={checkState(active, checked, isAnswerOption(question, option))} onPress={() => onChangeSelectedAnswer(next)} />
              </PopIn>
            </FadeUnderSheet>
          );
        })}
      </View>
    );
  }

  if (question.type === "correct_order") {
    return <OrderInput question={question} order={Array.isArray(selectedAnswer) ? selectedAnswer : []} onChange={onChangeSelectedAnswer} checked={checked} retry={retry} />;
  }

  if (question.type === "match_pairs") {
    const mapping = selectedAnswer && !Array.isArray(selectedAnswer) && typeof selectedAnswer === "object" ? selectedAnswer : {};
    return <MatchInput key={question.id} question={question} mapping={mapping} onChange={onChangeSelectedAnswer} checked={checked} retry={retry} />;
  }

  // One long answer makes the whole set use the smaller text (folded or not), so the tiles match and keep their size.
  const longChoices = (question.options ?? []).some((option) => option.length > 60);
  return (
    <View style={styles.choiceList}>
      {options.map((option, index) => (
        <FadeUnderSheet key={option} hidden={faded.includes(option)} onLayout={onTileLayout?.(option)} testID={`assessment-tile-${option}`}>
          <PopIn from="up" delay={80 + index * 60}>
            <ChoiceTile
              label={option}
              compact={compact}
              long={longChoices}
              state={tileState(selectedAnswer === option, checked, isAnswerOption(question, option))}
              onPress={() => onChangeSelectedAnswer(option)}
            />
          </PopIn>
        </FadeUnderSheet>
      ))}
    </View>
  );
}

function canSubmitAnswer(type: FoundationAssessmentState["currentQuestion"]["type"], selectedAnswer: SelectedAnswer) {
  if (type === "fill_in_blank" || type === "reflection_prompt") {
    return typeof selectedAnswer === "string" && selectedAnswer.trim().length > 0;
  }

  if (type === "multi_select" || type === "correct_order") {
    return Array.isArray(selectedAnswer) && selectedAnswer.length > 0;
  }

  if (type === "match_pairs") {
    return Boolean(selectedAnswer && !Array.isArray(selectedAnswer) && Object.keys(selectedAnswer).length > 0);
  }

  return typeof selectedAnswer === "string" && selectedAnswer.length > 0;
}

// ---------- end of a practice session ----------

const COUNT_DURATION = 900;
const CARD_DELAY = 350;
const CARD_STAGGER = 140;
const HEADLINE = darken(colors.goldLip, 0.2);

const HEADLINES: Record<FoundationAssessmentState["mode"], string> = {
  placement: "Level found!",
  daily_challenge: "Challenge done!",
  review: "Review done!"
};
// White on gold is too faint, so the XP card's label is dark gold (as on the lesson end screen).
const GOLD_LABEL = darken(colors.goldLip, 0.45);

function ResultCard({ label, icon, value, of, color, ink, labelColor = colors.white, index, testID }: { label: string; icon: IconName; value: number; of?: number; color: string; ink: string; labelColor?: string; index: number; testID: string }) {
  return (
    <PopIn delay={CARD_DELAY + index * CARD_STAGGER} style={styles.resultSlot}>
      <View style={[styles.resultCard, { backgroundColor: color, borderColor: color }]} testID={testID} accessibilityLabel={of ? `${label} ${value} of ${of}` : `${label} ${value}`}>
        {/* Short labels; one that does not fit wraps (web ignores adjustsFontSizeToFit). */}
        <Text style={[styles.resultLabel, { color: labelColor }]}>{label}</Text>
        <View style={styles.resultBody}>
          <Icon name={icon} size={24} />
          <View style={styles.resultValueRow}>
            <CountUp value={value} duration={COUNT_DURATION} style={[styles.resultValue, { color: ink }]} />
            {of ? <Text style={[styles.resultOf, { color: ink }]}>/{of}</Text> : null}
          </View>
        </View>
      </View>
    </PopIn>
  );
}

export type PracticeCompleteProps = {
  /** The finished session (its answers). */
  assessment: FoundationAssessmentState;
  /** The learner profile after finalizeFoundationAssessment. */
  learnerProfile: LearnerProfile;
  /** XP the session paid. Default: what getAssessmentXp paid for these answers. */
  xp?: number;
  mascotVariant?: string;
  /** Mascot clothing color: the topic accent the path uses, so the mascot looks the same as on the path. */
  accent?: string;
  onContinue: () => void;
  /** Starts a short practice of one skill. Without it the "Practice next" chips are plain labels. */
  onPracticeSkill?: (category: FoundationCategoryId) => void;
  /** Play the finish fanfare, then the XP sound. Default true. */
  playSounds?: boolean;
  bottomInset?: number;
  testID?: string;
};

/** A "Practice next" skill: a small 3D button that starts that skill's practice. */
function NextSkillChip({ category, onPress }: { category: FoundationCategoryId; onPress?: () => void }) {
  const look = SKILL_LOOK[category];
  const tint = FOUNDATION_CATEGORY_META[category].accentColor;
  const ink = darken(tint, 0.3);
  const face = { backgroundColor: lighten(tint, 0.86), borderColor: lighten(tint, 0.55), borderBottomColor: lighten(tint, 0.2) };
  const content = (
    <>
      <Icon name={look.icon} size={20} />
      <Text style={[styles.nextChipText, { color: ink }]} numberOfLines={1}>
        {t(look.name)}
      </Text>
      {onPress ? <Icon name="chevronRight" size={18} color={ink} /> : null}
    </>
  );
  if (!onPress) {
    return (
      <View style={[styles.nextChip, face]} testID={`next-${category}`}>
        {content}
      </View>
    );
  }
  return (
    <Tappable onPress={onPress} style={[styles.nextChip, styles.nextChipButton, face]} accessibilityLabel={t("Practice {name}", { name: t(look.name) })} pressScale={0.93} testID={`next-${category}`}>
      {content}
    </Tappable>
  );
}

/** End of a level check, review or daily challenge: confetti, cheering mascot, counting cards, skills to practice next. */
export function PracticeComplete({
  assessment,
  learnerProfile,
  xp,
  mascotVariant = "hijabi",
  accent,
  onContinue,
  onPracticeSkill,
  playSounds = true,
  bottomInset,
  testID = "practice-complete"
}: PracticeCompleteProps) {
  const summary = useMemo(() => summarizeFoundationSession(assessment, learnerProfile), [assessment, learnerProfile]);
  const earned = xp ?? assessment.answerHistory.reduce((total, answer) => total + getAssessmentXp(assessment.mode, answer.isCorrect), 0);
  // The level check pays no XP, so it shows no XP card. No level card until the learner has done the level check.
  const showXp = assessment.mode !== "placement";
  const focus = getSessionPlan(assessment)?.focus;
  const bounce = useRef(new Animated.Value(0)).current;
  const { compact } = useLessonCompact();

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(bounce, { toValue: 1, duration: 320, easing: Easing.out(Easing.quad), useNativeDriver: true }),
        Animated.timing(bounce, { toValue: 0, duration: 380, easing: Easing.bounce, useNativeDriver: true }),
        Animated.delay(500)
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [bounce]);

  useEffect(() => {
    if (!playSounds) {
      return undefined;
    }
    playUi("lesson_complete");
    const xpTimer = showXp && earned > 0 ? setTimeout(() => playUi("xp"), CARD_DELAY + CARD_STAGGER + COUNT_DURATION + 120) : undefined;
    return () => {
      if (xpTimer) clearTimeout(xpTimer);
    };
    // Sounds play once, when the screen opens.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playSounds]);

  const jump = bounce.interpolate({ inputRange: [0, 1], outputRange: [0, -18] });

  return (
    <View style={styles.completeRoot} testID={testID}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.completeContent}>
        <Animated.View style={{ transform: [{ translateY: jump }] }}>
          <Mascot variant={mascotVariant} mood="cheer" accent={accent} size={compact ? 112 : 150} />
        </Animated.View>
        <PopIn delay={120}>
          <Text style={styles.completeHeadline} accessibilityRole="header">
            {focus ? t("Practice done!") : t(HEADLINES[assessment.mode])}
          </Text>
        </PopIn>

        <View style={styles.resultCards}>
          <ResultCard label={t("CORRECT")} icon="check" value={summary.correct} of={summary.answered} color={colors.green} ink={colors.correctInk} index={0} testID="result-correct" />
          {showXp ? <ResultCard label={t("XP EARNED")} icon="bolt" value={earned} color={colors.gold} ink={darken(colors.goldLip, 0.25)} labelColor={GOLD_LABEL} index={1} testID="result-xp" /> : null}
          {summary.level !== undefined ? (
            <ResultCard label={t("LEVEL")} icon="star" value={summary.level} color={colors.gem} ink={colors.gemLip} index={showXp ? 2 : 1} testID="result-level" />
          ) : null}
        </View>

        {summary.practiceNext.length ? (
          <PopIn delay={CARD_DELAY + 3 * CARD_STAGGER} style={styles.nextBlock}>
            <Text style={styles.nextTitle}>{t("Practice next")}</Text>
            <View style={styles.nextChips}>
              {summary.practiceNext.map((category) => (
                <NextSkillChip key={category} category={category} onPress={onPracticeSkill ? () => onPracticeSkill(category) : undefined} />
              ))}
            </View>
          </PopIn>
        ) : null}
      </ScrollView>

      <LessonBottomBar bottomInset={bottomInset}>
        <GameButton label={t("Continue")} fullWidth onPress={onContinue} testID="practice-complete-continue" />
      </LessonBottomBar>

      <Confetti active />
    </View>
  );
}

const card = {
  borderRadius: radii.lg,
  borderWidth: 2,
  borderBottomWidth: 4,
  borderColor: colors.line,
  borderBottomColor: colors.lineLip,
  backgroundColor: colors.white,
  padding: 14
} as const;

const styles = StyleSheet.create({
  dashboardWrap: { gap: 14, marginBottom: 18 },
  heroCard: { ...card, gap: 12 },
  heroRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  heroText: { flex: 1, minWidth: 0, alignItems: "flex-start" },
  heroTitle: { ...text.h2, fontSize: 26, lineHeight: 31, flexShrink: 1 },
  mapRow: { flexDirection: "row", alignItems: "center", paddingHorizontal: 4 },
  mapLine: { flex: 1, height: 6, borderRadius: 3, backgroundColor: colors.locked, marginHorizontal: 2 },
  mapLineActive: { backgroundColor: colors.green },
  mapDot: { width: 20, height: 20, borderRadius: 10, backgroundColor: colors.locked, alignItems: "center", justifyContent: "center" },
  mapDotActive: { backgroundColor: colors.green },
  mapDotCurrent: { width: 34, height: 34, borderRadius: 17, backgroundColor: colors.white, borderWidth: 3, borderColor: colors.gold },
  levelPill: { flexDirection: "row", alignItems: "center", gap: 6, alignSelf: "flex-start", maxWidth: "100%", paddingHorizontal: 12, paddingVertical: 3, borderRadius: radii.pill, backgroundColor: colors.correctBg },
  levelText: { fontFamily: fonts.displayHeavy, fontSize: 14, lineHeight: 20, color: colors.correctInk, flexShrink: 1 },
  dashboardCard: { ...card, paddingVertical: 6 },
  skillsHead: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", minHeight: 44, gap: 8 },
  cardTitle: { ...text.h3, flexShrink: 1 },
  chevron: { width: 32, height: 32, borderRadius: 16, backgroundColor: colors.mist, alignItems: "center", justifyContent: "center" },
  chevronOpen: { transform: [{ rotate: "180deg" }] },
  skillGrid: { flexDirection: "row", flexWrap: "wrap", rowGap: 10, justifyContent: "space-between", paddingTop: 4, paddingBottom: 8 },
  skillCell: { width: "48%" },
  skillBadge: { alignItems: "center", gap: 2, paddingVertical: 10, paddingHorizontal: 6, borderRadius: radii.tile, backgroundColor: colors.mist },
  skillName: { fontFamily: fonts.displayHeavy, fontSize: 16, lineHeight: 21, color: colors.ink, marginTop: 4, maxWidth: "100%" },
  skillMeta: { fontFamily: fonts.bodyHeavy, fontSize: 13, lineHeight: 17 },
  assessmentRoot: { flex: 1, backgroundColor: colors.snow, position: "relative", overflow: "hidden" },
  scrollBox: { flex: 1, minHeight: 0, position: "relative" },
  scroll: { flex: 1 },
  assessmentWrap: { paddingHorizontal: 16, paddingTop: 4 },
  assessmentTop: { flexDirection: "row", alignItems: "center", gap: 12, paddingHorizontal: 16, paddingTop: 12, paddingBottom: 8, backgroundColor: colors.snow },
  exitButton: { width: 36, height: 36, borderRadius: 18, alignItems: "center", justifyContent: "center", marginStart: -6 },
  progressBar: { flex: 1 },
  progressCount: { fontFamily: fonts.displayHeavy, fontSize: 15, lineHeight: 20, color: colors.inkSoft },
  categoryRow: { flexDirection: "row", flexWrap: "wrap", alignItems: "center", gap: 10, marginTop: 4, marginBottom: 10 },
  categoryPill: { flexDirection: "row", alignItems: "center", gap: 6, paddingHorizontal: 12, paddingVertical: 3, borderRadius: radii.pill, backgroundColor: colors.correctBg, flexShrink: 1 },
  categoryText: { fontFamily: fonts.displayHeavy, fontSize: 14, lineHeight: 20, color: colors.correctInk, flexShrink: 1 },
  retryChip: { paddingHorizontal: 12, paddingVertical: 3, borderRadius: radii.pill, backgroundColor: RETRY_BG },
  retryText: { fontFamily: fonts.displayHeavy, fontSize: 15, lineHeight: 20, color: RETRY_INK },
  questionRow: { flexDirection: "row", alignItems: "center", marginBottom: 16 },
  bubbleWrap: { flex: 1, minWidth: 0, marginStart: 4, alignItems: "flex-start" },
  plainPrompt: { marginBottom: 14 },
  prompt: { flexShrink: 1, fontFamily: fonts.bodyHeavy, color: colors.ink },
  blankSlot: { fontFamily: fonts.displayHeavy, textDecorationLine: "underline" },
  blankEmpty: { textDecorationLine: "underline", textDecorationColor: colors.lineLip, color: colors.lineLip },
  scenarioText: { fontFamily: fonts.bodyBold, color: colors.inkSoft, marginBottom: 4, flexShrink: 1 },
  hint: { ...text.small, fontFamily: fonts.bodyHeavy, color: colors.gemLip, marginTop: 4 },
  choiceList: { gap: 10 },
  wordGrid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", rowGap: 10 },
  wordCell: { width: "48.5%" },
  input: {
    minHeight: 54,
    borderRadius: radii.tile,
    borderWidth: 2,
    borderColor: colors.line,
    backgroundColor: colors.mist,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: colors.ink,
    fontFamily: fonts.bodyBold,
    fontSize: 17
  },
  inputTall: { minHeight: 132, textAlignVertical: "top" },
  checkTile: { flexDirection: "row", alignItems: "center", gap: 12, minHeight: 60, paddingHorizontal: 16, paddingVertical: 12, borderRadius: radii.tile, borderWidth: 2, borderBottomWidth: 5 },
  missedTile: { borderStyle: "dashed", borderBottomWidth: 2, marginBottom: 3 },
  missedBox: { borderStyle: "dashed" },
  dimmedTile: { opacity: 0.45 },
  checkLabel: { flex: 1, minWidth: 0, fontFamily: fonts.bodyHeavy, fontSize: 17, lineHeight: 23 },
  checkBox: { width: 28, height: 28, borderRadius: 8, borderWidth: 2, alignItems: "center", justifyContent: "center" },
  orderWrap: { gap: 4 },
  grid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", rowGap: 8, marginBottom: 8 },
  gridCell: { width: "48.5%" },
  slotEmpty: { minHeight: 52, borderRadius: radii.tile, borderWidth: 2, borderStyle: "dashed", borderColor: colors.lineLip, backgroundColor: colors.mist, alignItems: "center", justifyContent: "center" },
  slotEmptyText: { fontFamily: fonts.displayHeavy, fontSize: 18, lineHeight: 24, color: colors.lineLip },
  slotFilled: { minHeight: 52, flexDirection: "row", alignItems: "center", gap: 8, paddingHorizontal: 8, paddingVertical: 6, borderRadius: radii.tile, borderWidth: 2, borderBottomWidth: 4, borderColor: lighten(colors.gem, 0.45), borderBottomColor: colors.gem, backgroundColor: lighten(colors.gem, 0.88) },
  slotRight: { borderColor: lighten(colors.green, 0.3), borderBottomColor: colors.green, backgroundColor: colors.correctBg },
  slotWrong: { borderColor: lighten(colors.heart, 0.3), borderBottomColor: colors.heart, backgroundColor: colors.wrongBg },
  slotNumber: { width: 24, height: 24, borderRadius: 12, backgroundColor: colors.gem, alignItems: "center", justifyContent: "center" },
  slotNumberText: { fontFamily: fonts.displayHeavy, fontSize: 13, lineHeight: 18, color: colors.white },
  slotText: { flex: 1, minWidth: 0, fontFamily: fonts.bodyHeavy, fontSize: 14, lineHeight: 19, color: colors.ink },
  matchRows: { gap: 10 },
  matchRow: { flexDirection: "row", alignItems: "stretch", gap: 10 },
  pairSpacer: { flex: 1, flexBasis: 0 },
  // The slot shares the row; the tile inside grows to the row's height (the taller tile of the two sets it).
  pairSlot: { flex: 1, flexBasis: 0, minWidth: 0 },
  pairTile: { flexGrow: 1, minHeight: 64, alignItems: "center", justifyContent: "center", paddingHorizontal: 10, paddingVertical: 10, borderRadius: radii.tile, borderWidth: 2, borderBottomWidth: 5 },
  pairText: { fontFamily: fonts.bodyHeavy, fontSize: 15, lineHeight: 20, textAlign: "center", maxWidth: "100%" },
  pairChip: { position: "absolute", top: -9, right: -7, width: 24, height: 24, borderRadius: 12, borderWidth: 2, borderColor: colors.white, alignItems: "center", justifyContent: "center" },
  pairChipText: { fontFamily: fonts.displayHeavy, fontSize: 12, lineHeight: 16, color: colors.white },
  completeRoot: { flex: 1, position: "relative", backgroundColor: colors.snow },
  completeContent: { flexGrow: 1, justifyContent: "center", alignItems: "center", paddingHorizontal: space.lg, paddingVertical: space.xxl },
  completeHeadline: { fontFamily: fonts.displayHeavy, fontSize: 34, lineHeight: 42, color: HEADLINE, textAlign: "center", marginTop: space.md },
  resultCards: { flexDirection: "row", flexWrap: "wrap", justifyContent: "center", alignSelf: "stretch", marginTop: space.xl, marginHorizontal: -space.xs },
  resultSlot: { flexGrow: 1, flexBasis: 88, maxWidth: 140, minWidth: 84, padding: space.xs },
  resultCard: { borderWidth: 2, borderRadius: radii.md, overflow: "hidden" },
  resultLabel: { fontFamily: fonts.displayHeavy, fontSize: 13, lineHeight: 18, letterSpacing: 0.6, color: colors.white, textAlign: "center", paddingVertical: 3, paddingHorizontal: 4 },
  resultBody: { backgroundColor: colors.white, borderRadius: radii.md - 3, flexDirection: "row", alignItems: "center", justifyContent: "center", paddingVertical: space.md, paddingHorizontal: 6, gap: 4 },
  resultValueRow: { flexDirection: "row", alignItems: "baseline", flexShrink: 1, minWidth: 0 },
  resultValue: { fontFamily: fonts.displayHeavy, fontSize: 24, lineHeight: 30 },
  resultOf: { fontFamily: fonts.displayHeavy, fontSize: 15, lineHeight: 30 },
  nextBlock: { alignSelf: "stretch", alignItems: "center", marginTop: space.xl },
  nextTitle: { ...text.tiny, fontFamily: fonts.bodyHeavy, marginBottom: space.sm },
  nextChips: { flexDirection: "row", flexWrap: "wrap", justifyContent: "center", gap: 8 },
  nextChip: { flexDirection: "row", alignItems: "center", gap: 6, paddingHorizontal: 12, paddingVertical: 6, borderRadius: radii.pill, borderWidth: 2, maxWidth: "100%" },
  nextChipButton: { borderBottomWidth: 4, paddingEnd: 8, minHeight: 44 },
  nextChipText: { fontFamily: fonts.displayHeavy, fontSize: 15, lineHeight: 20, flexShrink: 1 }
});
