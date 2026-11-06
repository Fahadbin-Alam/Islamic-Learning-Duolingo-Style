import type { LessonSource } from "../../types";
import { hadith, quranQuote, saadi, type DeepUnit } from "../deepKit";

// Surah Al-Fajr ayah by ayah, the way the surahs before it are taught: every ayah or small group of ayahs gets a lesson,
// explained as Tafsir Ibn Kathir explains it (the abridged English on quran.com), with a sahih hadith where one explains
// the ayah. Each source opens at the highlighted words that say the lesson's point.

/** Tafsir Ibn Kathir on Al-Fajr 89:ayah, on quran.com, opened at `highlight` (words copied from that page). */
function ik(ayah: number, summary: string, highlight: string): LessonSource {
  return {
    id: `deep_ibn_kathir_89_${ayah}`,
    site: "Quran.com",
    category: "tafsir",
    title: `Tafsir Ibn Kathir on Al-Fajr 89:${ayah}`,
    url: `https://quran.com/89:${ayah}/tafsirs/en-tafisr-ibn-kathir`,
    reference: `Tafsir Ibn Kathir 89:${ayah}`,
    from: "Tafsir Ibn Kathir (abridged English), on Quran.com",
    grade: "Tafsir",
    summary,
    highlight
  };
}

const q89 = (ayah: number) => quranQuote(89, ayah);


