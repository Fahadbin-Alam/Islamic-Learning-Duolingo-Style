import {
  LIBRARY_TOPICS,
  TEST_OUT_MAX_QUESTIONS,
  canTestOut,
  completeLesson,
  completeLessonCluster,
  createTestOutSession,
  getJumpNodeIds,
  getLessonXp,
  getNodeStars,
  getNodeXp,
  getTestOutPlan,
  getTotalStars,
  isContextBound,
  isTestLost,
  learningApi,
  loseHeart
} from "../api/islamicLearningApi";
import { COURSE, LESSONS_BY_ID } from "../data/course";
import type { LearningSection, LessonSession, UserProfile } from "../types";
import { makeUser } from "./testUtils";

const sectionOf = (topicId: string) => COURSE.sections.find((section) => section.topicId === topicId)!;
const unitsOf = (section: LearningSection) =>
  section.branches.map((branch) => section.nodes.filter((node) => node.branchId === branch.id)).filter((nodes) => nodes.length > 0);
const statusesFor = (user: UserProfile) => new Map(learningApi.getPathNodes(user).map((node) => [node.id, node.status]));
const sessionFor = (user: UserProfile, branchId: string, jumpNodeId?: string, attempt = 0) => {
  const plan = getTestOutPlan(user, branchId, jumpNodeId)!;
  return createTestOutSession({ branchTitle: branchId, branchId, lessons: plan.lessons, nodeIds: plan.nodeIds, heartsAtStart: 5, attempt, jumpNodeId: plan.jumpNodeId });
};
const pass = (user: UserProfile, session: LessonSession, stars?: number) =>
  completeLessonCluster(user, (session.targetLessonIds ?? []).map((id) => LESSONS_BY_ID[id]), session.lesson.xpReward, stars);
// Each lesson the session marks done has one of its questions in it (a review circle: one it asks again).
const askedAboutEveryTarget = (session: LessonSession) =>
  (session.targetLessonIds ?? []).every((lessonId) => {
    const prompts = new Set(LESSONS_BY_ID[lessonId].challenges.map((challenge) => challenge.prompt.trim().toLowerCase()));
    return session.lesson.challenges.some((challenge) => challenge.sourceLessonId === lessonId || prompts.has(challenge.prompt.trim().toLowerCase()));
  });

