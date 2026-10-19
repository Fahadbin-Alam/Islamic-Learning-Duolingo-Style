import {
  LIBRARY_TOPICS,
  TEST_OUT_MAX_QUESTIONS,
  answerShowsInText,
  canTestOut,
  completeLesson,
  completeLessonCluster,
  createTestOutSession,
  getTestOutPlan,
  learningApi,
  pickTestOutChallenges,
  testOutPassingScore
} from "../api/islamicLearningApi";
import { COURSE, LESSONS_BY_ID } from "../data/course";
import type { Challenge, LearningSection, Lesson, UserProfile } from "../types";
import { makeUser } from "./testUtils";

const pathOrder = (section: LearningSection) => section.branches.flatMap((branch) => section.nodes.filter((node) => node.branchId === branch.id));
const unitsOf = (section: LearningSection) =>
  section.branches.map((branch) => section.nodes.filter((node) => node.branchId === branch.id)).filter((nodes) => nodes.length > 0);
const sectionOf = (topicId: string) => COURSE.sections.find((section) => section.topicId === topicId)!;
const statusesFor = (user: UserProfile) => new Map(learningApi.getPathNodes(user).map((node) => [node.id, node.status]));
const passPlan = (user: UserProfile, branchId: string) => {
  const plan = getTestOutPlan(user, branchId)!;
  const session = createTestOutSession({ branchTitle: branchId, branchId, lessons: plan.lessons, nodeIds: plan.nodeIds, heartsAtStart: 5 });
  return completeLessonCluster(user, plan.lessons, session.lesson.xpReward);
};

function mc(id: string, prompt: string, labels: string[], right = 0): Challenge {
  return {
    id,
    type: "multiple_choice",
    prompt,
    choices: labels.map((label, index) => ({ id: `${id}_${index}`, label })),
    correctChoiceId: `${id}_${right}`,
    explanation: ""
  };
}

function tf(id: string, prompt: string, isTrue: boolean): Challenge {
  return {
    id,
    type: "true_false",
    prompt,
    choices: [
      { id: "true", label: "True" },
      { id: "false", label: "False" }
    ],
    correctChoiceId: isTrue ? "true" : "false",
    explanation: ""
  };
}

function lesson(id: string, challenges: Challenge[]): Lesson {
  return { id, nodeId: `node-${id}`, title: id, intro: "", xpReward: 10, sources: [], challenges };
}

describe("library topics: every unit can be started", () => {
  it("opens the next circle of every unit and puts the START bubble on the first one", () => {
    const statuses = statusesFor(makeUser());

    expect(LIBRARY_TOPICS.has("quran_tafseer")).toBe(true);
    for (const topicId of LIBRARY_TOPICS) {
      const section = sectionOf(topicId);
      const units = unitsOf(section).filter((nodes) => !section.branches.find((branch) => branch.id === nodes[0].branchId)?.premiumOnly);

      expect(units.map((nodes) => statuses.get(nodes[0].id))).toEqual(units.map((_, index) => (index === 0 ? "current" : "available")));
      // Inside a unit the circles still go in order.
      expect(units.flatMap((nodes) => nodes.slice(1)).every((node) => statuses.get(node.id) === "locked")).toBe(true);
    }
  });

  it("lets a learner start a later surah or companion, then walks that unit in order", async () => {
    const quran = sectionOf("quran_tafseer");
    const lastUnit = unitsOf(quran)[unitsOf(quran).length - 1];
    const first = learningApi.getPathNodes(makeUser()).find((node) => node.id === lastUnit[0].id)!;

    expect(first.status).toBe("available");
    const session = await learningApi.getLessonSession(first.firstLessonId, makeUser());
    const user = completeLesson(makeUser(), session.lesson);
    const statuses = statusesFor(user);

    expect(statuses.get(lastUnit[0].id)).toBe("completed");
    expect(statuses.get(lastUnit[1].id)).toBe("available");
    expect(lastUnit.slice(2).every((node) => statuses.get(node.id) === "locked")).toBe(true);
    // The START bubble stays on the first open circle in path order.
    expect(statuses.get(pathOrder(quran)[0].id)).toBe("current");
  });

  it("has a test-out for every unfinished unit, and passing one finishes just that unit", () => {
    const sahabah = sectionOf("sahabah");
    const units = unitsOf(sahabah);
    const later = units[units.length - 1];
    const plan = getTestOutPlan(makeUser(), later[0].branchId)!;

    expect(plan.kind).toBe("unit");
    expect(plan.nodeIds).toEqual(later.map((node) => node.id));
    expect(canTestOut(plan.lessons)).toBe(true);

    const statuses = statusesFor(passPlan(makeUser(), later[0].branchId));
    expect(later.every((node) => statuses.get(node.id) === "completed")).toBe(true);
    expect(statuses.get(units[0][0].id)).toBe("current");
    expect(units[1].slice(1).every((node) => statuses.get(node.id) === "locked")).toBe(true);
  });
});

