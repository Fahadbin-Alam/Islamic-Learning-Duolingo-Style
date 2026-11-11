import { quran, quranQuote, type DeepUnit } from "./deepKit";

// Two more Duas units, every dua word for word from the Quran: the duas of the prophets, and the duas of the
// believers that Allah praised. Each card is one ayah, with who said it and when.

const PROPHETS: DeepUnit = {
  key: "dua-prophets",
  topicId: "duas",
  branchId: "duas-prophets",
  branch: { title: "Duas of the prophets", description: "What Ibrahim, Nuh, Zakariyya, Ayyub, Sulayman and Yusuf asked Allah for, in their own words." },
  name: "the duas of the prophets",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "ibrahim-prayer",
      title: "Ibrahim asks for salah",
      line: "Ibrahim asked Allah to keep him and his children praying.",
      facts: ["Quran 14:40", "Rabbij'alni muqimas-salah"],
      quote: quranQuote(14, 40),
      source: quran(14, 40, "My Lord, make me one who establishes prayer, and from my descendants. Our Lord, and accept my supplication."),
      difficulty: 1,
      questions: [
        { q: "What did Ibrahim ask for himself and his children?", a: "To keep up the prayer", wrong: ["To be rich", "To be famous", "To be kings"], why: "Make me one who establishes prayer, and from my descendants." },
        { q: "Whom did Ibrahim include in his du'a?", a: "His descendants", wrong: ["Only himself", "Only his friends", "No one"], why: "And from my descendants." },
        { q: "Ibrahim ended by asking Allah to accept his du'a.", tf: true, why: "Our Lord, and accept my supplication." }
      ]
    },
    {
      slug: "nuh-parents",
      title: "Nuh prays for his parents",
      line: "Nuh asked forgiveness for himself, his parents and believers.",
      facts: ["Quran 71:28", "Surah Nuh"],
      quote: quranQuote(71, 28),
      source: quran(71, 28, "My Lord, forgive me and my parents and whoever enters my house as a believer, and the believing men and believing women."),
      difficulty: 1,
      questions: [
        { q: "Whom did Nuh ask forgiveness for right after himself?", a: "His parents", wrong: ["His enemies", "Only his ship", "No one"], why: "My Lord, forgive me and my parents." },
        { q: "Who else is in Nuh's du'a?", a: "All believing men and women", wrong: ["Only kings", "Only his crew", "Only animals"], why: "And the believing men and believing women." },
        { q: "We can make du'a for all the believers, not only ourselves.", tf: true, why: "Nuh did, in Quran 71:28." }
      ]
    },
    {
      slug: "zakariyya-alone",
      title: "Zakariyya asks for a child",
      line: "Zakariyya asked: do not leave me alone, You are the best heir.",
      facts: ["Quran 21:89", "Allah gave him Yahya"],
      source: quran(21, 89, "And Zakariyya, when he called to his Lord: my Lord, do not leave me alone, and You are the best of inheritors."),
      difficulty: 1,
      questions: [
        { q: "What did Zakariyya ask Allah not to do?", a: "Leave him alone", wrong: ["Give him rain", "Send him far", "Make him rich"], why: "My Lord, do not leave me alone." },
        { q: "Which son did Allah give Zakariyya?", a: "Yahya", wrong: ["Ishaq", "Yusuf", "Harun"], why: "The next ayah says: We gave him Yahya." },
        { q: "Zakariyya was very old, yet he still asked Allah.", tf: true, why: "No du'a is too big for Allah." }
      ]
    },
    {
      slug: "ayyub-harm",
      title: "Ayyub in his illness",
      line: "Ayyub said: harm has touched me, and You are the Most Merciful.",
      facts: ["Quran 21:83", "Patient for years"],
      quote: quranQuote(21, 83),
      source: quran(21, 83, "And Ayyub, when he called to his Lord: indeed, harm has touched me, and You are the Most Merciful of the merciful."),
      difficulty: 2,
      questions: [
        { q: "What did Ayyub tell Allah in his du'a?", a: "Harm has touched me", wrong: ["I give up", "I am angry", "Nothing at all"], why: "Indeed, harm has touched me." },
        { q: "How did Ayyub describe Allah?", a: "The Most Merciful of the merciful", wrong: ["The far away", "The one who forgets", "The one who is tired"], why: "And You are the Most Merciful of the merciful." },
        { q: "Ayyub complained to Allah, not to people.", tf: true, why: "He called to his Lord." }
      ]
    },
    {
      slug: "sulayman-thanks",
      title: "Sulayman smiles and thanks",
      line: "Sulayman asked Allah to help him be thankful for His blessings.",
      facts: ["Quran 27:19", "After he heard the ant"],
      quote: quranQuote(27, 19),
      source: quran(27, 19, "So he smiled, amused at her words, and said: my Lord, enable me to be grateful for Your favour which You have given me and my parents, and to do good that pleases You."),
      difficulty: 2,
      questions: [
        { q: "What made Sulayman smile before his du'a?", a: "The words of an ant", wrong: ["A joke from a bird", "A gift of gold", "A song"], why: "He smiled, amused at her words." },
        { q: "What did Sulayman ask Allah to help him be?", a: "Grateful", wrong: ["Famous", "Feared", "Lazy"], why: "Enable me to be grateful for Your favour." },
        { q: "Sulayman thanked Allah for blessings on his parents too.", tf: true, why: "Which You have given me and my parents." }
      ]
    },
    {
      slug: "yusuf-righteous",
      title: "Yusuf's du'a at the end",
      line: "Yusuf asked to die as a Muslim and join the righteous.",
      facts: ["Quran 12:101", "After his family was reunited"],
      quote: quranQuote(12, 101),
      source: quran(12, 101, "Creator of the heavens and the earth, You are my protector in this world and the Hereafter. Let me die a Muslim and join me with the righteous."),
      difficulty: 2,
      questions: [
        { q: "How did Yusuf ask to leave this world?", a: "As a Muslim", wrong: ["As a king", "As a rich man", "As a famous man"], why: "Let me die a Muslim." },
        { q: "Whom did Yusuf ask to be joined with?", a: "The righteous", wrong: ["The kings", "The traders", "The soldiers"], why: "And join me with the righteous." },
        { q: "Yusuf said his du'a when Allah had given him power and his family back.", tf: true, why: "Even at his best moment, he asked for a good end." }
      ]
    }
  ]
};

