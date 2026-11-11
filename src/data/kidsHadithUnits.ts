import { hadith, type DeepUnit } from "./deepKit";

// More hadith for the Hadith topic, still a child's path: short sahih sayings of the Prophet ﷺ a young learner can
// live by, each told with what it means in a child's day. Words that please Allah, small deeds with big rewards,
// kindness at home, and good friends. Number, narrator and grade as sunnah.com gives them.

const DHIKR: DeepUnit = {
  key: "kids-dhikr",
  topicId: "hadith",
  branchId: "hadith-dhikr",
  branch: { title: "Words that please Allah", description: "Short words of dhikr that are light on the tongue and heavy on the scale." },
  name: "words that please Allah",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "light-and-heavy",
      title: "Light on the tongue",
      line: "Two phrases are easy to say but heavy on the scale.",
      facts: [
        "Subhan Allahi wa bihamdihi: glory and praise be to Allah.",
        "Subhan Allahil Azim: glory be to Allah, the Most Great.",
        "Allah, the Most Merciful, loves these words."
      ],
      source: hadith("bukhari", "6406", "Abu Hurairah", "Sahih", "The Prophet ﷺ said: Two phrases are easy on the tongue, heavy on the scale and dear to the Most Merciful: Subhan Allahi wa bihamdihi, and Subhan Allahil Azim.", "two expressions which are very easy for the tongue to say"),
      difficulty: 1,
      questions: [
        { q: "How are the two phrases on the tongue?", a: "Easy to say", wrong: ["Very hard to say", "Too long to learn", "Only for adults"], why: "They are very easy for the tongue to say." },
        { q: "How are they on the scale of deeds?", a: "Very heavy", wrong: ["Very light", "Not counted", "Only a little"], why: "They are very heavy in the balance." },
        { q: "Subhan Allah means glory be to Allah.", tf: true, why: "Subhan Allah: glory be to Allah." }
      ]
    },
    {
      slug: "four-dearest-words",
      title: "The four dearest words",
      line: "The words dearest to Allah are four short phrases.",
      facts: [
        "Subhan Allah, Alhamdulillah, La ilaha illallah, Allahu Akbar.",
        "You may say them in any order.",
        "You can say them walking, waiting or lying in bed."
      ],
      source: hadith("muslim", "2137a", "Samurah ibn Jundub", "Sahih", "The Prophet ﷺ said: The dearest words to Allah are four: Subhan Allah, Alhamdulillah, La ilaha illallah and Allahu Akbar. It does not matter which of them you begin with.", "The dearest phrases to Allah are four"),
      difficulty: 1,
      questions: [
        { q: "How many are the dearest words to Allah?", a: "Four", wrong: ["One", "Ten", "Seven"], why: "The dearest phrases to Allah are four." },
        { q: "Which is one of the four?", a: "Alhamdulillah", wrong: ["Good morning", "Thank you", "Goodbye"], why: "Subhan Allah, Alhamdulillah, La ilaha illallah, Allahu Akbar." },
        { q: "The four words must be said in one fixed order.", tf: false, why: "There is no harm in which of them you begin with." }
      ]
    },
    {
      slug: "alive-heart",
      title: "A living heart",
      line: "One who remembers Allah is like one who is truly alive.",
      facts: [
        "Dhikr means remembering Allah with your words and heart.",
        "Remembering Allah keeps the heart awake and alive.",
        "Abu Musa heard the Prophet ﷺ give this example."
      ],
      source: hadith("bukhari", "6407", "Abu Musa", "Sahih", "The Prophet ﷺ said: The one who remembers his Lord and the one who does not are like the living and the dead.", "is that of a living creature compared to a dead one"),
      difficulty: 1,
      questions: [
        { q: "Whom is the one who remembers Allah like?", a: "Someone alive", wrong: ["Someone asleep", "Someone lost", "Someone rich"], why: "It is like a living creature compared to a dead one." },
        { q: "What does dhikr mean?", a: "Remembering Allah", wrong: ["Eating slowly", "Playing a game", "Reading a story"], why: "Dhikr means remembering Allah with your words and heart." },
        { q: "Remembering Allah keeps the heart alive.", tf: true, why: "The one who remembers Allah is like the living." }
      ]
    },
    {
      slug: "moist-tongue",
      title: "Keep your tongue busy",
      line: "A man asked: which one deed of Islam should I keep doing?",
      facts: [
        "The Prophet ﷺ said: keep your tongue moist with Allah's remembrance.",
        "A moist tongue is one that keeps saying dhikr.",
        "Dhikr is something anyone can do, any time."
      ],
      source: hadith("tirmidhi", "3375", "Abdullah bin Busr", "Sahih", "A man said: O Messenger of Allah, the acts of Islam have become too many for me, so tell me one thing to hold on to. He ﷺ said: Let your tongue stay moist with the remembrance of Allah.", "Let not your tongue cease to be moist with the remembrance of Allah"),
      difficulty: 2,
      questions: [
        { q: "What did the man ask for?", a: "One deed to hold on to", wrong: ["A new house", "A long trip", "A big meal"], why: "Inform me of a thing that I should stick to." },
        { q: "What should your tongue be moist with?", a: "The remembrance of Allah", wrong: ["Water only", "Juice", "Jokes"], why: "Let not your tongue cease to be moist with the remembrance of Allah." },
        { q: "Dhikr can only be done in the mosque.", tf: false, why: "Dhikr is something anyone can do, any time." }
      ]
    },
    {
      slug: "a-little-every-day",
      title: "A little, every day",
      line: "Allah loves best the deed done often, even if small.",
      facts: [
        "Doing a little every day beats a lot once in a while.",
        "Two pages of Quran a day is better than none for a month.",
        "Aishah passed on these words of the Prophet ﷺ."
      ],
      source: hadith("bukhari", "6464", "Aishah", "Sahih", "The Prophet ﷺ said: Do good deeds properly and moderately, and know that the deed most loved by Allah is the one done regularly, even if it is little.", "the most beloved deed to Allah is the most regular and constant even if it were little"),
      difficulty: 1,
      questions: [
        { q: "Which deed does Allah love most?", a: "The one done regularly", wrong: ["The biggest one", "The one done once", "The one others see"], why: "The most beloved deed is the most regular, even if little." },
        { q: "Is a small deed every day a good thing?", a: "Yes, Allah loves it", wrong: ["No, it is too small", "Only on Fridays", "Only for grown-ups"], why: "The most regular deed is most beloved, even if it were little." },
        { q: "Doing a lot once is better than a little every day.", tf: false, why: "The most beloved deed is the most regular and constant." }
      ]
    }
  ]
};

