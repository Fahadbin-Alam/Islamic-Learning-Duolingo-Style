import { hadith, type DeepUnit } from "./deepKit";

// One more Akhirah unit: saying goodbye to a believer, from Jami at-Tirmidhi, Sahih al-Bukhari, Sunan Ibn Majah and
// Sunan Abi Dawud. Sweat on the brow at death, the believers as Allah's witnesses on earth, his ﷺ du'a at a funeral,
// Allah's name when laying the dead in the grave, honor for the body, and visiting graves to remember death. Every card
// is one sahih hadith with its number, narrator and grade, and its exact English words to highlight. Points the schools
// differ on are left out, and none of these hadith is taught anywhere else in the app.

const FAREWELL: DeepUnit = {
  key: "akhirah-saying-goodbye",
  topicId: "akhirah",
  branchId: "akhirah-saying-goodbye",
  branch: { title: "Saying goodbye to a believer", description: "Sweat on the brow, witnesses on earth, the funeral du'a, laying in the grave, honor for the body, and visiting graves." },
  name: "saying goodbye to a believer",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "sweat-on-the-brow",
      title: "Sweat on the brow",
      line: "A believer dies with sweat on his brow, he ﷺ said.",
      facts: ["Told by Buraidah al-Aslami", "The brow is the forehead", "Scholars count it a good sign"],
      source: hadith("tirmidhi", "982", "Buraidah al-Aslami", "Sahih (Al-Albani)", "Buraidah al-Aslami said: the Prophet ﷺ said: the believer dies with sweat on his brow.", "The believer dies with sweat on his brow"),
      difficulty: 1,
      questions: [
        { q: "How does a believer die, he ﷺ said?", a: "With sweat on his brow", wrong: ["With dust on his feet", "With ink on his hands", "With oil in his hair"], why: "The believer dies with sweat on his brow, the Prophet ﷺ said." },
        { q: "What is the brow?", a: "The forehead", wrong: ["The chin", "The cheek", "The neck"], why: "The brow is the forehead; the believer dies with sweat on his brow, he ﷺ said." },
        { q: "Sweat on the brow at death can be a sign of a believer.", tf: true, why: "The believer dies with sweat on his brow, Buraidah heard him ﷺ say." }
      ]
    },
    {
      slug: "witnesses-on-earth",
      title: "Witnesses on earth",
      line: "You are Allah's witnesses on earth, he ﷺ told the people.",
      facts: ["Told by Anas ibn Malik", "People praised a man at his funeral", "Umar asked what had been affirmed"],
      source: hadith("bukhari", "1367", "Anas ibn Malik", "Sahih", "Anas ibn Malik said: a funeral passed and the people praised the dead man, and the Prophet ﷺ said: it has been affirmed. Another passed and they spoke badly of him, and he said: it has been affirmed. Umar ibn al-Khattab asked: what has been affirmed? He said: you praised this one, so Paradise has been affirmed for him; you spoke badly of that one, so the Fire has been affirmed for him. You are Allah's witnesses on earth.", "You praised this, so Paradise has been affirmed to him"),
      difficulty: 2,
      questions: [
        { q: "What was affirmed for the man the people praised?", a: "Paradise", wrong: ["A long life", "Great wealth", "A big house"], why: "You praised this, so Paradise has been affirmed to him, he ﷺ said." },
        { q: "Who asked him ﷺ what had been affirmed?", a: "Umar ibn al-Khattab", wrong: ["Abu Bakr as-Siddiq", "Ali ibn Abi Talib", "Uthman ibn Affan"], why: "Umar ibn al-Khattab asked what had been affirmed after both funerals passed, Anas said." },
        { q: "He ﷺ called the believers Allah's witnesses on earth.", tf: true, why: "You people are Allah's witnesses on earth, he ﷺ told them." }
      ]
    },
    {
      slug: "praying-over-the-dead",
      title: "Praying over the dead",
      line: "At a funeral, he ﷺ asked Allah to forgive and pardon the dead.",
      facts: ["Told by Awf ibn Malik", "He ﷺ prayed over a man of the Ansar", "A better home and a better family"],
      source: hadith("ibnmajah", "1500", "Awf ibn Malik", "Sahih (Al-Albani)", "Awf ibn Malik said: I saw the Messenger of Allah ﷺ offer the funeral prayer for a man of the Ansar, and I heard him say: O Allah, send blessings on him, forgive him, have mercy on him, keep him safe and pardon him; wash him with water, snow and hail, and cleanse him of sins as a white garment is cleansed of dirt. Give him a home better than his home and a family better than his family, and protect him from the trial of the grave and the punishment of the Fire.", "Give him in exchange for his house that is better than his house, and a family that is better than his family"),
      difficulty: 2,
      questions: [
        { q: "What did he ﷺ ask Allah to give the dead man?", a: "A better home and family", wrong: ["A grave filled with gold", "A name people remember", "A long line of sons"], why: "Give him in exchange for his house that is better than his house, he ﷺ prayed." },
        { q: "From what did he ﷺ ask Allah to protect the dead man?", a: "The trial of the grave", wrong: ["The heat of the sun", "The cold of the night", "The eyes of the people"], why: "Protect him from the trial of the grave and the torment of the Fire, he ﷺ prayed." },
        { q: "He ﷺ asked Allah to wash the dead man's sins away.", tf: true, why: "Wash him with water, snow and hail, and cleanse him of sins, he ﷺ prayed." }
      ]
    },
    {
      slug: "laid-in-the-grave",
      title: "Laid in the grave",
      line: "Laying the dead in the grave, he ﷺ said Allah's name.",
      facts: ["Told by Abdullah ibn Umar", "Bismillah wa 'ala sunnati rasulillah", "Said as the dead is placed in the grave"],
      source: hadith("abudawud", "3213", "Abdullah ibn Umar", "Sahih (Al-Albani)", "Abdullah ibn Umar said: when the Prophet ﷺ placed the dead in the grave, he said: in the name of Allah, and following the Sunnah of the Messenger of Allah.", "In the name of Allah, and following the Sunnah of the Messenger of Allah"),
      difficulty: 2,
      questions: [
        { q: "When did he ﷺ say: in the name of Allah, and on the Sunnah?", a: "When placing the dead in the grave", wrong: ["When washing the dead with water", "When walking behind the funeral", "When building a new home"], why: "When the Prophet ﷺ placed the dead in the grave, he said these words, Ibn Umar said." },
        { q: "Whose way did he ﷺ name along with Allah's name?", a: "The Sunnah of Allah's Messenger", wrong: ["The ways of their forefathers", "The customs of the Arabs", "The habits of the people of Makkah"], why: "In the name of Allah, and following the Sunnah of the Messenger of Allah, he ﷺ said." },
        { q: "Saying Allah's name when laying the dead in the grave is a sunnah.", tf: true, why: "He ﷺ said: in the name of Allah, and on the Sunnah of His Messenger, at the grave." }
      ]
    },
    {
      slug: "honor-for-the-body",
      title: "Honor for the body",
      line: "Breaking a dead man's bone is like breaking it in life.",
      facts: ["Told by Aishah", "A Muslim's body keeps its honor", "Handle the dead gently"],
      source: hadith("abudawud", "3207", "Aishah", "Sahih (Al-Albani)", "Aishah, the Mother of the Believers, said: the Messenger of Allah ﷺ said: breaking the bone of a dead person is like breaking it while he is alive.", "bone is like breaking it when he is alive"),
      difficulty: 2,
      questions: [
        { q: "Breaking a dead man's bone is like what, he ﷺ said?", a: "Breaking it while he lives", wrong: ["Breaking a dry stick", "Breaking a clay pot", "Nothing at all"], why: "Breaking a dead man's bone is like breaking it when he is alive, he ﷺ said." },
        { q: "How should we handle the body of one who has died?", a: "Gently, with honor", wrong: ["Roughly, without care", "Any way at all", "Like an old cloth"], why: "Breaking a dead man's bone is like breaking it in life, so handle the dead gently." },
        { q: "A Muslim's body keeps its honor after death.", tf: true, why: "Breaking the bone of the dead is like breaking it in life, the Messenger of Allah ﷺ said." }
      ]
    },
    {
      slug: "visit-the-graves",
      title: "Visit the graves",
      line: "Visit graves, he ﷺ said, for they remind you of death.",
      facts: ["Told by Buraidah al-Aslami", "At first he ﷺ had forbidden it", "Graves remind us of death"],
      source: hadith("abudawud", "3235", "Buraidah al-Aslami", "Sahih (Al-Albani)", "Buraidah al-Aslami said: the Messenger of Allah ﷺ said: I had forbidden you to visit graves, but now you may visit them, for visiting them is a reminder of death.", "I forbade you to visit graves, but you may now visit them, for in visiting them there is a reminder"),
      difficulty: 2,
      questions: [
        { q: "Why may we visit graves, he ﷺ said?", a: "They remind us of death", wrong: ["They bring good luck", "The dead grant wishes", "They make wealth grow"], why: "Once forbidden, visiting graves is now allowed, for it is a reminder of death, he ﷺ said." },
        { q: "What happened to the rule on visiting graves?", a: "Forbidden at first, then allowed", wrong: ["Allowed at first, then forbidden", "Forbidden always, never allowed", "Made a duty for everyone"], why: "I forbade you to visit graves, but you may now visit them, he ﷺ said." },
        { q: "Muslims may visit graves today.", tf: true, why: "You may now visit them, for visiting graves is a reminder of death, he ﷺ said." }
      ]
    }
  ]
};

export const AKHIRAH_FAREWELL_UNITS: readonly DeepUnit[] = [FAREWELL];
