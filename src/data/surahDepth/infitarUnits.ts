import type { LessonSource } from "../../types";
import { hadith, quranQuote, type DeepUnit } from "../deepKit";

// Surah Al-Infitar ayah by ayah, the way the surahs before it are taught: every ayah or small group of ayahs gets a lesson,
// explained as Tafsir Ibn Kathir explains it (the abridged English on quran.com), with a sahih hadith where one explains
// the ayah. Each source opens at the highlighted words that say the lesson's point.

/** Tafsir Ibn Kathir on Al-Infitar 82:ayah, on quran.com, opened at `highlight` (words copied from that page). */
function ik(ayah: number, summary: string, highlight: string): LessonSource {
  return {
    id: `deep_ibn_kathir_82_${ayah}`,
    site: "Quran.com",
    category: "tafsir",
    title: `Tafsir Ibn Kathir on Al-Infitar 82:${ayah}`,
    url: `https://quran.com/82:${ayah}/tafsirs/en-tafisr-ibn-kathir`,
    reference: `Tafsir Ibn Kathir 82:${ayah}`,
    from: "Tafsir Ibn Kathir (abridged English), on Quran.com",
    grade: "Tafsir",
    summary,
    highlight
  };
}

const q82 = (ayah: number) => quranQuote(82, ayah);