/** Ayahs 1 to 5: oaths by the dawn, the ten nights, the even and the odd, and the passing night. */
const FAJR_ONE: DeepUnit = {
  key: "fajr1",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-89",
  name: "Al-Fajr, ayahs 1-5",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Fajr",
  lessons: [
    {
      slug: "by-the-dawn",
      title: "By the dawn",
      line: "Allah swears by the dawn, the start of each new morning.",
      facts: ["Al-Fajr: the dawn", "Each morning is a gift"],
      quote: q89(1),
      source: ik(1, "Ali, Ibn Abbas, Ikrimah and Mujahid said Al-Fajr is the morning.", "it is well known that it is the morning"),
      difficulty: 1,
      questions: [
        { q: "By what does Allah swear in 89:1?", a: "The dawn", wrong: ["The sunset", "The sea", "The wind"], why: "By the dawn." },
        { q: "What is Al-Fajr, per Ali and Ibn Abbas?", a: "The morning", wrong: ["The night", "The noon", "The evening"], why: "Concerning Al-Fajr, it is well known that it is the morning." },
        { q: "What did Masruq say Al-Fajr can also mean?", a: "The day of Sacrifice", wrong: ["The first of Ramadan", "A Friday", "The day of birth"], why: "Al-Fajr refers to the day of Sacrifice, An-Nahr, in particular." }
      ]
    },
    {
      slug: "the-ten-nights",
      title: "The ten nights",
      line: "The ten nights are the first ten days of Dhul-Hijjah.",
      facts: ["Layalin ashr: ten nights", "Days of Hajj"],
      quote: q89(2),
      source: ik(2, "Ibn Abbas, Ibn Zubayr and Mujahid said the ten nights are the first ten days of Dhul-Hijjah.", "meaning the ten days of Dhul-Hijjah"),
      difficulty: 2,
      questions: [
        { q: "By what does Allah swear in 89:2?", a: "The ten nights", wrong: ["The seven seas", "The four seasons", "The twelve months"], why: "And by the ten nights." },
        { q: "Which ten days are meant?", a: "The first ten of Dhul-Hijjah", wrong: ["The last ten of Shaban", "Ten days of winter", "Any ten days"], why: "The ten nights refers to the first ten days of Dhul-Hijjah." },
        { tf: true, q: "The day of Sacrifice is the last of the ten.", why: "It is the last of the ten nights." }
      ]
    },
    {
      slug: "the-best-days-for-good-deeds",
      title: "The best days for good deeds",
      line: "Deeds in the first ten days of Dhul-Hijjah are most loved.",
      facts: ["Do extra good in these days", "Fasting, dhikr, charity"],
      quote: q89(2),
      source: hadith("bukhari", "969", "Ibn Abbas", "Sahih", "The Prophet ﷺ said no good deeds done on other days are better than those done in the first ten days of Dhul-Hijjah.", "No good deeds done on other days are superior to those done on these"),
      difficulty: 2,
      questions: [
        { q: "Which days are best for good deeds?", a: "The first ten of Dhul-Hijjah", wrong: ["Any day is the same", "Only Fridays", "Only Eid"], why: "There are no days in which righteous deeds are more beloved to Allah than these days." },
        { q: "What one exception did he mention?", a: "A man who gave his life and wealth", wrong: ["A rich trader", "A traveller", "A king"], why: "Except for a man who goes out with his self and his wealth, and he does not return with any of that." },
        { tf: true, q: "We should do extra good in these ten days.", why: "No good deeds done on other days are superior to those done on these." }
      ]
    },
    {
      slug: "the-even-and-the-odd",
      title: "The even and the odd",
      line: "Many said the odd is Arafah and the even is the tenth.",
      facts: ["Ash-Shaf': the even", "Al-Watr: the odd"],
      quote: q89(3),
      source: ik(3, "Ibn Abbas and Ikrimah said the odd is the day of Arafah, the ninth, and the even is the day of Sacrifice, the tenth.", "because it falls on the ninth"),
      difficulty: 3,
      questions: [
        { q: "By what does Allah swear in 89:3?", a: "The even and the odd", wrong: ["The big and small", "The sun and moon", "The old and new"], why: "And by the even and the odd." },
        { q: "Which day is the odd, per Ibn Abbas?", a: "The day of Arafah", wrong: ["The first of Ramadan", "A Monday", "The day of Ashura"], why: "Al-Watr, the odd, is the day of Arafah because it falls on the ninth." },
        { q: "Which day is the even?", a: "The day of Sacrifice, the tenth", wrong: ["The day of Arafah", "The first day", "The last Friday"], why: "Ash-Shaf, the even, is the day of An-Nahr because it falls on the tenth day." }
      ]
    },
    {
      slug: "the-night-as-it-passes",
      title: "The night as it passes",
      line: "Allah swears by the night as it moves along and leaves.",
      facts: ["Yasr: moves on", "Time never stops"],
      quote: q89(4),
      source: ik(4, "Ibn Abbas said: when it goes away; Mujahid and Qatadah said: when it moves along.", "When it moves along"),
      difficulty: 2,
      questions: [
        { q: "By what does Allah swear in 89:4?", a: "The night when it departs", wrong: ["The day when it rises", "The rain when it falls", "The star when it sets"], why: "And by the night when it departs." },
        { q: "What did Ibn Abbas say departs means?", a: "When it goes away", wrong: ["When it stops", "When it comes back", "When it is loud"], why: "Ibn Abbas said, When it goes away." },
        { tf: false, q: "The night stays still and never moves on.", why: "Mujahid and Qatadah said, When it moves along." }
      ]
    },
    {
      slug: "proof-for-people-of-sense",
      title: "Proof for people of sense",
      line: "These oaths are proof for anyone with Hijr, good sense.",
      facts: ["Hijr: sense that holds back", "Oaths by times of worship"],
      quote: q89(5),
      source: ik(5, "Ibn Kathir says sense is called Hijr because it stops a person from doing what is not fitting.", "because it prevents the person from doing that which is not befitting of him"),
      difficulty: 3,
      questions: [
        { q: "For whom are these proofs, per 89:5?", a: "Men of understanding", wrong: ["Only kings", "Only children", "No one"], why: "Is there not in them sufficient proofs for men of understanding!" },
        { q: "Why is the intellect called Hijr?", a: "It stops us doing what is not fitting", wrong: ["It is made of stone", "It is very old", "It is hidden"], why: "Because it prevents the person from doing that which is not befitting of him." },
        { q: "What are the oaths about, per Ibn Kathir?", a: "Times and acts of worship", wrong: ["Markets", "Battles", "Weather"], why: "The oath is about the times of worship and the acts of worship themselves, such as Hajj, Salah." }
      ]
    }
  ]
};

