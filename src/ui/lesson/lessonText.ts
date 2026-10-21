// Small text helpers for the lesson screens: short "Why?" lines, unbreakable hyphens, fuzzy matching.

/** Longest "Why?" line the feedback sheet shows. */
export const WHY_MAX = 90;

/** Keeps "As-salamu" and "Al-'Alaq" from breaking at their hyphen (hyphen + word joiner). */
export function noBreakHyphens(value: string) {
  return value.replace(/(\p{L})-(?=[\p{L}'’ʿ])/gu, "$1-⁠");
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

// The narrator's own lead-in or a chain of names ("I said: I am Muhammad b. 'Ali b. Husain.") explains nothing.
const NARRATION_SCRAP = /^(i|we)\s(said|asked|came|went|was|were)\b|\b(b\.|bin|ibn)\s+\S+\s+(b\.|bin|ibn)\s/i;

function wordCount(value: string) {
  return value.split(/\s+/).filter((word) => /[\p{L}\p{N}]/u.test(word)).length;
}

/** A Why line must not open or close half a quotation. */
function quotesClosed(value: string) {
  const count = (pattern: RegExp) => (value.match(pattern) ?? []).length;
  return count(/"/g) % 2 === 0 && count(/“/g) === count(/”/g) && !/^['‘’]/.test(value);
}

const STOP_WORDS = new Set(
  "the and for with that this what which who whom whose does did do how many much was were are is be been being you your yours can could should would will from have has had its it's they them their there not but about into when why one all more most than then also such only very just a an of to in on at by as or if so we our us he his him she her it i me my lessons lesson".split(" ")
);

/** A rough stem: "ayahs" / "ayah", "passed" / "pass", "washes" / "wash", "times" / "time". */
function stem(word: string) {
  if (word.length <= 4) {
    return word.replace(/s$/, "");
  }
  if (/(ss|x|z|ch|sh)es$/.test(word)) {
    return word.slice(0, -2);
  }
  return word.replace(/(ing|ed|s)$/, "");
}

/** Content words of a text, stemmed and cut to five letters. */
function contentWords(value: string) {
  const words = value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .split(/[^\p{L}\p{N}]+/u)
    .filter((word) => (word.length > 2 || /^\d+$/.test(word)) && !STOP_WORDS.has(word))
    .map((word) => stem(word).slice(0, 5));
  return new Set(words);
}

const NUMBER_WORDS: Record<string, string> = {
  "1": "one", "2": "two", "3": "three", "4": "four", "5": "five", "6": "six", "7": "seven", "8": "eight", "9": "nine", "10": "ten", "12": "twelve"
};

function splitSentences(value: string) {
  // "Ubayy b. Ka'b", "Q. 2:183" and "2.5 percent" are not sentence ends.
  const guarded = value.replace(/(^|[\s(])([A-Za-z])\.(?=\s)/g, "$1$2\u2024").replace(/(\d)\.(?=\d)/g, "$1\u2024");
  const parts = (guarded.match(/[^.!?]+(?:[.!?]+["”’)]*|$)/g) ?? []).map((part) => part.replace(/\u2024/g, ".").trim()).filter(Boolean);
  // A question explains nothing alone: "Late, and the imam is bowing?" stays with its answer, "Say Allahu akbar
  // and join.", and a question with no answer after it is left out.
  const sentences: string[] = [];
  let question = "";
  for (const part of parts) {
    if (/\?["”’)]*$/.test(part)) {
      question = question ? `${question} ${part}` : part;
      continue;
    }
    sentences.push(question ? `${question} ${part}` : part);
    question = "";
  }
  return sentences;
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

// "Quran 3:66: Lo! ye are..." leads with a reference, "I said: I am..." with a speaker and "Why Hajj matters: ..."
// with a title; the point is what follows.
const REFERENCE_LEAD = /^(?:quran|sahih|sunan|jami|musnad|riyad)\b[^:]*\d\S*:\s+(?=\S)/i;
const LABEL_LEAD = /^([^:.!?]{1,40}):\s+(?=\S)/;

/** The sentence without a short "Label: " lead ("Quran 3:66: ", "I said: ", "Why Hajj matters: "). */
function withoutLead(sentence: string) {
  const reference = sentence.match(REFERENCE_LEAD);
  if (reference) {
    return sentence.slice(reference[0].length);
  }
  const label = sentence.match(LABEL_LEAD);
  return label && label[1].split(/\s+/).length <= 6 ? sentence.slice(label[0].length) : sentence;
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
  // "Wudu is the washing we do before ___." with the answer put back in says nothing new either.
  const blank = /_{2,}/.test(prompt ?? "") ? normalizeText((prompt ?? "").replace(/_{2,}/, correctLabel ?? "")) : "";
  // "True" / "False" / "Yes" say nothing about the topic, so only the question counts for those.
  const plainAnswer = /^(true|false|yes|no)$/i.test((correctLabel ?? "").trim()) ? "" : (correctLabel ?? "").trim();
  const promptWords = contentWords(prompt ?? "");
  const answerWords = contentWords(plainAnswer);
  // When the answer is "False", a sentence with the question's words in another order is the correction.
  const correcting = /^false$/i.test((correctLabel ?? "").trim());
  const repeatsText = (sentence: string) => {
    const value = normalizeText(sentence);
    if (!value) {
      return true;
    }
    if (prompted && (prompted.includes(value) || value.includes(prompted))) {
      return true;
    }
    if (blank && (blank.includes(value) || value.includes(blank))) {
      return true;
    }
    if (answer.length > 3 && (answer.includes(value) || (value.includes(answer) && answer.length > value.length * 0.7))) {
      return true;
    }
    // A sentence built only from the question's and the answer's words ("Surah Hud means "Hud".") restates them.
    // A short one like "It has 7 ayahs." still confirms a number, so it may stay.
    const words = [...contentWords(sentence)];
    return !correcting && words.length >= 3 && words.every((word) => promptWords.has(word) || answerWords.has(word));
  };
  // "Quran 3:66: Lo!" is a reference and a scrap of the answer; with the reference cut off it must still say something.
  const repeats = (sentence: string) => {
    const rest = withoutLead(sentence);
    return repeatsText(sentence) || repeatsText(rest) || (REFERENCE_LEAD.test(sentence) && wordCount(rest) < 3);
  };
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
      if (FILLER.some((pattern) => pattern.test(sentence)) || /\blearners?\b/i.test(sentence) || NARRATION_SCRAP.test(sentence) || repeats(sentence) || repeats(raw)) {
        continue;
      }
      // Quotes are checked on what is shown: a cut at "; " can leave one open.
      const fitted = fitSentence(sentence);
      if (!fitted || !quotesClosed(fitted)) {
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
