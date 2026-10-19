import type { Challenge, LearningBranch, LearningNode, Lesson, LessonSource } from "../types";

// "Hadith for kids": the first unit of the Hadith topic, short sayings of the Prophet ﷺ a young child can live
// by. Each quote is the English of sunnah.com word for word (the Prophet's ﷺ own words, never cut inside a
// sentence), with the reference, narrator and link checked on sunnah.com. The questions ask only what the
// card shows: the line, or the quote. Each lesson's Arabic word is in arabicTerms.ts.
// src/data/importedNotes.ts puts this unit before the hadith imported from the notes.

export const HADITH_BASICS_BRANCH_ID = "hadith-for-kids";

type Question =
  | { prompt: string; answer: string; wrong: [string, string]; explanation: string }
  | { statement: string; answer: boolean; explanation: string };

interface Saying {
  /** sunnah.com address, "bukhari:6018"; also names the lesson. */
  ref: string;
  /** As sunnah.com writes it, "Sahih al-Bukhari 6018". */
  reference: string;
  narrator: string;
  /** Only for books outside the two Sahihs, "Sahih (Al-Albani)". */
  grade?: string;
  title: string;
  line: string;
  quote: string;
  questions: Question[];
}

const SAYINGS: Saying[] = [
  {
    ref: "muslim:2626",
    reference: "Sahih Muslim 2626",
    narrator: "Abu Dharr",
    title: "A smile counts",
    // The quote is sunnah.com's wording ("a cheerful countenance"); the line says it in a child's words.
    line: "Even meeting your brother with a smile is a good deed.",
    quote: "Don't consider anything insignificant out of good things even if it is that you meet your brother with a cheerful countenance.",
    questions: [
      { prompt: "How should you meet your brother?", answer: "With a smile", wrong: ["With a frown", "With your back turned"], explanation: "Meet your brother with a smiling face." },
      { statement: "A small good deed, like a smile, does not count.", answer: false, explanation: "No good deed is too small, even a smiling face." }
    ]
  },
  {
    ref: "bukhari:28",
    reference: "Sahih al-Bukhari 28",
    narrator: "Abdullah ibn Amr",
    title: "Salam for everyone",
    line: "Feed people, and say salam to everyone you meet.",
    quote: "To feed (the poor) and greet those whom you know and those whom you don't know.",
    questions: [
      { prompt: "Who should you say salam to?", answer: "Everyone you meet", wrong: ["Only your friends", "No one at all"], explanation: "Greet those you know and those you don't know." },
      { prompt: "Besides salam, which good deed did the Prophet ﷺ name?", answer: "Feeding people", wrong: ["Sleeping late", "Keeping food to yourself"], explanation: "He said: to feed the poor, and greet people." }
    ]
  },
  {
    ref: "bukhari:6018",
    reference: "Sahih al-Bukhari 6018",
    narrator: "Abu Hurayrah",
    title: "Good words or quiet",
    line: "Say something good, or stay quiet.",
    quote:
      "Anybody who believes in Allah and the Last Day should not harm his neighbor, and anybody who believes in Allah and the Last Day should entertain his guest generously and anybody who believes in Allah and the Last Day should talk what is good or keep quiet.",
    questions: [
      { prompt: "If you can't say something good, what should you do?", answer: "Stay quiet", wrong: ["Shout louder", "Say it anyway"], explanation: "Talk what is good, or keep quiet." },
      { statement: "A believer is kind to his neighbor and his guest.", answer: true, explanation: "He does not harm his neighbor, and he is generous to his guest." }
    ]
  },
  {
    ref: "abudawud:4811",
    reference: "Sunan Abi Dawud 4811",
    narrator: "Abu Hurayrah",
    grade: "Sahih (Al-Albani)",
    title: "Say thank you",
    line: "To thank Allah well, thank people too.",
    quote: "He who does not thank the people is not thankful to Allah.",
    questions: [
      { prompt: "Your friend helps you. What should you say?", answer: "Thank you", wrong: ["Nothing at all", "Go away"], explanation: "Thank people, and you thank Allah too." },
      { statement: "Thanking people is part of thanking Allah.", answer: true, explanation: "Not thanking people means not thanking Allah, the Prophet ﷺ taught." }
    ]
  },
  {
    ref: "bukhari:5376",
    reference: "Sahih al-Bukhari 5376",
    narrator: "Umar bin Abi Salamah",
    title: "Eat the Sunnah way",
    line: "Say Bismillah and eat with your right hand.",
    quote: "O boy! Mention the Name of Allah and eat with your right hand, and eat of the dish what is nearer to you.",
    questions: [
      { prompt: "Which hand should you eat with?", answer: "Your right hand", wrong: ["Your left hand", "Both hands"], explanation: "He told a boy who was eating with him: use your right hand." },
      { prompt: "What should you say before you eat?", answer: "Bismillah", wrong: ["Goodbye", "Nothing at all"], explanation: "The Prophet ﷺ told a boy to mention Allah's name, then eat." },
      { prompt: "Which food should you take from the dish?", answer: "What is nearest to you", wrong: ["The biggest piece", "From everyone's side"], explanation: "Eat of the dish what is nearer to you." }
    ]
  },
  {
    ref: "bukhari:13",
    reference: "Sahih al-Bukhari 13",
    narrator: "Anas ibn Malik",
    title: "Want good for others",
    line: "Love for your brother what you love for yourself.",
    quote: "None of you will have faith till he wishes for his (Muslim) brother what he likes for himself.",
    questions: [
      { prompt: "What should you wish for your brother?", answer: "What you like for yourself", wrong: ["Less than you have", "Nothing at all"], explanation: "The Prophet ﷺ said it is part of true faith." },
      { statement: "True faith means wanting good things only for yourself.", answer: false, explanation: "Faith means wishing for your brother what you like for yourself." }
    ]
  },
  {
    ref: "bukhari:6114",
    reference: "Sahih al-Bukhari 6114",
    narrator: "Abu Hurayrah",
    title: "Who is really strong?",
    line: "The truly strong person controls himself when angry.",
    quote: "The strong is not the one who overcomes the people by his strength, but the strong is the one who controls himself while in anger.",
    questions: [
      { prompt: "Who is truly strong?", answer: "The one who controls his anger", wrong: ["The one who wins every fight", "The one who shouts loudest"], explanation: "The strong one controls himself while angry." },
      { statement: "Beating others in a fight makes you truly strong.", answer: false, explanation: "The strong one controls himself while angry." }
    ]
  },
  {
    ref: "bukhari:69",
    reference: "Sahih al-Bukhari 69",
    narrator: "Anas ibn Malik",
    title: "Make it easy",
    line: "Make things easy for people, not hard.",
    quote: "Facilitate things to people (concerning religious matters), and do not make it hard for them and give them good tidings and do not make them run away (from Islam).",
    questions: [
      { prompt: "What did the Prophet ﷺ tell us to do for people?", answer: "Make things easy", wrong: ["Make things hard", "Scare them away"], explanation: "Make things easy for people, not hard." },
      { prompt: "What should we give people, the Prophet ﷺ said?", answer: "Good news", wrong: ["Bad news", "A hard time"], explanation: "He said: give good tidings, and do not make people run away." }
    ]
  },
  {
    ref: "bukhari:5027",
    reference: "Sahih al-Bukhari 5027",
    narrator: "Uthman ibn Affan",
    title: "Learn and teach Quran",
    line: "The best of you learn the Quran and teach it.",
    quote: "The best among you (Muslims) are those who learn the Qur'an and teach it.",
    questions: [
      { prompt: "Who are the best among us?", answer: "Those who learn and teach the Quran", wrong: ["Those with the most toys", "Those who run the fastest"], explanation: "So learn the Quran, and teach what you learn to others." },
      { statement: "Once you learn the Quran, you should keep it to yourself.", answer: false, explanation: "The best learn the Quran and teach it." }
    ]
  },
  {
    ref: "muslim:2564c",
    reference: "Sahih Muslim 2564c",
    narrator: "Abu Hurayrah",
    title: "Allah sees the heart",
    line: "Allah looks at your heart and deeds, not your looks.",
    quote: "Verily Allah does not look to your faces and your wealth but He looks to your heart and to your deeds.",
    questions: [
      { prompt: "What does Allah look at?", answer: "Your heart and your deeds", wrong: ["Your clothes", "Your money"], explanation: "Not at your face or your wealth, but at your heart and deeds." },
      { statement: "Allah cares most about how pretty or rich you are.", answer: false, explanation: "Allah does not look at faces and wealth, but at hearts and deeds." }
    ]
  }
];