describe("skill topics: taught in order", () => {
  const skills = COURSE.sections.filter((section) => !LIBRARY_TOPICS.has(section.topicId));

  it("open one circle at a time, the first not done in path order", () => {
    const fresh = statusesFor(makeUser());

    expect(skills.map((section) => section.topicId)).toEqual(expect.arrayContaining(["foundation", "prayer", "aqidah", "fasting", "zakat", "hajj", "manners"]));
    for (const section of skills) {
      const open = pathOrder(section).filter((node) => fresh.get(node.id) !== "locked");
      expect(open.map((node) => [node.id, fresh.get(node.id)])).toEqual([[pathOrder(section)[0].id, "current"]]);
    }

    // Halfway through a unit: the next circle on the path is the one open, and nothing after it.
    const prayer = pathOrder(sectionOf("prayer"));
    const statuses = statusesFor(makeUser({ completedNodeIds: prayer.slice(0, 5).map((node) => node.id) }));
    expect(prayer.map((node) => statuses.get(node.id)).slice(0, 7)).toEqual(["completed", "completed", "completed", "completed", "completed", "current", "locked"]);
  });

  it("keeps premium units shut to free learners in every topic", () => {
    const statuses = statusesFor(makeUser());

    for (const section of COURSE.sections) {
      for (const branch of section.branches.filter((item) => item.premiumOnly)) {
        expect(section.nodes.filter((node) => node.branchId === branch.id).every((node) => statuses.get(node.id) === "locked")).toBe(true);
        expect(getTestOutPlan(makeUser(), branch.id)).toBeUndefined();
      }
    }
  });

  it("offers JUMP HERE on a locked unit: the test covers the circles before it, and passing opens it", () => {
    const prayer = sectionOf("prayer");
    const units = unitsOf(prayer);
    const target = units[2];
    const plan = getTestOutPlan(makeUser(), target[0].branchId)!;

    expect(plan.kind).toBe("jump");
    expect(plan.nodeIds).toEqual([...units[0], ...units[1]].map((node) => node.id));
    expect(canTestOut(plan.lessons)).toBe(true);

    const statuses = statusesFor(passPlan(makeUser(), target[0].branchId));
    expect(statuses.get(target[0].id)).toBe("current");
    expect(target.slice(1).every((node) => statuses.get(node.id) === "locked")).toBe(true);
  });

  it("tests the unit itself once it holds the current circle, and has nothing for a finished unit", () => {
    const foundation = unitsOf(sectionOf("foundation"));
    const plan = getTestOutPlan(makeUser(), foundation[0][0].branchId)!;

    expect(plan.kind).toBe("unit");
    expect(plan.nodeIds).toEqual(foundation[0].map((node) => node.id));
    expect(getTestOutPlan(makeUser({ completedNodeIds: foundation[0].map((node) => node.id) }), foundation[0][0].branchId)).toBeUndefined();
  });
});

