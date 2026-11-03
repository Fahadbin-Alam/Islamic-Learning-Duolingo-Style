import type { LessonSource } from "../../types";
import { hadith, quranQuote, type DeepUnit } from "../deepKit";

// Surah At-Tin ayah by ayah, the way the surahs before it are taught: every ayah or small group of ayahs gets a lesson,
// explained as Tafsir Ibn Kathir explains it (the abridged English on quran.com), with a sahih hadith where one explains
// the ayah. Each source opens at the highlighted words that say the lesson's point.

/** Tafsir Ibn Kathir on At-Tin 95:ayah, on quran.com, opened at `highlight` (words copied from that page). */
function ik(ayah: number, summary: string, highlight: string): LessonSource {
  return {
    id: `deep_ibn_kathir_95_${ayah}`,
    site: "Quran.com",
    category: "tafsir",
    title: `Tafsir Ibn Kathir on At-Tin 95:${ayah}`,
    url: `https://quran.com/95:${ayah}/tafsirs/en-tafisr-ibn-kathir`,
    reference: `Tafsir Ibn Kathir 95:${ayah}`,
    from: "Tafsir Ibn Kathir (abridged English), on Quran.com",
    grade: "Tafsir",
    summary,
    highlight
  };
}

const q95 = (ayah: number) => quranQuote(95, ayah);



