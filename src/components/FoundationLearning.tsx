import React, { useMemo } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { FOUNDATION_PROGRESS_LABELS } from "../data/foundationQuestionBank";
import { translateStudyText } from "../services/contentLocalization";
import {
  getFoundationDashboard,
  getProgressMapIndex,
  localizeFoundationQuestion
} from "../services/foundationAssessment";
import type {
  FoundationAssessmentState,
  LearnerProfile,
  SupportedLanguage
} from "../types";

type SelectedAnswer = string | string[] | Record<string, string> | undefined;

export function FoundationDashboard({
  profile,
  onStartPlacement,
  onStartReview,
  onStartDailyChallenge
}: {
  profile: LearnerProfile;
  onStartPlacement: () => void;
  onStartReview: () => void;
  onStartDailyChallenge: () => void;
}) {
  const rows = useMemo(() => getFoundationDashboard(profile), [profile]);
  const progressIndex = getProgressMapIndex(profile.readiness_label);
  const hasPlacement = profile.totalQuestionsAnswered > 0;

  return (
    <View style={styles.dashboardWrap}>
      <View style={styles.heroCard}>
        <Text style={styles.eyebrow}>Foundation assessment</Text>
        <Text style={styles.heroTitle}>
          {profile.assessmentCompleted ? "Your foundation map" : "Start with a real placement check"}
        </Text>
        <Text style={styles.heroCopy}>
          We track strength across belief, worship, manners, Quran basics, and seerah so later topics unlock from real understanding.
        </Text>
        <View style={styles.heroStatRow}>
          <StatCard label="Overall" value={profile.readiness_label} />
          <StatCard label="Weak areas" value={String(profile.weak_areas.length)} />
          <StatCard label="Needs review" value={String(profile.needs_review_question_ids.length)} />
        </View>
        <View style={styles.heroButtonRow}>
          <Pressable onPress={onStartPlacement} style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>
              {profile.assessmentCompleted ? "Retake placement" : hasPlacement ? "Resume placement" : "Start placement"}
            </Text>
          </Pressable>
          <Pressable onPress={onStartReview} style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>Mistake review</Text>
          </Pressable>
          <Pressable onPress={onStartDailyChallenge} style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>Daily challenge</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.dashboardCard}>
        <Text style={styles.cardTitle}>Progress map</Text>
        <View style={styles.progressMapRow}>
          {FOUNDATION_PROGRESS_LABELS.map((label, index) => {
            const active = index <= progressIndex;

            return (
              <View key={label} style={styles.progressStep}>
                <View style={[styles.progressDot, active && styles.progressDotActive]} />
                <Text style={[styles.progressLabel, active && styles.progressLabelActive]}>{label}</Text>
              </View>
            );
          })}
        </View>
      </View>

      <View style={styles.dashboardCard}>
        <Text style={styles.cardTitle}>Skill strength</Text>
        <Text style={styles.cardCopy}>
          Each category keeps its own accuracy, confidence, adaptive difficulty, weakness tags, and recovery streak.
        </Text>
        <View style={styles.skillList}>
          {rows.map((row) => (
            <View key={row.category} style={styles.skillRow}>
              <View style={styles.skillHeader}>
                <Text style={styles.skillTitle}>{row.title}</Text>
                <Text style={styles.skillMeta}>
                  {row.mastery}% | diff {row.profile.currentEstimatedDifficulty}
                </Text>
              </View>
              <View style={styles.skillBarTrack}>
                <View
                  style={[
                    styles.skillBarFill,
                    {
                      width: `${Math.max(6, row.mastery)}%`,
                      backgroundColor: row.accentColor
                    }
                  ]}
                />
              </View>
              <Text style={styles.skillSubMeta}>
                {row.profile.readinessLabel} | {row.profile.questionsAnsweredCorrectly}/{row.profile.questionsAttempted} correct
              </Text>
              {row.profile.weaknessTags.length > 0 && (
                <View style={styles.tagRow}>
                  {row.profile.weaknessTags.slice(0, 4).map((tag) => (
                    <View key={`${row.category}_${tag}`} style={styles.tagPill}>
                      <Text style={styles.tagText}>{tag}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          ))}
        </View>
      </View>

      <View style={styles.twoUpRow}>
        <View style={styles.sideCard}>
          <Text style={styles.cardTitle}>Needs review</Text>
          <Text style={styles.cardCopy}>
            {profile.needs_review_question_ids.length
              ? `${profile.needs_review_question_ids.length} questions are queued for spaced repetition from missed concepts.`
              : "No questions are queued right now. Once you miss a concept, it comes back until it is stable."}
          </Text>
        </View>
        <View style={styles.sideCard}>
          <Text style={styles.cardTitle}>Daily challenge</Text>
          <Text style={styles.cardCopy}>
            Daily challenges mix weak-area review with one stronger category so recall stays fresh while depth grows.
          </Text>
        </View>
      </View>
    </View>
  );
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
  onExit
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
}) {
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

  return (
    <ScrollView contentContainerStyle={styles.assessmentWrap}>
      <View style={styles.assessmentTop}>
        <Pressable onPress={onExit} style={styles.exitButton}>
          <Text style={styles.exitButtonText}>Back</Text>
        </Pressable>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
        </View>
        <Text style={styles.progressCount}>
          {assessment.questionNumber}/{assessment.totalQuestions}
        </Text>
      </View>

      <View style={styles.assessmentCard}>
        <Text style={styles.eyebrow}>
          {question.category} | level {question.difficulty} | {question.type.replace(/_/g, " ")}
        </Text>
        {question.scenario ? <Text style={styles.scenarioText}>{question.scenario}</Text> : null}
        <Text style={styles.questionPrompt}>{question.prompt}</Text>

        {!assessment.feedback && renderQuestionInput(question, selectedAnswer, onChangeSelectedAnswer)}

        {!assessment.feedback && (
          <View style={styles.confidenceCard}>
            <Text style={styles.confidenceTitle}>How sure are you?</Text>
            <View style={styles.confidenceRow}>
              {[1, 2, 3, 4].map((value) => (
                <Pressable
                  key={value}
                  onPress={() => onChangeConfidence(value)}
                  style={[styles.confidencePill, confidence === value && styles.confidencePillActive]}
                >
                  <Text style={[styles.confidenceText, confidence === value && styles.confidenceTextActive]}>
                    {value === 1 ? "Guessing" : value === 2 ? "Unsure" : value === 3 ? "Sure" : "Very sure"}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
        )}
      </View>

      {feedback ? (
        <View
          style={[
            styles.feedbackCard,
            feedback.correct ? styles.feedbackGood : styles.feedbackBad
          ]}
        >
          <Text style={styles.feedbackTitle}>{feedback.correct ? "Correct" : "Not quite"}</Text>
          <Text style={styles.feedbackLine}>Why: {feedback.explanationShort}</Text>
          <Text style={styles.feedbackLine}>Why this matters: {feedback.whyThisMatters}</Text>
          <Text style={styles.feedbackLine}>Watch out: {feedback.misconceptionNotes[0] ?? "This idea often gets mixed up with nearby concepts."}</Text>
          <Text style={styles.feedbackLine}>Review next: {feedback.reviewNext}</Text>
          {feedback.wrongAnswerReasons.length > 0 && (
            <View style={styles.reasonList}>
              {feedback.wrongAnswerReasons.slice(0, 2).map((reason) => (
                <Text key={reason} style={styles.feedbackReason}>
                  - {reason}
                </Text>
              ))}
            </View>
          )}
          <Pressable onPress={onContinue} style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Continue</Text>
          </Pressable>
        </View>
      ) : (
        <Pressable onPress={onSubmit} style={[styles.primaryButton, !canSubmit && styles.disabledButton]} disabled={!canSubmit}>
          <Text style={styles.primaryButtonText}>Check answer</Text>
        </Pressable>
      )}
    </ScrollView>
  );
}

function renderQuestionInput(
  question: ReturnType<typeof localizeFoundationQuestion>,
  selectedAnswer: SelectedAnswer,
  onChangeSelectedAnswer: (value: SelectedAnswer) => void
) {
  if (question.type === "fill_in_blank" || question.type === "reflection_prompt") {
    return (
      <TextInput
        multiline={question.type === "reflection_prompt"}
        value={typeof selectedAnswer === "string" ? selectedAnswer : ""}
        onChangeText={(value) => onChangeSelectedAnswer(value)}
        placeholder={question.type === "reflection_prompt" ? "Write a short reflection" : "Type your answer"}
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
          const next = active
            ? selectedValues.filter((item) => item !== option)
            : [...selectedValues, option];

          return (
            <Pressable
              key={option}
              onPress={() => onChangeSelectedAnswer(next)}
              style={[styles.choiceButton, active && styles.choiceButtonActive]}
            >
              <Text style={[styles.choiceText, active && styles.choiceTextActive]}>{option}</Text>
            </Pressable>
          );
        })}
      </View>
    );
  }

  if (question.type === "correct_order") {
    const order = Array.isArray(selectedAnswer) ? selectedAnswer : [];
    const remaining = question.orderItems?.filter((item) => !order.includes(item)) ?? [];

    return (
      <View style={styles.orderWrap}>
        <View style={styles.orderSelectedRow}>
          {order.map((item, index) => (
            <Pressable
              key={`${item}_${index}`}
              onPress={() => onChangeSelectedAnswer(order.filter((entry) => entry !== item))}
              style={styles.orderChip}
            >
              <Text style={styles.orderChipText}>{index + 1}. {item}</Text>
            </Pressable>
          ))}
        </View>
        <View style={styles.choiceList}>
          {remaining.map((option) => (
            <Pressable key={option} onPress={() => onChangeSelectedAnswer([...order, option])} style={styles.choiceButton}>
              <Text style={styles.choiceText}>{option}</Text>
            </Pressable>
          ))}
        </View>
      </View>
    );
  }

  if (question.type === "match_pairs") {
    const mapping = selectedAnswer && !Array.isArray(selectedAnswer) && typeof selectedAnswer === "object" ? selectedAnswer : {};

    return (
      <View style={styles.matchWrap}>
        {question.pairs?.map((pair) => (
          <View key={pair.left} style={styles.matchRow}>
            <Text style={styles.matchLeft}>{pair.left}</Text>
            <View style={styles.matchOptionWrap}>
              {question.options?.map((option) => {
                const active = mapping[pair.left] === option;
                return (
                  <Pressable
                    key={`${pair.left}_${option}`}
                    onPress={() => onChangeSelectedAnswer({ ...mapping, [pair.left]: option })}
                    style={[styles.matchChoice, active && styles.choiceButtonActive]}
                  >
                    <Text style={[styles.choiceText, active && styles.choiceTextActive]}>{option}</Text>
                  </Pressable>
                );
              })}
            </View>
          </View>
        ))}
      </View>
    );
  }

  return (
    <View style={styles.choiceList}>
      {question.options?.map((option) => {
        const active = selectedAnswer === option;
        return (
          <Pressable
            key={option}
            onPress={() => onChangeSelectedAnswer(option)}
            style={[styles.choiceButton, active && styles.choiceButtonActive]}
          >
            <Text style={[styles.choiceText, active && styles.choiceTextActive]}>{option}</Text>
          </Pressable>
        );
      })}
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

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.statCard}>
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={styles.statValue}>{value}</Text>
    </View>
  );
}

const colors = {
  ink: "#183126",
  muted: "#607267",
  line: "#D7E4DD",
  white: "#FFFFFF",
  green: "#24A965",
  greenDark: "#167144",
  mint: "#E1F6EB",
  bg: "#F4F9F6",
  coral: "#E85C4A",
  coralSoft: "#FCE3DF",
  skySoft: "#DDEFF8"
};

const styles = StyleSheet.create({
  dashboardWrap: { gap: 16, marginBottom: 18 },
  heroCard: { borderRadius: 8, borderWidth: 1, borderColor: colors.line, backgroundColor: colors.white, padding: 16 },
  eyebrow: { color: colors.greenDark, fontSize: 12, fontWeight: "900", textTransform: "uppercase" },
  heroTitle: { color: colors.ink, fontSize: 26, lineHeight: 31, fontWeight: "900", marginTop: 6 },
  heroCopy: { color: colors.muted, fontSize: 14, lineHeight: 20, fontWeight: "600", marginTop: 8 },
  heroStatRow: { flexDirection: "row", gap: 10, marginTop: 14 },
  statCard: { flex: 1, borderRadius: 8, backgroundColor: "#F8FBF8", borderWidth: 1, borderColor: colors.line, padding: 12 },
  statLabel: { color: colors.muted, fontSize: 11, fontWeight: "800", textTransform: "uppercase" },
  statValue: { color: colors.ink, fontSize: 16, lineHeight: 21, fontWeight: "900", marginTop: 5 },
  heroButtonRow: { flexDirection: "row", flexWrap: "wrap", gap: 10, marginTop: 16 },
  primaryButton: { minHeight: 46, paddingHorizontal: 14, borderRadius: 8, alignItems: "center", justifyContent: "center", backgroundColor: colors.green },
  primaryButtonText: { color: colors.white, fontSize: 14, fontWeight: "900" },
  secondaryButton: { minHeight: 46, paddingHorizontal: 14, borderRadius: 8, alignItems: "center", justifyContent: "center", backgroundColor: colors.mint, borderWidth: 1, borderColor: "#C6EBD6" },
  secondaryButtonText: { color: colors.greenDark, fontSize: 14, fontWeight: "900" },
  dashboardCard: { borderRadius: 8, borderWidth: 1, borderColor: colors.line, backgroundColor: colors.white, padding: 16 },
  cardTitle: { color: colors.ink, fontSize: 19, fontWeight: "900" },
  cardCopy: { color: colors.muted, fontSize: 13, lineHeight: 18, fontWeight: "600", marginTop: 6 },
  progressMapRow: { flexDirection: "row", flexWrap: "wrap", gap: 12, marginTop: 16 },
  progressStep: { width: "18%", minWidth: 96, alignItems: "flex-start" },
  progressDot: { width: 14, height: 14, borderRadius: 999, backgroundColor: colors.line },
  progressDotActive: { backgroundColor: colors.green },
  progressLabel: { color: colors.muted, fontSize: 12, lineHeight: 17, fontWeight: "700", marginTop: 7 },
  progressLabelActive: { color: colors.ink },
  skillList: { gap: 14, marginTop: 14 },
  skillRow: { borderRadius: 8, backgroundColor: "#FBFDFC", borderWidth: 1, borderColor: colors.line, padding: 12 },
  skillHeader: { flexDirection: "row", justifyContent: "space-between", gap: 8 },
  skillTitle: { flex: 1, color: colors.ink, fontSize: 15, fontWeight: "900" },
  skillMeta: { color: colors.muted, fontSize: 12, fontWeight: "800" },
  skillBarTrack: { height: 10, borderRadius: 999, backgroundColor: "#ECF2EE", overflow: "hidden", marginTop: 10 },
  skillBarFill: { height: 10, borderRadius: 999 },
  skillSubMeta: { color: colors.muted, fontSize: 12, fontWeight: "700", marginTop: 8 },
  tagRow: { flexDirection: "row", flexWrap: "wrap", gap: 6, marginTop: 10 },
  tagPill: { borderRadius: 999, backgroundColor: colors.skySoft, paddingHorizontal: 8, paddingVertical: 4 },
  tagText: { color: colors.ink, fontSize: 11, fontWeight: "800" },
  twoUpRow: { flexDirection: "row", gap: 16 },
  sideCard: { flex: 1, borderRadius: 8, borderWidth: 1, borderColor: colors.line, backgroundColor: colors.white, padding: 16 },
  assessmentWrap: { padding: 18, gap: 16 },
  assessmentTop: { flexDirection: "row", alignItems: "center", gap: 12 },
  exitButton: { paddingVertical: 10, paddingHorizontal: 12, borderRadius: 8, backgroundColor: colors.white, borderWidth: 1, borderColor: colors.line },
  exitButtonText: { color: colors.ink, fontSize: 13, fontWeight: "900" },
  progressTrack: { flex: 1, height: 12, borderRadius: 999, backgroundColor: "#E8EEE9", overflow: "hidden" },
  progressFill: { height: 12, backgroundColor: colors.green },
  progressCount: { color: colors.muted, fontSize: 12, fontWeight: "800" },
  assessmentCard: { borderRadius: 8, borderWidth: 1, borderColor: colors.line, backgroundColor: colors.white, padding: 16 },
  scenarioText: { color: colors.greenDark, fontSize: 13, lineHeight: 18, fontWeight: "700", marginTop: 8 },
  questionPrompt: { color: colors.ink, fontSize: 28, lineHeight: 34, fontWeight: "900", marginTop: 8 },
  choiceList: { gap: 10, marginTop: 16 },
  choiceButton: { minHeight: 56, borderRadius: 8, borderWidth: 1, borderColor: colors.line, backgroundColor: colors.white, paddingHorizontal: 14, justifyContent: "center" },
  choiceButtonActive: { backgroundColor: colors.mint, borderColor: colors.green },
  choiceText: { color: colors.ink, fontSize: 15, lineHeight: 21, fontWeight: "800" },
  choiceTextActive: { color: colors.greenDark },
  input: { minHeight: 52, borderRadius: 8, borderWidth: 1, borderColor: colors.line, backgroundColor: "#FBFDFC", paddingHorizontal: 14, paddingVertical: 12, marginTop: 16, color: colors.ink },
  inputTall: { minHeight: 132, textAlignVertical: "top" },
  confidenceCard: { marginTop: 18, borderRadius: 8, backgroundColor: "#F8FBF8", borderWidth: 1, borderColor: colors.line, padding: 12 },
  confidenceTitle: { color: colors.ink, fontSize: 14, fontWeight: "900" },
  confidenceRow: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginTop: 10 },
  confidencePill: { borderRadius: 999, paddingHorizontal: 10, paddingVertical: 7, backgroundColor: colors.white, borderWidth: 1, borderColor: colors.line },
  confidencePillActive: { backgroundColor: colors.green, borderColor: colors.green },
  confidenceText: { color: colors.ink, fontSize: 12, fontWeight: "800" },
  confidenceTextActive: { color: colors.white },
  disabledButton: { opacity: 0.5 },
  feedbackCard: { borderRadius: 8, padding: 16, borderWidth: 1 },
  feedbackGood: { borderColor: "#BDE3C8", backgroundColor: colors.mint },
  feedbackBad: { borderColor: "#F2B4AC", backgroundColor: colors.coralSoft },
  feedbackTitle: { color: colors.ink, fontSize: 20, fontWeight: "900" },
  feedbackLine: { color: colors.ink, fontSize: 14, lineHeight: 20, fontWeight: "700", marginTop: 8 },
  reasonList: { marginTop: 8, gap: 4 },
  feedbackReason: { color: colors.muted, fontSize: 13, lineHeight: 18, fontWeight: "700" },
  orderWrap: { marginTop: 16, gap: 12 },
  orderSelectedRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  orderChip: { borderRadius: 999, paddingHorizontal: 10, paddingVertical: 8, backgroundColor: colors.skySoft },
  orderChipText: { color: colors.ink, fontSize: 12, fontWeight: "800" },
  matchWrap: { gap: 12, marginTop: 16 },
  matchRow: { gap: 8 },
  matchLeft: { color: colors.ink, fontSize: 14, fontWeight: "900" },
  matchOptionWrap: { gap: 8 },
  matchChoice: { borderRadius: 8, borderWidth: 1, borderColor: colors.line, backgroundColor: colors.white, paddingHorizontal: 12, paddingVertical: 10 }
});
