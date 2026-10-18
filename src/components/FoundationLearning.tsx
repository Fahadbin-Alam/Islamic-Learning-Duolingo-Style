import React, { useMemo, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import Svg, { Circle } from "react-native-svg";
import { getTopicArabic, type ArabicTerm } from "../data/arabicTerms";
import { FOUNDATION_PROGRESS_LABELS } from "../data/foundationQuestionBank";
import { translateStudyText } from "../services/contentLocalization";
import {
  getFoundationDashboard,
  getProgressMapIndex,
  localizeFoundationQuestion
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
  GameButton,
  Icon,
  Mascot,
  PopIn,
  ProgressBar,
  Tappable,
  colors,
  darken,
  fonts,
  lighten,
  radii,
  text,
  type ChoiceTileState,
  type IconName
} from "../ui";

type SelectedAnswer = string | string[] | Record<string, string> | undefined;
type Question = ReturnType<typeof localizeFoundationQuestion>;

const PRAISE = ["Great job!", "Nice!", "Excellent!", "Amazing!", "You got it!", "MashaAllah!"];

// Only categories that have a checked term in src/data/arabicTerms.ts.
const CATEGORY_TOPIC: Partial<Record<FoundationCategoryId, string>> = {
  salah: "prayer",
  fasting: "fasting",
  zakat: "zakat",
  hajj: "hajj",
  iman: "aqidah",
  manners: "manners",
  quran: "quran_tafseer"
};

/** One short name and an icon per skill, for the badge grid. */
const SKILL_LOOK: Record<FoundationCategoryId, { name: string; icon: IconName }> = {
  shahadah: { name: "Shahadah", icon: "crescent" },
  salah: { name: "Salah", icon: "mosque" },
  taharah: { name: "Wudu", icon: "water" },
  fasting: { name: "Fasting", icon: "moon" },
  zakat: { name: "Zakat", icon: "coins" },
  hajj: { name: "Hajj", icon: "kaaba" },
  iman: { name: "Iman", icon: "star8" },
  manners: { name: "Manners", icon: "handHeart" },
  quran: { name: "Quran", icon: "quran" },
  seerah: { name: "Prophets", icon: "scroll" }
};

function categoryArabic(category: FoundationCategoryId): ArabicTerm | undefined {
  const topic = CATEGORY_TOPIC[category];
  return topic ? getTopicArabic(topic) : undefined;
}

function hashOf(seed: string) {
  let hash = 0;
  for (let index = 0; index < seed.length; index += 1) {
    hash = (hash * 31 + seed.charCodeAt(index)) >>> 0;
  }
  return hash;
}

function praiseFor(seed: string) {
  return PRAISE[hashOf(seed) % PRAISE.length];
}

/** Stable shuffle so the right-hand match column never lines up with the left. */
function seededShuffle<T>(items: T[], seed: string) {
  const result = [...items];
  let state = hashOf(seed) || 1;
  for (let index = result.length - 1; index > 0; index -= 1) {
    state = (state * 1103515245 + 12345) >>> 0;
    const swap = state % (index + 1);
    [result[index], result[swap]] = [result[swap], result[index]];
  }
  if (result.length > 1 && result.every((item, index) => item === items[index])) {
    result.push(result.shift() as T);
  }
  return result;
}

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
  mascotVariant = "hijabi"
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
            <Mascot variant={mascotVariant} mood={placed ? "happy" : "wave"} size={78} />
            <View style={styles.heroText}>
              {basics ? (
                <ArabicText size={20} weight="bold" color={colors.correctInk} align="left" numberOfLines={1}>
                  {basics.ar}
                </ArabicText>
              ) : null}
              <Text style={styles.heroTitle} numberOfLines={2}>
                {placed ? "Your map" : "Find your level"}
              </Text>
            </View>
          </View>

          <View style={styles.mapRow} accessibilityLabel={`Level: ${profile.readiness_label}`}>
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
              {profile.readiness_label}
            </Text>
          </View>

          <GameButton
            label={placed ? "Retake" : hasPlacement ? "Resume" : "Start"}
            icon="star8"
            fullWidth
            onPress={onStartPlacement}
          />
          {!placed ? <GameButton label="Skip for now" variant="ghost" color={colors.inkSoft} size="sm" onPress={onSkipAssessment} /> : null}
        </View>
      </PopIn>

      <View style={styles.dashboardCard}>
        <Tappable
          onPress={() => setSkillsOpen((open) => !open)}
          style={styles.skillsHead}
          accessibilityLabel={skillsOpen ? "Hide skills" : "See skills"}
          accessibilityState={{ expanded: skillsOpen }}
          pressScale={0.98}
          testID="foundation-skills-toggle"
        >
          <Text style={styles.cardTitle} numberOfLines={1}>
            Skills
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
                  <View style={styles.skillBadge} accessibilityLabel={`${look.name} ${row.mastery}%`}>
                    <SkillRing progress={row.mastery / 100} color={row.accentColor} icon={look.icon} />
                    <Text style={styles.skillName} numberOfLines={1}>
                      {look.name}
                    </Text>
                    <Text style={[styles.skillMeta, { color: row.mastery > 0 ? darken(row.accentColor, 0.25) : colors.inkSoft }]} numberOfLines={1}>
                      {row.mastery > 0 ? `${row.mastery}%` : "New"}
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

const CONFIDENCE = [
  { value: 2, label: "Not sure" },
  { value: 3, label: "Sure" }
] as const;

function titleFor(question: Question) {
  if (question.type === "correct_order") return "Put these in order";
  if (question.type === "match_pairs") return "Match the pairs";
  return question.prompt;
}

export function FoundationAssessmentScreen({
  assessment,
  language,
  selectedAnswer,
  confidence,
  onChangeSelectedAnswer,
  onChangeConfidence,
  onSubmit,
  onContinue,
  onExit,
  mascotVariant = "hijabi"
}: {
  assessment: FoundationAssessmentState;
  language: SupportedLanguage;
  selectedAnswer: SelectedAnswer;
  confidence: number;
  onChangeSelectedAnswer: (value: SelectedAnswer) => void;
  onChangeConfidence: (value: number) => void;
  onSubmit: () => void;
  onContinue: () => void;
  onExit: () => void;
  mascotVariant?: string;
}) {
  const [showWhy, setShowWhy] = useState(false);
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
      explanationLong: translateStudyText(assessment.feedback.explanationLong, language),
      whyThisMatters: translateStudyText(assessment.feedback.whyThisMatters, language),
      misconceptionNotes: assessment.feedback.misconceptionNotes.map((note) => translateStudyText(note, language)),
      wrongAnswerReasons: assessment.feedback.wrongAnswerReasons.map((note) => translateStudyText(note, language)),
      reviewNext: translateStudyText(assessment.feedback.reviewNext, language),
      confidenceLabel: translateStudyText(assessment.feedback.confidenceLabel, language),
      reflectionPrompt: translateStudyText(assessment.feedback.reflectionPrompt, language)
    };
  }, [assessment.feedback, language]);
  const progress = assessment.questionNumber / Math.max(assessment.totalQuestions, 1);
  const canSubmit = canSubmitAnswer(question.type, selectedAnswer);
  const arabic = categoryArabic(question.category);
  const categoryTitle = SKILL_LOOK[question.category]?.name ?? question.category.charAt(0).toUpperCase() + question.category.slice(1);
  const checked = feedback ? feedback.correct : undefined;
  const locked = checked !== undefined;
  // After CHECK the answer is frozen: taps on tiles change nothing.
  const change = (value: SelectedAnswer) => {
    if (!locked) onChangeSelectedAnswer(value);
  };

  return (
    <View style={styles.assessmentRoot}>
      <View style={styles.assessmentTop}>
        <Tappable onPress={onExit} style={styles.exitButton} accessibilityLabel="Close" hitSlop={8} pressScale={0.9}>
          <Icon name="close" size={22} color={colors.inkSoft} />
        </Tappable>
        <ProgressBar progress={progress} style={styles.progressBar} />
        <Text style={styles.progressCount}>
          {assessment.questionNumber}/{assessment.totalQuestions}
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.assessmentWrap} keyboardShouldPersistTaps="handled">
        <PopIn key={question.id} from="up">
          <View style={styles.categoryRow}>
            <View style={styles.categoryPill}>
              <Icon name={SKILL_LOOK[question.category]?.icon ?? "star8"} size={16} />
              <Text style={styles.categoryText} numberOfLines={1}>
                {categoryTitle}
              </Text>
            </View>
            {arabic ? (
              <ArabicText size={18} weight="bold" color={colors.correctInk} numberOfLines={1}>
                {arabic.ar}
              </ArabicText>
            ) : null}
          </View>
          {question.scenario ? <Text style={styles.scenarioText}>{question.scenario}</Text> : null}
          <Text style={styles.questionPrompt}>{titleFor(question)}</Text>
          {question.type === "multi_select" ? <Text style={styles.hint}>Pick all that fit</Text> : null}

          <View pointerEvents={locked ? "none" : "auto"} testID="assessment-answers">
            {renderQuestionInput(question, selectedAnswer, change, checked)}
          </View>

          {!feedback && (
            <View style={styles.confidenceCard}>
              <Text style={styles.confidenceTitle}>How sure?</Text>
              <View style={styles.confidenceRow}>
                {CONFIDENCE.map((option) => {
                  const active = option.value === 3 ? confidence >= 3 : confidence <= 2;
                  return (
                    <Tappable
                      key={option.value}
                      onPress={() => onChangeConfidence(option.value)}
                      style={[styles.confidencePill, active && styles.confidencePillActive]}
                      accessibilityRole="radio"
                      accessibilityState={{ checked: active }}
                      accessibilityLabel={option.label}
                      pressScale={0.95}
                    >
                      <Text style={[styles.confidenceText, active && styles.confidenceTextActive]} numberOfLines={1}>
                        {option.label}
                      </Text>
                    </Tappable>
                  );
                })}
              </View>
            </View>
          )}
        </PopIn>
      </ScrollView>

      {feedback ? (
        <PopIn from="up">
          <View style={[styles.feedbackCard, feedback.correct ? styles.feedbackGood : styles.feedbackBad]}>
            <ScrollView style={styles.feedbackScroll} contentContainerStyle={styles.feedbackInner}>
              <View style={styles.feedbackHead}>
                <Mascot variant={mascotVariant} mood={feedback.correct ? "cheer" : "sad"} size={58} animated={false} />
                <Text style={[styles.feedbackTitle, { color: feedback.correct ? colors.correctInk : colors.wrongInk }]}>
                  {feedback.correct ? praiseFor(question.id) : "Not quite"}
                </Text>
              </View>
              <Text style={[styles.feedbackLine, { color: feedback.correct ? colors.correctInk : colors.wrongInk }]}>{feedback.explanationShort}</Text>
              {showWhy ? (
                <View style={styles.reasonList}>
                  <Text style={styles.feedbackReason}>{feedback.whyThisMatters}</Text>
                  {feedback.misconceptionNotes[0] ? <Text style={styles.feedbackReason}>{feedback.misconceptionNotes[0]}</Text> : null}
                  {feedback.wrongAnswerReasons.slice(0, 2).map((reason) => (
                    <Text key={reason} style={styles.feedbackReason}>
                      {reason}
                    </Text>
                  ))}
                  <Text style={styles.feedbackReason}>{`Next: ${feedback.reviewNext}`}</Text>
                </View>
              ) : (
                <Tappable
                  onPress={() => setShowWhy(true)}
                  style={[styles.whyButton, { borderColor: feedback.correct ? lighten(colors.green, 0.4) : lighten(colors.heart, 0.4) }]}
                  accessibilityLabel="Why?"
                  pressScale={0.95}
                >
                  <Icon name="info" size={20} color={feedback.correct ? colors.correctInk : colors.wrongInk} />
                  <Text style={[styles.whyText, { color: feedback.correct ? colors.correctInk : colors.wrongInk }]}>Why?</Text>
                </Tappable>
              )}
            </ScrollView>
            <GameButton
              label="Continue"
              variant={feedback.correct ? "primary" : "danger"}
              fullWidth
              onPress={() => {
                setShowWhy(false);
                onContinue();
              }}
            />
          </View>
        </PopIn>
      ) : (
        <View style={styles.footer}>
          <GameButton label="Check" fullWidth disabled={!canSubmit} onPress={onSubmit} />
        </View>
      )}
    </View>
  );
}

