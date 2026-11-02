import type { LessonSource } from "../../types";
import { hadith, quranQuote, type DeepUnit } from "../deepKit";

// Surah Yunus ayah by ayah, the way the surahs before it are taught: every ayah or small group of ayahs gets a lesson,
// explained as Tafsir Ibn Kathir explains it (the abridged English on quran.com), with a sahih hadith where one explains
// the ayah. Each source opens at the highlighted words that say the lesson's point.

/** Tafsir Ibn Kathir on Yunus 10:ayah, on quran.com, opened at `highlight` (words copied from that page). */
function ik(ayah: number, summary: string, highlight: string): LessonSource {
  return {
    id: `deep_ibn_kathir_10_${ayah}`,
    site: "Quran.com",
    category: "tafsir",
    title: `Tafsir Ibn Kathir on Yunus 10:${ayah}`,
    url: `https://quran.com/10:${ayah}/tafsirs/en-tafisr-ibn-kathir`,
    reference: `Tafsir Ibn Kathir 10:${ayah}`,
    from: "Tafsir Ibn Kathir (abridged English), on Quran.com",
    grade: "Tafsir",
    summary,
    highlight
  };
}

const q10 = (ayah: number) => quranQuote(10, ayah);

/** Ayahs 1 to 20: the wise Book, creation, the sun and moon, praise in Paradise, hardship and ease, the truthful Messenger. */
const YUNUS_ONE: DeepUnit = {
  key: "yunus1",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-10",
  name: "Yunus, ayahs 1 to 20",
  kind: "skill",
  lessonType: "surah",
  surahName: "Yunus",
  lessons: [
    {
      slug: "the-wise-book",
      title: "The verses of the wise Book",
      line: "Yunus opens with Alif-Lam-Ra and the verses of the wise Book.",
      facts: ["A Makki surah of 109 ayahs", "Its wisdom is clear"],
      quote: q10(1),
      source: ik(1, "The surah opens with the separate letters Alif-Lam-Ra. These are the verses of the Quran, Al-Hakim: a Book whose wisdom of judgment is clear.", "in which the wisdom of judgment is clear"),
      difficulty: 2,
      questions: [
        { q: "Which letters open Surah Yunus?", a: "Alif-Lam-Ra", wrong: ["Alif-Lam-Mim", "Ya-Sin", "Ta-Ha"], why: "Alif-Lam-Ra. These are the verses of the Book." },
        { q: "What does Al-Hakim describe, in 10:1?", a: "The Book", wrong: ["A king", "A mountain", "A city"], why: "These are the verses of the Book (the Qur'an) Al-Hakim." },
        { q: "Ibn Kathir explained the opening letters at the start of Al-Baqarah.", tf: true, why: "They have been previously discussed at the beginning of Surat Al-Baqarah." }
      ]
    },
    {
      slug: "a-man-from-among-them",
      title: "A Messenger who was a man",
      line: "People wondered that Allah would send a man to warn them.",
      facts: ["Warn people, give good news", "They called it sorcery"],
      quote: q10(2),
      source: ik(2, "The disbelievers always found it strange that Allah would send Messengers from among mankind. Earlier nations said the same to Hud and Salih.", "They have always found it strange that Allah would send Messengers to them from among mankind"),
      difficulty: 2,
      questions: [
        { q: "What did the disbelievers find strange, in 10:2?", a: "A Messenger who was a man", wrong: ["Rain from the sky", "The full moon", "Trade caravans"], why: "Is it a wonder that We have sent Our revelation to a man from among themselves?" },
        { q: "What did they call him ﷺ, in 10:2?", a: "An evident sorcerer", wrong: ["A great king", "A rich trader", "A wise judge"], why: "This is indeed an evident sorcerer!" },
        { q: "Earlier nations also wondered at a Messenger who was a man.", tf: true, why: "Do you wonder that a reminder has come to you through a man from among you? (7:63)" }
      ]
    },
    {
      slug: "good-deeds-ahead",
      title: "Good deeds sent ahead",
      line: "Believers have good news: a sure reward waits with their Lord.",
      facts: ["Prayer, fasting, charity", "Praising Allah"],
      quote: q10(2),
      source: ik(2, "Mujahid said the reward sent ahead is their good deeds: their prayers, fasting, charity and glorifying Allah.", "their prayers, fasting, charity, and glorification"),
      difficulty: 2,
      questions: [
        { q: "What good news do believers get, in 10:2?", a: "A reward with their Lord", wrong: ["Long life", "Great wealth", "A big house"], why: "They shall have with their Lord the rewards of their good deeds." },
        { q: "Which deeds did Mujahid name?", a: "Prayer, fasting, charity, praise", wrong: ["Trade and travel", "Poetry and songs", "Building and farming"], why: "Their prayers, fasting, charity, and glorification." },
        { q: "The good deeds a believer does are sent ahead to his Lord.", tf: true, why: "They shall have with their Lord the rewards of their good deeds." }
      ]
    },
    {
      slug: "six-days-and-the-throne",
      title: "Created in six days",
      line: "Allah created the heavens and earth in six days.",
      facts: ["He rose over the Throne", "He arranges every affair"],
      quote: q10(3),
      source: ik(3, "Allah created the heavens and the earth in six days, then rose over the Throne, the greatest of all creatures, and He arranges every affair. No one intercedes except after He permits.", "The Throne is the greatest of the creatures"),
      difficulty: 2,
      questions: [
        { q: "In how many days were the heavens and earth made, in 10:3?", a: "Six", wrong: ["Two", "Seven", "Forty"], why: "Who created the heavens and the earth in six Days." },
        { q: "What is the greatest of creatures, per Ibn Kathir?", a: "The Throne", wrong: ["The sun", "The mountains", "The ocean"], why: "The Throne is the greatest of the creatures." },
        { q: "Anyone can intercede with Allah without His permission.", tf: false, why: "No intercessor can plead with Him except after He permits." }
      ]
    },
    {
      slug: "nothing-tires-him",
      title: "No affair is too much for Him",
      line: "Allah runs big and small affairs alike, and none tires Him.",
      facts: ["Requests never annoy Him", "Not a leaf falls unknown"],
      quote: q10(3),
      source: ik(3, "Allah controls the affairs of every creature. No matter troubles Him, many requests do not annoy Him, and He governs big things as He governs small things, everywhere.", "He governs big things as He governs small things everywhere"),
      difficulty: 3,
      questions: [
        { q: "How does Allah govern big and small things, per Ibn Kathir?", a: "Alike, everywhere", wrong: ["Only big things", "Only small things", "Only in cities"], why: "He governs big things as He governs small things everywhere." },
        { q: "Do people's many requests annoy Allah?", a: "No, never", wrong: ["Yes, often", "Only at night", "Only long ones"], why: "The persistent requests of His creatures do not annoy Him." },
        { q: "Not a leaf falls without Allah knowing it (6:59).", tf: true, why: "Not a leaf falls, but He knows it." }
      ]
    },
    {
      slug: "all-return-to-him",
      title: "Everyone returns to Allah",
      line: "Allah began creation and will bring it back, then judge fairly.",
      facts: ["His promise is true", "Reward with justice"],
      quote: q10(4),
      source: ik(4, "The return of every creature on the Day of Resurrection is to Allah. He began creation and will repeat it, rewarding the believers with justice.", "the return of the creatures on the Day of Resurrection is to Him"),
      difficulty: 3,
      questions: [
        { q: "Who begins creation and repeats it, in 10:4?", a: "Allah", wrong: ["The stars", "Time", "The angels"], why: "It is He Who begins the creation and then will repeat it." },
        { q: "How will Allah reward believers, in 10:4?", a: "With justice", wrong: ["By chance", "With nothing", "Only in this world"], why: "That He may reward with justice those who believed." },
        { q: "Bringing creation back is easier for Allah (30:27).", tf: true, why: "Then He will repeat it; and this is easier for Him." }
      ]
    },
    {
      slug: "sun-and-moon",
      title: "The sun shines, the moon glows",
      line: "The sun shines, the moon glows, and its stages count time.",
      facts: ["Days by the sun", "Months by the moon"],
      quote: q10(5),
      source: ik(5, "The sun gives shining rays and the moon gives light. The moon grows to full then shrinks each month. Days come from the sun, months and years from the moon.", "The days are revealed by the action of the sun, and the months and the years by the moon"),
      difficulty: 3,
      questions: [
        { q: "What do the moon's stages help us know, in 10:5?", a: "The number of years", wrong: ["The weather", "Our age", "The tides only"], why: "That you might know the number of years and the reckoning." },
        { q: "What do we count by the moon, per Ibn Kathir?", a: "Months and years", wrong: ["Hours", "Minutes", "Seconds"], why: "The months and the years by the moon." },
        { q: "Allah created the sun and moon for no purpose.", tf: false, why: "Allah did not create this but in truth." }
      ]
    },
    {
      slug: "night-and-day",
      title: "Night follows day",
      line: "Night and day take turns, a sign for those who fear Allah.",
      facts: ["One comes, the other goes", "Never a mistake"],
      quote: q10(6),
      source: ik(6, "Day and night alternate: when one arrives the other goes, with no errors. In all Allah created in the heavens and earth are signs for the God-fearing.", "The day and the night alternate, when one arrives, the other goes"),
      difficulty: 3,
      questions: [
        { q: "Who are these signs for, in 10:6?", a: "Those who have taqwa", wrong: ["Only kings", "Only sailors", "Only farmers"], why: "Are Ayat for those who have Taqwa." },
        { q: "How do night and day take turns, per Ibn Kathir?", a: "With no errors", wrong: ["Randomly", "Late sometimes", "Only in summer"], why: "When one arrives, the other goes, and so on, with no errors." },
        { q: "Only the sky holds signs, not the earth.", tf: false, why: "In all that Allah has created in the heavens and the earth are Ayat." }
      ]
    },
    {
      slug: "pleased-with-this-world",
      title: "Pleased with this world only",
      line: "Some forget the meeting with Allah, content with this world.",
      facts: ["Heedless of His signs", "A sad end"],
      quote: q10(7),
      source: ik(7, "They did not hope to meet Allah and were content with this world. Al-Hasan said they adorned it and praised it until they were well pleased with it, heedless of Allah's signs.", "They adorned it and praised it until they were well pleased with it"),
      difficulty: 3,
      questions: [
        { q: "What were they pleased with, in 10:7?", a: "The life of this world", wrong: ["The Hereafter", "Their prayers", "The Quran"], why: "Are pleased and satisfied with the life of the present world." },
        { q: "What did Al-Hasan say they did with the world?", a: "Adorned and praised it", wrong: ["Left it", "Feared it", "Gave it away"], why: "They adorned it and praised it until they were well pleased with it." },
        { q: "They were heedless of Allah's signs.", tf: true, why: "And those who are heedless of Our Ayat." }
      ]
    },
    {
      slug: "faith-is-a-light",
      title: "Faith becomes a light",
      line: "Allah guides the believers by their faith into the Gardens.",
      facts: ["Faith lights the way", "Rivers flow beneath them"],
      quote: q10(9),
      source: ik(9, "Allah guides believers who do good because of their faith. Mujahid said their faith will be a light in which they walk on the Day of Resurrection.", "Their faith will be a light in which they will walk"),
      difficulty: 3,
      questions: [
        { q: "Who does Allah guide, in 10:9?", a: "Believers who do good", wrong: ["Everyone at once", "Only the rich", "Only the strong"], why: "Those who believe and do deeds of righteousness, their Lord will guide them." },
        { q: "What did Mujahid say faith will become?", a: "A light to walk in", wrong: ["A heavy load", "A gold crown", "A long rope"], why: "Their faith will be a light in which they will walk." },
        { q: "Rivers flow beneath them in the Gardens of delight.", tf: true, why: "Under them will flow rivers in the Gardens of delight." }
      ]
    },
    {
      slug: "praise-in-paradise",
      title: "Praise as easy as breathing",
      line: "In Paradise they glorify Allah and greet each other with Salam.",
      facts: ["Their greeting: Salam", "Last word: Alhamdulillah"],
      quote: q10(10),
      source: hadith("muslim", "2835", "Jabir ibn Abdullah", "Sahih", "The people of Paradise will eat and drink with no illness or waste, and they will glorify and praise Allah as easily as you breathe.", "they would glorify and praise Allah as easily as you breathe"),
      difficulty: 3,
      questions: [
        { q: "What is their greeting in Paradise, in 10:10?", a: "Salam", wrong: ["Goodbye", "Good luck", "Hurry up"], why: "Salam will be their greetings therein!" },
        { q: "How easily will they praise Allah, per the hadith?", a: "As easily as breathing", wrong: ["With great effort", "Only on Fridays", "Only once"], why: "They would glorify and praise Allah as easily as you breathe." },
        { q: "Their call ends with: All praise is due to Allah, Lord of all.", tf: true, why: "The close of their request will be: All praise is due to Allah, the Lord of all that exists." }
      ]
    },
    {
      slug: "angry-prayers",
      title: "Prayers said in anger",
      line: "Allah does not rush to answer angry prayers for harm.",
      facts: ["His mercy holds it back", "Do not curse yourself"],
      quote: q10(11),
      source: hadith("abudawud", "1532", "Jabir ibn Abdullah", "Sahih", "Do not curse yourselves, your children, your servants or your property, in case it falls at an hour when Allah grants what is asked.", "lest you happen to do it at a time when Allah is asked for something and grants your request"),
      difficulty: 3,
      questions: [
        { q: "If Allah hastened harm like good, what would happen, in 10:11?", a: "People would be ruined", wrong: ["Nothing at all", "They would be rich", "They would be happy"], why: "Then they would have been ruined." },
        { q: "Why not curse yourself or your children, per the hadith?", a: "It may fall at an answered hour", wrong: ["It is too long", "No one hears it", "It costs money"], why: "Lest you do it at a time when Allah grants your request." },
        { q: "Allah answers angry prayers for harm as fast as prayers for good.", tf: false, why: "He knows they do not truly intend evil for themselves, so He doesn't respond." }
      ]
    },
    {
      slug: "calling-in-hardship",
      title: "Remembered only in hardship",
      line: "In hardship a person calls on Allah; in ease he may forget.",
      facts: ["Lying, sitting, standing", "Do not forget the Helper"],
      quote: q10(12),
      source: ik(12, "When harm touches a person he calls on Allah standing, sitting or lying down. When Allah removes it, he passes on as if he had never asked. The patient believers are the exception.", "He prays while standing, sitting or laying down"),
      difficulty: 3,
      questions: [
        { q: "How does he call on Allah in harm, in 10:12?", a: "Lying, sitting or standing", wrong: ["Only when sleeping", "Only in a masjid", "Never at all"], why: "He invokes Us, lying on his side, or sitting or standing." },
        { q: "What does he do once the harm is removed, in 10:12?", a: "Passes on as if he never asked", wrong: ["Thanks Allah more", "Gives charity", "Prays all night"], why: "He passes on as if he had never invoked Us for a harm that touched him!" },
        { q: "Ibn Kathir says patient believers are the exception.", tf: true, why: "Except those who have patience, believe and do righteous good deeds (11:11)." }
      ]
    },
    {
      slug: "good-in-everything",
      title: "Good in every affair",
      line: "A believer thanks Allah in ease and is patient in hardship.",
      facts: ["Thanks in good times", "Patience in hard times"],
      quote: q10(12),
      source: hadith("muslim", "2999", "Suhaib", "Sahih", "The affair of the believer is amazing: there is good for him in every affair. If he is glad he thanks Allah, and if hardship comes he is patient, and both are good for him.", "there is good in every affair of his"),
      difficulty: 4,
      questions: [
        { q: "What does a believer do when good comes, per the hadith?", a: "Thanks Allah", wrong: ["Boasts", "Forgets Allah", "Hides it"], why: "If he has an occasion to feel delight, he thanks (God)." },
        { q: "What does a believer do in trouble, per the hadith?", a: "Is patient", wrong: ["Complains loudly", "Gives up", "Blames others"], why: "If he gets into trouble and endures it patiently, there is a good for him." },
        { q: "Good in every affair is for everyone, not only believers.", tf: false, why: "This is not the case with anyone else except a believer." }
      ]
    },
    {
      slug: "successors-in-the-land",
      title: "Made successors to be tested",
      line: "Allah made us successors on earth to see how we act.",
      facts: ["The world is sweet and green", "Past nations were warned"],
      quote: q10(14),
      source: hadith("muslim", "2742", "Abu Sa'id al-Khudri", "Sahih", "The world is sweet and green, and Allah makes you successors in it to see how you act.", "Allah is going to install you as vicegerent in it in order to see how you act"),
      difficulty: 4,
      questions: [
        { q: "Why did Allah make us successors, in 10:14?", a: "To see how we act", wrong: ["To rest forever", "To own it all", "To build towers"], why: "That We might see how you would work." },
        { q: "How did the hadith describe the world?", a: "Sweet and green", wrong: ["Dry and grey", "Cold and dark", "Small and empty"], why: "The world is sweet and green." },
        { q: "Nations before were destroyed when they did wrong (10:13).", tf: true, why: "We destroyed generations before you when they did wrong." }
      ]
    },
    {
      slug: "not-mine-to-change",
      title: "Not his to change",
      line: "They asked for another Quran; he ﷺ only followed revelation.",
      facts: ["A servant under command", "He feared the Great Day"],
      quote: q10(15),
      source: ik(15, "They asked him to bring another Quran or change it. He was told to say: I cannot change it on my own; I am but a servant who receives commands and only follows what is revealed.", "I am but a servant who receives commands"),
      difficulty: 4,
      questions: [
        { q: "What did they ask for, in 10:15?", a: "A different Quran or a change", wrong: ["More rain", "Gold coins", "A new city"], why: "Bring us a Qur'an other than this, or change it." },
        { q: "What did he ﷺ say he follows, in 10:15?", a: "Only what is revealed", wrong: ["His own wishes", "The crowd", "Old poems"], why: "I only follow that which is revealed unto me." },
        { q: "He ﷺ was free to change the Quran as he liked.", tf: false, why: "It is not for me to change it on my own accord." }
      ]
    },
    {
      slug: "a-lifetime-among-you",
      title: "A lifetime among you",
      line: "He ﷺ lived a lifetime among them and never told a lie.",
      facts: ["Even foes admitted it", "Have you no sense?"],
      quote: q10(16),
      source: hadith("bukhari", "7", "Ibn Abbas", "Sahih", "Heraclius asked Abu Sufyan, then an enemy, if they had ever accused him of lying before he claimed prophethood. He said no.", "Have you ever accused him of telling lies before his claim"),
      difficulty: 4,
      questions: [
        { q: "What did 10:16 remind them of?", a: "He lived among them a lifetime", wrong: ["He was a stranger", "He was a king", "He came yesterday"], why: "Verily, I have stayed among you a lifetime before this." },
        { q: "What did Heraclius ask about him ﷺ?", a: "Had he ever lied before?", wrong: ["How rich was he?", "How tall was he?", "Where did he trade?"], why: "Have you ever accused him of telling lies before his claim?" },
        { q: "Even an enemy at that time said he ﷺ never lied.", tf: true, why: "Abu Sufyan replied: No. This came from the enemy." }
      ]
    },
    {
      slug: "not-the-face-of-a-liar",
      title: "Not the face of a liar",
      line: "No one is more wrong than one who lies about Allah.",
      facts: ["Truth shows itself", "Spread salam, feed others"],
      quote: q10(17),
      source: hadith("tirmidhi", "2485", "Abdullah ibn Salam", "Sahih", "When he saw the face of the Messenger ﷺ in Madinah he knew it was not the face of a liar. The first words he heard were: spread salam, feed others, and pray at night.", "I knew that this face was not the face of a liar"),
      difficulty: 4,
      questions: [
        { q: "Who does the most wrong, in 10:17?", a: "One who lies about Allah", wrong: ["One who is poor", "One who travels", "One who is quiet"], why: "So who does more wrong than he who forges a lie against Allah?" },
        { q: "What was first taught in Madinah, per the hadith?", a: "Spread salam, feed, pray at night", wrong: ["Build walls", "Collect taxes", "Train horses"], why: "Spread the Salam, feed others, and perform Salat while the people are sleeping." },
        { q: "The criminals will never be successful.", tf: true, why: "Surely, the criminals will never be successful." }
      ]
    },
    {
      slug: "no-harm-no-benefit",
      title: "Idols cannot help",
      line: "Idols can neither harm nor benefit, nor plead for anyone.",
      facts: ["Allah knows all", "He is far above partners"],
      quote: q10(18),
      source: ik(18, "They worshipped others, thinking those gods would intercede for them. Allah says these gods do not harm or benefit, have no authority, and own nothing.", "these gods do not harm or benefit"),
      difficulty: 4,
      questions: [
        { q: "What can the idols do, in 10:18?", a: "Neither harm nor benefit", wrong: ["Bring rain", "Heal the sick", "Give wealth"], why: "Things that harm them not, nor profit them." },
        { q: "What did they claim the idols were, in 10:18?", a: "Their intercessors", wrong: ["Their fathers", "Their kings", "Their guards"], why: "These are our intercessors with Allah." },
        { q: "Allah is far above the partners they set up.", tf: true, why: "Glorified and Exalted is He above all that which they associate." }
      ]
    },
    {
      slug: "once-one-people",
      title: "Once one people on Islam",
      line: "People were once one community on Islam, then they differed.",
      facts: ["Shirk came later", "Messengers brought proof"],
      quote: q10(19),
      source: ik(19, "Shirk was new among mankind. Ibn Abbas said there were ten centuries between Adam and Nuh, all on Islam, then people differed and worshipped idols.", "There were ten centuries between Adam and Nuh. They were all on Islam"),
      difficulty: 5,
      questions: [
        { q: "How long were people on Islam before differing, per Ibn Abbas?", a: "Ten centuries", wrong: ["Ten years", "One century", "Forty days"], why: "There were ten centuries between Adam and Nuh. They were all on Islam." },
        { q: "What came first among mankind, per Ibn Kathir?", a: "Tawhid, then shirk later", wrong: ["Shirk first", "No religion", "Many gods"], why: "Shirk was new among mankind. It was not in existence in the beginning." },
        { q: "Allah delays judgment because of a Word that went before.", tf: true, why: "Had not it been for a Word that went forth before from your Lord." }
      ]
    },
    {
      slug: "the-unseen-is-allahs",
      title: "The unseen belongs to Allah",
      line: "They demanded a sign; the unseen belongs only to Allah.",
      facts: ["Wait and see", "The moon was split"],
      quote: q10(20),
      source: ik(20, "They asked for signs like turning As-Safa into gold. The matter belongs entirely to Allah. They had already seen greater signs, like the moon splitting in two.", "the matter in its entirety is for Allah"),
      difficulty: 5,
      questions: [
        { q: "What did they ask for, in 10:20?", a: "A sign from his Lord", wrong: ["A new king", "More trade", "A long rest"], why: "How is it that not a sign is sent down on him from his Lord?" },
        { q: "What did they want As-Safa turned into?", a: "Gold", wrong: ["Water", "A garden", "A palace"], why: "They wanted Allah to change the mount of As-Safa into gold." },
        { q: "They had already seen the moon split in two.", tf: true, why: "The moon, when it was full, split into two parts." }
      ]
    }
  ]
};

