import type { Challenge, LearningCourse, Lesson, LessonSource, ShopItem, UserProfile } from "../types";

const today = new Date().toISOString().slice(0, 10);

type ChoiceTuple = [string, string];

function quranSource(
  id: string,
  title: string,
  url: string,
  reference: string,
  summary: string,
  from = "The Quran, with tafsir on Quran.com"
): LessonSource {
  return {
    id,
    site: "Quran.com",
    category: "tafsir",
    title,
    url,
    reference,
    from,
    grade: "Quran",
    summary
  };
}

function hadithSource(
  id: string,
  title: string,
  url: string,
  reference: string,
  from: string,
  grade: string,
  summary: string
): LessonSource {
  return {
    id,
    site: "Sunnah.com",
    category: "hadith",
    title,
    url,
    reference,
    from,
    grade,
    summary
  };
}

function mc(
  id: string,
  prompt: string,
  choices: ChoiceTuple[],
  correctChoiceId: string,
  explanation: string
): Challenge {
  return {
    id,
    type: "multiple_choice",
    prompt,
    choices: choices.map(([choiceId, label]) => ({ id: choiceId, label })),
    correctChoiceId,
    explanation
  };
}

function tf(id: string, prompt: string, isTrue: boolean, explanation: string): Challenge {
  return {
    id,
    type: "true_false",
    prompt,
    choices: [
      { id: "true", label: "True" },
      { id: "false", label: "False" }
    ],
    correctChoiceId: isTrue ? "true" : "false",
    explanation
  };
}

