import React, { memo, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
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
import { useKeyboardHeight } from "../ui/Sheet";
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
import { FadeUnderSheet, FeedbackSheet, FoldGap, LessonBottomBar, LessonCheckBar, PromptText, QuitSheet, shortWhy, StackTile, useLessonCompact, useScrollMore } from "../ui/lesson";
import { lineStart, tightSaving, tileTextBottom, tileTextTop } from "../ui/ChoiceTile";
import { POP_IN_DISTANCE } from "../ui/PopIn";
import { BAR_GAP } from "../ui/lesson/LessonHeader";
import { EVERY_FRAME, SCROLL_HINT_SLACK, scrollHintGrowth } from "../ui/lesson/ScrollHint";
import {
  edgesOnScreen,
  fitLook,
  foldRooms,
  foldSoak,
  gapsAbove,
  keptScrollY,
  laidOutBox,
  laidOutHeight,
  laidOutTop,
  overRoom,
  questionStops,
  reachesText,
  sameBlock,
  sameRoom,
  sheetRoom,
  sheetScrollY,
  sheetTopOnScreen,
  stackSpan,
  textInRoom,
  textOnScreen,
  TILE_LIP,
  tilesUnderSheet,
  useGlideIn,
  usePickFold,
  useQuestionFit,
  useQuestionScroll,
  useSheetFit,
  useSheetHeightNow,
  useStopsArrow,
  type BlockRead,
  type GlideRead,
  type LayoutBox,
  type PartSpan,
  type QuestionPlaces,
  type RoomRead,
  type RowSpan
} from "../ui/lesson/sheetFit";
import { getActiveLanguage, isRtlLanguage, t } from "../i18n";

/** The gap between answer tiles (styles.choiceList gap, styles.wordGrid rowGap). */
const ANSWER_GAP = 10;
/** The same gap at the last step of a question's fit (see sheetFit's FIT_STEPS). */
const ANSWER_GAP_SMALL = 6;
/** A check tile's padding above and under its text, and its thick bottom border (its lip). */
const CHECK_PAD = 12;
const CHECK_LIP = 5;
/** How far up from its bottom edge a check tile holds no text: its lip and the padding over it. */
const CHECK_TEXT_BOTTOM = CHECK_LIP + CHECK_PAD;
/** Starts the key of a sorting or matching game's slot, step to place or row among the answers' views (see partRows). */
const GAME_ROW = "\u0000game:";
/** Whether two lists of parts sit in the same places, to the pixel. */
function sameRows(was: RowSpan[], now: RowSpan[]) {
  return was.length === now.length && was.every((row, index) => Math.abs(row.top - now[index].top) <= 1 && Math.abs(row.bottom - now[index].bottom) <= 1);
}
/** The answers as a whole, where they are not tiles (a typed answer): what the sheet keeps clear of then. */
const ANSWERS_FOCUS = "\u0000answers";
/** How much smaller a prompt (and its scenario line) is for a question too tall for its room otherwise. */
const SMALL_PROMPT_STEP = 2;

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

/** The room under the prompt: across the full width, the same with smaller gaps, and next to the mascot. */
const PROMPT_GAP = 14;
const PROMPT_GAP_SMALL = 8;
const MASCOT_ROW_GAP = 16;

/**
 * Mascot next to a speech bubble holding the question, as in lessons. Long questions use the full width. `still`: the
 * mascot hides after the question showed (to make room for the feedback sheet), so the prompt does not pop in again.
 */
function PromptBubble({
  children,
  long,
  hideMascot,
  still,
  smallGaps,
  mascotVariant,
  accent,
  mood
}: {
  children: React.ReactNode;
  long: boolean;
  hideMascot: boolean;
  still?: boolean;
  /** Less room under the prompt, for a question too tall for its room otherwise (see sheetFit's FIT_STEPS). */
  smallGaps?: boolean;
  mascotVariant: string;
  accent?: string;
  mood: MascotMood;
}) {
  const { compact, narrow } = useLessonCompact();
  if (long || hideMascot) {
    const plainStyle = [styles.plainPrompt, smallGaps ? styles.plainPromptSmallGaps : null];
    return still && !long ? (
      <View style={plainStyle}>{children}</View>
    ) : (
      <PopIn from="up" delay={60} style={plainStyle}>
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
  const skillName = SKILL_LOOK[question.category]?.name ?? question.category.charAt(0).toUpperCase() + question.category.slice(1);
  const categoryTitle = t(skillName);
  // "Which pillar comes first?" under a "Shahadah" label gives the answer away, so a question whose answer is
  // its own skill's name shows no label.
  const labelGivesAway = answerIsSkillName(question, skillName);
  const arabic = labelGivesAway ? undefined : SKILL_ARABIC[question.category];
  const checked = feedback ? feedback.correct : undefined;
  const locked = checked !== undefined;
  // After CHECK the answer is frozen: taps on tiles change nothing.
  const change = (value: SelectedAnswer) => {
    if (!locked) onChangeSelectedAnswer(value);
  };
  // Each answer tile's tap is the same function from render to render, as in lessons (see ExerciseView's tapOf), so a
  // tile is drawn again only when what it shows changes. A tap does what the latest render says: it picks that answer,
  // or for "pick all that fit" turns it on or off among the answers picked so far (read as it is tapped, so the tap
  // never needs to change with them).
  const tapNow = useRef<(option: string) => void>(() => undefined);
  tapNow.current = (option: string) => {
    if (question.type !== "multi_select") {
      change(option);
      return;
    }
    const picked = Array.isArray(selectedAnswer) ? selectedAnswer : [];
    change(picked.includes(option) ? picked.filter((item) => item !== option) : [...picked, option]);
  };
  const taps = useRef<Record<string, () => void>>({});
  const tapOf = (option: string) => (taps.current[option] ??= () => tapNow.current(option));

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

  // How the question meets its room, step by step, for this question and try, as in lessons (see useQuestionFit and the
  // layout effect below).
  const fitKey = `${question.id}\u0000${retry ? 1 : 0}\u0000${language}`;
  const sizing = useQuestionFit(fitKey);
  const look = fitLook(sizing.step);

  // --- keep the prompt and the right answer above the feedback sheet (as in lessons, see useSheetFit) ---
  // A question too tall for its room even at the last step of its fit shows the arrow while any of it is hidden.
  const { ref: scrollRef, scrollProps, more, scrollDown, know } = useScrollMore(sizing.overflow ? 0 : SCROLL_HINT_SLACK);
  // The room above the bar (and whether the bar held the arrow then), and the question's height (and the question and
  // step it was drawn with): read before the frame is drawn where a view can say its size at once, else reported.
  const [roomIn, setRoomIn] = useState<RoomRead | null>(null);
  const [blockIn, setBlockIn] = useState<BlockRead | null>(null);
  const viewport = roomIn?.height ?? 0;
  const scrollBoxRef = useRef<View>(null);
  const wrapRef = useRef<View>(null);
  const answersRef = useRef<View>(null);
  const promptRef = useRef<View>(null);
  const tileRefs = useRef<Record<string, View | null>>({});
  const labelRef = useRef<View | null>(null);
  // A question too tall for its room even at the last step of its fit: where its parts (the topic label, the prompt,
  // each answer or row of a game) sit in the scroll content with no space above it, for the places the arrow scrolls it to.
  const [partsIn, setPartsIn] = useState<{ key: string; rows: RowSpan[] } | null>(null);
  const [barHeight, setBarHeight] = useState(0);
  const [sheetHeight, setSheetHeight] = useState(0);
  const [sheetFull, setSheetFull] = useState(0);
  const [sheetLeast, setSheetLeast] = useState(0);
  const [answersHeight, setAnswersHeight] = useState(0);
  // The prompt and the topic label are read inside the question, which sits under the space that moves a question too
  // tall for its room down (see useQuestionFit): placed by that space, worked out rather than read (a browser reports a
  // move only with a change of size).
  const topSpace = sizing.overflow ? sizing.drop : 0;
  const [promptIn, setPromptBox] = useState<LayoutBox | null>(null);
  const [labelIn, setLabelTop] = useState<number | null>(null);
  const promptBox = promptIn && { y: promptIn.y + topSpace, height: promptIn.height };
  const labelTop = labelIn === null ? null : labelIn + topSpace;
  const tileBoxes = useRef<Record<string, LayoutBox>>({});
  // The room answers folded while the sheet comes up left (see FoldGap), and the gaps' views.
  // `scrollAt`: where the question's scroll sits once it has taken up its share of the room answers above the right
  // one leave (see foldSoak), from where the learner left it at CHECK.
  // `from`: where the learner left the scroll then, and where the top-most right answer's top sat in the content, for
  // where the question keeps it while the sheet is up (see keptScrollY).
  const foldGaps = useRef<{ key: string; heights: Record<string, number>; scrollAt?: number; from?: { y: number; focusTop: number } }>({ key: "", heights: {} });
  // Where the learner left the question's scroll (by hand or with the arrow), for the room folds leave at CHECK.
  const scrolledTo = useRef({ key: "", y: 0 });
  const gapViews = useRef<Record<string, { view: View | null; from: number }>>({});
  const [tileMoves, setTileMoves] = useState(0);
  const rootRef = useRef<View>(null);
  // On the web the sheet's new height (its Why line opening) is known before the browser paints it.
  useSheetHeightNow({ root: rootRef, open: locked, reported: sheetHeight > 0, onHeight: setSheetHeight });
  const [whyOpened, setWhyOpened] = useState(false);
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
  // So does a question that needs the smaller prompt to fit its room.
  const mascotAway = mascotOff || look.smallPrompt;
  const answerGap = look.smallGaps ? ANSWER_GAP_SMALL : ANSWER_GAP;
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
    const span = tiles && right ? stackSpan(tiles.items, tileBoxes.current, right, answerGap, tiles.columns) : undefined;
    return span ? { top: answersTop + span.top, bottom: answersTop + span.bottom } : { top: answersTop, bottom: answersTop + answersHeight };
  };
  const fitLayout = (tiles: AnswerTiles | undefined) => {
    const focus = focusIn(tiles);
    return focus && viewport && promptBox ? { visibleBottom: viewport + barHeight, promptTop: promptBox.y, focusTop: focus.top, focusBottom: focus.bottom } : undefined;
  };
  // While the sheet is up the prompt and the answers are read before the frame is drawn where a view can say their
  // places at once, as in lessons: a typed answer turns into tiles at CHECK (and a prompt wraps anew as the mascot
  // hides), so the question goes only where it ends, and the topic label hides only for a scroll that passes it. Until
  // then its place is not worked out from the answers as they were before CHECK.
  // Answers that are tiles stay as they are at CHECK (a tile keeps its size as it turns green, red or grey, and the
  // prompt keeps its own), as do a matching game's rows (each tile's pair number sits over its corner) and a sorting
  // game with every step placed (none is left to place, so the steps to place under the slots were gone already):
  // their places as read before CHECK are where they are, so the very render CHECK draws places the question, with no
  // read to wait for and no render more for it. Should a read still find a change, it is set before the frame is drawn,
  // as for any other.
  const [readLocked, setReadLocked] = useState<string | undefined>(undefined);
  const readsNow = laidOutHeight(wrapRef.current) !== undefined;
  const keepsPlace =
    answerTiles(question, selectedAnswer, words, retry) !== undefined ||
    question.type === "match_pairs" ||
    (question.type === "correct_order" && Array.isArray(selectedAnswer) && selectedAnswer.length === (question.orderItems?.length ?? 0));
  const placeKnown = readLocked === fitKey || !readsNow || keepsPlace;
  useLayoutEffect(() => {
    if (!locked) {
      return;
    }
    const wrap = wrapRef.current;
    const promptY = laidOutTop(promptRef.current, wrap);
    const promptH = laidOutHeight(promptRef.current);
    const answersH = laidOutHeight(answersRef.current);
    if (promptY === undefined || promptH === undefined || answersH === undefined) {
      return;
    }
    // Told only what changed: a state update that changes nothing still draws the question again, before the frame.
    if (!promptIn || promptIn.y !== promptY || promptIn.height !== promptH) {
      setPromptBox((was) => (was && was.y === promptY && was.height === promptH ? was : { y: promptY, height: promptH }));
    }
    if (answersH !== answersHeight) {
      setAnswersHeight(answersH);
    }
    if (!keepsPlace && readLocked !== fitKey) {
      setReadLocked(fitKey);
    }
  });
  const layoutNow = fitLayout(answerTiles(question, selectedAnswer, words, retry));
  const fit = useSheetFit({
    open: locked && !sortOrMatch && !shownSheet?.correctList,
    // The height it shows already counts when the sheet has not yet said its full height (its Why line just opened).
    fullHeight: Math.max(sheetFull, sheetHeight),
    room: layoutNow && placeKnown ? sheetRoom(layoutNow).room : undefined,
    layoutKey: `${promptBox?.y}|${promptBox?.height}|${answersHeight}|${tileMoves}`,
    squeezeMoves: !mascotAway && !long
  });
  // The question gives its room first: the grey answers fold away and the mascot hides, until the next question.
  const folded = fit.squeeze && foldable;
  const hideMascot = mascotAway || fit.squeeze;
  const softTiles = answerTiles(question, selectedAnswer, words, retry, folded);
  const softLayout = folded ? fitLayout(softTiles) : layoutNow;
  // How far up from its bottom the right answer holds no text: the sheet's top edge may reach that far into it and cut
  // none of its lines.
  const textEdge = question.type === "multi_select" ? CHECK_TEXT_BOTTOM : tileTextBottom({ compact, tight: look.tight });
  // Even then the sheet at its least (slim, its Why text one line) can reach into the right answer's text, as in
  // lessons: the wrong picks then fold away too, when one sits above the top-most right answer in a column of answers
  // (to pick one, or all that fit) and that keeps the sheet's edge under the right answer's text. The sheet still says
  // it was wrong, and the right tiles and the sheet's "Correct answer" line what was right. While the edge reaches no
  // further into the right answer than under its text, the picks stay. Once folded they stay so while the sheet is up,
  // also when its Why line opens.
  const pickedIndex = softTiles ? softTiles.items.findIndex((option) => isPicked(selectedAnswer, option) && !isAnswerOption(question, option)) : -1;
  const rightIndex = softTiles ? softTiles.items.findIndex((option) => isAnswerOption(question, option)) : -1;
  const pickAbove = softTiles?.columns === 1 && pickedIndex >= 0 && rightIndex > pickedIndex;
  const rightTiles = pickAbove ? answerTiles(question, selectedAnswer, words, retry, "pick") : undefined;
  const rightLayout = rightTiles ? fitLayout(rightTiles) : undefined;
  const pickFolds = usePickFold({
    open: locked,
    now: Boolean(
      locked &&
        fit.squeeze &&
        fit.fitted &&
        sheetLeast > 0 &&
        softLayout &&
        rightLayout &&
        reachesText(softLayout, sheetLeast, textEdge) &&
        !reachesText(rightLayout, sheetLeast, textEdge)
    ),
    tryKey: fitKey
  });
  const tilesShown = pickFolds ? rightTiles : softTiles;
  // Until the sheet has said its least height a wrong pick may still fold, as in lessons: the place worked out without
  // that fold is not where the question goes, so it waits instead of starting there (or hiding the topic label).
  const pickPending = locked && fit.squeeze && fit.fitted && Boolean(rightLayout) && sheetLeast === 0 && !pickFolds;
  const gapRef = (option: string, from: number) => (view: View | null) => {
    if (view) {
      gapViews.current[option] = { view, from };
    } else {
      delete gapViews.current[option];
    }
  };
  // A tile slides up into its place as it first shows, never from under the room's bottom edge (as in lessons).
  const entryRise = (option: string) => {
    const box = tileBoxes.current[option];
    if (!box || answersTop === undefined || !viewport) {
      return POP_IN_DISTANCE;
    }
    const top = answersTop + box.y;
    return top >= viewport - 1 ? 0 : Math.max(0, Math.min(POP_IN_DISTANCE, viewport - (top + box.height)));
  };
  const layout = pickFolds ? rightLayout : softLayout;
  const room = layout ? sheetRoom(layout) : undefined;
  const sheetMaxHeight = locked && fit.fitted && placeKnown && room ? room.room : undefined;
  // A question the learner left scrolled down (by hand or with the arrow) keeps its right answer where it showed, as in
  // lessons: it goes back up only by the room that folds above it, and further down only where the sheet needs it to
  // (see keptScrollY). Where the learner left it and where the right answer then sat are read as CHECK is tapped.
  if (!locked || foldGaps.current.key !== fitKey) {
    foldGaps.current = { key: fitKey, heights: {} };
  }
  const unfolded = answerTiles(question, selectedAnswer, words, retry);
  if (locked && foldGaps.current.scrollAt === undefined) {
    const y = scrolledTo.current.key === fitKey ? scrolledTo.current.y : 0;
    foldGaps.current.scrollAt = y;
    foldGaps.current.from = y > 0.5 && unfolded?.columns === 1 && layoutNow ? { y, focusTop: layoutNow.focusTop } : undefined;
  }
  // How far up from its bottom the prompt holds no text: the margin under it.
  const promptBlank = long || hideMascot ? (look.smallGaps ? PROMPT_GAP_SMALL : PROMPT_GAP) : MASCOT_ROW_GAP;
  /** Where the question sits while the sheet is up, from where the sheet would put it (see keptScrollY). */
  const keptPlace = (sheetY: number, focusTop: number, promptSpan: PartSpan | undefined, tilesAbove: PartSpan[]) => {
    const from = locked ? foldGaps.current.from : undefined;
    if (!from || !promptSpan) {
      return sheetY;
    }
    return keptScrollY(sheetY, from.y + focusTop - from.focusTop, [{ ...promptSpan, blank: promptBlank }, ...tilesAbove], focusTop - space.sm);
  };
  // The answers that stay above the top-most right one while the sheet is up (a column of them), where they sit.
  const rightShown = tilesShown?.columns === 1 ? tilesShown.items.findIndex((option) => isAnswerOption(question, option)) : -1;
  const stayAbove = rightShown > 0 && tilesShown ? tilesShown.items.slice(0, rightShown) : [];
  const tilesAboveIn = (): PartSpan[] =>
    answersTop === undefined || !tilesShown
      ? []
      : stayAbove.flatMap((option) => {
          const span = stackSpan(tilesShown.items, tileBoxes.current, option, answerGap, 1);
          return span ? [{ top: answersTop + span.top, bottom: answersTop + span.bottom, blank: TILE_LIP }] : [];
        });
  /** Where the question's scroll sits while the sheet is up with it `height` tall: kept, where the learner left it. */
  const placeWith = (height: number) =>
    layout && room
      ? keptPlace(sheetScrollY(layout, height, room.furthest), layout.focusTop, promptBox ? { top: promptBox.y, bottom: promptBox.y + promptBox.height } : undefined, tilesAboveIn())
      : 0;

  // The right answer right above the sheet, but never the question scrolled away: on a short phone the prompt stays
  // whole at the top (the sheet names the right answer).
  // Scrolled down to show the right answer, the question can stop part-way through the topic label (and its Arabic)
  // above the prompt: it is gone while the question sits scrolled past its top (and from the render that starts its
  // own scroll past it), so the scroll view's top edge never cuts it, and back once it is scrolled up to it again.
  // A question the learner left scrolled down keeps its right answer where it showed (see placeWith above).
  const scrollTarget = placeWith(sheetHeight);
  // An answer in a column that folds away while the sheet comes up leaves its room, which closes with the sheet's
  // spring (see FoldGap), as in lessons: the right answer glides up as the sheet rises and the prompt stays put. One
  // that folds once the Why line is open goes at once, as the sheet has grown at once. A question the learner left
  // scrolled down scrolls up with the answers above the right one instead, as far as its scroll goes back towards
  // where the question then sits (see foldSoak).
  if (locked && unfolded?.columns === 1 && tilesShown) {
    const gaps = foldGaps.current;
    const scrolledAt = gaps.scrollAt ?? 0;
    const rightAt = unfolded.items.findIndex((option) => isAnswerOption(question, option));
    const newly = unfolded.items
      .map((option, index) => ({ option, index }))
      .filter(({ option }) => !tilesShown.items.includes(option) && gaps.heights[option] === undefined)
      .map(({ option, index }) => {
        const box = tileBoxes.current[option];
        return { id: option, room: !whyOpened && box ? box.height + answerGap : 0, above: index < rightAt };
      });
    if (newly.length > 0) {
      const soak = foldSoak(scrolledAt, scrollTarget);
      const { rooms, left } = foldRooms(newly, soak);
      Object.assign(gaps.heights, rooms);
      gaps.scrollAt = scrolledAt - (soak - left);
    }
  }
  // The answers as laid out right now, read before the frame is drawn where a view can say its place at once: a fold
  // above the right answer (or the prompt wrapping anew as the mascot hides) is seen in the frame it happens, and the
  // question keeps the right answer where it showed (see foldScrollY), as in lessons.
  const placesNow = (): QuestionPlaces | undefined => {
    const wrap = wrapRef.current;
    const wrapTop = laidOutBox(wrap)?.y;
    const answersAt = laidOutTop(answersRef.current, wrap);
    const promptAt = laidOutTop(promptRef.current, wrap);
    if (wrapTop === undefined || answersAt === undefined || promptAt === undefined) {
      return undefined;
    }
    const boxes: Record<string, LayoutBox> = {};
    const answersBox = laidOutHeight(answersRef.current);
    if (answersBox !== undefined) {
      boxes[ANSWERS_FOCUS] = { y: wrapTop + answersAt, height: answersBox };
    }
    // What a gap has closed of the room above a tile so far carried it up on its glide with the sheet, which no
    // scroll is to make up for (as in lessons); where the question goes is worked out with all of that room closed.
    const gaps = Object.values(gapViews.current);
    // The answers as a whole hold their gaps inside, none above.
    const held: Record<string, number> = { [ANSWERS_FOCUS]: 0 };
    for (const item of tilesShown?.items ?? []) {
      const view = tileRefs.current[item];
      const top = laidOutTop(view, wrap);
      const height = laidOutHeight(view);
      if (top !== undefined && height !== undefined) {
        const above = gapsAbove(gaps, wrap, top);
        boxes[item] = { y: wrapTop + top + above.closed, height };
        held[item] = above.held;
      }
    }
    const right = tilesShown?.items.find((option) => isAnswerOption(question, option));
    const focus = right !== undefined && boxes[right] ? right : ANSWERS_FOCUS;
    const box = boxes[focus];
    const closedTop = box ? box.y - (held[focus] ?? 0) : 0;
    const now = box && viewport ? { visibleBottom: viewport + barHeight, promptTop: wrapTop + promptAt, focusTop: closedTop, focusBottom: closedTop + box.height } : undefined;
    const tops: Record<string, number> = {};
    Object.entries(boxes).forEach(([id, entry]) => {
      tops[id] = entry.y;
    });
    if (!now || sheetHeight <= 0) {
      return { tops, focus };
    }
    // Where it goes, worked out as the scroll target is, from the parts as laid out right now.
    const promptHeight = laidOutHeight(promptRef.current);
    const promptNow = promptHeight === undefined ? undefined : { top: now.promptTop, bottom: now.promptTop + promptHeight };
    const above = stayAbove.flatMap((option) => {
      const at = boxes[option];
      return at ? [{ top: at.y - (held[option] ?? 0), bottom: at.y - (held[option] ?? 0) + at.height, blank: TILE_LIP }] : [];
    });
    return { tops, focus, aim: keptPlace(sheetScrollY(now, sheetHeight, sheetRoom(now).furthest), now.focusTop, promptNow, above) };
  };
  // An answer whose text did not show whole in the room as CHECK was tapped is gone while it glides into sight with the
  // question, and fades in once it shows whole, as in lessons (see useGlideIn). A sorting or matching game keeps its
  // own tiles under its list.
  const readGlide = (item: string): GlideRead | undefined => {
    const text = textOnScreen(tileRefs.current[item]);
    const edges = edgesOnScreen(scrollBoxRef.current);
    return text && edges ? { text, top: edges.top, bottom: edges.bottom, sheetTop: sheetTopOnScreen(rootRef.current) } : undefined;
  };
  // Where no view can say its place on screen at once: from the places the tiles reported and the learner's scroll.
  const textTop = question.type === "multi_select" ? CHECK_PAD : tileTextTop({ compact, tight: look.tight });
  const laidOutWhole = (item: string) => {
    const span = tilesShown ? stackSpan(tilesShown.items, tileBoxes.current, item, answerGap, tilesShown.columns) : undefined;
    if (!span || answersTop === undefined || !viewport) {
      return undefined;
    }
    const y = scrolledTo.current.key === fitKey ? scrolledTo.current.y : 0;
    return textInRoom({ top: answersTop + span.top, bottom: answersTop + span.bottom }, { top: textTop, bottom: textEdge }, y, viewport);
  };
  const gliding = useGlideIn({
    open: locked,
    tryKey: fitKey,
    ids: sortOrMatch ? [] : tilesShown?.items ?? [],
    read: readGlide,
    laidOut: laidOutWhole,
    moves: `${sheetHeight}|${whyOpened}`
  });
  // A sorting or matching game keeps its tiles under its own sheet (the right order, or the right pairs, as a list): a
  // row of them the sheet's top edge would cut is gone at once while it is up, as answer tiles are, so the edge never
  // cuts a line of it. Where that edge sits, from the top of the answers.
  const listEdge =
    locked && sortOrMatch && placeKnown && sheetHeight > 0 && layout && room && answersTop !== undefined
      ? scrollTarget + layout.visibleBottom - sheetHeight - answersTop
      : undefined;
  const ownScroll = useQuestionScroll({
    open: locked,
    scrollRef,
    target: scrollTarget,
    ready: sheetHeight > 0 && Boolean(layout && room) && placeKnown,
    settling: (fit.squeeze && !fit.fitted) || pickPending,
    whyOpened,
    viewport,
    partTop: labelTop,
    placesNow
  });
  // Any answer the sheet's top edge would cut (or cover) fades away while it is up, as in lessons: the ones under
  // the top-most right answer that do not sit wholly above it. The next question shows them all again. The sheet is
  // never shorter than its least, also when its room is.
  const shownSheetHeight = sheetMaxHeight !== undefined ? Math.min(sheetHeight, Math.max(sheetMaxHeight, sheetLeast)) : sheetHeight;
  // Its top edge is where it falls with the question where it goes (kept, where the learner left it scrolled down, and
  // once the Why line is open never less far than it was sent), not where the sheet alone would put it, as in lessons:
  // a question kept further down leaves room above the sheet for an answer that stays there.
  const sheetTop =
    locked && fit.fitted && placeKnown && shownSheetHeight > 0 && layout && room
      ? ownScroll.goesTo(placeWith(shownSheetHeight)) + layout.visibleBottom - shownSheetHeight
      : undefined;
  // Only when nothing gives the sheet its room does its top edge reach the right answer: where it would reach into
  // its text, that answer is gone too, with any other the edge would cut, so the edge never cuts a line of it. One
  // the edge reaches only below its text (its lip, border, padding) stays.
  const rightCut = sheetTop !== undefined && layout !== undefined && layout.focusBottom > sheetTop + textEdge;
  const fadedTiles =
    tilesShown && sheetTop !== undefined && answersTop !== undefined
      ? tilesUnderSheet({
          ids: tilesShown.items,
          boxes: tileBoxes.current,
          focusId: rightCut ? undefined : tilesShown.items.find((option) => isAnswerOption(question, option)),
          gap: answerGap,
          columns: tilesShown.columns,
          tilesTop: answersTop,
          sheetTop,
          edge: rightCut ? textEdge : undefined
        })
      : [];
  const onQuestionScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    scrolledTo.current = { key: fitKey, y: event.nativeEvent.contentOffset.y };
    scrollProps.onScroll(event);
    ownScroll.onScroll(event.nativeEvent.contentOffset.y);
    stopsArrow.onScroll(event.nativeEvent.contentOffset.y);
  };

  const onAnswersLayout = (event: LayoutChangeEvent) => {
    setAnswersHeight(Math.round(event.nativeEvent.layout.height));
  };
  // Each answer's layout report and view are taken by the same functions from render to render (they use nothing a
  // render holds), so an answer is drawn again only when what it shows changes.
  const tileHandlers = useRef<Record<string, { onLayout: (event: LayoutChangeEvent) => void; viewRef: (view: View | null) => void }>>({});
  const tileHandlersOf = (item: string) =>
    (tileHandlers.current[item] ??= {
      onLayout: (event: LayoutChangeEvent) => {
        const { y, height } = event.nativeEvent.layout;
        const box = { y: Math.round(y), height: Math.round(height) };
        const before = tileBoxes.current[item];
        tileBoxes.current[item] = box;
        if (!before || before.y !== box.y || before.height !== box.height) {
          setTileMoves((count) => count + 1);
        }
      },
      viewRef: (view: View | null) => {
        tileRefs.current[item] = view;
      }
    });
  const onTileLayout = (item: string) => tileHandlersOf(item).onLayout;

  // A typed answer opens the keyboard: CHECK and the field move up above it instead of hiding under it.
  const keyboardHeight = useKeyboardHeight();
  const promptSize = (long || compact ? 17 : 19) - (look.smallPrompt ? SMALL_PROMPT_STEP : 0);
  const mood: MascotMood = checked === undefined ? "think" : checked ? "cheer" : "sad";

  // A question taller than its room would show an answer cut by the scroll view's bottom edge, the arrow under it, and
  // the answers under that out of sight. As in lessons it takes the steps of its fit instead (tight tiles, the smaller
  // text, a smaller prompt, smaller gaps), only as far as it needs to show every answer whole, from the frame it first
  // shows, and keeps them through the sheet; the next question (or try) is measured afresh. One too tall even then
  // keeps its usual look and scrolls, placed so the room's edge falls between two answers. The screen stays up from
  // question to question, so all it knew of the last one (its arrow, its scroll, its look) is reset before the next one
  // is first drawn.
  const answers = answerTiles(question, selectedAnswer, words, retry);
  // A sorting or matching game takes the steps too: its slots and the steps to place (an order) or its rows (a match)
  // are what must show whole.
  const fitsAnswers = sortOrMatch || Boolean(answers?.items.length);
  const arrowGrowth = scrollHintGrowth(BAR_GAP);
  /**
   * Where each answer (a tile, a cell of the word grid, a slot or a step to place of an order, a row of a match) and,
   * with `head`, the topic label and the prompt start and end in the scroll content with no space above the question,
   * read before the frame is drawn where a view can say its place at once; undefined elsewhere.
   */
  const partRows = (head: boolean): RowSpan[] | undefined => {
    const wrap = wrapRef.current;
    const at = (view: View | null | undefined): RowSpan | undefined => {
      const y = laidOutTop(view, wrap);
      const height = laidOutHeight(view);
      return y === undefined || height === undefined ? undefined : { top: y, bottom: y + height };
    };
    const views = sortOrMatch
      ? Object.entries(tileRefs.current)
          .filter(([key, view]) => key.startsWith(GAME_ROW) && view)
          .map(([, view]) => view)
      : (answers?.items ?? []).map((item) => tileRefs.current[item]);
    const rows = views.map(at);
    if (!rows.length || rows.some((row) => !row)) {
      return undefined;
    }
    const prompt = head ? at(promptRef.current) : undefined;
    if (head && !prompt) {
      return undefined;
    }
    // The label has no height when it shows nothing (a label that gives the answer away, and no "Try again!").
    const label = head ? at(labelRef.current) : undefined;
    return [...(label ? [label] : []), ...(prompt ? [prompt] : []), ...(rows as RowSpan[])].sort((a, b) => a.top - b.top);
  };
  // A question too tall even at the last step of its fit: the places the arrow scrolls it to, where every part in sight
  // is whole, for the room the arrow leaves (see questionStops); its content reaches just so far under its end.
  const tall = sizing.settled && sizing.overflow;
  const arrowRoom = roomIn ? roomIn.height + (roomIn.hint ? arrowGrowth : 0) - arrowGrowth : 0;
  const stops =
    tall && partsIn?.key === fitKey && arrowRoom > 0
      ? questionStops(
          partsIn.rows.map((row) => ({ top: row.top + topSpace, bottom: row.bottom + topSpace })),
          arrowRoom,
          topSpace + (blockIn?.height ?? 0)
        )
      : undefined;
  const stopsArrow = useStopsArrow({ key: fitKey, stops, scrollRef });
  const restBottom = stops && blockIn ? Math.max(0, stops.end + arrowRoom - (topSpace + blockIn.height)) : space.xxl;
  const extraBottom = locked && sheetHeight ? Math.max(space.xxl, sheetHeight - barHeight + space.lg) : restBottom;
  const restMore = useRef(false);
  if (!locked) {
    restMore.current = more;
  }
  // The arrow's room stays in the bar while the sheet is up (the sheet covers the bar), so the room keeps its height; a
  // question too tall even at the last step keeps it all through its try, as in lessons.
  const holdHint = tall || (locked && restMore.current);
  const hintVisible = !locked && (tall || more);
  const hintShown = hintVisible || holdHint;
  const drawn = useRef({ key: fitKey, step: sizing.step, hint: hintShown });
  const known = useRef<{ key: string; content: number } | undefined>(undefined);
  useLayoutEffect(() => {
    drawn.current = { key: fitKey, step: sizing.step, hint: hintShown };
  });
  useLayoutEffect(() => {
    if (locked) {
      return;
    }
    const roomNow = laidOutHeight(scrollBoxRef.current);
    const blockNow = laidOutHeight(wrapRef.current);
    const now = roomNow !== undefined && blockNow !== undefined;
    if (now) {
      setRoomIn(sameRoom({ height: roomNow, hint: hintShown }));
      setBlockIn(sameBlock({ height: blockNow, key: fitKey, step: sizing.step }));
    }
    const roomSeen = now ? { height: roomNow, hint: hintShown } : roomIn;
    const blockSeen = now ? { height: blockNow, key: fitKey, step: sizing.step } : blockIn;
    if (!roomSeen?.height || !blockSeen?.height || blockSeen.key !== fitKey || blockSeen.step !== sizing.step) {
      return;
    }
    // The room with the arrow hidden: the bar grows to hold it.
    const room = roomSeen.height + (roomSeen.hint ? arrowGrowth : 0);
    if (fitsAnswers) {
      // Tight tiles save their padding in each row of tiles; check tiles (pick all that fit) and a match's rows have no
      // tight look, and an order's steps to place are its only tiles.
      const tightRows =
        question.type === "correct_order"
          ? (question.orderItems?.length ?? 0) - (Array.isArray(selectedAnswer) ? selectedAnswer.length : 0)
          : question.type === "multi_select" || question.type === "match_pairs" || !answers
            ? 0
            : answers.columns === 2
              ? Math.ceil(answers.items.length / 2)
              : answers.items.length;
      sizing.measure({
        key: fitKey,
        step: sizing.step,
        now,
        room,
        arrowRoom: room - arrowGrowth,
        // The question starts at the top of the scrolling content and ends with its answers.
        bottom: blockSeen.height,
        tightSaving: tightRows * tightSaving(question.type === "correct_order" ? false : compact),
        tiles: now ? partRows(false) : undefined
      });
    }
    // The arrow shows (or not) in this frame, so the last question's arrow never takes this one's room; a new question
    // starts at the top. Told again only when the question changes: the room changes with the arrow itself.
    const content = topSpace + blockSeen.height + space.xxl;
    if (now && known.current?.key !== fitKey) {
      know(room, content, 0);
    } else if (now && known.current?.content !== content) {
      know(room, content);
    }
    known.current = now ? { key: fitKey, content } : known.current;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locked, fitKey, sizing.step, sizing.settled, roomIn, blockIn, topSpace]);
  // Too tall even at the last step: where its parts sit, read again whenever it is drawn before CHECK (a step placed in
  // an order moves the steps under it).
  useLayoutEffect(() => {
    if (locked || !tall) {
      return;
    }
    const rows = partRows(true);
    if (rows) {
      setPartsIn((before) => (before && before.key === fitKey && sameRows(before.rows, rows) ? before : { key: fitKey, rows }));
    }
  });

  // The parts that show the same while the question places itself above the sheet (the top bar, the topic label, the
  // prompt, the bar under the question and the quit sheet) are kept from render to render and drawn again only when what
  // they show changes, as in lessons: the question drawn again as the sheet opens leaves them as they are. Words inside
  // them follow the language.
  const openQuit = useCallback(() => setQuitOpen(true), []);
  const keepLearning = useCallback(() => setQuitOpen(false), []);
  const quit = useCallback(() => {
    setQuitOpen(false);
    onExit();
  }, [onExit]);
  const topBar = useMemo(
    () => (
      <View style={styles.assessmentTop}>
        <Tappable onPress={openQuit} style={styles.exitButton} accessibilityLabel={t("Close")} hitSlop={10} pressScale={0.88} testID="assessment-close">
          <Icon name="close" size={26} color={CLOSE_GREY} />
        </Tappable>
        <ProgressBar progress={progress} style={styles.progressBar} />
        <Text style={styles.progressCount}>
          {counter.number}/{counter.total}
        </Text>
      </View>
    ),
    // The language is read by t() inside.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [counter.number, counter.total, language, openQuit, progress]
  );
  const skillIcon = SKILL_LOOK[question.category]?.icon ?? "star8";
  const skillRow = useMemo(
    () => (
      <PopIn from="up">
        <View style={[styles.categoryRow, look.smallGaps ? styles.categoryRowSmallGaps : null]}>
          {labelGivesAway ? null : (
            <View style={styles.categoryPill} testID="assessment-skill">
              <Icon name={skillIcon} size={16} />
              <Text style={styles.categoryText} numberOfLines={1}>
                {categoryTitle}
              </Text>
            </View>
          )}
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
    ),
    // The language is read by t() inside.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [arabic, categoryTitle, labelGivesAway, language, look.smallGaps, retry, skillIcon]
  );
  const blankWord = typeof selectedAnswer === "string" ? selectedAnswer : undefined;
  const promptStill = fit.squeeze && !mascotAway;
  const promptBubble = useMemo(
    () => (
      <PromptBubble long={long} hideMascot={hideMascot} still={promptStill} smallGaps={look.smallGaps} mascotVariant={mascotVariant} accent={accent} mood={mood}>
        {scenario ? <Text style={[styles.scenarioText, { fontSize: promptSize - 2 }]}>{withHonorifics(scenario)}</Text> : null}
        {question.type === "fill_in_blank" ? <BlankPrompt prompt={prompt} word={blankWord} checked={checked} size={promptSize} /> : <PromptText size={promptSize}>{prompt}</PromptText>}
        {question.type === "multi_select" ? <Text style={styles.hint}>{t("Pick all that fit")}</Text> : null}
      </PromptBubble>
    ),
    // The language is read by t() inside.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [accent, blankWord, checked, hideMascot, language, long, look.smallGaps, mascotVariant, mood, prompt, promptSize, promptStill, question.type, scenario]
  );
  const onBarLayout = useCallback((event: LayoutChangeEvent) => setBarHeight(Math.round(event.nativeEvent.layout.height)), []);

  return (
    <View ref={rootRef} style={[styles.assessmentRoot, keyboardHeight > 0 ? { paddingBottom: keyboardHeight } : null]} testID="assessment-screen">
      {topBar}

      <View
        ref={scrollBoxRef}
        style={styles.scrollBox}
        onLayout={(event) => setRoomIn(sameRoom({ height: Math.round(event.nativeEvent.layout.height), hint: drawn.current.hint }))}
        testID="assessment-scroll-box"
      >
        <ScrollView
          ref={scrollRef}
          style={styles.scroll}
          contentContainerStyle={{ paddingTop: topSpace, paddingBottom: extraBottom, minHeight: ownScroll.minHeight }}
          keyboardShouldPersistTaps="handled"
          {...scrollProps}
          scrollEventThrottle={EVERY_FRAME}
          onScroll={onQuestionScroll}
        >
          <View
            key={question.id}
            ref={wrapRef}
            style={styles.assessmentWrap}
            onLayout={(event) => setBlockIn(sameBlock({ height: Math.round(event.nativeEvent.layout.height), key: drawn.current.key, step: drawn.current.step }))}
            testID="assessment-question"
          >
            <FadeUnderSheet
              hidden={ownScroll.gone}
              onLayout={(event) => setLabelTop(Math.round(event.nativeEvent.layout.y))}
              viewRef={(view) => {
                labelRef.current = view;
              }}
              testID="assessment-label"
            >
              {skillRow}
            </FadeUnderSheet>

            <View
              ref={promptRef}
              onLayout={(event) => setPromptBox({ y: Math.round(event.nativeEvent.layout.y), height: Math.round(event.nativeEvent.layout.height) })}
              testID="assessment-prompt"
            >
              {promptBubble}
            </View>

            <View ref={answersRef} pointerEvents={locked ? "none" : "auto"} testID="assessment-answers" onLayout={onAnswersLayout}>
              {renderQuestionInput(question, selectedAnswer, change, checked, words, compact, retry, pickFolds ? "pick" : folded, onTileLayout, gliding.length ? [...fadedTiles, ...gliding] : fadedTiles, {
                listEdge,
                tight: look.tight,
                smallText: look.smallText,
                gap: answerGap,
                entryRise,
                foldGap: (option) => foldGaps.current.heights[option] ?? 0,
                gapShut: whyOpened,
                gapRef,
                tileRef: (item) => tileHandlersOf(item).viewRef,
                tapOf
              })}
            </View>
          </View>
        </ScrollView>
      </View>

      <View onLayout={onBarLayout} testID="assessment-bar">
        {/* The "more below" arrow rides on the bar's top edge, where nothing covers it or its taps. */}
        <LessonCheckBar
          label={t("Check")}
          disabled={!canSubmit || locked}
          onCheck={onSubmit}
          testID="assessment-check"
          hintVisible={hintVisible}
          hintHold={holdHint}
          onHint={tall ? stopsArrow.onPress : scrollDown}
          hintDirection={tall ? stopsArrow.direction : undefined}
          hintStill={tall}
          language={language}
        />
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
        onLeastHeight={setSheetLeast}
        onWhyToggle={setWhyOpened}
      />

      <QuitSheet
        visible={quitOpen}
        mascotVariant={mascotVariant}
        accent={accent}
        title={focus ? t("Stop practice?") : t(QUIT_TITLES[assessment.mode])}
        line={t(QUIT_LINE)}
        keepLabel={t("Keep learning")}
        quitLabel={t("Stop")}
        onKeepLearning={keepLearning}
        onQuit={quit}
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

function answerIsSkillName(question: Question, skillName: string) {
  const name = skillName.trim().toLowerCase();
  const answers = [question.correctAnswer, ...(question.acceptedAnswers ?? [])].flat();
  return answers.some((answer) => typeof answer === "string" && answer.trim().toLowerCase() === name);
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
        <Text style={[styles.checkLabel, { color: look.text, textAlign: lineStart() }]}>{withHonorifics(label)}</Text>
        <View style={[styles.checkBox, { backgroundColor: ticked ? look.box : colors.white, borderColor: look.boxBorder }, missed ? styles.missedBox : null]}>
          {ticked ? <Icon name={state === "wrong" ? "close" : "check"} size={16} color={colors.white} /> : null}
        </View>
      </Tappable>
    </Animated.View>
  );
}

type SlotVerdict = "right" | "wrong" | undefined;

/**
 * A filled order slot: tap to take the step back out. A slot in the wrong place shakes after CHECK. Drawn again only
 * when it changes, not when it fades under the sheet's edge.
 */
const OrderSlot = memo(function OrderSlot({ item, index, verdict, onPress }: { item: string; index: number; verdict: SlotVerdict; onPress: () => void }) {
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
});

/**
 * Where each row of a sorting or matching game sits in its answers (its slot, or its pair of tiles), as reported, and
 * which of them the sheet's top edge would cut, at `edge` from the top of the answers (see listEdge): those are gone
 * while the sheet is up.
 */
function useRowsUnderSheet(edge: number | undefined) {
  const [boxes, setBoxes] = useState<Record<number, LayoutBox>>({});
  // Each row's layout report is the same function from render to render, so a row is drawn again only when it changes.
  const rowLayouts = useRef<Record<number, (event: LayoutChangeEvent) => void>>({});
  const onRowLayout = (index: number) =>
    (rowLayouts.current[index] ??= (event: LayoutChangeEvent) => {
      const box = { y: Math.round(event.nativeEvent.layout.y), height: Math.round(event.nativeEvent.layout.height) };
      setBoxes((before) => (before[index]?.y === box.y && before[index]?.height === box.height ? before : { ...before, [index]: box }));
    });
  const under = (index: number) => {
    const box = boxes[index];
    return edge !== undefined && box !== undefined && overRoom(edge, box.y + box.height);
  };
  return { onRowLayout, under };
}

/**
 * One slot of a sorting game: its step (tap to take it back out) or its number while empty. Drawn again only when what it
 * shows changes; `language`: the words of an empty slot follow it.
 */
const OrderCell = memo(function OrderCell({
  index,
  item,
  verdict,
  onPress,
  hidden,
  onLayout,
  viewRef
}: {
  index: number;
  item: string | undefined;
  verdict: SlotVerdict;
  onPress: (() => void) | undefined;
  hidden: boolean;
  onLayout: (event: LayoutChangeEvent) => void;
  viewRef?: (view: View | null) => void;
  language: string;
}) {
  return (
    <FadeUnderSheet hidden={hidden} style={styles.gridCell} onLayout={onLayout} viewRef={viewRef}>
      {item && onPress ? (
        <OrderSlot item={item} index={index} verdict={verdict} onPress={onPress} />
      ) : (
        <View style={styles.slotEmpty} accessibilityLabel={t("Slot {count}", { count: index + 1 })}>
          <Text style={styles.slotEmptyText}>{index + 1}</Text>
        </View>
      )}
    </FadeUnderSheet>
  );
});

function OrderInput({
  question,
  order,
  onChange,
  checked,
  retry,
  listEdge,
  sized = {}
}: {
  question: Question;
  order: string[];
  onChange: (value: SelectedAnswer) => void;
  checked: boolean | undefined;
  retry: boolean;
  /** Where the sheet's top edge sits from the top of the answers, while it is up (see listEdge). */
  listEdge?: number;
  /** How a question too tall for its room draws its steps to place, and each slot's and step's view (see renderQuestionInput). */
  sized?: GameSizing;
}) {
  const items = useMemo(() => getShuffledOrderItems(question, retry), [question, retry]);
  // The slots sit at the top of the answers, so their places in the grid are their places in the answers.
  const rows = useRowsUnderSheet(listEdge);
  // Each step's taps (into its slot, back out of it) are the same functions from render to render and act on the order
  // as the latest render has it, so a slot or step is drawn again only when what it shows changes.
  const latest = useRef({ order, onChange });
  latest.current = { order, onChange };
  const outs = useRef<Record<string, () => void>>({});
  const takeOut = (item: string) => (outs.current[item] ??= () => latest.current.onChange(latest.current.order.filter((entry) => entry !== item)));
  const ins = useRef<Record<string, () => void>>({});
  const putIn = (option: string) => (ins.current[option] ??= () => latest.current.onChange([...latest.current.order, option]));
  const language = getActiveLanguage();
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
          return (
            <OrderCell
              key={`slot-${index}`}
              index={index}
              item={item}
              verdict={slotState(index)}
              onPress={item ? takeOut(item) : undefined}
              hidden={rows.under(index)}
              onLayout={rows.onRowLayout(index)}
              viewRef={sized.tileRef?.(`${GAME_ROW}slot-${index}`)}
              language={language}
            />
          );
        })}
      </View>
      {checked === undefined && remaining.length ? (
        <View style={[styles.choiceList, sized.gap === undefined || sized.gap === ANSWER_GAP ? null : { gap: sized.gap }]}>
          {remaining.map((option) => (
            <View key={option} ref={sized.tileRef?.(`${GAME_ROW}bank-${option}`)}>
              <ChoiceTile label={option} tight={sized.tight} smallText={sized.smallText} onPress={putIn(option)} testID={`order-${option}`} />
            </View>
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

/** One row of a matching game: its two tiles. Drawn again only when what it shows changes; `language`: as OrderCell's. */
const MatchRow = memo(function MatchRow({
  index,
  left,
  right,
  leftNumber,
  rightNumber,
  leftState,
  rightState,
  onLeft,
  onRight,
  hidden,
  onLayout,
  viewRef,
  language
}: {
  index: number;
  left: string | undefined;
  right: string | undefined;
  leftNumber: number | undefined;
  rightNumber: number | undefined;
  leftState: ChoiceTileState;
  rightState: ChoiceTileState;
  onLeft: (() => void) | undefined;
  onRight: (() => void) | undefined;
  hidden: boolean;
  onLayout: (event: LayoutChangeEvent) => void;
  viewRef?: (view: View | null) => void;
  language: string;
}) {
  return (
    <FadeUnderSheet hidden={hidden} onLayout={onLayout} viewRef={viewRef}>
      <MatchPair
        index={index}
        left={left}
        right={right}
        leftNumber={leftNumber}
        rightNumber={rightNumber}
        leftState={leftState}
        rightState={rightState}
        onLeft={onLeft}
        onRight={onRight}
        language={language}
      />
    </FadeUnderSheet>
  );
});

/** A matching row's two tiles and their slide into place: drawn again only when a tile changes, not when it fades. */
const MatchPair = memo(function MatchPair({
  index,
  left,
  right,
  leftNumber,
  rightNumber,
  leftState,
  rightState,
  onLeft,
  onRight
}: {
  index: number;
  left: string | undefined;
  right: string | undefined;
  leftNumber: number | undefined;
  rightNumber: number | undefined;
  leftState: ChoiceTileState;
  rightState: ChoiceTileState;
  onLeft: (() => void) | undefined;
  onRight: (() => void) | undefined;
  language: string;
}) {
  return (
    <PopIn from="up" delay={80 + index * 60} style={styles.matchRow}>
      {left && onLeft ? <PairTile label={left} pairNumber={leftNumber} state={leftState} onPress={onLeft} testID={`match-left-${left}`} /> : <View style={styles.pairSpacer} />}
      {right && onRight ? <PairTile label={right} pairNumber={rightNumber} state={rightState} onPress={onRight} testID={`match-right-${right}`} /> : <View style={styles.pairSpacer} />}
    </PopIn>
  );
});

/**
 * Tap-to-pair: one tile from each side. Paired tiles share a number; tap one again to undo.
 * Each row's two tiles share a height. After CHECK every tile shows the number of its right pair.
 */
function MatchInput({
  question,
  mapping,
  onChange,
  checked,
  retry,
  listEdge,
  sized = {}
}: {
  question: Question;
  mapping: Record<string, string>;
  onChange: (value: SelectedAnswer) => void;
  checked: boolean | undefined;
  retry: boolean;
  /** Where the sheet's top edge sits from the top of the answers, while it is up (see listEdge). */
  listEdge?: number;
  /** The space between its rows for a question too tall for its room, and each row's view (see renderQuestionInput). */
  sized?: GameSizing;
}) {
  const [pick, setPick] = useState<Pick>(undefined);
  // The rows sit at the top of the answers, so their places in the list are their places in the answers.
  const rows = useRowsUnderSheet(listEdge);
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
  // Each tile's tap is the same function from render to render and does what the latest render says, so a row is drawn
  // again only when what it shows changes.
  const tapNow = useRef({ tapLeft, tapRight });
  tapNow.current = { tapLeft, tapRight };
  const leftTaps = useRef<Record<string, () => void>>({});
  const rightTaps = useRef<Record<string, () => void>>({});
  const leftTap = (left: string) => (leftTaps.current[left] ??= () => tapNow.current.tapLeft(left));
  const rightTap = (right: string) => (rightTaps.current[right] ??= () => tapNow.current.tapRight(right));
  const language = getActiveLanguage();

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
    <View style={[styles.matchRows, sized.gap === undefined || sized.gap === ANSWER_GAP ? null : { gap: sized.gap }]}>
      {Array.from({ length: Math.max(lefts.length, rights.length) }, (_, index) => {
        const left = lefts[index];
        const right = rights[index];
        return (
          <MatchRow
            key={`${left ?? ""}|${right ?? ""}`}
            index={index}
            left={left}
            right={right}
            leftNumber={left ? numberLeft(left) : undefined}
            rightNumber={right ? numberRight(right) : undefined}
            leftState={left ? stateLeft(left) : "idle"}
            rightState={right ? stateRight(right) : "idle"}
            onLeft={left ? leftTap(left) : undefined}
            onRight={right ? rightTap(right) : undefined}
            hidden={rows.under(index)}
            onLayout={rows.onRowLayout(index)}
            viewRef={sized.tileRef?.(`${GAME_ROW}row-${index}`)}
            language={language}
          />
        );
      })}
    </View>
  );
}

function isPicked(selectedAnswer: SelectedAnswer, option: string) {
  return Array.isArray(selectedAnswer) ? selectedAnswer.includes(option) : selectedAnswer === option;
}

/**
 * How a question too tall for its room draws its answers (see sheetFit's FIT_STEPS): tight tiles, the smaller text, the
 * space between them; `tileRef` gets each answer's view (a tile, or a game's slot, step to place or row), to read its
 * place before a frame is drawn.
 */
type GameSizing = { tight?: boolean; smallText?: boolean; gap?: number; tileRef?: (item: string) => (view: View | null) => void };

/**
 * One tile of "pick all that fit": fades under the sheet's edge and slides up into its place as it first shows. Drawn
 * again only when what it shows changes, as answer tiles are (see StackTile); `rtl` and `language`: the way the screen's
 * lines run and the words of its label follow them.
 */
const CheckAnswer = memo(function CheckAnswer({
  label,
  state,
  onPress,
  hidden,
  onLayout,
  viewRef,
  delay,
  distance,
  testID
}: {
  label: string;
  state: CheckState;
  onPress: () => void;
  hidden: boolean;
  onLayout?: (event: LayoutChangeEvent) => void;
  viewRef?: (view: View | null) => void;
  delay: number;
  distance?: number;
  testID: string;
  rtl: boolean;
  language: string;
}) {
  return (
    <FadeUnderSheet hidden={hidden} onLayout={onLayout} viewRef={viewRef} testID={testID}>
      <CheckEntry label={label} state={state} onPress={onPress} delay={delay} distance={distance} />
    </FadeUnderSheet>
  );
});

/** A "pick all that fit" tile and its slide into place: drawn again only when the tile changes, not when it fades. */
const CheckEntry = memo(function CheckEntry({ delay, distance, ...tile }: { label: string; state: CheckState; onPress: () => void; delay: number; distance?: number }) {
  return (
    <PopIn from="up" delay={delay} distance={distance}>
      <CheckTile {...tile} />
    </PopIn>
  );
});

/** Answers shown as tiles to tap: a column (one or several to pick) or the fill-in word grid (two columns). */
type AnswerTiles = { columns: 1 | 2; items: string[] };

/**
 * Which answers fold away after CHECK on a short phone to make room for the sheet: none, the grey ones (neither picked
 * nor right), or the picked ones too ("pick": only the right ones stay).
 */
type TileFold = boolean | "pick";

/**
 * The answer tiles in the order shown, with those `fold` folds away gone. Typed, order and match answers are not tiles
 * here.
 */
function answerTiles(question: Question, selectedAnswer: SelectedAnswer, words: string[], retry: boolean, fold: TileFold = false): AnswerTiles | undefined {
  const kept = (option: string) => !fold || (fold !== "pick" && isPicked(selectedAnswer, option)) || isAnswerOption(question, option);
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
  /** After CHECK on a short phone: the answers that fold away to make room for the sheet (see answerTiles). */
  fold: TileFold = false,
  /** Each answer tile reports where it is, so the screen knows where the right one sits. */
  onTileLayout?: (item: string) => (event: LayoutChangeEvent) => void,
  /** The answers the feedback sheet's top edge would cut: they fade away while it is up. */
  faded: string[] = [],
  /**
   * How a question too tall for its room draws its answers (see sheetFit's FIT_STEPS): tight tiles, the smaller text,
   * the space between them; `tileRef` gets each answer's view, to read its place before a frame is drawn.
   */
  sized: GameSizing & {
    listEdge?: number;
    /** How far each tile slides up into its place as it first shows. */
    entryRise?: (item: string) => number;
    /** The room an answer folded while the sheet comes up left (0: none), and whether that room goes at once. */
    foldGap?: (item: string) => number;
    gapShut?: boolean;
    gapRef?: (item: string, from: number) => (view: View | null) => void;
    /** Each answer tile's tap, the same function from render to render (see FoundationAssessmentScreen's tapOf). */
    tapOf?: (item: string) => () => void;
  } = {}
) {
  const tap = (item: string, value: SelectedAnswer) => sized.tapOf?.(item) ?? (() => onChangeSelectedAnswer(value));
  const options = answerTiles(question, selectedAnswer, words, retry, fold)?.items ?? [];
  // A column of answers, each folded one in its place as the room it left (see FoldGap).
  const column = (render: (option: string, index: number) => React.ReactNode) =>
    (answerTiles(question, selectedAnswer, words, retry)?.items ?? []).map((option, index) => {
      if (options.includes(option)) {
        return render(option, index);
      }
      const height = sized.foldGap?.(option) ?? 0;
      return height > 0 ? (
        <FoldGap key={`gap-${option}`} height={height} shut={sized.gapShut} viewRef={sized.gapRef?.(option, height)} style={{ marginBottom: -(sized.gap ?? ANSWER_GAP) }} />
      ) : null;
    });
  const gapStyle = sized.gap === undefined || sized.gap === ANSWER_GAP ? null : { gap: sized.gap };
  if (question.type === "fill_in_blank" && words.length > 1) {
    // Tap the missing word: no typing.
    return (
      <View style={[styles.wordGrid, sized.gap === undefined || sized.gap === ANSWER_GAP ? null : { rowGap: sized.gap }]}>
        {options.map((word, index) => (
          <StackTile
            key={word}
            hidden={faded.includes(word)}
            style={styles.wordCell}
            onLayout={onTileLayout?.(word)}
            viewRef={sized.tileRef?.(word)}
            boxTestID={`assessment-tile-${word}`}
            delay={80 + index * 60}
            distance={sized.entryRise?.(word)}
            label={word}
            compact={compact}
            tight={sized.tight}
            smallText={sized.smallText}
            state={tileState(selectedAnswer === word, checked, isAnswerOption(question, word))}
            onPress={tap(word, word)}
            testID={`word-${word}`}
          />
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
      <View style={[styles.choiceList, gapStyle]}>
        {column((option, index) => {
          const active = selectedValues.includes(option);
          const next = active ? selectedValues.filter((item) => item !== option) : [...selectedValues, option];
          return (
            <CheckAnswer
              key={option}
              label={option}
              state={checkState(active, checked, isAnswerOption(question, option))}
              onPress={tap(option, next)}
              hidden={faded.includes(option)}
              onLayout={onTileLayout?.(option)}
              viewRef={sized.tileRef?.(option)}
              delay={80 + index * 60}
              distance={sized.entryRise?.(option)}
              testID={`assessment-tile-${option}`}
              rtl={isRtlLanguage()}
              language={getActiveLanguage()}
            />
          );
        })}
      </View>
    );
  }

  if (question.type === "correct_order") {
    return (
      <OrderInput question={question} order={Array.isArray(selectedAnswer) ? selectedAnswer : []} onChange={onChangeSelectedAnswer} checked={checked} retry={retry} listEdge={sized.listEdge} sized={sized} />
    );
  }

  if (question.type === "match_pairs") {
    const mapping = selectedAnswer && !Array.isArray(selectedAnswer) && typeof selectedAnswer === "object" ? selectedAnswer : {};
    return <MatchInput key={question.id} question={question} mapping={mapping} onChange={onChangeSelectedAnswer} checked={checked} retry={retry} listEdge={sized.listEdge} sized={sized} />;
  }

  // One long answer makes the whole set use the smaller text (folded or not), so the tiles match and keep their size.
  const longChoices = (question.options ?? []).some((option) => option.length > 60);
  return (
    <View style={[styles.choiceList, gapStyle]}>
      {column((option, index) => (
        <StackTile
          key={option}
          hidden={faded.includes(option)}
          onLayout={onTileLayout?.(option)}
          viewRef={sized.tileRef?.(option)}
          boxTestID={`assessment-tile-${option}`}
          delay={80 + index * 60}
          distance={sized.entryRise?.(option)}
          label={option}
          compact={compact}
          tight={sized.tight}
          smallText={sized.smallText}
          long={longChoices}
          state={tileState(selectedAnswer === option, checked, isAnswerOption(question, option))}
          onPress={tap(option, option)}
        />
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
  categoryRowSmallGaps: { marginBottom: 6 },
  categoryPill: { flexDirection: "row", alignItems: "center", gap: 6, paddingHorizontal: 12, paddingVertical: 3, borderRadius: radii.pill, backgroundColor: colors.correctBg, flexShrink: 1 },
  categoryText: { fontFamily: fonts.displayHeavy, fontSize: 14, lineHeight: 20, color: colors.correctInk, flexShrink: 1 },
  retryChip: { paddingHorizontal: 12, paddingVertical: 3, borderRadius: radii.pill, backgroundColor: RETRY_BG },
  retryText: { fontFamily: fonts.displayHeavy, fontSize: 15, lineHeight: 20, color: RETRY_INK },
  questionRow: { flexDirection: "row", alignItems: "center", marginBottom: MASCOT_ROW_GAP },
  bubbleWrap: { flex: 1, minWidth: 0, marginStart: 4, alignItems: "flex-start" },
  plainPrompt: { marginBottom: PROMPT_GAP },
  plainPromptSmallGaps: { marginBottom: PROMPT_GAP_SMALL },
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
  checkTile: { flexDirection: "row", alignItems: "center", gap: 12, minHeight: 60, paddingHorizontal: 16, paddingVertical: CHECK_PAD, borderRadius: radii.tile, borderWidth: 2, borderBottomWidth: CHECK_LIP },
  // A missed tile's dashed outline is even all round: what its lip gives up goes to the padding under its text, so the
  // tile keeps its size and its text its place at CHECK (a margin would make a one-line tile, held at its least
  // height, 3 px taller and push the tiles under it down).
  missedTile: { borderStyle: "dashed", borderBottomWidth: 2, paddingBottom: CHECK_PAD + CHECK_LIP - 2 },
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
  // A score ("2/6") reads left to right in every language, so right to left it is not drawn "/6 2".
  resultValueRow: { flexDirection: "row", alignItems: "baseline", flexShrink: 1, minWidth: 0, direction: "ltr" },
  resultValue: { fontFamily: fonts.displayHeavy, fontSize: 24, lineHeight: 30 },
  resultOf: { fontFamily: fonts.displayHeavy, fontSize: 15, lineHeight: 30 },
  nextBlock: { alignSelf: "stretch", alignItems: "center", marginTop: space.xl },
  nextTitle: { ...text.tiny, fontFamily: fonts.bodyHeavy, marginBottom: space.sm },
  nextChips: { flexDirection: "row", flexWrap: "wrap", justifyContent: "center", gap: 8 },
  nextChip: { flexDirection: "row", alignItems: "center", gap: 6, paddingHorizontal: 12, paddingVertical: 6, borderRadius: radii.pill, borderWidth: 2, maxWidth: "100%" },
  nextChipButton: { borderBottomWidth: 4, paddingEnd: 8, minHeight: 44 },
  nextChipText: { fontFamily: fonts.displayHeavy, fontSize: 15, lineHeight: 20, flexShrink: 1 }
});