function tileState(active: boolean, correct: boolean | undefined, isAnswer = false): ChoiceTileState {
  if (correct === undefined) return active ? "selected" : "idle";
  // After a wrong pick the right option lights up green.
  if (isAnswer && (active || !correct)) return "correct";
  if (!active) return "dimmed";
  return correct ? "correct" : "wrong";
}

function isAnswerOption(question: Question, option: string) {
  const answer = question.correctAnswer;
  if (typeof answer === "string") return answer === option || (question.acceptedAnswers ?? []).includes(option);
  if (Array.isArray(answer)) return answer.includes(option);
  return false;
}

const CHECK_LOOK: Record<ChoiceTileState, { bg: string; border: string; lip: string; text: string; box: string; boxBorder: string }> = {
  idle: { bg: colors.white, border: colors.line, lip: colors.lineLip, text: colors.ink, box: colors.white, boxBorder: colors.lineLip },
  selected: { bg: lighten(colors.gem, 0.86), border: lighten(colors.gem, 0.25), lip: colors.gem, text: colors.gemLip, box: colors.gem, boxBorder: colors.gem },
  correct: { bg: colors.correctBg, border: lighten(colors.green, 0.2), lip: colors.green, text: colors.correctInk, box: colors.green, boxBorder: colors.green },
  wrong: { bg: colors.wrongBg, border: lighten(colors.heart, 0.2), lip: colors.heart, text: colors.wrongInk, box: colors.heart, boxBorder: colors.heart },
  disabled: { bg: colors.white, border: colors.line, lip: colors.line, text: colors.inkSoft, box: colors.white, boxBorder: colors.line },
  dimmed: { bg: colors.white, border: colors.line, lip: colors.lineLip, text: colors.ink, box: colors.white, boxBorder: colors.lineLip }
};