/** Ayahs 21 to 44: rain and the stars, the storm at sea, the world like crops, the Home of Peace, the challenge of one surah. */
const YUNUS_TWO: DeepUnit = {
  key: "yunus2",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-10",
  name: "Yunus, ayahs 21 to 44",
  kind: "skill",
  lessonType: "surah",
  surahName: "Yunus",
  lessons: [
    {
      slug: "rain-and-the-stars",
      title: "Rain from Allah, not the stars",
      line: "After rain, some thank Allah's mercy and some credit the stars.",
      facts: ["Mercy after hardship", "Say: by Allah's grace"],
      quote: q10(21),
      source: hadith("bukhari", "846", "Zayd ibn Khalid al-Juhani", "Sahih", "After a rainy night Allah said: some of My servants became believers and some disbelievers. Whoever said the rain came by Allah's blessing and mercy believes in Me.", "whoever said that the rain was due to the Blessings and the Mercy of Allah had belief in Me"),
      difficulty: 2,
      questions: [
        { q: "What should a believer say about rain, per the hadith?", a: "It came by Allah's mercy", wrong: ["A star brought it", "It came by luck", "Clouds decided"], why: "Whoever said the rain was due to the Blessings and the Mercy of Allah had belief in Me." },
        { q: "What do some do after mercy comes, in 10:21?", a: "Plot against Allah's signs", wrong: ["Give thanks", "Pray more", "Give charity"], why: "Behold! They take to plotting against Our Ayat!" },
        { q: "Allah is swifter in planning than those who plot.", tf: true, why: "Say: Allah is more swift in planning!" }
      ]
    },
    {
      slug: "storm-at-sea",
      title: "A storm at sea",
      line: "In a storm at sea, people call on Allah alone.",
      facts: ["Waves from every side", "Then they forget once safe"],
      quote: q10(22),
      source: ik(22, "When a stormy wind and waves come from every side, they call on Allah with pure faith. In that moment they would not call on an idol besides Allah.", "they would not invoke an idol or statue besides Allah"),
      difficulty: 2,
      questions: [
        { q: "Who do they call on in the storm, in 10:22?", a: "Allah alone", wrong: ["Their idols", "The captain", "No one"], why: "They invoke Allah, making their faith pure for Him alone." },
        { q: "What do they promise if saved, in 10:22?", a: "To be grateful", wrong: ["To sail again", "To get rich", "To build ships"], why: "If You deliver us from this, we shall truly be of the grateful." },
        { q: "Allah is the One who lets us travel on land and sea.", tf: true, why: "He it is Who enables you to travel through land and sea." }
      ]
    },
    {
      slug: "rebellion-hurts-yourself",
      title: "Rebellion hurts only yourself",
      line: "Once safe they rebel, but rebellion harms only the rebel.",
      facts: ["A brief enjoyment", "Then the return to Allah"],
      quote: q10(23),
      source: ik(23, "Once saved they rebel as if they never promised anything. Your rebellion is against yourselves: you will taste its bad end, and you harm no one else with it.", "it is you yourselves that will taste the evil consequence of this transgression"),
      difficulty: 2,
      questions: [
        { q: "What do they do once Allah saves them, in 10:23?", a: "Rebel on the earth", wrong: ["Thank Him more", "Fast and pray", "Help the poor"], why: "But when He delivers them, behold! They rebel in the earth wrongfully." },
        { q: "Who does rebellion harm most, in 10:23?", a: "The rebels themselves", wrong: ["Allah", "The sea", "The angels"], why: "O mankind! Your rebellion is only against yourselves." },
        { q: "The pleasures of this life are only brief.", tf: true, why: "A brief enjoyment of this worldly life." }
      ]
    },
    {
      slug: "world-like-crops",
      title: "This world is like crops",
      line: "This world blooms like crops after rain, then is mown down.",
      facts: ["Green, then dry", "As if never there"],
      quote: q10(24),
      source: ik(24, "This life is like plants watered by rain: they bloom and adorn the earth, then a command comes and they are mown down as if they never flourished.", "it became dry after it was green and flourishing"),
      difficulty: 3,
      questions: [
        { q: "What is this life compared to, in 10:24?", a: "Crops after rain", wrong: ["A strong castle", "A deep ocean", "A tall mountain"], why: "The parable of the life of the world is as the water which We send down from the sky." },
        { q: "What happens to the crops, in 10:24?", a: "Mown as if never there", wrong: ["Grow forever", "Turn to gold", "Move away"], why: "As if it had not flourished yesterday!" },
        { q: "This world runs from those who chase it, per Ibn Kathir.", tf: true, why: "This world runs away from those who seek it but seeks those who run away from it." }
      ]
    },
    {
      slug: "one-dip",
      title: "One dip changes everything",
      line: "One dip in Paradise makes a lifetime of hardship forgotten.",
      facts: ["The richest forget ease", "The poorest forget pain"],
      quote: q10(24),
      source: hadith("muslim", "2807", "Anas ibn Malik", "Sahih", "The most comfortable person of this world, dipped once in the Fire, will say he never saw comfort. The person who had the hardest life, dipped once in Paradise, will say he never saw hardship.", "never did I face any hardship or experience any distress"),
      difficulty: 3,
      questions: [
        { q: "After one dip in Paradise, what does the poorest believer say?", a: "He never faced hardship", wrong: ["He wants to go back", "He was always rich", "He forgot his name"], why: "Never did I face any hardship or experience any distress." },
        { q: "What lesson does the hadith teach about this world?", a: "Its pleasure and pain are brief", wrong: ["It lasts forever", "Only wealth matters", "Nothing matters"], why: "Things after they perish are as if they had never existed." },
        { q: "One dip in the Fire makes the richest forget all comfort.", tf: true, why: "Did you find any comfort? He would say: By Allah, no, my Lord." }
      ]
    },
    {
      slug: "home-of-peace",
      title: "Allah calls to the Home of Peace",
      line: "Allah invites to the Home of Peace and guides whom He wills.",
      facts: ["Paradise is Dar as-Salam", "Free of every trouble"],
      quote: q10(25),
      source: ik(25, "After describing how quickly this world ends, Allah invites people to Paradise. He calls it the Abode of Peace because it is free from defects and miseries.", "It is the Abode of Peace because it is free from defects and miseries"),
      difficulty: 3,
      questions: [
        { q: "What does Allah call to, in 10:25?", a: "The Home of Peace", wrong: ["The market", "The palace", "The battlefield"], why: "Allah calls to the Abode of Peace." },
        { q: "Why is Paradise called the Abode of Peace, per Ibn Kathir?", a: "Free of defects and miseries", wrong: ["Very small", "Very quiet", "Near the sea"], why: "Because it is free from defects and miseries." },
        { q: "Allah guides whom He wills to the straight path.", tf: true, why: "And guides whom He wills to the straight path." }
      ]
    },
    {
      slug: "the-best-and-more",
      title: "The best, and even more",
      line: "Those who do good get the best, and more: seeing Allah.",
      facts: ["The best: Paradise", "More: looking at Allah"],
      quote: q10(26),
      source: hadith("muslim", "181", "Suhayb ar-Rumi", "Sahih", "When the people of Paradise enter it, Allah will lift the veil, and nothing they were given will be dearer to them than looking at their Lord. Then he recited 10:26.", "nothing would he dearer to them than the sight of their Lord"),
      difficulty: 3,
      questions: [
        { q: "What do good-doers get, in 10:26?", a: "The best, and even more", wrong: ["Only a little", "Only in this world", "Nothing extra"], why: "For those who have done good is the best, and even more." },
        { q: "What will be dearest to them, per the hadith?", a: "Seeing their Lord", wrong: ["Gold palaces", "Rivers of milk", "Fine clothes"], why: "Nothing would be dearer to them than the sight of their Lord." },
        { q: "They earn this extra gift by deeds alone, per Ibn Kathir.", tf: false, why: "They will receive it by the grace of Allah and His mercy." }
      ]
    },
    {
      slug: "bright-and-dark-faces",
      title: "Bright faces and dark faces",
      line: "Good-doers' faces stay bright; evil earns only its like.",
      facts: ["No dust, no disgrace", "Justice with no increase"],
      quote: q10(27),
      source: ik(27, "Allah tells of His justice with the wrongdoers: an evil deed is paid back with its like, with no increase, while the good-doers' reward is multiplied.", "He will reward them with similar evil, without any increase"),
      difficulty: 3,
      questions: [
        { q: "What will not cover the good-doers' faces, in 10:26?", a: "Darkness or disgrace", wrong: ["Light", "Joy", "Peace"], why: "Neither darkness nor dust nor any humiliating disgrace shall cover their faces." },
        { q: "How is an evil deed paid back, in 10:27?", a: "With its like only", wrong: ["Ten times over", "A hundred times", "Never at all"], why: "The recompense of an evil deed is the like thereof." },
        { q: "Good deeds are multiplied ten to seven hundred times, per Ibn Kathir.", tf: true, why: "The reward on the good deeds multiplied ten times to seven hundred times and even more." }
      ]
    },
    {
      slug: "false-gods-disown",
      title: "False gods will disown them",
      line: "On that Day, false gods disown those who worshipped them.",
      facts: ["Stop at your place!", "Allah is the Witness"],
      quote: q10(28),
      source: ik(28, "On the Day of Resurrection the idolators and their idols are held in place. Their partners deny their worship and declare themselves free of them.", "that they would deny their worship and claim their innocence from them"),
      difficulty: 4,
      questions: [
        { q: "What will the false gods say, in 10:28?", a: "It was not us you worshipped", wrong: ["We will save you", "Follow us", "We are sorry"], why: "It was not us that you used to worship." },
        { q: "Who is enough as a witness, in 10:29?", a: "Allah", wrong: ["The idols", "The crowd", "The kings"], why: "So sufficient is Allah as a witness between us and you." },
        { q: "Every soul will know what it sent ahead (10:30).", tf: true, why: "There! Every person will know exactly what he had earned before." }
      ]
    },
    {
      slug: "who-provides",
      title: "Who provides for you?",
      line: "They admit Allah provides and controls all; so why others?",
      facts: ["Hearing and sight are His", "Life from death"],
      quote: q10(31),
      source: ik(31, "Allah is the One who sends rain, grows crops, and gave you hearing and sight. They admit Allah does all this, which is proof against worshipping others.", "the One who granted you the power of sight and hearing"),
      difficulty: 4,
      questions: [
        { q: "Who owns hearing and sight, in 10:31?", a: "Allah", wrong: ["The doctors", "The parents", "The idols"], why: "Or who owns hearing and sight? They will say: Allah." },
        { q: "After the truth, what is left, in 10:32?", a: "Only error", wrong: ["More truth", "Wealth", "Nothing at all"], why: "So after the truth, what else can there be, save error?" },
        { q: "The idolators denied that Allah provides for them.", tf: false, why: "They will say: Allah." }
      ]
    },
    {
      slug: "who-guides-to-truth",
      title: "Who guides to the truth?",
      line: "Follow the One who guides to truth, not one needing guidance.",
      facts: ["Allah begins and repeats creation", "Idols cannot guide"],
      quote: q10(35),
      source: ik(35, "Their gods cannot guide the lost. Allah alone guides the misled and confused and turns hearts from the wrong path to the right path.", "It is Allah alone Who guides the misled and confused ones"),
      difficulty: 4,
      questions: [
        { q: "Who guides to the truth, in 10:35?", a: "Allah", wrong: ["The idols", "The stars", "The poets"], why: "Say: It is Allah Who guides to the truth." },
        { q: "Who began creation and repeats it, in 10:34?", a: "Allah", wrong: ["The partners", "Nature", "Time"], why: "Say: Allah originates the creation and then He repeats it." },
        { q: "An idol that cannot guide itself deserves to be followed.", tf: false, why: "Is He Who guides to the truth more worthy to be followed?" }
      ]
    },
    {
      slug: "guesses-are-not-truth",
      title: "Guesses are not the truth",
      line: "Most follow guesses, and guesses never replace the truth.",
      facts: ["Zann: mere guessing", "Allah knows what they do"],
      quote: q10(36),
      source: ik(36, "They did not follow their religion from proof; they followed guesses and imagination. Conjecture is in no way a substitute for the truth.", "conjecture is in no way a substitute for the truth"),
      difficulty: 4,
      questions: [
        { q: "What do most of them follow, in 10:36?", a: "Guesses", wrong: ["Clear proof", "The Quran", "The Messengers"], why: "And most of them follow nothing but conjecture." },
        { q: "Can a guess stand in for the truth, per 10:36?", a: "No, never", wrong: ["Yes, always", "Sometimes", "If many agree"], why: "Certainly, conjecture can be of no avail against the truth." },
        { q: "Allah is All-Aware of what they do.", tf: true, why: "Surely, Allah is All-Aware of what they do." }
      ]
    },
    {
      slug: "only-from-allah",
      title: "The Quran is only from Allah",
      line: "No one but Allah could ever produce the Quran.",
      facts: ["Confirms earlier Books", "No doubt in it"],
      quote: q10(37),
      source: ik(37, "The Quran is a miracle no one can imitate. Its eloquence, clarity and meanings cannot be except from Allah, and His words are not like the words of His creatures.", "a book like this cannot be but from Allah"),
      difficulty: 4,
      questions: [
        { q: "Who could produce the Quran, in 10:37?", a: "Only Allah", wrong: ["A great poet", "Any scholar", "A group of kings"], why: "This Quran is not such as could ever be produced by other than Allah." },
        { q: "What does the Quran do to the earlier Books, in 10:37?", a: "Confirms them", wrong: ["Ignores them", "Copies them", "Hides them"], why: "But it is a confirmation of the revelation which was before it." },
        { q: "There is some doubt in the Quran.", tf: false, why: "Wherein there is no doubt, from the Lord of all that exists." }
      ]
    },
    {
      slug: "bring-one-surah",
      title: "Bring just one surah",
      line: "The challenge: bring even one surah like it, if you can.",
      facts: ["Whole Quran, ten, then one", "No one ever could"],
      quote: q10(38),
      source: ik(38, "Allah challenged them to bring the like of the whole Quran (17:88), then ten surahs (11:13), then in Yunus only one surah, and they could not.", "challenge them to produce only one Surah like unto the"),
      difficulty: 5,
      questions: [
        { q: "How many surahs does 10:38 challenge them to bring?", a: "One", wrong: ["Ten", "A hundred", "The whole Quran"], why: "Say: Bring then a Surah like unto it." },
        { q: "Which challenge came in Surah Hud (11:13)?", a: "Ten surahs", wrong: ["One ayah", "One surah", "Seven surahs"], why: "Bring you then ten forged Surah like unto it." },
        { q: "The Arabs of that time were famous for eloquent poetry.", tf: true, why: "Eloquence was a part of the nature and character of the Arabs." }
      ]
    },
    {
      slug: "my-deeds-your-deeds",
      title: "My deeds and your deeds",
      line: "If they deny you, say: my deeds are mine, yours are yours.",
      facts: ["Be clear of their deeds", "Like Surah Al-Kafirun"],
      quote: q10(41),
      source: ik(41, "If the idolators deny you, be clear of them and their deeds. Ibrahim and his followers also told their people: we are free of you and what you worship.", "If these idolators belie you, then be clear from them and their deeds"),
      difficulty: 5,
      questions: [
        { q: "What should be said to deniers, in 10:41?", a: "My deeds are mine, yours are yours", wrong: ["Let us mix our ways", "Do as you like with me", "I will copy you"], why: "For me are my deeds and for you are your deeds!" },
        { q: "Which surah carries the same message, per Ibn Kathir?", a: "Al-Kafirun", wrong: ["Al-Fil", "Al-Asr", "Al-Kawthar"], why: "Say: O you disbelievers! I worship not that which you worship (109:1-2)." },
        { q: "Ibrahim told his people he was free of what they worshipped.", tf: true, why: "Verily, we are free from you and whatever you worship besides Allah (60:4)." }
      ]
    },
    {
      slug: "guidance-is-allahs",
      title: "Can you make the deaf hear?",
      line: "Some listen and look, yet miss it; guidance is from Allah.",
      facts: ["Hearing is not heeding", "Seeing is not seeing"],
      quote: q10(42),
      source: ik(42, "Some listen to the Quran and look at the noble manners of the Prophet ﷺ, yet do not take guidance. Guiding people to the truth is not up to you or them, but to Allah.", "guiding the people to the truth is not up to you or to them"),
      difficulty: 5,
      questions: [
        { q: "What question does 10:42 ask?", a: "Can you make the deaf hear?", wrong: ["Can you count the stars?", "Can you fly?", "Can you stop the rain?"], why: "But can you make the deaf to hear, even though they apprehend not?" },
        { q: "Who does guidance belong to, per Ibn Kathir?", a: "Allah", wrong: ["The speaker", "The listener", "The crowd"], why: "Guiding the people to the truth is not up to you or to them." },
        { q: "Some look at him ﷺ but still do not see (10:43).", tf: true, why: "Some look at you, but can you guide the blind, even though they see not?" }
      ]
    },
    {
      slug: "allah-wrongs-no-one",
      title: "Allah wrongs no one",
      line: "Allah does not wrong people at all; people wrong themselves.",
      facts: ["Oppression is forbidden", "Your deeds come back to you"],
      quote: q10(44),
      source: hadith("muslim", "2577", "Abu Dharr", "Sahih", "Allah said: O My servants, I have forbidden oppression for Myself and made it forbidden among you, so do not oppress one another.", "I have forbidden oppression for Myself and have made it forbidden amongst you"),
      difficulty: 5,
      questions: [
        { q: "Who do people wrong, in 10:44?", a: "Themselves", wrong: ["Allah", "The angels", "The earth"], why: "But mankind wrong themselves." },
        { q: "What has Allah forbidden for Himself, per the hadith?", a: "Oppression", wrong: ["Mercy", "Forgiveness", "Giving"], why: "I have forbidden oppression for Myself." },
        { q: "Allah wrongs people a little now and then.", tf: false, why: "Truly, Allah wrongs not mankind in aught." }
      ]
    }
  ]
};

