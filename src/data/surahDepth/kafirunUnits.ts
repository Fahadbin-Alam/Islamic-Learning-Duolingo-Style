import type { LessonSource } from "../../types";
import { hadith, quranQuote, type DeepUnit } from "../deepKit";

// Surah Al-Kafirun ayah by ayah, the way the surahs before it are taught: every ayah or small group of ayahs gets a lesson,
// explained as Tafsir Ibn Kathir explains it (the abridged English on quran.com), with a sahih hadith where one explains
// the ayah. Each source opens at the highlighted words that say the lesson's point.

/** Tafsir Ibn Kathir on Al-Kafirun 109:ayah, on quran.com, opened at `highlight` (words copied from that page). */
function ik(ayah: number, summary: string, highlight: string): LessonSource {
  return {
    id: `deep_ibn_kathir_109_${ayah}`,
    site: "Quran.com",
    category: "tafsir",
    title: `Tafsir Ibn Kathir on Al-Kafirun 109:${ayah}`,
    url: `https://quran.com/109:${ayah}/tafsirs/en-tafisr-ibn-kathir`,
    reference: `Tafsir Ibn Kathir 109:${ayah}`,
    from: "Tafsir Ibn Kathir (abridged English), on Quran.com",
    grade: "Tafsir",
    summary,
    highlight
  };
}

const q109 = (ayah: number) => quranQuote(109, ayah);