const SMALL_DEEDS: DeepUnit = {
  key: "kids-small-deeds",
  topicId: "hadith",
  branchId: "hadith-small-deeds",
  branch: { title: "Small deeds, big rewards", description: "Charity for every bone, a branch off the road, half a date, and helping others." },
  name: "small deeds",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "charity-for-every-joint",
      title: "Charity for every joint",
      line: "Each joint of your body owes a charity every day.",
      facts: [
        "It is a way to thank Allah for a body that moves.",
        "A good word is a charity; so is helping someone carry things.",
        "Each step to the prayer is a charity too."
      ],
      source: hadith("bukhari", "2989", "Abu Hurayrah", "Sahih", "The Prophet ﷺ said: Every joint of a person owes a charity every day the sun rises: judging fairly between two is charity, helping a man onto his animal or lifting his bags is charity, a good word is charity, every step to the prayer is charity, and removing harm from the road is charity.", "a good word is also Sadaqa"),
      difficulty: 1,
      questions: [
        { q: "What does each joint of the body owe every day?", a: "A charity", wrong: ["A coin to the king", "A long rest", "Nothing at all"], why: "There is a Sadaqa for every joint of the body every day." },
        { q: "Which of these counts as a charity?", a: "A good word", wrong: ["Shouting at a friend", "Skipping prayer", "Breaking a toy"], why: "Saying a good word is also Sadaqa." },
        { q: "Charity can only be given with money.", tf: false, why: "A good word, helping and walking to prayer are charity too." }
      ]
    },
    {
      slug: "the-thorny-branch",
      title: "The thorny branch",
      line: "A man moved a thorny branch off the path; Allah forgave him.",
      facts: [
        "The branch could have hurt people walking by.",
        "Allah was pleased with what he did.",
        "Picking up glass or litter from a path is the same kind of deed."
      ],
      source: hadith("bukhari", "652", "Abu Hurairah", "Sahih", "The Prophet ﷺ said: While a man was walking along a way, he found a thorny branch and moved it out of the way. Allah thanked him for it and forgave him.", "he saw a thorny branch and removed it from the way"),
      difficulty: 1,
      questions: [
        { q: "What did the man move off the path?", a: "A thorny branch", wrong: ["A big rock", "A sleeping cat", "A lost bag"], why: "He saw a thorny branch and removed it from the way." },
        { q: "What did Allah do for him?", a: "Forgave him", wrong: ["Gave him a horse", "Made him a king", "Nothing"], why: "Allah became pleased by his action and forgave him." },
        { q: "Clearing a path of harm is a good deed.", tf: true, why: "Allah was pleased with him and forgave him for it." }
      ]
    },
    {
      slug: "half-a-date",
      title: "Even half a date",
      line: "Give charity, even if it is only half a date.",
      facts: [
        "A date is a small, sweet fruit.",
        "Half of one is very little, yet it counts with Allah.",
        "Sharing a snack with a friend can be your half date."
      ],
      source: hadith("bukhari", "1417", "Adi ibn Hatim", "Sahih", "The Prophet ﷺ said: Protect yourselves from the Fire, even by giving half a date in charity.", "even by giving half a date-fruit in charity"),
      difficulty: 1,
      questions: [
        { q: "How small can a charity be?", a: "Even half a date", wrong: ["At least a gold coin", "A whole sheep", "A house"], why: "Even by giving half a date-fruit in charity." },
        { q: "What is a date?", a: "A small, sweet fruit", wrong: ["A kind of bird", "A big stone", "A day of the week"], why: "A date is a small, sweet fruit." },
        { q: "A tiny gift given for Allah still counts.", tf: true, why: "Even half a date-fruit in charity protects you." }
      ]
    },
    {
      slug: "every-good-is-charity",
      title: "Every good deed is charity",
      line: "Every good thing you do for someone is a charity.",
      facts: [
        "Helping your mum, sharing toys, or saying salam all count.",
        "Jabir ibn Abdullah heard the Prophet ﷺ say so.",
        "So every day is full of chances to give."
      ],
      source: hadith("bukhari", "6021", "Jabir bin Abdullah", "Sahih", "The Prophet ﷺ said: Every good deed is a charity.", "all that is good is a Sadaqa"),
      difficulty: 1,
      questions: [
        { q: "What is every good deed?", a: "A charity", wrong: ["A waste of time", "A secret", "A game"], why: "All that is good is a Sadaqa." },
        { q: "Which could be a charity at home?", a: "Helping your mum", wrong: ["Hiding the remote", "Leaving a mess", "Shouting"], why: "Every good thing you do for someone counts." },
        { q: "Only rich people can give charity.", tf: false, why: "Every good deed is a charity, and anyone can do good." }
      ]
    },
    {
      slug: "help-and-be-helped",
      title: "Help, and Allah helps you",
      line: "Allah helps a person as long as they help their brother.",
      facts: [
        "Easing someone's trouble eases yours on the Last Day.",
        "Hiding a friend's mistake: Allah hides yours.",
        "Seeking knowledge makes the path to Jannah easy."
      ],
      source: hadith("muslim", "2699a", "Abu Hurairah", "Sahih", "The Prophet ﷺ said: Whoever relieves a believer of a hardship, Allah will relieve him of a hardship on the Day of Resurrection. Whoever covers a Muslim, Allah will cover him. Allah helps a servant as long as he helps his brother, and whoever takes a path seeking knowledge, Allah makes easy for him a path to Paradise.", "Allah is at the back of a servant so long as the servant is at the back of his brother"),
      difficulty: 2,
      questions: [
        { q: "When does Allah help a person?", a: "While they help their brother", wrong: ["Only when they are rich", "Never", "Only on Eid"], why: "Allah is at the back of a servant while he is at the back of his brother." },
        { q: "What happens when you hide a friend's mistake?", a: "Allah hides yours", wrong: ["You get in trouble", "Nothing", "Everyone finds out"], why: "He who conceals the faults of a Muslim, Allah conceals his faults." },
        { q: "Seeking knowledge makes the path to Jannah easy.", tf: true, why: "Allah makes the path to Paradise easy for one seeking knowledge." }
      ]
    }
  ]
};

