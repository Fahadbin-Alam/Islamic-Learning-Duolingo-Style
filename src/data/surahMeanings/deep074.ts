import type { PassageDeep } from "./types";

/**
 * Al-Muddaththir (the Cloaked One) in depth, passage by passage (the same passages as s074.ts). Our own plain
 * summary of Tafsir Ibn Kathir and Tafsir as-Sa'di, as in deep002.ts; anything the scholars differ on is left
 * out, and so are the details of Saqar, which are not for a kids' quiz.
 */
export const DEEP_074: Record<string, PassageDeep> = {
  "1-10": {
    meaning: [
      "O you wrapped in your cloak, arise and warn, and proclaim the greatness of your Lord.",
      "Purify your clothes, keep away from idols, and do not give a favour hoping for more in return.",
      "For your Lord's sake, be patient."
    ],
    story: "After a pause in revelation, the Prophet ﷺ saw the angel of Hira between sky and earth. He went home saying: wrap me up. Then Allah revealed these ayahs.",
    hadith: { collection: "bukhari", number: 4, narrator: "Jabir ibn Abdullah", text: "After a pause in revelation, he ﷺ saw the angel of Hira sitting on a chair between the sky and the earth... he said: wrap me up. Then Allah revealed: O you wrapped up, arise and warn." },
    takeaway: "A pure outside, a pure heart, and giving with no strings: that is the start.",
    q: [
      ["Ayah 4: what are we told to purify?", "Our clothes", "Our cars", "Our money", "Our shoes"],
      ["Ayah 6: how should we not give a favour?", "Hoping for more in return", "With a smile", "In secret", "To the poor"]
    ]
  },
  "11-31": {
    meaning: [
      "Leave Me with the one I created alone, to whom I gave abundant wealth and sons present with him.",
      "He thought and plotted, frowned and scowled, then turned away in pride.",
      "He said: this is nothing but magic handed down; this is only the word of a man."
    ],
    takeaway: "Riches and children are gifts: using them to fight the truth brings ruin.",
    q: [
      ["Ayah 24: what did the proud man call the Quran?", "Magic handed down", "A wise book", "A true message", "A love poem"],
      ["Ayah 12: what had Allah given him in abundance?", "Wealth", "Wisdom", "Patience", "Faith"]
    ]
  },
  "32-48": {
    meaning: [
      "Every soul is held in pledge for what it has earned, except the companions of the right.",
      "In gardens they will ask the guilty: what led you into Saqar?",
      "They will say: we were not of those who prayed, nor did we feed the poor."
    ],
    takeaway: "Pray and feed the hungry: those two deeds keep you on the right side.",
    q: [
      ["Ayah 39: who are not held in pledge by their deeds?", "The companions of the right", "The proud ones", "The richest people", "The loudest people"],
      ["Ayah 43: what did the guilty say they never did?", "Prayed", "Slept", "Traded", "Travelled"]
    ]
  },
  "49-56": {
    meaning: [
      "What is wrong with them, turning away from the reminder?",
      "As if they were frightened donkeys fleeing from a lion.",
      "No: it is a reminder, so whoever wills may remember it; He is worthy of being feared and of forgiving."
    ],
    takeaway: "Do not run from good advice: turn towards it.",
    q: [
      ["Ayah 50: what are they like, fleeing the reminder?", "Frightened donkeys", "Brave lions", "Calm birds", "Slow turtles"],
      ["Ayah 51: what were the donkeys fleeing from?", "A lion", "A storm", "A hunter's dog", "A fire"]
    ]
  }
};
