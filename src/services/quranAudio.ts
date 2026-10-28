/**
 * Recitation audio for the ayahs that learn cards show, one ayah at a time, so a learner can listen
 * and repeat it to memorize.
 *
 * Audio: Mishary Rashid Alafasy (murattal, 128 kbps), streamed from the Islamic Network audio CDN
 * (https://alquran.cloud, files from https://everyayah.com). Its terms
 * (https://alquran.cloud/terms-and-conditions) let apps stream the recitations; the copyright stays
 * with the reciter. The file is only fetched when the learner taps Listen, and no learner data is sent
 * with it. To move to another source (e.g. Quran Foundation through our backend), change
 * QURAN_AUDIO_SOURCE only: every caller goes through quranAudioUrl().
 */
export const QURAN_AUDIO_SOURCE = {
  reciter: "Mishary Alafasy",
  credit: "Islamic Network",
  /** {n} is the ayah's number counted through the whole Quran, 1 to 6236. */
  urlTemplate: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/{n}.mp3"
} as const;

/** Ayahs in each surah (Hafs 'an 'Asim, the count in the Madinah mushaf), surah 1 first. */
export const SURAH_AYAH_COUNTS: readonly number[] = [
  7, 286, 200, 176, 120, 165, 206, 75, 129, 109, 123, 111, 43, 52, 99, 128, 111, 110, 98, 135, 112, 78, 118, 64, 77, 227, 93, 88, 69,
  60, 34, 30, 73, 54, 45, 83, 182, 88, 75, 85, 54, 53, 89, 59, 37, 35, 38, 29, 18, 45, 60, 49, 62, 55, 78, 96, 29, 22, 24, 13, 14, 11,
  11, 18, 12, 12, 30, 52, 52, 44, 28, 28, 20, 56, 40, 31, 50, 40, 46, 42, 29, 19, 36, 25, 22, 17, 19, 26, 30, 20, 15, 21, 11, 8, 8, 19,
  5, 8, 8, 11, 11, 8, 3, 9, 5, 4, 7, 3, 6, 3, 5, 4, 5, 6
];

const SURAH_START: number[] = SURAH_AYAH_COUNTS.reduce<number[]>((starts, _count, index) => {
  starts.push(index === 0 ? 0 : starts[index - 1] + SURAH_AYAH_COUNTS[index - 1]);
  return starts;
}, []);

export type AyahKey = { surah: number; ayah: number };

/** "Quran 67:2" gives { surah: 67, ayah: 2 }. A range ("Quran 6:84-86") or anything else gives null. */
export function parseQuranReference(reference?: string): AyahKey | null {
  const match = reference?.trim().match(/^Quran\s+(\d{1,3}):(\d{1,3})$/i);
  if (!match) {
    return null;
  }
  const surah = Number(match[1]);
  const ayah = Number(match[2]);
  if (surah < 1 || surah > SURAH_AYAH_COUNTS.length || ayah < 1 || ayah > SURAH_AYAH_COUNTS[surah - 1]) {
    return null;
  }
  return { surah, ayah };
}

/** The ayah's number counted through the whole Quran: 1:1 is 1, 67:1 is 5242, 114:6 is 6236. */
export function globalAyahNumber({ surah, ayah }: AyahKey) {
  return SURAH_START[surah - 1] + ayah;
}

/** The recitation of one ayah, or null when the reference is not exactly one ayah. */
export function quranAudioUrl(reference?: string) {
  const key = parseQuranReference(reference);
  return key ? QURAN_AUDIO_SOURCE.urlTemplate.replace("{n}", String(globalAyahNumber(key))) : null;
}
