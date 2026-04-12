import type { LearningCourse, Lesson, ShopItem, UserProfile } from "../types";

const today = new Date().toISOString().slice(0, 10);

export const STARTER_USER: UserProfile = {
  id: 1001,
  username: "learner",
  displayName: "New Learner",
  avatarInitials: "NL",
  reviewHeartRestoreUsed: false,
  streakDays: 1,
  totalXp: 0,
  dailyGoalXp: 40,
  gems: 120,
  hearts: {
    current: 5,
    max: 5,
    unlimited: false,
    lastRefillDate: today
  },
  completedLessonIds: [],
  completedNodeIds: []
};

export const COURSE: LearningCourse = {
  id: "islam-foundations",
  title: "Sira Path",
  subtitle: "Start with foundations, then move into manners, Sahabah, and Quran with tafsir.",
  sections: [
    {
      id: "foundation",
      topicId: "foundation",
      title: "Foundation",
      description: "The first steps: greetings, praising Allah, and the kind words Muslims start with.",
      badge: "Start Here",
      focus: "Salam, Alhamdulillah, and replying with kindness.",
      mascot: "hijabi",
      accentColor: "#1CB66D",
      starsTarget: 9,
      nodes: [
        {
          id: "foundation-niyyah",
          skillId: "skill_foundation_001",
          title: "As-Salamu Alaikum",
          topicId: "foundation",
          kind: "skill",
          lessonIds: ["lesson-foundation-niyyah"],
          requiredNodeIds: [],
          xpReward: 8,
          starsReward: 3
        },
        {
          id: "foundation-guidance",
          skillId: "skill_foundation_002",
          title: "Say Alhamdulillah",
          topicId: "foundation",
          kind: "skill",
          lessonIds: ["lesson-foundation-guidance"],
          requiredNodeIds: ["foundation-niyyah"],
          xpReward: 8,
          starsReward: 3
        },
        {
          id: "foundation-character",
          skillId: "skill_foundation_003",
          title: "Reply with Peace",
          topicId: "foundation",
          kind: "review",
          lessonIds: ["lesson-foundation-character"],
          requiredNodeIds: ["foundation-guidance"],
          xpReward: 10,
          starsReward: 3
        }
      ]
    },
    {
      id: "manners",
      topicId: "manners",
      title: "Manners",
      description: "Daily adab for speech, family, and honesty.",
      badge: "Topic 2",
      focus: "Kindness, respect, truthful speech, and good conduct.",
      mascot: "hijabi",
      accentColor: "#14B884",
      starsTarget: 9,
      nodes: [
        {
          id: "manners-salam",
          skillId: "skill_adab_001",
          title: "Salam",
          topicId: "manners",
          kind: "skill",
          lessonIds: ["lesson-salam"],
          requiredNodeIds: [],
          xpReward: 10,
          starsReward: 3
        },
        {
          id: "manners-truthful",
          skillId: "skill_adab_002",
          title: "Truthfulness",
          topicId: "manners",
          kind: "skill",
          lessonIds: ["lesson-truthful"],
          requiredNodeIds: ["manners-salam"],
          xpReward: 10,
          starsReward: 3
        },
        {
          id: "manners-parents",
          skillId: "skill_adab_003",
          title: "Parents and elders",
          topicId: "manners",
          kind: "skill",
          lessonIds: ["lesson-parents"],
          requiredNodeIds: ["manners-truthful"],
          xpReward: 12,
          starsReward: 3
        }
      ]
    },
    {
      id: "sahabah",
      topicId: "sahabah",
      title: "Sahabah",
      description: "Stories and qualities from the companions.",
      badge: "Topic 3",
      focus: "Truthfulness, courage, patience, and loyalty.",
      mascot: "muslim_man",
      accentColor: "#0C9F8C",
      starsTarget: 9,
      nodes: [
        {
          id: "sahabah-abubakr",
          skillId: "skill_sahabah_001",
          title: "Abu Bakr",
          topicId: "sahabah",
          kind: "story",
          lessonIds: ["lesson-abubakr"],
          requiredNodeIds: [],
          xpReward: 12,
          starsReward: 3
        },
        {
          id: "sahabah-umar",
          skillId: "skill_sahabah_002",
          title: "Umar ibn al-Khattab",
          topicId: "sahabah",
          kind: "story",
          lessonIds: ["lesson-umar"],
          requiredNodeIds: ["sahabah-abubakr"],
          xpReward: 12,
          starsReward: 3
        },
        {
          id: "sahabah-bilal",
          skillId: "skill_sahabah_003",
          title: "Bilal ibn Rabah",
          topicId: "sahabah",
          kind: "story",
          lessonIds: ["lesson-bilal"],
          requiredNodeIds: ["sahabah-umar"],
          xpReward: 14,
          starsReward: 3
        }
      ]
    },
    {
      id: "quran_tafseer",
      topicId: "quran_tafseer",
      title: "Quran and Tafseer",
      description: "Short lessons on verses, tafsir, and the meanings behind them.",
      badge: "Topic 4",
      focus: "Guidance, oneness, reflection, and learning the Quran well.",
      mascot: "hijabi",
      accentColor: "#1688C4",
      starsTarget: 9,
      nodes: [
        {
          id: "quran-fatiha",
          skillId: "skill_quran_001",
          title: "Al-Fatihah",
          topicId: "quran_tafseer",
          kind: "skill",
          lessonIds: ["lesson-fatiha"],
          requiredNodeIds: [],
          xpReward: 12,
          starsReward: 3
        },
        {
          id: "quran-ikhlas",
          skillId: "skill_quran_002",
          title: "Surah Al-Ikhlas",
          topicId: "quran_tafseer",
          kind: "skill",
          lessonIds: ["lesson-ikhlas"],
          requiredNodeIds: ["quran-fatiha"],
          xpReward: 12,
          starsReward: 3
        },
        {
          id: "quran-tafseer",
          skillId: "skill_quran_003",
          title: "Tafseer themes",
          topicId: "quran_tafseer",
          kind: "review",
          lessonIds: ["lesson-tafseer"],
          requiredNodeIds: ["quran-ikhlas"],
          xpReward: 14,
          starsReward: 3
        }
      ]
    }
  ]
};

