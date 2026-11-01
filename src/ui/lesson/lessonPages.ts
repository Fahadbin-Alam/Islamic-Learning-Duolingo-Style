import type { Challenge, Lesson } from "../../types";
import { getLessonLine } from "./lessonSteps";
import { isCredit } from "./lessonNotes";

// A lesson in small pages, Duolingo style: learn a little, answer a question, learn a little more, answer again,
// and a short quiz on the whole circle at the end. Each learn page holds one part of the old learn card:
//
//   start     the title, the Arabic word, the mascot's line, the photo and the ayah or hadith
//   facts     "What you learn": the lesson's points and what the source says, with its link
//   meaning   "What it means" (Quran passages taught in depth)
//   story     "The story"
//   takeaway  "Take home" and the tafsir books it comes from
//   teach     "Good to know": the one fact a question asks when no page above teaches it
//   quiz      "Quiz time!" before the circle's quiz
//
// Every question comes after the page that teaches its answer, so a learner can always answer from what they
// just read. The pages and the questions keep their own order.

export type LearnPageKind = "start" | "facts" | "meaning" | "story" | "takeaway" | "teach" | "quiz";

/** One question to ask: its index in lesson.challenges, which try it is, and whether it is the end-of-circle quiz. */
export type QuestionStep = { kind?: "question"; index: number; attempt: number; quiz?: boolean };
/** A learn page; a "teach" page names the question whose answer it teaches. */
export type LearnStep = { kind: "learn"; page: LearnPageKind; index?: number };
/** The ordering game (wudu steps, salah steps). */
export type PracticeStep = { kind: "practice" };
export type FlowStep = QuestionStep | LearnStep | PracticeStep;

export function isQuestionStep(step: FlowStep | undefined): step is QuestionStep {
  return Boolean(step) && (step as { kind?: string }).kind !== "learn" && (step as { kind?: string }).kind !== "practice";
}

export function isLearnStep(step: FlowStep | undefined): step is LearnStep {
  return (step as { kind?: string } | undefined)?.kind === "learn";
}

const STOP = new Set(
  "the a an of to and or in on at by for with is are was were be been it its his her their he she they them this that these those what who whom which how why when where do does did not no yes from as into about you your all one two has have had him our we us than then there so but if also just only very can will would should could may said says say".split(
    " "
  )
);

