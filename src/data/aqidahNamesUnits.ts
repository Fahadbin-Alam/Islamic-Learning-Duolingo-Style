import { quran, quranQuote, type DeepUnit } from "./deepKit";

// Two more Aqidah units on the names of Allah, each name taught from the ayah it comes in. Only names that are
// written word for word in the Quran, with plain meanings every scholar agrees on.

const MERCY: DeepUnit = {
  key: "aqidah-names-mercy",
  topicId: "aqidah",
  branchId: "aqidah-names-mercy",
  branch: { title: "Names of Allah: His mercy", description: "Ar-Rahman, Al-Wadud, At-Tawwab, Al-Mujib and more: names that fill the heart with hope." },
  name: "names of Allah: His mercy",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "rahman-rahim",
      title: "Ar-Rahman, Ar-Rahim",
      line: "Allah is the Most Merciful, the Especially Merciful.",
      facts: ["Quran 1:3", "Said in every rak'ah"],
      quote: quranQuote(1, 3),
      source: quran(1, 3, "The Most Merciful, the Especially Merciful."),
      difficulty: 1,
      questions: [
        { q: "What do Ar-Rahman and Ar-Rahim tell us about Allah?", a: "He is full of mercy", wrong: ["He is far away", "He forgets us", "He is tired"], why: "The Most Merciful, the Especially Merciful." },
        { q: "In which surah do we say these names in every rak'ah?", a: "Al-Fatihah", wrong: ["Al-Kahf", "Yasin", "Al-Mulk"], why: "Quran 1:3 is in Al-Fatihah." },
        { q: "Ar-Rahman and Ar-Rahim both come from the word for mercy.", tf: true, why: "Rahmah means mercy." }
      ]
    },
    {
      slug: "wadud",
      title: "Al-Ghafur, Al-Wadud",
      line: "Allah is the Forgiving, the Loving.",
      facts: ["Quran 85:14", "Surah Al-Buruj"],
      quote: quranQuote(85, 14),
      source: quran(85, 14, "And He is the Forgiving, the Loving."),
      difficulty: 1,
      questions: [
        { q: "What does Al-Wadud mean?", a: "The Loving", wrong: ["The Angry", "The Sleeping", "The Hungry"], why: "And He is the Forgiving, the Loving." },
        { q: "Which name of Allah in Quran 85:14 means the Forgiving?", a: "Al-Ghafur", wrong: ["Al-Malik", "Al-Khaliq", "Al-Hayy"], why: "And He is the Forgiving, the Loving." },
        { q: "Allah loves those who obey Him and turn back to Him.", tf: true, why: "He is Al-Wadud, the Loving." }
      ]
    },
    {
      slug: "tawwab",
      title: "At-Tawwab",
      line: "Allah accepted Adam's repentance, for He is At-Tawwab.",
      facts: ["Quran 2:37", "He keeps accepting repentance"],
      quote: quranQuote(2, 37),
      source: quran(2, 37, "Then Adam received words from his Lord, and He accepted his repentance. Indeed, He is the Accepting of repentance, the Merciful."),
      difficulty: 1,
      questions: [
        { q: "Whose repentance does Quran 2:37 tell of?", a: "Adam's", wrong: ["Fir'awn's", "Qarun's", "Haman's"], why: "Then Adam received words from his Lord." },
        { q: "What does At-Tawwab mean?", a: "The One who accepts repentance", wrong: ["The One who never forgives", "The One who sleeps", "The One who forgets"], why: "Indeed, He is the Accepting of repentance." },
        { q: "After a mistake, we can always turn back to Allah.", tf: true, why: "He keeps accepting repentance, again and again." }
      ]
    },
    {
      slug: "qarib-mujib",
      title: "Al-Qarib, Al-Mujib",
      line: "Allah is near, and He answers the one who calls Him.",
      facts: ["Quran 2:186", "In the ayat of fasting"],
      quote: quranQuote(2, 186),
      source: quran(2, 186, "And when My servants ask you about Me, I am near. I answer the call of the caller when he calls upon Me."),
      difficulty: 1,
      questions: [
        { q: "How close is Allah to the one who calls Him?", a: "He is near", wrong: ["Very far away", "He cannot hear", "Only near on Eid"], why: "And when My servants ask you about Me, I am near." },
        { q: "What does Allah do when we make du'a?", a: "He answers the call", wrong: ["He ignores it", "He laughs at it", "He forgets it"], why: "I answer the call of the caller when he calls upon Me." },
        { q: "We need someone in between to talk to Allah.", tf: false, why: "Allah says: I am near. We call Him directly." }
      ]
    },
    {
      slug: "wahhab",
      title: "Al-Wahhab",
      line: "Allah is the Giver who gives freely, without limit.",
      facts: ["Quran 3:8", "A du'a for a steady heart"],
      quote: quranQuote(3, 8),
      source: quran(3, 8, "Our Lord, do not let our hearts turn away after You have guided us, and grant us mercy from Yourself. Indeed, You are the Bestower."),
      difficulty: 2,
      questions: [
        { q: "What does Al-Wahhab mean?", a: "The Bestower who gives freely", wrong: ["The One who takes back", "The Judge only", "The One who waits"], why: "Indeed, You are the Bestower." },
        { q: "What does the du'a in Quran 3:8 ask for first?", a: "That our hearts stay guided", wrong: ["Money and fame", "A big house", "A long trip"], why: "Do not let our hearts turn away after You have guided us." },
        { q: "In the same du'a we ask Allah for mercy from Himself.", tf: true, why: "And grant us mercy from Yourself." }
      ]
    },
    {
      slug: "shakur",
      title: "Ash-Shakur",
      line: "Allah rewards even a small good deed many times over.",
      facts: ["Quran 35:34", "Said by the people of Jannah"],
      quote: quranQuote(35, 34),
      source: quran(35, 34, "And they will say: praise be to Allah, who has removed all sorrow from us. Indeed, our Lord is Forgiving and Appreciative."),
      difficulty: 2,
      questions: [
        { q: "Who says the words of Quran 35:34?", a: "The people of Jannah", wrong: ["The people at the market", "The angels of the sea", "The jinn of the desert"], why: "They praise Allah who removed all sorrow from them." },
        { q: "What does Ash-Shakur mean?", a: "The Appreciative", wrong: ["The Forgetful", "The Careless", "The Stingy"], why: "Indeed, our Lord is Forgiving and Appreciative." },
        { q: "In Jannah, all sorrow is taken away.", tf: true, why: "Who has removed all sorrow from us." }
      ]
    }
  ]
};