/** Ayahs 6 to 14: Ad of Iram, Thamud of the rocks, and Fir'awn; your Lord is ever watchful. */
const FAJR_TWO: DeepUnit = {
  key: "fajr2",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-89",
  name: "Al-Fajr, ayahs 6-14",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Fajr",
  lessons: [
    {
      slug: "the-people-of-ad",
      title: "The people of Ad",
      line: "Ad rejected Hud, so Allah destroyed them with a fierce wind.",
      facts: ["Ad: the people of Hud", "A lesson to learn from"],
      quote: q89(6),
      source: ik(6, "Ibn Kathir says Ad rejected their Messenger Hud; Allah saved him and the believers and destroyed the rest.", "They are those to whom Allah sent His Messenger Hud"),
      difficulty: 2,
      questions: [
        { q: "Whom does 89:6 mention?", a: "Ad", wrong: ["Saba", "Madyan", "Lut's people"], why: "Saw you not how your Lord dealt with Ad?" },
        { q: "Which Messenger was sent to Ad?", a: "Hud", wrong: ["Salih", "Shuayb", "Yunus"], why: "They are those to whom Allah sent His Messenger Hud." },
        { q: "How were they destroyed, per 69:7?", a: "A furious wind for 7 nights and 8 days", wrong: ["A flood", "An earthquake only", "A fire from the sky"], why: "Which Allah imposed on them for seven nights and eight days in succession." }
      ]
    },
    {
      slug: "iram-of-the-pillars",
      title: "Iram of the pillars",
      line: "Iram had tall pillars; no people were as strong as them.",
      facts: ["Dhat al-Imad: of the pillars", "Strength is from Allah"],
      quote: q89(7),
      source: ik(7, "Ibn Kathir says they lived in houses raised on firm pillars and were the strongest people of their time.", "they used to live in trellised houses that were raised with firm pillars"),
      difficulty: 2,
      questions: [
        { q: "How is Iram described in 89:7?", a: "Of the pillars", wrong: ["Of the ships", "Of the gardens", "Of the caves"], why: "Iram of the pillars." },
        { q: "What does 89:8 say about them?", a: "None like them were created in the land", wrong: ["They were weak", "They were few", "They were kind"], why: "The like of which were not created in the land?" },
        { tf: false, q: "Their great strength saved them from Allah.", why: "See they not that Allah Who created them was mightier in strength than them." }
      ]
    },
    {
      slug: "thamud-who-carved-rocks",
      title: "Thamud who carved rocks",
      line: "Thamud carved homes out of rock in the valley.",
      facts: ["Jabu: carved, hewed", "People of Salih"],
      quote: q89(9),
      source: ik(9, "Ibn Abbas said they carved and hewed the rocks; 26:149 says they carved houses in the mountains.", "They carved them and they hewed them"),
      difficulty: 2,
      questions: [
        { q: "What did Thamud do, per 89:9?", a: "Hewed out rocks in the valley", wrong: ["Built ships", "Planted forests", "Dug rivers"], why: "And Thamud, who hewed out rocks in the valley?" },
        { q: "What did Ibn Abbas say Jabu means?", a: "Carved and hewed", wrong: ["Painted", "Burned", "Sold"], why: "Ibn Abbas said, They carved them and they hewed them." },
        { q: "Which ayah says they carved houses in mountains?", a: "26:149", wrong: ["1:5", "112:2", "2:1"], why: "And you hew in the mountains, houses with great skill." }
      ]
    },
    {
      slug: "firawn-and-his-armies",
      title: "Fir'awn and his stakes",
      line: "Fir'awn had armies that carried out his cruel orders.",
      facts: ["Al-Awtad: the stakes", "Power without justice fails"],
      quote: q89(10),
      source: ik(10, "Ibn Abbas said Al-Awtad are the armies who enforced his commands for him.", "are the armies who enforced his commands for him"),
      difficulty: 2,
      questions: [
        { q: "How is Fir'awn described in 89:10?", a: "With Al-Awtad", wrong: ["With gardens", "With books", "With ships only"], why: "And Firawn with Al-Awtad?" },
        { q: "What are Al-Awtad, per Ibn Abbas?", a: "Armies who enforced his orders", wrong: ["Tents of travellers", "Trees of Egypt", "Stars"], why: "Al-Awtad are the armies who enforced his commands for him." },
        { tf: true, q: "No army can protect a tyrant from Allah.", why: "So, your Lord poured on them different kinds of severe torment." }
      ]
    },
    {
      slug: "they-spread-corruption",
      title: "They spread corruption",
      line: "These nations were arrogant and cruel, so punishment came.",
      facts: ["Tagha: transgressed", "Fasad: corruption"],
      quote: q89(11),
      source: ik(11, "Ibn Kathir says they rebelled, were arrogant, and spread corruption, harming the people.", "they rebelled, were arrogant, and went about making corruption in the land"),
      difficulty: 2,
      questions: [
        { q: "What did they do, per 89:11?", a: "Transgressed beyond bounds", wrong: ["Helped the poor", "Prayed at night", "Kept promises"], why: "Who did transgress beyond bounds in the lands." },
        { q: "What did they make much of, per 89:12?", a: "Mischief", wrong: ["Charity", "Peace", "Prayer"], why: "And made therein much mischief." },
        { q: "What did your Lord pour on them, per 89:13?", a: "Kinds of severe torment", wrong: ["Gold", "Rain of blessings", "Gifts"], why: "So, your Lord poured on them different kinds of severe torment." }
      ]
    },
    {
      slug: "ever-watchful",
      title: "Your Lord is ever watchful",
      line: "Allah hears and sees all, and judges everyone with justice.",
      facts: ["Al-Mirsad: the watch post", "Allah is never unjust"],
      quote: q89(14),
      source: ik(14, "Ibn Abbas said He hears and sees; Ibn Kathir says He watches His creation and judges with justice.", "He hears and He sees"),
      difficulty: 2,
      questions: [
        { q: "What does 89:14 say about your Lord?", a: "He is Ever Watchful", wrong: ["He is far", "He is asleep", "He forgets"], why: "Verily, your Lord is Ever Watchful." },
        { q: "What did Ibn Abbas say it means?", a: "He hears and He sees", wrong: ["He waits", "He leaves", "He hides"], why: "Ibn Abbas said, He hears and He sees." },
        { tf: false, q: "Allah can be unjust to someone.", why: "He is far removed from injustice and tyranny." }
      ]
    }
  ]
};

