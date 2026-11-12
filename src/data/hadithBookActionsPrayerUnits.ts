import { hadith, type DeepUnit } from "./deepKit";

// One more book for the Bukhari and Muslim topic: al-Bukhari's Book of Actions in Prayer (Kitab al-'Amal fis-Salah).
// A salam not answered during the prayer, the order to keep silent, smoothing the ground only once, Jabir's greeting,
// hands kept off the hips, and Abu Hurairah who knew the surah of Isha. Every card is one sahih hadith of that book
// (number as sunnah.com gives it) with its exact English words to highlight, and none of them is taught anywhere else
// in the app. No card asks how a salam is answered while praying, as the schools take that differently, or how many
// times Jabir greeted him ﷺ, as the narrations differ.

const ACTIONS: DeepUnit = {
  key: "book-amal-salah",
  topicId: "sahihayn",
  branchId: "hadith-book-amal-salah",
  branch: { title: "The Book of Actions in Prayer", description: "From al-Bukhari's Book of Actions in Prayer: busy with the prayer, keeping silent, smoothing the ground once, a greeting not returned, hands off the hips, and the surah of Isha." },
  name: "the Book of Actions in Prayer",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "busy-with-the-prayer",
      title: "Busy with the prayer",
      line: "In the prayer, one is busy with something greater.",
      facts: ["Told by Abdullah ibn Mas'ud", "An-Najashi: the ruler of Ethiopia", "Salam: the greeting of peace"],
      source: hadith("bukhari", "1199", "Abdullah ibn Mas'ud", "Sahih", "Abdullah ibn Mas'ud said: we used to greet the Prophet ﷺ while he was praying, and he used to answer our greetings. When we came back from An-Najashi, the ruler of Ethiopia, we greeted him, but he did not answer us. After the prayer he said: in the prayer one is occupied with a more serious matter.", "we greeted him, but he did not answer us"),
      difficulty: 3,
      questions: [
        { q: "Why did he ﷺ not answer their salam in the prayer?", a: "The prayer keeps one busy", wrong: ["He did not hear them", "The masjid was too loud", "They spoke too softly"], why: "In the prayer one is occupied with a more serious matter, he ﷺ said after praying." },
        { q: "Who was An-Najashi, whom they came back from?", a: "The ruler of Ethiopia", wrong: ["The ruler of Persia", "A trader of Makkah", "A poet of Madinah"], why: "They came back from An-Najashi, the ruler of Ethiopia, Ibn Mas'ud said." },
        { q: "In the early days, he ﷺ would answer a salam during the prayer.", tf: true, why: "We used to greet him while he was praying, and he used to answer, Ibn Mas'ud said." }
      ]
    },
    {
      slug: "silence-in-the-prayer",
      title: "Silence in the prayer",
      line: "When 2:238 came down, they kept silent in prayer.",
      facts: ["Told by Zayd ibn Arqam", "Al-Baqarah 2:238: guard the prayers", "From then on, no talking in prayer"],
      source: hadith("bukhari", "1200", "Zayd ibn Arqam", "Sahih", "Zayd ibn Arqam said: in the lifetime of the Prophet ﷺ we used to speak while praying, and one of us would tell his needs to his companions, until the ayah came down: guard strictly the prayers, 2:238. After that we were ordered to remain silent while praying.", "we were ordered to remain silent while praying"),
      difficulty: 3,
      questions: [
        { q: "After 2:238 came down, what were they ordered to do in prayer?", a: "Remain silent", wrong: ["Speak softly", "Speak in turns", "Speak only to the imam"], why: "After that we were ordered to remain silent while praying, Zayd ibn Arqam said." },
        { q: "Which ayah did Zayd name for this order?", a: "Guard strictly the prayers", wrong: ["Read in the name of your Lord", "Seek help in patience and prayer", "Establish the prayer and give zakah"], why: "They used to speak while praying, until 2:238 came: guard strictly the prayers, Zayd said." },
        { q: "In the early days, one could tell his companions his needs in prayer.", tf: true, why: "One of us would tell his needs to his companions, until 2:238 came, Zayd said." }
      ]
    },
    {
      slug: "smoothing-the-ground-once",
      title: "Smoothing the ground once",
      line: "If you must smooth the ground for sujud, do it once.",
      facts: ["Told by Mu'ayqib", "Sujud: the forehead on the ground", "Once, and only if you must"],
      source: hadith("bukhari", "1207", "Mu'ayqib", "Sahih", "Mu'ayqib said: the Prophet ﷺ spoke about a man who levels the ground where he prostrates, and said: if you have to do so, then do it once.", "If you have to do so, then do it once"),
      difficulty: 3,
      questions: [
        { q: "If you must smooth the ground in sujud, how often?", a: "Once", wrong: ["Twice", "Three times", "Every time"], why: "If you have to do so, then do it once, he ﷺ said." },
        { q: "What was the man doing where he prostrated?", a: "Leveling the ground", wrong: ["Sweeping the masjid", "Spreading a mat", "Washing the floor"], why: "He ﷺ spoke of a man leveling the earth where he prostrated, Mu'ayqib said." },
        { q: "Smoothing the ground many times in sujud is the sunnah.", tf: false, why: "No. If you have to smooth the ground, then do it once, he ﷺ said." }
      ]
    },
    {
      slug: "a-greeting-not-returned",
      title: "A greeting not returned",
      line: "The prayer kept him ﷺ from answering Jabir's salam.",
      facts: ["Told by Jabir ibn Abdullah", "Jabir came back from an errand", "He ﷺ explained after praying"],
      source: hadith("bukhari", "1217", "Jabir ibn Abdullah", "Sahih", "Jabir ibn Abdullah said: the Messenger of Allah ﷺ sent me on an errand. When I had finished it, I came back to the Prophet ﷺ and greeted him, but he did not return my greeting, and I felt so sorry that only Allah knows it. Then he returned the greeting and said: the thing which prevented me from returning the greeting was that I was praying.", "The thing which prevented me from returning the greeting was that I was praying"),
      difficulty: 3,
      questions: [
        { q: "Why did he ﷺ not return Jabir's greeting at first?", a: "He was praying", wrong: ["He did not hear it", "He was asleep", "He was too far off"], why: "What kept me from returning the greeting was that I was praying, he ﷺ told Jabir." },
        { q: "How did Jabir feel when no answer came?", a: "Very sorry", wrong: ["Very glad", "Very hungry", "Very sleepy"], why: "I felt so sorry that only Allah knows it, Jabir said." },
        { q: "After the prayer, he ﷺ told Jabir why he had not answered.", tf: true, why: "He returned the greeting and explained that he had been praying, Jabir said." }
      ]
    },
    {
      slug: "hands-off-the-hips",
      title: "No hands on the hips",
      line: "Do not keep your hands on your hips in prayer.",
      facts: ["Told by Abu Hurairah", "From the Prophet ﷺ", "Khasr: hands on the hips"],
      source: hadith("bukhari", "1219", "Abu Hurairah", "Sahih", "Abu Hurairah said: it was forbidden to keep the hands on the hips during the prayer. Abu Hurairah narrated this from the Prophet ﷺ.", "It was forbidden to keep the hands on the hips during the prayer"),
      difficulty: 3,
      questions: [
        { q: "What was forbidden during the prayer?", a: "Hands on the hips", wrong: ["Facing the qiblah", "Hands raised at the first takbir", "Forehead on the ground in sujud"], why: "Keeping the hands on the hips during the prayer was forbidden, Abu Hurairah said." },
        { q: "From whom did Abu Hurairah narrate this?", a: "The Prophet ﷺ", wrong: ["Umar ibn al-Khattab", "Abu Bakr as-Siddiq", "Ubayy ibn Ka'b"], why: "Abu Hurairah narrated it from the Prophet ﷺ, al-Bukhari writes." },
        { q: "Standing with hands on the hips is a good way to pray.", tf: false, why: "No. Keeping the hands on the hips during the prayer was forbidden, Abu Hurairah said." }
      ]
    },
    {
      slug: "which-surah-was-it",
      title: "Which surah was it?",
      line: "Abu Hurairah remembered which surah was recited in Isha.",
      facts: ["Told by Abu Hurairah", "Isha: the night prayer", "He listened with care"],
      source: hadith("bukhari", "1223", "Abu Hurairah", "Sahih", "Abu Hurairah said: people say that I narrate too many hadith of the Prophet ﷺ. Once I met a man and asked him: which surah did the Messenger of Allah ﷺ recite yesterday in the Isha prayer? He said: I do not know. I said: did you not attend the prayer? He said: yes. I said: I know. He recited such and such surah.", "I know. He recited such and such Sura"),
      difficulty: 3,
      questions: [
        { q: "What did Abu Hurairah ask the man about?", a: "The surah recited in Isha", wrong: ["The time of Isha", "The way to the masjid", "The number of rak'ahs"], why: "Which surah did he ﷺ recite yesterday in Isha? Abu Hurairah asked the man." },
        { q: "What did the man answer?", a: "I do not know", wrong: ["I was not there", "I was traveling", "I was at home"], why: "The man had attended the prayer, yet he said he did not know, Abu Hurairah said." },
        { q: "Abu Hurairah knew which surah was recited in that Isha.", tf: true, why: "I know, he recited such and such surah, Abu Hurairah told the man." }
      ]
    }
  ]
};

export const HADITH_BOOK_ACTIONS_PRAYER_UNITS: DeepUnit[] = [ACTIONS];