/** Multi-select tile: an empty box says "you may pick more than one"; a blue tick means picked, green only after CHECK. */
function CheckTile({ label, state, onPress }: { label: string; state: ChoiceTileState; onPress: () => void }) {
  const look = CHECK_LOOK[state];
  const ticked = state === "selected" || state === "correct" || state === "wrong";
  return (
    <Tappable
      onPress={onPress}
      disabled={state === "dimmed" || state === "disabled"}
      accessibilityRole="checkbox"
      accessibilityLabel={label}
      accessibilityState={{ checked: state === "selected" || state === "correct" }}
      pressScale={0.97}
      style={[
        styles.checkTile,
        { backgroundColor: look.bg, borderColor: look.border, borderBottomColor: look.lip },
        state === "dimmed" ? styles.dimmedTile : null
      ]}
    >
      <Text style={[styles.checkLabel, { color: look.text }]}>{label}</Text>
      <View style={[styles.checkBox, { backgroundColor: ticked ? look.box : colors.white, borderColor: look.boxBorder }]}>
        {ticked ? <Icon name={state === "wrong" ? "close" : "check"} size={16} color={colors.white} /> : null}
      </View>
    </Tappable>
  );
}

function OrderInput({ question, order, onChange, checked }: { question: Question; order: string[]; onChange: (value: SelectedAnswer) => void; checked: boolean | undefined }) {
  const items = question.orderItems ?? [];
  const remaining = items.filter((item) => !order.includes(item));
  const slotState = (index: number) => {
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
                <Tappable
                  onPress={() => onChange(order.filter((entry) => entry !== item))}
                  style={[styles.slotFilled, verdict === "right" ? styles.slotRight : verdict === "wrong" ? styles.slotWrong : null]}
                  accessibilityLabel={`${index + 1}: ${item}`}
                  pressScale={0.95}
                >
                  <View style={[styles.slotNumber, verdict === "right" ? { backgroundColor: colors.green } : verdict === "wrong" ? { backgroundColor: colors.heart } : null]}>
                    <Text style={styles.slotNumberText}>{index + 1}</Text>
                  </View>
                  <Text style={styles.slotText}>{item}</Text>
                </Tappable>
              ) : (
                <View style={styles.slotEmpty} accessibilityLabel={`Slot ${index + 1}`}>
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
            <ChoiceTile key={option} label={option} onPress={() => onChange([...order, option])} />
          ))}
        </View>
      ) : null}
    </View>
  );
}

