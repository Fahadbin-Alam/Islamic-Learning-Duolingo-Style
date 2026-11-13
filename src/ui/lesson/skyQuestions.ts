import type { Challenge } from "../../types";
import { DAY_TIMES, MOMENT_HOURS, type DayMoment } from "../../data/daySky";
import { dayHour } from "../journey/skyArt";

/**
 * Time questions asked in the sky: when every answer of a question is a time of the day ("At dawn", "At noon", "At
 * sunset", "The last third of the night"), each answer is a tile with its own small sky, and the big sky above plays to
 * the time the learner picks (src/ui/lesson/SkyGame.tsx). Nothing new is written: the question, its answers, its
 * right answer and its source stay the checked ones; the sky only shows each answer's time.
 *
 * An answer counts only when it is written in one of the ways below, each of which means one time and no other.
 * "The morning" or "early in the morning" can mean dawn or after sunrise, and "until night" ends at sunset, so those
 * questions stay tiles. A prayer named by its time ("The dawn prayer", "Asr, the afternoon prayer") is that time.
 */
const TIME_OF_ANSWER: Record<string, DayMoment> = {
  // Dawn: the first light, before the sun rises (the time of Fajr).
  dawn: "dawn",
  "at dawn": "dawn",
  "it is dawn": "dawn",
  "at dawn, before fajr": "dawn",
  "at dawn, before fajr's fard": "dawn",
  "after fajr": "dawn",
  "from dawn until sunrise": "dawn",
  "the dawn prayer": "dawn",
  "fajr, the dawn prayer": "dawn",
  // Sunrise.
  "at sunrise": "sunrise",
  "right at sunrise": "sunrise",
  // The forenoon (the time of Duha).
  "in the mid-morning": "forenoon",
  // Midday: the sun at its height and just past it (the time of Zuhr).
  noon: "midday",
  "at noon": "midday",
  "it is noon": "midday",
  "noon only": "midday",
  "at midday": "midday",
  "when the sun passed midday": "midday",
  "the noon prayer": "midday",
  // The afternoon (the time of Asr).
  "in the afternoon": "afternoon",
  "at asr": "afternoon",
  "at asr time": "afternoon",
  "after asr": "afternoon",
  "the afternoon prayer": "afternoon",
  "asr, the afternoon prayer": "afternoon",
  // Sunset, and the twilight after it (the time of Maghrib), when night first falls.
  "at sunset": "sunset",
  "it is sunset": "sunset",
  "sunset only": "sunset",
  "at sunset only": "sunset",
  "just before sunset": "sunset",
  "soon after sunset": "sunset",
  "after maghrib": "sunset",
  "when night first falls": "sunset",
  "the sunset prayer": "sunset",
  "maghrib, the sunset prayer": "sunset",
  // The night, once the twilight has gone (the time of Isha).
  midnight: "night",
  "at night": "night",
  "at midnight": "night",
  "at midnight only": "night",
  "it is midnight": "night",
  "late at night": "night",
  "in the dark of night": "night",
  "in the depths of the night": "night",
  "after isha": "night",
  "right after isha": "night",
  "the isha prayer": "night",
  "the night prayer": "night",
  "isha, the night prayer": "night",
  // The last third of the night, up to dawn (the time of suhur).
  "the last third of the night": "lastThird",
  "before dawn": "lastThird",
  "just before dawn": "lastThird",
  "late, close to dawn": "lastThird",
  "before fajr": "lastThird",
  "in the hours before dawn": "lastThird",
  "in the last hour of the night": "lastThird"
};

/**
 * Questions left as tiles although their answers are times, because the sky could show a time a little off the one
 * the source means. The journey du'a (Abu Dawud 5086): the Arabic, "ashara", is the time just before dawn, which
 * the English gives as "at daybreak" and the answer as "At dawn"; a sky at the first light could be the wrong one.
 */
const LEFT_AS_TILES = new Set(["At what time did he ﷺ say the journey du'a?"]);

/**
 * The five prayers by name, each at its time: Fajr at dawn, Zuhr just past midday, Asr in the afternoon, Maghrib at
 * sunset and Isha at night (Sahih Muslim 612d).
 */
