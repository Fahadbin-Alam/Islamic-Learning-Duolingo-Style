import type { PassageDeep } from "./types";

/**
 * Ash-Shams (the Sun) in depth, passage by passage (the same passages as s091.ts). Our own plain summary of
 * Tafsir Ibn Kathir and Tafsir as-Sa'di, as in deep002.ts; anything the scholars differ on is left out.
 */
export const DEEP_091: Record<string, PassageDeep> = {
  "1-10": {
    meaning: [
      "By the sun and its brightness, the moon as it follows, the day as it shows it, and the night as it covers it.",
      "By the soul and the One who shaped it, and inspired it to know its wickedness and its mindfulness.",
      "Successful is the one who purifies it, and lost is the one who buries it in sin."
    ],
    story: "When Mu'adh made a long night prayer, the Prophet ﷺ told him to recite surahs like Al-A'la, Ash-Shams and Al-Layl instead.",
    hadith: { collection: "bukhari", number: 705, narrator: "Jabir ibn Abdullah", text: "Why did you not recite Sabbihisma rabbik, Wash-shamsi wa duhaha, and Wal-layli idha yaghsha? For behind you pray the old, the weak and those with needs." },
    takeaway: "Your soul is like a garden: keep it clean of sin and it will grow.",
    q: [
      ["Ayah 9: who is successful?", "The one who purifies it", "The richest one", "The strongest one", "The one who sleeps most"],
      ["Ayah 8: what did Allah inspire the soul to know?", "Its wickedness and its mindfulness", "Only its name", "Only its age", "Nothing"]
    ]
  },
  "11-15": {
    meaning: [
      "Thamud denied out of arrogance, when the most wretched of them rose up.",
      "The messenger of Allah, Salih, said to them: leave Allah's she-camel and her drink alone.",
      "They called him a liar and harmed her, so their Lord crushed them for their sin, and He fears no outcome."
    ],
    takeaway: "Respect what Allah has made sacred, even an animal: mocking it brings ruin.",
    q: [
      ["Ayah 13: which messenger warned Thamud?", "Salih", "Hud", "Musa", "Lut"],
      ["Ayah 13: what were they told to leave alone?", "Allah's she-camel and her drink", "Their gold", "Their houses", "The sea"]
    ]
  }
};
