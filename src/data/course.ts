import type { LearningCourse, Lesson, ShopItem, UserProfile } from "../types";

const today = new Date().toISOString().slice(0, 10);

export const STARTER_USER: UserProfile = {
  id: 1001,
  username: "learner",
  displayName: "New Learner",
  avatarInitials: "NL",
  streakDays: 3,
  totalXp: 10,
  dailyGoalXp: 40,
  gems: 120,
  hearts: {
    current: 5,
    max: 5,
    unlimited: false,
    lastRefillDate: today
  },
  completedLessonIds: ["lesson-salam"],
  completedNodeIds: ["manners-salam"]
};

export const COURSE: LearningCourse = {
  id: "islam-foundations",
  title: "Sira Path",
  subtitle: "Pick a topic and move through it one circle at a time.",
  sections: [
    {
      id: "manners",
      topicId: "manners",
      title: "Manners",
      description: "Daily adab for speech, family, and honesty.",
      badge: "Topic 1",
      focus: "Kindness, respect, and truthful behavior.",
      mascot: "hijabi",
      accentColor: "#14B884",
      nodes: [
        {
          id: "manners-salam",
          skillId: "skill_adab_001",
          title: "Salam",
          topicId: "manners",
          kind: "skill",
          lessonIds: ["lesson-salam"],
          requiredNodeIds: [],
          xpReward: 10
        },
        {
          id: "manners-truthful",
          skillId: "skill_adab_002",
          title: "Truthfulness",
          topicId: "manners",
          kind: "skill",
          lessonIds: ["lesson-truthful"],
          requiredNodeIds: ["manners-salam"],
          xpReward: 10
        },
        {
          id: "manners-parents",
          skillId: "skill_adab_003",
          title: "Parents and elders",
          topicId: "manners",
          kind: "skill",
          lessonIds: ["lesson-parents"],
          requiredNodeIds: ["manners-truthful"],
          xpReward: 12
        }
      ]
    },
    {
      id: "sahabah",
      topicId: "sahabah",
      title: "Sahabah",
      description: "Stories and qualities from the companions.",
      badge: "Topic 2",
      focus: "Truthfulness, courage, patience, and loyalty.",
      mascot: "muslim_man",
      accentColor: "#0C9F8C",
      nodes: [
        {
          id: "sahabah-abubakr",
          skillId: "skill_sahabah_001",
          title: "Abu Bakr",
          topicId: "sahabah",
          kind: "story",
          lessonIds: ["lesson-abubakr"],
          requiredNodeIds: [],
          xpReward: 12
        },
        {
          id: "sahabah-umar",
          skillId: "skill_sahabah_002",
          title: "Umar ibn al-Khattab",
          topicId: "sahabah",
          kind: "story",
          lessonIds: ["lesson-umar"],
          requiredNodeIds: ["sahabah-abubakr"],
          xpReward: 12
        },
        {
          id: "sahabah-bilal",
          skillId: "skill_sahabah_003",
          title: "Bilal ibn Rabah",
          topicId: "sahabah",
          kind: "story",
          lessonIds: ["lesson-bilal"],
          requiredNodeIds: ["sahabah-umar"],
          xpReward: 14
        }
      ]
    },
    {
      id: "quran_tafseer",
      topicId: "quran_tafseer",
      title: "Quran and Tafseer",
      description: "Short lessons on verses, themes, and meanings.",
      badge: "Topic 3",
      focus: "Guidance, mercy, sincerity, and reflection.",
      mascot: "hijabi",
      accentColor: "#1688C4",
      nodes: [
        {
          id: "quran-fatiha",
          skillId: "skill_quran_001",
          title: "Al-Fatihah",
          topicId: "quran_tafseer",
          kind: "skill",
          lessonIds: ["lesson-fatiha"],
          requiredNodeIds: [],
          xpReward: 12
        },
        {
          id: "quran-ikhlas",
          skillId: "skill_quran_002",
          title: "Surah Al-Ikhlas",
          topicId: "quran_tafseer",
          kind: "skill",
          lessonIds: ["lesson-ikhlas"],
          requiredNodeIds: ["quran-fatiha"],
          xpReward: 12
        },
        {
          id: "quran-tafseer",
          skillId: "skill_quran_003",
          title: "Tafseer themes",
          topicId: "quran_tafseer",
          kind: "review",
          lessonIds: ["lesson-tafseer"],
          requiredNodeIds: ["quran-ikhlas"],
          xpReward: 14
        }
      ]
    }
  ]
};

export const LESSONS_BY_ID: Record<string, Lesson> = {
  "lesson-salam": {
    id: "lesson-salam",
    nodeId: "manners-salam",
    title: "Salam",
    intro: "Start with peace, warmth, and respect.",
    xpReward: 10,
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
        prompt: "What does tafseer help with?",
        choices: [
          { id: "a", label: "Understanding meaning" },
          { id: "b", label: "Ignoring context" },
          { id: "c", label: "Skipping reflection" }
        ],
        correctChoiceId: "a",
        explanation: "Tafseer helps learners understand message and context."
      }
    ]
  },
  "lesson-tafseer": {
    id: "lesson-tafseer",
    nodeId: "quran-tafseer",
    title: "Tafseer themes",
    intro: "Look for big themes like mercy, guidance, sincerity, and gratitude.",
    xpReward: 14,
    challenges: [
      {
        id: "tafseer-1",
        type: "multiple_choice",
        prompt: "Which phrase best describes tafseer?",
        choices: [
          { id: "a", label: "Explaining the meaning of verses" },
          { id: "b", label: "Collecting random words" },
          { id: "c", label: "Avoiding reflection" }
        ],
        correctChoiceId: "a",
        explanation: "Tafseer helps learners understand what verses are teaching."
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
