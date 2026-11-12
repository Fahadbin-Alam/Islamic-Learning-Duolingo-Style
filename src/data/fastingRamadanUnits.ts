import { hadith, type DeepUnit } from "./deepKit";

// One more Fasting unit: making the most of Ramadan, from Sunan an-Nasa'i, Sunan Abi Dawud, Sahih al-Bukhari and Jami
// at-Tirmidhi. Getting ready in Sha'ban, the caller every night of Ramadan, nothing like fasting, praying with the
// imam until he finishes, twenty days of i'tikaf in his ﷺ last year, and not letting Ramadan pass without being
// forgiven. Every card is one sahih or hasan hadith with its number, narrator and grade, and its exact English words
// to highlight. Points the schools differ on (how many rak'ahs, praying at home or in the masjid) are left out, and
// none of these hadith is taught anywhere else in the app.

const RAMADAN: DeepUnit = {
  key: "fasting-making-the-most-of-ramadan",
  topicId: "fasting",
  branchId: "fasting-making-the-most-of-ramadan",
  branch: { title: "Making the most of Ramadan", description: "Getting ready in Sha'ban, a caller every night, nothing like fasting, praying with the imam, his last i'tikaf, and not letting Ramadan pass by." },
  name: "making the most of Ramadan",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "getting-ready-in-shaban",
      title: "Getting ready in Sha'ban",
      line: "He ﷺ fasted much in Sha'ban, a month people forget.",
      facts: ["Told by Usamah ibn Zayd", "Sha'ban comes between Rajab and Ramadan", "Deeds are taken up to Allah in it"],
      source: hadith("nasai", "2357", "Usamah ibn Zayd", "Hasan (Al-Albani)", "Usamah ibn Zayd said: I said: O Messenger of Allah, I do not see you fast in any month as much as in Sha'ban. He ﷺ said: that is a month people pay little attention to, between Rajab and Ramadan. It is a month in which deeds are taken up to the Lord of the worlds, and I love for my deeds to be taken up while I am fasting.", "It is a month in which the deeds are taken up to the Lord of the worlds, and I like that my deeds be taken up when I am fasting"),
      difficulty: 2,
      questions: [
        { q: "Which month comes between Rajab and Ramadan?", a: "Sha'ban", wrong: ["Shawwal", "Muharram", "Safar"], why: "That is a month people pay little attention to, between Rajab and Ramadan, he ﷺ said." },
        { q: "Why did he ﷺ love to fast in Sha'ban?", a: "Deeds are taken up to Allah then", wrong: ["The days are short and cool", "The dates are ripe then", "Rain falls a lot then"], why: "Deeds are taken up to the Lord of the worlds in it; I love to be fasting then, he ﷺ said." },
        { q: "People often pay little attention to Sha'ban.", tf: true, why: "That is a month to which people do not pay much attention, he ﷺ said of Sha'ban." }
      ]
    },
    {
      slug: "a-caller-every-night",
      title: "A caller every night",
      line: "Each Ramadan night a caller says: doer of good, come forward.",
      facts: ["Told by Utbah ibn Farqad", "In Ramadan the gates of Paradise open", "The doer of evil is told: stop"],
      source: hadith("nasai", "2107", "Utbah ibn Farqad", "Sahih (Al-Albani)", "Arfajah said: we visited Utbah ibn Farqad and talked about Ramadan. He said: I heard the Messenger of Allah ﷺ say: in it the gates of Paradise are opened, the gates of the Fire are closed, the devils are chained up, and a caller calls out every night: O doer of good, come forward; O doer of evil, stop.", "a caller calls out every night: O doer of good, proceed; O doer of evil, desist"),
      difficulty: 2,
      questions: [
        { q: "What does the caller say to the doer of good?", a: "Come forward", wrong: ["Keep silent", "Slow down", "Go back home"], why: "O doer of good, proceed; O doer of evil, desist, a caller calls out every night." },
        { q: "How often does the caller call out in Ramadan?", a: "Every night", wrong: ["Once a year", "Only on Fridays", "Only on the last night"], why: "A caller calls out every night of it, he ﷺ said of Ramadan." },
        { q: "The caller calls only on the first night of Ramadan.", tf: false, why: "No. A caller calls out every night of it, he ﷺ said of Ramadan." }
      ]
    },
    {
      slug: "nothing-like-fasting",
      title: "Nothing like fasting",
      line: "He ﷺ told Abu Umamah: take to fasting, nothing is like it.",
      facts: ["Told by Abu Umamah al-Bahili", "He asked for one thing to take from him ﷺ", "Fasting: leaving food and drink for Allah"],
      source: hadith("nasai", "2220", "Abu Umamah al-Bahili", "Sahih (Al-Albani)", "Abu Umamah said: I came to the Messenger of Allah ﷺ and said: tell me something I may take from you. He ﷺ said: take to fasting, for there is nothing like it.", "Take to fasting, for there is nothing like it"),
      difficulty: 1,
      questions: [
        { q: "What did he ﷺ tell Abu Umamah to take to?", a: "Fasting", wrong: ["Trade", "Travelling", "Poetry"], why: "Take to fasting, for there is nothing like it, he ﷺ told Abu Umamah." },
        { q: "What is like fasting, he ﷺ told Abu Umamah?", a: "Nothing at all", wrong: ["A long journey", "A day of trade", "A big feast"], why: "Take to fasting, for there is nothing like it, he ﷺ said." },
        { q: "Abu Umamah asked him ﷺ for something to take and keep.", tf: true, why: "Tell me something I may take from you, Abu Umamah asked, and he ﷺ said: fasting." }
      ]
    },
    {
      slug: "with-the-imam-to-the-end",
      title: "With the imam to the end",
      line: "Stay with the imam to the end: a whole night of prayer.",
      facts: ["Told by Abu Dharr", "He ﷺ led them on some of the last nights", "He ﷺ called his family to pray too"],
      source: hadith("abudawud", "1375", "Abu Dharr", "Sahih (Al-Albani)", "Abu Dharr said: we fasted Ramadan with the Messenger of Allah ﷺ. He did not lead us in the night prayer until seven nights were left; then he led us until a third of the night had passed. When five nights were left, he led us until half the night had passed. I said: O Messenger of Allah, if only you had led us the whole night. He ﷺ said: when a man prays with the imam until he leaves, it is counted as a whole night of prayer for him. When three nights were left, he gathered his family, his wives and the people, and prayed with us until we feared we would miss the falah, the meal before dawn.", "When a man prays with an imam till he goes he is reckoned as having spent a whole night in prayer"),
      difficulty: 2,
      questions: [
        { q: "Until when should you stay with the imam, he ﷺ said?", a: "Until he finishes", wrong: ["Until the first rak'ah ends", "Until half the prayer", "Until you feel tired"], why: "When a man prays with an imam till he goes, it counts as a whole night, he ﷺ said." },
        { q: "What did they fear missing on that last night?", a: "The suhur meal", wrong: ["The Eid prayer", "The new moon", "The adhan of Isha"], why: "He prayed with us until we feared we would miss the falah, the meal before dawn." },
        { q: "He ﷺ called his family to pray with the people too.", tf: true, why: "He gathered his family, his wives and the people and prayed with us, Abu Dharr said." }
      ]
    },
    {
      slug: "twenty-days-in-his-last-year",
      title: "Twenty days in his last year",
      line: "In his last Ramadan, he ﷺ stayed in i'tikaf for twenty days.",
      facts: ["Told by Abu Hurairah", "I'tikaf: he ﷺ stayed in the masjid to worship", "In the years before, he ﷺ stayed ten days"],
      source: hadith("bukhari", "2044", "Abu Hurairah", "Sahih", "Abu Hurairah said: the Prophet ﷺ used to stay in i'tikaf for ten days every year in Ramadan, and in the year he died, he stayed in i'tikaf for twenty days.", "every year in the month of Ramadan for ten days, and when it was the year of his death"),
      difficulty: 1,
      questions: [
        { q: "How many days of i'tikaf did he ﷺ keep each year?", a: "Ten days", wrong: ["Three days", "Five days", "Seven days"], why: "He used to stay in i'tikaf every year in Ramadan for ten days, Abu Hurairah said." },
        { q: "How long was his ﷺ i'tikaf in the year he died?", a: "Twenty days", wrong: ["Ten days", "Five days", "Seven days"], why: "In the year of his death, he stayed in i'tikaf for twenty days, Abu Hurairah said." },
        { q: "He ﷺ did more i'tikaf in his last Ramadan.", tf: true, why: "He stayed twenty days in the year he died, not ten, Abu Hurairah said." }
      ]
    },
    {
      slug: "do-not-let-it-pass",
      title: "Do not let it pass",
      line: "Do not let Ramadan pass without being forgiven.",
      facts: ["Told by Abu Hurairah", "In the same hadith: send salat on him ﷺ", "And be good to your parents in their old age"],
      source: hadith("tirmidhi", "3545", "Abu Hurairah", "Hasan Sahih (Al-Albani)", "Abu Hurairah said: the Messenger of Allah ﷺ said: may the man be humbled before whom I am mentioned and who does not send salat upon me; may the man be humbled whom Ramadan comes to and leaves before he is forgiven; and may the man be humbled whose parents reach old age with him and do not bring him into Paradise.", "And may a man upon whom Ramadan enters and then passes, before he is forgiven, be humiliated"),
      difficulty: 2,
      questions: [
        { q: "Which month should not pass before we are forgiven?", a: "Ramadan", wrong: ["Shawwal", "Safar", "Rajab"], why: "May a man be humbled whom Ramadan comes to and leaves before he is forgiven, he ﷺ said." },
        { q: "What should we do when his ﷺ name is mentioned?", a: "Send salat upon him", wrong: ["Say nothing at all", "Talk about the weather", "Change the subject"], why: "May the man be humbled before whom I am mentioned and who does not send salat upon me." },
        { q: "Ramadan is a time to seek Allah's forgiveness.", tf: true, why: "May he be humbled who sees Ramadan pass before he is forgiven, he ﷺ said." }
      ]
    }
  ]
};

export const FASTING_RAMADAN_UNITS: DeepUnit[] = [RAMADAN];
