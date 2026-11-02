import type { LessonSource } from "../../types";
import { hadith, quranQuote, type DeepUnit } from "../deepKit";

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

export const NAML_UNITS: readonly DeepUnit[] = [NAML_ONE, NAML_TWO];
