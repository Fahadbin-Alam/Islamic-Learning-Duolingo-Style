import { hadith, type DeepUnit } from "./deepKit";

// One more unit on the kids' Hadith path: how he ﷺ looked and sat, from Sahih al-Bukhari and Sunan Abi Dawud. A face
// as bright as the moon, a few white hairs below his lower lip, big hands, leaning forwards as he walked, sitting by the
// Ka'bah with his hand round his legs, and sitting among his Companions so that a stranger could not tell him apart.
// Told only in words: nothing here draws him ﷺ. Every card is one sahih hadith with its number, narrator and grade, and
// its exact English words to highlight, and none of them is taught anywhere else in the app.

const LOOKED: DeepUnit = {
  key: "kids-how-he-looked",
  topicId: "hadith",
  branchId: "hadith-how-he-looked",
  branch: { title: "How he ﷺ looked and sat", description: "A face like the moon, a few white hairs, big hands, his walk, sitting with his hand round his legs, and sitting among his Companions." },
  name: "how he ﷺ looked and sat",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "like-the-moon",
      title: "Bright like the moon",
      line: "His ﷺ face was bright like the moon, not like a sword.",
      facts: ["Told by Al-Bara ibn Azib", "Al-Bara was asked about his ﷺ face", "Bright as the moon, not a sword"],
      source: hadith("bukhari", "3552", "Al-Bara ibn Azib", "Sahih", "Abu Ishaq said: Al-Bara was asked: was the face of the Prophet ﷺ as bright as a sword? He said: no, it was as bright as the moon.", "Was the face of the Prophet … as a moon"),
      difficulty: 1,
      questions: [
        { q: "What was his ﷺ face as bright as?", a: "The moon", wrong: ["A shiny sword", "A mirror", "A jewel"], why: "Asked if it was as bright as a sword, Al-Bara said: no, as bright as a moon." },
        { q: "Who was asked about his ﷺ face?", a: "Al-Bara ibn Azib", wrong: ["Zayd ibn Thabit", "Mu'adh ibn Jabal", "Ubayy ibn Ka'b"], why: "Al-Bara was asked if the face of the Prophet ﷺ was as bright as a sword, Abu Ishaq said." },
        { q: "His ﷺ face was bright like the moon.", tf: true, why: "Asked if it was like a sword, Al-Bara said: no, but as bright as a moon." }
      ]
    },
    {
      slug: "a-few-white-hairs",
      title: "A few white hairs",
      line: "Abu Juhayfah saw some white hairs below his ﷺ lower lip.",
      facts: ["Told by Abu Juhayfah", "Below his ﷺ lower lip", "Above the chin"],
      source: hadith("bukhari", "3545", "Abu Juhayfah", "Sahih", "Abu Juhayfah said: I saw the Prophet ﷺ, and I saw some white hair below his lower lip, above the chin.", "saw some white hair below his lower lip above the chin"),
      difficulty: 1,
      questions: [
        { q: "Where did Abu Juhayfah see some white hair?", a: "Below his ﷺ lower lip", wrong: ["On his ﷺ arms", "On his ﷺ hands", "On his ﷺ feet"], why: "Abu Juhayfah saw them just above the chin, below his ﷺ lower lip." },
        { q: "Who saw the white hairs below his ﷺ lower lip?", a: "Abu Juhayfah", wrong: ["Abu Dharr", "Abu Ayyub", "Abu Talhah"], why: "Abu Juhayfah said he saw some white hair there, above the chin." },
        { q: "Abu Juhayfah saw lots of white hair on his ﷺ face.", tf: false, why: "No. Abu Juhayfah saw some white hair, just below his ﷺ lower lip." }
      ]
    },
    {
      slug: "big-hands",
      title: "His ﷺ big hands",
      line: "His ﷺ hands were big, and Anas never saw anyone like him.",
      facts: ["Told by Anas ibn Malik", "He ﷺ had big hands", "Nobody like him after him"],
      source: hadith("bukhari", "5906", "Anas ibn Malik", "Sahih", "Anas said: the Prophet ﷺ had big hands, and I have never seen anybody like him after him.", "had big hands, and I have never seen anybody like him after him"),
      difficulty: 1,
      questions: [
        { q: "What kind of hands did he ﷺ have?", a: "Big hands", wrong: ["Small hands", "Thin hands", "Weak hands"], why: "Anas said the Prophet ﷺ had big hands, and he never saw anybody like him." },
        { q: "Who said he never saw anybody like him ﷺ after him?", a: "Anas ibn Malik", wrong: ["Sa'd ibn Mu'adh", "Usamah ibn Zayd", "Abdullah ibn Masud"], why: "The Prophet ﷺ had big hands, and I have never seen anybody like him, Anas said." },
        { q: "Anas had seen many people just like him ﷺ.", tf: false, why: "No. Anas said: I have never seen anybody like him after him." }
      ]
    },
    {
      slug: "how-he-walked",
      title: "How he ﷺ walked",
      line: "When he ﷺ walked, he seemed to lean forward.",
      facts: ["Told by Anas ibn Malik", "When he ﷺ walked", "As if he bent forwards"],
      source: hadith("abudawud", "4863", "Anas ibn Malik", "Sahih isnad (Al-Albani)", "Anas said: when the Prophet ﷺ walked, it looked as if he bent forwards.", "walked, it looked as if he bent forwards"),
      difficulty: 1,
      questions: [
        { q: "Which way did he ﷺ seem to lean as he walked?", a: "Forward", wrong: ["Backward", "Sideways", "Upward"], why: "When he ﷺ walked, it looked as if he bent forwards, Anas said." },
        { q: "Who told how he ﷺ walked?", a: "Anas ibn Malik", wrong: ["Zayd ibn Arqam", "Sahl ibn Sa'd", "Uqbah ibn Amir"], why: "Anas told it: when the Prophet ﷺ walked, he seemed to bend forwards." },
        { q: "He ﷺ seemed to bend forwards when he walked.", tf: true, why: "When the Prophet ﷺ walked, it looked as if he bent forwards, Anas said." }
      ]
    },
    {
      slug: "arms-round-his-legs",
      title: "Sitting by the Ka'bah",
      line: "By the Ka'bah, he ﷺ sat with his hand round his legs.",
      facts: ["Told by Ibn Umar", "In the courtyard of the Ka'bah", "Ihtiba: sitting with arms round the legs"],
      source: hadith("bukhari", "6272", "Ibn Umar", "Sahih", "Ibn Umar said: I saw the Messenger of Allah ﷺ in the courtyard of the Ka'bah, sitting in ihtiba, putting his hand round his legs like this.", "putting his hand round his legs like this"),
      difficulty: 1,
      questions: [
        { q: "Where did Ibn Umar see him ﷺ sit with his hand round his legs?", a: "In the courtyard of the Ka'bah", wrong: ["In the market of Madinah", "In the town of Taif", "On the hill of Uhud"], why: "Ibn Umar saw him ﷺ in the ihtiba posture in the courtyard of the Ka'bah." },
        { q: "What is sitting with your arms round your legs called?", a: "Ihtiba", wrong: ["Tashahhud", "Sujud", "Ruku"], why: "Ibn Umar saw him ﷺ sit in ihtiba, putting his hand round his legs like this." },
        { q: "He ﷺ put his hand round his legs as he sat.", tf: true, why: "Ibn Umar saw him ﷺ sitting in the ihtiba posture in the courtyard of the Ka'bah." }
      ]
    },
    {
      slug: "among-his-companions",
      title: "Sitting among them",
      line: "He ﷺ sat among his Companions, not apart from them.",
      facts: ["Told by Abu Dharr and Abu Hurairah", "A stranger had to ask which was him ﷺ", "Terrace of soil: a low seat of earth"],
      source: hadith("abudawud", "4698", "Abu Dharr and Abu Hurairah", "Sahih (Al-Albani)", "Abu Dharr and Abu Hurairah said: the Messenger of Allah ﷺ used to sit among his Companions. A stranger would come and not recognize him until he asked. So we asked him to let us make him a place to sit, so that a stranger would know him, and we built a terrace of soil for him to sit on, and we sat beside him.", "A stranger would come and not recognize him"),
      difficulty: 2,
      questions: [
        { q: "What did a stranger have to do, to know which one was him ﷺ?", a: "Ask which one he was", wrong: ["Wait until he spoke", "Look for a crown", "Look for a throne"], why: "He ﷺ used to sit among his Companions, so a stranger had to ask which was him." },
        { q: "What did the Companions build for him ﷺ to sit on?", a: "A terrace of soil", wrong: ["A seat of carved stone", "A chair of glass", "A bench of marble"], why: "So we built a terrace of soil on which he would sit, and we sat beside him." },
        { q: "He ﷺ used to sit among his Companions.", tf: true, why: "Abu Dharr and Abu Hurairah said a stranger would come and not know which was him ﷺ." }
      ]
    }
  ]
};

export const KIDS_LOOKED_UNITS: readonly DeepUnit[] = [LOOKED];
