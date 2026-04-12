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

function withDefaultWrongNotes(
  options: string[] | undefined,
  correctAnswer: QuestionSeed["correctAnswer"],
  fallback: string
) {
  if (!options?.length) {
    return { general: fallback };
  }

  const correctSet = new Set(Array.isArray(correctAnswer) ? correctAnswer : [String(correctAnswer ?? "")]);

  return options.reduce<Record<string, string>>((notes, option) => {
    if (!correctSet.has(option)) {
      notes[option] = fallback;
    }

    return notes;
  }, {});
}

function q(seed: QuestionSeed): FoundationQuestion {
  return {
    ...seed,
    acceptedAnswers: seed.acceptedAnswers,
    pairs: seed.pairs,
    orderItems: seed.orderItems,
    misconceptionNotes: seed.misconceptionNotes ?? [],
    wrongAnswerNotes:
      seed.wrongAnswerNotes ??
      withDefaultWrongNotes(seed.options, seed.correctAnswer, "This choice misses the core point this question is testing."),
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
    prompt: "Which pillar begins a person's entry into Islam?",
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
    prompt: "The Shahadah includes belief in Allah alone and belief that Muhammad is Allah's Messenger.",
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
    prompt: "Fill in the blank: There is no one worthy of worship except ____.",
    acceptedAnswers: ["allah"],
    correctAnswer: "Allah",
    explanationShort: "The blank is Allah.",
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
    explanationShort: "Each phrase has its own meaning, and both are essential.",
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
    prompt: "Which choice best shows the Shahadah shaping daily life?",
    options: [
      "Worship Allah alone and follow the Prophet's guidance",
      "Be spiritual without caring what revelation says",
      "Use the testimony only in ceremonies",
      "Follow whatever feels easiest at the moment"
    ],
    correctAnswer: "Worship Allah alone and follow the Prophet's guidance",
    explanationShort: "The Shahadah affects belief and daily obedience.",
    explanationLong: "A sincere testimony does not stay on the tongue only. It changes worship, values, and the way a Muslim follows divine guidance.",
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
    prompt: "Select the choices that fit the Shahadah.",
    options: [
      "Praying to Allah alone",
      "Seeking worship from saints instead of Allah",
      "Accepting the Prophet's teachings",
      "Treating revelation as optional"
    ],
    correctAnswer: ["Praying to Allah alone", "Accepting the Prophet's teachings"],
    explanationShort: "The Shahadah joins worship of Allah alone with following the Messenger.",
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
    scenario: "A student says, \"I believe in Allah, but I do not think I need to follow what the Prophet taught.\"",
    prompt: "What is missing in this statement?",
    options: [
      "The part about following Muhammad as Allah's Messenger",
      "Nothing is missing",
      "Only the part about giving zakat",
      "Only the part about hajj"
    ],
    correctAnswer: "The part about following Muhammad as Allah's Messenger",
    explanationShort: "The statement leaves out the second half of the Shahadah.",
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
    scenario: "A friend asks, \"If someone says the Shahadah, why does that have to change their choices too?\"",
    prompt: "Choose the best answer.",
    options: [
      "Because the Shahadah means worship and obedience are now tied to Allah's guidance",
      "It does not need to change anything except a person's name",
      "It matters only in the mosque, not in real life",
      "It means the person can now decide religion for themselves"
    ],
    correctAnswer: "Because the Shahadah means worship and obedience are now tied to Allah's guidance",
    explanationShort: "The Shahadah guides both belief and conduct.",
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
    prompt: "The Shahadah is complete if a person says it outwardly but has no intention to accept Islam in their heart.",
    options: ["True", "False"],
    correctAnswer: "False",
    explanationShort: "The Shahadah is not a sound effect with no meaning.",
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
    scenario: "A new Muslim is mocked for avoiding a practice that worships other than Allah.",
    prompt: "Which response best matches the Shahadah?",
    options: [
      "Hold to worshipping Allah alone even if people dislike it",
      "Join in so no one feels uncomfortable",
      "Hide the truth forever and treat it as unimportant",
      "Say all forms of worship are equal"
    ],
    correctAnswer: "Hold to worshipping Allah alone even if people dislike it",
    explanationShort: "The Shahadah asks for loyalty to truth, not to social pressure.",
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
    prompt: "Identify the main mistake: \"I say the Shahadah, so I do not need to care what the Prophet taught.\"",
    options: [
      "It separates the Shahadah from following the Messenger",
      "It takes prayer too seriously",
      "It confuses zakat with fasting",
      "It gives too much importance to good character"
    ],
    correctAnswer: "It separates the Shahadah from following the Messenger",
    explanationShort: "That statement cuts the testimony into two unequal parts.",
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
    prompt: "Which statement best fits the Shahadah?",
    options: [
      "Worship belongs to Allah alone, and the Prophet shows how that worship is lived",
      "Worship can be shared as long as intentions are good",
      "Guidance can be ignored once a person feels spiritual",
      "Islam only asks for private belief, not visible obedience"
    ],
    correctAnswer: "Worship belongs to Allah alone, and the Prophet shows how that worship is lived",
    explanationShort: "That answer joins tawhid and prophetic guidance correctly.",
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
    prompt: "Put these in the healthiest order for a learner growing into the Shahadah.",
    orderItems: ["Learn the meaning", "Believe it sincerely", "Say it truthfully", "Live by it"],
    correctAnswer: ["Learn the meaning", "Believe it sincerely", "Say it truthfully", "Live by it"],
    explanationShort: "Healthy growth joins knowledge, belief, speech, and action.",
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
    scenario: "Person A says they love Allah but rejects prophetic guidance. Person B says they admire the Prophet but still calls on others besides Allah in worship.",
    prompt: "Which judgment is best?",
    options: [
      "Both are missing part of what the Shahadah requires",
      "Both are correct because intention matters most",
      "Only Person A is mistaken",
      "Only Person B is mistaken"
    ],
    correctAnswer: "Both are missing part of what the Shahadah requires",
    explanationShort: "Each case breaks one half of the testimony.",
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
    prompt: "How many obligatory prayers are there each day?",
    options: ["Five", "Three", "Six", "Two"],
    correctAnswer: "Five",
    explanationShort: "There are five daily obligatory prayers.",
    explanationLong: "Fajr, Dhuhr, Asr, Maghrib, and Isha form the daily rhythm of salah for a Muslim.",
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
    explanationShort: "Fajr is the dawn prayer.",
    explanationLong: "The daily prayers have names tied to their places in the day, and Fajr belongs to dawn.",
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
    prompt: "Which of these belong to preparing correctly for salah?",
    options: [
      "Having wudu",
      "Praying after the time enters",
      "Facing the qiblah when able",
      "Talking casually during prayer"
    ],
    correctAnswer: ["Having wudu", "Praying after the time enters", "Facing the qiblah when able"],
    explanationShort: "Prayer has conditions that matter before it starts.",
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
    explanationShort: "Isha comes after Maghrib.",
    explanationLong: "The order of the day continues after Maghrib with Isha, the night prayer.",
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
    scenario: "Bilal remembers that prayer time has entered, but he knows he has no wudu.",
    prompt: "What should he do first?",
    options: [
      "Renew his wudu before praying",
      "Pray anyway because the time entered",
      "Skip the prayer entirely",
      "Wait until the next day"
    ],
    correctAnswer: "Renew his wudu before praying",
    explanationShort: "Wudu is required before salah when a person needs it.",
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
    prompt: "Which action clearly harms a prayer if done deliberately inside it?",
    options: [
      "Casual conversation during the prayer",
      "Standing respectfully",
      "Reciting Quran",
      "Facing the qiblah"
    ],
    correctAnswer: "Casual conversation during the prayer",
    explanationShort: "Deliberate talking is not part of salah.",
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
    scenario: "A student says, \"My day is too busy for prayer, so I just fit it in if I feel like it.\"",
    prompt: "What is the best response?",
    options: [
      "A Muslim should arrange the day around the prayers, not treat them as optional extras",
      "That is fine as long as the student feels sincere",
      "Prayer only matters on weekends",
      "It is enough to pray once a day when life is busy"
    ],
    correctAnswer: "A Muslim should arrange the day around the prayers, not treat them as optional extras",
    explanationShort: "Prayer is a fixed obligation, not a spare-time hobby.",
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
    prompt: "A Muslim should care about praying on time instead of treating salah casually.",
    options: ["True", "False"],
    correctAnswer: "True",
    explanationShort: "Prayer should be honored and taken seriously.",
    explanationLong: "The five prayers are not random spiritual moments. They come with structure, times, and discipline.",
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
    scenario: "Person A checks the time, cleans up, makes wudu, and prays. Person B says prayer is important but keeps delaying it for entertainment.",
    prompt: "Who is treating salah correctly?",
    options: ["Person A", "Person B", "Both", "Neither"],
    correctAnswer: "Person A",
    explanationShort: "Person A is acting on the importance of salah.",
    explanationLong: "Prayer is honored through preparation and timely action, not by empty praise without obedience.",
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
    prompt: "Which answer best describes a strong view of salah?",
    options: [
      "Salah is a daily obligation that should shape the schedule",
      "Salah is helpful but optional when the heart feels full",
      "Salah matters only in Ramadan",
      "Salah is mainly for older people"
    ],
    correctAnswer: "Salah is a daily obligation that should shape the schedule",
    explanationShort: "A strong foundation sees prayer as a daily anchor.",
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
    scenario: "A believer is traveling and notices Asr time is close to ending.",
    prompt: "Which response shows the best instinct?",
    options: [
      "Find a clean place and pray rather than treating prayer as something disposable",
      "Wait a few days until travel feels easier",
      "Drop prayer completely because travel exists",
      "Assume intention alone replaces the prayer"
    ],
    correctAnswer: "Find a clean place and pray rather than treating prayer as something disposable",
    explanationShort: "The instinct should be to preserve prayer, not casually lose it.",
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
    prompt: "Which statement shows the deeper mistake?",
    options: [
      "Prayer is optional when I am busy",
      "I should check the time before I pray",
      "I should prepare for salah calmly",
      "Prayer deserves respect"
    ],
    correctAnswer: "Prayer is optional when I am busy",
    explanationShort: "Treating salah as optional damages the whole foundation.",
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
      "It prepares a person with ritual purity for prayer",
      "It replaces the prayer itself",
      "It is only for Friday",
      "It is only for children"
    ],
    correctAnswer: "It prepares a person with ritual purity for prayer",
    explanationShort: "Wudu prepares a person for prayer with ritual purity.",
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
    options: ["Face", "Arms", "Feet", "Hair roots only without wiping"],
    correctAnswer: ["Face", "Arms", "Feet"],
    explanationShort: "Face, arms, and feet are washed, and the head is wiped.",
    explanationLong: "Wudu includes washing certain limbs and wiping the head. Knowing the main body parts is a first-level skill.",
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
    explanationShort: "Passing wind breaks wudu.",
    explanationLong: "Some actions clearly nullify wudu. A learner should know the obvious nullifiers early and confidently.",
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
    prompt: "Put these main wudu actions in order.",
    orderItems: ["Wash face", "Wash arms", "Wipe head", "Wash feet"],
    correctAnswer: ["Wash face", "Wash arms", "Wipe head", "Wash feet"],
    explanationShort: "These are the main core actions in their usual order.",
    explanationLong: "Learners often know the parts but not the order. Order matters in the way wudu is normally taught and practiced.",
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
    prompt: "Which action is commonly taught as recommended rather than one of the core required acts of wudu?",
    options: ["Using the siwak first", "Washing the face", "Wiping the head", "Washing the feet"],
    correctAnswer: "Using the siwak first",
    explanationShort: "Using the siwak is recommended, while the other choices are core acts in wudu.",
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
    prompt: "Match the wudu act to its description.",
    pairs: [
      { left: "Wash face", right: "Water reaches the whole face" },
      { left: "Wash arms", right: "Water reaches up to the elbows" },
      { left: "Wipe head", right: "The head is wiped rather than washed" },
      { left: "Wash feet", right: "Water reaches the feet up to the ankles" }
    ],
    options: [
      "Water reaches the whole face",
      "Water reaches up to the elbows",
      "The head is wiped rather than washed",
      "Water reaches the feet up to the ankles"
    ],
    correctAnswer: {
      "Wash face": "Water reaches the whole face",
      "Wash arms": "Water reaches up to the elbows",
      "Wipe head": "The head is wiped rather than washed",
      "Wash feet": "Water reaches the feet up to the ankles"
    },
    explanationShort: "Each act has a defined body target.",
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
    scenario: "A person falls into a deep sleep and wakes up just before prayer.",
    prompt: "What is the safer and stronger next step?",
    options: [
      "Renew wudu before praying",
      "Assume the old wudu is still there no matter what",
      "Skip the prayer entirely",
      "Only wash the hands quickly"
    ],
    correctAnswer: "Renew wudu before praying",
    explanationShort: "Deep sleep is a common reason to renew wudu.",
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
    scenario: "During the day, a person starts doubting whether their wudu broke but has no clear sign.",
    prompt: "What is the best response?",
    options: [
      "Do not cancel certainty because of a bare doubt",
      "Always assume wudu is broken every time a thought appears",
      "Stop praying forever unless someone else confirms it",
      "Ignore wudu as a topic entirely"
    ],
    correctAnswer: "Do not cancel certainty because of a bare doubt",
    explanationShort: "Certainty is not removed by a passing doubt.",
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
    scenario: "A person notices visible impurity on their clothes just before salah.",
    prompt: "What should they care about?",
    options: [
      "Cleaning the impurity before praying if they are able",
      "Ignoring it because only intention matters",
      "Talking about purity but never acting on it",
      "Assuming clothes never matter for prayer"
    ],
    correctAnswer: "Cleaning the impurity before praying if they are able",
    explanationShort: "Purity includes body, clothes, and place as much as possible.",
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
    prompt: "Which mistake makes this wudu clearly incomplete: a person washes face, arms, wipes the head, then forgets the feet and stops?",
    options: [
      "They left out washing the feet",
      "They used too much water",
      "They stood up while doing wudu",
      "They washed the face first"
    ],
    correctAnswer: "They left out washing the feet",
    explanationShort: "Leaving out a core act makes the wudu incomplete.",
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
    prompt: "Which answer best describes taharah?",
    options: [
      "It covers wudu and the general cleanliness needed for prayer",
      "It only means washing the hands quickly",
      "It is an optional topic that does not affect prayer",
      "It only matters after prayer is finished"
    ],
    correctAnswer: "It covers wudu and the general cleanliness needed for prayer",
    explanationShort: "Taharah is broader than a rushed hand wash.",
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
    scenario: "Person A checks that water reached the required limbs. Person B splashes quickly and never checks whether required parts were covered.",
    prompt: "Who is showing the better understanding of wudu?",
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
    prompt: "Choose the situations that usually call for renewing wudu.",
    options: [
      "Using the bathroom",
      "Passing wind",
      "Deep sleep that removes awareness",
      "Smiling at a friend"
    ],
    correctAnswer: ["Using the bathroom", "Passing wind", "Deep sleep that removes awareness"],
    explanationShort: "These are common cases that call for renewed wudu.",
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
    prompt: "Which statement is the bigger error?",
    options: [
      "Purity before prayer does not matter as long as I feel sincere",
      "I should learn the steps of wudu more carefully",
      "I sometimes need review on nullifiers of wudu",
      "I should check my clothes before salah"
    ],
    correctAnswer: "Purity before prayer does not matter as long as I feel sincere",
    explanationShort: "That statement attacks the whole purpose of taharah.",
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
    prompt: "In which month do Muslims fast Ramadan?",
    options: ["Ramadan", "Muharram", "Shawwal", "Safar"],
    correctAnswer: "Ramadan",
    explanationShort: "The obligatory fast is in Ramadan.",
    explanationLong: "Ramadan is the month in which fasting is required for adult Muslims who are able.",
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
    prompt: "What is one major purpose of fasting in Islam?",
    options: ["Growing in taqwa", "Avoiding all work", "Skipping prayer", "Showing off self-control"],
    correctAnswer: "Growing in taqwa",
    explanationShort: "Fasting is tied to taqwa.",
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
    prompt: "Which action clearly breaks the fast if done intentionally during the day?",
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
    prompt: "The meal used to break the fast at sunset is called ____.",
    acceptedAnswers: ["iftar"],
    correctAnswer: "Iftar",
    explanationShort: "The sunset meal is iftar.",
    explanationLong: "The fast ends at sunset, and the meal or act of breaking the fast then is called iftar.",
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
    prompt: "Which people may have a valid reason not to fast and then deal with it according to the rules?",
    options: [
      "A sick person",
      "A traveler",
      "A menstruating woman",
      "A healthy person who just does not feel like fasting"
    ],
    correctAnswer: ["A sick person", "A traveler", "A menstruating woman"],
    explanationShort: "Islam gives real concessions for real hardship and certain states.",
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
    scenario: "Someone forgets they are fasting and eats a small bite, then remembers.",
    prompt: "What should they do next?",
    options: [
      "Continue fasting and carry on",
      "Abandon the rest of the day immediately",
      "Pretend fasting no longer matters at all",
      "Stop praying for the day too"
    ],
    correctAnswer: "Continue fasting and carry on",
    explanationShort: "A forgotten bite does not become a planned rebellion.",
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
    scenario: "A fasting student is insulted and wants to argue harshly.",
    prompt: "Which response is best?",
    options: [
      "Restrain the tongue and remember the fast",
      "Return the insult with something worse",
      "Break the fast immediately out of anger",
      "Use fasting as an excuse to mistreat people"
    ],
    correctAnswer: "Restrain the tongue and remember the fast",
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
    prompt: "Which statement has the main mistake?",
    options: [
      "As long as I do not eat, lying and backbiting do not matter",
      "Fasting should help me guard my tongue",
      "The fast trains discipline and taqwa",
      "Fasting has inward and outward lessons"
    ],
    correctAnswer: "As long as I do not eat, lying and backbiting do not matter",
    explanationShort: "That statement reduces fasting to hunger only.",
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
    prompt: "Put this basic fasting flow in order.",
    orderItems: ["Intend the fast", "Begin fasting at dawn", "Guard the fast during the day", "Break it at sunset"],
    correctAnswer: ["Intend the fast", "Begin fasting at dawn", "Guard the fast during the day", "Break it at sunset"],
    explanationShort: "Fasting has a daily rhythm and discipline.",
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
    scenario: "Person A avoids food but spends the day lying and harming people. Person B fasts, guards the tongue, and repents after slipping.",
    prompt: "Who better reflects the purpose of fasting?",
    options: ["Person B", "Person A", "Both equally", "Neither can learn anything"],
    correctAnswer: "Person B",
    explanationShort: "Fasting is tied to taqwa and self-restraint, not hunger alone.",
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
    prompt: "Which statement best captures a mature view of fasting?",
    options: [
      "Fasting trains the body and the heart together",
      "Fasting is mainly a diet challenge",
      "Fasting removes the need for good character",
      "Fasting matters only if it is easy"
    ],
    correctAnswer: "Fasting trains the body and the heart together",
    explanationShort: "Fasting is bodily restraint with spiritual purpose.",
    explanationLong: "The fast shapes appetite, patience, gratitude, self-control, and worship. It is not a religious version of dieting.",
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
    scenario: "At work, everyone pressures a fasting Muslim to 'just take one sip' because they say religion should be flexible.",
    prompt: "What is the best response?",
    options: [
      "Stay firm and explain gently that the fast is a real act of worship",
      "Drink to avoid awkwardness because people matter more than worship",
      "Pretend fasting is only symbolic",
      "Mock them back"
    ],
    correctAnswer: "Stay firm and explain gently that the fast is a real act of worship",
    explanationShort: "Firmness and adab can go together.",
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
    prompt: "Which is the deeper misunderstanding about fasting?",
    options: [
      "Fasting is only about avoiding food and has nothing to do with character",
      "I need more practice with the timing of suhur and iftar",
      "I want to learn more about who has exemptions",
      "I should guard my tongue more while fasting"
    ],
    correctAnswer: "Fasting is only about avoiding food and has nothing to do with character",
    explanationShort: "That mistake attacks the whole meaning of the fast.",
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
      "An obligatory payment from qualifying wealth",
      "Any nice feeling toward the poor",
      "A replacement for prayer",
      "A trip to Makkah"
    ],
    correctAnswer: "An obligatory payment from qualifying wealth",
    explanationShort: "Zakat is obligatory, not just optional kindness.",
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
      "A Muslim whose wealth reaches the required threshold",
      "Every person no matter their wealth",
      "Only scholars",
      "Only travelers"
    ],
    correctAnswer: "A Muslim whose wealth reaches the required threshold",
    explanationShort: "Zakat is tied to qualifying wealth.",
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
    prompt: "What does nisab refer to in zakat?",
    options: [
      "The minimum wealth level that makes zakat due",
      "The month of Ramadan",
      "A way to break the fast",
      "The prayer direction"
    ],
    correctAnswer: "The minimum wealth level that makes zakat due",
    explanationShort: "Nisab is the minimum qualifying amount.",
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
    prompt: "Who is a clear zakat recipient?",
    options: [
      "A poor person in need",
      "A rich person who wants more spending money",
      "Someone already wealthy and comfortable",
      "A person collecting luxury watches"
    ],
    correctAnswer: "A poor person in need",
    explanationShort: "The poor are among the clear zakat recipients.",
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
    prompt: "Which of these may be eligible for zakat?",
    options: [
      "A poor family",
      "A person crushed by legitimate debt",
      "A stranded traveler in need",
      "A wealthy celebrity"
    ],
    correctAnswer: ["A poor family", "A person crushed by legitimate debt", "A stranded traveler in need"],
    explanationShort: "Zakat goes to eligible categories, not to the already wealthy.",
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
    prompt: "Match the term to its best description.",
    pairs: [
      { left: "Zakat", right: "Obligatory payment from qualifying wealth" },
      { left: "Sadaqah", right: "Voluntary charity given beyond obligation" }
    ],
    options: [
      "Obligatory payment from qualifying wealth",
      "Voluntary charity given beyond obligation"
    ],
    correctAnswer: {
      Zakat: "Obligatory payment from qualifying wealth",
      Sadaqah: "Voluntary charity given beyond obligation"
    },
    explanationShort: "Zakat and sadaqah are both good, but they are not the same.",
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
    prompt: "Which forms of wealth are commonly counted when a person studies whether zakat is due?",
    options: ["Cash savings", "Gold or silver", "Trade goods", "A random family recipe"],
    correctAnswer: ["Cash savings", "Gold or silver", "Trade goods"],
    explanationShort: "Zakat is tied to recognized wealth, not unrelated possessions.",
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
    prompt: "Which statement carries the main mistake?",
    options: [
      "Zakat is only optional if I happen to feel generous",
      "Zakat is a pillar with rules",
      "Voluntary charity is also good",
      "Eligible recipients matter"
    ],
    correctAnswer: "Zakat is only optional if I happen to feel generous",
    explanationShort: "That statement turns a pillar into a mood.",
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
    scenario: "Person A has qualifying wealth for a full year and gives nothing. Person B has not reached the threshold and is herself in need.",
    prompt: "Who clearly has zakat due here?",
    options: ["Person A", "Person B", "Both", "Neither"],
    correctAnswer: "Person A",
    explanationShort: "Zakat follows conditions of wealth and time.",
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
    scenario: "A student asks, \"If I already give random charity, do I still need to care about zakat rules later when my wealth grows?\"",
    prompt: "What is the best answer?",
    options: [
      "Yes, because voluntary charity does not erase the separate duty of zakat",
      "No, all charity is automatically the same thing",
      "No, wealth never changes responsibility",
      "Yes, but only if other people are watching"
    ],
    correctAnswer: "Yes, because voluntary charity does not erase the separate duty of zakat",
    explanationShort: "Voluntary giving does not replace a separate obligation.",
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
    scenario: "You have one zakat payment to distribute. One candidate is a poor neighbor struggling with basics, and another is a wealthy friend wanting help for a luxury trip.",
    prompt: "Who fits the stronger zakat case?",
    options: [
      "The poor neighbor",
      "The wealthy friend",
      "Both are the same",
      "Neither because zakat has no recipients"
    ],
    correctAnswer: "The poor neighbor",
    explanationShort: "Zakat is for eligible need, not luxury desires.",
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
    prompt: "Which statement best captures the role of zakat?",
    options: [
      "It purifies wealth and serves those entitled to it under Allah's law",
      "It is a social tip with no fixed religious meaning",
      "It matters only for public image",
      "It is the same as buying expensive gifts"
    ],
    correctAnswer: "It purifies wealth and serves those entitled to it under Allah's law",
    explanationShort: "Zakat is worship, law, and social care together.",
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
    prompt: "Which misunderstanding is deeper?",
    options: [
      "Zakat is not a real duty; it is only a personal mood",
      "I need help learning the nisab concept",
      "I want to review the recipient categories again",
      "I sometimes mix up zakat and sadaqah"
    ],
    correctAnswer: "Zakat is not a real duty; it is only a personal mood",
    explanationShort: "That error denies the pillar itself.",
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
    prompt: "How many times is hajj obligatory for the Muslim who is able?",
    options: ["Once in a lifetime", "Every year", "Every month", "Never"],
    correctAnswer: "Once in a lifetime",
    explanationShort: "Hajj is obligatory once for the one who is able.",
    explanationLong: "The obligation is not yearly on everyone. It is tied to ability and becomes due once in a lifetime when those conditions are met.",
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
    explanationShort: "Ability matters in the obligation of hajj.",
    explanationLong: "Islam does not command hajj from someone who genuinely lacks the physical or financial ability required for the journey.",
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
    prompt: "The sacred state entered by the pilgrim is called ____.",
    acceptedAnswers: ["ihram"],
    correctAnswer: "Ihram",
    explanationShort: "The sacred pilgrim state is ihram.",
    explanationLong: "Ihram marks the pilgrim's entry into a state of devoted restraint and ritual focus.",
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
    prompt: "Match each place to its hajj association.",
    pairs: [
      { left: "Arafah", right: "Standing there is a central rite of hajj" },
      { left: "Makkah", right: "The Ka'bah is there" },
      { left: "Mina", right: "Pilgrims spend important days there" },
      { left: "Muzdalifah", right: "Pilgrims stop there after Arafah" }
    ],
    options: [
      "Standing there is a central rite of hajj",
      "The Ka'bah is there",
      "Pilgrims spend important days there",
      "Pilgrims stop there after Arafah"
    ],
    correctAnswer: {
      Arafah: "Standing there is a central rite of hajj",
      Makkah: "The Ka'bah is there",
      Mina: "Pilgrims spend important days there",
      Muzdalifah: "Pilgrims stop there after Arafah"
    },
    explanationShort: "Hajj happens through specific sacred places with specific rites.",
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
    prompt: "Which rite is so central that people say, 'Hajj is Arafah'?",
    options: ["Standing at Arafah", "Shopping in Madinah", "Taking photos", "Skipping the rites"],
    correctAnswer: "Standing at Arafah",
    explanationShort: "Standing at Arafah is central to hajj.",
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
    prompt: "Put these main locations in the order they come after entering the heart of the hajj journey.",
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
    scenario: "A student cannot safely afford travel and basic family needs are already strained.",
    prompt: "What is the sounder judgment?",
    options: [
      "Hajj is not yet obligatory because ability is missing",
      "They must go immediately no matter the harm",
      "They should borrow recklessly for status",
      "They should pretend hajj is not a pillar at all"
    ],
    correctAnswer: "Hajj is not yet obligatory because ability is missing",
    explanationShort: "Ability is a real condition, not a decoration.",
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
    prompt: "Which statement carries the main mistake?",
    options: [
      "I want hajj mostly for status and people admiring me",
      "I want to learn more about the rites first",
      "I know sincerity matters in worship",
      "I want to prepare financially in a halal way"
    ],
    correctAnswer: "I want hajj mostly for status and people admiring me",
    explanationShort: "Hajj is worship, not a prestige tour.",
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
    scenario: "A child asks why pilgrims enter ihram and wear simple garments.",
    prompt: "Choose the best answer.",
    options: [
      "It teaches humility, obedience, and equality before Allah",
      "It is mostly for fashion and travel photos",
      "It means pilgrims no longer need intention",
      "It shows wealth more clearly"
    ],
    correctAnswer: "It teaches humility, obedience, and equality before Allah",
    explanationShort: "Ihram carries spiritual lessons, not just travel rules.",
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
    prompt: "Hajj and Umrah are exactly the same act with no important differences.",
    options: ["True", "False"],
    correctAnswer: "False",
    explanationShort: "They are related, but not identical.",
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
    scenario: "Person A is able and keeps postponing hajj for luxury spending. Person B wants hajj badly but still lacks the means.",
    prompt: "Whose situation shows a clearer duty being delayed?",
    options: ["Person A", "Person B", "Both equally", "Neither"],
    correctAnswer: "Person A",
    explanationShort: "Ability makes the duty real.",
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
    prompt: "Which statement best summarizes hajj?",
    options: [
      "A once-in-a-lifetime pillar for the able that joins sacred rites with humility and remembrance",
      "A spiritual vacation with no fixed rules",
      "A cultural festival that can replace other pillars",
      "A status symbol for wealthy people"
    ],
    correctAnswer: "A once-in-a-lifetime pillar for the able that joins sacred rites with humility and remembrance",
    explanationShort: "That answer carries the duty, conditions, and spirit of hajj together.",
    explanationLong: "Good summaries keep the law and the meaning together: hajj is a structured pillar with deep lessons of obedience and unity.",
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
    prompt: "Which misunderstanding is deeper?",
    options: [
      "Hajj is just a status trip and not serious worship",
      "I need to review the order of major sites",
      "I want to understand ihram more clearly",
      "I am still learning who is considered able"
    ],
    correctAnswer: "Hajj is just a status trip and not serious worship",
    explanationShort: "That mistake corrupts the whole purpose of the pillar.",
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
    prompt: "Select the pillars of iman.",
    options: ["Belief in Allah", "Belief in angels", "Belief in books", "Belief in lucky charms"],
    correctAnswer: ["Belief in Allah", "Belief in angels", "Belief in books"],
    explanationShort: "The first three listed here are pillars of iman; lucky charms are not.",
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
    prompt: "Belief in divine decree is called belief in ____.",
    acceptedAnswers: ["qadar"],
    correctAnswer: "Qadar",
    explanationShort: "The term is qadar.",
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
    prompt: "Match the pillar to the belief.",
    pairs: [
      { left: "Angels", right: "Real servants of Allah created by Him" },
      { left: "Books", right: "Revealed guidance sent by Allah" },
      { left: "Messengers", right: "Chosen humans sent with revelation" },
      { left: "Last Day", right: "Resurrection, judgment, and the Hereafter" }
    ],
    options: [
      "Real servants of Allah created by Him",
      "Revealed guidance sent by Allah",
      "Chosen humans sent with revelation",
      "Resurrection, judgment, and the Hereafter"
    ],
    correctAnswer: {
      Angels: "Real servants of Allah created by Him",
      Books: "Revealed guidance sent by Allah",
      Messengers: "Chosen humans sent with revelation",
      "Last Day": "Resurrection, judgment, and the Hereafter"
    },
    explanationShort: "Each pillar points to a real belief claim.",
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
    prompt: "Which statement fits belief in angels?",
    options: [
      "Angels are real creations of Allah who obey Him",
      "Angels are only symbols for human feelings",
      "Angels replace Allah in managing the world independently",
      "Angels are myths with no place in iman"
    ],
    correctAnswer: "Angels are real creations of Allah who obey Him",
    explanationShort: "That is the sound belief about angels.",
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
    scenario: "Someone says, \"If Allah decreed everything, then my choices do not matter at all.\"",
    prompt: "What is the best response?",
    options: [
      "A Muslim believes in qadar and still takes responsibility for choices",
      "Yes, effort is pointless",
      "No, qadar is not part of iman",
      "Choices matter only when people are watching"
    ],
    correctAnswer: "A Muslim believes in qadar and still takes responsibility for choices",
    explanationShort: "Qadar does not cancel human responsibility.",
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
    prompt: "Which statement contains the main error?",
    options: [
      "The revealed books matter in iman",
      "The messengers were sent with guidance",
      "The Last Day is real",
      "Belief in angels is only a metaphor and not a real belief"
    ],
    correctAnswer: "Belief in angels is only a metaphor and not a real belief",
    explanationShort: "That statement rejects a real pillar of iman.",
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
    prompt: "What does belief in the books of Allah include?",
    options: [
      "Believing that Allah revealed guidance to His messengers",
      "Believing that every human opinion is revelation",
      "Believing that revelation ended before the prophets",
      "Believing that books are only history with no guidance"
    ],
    correctAnswer: "Believing that Allah revealed guidance to His messengers",
    explanationShort: "Belief in the books means believing in revealed guidance.",
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
    scenario: "After a difficult setback, a believer says, \"Allah knows, Allah is wise, and I still need to act rightly.\"",
    prompt: "Which pillar of iman is especially visible in that response?",
    options: ["Belief in qadar", "Belief in zakat", "Belief in hajj only", "No pillar at all"],
    correctAnswer: "Belief in qadar",
    explanationShort: "That response shows belief in divine decree with responsibility.",
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
    prompt: "Put these pillars of iman in the common learning order.",
    orderItems: ["Allah", "Angels", "Books", "Messengers", "Last Day", "Qadar"],
    correctAnswer: ["Allah", "Angels", "Books", "Messengers", "Last Day", "Qadar"],
    explanationShort: "This is the common order learners memorize them in.",
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
    scenario: "Person A says faith is only a feeling with no effect on life. Person B says iman shapes trust, worship, and accountability.",
    prompt: "Who better understands iman?",
    options: ["Person B", "Person A", "Both equally", "Neither"],
    correctAnswer: "Person B",
    explanationShort: "Iman is not a floating emotion without consequences.",
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
    prompt: "Which statement best reflects sound iman?",
    options: [
      "Believe what Allah revealed and let that belief shape trust and obedience",
      "Treat the pillars as symbolic poetry only",
      "Keep belief private so it never touches behavior",
      "Accept only the parts of revelation that feel easy"
    ],
    correctAnswer: "Believe what Allah revealed and let that belief shape trust and obedience",
    explanationShort: "Sound iman joins revealed truth and lived response.",
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
    prompt: "Which misunderstanding is deeper?",
    options: [
      "The pillars of iman are not real beliefs, only spiritual symbols",
      "I need to review the order of the six pillars",
      "I want more practice with qadar questions",
      "I am still learning the meaning of revealed books"
    ],
    correctAnswer: "The pillars of iman are not real beliefs, only spiritual symbols",
    explanationShort: "That error empties iman of its revealed content.",
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
    options: ["As-salamu alaykum", "Good luck only", "See you maybe", "Whatever comes first"],
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
    prompt: "Which phrase should a Muslim say when hearing good news?",
    options: ["Alhamdulillah", "Astaghfirullah as a greeting", "Goodbye", "No need for any dhikr"],
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
    prompt: "Before starting something good, a Muslim often says Bismillah, meaning 'In the name of ____.'",
    acceptedAnswers: ["allah"],
    correctAnswer: "Allah",
    explanationShort: "The blank is Allah.",
    explanationLong: "Saying Bismillah reminds the believer to begin with remembrance, intention, and dependence on Allah.",
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
    prompt: "Which phrase fits a future plan, like 'I will do it tomorrow, if Allah wills'?",
    options: ["In sha Allah", "Yarhamuk Allah", "Jazak Allahu khayran", "Subhan Allah only after sneezing"],
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
      { left: "Alhamdulillah", right: "Said by the one who sneezes" },
      { left: "Yarhamuk Allah", right: "Said by the listener after the sneezer praises Allah" },
      { left: "Jazak Allahu khayran", right: "Said to thank someone with dua" },
      { left: "In sha Allah", right: "Used when speaking about a future intention" }
    ],
    options: [
      "Said by the one who sneezes",
      "Said by the listener after the sneezer praises Allah",
      "Said to thank someone with dua",
      "Used when speaking about a future intention"
    ],
    correctAnswer: {
      Alhamdulillah: "Said by the one who sneezes",
      "Yarhamuk Allah": "Said by the listener after the sneezer praises Allah",
      "Jazak Allahu khayran": "Said to thank someone with dua",
      "In sha Allah": "Used when speaking about a future intention"
    },
    explanationShort: "Each phrase belongs to a different daily situation.",
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
    prompt: "A Muslim should return a greeting of peace with equal or better words.",
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
    scenario: "A friend helped you with something difficult and you want to respond with Islamic adab.",
    prompt: "Which response is best?",
    options: [
      "Jazak Allahu khayran",
      "I owe you nothing",
      "Maybe I will thank you later",
      "No words are needed"
    ],
    correctAnswer: "Jazak Allahu khayran",
    explanationShort: "That phrase thanks someone with a dua.",
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
    scenario: "Someone argues harshly with you online and you feel angry.",
    prompt: "Which response best fits Islamic manners?",
    options: [
      "Answer with restraint and truth, or leave the argument",
      "Mock them harder so you can win",
      "Spread lies because they started it",
      "Use religious phrases while insulting them"
    ],
    correctAnswer: "Answer with restraint and truth, or leave the argument",
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
    prompt: "Which actions reflect good Islamic manners?",
    options: [
      "Speaking truthfully",
      "Keeping a promise",
      "Showing kindness",
      "Lying when it is convenient"
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
    prompt: "Which statement contains the main mistake?",
    options: [
      "Islamic phrases are just decoration; the heart and manners do not matter",
      "Phrases should remind me of Allah",
      "Manners include honesty and gentleness",
      "Good words should lead to good actions"
    ],
    correctAnswer: "Islamic phrases are just decoration; the heart and manners do not matter",
    explanationShort: "That statement empties the phrases of their purpose.",
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
    scenario: "A parent calls you while you are busy with something fun.",
    prompt: "Which response best fits Islamic manners?",
    options: [
      "Answer respectfully and without rude words",
      "Ignore them because your mood matters more",
      "Shout back and say you are too busy",
      "Use a religious phrase while speaking disrespectfully"
    ],
    correctAnswer: "Answer respectfully and without rude words",
    explanationShort: "Respectful response is part of adab.",
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
    prompt: "Put this sneeze etiquette in order.",
    orderItems: [
      "The sneezer says Alhamdulillah",
      "The listener says Yarhamuk Allah",
      "The sneezer replies with a dua"
    ],
    correctAnswer: [
      "The sneezer says Alhamdulillah",
      "The listener says Yarhamuk Allah",
      "The sneezer replies with a dua"
    ],
    explanationShort: "The exchange moves in a taught order.",
    explanationLong: "Islamic manners are often structured. Learning the sequence helps the learner carry it correctly in daily life.",
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
    scenario: "Person A uses Islamic phrases often but lies, mocks, and breaks trust. Person B speaks carefully, keeps promises, and remembers Allah sincerely.",
    prompt: "Who better reflects Islamic manners?",
    options: ["Person B", "Person A", "Both equally", "Neither because phrases never matter"],
    correctAnswer: "Person B",
    explanationShort: "Words and character should support one another.",
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
    prompt: "Which summary best captures daily Islamic manners?",
    options: [
      "Remember Allah, speak truth, honor people, and answer situations with the right phrase and adab",
      "Use a few phrases and ignore how you treat people",
      "Manners matter only in the masjid",
      "Adab is mainly about sounding religious"
    ],
    correctAnswer: "Remember Allah, speak truth, honor people, and answer situations with the right phrase and adab",
    explanationShort: "That answer joins remembrance and character together.",
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
      "The final revealed book sent to Prophet Muhammad",
      "A book of poetry written by companions",
      "A collection of only stories with no guidance",
      "A book that replaced all worship"
    ],
    correctAnswer: "The final revealed book sent to Prophet Muhammad",
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
      "A bowing position in prayer",
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
    explanationShort: "Al-Fatihah opens the Quran.",
    explanationLong: "This surah is central in the Quran and in the daily prayer life of Muslims.",
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
    prompt: "The Quran should be approached with respect and attention, not carelessness.",
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
    scenario: "A student says, \"I only want to recite the Quran for sound. Meaning is not important.\"",
    prompt: "What is the best response?",
    options: [
      "Recitation is good, and learning the meaning deepens guidance even more",
      "Meaning never matters in revelation",
      "The Quran is only for scholars, not ordinary Muslims",
      "The Quran should never affect life"
    ],
    correctAnswer: "Recitation is good, and learning the meaning deepens guidance even more",
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
    prompt: "Which summary best describes healthy Quran learning?",
    options: [
      "Read, respect, understand, and let the Quran guide life",
      "Treat the Quran as beautiful sound only",
      "Treat the Quran as history with no present guidance",
      "Use the Quran only for decoration"
    ],
    correctAnswer: "Read, respect, understand, and let the Quran guide life",
    explanationShort: "Healthy Quran learning joins recitation, respect, understanding, and action.",
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
    prompt: "Where did the first revelation begin to descend to Prophet Muhammad?",
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
    prompt: "Match the prophet to the best-known event here.",
    pairs: [
      { left: "Nuh", right: "The ark and the flood" },
      { left: "Ibrahim", right: "Obedience and trust, including building the Ka'bah with Ismail" },
      { left: "Musa", right: "Sent to Pharaoh" },
      { left: "Yusuf", right: "Patience through betrayal and prison" }
    ],
    options: [
      "The ark and the flood",
      "Obedience and trust, including building the Ka'bah with Ismail",
      "Sent to Pharaoh",
      "Patience through betrayal and prison"
    ],
    correctAnswer: {
      Nuh: "The ark and the flood",
      Ibrahim: "Obedience and trust, including building the Ka'bah with Ismail",
      Musa: "Sent to Pharaoh",
      Yusuf: "Patience through betrayal and prison"
    },
    explanationShort: "Each prophet's story teaches distinct lessons.",
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
    scenario: "A learner asks, \"Why do we study the prophets? Is it just old history?\"",
    prompt: "What is the best answer?",
    options: [
      "Their lives teach faith, patience, obedience, courage, and trust in Allah",
      "They are mainly random stories with no lessons",
      "They matter only for trivia contests",
      "They replace the Quran"
    ],
    correctAnswer: "Their lives teach faith, patience, obedience, courage, and trust in Allah",
    explanationShort: "The prophets teach living lessons, not dead history.",
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
    scenario: "A person reads about Ibrahim's obedience and then says, 'The story is inspiring, but it has nothing to do with how I obey Allah now.'",
    prompt: "What is missing in that response?",
    options: [
      "The lesson of obedience is meant to shape believers now too",
      "Nothing is missing",
      "Only the lesson of travel matters",
      "Only the lesson of wealth matters"
    ],
    correctAnswer: "The lesson of obedience is meant to shape believers now too",
    explanationShort: "Seerah and prophetic stories are for guidance, not only admiration.",
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
    prompt: "Which summary best captures why seerah matters?",
    options: [
      "Seerah shows how revelation was lived through real people, trials, and choices",
      "Seerah is only dates and names with no moral weight",
      "Seerah matters only for scholars and not ordinary Muslims",
      "Seerah replaces worship and law"
    ],
    correctAnswer: "Seerah shows how revelation was lived through real people, trials, and choices",
    explanationShort: "That summary joins history and guidance together.",
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
