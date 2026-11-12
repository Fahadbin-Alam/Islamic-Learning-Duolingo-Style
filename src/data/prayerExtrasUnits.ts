import { hadith, type DeepUnit } from "./deepKit";

// One more Prayer unit: little extras in salah, from Sunan Abi Dawud, Sunan Ibn Majah and Jami at-Tirmidhi. Soft
// shoulders in the row, forgiveness asked for the first row, a prayer worth fifty, four rak'ahs at the start of the
// day, the hour the gates of heaven open, and four before and after Zuhr. Every card is one sahih hadith with its
// number, narrator and grade, and its exact English words to highlight. None of these hadith is taught anywhere else
// in the app.

const EXTRAS: DeepUnit = {
  key: "prayer-little-extras",
  topicId: "prayer",
  branchId: "prayer-little-extras",
  branch: { title: "Little extras in salah", description: "Soft shoulders in the row, forgiveness for the first row, a prayer worth fifty, four at the start of the day, an hour heaven opens, and four around Zuhr." },
  name: "little extras in salah",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "soft-shoulders-in-the-row",
      title: "Soft shoulders in the row",
      line: "The best of you have soft shoulders in prayer, he ﷺ said.",
      facts: ["Told by Abdullah ibn Abbas", "Soft shoulders: easy to stand beside", "Make room when someone joins the row"],
      source: hadith("abudawud", "672", "Abdullah ibn Abbas", "Sahih (Al-Albani)", "Ibn Abbas said: the Prophet ﷺ said: the best of you are those whose shoulders are soft in prayer.", "The best of you are those whose shoulders are soft in prayer"),
      difficulty: 1,
      questions: [
        { q: "Who are the best of you in prayer, he ﷺ said?", a: "Those with soft shoulders", wrong: ["Those with loud voices", "Those with long sleeves", "Those with new clothes"], why: "Gentle shoulders that make room in the row are best in prayer, Ibn Abbas reported." },
        { q: "Where did he ﷺ say shoulders should be soft?", a: "In the prayer", wrong: ["In the market", "In the fields", "At the well"], why: "Soft in prayer, he said, as people stand shoulder to shoulder in the rows." },
        { q: "Being gentle and easy beside others in the row is good.", tf: true, why: "Soft shoulders means easy to stand beside, and he ﷺ called such people the best." }
      ]
    },
    {
      slug: "forgiveness-for-the-first-row",
      title: "Forgiveness for the first row",
      line: "He ﷺ asked forgiveness for the first row three times.",
      facts: ["Told by Al-Irbad ibn Sariyah", "Three times for the first row", "Fewer times for the second row"],
      source: hadith("ibnmajah", "996", "Al-Irbad ibn Sariyah", "Sahih (Al-Albani)", "Al-Irbad ibn Sariyah said: the Messenger of Allah ﷺ used to ask forgiveness for the first row three times, and for the second row twice.", "used to ask for forgiveness for the first row three times"),
      difficulty: 1,
      questions: [
        { q: "For which row did he ﷺ ask forgiveness three times?", a: "The first row", wrong: ["The last row", "The second row", "The middle row"], why: "He used to ask for forgiveness for the first row three times, Al-Irbad said." },
        { q: "Did he ﷺ ask forgiveness for the second row too?", a: "Yes, but fewer times", wrong: ["No, never", "Yes, ten times", "Yes, more times"], why: "He asked for the second row as well, but fewer times than for the first." },
        { q: "He ﷺ asked forgiveness for the first row more than the second.", tf: true, why: "Three times for the first row, and fewer for the second, Al-Irbad said." }
      ]
    },
    {
      slug: "a-prayer-worth-fifty",
      title: "A prayer worth fifty",
      line: "A prayer in the wild, done fully, equals fifty, he ﷺ said.",
      facts: ["Told by Abu Sa'id al-Khudri", "Prayed out in the wild, far from towns", "Bowing and prostration done perfectly"],
      source: hadith("abudawud", "560", "Abu Sa'id al-Khudri", "Sahih (Al-Albani)", "Abu Sa'id al-Khudri reported: prayer in congregation equals twenty-five prayers, and if one prays it out in the wild and does its bowing and prostrations perfectly, it equals fifty prayers.", "and performs its bowing and prostrations perfectly, it becomes equivalent to fifty prayers"),
      difficulty: 2,
      questions: [
        { q: "What does such a prayer equal, he ﷺ said?", a: "Fifty prayers", wrong: ["Five prayers", "Ten prayers", "Two prayers"], why: "Prayed in the wild with full bowing and prostration, it becomes equal to fifty prayers." },
        { q: "What must be done perfectly for this reward?", a: "The bowing and prostrations", wrong: ["The call to prayer", "The walk to it", "The clothes for it"], why: "If he performs its bowing and prostrations perfectly, it equals fifty, he ﷺ said." },
        { q: "Bowing and prostrating perfectly raises the reward of a prayer.", tf: true, why: "Done perfectly in the wild, one prayer becomes equal to fifty prayers, he ﷺ said." }
      ]
    },
    {
      slug: "four-at-the-start-of-the-day",
      title: "Four at the start of the day",
      line: "Four rak'ahs early in the day, and Allah supplies the rest.",
      facts: ["Told by Nu'aym ibn Hammar", "A hadith qudsi", "Do not be too weak to pray them"],
      source: hadith("abudawud", "1289", "Nu'aym ibn Hammar", "Sahih (Al-Albani)", "Nu'aym ibn Hammar heard the Messenger of Allah ﷺ say: Allah the Exalted says: son of Adam, do not fail to pray four rak'ahs for Me at the start of the day; I will supply what you need until its end.", "I will supply what you need till the end of it"),
      difficulty: 2,
      questions: [
        { q: "How many rak'ahs does Allah ask for at the start of the day?", a: "Four rak'ahs", wrong: ["Two rak'ahs", "Six rak'ahs", "Ten rak'ahs"], why: "Son of Adam, do not be helpless in performing four rak'ahs for Me, Allah says." },
        { q: "What does Allah promise for those four rak'ahs?", a: "To supply your needs that day", wrong: ["To give you gold that day", "To make you famous that day", "To bring you rain that day"], why: "I will supply what you need till the end of it, Allah says in the hadith qudsi." },
        { q: "Allah tells the son of Adam not to be too weak for these four rak'ahs.", tf: true, why: "Do not be helpless in performing four rak'ahs for Me at the beginning of the day." }
      ]
    },
    {
      slug: "when-heavens-gates-open",
      title: "When heaven's gates open",
      line: "He ﷺ prayed four after noon, when heaven's gates open.",
      facts: ["Told by Abdullah ibn as-Sa'ib", "Four rak'ahs after noon, before Zuhr", "He ﷺ loved a good deed to rise then"],
      source: hadith("tirmidhi", "478", "Abdullah ibn as-Sa'ib", "Sahih (Al-Albani)", "Abdullah ibn as-Sa'ib said: the Messenger of Allah ﷺ would pray four rak'ahs after the sun passed its height, before Zuhr. He said: it is an hour in which the gates of heaven are opened, and I love that a righteous deed of mine is raised up in it.", "It is an hour in which the gates of the heavens are opened, and I love that a righteous deed should be raised up for me in it"),
      difficulty: 2,
      questions: [
        { q: "What opens at that hour, he ﷺ said?", a: "The gates of heaven", wrong: ["The doors of the market", "The gates of the city", "The windows of the house"], why: "He ﷺ prayed four rak'ahs then, for the gates of the heavens are opened at that hour." },
        { q: "What did he ﷺ love to have raised up at that hour?", a: "A righteous deed", wrong: ["A loud call", "A new flag", "A tall building"], why: "The gates of the heavens open then, and he ﷺ loved a righteous deed of his to rise." },
        { q: "He ﷺ prayed four rak'ahs after noon, before Zuhr.", tf: true, why: "He would pray four after the Zawal of the sun, before Az-Zuhr, Abdullah said." }
      ]
    },
    {
      slug: "four-before-four-after",
      title: "Four before, four after",
      line: "Four before Zuhr and four after keep one from the Fire.",
      facts: ["Told by Umm Habibah", "A Mother of the Believers", "Allah makes the Fire forbidden for him"],
      source: hadith("tirmidhi", "427", "Umm Habibah", "Sahih (Al-Albani)", "Umm Habibah said: the Messenger of Allah ﷺ said: whoever prays four rak'ahs before Zuhr and four after it, Allah makes him forbidden for the Fire.", "Whoever prays four before Az-Zuhr and four after, Allah makes him prohibited for the Fire"),
      difficulty: 1,
      questions: [
        { q: "What does Allah do for one who prays four before and after Zuhr?", a: "Makes the Fire forbidden for him", wrong: ["Makes his wealth grow", "Makes his name famous", "Makes his body strong"], why: "Allah makes him prohibited for the Fire, Umm Habibah heard him ﷺ say." },
        { q: "How many rak'ahs in all does this promise take?", a: "Eight rak'ahs", wrong: ["Four rak'ahs", "Six rak'ahs", "Ten rak'ahs"], why: "Four before Az-Zuhr and four after make eight, and Allah keeps the Fire from him." },
        { q: "Umm Habibah, a Mother of the Believers, told of this promise.", tf: true, why: "Umm Habibah narrated it: whoever prays four before Az-Zuhr and four after." }
      ]
    }
  ]
};

export const PRAYER_EXTRAS_UNITS: readonly DeepUnit[] = [EXTRAS];
