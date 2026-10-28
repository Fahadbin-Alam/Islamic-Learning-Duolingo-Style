import { LESSONS_BY_ID } from "../data/course";
import type { Challenge, Lesson, LessonSource } from "../types";

/**
 * The source that says a question's answer: its own, else the learn-card source of the lesson it was first asked
 * in (a review asks another lesson's question), else its lesson's. A lesson's general sources are not used: they
 * are about its unit, not this one fact.
 */
export function questionSource(challenge: Pick<Challenge, "source" | "sourceLessonId">, lesson?: Pick<Lesson, "learnSource">): LessonSource | undefined {
  if (challenge.source) return challenge.source;
  const origin = challenge.sourceLessonId ? LESSONS_BY_ID[challenge.sourceLessonId] : undefined;
  return origin?.learnSource ?? lesson?.learnSource;
}

// Long collection names, by the short name a chip shows.
const SHORT_NAMES: [RegExp, string][] = [
  [/^Sahih al-Bukhari\b/i, "Bukhari"],
  [/^Sahih Muslim\b/i, "Muslim"],
  [/^(Sunan )?Abi Dawud\b|^Abudawud\b/i, "Abu Dawud"],
  [/^Jami[`'’]? at-Tirmidhi\b/i, "Tirmidhi"],
  [/^Sunan an-Nasa'i\b|^Nasai\b/i, "Nasa'i"],
  [/^Sunan Ibn Majah\b|^Ibnmajah\b/i, "Ibn Majah"],
  [/^Al-Adab Al-Mufrad\b/i, "Adab al-Mufrad"],
  [/^Mishkat al-Masabih\b/i, "Mishkat"],
  [/^Siyar A'lam an-Nubala\b/i, "Siyar"],
  [/^Surah (?=\d)/i, "Quran "]
];

/** A reference short enough for a chip beside the answer sheet's heading: "Sahih al-Bukhari 3754" is "Bukhari 3754". */
export function shortReference(reference: string) {
  const trimmed = reference.trim();
  for (const [pattern, name] of SHORT_NAMES) {
    if (pattern.test(trimmed)) return trimmed.replace(pattern, name).replace(/\s{2,}/g, " ");
  }
  return trimmed;
}
