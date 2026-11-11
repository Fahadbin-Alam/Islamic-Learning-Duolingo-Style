import { hadith, quran, quranQuote, type DeepUnit } from "./deepKit";

// Two more Hajj units: what the Prophet ﷺ did at the Ka'bah, and the heart of Hajj: calm, ease for the weak,
// remembering Allah, water and food for others, and coming home. Every card is one ayah or one sahih hadith of
// al-Bukhari (number as sunnah.com gives it), with its exact English words to highlight. Fiqh details the
// schools differ on are left out, and none of these hadith is taught anywhere else in the app.

const KABAH: DeepUnit = {
  key: "hajj-kabah",
  topicId: "hajj",
  branchId: "hajj-around-the-kabah",
  branch: { title: "Around the Ka'bah", description: "Tawaf, the two corners, Safa and Marwah, and the farewell tawaf, as the Prophet ﷺ did them." },
  name: "the rites at the Ka'bah",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "tawaf-on-camel",
      title: "Tawaf on his camel",
      line: "He ﷺ did tawaf on his camel, saying Allahu akbar at the Stone.",
      facts: ["Told by Ibn Abbas", "He pointed to the Corner each time"],
      source: hadith("bukhari", "1613", "Ibn Abbas", "Sahih", "The Prophet ﷺ did tawaf of the Ka'bah riding a camel, and every time he came to the Corner of the Black Stone he pointed to it with something he had with him and said Allahu akbar.", "every time he came in front of the Corner"),
      difficulty: 1,
      questions: [
        { q: "How did he ﷺ do tawaf in Bukhari 1613?", a: "Riding a camel", wrong: ["Walking barefoot", "Riding a horse", "Carried by people"], why: "He performed Tawaf of the Ka'ba riding a camel." },
        { q: "What did he ﷺ say each time he reached the Corner?", a: "Allahu akbar", wrong: ["Nothing at all", "Labbayk only", "Subhanallah only"], why: "He pointed towards it and said Takbir." },
        { q: "He ﷺ pointed to the Black Stone each time he passed it.", tf: true, why: "Every time he came in front of the Corner, he pointed towards it." }
      ]
    },
    {
      slug: "ramal",
      title: "Brisk steps, then walking",
      line: "He ﷺ walked briskly for three rounds, then normally for four.",
      facts: ["Told by Ibn Umar", "Seven rounds in all"],
      source: hadith("bukhari", "1617", "Ibn Umar", "Sahih", "When the Prophet ﷺ did tawaf of the Ka'bah, he walked briskly (ramal) in the first three rounds and walked in the last four. Between Safa and Marwah he ran in the middle of the rain-water channel.", "he did Ramal during the first three rounds and in the last four rounds he used to walk"),
      difficulty: 1,
      questions: [
        { q: "In how many rounds did he ﷺ walk briskly?", a: "The first three", wrong: ["All seven", "Only the last one", "The last four"], why: "He did Ramal during the first three rounds." },
        { q: "How many rounds are there in tawaf?", a: "Seven", wrong: ["Three", "Ten", "Forty"], why: "Three brisk rounds and four walking rounds make seven." },
        { q: "What is ramal?", a: "Walking briskly", wrong: ["Walking very slowly", "Standing still to pray", "Sitting to make du'a"], why: "He did Ramal, then walked in the remaining rounds." }
      ]
    },
    {
      slug: "two-corners",
      title: "The two corners",
      line: "Ibn Umar always touched the Black Stone and the Yemeni Corner.",
      facts: ["Told by Nafi'", "Because he saw him ﷺ do it"],
      source: hadith("bukhari", "1606", "Nafi'", "Sahih", "Ibn Umar said: I have never missed touching these two stones of the Ka'bah, the Black Stone and the Yemeni Corner, in crowds or without crowds, since I saw the Prophet ﷺ touching them.", "I have never missed the touching of these two stones"),
      difficulty: 1,
      questions: [
        { q: "Which two corners did Ibn Umar always touch?", a: "The Black Stone and the Yemeni Corner", wrong: ["The two Syrian Corners", "The door and the roof", "Maqam Ibrahim and the door"], why: "The Black Stone and the Yemenite Corner." },
        { q: "Why did Ibn Umar touch them?", a: "He saw the Prophet ﷺ touching them", wrong: ["For good luck", "To feel the cool stone", "Someone paid him"], why: "Since I saw the Prophet ﷺ touching them." },
        { q: "Ibn Umar followed the sunnah even when it was crowded.", tf: true, why: "Both in the presence and the absence of crowds." }
      ]
    },
    {
      slug: "safa-marwah",
      title: "Between Safa and Marwah",
      line: "Safa and Marwah are among the symbols of Allah.",
      facts: ["Quran 2:158", "Where Hajar ran for water"],
      quote: quranQuote(2, 158),
      source: quran(2, 158, "Indeed, Safa and Marwah are among the symbols of Allah. So whoever makes Hajj to the House or Umrah, there is no blame on him for walking between them. And whoever does good of his own accord, Allah is Appreciative and Knowing."),
      difficulty: 2,
      questions: [
        { q: "What does Allah call Safa and Marwah?", a: "Among the symbols of Allah", wrong: ["Ordinary hills", "Old markets", "Places to play"], why: "Safa and Marwah are among the symbols of Allah." },
        { q: "Who walks between Safa and Marwah?", a: "People doing Hajj or Umrah", wrong: ["Only kings", "No one", "Only traders"], why: "Whoever makes Hajj to the House or Umrah." },
        { q: "Allah is Appreciative of any good we do by choice.", tf: true, why: "Whoever does good of his own accord, Allah is Appreciative and Knowing." }
      ]
    },
    {
      slug: "inside-the-kabah",
      title: "Praying inside the Ka'bah",
      line: "Ibn Umar prayed inside the Ka'bah where the Prophet ﷺ prayed.",
      facts: ["Told by Nafi'", "Bilal showed him the place"],
      source: hadith("bukhari", "1599", "Nafi'", "Sahih", "Whenever Ibn Umar went into the Ka'bah he walked straight ahead until about three cubits from the far wall, then prayed at the place where the Messenger of Allah ﷺ prayed, as Bilal had told him.", "till about three cubits from the wall in front of him, and then he would offer the prayer there"),
      difficulty: 2,
      questions: [
        { q: "Where did Ibn Umar pray inside the Ka'bah?", a: "Where the Prophet ﷺ had prayed", wrong: ["On the roof", "Right by the door", "In every corner"], why: "Aiming at the place where Allah's Messenger ﷺ prayed." },
        { q: "Who told Ibn Umar the exact place?", a: "Bilal", wrong: ["Anas", "Abu Hurairah", "Jabir"], why: "As Bilal had told him." },
        { q: "The Sahabah loved to follow even the places where he ﷺ prayed.", tf: true, why: "Ibn Umar walked to the exact spot before praying." }
      ]
    },
    {
      slug: "farewell-tawaf",
      title: "The farewell tawaf",
      line: "He ﷺ ended Hajj with a farewell tawaf before leaving Makkah.",
      facts: ["Told by Anas ibn Malik", "Tawaf al-wada'"],
      source: hadith("bukhari", "1764", "Anas ibn Malik", "Sahih", "The Prophet ﷺ prayed Dhuhr, Asr, Maghrib and Isha, slept a little at a place called Al-Muhassab, then rode to the Ka'bah and did the farewell tawaf.", "slept for a while at a place called Al-Mahassab and then he rode towards the"),
      difficulty: 2,
      questions: [
        { q: "What did he ﷺ do just before leaving Makkah?", a: "A farewell tawaf", wrong: ["Stood at Arafah again", "Went to Quba", "Sat in i'tikaf"], why: "He rode towards the Ka'ba and performed Tawaf al-Wada." },
        { q: "Where did he ﷺ rest before the farewell tawaf?", a: "Al-Muhassab", wrong: ["Arafah", "Quba", "Badr"], why: "He slept for a while at a place called Al-Mahassab." },
        { q: "The last rite at the Ka'bah is a tawaf around it.", tf: true, why: "He ended with Tawaf al-Wada, the farewell tawaf." }
      ]
    }
  ]
};

