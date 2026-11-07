import type { PassageDeep } from "./types";

/**
 * An-Najm (the Star) in depth, passage by passage (the same passages as s053.ts). Our own plain summary of
 * Tafsir Ibn Kathir and Tafsir as-Sa'di, as in deep002.ts; anything the scholars differ on is left out (such as
 * weak reports about what happened during the recitation of ayahs 19-20).
 */
export const DEEP_053: Record<string, PassageDeep> = {
  "1-18": {
    meaning: [
      "By the star when it sets: your companion has not gone astray, nor does he speak from his own desire.",
      "It is only revelation sent to him, taught by one mighty in strength: Jibril.",
      "He saw Jibril again at the Lote Tree of the farthest boundary, near the Garden of Refuge."
    ],
    story: "Ibn Mas'ud explained these ayahs: the Prophet ﷺ saw Jibril in his real form, with six hundred wings.",
    hadith: { collection: "bukhari", number: 4857, narrator: "Abdullah ibn Mas'ud", text: "He saw Jibril having six hundred wings." },
    takeaway: "Trust the Sunnah: the Prophet ﷺ taught only what his Lord sent.",
    q: [
      ["Ayah 4: where does the Prophet's ﷺ message come from?", "Revelation sent to him", "His desire", "Poets", "Dreams only"],
      ["Ayah 14: where did the Prophet ﷺ see Jibril again?", "At the Lote Tree", "In the market", "On a ship", "In a cave"]
    ]
  },
  "19-32": {
    meaning: [
      "Have you seen Al-Lat, Al-Uzza and Manat? They are only names you and your fathers made up.",
      "They follow only guesses and what their souls desire, though guidance has come from their Lord.",
      "Those who avoid the major sins and shameful deeds, apart from small slips: your Lord's forgiveness is vast."
    ],
    takeaway: "Do not praise yourself as pure: Allah knows best who is mindful.",
    q: [
      ["Ayah 23: what are Al-Lat and Al-Uzza?", "Only names made up", "Angels", "Prophets", "Cities"],
      ["Ayah 32: how wide is your Lord's forgiveness?", "Vast", "Tiny", "Closed", "For a few only"]
    ]
  },
  "33-62": {
    meaning: [
      "No soul carries another's burden, and a person gets only what he strives for.",
      "His striving will be seen, then he will be repaid in full; and to your Lord is the final end.",
      "It is He who makes laugh and makes weep, and He who gives death and gives life."
    ],
    story: "The Prophet ﷺ prostrated at the end of An-Najm, and the Muslims, the idol worshippers, the jinn and the people all prostrated with him.",
    hadith: { collection: "bukhari", number: 1071, narrator: "Ibn Abbas", text: "The Prophet ﷺ prostrated when he recited An-Najm, and the Muslims, the polytheists, the jinn and the humans prostrated with him." },
    takeaway: "Work hard for good: every effort is seen and paid in full.",
    q: [
      ["Ayah 39: what does a person get?", "What he strives for", "Nothing", "Others' deeds", "Whatever he wishes"],
      ["Ayah 42: where is the final end?", "To your Lord", "To the grave only", "To nowhere", "To the stars"]
    ]
  }
};
