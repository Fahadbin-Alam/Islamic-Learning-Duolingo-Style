// Small text helpers for the lesson screens: short "Why?" lines, unbreakable hyphens, fuzzy matching.

/** Longest "Why?" line the feedback sheet shows. */
export const WHY_MAX = 90;

/** Keeps "As-salamu" from breaking at its hyphen (hyphen + word joiner). */
export function noBreakHyphens(value: string) {
  return value.replace(/(\p{L})-(?=\p{L})/gu, "$1-⁠");
}

/** Lowercase letters and digits only, for loose comparisons. */
export function normalizeText(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, "");
}

function editDistance(a: string, b: string) {
  if (a === b) {
    return 0;
  }
  const row = Array.from({ length: b.length + 1 }, (_, index) => index);
  for (let i = 1; i <= a.length; i += 1) {
    let previous = row[0];
    row[0] = i;
    for (let j = 1; j <= b.length; j += 1) {
      const current = row[j];
      row[j] = Math.min(row[j] + 1, row[j - 1] + 1, previous + (a[i - 1] === b[j - 1] ? 0 : 1));
      previous = current;
    }
  }
  return row[b.length];
}

/** True when two short strings say the same thing ("As-Salamu Alaikum" vs "As-salamu alaykum"). */
export function looksSame(a: string, b: string) {
  const x = normalizeText(a);
  const y = normalizeText(b);
  if (!x || !y) {
    return false;
  }
  if (x === y || x.includes(y) || y.includes(x)) {
    return true;
  }
  return editDistance(x, y) / Math.max(x.length, y.length) <= 0.2;
}

const LEAD_INS = [/^(true|false|correct|right|wrong)\s*[.!:,-]\s*/i, /^watch out for (this mistake|the opposite idea)\s*:\s*/i, /^start here\s*:\s*/i];

// Template filler in the generated course data. These sentences add nothing a learner can use.
const FILLER = [
  /can stay fuzzy because the basics are already enough/i,
  /\bthis (lesson|is the kind of confusion|is the core teaching)\b/i,
  /\bkeep the lesson\b/i,
  /^think about the next small moment/i,
  /^look for the statement/i,
  /\blesson'?s? main point\b/i,
  /\bnot just (information|recognition)\b/i,
  /\bshould see how big decisions\b/i,
  /^review (the|lessons?)\b/i,
  // Reference lines from imported notes: "Grade: Da'if (Darussalam)", "Chapter: Section 3".
  /^(grade|chapter|book|section|reference|source)\s*:/i,
  /^(sahih|sunan|jami|musnad|mishkat|riyad|muwatta)\b[^.!?]*\d+[a-z]?\.?$/i
];

