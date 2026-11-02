import type { LessonSource } from "../../types";
import { hadith, quranQuote, type DeepUnit } from "../deepKit";

// Surah As-Saff ayah by ayah, the way the surahs before it are taught: every ayah or small group of ayahs gets a lesson,
// explained as Tafsir Ibn Kathir explains it (the abridged English on quran.com), with a sahih hadith where one explains
// the ayah. Each source opens at the highlighted words that say the lesson's point.

/** Tafsir Ibn Kathir on As-Saff 61:ayah, on quran.com, opened at `highlight` (words copied from that page). */
function ik(ayah: number, summary: string, highlight: string): LessonSource {
  return {
    id: `deep_ibn_kathir_61_${ayah}`,
    site: "Quran.com",
    category: "tafsir",
    title: `Tafsir Ibn Kathir on As-Saff 61:${ayah}`,
    url: `https://quran.com/61:${ayah}/tafsirs/en-tafisr-ibn-kathir`,
    reference: `Tafsir Ibn Kathir 61:${ayah}`,
    from: "Tafsir Ibn Kathir (abridged English), on Quran.com",
    grade: "Tafsir",
    summary,
    highlight
  };
}

const q61 = (ayah: number) => quranQuote(61, ayah);

/** Ayahs 1 to 4: do what you say, keep promises, and stand together like one solid building. */
const SAFF_ONE: DeepUnit = {
  key: "saff1",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-61",
  name: "As-Saff, ayahs 1 to 4",
  kind: "skill",
  lessonType: "surah",
  surahName: "As-Saff",
  lessons: [
    {
      slug: "why-saff-came",
      title: "The most beloved deed",
      line: "Companions wished to know the deed Allah loves most.",
      facts: ["As-Saff means the row", "Revealed in Madinah"],
      quote: q61(1),
      source: hadith("tirmidhi", "3309", "Abdullah ibn Salam", "Sahih", "Abdullah ibn Salam said the Companions wished to know the deed most beloved to Allah, and Allah revealed As-Saff, which the Prophet ﷺ recited to them.", "So the Messenger of Allah recited it to us"),
      difficulty: 2,
      questions: [
        { q: "What did the Companions want to know?", a: "The deed Allah loves most", wrong: ["The date of the Hour", "The price of dates", "The way to Syria"], why: "They said: if we knew which deed was most beloved to Allah, we would do it." },
        { q: "What does As-Saff mean?", a: "The row", wrong: ["The cave", "The table", "The cow"], why: "The surah is named after the believers standing in rows, in 61:4." },
        { tf: true, q: "The Prophet ﷺ recited As-Saff to these Companions.", why: "So the Messenger of Allah recited it to us." }
      ]
    },
    {
      slug: "no-one-volunteered",
      title: "Who will ask?",
      line: "None of them dared ask, so the whole surah came to all.",
      facts: ["Imam Ahmad recorded it", "The whole surah was recited"],
      quote: q61(1),
      source: ik(1, "Ibn Kathir says none of them volunteered to ask, so the Prophet ﷺ sent a man who gathered them and recited the whole surah to them.", "None among us volunteered"),
      difficulty: 2,
      questions: [
        { q: "How many of them volunteered to ask?", a: "None", wrong: ["All of them", "Ten", "Two"], why: "None among us volunteered." },
        { q: "What did the man sent to them recite?", a: "Surat As-Saff, all of it", wrong: ["Only one ayah", "A poem", "A letter"], why: "That man gathered us and recited this Surah, Surat As-Saff, in its entirety." },
        { tf: true, q: "They heard the whole surah, not only part of it.", why: "He recited this Surah, Surat As-Saff, in its entirety." }
      ]
    },
    {
      slug: "everything-glorifies",
      title: "Everything glorifies Allah",
      line: "All in the heavens and the earth glorifies Allah.",
      facts: ["Al-Aziz: the Almighty", "Al-Hakim: the All-Wise"],
      quote: q61(1),
      source: ik(1, "Ibn Kathir quotes the ayah: whatever is in the heavens and on the earth glorifies Allah, and He is the Almighty, the All-Wise.", "Whatsoever is in the heavens and whatsoever is on the earth glorifies Allah"),
      difficulty: 2,
      questions: [
        { q: "What glorifies Allah, in 61:1?", a: "All in the heavens and earth", wrong: ["Only angels", "Only people", "Only birds"], why: "Whatsoever is in the heavens and whatsoever is on the earth glorifies Allah." },
        { q: "Which two Names end 61:1?", a: "The Almighty, the All-Wise", wrong: ["The King, the Pure", "The Near, the Answerer", "The First, the Last"], why: "And He is the Almighty, the All-Wise." },
        { tf: true, q: "Ibn Kathir explained 61:1 in earlier surahs too.", why: "We mentioned in many a places before the meaning of Allah's statement." }
      ]
    },
    {
      slug: "say-what-you-do",
      title: "Say only what you do",
      line: "Allah asks believers why they say what they do not do.",
      facts: ["Words must match deeds", "A call to the believers"],
      quote: q61(2),
      source: ik(2, "Ibn Kathir says 61:2 refutes those who do not keep their promises.", "This refutes those who neglect to fulfill their promises"),
      difficulty: 2,
      questions: [
        { q: "What does 61:2 ask the believers?", a: "Why say what you do not do?", wrong: ["Why do you sleep?", "Why do you travel?", "Why do you eat?"], why: "O you who believe! Why do you say that which you do not do?" },
        { q: "Whom does 61:2 refute, per Ibn Kathir?", a: "Those who break promises", wrong: ["Those who pray", "Those who give", "Those who fast"], why: "This refutes those who neglect to fulfill their promises." },
        { tf: true, q: "61:2 is addressed to the believers.", why: "O you who believe! Why do you say that which you do not do?" }
      ]
    },
    {
      slug: "keep-every-promise",
      title: "Keep every promise",
      line: "Scholars of the Salaf said a promise must be kept.",
      facts: ["Big or small promises", "With money or without"],
      quote: q61(2),
      source: ik(2, "Ibn Kathir says many scholars of the Salaf held that keeping a promise is a must, whether or not it involves wealth.", "it is necessary to fulfill the promise"),
      difficulty: 3,
      questions: [
        { q: "What did scholars of the Salaf say about promises?", a: "They must be kept", wrong: ["They are optional", "Only big ones count", "Only written ones count"], why: "It is necessary to fulfill the promise." },
        { q: "Does a promise need to involve money to count?", a: "No, every promise counts", wrong: ["Yes, always", "Only gold counts", "Only land counts"], why: "Regardless of whether the promise includes some type of wealth for the person receiving the promise or otherwise." },
        { tf: true, q: "A small promise to a friend can be broken freely.", why: "It is necessary to fulfill the promise, regardless of whether the promise includes some type of wealth." }
      ]
    },
    {
      slug: "signs-of-a-hypocrite",
      title: "Three signs of a hypocrite",
      line: "The Prophet ﷺ named breaking promises as a hypocrite's sign.",
      facts: ["Lying when speaking", "Betraying a trust"],
      quote: q61(2),
      source: hadith("bukhari", "33", "Abu Hurayrah", "Sahih", "The Prophet ﷺ said the signs of a hypocrite are three: he lies when he speaks, breaks his promise, and betrays a trust.", "The signs of a hypocrite are three…Whenever he promises, he always breaks it"),
      difficulty: 3,
      questions: [
        { q: "How many signs of a hypocrite are in the hadith?", a: "Three", wrong: ["One", "Seven", "Ten"], why: "The signs of a hypocrite are three." },
        { q: "What does a hypocrite do with promises?", a: "Breaks them", wrong: ["Writes them", "Keeps them", "Forgets them kindly"], why: "Whenever he promises, he always breaks it." },
        { tf: true, q: "Betraying a trust is one of the three signs.", why: "If you trust him, he proves to be dishonest." }
      ]
    },
    {
      slug: "leave-the-bad-trait",
      title: "Leave the bad trait",
      line: "Whoever has one of these traits should give it up.",
      facts: ["Four traits are named", "Change is always possible"],
      quote: q61(2),
      source: hadith("bukhari", "34", "Abdullah ibn Amr", "Sahih", "The Prophet ﷺ said whoever has one of four traits has a trait of hypocrisy until he gives it up.", "whoever has one of the following four characteristics will have one characteristic of hypocrisy unless and until he gives it up"),
      difficulty: 3,
      questions: [
        { q: "How many traits does the Prophet ﷺ name?", a: "Four", wrong: ["Two", "Six", "Nine"], why: "Whoever has the following four characteristics will be a pure hypocrite." },
        { q: "When does the bad trait stop counting?", a: "When he gives it up", wrong: ["When he grows old", "When he travels", "Never"], why: "Unless and until he gives it up." },
        { tf: true, q: "Breaking a covenant is among the four traits.", why: "Whenever he makes a covenant, he proves treacherous." }
      ]
    },
    {
      slug: "most-hateful-to-allah",
      title: "Most hateful to Allah",
      line: "Saying what you do not do is most hateful to Allah.",
      facts: ["Maqt: strong dislike", "61:3 repeats the warning"],
      quote: q61(3),
      source: ik(3, "Ibn Kathir says Allah continued the warning by saying it is most hateful to Him that you say what you do not do.", "Most hateful it is with Allah that you say that which you do not do"),
      difficulty: 3,
      questions: [
        { q: "What is most hateful to Allah, in 61:3?", a: "Saying what you do not do", wrong: ["Asking questions", "Resting at night", "Eating dates"], why: "Most hateful it is with Allah that you say that which you do not do." },
        { q: "Which bad trait did Ibn Kathir link to 61:3?", a: "Breaking promises", wrong: ["Sleeping late", "Speaking softly", "Walking fast"], why: "He mentioned breaking the promise among these four characteristics." },
        { tf: true, q: "61:3 makes the warning of 61:2 stronger.", why: "Therefore Allah implied this meaning, when He continued His admonishment." }
      ]
    },
    {
      slug: "the-dates-promise",
      title: "The promise of dates",
      line: "A mother called her son with dates, and the Prophet ﷺ asked.",
      facts: ["Even small words to children count", "Truth starts at home"],
      quote: q61(3),
      source: ik(3, "Ibn Kathir reports that a mother called her young son to give him something, and the Prophet ﷺ said that had she given nothing, a lie would be written.", "If you had not given them to him, it would have been written as a lie in your record"),
      difficulty: 3,
      questions: [
        { q: "What did the mother mean to give her son?", a: "Dates", wrong: ["A toy", "A coin", "Bread"], why: "She said, Dates." },
        { q: "What if she had given him nothing?", a: "A lie would be written", wrong: ["Nothing at all", "He would cry", "She would pay"], why: "If you had not given them to him, it would have been written as a lie in your record." },
        { tf: true, q: "Promises to children are also counted.", why: "If you had not given them to him, it would have been written as a lie in your record." }
      ]
    },
    {
      slug: "dearest-actions",
      title: "The dearest actions",
      line: "Believers wished to know the dearest deed and do it.",
      facts: ["Muqatil bin Hayyan reported it", "61:4 named a dear deed"],
      quote: q61(4),
      source: ik(4, "Ibn Kathir reports from Muqatil that the believers said they would do the dearest deeds if they knew them, and Allah told them in 61:4.", "If we only knew the dearest good actions to Allah, we would perform them"),
      difficulty: 3,
      questions: [
        { q: "What did the believers say, per Muqatil?", a: "We would do the dearest deeds", wrong: ["We are too busy", "We know enough", "We will wait"], why: "If we only knew the dearest good actions to Allah, we would perform them." },
        { q: "How did Allah answer them?", a: "He told them in 61:4", wrong: ["He gave no answer", "Through a dream", "Through a letter"], why: "Thus, Allah told them about the dearest actions to Him." },
        { tf: true, q: "Wishing to do good must be followed by doing it.", why: "Why do you say that which you do not do?" }
      ]
    },
    {
      slug: "no-false-boasting",
      title: "No false boasting",
      line: "Some boasted of deeds they never did, and 61:2 warned them.",
      facts: ["Qatadah and Ad-Dahhak said so", "Do not claim what you did not do"],
      quote: q61(2),
      source: ik(2, "Ibn Kathir reports Qatadah and Ad-Dahhak saying the ayah warned people who claimed battle deeds they did not do.", "even though they did not do any of it"),
      difficulty: 4,
      questions: [
        { q: "Who said 61:2 warned the boasters?", a: "Qatadah and Ad-Dahhak", wrong: ["Ibn Sirin and Malik", "Abu Lahab and Qarun", "Shafi and Ahmad"], why: "Qatadah and Ad-Dahhak said that this Ayah was sent down to admonish some people." },
        { q: "What was wrong with their claims?", a: "They had not done it", wrong: ["They spoke too softly", "They spoke Arabic", "They were too short"], why: "Even though they did not do any of it." },
        { tf: true, q: "Claiming good deeds you did not do is fine.", why: "This Ayah was sent down to admonish some people who used to say things they did not do." }
      ]
    },
    {
      slug: "allah-loves-the-rows",
      title: "Allah loves the rows",
      line: "Allah loves those who stand in His cause in firm rows.",
      facts: ["Order and unity", "The surah takes its name from rows"],
      quote: q61(4),
      source: ik(4, "Ibn Kathir reports Said bin Jubayr saying the Prophet ﷺ liked to line up his forces in rows, and Allah teaches the believers to do the same.", "he liked to line up his forces in rows"),
      difficulty: 3,
      questions: [
        { q: "Whom does Allah love, in 61:4?", a: "Those who stand in rows", wrong: ["Those who scatter", "Those who argue", "Those who hide"], why: "Verily, Allah loves those who fight in His cause in rows." },
        { q: "What did the Prophet ﷺ like, per Said bin Jubayr?", a: "Lining up in rows", wrong: ["Moving at night only", "Splitting up", "Waiting alone"], why: "He liked to line up his forces in rows." },
        { tf: true, q: "Allah teaches believers to keep order together.", why: "In this Surah, Allah teaches the believers to do the same." }
      ]
    },
    {
      slug: "a-solid-structure",
      title: "Like a solid building",
      line: "The rows are firm like a building whose parts hold together.",
      facts: ["Ibn Abbas explained it", "No gaps, no wobbling"],
      quote: q61(4),
      source: ik(4, "Ibn Kathir reports Ibn Abbas saying they are like a firm structure that does not move, because its parts are cemented together.", "They are like a firm structure that does not move, because its parts are cemented to each other"),
      difficulty: 4,
      questions: [
        { q: "What are the rows compared to, in 61:4?", a: "A solid structure", wrong: ["A river", "A cloud", "A tent"], why: "As if they were a solid structure." },
        { q: "Why does the structure not move, per Ibn Abbas?", a: "Its parts are cemented together", wrong: ["It is very tall", "It is made of gold", "It is empty"], why: "They are like a firm structure that does not move, because its parts are cemented to each other." },
        { tf: true, q: "Muqatil said the parts are firmly connected.", why: "Muqatil bin Hayyan said, Firmly connected to each other." }
      ]
    },
    {
      slug: "bricks-of-a-wall",
      title: "Bricks of one wall",
      line: "Believers support each other like the bricks of a wall.",
      facts: ["The Prophet ﷺ laced his fingers", "Help your brother and sister"],
      quote: q61(4),
      source: hadith("bukhari", "481", "Abu Musa al-Ash'ari", "Sahih", "The Prophet ﷺ said a believer to a believer is like the bricks of a wall, each holding up the other, and he laced his fingers.", "A faithful believer to a faithful believer is like the bricks of a wall, enforcing each other"),
      difficulty: 4,
      questions: [
        { q: "What are believers like, in the hadith?", a: "Bricks of a wall", wrong: ["Leaves in wind", "Grains of sand", "Drops of rain"], why: "A faithful believer to a faithful believer is like the bricks of a wall, enforcing each other." },
        { q: "What did the Prophet ﷺ do with his hands?", a: "Laced his fingers", wrong: ["Raised them high", "Clapped them", "Hid them"], why: "The Prophet ﷺ clasped his hands, by interlacing his fingers." },
        { tf: true, q: "Believers should hold each other up.", why: "Like the bricks of a wall, enforcing each other." }
      ]
    },
    {
      slug: "straight-rows-in-prayer",
      title: "Straight rows in prayer",
      line: "Rows matter in prayer too; the Prophet ﷺ said straighten them.",
      facts: ["Shoulder to shoulder", "Part of a complete prayer"],
      quote: q61(4),
      source: hadith("bukhari", "723", "Anas ibn Malik", "Sahih", "The Prophet ﷺ said to straighten the rows, as straight rows are part of a correct and complete prayer.", "Straighten your rows as the straightening of rows is essential for a perfect and correct prayer"),
      difficulty: 4,
      questions: [
        { q: "What did the Prophet ﷺ say about rows in prayer?", a: "Straighten them", wrong: ["Spread them apart", "Make one long line", "Skip them"], why: "Straighten your rows." },
        { q: "Why straighten the rows?", a: "For a complete prayer", wrong: ["To look tall", "To finish faster", "To save space"], why: "The straightening of rows is essential for a perfect and correct prayer." },
        { tf: true, q: "Straight rows are part of a correct prayer.", why: "The straightening of rows is essential for a perfect and correct prayer." }
      ]
    }
  ]
};

