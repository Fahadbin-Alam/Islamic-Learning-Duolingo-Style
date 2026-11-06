import type { LessonSource } from "../../types";
import { hadith, quranQuote, saadi, type DeepUnit } from "../deepKit";

// Surah Ash-Sharh ayah by ayah, the way the surahs before it are taught: every ayah or small group of ayahs gets a lesson,
// explained as Tafsir Ibn Kathir explains it (the abridged English on quran.com), with a sahih hadith where one explains
// the ayah. Each source opens at the highlighted words that say the lesson's point.

/** Tafsir Ibn Kathir on Ash-Sharh 94:ayah, on quran.com, opened at `highlight` (words copied from that page). */
function ik(ayah: number, summary: string, highlight: string): LessonSource {
  return {
    id: `deep_ibn_kathir_94_${ayah}`,
    site: "Quran.com",
    category: "tafsir",
    title: `Tafsir Ibn Kathir on Ash-Sharh 94:${ayah}`,
    url: `https://quran.com/94:${ayah}/tafsirs/en-tafisr-ibn-kathir`,
    reference: `Tafsir Ibn Kathir 94:${ayah}`,
    from: "Tafsir Ibn Kathir (abridged English), on Quran.com",
    grade: "Tafsir",
    summary,
    highlight
  };
}

const q94 = (ayah: number) => quranQuote(94, ayah);



/** Ayahs 1 to 4: an opened chest, a lifted burden, and a raised name. */
const SHARH_ONE: DeepUnit = {
  key: "sharh1",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-94",
  name: "Ash-Sharh, ayahs 1-4",
  kind: "skill",
  lessonType: "surah",
  surahName: "Ash-Sharh",
  lessons: [
    {
      slug: "an-opened-chest",
      title: "An opened chest",
      line: "Allah opened his chest: filled it with light and made it wide.",
      facts: ["Sharh as-sadr: opening the chest", "6:125: opened to Islam"],
      quote: q94(1),
      source: ik(1, "Ibn Kathir says Allah lit up his chest and made it spacious, vast and wide, as in 6:125.", "We illuminated it, and We made it spacious, vast and wide"),
      difficulty: 2,
      questions: [
        { q: "What does 94:1 ask?", a: "Have We not opened your breast?", wrong: ["Have We not made you rich?", "Have We not sent rain?", "Have We not built a house?"], why: "Have We not opened your breast for you?" },
        { q: "What did Allah do to his chest, per Ibn Kathir?", a: "Lit it and made it wide", wrong: ["Made it tight", "Made it heavy", "Made it cold"], why: "We illuminated it, and We made it spacious, vast and wide." },
        { q: "Which ayah says Allah opens the breast to Islam?", a: "6:125", wrong: ["2:2", "18:1", "67:1"], why: "And whomsoever Allah wills to guide, He opens his breast to Islam." }
      ]
    },
    {
      slug: "an-easy-religion",
      title: "An easy religion",
      line: "Allah made His Law wide and easy, with no needless hardship.",
      facts: ["Yusr: ease", "Do not overburden yourself"],
      quote: q94(1),
      source: hadith("bukhari", "39", "Abu Hurairah", "Sahih", "The Prophet ﷺ said the religion is easy, and whoever overburdens himself in it will not be able to keep going; so aim for what is right and be glad.", "Religion is very easy"),
      difficulty: 2,
      questions: [
        { q: "How did he describe the religion?", a: "Very easy", wrong: ["Very hard", "Only for scholars", "Only for adults"], why: "Religion is very easy." },
        { q: "What happens to one who overburdens himself?", a: "He cannot keep going", wrong: ["He becomes king", "He gets more", "Nothing"], why: "Whoever overburdens himself in his religion will not be able to continue in that way." },
        { tf: true, q: "Ibn Kathir says Allah made His Law easy, like the opened chest.", why: "He also made His Law vast, wide, accommodating and easy." }
      ]
    },
    {
      slug: "the-burden-lifted",
      title: "The burden lifted",
      line: "Allah lifted the heavy load from him, as 48:2 promises.",
      facts: ["Wizr: burden", "48:2: forgiven past and future"],
      quote: q94(2),
      source: ik(2, "Ibn Kathir explains the removed burden with 48:2: that Allah may forgive you what came before and after.", "That Allah may forgive you your sins of the past and the future"),
      difficulty: 2,
      questions: [
        { q: "What did Allah remove, per 94:2?", a: "His burden", wrong: ["His house", "His friends", "His camel"], why: "And removed from you your burden." },
        { q: "Which ayah does Ibn Kathir link to 94:2?", a: "48:2", wrong: ["1:2", "112:2", "36:2"], why: "That Allah may forgive you your sins of the past and the future." },
        { tf: false, q: "Allah left the burden on him.", why: "And removed from you your burden." }
      ]
    },
    {
      slug: "it-weighed-on-his-back",
      title: "Heavy on his back",
      line: "That burden felt so heavy, as if pressing on his back.",
      facts: ["Anqada: weighed down", "Allah makes heavy things light"],
      quote: q94(3),
      source: ik(3, "More than one of the Salaf said it means its burden weighed heavy upon you.", "its burden weighed heavy upon you"),
      difficulty: 2,
      questions: [
        { q: "What did the burden do, per 94:3?", a: "Weighed down his back", wrong: ["Made him rich", "Made him sleep", "Made him run"], why: "Which weighed down your back?" },
        { q: "What did the Salaf say it means?", a: "Its weight was heavy on him", wrong: ["It was light", "It was gold", "It was lost"], why: "Meaning, its burden weighed heavy upon you." },
        { tf: true, q: "Allah can lift what feels too heavy for us.", why: "And removed from you your burden, which weighed down your back." }
      ]
    },
    {
      slug: "his-name-raised-high",
      title: "His name raised high",
      line: "Allah raised the name of Muhammad ﷺ in both worlds.",
      facts: ["Rafa'na dhikrak: raised your fame", "Named with Allah's name"],
      quote: q94(4),
      source: ik(4, "Mujahid said Allah is not mentioned except that he is mentioned with Him; Qatadah said Allah raised his fame in this life and the Hereafter.", "Allah raised his fame in this life and in the Hereafter"),
      difficulty: 2,
      questions: [
        { q: "What did Allah raise, per 94:4?", a: "His fame", wrong: ["His house", "His age", "His tent"], why: "And have We not raised high your fame?" },
        { q: "Where is his fame raised, per Qatadah?", a: "This life and the Hereafter", wrong: ["Only Makkah", "Only in poems", "Only in books"], why: "Allah raised his fame in this life and in the Hereafter." },
        { tf: true, q: "Mujahid said Allah is not mentioned without him being mentioned too.", why: "I am not remembered except that you are remembered with Me." }
      ]
    },
    {
      slug: "in-every-shahadah",
      title: "In every Shahadah",
      line: "In every Shahadah and prayer, his name comes with Allah's.",
      facts: ["Shahadah: the testimony", "Heard in every adhan"],
      quote: q94(4),
      source: ik(4, "Qatadah said no one gives a sermon, says the Shahadah or prays except that he says: Muhammad is the Messenger of Allah.", "that Muhammad is the Messenger of Allah"),
      difficulty: 1,
      questions: [
        { q: "What is said with Allah's name in the Shahadah?", a: "Muhammad is the Messenger of Allah", wrong: ["Makkah is a city", "The sky is high", "Today is Friday"], why: "I bear witness that there is no God worthy of worship except Allah, and that Muhammad is the Messenger of Allah." },
        { q: "Where did Qatadah say his name is proclaimed?", a: "Sermons, Shahadah and prayer", wrong: ["Only in markets", "Only at weddings", "Only at night"], why: "There is no one who gives a sermon, declares the Shahadah, or prays except that he proclaims it." },
        { tf: false, q: "His name is mentioned only in old history books.", why: "Allah raised his fame in this life and in the Hereafter." }
      ]
    }
  ]
};