/** Ayahs 1 to 3: oaths by the fig and olive, Mount Sinai, and the safe city of Makkah. */
const TIN_ONE: DeepUnit = {
  key: "tin1",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-95",
  name: "At-Tin, ayahs 1-3",
  kind: "skill",
  lessonType: "surah",
  surahName: "At-Tin",
  lessons: [
    {
      slug: "the-sweetest-recitation",
      title: "The sweetest recitation",
      line: "Al-Bara heard Muhammad ﷺ recite At-Tin with the sweetest voice.",
      facts: ["Recited in Isha on a journey", "Beautify your recitation"],
      quote: q95(1),
      source: hadith("bukhari", "769", "Al-Bara ibn Azib", "Sahih", "Al-Bara heard the Prophet ﷺ recite At-Tin in the Isha prayer and never heard a sweeter voice or better recitation.", "I never heard a sweeter voice or a better way of recitation"),
      difficulty: 1,
      questions: [
        { q: "In which prayer did he recite At-Tin?", a: "Isha", wrong: ["Fajr", "Jumuah", "Eid"], why: "I heard the Prophet ﷺ reciting wa t-teeni wa z-zaitun in the Isha prayer." },
        { q: "What did Al-Bara say about his voice?", a: "He never heard a sweeter one", wrong: ["It was loud", "It was fast", "It was quiet"], why: "I never heard a sweeter voice or a better way of recitation than that of the Prophet ﷺ." },
        { tf: true, q: "He recited At-Tin while on a journey.", why: "The Prophet ﷺ used to recite in one of his Rakahs while traveling At-Tin waz-Zaytun." }
      ]
    },
    {
      slug: "by-the-fig",
      title: "By the fig",
      line: "Allah swears by the fig, a sweet and blessed fruit.",
      facts: ["At-Tin: the fig", "Az-Zaytun: the olive"],
      quote: q95(1),
      source: ik(1, "Mujahid said At-Tin is the fig that we eat, and Mujahid and Ikrimah said Az-Zaytun is the olive that is pressed for oil.", "It is this fig that you have"),
      difficulty: 1,
      questions: [
        { q: "By what does Allah swear in 95:1?", a: "The fig and the olive", wrong: ["The date and the grape", "The apple and the pear", "The wheat and barley"], why: "By At-Tin and Az-Zaytun." },
        { q: "What did Mujahid say At-Tin is?", a: "The fig we eat", wrong: ["A river", "A star", "A city"], why: "It is this fig that you have." },
        { q: "What did Mujahid and Ikrimah say Az-Zaytun is?", a: "The olive pressed for oil", wrong: ["A mountain", "A sea", "A bird"], why: "It is this olive which you press to extract the oil." }
      ]
    },
    {
      slug: "the-land-of-isa",
      title: "The land of Isa",
      line: "Some said the fig and olive point to Jerusalem, land of Isa.",
      facts: ["Bayt al-Maqdis: Jerusalem", "Isa ibn Maryam"],
      quote: q95(1),
      source: ik(1, "Some imams said the fig and olive stand for Jerusalem, where Allah sent Isa ibn Maryam; Qatadah and others said Az-Zaytun is the Masjid of Jerusalem.", "which was Jerusalem, where Allah sent"),
      difficulty: 2,
      questions: [
        { q: "Which place did some imams link to the fig and olive?", a: "Jerusalem", wrong: ["Baghdad", "Cairo", "Damascus"], why: "The first place is that of the fig and the olive, which was Jerusalem." },
        { q: "Which Messenger was sent there?", a: "Isa ibn Maryam", wrong: ["Hud", "Salih", "Shuayb"], why: "Jerusalem, where Allah sent Isa bin Maryam." },
        { tf: true, q: "Qatadah said Az-Zaytun is the Masjid of Jerusalem.", why: "It is the Masjid of Jerusalem, Bayt Al-Maqdis." }
      ]
    },
    {
      slug: "mount-sinai",
      title: "Mount Sinai",
      line: "Allah swears by Mount Sinai, where He spoke to Musa.",
      facts: ["Tur Sinin: Mount Sinai", "Musa ibn Imran"],
      quote: q95(2),
      source: ik(2, "Ka'b and several others said Tur Sinin is the mountain on which Allah spoke to Musa.", "It is the mountain upon which Allah spoke to Musa"),
      difficulty: 1,
      questions: [
        { q: "By what does Allah swear in 95:2?", a: "Tur Sinin", wrong: ["Mount Uhud", "Mount Arafah", "Mount Judi"], why: "By Tur Sinin." },
        { q: "What happened on that mountain?", a: "Allah spoke to Musa", wrong: ["The Ark landed", "A city was built", "A battle was fought"], why: "It is the mountain upon which Allah spoke to Musa." },
        { tf: false, q: "Tur Sinin is a mountain near Makkah.", why: "Mount Sinin, which is Mount Sinai where Allah spoke to Musa bin Imran." }
      ]
    },
    {
      slug: "the-safe-city",
      title: "The safe city",
      line: "The city of security is Makkah; there is no difference about it.",
      facts: ["Al-Balad al-Amin: the safe city", "Whoever enters is safe"],
      quote: q95(3),
      source: ik(3, "Ibn Abbas, Mujahid, Ikrimah and Al-Hasan said the city of security is Makkah, with no difference of opinion.", "There is no difference of opinion about this"),
      difficulty: 1,
      questions: [
        { q: "What is the city of security in 95:3?", a: "Makkah", wrong: ["Madinah", "Jerusalem", "Taif"], why: "By this city of security, meaning Makkah." },
        { q: "Did the scholars differ about it?", a: "No, there is no difference", wrong: ["Yes, greatly", "Only a little", "They never said"], why: "There is no difference of opinion about this." },
        { tf: true, q: "Whoever enters Makkah is safe.", why: "It is the city of security where whoever enters is safe." }
      ]
    },
    {
      slug: "three-noble-places",
      title: "Three noble places",
      line: "The oaths name the lands of Isa, Musa and Muhammad ﷺ.",
      facts: ["Three great Messengers", "Noble, nobler, noblest"],
      quote: q95(3),
      source: ik(3, "Some imams said the three places are where Isa, Musa and Muhammad ﷺ were sent; Allah swore by a noble place, then a nobler, then the noblest.", "He swore by a noble place, then by a nobler place"),
      difficulty: 3,
      questions: [
        { q: "Which Messenger was sent in Makkah?", a: "Muhammad ﷺ", wrong: ["Musa", "Isa", "Nuh"], why: "It is also the city in which Muhammad was sent." },
        { q: "How are the three places ordered, per Ibn Kathir?", a: "Noble, nobler, then noblest", wrong: ["By size", "By age only", "By distance"], why: "He swore by a noble place, then by a nobler place, and then by a place that is the nobler than both of them." },
        { tf: false, q: "The three places were all lands of one Messenger.", why: "Allah sent a Messenger to each of them from the Leading Messengers." }
      ]
    }
  ]
};

