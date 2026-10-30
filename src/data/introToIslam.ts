import type { LearningBranch, LearningNode, LearningSection, Lesson } from "../types";
import type { ArabicTerm } from "./arabicTerms";
import { challengesOf, quoteOf, sourceOf, type Day } from "./ramadanDays";

// "New to Islam": a beginner path for people who are not Muslim yet (Christians, Jews, the curious) and for new
// Muslims. The first-launch question (BackgroundSheet) sends each learner to the unit that fits them. Only what is
// clear and agreed on, from the Quran and sahih hadith, said gently: what Muslims believe, never a put-down of
// anyone else's faith. Each ayah's English follows Sahih International, each hadith's reference and narrator were
// checked against sunnah.com, and a hadith quote is sunnah.com's English word for word, a whole sentence. Each
// lesson's Arabic phrase is from its ayah or hadith. A lesson's questions ask only what its card shows.

export const INTRO_TOPIC = "intro" as const;

interface Unit {
  id: string;
  title: string;
  description: string;
  arabic: ArabicTerm;
  lessons: Day[];
}

const UNITS: Unit[] = [
  {
    id: "intro-basics",
    title: "What is Islam?",
    description: "One God, the Quran, the last prophet and the five pillars.",
    arabic: { ar: "ما الإسلام", translit: "Mal-Islam", meaning: "What is Islam?" },
    lessons: [
      {
        slug: "one-god",
        title: "One God",
        line: "Muslims worship one God, Allah. Nothing is equal to Him.",
        source: { quran: "112:1-4", title: "Allah is One", summary: "Say: He is Allah, the One. He neither begets nor is born, and nothing is equal to Him." },
        arabic: { ar: "قُلْ هُوَ اللَّهُ أَحَدٌ", translit: "Qul huwa Allahu ahad", meaning: "Say: He is Allah, the One" },
        questions: [
          { prompt: "How many gods do Muslims worship?", answer: "One", wrong: ["Two", "Many"], explanation: "Muslims worship one God, Allah." },
          { statement: "In Islam, nothing is equal to Allah.", answer: true, explanation: "The Quran says nothing is equal to Him." }
        ]
      },
      {
        slug: "submit",
        title: "Give yourself to Allah",
        line: "Islam means giving yourself to Allah, and doing good.",
        source: { quran: "2:112", title: "Submitting to Allah", summary: "Whoever submits himself to Allah and does good has his reward with his Lord." },
        arabic: { ar: "أَسْلَمَ وَجْهَهُ لِلَّهِ", translit: "Aslama wajhahu lillah", meaning: "Submits himself to Allah" },
        questions: [
          { prompt: "Who does a Muslim submit to?", answer: "Allah alone", wrong: ["A king", "Money"], explanation: "A Muslim gives himself to Allah alone." },
          { statement: "Whoever submits to Allah and does good has a reward.", answer: true, explanation: "His reward is with his Lord, the Quran says." }
        ]
      },
      {
        slug: "quran",
        title: "The Quran",
        line: "Muslims believe the Quran is Allah's word, sent down in Arabic.",
        source: { quran: "12:2", title: "An Arabic Quran", summary: "We sent it down as an Arabic Quran so that you may understand." },
        quote: true,
        arabic: { ar: "قُرْآنًا عَرَبِيًّا", translit: "Qur'anan 'arabiyya", meaning: "An Arabic Quran" },
        questions: [
          { prompt: "In which language was the Quran sent down?", answer: "Arabic", wrong: ["Greek", "Latin"], explanation: "Allah sent it down as an Arabic Quran." },
          { statement: "Muslims believe the Quran is Allah's word.", answer: true, explanation: "Allah says: We sent it down." }
        ]
      },
      {
        slug: "last-prophet",
        title: "The last prophet",
        line: "Muhammad ﷺ is Allah's Messenger and the last prophet.",
        source: { quran: "33:40", title: "The last of the prophets", summary: "Muhammad is the Messenger of Allah and the last of the prophets." },
        arabic: { ar: "خَاتَمَ النَّبِيِّينَ", translit: "Khatam an-nabiyyin", meaning: "The last of the prophets" },
        questions: [
          { prompt: "Who is the last prophet in Islam?", answer: "Muhammad ﷺ", wrong: ["Musa", "Nuh"], explanation: "Muhammad ﷺ is the last of the prophets." },
          { statement: "Muslims believe no new prophet comes after Muhammad ﷺ.", answer: true, explanation: "The Quran calls him the last of the prophets." }
        ]
      },
      {
        slug: "five-pillars",
        title: "Five pillars",
        line: "Islam stands on five: shahadah, prayer, zakat, Hajj, fasting.",
        source: { ref: "bukhari:8", reference: "Sahih al-Bukhari 8", narrator: "Ibn Umar", title: "Islam is built on five", summary: "Islam is built on five: the shahadah, prayer, zakat, Hajj and fasting in Ramadan." },
        arabic: { ar: "بُنِيَ الإِسْلَامُ عَلَى خَمْسٍ", translit: "Buniyal-Islamu 'ala khams", meaning: "Islam is built on five" },
        questions: [
          { prompt: "How many pillars is Islam built on?", answer: "Five", wrong: ["Three", "Ten"], explanation: "Islam is built on five pillars." },
          { prompt: "Which is one of the five pillars?", answer: "Fasting in Ramadan", wrong: ["Eating dates", "Building a house"], explanation: "Fasting in Ramadan is one of the five." }
        ]
      },
      {
        slug: "five-prayers",
        title: "Five prayers a day",
        line: "Muslims pray five times a day. It wipes away sins.",
        source: {
          ref: "bukhari:528",
          reference: "Sahih al-Bukhari 528",
          narrator: "Abu Hurairah",
          title: "Like a river at your door",
          summary: "The five prayers are like bathing in a river five times a day: with them Allah wipes away bad deeds."
        },
        quote: "That is the example of the five prayers with which Allah blots out (annuls) evil deeds.",
        arabic: { ar: "الصَّلَوَاتِ الْخَمْسِ", translit: "As-salawat al-khams", meaning: "The five prayers" },
        questions: [
          { prompt: "How many times a day do Muslims pray?", answer: "Five", wrong: ["Once", "Ten"], explanation: "Muslims pray five times a day." },
          { statement: "The Prophet ﷺ compared the five prayers to bathing in a river.", answer: true, explanation: "Like a river at your door, five times a day." }
        ]
      }
    ]
  },
  {
    id: "intro-prophets",
    title: "Moses, Jesus and more",
    description: "Adam, Noah, Abraham, Moses, Mary and Jesus in the Quran.",
    arabic: { ar: "أنبياء تعرفهم", translit: "Anbiya' ta'rifuhum", meaning: "Prophets you know" },
    lessons: [
      {
        slug: "all-prophets",
        title: "All the prophets",
        line: "Muslims believe in all of Allah's prophets, Abraham to Jesus.",
        source: {
          quran: "2:136",
          title: "We believe in them all",
          summary: "We believe in what was given to Abraham, Ishmael, Isaac, Jacob, Moses, Jesus and the prophets, and make no distinction between them."
        },
        arabic: { ar: "لَا نُفَرِّقُ بَيْنَ أَحَدٍ مِنْهُمْ", translit: "La nufarriqu bayna ahadin minhum", meaning: "We make no distinction between them" },
        questions: [
          { prompt: "Which of Allah's prophets do Muslims believe in?", answer: "All of them", wrong: ["Only one", "None of them"], explanation: "Muslims believe in all of Allah's prophets." },
          { statement: "Muslims believe in what was given to Moses and Jesus.", answer: true, explanation: "The Quran names Moses and Jesus among them." }
        ]
      },
      {
        slug: "adam",
        title: "Adam",
        line: "The Quran tells of Adam. Allah forgave him when he repented.",
        source: { quran: "2:37", title: "Adam is forgiven", summary: "Adam received words from his Lord, and Allah accepted his repentance." },
        arabic: { ar: "فَتَابَ عَلَيْهِ", translit: "Fataba 'alayh", meaning: "He accepted his repentance" },
        questions: [
          { prompt: "What did Allah do when Adam repented?", answer: "Forgave him", wrong: ["Forgot him", "Ignored him"], explanation: "Allah accepted Adam's repentance." },
          { statement: "Allah accepts repentance, the Quran says.", answer: true, explanation: "He is the Accepting of repentance, the Merciful." }
        ]
      },
      {
        slug: "nuh",
        title: "Nuh (Noah)",
        line: "Allah told Nuh, known as Noah, to build the ship.",
        source: { quran: "11:37", title: "Build the ship", summary: "Allah told Nuh: build the ship under Our eyes and Our inspiration." },
        arabic: { ar: "وَاصْنَعِ الْفُلْكَ", translit: "Wasna'il-fulk", meaning: "And build the ship" },
        questions: [
          { prompt: "What did Allah tell Nuh to build?", answer: "A ship", wrong: ["A tower", "A city"], explanation: "Allah told Nuh to build the ship." },
          { statement: "Nuh is the Quran's name for Noah.", answer: true, explanation: "Noah is called Nuh in the Quran." }
        ]
      },
      {
        slug: "ibrahim",
        title: "Ibrahim (Abraham)",
        line: "Allah took Ibrahim, known as Abraham, as a close friend.",
        source: { quran: "4:125", title: "Allah's close friend", summary: "Allah took Abraham as a close friend." },
        arabic: { ar: "خَلِيلًا", translit: "Khalila", meaning: "A close friend" },
        questions: [
          { prompt: "What did Allah take Ibrahim as?", answer: "A close friend", wrong: ["A king", "A stranger"], explanation: "Allah took Ibrahim as a close friend." },
          { statement: "Ibrahim is the Quran's name for Abraham.", answer: true, explanation: "Abraham is called Ibrahim in the Quran." }
        ]
      },
      {
        slug: "musa",
        title: "Musa (Moses)",
        line: "Allah spoke to Musa, known as Moses, directly.",
        source: { quran: "4:164", title: "Allah spoke to Moses", summary: "And Allah spoke to Moses with direct speech." },
        arabic: { ar: "وَكَلَّمَ اللَّهُ مُوسَى", translit: "Wa kallamallahu Musa", meaning: "And Allah spoke to Musa" },
        questions: [
          { prompt: "How did Allah speak to Musa?", answer: "Directly", wrong: ["Never", "Only in a letter"], explanation: "Allah spoke to Musa directly." },
          { statement: "Musa is the Quran's name for Moses.", answer: true, explanation: "Moses is called Musa in the Quran." }
        ]
      },
      {
        slug: "maryam",
        title: "Maryam (Mary)",
        line: "Allah chose Maryam, Mary, above the women of the worlds.",
        source: { quran: "3:42", title: "Maryam is chosen", summary: "The angels said: O Mary, Allah has chosen you, purified you, and chosen you above the women of the worlds." },
        quote: true,
        arabic: { ar: "إِنَّ اللَّهَ اصْطَفَاكِ", translit: "Innallaha istafaki", meaning: "Allah has chosen you" },
        questions: [
          { prompt: "What does the Quran say about Maryam?", answer: "Allah chose her", wrong: ["She was a queen", "She was forgotten"], explanation: "Allah chose her and purified her." },
          { statement: "Maryam is the Quran's name for Mary.", answer: true, explanation: "Mary is called Maryam in the Quran." }
        ]
      },
      {
        slug: "isa",
        title: "Isa (Jesus)",
        line: "The Quran calls Isa, Jesus, the Messiah, son of Maryam.",
        source: {
          quran: "3:45",
          title: "The Messiah, son of Mary",
          summary: "The angels said: O Mary, Allah gives you good news of a word from Him, whose name is the Messiah, Jesus, son of Mary, honored in this world and the next."
        },
        arabic: { ar: "الْمَسِيحُ عِيسَى ابْنُ مَرْيَمَ", translit: "Al-Masihu 'Isabnu Maryam", meaning: "The Messiah, Jesus, son of Mary" },
        questions: [
          { prompt: "What does the Quran call Isa?", answer: "The Messiah", wrong: ["A king", "A poet"], explanation: "His name is the Messiah, Jesus, son of Mary." },
          { statement: "The Quran says Isa is honored in this world and the next.", answer: true, explanation: "He is honored in this world and the Hereafter." }
        ]
      },
      {
        slug: "isa-birth",
        title: "Born with no father",
        line: "Maryam had Isa with no father. Allah says Be, and it is.",
        source: { quran: "3:47", title: "Be, and it is", summary: "Mary said: how will I have a child when no man has touched me? He said: Allah creates what He wills; He says Be, and it is." },
        arabic: { ar: "كُنْ فَيَكُونُ", translit: "Kun fayakun", meaning: "Be, and it is" },
        questions: [
          { prompt: "How was Isa born, the Quran says?", answer: "With no father", wrong: ["In a palace", "To a king"], explanation: "Maryam had Isa with no father." },
          { statement: "When Allah decides something, He says Be, and it is.", answer: true, explanation: "Allah creates what He wills." }
        ]
      },
      {
        slug: "isa-servant",
        title: "Allah's servant",
        line: "In the Quran, Isa says: I am Allah's servant, and His prophet.",
        source: { quran: "19:30", title: "I am the servant of Allah", summary: "Jesus said: I am the servant of Allah. He has given me the Book and made me a prophet." },
        quote: true,
        arabic: { ar: "إِنِّي عَبْدُ اللَّهِ", translit: "Inni 'abdullah", meaning: "I am the servant of Allah" },
        questions: [
          { prompt: "In the Quran, what does Isa call himself?", answer: "Allah's servant", wrong: ["A king", "An angel"], explanation: "He said: I am the servant of Allah." },
          { statement: "Muslims believe Isa is a prophet of Allah.", answer: true, explanation: "He said: Allah made me a prophet." }
        ]
      }
    ]
  },
  {
    id: "intro-together",
    title: "Living side by side",
    description: "What the Quran says about Jews, Christians and all people.",
    arabic: { ar: "أهل الكتاب", translit: "Ahl al-Kitab", meaning: "People of the Book" },
    lessons: [
      {
        slug: "gospel",
        title: "The Gospel",
        line: "Allah gave Isa the Gospel, with guidance and light in it.",
        source: { quran: "5:46", title: "Guidance and light", summary: "Allah sent Jesus, son of Mary, confirming the Torah, and gave him the Gospel, in which was guidance and light." },
        arabic: { ar: "الْإِنْجِيلَ", translit: "Al-Injil", meaning: "The Gospel" },
        questions: [
          { prompt: "Which book did Allah give Isa, the Quran says?", answer: "The Gospel", wrong: ["No book", "A poem"], explanation: "Allah gave him the Gospel." },
          { statement: "The Quran says the Gospel had guidance and light.", answer: true, explanation: "In it was guidance and light." }
        ]
      },
      {
        slug: "one-god-for-all",
        title: "Our God is one",
        line: "Muslims say to Jews and Christians: our God and yours is one.",
        source: {
          quran: "29:46",
          title: "In the best way",
          summary: "Argue with the People of the Book only in the best way, and say: we believe in what was sent to us and to you. Our God and your God is one."
        },
        arabic: { ar: "وَإِلَهُنَا وَإِلَهُكُمْ وَاحِدٌ", translit: "Wa ilahuna wa ilahukum wahid", meaning: "Our God and your God is one" },
        questions: [
          { prompt: "How should Muslims talk with Jews and Christians?", answer: "In the best way", wrong: ["Rudely", "Not at all"], explanation: "Talk with them only in the best way." },
          { statement: "The Quran calls Jews and Christians the People of the Book.", answer: true, explanation: "The ayah calls them the People of the Book." }
        ]
      },
      {
        slug: "common-word",
        title: "A common word",
        line: "The Quran invites to one shared word: worship only Allah.",
        source: { quran: "3:64", title: "Come to a common word", summary: "O People of the Book, come to a word common between us and you: that we worship none but Allah." },
        arabic: { ar: "كَلِمَةٍ سَوَاءٍ", translit: "Kalimatin sawa'", meaning: "A common word" },
        questions: [
          { prompt: "What is the common word the Quran invites to?", answer: "Worship only Allah", wrong: ["Eat the same food", "Speak one language"], explanation: "That we worship none but Allah." },
          { statement: "The Quran invites the People of the Book to a common word.", answer: true, explanation: "Come to a word common between us and you." }
        ]
      },
      {
        slug: "no-compulsion",
        title: "No force in faith",
        line: "There is no compulsion in religion: no one is forced into Islam.",
        source: { quran: "2:256", title: "No compulsion in religion", summary: "There is no compulsion in religion. The right way has become clear from the wrong." },
        arabic: { ar: "لَا إِكْرَاهَ فِي الدِّينِ", translit: "La ikraha fid-din", meaning: "No compulsion in religion" },
        questions: [
          { prompt: "Can anyone be forced into Islam?", answer: "No, never", wrong: ["Yes", "Sometimes"], explanation: "There is no compulsion in religion." },
          { statement: "Faith has to come from the heart, not from force.", answer: true, explanation: "No one may be forced into Islam." }
        ]
      },
      {
        slug: "know-one-another",
        title: "To know one another",
        line: "Allah made peoples and tribes so we would know one another.",
        source: {
          quran: "49:13",
          title: "Peoples and tribes",
          summary: "Allah created us from a male and a female and made us peoples and tribes to know one another. The best of us with Allah is the most righteous."
        },
        quote: true,
        arabic: { ar: "لِتَعَارَفُوا", translit: "Lita'arafu", meaning: "So you may know one another" },
        questions: [
          { prompt: "Why did Allah make peoples and tribes?", answer: "To know one another", wrong: ["To fight", "To boast"], explanation: "So that we may know one another." },
          { prompt: "Who is the best with Allah?", answer: "The most righteous", wrong: ["The richest", "The strongest"], explanation: "The best with Allah is the most righteous." }
        ]
      },
      {
        slug: "neighbors",
        title: "Good neighbors",
        line: "The Prophet ﷺ taught Muslims to be kind to their neighbors.",
        source: {
          ref: "bukhari:6014",
          reference: "Sahih al-Bukhari 6014",
          narrator: "Aishah",
          title: "Kindness to neighbors",
          summary: "Jibril kept telling the Prophet ﷺ to treat neighbors kindly, so much that he thought they would be made heirs."
        },
        quote: "Gabriel continued to recommend me about treating the neighbors Kindly and politely so much so that I thought he would order me to make them as my heirs.",
        arabic: { ar: "مَا زَالَ يُوصِينِي جِبْرِيلُ بِالْجَارِ", translit: "Ma zala Jibrilu yusini bil-jar", meaning: "Jibril kept telling me about the neighbor" },
        questions: [
          { prompt: "What did Jibril keep telling the Prophet ﷺ about?", answer: "Neighbors", wrong: ["Money", "Food"], explanation: "He kept telling him to be kind to neighbors." },
          { statement: "In Islam, you should be kind to your neighbors.", answer: true, explanation: "Treat neighbors kindly and politely." }
        ]
      }
    ]
  },
  {
    id: "intro-first-steps",
    title: "First steps as a Muslim",
    description: "The shahadah, a fresh start, wudu and your first prayer.",
    arabic: { ar: "الخطوات الأولى", translit: "Al-Khutuwat al-ula", meaning: "The first steps" },
    lessons: [
      {
        slug: "shahadah",
        title: "The shahadah",
        line: "The shahadah: no god but Allah, Muhammad ﷺ is His Messenger.",
        source: {
          ref: "bukhari:8",
          reference: "Sahih al-Bukhari 8",
          narrator: "Ibn Umar",
          title: "The first pillar",
          summary: "The first of the five: to testify that none has the right to be worshipped but Allah, and Muhammad is Allah's Messenger."
        },
        arabic: { ar: "لَا إِلَهَ إِلَّا اللَّهُ", translit: "La ilaha illallah", meaning: "There is no god but Allah" },
        questions: [
          { prompt: "What is the first pillar of Islam?", answer: "The shahadah", wrong: ["Hajj", "Zakat"], explanation: "The first pillar is the shahadah." },
          { statement: "The shahadah says Muhammad ﷺ is Allah's Messenger.", answer: true, explanation: "No god but Allah, and Muhammad ﷺ is His Messenger." }
        ]
      },
      {
        slug: "never-lose-hope",
        title: "Never lose hope",
        line: "Allah forgives all sins. Never lose hope in His mercy.",
        source: { quran: "39:53", title: "Do not lose hope", summary: "O My servants who have wronged themselves, do not lose hope in Allah's mercy. Allah forgives all sins." },
        quote: true,
        arabic: { ar: "لَا تَقْنَطُوا مِنْ رَحْمَةِ اللَّهِ", translit: "La taqnatu min rahmatillah", meaning: "Do not lose hope in Allah's mercy" },
        questions: [
          { prompt: "Which sins can Allah forgive?", answer: "All sins", wrong: ["None", "Only small ones"], explanation: "Allah forgives all sins." },
          { statement: "A new Muslim should lose hope over old mistakes.", answer: false, explanation: "Never lose hope in Allah's mercy." }
        ]
      },
      {
        slug: "religion-is-easy",
        title: "Islam is easy",
        line: "The religion is easy. Take it step by step.",
        source: { ref: "bukhari:39", reference: "Sahih al-Bukhari 39", narrator: "Abu Hurairah", title: "The religion is easy", summary: "The religion is easy, and whoever overburdens himself in it will not be able to keep going." },
        quote: "Religion is very easy and whoever overburdens himself in his religion will not be able to continue in that way.",
        arabic: { ar: "إِنَّ الدِّينَ يُسْرٌ", translit: "Innad-dina yusr", meaning: "The religion is easy" },
        questions: [
          { prompt: "What did the Prophet ﷺ say about the religion?", answer: "It is easy", wrong: ["It is too hard", "It is only for scholars"], explanation: "Religion is very easy." },
          { statement: "Doing too much too fast is the best way to start.", answer: false, explanation: "Whoever overburdens himself will not keep going." }
        ]
      },
      {
        slug: "what-you-can-bear",
        title: "Only what you can bear",
        line: "Allah asks no one to carry more than they can.",
        source: { quran: "2:286", title: "Within its capacity", summary: "Allah does not burden a soul beyond what it can bear." },
        arabic: { ar: "لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا", translit: "La yukallifullahu nafsan illa wus'aha", meaning: "Allah burdens no soul beyond what it can bear" },
        questions: [
          { prompt: "How much does Allah ask of a person?", answer: "What they can bear", wrong: ["More than they can bear", "Nothing at all"], explanation: "Allah burdens no soul beyond what it can bear." },
          { statement: "Allah asks no one to carry more than they can.", answer: true, explanation: "No soul is burdened beyond what it can bear." }
        ]
      },
      {
        slug: "wudu",
        title: "Wash for prayer",
        line: "For wudu: wash face, arms to elbows, wipe head, wash feet.",
        source: { quran: "5:6", title: "Wudu in the Quran", summary: "When you rise to pray, wash your faces and your arms to the elbows, wipe your heads, and wash your feet to the ankles." },
        arabic: { ar: "فَاغْسِلُوا وُجُوهَكُمْ", translit: "Faghsilu wujuhakum", meaning: "Wash your faces" },
        questions: [
          { prompt: "What do Muslims do before prayer?", answer: "Wash with wudu", wrong: ["Eat a meal", "Sleep"], explanation: "Before prayer, Muslims wash with wudu." },
          { prompt: "Up to where are the arms washed?", answer: "The elbows", wrong: ["The wrists", "The shoulders"], explanation: "Wash your arms to the elbows." }
        ]
      },
      {
        slug: "first-prayer",
        title: "Pray like him",
        line: "Pray the way the Prophet ﷺ prayed, step by step.",
        source: {
          ref: "bukhari:631",
          reference: "Sahih al-Bukhari 631",
          narrator: "Malik bin Al-Huwairith",
          title: "Pray as you saw me pray",
          summary: "The Prophet ﷺ said: Pray as you have seen me praying."
        },
        arabic: { ar: "صَلُّوا كَمَا رَأَيْتُمُونِي أُصَلِّي", translit: "Sallu kama ra'aytumuni usalli", meaning: "Pray as you have seen me pray" },
        questions: [
          { prompt: "How should a Muslim pray?", answer: "As the Prophet ﷺ prayed", wrong: ["Any way at all", "Once a year"], explanation: "Pray as you have seen me praying, he said." },
          { statement: "The Prophet ﷺ said: pray as you have seen me praying.", answer: true, explanation: "He taught prayer by showing it." }
        ]
      }
    ]
  }
];