/** Ayahs 1 to 3: a clear declaration that the Prophet ﷺ does not worship what the idolaters worship. */
const KAFIRUN_ONE: DeepUnit = {
  key: "kafirun1",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-109",
  name: "Al-Kafirun, ayahs 1-3",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Kafirun",
  lessons: [
    {
      slug: "say-o-disbelievers",
      title: "Say: O disbelievers",
      line: "Al-Kafirun declares a clean break from worshipping idols.",
      facts: ["Qul: say", "Kafirun: disbelievers"],
      quote: q109(1),
      source: ik(1, "Al-Kafirun is the surah of disavowal from the deeds of the idolaters; it commands a complete disavowal of them.", "the Surah of disavowal from the deeds of the idolators"),
      difficulty: 1,
      questions: [
        { q: "What kind of surah is Al-Kafirun, per Ibn Kathir?", a: "A surah of disavowal from idol worship", wrong: ["A surah of stories", "A surah of laws on trade", "A surah of dua for rain"], why: "The Surah of disavowal from the deeds of the idolators." },
        { q: "Whom does 109:1 address?", a: "The disbelievers", wrong: ["The believers", "The angels", "The prophets"], why: "Say: O disbelievers!" },
        { tf: true, q: "The call includes every disbeliever on earth.", why: "Say: O disbelievers! includes every disbeliever on the face of the earth." }
      ]
    },
    {
      slug: "the-two-rakahs-of-fajr",
      title: "The two rak'ahs of Fajr",
      line: "Before Fajr he often recited Al-Kafirun and Al-Ikhlas.",
      facts: ["Sunnah of Fajr", "Pair with Al-Ikhlas"],
      quote: q109(1),
      source: hadith("muslim", "726", "Abu Hurairah", "Sahih", "In the two optional rak'ahs of Fajr the Prophet ﷺ recited Say: O disbelievers, and Say: Allah is One.", "Say: O unbelievers"),
      difficulty: 2,
      questions: [
        { q: "In which prayer did he recite Al-Kafirun?", a: "The two optional rak'ahs of Fajr", wrong: ["Only in Jumuah", "Only on Eid", "Only in Isha"], why: "He recited in the two rak'ahs of the dawn: Say: O unbelievers." },
        { q: "Which surah did he pair with Al-Kafirun?", a: "Al-Ikhlas", wrong: ["Al-Fatihah only", "Al-Kahf", "Yasin"], why: "Say: O unbelievers, and Say: Allah is one." },
        { tf: true, q: "Abu Hurayrah narrated the hadith.", why: "Abu Huraira reported that the Messenger of Allah recited them." }
      ]
    },
    {
      slug: "a-surah-before-sleep",
      title: "A surah before sleep",
      line: "He taught a Companion to recite Al-Kafirun before sleeping.",
      facts: ["Bedtime recitation", "Free from shirk"],
      quote: q109(1),
      source: hadith("abudawud", "5055", "Nawfal", "Sahih", "He told Nawfal to recite Al-Kafirun and sleep at its end, for it is a declaration of freedom from polytheism.", "it is a declaration of freedom from polytheism"),
      difficulty: 2,
      questions: [
        { q: "When did he tell Nawfal to recite Al-Kafirun?", a: "Before going to sleep", wrong: ["Before eating", "Before traveling", "Before trading"], why: "Recite Say, O you disbelievers, and then go to sleep at its end." },
        { q: "What is Al-Kafirun, per the hadith?", a: "A declaration of freedom from shirk", wrong: ["A dua for wealth", "A story of a king", "A rule on fasting"], why: "It is a declaration of freedom from polytheism." },
        { tf: false, q: "He said to sleep before finishing the surah.", why: "Go to sleep at its end." }
      ]
    },
    {
      slug: "not-what-you-worship",
      title: "Not what you worship",
      line: "The Prophet ﷺ would never worship their statues and rival gods.",
      facts: ["La abudu: I worship not", "Idols and rivals"],
      quote: q109(2),
      source: ik(2, "I worship not that which you worship means statues and rival gods.", "statues and rival gods"),
      difficulty: 2,
      questions: [
        { q: "What does 109:2 refuse to worship?", a: "What the idolaters worship", wrong: ["Allah", "The Lord of the Ka'bah", "The Creator"], why: "I worship not that which you worship." },
        { q: "What did they worship, per Ibn Kathir?", a: "Statues and rival gods", wrong: ["The sun only", "The angels only", "Nothing at all"], why: "Meaning, statues and rival gods." },
        { tf: false, q: "Mixing a little idol worship with Islam is fine.", why: "Allah commanded His Messenger to disavow himself from their religion completely." }
      ]
    },
    {
      slug: "whom-i-worship",
      title: "Whom I worship",
      line: "The Prophet ﷺ worships Allah alone, Who has no partner.",
      facts: ["Ma: what, read as Man", "What becomes Who"],
      quote: q109(3),
      source: ik(3, "Whom I worship is Allah Alone, Who has no partner; the word Ma, what, here means Man, who.", "He is Allah Alone, Who has no partner"),
      difficulty: 3,
      questions: [
        { q: "Whom does the Prophet ﷺ worship, per 109:3?", a: "Allah alone, with no partner", wrong: ["Allah and idols", "The stars", "His ancestors"], why: "He is Allah Alone, Who has no partner." },
        { q: "What does Ma mean in the ayah, per Ibn Kathir?", a: "Man, meaning who", wrong: ["Water", "Never", "Maybe"], why: "So the word Ma, what, means Man, who." },
        { tf: true, q: "The idolaters did not truly worship Allah alone.", why: "Nor will you worship whom I worship." }
      ]
    }
  ]
};

