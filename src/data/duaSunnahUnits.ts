import { hadith, type DeepUnit } from "./deepKit";

// Two more Duas units from the Book of Supplications of Jami at-Tirmidhi: how Allah answers du'a, and the du'as
// for the road. Number, narrator and grade as sunnah.com gives them; every grader there rates each one Sahih or
// Hasan. Each highlight is the hadith's own English line.

const ANSWERED: DeepUnit = {
  key: "dua-answered",
  topicId: "duas",
  branchId: "duas-answered",
  branch: { title: "How Allah answers du'a", description: "No du'a is wasted, du'a in easy times, hands raised to Allah, and the best time and words." },
  name: "how Allah answers du'a",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "no-dua-wasted",
      title: "No du'a is wasted",
      line: "Allah gives what you asked, or keeps away a harm like it.",
      facts: ["Jami at-Tirmidhi 3381", "Unless it asks for a sin", "Or for cutting family ties"],
      source: hadith("tirmidhi", "3381", "Jabir ibn Abdullah", "Hasan (Al-Albani)", "The Prophet ﷺ said: whenever someone makes du'a, Allah gives him what he asked, or keeps away from him a harm equal to it, as long as he does not ask for a sin or for cutting family ties.", "There is none who utters a supplication, except that Allah gives him what he asked, or prevents evil from him that is equal to it"),
      difficulty: 2,
      questions: [
        { q: "What happens when a believer makes du'a?", a: "Allah gives it, or keeps a harm away", wrong: ["Nothing happens", "Only long du'as count", "Only rich people are answered"], why: "Allah gives him what he asked, or keeps away a harm equal to it." },
        { q: "Which du'a did he ﷺ say is not answered?", a: "A du'a for a sin", wrong: ["A du'a for parents", "A du'a for rain", "A du'a for health"], why: "As long as he does not ask for something evil, or for cutting family ties." },
        { q: "A du'a can be answered by keeping a harm away from you.", tf: true, why: "Or Allah keeps away from him an evil equal to what he asked." }
      ]
    },
    {
      slug: "dua-in-ease",
      title: "Du'a in easy times",
      line: "Call on Allah much in ease, to be answered in hardship.",
      facts: ["Jami at-Tirmidhi 3382", "In times of hardship and grief", "Make du'a when things are good, too"],
      source: hadith("tirmidhi", "3382", "Abu Hurairah", "Hasan (Al-Albani)", "The Prophet ﷺ said: whoever would like Allah to answer him in times of hardship and grief, let him make much du'a in times of ease.", "Whoever wishes that Allah would respond to him during hardship and grief"),
      difficulty: 2,
      questions: [
        { q: "When should we make much du'a, to be answered in hard times?", a: "In times of ease", wrong: ["Only in hard times", "Only once a year", "Only when sick"], why: "Let him supplicate plentifully when at ease." },
        { q: "What two hard times did he ﷺ name?", a: "Hardship and grief", wrong: ["Trips and holidays", "Mornings and evenings", "Meals and sleep"], why: "He ﷺ spoke of being answered in hardship and grief." },
        { q: "We should turn to Allah only when things go wrong.", tf: false, why: "No. Call on Allah much in times of ease too, he ﷺ said." }
      ]
    },
    {
      slug: "hands-raised",
      title: "Hands raised to Allah",
      line: "Allah does not send hands raised to Him back empty.",
      facts: ["Jami at-Tirmidhi 3556", "Al-Karim: the Generous", "Raise your hands when you ask"],
      source: hadith("tirmidhi", "3556", "Salman al-Farisi", "Sahih (Al-Albani)", "The Prophet ﷺ said: Allah is Generous. When a person raises his hands to Him in du'a, He does not send them back empty and turned away.", "Indeed, Allah, is Hayy, Generous, when a man raises his hands to Him"),
      difficulty: 2,
      questions: [
        { q: "What did he ﷺ say about hands raised to Allah in du'a?", a: "Allah does not send them back empty", wrong: ["They must be raised very high", "They must be washed first", "They must stay up an hour"], why: "When a man raises his hands to Him, He does not return them empty." },
        { q: "Which name of Allah is in the hadith of raised hands?", a: "Al-Karim, the Generous", wrong: ["Al-Malik, the King", "Al-Qawiyy, the Strong", "Al-Alim, the All-Knowing"], why: "The Prophet ﷺ said Allah is Generous, so raised hands are not sent back empty." },
        { q: "Raising your hands is part of making du'a.", tf: true, why: "He ﷺ spoke of a man who raises his hands to Allah in du'a." }
      ]
    },
    {
      slug: "begin-with-yourself",
      title: "Begin with yourself",
      line: "When he ﷺ made du'a for someone, he began with himself.",
      facts: ["Jami at-Tirmidhi 3385", "Told by Ubayy ibn Ka'b", "First for yourself, then for others"],
      source: hadith("tirmidhi", "3385", "Ubayy ibn Ka'b", "Sahih (Al-Albani)", "Ubayy ibn Ka'b said: whenever the Prophet ﷺ mentioned someone and made du'a for him, he began with himself.", "would mention someone and supplicate for him, he would begin with himself"),
      difficulty: 1,
      questions: [
        { q: "Whom did he ﷺ begin with, when making du'a for someone?", a: "With himself first", wrong: ["With the oldest person there", "With the person he named", "With the people around him"], why: "He would mention someone and supplicate for him, beginning with himself." },
        { q: "Who told how he ﷺ began his du'a for others?", a: "Ubayy ibn Ka'b", wrong: ["Abu Bakr", "Bilal", "Abu Hurairah"], why: "Ibn Abbas narrated it from Ubayy ibn Ka'b." },
        { q: "You can ask Allah for yourself and for others in one du'a.", tf: true, why: "He ﷺ began with himself, then prayed for the one he mentioned." }
      ]
    },
    {
      slug: "last-part-of-night",
      title: "The last part of the night",
      line: "The Lord is closest in the last part of the night.",
      facts: ["Jami at-Tirmidhi 3579", "Heard by Amr ibn Abasah", "A time to remember Allah"],
      source: hadith("tirmidhi", "3579", "Amr ibn Abasah", "Sahih (Al-Albani)", "The Prophet ﷺ said: the Lord is closest to His servant in the last part of the night, so if you can be among those who remember Allah at that hour, then do so.", "The closest that the Lord is to a worshipper is during the last part of the night"),
      difficulty: 2,
      questions: [
        { q: "When is the Lord closest to His servant?", a: "In the last part of the night", wrong: ["At noon", "At sunset", "Right after lunch"], why: "The closest that the Lord is to a worshipper is during the last part of the night." },
        { q: "What did he ﷺ say to do in the last part of the night?", a: "Remember Allah", wrong: ["Go to the market", "Eat a big meal", "Talk with friends"], why: "If you are able to be of those who remember Allah in that hour, then do so." },
        { q: "The last part of the night is a special time to remember Allah.", tf: true, why: "He ﷺ urged us to be among those who remember Allah in that hour." }
      ]
    },
    {
      slug: "best-dhikr-best-dua",
      title: "The best dhikr and du'a",
      line: "Best dhikr: La ilaha illallah. Best du'a: Alhamdulillah.",
      facts: ["Jami at-Tirmidhi 3383", "La ilaha illallah: none is worshipped but Allah", "Alhamdulillah: all praise is for Allah"],
      source: hadith("tirmidhi", "3383", "Jabir ibn Abdullah", "Hasan (Al-Albani)", "The Prophet ﷺ said: the best dhikr is La ilaha illallah, and the best du'a is Alhamdulillah.", "there is none worthy of worship except Allah"),
      difficulty: 1,
      questions: [
        { q: "What did he ﷺ call the best dhikr?", a: "La ilaha illallah", wrong: ["Subhan Allah", "Allahu Akbar", "Astaghfirullah"], why: "The best remembrance is: there is none worthy of worship except Allah." },
        { q: "What did he ﷺ call the best du'a?", a: "Alhamdulillah", wrong: ["Amin", "Bismillah", "Insha'Allah"], why: "And the best supplication is: All praise is due to Allah." },
        { q: "La ilaha illallah means none is worshipped but Allah.", tf: true, why: "There is none worthy of worship except Allah." }
      ]
    }
  ]
};