/** Ayahs 15 to 20: wealth and hardship are both tests; honour the orphan and feed the poor. */
const FAJR_THREE: DeepUnit = {
  key: "fajr3",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-89",
  name: "Al-Fajr, ayahs 15-20",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Fajr",
  lessons: [
    {
      slug: "wealth-is-a-test",
      title: "Wealth is a test",
      line: "Given plenty, man thinks he is honoured, but it is a test.",
      facts: ["Ibtala: tested", "Thank Allah in plenty"],
      quote: q89(15),
      source: ik(15, "Ibn Kathir says wealth is not a sign of honour from Allah; rather it is a trial and a test.", "rather it is a trial and a test"),
      difficulty: 2,
      questions: [
        { q: "What does man say when given bounties, per 89:15?", a: "My Lord has honoured me", wrong: ["I must give more", "This is a test", "I am weak"], why: "Then he says: My Lord has honored me." },
        { q: "What is wealth really, per Ibn Kathir?", a: "A trial and a test", wrong: ["Proof Allah loves him", "A reward only", "Nothing"], why: "But this is not the case, rather it is a trial and a test." },
        { tf: false, q: "Rich people are always the most loved by Allah.", why: "Allah gives wealth to those whom He loves as well as those whom He does not love." }
      ]
    },
    {
      slug: "hardship-is-a-test-too",
      title: "Hardship is a test too",
      line: "Less money is no disgrace; be thankful and patient.",
      facts: ["Qadara: straitened", "Sabr: patience"],
      quote: q89(16),
      source: ik(16, "Ibn Kathir says Allah should be obeyed in both cases: thankful when rich, patient when poor.", "If one is wealthy, he should thank Allah for that, and if he is poor, he should exercise patience"),
      difficulty: 2,
      questions: [
        { q: "What does man say when his means are tight, per 89:16?", a: "My Lord has humiliated me", wrong: ["My Lord is testing me", "I am thankful", "I will give more"], why: "He says: My Lord has humiliated me!" },
        { q: "How should a poor person respond, per Ibn Kathir?", a: "With patience", wrong: ["With anger", "With envy", "By giving up"], why: "If he is poor, he should exercise patience." },
        { q: "How should a rich person respond?", a: "By thanking Allah", wrong: ["By showing off", "By hoarding", "By resting"], why: "If one is wealthy, he should thank Allah for that." }
      ]
    },
    {
      slug: "honour-the-orphan",
      title: "Honour the orphan",
      line: "Allah blames those who do not treat orphans with kindness.",
      facts: ["Yatim: orphan", "Kindness is a command"],
      quote: q89(17),
      source: ik(17, "Ibn Kathir says the ayah contains the command to honour the orphan.", "This contains the command to honor him"),
      difficulty: 1,
      questions: [
        { q: "What do they fail to do, per 89:17?", a: "Treat orphans with kindness", wrong: ["Build houses", "Travel far", "Plant trees"], why: "But you treat not the orphans with kindness and generosity!" },
        { q: "What does the ayah command, per Ibn Kathir?", a: "To honour the orphan", wrong: ["To ignore him", "To sell to him", "To test him"], why: "This contains the command to honor him." },
        { tf: true, q: "Being kind to orphans is a duty in Islam.", why: "This contains the command to honor him, the orphan." }
      ]
    },
    {
      slug: "care-beyond-yourself",
      title: "Care beyond yourself",
      line: "Caring only about your own wants is a weak goal.",
      facts: ["As-Sa'di explains", "Think of the needy"],
      quote: q89(17),
      source: saadi(89, 17, "As-Sa'di says caring only about what you want yourself is weak, so Allah blamed people who did not care for the needy, like the orphan.", "فإن وقوف همة العبد عند مراد نفسه فقط، من ضعف الهمة"),
      difficulty: 2,
      questions: [
        { q: "Caring only for your own wants is...?", a: "Weak", wrong: ["Wise", "Brave", "Best"], why: "Stopping at your own wants is weak aim, says as-Sa'di." },
        { q: "Who did Al-Fajr say people failed to honour?", a: "The orphan", wrong: ["The king", "The rich", "The guest"], why: "They did not honour the orphan who lost his father." },
        { tf: true, q: "Not caring for orphans shows no mercy in the heart.", why: "As-Sa'di on 89:17." }
      ]
    },
    {
      slug: "close-to-him-in-paradise",
      title: "Close to him in Paradise",
      line: "Whoever cares for an orphan will be near Muhammad ﷺ in Paradise.",
      facts: ["Kafil al-yatim: orphan's carer", "Two fingers together"],
      quote: q89(17),
      source: hadith("bukhari", "5304", "Sahl bin Sa'd", "Sahih", "The Prophet ﷺ said he and the one who looks after an orphan will be like this in Paradise, showing his middle and index fingers.", "I and the one who looks after an orphan will be like this in Paradise"),
      difficulty: 2,
      questions: [
        { q: "Who will be close to him in Paradise?", a: "The one who looks after an orphan", wrong: ["The richest man", "The strongest man", "The loudest man"], why: "I and the one who looks after an orphan will be like this in Paradise." },
        { q: "What did he show with his hand?", a: "His index and middle fingers", wrong: ["A closed fist", "His thumb only", "An open palm"], why: "And he put his two fingers together, the middle finger and the index finger." },
        { tf: true, q: "Caring for an orphan is a path to Paradise.", why: "The guardian of the orphan and I will be like these two in Paradise." }
      ]
    },
    {
      slug: "urge-feeding-the-poor",
      title: "Urge feeding the poor",
      line: "Allah blames those who do not urge feeding the poor.",
      facts: ["Miskin: poor, needy", "Encourage good"],
      quote: q89(18),
      source: ik(18, "Ibn Kathir says they do not command kindness to the poor, nor encourage each other to it.", "nor do they encourage each other to do so"),
      difficulty: 2,
      questions: [
        { q: "What do they not urge, per 89:18?", a: "Feeding the Miskin", wrong: ["Building towers", "Buying horses", "Telling stories"], why: "And urge not one another on the feeding of the Miskin!" },
        { q: "What do they fail to command, per Ibn Kathir?", a: "Kindness to the poor and needy", wrong: ["Hard work", "Long travel", "Silence"], why: "They do not command that the poor and the needy be treated with kindness." },
        { tf: true, q: "We should remind each other to feed the hungry.", why: "Nor do they encourage each other to do so." }
      ]
    },
    {
      slug: "greed-for-wealth",
      title: "Greed for wealth",
      line: "They grab inheritance by any means and love wealth too much.",
      facts: ["Turath: inheritance", "Jamma: great love"],
      quote: q89(19),
      source: ik(19, "Ibn Kathir says they devour inheritance however they can, lawful or forbidden, and love wealth in abundance.", "however they can get it, whether lawful or forbidden"),
      difficulty: 3,
      questions: [
        { q: "What do they devour, per 89:19?", a: "The Turath, inheritance", wrong: ["Their own crops", "Wild fruit", "Charity food"], why: "And you devour the Turath, devouring with greed." },
        { q: "How do they love wealth, per 89:20?", a: "With love Jamma, very much", wrong: ["A little", "Not at all", "Only on Eid"], why: "And you love wealth with love Jamma." },
        { tf: false, q: "Taking inheritance unlawfully is fine if you are clever.", why: "However they can get it, whether lawful or forbidden." }
      ]
    }
  ]
};