const PAIR_COLORS = [colors.gem, colors.flame, colors.goldLip, darken(colors.gem, 0.4), colors.green];

/** Match tile: picked = blue outline, paired = the pair's color and number, after CHECK green or red. */
function PairTile({ label, state, pairNumber, onPress, testID }: { label: string; state: ChoiceTileState; pairNumber?: number; onPress: () => void; testID: string }) {
  const tint = pairNumber ? PAIR_COLORS[(pairNumber - 1) % PAIR_COLORS.length] : colors.gem;
  const checkedLook = state === "correct" || state === "wrong" || state === "dimmed" ? CHECK_LOOK[state] : undefined;
  const face = checkedLook
    ? { backgroundColor: checkedLook.bg, borderColor: checkedLook.border, borderBottomColor: checkedLook.lip }
    : state === "selected"
      ? { backgroundColor: lighten(tint, 0.86), borderColor: lighten(tint, 0.3), borderBottomColor: tint }
      : { backgroundColor: colors.white, borderColor: colors.line, borderBottomColor: colors.lineLip };
  const ink = checkedLook ? checkedLook.text : state === "selected" ? darken(tint, 0.3) : colors.ink;
  const chip = checkedLook && state !== "dimmed" ? checkedLook.box : tint;
  return (
    <Tappable
      onPress={onPress}
      disabled={state === "dimmed"}
      style={[styles.pairTile, face, state === "dimmed" ? styles.dimmedTile : null]}
      accessibilityLabel={pairNumber ? `${label}, pair ${pairNumber}` : label}
      accessibilityState={{ selected: state === "selected" }}
      pressScale={0.96}
      testID={testID}
    >
      <Text style={[styles.pairText, { color: ink }]}>{label}</Text>
      {pairNumber ? (
        <View style={[styles.pairChip, { backgroundColor: chip }]} pointerEvents="none">
          <Text style={styles.pairChipText}>{pairNumber}</Text>
        </View>
      ) : null}
    </Tappable>
  );
}

