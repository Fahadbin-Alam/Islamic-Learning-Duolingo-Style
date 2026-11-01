import type { PassageDeep } from "./types";

/**
 * As-Saff (the Ranks) in depth, passage by passage (the same passages as s061.ts). Our own plain summary of
 * Tafsir Ibn Kathir and Tafsir as-Sa'di, as in deep002.ts; anything the scholars differ on is left out.
 */
export const DEEP_061: Record<string, PassageDeep> = {
  "1-9": {
    meaning: [
      "Believers, why do you say what you do not do? It is hateful to Allah that you say what you do not do.",
      "Allah loves those who stand in ranks for His cause, like a solid, joined wall.",
      "Isa said: I bring good news of a messenger coming after me, whose name is Ahmad."
    ],
    story: "The Prophet ﷺ said: the signs of a hypocrite are three: when he speaks he lies, when he promises he breaks it, and when trusted he betrays.",
    hadith: { collection: "bukhari", number: 33, narrator: "Abu Hurayrah", text: "The signs of a hypocrite are three: whenever he speaks he tells a lie, whenever he promises he breaks his promise, and whenever he is trusted he betrays." },
    takeaway: "Let your actions match your promises.",
    q: [
      ["Ayah 6: who did Isa give good news of?", "A messenger named Ahmad", "A king", "A city", "An angel"],
      ["Ayah 4: what are those in firm ranks like?", "A solid, joined wall", "Scattered leaves", "A broken fence", "Loose sand"]
    ]
  },
  "10-14": {
    meaning: [
      "Shall I show you a trade that saves you? Believe in Allah and His Messenger ﷺ, and strive for Him.",
      "He forgives your sins and gives gardens and fine homes, plus what you love: help and a near victory.",
      "Be Allah's helpers, as Isa's disciples said: we are Allah's helpers."
    ],
    takeaway: "Good deeds are a trade that never loses.",
    q: [
      ["Ayah 11: what is the best trade?", "Believe and strive for Him", "Gold", "Silk", "Land"],
      ["Ayah 14: what did Isa's disciples say?", "We are Allah's helpers", "We are kings", "We are tired", "We are leaving"]
    ]
  }
};
