import { hadith, type DeepUnit } from "./deepKit";

// One more Du'as unit: asking Allah well, from Sunan Abi Dawud, Jami at-Tirmidhi and Sunan Ibn Majah. Du'as that
// gather much good, a du'a for all that is good, three du'as that are answered, the time between the adhan and the
// iqamah, asking for pardon and well-being, and asking for knowledge that benefits. Every card is one sahih or
// hasan hadith with its number, narrator and grade, and its exact English words to highlight. Points the schools
// differ on are left out, and none of these hadith is taught anywhere else in the app.

const ASKING: DeepUnit = {
  key: "duas-asking-allah-well",
  topicId: "duas",
  branchId: "duas-asking-allah-well",
  branch: { title: "Asking Allah well", description: "Du'as that gather much good, asking for all that is good, three du'as that are answered, the wait for the iqamah, pardon and well-being, and useful knowledge." },
  name: "asking Allah well",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "duas-that-gather-good",
      title: "Du'as that gather much good",
      line: "He ﷺ loved du'as that say much good in few words.",
      facts: ["Told by Aishah", "Jawami' ad-du'a: du'as that gather much good", "He ﷺ left other kinds aside"],
      source: hadith("abudawud", "1482", "Aishah", "Sahih (Al-Albani)", "Aishah said: the Messenger of Allah ﷺ liked du'as that gather much good in few words, and he left other kinds aside.", "liked comprehensive supplication and abandoned other kinds"),
      difficulty: 1,
      questions: [
        { q: "Which du'as did he ﷺ like best?", a: "Ones that gather much good", wrong: ["Ones in rhyming words", "Ones shouted out loud", "Ones nobody understands"], why: "The Messenger of Allah ﷺ liked comprehensive supplication, Aishah said." },
        { q: "What did he ﷺ do with other kinds of du'a?", a: "He left them aside", wrong: ["He said them first", "He wrote them on walls", "He made them longer"], why: "He liked comprehensive supplication and abandoned other kinds, Aishah said." },
        { q: "A short du'a can hold a great deal of good.", tf: true, why: "He ﷺ liked du'as that are comprehensive, gathering much good in few words." }
      ]
    },
    {
      slug: "all-that-is-good",
      title: "Asking for all that is good",
      line: "He ﷺ taught Aishah to ask Allah for all that is good.",
      facts: ["Told by Aishah", "Good we know, and good we do not know", "Paradise, and every deed that brings near to it"],
      source: hadith("ibnmajah", "3846", "Aishah", "Sahih (Al-Albani)", "Aishah said: the Messenger of Allah ﷺ taught her this du'a: O Allah, I ask You for all that is good, in this world and in the Hereafter, what I know and what I do not know. O Allah, I seek refuge with You from all evil, in this world and in the Hereafter, what I know and what I do not know. O Allah, I ask You for the good that Your slave and Prophet asked You for, and I seek refuge with You from the evil he sought refuge from. O Allah, I ask You for Paradise and what brings one near to it, in word and deed, and I seek refuge with You from Hell and what brings one near to it, in word and deed. And I ask You to make every decree You decree for me good.", "O Allah, I ask You for all that is good, in this world and in the Hereafter, what I know and what I do not know"),
      difficulty: 2,
      questions: [
        { q: "What does the du'a ask Allah for first?", a: "Every kind of good", wrong: ["Gold and silver", "Fame among people", "A big house"], why: "O Allah, I ask You for all that is good, in this world and in the Hereafter." },
        { q: "Which good does the du'a ask for?", a: "What we know and do not know", wrong: ["Only what we can see", "Only what we have now", "Only what others have"], why: "All that is good, what I know and what I do not know, she was taught to say." },
        { q: "The du'a she was taught asks for Paradise too.", tf: true, why: "I ask You for Paradise and for that which brings one closer to it, in word and deed." }
      ]
    },
    {
      slug: "three-answered-duas",
      title: "Three du'as that are answered",
      line: "A father, a traveller and the wronged: Allah answers them.",
      facts: ["Told by Abu Hurairah", "There is no doubt about them", "A father, a traveller, and one who is wronged"],
      source: hadith("abudawud", "1536", "Abu Hurairah", "Hasan (Al-Albani)", "Abu Hurairah said: the Prophet ﷺ said: three du'as are answered, with no doubt about them: the du'a of a father, the du'a of a traveller, and the du'a of one who has been wronged.", "Three supplications are answered, there being no doubt about them"),
      difficulty: 1,
      questions: [
        { q: "Which three du'as are answered, with no doubt?", a: "A father, a traveller, the wronged", wrong: ["A king, a poet, a trader", "A guest, a tailor, a cook", "A rich man, a judge, a builder"], why: "That of a father, that of a traveller and that of one who has been wronged." },
        { q: "How sure is it that these du'as are answered?", a: "There is no doubt", wrong: ["Only now and then", "Hardly ever", "Only on Fridays"], why: "Three supplications are answered, there being no doubt about them, he ﷺ said." },
        { q: "When someone is wronged, Allah answers his du'a.", tf: true, why: "That of one who has been wronged is one of the three, the Prophet ﷺ said." }
      ]
    },
    {
      slug: "between-adhan-and-iqamah",
      title: "Between the adhan and iqamah",
      line: "A du'a between the adhan and the iqamah is not turned back.",
      facts: ["Told by Anas ibn Malik", "Adhan: the call to prayer", "Iqamah: the call as the prayer begins"],
      source: hadith("abudawud", "521", "Anas ibn Malik", "Sahih (Al-Albani)", "Anas ibn Malik said: the Prophet ﷺ said: a du'a made between the adhan and the iqamah is not turned back.", "The supplication made between the adhan and the iqamah is not rejected"),
      difficulty: 1,
      questions: [
        { q: "When is a du'a not turned back, he ﷺ said?", a: "Between adhan and iqamah", wrong: ["Only while eating", "Only at noon", "Only after Eid"], why: "The supplication made between the adhan and the iqamah is not rejected." },
        { q: "What is a good way to spend the wait for the iqamah?", a: "Making du'a", wrong: ["Chatting about the market", "Walking out of the masjid", "Playing with a phone"], why: "A du'a made between the adhan and the iqamah is not rejected, he ﷺ said." },
        { q: "The wait before the prayer starts is a good time for du'a.", tf: true, why: "The supplication made between the adhan and the iqamah is not rejected, Anas said." }
      ]
    },
    {
      slug: "pardon-and-well-being",
      title: "Nothing better than well-being",
      line: "Ask Allah for pardon and well-being, the best of gifts.",
      facts: ["Told by Rifa'ah ibn Rafi'", "Abu Bakr wept on the minbar", "Al-'afiyah: being kept safe and well"],
      source: hadith("tirmidhi", "3558", "Rifa'ah ibn Rafi', through his son Mu'adh", "Hasan Sahih (Al-Albani)", "Rifa'ah ibn Rafi' said: Abu Bakr stood on the minbar and wept, then said: the Messenger of Allah ﷺ stood on the minbar in the first year and wept, then said: ask Allah for pardon and well-being, for no one has been given anything better than well-being.", "Abu Bakr stood upon the Minbar, then wept, and said"),
      difficulty: 2,
      questions: [
        { q: "Where did Abu Bakr stand and weep?", a: "On the minbar", wrong: ["In the market", "On a hilltop", "At the city gate"], why: "Abu Bakr stood upon the Minbar, then wept, and said what he had heard." },
        { q: "What two things did he ﷺ tell us to ask Allah for?", a: "Pardon and well-being", wrong: ["Riches and fame", "Power over people", "Gold and silver"], why: "Ask Allah for pardon and Al-Afiyah, for none has been given better, he ﷺ said." },
        { q: "No one is given anything better than well-being.", tf: true, why: "None has been given anything better than Al-Afiyah, Abu Bakr heard him ﷺ say." }
      ]
    },
    {
      slug: "knowledge-that-benefits",
      title: "Knowledge that benefits",
      line: "Ask Allah for knowledge that brings real benefit.",
      facts: ["Told by Jabir ibn Abdullah", "Ask for knowledge that benefits", "Seek refuge from knowledge of no benefit"],
      source: hadith("ibnmajah", "3843", "Jabir ibn Abdullah", "Hasan (Al-Albani)", "Jabir said: the Messenger of Allah ﷺ said: ask Allah for beneficial knowledge, and seek refuge with Allah from knowledge that is of no benefit.", "Ask Allah for beneficial knowledge and seek refuge with Allah from knowledge that is of no benefit"),
      difficulty: 1,
      questions: [
        { q: "What kind of knowledge should we ask Allah for?", a: "Knowledge that benefits", wrong: ["Knowledge to show off", "Knowledge of magic", "Knowledge to win arguments"], why: "Ask Allah for beneficial knowledge, the Messenger of Allah ﷺ said." },
        { q: "What should we seek refuge with Allah from?", a: "Knowledge of no benefit", wrong: ["Learning the Quran", "Reading good books", "Teaching others"], why: "Seek refuge with Allah from knowledge that is of no benefit, he ﷺ said." },
        { q: "We can ask Allah to make our learning useful.", tf: true, why: "Ask Allah for beneficial knowledge and seek refuge from knowledge of no benefit." }
      ]
    }
  ]
};

export const DUA_ASKING_UNITS: readonly DeepUnit[] = [ASKING];
