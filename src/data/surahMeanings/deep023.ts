import type { PassageDeep } from "./types";

/**
 * Al-Mu'minun (the Believers) in depth, passage by passage (the same passages as s023.ts). Our own plain
 * summary of Tafsir Ibn Kathir and Tafsir as-Sa'di, as in deep002.ts; anything the scholars differ on is left out.
 */
export const DEEP_023: Record<string, PassageDeep> = {
  "1-22": {
    meaning: [
      "The believers have succeeded: those who are humble in their prayer and turn from idle talk.",
      "They give zakah, guard their chastity, keep their trusts and promises, and guard their prayers.",
      "Allah made the human from clay, then a drop, then bones clothed with flesh: blessed is Allah."
    ],
    takeaway: "Want success? Pray with focus, skip idle talk, and keep your word.",
    q: [
      ["Ayah 2: how do successful believers pray?", "Humble in their prayer", "In a rush", "Only on Fridays", "While chatting"],
      ["Ayah 3: what do successful believers turn away from?", "Idle talk", "Their families", "Charity", "Prayer"]
    ]
  },
  "23-32": {
    meaning: [
      "Nuh called his people to worship Allah, but the leaders said: he is only a man like you.",
      "Allah told Nuh: build the ark under Our eyes and by Our guidance.",
      "Take on board a pair of every kind, and your family, and say: praise be to Allah who saved us."
    ],
    takeaway: "Do the right thing even if people mock: Allah is watching over you.",
    q: [
      ["Ayah 27: how was Nuh to build the ark?", "Under Allah's eyes and guidance", "Alone in secret", "With his enemies", "In one day"],
      ["Ayah 24: what did the leaders say about Nuh?", "Only a man like you", "An angel", "A king", "A magician"]
    ]
  },
  "33-50": {
    meaning: [
      "Another people said of their messenger: he eats what you eat and drinks what you drink.",
      "Allah sent His messengers one after another; each time, the people denied.",
      "Allah made Maryam's son and his mother a sign, and sheltered them on high ground with water."
    ],
    takeaway: "Every messenger was a real human: that is why we can follow them.",
    q: [
      ["Ayah 33: what did people say about their messenger?", "He eats what you eat", "He never eats", "He is an angel", "He is a king"],
      ["Ayah 50: whom did Allah make a sign together?", "Maryam's son and his mother", "Musa and Harun", "Nuh and his son", "Adam and Iblis"]
    ]
  },
  "51-77": {
    meaning: [
      "Messengers, eat of the good things and do good deeds: I know what you do.",
      "This ummah of yours is one ummah, and I am your Lord, so be mindful of Me.",
      "They give what they give with fearful hearts, knowing they will return to their Lord."
    ],
    story: "The Prophet ﷺ spoke of a traveller raising his hands: O Lord! But his food and clothes were from haram, so how could he be answered?",
    hadith: { collection: "muslim", number: 1015, narrator: "Abu Hurairah", text: "Allah is good and accepts only what is good... He mentioned a man on a long journey raising his hands: O Lord! while his food, drink and clothes are haram; how can he be answered?" },
    takeaway: "Eat halal and do good: clean food helps your duas be answered.",
    q: [
      ["Ayah 51: what were the messengers told to eat?", "The good things", "Anything at all", "Only bread", "Nothing"],
      ["What made the traveller's dua hard to answer?", "His food and clothes were haram", "He prayed too quietly", "He was too far", "He was tired"]
    ]
  },
  "78-92": {
    meaning: [
      "Allah gave you hearing, sight and hearts; how little you give thanks.",
      "Ask: whose is the earth and all in it? They will say: Allah's. Say: then will you not remember?",
      "Allah has taken no son, and there is no god with Him."
    ],
    takeaway: "If Allah owns everything, He alone deserves our thanks and worship.",
    q: [
      ["Ayah 78: what did Allah give us that we rarely thank Him for?", "Hearing, sight and hearts", "Gold", "Kings", "Stars"],
      ["Ayah 85: whose is the earth, they will admit?", "Allah's", "The kings'", "Nobody's", "Ours"]
    ]
  },
  "93-118": {
    meaning: [
      "Push back evil with what is better; Allah knows best what they say.",
      "Say: my Lord, I seek refuge with You from the whispers of the devils.",
      "When the trumpet is blown, there will be no family ties that day, nor will they ask about each other."
    ],
    takeaway: "Answer rudeness with kindness, and ask Allah to protect you from Shaytan.",
    q: [
      ["Ayah 96: how should we push back evil?", "With what is better", "With more evil", "With silence only", "With revenge"],
      ["Ayah 97: from what do we seek refuge with Allah?", "The whispers of the devils", "The rain", "Our parents", "Our friends"]
    ]
  }
};