const KINDNESS: DeepUnit = {
  key: "kids-kindness",
  topicId: "hadith",
  branchId: "hadith-kindness",
  branch: { title: "Kindness at home", description: "Your mother three times, gentleness, mercy, and Muslims like one body." },
  name: "kindness",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "your-mother",
      title: "Your mother, three times",
      line: "A man asked who most deserves his good company.",
      facts: [
        "The Prophet ﷺ said: your mother. Then: your mother.",
        "Then again: your mother. Only then: your father.",
        "Be kind and helpful to your mum every day."
      ],
      source: hadith("bukhari", "5971", "Abu Hurairah", "Sahih", "A man asked: O Messenger of Allah, who most deserves my good company? He said: Your mother. He asked: Then who? He said: Your mother. He asked: Then who? He said: Your mother. He asked: Then who? He said: Your father.", "Who is more entitled to be treated with the best companionship by me"),
      difficulty: 1,
      questions: [
        { q: "How many times did he ﷺ say: your mother?", a: "Three times", wrong: ["Once", "Twice", "Five times"], why: "He said your mother three times, then your father." },
        { q: "Who came next, after the mother?", a: "The father", wrong: ["A friend", "A teacher", "A neighbour"], why: "On the fourth asking he said: your father." },
        { q: "Being kind to your mother is a big deed in Islam.", tf: true, why: "She is the one who most deserves your best company." }
      ]
    },
    {
      slug: "allah-loves-gentleness",
      title: "Allah loves gentleness",
      line: "Allah is Kind, and He loves kindness in everything.",
      facts: [
        "Gentle words work better than harsh ones.",
        "Allah gives for kindness what He does not give for harshness.",
        "The Prophet ﷺ said it to Aishah."
      ],
      source: hadith("muslim", "2593", "Aishah", "Sahih", "The Prophet ﷺ said: O Aishah, Allah is Kind and loves kindness, and He gives for kindness what He does not give for harshness.", "verily Allah is kind and He loves kindness"),
      difficulty: 1,
      questions: [
        { q: "What does Allah love?", a: "Kindness", wrong: ["Harshness", "Shouting", "Being rude"], why: "Allah is kind and He loves kindness." },
        { q: "To whom did he ﷺ say these words?", a: "Aishah", wrong: ["Bilal", "Umar", "Fatimah"], why: "He said: O Aishah, Allah is kind." },
        { q: "Allah gives more for kindness than for harshness.", tf: true, why: "He confers upon kindness what He does not confer upon severity." }
      ]
    },
    {
      slug: "be-merciful",
      title: "Be merciful on earth",
      line: "Be merciful on earth, and Allah will be merciful to you.",
      facts: [
        "Ar-Rahman, the Most Merciful, is one of Allah's names.",
        "Mercy to people and animals brings Allah's mercy to you.",
        "Keeping close to family brings you close to Allah."
      ],
      source: hadith("tirmidhi", "1924", "Abdullah ibn Amr", "Sahih", "The Prophet ﷺ said: The merciful are shown mercy by the Most Merciful. Be merciful to those on the earth, and the One above the heavens will be merciful to you.", "The merciful are shown mercy by Ar-Rahman"),
      difficulty: 1,
      questions: [
        { q: "Who are shown mercy by Ar-Rahman?", a: "The merciful", wrong: ["The strong", "The rich", "The loud"], why: "The merciful are shown mercy by Ar-Rahman." },
        { q: "What does Ar-Rahman mean?", a: "The Most Merciful", wrong: ["The King", "The Strong", "The First"], why: "Ar-Rahman, the Most Merciful, is one of Allah's names." },
        { q: "Being merciful to others brings Allah's mercy to you.", tf: true, why: "Be merciful on the earth, and you will be shown mercy." }
      ]
    },
    {
      slug: "one-body",
      title: "Like one body",
      line: "Believers are like one body in their love and mercy.",
      facts: [
        "When one part of the body hurts, the whole body feels it.",
        "When a Muslim is sad, others care and help.",
        "An-Nu'man ibn Bashir passed on these words."
      ],
      source: hadith("bukhari", "6011", "An-Nu'man ibn Bashir", "Sahih", "The Prophet ﷺ said: You see the believers in their mercy, love and kindness to one another like one body: when one part is unwell, the whole body shares the sleeplessness and fever.", "resembling one body"),
      difficulty: 2,
      questions: [
        { q: "What are believers like, in their love?", a: "One body", wrong: ["Two strangers", "A tall tree", "A closed door"], why: "Resembling one body." },
        { q: "What happens when one part of the body hurts?", a: "The whole body feels it", wrong: ["Nothing at all", "It is cut off", "Only that part knows"], why: "The whole body shares the sleeplessness and fever." },
        { q: "Muslims should care when another Muslim is hurting.", tf: true, why: "Believers are like one body in mercy and love." }
      ]
    },
    {
      slug: "speak-good",
      title: "Speak good or stay quiet",
      line: "Whoever believes in Allah should say good or stay quiet.",
      facts: [
        "Words can hurt or help; choose words that help.",
        "Do not hurt your neighbour, and be generous to guests.",
        "If you cannot say something good, it is better to be quiet."
      ],
      source: hadith("bukhari", "6136", "Abu Hurairah", "Sahih", "The Prophet ﷺ said: Whoever believes in Allah and the Last Day should not hurt his neighbour, should be generous to his guest, and should speak good or keep silent.", "should speak what is good or keep silent"),
      difficulty: 1,
      questions: [
        { q: "What should a believer do if they cannot say good?", a: "Stay quiet", wrong: ["Shout louder", "Say something mean", "Tease someone"], why: "Speak what is good or keep silent." },
        { q: "How should a believer treat a guest?", a: "Generously", wrong: ["Rudely", "Ignore them", "Make them wait outside"], why: "He should serve his guest generously." },
        { q: "A believer may hurt a neighbour if annoyed.", tf: false, why: "Whoever believes in Allah should not hurt his neighbor." }
      ]
    }
  ]
};

