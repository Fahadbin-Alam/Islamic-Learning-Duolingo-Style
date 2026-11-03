import type { LessonSource } from "../../types";
import { hadith, quranQuote, type DeepUnit } from "../deepKit";

// Surah Al-Humazah ayah by ayah, the way the surahs before it are taught: every ayah or small group of ayahs gets a lesson,
// explained as Tafsir Ibn Kathir explains it (the abridged English on quran.com), with a sahih hadith where one explains
// the ayah. Each source opens at the highlighted words that say the lesson's point.

/** Tafsir Ibn Kathir on Al-Humazah 104:ayah, on quran.com, opened at `highlight` (words copied from that page). */
function ik(ayah: number, summary: string, highlight: string): LessonSource {
  return {
    id: `deep_ibn_kathir_104_${ayah}`,
    site: "Quran.com",
    category: "tafsir",
    title: `Tafsir Ibn Kathir on Al-Humazah 104:${ayah}`,
    url: `https://quran.com/104:${ayah}/tafsirs/en-tafisr-ibn-kathir`,
    reference: `Tafsir Ibn Kathir 104:${ayah}`,
    from: "Tafsir Ibn Kathir (abridged English), on Quran.com",
    grade: "Tafsir",
    summary,
    highlight
  };
}

const q104 = (ayah: number) => quranQuote(104, ayah);


