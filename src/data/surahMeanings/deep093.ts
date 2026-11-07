import type { PassageDeep } from "./types";

/**
 * Ad-Duha (the Morning Light) in depth, passage by passage (the same passages as s093.ts). Our own plain summary
 * of Tafsir Ibn Kathir and Tafsir as-Sa'di, as in deep002.ts; anything the scholars differ on is left out.
 */
export const DEEP_093: Record<string, PassageDeep> = {
  "1-5": {
    meaning: [
      "By the morning light, and by the night when it grows still and dark.",
      "Your Lord has not abandoned you, nor is He displeased with you.",
      "What comes later is better for you than what came first, and your Lord will give you until you are pleased."
    ],
    story: "Revelation paused for a few nights, and a mocker said his Lord had left him. Then Allah sent this surah: your Lord has not abandoned you.",
    hadith: { collection: "bukhari", number: 4950, narrator: "Jundub ibn Sufyan", text: "The Prophet ﷺ became ill and did not get up for a night or two. A woman came and said: O Muhammad, I think your devil has left you. So Allah revealed: by the forenoon... your Lord has not forsaken you." },
    takeaway: "When life goes quiet and dark, remember: Allah has not left you.",
    q: [
      ["Ayah 3: what has your Lord not done?", "Abandoned you", "Fed you", "Made the night", "Made the morning"],
      ["Ayah 5: until when will your Lord keep giving?", "Until you are pleased", "Until Friday", "Until you are old", "Only once"]
    ]
  },
  "6-11": {
    meaning: [
      "Did He not find you an orphan and shelter you, and find you unaware and guide you?",
      "Did He not find you in need and make you rich? So do not be harsh with the orphan.",
      "Do not drive away the one who asks, and speak of the blessings of your Lord."
    ],
    takeaway: "Remember where Allah brought you from, and be kind to those still there.",
    q: [
      ["Ayah 9: how should we treat the orphan?", "Never be harsh", "Ignore them", "Shout at them", "Take their things"],
      ["Ayah 11: what should we speak about?", "The blessings of your Lord", "Our own greatness", "Others' faults", "Nothing at all"]
    ]
  }
};