const FRIENDS: DeepUnit = {
  key: "kids-friends",
  topicId: "hadith",
  branchId: "hadith-friends",
  branch: { title: "Good friends", description: "Choosing friends, a mirror for your brother, telling him you love him, and good manners when you sit." },
  name: "good friends",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "choose-friends",
      title: "Choose good friends",
      line: "A person follows his friend's religion, so choose friends well.",
      facts: [
        "Abu Hurairah heard the Prophet ﷺ say it.",
        "A person follows the religion of his friend.",
        "So each of us should think about whom we befriend."
      ],
      source: hadith("abudawud", "4833", "Abu Hurairah", "Hasan (Al-Albani)", "The Prophet ﷺ said: a person follows the religion of his friend, so let each of you look at whom he takes as a friend.", "A man follows the religion of his friend; so each one should consider whom he makes his friend"),
      difficulty: 1,
      questions: [
        { q: "Whose religion does a person follow, said the Prophet ﷺ?", a: "His friend's", wrong: ["A stranger's", "No one's", "His enemy's"], why: "Abu Hurairah heard him ﷺ say: a man follows the religion of his friend." },
        { q: "What should each of us think about?", a: "Whom we take as a friend", wrong: ["What we eat for lunch", "Which game to play", "How fast we can run"], why: "So each one should consider whom he makes his friend." },
        { q: "Our friends do not change us at all.", tf: false, why: "No. A man follows the religion of his friend." }
      ]
    },
    {
      slug: "mirror",
      title: "A mirror for your brother",
      line: "A believer is a mirror for his brother in faith.",
      facts: [
        "The believer is the mirror of the believer.",
        "He guards his brother against loss.",
        "He protects him when he is away."
      ],
      source: hadith("abudawud", "4918", "Abu Hurairah", "Hasan (Al-Albani)", "The Prophet ﷺ said: the believer is the mirror of the believer. The believer is the brother of the believer: he guards him against loss and protects him when he is away.", "who guards him against loss and protects him when he is absent"),
      difficulty: 2,
      questions: [
        { q: "What did he ﷺ say a believer is for another believer?", a: "A mirror", wrong: ["A stranger", "A servant", "A judge"], why: "He also called the believer a brother who protects him when he is absent." },
        { q: "What does a believer do for his brother who is away?", a: "Protects him", wrong: ["Forgets him", "Talks about him", "Laughs at him"], why: "He guards him against loss and protects him when he is absent." },
        { q: "A good friend speaks badly of you when you are away.", tf: false, why: "No. The believer protects his brother when he is away." }
      ]
    },
    {
      slug: "tell-him",
      title: "Tell him you love him",
      line: "If you love someone for Allah's sake, tell him so.",
      facts: [
        "A man told the Prophet ﷺ that he loved another man.",
        "He ﷺ asked: have you told him? Go and tell him.",
        "The man said: I love you for Allah's sake."
      ],
      source: hadith("abudawud", "5125", "Anas ibn Malik", "Hasan (Al-Albani)", "A man said to the Prophet ﷺ: I love this man. He asked: have you told him? He said no. He ﷺ said: tell him. So he went to him and said: I love you for Allah's sake. The other said: may He for whose sake you love me love you.", "Have you informed him? He replied: No. He said: Inform him"),
      difficulty: 1,
      questions: [
        { q: "What did he ﷺ tell the man to do?", a: "Tell him you love him", wrong: ["Keep it a secret", "Give him money", "Write him a poem"], why: "He ﷺ asked if he had told him, then said: Inform him." },
        { q: "What did the other man answer?", a: "May Allah love you too", wrong: ["Thank you very much", "I do not know you", "Please go away"], why: "May He for Whose sake you love me love you." },
        { q: "The man loved the other man for Allah's sake.", tf: true, why: "He went to him and said: I love you for Allah's sake." }
      ]
    },
    {
      slug: "ask-before-sitting",
      title: "Ask before you sit between two",
      line: "Do not sit between two people without their permission.",
      facts: [
        "Abdullah ibn Amr heard the Prophet ﷺ say it.",
        "One should not sit between two people.",
        "You may sit there if the two of them give permission."
      ],
      source: hadith("abudawud", "4844", "Abdullah ibn Amr", "Hasan (Al-Albani)", "The Prophet ﷺ said: no one should sit between two people except with their permission.", "One should not sit between two men except with their permission"),
      difficulty: 1,
      questions: [
        { q: "When may you sit between two people?", a: "When they give permission", wrong: ["Whenever you like", "When you are tired", "When you are older"], why: "One should not sit between two men except with their permission." },
        { q: "Who narrated the manners of sitting between two?", a: "Abdullah ibn Amr", wrong: ["Abu Bakr", "Bilal", "Salman"], why: "Abdullah ibn Amr heard the Prophet ﷺ say it." },
        { q: "Asking before you sit between two people is good manners.", tf: true, why: "One should not sit between two men except with their permission." }
      ]
    },
    {
      slug: "good-character",
      title: "Good character, high rank",
      line: "Good character lifts a believer to a very high rank.",
      facts: [
        "Aishah heard the Prophet ﷺ say it.",
        "A believer with good character reaches a high rank.",
        "That is the rank of one who prays at night and fasts by day."
      ],
      source: hadith("abudawud", "4798", "Aishah", "Sahih (Al-Albani)", "The Prophet ﷺ said: by his good character a believer reaches the rank of one who prays at night and fasts by day.", "By his good character a believer will attain the degree of one who prays during the night and fasts during the day"),
      difficulty: 2,
      questions: [
        { q: "Whose rank does good character reach?", a: "One who prays at night and fasts by day", wrong: ["One who is very rich", "One who is very strong", "One who travels a lot"], why: "He will attain the degree of one who prays during the night and fasts during the day." },
        { q: "What lifts a believer to that high rank?", a: "Good character", wrong: ["A loud voice", "Fancy clothes", "Many toys"], why: "He ﷺ said: by his good character a believer will attain that degree." },
        { q: "Good manners are a great deed in Islam.", tf: true, why: "Good character reaches the rank of one who prays at night and fasts by day." }
      ]
    }
  ]
};

export const KIDS_HADITH_UNITS: DeepUnit[] = [DHIKR, SMALL_DEEDS, KINDNESS, FRIENDS];
