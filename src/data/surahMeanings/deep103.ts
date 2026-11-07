import type { PassageDeep } from "./types";

/**
 * Al-'Asr (Time) in depth, passage by passage (the same passages as s103.ts). Our own plain summary of Tafsir
 * Ibn Kathir and Tafsir as-Sa'di, as in deep002.ts; anything the scholars differ on is left out.
 */
export const DEEP_103: Record<string, PassageDeep> = {
  "1-2": {
    meaning: [
      "By time: Allah swears by the passing of time, the stage where all deeds happen.",
      "Surely every human being is at a loss, as each day spent is gone for good."
    ],
    story: "The Prophet ﷺ said: there are two blessings many people waste, good health and free time.",
    hadith: { collection: "bukhari", number: 6412, narrator: "Ibn Abbas", text: "There are two blessings in which many people are at a loss: health and free time." },
    takeaway: "Time is your life's capital: spend each hour on something that lasts.",
    q: [
      ["Ayah 2: how is every human being, unless saved?", "At a loss", "Always winning", "Safe forever", "Rich"],
      ["Which two blessings did the Prophet ﷺ say many waste?", "Health and free time", "Gold and silver", "Camels and sheep", "Houses and land"]
    ]
  },
  "3": {
    meaning: [
      "Except those who believe and do righteous deeds,",
      "who urge one another to the truth, and urge one another to patience.",
      "Imam ash-Shafi'i said: had Allah sent only this surah, it would be enough for people."
    ],
    takeaway: "Believe, do good, and help your friends stay on track.",
    q: [
      ["Ayah 3: what do the saved urge one another to?", "Truth and patience", "Games and fun", "Money and fame", "Anger"],
      ["Ayah 3: which two come first for those saved?", "Faith and righteous deeds", "Wealth and children", "Sleep and food", "Travel and trade"]
    ]
  }
};
