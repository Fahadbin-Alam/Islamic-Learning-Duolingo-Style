import { hadith, type DeepUnit } from "./deepKit";

// One more unit for people new to Islam: growing in your new faith, from Sunan an-Nasa'i, Sunan Ibn Majah, Sahih
// al-Bukhari and Jami at-Tirmidhi. A stranger he ﷺ stopped his khutbah to teach, young Companions who learned faith
// before the Quran, the new people Allah keeps planting in this religion, who counts as a Muslim, a heart glad of good
// deeds and sad over bad ones, and passing on what you hear just as you heard it. Every card is one sahih or hasan
// hadith with its number, narrator and grade, and its exact English words to highlight, and none of them is taught
// anywhere else in the app.

const GROWING: DeepUnit = {
  key: "growing-in-faith",
  topicId: "intro",
  branchId: "intro-growing-in-faith",
  branch: { title: "Growing in your new faith", description: "A stranger who came to learn, faith before the Quran, new people Allah plants, one of us, a glad and sad heart, and passing it on." },
  name: "growing in faith",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "a-stranger-asks",
      title: "A stranger asks",
      line: "He ﷺ paused his khutbah to teach a stranger about Islam.",
      facts: ["Told by Abu Rifa'ah", "A chair was brought for him ﷺ", "Then he went back and finished the khutbah"],
      source: hadith("nasai", "5377", "Abu Rifa'ah", "Sahih (Al-Albani)", "Abu Rifa'ah said: I came to the Messenger of Allah ﷺ while he was giving a khutbah, and said: a stranger has come to ask about his religion, for he does not know it. He ﷺ stopped his khutbah, came to me, sat on a chair and taught me what Allah had taught him; then he finished his khutbah.", "a stranger has come to ask about his religion, for he does not know what his religion is"),
      difficulty: 1,
      questions: [
        { q: "What was he ﷺ doing when the stranger came?", a: "Giving a khutbah", wrong: ["Eating a meal", "Planting a tree", "Writing a letter"], why: "He ﷺ was delivering a khutbah when Abu Rifa'ah came to him." },
        { q: "What did he ﷺ do for the man who did not know his religion?", a: "Stopped and taught him", wrong: ["Gave him a new name", "Asked about his tribe", "Gave him a horse"], why: "He stopped his khutbah, turned to me, and taught me what Allah had taught him." },
        { q: "After teaching him, he ﷺ finished his khutbah.", tf: true, why: "Then he went and completed his khutbah, Abu Rifa'ah said." }
      ]
    },
    {
      slug: "faith-then-the-quran",
      title: "Faith, then the Quran",
      line: "The young Companions learned faith before the Quran.",
      facts: ["Told by Jundub ibn Abdullah", "They were strong young men", "Then the Quran made their faith grow"],
      source: hadith("ibnmajah", "61", "Jundub ibn Abdullah", "Sahih (Al-Albani)", "Jundub ibn Abdullah said: we were with the Prophet ﷺ as strong young men. We learned faith before we learned the Quran; then we learned the Quran, and our faith grew by it.", "and we were strong youths, so we learned faith before we learned"),
      difficulty: 1,
      questions: [
        { q: "What did the young Companions learn before the Quran?", a: "Faith", wrong: ["Poetry", "Trade", "Horse riding"], why: "We learned faith before we learned the Quran, Jundub said." },
        { q: "What did learning the Quran do to their faith?", a: "Made it grow", wrong: ["Made it weaker", "Changed nothing", "Made it harder"], why: "Then we learned the Quran and our faith increased thereby, Jundub said." },
        { q: "Jundub and his friends were strong young men then.", tf: true, why: "They were strong youths with the Prophet ﷺ, Jundub said." }
      ]
    },
    {
      slug: "allah-keeps-planting",
      title: "Allah keeps planting",
      line: "Allah keeps planting new people in this religion.",
      facts: ["Told by Abu Inabah al-Khawlani", "He uses them in obeying Him", "New Muslims are part of it"],
      source: hadith("ibnmajah", "8", "Abu Inabah al-Khawlani", "Hasan (Al-Albani)", "Abu Inabah al-Khawlani said: the Messenger of Allah ﷺ said: Allah will keep planting new people in this religion, and He uses them in obeying Him.", "Allah will continue to plant new people in this religion and use them in His obedience"),
      difficulty: 1,
      questions: [
        { q: "What does Allah keep doing in this religion, he ﷺ said?", a: "Planting new people", wrong: ["Closing its door", "Making it smaller", "Bringing it to an end"], why: "Allah will continue to plant new people in this religion, he ﷺ said." },
        { q: "What does Allah use these new people for?", a: "Obeying Him", wrong: ["Getting rich", "Winning fame", "Building towers"], why: "Allah will use them in His obedience, he ﷺ said." },
        { q: "New people will keep coming into Islam.", tf: true, why: "Allah will continue to plant new people in this religion, he ﷺ said." }
      ]
    },
    {
      slug: "one-of-us",
      title: "You are one of us",
      line: "Whoever prays like us and faces our qiblah is a Muslim.",
      facts: ["Told by Anas ibn Malik", "Under the protection of Allah and His Messenger ﷺ", "Do not betray those Allah protects"],
      source: hadith("bukhari", "391", "Anas ibn Malik", "Sahih", "Anas ibn Malik said: the Messenger of Allah ﷺ said: whoever prays like us, faces our qiblah and eats the meat we sacrifice is a Muslim, under the protection of Allah and His Messenger; so do not betray Allah by betraying those He protects.", "Whoever prays like us and faces our Qibla"),
      difficulty: 1,
      questions: [
        { q: "What is a person who prays like us and faces our qiblah?", a: "A Muslim", wrong: ["A guest", "A stranger", "A traveler"], why: "Whoever prays like us and faces our Qibla is a Muslim, he ﷺ said." },
        { q: "Whose protection is such a Muslim under?", a: "Allah and His Messenger ﷺ", wrong: ["Only his own tribe", "The king of his land", "Nobody at all"], why: "He is under the protection of Allah and His Messenger ﷺ, so never betray him." },
        { q: "We may betray a Muslim who is under Allah's protection.", tf: false, why: "No. Do not betray Allah by betraying those who are in His protection." }
      ]
    },
    {
      slug: "glad-and-sad",
      title: "A glad and sad heart",
      line: "Glad of good deeds, sad over bad ones: that is a believer.",
      facts: ["Umar passed it on in a khutbah at al-Jabiyah", "He was passing on the Prophet's ﷺ words", "Told by Ibn Umar"],
      source: hadith("tirmidhi", "2165", "Abdullah ibn Umar", "Sahih (Al-Albani)", "Ibn Umar said: Umar gave a khutbah at al-Jabiyah and said the Messenger of Allah ﷺ stood among us and said, among other things: whoever is glad of his good deeds and sad over his bad deeds, that is the believer among you.", "Whoever rejoices with his good deeds and grieves over his evil deeds, then that is the believer among you"),
      difficulty: 1,
      questions: [
        { q: "How does a believer feel about his good deeds?", a: "Glad of them", wrong: ["Bored with them", "Angry about them", "He feels nothing"], why: "Whoever rejoices with his good deeds is the believer among you, he ﷺ said." },
        { q: "How does a believer feel about his bad deeds?", a: "Sad over them", wrong: ["Happy with them", "Proud of them", "He forgets about them"], why: "And grieves over his evil deeds: that is the believer among you." },
        { q: "Feeling sad after a sin is a sign of faith.", tf: true, why: "Whoever grieves over his evil deeds, that is the believer among you, he ﷺ said." }
      ]
    },
    {
      slug: "pass-it-on",
      title: "Pass it on as you heard it",
      line: "He ﷺ made du'a for whoever passes on his words as heard.",
      facts: ["Told by Abdullah ibn Mas'ud", "May Allah gladden him, he ﷺ said", "The listener may understand it even better"],
      source: hadith("tirmidhi", "2657", "Abdullah ibn Mas'ud", "Sahih (Al-Albani)", "Ibn Mas'ud said: I heard the Messenger of Allah ﷺ say: may Allah gladden a man who hears something from us and passes it on just as he heard it, for the one it reaches may understand it better than the one who heard it.", "May Allah gladden a man who hears something from us, so he conveys it as he heard it"),
      difficulty: 2,
      questions: [
        { q: "How should we pass on what we hear from him ﷺ?", a: "Just as we heard it", wrong: ["With our own changes", "Only in a whisper", "Only after a year"], why: "So he conveys it as he heard it, he ﷺ said." },
        { q: "What did he ﷺ ask Allah to give such a person?", a: "Gladness", wrong: ["Gold", "A big house", "Many camels"], why: "May Allah gladden a man who hears something from us and conveys it." },
        { q: "The one who hears it next may understand it better.", tf: true, why: "Perhaps the one it is conveyed to is more understanding than the one who heard it." }
      ]
    }
  ]
};

export const INTRO_GROWING_UNITS: DeepUnit[] = [GROWING];
