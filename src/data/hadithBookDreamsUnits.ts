import { hadith, type DeepUnit } from "./deepKit";

// One more book for the Bukhari and Muslim topic: al-Bukhari's Book of Dreams (Kitab at-Ta'bir). The worst lie, two
// golden bangles blown away, a land of date palms that was Madinah, Aishah shown to him ﷺ in a dream, the keys of the
// earth's treasures, and a believer's dreams near the Last Day. Every card is one sahih hadith of that book (number as
// sunnah.com gives it) with its exact English words to highlight, and none of them is taught anywhere else in the app.
// No card asks how many parts of prophethood a good dream is, as the narrations give different numbers, and the dreams
// of the milk, the well and Umar's palace are left out, as the app teaches them under other numbers.

const DREAMS: DeepUnit = {
  key: "book-tabir",
  topicId: "sahihayn",
  branchId: "hadith-book-tabir",
  branch: { title: "The Book of Dreams", description: "From al-Bukhari's Book of Dreams: the worst lie, two golden bangles, a land of palm trees, Aishah shown in a dream, keys of treasure, and dreams that come true." },
  name: "the Book of Dreams",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "a-dream-never-seen",
      title: "A dream never seen",
      line: "Claiming a dream you never saw is the worst lie.",
      facts: ["Told by Abdullah ibn Umar", "Ru'ya: a dream", "Tell only the dreams you truly saw"],
      source: hadith("bukhari", "7043", "Abdullah ibn Umar", "Sahih", "Abdullah ibn Umar said: the Messenger of Allah ﷺ said: the worst lie is that a person claims to have seen a dream which he has not seen.", "The worst lie is that a person claims to have seen a dream which he has not seen"),
      difficulty: 3,
      questions: [
        { q: "What is the worst lie, he ﷺ said?", a: "Claiming a dream not seen", wrong: ["Forgetting a dream", "Telling a true dream", "Sleeping late"], why: "A person claims a dream he has not seen; that is the worst lie, he ﷺ said." },
        { q: "A boy makes up a dream to impress his friends. What is that?", a: "The worst lie", wrong: ["A small mistake", "A funny joke", "A good story"], why: "He did not see it; claiming such a dream is the worst lie, Ibn Umar heard him ﷺ say." },
        { q: "Making up a dream to tell people is fine.", tf: false, why: "No. Claiming a dream you have not seen is the worst lie, he ﷺ said." }
      ]
    },
    {
      slug: "two-golden-bangles",
      title: "Two golden bangles",
      line: "He ﷺ dreamt of two gold bangles and blew them away.",
      facts: ["Told by Abdullah ibn Abbas", "Bangles: bracelets worn on the arm", "The two liars: al-Ansi and Musaylimah"],
      source: hadith("bukhari", "7034", "Abdullah ibn Abbas", "Sahih", "Abdullah ibn Abbas said: the Messenger of Allah ﷺ said: while I was sleeping, two golden bangles were put in my two hands, and I disliked them. I was given permission to blow them off, and they flew away. I took them to mean two liars who will appear. Ubaydullah said: one of them was al-Ansi in Yemen, and the other was Musaylimah.", "two golden bangles were put in my two hands"),
      difficulty: 3,
      questions: [
        { q: "What was put in his ﷺ hands in the dream?", a: "Two golden bangles", wrong: ["Two silver rings", "Two green leaves", "Two white birds"], why: "While I was sleeping, two golden bangles were put in my two hands, he ﷺ said." },
        { q: "What did he ﷺ take the two bangles to mean?", a: "Two liars who would appear", wrong: ["Two kings who would believe", "Two rains that would come", "Two cities that would be built"], why: "I interpret it as a symbol of two liars who will appear, he ﷺ said; they were al-Ansi and Musaylimah." },
        { q: "He ﷺ blew on the bangles, and they flew away.", tf: true, why: "He ﷺ was allowed to blow them off, and they flew away, Ibn Abbas said." }
      ]
    },
    {
      slug: "a-land-of-palm-trees",
      title: "A land of palm trees",
      line: "He ﷺ dreamt he moved to a land of palms: it was Madinah.",
      facts: ["Told by Abu Musa al-Ash'ari", "Yathrib: the old name of Madinah", "He ﷺ first thought of al-Yamamah or Hajar"],
      source: hadith("bukhari", "7035", "Abu Musa al-Ash'ari", "Sahih", "Abu Musa al-Ash'ari said: the Prophet ﷺ said: I saw in a dream that I was migrating from Makkah to a land where there were date palm trees. I thought it might be al-Yamamah or Hajar, but it turned out to be Yathrib, that is Madinah.", "I was migrating from Mecca to a land where there were date palm trees"),
      difficulty: 3,
      questions: [
        { q: "What kind of land did he ﷺ see himself migrating to?", a: "A land of date palms", wrong: ["A land of snow", "A land of rivers", "A land of lakes"], why: "In the dream he ﷺ was migrating from Makkah; the land ahead had date palm trees." },
        { q: "Which city did that land turn out to be?", a: "Madinah", wrong: ["Al-Yamamah", "Taif", "Jerusalem"], why: "He ﷺ thought it might be al-Yamamah or Hajar, but it turned out to be Yathrib, Madinah." },
        { q: "He ﷺ first thought the land might be al-Yamamah.", tf: true, why: "I thought that it might be the land of al-Yamamah or Hajar, he ﷺ said; it was Yathrib." }
      ]
    },
    {
      slug: "aishah-shown-in-a-dream",
      title: "Aishah shown in a dream",
      line: "Aishah was shown to him ﷺ twice in a dream.",
      facts: ["Told by Aishah", "She was carried in a piece of silk", "Mother of the Believers"],
      source: hadith("bukhari", "7011", "Aishah", "Sahih", "Aishah said: the Messenger of Allah ﷺ said to me: you were shown to me twice in a dream. A man was carrying you in a piece of silk and said to me: she is your wife. And it was you. I said to myself: if this is from Allah, then it must happen.", "If this is from Allah, then it must happen"),
      difficulty: 3,
      questions: [
        { q: "How many times was Aishah shown to him ﷺ in a dream?", a: "Twice", wrong: ["Once", "Three times", "Seven times"], why: "You were shown to me twice in my dream, he ﷺ told Aishah." },
        { q: "In what was she carried in the dream?", a: "A piece of silk", wrong: ["A woolen blanket", "A cotton sheet", "A leather mat"], why: "A man was carrying you in a silken piece of cloth, he ﷺ told her." },
        { q: "He ﷺ said: if this is from Allah, it will surely happen.", tf: true, why: "If this is from Allah, then it must happen, he ﷺ said to himself, and it did." }
      ]
    },
    {
      slug: "keys-of-the-treasures",
      title: "Keys of the treasures",
      line: "In a dream, he ﷺ was given the keys to earth's treasures.",
      facts: ["Told by Abu Hurairah", "Jawami' al-Kalim: few words, wide meaning", "Put in his ﷺ hand while he slept"],
      source: hadith("bukhari", "7013", "Abu Hurairah", "Sahih", "Abu Hurairah said: I heard the Messenger of Allah ﷺ say: I have been sent with Jawami' al-Kalim, the shortest words carrying the widest meanings, and I was made victorious with awe; and while I was sleeping, the keys of the treasures of the earth were brought to me and put in my hand.", "while I was sleeping, the keys of the treasures of the earth were brought to me"),
      difficulty: 3,
      questions: [
        { q: "What was brought to him ﷺ while he slept?", a: "The keys of earth's treasures", wrong: ["A crown of gold", "A large lamp", "A white flag"], why: "The keys of the earth's treasures were brought to him ﷺ; they were put in his hand." },
        { q: "What are Jawami' al-Kalim, which he ﷺ was sent with?", a: "Short words with wide meanings", wrong: ["Long books of stories", "Songs of the Arabs", "Poems about kings"], why: "Jawami' al-Kalim are the shortest words that carry the widest meanings; he ﷺ was sent with them." },
        { q: "Jawami' al-Kalim are long speeches with little meaning.", tf: false, why: "No. Jawami' al-Kalim are few words that carry wide meanings, al-Bukhari explains." }
      ]
    },
    {
      slug: "dreams-that-come-true",
      title: "Dreams near the end",
      line: "Near the Last Day, a believer's dreams will rarely be false.",
      facts: ["Told by Abu Hurairah", "A believer's dream: a part of prophethood", "What is of prophethood is never false"],
      source: hadith("bukhari", "7017", "Abu Hurairah", "Sahih", "Abu Hurairah said: the Messenger of Allah ﷺ said: when the Day of Resurrection draws near, the dreams of a believer will hardly fail to come true, and a believer's dream is a part of prophethood, and whatever belongs to prophethood can never be false.", "the dreams of a believer will hardly fail to come true"),
      difficulty: 3,
      questions: [
        { q: "When will a believer's dreams hardly fail to come true?", a: "As the Last Day draws near", wrong: ["Only on Fridays", "Only in Ramadan", "Only on journeys"], why: "As the Day of Resurrection approaches, a believer's dreams will hardly fail to come true." },
        { q: "What did he ﷺ say can never be false?", a: "What belongs to prophethood", wrong: ["Every dream we see", "What people say", "What poets write"], why: "A believer's dream is a part of prophethood, which can never be false, he ﷺ said." },
        { q: "Near the Last Day, a believer's dreams will often be false.", tf: false, why: "No. As the Day draws near, a believer's dreams will hardly fail to come true, he ﷺ said." }
      ]
    }
  ]
};

export const HADITH_BOOK_DREAMS_UNITS: DeepUnit[] = [DREAMS];
