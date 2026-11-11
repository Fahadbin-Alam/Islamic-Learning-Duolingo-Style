import { hadith, quran, quranQuote, type DeepUnit } from "./deepKit";
import { EASY_WAY } from "./introEasyUnits";

// "New to Islam" in more depth: the essentials a new Muslim needs, each told with the story around it. A fresh
// start, the Quran and the Prophet ﷺ, the first prayers, and daily life (food, family, greeting). Only what is
// clear and agreed on, each card from one ayah or one sahih or hasan hadith (number and grade as sunnah.com gives
// them). Each unit opens on its own, like the rest of the beginner topic.

const FRESH_START: DeepUnit = {
  key: "fresh-start",
  topicId: "intro",
  branchId: "intro-fresh-start",
  branch: { title: "A fresh start", description: "Past sins wiped away, good deeds kept, and learning Islam one step at a time." },
  name: "a fresh start",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "islam-wipes-the-past",
      title: "Islam wipes the past",
      line: "Amr ibn al-As once hated the Prophet ﷺ, then became Muslim.",
      facts: [
        "He held back his hand and asked to be forgiven first.",
        "The Prophet ﷺ said: Islam wipes out all that came before.",
        "Amr later said no one was dearer to him than the Prophet ﷺ."
      ],
      source: hadith("muslim", "121", "Amr ibn al-As", "Sahih", "Amr ibn al-As told how he came to the Prophet ﷺ to accept Islam and held back his hand, asking to be forgiven. The Prophet ﷺ said: Do you not know that Islam wipes out all that came before it?", "Islam wipes out all the previous (misdeeds)"),
      difficulty: 1,
      questions: [
        { q: "What did Amr ask for before giving his pledge?", a: "To be forgiven", wrong: ["A horse", "A house in Madinah", "To lead the army"], why: "He set one condition: that he should be pardoned." },
        { q: "What does Islam do to the sins before it?", a: "Wipes them out", wrong: ["Doubles them", "Keeps them all", "Writes them twice"], why: "Islam wipes out all the previous misdeeds." },
        { q: "A new Muslim starts with a clean page.", tf: true, why: "Islam wipes out what came before it." }
      ]
    },
    {
      slug: "good-deeds-kept",
      title: "Your good deeds are kept",
      line: "Hakim ibn Hizam gave charity and freed slaves before Islam.",
      facts: [
        "He asked: will I be rewarded for what I did before?",
        "The Prophet ﷺ said: you became Muslim with all that good.",
        "The good a new Muslim did before Islam is not lost."
      ],
      source: hadith("bukhari", "1436", "Hakim bin Hizam", "Sahih", "Hakim bin Hizam asked about the charity, freeing of slaves and kindness to relatives he did before Islam. The Prophet ﷺ said: You became Muslim with all those good deeds.", "You became Muslim with all those good deeds"),
      difficulty: 1,
      questions: [
        { q: "What did Hakim ask the Prophet ﷺ?", a: "If his old good deeds count", wrong: ["Where to live", "How to fast", "Whom to marry"], why: "He asked if he would be rewarded for the good he did before Islam." },
        { q: "Which good deed did Hakim do before Islam?", a: "He gave in charity", wrong: ["He built the Kaaba", "He wrote the Quran", "He led the prayer"], why: "He gave in charity, freed slaves and was kind to his relatives." },
        { q: "The good a person did before Islam is thrown away.", tf: false, why: "You became Muslim with all those good deeds, he ﷺ said." }
      ]
    },
    {
      slug: "sins-turned-to-good",
      title: "Sins turned into good deeds",
      line: "Allah turns the bad deeds of those who repent into good deeds.",
      facts: [
        "The ayah names three things: repent, believe, do good.",
        "Allah does not only forgive the sins; He changes them.",
        "Allah ends the ayah: He is Forgiving and Merciful."
      ],
      quote: quranQuote(25, 70),
      source: quran(25, 70, "Except for those who repent, believe and do righteous work. For them Allah will replace their evil deeds with good. And Allah is ever Forgiving and Merciful."),
      difficulty: 1,
      questions: [
        { q: "What does Allah do with the bad deeds of one who repents?", a: "Changes them into good", wrong: ["Shows them to everyone", "Keeps them forever", "Makes them bigger"], why: "Allah will replace their evil deeds with good." },
        { q: "Which is one of the three things the ayah names?", a: "To do good deeds", wrong: ["To travel far", "To become rich", "To stay silent"], why: "Those who repent, believe and do righteous work." },
        { q: "The ayah ends by calling Allah Forgiving and Merciful.", tf: true, why: "And Allah is ever Forgiving and Merciful." }
      ]
    },
    {
      slug: "mercy-is-wide",
      title: "Allah's mercy is wide",
      line: "He ﷺ told a Bedouin: do not narrow Allah's wide mercy.",
      facts: [
        "A Bedouin prayed: O Allah, have mercy on me and Muhammad only.",
        "After the prayer, the Prophet ﷺ said: you have narrowed something vast.",
        "He meant Allah's mercy, which is wide enough for everyone."
      ],
      source: hadith("bukhari", "6010", "Abu Hurairah", "Sahih", "A Bedouin prayed aloud: O Allah, have mercy on me and on Muhammad, and on no one else with us. When the Prophet ﷺ finished the prayer, he said to him: you have narrowed something very vast, meaning Allah's mercy.", "Bestow Your Mercy on me and Muhammad only and do not bestow it on anybody else along with us"),
      difficulty: 1,
      questions: [
        { q: "What did the Bedouin ask for in his du'a?", a: "Mercy for him and the Prophet ﷺ only", wrong: ["Rain for his camels", "Gold for his tribe", "A long life"], why: "O Allah, bestow Your mercy on me and Muhammad only." },
        { q: "What did he ﷺ tell the Bedouin after the prayer?", a: "You narrowed something vast", wrong: ["Pray it again", "Make your du'a longer", "Say it louder"], why: "You have limited a very vast thing, meaning Allah's mercy." },
        { q: "Allah's mercy is wide enough for everyone.", tf: true, why: "He called Allah's mercy a very vast thing." }
      ]
    },
    {
      slug: "everyone-makes-mistakes",
      title: "Everyone makes mistakes",
      line: "Every child of Adam sins; the best ones repent to Allah.",
      facts: [
        "No one is perfect, old Muslim or new.",
        "To repent is to feel sorry and turn back to Allah.",
        "A slip is a reason to repent, not to give up."
      ],
      source: hadith("tirmidhi", "2499", "Anas ibn Malik", "Hasan", "The Prophet ﷺ said: Every son of Adam sins, and the best of those who sin are those who repent.", "the best of the sinners are the repentant"),
      difficulty: 1,
      questions: [
        { q: "Who are the best of those who sin?", a: "Those who repent", wrong: ["Those who hide it", "Those who never pray", "Those who blame others"], why: "The best of the sinners are the repentant." },
        { q: "What should you do after a mistake?", a: "Turn back to Allah", wrong: ["Give up on Islam", "Stop praying", "Hide from people"], why: "To repent is to turn back to Allah, and the repentant are the best." },
        { q: "Only bad people ever make mistakes.", tf: false, why: "Every son of Adam sins, he ﷺ said." }
      ]
    },
    {
      slug: "step-by-step",
      title: "The Quran came step by step",
      line: "Aishah said the first surahs spoke of Paradise and the Fire.",
      facts: [
        "Only when hearts were firm did rules on halal and haram come.",
        "Had the first ayah been: leave wine, people would have refused.",
        "A new Muslim can learn the same way, one step at a time."
      ],
      source: hadith("bukhari", "4993", "Aishah", "Sahih", "Aishah said: The first to be revealed were surahs that mention Paradise and the Fire. When people had embraced Islam, the ayahs on what is lawful and unlawful were revealed. Had the first thing been: do not drink wine, they would have said: we will never leave it.", "When the people embraced Islam, the Verses regarding legal and illegal things were revealed"),
      difficulty: 2,
      questions: [
        { q: "What did the first surahs speak about, Aishah said?", a: "Paradise and the Fire", wrong: ["Trade rules", "Rules of war", "The laws of inheritance"], why: "The first revealed mentioned Paradise and the Fire." },
        { q: "When did the rules on halal and haram come?", a: "After people embraced Islam", wrong: ["On the very first day", "Before the Prophet ﷺ was born", "Never"], why: "When the people embraced Islam, the ayahs on legal and illegal things came." },
        { q: "Islam was taught to people all at once, on one day.", tf: false, why: "The faith came first, then the rules, step by step." }
      ]
    },
    {
      slug: "kabah-left-as-it-was",
      title: "Gentle with people new to Islam",
      line: "He ﷺ did not rebuild the Ka'bah, as Quraysh were new to Islam.",
      facts: [
        "Quraysh had rebuilt the Ka'bah smaller than Ibrahim's foundations.",
        "Aishah asked: why not rebuild it on Ibrahim's foundations?",
        "He ﷺ left it, so hearts new to Islam would not be troubled."
      ],
      source: hadith("bukhari", "1583", "Aishah", "Sahih", "The Prophet ﷺ said to Aishah: when your people rebuilt the Ka'bah, they made it smaller than the foundations Ibrahim laid. She asked: why not rebuild it on Ibrahim's foundations? He said: were it not that your people have only just left the days of ignorance, I would have done it.", "Were it not for the fact that your people are close to the Pre-Islamic Period of ignorance"),
      difficulty: 2,
      questions: [
        { q: "Whose foundations did the Ka'bah not fully stand on?", a: "Ibrahim's", wrong: ["Nuh's", "Sulayman's", "Musa's"], why: "They decreased it from its original foundation laid by Abraham." },
        { q: "Why did he ﷺ not rebuild the Ka'bah?", a: "His people were new to Islam", wrong: ["There was no stone", "It was too far away", "Aishah did not want it"], why: "Your people are close to the Pre-Islamic Period of ignorance." },
        { q: "Being gentle with people new to Islam is part of his ﷺ way.", tf: true, why: "He said: were it not that your people are new to Islam, I would have done so." }
      ]
    },
    {
      slug: "what-comes-first",
      title: "What comes first",
      line: "The Prophet ﷺ sent Mu'adh to Yemen with an order to teach.",
      facts: [
        "First: invite them to the shahadah.",
        "If they accept: teach them the five daily prayers.",
        "Then teach them zakat, taken from the rich for the poor."
      ],
      source: hadith("bukhari", "1395", "Ibn Abbas", "Sahih", "The Prophet ﷺ sent Mu'adh to Yemen and said: Invite them to testify that none has the right to be worshipped but Allah and I am His Messenger. If they accept, teach them that Allah has enjoined five prayers every day and night, then zakat, taken from their rich and given to their poor.", "Allah has enjoined on them five prayers in every day and night"),
      difficulty: 2,
      questions: [
        { q: "Where did the Prophet ﷺ send Mu'adh?", a: "To Yemen", wrong: ["To Egypt", "To Persia", "To Syria"], why: "The Prophet ﷺ sent Mu'adh to Yemen." },
        { q: "What did Mu'adh teach first?", a: "The shahadah", wrong: ["Zakat", "Hajj", "Fasting"], why: "First invite them to testify that none is worshipped but Allah." },
        { q: "What came right after the shahadah?", a: "The five daily prayers", wrong: ["Zakat", "Hajj", "Learning Arabic"], why: "Then teach them the five prayers every day and night." }
      ]
    },
    {
      slug: "dimam-asks",
      title: "Ask until you are sure",
      line: "Dimam asked the Prophet ﷺ hard questions, then believed.",
      facts: [
        "He came on a camel and asked: which of you is Muhammad?",
        "He asked by Allah about the prayers, the fast and zakat.",
        "Then he said: I believe in all you were sent with; my people sent me."
      ],
      source: hadith("bukhari", "63", "Anas ibn Malik", "Sahih", "A man rode into the masjid and said: I will ask you hard questions, so do not be angry. The Prophet ﷺ said: ask whatever you want. He asked, by Allah, whether Allah had sent him to all people and had ordered five prayers, the fast of Ramadan and zakat, and each time he ﷺ said: by Allah, yes. The man said: I believe in all you have brought; I am Dimam ibn Tha'labah.", "I have believed in all that with which you have been sent"),
      difficulty: 2,
      questions: [
        { q: "What did Dimam ask before his questions?", a: "Not to be angry with him", wrong: ["Some water to drink", "A place to rest", "A gift for his people"], why: "He said: I will be hard in questioning, so do not get angry." },
        { q: "What did the Prophet ﷺ answer him?", a: "Ask whatever you want", wrong: ["Come back tomorrow", "Ask someone else", "Ask only one thing"], why: "He ﷺ also said: I am here to answer your questions." },
        { q: "A person may ask even hard questions about Islam.", tf: true, why: "Dimam said he would be hard in questioning, and the Prophet ﷺ said: Ask whatever you want." }
      ]
    },
    {
      slug: "thumamah",
      title: "From most disliked to most loved",
      line: "Freed with kindness, Thumamah chose Islam on his own.",
      facts: [
        "For three days the Prophet ﷺ asked him: what do you say, Thumamah?",
        "Then he ﷺ set him free, and Thumamah came back a Muslim.",
        "He said: your face is now the most beloved face to me."
      ],
      source: hadith("bukhari", "4372", "Abu Hurairah", "Sahih", "Thumamah ibn Uthal was brought to the masjid and tied to a pillar. For three days the Prophet ﷺ asked him what he had to say, then said: set Thumamah free. He went out, came back into the masjid and testified that none is worshipped but Allah and that Muhammad is His Messenger. He said: by Allah, no face on earth was more disliked by me than yours, and now yours is the most beloved face to me.", "but now your face has become the most beloved face to me"),
      difficulty: 2,
      questions: [
        { q: "What did the Prophet ﷺ say on the third day?", a: "Set Thumamah free", wrong: ["Send him to Makkah", "Keep him for a year", "Make him pay gold"], why: "The Prophet ﷺ said: Release Thumama." },
        { q: "How did Thumamah feel about the Prophet ﷺ after Islam?", a: "He loved him most of all", wrong: ["He still disliked him", "He did not care", "He was afraid of him"], why: "Now your face has become the most beloved face to me." },
        { q: "Kindness can open a person's heart to Islam.", tf: true, why: "He was set free, then came back on his own and said the shahadah." }
      ]
    }
  ]
};

