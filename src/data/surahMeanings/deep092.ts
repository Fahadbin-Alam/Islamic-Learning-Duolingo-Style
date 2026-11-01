import type { PassageDeep } from "./types";

/**
 * Al-Layl (the Night) in depth, passage by passage (the same passages as s092.ts). Our own plain summary of
 * Tafsir Ibn Kathir and Tafsir as-Sa'di, as in deep002.ts; anything the scholars differ on is left out.
 */
export const DEEP_092: Record<string, PassageDeep> = {
  "1-11": {
    meaning: [
      "By the night as it covers, the day as it shines, and the One who created male and female: your efforts differ.",
      "Whoever gives, is mindful of Allah and believes in the best reward, We will ease him towards ease.",
      "Whoever is stingy, thinks he needs no one, and denies the best, We will ease him towards hardship."
    ],
    story: "The Prophet ﷺ told the Companions: keep doing good deeds, for each person is eased towards what he was created for. Then he recited these ayahs.",
    hadith: { collection: "bukhari", number: 4949, narrator: "Ali ibn Abi Talib", text: "Do deeds, for everyone will find it easy to do what he was created for... then he recited: as for him who gives and fears Allah, and believes in the best." },
    takeaway: "Give, fear Allah and trust His promise: the road will open up for you.",
    q: [
      ["Ayah 7: whom will Allah ease towards ease?", "One who gives and is mindful", "One who keeps all", "One who boasts", "One who sleeps most"],
      ["Ayah 4: how are people's efforts, Allah says?", "They differ", "All the same", "All wasted", "All perfect"]
    ]
  },
  "12-21": {
    meaning: [
      "Upon Us is guidance, and to Us belong the last life and the first.",
      "The most mindful will be kept far from the Fire: the one who gives his wealth to grow pure.",
      "He owes no one a favour; he gives only seeking his Lord's face, the Most High, and he will be pleased."
    ],
    takeaway: "Give for Allah alone, not for thanks or payback: that giving purifies you.",
    q: [
      ["Ayah 20: why does the most mindful one give?", "Only seeking his Lord's face", "To be praised", "To repay a favour", "To get rich"],
      ["Ayah 13: what belongs to Allah?", "The last life and the first", "Only this world", "Only the stars", "Only the sea"]
    ]
  }
};