describe("test-out questions test knowledge, not word matching", () => {
  it("spots an answer that can be matched by its words", () => {
    // The answer repeats the prompt's words and no other choice does.
    expect(answerShowsInText(mc("a", "“Rinsing the mouth is part of the order.” What is this about?", ["Rinse the mouth", "Fard acts of wudu", "Why wudu matters"]))).toBe(true);
    expect(answerShowsInText(mc("b", "“The feet complete the main body sequence.” What is this about?", ["Wash the feet", "Bathroom etiquette", "What wudu is"]))).toBe(true);
    expect(answerShowsInText(mc("c", "Who was the father of Ammar ibn Yasir?", ["Yasir ibn Amir", "Walid ibn al-Mughira", "Umayr ibn Hashim"]))).toBe(true);
    // Every choice shares the word, the answer is a gap, or it is true or false: nothing to match.
    expect(answerShowsInText(mc("d", "Which hand cleans you in the toilet?", ["The left hand", "The right hand", "The eating hand"]))).toBe(false);
    expect(answerShowsInText(mc("e", "Wudu starts by washing your ____.", ["hands", "face", "feet"]))).toBe(false);
    expect(answerShowsInText(tf("f", "Wudu is the washing we do before salah.", true))).toBe(false);
    // Another question's prompt can give the answer away too.
    expect(answerShowsInText(mc("g", "Wipe your ____ with wet hands.", ["head", "back", "knees"]), "The Quran names four parts: face, arms, head and feet.")).toBe(true);
  });

  it("never asks a matchable question, takes each lesson's own questions and mixes the kinds", () => {
    const lessons = Array.from({ length: 6 }, (_, index) =>
      lesson(`l${index}`, [
        mc(`l${index}_match`, `“Step ${index} is washing the arms${index}.” What is this about?`, [`Wash the arms${index}`, "Other thing", "Something else"]),
        { ...mc(`l${index}_copy`, `Copied question ${index}?`, ["x", "y", "z"]), isReview: true },
        mc(`l${index}_fill`, `Fill ${index}: the answer is ____.`, [`answer${index}`, "wrong", "other"]),
        tf(`l${index}_tf`, `Statement number ${index} is right.`, index % 2 === 0)
      ])
    );
    const picks = pickTestOutChallenges(lessons);
    const ids = picks.map((pick) => pick.challenge.id);

    expect(ids.length).toBe(6);
    expect(ids.some((id) => id.endsWith("_match"))).toBe(false);
    expect(ids.some((id) => id.endsWith("_copy"))).toBe(false);
    expect(new Set(picks.map((pick) => pick.lesson.id)).size).toBe(6);
    expect(ids.filter((id) => id.endsWith("_fill")).length).toBe(3);
    expect(ids.filter((id) => id.endsWith("_tf")).length).toBe(3);
  });

  it("asks one question from each of 8 lessons spread over a long unit", () => {
    const lessons = Array.from({ length: 24 }, (_, index) => lesson(`l${index}`, [mc(`q${index}`, `Question ${index} has a gap: ____.`, [`a${index}`, "b", "c"])]));
    const picks = pickTestOutChallenges(lessons);
    const positions = picks.map((pick) => lessons.indexOf(pick.lesson));

    expect(picks).toHaveLength(TEST_OUT_MAX_QUESTIONS);
    expect(positions[0]).toBe(0);
    expect(positions[positions.length - 1]).toBeGreaterThanOrEqual(20);
    expect(new Set(positions).size).toBe(TEST_OUT_MAX_QUESTIONS);
  });

  it("keeps every course test-out free of matchable answers, with a pass mark that fits its length", () => {
    const user = makeUser();
    const problems: string[] = [];

    for (const section of COURSE.sections) {
      for (const branch of section.branches) {
        const plan = getTestOutPlan(user, branch.id);

        if (!plan || !canTestOut(plan.lessons)) {
          continue;
        }

        const session = createTestOutSession({ branchTitle: branch.title, branchId: branch.id, lessons: plan.lessons, nodeIds: plan.nodeIds, heartsAtStart: 5 });
        const count = session.lesson.challenges.length;
        const usable = plan.lessons.flatMap((item) => item.challenges).filter((challenge) => !answerShowsInText(challenge));

        problems.push(...session.lesson.challenges.filter((challenge) => answerShowsInText(challenge)).map((challenge) => `${branch.id}: ${challenge.prompt}`));
        expect(session.passingScore).toBe(testOutPassingScore(count));
        // At least 5 questions whenever the lessons have them, so one slip still passes.
        if (new Set(usable.map((challenge) => challenge.prompt)).size >= 5) {
          expect(count).toBeGreaterThanOrEqual(5);
          expect(session.passingScore).toBeLessThan(count);
        }
      }
    }

    expect(problems).toEqual([]);
  });

  it("mixes kinds in the Wudu test and asks each lesson's own question once", () => {
    const wudu = unitsOf(sectionOf("prayer"))[0];
    const plan = getTestOutPlan(makeUser(), wudu[0].branchId)!;
    const session = createTestOutSession({ branchTitle: "Wudu", branchId: plan.branchId, lessons: plan.lessons, nodeIds: plan.nodeIds, heartsAtStart: 5 });
    const types = new Set(session.lesson.challenges.map((challenge) => challenge.type));
    const sources = session.lesson.challenges.map((challenge) => challenge.sourceLessonId);

    expect(types.size).toBeGreaterThan(1);
    expect(new Set(sources).size).toBe(sources.length);
    expect(session.lesson.challenges.every((challenge) => challenge.isReview === false)).toBe(true);
  });
});