const QURAN_AND_PROPHET: DeepUnit = {
  key: "meet-the-quran",
  topicId: "intro",
  branchId: "intro-quran-prophet",
  branch: { title: "The Quran and the Prophet ﷺ", description: "How the Quran began, why it is read, and loving and blessing the Prophet ﷺ." },
  name: "the Quran and the Prophet ﷺ",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "first-revelation",
      title: "The first word: Read",
      line: "The Prophet ﷺ used to worship alone in the cave of Hira.",
      facts: [
        "The angel Jibril came and said to him: Read!",
        "The first ayahs: Read in the name of your Lord who created.",
        "He ﷺ went home to Khadijah, and she comforted him."
      ],
      source: hadith("bukhari", "3", "Aishah", "Sahih", "Aishah told how revelation began: the Prophet ﷺ worshipped in the cave of Hira until the angel came and said: Read. Then he recited: Read in the name of your Lord who created. He returned to Khadijah, who comforted him.", "Read in the name of your Lord, who has created (all that exists)"),
      difficulty: 1,
      questions: [
        { q: "Where was the Prophet ﷺ when the first ayahs came?", a: "In the cave of Hira", wrong: ["In Madinah", "At the Kaaba", "On a ship"], why: "He used to worship in the cave of Hira." },
        { q: "What was the first word Jibril said to him?", a: "Read", wrong: ["Pray", "Write", "Listen"], why: "The angel said: Read, and then: Read in the name of your Lord." },
        { q: "Who comforted the Prophet ﷺ when he came home?", a: "Khadijah", wrong: ["Abu Bakr", "Aishah", "Abu Talib"], why: "He went to Khadijah, and she said: Allah will never disgrace you." }
      ]
    },
    {
      slug: "quran-kept-safe",
      title: "The Quran is kept safe",
      line: "Allah sent down the Quran, and Allah Himself guards it.",
      facts: [
        "Its words today are the words the Prophet ﷺ recited.",
        "Muslims learn it by heart in every generation.",
        "The Arabic of the Quran is the Quran; a translation explains it."
      ],
      quote: quranQuote(15, 9),
      source: quran(15, 9, "Indeed, it is We who sent down the message, and indeed, We will be its guardian."),
      difficulty: 1,
      questions: [
        { q: "Who guards the Quran, as the ayah says?", a: "Allah", wrong: ["Only the kings", "Nobody", "One family"], why: "We sent down the message, and We will be its guardian." },
        { q: "What is a translation of the Quran for?", a: "To explain its meaning", wrong: ["To replace the Arabic", "To change its words", "To shorten it"], why: "The Arabic is the Quran; a translation explains what it means." },
        { q: "The Quran Muslims read today is the one the Prophet ﷺ recited.", tf: true, why: "Allah promised to guard the message He sent down." }
      ]
    },
    {
      slug: "learn-and-teach",
      title: "The best of you",
      line: "The best people are those who learn the Quran and teach it.",
      facts: [
        "Uthman ibn Affan heard the Prophet ﷺ say so.",
        "Learning even one short surah is a start.",
        "Teaching what you know, even to one person, counts too."
      ],
      source: hadith("bukhari", "5027", "Uthman ibn Affan", "Sahih", "The Prophet ﷺ said: The best among you are those who learn the Quran and teach it.", "The best among you (Muslims) are those who learn the Qur"),
      difficulty: 1,
      questions: [
        { q: "Who are the best people, by this saying?", a: "Those who learn and teach the Quran", wrong: ["The richest people", "The strongest people", "The oldest people"], why: "The best among you are those who learn the Quran and teach it." },
        { q: "Who heard the Prophet ﷺ say it and passed it on?", a: "Uthman ibn Affan", wrong: ["Umar ibn al-Khattab", "Ali ibn Abi Talib", "Bilal"], why: "The hadith is narrated by Uthman." },
        { q: "You must know the whole Quran before teaching any of it.", tf: false, why: "Teaching even one short surah you know is part of it." }
      ]
    },
    {
      slug: "ten-for-each-letter",
      title: "Ten rewards a letter",
      line: "Each letter you read from the Quran brings ten rewards.",
      facts: [
        "He ﷺ said: Alif Lam Mim is not one letter.",
        "Alif is a letter, Lam is a letter, Mim is a letter.",
        "So even a slow, careful reader earns a great deal."
      ],
      source: hadith("tirmidhi", "2910", "Abdullah ibn Mas'ud", "Sahih", "The Prophet ﷺ said: Whoever reads a letter from the Book of Allah has a reward, and the reward is multiplied ten times. I do not say Alif Lam Mim is a letter; Alif is a letter, Lam is a letter and Mim is a letter.", "Alif is a letter, Lam is a letter and Mim is a letter"),
      difficulty: 1,
      questions: [
        { q: "How many rewards does one letter of the Quran bring?", a: "Ten", wrong: ["One", "Three", "Seven"], why: "He receives the reward of ten the like of it." },
        { q: "How many letters are in Alif Lam Mim, he ﷺ said?", a: "Three", wrong: ["One", "Two", "Ten"], why: "Alif is a letter, Lam is a letter and Mim is a letter." },
        { q: "A slow reader of the Quran still earns reward for every letter.", tf: true, why: "Each letter read brings its reward, multiplied ten times." }
      ]
    },
    {
      slug: "mercy-to-the-worlds",
      title: "A mercy to the worlds",
      line: "Allah sent the Prophet ﷺ as a mercy to all the worlds.",
      facts: [
        "His mercy reached people, children and animals.",
        "The worlds means everything Allah created.",
        "Muslims follow him ﷺ to learn how to live with mercy."
      ],
      quote: quranQuote(21, 107),
      source: quran(21, 107, "And We have not sent you, O Muhammad, except as a mercy to the worlds."),
      difficulty: 1,
      questions: [
        { q: "Why did Allah send the Prophet ﷺ, as the ayah says?", a: "As a mercy to the worlds", wrong: ["To become a king", "To gather wealth", "To win fame"], why: "We have not sent you except as a mercy to the worlds." },
        { q: "Whom did his mercy reach?", a: "People and animals alike", wrong: ["Only his family", "Only the rich", "Only Arabs"], why: "His mercy reached people, children and animals." },
        { q: "The Prophet's ﷺ mercy was only for Muslims.", tf: false, why: "He was sent as a mercy to all the worlds." }
      ]
    },
    {
      slug: "loving-the-prophet",
      title: "Loving the Prophet ﷺ",
      line: "Faith is complete when you love the Prophet ﷺ more than anyone.",
      facts: [
        "More than your father, your children and all people.",
        "Love shows in learning his life and following him.",
        "Anas served him ﷺ for years and passed on this saying."
      ],
      source: hadith("bukhari", "15", "Anas ibn Malik", "Sahih", "The Prophet ﷺ said: None of you will have faith till he loves me more than his father, his children and all mankind.", "None of you will have faith till he loves me more than his father"),
      difficulty: 2,
      questions: [
        { q: "Whom should a believer love more than all people?", a: "The Prophet ﷺ", wrong: ["Himself only", "His richest friend", "A king"], why: "Till he loves me more than his father, his children and all mankind." },
        { q: "How does love of the Prophet ﷺ show?", a: "By following his way", wrong: ["By shouting his name", "By never reading", "By staying home"], why: "Love shows in learning his life and following him." },
        { q: "Which companion passed on this saying?", a: "Anas ibn Malik", wrong: ["Abu Bakr", "Khalid ibn al-Walid", "Bilal"], why: "The hadith is narrated by Anas." }
      ]
    },
    {
      slug: "blessings-on-him",
      title: "Sending blessings",
      line: "Whoever sends one blessing on the Prophet ﷺ gets ten from Allah.",
      facts: [
        "Saying sallallahu alayhi wa sallam is sending a blessing.",
        "The sign ﷺ after his name stands for those words.",
        "One short phrase, and Allah blesses you ten times."
      ],
      source: hadith("muslim", "408", "Abu Hurairah", "Sahih", "The Prophet ﷺ said: Whoever sends blessings on me once, Allah will send blessings on him ten times.", "He who blesses me once, Allah would bless him ten times"),
      difficulty: 1,
      questions: [
        { q: "How many blessings does Allah send for one?", a: "Ten", wrong: ["One", "Two", "Five"], why: "He who blesses me once, Allah would bless him ten times." },
        { q: "What does the sign ﷺ after his name stand for?", a: "Sallallahu alayhi wa sallam", wrong: ["Bismillah", "Alhamdulillah", "Insha'Allah"], why: "The sign stands for the words of blessing on him." },
        { q: "Sending blessings on the Prophet ﷺ brings blessings back to you.", tf: true, why: "Allah blesses him ten times who blesses the Prophet ﷺ once." }
      ]
    }
  ]
};

