import type { LessonSource } from "../../types";
import { hadith, quranQuote, saadi, type DeepUnit } from "../deepKit";

// Surah Az-Zalzalah ayah by ayah, the way the surahs before it are taught: every ayah or small group of ayahs gets a lesson,
// explained as Tafsir Ibn Kathir explains it (the abridged English on quran.com), with a sahih hadith where one explains
// the ayah. Each source opens at the highlighted words that say the lesson's point.

/** Tafsir Ibn Kathir on Az-Zalzalah 99:ayah, on quran.com, opened at `highlight` (words copied from that page). */
function ik(ayah: number, summary: string, highlight: string): LessonSource {
  return {
    id: `deep_ibn_kathir_99_${ayah}`,
    site: "Quran.com",
    category: "tafsir",
    title: `Tafsir Ibn Kathir on Az-Zalzalah 99:${ayah}`,
    url: `https://quran.com/99:${ayah}/tafsirs/en-tafisr-ibn-kathir`,
    reference: `Tafsir Ibn Kathir 99:${ayah}`,
    from: "Tafsir Ibn Kathir (abridged English), on Quran.com",
    grade: "Tafsir",
    summary,
    highlight
  };
}

const q99 = (ayah: number) => quranQuote(99, ayah);


/** Ayahs 1 to 5: the earth shakes, gives up what is inside it, and tells what people did on it. */
const ZALZALAH_ONE: DeepUnit = {
  key: "zalzalah1",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-99",
  name: "Az-Zalzalah, ayahs 1-5",
  kind: "skill",
  lessonType: "surah",
  surahName: "Az-Zalzalah",
  lessons: [
    {
      slug: "the-great-shaking",
      title: "The great shaking",
      line: "On the Last Day the whole earth will shake from beneath.",
      facts: ["Zalzalah: a great quake", "Like 22:1"],
      quote: q99(1),
      source: ik(1, "Ibn Abbas said the earth will move from beneath it; this is the great quake of the Hour, as in 22:1.", "it will move from beneath it"),
      difficulty: 1,
      questions: [
        { q: "What happens to the earth in 99:1?", a: "It quakes", wrong: ["It freezes", "It sleeps", "It shines"], why: "When the earth quakes with its Zilzal." },
        { q: "How did Ibn Abbas explain the quake?", a: "It moves from beneath", wrong: ["Wind blows on it", "Rain floods it", "People dig it"], why: "This means that it will move from beneath it." },
        { tf: true, q: "Ibn Kathir links 99:1 to the quake of the Hour in 22:1.", why: "Verily, the earthquake Zalzalah of the Hour is a terrible thing. 22:1" }
      ]
    },
    {
      slug: "the-earth-gives-up-its-burdens",
      title: "The earth gives up its burdens",
      line: "The earth will bring out all the dead for the Resurrection.",
      facts: ["Athqal: burdens", "Like 84:3-4"],
      quote: q99(2),
      source: ik(2, "The earth will bring out the dead that are in it, as more than one of the Salaf said, like 84:3-4.", "it will throw forth that which is in it of the dead"),
      difficulty: 1,
      questions: [
        { q: "What does the earth throw out, per 99:2?", a: "Its burdens", wrong: ["Its rivers", "Its clouds", "Its stars"], why: "And when the earth throws out its burdens." },
        { q: "What are its burdens, per Ibn Kathir?", a: "The dead inside it", wrong: ["Its rocks", "Its trees", "Its sand"], why: "It will throw forth that which is in it of the dead." },
        { tf: true, q: "Everyone, first to last, will be brought out.", why: "Then it will throw out its dead people, from the first to the last generations." }
      ]
    },
    {
      slug: "treasure-nobody-wants",
      title: "Treasure nobody wants",
      line: "Gold and silver will pour out, and nobody will want it.",
      facts: ["Gold like columns", "Wealth is worthless then"],
      quote: q99(2),
      source: hadith("muslim", "1013", "Abu Hurairah", "Sahih", "The earth will bring out its treasures like columns of gold and silver; those who sinned for wealth will regret it, and nobody will take any of it.", "They will then leave it and will not take anything out of it"),
      difficulty: 2,
      questions: [
        { q: "What will come out like columns?", a: "Gold and silver", wrong: ["Water and milk", "Wood and stone", "Salt and sugar"], why: "Pieces of its liver like columns of gold and silver." },
        { q: "What will people do with the treasure?", a: "Leave it all", wrong: ["Fight for it", "Hide it", "Sell it"], why: "They will then leave it and will not take anything out of it." },
        { tf: true, q: "Sinning for money is never worth it.", why: "They will then leave it and will not take anything out of it." }
      ]
    },
    {
      slug: "what-is-the-matter-with-it",
      title: "What is the matter with it?",
      line: "People will be amazed that the steady ground now shakes.",
      facts: ["Ma laha: what is wrong with it?", "Once firm and settled"],
      quote: q99(3),
      source: ik(3, "Man will be baffled that the earth, once stable and firm under him, now moves and shakes.", "he will be baffled by its situation after it used to be stable, settled and firm"),
      difficulty: 2,
      questions: [
        { q: "What will man say in 99:3?", a: "What is the matter with it?", wrong: ["Where is my home?", "Who are you?", "Is it morning?"], why: "And man will say: What is the matter with it?" },
        { q: "Why will he be baffled, per Ibn Kathir?", a: "It used to be firm", wrong: ["It was always shaking", "He was asleep", "It was dark"], why: "After it used to be stable, settled and firm." },
        { tf: false, q: "People will expect the shaking and feel calm.", why: "At that time the people will be baffled by the events." }
      ]
    },
    {
      slug: "the-earth-tells-its-news",
      title: "The earth tells its news",
      line: "The earth will tell what people did on top of it.",
      facts: ["Akhbaraha: its news", "The ground is a witness"],
      quote: q99(4),
      source: ik(4, "That Day the earth will speak of what people did on its surface.", "it will speak of what the people did upon its surface"),
      difficulty: 2,
      questions: [
        { q: "What will the earth declare in 99:4?", a: "Its information", wrong: ["Its age", "Its size", "Its color"], why: "That Day it will declare its information." },
        { q: "What will it speak of, per Ibn Kathir?", a: "What people did on it", wrong: ["Its weather", "Its mountains", "Its seasons"], why: "It will speak of what the people did upon its surface." },
        { tf: true, q: "The places we pray on can witness for us.", why: "It will speak of what the people did upon its surface." }
      ]
    },
    {
      slug: "by-your-lords-command",
      title: "By your Lord's command",
      line: "The earth speaks only by the command of Allah.",
      facts: ["Awha laha: inspired it", "Allah commands it"],
      quote: q99(5),
      source: ik(5, "Ibn Abbas said its Lord will tell it to speak and it will speak; Mujahid said He commands it.", "Its Lord will say to it"),
      difficulty: 3,
      questions: [
        { q: "Why will the earth speak, per 99:5?", a: "Your Lord inspires it", wrong: ["It wants to", "People ask it", "Angels force it"], why: "Because your Lord will inspire it." },
        { q: "What did Mujahid say inspire it means?", a: "He commands it", wrong: ["He forgets it", "He hides it", "He breaks it"], why: "He commands it, to speak." },
        { tf: true, q: "Ibn Abbas said Allah will tell the earth to speak.", why: "Its Lord will say to it, Speak. So it will speak." }
      ]
    }
  ]
};