describe("JUMP HERE opens the circle it was tapped on", () => {
  it("in a library unit tests only the circles before the tapped one, so it is next to play", () => {
    // Quran unit 2 (Surahs 114 to 105): JUMP HERE on its third circle tests its first two.
    const unit = unitsOf(sectionOf("quran_tafseer"))[1];
    const target = unit[2];
    const plan = getTestOutPlan(makeUser(), target.branchId, target.id)!;

    expect(plan.kind).toBe("jump");
    expect(plan.jumpNodeId).toBe(target.id);
    expect(plan.nodeIds).toEqual([unit[0].id, unit[1].id]);
    expect(canTestOut(plan.lessons)).toBe(true);

    const session = sessionFor(makeUser(), target.branchId, target.id);
    expect(session.jumpNodeId).toBe(target.id);
    expect(askedAboutEveryTarget(session)).toBe(true);

    const statuses = statusesFor(pass(makeUser(), session));
    expect([statuses.get(unit[0].id), statuses.get(unit[1].id)]).toEqual(["completed", "completed"]);
    expect(statuses.get(target.id)).toBe("available");
    expect(unit.slice(3).every((node) => statuses.get(node.id) === "locked")).toBe(true);
  });

  it("in the open unit of a topic taught in order does the same", () => {
    const wudu = unitsOf(sectionOf("prayer"))[0];
    const target = wudu[4];
    const plan = getTestOutPlan(makeUser(), target.branchId, target.id)!;

    expect(plan.nodeIds).toEqual(wudu.slice(0, 4).map((node) => node.id));
    const statuses = statusesFor(pass(makeUser(), sessionFor(makeUser(), target.branchId, target.id)));
    expect(statuses.get(target.id)).toBe("current");
    expect(statuses.get(wudu[5].id)).toBe("locked");
  });

  it("in a later unit of a topic taught in order keeps the unit rule: that unit opens at its first circle", () => {
    const units = unitsOf(sectionOf("foundation"));
    const target = units[2][2];
    const plan = getTestOutPlan(makeUser(), target.branchId, target.id)!;

    expect(plan.nodeIds).toEqual([...units[0], ...units[1]].map((node) => node.id));
    const statuses = statusesFor(pass(makeUser(), sessionFor(makeUser(), target.branchId, target.id)));
    expect(statuses.get(units[2][0].id)).toBe("current");
    expect(statuses.get(target.id)).toBe("locked");
  });

  it("is not offered past 10 circles, or where there is nothing to skip", () => {
    const wudu = unitsOf(sectionOf("prayer"))[0];
    const jumpable = getJumpNodeIds(makeUser(), "prayer");

    expect(getTestOutPlan(makeUser(), wudu[0].branchId, wudu[TEST_OUT_MAX_QUESTIONS + 1].id)).toBeUndefined();
    expect(jumpable.has(wudu[TEST_OUT_MAX_QUESTIONS + 1].id)).toBe(false);
    expect(jumpable.has(wudu[4].id)).toBe(true);
    // The circle to play now has nothing before it to skip.
    expect(getTestOutPlan(makeUser(), wudu[0].branchId, wudu[0].id)).toBeUndefined();
    expect(jumpable.has(wudu[0].id)).toBe(false);
  });

  it("asks about every lesson it marks done, for every JUMP HERE and unit key in the course", () => {
    const user = makeUser();
    const problems: string[] = [];

    for (const section of COURSE.sections) {
      const plans = [
        ...section.branches.map((branch) => getTestOutPlan(user, branch.id)),
        ...Array.from(getJumpNodeIds(user, section.topicId)).map((nodeId) => {
          const node = section.nodes.find((item) => item.id === nodeId)!;
          return getTestOutPlan(user, node.branchId, node.id);
        })
      ];

      for (const plan of plans) {
        if (!plan || !canTestOut(plan.lessons)) {
          continue;
        }

        const session = createTestOutSession({ branchTitle: plan.branchId, branchId: plan.branchId, lessons: plan.lessons, nodeIds: plan.nodeIds, heartsAtStart: 5 });
        if (plan.nodeIds.length > TEST_OUT_MAX_QUESTIONS || session.targetLessonIds?.length !== plan.lessons.length || !askedAboutEveryTarget(session)) {
          problems.push(`${plan.branchId} ${plan.jumpNodeId ?? ""}`);
        }
      }
    }

    expect(problems).toEqual([]);
  });
});

describe("gated library units", () => {
  const hadith = sectionOf("hadith");
  const gatedIndex = hadith.branches.findIndex((branch) => branch.gated);
  const units = unitsOf(hadith);

  it("shut a gated unit's first circle until the unit before it is finished", () => {
    expect(gatedIndex).toBeGreaterThan(0);
    const gated = units[gatedIndex];
    const before = units[gatedIndex - 1];

    expect(statusesFor(makeUser()).get(gated[0].id)).toBe("locked");
    // Half of the unit before is not enough.
    expect(statusesFor(makeUser({ completedNodeIds: [before[0].id] })).get(gated[0].id)).toBe("locked");
    expect(statusesFor(makeUser({ completedNodeIds: before.map((node) => node.id) })).get(gated[0].id)).toBe("available");
    // Units that are not gated still open from day one.
    expect(statusesFor(makeUser()).get(before[0].id)).toBe("available");
  });

  it("test out through the unit before a gated unit, which then opens", () => {
    const gated = units[gatedIndex];
    const before = units[gatedIndex - 1];
    const plan = getTestOutPlan(makeUser(), gated[0].branchId)!;

    expect(plan.kind).toBe("jump");
    expect(plan.nodeIds).toEqual(before.map((node) => node.id));
    if (canTestOut(plan.lessons)) {
      expect(statusesFor(pass(makeUser(), sessionFor(makeUser(), gated[0].branchId))).get(gated[0].id)).toBe("available");
    }
  });
});

