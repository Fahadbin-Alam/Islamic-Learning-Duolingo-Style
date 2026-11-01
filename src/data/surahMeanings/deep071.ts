import type { PassageDeep } from "./types";

/**
 * Nuh (Noah) in depth, passage by passage (the same passages as s071.ts). Our own plain summary of Tafsir Ibn
 * Kathir and Tafsir as-Sa'di, as in deep002.ts; anything the scholars differ on is left out.
 */
export const DEEP_071: Record<string, PassageDeep> = {
  "1-9": {
    meaning: [
      "Allah sent Nuh to warn his people: worship Allah, be mindful of Him, and obey me.",
      "He said: my Lord, I called my people night and day, but my call only made them run further.",
      "They put their fingers in their ears, covered themselves with their clothes, and grew proud."
    ],
    takeaway: "Keep inviting to good with patience, even when people will not listen.",
    q: [
      ["Ayah 7: what did the people put in their ears?", "Their fingers", "Cotton", "Sand", "Leaves"],
      ["Ayah 5: when did Nuh call his people?", "Night and day", "Only at dawn", "Once a year", "Only on Fridays"]
    ]
  },
  "10-20": {
    meaning: [
      "Ask your Lord's forgiveness: He is ever Forgiving.",
      "He will send rain pouring down, give you wealth and children, and make gardens and rivers for you.",
      "He made the moon a light and the sun a lamp, and spread out the earth like a carpet."
    ],
    takeaway: "Saying 'astaghfirullah' opens doors of good: say it often.",
    q: [
      ["Ayah 11: what will Allah send pouring down?", "Rain", "Stones", "Snow", "Sand"],
      ["Ayah 16: what did Allah make the sun?", "A lamp", "A mirror", "A stone", "A star"]
    ]
  },
  "21-28": {
    meaning: [
      "They plotted a great plot and said: never leave your gods Wadd, Suwa, Yaghuth, Ya'uq and Nasr.",
      "For their sins they were drowned, and found no helpers besides Allah.",
      "Nuh prayed: my Lord, forgive me, my parents, whoever enters my house a believer, and all believers."
    ],
    story: "Ibn Abbas said these names belonged to righteous men of Nuh's people. After they died, statues were made of them, and later generations came to worship them.",
    hadith: { collection: "bukhari", number: 4920, narrator: "Ibn Abbas", text: "These were names of righteous men of the people of Nuh. When they died, Shaytan inspired their people to set up statues where they used to sit... later they were worshipped." },
    takeaway: "Love the righteous, but worship Allah alone: that is how shirk is kept out.",
    q: [
      ["Ayah 28: whom did Nuh ask forgiveness for, after himself?", "His parents and the believers", "Only the kings", "His enemies only", "No one else"],
      ["Who were Wadd and Suwa at first, said Ibn Abbas?", "Righteous men of Nuh's people", "Angels", "Kings of Egypt", "Stars"]
    ]
  }
};
