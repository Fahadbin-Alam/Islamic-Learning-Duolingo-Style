import type {
  DifficultyTier,
  FoundationCategoryId,
  FoundationPair,
  FoundationQuestion,
  LearnerReadinessLabel
} from "../types";

type CategoryMeta = {
  title: string;
  shortTitle: string;
  description: string;
  accentColor: string;
};

type QuestionSeed = {
  id: string;
  category: FoundationCategoryId;
  subtopic: string;
  difficulty: DifficultyTier;
  type: FoundationQuestion["type"];
  prompt: string;
  scenario?: string;
  options?: string[];
  correctAnswer?: FoundationQuestion["correctAnswer"];
  acceptedAnswers?: string[];
  pairs?: FoundationPair[];
  orderItems?: string[];
  explanationShort: string;
  explanationLong: string;
  misconceptionNotes?: string[];
  wrongAnswerNotes?: Record<string, string>;
  tags: string[];
  reviewNext: string;
  whyThisMatters: string;
  xpReward?: number;
};

const ROTATED_OPTION_TYPES = new Set<FoundationQuestion["type"]>([
  "multiple_choice",
  "scenario_judgment",
  "best_response",
  "identify_mistake",
  "mini_case_study"
]);

// Seeds list the correct option first, so options are rotated by a stable hash of the
// question id; otherwise "always pick the first answer" would pass the assessment.
function rotateOptions(id: string, options: string[] | undefined) {
  if (!options?.length) {
    return options;
  }
  let hash = 0;
  for (let index = 0; index < id.length; index += 1) {
    hash = (hash * 31 + id.charCodeAt(index)) | 0;
  }
  const start = Math.abs(hash) % options.length;
  return options.map((_, index) => options[(start + index) % options.length]);
}

function q(seed: QuestionSeed): FoundationQuestion {
  return {
    ...seed,
    options: ROTATED_OPTION_TYPES.has(seed.type) ? rotateOptions(seed.id, seed.options) : seed.options,
    acceptedAnswers: seed.acceptedAnswers,
    pairs: seed.pairs,
    orderItems: seed.orderItems,
    misconceptionNotes: seed.misconceptionNotes ?? [],
    // Only hand-written notes: a generic "this choice misses the point" line teaches nothing.
    wrongAnswerNotes: seed.wrongAnswerNotes ?? {},
    xpReward: seed.xpReward ?? 6 + seed.difficulty * 2
  };
}