/** Ayahs 1 to 9: the sky split, the graves overturned, and what deceived man about his Generous Lord. */
const INFITAR_ONE: DeepUnit = {
  key: "infitar1",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-82",
  name: "Al-Infitar, ayahs 1-9",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Infitar",
  lessons: [
    {
      slug: "the-sky-splits",
      title: "The sky splits",
      line: "On the Last Day the sky will split open.",
      facts: ["Infatarat: split apart", "Ayah 73:18 says the same"],
      quote: q82(1),
      source: ik(1, "Ibn Kathir says Infatarat means the heaven splits, as in 73:18.", "meaning, it splits"),
      difficulty: 1,
      questions: [
        { q: "What happens to the heaven, per 82:1?", a: "It is cleft asunder", wrong: ["It turns gold", "It grows thicker", "It stays the same"], why: "When the heaven is cleft asunder." },
        { q: "What does Infatarat mean, per Ibn Kathir?", a: "It splits", wrong: ["It shines", "It rains", "It sings"], why: "Infatarat, meaning, it splits." },
        { tf: true, q: "Ayah 73:18 also says the heaven will be cleft.", why: "Whereon the heaven will be cleft asunder. (73:18)" }
      ]
    },
    {
      slug: "stars-fallen",
      title: "Stars fallen",
      line: "The stars will fall from their places in the sky.",
      facts: ["Intatharat: scattered, fallen", "Order ends at Allah's command"],
      quote: q82(2),
      source: ik(2, "Ibn Kathir says Intatharat means the stars will have fallen.", "meaning, fallen"),
      difficulty: 1,
      questions: [
        { q: "What happens to the stars, per 82:2?", a: "They fall and scatter", wrong: ["They multiply", "They stay fixed", "They turn green"], why: "And when the stars Intatharat, meaning, fallen." },
        { q: "Which surah before speaks of stars scattering?", a: "At-Takwir", wrong: ["Al-Fatihah", "Al-Ikhlas", "An-Nas"], why: "And when the stars Inkadarat. (81:2)" },
        { tf: false, q: "The stars will stay in place on the Last Day.", why: "And when the stars Intatharat, meaning, fallen." }
      ]
    },
    {
      slug: "seas-burst-forth",
      title: "Seas burst forth",
      line: "The seas will burst into each other and their water will go.",
      facts: ["Fujjirat: burst forth", "Sweet and salt water mix"],
      quote: q82(3),
      source: ik(3, "Ibn Abbas said parts of the seas will burst over other parts; Qatadah said fresh water will mix with salt water.", "Its fresh water will mix with its salt water"),
      difficulty: 2,
      questions: [
        { q: "What happens to the seas, per 82:3?", a: "They burst forth", wrong: ["They freeze", "They turn to sand", "They grow calm"], why: "And when the seas Fujjirat." },
        { q: "What did Qatadah say will mix?", a: "Fresh and salt water", wrong: ["Sand and rocks", "Fire and ice", "Clouds and stars"], why: "Qatadah said, Its fresh water will mix with its salt water." },
        { tf: true, q: "Al-Hasan said the seas' water will go away.", why: "Al-Hasan said, Allah will cause some parts of it to burst forth over other parts of it, and its water will go away." }
      ]
    },
    {
      slug: "graves-overturned",
      title: "Graves overturned",
      line: "The graves are overturned and all who are in them come out.",
      facts: ["Bu'thirat: overturned", "All will rise"],
      quote: q82(4),
      source: ik(4, "Ibn Abbas said the graves will be searched; As-Suddi said they will be moved and those in them will come out.", "they will be moved and those who are in them will come out"),
      difficulty: 1,
      questions: [
        { q: "What happens to the graves, per 82:4?", a: "They are overturned", wrong: ["They are sealed", "They are hidden", "They grow flowers"], why: "And when the graves Buthirat." },
        { q: "What did Ibn Abbas say Bu'thirat means?", a: "Searched", wrong: ["Locked", "Painted", "Forgotten"], why: "Ibn Abbas said, searched." },
        { tf: true, q: "Those in the graves will come out.", why: "They will be moved and those who are in them will come out." }
      ]
    },
    {
      slug: "sent-forward-and-left-behind",
      title: "Sent ahead, left behind",
      line: "Then each person will know what he sent ahead and left behind.",
      facts: ["Qaddamat: sent forward", "Akhkharat: left behind"],
      quote: q82(5),
      source: ik(5, "Ibn Kathir says when all these signs happen, each person will know his deeds.", "when this happens then this will occur"),
      difficulty: 2,
      questions: [
        { q: "What will a person know, per 82:5?", a: "What he sent forward and left behind", wrong: ["Tomorrow's weather", "Others' secrets", "Nothing"], why: "A person will know what he has sent forward and left behind." },
        { q: "When will he know it, per Ibn Kathir?", a: "When all these signs happen", wrong: ["Every morning", "Before birth", "Never"], why: "Meaning, when this happens then this will occur." },
        { tf: true, q: "Good we leave behind can count for us.", why: "A person will know what he has sent forward and left behind." }
      ]
    },
    {
      slug: "what-deceived-you",
      title: "What deceived you?",
      line: "Allah warns: what fooled you about your Lord, the Most Generous?",
      facts: ["Al-Karim: the Most Generous", "A warning, not a question"],
      quote: q82(6),
      source: ik(6, "Ibn Kathir says the ayah is a threat, not a request for an answer: what deceived you into disobeying your Generous Lord?", "It is not an attempt to get a reply"),
      difficulty: 3,
      questions: [
        { q: "How does Allah describe Himself in 82:6?", a: "The Most Generous", wrong: ["The Quick to anger", "The Distant", "The Unknown"], why: "O man! What has made you careless about your Lord, the Most Generous?" },
        { q: "What kind of words is 82:6, per Ibn Kathir?", a: "A threat, a warning", wrong: ["A joke", "A riddle", "A greeting"], why: "This is a threat. It is not an attempt to get a reply." },
        { tf: false, q: "The ayah asks man to give an excuse.", why: "It is not an attempt to get a reply as some people mistakenly think." }
      ]
    },
    {
      slug: "fashioned-perfectly",
      title: "Fashioned perfectly",
      line: "Allah made us balanced and in the best of forms.",
      facts: ["Sawwaka: fashioned you", "Adalaka: made you balanced"],
      quote: q82(7),
      source: ik(7, "Ibn Kathir says Allah made man complete, upright and balanced, in the best of forms and shapes.", "He fashioned you in the best of forms and shapes"),
      difficulty: 1,
      questions: [
        { q: "What three things did Allah do, per 82:7?", a: "Created, fashioned and proportioned", wrong: ["Fed, clothed and housed", "Named, taught and sent", "Saw, heard and wrote"], why: "Who created you, fashioned you perfectly, and gave you due proportion." },
        { q: "In what form did He make us, per Ibn Kathir?", a: "The best of forms", wrong: ["A weak form", "A random form", "A frightening form"], why: "He fashioned you in the best of forms and shapes." },
        { tf: true, q: "Being made so well should make us grateful.", why: "What has deceived you concerning the Most Generous Lord?" }
      ]
    },
    {
      slug: "in-whatever-form",
      title: "In whatever form He willed",
      line: "Allah shapes each of us to resemble our family as He wills.",
      facts: ["Surah: form", "Family likeness"],
      quote: q82(8),
      source: ik(8, "Mujahid said the form means resemblance: to the father, the mother, or an uncle.", "In which resemblance"),
      difficulty: 2,
      questions: [
        { q: "How did Allah put us together, per 82:8?", a: "In whatever form He willed", wrong: ["In the form we chose", "By chance", "All the same"], why: "In whatever form He willed, He put you together." },
        { q: "What did Mujahid say the form means?", a: "Resemblance to family", wrong: ["Height only", "Clothes", "Language"], why: "In which resemblance: the father, the mother, the paternal uncle, or the maternal uncle." },
        { tf: false, q: "We choose our own looks before birth.", why: "In whatever form He willed, He put you together." }
      ]
    },
    {
      slug: "denying-the-recompense",
      title: "Denying the recompense",
      line: "People disobey because in their hearts they deny the Hereafter.",
      facts: ["Ad-Din: the recompense", "Belief shapes deeds"],
      quote: q82(9),
      source: ik(9, "Ibn Kathir says what drives people to disobey is denying the Hereafter, the recompense and the reckoning in their hearts.", "by your rejection in your hearts of the Hereafter"),
      difficulty: 2,
      questions: [
        { q: "What do they deny, per 82:9?", a: "The Day of Recompense", wrong: ["The sunrise", "The rain", "The seasons"], why: "Nay! But you deny the Day of Ad-Din." },
        { q: "What leads to disobedience, per Ibn Kathir?", a: "Rejecting the Hereafter in the heart", wrong: ["Being hungry", "Being tired", "Being young"], why: "By your rejection in your hearts of the Hereafter, the recompense and the reckoning." },
        { tf: true, q: "Belief in the Hereafter helps us obey Allah.", why: "You are only compelled to oppose the Most Generous by your rejection in your hearts of the Hereafter." }
      ]
    }
  ]
};

