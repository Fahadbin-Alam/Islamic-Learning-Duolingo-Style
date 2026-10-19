import {
  canTestOut,
  completeLesson,
  completeLessonCluster,
  createTestOutSession,
  getTestOutPlan,
  getTestOutXp,
  learningApi,
  LIBRARY_TOPICS,
  PRACTICE_XP_PER_CORRECT_ANSWER,
  TEST_OUT_MAX_QUESTIONS,
  TEST_OUT_MIN_QUESTIONS,
  testOutPassingScore
} from "../api/islamicLearningApi";
import { COURSE, LESSONS_BY_ID, allNodes } from "../data/course";
import type { Challenge } from "../types";
import { isPlayablePractice, seededShuffle } from "../ui/lesson";
import { makeUser } from "./testUtils";

// The lesson screens play sounds; this file only needs the order game's shuffle.
jest.mock("../services/gameAudio", () => ({
  playGameSound: jest.fn(),
  primeGameAudio: jest.fn(() => true)
}));

describe("path node unlocking", () => {
  it("gives a fresh learner a current node and keeps prerequisite nodes locked", () => {
    const nodes = learningApi.getPathNodes(makeUser());
    const byId = new Map(nodes.map((node) => [node.id, node]));

    expect(nodes).toHaveLength(allNodes.length);
    expect(byId.get("foundation-niyyah")?.status).toBe("current");
    expect(byId.get("foundation-guidance")?.status).toBe("locked");
    expect(nodes.some((node) => node.status === "completed")).toBe(false);
  });

  it("unlocks the next node after its prerequisite lesson is completed", () => {
    const user = completeLesson(makeUser(), LESSONS_BY_ID["lesson-foundation-niyyah"]);
    const byId = new Map(learningApi.getPathNodes(user).map((node) => [node.id, node]));

    expect(byId.get("foundation-niyyah")?.status).toBe("completed");
    expect(byId.get("foundation-character")?.status).toBe("current");
    expect(byId.get("foundation-guidance")?.status).toBe("locked");
  });

  it("unlocks in the same order the path shows", () => {
    // Each node needs the one before it on the path, or nothing when its unit starts a new
    // independent track (a surah, a companion, a hadith).
    const problems: string[] = [];
    for (const section of COURSE.sections) {
      const ordered = section.branches.flatMap((branch) => section.nodes.filter((node) => node.branchId === branch.id));
      expect(ordered.map((node) => node.id)).toEqual(section.nodes.map((node) => node.id));
      ordered.forEach((node, index) => {
        const previous = ordered[index - 1];
        const startsUnit = !previous || previous.branchId !== node.branchId;
        const ok = startsUnit
          ? node.requiredNodeIds.length === 0 || (node.requiredNodeIds.length === 1 && node.requiredNodeIds[0] === previous?.id)
          : node.requiredNodeIds.length === 1 && node.requiredNodeIds[0] === previous.id;
        if (!ok) problems.push(`${node.id} needs ${node.requiredNodeIds.join(", ") || "nothing"} but follows ${previous?.id}`);
      });
    }
    expect(problems).toEqual([]);
  });

  it("opens only the first unit of a topic that is taught in order", () => {
    const nodes = learningApi.getPathNodes(makeUser());
    for (const topicId of ["foundation", "prayer", "aqidah", "manners", "fasting", "zakat", "hajj", "marriage"]) {
      expect(nodes.filter((node) => node.topicId === topicId && node.status !== "locked")).toHaveLength(1);
    }
  });

  it("has one circle to play next per topic, in path order, even where units start new tracks", () => {
    const user = makeUser();
    const nodes = learningApi.getPathNodes(user);

    for (const section of COURSE.sections) {
      const ordered = section.branches.flatMap((branch) => section.nodes.filter((node) => node.branchId === branch.id));
      const open = nodes.filter((node) => node.topicId === section.topicId && node.status !== "locked" && node.status !== "completed");
      const units = section.branches.filter((branch) => ordered.some((node) => node.branchId === branch.id));
      // A library topic (Quran, Sahabah, Prophets, Women, Hadith) also opens the first circle of each later unit,
      // except a gated one, which waits for the unit before it.
      const opened = LIBRARY_TOPICS.has(section.topicId) ? units.filter((branch, index) => index === 0 || !branch.gated).length : 1;
      expect(open.map((node) => node.status)).toEqual(["current", ...Array(opened - 1).fill("available")]);
      expect(open[0].id).toBe(ordered[0].id);
    }
    // Only one START bubble per topic, even where every unit is open.
    expect(nodes.filter((node) => node.topicId === "sahabah" && node.status === "current")).toHaveLength(1);
    expect(nodes.filter((node) => node.topicId === "quran_tafseer" && node.status === "current")).toHaveLength(1);
  });

  it("moves the current circle on, past a premium unit the learner cannot open", () => {
    const prayer = COURSE.sections.find((section) => section.topicId === "prayer")!;
    const premiumBranch = prayer.branches.find((branch) => branch.premiumOnly)!;
    const before = prayer.branches.flatMap((branch) => (branch.id === premiumBranch.id ? [] : prayer.nodes.filter((node) => node.branchId === branch.id)));
    const ids = before.map((node) => node.id);
    const free = makeUser({ completedNodeIds: ids });
    const freeNodes = learningApi.getPathNodes(free).filter((node) => node.topicId === "prayer");

    expect(freeNodes.filter((node) => node.branchId === premiumBranch.id).every((node) => node.status === "locked")).toBe(true);

    const member = makeUser({ completedNodeIds: ids, activeSubscriptionId: "premium" });
    const memberCurrent = learningApi.getPathNodes(member).filter((node) => node.topicId === "prayer" && node.status === "current");
    expect(memberCurrent.map((node) => node.branchId)).toEqual([premiumBranch.id]);
  });

  it("has at most one current node per branch", () => {
    const nodes = learningApi.getPathNodes(makeUser());
    const currentPerBranch = new Map<string, number>();

    for (const node of nodes.filter((item) => item.status === "current")) {
      currentPerBranch.set(node.branchId, (currentPerBranch.get(node.branchId) ?? 0) + 1);
    }

    expect(Math.max(...currentPerBranch.values())).toBe(1);
  });
});

