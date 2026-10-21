// The order a lesson asks its questions in, Duolingo style: each question once, then every missed question
// comes back at the end (with its tiles in a new order), again and again until it is answered right. The
// lesson is done only when every question has been right once. A test asks each question once and never
// again, so what it scores is what the learner knew.

/** One question to ask: its index in lesson.challenges and which try it is (0 the first time). */
export type LessonStep = { index: number; attempt: number };

/** Every question once, in the lesson's order. */
export function startLessonQueue(challengeCount: number): LessonStep[] {
  return Array.from({ length: Math.max(0, challengeCount) }, (_, index) => ({ index, attempt: 0 }));
}

/**
 * What one answer does to the queue. A miss in a lesson, on any try, goes to the end once more as the next
 * try; a right answer, or any answer in a test, is that question done.
 */
export function answerLessonStep(queue: LessonStep[], position: number, correct: boolean, isTest: boolean) {
  const step = queue[position];
  const requeue = Boolean(step) && !correct && !isTest;

  return {
    queue: requeue ? [...queue, { index: step.index, attempt: step.attempt + 1 }] : queue,
    requeued: requeue,
    /** The question is finished, so the progress bar moves on. */
    done: Boolean(step) && !requeue
  };
}

/** True when the step at `position` is the last one the queue holds. */
export function isLastLessonStep(queue: LessonStep[], position: number) {
  return position >= queue.length - 1;
}