/** Ayahs 21 to 30: the earth flattened, your Lord comes with the angels in rows, and the tranquil soul enters Paradise. */
const FAJR_FOUR: DeepUnit = {
  key: "fajr4",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-89",
  name: "Al-Fajr, ayahs 21-30",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Fajr",
  lessons: [
    {
      slug: "the-earth-flattened",
      title: "The earth flattened",
      line: "On the Last Day the earth will be crushed flat and even.",
      facts: ["Dakkan dakka: crushed flat", "All rise for their Lord"],
      quote: q89(21),
      source: ik(21, "Ibn Kathir says the earth and mountains will be leveled, and creatures will rise from their graves for their Lord.", "the earth and the mountains will be flattened, leveled and made even"),
      difficulty: 2,
      questions: [
        { q: "What happens to the earth, per 89:21?", a: "It is flattened, Dakkan Dakka", wrong: ["It grows taller", "It turns green", "It floats"], why: "Nay! When the earth is flattened, Dakkan Dakka." },
        { q: "What else is flattened, per Ibn Kathir?", a: "The mountains", wrong: ["The oceans", "The clouds", "The stars"], why: "The earth and the mountains will be flattened, leveled and made even." },
        { tf: true, q: "Everyone will rise from their graves for their Lord.", why: "And the creatures will rise from their graves for their Lord." }
      ]
    },
    {
      slug: "the-lord-comes-with-angels",
      title: "Angels in rows",
      line: "Your Lord comes for Judgement, and the angels stand in rows.",
      facts: ["Saffan saffa: row upon row", "The session of Judgement"],
      quote: q89(22),
      source: ik(22, "Ibn Kathir says Allah comes for the Judgement as He wills, and the angels come lined up in rows upon rows.", "lined up in rows upon rows before Him"),
      difficulty: 3,
      questions: [
        { q: "How do the angels come, per 89:22?", a: "In rows", wrong: ["One by one hiding", "Not at all", "Running away"], why: "And your Lord comes with the angels in rows." },
        { q: "Why does your Lord come, per Ibn Kathir?", a: "For the session of Judgement", wrong: ["For a feast", "For a race", "To rest"], why: "For the session of Judgement between His creatures." },
        { tf: true, q: "Allah comes for the Judgement as He wills.", why: "So Allah will come for the session of Judgement as He wills." }
      ]
    },
    {
      slug: "the-great-intercession",
      title: "The great intercession",
      line: "All Messengers decline; Muhammad ﷺ says: I will do it.",
      facts: ["Al-Maqam al-Mahmud: the praised station", "The first intercession"],
      quote: q89(22),
      source: ik(22, "Ibn Kathir says people ask Messenger after Messenger to intercede; only Muhammad ﷺ says he will, and Allah allows it.", "I will do it, I will do it"),
      difficulty: 3,
      questions: [
        { q: "What do the other Messengers say?", a: "I cannot do that for you", wrong: ["Follow me", "Go home", "Wait here"], why: "Yet, all of them will say, I cannot do that for you." },
        { q: "What does Muhammad ﷺ say?", a: "I will do it, I will do it", wrong: ["I cannot", "Ask another", "Not today"], why: "This will continue until the beseeching of the men reaches Muhammad and he will say, I will do it, I will do it." },
        { q: "What is this station called?", a: "The praiseworthy station", wrong: ["The hidden station", "The last gate", "The high tower"], why: "It is the praiseworthy station that has already been discussed in Surat Al-Isra." }
      ]
    },
    {
      slug: "remembering-too-late",
      title: "Remembering too late",
      line: "That Day people remember their deeds, but too late.",
      facts: ["Yatadhakkar: will remember", "Act now"],
      quote: q89(23),
      source: ik(23, "Ibn Kathir says man will remember his past deeds, but how can remembering benefit him then?", "how can remembrance then benefit him"),
      difficulty: 2,
      questions: [
        { q: "What will be brought near, per 89:23?", a: "Hell", wrong: ["The moon", "A garden", "A mountain"], why: "And Hell will be brought near that Day." },
        { q: "What will man do that Day, per 89:23?", a: "Remember", wrong: ["Sleep", "Laugh", "Travel"], why: "On that Day will man remember, but how will that remembrance avail him?" },
        { tf: false, q: "Remembering on that Day can still change the record.", why: "How can remembrance then benefit him." }
      ]
    },
    {
      slug: "if-only-i-had-sent-ahead",
      title: "If only I had sent ahead",
      line: "People will wish they had done more good for their real life.",
      facts: ["Qaddamtu: I sent ahead", "The Hereafter is the real life"],
      quote: q89(24),
      source: ik(24, "Ibn Kathir says the sinner will regret his sins, and even the obedient will wish he had done more.", "he will be sorry for the acts of disobedience he committed"),
      difficulty: 2,
      questions: [
        { q: "What will he say, per 89:24?", a: "Would that I had sent forth for my life", wrong: ["I did enough", "I am happy", "Let me sleep"], why: "He will say: Alas! Would that I had sent forth for my life!" },
        { q: "What will the obedient wish, per Ibn Kathir?", a: "That he had done more obedience", wrong: ["That he had done less", "Nothing", "That he was rich"], why: "If he was an obedient person, he will wish that he performed more acts of obedience." },
        { tf: true, q: "The best time to send good deeds ahead is now.", why: "He will say: Alas! Would that I had sent forth for my life!" }
      ]
    },
    {
      slug: "no-punishment-like-his",
      title: "No punishment like His",
      line: "No one punishes like Allah punishes those who defied Him.",
      facts: ["Adhab: punishment", "Wathaq: binding"],
      quote: q89(25),
      source: ik(25, "Ibn Kathir says none are punished more severely than those Allah punishes for disobeying Him.", "there is no one more severely punished than those whom Allah punishes for disobeying Him"),
      difficulty: 3,
      questions: [
        { q: "What does 89:25 say?", a: "None will punish as He will punish", wrong: ["No one will be punished", "All will be forgiven", "Only some will wait"], why: "So on that Day none will punish as He will punish." },
        { q: "What does 89:26 say?", a: "None will bind as He will bind", wrong: ["All will be free", "None will be bound", "All will rest"], why: "And none will bind as He will bind." },
        { q: "For whom is this, per Ibn Kathir?", a: "The criminals and wrongdoers", wrong: ["The believers", "The children", "The prophets"], why: "This is for the criminals and the wrongdoers among the creatures." }
      ]
    },
    {
      slug: "o-tranquil-soul",
      title: "O tranquil soul",
      line: "The calm, faithful soul is called: come back to your Lord.",
      facts: ["An-Nafs al-Mutma'innah: the tranquil soul", "Calm with the truth"],
      quote: q89(27),
      source: ik(27, "Ibn Kathir says the tranquil soul is always at rest and abiding by the truth, and is called back to its Lord.", "which is always at rest and abiding by the truth"),
      difficulty: 2,
      questions: [
        { q: "Who is called in 89:27?", a: "The tranquil soul", wrong: ["The angry soul", "The lost soul", "The proud soul"], why: "O tranquil soul!" },
        { q: "What is the tranquil soul like, per Ibn Kathir?", a: "At rest and holding to the truth", wrong: ["Always worried", "Always angry", "Always proud"], why: "Which is always at rest and abiding by the truth." },
        { q: "To what is it called back, per Ibn Kathir?", a: "To its Lord's reward and company", wrong: ["To the world", "To its old house", "To nothing"], why: "Come back to your Lord, meaning, to His company, His reward." }
      ]
    },
    {
      slug: "well-pleased-and-pleasing",
      title: "Well-pleased and pleasing",
      line: "The soul is pleased with Allah, and Allah is pleased with it.",
      facts: ["Radiyah: well-pleased", "Mardiyyah: well-pleasing"],
      quote: q89(28),
      source: ik(28, "Ibn Kathir says the soul is pleased with Allah, and He is pleased with it.", "pleased with Allah, and He will be pleased with it"),
      difficulty: 2,
      questions: [
        { q: "How does the soul return, per 89:28?", a: "Well-pleased and well-pleasing", wrong: ["Angry and sad", "Tired and cold", "Lost and alone"], why: "Come back to your Lord, well-pleased and well-pleasing!" },
        { q: "With whom is it pleased, per Ibn Kathir?", a: "With Allah", wrong: ["With wealth", "With fame", "With itself only"], why: "Pleased with Allah, and He will be pleased with it." },
        { tf: true, q: "Allah's pleasure is the greatest reward.", why: "Pleased with Allah, and He will be pleased with it and gratify it." }
      ]
    },
    {
      slug: "enter-my-paradise",
      title: "Enter My Paradise",
      line: "Allah says: enter among My servants, and enter My Paradise.",
      facts: ["Ibadi: My servants", "Jannati: My Paradise"],
      quote: q89(30),
      source: ik(30, "Ibn Kathir says this is said to the believer at death and on the Day of Judgement, as glad tidings.", "This will be said to it at the time of death and on the Day of Judgement"),
      difficulty: 2,
      questions: [
        { q: "Among whom does the soul enter, per 89:29?", a: "Among My servants", wrong: ["Among the kings", "Among strangers", "Among the deniers"], why: "Enter then among My servants." },
        { q: "What is the final call in 89:30?", a: "Enter My Paradise", wrong: ["Wait outside", "Go back", "Stand still"], why: "And enter My Paradise!" },
        { q: "When is it said, per Ibn Kathir?", a: "At death and on the Day of Judgement", wrong: ["Only in dreams", "Never", "Every morning"], why: "This will be said to it at the time of death and on the Day of Judgement." }
      ]
    },
    {
      slug: "said-at-death-too",
      title: "Said at death too",
      line: "The calm soul hears these words at death and on Judgment Day.",
      facts: ["As-Sa'di explains", "Twice good news"],
      quote: q89(29),
      source: saadi(89, 29, "As-Sa'di says the words come back to your Lord and enter My Paradise are said to the believing soul on the Day of Judgment, and also when it dies.", "وتخاطب به حال الموت"),
      difficulty: 2,
      questions: [
        { q: "When does the tranquil soul hear Al-Fajr 89:27-30?", a: "At death and on Judgment Day", wrong: ["Only at birth", "Never", "Only in dreams"], why: "On the Day of Judgment and at the time of death, says as-Sa'di." },
        { q: "The tranquil soul is calm with...?", a: "Remembering Allah", wrong: ["Money", "Fame", "Games"], why: "At peace with dhikr and His love." },
        { tf: true, q: "The tranquil soul is pleased with Allah and He with it.", why: "As-Sa'di on 89:28." }
      ]
    }
  ]
};

export const FAJR_UNITS: readonly DeepUnit[] = [FAJR_ONE, FAJR_TWO, FAJR_THREE, FAJR_FOUR];
