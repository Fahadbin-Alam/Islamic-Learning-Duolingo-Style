import type { PassageDeep } from "./types";

/**
 * At-Takathur (Competing for More) in depth, passage by passage (the same passages as s102.ts). Our own plain
 * summary of Tafsir Ibn Kathir and Tafsir as-Sa'di, as in deep002.ts; anything the scholars differ on is left out.
 */
export const DEEP_102: Record<string, PassageDeep> = {
  "1-4": {
    meaning: [
      "Competing for more and more, wealth, children and showing off, distracts you,",
      "until you visit the graves.",
      "No! You will soon come to know. Then no! You will soon come to know."
    ],
    story: "The Prophet ﷺ said: if a person had a valley of gold, he would want a second; only the dust of the grave fills his mouth.",
    hadith: { collection: "bukhari", number: 6439, narrator: "Anas ibn Malik", text: "If the son of Adam had a valley of gold, he would wish for two valleys; nothing fills his mouth except dust, and Allah forgives whoever repents." },
    takeaway: "Stop chasing more than others: the grave comes sooner than we think.",
    q: [
      ["Ayah 2: until when does the race for more distract?", "Until you visit the graves", "Until lunch", "Until you are rich", "Never"],
      ["With one valley of gold, what would a person want?", "A second valley", "Nothing more", "To give it all", "A small house"]
    ]
  },
  "5-8": {
    meaning: [
      "If only you knew with certain knowledge, you would not be so distracted.",
      "You will surely see the blazing Fire; you will see it with the eye of certainty.",
      "Then that Day you will be questioned about the blessings you enjoyed."
    ],
    story: "Once the Prophet ﷺ, Abu Bakr and Umar ate dates and meat and drank cool water when hungry. He ﷺ said: you will be asked about this blessing.",
    hadith: { collection: "muslim", number: 2038, narrator: "Abu Hurairah", text: "By the One in whose hand is my soul, you will be asked about this blessing on the Day of Resurrection." },
    takeaway: "Every meal and every sip is a gift: thank Allah for it.",
    q: [
      ["Ayah 8: what will we be asked about that Day?", "The blessings we enjoyed", "Our height", "Our favourite colour", "Nothing"],
      ["After dates and cool water, what did the Prophet ﷺ say?", "You will be asked about it", "Eat more", "It is nothing", "Throw it away"]
    ]
  }
};