export const LESSONS_BY_ID: Record<string, Lesson> = {
  "lesson-foundation-niyyah": {
    id: "lesson-foundation-niyyah",
    nodeId: "foundation-niyyah",
    title: "As-Salamu Alaikum",
    intro: "One of the first Muslim habits is greeting people with peace: As-salamu alaikum.",
    xpReward: 8,
    sources: [
      {
        id: "source-foundation-salam-riyad-844",
        site: "Sunnah.com",
        category: "hadith",
        title: "The excellence of spreading salam",
        url: "https://sunnah.com/riyadussalihin:844",
        reference: "Riyad as-Salihin 844",
        from: "Abdullah bin 'Amr bin Al-'As; gathered by Imam an-Nawawi from Al-Bukhari and Muslim",
        grade: "Muttafaqun 'alayh",
        summary: "The Prophet taught that a beautiful act of Islam is to greet people with salam whether you know them or not."
      },
      {
        id: "source-foundation-salam-quran-4-86",
        site: "Quran.com",
        category: "tafsir",
        title: "Return greetings well",
        url: "https://quran.com/en/4:86/tafsirs/ar-tafsir-ibn-kathir",
        reference: "Quran 4:86",
        from: "The Quran, with Tafsir Ibn Kathir on Quran.com",
        grade: "Quran",
        summary: "Allah teaches believers to answer a greeting with one that is equal or better, making salam part of everyday worship."
      }
    ],
    challenges: [
      {
        id: "foundation-niyyah-1",
        type: "multiple_choice",
        prompt: "What is the basic Muslim greeting you should learn first?",
        choices: [
          { id: "a", label: "As-salamu alaikum" },
          { id: "b", label: "Nice to meet you only" },
          { id: "c", label: "See you later" }
        ],
        correctChoiceId: "a",
        explanation: "As-salamu alaikum is the greeting of peace Muslims begin with."
      },
      {
        id: "foundation-niyyah-2",
        type: "true_false",
        prompt: "A Muslim should keep salam for friends only and skip strangers.",
        choices: [
          { id: "true", label: "True" },
          { id: "false", label: "False" }
        ],
        correctChoiceId: "false",
        explanation: "The Prophet encouraged greeting people whether you know them or not."
      },
      {
        id: "foundation-niyyah-3",
        type: "multiple_choice",
        prompt: "What does salam bring into a conversation first?",
        choices: [
          { id: "a", label: "Peace and warmth" },
          { id: "b", label: "Showing off" },
          { id: "c", label: "Awkward silence" }
        ],
        correctChoiceId: "a",
        explanation: "Salam begins with peace, and that shapes the tone of the whole meeting."
      }
    ]
  },
  "lesson-foundation-guidance": {
    id: "lesson-foundation-guidance",
    nodeId: "foundation-guidance",
    title: "Say Alhamdulillah",
    intro: "When something good happens, Muslims praise Allah and say Alhamdulillah.",
    xpReward: 8,
    sources: [
      {
        id: "source-foundation-alhamdulillah-hisn-218",
        site: "Sunnah.com",
        category: "hadith",
        title: "What to say after pleasing news",
        url: "https://sunnah.com/hisn:218",
        reference: "Hisn al-Muslim 218",
        from: "A Prophetic dhikr cited in Ibn As-Sunni's 'Amal al-Yawm wa al-Laylah and authenticated by Al-Hakim; also noted by Al-Albani",
        grade: "Authentic",
        summary: "When something pleased him, the Prophet said: Alhamdu lillahi alladhi bi ni'matihi tatimmu as-salihat."
      },
      {
        id: "source-foundation-alhamdulillah-quran-93-11",
        site: "Quran.com",
        category: "tafsir",
        title: "Proclaim the blessings of your Lord",
        url: "https://quran.com/en/93:11/tafsirs/ar-tafsir-ibn-kathir",
        reference: "Quran 93:11",
        from: "The Quran, with Tafsir Ibn Kathir on Quran.com",
        grade: "Quran",
        summary: "Allah teaches believers to mention His blessings, which fits the habit of thanking Him when good comes."
      }
    ],
    challenges: [
      {
        id: "foundation-guidance-1",
        type: "multiple_choice",
        prompt: "What should a Muslim say when good news comes?",
        choices: [
          { id: "a", label: "Alhamdulillah" },
          { id: "b", label: "Whatever" },
          { id: "c", label: "That was all me" }
        ],
        correctChoiceId: "a",
        explanation: "Praising Allah is a beginner Muslim habit when something good happens."
      },
      {
        id: "foundation-guidance-2",
        type: "true_false",
        prompt: "Alhamdulillah means praise belongs to Allah.",
        choices: [
          { id: "true", label: "True" },
          { id: "false", label: "False" }
        ],
        correctChoiceId: "true",
        explanation: "That is why Muslims say it after blessings and good news."
      },
      {
        id: "foundation-guidance-3",
        type: "multiple_choice",
        prompt: "Which thought matches this lesson best?",
        choices: [
          { id: "a", label: "Thank Allah for the blessing" },
          { id: "b", label: "Pretend the blessing came from nowhere" },
          { id: "c", label: "Keep praise only for yourself" }
        ],
        correctChoiceId: "a",
        explanation: "A Muslim connects good moments back to Allah with gratitude."
      }
    ]
  },
  "lesson-foundation-character": {
    id: "lesson-foundation-character",
    nodeId: "foundation-character",
    title: "Reply with peace",
    intro: "When someone greets you, answer with wa alaykum as-salam, and answer well.",
    xpReward: 10,
    sources: [
      {
        id: "source-foundation-reply-quran-4-86",
        site: "Quran.com",
        category: "tafsir",
        title: "Return a greeting with one better",
        url: "https://quran.com/en/4:86/tafsirs/ar-tafsir-ibn-kathir",
        reference: "Quran 4:86",
        from: "The Quran, with Tafsir Ibn Kathir on Quran.com",
        grade: "Quran",
        summary: "Allah commands believers to return greetings with something equal or better."
      },
      {
        id: "source-foundation-reply-tirmidhi-2689",
        site: "Sunnah.com",
        category: "hadith",
        title: "More complete salam brings more reward",
        url: "https://sunnah.com/tirmidhi:2689",
        reference: "Jami` at-Tirmidhi 2689",
        from: "'Imran bin Husain; collected by Imam at-Tirmidhi",
        grade: "Hasan",
        summary: "The Prophet counted more reward for the fuller forms of salam, teaching Muslims to answer generously."
      }
    ],
    challenges: [
      {
        id: "foundation-character-1",
        type: "multiple_choice",
        prompt: "If someone says 'As-salamu alaikum,' what should you answer?",
        choices: [
          { id: "a", label: "Wa alaykum as-salam" },
          { id: "b", label: "Maybe later" },
          { id: "c", label: "No response needed" }
        ],
        correctChoiceId: "a",
        explanation: "Returning salam is part of the Muslim way of speaking with kindness."
      },
      {
        id: "foundation-character-2",
        type: "true_false",
        prompt: "The Quran teaches believers to answer a greeting with one equal or better.",
        choices: [
          { id: "true", label: "True" },
          { id: "false", label: "False" }
        ],
        correctChoiceId: "true",
        explanation: "That is exactly what Allah teaches in Quran 4:86."
      },
      {
        id: "foundation-character-3",
        type: "multiple_choice",
        prompt: "Which reply is the more complete salam?",
        choices: [
          { id: "a", label: "Wa alaykum as-salam wa rahmatullah" },
          { id: "b", label: "Hey" },
          { id: "c", label: "Silence" }
        ],
        correctChoiceId: "a",
        explanation: "The fuller reply carries more beauty and reward in the sunnah."
      }
    ]
  },
  "lesson-salam": {
    id: "lesson-salam",
    nodeId: "manners-salam",
    title: "Salam",
    intro: "Start with peace, warmth, and respect.",
    xpReward: 10,
    sources: [
      {
        id: "source-salam-ibnmajah-68",
        site: "Sunnah.com",
        category: "hadith",
        title: "Sunan Ibn Majah 68",
        url: "https://sunnah.com/ibnmajah:68",
        summary: "Spreading salam is presented as a way to build love among believers."
      }
    ],
    challenges: [
      {
        id: "salam-1",
        type: "multiple_choice",
        prompt: "Which greeting means peace be upon you?",
        choices: [
          { id: "a", label: "As-salamu alaykum" },
          { id: "b", label: "Welcome back" },
          { id: "c", label: "Good game" }
        ],
        correctChoiceId: "a",
        explanation: "As-salamu alaykum is the greeting of peace."
      },
      {
        id: "salam-2",
        type: "true_false",
        prompt: "Returning salam is part of good manners.",
        choices: [
          { id: "true", label: "True" },
          { id: "false", label: "False" }
        ],
        correctChoiceId: "true",
        explanation: "Returning a greeting is a simple way to honor the other person."
      },
      {
        id: "salam-3",
        type: "multiple_choice",
        prompt: "What fits salam best?",
        choices: [
          { id: "a", label: "A kind tone" },
          { id: "b", label: "Rolling your eyes" },
          { id: "c", label: "Ignoring the person" }
        ],
        correctChoiceId: "a",
        explanation: "The greeting matters, and the way it is delivered matters too."
      }
    ]
  },
  "lesson-truthful": {
    id: "lesson-truthful",
    nodeId: "manners-truthful",
    title: "Truthfulness",
    intro: "Adab includes honesty, trust, and clear speech.",
    xpReward: 10,
    sources: [
      {
        id: "source-truth-bukhari-1",
        site: "Sunnah.com",
        category: "hadith",
        title: "Sahih al-Bukhari 1",
        url: "https://sunnah.com/bukhari/1/1",
        summary: "A sincere intention pushes a learner toward honesty and away from showing off."
      }
    ],
    challenges: [
      {
        id: "truth-1",
        type: "multiple_choice",
        prompt: "If you break something by mistake, what is the best response?",
        choices: [
          { id: "a", label: "Tell the truth and apologize" },
          { id: "b", label: "Hide it and blame someone else" },
          { id: "c", label: "Stay silent forever" }
        ],
        correctChoiceId: "a",
        explanation: "Honesty keeps trust alive even when a mistake happened."
      },
      {
        id: "truth-2",
        type: "true_false",
        prompt: "Truthfulness is part of strong character.",
        choices: [
          { id: "true", label: "True" },
          { id: "false", label: "False" }
        ],
        correctChoiceId: "true",
        explanation: "Truthfulness supports trust, fairness, and self-respect."
      },
      {
        id: "truth-3",
        type: "multiple_choice",
        prompt: "Which habit builds trust?",
        choices: [
          { id: "a", label: "Keeping your word" },
          { id: "b", label: "Changing your story" },
          { id: "c", label: "Mocking a promise" }
        ],
        correctChoiceId: "a",
        explanation: "Keeping your word is a practical form of honesty."
      }
    ]
  },
  "lesson-parents": {
    id: "lesson-parents",
    nodeId: "manners-parents",
    title: "Parents and elders",
    intro: "Respect shows up in speech, attention, and service.",
    xpReward: 12,
    sources: [
      {
        id: "source-parents-riyad-308",
        site: "Sunnah.com",
        category: "hadith",
        title: "Riyad as-Salihin 308",
        url: "https://sunnah.com/riyadussalihin:308",
        summary: "Speaking good or remaining silent is part of faith, and it directly shapes family manners."
      }
    ],
    challenges: [
      {
        id: "parents-1",
        type: "multiple_choice",
        prompt: "Which action shows respect to parents?",
        choices: [
          { id: "a", label: "Answering gently" },
          { id: "b", label: "Speaking harshly" },
          { id: "c", label: "Walking away on purpose" }
        ],
        correctChoiceId: "a",
        explanation: "Gentle words are a strong sign of good adab."
      },
      {
        id: "parents-2",
        type: "true_false",
        prompt: "Helping at home can be a form of worshipful service.",
        choices: [
          { id: "true", label: "True" },
          { id: "false", label: "False" }
        ],
        correctChoiceId: "true",
        explanation: "Service at home can reflect gratitude and character."
      },
      {
        id: "parents-3",
        type: "multiple_choice",
        prompt: "What should you do when an elder is speaking?",
        choices: [
          { id: "a", label: "Listen carefully" },
          { id: "b", label: "Interrupt quickly" },
          { id: "c", label: "Look at your phone" }
        ],
        correctChoiceId: "a",
        explanation: "Listening is one of the clearest forms of respect."
      }
    ]
  },
  "lesson-abubakr": {
    id: "lesson-abubakr",
    nodeId: "sahabah-abubakr",
    title: "Abu Bakr",
    intro: "A lesson in truthfulness, loyalty, and calm faith.",
    xpReward: 12,
    sources: [],
    challenges: [
      {
        id: "abubakr-1",
        type: "multiple_choice",
        prompt: "Which title is Abu Bakr known for?",
        choices: [
          { id: "a", label: "As-Siddiq" },
          { id: "b", label: "The Archer" },
          { id: "c", label: "The Traveler" }
        ],
        correctChoiceId: "a",
        explanation: "As-Siddiq means the truthful one."
      },
      {
        id: "abubakr-2",
        type: "true_false",
        prompt: "Abu Bakr was known for steady support and loyalty.",
        choices: [
          { id: "true", label: "True" },
          { id: "false", label: "False" }
        ],
        correctChoiceId: "true",
        explanation: "His story teaches trust, courage, and steadiness."
      },
      {
        id: "abubakr-3",
        type: "multiple_choice",
        prompt: "What quality best fits this lesson?",
        choices: [
          { id: "a", label: "Truthfulness" },
          { id: "b", label: "Showing off" },
          { id: "c", label: "Carelessness" }
        ],
        correctChoiceId: "a",
        explanation: "Truthfulness is the anchor of this story."
      }
    ]
  },
  "lesson-umar": {
    id: "lesson-umar",
    nodeId: "sahabah-umar",
    title: "Umar ibn al-Khattab",
    intro: "Justice and courage belong together.",
    xpReward: 12,
    sources: [],
    challenges: [
      {
        id: "umar-1",
        type: "multiple_choice",
        prompt: "Which value is Umar ibn al-Khattab often remembered for?",
        choices: [
          { id: "a", label: "Justice" },
          { id: "b", label: "Wastefulness" },
          { id: "c", label: "Laziness" }
        ],
        correctChoiceId: "a",
        explanation: "Justice is one of the strongest themes of his story."
      },
      {
        id: "umar-2",
        type: "true_false",
        prompt: "Responsibility means caring about how your choices affect people.",
        choices: [
          { id: "true", label: "True" },
          { id: "false", label: "False" }
        ],
        correctChoiceId: "true",
        explanation: "Responsibility is never only private."
      },
      {
        id: "umar-3",
        type: "multiple_choice",
        prompt: "What should courage be joined with?",
        choices: [
          { id: "a", label: "Fairness" },
          { id: "b", label: "Mocking others" },
          { id: "c", label: "Anger without reason" }
        ],
        correctChoiceId: "a",
        explanation: "Good courage protects fairness and dignity."
      }
    ]
  },
  "lesson-bilal": {
    id: "lesson-bilal",
    nodeId: "sahabah-bilal",
    title: "Bilal ibn Rabah",
    intro: "Patience, sincerity, and strength under hardship.",
    xpReward: 14,
    sources: [],
    challenges: [
      {
        id: "bilal-1",
        type: "multiple_choice",
        prompt: "Which quality stands out in the story of Bilal ibn Rabah?",
        choices: [
          { id: "a", label: "Patience and steadfastness" },
          { id: "b", label: "Boasting" },
          { id: "c", label: "Careless speech" }
        ],
        correctChoiceId: "a",
        explanation: "His story is remembered for patience and firm faith."
      },
      {
        id: "bilal-2",
        type: "true_false",
        prompt: "Sincerity means your heart and actions match.",
        choices: [
          { id: "true", label: "True" },
          { id: "false", label: "False" }
        ],
        correctChoiceId: "true",
        explanation: "Sincerity brings clarity and firmness."
      },
      {
        id: "bilal-3",
        type: "multiple_choice",
        prompt: "What can we learn from this lesson?",
        choices: [
          { id: "a", label: "Stay firm on what is right" },
          { id: "b", label: "Give up quickly" },
          { id: "c", label: "Follow pressure blindly" }
        ],
        correctChoiceId: "a",
        explanation: "Bilal's story teaches strength with sincerity."
      }
    ]
  },
  "lesson-fatiha": {
    id: "lesson-fatiha",
    nodeId: "quran-fatiha",
    title: "Al-Fatihah",
    intro: "The opening surah teaches praise, mercy, and guidance.",
    xpReward: 12,
    sources: [
      {
        id: "source-fatiha-2-2",
        site: "Quran.com",
        category: "tafsir",
        title: "Al-Baqarah 2:2 Tafsir",
        url: "https://quran.com/en/al-baqarah/2/tafsirs",
        summary: "This source frames revelation as certain guidance, which helps learners connect Al-Fatihah's request for guidance with Quran study."
      },
      {
        id: "source-quran-teach-abudawud-1452",
        site: "Sunnah.com",
        category: "hadith",
        title: "Sunan Abi Dawud 1452",
        url: "https://sunnah.com/abudawud:1452",
        summary: "This hadith honors learning and teaching the Quran, reinforcing why beginning with Al-Fatihah matters."
      }
    ],
    challenges: [
      {
        id: "fatiha-1",
        type: "multiple_choice",
        prompt: "Al-Fatihah is commonly known as:",
        choices: [
          { id: "a", label: "The Opening" },
          { id: "b", label: "The Valley" },
          { id: "c", label: "The Return" }
        ],
        correctChoiceId: "a",
        explanation: "Al-Fatihah is often translated as The Opening."
      },
      {
        id: "fatiha-2",
        type: "true_false",
        prompt: "One of its central themes is asking for guidance.",
        choices: [
          { id: "true", label: "True" },
          { id: "false", label: "False" }
        ],
        correctChoiceId: "true",
        explanation: "The surah teaches the believer to ask for the straight path."
      },
      {
        id: "fatiha-3",
        type: "multiple_choice",
        prompt: "Which theme appears in Al-Fatihah?",
        choices: [
          { id: "a", label: "Mercy" },
          { id: "b", label: "Mockery" },
          { id: "c", label: "Waste" }
        ],
        correctChoiceId: "a",
        explanation: "Mercy is one of the key themes woven through the surah."
      }
    ]
  },
  "lesson-ikhlas": {
    id: "lesson-ikhlas",
    nodeId: "quran-ikhlas",
    title: "Surah Al-Ikhlas",
    intro: "A short surah with a strong lesson about the oneness of Allah.",
    xpReward: 12,
    sources: [
      {
        id: "source-ikhlas-quran-112-1",
        site: "Quran.com",
        category: "tafsir",
        title: "Al-Ikhlas 112:1 Tafsir",
        url: "https://quran.com/al-ikhlas/1/tafsirs",
        summary: "The tafsir centers this surah on pure monotheism and the uniqueness of Allah."
      }
    ],
    challenges: [
      {
        id: "ikhlas-1",
        type: "multiple_choice",
        prompt: "What is the main theme of Surah Al-Ikhlas?",
        choices: [
          { id: "a", label: "The oneness of Allah" },
          { id: "b", label: "A travel story" },
          { id: "c", label: "Trade and money" }
        ],
        correctChoiceId: "a",
        explanation: "The surah centers the oneness and uniqueness of Allah."
      },
      {
        id: "ikhlas-2",
        type: "true_false",
        prompt: "Short surahs can carry deep meaning.",
        choices: [
          { id: "true", label: "True" },
          { id: "false", label: "False" }
        ],
        correctChoiceId: "true",
        explanation: "Length and depth are not the same thing."
      },
      {
        id: "ikhlas-3",
        type: "multiple_choice",
        prompt: "What does tafsir help with?",
        choices: [
          { id: "a", label: "Understanding meaning" },
          { id: "b", label: "Ignoring context" },
          { id: "c", label: "Skipping reflection" }
        ],
        correctChoiceId: "a",
        explanation: "Tafsir helps learners understand message and context."
      }
    ]
  },
  "lesson-tafseer": {
    id: "lesson-tafseer",
    nodeId: "quran-tafseer",
    title: "Tafseer themes",
    intro: "Look for big themes like guidance, mercy, sincerity, and reflection.",
    xpReward: 14,
    sources: [
      {
        id: "source-tafsir-quran-16-44",
        site: "Quran.com",
        category: "tafsir",
        title: "An-Nahl 16:44 Tafsir",
        url: "https://quran.com/en/16:44/tafsirs/tazkirul-quran-en",
        summary: "This tafsir highlights that revelation is meant to be explained and reflected on, not rushed through."
      },
      {
        id: "source-tafsir-quran-hadith",
        site: "Sunnah.com",
        category: "hadith",
        title: "Sunan Abi Dawud 1452",
        url: "https://sunnah.com/abudawud:1452",
        summary: "Learning the Quran well is praised, which gives motivation to study its meanings with care."
      }
    ],
    challenges: [
      {
        id: "tafseer-1",
        type: "multiple_choice",
        prompt: "Which phrase best describes tafsir?",
        choices: [
          { id: "a", label: "Explaining the meaning of verses" },
          { id: "b", label: "Collecting random words" },
          { id: "c", label: "Avoiding reflection" }
        ],
        correctChoiceId: "a",
        explanation: "Tafsir helps learners understand what verses are teaching."
      },
      {
        id: "tafseer-2",
        type: "true_false",
        prompt: "Themes like guidance and mercy can connect different surahs.",
        choices: [
          { id: "true", label: "True" },
          { id: "false", label: "False" }
        ],
        correctChoiceId: "true",
        explanation: "Big themes help people see how the Quran teaches across passages."
      },
      {
        id: "tafseer-3",
        type: "multiple_choice",
        prompt: "Which practice fits Quran study best?",
        choices: [
          { id: "a", label: "Read, reflect, and ask what the verse teaches" },
          { id: "b", label: "Rush and never think about it" },
          { id: "c", label: "Treat every verse like unrelated trivia" }
        ],
        correctChoiceId: "a",
        explanation: "Reflection turns reading into learning."
      }
    ]
  }
};

export const SHOP_ITEMS: ShopItem[] = [
  {
    id: "watch-ad-heart",
    type: "rewarded_ad",
    name: "Watch and recover",
    localizedDescription: "Earn one heart after a short sponsor break.",
    price: 0,
    currencyType: "rewarded_ad",
    heartsGranted: 1
  },
  {
    id: "heart-pack-small",
    type: "heart_pack",
    name: "Heart pack",
    localizedDescription: "Add five hearts for a longer study session.",
    price: 0.99,
    currencyType: "USD",
    productId: "heart_pack_small",
    heartsGranted: 5
  },
  {
    id: "membership-monthly",
    type: "monthly_membership",
    name: "Monthly membership",
    localizedDescription: "Study with unlimited hearts and no sponsor breaks.",
    price: 4.99,
    currencyType: "USD",
    productId: "membership_monthly",
    unlimitedHearts: true,
    removesAds: true,
    durationDays: 30
  }
];

export const allNodes = COURSE.sections.flatMap((section) => section.nodes);

export function findNodeByLessonId(lessonId: string) {
  return allNodes.find((node) => node.lessonIds.includes(lessonId));
}
