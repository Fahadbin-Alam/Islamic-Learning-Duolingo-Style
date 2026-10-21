import { canTestOut, completeLessonCluster, createTestOutSession, getJumpNodeIds, getTestOutPlan, learningApi } from "../api/islamicLearningApi";
import { COURSE, LESSONS_BY_ID } from "../data/course";
import type { LearningSection, UserProfile } from "../types";
import { makeUser } from "./testUtils";

// A course with a gated unit whatever the content holds: the Quran topic's third unit is marked gated (material for
// older learners), so the rules below are tested on it.
jest.mock("../data/course", () => {
  const actual = jest.requireActual("../data/course");
  const sections = actual.COURSE.sections.map((section: LearningSection) => {
    if (section.topicId !== "quran_tafseer") {
      return section;
    }

    const withNodes = section.branches.filter((branch) => section.nodes.some((node) => node.branchId === branch.id));
    const gatedId = withNodes[2].id;
    return { ...section, branches: section.branches.map((branch) => (branch.id === gatedId ? { ...branch, gated: true } : branch)) };
  });

  return { ...actual, COURSE: { ...actual.COURSE, sections } };
});

const quran = COURSE.sections.find((section) => section.topicId === "quran_tafseer")!;
const units = quran.branches.map((branch) => quran.nodes.filter((node) => node.branchId === branch.id)).filter((nodes) => nodes.length > 0);
const gatedIndex = units.findIndex((nodes) => quran.branches.find((branch) => branch.id === nodes[0].branchId)?.gated);
const gated = units[gatedIndex];
const before = units[gatedIndex - 1];
const statusesFor = (user: UserProfile) => new Map(learningApi.getPathNodes(user).map((node) => [node.id, node.status]));

describe("a gated library unit", () => {
  it("is the mocked third unit", () => {
    expect(gatedIndex).toBe(2);
  });

  it("shuts its first circle until the unit before it is finished", () => {
    expect(statusesFor(makeUser()).get(gated[0].id)).toBe("locked");
    // Half of the unit before is not enough.
    expect(statusesFor(makeUser({ completedNodeIds: [before[0].id] })).get(gated[0].id)).toBe("locked");
    expect(statusesFor(makeUser({ completedNodeIds: before.map((node) => node.id) })).get(gated[0].id)).toBe("available");
    // Units that are not gated still open from day one.
    expect(statusesFor(makeUser()).get(before[0].id)).toBe("available");
    expect(statusesFor(makeUser()).get(units[gatedIndex + 1][0].id)).toBe("available");
  });

  it("has no test-out while shut: no banner key, no JUMP HERE on any of its circles", () => {
    const user = makeUser();
    const jumpable = getJumpNodeIds(user, "quran_tafseer");

    expect(getTestOutPlan(user, gated[0].branchId)).toBeUndefined();
    expect(gated.every((node) => getTestOutPlan(user, node.branchId, node.id) === undefined)).toBe(true);
    expect(gated.some((node) => jumpable.has(node.id))).toBe(false);
  });

  it("has no test-out once open either: its circles are taught one by one", () => {
    const user = makeUser({ completedNodeIds: before.map((node) => node.id) });
    const jumpable = getJumpNodeIds(user, "quran_tafseer");

    expect(statusesFor(user).get(gated[0].id)).toBe("available");
    expect(getTestOutPlan(user, gated[0].branchId)).toBeUndefined();
    expect(gated.some((node) => jumpable.has(node.id))).toBe(false);
  });

  it("is never marked done by a test of another unit", () => {
    const user = makeUser();

    for (const plan of [
      ...quran.branches.map((branch) => getTestOutPlan(user, branch.id)),
      ...quran.nodes.map((node) => getTestOutPlan(user, node.branchId, node.id))
    ]) {
      expect(plan?.nodeIds.filter((nodeId) => gated.some((node) => node.id === nodeId)) ?? []).toEqual([]);
    }
  });

  it("keeps JUMP HERE in the units around it", () => {
    const jumpable = getJumpNodeIds(makeUser(), "quran_tafseer");
    const plan = getTestOutPlan(makeUser(), before[2].branchId, before[2].id)!;

    expect(jumpable.has(before[2].id)).toBe(true);
    expect(plan.nodeIds).toEqual([before[0].id, before[1].id]);
    expect(canTestOut(plan.lessons)).toBe(true);

    const session = createTestOutSession({ branchTitle: "unit", branchId: plan.branchId, lessons: plan.lessons, nodeIds: plan.nodeIds, heartsAtStart: 5, jumpNodeId: plan.jumpNodeId });
    const passed = completeLessonCluster(makeUser(), (session.targetLessonIds ?? []).map((id) => LESSONS_BY_ID[id]), session.lesson.xpReward);
    expect(statusesFor(passed).get(before[2].id)).toBe("available");
    expect(statusesFor(passed).get(gated[0].id)).toBe("locked");
  });
});
