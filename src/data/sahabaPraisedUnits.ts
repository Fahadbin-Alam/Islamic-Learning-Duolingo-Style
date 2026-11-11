import { hadith, type DeepUnit } from "./deepKit";

// One more Sahabah unit: Companions the Prophet ﷺ praised by name, from Jami at-Tirmidhi. Seven men he called
// excellent, Abu Bakr named Atiq from the Fire, his du'a that Allah honor Islam through Umar, Talhah lifting him onto
// a rock at Uhud, Al-Bara ibn Malik among the humble whose oath Allah fulfils, and the Companions he told people to
// follow. Every card is one sahih or hasan hadith with its number, narrator and grade, and its exact English words to
// highlight, and none of them is taught anywhere else in the app. No Companion is drawn or shown as a person.

const PRAISED: DeepUnit = {
  key: "praised-by-name",
  topicId: "sahabah",
  branchId: "sahabi-praised-by-name",
  branch: { title: "Praised by name", description: "Seven excellent men, Abu Bakr the Atiq, a du'a for Umar, Talhah at Uhud, Al-Bara ibn Malik, and whom to follow." },
  name: "the Companions he ﷺ praised",
  kind: "story",
  lessonType: "story",
  lessons: [
    {
      slug: "what-an-excellent-man",
      title: "What an excellent man",
      line: "He ﷺ praised seven Companions by name: what an excellent man!",
      facts: ["Told by Abu Hurairah", "First named: Abu Bakr, then Umar", "Two of them were named Mu'adh"],
      source: hadith("tirmidhi", "3795", "Abu Hurairah", "Sahih (Al-Albani)", "Abu Hurairah said: the Messenger of Allah ﷺ said: what an excellent man is Abu Bakr, what an excellent man is Umar, and Abu Ubaidah ibn al-Jarrah, Usaid ibn Hudair, Thabit ibn Qais ibn Shammas, Mu'adh ibn Jabal, and Mu'adh ibn Amr ibn al-Jamuh.", "What an excellent man is Abu Bakr"),
      difficulty: 1,
      questions: [
        { q: "Whom did he ﷺ name first as an excellent man?", a: "Abu Bakr", wrong: ["Khalid ibn al-Walid", "Amr ibn al-As", "Abu Musa al-Ash'ari"], why: "What an excellent man is Abu Bakr, he ﷺ said first." },
        { q: "How many men named Mu'adh are in his ﷺ list?", a: "Two men", wrong: ["One man", "Three men", "Four men"], why: "He ﷺ named Mu'adh ibn Jabal and Mu'adh, the son of Amr ibn al-Jamuh." },
        { q: "Usaid ibn Hudair was among the men he ﷺ praised.", tf: true, why: "What an excellent man is Usaid ibn Hudair, he ﷺ said." }
      ]
    },
    {
      slug: "called-atiq",
      title: "Called Atiq",
      line: "He ﷺ told Abu Bakr: you are Allah's Atiq from the Fire.",
      facts: ["Told by Aishah", "Atiq: one set free", "From that day he was called Atiq"],
      source: hadith("tirmidhi", "3679", "Aishah", "Sahih (Al-Albani)", "Aishah said: Abu Bakr came in to the Messenger of Allah ﷺ, and he said: you are Allah's Atiq, set free from the Fire. From that day on he was called Atiq.", "From that day on he was called"),
      difficulty: 1,
      questions: [
        { q: "What did he ﷺ call Abu Bakr?", a: "Allah's Atiq from the Fire", wrong: ["The sword of Allah", "The lion of Allah", "The best of poets"], why: "You are Allah's Atiq from the Fire, he ﷺ said to Abu Bakr." },
        { q: "What does Atiq mean in his ﷺ words?", a: "One set free", wrong: ["One who travels", "One who sings", "One who writes"], why: "Atiq from the Fire: one Allah has set free from it." },
        { q: "After that day, people called Abu Bakr Atiq.", tf: true, why: "From that day on he was called Atiq, Aishah said." }
      ]
    },
    {
      slug: "a-dua-for-umar",
      title: "A du'a for Umar",
      line: "He ﷺ asked Allah to honor Islam through Umar or Abu Jahl.",
      facts: ["Told by Abdullah ibn Umar", "Whichever of the two Allah loved more", "Allah loved Umar more"],
      source: hadith("tirmidhi", "3681", "Abdullah ibn Umar", "Sahih (Al-Albani)", "Ibn Umar said: the Messenger of Allah ﷺ said: O Allah, honor Islam through the dearer of these two men to You: Abu Jahl or Umar ibn al-Khattab. And the dearer of them to Him was Umar.", "Honor Islam through the most dear of these two men to you"),
      difficulty: 2,
      questions: [
        { q: "What did he ﷺ ask Allah to honor through one of two men?", a: "Islam", wrong: ["Makkah", "Quraysh", "The Ka'bah"], why: "O Allah! Honor Islam through the most dear of these two men to You." },
        { q: "Who was named with Umar in the du'a?", a: "Abu Jahl ibn Hisham", wrong: ["Abu Bakr", "Abu Lahab", "Utbah ibn Rabi'ah"], why: "Through Abu Jahl or through Umar ibn al-Khattab, he ﷺ said." },
        { q: "Of the two men, Umar was the dearer to Allah.", tf: true, why: "And the most dear of them to Him was Umar, Ibn Umar said." }
      ]
    },
    {
      slug: "talhah-at-the-rock",
      title: "Talhah at the rock",
      line: "At Uhud, Talhah crouched to lift him ﷺ onto a rock.",
      facts: ["Told by Az-Zubayr", "He ﷺ wore two coats of armor", "Paradise is due for Talhah, he ﷺ said"],
      source: hadith("tirmidhi", "3738", "Az-Zubayr ibn al-Awwam", "Hasan (Al-Albani)", "Az-Zubayr said: at Uhud the Messenger of Allah ﷺ wore two coats of armor. He tried to climb a large rock but could not, so Talhah crouched under him and lifted him until he sat on it. He ﷺ said: Paradise is due for Talhah.", "He tried to get up on a boulder, but was not able to, so Talhah squatted under him"),
      difficulty: 2,
      questions: [
        { q: "What did he ﷺ wear at Uhud?", a: "Two coats of armor", wrong: ["A golden crown", "A silk robe", "Only a turban"], why: "On the Day of Uhud, he ﷺ wore two coats of mail, Az-Zubayr said." },
        { q: "How did Talhah help him ﷺ onto the rock?", a: "He crouched and lifted him", wrong: ["He built a ladder", "He brought a rope", "He led a camel there"], why: "Talhah squatted under him, lifting the Prophet ﷺ upon it." },
        { q: "He ﷺ said Paradise is due for Talhah.", tf: true, why: "Paradise is obligatory for Talhah, he ﷺ said after it." }
      ]
    },
    {
      slug: "dusty-yet-answered",
      title: "Dusty, yet answered",
      line: "He ﷺ named Al-Bara ibn Malik among the humble Allah answers.",
      facts: ["Told by Anas ibn Malik, his brother", "Messy hair and only two cloths", "No one paid them any mind"],
      source: hadith("tirmidhi", "3854", "Anas ibn Malik", "Sahih (Al-Albani)", "Anas ibn Malik said: the Messenger of Allah ﷺ said: how many a person with messy hair, covered in dust, owning two cloths, whom no one cares about: if he swears by Allah, Allah fulfils it. Among them is Al-Bara ibn Malik.", "How many are there with dishevelled hair, covered with dust, possessing two cloths, whom no one pays any mind to"),
      difficulty: 2,
      questions: [
        { q: "Whom did he ﷺ name among these humble people?", a: "Al-Bara ibn Malik", wrong: ["Abu Jahl ibn Hisham", "Abu Lahab", "Umayyah ibn Khalaf"], why: "Among them is Al-Bara ibn Malik, he ﷺ said." },
        { q: "What happens when such a humble person swears by Allah?", a: "Allah fulfils it", wrong: ["People laugh at him", "He must pay money", "He must swear again"], why: "If he swears by Allah then He shall fulfill it, he ﷺ said." },
        { q: "No one paid much mind to these dusty, humble people.", tf: true, why: "Whom no one pays any mind to, he ﷺ said, yet Allah fulfils their oath." }
      ]
    },
    {
      slug: "whom-to-follow",
      title: "Whom to follow",
      line: "He ﷺ said: after me, follow Abu Bakr and Umar.",
      facts: ["Told by Abdullah ibn Mas'ud", "Act on the guidance of Ammar", "Hold fast to the advice of Ibn Mas'ud"],
      source: hadith("tirmidhi", "3805", "Abdullah ibn Mas'ud", "Sahih (Al-Albani)", "Ibn Mas'ud said: the Messenger of Allah ﷺ said: follow the two after me from my Companions, Abu Bakr and Umar; act on the guidance of Ammar, and hold fast to the advice of Ibn Mas'ud.", "Take as examples the two after me from my Companions, Abu Bakr"),
      difficulty: 2,
      questions: [
        { q: "Which two did he ﷺ say to follow after him?", a: "Abu Bakr and Umar", wrong: ["Khalid and Amr", "Zayd and Usamah", "Bilal and Salman"], why: "Take as examples the two after me, Abu Bakr and Umar, he ﷺ said." },
        { q: "Whose guidance did he ﷺ tell them to act on?", a: "Ammar ibn Yasir", wrong: ["Abu Jahl ibn Hisham", "Abu Lahab", "Abdullah ibn Ubayy"], why: "Act upon the guidance of Ammar, he ﷺ said." },
        { q: "He ﷺ told them to hold fast to Ibn Mas'ud's advice.", tf: true, why: "Hold fast to the advice of Ibn Mas'ud, he ﷺ said." }
      ]
    }
  ]
};

export const SAHABA_PRAISED_UNITS: readonly DeepUnit[] = [PRAISED];
