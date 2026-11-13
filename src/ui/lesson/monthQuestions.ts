import type { Challenge } from "../../types";
import { MONTHS } from "../../data/moonSky";
import { fitsTwoLines } from "../journey/moonArt";

/**
 * Month questions asked on the year: when every answer of a question is a month of the year by the moon ("Ramadan",
 * "Sha'ban", "Muharram"), the twelve months are shown as the year, in order, and the learner taps the right one where
 * it is (src/ui/lesson/MonthGame.tsx): its moon fills. Nothing new is written: the question, its answers, its right
 * answer and its source stay the checked ones; the year only shows where each answer falls.
 *
 * An answer counts only when it is written in one of the ways below, each the name of one month and no other.
 * "Jumada" or "Rabi" alone could be either of two months, so they are not here.
 */
const MONTH_OF_ANSWER: Record<string, number> = {
  muharram: 0,
  safar: 1,
  "rabi al-awwal": 2,
  "rabi' al-awwal": 2,
  "rabi ul-awwal": 2,
  "rabi al-akhir": 3,
  "rabi' al-akhir": 3,
  "rabi al-thani": 3,
  "rabi' al-thani": 3,
  "jumada al-ula": 4,
  "jumada al-awwal": 4,
  "jumada al-akhirah": 5,
  "jumada al-akhira": 5,
  "jumada al-thani": 5,
  rajab: 6,
  "sha'ban": 7,
  shaban: 7,
  ramadan: 8,
  ramadhan: 8,
  shawwal: 9,
  "dhul-qa'dah": 10,
  "dhul qa'dah": 10,
  "dhu al-qa'dah": 10,
  "dhul-qadah": 10,
  "dhul-hijjah": 11,
  "dhul hijjah": 11,
  "dhu al-hijjah": 11
};

/**
 * Questions left as tiles although their answers are months, because the year shows the months in their order and
 * would answer them by itself: which month begins the year, which comes before or between others, and which month
 * the Arabs put in Muharram's place (the one right after it on the year).
 */
const LEFT_AS_TILES = new Set([
  "Which month begins the Islamic year?",
  "Which month comes just before Ramadan?",
  "Which month comes between Rajab and Ramadan?",
  "Which sacred month falls between Jumada and Sha'ban?",
  "Which month did they swap Muharram with?"
]);

/** An answer as the table above writes it: lower case, plain quotes, no stop at the end. */
export function monthKey(label: string) {
  return label
    .toLowerCase()
    .replace(/[’‘`]/g, "'")
    .replace(/[.!?;:]+$/, "")
    .replace(/\s+/g, " ")
    .trim();
}

/** The month (0 is Muharram) an answer names, if it names one. */
export function monthOfAnswer(label: string): number | undefined {
  return MONTH_OF_ANSWER[monthKey(label)];
}

/**
 * Each answer's month (choice id -> month, 0 is Muharram), when the question can be asked on the year: at least three
 * answers, each a different month. Read on the English question.
 */
export function monthsFor(challenge: Pick<Challenge, "choices" | "type" | "prompt">): Record<string, number> | undefined {
  if (challenge.type === "true_false" || challenge.choices.length < 3 || LEFT_AS_TILES.has(challenge.prompt)) return undefined;
  const months: Record<string, number> = {};
  const seen = new Set<number>();
  for (const choice of challenge.choices) {
    const month = monthOfAnswer(choice.label);
    if (month === undefined || seen.has(month)) return undefined;
    seen.add(month);
    months[choice.id] = month;
  }
  return months;
}

/** The year's months, row by row, three to a row: read from the left, or from the right in Urdu and Arabic. */
export function yearRows(rtl = false) {
  const rows: { index: number; name: string }[][] = [];
  MONTHS.forEach((month, index) => {
    const row = Math.floor(index / 3);
    (rows[row] ??= []).push({ index, name: month.name });
  });
  return rtl ? rows.map((row) => [...row].reverse()) : rows;
}

/** The year's frame round the months: its border and the room inside it, each side. */
export const YEAR_EDGE = 2;
export const YEAR_PAD = 6;
/** The gap between two months, across and down. */
export const MONTH_GAP = 6;
/** Inside a month: its border and the room each side of its name. */
export const MONTH_BORDER = 2;
export const MONTH_PAD_X = 4;

/** The size of the names (an answer's bigger than the other months') and of the moons, a little smaller on a short phone. */
export function monthSizes(compact = false) {
  return { answerFont: compact ? 13 : 14, otherFont: compact ? 11 : 12, moon: compact ? 24 : 26 };
}

/** How the months are set on a year `width` wide: each month's width, and the room its name has. */
export function yearLook(width: number, compact = false) {
  const cell = (width - YEAR_EDGE * 2 - YEAR_PAD * 2 - MONTH_GAP * 2) / 3;
  return { ...monthSizes(compact), cell, text: cell - MONTH_BORDER * 2 - MONTH_PAD_X * 2 };
}

/** Whether a month's name fits its place on the year in two lines, at an answer's size or at the other months'. */
export function nameFits(name: string, width: number, answer: boolean, compact = false) {
  const look = yearLook(width, compact);
  return fitsTwoLines(name, look.text, answer ? look.answerFont : look.otherFont);
}
