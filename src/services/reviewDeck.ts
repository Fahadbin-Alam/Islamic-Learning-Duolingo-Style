import type { ReviewCard } from "../types";

// The Review deck, Anki style: a lesson question missed on its first try comes back in Practice until it sticks.
// A miss puts it in box 0, due now. Each first-try right answer moves it up a box and waits longer before it
// comes back: 1 day, then 3, then 7. Right once more after the 7 days and it has stuck, so it leaves the deck.
// A miss at any box sends it back to box 0. Everything lives on the learner's save, so it works offline.
export const REVIEW_STEP_DAYS = [1, 3, 7];
// Right on its first try at the last box: learned.
export const REVIEW_LEARNED_BOX = REVIEW_STEP_DAYS.length;
// Questions in one Review session.
export const REVIEW_SESSION_SIZE = 10;
// The deck keeps at most this many questions; past it, the ones closest to learned go first.
export const REVIEW_DECK_LIMIT = 150;

const DAY_MS = 24 * 60 * 60 * 1000;

export type ReviewCardKey = Pick<ReviewCard, "lessonId" | "challengeId">;

export function sameCard(card: ReviewCardKey, key: ReviewCardKey) {
  return card.lessonId === key.lessonId && card.challengeId === key.challengeId;
}

function findCard(cards: ReviewCard[] | undefined, key: ReviewCardKey) {
  return (cards ?? []).find((card) => sameCard(card, key));
}

export function isDue(card: ReviewCard, now = new Date()) {
  const due = Date.parse(card.dueAt);
  return !Number.isFinite(due) || due <= now.getTime();
}

export function dueCards(cards: ReviewCard[] | undefined, now = new Date()) {
  return (cards ?? []).filter((card) => isDue(card, now));
}

export function dueCount(cards: ReviewCard[] | undefined, now = new Date()) {
  return dueCards(cards, now).length;
}

// What a Review session asks first: the weakest (missed most, lowest box), then the longest waiting.
export function reviewOrder(cards: ReviewCard[]) {
  return [...cards].sort(
    (a, b) => b.misses - a.misses || a.box - b.box || Date.parse(a.dueAt) - Date.parse(b.dueAt) || a.challengeId.localeCompare(b.challengeId)
  );
}

function trimDeck(cards: ReviewCard[]) {
  if (cards.length <= REVIEW_DECK_LIMIT) {
    return cards;
  }

  // Keep the weakest: drop the ones in the highest box, the ones seen longest ago first.
  const keep = [...cards]
    .sort((a, b) => a.box - b.box || Date.parse(b.lastSeenAt) - Date.parse(a.lastSeenAt))
    .slice(0, REVIEW_DECK_LIMIT);
  const kept = new Set(keep);
  return cards.filter((card) => kept.has(card));
}

// A first-try miss, in a lesson, a test-out or a Review: the question is due now, back in box 0.
export function recordReviewMiss(cards: ReviewCard[] | undefined, key: ReviewCardKey, now = new Date()): ReviewCard[] {
  const stamp = now.toISOString();
  const existing = findCard(cards, key);
  const card: ReviewCard = {
    lessonId: key.lessonId,
    challengeId: key.challengeId,
    box: 0,
    dueAt: stamp,
    misses: (existing?.misses ?? 0) + 1,
    lastSeenAt: stamp
  };

  return trimDeck([...(cards ?? []).filter((item) => !sameCard(item, key)), card]);
}

// A first-try right answer. Only a question in the deck and due counts (asked early it proves less), unless
// `force`. Returns the same array when nothing changed.
export function recordReviewRight(cards: ReviewCard[] | undefined, key: ReviewCardKey, now = new Date(), force = false): ReviewCard[] {
  const list = cards ?? [];
  const existing = findCard(list, key);

  if (!existing || (!force && !isDue(existing, now))) {
    return list;
  }

  const box = existing.box + 1;

  if (box > REVIEW_LEARNED_BOX) {
    return list.filter((card) => card !== existing);
  }

  const next: ReviewCard = {
    ...existing,
    box,
    dueAt: new Date(now.getTime() + REVIEW_STEP_DAYS[box - 1] * DAY_MS).toISOString(),
    lastSeenAt: now.toISOString()
  };

  return list.map((card) => (card === existing ? next : card));
}

// A save from an older build has no deck; a hand-edited one may hold junk.
export function cleanReviewCards(value: unknown): ReviewCard[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter(
    (card): card is ReviewCard =>
      Boolean(card) &&
      typeof card.lessonId === "string" &&
      typeof card.challengeId === "string" &&
      typeof card.dueAt === "string" &&
      Number.isInteger(card.box) &&
      card.box >= 0 &&
      card.box <= REVIEW_LEARNED_BOX
  ).map((card) => ({
    ...card,
    misses: Number.isFinite(card.misses) ? card.misses : 1,
    lastSeenAt: typeof card.lastSeenAt === "string" ? card.lastSeenAt : card.dueAt
  }));
}
