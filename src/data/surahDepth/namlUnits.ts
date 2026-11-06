import type { LessonSource } from "../../types";
import { hadith, quranQuote, saadi, type DeepUnit } from "../deepKit";

// Surah An-Naml ayah by ayah, the way the surahs before it are taught: every ayah or small group of ayahs gets a lesson,
// explained as Tafsir Ibn Kathir explains it (the abridged English on quran.com), with a sahih hadith where one explains
// the ayah. Each source opens at the highlighted words that say the lesson's point.

/** Tafsir Ibn Kathir on An-Naml 27:ayah, on quran.com, opened at `highlight` (words copied from that page). */
function ik(ayah: number, summary: string, highlight: string): LessonSource {
  return {
    id: `deep_ibn_kathir_27_${ayah}`,
    site: "Quran.com",
    category: "tafsir",
    title: `Tafsir Ibn Kathir on An-Naml 27:${ayah}`,
    url: `https://quran.com/27:${ayah}/tafsirs/en-tafisr-ibn-kathir`,
    reference: `Tafsir Ibn Kathir 27:${ayah}`,
    from: "Tafsir Ibn Kathir (abridged English), on Quran.com",
    grade: "Tafsir",
    summary,
    highlight
  };
}


const q27 = (ayah: number) => quranQuote(27, ayah);

