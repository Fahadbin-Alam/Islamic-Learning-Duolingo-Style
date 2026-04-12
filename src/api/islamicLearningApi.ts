import {
  COURSE,
  LESSONS_BY_ID,
  SHOP_ITEMS,
  STARTER_USER,
  allNodes,
  findNodeByLessonId
} from "../data/course";
import type {
  LearningCourse,
  LearningNodeView,
  Lesson,
  LessonSession,
  ShopItem,
  UserProfile,
  XpSummary
} from "../types";

export interface IslamicLearningApi {
  getUser(userId: number): Promise<UserProfile>;
  getCoursePath(courseId: string, userId: number): Promise<LearningCourse>;
  getPathNodes(user: UserProfile): LearningNodeView[];
  getLessonSession(lessonId: string, user: UserProfile): Promise<LessonSession>;
  getShopItems(): Promise<ShopItem[]>;
  getXpSummaries(user: UserProfile): Promise<XpSummary[]>;
}

export const learningApi: IslamicLearningApi = {
  async getUser() {
    return refillHeartsForToday(cloneUser(STARTER_USER));
  },
  async getCoursePath() {
    return COURSE;
  },
  getPathNodes(user) {
    const completed = new Set(user.completedNodeIds);
    const firstIncompleteByTopic = new Map(
      COURSE.sections.map((section) => [
        section.topicId,
        section.nodes.find((node) => !completed.has(node.id))
      ])
    );

    return allNodes.map((node) => {
      const isCompleted = completed.has(node.id);
      const prereqsComplete = node.requiredNodeIds.every((id) => completed.has(id));
      const status = isCompleted
        ? "completed"
        : !prereqsComplete
          ? "locked"
          : firstIncompleteByTopic.get(node.topicId)?.id === node.id
            ? "current"
            : "available";

      return {
        ...node,
        status,
        firstLessonId: node.lessonIds[0]
      };
    });
  },
  async getLessonSession(lessonId, user) {
    const lesson = LESSONS_BY_ID[lessonId];

    if (!lesson) {
      throw new Error(`Unknown lesson: ${lessonId}`);
    }

    return {
      id: `session_${lessonId}_${Date.now()}`,
      lesson,
      startedAt: new Date().toISOString(),
      heartsAtStart: user.hearts.current
    };
  },
  async getShopItems() {
    return SHOP_ITEMS;
  },
  async getXpSummaries(user) {
    return [
      {
        userId: user.id,
        gainedXp: user.totalXp,
        dailyGoalXp: user.dailyGoalXp,
        date: new Date().toISOString().slice(0, 10),
        streakExtended: user.totalXp >= user.dailyGoalXp,
        totalSessionTime: Math.max(120, user.completedLessonIds.length * 90),
        numSessions: user.completedLessonIds.length
      }
    ];
  }
};

export function refillHeartsForToday(user: UserProfile) {
  const today = new Date().toISOString().slice(0, 10);

  if (user.hearts.unlimited || user.hearts.lastRefillDate === today) {
    return user;
  }

  return {
    ...user,
    hearts: {
      ...user.hearts,
      current: user.hearts.max,
      lastRefillDate: today
    }
  };
}

export function completeLesson(user: UserProfile, lesson: Lesson) {
  const node = findNodeByLessonId(lesson.id);
  const alreadyCompleted = user.completedLessonIds.includes(lesson.id);
  const completedLessonIds = alreadyCompleted
    ? user.completedLessonIds
    : [...user.completedLessonIds, lesson.id];
  const completedNodeIds = node && !user.completedNodeIds.includes(node.id)
    ? [...user.completedNodeIds, node.id]
    : user.completedNodeIds;
  const nextXp = alreadyCompleted ? user.totalXp : user.totalXp + lesson.xpReward;

  return {
    ...user,
    totalXp: nextXp,
    streakDays: nextXp >= user.dailyGoalXp ? Math.max(user.streakDays, 1) : user.streakDays,
    completedLessonIds,
    completedNodeIds
  };
}

export function loseHeart(user: UserProfile) {
  if (user.hearts.unlimited) {
    return user;
  }

  return {
    ...user,
    hearts: {
      ...user.hearts,
      current: Math.max(0, user.hearts.current - 1)
    }
  };
}

export function grantHearts(user: UserProfile, hearts: number, capAtMax = false) {
  if (user.hearts.unlimited) {
    return user;
  }

  const nextHeartCount = user.hearts.current + hearts;

  return {
    ...user,
    hearts: {
      ...user.hearts,
      current: capAtMax ? Math.min(user.hearts.max, nextHeartCount) : nextHeartCount
    }
  };
}

export function applyShopItem(user: UserProfile, item: ShopItem) {
  if (item.type === "monthly_membership") {
    return {
      ...user,
      activeSubscriptionId: item.productId ?? item.id,
      hearts: {
        ...user.hearts,
        current: user.hearts.max,
        unlimited: true
      }
    };
  }

  if (item.type === "heart_pack") {
    return grantHearts(user, item.heartsGranted ?? 0, false);
  }

  return user;
}

function cloneUser(user: UserProfile): UserProfile {
  return {
    ...user,
    hearts: { ...user.hearts },
    completedLessonIds: [...user.completedLessonIds],
    completedNodeIds: [...user.completedNodeIds]
  };
}