/** Ayahs 5 to 8: with hardship comes ease; after work, turn to worship and to your Lord. */
const SHARH_TWO: DeepUnit = {
  key: "sharh2",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-94",
  name: "Ash-Sharh, ayahs 5-8",
  kind: "skill",
  lessonType: "surah",
  surahName: "Ash-Sharh",
  lessons: [
    {
      slug: "with-hardship-comes-ease",
      title: "With hardship comes ease",
      line: "With every hardship Allah also places ease.",
      facts: ["Al-Usr: hardship", "Al-Yusr: ease"],
      quote: q94(5),
      source: ik(5, "Allah informs that with difficulty there is ease.", "with difficulty there is ease"),
      difficulty: 1,
      questions: [
        { q: "What comes along with hardship, per 94:5?", a: "Relief, ease", wrong: ["More hardship", "Nothing", "Anger"], why: "Verily, along with every hardship is relief." },
        { q: "What does Allah inform us, per Ibn Kathir?", a: "With difficulty there is ease", wrong: ["Difficulty never ends", "Ease is only for the rich", "Hardship is forever"], why: "Allah informs that with difficulty there is ease." },
        { tf: true, q: "The ease comes with the hardship, not only long after it.", why: "Verily, along with every hardship is relief." }
      ]
    },
    {
      slug: "said-twice",
      title: "Said twice",
      line: "Allah repeats the promise of ease to make our hearts sure.",
      facts: ["Repeated for certainty", "Never lose hope"],
      quote: q94(6),
      source: ik(6, "Ibn Kathir says Allah tells us there is ease with difficulty and then reaffirms it by repeating it.", "then reaffirms this information"),
      difficulty: 2,
      questions: [
        { q: "What does 94:6 do?", a: "Repeats the promise of ease", wrong: ["Takes it back", "Changes topic", "Asks a question"], why: "Verily, along with every hardship is relief." },
        { q: "Why is it repeated, per Ibn Kathir?", a: "To reaffirm it", wrong: ["By mistake", "To fill space", "For a rhyme only"], why: "And then reaffirms this information, by repeating it." },
        { tf: false, q: "Repeating it means the first promise was weak.", why: "Allah informs that with difficulty there is ease, and then reaffirms this information." }
      ]
    },
    {
      slug: "one-hardship-two-eases",
      title: "One hardship, two eases",
      line: "The same hardship is named twice, ease is new: two eases.",
      facts: ["As-Sa'di explains", "Al-usr: the hardship"],
      quote: q94(5),
      source: saadi(94, 5, "As-Sa'di says al-usr, the hardship, is the same one both times, while yusr, ease, is new each time, so one hardship never beats two eases.", "فلن يغلب عسر يسرين"),
      difficulty: 3,
      questions: [
        { q: "How many eases come with one hardship?", a: "Two", wrong: ["None", "Half of one", "Only one"], why: "One hardship will never beat two eases, says as-Sa'di." },
        { q: "Why is the hardship the same both times?", a: "It has al-, the", wrong: ["It is longer", "It is shorter", "It is plural"], why: "Al-usr is defined, so it is one; yusr is not, so it is repeated." },
        { tf: true, q: "Every hardship, however hard, has ease with it.", why: "As-Sa'di on 94:5." }
      ]
    },
    {
      slug: "when-you-are-free",
      title: "When you are free",
      line: "When daily work is done, stand up for worship with zeal.",
      facts: ["Fa idha faraghta: when you finish", "Fansab: stand up and strive"],
      quote: q94(7),
      source: ik(7, "When you finish your worldly tasks, get up to worship with zeal and pure intention; Mujahid said stand up for your Lord in prayer.", "then get up to perform the worship"),
      difficulty: 2,
      questions: [
        { q: "What should he do when finished, per 94:7?", a: "Devote himself to worship", wrong: ["Sleep all day", "Start a quarrel", "Count his money"], why: "So when you have finished, devote yourself to Allah's worship." },
        { q: "Finished with what, per Ibn Kathir?", a: "Worldly tasks", wrong: ["The Quran", "His family", "Faith"], why: "When you have completed your worldly affairs and its tasks." },
        { tf: true, q: "Mujahid said: when free, stand to pray for your Lord.", why: "When you are free from the worldly affairs, and you have stood to pray, then stand up for your Lord." }
      ]
    },
    {
      slug: "supper-before-prayer",
      title: "Supper before prayer",
      line: "If supper is ready at prayer time, eat first, then pray calmly.",
      facts: ["Pray with a free mind", "Do not rush the food"],
      quote: q94(7),
      source: hadith("bukhari", "671", "Aishah", "Sahih", "The Prophet ﷺ said: if supper is served and the Iqamah is called, start with the supper.", "If supper is served, and Iqama is pronounced one should start with the supper"),
      difficulty: 2,
      questions: [
        { q: "If supper is served at Iqamah, what comes first?", a: "The supper", wrong: ["Running to pray hungry", "Skipping both", "Sleeping"], why: "If supper is served, and Iqama is pronounced one should start with the supper." },
        { q: "Why does Ibn Kathir cite this with 94:7?", a: "Worship with a free, focused mind", wrong: ["Food is more important", "Prayer can be skipped", "To eat more"], why: "When you have completed your worldly affairs, then get up to perform the worship." },
        { tf: false, q: "The supper hadith allows missing the prayer for food.", why: "Start with the supper, then pray with a free mind." }
      ]
    },
    {
      slug: "turn-to-your-lord",
      title: "Turn to your Lord",
      line: "Turn all your hopes and intentions to your Lord alone.",
      facts: ["Farghab: turn with longing", "Pure intention"],
      quote: q94(8),
      source: ik(8, "Ibn Kathir says stand for worship with full devotion and purify your intention and desire for your Lord.", "purify your intention and desire for your Lord"),
      difficulty: 2,
      questions: [
        { q: "To whom should we turn our hopes, per 94:8?", a: "To our Lord", wrong: ["To rich people", "To luck", "To the stars"], why: "And to your Lord turn intentions and hopes." },
        { q: "What should we purify, per Ibn Kathir?", a: "Our intention and desire", wrong: ["Only our clothes", "Only our house", "Only our car"], why: "Purify your intention and desire for your Lord." },
        { tf: true, q: "Worship should be done with full devotion.", why: "Stand for it with zeal, complete devotion and purify your intention." }
      ]
    }
  ]
};

export const SHARH_UNITS: readonly DeepUnit[] = [SHARH_ONE, SHARH_TWO];
