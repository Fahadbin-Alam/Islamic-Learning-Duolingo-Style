import type { PassageDeep } from "./types";

/**
 * Al-Kawthar (Abundant Good) in depth, passage by passage (the same passages as s108.ts). Our own plain summary
 * of Tafsir Ibn Kathir and Tafsir as-Sa'di, as in deep002.ts; anything the scholars differ on is left out.
 */
export const DEEP_108: Record<string, PassageDeep> = {
  "1": {
    meaning: [
      "Surely We have given you, O Prophet ﷺ, Al-Kawthar: abundant good.",
      "Part of that good is a river in Paradise that Allah promised him ﷺ."
    ],
    story: "Once the Prophet ﷺ dozed, then lifted his head smiling and recited this surah. He asked: do you know what Al-Kawthar is? A river my Lord promised me.",
    hadith: { collection: "muslim", number: 400, narrator: "Anas ibn Malik", text: "Do you know what al-Kawthar is? ... It is a river which my Lord, Mighty and Majestic, has promised me, with abundant good." },
    takeaway: "Allah's gifts to His Prophet ﷺ are endless: love him and follow him.",
    q: [
      ["Ayah 1: what did Allah give the Prophet ﷺ?", "Al-Kawthar, abundant good", "A palace", "A kingdom", "A sword"],
      ["What did the Prophet ﷺ say Al-Kawthar is?", "A river promised to him", "A mountain", "A city", "A garden wall"]
    ]
  },
  "2": {
    meaning: [
      "So pray to your Lord alone, and sacrifice for Him alone.",
      "Thank Allah for a great gift with worship, not with words alone."
    ],
    takeaway: "Answer every blessing with prayer and giving.",
    q: [
      ["Ayah 2: what two acts thank Allah for Al-Kawthar?", "Pray and sacrifice", "Sleep and rest", "Travel and trade", "Sing and dance"],
      ["Ayah 2: for whom should the prayer be?", "For your Lord alone", "For people to see", "For idols", "For leaders"]
    ]
  },
  "3": {
    meaning: [
      "The one who hates you is the one cut off from all good.",
      "Enemies mocked the Prophet ﷺ when his sons died young; Allah answered them.",
      "His ﷺ name is still mentioned with love all over the world."
    ],
    takeaway: "Those who mock the Prophet ﷺ lose; his honour only grows.",
    q: [
      ["Ayah 3: who is the one cut off from good?", "The one who hates him ﷺ", "The Prophet ﷺ", "His companions", "His family"],
      ["Why did enemies mock the Prophet ﷺ?", "His sons died young", "He was poor", "He was quiet", "He was an orphan"]
    ]
  }
};
