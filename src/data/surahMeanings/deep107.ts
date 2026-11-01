import type { PassageDeep } from "./types";

/**
 * Al-Ma'un (Small Kindnesses) in depth, passage by passage (the same passages as s107.ts). Our own plain summary
 * of Tafsir Ibn Kathir and Tafsir as-Sa'di, as in deep002.ts; anything the scholars differ on is left out.
 */
export const DEEP_107: Record<string, PassageDeep> = {
  "1-3": {
    meaning: [
      "Have you seen the one who denies the Day of Judgment?",
      "That is the one who harshly pushes away the orphan,",
      "and does not encourage feeding the poor."
    ],
    story: "The Prophet ﷺ held up two fingers side by side and said: I and the one who cares for an orphan will be like this in Paradise.",
    hadith: { collection: "bukhari", number: 5304, narrator: "Sahl bin Sa'd", text: "I and the one who looks after an orphan will be in Paradise like this, and he pointed with his index and middle fingers." },
    takeaway: "How you treat the weak shows what you really believe about the Last Day.",
    q: [
      ["Ayah 2: what does the denier do to the orphan?", "Harshly pushes him away", "Feeds him", "Hugs him", "Teaches him"],
      ["Who will be close to the Prophet ﷺ in Paradise?", "One who cares for an orphan", "The richest person", "The strongest", "The most famous"]
    ]
  },
  "4-7": {
    meaning: [
      "So woe to those who pray, yet are careless about their prayer,",
      "those who only want to be seen,",
      "and who refuse even small kindnesses, like lending a pot or a bucket."
    ],
    takeaway: "Pray for Allah, not for show, and never refuse a neighbour a little help.",
    q: [
      ["Ayah 6: why do these people pray?", "Only to be seen", "To get closer to Allah", "To thank Allah", "To ask forgiveness"],
      ["Ayah 7: what do they refuse to lend?", "Small things, like a pot", "Their houses", "Their gold", "Their camels"]
    ]
  }
};