type Pick = { side: "left" | "right"; value: string } | undefined;

/** Tap-to-pair: one tile from each column. Paired tiles share a number; tap one again to undo. */
function MatchInput({ question, mapping, onChange, checked }: { question: Question; mapping: Record<string, string>; onChange: (value: SelectedAnswer) => void; checked: boolean | undefined }) {
  const [pick, setPick] = useState<Pick>(undefined);
  const lefts = (question.pairs ?? []).map((pair) => pair.left);
  const rights = useMemo(() => seededShuffle(question.options ?? [], question.id), [question.id, question.options]);
  const answer = question.correctAnswer && typeof question.correctAnswer === "object" && !Array.isArray(question.correctAnswer) ? question.correctAnswer : {};
  const pairedLefts = Object.keys(mapping);
  const numberOfLeft = (left: string) => pairedLefts.indexOf(left) + 1;
  const leftOfRight = (right: string) => pairedLefts.find((left) => mapping[left] === right);

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
    if (checked !== undefined) return mapping[left] ? (answer[left] === mapping[left] ? "correct" : "wrong") : "dimmed";
    return mapping[left] || (pick?.side === "left" && pick.value === left) ? "selected" : "idle";
  };
  const stateRight = (right: string): ChoiceTileState => {
    const owner = leftOfRight(right);
    if (checked !== undefined) return owner ? (answer[owner] === right ? "correct" : "wrong") : "dimmed";
    return owner || (pick?.side === "right" && pick.value === right) ? "selected" : "idle";
  };

  return (
    <View style={styles.matchColumns}>
      <View style={styles.matchColumn}>
        {lefts.map((left) => (
          <PairTile
            key={left}
            label={left}
            pairNumber={mapping[left] ? numberOfLeft(left) : undefined}
            state={stateLeft(left)}
            onPress={() => tapLeft(left)}
            testID={`match-left-${left}`}
          />
        ))}
      </View>
      <View style={styles.matchColumn}>
        {rights.map((right) => {
          const owner = leftOfRight(right);
          return (
            <PairTile
              key={right}
              label={right}
              pairNumber={owner ? numberOfLeft(owner) : undefined}
              state={stateRight(right)}
              onPress={() => tapRight(right)}
              testID={`match-right-${right}`}
            />
          );
        })}
      </View>
    </View>
  );
}