/** The words that carry meaning in an English text, lower case, without plural "s". */
export function contentWords(text: string | undefined) {
  return (text ?? "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[’‘`]/g, "'")
    .replace(/'s\b/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((word) => word.length > 1 && !STOP.has(word))
    // Light stemming, the same on both sides: "questions" and "question", "obeying" and "obey".
    .map((word) => (word.length > 5 ? word.replace(/(ing|ed)$/, "") : word))
    .map((word) => (word.length > 3 ? word.replace(/(?<!s)s$/, "") : word));
}

/** How much of `target` the text says: the share of its words found in `known`. */
function coverage(target: string[], known: Set<string>) {
  if (!target.length) return 1;
  return target.filter((word) => known.has(word)).length / target.length;
}

export function correctLabel(challenge: Pick<Challenge, "choices" | "correctChoiceId">) {
  return challenge.choices.find((choice) => choice.id === challenge.correctChoiceId)?.label ?? "";
}

const BLANK = /_{2,}/;
const TRUE_FALSE = /^(true|false)$/i;

export function isFillIn(challenge: Pick<Challenge, "prompt">) {
  return BLANK.test(challenge.prompt);
}

function isTrueFalse(challenge: Pick<Challenge, "type" | "choices" | "correctChoiceId">) {
  return challenge.type === "true_false" || TRUE_FALSE.test(correctLabel(challenge).trim());
}

/** A Why line that only names where it is from ("Quran 31:34.", "Sahih Muslim 8") teaches nothing. */
function teachingWhy(why: string | undefined) {
  const value = (why ?? "").trim().replace(/[.!]+$/, "");
  if (contentWords(value).length < 3) return undefined;
  if (isCredit(value, { hadith: true })) return undefined;
  return why!.trim();
}

/** The source's own summary, when it is a real sentence about this lesson (some older ones only name a verse). */
export function lessonSummary(lesson: Pick<Lesson, "learnSource" | "title" | "learnLine" | "learnFacts" | "challenges" | "intro">) {
  const summary = lesson.learnSource?.summary?.trim();
  if (!summary || contentWords(summary).length < 4) return undefined;
  const about = new Set(
    contentWords(
      [lesson.title, lesson.learnLine, lesson.intro, ...(lesson.learnFacts ?? []), ...lesson.challenges.flatMap((each) => [each.prompt, correctLabel(each), each.explanation])].join(" ")
    )
  );
  // A summary that shares almost no words with its own lesson was attached to the wrong one: leave it out.
  return contentWords(summary).filter((word) => about.has(word)).length >= 2 ? summary : undefined;
}

/** Review and quiz lessons ask about earlier circles: they teach nothing new and have no quiz of their own. */
export function isRecallLesson(lesson: Pick<Lesson, "lessonType" | "challenges" | "id">) {
  return lesson.lessonType === "review" || lesson.lessonType === "mastery" || lesson.challenges.every((each) => each.isReview) || /(^|-)(final-quiz|review(-\d+)?)$/.test(lesson.id);
}

export type LessonPage = { page: LearnPageKind; text: string };

/** The learn pages a lesson has, in order, each with the English words it teaches. */
export function lessonPages(lesson: Lesson): LessonPage[] {
  const pages: LessonPage[] = [
    {
      page: "start",
      text: [lesson.title, getLessonLine(lesson), lesson.quote?.text, lesson.quote?.reference].filter(Boolean).join(" ")
    }
  ];
  if (isRecallLesson(lesson)) {
    return pages;
  }
  const facts = (lesson.learnFacts ?? []).filter((fact) => fact.trim());
  const summary = lessonSummary(lesson);
  if (facts.length || summary) {
    pages.push({ page: "facts", text: [...facts, summary].filter(Boolean).join(" ") });
  }
  const deeper = lesson.learnDeeper;
  if (deeper?.meaning.some((line) => line.trim())) {
    pages.push({ page: "meaning", text: deeper.meaning.join(" ") });
  }
  if (deeper?.story?.trim()) {
    pages.push({ page: "story", text: deeper.story });
  }
  if (deeper?.takeaway?.trim()) {
    pages.push({ page: "takeaway", text: deeper.takeaway });
  }
  return pages;
}

/** The words a question needs to be answerable, and how much of them a page must say. */
function needs(challenge: Challenge): { words: string[]; share: number; why?: string[] } {
  const answer = correctLabel(challenge).trim();
  if (isTrueFalse(challenge)) {
    // A statement to judge: the page must say it; for a false one, it must also say what is true instead.
    const false_ = /^false$/i.test(answer);
    return { words: contentWords(challenge.prompt), share: 0.7, why: false_ ? contentWords(teachingWhy(challenge.explanation)) : undefined };
  }
  return { words: contentWords(answer), share: 0.6 };
}

/** True when what the learner has read (`known`) lets them answer the question. */
export function answeredBy(challenge: Challenge, known: Set<string>) {
  const need = needs(challenge);
  if (!need.words.length) return true;
  if (coverage(need.words, known) < need.share) return false;
  return !need.why || !need.why.length || coverage(need.why, known) >= 0.6;
}

/**
 * The steps of a lesson. Each question comes right after the learn page that teaches its answer; when no page
 * does, a "Good to know" page teaches it first. While pages are left, a page sits between two questions. The
 * last page is followed by the ordering game (when the lesson has one), then "Quiz time!" and the quiz: every
 * question of this circle once more, then the review questions from earlier circles.
 */
export function buildLessonFlow(lesson: Lesson, options: { practice?: boolean } = {}): FlowStep[] {
  const pages = lessonPages(lesson);
  const steps: FlowStep[] = [{ kind: "learn", page: pages[0].page }];
  const known = new Set(contentWords(pages[0].text));
  let shown = 1;
  const show = () => {
    const next = pages[shown++];
    steps.push({ kind: "learn", page: next.page });
    contentWords(next.text).forEach((word) => known.add(word));
  };

  const own = lesson.challenges.map((challenge, index) => ({ challenge, index })).filter(({ challenge }) => !challenge.isReview);
  const reviews = lesson.challenges.map((challenge, index) => ({ challenge, index })).filter(({ challenge }) => challenge.isReview);

  if (isRecallLesson(lesson)) {
    if (options.practice) steps.push({ kind: "practice" });
    if (lesson.challenges.length > 1) steps.push({ kind: "learn", page: "quiz" });
    lesson.challenges.forEach((_, index) => steps.push({ index, attempt: 0 }));
    return steps;
  }

  let lastWasQuestion = false;
  const allPages = (challenge: Challenge) => {
    const probe = new Set(known);
    pages.slice(shown).forEach((page) => contentWords(page.text).forEach((word) => probe.add(word)));
    return answeredBy(challenge, probe);
  };
  for (const { challenge, index } of own) {
    let pageSince = false;
    // The pages up to the one that teaches this answer.
    if (allPages(challenge)) {
      while (shown < pages.length && !answeredBy(challenge, known)) {
        show();
        pageSince = true;
      }
    }
    if (!answeredBy(challenge, known)) {
      // No page says it: the next page first (learn, answer), then a "Good to know" page that does.
      if (!pageSince && shown < pages.length) {
        show();
      }
      if (!answeredBy(challenge, known)) {
        steps.push({ kind: "learn", page: "teach", index });
        contentWords(teachText(challenge)).forEach((word) => known.add(word));
      }
    } else if (!pageSince && lastWasQuestion && shown < pages.length) {
      // Learn, answer, learn, answer: never two questions in a row while a page is still to come.
      show();
    }
    steps.push({ index, attempt: 0 });
    lastWasQuestion = true;
  }
  while (shown < pages.length) show();
  if (options.practice) steps.push({ kind: "practice" });

  // The circle's quiz: its own questions again (so it checks the whole lesson at once), then the reviews.
  const quiz = [...(own.length >= 2 ? own : []), ...reviews];
  if (quiz.length) {
    steps.push({ kind: "learn", page: "quiz" });
    quiz.forEach(({ index }) => steps.push({ index, attempt: 0, quiz: true }));
  }
  return steps;
}

/**
 * The fact a question asks, as a lesson line, in the language the challenge is shown in:
 * a fill-in with its blank filled, a true statement as it is, or the Why line when it teaches the answer.
 * Otherwise the question and its answer, like a flash card.
 */
export function teachText(challenge: Pick<Challenge, "prompt" | "choices" | "correctChoiceId" | "explanation" | "type">) {
  return teachLesson(challenge).lines.join(" ");
}

export type TeachLesson = {
  /** The fact as one or two sentences. */
  lines: string[];
  /** A flash card: the question and its answer, shown when there is no sentence that says it. */
  card?: { question: string; answer: string; isFalse?: boolean };
  /** The answer's words, to highlight in the lines. */
  answer?: string;
};

export function teachLesson(challenge: Pick<Challenge, "prompt" | "choices" | "correctChoiceId" | "explanation" | "type">): TeachLesson {
  const answer = correctLabel(challenge).trim();
  const why = teachingWhy(challenge.explanation);
  const prompt = challenge.prompt.trim();
  if (BLANK.test(prompt)) {
    const filled = prompt.replace(/_{2,}/, answer);
    const extra = why && !contentWords(why).every((word) => contentWords(filled).includes(word)) ? [why] : [];
    return { lines: [filled, ...extra], answer };
  }
  if (TRUE_FALSE.test(answer)) {
    if (/^true$/i.test(answer)) {
      const extra = why && coverage(contentWords(why), new Set(contentWords(prompt))) < 0.8 ? [why] : [];
      return { lines: [prompt, ...extra] };
    }
    // A false statement shows as a flash card marked False, with the Why that says what is true.
    return { lines: why ? [why] : [], card: { question: prompt, answer, isFalse: true } };
  }
  if (why && coverage(contentWords(answer), new Set(contentWords(why))) >= 0.6) {
    return { lines: [why], answer };
  }
  return { lines: why ? [why] : [], card: { question: prompt, answer }, answer };
}

/**
 * Words worth highlighting on this lesson's pages: the answers its questions ask for (not True / False), so the
 * learner's eye lands on what they will be asked.
 */
export function highlightWords(lesson: Pick<Lesson, "challenges">) {
  const words = new Set<string>();
  for (const challenge of lesson.challenges) {
    if (challenge.isReview) continue;
    const answer = correctLabel(challenge).trim().replace(/[.!?]+$/, "");
    if (!answer || TRUE_FALSE.test(answer) || answer.length < 2 || answer.split(/\s+/).length > 5) continue;
    words.add(answer);
  }
  return [...words].sort((a, b) => b.length - a.length);
}

export type TextPiece = { text: string; mark?: boolean };

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** Splits text into plain and highlighted pieces; each highlight is matched as whole words, any case. */
export function highlightPieces(text: string, marks: string[]): TextPiece[] {
  const usable = marks.map((mark) => mark.trim()).filter((mark) => mark.length >= 2);
  if (!text || !usable.length) return [{ text }];
  // \b only knows Latin letters; other scripts match on the text alone.
  const pattern = new RegExp(
    usable
      // The screen keeps a hyphen with its word by a joiner after it (noBreakHyphens): match with or without it.
      .map((mark) => {
        const body = escapeRegExp(mark.replace(/\u2060/g, "")).replace(/-/g, "-\u2060?");
        return /^[\w\s'-]+$/.test(mark) ? `\\b${body}\\b` : body;
      })
      .join("|"),
    "gi"
  );
  const pieces: TextPiece[] = [];
  let last = 0;
  for (const match of text.matchAll(pattern)) {
    const at = match.index ?? 0;
    if (!match[0]) continue;
    if (at > last) pieces.push({ text: text.slice(last, at) });
    pieces.push({ text: match[0], mark: true });
    last = at + match[0].length;
  }
  if (last < text.length) pieces.push({ text: text.slice(last) });
  return pieces.length ? pieces : [{ text }];
}

/** The share of all steps passed so far, for the bar at the top. A missed question asked again adds no step. */
export function flowProgress(done: number, total: number) {
  return total > 0 ? Math.min(1, Math.max(0, done / total)) : 0;
}