/** Ayahs 6 to 8: people go out in groups to see their deeds, and every speck of good or evil will be seen. */
const ZALZALAH_TWO: DeepUnit = {
  key: "zalzalah2",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-99",
  name: "Az-Zalzalah, ayahs 6-8",
  kind: "skill",
  lessonType: "surah",
  surahName: "Az-Zalzalah",
  lessons: [
    {
      slug: "in-scattered-groups",
      title: "In scattered groups",
      line: "People will leave the Judgement in separate groups.",
      facts: ["Ashtat: scattered groups", "Happy or miserable"],
      quote: q99(6),
      source: ik(6, "People will go back from the place of Judgement in separate groups, some happy and some miserable.", "they will return from the station of the Judgement in separate groups"),
      difficulty: 1,
      questions: [
        { q: "How will people go out, per 99:6?", a: "In scattered groups", wrong: ["In one line", "All alone", "On horses"], why: "That Day mankind will proceed in scattered groups." },
        { q: "From where will they return, per Ibn Kathir?", a: "The station of Judgement", wrong: ["The market", "Their homes", "The sea"], why: "They will return from the station of the Judgement in separate groups." },
        { tf: true, q: "Some groups will be happy and some miserable.", why: "Between those who are miserable and those who are happy." }
      ]
    },
    {
      slug: "shown-their-deeds",
      title: "Shown their deeds",
      line: "Everyone will be shown what they did, good and bad.",
      facts: ["Liyuraw: to be shown", "Every deed is kept"],
      quote: q99(6),
      source: ik(6, "They go out so they may be shown and rewarded for what they did in this life of good and evil.", "rewarded for what they did in this life of good and evil"),
      difficulty: 1,
      questions: [
        { q: "Why do they go out, per 99:6?", a: "To be shown their deeds", wrong: ["To find food", "To build homes", "To rest"], why: "That they may be shown their deeds." },
        { q: "What will they be rewarded for, per Ibn Kathir?", a: "Their good and evil in this life", wrong: ["Their looks", "Their family name", "Their wealth"], why: "Rewarded for what they did in this life of good and evil." },
        { tf: false, q: "Only big deeds are kept; small ones are lost.", why: "So whosoever does good equal to the weight of a speck of dust shall see it." }
      ]
    },
    {
      slug: "a-speck-of-good",
      title: "A speck of good",
      line: "Even a speck of good will be seen and rewarded.",
      facts: ["Dharrah: a speck", "No good is wasted"],
      quote: q99(7),
      source: ik(7, "Allah rewards every tiny deed, so whoever does a speck of good will see it.", "The Recompense for Every Minute Deed"),
      difficulty: 1,
      questions: [
        { q: "How small is the good in 99:7?", a: "A speck of dust", wrong: ["A mountain", "A house", "A tree"], why: "Whosoever does good equal to the weight of a speck of dust shall see it." },
        { q: "What happens to that small good?", a: "He shall see it", wrong: ["It is lost", "It is forgotten", "It turns bad"], why: "Shall see it." },
        { tf: true, q: "Allah rewards even the tiniest deed.", why: "The Recompense for Every Minute Deed." }
      ]
    },
    {
      slug: "if-a-speck-counts",
      title: "If a speck counts",
      line: "If even a speck is weighed, bigger deeds count even more.",
      facts: ["As-Sa'di explains", "Every deed is counted"],
      quote: q99(7),
      source: saadi(99, 7, "As-Sa'di says a speck is the smallest thing, so if it is seen and rewarded, anything bigger is all the more.", "فما فوق ذلك من باب أولى وأحرى"),
      difficulty: 1,
      questions: [
        { q: "If a speck of good is rewarded, what about bigger deeds?", a: "They count even more", wrong: ["They are forgotten", "They count less", "They are lost"], why: "Anything above it, all the more, says as-Sa'di." },
        { q: "What does 99:7-8 push us toward?", a: "Good, even a little", wrong: ["Only big deeds", "Nothing", "Showing off"], why: "The greatest push to do good, even if small." },
        { tf: true, q: "Small sins should not be taken lightly either.", why: "A warning against evil, even if small. As-Sa'di on 99:7." }
      ]
    },
    {
      slug: "the-comprehensive-ayah",
      title: "The comprehensive ayah",
      line: "He called 99:7-8 the ayah that includes everything.",
      facts: ["Jamiah: all-including", "Asked about donkeys"],
      quote: q99(7),
      source: hadith("bukhari", "4963", "Abu Hurairah", "Sahih", "Asked about donkeys, he said nothing was revealed about them except this comprehensive ayah: whoever does a speck of good or evil shall see it.", "this comprehensive Verse which includes everything"),
      difficulty: 2,
      questions: [
        { q: "What was he asked about?", a: "Donkeys", wrong: ["Camels", "Sheep", "Birds"], why: "The Prophet ﷺ was asked about donkeys." },
        { q: "How did he describe 99:7-8?", a: "Comprehensive, including everything", wrong: ["Short and hard", "Only for scholars", "Only for kings"], why: "This comprehensive Verse which includes everything." },
        { tf: true, q: "Even kindness to animals counts as a deed.", why: "Nothing has been revealed to me regarding donkeys except this comprehensive Verse." }
      ]
    },
    {
      slug: "even-half-a-date",
      title: "Even half a date",
      line: "Give charity even if it is only half a date.",
      facts: ["Small charity counts", "Protection from the Fire"],
      quote: q99(7),
      source: hadith("bukhari", "1417", "Adi ibn Hatim", "Sahih", "He said: save yourself from the Fire even by giving half a date in charity.", "even by giving half a date-fruit in charity"),
      difficulty: 2,
      questions: [
        { q: "What small charity did he name?", a: "Half a date", wrong: ["A gold coin", "A camel", "A house"], why: "Even by giving half a date-fruit in charity." },
        { q: "What can half a date protect from?", a: "The Fire", wrong: ["The rain", "The cold", "Hunger"], why: "Save yourself from Hell-fire even by giving half a date-fruit in charity." },
        { tf: false, q: "Charity only counts if it is large.", why: "Even by giving half a date-fruit in charity." }
      ]
    },
    {
      slug: "a-good-word",
      title: "A good word",
      line: "No date to give? A kind, friendly word also protects you.",
      facts: ["Kalimah tayyibah: good word", "Free for everyone"],
      quote: q99(7),
      source: hadith("bukhari", "6023", "Adi ibn Hatim", "Sahih", "Save yourselves from the Fire even with half a date; if you do not have it, then with a good, friendly word.", "by saying a good pleasant friendly word"),
      difficulty: 2,
      questions: [
        { q: "What if you have no date to give?", a: "Say a good word", wrong: ["Give nothing", "Wait a year", "Borrow gold"], why: "And if this is not available, then by saying a good pleasant friendly word." },
        { q: "Which kind of word did he mean?", a: "Good, pleasant and friendly", wrong: ["Loud and proud", "Long and hard", "Clever and sharp"], why: "By saying a good pleasant friendly word." },
        { tf: true, q: "A kind word is a good deed anyone can do.", why: "Then save yourselves by saying a good pleasant friendly word." }
      ]
    },
    {
      slug: "a-cheerful-face",
      title: "A cheerful face",
      line: "No good is small, not even meeting others with a smile.",
      facts: ["Smiling is a good deed", "No good is too small"],
      quote: q99(7),
      source: hadith("muslim", "2626", "Abu Dharr", "Sahih", "Do not think any good is small, even meeting your brother with a cheerful face.", "meet your brother with a cheerful countenance"),
      difficulty: 2,
      questions: [
        { q: "What good deed did he mention to Abu Dharr?", a: "A cheerful face", wrong: ["A loud voice", "A big meal", "A long trip"], why: "Even if it is that you meet your brother with a cheerful countenance." },
        { q: "What should we never think of good deeds?", a: "That any is too small", wrong: ["That they are hard", "That they are fun", "That they are old"], why: "Don't consider anything insignificant out of good things." },
        { tf: true, q: "Smiling at a Muslim brother is a good deed.", why: "Meet your brother with a cheerful countenance." }
      ]
    },
    {
      slug: "a-neighbors-small-gift",
      title: "A neighbor's small gift",
      line: "Do not look down on a small gift from a neighbor.",
      facts: ["Gifts build love", "Even a sheep's foot"],
      quote: q99(7),
      source: hadith("bukhari", "2566", "Abu Hurairah", "Sahih", "He told the Muslim women not to look down on a gift from a neighbor, even a sheep's foot.", "None of you should look down upon the gift sent by her female neighbor"),
      difficulty: 3,
      questions: [
        { q: "Whose gift should not be looked down on?", a: "A neighbor's", wrong: ["A king's", "A stranger's", "A trader's"], why: "None of you should look down upon the gift sent by her female neighbor." },
        { q: "What small gift did he name?", a: "A sheep's foot", wrong: ["A gold ring", "A silk robe", "A horse"], why: "Even if it were the trotters of the sheep." },
        { tf: false, q: "Only expensive gifts are worth thanks.", why: "None of you should look down upon the gift sent by her female neighbor." }
      ]
    },
    {
      slug: "a-speck-of-evil",
      title: "A speck of evil",
      line: "Small sins add up, so do not take them lightly.",
      facts: ["Small sins count too", "Repent quickly"],
      quote: q99(8),
      source: hadith("bukhari", "6492", "Anas ibn Malik", "Sahih", "Anas said people did deeds that seemed tinier than a hair, but the Companions counted them as destructive sins.", "which seem in your eyes as tiny"),
      difficulty: 3,
      questions: [
        { q: "What will be seen, per 99:8?", a: "Even a speck of evil", wrong: ["Only big crimes", "Nothing at all", "Only words"], why: "And whosoever does evil equal to the weight of a speck of dust shall see it." },
        { q: "How did Anas say people saw some sins?", a: "Tinier than a hair", wrong: ["As big as mountains", "As good deeds", "As jokes"], why: "Deeds which seem in your eyes as tiny than hair." },
        { tf: true, q: "The Companions took small sins seriously.", why: "We used to consider those very deeds as destructive sins." }
      ]
    }
  ]
};

export const ZALZALAH_UNITS: readonly DeepUnit[] = [ZALZALAH_ONE, ZALZALAH_TWO];
