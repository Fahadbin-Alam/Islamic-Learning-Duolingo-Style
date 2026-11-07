import type { PassageDeep } from "./types";

/**
 * Ad-Dukhan (the Smoke) in depth, passage by passage (the same passages as s044.ts). Our own plain summary of
 * Tafsir Ibn Kathir and Tafsir as-Sa'di, as in deep002.ts; anything the scholars differ on is left out (such
 * as what the smoke of ayah 10 refers to).
 */
export const DEEP_044: Record<string, PassageDeep> = {
  "1-29": {
    meaning: [
      "Allah sent the Quran down on a blessed night, to warn people; on it every wise matter is made clear.",
      "Musa came to Pharaoh's people: hand Allah's servants over to me; I am a trustworthy messenger.",
      "Pharaoh's army left gardens, springs and fine homes behind; the sky and the earth did not weep for them."
    ],
    story: "Ibn Kathir explains the blessed night as Laylat al-Qadr. The Prophet ﷺ said: look for it in the odd nights of the last ten nights of Ramadan.",
    hadith: { collection: "bukhari", number: 2017, narrator: "Aisha", text: "Search for the Night of Qadr in the odd nights of the last ten nights of Ramadan." },
    takeaway: "Wealth stays behind when we go: only good deeds come along.",
    q: [
      ["Ayah 3: when did Allah send the Quran down?", "On a blessed night", "At noon", "In winter only", "On a cloudy day"],
      ["Ayah 29: what did not weep for Pharaoh's army?", "The sky and the earth", "The angels", "The fish", "The mountains"]
    ]
  },
  "30-42": {
    meaning: [
      "Allah saved Bani Israil from Pharaoh's cruel treatment, and chose them over others in their time.",
      "Allah did not create the heavens and the earth in play, but with truth.",
      "The Day of Sorting is the meeting time for all; no friend can help a friend then, except by Allah's mercy."
    ],
    takeaway: "Life is not a game: everyone meets their Lord on the Day of Sorting.",
    q: [
      ["Ayah 30: whom did Allah save from Pharaoh?", "Bani Israil", "Quraysh", "The Romans", "The people of Ad"],
      ["Ayah 38: did Allah create the heavens and earth in play?", "No, not in play", "Yes, for fun", "For no reason", "By chance"]
    ]
  },
  "43-59": {
    meaning: [
      "The mindful will be in a safe place, among gardens and springs, dressed in silk, facing one another.",
      "There they will taste no death beyond the first one, and Allah keeps them from the Fire.",
      "Allah made the Quran easy in your language, so that people may remember."
    ],
    takeaway: "Paradise lasts forever: work for a home with no more goodbyes.",
    q: [
      ["Ayah 51: where will the mindful be?", "In a safe place", "In a desert", "In a prison", "In a cave"],
      ["Ayah 58: what did Allah make easy in our language?", "The Quran", "Poetry", "Trade", "Travel"]
    ]
  }
};
