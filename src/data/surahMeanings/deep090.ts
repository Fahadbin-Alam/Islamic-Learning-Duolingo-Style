import type { PassageDeep } from "./types";

/**
 * Al-Balad (the City) in depth, passage by passage (the same passages as s090.ts). Our own plain summary of
 * Tafsir Ibn Kathir and Tafsir as-Sa'di, as in deep002.ts; anything the scholars differ on is left out.
 */
export const DEEP_090: Record<string, PassageDeep> = {
  "1-10": {
    meaning: [
      "Allah swears by this city, Makkah, where the Prophet ﷺ lived: man was created into toil and struggle.",
      "Does he think no one has power over him? He boasts: I have used up heaps of wealth.",
      "Did We not give him two eyes, a tongue and two lips, and show him the two ways?"
    ],
    takeaway: "You can see and you can speak: use those gifts on the good road.",
    q: [
      ["Ayah 10: how many ways did Allah show man?", "Two ways", "One way", "Five ways", "No way"],
      ["Ayah 8: what did Allah give him to see with?", "Two eyes", "One eye", "A telescope", "A lamp"]
    ]
  },
  "11-20": {
    meaning: [
      "Yet he has not tried the steep pass. And what is the steep pass?",
      "Freeing a slave, or feeding on a day of hunger an orphan relative, or a poor person in the dust.",
      "Then being of those who believe and urge one another to patience and urge one another to mercy."
    ],
    story: "The Prophet ﷺ said: whoever frees a believing slave, Allah will free from the Fire a limb of his for every limb of the one he freed.",
    hadith: { collection: "bukhari", number: 2517, narrator: "Abu Hurairah", text: "Whoever frees a Muslim slave, Allah will save from the Fire every part of his body in return for every part of the slave's body." },
    takeaway: "The hard road is the right road: help the hungry and urge each other to be kind.",
    q: [
      ["Ayah 14: whom should we feed on a day of hunger?", "An orphan relative", "Only ourselves", "The rich", "Only guests"],
      ["Ayah 17: believers urge each other to patience and what?", "Mercy", "Pride", "Anger", "Laziness"]
    ]
  }
};