const ROAD: DeepUnit = {
  key: "dua-road",
  topicId: "duas",
  branchId: "duas-road",
  branch: { title: "Du'as for the road", description: "Saying goodbye, taqwa as provision, Allahu Akbar on high ground, Allah as the companion, and coming home." },
  name: "du'as for the road",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "farewell",
      title: "Saying goodbye to a traveler",
      line: "He ﷺ said farewell: I entrust your religion to Allah.",
      facts: ["Jami at-Tirmidhi 3443", "Astawdi'ullaha dinak", "Your religion, your trusts, your last deeds"],
      source: hadith("tirmidhi", "3443", "Abdullah ibn Umar", "Sahih (Al-Albani)", "Ibn Umar would tell a traveler: come close, so I can bid you farewell as the Prophet ﷺ bid us farewell. Then he said: I entrust to Allah your religion, your trusts and the last of your deeds.", "I entrust to Allah your religion, and your trusts, and the last of your deeds"),
      difficulty: 2,
      questions: [
        { q: "To whom do we entrust a traveler's religion?", a: "To Allah", wrong: ["To his friends", "To the captain", "To his bags"], why: "I entrust to Allah your religion, your trusts and the last of your deeds." },
        { q: "What three things did he ﷺ entrust to Allah?", a: "Religion, trusts and last deeds", wrong: ["Money, food and clothes", "House, camel and tent", "Shoes, bags and water"], why: "Astawdi'ullaha dinaka wa amanataka wa khawatima 'amalik." },
        { q: "Ibn Umar said goodbye the way the Prophet ﷺ said goodbye.", tf: true, why: "Come close so I may bid you farewell as the Messenger of Allah ﷺ bid us farewell." }
      ]
    },
    {
      slug: "taqwa-provision",
      title: "Taqwa for the journey",
      line: "May Allah give you taqwa as your provision for the road.",
      facts: ["Jami at-Tirmidhi 3444", "Zawwadakallahut-taqwa", "Then forgiveness, and good made easy"],
      source: hadith("tirmidhi", "3444", "Anas ibn Malik", "Hasan Sahih (Al-Albani)", "A man told the Prophet ﷺ he was going on a journey and asked for provision. He said: may Allah give you taqwa as provision. The man asked for more: and may He forgive your sin. More: and may He make good easy for you wherever you are.", "May Allah grant you Taqwa as your provision"),
      difficulty: 2,
      questions: [
        { q: "What provision did he ﷺ give the traveler first?", a: "Taqwa", wrong: ["Dates", "Water", "Money"], why: "May Allah grant you Taqwa as your provision." },
        { q: "What did he ﷺ add when the man asked for more?", a: "May He forgive your sin", wrong: ["May you get rich", "May you travel fast", "May you be famous"], why: "His second du'a for the man was for forgiveness of sins." },
        { q: "He ﷺ prayed that good would be made easy for the traveler.", tf: true, why: "And may He make goodness easy for you wherever you are." }
      ]
    },
    {
      slug: "takbir-high-places",
      title: "Allahu Akbar on high ground",
      line: "Keep taqwa, and say Allahu Akbar on every high place.",
      facts: ["Jami at-Tirmidhi 3445", "Advice for a traveler", "Then a du'a for an easy road"],
      source: hadith("tirmidhi", "3445", "Abu Hurairah", "Hasan (Al-Albani)", "A man said he was about to travel and asked for advice. The Prophet ﷺ said: hold fast to the taqwa of Allah, and say Allahu Akbar on every high place. As the man left, he ﷺ said: O Allah, make the distance short for him and the journey easy.", "O Allah make near for him the distance, and ease for him the journey"),
      difficulty: 2,
      questions: [
        { q: "What did he ﷺ tell the traveler to say on high places?", a: "Allahu Akbar", wrong: ["Subhan Allah", "Bismillah", "Amin"], why: "He advised the takbir upon every elevated place." },
        { q: "What did he ﷺ ask Allah for the traveler?", a: "A short distance and an easy road", wrong: ["A fast camel", "A big tent", "Good weather"], why: "O Allah make near for him the distance, and ease for him the journey." },
        { q: "The first advice to the traveler was the taqwa of Allah.", tf: true, why: "Hold fast to the Taqwa of Allah, he ﷺ told the man." }
      ]
    },
    {
      slug: "companion-on-the-journey",
      title: "Allah, the companion on the journey",
      line: "O Allah, You are the companion on the journey.",
      facts: ["Jami at-Tirmidhi 3438", "Said as he ﷺ mounted his camel", "Allah also looks after the family"],
      source: hadith("tirmidhi", "3438", "Abu Hurairah", "Sahih (Al-Albani)", "When the Prophet ﷺ set out on a journey and mounted his camel, he said: O Allah, You are the companion on the journey and the One who looks after the family. O Allah, go with us with Your protection and bring us back safely.", "O Allah You are the companion on the journey, and the caretaker for the family"),
      difficulty: 2,
      questions: [
        { q: "In the travel du'a, who looks after the family left behind?", a: "Allah", wrong: ["The neighbors", "The guards", "Nobody at all"], why: "You are the companion on the journey, and the caretaker for the family." },
        { q: "When did he ﷺ say: O Allah, You are the companion on the journey?", a: "When he mounted his camel", wrong: ["When he reached Makkah", "When he went to sleep", "When he ate dinner"], why: "When the Prophet ﷺ would travel and mount his riding camel, he would say it." },
        { q: "In the travel du'a, he ﷺ asked Allah to bring them back safely.", tf: true, why: "O Allah, accompany us with Your protection, and return us in security." }
      ]
    },
    {
      slug: "coming-home",
      title: "Coming home from a journey",
      line: "Back from a trip, he ﷺ said: Ayibuna ta'ibuna abiduna.",
      facts: ["Jami at-Tirmidhi 3440", "Returning, repenting, worshipping", "And praising our Lord"],
      source: hadith("tirmidhi", "3440", "Al-Bara ibn Azib", "Sahih (Al-Albani)", "Whenever the Prophet ﷺ came back from a journey, he said: we are returning, repenting, worshipping, and praising our Lord.", "Returning, repenting, worshipping, and to our Lord directing the praise"),
      difficulty: 2,
      questions: [
        { q: "When did he ﷺ say Ayibuna ta'ibuna?", a: "Coming back from a journey", wrong: ["Setting out on a journey", "Waking up in the morning", "Finishing a meal"], why: "Whenever the Prophet ﷺ returned from a trip, he would say it." },
        { q: "What do the words Ayibuna ta'ibuna mean?", a: "Returning, repenting", wrong: ["Hurry, hurry", "Welcome, welcome", "Goodbye, goodbye"], why: "Returning, repenting, worshipping, and to our Lord directing the praise." },
        { q: "Coming home, he ﷺ said words of praise for his Lord.", tf: true, why: "And to our Lord directing the praise, he ﷺ said." }
      ]
    }
  ]
};

export const DUA_SUNNAH_UNITS: DeepUnit[] = [ANSWERED, ROAD];