/** Ayahs 1 to 19: the Quran as guidance, Musa at the fire and his signs, Dawud and Sulayman, the language of birds, and the valley of the ants. */
const NAML_ONE: DeepUnit = {
  key: "naml1",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-27",
  name: "An-Naml, ayahs 1 to 19",
  kind: "skill",
  lessonType: "surah",
  surahName: "An-Naml",
  lessons: [
    {
      slug: "guide-and-good-news",
      title: "A guide and good news",
      line: "The Quran guides believers and gives them good news.",
      facts: ["Ta Sin opens the surah", "A clear Book"],
      quote: q27(2),
      source: ik(2, "These are the ayahs of the Quran, a clear Book. Guidance and good news come from it for those who believe in it, follow it and put it into practice.", "for those who believe in it, follow it and put it into practice"),
      difficulty: 2,
      questions: [
        { q: "Who gets guidance from the Quran, per Ibn Kathir?", a: "Those who follow and practice it", wrong: ["Those who only own it", "Only scholars", "Everyone, even without belief"], why: "Guidance and good news may be attained from it for those who believe in it, follow it and put it into practice." },
        { q: "What two things is the Quran, in 27:2?", a: "A guide and glad tidings", wrong: ["A poem and a song", "A law and a tax", "A map and a story"], why: "A guide and glad tidings for the believers." },
        { tf: true, q: "An-Naml begins with the letters Ta Sin.", why: "Ta Sin. These are the Ayat of the Qur'an, and (it is) a Book (that is) clear." }
      ]
    },
    {
      slug: "the-believers-described",
      title: "Who the believers are",
      line: "Believers pray, give zakah and are certain of the Hereafter.",
      facts: ["Certainty of the Hereafter", "Deeds follow belief"],
      quote: q27(3),
      source: ik(3, "The believers who benefit are those who establish the obligatory prayers, pay zakah and believe with certainty in the Hereafter: the resurrection, and the reward for every deed.", "They establish obligatory prayers, pay Zakah and believe with certain faith in the Hereafter"),
      difficulty: 2,
      questions: [
        { q: "Which three things describe the believers, in 27:3?", a: "Salah, zakah, certainty of the Hereafter", wrong: ["Travel, trade, poetry", "Wealth, fame, power", "Sleep, food, rest"], why: "Those who perform the Salah and give the Zakah and they believe with certainty in the Hereafter." },
        { q: "What does belief in the Hereafter include, per Ibn Kathir?", a: "Resurrection and reward for deeds", wrong: ["Only this life", "Nothing after death", "Only dreams"], why: "The resurrection after death, reward and punishment for all deeds, good and bad." },
        { tf: false, q: "Guidance comes from reading the Quran without acting on it.", why: "For those who believe in it, follow it and put it into practice." }
      ]
    },
    {
      slug: "from-the-all-wise",
      title: "From the All-Wise, All-Knowing",
      line: "The Prophet ﷺ received the Quran from the All-Wise, All-Knowing.",
      facts: ["His word is truth", "His rulings are just"],
      quote: q27(6),
      source: ik(6, "The Prophet ﷺ was receiving the Quran from One who is wise in His commands and knows all things, great and small. Whatever He says is absolute truth, and His rulings are entirely fair and just.", "Whatever He says is absolute Truth, and His rulings are entirely fair and just"),
      difficulty: 2,
      questions: [
        { q: "What did Qatadah say being taught means, in 27:6?", a: "Receiving", wrong: ["Writing", "Forgetting", "Selling"], why: "Qatadah said: are being taught means Are receiving." },
        { q: "What are Allah's rulings, per Ibn Kathir?", a: "Entirely fair and just", wrong: ["Sometimes unfair", "Only for Arabs", "Hard to trust"], why: "Whatever He says is absolute Truth, and His rulings are entirely fair and just." },
        { tf: true, q: "Allah knows all things, major and minor.", why: "And Who knows all things, major and minor." }
      ]
    },
    {
      slug: "musa-sees-a-fire",
      title: "Musa sees a fire",
      line: "Lost at night, Musa saw a fire and went to it.",
      facts: ["He traveled with his family", "He came back with great news"],
      quote: q27(7),
      source: ik(7, "Musa was traveling with his family at night, in the dark, and lost his way. He saw a fire by the mountain and said he would bring news of the road or an ember to keep them warm. He came back with great news and great light.", "Musa was traveling with his family and lost his way"),
      difficulty: 3,
      questions: [
        { q: "Why did Musa need news, per Ibn Kathir?", a: "He had lost his way", wrong: ["He was bored", "He sought a market", "He wanted a king"], why: "Musa was traveling with his family and lost his way. This was at night, in the dark." },
        { q: "What else did he hope to bring, in 27:7?", a: "An ember for warmth", wrong: ["Water", "Bread", "A lamp of gold"], why: "Or I will bring you a burning ember, that you may warm yourselves." },
        { tf: true, q: "Musa was traveling with his household.", why: "When Musa said to his household: Verily, I have seen a fire." }
      ]
    },
    {
      slug: "the-green-bush",
      title: "The bush that grew greener",
      line: "The fire burned in a green bush that only grew greener.",
      facts: ["Ibn Abbas: it was shining light", "Allah is unlike His creation"],
      quote: q27(8),
      source: ik(8, "Musa found the fire burning in a green bush; the fire grew brighter while the bush grew greener. Ibn Abbas said it was not fire but shining light. Allah is glorified, utterly unlike His creation.", "the fire was burning in a green bush"),
      difficulty: 3,
      questions: [
        { q: "Where was the fire burning, per Ibn Kathir?", a: "In a green bush", wrong: ["On a rock", "In a tent", "On the water"], why: "The fire was burning in a green bush, and the fire was burning ever brighter while the bush was growing ever more green." },
        { q: "What did Ibn Abbas say the fire was?", a: "Shining light", wrong: ["A campfire", "A star", "Lightning"], why: "Ibn Abbas and others said: It was not a fire, rather it was shining light." },
        { q: "Who is around about it, per Ibn Abbas, in 27:8?", a: "The angels", wrong: ["Shepherds", "Jinn", "Musa's family"], why: "And whosoever is round about it means, of the angels." }
      ]
    },
    {
      slug: "messengers-fear-not",
      title: "Messengers do not fear before Me",
      line: "Musa's stick moved like a snake; Allah said: fear not.",
      facts: ["Jann: a fast, agile snake", "Musa was chosen as Messenger"],
      quote: q27(10),
      source: ik(10, "Allah told Musa to throw down his stick, and it moved like a fast, agile snake. Musa ran without looking back. Allah said: do not fear, the Messengers do not fear before Me, for I am choosing you as a great Prophet.", "for I want to choose you as a Messenger and make you a great Prophet"),
      difficulty: 3,
      questions: [
        { q: "What is a Jann, per Ibn Kathir?", a: "A fast, agile snake", wrong: ["A big fish", "A bird", "A lion"], why: "Jann refers to a type of snake that is the fastest-moving and most agile." },
        { q: "What did Musa do when he saw it move?", a: "Turned and fled", wrong: ["Grabbed it at once", "Laughed", "Sat down"], why: "He turned in flight, and did not look back." },
        { q: "Why need Musa not fear, per Ibn Kathir?", a: "Allah was choosing him", wrong: ["The snake was asleep", "It was a dream", "Harun was there"], why: "For I want to choose you as a Messenger and make you a great Prophet." }
      ]
    },
    {
      slug: "evil-changed-for-good",
      title: "Evil changed for good",
      line: "Whoever wrongs, then turns to good, finds Allah forgiving.",
      facts: ["Good news for all people", "Repentance is accepted"],
      quote: q27(11),
      source: ik(11, "Except one who did wrong and then changed evil for good: Allah is Oft-Forgiving, Most Merciful. Ibn Kathir calls this good news for mankind: whoever gives up a sin, repents and turns to Allah, Allah accepts it.", "whoever does an evil deed then gives it up and repents and turns to Allah, Allah will accept his repentance"),
      difficulty: 3,
      questions: [
        { q: "What does 27:11 promise the one who changes?", a: "Allah is Oft-Forgiving", wrong: ["No hope", "Only punishment", "A long wait"], why: "Then surely, I am Oft-Forgiving, Most Merciful." },
        { q: "Why is this good news for mankind?", a: "Repentance is accepted", wrong: ["Sins do not matter", "Only Prophets are forgiven", "Deeds are erased anyway"], why: "Whoever does an evil deed then gives it up and repents and turns to Allah, Allah will accept his repentance." },
        { tf: true, q: "Repenting means giving up the sin and turning to Allah.", why: "Whoever does an evil deed then gives it up and repents and turns to Allah." }
      ]
    },
    {
      slug: "two-of-nine-signs",
      title: "Two of nine signs",
      line: "Musa's shining hand and stick were two of nine signs.",
      facts: ["His hand came out shining", "Sent to a rebellious people"],
      quote: q27(12),
      source: ik(12, "Allah told Musa to put his hand into his garment; it came out white and shining like the moon or a flash of lightning, unharmed. The stick and the hand were two of the nine signs he took to Fir'awn.", "these are two of the nine signs"),
      difficulty: 3,
      questions: [
        { q: "How many signs did Musa take, in 27:12?", a: "Nine", wrong: ["Three", "Seven", "Twelve"], why: "Among the nine signs you will take to Fir'awn and his people." },
        { q: "How did his hand look, per Ibn Kathir?", a: "White and shining", wrong: ["Burned", "Bleeding", "Covered in gold"], why: "It came out white and shining as if it were a piece of the moon or a flash of dazzling lightning." },
        { tf: false, q: "Musa's hand was hurt by the sign.", why: "It will come forth white without hurt." }
      ]
    },
    {
      slug: "denied-yet-convinced",
      title: "Denied, yet convinced",
      line: "They knew it was true, yet denied it out of pride.",
      facts: ["They called it magic", "Pride blocked the truth"],
      quote: q27(14),
      source: ik(14, "When the clear signs came, they called them magic. They denied them with their tongues though deep down they knew it was the truth from Allah, out of wrongdoing and pride.", "they knew deep down that this was truth from Allah"),
      difficulty: 4,
      questions: [
        { q: "What did they call the signs, in 27:13?", a: "Clear magic", wrong: ["A miracle", "A dream", "A gift"], why: "They said: This is a manifest magic." },
        { q: "What did they know deep down, per Ibn Kathir?", a: "It was truth from Allah", wrong: ["It was fake", "Musa was weak", "Nothing at all"], why: "They knew deep down that this was truth from Allah, but they denied it and were stubborn and arrogant." },
        { q: "Why did they deny, in 27:14?", a: "Wrongfully and arrogantly", wrong: ["They had no proof shown", "They were asleep", "Musa asked them to"], why: "And they belied them wrongfully and arrogantly, though they themselves were convinced thereof." }
      ]
    },
    {
      slug: "what-sulayman-inherited",
      title: "What Sulayman inherited",
      line: "Sulayman inherited prophethood and rule from Dawud, not wealth.",
      facts: ["Both praised Allah for knowledge", "Prophets leave no inheritance"],
      quote: q27(16),
      source: ik(16, "Allah gave knowledge to Dawud and Sulayman, and they praised Him. Sulayman inherited from Dawud kingship and prophethood, not wealth, since Dawud had many sons and the wealth of Prophets is not inherited.", "the inheritance of kingship and prophethood"),
      difficulty: 4,
      questions: [
        { q: "What did Sulayman inherit, per Ibn Kathir?", a: "Kingship and prophethood", wrong: ["Only gold", "Only land", "Only horses"], why: "What is meant is the inheritance of kingship and prophethood." },
        { q: "What did both say, in 27:15?", a: "All praise be to Allah", wrong: ["We earned this", "We are the best", "Nothing"], why: "All praise be to Allah, Who has preferred us above many of His believing servants!" },
        { tf: false, q: "Sulayman inherited Dawud's wealth alone.", why: "What is meant here is not wealth, because if that were the case, Sulayman would not have been singled out." }
      ]
    },
    {
      slug: "prophets-leave-charity",
      title: "What Prophets leave is charity",
      line: "The Prophet ﷺ said: what Prophets leave is charity.",
      facts: ["Prophets leave knowledge", "Their wealth goes to charity"],
      quote: q27(16),
      source: hadith("bukhari", "6727", "Aisha", "Sahih", "The Prophet ﷺ said: our property, as Prophets, is not inherited; whatever we leave is to be spent in charity.", "whatever we leave, is to be spent in charity"),
      difficulty: 4,
      questions: [
        { q: "What happens to what Prophets leave?", a: "It is spent in charity", wrong: ["Their sons take it", "It is buried", "The king takes it"], why: "Our property should not be inherited, and whatever we leave, is to be spent in charity." },
        { q: "Who narrated the hadith on what Prophets leave?", a: "Aisha", wrong: ["Abu Bakr", "Ibn Umar", "Anas"], why: "Narrated Aisha: The Prophet ﷺ said, Our property should not be inherited." },
        { q: "How does this explain 27:16?", a: "Sulayman inherited prophethood", wrong: ["He inherited gold", "He inherited nothing", "He sold the kingdom"], why: "Rather what is meant is the inheritance of kingship and prophethood, for the wealth of the Prophets cannot be inherited." }
      ]
    },
    {
      slug: "language-of-birds",
      title: "The language of birds",
      line: "Allah taught Sulayman to understand birds and animals.",
      facts: ["Men, jinn and birds served him", "An evident grace from Allah"],
      quote: q27(16),
      source: ik(16, "Sulayman said he had been taught the language of birds and given all things a king needs. He knew the language of birds and animals, something not given to any other human as far as we know.", "He also knew the language of the birds and animals"),
      difficulty: 4,
      questions: [
        { q: "What language was Sulayman taught, in 27:16?", a: "The language of birds", wrong: ["Greek", "The language of fish", "Persian"], why: "O mankind! We have been taught the language of birds." },
        { q: "Who marched in Sulayman's army, in 27:17?", a: "Jinn, men and birds", wrong: ["Only men", "Only horses", "Only angels"], why: "And there were gathered before Sulayman his hosts of Jinn and men, and birds." },
        { q: "What did the birds do when it was hot?", a: "Shaded him with their wings", wrong: ["Sang songs", "Flew away", "Brought rain"], why: "When it was hot, they would shade him with their wings." }
      ]
    },
    {
      slug: "valley-of-the-ants",
      title: "The valley of the ants",
      line: "An ant warned the others, and Sulayman understood and smiled.",
      facts: ["The ant said: they perceive not", "Even an ant cared for others"],
      quote: q27(18),
      source: ik(18, "When Sulayman and his army reached the valley of the ants, an ant called: O ants, go into your homes so Sulayman and his army do not crush you without noticing. Sulayman understood what the ant said, and smiled.", "Sulayman, peace be upon him, understood what the ant said"),
      difficulty: 5,
      questions: [
        { q: "What did the ant tell the others, in 27:18?", a: "Enter your dwellings", wrong: ["Attack the army", "Climb the trees", "Hide the food"], why: "O ants! Enter your dwellings, lest Sulayman and his armies should crush you." },
        { q: "What did the ant say about the army?", a: "They would not notice", wrong: ["They were cruel", "They were lost", "They were hungry"], why: "Lest Sulayman and his armies should crush you, while they perceive not." },
        { q: "What did Sulayman do, in 27:19?", a: "He smiled", wrong: ["He got angry", "He ran", "He ignored it"], why: "So he smiled, amused at her speech." }
      ]
    },
    {
      slug: "a-smile-not-a-roar",
      title: "A smile, not a roar",
      line: "Prophets mostly smiled when amused, and so did our Prophet ﷺ.",
      facts: ["As-Sa'di explains", "Prophetic manners"],
      quote: q27(19),
      source: saadi(27, 19, "As-Sa'di says Sulayman smiled at the ant's clear, caring words; Prophets have perfect manners, and their laughter is mostly a smile, as most of the Prophet's ﷺ laughter was smiling.", "كما كان الرسول صلى الله عليه وسلم جل ضحكه التبسم"),
      difficulty: 2,
      questions: [
        { q: "How did the Prophet ﷺ mostly laugh, per as-Sa'di?", a: "With a smile", wrong: ["Very loudly", "Never at all", "Only at night"], why: "Most of his ﷺ laughter was smiling, says as-Sa'di." },
        { q: "Why did Sulayman smile at the ant, per as-Sa'di on 27:19?", a: "He liked her clear, caring words", wrong: ["She was funny-looking", "She was lost", "She was tiny"], why: "He admired her eloquence and her care for the ants." },
        { tf: true, q: "Sulayman then asked Allah to help him thank Him for His blessings.", why: "As-Sa'di on 27:19." }
      ]
    },
    {
      slug: "make-me-grateful",
      title: "Make me grateful",
      line: "Sulayman asked Allah to help him give thanks and do good.",
      facts: ["Thanks for his parents too", "Join me with the righteous"],
      quote: q27(19),
      source: ik(19, "Sulayman prayed: inspire me to give thanks for Your blessings on me, like understanding birds and animals, and on my parents, whom You made Muslims; help me do deeds You love, and join me with the righteous.", "inspire me to give thanks for the blessings that You have bestowed upon me"),
      difficulty: 5,
      questions: [
        { q: "What did Sulayman ask for first, in 27:19?", a: "To be grateful", wrong: ["More soldiers", "A bigger palace", "Long life"], why: "My Lord! Grant me the power and ability that I may be grateful for Your favors." },
        { q: "Which blessing on his parents, per Ibn Kathir?", a: "Making them Muslims", wrong: ["Making them rich", "Long lives", "Many cattle"], why: "The blessings that You have bestowed upon my parents by making them Muslims who believe in You." },
        { q: "Whom did he ask to be joined with?", a: "The righteous servants", wrong: ["Great kings", "Rich traders", "Famous poets"], why: "And admit me by Your mercy among Your righteous servants." }
      ]
    }
  ]
};

