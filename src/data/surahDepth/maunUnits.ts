import type { LessonSource } from "../../types";
import { hadith, quranQuote, saadi, type DeepUnit } from "../deepKit";

// Surah Al-Ma'un ayah by ayah, the way the surahs before it are taught: every ayah or small group of ayahs gets a lesson,
// explained as Tafsir Ibn Kathir explains it (the abridged English on quran.com), with a sahih hadith where one explains
// the ayah. Each source opens at the highlighted words that say the lesson's point.

/** Tafsir Ibn Kathir on Al-Ma'un 107:ayah, on quran.com, opened at `highlight` (words copied from that page). */
function ik(ayah: number, summary: string, highlight: string): LessonSource {
  return {
    id: `deep_ibn_kathir_107_${ayah}`,
    site: "Quran.com",
    category: "tafsir",
    title: `Tafsir Ibn Kathir on Al-Ma'un 107:${ayah}`,
    url: `https://quran.com/107:${ayah}/tafsirs/en-tafisr-ibn-kathir`,
    reference: `Tafsir Ibn Kathir 107:${ayah}`,
    from: "Tafsir Ibn Kathir (abridged English), on Quran.com",
    grade: "Tafsir",
    summary,
    highlight
  };
}

const q107 = (ayah: number) => quranQuote(107, ayah);