/** Ayahs 5 to 9: Musa's patience, Isa's good news of Ahmad, and Allah's light that cannot be put out. */
const SAFF_TWO: DeepUnit = {
  key: "saff2",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-61",
  name: "As-Saff, ayahs 5 to 9",
  kind: "skill",
  lessonType: "surah",
  surahName: "As-Saff",
  lessons: [
    {
      slug: "why-annoy-me",
      title: "Why do you hurt me?",
      line: "Musa asked his people why they hurt him, knowing he was sent.",
      facts: ["Musa, son of Imran", "Allah spoke to him directly"],
      quote: q61(5),
      source: ik(5, "Ibn Kathir explains Musa asked why his people annoyed him though they knew the truth of the message he brought.", "why do you annoy me even though you know my truth regarding the Message that I brought you"),
      difficulty: 2,
      questions: [
        { q: "Which prophet asked why his people hurt him?", a: "Musa", wrong: ["Nuh", "Yunus", "Hud"], why: "Musa said to his people, Why do you annoy me?" },
        { q: "What did his people know, in 61:5?", a: "That he was Allah's Messenger", wrong: ["That he was rich", "That he was a king", "That he would leave"], why: "While you know certainly that I am the Messenger of Allah to you." },
        { tf: true, q: "Allah spoke to Musa directly.", why: "His servant and Messenger Musa, son of Imran, to whom Allah spoke directly." }
      ]
    },
    {
      slug: "comfort-for-the-prophet",
      title: "Comfort for the Prophet ﷺ",
      line: "Musa's story comforted the Prophet ﷺ and taught him patience.",
      facts: ["Prophets before faced hurt too", "Patience is the answer"],
      quote: q61(5),
      source: ik(5, "Ibn Kathir says the story brings comfort to the Prophet ﷺ for what the disbelievers did to him, and orders him to be patient.", "And it orders him to be patient"),
      difficulty: 3,
      questions: [
        { q: "What did Musa's story bring the Prophet ﷺ?", a: "Comfort", wrong: ["Wealth", "Fear", "An army"], why: "This brings consolation for Allah's Messenger for what the disbelievers did to him." },
        { q: "What does the story order him to do?", a: "Be patient", wrong: ["Be angry", "Leave Makkah", "Stay silent forever"], why: "And it orders him to be patient." },
        { tf: true, q: "Other prophets were hurt by their people too.", why: "This brings consolation for Allah's Messenger for what the disbelievers among his people and others did to him." }
      ]
    },
    {
      slug: "mercy-on-musa",
      title: "May Allah have mercy on Musa",
      line: "Hurt by unfair words, the Prophet ﷺ remembered Musa's patience.",
      facts: ["Said after sharing out some wealth", "Abdullah ibn Mas'ud told him"],
      quote: q61(5),
      source: hadith("bukhari", "3405", "Abdullah ibn Mas'ud", "Sahih", "When a man called a sharing unfair, the Prophet ﷺ said: may Allah have mercy on Musa, he was harmed more than this, yet he was patient.", "May Allah bestow His Mercy on Moses…yet he endured patiently"),
      difficulty: 3,
      questions: [
        { q: "Whom did the Prophet ﷺ remember when hurt?", a: "Musa", wrong: ["Sulayman", "Yusuf", "Adam"], why: "May Allah bestow His Mercy on Moses, for he was harmed more than this." },
        { q: "What did Musa do when harmed, per the hadith?", a: "He endured patiently", wrong: ["He gave up", "He shouted", "He ran away"], why: "Yet he endured patiently." },
        { tf: true, q: "Musa was harmed even more than this.", why: "For he was harmed more (in a worse manner) than this; yet he endured patiently." }
      ]
    },
    {
      slug: "do-not-hurt-the-prophet",
      title: "Never hurt the Prophet ﷺ",
      line: "Believers are forbidden from hurting the Prophet ﷺ in any way.",
      facts: ["33:69 says the same", "Respect him in word and deed"],
      quote: q61(5),
      source: ik(5, "Ibn Kathir says believers are forbidden from harming or bothering the Prophet ﷺ in any way, as 33:69 says.", "believers are prohibited from harming or bothering the Prophet ﷺ in any way or form"),
      difficulty: 3,
      questions: [
        { q: "What are believers forbidden from, per Ibn Kathir?", a: "Hurting the Prophet ﷺ", wrong: ["Trading", "Traveling", "Building"], why: "Believers are prohibited from harming or bothering the Prophet ﷺ in any way or form." },
        { q: "Which ayah does Ibn Kathir quote?", a: "33:69", wrong: ["2:255", "112:1", "1:1"], why: "Be not like those who annoyed Musa, but Allah cleared him of that which they alleged." },
        { tf: true, q: "Allah cleared Musa of what they said about him.", why: "But Allah cleared him of that which they alleged, and he was honorable before Allah." }
      ]
    },
    {
      slug: "hearts-turned-away",
      title: "Hearts turned away",
      line: "Turning from known truth made Allah turn their hearts away.",
      facts: ["Turning away has a cost", "6:110 says the same"],
      quote: q61(5),
      source: ik(5, "Ibn Kathir says when they turned away from guidance though they knew it, Allah turned their hearts away from it.", "Allah turned their hearts away from the guidance"),
      difficulty: 4,
      questions: [
        { q: "What happened after they turned away, in 61:5?", a: "Allah turned their hearts away", wrong: ["They became kings", "They found gold", "Nothing changed"], why: "So, when they turned away, Allah turned their hearts away." },
        { q: "Did they know the guidance was true?", a: "Yes, they knew it", wrong: ["No, never", "They never heard it", "Only a few heard"], why: "When the Jews turned away from following the guidance, even though they knew it." },
        { tf: true, q: "Turning from truth you know has no effect on the heart.", why: "Allah turned their hearts away from the guidance. Instead, Allah placed doubts, suspicion and failure in their hearts." }
      ]
    },
    {
      slug: "allah-guides-not-the-rebellious",
      title: "No guidance for the rebellious",
      line: "Allah does not guide people who rebel against His command.",
      facts: ["Al-Fasiqin: the rebellious", "9:24 ends the same way"],
      quote: q61(5),
      source: ik(5, "Ibn Kathir quotes the end of 61:5 and also 9:24: Allah guides not the people who are rebellious.", "And Allah guides not the people who are rebellious"),
      difficulty: 4,
      questions: [
        { q: "Whom does Allah not guide, in 61:5?", a: "The rebellious", wrong: ["The poor", "The young", "The travelers"], why: "And Allah guides not the people who are rebellious." },
        { q: "Which ayah ends the same way, per Ibn Kathir?", a: "9:24", wrong: ["1:7", "2:2", "114:6"], why: "Similarly Allah said; And Allah guides not the people who are rebellious. (9:24)" },
        { tf: true, q: "Ibn Kathir also quotes 4:115.", why: "And whoever contradicts and opposes the Messenger ﷺ after the right path has been shown clearly to him. (4:115)" }
      ]
    },
    {
      slug: "isa-confirms-the-tawrah",
      title: "Isa confirms the Tawrah",
      line: "Isa told the Children of Israel he confirmed the Tawrah.",
      facts: ["Isa, son of Maryam", "He came after Musa"],
      quote: q61(6),
      source: ik(6, "Ibn Kathir explains Isa said the Tawrah gave good news of his coming, and his coming confirms the Tawrah.", "The Tawrah conveyed the glad tidings of my coming, and my coming confirms the truth of the Tawrah"),
      difficulty: 2,
      questions: [
        { q: "What did Isa confirm, in 61:6?", a: "The Tawrah", wrong: ["The poems", "The idols", "The old customs"], why: "Confirming the Tawrah which came before me." },
        { q: "To whom did Isa speak, in 61:6?", a: "The Children of Israel", wrong: ["The Quraysh", "The people of Ad", "The Romans only"], why: "O Children of Israel! I am the Messenger of Allah unto you." },
        { tf: true, q: "The Tawrah gave good news of Isa's coming.", why: "The Tawrah conveyed the glad tidings of my coming." }
      ]
    },
    {
      slug: "his-name-is-ahmad",
      title: "His name shall be Ahmad",
      line: "Isa gave good news of a Messenger after him named Ahmad.",
      facts: ["Ahmad is a name of Muhammad", "The good news came long before"],
      quote: q61(6),
      source: ik(6, "Ibn Kathir explains Isa gave good news of the Prophet ﷺ to come after him: the unlettered, Makkan, Arab Prophet, Ahmad.", "He is the unlettered, Makkan, Arab Prophet and Messenger, Ahmad"),
      difficulty: 3,
      questions: [
        { q: "What name did Isa give the coming Messenger?", a: "Ahmad", wrong: ["Yahya", "Ilyas", "Harun"], why: "Giving glad tidings of a Messenger to come after me, whose name shall be Ahmad." },
        { q: "Where would Ahmad be from, per Ibn Kathir?", a: "Makkah", wrong: ["Rome", "Egypt", "Persia"], why: "He is the unlettered, Makkan, Arab Prophet and Messenger, Ahmad." },
        { tf: true, q: "Ahmad is another name of Muhammad.", why: "Conveying the good news of the coming of Muhammad, whose name is also Ahmad." }
      ]
    },
    {
      slug: "last-prophet-of-israel",
      title: "The last of their prophets",
      line: "Isa was the final Messenger sent from the Children of Israel.",
      facts: ["After Muhammad, no more prophets", "Muhammad is the Last Prophet"],
      quote: q61(6),
      source: ik(6, "Ibn Kathir says Isa is the last Messenger from the Children of Israel, and after Muhammad there is no prophethood.", "is the last and final Messenger from among the Children of Israel"),
      difficulty: 3,
      questions: [
        { q: "Who was the last Messenger from Bani Israel?", a: "Isa", wrong: ["Musa", "Dawud", "Zakariyya"], why: "Isa, peace be upon him, is the last and final Messenger from among the Children of Israel." },
        { q: "What comes after Muhammad, per Ibn Kathir?", a: "No more prophets", wrong: ["Many prophets", "One more prophet", "A new book"], why: "After Muhammad, there will be no prophethood or Messengers." },
        { tf: true, q: "Isa stayed among them giving good news of Muhammad.", why: "He remained among the Children of Israel for a while, conveying the good news of the coming of Muhammad." }
      ]
    },
    {
      slug: "the-prophets-names",
      title: "Muhammad and Ahmad",
      line: "The Prophet ﷺ said: I am Muhammad and I am Ahmad.",
      facts: ["He named five names", "Both names come from praise"],
      quote: q61(6),
      source: hadith("bukhari", "3532", "Jubayr ibn Mut'im", "Sahih", "The Prophet ﷺ said he has five names: Muhammad, Ahmad, Al-Mahi, Al-Hashir and Al-Aqib.", "I have five names: I am Muhammad and Ahmad"),
      difficulty: 3,
      questions: [
        { q: "How many names did the Prophet ﷺ list?", a: "Five", wrong: ["Two", "Ten", "Ninety-nine"], why: "I have five names." },
        { q: "Which two names come first in the hadith?", a: "Muhammad and Ahmad", wrong: ["Yasin and Taha", "Al-Amin and As-Sadiq", "Mustafa and Mujtaba"], why: "I am Muhammad and Ahmad." },
        { tf: true, q: "Jubayr ibn Mut'im narrated the five names.", why: "Al-Bukhari collected in his Sahih from Jubayr bin Mut'im." }
      ]
    },
    {
      slug: "mahi-hashir-aqib",
      title: "Al-Mahi, Al-Hashir, Al-Aqib",
      line: "His other names tell his mission and that he is the last.",
      facts: ["Al-Mahi: disbelief is wiped away", "Al-Aqib: the last one"],
      quote: q61(6),
      source: hadith("bukhari", "3532", "Jubayr ibn Mut'im", "Sahih", "The Prophet ﷺ said he is Al-Hashir, the first to be raised, and Al-Aqib, after whom there is no prophet.", "Al-Hashir who will be the first to be resurrected…There will be no prophet after me"),
      difficulty: 4,
      questions: [
        { q: "What does Al-Hashir mean, in the hadith?", a: "First to be raised", wrong: ["First to travel", "First to eat", "First to build"], why: "I am Al-Hashir who will be the first to be resurrected." },
        { q: "What does Al-Aqib mean?", a: "No prophet after him", wrong: ["The tall one", "The rich one", "The traveler"], why: "There will be no prophet after me." },
        { tf: true, q: "Through Al-Mahi, Allah wipes out disbelief.", why: "I am Al-Mahi through whom Allah will eliminate infidelity." }
      ]
    },
    {
      slug: "dua-of-ibrahim",
      title: "Ibrahim's dua, Isa's news",
      line: "The Prophet ﷺ said he is Ibrahim's dua and Isa's good news.",
      facts: ["Ibrahim prayed for a Messenger", "His mother saw a light"],
      quote: q61(6),
      source: ik(6, "Ibn Kathir reports the Prophet ﷺ said he is the answer to the dua of his father Ibrahim and the good news Isa gave.", "invocation made to Allah from my father Ibrahim and the good news"),
      difficulty: 4,
      questions: [
        { q: "Whose dua did the Prophet ﷺ say he answered?", a: "Ibrahim", wrong: ["Nuh", "Lut", "Adam"], why: "I am the (result of the) invocation made to Allah from my father Ibrahim." },
        { q: "What did his mother see in a dream?", a: "A light from her", wrong: ["A river", "A bird", "A star falling"], why: "She saw a light emanating from her that radiated the palaces of Busra in Ash-Sham." },
        { tf: true, q: "Isa's good news is also named in the report.", why: "Invocation made to Allah from my father Ibrahim and the good news Isa delivered." }
      ]
    },
    {
      slug: "we-bow-only-to-allah",
      title: "We bow only to Allah",
      line: "Before An-Najashi, Ja'far said Muslims bow to Allah alone.",
      facts: ["The emigrants in Abyssinia", "Ja'far spoke for them"],
      quote: q61(6),
      source: ik(6, "Ibn Kathir reports Ja'far did not bow before the king, saying Muslims only prostrate to Allah.", "We only prostrate for Allah, the Exalted and Most Honored"),
      difficulty: 4,
      questions: [
        { q: "Who spoke for the Muslims before An-Najashi?", a: "Ja'far bin Abi Talib", wrong: ["Amr bin Al-As", "Abu Jahl", "Umarah"], why: "Ja'far said to the Muslims, I will be your speaker today." },
        { q: "Why did Ja'far not bow to the king?", a: "Muslims bow only to Allah", wrong: ["He was tired", "He was sick", "He forgot"], why: "We only prostrate for Allah, the Exalted and Most Honored." },
        { tf: true, q: "About eighty Muslims went to An-Najashi.", why: "The Messenger of Allah sent eighty men, including Abdullah bin Masud, Jafar bin Abi Talib." }
      ]
    },
    {
      slug: "najashi-believes",
      title: "An-Najashi believes",
      line: "An-Najashi said he knew of the Prophet ﷺ from the Injil.",
      facts: ["Isa's good news reached him", "The gifts were sent back"],
      quote: q61(6),
      source: ik(6, "Ibn Kathir reports An-Najashi said the Prophet ﷺ is the one they read about in the Injil, foretold by Isa.", "whom we read about in the Injil"),
      difficulty: 5,
      questions: [
        { q: "Where had An-Najashi read about the Prophet ﷺ?", a: "The Injil", wrong: ["A poem", "A map", "A letter from Rome"], why: "He is Allah's Messenger whom we read about in the Injil." },
        { q: "What did the king do with the Quraysh gifts?", a: "Sent them back", wrong: ["Kept them", "Sold them", "Hid them"], why: "The king ordered that the gifts of the idolators be returned to them." },
        { tf: true, q: "The Prophet ﷺ prayed for An-Najashi when he died.", why: "When the Prophet ﷺ received the news that An-Najashi died, he invoked Allah to forgive him." }
      ]
    },
    {
      slug: "this-is-plain-magic",
      title: "They called it magic",
      line: "When Ahmad came with clear proofs, deniers called it magic.",
      facts: ["The proofs were clear", "Name-calling is not an answer"],
      quote: q61(6),
      source: ik(6, "Ibn Kathir says when the Prophet ﷺ came with clear signs, the disbelievers said: this is plain magic.", "appeared bringing clear signs, the disbelievers and rejecters said"),
      difficulty: 4,
      questions: [
        { q: "What did the deniers call the clear proofs?", a: "Plain magic", wrong: ["Old poems", "A good dream", "True news"], why: "They said: This is plain magic." },
        { q: "Who is meant by he came, per Ibn Kathir?", a: "Ahmad, the Prophet ﷺ", wrong: ["Musa", "Firawn", "Qarun"], why: "This refers to Ahmad, who was anticipated, in accordance with the early Scriptures." },
        { tf: true, q: "The Prophet ﷺ came with clear signs.", why: "When the Prophet ﷺ appeared bringing clear signs." }
      ]
    },
    {
      slug: "who-does-more-wrong",
      title: "Who does more wrong?",
      line: "None is more unjust than one who lies about Allah.",
      facts: ["While invited to Tawhid", "Shirk is the worst wrong"],
      quote: q61(7),
      source: ik(7, "Ibn Kathir says none is more unjust than one who lies about Allah and sets up partners with Him, even while invited to Tawhid.", "none is more unjust than he who lies about Allah"),
      difficulty: 3,
      questions: [
        { q: "Who is most unjust, per Ibn Kathir?", a: "One who lies about Allah", wrong: ["One who is poor", "One who is lost", "One who is weak"], why: "None is more unjust than he who lies about Allah." },
        { q: "To what was he being invited, in 61:7?", a: "Islam", wrong: ["A feast", "A trade", "A journey"], why: "While he is being invited to Islam." },
        { tf: true, q: "61:7 ends: Allah guides not the wrongdoers.", why: "And Allah guides not the people who are wrongdoers." }
      ]
    },
    {
      slug: "blowing-out-the-sun",
      title: "Blowing out the sun",
      line: "Putting out Allah's light by mouth is like blowing out the sun.",
      facts: ["Falsehood cannot beat truth", "Their words cannot stop Islam"],
      quote: q61(8),
      source: ik(8, "Ibn Kathir says their attempt is like trying to put out the sun with one's mouth, which is impossible.", "extinguish the sun with his mouth, which is impossible"),
      difficulty: 4,
      questions: [
        { q: "What do they try to put out, in 61:8?", a: "The Light of Allah", wrong: ["A fire", "A lamp", "The stars"], why: "They intend to put out the Light of Allah with their mouths." },
        { q: "What is their attempt like, per Ibn Kathir?", a: "Blowing out the sun", wrong: ["Moving a hill", "Catching wind", "Counting sand"], why: "Similar to one's attempt to extinguish the sun with his mouth, which is impossible." },
        { tf: true, q: "Falsehood can put out the truth for good.", why: "Their attempts are similar to one's attempt to extinguish the sun with his mouth, which is impossible." }
      ]
    },
    {
      slug: "allah-perfects-his-light",
      title: "Allah perfects His light",
      line: "Allah will complete His light even though deniers hate it.",
      facts: ["Allah's promise", "No one can stop it"],
      quote: q61(8),
      source: ik(8, "Ibn Kathir quotes Allah's promise: He will bring His Light to perfection even though the disbelievers hate it.", "But Allah will bring His Light to perfection even though the disbelievers hate"),
      difficulty: 4,
      questions: [
        { q: "What will Allah do with His light, in 61:8?", a: "Bring it to perfection", wrong: ["Hide it", "Share it out", "Let it fade"], why: "But Allah will bring His Light to perfection." },
        { q: "Who hates it, in 61:8?", a: "The disbelievers", wrong: ["The angels", "The believers", "The animals"], why: "Even though the disbelievers hate it." },
        { tf: true, q: "Ibn Kathir explained similar ayahs in Surah Bara'ah.", why: "We explained the meanings of similar Ayat before, in the Tafsir of Surah Bara'ah." }
      ]
    },
    {
      slug: "religion-of-truth",
      title: "The religion of truth",
      line: "Allah sent His Messenger with guidance and the true religion.",
      facts: ["Above all other religions", "Even if idolaters hate it"],
      quote: q61(9),
      source: ik(9, "Ibn Kathir quotes 61:9: Allah sent His Messenger with guidance and the religion of truth to make it victorious over all religions.", "to make it victorious over all"),
      difficulty: 5,
      questions: [
        { q: "With what did Allah send His Messenger, in 61:9?", a: "Guidance and the true religion", wrong: ["Gold and silver", "Armies only", "Poems"], why: "He it is Who has sent His Messenger with guidance and the religion of truth." },
        { q: "Over what will the religion be victorious?", a: "All other religions", wrong: ["Only Makkah", "Only Arabia", "Nothing"], why: "To make it victorious over all (other) religions." },
        { tf: true, q: "61:9 ends: even though the idolaters hate it.", why: "Even though the idolators hate it." }
      ]
    }
  ]
};