const SHAHADAH_QUESTIONS: FoundationQuestion[] = [
  q({
    id: "shahadah_01",
    category: "shahadah",
    subtopic: "pillar_identity",
    difficulty: 1,
    type: "multiple_choice",
    prompt: "Which pillar comes first in Islam?",
    options: ["Shahadah", "Zakat", "Hajj", "Fasting"],
    correctAnswer: "Shahadah",
    explanationShort: "The Shahadah is the first pillar.",
    explanationLong: "Islam begins with testifying that none has the right to be worshipped except Allah and that Muhammad is His Messenger.",
    misconceptionNotes: ["The other pillars are built on this testimony, but they are not the first pillar."],
    tags: ["foundation", "shahadah", "pillars"],
    reviewNext: "Meaning of the testimony",
    whyThisMatters: "A learner needs to know that Islam starts with belief and testimony before the other pillars are built."
  }),
  q({
    id: "shahadah_02",
    category: "shahadah",
    subtopic: "core_meaning",
    difficulty: 1,
    type: "true_false",
    prompt: "The Shahadah is about Allah alone and Muhammad as His Messenger.",
    options: ["True", "False"],
    correctAnswer: "True",
    explanationShort: "Both parts belong to the Shahadah.",
    explanationLong: "The testimony joins two truths: worshipping Allah alone and following the Messenger whom Allah sent.",
    misconceptionNotes: ["Leaving out the Messenger changes the testimony into something incomplete."],
    tags: ["foundation", "shahadah", "meaning"],
    reviewNext: "Two parts of the Shahadah",
    whyThisMatters: "This keeps belief from becoming vague. Islam is not only belief in God in general; it includes following revelation."
  }),
  q({
    id: "shahadah_03",
    category: "shahadah",
    subtopic: "core_meaning",
    difficulty: 1,
    type: "fill_in_blank",
    prompt: "No one is worthy of worship except ____.",
    // Things people have wrongly worshipped (Quran 41:37 names the sun and the moon).
    options: ["the sun", "idols", "Allah", "the moon"],
    acceptedAnswers: ["allah"],
    correctAnswer: "Allah",
    explanationShort: "Only Allah is worthy of worship.",
    explanationLong: "The first half of the testimony turns worship away from creation and toward the Creator alone.",
    misconceptionNotes: ["The Shahadah is not about vague spirituality. It points worship to Allah alone."],
    tags: ["foundation", "shahadah", "tawhid"],
    reviewNext: "Tawhid in worship",
    whyThisMatters: "This is the heart of tawhid and the anchor of all later Islamic learning."
  }),
  q({
    id: "shahadah_04",
    category: "shahadah",
    subtopic: "two_parts",
    difficulty: 2,
    type: "match_pairs",
    prompt: "Match each phrase to its meaning.",
    pairs: [
      { left: "La ilaha illa Allah", right: "No one is worthy of worship except Allah" },
      { left: "Muhammadur Rasul Allah", right: "Muhammad is the Messenger of Allah" }
    ],
    options: [
      "No one is worthy of worship except Allah",
      "Muhammad is the Messenger of Allah"
    ],
    correctAnswer: {
      "La ilaha illa Allah": "No one is worthy of worship except Allah",
      "Muhammadur Rasul Allah": "Muhammad is the Messenger of Allah"
    },
    explanationShort: "Both phrases make up the Shahadah.",
    explanationLong: "The testimony contains tawhid and acceptance of prophethood. Both guide belief and practice.",
    tags: ["foundation", "shahadah", "meaning"],
    reviewNext: "Living by both parts",
    whyThisMatters: "Learners should be able to recognize not just the words, but the meaning carried by each part."
  }),
  q({
    id: "shahadah_05",
    category: "shahadah",
    subtopic: "daily_impact",
    difficulty: 2,
    type: "multiple_choice",
    prompt: "Which shows the Shahadah in daily life?",
    options: [
      "Worship Allah, follow the Prophet",
      "Ignore what Allah revealed",
      "Only say it at events",
      "Do whatever feels easy"
    ],
    correctAnswer: "Worship Allah, follow the Prophet",
    explanationShort: "The Shahadah shows in how we worship and act.",
    explanationLong: "It is not only words. It shows in what a Muslim does.",
    misconceptionNotes: ["The Shahadah is not a cultural slogan. It changes how a Muslim lives."],
    tags: ["foundation", "shahadah", "application"],
    reviewNext: "Obedience after belief",
    whyThisMatters: "Real learning should move from memorizing words to understanding how those words direct life."
  }),
  q({
    id: "shahadah_06",
    category: "shahadah",
    subtopic: "exclusive_worship",
    difficulty: 2,
    type: "multi_select",
    prompt: "Which fit the Shahadah?",
    options: [
      "Praying to Allah alone",
      "Praying to saints",
      "Accepting the Prophet's teachings",
      "Ignoring what Allah revealed"
    ],
    correctAnswer: ["Praying to Allah alone", "Accepting the Prophet's teachings"],
    explanationShort: "Worship Allah alone and follow His Messenger.",
    explanationLong: "Tawhid means worship belongs to Allah alone, and the second half of the testimony means the Prophet's guidance is followed rather than ignored.",
    misconceptionNotes: ["A learner can sound correct on one half of the Shahadah while neglecting the other."],
    tags: ["foundation", "shahadah", "application"],
    reviewNext: "Exclusive worship and following revelation",
    whyThisMatters: "This trains the learner to separate correct belief from common but incorrect religious shortcuts."
  }),
  q({
    id: "shahadah_07",
    category: "shahadah",
    subtopic: "prophetic_guidance",
    difficulty: 3,
    type: "scenario_judgment",
    scenario: "A friend says, \"I believe in Allah, but I don't need to follow the Prophet.\"",
    prompt: "What is missing?",
    options: [
      "Following the Prophet",
      "Nothing is missing",
      "Only zakat",
      "Only hajj"
    ],
    correctAnswer: "Following the Prophet",
    explanationShort: "It leaves out the second half of the Shahadah.",
    explanationLong: "Belief in Allah alone is not enough if a person then rejects the Messenger sent with guidance. The testimony includes both truths together.",
    misconceptionNotes: ["Some learners think loving Allah is enough without caring about prophetic guidance."],
    tags: ["foundation", "shahadah", "messengership"],
    reviewNext: "Why messengership matters",
    whyThisMatters: "This helps the learner see that belief and guidance are connected, not separate lanes."
  }),
  q({
    id: "shahadah_08",
    category: "shahadah",
    subtopic: "best_response",
    difficulty: 3,
    type: "best_response",
    scenario: "A friend asks, \"Why should the Shahadah change my choices?\"",
    prompt: "Choose the best answer.",
    options: [
      "Now you live by Allah's guidance",
      "It only changes your name",
      "It only matters in the mosque",
      "Now you make your own rules"
    ],
    correctAnswer: "Now you live by Allah's guidance",
    explanationShort: "The Shahadah guides what you believe and do.",
    explanationLong: "Testifying to Allah and His Messenger means a Muslim now measures life by revelation rather than desire or social pressure.",
    tags: ["foundation", "shahadah", "application"],
    reviewNext: "Living by revelation",
    whyThisMatters: "A serious learning app should test whether the learner can explain belief in simple, living language."
  }),
  q({
    id: "shahadah_09",
    category: "shahadah",
    subtopic: "sincerity",
    difficulty: 3,
    type: "true_false",
    prompt: "The Shahadah counts if you say it but don't mean it.",
    options: ["True", "False"],
    correctAnswer: "False",
    explanationShort: "The Shahadah must come from the heart too.",
    explanationLong: "Words matter, but sincerity and acceptance matter too. The testimony is meant to be believed and lived, not performed empty of meaning.",
    misconceptionNotes: ["A learner may confuse pronouncing words with truly accepting what they mean."],
    tags: ["foundation", "shahadah", "sincerity"],
    reviewNext: "Sincerity in testimony",
    whyThisMatters: "This protects the learner from treating sacred words like decoration."
  }),
  q({
    id: "shahadah_10",
    category: "shahadah",
    subtopic: "social_pressure",
    difficulty: 4,
    type: "scenario_judgment",
    scenario: "A new Muslim is teased for not worshipping anyone but Allah.",
    prompt: "What should they do?",
    options: [
      "Keep worshipping only Allah",
      "Join in to fit in",
      "Pretend it doesn't matter",
      "Say all worship is the same"
    ],
    correctAnswer: "Keep worshipping only Allah",
    explanationShort: "Stay true to Allah, even when others push.",
    explanationLong: "Tawhid often demands courage. A believer should be wise and gentle, but they do not treat worship of Allah as negotiable.",
    tags: ["foundation", "shahadah", "courage"],
    reviewNext: "Steadiness in tawhid",
    whyThisMatters: "Understanding grows when the learner can carry belief into real pressure, not only easy definitions."
  }),
  q({
    id: "shahadah_11",
    category: "shahadah",
    subtopic: "error_correction",
    difficulty: 4,
    type: "identify_mistake",
    prompt: "What is wrong here? \"I said the Shahadah, so I can ignore the Prophet.\"",
    options: [
      "It drops following the Prophet",
      "Too serious about prayer",
      "Mixes up zakat and fasting",
      "Too much good character"
    ],
    correctAnswer: "It drops following the Prophet",
    explanationShort: "The Shahadah includes following the Prophet.",
    explanationLong: "The Shahadah includes accepting Muhammad as Allah's Messenger. Rejecting his guidance empties the second half of its meaning.",
    tags: ["foundation", "shahadah", "error_correction"],
    reviewNext: "Messengership and obedience",
    whyThisMatters: "Nuanced learning means catching the precise error, not just knowing the slogan."
  }),
  q({
    id: "shahadah_12",
    category: "shahadah",
    subtopic: "comparison",
    difficulty: 4,
    type: "multiple_choice",
    prompt: "Which fits the Shahadah best?",
    options: [
      "Worship Allah alone, the Prophet's way",
      "Worship can be shared",
      "Feeling spiritual is enough",
      "Belief only, no actions"
    ],
    correctAnswer: "Worship Allah alone, the Prophet's way",
    explanationShort: "Worship is for Allah alone, as the Prophet showed.",
    explanationLong: "The Shahadah teaches exclusive worship of Allah and acceptance of the Messenger who taught revelation in action.",
    tags: ["foundation", "shahadah", "comparison"],
    reviewNext: "Tawhid and Sunnah together",
    whyThisMatters: "This tests whether the learner can distinguish the strongest summary from statements that sound close but drift away from orthodoxy."
  }),
  q({
    id: "shahadah_13",
    category: "shahadah",
    subtopic: "sequence",
    difficulty: 5,
    type: "correct_order",
    prompt: "Put these Shahadah steps in order.",
    orderItems: ["Learn the meaning", "Believe it sincerely", "Say it truthfully", "Live by it"],
    correctAnswer: ["Learn the meaning", "Believe it sincerely", "Say it truthfully", "Live by it"],
    explanationShort: "Learn it, believe it, say it, then live it.",
    explanationLong: "Islamic basics become strong when a learner understands what they are saying, accepts it in the heart, speaks it truthfully, and then practices it.",
    tags: ["foundation", "shahadah", "sequence"],
    reviewNext: "Knowledge, belief, and action",
    whyThisMatters: "This protects against shallow trivia by asking the learner to recognize the shape of real faith development."
  }),
  q({
    id: "shahadah_14",
    category: "shahadah",
    subtopic: "nuance",
    difficulty: 5,
    type: "mini_case_study",
    scenario: "Person A loves Allah but rejects the Prophet. Person B loves the Prophet but prays to others too.",
    prompt: "What is true?",
    options: [
      "Both miss part of the Shahadah",
      "Both are fine",
      "Only A is wrong",
      "Only B is wrong"
    ],
    correctAnswer: "Both miss part of the Shahadah",
    explanationShort: "Each one breaks half of the Shahadah.",
    explanationLong: "Person A neglects the Messenger; Person B damages tawhid in worship. The Shahadah must be carried whole.",
    tags: ["foundation", "shahadah", "nuance"],
    reviewNext: "Protecting both halves of the testimony",
    whyThisMatters: "This is the kind of comparison that shows whether a learner actually understands the structure of the testimony."
  }),
  q({
    id: "shahadah_15",
    category: "shahadah",
    subtopic: "reflection",
    difficulty: 5,
    type: "reflection_prompt",
    prompt: "In one sentence, name a daily choice that the Shahadah should change.",
    acceptedAnswers: [],
    explanationShort: "Reflection helps move the Shahadah from memory into life.",
    explanationLong: "A serious student connects beliefs to choices: worship, honesty, prayer, and obedience all grow out of the testimony.",
    tags: ["foundation", "shahadah", "reflection"],
    reviewNext: "Daily obedience",
    whyThisMatters: "Reflection turns knowledge into self-accountability, which is part of real learning."
  })
];
const SALAH_QUESTIONS: FoundationQuestion[] = [
  q({
    id: "salah_01",
    category: "salah",
    subtopic: "daily_prayers",
    difficulty: 1,
    type: "multiple_choice",
    prompt: "How many daily prayers are required?",
    options: ["Five", "Three", "Six", "Two"],
    correctAnswer: "Five",
    explanationShort: "The five are Fajr, Dhuhr, Asr, Maghrib and Isha.",
    explanationLong: "Each prayer has its own time in the day.",
    tags: ["foundation", "salah", "daily_prayers"],
    reviewNext: "Prayer names and order",
    whyThisMatters: "Prayer sits at the center of Muslim daily life, so the learner must know the basic count immediately."
  }),
  q({
    id: "salah_02",
    category: "salah",
    subtopic: "pillar_order",
    difficulty: 1,
    type: "true_false",
    prompt: "Salah is the second pillar of Islam.",
    options: ["True", "False"],
    correctAnswer: "True",
    explanationShort: "Salah is the second pillar.",
    explanationLong: "After the Shahadah, prayer is the next great pillar that organizes worship throughout the day.",
    tags: ["foundation", "salah", "pillars"],
    reviewNext: "Importance of salah",
    whyThisMatters: "This shows the learner where salah sits in the structure of Islam."
  }),
  q({
    id: "salah_03",
    category: "salah",
    subtopic: "prayer_names",
    difficulty: 1,
    type: "multiple_choice",
    prompt: "Which prayer is at dawn?",
    options: ["Fajr", "Maghrib", "Isha", "Asr"],
    correctAnswer: "Fajr",
    explanationShort: "The word Fajr means dawn.",
    explanationLong: "Each of the five prayers has its own time. Fajr is prayed at dawn, before sunrise.",
    tags: ["foundation", "salah", "timing"],
    reviewNext: "Prayer names and times",
    whyThisMatters: "Recognizing the names of prayers is the first step toward organizing life around them."
  }),
  q({
    id: "salah_04",
    category: "salah",
    subtopic: "sequence",
    difficulty: 2,
    type: "correct_order",
    prompt: "Put the five daily prayers in order.",
    orderItems: ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"],
    correctAnswer: ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"],
    explanationShort: "The prayers follow a fixed daily order.",
    explanationLong: "A Muslim's day moves from Fajr to Isha. Knowing the order helps the learner place each prayer correctly.",
    tags: ["foundation", "salah", "sequence"],
    reviewNext: "General prayer timing",
    whyThisMatters: "This moves the learner from isolated facts to a daily framework."
  }),
  q({
    id: "salah_05",
    category: "salah",
    subtopic: "conditions",
    difficulty: 2,
    type: "multi_select",
    prompt: "What do you need before salah?",
    options: [
      "Having wudu",
      "The prayer time has started",
      "Facing the qiblah when able",
      "Chatting during prayer"
    ],
    correctAnswer: ["Having wudu", "The prayer time has started", "Facing the qiblah when able"],
    explanationShort: "Wudu, the right time and the qiblah come first.",
    explanationLong: "Purity, time, and direction all matter in salah. Casual speaking during the prayer itself does not belong to correct preparation or performance.",
    tags: ["foundation", "salah", "conditions"],
    reviewNext: "Conditions of prayer",
    whyThisMatters: "Good learning goes beyond counting prayers and into what makes prayer properly established."
  }),
  q({
    id: "salah_06",
    category: "salah",
    subtopic: "general_times",
    difficulty: 2,
    type: "multiple_choice",
    prompt: "Which prayer comes right after Maghrib?",
    options: ["Asr", "Isha", "Fajr", "Dhuhr"],
    correctAnswer: "Isha",
    explanationShort: "Isha is the night prayer.",
    explanationLong: "It is the last of the five daily prayers.",
    tags: ["foundation", "salah", "sequence"],
    reviewNext: "Daily prayer order",
    whyThisMatters: "This keeps the learner from memorizing names without understanding the daily flow."
  }),
  q({
    id: "salah_07",
    category: "salah",
    subtopic: "required_prep",
    difficulty: 3,
    type: "scenario_judgment",
    scenario: "It is prayer time, but Bilal has no wudu.",
    prompt: "What should he do first?",
    options: [
      "Make wudu, then pray",
      "Pray without wudu",
      "Skip the prayer",
      "Wait until the next day"
    ],
    correctAnswer: "Make wudu, then pray",
    explanationShort: "You need wudu before you pray.",
    explanationLong: "Prayer time matters, but purity matters too. A person should prepare properly and then pray without unnecessary delay.",
    tags: ["foundation", "salah", "preparation"],
    reviewNext: "Wudu before prayer",
    whyThisMatters: "Application questions check whether the learner can move from facts into real decisions."
  }),
  q({
    id: "salah_08",
    category: "salah",
    subtopic: "invalidators",
    difficulty: 3,
    type: "identify_mistake",
    prompt: "What spoils a prayer if done on purpose?",
    options: [
      "Chatting with someone",
      "Standing respectfully",
      "Reciting Quran",
      "Facing the qiblah"
    ],
    correctAnswer: "Chatting with someone",
    explanationShort: "Talking on purpose is not part of salah.",
    explanationLong: "Prayer is a distinct act of worship. Turning it into casual speech breaks the seriousness and form of the act.",
    tags: ["foundation", "salah", "invalidators"],
    reviewNext: "What breaks salah",
    whyThisMatters: "The learner needs to distinguish acts that belong in prayer from acts that undermine it."
  }),
  q({
    id: "salah_09",
    category: "salah",
    subtopic: "priority",
    difficulty: 3,
    type: "best_response",
    scenario: "A friend says, \"I'm busy, so I pray only when I feel like it.\"",
    prompt: "What is the best reply?",
    options: [
      "Plan your day around prayer",
      "Fine, if you mean well",
      "Prayer only matters on weekends",
      "Once a day is enough"
    ],
    correctAnswer: "Plan your day around prayer",
    explanationShort: "Prayer is a duty, not a spare-time hobby.",
    explanationLong: "The daily prayers train discipline and worship. A strong foundation means building the day with salah in mind.",
    tags: ["foundation", "salah", "priority"],
    reviewNext: "Importance of timely prayer",
    whyThisMatters: "This measures whether the learner sees prayer as central, not decorative."
  }),
  q({
    id: "salah_10",
    category: "salah",
    subtopic: "timeliness",
    difficulty: 3,
    type: "true_false",
    prompt: "A Muslim should try to pray on time.",
    options: ["True", "False"],
    correctAnswer: "True",
    explanationShort: "Allah gave each prayer its own time.",
    explanationLong: "The five prayers are not random moments.",
    tags: ["foundation", "salah", "timeliness"],
    reviewNext: "Respecting prayer times",
    whyThisMatters: "The goal is not trivia but a mindset that sees salah as a living obligation."
  }),
  q({
    id: "salah_11",
    category: "salah",
    subtopic: "case_study",
    difficulty: 4,
    type: "mini_case_study",
    scenario: "Person A makes wudu and prays on time. Person B keeps putting it off for games.",
    prompt: "Who is doing it right?",
    options: ["Person A", "Person B", "Both", "Neither"],
    correctAnswer: "Person A",
    explanationShort: "Person A gets ready and prays on time.",
    explanationLong: "Salah should not be put off for games.",
    tags: ["foundation", "salah", "application"],
    reviewNext: "Taking salah seriously",
    whyThisMatters: "This moves the learner into comparing real patterns of behavior."
  }),
  q({
    id: "salah_12",
    category: "salah",
    subtopic: "required_vs_extra",
    difficulty: 4,
    type: "multiple_choice",
    prompt: "Which is true about salah?",
    options: [
      "It is a daily duty",
      "It is optional",
      "It is only for Ramadan",
      "It is for older people"
    ],
    correctAnswer: "It is a daily duty",
    explanationShort: "Salah is a duty every day.",
    explanationLong: "Prayer is not age-based, mood-based, or season-based. It is a daily act of worship built into Muslim life.",
    tags: ["foundation", "salah", "worldview"],
    reviewNext: "The place of prayer in daily life",
    whyThisMatters: "This tests worldview, not just isolated details."
  }),
  q({
    id: "salah_13",
    category: "salah",
    subtopic: "scenario_reasoning",
    difficulty: 4,
    type: "scenario_judgment",
    scenario: "On a trip, Asr time is almost over.",
    prompt: "What should they do?",
    options: [
      "Find a clean place and pray",
      "Wait until the trip ends",
      "Stop praying while traveling",
      "Just intend, don't pray"
    ],
    correctAnswer: "Find a clean place and pray",
    explanationShort: "Pray in time, even on a trip.",
    explanationLong: "Travel can affect details, but it does not teach contempt for prayer. The believer tries to preserve the obligation as well as they can.",
    tags: ["foundation", "salah", "application"],
    reviewNext: "Protecting prayer in difficult moments",
    whyThisMatters: "Real understanding appears when life gets inconvenient."
  }),
  q({
    id: "salah_14",
    category: "salah",
    subtopic: "comparison",
    difficulty: 5,
    type: "identify_mistake",
    prompt: "Which is the big mistake?",
    options: [
      "I skip prayer when busy",
      "I check the time first",
      "I get ready calmly",
      "Prayer deserves respect"
    ],
    correctAnswer: "I skip prayer when busy",
    explanationShort: "Being busy does not make salah optional.",
    explanationLong: "Forgetting a detail can be corrected, but turning prayer into a casual optional act attacks the learner's whole framework of worship.",
    tags: ["foundation", "salah", "error_correction"],
    reviewNext: "Obligation and seriousness of salah",
    whyThisMatters: "This measures whether the learner can spot the most destructive mistake rather than a minor issue."
  }),
  q({
    id: "salah_15",
    category: "salah",
    subtopic: "reflection",
    difficulty: 5,
    type: "reflection_prompt",
    prompt: "Write one practical change that would help you guard salah more faithfully this week.",
    acceptedAnswers: [],
    explanationShort: "Planning for prayer is part of honoring it.",
    explanationLong: "Prayer grows strong when it is built into alarms, routines, travel plans, and daily priorities.",
    tags: ["foundation", "salah", "reflection"],
    reviewNext: "Guarding prayer daily",
    whyThisMatters: "Reflection turns understanding into habits, which is where serious learning begins to show."
  })
];
const TAHARAH_QUESTIONS: FoundationQuestion[] = [
  q({
    id: "taharah_01",
    category: "taharah",
    subtopic: "purpose",
    difficulty: 1,
    type: "multiple_choice",
    prompt: "Why is wudu important before salah?",
    options: [
      "It makes you pure for prayer",
      "It replaces the prayer",
      "It is only for Friday",
      "It is only for children"
    ],
    correctAnswer: "It makes you pure for prayer",
    explanationShort: "Wudu makes you pure for prayer.",
    explanationLong: "Prayer has conditions, and one of the first basics a learner must know is that purity matters before standing in salah.",
    tags: ["foundation", "taharah", "wudu"],
    reviewNext: "Conditions of prayer",
    whyThisMatters: "Purity is one of the first places where worship becomes embodied and careful."
  }),
  q({
    id: "taharah_02",
    category: "taharah",
    subtopic: "basic_parts",
    difficulty: 1,
    type: "multi_select",
    prompt: "Which body parts are washed in wudu?",
    options: ["Face", "Arms", "Feet", "Hair roots only"],
    correctAnswer: ["Face", "Arms", "Feet"],
    explanationShort: "Face, arms and feet are washed; the head is wiped.",
    explanationLong: "Wudu includes washing some body parts and wiping the head.",
    tags: ["foundation", "taharah", "parts"],
    reviewNext: "Wudu steps",
    whyThisMatters: "This gives the learner the framework needed before later error-correction questions."
  }),
  q({
    id: "taharah_03",
    category: "taharah",
    subtopic: "nullifiers",
    difficulty: 1,
    type: "multiple_choice",
    prompt: "Which of these clearly breaks wudu?",
    options: ["Passing wind", "Smiling", "Sitting quietly", "Reading Quran"],
    correctAnswer: "Passing wind",
    explanationShort: "Passing wind breaks wudu; smiling does not.",
    explanationLong: "Some things break wudu, so you make it again.",
    tags: ["foundation", "taharah", "nullifiers"],
    reviewNext: "Common nullifiers of wudu",
    whyThisMatters: "Without knowing nullifiers, a learner cannot protect prayer with confidence."
  }),
  q({
    id: "taharah_04",
    category: "taharah",
    subtopic: "sequence",
    difficulty: 2,
    type: "correct_order",
    prompt: "Put the wudu steps in order.",
    orderItems: ["Wash face", "Wash arms", "Wipe head", "Wash feet"],
    correctAnswer: ["Wash face", "Wash arms", "Wipe head", "Wash feet"],
    explanationShort: "The Quran names them in this order.",
    explanationLong: "First the face, then arms, head and feet.",
    tags: ["foundation", "taharah", "sequence"],
    reviewNext: "Ordered wudu steps",
    whyThisMatters: "This checks whether the learner can move beyond recognition into process."
  }),
  q({
    id: "taharah_05",
    category: "taharah",
    subtopic: "fard_vs_extra",
    difficulty: 2,
    type: "multiple_choice",
    prompt: "Which is sunnah, not required, in wudu?",
    options: ["Using the siwak first", "Washing the face", "Wiping the head", "Washing the feet"],
    correctAnswer: "Using the siwak first",
    explanationShort: "Siwak is sunnah; the others are required.",
    explanationLong: "A learner should begin to distinguish between essential acts and extra beautifying acts of worship.",
    tags: ["foundation", "taharah", "recommended"],
    reviewNext: "Required and recommended acts",
    whyThisMatters: "This prevents confusion between what makes worship valid and what makes it more complete."
  }),
  q({
    id: "taharah_06",
    category: "taharah",
    subtopic: "match",
    difficulty: 2,
    type: "match_pairs",
    prompt: "Match each wudu step.",
    pairs: [
      { left: "Wash face", right: "The whole face" },
      { left: "Wash arms", right: "Up to the elbows" },
      { left: "Wipe head", right: "Wiped, not washed" },
      { left: "Wash feet", right: "Up to the ankles" }
    ],
    options: [
      "The whole face",
      "Up to the elbows",
      "Wiped, not washed",
      "Up to the ankles"
    ],
    correctAnswer: {
      "Wash face": "The whole face",
      "Wash arms": "Up to the elbows",
      "Wipe head": "Wiped, not washed",
      "Wash feet": "Up to the ankles"
    },
    explanationShort: "Each step has its own limit.",
    explanationLong: "Purity becomes careless when the learner knows names but not what those names actually require on the body.",
    tags: ["foundation", "taharah", "parts"],
    reviewNext: "The exact body targets in wudu",
    whyThisMatters: "This tests precision without turning the topic into shallow memorization."
  }),
  q({
    id: "taharah_07",
    category: "taharah",
    subtopic: "deep_sleep",
    difficulty: 3,
    type: "scenario_judgment",
    scenario: "Someone wakes from a deep sleep at prayer time.",
    prompt: "What should they do?",
    options: [
      "Make wudu again",
      "Keep the old wudu",
      "Skip the prayer",
      "Just wash the hands"
    ],
    correctAnswer: "Make wudu again",
    explanationShort: "Deep sleep is a reason to make wudu again.",
    explanationLong: "A deep loss of awareness is treated as a state that calls for renewing wudu before salah.",
    tags: ["foundation", "taharah", "nullifiers"],
    reviewNext: "What breaks wudu",
    whyThisMatters: "This asks the learner to apply basics to a real situation."
  }),
  q({
    id: "taharah_08",
    category: "taharah",
    subtopic: "certainty",
    difficulty: 3,
    type: "best_response",
    scenario: "Someone wonders if their wudu broke, but there is no sign it did.",
    prompt: "What is the best reply?",
    options: [
      "A doubt does not break wudu",
      "Every doubt breaks wudu",
      "Stop praying until someone checks",
      "Forget about wudu"
    ],
    correctAnswer: "A doubt does not break wudu",
    explanationShort: "A doubt does not cancel what you are sure of.",
    explanationLong: "Islamic learning becomes calmer when learners know not to let every whisper overturn a certain state.",
    tags: ["foundation", "taharah", "certainty"],
    reviewNext: "Certainty and doubt in purity",
    whyThisMatters: "This protects the learner from anxiety and scrupulosity."
  }),
  q({
    id: "taharah_09",
    category: "taharah",
    subtopic: "impurity_on_clothes",
    difficulty: 3,
    type: "scenario_judgment",
    scenario: "Someone sees something impure on their clothes before salah.",
    prompt: "What should they do?",
    options: [
      "Clean it, then pray",
      "Ignore it",
      "Talk about it, do nothing",
      "Clothes do not matter"
    ],
    correctAnswer: "Clean it, then pray",
    explanationShort: "Keep body, clothes and place clean when you can.",
    explanationLong: "Taharah is not only about wudu. The learner should begin to think about clean clothing and a clean place for prayer too.",
    tags: ["foundation", "taharah", "cleanliness"],
    reviewNext: "Clean body, clothes, and place",
    whyThisMatters: "This widens the learner's understanding of purity beyond one ritual sequence."
  }),
  q({
    id: "taharah_10",
    category: "taharah",
    subtopic: "error_correction",
    difficulty: 4,
    type: "identify_mistake",
    prompt: "Someone washes face and arms, wipes the head, then stops. What went wrong?",
    options: [
      "They forgot the feet",
      "Too much water",
      "They stood up",
      "Face came first"
    ],
    correctAnswer: "They forgot the feet",
    explanationShort: "Wudu needs every required step.",
    explanationLong: "At harder levels the learner should catch omissions, not only recite the steps.",
    tags: ["foundation", "taharah", "mistakes"],
    reviewNext: "Required acts in wudu",
    whyThisMatters: "This is the kind of precise correction that real worship depends on."
  }),
  q({
    id: "taharah_11",
    category: "taharah",
    subtopic: "mistake_detection",
    difficulty: 4,
    type: "multiple_choice",
    prompt: "What is taharah?",
    options: [
      "Wudu and being clean for prayer",
      "Washing hands quickly",
      "Optional, not for prayer",
      "Only after prayer"
    ],
    correctAnswer: "Wudu and being clean for prayer",
    explanationShort: "Taharah means purity, like wudu.",
    explanationLong: "Purity includes ritual preparation and broader cleanliness connected to worship.",
    tags: ["foundation", "taharah", "overview"],
    reviewNext: "Broad meaning of taharah",
    whyThisMatters: "Learners need a big-picture map, not only isolated details."
  }),
  q({
    id: "taharah_12",
    category: "taharah",
    subtopic: "comparison",
    difficulty: 4,
    type: "mini_case_study",
    scenario: "Person A makes sure water reaches each part. Person B splashes and rushes.",
    prompt: "Who does wudu better?",
    options: ["Person A", "Person B", "Both equally", "Neither"],
    correctAnswer: "Person A",
    explanationShort: "Care matters in wudu.",
    explanationLong: "Ritual acts are not meant to be empty motions. A learner grows when they understand that required parts must actually be reached and not guessed at.",
    tags: ["foundation", "taharah", "carefulness"],
    reviewNext: "Completing wudu carefully",
    whyThisMatters: "This question tests quality of practice, not just labels."
  }),
  q({
    id: "taharah_13",
    category: "taharah",
    subtopic: "nullifier_reasoning",
    difficulty: 5,
    type: "multi_select",
    prompt: "When do you need new wudu?",
    options: [
      "Using the bathroom",
      "Passing wind",
      "Deep sleep",
      "Smiling at a friend"
    ],
    correctAnswer: ["Using the bathroom", "Passing wind", "Deep sleep"],
    explanationShort: "These break wudu; smiling does not.",
    explanationLong: "The stronger learner should be able to group cases by principle and not treat unrelated actions as nullifiers.",
    tags: ["foundation", "taharah", "nullifiers"],
    reviewNext: "Recognizing groups of nullifiers",
    whyThisMatters: "This checks pattern recognition instead of one isolated fact."
  }),
  q({
    id: "taharah_14",
    category: "taharah",
    subtopic: "nuanced_comparison",
    difficulty: 5,
    type: "identify_mistake",
    prompt: "Which is the big mistake?",
    options: [
      "Purity does not matter",
      "I will learn wudu better",
      "I forget what breaks wudu",
      "I check my clothes first"
    ],
    correctAnswer: "Purity does not matter",
    explanationShort: "Purity matters for prayer.",
    explanationLong: "Needing more practice is normal. Denying the importance of purity itself is the deeper mistake.",
    tags: ["foundation", "taharah", "worldview"],
    reviewNext: "Why purity matters",
    whyThisMatters: "This tests hierarchy: can the learner spot the most serious misunderstanding?"
  }),
  q({
    id: "taharah_15",
    category: "taharah",
    subtopic: "reflection",
    difficulty: 5,
    type: "reflection_prompt",
    prompt: "Name one purity habit you want to strengthen before salah.",
    acceptedAnswers: [],
    explanationShort: "Reflection helps move taharah into routine.",
    explanationLong: "Purity becomes strong through repeated care: checking wudu, clothing, and prayer space before salah begins.",
    tags: ["foundation", "taharah", "reflection"],
    reviewNext: "Daily purity routine",
    whyThisMatters: "Serious learning should end in better worship habits, not only correct taps."
  })
];
const FASTING_QUESTIONS: FoundationQuestion[] = [
  q({
    id: "fasting_01",
    category: "fasting",
    subtopic: "ramadan",
    difficulty: 1,
    type: "multiple_choice",
    prompt: "Which month do Muslims fast?",
    options: ["Ramadan", "Muharram", "Shawwal", "Safar"],
    correctAnswer: "Ramadan",
    explanationShort: "Ramadan is the month Allah made fasting a duty.",
    explanationLong: "Adults who are able fast from dawn to sunset.",
    tags: ["foundation", "fasting", "ramadan"],
    reviewNext: "Basics of Ramadan fasting",
    whyThisMatters: "This is the first landmark fact in the fasting unit."
  }),
  q({
    id: "fasting_02",
    category: "fasting",
    subtopic: "time_window",
    difficulty: 1,
    type: "true_false",
    prompt: "The daily fast lasts from dawn until sunset.",
    options: ["True", "False"],
    correctAnswer: "True",
    explanationShort: "That is the daily fasting window.",
    explanationLong: "A Muslim begins the fast at dawn and breaks it at sunset, which shapes the day around worship and discipline.",
    tags: ["foundation", "fasting", "time"],
    reviewNext: "Start and end of the fast",
    whyThisMatters: "This gives the learner the structure before later scenario questions."
  }),
  q({
    id: "fasting_03",
    category: "fasting",
    subtopic: "purpose",
    difficulty: 1,
    type: "multiple_choice",
    prompt: "Why do Muslims fast?",
    options: ["Growing in taqwa", "Avoiding all work", "Skipping prayer", "Showing off self-control"],
    correctAnswer: "Growing in taqwa",
    explanationShort: "Fasting helps us grow in taqwa.",
    explanationLong: "Fasting trains restraint, obedience, and awareness of Allah, not hunger for its own sake.",
    tags: ["foundation", "fasting", "purpose"],
    reviewNext: "Why fasting was prescribed",
    whyThisMatters: "The app should push beyond mechanics into why worship matters."
  }),
  q({
    id: "fasting_04",
    category: "fasting",
    subtopic: "invalidators",
    difficulty: 2,
    type: "multiple_choice",
    prompt: "What breaks the fast if done on purpose?",
    options: ["Eating or drinking", "Reading Quran", "Making dhikr", "Giving charity"],
    correctAnswer: "Eating or drinking",
    explanationShort: "Intentional eating or drinking breaks the fast.",
    explanationLong: "The fast is a conscious act of restraint from dawn to sunset. Intentionally eating or drinking cancels that restraint.",
    tags: ["foundation", "fasting", "invalidators"],
    reviewNext: "What breaks a fast",
    whyThisMatters: "A learner needs to know the core boundaries of the fast."
  }),
  q({
    id: "fasting_05",
    category: "fasting",
    subtopic: "iftar",
    difficulty: 2,
    type: "fill_in_blank",
    prompt: "The sunset meal that ends the fast is ____.",
    options: ["Suhur", "Eid", "Iftar", "Lunch"],
    acceptedAnswers: ["iftar"],
    correctAnswer: "Iftar",
    explanationShort: "Iftar means breaking the fast.",
    explanationLong: "The fast ends at sunset. Then Muslims eat the iftar meal.",
    tags: ["foundation", "fasting", "iftar"],
    reviewNext: "Basic fasting vocabulary",
    whyThisMatters: "Even vocabulary should connect to meaning and daily practice."
  }),
  q({
    id: "fasting_06",
    category: "fasting",
    subtopic: "exemptions",
    difficulty: 2,
    type: "multi_select",
    prompt: "Who may miss a fast for a real reason?",
    options: [
      "A sick person",
      "A traveler",
      "A menstruating woman",
      "A healthy person not in the mood"
    ],
    correctAnswer: ["A sick person", "A traveler", "A menstruating woman"],
    explanationShort: "Islam makes it easier for real reasons.",
    explanationLong: "Fasting is an obligation, but it is not blind to hardship. Valid excuses are not the same as simple laziness.",
    tags: ["foundation", "fasting", "exemptions"],
    reviewNext: "Valid excuses in fasting",
    whyThisMatters: "This introduces mercy and structure together, which is central to Islamic law."
  }),
  q({
    id: "fasting_07",
    category: "fasting",
    subtopic: "forgetfulness",
    difficulty: 3,
    type: "scenario_judgment",
    scenario: "Someone forgets they are fasting and eats a bite.",
    prompt: "What should they do?",
    options: [
      "Keep fasting",
      "Stop fasting for the day",
      "Fasting does not matter now",
      "Stop praying too"
    ],
    correctAnswer: "Keep fasting",
    explanationShort: "Eating by mistake does not break the fast.",
    explanationLong: "The key distinction here is between forgetfulness and deliberate action. The learner should begin to notice intention and awareness.",
    tags: ["foundation", "fasting", "forgetfulness"],
    reviewNext: "Intentional and unintentional acts",
    whyThisMatters: "This helps the learner apply rules with balance instead of panic."
  }),
  q({
    id: "fasting_08",
    category: "fasting",
    subtopic: "tongue",
    difficulty: 3,
    type: "best_response",
    scenario: "Someone insults a fasting student.",
    prompt: "What is best?",
    options: [
      "Stay calm, remember the fast",
      "Insult them back worse",
      "Break the fast in anger",
      "Use fasting as an excuse to be rude"
    ],
    correctAnswer: "Stay calm, remember the fast",
    explanationShort: "Fasting trains more than the stomach.",
    explanationLong: "The fast is also about guarding speech, anger, and behavior. Internal adab is part of the lesson of Ramadan.",
    tags: ["foundation", "fasting", "character"],
    reviewNext: "Character while fasting",
    whyThisMatters: "This pushes the learner past trivia into ethical application."
  }),
  q({
    id: "fasting_09",
    category: "fasting",
    subtopic: "error_correction",
    difficulty: 3,
    type: "identify_mistake",
    prompt: "Which one is wrong?",
    options: [
      "If I do not eat, lying is fine",
      "Fasting helps me guard my tongue",
      "Fasting builds taqwa",
      "Fasting teaches inside and out"
    ],
    correctAnswer: "If I do not eat, lying is fine",
    explanationShort: "Fasting means guarding the tongue too.",
    explanationLong: "The fast is not merely physical deprivation. It is meant to train the whole self, including speech and conduct.",
    tags: ["foundation", "fasting", "error_correction"],
    reviewNext: "Inward goals of fasting",
    whyThisMatters: "A serious learning system must expose shallow understandings like this."
  }),
  q({
    id: "fasting_10",
    category: "fasting",
    subtopic: "sequence",
    difficulty: 4,
    type: "correct_order",
    prompt: "Put the fasting day in order.",
    orderItems: ["Intend the fast", "Start at dawn", "Guard it all day", "Break it at sunset"],
    correctAnswer: ["Intend the fast", "Start at dawn", "Guard it all day", "Break it at sunset"],
    explanationShort: "Intend, start at dawn, end at sunset.",
    explanationLong: "A stronger learner should see fasting as a structured worship sequence rather than random hunger.",
    tags: ["foundation", "fasting", "sequence"],
    reviewNext: "The daily shape of fasting",
    whyThisMatters: "This takes the learner from isolated facts into a coherent practice."
  }),
  q({
    id: "fasting_11",
    category: "fasting",
    subtopic: "case_study",
    difficulty: 4,
    type: "mini_case_study",
    scenario: "Person A skips food but lies all day. Person B fasts and guards the tongue.",
    prompt: "Who fasts the right way?",
    options: ["Person B", "Person A", "Both equally", "Neither"],
    correctAnswer: "Person B",
    explanationShort: "Fasting is more than being hungry.",
    explanationLong: "The better fast is the one that shapes speech, character, and awareness of Allah, even when the person still needs repentance and growth.",
    tags: ["foundation", "fasting", "purpose"],
    reviewNext: "Outer and inner fasting",
    whyThisMatters: "This is exactly the kind of non-trivia judgment that deepens learning."
  }),
  q({
    id: "fasting_12",
    category: "fasting",
    subtopic: "nuance",
    difficulty: 4,
    type: "multiple_choice",
    prompt: "Which is true about fasting?",
    options: [
      "It trains body and heart",
      "It is a diet",
      "It replaces good manners",
      "It counts only if easy"
    ],
    correctAnswer: "It trains body and heart",
    explanationShort: "Fasting teaches patience, and it is worship, not a diet.",
    explanationLong: "It trains the body and the heart.",
    tags: ["foundation", "fasting", "purpose"],
    reviewNext: "What fasting is really for",
    whyThisMatters: "This checks whether the learner can distinguish sacred purpose from a worldly imitation."
  }),
  q({
    id: "fasting_13",
    category: "fasting",
    subtopic: "social_situation",
    difficulty: 5,
    type: "best_response",
    scenario: "Friends push a fasting Muslim to 'just take one sip'.",
    prompt: "What is the best reply?",
    options: [
      "Say no kindly and keep fasting",
      "Drink so it is not awkward",
      "Say fasting is just a symbol",
      "Mock them back"
    ],
    correctAnswer: "Say no kindly and keep fasting",
    explanationShort: "You can be firm and kind.",
    explanationLong: "A mature believer preserves worship without arrogance, and responds with dignity rather than surrender or rudeness.",
    tags: ["foundation", "fasting", "social_pressure"],
    reviewNext: "Steadiness while fasting",
    whyThisMatters: "Higher-level questions test conviction under pressure, not just recall."
  }),
  q({
    id: "fasting_14",
    category: "fasting",
    subtopic: "comparison",
    difficulty: 5,
    type: "identify_mistake",
    prompt: "Which is the big mistake?",
    options: [
      "Fasting is only about food",
      "I mix up suhur and iftar times",
      "I am learning who may skip",
      "I will guard my tongue more"
    ],
    correctAnswer: "Fasting is only about food",
    explanationShort: "Fasting builds good character too.",
    explanationLong: "Needing more details is normal. Reducing fasting to hunger alone is a deeper failure of understanding.",
    tags: ["foundation", "fasting", "comparison"],
    reviewNext: "Inner meaning of fasting",
    whyThisMatters: "The learner should be able to rank misunderstandings, not just spot them."
  }),
  q({
    id: "fasting_15",
    category: "fasting",
    subtopic: "reflection",
    difficulty: 5,
    type: "reflection_prompt",
    prompt: "Name one non-food habit you want to guard better in your next fast.",
    acceptedAnswers: [],
    explanationShort: "Fasting reaches speech, anger, and attention too.",
    explanationLong: "The stronger learner begins to ask not only 'What do I stop eating?' but also 'What do I stop saying, watching, and doing?'",
    tags: ["foundation", "fasting", "reflection"],
    reviewNext: "Character in fasting",
    whyThisMatters: "Reflection helps the learner turn theory into self-training."
  })
];
const ZAKAT_QUESTIONS: FoundationQuestion[] = [
  q({
    id: "zakat_01",
    category: "zakat",
    subtopic: "definition",
    difficulty: 1,
    type: "multiple_choice",
    prompt: "What is zakat?",
    options: [
      "A required share of wealth",
      "A kind feeling",
      "Instead of prayer",
      "A trip to Makkah"
    ],
    correctAnswer: "A required share of wealth",
    explanationShort: "Zakat is required, not just extra kindness.",
    explanationLong: "Zakat is a duty tied to wealth conditions. It is different from voluntary charity, even though both are good.",
    tags: ["foundation", "zakat", "definition"],
    reviewNext: "Difference between zakat and sadaqah",
    whyThisMatters: "The learner must first separate obligation from general generosity."
  }),
  q({
    id: "zakat_02",
    category: "zakat",
    subtopic: "pillar",
    difficulty: 1,
    type: "true_false",
    prompt: "Zakat is one of the five pillars of Islam.",
    options: ["True", "False"],
    correctAnswer: "True",
    explanationShort: "Zakat is a pillar of Islam.",
    explanationLong: "It stands beside the other pillars as part of the basic structure of Muslim life and worship.",
    tags: ["foundation", "zakat", "pillars"],
    reviewNext: "The place of zakat in Islam",
    whyThisMatters: "This keeps the learner from thinking of zakat as a side topic."
  }),
  q({
    id: "zakat_03",
    category: "zakat",
    subtopic: "who_pays",
    difficulty: 1,
    type: "multiple_choice",
    prompt: "Who pays zakat?",
    options: [
      "A Muslim with enough wealth",
      "Everyone, rich or poor",
      "Only scholars",
      "Only travelers"
    ],
    correctAnswer: "A Muslim with enough wealth",
    explanationShort: "Zakat is due once wealth reaches a set amount.",
    explanationLong: "Zakat is not demanded from someone who does not have the wealth conditions that make it due.",
    tags: ["foundation", "zakat", "obligation"],
    reviewNext: "When zakat becomes due",
    whyThisMatters: "This introduces structure and fairness in the law."
  }),
  q({
    id: "zakat_04",
    category: "zakat",
    subtopic: "nisab",
    difficulty: 2,
    type: "multiple_choice",
    prompt: "What is nisab?",
    options: [
      "The amount that makes zakat due",
      "The month of Ramadan",
      "A way to break the fast",
      "The prayer direction"
    ],
    correctAnswer: "The amount that makes zakat due",
    explanationShort: "Nisab is the least wealth that makes zakat due.",
    explanationLong: "Learners should know the concept even if they have not memorized every detailed modern calculation yet.",
    tags: ["foundation", "zakat", "nisab"],
    reviewNext: "Qualifying wealth",
    whyThisMatters: "This builds a real legal concept instead of vague charity language."
  }),
  q({
    id: "zakat_05",
    category: "zakat",
    subtopic: "recipients",
    difficulty: 2,
    type: "multiple_choice",
    prompt: "Who can receive zakat?",
    options: [
      "A poor person in need",
      "A rich person",
      "A famous millionaire",
      "A luxury watch collector"
    ],
    correctAnswer: "A poor person in need",
    explanationShort: "Zakat goes to people in need, like the poor.",
    explanationLong: "Zakat is directed to eligible groups named by revelation, and the poor and needy are among the most obvious examples.",
    tags: ["foundation", "zakat", "recipients"],
    reviewNext: "The eligible groups for zakat",
    whyThisMatters: "This moves the learner from abstract definition into lawful distribution."
  }),
  q({
    id: "zakat_06",
    category: "zakat",
    subtopic: "recipient_groups",
    difficulty: 2,
    type: "multi_select",
    prompt: "Who may receive zakat?",
    options: [
      "A poor family",
      "Someone stuck in debt",
      "A stranded traveler",
      "A rich celebrity"
    ],
    correctAnswer: ["A poor family", "Someone stuck in debt", "A stranded traveler"],
    explanationShort: "Zakat goes to people in need, not the rich.",
    explanationLong: "The learner should start recognizing the lawful categories and not treat zakat like random gifting.",
    tags: ["foundation", "zakat", "recipients"],
    reviewNext: "Eligible recipients",
    whyThisMatters: "This is where legal understanding starts becoming practical."
  }),
  q({
    id: "zakat_07",
    category: "zakat",
    subtopic: "zakat_vs_sadaqah",
    difficulty: 3,
    type: "match_pairs",
    prompt: "Match each word.",
    pairs: [
      { left: "Zakat", right: "Required giving" },
      { left: "Sadaqah", right: "Extra charity you choose" }
    ],
    options: [
      "Required giving",
      "Extra charity you choose"
    ],
    correctAnswer: {
      Zakat: "Required giving",
      Sadaqah: "Extra charity you choose"
    },
    explanationShort: "Zakat is a duty; sadaqah is extra giving.",
    explanationLong: "A maturing learner should know the difference between a fixed duty and extra generosity.",
    tags: ["foundation", "zakat", "comparison"],
    reviewNext: "Obligation and voluntary charity",
    whyThisMatters: "This prevents the common mistake of using one concept to erase the other."
  }),
  q({
    id: "zakat_08",
    category: "zakat",
    subtopic: "wealth_types",
    difficulty: 3,
    type: "multi_select",
    prompt: "Which count for zakat?",
    options: ["Cash savings", "Gold or silver", "Trade goods", "A family recipe"],
    correctAnswer: ["Cash savings", "Gold or silver", "Trade goods"],
    explanationShort: "Savings, gold, silver and trade goods count.",
    explanationLong: "At this level the learner begins to think about categories of wealth, not just the word 'money' in a vague sense.",
    tags: ["foundation", "zakat", "wealth"],
    reviewNext: "Types of qualifying wealth",
    whyThisMatters: "This deepens understanding of what zakat is attached to."
  }),
  q({
    id: "zakat_09",
    category: "zakat",
    subtopic: "error_correction",
    difficulty: 3,
    type: "identify_mistake",
    prompt: "Which one is wrong?",
    options: [
      "Zakat is only if I feel like it",
      "Zakat is a pillar with rules",
      "Voluntary charity is also good",
      "Who receives it matters"
    ],
    correctAnswer: "Zakat is only if I feel like it",
    explanationShort: "Zakat is a duty, not a mood.",
    explanationLong: "Zakat is not reduced to personal generosity. It is a structured duty when its conditions are met.",
    tags: ["foundation", "zakat", "error_correction"],
    reviewNext: "Obligatory nature of zakat",
    whyThisMatters: "This question trains the learner to catch worldview errors, not just calculation terms."
  }),
  q({
    id: "zakat_10",
    category: "zakat",
    subtopic: "case_study",
    difficulty: 4,
    type: "mini_case_study",
    scenario: "Person A has had enough wealth for a year. Person B is in need.",
    prompt: "Who must pay zakat?",
    options: ["Person A", "Person B", "Both", "Neither"],
    correctAnswer: "Person A",
    explanationShort: "Zakat is due on enough wealth held for a year.",
    explanationLong: "This case asks the learner to apply both the idea of qualifying wealth and the difference between giver and eligible recipient.",
    tags: ["foundation", "zakat", "application"],
    reviewNext: "Who pays and who receives",
    whyThisMatters: "Real learning means using principles to sort real cases."
  }),
  q({
    id: "zakat_11",
    category: "zakat",
    subtopic: "best_response",
    difficulty: 4,
    type: "best_response",
    scenario: "A friend asks, \"I give charity. Do I still need zakat later?\"",
    prompt: "What is the best answer?",
    options: [
      "Yes, charity does not replace zakat",
      "No, all charity is the same",
      "No, wealth changes nothing",
      "Yes, if people are watching"
    ],
    correctAnswer: "Yes, charity does not replace zakat",
    explanationShort: "Extra charity does not replace zakat.",
    explanationLong: "The mature learner should keep legal categories distinct: extra voluntary charity is excellent, but it does not erase a pillar when its conditions are met.",
    tags: ["foundation", "zakat", "comparison"],
    reviewNext: "Zakat and sadaqah are not identical",
    whyThisMatters: "This tests whether the learner can explain the law clearly to someone else."
  }),
  q({
    id: "zakat_12",
    category: "zakat",
    subtopic: "recipient_judgment",
    difficulty: 4,
    type: "scenario_judgment",
    scenario: "A poor neighbor needs food. A rich friend wants a fancy trip.",
    prompt: "Who should get the zakat?",
    options: [
      "The poor neighbor",
      "The wealthy friend",
      "Both are the same",
      "Neither"
    ],
    correctAnswer: "The poor neighbor",
    explanationShort: "Zakat is for real need, not luxuries.",
    explanationLong: "Application questions should train the learner to distinguish real need from comfort or status spending.",
    tags: ["foundation", "zakat", "recipients"],
    reviewNext: "Recognizing need",
    whyThisMatters: "This is how legal knowledge protects the right people."
  }),
  q({
    id: "zakat_13",
    category: "zakat",
    subtopic: "wealth_purification",
    difficulty: 5,
    type: "multiple_choice",
    prompt: "What does zakat do?",
    options: [
      "Purifies wealth and helps those in need",
      "It is just a tip",
      "Makes you look good",
      "Buys fancy gifts"
    ],
    correctAnswer: "Purifies wealth and helps those in need",
    explanationShort: "Zakat is worship that cares for others.",
    explanationLong: "A strong learner sees zakat as more than money movement. It is obedience to Allah with a clear social purpose.",
    tags: ["foundation", "zakat", "purpose"],
    reviewNext: "Meaning of zakat",
    whyThisMatters: "This pushes beyond mechanics into the wisdom and function of the pillar."
  }),
  q({
    id: "zakat_14",
    category: "zakat",
    subtopic: "nuanced_comparison",
    difficulty: 5,
    type: "identify_mistake",
    prompt: "Which is the big mistake?",
    options: [
      "Zakat is not a real duty",
      "I need help with nisab",
      "I will review who gets zakat",
      "I mix up zakat and sadaqah"
    ],
    correctAnswer: "Zakat is not a real duty",
    explanationShort: "Zakat is a pillar of Islam.",
    explanationLong: "Needing review is normal. Denying that zakat is an obligation is a more serious failure of understanding.",
    tags: ["foundation", "zakat", "comparison"],
    reviewNext: "The obligatory status of zakat",
    whyThisMatters: "This tests whether the learner can rank the seriousness of mistakes."
  }),
  q({
    id: "zakat_15",
    category: "zakat",
    subtopic: "reflection",
    difficulty: 5,
    type: "reflection_prompt",
    prompt: "Write one sentence on how zakat differs from just 'being nice with money.'",
    acceptedAnswers: [],
    explanationShort: "Zakat is structured worship, not vague generosity.",
    explanationLong: "Reflection can help the learner say clearly what makes zakat a pillar with rules and purpose.",
    tags: ["foundation", "zakat", "reflection"],
    reviewNext: "Difference between duty and generosity",
    whyThisMatters: "Being able to explain the difference is a good sign of real understanding."
  })
];
const HAJJ_QUESTIONS: FoundationQuestion[] = [
  q({
    id: "hajj_01",
    category: "hajj",
    subtopic: "obligation",
    difficulty: 1,
    type: "multiple_choice",
    prompt: "How often must an able Muslim do hajj?",
    options: ["Once in a lifetime", "Every year", "Every month", "Never"],
    correctAnswer: "Once in a lifetime",
    explanationShort: "Hajj is a must once; more times are extra.",
    explanationLong: "It is not every year. It is due when a Muslim is able.",
    tags: ["foundation", "hajj", "obligation"],
    reviewNext: "Ability and obligation in hajj",
    whyThisMatters: "This prevents the learner from confusing reverence for hajj with false burdens."
  }),
  q({
    id: "hajj_02",
    category: "hajj",
    subtopic: "month",
    difficulty: 1,
    type: "multiple_choice",
    prompt: "Hajj is performed in which Islamic month?",
    options: ["Dhul-Hijjah", "Ramadan", "Rabi al-Awwal", "Rajab"],
    correctAnswer: "Dhul-Hijjah",
    explanationShort: "Hajj is linked to Dhul-Hijjah.",
    explanationLong: "The rites of hajj are tied to a specific sacred time in the Islamic calendar.",
    tags: ["foundation", "hajj", "time"],
    reviewNext: "Days and season of hajj",
    whyThisMatters: "The learner should know that hajj is not a floating ritual that can be placed anywhere."
  }),
  q({
    id: "hajj_03",
    category: "hajj",
    subtopic: "ability",
    difficulty: 1,
    type: "true_false",
    prompt: "Hajj is only obligatory on the Muslim who is able.",
    options: ["True", "False"],
    correctAnswer: "True",
    explanationShort: "Hajj needs good health and enough money to go.",
    explanationLong: "Allah does not ask it of those who cannot go.",
    tags: ["foundation", "hajj", "ability"],
    reviewNext: "What ability means in hajj",
    whyThisMatters: "This introduces mercy and realism into the pillar."
  }),
  q({
    id: "hajj_04",
    category: "hajj",
    subtopic: "ihram",
    difficulty: 2,
    type: "fill_in_blank",
    prompt: "The pilgrim's sacred state is called ____.",
    options: ["Tawaf", "Umrah", "Arafah", "Ihram"],
    acceptedAnswers: ["ihram"],
    correctAnswer: "Ihram",
    explanationShort: "In ihram, some things are not allowed, like perfume.",
    explanationLong: "Pilgrims enter it with the intention for hajj or umrah.",
    tags: ["foundation", "hajj", "ihram"],
    reviewNext: "What ihram teaches",
    whyThisMatters: "A learner should know the key vocabulary that frames the rites."
  }),
  q({
    id: "hajj_05",
    category: "hajj",
    subtopic: "sites",
    difficulty: 2,
    type: "match_pairs",
    prompt: "Match each hajj place.",
    pairs: [
      { left: "Arafah", right: "The day of standing" },
      { left: "Makkah", right: "The Ka'bah is there" },
      { left: "Mina", right: "The tent city of pilgrims" },
      { left: "Muzdalifah", right: "The night stop after Arafah" }
    ],
    options: [
      "The day of standing",
      "The Ka'bah is there",
      "The tent city of pilgrims",
      "The night stop after Arafah"
    ],
    correctAnswer: {
      Arafah: "The day of standing",
      Makkah: "The Ka'bah is there",
      Mina: "The tent city of pilgrims",
      Muzdalifah: "The night stop after Arafah"
    },
    explanationShort: "Each place has its own part in hajj.",
    explanationLong: "Recognizing the map of hajj helps the learner see the pilgrimage as a sequence, not a blur of names.",
    tags: ["foundation", "hajj", "sites"],
    reviewNext: "The map of the pilgrimage",
    whyThisMatters: "This builds orientation before later ordering questions."
  }),
  q({
    id: "hajj_06",
    category: "hajj",
    subtopic: "core_rite",
    difficulty: 2,
    type: "multiple_choice",
    prompt: "Which rite is the heart of hajj?",
    options: ["Standing at Arafah", "Shopping in Madinah", "Taking photos", "Skipping the rites"],
    correctAnswer: "Standing at Arafah",
    explanationShort: "Standing at Arafah is the heart of hajj.",
    explanationLong: "This phrase shows the weight of Arafah in the pilgrimage and helps learners identify one of its defining rites.",
    tags: ["foundation", "hajj", "arafah"],
    reviewNext: "Importance of Arafah",
    whyThisMatters: "Serious learners should know the rites that carry the most weight."
  }),
  q({
    id: "hajj_07",
    category: "hajj",
    subtopic: "sequence",
    difficulty: 3,
    type: "correct_order",
    prompt: "Put these hajj stops in order.",
    orderItems: ["Arafah", "Muzdalifah", "Mina"],
    correctAnswer: ["Arafah", "Muzdalifah", "Mina"],
    explanationShort: "After Arafah, the pilgrim moves to Muzdalifah and then Mina.",
    explanationLong: "Hajj learning becomes stronger when the learner can place major sites in sequence rather than treat them as disconnected names.",
    tags: ["foundation", "hajj", "sequence"],
    reviewNext: "Travel flow of hajj",
    whyThisMatters: "This tests process understanding instead of pure recognition."
  }),
  q({
    id: "hajj_08",
    category: "hajj",
    subtopic: "not_everyone",
    difficulty: 3,
    type: "scenario_judgment",
    scenario: "A family cannot afford the trip and their basic needs.",
    prompt: "What is true?",
    options: [
      "Hajj is not required yet",
      "Go now, whatever the harm",
      "Borrow a lot to show off",
      "Hajj is not a pillar"
    ],
    correctAnswer: "Hajj is not required yet",
    explanationShort: "Hajj is required only when you are able.",
    explanationLong: "Islam honors the pillar of hajj without turning it into reckless self-harm or financial chaos.",
    tags: ["foundation", "hajj", "ability"],
    reviewNext: "When hajj becomes due",
    whyThisMatters: "The learner should know how the law holds duty and mercy together."
  }),
  q({
    id: "hajj_09",
    category: "hajj",
    subtopic: "sincerity",
    difficulty: 3,
    type: "identify_mistake",
    prompt: "Which one is wrong?",
    options: [
      "I want hajj to show off",
      "I will learn the rites first",
      "Sincerity matters in worship",
      "I will save in a halal way"
    ],
    correctAnswer: "I want hajj to show off",
    explanationShort: "Hajj is worship, not showing off.",
    explanationLong: "The rites of hajj are acts of devotion and humility. Showing off empties the spiritual purpose.",
    tags: ["foundation", "hajj", "sincerity"],
    reviewNext: "Sincerity in pilgrimage",
    whyThisMatters: "Application questions should uncover whether the learner understands the spirit of worship."
  }),
  q({
    id: "hajj_10",
    category: "hajj",
    subtopic: "lesson_of_ihram",
    difficulty: 4,
    type: "best_response",
    scenario: "A child asks why pilgrims wear simple clothes.",
    prompt: "Choose the best answer.",
    options: [
      "All are equal before Allah",
      "For fashion photos",
      "So they need no intention",
      "To show off wealth"
    ],
    correctAnswer: "All are equal before Allah",
    explanationShort: "Ihram teaches humility and equality.",
    explanationLong: "The rites of hajj train submission, detachment from status, and awareness of standing before Allah with other believers.",
    tags: ["foundation", "hajj", "lessons"],
    reviewNext: "Spiritual meaning of hajj",
    whyThisMatters: "This pushes the learner from fact recall into meaning."
  }),
  q({
    id: "hajj_11",
    category: "hajj",
    subtopic: "hajj_vs_umrah",
    difficulty: 4,
    type: "true_false",
    prompt: "Hajj and Umrah are exactly the same.",
    options: ["True", "False"],
    correctAnswer: "False",
    explanationShort: "Hajj has set days each year; Umrah does not.",
    explanationLong: "A learner should not collapse every sacred journey into one label. Hajj is a specific pillar with its own season and rites.",
    tags: ["foundation", "hajj", "comparison"],
    reviewNext: "Basic difference between hajj and umrah",
    whyThisMatters: "This checks whether the learner can keep major acts of worship distinct."
  }),
  q({
    id: "hajj_12",
    category: "hajj",
    subtopic: "case_study",
    difficulty: 4,
    type: "mini_case_study",
    scenario: "Person A can go but keeps spending on luxuries. Person B wants to go but cannot afford it.",
    prompt: "Who is delaying a duty?",
    options: ["Person A", "Person B", "Both equally", "Neither"],
    correctAnswer: "Person A",
    explanationShort: "Hajj is a duty once you are able.",
    explanationLong: "The mature learner should be able to connect ability with responsibility and not flatten both people into the same case.",
    tags: ["foundation", "hajj", "application"],
    reviewNext: "Ability and postponement",
    whyThisMatters: "This is the kind of judgment that shows the learner has moved beyond slogans."
  }),
  q({
    id: "hajj_13",
    category: "hajj",
    subtopic: "deep_summary",
    difficulty: 5,
    type: "multiple_choice",
    prompt: "What is hajj?",
    options: [
      "A once-in-a-lifetime pillar for the able",
      "A holiday with no rules",
      "A festival instead of other pillars",
      "A status symbol"
    ],
    correctAnswer: "A once-in-a-lifetime pillar for the able",
    explanationShort: "Hajj is one of the five pillars of Islam.",
    explanationLong: "It has rules, and it teaches obedience and unity.",
    tags: ["foundation", "hajj", "summary"],
    reviewNext: "Meaning and law of hajj",
    whyThisMatters: "This tests synthesis rather than memorized fragments."
  }),
  q({
    id: "hajj_14",
    category: "hajj",
    subtopic: "comparison",
    difficulty: 5,
    type: "identify_mistake",
    prompt: "Which is the big mistake?",
    options: [
      "Hajj is just a status trip",
      "I will review the order of sites",
      "I will learn more about ihram",
      "I am learning who is able"
    ],
    correctAnswer: "Hajj is just a status trip",
    explanationShort: "Hajj is serious worship.",
    explanationLong: "Needing more detail is ordinary. Treating hajj as prestige instead of worship is the deeper spiritual misunderstanding.",
    tags: ["foundation", "hajj", "comparison"],
    reviewNext: "Sincerity and purpose in hajj",
    whyThisMatters: "This helps the learner rank mistakes by seriousness."
  }),
  q({
    id: "hajj_15",
    category: "hajj",
    subtopic: "reflection",
    difficulty: 5,
    type: "reflection_prompt",
    prompt: "Name one lesson from hajj that can shape a Muslim even before they travel there.",
    acceptedAnswers: [],
    explanationShort: "Hajj teaches humility and obedience long before the journey itself.",
    explanationLong: "The rites point to surrender, simplicity, remembrance, and equality before Allah. Those lessons matter now, not only later.",
    tags: ["foundation", "hajj", "reflection"],
    reviewNext: "Carrying hajj lessons into daily life",
    whyThisMatters: "A deep learner asks what the pillar teaches beyond logistics."
  })
];
const IMAN_QUESTIONS: FoundationQuestion[] = [
  q({
    id: "iman_01",
    category: "iman",
    subtopic: "pillars_of_iman",
    difficulty: 1,
    type: "multiple_choice",
    prompt: "How many pillars of iman are there?",
    options: ["Six", "Five", "Four", "Seven"],
    correctAnswer: "Six",
    explanationShort: "There are six pillars of iman.",
    explanationLong: "The Muslim learns belief through the six pillars: Allah, angels, books, messengers, the Last Day, and divine decree.",
    tags: ["foundation", "iman", "pillars_of_iman"],
    reviewNext: "Names of the six pillars",
    whyThisMatters: "The learner needs a clear map of belief before going deeper."
  }),
  q({
    id: "iman_02",
    category: "iman",
    subtopic: "identify_pillars",
    difficulty: 1,
    type: "multi_select",
    prompt: "Which are pillars of iman?",
    options: ["Belief in Allah", "Belief in angels", "Belief in books", "Belief in lucky charms"],
    correctAnswer: ["Belief in Allah", "Belief in angels", "Belief in books"],
    explanationShort: "Allah, angels and books are pillars; lucky charms are not.",
    explanationLong: "Iman is built on revealed beliefs, not superstition or invented protections.",
    tags: ["foundation", "iman", "pillars_of_iman"],
    reviewNext: "Core beliefs and false additions",
    whyThisMatters: "This builds clarity about revealed creed and blocks superstition."
  }),
  q({
    id: "iman_03",
    category: "iman",
    subtopic: "belief_in_qadar",
    difficulty: 1,
    type: "fill_in_blank",
    prompt: "Belief in Allah's decree is belief in ____.",
    // The other pillars of iman.
    options: ["angels", "the Last Day", "messengers", "Qadar"],
    acceptedAnswers: ["qadar"],
    correctAnswer: "Qadar",
    explanationShort: "Allah's decree is called qadar.",
    explanationLong: "A learner should know the name of this pillar even before handling its deeper questions.",
    tags: ["foundation", "iman", "qadar"],
    reviewNext: "Meaning of qadar",
    whyThisMatters: "This gives vocabulary for one of the pillars learners often find challenging."
  }),
  q({
    id: "iman_04",
    category: "iman",
    subtopic: "matching",
    difficulty: 2,
    type: "match_pairs",
    prompt: "Match each pillar.",
    pairs: [
      { left: "Angels", right: "Servants Allah created" },
      { left: "Books", right: "Guidance Allah revealed" },
      { left: "Messengers", right: "People sent with revelation" },
      { left: "Last Day", right: "Rising again and judgment" }
    ],
    options: [
      "Servants Allah created",
      "Guidance Allah revealed",
      "People sent with revelation",
      "Rising again and judgment"
    ],
    correctAnswer: {
      Angels: "Servants Allah created",
      Books: "Guidance Allah revealed",
      Messengers: "People sent with revelation",
      "Last Day": "Rising again and judgment"
    },
    explanationShort: "Each pillar is something real we believe in.",
    explanationLong: "The learner must know what each pillar means, not just memorize a list of names.",
    tags: ["foundation", "iman", "meanings"],
    reviewNext: "Meanings of the pillars",
    whyThisMatters: "This is the bridge from recognition into understanding."
  }),
  q({
    id: "iman_05",
    category: "iman",
    subtopic: "last_day",
    difficulty: 2,
    type: "true_false",
    prompt: "Belief in the Last Day is one of the pillars of iman.",
    options: ["True", "False"],
    correctAnswer: "True",
    explanationShort: "The Last Day is one of the six pillars.",
    explanationLong: "Belief in resurrection, judgment, and accountability belongs to core Muslim belief.",
    tags: ["foundation", "iman", "last_day"],
    reviewNext: "Accountability in the Hereafter",
    whyThisMatters: "Belief in accountability shapes moral seriousness."
  }),
  q({
    id: "iman_06",
    category: "iman",
    subtopic: "angels",
    difficulty: 2,
    type: "multiple_choice",
    prompt: "What are angels?",
    options: [
      "Real creations who obey Allah",
      "Just symbols of feelings",
      "They rule the world alone",
      "Made-up stories"
    ],
    correctAnswer: "Real creations who obey Allah",
    explanationShort: "Angels are real and always obey Allah.",
    explanationLong: "The pillars of iman are not poetic metaphors. They refer to realities taught by revelation.",
    tags: ["foundation", "iman", "angels"],
    reviewNext: "Belief in angels",
    whyThisMatters: "This tests whether the learner treats creed as revealed reality rather than symbolism."
  }),
  q({
    id: "iman_07",
    category: "iman",
    subtopic: "application",
    difficulty: 3,
    type: "best_response",
    scenario: "A friend says, \"If Allah decreed all, my choices don't matter.\"",
    prompt: "What is the best reply?",
    options: [
      "Believe in qadar and still choose well",
      "Yes, do not try",
      "Qadar is not part of iman",
      "Only when people watch"
    ],
    correctAnswer: "Believe in qadar and still choose well",
    explanationShort: "Qadar does not cancel your choices.",
    explanationLong: "A mature view of qadar joins trust in Allah's decree with obedience, effort, and accountability.",
    tags: ["foundation", "iman", "qadar"],
    reviewNext: "Qadar and responsibility",
    whyThisMatters: "This is where belief becomes reasoning, not just recitation."
  }),
  q({
    id: "iman_08",
    category: "iman",
    subtopic: "incorrect_belief",
    difficulty: 3,
    type: "identify_mistake",
    prompt: "Which one is wrong?",
    options: [
      "The revealed books matter in iman",
      "The messengers were sent with guidance",
      "The Last Day is real",
      "Angels are just a metaphor"
    ],
    correctAnswer: "Angels are just a metaphor",
    explanationShort: "Belief in angels is a pillar of iman.",
    explanationLong: "A stronger learner should spot when a revealed pillar is being redefined away instead of believed as taught.",
    tags: ["foundation", "iman", "error_correction"],
    reviewNext: "Belief in the unseen",
    whyThisMatters: "This tests whether the learner can recognize an actual creed error."
  }),
  q({
    id: "iman_09",
    category: "iman",
    subtopic: "books",
    difficulty: 3,
    type: "multiple_choice",
    prompt: "What does belief in Allah's books mean?",
    options: [
      "Allah sent guidance to messengers",
      "Every opinion is revelation",
      "Revelation ended before prophets",
      "They are just history"
    ],
    correctAnswer: "Allah sent guidance to messengers",
    explanationShort: "Allah revealed books to guide people.",
    explanationLong: "The Muslim believes that Allah revealed scriptures, and the Quran stands as the final revelation preserved for the Ummah.",
    tags: ["foundation", "iman", "books"],
    reviewNext: "Revelation and guidance",
    whyThisMatters: "This ties belief directly to revelation, which shapes all later study."
  }),
  q({
    id: "iman_10",
    category: "iman",
    subtopic: "steadiness",
    difficulty: 4,
    type: "scenario_judgment",
    scenario: "After a hard day, someone says, \"Allah knows best. I will keep doing right.\"",
    prompt: "Which pillar does this show?",
    options: ["Belief in qadar", "Belief in zakat", "Belief in hajj only", "No pillar at all"],
    correctAnswer: "Belief in qadar",
    explanationShort: "Trusting Allah's decree is belief in qadar.",
    explanationLong: "Qadar is not fatalism. It appears in trust, patience, and continuing to obey Allah after hardship.",
    tags: ["foundation", "iman", "qadar"],
    reviewNext: "Trust and responsibility",
    whyThisMatters: "This measures lived theology rather than vocabulary alone."
  }),
  q({
    id: "iman_11",
    category: "iman",
    subtopic: "sequence",
    difficulty: 4,
    type: "correct_order",
    prompt: "Put the pillars of iman in order.",
    orderItems: ["Allah", "Angels", "Books", "Messengers", "Last Day", "Qadar"],
    correctAnswer: ["Allah", "Angels", "Books", "Messengers", "Last Day", "Qadar"],
    explanationShort: "This is the usual order to learn them.",
    explanationLong: "Ordering helps the learner hold all six pillars together as one belief structure.",
    tags: ["foundation", "iman", "sequence"],
    reviewNext: "Remembering all six pillars together",
    whyThisMatters: "This reinforces the map before more nuanced comparison."
  }),
  q({
    id: "iman_12",
    category: "iman",
    subtopic: "case_study",
    difficulty: 4,
    type: "mini_case_study",
    scenario: "Person A says faith is just a feeling. Person B says it shapes how we live.",
    prompt: "Who understands iman?",
    options: ["Person B", "Person A", "Both equally", "Neither"],
    correctAnswer: "Person B",
    explanationShort: "Iman shapes how we live.",
    explanationLong: "Belief in Allah, revelation, and the Last Day changes how a Muslim obeys, hopes, fears, and acts.",
    tags: ["foundation", "iman", "application"],
    reviewNext: "How belief shapes life",
    whyThisMatters: "This protects the learner from reducing iman to mood language."
  }),
  q({
    id: "iman_13",
    category: "iman",
    subtopic: "nuance",
    difficulty: 5,
    type: "multiple_choice",
    prompt: "Which shows strong iman?",
    options: [
      "Believe and obey what Allah revealed",
      "The pillars are just poetry",
      "Belief never touches actions",
      "Accept only the easy parts"
    ],
    correctAnswer: "Believe and obey what Allah revealed",
    explanationShort: "Strong iman means believing and acting on it.",
    explanationLong: "The strongest answer keeps belief grounded in revelation and shows that iman transforms the believer's choices.",
    tags: ["foundation", "iman", "summary"],
    reviewNext: "Living by the pillars of iman",
    whyThisMatters: "This is a synthesis question, not a recall question."
  }),
  q({
    id: "iman_14",
    category: "iman",
    subtopic: "comparison",
    difficulty: 5,
    type: "identify_mistake",
    prompt: "Which is the big mistake?",
    options: [
      "The pillars are just symbols",
      "I will review the six pillars",
      "I need practice on qadar",
      "I am learning about the books"
    ],
    correctAnswer: "The pillars are just symbols",
    explanationShort: "The pillars of iman are real beliefs.",
    explanationLong: "Needing review is ordinary. Turning revealed beliefs into mere symbols is a much deeper creed problem.",
    tags: ["foundation", "iman", "comparison"],
    reviewNext: "Reality of the unseen pillars",
    whyThisMatters: "This helps the learner rank mistakes and protect core belief."
  }),
  q({
    id: "iman_15",
    category: "iman",
    subtopic: "reflection",
    difficulty: 5,
    type: "reflection_prompt",
    prompt: "Name one pillar of iman that most changes how you think about daily life, and say why.",
    acceptedAnswers: [],
    explanationShort: "Reflection helps belief settle into the heart and choices.",
    explanationLong: "Deep learning includes self-aware reflection on how belief in Allah, the Last Day, qadar, and the rest affect daily conduct.",
    tags: ["foundation", "iman", "reflection"],
    reviewNext: "Applying iman to daily life",
    whyThisMatters: "This asks the learner to internalize belief instead of keeping it abstract."
  })
];
const MANNERS_QUESTIONS: FoundationQuestion[] = [
  q({
    id: "manners_01",
    category: "manners",
    subtopic: "salam",
    difficulty: 1,
    type: "multiple_choice",
    prompt: "How do Muslims commonly greet one another?",
    options: ["As-salamu alaykum", "Good luck", "See you maybe", "Whatever"],
    correctAnswer: "As-salamu alaykum",
    explanationShort: "The greeting of peace is As-salamu alaykum.",
    explanationLong: "The Muslim greeting spreads peace and carries adab, identity, and dua all at once.",
    tags: ["foundation", "manners", "salam"],
    reviewNext: "Returning the greeting",
    whyThisMatters: "Daily phrases are small, but they shape the heart and the social atmosphere."
  }),
  q({
    id: "manners_02",
    category: "manners",
    subtopic: "response_to_good",
    difficulty: 1,
    type: "multiple_choice",
    prompt: "What do you say at good news?",
    options: ["Alhamdulillah", "Astaghfirullah as a greeting", "Goodbye", "Nothing at all"],
    correctAnswer: "Alhamdulillah",
    explanationShort: "A Muslim praises Allah with Alhamdulillah.",
    explanationLong: "Good news should turn the heart back toward gratitude to Allah rather than treating blessings as self-made.",
    tags: ["foundation", "manners", "phrases"],
    reviewNext: "Phrases of gratitude",
    whyThisMatters: "This trains the learner to connect ordinary life with remembrance of Allah."
  }),
  q({
    id: "manners_03",
    category: "manners",
    subtopic: "before_actions",
    difficulty: 1,
    type: "fill_in_blank",
    prompt: "Bismillah means 'In the name of ____.'",
    options: ["the people", "my parents", "Allah", "the world"],
    acceptedAnswers: ["allah"],
    correctAnswer: "Allah",
    explanationShort: "We say Bismillah before we eat or start something.",
    explanationLong: "It helps us remember Allah as we begin.",
    tags: ["foundation", "manners", "phrases"],
    reviewNext: "Bismillah in daily life",
    whyThisMatters: "Small phrases are part of how Islam enters ordinary routines."
  }),
  q({
    id: "manners_04",
    category: "manners",
    subtopic: "future_plans",
    difficulty: 2,
    type: "multiple_choice",
    prompt: "What do you say about a plan for tomorrow?",
    options: ["In sha Allah", "Yarhamuk Allah", "Jazak Allahu khayran", "Subhan Allah"],
    correctAnswer: "In sha Allah",
    explanationShort: "In sha Allah is used for future plans.",
    explanationLong: "This phrase trains humility, reminding the Muslim that even plans depend on Allah's will.",
    tags: ["foundation", "manners", "phrases"],
    reviewNext: "Meaning of In sha Allah",
    whyThisMatters: "The learner should know not just the phrase, but the kind of moment it belongs in."
  }),
  q({
    id: "manners_05",
    category: "manners",
    subtopic: "sneeze_response",
    difficulty: 2,
    type: "match_pairs",
    prompt: "Match the phrase to the moment.",
    pairs: [
      { left: "Alhamdulillah", right: "After you sneeze" },
      { left: "Yarhamuk Allah", right: "To a sneezer who praised Allah" },
      { left: "Jazak Allahu khayran", right: "To thank someone" },
      { left: "In sha Allah", right: "For a future plan" }
    ],
    options: [
      "After you sneeze",
      "To a sneezer who praised Allah",
      "To thank someone",
      "For a future plan"
    ],
    correctAnswer: {
      Alhamdulillah: "After you sneeze",
      "Yarhamuk Allah": "To a sneezer who praised Allah",
      "Jazak Allahu khayran": "To thank someone",
      "In sha Allah": "For a future plan"
    },
    explanationShort: "Each phrase has its own moment.",
    explanationLong: "Islamic manners are not random decorations. They train the tongue and heart in specific moments.",
    tags: ["foundation", "manners", "phrases"],
    reviewNext: "When to say each phrase",
    whyThisMatters: "This builds practical fluency rather than isolated word recognition."
  }),
  q({
    id: "manners_06",
    category: "manners",
    subtopic: "returning_salam",
    difficulty: 2,
    type: "true_false",
    prompt: "We should answer salam with equal or better words.",
    options: ["True", "False"],
    correctAnswer: "True",
    explanationShort: "Returning salam well is part of Muslim manners.",
    explanationLong: "The greeting of peace is meant to be answered, and answered beautifully.",
    tags: ["foundation", "manners", "salam"],
    reviewNext: "Replying to salam",
    whyThisMatters: "The learner should see manners as relational, not just individual."
  }),
  q({
    id: "manners_07",
    category: "manners",
    subtopic: "best_response",
    difficulty: 3,
    type: "best_response",
    scenario: "A friend helps you with something hard.",
    prompt: "What is best?",
    options: [
      "Jazak Allahu khayran",
      "I owe you nothing",
      "Maybe thanks later",
      "Say nothing"
    ],
    correctAnswer: "Jazak Allahu khayran",
    explanationShort: "It thanks them with a dua.",
    explanationLong: "Islamic manners encourage gratitude that remembers Allah and asks Him to reward the person.",
    tags: ["foundation", "manners", "gratitude"],
    reviewNext: "Thanking people well",
    whyThisMatters: "This tests the learner in a social situation instead of an empty definition."
  }),
  q({
    id: "manners_08",
    category: "manners",
    subtopic: "online_conduct",
    difficulty: 3,
    type: "scenario_judgment",
    scenario: "Someone is rude to you online.",
    prompt: "What should you do?",
    options: [
      "Stay calm or walk away",
      "Mock them back",
      "Spread lies about them",
      "Insult them with Islamic words"
    ],
    correctAnswer: "Stay calm or walk away",
    explanationShort: "Manners apply online too.",
    explanationLong: "Truth, restraint, and dignity are not suspended when the conversation happens on a screen.",
    tags: ["foundation", "manners", "social_situations"],
    reviewNext: "Truth and restraint",
    whyThisMatters: "This moves the learner from phrases into real moral behavior."
  }),
  q({
    id: "manners_09",
    category: "manners",
    subtopic: "promises",
    difficulty: 3,
    type: "multi_select",
    prompt: "Which are good manners?",
    options: [
      "Speaking truthfully",
      "Keeping a promise",
      "Showing kindness",
      "Lying when it is easy"
    ],
    correctAnswer: ["Speaking truthfully", "Keeping a promise", "Showing kindness"],
    explanationShort: "Truth, trust, and kindness belong to strong character.",
    explanationLong: "Manners in Islam are not only phrases on the tongue; they include honesty, reliability, mercy, and respect.",
    tags: ["foundation", "manners", "character"],
    reviewNext: "Trustworthy speech and action",
    whyThisMatters: "This broadens the learner's sense of adab from words into character."
  }),
  q({
    id: "manners_10",
    category: "manners",
    subtopic: "error_correction",
    difficulty: 4,
    type: "identify_mistake",
    prompt: "Which one is wrong?",
    options: [
      "Only words matter, not manners",
      "Phrases should remind me of Allah",
      "Manners include honesty and gentleness",
      "Good words should lead to good actions"
    ],
    correctAnswer: "Only words matter, not manners",
    explanationShort: "Kind words should come with kind actions.",
    explanationLong: "Islamic phrases are meant to train remembrance, gratitude, humility, and adab, not exist as empty sound effects.",
    tags: ["foundation", "manners", "error_correction"],
    reviewNext: "Meaningful remembrance",
    whyThisMatters: "This protects the learner from shallow religiosity."
  }),
  q({
    id: "manners_11",
    category: "manners",
    subtopic: "social_response",
    difficulty: 4,
    type: "best_response",
    scenario: "Your parent calls while you are playing.",
    prompt: "What should you do?",
    options: [
      "Answer kindly and politely",
      "Ignore them",
      "Shout that you are busy",
      "Answer rudely"
    ],
    correctAnswer: "Answer kindly and politely",
    explanationShort: "Answer parents with respect.",
    explanationLong: "Islamic manners are tested in interruptions and pressure, not just in calm moments.",
    tags: ["foundation", "manners", "parents"],
    reviewNext: "Respectful speech with parents",
    whyThisMatters: "This asks whether the learner can pick the best response in a real-life situation."
  }),
  q({
    id: "manners_12",
    category: "manners",
    subtopic: "sneeze_etiquette",
    difficulty: 4,
    type: "correct_order",
    prompt: "Put the sneeze manners in order.",
    orderItems: [
      "Sneezer: Alhamdulillah",
      "Listener: Yarhamuk Allah",
      "Sneezer: a dua back"
    ],
    correctAnswer: [
      "Sneezer: Alhamdulillah",
      "Listener: Yarhamuk Allah",
      "Sneezer: a dua back"
    ],
    explanationShort: "First the sneezer praises Allah, then the listener replies.",
    explanationLong: "Each person has a part to say.",
    tags: ["foundation", "manners", "phrases"],
    reviewNext: "Sneeze etiquette",
    whyThisMatters: "This checks practical fluency rather than simple phrase recognition."
  }),
  q({
    id: "manners_13",
    category: "manners",
    subtopic: "case_study",
    difficulty: 5,
    type: "mini_case_study",
    scenario: "Person A says Islamic words but lies and mocks. Person B is honest and keeps promises.",
    prompt: "Who has better manners?",
    options: ["Person B", "Person A", "Both equally", "Neither"],
    correctAnswer: "Person B",
    explanationShort: "Good words need good actions.",
    explanationLong: "Phrases matter, but they are meant to produce remembrance and good character, not hide bad behavior behind religious language.",
    tags: ["foundation", "manners", "character"],
    reviewNext: "Character behind the phrases",
    whyThisMatters: "This pushes the learner toward substance instead of religious appearance."
  }),
  q({
    id: "manners_14",
    category: "manners",
    subtopic: "summary",
    difficulty: 5,
    type: "multiple_choice",
    prompt: "What are Islamic manners?",
    options: [
      "Remember Allah, be truthful and kind",
      "Say phrases, treat people badly",
      "Only in the masjid",
      "Just sounding religious"
    ],
    correctAnswer: "Remember Allah, be truthful and kind",
    explanationShort: "Manners join remembering Allah and kindness.",
    explanationLong: "Daily manners in Islam cover the tongue, the heart, and how one treats people in ordinary moments.",
    tags: ["foundation", "manners", "summary"],
    reviewNext: "Integrated Islamic manners",
    whyThisMatters: "This checks for synthesis and lived understanding."
  }),
  q({
    id: "manners_15",
    category: "manners",
    subtopic: "reflection",
    difficulty: 5,
    type: "reflection_prompt",
    prompt: "Write one daily situation where you want to use a better Islamic phrase or better adab.",
    acceptedAnswers: [],
    explanationShort: "Real growth in manners begins with noticing daily moments.",
    explanationLong: "The learner becomes stronger when they connect Islamic phrases and ethics to real conversations, family life, and online behavior.",
    tags: ["foundation", "manners", "reflection"],
    reviewNext: "Daily adab habits",
    whyThisMatters: "Reflection helps turn knowledge into better speech and behavior."
  })
];
const QURAN_QUESTIONS: FoundationQuestion[] = [
  q({
    id: "quran_01",
    category: "quran",
    subtopic: "book_identity",
    difficulty: 1,
    type: "multiple_choice",
    prompt: "What is the Quran?",
    options: [
      "Allah's last book, sent to Muhammad",
      "Poems by the companions",
      "Just stories",
      "A book instead of worship"
    ],
    correctAnswer: "Allah's last book, sent to Muhammad",
    explanationShort: "The Quran is Allah's final revelation to Muhammad.",
    explanationLong: "The Quran is not merely literature or history. It is revealed guidance for belief, worship, and life.",
    tags: ["foundation", "quran", "revelation"],
    reviewNext: "Revelation and guidance",
    whyThisMatters: "Quran literacy begins with recognizing what the Quran is."
  }),
  q({
    id: "quran_02",
    category: "quran",
    subtopic: "basic_terms",
    difficulty: 1,
    type: "multiple_choice",
    prompt: "What is a surah?",
    options: [
      "A chapter of the Quran",
      "Bowing in prayer",
      "A type of charity",
      "A pilgrim garment"
    ],
    correctAnswer: "A chapter of the Quran",
    explanationShort: "A surah is a chapter.",
    explanationLong: "Basic Quran literacy includes learning the simple vocabulary used when Muslims talk about the Quran.",
    tags: ["foundation", "quran", "literacy"],
    reviewNext: "Surah and ayah",
    whyThisMatters: "The learner should become comfortable with the language of Quran study."
  }),
  q({
    id: "quran_03",
    category: "quran",
    subtopic: "basic_terms",
    difficulty: 1,
    type: "multiple_choice",
    prompt: "What is an ayah?",
    options: [
      "A verse of the Quran",
      "A prayer rug",
      "A type of food",
      "A charity collector"
    ],
    correctAnswer: "A verse of the Quran",
    explanationShort: "An ayah is a verse.",
    explanationLong: "Knowing the terms surah and ayah helps a learner read references and study notes correctly.",
    tags: ["foundation", "quran", "literacy"],
    reviewNext: "Reading Quran references",
    whyThisMatters: "This builds the minimum literacy needed to follow Quran study."
  }),
  q({
    id: "quran_04",
    category: "quran",
    subtopic: "fatihah",
    difficulty: 2,
    type: "multiple_choice",
    prompt: "Which surah opens the Quran?",
    options: ["Al-Fatihah", "Al-Ikhlas", "Al-Asr", "Al-Kawthar"],
    correctAnswer: "Al-Fatihah",
    explanationShort: "Al-Fatihah means The Opening.",
    explanationLong: "We recite it in every prayer.",
    tags: ["foundation", "quran", "fatihah"],
    reviewNext: "Major surahs in daily life",
    whyThisMatters: "This connects Quran literacy to worship."
  }),
  q({
    id: "quran_05",
    category: "quran",
    subtopic: "respect",
    difficulty: 2,
    type: "true_false",
    prompt: "We should treat the Quran with respect.",
    options: ["True", "False"],
    correctAnswer: "True",
    explanationShort: "Respect for the Quran is part of good adab.",
    explanationLong: "A learner's relationship with revelation should include reverence, focus, and a desire to understand and follow.",
    tags: ["foundation", "quran", "adab"],
    reviewNext: "Adab with the Quran",
    whyThisMatters: "Learning Quran begins with the right posture toward revelation."
  }),
  q({
    id: "quran_06",
    category: "quran",
    subtopic: "application",
    difficulty: 3,
    type: "best_response",
    scenario: "A friend says, \"I recite the Quran, but meaning doesn't matter.\"",
    prompt: "What is the best reply?",
    options: [
      "Reciting is good; learn the meaning too",
      "Meaning never matters",
      "The Quran is only for scholars",
      "It should not change your life"
    ],
    correctAnswer: "Reciting is good; learn the meaning too",
    explanationShort: "Recitation matters, and understanding matters too.",
    explanationLong: "The learner should not be forced into a false choice between sound and meaning. The best path values both.",
    tags: ["foundation", "quran", "understanding"],
    reviewNext: "Recitation and meaning together",
    whyThisMatters: "This tests whether the learner understands the goal of Quran study."
  }),
  q({
    id: "quran_07",
    category: "quran",
    subtopic: "summary",
    difficulty: 4,
    type: "multiple_choice",
    prompt: "How should we learn the Quran?",
    options: [
      "Read, understand and live it",
      "Only for its sound",
      "As old history only",
      "Only as decoration"
    ],
    correctAnswer: "Read, understand and live it",
    explanationShort: "Read it, understand it and live by it.",
    explanationLong: "A strong learner knows that revelation is meant to be read, honored, understood, and followed.",
    tags: ["foundation", "quran", "summary"],
    reviewNext: "Purpose of Quran study",
    whyThisMatters: "This checks synthesis rather than isolated vocabulary."
  }),
  q({
    id: "quran_08",
    category: "quran",
    subtopic: "reflection",
    difficulty: 5,
    type: "reflection_prompt",
    prompt: "Name one way you want your relationship with the Quran to become more serious.",
    acceptedAnswers: [],
    explanationShort: "Reflection helps Quran study become a living practice.",
    explanationLong: "Even a beginner can make the Quran more central through daily recitation, translation, memorization, or a steadier study routine.",
    tags: ["foundation", "quran", "reflection"],
    reviewNext: "Building a Quran habit",
    whyThisMatters: "This turns Quran literacy into personal commitment."
  })
];
const SEERAH_QUESTIONS: FoundationQuestion[] = [
  q({
    id: "seerah_01",
    category: "seerah",
    subtopic: "last_prophet",
    difficulty: 1,
    type: "multiple_choice",
    prompt: "Who is the final prophet in Islam?",
    options: ["Muhammad", "Musa", "Ibrahim", "Nuh"],
    correctAnswer: "Muhammad",
    explanationShort: "Muhammad is the final prophet.",
    explanationLong: "Core seerah knowledge begins by knowing the Prophet Muhammad, peace and blessings be upon him, as the final messenger.",
    tags: ["foundation", "seerah", "prophets"],
    reviewNext: "The life of the Prophet",
    whyThisMatters: "The learner needs a clear anchor for prophetic history."
  }),
  q({
    id: "seerah_02",
    category: "seerah",
    subtopic: "hira",
    difficulty: 1,
    type: "multiple_choice",
    prompt: "Where did the first revelation come?",
    options: ["Cave Hira", "Madinah market", "Mount Sinai", "Arafah"],
    correctAnswer: "Cave Hira",
    explanationShort: "The first revelation began in Cave Hira.",
    explanationLong: "This is one of the first landmarks in the seerah of the Prophet Muhammad.",
    tags: ["foundation", "seerah", "revelation"],
    reviewNext: "Early seerah milestones",
    whyThisMatters: "This places revelation in the Prophet's life story."
  }),
  q({
    id: "seerah_03",
    category: "seerah",
    subtopic: "hijrah",
    difficulty: 2,
    type: "multiple_choice",
    prompt: "The Prophet migrated from Makkah to which city?",
    options: ["Madinah", "Taif", "Jerusalem", "Basrah"],
    correctAnswer: "Madinah",
    explanationShort: "The hijrah was to Madinah.",
    explanationLong: "The migration marks one of the defining changes in Islamic history and community life.",
    tags: ["foundation", "seerah", "hijrah"],
    reviewNext: "Major events of the seerah",
    whyThisMatters: "This helps the learner orient key moments in the Prophet's life."
  }),
  q({
    id: "seerah_04",
    category: "seerah",
    subtopic: "prophets",
    difficulty: 2,
    type: "match_pairs",
    prompt: "Match each prophet.",
    pairs: [
      { left: "Nuh", right: "The ark and the flood" },
      { left: "Ibrahim", right: "Built the Ka'bah with Ismail" },
      { left: "Musa", right: "Sent to Pharaoh" },
      { left: "Yusuf", right: "Patience in prison" }
    ],
    options: [
      "The ark and the flood",
      "Built the Ka'bah with Ismail",
      "Sent to Pharaoh",
      "Patience in prison"
    ],
    correctAnswer: {
      Nuh: "The ark and the flood",
      Ibrahim: "Built the Ka'bah with Ismail",
      Musa: "Sent to Pharaoh",
      Yusuf: "Patience in prison"
    },
    explanationShort: "Each prophet's story has its own lesson.",
    explanationLong: "Core seerah learning includes recognizing the big events and moral themes in the lives of the prophets.",
    tags: ["foundation", "seerah", "prophets"],
    reviewNext: "Major prophetic stories",
    whyThisMatters: "This trains memory and meaning together."
  }),
  q({
    id: "seerah_05",
    category: "seerah",
    subtopic: "lessons",
    difficulty: 3,
    type: "best_response",
    scenario: "A friend asks, \"Why learn about prophets? Isn't it old history?\"",
    prompt: "What is the best answer?",
    options: [
      "Their lives teach faith and patience",
      "Random stories, no lessons",
      "Only for quizzes",
      "They replace the Quran"
    ],
    correctAnswer: "Their lives teach faith and patience",
    explanationShort: "The prophets teach lessons for today.",
    explanationLong: "Studying the prophets helps the believer understand how revelation shapes people under pressure, hardship, and mission.",
    tags: ["foundation", "seerah", "lessons"],
    reviewNext: "Lessons from prophetic stories",
    whyThisMatters: "This moves the learner away from trivia and toward meaning."
  }),
  q({
    id: "seerah_06",
    category: "seerah",
    subtopic: "application",
    difficulty: 4,
    type: "mini_case_study",
    scenario: "Someone says Ibrahim's story is nice but has nothing to do with them.",
    prompt: "What is missing?",
    options: [
      "It should teach us to obey too",
      "Nothing is missing",
      "Only travel matters",
      "Only wealth matters"
    ],
    correctAnswer: "It should teach us to obey too",
    explanationShort: "Prophets' stories guide us today.",
    explanationLong: "Real study asks what faith, patience, sacrifice, and trust should produce in the believer today.",
    tags: ["foundation", "seerah", "application"],
    reviewNext: "Applying prophetic lessons",
    whyThisMatters: "This question is aimed directly at the user's goal: real learning, not shallow recall."
  }),
  q({
    id: "seerah_07",
    category: "seerah",
    subtopic: "summary",
    difficulty: 5,
    type: "multiple_choice",
    prompt: "Why does seerah matter?",
    options: [
      "It shows Islam lived by real people",
      "Just dates and names",
      "Only scholars need it",
      "It replaces worship"
    ],
    correctAnswer: "It shows Islam lived by real people",
    explanationShort: "Seerah shows how the Prophet lived Islam.",
    explanationLong: "Seerah matters because it shows revelation embodied in patience, leadership, sacrifice, and trust in Allah.",
    tags: ["foundation", "seerah", "summary"],
    reviewNext: "Why prophetic history guides the believer",
    whyThisMatters: "This tests synthesis, not isolated names."
  }),
  q({
    id: "seerah_08",
    category: "seerah",
    subtopic: "reflection",
    difficulty: 5,
    type: "reflection_prompt",
    prompt: "Name one prophetic story or seerah event you want to study more deeply, and why.",
    acceptedAnswers: [],
    explanationShort: "Reflection helps the learner choose a meaningful path deeper into seerah.",
    explanationLong: "Serious learning grows when the student sees what lesson of patience, trust, obedience, or courage they most need right now.",
    tags: ["foundation", "seerah", "reflection"],
    reviewNext: "Choosing a deeper seerah path",
    whyThisMatters: "Reflection turns history into intentional study."
  })
];

