import type { PassageDeep } from "./types";

/**
 * Al-Hijr in depth, passage by passage (the same passages as s015.ts). Our own plain summary of Tafsir Ibn
 * Kathir and Tafsir as-Sa'di, as in deep002.ts; anything the scholars differ on is left out.
 */
export const DEEP_015: Record<string, PassageDeep> = {
  "1-15": {
    meaning: [
      "Allah Himself sent down the Reminder, and He will surely guard it.",
      "So the Quran stays as it came, letter by letter, kept safe for all time.",
      "Even if a gate in the sky opened for them, deniers would say their eyes were tricked."
    ],
    takeaway: "Not one letter of the Quran has changed: Allah promised to guard it.",
    q: [
      ["Ayah 9: who guards the Quran?", "Allah Himself", "Only the scholars", "Kings", "No one"],
      ["Ayah 14: what would deniers say if a sky gate opened?", "Their eyes were tricked", "We believe now", "Let us go in", "Nothing at all"]
    ]
  },
  "16-25": {
    meaning: [
      "Allah set great star groups in the sky and made them beautiful to look at.",
      "He spread out the earth, fixed mountains in it, and grew everything in measure.",
      "The treasures of all things are with Him; He sends them down in known amounts."
    ],
    takeaway: "Everything you have comes from Allah's treasures, in just the right amount.",
    q: [
      ["Ayah 16: what did Allah make beautiful in the sky?", "The star groups", "The clouds only", "The birds", "The rain"],
      ["Ayah 21: how does Allah send down from His treasures?", "In known amounts", "All at once", "By chance", "Never"]
    ]
  },
  "26-44": {
    meaning: [
      "Allah made the human from dry ringing clay, and the jinn before from smokeless fire.",
      "All the angels bowed to Adam except Iblis, who refused out of pride.",
      "Iblis vowed to mislead people, but Allah said: over My true servants you have no power."
    ],
    takeaway: "Shaytan has no power over sincere servants of Allah: stay sincere.",
    q: [
      ["Ayah 27: what were the jinn made from?", "Smokeless fire", "Clay", "Light", "Water"],
      ["Ayah 42: over whom has Iblis no power?", "Allah's true servants", "No one", "Only kings", "Only animals"]
    ]
  },
  "45-60": {
    meaning: [
      "Tell My servants: I am the Forgiving, the Merciful, and My punishment is painful.",
      "Guests came to Ibrahim with good news of a wise son, though he was old.",
      "Ibrahim said: who despairs of his Lord's mercy except those who are lost?"
    ],
    takeaway: "Hope and fear together: Allah forgives, and His punishment is real.",
    q: [
      ["Ayah 53: what good news did the guests bring Ibrahim?", "A wise son", "Gold", "A new house", "Rain"],
      ["Ayah 56: who despairs of Allah's mercy?", "Only those who are lost", "The believers", "The prophets", "The angels"]
    ]
  },
  "61-79": {
    meaning: [
      "The angels told Lut: leave by night with your family, and let none of you look back.",
      "His people did not listen to his warnings, and the punishment came at sunrise.",
      "In this are signs for those who look closely and think."
    ],
    takeaway: "Listen to good advice before it is too late.",
    q: [
      ["Ayah 65: when was Lut told to leave?", "By night", "At noon", "After a year", "Never"],
      ["Ayah 65: what must Lut's family not do while leaving?", "Look back", "Pray", "Walk", "Talk"]
    ]
  },
  "80-99": {
    meaning: [
      "The people of al-Hijr carved safe homes in the mountains, yet denied their messengers.",
      "Allah gave the Prophet ﷺ the seven oft-repeated verses and the great Quran.",
      "Worship your Lord until the certain end, death, comes to you."
    ],
    story: "The Prophet ﷺ told a Companion that Al-Fatihah is the seven oft-repeated verses and the great Quran he was given.",
    hadith: { collection: "bukhari", number: 4474, narrator: "Abu Sa'id ibn al-Mu'alla", text: "The Prophet ﷺ said: 'All praise is for Allah, Lord of the worlds' is the seven oft-repeated verses and the great Quran given to me." },
    takeaway: "Recite the Quran's opening surah with care in every prayer: it is a great gift.",
    q: [
      ["What are the 'seven oft-repeated' verses?", "Al-Fatihah", "Al-Ikhlas", "Ayat al-Kursi", "Al-Mulk"],
      ["Ayah 99: until when should we worship our Lord?", "Until death comes", "Until we are rich", "Until Ramadan ends", "Until age forty"]
    ]
  }
};