describe("a test-out says it is a test, and TRY AGAIN is a new one", () => {
  const wudu = unitsOf(sectionOf("prayer"))[0];
  const plan = getTestOutPlan(makeUser(), wudu[0].branchId)!;
  const start = (lessons: Lesson[], attempt?: number) =>
    createTestOutSession({ branchTitle: "Wudu", branchId: plan.branchId, lessons, nodeIds: plan.nodeIds, heartsAtStart: 5, attempt });
  const baseId = (challenge: Challenge) => challenge.id.replace(/^test_out_.+?_\d+_/, "");

  it("carries a test flag, the try number and its pass mark", () => {
    const session = start(plan.lessons);

    expect(session.mode).toBe("test_out");
    expect(session.isTest).toBe(true);
    expect(session.attempt).toBe(0);
    expect(session.passingScore).toBe(testOutPassingScore(session.lesson.challenges.length));
    expect(start(plan.lessons, 1).attempt).toBe(1);
  });

  it("asks other questions on the next try of a long unit", () => {
    const first = start(plan.lessons, 0).lesson.challenges.map(baseId);
    const second = start(plan.lessons, 1).lesson.challenges.map(baseId);

    expect(second.length).toBe(first.length);
    expect(second.filter((id) => first.includes(id))).toEqual([]);
  });

  it("changes the question and choice order even when a small unit has nothing new to ask", () => {
    const small = [
      lesson("s1", [mc("s1q", "First gap: ____.", ["one", "two", "three"])]),
      lesson("s2", [mc("s2q", "Second gap: ____.", ["four", "five", "six"])]),
      lesson("s3", [mc("s3q", "Third gap: ____.", ["seven", "eight", "nine"])])
    ];
    const tries = [0, 1, 2].map((attempt) => start(small, attempt).lesson.challenges);

    for (let index = 1; index < tries.length; index += 1) {
      const before = tries[index - 1];
      const after = tries[index];
      expect(after.map(baseId).sort()).toEqual(before.map(baseId).sort());
      expect(baseId(after[0])).not.toBe(baseId(before[0]));
      for (const challenge of after) {
        const previous = before.find((item) => baseId(item) === baseId(challenge))!;
        expect(challenge.choices.map((choice) => choice.id)).not.toEqual(previous.choices.map((choice) => choice.id));
        expect(challenge.correctChoiceId).toBe(previous.correctChoiceId);
      }
    }
  });
});

describe("review questions inside a lesson", () => {
  it("marks the question added from the lesson before as a review", async () => {
    let checked = 0;

    for (const section of COURSE.sections) {
      for (const node of section.nodes) {
        const own = LESSONS_BY_ID[node.lessonIds[0]];
        const session = await learningApi.getLessonSession(own.id, makeUser());
        const added = session.lesson.challenges.slice(own.challenges.length);

        if (added.length) {
          checked += 1;
          expect(added.every((challenge) => challenge.isReview === true)).toBe(true);
          expect(added.every((challenge) => challenge.sourceLessonId !== own.id)).toBe(true);
        }
      }

      if (checked > 20) {
        break;
      }
    }

    expect(checked).toBeGreaterThan(0);
  });
});