describe("a test-out ends once it cannot be passed, and costs no hearts", () => {
  const wudu = unitsOf(sectionOf("prayer"))[0];
  const session = sessionFor(makeUser(), wudu[0].branchId);
  const total = session.lesson.challenges.length;
  const allowed = total - session.passingScore!;

  it("is lost one miss past what the pass mark allows", () => {
    expect(allowed).toBeGreaterThan(0);
    expect(isTestLost(session, allowed)).toBe(false);
    expect(isTestLost(session, allowed + 1)).toBe(true);
  });

  it("never counts a plain lesson as lost", async () => {
    const lesson = await learningApi.getLessonSession(wudu[0].lessonIds[0], makeUser());
    expect(isTestLost(lesson, 10)).toBe(false);
    expect(isTestLost(undefined, 10)).toBe(false);
  });

  it("takes no heart for a wrong answer in a test, and one in a lesson", async () => {
    const user = makeUser({ hearts: { current: 5, max: 5, unlimited: false, lastRefillDate: "2026-10-19" } });
    const lesson = await learningApi.getLessonSession(wudu[0].lessonIds[0], user);

    expect(loseHeart(user, session).hearts.current).toBe(5);
    expect(loseHeart(user, lesson).hearts.current).toBe(4);
    expect(loseHeart(user).hearts.current).toBe(4);
  });
});

describe("stars per circle", () => {
  const [first, second] = sectionOf("foundation").nodes;
  const firstLesson = LESSONS_BY_ID[first.lessonIds[0]];

  it("keeps each circle's best stars and sums them for Me", () => {
    const once = completeLesson(makeUser(), firstLesson, 2);
    expect(once.nodeStars).toEqual({ [first.id]: 2 });
    expect(getNodeStars(once, first.id)).toBe(2);
    expect(getTotalStars(once)).toBe(2);

    // A worse replay keeps the best; a better one raises it.
    expect(completeLesson(once, firstLesson, 1).nodeStars).toEqual({ [first.id]: 2 });
    expect(completeLesson(once, firstLesson, 3).nodeStars).toEqual({ [first.id]: 3 });
  });

  it("counts 3 for a circle finished before stars were kept, and 0 for one not finished", () => {
    const oldSave = makeUser({ completedNodeIds: [first.id, second.id], nodeStars: { [second.id]: 1 } });

    expect(getNodeStars(oldSave, first.id)).toBe(3);
    expect(getNodeStars(oldSave, sectionOf("prayer").nodes[0].id)).toBe(0);
    expect(getTotalStars(oldSave)).toBe(4);
    expect(getTotalStars(oldSave, [second.id])).toBe(1);
  });

  it("gives every circle a passed test-out skips the test's stars", () => {
    const unit = unitsOf(sectionOf("foundation"))[0];
    const passed = pass(makeUser(), sessionFor(makeUser(), unit[0].branchId), 2);

    expect(unit.map((node) => getNodeStars(passed, node.id))).toEqual(unit.map(() => 2));
  });
});

describe("the XP a lesson pays", () => {
  it("is the same on the node card, in the session and when the lesson is finished", async () => {
    const withReview = sectionOf("prayer").nodes.find((node) => getNodeXp(node) > LESSONS_BY_ID[node.lessonIds[0]].xpReward)!;
    expect(withReview).toBeDefined();

    const session = await learningApi.getLessonSession(withReview.lessonIds[0], makeUser());
    const user = makeUser({ totalXp: 0 });
    const finished = completeLesson(user, session.lesson);

    expect(getNodeXp(withReview)).toBe(session.lesson.xpReward);
    expect(getLessonXp(withReview.lessonIds[0])).toBe(session.lesson.xpReward);
    expect(finished.totalXp).toBe(session.lesson.xpReward);
    // A replay pays nothing, and the card can say so.
    expect(getNodeXp(withReview, finished)).toBe(0);
    expect(completeLesson(finished, session.lesson).totalXp).toBe(finished.totalXp);
  });

  it("matches the session for every circle of a few topics", async () => {
    for (const topicId of ["foundation", "quran_tafseer", "hadith"]) {
      for (const node of sectionOf(topicId).nodes.slice(0, 12)) {
        const session = await learningApi.getLessonSession(node.lessonIds[0], makeUser());
        expect(getNodeXp(node)).toBe(session.lesson.xpReward);
      }
    }
  });
});