describe("course content integrity", () => {
  it("only references lessons and prerequisite nodes that exist", () => {
    const nodeIds = new Set(allNodes.map((node) => node.id));

    for (const node of allNodes) {
      for (const lessonId of node.lessonIds) {
        expect(LESSONS_BY_ID[lessonId]).toBeDefined();
      }
      for (const requiredId of node.requiredNodeIds) {
        expect(nodeIds.has(requiredId)).toBe(true);
      }
    }
  });

  it("gives every multiple-choice challenge a correct answer among its choices", () => {
    for (const lesson of Object.values(LESSONS_BY_ID)) {
      for (const challenge of lesson.challenges) {
        if (challenge.type === "multiple_choice") {
          expect(challenge.choices.map((choice) => choice.id)).toContain(challenge.correctChoiceId);
        }
      }
    }
  });
});

describe("getLessonSession", () => {
  it("builds a playable session that remembers the starting hearts", async () => {
    const user = makeUser({ hearts: { ...makeUser().hearts, current: 3 } });
    const session = await learningApi.getLessonSession("lesson-foundation-niyyah", user);

    expect(session.heartsAtStart).toBe(3);
    expect(session.lesson.id).toBe("lesson-foundation-niyyah");
    expect(session.lesson.challenges.length).toBeGreaterThan(0);
  });

  it("adds one question from the lesson before, and extra XP, to later lessons", async () => {
    const hardNode = COURSE.sections[0].nodes.find((node) => (node.difficulty ?? 0) >= 5);
    expect(hardNode).toBeDefined();
    const lessonId = hardNode!.lessonIds[0];
    const previousNode = allNodes.find((node) => node.id === hardNode!.requiredNodeIds[0])!;
    const previousPrompts = LESSONS_BY_ID[previousNode.lessonIds[0]].challenges.map((challenge) => challenge.prompt);
    const session = await learningApi.getLessonSession(lessonId, makeUser());
    const added = session.lesson.challenges.slice(LESSONS_BY_ID[lessonId].challenges.length);

    expect(added).toHaveLength(1);
    expect(previousPrompts).toContain(added[0].prompt);
    expect(session.lesson.xpReward).toBe(LESSONS_BY_ID[lessonId].xpReward + 2);
  });

  it("asks only the course's own questions, with their own choices", async () => {
    // The session may reuse a question from the lesson before, but never adds, cuts or rewrites a choice.
    const asked = (challenge: Challenge) => `${challenge.prompt} => ${challenge.choices.map((choice) => choice.label).join(" | ")}`;
    const courseQuestions = new Set(Object.values(LESSONS_BY_ID).flatMap((lesson) => lesson.challenges).map(asked));
    const problems: string[] = [];
    for (const node of allNodes) {
      const session = await learningApi.getLessonSession(node.lessonIds[0], makeUser());
      problems.push(...session.lesson.challenges.filter((challenge) => !courseQuestions.has(asked(challenge))).map((challenge) => challenge.id));
    }
    expect(problems).toEqual([]);
  });

  it("plays the ordering game only in lessons about an order, each starting from its own scramble", async () => {
    const games: { nodeId: string; bank: string }[] = [];
    for (const node of allNodes) {
      const session = await learningApi.getLessonSession(node.lessonIds[0], makeUser());
      for (const activity of (session.lesson.practiceActivities ?? []).filter(isPlayablePractice)) {
        const bank = seededShuffle(activity.options ?? [], activity.correctOrderIds ?? []).map((option) => option.id);
        // The first tile on screen is never the first step, so the answer is not handed over.
        expect(bank[0]).not.toBe(activity.correctOrderIds?.[0]);
        games.push({ nodeId: node.id, bank: bank.join(",") });
      }
    }
    expect(games.length).toBeGreaterThan(5);
    expect(games.every(({ nodeId }) => /^prayer-(wudu|salah-basics|ruku-and-sujud|tashahhud|review-and-mastery)-/.test(nodeId))).toBe(true);
    expect(games.map(({ nodeId }) => nodeId)).not.toContain("prayer-khushu-what-khushu-is");
    expect(games.map(({ nodeId }) => nodeId)).not.toContain("prayer-times-fajr-to-isha");
    expect(new Set(games.map(({ bank }) => bank)).size).toBe(games.length);
  });

  it("rejects unknown lessons", async () => {
    await expect(learningApi.getLessonSession("lesson-does-not-exist", makeUser())).rejects.toThrow("Unknown lesson");
  });
});

