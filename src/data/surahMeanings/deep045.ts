import type { PassageDeep } from "./types";

/**
 * Al-Jathiyah (the Kneeling) in depth, passage by passage (the same passages as s045.ts). Our own plain summary
 * of Tafsir Ibn Kathir and Tafsir as-Sa'di, as in deep002.ts; anything the scholars differ on is left out.
 */
export const DEEP_045: Record<string, PassageDeep> = {
  "1-11": {
    meaning: [
      "In the heavens and the earth are signs for believers, and in how Allah made you and the animals.",
      "Night following day, rain bringing dead land to life, and the turning of the winds are signs too.",
      "Woe to every sinful liar who hears Allah's ayahs, then acts proud as if he never heard them."
    ],
    takeaway: "Look around with open eyes: creation keeps pointing to its Maker.",
    q: [
      ["Ayah 5: what turns, as a sign for people who think?", "The winds", "The mountains", "The stars", "The rocks"],
      ["Ayah 8: what does the sinful liar do after hearing?", "Acts proud as if never heard", "Cries and repents", "Thanks Allah", "Asks to learn more"]
    ]
  },
  "12-21": {
    meaning: [
      "Allah made the sea serve you, so ships sail on it by His command and you seek His bounty.",
      "Tell the believers to forgive those who do not hope for Allah's days; He will repay each people.",
      "Allah put you on a clear path of the religion, so follow it, not the wishes of those who do not know."
    ],
    takeaway: "Let small hurts go: Allah settles every account in full.",
    q: [
      ["Ayah 12: by whose command do ships sail the sea?", "By Allah's command", "By the wind alone", "By the captain", "By luck"],
      ["Ayah 14: whom should the believers forgive?", "Those who do not hope for Allah's days", "No one ever", "Only the rich", "Only their friends"]
    ]
  },
  "22-26": {
    meaning: [
      "Have you seen one who takes his own desires as his god? Who can guide him after Allah?",
      "They say: there is only this life; we die and we live, and only time destroys us.",
      "Say: Allah gives you life, then causes you to die, then gathers you on the Day that is certain."
    ],
    story: "The Prophet ﷺ said that Allah says: people blame time, yet I am the One who turns the night and the day. So do not curse time.",
    hadith: { collection: "bukhari", number: 4826, narrator: "Abu Hurairah", text: "Allah said: the son of Adam hurts Me; he curses time, and I am the Lord of time: in My hand is the command, and I turn the night and the day." },
    takeaway: "Troubles come from Allah's plan: turn to Him, do not curse the days.",
    q: [
      ["Ayah 23: what does one person take as his god?", "His own desires", "The sun", "The angels", "The sea"],
      ["Ayah 24: what do the deniers say destroys them?", "Only time", "Allah's angels", "The jinn", "Their kings"]
    ]
  },
  "27-37": {
    meaning: [
      "On that Day you will see every nation kneeling, each one called to its book of deeds.",
      "This record of Ours speaks about you with truth; We had everything you did written down.",
      "All praise is Allah's, Lord of the heavens, the earth and the worlds; His is the greatness."
    ],
    takeaway: "Every deed is written: make your book one you will be happy to read.",
    q: [
      ["Ayah 28: how will every nation be on that Day?", "Kneeling", "Dancing", "Sleeping", "Running"],
      ["Ayah 37: to whom does all greatness belong?", "To Allah, Lord of the worlds", "To kings", "To the rich", "To the strong"]
    ]
  }
};
