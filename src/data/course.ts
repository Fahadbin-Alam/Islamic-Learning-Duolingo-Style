import { buildExpandedContent } from "./scalableCurriculum";
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

function videoSource(
  id: string,
  title: string,
  url: string,
  summary: string,
  from = "YouTube video guide"
): LessonSource {
  return {
    id,
    site: "YouTube",
    category: "video",
    title,
    url,
    reference: "Video guide",
    from,
    grade: "Visual walkthrough",
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
  foundationAssessmentSkipped: false,
  soundEffectsEnabled: true,
  reducedSoundEffects: false,
  reviewHeartRestoreUsed: false,
  lastLearningAt: today,
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
  completedNodeIds: [],
  claimedRewardIds: []
};

const BASE_COURSE: LearningCourse = {
  id: "islam-foundations",
  title: "Sira Path",
  subtitle: "Start with foundations, get ready for prayer, build manners and marriage wisdom, meet the Sahabah, reflect on Quran and tafsir, travel from Adam to Muhammad, and learn from the women honored in revelation.",
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
      id: "prayer",
      topicId: "prayer",
      title: "Prayer",
      description: "Learn how to prepare with wudu, then pray step by step the Sunnah way from opening takbir to final taslim.",
      badge: "Prayer Basics",
      focus: "Purity, calm preparation, takbir, recitation, ruku, sujud, tashahhud, and taslim.",
      mascot: "muslim_man",
      accentColor: "#3A9FE8",
      starsTarget: 27,
      branches: [
        {
          id: "prayer-wudu",
          title: "Wudu and preparation",
          description: "Go step by step through wudu so prayer begins with cleanliness and calm."
        },
        {
          id: "prayer-salah-steps",
          title: "How to Pray",
          description: "Learn every prayer position the Sunnah way, from opening takbir to final taslim."
        }
      ],
      nodes: [
        {
          id: "prayer-wudu-why",
          skillId: "skill_prayer_001",
          title: "Why Wudu Matters",
          topicId: "prayer",
          branchId: "prayer-wudu",
          kind: "skill",
          lessonIds: ["lesson-prayer-wudu-why"],
          requiredNodeIds: [],
          xpReward: 10,
          starsReward: 3
        },
        {
          id: "prayer-wudu-steps",
          skillId: "skill_prayer_002",
          title: "Wudu Step by Step",
          topicId: "prayer",
          branchId: "prayer-wudu",
          kind: "skill",
          lessonIds: ["lesson-prayer-wudu-steps"],
          requiredNodeIds: ["prayer-wudu-why"],
          xpReward: 10,
          starsReward: 3
        },
        {
          id: "prayer-wudu-ready",
          skillId: "skill_prayer_003",
          title: "Ready for Salah",
          topicId: "prayer",
          branchId: "prayer-wudu",
          kind: "review",
          lessonIds: ["lesson-prayer-wudu-ready"],
          requiredNodeIds: ["prayer-wudu-steps"],
          xpReward: 12,
          starsReward: 3
        },
        {
          id: "prayer-salah-open",
          skillId: "skill_prayer_004",
          title: "Open the Prayer",
          topicId: "prayer",
          branchId: "prayer-salah-steps",
          kind: "skill",
          lessonIds: ["lesson-prayer-salah-open"],
          requiredNodeIds: ["prayer-wudu-ready"],
          xpReward: 12,
          starsReward: 3
        },
        {
          id: "prayer-salah-recite",
          skillId: "skill_prayer_005",
          title: "Recite in Qiyam",
          topicId: "prayer",
          branchId: "prayer-salah-steps",
          kind: "skill",
          lessonIds: ["lesson-prayer-salah-recite"],
          requiredNodeIds: ["prayer-salah-open"],
          xpReward: 12,
          starsReward: 3
        },
        {
          id: "prayer-salah-ruku",
          skillId: "skill_prayer_006",
          title: "Ruku and Rising",
          topicId: "prayer",
          branchId: "prayer-salah-steps",
          kind: "skill",
          lessonIds: ["lesson-prayer-salah-ruku"],
          requiredNodeIds: ["prayer-salah-recite"],
          xpReward: 12,
          starsReward: 3
        },
        {
          id: "prayer-salah-sujud",
          skillId: "skill_prayer_007",
          title: "Sujud and Sitting",
          topicId: "prayer",
          branchId: "prayer-salah-steps",
          kind: "skill",
          lessonIds: ["lesson-prayer-salah-sujud"],
          requiredNodeIds: ["prayer-salah-ruku"],
          xpReward: 12,
          starsReward: 3
        },
        {
          id: "prayer-salah-tashahhud",
          skillId: "skill_prayer_008",
          title: "Tashahhud and Taslim",
          topicId: "prayer",
          branchId: "prayer-salah-steps",
          kind: "skill",
          lessonIds: ["lesson-prayer-salah-tashahhud"],
          requiredNodeIds: ["prayer-salah-sujud"],
          xpReward: 12,
          starsReward: 3
        },
        {
          id: "prayer-salah-flow",
          skillId: "skill_prayer_009",
          title: "Full Sunnah Salah",
          topicId: "prayer",
          branchId: "prayer-salah-steps",
          kind: "review",
          lessonIds: ["lesson-prayer-salah-flow"],
          requiredNodeIds: ["prayer-salah-tashahhud"],
          xpReward: 14,
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
    },
    {
      id: "women-of-the-book",
      topicId: "women_of_the_book",
      title: "Women of the Book",
      description: "Go in order through women honored in the Quran, then learn from the Mothers of the Believers and the strengths they brought to the Ummah.",
      badge: "Topic 7",
      focus: "Repentance, trust, courage, purity, loyalty, knowledge, and preserving revelation.",
      mascot: "hijabi",
      accentColor: "#D96C8E",
      starsTarget: 21,
      branches: [
        {
          id: "women-quran",
          title: "Women in the Quran",
          description: "Move in order through women whose stories teach repentance, trust, courage, and purity."
        },
        {
          id: "women-mothers",
          title: "Mothers of the Believers",
          description: "Continue in order through key wives of the Prophet and the gifts they gave the Ummah."
        }
      ],
      nodes: [
        {
          id: "women-hawwa",
          skillId: "skill_women_001",
          title: "Hawwa",
          topicId: "women_of_the_book",
          branchId: "women-quran",
          kind: "story",
          lessonIds: ["lesson-women-hawwa"],
          requiredNodeIds: [],
          xpReward: 12,
          starsReward: 3
        },
        {
          id: "women-mother-musa",
          skillId: "skill_women_002",
          title: "Mother of Musa",
          topicId: "women_of_the_book",
          branchId: "women-quran",
          kind: "story",
          lessonIds: ["lesson-women-mother-musa"],
          requiredNodeIds: ["women-hawwa"],
          xpReward: 12,
          starsReward: 3
        },
        {
          id: "women-asiyah",
          skillId: "skill_women_003",
          title: "Asiyah",
          topicId: "women_of_the_book",
          branchId: "women-quran",
          kind: "story",
          lessonIds: ["lesson-women-asiyah"],
          requiredNodeIds: ["women-mother-musa"],
          xpReward: 12,
          starsReward: 3
        },
        {
          id: "women-maryam",
          skillId: "skill_women_004",
          title: "Maryam",
          topicId: "women_of_the_book",
          branchId: "women-quran",
          kind: "story",
          lessonIds: ["lesson-women-maryam"],
          requiredNodeIds: ["women-asiyah"],
          xpReward: 12,
          starsReward: 3
        },
        {
          id: "women-khadijah",
          skillId: "skill_women_005",
          title: "Khadijah",
          topicId: "women_of_the_book",
          branchId: "women-mothers",
          kind: "story",
          lessonIds: ["lesson-women-khadijah"],
          requiredNodeIds: ["women-maryam"],
          xpReward: 12,
          starsReward: 3
        },
        {
          id: "women-aishah",
          skillId: "skill_women_006",
          title: "Aishah",
          topicId: "women_of_the_book",
          branchId: "women-mothers",
          kind: "story",
          lessonIds: ["lesson-women-aishah"],
          requiredNodeIds: ["women-khadijah"],
          xpReward: 12,
          starsReward: 3
        },
        {
          id: "women-hafsah",
          skillId: "skill_women_007",
          title: "Hafsah",
          topicId: "women_of_the_book",
          branchId: "women-mothers",
          kind: "review",
          lessonIds: ["lesson-women-hafsah"],
          requiredNodeIds: ["women-aishah"],
          xpReward: 14,
          starsReward: 3
        }
      ]
    }
  ]
};

const BASE_LESSONS_BY_ID: Record<string, Lesson> = {
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
  "lesson-prayer-wudu-why": lesson(
    "lesson-prayer-wudu-why",
    "prayer-wudu-why",
    "Why Wudu Matters",
    "Before salah, a Muslim learns wudu so prayer begins with purity, obedience, and calm.",
    10,
    [
      quranSource(
        "source-prayer-wudu-why-quran-5-6",
        "Wash before prayer",
        "https://quran.com/en/5:6/tafsirs",
        "Quran 5:6",
        "Allah commands believers to wash key parts of the body before prayer, making wudu part of preparing to stand before Him."
      ),
      hadithSource(
        "source-prayer-wudu-why-muslim-224",
        "Prayer is not accepted without purification",
        "https://sunnah.com/muslim:224",
        "Sahih Muslim 224",
        "Abu Hurairah; collected by Imam Muslim",
        "Sahih",
        "The Prophet taught that prayer is not accepted without purification, showing why wudu matters so much."
      )
    ],
    [
      mc(
        "prayer-wudu-why-1",
        "Why does a Muslim learn wudu before salah?",
        [
          ["a", "Because prayer begins with purification"],
          ["b", "Because prayer has nothing to do with cleanliness"],
          ["c", "Because wudu is only for special days"]
        ],
        "a",
        "Wudu prepares the believer to stand in prayer with purity and obedience."
      ),
      tf(
        "prayer-wudu-why-2",
        "Wudu is connected to preparing for prayer in the Quran.",
        true,
        "Quran 5:6 links washing directly to getting ready for salah."
      ),
      mc(
        "prayer-wudu-why-3",
        "What feeling should wudu bring before prayer?",
        [
          ["a", "Clean readiness and calm"],
          ["b", "Rush and carelessness"],
          ["c", "Confusion about whether purity matters"]
        ],
        "a",
        "Wudu is both physical cleanliness and a calm preparation for worship."
      )
    ]
  ),
  "lesson-prayer-wudu-steps": lesson(
    "lesson-prayer-wudu-steps",
    "prayer-wudu-steps",
    "Wudu Step by Step",
    "Go through wudu in order: wash, rinse, wipe, and finish clean and ready for salah.",
    10,
    [
      quranSource(
        "source-prayer-wudu-steps-quran-5-6",
        "The order of washing and wiping",
        "https://quran.com/en/5:6/tafsirs",
        "Quran 5:6",
        "The verse lays out the central parts of wudu: face, arms, head, and feet."
      ),
      hadithSource(
        "source-prayer-wudu-steps-bukhari-164",
        "Uthman showed the Prophet's wudu",
        "https://sunnah.com/bukhari:164",
        "Sahih al-Bukhari 164",
        "Humran, the freed slave of Uthman; collected by Imam al-Bukhari",
        "Sahih",
        "Uthman demonstrated the wudu of the Prophet so Muslims could learn the order carefully."
      ),
      videoSource(
        "source-prayer-wudu-video-1",
        "Wudu video guide 1",
        "https://youtu.be/6kt_POiIVZE?si=6KbLFWt1QZgJvDpt",
        "A visual walk-through of wudu so learners can watch the order of the steps.",
        "YouTube walk-through"
      ),
      videoSource(
        "source-prayer-wudu-video-2",
        "Wudu video guide 2",
        "https://youtu.be/P29LMOHhpjE?si=x1H_8H_kQgI2dCFP",
        "Another visual guide to reinforce the washing and wiping order in wudu.",
        "YouTube walk-through"
      ),
      videoSource(
        "source-prayer-wudu-video-3",
        "Wudu video guide 3",
        "https://youtu.be/iaj1wlQHRFA?si=2_nOF0QOGt4k5Nhv",
        "A third walk-through for learners who want to see the sequence again and again.",
        "YouTube walk-through"
      )
    ],
    [
      mc(
        "prayer-wudu-steps-1",
        "Which set is named in the Quran as part of wudu?",
        [
          ["a", "Face, arms, head, and feet"],
          ["b", "Only the face and hands"],
          ["c", "Only the feet and ears"]
        ],
        "a",
        "Quran 5:6 names the core body parts to wash or wipe in wudu."
      ),
      mc(
        "prayer-wudu-steps-2",
        "In wudu, what happens with the head?",
        [
          ["a", "It is wiped"],
          ["b", "It is washed like the arms"],
          ["c", "It is skipped completely"]
        ],
        "a",
        "The Quran teaches wiping the head, not washing it like the face or arms."
      ),
      tf(
        "prayer-wudu-steps-3",
        "Learning the order of wudu is easier when you watch and practice it carefully.",
        true,
        "That is why this lesson gives both source texts and video walk-throughs."
      )
    ]
  ),
  "lesson-prayer-wudu-ready": lesson(
    "lesson-prayer-wudu-ready",
    "prayer-wudu-ready",
    "Ready for Salah",
    "Now pull it together: wudu is an ordered preparation that leaves a Muslim clean and ready to pray.",
    12,
    [
      quranSource(
        "source-prayer-wudu-ready-quran-5-6",
        "Purity before standing for prayer",
        "https://quran.com/en/5:6/tafsirs",
        "Quran 5:6",
        "The verse ties washing directly to rising for prayer, so the believer learns order and readiness together."
      ),
      hadithSource(
        "source-prayer-wudu-ready-muslim-224",
        "Purification before accepted prayer",
        "https://sunnah.com/muslim:224",
        "Sahih Muslim 224",
        "Abu Hurairah; collected by Imam Muslim",
        "Sahih",
        "The hadith keeps the learner focused: wudu is not random washing, but preparation for accepted worship."
      )
    ],
    [
      mc(
        "prayer-wudu-ready-1",
        "What is the main idea of this review lesson?",
        [
          ["a", "Wudu prepares the believer for prayer in an ordered way"],
          ["b", "Wudu is optional whenever someone feels serious"],
          ["c", "Prayer can start without caring about purity"]
        ],
        "a",
        "This topic teaches that wudu is a real preparation for salah, not a side detail."
      ),
      mc(
        "prayer-wudu-ready-2",
        "Which habit fits this topic best?",
        [
          ["a", "Do wudu calmly and in order before prayer"],
          ["b", "Rush through it and guess the steps"],
          ["c", "Skip the order because it does not matter"]
        ],
        "a",
        "Prayer readiness grows when a learner practices the steps with care."
      ),
      tf(
        "prayer-wudu-ready-3",
        "Wudu is both cleanliness and obedience before salah.",
        true,
        "The Quran and hadith both frame wudu as preparation to stand before Allah."
      )
    ]
  ),
  "lesson-prayer-salah-open": lesson(
    "lesson-prayer-salah-open",
    "prayer-salah-open",
    "Open the Prayer",
    "After wudu, face the qiblah, settle yourself, and begin salah with takbir just as the Prophet taught.",
    12,
    [
      hadithSource(
        "source-prayer-salah-open-bukhari-631",
        "Pray as you have seen me pray",
        "https://sunnah.com/bukhari:631",
        "Sahih al-Bukhari 631",
        "Malik bin Al-Huwairith; collected by Imam al-Bukhari",
        "Sahih",
        "The Prophet instructed the believers to model their prayer on his own prayer."
      ),
      hadithSource(
        "source-prayer-salah-open-abudawud-856",
        "Begin with takbir and pray with calmness",
        "https://sunnah.com/abudawud:856",
        "Sunan Abi Dawud 856",
        "Abu Hurairah; collected by Imam Abu Dawud",
        "Sahih",
        "The Prophet corrected a man's prayer by teaching him to face the qiblah, say takbir, and move with calm stillness."
      ),
      videoSource(
        "source-prayer-salah-open-video-1",
        "How to pray step by step",
        "https://youtu.be/vx1rz-28HNk?si=zXJCptHWOBVFk7VB",
        "A detailed visual walk-through of the opening of salah and the first movements.",
        "Provided YouTube guide"
      )
    ],
    [
      mc(
        "prayer-salah-open-1",
        "What begins the prayer after you are ready and facing the qiblah?",
        [
          ["a", "Say 'Allahu Akbar'"],
          ["b", "Bow down first"],
          ["c", "End with salam"]
        ],
        "a",
        "The opening takbir begins the prayer."
      ),
      tf(
        "prayer-salah-open-2",
        "A calm, settled beginning is part of the Sunnah way to start salah.",
        true,
        "The Prophet taught prayer with calmness, not rushed movement."
      ),
      mc(
        "prayer-salah-open-3",
        "Which source in this lesson directly tells believers to follow the Prophet's way of praying?",
        [
          ["a", "Sahih al-Bukhari 631"],
          ["b", "Sahih Muslim 224"],
          ["c", "Quran 5:6"]
        ],
        "a",
        "This hadith gives the famous command to pray as the Prophet prayed."
      ),
      mc(
        "prayer-salah-open-4",
        "Which habit best matches the Sunnah opening of salah?",
        [
          ["a", "Stand straight, face the qiblah, and begin with takbir"],
          ["b", "Rush into sujud without settling"],
          ["c", "Start talking and then pray later"]
        ],
        "a",
        "The prayer opens with intention, direction, and takbir in a composed way."
      )
    ]
  ),
  "lesson-prayer-salah-recite": lesson(
    "lesson-prayer-salah-recite",
    "prayer-salah-recite",
    "Recite in Qiyam",
    "In qiyam, stand and recite with presence. Learn the place of Al-Fatihah and calm recitation before ruku.",
    12,
    [
      hadithSource(
        "source-prayer-salah-recite-nasai-910",
        "There is no salah without Fatihat al-Kitab",
        "https://sunnah.com/nasai/11/35",
        "Sunan an-Nasa'i 910",
        "Ubadah bin As-Samit; collected by Imam an-Nasa'i",
        "Sahih",
        "The Prophet taught that reciting Fatihat al-Kitab is essential in prayer."
      ),
      hadithSource(
        "source-prayer-salah-recite-abudawud-856",
        "Recite from the Quran, then bow",
        "https://sunnah.com/abudawud:856",
        "Sunan Abi Dawud 856",
        "Abu Hurairah; collected by Imam Abu Dawud",
        "Sahih",
        "The corrected prayer taught by the Prophet includes recitation before going into ruku."
      ),
      videoSource(
        "source-prayer-salah-recite-video-2",
        "The Prophet prayed",
        "https://youtu.be/2ZEmsdEOpbk",
        "A guided look at standing, recitation, and the early flow of the prayer.",
        "Provided YouTube guide"
      )
    ],
    [
      mc(
        "prayer-salah-recite-1",
        "According to this lesson, what recitation is essential in salah?",
        [
          ["a", "Fatihat al-Kitab"],
          ["b", "Only a greeting"],
          ["c", "No recitation is needed"]
        ],
        "a",
        "The hadith teaches that the prayer is not complete without Fatihat al-Kitab."
      ),
      mc(
        "prayer-salah-recite-2",
        "In which posture does this recitation happen?",
        [
          ["a", "Standing in qiyam"],
          ["b", "While leaving the prayer"],
          ["c", "Only after taslim"]
        ],
        "a",
        "Qiyam is the standing part of the prayer where recitation is made."
      ),
      tf(
        "prayer-salah-recite-3",
        "Recitation should be calm enough that the learner knows what part of prayer they are in.",
        true,
        "The Sunnah prayer is composed and aware, not rushed and careless."
      ),
      mc(
        "prayer-salah-recite-4",
        "What comes next in the normal Sunnah flow after standing recitation?",
        [
          ["a", "Ruku"],
          ["b", "Taslim"],
          ["c", "Leaving the prayer"]
        ],
        "a",
        "After standing recitation, the prayer moves into ruku."
      )
    ]
  ),
  "lesson-prayer-salah-ruku": lesson(
    "lesson-prayer-salah-ruku",
    "prayer-salah-ruku",
    "Ruku and Rising",
    "Bow with steadiness, place the hands on the knees, then rise until you are upright again before moving on.",
    12,
    [
      hadithSource(
        "source-prayer-salah-ruku-abudawud-730",
        "Abu Humayd described the Prophet's bowing and rising",
        "https://sunnah.com/abudawud:730",
        "Sunan Abi Dawud 730",
        "Abu Humayd al-Sa'idi; collected by Imam Abu Dawud",
        "Sahih",
        "This narration describes the Prophet raising his hands, bowing with hands on the knees, and standing erect again before going to sujud."
      ),
      hadithSource(
        "source-prayer-salah-ruku-nasai-1055",
        "Allah hears the one who praises Him",
        "https://sunnah.com/nasai:1055",
        "Sunan an-Nasa'i 1055",
        "Wa'il bin Hujr; collected by Imam an-Nasa'i",
        "Sahih",
        "Wa'il described the Prophet raising his hands and saying 'Sami' Allahu liman hamidah' when rising from ruku."
      )
    ],
    [
      mc(
        "prayer-salah-ruku-1",
        "Where do the hands go in ruku according to the lesson sources?",
        [
          ["a", "On the knees"],
          ["b", "Folded behind the back"],
          ["c", "Under the feet"]
        ],
        "a",
        "The Sunnah description places the hands on the knees in ruku."
      ),
      mc(
        "prayer-salah-ruku-2",
        "What phrase is taught when rising from ruku?",
        [
          ["a", "Sami' Allahu liman hamidah"],
          ["b", "As-salamu alaikum"],
          ["c", "Bismillah before eating"]
        ],
        "a",
        "This is the phrase described in the hadith when rising from bowing."
      ),
      tf(
        "prayer-salah-ruku-3",
        "The Prophet stood upright again before going down to sujud.",
        true,
        "The narrations emphasize straightness and calm after rising from ruku."
      ),
      mc(
        "prayer-salah-ruku-4",
        "Which action would break the calm Sunnah sequence taught here?",
        [
          ["a", "Dropping straight from ruku into sujud without standing upright"],
          ["b", "Standing upright before going down"],
          ["c", "Keeping the hands on the knees while bowing"]
        ],
        "a",
        "The Sunnah sequence includes a complete rising before moving into sujud."
      )
    ]
  ),
  "lesson-prayer-salah-sujud": lesson(
    "lesson-prayer-salah-sujud",
    "prayer-salah-sujud",
    "Sujud and Sitting",
    "Learn the Sunnah shape of sujud, then the calm sitting between the two prostrations before returning to the ground.",
    12,
    [
      hadithSource(
        "source-prayer-salah-sujud-tirmidhi-270",
        "Forehead and nose in sujud",
        "https://sunnah.com/tirmidhi:270",
        "Jami` at-Tirmidhi 270",
        "Abu Humayd al-Sa'idi; collected by Imam at-Tirmidhi",
        "Hasan Sahih",
        "The Prophet placed his nose and forehead on the ground, kept his forearms away from his sides, and set his hands parallel to his shoulders."
      ),
      hadithSource(
        "source-prayer-salah-sujud-abudawud-856",
        "Prostrate and sit with calmness",
        "https://sunnah.com/abudawud:856",
        "Sunan Abi Dawud 856",
        "Abu Hurairah; collected by Imam Abu Dawud",
        "Sahih",
        "The Prophet taught that each prostration and the sitting between them should be calm and complete."
      ),
      videoSource(
        "source-prayer-salah-sujud-video-3",
        "Detailed salah walk-through",
        "https://youtu.be/di0u-K09Su4",
        "A detailed visual walk-through of sujud, the sitting between sajdahs, and calm transitions.",
        "Provided YouTube guide"
      )
    ],
    [
      mc(
        "prayer-salah-sujud-1",
        "According to the source in this lesson, which parts are explicitly placed on the ground in sujud?",
        [
          ["a", "The forehead and the nose"],
          ["b", "Only the elbows"],
          ["c", "Only the back"]
        ],
        "a",
        "The hadith specifically mentions the forehead and nose in sujud."
      ),
      mc(
        "prayer-salah-sujud-2",
        "What should happen in the sitting between the two sajdahs?",
        [
          ["a", "Sit calmly before going back down"],
          ["b", "Jump back down immediately"],
          ["c", "End the prayer there"]
        ],
        "a",
        "The prayer includes a real seated pause between the two prostrations."
      ),
      tf(
        "prayer-salah-sujud-3",
        "Rushing from one sajdah to the next without settling does not match the lesson's Sunnah sources.",
        true,
        "The Prophet taught calmness in sujud and in the sitting between the two sajdahs."
      ),
      mc(
        "prayer-salah-sujud-4",
        "Which posture best fits the Sunnah in sujud?",
        [
          ["a", "Forearms away from the sides and calm stillness in the posture"],
          ["b", "Flatten everything and hurry up"],
          ["c", "Skip the seated pause completely"]
        ],
        "a",
        "The source describes a careful, composed sujud rather than a collapsed or rushed one."
      )
    ]
  ),
  "lesson-prayer-salah-tashahhud": lesson(
    "lesson-prayer-salah-tashahhud",
    "prayer-salah-tashahhud",
    "Tashahhud and Taslim",
    "Finish the prayer with the final sitting, the words of tashahhud, and the taslim to the right and left.",
    12,
    [
      hadithSource(
        "source-prayer-salah-tashahhud-nasai-1278",
        "The Prophet taught tashahhud like a surah",
        "https://sunnah.com/nasai:1278",
        "Sunan an-Nasa'i 1278",
        "Ibn Abbas; collected by Imam an-Nasa'i",
        "Sahih",
        "The Prophet taught tashahhud with care and precision, the way a surah of the Quran is taught."
      ),
      hadithSource(
        "source-prayer-salah-tashahhud-abudawud-974",
        "Words of the tashahhud",
        "https://sunnah.com/abudawud:974",
        "Sunan Abi Dawud 974",
        "Ibn Abbas; collected by Imam Abu Dawud",
        "Sahih",
        "This narration records the words of tashahhud that the Prophet taught in prayer."
      ),
      hadithSource(
        "source-prayer-salah-tashahhud-abudawud-933",
        "Taslim to the right and left",
        "https://sunnah.com/abudawud:933",
        "Sunan Abi Dawud 933",
        "Wa'il bin Hujr; collected by Imam Abu Dawud",
        "Sahih",
        "The Prophet ended the prayer with taslim to the right and left."
      )
    ],
    [
      mc(
        "prayer-salah-tashahhud-1",
        "What does this lesson focus on at the end of prayer?",
        [
          ["a", "The final sitting, tashahhud, and taslim"],
          ["b", "Starting wudu from the beginning"],
          ["c", "Eating manners"]
        ],
        "a",
        "This lesson is about finishing the prayer the Sunnah way."
      ),
      tf(
        "prayer-salah-tashahhud-2",
        "The Prophet taught tashahhud carefully, like teaching a surah from the Quran.",
        true,
        "That is exactly how the narration in Sunan an-Nasa'i describes it."
      ),
      mc(
        "prayer-salah-tashahhud-3",
        "Which source in this lesson gives the wording of tashahhud?",
        [
          ["a", "Sunan Abi Dawud 974"],
          ["b", "Sahih Muslim 224"],
          ["c", "Quran 5:6"]
        ],
        "a",
        "This hadith records the wording of the tashahhud."
      ),
      mc(
        "prayer-salah-tashahhud-4",
        "What closes the prayer after the final sitting?",
        [
          ["a", "Taslim to the right and left"],
          ["b", "Starting another takbir"],
          ["c", "Going back to wudu"]
        ],
        "a",
        "The prayer ends with taslim."
      )
    ]
  ),
  "lesson-prayer-salah-flow": lesson(
    "lesson-prayer-salah-flow",
    "prayer-salah-flow",
    "Full Sunnah Salah",
    "Now pull the steps together: begin well, recite calmly, bow and rise properly, prostrate with stillness, then end with tashahhud and taslim.",
    14,
    [
      hadithSource(
        "source-prayer-salah-flow-bukhari-631",
        "Pray as you have seen me pray",
        "https://sunnah.com/bukhari:631",
        "Sahih al-Bukhari 631",
        "Malik bin Al-Huwairith; collected by Imam al-Bukhari",
        "Sahih",
        "The whole lesson returns to the Prophet's command to follow his prayer closely."
      ),
      hadithSource(
        "source-prayer-salah-flow-abudawud-856",
        "Each pillar is done with calmness",
        "https://sunnah.com/abudawud:856",
        "Sunan Abi Dawud 856",
        "Abu Hurairah; collected by Imam Abu Dawud",
        "Sahih",
        "The Prophet's correction of prayer teaches calm completeness in every posture."
      ),
      videoSource(
        "source-prayer-salah-flow-video-2",
        "Step-by-step salah review",
        "https://youtu.be/2ZEmsdEOpbk",
        "A visual review of the full prayer flow from opening takbir to taslim.",
        "Provided YouTube guide"
      )
    ],
    [
      mc(
        "prayer-salah-flow-1",
        "Which sequence best matches the Sunnah flow taught in this topic?",
        [
          ["a", "Takbir, recitation, ruku, rising, sujud, sitting, sujud, tashahhud, taslim"],
          ["b", "Taslim, ruku, takbir, sujud, recitation"],
          ["c", "Sujud, taslim, wudu, tashahhud"]
        ],
        "a",
        "This is the full flow the learner has been building through the prayer branch."
      ),
      mc(
        "prayer-salah-flow-2",
        "What principle runs through the whole Sunnah prayer in these sources?",
        [
          ["a", "Calmness and completing each posture well"],
          ["b", "Finishing as fast as possible"],
          ["c", "Skipping steps if you remember most of them"]
        ],
        "a",
        "The repeated teaching is that every posture should be complete and calm."
      ),
      tf(
        "prayer-salah-flow-3",
        "The Sunnah way of prayer is more than memorizing a list; it is moving through each pillar correctly and with stillness.",
        true,
        "The lesson ties the positions, phrases, and calmness together into one living act of worship."
      ),
      mc(
        "prayer-salah-flow-4",
        "If you forget what happens after ruku, which lesson in this branch should you review next?",
        [
          ["a", "Ruku and Rising"],
          ["b", "Why Wudu Matters"],
          ["c", "Spread Salam"]
        ],
        "a",
        "That lesson focuses on the bowing posture and what follows it."
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
  ),
  "lesson-women-hawwa": lesson(
    "lesson-women-hawwa",
    "women-hawwa",
    "Hawwa",
    "The first woman in the human story teaches closeness to Allah, shared responsibility, and turning back to Him after a mistake.",
    12,
    [
      quranSource(
        "source-women-hawwa-quran-2-35",
        "Adam and his wife in the garden",
        "https://quran.com/2:35/tafsirs/tazkirul-quran-en",
        "Quran 2:35-36",
        "The first household begins with Allah's command, showing that human life starts with worship and obedience."
      ),
      quranSource(
        "source-women-hawwa-quran-7-23",
        "The dua of repentance",
        "https://quran.com/en/7:23/tafsirs",
        "Quran 7:23",
        "After slipping, Adam and Hawwa turned back to Allah with repentance, teaching the first family how to return."
      )
    ],
    [
      mc(
        "women-hawwa-1",
        "What early lesson comes through Hawwa in this topic?",
        [
          ["a", "A Muslim returns to Allah after a mistake"],
          ["b", "A mistake ends all hope"],
          ["c", "The first family lived without guidance"]
        ],
        "a",
        "Their story teaches repentance, not despair."
      ),
      tf(
        "women-hawwa-2",
        "The first family shows that life begins with Allah's guidance, not random living.",
        true,
        "The first commands given to Adam and Hawwa frame life around obedience."
      ),
      mc(
        "women-hawwa-3",
        "Which habit fits this lesson best?",
        [
          ["a", "Own your mistake and turn back to Allah"],
          ["b", "Blame everyone else and stay stubborn"],
          ["c", "Treat tawbah like it does not matter"]
        ],
        "a",
        "Hawwa's place in the story helps teach the heart to return."
      )
    ]
  ),
  "lesson-women-mother-musa": lesson(
    "lesson-women-mother-musa",
    "women-mother-musa",
    "Mother of Musa",
    "The mother of Musa teaches extraordinary trust: she obeyed Allah in fear, and Allah returned her son to her.",
    12,
    [
      quranSource(
        "source-women-mother-musa-quran-28-7",
        "Put him in the river and do not fear",
        "https://quran.com/en/28:7/tafsirs/ar-tafsir-al-tabari",
        "Quran 28:7",
        "Allah inspired the mother of Musa with a command that looked terrifying on the outside but carried perfect protection."
      ),
      quranSource(
        "source-women-mother-musa-quran-28-13",
        "Allah returned Musa to his mother",
        "https://quran.com/en/28:13/tafsirs",
        "Quran 28:13",
        "Allah fulfilled His promise by bringing Musa back to his mother so her heart could be at peace."
      )
    ],
    [
      mc(
        "women-mother-musa-1",
        "What shines most in the story of Musa's mother?",
        [
          ["a", "Trust in Allah during fear"],
          ["b", "Panic without guidance"],
          ["c", "Depending only on worldly power"]
        ],
        "a",
        "Her courage was rooted in confidence that Allah's promise was true."
      ),
      tf(
        "women-mother-musa-2",
        "Allah left the mother of Musa without comfort or promise.",
        false,
        "Allah told her not to fear or grieve and promised He would return Musa."
      ),
      mc(
        "women-mother-musa-3",
        "What special thing did she do in this story?",
        [
          ["a", "She obeyed Allah even when it was emotionally hard"],
          ["b", "She rejected every command out of fear"],
          ["c", "She chose comfort over trust"]
        ],
        "a",
        "Her story makes tawakkul feel real and costly in the best way."
      )
    ]
  ),
  "lesson-women-asiyah": lesson(
    "lesson-women-asiyah",
    "women-asiyah",
    "Asiyah",
    "Asiyah, the wife of Pharaoh, stands as a model of faith and courage even inside a house ruled by tyranny.",
    12,
    [
      quranSource(
        "source-women-asiyah-quran-66-11",
        "A house near Allah in Paradise",
        "https://quran.com/en/66:11/tafsirs/tazkirul-quran-en",
        "Quran 66:11",
        "Allah presents Asiyah as an example for believers, showing that faith can stay firm even in a brutal environment."
      ),
      hadithSource(
        "source-women-asiyah-bukhari-3433",
        "Asiyah among the greatest women",
        "https://sunnah.com/bukhari:3433",
        "Sahih al-Bukhari 3433",
        "Abu Musa al-Ashari; collected by Imam al-Bukhari",
        "Sahih",
        "The Prophet named Asiyah among the women of highest perfection, highlighting the greatness of her iman."
      )
    ],
    [
      mc(
        "women-asiyah-1",
        "What makes Asiyah stand out in this lesson?",
        [
          ["a", "Steadfast faith under oppression"],
          ["b", "Following Pharaoh in disbelief"],
          ["c", "Choosing comfort over Allah"]
        ],
        "a",
        "Asiyah's greatness appears in staying loyal to Allah when the cost was severe."
      ),
      tf(
        "women-asiyah-2",
        "A difficult household can never contain a righteous believer.",
        false,
        "Allah gave Asiyah as proof that a believer can remain true even in a corrupt home."
      ),
      mc(
        "women-asiyah-3",
        "What special dua is tied to Asiyah in the Quran?",
        [
          ["a", "Asking Allah for a house near Him in Paradise"],
          ["b", "Asking for worldly status only"],
          ["c", "Asking to stay close to Pharaoh"]
        ],
        "a",
        "Her dua shows where her heart truly lived."
      )
    ]
  ),
  "lesson-women-maryam": lesson(
    "lesson-women-maryam",
    "women-maryam",
    "Maryam",
    "Maryam is honored for purity, worship, and the miracle Allah placed through her life.",
    12,
    [
      quranSource(
        "source-women-maryam-quran-3-42",
        "Allah chose and purified Maryam",
        "https://quran.com/al-i-imran/42/tafsirs",
        "Quran 3:42",
        "The Quran names Maryam as chosen and purified, marking her as one of the most honored women in revelation."
      ),
      hadithSource(
        "source-women-maryam-bukhari-3433",
        "Maryam among the women of perfection",
        "https://sunnah.com/bukhari:3433",
        "Sahih al-Bukhari 3433",
        "Abu Musa al-Ashari; collected by Imam al-Bukhari",
        "Sahih",
        "The Prophet named Maryam among the women of greatest perfection, showing her special station."
      )
    ],
    [
      mc(
        "women-maryam-1",
        "Which qualities define Maryam in this lesson?",
        [
          ["a", "Purity, worship, and chosen honor"],
          ["b", "Pride and rebellion"],
          ["c", "Carelessness toward faith"]
        ],
        "a",
        "Maryam's story is marked by devotion and purity."
      ),
      tf(
        "women-maryam-2",
        "Maryam is honored in both Quran and hadith.",
        true,
        "Her station is made clear in revelation and the Prophet's words."
      ),
      mc(
        "women-maryam-3",
        "What special thing is Maryam known for here?",
        [
          ["a", "Being chosen and purified by Allah"],
          ["b", "Leading armies into battle"],
          ["c", "Protecting Pharaoh's palace"]
        ],
        "a",
        "Her greatness is spiritual purity and the miracle connected to her."
      )
    ]
  ),
  "lesson-women-khadijah": lesson(
    "lesson-women-khadijah",
    "women-khadijah",
    "Khadijah",
    "Khadijah was the first wife of the Prophet, the first believer from his household, and a source of strength, loyalty, and calm support.",
    12,
    [
      hadithSource(
        "source-women-khadijah-muslim-2432",
        "Glad tidings of a house in Paradise",
        "https://sunnah.com/muslim/44/103-104",
        "Sahih Muslim 2432",
        "Abu Hurairah; collected by Imam Muslim",
        "Sahih",
        "Jibril brought Khadijah greetings from Allah and glad tidings of a house in Paradise, showing her immense rank."
      ),
      hadithSource(
        "source-women-khadijah-bukhari-3815",
        "Khadijah among the best women",
        "https://sunnah.com/bukhari:3815",
        "Sahih al-Bukhari 3815",
        "Ali ibn Abi Talib; collected by Imam al-Bukhari",
        "Sahih",
        "The Prophet described Khadijah as among the best women, highlighting her special excellence."
      )
    ],
    [
      mc(
        "women-khadijah-1",
        "What special role did Khadijah play at the beginning of Islam?",
        [
          ["a", "She supported the Prophet with loyalty and calm belief"],
          ["b", "She turned away from the message"],
          ["c", "She mocked revelation"]
        ],
        "a",
        "Khadijah's strength shows up in how she stood with the Prophet at the beginning."
      ),
      tf(
        "women-khadijah-2",
        "Khadijah was honored with glad tidings from Allah and Jibril.",
        true,
        "That glad tiding marks one of the clearest signs of her rank."
      ),
      mc(
        "women-khadijah-3",
        "Which trait best captures Khadijah in this lesson?",
        [
          ["a", "Loyal support"],
          ["b", "Emotional instability"],
          ["c", "Seeking attention from people"]
        ],
        "a",
        "Her support for the Prophet is one of the most beautiful parts of her story."
      )
    ]
  ),
  "lesson-women-aishah": lesson(
    "lesson-women-aishah",
    "women-aishah",
    "Aishah",
    "Aishah is remembered for sharp understanding, close knowledge of the Prophet's life, and a special place among the Mothers of the Believers.",
    12,
    [
      hadithSource(
        "source-women-aishah-bukhari-3770",
        "The virtue of Aishah",
        "https://sunnah.com/bukhari:3770",
        "Sahih al-Bukhari 3770",
        "Anas ibn Malik; collected by Imam al-Bukhari",
        "Sahih",
        "The Prophet described Aishah's virtue over other women with a well-known comparison, marking her high station."
      ),
      hadithSource(
        "source-women-aishah-bukhari-6201",
        "Jibril sent salam to Aishah",
        "https://sunnah.com/bukhari:6201",
        "Sahih al-Bukhari 6201",
        "Aishah; collected by Imam al-Bukhari",
        "Sahih",
        "This narration shows the special closeness and honor Aishah experienced in the Prophet's household."
      )
    ],
    [
      mc(
        "women-aishah-1",
        "What special strength stands out for Aishah in this topic?",
        [
          ["a", "Knowledge and closeness to the Prophetic home"],
          ["b", "Living far from the Prophet's teachings"],
          ["c", "Keeping faith hidden from the Ummah"]
        ],
        "a",
        "Aishah's life became one of the great windows into the sunnah."
      ),
      tf(
        "women-aishah-2",
        "Aishah is honored in hadith with a special virtue and greeting.",
        true,
        "The hadith record her special station in more than one way."
      ),
      mc(
        "women-aishah-3",
        "How should a learner remember Aishah here?",
        [
          ["a", "As a mother of believers known for understanding and transmission"],
          ["b", "As someone detached from learning"],
          ["c", "As someone with no role in teaching the Ummah"]
        ],
        "a",
        "Her life became part of how the Ummah learned the Prophet's way."
      )
    ]
  ),
  "lesson-women-hafsah": lesson(
    "lesson-women-hafsah",
    "women-hafsah",
    "Hafsah",
    "Hafsah helps this topic end with preservation: the suhuf kept in her care became part of protecting the Quran for the Ummah.",
    14,
    [
      quranSource(
        "source-women-hafsah-quran-33-6",
        "The wives of the Prophet are mothers of the believers",
        "https://quran.com/en/33:6/tafsirs",
        "Quran 33:6",
        "The Quran gives the wives of the Prophet a special status as mothers of the believers, including Hafsah."
      ),
      hadithSource(
        "source-women-hafsah-bukhari-4987",
        "Hafsah preserved the manuscripts",
        "https://sunnah.com/bukhari:4987",
        "Sahih al-Bukhari 4987",
        "Anas ibn Malik; collected by Imam al-Bukhari",
        "Sahih",
        "The early written sheets of the Quran were kept with Hafsah and used in the later standard copying, showing her quiet but vital role in preservation."
      )
    ],
    [
      mc(
        "women-hafsah-1",
        "What special contribution of Hafsah is highlighted here?",
        [
          ["a", "Safeguarding the sheets used in preserving the Quran"],
          ["b", "Leading armies in conquest"],
          ["c", "Writing a new revelation"]
        ],
        "a",
        "Her role was one of trust and preservation."
      ),
      tf(
        "women-hafsah-2",
        "Hafsah's lesson shows that some huge services to Islam happen quietly.",
        true,
        "Her care for the suhuf is a major service carried without spectacle."
      ),
      mc(
        "women-hafsah-3",
        "How does this lesson complete the topic?",
        [
          ["a", "It ends with preservation of revelation and trust"],
          ["b", "It ends by leaving the Quran unguarded"],
          ["c", "It ends with no lasting contribution"]
        ],
        "a",
        "The topic closes with a woman tied directly to protecting the Book for the Ummah."
      )
    ]
  )
};

const expandedContent = buildExpandedContent(BASE_COURSE, BASE_LESSONS_BY_ID);

export const COURSE = expandedContent.course;
export const LESSONS_BY_ID = expandedContent.lessonsById;

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