const SPIRIT: DeepUnit = {
  key: "hajj-spirit",
  topicId: "hajj",
  branchId: "hajj-spirit-of-hajj",
  branch: { title: "The heart of Hajj", description: "Calm in the crowds, ease for the weak, remembering Allah, water and food for others, and coming home." },
  name: "the heart of Hajj",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "be-calm",
      title: "Calm, not rushing",
      line: "He ﷺ calmed the rushing crowd: hurrying is not righteousness.",
      facts: ["Told by Ibn Abbas", "Leaving Arafah"],
      source: hadith("bukhari", "1671", "Ibn Abbas", "Sahih", "Leaving Arafah, the Prophet ﷺ heard loud shouting and camels being beaten behind him. He signalled to the people with his whip and said: O people, be calm, for hurrying is not righteousness.", "Be quiet. Hastening is not a sign of righteousness"),
      difficulty: 1,
      questions: [
        { q: "What did he ﷺ hear behind him, leaving Arafah?", a: "Shouting and camels being beaten", wrong: ["People reciting Quran", "Complete silence", "Birds singing"], why: "He heard a great hue and cry and the beating of camels behind him." },
        { q: "What did he ﷺ teach the people then?", a: "Hurrying is not righteousness", wrong: ["Run as fast as you can", "The first to arrive wins", "Push to get ahead"], why: "Hastening is not a sign of righteousness." },
        { q: "In Hajj we should stay calm, even in big crowds.", tf: true, why: "O people! Be quiet. Hastening is not a sign of righteousness." }
      ]
    },
    {
      slug: "ease-for-the-weak",
      title: "Sawdah leaves early",
      line: "Sawdah was slow, so he ﷺ let her leave Muzdalifah early.",
      facts: ["Told by Aishah", "Ease for the weak"],
      source: hadith("bukhari", "1681", "Aishah", "Sahih", "At Muzdalifah, Sawdah asked the Prophet ﷺ for permission to leave before the crowds, as she was a slow woman, and he allowed her. Aishah said she later wished she had asked permission too.", "She was a slow woman and he gave her permission"),
      difficulty: 1,
      questions: [
        { q: "Why did Sawdah ask to leave Muzdalifah early?", a: "She was slow, and wanted to beat the crowds", wrong: ["She was angry", "She wanted to go shopping", "She was going home"], why: "To leave before the rush of the people. She was a slow woman." },
        { q: "What did he ﷺ answer her?", a: "He gave her permission", wrong: ["He refused", "He told her to run", "He sent her home"], why: "She was a slow woman and he gave her permission." },
        { q: "Islam makes things easier for the weak and the slow.", tf: true, why: "He ﷺ let Sawdah leave early, before the rush." }
      ]
    },
    {
      slug: "remember-at-mashar",
      title: "Remember Him as He guided you",
      line: "Leaving Arafat, remember Allah as He has guided you.",
      facts: ["Quran 2:198", "Al-Mash'ar al-Haram, in Muzdalifah"],
      quote: quranQuote(2, 198),
      source: quran(2, 198, "There is no blame on you for seeking the bounty of your Lord. And when you leave Arafat, remember Allah at al-Mash'ar al-Haram, and remember Him as He has guided you, though before it you were among those astray."),
      difficulty: 2,
      questions: [
        { q: "After leaving Arafat, what should pilgrims do?", a: "Remember Allah", wrong: ["Go shopping only", "Sleep all day", "Argue"], why: "When you leave Arafat, remember Allah." },
        { q: "Is it wrong to trade or earn during the Hajj journey?", a: "No, there is no blame", wrong: ["Yes, it is forbidden", "Only on Fridays", "Only for kings"], why: "There is no blame on you for seeking the bounty of your Lord." },
        { q: "We remember Allah because He guided us.", tf: true, why: "Remember Him as He has guided you." }
      ]
    },
    {
      slug: "lead-him-by-the-hand",
      title: "Lead him by the hand",
      line: "Seeing a man led by a rope in tawaf, he ﷺ cut it.",
      facts: ["Told by Ibn Abbas", "No needless hardship in worship"],
      source: hadith("bukhari", "1620", "Ibn Abbas", "Sahih", "While doing tawaf of the Ka'bah, the Prophet ﷺ passed a man whose hands were tied to another man with a rope. He cut it with his own hands and said: lead him by the hand.", "he passed by a person who had tied his hands to another person with a rope"),
      difficulty: 2,
      questions: [
        { q: "What did he ﷺ see during tawaf?", a: "A man tied to another by a rope", wrong: ["A man asleep", "A man selling food", "A man running alone"], why: "A person who had tied his hands to another person with a rope." },
        { q: "What did he ﷺ do with the rope?", a: "Cut it with his own hands", wrong: ["Tied it tighter", "Left it alone", "Gave it to Bilal"], why: "The Prophet ﷺ cut it with his own hands." },
        { q: "What did he ﷺ say to do instead?", a: "Lead him by the hand", wrong: ["Pull him faster", "Carry him", "Leave him behind"], why: "Lead him by the hand." }
      ]
    },
    {
      slug: "zamzam",
      title: "Water from Zamzam",
      line: "He ﷺ drank with the people and praised those giving out water.",
      facts: ["Told by Ibn Abbas", "You are doing a good deed"],
      source: hadith("bukhari", "1635", "Ibn Abbas", "Sahih", "The Prophet ﷺ came to the drinking place and asked for water. Al-Abbas offered to fetch him water from home, as people put their hands in it, but he said: give me water to drink, and drank from it. Then he went to Zamzam, where people were drawing water for others, and said: carry on, you are doing a good deed.", "there the people were offering water to the others and working at it"),
      difficulty: 2,
      questions: [
        { q: "Which water did he ﷺ choose to drink?", a: "The same water as the people", wrong: ["Special water from home", "Only rain water", "No water at all"], why: "Give me water to drink. So, he drank from that water." },
        { q: "What did he ﷺ tell those drawing Zamzam water?", a: "Carry on, you are doing a good deed", wrong: ["Stop, it is too crowded", "Sell it to them", "Give it only to the rich"], why: "Carry on! You are doing a good deed." },
        { q: "Giving water to pilgrims is a good deed.", tf: true, why: "Carry on! You are doing a good deed." }
      ]
    },
    {
      slug: "feed-the-poor",
      title: "Eat, and feed the poor",
      line: "Mention Allah's name over the sacrifice, eat, and feed the poor.",
      facts: ["Quran 22:28", "On the known days"],
      quote: quranQuote(22, 28),
      source: quran(22, 28, "That they may witness benefits for themselves and mention the name of Allah on known days over the livestock He has provided for them. So eat from them and feed the poor in need."),
      difficulty: 2,
      questions: [
        { q: "Whose name is mentioned over the sacrifice?", a: "Allah's name", wrong: ["The buyer's name", "The animal's name", "No name"], why: "And mention the name of Allah on known days." },
        { q: "Who must also get some of the meat?", a: "The poor in need", wrong: ["Only the rich", "Only the family", "No one"], why: "So eat from them and feed the poor in need." },
        { q: "Pilgrims come to witness benefits for themselves.", tf: true, why: "That they may witness benefits for themselves." }
      ]
    },
    {
      slug: "coming-home",
      title: "Coming home from Hajj",
      line: "Coming home, he ﷺ said: we return repenting, praising our Lord.",
      facts: ["Told by Ibn Umar", "Allahu akbar on every rise"],
      source: hadith("bukhari", "1797", "Ibn Umar", "Sahih", "Whenever the Messenger of Allah ﷺ came back from Hajj or Umrah, he said Allahu akbar three times on every rise in the ground, then: none has the right to be worshipped but Allah alone, with no partner; His is the kingdom and the praise, and He has power over all things. We return repenting, worshipping, prostrating and praising our Lord.", "We are returning with repentance, worshipping, prostrating, and praising our Lord"),
      difficulty: 2,
      questions: [
        { q: "What did he ﷺ say three times on every rise?", a: "Allahu akbar", wrong: ["Subhanallah", "Labbayk", "Alhamdulillah"], why: "He used to say Takbir thrice at every elevation of the ground." },
        { q: "How did he ﷺ describe the travellers coming home?", a: "Repenting and praising our Lord", wrong: ["Tired and hungry", "Rich and proud", "Sad to be back"], why: "We are returning with repentance, worshipping, prostrating, and praising our Lord." },
        { q: "He ﷺ said these words coming home from Umrah too.", tf: true, why: "Whenever he returned from a Ghazwa, Hajj or Umra." }
      ]
    }
  ]
};

export const HAJJ_MORE_UNITS: DeepUnit[] = [KABAH, SPIRIT];