/** Ayahs 20 to 44: the hoopoe, the queen of Saba, Sulayman's letter, the refused gift, the throne in a blink, and the queen's Islam. */
const NAML_TWO: DeepUnit = {
  key: "naml2",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-27",
  name: "An-Naml, ayahs 20 to 44",
  kind: "skill",
  lessonType: "surah",
  surahName: "An-Naml",
  lessons: [
    {
      slug: "the-missing-hoopoe",
      title: "The missing hoopoe",
      line: "Sulayman checked his birds and found the hoopoe missing.",
      facts: ["The hoopoe could find water", "A leader checks on his team"],
      quote: q27(20),
      source: ik(20, "Ibn Abbas said the hoopoe was an expert who showed Sulayman where water was in open land, seeing how deep it lay. One day Sulayman checked on the birds and could not see the hoopoe.", "the hoopoe was an expert who used to show Sulayman where water was"),
      difficulty: 2,
      questions: [
        { q: "What was the hoopoe's special skill?", a: "Finding water underground", wrong: ["Singing", "Carrying gold", "Guarding doors"], why: "The hoopoe was an expert who used to show Sulayman where water was." },
        { q: "What did Sulayman ask, in 27:20?", a: "Why do I not see the hoopoe?", wrong: ["Where is my throne?", "Who is hungry?", "Where is the ant?"], why: "What is the matter that I see not the hoopoe? Or is he among the absentees?" },
        { tf: true, q: "The jinn dug where the hoopoe pointed to water.", why: "Sulayman would command the Jinn to dig in that place until they brought water." }
      ]
    },
    {
      slug: "a-clear-reason",
      title: "Unless a clear reason",
      line: "Sulayman was stern but left room for a clear excuse.",
      facts: ["Fairness even when upset", "Hear before you judge"],
      quote: q27(21),
      source: ik(21, "Sulayman vowed to discipline the hoopoe unless he brought a clear reason, meaning a valid excuse. When the other birds told the hoopoe, he asked if Sulayman had made an exception, and was relieved to hear he had.", "a valid excuse"),
      difficulty: 2,
      questions: [
        { q: "What could save the hoopoe, in 27:21?", a: "A clear reason", wrong: ["A gift", "Hiding", "Flying away"], why: "Unless he brings me a clear reason, meaning, a valid excuse." },
        { q: "What did the hoopoe ask the other birds?", a: "Did he make an exception?", wrong: ["Where is the food?", "Who is king?", "Is it raining?"], why: "The hoopoe said: Did he make any exception? They said: Yes." },
        { tf: true, q: "Sulayman judged the hoopoe only after hearing him.", why: "Unless he brings me a clear reason." }
      ]
    },
    {
      slug: "news-from-saba",
      title: "News from Saba",
      line: "The hoopoe brought sure news of a queen in Saba, Yemen.",
      facts: ["She had a great throne", "Her people worshipped the sun"],
      quote: q27(23),
      source: ik(23, "The hoopoe said: I know what you do not, and bring certain news from Saba, a dynasty in Yemen. A woman rules them, Bilqis, with all she needs and a great throne. She and her people bow to the sun instead of Allah.", "they were a dynasty in Yemen"),
      difficulty: 3,
      questions: [
        { q: "Where was Saba, per Ibn Kathir?", a: "Yemen", wrong: ["Egypt", "Syria", "Iraq"], why: "Saba refers to Himyar, they were a dynasty in Yemen." },
        { q: "What did the queen's people worship, in 27:24?", a: "The sun", wrong: ["The moon", "Fire", "Statues of kings"], why: "I found her and her people worshipping the sun instead of Allah." },
        { q: "What was the queen's name, per Al-Hasan Al-Basri?", a: "Bilqis", wrong: ["Asiya", "Hajar", "Maryam"], why: "Al-Hasan Al-Basri said: This is Bilqis bint Sharahil, the queen of Saba." }
      ]
    },
    {
      slug: "he-knows-the-hidden",
      title: "He brings out the hidden",
      line: "Bow to Allah, who knows the hidden and what you reveal.",
      facts: ["Lord of the Supreme Throne", "Bow to the Creator, not the sun"],
      quote: q27(25),
      source: ik(25, "They should bow only to Allah, not to anything He created. He brings out what is hidden in the heavens and the earth and knows what you hide and what you show. He is Lord of the Supreme Throne.", "He knows everything that is hidden in the heavens and on earth"),
      difficulty: 3,
      questions: [
        { q: "Whom should people bow to, per Ibn Kathir?", a: "Allah alone", wrong: ["The sun", "The moon", "Their king"], why: "Prostrating only before Allah alone and not before anything that He has created." },
        { q: "What does Allah know, in 27:25?", a: "What we hide and reveal", wrong: ["Only what we say aloud", "Only the past", "Only big things"], why: "And knows what you conceal and what you reveal." },
        { q: "Which throne is Allah Lord of, in 27:26?", a: "The Supreme Throne", wrong: ["Bilqis's throne", "Sulayman's throne", "No throne"], why: "Allah, La ilaha illa Huwa, the Lord of the Supreme Throne!" }
      ]
    },
    {
      slug: "do-not-harm-the-hoopoe",
      title: "Animals not to be harmed",
      line: "The Prophet ﷺ forbade killing ants, bees, hoopoes and hawks.",
      facts: ["Both ant and hoopoe are in An-Naml", "Kindness to creatures"],
      quote: q27(20),
      source: hadith("abudawud", "5267", "Abdullah ibn Abbas", "Sahih", "The Prophet ﷺ prohibited killing four creatures: ants, bees, hoopoes and sparrow-hawks.", "ants, bees, hoopoes, and sparrow-hawks"),
      difficulty: 3,
      questions: [
        { q: "How many creatures did the Prophet ﷺ forbid killing?", a: "Four", wrong: ["Two", "Seven", "Ten"], why: "The Prophet ﷺ prohibited to kill four creatures." },
        { q: "Which two in the list appear in An-Naml?", a: "Ants and hoopoes", wrong: ["Bees and hawks", "Camels and cows", "Fish and frogs"], why: "Ants, bees, hoopoes, and sparrow-hawks." },
        { tf: true, q: "Bees are among the creatures protected.", why: "The Prophet ﷺ prohibited to kill four creatures: ants, bees, hoopoes, and sparrow-hawks." }
      ]
    },
    {
      slug: "the-noble-letter",
      title: "The noble letter",
      line: "Sulayman's short letter began with Bismillah.",
      facts: ["The hoopoe stood aside politely", "Do not be arrogant against me"],
      quote: q27(30),
      source: ik(30, "The hoopoe dropped Sulayman's letter to the queen and stepped aside out of good manners. It began: In the Name of Allah, the Most Gracious, the Most Merciful; do not be arrogant against me, but come to me submitting.", "This letter was the utmost in brevity and eloquence, coming straight to the point"),
      difficulty: 3,
      questions: [
        { q: "How did the letter begin, in 27:30?", a: "In the Name of Allah", wrong: ["From the great king", "Greetings, queen", "Hear my threat"], why: "In the Name of Allah, the Most Gracious, the Most Merciful." },
        { q: "What did the hoopoe do after dropping it?", a: "Stepped aside politely", wrong: ["Flew home at once", "Read it aloud", "Took a gift"], why: "Then he stepped to one side out of good manners." },
        { q: "How does Ibn Kathir describe the letter?", a: "Brief and eloquent", wrong: ["Long and angry", "Unclear", "Full of poems"], why: "This letter was the utmost in brevity and eloquence, coming straight to the point." }
      ]
    },
    {
      slug: "the-queen-consults",
      title: "The queen asks for advice",
      line: "The queen consulted her chiefs, then chose a gift over war.",
      facts: ["Her chiefs offered war", "She was wise"],
      quote: q27(35),
      source: ik(35, "The queen asked her chiefs for advice. They offered strength for war but left it to her. She said kings ruin towns they enter, and chose to send a gift instead. Qatadah praised her wisdom about how gifts affect people.", "She understood how gift-giving has a good effect on people"),
      difficulty: 4,
      questions: [
        { q: "What did the chiefs offer, in 27:33?", a: "Strength for war", wrong: ["To run away", "To pay a tax", "To convert at once"], why: "We have great strength, and great ability for war, but it is for you to command." },
        { q: "What did the queen choose to send, in 27:35?", a: "A present", wrong: ["An army", "A spy", "A threat"], why: "But verily, I am going to send him a present." },
        { q: "What would refusing the gift show, per Ibn Abbas?", a: "He is a Prophet", wrong: ["He is greedy", "He is weak", "He is lost"], why: "If he does not accept it, he is a Prophet, so follow him." }
      ]
    },
    {
      slug: "the-refused-gift",
      title: "The gift refused",
      line: "Sulayman refused her gift: what Allah gave me is better.",
      facts: ["Gold could not buy him", "Islam, not wealth"],
      quote: q27(36),
      source: ik(36, "She sent a huge gift of gold, jewels and pearls. Sulayman did not even look at it. He said: will you help me with wealth? What Allah has given me is better than what He has given you.", "did not even look at what they brought"),
      difficulty: 4,
      questions: [
        { q: "How did Sulayman treat the gift?", a: "He did not even look at it", wrong: ["He loved it", "He sold it", "He kept half"], why: "Sulayman, peace be upon him, did not even look at what they brought at all." },
        { q: "What did he say, in 27:36?", a: "What Allah gave me is better", wrong: ["Send more", "I need gold", "Thank you, queen"], why: "What Allah has given me is better than that which He has given you!" },
        { tf: true, q: "Sulayman saw the gift as a way to keep him away from calling them.", why: "Are you trying to flatter me with wealth so that I will leave you alone with your Shirk and your kingdom?" }
      ]
    },
    {
      slug: "the-throne-in-a-blink",
      title: "The throne in a blink",
      line: "One with knowledge of the Book brought her throne in a blink.",
      facts: ["A jinn offered before noon", "Sulayman thanked Allah"],
      quote: q27(40),
      source: ik(40, "A powerful jinn offered to bring the queen's throne before Sulayman rose from his seat. One with knowledge of the Scripture brought it in the blink of an eye. Sulayman said: this is from the grace of my Lord, to test whether I am grateful.", "this is one of the blessings which Allah has bestowed upon me"),
      difficulty: 4,
      questions: [
        { q: "How fast was the throne brought, in 27:40?", a: "In the blink of an eye", wrong: ["In a month", "In a year", "By noon"], why: "I will bring it to you within the twinkling of an eye!" },
        { q: "What did Sulayman call it?", a: "The grace of my Lord", wrong: ["My own power", "Luck", "Magic"], why: "This is by the grace of my Lord, to test me whether I am grateful or ungrateful!" },
        { q: "Who gains from gratitude, in 27:40?", a: "The grateful himself", wrong: ["Allah needs it", "The king", "No one"], why: "And whoever is grateful, truly, his gratitude is for himself." }
      ]
    },
    {
      slug: "a-test-not-a-boast",
      title: "A test, not a boast",
      line: "Sulayman saw his power as a test, not a reason to boast.",
      facts: ["As-Sa'di explains", "Shukr in power"],
      quote: q27(40),
      source: saadi(27, 40, "As-Sa'di says when the throne appeared, Sulayman was not fooled by his kingdom as foolish kings are; he knew it was a test from his Lord and feared falling short in thanking Him.", "فلم يغتر عليه السلام بملكه وسلطانه وقدرته كما هو دأب الملوك الجاهلين، بل علم أن ذلك اختبار من ربه"),
      difficulty: 2,
      questions: [
        { q: "How did Sulayman see his great power, per as-Sa'di?", a: "As a test from Allah", wrong: ["As his own doing", "As a reason to boast", "As luck"], why: "He knew it was a test from his Lord, says as-Sa'di." },
        { q: "Who benefits when a person gives thanks, in An-Naml 27:40?", a: "The one who thanks", wrong: ["Allah needs it", "No one", "Only kings"], why: "Whoever is grateful is grateful for his own good." },
        { tf: true, q: "Allah is Rich and Generous, giving good even to the ungrateful.", why: "As-Sa'di on 27:40." }
      ]
    },
    {
      slug: "allah-needs-no-one",
      title: "Allah needs no one",
      line: "If all were most pious, Allah's kingdom would not grow at all.",
      facts: ["Rich and Bountiful", "Our deeds are for us"],
      quote: q27(40),
      source: hadith("muslim", "2577", "Abu Dharr", "Sahih", "Allah said: O My servants, if the first and last of you, human and jinn, were as pious as the most pious heart among you, that would not add to My dominion at all. These are your deeds that I record for you.", "that would not increase My dominion in anything"),
      difficulty: 5,
      questions: [
        { q: "Would everyone's piety add to Allah's dominion?", a: "Not at all", wrong: ["Yes, greatly", "A little", "Only on Fridays"], why: "To be as pious as the most pious heart of any one man of you, that would not increase My dominion in anything." },
        { q: "Which names end 27:40?", a: "Rich, Bountiful", wrong: ["Mighty, Wise", "Hearing, Seeing", "First, Last"], why: "And whoever is ungrateful, certainly my Lord is Rich, Bountiful." },
        { tf: true, q: "Being grateful benefits the one who is grateful.", why: "And whoever is grateful, truly, his gratitude is for himself." }
      ]
    },
    {
      slug: "as-though-it-were",
      title: "As though it were the same",
      line: "Shown her changed throne, the queen gave a careful, wise answer.",
      facts: ["The throne was disguised", "She did not rush to answer"],
      quote: q27(42),
      source: ik(42, "Sulayman had the throne changed to test her. Asked if this was her throne, she did not rush to say yes or no; she said: it is as though it were the very same. Ibn Kathir calls this the height of intelligence.", "This is the ultimate in intelligence and strong resolve"),
      difficulty: 5,
      questions: [
        { q: "Why was the throne disguised, in 27:41?", a: "To test if she would be guided", wrong: ["To hide it", "To sell it", "To trick the jinn"], why: "Disguise her throne for her that we may see whether she will be guided." },
        { q: "What did she answer, in 27:42?", a: "As though it were the same", wrong: ["Yes, it is mine", "No, never", "I do not know"], why: "She said: As though it were the very same." },
        { q: "How does Ibn Kathir judge her answer?", a: "Very intelligent", wrong: ["Rude", "Foolish", "Rushed"], why: "This is the ultimate in intelligence and strong resolve." }
      ]
    },
    {
      slug: "the-glass-palace",
      title: "The palace of glass",
      line: "At a palace of glass over water, the queen submitted to Allah.",
      facts: ["She thought it was a pool", "I submit with Sulayman"],
      quote: q27(44),
      source: ik(44, "Sulayman had a great palace of glass built over flowing water. The queen thought it was a pool until told it was smooth glass. Then she said: my Lord, I have wronged myself, and I submit with Sulayman to Allah.", "a huge palace of glass beneath which water was flowing"),
      difficulty: 5,
      questions: [
        { q: "What was under the glass floor?", a: "Flowing water", wrong: ["Gold", "Sand", "Gardens"], why: "A huge palace of glass beneath which water was flowing." },
        { q: "What did she think it was?", a: "A pool", wrong: ["A mirror", "A door", "A garden"], why: "When she saw it, she thought it was a pool." },
        { q: "What did she say at last, in 27:44?", a: "I submit with Sulayman to Allah", wrong: ["I will fight", "I will return home", "Bring my throne back"], why: "My Lord! Verily, I have wronged myself, and I submit, together with Sulayman to Allah." }
      ]
    }
  ]
};

