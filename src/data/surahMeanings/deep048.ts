import type { PassageDeep } from "./types";

/**
 * Al-Fath (the Victory) in depth, passage by passage (the same passages as s048.ts). Our own plain summary of
 * Tafsir Ibn Kathir and Tafsir as-Sa'di, as in deep002.ts; anything the scholars differ on is left out.
 */
export const DEEP_048: Record<string, PassageDeep> = {
  "1-10": {
    meaning: [
      "Allah gave the Prophet ﷺ a clear victory: the peace of Hudaybiyah, which opened the way for Islam.",
      "Allah sent calm down into the believers' hearts, so they grow in faith upon faith.",
      "Those who pledged to the Prophet ﷺ pledged to Allah; Allah's hand is over their hands."
    ],
    story: "On the way home from Hudaybiyah, the Prophet ﷺ said: a surah came to me tonight that is dearer to me than all the sun rises over. Then he recited Al-Fath.",
    hadith: { collection: "bukhari", number: 4177, narrator: "Umar ibn al-Khattab", text: "Tonight a surah has been revealed to me that is dearer to me than everything the sun rises over. Then he recited: We have given you a clear victory." },
    takeaway: "A setback today can be a door Allah opens tomorrow.",
    q: [
      ["Ayah 4: what did Allah send into the believers' hearts?", "Calm", "Fear", "Anger", "Doubt"],
      ["Ayah 1: which peace was called a clear victory?", "The peace of Hudaybiyah", "The peace of Rome", "The peace of Egypt", "The peace of Yemen"]
    ]
  },
  "11-17": {
    meaning: [
      "Those who stayed behind said: our wealth and families kept us busy; their tongues said what hearts did not.",
      "Allah knew their hearts; no excuse hides the truth from Him.",
      "There is no blame on the blind, the lame or the sick for not going out."
    ],
    takeaway: "Be honest with Allah: He knows the real reason behind every excuse.",
    q: [
      ["Ayah 17: who is excused from going out?", "The blind, lame and sick", "The rich", "The busy", "The young and strong"],
      ["Ayah 11: what did they say kept them busy?", "Their wealth and families", "Their prayers", "Their studies", "The weather"]
    ]
  },
  "18-26": {
    meaning: [
      "Allah was pleased with the believers when they pledged to you under the tree; He knew their hearts.",
      "He sent calm down on them and rewarded them with a near victory and many gains.",
      "Allah held both sides back from fighting near Makkah, to protect believers there whom you did not know."
    ],
    story: "The Prophet ﷺ said: none of those who pledged under the tree will enter the Fire, if Allah wills.",
    hadith: { collection: "muslim", number: 2496, narrator: "Umm Mubashshir", text: "If Allah wills, none of the people of the tree who pledged under it will enter the Fire." },
    takeaway: "Keep every promise you make to Allah, big or small.",
    q: [
      ["Ayah 18: where did the believers pledge?", "Under the tree", "In a cave", "On a ship", "In the market"],
      ["Ayah 18: how did Allah feel about those who pledged?", "Pleased with them", "Angry with them", "Unsure of them", "Tired of them"]
    ]
  },
  "27-29": {
    meaning: [
      "Allah made His Messenger's ﷺ dream true: you will enter the Sacred Masjid in safety, heads shaved or trimmed.",
      "Muhammad ﷺ is Allah's Messenger; those with him are firm against deniers and merciful among themselves.",
      "You see them bowing and prostrating, seeking Allah's grace; they are like a seed that grows strong."
    ],
    takeaway: "Be gentle with fellow Muslims and steady in your prayers.",
    q: [
      ["Ayah 29: how are the companions with each other?", "Merciful", "Harsh", "Jealous", "Distant"],
      ["Ayah 29: what are the companions likened to?", "A seed that grows strong", "A falling leaf", "A dry river", "A passing cloud"]
    ]
  }
};
