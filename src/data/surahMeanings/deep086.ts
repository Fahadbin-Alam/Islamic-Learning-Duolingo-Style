import type { PassageDeep } from "./types";

/**
 * At-Tariq (the Night Star) in depth, passage by passage (the same passages as s086.ts). Our own plain summary
 * of Tafsir Ibn Kathir and Tafsir as-Sa'di, as in deep002.ts; anything the scholars differ on is left out.
 */
export const DEEP_086: Record<string, PassageDeep> = {
  "1-10": {
    meaning: [
      "By the sky and the night-comer: and what is the night-comer? The star of piercing brightness.",
      "There is no soul without a guardian over it.",
      "So let man look at what he was created from; the One who made him is able to bring him back."
    ],
    takeaway: "Someone is always watching over you: act as if it matters, because it does.",
    q: [
      ["Ayah 3: what is the night-comer?", "The star of piercing brightness", "The moon", "The sun", "A cloud"],
      ["Ayah 4: what does every soul have over it?", "A guardian", "A crown", "A cloud", "Nothing"]
    ]
  },
  "11-17": {
    meaning: [
      "By the sky that returns rain, and the earth that splits open with plants.",
      "It is a decisive word, and it is not for amusement.",
      "They plot a plan, and I plan a plan; so give the deniers time, a little while."
    ],
    takeaway: "Take the Quran seriously: it settles right and wrong.",
    q: [
      ["Ayah 13: what kind of word is the Quran?", "A decisive word", "A light joke", "A poem", "Only a story"],
      ["Ayah 14: the Quran is not for what?", "Amusement", "Guidance", "Prayer", "Learning"]
    ]
  }
};
