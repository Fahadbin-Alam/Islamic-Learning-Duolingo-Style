import type { LessonSource } from "../../types";
import { hadith, quranQuote, type DeepUnit } from "../deepKit";

// Surah Al-Inshiqaq ayah by ayah, the way the surahs before it are taught: every ayah or small group of ayahs gets a lesson,
// explained as Tafsir Ibn Kathir explains it (the abridged English on quran.com), with a sahih hadith where one explains
// the ayah. Each source opens at the highlighted words that say the lesson's point.

/** Tafsir Ibn Kathir on Al-Inshiqaq 84:ayah, on quran.com, opened at `highlight` (words copied from that page). */
function ik(ayah: number, summary: string, highlight: string): LessonSource {
  return {
    id: `deep_ibn_kathir_84_${ayah}`,
    site: "Quran.com",
    category: "tafsir",
    title: `Tafsir Ibn Kathir on Al-Inshiqaq 84:${ayah}`,
    url: `https://quran.com/84:${ayah}/tafsirs/en-tafisr-ibn-kathir`,
    reference: `Tafsir Ibn Kathir 84:${ayah}`,
    from: "Tafsir Ibn Kathir (abridged English), on Quran.com",
    grade: "Tafsir",
    summary,
    highlight
  };
}

const q84 = (ayah: number) => quranQuote(84, ayah);