const slugOf = (ref: string) => ref.replace(":", "-");
export const hadithBasicsNodeId = (ref: string) => `${HADITH_BASICS_BRANCH_ID}-${slugOf(ref)}`;

function sourceOf(saying: Saying, lessonId: string): LessonSource {
  return {
    id: `${lessonId.replace(/-/g, "_")}_src_1`,
    site: "Sunnah.com",
    category: "hadith",
    // The learn card's chip shows this short reference, never an article title.
    title: saying.reference,
    url: `https://sunnah.com/${saying.ref}`,
    reference: saying.reference,
    from: saying.narrator,
    grade: saying.grade ?? "Sahih",
    summary: `The Prophet ﷺ said: ${saying.quote}`
  };
}

// The right answer moves around the tiles, so its place gives nothing away.
function challengesOf(saying: Saying, lessonId: string, nodeId: string, source: LessonSource, index: number): Challenge[] {
  return saying.questions.map((question, number) => {
    const base = {
      id: `${lessonId}_q${number + 1}`,
      explanation: question.explanation,
      sourceNodeId: nodeId,
      sourceLessonId: lessonId,
      resourceLabel: "Open source",
      resourceUrl: source.url
    };
    if ("statement" in question) {
      return {
        ...base,
        type: "true_false",
        prompt: question.statement,
        choices: [
          { id: "true", label: "True" },
          { id: "false", label: "False" }
        ],
        correctChoiceId: question.answer ? "true" : "false"
      };
    }
    const labels = [question.answer, ...question.wrong];
    const shift = (index + number + 1) % labels.length;
    const ordered = labels.map((_, slot) => labels[(slot + shift) % labels.length]);
    const choices = ordered.map((label, slot) => ({ id: String.fromCharCode(97 + slot), label }));
    return {
      ...base,
      type: "multiple_choice",
      prompt: question.prompt,
      choices,
      correctChoiceId: choices.find((choice) => choice.label === question.answer)!.id
    };
  });
}