/** Ayahs 10 to 14: the trade that saves, its rewards, and being helpers of Allah like the disciples of Isa. */
const SAFF_THREE: DeepUnit = {
  key: "saff3",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-61",
  name: "As-Saff, ayahs 10 to 14",
  kind: "skill",
  lessonType: "surah",
  surahName: "As-Saff",
  lessons: [
    {
      slug: "a-trade-that-saves",
      title: "A trade that saves",
      line: "Allah offers believers a trade that saves from punishment.",
      facts: ["Allah Himself offers it", "An answer to their question"],
      quote: q61(10),
      source: ik(10, "Ibn Kathir says the Companions wanted to know the best deeds, and Allah sent down this surah, including 61:10.", "Shall I guide you to a trade that will save you from a painful torment"),
      difficulty: 2,
      questions: [
        { q: "What does Allah offer the believers, in 61:10?", a: "A trade that saves them", wrong: ["A new home", "A long trip", "A big feast"], why: "Shall I guide you to a trade that will save you from a painful torment?" },
        { q: "What did the Companions want to know?", a: "The best deeds", wrong: ["Market prices", "The weather", "Old stories"], why: "The Companions wanted to ask the Prophet of Allah about the best actions with Allah." },
        { tf: true, q: "61:10 begins by calling the believers.", why: "O you who believe! Shall I guide you to a trade?" }
      ]
    },
    {
      slug: "a-trade-that-never-fails",
      title: "A trade that never fails",
      line: "This trade never loses and earns what a person hopes for.",
      facts: ["No loss in it", "Saved from what we fear"],
      quote: q61(10),
      source: ik(10, "Ibn Kathir calls it a great trade that never fails, earning what one wishes and saving from what one dislikes.", "this great trade that will never fail"),
      difficulty: 3,
      questions: [
        { q: "How does Ibn Kathir describe this trade?", a: "It will never fail", wrong: ["It is risky", "It is slow", "It is for the rich"], why: "Allah then explained this great trade that will never fail." },
        { q: "What does the trade earn a person?", a: "What he wishes", wrong: ["Only gold", "Fame", "Nothing"], why: "The trade that will earn one what he wishes and saves him from what he dislikes." },
        { tf: true, q: "Worldly trade can lose, but this trade cannot.", why: "This great trade that will never fail." }
      ]
    },
    {
      slug: "faith-and-striving",
      title: "Faith and striving",
      line: "The trade is believing and striving with wealth and self.",
      facts: ["Faith comes first", "Effort follows faith"],
      quote: q61(11),
      source: ik(11, "Ibn Kathir quotes 61:11: believe in Allah and His Messenger, and strive in Allah's cause with your wealth and your lives.", "strive hard and fight in the cause of Allah with your wealth and your lives"),
      difficulty: 3,
      questions: [
        { q: "What is the first part of the trade?", a: "Believing in Allah and His Messenger", wrong: ["Building houses", "Buying land", "Writing poems"], why: "That you believe in Allah and His Messenger." },
        { q: "With what do they strive, in 61:11?", a: "Their wealth and their lives", wrong: ["Their words only", "Their games", "Their clothes"], why: "Strive hard and fight in the cause of Allah with your wealth and your lives." },
        { tf: true, q: "61:11 says this is better for you, if you knew.", why: "That will be better for you, if you but know!" }
      ]
    },
    {
      slug: "better-than-worldly-trade",
      title: "Better than any market",
      line: "This trade is better than all the trading of this life.",
      facts: ["Wealth here ends", "The reward lasts"],
      quote: q61(11),
      source: ik(11, "Ibn Kathir says this is better than the trade of this life, striving for it and piling it up.", "this is better than the trade of this life and striving hard for it and amassing it"),
      difficulty: 3,
      questions: [
        { q: "What is the trade of 61:11 better than?", a: "The trade of this life", wrong: ["Nothing at all", "Only sleep", "Only games"], why: "This is better than the trade of this life and striving hard for it and amassing it." },
        { q: "What does amassing mean?", a: "Piling up", wrong: ["Giving away", "Losing", "Forgetting"], why: "Striving hard for it and amassing it." },
        { tf: true, q: "Ibn Kathir says worldly trade is better.", why: "This is better than the trade of this life." }
      ]
    },
    {
      slug: "the-best-deed",
      title: "The best deed",
      line: "Asked the best deed, the Prophet ﷺ said: faith in Allah.",
      facts: ["Faith first, then jihad", "Then an accepted Hajj"],
      quote: q61(11),
      source: hadith("bukhari", "26", "Abu Hurayrah", "Sahih", "The Prophet ﷺ was asked the best deed and said: to believe in Allah and His Messenger, then striving in Allah's cause, then an accepted Hajj.", "To believe in Allah and His Apostle"),
      difficulty: 4,
      questions: [
        { q: "What is the best deed, in the hadith?", a: "Believing in Allah and His Messenger", wrong: ["Building a house", "Traveling far", "Eating less"], why: "To believe in Allah and His Apostle." },
        { q: "What came third in the hadith?", a: "An accepted Hajj", wrong: ["Selling well", "Reading poems", "Planting trees"], why: "He replied, To perform Hajj Mabrur." },
        { tf: true, q: "The hadith and 61:11 both start with faith.", why: "That you believe in Allah and His Messenger." }
      ]
    },
    {
      slug: "sins-forgiven",
      title: "Sins forgiven",
      line: "Those who do the trade have their sins forgiven.",
      facts: ["Forgiveness comes first", "Then Paradise"],
      quote: q61(12),
      source: ik(12, "Ibn Kathir explains Allah says: if you do what I commanded, I will forgive your sins and admit you into Paradise.", "then I will forgive your sins and admit you into the Gardens of Paradise"),
      difficulty: 3,
      questions: [
        { q: "What is the first reward in 61:12?", a: "Forgiveness of sins", wrong: ["Gold", "Fame", "Long life"], why: "He will forgive you your sins." },
        { q: "When will Allah forgive, per Ibn Kathir?", a: "If they do as He commanded", wrong: ["Whatever they do", "Only on Fridays", "Never"], why: "If you fulfill what I commanded you and guided you to, then I will forgive your sins." },
        { tf: true, q: "Paradise is also promised in 61:12.", why: "And admit you into Gardens under which rivers flow." }
      ]
    },
    {
      slug: "pleasant-dwellings",
      title: "Pleasant homes in Adn",
      line: "Gardens with rivers and fine homes in eternal Paradise await.",
      facts: ["Adn: everlasting", "High places of honor"],
      quote: q61(12),
      source: ik(12, "Ibn Kathir says in the Gardens they will have exalted residences and high positions.", "you will have exalted residences"),
      difficulty: 4,
      questions: [
        { q: "What flows under the Gardens, in 61:12?", a: "Rivers", wrong: ["Sand", "Snow", "Smoke"], why: "Gardens under which rivers flow." },
        { q: "What does Adn mean, in 61:12?", a: "Eternal", wrong: ["Small", "Far", "Old"], why: "And pleasant dwellings in Adn (Eternal) Paradise." },
        { tf: true, q: "They will have exalted homes, per Ibn Kathir.", why: "In them, you will have exalted residences and high positions." }
      ]
    },
    {
      slug: "the-great-success",
      title: "The great success",
      line: "Forgiveness and Paradise are the truly great success.",
      facts: ["Al-Fawz al-Azim", "Success is in the Hereafter"],
      quote: q61(12),
      source: ik(12, "Ibn Kathir quotes the end of 61:12: that is indeed the great success.", "that is indeed the great success"),
      difficulty: 4,
      questions: [
        { q: "What does 61:12 call this reward?", a: "The great success", wrong: ["A small gift", "A hard test", "A short rest"], why: "That is indeed the great success." },
        { q: "What comes with it, in 61:12?", a: "Gardens and fine homes", wrong: ["Ships and gold", "Farms and cattle", "Crowns and thrones"], why: "Gardens under which rivers flow, and pleasant dwellings in Adn Paradise." },
        { tf: true, q: "True success is Allah's forgiveness and Paradise.", why: "He will forgive you your sins, and admit you into Gardens. That is indeed the great success." }
      ]
    },
    {
      slug: "another-blessing",
      title: "Another blessing you love",
      line: "Allah adds another gift they love: help and near victory.",
      facts: ["Help in this life", "Reward in the next"],
      quote: q61(13),
      source: ik(13, "Ibn Kathir explains Allah says: I will grant you more favors that you like, help from Allah and a near victory.", "I will grant you more favors that you like"),
      difficulty: 4,
      questions: [
        { q: "What extra gift is promised, in 61:13?", a: "Help and near victory", wrong: ["Rain and crops", "Gold and silk", "Sleep and rest"], why: "Help from Allah and a near victory." },
        { q: "Who gives the help, in 61:13?", a: "Allah", wrong: ["Kings", "Traders", "Poets"], why: "Help from Allah and a near victory." },
        { tf: true, q: "61:13 says the believers love this blessing.", why: "And also another blessing which you love." }
      ]
    },
    {
      slug: "help-allah-he-helps-you",
      title: "Help and you are helped",
      line: "Whoever supports Allah's religion, Allah supports them.",
      facts: ["47:7 says so", "22:40 says so too"],
      quote: q61(13),
      source: ik(13, "Ibn Kathir quotes 47:7: if you help the cause of Allah, He will help you and make your foothold firm.", "He will help you, and make your foothold firm"),
      difficulty: 4,
      questions: [
        { q: "What does Allah do for those who help His cause?", a: "He helps them", wrong: ["He ignores them", "He tests them only", "He delays them"], why: "If you help the cause of Allah, He will help you, and make your foothold firm. (47:7)" },
        { q: "What does Allah make firm, in 47:7?", a: "Your foothold", wrong: ["Your house", "Your wealth", "Your voice"], why: "He will help you, and make your foothold firm." },
        { tf: true, q: "Ibn Kathir also quotes 22:40 for 61:13.", why: "Verily, Allah will help those who help His cause. Truly, Allah is All Strong, All-Wise. (22:40)" }
      ]
    },
    {
      slug: "a-near-victory",
      title: "A victory soon",
      line: "The near victory comes soon and leads to joy in the Hereafter.",
      facts: ["For those who obey", "Joy now and later"],
      quote: q61(13),
      source: ik(13, "Ibn Kathir says the near victory will come soon, a favor in this life that continues into the delight of the Hereafter.", "it will come sooner"),
      difficulty: 5,
      questions: [
        { q: "What does near victory mean, per Ibn Kathir?", a: "It will come soon", wrong: ["It never comes", "It is far off", "It is a dream"], why: "And a near victory means, it will come sooner." },
        { q: "For whom is this favor?", a: "Those who obey Allah", wrong: ["Everyone", "The proud", "The lazy"], why: "It is for those who obey Allah and His Messenger and support Allah and His religion." },
        { tf: true, q: "The favor continues into the Hereafter.", why: "This is the increased favor that is earned in this life and continues, becoming the delight of the Hereafter." }
      ]
    },
    {
      slug: "give-glad-tidings",
      title: "Give good news",
      line: "The Prophet ﷺ is told to give good news to the believers.",
      facts: ["Bushra: good news", "Hope for every believer"],
      quote: q61(13),
      source: ik(13, "Ibn Kathir quotes the end of 61:13: and give glad tidings to the believers.", "And give glad tidings to the believers"),
      difficulty: 4,
      questions: [
        { q: "What is the Prophet ﷺ told to give, in 61:13?", a: "Good news", wrong: ["Warnings only", "Gold", "New laws"], why: "And give glad tidings to the believers." },
        { q: "To whom is the good news given?", a: "The believers", wrong: ["The proud", "The traders", "The kings"], why: "And give glad tidings to the believers." },
        { tf: true, q: "61:13 ends with good news.", why: "And give glad tidings to the believers." }
      ]
    },
    {
      slug: "be-helpers-of-allah",
      title: "Be helpers of Allah",
      line: "Allah asks believers to support His religion at all times.",
      facts: ["In words and in deeds", "With self and wealth"],
      quote: q61(14),
      source: ik(14, "Ibn Kathir says Allah orders His servants to support His religion at all times, in all their words and actions.", "at all times, in all their statements and actions"),
      difficulty: 3,
      questions: [
        { q: "What does 61:14 ask the believers to be?", a: "Helpers of Allah", wrong: ["Rulers of lands", "Rich traders", "Quiet watchers"], why: "O you who believe! Be you helpers in the cause of Allah." },
        { q: "When should they support Allah's religion?", a: "At all times", wrong: ["Only in Ramadan", "Only when rich", "Never"], why: "Allah orders His faithful servants to be Allah's supporters at all times." },
        { tf: true, q: "Support includes both words and actions.", why: "At all times, in all their statements and actions." }
      ]
    },
    {
      slug: "the-disciples-answer",
      title: "We are Allah's helpers",
      line: "Isa asked who would help, and his disciples said: we will.",
      facts: ["Al-Hawariyyun: the disciples", "They spread his message"],
      quote: q61(14),
      source: ik(14, "Ibn Kathir explains the disciples told Isa they would support him and help convey the message he was sent with.", "we will support you with regards to the Message you have been sent with"),
      difficulty: 3,
      questions: [
        { q: "What did Isa ask, in 61:14?", a: "Who are my helpers?", wrong: ["Where is the food?", "Who is the king?", "When is the feast?"], why: "Who are my helpers in the cause of Allah?" },
        { q: "What did the disciples answer?", a: "We are Allah's helpers", wrong: ["We are tired", "We must leave", "We will think"], why: "The Hawariyyun said: We are Allah's helpers." },
        { tf: true, q: "The disciples promised to help spread the message.", why: "We will support you with regards to the Message you have been sent with and will help you convey it." }
      ]
    },
    {
      slug: "sent-to-ash-sham",
      title: "Sent to spread the call",
      line: "Isa sent his disciples to Ash-Sham to call people to Allah.",
      facts: ["To the Greeks and Israelites", "Spreading the message"],
      quote: q61(14),
      source: ik(14, "Ibn Kathir says Isa sent the disciples to various parts of Ash-Sham to call the Greeks and the Israelites to Islam.", "sent the disciples to the various areas of Ash-Sham"),
      difficulty: 4,
      questions: [
        { q: "Where did Isa send his disciples?", a: "Ash-Sham", wrong: ["Yemen", "India", "Persia"], why: "Isa sent the disciples to the various areas of Ash-Sham." },
        { q: "Whom did they call, per Ibn Kathir?", a: "Greeks and Israelites", wrong: ["Only kings", "Only children", "No one"], why: "To call the Greeks and the Israelites to Islam." },
        { tf: true, q: "The disciples helped convey Isa's message.", why: "We will support you with regards to the Message you have been sent with and will help you convey it." }
      ]
    },
    {
      slug: "my-disciple-is-zubayr",
      title: "Every prophet's helper",
      line: "Every prophet had a disciple; the Prophet's ﷺ was Az-Zubayr.",
      facts: ["Hawari: a close helper", "Said at Al-Ahzab"],
      quote: q61(14),
      source: hadith("bukhari", "2846", "Jabir", "Sahih", "At Al-Ahzab, Az-Zubayr offered to bring news of the enemy, and the Prophet ﷺ said every prophet had a disciple and his is Az-Zubayr.", "Every prophet had a disciple and my disciple is Az-Zubair"),
      difficulty: 4,
      questions: [
        { q: "Whom did the Prophet ﷺ call his disciple?", a: "Az-Zubayr", wrong: ["Abu Sufyan", "Abu Lahab", "Utbah"], why: "Every prophet had a disciple and my disciple is Az-Zubair." },
        { q: "At which battle was this said?", a: "Al-Ahzab", wrong: ["Badr", "Tabuk", "Mu'tah"], why: "Who will bring me the information about the enemy on the day of Al-Ahzab?" },
        { tf: true, q: "Every prophet had a disciple, per the hadith.", why: "Every prophet had a disciple." }
      ]
    },
    {
      slug: "who-will-help-me",
      title: "Who will take me?",
      line: "At Hajj the Prophet ﷺ asked who would help him spread Islam.",
      facts: ["Quraysh blocked him", "He asked tribe after tribe"],
      quote: q61(14),
      source: hadith("abudawud", "4734", "Jabir ibn Abdullah", "Sahih", "At Arafat the Prophet ﷺ asked: is there a man who will take me to his people? Quraysh have stopped me from conveying my Lord's words.", "Is there any man who takes me to his people"),
      difficulty: 4,
      questions: [
        { q: "Where did the Prophet ﷺ ask for help?", a: "At Arafat", wrong: ["In Rome", "In Egypt", "At sea"], why: "The Messenger of Allah presented himself to the people at Arafat." },
        { q: "Who had stopped him, in the hadith?", a: "The Quraysh", wrong: ["The Romans", "The Persians", "The Ansar"], why: "The Quraysh have prevented me from preaching the word of my Lord." },
        { tf: true, q: "He asked to be taken to a people to preach.", why: "Is there any man who takes me to his people?" }
      ]
    },
    {
      slug: "the-ansar",
      title: "The Ansar, the helpers",
      line: "Allah raised the Aws and Khazraj to help the Prophet ﷺ.",
      facts: ["Ansar means helpers", "They kept their pledge"],
      quote: q61(14),
      source: ik(14, "Ibn Kathir says the people of Madinah pledged to protect the Prophet ﷺ, kept their vow, and were named Al-Ansar, the Supporters.", "vowing to protect him from mankind and the Jinns"),
      difficulty: 4,
      questions: [
        { q: "Which two tribes did Allah raise to help?", a: "Aws and Khazraj", wrong: ["Ad and Thamud", "Quraysh and Thaqif", "Banu Bakr and Taghlib"], why: "Allah raised Al-Aws and Al-Khazraj to support the Prophet ﷺ." },
        { q: "What does Al-Ansar mean?", a: "The Supporters", wrong: ["The travelers", "The traders", "The poets"], why: "Allah and His Messenger called them, Al-Ansar, the Supporters." },
        { tf: true, q: "The Ansar kept their vow when he migrated.", why: "When he migrated to them with his Companions, they fulfilled their vow to Allah." }
      ]
    },
    {
      slug: "love-the-ansar",
      title: "Love the Ansar",
      line: "The Prophet ﷺ said loving the Ansar is a sign of faith.",
      facts: ["Anas narrated it", "Love the helpers of the faith"],
      quote: q61(14),
      source: hadith("bukhari", "17", "Anas ibn Malik", "Sahih", "The Prophet ﷺ said love for the Ansar is a sign of faith.", "Love for the Ansar is a sign of faith"),
      difficulty: 4,
      questions: [
        { q: "What is love for the Ansar a sign of?", a: "Faith", wrong: ["Wealth", "Old age", "Travel"], why: "Love for the Ansar is a sign of faith." },
        { q: "Who narrated the hadith?", a: "Anas ibn Malik", wrong: ["Abu Jahl", "Umayyah", "Utbah"], why: "Narrated Anas: The Prophet ﷺ said, Love for the Ansar is a sign of faith." },
        { tf: true, q: "Hating the Ansar is a sign of hypocrisy.", why: "Hatred for the Ansar is a sign of hypocrisy." }
      ]
    },
    {
      slug: "two-groups",
      title: "One group believed",
      line: "After Isa's call, some of Bani Israel believed and some did not.",
      facts: ["The disciples helped him", "People chose their way"],
      quote: q61(14),
      source: ik(14, "Ibn Kathir says when Isa conveyed the message and the disciples supported him, a group from the Children of Israel believed.", "a group from the Children of Israel believed"),
      difficulty: 4,
      questions: [
        { q: "What did one group do, in 61:14?", a: "Believed", wrong: ["Moved away", "Became kings", "Fell asleep"], why: "Then a group of the Children of Israel believed and a group disbelieved." },
        { q: "What did the believing group accept?", a: "The guidance Isa brought", wrong: ["Gold", "Idols", "Old customs"], why: "They accepted the guidance that Isa brought to them." },
        { tf: true, q: "Another group rejected Isa.", why: "This group rejected what Isa brought them, denied his prophethood." }
      ]
    },
    {
      slug: "the-believers-prevail",
      title: "The believers prevail",
      line: "Allah gave the believers victory over their enemies.",
      facts: ["Victory came with Muhammad", "Until the Final Hour"],
      quote: q61(14),
      source: ik(14, "Ibn Kathir says the Ummah of Muhammad will always be prevalent on the truth until the Final Hour.", "will always be prevalent on the truth"),
      difficulty: 5,
      questions: [
        { q: "What did Allah give the believers, in 61:14?", a: "Power over their enemies", wrong: ["Only riches", "Only rest", "Nothing"], why: "So, We gave power to those who believed against their enemies, and they became the victorious." },
        { q: "How long will the Ummah stay on truth?", a: "Until the Final Hour", wrong: ["One hundred years", "Until Ramadan", "Only one generation"], why: "The Ummah of Muhammad will always be prevalent on the truth until Allah's command commences." },
        { tf: true, q: "Their final group will be with Isa against Ad-Dajjal.", why: "The last group of them will fight against Ad-Dajjal along with Isa, peace be on him." }
      ]
    },
    {
      slug: "a-group-on-the-truth",
      title: "A group always on truth",
      line: "A group of this Ummah stays on the truth until the Hour.",
      facts: ["Thawban narrated it", "No one who leaves them can harm them"],
      quote: q61(14),
      source: hadith("muslim", "1920", "Thawban", "Sahih", "The Prophet ﷺ said a group of his Ummah will always remain triumphant on the right path until Allah's command comes.", "A group of people from my Umma will always remain triumphant on the right path"),
      difficulty: 5,
      questions: [
        { q: "What did the Prophet ﷺ say about a group of his Ummah?", a: "It stays on the right path", wrong: ["It will vanish", "It will be rich", "It will rule only Makkah"], why: "A group of people from my Umma will always remain triumphant on the right path." },
        { q: "Who can harm them, per the hadith?", a: "No one who leaves them", wrong: ["Everyone", "Kings", "Traders"], why: "He who deserts them shall not be able to do them any harm." },
        { tf: true, q: "They remain so until the Hour is established.", why: "They will remain in this position until Allah's Command is executed." }
      ]
    }
  ]
};

export const SAFF_UNITS: readonly DeepUnit[] = [SAFF_ONE, SAFF_TWO, SAFF_THREE];
