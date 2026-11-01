import type { SupportedLanguage } from "../../types";

// The learn card's facts, read as a short lesson instead of a row of tags: each fact is one line of the lesson,
// written as a sentence, and the facts that only say where the lesson comes from ("Told by Anas", "Sahih (Al-Albani)",
// "Quran 2:228") move down to the source at the end of the card, next to its link.

export interface LessonPoint {
  /** "Father" in "Father: Umar": shown soft before the value. */
  key?: string;
  text: string;
}

export interface LessonNotes {
  points: LessonPoint[];
  /** Who told it, its grade or its reference: shown with the source. */
  credits: string[];
}

/** "Father: Umar" splits into a soft key and a bold value ("Quran 9:40: ..." does not: a key never ends in a number). */
const FACT_KEY = /^([^:]{0,17}[^:\d\s]):\s*(.+)$/;

const TOLD_BY = /^(told|said|narrated|reported|collected|transmitted) by\s/i;
const GRADE = /^(sahih|hasan|hasan sahih|da'?if)( hadith)?( \([^)]+\))?$/i;
const REFERENCE =
  /^(quran|surah|sahih al-bukhari|sahih muslim|bukhari|muslim|jami at-tirmidhi|tirmidhi|sunan [a-z' -]+|abu dawud|ibn majah|an-nasa'?i|nasa'?i|muwatta[a-z' -]*|riyad as-salihin|al-adab al-mufrad)\s*\d+(:\d+)?([-–]\d+)?[a-z]?( and \d+(:\d+)?)?$/i;

/**
 * True when an English fact only says where the lesson is from, not what it teaches. "Told by ..." counts only on a
 * hadith card: in a Quran story "Told by a hoopoe bird" is part of the story.
 */
export function isCredit(fact: string, source: { reference?: string; hadith?: boolean } = {}) {
  const value = fact.trim();
  if (!value) return false;
  if (source.reference && value.toLowerCase() === source.reference.trim().toLowerCase()) return true;
  return (Boolean(source.hadith) && TOLD_BY.test(value)) || GRADE.test(value) || REFERENCE.test(value);
}

const END_MARK: Record<SupportedLanguage, string> = { en: ".", ar: ".", ur: "۔", bn: "।" };
/** Already ends a sentence, or ends with a quote or bracket that would look odd with a full stop after it. */
const ENDED = /[.!?…:;)\]"'”’»؟۔।]$/;

/** One lesson line as a sentence: a capital first letter and a full stop at the end. */
export function asSentence(text: string, language: SupportedLanguage = "en") {
  const value = text.trim();
  if (!value) return value;
  const capital = /^[a-z]/.test(value) ? value[0].toUpperCase() + value.slice(1) : value;
  return ENDED.test(capital) ? capital : `${capital}${END_MARK[language] ?? "."}`;
}

/**
 * Splits the card's facts (as shown, maybe translated) into lesson lines and credits. `english` is the same facts
 * in English, used to tell which are credits, since the rules are written for the English words.
 */
export function splitLessonFacts(facts: string[], options: { english?: string[]; sourceReference?: string; hadith?: boolean; language?: SupportedLanguage } = {}): LessonNotes {
  const language = options.language ?? "en";
  const points: LessonPoint[] = [];
  const credits: string[] = [];
  facts.forEach((fact, index) => {
    const shown = fact.trim();
    if (!shown) return;
    const english = options.english?.[index]?.trim() || shown;
    if (isCredit(english, { reference: options.sourceReference, hadith: options.hadith })) {
      credits.push(shown);
      return;
    }
    const parts = shown.match(FACT_KEY);
    points.push(parts ? { key: parts[1], text: parts[2] } : { text: asSentence(shown, language) });
  });
  return { points, credits };
}
