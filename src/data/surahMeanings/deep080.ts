import type { PassageDeep } from "./types";

/**
 * Abasa (He Frowned) in depth, passage by passage (the same passages as s080.ts). Our own plain summary of
 * Tafsir Ibn Kathir and Tafsir as-Sa'di, as in deep002.ts; anything the scholars differ on is left out.
 */
export const DEEP_080: Record<string, PassageDeep> = {
  "1-16": {
    meaning: [
      "He frowned and turned away because the blind man came to him: Abdullah ibn Umm Maktum, the scholars say.",
      "How do you know? He might grow in purity, or take the reminder and be helped by it.",
      "This Quran is a reminder, on honoured pages, raised and pure, in the hands of noble, faithful scribes."
    ],
    story: "The Prophet ﷺ said: one skilled in the Quran is with the noble, faithful scribes; one who stumbles through it with effort gets a double reward.",
    hadith: { collection: "bukhari", number: 4937, narrator: "Aishah", text: "The one who recites the Quran and is skilled in it is with the noble, righteous scribes, and the one who recites it with difficulty, struggling, has two rewards." },
    takeaway: "Every seeker matters to Allah, rich or poor, strong or weak.",
    q: [
      ["Ayah 2: who came, making the Prophet ﷺ frown?", "The blind man", "A rich chief", "A poet", "A trader"],
      ["Who struggles to recite yet gets a double reward?", "One who stumbles through it", "Only the fastest", "Only the loudest", "No one"]
    ]
  },
  "17-32": {
    meaning: [
      "From what did He create man? From a drop; He shaped him, eased his path, then caused him to die.",
      "Let man look at his food: We pour down water, split the earth, and grow grain, grapes and greens.",
      "Olives, date palms, thick gardens, fruit and grass: provision for you and your livestock."
    ],
    takeaway: "Before you eat, think of the rain and soil Allah used to bring it to you.",
    q: [
      ["Ayah 24: what should man look at and think about?", "His food", "His shoes", "His money", "His phone"],
      ["Ayah 29: which two trees does Allah name?", "Olives and date palms", "Oaks and pines", "Apples and figs", "Cedars and willows"]
    ]
  },
  "33-42": {
    meaning: [
      "When the Deafening Blast comes, a person will run from his brother, his mother and father, wife and children.",
      "Each of them that Day will have enough worry of his own.",
      "Some faces that Day will be bright, laughing, joyful; others dusty and dark: the deniers."
    ],
    takeaway: "Even family cannot carry you then: carry good deeds yourself.",
    q: [
      ["Ayah 34: whom will a person flee from, that Day?", "His brother", "Only enemies", "Only strangers", "No one"],
      ["Ayah 39: how will some faces be that Day?", "Laughing and joyful", "Silent and still", "Hidden away", "Painted gold"]
    ]
  }
};
