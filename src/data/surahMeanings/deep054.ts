import type { PassageDeep } from "./types";

/**
 * Al-Qamar (the Moon) in depth, passage by passage (the same passages as s054.ts). Our own plain summary of
 * Tafsir Ibn Kathir and Tafsir as-Sa'di, as in deep002.ts; anything the scholars differ on is left out.
 */
export const DEEP_054: Record<string, PassageDeep> = {
  "1-8": {
    meaning: [
      "The Hour has drawn near and the moon has split; yet when they see a sign, they turn away: lasting magic!",
      "They denied and followed their desires, but every matter has its settled end.",
      "Clear warnings came to them, full of wisdom, but the warnings did not help them."
    ],
    story: "The people of Makkah asked the Prophet ﷺ to show them a sign, and he showed them the moon split in two halves.",
    hadith: { collection: "bukhari", number: 3868, narrator: "Anas ibn Malik", text: "The people of Makkah asked Allah's Messenger ﷺ to show them a miracle, so he showed them the splitting of the moon." },
    takeaway: "Signs are all around: a soft heart sees them, a proud one turns away.",
    q: [
      ["Ayah 1: what split, in Al-Qamar?", "The moon", "The sea", "A mountain", "The sun"],
      ["Ayah 2: what do the deniers call each sign?", "Lasting magic", "A gift", "A lesson", "Good news"]
    ]
  },
  "9-22": {
    meaning: [
      "Nuh's people denied him and called him mad; he called his Lord: I am overcome, so help me.",
      "Allah opened the sky's gates with pouring rain, and carried Nuh on a ship of planks and nails.",
      "We have made the Quran easy to remember: so is there anyone who will remember?"
    ],
    takeaway: "Learn a few ayahs by heart each day: you can do it.",
    q: [
      ["Ayah 17: what did Allah make easy?", "The Quran, to remember", "Getting rich", "Being lazy", "Lying"],
      ["Ayah 13: what was Nuh's ship made of?", "Planks and nails", "Gold and silver", "Stone", "Glass"]
    ]
  },
  "23-40": {
    meaning: [
      "Thamud said: shall we follow one man from among us? Allah sent the she-camel as a test for them.",
      "They called their companion, who harmed it; then a single blast came upon them.",
      "Lut's family was saved at dawn, a favour from Allah: that is how He rewards the thankful."
    ],
    takeaway: "Thank your Lord for every rescue, big and small.",
    q: [
      ["Ayah 34: whose family was saved at dawn?", "Lut's family", "Pharaoh's family", "Abu Lahab's family", "Qarun's family"],
      ["Ayah 27: what did Allah send Thamud as a test?", "The she-camel", "A flood", "A king", "A storm of gold"]
    ]
  },
  "41-55": {
    meaning: [
      "Warnings came to Pharaoh's people; they denied all Our signs, so Allah seized them.",
      "Allah created everything by a set measure, and His command is one word, like a blink of an eye.",
      "The mindful will be among gardens and rivers, in a seat of truth near a King, All-Powerful."
    ],
    story: "The Prophet ﷺ said: Allah wrote the measures of all creation fifty thousand years before He created the heavens and the earth.",
    hadith: { collection: "muslim", number: 2653, narrator: "Abdullah ibn Amr", text: "Allah wrote down the measures of the creation fifty thousand years before He created the heavens and the earth." },
    takeaway: "Nothing happens by chance: trust Allah's plan for you.",
    q: [
      ["Ayah 49: how did Allah create everything?", "By a set measure", "By chance", "Without a plan", "In a hurry"],
      ["Ayah 55: near whom will the mindful sit?", "A King, All-Powerful", "A poet", "A merchant", "A guard"]
    ]
  }
};
