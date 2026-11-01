import type { PassageDeep } from "./types";

/**
 * Al-Humazah (the Slanderer) in depth, passage by passage (the same passages as s104.ts). Our own plain summary
 * of Tafsir Ibn Kathir and Tafsir as-Sa'di, as in deep002.ts; anything the scholars differ on is left out.
 */
export const DEEP_104: Record<string, PassageDeep> = {
  "1-4": {
    meaning: [
      "Woe to every slanderer and fault-finder, who mocks people with words and gestures,",
      "who piles up wealth and counts it again and again,",
      "thinking his wealth will make him live forever. No! He will be flung into the Crusher."
    ],
    story: "The Prophet ﷺ asked: do you know what backbiting is? It is mentioning your brother with what he dislikes.",
    hadith: { collection: "muslim", number: 2589, narrator: "Abu Hurayrah", text: "Do you know what backbiting is? They said: Allah and His Messenger know best. He said: mentioning your brother with what he dislikes." },
    takeaway: "Guard your tongue: never mock, belittle, or talk behind people's backs.",
    q: [
      ["Ayah 3: what does he think his wealth will do?", "Make him live forever", "Test him", "Help the poor", "Go back to Allah"],
      ["What did the Prophet ﷺ call backbiting?", "Mentioning what your brother dislikes", "Praising your brother", "Giving advice kindly", "Making dua for him"]
    ]
  },
  "5-9": {
    meaning: [
      "And what will make you know what the Crusher, Al-Hutamah, is?",
      "It is Allah's kindled Fire, which rises up over the hearts.",
      "It will be closed over them, in long, stretched-out columns."
    ],
    takeaway: "Money cannot buy safety on that Day: only good deeds can.",
    q: [
      ["Ayah 6: what is Al-Hutamah?", "Allah's kindled Fire", "A garden", "A river", "A mountain"],
      ["Ayah 7: up to where does that Fire rise?", "Over the hearts", "Only the feet", "The knees", "Nowhere"]
    ]
  }
};