/** Ayahs 45 to 58: Salih and the nine plotters of Thamud, and Lut and his people. */
const NAML_THREE: DeepUnit = {
  key: "naml3",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-27",
  name: "An-Naml, ayahs 45 to 58",
  kind: "skill",
  lessonType: "surah",
  surahName: "An-Naml",
  lessons: [
    {
      slug: "two-quarreling-parties",
      title: "Two quarreling parties",
      line: "Salih called Thamud to Allah, and they split into two groups.",
      facts: ["Worship Allah alone", "Believers and disbelievers"],
      quote: q27(45),
      source: ik(45, "Allah sent Salih to Thamud to call them to worship Allah alone. They split into two parties quarreling with each other. Mujahid said these were the believers and the disbelievers.", "These were believers and disbelievers"),
      difficulty: 2,
      questions: [
        { q: "Who was sent to Thamud, in 27:45?", a: "Salih", wrong: ["Hud", "Lut", "Shuayb"], why: "And indeed We sent to Thamud their brother Salih." },
        { q: "What were the two parties, per Mujahid?", a: "Believers and disbelievers", wrong: ["Rich and poor", "Old and young", "Farmers and traders"], why: "Mujahid said: these were believers and disbelievers." },
        { tf: true, q: "Salih called his people to worship Allah alone.", why: "Allah sent him to call them to worship Allah alone, with no partner." }
      ]
    },
    {
      slug: "ask-for-mercy-not-harm",
      title: "Ask for mercy, not harm",
      line: "Salih asked: why rush toward harm instead of asking forgiveness?",
      facts: ["They dared him to bring harm", "Seek forgiveness for mercy"],
      quote: q27(46),
      source: ik(46, "Salih asked his people why they prayed for the punishment to come quickly, instead of asking Allah for His forgiveness and mercy.", "why are you praying for the punishment to come, and not asking Allah for His mercy"),
      difficulty: 2,
      questions: [
        { q: "What did Salih tell them to seek, in 27:46?", a: "Allah's forgiveness", wrong: ["Gold", "A new king", "Revenge"], why: "Why seek you not the forgiveness of Allah, that you may receive mercy?" },
        { q: "What were they hastening, instead of good?", a: "Harm and punishment", wrong: ["Rain", "A feast", "A journey"], why: "Why do you seek to hasten the evil before the good?" },
        { tf: false, q: "Salih wanted his people to be punished quickly.", why: "He asked why they did not seek forgiveness, that they may receive mercy." }
      ]
    },
    {
      slug: "your-omen-is-with-allah",
      title: "Your omen is with Allah",
      line: "They blamed Salih for bad luck; he said they were being tested.",
      facts: ["Bad luck is no excuse", "Everything is by Allah's decree"],
      quote: q27(47),
      source: ik(47, "Whenever something bad happened, they said it was because of Salih and his companions. He said: your omen is with Allah; you are a people being tested. Qatadah said: tested to see whether you will obey or disobey.", "You are being tested to see whether you will obey or disobey"),
      difficulty: 3,
      questions: [
        { q: "Whom did Thamud blame for bad things?", a: "Salih and his followers", wrong: ["The weather", "Their kings", "Other tribes"], why: "They said: we augur an omen from you and those with you." },
        { q: "What were they, as Salih said in 27:47?", a: "A people being tested", wrong: ["A people forgiven", "A people of angels", "A people of kings"], why: "Nay, but you are a people that are being tested." },
        { q: "Tested for what, per Qatadah?", a: "Whether they obey or disobey", wrong: ["How strong they are", "How rich they are", "How fast they run"], why: "You are being tested to see whether you will obey or disobey." }
      ]
    },
    {
      slug: "nine-mischief-makers",
      title: "Nine mischief-makers",
      line: "Nine leaders in the city spread corruption and would not reform.",
      facts: ["They led the people astray", "They were behind the camel's killing"],
      quote: q27(48),
      source: ik(48, "There were nine men in the city of Thamud who spread mischief and would not reform. They forced their opinions on the people because they were the leaders and chiefs. Ibn Abbas said they were behind the killing of the she-camel.", "they were the leaders and chiefs"),
      difficulty: 3,
      questions: [
        { q: "How many mischief-makers were in the city, in 27:48?", a: "Nine", wrong: ["Three", "Twelve", "Forty"], why: "And there were in the city nine Rahtin." },
        { q: "Why could they force their opinions?", a: "They were leaders and chiefs", wrong: ["They were Prophets", "They were strangers", "They were children"], why: "They forced their opinions on the people, because they were the leaders and chiefs." },
        { tf: true, q: "The nine would not reform themselves.", why: "Who made mischief in the land, and would not reform." }
      ]
    },
    {
      slug: "their-plot-backfired",
      title: "Their plot backfired",
      line: "They plotted at night against Salih, but Allah planned better.",
      facts: ["They swore an oath together", "They did not perceive Allah's plan"],
      quote: q27(50),
      source: ik(50, "The nine swore an oath to attack Salih and his family at night and then deny it. They plotted a plot, and Allah planned a plan while they did not perceive it. Allah caused their plot to backfire.", "But Allah planned against them and caused their plot to backfire"),
      difficulty: 4,
      questions: [
        { q: "When did they plan to strike, in 27:49?", a: "At night", wrong: ["At noon", "On a feast day", "At dawn prayer only"], why: "We shall make a secret night attack on him and his household." },
        { q: "What happened to their plot?", a: "It backfired on them", wrong: ["It succeeded", "It was delayed a year", "Salih joined it"], why: "But Allah planned against them and caused their plot to backfire." },
        { q: "What did they not perceive, in 27:50?", a: "Allah's plan", wrong: ["The road", "The night", "Their own oath"], why: "So, they plotted a plot, and We planned a plan, while they perceived not." }
      ]
    },
    {
      slug: "saved-are-the-believers",
      title: "The believers were saved",
      line: "Their homes lay empty, and Allah saved Salih and the believers.",
      facts: ["Empty houses are a lesson", "Taqwa brings rescue"],
      quote: q27(53),
      source: ik(53, "Allah destroyed the plotters and their nation, and their houses lay deserted as a sign for people who know. He saved Salih and those who believed and had Taqwa.", "He saved Salih and the people who were with him"),
      difficulty: 4,
      questions: [
        { q: "Whom did Allah save, in 27:53?", a: "Those who believed and had Taqwa", wrong: ["The nine plotters", "The richest people", "No one"], why: "And We saved those who believed, and had Taqwa of Allah." },
        { q: "What were their empty houses, in 27:52?", a: "A sign for people who know", wrong: ["A new market", "A palace", "A school"], why: "Verily, in this is indeed an Ayah for people who know." },
        { tf: true, q: "Salih and those with him were saved.", why: "He saved Salih and the people who were with him." }
      ]
    },
    {
      slug: "lut-warns-his-people",
      title: "Lut warns his people",
      line: "Lut warned his people to stop a shameful sin they did openly.",
      facts: ["They sinned openly", "Lut was a Messenger of Allah"],
      quote: q27(54),
      source: ik(54, "Allah tells us about His servant and Messenger Lut, who warned his people about a shameful sin no one had done before them, which they did openly while seeing one another.", "Allah tells us about His servant and Messenger Lut"),
      difficulty: 4,
      questions: [
        { q: "Who warned his people in 27:54?", a: "Lut", wrong: ["Salih", "Musa", "Sulayman"], why: "And (remember) Lut! When he said to his people." },
        { q: "How did his people commit their sin?", a: "Openly, seeing each other", wrong: ["Only in secret", "Only once", "By mistake"], why: "Do you commit immoral sins while you see?" },
        { tf: true, q: "Lut was a servant and Messenger of Allah.", why: "Allah tells us about His servant and Messenger Lut." }
      ]
    },
    {
      slug: "driven-out-for-purity",
      title: "Blamed for being pure",
      line: "Lut's people wanted his family out for wanting to stay clean.",
      facts: ["Purity was called a crime", "They had no other answer"],
      quote: q27(56),
      source: ik(56, "The people of Lut had no answer except to say: drive the family of Lut out of your city, they are men who want to be clean and pure. Their purity made the people uneasy.", "these are men who want to be clean and pure"),
      difficulty: 5,
      questions: [
        { q: "What did his people want, in 27:56?", a: "Drive Lut's family out", wrong: ["Make Lut king", "Build him a house", "Follow Lut"], why: "Drive out the family of Lut from your city." },
        { q: "Why did they want them out?", a: "They wanted to be pure", wrong: ["They were thieves", "They were rich", "They were strangers"], why: "Verily, these are men who want to be clean and pure!" },
        { tf: false, q: "Lut's people gave him a kind answer.", why: "There was no other answer given by his people except that they said: drive out the family of Lut." }
      ]
    },
    {
      slug: "saved-except-his-wife",
      title: "Saved, except his wife",
      line: "Lut and his family were saved, except his wife.",
      facts: ["She helped the wrongdoers", "Faith is not inherited"],
      quote: q27(57),
      source: ik(57, "Allah saved Lut and his family except his wife. She was destroyed with her people because she helped them and approved of their evil deeds.", "because she was a helper to what they did"),
      difficulty: 5,
      questions: [
        { q: "Who was not saved, in 27:57?", a: "Lut's wife", wrong: ["Lut's daughters", "Lut himself", "The guests"], why: "So, We saved him and his family, except his wife." },
        { q: "Why was his wife not saved?", a: "She helped the wrongdoers", wrong: ["She was ill", "She left early", "She was too old"], why: "Because she was a helper to what they did and she approved of their evil deeds." },
        { q: "What does 27:58 call the rain?", a: "An evil rain for the warned", wrong: ["A blessed rain", "A gentle rain", "Spring rain"], why: "So, evil was the rain of those who were warned." }
      ]
    }
  ]
};