export const FOUNDATION_CATEGORY_META: Record<FoundationCategoryId, CategoryMeta> = {
  shahadah: {
    title: "Shahadah",
    shortTitle: "Shahadah",
    description: "Tawhid, the Messenger, sincerity, and what the testimony changes in life.",
    accentColor: "#24A965"
  },
  salah: {
    title: "Salah",
    shortTitle: "Salah",
    description: "Prayer count, timing, conditions, seriousness, and real-life prayer choices.",
    accentColor: "#2E8BC0"
  },
  taharah: {
    title: "Wudu and Taharah",
    shortTitle: "Taharah",
    description: "Purity before prayer, wudu steps, nullifiers, and mistake detection.",
    accentColor: "#4C8CF5"
  },
  fasting: {
    title: "Fasting basics",
    shortTitle: "Fasting",
    description: "Ramadan, purpose, invalidators, exemptions, and character while fasting.",
    accentColor: "#F5A623"
  },
  zakat: {
    title: "Zakat basics",
    shortTitle: "Zakat",
    description: "Obligation, recipients, qualifying wealth, and the meaning of zakat.",
    accentColor: "#A86BE8"
  },
  hajj: {
    title: "Hajj basics",
    shortTitle: "Hajj",
    description: "Ability, ihram, Arafah, and the spiritual meaning of pilgrimage.",
    accentColor: "#E9778B"
  },
  iman: {
    title: "Six pillars of iman",
    shortTitle: "Iman",
    description: "Belief in Allah, angels, books, messengers, the Last Day, and qadar.",
    accentColor: "#7CCF65"
  },
  manners: {
    title: "Daily phrases and manners",
    shortTitle: "Manners",
    description: "Salam, gratitude, planning with Allah, thankfulness, and social adab.",
    accentColor: "#49C38F"
  },
  quran: {
    title: "Basic Quran literacy",
    shortTitle: "Quran",
    description: "Surah, ayah, respect for revelation, and learning meaning with recitation.",
    accentColor: "#00A39B"
  },
  seerah: {
    title: "Prophets and core seerah",
    shortTitle: "Seerah",
    description: "Major prophetic milestones and what their stories teach the believer.",
    accentColor: "#F46F67"
  }
};