/** Ayahs 4 to 8: man made in the best form, the danger of falling low, and Allah the best of judges. */
const TIN_TWO: DeepUnit = {
  key: "tin2",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-95",
  name: "At-Tin, ayahs 4-8",
  kind: "skill",
  lessonType: "surah",
  surahName: "At-Tin",
  lessons: [
    {
      slug: "the-best-form",
      title: "The best form",
      line: "Allah made people in the best shape: upright and beautiful.",
      facts: ["Ahsan taqwim: the best form", "Thank Allah for your body"],
      quote: q95(4),
      source: ik(4, "Ibn Kathir says this is what the oaths are about: Allah made man in the best image, standing upright with straight, beautiful limbs.", "standing upright with straight limbs that He beautified"),
      difficulty: 1,
      questions: [
        { q: "How did Allah create man, per 95:4?", a: "In the best form", wrong: ["In a weak form", "In a strange form", "Without care"], why: "Verily, We created man in the best form." },
        { q: "How does man stand, per Ibn Kathir?", a: "Upright with straight limbs", wrong: ["On four legs", "Bent over", "Lying down"], why: "Standing upright with straight limbs that He beautified." },
        { tf: true, q: "95:4 is what the oaths in 95:1-3 are about.", why: "This is the subject being sworn about." }
      ]
    },
    {
      slug: "falling-low",
      title: "Falling low",
      line: "Whoever disobeys and rejects the Messengers can fall very low.",
      facts: ["Asfala safilin: lowest of the low", "Choose obedience"],
      quote: q95(5),
      source: ik(5, "Mujahid, Al-Hasan and others said the lowest of the low is the Fire, for those who disobey Allah and reject the Messengers.", "if they disobey Allah and belie the Messengers"),
      difficulty: 2,
      questions: [
        { q: "Where can man be reduced, per 95:5?", a: "The lowest of the low", wrong: ["The highest place", "The middle", "A garden"], why: "Then We reduced him to the lowest of the low." },
        { q: "Who falls so low, per Ibn Kathir?", a: "Those who disobey and reject", wrong: ["Those who pray", "Those who give", "Those who learn"], why: "If they disobey Allah and belie the Messengers." },
        { tf: false, q: "A good start means a good end without any effort.", why: "After this attractiveness and beauty, their destination will be the Fire if they disobey Allah." }
      ]
    },
    {
      slug: "except-the-believers",
      title: "Except the believers",
      line: "Those who believe and do good deeds are saved from falling low.",
      facts: ["Iman and good deeds", "Like Surah Al-Asr"],
      quote: q95(6),
      source: ik(6, "Ibn Kathir says the meaning is like 103:1-3: man is in loss, except those who believe and do righteous deeds.", "Verily man is in loss, except those who believe"),
      difficulty: 2,
      questions: [
        { q: "Who is excepted, per 95:6?", a: "Those who believe and do good", wrong: ["The richest people", "The strongest people", "Everyone"], why: "Save those who believe and do righteous deeds." },
        { q: "Which surah does Ibn Kathir compare?", a: "Al-Asr, 103:1-3", wrong: ["Al-Fil", "Al-Kawthar", "An-Nas"], why: "By Al-Asr. Verily man is in loss, except those who believe and perform righteous deeds." },
        { tf: true, q: "Belief needs good deeds alongside it.", why: "Save those who believe and do righteous deeds." }
      ]
    },
    {
      slug: "a-reward-without-end",
      title: "A reward without end",
      line: "The believers' reward never stops and never runs out.",
      facts: ["Ghayru mamnun: never ending", "Paradise lasts forever"],
      quote: q95(6),
      source: ik(6, "Ibn Kathir says their reward is one that will not end.", "that will not end"),
      difficulty: 1,
      questions: [
        { q: "What reward do they get, per 95:6?", a: "A reward without end", wrong: ["A short reward", "No reward", "A reward in coins"], why: "Then they shall have a reward without end." },
        { q: "What does without end mean, per Ibn Kathir?", a: "It will not end", wrong: ["It ends soon", "It is small", "It is hidden"], why: "Meaning, that will not end." },
        { tf: false, q: "The reward of Paradise runs out one day.", why: "A reward without end, meaning, that will not end." }
      ]
    },
    {
      slug: "why-deny-the-recompense",
      title: "Why deny the recompense?",
      line: "The One who began creation can easily bring it back.",
      facts: ["Ad-Din: the recompense", "Repeating is easier"],
      quote: q95(7),
      source: ik(7, "Ibn Kathir says you know the beginning, and He who began creation is able to repeat it, which is easier; so why deny the return?", "He Who is able to begin"),
      difficulty: 2,
      questions: [
        { q: "What does 95:7 ask man?", a: "What makes you deny the Recompense?", wrong: ["Where is your house?", "Who is your king?", "What is your name?"], why: "Then what causes you to deny after this the Recompense?" },
        { q: "Why is the return easy for Allah, per Ibn Kathir?", a: "He began it, so repeating is easier", wrong: ["It is small", "Angels do it alone", "It never happens"], why: "He Who is able to begin the creation is also able to repeat it which is easier." },
        { tf: true, q: "The question is addressed to the Son of Adam.", why: "Then what causes you to deny, meaning, O Son of Adam!" }
      ]
    },
    {
      slug: "the-best-of-judges",
      title: "The best of judges",
      line: "Allah is the best judge; He never wrongs anyone.",
      facts: ["Ahkam al-hakimin: best of judges", "Perfect justice"],
      quote: q95(8),
      source: ik(8, "Ibn Kathir says He is the best of judges, Who does not oppress or wrong anyone.", "Who does not oppress or do any injustice to anyone"),
      difficulty: 1,
      questions: [
        { q: "What does 95:8 ask?", a: "Is not Allah the best of judges?", wrong: ["Is not the king fair?", "Is not the sea deep?", "Is not the sky blue?"], why: "Is not Allah the best of judges?" },
        { q: "What does the best judge never do, per Ibn Kathir?", a: "Oppress anyone", wrong: ["Speak", "Know", "Decide"], why: "Who does not oppress or do any injustice to anyone." },
        { tf: false, q: "Allah's judgement can be unfair to someone.", why: "Who does not oppress or do any injustice to anyone." }
      ]
    },
    {
      slug: "justice-for-the-wronged",
      title: "Justice for the wronged",
      line: "On Judgement Day, anyone who was wronged will get justice.",
      facts: ["No wrong is forgotten", "Do not wrong others"],
      quote: q95(8),
      source: ik(8, "Ibn Kathir says from His justice is that He will hold the Judgement and give justice to the wronged against whoever wronged them.", "He will give retribution to the person who was wronged"),
      difficulty: 2,
      questions: [
        { q: "What will Allah give the wronged?", a: "Justice against the wrongdoer", wrong: ["Nothing", "A warning only", "More hardship"], why: "He will give retribution to the person who was wronged in this life against whoever wronged him." },
        { q: "Why will Allah hold the Judgement, per Ibn Kathir?", a: "From His justice", wrong: ["For a show", "For no reason", "To scare people"], why: "And from His justice is that He will establish the Judgement." },
        { tf: true, q: "Knowing this should stop us wronging others.", why: "He will give retribution to the person who was wronged against whoever wronged him." }
      ]
    }
  ]
};

export const TIN_UNITS: readonly DeepUnit[] = [TIN_ONE, TIN_TWO];
