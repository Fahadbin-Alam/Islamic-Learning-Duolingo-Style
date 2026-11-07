import type { PassageDeep } from "./types";

/**
 * Al-Qari'ah (the Striking Calamity) in depth, passage by passage (the same passages as s101.ts). Our own plain
 * summary of Tafsir Ibn Kathir and Tafsir as-Sa'di, as in deep002.ts; anything the scholars differ on is left out.
 */
export const DEEP_101: Record<string, PassageDeep> = {
  "1-5": {
    meaning: [
      "The Striking Calamity! What is the Striking Calamity? And what will make you know what it is?",
      "It is the Day people will be like scattered moths, rushing in every direction,",
      "and the mountains will be like tufts of carded wool."
    ],
    takeaway: "The strongest things we know will fly apart: only Allah lasts.",
    q: [
      ["Ayah 4: what will people be like that Day?", "Scattered moths", "Sleeping lions", "Tall trees", "Still water"],
      ["Ayah 5: what will the mountains be like?", "Tufts of carded wool", "Hard rocks", "Tall towers", "Deep seas"]
    ]
  },
  "6-11": {
    meaning: [
      "Whoever's scales are heavy with good deeds will be in a pleasing life.",
      "Whoever's scales are light, his home will be the Abyss, Al-Hawiyah.",
      "And what will make you know what that is? A blazing Fire."
    ],
    story: "The Prophet ﷺ said two phrases are light on the tongue but heavy on the scale: SubhanAllahi wa bihamdihi, SubhanAllahil-Azim.",
    hadith: { collection: "bukhari", number: 6406, narrator: "Abu Hurairah", text: "Two words are light on the tongue, heavy on the scale and loved by the Most Merciful: SubhanAllahi wa bihamdihi, SubhanAllahil-Azim." },
    takeaway: "Fill your scale every day with small words of dhikr and good deeds.",
    q: [
      ["Ayah 7: what do heavy scales bring?", "A pleasing life", "A hard life", "Nothing", "A long sleep"],
      ["Which words are heavy on the scale, per the Prophet ﷺ?", "SubhanAllahi wa bihamdihi", "Long stories", "Loud songs", "Jokes"]
    ]
  }
};
