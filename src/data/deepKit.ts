import type { DifficultyTier, LearningNode, Lesson, LessonSource, TopicId } from "../types";
import { QURAN_AYAHS } from "./quranAyahs";

// The building blocks of the deep units (deepUnits.ts and the files it gathers): a lesson card, its questions,
// and the sources they come from.

type HadithBook = "bukhari" | "muslim" | "tirmidhi" | "abudawud" | "ibnmajah" | "nasai";

export type Question =
  | { q: string; a: string; wrong: [string, string, string]; why: string }
  | { q: string; tf: boolean; why: string };

export interface DeepLesson {
  slug: string;
  title: string;
  line: string;
  facts?: string[];
  quote?: { text: string; reference: string };
  source: LessonSource;
  difficulty: DifficultyTier;
  questions: Question[];
}

export interface DeepUnit {
  /** Short key for ids: deep-<key>-<slug>. */
  key: string;
  topicId: TopicId;
  /** The existing unit the deep lessons join, after its own circles. */
  branchId: string;
  /** A unit of its own, added to its topic as a new unit at the end (the Muhajirun). */
  branch?: { title: string; description: string };
  /** Who or what the unit is about, for the review lines. */
  name: string;
  kind: LearningNode["kind"];
  lessonType: NonNullable<Lesson["lessonType"]>;
  /** A surah unit's surah, on every lesson and circle. */
  surahName?: string;
  lessons: DeepLesson[];
}

export function hadith(book: HadithBook, number: string, narrator: string, grade: string, summary: string): LessonSource {
  const names: Record<HadithBook, [string, string]> = { bukhari: ["Sahih al-Bukhari", "Imam al-Bukhari"], muslim: ["Sahih Muslim", "Imam Muslim"], tirmidhi: ["Jami at-Tirmidhi", "Imam at-Tirmidhi"], abudawud: ["Sunan Abi Dawud", "Imam Abu Dawud"], ibnmajah: ["Sunan Ibn Majah", "Imam Ibn Majah"], nasai: ["Sunan an-Nasa'i", "Imam an-Nasa'i"] };
  const [collection, collector] = names[book];
  // "3667, 3668": one hadith sunnah.com shows under two numbers; the link goes to the last one, as the reference ends with it.
  const linked = number.split(", ").pop();
  return {
    id: `deep_${book}_${number.replace(/\W+/g, "_")}`,
    site: "Sunnah.com",
    category: "hadith",
    title: `${collection} ${number}`,
    url: `https://sunnah.com/${book}:${linked}`,
    reference: `${collection} ${number}`,
    from: `${narrator}; collected by ${collector}`,
    grade,
    summary
  };
}

export function quran(surah: number, ayahNumber: number, summary: string): LessonSource {
  return {
    id: `deep_quran_${surah}_${ayahNumber}`,
    site: "Quran.com",
    category: "tafsir",
    title: `Quran ${surah}:${ayahNumber}`,
    url: `https://quran.com/${surah}/${ayahNumber}`,
    reference: `Quran ${surah}:${ayahNumber}`,
    from: "The Quran, on Quran.com",
    grade: "Quran",
    summary
  };
}

/** An ayah's Arabic (from quranAyahs.ts) and its reference, for a lesson card's quote. */
export const quranQuote = (surah: number, number: number) => ({ text: QURAN_AYAHS[`${surah}:${number}`], reference: `Quran ${surah}:${number}` });