const PRAYER_OF_ANSWER: Record<string, DayMoment> = { fajr: "dawn", zuhr: "midday", dhuhr: "midday", asr: "afternoon", maghrib: "sunset", isha: "night" };

/**
 * The questions asked by a prayer's name alone ("Maghrib"), each read to check that its words give no time away. Each
 * answer's small sky shows the time of its prayer, so "Which prayer is before sunrise?" or "The prayer day begins with
 * ____ at dawn" stay as tiles (the sky would answer them), while "In which prayer did he ﷺ recite At-Tur?" is asked in
 * the sky: tap a prayer, and the sky plays to its time.
 */
const ASKED_BY_PRAYER = new Set([
  "Which prayer had they just prayed with him ﷺ?",
  "After which prayer did the good news come?",
  "Which prayer did they wait to pray with him ﷺ?",
  "Which prayer had two before and two after?",
  "In which prayer did he ﷺ recite At-Tur, per Bukhari 765?",
  "Which prayer was being recited when they heard?",
  "In which prayer did he recite it, per Umm al-Fadl?"
]);

/** An answer as the table above writes it: lower case, plain quotes, no stop at the end. */
export function timeKey(label: string) {
  return label
    .toLowerCase()
    .replace(/[’‘`]/g, "'")
    .replace(/[.!?;:]+$/, "")
    .replace(/\s+/g, " ")
    .trim();
}

/** The time of the day an answer names, if it names one. */
export function timeOfAnswer(label: string): DayMoment | undefined {
  return TIME_OF_ANSWER[timeKey(label)];
}

/**
 * Each answer's time (choice id -> time of the day), when the question can be asked in the sky: at least three
 * answers, each a different time (a prayer's name alone counts only in the questions read for it, ASKED_BY_PRAYER).
 * Read on the English question.
 */
export function skyTimesFor(challenge: Pick<Challenge, "choices" | "type" | "prompt">): Record<string, DayMoment> | undefined {
  if (challenge.type === "true_false" || challenge.choices.length < 3 || LEFT_AS_TILES.has(challenge.prompt)) return undefined;
  const byName = ASKED_BY_PRAYER.has(challenge.prompt);
  const times: Record<string, DayMoment> = {};
  const seen = new Set<DayMoment>();
  for (const choice of challenge.choices) {
    const time = timeOfAnswer(choice.label) ?? (byName ? PRAYER_OF_ANSWER[timeKey(choice.label)] : undefined);
    if (!time || seen.has(time)) return undefined;
    seen.add(time);
    times[choice.id] = time;
  }
  return times;
}

/** Every answer is a prayer ("Maghrib", "The noon prayer"), so the sky question asks for the prayer, not the time. */
export function answersArePrayers(challenge: Pick<Challenge, "choices">) {
  return challenge.choices.every((choice) => {
    const key = timeKey(choice.label);
    return Boolean(PRAYER_OF_ANSWER[key]) || (/ prayer$/.test(key) && Boolean(TIME_OF_ANSWER[key]));
  });
}

/**
 * The time the sky shows before an answer is picked: one no answer is (the forenoon or the afternoon first), so the
 * sky gives nothing away.
 */
export function openingTime(times: Record<string, DayMoment>): DayMoment {
  const used = new Set(Object.values(times));
  const order: DayMoment[] = ["forenoon", "afternoon", "sunrise", "midday", "night", "dawn", "sunset", "lastThird"];
  return order.find((time) => !used.has(time)) ?? "forenoon";
}

/**
 * The sky's trip from the hour it shows to a time: always forward, round the day if it has to (from the night to
 * dawn goes on to the next dawn), starting within the day so the hours stay in the sky's range.
 */
export function tripTo(fromHour: number, time: DayMoment) {
  const from = Number(dayHour(fromHour).toFixed(4));
  let to = dayHour(MOMENT_HOURS[time]);
  while (to < from) to += 24;
  return { from, to: Number(to.toFixed(4)) };
}

/** A time's colour, as in the bar of the day. */
export const timeColor = (time: DayMoment) => DAY_TIMES.find((each) => each.key === time)?.color ?? DAY_TIMES[0].color;
