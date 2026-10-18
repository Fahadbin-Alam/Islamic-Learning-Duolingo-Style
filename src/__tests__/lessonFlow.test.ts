import { completeLesson, createTestOutSession, learningApi } from "../api/islamicLearningApi";
import { COURSE, LESSONS_BY_ID, allNodes } from "../data/course";
import { makeUser } from "./testUtils";

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
    expect(byId.get("foundation-guidance")?.status).toBe("current");
    expect(byId.get("foundation-bismillah")?.status).toBe("locked");
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

  it("adds harder challenges and extra XP to later lessons", async () => {
    const hardNode = COURSE.sections[0].nodes.find((node) => (node.difficulty ?? 0) >= 5);
    expect(hardNode).toBeDefined();
    const lessonId = hardNode!.lessonIds[0];
    const session = await learningApi.getLessonSession(lessonId, makeUser());

    expect(session.lesson.challenges.length).toBe(LESSONS_BY_ID[lessonId].challenges.length + 2);
    expect(session.lesson.xpReward).toBe(LESSONS_BY_ID[lessonId].xpReward + 4);
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

  it("tests at most five lessons and needs 80% to pass", () => {
    const session = createTestOutSession({
      branchTitle: branch.title,
      branchId: branch.id,
      lessons,
      nodeIds: nodes.map((node) => node.id),
      heartsAtStart: 5
    });
    const challengeCount = session.lesson.challenges.length;

    expect(session.mode).toBe("test_out");
    expect(session.targetLessonIds?.length).toBe(Math.min(5, lessons.length));
    expect(challengeCount).toBeLessThanOrEqual(5);
    expect(session.passingScore).toBe(Math.max(3, Math.ceil(challengeCount * 0.8)));
  });
});