function lesson(
  id: string,
  nodeId: string,
  title: string,
  intro: string,
  xpReward: number,
  sources: LessonSource[],
  challenges: Challenge[]
): Lesson {
  return {
    id,
    nodeId,
    title,
    intro,
    xpReward,
    sources,
    challenges
  };
}

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
  subtitle: "Start with foundations, build manners and marriage wisdom, meet the Sahabah, reflect on Quran and tafsir, and travel from Adam to Muhammad.",
  sections: [
    {
      id: "foundation",
      topicId: "foundation",
      title: "Foundation",
      description: "The first Muslim habits: greeting with peace, praising Allah, saying Bismillah, and answering people well.",
      badge: "Start Here",
      focus: "Salam, Alhamdulillah, Bismillah, everyday phrases, and gentle replies.",
      mascot: "hijabi",
      accentColor: "#1CB66D",
      starsTarget: 15,
      branches: [
        {
          id: "foundation-greetings",
          title: "Greetings and replies",
          description: "Begin with salam and learn how Muslims return peace beautifully."
        },
        {
          id: "foundation-daily-words",
          title: "Daily words of dhikr",
          description: "Practice the small phrases Muslims use all day: Alhamdulillah, Bismillah, and more."
        }
      ],
      nodes: [
        {
          id: "foundation-niyyah",
          skillId: "skill_foundation_001",
          title: "As-Salamu Alaikum",
          topicId: "foundation",
          branchId: "foundation-greetings",
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
          branchId: "foundation-daily-words",
          kind: "skill",
          lessonIds: ["lesson-foundation-guidance"],
          requiredNodeIds: ["foundation-niyyah"],
          xpReward: 8,
          starsReward: 3
        },
        {
          id: "foundation-bismillah",
          skillId: "skill_foundation_003",
          title: "Say Bismillah",
          topicId: "foundation",
          branchId: "foundation-daily-words",
          kind: "skill",
          lessonIds: ["lesson-foundation-bismillah"],
          requiredNodeIds: ["foundation-guidance"],
          xpReward: 8,
          starsReward: 3
        },
        {
          id: "foundation-sneeze",
          skillId: "skill_foundation_004",
          title: "Sneezing Manners",
          topicId: "foundation",
          branchId: "foundation-daily-words",
          kind: "skill",
          lessonIds: ["lesson-foundation-sneeze"],
          requiredNodeIds: ["foundation-bismillah"],
          xpReward: 8,
          starsReward: 3
        },
        {
          id: "foundation-character",
          skillId: "skill_foundation_005",
          title: "Reply with Peace",
          topicId: "foundation",
          branchId: "foundation-greetings",
          kind: "review",
          lessonIds: ["lesson-foundation-character"],
          requiredNodeIds: ["foundation-sneeze"],
          xpReward: 10,
          starsReward: 3
        }
      ]
    },
    {
      id: "manners",
      topicId: "manners",
      title: "Manners",
      description: "Daily adab for speech, family, mercy, and the way Muslims carry themselves.",
      badge: "Topic 2",
      focus: "Spread peace, speak truth, honor parents, show mercy, and eat with adab.",
      mascot: "hijabi",
      accentColor: "#14B884",
      starsTarget: 21,
      branches: [
        {
          id: "manners-speech",
          title: "Speech and truth",
          description: "Learn how a Muslim speaks with peace, honesty, and care."
        },
        {
          id: "manners-parents-family",
          title: "Parents and family",
          description: "Go deeper on how to treat parents with gentleness, gratitude, and service."
        },
        {
          id: "manners-rahmah",
          title: "Mercy in daily life",
          description: "Practice mercy, respect, and disciplined habits in everyday actions."
        }
      ],
      nodes: [
        {
          id: "manners-salam",
          skillId: "skill_adab_001",
          title: "Spread Salam",
          topicId: "manners",
          branchId: "manners-speech",
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
          branchId: "manners-speech",
          kind: "skill",
          lessonIds: ["lesson-truthful"],
          requiredNodeIds: ["manners-salam"],
          xpReward: 10,
          starsReward: 3
        },
        {
          id: "manners-parents",
          skillId: "skill_adab_003",
          title: "Parents and Elders",
          topicId: "manners",
          branchId: "manners-parents-family",
          kind: "skill",
          lessonIds: ["lesson-parents"],
          requiredNodeIds: ["manners-truthful"],
          xpReward: 12,
          starsReward: 3
        },
        {
          id: "manners-mother",
          skillId: "skill_adab_004",
          title: "Honor Your Mother",
          topicId: "manners",
          branchId: "manners-parents-family",
          kind: "skill",
          lessonIds: ["lesson-mother"],
          requiredNodeIds: ["manners-parents"],
          xpReward: 12,
          starsReward: 3
        },
        {
          id: "manners-service",
          skillId: "skill_adab_005",
          title: "Serve with Humility",
          topicId: "manners",
          branchId: "manners-parents-family",
          kind: "skill",
          lessonIds: ["lesson-service"],
          requiredNodeIds: ["manners-mother"],
          xpReward: 12,
          starsReward: 3
        },
        {
          id: "manners-mercy",
          skillId: "skill_adab_006",
          title: "Mercy and Respect",
          topicId: "manners",
          branchId: "manners-rahmah",
          kind: "skill",
          lessonIds: ["lesson-mercy"],
          requiredNodeIds: ["manners-service"],
          xpReward: 12,
          starsReward: 3
        },
        {
          id: "manners-eating",
          skillId: "skill_adab_007",
          title: "Eating with Adab",
          topicId: "manners",
          branchId: "manners-rahmah",
          kind: "review",
          lessonIds: ["lesson-eating"],
          requiredNodeIds: ["manners-mercy"],
          xpReward: 14,
          starsReward: 3
        }
      ]
    },
    {
      id: "marriage",
      topicId: "marriage",
      title: "Marriage",
      description: "Learn the Islamic purpose of marriage, how to choose well, and how mercy and kindness build a home.",
      badge: "Topic 3",
      focus: "Righteous choices, mercy, kindness, rights, and building a peaceful home.",
      mascot: "muslim_man",
      accentColor: "#D45E74",
      starsTarget: 15,
      branches: [
        {
          id: "marriage-foundations",
          title: "Purpose and choosing well",
          description: "Start with why marriage matters in Islam and what to look for first."
        },
        {
          id: "marriage-home",
          title: "Mercy inside the home",
          description: "Go deeper on kindness, clothing one another, and treating a spouse with excellence."
        }
      ],
      nodes: [
        {
          id: "marriage-purpose",
          skillId: "skill_marriage_001",
          title: "Why Marriage Matters",
          topicId: "marriage",
          branchId: "marriage-foundations",
          kind: "skill",
          lessonIds: ["lesson-marriage-purpose"],
          requiredNodeIds: [],
          xpReward: 12,
          starsReward: 3
        },
        {
          id: "marriage-choose",
          skillId: "skill_marriage_002",
          title: "Choose for Deen",
          topicId: "marriage",
          branchId: "marriage-foundations",
          kind: "skill",
          lessonIds: ["lesson-marriage-choose"],
          requiredNodeIds: ["marriage-purpose"],
          xpReward: 12,
          starsReward: 3
        },
        {
          id: "marriage-kindness",
          skillId: "skill_marriage_003",
          title: "Live with Kindness",
          topicId: "marriage",
          branchId: "marriage-home",
          kind: "skill",
          lessonIds: ["lesson-marriage-kindness"],
          requiredNodeIds: ["marriage-choose"],
          xpReward: 12,
          starsReward: 3
        },
        {
          id: "marriage-clothing",
          skillId: "skill_marriage_004",
          title: "Clothing for One Another",
          topicId: "marriage",
          branchId: "marriage-home",
          kind: "skill",
          lessonIds: ["lesson-marriage-clothing"],
          requiredNodeIds: ["marriage-kindness"],
          xpReward: 12,
          starsReward: 3
        },
        {
          id: "marriage-mercy",
          skillId: "skill_marriage_005",
          title: "A Home of Mercy",
          topicId: "marriage",
          branchId: "marriage-home",
          kind: "review",
          lessonIds: ["lesson-marriage-mercy"],
          requiredNodeIds: ["marriage-clothing"],
          xpReward: 14,
          starsReward: 3
        }
      ]
    },
    {
      id: "sahabah",
      topicId: "sahabah",
      title: "Sahabah",
      description: "Stories and qualities from the companions who carried Islam with courage and loyalty.",
      badge: "Topic 4",
      focus: "Truthfulness, justice, modesty, courage, patience, and firm faith.",
      mascot: "muslim_man",
      accentColor: "#0C9F8C",
      starsTarget: 15,
      branches: [
        {
          id: "sahabah-rightly-guided",
          title: "Rightly guided leaders",
          description: "Follow Abu Bakr, Umar, Uthman, and Ali through truth, justice, and leadership."
        },
        {
          id: "sahabah-steadfast-hearts",
          title: "Steadfast hearts",
          description: "See how deep faith looked in companions like Bilal under pressure and hardship."
        }
      ],
      nodes: [
        {
          id: "sahabah-abubakr",
          skillId: "skill_sahabah_001",
          title: "Abu Bakr",
          topicId: "sahabah",
          branchId: "sahabah-rightly-guided",
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
          branchId: "sahabah-rightly-guided",
          kind: "story",
          lessonIds: ["lesson-umar"],
          requiredNodeIds: ["sahabah-abubakr"],
          xpReward: 12,
          starsReward: 3
        },
        {
          id: "sahabah-uthman",
          skillId: "skill_sahabah_003",
          title: "Uthman ibn Affan",
          topicId: "sahabah",
          branchId: "sahabah-rightly-guided",
          kind: "story",
          lessonIds: ["lesson-uthman"],
          requiredNodeIds: ["sahabah-umar"],
          xpReward: 12,
          starsReward: 3
        },
        {
          id: "sahabah-ali",
          skillId: "skill_sahabah_004",
          title: "Ali ibn Abi Talib",
          topicId: "sahabah",
          branchId: "sahabah-rightly-guided",
          kind: "story",
          lessonIds: ["lesson-ali"],
          requiredNodeIds: ["sahabah-uthman"],
          xpReward: 12,
          starsReward: 3
        },
        {
          id: "sahabah-bilal",
          skillId: "skill_sahabah_005",
          title: "Bilal ibn Rabah",
          topicId: "sahabah",
          branchId: "sahabah-steadfast-hearts",
          kind: "review",
          lessonIds: ["lesson-bilal"],
          requiredNodeIds: ["sahabah-ali"],
          xpReward: 14,
          starsReward: 3
        }
      ]
    },
    {
      id: "quran_tafseer",
      topicId: "quran_tafseer",
      title: "Quran and Tafseer",
      description: "Short lessons on verses, tafsir, and the big meanings Allah wants believers to hold onto.",
      badge: "Topic 5",
      focus: "Guidance, oneness, protection, patience, and learning to reflect on the Quran.",
      mascot: "hijabi",
      accentColor: "#1688C4",
      starsTarget: 15,
      branches: [
        {
          id: "quran-short-surahs",
          title: "Core surahs",
          description: "Build a strong base in short surahs every Muslim should know well."
        },
        {
          id: "quran-reflection",
          title: "Reflection and tafsir",
          description: "Slow down and think through protection, time, and the meanings behind the verses."
        }
      ],
      nodes: [
        {
          id: "quran-fatiha",
          skillId: "skill_quran_001",
          title: "Al-Fatihah",
          topicId: "quran_tafseer",
          branchId: "quran-short-surahs",
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
          branchId: "quran-short-surahs",
          kind: "skill",
          lessonIds: ["lesson-ikhlas"],
          requiredNodeIds: ["quran-fatiha"],
          xpReward: 12,
          starsReward: 3
        },
        {
          id: "quran-kursi",
          skillId: "skill_quran_003",
          title: "Ayat al-Kursi",
          topicId: "quran_tafseer",
          branchId: "quran-reflection",
          kind: "skill",
          lessonIds: ["lesson-kursi"],
          requiredNodeIds: ["quran-ikhlas"],
          xpReward: 12,
          starsReward: 3
        },
        {
          id: "quran-asr",
          skillId: "skill_quran_004",
          title: "Surah Al-Asr",
          topicId: "quran_tafseer",
          branchId: "quran-reflection",
          kind: "skill",
          lessonIds: ["lesson-asr"],
          requiredNodeIds: ["quran-kursi"],
          xpReward: 12,
          starsReward: 3
        },
        {
          id: "quran-tafseer",
          skillId: "skill_quran_005",
          title: "Tafseer Themes",
          topicId: "quran_tafseer",
          branchId: "quran-reflection",
          kind: "review",
          lessonIds: ["lesson-tafseer"],
          requiredNodeIds: ["quran-asr"],
          xpReward: 14,
          starsReward: 3
        }
      ]
    },
    {
      id: "prophets",
      topicId: "prophets",
      title: "Lives of the Prophets",
      description: "Travel from Adam to Muhammad and learn the big lessons each prophet left for the Ummah.",
      badge: "Topic 6",
      focus: "Creation, patience, trust, forgiveness, courage, mercy, and the final example.",
      mascot: "muslim_man",
      accentColor: "#D97B2D",
      starsTarget: 21,
      branches: [
        {
          id: "prophets-beginnings",
          title: "Beginnings of mankind",
          description: "Start with the earliest prophets and the first lessons of repentance and patience."
        },
        {
          id: "prophets-tested",
          title: "Tested messengers",
          description: "Go through the prophets whose lives teach sacrifice, purity, courage, and trust."
        },
        {
          id: "prophets-final-example",
          title: "Final example",
          description: "End with the mercy and model of Prophet Muhammad."
        }
      ],
      nodes: [
        {
          id: "prophets-adam",
          skillId: "skill_prophets_001",
          title: "Adam",
          topicId: "prophets",
          branchId: "prophets-beginnings",
          kind: "story",
          lessonIds: ["lesson-adam"],
          requiredNodeIds: [],
          xpReward: 12,
          starsReward: 3
        },
        {
          id: "prophets-nuh",
          skillId: "skill_prophets_002",
          title: "Nuh",
          topicId: "prophets",
          branchId: "prophets-beginnings",
          kind: "story",
          lessonIds: ["lesson-nuh"],
          requiredNodeIds: ["prophets-adam"],
          xpReward: 12,
          starsReward: 3
        },
        {
          id: "prophets-ibrahim",
          skillId: "skill_prophets_003",
          title: "Ibrahim",
          topicId: "prophets",
          branchId: "prophets-tested",
          kind: "story",
          lessonIds: ["lesson-ibrahim"],
          requiredNodeIds: ["prophets-nuh"],
          xpReward: 12,
          starsReward: 3
        },
        {
          id: "prophets-yusuf",
          skillId: "skill_prophets_004",
          title: "Yusuf",
          topicId: "prophets",
          branchId: "prophets-tested",
          kind: "story",
          lessonIds: ["lesson-yusuf"],
          requiredNodeIds: ["prophets-ibrahim"],
          xpReward: 12,
          starsReward: 3
        },
        {
          id: "prophets-musa",
          skillId: "skill_prophets_005",
          title: "Musa",
          topicId: "prophets",
          branchId: "prophets-tested",
          kind: "story",
          lessonIds: ["lesson-musa"],
          requiredNodeIds: ["prophets-yusuf"],
          xpReward: 12,
          starsReward: 3
        },
        {
          id: "prophets-isa",
          skillId: "skill_prophets_006",
          title: "Isa",
          topicId: "prophets",
          branchId: "prophets-tested",
          kind: "story",
          lessonIds: ["lesson-isa"],
          requiredNodeIds: ["prophets-musa"],
          xpReward: 12,
          starsReward: 3
        },
        {
          id: "prophets-muhammad",
          skillId: "skill_prophets_007",
          title: "Muhammad",
          topicId: "prophets",
          branchId: "prophets-final-example",
          kind: "review",
          lessonIds: ["lesson-muhammad"],
          requiredNodeIds: ["prophets-isa"],
          xpReward: 14,
          starsReward: 3
        }
      ]
    }
  ]
};