/** Ayahs 1 to 3: woe to the one who mocks and belittles people, and gathers and counts his wealth. */
const HUMAZAH_ONE: DeepUnit = {
  key: "humazah1",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-104",
  name: "Al-Humazah, ayahs 1-3",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Humazah",
  lessons: [
    {
      slug: "woe-to-the-mocker",
      title: "Woe to the mocker",
      line: "Woe to all who find fault with people and belittle them.",
      facts: ["Humazah: one who mocks", "Lumazah: one who slanders"],
      quote: q104(1),
      source: ik(1, "Al-Hammaz slanders by speech and Al-Lammaz by action; such a person finds fault with people and belittles them.", "the person finds fault with people and belittles them"),
      difficulty: 1,
      questions: [
        { q: "Who gets woe in 104:1?", a: "Every Humazah Lumazah", wrong: ["Every traveler", "Every farmer", "Every student"], why: "Woe to every Humazah Lumazah." },
        { q: "What does such a person do, per Ibn Kathir?", a: "Finds fault with people", wrong: ["Helps the poor", "Plants trees", "Teaches children"], why: "The person finds fault with people and belittles them." },
        { tf: true, q: "Ibn Abbas said Humazah Lumazah reviles and disgraces others.", why: "Humazah Lumazah means one who reviles and disgraces others." }
      ]
    },
    {
      slug: "hand-eye-and-tongue",
      title: "Hand, eye and tongue",
      line: "People can hurt others by a look, a gesture or a word.",
      facts: ["Hand and eye", "The tongue"],
      quote: q104(1),
      source: ik(1, "Mujahid said Al-Humazah mocks with the hand and the eye, and Al-Lumazah with the tongue.", "Al-Humazah is with the hand and the eye, and Al-Lumazah is with the tongue"),
      difficulty: 1,
      questions: [
        { q: "How does Al-Humazah mock, per Mujahid?", a: "With the hand and the eye", wrong: ["With money", "With gifts", "With food"], why: "Al-Humazah is with the hand and the eye." },
        { q: "How does Al-Lumazah hurt, per Mujahid?", a: "With the tongue", wrong: ["With the feet", "With a sword", "With silence"], why: "And Al-Lumazah is with the tongue." },
        { tf: true, q: "Rolling eyes at someone can be mockery too.", why: "Al-Humazah is with the hand and the eye." }
      ]
    },
    {
      slug: "safe-from-your-tongue",
      title: "Safe from your tongue",
      line: "A true Muslim keeps others safe from his tongue and hands.",
      facts: ["Guard your words", "Guard your hands"],
      quote: q104(1),
      source: hadith("bukhari", "10", "Abdullah ibn Amr", "Sahih", "A Muslim is the one who avoids harming Muslims with his tongue and hands.", "avoids harming Muslims with his tongue and hands"),
      difficulty: 2,
      questions: [
        { q: "Who is a Muslim, per the hadith?", a: "One who harms no one by tongue or hand", wrong: ["One who is rich", "One who is loud", "One who is famous"], why: "A Muslim is the one who avoids harming Muslims with his tongue and hands." },
        { q: "Which two things should we guard?", a: "Tongue and hands", wrong: ["Hair and nails", "Shoes and bags", "Eyes and ears"], why: "Avoids harming Muslims with his tongue and hands." },
        { tf: false, q: "Hurtful jokes do not count if we laugh.", why: "A Muslim is the one who avoids harming Muslims with his tongue and hands." }
      ]
    },
    {
      slug: "what-backbiting-is",
      title: "What backbiting is",
      line: "Backbiting is saying about a brother what he would dislike.",
      facts: ["Ghibah: backbiting", "Buhtan: slander"],
      quote: q104(1),
      source: hadith("muslim", "2589", "Abu Hurayrah", "Sahih", "Backbiting is talking about your brother in a way he dislikes; if it is untrue, it is slander.", "talking about your brother in a manner which he does not like"),
      difficulty: 2,
      questions: [
        { q: "What is backbiting, per the hadith?", a: "Saying what your brother dislikes", wrong: ["Praising him", "Helping him", "Visiting him"], why: "Backbiting implies your talking about your brother in a manner which he does not like." },
        { q: "What is it if the bad thing is not even true?", a: "Slander", wrong: ["A joke", "Advice", "Nothing"], why: "And if that is not in him it is a slander." },
        { tf: false, q: "Saying a true fault is never backbiting.", why: "If that failing is actually found in him, you in fact backbited him." }
      ]
    },
    {
      slug: "do-not-look-down",
      title: "Do not look down on others",
      line: "Looking down on a fellow Muslim is a serious evil.",
      facts: ["Taqwa is in the heart", "All Muslims are brothers"],
      quote: q104(1),
      source: hadith("muslim", "2564", "Abu Hurairah", "Sahih", "A Muslim is the brother of a Muslim; he does not wrong him or look down on him, and looking down on a brother is a serious evil.", "It is a serious evil for a Muslim that he should look down upon his brother Muslim"),
      difficulty: 2,
      questions: [
        { q: "What is a Muslim to another Muslim?", a: "A brother", wrong: ["A stranger", "A rival", "A servant"], why: "A Muslim is the brother of a Muslim." },
        { q: "What did he call looking down on a brother?", a: "A serious evil", wrong: ["A small slip", "Good advice", "A clever joke"], why: "It is a serious evil for a Muslim that he should look down upon his brother Muslim." },
        { tf: true, q: "A Muslim does not humiliate his brother.", why: "He neither oppresses him nor humiliates him nor looks down upon him." }
      ]
    },
    {
      slug: "gathering-and-counting",
      title: "Gathering and counting",
      line: "He piles up his money and keeps counting it.",
      facts: ["Jama: gathered", "Addadah: counted it"],
      quote: q104(2),
      source: ik(2, "He gathers wealth, piling some on top of the rest, and counts it up; his wealth fills his whole day.", "he gathers it piling some of it on top of the rest and he counts it up"),
      difficulty: 2,
      questions: [
        { q: "What does he do with wealth, per 104:2?", a: "Gathers and counts it", wrong: ["Gives it away", "Forgets it", "Shares it"], why: "Who has gathered wealth and counted it." },
        { q: "Which ayah is similar, per Ibn Kathir?", a: "70:18", wrong: ["1:1", "112:1", "36:1"], why: "And collect wealth and hide it. 70:18" },
        { tf: true, q: "Muhammad bin Kab said wealth filled his whole day.", why: "His wealth occupies his time in the day, going from this to that." }
      ]
    },
    {
      slug: "wealth-will-not-keep-you",
      title: "Wealth will not keep you",
      line: "He thinks money will make him last forever; it will not.",
      facts: ["Akhladah: makes him last", "Life is short"],
      quote: q104(3),
      source: ik(3, "He thinks that gathering wealth will make him last forever in this world.", "he thinks that gathering wealth will make him last forever in this abode"),
      difficulty: 3,
      questions: [
        { q: "What does he think, per 104:3?", a: "His wealth will make him last forever", wrong: ["He will be poor", "He will move away", "He will forget"], why: "He thinks that his wealth will make him last forever!" },
        { q: "Where does he hope to last, per Ibn Kathir?", a: "In this worldly life", wrong: ["In Paradise", "On the moon", "In the sea"], why: "Make him last forever in this abode, the worldly life." },
        { tf: false, q: "Money can keep a person alive forever.", why: "But no! The matter is not as he claims." }
      ]
    },
    {
      slug: "like-a-traveler",
      title: "Like a traveler",
      line: "Live in this world like a stranger or a traveler passing by.",
      facts: ["The world is a road", "Prepare for the journey"],
      quote: q104(3),
      source: hadith("bukhari", "6416", "Abdullah ibn Umar", "Sahih", "He held Ibn Umar's shoulder and said: be in this world as if you were a stranger or a traveler.", "Be in this world as if you were a stranger or a traveler"),
      difficulty: 3,
      questions: [
        { q: "How should we live in this world?", a: "Like a stranger or traveler", wrong: ["Like a king", "Like it lasts forever", "Like a sleeper"], why: "Be in this world as if you were a stranger or a traveler." },
        { q: "What did Ibn Umar say to take from health?", a: "Something for sickness", wrong: ["Nothing at all", "Only sleep", "Only food"], why: "And take from your health for your sickness." },
        { tf: true, q: "A traveler does not cling to the road.", why: "Be in this world as if you were a stranger or a traveler." }
      ]
    }
  ]
};

