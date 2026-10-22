import type { Lesson, LessonPracticeActivity } from "../../types";
import { t } from "../../i18n";

// Only real ordering games are worth a step; the generic "pick the takeaway" drills just repeat the question.
export function isPlayablePractice(activity: LessonPracticeActivity) {
  return activity.kind === "sequence" && !activity.id.endsWith("_story_arc");
}

export type LessonStepScreen = "lesson_teach" | "lesson_practice" | "lesson_question" | "lesson_feedback" | "lesson_complete";

// Steps in a lesson: the learn card, the ordering game (if any), then one per question.
// A question fills its step once it is done: answered right (in a test, answered). A miss sends the
// question to the end of the lesson, so the bar stays put until it comes back and is right, however
// many tries that takes.
export function getLessonProgress({
  screen,
  hasTeach,
  hasPractice,
  challengeCount,
  done,
  challengeIndex = 0,
  answeredCorrectly = false
}: {
  screen: string;
  hasTeach: boolean;
  hasPractice: boolean;
  /** The lesson's own questions; a missed one asked again is not a new step. */
  challengeCount: number;
  /** Questions done so far, the one on the feedback sheet included. Without it: challengeIndex, plus one for a right answer on the sheet. */
  done?: number;
  challengeIndex?: number;
  answeredCorrectly?: boolean;
}) {
  const before = (hasTeach ? 1 : 0) + (hasPractice ? 1 : 0);
  const total = Math.max(1, before + challengeCount);
  const finished = (feedback: boolean) =>
    Math.min(challengeCount, Math.max(0, done ?? challengeIndex + (feedback && answeredCorrectly ? 1 : 0)));

  switch (screen as LessonStepScreen) {
    case "lesson_teach":
      return 0;
    case "lesson_practice":
      return (hasTeach ? 1 : 0) / total;
    case "lesson_question":
      return (before + finished(false)) / total;
    case "lesson_feedback":
      return (before + finished(true)) / total;
    case "lesson_complete":
      return 1;
    default:
      return 0;
  }
}

/** The STARS card on the lesson complete screen: 3 with no mistakes, 2 with one or two, 1 with more. */
export function lessonStars(mistakes: number) {
  if (mistakes <= 0) {
    return 3;
  }
  return mistakes <= 2 ? 2 : 1;
}

/** The mascot's line on the learn card aims for at most this many words. */
export const LESSON_LINE_MAX_WORDS = 12;
/** A whole sentence that cannot be cut cleanly may run a little longer than the aim. */
const LESSON_LINE_SOFT_WORDS = 14;
const LESSON_LINE_SOFT_CHARS = 100;

// Template sentences in the generated course data repeat the title: "Practice what wudu is with calmness...".
const TEMPLATE_VERBS = /^(practice|repeat|carry|use|read|pause with|translate|turn|return to|let|study)\s/i;
const LINE_FILLER = [
  /\blearners?\b/i,
  /\bthis (lesson|topic|branch)\b/i,
  /^(chapter|grade|book|section)\b/i,
  /\bin the next small moment\b/i,
  // Older shared takeaways that fit every lesson of a topic and so say nothing about this one.
  /^notice the scene, the sacrifice/i,
  /^start using the phrase or habit/i,
  /^prayer is strongest when its order/i,
  /^learn the order calmly now/i,
  /^stay with the surah long enough/i
];
const SUBORDINATE_START = /^(when|if|as|after|before|while|although|because|since|once|whenever)\b/i;
// A list inside one of these clauses ("built when mercy, deen, and kindness keep...") cannot be cut short.
const INNER_CLAUSE = /\s(when|if|because|while|that|which|who|where|what|how|why|until|unless)\s/i;
// A head that only sets up its point ("X is not only A", "X is sometimes reduced to...") or ends mid-phrase.
const SETUP_HEAD = /\b(not (only|just|merely)|more than|sometimes|often|only|alone|overlooked)\b/i;
const LOOSE_END = /\b(and|or|but|should|must|can|could|will|would|does|do|did|is|are|was|were|be|to|of|the|a|an|with|for|in|on|at|by|that|its|their|his|her|not)$/i;

/**
 * Places where a long sentence can stop early and still say something whole, best first. Cuts with
 * `weak` lose more meaning, so a whole sentence within the soft limit is used before them.
 */
const CLAUSE_CUTS: { pattern: RegExp; rank: number; join?: boolean; weak?: boolean; firstCommaOnly?: boolean }[] = [
  { pattern: /;\s/g, rank: 0 },
  { pattern: /\s[—–-]\s/g, rank: 0 },
  { pattern: /:\s/g, rank: 1 },
  { pattern: /,?\s(?:rather than|instead of|not just|not only|not with|not)\s/g, rank: 1 },
  { pattern: /,\s(?:so|then|while|because|which|showing|making|even|especially|until)\s/g, rank: 2 },
  { pattern: /\s(?:so|so that|because|while|without|until|especially|at moments of|just as)\s/g, rank: 3 },
  // "teaches A, B, and C" stops after B as "teaches A and B".
  { pattern: /,\s(?:and)\s/g, rank: 4, join: true, weak: true },
  { pattern: /,\s/g, rank: 5, weak: true, firstCommaOnly: true },
  { pattern: /\s(?:and|through)\s/g, rank: 6, weak: true }
];