/** Ayahs 1 to 15: the sky splits, the earth is stretched out, and each person is given their record. */
const INSHIQAQ_ONE: DeepUnit = {
  key: "inshiqaq1",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-84",
  name: "Al-Inshiqaq, ayahs 1-15",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Inshiqaq",
  lessons: [
    {
      slug: "the-sky-splits-and-obeys",
      title: "The sky splits and obeys",
      line: "On the Last Day the sky will split, obeying its Lord.",
      facts: ["Inshaqqat: split apart", "Everything obeys Allah"],
      quote: q84(1),
      source: ik(1, "Ibn Kathir says the heaven listens to its Lord and obeys His command to split apart on the Day of Judgement.", "it listens to its Lord and obeys His command to split apart"),
      difficulty: 1,
      questions: [
        { q: "What happens to the heaven, per 84:1?", a: "It is split asunder", wrong: ["It turns green", "It grows bigger", "It stays still"], why: "When the heaven is split asunder." },
        { q: "What does the heaven do, per 84:2?", a: "Listens to and obeys its Lord", wrong: ["Refuses", "Argues", "Sleeps"], why: "And listens to and obeys its Lord, and it must do so." },
        { tf: true, q: "Everything is submissive to the command of Allah.", why: "Rather it overpowers everything and everything is submissive to it." }
      ]
    },
    {
      slug: "sajdah-in-al-inshiqaq",
      title: "A prostration in the surah",
      line: "Muhammad ﷺ prostrated when he recited the start of the surah.",
      facts: ["Sajdat at-Tilawah: prostration of recitation", "Abu Hurairah followed him"],
      quote: q84(1),
      source: hadith("bukhari", "766", "Abu Rafi", "Sahih", "Abu Hurairah recited Al-Inshiqaq in the Isha prayer and prostrated. Asked about it, he said he prostrated behind the Prophet ﷺ and would keep doing so until he met him.", "I prostrated behind Abul-Qasim"),
      difficulty: 3,
      questions: [
        { q: "What did Abu Hurairah do when reciting 84:1?", a: "He prostrated", wrong: ["He stopped praying", "He left the masjid", "He laughed"], why: "When the heaven is split asunder. Then he prostrated." },
        { q: "Behind whom did he say he had prostrated?", a: "Abul-Qasim, Muhammad ﷺ", wrong: ["A king", "His father", "A student"], why: "I prostrated behind Abul-Qasim, and I will never cease prostrating during its recitation." },
        { q: "In which prayer did he recite it?", a: "Isha, the night prayer", wrong: ["Fajr", "Eid", "Jumuah"], why: "Abu Rafi prayed the Night prayer with Abu Hurairah." }
      ]
    },
    {
      slug: "the-earth-stretched-out",
      title: "The earth stretched out",
      line: "The earth will be spread flat and wide on the Last Day.",
      facts: ["Muddat: stretched forth", "No hills, no hiding"],
      quote: q84(3),
      source: ik(3, "Ibn Kathir says the earth will be expanded, spread out and extended.", "when the earth is expanded, spread out and extended"),
      difficulty: 1,
      questions: [
        { q: "What happens to the earth, per 84:3?", a: "It is stretched forth", wrong: ["It is folded", "It sinks away", "It turns to gold"], why: "And when the earth is stretched forth." },
        { q: "What does stretched forth mean, per Ibn Kathir?", a: "Expanded, spread out and extended", wrong: ["Broken into pieces", "Lifted into the sky", "Filled with water"], why: "When the earth is expanded, spread out and extended." },
        { tf: false, q: "The earth will shrink on the Last Day.", why: "When the earth is expanded, spread out and extended." }
      ]
    },
    {
      slug: "the-earth-empties-itself",
      title: "The earth empties itself",
      line: "The earth will give back all buried in it, obeying its Lord.",
      facts: ["Takhallat: became empty", "All will be raised"],
      quote: q84(4),
      source: ik(4, "Mujahid, Said and Qatadah said the earth throws out the dead inside it and empties itself of them.", "it throws out the dead inside of it"),
      difficulty: 2,
      questions: [
        { q: "What does the earth do, per 84:4?", a: "Casts out all in it and becomes empty", wrong: ["Keeps all inside", "Grows new trees", "Turns to water"], why: "And has cast out all that was in it and became empty." },
        { q: "What does the earth give back, per Ibn Kathir?", a: "The dead buried in it", wrong: ["Its gold", "Its rivers", "Its seeds"], why: "It throws out the dead inside of it, and it empties itself of them." },
        { tf: true, q: "Ayah 84:5 says the earth listens to and obeys its Lord.", why: "And listens to and obeys its Lord, and it must do so." }
      ]
    },
    {
      slug: "returning-to-your-lord",
      title: "Returning to your Lord",
      line: "Every person toils on the way back to Allah, and meets it.",
      facts: ["Kadih: toiling, striving", "We meet our deeds"],
      quote: q84(6),
      source: ik(6, "Ibn Abbas said whatever deed you do, you will meet Allah with it, good or bad.", "Whatever deed you do, you will meet Allah with it"),
      difficulty: 2,
      questions: [
        { q: "Where is every person heading, per 84:6?", a: "Towards their Lord", wrong: ["Towards the sea", "Nowhere", "Towards the past"], why: "O man! Verily, you are returning towards your Lord with your deeds and actions." },
        { q: "What will you meet, per Ibn Kathir?", a: "What you did of good or evil", wrong: ["Only your friends", "Nothing at all", "Only your wealth"], why: "Then you will meet that which you did of good or evil." },
        { tf: false, q: "Our deeds are lost once we finish them.", why: "Whatever deed you do, you will meet Allah with it, whether it is good or bad." }
      ]
    },
    {
      slug: "record-in-the-right-hand",
      title: "The record in the right hand",
      line: "Whoever gets the record in the right hand has an easy reckoning.",
      facts: ["Yamin: right hand", "Hisaban yasira: easy reckoning"],
      quote: q84(7),
      source: ik(7, "Ibn Kathir says an easy reckoning is without difficulty; the person is not questioned about every small detail.", "easy without any difficulty"),
      difficulty: 2,
      questions: [
        { q: "In which hand is the good record given, per 84:7?", a: "The right hand", wrong: ["The left hand", "Behind the back", "No hand"], why: "Then as for him who will be given his Record in his right hand." },
        { q: "What reckoning will he get, per 84:8?", a: "An easy reckoning", wrong: ["A long reckoning", "No reckoning ever", "A hard reckoning"], why: "He surely will receive an easy reckoning." },
        { q: "What does easy mean, per Ibn Kathir?", a: "Without any difficulty", wrong: ["Very fast only", "With much shouting", "Without a record"], why: "Easy without any difficulty." }
      ]
    },
    {
      slug: "the-easy-reckoning",
      title: "What the easy reckoning is",
      line: "Aishah asked what the easy reckoning is, and he explained.",
      facts: ["Al-Ard: the showing of deeds", "Ask to understand"],
      quote: q84(8),
      source: hadith("bukhari", "4939", "Aishah", "Sahih", "The Prophet ﷺ said whoever is called to account will be ruined. Aishah asked about the easy reckoning in 84:8. He said that is only the presentation of the deeds; whoever is questioned closely is ruined.", "That is only the presentation of the accounts"),
      difficulty: 4,
      questions: [
        { q: "Which ayah did Aishah ask about?", a: "84:8, an easy reckoning", wrong: ["1:1, In the name of Allah", "112:1, Say He is Allah", "2:255, Ayat al-Kursi"], why: "He surely will receive an easy reckoning." },
        { q: "What did he say the easy reckoning is?", a: "Only the presentation of deeds", wrong: ["A long trial", "A test of strength", "A walk in a garden"], why: "That is only the presentation of the accounts." },
        { tf: true, q: "Asking to understand a hard point is a good habit.", why: "Aishah asked about the ayah, and he explained it to her." }
      ]
    },
    {
      slug: "home-to-family-in-joy",
      title: "Home to family, in joy",
      line: "The right-hand record holder returns to family in joy.",
      facts: ["Masrur: happy, delighted", "Families meet in Jannah"],
      quote: q84(9),
      source: ik(9, "Qatadah and Ad-Dahhak said he returns to his family in Paradise, happy with what Allah gave him.", "Masrur means happy and delighted"),
      difficulty: 2,
      questions: [
        { q: "How will he return to his family, per 84:9?", a: "In joy", wrong: ["In tears", "In fear", "Alone"], why: "And will return to his family Masrur, in joy!" },
        { q: "Where is that family, per Qatadah?", a: "In Paradise", wrong: ["In the old town", "On a ship", "Far away forever"], why: "This means that he will return to his family in Paradise." },
        { q: "What does Masrur mean?", a: "Happy and delighted", wrong: ["Tired", "Worried", "Hungry"], why: "Masrur means happy and delighted by what Allah has given him." }
      ]
    },
    {
      slug: "record-behind-the-back",
      title: "The record behind the back",
      line: "Whoever gets the record behind the back cries out in loss.",
      facts: ["Wara zahrihi: behind his back", "Thubur: ruin, loss"],
      quote: q84(10),
      source: ik(10, "Ibn Kathir says he is given his book in his left hand, behind his back, and calls out for loss and ruin.", "he will be given his Book in his left hand"),
      difficulty: 2,
      questions: [
        { q: "How is the bad record given, per 84:10?", a: "Behind his back", wrong: ["In his right hand", "On a throne", "By a friend"], why: "But whosoever is given his Record behind his back." },
        { q: "What will he call for, per 84:11?", a: "Destruction", wrong: ["Help from friends", "More time", "Food"], why: "He will invoke destruction, meaning, loss and destruction." },
        { tf: false, q: "The record behind the back means an easy reckoning.", why: "He will be given his Book in his left hand, behind his back." }
      ]
    },
    {
      slug: "joyful-among-his-people",
      title: "Joyful among his people",
      line: "He laughed through life and never thought about the end.",
      facts: ["Short fun, long regret", "Think of the end"],
      quote: q84(13),
      source: ik(13, "Ibn Kathir says he was happy, never thought of the outcome, and his light joy is followed by long grief.", "His light happiness will be followed by long grief"),
      difficulty: 3,
      questions: [
        { q: "How was he among his people, per 84:13?", a: "In joy", wrong: ["In prayer", "In grief", "In fear of Allah"], why: "Verily, he was among his people in joy!" },
        { q: "What follows his light happiness, per Ibn Kathir?", a: "Long grief", wrong: ["More joy", "Nothing", "A reward"], why: "His light happiness will be followed by long grief." },
        { q: "Where will he enter, per 84:12?", a: "A blazing Fire", wrong: ["A garden", "A palace", "His old home"], why: "And he shall enter a blazing Fire, and made to taste its burning." }
      ]
    },
    {
      slug: "he-thought-he-would-not-return",
      title: "He thought he would not return",
      line: "He thought he would never return, but Allah saw all he did.",
      facts: ["Yahur: to return", "Allah is All-Seeing"],
      quote: q84(14),
      source: ik(14, "Ibn Abbas and Qatadah said he believed he would not return to Allah after death; yet Allah was always watching him.", "he used to believe that he would not return to Allah"),
      difficulty: 3,
      questions: [
        { q: "What did he think, per 84:14?", a: "That he would never return", wrong: ["That he would be rich", "That he would fly", "That he was weak"], why: "Verily, he thought that he would never return!" },
        { q: "What does 84:15 say about his Lord?", a: "He was ever beholding him", wrong: ["He forgot him", "He was far away", "He did not care"], why: "Yes! Verily, his Lord has been ever beholding him!" },
        { tf: true, q: "Allah brings people back to life just as He first created them.", why: "Certainly Allah will repeat his creation just as he began his creation." }
      ]
    }
  ]
};