/** Ayahs 59 to 66: praise Allah, and the questions that show no god is with Him: creation, the earth, the distressed, guidance, provision, and the Unseen. */
const NAML_FOUR: DeepUnit = {
  key: "naml4",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-27",
  name: "An-Naml, ayahs 59 to 66",
  kind: "skill",
  lessonType: "surah",
  surahName: "An-Naml",
  lessons: [
    {
      slug: "praise-and-peace",
      title: "Praise and peace",
      line: "Praise Allah, and send peace on the servants He has chosen.",
      facts: ["The chosen are the Prophets", "Companions are also included"],
      quote: q27(59),
      source: ik(59, "Allah commands His Messenger to praise Him for His countless blessings, and to send peace on His chosen servants: the Prophets and Messengers. Some said it means the Companions, and both views agree.", "He commands him to send peace upon the servants of Allah whom He chose"),
      difficulty: 2,
      questions: [
        { q: "Whom does 27:59 send peace on?", a: "Allah's chosen servants", wrong: ["All kings", "The idols", "The jinn only"], why: "And peace be on His servants whom He has chosen!" },
        { q: "Who are the chosen servants, mainly?", a: "The Prophets and Messengers", wrong: ["The angels only", "Rulers", "Poets"], why: "The meaning of the servants He has chose is the Prophets." },
        { tf: true, q: "We praise Allah for His countless blessings.", why: "Praise and thanks be to Allah, for His innumerable blessings upon His servants." }
      ]
    },
    {
      slug: "gardens-full-of-beauty",
      title: "Gardens full of beauty",
      line: "Only Allah grows the trees from rain; no one else can.",
      facts: ["Rain is His provision", "Is there a god with Allah?"],
      quote: q27(60),
      source: ik(60, "Allah created the heavens and the earth and sends rain, growing beautiful gardens. People are not able to make their trees grow. Only the Creator and Provider can do that, so He alone deserves worship.", "you are not able to cause their trees to grow"),
      difficulty: 2,
      questions: [
        { q: "What grows from the rain, in 27:60?", a: "Gardens full of beauty", wrong: ["Mountains", "Stars", "Rivers of gold"], why: "Whereby We cause to grow wonderful gardens full of beauty and delight." },
        { q: "Can people make those trees grow?", a: "No, only Allah can", wrong: ["Yes, easily", "Only kings can", "Only with idols"], why: "It is not in your ability to cause the growth of their trees." },
        { tf: true, q: "Even idol worshippers admitted Allah sends the rain.", why: "Who sends down water from the sky? They will surely reply: Allah." }
      ]
    },
    {
      slug: "a-steady-earth",
      title: "A steady earth",
      line: "Allah made the earth steady, with rivers and mountains.",
      facts: ["Mountains keep it firm", "Fresh and salt water stay apart"],
      quote: q27(61),
      source: ik(61, "Allah made the earth a stable home, placed fresh rivers in it and firm mountains to keep it steady, and set a barrier between fresh water and salt water so they do not spoil one another.", "He has placed a barrier between the fresh water and the salt water"),
      difficulty: 3,
      questions: [
        { q: "What makes the earth steady, per Ibn Kathir?", a: "Firm mountains", wrong: ["The clouds", "The rivers", "The sun"], why: "High mountains which stabilize the earth and make it steadfast." },
        { q: "What is between the two seas, in 27:61?", a: "A barrier", wrong: ["A bridge", "A wall of fire", "Nothing at all"], why: "And has set a barrier between the two seas." },
        { q: "Why are the waters kept apart?", a: "So they do not spoil each other", wrong: ["For ships to race", "To make islands", "For fish to hide"], why: "To prevent them from mixing lest they corrupt one another." }
      ]
    },
    {
      slug: "who-answers-the-distressed",
      title: "Who answers the distressed",
      line: "Only Allah answers the one in distress and removes the harm.",
      facts: ["Call on Him in hardship", "He removes the evil"],
      quote: q27(62),
      source: ik(62, "Allah is the One people call on in hardship. He is the only One the desperate turn to, and the only One who can relieve those struck by harm.", "the only One Who can relieve those who are stricken by harm"),
      difficulty: 3,
      questions: [
        { q: "Whom does Allah answer, in 27:62?", a: "The distressed who call Him", wrong: ["Only kings", "Only angels", "No one"], why: "Is not He Who responds to the distressed one, when he calls on Him." },
        { q: "Who alone relieves those struck by harm?", a: "Allah", wrong: ["Doctors alone", "Idols", "The stars"], why: "The only One Who can relieve those who are stricken by harm." },
        { tf: true, q: "Allah removes evil from those who call on Him.", why: "And Who removes the evil." }
      ]
    },
    {
      slug: "prayer-in-distress",
      title: "A prayer for hard times",
      line: "In distress, the Prophet ﷺ praised Allah, Lord of the Throne.",
      facts: ["He said La ilaha illallah", "Lord of the heavens and earth"],
      quote: q27(62),
      source: hadith("bukhari", "6346", "Abdullah ibn Abbas", "Sahih", "At times of distress, the Prophet ﷺ used to say: none has the right to be worshipped but Allah, Lord of the mighty Throne; none but Allah, Lord of the heavens and the earth, Lord of the noble Throne.", "used to say at a time of distress"),
      difficulty: 4,
      questions: [
        { q: "When did the Prophet ﷺ say this praise?", a: "At times of distress", wrong: ["Only at Eid", "Only at night", "Only when eating"], why: "Allah's Messenger ﷺ used to say at a time of distress." },
        { q: "What did he call Allah in it?", a: "Lord of the Throne", wrong: ["Lord of the market", "Lord of Arabia only", "Lord of the idols"], why: "La ilaha illallahu Rabbul arsh il azim." },
        { q: "Who narrated the prayer for distress?", a: "Abdullah ibn Abbas", wrong: ["Aisha", "Abu Hurairah", "Abu Dharr"], why: "Narrated Ibn Abbas: Allah's Messenger ﷺ used to say at a time of distress." }
      ]
    },
    {
      slug: "generation-after-generation",
      title: "Generation after generation",
      line: "Allah makes each generation inherit the earth from the last.",
      facts: ["People come one after another", "This is His wisdom"],
      quote: q27(62),
      source: ik(62, "Allah makes people inheritors of the earth: each generation inherits from the one before. By His wisdom they come one after another, so the earth is not too crowded for them.", "each generation inherits from the generation that came before them"),
      difficulty: 4,
      questions: [
        { q: "Whom does each generation inherit from?", a: "The generation before it", wrong: ["The angels", "The jinn", "No one"], why: "Each generation inherits from the generation that came before them." },
        { q: "What does 27:62 say of our remembering?", a: "Little is it", wrong: ["It is perfect", "It is enough", "It is great"], why: "Little is that you remember!" },
        { tf: false, q: "Allah created all people at one single time on earth.", why: "His wisdom ruled that they should be made generation after generation, nation after nation." }
      ]
    },
    {
      slug: "guide-in-the-darkness",
      title: "Guide in the darkness",
      line: "Allah guides travelers by stars and sends winds before rain.",
      facts: ["Stars and landmarks guide", "Winds bring good news"],
      quote: q27(63),
      source: ik(63, "Allah guides people in the darkness of land and sea by the signs He made in the sky and on earth. He sends the winds ahead of the rain clouds as good news of His mercy.", "ahead of the clouds which bring rain"),
      difficulty: 4,
      questions: [
        { q: "Where does Allah guide us, in 27:63?", a: "In darkness of land and sea", wrong: ["Only in cities", "Only by day", "Only in deserts"], why: "Is not He Who guides you in the darkness of the land and the sea." },
        { q: "What comes before His mercy, the rain?", a: "The winds", wrong: ["The snow", "The birds", "The moon"], why: "And Who sends the winds as heralds of glad tidings, going before His mercy?" },
        { tf: true, q: "Stars help people find their way.", why: "And landmarks and by the stars, they guide themselves." }
      ]
    },
    {
      slug: "bring-your-proof",
      title: "Bring your proof",
      line: "Allah creates and repeats creation; false gods have no proof.",
      facts: ["He gives provision", "False gods have no proof"],
      quote: q27(64),
      source: ik(64, "Allah originates creation and will repeat it, and provides from the sky and earth. Those who worship others are told to bring their proof, but it is known they have none.", "it is known that they have no proof or evidence"),
      difficulty: 5,
      questions: [
        { q: "What will Allah do after creating, in 27:64?", a: "Repeat it", wrong: ["Forget it", "Leave it", "Sell it"], why: "Is not He Who originates creation, and shall thereafter repeat it." },
        { q: "What are the idol worshippers asked to bring?", a: "Their proof", wrong: ["Their gold", "Their armies", "Their camels"], why: "Say: Bring forth your proofs, if you are truthful." },
        { q: "Do they have any proof?", a: "No, none at all", wrong: ["Yes, many", "Only one", "Only in books"], why: "It is known that they have no proof or evidence." }
      ]
    },
    {
      slug: "only-allah-knows-the-unseen",
      title: "Only Allah knows the Unseen",
      line: "No one in heaven or earth knows the Unseen except Allah.",
      facts: ["Not even when the Hour comes", "Jibril was told the same"],
      quote: q27(65),
      source: ik(65, "Allah commands His Messenger to tell all creation that no one in the heavens or earth knows the Unseen except Allah. Not even the time of the Resurrection is known to them.", "no one among the dwellers of heaven and earth knows the Unseen, except Allah"),
      difficulty: 5,
      questions: [
        { q: "Who knows the Unseen, in 27:65?", a: "Allah alone", wrong: ["Fortune-tellers", "The angels", "Wise people"], why: "None in the heavens and the earth knows the Unseen except Allah." },
        { q: "What answer did the Prophet ﷺ give Jibril about the Hour?", a: "He knew no more than the asker", wrong: ["Next year", "In a hundred years", "On a Friday soon"], why: "The one who is being asked about it does not know any more than the one who is asking." },
        { tf: false, q: "Some people know exactly when the Resurrection will be.", why: "Nor can they perceive when they shall be resurrected." }
      ]
    }
  ]
};

