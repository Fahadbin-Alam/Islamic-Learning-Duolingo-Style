import { buildExpandedContent, chainCourse } from "./scalableCurriculum";
import { mergeImportedNotes } from "./importedNotes";
import { IMPORTED_NOTES } from "./importedNotes.generated";
import type { Challenge, LearningCourse, Lesson, LessonSource, ShopItem, UserProfile } from "../types";
import { preciseResourceUrl } from "../services/resourceSupport";

const now = new Date();
const today = `${now.getFullYear()}-${`${now.getMonth() + 1}`.padStart(2, "0")}-${`${now.getDate()}`.padStart(2, "0")}`;

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
    url: preciseResourceUrl("Quran.com", url, reference),
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
    url: preciseResourceUrl("Sunnah.com", url, reference),
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
    url: preciseResourceUrl("YouTube", url, "Video guide"),
    reference: "Video guide",
    from,
    grade: "Visual walkthrough",
    summary
  };
}

// The hand-written questions list the correct answer first, so the choices are
// rotated by a stable hash of the question id to spread the answer across positions.
function rotateChoices(id: string, choices: ChoiceTuple[]) {
  let hash = 0;
  for (let index = 0; index < id.length; index += 1) {
    hash = (hash * 31 + id.charCodeAt(index)) | 0;
  }
  const start = Math.abs(hash) % choices.length;
  return choices.map((_, index) => choices[(start + index) % choices.length]);
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
    choices: rotateChoices(id, choices).map(([choiceId, label]) => ({ id: choiceId, label })),
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

// A lesson about one person: the learn card shows its line and these facts as chips, and its questions ask only
// what the card shows. With `saysLine`, the lesson's first source says the line, so the card's source chip shows it.
function person(base: Lesson, learnFacts: string[], saysLine: boolean): Lesson {
  return { ...base, learnFacts, ...(saysLine && base.sources[0] ? { learnSource: base.sources[0] } : {}) };
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
  streakDays: 0,
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
  subtitle: "Start with foundations, get ready for prayer, build manners and marriage wisdom, meet the Sahabah, reflect on Quran and tafsir, travel from Adam to Muhammad ﷺ, and learn from the women honored in revelation.",
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
          title: "As-salamu alaykum",
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
          requiredNodeIds: ["foundation-character"],
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
          requiredNodeIds: ["foundation-niyyah"],
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
      description: "Travel from Adam to Muhammad ﷺ and learn the big lessons each prophet left for the Ummah.",
      badge: "Topic 6",
      focus: "Creation, patience, trust, forgiveness, courage, mercy, and the final example.",
      mascot: "muslim_man",
      accentColor: "#D97B2D",
      starsTarget: 21,
      branches: [
        {
          id: "prophets-beginnings",
          title: "The first prophets",
          description: "Start with the earliest prophets and the first lessons of repentance and patience."
        },
        {
          id: "prophets-tested",
          title: "Tested messengers",
          description: "Go through the prophets whose lives teach sacrifice, purity, courage, and trust."
        },
        {
          id: "prophets-final-example",
          title: "The last prophet ﷺ",
          description: "End with the mercy and model of Prophet Muhammad ﷺ."
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
          title: "Muhammad ﷺ",
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
      title: "Great Women",
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
          description: "Continue in order through key wives of the Prophet ﷺ and the gifts they gave the Ummah."
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
    "As-salamu alaykum",
    "One of the first Muslim habits is greeting people with peace: As-salamu alaykum.",
    8,
    [
      hadithSource(
        "source-foundation-salam-riyad-844",
        "The excellence of spreading salam",
        "https://sunnah.com/riyadussalihin:844",
        "Riyad as-Salihin 844",
        "Abdullah bin Amr bin Al-As; gathered by Imam an-Nawawi from Al-Bukhari and Muslim",
        "Muttafaqun alayh",
        "The Prophet ﷺ taught that a beautiful act of Islam is to greet people with salam whether you know them or not."
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
          ["a", "As-salamu alaykum"],
          ["b", "Nice to meet you only"],
          ["c", "See you later"]
        ],
        "a",
        "As-salamu alaykum is the greeting of peace Muslims begin with."
      ),
      tf(
        "foundation-niyyah-2",
        "A Muslim should keep salam for friends only and skip strangers.",
        false,
        "The Prophet ﷺ encouraged greeting people whether you know them or not."
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
        "When something pleased him, the Prophet ﷺ said a form of Alhamdulillah that ties all complete blessings back to Allah."
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
        "Alhamdulillah thanks Allah, who sent the good news."
      ),
      tf(
        "foundation-guidance-2",
        "Alhamdulillah means praise belongs to Allah.",
        true,
        "That is why Muslims say it after blessings and good news."
      ),
      mc(
        "foundation-guidance-3",
        "What should you think when a blessing comes?",
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
        "The Prophet ﷺ taught a child to say Allah's name, eat with the right hand, and eat from what is near."
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
        "The Prophet ﷺ taught both remembrance and manners together."
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
        "The Prophet ﷺ counted more reward for fuller forms of salam, teaching Muslims to answer generously."
      )
    ],
    [
      mc(
        "foundation-character-1",
        "If someone says 'As-salamu alaykum,' what should you answer?",
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
        "Ibn Umar; collected by Imam Muslim",
        "Sahih",
        "The Prophet ﷺ taught that prayer is not accepted without purification, showing why wudu matters so much."
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
        "Uthman showed the Prophet's ﷺ wudu",
        "https://sunnah.com/bukhari:164",
        "Sahih al-Bukhari 164",
        "Humran, the freed slave of Uthman; collected by Imam al-Bukhari",
        "Sahih",
        "Uthman demonstrated the wudu of the Prophet ﷺ so Muslims could learn the order carefully."
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
        "Ibn Umar; collected by Imam Muslim",
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
    "After wudu, face the qiblah, settle yourself, and begin salah with takbir just as the Prophet ﷺ taught.",
    12,
    [
      hadithSource(
        "source-prayer-salah-open-bukhari-631",
        "Pray as you have seen me pray",
        "https://sunnah.com/bukhari:631",
        "Sahih al-Bukhari 631",
        "Malik bin Al-Huwairith; collected by Imam al-Bukhari",
        "Sahih",
        "The Prophet ﷺ instructed the believers to model their prayer on his own prayer."
      ),
      hadithSource(
        "source-prayer-salah-open-abudawud-856",
        "Begin with takbir and pray with calmness",
        "https://sunnah.com/abudawud:856",
        "Sunan Abi Dawud 856",
        "Abu Hurairah; collected by Imam Abu Dawud",
        "Sahih",
        "The Prophet ﷺ corrected a man's prayer by teaching him to face the qiblah, say takbir, and move with calm stillness."
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
        "The Prophet ﷺ taught prayer with calmness, not rushed movement."
      ),
      mc(
        "prayer-salah-open-3",
        "Which source in this lesson directly tells believers to follow the Prophet's ﷺ way of praying?",
        [
          ["a", "Sahih al-Bukhari 631"],
          ["b", "Sahih Muslim 224"],
          ["c", "Quran 5:6"]
        ],
        "a",
        "This hadith gives the famous command to pray as the Prophet ﷺ prayed."
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
        "The Prophet ﷺ taught that reciting Fatihat al-Kitab is essential in prayer."
      ),
      hadithSource(
        "source-prayer-salah-recite-abudawud-856",
        "Recite from the Quran, then bow",
        "https://sunnah.com/abudawud:856",
        "Sunan Abi Dawud 856",
        "Abu Hurairah; collected by Imam Abu Dawud",
        "Sahih",
        "The corrected prayer taught by the Prophet ﷺ includes recitation before going into ruku."
      ),
      videoSource(
        "source-prayer-salah-recite-video-2",
        "The Prophet ﷺ prayed",
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
        "Abu Humayd described the Prophet's ﷺ bowing and rising",
        "https://sunnah.com/abudawud:730",
        "Sunan Abi Dawud 730",
        "Abu Humayd al-Sa'idi; collected by Imam Abu Dawud",
        "Sahih",
        "This narration describes the Prophet ﷺ raising his hands, bowing with hands on the knees, and standing erect again before going to sujud."
      ),
      hadithSource(
        "source-prayer-salah-ruku-nasai-1055",
        "Allah hears the one who praises Him",
        "https://sunnah.com/nasai:1055",
        "Sunan an-Nasa'i 1055",
        "Wa'il bin Hujr; collected by Imam an-Nasa'i",
        "Sahih",
        "Wa'il described the Prophet ﷺ raising his hands and saying 'Sami' Allahu liman hamidah' when rising from ruku."
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
          ["b", "As-salamu alaykum"],
          ["c", "Bismillah before eating"]
        ],
        "a",
        "This is the phrase described in the hadith when rising from bowing."
      ),
      tf(
        "prayer-salah-ruku-3",
        "The Prophet ﷺ stood upright again before going down to sujud.",
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
        "The Prophet ﷺ placed his nose and forehead on the ground, kept his forearms away from his sides, and set his hands parallel to his shoulders."
      ),
      hadithSource(
        "source-prayer-salah-sujud-abudawud-856",
        "Prostrate and sit with calmness",
        "https://sunnah.com/abudawud:856",
        "Sunan Abi Dawud 856",
        "Abu Hurairah; collected by Imam Abu Dawud",
        "Sahih",
        "The Prophet ﷺ taught that each prostration and the sitting between them should be calm and complete."
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
        "The Prophet ﷺ taught calmness in sujud and in the sitting between the two sajdahs."
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
        "The Prophet ﷺ taught tashahhud like a surah",
        "https://sunnah.com/nasai:1278",
        "Sunan an-Nasa'i 1278",
        "Ibn Abbas; collected by Imam an-Nasa'i",
        "Sahih",
        "The Prophet ﷺ taught tashahhud with care and precision, the way a surah of the Quran is taught."
      ),
      hadithSource(
        "source-prayer-salah-tashahhud-abudawud-974",
        "Words of the tashahhud",
        "https://sunnah.com/abudawud:974",
        "Sunan Abi Dawud 974",
        "Ibn Abbas; collected by Imam Abu Dawud",
        "Sahih",
        "This narration records the words of tashahhud that the Prophet ﷺ taught in prayer."
      ),
      hadithSource(
        "source-prayer-salah-tashahhud-abudawud-933",
        "Taslim to the right and left",
        "https://sunnah.com/abudawud:933",
        "Sunan Abi Dawud 933",
        "Wa'il bin Hujr; collected by Imam Abu Dawud",
        "Sahih",
        "The Prophet ﷺ ended the prayer with taslim to the right and left."
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
        "The Prophet ﷺ taught tashahhud carefully, like teaching a surah from the Quran.",
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
        "The whole lesson returns to the Prophet's ﷺ command to follow his prayer closely."
      ),
      hadithSource(
        "source-prayer-salah-flow-abudawud-856",
        "Each pillar is done with calmness",
        "https://sunnah.com/abudawud:856",
        "Sunan Abi Dawud 856",
        "Abu Hurairah; collected by Imam Abu Dawud",
        "Sahih",
        "The Prophet's ﷺ correction of prayer teaches calm completeness in every posture."
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
          ["a", "As-salamu alaykum"],
          ["b", "Welcome back"],
          ["c", "Good game"]
        ],
        "a",
        "The reply is wa alaykum as-salam: and peace be upon you."
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
        "See source",
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
        "When asked who deserves the best companionship, the Prophet ﷺ named the mother three times before the father."
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
        "Who did the Prophet ﷺ mention first when asked about the best companionship?",
        [
          ["a", "Your mother"],
          ["b", "Only your friends"],
          ["c", "People with money"]
        ],
        "a",
        "The Prophet ﷺ repeated the mother's right three times before mentioning the father."
      ),
      tf(
        "mother-2",
        "Islam teaches that mothers have a very high right to care and kindness.",
        true,
        "That high right shows up clearly in both the Quran and hadith."
      ),
      mc(
        "mother-3",
        "How should you treat your mother?",
        [
          ["a", "Speak kindly and stay patient with your mother"],
          ["b", "Treat her care like it means nothing"],
          ["c", "Save your best character for strangers only"]
        ],
        "a",
        "Allah tells us to speak to our parents with gentle, kind words."
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
        "The Prophet ﷺ tied mercy for younger people and honor for elders together as part of Muslim character."
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
        "A younger child makes a mistake. What shows mercy?",
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
        "The Prophet ﷺ joined remembrance, neatness, and self-control in one short teaching at the table."
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
        "This adab was taught directly by the Prophet ﷺ."
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
        "The Prophet ﷺ encouraged marriage for those able to do it because it protects the eyes and guards chastity."
      )
    ],
    [
      mc(
        "marriage-purpose-1",
        "What does the Quran connect marriage with?",
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
        "The Prophet ﷺ directly tied marriage to guarding the gaze and chastity."
      ),
      mc(
        "marriage-purpose-3",
        "Which home matches what the Quran describes?",
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
        "The Prophet ﷺ pointed the believer toward religion as the quality that brings real success in marriage."
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
        "What should a Muslim value most in a spouse?",
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
        "The Prophet ﷺ said to choose the one with deen, and you will do well."
      ),
      mc(
        "marriage-choose-3",
        "Which question is wise to ask about a match?",
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
        "The Prophet ﷺ made excellence to one's family a measure of real goodness."
      )
    ],
    [
      mc(
        "marriage-kindness-1",
        "How does the Quran say to live with a spouse?",
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
        "The Prophet ﷺ tied true goodness directly to how someone treats family."
      ),
      mc(
        "marriage-kindness-3",
        "Which habit shows kindness at home?",
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
        "How can a spouse be like clothing?",
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
        "The Prophet ﷺ turned daily family treatment into a real measure of spiritual character."
      )
    ],
    [
      mc(
        "marriage-mercy-1",
        "What keeps a Muslim home strong?",
        [
          ["a", "Mercy and good character"],
          ["b", "Harshness and ego"],
          ["c", "Winning every argument"]
        ],
        "a",
        "Allah says He put love and mercy between spouses."
      ),
      tf(
        "marriage-mercy-2",
        "Marriage in Islam should pull both people closer to Allah.",
        true,
        "The Prophet ﷺ praised a couple who wake each other for night prayer."
      ),
      mc(
        "marriage-mercy-3",
        "Which daily habit keeps a home merciful?",
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
        "In the cave, the Prophet ﷺ calmed Abu Bakr with trust in Allah, showing his closeness and loyalty."
      ),
      hadithSource(
        "source-abubakr-tirmidhi-3696",
        "A Siddiq on Mount Hira",
        "https://sunnah.com/tirmidhi:3696",
        "Jami at-Tirmidhi 3696",
        "Abu Hurairah; collected by Imam at-Tirmidhi",
        "Sahih",
        "The Prophet ﷺ described Abu Bakr as a Siddiq, the truthful and unwavering companion."
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
        "The Prophet ﷺ described Umar as someone whose strength and firmness made Shaytan avoid his path."
      ),
      hadithSource(
        "source-umar-bukhari-3686",
        "A martyr beside the Prophet ﷺ and Abu Bakr",
        "https://sunnah.com/bukhari:3686",
        "Sahih al-Bukhari 3686",
        "Anas ibn Malik; collected by Imam al-Bukhari",
        "Sahih",
        "On Mount Uhud the Prophet ﷺ mentioned Umar with those promised martyrdom, highlighting his status and resolve."
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
        "The Prophet ﷺ spoke of Uthman with a rare kind of modesty, saying even the angels are shy of him."
      ),
      hadithSource(
        "source-uthman-bukhari-3686",
        "Among those on Uhud",
        "https://sunnah.com/bukhari:3686",
        "Sahih al-Bukhari 3686",
        "Anas ibn Malik; collected by Imam al-Bukhari",
        "Sahih",
        "The Prophet ﷺ named Uthman among the great companions standing beside him and described him among the martyrs."
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
    "Ali combines courage, knowledge, and loyalty to the Prophet ﷺ in a way that shaped the early Ummah.",
    12,
    [
      hadithSource(
        "source-ali-bukhari-4210",
        "The flag at Khaybar",
        "https://sunnah.com/bukhari:4210",
        "Sahih al-Bukhari 4210",
        "Sahl bin Sa'd; collected by Imam al-Bukhari",
        "Sahih",
        "The Prophet ﷺ gave Ali the flag at Khaybar, linking him to love of Allah, love of the Messenger ﷺ, and brave leadership."
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
        "Ali is remembered for brave service close to the Prophet ﷺ."
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
        "The Prophet ﷺ heard Bilal's footsteps in Paradise, showing how sincerity in steady worship raises a believer."
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
        "The Prophet ﷺ praised learning and teaching the Quran, giving weight to starting with Al-Fatihah well."
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
        "source-ikhlas-bukhari-7375",
        "A beloved surah of tawhid",
        "https://sunnah.com/bukhari:7375",
        "Sahih al-Bukhari 7375",
        "Aishah; collected by Imam al-Bukhari",
        "Sahih",
        "The Prophet ﷺ explained that love of this surah is tied to what it carries about Allah's attributes."
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
        "The Prophet ﷺ confirmed the special protection tied to reciting Ayat al-Kursi at night."
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
        "https://sunnah.com/muslim:55a",
        "Sahih Muslim 55a",
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
  "lesson-adam": person(
    lesson(
      "lesson-adam",
      "prophets-adam",
      "Adam",
      "Adam was the first human. Allah made him from clay, and forgave him when he said sorry.",
      12,
      [
        quranSource(
          "source-adam-quran-2-37",
          "Allah accepted Adam's repentance",
          "https://quran.com/en/2:37/tafsirs",
          "Quran 2:37",
          "Adam received words from his Lord, and Allah accepted his repentance. He is the Accepting of repentance, the Most Merciful."
        ),
        quranSource(
          "source-adam-quran-2-31",
          "Allah taught Adam the names",
          "https://quran.com/en/2:31/tafsirs",
          "Quran 2:31",
          "The story of Adam begins with knowledge and honor, showing the dignity Allah gave human beings."
        )
      ],
      [
        mc(
          "adam-1",
          "Who was the first human?",
          [
            ["a", "Adam"],
            ["b", "Nuh"],
            ["c", "Musa"]
          ],
          "a",
          "Allah made Adam first, and all people come from him."
        ),
        mc(
          "adam-2",
          "What did Allah make Adam from?",
          [
            ["a", "Clay"],
            ["b", "Fire"],
            ["c", "Light"]
          ],
          "a",
          "The Quran says Allah made Adam from clay."
        ),
        tf(
          "adam-3",
          "Adam was the first angel, and Allah forgave his mistake.",
          false,
          "Adam was the first human, not an angel."
        )
      ]
    ),
    ["Made from: clay", "Wife: Hawwa"],
    true
  ),
  "lesson-nuh": person(
    lesson(
      "lesson-nuh",
      "prophets-nuh",
      "Nuh",
      "Nuh called his people to Allah for 950 years, and built the Ark when Allah told him to.",
      12,
      [
        quranSource(
          "source-nuh-quran-11-37",
          "Build the Ark under Our watch",
          "https://quran.com/en/11:37/tafsirs",
          "Quran 11:37",
          "Allah told Nuh to build the Ark under His eyes and His guidance."
        ),
        quranSource(
          "source-nuh-quran-29-14",
          "Nuh stayed with his people 950 years",
          "https://quran.com/en/29:14/tafsirs",
          "Quran 29:14",
          "Nuh stayed among his people a thousand years less fifty, calling them to Allah."
        )
      ],
      [
        mc(
          "nuh-1",
          "What did Nuh build?",
          [
            ["a", "The Ark"],
            ["b", "A tower"],
            ["c", "A palace"]
          ],
          "a",
          "Allah told Nuh to build the Ark, and he obeyed."
        ),
        mc(
          "nuh-2",
          "How long did Nuh call his people to Allah?",
          [
            ["a", "950 years"],
            ["b", "9 years"],
            ["c", "50 years"]
          ],
          "a",
          "The Quran says he stayed with them a thousand years less fifty."
        ),
        tf(
          "nuh-3",
          "Nuh built the Ark and called people to idols, patiently.",
          false,
          "Nuh called people to Allah alone."
        )
      ]
    ),
    ["Called people: 950 years"],
    true
  ),
  "lesson-ibrahim": person(
    lesson(
      "lesson-ibrahim",
      "prophets-ibrahim",
      "Ibrahim",
      "Ibrahim worshipped Allah alone, and Allah took him as His close friend.",
      12,
      [
        quranSource(
          "source-ibrahim-quran-4-125",
          "Allah took Ibrahim as a close friend",
          "https://quran.com/en/4:125/tafsirs",
          "Quran 4:125",
          "Allah took Ibrahim as His close friend, Khalil."
        ),
        quranSource(
          "source-ibrahim-quran-14-39",
          "Ismail and Ishaq",
          "https://quran.com/en/14:39/tafsirs",
          "Quran 14:39",
          "Ibrahim praised Allah, who gave him Ismail and Ishaq in his old age."
        ),
        quranSource(
          "source-ibrahim-quran-6-74",
          "Ibrahim and his father Azar",
          "https://quran.com/en/6:74/tafsirs",
          "Quran 6:74",
          "Ibrahim told his father Azar that idols are not gods."
        )
      ],
      [
        mc(
          "ibrahim-1",
          "What did Allah make Ibrahim?",
          [
            ["a", "His close friend"],
            ["b", "A king"],
            ["c", "An angel"]
          ],
          "a",
          "That is why Ibrahim is called Khalilullah, the friend of Allah."
        ),
        mc(
          "ibrahim-2",
          "Who was Ibrahim's father?",
          [
            ["a", "Azar"],
            ["b", "Imran"],
            ["c", "Ya'qub"]
          ],
          "a",
          "The Quran names Ibrahim's father Azar."
        ),
        tf(
          "ibrahim-3",
          "Ismail and Ishaq were Ibrahim's sons.",
          true,
          "Ibrahim thanked Allah for both of his sons."
        )
      ]
    ),
    ["Father: Azar", "Sons: Ismail, Ishaq"],
    true
  ),
  "lesson-yusuf": person(
    lesson(
      "lesson-yusuf",
      "prophets-yusuf",
      "Yusuf",
      "Yusuf's brothers threw him in a well, but years later he forgave them.",
      12,
      [
        quranSource(
          "source-yusuf-quran-12-92",
          "No blame upon you today",
          "https://quran.com/en/12:92/tafsirs",
          "Quran 12:92",
          "Yusuf told his brothers: no blame upon you today; Allah will forgive you."
        ),
        quranSource(
          "source-yusuf-quran-12-15",
          "Yusuf in the well",
          "https://quran.com/en/12:15/tafsirs",
          "Quran 12:15",
          "Yusuf's brothers agreed to put him at the bottom of a well."
        )
      ],
      [
        mc(
          "yusuf-1",
          "Where did Yusuf's brothers throw him?",
          [
            ["a", "Into a well"],
            ["b", "Into the sea"],
            ["c", "Into a fire"]
          ],
          "a",
          "The Quran says they put him at the bottom of a well."
        ),
        mc(
          "yusuf-2",
          "Who was Yusuf's father?",
          [
            ["a", "Ya'qub"],
            ["b", "Ibrahim"],
            ["c", "Musa"]
          ],
          "a",
          "Ya'qub was a prophet, and the son of Ishaq."
        ),
        tf(
          "yusuf-3",
          "Yusuf's brothers threw him in a well, and he never forgave them.",
          false,
          "He told them: no blame on you today."
        )
      ]
    ),
    ["Father: Ya'qub", "Brothers: eleven"],
    false
  ),
  "lesson-musa": person(
    lesson(
      "lesson-musa",
      "prophets-musa",
      "Musa",
      "Allah spoke to Musa, gave him the Tawrah, and sent him to Pharaoh.",
      12,
      [
        quranSource(
          "source-musa-quran-4-164",
          "Allah spoke to Musa",
          "https://quran.com/en/4:164/tafsirs",
          "Quran 4:164",
          "Allah spoke to Musa directly."
        ),
        quranSource(
          "source-musa-quran-20-14",
          "Indeed, I am Allah, so worship Me",
          "https://quran.com/en/20:14/tafsirs",
          "Quran 20:14",
          "Musa's call began with pure worship and direct closeness to Allah."
        )
      ],
      [
        mc(
          "musa-1",
          "Who did Allah send Musa to?",
          [
            ["a", "Pharaoh"],
            ["b", "Abu Lahab"],
            ["c", "The people of 'Ad"]
          ],
          "a",
          "Pharaoh was a cruel king of Egypt."
        ),
        mc(
          "musa-2",
          "Which book did Allah give Musa?",
          [
            ["a", "The Tawrah"],
            ["b", "The Injil"],
            ["c", "The Zabur"]
          ],
          "a",
          "The Injil came to Isa, and the Zabur to Dawud."
        ),
        tf(
          "musa-3",
          "Allah spoke to Musa, and sent him to Pharaoh.",
          true,
          "That is why Musa is called Kalimullah: the one Allah spoke to."
        )
      ]
    ),
    ["Book: Tawrah"],
    true
  ),
  "lesson-isa": person(
    lesson(
      "lesson-isa",
      "prophets-isa",
      "Isa",
      "Isa is a noble prophet of Allah, born to Maryam without a father.",
      12,
      [
        quranSource(
          "source-isa-quran-3-47",
          "Allah creates what He wills",
          "https://quran.com/en/3:47/tafsirs",
          "Quran 3:47",
          "Maryam asked how she could have a child with no husband. Allah creates what He wills; He only says: Be, and it is."
        ),
        quranSource(
          "source-isa-quran-3-45",
          "Good news of Isa, a word from Allah",
          "https://quran.com/en/3:45/tafsirs",
          "Quran 3:45",
          "The angels gave Maryam good news of a son, the Messiah, Isa son of Maryam."
        )
      ],
      [
        mc(
          "isa-1",
          "Who was Isa's mother?",
          [
            ["a", "Maryam"],
            ["b", "Khadijah"],
            ["c", "Asiyah"]
          ],
          "a",
          "The Quran calls him Isa, son of Maryam."
        ),
        mc(
          "isa-2",
          "Which book did Allah give Isa?",
          [
            ["a", "The Injil"],
            ["b", "The Tawrah"],
            ["c", "The Quran"]
          ],
          "a",
          "The Tawrah came to Musa, and the Quran to Muhammad ﷺ."
        ),
        tf(
          "isa-3",
          "Isa is a noble angel, born to Maryam without a father.",
          false,
          "Isa is a prophet of Allah, not an angel."
        )
      ]
    ),
    ["Mother: Maryam", "Book: Injil"],
    true
  ),
  "lesson-muhammad": person(
    lesson(
      "lesson-muhammad",
      "prophets-muhammad",
      "Muhammad ﷺ",
      "Muhammad ﷺ is the last messenger of Allah, sent as a mercy to all the worlds.",
      14,
      [
        quranSource(
          "source-muhammad-quran-21-107",
          "We sent you only as a mercy to the worlds",
          "https://quran.com/en/21:107/tafsirs",
          "Quran 21:107",
          "Allah sent the Prophet ﷺ as a mercy to all the worlds."
        ),
        quranSource(
          "source-muhammad-quran-33-40",
          "The seal of the prophets",
          "https://quran.com/en/33:40/tafsirs",
          "Quran 33:40",
          "Muhammad ﷺ is the Messenger of Allah and the last of the prophets."
        ),
        quranSource(
          "source-muhammad-quran-33-21",
          "In the Messenger of Allah ﷺ is an excellent example",
          "https://quran.com/en/33:21/tafsirs",
          "Quran 33:21",
          "Allah presents the Prophet Muhammad ﷺ as the model believers return to in hope, patience, and obedience."
        )
      ],
      [
        mc(
          "muhammad-1",
          "Who is the last messenger of Allah?",
          [
            ["a", "Muhammad ﷺ"],
            ["b", "Isa"],
            ["c", "Musa"]
          ],
          "a",
          "The Quran calls him the seal of the prophets."
        ),
        mc(
          "muhammad-2",
          "What was the name of the Prophet's ﷺ mother?",
          [
            ["a", "Aminah"],
            ["b", "Maryam"],
            ["c", "Hawwa"]
          ],
          "a",
          "Aminah lived in Makkah, where he ﷺ was born."
        ),
        tf(
          "muhammad-3",
          "Muhammad ﷺ is the last messenger, sent as a mercy.",
          true,
          "Allah says He sent him as a mercy to all the worlds."
        )
      ]
    ),
    ["Father: Abdullah", "Mother: Aminah", "Tribe: Quraysh"],
    true
  ),
  "lesson-women-hawwa": person(
    lesson(
      "lesson-women-hawwa",
      "women-hawwa",
      "Hawwa",
      "Hawwa was the first woman. She lived in Paradise with Adam, her husband.",
      12,
      [
        quranSource(
          "source-women-hawwa-quran-2-35",
          "Adam and his wife in the garden",
          "https://quran.com/2:35/tafsirs/tazkirul-quran-en",
          "Quran 2:35-36",
          "Allah told Adam: live, you and your wife, in Paradise."
        ),
        quranSource(
          "source-women-hawwa-quran-7-23",
          "The dua of repentance",
          "https://quran.com/en/7:23/tafsirs",
          "Quran 7:23",
          "Adam and Hawwa said: our Lord, we have wronged ourselves, so forgive us and have mercy on us."
        )
      ],
      [
        mc(
          "women-hawwa-1",
          "Who was the first woman?",
          [
            ["a", "Hawwa"],
            ["b", "Maryam"],
            ["c", "Asiyah"]
          ],
          "a",
          "Allah made Hawwa as a wife for Adam."
        ),
        mc(
          "women-hawwa-2",
          "Where did Adam and Hawwa live first?",
          [
            ["a", "In Paradise"],
            ["b", "In Makkah"],
            ["c", "In Egypt"]
          ],
          "a",
          "Allah told them: live in Paradise, you and your wife."
        ),
        tf(
          "women-hawwa-3",
          "Hawwa, the first woman, lived in Egypt with Adam.",
          false,
          "Adam and Hawwa lived first in Paradise."
        )
      ]
    ),
    ["Husband: Adam"],
    true
  ),
  "lesson-women-mother-musa": person(
    lesson(
      "lesson-women-mother-musa",
      "women-mother-musa",
      "Mother of Musa",
      "Allah told the mother of Musa to put her baby in the river, and she trusted Him.",
      12,
      [
        quranSource(
          "source-women-mother-musa-quran-28-7",
          "Put him in the river and do not fear",
          "https://quran.com/en/28:7/tafsirs/ar-tafsir-al-tabari",
          "Quran 28:7",
          "Allah inspired the mother of Musa: put him in the river, and do not fear or grieve. We will return him to you."
        )
      ],
      [
        mc(
          "women-mother-musa-1",
          "Where did Musa's mother put baby Musa?",
          [
            ["a", "In the river"],
            ["b", "In a cave"],
            ["c", "In a well"]
          ],
          "a",
          "Allah told her: do not fear, We will bring him back to you."
        ),
        mc(
          "women-mother-musa-2",
          "Who told Musa's mother what to do?",
          [
            ["a", "Allah"],
            ["b", "Pharaoh"],
            ["c", "Her neighbor"]
          ],
          "a",
          "Allah put the idea in her heart, and she trusted Him."
        ),
        tf(
          "women-mother-musa-3",
          "Allah told Musa's mother to put baby Musa in a cave.",
          false,
          "Allah told her to put him in the river."
        )
      ]
    ),
    ["Son: Musa"],
    true
  ),
  "lesson-women-asiyah": person(
    lesson(
      "lesson-women-asiyah",
      "women-asiyah",
      "Asiyah",
      "Asiyah was the wife of Pharaoh, and she believed in Allah.",
      12,
      [
        quranSource(
          "source-women-asiyah-quran-66-11",
          "A house near Allah in Paradise",
          "https://quran.com/en/66:11/tafsirs/tazkirul-quran-en",
          "Quran 66:11",
          "Allah gives the wife of Pharaoh as an example for the believers."
        ),
        hadithSource(
          "source-women-asiyah-bukhari-3433",
          "Asiyah among the greatest women",
          "https://sunnah.com/bukhari:3433",
          "Sahih al-Bukhari 3433",
          "Abu Musa al-Ashari; collected by Imam al-Bukhari",
          "Sahih",
          "The Prophet ﷺ named Asiyah among the most perfect women."
        )
      ],
      [
        mc(
          "women-asiyah-1",
          "Who was Asiyah's husband?",
          [
            ["a", "Pharaoh"],
            ["b", "Musa"],
            ["c", "Nuh"]
          ],
          "a",
          "Pharaoh was a cruel king, but Asiyah believed in Allah."
        ),
        tf(
          "women-asiyah-2",
          "Asiyah, Pharaoh's wife, believed in Allah and stayed brave.",
          true,
          "Allah praises her in the Quran as an example for believers."
        )
      ]
    ),
    ["Husband: Pharaoh"],
    true
  ),
  "lesson-women-maryam": person(
    lesson(
      "lesson-women-maryam",
      "women-maryam",
      "Maryam",
      "Maryam, the daughter of Imran and mother of Isa, was pure, and Allah chose her.",
      12,
      [
        quranSource(
          "source-women-maryam-quran-3-42",
          "Allah chose and purified Maryam",
          "https://quran.com/al-i-imran/42/tafsirs",
          "Quran 3:42",
          "The angels said: Maryam, Allah has chosen you, made you pure, and chosen you above the women of the worlds."
        ),
        hadithSource(
          "source-women-maryam-bukhari-3433",
          "Maryam among the women of perfection",
          "https://sunnah.com/bukhari:3433",
          "Sahih al-Bukhari 3433",
          "Abu Musa al-Ashari; collected by Imam al-Bukhari",
          "Sahih",
          "The Prophet ﷺ named Maryam among the most perfect women."
        )
      ],
      [
        mc(
          "women-maryam-1",
          "Who was Maryam's son?",
          [
            ["a", "Isa"],
            ["b", "Musa"],
            ["c", "Yahya"]
          ],
          "a",
          "The Quran calls him Isa, son of Maryam."
        ),
        mc(
          "women-maryam-2",
          "Who was Maryam's father?",
          [
            ["a", "Imran"],
            ["b", "Zakariyya"],
            ["c", "Ibrahim"]
          ],
          "a",
          "The Quran calls her Maryam, daughter of Imran."
        ),
        tf(
          "women-maryam-3",
          "Maryam was pure and devoted, and Allah chose her.",
          true,
          "The angels told her: Allah has chosen you and made you pure."
        )
      ]
    ),
    ["Father: Imran", "Son: Isa"],
    true
  ),
  "lesson-women-khadijah": person(
    lesson(
      "lesson-women-khadijah",
      "women-khadijah",
      "Khadijah",
      "Khadijah was the first wife of the Prophet ﷺ, and the first to believe in him.",
      12,
      [
        hadithSource(
          "source-women-khadijah-bukhari-3815",
          "Khadijah among the best women",
          "https://sunnah.com/bukhari:3815",
          "Sahih al-Bukhari 3815",
          "Ali ibn Abi Talib; collected by Imam al-Bukhari",
          "Sahih",
          "The Prophet ﷺ described Khadijah as among the best women."
        ),
        hadithSource(
          "source-women-khadijah-muslim-2432",
          "Glad tidings of a house in Paradise",
          "https://sunnah.com/muslim/44/103-104",
          "Sahih Muslim 2432",
          "Abu Hurairah; collected by Imam Muslim",
          "Sahih",
          "Jibril brought Khadijah greetings from Allah and glad tidings of a house in Paradise."
        )
      ],
      [
        mc(
          "women-khadijah-1",
          "Who was the Prophet's ﷺ first wife?",
          [
            ["a", "Khadijah"],
            ["b", "Aishah"],
            ["c", "Hafsah"]
          ],
          "a",
          "They married in Makkah, years before the first revelation."
        ),
        mc(
          "women-khadijah-2",
          "Which tribe was Khadijah from?",
          [
            ["a", "Quraysh"],
            ["b", "Ghifar"],
            ["c", "Thaqif"]
          ],
          "a",
          "Quraysh was the leading tribe of Makkah."
        ),
        tf(
          "women-khadijah-3",
          "Khadijah was the Prophet's ﷺ last wife and first believer.",
          false,
          "Khadijah was his first wife."
        )
      ]
    ),
    ["Father: Khuwaylid", "Tribe: Quraysh"],
    false
  ),
  "lesson-women-aishah": person(
    lesson(
      "lesson-women-aishah",
      "women-aishah",
      "Aishah",
      "Aishah, the daughter of Abu Bakr, taught the Muslims a lot about the Prophet's ﷺ life.",
      12,
      [
        hadithSource(
          "source-women-aishah-bukhari-3770",
          "The virtue of Aishah",
          "https://sunnah.com/bukhari:3770",
          "Sahih al-Bukhari 3770",
          "Anas ibn Malik; collected by Imam al-Bukhari",
          "Sahih",
          "The Prophet ﷺ described the virtue of Aishah over other women with a well-known comparison."
        ),
        hadithSource(
          "source-women-aishah-bukhari-6201",
          "Jibril sent salam to Aishah",
          "https://sunnah.com/bukhari:6201",
          "Sahih al-Bukhari 6201",
          "Aishah; collected by Imam al-Bukhari",
          "Sahih",
          "The Prophet ﷺ told Aishah that Jibril sent her salam."
        )
      ],
      [
        mc(
          "women-aishah-1",
          "Who was Aishah's father?",
          [
            ["a", "Abu Bakr"],
            ["b", "Umar"],
            ["c", "Uthman"]
          ],
          "a",
          "Abu Bakr was the Prophet's ﷺ closest friend."
        ),
        mc(
          "women-aishah-2",
          "What did Aishah teach the Muslims about?",
          [
            ["a", "The Prophet's ﷺ life"],
            ["b", "Poems"],
            ["c", "Trade"]
          ],
          "a",
          "Many hadith we know today come from Aishah."
        ),
        tf(
          "women-aishah-3",
          "Aishah taught the Muslims a lot about the Prophet's ﷺ life.",
          true,
          "She is one of the companions who told the most hadith."
        )
      ]
    ),
    ["Father: Abu Bakr", "Tribe: Quraysh"],
    false
  ),
  "lesson-women-hafsah": person(
    lesson(
      "lesson-women-hafsah",
      "women-hafsah",
      "Hafsah",
      "Hafsah, the daughter of Umar, kept the written pages of the Quran safe.",
      14,
      [
        hadithSource(
          "source-women-hafsah-bukhari-4987",
          "Hafsah preserved the manuscripts",
          "https://sunnah.com/bukhari:4987",
          "Sahih al-Bukhari 4987",
          "Anas ibn Malik; collected by Imam al-Bukhari",
          "Sahih",
          "The written pages of the Quran were kept with Hafsah, and Uthman had them copied for the Muslim lands."
        ),
        quranSource(
          "source-women-hafsah-quran-33-6",
          "The wives of the Prophet ﷺ are mothers of the believers",
          "https://quran.com/en/33:6/tafsirs",
          "Quran 33:6",
          "The Quran calls the wives of the Prophet ﷺ the mothers of the believers."
        )
      ],
      [
        mc(
          "women-hafsah-1",
          "Who was Hafsah's father?",
          [
            ["a", "Umar"],
            ["b", "Abu Bakr"],
            ["c", "Ali"]
          ],
          "a",
          "Umar was the second caliph."
        ),
        mc(
          "women-hafsah-2",
          "What did Hafsah keep safe?",
          [
            ["a", "The Quran's written pages"],
            ["b", "Gold coins"],
            ["c", "A sword"]
          ],
          "a",
          "The pages went from Abu Bakr to Umar, and then to her."
        ),
        tf(
          "women-hafsah-3",
          "Hafsah, daughter of Umar, kept the Quran's written pages safe.",
          true,
          "Hafsah, daughter of Umar, kept the Quran's written pages safe."
        )
      ]
    ),
    ["Father: Umar", "Tribe: Quraysh"],
    true
  )
};

// The line each starter lesson's learn card says: short, concrete, and what its questions ask about.
const BASE_LEARN_LINES: Record<string, string> = {
  "lesson-foundation-niyyah": "Muslims greet with As-salamu alaykum: peace be upon you.",
  "lesson-foundation-character": "When someone says salam, reply: wa alaykum as-salam.",
  "lesson-foundation-guidance": "For good news, say Alhamdulillah: all praise is for Allah.",
  "lesson-foundation-bismillah": "Say Bismillah before you eat or start something.",
  "lesson-foundation-sneeze": "After a sneeze, say Alhamdulillah. Others reply: Yarhamuk Allah.",
  "lesson-salam": "Say salam to people you know and people you don't.",
  "lesson-truthful": "Always tell the truth, even after a mistake.",
  "lesson-parents": "Speak gently to your parents, and listen when elders talk.",
  "lesson-mother": "The Prophet ﷺ said: your mother, three times, then your father.",
  "lesson-service": "Be humble with your parents, and make du'a for them.",
  "lesson-mercy": "Be gentle with younger people, and respect older people.",
  "lesson-eating": "At the table, say Bismillah and eat with your right hand.",
  "lesson-marriage-purpose": "Allah made marriage a home of calm, love, and mercy.",
  "lesson-marriage-choose": "Choose a spouse for their deen and good character.",
  "lesson-marriage-kindness": "The Quran says: live with your spouse in kindness.",
  "lesson-marriage-clothing": "The Quran calls spouses clothing for each other.",
  "lesson-marriage-mercy": "A strong home keeps showing mercy, day after day.",
  "lesson-adam": "Adam was the first human, and Allah forgave his mistake.",
  "lesson-nuh": "Nuh built the Ark and called people to Allah, patiently.",
  "lesson-ibrahim": "Allah took Ibrahim as His close friend.",
  "lesson-yusuf": "Yusuf's brothers threw him in a well, but he forgave them.",
  "lesson-musa": "Allah spoke to Musa, and sent him to Pharaoh.",
  "lesson-isa": "Isa is a noble prophet, born to Maryam without a father.",
  "lesson-muhammad": "Muhammad ﷺ is the last messenger, sent as a mercy.",
  "lesson-women-hawwa": "Hawwa, the first woman, lived in Paradise with Adam.",
  "lesson-women-mother-musa": "Allah told Musa's mother to put baby Musa in the river.",
  "lesson-women-asiyah": "Asiyah, Pharaoh's wife, believed in Allah and stayed brave.",
  "lesson-women-maryam": "Maryam was pure and devoted, and Allah chose her.",
  "lesson-women-khadijah": "Khadijah was the Prophet's ﷺ first wife and first believer.",
  "lesson-women-aishah": "Aishah taught the Muslims a lot about the Prophet's ﷺ life.",
  "lesson-women-hafsah": "Hafsah, daughter of Umar, kept the Quran's written pages safe."
};

function withLearnLines(lessons: Record<string, Lesson>): Record<string, Lesson> {
  return Object.fromEntries(
    Object.entries(lessons).map(([id, item]) => [id, BASE_LEARN_LINES[id] ? { ...item, learnLine: BASE_LEARN_LINES[id] } : item])
  );
}

const scaledContent = buildExpandedContent(BASE_COURSE, withLearnLines(BASE_LESSONS_BY_ID));
const expandedContent = chainCourse(mergeImportedNotes(scaledContent.course, scaledContent.lessonsById, IMPORTED_NOTES));

export const COURSE = expandedContent.course;
export const LESSONS_BY_ID = expandedContent.lessonsById;

export const SHOP_ITEMS: ShopItem[] = [
  {
    id: "membership-monthly",
    type: "monthly_membership",
    tier: "premium_monthly",
    name: "Monthly premium",
    localizedDescription: "Unlock premium lessons, deeper review, bonus resources, and unlimited hearts.",
    price: 9.99,
    currencyType: "USD",
    productId: "membership_monthly",
    unlimitedHearts: true,
    removesAds: true,
    durationDays: 30,
    benefits: [
      "Full access to premium branches",
      "Advanced lessons and deeper review",
      "Bonus resources and premium quizzes",
      "Unlimited hearts and sponsor-free study"
    ]
  },
  {
    id: "membership-yearly",
    type: "yearly_membership",
    tier: "premium_yearly",
    name: "Yearly premium",
    localizedDescription: "Save 20% with a full year of premium access, unlimited hearts, and advanced study tools.",
    price: 95.9,
    currencyType: "USD",
    productId: "membership_yearly",
    unlimitedHearts: true,
    removesAds: true,
    durationDays: 365,
    highlightBadge: "20% off yearly",
    benefits: [
      "Everything in monthly premium",
      "Lower yearly price for long-term learning",
      "Premium tests, review mode, and branch unlocks",
      "Ready for account sync across devices"
    ]
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
    id: "gem-heart-refill",
    type: "gem_heart_refill",
    name: "Refill hearts with gems",
    localizedDescription: "Spend the gems you earned on the path to refill every heart.",
    price: 350,
    currencyType: "gems",
    refillsHearts: true
  },
  {
    id: "gem-pack-medium",
    type: "gem_pack",
    name: "Gem chest",
    localizedDescription: "Add 1,200 gems for heart refills and future rewards.",
    price: 4.99,
    currencyType: "USD",
    productId: "gem_pack_medium",
    gemsGranted: 1200
  },
  {
    id: "watch-ad-heart",
    type: "rewarded_ad",
    name: "Watch and recover",
    localizedDescription: "Earn one heart after a short sponsor break.",
    price: 0,
    currencyType: "rewarded_ad",
    heartsGranted: 1
  }
];

export const allNodes = COURSE.sections.flatMap((section) => section.nodes);

export function findNodeByLessonId(lessonId: string) {
  return allNodes.find((node) => node.lessonIds.includes(lessonId));
}
