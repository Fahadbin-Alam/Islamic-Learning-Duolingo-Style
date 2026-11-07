import type { PassageDeep } from "./types";

/**
 * Al-Muzzammil (the Wrapped One) in depth, passage by passage (the same passages as s073.ts). Our own plain
 * summary of Tafsir Ibn Kathir and Tafsir as-Sa'di, as in deep002.ts; anything the scholars differ on is left out.
 */
export const DEEP_073: Record<string, PassageDeep> = {
  "1-9": {
    meaning: [
      "O you wrapped in your garment, stand in prayer at night, except a little: half of it, or a little less or more.",
      "And recite the Quran in measured, careful recitation.",
      "We will send down to you a weighty word; rising at night is strongest for the heart and clearest for speech."
    ],
    story: "The Prophet ﷺ said the best fasting after Ramadan is in Muharram, and the best prayer after the obligatory prayers is the prayer at night.",
    hadith: { collection: "muslim", number: 1163, narrator: "Abu Hurairah", text: "The best fast after Ramadan is in Allah's month of Muharram, and the best prayer after the obligatory prayer is the prayer at night." },
    takeaway: "Even two quiet rakahs at night build a strong heart.",
    q: [
      ["Ayah 4: how should the Quran be recited?", "In measured, careful recitation", "As fast as you can", "Only in your head", "Shouting loudly"],
      ["Best prayer after the obligatory ones, said the Prophet ﷺ?", "The prayer at night", "The Eid prayer", "The rain prayer", "The noon prayer"]
    ]
  },
  "10-19": {
    meaning: [
      "Be patient with what they say, and leave them in a gracious way.",
      "We sent to Pharaoh a messenger; he disobeyed the messenger, so We seized him firmly.",
      "How will you guard yourselves, if you deny, from a Day that turns children grey-haired?"
    ],
    takeaway: "Walk away from mockers kindly, and leave their reckoning to Allah.",
    q: [
      ["Ayah 10: how should we leave those who mock?", "In a gracious way", "With harsh words", "With a fight", "Never leave"],
      ["Ayah 17: that Day turns children how?", "Grey-haired", "Taller", "Stronger", "Into kings"]
    ]
  },
  "20": {
    meaning: [
      "Your Lord knows you stand at night, sometimes two-thirds, half or a third; He has made it light for you.",
      "Some of you are ill, some travel seeking Allah's bounty, some strive in His cause: so recite what is easy.",
      "Keep up prayer, give zakah, lend Allah a goodly loan, and ask His forgiveness: He is Forgiving, Merciful."
    ],
    takeaway: "Allah knows your limits: do what you can, and keep doing it.",
    q: [
      ["Ayah 20: how much of the Quran should we recite at night?", "What is easy", "All of it", "None of it", "One letter"],
      ["Ayah 20: what loan should we lend to Allah?", "A goodly loan", "A loan with interest", "A secret debt", "No loan"]
    ]
  }
};
