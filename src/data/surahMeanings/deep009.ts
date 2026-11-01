import type { PassageDeep } from "./types";

/**
 * At-Tawbah in depth, passage by passage (the same passages as s009.ts). Our own plain summary of Tafsir Ibn
 * Kathir and Tafsir as-Sa'di, as in deep002.ts; anything the scholars differ on is left out. This surah alone
 * has no Bismillah at its start.
 */
export const DEEP_009: Record<string, PassageDeep> = {
  "1-16": {
    meaning: [
      "At-Tawbah alone begins without Bismillah; it opens with a declaration to those who broke treaties.",
      "Those who kept their treaties are to be honoured to the end of their term: Allah loves the mindful.",
      "If someone asks you for protection, protect him so he can hear Allah's word, then take him to safety."
    ],
    takeaway: "Keep your word, even with those who are not Muslim.",
    q: [
      ["Which surah alone begins without Bismillah?", "At-Tawbah", "Al-Baqarah", "Al-Anfal", "Yasin"],
      ["Ayah 4: what must be done with treaties that were kept?", "Honour them to the end", "Break them", "Ignore them", "Sell them"]
    ]
  },
  "17-29": {
    meaning: [
      "Allah's masjids are kept up by those who believe in Allah and the Last Day, pray and give zakah.",
      "If parents, children, wealth or homes are dearer to you than Allah and His Messenger ﷺ, then wait.",
      "At Hunayn your large numbers pleased you but did not help you; then Allah sent down His calm."
    ],
    takeaway: "Numbers do not win: Allah's help does.",
    q: [
      ["Ayah 25: at which battle did large numbers not help?", "Hunayn", "Badr", "Uhud", "The Trench"],
      ["Ayah 26: what did Allah send down after Hunayn's shock?", "His calm", "A storm", "Gold", "Snow"]
    ]
  },
  "30-37": {
    meaning: [
      "With Allah the months are twelve, in His Book since He made the heavens and earth.",
      "Four of them are sacred, so do not wrong yourselves in them.",
      "Those who hoard gold and silver and do not spend in Allah's way will regret it."
    ],
    takeaway: "Guard yourself from wrong, above all in the sacred months.",
    q: [
      ["Ayah 36: how many months are there with Allah?", "Twelve", "Ten", "Thirteen", "Eight"],
      ["Ayah 34: what do some hoard and not spend for Allah?", "Gold and silver", "Books", "Dates", "Clothes"]
    ]
  },
  "38-42": {
    meaning: [
      "If you do not help the Prophet ﷺ, Allah already helped him when he was one of two in the cave.",
      "He said to his companion: do not grieve, Allah is with us.",
      "Allah sent His calm down on him and supported him with forces you did not see."
    ],
    story: "In the cave, Abu Bakr said: if one of them looks down, he will see us. The Prophet ﷺ said: what do you think of two whose third is Allah?",
    hadith: { collection: "bukhari", number: 3653, narrator: "Abu Bakr as-Siddiq", text: "In the cave I said: if one of them looks at his feet he will see us. He ﷺ said: what do you think of two whose third is Allah?" },
    takeaway: "When you are scared, remember: Allah is with you.",
    q: [
      ["Who was with the Prophet ﷺ in the cave?", "Abu Bakr", "Umar", "Ali", "Bilal"],
      ["Ayah 40: what did the Prophet ﷺ tell his companion?", "Do not grieve, Allah is with us", "Run as fast as you can", "We are lost", "Let us go back"]
    ]
  },
  "43-72": {
    meaning: [
      "Hypocrites made excuses to stay home, and swore oaths to please people.",
      "Zakah goes to eight groups Allah named, such as the poor, the needy, debtors and travellers.",
      "Believing men and women are allies of one another: they call to good, pray and give zakah."
    ],
    takeaway: "Zakah has set receivers: Allah named them Himself.",
    q: [
      ["Ayah 60: who named the receivers of zakah?", "Allah Himself", "The rich", "Any judge", "No one"],
      ["Ayah 71: what are believing men and women to each other?", "Allies of one another", "Rivals", "Strangers", "Enemies"]
    ]
  },
  "73-99": {
    meaning: [
      "No blame on the weak, the sick, or those who had nothing to spend, if they were sincere.",
      "Some came asking for a ride to go out; when there was none, they turned away weeping.",
      "Say: work, and Allah will see your work, and so will His Messenger ﷺ and the believers."
    ],
    takeaway: "Allah sees sincere hearts, even when bodies cannot go.",
    q: [
      ["Ayah 92: why did some turn away weeping?", "No ride was found to take them", "They were lazy", "They lost money", "They were scared"],
      ["Ayah 91: who had no blame for staying?", "The weak, the sick and the poor", "The lazy", "The proud", "The rich"]
    ]
  },
  "100-110": {
    meaning: [
      "Allah is pleased with the first Muhajirun and Ansar and those who follow them in good.",
      "Take charity from their wealth: it purifies them; and pray for them, for your prayer calms them.",
      "A masjid founded on mindfulness from the first day is more worthy for you to stand in."
    ],
    takeaway: "Follow the first believers in good, and Allah will be pleased with you too.",
    q: [
      ["Ayah 103: what does charity do for the giver?", "Purifies them", "Makes them poor", "Nothing", "Makes them proud"],
      ["Ayah 108: what was the better masjid founded on?", "Mindfulness from the first day", "Gold", "Pride", "Showing off"]
    ]
  },
  "111-122": {
    meaning: [
      "Allah bought from the believers their lives and wealth in return for Paradise.",
      "Allah turned in mercy to the three who were left behind, when the wide earth felt tight to them.",
      "Believers, be mindful of Allah and be with the truthful."
    ],
    story: "Ka'b ibn Malik stayed behind from Tabuk with no excuse. He told the Prophet ﷺ the truth, waited fifty days, and then Allah forgave him in the Quran.",
    hadith: { collection: "bukhari", number: 4418, narrator: "Ka'b ibn Malik", text: "Ka'b told the Prophet ﷺ the truth about staying behind from Tabuk; after fifty nights Allah accepted his repentance in 9:118." },
    takeaway: "Telling the truth saved Ka'b: honesty is the way back to Allah.",
    q: [
      ["What saved Ka'b ibn Malik after Tabuk?", "Telling the truth", "A good excuse", "Hiding away", "Paying money"],
      ["Ayah 119: whom should believers be with?", "The truthful", "The rich", "The famous", "The strong"]
    ]
  },
  "123-129": {
    meaning: [
      "A Messenger ﷺ has come to you from among yourselves; your hardship grieves him.",
      "He cares about you deeply, and is kind and merciful to the believers.",
      "If they turn away, say: Allah is enough for me; I trust in Him, Lord of the mighty Throne."
    ],
    takeaway: "The Prophet ﷺ cares deeply about his ummah: love him back.",
    q: [
      ["Ayah 128: what grieves the Prophet ﷺ?", "Our hardship", "Our wealth", "Our games", "Our homes"],
      ["Ayah 129: what should we say if people turn away?", "Allah is enough for me", "I give up", "I am alone", "I will get angry"]
    ]
  }
};
