import type { PassageDeep } from "./types";

/**
 * Az-Zalzalah (the Earthquake) in depth, passage by passage (the same passages as s099.ts). Our own plain
 * summary of Tafsir Ibn Kathir and Tafsir as-Sa'di, as in deep002.ts; anything the scholars differ on is left out.
 */
export const DEEP_099: Record<string, PassageDeep> = {
  "1-5": {
    meaning: [
      "When the earth is shaken with its final quake and throws out its burdens, the dead within it,",
      "and man asks: what is wrong with it? That Day it will tell its news,",
      "because your Lord inspired it to speak."
    ],
    takeaway: "The ground you walk on will speak of what you did on it.",
    q: [
      ["Ayah 2: what does the earth throw out?", "Its burdens", "Its rivers", "Its birds", "Its clouds"],
      ["Ayah 5: why will the earth tell its news?", "Its Lord inspired it to", "People forced it", "By chance", "The sea told it"]
    ]
  },
  "6-8": {
    meaning: [
      "That Day people will come out in scattered groups to be shown their deeds.",
      "Whoever does an atom's weight of good will see it,",
      "and whoever does an atom's weight of evil will see it."
    ],
    story: "The Prophet ﷺ said: protect yourselves from the Fire, even with half a date given in charity.",
    hadith: { collection: "bukhari", number: 1417, narrator: "Adi ibn Hatim", text: "Protect yourselves from the Fire, even with half a date." },
    takeaway: "No kindness is too tiny to count, and no wrong too tiny to matter.",
    q: [
      ["Ayah 7: how small a good deed will be seen?", "An atom's weight", "Only big ones", "None at all", "A mountain's weight"],
      ["What did the Prophet ﷺ say can shield from the Fire?", "Even half a date", "Only gold", "A big house", "Nothing small"]
    ]
  }
};
