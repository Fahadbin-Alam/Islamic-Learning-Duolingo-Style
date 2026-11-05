import type { LessonSource } from "../../types";
import { hadith, quranQuote, saadi, type DeepUnit } from "../deepKit";

// Surah Al-Kawthar ayah by ayah, the way the surahs before it are taught: every ayah or small group of ayahs gets a lesson,
// explained as Tafsir Ibn Kathir explains it (the abridged English on quran.com), with a sahih hadith where one explains
// the ayah. Each source opens at the highlighted words that say the lesson's point.

/** Tafsir Ibn Kathir on Al-Kawthar 108:ayah, on quran.com, opened at `highlight` (words copied from that page). */
function ik(ayah: number, summary: string, highlight: string): LessonSource {
  return {
    id: `deep_ibn_kathir_108_${ayah}`,
    site: "Quran.com",
    category: "tafsir",
    title: `Tafsir Ibn Kathir on Al-Kawthar 108:${ayah}`,
    url: `https://quran.com/108:${ayah}/tafsirs/en-tafisr-ibn-kathir`,
    reference: `Tafsir Ibn Kathir 108:${ayah}`,
    from: "Tafsir Ibn Kathir (abridged English), on Quran.com",
    grade: "Tafsir",
    summary,
    highlight
  };
}

const q108 = (ayah: number) => quranQuote(108, ayah);


/** Ayah 1: Allah granted the Prophet ﷺ Al-Kawthar, abundant goodness and a river in Paradise. */
const KAWTHAR_ONE: DeepUnit = {
  key: "kawthar1",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-108",
  name: "Al-Kawthar, ayah 1",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Kawthar",
  lessons: [
    {
      slug: "a-surah-with-a-smile",
      title: "A surah with a smile",
      line: "The Prophet ﷺ raised his head smiling as Al-Kawthar came down.",
      facts: ["Revealed in the masjid", "Shortest surah"],
      quote: q108(1),
      source: hadith("muslim", "400", "Anas ibn Malik", "Sahih", "The Prophet ﷺ dozed off, then raised his head smiling and said a surah had just been revealed to him, then recited Al-Kawthar.", "He then raised his head smilingly"),
      difficulty: 1,
      questions: [
        { q: "How did the Prophet ﷺ look when Al-Kawthar came?", a: "Smiling", wrong: ["Sad", "Angry", "Worried"], why: "He then raised his head smilingly." },
        { q: "What did he say had happened?", a: "A surah was just revealed", wrong: ["A guest had come", "Rain had fallen", "A battle was won"], why: "A Sura has just been revealed to me." },
        { tf: true, q: "Al-Kawthar is a river his Lord promised him.", why: "It is a canal which my Lord has promised me, and there is an abundance of good in it." }
      ]
    },
    {
      slug: "abundant-goodness",
      title: "Abundant goodness",
      line: "Al-Kawthar means a great abundance of good from Allah.",
      facts: ["Kathrah: abundance", "Kawthar: abundant good"],
      quote: q108(1),
      source: ik(1, "Ibn Abbas said Al-Kawthar is the abundant goodness; the word comes from Kathrah, abundance.", "Al-Kawthar is the abundant goodness"),
      difficulty: 1,
      questions: [
        { q: "What is Al-Kawthar, per Ibn Abbas?", a: "The abundant goodness", wrong: ["A mountain", "A city", "A star"], why: "Al-Kawthar is the abundant goodness." },
        { q: "Which word does Al-Kawthar come from?", a: "Kathrah, abundance", wrong: ["Kitab, book", "Qalb, heart", "Nur, light"], why: "The word Al-Kawthar comes from the word Kathrah." },
        { tf: true, q: "The abundant good includes the river and more.", why: "The explanation includes the river and other things as well." }
      ]
    },
    {
      slug: "the-river-is-part-of-the-good",
      title: "The river is part of the good",
      line: "Both meanings agree: the river is one part of the great good.",
      facts: ["Said bin Jubayr", "No contradiction"],
      quote: q108(1),
      source: hadith("bukhari", "4966", "Ibn Abbas", "Sahih", "Said bin Jubayr explained that the river in Paradise is part of the good Allah gave His Messenger.", "The river in Paradise is part of the good which Allah has bestowed"),
      difficulty: 2,
      questions: [
        { q: "What did Said bin Jubayr say about the river?", a: "Part of the good Allah gave", wrong: ["Only a story", "Not in Paradise", "Far from the good"], why: "The river in Paradise is part of the good which Allah has bestowed on His Apostle." },
        { q: "Who first said Al-Kawthar is the good Allah gave?", a: "Ibn Abbas", wrong: ["Abu Bakr", "Umar", "Bilal"], why: "Ibn Abbas said about Al-Kauthar: That is the good which Allah has bestowed." },
        { tf: false, q: "The river meaning and the good meaning clash.", why: "The river in Paradise is part of the good which Allah has bestowed." }
      ]
    },
    {
      slug: "banks-of-hollow-pearls",
      title: "Banks of hollow pearls",
      line: "On the ascent he saw Al-Kawthar, banked with pearl tents.",
      facts: ["Al-Miraj: the ascent", "Jibril named the river"],
      quote: q108(1),
      source: hadith("bukhari", "4964", "Anas ibn Malik", "Sahih", "When he ascended to the heavens he came to a river with banks of hollow pearl tents, and Jibril said it is Al-Kawthar.", "I came upon a river the banks of which were made of tents of hollow pearls"),
      difficulty: 2,
      questions: [
        { q: "What were the river banks made of?", a: "Tents of hollow pearls", wrong: ["Red bricks", "Green grass", "Silver sand"], why: "A river the banks of which were made of tents of hollow pearls." },
        { q: "Who told him the river was Al-Kawthar?", a: "Jibril", wrong: ["Musa", "Ibrahim", "Isa"], why: "I asked Gabriel. He replied, This is the Kauthar." },
        { tf: true, q: "He saw Al-Kawthar during the ascent to the heavens.", why: "When the Prophet ﷺ was made to ascend to the Heavens, he came upon a river." }
      ]
    },
    {
      slug: "never-thirsty-again",
      title: "Never thirsty again",
      line: "Whoever drinks from his Pond will never feel thirst again.",
      facts: ["Al-Hawd: the Pond", "Cups like the stars"],
      quote: q108(1),
      source: hadith("bukhari", "6579", "Abdullah ibn Amr", "Sahih", "His Pond takes a month to cross, its water whiter than milk, its cups like the stars, and whoever drinks will never thirst.", "whoever drinks from it, will never be thirsty"),
      difficulty: 3,
      questions: [
        { q: "What is the Pond water like, per the hadith?", a: "Whiter than milk", wrong: ["Salty like the sea", "Brown like mud", "Hot like tea"], why: "Its water is whiter than milk." },
        { q: "How many cups does the Pond have?", a: "As many as the stars", wrong: ["Only seven", "Only one", "Ten exactly"], why: "Its drinking cups are as numerous as the stars of the sky." },
        { tf: false, q: "One sip from the Pond lasts only a short while.", why: "Whoever drinks from it, will never be thirsty." }
      ]
    }
  ]
};

