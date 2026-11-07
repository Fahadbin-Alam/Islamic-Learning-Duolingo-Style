import type { PassageDeep } from "./types";

/**
 * An-Nas (Mankind) in depth, passage by passage (the same passages as s114.ts). Our own plain summary of Tafsir
 * Ibn Kathir and Tafsir as-Sa'di, as in deep002.ts; anything the scholars differ on is left out.
 */
export const DEEP_114: Record<string, PassageDeep> = {
  "1-3": {
    meaning: [
      "Say: I seek refuge with the Lord of mankind,",
      "the King of mankind,",
      "the God of mankind: the one Allah who cares for us, rules us, and alone deserves worship."
    ],
    story: "Every night in bed, the Prophet ﷺ cupped his hands, recited Al-Ikhlas, Al-Falaq and An-Nas, blew into them, and wiped over his body three times.",
    hadith: { collection: "bukhari", number: 5017, narrator: "Aishah", text: "Every night when he went to bed, the Prophet ﷺ would cup his hands, blow into them and recite Qul huwa Allahu ahad, Qul a'udhu bi rabbil-falaq and Qul a'udhu bi rabbin-nas, then wipe over his body, three times." },
    takeaway: "End each day like the Prophet ﷺ: the last three surahs before sleep.",
    q: [
      ["Ayah 1-3: which three titles of Allah are named?", "Lord, King and God of mankind", "Lord of the sea", "King of the sky", "God of the sun"],
      ["How many times did he ﷺ wipe over himself at night?", "Three times", "Once", "Ten times", "Seven times"]
    ]
  },
  "4-5": {
    meaning: [
      "From the evil of the sneaky whisperer, who pulls back when Allah is remembered,",
      "the one who whispers evil thoughts into the hearts of people."
    ],
    takeaway: "Bad thoughts popping up? Remember Allah, and the whisperer slinks away.",
    q: [
      ["Ayah 4: what does the whisperer do when Allah is remembered?", "Pulls back", "Gets stronger", "Shouts", "Stays the same"],
      ["Ayah 5: where does he whisper?", "Into the hearts of people", "Into the sea", "Into the trees", "Into the sky"]
    ]
  },
  "6": {
    meaning: [
      "Whether that whisperer is from the jinn or from mankind.",
      "Some people also whisper bad ideas, so choose your friends with care.",
      "The Quran ends by teaching us to run to Allah for safety."
    ],
    takeaway: "Ask Allah to guard you from bad whispers, unseen or seen.",
    q: [
      ["Ayah 6: whom can whisperers come from?", "The jinn and mankind", "Only animals", "Only angels", "Only plants"],
      ["What does the very last surah teach us to do?", "Run to Allah for safety", "Fear everyone", "Stay alone", "Trust no one"]
    ]
  }
};