function renderQuestionInput(
  question: Question,
  selectedAnswer: SelectedAnswer,
  onChangeSelectedAnswer: (value: SelectedAnswer) => void,
  checked: boolean | undefined
) {
  if (question.type === "fill_in_blank" || question.type === "reflection_prompt") {
    if (checked !== undefined) {
      return (
        <View style={[styles.answerEcho, checked ? styles.feedbackGood : styles.feedbackBad]}>
          <Text style={styles.choiceText}>{typeof selectedAnswer === "string" ? selectedAnswer : ""}</Text>
        </View>
      );
    }
    return (
      <TextInput
        multiline={question.type === "reflection_prompt"}
        value={typeof selectedAnswer === "string" ? selectedAnswer : ""}
        onChangeText={(value) => onChangeSelectedAnswer(value)}
        placeholder={question.type === "reflection_prompt" ? "Write a few words" : "Type your answer"}
        placeholderTextColor={colors.inkSoft}
        style={[styles.input, question.type === "reflection_prompt" && styles.inputTall]}
      />
    );
  }

  if (question.type === "multi_select") {
    const selectedValues = Array.isArray(selectedAnswer) ? selectedAnswer : [];
    return (
      <View style={styles.choiceList}>
        {question.options?.map((option) => {
          const active = selectedValues.includes(option);
          const next = active ? selectedValues.filter((item) => item !== option) : [...selectedValues, option];
          return (
            <CheckTile
              key={option}
              label={option}
              state={tileState(active, checked, isAnswerOption(question, option))}
              onPress={() => onChangeSelectedAnswer(next)}
            />
          );
        })}
      </View>
    );
  }

  if (question.type === "correct_order") {
    return <OrderInput question={question} order={Array.isArray(selectedAnswer) ? selectedAnswer : []} onChange={onChangeSelectedAnswer} checked={checked} />;
  }

  if (question.type === "match_pairs") {
    const mapping = selectedAnswer && !Array.isArray(selectedAnswer) && typeof selectedAnswer === "object" ? selectedAnswer : {};
    return <MatchInput key={question.id} question={question} mapping={mapping} onChange={onChangeSelectedAnswer} checked={checked} />;
  }

  return (
    <View style={styles.choiceList}>
      {question.options?.map((option) => (
        <ChoiceTile
          key={option}
          label={option}
          state={tileState(selectedAnswer === option, checked, isAnswerOption(question, option))}
          onPress={() => onChangeSelectedAnswer(option)}
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
  assessmentRoot: { flex: 1, backgroundColor: colors.snow },
  assessmentWrap: { paddingHorizontal: 16, paddingBottom: 24, paddingTop: 4 },
  assessmentTop: { flexDirection: "row", alignItems: "center", gap: 12, paddingHorizontal: 16, paddingTop: 12, paddingBottom: 8 },
  exitButton: { width: 36, height: 36, borderRadius: 18, alignItems: "center", justifyContent: "center" },
  progressBar: { flex: 1 },
  progressCount: { fontFamily: fonts.displayHeavy, fontSize: 15, lineHeight: 20, color: colors.inkSoft },
  categoryRow: { flexDirection: "row", flexWrap: "wrap", alignItems: "center", gap: 10, marginTop: 6 },
  categoryPill: { flexDirection: "row", alignItems: "center", gap: 6, paddingHorizontal: 12, paddingVertical: 3, borderRadius: radii.pill, backgroundColor: colors.correctBg, flexShrink: 1 },
  categoryText: { fontFamily: fonts.displayHeavy, fontSize: 14, lineHeight: 20, color: colors.correctInk, flexShrink: 1 },
  scenarioText: { ...text.small, fontFamily: fonts.bodyBold, marginTop: 8 },
  questionPrompt: { ...text.h2, fontSize: 24, lineHeight: 31, marginTop: 6 },
  hint: { ...text.small, fontFamily: fonts.bodyHeavy, color: colors.gemLip, marginTop: 2 },
  choiceList: { gap: 10, marginTop: 16 },
  choiceText: { ...text.bodyBold },
  answerEcho: { marginTop: 16, borderRadius: radii.tile, padding: 14 },
  input: {
    minHeight: 54,
    borderRadius: radii.tile,
    borderWidth: 2,
    borderColor: colors.line,
    backgroundColor: colors.mist,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginTop: 16,
    color: colors.ink,
    fontFamily: fonts.bodyBold,
    fontSize: 17
  },
  inputTall: { minHeight: 132, textAlignVertical: "top" },
  checkTile: { flexDirection: "row", alignItems: "center", gap: 12, minHeight: 60, paddingHorizontal: 16, paddingVertical: 12, borderRadius: radii.tile, borderWidth: 2, borderBottomWidth: 5 },
  dimmedTile: { opacity: 0.45 },
  checkLabel: { flex: 1, minWidth: 0, fontFamily: fonts.bodyHeavy, fontSize: 17, lineHeight: 23 },
  checkBox: { width: 28, height: 28, borderRadius: 8, borderWidth: 2, alignItems: "center", justifyContent: "center" },
  confidenceCard: { marginTop: 20, gap: 8 },
  confidenceTitle: { ...text.tiny },
  confidenceRow: { flexDirection: "row", gap: 10 },
  confidencePill: { flex: 1, flexBasis: 0, minWidth: 0, minHeight: 46, alignItems: "center", justifyContent: "center", borderRadius: radii.tile, paddingHorizontal: 10, backgroundColor: colors.white, borderWidth: 2, borderBottomWidth: 4, borderColor: colors.line },
  confidencePillActive: { backgroundColor: lighten(colors.gem, 0.88), borderColor: colors.gem },
  confidenceText: { fontFamily: fonts.displayHeavy, fontSize: 16, lineHeight: 21, color: colors.inkSoft, flexShrink: 1 },
  confidenceTextActive: { color: colors.gemLip },
  footer: { paddingHorizontal: 16, paddingTop: 10, paddingBottom: 16, borderTopWidth: 2, borderTopColor: colors.line, backgroundColor: colors.snow },
  feedbackCard: { paddingHorizontal: 16, paddingTop: 12, paddingBottom: 16, borderTopLeftRadius: radii.sheet, borderTopRightRadius: radii.sheet, gap: 10 },
  feedbackScroll: { maxHeight: 280 },
  feedbackInner: { gap: 8 },
  feedbackGood: { backgroundColor: colors.correctBg },
  feedbackBad: { backgroundColor: colors.wrongBg },
  feedbackHead: { flexDirection: "row", alignItems: "center", gap: 10 },
  feedbackTitle: { ...text.h2, flex: 1, minWidth: 0 },
  feedbackLine: { fontFamily: fonts.bodyBold, fontSize: 16, lineHeight: 22 },
  whyButton: { flexDirection: "row", alignItems: "center", gap: 6, alignSelf: "flex-start", minHeight: 44, paddingHorizontal: 16, borderRadius: radii.pill, borderWidth: 2, backgroundColor: colors.white },
  whyText: { fontFamily: fonts.displayHeavy, fontSize: 16, lineHeight: 22 },
  reasonList: { gap: 6, marginTop: 2 },
  feedbackReason: { ...text.small, color: colors.ink },
  orderWrap: { marginTop: 16, gap: 4 },
  grid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", rowGap: 8 },
  gridCell: { width: "48.5%" },
  slotEmpty: { minHeight: 52, borderRadius: radii.tile, borderWidth: 2, borderStyle: "dashed", borderColor: colors.lineLip, backgroundColor: colors.mist, alignItems: "center", justifyContent: "center" },
  slotEmptyText: { fontFamily: fonts.displayHeavy, fontSize: 18, lineHeight: 24, color: colors.lineLip },
  slotFilled: { minHeight: 52, flexDirection: "row", alignItems: "center", gap: 8, paddingHorizontal: 8, paddingVertical: 6, borderRadius: radii.tile, borderWidth: 2, borderBottomWidth: 4, borderColor: lighten(colors.gem, 0.45), borderBottomColor: colors.gem, backgroundColor: lighten(colors.gem, 0.88) },
  slotRight: { borderColor: lighten(colors.green, 0.3), borderBottomColor: colors.green, backgroundColor: colors.correctBg },
  slotWrong: { borderColor: lighten(colors.heart, 0.3), borderBottomColor: colors.heart, backgroundColor: colors.wrongBg },
  slotNumber: { width: 24, height: 24, borderRadius: 12, backgroundColor: colors.gem, alignItems: "center", justifyContent: "center" },
  slotNumberText: { fontFamily: fonts.displayHeavy, fontSize: 13, lineHeight: 18, color: colors.white },
  slotText: { flex: 1, minWidth: 0, fontFamily: fonts.bodyHeavy, fontSize: 14, lineHeight: 19, color: colors.ink },
  matchColumns: { flexDirection: "row", gap: 10, marginTop: 16 },
  matchColumn: { flex: 1, flexBasis: 0, minWidth: 0, gap: 10 },
  pairTile: { minHeight: 64, alignItems: "center", justifyContent: "center", paddingHorizontal: 10, paddingVertical: 10, borderRadius: radii.tile, borderWidth: 2, borderBottomWidth: 5 },
  pairText: { fontFamily: fonts.bodyHeavy, fontSize: 15, lineHeight: 20, textAlign: "center", maxWidth: "100%" },
  pairChip: { position: "absolute", top: -9, right: -7, width: 24, height: 24, borderRadius: 12, borderWidth: 2, borderColor: colors.white, alignItems: "center", justifyContent: "center" },
  pairChipText: { fontFamily: fonts.displayHeavy, fontSize: 12, lineHeight: 16, color: colors.white }
});