/** Ayahs 1 to 3: the one who denies the Recompense pushes away the orphan and does not urge feeding the poor. */
const MAUN_ONE: DeepUnit = {
  key: "maun1",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-107",
  name: "Al-Ma'un, ayahs 1-3",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Ma'un",
  lessons: [
    {
      slug: "who-denies-the-recompense",
      title: "Who denies the Recompense?",
      line: "Allah points to the one who denies the Day of Recompense.",
      facts: ["Ad-Din: the Recompense", "The Hereafter"],
      quote: q107(1),
      source: ik(1, "Ad-Din in the ayah means the Hereafter, the Recompense and the Final Reward.", "the word Din means the Hereafter, the Recompense and the Final Reward"),
      difficulty: 1,
      questions: [
        { q: "What does Ad-Din mean in 107:1, per Ibn Kathir?", a: "The Hereafter and the Recompense", wrong: ["A market", "A journey", "A family"], why: "The word Din means the Hereafter, the Recompense and the Final Reward." },
        { q: "Whom does 107:1 ask about?", a: "One who denies Ad-Din", wrong: ["One who prays at night", "One who fasts", "One who travels"], why: "Have you seen him who denies Ad-Din?" },
        { tf: true, q: "Believing in the Hereafter shapes how we treat people.", why: "The one who denies the Din is the one who repulses the orphan." }
      ]
    },
    {
      slug: "pushing-the-orphan-away",
      title: "Pushing the orphan away",
      line: "He is harsh to orphans and keeps back what they are owed.",
      facts: ["Yatim: orphan", "Yadu: pushes away"],
      quote: q107(2),
      source: ik(2, "He oppresses the orphan, does not give him his just due, does not feed him and is not kind to him.", "he is the one who oppresses the orphan and does not give him his just due"),
      difficulty: 1,
      questions: [
        { q: "What does he do to the orphan, per 107:2?", a: "Pushes him away", wrong: ["Feeds him", "Teaches him", "Hugs him"], why: "That is he who repulses the orphan." },
        { q: "What does he hold back, per Ibn Kathir?", a: "The orphan's just due", wrong: ["His own prayer", "His travel", "His sleep"], why: "He oppresses the orphan and does not give him his just due." },
        { tf: false, q: "Such a person still feeds the orphan kindly.", why: "He does not feed him, nor is he kind to him." }
      ]
    },
    {
      slug: "close-to-the-prophet-in-paradise",
      title: "Close to the Prophet ﷺ in Paradise",
      line: "Caring for orphans brings you near the Prophet ﷺ in Paradise.",
      facts: ["Like two fingers", "Kafil: one who cares"],
      quote: q107(2),
      source: hadith("bukhari", "5304", "Sahl bin Sa'd", "Sahih", "The Prophet ﷺ said he and the one who looks after an orphan will be like this in Paradise, showing two fingers.", "the one who looks after an orphan will be like this in Paradise"),
      difficulty: 2,
      questions: [
        { q: "Who will be close to the Prophet ﷺ in Paradise?", a: "One who looks after an orphan", wrong: ["One who is rich", "One who is famous", "One who is strong"], why: "The one who looks after an orphan will be like this in Paradise." },
        { q: "Which fingers did he show?", a: "The middle and index fingers", wrong: ["The thumb and little finger", "All ten fingers", "One fist"], why: "Showing his middle and index fingers and separating them." },
        { tf: true, q: "Al-Ma'un warns against what the hadith praises.", why: "Al-Ma'un blames pushing the orphan away; the hadith praises caring for one." }
      ]
    },
    {
      slug: "urging-food-for-the-poor",
      title: "Urging food for the poor",
      line: "He neither feeds the poor nor tells others to feed them.",
      facts: ["Miskin: a poor person", "Yahuddu: urges"],
      quote: q107(3),
      source: ik(3, "Al-Miskin is the poor man who has nothing to sustain him and suffice his needs.", "the poor man who has nothing to sustain him and suffice his needs"),
      difficulty: 2,
      questions: [
        { q: "What does he fail to do, per 107:3?", a: "Urge the feeding of the poor", wrong: ["Build a house", "Plant a tree", "Go on a trip"], why: "And urges not the feeding of Al-Miskin." },
        { q: "Who is Al-Miskin, per Ibn Kathir?", a: "One with nothing to meet his needs", wrong: ["A rich trader", "A traveler with gold", "A king"], why: "The poor man who has nothing to sustain him and suffice his needs." },
        { tf: true, q: "Even urging others to feed the poor is a good deed.", why: "Allah blames the one who urges not the feeding of Al-Miskin." }
      ]
    },
    {
      slug: "feed-and-greet",
      title: "Feed and greet",
      line: "Feeding people and greeting everyone are among the best deeds.",
      facts: ["Feed the hungry", "Salam to all"],
      quote: q107(3),
      source: hadith("bukhari", "12", "Abdullah ibn Amr", "Sahih", "Asked which deeds of Islam are good, he said to feed people and greet those you know and those you do not.", "greet those whom you know and those whom you do not"),
      difficulty: 2,
      questions: [
        { q: "What good deed did the Prophet ﷺ name first?", a: "To feed people", wrong: ["To sleep early", "To walk fast", "To buy clothes"], why: "To feed (the poor)." },
        { q: "Whom should we greet, per the hadith?", a: "Those we know and those we do not", wrong: ["Only friends", "Only family", "Only elders"], why: "Greet those whom you know and those whom you do not know." },
        { tf: false, q: "Salam is only for people we already know.", why: "Greet those whom you know and those whom you do not know." }
      ]
    },
    {
      slug: "if-not-even-urging",
      title: "If he will not even urge",
      line: "Who won't urge feeding the poor won't feed them himself.",
      facts: ["As-Sa'di explains", "From the lesser to the greater"],
      quote: q107(3),
      source: saadi(107, 3, "As-Sa'di says if he does not even urge others to feed the poor, then all the more he does not feed them himself.", "ومن باب أولى أنه بنفسه لا يطعم المسكين"),
      difficulty: 2,
      questions: [
        { q: "If he won't urge others to feed the poor, then...?", a: "He won't feed them himself", wrong: ["He feeds them in secret", "He gives gold", "He builds homes"], why: "All the more, he does not feed the poor himself." },
        { q: "Which scholar explains 107:3 so?", a: "As-Sa'di", wrong: ["Al-Bukhari", "Imam Malik", "Ibn Hajar"], why: "Tafsir as-Sa'di on 107:3." },
        { tf: true, q: "Telling others to feed the poor is a good deed too.", why: "Allah blames the one who does not urge it. As-Sa'di on 107:3." }
      ]
    }
  ]
};

