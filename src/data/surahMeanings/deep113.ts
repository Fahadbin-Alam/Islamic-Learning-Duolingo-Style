import type { PassageDeep } from "./types";

/**
 * Al-Falaq (the Daybreak) in depth, passage by passage (the same passages as s113.ts). Our own plain summary of
 * Tafsir Ibn Kathir and Tafsir as-Sa'di, as in deep002.ts; anything the scholars differ on is left out.
 */
export const DEEP_113: Record<string, PassageDeep> = {
  "1-2": {
    meaning: [
      "Say: I seek refuge with the Lord of the daybreak,",
      "from the evil of everything He has created."
    ],
    story: "The Prophet ﷺ told Uqbah: have you not seen the ayahs sent down tonight? Nothing like them has ever been seen: Al-Falaq and An-Nas.",
    hadith: { collection: "muslim", number: 814, narrator: "Uqbah ibn Amir", text: "Have you not seen the verses revealed tonight, the like of which has never been seen? Say: I seek refuge with the Lord of the daybreak, and Say: I seek refuge with the Lord of mankind." },
    takeaway: "The One who splits the night with dawn can lift any darkness from you.",
    q: [
      ["Ayah 1: whose protection do we seek in Al-Falaq?", "The Lord of the daybreak", "Our friends", "Our tribe", "Our money"],
      ["Ayah 2: from the evil of what do we seek refuge?", "Everything He created", "Only snakes", "Only storms", "Nothing"]
    ]
  },
  "3-5": {
    meaning: [
      "And from the evil of darkness when it settles over everything,",
      "and from the evil of those who blow on knots in sorcery,",
      "and from the evil of an envier when he envies."
    ],
    takeaway: "Say Al-Falaq morning and night: Allah's protection beats every hidden harm.",
    q: [
      ["Ayah 5: which person's evil is named last?", "An envier when he envies", "A hungry man", "A sleeping child", "A traveller"],
      ["Ayah 4: what do the sorcerers blow on?", "Knots", "Fires", "Candles", "Flutes"]
    ]
  }
};