describe("review questions read right outside their own lesson", () => {
  it("spots a question that points at something only its own lesson showed", () => {
    expect(isContextBound("Where was the Prophet ﷺ when he said this?")).toBe(true);
    expect(isContextBound("This hadith says to look only at a man's wealth.")).toBe(true);
    expect(isContextBound("What does this lesson teach?")).toBe(true);
    expect(isContextBound("The poor and the needy come first on that list.")).toBe(true);
    expect(isContextBound("It begins: At-tahiyyatu lillah, all greetings are for Allah.")).toBe(true);
    expect(isContextBound("Its last ayahs say: we hear and we obey.")).toBe(true);
    expect(isContextBound("When he said it, who was with him?")).toBe(true);
    expect(isContextBound("What did the Prophet ﷺ do here?")).toBe(true);

    expect(isContextBound("Where was the Prophet ﷺ when he told us to hold on to Allah's Book?")).toBe(false);
    expect(isContextBound("“Rinsing the mouth is part of the order.” What is this about?")).toBe(false);
    expect(isContextBound("Who is this? Allah raised him to a high place.")).toBe(false);
    expect(isContextBound("Umar was called ____ because he told right from wrong.")).toBe(false);
    expect(isContextBound("The Prophet ﷺ said money is the best thing to have in this world.")).toBe(false);
    expect(isContextBound("Iftar is the meal at sunset that ends the fast.")).toBe(false);
  });

  it("copies into a surah or hadith lesson only a question that says which surah or hadith it means", async () => {
    const problems: string[] = [];

    for (const topicId of ["quran_tafseer", "hadith"]) {
      for (const node of sectionOf(topicId).nodes) {
        const own = LESSONS_BY_ID[node.lessonIds[0]];
        const session = await learningApi.getLessonSession(own.id, makeUser());

        for (const review of session.lesson.challenges.slice(own.challenges.length)) {
          const source = LESSONS_BY_ID[review.sourceLessonId!];
          const surah = (source.surahName ?? source.title.replace(/^Surah\s+/i, "")).toLowerCase();
          const sameSurah = topicId === "quran_tafseer" && (own.surahName ?? own.title) === (source.surahName ?? source.title);
          const named = review.prompt.toLowerCase().includes(surah);
          const aboutTheText = /ﷺ|\b(prophet|messenger|hadith|said|told)\b/i.test(review.prompt);
          // A hadith is named by a word of its lesson's title ("Allah's Book", "marry" for "Marriage").
          const promptStems = (review.prompt.toLowerCase().match(/[a-z]{4,}/g) ?? []).map((word) => word.slice(0, 4));
          const titleNamed = (source.title.toLowerCase().match(/[a-z]{4,}/g) ?? []).some((word) => promptStems.includes(word.slice(0, 4)));

          if (isContextBound(review.prompt) || (topicId === "quran_tafseer" && !sameSurah && !named)) {
            problems.push(`${own.title}: ${review.prompt}`);
          }
          if (topicId === "hadith" && aboutTheText && !titleNamed) {
            problems.push(`${own.title}: ${review.prompt}`);
          }
        }
      }
    }

    expect(problems).toEqual([]);
  });

  it("never adds a review whose answer one of the lesson's own questions already asks for", async () => {
    const answer = (challenge: { choices: { id: string; label: string }[]; correctChoiceId: string }) =>
      challenge.choices.find((choice) => choice.id === challenge.correctChoiceId)?.label.trim().toLowerCase();
    const problems: string[] = [];

    for (const section of COURSE.sections.filter((item) => LIBRARY_TOPICS.has(item.topicId) || item.topicId === "prayer")) {
      for (const node of section.nodes) {
        const own = LESSONS_BY_ID[node.lessonIds[0]];
        const session = await learningApi.getLessonSession(own.id, makeUser());
        const ownAnswers = new Set(own.challenges.filter((challenge) => challenge.type !== "true_false").map(answer));

        for (const review of session.lesson.challenges.slice(own.challenges.length)) {
          if (review.type !== "true_false" && ownAnswers.has(answer(review))) {
            problems.push(`${own.title}: ${review.prompt}`);
          }
        }
      }
    }

    expect(problems).toEqual([]);
  });
});
