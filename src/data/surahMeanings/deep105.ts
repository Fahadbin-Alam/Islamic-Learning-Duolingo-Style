import type { PassageDeep } from "./types";

/**
 * Al-Fil (the Elephant) in depth, passage by passage (the same passages as s105.ts). Our own plain summary of
 * Tafsir Ibn Kathir and Tafsir as-Sa'di, as in deep002.ts; anything the scholars differ on is left out.
 */
export const DEEP_105: Record<string, PassageDeep> = {
  "1-2": {
    meaning: [
      "Have you not seen how your Lord dealt with the companions of the elephant?",
      "Did He not make their scheme go astray?"
    ],
    story: "Abrahah marched on Makkah with an elephant to wreck the Ka'bah. Near Makkah the elephant knelt and would not go on, in the year the Prophet ﷺ was born.",
    takeaway: "No army can harm what Allah protects: trust Him with what you love.",
    q: [
      ["Ayah 1: whom did the army bring along?", "An elephant", "A lion", "A horse", "A camel"],
      ["What did the army of the elephant want?", "To wreck the Ka'bah", "To trade", "To make Hajj", "To visit family"]
    ]
  },
  "3-5": {
    meaning: [
      "He sent against them birds in flocks,",
      "pelting them with stones of baked clay,",
      "and made them like eaten straw, chewed-up leaves."
    ],
    story: "Years later, when the Prophet's ﷺ camel knelt near Makkah at Hudaybiyah, he ﷺ said: the One who held back the elephant held her back.",
    hadith: { collection: "bukhari", number: 2731, narrator: "Al-Miswar and Marwan", text: "Al-Qaswa has not become stubborn, but she was stopped by Him who stopped the elephant." },
    takeaway: "Allah can defeat the mighty with the smallest of His creatures.",
    q: [
      ["Ayah 4: what did the birds throw?", "Stones of baked clay", "Fire", "Water", "Flowers"],
      ["Ayah 5: what did the army end up like?", "Eaten straw", "Tall trees", "Shining gold", "A strong wall"]
    ]
  }
};
