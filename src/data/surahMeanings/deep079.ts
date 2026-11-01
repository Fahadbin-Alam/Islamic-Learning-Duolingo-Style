import type { PassageDeep } from "./types";

/**
 * An-Nazi'at (Those Who Pull Out) in depth, passage by passage (the same passages as s079.ts). Our own plain
 * summary of Tafsir Ibn Kathir and Tafsir as-Sa'di, as in deep002.ts; anything the scholars differ on is left out.
 */
export const DEEP_079: Record<string, PassageDeep> = {
  "1-14": {
    meaning: [
      "Allah swears by the angels who carry out His commands, swift and in order.",
      "On the Day the first blast shakes all, followed by a second, hearts will tremble and eyes be lowered.",
      "It will be only a single shout, and at once they are standing, awake, on the open earth."
    ],
    takeaway: "Bringing us back is easy for Allah: one call, and everyone stands.",
    q: [
      ["Ayah 13: how many shouts will raise everyone?", "A single shout", "Seven shouts", "A hundred calls", "No shout"],
      ["Ayah 8: what will hearts do that Day?", "Tremble", "Laugh", "Sleep", "Sing"]
    ]
  },
  "15-26": {
    meaning: [
      "His Lord called Musa in the sacred valley of Tuwa: go to Pharaoh, he has gone too far.",
      "Say: would you like to purify yourself, and let me guide you to your Lord, so you fear Him?",
      "Pharaoh gathered his people and proclaimed: I am your lord most high. So Allah seized him, a lesson."
    ],
    takeaway: "Pride brought down even Pharaoh: stay humble, however strong you become.",
    q: [
      ["Ayah 16: where did Allah call Musa?", "The valley of Tuwa", "Mount Uhud", "Makkah", "The Nile"],
      ["Ayah 24: what did Pharaoh proudly claim?", "I am your lord most high", "I am a poor man", "I am a prophet", "I am your servant"]
    ]
  },
  "27-33": {
    meaning: [
      "Are you harder to create, or the sky? He built it, raised its height and made it perfect.",
      "He darkened its night and brought out its morning, and after that spread out the earth.",
      "He brought out its water and pasture, and set the mountains firm, as provision for you and your animals."
    ],
    takeaway: "The One who built the sky can easily bring you back.",
    q: [
      ["Ayah 27: which is harder to create, people or this?", "The sky", "A tree", "A house", "A ship"],
      ["Ayah 32: how did Allah set the mountains?", "Firm", "Floating", "Upside down", "Moving"]
    ]
  },
  "34-46": {
    meaning: [
      "Whoever feared standing before his Lord and held his soul back from desire, Paradise is the refuge.",
      "They ask you about the Hour: when will it arrive? Its knowledge is with your Lord alone.",
      "The Day they see it, it will seem as if they stayed only an evening or its morning."
    ],
    story: "The Prophet ﷺ held up his index and middle fingers and said: I and the Hour were sent like these two.",
    hadith: { collection: "bukhari", number: 4936, narrator: "Sahl bin Sa'd", text: "I saw the Messenger of Allah ﷺ say with his two fingers like this, the middle and the index finger: I and the Hour were sent like these two." },
    takeaway: "Life is short, like one evening: say no to wrong wants, for Allah.",
    q: [
      ["Ayah 40: what did the winner hold his soul back from?", "Desire", "Prayer", "Kindness", "Charity"],
      ["Ayah 44: with whom is the knowledge of the Hour?", "With Allah alone", "With the angels", "With fortune tellers", "With everyone"]
    ]
  }
};