export const FOUNDATION_CATEGORY_ORDER: FoundationCategoryId[] = [
  "shahadah",
  "salah",
  "taharah",
  "fasting",
  "zakat",
  "hajj",
  "iman",
  "manners",
  "quran",
  "seerah"
];

export const FOUNDATION_PROGRESS_LABELS: LearnerReadinessLabel[] = [
  "New learner",
  "Basic foundation",
  "Growing student",
  "Strong foundation",
  "Ready for advanced topics"
];

export const FOUNDATION_QUESTION_BANK: FoundationQuestion[] = [
  ...SHAHADAH_QUESTIONS,
  ...SALAH_QUESTIONS,
  ...TAHARAH_QUESTIONS,
  ...FASTING_QUESTIONS,
  ...ZAKAT_QUESTIONS,
  ...HAJJ_QUESTIONS,
  ...IMAN_QUESTIONS,
  ...MANNERS_QUESTIONS,
  ...QURAN_QUESTIONS,
  ...SEERAH_QUESTIONS
];

export const FOUNDATION_QUESTIONS_BY_CATEGORY = FOUNDATION_CATEGORY_ORDER.reduce<
  Record<FoundationCategoryId, FoundationQuestion[]>
>((map, category) => {
  map[category] = FOUNDATION_QUESTION_BANK.filter((question) => question.category === category);
  return map;
}, {} as Record<FoundationCategoryId, FoundationQuestion[]>);