const BELIEVERS: DeepUnit = {
  key: "dua-believers",
  topicId: "duas",
  branchId: "duas-believers",
  branch: { title: "Duas of the believers", description: "The young men of the cave, the magicians who believed, and others whose duas Allah praised." },
  name: "the duas of the believers",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "cave-mercy",
      title: "The youths in the cave",
      line: "The youths asked for mercy and right guidance in their affair.",
      facts: ["Quran 18:10", "Ashab al-Kahf"],
      quote: quranQuote(18, 10),
      source: quran(18, 10, "When the youths took shelter in the cave, they said: our Lord, grant us mercy from Yourself and prepare for us right guidance in our affair."),
      difficulty: 1,
      questions: [
        { q: "Where did the youths shelter before their du'a?", a: "In a cave", wrong: ["In a palace", "On a ship", "In a market"], why: "When the youths took shelter in the cave." },
        { q: "What did they ask for?", a: "Mercy and right guidance", wrong: ["Gold and silver", "An army", "Fame"], why: "Grant us mercy and prepare for us right guidance." },
        { q: "The youths of the cave were young people who held on to faith.", tf: true, why: "Allah calls them fityah, young men." }
      ]
    },
    {
      slug: "those-before-us",
      title: "For those before us",
      line: "Forgive us and our brothers in faith who came before us.",
      facts: ["Quran 59:10", "No bad feeling in our hearts"],
      quote: quranQuote(59, 10),
      source: quran(59, 10, "Our Lord, forgive us and our brothers who preceded us in faith, and put no resentment in our hearts toward those who believe. Our Lord, You are Kind and Merciful."),
      difficulty: 1,
      questions: [
        { q: "Whom do we ask forgiveness for in Quran 59:10?", a: "Our brothers in faith before us", wrong: ["Only ourselves", "Only the rich", "No one"], why: "Forgive us and our brothers who preceded us in faith." },
        { q: "What do we ask Allah to keep out of our hearts?", a: "Resentment toward believers", wrong: ["Love", "Mercy", "Hope"], why: "Put no resentment in our hearts toward those who believe." },
        { q: "Quran 59:10 teaches us to love the believers who came before us.", tf: true, why: "We pray for them and ask for hearts free of bad feeling." }
      ]
    },
    {
      slug: "at-forty",
      title: "A du'a at forty",
      line: "At forty, ask Allah to help you thank Him and do good.",
      facts: ["Quran 46:15", "For you and your parents"],
      quote: quranQuote(46, 15),
      source: quran(46, 15, "When he reaches forty years he says: my Lord, enable me to be grateful for Your favour on me and my parents, to do good that pleases You, and make my children good."),
      difficulty: 2,
      questions: [
        { q: "At what age does the believer make the du'a of Quran 46:15?", a: "Forty years", wrong: ["Ten years", "Ninety years", "One year"], why: "When he reaches forty years." },
        { q: "Who else is blessed in the du'a?", a: "His parents and his children", wrong: ["Only his boss", "Only strangers", "No one"], why: "Your favour on me and my parents... make my children good." },
        { q: "In the du'a we ask to do good that pleases Allah.", tf: true, why: "To do good that pleases You." }
      ]
    },
    {
      slug: "pour-patience",
      title: "Pour patience on us",
      line: "The magicians asked: pour patience on us, let us die Muslims.",
      facts: ["Quran 7:126", "They believed in Musa's Lord"],
      quote: quranQuote(7, 126),
      source: quran(7, 126, "You only take revenge on us because we believed in the signs of our Lord when they came to us. Our Lord, pour upon us patience and let us die as Muslims."),
      difficulty: 2,
      questions: [
        { q: "Who said the du'a of Quran 7:126?", a: "The magicians who believed", wrong: ["The soldiers of Fir'awn", "The traders of Madyan", "The people of Ad"], why: "They believed in the signs of their Lord." },
        { q: "What did they ask Allah to pour on them?", a: "Patience", wrong: ["Rain", "Gold", "Fame"], why: "Our Lord, pour upon us patience." },
        { q: "They asked to die as Muslims.", tf: true, why: "And let us die as Muslims." }
      ]
    },
    {
      slug: "firm-feet",
      title: "Make our feet firm",
      line: "The believers asked Allah to forgive them and make them firm.",
      facts: ["Quran 3:147", "Said with the prophets"],
      quote: quranQuote(3, 147),
      source: quran(3, 147, "Their only words were: our Lord, forgive us our sins and our excess in our affairs, make our feet firm, and help us."),
      difficulty: 2,
      questions: [
        { q: "What did the believers ask Allah to make firm?", a: "Their feet", wrong: ["Their houses", "Their swords", "Their walls"], why: "Make our feet firm." },
        { q: "What did they ask for first?", a: "Forgiveness of their sins", wrong: ["Money", "Revenge", "A rest"], why: "Our Lord, forgive us our sins." },
        { q: "In hard times, the believers asked Allah for help.", tf: true, why: "And help us." }
      ]
    },
    {
      slug: "best-of-merciful",
      title: "The best of the merciful",
      line: "Forgive and have mercy, You are the best of the merciful.",
      facts: ["Quran 23:118", "The last ayah of Al-Mu'minun"],
      quote: quranQuote(23, 118),
      source: quran(23, 118, "And say: my Lord, forgive and have mercy, and You are the best of the merciful."),
      difficulty: 2,
      questions: [
        { q: "What does the du'a of Quran 23:118 ask for?", a: "Forgiveness and mercy", wrong: ["A long trip", "A big house", "Good weather"], why: "My Lord, forgive and have mercy." },
        { q: "How does the du'a describe Allah?", a: "The best of the merciful", wrong: ["The strictest judge", "The far away", "The silent"], why: "You are the best of the merciful." },
        { q: "Quran 23:118 is the last ayah of Surah Al-Mu'minun.", tf: true, why: "It closes Surah Al-Mu'minun." }
      ]
    }
  ]
};

export const DUA_MORE_UNITS: DeepUnit[] = [PROPHETS, BELIEVERS];
