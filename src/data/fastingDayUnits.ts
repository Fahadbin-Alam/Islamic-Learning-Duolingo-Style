import { hadith, type DeepUnit } from "./deepKit";

// One more Fasting unit: the fasting day from suhur to iftar, from Sunan Abi Dawud and Jami at-Tirmidhi. Every
// card is one sahih or hasan hadith (number, narrator and grade as sunnah.com gives them), with its exact English
// words to highlight, and none of them is taught anywhere else in the app.

const DAY: DeepUnit = {
  key: "fasting-suhur-to-iftar",
  topicId: "fasting",
  branchId: "fasting-suhur-to-iftar",
  branch: { title: "From suhur to iftar", description: "The blessed morning meal, what sets our fast apart, dates at suhur, the words at iftar, and an invitation while fasting." },
  name: "the fasting day",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "blessed-meal",
      title: "The blessed morning meal",
      line: "He ﷺ called suhur the blessed morning meal.",
      facts: ["Told by Al-Irbad ibn Sariyah", "In Ramadan, before dawn"],
      source: hadith("abudawud", "2344", "Al-Irbad ibn Sariyah", "Sahih (Al-Albani)", "Al-Irbad ibn Sariyah said: the Prophet ﷺ invited me to suhur in Ramadan, saying: come to the blessed morning meal.", "invited me to a meal shortly before dawn in Ramadan saying: Come to the blessed morning meal"),
      difficulty: 1,
      questions: [
        { q: "What did he ﷺ call the meal before dawn?", a: "The blessed morning meal", wrong: ["The quick night snack", "The heavy dinner", "The meal of kings"], why: "He invited Al-Irbad to suhur in Ramadan with those words." },
        { q: "Whom did he ﷺ invite to share his suhur?", a: "Al-Irbad ibn Sariyah", wrong: ["Abu Hurairah", "Bilal", "Anas ibn Malik"], why: "Come to the blessed morning meal, he ﷺ told Al-Irbad." },
        { q: "Suhur, the meal before dawn, is a blessed meal.", tf: true, why: "Come to the blessed morning meal, he ﷺ said in Ramadan." }
      ]
    },
    {
      slug: "suhur-sets-apart",
      title: "What sets our fast apart",
      line: "Eating suhur is what sets our fast apart.",
      facts: ["Told by Amr ibn al-As", "The People of the Book"],
      source: hadith("abudawud", "2343", "Amr ibn al-As", "Sahih (Al-Albani)", "The Prophet ﷺ said: what sets our fasting apart from the fasting of the People of the Book is eating suhur.", "The difference between our fasting and that of the people of the Book is eating shortly before dawn"),
      difficulty: 2,
      questions: [
        { q: "What did he ﷺ say sets our fast apart?", a: "Eating suhur before dawn", wrong: ["Fasting longer days", "Praying the whole night", "Eating only dates"], why: "Unlike the fast of the People of the Book, ours has suhur." },
        { q: "From whose fasting is ours different, he ﷺ said?", a: "The People of the Book", wrong: ["The people of Ta'if", "The Bedouins", "The people of Yemen"], why: "Eating shortly before dawn is the difference, he ﷺ said." },
        { q: "Skipping suhur on purpose is the Sunnah.", tf: false, why: "No. Eating suhur is the Sunnah that sets our fast apart." }
      ]
    },
    {
      slug: "dates-at-suhur",
      title: "Dates at suhur",
      line: "Dates make a fine suhur for a believer.",
      facts: ["Told by Abu Hurairah", "Ni'ma sahur al-mu'min at-tamr"],
      source: hadith("abudawud", "2345", "Abu Hurairah", "Sahih (Al-Albani)", "The Prophet ﷺ said: how good a suhur dates are for the believer.", "How good is the believers meal of dates shortly before dawn"),
      difficulty: 1,
      questions: [
        { q: "Which food did he ﷺ praise for suhur?", a: "Dates", wrong: ["Bread", "Milk", "Honey"], why: "How good is the believer's meal of dates before dawn." },
        { q: "Who told the hadith about dates at suhur?", a: "Abu Hurairah", wrong: ["Aishah", "Anas ibn Malik", "Salman al-Farsi"], why: "Abu Hurairah heard him ﷺ praise the believer's suhur of dates." },
        { q: "A simple suhur of dates is a good suhur.", tf: true, why: "He ﷺ said: how good is the believer's suhur of dates." }
      ]
    },
    {
      slug: "words-at-iftar",
      title: "The words at iftar",
      line: "Thirst is gone, and the reward is sure, if Allah wills.",
      facts: ["Told by Abdullah ibn Umar", "Dhahaba az-zama'u wabtallatil-'uruq"],
      source: hadith("abudawud", "2357", "Abdullah ibn Umar", "Hasan (Al-Albani)", "Ibn Umar said that when the Prophet ﷺ broke his fast he would say: thirst is gone, the veins are moist, and the reward is sure, if Allah wills.", "Thirst has gone, the arteries are moist, and the reward is sure, if Allah wills"),
      difficulty: 2,
      questions: [
        { q: "When did he ﷺ say: thirst is gone?", a: "When he broke his fast", wrong: ["When he woke up", "When it rained", "Before he slept"], why: "The veins are moist, and the reward is sure, if Allah wills." },
        { q: "What is sure, the words at iftar say?", a: "The reward, if Allah wills", wrong: ["The next meal", "A long life", "Good weather"], why: "Thirst has gone, the veins are moist, and the reward is sure." },
        { q: "The words at iftar end with: if Allah wills.", tf: true, why: "In sha' Allah: the reward is sure, if Allah wills." }
      ]
    },
    {
      slug: "invited-while-fasting",
      title: "Invited while fasting",
      line: "Fasting and invited? Go, and make du'a for your host.",
      facts: ["Told by Abu Hurairah", "Let him pray, meaning: make du'a"],
      source: hadith("tirmidhi", "780", "Abu Hurairah", "Sahih (Al-Albani)", "The Prophet ﷺ said: when one of you is invited to eat, let him answer. If he is fasting, let him make du'a for them.", "When one of you is invited to eat then let him respond, if he is fasting then let him pray"),
      difficulty: 2,
      questions: [
        { q: "What should you do when invited to eat?", a: "Accept the invitation", wrong: ["Ignore it", "Ask what food there is", "Send someone in your place"], why: "Answering an invitation is the Sunnah, even when fasting." },
        { q: "If you are fasting at the meal, what should you do?", a: "Make du'a for your host", wrong: ["Leave without a word", "Complain about the food", "Sit facing away"], why: "If he is fasting then let him pray, meaning: supplicate." },
        { q: "A fasting person should refuse every invitation.", tf: false, why: "No. When invited, let him respond, and if fasting, make du'a." }
      ]
    }
  ]
};

export const FASTING_DAY_UNITS: DeepUnit[] = [DAY];
