import type { PassageDeep } from "./types";

/**
 * Al-Ma'arij (the Ways of Ascent) in depth, passage by passage (the same passages as s070.ts). Our own plain
 * summary of Tafsir Ibn Kathir and Tafsir as-Sa'di, as in deep002.ts; anything the scholars differ on is left out.
 */
export const DEEP_070: Record<string, PassageDeep> = {
  "1-18": {
    meaning: [
      "The angels and the Spirit rise up to Him in a Day whose length is fifty thousand years.",
      "So be patient with a beautiful patience: they see it as far, but We see it near.",
      "On that Day the sky is like molten metal, and no close friend will ask about a friend."
    ],
    takeaway: "Bear hardship without complaining: the Day comes sooner than it seems.",
    q: [
      ["Ayah 5: what kind of patience are we told to have?", "A beautiful patience", "A short patience", "An angry patience", "No patience"],
      ["Ayah 10: who will not ask about a friend that Day?", "A close friend", "A stranger only", "An enemy only", "A king"]
    ]
  },
  "19-35": {
    meaning: [
      "Man was made anxious: complaining when harm touches him, and holding back when good comes.",
      "Except those who pray and keep their prayers up constantly.",
      "In their wealth is a known right for the one who asks and the one who is deprived."
    ],
    story: "The Prophet ﷺ said the deeds Allah loves most are those done regularly, even if they are small.",
    hadith: { collection: "bukhari", number: 6464, narrator: "Aishah", text: "The most beloved of deeds to Allah are those done regularly, even if they are few." },
    takeaway: "Small good deeds done every day calm the heart more than big ones done once.",
    q: [
      ["Ayah 23: how do the true worshippers keep their prayers?", "Constantly", "Now and then", "Once a year", "Only in Ramadan"],
      ["Which deeds does Allah love most, said the Prophet ﷺ?", "Regular ones, even if small", "Rare, huge ones", "Ones done for praise", "Only fasting"]
    ]
  },
  "36-44": {
    meaning: [
      "What is wrong with the deniers, rushing towards you from right and left in groups?",
      "Allah is able to replace them with people better than them, and nothing can stop Him.",
      "The Day they rush out of the graves, their eyes cast down: that is the Day they were promised."
    ],
    takeaway: "Do not wait for that Day to humble yourself: bow your head to Allah today.",
    q: [
      ["Ayah 41: whom could Allah replace them with?", "People better than them", "No one at all", "Angels only", "Their enemies"],
      ["Ayah 44: how will their eyes be on that Day?", "Cast down", "Shining bright", "Wide with joy", "Closed in sleep"]
    ]
  }
};
