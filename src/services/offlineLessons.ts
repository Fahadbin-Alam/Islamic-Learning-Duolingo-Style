import { LESSONS_BY_ID, allNodes } from "../data/course";
import type { Lesson } from "../types";
import { isOnline } from "./network";
import { localAyahUri, offlineAudioSupported, saveAyahForOffline } from "./offlineAudio";
import { quranAudioUrl } from "./quranAudio";

/**
 * Keeps the next lessons ready for no internet. The lessons themselves, their pictures and drawings are inside
 * the app already; the one thing a lesson streams is the Quran recitation of its ayah. So while the phone is
 * online, the recitations of the circle the learner is on and the few circles after it are saved quietly, one
 * at a time, and those lessons play their ayah with no internet later.
 */

/** How many circles after the current one get their recitations saved ahead. */
export const CIRCLES_AHEAD = 5;

/** The recitations a lesson can play: its ayah quote (Listen) and its word card's ayah. */
export function lessonAyahUrls(lesson: Pick<Lesson, "quote" | "learnSource"> | undefined) {
  if (!lesson) return [];
  const urls = [quranAudioUrl(lesson.quote?.reference), quranAudioUrl(lesson.learnSource?.reference)];
  return [...new Set(urls.filter((url): url is string => Boolean(url)))];
}

/** The lessons of the circle `nodeId` and of the `ahead` circles after it in the same topic, in path order. */
export function lessonIdsAhead(nodeId: string, ahead = CIRCLES_AHEAD) {
  const index = allNodes.findIndex((node) => node.id === nodeId);
  if (index < 0) return [];
  const topic = allNodes[index].topicId;
  return allNodes
    .slice(index, index + ahead + 1)
    .filter((node) => node.topicId === topic)
    .flatMap((node) => node.lessonIds);
}

/** Every recitation the circle `nodeId` and the circles after it can play, not saved on the phone yet. */
export function missingAyahUrlsAhead(nodeId: string, ahead = CIRCLES_AHEAD) {
  const urls = lessonIdsAhead(nodeId, ahead).flatMap((id) => lessonAyahUrls(LESSONS_BY_ID[id]));
  return [...new Set(urls)].filter((url) => !localAyahUri(url));
}

let queue: Promise<unknown> = Promise.resolve();
const waiting = new Set<string>();

/**
 * Saves the recitations of the circle `nodeId` and the next few, when the phone is online. Never throws and
 * never blocks: downloads run one after another in the background, and one already waiting is not asked twice.
 */
export function saveLessonsAhead(nodeId: string | undefined, ahead = CIRCLES_AHEAD) {
  if (!nodeId || !offlineAudioSupported() || !isOnline()) return Promise.resolve(0);
  const urls = missingAyahUrlsAhead(nodeId, ahead).filter((url) => !waiting.has(url));
  urls.forEach((url) => waiting.add(url));
  const run = async () => {
    let saved = 0;
    for (const url of urls) {
      // Lost the internet halfway: the rest waits for next time.
      if (isOnline() && (await saveAyahForOffline(url))) saved += 1;
      waiting.delete(url);
    }
    return saved;
  };
  const done = queue.then(run, run);
  queue = done.catch(() => undefined);
  return done.catch(() => 0);
}

/** Tests only. */
export function resetOfflineLessonsForTests() {
  queue = Promise.resolve();
  waiting.clear();
}
