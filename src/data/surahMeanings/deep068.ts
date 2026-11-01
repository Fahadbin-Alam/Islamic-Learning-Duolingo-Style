import type { PassageDeep } from "./types";

/**
 * Al-Qalam (the Pen) in depth, passage by passage (the same passages as s068.ts). Our own plain summary of
 * Tafsir Ibn Kathir and Tafsir as-Sa'di, as in deep002.ts; anything the scholars differ on is left out.
 */
export const DEEP_068: Record<string, PassageDeep> = {
  "1-16": {
    meaning: [
      "Nun. By the pen and what they write: by your Lord's favour, you are not mad.",
      "Yours is a reward that never ends, and you are truly upon a mighty character.",
      "Do not obey every oath-swearing liar who slanders and goes about spreading gossip."
    ],
    story: "A man asked Aishah about the Prophet's ﷺ character. She said: do you not read the Quran? His character was the Quran.",
    hadith: { collection: "muslim", number: 746, narrator: "Aishah", text: "Do you not read the Quran? The character of the Prophet of Allah ﷺ was the Quran." },
    takeaway: "Copy the Prophet's ﷺ manners: living the Quran is the best character.",
    q: [
      ["Ayah 4: what is the Prophet ﷺ truly upon?", "A mighty character", "A great throne", "A swift horse", "A high tower"],
      ["Aishah said his ﷺ character was what?", "The Quran", "Silence", "Wealth", "Poetry"]
    ]
  },
  "17-33": {
    meaning: [
      "Owners of a garden swore to pick its fruit at dawn, so no poor person could come in.",
      "At night a calamity from your Lord struck it, and by morning it was like a burnt field.",
      "They blamed one another, then said: glory be to our Lord, we were wrongdoers."
    ],
    takeaway: "Share what Allah gives you: holding back from the poor can cost it all.",
    q: [
      ["Ayah 17: when did the owners plan to pick the fruit?", "At dawn", "At noon", "After a year", "At sunset"],
      ["Ayah 20: what did the garden look like by morning?", "Like a burnt field", "Full of fruit", "Twice as big", "Fenced with gold"]
    ]
  },
  "34-47": {
    meaning: [
      "For the mindful are gardens of bliss with their Lord.",
      "Shall We treat those who submit like the criminals? What is wrong with your judgement?",
      "On a Day of great terror, they will be called to bow down but will be unable."
    ],
    takeaway: "Allah is fair: the obedient and the wicked are never treated the same.",
    q: [
      ["Ayah 35: whom will Allah not treat like the criminals?", "Those who submit", "The loud ones", "The rich", "The famous"],
      ["Ayah 42: what will the deniers be unable to do?", "Bow down", "Speak at all", "Stand up", "Look around"]
    ]
  },
  "48-52": {
    meaning: [
      "Be patient with your Lord's decision, and do not be like the companion of the whale.",
      "He called out in distress, and had his Lord's favour not reached him, he would be left blamed.",
      "Then his Lord chose him and made him one of the righteous."
    ],
    takeaway: "Trust Allah's plan calmly, and turn back to Him when you slip.",
    q: [
      ["Ayah 48: what are we told to be with Allah's decision?", "Patient", "Angry", "Hasty", "Careless"],
      ["Ayah 50: what did Allah make Yunus after choosing him?", "One of the righteous", "A king", "A rich trader", "A sailor"]
    ]
  }
};