/** Ayahs 2 and 3: pray and sacrifice for your Lord alone; the one who hates you is the one cut off. */
const KAWTHAR_TWO: DeepUnit = {
  key: "kawthar2",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-108",
  name: "Al-Kawthar, ayahs 2-3",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Kawthar",
  lessons: [
    {
      slug: "pray-for-your-lord",
      title: "Pray for your Lord",
      line: "Thank Allah for His gifts with prayer made for Him alone.",
      facts: ["Salli: pray", "Li-Rabbika: for your Lord"],
      quote: q108(2),
      source: ik(2, "Make your obligatory and optional prayer, and your sacrifice, solely and sincerely for your Lord.", "solely and sincerely for your Lord"),
      difficulty: 1,
      questions: [
        { q: "What does 108:2 command first?", a: "Prayer to your Lord", wrong: ["Travel to Yemen", "Build a house", "Count wealth"], why: "Therefore turn in prayer to your Lord and sacrifice." },
        { q: "How should prayer be offered, per Ibn Kathir?", a: "Solely and sincerely for Allah", wrong: ["To impress people", "Only on Fridays", "Only when sad"], why: "Solely and sincerely for your Lord." },
        { tf: true, q: "Both obligatory and optional prayers are meant.", why: "Make your obligatory and optional prayer solely and sincerely for your Lord." }
      ]
    },
    {
      slug: "sacrifice-in-his-name",
      title: "Sacrifice in His name",
      line: "A sacrifice is made in Allah's name alone, with no partner.",
      facts: ["Wanhar: and sacrifice", "Bismillah over it"],
      quote: q108(2),
      source: ik(2, "Sacrifice pronouncing His Name alone, the opposite of the idolaters, who sacrificed in names other than His.", "sacrifice pronouncing His Name alone, without ascribing any partner to Him"),
      difficulty: 2,
      questions: [
        { q: "Whose name is said over a sacrifice?", a: "Allah's name alone", wrong: ["A king's name", "An idol's name", "No name at all"], why: "Sacrifice pronouncing His Name alone." },
        { q: "Which ayah says my prayer and sacrifice are for Allah?", a: "6:162", wrong: ["2:255", "1:5", "112:1"], why: "Verily, my Salah, my sacrifice, my living, and my dying are for Allah (6:162)." },
        { tf: false, q: "The idolaters sacrificed only in Allah's name.", why: "This is the opposite of the way of the idolators, sacrificing in other than His Name." }
      ]
    },
    {
      slug: "two-rams-for-eid",
      title: "Two rams for Eid",
      line: "The Prophet ﷺ sacrificed two rams himself, saying Allah's name.",
      facts: ["Udhiyah: Eid sacrifice", "Bismillah, Allahu Akbar"],
      quote: q108(2),
      source: hadith("bukhari", "5565", "Anas ibn Malik", "Sahih", "The Prophet ﷺ sacrificed two horned rams, black and white, with his own hands, mentioning Allah's name and saying Takbir.", "two horned rams, black and white in color"),
      difficulty: 2,
      questions: [
        { q: "What did the Prophet ﷺ sacrifice, per Anas?", a: "Two horned rams", wrong: ["Ten camels", "One cow", "Three goats"], why: "The Prophet ﷺ offered as sacrifices two horned rams." },
        { q: "What color were the rams?", a: "Black and white", wrong: ["All brown", "All gray", "Red and gold"], why: "Two horned rams, black and white in color." },
        { tf: true, q: "He mentioned Allah's name and said Takbir.", why: "He mentioned Allah's Name over them and said Takbir." }
      ]
    },
    {
      slug: "why-prayer-and-sacrifice",
      title: "Why prayer and sacrifice?",
      line: "These two are named as the best acts of worship.",
      facts: ["As-Sa'di explains", "Heart, body and wealth"],
      quote: q108(2),
      source: saadi(108, 2, "As-Sa'di says prayer and sacrifice are named because they are among the best worship: prayer humbles heart and body, and sacrifice gives wealth the soul loves.", "لأنهما من أفضل العبادات وأجل القربات"),
      difficulty: 2,
      questions: [
        { q: "Why are prayer and sacrifice named in 108:2?", a: "They are among the best worship", wrong: ["They are the easiest", "They are only for Eid", "They cost nothing"], why: "Among the best acts of worship, says as-Sa'di." },
        { q: "What does a sacrifice give up for Allah?", a: "Wealth we love", wrong: ["Our sleep", "Our friends", "Our home"], why: "Giving wealth the soul is made to love." },
        { tf: true, q: "Prayer humbles both the heart and the body.", why: "As-Sa'di on 108:2." }
      ]
    },
    {
      slug: "who-is-really-cut-off",
      title: "Who is really cut off?",
      line: "Whoever hates the Prophet ﷺ is the one truly cut off.",
      facts: ["Shani: one who hates", "Al-Abtar: cut off"],
      quote: q108(3),
      source: ik(3, "Whoever hates the Prophet ﷺ and the guidance he brought is the most cut off and will not be remembered.", "he is the most cut off"),
      difficulty: 2,
      questions: [
        { q: "Who will be cut off, per 108:3?", a: "The one who hates the Prophet ﷺ", wrong: ["The Prophet ﷺ", "The believers", "The poor"], why: "For he who hates you, he will be cut off." },
        { q: "What did his enemies wrongly claim?", a: "He had no sons to keep his name", wrong: ["He had no friends", "He had no camels", "He had no house"], why: "When the sons of the Messenger of Allah died they said, Muhammad has been cut off." },
        { tf: false, q: "Hating the guidance brings a person honor.", why: "He who hates what you have come with of guidance is the most cut off." }
      ]
    },
    {
      slug: "his-name-lives-on",
      title: "His name lives on",
      line: "Allah raised the Prophet's ﷺ mention across the whole world.",
      facts: ["Remembered daily", "Until the Last Day"],
      quote: q108(3),
      source: ik(3, "They thought his sons dying would end his remembrance, but Allah preserved it for all the world to see.", "Allah preserved his remembrance for all the world to see"),
      difficulty: 3,
      questions: [
        { q: "What did Allah preserve, per Ibn Kathir?", a: "The Prophet's ﷺ remembrance", wrong: ["His enemy's fame", "An old idol", "A trade route"], why: "Allah preserved his remembrance for all the world to see." },
        { q: "How long will his message be followed?", a: "Until the Day of Gathering", wrong: ["One century", "Until he died", "Ten years"], why: "This will continue for all of time until the Day of Gathering." },
        { tf: true, q: "The enemies' claim proved completely wrong.", why: "Allah forbid! To the contrary, Allah preserved his remembrance." }
      ]
    },
    {
      slug: "cut-off-from-all-good",
      title: "Cut off from all good",
      line: "His hater is cut off from good, in deeds and name.",
      facts: ["As-Sa'di explains", "Al-Abtar: cut off"],
      quote: q108(3),
      source: saadi(108, 3, "As-Sa'di says the one who hates the Prophet ﷺ is cut off from all good, cut off in deeds and in being remembered.", "المقطوع من كل خير"),
      difficulty: 2,
      questions: [
        { q: "What is the hater of the Prophet ﷺ cut off from?", a: "All good", wrong: ["Only money", "Only family", "Nothing"], why: "Cut off from all good, says as-Sa'di." },
        { q: "What else of his is cut off?", a: "His deeds and mention", wrong: ["His food", "His sleep", "His clothes"], why: "Cut off in deeds, cut off in mention." },
        { tf: true, q: "The Prophet ﷺ has many helpers and followers.", why: "As-Sa'di on 108:3." }
      ]
    }
  ]
};

export const KAWTHAR_UNITS: readonly DeepUnit[] = [KAWTHAR_ONE, KAWTHAR_TWO];