export const introNodeId = (slug: string) => `intro-${slug}`;

function buildIntro() {
  const branches: LearningBranch[] = UNITS.map((unit, index) => ({
    id: unit.id,
    topicId: INTRO_TOPIC,
    title: unit.title,
    description: unit.description,
    order: index + 1,
    difficultyRange: { start: 1, end: 1 },
    sourceReferences: []
  }));
  const nodes: LearningNode[] = [];
  const lessonsById: Record<string, Lesson> = {};
  const nodeArabic: Record<string, ArabicTerm> = {};
  const branchArabic: Record<string, ArabicTerm> = Object.fromEntries(UNITS.map((unit) => [unit.id, unit.arabic]));

  // Each unit stands alone (INTRO is a library topic), so a Christian can start on the prophets and a new Muslim
  // on the first steps; inside a unit the lessons open one after another.
  UNITS.forEach((unit) => {
    unit.lessons.forEach((day, inUnit) => {
      const index = nodes.length;
      const nodeId = introNodeId(day.slug);
      const lessonId = `lesson-${nodeId}`;
      const source = sourceOf(day, lessonId);
      const previous = inUnit ? nodes[index - 1] : undefined;
      const quote = quoteOf(day);
      nodeArabic[nodeId] = day.arabic;
      nodes.push({
        id: nodeId,
        skillId: `skill_intro_${index + 1}`,
        title: day.title,
        topicId: INTRO_TOPIC,
        branchId: unit.id,
        kind: "skill",
        lessonIds: [lessonId],
        requiredNodeIds: previous ? [previous.id] : [],
        xpReward: 10,
        starsReward: 3,
        order: inUnit + 1,
        difficulty: 1,
        sourceReferences: [source],
        masteryState: "new",
        masteryTestEligible: false
      });
      lessonsById[lessonId] = {
        id: lessonId,
        nodeId,
        branchId: unit.id,
        title: day.title,
        intro: day.line,
        explanationContent: source.summary,
        learnLine: day.line,
        ...(quote ? { quote } : {}),
        learnSource: source,
        lessonType: "skill",
        difficulty: 1,
        xpReward: 10,
        sources: [source],
        sourceReferences: [source],
        unlockRules: previous ? [`Complete ${previous.title}`] : [],
        masteryState: "learning",
        masteryTestEligible: false,
        challenges: challengesOf(day, lessonId, nodeId, source, index)
      };
    });
  });

  const section: LearningSection = {
    id: "intro",
    topicId: INTRO_TOPIC,
    title: "New to Islam",
    description: "A gentle start for anyone new to Islam: what Muslims believe, the prophets you may know, and first steps.",
    badge: "Beginners",
    focus: "One God, the Quran, Jesus and the prophets, living side by side, and first steps as a Muslim.",
    mascot: "muslim_man",
    accentColor: "#2BB5A6",
    starsTarget: nodes.reduce((total, node) => total + node.starsReward, 0),
    branches,
    nodes
  };

  return { section, lessonsById, nodeArabic, branchArabic };
}