/** Ayahs 16 to 25: oaths by the twilight, the night and the full moon; life in stages; and a reward without end. */
const INSHIQAQ_TWO: DeepUnit = {
  key: "inshiqaq2",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-84",
  name: "Al-Inshiqaq, ayahs 16-25",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Inshiqaq",
  lessons: [
    {
      slug: "by-the-twilight",
      title: "By the twilight",
      line: "Allah swears by the red glow in the sky after sunset.",
      facts: ["Ash-Shafaq: the evening redness", "Maghrib time lasts until it fades"],
      quote: q84(16),
      source: ik(16, "Many Companions said Ash-Shafaq is the redness in the sky between sunset and full darkness.", "Ash-Shafaq is the redness"),
      difficulty: 2,
      questions: [
        { q: "By what does Allah swear in 84:16?", a: "Ash-Shafaq, the twilight", wrong: ["The dawn", "The sea", "The mountains"], why: "But no! I swear by Ash-Shafaq." },
        { q: "What is Ash-Shafaq, per most scholars?", a: "The redness of the horizon", wrong: ["The noon sun", "A cloud", "A star"], why: "Ash-Shafaq is the redness of the horizon." },
        { q: "Which prayer time lasts while it stays?", a: "Maghrib", wrong: ["Fajr", "Dhuhr", "Duha"], why: "The time of Al-Maghrib is as long as Ash-Shafaq has not disappeared." }
      ]
    },
    {
      slug: "the-night-and-what-it-gathers",
      title: "The night and what it gathers",
      line: "At night everything returns home, gathered in by the dark.",
      facts: ["Wasaqa: gathered", "Rest is a blessing"],
      quote: q84(17),
      source: ik(17, "Ikrimah said the night gathers things in its darkness, since at night everything goes to its home.", "everything goes to its home"),
      difficulty: 2,
      questions: [
        { q: "By what else does Allah swear, per 84:17?", a: "The night and what it gathers", wrong: ["The day and its noise", "The wind", "The rain"], why: "And the night and what it Wasaqa." },
        { q: "What does Wasaqa mean, per Ibn Abbas?", a: "What it gathers", wrong: ["What it breaks", "What it hides forever", "What it burns"], why: "And what it Wasaqa means what it gathers." },
        { q: "What does the night gather, per Qatadah?", a: "The stars and animals", wrong: ["The oceans", "The sun", "The winds"], why: "The stars and animals it gathers." }
      ]
    },
    {
      slug: "the-moon-when-full",
      title: "The moon when full",
      line: "Allah swears by the moon when its light becomes complete.",
      facts: ["Ittasaq: became full", "Allah perfects His creation"],
      quote: q84(18),
      source: ik(18, "Ibn Abbas and Al-Hasan said Ittasaq means the moon comes together and becomes full.", "When it comes together and becomes full"),
      difficulty: 2,
      questions: [
        { q: "When does Allah swear by the moon, per 84:18?", a: "When it becomes full", wrong: ["When it hides", "When it is new", "When it falls"], why: "And the moon when it Ittasaq." },
        { q: "What does Ittasaq mean, per Al-Hasan?", a: "Comes together and becomes full", wrong: ["Breaks apart", "Turns red", "Goes dark"], why: "When it comes together and becomes full." },
        { tf: true, q: "Qatadah said Ittasaq means the moon completes its cycle.", why: "Qatadah said, When it completes its cycle." }
      ]
    },
    {
      slug: "stage-after-stage",
      title: "Stage after stage",
      line: "Life moves in stages: baby to old, ease to hardship.",
      facts: ["Tabaqan an tabaq: stage after stage", "Hard times pass"],
      quote: q84(19),
      source: ik(19, "Al-Hasan Al-Basri said stage after stage means ease after difficulty, health after sickness, and so on.", "Ease after difficulty, difficulty after ease"),
      difficulty: 3,
      questions: [
        { q: "How shall you travel, per 84:19?", a: "From stage to stage", wrong: ["In one jump", "Never moving", "Backwards"], why: "You shall certainly travel from stage to stage." },
        { q: "What stages did Ikrimah give?", a: "Baby to weaned, young to old", wrong: ["Sea to land", "Summer to winter", "Rich to king"], why: "Weaned after he was breast feeding, and an old man after he was a young man." },
        { tf: true, q: "Al-Hasan said ease can follow difficulty.", why: "Ease after difficulty, difficulty after ease, wealth after poverty." }
      ]
    },
    {
      slug: "why-do-they-not-believe",
      title: "Why do they not believe?",
      line: "Allah asks why they do not bow when the Quran is read.",
      facts: ["Sajdah: bowing in awe", "Respect the Quran"],
      quote: q84(21),
      source: ik(21, "Ibn Kathir asks what stops them from believing and from prostrating in awe when Allah's words are recited.", "they do not prostrate due to awe, respect and reverence"),
      difficulty: 3,
      questions: [
        { q: "What does 84:20 ask?", a: "Why they believe not", wrong: ["Why they sleep", "Why they travel", "Why they eat"], why: "What is the matter with them, that they believe not?" },
        { q: "What do they not do when the Quran is recited, per 84:21?", a: "Fall prostrate", wrong: ["Stand up", "Speak", "Walk away"], why: "And when the Quran is recited to them, they fall not prostrate." },
        { q: "Prostrating there shows what, per Ibn Kathir?", a: "Awe, respect and reverence", wrong: ["Tiredness", "Fear of people", "Boredom"], why: "They do not prostrate due to awe, respect and reverence." }
      ]
    },
    {
      slug: "allah-knows-what-they-hide",
      title: "Allah knows what they hide",
      line: "The deniers reject the truth; Allah knows their hearts.",
      facts: ["Yu'un: what they gather, hide", "Allah knows the heart"],
      quote: q84(23),
      source: ik(23, "Mujahid and Qatadah said what they gather means what they conceal in their chests.", "What they conceal in their chests"),
      difficulty: 3,
      questions: [
        { q: "What do the disbelievers do, per 84:22?", a: "Deny", wrong: ["Believe", "Pray", "Give charity"], why: "Nay, those who disbelieve deny." },
        { q: "What does Allah know best, per 84:23?", a: "What they gather", wrong: ["Nothing hidden", "Only what is spoken", "Only the past"], why: "And Allah knows best what they gather." },
        { tf: false, q: "Allah only knows what people say aloud.", why: "Mujahid and Qatadah both said, What they conceal in their chests." }
      ]
    },
    {
      slug: "a-warning-for-the-deniers",
      title: "A warning for the deniers",
      line: "Muhammad ﷺ was told to warn the deniers of a painful punishment.",
      facts: ["Bashir: give news", "A warning is a mercy"],
      quote: q84(24),
      source: ik(24, "Ibn Kathir says Muhammad ﷺ was told to inform them that Allah has prepared a painful torment for them.", "Allah has prepared for them a painful torment"),
      difficulty: 2,
      questions: [
        { q: "What news is given to the deniers, per 84:24?", a: "A painful torment", wrong: ["A great reward", "Nothing", "A long rest"], why: "So, announce to them a painful torment." },
        { q: "Who was told to inform them, per Ibn Kathir?", a: "Muhammad ﷺ", wrong: ["The angels only", "Their kings", "No one"], why: "Inform them, O Muhammad, that Allah has prepared for them a painful torment." },
        { tf: true, q: "Warning people before the Day is a kindness to them.", why: "Inform them, O Muhammad, that Allah has prepared for them a painful torment." }
      ]
    },
    {
      slug: "a-reward-without-end",
      title: "A reward without end",
      line: "Those who believe and do good get a reward that never ends.",
      facts: ["Ghayru mamnun: never cut off", "Faith in heart, deeds in limbs"],
      quote: q84(25),
      source: ik(25, "Ibn Abbas said the reward is without being decreased; Mujahid said without measure.", "Without being decreased"),
      difficulty: 2,
      questions: [
        { q: "Who are excepted, per 84:25?", a: "Those who believe and do good deeds", wrong: ["Those who are rich", "Those who are strong", "No one"], why: "Save those who believe and do righteous good deeds." },
        { q: "What does do good deeds refer to, per Ibn Kathir?", a: "What they do with their limbs", wrong: ["Only their thoughts", "Only their words", "Their wealth"], why: "And do righteous good deeds, is referring to that which they do with their limbs." },
        { q: "Which ayah also speaks of a gift without end?", a: "11:108", wrong: ["2:255", "1:5", "112:4"], why: "A gift without an end." }
      ]
    }
  ]
};

export const INSHIQAQ_UNITS: readonly DeepUnit[] = [INSHIQAQ_ONE, INSHIQAQ_TWO];