const MAJESTY: DeepUnit = {
  key: "aqidah-names-majesty",
  topicId: "aqidah",
  branchId: "aqidah-names-majesty",
  branch: { title: "Names of Allah: His greatness", description: "Al-Hayy, Al-Quddus, Al-Khaliq, Al-Latif, Al-Wakil and Al-Hafiz: names that show His power." },
  name: "names of Allah: His greatness",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "hayy-qayyum",
      title: "Al-Hayy, Al-Qayyum",
      line: "Allah is the Ever-Living, who keeps all things going.",
      facts: ["Quran 2:255", "Ayat al-Kursi"],
      quote: quranQuote(2, 255),
      source: quran(2, 255, "Allah: there is no god except Him, the Ever-Living, the Sustainer of all. Neither drowsiness nor sleep overtakes Him."),
      difficulty: 1,
      questions: [
        { q: "What does Al-Hayy mean?", a: "The Ever-Living", wrong: ["The Sleeping", "The Tired", "The Young"], why: "The Ever-Living, the Sustainer of all." },
        { q: "Which famous ayah has these two names?", a: "Ayat al-Kursi", wrong: ["The last ayah of An-Nas", "The first ayah of Al-Kawthar", "The last ayah of Al-Asr"], why: "Quran 2:255 is Ayat al-Kursi." },
        { q: "Allah never gets sleepy and never sleeps.", tf: true, why: "Neither drowsiness nor sleep overtakes Him." }
      ]
    },
    {
      slug: "malik-quddus",
      title: "Al-Malik, Al-Quddus, As-Salam",
      line: "Allah is the King, the Most Pure, the Source of Peace.",
      facts: ["Quran 59:23", "Surah Al-Hashr"],
      quote: quranQuote(59, 23),
      source: quran(59, 23, "He is Allah, other than whom there is no god: the King, the Pure, the Source of Peace, the Giver of Safety, the Guardian."),
      difficulty: 1,
      questions: [
        { q: "What does Al-Malik mean?", a: "The King", wrong: ["The Servant", "The Traveller", "The Guest"], why: "The King, the Pure, the Source of Peace." },
        { q: "Which name means the Most Pure?", a: "Al-Quddus", wrong: ["Al-Malik", "Al-Khaliq", "Al-Wakil"], why: "Al-Quddus is the Pure, free of every fault." },
        { q: "As-Salam means Allah is the Source of Peace.", tf: true, why: "The Source of Peace." }
      ]
    },
    {
      slug: "khaliq",
      title: "Al-Khaliq, Al-Bari, Al-Musawwir",
      line: "Allah creates, brings to be, and gives each thing its shape.",
      facts: ["Quran 59:24", "To Him belong the best names"],
      quote: quranQuote(59, 24),
      source: quran(59, 24, "He is Allah, the Creator, the Inventor, the Fashioner; to Him belong the best names. Whatever is in the heavens and earth glorifies Him."),
      difficulty: 2,
      questions: [
        { q: "What does Al-Khaliq mean?", a: "The Creator", wrong: ["The Destroyer", "The Borrower", "The Copier"], why: "He is Allah, the Creator." },
        { q: "Which name means the One who gives each thing its shape?", a: "Al-Musawwir", wrong: ["Al-Malik", "As-Salam", "Al-Hayy"], why: "The Fashioner, who gives form." },
        { q: "Everything in the heavens and earth glorifies Allah.", tf: true, why: "Whatever is in the heavens and earth glorifies Him." }
      ]
    },
    {
      slug: "latif-khabir",
      title: "Al-Latif, Al-Khabir",
      line: "Allah knows the smallest, hidden things, and is All-Aware.",
      facts: ["Quran 67:14", "Surah Al-Mulk"],
      quote: quranQuote(67, 14),
      source: quran(67, 14, "Does He who created not know? And He is the Subtle, the All-Aware."),
      difficulty: 2,
      questions: [
        { q: "Who knows best what He created?", a: "Allah, the Creator", wrong: ["No one", "Only the stars", "Only the people"], why: "Does He who created not know?" },
        { q: "What does Al-Khabir mean?", a: "The All-Aware", wrong: ["The Unaware", "The Forgetful", "The Distant"], why: "And He is the Subtle, the All-Aware." },
        { q: "Al-Latif means His kindness and knowledge reach even hidden things.", tf: true, why: "He is the Subtle." }
      ]
    },
    {
      slug: "wakil",
      title: "Al-Wakil",
      line: "Allah is enough for us; we trust our affairs to Him.",
      facts: ["Quran 3:173", "Hasbunallahu wa ni'mal wakil"],
      quote: quranQuote(3, 173),
      source: quran(3, 173, "Those to whom people said: the people have gathered against you, so fear them. But it increased them in faith, and they said: Allah is enough for us, and He is the best Disposer of affairs."),
      difficulty: 2,
      questions: [
        { q: "What did the believers say when told an army had gathered?", a: "Allah is enough for us", wrong: ["We give up", "Let us run away", "We are alone"], why: "They said: Allah is enough for us." },
        { q: "What does Al-Wakil mean?", a: "The One we trust with our affairs", wrong: ["The One who is weak", "The One who sleeps", "The One who is far"], why: "He is the best Disposer of affairs." },
        { q: "The threat made their faith grow stronger.", tf: true, why: "But it increased them in faith." }
      ]
    },
    {
      slug: "hafiz",
      title: "Al-Hafiz",
      line: "Allah is the best Guardian, the Most Merciful of all.",
      facts: ["Quran 12:64", "Said by Prophet Ya'qub"],
      quote: quranQuote(12, 64),
      source: quran(12, 64, "Allah is the best Guardian, and He is the Most Merciful of the merciful."),
      difficulty: 2,
      questions: [
        { q: "Who said that Allah is the best Guardian?", a: "Prophet Ya'qub", wrong: ["Prophet Nuh", "Prophet Hud", "Prophet Salih"], why: "He said it when his sons asked to take Binyamin." },
        { q: "What does Al-Hafiz mean?", a: "The Guardian who protects", wrong: ["The Forgetful", "The Careless", "The Weak"], why: "Allah is the best Guardian." },
        { q: "Ya'qub trusted Allah to protect his son.", tf: true, why: "Allah is the best Guardian." }
      ]
    }
  ]
};

export const AQIDAH_NAMES_UNITS: DeepUnit[] = [MERCY, MAJESTY];