/** Ayahs 4 to 7: woe to those careless about prayer, who show off and hold back small kindnesses. */
const MAUN_TWO: DeepUnit = {
  key: "maun2",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-107",
  name: "Al-Ma'un, ayahs 4-7",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Ma'un",
  lessons: [
    {
      slug: "careless-about-prayer",
      title: "Careless about prayer",
      line: "Some pray in front of people but stay heedless of the prayer.",
      facts: ["Sahun: heedless", "Pray with the heart"],
      quote: q107(4),
      source: ik(4, "They pray and keep up the prayer, yet they are mindless of it; Ibn Abbas said they pray in public but not in private.", "They are those people who pray and adhere to the prayer, yet they are mindless of it"),
      difficulty: 2,
      questions: [
        { q: "Who gets woe in 107:4-5?", a: "Those heedless of their Salah", wrong: ["Those who pray on time", "Those who pray at night", "Those who teach prayer"], why: "So, woe unto those performers of Salah, those who with their Salah are Sahun." },
        { q: "How did Ibn Abbas describe them?", a: "Pray in public, not in private", wrong: ["Pray only in private", "Never pray at all", "Pray all night"], why: "The hypocrites who pray in public but do not pray in private." },
        { tf: true, q: "Sahun means heedless or mindless.", why: "They pray and adhere to the prayer, yet they are mindless of it." }
      ]
    },
    {
      slug: "about-not-in",
      title: "About, not in",
      line: "Allah said heedless about prayer, not forgetful in prayer.",
      facts: ["An: about", "Fi: in"],
      quote: q107(5),
      source: ik(5, "Ata bin Dinar praised Allah for saying heedless about their Salah, not absent minded in their prayer.", "those who are absent minded in their prayer"),
      difficulty: 3,
      questions: [
        { q: "Why did Ata bin Dinar praise Allah?", a: "The ayah says about prayer, not in prayer", wrong: ["The ayah is short", "The ayah rhymes", "The ayah is the last"], why: "He did not say, those who are absent minded in their prayer." },
        { q: "Which kind of heedlessness does 107:5 blame?", a: "Neglecting the prayer itself", wrong: ["A small slip in prayer", "A sneeze in prayer", "A cough in prayer"], why: "With their Salah are Sahun." },
        { tf: false, q: "Every small slip in prayer earns the woe of 107:4.", why: "He did not say, those who are absent minded in their prayer." }
      ]
    },
    {
      slug: "praying-on-time",
      title: "Praying on time",
      line: "Delaying prayer until it is too late is part of heedlessness.",
      facts: ["Each prayer has a time", "Pray early"],
      quote: q107(5),
      source: ik(5, "Heedlessness may mean praying outside its stipulated time, as Masruq and Abu Ad-Duha said.", "performing it in its stipulated time"),
      difficulty: 2,
      questions: [
        { q: "Who said Sahun can mean praying late?", a: "Masruq and Abu Ad-Duha", wrong: ["Ibn Jarir and Qatadah", "Mujahid and Ikrimah", "Ibn Zayd and Ata"], why: "This was said by Masruq and Abu Ad-Duha." },
        { q: "What else can Sahun mean, per Ibn Kathir?", a: "Not fulfilling its pillars", wrong: ["Praying too long", "Praying in a group", "Praying at the mosque"], why: "It may also refer to not fulfilling its pillars and conditions." },
        { tf: true, q: "The wording covers all these meanings.", why: "The wording of the Ayah comprises all of these meanings." }
      ]
    },
    {
      slug: "wasting-the-prayer",
      title: "Wasting the prayer",
      line: "Heedless of prayer: missing its time and its pillars.",
      facts: ["As-Sa'di explains", "Arkan: pillars of prayer"],
      quote: q107(5),
      source: saadi(107, 5, "As-Sa'di says those heedless of prayer waste it: they leave its time and miss its pillars, while slips inside prayer happen to everyone.", "مفوتون لأركانها"),
      difficulty: 2,
      questions: [
        { q: "What does being heedless of prayer include?", a: "Missing its time and pillars", wrong: ["Praying in a group", "Making dua", "Praying sunnah"], why: "Leaving its time, missing its pillars." },
        { q: "Slips inside the prayer happen to...?", a: "Everyone", wrong: ["Only the lazy", "No one", "Only children"], why: "Forgetting in prayer happens to everyone, even the Prophet ﷺ." },
        { tf: false, q: "Forgetting something inside prayer is the sin in 107:5.", why: "The blame is for wasting the prayer, says as-Sa'di." }
      ]
    },
    {
      slug: "the-dearest-deed",
      title: "The dearest deed",
      line: "Prayer at its proper time is the deed Allah loves most.",
      facts: ["First: prayer on time", "Next: good to parents"],
      quote: q107(5),
      source: hadith("bukhari", "527", "Abdullah ibn Mas'ud", "Sahih", "Asked which deed is dearest to Allah, he said offering the prayers at their early fixed times.", "To offer the prayers at their early stated fixed times"),
      difficulty: 2,
      questions: [
        { q: "Which deed is dearest to Allah, per the hadith?", a: "Prayer at its early fixed time", wrong: ["Buying a house", "Long sleep", "Big feasts"], why: "To offer the prayers at their early stated fixed times." },
        { q: "What came next after prayer?", a: "Being good to parents", wrong: ["Being rich", "Being famous", "Being strong"], why: "To be good and dutiful to your parents." },
        { tf: false, q: "Delaying prayer to the last minute is best.", why: "The dearest deed is to offer the prayers at their early stated fixed times." }
      ]
    },
    {
      slug: "only-to-be-seen",
      title: "Only to be seen",
      line: "Showing off means doing good just so people will praise you.",
      facts: ["Riya: showing off", "Ikhlas: sincerity"],
      quote: q107(6),
      source: ik(6, "Whoever does a deed for Allah alone and people learn of it and he is pleased, that is not showing off.", "then this is not considered showing off"),
      difficulty: 2,
      questions: [
        { q: "What do they do, per 107:6?", a: "Good deeds only to be seen", wrong: ["Good deeds in secret", "No deeds at all", "Deeds for parents"], why: "Those who do good deeds only to be seen." },
        { q: "If a deed is for Allah and people find out, what then?", a: "No showing off", wrong: ["The deed is lost", "Must be repeated", "Must be hidden"], why: "Then this is not considered showing off." },
        { tf: true, q: "Sincerity means doing deeds for Allah alone.", why: "Whoever does a deed solely for Allah is not showing off." }
      ]
    },
    {
      slug: "allah-reveals-intentions",
      title: "Allah reveals intentions",
      line: "Allah will show the real intention of those who show off.",
      facts: ["Allah knows hearts", "Seek His face"],
      quote: q107(6),
      source: hadith("bukhari", "6499", "Jundub", "Sahih", "Whoever does good in public to show off, Allah will disclose his real intention.", "he who does good things in public to show off"),
      difficulty: 3,
      questions: [
        { q: "What will Allah do with one who shows off?", a: "Disclose his real intention", wrong: ["Double his reward", "Hide his deeds", "Make him famous"], why: "Allah will disclose his real intention." },
        { q: "Who narrated the hadith?", a: "Jundub", wrong: ["Bilal", "Salman", "Khabbab"], why: "Narrated Jundub." },
        { tf: false, q: "Seeking people's praise earns Allah's reward.", why: "He who does good things in public to show off, Allah will disclose his real intention." }
      ]
    },
    {
      slug: "the-small-kindnesses",
      title: "The small kindnesses",
      line: "Al-Ma'un is everyday help like lending a pot or a bucket.",
      facts: ["Ma'un: small help", "Axe, pot, bucket"],
      quote: q107(7),
      source: ik(7, "Ibn Masud said Al-Ma'un is what people give each other, like an axe, a pot, a bucket and similar items.", "like an axe, a pot, a bucket and similar items"),
      difficulty: 2,
      questions: [
        { q: "What is Al-Ma'un, per Ibn Masud?", a: "Small things people lend each other", wrong: ["Gold and silver", "Land and houses", "Camels and horses"], why: "It is what the people give to each other, like an axe, a pot, a bucket." },
        { q: "Which is an example of Al-Ma'un?", a: "A bucket", wrong: ["A palace", "A ship", "A crown"], why: "Like an axe, a pot, a bucket and similar items." },
        { tf: true, q: "Lending a pot to a neighbor is a good deed.", why: "Al-Ma'un is what the people give to each other, like a pot." }
      ]
    },
    {
      slug: "even-the-smallest-loan",
      title: "Even the smallest loan",
      line: "They refuse even to lend things that come back unharmed.",
      facts: ["Lend and get back", "Stingy with charity"],
      quote: q107(7),
      source: ik(7, "They do not even lend what others may benefit from, though it would be returned to them intact.", "They do not even lend that which others may benefit from"),
      difficulty: 3,
      questions: [
        { q: "What do they refuse, per 107:7?", a: "Al-Ma'un", wrong: ["Their sleep", "Their food", "Their trips"], why: "And withhold Al-Ma'un." },
        { q: "What happens to a lent item, per Ibn Kathir?", a: "Returned to them intact", wrong: ["Lost forever", "Sold off", "Broken"], why: "Even though the object will remain intact and be returned to them." },
        { tf: false, q: "Such people are generous with Zakah.", why: "These people are even stingier when it comes to giving Zakah." }
      ]
    }
  ]
};

export const MAUN_UNITS: readonly DeepUnit[] = [MAUN_ONE, MAUN_TWO];
