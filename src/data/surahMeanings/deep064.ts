import type { PassageDeep } from "./types";

/**
 * At-Taghabun (Mutual Loss) in depth, passage by passage (the same passages as s064.ts). Our own plain summary of
 * Tafsir Ibn Kathir and Tafsir as-Sa'di, as in deep002.ts; anything the scholars differ on is left out.
 */
export const DEEP_064: Record<string, PassageDeep> = {
  "1-10": {
    meaning: [
      "All in the heavens and earth glorify Allah; His is the kingdom and the praise, and He can do all things.",
      "He knows what is in the heavens and earth, what you hide and what you show, and what is in the chests.",
      "The Day He gathers you is the Day of Mutual Loss, when it becomes clear who truly lost."
    ],
    takeaway: "Live now so you are a winner on the Day of Gathering.",
    q: [
      ["Ayah 4: what does Allah know?", "What you hide and show", "Only what we say", "Nothing", "Only the past"],
      ["Ayah 9: what is the Day of Gathering also called?", "The Day of Mutual Loss", "The Day of Games", "The Day of Markets", "The Day of Rest"]
    ]
  },
  "11-18": {
    meaning: [
      "No hardship strikes except by Allah's leave; whoever believes in Allah, He guides his heart.",
      "Some spouses and children can pull you from good; yet if you pardon and forgive, Allah is Forgiving.",
      "So fear Allah as much as you can, listen, obey and spend; whoever is saved from greed is successful."
    ],
    story: "The Prophet ﷺ said: when I forbid you something, avoid it; when I command you something, do as much of it as you can.",
    hadith: { collection: "bukhari", number: 7288, narrator: "Abu Hurayrah", text: "Leave me as I leave you... if I forbid you something, avoid it, and if I order you to do something, do of it as much as you can." },
    takeaway: "Do your best for Allah: He asks only what you can carry.",
    q: [
      ["Ayah 16: how much should we fear Allah?", "As much as we can", "Never", "Only on Friday", "Only when rich"],
      ["Ayah 11: whose heart does Allah guide?", "Whoever believes in Him", "Whoever is rich", "Whoever is strong", "No one's"]
    ]
  }
};
