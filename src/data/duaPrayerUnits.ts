import { hadith, type DeepUnit } from "./deepKit";

// One more Du'as unit: du'as and the prayer, from Jami at-Tirmidhi, Sunan Abi Dawud, Sunan an-Nasa'i and Sahih
// al-Bukhari. Words to say on hearing the mu'adhdhin, his ﷺ du'a for the imams and the mu'adhdhins, what Umm Sulaim
// was taught to say in her prayer, a du'a for light, the istikharah, mercy for one who prays four before Asr, and the
// Mu'awwidhat after every prayer (how many surahs they are is not asked: the narrations count them differently). Every
// card is one sahih or hasan hadith with its number, narrator and grade, and its exact English words to highlight.
// None of these hadith is taught anywhere else in the app.

const DUA_PRAYER: DeepUnit = {
  key: "duas-and-the-prayer",
  topicId: "duas",
  branchId: "duas-and-the-prayer",
  branch: { title: "Du'as and the prayer", description: "On hearing the mu'adhdhin, a du'a for the imams, Umm Sulaim's words, a du'a for light, the istikharah, four before Asr, and the Mu'awwidhat." },
  name: "du'as and the prayer",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "on-hearing-the-muadhdhin",
      title: "On hearing the mu'adhdhin",
      line: "Say these words after the mu'adhdhin, and sins are pardoned.",
      facts: ["Told by Sa'd ibn Abi Waqqas", "I too testify: none is worshipped but Allah", "Pleased with Allah, Islam and Muhammad ﷺ"],
      source: hadith("tirmidhi", "210", "Sa'd ibn Abi Waqqas", "Sahih (Darussalam)", "Sa'd ibn Abi Waqqas said: the Messenger of Allah ﷺ said: whoever says, when he hears the mu'adhdhin: I too testify that none has the right to be worshipped but Allah, alone without partners, and that Muhammad is His slave and Messenger; I am pleased with Allah as my Lord, with Islam as my religion and with Muhammad as a Messenger, Allah will pardon his sins.", "Allah will pardon his sins for him"),
      difficulty: 2,
      questions: [
        { q: "When are these words said, he ﷺ taught?", a: "On hearing the mu'adhdhin", wrong: ["On entering the market", "On putting on new clothes", "On seeing the rain"], why: "Whoever says these words when he hears the Mu'adh-dhin, Allah will pardon his sins." },
        { q: "Which of these is in the words he ﷺ taught?", a: "Pleased with Allah as my Lord", wrong: ["Pleased with my wealth", "Pleased with my tribe", "Pleased with my fame"], why: "I am pleased with Allah as my Lord, with Islam as my religion and Muhammad ﷺ as a Messenger." },
        { q: "Saying these words on hearing the mu'adhdhin brings pardon.", tf: true, why: "Allah will pardon his sins for him, he ﷺ said of one who says them on hearing the call." }
      ]
    },
    {
      slug: "guide-the-imams",
      title: "Guide the imams",
      line: "O Allah, guide the imams and forgive the mu'adhdhins.",
      facts: ["Told by Abu Hurairah", "The imam is responsible", "The mu'adhdhin is trusted"],
      source: hadith("abudawud", "517", "Abu Hurairah", "Sahih (Al-Albani)", "Abu Hurairah said: the Messenger of Allah ﷺ said: the imam is responsible and the mu'adhdhin is trusted. O Allah, guide the imams and forgive the mu'adhdhins.", "The imam is responsible … guide the imams and forgive the"),
      difficulty: 1,
      questions: [
        { q: "What did he ﷺ ask Allah for the imams?", a: "Guidance", wrong: ["Wealth", "Fame", "Long life"], why: "O Allah, guide the imams and forgive the mu'adhdhins, he ﷺ said." },
        { q: "What did he ﷺ ask Allah for the mu'adhdhins?", a: "Forgiveness", wrong: ["Riches", "Strong voices", "Many children"], why: "Guide the imams and forgive the mu'adhdhins, he ﷺ said in his du'a." },
        { q: "He ﷺ called the mu'adhdhin one who is trusted.", tf: true, why: "The imam is responsible and the mu'adhdhin is trusted, he ﷺ said." }
      ]
    },
    {
      slug: "umm-sulaims-words",
      title: "Umm Sulaim's words",
      line: "Glorify, praise and magnify Allah ten times, then ask.",
      facts: ["Told by Anas ibn Malik", "Umm Sulaim asked for words for her prayer", "He will say: yes, yes"],
      source: hadith("nasai", "1299", "Anas ibn Malik", "Sahih (Darussalam)", "Anas ibn Malik said: Umm Sulaim came to the Prophet ﷺ and said: Messenger of Allah, teach me some words to supplicate with in my prayer. He said: glorify Allah ten times, praise Him ten times and magnify Him ten times, then ask Him for what you need; He will say: yes, yes.", "then ask Him for what you need; He will say"),
      difficulty: 1,
      questions: [
        { q: "How many times is each one said, he ﷺ taught?", a: "Ten times each", wrong: ["Once each", "Three times each", "A hundred times each"], why: "Glorify Allah ten times, praise Him ten times and magnify Him ten times, he ﷺ said." },
        { q: "Who asked him ﷺ for words to say in her prayer?", a: "Umm Sulaim", wrong: ["Umm Ayman", "Umm Haram", "Asma bint Abi Bakr"], why: "Umm Sulaim came to the Prophet ﷺ and said: teach me some words for my prayer." },
        { q: "After the ten of each, she was told to ask for her needs.", tf: true, why: "Then ask Him for what you need; He will say: yes, yes, he ﷺ told Umm Sulaim." }
      ]
    },
    {
      slug: "a-dua-for-light",
      title: "A du'a for light",
      line: "O Allah, place light in my heart, my tongue and my hearing.",
      facts: ["Told by Abdullah ibn Abbas", "Ibn Abbas spent the night at his ﷺ house", "Light before, behind and below me"],
      source: hadith("abudawud", "1353", "Abdullah ibn Abbas", "Sahih (Al-Albani)", "Abdullah ibn Abbas spent a night with the Prophet ﷺ and saw him pray at night. Then he ﷺ supplicated: O Allah, place light in my heart, light in my tongue, light in my hearing, light in my eyesight, light on my right and on my left, light in front of me, behind me and below me; O Allah, give me abundant light.", "O Allah, place light in my heart … O Allah, give me abundant light"),
      difficulty: 1,
      questions: [
        { q: "What did he ﷺ ask Allah to place in his heart?", a: "Light", wrong: ["Gold", "Fame", "Sleep"], why: "O Allah, place light in my heart, light in my tongue, light in my hearing, he ﷺ said." },
        { q: "Which of these is in his ﷺ du'a for light?", a: "Light in my hearing", wrong: ["Light in my pocket", "Light on my sword", "Light in my bag"], why: "Light in my hearing, light in my eyesight, he ﷺ asked of Allah." },
        { q: "He ﷺ asked Allah to give him abundant light.", tf: true, why: "O Allah, give me abundant light, he ﷺ said in his du'a." }
      ]
    },
    {
      slug: "the-istikharah",
      title: "The istikharah",
      line: "Before a task, pray two rak'ahs and ask Allah to choose.",
      facts: ["Told by Jabir ibn Abdullah", "Taught like a surah of the Quran", "Istikharah: asking Allah to guide your choice"],
      source: hadith("bukhari", "1166", "Jabir ibn Abdullah", "Sahih", "Jabir ibn Abdullah said: the Prophet ﷺ taught us the istikharah in all matters, as he taught us the surahs of the Quran. He said: if one of you means to do something, let him pray two rak'ahs other than the obligatory ones and then say: O Allah, I ask You to guide me by Your knowledge... You are capable and I am not; You know and I do not, and You know the unseen. Then he names his need.", "You are capable and I am not. You know and I do not and You know the unseen"),
      difficulty: 2,
      questions: [
        { q: "How many rak'ahs are prayed for the istikharah?", a: "Two, besides the obligatory", wrong: ["Four, with the obligatory", "One rak'ah only", "Six in a row"], why: "He should offer a two rak'ah prayer other than the compulsory ones, he ﷺ said." },
        { q: "In what matters did he ﷺ teach the istikharah?", a: "In all matters", wrong: ["Only in trade", "Only in travel", "Only in marriage"], why: "He taught us Istikhara in all matters, as he taught us the Suras of the Qur'an." },
        { q: "In the istikharah we say: You know and I do not.", tf: true, why: "You are capable and I am not. You know and I do not and You know the unseen." }
      ]
    },
    {
      slug: "four-before-asr",
      title: "Four before Asr",
      line: "He ﷺ asked mercy for one who prays four before Asr.",
      facts: ["Told by Abdullah ibn Umar", "Four rak'ahs before Asr", "A voluntary prayer, not obligatory"],
      source: hadith("abudawud", "1271", "Abdullah ibn Umar", "Hasan (Al-Albani)", "Abdullah ibn Umar said: the Prophet ﷺ said: may Allah show mercy to a man who prays four rak'ahs before the afternoon prayer.", "May Allah show mercy … before the afternoon prayer"),
      difficulty: 1,
      questions: [
        { q: "Before which prayer are these four rak'ahs?", a: "Asr, the afternoon prayer", wrong: ["Fajr, the dawn prayer", "Maghrib, the sunset prayer", "Isha, the night prayer"], why: "Who prays four rak'ahs before the afternoon prayer, he ﷺ said." },
        { q: "What did he ﷺ ask Allah for, for that man?", a: "Mercy", wrong: ["Riches", "A long life", "A big house"], why: "May Allah show mercy to a man who prays four rak'ahs before the afternoon prayer." },
        { q: "Four rak'ahs before Asr bring his ﷺ du'a for mercy.", tf: true, why: "May Allah show mercy to a man who prays four rak'ahs before the afternoon prayer." }
      ]
    },
    {
      slug: "the-muawwidhat-after-prayer",
      title: "The Mu'awwidhat after prayer",
      line: "He ﷺ told Uqbah to recite the Mu'awwidhat after every prayer.",
      facts: ["Told by Uqbah ibn Amir", "Mu'awwidhat: surahs of seeking refuge", "Recited once the prayer is over"],
      source: hadith("abudawud", "1523", "Uqbah ibn Amir", "Sahih (Al-Albani)", "Uqbah ibn Amir said: the Messenger of Allah ﷺ commanded me to recite the Mu'awwidhat after every prayer.", "commanded me to recite"),
      difficulty: 1,
      questions: [
        { q: "When was Uqbah told to recite the Mu'awwidhat?", a: "After every prayer", wrong: ["Only on Friday", "Only in Ramadan", "Only on Eid"], why: "The Messenger of Allah ﷺ commanded me to recite them after every prayer, Uqbah said." },
        { q: "Who said he was told to recite them after every prayer?", a: "Uqbah ibn Amir", wrong: ["Zayd ibn Thabit", "Salman al-Farisi", "Bilal ibn Rabah"], why: "The Messenger of Allah ﷺ commanded me to recite the Mu'awwidhat, Uqbah ibn Amir said." },
        { q: "The Mu'awwidhat are recited after every prayer.", tf: true, why: "Recite the Mu'awwidhat after every prayer, he ﷺ commanded Uqbah ibn Amir." }
      ]
    }
  ]
};

export const DUA_PRAYER_UNITS: readonly DeepUnit[] = [DUA_PRAYER];