/** Ayahs 10 to 19: the noble recording angels, the two final homes, and the Day only Allah decides. */
const INFITAR_TWO: DeepUnit = {
  key: "infitar2",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-82",
  name: "Al-Infitar, ayahs 10-19",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Infitar",
  lessons: [
    {
      slug: "noble-recorders",
      title: "Noble recorders",
      line: "Noble angels watch over us and write down all that we do.",
      facts: ["Kiraman Katibin: noble scribes", "Be shy before them"],
      quote: q82(10),
      source: ik(10, "Ibn Kathir says noble guardian angels are over you writing all you do, so do not meet them with evil deeds.", "indeed there are noble guardian angels over you"),
      difficulty: 1,
      questions: [
        { q: "Who watches over us, per 82:11?", a: "Kiraman Katibin, noble scribes", wrong: ["The jinn", "Our neighbours", "Nobody"], why: "But verily, over you to watch you are Kiraman Katibin." },
        { q: "What do they know, per 82:12?", a: "All that you do", wrong: ["Only big deeds", "Only good deeds", "Nothing"], why: "They know all that you do." },
        { tf: true, q: "Ibn Kathir says do not meet them with evil deeds.", why: "So do not meet them with evil deeds, because they write down all that you do." }
      ]
    },
    {
      slug: "angels-in-shifts",
      title: "Angels in shifts",
      line: "Angels take turns with us and meet at Fajr and Asr.",
      facts: ["Fajr and Asr", "Found praying"],
      quote: q82(12),
      source: hadith("bukhari", "555", "Abu Hurairah", "Sahih", "The Prophet ﷺ said angels come in turns by night and day and meet at Fajr and Asr; they tell Allah they left people praying and found them praying.", "Angels come to you in succession by night and day"),
      difficulty: 2,
      questions: [
        { q: "When do the angels meet together?", a: "At Fajr and Asr", wrong: ["At noon only", "At midnight", "On Fridays only"], why: "All of them get together at the time of the Fajr and Asr prayers." },
        { q: "What do the angels report to Allah?", a: "They were praying", wrong: ["They were sleeping", "They were arguing", "They were eating"], why: "When we left them they were praying and when we reached them, they were praying." },
        { tf: true, q: "Allah asks the angels though He knows everything.", why: "Allah asks them, though He knows everything about you." }
      ]
    },
    {
      slug: "the-righteous-in-delight",
      title: "The righteous in delight",
      line: "The righteous, who obeyed Allah, will live in delight.",
      facts: ["Al-Abrar: the righteous", "Na'im: delight"],
      quote: q82(13),
      source: ik(13, "Ibn Kathir says the righteous are those who obeyed Allah and did not meet Him with sins.", "They are those who obeyed Allah"),
      difficulty: 1,
      questions: [
        { q: "Where will the Abrar be, per 82:13?", a: "In delight", wrong: ["In a desert", "In a storm", "In a prison"], why: "Verily, the Abrar will be in Delight." },
        { q: "Who are the Abrar, per Ibn Kathir?", a: "Those who obeyed Allah", wrong: ["Those who were rich", "Those who were famous", "Those who were strong"], why: "They are those who obeyed Allah and did not meet Him with disobedience." },
        { tf: true, q: "Obeying Allah leads to delight.", why: "Allah informs of what the righteous will receive of delight." }
      ]
    },
    {
      slug: "the-wicked-in-the-fire",
      title: "The wicked in the Fire",
      line: "Those who chose evil will enter the Fire and not leave it.",
      facts: ["Al-Fujjar: the wicked", "Yawm ad-Din: the Day of Recompense"],
      quote: q82(14),
      source: ik(16, "Ibn Kathir says the evildoers will be in the Fire and will not be absent from it even for an hour.", "they will not be absent for even one hour"),
      difficulty: 2,
      questions: [
        { q: "Where will the wicked be, per 82:14?", a: "In the blazing Fire", wrong: ["In gardens", "In palaces", "In the sea"], why: "And verily, the wicked will be in the blazing Fire." },
        { q: "When will they enter it, per 82:15?", a: "On the Day of Recompense", wrong: ["Every night", "In this life", "Never"], why: "Therein they will enter on the Day of Recompense." },
        { tf: false, q: "The wicked will be able to leave the Fire for a while.", why: "They will not be absent for even one hour from the torment." }
      ]
    },
    {
      slug: "what-is-the-day",
      title: "What is the Day?",
      line: "Allah asks twice about the Day to show how great it is.",
      facts: ["Asked twice", "Tazim: magnifying"],
      quote: q82(17),
      source: ik(17, "Ibn Kathir says asking about the Day of Recompense, then asking again, shows how great it is.", "This is a magnification of the affair of the Day of Judgement"),
      difficulty: 2,
      questions: [
        { q: "How many times is the question asked, per 82:17-18?", a: "Twice", wrong: ["Once", "Ten times", "Never"], why: "And what will make you know what the Day of Recompense is? Again, what will make you know." },
        { q: "Why is it asked, per Ibn Kathir?", a: "To show how great the Day is", wrong: ["Because no one cares", "To make a rhyme", "To test spelling"], why: "This is a magnification of the affair of the Day of Judgement." },
        { tf: true, q: "Repeating the question makes the Day feel weightier.", why: "Then Allah affirms it by saying, Again, what will make you know what the Day of Recompense is?" }
      ]
    },
    {
      slug: "no-one-can-help",
      title: "No one can help another",
      line: "That Day no one can help another except by Allah's permission.",
      facts: ["La tamliku: has no power", "Shafa'ah only by permission"],
      quote: q82(19),
      source: ik(19, "Ibn Kathir says no one will benefit anyone else then, unless Allah gives permission to whom He is pleased with.", "no one will be able to benefit anyone else"),
      difficulty: 2,
      questions: [
        { q: "What will no person have, per 82:19?", a: "Power for another", wrong: ["Clothes", "Food", "A name"], why: "The Day when no person shall have power for another." },
        { q: "When can one help another, per Ibn Kathir?", a: "Only with Allah's permission", wrong: ["When rich", "When strong", "Always"], why: "Unless Allah gives permission to whomever He wishes and is pleased with." },
        { tf: false, q: "Family can save us that Day without Allah's leave.", why: "No one will be able to benefit anyone else, or help him." }
      ]
    },
    {
      slug: "save-yourselves",
      title: "Save yourselves",
      line: "The Prophet ﷺ told his own family to save themselves by deeds.",
      facts: ["Warn your nearest kin", "Deeds, not lineage"],
      quote: q82(19),
      source: hadith("bukhari", "2753", "Abu Hurairah", "Sahih", "The Prophet ﷺ called Quraysh, his clan, his aunt and his daughter, saying he could not save them from Allah's punishment; they must save themselves.", "Ask me anything from my wealth, but I cannot save you"),
      difficulty: 3,
      questions: [
        { q: "Which ayah came before this call?", a: "Warn your nearest kinsmen", wrong: ["Read in the name", "Say He is Allah", "By the dawn"], why: "When Allah revealed the Verse: Warn your nearest kinsmen." },
        { q: "What did he offer his daughter?", a: "Anything from his wealth", wrong: ["Safety from the Fire", "A kingdom", "Nothing at all"], why: "Ask me anything from my wealth, but I cannot save you from Allah's Punishment." },
        { tf: true, q: "Even the family of the Prophet ﷺ must rely on their own deeds.", why: "Buy, save, yourselves as I cannot save you from Allah's Punishment." }
      ]
    },
    {
      slug: "the-decision-is-allahs",
      title: "The decision is Allah's",
      line: "On that Day the command belongs to Allah alone.",
      facts: ["Al-Amr: the command", "Malik Yawm ad-Din"],
      quote: q82(19),
      source: ik(19, "Qatadah said the decision is Allah's now, but on that Day no one will even try to dispute it.", "the Decision is for Allah today"),
      difficulty: 2,
      questions: [
        { q: "With whom is the decision that Day, per 82:19?", a: "With Allah", wrong: ["With kings", "With judges", "With the crowd"], why: "And the Decision, that Day, will be with Allah." },
        { q: "Which ayah of Al-Fatihah says the same?", a: "1:4, Owner of the Day of Recompense", wrong: ["1:1, In the name of Allah", "1:6, Guide us", "1:7, Not those astray"], why: "The Only Owner of the Day of Recompense. (1:4)" },
        { tf: true, q: "Qatadah said no one will dispute with Allah then.", why: "By Allah, the Decision is for Allah today, but on that Day no one will try to dispute with Him about it." }
      ]
    }
  ]
};

export const INFITAR_UNITS: readonly DeepUnit[] = [INFITAR_ONE, INFITAR_TWO];
