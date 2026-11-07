import type { PassageDeep } from "./types";

/**
 * At-Tin (the Fig) in depth, passage by passage (the same passages as s095.ts). Our own plain summary of Tafsir
 * Ibn Kathir and Tafsir as-Sa'di, as in deep002.ts; anything the scholars differ on is left out.
 */
export const DEEP_095: Record<string, PassageDeep> = {
  "1-4": {
    meaning: [
      "By the fig and the olive, by Mount Sinai, and by this safe city, Makkah.",
      "We created the human being in the finest shape and stature.",
      "Upright, with a mind to think and hands to work: an honour from Allah."
    ],
    story: "Al-Bara said the Prophet ﷺ recited At-Tin in the night prayer on a journey, and he never heard anyone with a more beautiful voice or recitation.",
    hadith: { collection: "bukhari", number: 769, narrator: "Al-Bara ibn Azib", text: "I heard the Prophet ﷺ reciting Wat-tini waz-zaytun in the Isha prayer, and I have never heard anyone with a better voice or recitation than him." },
    takeaway: "You were made in the best shape: honour that gift with good deeds.",
    q: [
      ["Ayah 4: in what shape did Allah create the human?", "The finest shape", "A weak shape", "A small shape", "An angel's shape"],
      ["Ayah 3: which city is called safe?", "Makkah", "Madinah", "Cairo", "Damascus"]
    ]
  },
  "5-8": {
    meaning: [
      "Then We return him to the lowest of the low.",
      "Except those who believe and do good: theirs is a reward that never ends.",
      "So what makes you deny the Judgement after this? Is Allah not the wisest of judges?"
    ],
    takeaway: "Without faith and good deeds man sinks; with them his reward never ends.",
    q: [
      ["Ayah 8: who is the wisest of judges?", "Allah", "Kings", "Scholars", "Parents"],
      ["Ayah 6: what kind of reward do believers who do good get?", "A reward that never ends", "A short reward", "No reward", "Only praise"]
    ]
  }
};