/** A Why line must not open or close half a quotation. */
function quotesClosed(value: string) {
  const count = (pattern: RegExp) => (value.match(pattern) ?? []).length;
  return count(/"/g) % 2 === 0 && count(/“/g) === count(/”/g) && !/^['‘’]/.test(value);
}

const STOP_WORDS = new Set(
  "the and for with that this what which who whom whose does did do how many much was were are is be been being you your yours can could should would will from have has had its it's they them their there not but about into when why one all more most than then also such only very just a an of to in on at by as or if so we our us he his him she her it i me my lessons lesson".split(" ")
);

/** Content words of a text, roughly stemmed to five letters ("ayahs" / "ayah", "gently" / "gentle"). */
function contentWords(value: string) {
  const words = value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .split(/[^\p{L}\p{N}]+/u)
    .filter((word) => (word.length > 2 || /^\d+$/.test(word)) && !STOP_WORDS.has(word))
    .map((word) => word.replace(/s$/, "").slice(0, 5));
  return new Set(words);
}

const NUMBER_WORDS: Record<string, string> = {
  "1": "one", "2": "two", "3": "three", "4": "four", "5": "five", "6": "six", "7": "seven", "8": "eight", "9": "nine", "10": "ten", "12": "twelve"
};

function splitSentences(value: string) {
  // "Ubayy b. Ka'b" and "Q. 2:183" are not sentence ends.
  const guarded = value.replace(/(^|[\s(])([A-Za-z])\.(?=\s)/g, "$1$2\u2024");
  return (guarded.match(/[^.!?]+(?:[.!?]+["”’)]*|$)/g) ?? []).map((part) => part.replace(/\u2024/g, ".").trim()).filter(Boolean);
}

function cleanSentence(sentence: string) {
  let value = sentence.trim();
  for (let pass = 0; pass < 2; pass += 1) {
    for (const lead of LEAD_INS) {
      value = value.replace(lead, "");
    }
  }
  // "A learner should notice..." reads fine as "You should notice...". Any other "learner" sentence is dropped later.
  value = value.replace(/^an? (muslim )?learner (should|can|must|will)\b/i, (_m, _muslim, verb: string) => `You ${verb.toLowerCase()}`);
  if (!value) {
    return "";
  }
  return value.charAt(0).toUpperCase() + value.slice(1);
}

/** Cuts a long sentence at a strong clause break ("; " or " - "), or gives up. */
function fitSentence(sentence: string) {
  if (sentence.length <= WHY_MAX) {
    return sentence;
  }
  const head = sentence.slice(0, WHY_MAX);
  const cut = Math.max(head.lastIndexOf("; "), head.lastIndexOf(" - "), head.lastIndexOf(" — "));
  if (cut >= 30) {
    return `${sentence.slice(0, cut).trim()}.`;
  }
  return "";
}

export type WhySource = {
  explanation?: string;
  easierExplanation?: string;
  prompt?: string;
  correctLabel?: string;
};

/**
 * One short, useful "Why?" line (at most WHY_MAX characters) from a challenge's explanations.
 * Drops lead-ins ("True.", "Watch out for this mistake:"), template filler, and sentences that only
 * repeat the prompt or the answer. When a shared note gives several sentences, the one closest to the
 * question wins (it names the answer or shares the most words with the prompt); if none of them is about
 * the question, there is no Why line. Returns undefined when nothing useful is left (the sheet then shows
 * only the correct answer).
 */
export function shortWhy({ explanation, easierExplanation, prompt, correctLabel }: WhySource): string | undefined {
  const prompted = normalizeText(prompt ?? "");
  const answer = normalizeText(correctLabel ?? "");
  const repeats = (sentence: string) => {
    const value = normalizeText(sentence);
    if (!value) {
      return true;
    }
    if (prompted && (prompted.includes(value) || value.includes(prompted))) {
      return true;
    }
    if (answer.length > 3 && (answer.includes(value) || (value.includes(answer) && answer.length > value.length * 0.7))) {
      return true;
    }
    return false;
  };
  // "True" / "False" / "Yes" say nothing about the topic, so only the question counts for those.
  const plainAnswer = /^(true|false|yes|no)$/i.test((correctLabel ?? "").trim()) ? "" : (correctLabel ?? "").trim();
  const promptWords = contentWords(prompt ?? "");
  const answerWords = contentWords(plainAnswer);
  const answerNumber = /^\d+$/.test(plainAnswer) ? plainAnswer : undefined;
  const scored = Boolean(prompt?.trim() || plainAnswer);
  const relevance = (sentence: string) => {
    const words = contentWords(sentence);
    let score = 0;
    for (const word of promptWords) {
      if (words.has(word)) {
        score += 1;
      }
    }
    for (const word of answerWords) {
      if (words.has(word) && !promptWords.has(word)) {
        score += 1;
      }
    }
    const namesAnswer = answerNumber
      ? words.has(answerNumber) || words.has(NUMBER_WORDS[answerNumber] ?? "-")
      : answerWords.size > 0 && [...answerWords].every((word) => words.has(word));
    return score + (namesAnswer ? 3 : 0);
  };
  const seen = new Set<string>();
  const found: { text: string; score: number }[] = [];
  for (const source of [easierExplanation, explanation]) {
    for (const raw of splitSentences(source ?? "")) {
      const sentence = cleanSentence(raw);
      const key = normalizeText(sentence);
      if (!sentence || seen.has(key)) {
        continue;
      }
      seen.add(key);
      // Check the sentence as written too: "A learner should..." became "You should..." above.
      if (FILLER.some((pattern) => pattern.test(sentence)) || /\blearners?\b/i.test(sentence) || !quotesClosed(sentence) || repeats(sentence) || repeats(raw)) {
        continue;
      }
      const fitted = fitSentence(sentence);
      if (!fitted) {
        continue;
      }
      if (!scored) {
        return fitted;
      }
      found.push({ text: fitted, score: relevance(fitted) });
    }
  }
  if (found.length <= 1) {
    return found[0]?.text;
  }
  const best = found.reduce((top, item) => (item.score > top.score ? item : top));
  return best.score > 0 ? best.text : undefined;
}
