/**
 * Where each word of an ayah is recited, so its words can light up one by one while Sheikh Alafasy recites it (the
 * recordings quranAudio.ts streams). The times are quran-align's word-by-word timings by Collin Fair
 * (https://github.com/cpfair/quran-align), licensed CC BY 4.0, built into src/data/ayahWordTimes.json by
 * scripts/quran-word-times/build.mjs. They count words as the ayah's text split at its spaces, which matches the
 * app's Quran text for nearly every ayah; an ayah whose count differs is simply shown without the lights.
 */

/** The credit the CC BY 4.0 licence asks for, shown under an ayah whose words light up. */
export const AYAH_WORD_TIMES_CREDIT = "quran-align (CC BY 4.0)";

let table: Record<string, string> | undefined;

/**
 * When each word of the ayah ("2:255") starts, in seconds from the start of its recitation, and then when the last
 * word ends: n words give n + 1 times. Undefined for an ayah with no timings. The table loads on the first call.
 */
export function ayahWordTimes(ayahKey: string): number[] | undefined {
  table ??= require("../data/ayahWordTimes.json") as Record<string, string>;
  const packed = table[ayahKey];
  if (!packed) {
    return undefined;
  }
  let centiseconds = 0;
  return packed.split(" ").map((step) => (centiseconds += Number(step)) / 100);
}

/** Tests only: whether the table is loaded (it should wait for the first recitation). */
export function ayahWordTimesLoadedForTests() {
  return table !== undefined;
}

/** Tests only: forgets the table, as when the app has just opened. */
export function resetAyahWordTimesForTests() {
  table = undefined;
}

/** True for a piece of text holding a letter: a word, and not a sign standing on its own. */
const LETTER = /\p{L}/u;

export type AyahPiece = { text: string; word: number };

/**
 * The text cut at its spaces into pieces that join back into it exactly. `word` counts the words (pieces with a
 * letter) from 0; a space, or a sign standing on its own, has -1.
 */
export function ayahPieces(text: string): { pieces: AyahPiece[]; words: number } {
  const pieces: AyahPiece[] = [];
  let words = 0;
  text.split(/( +)/).forEach((part) => {
    if (!part) return;
    pieces.push({ text: part, word: LETTER.test(part) ? words++ : -1 });
  });
  return { pieces, words };
}

/** The word (from 0) being recited `seconds` into the ayah; undefined before the first word or after the last. */
export function wordAt(times: readonly number[], seconds: number): number | undefined {
  const words = times.length - 1;
  if (words < 1 || seconds < times[0] || seconds >= times[words] + 0.25) {
    return undefined;
  }
  let low = 0;
  let high = words - 1;
  while (low < high) {
    const middle = (low + high + 1) >> 1;
    if (times[middle] <= seconds) {
      low = middle;
    } else {
      high = middle - 1;
    }
  }
  return low;
}