const FIRST_PRAYERS: DeepUnit = {
  key: "first-prayers",
  topicId: "intro",
  branchId: "intro-first-prayers",
  branch: { title: "Your first prayers", description: "Facing the qiblah, takbir to taslim, Al-Fatihah, praying as you are able, and Friday." },
  name: "your first prayers",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "facing-the-qiblah",
      title: "Facing the qiblah",
      line: "Muslims everywhere pray facing the Kaaba in Makkah.",
      facts: [
        "At first the Muslims prayed toward Jerusalem.",
        "The Prophet ﷺ kept looking at the sky, hoping for a change.",
        "Allah turned the qiblah to the Sacred Mosque in Makkah."
      ],
      quote: quranQuote(2, 144),
      source: quran(2, 144, "We have seen the turning of your face toward the heaven, and We will surely turn you to a qiblah with which you will be pleased. So turn your face toward al-Masjid al-Haram. And wherever you are, turn your faces toward it."),
      difficulty: 1,
      questions: [
        { q: "Which way do Muslims face to pray?", a: "Toward the Kaaba", wrong: ["Toward the sunrise", "Any way at all", "Toward the nearest hill"], why: "Turn your face toward al-Masjid al-Haram, wherever you are." },
        { q: "Why did the Prophet ﷺ keep looking at the sky?", a: "He hoped for a new qiblah", wrong: ["He was counting stars", "He was waiting for rain", "He was lost"], why: "We have seen the turning of your face toward the heaven." },
        { q: "Only people in Makkah must face the Kaaba.", tf: false, why: "Wherever you are, turn your faces toward it." }
      ]
    },
    {
      slug: "takbir-to-taslim",
      title: "From takbir to taslim",
      line: "Prayer opens with Allahu Akbar and ends with as-salamu alaykum.",
      facts: [
        "Wudu is the key: you need it before you pray.",
        "Saying Allahu Akbar is the takbir that starts the prayer.",
        "Saying as-salamu alaykum is the taslim that ends it."
      ],
      source: hadith("abudawud", "61", "Ali ibn Abi Talib", "Hasan Sahih (Al-Albani)", "The Prophet ﷺ said: The key to prayer is purification; it begins with the takbir and ends with the taslim.", "The key to prayer is purification"),
      difficulty: 1,
      questions: [
        { q: "What is the key to prayer?", a: "Purification", wrong: ["A loud voice", "A prayer mat", "A watch"], why: "The key to prayer is purification." },
        { q: "What words begin every prayer?", a: "Allahu Akbar", wrong: ["Alhamdulillah", "As-salamu alaykum", "Amin"], why: "Its beginning is the takbir: Allahu Akbar." },
        { q: "Prayer ends with the taslim, as-salamu alaykum.", tf: true, why: "Its end is the taslim." }
      ]
    },
    {
      slug: "al-fatihah",
      title: "Al-Fatihah in every prayer",
      line: "Surah Al-Fatihah is read in every unit of the prayer.",
      facts: [
        "It is the first surah of the Quran, only seven ayahs.",
        "It praises Allah and asks Him to guide us.",
        "It is the first surah a new Muslim learns by heart."
      ],
      source: hadith("bukhari", "756", "Ubadah ibn as-Samit", "Sahih", "The Prophet ﷺ said: Whoever does not recite Al-Fatihah in his prayer, his prayer is not valid.", "Whoever does not recite Al-Fatiha in his prayer, his prayer is invalid"),
      difficulty: 1,
      questions: [
        { q: "Which surah is read in every prayer?", a: "Al-Fatihah", wrong: ["Al-Baqarah", "Yasin", "Al-Kahf"], why: "Whoever does not recite Al-Fatihah in his prayer, his prayer is invalid." },
        { q: "How many ayahs does Al-Fatihah have?", a: "Seven", wrong: ["Three", "Ten", "Twenty"], why: "Al-Fatihah is seven ayahs long." },
        { q: "Al-Fatihah asks Allah to guide us.", tf: true, why: "It praises Allah and asks Him for guidance." }
      ]
    },
    {
      slug: "pray-as-you-can",
      title: "Pray as you are able",
      line: "Imran ibn Husayn was ill and asked how he should pray.",
      facts: [
        "Pray standing; if you cannot, pray sitting.",
        "If you cannot sit, pray lying on your side.",
        "Prayer goes with you, even when you are sick."
      ],
      source: hadith("bukhari", "1117", "Imran ibn Husayn", "Sahih", "Imran bin Husain was ill and asked the Prophet ﷺ about prayer. He said: Pray standing, and if you cannot, then sitting, and if you cannot, then lying on your side.", "pray while sitting and if you cannot do even that, then pray Lying on your side"),
      difficulty: 1,
      questions: [
        { q: "Why did Imran ask about the prayer?", a: "He was ill", wrong: ["He was travelling", "He forgot the words", "He was a child"], why: "He was ill, so he asked how to pray." },
        { q: "If you cannot stand, how do you pray?", a: "Sitting", wrong: ["You skip it", "Running", "Only in your mind"], why: "If you cannot stand, pray while sitting." },
        { q: "Someone who cannot sit may pray lying on their side.", tf: true, why: "If you cannot do even that, pray lying on your side." }
      ]
    },
    {
      slug: "friday-prayer",
      title: "The Friday prayer",
      line: "On Friday, Muslims leave trade and go to the Jumu'ah prayer.",
      facts: [
        "Jumu'ah is the Friday prayer, held at midday in the mosque.",
        "When the call is made, buying and selling stop.",
        "Allah says in the ayah: this is better for you."
      ],
      quote: quranQuote(62, 9),
      source: quran(62, 9, "O you who have believed, when the call is made for prayer on the day of Jumu'ah, then proceed to the remembrance of Allah and leave trade. That is better for you, if you only knew."),
      difficulty: 2,
      questions: [
        { q: "On which day is the Jumu'ah prayer?", a: "Friday", wrong: ["Sunday", "Monday", "Saturday"], why: "The call is made for prayer on the day of Jumu'ah, Friday." },
        { q: "What does the ayah say to leave for the prayer?", a: "Trade", wrong: ["Your family", "Your home town", "Your name"], why: "Proceed to the remembrance of Allah and leave trade." },
        { q: "Allah says going to Jumu'ah is better for us.", tf: true, why: "That is better for you, if you only knew." }
      ]
    }
  ]
};

