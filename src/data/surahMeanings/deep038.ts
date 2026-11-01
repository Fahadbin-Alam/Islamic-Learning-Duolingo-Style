import type { PassageDeep } from "./types";

/**
 * Sad in depth, passage by passage (the same passages as s038.ts). Our own plain summary of Tafsir Ibn Kathir
 * and Tafsir as-Sa'di, as in deep002.ts; anything the scholars differ on (the details behind the two disputants,
 * the horses, and the body on the throne) is left out.
 */
export const DEEP_038: Record<string, PassageDeep> = {
  "1-14": {
    meaning: [
      "By the Quran full of reminder: the deniers are in pride and opposition.",
      "They wondered that a warner came from among them, and said: a magician, a liar!",
      "Has he made all the gods into One God? That is truly a strange thing."
    ],
    takeaway: "Truth can feel strange to proud hearts: stay humble and listen.",
    q: [
      ["Ayah 5: what did the deniers find strange?", "Making the gods into One God", "Rain", "Trade", "Travel"],
      ["Ayah 1: how is the Quran described?", "Full of reminder", "Full of songs", "A short letter", "A law book"]
    ]
  },
  "15-26": {
    meaning: [
      "Remember Our servant Dawud, a man of strength who always turned back to Allah.",
      "We made the mountains glorify with him evening and morning, and the birds gathered.",
      "Dawud, We made you a successor on earth, so judge between people with truth."
    ],
    takeaway: "Strength is best used to worship Allah and to judge fairly.",
    q: [
      ["Ayah 18: what glorified Allah with Dawud?", "The mountains", "The rivers", "The stars", "The sea"],
      ["Ayah 26: how was Dawud told to judge?", "With truth", "With anger", "By guessing", "For money"]
    ]
  },
  "27-40": {
    meaning: [
      "We did not create the heaven and earth and all between them without purpose.",
      "A blessed Book We sent down to you, so they reflect on its ayat and people of understanding take heed.",
      "Sulayman prayed for a kingdom like no one after him; the wind ran gently by his command."
    ],
    takeaway: "Do not just read the Quran: stop and think about what it means.",
    q: [
      ["Ayah 29: why was the blessed Book sent down?", "So they reflect on its ayat", "To decorate homes", "For kings only", "To sing"],
      ["Ayah 36: what ran gently by Sulayman's command?", "The wind", "The rivers", "The horses", "The clouds"]
    ]
  },
  "41-64": {
    meaning: [
      "Ayyub called his Lord: Shaytan has touched me with hardship and pain.",
      "Strike the ground with your foot: here is cool water to wash and drink.",
      "Allah gave him back his family and more; We found him patient: what an excellent servant!"
    ],
    takeaway: "Patience in illness is loved by Allah: He heals and gives back more.",
    q: [
      ["Ayah 42: what did Ayyub strike the ground with?", "His foot", "His staff", "A stone", "His hand"],
      ["Ayah 44: what did Allah call Ayyub?", "An excellent servant", "A king", "A traveller", "A poet"]
    ]
  },
  "65-88": {
    meaning: [
      "Allah told the angels: I am creating a human from clay; when I shape him, bow down to him.",
      "All the angels bowed, except Iblis: he was proud and said: I am better, You made me from fire.",
      "Iblis vowed to mislead them all, except Allah's sincere servants."
    ],
    takeaway: "Pride turned Iblis bad: never think you are better than others.",
    q: [
      ["Ayah 76: why did Iblis say he was better?", "He was made from fire", "He was older", "He was taller", "He was richer"],
      ["Ayah 83: whom can Iblis not mislead?", "Allah's sincere servants", "Anyone", "The rich", "The strong"]
    ]
  }
};