export const LESSONS_BY_ID: Record<string, Lesson> = {
  "lesson-foundation-niyyah": lesson(
    "lesson-foundation-niyyah",
    "foundation-niyyah",
    "As-Salamu Alaikum",
    "One of the first Muslim habits is greeting people with peace: As-salamu alaikum.",
    8,
    [
      hadithSource(
        "source-foundation-salam-riyad-844",
        "The excellence of spreading salam",
        "https://sunnah.com/riyadussalihin:844",
        "Riyad as-Salihin 844",
        "Abdullah bin Amr bin Al-As; gathered by Imam an-Nawawi from Al-Bukhari and Muslim",
        "Muttafaqun alayh",
        "The Prophet taught that a beautiful act of Islam is to greet people with salam whether you know them or not."
      ),
      quranSource(
        "source-foundation-salam-quran-4-86",
        "Return greetings well",
        "https://quran.com/en/4:86/tafsirs/ar-tafsir-ibn-kathir",
        "Quran 4:86",
        "Allah teaches believers to answer a greeting with one that is equal or better, making salam part of everyday worship."
      )
    ],
    [
      mc(
        "foundation-niyyah-1",
        "What is the basic Muslim greeting you should learn first?",
        [
          ["a", "As-salamu alaikum"],
          ["b", "Nice to meet you only"],
          ["c", "See you later"]
        ],
        "a",
        "As-salamu alaikum is the greeting of peace Muslims begin with."
      ),
      tf(
        "foundation-niyyah-2",
        "A Muslim should keep salam for friends only and skip strangers.",
        false,
        "The Prophet encouraged greeting people whether you know them or not."
      ),
      mc(
        "foundation-niyyah-3",
        "What does salam bring into a conversation first?",
        [
          ["a", "Peace and warmth"],
          ["b", "Showing off"],
          ["c", "Awkward silence"]
        ],
        "a",
        "Salam begins with peace, and that shapes the tone of the whole meeting."
      )
    ]
  ),
  "lesson-foundation-guidance": lesson(
    "lesson-foundation-guidance",
    "foundation-guidance",
    "Say Alhamdulillah",
    "When something good happens, Muslims praise Allah and say Alhamdulillah.",
    8,
    [
      hadithSource(
        "source-foundation-alhamdulillah-hisn-218",
        "What to say after pleasing news",
        "https://sunnah.com/hisn:218",
        "Hisn al-Muslim 218",
        "A Prophetic dhikr cited in Ibn As-Sunni's Amal al-Yawm wa al-Laylah and authenticated by Al-Hakim; also noted by Al-Albani",
        "Authentic",
        "When something pleased him, the Prophet said a form of Alhamdulillah that ties all complete blessings back to Allah."
      ),
      quranSource(
        "source-foundation-alhamdulillah-quran-93-11",
        "Proclaim the blessings of your Lord",
        "https://quran.com/en/93:11/tafsirs/ar-tafsir-ibn-kathir",
        "Quran 93:11",
        "Allah teaches believers to mention His blessings, which fits the habit of thanking Him when good comes."
      )
    ],
    [
      mc(
        "foundation-guidance-1",
        "What should a Muslim say when good news comes?",
        [
          ["a", "Alhamdulillah"],
          ["b", "Whatever"],
          ["c", "That was all me"]
        ],
        "a",
        "Praising Allah is a beginner Muslim habit when something good happens."
      ),
      tf(
        "foundation-guidance-2",
        "Alhamdulillah means praise belongs to Allah.",
        true,
        "That is why Muslims say it after blessings and good news."
      ),
      mc(
        "foundation-guidance-3",
        "Which thought matches this lesson best?",
        [
          ["a", "Thank Allah for the blessing"],
          ["b", "Pretend the blessing came from nowhere"],
          ["c", "Keep praise only for yourself"]
        ],
        "a",
        "A Muslim connects good moments back to Allah with gratitude."
      )
    ]
  ),
  "lesson-foundation-bismillah": lesson(
    "lesson-foundation-bismillah",
    "foundation-bismillah",
    "Say Bismillah",
    "Muslims begin actions with Allah's name, especially when eating and starting something important.",
    8,
    [
      hadithSource(
        "source-foundation-bismillah-bukhari-5376",
        "Mention Allah's Name before eating",
        "https://sunnah.com/bukhari:5376",
        "Sahih al-Bukhari 5376",
        "Umar bin Abi Salamah; collected by Imam al-Bukhari",
        "Sahih",
        "The Prophet taught a child to say Allah's name, eat with the right hand, and eat from what is near."
      ),
      quranSource(
        "source-foundation-bismillah-quran-6-121",
        "Do not eat without mentioning Allah's Name",
        "https://quran.com/en/6:121/tafsirs/en-tafsir-maarif-ul-quran",
        "Quran 6:121",
        "The Quran ties eating to mentioning Allah's name, reinforcing the habit of beginning with Bismillah."
      )
    ],
    [
      mc(
        "foundation-bismillah-1",
        "What should a Muslim say before eating?",
        [
          ["a", "Bismillah"],
          ["b", "Maybe later"],
          ["c", "Nothing at all"]
        ],
        "a",
        "Beginning with Allah's name turns an ordinary action into worship."
      ),
      tf(
        "foundation-bismillah-2",
        "Saying Bismillah helps a Muslim remember Allah before an action.",
        true,
        "Bismillah is a small phrase with a big habit inside it: begin with Allah."
      ),
      mc(
        "foundation-bismillah-3",
        "Which choice fits the sunnah at the table?",
        [
          ["a", "Say Bismillah and eat with your right hand"],
          ["b", "Start without thinking of Allah"],
          ["c", "Push people aside to grab food"]
        ],
        "a",
        "The Prophet taught both remembrance and manners together."
      )
    ]
  ),
  "lesson-foundation-sneeze": lesson(
    "lesson-foundation-sneeze",
    "foundation-sneeze",
    "Sneezing Manners",
    "When a Muslim sneezes and praises Allah, the people around them answer with mercy.",
    8,
    [
      hadithSource(
        "source-foundation-sneeze-muslim-2992",
        "Praise Allah after sneezing",
        "https://sunnah.com/muslim:2992",
        "Sahih Muslim 2992",
        "Abu Burda reporting from Abu Musa al-Ashari; collected by Imam Muslim",
        "Sahih",
        "If someone sneezes and says Alhamdulillah, the other Muslim says Yarhamuk Allah."
      )
    ],
    [
      mc(
        "foundation-sneeze-1",
        "After sneezing, what should a Muslim say first?",
        [
          ["a", "Alhamdulillah"],
          ["b", "Nothing"],
          ["c", "Good luck"]
        ],
        "a",
        "The first step is praising Allah."
      ),
      tf(
        "foundation-sneeze-2",
        "If someone says Alhamdulillah after sneezing, another Muslim can reply with mercy.",
        true,
        "That reply is part of the adab of sneezing."
      ),
      mc(
        "foundation-sneeze-3",
        "What is a proper reply to someone's Alhamdulillah after a sneeze?",
        [
          ["a", "Yarhamuk Allah"],
          ["b", "Ignore it"],
          ["c", "Laugh at them"]
        ],
        "a",
        "The sunnah keeps even small moments full of care."
      )
    ]
  ),
  "lesson-foundation-character": lesson(
    "lesson-foundation-character",
    "foundation-character",
    "Reply with Peace",
    "When someone greets you, answer with wa alaykum as-salam, and answer well.",
    10,
    [
      quranSource(
        "source-foundation-reply-quran-4-86",
        "Return a greeting with one better",
        "https://quran.com/en/4:86/tafsirs/ar-tafsir-ibn-kathir",
        "Quran 4:86",
        "Allah commands believers to return greetings with something equal or better."
      ),
      hadithSource(
        "source-foundation-reply-tirmidhi-2689",
        "More complete salam brings more reward",
        "https://sunnah.com/tirmidhi:2689",
        "Jami at-Tirmidhi 2689",
        "Imran bin Husain; collected by Imam at-Tirmidhi",
        "Hasan",
        "The Prophet counted more reward for fuller forms of salam, teaching Muslims to answer generously."
      )
    ],
    [
      mc(
        "foundation-character-1",
        "If someone says 'As-salamu alaikum,' what should you answer?",
        [
          ["a", "Wa alaykum as-salam"],
          ["b", "Maybe later"],
          ["c", "No response needed"]
        ],
        "a",
        "Returning salam is part of the Muslim way of speaking with kindness."
      ),
      tf(
        "foundation-character-2",
        "The Quran teaches believers to answer a greeting with one equal or better.",
        true,
        "That is exactly what Allah teaches in Quran 4:86."
      ),
      mc(
        "foundation-character-3",
        "Which reply is the more complete salam?",
        [
          ["a", "Wa alaykum as-salam wa rahmatullah"],
          ["b", "Hey"],
          ["c", "Silence"]
        ],
        "a",
        "The fuller reply carries more beauty and reward in the sunnah."
      )
    ]
  ),
  "lesson-salam": lesson(
    "lesson-salam",
    "manners-salam",
    "Spread Salam",
    "Salam is not just a phrase. It is a way to spread safety, warmth, and welcome.",
    10,
    [
      hadithSource(
        "source-salam-ibnmajah-68",
        "Spread salam among yourselves",
        "https://sunnah.com/ibnmajah:68",
        "Sunan Ibn Majah 68",
        "Abu Hurairah; collected by Imam Ibn Majah",
        "Sahih",
        "Spreading salam is presented as a way to build love among believers."
      ),
      quranSource(
        "source-salam-quran-4-86",
        "Return greetings well",
        "https://quran.com/en/4:86/tafsirs/ar-tafsir-ibn-kathir",
        "Quran 4:86",
        "The Quran teaches that greeting people well is a moral standard, not just a social habit."
      )
    ],
    [
      mc(
        "salam-1",
        "Which greeting means peace be upon you?",
        [
          ["a", "As-salamu alaikum"],
          ["b", "Welcome back"],
          ["c", "Good game"]
        ],
        "a",
        "As-salamu alaikum is the greeting of peace."
      ),
      tf(
        "salam-2",
        "Returning salam is part of good manners.",
        true,
        "Returning a greeting is a simple way to honor the other person."
      ),
      mc(
        "salam-3",
        "What fits salam best?",
        [
          ["a", "A kind tone"],
          ["b", "Rolling your eyes"],
          ["c", "Ignoring the person"]
        ],
        "a",
        "The greeting matters, and the way it is delivered matters too."
      )
    ]
  ),
  "lesson-truthful": lesson(
    "lesson-truthful",
    "manners-truthful",
    "Truthfulness",
    "Islamic manners include honesty, trust, and words people can rely on.",
    10,
    [
      hadithSource(
        "source-truth-muslim-2607",
        "Truth leads to righteousness",
        "https://sunnah.com/muslim:2607c",
        "Sahih Muslim 2607c",
        "Abdullah ibn Masud; collected by Imam Muslim",
        "Sahih",
        "Truth leads a person toward righteousness and ultimately toward Paradise, while lying leads the other way."
      ),
      quranSource(
        "source-truth-quran-9-119",
        "Be with the truthful",
        "https://quran.com/en/9:119/tafsirs/en-tafisr-ibn-kathir",
        "Quran 9:119",
        "Allah commands believers to have taqwa and stay with the truthful, making honesty part of faith."
      )
    ],
    [
      mc(
        "truth-1",
        "If you break something by mistake, what is the best response?",
        [
          ["a", "Tell the truth and apologize"],
          ["b", "Hide it and blame someone else"],
          ["c", "Stay silent forever"]
        ],
        "a",
        "Honesty keeps trust alive even when a mistake happened."
      ),
      tf(
        "truth-2",
        "Truthfulness is part of strong character.",
        true,
        "Truthfulness supports trust, fairness, and self-respect."
      ),
      mc(
        "truth-3",
        "Which habit builds trust?",
        [
          ["a", "Keeping your word"],
          ["b", "Changing your story"],
          ["c", "Mocking a promise"]
        ],
        "a",
        "Keeping your word is a practical form of honesty."
      )
    ]
  ),
  "lesson-parents": lesson(
    "lesson-parents",
    "manners-parents",
    "Parents and Elders",
    "Respect shows up in speech, attention, patience, and serving the people who raised you.",
    12,
    [
      quranSource(
        "source-parents-quran-17-23",
        "Do not even say 'uff' to parents",
        "https://quran.com/en/17:23/tafsirs/en-tafisr-ibn-kathir",
        "Quran 17:23",
        "Allah joins worship of Him with excellence toward parents and forbids even the smallest sharp word."
      ),
      hadithSource(
        "source-parents-adab-354",
        "Mercy for the young and honor for elders",
        "https://sunnah.com/adab:354",
        "Al-Adab Al-Mufrad 354",
        "Abdullah ibn Amr ibn al-As; collected by Imam al-Bukhari in Al-Adab Al-Mufrad",
        "Hasan",
        "A Muslim community is meant to show mercy to the young and recognize the rights of older people."
      )
    ],
    [
      mc(
        "parents-1",
        "Which action shows respect to parents?",
        [
          ["a", "Answering gently"],
          ["b", "Speaking harshly"],
          ["c", "Walking away on purpose"]
        ],
        "a",
        "Gentle words are a strong sign of good adab."
      ),
      tf(
        "parents-2",
        "Helping at home can be a form of worshipful service.",
        true,
        "Service at home can reflect gratitude and character."
      ),
      mc(
        "parents-3",
        "What should you do when an elder is speaking?",
        [
          ["a", "Listen carefully"],
          ["b", "Interrupt quickly"],
          ["c", "Look at your phone"]
        ],
        "a",
        "Listening is one of the clearest forms of respect."
      )
    ]
  ),
  "lesson-mother": lesson(
    "lesson-mother",
    "manners-mother",
    "Honor Your Mother",
    "Islam teaches a special level of gratitude, patience, and good company toward your mother.",
    12,
    [
      hadithSource(
        "source-mother-bukhari-5971",
        "Your mother, then your mother, then your mother",
        "https://sunnah.com/bukhari:5971",
        "Sahih al-Bukhari 5971",
        "Abu Hurairah; collected by Imam al-Bukhari",
        "Sahih",
        "When asked who deserves the best companionship, the Prophet named the mother three times before the father."
      ),
      quranSource(
        "source-mother-quran-31-14",
        "Be grateful to Me and to your parents",
        "https://quran.com/en/31:14/tafsirs",
        "Quran 31:14",
        "Allah reminds believers of the hardship a mother carries and ties gratitude to parents directly to gratitude to Him."
      )
    ],
    [
      mc(
        "mother-1",
        "Who did the Prophet mention first when asked about the best companionship?",
        [
          ["a", "Your mother"],
          ["b", "Only your friends"],
          ["c", "People with money"]
        ],
        "a",
        "The Prophet repeated the mother's right three times before mentioning the father."
      ),
      tf(
        "mother-2",
        "Islam teaches that mothers have a very high right to care and kindness.",
        true,
        "That high right shows up clearly in both the Quran and hadith."
      ),
      mc(
        "mother-3",
        "Which action fits this lesson best?",
        [
          ["a", "Speak kindly and stay patient with your mother"],
          ["b", "Treat her care like it means nothing"],
          ["c", "Save your best character for strangers only"]
        ],
        "a",
        "A learner shows this lesson through gentleness and gratitude."
      )
    ]
  ),
  "lesson-service": lesson(
    "lesson-service",
    "manners-service",
    "Serve with Humility",
    "Going deeper with parents means lowering yourself with mercy, making dua, and serving without arrogance.",
    12,
    [
      quranSource(
        "source-service-quran-17-24",
        "Lower the wing of humility for them",
        "https://quran.com/en/17:24/tafsirs",
        "Quran 17:24",
        "Allah teaches believers to lower the wing of humility to their parents and pray for mercy on them."
      ),
      hadithSource(
        "source-service-adab-31",
        "Making parents cry is part of disobedience",
        "https://sunnah.com/adab:31",
        "Al-Adab Al-Mufrad 31",
        "Ibn Umar; collected by Imam al-Bukhari in Al-Adab Al-Mufrad",
        "See source",
        "The report warns that hurting parents emotionally is a form of disobedience, so service to them must carry gentleness."
      )
    ],
    [
      mc(
        "service-1",
        "What does Quran 17:24 teach toward parents?",
        [
          ["a", "Lower yourself with humility and mercy"],
          ["b", "Act proud and impatient"],
          ["c", "Keep your distance and avoid helping"]
        ],
        "a",
        "The verse teaches service shaped by softness, not ego."
      ),
      tf(
        "service-2",
        "Making dua for your parents is part of honoring them.",
        true,
        "The Quran itself teaches a dua for parents in this passage."
      ),
      mc(
        "service-3",
        "Which habit matches serving parents well?",
        [
          ["a", "Help before being asked every time you can"],
          ["b", "Complain loudly about every small task"],
          ["c", "Only act kind when others are watching"]
        ],
        "a",
        "Real service grows from humility and gratitude."
      )
    ]
  ),
  "lesson-mercy": lesson(
    "lesson-mercy",
    "manners-mercy",
    "Mercy and Respect",
    "A Muslim heart is soft toward younger people and respectful toward older people.",
    12,
    [
      quranSource(
        "source-mercy-quran-90-17",
        "Urge one another to compassion",
        "https://quran.com/en/90:17/tafsirs/ar-tafsir-jalalayn",
        "Quran 90:17",
        "Faith includes urging one another toward patience and compassion, not only personal devotion."
      ),
      hadithSource(
        "source-mercy-abudawud-4943",
        "Show mercy to the young and honor elders",
        "https://sunnah.com/abudawud:4943",
        "Sunan Abi Dawud 4943",
        "Abdullah ibn Amr ibn al-As; collected by Imam Abi Dawud",
        "Sahih",
        "The Prophet tied mercy for younger people and honor for elders together as part of Muslim character."
      )
    ],
    [
      mc(
        "mercy-1",
        "What kind of heart should a Muslim try to have?",
        [
          ["a", "Merciful and respectful"],
          ["b", "Cold and mocking"],
          ["c", "Only concerned with self"]
        ],
        "a",
        "Mercy is part of the way believers carry themselves."
      ),
      tf(
        "mercy-2",
        "Respecting elders and being kind to younger people belong together.",
        true,
        "The sunnah teaches both together."
      ),
      mc(
        "mercy-3",
        "Which action fits this lesson best?",
        [
          ["a", "Encouraging someone gently"],
          ["b", "Making fun of them"],
          ["c", "Enjoying their embarrassment"]
        ],
        "a",
        "Mercy shows up in the tone and the choice to uplift."
      )
    ]
  ),
  "lesson-eating": lesson(
    "lesson-eating",
    "manners-eating",
    "Eating with Adab",
    "Islamic manners reach the table too: begin with Allah's name, use the right hand, and stay disciplined.",
    14,
    [
      hadithSource(
        "source-eating-bukhari-5376",
        "Say Allah's Name and eat with your right hand",
        "https://sunnah.com/bukhari:5376",
        "Sahih al-Bukhari 5376",
        "Umar bin Abi Salamah; collected by Imam al-Bukhari",
        "Sahih",
        "The Prophet joined remembrance, neatness, and self-control in one short teaching at the table."
      ),
      quranSource(
        "source-eating-quran-6-121",
        "Mention Allah's Name over what you eat",
        "https://quran.com/en/6:121/tafsirs/en-tafsir-maarif-ul-quran",
        "Quran 6:121",
        "The Quran reinforces the importance of tying food to remembrance of Allah."
      )
    ],
    [
      mc(
        "eating-1",
        "Which is the best way to begin eating?",
        [
          ["a", "Say Bismillah"],
          ["b", "Grab quickly without thinking"],
          ["c", "Complain first"]
        ],
        "a",
        "The sunnah begins with Allah's name."
      ),
      tf(
        "eating-2",
        "Using the right hand for eating is part of the Prophetic teaching.",
        true,
        "This adab was taught directly by the Prophet."
      ),
      mc(
        "eating-3",
        "What matches good table manners best?",
        [
          ["a", "Eat calmly from what is near you"],
          ["b", "Reach across everyone"],
          ["c", "Make the table chaotic"]
        ],
        "a",
        "Islamic adab trains the body as well as the heart."
      )
    ]
  ),
  "lesson-marriage-purpose": lesson(
    "lesson-marriage-purpose",
    "marriage-purpose",
    "Why Marriage Matters",
    "Marriage in Islam is meant to bring tranquility, affection, mercy, and a guarded life built around Allah.",
    12,
    [
      quranSource(
        "source-marriage-purpose-quran-30-21",
        "Marriage as tranquility, affection, and mercy",
        "https://quran.com/en/30:21/tafsirs",
        "Quran 30:21",
        "Allah describes spouses as a source of sakinah, mawaddah, and rahmah, making marriage about more than a contract."
      ),
      hadithSource(
        "source-marriage-purpose-muslim-1400c",
        "Marriage protects the gaze and chastity",
        "https://sunnah.com/muslim/16/3",
        "Sahih Muslim 1400c",
        "Abdullah ibn Masud; collected by Imam Muslim",
        "Sahih",
        "The Prophet encouraged marriage for those able to do it because it protects the eyes and guards chastity."
      )
    ],
    [
      mc(
        "marriage-purpose-1",
        "What does the Quran connect marriage with in this lesson?",
        [
          ["a", "Tranquility, affection, and mercy"],
          ["b", "Only status and money"],
          ["c", "Competition and pride"]
        ],
        "a",
        "The Quran presents marriage as a place of peace and mercy."
      ),
      tf(
        "marriage-purpose-2",
        "In Islam, marriage is supposed to help protect a person's character.",
        true,
        "The Prophet directly tied marriage to guarding the gaze and chastity."
      ),
      mc(
        "marriage-purpose-3",
        "Which picture fits this lesson best?",
        [
          ["a", "A home built on mercy and Allah-consciousness"],
          ["b", "A relationship built only on image"],
          ["c", "A household without responsibility"]
        ],
        "a",
        "Marriage is meant to be rooted in calm, care, and responsibility."
      )
    ]
  ),
  "lesson-marriage-choose": lesson(
    "lesson-marriage-choose",
    "marriage-choose",
    "Choose for Deen",
    "Islam teaches that deen and character matter deeply when choosing a spouse.",
    12,
    [
      hadithSource(
        "source-marriage-choose-bukhari-5090",
        "A woman is married for four things",
        "https://sunnah.com/bukhari:5090",
        "Sahih al-Bukhari 5090",
        "Abu Hurairah; collected by Imam al-Bukhari",
        "Sahih",
        "The Prophet pointed the believer toward religion as the quality that brings real success in marriage."
      ),
      quranSource(
        "source-marriage-choose-quran-24-32",
        "Facilitate marriage for the unmarried",
        "https://quran.com/24:32/tafsirs/en-tafsir-maarif-ul-quran",
        "Quran 24:32",
        "The Quran encourages marriage and ties trust in Allah to building lawful homes."
      )
    ],
    [
      mc(
        "marriage-choose-1",
        "What quality does this lesson tell a Muslim to value highly in a spouse?",
        [
          ["a", "Deen and character"],
          ["b", "Attention from people"],
          ["c", "Only appearance"]
        ],
        "a",
        "The sunnah teaches that faith and character are what carry a marriage well."
      ),
      tf(
        "marriage-choose-2",
        "A wise marriage choice looks beyond surface things.",
        true,
        "This lesson pushes the learner to value what lasts and benefits the home."
      ),
      mc(
        "marriage-choose-3",
        "Which question fits this lesson best?",
        [
          ["a", "Will this person help me obey Allah?"],
          ["b", "Will people be impressed by this match?"],
          ["c", "Will this look impressive online?"]
        ],
        "a",
        "Marriage choices are stronger when they are rooted in deen."
      )
    ]
  ),
  "lesson-marriage-kindness": lesson(
    "lesson-marriage-kindness",
    "marriage-kindness",
    "Live with Kindness",
    "The Quran teaches believers to live with a spouse in kindness, not harshness or arrogance.",
    12,
    [
      quranSource(
        "source-marriage-kindness-quran-4-19",
        "Live with them in kindness",
        "https://quran.com/en/4:19/tafsirs",
        "Quran 4:19",
        "Allah commands believers to live with spouses in kindness and patience, even when emotions are not simple."
      ),
      hadithSource(
        "source-marriage-kindness-tirmidhi-3895",
        "The best of you are best to their families",
        "https://sunnah.com/tirmidhi:3895",
        "Jami at-Tirmidhi 3895",
        "Aishah; collected by Imam at-Tirmidhi",
        "Hasan Gharib Sahih",
        "The Prophet made excellence to one's family a measure of real goodness."
      )
    ],
    [
      mc(
        "marriage-kindness-1",
        "How should a Muslim live with a spouse according to this lesson?",
        [
          ["a", "With kindness and patience"],
          ["b", "With cruelty when upset"],
          ["c", "With pride and distance"]
        ],
        "a",
        "The Quran uses kindness as the standard for married life."
      ),
      tf(
        "marriage-kindness-2",
        "Good character at home matters just as much as good character outside.",
        true,
        "The Prophet tied true goodness directly to how someone treats family."
      ),
      mc(
        "marriage-kindness-3",
        "Which habit fits this lesson best?",
        [
          ["a", "Speak softly and stay fair in disagreement"],
          ["b", "Save your best manners for strangers only"],
          ["c", "Use anger to control the home"]
        ],
        "a",
        "Kindness shows itself most clearly when things are difficult."
      )
    ]
  ),
  "lesson-marriage-clothing": lesson(
    "lesson-marriage-clothing",
    "marriage-clothing",
    "Clothing for One Another",
    "The Quran describes spouses as clothing for one another, showing closeness, protection, and dignity.",
    12,
    [
      quranSource(
        "source-marriage-clothing-quran-2-187",
        "They are clothing for you and you are clothing for them",
        "https://quran.com/2:187/tafsirs/arabic-tanweer-tafseer",
        "Quran 2:187",
        "This image shows how spouses are meant to protect, cover, support, and stay close to one another."
      )
    ],
    [
      mc(
        "marriage-clothing-1",
        "What does the image of clothing suggest in marriage?",
        [
          ["a", "Protection, closeness, and dignity"],
          ["b", "Distance and coldness"],
          ["c", "A relationship with no responsibility"]
        ],
        "a",
        "Clothing is close, protective, and covering, and the Quran uses that image intentionally."
      ),
      tf(
        "marriage-clothing-2",
        "A spouse should help protect the dignity of the other.",
        true,
        "That is part of the meaning carried by this Quranic image."
      ),
      mc(
        "marriage-clothing-3",
        "Which action matches this lesson?",
        [
          ["a", "Protect your spouse's honor and private matters"],
          ["b", "Expose every weakness publicly"],
          ["c", "Treat the relationship carelessly"]
        ],
        "a",
        "Covering and protecting are part of this verse's meaning."
      )
    ]
  ),
  "lesson-marriage-mercy": lesson(
    "lesson-marriage-mercy",
    "marriage-mercy",
    "A Home of Mercy",
    "A strong Muslim home is built when mercy, deen, and kind treatment keep showing up day after day.",
    14,
    [
      quranSource(
        "source-marriage-mercy-quran-30-21",
        "Mercy placed between spouses",
        "https://quran.com/en/30:21/tafsirs",
        "Quran 30:21",
        "Allah names mercy as one of the signs within marriage, so it has to stay alive in the home."
      ),
      hadithSource(
        "source-marriage-mercy-tirmidhi-3895",
        "Best to family",
        "https://sunnah.com/tirmidhi:3895",
        "Jami at-Tirmidhi 3895",
        "Aishah; collected by Imam at-Tirmidhi",
        "Hasan Gharib Sahih",
        "The Prophet turned daily family treatment into a real measure of spiritual character."
      )
    ],
    [
      mc(
        "marriage-mercy-1",
        "What keeps a Muslim home strong according to this review?",
        [
          ["a", "Mercy and good character"],
          ["b", "Harshness and ego"],
          ["c", "Winning every argument"]
        ],
        "a",
        "Mercy is not extra decoration. It is one of the foundations."
      ),
      tf(
        "marriage-mercy-2",
        "Marriage in Islam should pull both people closer to Allah.",
        true,
        "The best home is not only peaceful. It is also rooted in deen."
      ),
      mc(
        "marriage-mercy-3",
        "Which daily practice fits this topic best?",
        [
          ["a", "Keep showing kindness even in small moments"],
          ["b", "Treat mercy as unnecessary once married"],
          ["c", "Ignore the emotional needs of the home"]
        ],
        "a",
        "The home is built by repeated mercy, not one big speech."
      )
    ]
  ),
  "lesson-abubakr": lesson(
    "lesson-abubakr",
    "sahabah-abubakr",
    "Abu Bakr",
    "Abu Bakr teaches truthfulness, loyalty, and calm trust in Allah at moments of fear.",
    12,
    [
      hadithSource(
        "source-abubakr-bukhari-3653",
        "Abu Bakr in the cave",
        "https://sunnah.com/bukhari:3653",
        "Sahih al-Bukhari 3653",
        "Abu Bakr; collected by Imam al-Bukhari",
        "Sahih",
        "In the cave, the Prophet calmed Abu Bakr with trust in Allah, showing his closeness and loyalty."
      ),
      hadithSource(
        "source-abubakr-tirmidhi-3696",
        "A Siddiq on Mount Hira",
        "https://sunnah.com/tirmidhi:3696",
        "Jami at-Tirmidhi 3696",
        "Abu Hurairah; collected by Imam at-Tirmidhi",
        "Sahih",
        "The Prophet described Abu Bakr as a Siddiq, the truthful and unwavering companion."
      )
    ],
    [
      mc(
        "abubakr-1",
        "Which title is Abu Bakr known for?",
        [
          ["a", "As-Siddiq"],
          ["b", "The Archer"],
          ["c", "The Traveler"]
        ],
        "a",
        "As-Siddiq means the truthful one."
      ),
      tf(
        "abubakr-2",
        "Abu Bakr was known for steady support and loyalty.",
        true,
        "His story teaches trust, courage, and steadiness."
      ),
      mc(
        "abubakr-3",
        "What quality best fits this lesson?",
        [
          ["a", "Truthfulness"],
          ["b", "Showing off"],
          ["c", "Carelessness"]
        ],
        "a",
        "Truthfulness is the anchor of this story."
      )
    ]
  ),
  "lesson-umar": lesson(
    "lesson-umar",
    "sahabah-umar",
    "Umar ibn al-Khattab",
    "The life of Umar shows strength joined to justice, clarity, and courage under Allah's guidance.",
    12,
    [
      hadithSource(
        "source-umar-bukhari-3683",
        "Shaytan avoids Umar's path",
        "https://sunnah.com/bukhari:3683",
        "Sahih al-Bukhari 3683",
        "Sad ibn Abi Waqqas; collected by Imam al-Bukhari",
        "Sahih",
        "The Prophet described Umar as someone whose strength and firmness made Shaytan avoid his path."
      ),
      hadithSource(
        "source-umar-bukhari-3686",
        "A martyr beside the Prophet and Abu Bakr",
        "https://sunnah.com/bukhari:3686",
        "Sahih al-Bukhari 3686",
        "Anas ibn Malik; collected by Imam al-Bukhari",
        "Sahih",
        "On Mount Uhud the Prophet mentioned Umar with those promised martyrdom, highlighting his status and resolve."
      )
    ],
    [
      mc(
        "umar-1",
        "Which value is Umar ibn al-Khattab often remembered for?",
        [
          ["a", "Justice"],
          ["b", "Wastefulness"],
          ["c", "Laziness"]
        ],
        "a",
        "Justice is one of the strongest themes of his story."
      ),
      tf(
        "umar-2",
        "Responsibility means caring about how your choices affect people.",
        true,
        "Responsibility is never only private."
      ),
      mc(
        "umar-3",
        "What should courage be joined with?",
        [
          ["a", "Fairness"],
          ["b", "Mocking others"],
          ["c", "Anger without reason"]
        ],
        "a",
        "Good courage protects fairness and dignity."
      )
    ]
  ),
  "lesson-uthman": lesson(
    "lesson-uthman",
    "sahabah-uthman",
    "Uthman ibn Affan",
    "Uthman is remembered for modesty, generosity, and carrying quiet goodness with dignity.",
    12,
    [
      hadithSource(
        "source-uthman-muslim-2401",
        "The angels feel shy before Uthman",
        "https://sunnah.com/muslim:2401",
        "Sahih Muslim 2401",
        "Aishah; collected by Imam Muslim",
        "Sahih",
        "The Prophet spoke of Uthman with a rare kind of modesty, saying even the angels are shy of him."
      ),
      hadithSource(
        "source-uthman-bukhari-3686",
        "Among those on Uhud",
        "https://sunnah.com/bukhari:3686",
        "Sahih al-Bukhari 3686",
        "Anas ibn Malik; collected by Imam al-Bukhari",
        "Sahih",
        "The Prophet named Uthman among the great companions standing beside him and described him among the martyrs."
      )
    ],
    [
      mc(
        "uthman-1",
        "Which quality stands out in the story of Uthman?",
        [
          ["a", "Modesty"],
          ["b", "Pride"],
          ["c", "Harshness"]
        ],
        "a",
        "Uthman is especially remembered for haya, modesty before Allah."
      ),
      tf(
        "uthman-2",
        "A quiet person can still carry immense good.",
        true,
        "Uthman's life teaches that deep impact does not require loudness."
      ),
      mc(
        "uthman-3",
        "What does generosity look like in this lesson?",
        [
          ["a", "Using wealth to support what is good"],
          ["b", "Holding back every benefit"],
          ["c", "Boasting about every act"]
        ],
        "a",
        "The companions treated wealth as something to serve Allah with."
      )
    ]
  ),
  "lesson-ali": lesson(
    "lesson-ali",
    "sahabah-ali",
    "Ali ibn Abi Talib",
    "Ali combines courage, knowledge, and loyalty to the Prophet in a way that shaped the early Ummah.",
    12,
    [
      hadithSource(
        "source-ali-bukhari-3701",
        "The flag at Khaybar",
        "https://sunnah.com/bukhari:3701",
        "Sahih al-Bukhari 3701",
        "Salama ibn al-Akwa; collected by Imam al-Bukhari",
        "Sahih",
        "The Prophet gave Ali the flag at Khaybar, linking him to love of Allah, love of the Messenger, and brave leadership."
      ),
      hadithSource(
        "source-ali-tirmidhi-3713",
        "Ali as mawla",
        "https://sunnah.com/tirmidhi:3713",
        "Jami at-Tirmidhi 3713",
        "Abu Sarihah or Zaid bin Arqam; collected by Imam at-Tirmidhi",
        "Sahih",
        "This report honors Ali's closeness and standing among the believers."
      )
    ],
    [
      mc(
        "ali-1",
        "Which quality is strongly tied to Ali in the seerah?",
        [
          ["a", "Courage with loyalty"],
          ["b", "Cowardice"],
          ["c", "Love of fame"]
        ],
        "a",
        "Ali is remembered for brave service close to the Prophet."
      ),
      tf(
        "ali-2",
        "Knowledge and bravery can live in the same person.",
        true,
        "Ali's example teaches that strength and wisdom belong together."
      ),
      mc(
        "ali-3",
        "What makes courage beautiful in this lesson?",
        [
          ["a", "It serves truth and faith"],
          ["b", "It chases applause"],
          ["c", "It humiliates people"]
        ],
        "a",
        "Courage is noble when it is tied to Allah and good purpose."
      )
    ]
  ),
  "lesson-bilal": lesson(
    "lesson-bilal",
    "sahabah-bilal",
    "Bilal ibn Rabah",
    "Bilal's story teaches patience, sincerity, and a faith that stayed firm under pressure.",
    14,
    [
      hadithSource(
        "source-bilal-bukhari-1149",
        "Bilal's footsteps in Paradise",
        "https://sunnah.com/bukhari:1149",
        "Sahih al-Bukhari 1149",
        "Abu Hurairah; collected by Imam al-Bukhari",
        "Sahih",
        "The Prophet heard Bilal's footsteps in Paradise, showing how sincerity in steady worship raises a believer."
      )
    ],
    [
      mc(
        "bilal-1",
        "Which quality stands out in the story of Bilal ibn Rabah?",
        [
          ["a", "Patience and steadfastness"],
          ["b", "Boasting"],
          ["c", "Careless speech"]
        ],
        "a",
        "His story is remembered for patience and firm faith."
      ),
      tf(
        "bilal-2",
        "Sincerity means your heart and actions match.",
        true,
        "Sincerity brings clarity and firmness."
      ),
      mc(
        "bilal-3",
        "What can we learn from this lesson?",
        [
          ["a", "Stay firm on what is right"],
          ["b", "Give up quickly"],
          ["c", "Follow pressure blindly"]
        ],
        "a",
        "Bilal's story teaches strength with sincerity."
      )
    ]
  ),
  "lesson-fatiha": lesson(
    "lesson-fatiha",
    "quran-fatiha",
    "Al-Fatihah",
    "The opening surah teaches praise, mercy, worship, and asking Allah for guidance.",
    12,
    [
      quranSource(
        "source-fatiha-quran-1-6",
        "Guide us to the straight path",
        "https://quran.com/en/1:6/tafsirs/en-tafisr-ibn-kathir",
        "Quran 1:6",
        "Al-Fatihah centers the believer's constant need for guidance, making it the heart of every prayer."
      ),
      hadithSource(
        "source-fatiha-riyad-993",
        "The best of you learn the Quran and teach it",
        "https://sunnah.com/riyadussalihin:993",
        "Riyad as-Salihin 993",
        "Uthman ibn Affan; gathered by Imam an-Nawawi from al-Bukhari",
        "Sahih",
        "The Prophet praised learning and teaching the Quran, giving weight to starting with Al-Fatihah well."
      )
    ],
    [
      mc(
        "fatiha-1",
        "Al-Fatihah is commonly known as:",
        [
          ["a", "The Opening"],
          ["b", "The Valley"],
          ["c", "The Return"]
        ],
        "a",
        "Al-Fatihah is often translated as The Opening."
      ),
      tf(
        "fatiha-2",
        "One of its central themes is asking for guidance.",
        true,
        "The surah teaches the believer to ask for the straight path."
      ),
      mc(
        "fatiha-3",
        "Which theme appears in Al-Fatihah?",
        [
          ["a", "Mercy"],
          ["b", "Mockery"],
          ["c", "Waste"]
        ],
        "a",
        "Mercy is one of the key themes woven through the surah."
      )
    ]
  ),
  "lesson-ikhlas": lesson(
    "lesson-ikhlas",
    "quran-ikhlas",
    "Surah Al-Ikhlas",
    "A short surah with a strong lesson about the oneness and uniqueness of Allah.",
    12,
    [
      quranSource(
        "source-ikhlas-quran-112-1",
        "Say: He is Allah, One",
        "https://quran.com/al-ikhlas/1/tafsirs",
        "Quran 112:1",
        "The tafsir centers this surah on pure tawhid and the unmatched uniqueness of Allah."
      ),
      hadithSource(
        "source-ikhlas-bukhari-5013",
        "A beloved surah of tawhid",
        "https://sunnah.com/bukhari:5013",
        "Sahih al-Bukhari 5013",
        "Aishah; collected by Imam al-Bukhari",
        "Sahih",
        "The Prophet explained that love of this surah is tied to what it carries about Allah's attributes."
      )
    ],
    [
      mc(
        "ikhlas-1",
        "What is the main theme of Surah Al-Ikhlas?",
        [
          ["a", "The oneness of Allah"],
          ["b", "A travel story"],
          ["c", "Trade and money"]
        ],
        "a",
        "The surah centers the oneness and uniqueness of Allah."
      ),
      tf(
        "ikhlas-2",
        "Short surahs can carry deep meaning.",
        true,
        "Length and depth are not the same thing."
      ),
      mc(
        "ikhlas-3",
        "What does tafsir help with?",
        [
          ["a", "Understanding meaning"],
          ["b", "Ignoring context"],
          ["c", "Skipping reflection"]
        ],
        "a",
        "Tafsir helps learners understand message and context."
      )
    ]
  ),
  "lesson-kursi": lesson(
    "lesson-kursi",
    "quran-kursi",
    "Ayat al-Kursi",
    "Ayat al-Kursi teaches Allah's perfect life, knowledge, power, and protection over creation.",
    12,
    [
      quranSource(
        "source-kursi-quran-2-255",
        "Allah, there is no god but Him, the Ever-Living",
        "https://quran.com/en/2:255/tafsirs/tazkirul-quran-en",
        "Quran 2:255",
        "Ayat al-Kursi gathers the greatness of Allah into one verse that shapes a believer's trust and awe."
      ),
      hadithSource(
        "source-kursi-bukhari-2311",
        "Ayat al-Kursi for protection",
        "https://sunnah.com/bukhari:2311",
        "Sahih al-Bukhari 2311",
        "Abu Hurairah; collected by Imam al-Bukhari",
        "Sahih",
        "The Prophet confirmed the special protection tied to reciting Ayat al-Kursi at night."
      )
    ],
    [
      mc(
        "kursi-1",
        "What major theme stands out in Ayat al-Kursi?",
        [
          ["a", "Allah's greatness and protection"],
          ["b", "A list of food rules only"],
          ["c", "A family tree"]
        ],
        "a",
        "This verse teaches the majesty and perfect knowledge of Allah."
      ),
      tf(
        "kursi-2",
        "Ayat al-Kursi reminds a believer that Allah never sleeps or becomes weak.",
        true,
        "The verse teaches Allah's perfect life and care over all creation."
      ),
      mc(
        "kursi-3",
        "What does this verse build in the heart?",
        [
          ["a", "Trust in Allah"],
          ["b", "Fear of random luck"],
          ["c", "Pride in self"]
        ],
        "a",
        "Knowing Allah's power deepens reliance on Him."
      )
    ]
  ),
  "lesson-asr": lesson(
    "lesson-asr",
    "quran-asr",
    "Surah Al-Asr",
    "This short surah teaches that success needs faith, good deeds, truth, and patience together.",
    12,
    [
      quranSource(
        "source-asr-quran-103-1",
        "By time, mankind is in loss",
        "https://quran.com/en/103:1/tafsirs/tazkirul-quran-en",
        "Quran 103:1-3",
        "Surah Al-Asr gives a compact map of success: belief, righteous action, truth, and patience."
      ),
      hadithSource(
        "source-asr-muslim-55",
        "Religion is sincere advice",
        "https://sunnah.com/muslim:55",
        "Sahih Muslim 55",
        "Tamim ad-Dari; collected by Imam Muslim",
        "Sahih",
        "The idea of mutually advising one another in truth matches the spirit of Surah Al-Asr."
      )
    ],
    [
      mc(
        "asr-1",
        "According to Surah Al-Asr, what helps rescue a person from loss?",
        [
          ["a", "Faith, good deeds, truth, and patience"],
          ["b", "Only having money"],
          ["c", "Being famous"]
        ],
        "a",
        "The surah places these four qualities together."
      ),
      tf(
        "asr-2",
        "Patience is one of the keys mentioned in Surah Al-Asr.",
        true,
        "Patience is named right beside truth."
      ),
      mc(
        "asr-3",
        "What does this surah make you value more?",
        [
          ["a", "Using your time for what matters"],
          ["b", "Wasting time on purpose"],
          ["c", "Avoiding all responsibility"]
        ],
        "a",
        "The surah begins with time itself to wake the heart up."
      )
    ]
  ),
  "lesson-tafseer": lesson(
    "lesson-tafseer",
    "quran-tafseer",
    "Tafseer Themes",
    "Look for big Quran themes like guidance, mercy, sincerity, patience, and reflection.",
    14,
    [
      quranSource(
        "source-tafsir-quran-16-44",
        "Revelation is to be explained and reflected on",
        "https://quran.com/en/16:44/tafsirs/tazkirul-quran-en",
        "Quran 16:44",
        "This tafsir highlights that revelation is meant to be explained and reflected on, not rushed through."
      ),
      hadithSource(
        "source-tafsir-riyad-993",
        "Learn the Quran and teach it",
        "https://sunnah.com/riyadussalihin:993",
        "Riyad as-Salihin 993",
        "Uthman ibn Affan; gathered by Imam an-Nawawi from al-Bukhari",
        "Sahih",
        "Learning the Quran well is praised, which gives motivation to study its meanings with care."
      )
    ],
    [
      mc(
        "tafseer-1",
        "Which phrase best describes tafsir?",
        [
          ["a", "Explaining the meaning of verses"],
          ["b", "Collecting random words"],
          ["c", "Avoiding reflection"]
        ],
        "a",
        "Tafsir helps learners understand what verses are teaching."
      ),
      tf(
        "tafseer-2",
        "Themes like guidance and mercy can connect different surahs.",
        true,
        "Big themes help people see how the Quran teaches across passages."
      ),
      mc(
        "tafseer-3",
        "Which practice fits Quran study best?",
        [
          ["a", "Read, reflect, and ask what the verse teaches"],
          ["b", "Rush and never think about it"],
          ["c", "Treat every verse like unrelated trivia"]
        ],
        "a",
        "Reflection turns reading into learning."
      )
    ]
  ),
  "lesson-adam": lesson(
    "lesson-adam",
    "prophets-adam",
    "Adam",
    "The story of Adam begins the human story with knowledge, honor, repentance, and returning to Allah after a mistake.",
    12,
    [
      quranSource(
        "source-adam-quran-2-31",
        "Allah taught Adam the names",
        "https://quran.com/en/2:31/tafsirs",
        "Quran 2:31",
        "The story of Adam begins with knowledge and honor, showing the dignity Allah gave human beings."
      ),
      quranSource(
        "source-adam-quran-7-23",
        "Adam and Hawwa turned back in repentance",
        "https://quran.com/en/7:23/tafsirs",
        "Quran 7:23",
        "When Adam slipped, he returned to Allah in repentance, teaching believers how to come back after mistakes."
      )
    ],
    [
      mc(
        "adam-1",
        "What stands out in the story of Adam?",
        [
          ["a", "Knowledge and repentance"],
          ["b", "Winning a battle"],
          ["c", "Collecting wealth"]
        ],
        "a",
        "Adam's story teaches both honor and returning to Allah."
      ),
      tf(
        "adam-2",
        "A believer can learn from Adam that mistakes should lead to repentance, not despair.",
        true,
        "Adam's story opens the door of tawbah for humanity."
      ),
      mc(
        "adam-3",
        "Which habit matches this lesson?",
        [
          ["a", "Say sorry to Allah and return to Him"],
          ["b", "Blame everyone else forever"],
          ["c", "Give up after one mistake"]
        ],
        "a",
        "The path back to Allah matters deeply in Adam's story."
      )
    ]
  ),
  "lesson-nuh": lesson(
    "lesson-nuh",
    "prophets-nuh",
    "Nuh",
    "Nuh teaches patience in dawah, long perseverance, and trusting Allah even when very few people listen.",
    12,
    [
      quranSource(
        "source-nuh-quran-11-37",
        "Build the Ark under Our watch",
        "https://quran.com/en/11:37/tafsirs",
        "Quran 11:37",
        "Allah guided Nuh through a difficult mission, showing that obedience sometimes means staying steady while others mock."
      ),
      quranSource(
        "source-nuh-quran-71-5",
        "Nuh called his people night and day",
        "https://quran.com/en/71:5/tafsirs",
        "Quran 71:5-6",
        "These verses show Nuh's extraordinary patience and persistence in calling people to Allah."
      )
    ],
    [
      mc(
        "nuh-1",
        "What major lesson comes from Nuh's life?",
        [
          ["a", "Patience in calling people to Allah"],
          ["b", "Giving up quickly"],
          ["c", "Following the crowd"]
        ],
        "a",
        "Nuh's story is one of long, patient perseverance."
      ),
      tf(
        "nuh-2",
        "A prophet can do the right thing even when many people reject the message.",
        true,
        "Nuh stayed firm because truth is not measured by numbers."
      ),
      mc(
        "nuh-3",
        "What should patience look like in this lesson?",
        [
          ["a", "Keep obeying Allah through difficulty"],
          ["b", "Quit when people laugh"],
          ["c", "Change the truth to fit in"]
        ],
        "a",
        "Nuh teaches endurance with faith."
      )
    ]
  ),
  "lesson-ibrahim": lesson(
    "lesson-ibrahim",
    "prophets-ibrahim",
    "Ibrahim",
    "Ibrahim is a model of tawhid, trust, sacrifice, and building a life around obedience to Allah.",
    12,
    [
      quranSource(
        "source-ibrahim-quran-2-124",
        "Ibrahim was tested and fulfilled the command",
        "https://quran.com/en/2:124/tafsirs",
        "Quran 2:124",
        "Ibrahim's leadership came through tests, showing that nearness to Allah is shaped by obedience."
      ),
      quranSource(
        "source-ibrahim-quran-14-37",
        "Ibrahim's dua for his family",
        "https://quran.com/en/14:37/tafsirs",
        "Quran 14:37",
        "Ibrahim built family, worship, and trust in Allah together, not as separate parts of life."
      )
    ],
    [
      mc(
        "ibrahim-1",
        "Which theme best matches Ibrahim?",
        [
          ["a", "Tawhid and trust in Allah"],
          ["b", "Living without purpose"],
          ["c", "Chasing praise"]
        ],
        "a",
        "Ibrahim's life circles around devotion to Allah alone."
      ),
      tf(
        "ibrahim-2",
        "Tests can raise a believer when they respond with obedience.",
        true,
        "Ibrahim's life is full of tests met with trust."
      ),
      mc(
        "ibrahim-3",
        "What does Ibrahim's dua teach us?",
        [
          ["a", "Build your home around worship"],
          ["b", "Treat worship like an extra"],
          ["c", "Keep family life separate from faith"]
        ],
        "a",
        "Ibrahim wanted his family life rooted in prayer and remembrance."
      )
    ]
  ),
  "lesson-yusuf": lesson(
    "lesson-yusuf",
    "prophets-yusuf",
    "Yusuf",
    "Yusuf teaches beauty of character: patience, self-control, forgiveness, and trusting Allah through long hardship.",
    12,
    [
      quranSource(
        "source-yusuf-quran-12-23",
        "Yusuf chose Allah over temptation",
        "https://quran.com/en/12:23/tafsirs",
        "Quran 12:23-24",
        "Yusuf's story shows moral strength and choosing Allah over immediate desire."
      ),
      quranSource(
        "source-yusuf-quran-12-92",
        "No blame upon you today",
        "https://quran.com/en/12:92/tafsirs",
        "Quran 12:92",
        "When Yusuf forgave his brothers, he showed how power can be carried with mercy."
      )
    ],
    [
      mc(
        "yusuf-1",
        "What quality shines strongly in Yusuf's story?",
        [
          ["a", "Patience with purity"],
          ["b", "Revenge"],
          ["c", "Careless desire"]
        ],
        "a",
        "Yusuf teaches patience without losing character."
      ),
      tf(
        "yusuf-2",
        "Forgiveness can be a sign of strength, not weakness.",
        true,
        "Yusuf forgave when he had power, and that made the moment even greater."
      ),
      mc(
        "yusuf-3",
        "What should a believer learn from Yusuf in difficulty?",
        [
          ["a", "Trust Allah and protect your character"],
          ["b", "Do wrong because life is hard"],
          ["c", "Let pain make you cruel"]
        ],
        "a",
        "The beauty of Yusuf's story is that hardship did not corrupt him."
      )
    ]
  ),
  "lesson-musa": lesson(
    "lesson-musa",
    "prophets-musa",
    "Musa",
    "Musa's life teaches courage before tyrants, direct reliance on Allah, and steady leadership through trials.",
    12,
    [
      quranSource(
        "source-musa-quran-20-14",
        "Indeed, I am Allah, so worship Me",
        "https://quran.com/en/20:14/tafsirs",
        "Quran 20:14",
        "Musa's call began with pure worship and direct closeness to Allah."
      ),
      quranSource(
        "source-musa-quran-26-62",
        "My Lord is with me; He will guide me",
        "https://quran.com/en/26:62/tafsirs",
        "Quran 26:62",
        "At a moment of fear, Musa answered with certainty that Allah would guide and save."
      )
    ],
    [
      mc(
        "musa-1",
        "What lesson stands out in Musa's life?",
        [
          ["a", "Courage with trust in Allah"],
          ["b", "Serving falsehood"],
          ["c", "Avoiding responsibility"]
        ],
        "a",
        "Musa faced huge challenges with Allah at the center."
      ),
      tf(
        "musa-2",
        "A believer can face intimidating situations while depending on Allah.",
        true,
        "Musa models courage rooted in faith."
      ),
      mc(
        "musa-3",
        "Which phrase matches Musa at the sea?",
        [
          ["a", "My Lord is with me; He will guide me"],
          ["b", "We are finished and alone"],
          ["c", "Truth cannot help us now"]
        ],
        "a",
        "Musa's certainty came from knowing Allah was with him."
      )
    ]
  ),
  "lesson-isa": lesson(
    "lesson-isa",
    "prophets-isa",
    "Isa",
    "Isa is honored as a noble prophet who called people to worship Allah and came with clear signs.",
    12,
    [
      quranSource(
        "source-isa-quran-3-45",
        "Good news of Isa, a word from Allah",
        "https://quran.com/en/3:45/tafsirs",
        "Quran 3:45",
        "These verses honor Isa and his miraculous birth while keeping his place as a servant and prophet of Allah."
      ),
      quranSource(
        "source-isa-quran-5-110",
        "Clear signs given to Isa",
        "https://quran.com/en/5:110/tafsirs",
        "Quran 5:110",
        "Allah reminds Isa of the signs and support given to him, showing both honor and mission."
      )
    ],
    [
      mc(
        "isa-1",
        "How does the Quran teach Muslims to view Isa?",
        [
          ["a", "As a noble prophet of Allah"],
          ["b", "As an ordinary king"],
          ["c", "As a myth with no message"]
        ],
        "a",
        "Isa is deeply honored in Islam as one of the prophets."
      ),
      tf(
        "isa-2",
        "Allah supported Isa with clear signs.",
        true,
        "The Quran reminds believers of the signs given to him."
      ),
      mc(
        "isa-3",
        "What does Isa's story strengthen in a believer?",
        [
          ["a", "Respect for all prophets"],
          ["b", "Confusion about revelation"],
          ["c", "Mockery of sacred history"]
        ],
        "a",
        "Learning the prophets builds reverence for Allah's guidance across time."
      )
    ]
  ),
  "lesson-muhammad": lesson(
    "lesson-muhammad",
    "prophets-muhammad",
    "Muhammad",
    "The final messenger is the clearest living example of mercy, worship, courage, and beautiful character for the Ummah.",
    14,
    [
      quranSource(
        "source-muhammad-quran-33-21",
        "In the Messenger of Allah is an excellent example",
        "https://quran.com/en/33:21/tafsirs",
        "Quran 33:21",
        "Allah presents the Prophet Muhammad as the model believers return to in hope, patience, and obedience."
      ),
      quranSource(
        "source-muhammad-quran-21-107",
        "We sent you only as a mercy to the worlds",
        "https://quran.com/en/21:107/tafsirs",
        "Quran 21:107",
        "The Prophet's life is wrapped in mercy, making compassion central to following him."
      )
    ],
    [
      mc(
        "muhammad-1",
        "What is one of the biggest lessons from the life of Prophet Muhammad?",
        [
          ["a", "Mercy and beautiful character"],
          ["b", "Ignoring people"],
          ["c", "Seeking fame"]
        ],
        "a",
        "The Quran presents him as both a mercy and an example."
      ),
      tf(
        "muhammad-2",
        "Following the Prophet means learning from his character, not only his words.",
        true,
        "His life itself is a model for believers."
      ),
      mc(
        "muhammad-3",
        "How should this lesson shape a Muslim learner?",
        [
          ["a", "Try to carry mercy into daily life"],
          ["b", "Keep religion only as information"],
          ["c", "Separate manners from faith"]
        ],
        "a",
        "Love of the Prophet should show up in character."
      )
    ]
  )
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
