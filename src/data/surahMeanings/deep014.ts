import type { PassageDeep } from "./types";

/**
 * Ibrahim in depth, passage by passage (the same passages as s014.ts). Our own plain summary of Tafsir Ibn
 * Kathir and Tafsir as-Sa'di, as in deep002.ts; anything the scholars differ on is left out.
 */
export const DEEP_014: Record<string, PassageDeep> = {
  "1-6": {
    meaning: [
      "Allah sent this Book down so the Prophet ﷺ could bring people out of darkness into light.",
      "Every messenger was sent speaking his own people's language, to make things clear.",
      "Musa reminded his people of the days Allah saved them from Pharaoh."
    ],
    takeaway: "The Quran is light: it takes us out of every darkness.",
    q: [
      ["Ayah 4: in what language was each messenger sent?", "His own people's language", "Only Arabic", "A secret language", "No language"],
      ["Ayah 1: the Book brings people out of darkness into what?", "Into light", "Into sleep", "Into wealth", "Into fear"]
    ]
  },
  "7-12": {
    meaning: [
      "Your Lord declared: if you are grateful, I will surely give you more.",
      "Musa said: even if you and everyone on earth disbelieved, Allah needs no one.",
      "The messengers said: why should we not trust Allah, when He has guided us on our ways?"
    ],
    takeaway: "Say alhamdulillah often: thanks brings more blessings.",
    q: [
      ["Ayah 7: what does Allah promise the grateful?", "He will give more", "Nothing", "Fewer tests", "A long nap"],
      ["Ayah 8: if all on earth disbelieved, would Allah need them?", "No, Allah needs no one", "Yes", "Only some", "Only the kings"]
    ]
  },
  "13-21": {
    meaning: [
      "The deeds of those who reject their Lord are like ashes blown in a stormy wind.",
      "They cannot keep hold of anything they earned.",
      "On the Day, followers will blame their leaders, but no one can help anyone."
    ],
    takeaway: "Deeds without faith blow away: build yours on belief in Allah.",
    q: [
      ["Ayah 18: what are the deniers' deeds like?", "Ashes in a stormy wind", "Strong stones", "Gold bars", "Deep roots"],
      ["Ayah 21: can leaders help their followers on the Day?", "No one can help anyone", "Yes, fully", "Only with money", "Only the rich"]
    ]
  },
  "22-27": {
    meaning: [
      "Shaytan will say on the Day: I only called you, and you answered me; do not blame me.",
      "A good word is like a good tree: its root is firm and its branches reach the sky.",
      "Allah keeps the believers firm with the firm word, in this life and the next."
    ],
    story: "The Prophet ﷺ asked his Companions about a tree whose leaves never fall, like a Muslim. Young Ibn Umar knew but stayed shy. It was the date palm.",
    hadith: { collection: "bukhari", number: 61, narrator: "Abdullah ibn Umar", text: "The Prophet ﷺ said: among the trees is a tree whose leaves do not fall, and it is like the Muslim. Tell me what it is. Then he said: it is the date palm." },
    takeaway: "Let your faith be like a palm: deep roots, high branches, good fruit.",
    q: [
      ["Ayah 24: a good word is like what?", "A good tree", "A strong wind", "A tall wall", "A deep well"],
      ["Which tree did the Prophet ﷺ liken to a Muslim?", "The date palm", "The olive tree", "The fig tree", "The oak"]
    ]
  },
  "28-34": {
    meaning: [
      "Tell My servants who believe to pray and to give in secret and in public.",
      "He made the sun and moon, night and day to serve you.",
      "If you tried to count Allah's favours, you could never count them."
    ],
    takeaway: "Try counting Allah's gifts today: you will run out of numbers first.",
    q: [
      ["Ayah 34: can we count Allah's favours?", "We could never count them", "Yes, easily", "Only on Fridays", "Only scholars can"],
      ["Ayah 33: what did Allah make to serve us?", "The sun, moon, night and day", "Only the stars", "Only animals", "Nothing"]
    ]
  },
  "35-41": {
    meaning: [
      "Ibrahim prayed: my Lord, make this city safe, and keep me and my sons from idol worship.",
      "I have settled some of my children in a valley with no crops, near Your sacred House.",
      "My Lord, make me and my children keep up prayer; forgive me, my parents and the believers."
    ],
    takeaway: "Pray for your children and parents, like Ibrahim did.",
    q: [
      ["Ayah 37: where did Ibrahim settle some of his children?", "A valley with no crops", "A green garden", "A big palace", "An island"],
      ["Ayah 40: what did Ibrahim ask for his children?", "To keep up prayer", "To be rich", "To be famous", "To be kings"]
    ]
  },
  "42-52": {
    meaning: [
      "Do not think Allah is unaware of what the wrongdoers do; He only delays them.",
      "On the Day their eyes will stare and their hearts will be empty.",
      "The earth will be changed into another earth, and all will stand before Allah, the One."
    ],
    takeaway: "If wrong seems to go unpunished, wait: Allah only delays.",
    q: [
      ["Ayah 42: is Allah unaware of what wrongdoers do?", "No, He only delays them", "Yes", "Sometimes", "He forgets"],
      ["Ayah 48: what will the earth be changed into?", "Another earth", "A sea", "A star", "Nothing"]
    ]
  }
};