/** Ayahs 67 to 82: doubts about rising again, Allah's grace and knowledge, the Quran settles differences, trust in Allah, and the beast of the earth. */
const NAML_FIVE: DeepUnit = {
  key: "naml5",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-27",
  name: "An-Naml, ayahs 67 to 82",
  kind: "skill",
  lessonType: "surah",
  surahName: "An-Naml",
  lessons: [
    {
      slug: "tales-of-the-ancients",
      title: "Not old tales",
      line: "Deniers called rising again old tales they had heard for ages.",
      facts: ["They doubted rising from dust", "They called it old stories"],
      quote: q27(68),
      source: ik(68, "The idol worshippers thought it unlikely that bodies would be made again after becoming dust. They said: we and our forefathers have heard this for a long time and never seen it happen.", "we and our forefathers have been hearing this for a long time"),
      difficulty: 2,
      questions: [
        { q: "What did deniers doubt, in 27:67?", a: "Being raised from dust", wrong: ["That rain falls", "That the sun rises", "That trees grow"], why: "When we have become dust, shall we really be brought forth?" },
        { q: "What did they call the promise, in 27:68?", a: "Tales of the ancients", wrong: ["A new law", "A poem", "A dream"], why: "Verily, these are nothing but tales of ancients." },
        { tf: true, q: "They said their forefathers heard the same promise.", why: "Indeed we were promised this, we and our forefathers before." }
      ]
    },
    {
      slug: "travel-and-see",
      title: "Travel and see",
      line: "Travel the land, and see how Allah saved His Messengers.",
      facts: ["Earlier nations are a lesson", "Believers were saved"],
      quote: q27(69),
      source: ik(69, "Allah tells deniers to travel the land and see what happened to those who denied the Messengers, and how Allah saved the noble Messengers and the believers who followed them.", "how Allah saved from among them the noble Messengers and the believers"),
      difficulty: 2,
      questions: [
        { q: "What does 27:69 tell deniers to do?", a: "Travel the land and see", wrong: ["Stay at home", "Build towers", "Count their gold"], why: "Say to them: Travel in the land and see how has been the end of the criminals." },
        { q: "Whom did Allah save in those nations?", a: "Messengers and believers", wrong: ["The richest", "The strongest", "No one"], why: "How Allah saved from among them the noble Messengers and the believers who followed them." },
        { tf: true, q: "Old ruins show the truth of the Messengers.", why: "This will be an indication of the truth of the Message brought by the Messengers." }
      ]
    },
    {
      slug: "do-not-grieve",
      title: "Do not grieve",
      line: "Allah comforted the Prophet ﷺ: do not grieve over their plots.",
      facts: ["Allah will help and support", "His religion will prevail"],
      quote: q27(70),
      source: ik(70, "To comfort the Prophet ﷺ, Allah told him not to grieve over the deniers or be distressed by their plots, for Allah will help and support him and make his religion prevail.", "Allah will help and support you"),
      difficulty: 3,
      questions: [
        { q: "What did Allah tell the Prophet ﷺ, in 27:70?", a: "Do not grieve over them", wrong: ["Leave Makkah", "Stop preaching", "Fight at once"], why: "And grieve you not over them, nor be straitened because of what they plot." },
        { q: "What did Allah promise against their plots?", a: "Help and support", wrong: ["Gold", "A palace", "Silence"], why: "Allah will help and support you, and cause your religion to prevail." },
        { tf: true, q: "Allah comforts those who face unkind plots for the truth.", why: "Then, to comfort the Prophet ﷺ Allah says: and grieve you not over them." }
      ]
    },
    {
      slug: "full-of-grace",
      title: "Full of grace",
      line: "Allah gives people endless blessings, yet most do not thank Him.",
      facts: ["The Hour may be near", "Few give thanks"],
      quote: q27(73),
      source: ik(73, "Asked when the promise will come, Allah said it may be close behind them. Your Lord is full of grace for mankind: He gives blessings abundantly even when people wrong themselves, yet few give thanks.", "He abundantly bestows His blessings on them"),
      difficulty: 3,
      questions: [
        { q: "What is Allah full of for mankind, in 27:73?", a: "Grace", wrong: ["Anger", "Doubt", "Need"], why: "Verily, your Lord is full of grace for mankind." },
        { q: "How many people give thanks?", a: "Few of them", wrong: ["All of them", "Most of them", "None ever"], why: "Yet most of them do not give thanks." },
        { q: "What did Ibn Abbas say of what they hastened?", a: "It has come close", wrong: ["It will never come", "It is far away", "It was cancelled"], why: "That which you wish to hasten on has come close to you." }
      ]
    },
    {
      slug: "he-knows-what-hearts-hide",
      title: "He knows what hearts hide",
      line: "Allah knows what hearts hide as well as what they show.",
      facts: ["Hidden and open are the same", "All is in a Clear Book"],
      quote: q27(74),
      source: ik(74, "Allah knows what is hidden in people's hearts just as He knows what is plain to see. Nothing hidden in the heavens or the earth is outside a Clear Book.", "He knows what is hidden in their hearts just as He knows what is easily visible"),
      difficulty: 4,
      questions: [
        { q: "What does Allah know, in 27:74?", a: "What hearts hide and show", wrong: ["Only what we say", "Only what we do", "Only big things"], why: "Your Lord knows what their breasts conceal and what they reveal." },
        { q: "Where is everything hidden, in 27:75?", a: "In a Clear Book", wrong: ["Under the sea", "In a cave", "Nowhere"], why: "There is nothing hidden in the heaven and the earth but it is in a Clear Book." },
        { tf: true, q: "Allah knows our secrets as well as what we show.", why: "He knows what is hidden in their hearts just as He knows what is easily visible." }
      ]
    },
    {
      slug: "the-quran-settles-differences",
      title: "The Quran settles differences",
      line: "The Quran tells the truth where the Children of Israel differed.",
      facts: ["Isa was a noble Messenger", "A guide and mercy"],
      quote: q27(76),
      source: ik(76, "The Quran tells the Children of Israel the truth about most things they differed over, such as Isa: he was a servant of Allah and a noble Messenger. And it is guidance for believing hearts and a mercy to them.", "it is guidance for the hearts of those who believe in it"),
      difficulty: 4,
      questions: [
        { q: "To whom does the Quran explain differences, in 27:76?", a: "The Children of Israel", wrong: ["The jinn", "The angels", "The Romans"], why: "This Quran narrates to the Children of Israel most of that in which they differ." },
        { q: "What was one thing they differed over?", a: "Isa", wrong: ["The weather", "Trade", "Farming"], why: "Such as their different opinions about Isa." },
        { q: "What is the Quran for believers, in 27:77?", a: "A guide and a mercy", wrong: ["A puzzle", "A story only", "A burden"], why: "And truly, it is a guide and a mercy for the believers." }
      ]
    },
    {
      slug: "put-your-trust-in-allah",
      title: "Put your trust in Allah",
      line: "Trust Allah in every matter; you are upon the clear truth.",
      facts: ["Allah judges between people", "Keep conveying the message"],
      quote: q27(79),
      source: ik(79, "Allah will judge between people on the Day of Resurrection. So put your trust in Allah in all your affairs and convey the Message, for you are on the clear truth.", "in all your affairs, and convey the Message of your Lord"),
      difficulty: 4,
      questions: [
        { q: "In whom should we trust, in 27:79?", a: "Allah", wrong: ["Our wealth", "Our friends alone", "Luck"], why: "So, put your trust in Allah; surely, you are on manifest truth." },
        { q: "Who will judge between them, in 27:78?", a: "Your Lord", wrong: ["The kings", "The scholars", "The crowd"], why: "Verily, your Lord will decide between them by His judgement." },
        { tf: true, q: "Trust in Allah covers all of our affairs.", why: "Put your trust in Allah in all your affairs." }
      ]
    },
    {
      slug: "those-who-truly-hear",
      title: "Those who truly hear",
      line: "Only those with open hearts truly hear and accept the message.",
      facts: ["Hearts can be deaf", "The humble respond"],
      quote: q27(81),
      source: ik(81, "The Prophet ﷺ could not make the heart-dead hear what benefits them. Only those whose hearing and sight benefit their hearts, and who are humble before Allah, respond to the message.", "hearing and insight will respond to you"),
      difficulty: 5,
      questions: [
        { q: "Who truly hears, in 27:81?", a: "Those who believe in His Ayat", wrong: ["Everyone", "Only the loud", "Only the rich"], why: "You can only make to hear those who believe in Our Ayat, so they submit." },
        { q: "What kind of people respond, per Ibn Kathir?", a: "The humble before Allah", wrong: ["The proud", "The careless", "The angry"], why: "Who are humble towards Allah and to the Message that comes to them." },
        { tf: false, q: "Anyone can be forced to accept guidance.", why: "Nor can you lead the blind out of their error." }
      ]
    },
    {
      slug: "the-beast-of-the-earth",
      title: "The beast of the earth",
      line: "Near the end of time, a beast will speak to people.",
      facts: ["A sign of the Hour", "When people neglect religion"],
      quote: q27(82),
      source: ik(82, "Near the end of time, when people become corrupt and neglect Allah's commands, Allah will bring out a beast from the earth that will speak to people.", "This is the beast which will emerge at the end of time"),
      difficulty: 5,
      questions: [
        { q: "Where will the beast come from, in 27:82?", a: "From the earth", wrong: ["From the sea", "From the sky", "From a mountain cave"], why: "We shall bring out from the earth a beast for them, to speak to them." },
        { q: "When will it emerge, per Ibn Kathir?", a: "At the end of time", wrong: ["In Musa's time", "Every year", "It already left"], why: "This is the beast which will emerge at the end of time." },
        { tf: true, q: "The beast will speak to people.", why: "A beast for them, to speak to them." }
      ]
    },
    {
      slug: "hasten-to-good-deeds",
      title: "Hurry to good deeds",
      line: "Do good deeds now, before the great signs of the Hour come.",
      facts: ["Six signs are named", "The beast is one of them"],
      quote: q27(82),
      source: hadith("muslim", "2947", "Abu Hurairah", "Sahih", "The Prophet ﷺ said: hasten to do good deeds before six things happen: the sun rising from the west, the smoke, the Dajjal, the beast, a person's own death, or general turmoil.", "Hasten to do good deeds before six things happen"),
      difficulty: 5,
      questions: [
        { q: "What did the Prophet ﷺ urge before the six signs?", a: "Hurry to good deeds", wrong: ["Hide at home", "Store food", "Stop working"], why: "Hasten to do good deeds before six things happen." },
        { q: "How many things did he name?", a: "Six", wrong: ["Two", "Ten", "Forty"], why: "Hasten to do good deeds before six things happen." },
        { q: "Which is one of the six?", a: "The sun rising from the west", wrong: ["A new moon", "A big harvest", "A long winter"], why: "The rising of the sun from the west, the smoke, the Dajjal, the beast." }
      ]
    }
  ]
};

