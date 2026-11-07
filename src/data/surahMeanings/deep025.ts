import type { PassageDeep } from "./types";

/**
 * Al-Furqan (the Criterion) in depth, passage by passage (the same passages as s025.ts). Our own plain summary
 * of Tafsir Ibn Kathir and Tafsir as-Sa'di, as in deep002.ts; anything the scholars differ on is left out.
 */
export const DEEP_025: Record<string, PassageDeep> = {
  "1-9": {
    meaning: [
      "Blessed is the One who sent down the Criterion to His servant, to be a warner to all the worlds.",
      "He created everything and set it in exact measure.",
      "Others worship things that create nothing, and are themselves created."
    ],
    takeaway: "Use the Quran to tell right from wrong, every day.",
    q: [
      ["Ayah 1: what name does Allah give the Quran?", "The Criterion", "The Story", "The Song", "The Law of kings"],
      ["Ayah 2: how did Allah set everything He created?", "In exact measure", "By chance", "In a hurry", "Without a plan"]
    ]
  },
  "10-20": {
    meaning: [
      "They said: what kind of messenger eats food and walks in the markets?",
      "Every messenger before ate food and walked in the markets too.",
      "Allah made some of you a test for others: will you be patient?"
    ],
    takeaway: "Messengers lived normal lives: faith fits in markets, homes and streets.",
    q: [
      ["Ayah 7: what did deniers find strange about the Messenger ﷺ?", "He eats food and walks in markets", "He could fly", "He never spoke", "He was rich"],
      ["Ayah 20: what did earlier messengers also do?", "Ate food and walked in the markets", "Lived in caves only", "Never ate", "Ruled empires"]
    ]
  },
  "21-34": {
    meaning: [
      "On that Day the wrongdoer will bite his hands: I wish I had taken the path with the Messenger ﷺ.",
      "Woe to me, I wish I had not taken so-and-so as a close friend; he led me away from the reminder.",
      "The Messenger ﷺ will say: my Lord, my people treated this Quran as something left behind."
    ],
    story: "The Prophet ﷺ said a good friend is like a musk seller: you may buy, or at least smell something nice. A bad friend is like a blacksmith's bellows.",
    hadith: { collection: "bukhari", number: 5534, narrator: "Abu Musa al-Ash'ari", text: "A good companion and a bad companion are like the musk seller and the one who blows the bellows... from the musk seller you get a good smell." },
    takeaway: "Pick companions who lead you to Allah: bad company brings regret.",
    q: [
      ["Ayah 28: what will the wrongdoer wish about his friend?", "That he never took him as friend", "That he had more friends", "That his friend was rich", "Nothing"],
      ["The Prophet ﷺ likened a good friend to whom?", "A musk seller", "A blacksmith", "A king", "A guard"]
    ]
  },
  "35-44": {
    meaning: [
      "Allah gave Musa the Book and made his brother Harun his helper.",
      "The people of Nuh, Ad, Thamud and many in between were destroyed for denying.",
      "Have you seen one who takes his own desires as his god?"
    ],
    takeaway: "Do not let your wants become your boss: follow Allah instead.",
    q: [
      ["Ayah 43: what does one person take as his god?", "His own desires", "The sun", "A statue", "His king"],
      ["Ayah 35: who was made Musa's helper?", "His brother Harun", "His father", "Pharaoh", "Yusuf"]
    ]
  },
  "45-60": {
    meaning: [
      "Look how your Lord stretches the shade; had He willed, He would have made it still.",
      "He made the night a covering, sleep a rest, and the day for rising.",
      "He let two seas flow, one sweet and one salty, with a barrier between them."
    ],
    takeaway: "Shade, sleep and seas are all signs: notice them and thank Allah.",
    q: [
      ["Ayah 47: what did Allah make sleep for us?", "A rest", "A punishment", "A waste", "A test only"],
      ["Ayah 53: what is between the sweet and salty seas?", "A barrier", "A bridge", "A wall of fire", "Nothing"]
    ]
  },
  "61-77": {
    meaning: [
      "The servants of the Most Merciful walk on the earth humbly; when the foolish speak to them, they say: peace.",
      "They spend neither wastefully nor stingily, but in a balanced way between.",
      "They pray: our Lord, give us joy in our spouses and children, and make us leaders of the mindful."
    ],
    takeaway: "Walk humbly, spend wisely, and pray for a family that brings you joy.",
    q: [
      ["Ayah 63: what do they say when the foolish speak to them?", "Peace", "Go away", "You fool", "Nothing ever"],
      ["Ayah 67: how do they spend?", "In a balanced way", "Wastefully", "Stingily", "Never"]
    ]
  }
};
