import type { PassageDeep } from "./types";

/**
 * Al-Kafirun (the Disbelievers) in depth, passage by passage (the same passages as s109.ts). Our own plain
 * summary of Tafsir Ibn Kathir and Tafsir as-Sa'di, as in deep002.ts; anything the scholars differ on is left out.
 */
export const DEEP_109: Record<string, PassageDeep> = {
  "1-5": {
    meaning: [
      "Say: O disbelievers, I do not worship what you worship,",
      "nor do you worship what I worship.",
      "I will never worship what you worship, nor will you worship what I worship."
    ],
    takeaway: "Be kind to everyone, but do not trade away worshipping Allah alone.",
    q: [
      ["Ayah 2: what does the Prophet ﷺ say he does not do?", "Worship what they worship", "Pray to Allah", "Speak the truth", "Help the poor"],
      ["Ayah 4: will he ﷺ ever worship what they worship?", "Never", "Once a year", "Sometimes", "If they pay him"]
    ]
  },
  "6": {
    meaning: [
      "For you is your religion, and for me is mine.",
      "Islam does not force anyone, and it never mixes worship of Allah with idols.",
      "The Prophet ﷺ often recited this surah with Al-Ikhlas in the sunnah of Fajr."
    ],
    hadith: { collection: "muslim", number: 726, narrator: "Abu Hurairah", text: "The Messenger of Allah ﷺ recited in the two rak'ahs of Fajr: Say, O disbelievers, and Say, He is Allah, One." },
    takeaway: "Clear and calm: no forcing, and no mixing in worship.",
    q: [
      ["Ayah 6: how does Al-Kafirun end?", "For you your religion, for me mine", "Let us worship together", "Everyone is right", "Do as you like"],
      ["With which surah did he ﷺ recite it in Fajr sunnah?", "Al-Ikhlas", "Al-Baqarah", "Yasin", "Al-Kahf"]
    ]
  }
};
