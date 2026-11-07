import type { PassageDeep } from "./types";

/**
 * At-Talaq (Divorce) in depth, passage by passage (the same passages as s065.ts). Our own plain summary of
 * Tafsir Ibn Kathir and Tafsir as-Sa'di, as in deep002.ts; anything the scholars differ on is left out, and so
 * are the detailed divorce rulings, which are for scholars, not a kids' quiz.
 */
export const DEEP_065: Record<string, PassageDeep> = {
  "1-7": {
    meaning: [
      "Divorce has set rules and a waiting time; these are Allah's limits, and whoever crosses them wrongs himself.",
      "Whoever fears Allah, He makes a way out of trouble for him and provides from where he never expected.",
      "Whoever relies on Allah, He is enough for him; Allah has set a measure for everything."
    ],
    takeaway: "Stuck? Fear Allah and trust Him: He opens doors you never expected.",
    q: [
      ["Ayah 2: what does Allah give one who fears Him?", "A way out of trouble", "Hard times", "Nothing", "More worries"],
      ["Ayah 3: what has Allah set for everything?", "A measure", "No plan", "A guess", "A price"]
    ]
  },
  "8-12": {
    meaning: [
      "How many towns defied their Lord's command and His messengers, and tasted the result of their deeds.",
      "Allah sent you a reminder: a messenger reciting clear ayahs, to bring believers from darkness to light.",
      "Allah created seven heavens and of the earth the like of them, so you know He has power over all things."
    ],
    takeaway: "Follow the clear ayahs, and your path will shine.",
    q: [
      ["Ayah 12: how many heavens did Allah create?", "Seven", "Three", "Ten", "One"],
      ["Ayah 11: where does the messenger bring believers?", "From darkness to light", "From light to darkness", "Nowhere", "To the desert"]
    ]
  }
};
