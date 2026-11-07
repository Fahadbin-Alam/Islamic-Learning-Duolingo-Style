import type { LessonSource } from "../../types";
import { hadith, quranQuote, saadi, type DeepUnit } from "../deepKit";

// Surah Al-Qari'ah ayah by ayah, the way the surahs before it are taught: every ayah or small group of ayahs gets a lesson,
// explained as Tafsir Ibn Kathir explains it (the abridged English on quran.com), with a sahih hadith where one explains
// the ayah. Each source opens at the highlighted words that say the lesson's point.

/** Tafsir Ibn Kathir on Al-Qari'ah 101:ayah, on quran.com, opened at `highlight` (words copied from that page). */
function ik(ayah: number, summary: string, highlight: string): LessonSource {
  return {
    id: `deep_ibn_kathir_101_${ayah}`,
    site: "Quran.com",
    category: "tafsir",
    title: `Tafsir Ibn Kathir on Al-Qari'ah 101:${ayah}`,
    url: `https://quran.com/101:${ayah}/tafsirs/en-tafisr-ibn-kathir`,
    reference: `Tafsir Ibn Kathir 101:${ayah}`,
    from: "Tafsir Ibn Kathir (abridged English), on Quran.com",
    grade: "Tafsir",
    summary,
    highlight
  };
}

const q101 = (ayah: number) => quranQuote(101, ayah);


/** Ayahs 1 to 5: Al-Qari'ah, a name of the Day of Judgement, when people scatter like moths and mountains become like wool. */
const QARIAH_ONE: DeepUnit = {
  key: "qariah1",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-101",
  name: "Al-Qari'ah, ayahs 1-5",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Qari'ah",
  lessons: [
    {
      slug: "the-striking-day",
      title: "The Striking Day",
      line: "Al-Qari'ah is one of the names of the Day of Judgement.",
      facts: ["Al-Qari'ah: the Striking", "Also Al-Haqqah, Al-Ghashiyah"],
      quote: q101(1),
      source: ik(1, "Al-Qari'ah is one of the names of the Day of Judgement, like Al-Haqqah, At-Tammah, As-Sakhkhah and Al-Ghashiyah.", "is one of the names of the Day of Judgement"),
      difficulty: 1,
      questions: [
        { q: "What is Al-Qari'ah, per Ibn Kathir?", a: "A name of the Day of Judgement", wrong: ["A name of a city", "A name of a star", "A name of a river"], why: "Al-Qariah is one of the names of the Day of Judgement." },
        { q: "Which is another name for that Day?", a: "Al-Haqqah", wrong: ["Al-Fatihah", "Al-Kawthar", "Al-Ikhlas"], why: "Like Al-Haqqah, At-Tammah, As-Sakhkhah, Al-Ghashiyah." },
        { tf: true, q: "The Day of Judgement has many names in the Quran.", why: "Like Al-Haqqah, At-Tammah, As-Sakhkhah, Al-Ghashiyah and other names." }
      ]
    },
    {
      slug: "what-will-make-you-know",
      title: "What will make you know?",
      line: "Allah asks twice to make us think hard about that Day.",
      facts: ["A question to wake us", "Asked in 101:2 and 101:3"],
      quote: q101(2),
      source: ik(3, "Allah raises our concern for that Day by asking what will make you know what Al-Qari'ah is.", "Then Allah intensifies concern and fright for it"),
      difficulty: 1,
      questions: [
        { q: "What does 101:3 ask?", a: "What will make you know Al-Qari'ah?", wrong: ["Where is the sea?", "Who is the king?", "When is the harvest?"], why: "And what will make you know what Al-Qari'ah is?" },
        { q: "Why does Allah ask, per Ibn Kathir?", a: "To raise our concern for it", wrong: ["Because it is small", "To make it boring", "To hide it"], why: "Then Allah intensifies concern and fright for it." },
        { tf: true, q: "Allah then explains the Day in the next ayahs.", why: "Then He explains this by saying." }
      ]
    },
    {
      slug: "like-scattered-moths",
      title: "Like scattered moths",
      line: "People will rush about, confused, like moths scattered around.",
      facts: ["Farash: moths", "Like locusts in 54:7"],
      quote: q101(4),
      source: ik(4, "People will scatter, come and go, bewildered at what is happening, like scattered moths, as in 54:7.", "they will be like scattered moths"),
      difficulty: 2,
      questions: [
        { q: "What will people be like, per 101:4?", a: "Scattered moths", wrong: ["Calm lakes", "Tall trees", "Sleeping cats"], why: "It is a Day whereon mankind will be like moths scattered about." },
        { q: "Why will they scatter, per Ibn Kathir?", a: "Bewildered at what happens", wrong: ["Looking for food", "Playing a game", "Going to market"], why: "All due to being bewildered at what is happening to them." },
        { q: "Which ayah compares them to locusts?", a: "54:7", wrong: ["2:255", "112:1", "1:2"], why: "As if they were locusts spread abroad. 54:7" }
      ]
    },
    {
      slug: "mountains-like-wool",
      title: "Mountains like wool",
      line: "The mighty mountains will become like fluffy carded wool.",
      facts: ["Ihn: wool", "Manfush: carded"],
      quote: q101(5),
      source: ik(5, "The mountains will become like carded wool that wears out and is torn apart; many Salaf said Ihn means wool.", "they will become like carded wool"),
      difficulty: 2,
      questions: [
        { q: "What will the mountains be like, per 101:5?", a: "Carded wool", wrong: ["Hard iron", "Ice", "Gold"], why: "And the mountains will be like wool, carded." },
        { q: "What does Ihn mean, per the Salaf?", a: "Wool", wrong: ["Sand", "Smoke", "Cotton"], why: "Like wool, Woolen." },
        { tf: false, q: "The mountains will stay strong and firm.", why: "They will become like carded wool that has began to wear out and be torn apart." }
      ]
    },
    {
      slug: "two-groups",
      title: "Then the scales are set",
      line: "Then the scales are set, and people split into two groups.",
      facts: ["As-Sa'di explains", "Happy or wretched"],
      quote: q101(5),
      source: saadi(101, 5, "As-Sa'di says the mountains then become scattered dust, the scales are set up, and people split into two groups, the happy and the wretched.", "وينقسم الناس قسمين"),
      difficulty: 2,
      questions: [
        { q: "What is set up after the mountains vanish?", a: "The scales", wrong: ["New mountains", "Markets", "Houses"], why: "Then the scales are set up, says as-Sa'di." },
        { q: "Into how many groups do people split?", a: "Two", wrong: ["Five", "Ten", "One"], why: "People split into two groups." },
        { tf: true, q: "In the end the mountains become scattered dust.", why: "As-Sa'di on 101:5." }
      ]
    }
  ]
};

