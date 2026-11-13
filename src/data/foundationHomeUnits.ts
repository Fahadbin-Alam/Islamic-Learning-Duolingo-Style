import { hadith, type DeepUnit } from "./deepKit";

// One more Foundations unit: sunnahs of the home, from Sahih al-Bukhari, Sunan Abi Dawud and Jami at-Tirmidhi. Praying
// where the host likes in his house, the salam before "come in", a pillow at home, the host's seat of honor, three
// things not to refuse, and the afternoon nap after Jumu'ah. Every card is one sahih or hasan hadith with its
// number, narrator and grade, and its exact English words to highlight. Points the schools differ on (such as the time
// of Jumu'ah) are left out, and none of these hadith is taught anywhere else in the app.

const HOME: DeepUnit = {
  key: "found-sunnahs-of-the-home",
  topicId: "foundation",
  branchId: "foundation-sunnahs-of-the-home",
  branch: { title: "Sunnahs of the home", description: "Praying where the host likes, the salam before coming in, a pillow at home, the host's own seat, three things not to refuse, and the nap after Jumu'ah." },
  name: "sunnahs of the home",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "where-the-host-likes",
      title: "Where the host likes",
      line: "In Itban's house he ﷺ asked where Itban liked him to pray.",
      facts: ["Told by Itban ibn Malik al-Ansari", "He ﷺ asked permission to come in", "They lined up behind him ﷺ to pray"],
      source: hadith("bukhari", "686", "Itban ibn Malik al-Ansari", "Sahih", "Itban ibn Malik al-Ansari said: the Prophet ﷺ came to my house and asked permission to come in, and I let him in. He asked: where would you like me to pray in your house? I pointed to a place that I liked. He stood up to pray, we lined up behind him, and he ended the prayer with the taslim, and so did we.", "I pointed to a place which I liked"),
      difficulty: 1,
      questions: [
        { q: "What did he ﷺ ask Itban inside the house?", a: "Where Itban liked him to pray", wrong: ["Where the well of the house was", "Who had built the house", "How old the house was"], why: "Where do you like me to pray in your house? he ﷺ asked, and Itban pointed to a place." },
        { q: "How did Itban and his people pray with him ﷺ?", a: "In a row behind him", wrong: ["Each one alone at home", "In the street outside", "One after another, alone"], why: "He stood up for prayer and we aligned behind him, Itban said." },
        { q: "He ﷺ asked permission before coming into Itban's house.", tf: true, why: "He asked permission for entering and I allowed him, Itban ibn Malik said." }
      ]
    },
    {
      slug: "the-whole-of-you",
      title: "The whole of you",
      line: "Awf asked: the whole of me? He ﷺ said: the whole of you.",
      facts: ["Told by Awf ibn Malik al-Ashja'i", "It was on the journey to Tabuk", "He ﷺ was in a small tent of skin"],
      source: hadith("abudawud", "5000", "Awf ibn Malik al-Ashja'i", "Sahih (Al-Albani)", "Awf ibn Malik al-Ashja'i said: I came to the Messenger of Allah ﷺ on the expedition to Tabuk while he was in a small tent of skin. I gave him the salam, and he returned it and said: come in. I said: the whole of me, Messenger of Allah? He said: the whole of you. So I went in.", "I gave him a salutation and he returned it"),
      difficulty: 1,
      questions: [
        { q: "What did Awf do first at the tent?", a: "He gave the salam", wrong: ["He asked for water", "He recited a poem", "He sat down outside"], why: "I gave him a salutation and he returned it, saying: come in, Awf said." },
        { q: "What did he ﷺ answer when Awf asked: the whole of me?", a: "The whole of you", wrong: ["Only your head", "Just your hand", "Half of you"], why: "He replied: the whole of you. So I entered, Awf said of the small tent at Tabuk." },
        { q: "The tent he ﷺ was in at Tabuk was small.", tf: true, why: "He was in a small skin tent at the expedition to Tabuk, Awf ibn Malik said." }
      ]
    },
    {
      slug: "a-pillow-at-home",
      title: "A pillow at home",
      line: "Jabir ibn Samurah saw him ﷺ at home, leaning on a pillow.",
      facts: ["Told by Jabir ibn Samurah", "He ﷺ was in his own house", "He was sitting and leaning back"],
      source: hadith("abudawud", "4143", "Jabir ibn Samurah", "Sahih (Al-Albani)", "Jabir ibn Samurah said: when I came to the Prophet ﷺ in his house, I saw him sitting, leaning on a pillow.", "I saw him sitting reclining on a pillow"),
      difficulty: 1,
      questions: [
        { q: "What was he ﷺ leaning on in his house?", a: "A pillow", wrong: ["A pile of stones", "A stack of bricks", "A clay jar"], why: "I saw him sitting reclining on a pillow, Jabir ibn Samurah said." },
        { q: "Where did Jabir ibn Samurah find him ﷺ?", a: "In his house", wrong: ["In the market", "At the well", "On the road"], why: "When I came to the Prophet ﷺ in his house, I saw him reclining, Jabir said." },
        { q: "Jabir saw him ﷺ at home, sitting and leaning on a pillow.", tf: true, why: "I saw him sitting reclining on a pillow, Jabir ibn Samurah said of his house." }
      ]
    },
    {
      slug: "the-hosts-own-seat",
      title: "The host's own seat",
      line: "Do not sit in a man's seat of honor without his leave.",
      facts: ["Told by Abu Mas'ud", "Seat of honor: the host's own place at home", "Ask before you sit in it"],
      source: hadith("tirmidhi", "2772", "Abu Mas'ud", "Sahih (Darussalam)", "Abu Mas'ud said: the Messenger of Allah ﷺ said: a man is not to be led in his own place of authority, and his seat of honor in his house is not to be sat in without his permission.", "his seat of honor in his house is not sat in without his permission"),
      difficulty: 2,
      questions: [
        { q: "Where should a guest not sit without the host's leave?", a: "In his seat of honor", wrong: ["In the shade outside", "On a mat by the door", "On the floor"], why: "His seat of honor in his house is not sat in without his permission, he ﷺ said." },
        { q: "Whose permission is needed to sit in that seat?", a: "The man of the house", wrong: ["The oldest guest", "The first guest to come", "The next neighbor"], why: "Not sat in without his permission, he ﷺ said of the seat of honor in his house." },
        { q: "A guest may take the host's seat of honor without asking.", tf: false, why: "No. His seat of honor in his house is not sat in without his permission." }
      ]
    },
    {
      slug: "three-not-to-refuse",
      title: "Three not to refuse",
      line: "Three things are not refused: cushions, oil and milk.",
      facts: ["Told by Abdullah ibn Umar", "Duhn: oil, explained as fragrance", "In a chapter on not refusing perfume"],
      source: hadith("tirmidhi", "2790", "Abdullah ibn Umar", "Hasan (Darussalam)", "Ibn Umar said: the Messenger of Allah ﷺ said: there are three things that are not refused: cushions, oil (fragrance), and milk.", "There are three that are not refused"),
      difficulty: 1,
      questions: [
        { q: "Which of these is one of the three not to refuse?", a: "Milk", wrong: ["Dates", "Bread", "Honey"], why: "There are three that are not refused: cushions, oils and milk, he ﷺ said." },
        { q: "Duhn, one of the three, is explained as what?", a: "Fragrance", wrong: ["Woolen cloth", "Sweet water", "Clay pots"], why: "Duhn is oil, and the translation explains it as fragrance; it is one of the three." },
        { q: "Cushions are one of the three things not to refuse.", tf: true, why: "There are three that are not refused: cushions, oils and milk, he ﷺ said." }
      ]
    },
    {
      slug: "a-nap-after-jumuah",
      title: "A nap after Jumu'ah",
      line: "After the Jumu'ah prayer they would take an afternoon nap.",
      facts: ["Told by Anas ibn Malik", "A short rest in the middle of the day", "Bukhari's chapter: the nap after Jumu'ah"],
      source: hadith("bukhari", "940", "Anas ibn Malik", "Sahih", "Anas said: we used to pray the Jumu'ah early and then take the afternoon nap.", "We used to offer the Jumua prayer early and then have the afternoon nap"),
      difficulty: 1,
      questions: [
        { q: "What did they do after the Jumu'ah prayer?", a: "Took an afternoon nap", wrong: ["Walked to the next town", "Went out to hunt", "Climbed the hills"], why: "We used to offer the Jumua prayer early and then have the afternoon nap, Anas said." },
        { q: "Which prayer came just before the nap?", a: "The Jumu'ah prayer", wrong: ["The night prayer", "The dawn prayer", "The Eid prayer"], why: "Then have the afternoon nap, Anas said, after they had offered the Jumua prayer." },
        { q: "Anas said they took the afternoon nap after Jumu'ah.", tf: true, why: "We used to offer the Jumua prayer early and then have the afternoon nap, Anas said." }
      ]
    }
  ]
};

export const FOUNDATION_HOME_UNITS: readonly DeepUnit[] = [HOME];