/** The beginner topic: its section (four units, each opening on its own), lessons and Arabic words. */
export const INTRO = buildIntro();

/** Who the learner said they are on first launch, and where that sends them. */
export type LearnerBackground = "muslim" | "new_muslim" | "christian" | "jewish" | "curious";

export const LEARNER_BACKGROUNDS: LearnerBackground[] = ["muslim", "new_muslim", "christian", "jewish", "curious"];

export const BACKGROUND_KEY = "sira-path-learner-background";

export function isLearnerBackground(value: unknown): value is LearnerBackground {
  return typeof value === "string" && (LEARNER_BACKGROUNDS as string[]).includes(value);
}

// A Muslim goes on to the usual path. A Christian or Jewish learner starts with the prophets they already know, a
// curious learner with what Islam is, and a new Muslim with the first steps.
const START_UNIT: Record<Exclude<LearnerBackground, "muslim">, string> = {
  new_muslim: "intro-first-steps",
  christian: "intro-prophets",
  jewish: "intro-prophets",
  curious: "intro-basics"
};

/** The beginner unit a learner starts in, and its first circle; none for a Muslim. */
export function introStartFor(background: LearnerBackground): { unitId: string; nodeId: string } | undefined {
  if (background === "muslim") return undefined;
  const unitId = START_UNIT[background];
  const node = INTRO.section.nodes.find((item) => item.branchId === unitId);
  return node ? { unitId, nodeId: node.id } : undefined;
}