/** Ayahs 45 to 70: life felt like an hour, every nation's term, the cure for hearts, the friends of Allah, honor is His. */
const YUNUS_THREE: DeepUnit = {
  key: "yunus3",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-10",
  name: "Yunus, ayahs 45 to 70",
  kind: "skill",
  lessonType: "surah",
  surahName: "Yunus",
  lessons: [
    {
      slug: "but-an-hour",
      title: "As if only an hour",
      line: "On the Day of Gathering, this life will feel like an hour.",
      facts: ["They will know each other", "Life is short"],
      quote: q10(45),
      source: ik(45, "When people are gathered, they will feel they stayed only an hour of a day. These ayahs show how short this life is next to the Hereafter.", "These all are evidence of the brevity of the worldly life compared to the Hereafter"),
      difficulty: 2,
      questions: [
        { q: "How long will this life feel, in 10:45?", a: "An hour of a day", wrong: ["A thousand years", "A whole century", "Forever"], why: "As if they had not stayed but an hour of a day." },
        { q: "Will people recognize each other, in 10:45?", a: "Yes", wrong: ["No", "Only kings", "Only enemies"], why: "They will recognize each other." },
        { q: "This life is long compared to the Hereafter.", tf: false, why: "Evidence of the brevity of the worldly life compared to the Hereafter." }
      ]
    },
    {
      slug: "last-yet-first",
      title: "The last, yet the first",
      line: "Every nation has a Messenger; this Ummah is judged first.",
      facts: ["Judged with justice", "The last to come"],
      quote: q10(47),
      source: hadith("bukhari", "876", "Abu Hurayrah", "Sahih", "We are the last to come but will be the foremost on the Day of Resurrection.", "We (Muslims) are the last (to come) but (will be) the foremost on the Day of Resurrection"),
      difficulty: 2,
      questions: [
        { q: "Who does every nation have, in 10:47?", a: "A Messenger", wrong: ["A king", "A palace", "An army"], why: "And for every Ummah there is a Messenger." },
        { q: "When will this Ummah be judged, per the hadith?", a: "First of all nations", wrong: ["Last of all", "Never", "In the middle"], why: "We are the last but the foremost on the Day of Resurrection." },
        { q: "Each nation will be judged with justice.", tf: true, why: "The matter will be judged between them with justice." }
      ]
    },
    {
      slug: "a-set-term",
      title: "Every nation has a set term",
      line: "Every nation has a term it can neither delay nor rush.",
      facts: ["Only Allah knows the Hour", "No harm or benefit by myself"],
      quote: q10(49),
      source: ik(49, "The Prophet ﷺ was told to say he has no power over harm or benefit except as Allah wills. Every generation has a set term; when it comes, they cannot delay or hasten it.", "neither can they delay it nor can they advance it"),
      difficulty: 2,
      questions: [
        { q: "What can a nation do when its term comes, in 10:49?", a: "Neither delay nor rush it", wrong: ["Delay it a year", "Bring it sooner", "Cancel it"], why: "Neither can they delay it nor can they advance it an hour." },
        { q: "Who has power over harm and benefit, in 10:49?", a: "Allah alone", wrong: ["Every Prophet", "The stars", "The rich"], why: "I have no power over any harm or profit for myself except what Allah may will." },
        { q: "Believing only once the punishment arrives is too late (10:51).", tf: true, why: "What! Now you believe? And you used aforetime to hasten it on!" }
      ]
    },
    {
      slug: "yes-by-my-lord",
      title: "Yes, by my Lord",
      line: "Asked if Resurrection is true, he ﷺ swore: yes, by my Lord!",
      facts: ["Sworn three times in the Quran", "No one escapes it"],
      quote: q10(53),
      source: ik(53, "Allah tells His Messenger to swear by Him that the Resurrection is true. Only two other ayahs have this oath: 34:3 and 64:7.", "to give an oath by Him to answer those who deny the return"),
      difficulty: 3,
      questions: [
        { q: "What did he ﷺ answer, in 10:53?", a: "Yes, by my Lord, it is true", wrong: ["Maybe one day", "I do not know", "Ask someone else"], why: "Say: Yes! By my Lord! It is the very truth!" },
        { q: "How many other ayahs have this oath, per Ibn Kathir?", a: "Two", wrong: ["None", "Ten", "Seven"], why: "There are only two other Ayat similar to this: 34:3 and 64:7." },
        { q: "Turning to dust stops Allah from bringing people back.", tf: false, why: "Becoming sand does not make Allah incapable of bringing you back." }
      ]
    },
    {
      slug: "no-ransom",
      title: "No ransom on that Day",
      line: "A wrongdoer would give the whole earth to escape, but no.",
      facts: ["Regret in their hearts", "Judged with justice"],
      quote: q10(54),
      source: ik(54, "On the Day of Resurrection the disbelievers will wish to ransom themselves with the weight of the earth in gold, and they will be judged with justice.", "the equivalent of the weight of the earth in gold"),
      difficulty: 3,
      questions: [
        { q: "What would a wrongdoer offer as ransom, in 10:54?", a: "All that is on the earth", wrong: ["One coin", "A house", "A camel"], why: "Possessed all that is on the earth and sought to ransom himself therewith." },
        { q: "How will they be judged, in 10:54?", a: "With justice", wrong: ["Harshly, unfairly", "By lottery", "By the crowd"], why: "They will be judged with justice, and no wrong will be done unto them." },
        { q: "Everything in the heavens and earth belongs to Allah (10:55).", tf: true, why: "All that is in the heavens and the earth belongs to Allah." }
      ]
    },
    {
      slug: "cure-for-hearts",
      title: "A cure for the hearts",
      line: "The Quran is advice, a cure for hearts, guidance and mercy.",
      facts: ["Cures doubt", "Mercy for believers"],
      quote: q10(57),
      source: ik(57, "The Quran is good advice and a shield from shameful deeds, a cure from suspicion and doubts, and guidance and mercy for those who believe.", "A cure from suspicion and doubts"),
      difficulty: 3,
      questions: [
        { q: "What does the Quran cure, in 10:57?", a: "What is in the hearts", wrong: ["Broken bones", "Hunger", "Bad weather"], why: "A cure for that which is in your breasts." },
        { q: "What does the Quran cure, per Ibn Kathir?", a: "Suspicion and doubts", wrong: ["Fevers", "Sadness only", "Tiredness"], why: "A cure from suspicion and doubts." },
        { q: "The Quran is guidance and mercy for those who believe.", tf: true, why: "A guidance and a mercy for the believers." }
      ]
    },
    {
      slug: "rejoice-in-his-bounty",
      title: "Rejoice in Allah's bounty",
      line: "Rejoice in Allah's bounty and mercy; it beats all you gather.",
      facts: ["Guidance is the real joy", "Better than wealth"],
      quote: q10(58),
      source: ik(58, "Let them rejoice in the guidance and the true religion from Allah. It is better than all the wealth they gather from a fading world.", "Let them rejoice in the guidance and the religion of the truth"),
      difficulty: 3,
      questions: [
        { q: "What should believers rejoice in, in 10:58?", a: "Allah's bounty and mercy", wrong: ["Their wealth", "Their fame", "Their houses"], why: "In the bounty of Allah, and in His mercy; therein let them rejoice." },
        { q: "What is guidance better than, in 10:58?", a: "All the wealth they amass", wrong: ["Nothing", "Only gold", "Only silver"], why: "That is better than what the wealth they amass." },
        { q: "Ibn Kathir says the joy is in guidance and true religion.", tf: true, why: "Let them rejoice in the guidance and the religion of the truth." }
      ]
    },
    {
      slug: "halal-is-allahs",
      title: "Only Allah makes things halal",
      line: "No one may make halal or haram by their own wishes.",
      facts: ["Allah's gifts are lawful", "Do not lie about Allah"],
      quote: q10(59),
      source: ik(59, "The idolators made lawful and unlawful as they liked, like the animals they forbade. Allah criticized making lawful what He forbade, or the reverse, without proof.", "Allah criticized those who make lawful what Allah has made unlawful or vice verse"),
      difficulty: 4,
      questions: [
        { q: "What did they do with Allah's provision, in 10:59?", a: "Made some halal, some haram", wrong: ["Shared all of it", "Buried it", "Sold it all"], why: "You have made of it lawful and unlawful." },
        { q: "What were their rules based on, per Ibn Kathir?", a: "Desires, not proof", wrong: ["Clear revelation", "A Prophet's word", "Scholars' proof"], why: "They are based on mere desires and false opinions not supported with evidence." },
        { q: "Allah is full of bounty, yet most are ungrateful (10:60).", tf: true, why: "Truly, Allah is full of bounty to mankind, but most of them are ungrateful." }
      ]
    },
    {
      slug: "he-sees-every-deed",
      title: "He sees every deed",
      line: "Allah witnesses every deed, even a speck of dust.",
      facts: ["Worship as if you see Him", "All in a Clear Record"],
      quote: q10(61),
      source: ik(61, "Nothing escapes Allah's knowledge, not even a speck of dust. Asked about ihsan, the Prophet ﷺ said: worship Allah as if you see Him, and if you cannot, know He sees you.", "It is that you worship Allah as if you are seeing Him"),
      difficulty: 4,
      questions: [
        { q: "What is hidden from Allah, in 10:61?", a: "Nothing, not even a speck", wrong: ["Secret thoughts", "Small deeds", "Night deeds"], why: "Nothing is hidden from your Lord, so much as the weight of a speck of dust." },
        { q: "What is ihsan, per the hadith?", a: "Worship as if you see Him", wrong: ["Pray fast", "Give gold", "Travel far"], why: "It is that you worship Allah as if you are seeing Him." },
        { q: "Allah watches us while we recite the Quran.", tf: true, why: "Nor recite any portion of the Quran, but We are Witness thereof." }
      ]
    },
    {
      slug: "friends-of-allah",
      title: "The friends of Allah",
      line: "Allah's friends have no fear and no grief: believers with taqwa.",
      facts: ["Faith and taqwa", "No fear, no grief"],
      quote: q10(62),
      source: ik(62, "Allah's awliya are those who believe and have taqwa. Every pious, God-fearing person is a friend of Allah, with no fear of what is ahead and no grief for what is left behind.", "Every pious, God-fearing person is a friend of Allah"),
      difficulty: 4,
      questions: [
        { q: "Who are the friends of Allah, in 10:63?", a: "Believers with taqwa", wrong: ["The richest people", "Famous people", "Only kings"], why: "Those who believed, and have Taqwa." },
        { q: "What will not come upon them, in 10:62?", a: "Fear or grief", wrong: ["Joy", "Peace", "Light"], why: "No fear shall come upon them nor shall they grieve." },
        { q: "Only a few famous people can be friends of Allah.", tf: false, why: "Every pious, God-fearing person is a friend of Allah." }
      ]
    },
    {
      slug: "good-news-now",
      title: "Good news in this life",
      line: "When people praise your good deeds, that is early good news.",
      facts: ["Good news in both lives", "A sincere deed is noticed"],
      quote: q10(64),
      source: hadith("muslim", "2642", "Abu Dharr", "Sahih", "He was asked about a man who does good and people praise him. He said: that is glad tidings for a believer, given early in this world.", "It is glad tidings for a believer"),
      difficulty: 4,
      questions: [
        { q: "When do the friends of Allah get good news, in 10:64?", a: "In this life and the next", wrong: ["Only in this life", "Never", "Only at birth"], why: "For them is good news, in the life of the present world, and in the Hereafter." },
        { q: "What is people praising your good deed, per the hadith?", a: "Early glad tidings", wrong: ["A sin", "Showing off", "Bad luck"], why: "It is glad tidings for a believer." },
        { q: "No change can be made in the Words of Allah.", tf: true, why: "No change can there be in the Words of Allah." }
      ]
    },
    {
      slug: "true-dreams",
      title: "Good dreams bring good news",
      line: "A true good dream is good news for a believer.",
      facts: ["Called al-mubashshirat", "Share good dreams only"],
      quote: q10(64),
      source: hadith("bukhari", "6990", "Abu Hurayrah", "Sahih", "Nothing is left of prophethood except al-mubashshirat. They asked what that is. He said: true good dreams.", "The true good dreams"),
      difficulty: 4,
      questions: [
        { q: "What are al-mubashshirat, per the hadith?", a: "True good dreams", wrong: ["Gold coins", "New Prophets", "Loud voices"], why: "He replied: The true good dreams." },
        { q: "What should one do with a bad dream, per Ibn Kathir?", a: "Not tell anyone", wrong: ["Tell everyone", "Write it down", "Act on it"], why: "He should not mention it to anyone." },
        { q: "Angels give believers good news at death, per Ibn Kathir.", tf: true, why: "The glad tidings the angels bring to the believer at the time of death." }
      ]
    },
    {
      slug: "honor-is-allahs",
      title: "All honor belongs to Allah",
      line: "Do not grieve at their words; all honor belongs to Allah.",
      facts: ["He hears and knows", "Night to rest, day to see"],
      quote: q10(65),
      source: ik(65, "The Prophet ﷺ is told not to grieve at the idolators' words but to trust Allah. All might and honor belong to Allah, His Messenger and the believers.", "All might and honor belong to Him, His Messenger and the believers"),
      difficulty: 5,
      questions: [
        { q: "To whom does all honor belong, in 10:65?", a: "Allah", wrong: ["The rich", "The loud", "The many"], why: "For all power and honor belong to Allah." },
        { q: "Why did Allah make the night, in 10:67?", a: "To rest", wrong: ["To trade", "To travel far", "To be afraid"], why: "Who has appointed for you the night that you may rest therein." },
        { q: "The idolators follow only guesses (10:66).", tf: true, why: "They follow only a conjecture and they do nothing but lie." }
      ]
    },
    {
      slug: "free-of-all-need",
      title: "Allah needs no son",
      line: "Allah is free of all needs; everything already belongs to Him.",
      facts: ["Glory be to Him", "Liars never prosper"],
      quote: q10(68),
      source: ik(68, "Allah is above having a son. He is Self-Sufficient, needing nothing, while everything needs Him. All in the heavens and earth is His servant.", "He is Self-Sufficient, free of want or need of anything"),
      difficulty: 5,
      questions: [
        { q: "What does 10:68 call Allah?", a: "Rich, free of all needs", wrong: ["In need of help", "Tired", "Alone and weak"], why: "Glory is to Him! He is Rich (free of all needs)." },
        { q: "What happens to those who lie about Allah, in 10:69?", a: "They never succeed", wrong: ["They win", "They get rich", "They rule"], why: "Those who invent a lie against Allah will never be successful." },
        { q: "They have proof for their claim, per 10:68.", tf: false, why: "No warrant have you for this." }
      ]
    }
  ]
};

export const YUNUS_UNITS: readonly DeepUnit[] = [YUNUS_ONE, YUNUS_TWO, YUNUS_THREE];
