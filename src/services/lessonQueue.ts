// The order a lesson asks its questions in, Duolingo style: each question once, then every question
// missed on its first try comes back once at the end (with its tiles in a new order). A test asks each
// question once and never again, so what it scores is what the learner knew.

/** One question to ask: its index in lesson.challenges and which try it is (0 the first time). */
export type LessonStep = { index: number; attempt: number };

/** Every question once, in the lesson's order. */
export function startLessonQueue(challengeCount: number): LessonStep[] {
  return Array.from({ length: Math.max(0, challengeCount) }, (_, index) => ({ index, attempt: 0 }));
}

/**
 * What one answer does to the queue. A first-try miss in a lesson goes to the end once more; anything
 * else (a right answer, a missed comeback, any answer in a test) is that question done.
 */
export function answerLessonStep(queue: LessonStep[], position: number, correct: boolean, isTest: boolean) {
  const step = queue[position];
  const requeue = Boolean(step) && !correct && !isTest && step.attempt === 0;

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