/** Ayahs 6 to 11: heavy and light scales, a pleasant life in Paradise, and Hawiyah, a name of the Fire. */
const QARIAH_TWO: DeepUnit = {
  key: "qariah2",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-101",
  name: "Al-Qari'ah, ayahs 6-11",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Qari'ah",
  lessons: [
    {
      slug: "a-heavy-scale",
      title: "A heavy scale",
      line: "A heavy scale means good deeds outweigh the bad.",
      facts: ["Al-Mizan: the Balance", "Deeds are weighed"],
      quote: q101(6),
      source: ik(6, "Allah tells the results of people's deeds: a heavy Balance means his good deeds are more than his bad deeds.", "his good deeds are more than his bad deeds"),
      difficulty: 1,
      questions: [
        { q: "What does a heavy Balance mean, per Ibn Kathir?", a: "More good deeds than bad", wrong: ["A rich person", "A tall person", "A strong person"], why: "His good deeds are more than his bad deeds." },
        { q: "What is weighed in the Balance?", a: "Deeds", wrong: ["Gold", "Food", "Stones"], why: "Allah informs about the results received by those who performed the deeds." },
        { tf: true, q: "Every good deed adds weight to the scale.", why: "Then as for him whose Balance will be heavy." }
      ]
    },
    {
      slug: "a-pleasant-life",
      title: "A pleasant life",
      line: "Those with heavy scales will live a pleasant life in Paradise.",
      facts: ["Ishah radiyah: a pleased life", "In Paradise"],
      quote: q101(7),
      source: ik(7, "He will live a pleasant life, meaning in Paradise.", "meaning, in Paradise"),
      difficulty: 1,
      questions: [
        { q: "What life does 101:7 promise?", a: "A pleasant life", wrong: ["A hard life", "A short life", "A lonely life"], why: "He will live a pleasant life." },
        { q: "Where is this life, per Ibn Kathir?", a: "In Paradise", wrong: ["In a palace on earth", "In the sea", "In the clouds"], why: "Meaning, in Paradise." },
        { tf: true, q: "A heavy scale leads to a pleasant life.", why: "Then as for him whose Balance will be heavy, he will live a pleasant life." }
      ]
    },
    {
      slug: "two-heavy-words",
      title: "Two heavy words",
      line: "Two easy phrases: light on the tongue, heavy on the scale.",
      facts: ["Subhan Allah wa bihamdihi", "Subhan Allah al-Azim"],
      quote: q101(6),
      source: hadith("bukhari", "7563", "Abu Hurairah", "Sahih", "Two words are dear to the Most Merciful, light on the tongue and heavy in the Balance: Subhan Allah wa bihamdihi, Subhan Allah al-Azim.", "very heavy in weight in the balance"),
      difficulty: 2,
      questions: [
        { q: "How are the two words on the tongue?", a: "Very light", wrong: ["Very hard", "Very long", "Very loud"], why: "Very light easy for the tongue to say." },
        { q: "How are they in the Balance?", a: "Very heavy", wrong: ["Very light", "Empty", "Hidden"], why: "But very heavy in weight in the balance." },
        { q: "Which of these is one of the two phrases?", a: "Subhan Allah al-Azim", wrong: ["Allahu Akbar kabira", "La hawla wa la quwwata", "Astaghfirullah"], why: "They are: Subhan Allah wa-bi hamdihi and Subhan Allah Al-Azim." }
      ]
    },
    {
      slug: "alhamdulillah-fills-the-scale",
      title: "Alhamdulillah fills the scale",
      line: "Saying Alhamdulillah fills the scale with good.",
      facts: ["Alhamdulillah: all praise to Allah", "Cleanliness is half of faith"],
      quote: q101(6),
      source: hadith("muslim", "223", "Abu Malik al-Ash'ari", "Sahih", "Cleanliness is half of faith, and Alhamdulillah fills the scale; prayer is a light and charity is a proof.", "fills the scale"),
      difficulty: 2,
      questions: [
        { q: "Which phrase fills the scale?", a: "Alhamdulillah", wrong: ["Good morning", "Thank you", "Well done"], why: "And al-Hamdu Lillah fills the scale." },
        { q: "What is half of faith, per the hadith?", a: "Cleanliness", wrong: ["Sleep", "Wealth", "Travel"], why: "Cleanliness is half of faith." },
        { tf: true, q: "The same hadith calls prayer a light.", why: "And prayer is a light." }
      ]
    },
    {
      slug: "a-light-scale",
      title: "A light scale",
      line: "A light scale means bad deeds outweigh the good.",
      facts: ["Light scale: more bad", "Repent while you can"],
      quote: q101(8),
      source: ik(8, "A light Balance means his bad deeds are more than his good deeds.", "his bad deeds are more than his good deeds"),
      difficulty: 2,
      questions: [
        { q: "What does a light Balance mean, per Ibn Kathir?", a: "More bad deeds than good", wrong: ["A poor person", "A short person", "A young person"], why: "His bad deeds are more than his good deeds." },
        { q: "What can we do now to make our scale heavy?", a: "Do good and repent", wrong: ["Wait and see", "Hide our deeds", "Do nothing"], why: "His good deeds are more than his bad deeds." },
        { tf: false, q: "The Balance only weighs big deeds.", why: "But as for him whose Balance will be light." }
      ]
    },
    {
      slug: "hawiyah",
      title: "Hawiyah",
      line: "Hawiyah is a name of the Fire, the only home for some.",
      facts: ["Hawiyah: a name of the Fire", "Called his mother: his home"],
      quote: q101(9),
      source: ik(9, "Hawiyah is one of the names of the Fire; Ibn Jarir said it is called his mother because it will be his only home.", "which is one of the names of the Hellfire"),
      difficulty: 3,
      questions: [
        { q: "What is Hawiyah, per Ibn Kathir?", a: "A name of the Fire", wrong: ["A garden", "A river", "A mountain"], why: "Hawiyah, which is one of the names of the Hellfire." },
        { q: "Why is it called his mother, per Ibn Jarir?", a: "It is his only home", wrong: ["It is kind to him", "It raised him", "It is far away"], why: "Because he will have no other abode except for it." },
        { tf: true, q: "Hawiyah is for the one whose scale is light.", why: "But as for him whose Balance will be light, his mother will be Hawiyah." }
      ]
    },
    {
      slug: "a-blazing-fire",
      title: "A blazing fire",
      line: "Allah explains Hawiyah: a fire of intense heat.",
      facts: ["Hamiyah: intensely hot", "Seek refuge in Allah"],
      quote: q101(10),
      source: ik(11, "Hamiyah means extreme heat with strong flame; Allah explains what Hawiyah is.", "meaning, extreme heat"),
      difficulty: 3,
      questions: [
        { q: "How does 101:11 describe the fire?", a: "Hamiyah, intensely hot", wrong: ["Cool", "Small", "Dim"], why: "A fire Hamiyah!" },
        { q: "What does Hamiyah mean, per Ibn Kathir?", a: "Extreme heat", wrong: ["Gentle warmth", "Bright light", "Cold wind"], why: "Meaning, extreme heat." },
        { tf: true, q: "We should ask Allah to keep us safe from it.", why: "And what will make you know what it is? A fire Hamiyah!" }
      ]
    },
    {
      slug: "pray-when-it-cools",
      title: "Pray when it cools",
      line: "In very hot weather, pray Dhuhr a little later when it cools.",
      facts: ["Dhuhr: the noon prayer", "Heat reminds of the Fire"],
      quote: q101(11),
      source: hadith("bukhari", "536", "Abu Hurairah", "Sahih", "In very hot weather delay the Dhuhr prayer till it becomes cooler, because the strong heat is from the Fire.", "delay the Zuhr prayer till it becomes"),
      difficulty: 3,
      questions: [
        { q: "Which prayer can be delayed in great heat?", a: "Dhuhr", wrong: ["Fajr", "Maghrib", "Isha"], why: "In very hot weather delay the Zuhr prayer till it becomes cooler." },
        { q: "Why delay it, per the hadith?", a: "The heat is from the Fire", wrong: ["To sleep more", "To eat first", "To travel"], why: "Because the severity of heat is from the raging of the Hell-fire." },
        { tf: true, q: "Islam makes prayer easier in great heat.", why: "In very hot weather delay the Zuhr prayer till it becomes a bit cooler." }
      ]
    }
  ]
};

export const QARIAH_UNITS: readonly DeepUnit[] = [QARIAH_ONE, QARIAH_TWO];
