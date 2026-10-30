/**
 * One passage of a surah, taught on one learn card: what its ayahs mean, in a few plain words.
 *
 * The passages follow the ruku sections of the Madinah mushaf (the ع marks), split where a ruku is long, so the
 * passages of a surah cover every one of its ayahs, in order. The meaning is our own short summary of the
 * Saheeh International translation and Tafsir Ibn Kathir, both on Quran.com; nothing is quoted from them.
 * Anything the scholars differ on is left out of the summary.
 */
export interface Passage {
  /** The ayahs, "1-7" or "255". */
  at: string;
  /** A short name for the passage (the answer when a question asks what these ayahs are about). */
  title: string;
  /** What the passage says, in 3 to 12 words and at most 64 letters. */
  line: string;
  /** Up to three more points from the passage, a few words each. */
  facts: string[];
  /** A question about the card: the question, its answer, then three wrong answers. */
  q: [string, string, string, string, string];
  /** Why the answer is right, when the card line alone does not say it. */
  why?: string;
  /** The ayah whose Arabic the card shows (and plays), when not the passage's first. 0 shows none. */
  ayah?: number;
}

export interface SurahMeaning {
  surah: number;
  passages: Passage[];
}