function wordCount(value: string) {
  return value.split(/\s+/).filter(Boolean).length;
}

/** Words in a learn line; the ﷺ sign after the Prophet's name is not a word of its own. */
export function lessonLineWords(value: string) {
  return value.split(/\s+/).filter((word) => word && word !== "ﷺ").length;
}

/** A written learn line is used as it is when it is one short, whole sentence that is more than the title. */
function isUsableLearnLine(line: string, title: string) {
  return (
    lessonLineWords(line) >= 3 &&
    lessonLineWords(line) <= LESSON_LINE_MAX_WORDS &&
    // Only double quotes and brackets: "Ali 'Imran" and "'Ad" start words with an apostrophe.
    (line.match(/"/g) ?? []).length % 2 === 0 &&
    (line.match(/“/g) ?? []).length === (line.match(/”/g) ?? []).length &&
    (line.match(/\(/g) ?? []).length === (line.match(/\)/g) ?? []).length &&
    line.toLowerCase().replace(/[.!?]+$/, "") !== title.trim().toLowerCase()
  );
}

function splitLineSentences(value: string) {
  // "Ubayy b. Ka'b", "Q. 2:183" and "2.5 percent" are not sentence ends.
  const guarded = value.replace(/(^|[\s(])([A-Za-z])\.(?=\s)/g, "$1$2\u2024").replace(/(\d)\.(?=\d)/g, "$1\u2024");
  return (guarded.match(/[^.!?]+(?:[.!?]+["”’')]*|$)/g) ?? []).map((part) => part.replace(/\u2024/g, ".").trim()).filter(Boolean);
}

/** Drops "Known for:" lead-ins and "Title: " prefixes; "A learner should" reads as "You should". */
function cleanLine(sentence: string, title: string) {
  let value = sentence.trim().replace(/^known for:\s*/i, "");
  const colon = value.indexOf(": ");
  if (colon > 0 && colon < 40) {
    const head = value.slice(0, colon).replace(/['’`]/g, "").toLowerCase();
    if (head === title.replace(/['’`]/g, "").toLowerCase()) {
      value = value.slice(colon + 2);
    }
  }
  value = value
    .replace(/\b(?:an?|the)\s(?:serious\s|strong\s|muslim\s)?learner\s(should|can|must|will|may)\b/gi, (_match, verb: string) => `you ${verb.toLowerCase()}`)
    .replace(/\b(helps|lets|leaves)\sthe\slearner\b/gi, (_match, verb: string) => `${verb} you`);
  return value.charAt(0).toUpperCase() + value.slice(1);
}

/** "X is not A; it is B" and "X is not just A. It is B" read better as "X is B". */
function joinNotJust(first: string, second?: string) {
  const sameSentence = first.match(/^(.{2,40}?)\s(?:is|are)\s(?:not|never)\s[^;:]+?[;,]\s(?:it|they)\s(.+)$/i);
  if (sameSentence) {
    return `${sameSentence[1]} ${sameSentence[2]}`;
  }
  const setup = first.match(/^(.{2,40}?)\s(?:is|are)\s(?:not|never)\s(?:just|only|merely)\s[^.]+\.$/i);
  const follow = second?.match(/^(?:it|they)\s(.+)$/i);
  if (setup && follow) {
    return `${setup[1]} ${follow[1]}`;
  }
  return undefined;
}

function endWithStop(value: string) {
  const trimmed = value.trim().replace(/[,;:—–-]+$/, "").trim();
  return /[.!?]["”’')]*$/.test(trimmed) ? trimmed : `${trimmed}.`;
}

/** True when quotes and brackets in the text are all closed. */
function balanced(value: string) {
  const count = (pattern: RegExp) => (value.match(pattern) ?? []).length;
  return count(/"/g) % 2 === 0 && count(/“/g) === count(/”/g) && count(/\(/g) === count(/\)/g) && !/(^|\s)['‘]\w/.test(value);
}

/** Cuts a long sentence at the clause break that leaves the fullest short, whole statement. */
function fitLine(sentence: string): string | undefined {
  if (wordCount(sentence) <= LESSON_LINE_MAX_WORDS) {
    return sentence;
  }
  const subordinate = SUBORDINATE_START.test(sentence);
  const firstComma = sentence.indexOf(", ");
  const secondComma = firstComma >= 0 ? sentence.indexOf(", ", firstComma + 2) : -1;
  let best: { text: string; rank: number; words: number; weak: boolean } | undefined;
  for (const cut of CLAUSE_CUTS) {
    for (const match of sentence.matchAll(cut.pattern)) {
      const at = match.index ?? 0;
      let head = sentence.slice(0, at).trim();
      const words = wordCount(head);
      // "When X, Y" needs its main clause: never stop before it.
      if (words < 4 || words > LESSON_LINE_MAX_WORDS || !balanced(head) || (subordinate && at <= firstComma)) {
        continue;
      }
      if (SETUP_HEAD.test(head) || LOOSE_END.test(head) || ((cut.join || cut.weak) && INNER_CLAUSE.test(head))) {
        continue;
      }
      // "again and again" is one phrase.
      const before = head.split(/\s+/).pop()?.toLowerCase();
      if (before && sentence.slice(at + match[0].length).toLowerCase().startsWith(before)) {
        continue;
      }
      if (cut.firstCommaOnly && at !== (subordinate ? secondComma : firstComma)) {
        continue;
      }
      const commas = (head.match(/,\s/g) ?? []).length;
      if (cut.join && commas >= (subordinate ? 2 : 1)) {
        const last = head.lastIndexOf(", ");
        head = `${head.slice(0, last)} and ${head.slice(last + 2)}`;
      }
      if (!best || cut.rank < best.rank || (cut.rank === best.rank && words > best.words)) {
        best = { text: endWithStop(head), rank: cut.rank, words, weak: Boolean(cut.weak) };
      }
    }
  }
  const wholeFits = wordCount(sentence) <= LESSON_LINE_SOFT_WORDS && sentence.length <= LESSON_LINE_SOFT_CHARS;
  if (best && !(best.weak && wholeFits)) {
    return best.text;
  }
  return wholeFits ? sentence : undefined;
}

/** "Now pull it together: wudu is..." says its point after the colon, so try that part first. */
function afterSetup(sentence: string) {
  const colon = sentence.indexOf(": ");
  return colon > 0 && /^(now|so|remember|here|first|next)\b/i.test(sentence) ? [sentence.slice(colon + 2), sentence] : [sentence];
}

/** The Prophet's words inside a narration ("... said: "Words."") without the chain, when they are short and whole. */
function shortQuote(sentence: string) {
  const match = sentence.match(/\bsa(?:id|ying)[,:]?\s*["“]?([^"”]+)["”]?/i);
  const quote = match ? splitLineSentences(match[1])[0] : undefined;
  if (!quote || wordCount(quote) > LESSON_LINE_MAX_WORDS || SUBORDINATE_START.test(quote) || !balanced(quote)) {
    return undefined;
  }
  return endWithStop(quote);
}

/**
 * The ONE short line the mascot says on the learn card (aim: LESSON_LINE_MAX_WORDS words or fewer).
 * A lesson's own `learnLine` comes first, word for word, so the questions that quote it match the card.
 * Without one it uses the lesson's own words: a sentence of the intro or the key takeaway, stopped at a
 * natural clause break when it runs long. Template filler and set-up half-sentences are skipped. A hadith
 * narration only gives a short, whole quote. With nothing short left it falls back to the title.
 */
export function getLessonLine(lesson: Pick<Lesson, "intro" | "title"> & Partial<Pick<Lesson, "keyTakeaway" | "whatYouWillLearn" | "learnLine">>) {
  const title = lesson.title.trim();
  const written = lesson.learnLine?.trim();
  if (written && isUsableLearnLine(written, title)) {
    return written;
  }
  const intro = splitLineSentences(lesson.intro ?? "");
  if (/\b(narrated|reported|told that|on the authority of)\b/i.test((lesson.intro ?? "").slice(0, 160))) {
    for (const sentence of intro) {
      const quote = shortQuote(sentence);
      if (quote) {
        return quote;
      }
    }
    return t("Let's read a hadith!");
  }
  const candidates: string[] = [];
  const joined = joinNotJust(intro[0] ?? "", intro[1]);
  if (joined) {
    candidates.push(joined);
  }
  candidates.push(...intro);
  for (const field of [lesson.whatYouWillLearn, lesson.keyTakeaway]) {
    candidates.push(...splitLineSentences(field ?? ""));
  }
  for (const raw of candidates.flatMap(afterSetup)) {
    const sentence = cleanLine(raw, title);
    const template = TEMPLATE_VERBS.test(sentence) && sentence.toLowerCase().includes(title.toLowerCase());
    if (wordCount(sentence) < 3 || template || LINE_FILLER.some((pattern) => pattern.test(sentence))) {
      continue;
    }
    // "Salam is not just a phrase." only sets up the next sentence.
    if (/\b(?:not|never)\s(?:just|only|merely)\b[^,;]*\.$/i.test(sentence) && wordCount(sentence) <= 7) {
      continue;
    }
    const fitted = fitLine(sentence);
    if (fitted) {
      return fitted;
    }
  }
  return title;
}
