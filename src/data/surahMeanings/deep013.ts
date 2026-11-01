import type { PassageDeep } from "./types";

/**
 * Ar-Ra'd in depth, passage by passage (the same passages as s013.ts). Our own plain summary of Tafsir Ibn
 * Kathir and Tafsir as-Sa'di, as in deep002.ts; anything the scholars differ on is left out.
 */
export const DEEP_013: Record<string, PassageDeep> = {
  "1-7": {
    meaning: [
      "Allah raised the heavens without pillars you can see, then rose over the Throne.",
      "He spread out the earth and placed firm mountains and rivers in it.",
      "Gardens side by side drink the same water, yet some fruit tastes better than others."
    ],
    takeaway: "One water, many tastes: the world is full of signs of its Maker.",
    q: [
      ["Ayah 2: what holds up the heavens that we can see?", "No pillars we can see", "Tall mountains", "Giant trees", "Thick clouds"],
      ["Ayah 4: what do gardens side by side drink?", "The same water", "Different seas", "Only snow", "Nothing"]
    ]
  },
  "8-18": {
    meaning: [
      "Allah knows what every womb carries, and what is hidden and what is open.",
      "Allah does not change a people's state until they change what is in themselves.",
      "The thunder glorifies Him with praise, and so do the angels, in awe of Him."
    ],
    takeaway: "Want things to change? Start by changing yourself.",
    q: [
      ["Ayah 11: when does Allah change a people's state?", "When they change themselves", "Never", "When they get rich", "When kings decide"],
      ["Ayah 13: what glorifies Allah with praise?", "The thunder", "The wind only", "The fire", "The stones only"]
    ]
  },
  "19-26": {
    meaning: [
      "People of understanding keep Allah's promise and do not break their word.",
      "They keep ties Allah ordered kept, are patient, pray, and give in secret and in public.",
      "They push back bad with good; theirs is the final home, with angels saying: peace be on you."
    ],
    takeaway: "Keep your word, keep family ties, and answer bad with good.",
    q: [
      ["Ayah 22: how do they push back bad?", "With good", "With anger", "With silence", "With revenge"],
      ["Ayah 24: what do angels say to them in Paradise?", "Peace be on you", "Go away", "Wait outside", "Who are you?"]
    ]
  },
  "27-31": {
    meaning: [
      "Those who believe find their hearts at rest in the remembrance of Allah.",
      "Truly, in remembering Allah, hearts find rest.",
      "For those who believe and do good there is joy and a beautiful return."
    ],
    takeaway: "Feeling restless? Remember Allah: that is where hearts find rest.",
    q: [
      ["Ayah 28: where do hearts find rest?", "In remembering Allah", "In shopping", "In games", "In sleep alone"],
      ["Ayah 29: what waits for those who believe and do good?", "Joy and a beautiful return", "Nothing", "Only money", "Hard work"]
    ]
  },
  "32-37": {
    meaning: [
      "Messengers before you were mocked too; Allah gave the mockers time, then took them.",
      "Paradise has rivers flowing beneath; its fruit and shade last forever.",
      "Allah sent this Quran down as a clear judgement in Arabic."
    ],
    takeaway: "Being mocked for faith is old: every messenger faced it and won.",
    q: [
      ["Ayah 35: how long do Paradise's fruit and shade last?", "Forever", "One year", "Until night", "A short while"],
      ["Ayah 32: were messengers before mocked too?", "Yes, they were mocked too", "No, never", "Only one was", "Only in Egypt"]
    ]
  },
  "38-43": {
    meaning: [
      "Allah sent messengers before, and gave them wives and children.",
      "Allah erases what He wills and keeps what He wills; with Him is the Mother of the Book.",
      "Say: Allah is enough as a witness between me and you."
    ],
    takeaway: "When people doubt you, Allah is enough as your witness.",
    q: [
      ["Ayah 38: what did Allah give the earlier messengers?", "Wives and children", "Crowns", "Armies", "Castles"],
      ["Ayah 43: who is enough as a witness?", "Allah", "The crowd", "The king", "No one"]
    ]
  }
};