/** Ayahs 4 to 9: But no! Al-Hutamah, a name of the Fire, closed over them in long pillars. */
const HUMAZAH_TWO: DeepUnit = {
  key: "humazah2",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-104",
  name: "Al-Humazah, ayahs 4-9",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Humazah",
  lessons: [
    {
      slug: "but-no",
      title: "But no!",
      line: "Allah answers: it is not as he thinks; Al-Hutamah awaits him.",
      facts: ["Kalla: But no!", "Al-Hutamah: a name of the Fire"],
      quote: q104(4),
      source: ik(4, "The matter is not as he thinks; he will be thrown into Al-Hutamah, one of the names of the Fire, so called because it crushes.", "which is one of the descriptive names of the Hellfire"),
      difficulty: 1,
      questions: [
        { q: "What does Allah reply in 104:4?", a: "But no!", wrong: ["Yes, forever!", "Maybe so", "Rest now"], why: "But no! Verily, he will be thrown into Al-Hutamah." },
        { q: "What is Al-Hutamah, per Ibn Kathir?", a: "A name of the Fire", wrong: ["A garden", "A palace", "A market"], why: "Which is one of the descriptive names of the Hellfire." },
        { tf: true, q: "His thought about lasting forever was wrong.", why: "The matter is not as he claims, nor as he reckons." }
      ]
    },
    {
      slug: "the-fire-of-allah",
      title: "The fire of Allah",
      line: "Allah asks what Al-Hutamah is, then says: His kindled fire.",
      facts: ["Al-Muqadah: kindled", "Reaching the hearts"],
      quote: q104(6),
      source: ik(6, "Allah explains Al-Hutamah: the fire of Allah, kindled, which leaps up over the hearts.", "The fire of Allah, Al-Muqadah, which leaps up over the hearts"),
      difficulty: 2,
      questions: [
        { q: "What does 104:5 ask?", a: "What will make you know Al-Hutamah?", wrong: ["Where is the sea?", "Who is the king?", "When is the harvest?"], why: "And what will make you know what Al-Hutamah is?" },
        { q: "How does 104:6 describe it?", a: "The fire of Allah, kindled", wrong: ["A small candle", "A cold place", "A bright lamp"], why: "The fire of Allah, Al-Muqadah." },
        { q: "What does it reach, per 104:7?", a: "The hearts", wrong: ["The clouds", "The sea", "The stars"], why: "Which leaps up over the hearts." }
      ]
    },
    {
      slug: "closed-over-them",
      title: "Closed over them",
      line: "The Fire will be closed over them, with no way out.",
      facts: ["Musadah: closed over", "Like 90:20"],
      quote: q104(8),
      source: ik(8, "Mu'sadah means covering, closed over them, as in the Tafsir of Al-Balad 90:20.", "meaning, covering, just as was mentioned in the Tafsir of Surat Al-Balad"),
      difficulty: 2,
      questions: [
        { q: "What does Musadah mean, per Ibn Kathir?", a: "Covering, closed over", wrong: ["Wide open", "Far away", "Very small"], why: "Meaning, covering, just as was mentioned in the Tafsir of Surat Al-Balad." },
        { q: "Which surah also uses this word?", a: "Al-Balad", wrong: ["Al-Fatihah", "Al-Ikhlas", "An-Nas"], why: "Just as was mentioned in the Tafsir of Surat Al-Balad, see 90:20." },
        { tf: true, q: "There is no way out for them.", why: "Verily, it shall Musadah upon them." }
      ]
    },
    {
      slug: "in-long-pillars",
      title: "In long pillars",
      line: "Long pillars await, so leave mocking while you can.",
      facts: ["Amad: pillars", "Mumaddadah: stretched long"],
      quote: q104(9),
      source: ik(9, "Ibn Abbas said they will be made to enter pillars stretched forth, with the gates shut upon them.", "He will make them enter pillars stretched forth"),
      difficulty: 3,
      questions: [
        { q: "What does 104:9 mention?", a: "Pillars stretched forth", wrong: ["Gardens with rivers", "Ships at sea", "Tall palm trees"], why: "In pillars stretched forth." },
        { q: "What lesson should we take from Al-Humazah?", a: "Stop mocking and greed now", wrong: ["Gather more wealth", "Mock more often", "Count coins daily"], why: "Woe to every Humazah Lumazah, who has gathered wealth and counted it." },
        { tf: true, q: "Ibn Abbas said the gates will be shut on them.", why: "And the gates of Hell will be shut upon them." }
      ]
    }
  ]
};

export const HUMAZAH_UNITS: readonly DeepUnit[] = [HUMAZAH_ONE, HUMAZAH_TWO];
