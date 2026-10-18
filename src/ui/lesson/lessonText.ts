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
  /^review (the|lessons?)\b/i
];

function splitSentences(value: string) {
  return (value.match(/[^.!?]+(?:[.!?]+["”’)]*|$)/g) ?? []).map((part) => part.trim()).filter(Boolean);
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
 * repeat the prompt or the answer. Returns undefined when nothing useful is left (the sheet then hides Why).
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
  const seen = new Set<string>();
  for (const source of [easierExplanation, explanation]) {
    for (const raw of splitSentences(source ?? "")) {
      const sentence = cleanSentence(raw);
      const key = normalizeText(sentence);
      if (!sentence || seen.has(key)) {
        continue;
      }
      seen.add(key);
      if (FILLER.some((pattern) => pattern.test(sentence)) || /\blearners?\b/i.test(sentence) || repeats(sentence)) {
        continue;
      }
      const fitted = fitSentence(sentence);
      if (fitted) {
        return fitted;
      }
    }
  }
  return undefined;
}
