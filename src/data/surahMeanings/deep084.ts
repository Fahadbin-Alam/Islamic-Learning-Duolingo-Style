import type { PassageDeep } from "./types";

/**
 * Al-Inshiqaq (the Splitting Open) in depth, passage by passage (the same passages as s084.ts). Our own plain
 * summary of Tafsir Ibn Kathir and Tafsir as-Sa'di, as in deep002.ts; anything the scholars differ on is left out.
 */
export const DEEP_084: Record<string, PassageDeep> = {
  "1-15": {
    meaning: [
      "When the sky splits open, obeying Allah as it must, and the earth is stretched flat and empties out.",
      "O man, you are toiling hard towards your Lord, and you will meet Him.",
      "Whoever is given his book in his right hand will have an easy reckoning, and return to his people happy."
    ],
    story: "The Prophet ﷺ said: whoever is questioned closely in the reckoning is ruined. Aishah asked about the easy reckoning, and he ﷺ said: that is only the showing of deeds.",
    hadith: { collection: "bukhari", number: 103, narrator: "Aishah", text: "Whoever is called to account will be punished. I said: does Allah not say: he will have an easy reckoning? He said: that is only the presentation." },
    takeaway: "Ask Allah for a light account, and live so your book is a joy to receive.",
    q: [
      ["Ayah 8: what reckoning does the right-hand person get?", "An easy reckoning", "A long, hard one", "No book at all", "A secret one"],
      ["Ayah 6: towards whom is man toiling?", "His Lord", "His boss", "His tribe", "His wealth"]
    ]
  },
  "16-25": {
    meaning: [
      "Allah swears by the twilight glow, the night and all it gathers, and the moon when it is full.",
      "You will surely pass from stage to stage.",
      "Why do they not believe, and when the Quran is recited to them, they do not prostrate?"
    ],
    takeaway: "Life moves on, step by step: let each step bring you closer to Allah.",
    q: [
      ["Ayah 19: from what to what will we surely pass?", "Stage to stage", "Rich to poor only", "Day to day only", "Town to town"],
      ["Ayah 21: what do deniers not do when it is recited?", "Prostrate", "Sleep", "Eat", "Travel"]
    ]
  }
};
