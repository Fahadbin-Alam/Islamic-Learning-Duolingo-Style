/**
 * Lists every piece of lesson and course text the app can show, in English, so it can be translated.
 * Run with I18N_DUMP=1 to write scripts/i18n/content-source.json. Every entry must be in each language's catalog,
 * so new lesson text fails here until it is translated.
 * Each entry is the exact catalog key the app looks up (lines cut by the English-only rules are cut first).
 */
import fs from "fs";
import path from "path";
import { learningApi } from "../api/islamicLearningApi";
import { lessonForAge } from "../data/ageLevels";
import { COURSE, LESSONS_BY_ID, STARTER_USER } from "../data/course";
import { FOUNDATION_CATEGORY_META, FOUNDATION_PROGRESS_LABELS, FOUNDATION_QUESTION_BANK } from "../data/foundationQuestionBank";
import { ALL_HARD_QUESTIONS } from "../data/hardQuestions";
import { getBranchArabic, getLessonArabic, getNodeArabic, getTopicArabic } from "../data/arabicTerms";
import { getFoundationWordBank } from "../services/foundationAssessment";
import { getTopicCopy } from "../i18n";
import { getCatalog } from "../translations";
import { englishWhy } from "../ui/lesson/localizedLines";
import { getLessonLine, isPlayablePractice } from "../ui/lesson/lessonSteps";
import { shortWhy } from "../ui/lesson/lessonText";
import type { FoundationQuestion, Lesson } from "../types";

type Kind = "course" | "lesson" | "question" | "quote" | "source" | "arabic" | "practice";

const entries = new Map<string, Kind>();
// A quote or source keeps its kind even if the same words show up elsewhere: translators handle those differently.
const add = (kind: Kind, value: string | undefined | null) => {
  const text = value?.trim();
  if (!text || !/[A-Za-z]/.test(text) || /^#[0-9a-f]{6}$/i.test(text)) return;
  const known = entries.get(text);
  if (!known || kind === "quote" || kind === "source") entries.set(text, kind);
};

function addLesson(lesson: Lesson) {
  add("course", lesson.title);
  add("lesson", getLessonLine(lesson));
  lesson.learnFacts?.forEach((fact) => add("lesson", fact));
  add("quote", lesson.quote?.text);
  add("source", lesson.quote?.reference);
  add("source", lesson.learnSource?.reference);
  lesson.learnDeeper?.meaning.forEach((line) => add("lesson", line));
  add("lesson", lesson.learnDeeper?.story);
  add("lesson", lesson.learnDeeper?.takeaway);
  lesson.learnDeeper?.sources.forEach((source) => add("source", source.reference));
  addQuestions(lesson.challenges);
  const practice = lesson.practiceActivities?.find(isPlayablePractice);
  if (practice) {
    add("practice", practice.title);
    add("practice", practice.prompt);
    practice.options.forEach((option) => add("practice", option.label));
  }
}

function addQuestions(challenges: Lesson["challenges"]) {
  for (const challenge of challenges) {
    add("question", challenge.prompt);
    challenge.choices.forEach((choice) => add("question", choice.label));
    add("question", englishWhy(challenge));
  }
}

function answerLabel(question: FoundationQuestion) {
  const answer = question.correctAnswer;
  if (Array.isArray(answer)) return answer.join(", ");
  return typeof answer === "string" ? answer : undefined;
}

function addFoundation(question: FoundationQuestion) {
  add("question", question.prompt);
  add("question", question.scenario);
  question.options?.forEach((option) => add("question", option));
  question.orderItems?.forEach((item) => add("question", item));
  question.pairs?.forEach((pair) => {
    add("question", pair.left);
    add("question", pair.right);
  });
  const answer = question.correctAnswer;
  if (typeof answer === "string") add("question", answer);
  else if (Array.isArray(answer)) answer.forEach((item) => add("question", item));
  else if (answer) Object.entries(answer).forEach(([key, value]) => (add("question", key), add("question", value)));
  getFoundationWordBank(question).forEach((word) => add("question", word));
  const explanation = `${question.explanationShort} ${question.explanationLong}`;
  for (const note of [undefined, ...Object.values(question.wrongAnswerNotes ?? {})]) {
    add("question", shortWhy({ easierExplanation: note, explanation, prompt: question.prompt, correctLabel: answerLabel(question) }));
  }
}

async function buildSource() {
  for (const section of COURSE.sections) {
    const copy = getTopicCopy(section.topicId, "en");
    [copy.title, copy.description, copy.focus, copy.badge].forEach((value) => add("course", value));
    add("arabic", getTopicArabic(section.topicId)?.meaning);
    for (const branch of section.branches) {
      add("course", branch.title);
      add("course", branch.description);
      add("arabic", getBranchArabic(branch.id)?.meaning);
    }
    for (const node of section.nodes) {
      add("course", node.title);
      add("arabic", getNodeArabic(node.id)?.meaning);
      add("arabic", getLessonArabic(node.id, node.branchId)?.meaning);
    }
  }
  for (const lesson of Object.values(LESSONS_BY_ID)) {
    addLesson(lesson);
    // A young child's lesson asks true/false questions that the full lesson leaves out.
    addLesson(lessonForAge(lesson, "6-9"));
    addLesson((await learningApi.getLessonSession(lesson.id, STARTER_USER)).lesson);
  }
  // The harder questions that come in as the streak grows, or on Hard and Really hard (challengeLevel.ts).
  addQuestions(ALL_HARD_QUESTIONS);
  Object.values(FOUNDATION_CATEGORY_META).forEach((meta) => Object.values(meta).forEach((value) => typeof value === "string" && add("course", value)));
  FOUNDATION_PROGRESS_LABELS.forEach((label) => add("course", label));
  FOUNDATION_QUESTION_BANK.forEach(addFoundation);
  return [...entries].map(([text, kind]) => ({ kind, text }));
}

test("every lesson and course text can be listed for translation", async () => {
  const source = await buildSource();
  expect(source.length).toBeGreaterThan(100);
  if (process.env.I18N_DUMP) {
    fs.writeFileSync(path.join(__dirname, "../../scripts/i18n/content-source.json"), `${JSON.stringify(source, null, 2)}\n`);
  }
  for (const language of ["bn", "ur", "ar"] as const) {
    const catalog = getCatalog(language);
    const missing = source.filter((entry) => !catalog[entry.text]).map((entry) => entry.text);
    expect({ language, missing: missing.slice(0, 10), count: missing.length }).toEqual({ language, missing: [], count: 0 });
  }
}, 120000);
