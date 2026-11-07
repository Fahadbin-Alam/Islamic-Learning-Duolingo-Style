import type { PassageDeep } from "./types";

/**
 * Al-Ikhlas (Sincerity) in depth, passage by passage (the same passages as s112.ts). Our own plain summary of
 * Tafsir Ibn Kathir and Tafsir as-Sa'di, as in deep002.ts; anything the scholars differ on is left out.
 */
export const DEEP_112: Record<string, PassageDeep> = {
  "1-2": {
    meaning: [
      "Say: He is Allah, One and only, with no partner.",
      "Allah, as-Samad: the Master whom every creature turns to in need, while He needs no one."
    ],
    story: "The Prophet ﷺ asked: can any of you recite a third of the Quran in one night? They found it hard. He said: Qul huwa Allahu ahad is a third of the Quran.",
    hadith: { collection: "bukhari", number: 5015, narrator: "Abu Sa'id al-Khudri", text: "Can any of you recite a third of the Quran in one night? ... Allah, the One, the Self-Sufficient, is a third of the Quran." },
    takeaway: "Turn to Allah first for every need: He alone never runs out.",
    q: [
      ["Ayah 2: what does as-Samad mean?", "The One every creature needs", "The Strong", "The Seeing", "The Giver"],
      ["Al-Ikhlas equals what part of the Quran?", "A third", "A half", "A tenth", "All of it"]
    ]
  },
  "3-4": {
    meaning: [
      "He has no child, and He was not born of anyone.",
      "And there is none comparable to Him, nothing like Him at all."
    ],
    story: "A Companion leading prayer always ended his recitation with this surah because he loved it. The Prophet ﷺ said: tell him that Allah loves him.",
    hadith: { collection: "bukhari", number: 7375, narrator: "Aishah", text: "He loved Al-Ikhlas because it describes ar-Rahman; the Prophet ﷺ said: tell him that Allah loves him." },
    takeaway: "Treasure this surah: it tells you who your Lord truly is.",
    q: [
      ["Ayah 4: who is comparable to Allah?", "None at all", "The angels", "The prophets", "The kings"],
      ["What did the Prophet ﷺ say of the man who loved it?", "Allah loves him", "He must stop", "Read another", "Pray alone"]
    ]
  }
};