const DAILY_LIFE: DeepUnit = {
  key: "daily-life",
  topicId: "intro",
  branchId: "intro-daily-life",
  branch: { title: "Daily life as a Muslim", description: "Halal and haram food, eating with bismillah, family who are not Muslim, and the salam." },
  name: "daily life as a Muslim",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "good-and-lawful",
      title: "Eat what is good",
      line: "Allah says: eat what is lawful and good on the earth.",
      facts: [
        "Halal means allowed; haram means not allowed.",
        "Most food is halal; only a few things are haram.",
        "The ayah also warns: do not follow the steps of Shaytan."
      ],
      source: quran(2, 168, "O mankind, eat from whatever is on earth that is lawful and good, and do not follow the footsteps of Satan. Indeed, he is to you a clear enemy."),
      difficulty: 1,
      questions: [
        { q: "What does halal mean?", a: "Allowed", wrong: ["Forbidden", "Expensive", "Sweet"], why: "Halal means allowed, and haram means not allowed." },
        { q: "What does the ayah tell people to eat?", a: "What is lawful and good", wrong: ["Only bread", "Only meat", "Nothing at all"], why: "Eat from whatever is on earth that is lawful and good." },
        { q: "Most food in the world is haram.", tf: false, why: "Most food is halal; only a few things are haram." }
      ]
    },
    {
      slug: "what-is-haram",
      title: "The few foods that are haram",
      line: "The Quran names the foods that are haram: few, and clear.",
      facts: [
        "Dead animals, blood, pork, and what was offered to other gods.",
        "In real need, with no other food, one may eat to survive.",
        "Allah ends the ayah: He is Forgiving and Merciful."
      ],
      quote: quranQuote(2, 173),
      source: quran(2, 173, "He has only forbidden to you dead animals, blood, the flesh of swine, and that which has been dedicated to other than Allah. But whoever is forced by necessity, neither desiring it nor going beyond, there is no sin upon him. Indeed, Allah is Forgiving and Merciful."),
      difficulty: 1,
      questions: [
        { q: "Which meat does the ayah forbid?", a: "Pork", wrong: ["Chicken", "Lamb", "Fish"], why: "He has forbidden the flesh of swine." },
        { q: "What if someone has no other food and must eat?", a: "There is no sin on them", wrong: ["They must starve", "They leave Islam", "They pay a fine"], why: "Whoever is forced by necessity, there is no sin upon him." },
        { q: "Blood is one of the things the ayah forbids.", tf: true, why: "He has forbidden dead animals, blood and the flesh of swine." }
      ]
    },
    {
      slug: "wine-and-gambling",
      title: "No alcohol, no gambling",
      line: "Allah calls alcohol and gambling the work of Shaytan.",
      facts: [
        "Khamr is any drink that clouds the mind.",
        "Gambling is betting money on luck.",
        "Allah says: avoid them, so that you may succeed."
      ],
      quote: quranQuote(5, 90),
      source: quran(5, 90, "O you who have believed, intoxicants, gambling, stone altars and divining arrows are but defilement from the work of Satan, so avoid it that you may be successful."),
      difficulty: 1,
      questions: [
        { q: "Whose work does the ayah call alcohol and gambling?", a: "Shaytan's", wrong: ["The angels'", "The traders'", "The kings'"], why: "They are defilement from the work of Satan." },
        { q: "What is gambling?", a: "Betting money on luck", wrong: ["Saving money", "Giving charity", "Lending to a friend"], why: "Gambling is betting money on luck." },
        { q: "Allah says to avoid them so that you may succeed.", tf: true, why: "So avoid it that you may be successful." }
      ]
    },
    {
      slug: "clear-and-unclear",
      title: "Clear, and in between",
      line: "Halal is clear, haram is clear; doubtful things lie between.",
      facts: [
        "Many people do not know the doubtful things.",
        "Staying away from them keeps your faith and honour safe.",
        "When you are unsure, ask someone who knows."
      ],
      source: hadith("bukhari", "52", "An-Nu'man bin Bashir", "Sahih", "The Prophet ﷺ said: What is lawful is clear and what is unlawful is clear, and between them are doubtful matters that many people do not know. Whoever avoids the doubtful keeps his religion and honour safe.", "Both legal and illegal things are evident"),
      difficulty: 2,
      questions: [
        { q: "What lies between the halal and the haram?", a: "Doubtful things", wrong: ["Nothing", "Only good things", "Only sweets"], why: "In between them there are doubtful things." },
        { q: "What does staying away from doubtful things protect?", a: "Your faith and honour", wrong: ["Your money only", "Your house", "Your car"], why: "Whoever saves himself from these saves his religion and his honor." },
        { q: "Everyone knows which things are doubtful.", tf: false, why: "Most of the people have no knowledge about them." }
      ]
    },
    {
      slug: "bismillah-and-right-hand",
      title: "Bismillah, then eat",
      line: "The Prophet ﷺ taught the boy Umar how to eat.",
      facts: [
        "Umar's hand went all around the dish.",
        "He ﷺ said: say Bismillah and eat with your right hand.",
        "Eat from what is nearest to you."
      ],
      source: hadith("bukhari", "5376", "Umar bin Abi Salamah", "Sahih", "Umar bin Abi Salamah was a boy in the Prophet's ﷺ care, and his hand went all around the dish. The Prophet ﷺ said: O boy, mention the name of Allah, eat with your right hand, and eat from what is near you.", "Mention the Name of Allah and eat with your right hand"),
      difficulty: 1,
      questions: [
        { q: "What do you say before eating?", a: "Bismillah", wrong: ["Amin", "Allahu Akbar", "Subhanallah"], why: "O boy, mention the name of Allah." },
        { q: "Which hand did he ﷺ say to eat with?", a: "The right hand", wrong: ["The left hand", "Both hands", "A spoon only"], why: "Eat with your right hand." },
        { q: "From which part of the dish should you eat?", a: "What is nearest to you", wrong: ["The middle", "The far side", "Everyone else's part"], why: "Eat of the dish what is nearer to you." }
      ]
    },
    {
      slug: "family-not-muslim",
      title: "Parents who are not Muslim",
      line: "Asma's mother, not a Muslim, came to visit her in Madinah.",
      facts: [
        "Asma asked: should I keep good ties with her?",
        "The Prophet ﷺ said: yes, be good to your mother.",
        "A new Muslim stays kind and loving to family."
      ],
      source: hadith("bukhari", "2620", "Asma bint Abi Bakr", "Sahih", "Asma bint Abi Bakr said: My mother came to me while she was a polytheist, hoping for my kindness. I asked the Prophet ﷺ: shall I keep good relations with her? He said: Yes, keep good relations with your mother.", "Yes, keep good relation with her"),
      difficulty: 1,
      questions: [
        { q: "What did Asma ask the Prophet ﷺ?", a: "If she should be kind to her mother", wrong: ["Where to move", "What to cook", "Whom to marry"], why: "She asked: shall I keep good relations with her?" },
        { q: "What did he ﷺ answer?", a: "Yes, keep good ties", wrong: ["No, leave her", "Only by letter", "Only once a year"], why: "Yes, keep good relation with her." },
        { q: "A new Muslim should cut off family who are not Muslim.", tf: false, why: "The Prophet ﷺ told Asma to keep good relations with her mother." }
      ]
    },
    {
      slug: "spread-the-salam",
      title: "Spread the salam",
      line: "Saying as-salamu alaykum spreads love between Muslims.",
      facts: [
        "As-salamu alaykum means peace be upon you.",
        "You will not enter Jannah until you believe, he ﷺ said.",
        "You will not truly believe until you love one another."
      ],
      source: hadith("muslim", "54a", "Abu Hurairah", "Sahih", "The Prophet ﷺ said: You will not enter Paradise until you believe, and you will not believe until you love one another. Shall I tell you something that will make you love one another? Spread the salam among you.", "Should I not direct you to a thing which, if you do, will foster love amongst you"),
      difficulty: 1,
      questions: [
        { q: "What does as-salamu alaykum mean?", a: "Peace be upon you", wrong: ["Good morning", "Thank you", "Goodbye forever"], why: "As-salamu alaykum means peace be upon you." },
        { q: "What does spreading the salam bring?", a: "Love between people", wrong: ["Wealth", "Honor", "Long life"], why: "It is the thing that will foster love amongst you." },
        { q: "Loving one another is part of true faith.", tf: true, why: "You will not believe as long as you do not love one another." }
      ]
    }
  ]
};

export const INTRO_UNITS: DeepUnit[] = [FRESH_START, QURAN_AND_PROPHET, FIRST_PRAYERS, DAILY_LIFE, EASY_WAY];
