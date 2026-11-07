import type { PassageDeep } from "./types";

/**
 * Al-Buruj (the Great Stars) in depth, passage by passage (the same passages as s085.ts). Our own plain summary
 * of Tafsir Ibn Kathir and Tafsir as-Sa'di, as in deep002.ts; anything the scholars differ on is left out, and
 * the people of the trench are told gently, without the harsh details.
 */
export const DEEP_085: Record<string, PassageDeep> = {
  "1-11": {
    meaning: [
      "By the sky with its great stars, by the promised Day, and by the witness and what is witnessed.",
      "Ruined were the people of the trench, who harmed the believers while they sat and watched.",
      "They hated them for nothing except that they believed in Allah, the Mighty, the Praiseworthy."
    ],
    story: "The Prophet ﷺ told of a young believer who stayed firm before a cruel king, until a whole crowd said: we believe in the Lord of the boy.",
    hadith: { collection: "muslim", number: 3005, narrator: "Suhaib", text: "The people said: we believe in the Lord of the boy... and the king's worst fear came true: the people believed." },
    takeaway: "Faith that stays firm can wake up a whole nation.",
    q: [
      ["Ayah 8: why did the people of the trench hate the believers?", "They believed in Allah", "They stole", "They lied", "They started a fight"],
      ["In the story of the boy and the king, what did the crowd say?", "We believe in the Lord of the boy", "We follow the king", "We are afraid", "We will go home"]
    ]
  },
  "12-22": {
    meaning: [
      "The grip of your Lord is severe; He begins creation and repeats it.",
      "He is the Forgiving, the Loving, the Owner of the glorious Throne, doing whatever He wills.",
      "No: it is a glorious Quran, in a Preserved Tablet."
    ],
    takeaway: "Al-Wadud loves those who turn to Him: turn to Him often.",
    q: [
      ["Ayah 14: which two names of Allah come together?", "The Forgiving, the Loving", "The First, the Last", "The King, the Holy", "The Rich, the Strong"],
      ["Ayah 22: where is the Quran kept?", "In a Preserved Tablet", "In a cave", "In a palace", "Under the sea"]
    ]
  }
};
