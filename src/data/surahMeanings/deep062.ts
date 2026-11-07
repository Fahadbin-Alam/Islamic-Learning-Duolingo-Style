import type { PassageDeep } from "./types";

/**
 * Al-Jumu'ah (Friday) in depth, passage by passage (the same passages as s062.ts). Our own plain summary of
 * Tafsir Ibn Kathir and Tafsir as-Sa'di, as in deep002.ts; anything the scholars differ on is left out.
 */
export const DEEP_062: Record<string, PassageDeep> = {
  "1-8": {
    meaning: [
      "All in the heavens and earth glorify Allah, the King, the Most Pure, the Mighty, the Wise.",
      "He sent among the unlettered a messenger of their own, who recites, purifies and teaches them.",
      "Say: the death you run from will surely meet you, then you return to the Knower of the unseen."
    ],
    story: "When ayah 3 came, the Prophet ﷺ put his hand on Salman the Persian and said: even if faith were up at the Pleiades, men from his people would reach it.",
    hadith: { collection: "bukhari", number: 4897, narrator: "Abu Hurairah", text: "Surah Al-Jumu'ah was revealed... Allah's Messenger ﷺ put his hand on Salman and said: if faith were at the Pleiades, some men from these people would reach it." },
    takeaway: "Let the Quran clean your heart, as it cleaned the first Muslims.",
    q: [
      ["Ayah 2: what does the Messenger ﷺ do?", "Recites, purifies and teaches", "Rules a kingdom", "Trades", "Writes poetry"],
      ["Ayah 8: what will surely meet you?", "The death you run from", "A long rest", "A new kingdom", "A big reward only"]
    ]
  },
  "9-11": {
    meaning: [
      "Believers, when the call is made for Friday prayer, hurry to remember Allah and leave trade.",
      "When the prayer is over, spread through the land, seek Allah's bounty, and remember Allah often.",
      "Some left the Prophet ﷺ standing to go to a caravan; what is with Allah is better than fun and business."
    ],
    story: "One Friday a trade caravan arrived and most people rushed out, leaving only twelve men with the Prophet ﷺ. Then ayah 11 came down.",
    hadith: { collection: "bukhari", number: 936, narrator: "Jabir ibn Abdullah", text: "While we were praying with the Prophet ﷺ, a caravan carrying food arrived and the people went to it, until only twelve men remained with the Prophet ﷺ. Then this ayah was revealed (62:11)." },
    takeaway: "On Friday, put the masjid before the market.",
    q: [
      ["Ayah 9: what should we leave at Friday's call?", "Trade", "The mosque", "Prayer", "Remembrance"],
      ["Ayah 10: what may we do after the prayer?", "Seek Allah's bounty", "Sleep all day", "Skip remembering", "Argue loudly"]
    ]
  }
};