/** Ayahs 4 to 6: different worship, different ways; to you your religion and to me mine. */
const KAFIRUN_TWO: DeepUnit = {
  key: "kafirun2",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-109",
  name: "Al-Kafirun, ayahs 4-6",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Kafirun",
  lessons: [
    {
      slug: "worship-the-way-he-loves",
      title: "Worship the way He loves",
      line: "Muslims worship Allah only in the way He loves and accepts.",
      facts: ["Ibadah: worship", "His way, not ours"],
      quote: q109(4),
      source: ik(4, "I do not go along with your worship; I only worship Allah in the manner He loves and is pleased with.", "I only worship Allah in the manner in which He loves and is pleased with"),
      difficulty: 2,
      questions: [
        { q: "What does 109:4 say?", a: "I shall not worship what you worship", wrong: ["I shall join your worship", "I shall worship both", "I shall stop praying"], why: "And I shall not worship that which you are worshipping." },
        { q: "How does a Muslim worship, per Ibn Kathir?", a: "As Allah loves and is pleased with", wrong: ["However one likes", "As the crowd does", "As ancestors did"], why: "I only worship Allah in the manner in which He loves and is pleased with." },
        { tf: true, q: "How we worship matters, not only whom.", why: "The worshipper must have a god whom he worships and set acts of worship that he follows." }
      ]
    },
    {
      slug: "following-their-own-wishes",
      title: "Following their own wishes",
      line: "The idolaters made up worship from their own wishes.",
      facts: ["Hawa: desires", "53:23"],
      quote: q109(5),
      source: ik(5, "You do not follow Allah's commands in His worship; you have invented something from the promptings of your own souls.", "you have invented something out of the promptings of your own souls"),
      difficulty: 2,
      questions: [
        { q: "Where did their worship come from, per Ibn Kathir?", a: "Their own souls' promptings", wrong: ["Allah's revelation", "The prophets", "The angels"], why: "You have invented something out of the promptings of your own souls." },
        { q: "Which ayah says they follow guesses and desires?", a: "53:23", wrong: ["2:255", "112:1", "1:1"], why: "They follow but a guess and that which they themselves desire (53:23)." },
        { tf: false, q: "Any made-up worship pleases Allah.", why: "You do not follow the commands of Allah and His Legislation in His worship." }
      ]
    },
    {
      slug: "the-only-path-to-him",
      title: "The only path to Him",
      line: "We worship Allah only in the way the Messenger ﷺ brought.",
      facts: ["La ilaha illa Allah", "Muhammad Rasul Allah"],
      quote: q109(5),
      source: ik(5, "There is no true object of worship except Allah, and no path to Him other than what the Messenger ﷺ came with.", "there is no path to Him"),
      difficulty: 3,
      questions: [
        { q: "What does the first half of the Shahadah teach?", a: "Only Allah deserves worship", wrong: ["Many gods are equal", "Idols bring us near", "Worship is optional"], why: "There is no true object of worship except Allah." },
        { q: "What does the second half teach, per Ibn Kathir?", a: "Worship as the Messenger ﷺ taught", wrong: ["Worship as we wish", "Follow any guide", "Skip all worship"], why: "There is no path to Him other than that which the Messenger ﷺ came with." },
        { tf: true, q: "The Shahadah covers both whom and how we worship.", why: "No object of worship except Allah and no path to Him other than what the Messenger ﷺ came with." }
      ]
    },
    {
      slug: "to-you-your-religion",
      title: "To you your religion",
      line: "Each side has its own religion; a Muslim never mixes the two.",
      facts: ["Din: religion", "No mixing in worship"],
      quote: q109(6),
      source: ik(6, "The Messenger ﷺ said to the idolaters: to you be your religion, and to me my religion.", "To you be your religion, and to me my religion"),
      difficulty: 2,
      questions: [
        { q: "What does 109:6 say?", a: "To you your religion, to me mine", wrong: ["Let us share one religion", "Leave all religion", "Choose any god"], why: "To you be your religion, and to me my religion." },
        { q: "What did Al-Bukhari say my religion means?", a: "Islam", wrong: ["Trade", "Poetry", "Travel"], why: "And to me my religion means Islam." },
        { tf: false, q: "109:6 means all worship is the same.", why: "To you be your religion means disbelief, and to me my religion means Islam." }
      ]
    },
    {
      slug: "my-deeds-and-your-deeds",
      title: "My deeds and your deeds",
      line: "Each person answers for their own deeds before Allah.",
      facts: ["10:41", "28:55"],
      quote: q109(6),
      source: ik(6, "Similar to 10:41: For me are my deeds and for you are your deeds.", "For me are my deeds and for you are your deeds"),
      difficulty: 3,
      questions: [
        { q: "Which ayah is similar to 109:6, per Ibn Kathir?", a: "10:41", wrong: ["2:2", "36:1", "114:1"], why: "For me are my deeds and for you are your deeds! (10:41)." },
        { q: "What does 28:55 say?", a: "To us our deeds, to you yours", wrong: ["Let us mix our deeds", "Deeds do not matter", "Only words count"], why: "To us our deeds, and to you your deeds (28:55)." },
        { tf: true, q: "Each one is free of what the other does.", why: "You are innocent of what I do, and I am innocent of what you do!" }
      ]
    }
  ]
};

export const KAFIRUN_UNITS: readonly DeepUnit[] = [KAFIRUN_ONE, KAFIRUN_TWO];