function buildHadithBasics() {
  const branch: LearningBranch = {
    id: HADITH_BASICS_BRANCH_ID,
    topicId: "hadith",
    title: "Hadith for kids",
    description: "Short sayings of the Prophet ﷺ to live by every day.",
    difficultyRange: { start: 1, end: 1 },
    sourceReferences: []
  };
  const nodes: LearningNode[] = [];
  const lessonsById: Record<string, Lesson> = {};

  SAYINGS.forEach((saying, index) => {
    const nodeId = hadithBasicsNodeId(saying.ref);
    const lessonId = `lesson-${nodeId}`;
    const source = sourceOf(saying, lessonId);
    const previous = nodes[nodes.length - 1];
    nodes.push({
      id: nodeId,
      skillId: `skill_hadith_${HADITH_BASICS_BRANCH_ID}_${index + 1}`,
      title: saying.title,
      topicId: "hadith",
      branchId: HADITH_BASICS_BRANCH_ID,
      kind: "skill",
      lessonIds: [lessonId],
      requiredNodeIds: previous ? [previous.id] : [],
      xpReward: 10,
      starsReward: 3,
      order: index + 1,
      difficulty: 1,
      sourceReferences: [source],
      masteryState: "new",
      masteryTestEligible: false
    });
    lessonsById[lessonId] = {
      id: lessonId,
      nodeId,
      branchId: HADITH_BASICS_BRANCH_ID,
      title: saying.title,
      intro: saying.line,
      explanationContent: saying.quote,
      learnLine: saying.line,
      quote: { text: saying.quote, reference: saying.grade ? `${saying.reference} (${saying.grade.replace(/\s*\(([^)]+)\)$/, ", $1")})` : saying.reference },
      learnSource: source,
      lessonType: "skill",
      difficulty: 1,
      xpReward: 10,
      sources: [source],
      sourceReferences: [source],
      unlockRules: previous ? [`Complete ${previous.title}`] : [],
      masteryState: "learning",
      masteryTestEligible: false,
      challenges: challengesOf(saying, lessonId, nodeId, source, index)
    };
  });

  return { branch, nodes, lessonsById };
}

/** The "Hadith for kids" unit: its branch, its nodes in path order and their lessons. */
export const HADITH_BASICS = buildHadithBasics();