describe("createTestOutSession", () => {
  const branch = COURSE.sections[0].branches.find((item) =>
    COURSE.sections[0].nodes.filter((node) => node.branchId === item.id).length > 1
  )!;
  const nodes = COURSE.sections[0].nodes.filter((node) => node.branchId === branch.id);
  const lessons = nodes.flatMap((node) => node.lessonIds.map((id) => LESSONS_BY_ID[id]));

  it("asks 3 to 10 questions, skips every lesson it covers, and needs 80% to pass", () => {
    const session = createTestOutSession({
      branchTitle: branch.title,
      branchId: branch.id,
      lessons,
      nodeIds: nodes.map((node) => node.id),
      heartsAtStart: 5
    });
    const challengeCount = session.lesson.challenges.length;

    expect(session.mode).toBe("test_out");
    expect(session.targetLessonIds).toEqual(lessons.map((lesson) => lesson.id));
    expect(challengeCount).toBeGreaterThanOrEqual(TEST_OUT_MIN_QUESTIONS);
    expect(challengeCount).toBeLessThanOrEqual(TEST_OUT_MAX_QUESTIONS);
    expect(session.passingScore).toBe(Math.min(challengeCount, Math.max(3, Math.ceil(challengeCount * 0.8))));
  });

  it("can always be passed: the pass mark is never more than the questions", () => {
    for (let count = TEST_OUT_MIN_QUESTIONS; count <= TEST_OUT_MAX_QUESTIONS; count += 1) {
      expect(testOutPassingScore(count)).toBeLessThanOrEqual(count);
      expect(testOutPassingScore(count)).toBeGreaterThanOrEqual(Math.ceil(count * 0.8));
    }
  });

  it("tests a new learner's first unit, locked circles included, with no prompt asked twice", () => {
    // A fresh learner: only the first Wudu circle is open, the rest of the unit is locked.
    const user = makeUser();
    const prayerNodes = learningApi.getPathNodes(user).filter((node) => node.topicId === "prayer");
    const unit = prayerNodes.filter((node) => node.branchId === prayerNodes[0].branchId);
    const plan = getTestOutPlan(user, unit[0].branchId)!;

    // A long unit is tested 10 circles at a time, one question about each.
    expect(unit.length).toBeGreaterThan(TEST_OUT_MAX_QUESTIONS);
    expect(plan.nodeIds).toEqual(unit.slice(0, TEST_OUT_MAX_QUESTIONS).map((node) => node.id));
    expect(unit.filter((node) => plan.nodeIds.includes(node.id) && node.status === "locked").length).toBeGreaterThan(0);
    expect(canTestOut(plan.lessons)).toBe(true);
    expect(canTestOut(unit.flatMap((node) => node.lessonIds.map((id) => LESSONS_BY_ID[id])))).toBe(false);

    const session = createTestOutSession({ branchTitle: "Wudu", branchId: unit[0].branchId, lessons: plan.lessons, nodeIds: plan.nodeIds, heartsAtStart: 5 });
    const prompts = session.lesson.challenges.map((challenge) => challenge.prompt.trim().toLowerCase());
    expect(new Set(prompts).size).toBe(prompts.length);
    expect(new Set(session.lesson.challenges.map((challenge) => challenge.sourceLessonId))).toEqual(new Set(plan.lessons.map((lesson) => lesson.id)));

    // Passing completes the circles it asked about and pays like practice, 2 XP per right answer, never the XP of
    // every circle it skips; the next circle of the unit is next.
    const right = session.lesson.challenges.length;
    const lessonsXp = plan.lessons.reduce((total, lesson) => total + lesson.xpReward, 0);
    const passed = completeLessonCluster(user, (session.targetLessonIds ?? []).map((id) => LESSONS_BY_ID[id]), getTestOutXp(session, right));
    expect(session.targetLessonIds).toEqual(plan.lessons.map((lesson) => lesson.id));
    expect(session.lesson.xpReward).toBe(lessonsXp);
    expect(passed.totalXp - user.totalXp).toBe(Math.min(lessonsXp, right * PRACTICE_XP_PER_CORRECT_ANSWER));
    // Ten right answers pay 20 XP, about two lessons, not the 100 or more of the ten lessons skipped.
    expect(passed.totalXp - user.totalXp).toBe(20);
    expect(getTestOutXp(session, 8)).toBe(16);
    expect(getTestOutXp({ lesson: { ...session.lesson, xpReward: 12 } }, 8)).toBe(12);
    const after = learningApi.getPathNodes(passed).filter((node) => node.topicId === "prayer");
    expect(after.filter((node) => plan.nodeIds.includes(node.id)).every((node) => node.status === "completed")).toBe(true);
    expect(after.find((node) => node.status === "current")?.id).toBe(unit[TEST_OUT_MAX_QUESTIONS].id);
  });

  it("is not offered when the circles left give fewer than three questions", () => {
    // Every course lesson now asks two or more questions, so one is cut down to a single question.
    const lesson = Object.values(LESSONS_BY_ID).find((item) => item.challenges.length >= 3)!;
    const short = { ...lesson, challenges: lesson.challenges.slice(0, 1) };
    expect(canTestOut([short])).toBe(false);
    expect(canTestOut([])).toBe(false);
  });
});