/** Ayahs 83 to 93: the gathering and questioning, night and day, the Trumpet, mountains like clouds, the reward of good deeds, and the Lord of Makkah. */
const NAML_SIX: DeepUnit = {
  key: "naml6",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-27",
  name: "An-Naml, ayahs 83 to 93",
  kind: "skill",
  lessonType: "surah",
  surahName: "An-Naml",
  lessons: [
    {
      slug: "asked-about-beliefs-and-deeds",
      title: "Asked about belief and deeds",
      line: "On that Day, deniers are asked about their beliefs and deeds.",
      facts: ["Gathered from every nation", "They will have no excuse"],
      quote: q27(84),
      source: ik(84, "On the Day of Resurrection a group from every nation who denied Allah's signs will be gathered and stand before Him. They will be asked about their beliefs and their deeds and have no excuse.", "they will be asked about their beliefs and their deeds"),
      difficulty: 2,
      questions: [
        { q: "From where are deniers gathered, in 27:83?", a: "From every nation", wrong: ["From one city", "From the sea", "Only from Makkah"], why: "We shall gather out of every nation a Fawj of those who denied Our Ayat." },
        { q: "What will they be asked about?", a: "Beliefs and deeds", wrong: ["Their clothes", "Their houses", "Their food"], why: "They will be asked about their beliefs and their deeds." },
        { tf: false, q: "The deniers will give strong excuses that day.", why: "And they will be unable to speak." }
      ]
    },
    {
      slug: "night-for-rest-day-for-light",
      title: "Night to rest, day to see",
      line: "Allah made the night for rest and the day bright for work.",
      facts: ["Darkness calms us", "Daylight lets us work"],
      quote: q27(86),
      source: ik(86, "In the darkness of night people stop their work and rest from the day. The day is full of light so they can work, earn a living and travel. These are signs for believers.", "Due to the darkness of the night they halt their activities"),
      difficulty: 2,
      questions: [
        { q: "What is the night for, in 27:86?", a: "To rest", wrong: ["To trade", "To travel far", "To build"], why: "We have made the night for them to rest therein." },
        { q: "What is the day made, in 27:86?", a: "Sight-giving, full of light", wrong: ["Dark", "Silent", "Cold"], why: "And the day sight-giving." },
        { tf: true, q: "Night and day are signs for those who believe.", why: "Verily, in this are Ayat for the people who believe." }
      ]
    },
    {
      slug: "the-trumpet-is-blown",
      title: "The Trumpet is blown",
      line: "The Trumpet is blown by Allah's command, and all come humbled.",
      facts: ["Israfil blows it", "All come to Him humbly"],
      quote: q27(87),
      source: ik(87, "The Trumpet is a horn the angel Israfil will blow by Allah's command. Those in the heavens and earth will be terrified except whom Allah wills, and all will come to Him humbled.", "who will blow into it by the command of Allah"),
      difficulty: 3,
      questions: [
        { q: "Which angel blows the Trumpet?", a: "Israfil", wrong: ["Jibril", "Mikail", "Malik"], why: "It is the angel Israfil who will blow into it by the command of Allah." },
        { q: "How will all come to Allah, in 27:87?", a: "Humbled", wrong: ["Proud", "Laughing", "Asleep"], why: "And all shall come to Him, humbled." },
        { tf: true, q: "Some will be spared the terror, as Allah wills.", why: "Will be terrified except him whom Allah wills." }
      ]
    },
    {
      slug: "mountains-pass-like-clouds",
      title: "Mountains like clouds",
      line: "Mountains look solid, yet that Day they will pass like clouds.",
      facts: ["Allah perfected all things", "He knows what we do"],
      quote: q27(88),
      source: ik(88, "You see the mountains and think they will stay forever, but they will pass away like clouds, moving from their places. Allah perfected everything He made and knows all that His servants do.", "they will move away from their places"),
      difficulty: 3,
      questions: [
        { q: "How will mountains pass, in 27:88?", a: "Like the clouds", wrong: ["Like rivers", "Like birds", "Like sand dunes"], why: "But they shall pass away as the passing away of the clouds." },
        { q: "What did Allah perfect, in 27:88?", a: "All things", wrong: ["Only the sky", "Only the sea", "Only humans"], why: "The work of Allah, Who perfected all things." },
        { tf: false, q: "Mountains will stay in place forever.", why: "They will move away from their places." }
      ]
    },
    {
      slug: "better-than-its-worth",
      title: "Better than its worth",
      line: "A good deed brings a better reward, and safety on that Day.",
      facts: ["Sincere deeds for Allah", "Ten like it"],
      quote: q27(89),
      source: ik(89, "Whoever brings a good deed, done sincerely for Allah, will have better than it: Allah will give ten like it. They will be safe from the terror of that Day.", "He will give ten like it"),
      difficulty: 4,
      questions: [
        { q: "What does a good deed earn, in 27:89?", a: "Better than its worth", wrong: ["Exactly the same", "Nothing", "Half of it"], why: "Whoever brings a good deed, will have better than its worth." },
        { q: "How many times is it given, per Ibn Kathir?", a: "Ten like it", wrong: ["Two", "Three", "One"], why: "Allah has explained elsewhere in the Quran that He will give ten like it." },
        { tf: true, q: "Doers of good will be safe from the terror that Day.", why: "And they will be safe from the terror on that Day." }
      ]
    },
    {
      slug: "ten-to-seven-hundred",
      title: "Ten to seven hundred times",
      line: "One good deed can be written ten to seven hundred times.",
      facts: ["Even an intention counts", "One bad deed is written once"],
      quote: q27(89),
      source: hadith("bukhari", "6491", "Abdullah ibn Abbas", "Sahih", "Allah ordered the good and bad deeds to be written. Intending good counts as a full good deed; doing it is written ten to seven hundred times or more. A bad deed not done is written as a good deed; done, it is written only once.", "from ten to seven hundred times to many more times"),
      difficulty: 4,
      questions: [
        { q: "How is a done good deed written?", a: "Ten to seven hundred times", wrong: ["Only once", "Twice", "Three times"], why: "Allah will write for him from ten to seven hundred times to many more times." },
        { q: "What if one only intends a good deed?", a: "A full good deed", wrong: ["Nothing", "Half a deed", "A bad deed"], why: "Allah will write for him a full good deed." },
        { q: "How is a bad deed that is done written?", a: "As one bad deed", wrong: ["As ten", "As seventy", "As a good deed"], why: "Then Allah will write one bad deed." }
      ]
    },
    {
      slug: "repaid-for-what-we-did",
      title: "Repaid for what we did",
      line: "Those who bring only bad deeds are repaid for what they did.",
      facts: ["Allah is never unjust", "Good deeds can outweigh bad"],
      quote: q27(90),
      source: ik(90, "Whoever comes to Allah with bad deeds and no good deeds, or whose bad deeds outweigh the good, will meet the Fire, and be told: are you repaid anything but what you used to do?", "whose evil deeds outweigh his good deeds"),
      difficulty: 4,
      questions: [
        { q: "Who is meant by bringing an evil deed, in 27:90?", a: "One whose bad outweighs good", wrong: ["Anyone who slips once", "Only animals", "No one at all"], why: "Whoever comes to Allah with evil deeds, and with no good deeds to his credit, or whose evil deeds outweigh his good deeds." },
        { q: "What are they repaid with, in 27:90?", a: "Only what they used to do", wrong: ["More than they did", "Others' deeds", "Nothing at all"], why: "Are you being recompensed anything except what you used to do?" },
        { tf: true, q: "Allah repays people only for what they themselves did.", why: "Are you being recompensed anything except what you used to do?" }
      ]
    },
    {
      slug: "lord-of-this-city",
      title: "Lord of this city",
      line: "The Prophet ﷺ was told to worship the Lord of Makkah alone.",
      facts: ["Allah made Makkah sacred", "Everything belongs to Him"],
      quote: q27(91),
      source: ik(91, "The Prophet ﷺ was commanded to worship only the Lord of this city, Makkah. Linking the word Lord to the city is a sign of honor and divine care for it. Allah made it sacred, and everything belongs to Him.", "a sign of honor and divine care for that city"),
      difficulty: 5,
      questions: [
        { q: "Which city does 27:91 mean?", a: "Makkah", wrong: ["Madinah", "Jerusalem", "Saba"], why: "This city was made sacred by Allah the day He created the heavens and the earth." },
        { q: "What does Lord of this city show?", a: "Honor and care for it", wrong: ["It is small", "It is new", "It is far away"], why: "A sign of honor and divine care for that city." },
        { tf: true, q: "Everything belongs to Allah, not only Makkah.", why: "And to Whom belongs everything." }
      ]
    },
    {
      slug: "sacred-since-creation",
      title: "Sacred since creation",
      line: "Makkah has been sacred since the heavens and earth were made.",
      facts: ["Its plants are not cut", "Its game is not chased"],
      quote: q27(91),
      source: hadith("bukhari", "1834", "Abdullah ibn Abbas", "Sahih", "On the day Makkah was opened, the Prophet ﷺ said Allah made it a sanctuary since creating the heavens and earth, until the Day of Resurrection. Its thorns are not uprooted, its game not chased, and lost things are picked up only to announce them.", "a sanctuary since the creation of the heavens and the earth"),
      difficulty: 5,
      questions: [
        { q: "Since when has Makkah been a sanctuary?", a: "Since the heavens and earth were made", wrong: ["Since Musa", "Since last century", "Since the Hijrah"], why: "Allah has made this place a sanctuary since the creation of the heavens and the earth." },
        { q: "What must not be chased in Makkah?", a: "Its game animals", wrong: ["Its pilgrims", "Its clouds", "Its merchants"], why: "Its game should not be chased." },
        { q: "Who may pick up a lost item there?", a: "One who announces it", wrong: ["Anyone who wants it", "Only kings", "No one ever"], why: "Should not be picked up except by one who would announce that publicly." }
      ]
    },
    {
      slug: "someone-is-watching",
      title: "Someone is watching",
      line: "Recite the Quran; guidance helps the guided, and Allah sees all.",
      facts: ["He is only a warner", "Allah is never unaware"],
      quote: q27(93),
      source: ik(93, "The Prophet ﷺ was told to recite the Quran: whoever is guided gains for himself. Allah will show His signs, and is never unaware of what we do. Imam Ahmad recited: when alone, do not say I am alone; say someone is watching me.", "Someone is watching me"),
      difficulty: 5,
      questions: [
        { q: "Who gains from guidance, in 27:92?", a: "The one who is guided", wrong: ["Only the Prophet ﷺ", "No one", "Only angels"], why: "Whosoever receives guidance, receives it for the good of himself." },
        { q: "What should you say when alone, per the verse Imam Ahmad recited?", a: "Someone is watching me", wrong: ["I am alone", "No one knows", "I am free"], why: "Do not say, I am alone. Rather say, Someone is watching me." },
        { tf: false, q: "Allah is sometimes unaware of what we do.", why: "And your Lord is not unaware of what you do." }
      ]
    }
  ]
};

export const NAML_UNITS: readonly DeepUnit[] = [NAML_ONE, NAML_TWO, NAML_THREE, NAML_FOUR, NAML_FIVE, NAML_SIX];
