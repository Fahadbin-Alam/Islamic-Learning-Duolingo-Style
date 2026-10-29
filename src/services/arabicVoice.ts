import * as Speech from "expo-speech";
import { QURAN_AYAHS } from "../data/quranAyahs";
import { QURAN_AUDIO_SOURCE, globalAyahNumber } from "./quranAudio";

/**
 * How a learn card's Arabic word is said aloud:
 * - a word that is a whole ayah plays the reciter (see quranAudio.ts), never a robot voice;
 * - any other word uses the phone's own Arabic voice, but only when the phone has one. Without one
 *   the browser or phone reads the Arabic letters with an English voice and says the wrong thing, so the
 *   speaker button is hidden instead.
 */

/** Letters only: no vowel marks, Quran stop signs, tatweel or alifs, and one form of alif/ya/ta marbuta. */
export function arabicLetters(text: string) {
  return text
    .replace(/[ؐ-ًؚ-ٰٟۖ-ۭـ]/g, "")
    .replace(/[ٱأإآا]/g, "")
    .replace(/[ىی]/g, "ي")
    .replace(/ة/g, "ه")
    .replace(/\s+/g, " ")
    .trim();
}

const AYAH_BY_LETTERS = new Map(
  Object.keys(QURAN_AYAHS).map((key) => {
    const [surah, ayah] = key.split(":").map(Number);
    return [arabicLetters(QURAN_AYAHS[key]), { surah, ayah }] as const;
  })
);

/** The recitation of an Arabic word that is exactly one whole ayah (e.g. Al-hamdu lillahi rabbil-alamin), else null. */
export function recitationForArabic(text: string) {
  const key = AYAH_BY_LETTERS.get(arabicLetters(text));
  return key ? QURAN_AUDIO_SOURCE.urlTemplate.replace("{n}", String(globalAyahNumber(key))) : null;
}

let arabicVoice: Promise<string | null> | null = null;

async function listVoices(): Promise<Speech.Voice[]> {
  // The web list can stay empty with no event when the browser has no voices: give up after a moment.
  let timer: ReturnType<typeof setTimeout> | undefined;
  const timeout = new Promise<Speech.Voice[]>((resolve) => {
    timer = setTimeout(() => resolve([]), 1500);
  });
  try {
    return await Promise.race([Speech.getAvailableVoicesAsync(), timeout]);
  } catch {
    return [];
  } finally {
    clearTimeout(timer);
  }
}

/**
 * The id of an Arabic voice on this device, or null when it has none. A voice found is kept; "none" is asked
 * again next time, since the speech engine can still be starting, or the learner may install a voice.
 */
export function findArabicVoice(): Promise<string | null> {
  if (!arabicVoice) {
    const lookup = (async () => {
      let voices = await listVoices();
      if (voices.length === 0) {
        // Android and browsers fill the list a moment after start-up.
        await new Promise((resolve) => setTimeout(resolve, 1000));
        voices = await listVoices();
      }
      return voices.find((voice) => voice.language?.toLowerCase().startsWith("ar"))?.identifier ?? null;
    })();
    arabicVoice = lookup;
    void lookup.then((id) => {
      if (!id && arabicVoice === lookup) {
        arabicVoice = null;
      }
    });
  }
  return arabicVoice;
}

/** Tests only. */
export function resetArabicVoiceForTests() {
  arabicVoice = null;
}
