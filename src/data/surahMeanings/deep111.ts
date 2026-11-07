import type { PassageDeep } from "./types";

/**
 * Al-Masad (the Palm Fibre) in depth, passage by passage (the same passages as s111.ts). Our own plain summary
 * of Tafsir Ibn Kathir and Tafsir as-Sa'di, as in deep002.ts; anything the scholars differ on is left out.
 */
export const DEEP_111: Record<string, PassageDeep> = {
  "1-3": {
    meaning: [
      "May the hands of Abu Lahab perish, and he has perished.",
      "His wealth and all he earned did not help him at all.",
      "He will burn in a Fire of blazing flames."
    ],
    story: "The Prophet ﷺ climbed Mount Safa and called Quraysh to warn them. His own uncle shouted: may you perish! Is this why you gathered us? Then this surah came.",
    hadith: { collection: "bukhari", number: 4770, narrator: "Ibn Abbas", text: "Abu Lahab said: may you perish all day! Is this why you gathered us? Then Allah revealed: may the hands of Abu Lahab perish, and he has perished." },
    takeaway: "Family ties cannot save a person who fights the truth: faith is what counts.",
    q: [
      ["Ayah 1: who is said to have perished?", "Abu Lahab", "Abu Jahl", "Abu Bakr", "Abu Talib"],
      ["Where did the Prophet ﷺ stand to warn Quraysh?", "Mount Safa", "Mount Uhud", "The cave of Hira", "Mount Sinai"]
    ]
  },
  "4-5": {
    meaning: [
      "And his wife too, the carrier of firewood, who spread harm against the Prophet ﷺ;",
      "around her neck is a rope of twisted palm fibre."
    ],
    takeaway: "Using your effort to hurt good people only leads to loss.",
    q: [
      ["Ayah 5: what is on the neck of Abu Lahab's wife?", "A rope of palm fibre", "A gold chain", "A flower necklace", "Nothing"],
      ["Ayah 4: what is his wife called?", "The carrier of firewood", "The queen", "The helper", "The singer"]
    ]
  }
};
