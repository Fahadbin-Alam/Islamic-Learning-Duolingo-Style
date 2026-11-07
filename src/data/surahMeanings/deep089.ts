import type { PassageDeep } from "./types";

/**
 * Al-Fajr (the Dawn) in depth, passage by passage (the same passages as s089.ts). Our own plain summary of
 * Tafsir Ibn Kathir and Tafsir as-Sa'di, as in deep002.ts; anything the scholars differ on is left out,
 * including which ten nights are meant.
 */
export const DEEP_089: Record<string, PassageDeep> = {
  "1-14": {
    meaning: [
      "By the dawn, and ten nights, by the even and the odd, and by the night as it passes.",
      "Have you not seen what your Lord did with Ad, the people of Iram with lofty pillars?",
      "And Thamud, who carved rocks in the valley, and Pharaoh: all spread corruption, and your Lord punished them."
    ],
    takeaway: "Tall buildings and great power did not save them: only obeying Allah lasts.",
    q: [
      ["Ayah 9: who carved homes out of rocks in the valley?", "Thamud", "Ad", "Quraysh", "Pharaoh's people"],
      ["Ayah 7: Iram was known for its lofty what?", "Pillars", "Rivers", "Gardens", "Ships"]
    ]
  },
  "15-20": {
    meaning: [
      "When Allah tests man with honour and blessing, he says: my Lord has honoured me.",
      "When He tests him by limiting his provision, he says: my Lord has humiliated me. No!",
      "Rather, you do not honour the orphan, nor urge feeding the poor, and you love wealth with a great love."
    ],
    story: "The Prophet ﷺ said: I and the one who looks after an orphan will be in Paradise like this, and he held his two fingers close together.",
    hadith: { collection: "bukhari", number: 5304, narrator: "Sahl bin Sa'd", text: "I and the one who looks after an orphan will be in Paradise like this, and he pointed with his index and middle fingers, with a little space between them." },
    takeaway: "Riches and hardship are both tests: pass them by caring for those in need.",
    q: [
      ["Ayah 17: whom do people fail to honour?", "The orphan", "The king", "The guest only", "The trader"],
      ["Who will be close to the Prophet ﷺ in Paradise, he said?", "One who looks after an orphan", "The richest person", "The fastest runner", "The loudest speaker"]
    ]
  },
  "21-30": {
    meaning: [
      "When the earth is pounded flat, and your Lord comes with the angels, row upon row.",
      "That Day man will remember, but what use then? He will say: if only I had sent ahead for my life.",
      "O soul at peace, return to your Lord, well pleased and pleasing; enter among My servants and My Paradise."
    ],
    takeaway: "Work now for a calm heart, so you hear that gentle call at the end.",
    q: [
      ["Ayah 24: what will man wish he had done?", "Sent ahead for his life", "Slept more", "Bought more", "Travelled more"],
      ["Ayah 28: what is the soul at peace told?", "Return to your Lord", "Stay on earth", "Wait forever", "Go back to sleep"]
    ]
  }
};
