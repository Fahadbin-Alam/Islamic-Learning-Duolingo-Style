import type { PassageDeep } from "./types";

/**
 * Al-Infitar (the Splitting) in depth, passage by passage (the same passages as s082.ts). Our own plain summary
 * of Tafsir Ibn Kathir and Tafsir as-Sa'di, as in deep002.ts; anything the scholars differ on is left out.
 */
export const DEEP_082: Record<string, PassageDeep> = {
  "1-12": {
    meaning: [
      "When the sky splits open, the stars scatter, the seas burst forth and the graves are turned over.",
      "O man, what has deceived you about your Lord, the Most Generous, who created you, shaped and balanced you?",
      "Over you are guardians, noble scribes, who know whatever you do."
    ],
    takeaway: "Allah's generosity is a reason to obey Him, never a reason to slack.",
    q: [
      ["Ayah 11: who writes down what we do?", "Noble scribes", "Our friends", "Nobody", "Our teachers"],
      ["Ayah 6: which name of Allah does it use?", "The Most Generous", "The First", "The Opener", "The Hidden"]
    ]
  },
  "13-19": {
    meaning: [
      "The righteous will be in bliss, and the wicked in a blazing fire they cannot leave.",
      "What will make you know what the Day of Judgement is?",
      "A Day when a soul can do nothing at all for another, and the command that Day belongs to Allah alone."
    ],
    takeaway: "No one can carry you on that Day: build your own good deeds now.",
    q: [
      ["Ayah 19: what can one soul do for another that Day?", "Nothing at all", "Pay its debt", "Take its place", "Carry its sins"],
      ["Ayah 13: where will the righteous be?", "In bliss", "In a desert", "In a prison", "In the sea"]
    ]
  }
};
