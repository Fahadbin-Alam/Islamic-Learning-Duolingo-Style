import { act, fireEvent, screen } from "@testing-library/react-native";
import type { Challenge } from "../types";
import { checkCandidate, fillPiece } from "../ui/lesson/questionFormats";

// Drives a lesson in the app's tests: learn pages and questions in turn, a quiz circle's matching round, and every
// way a question can be asked (tiles, a gap to fill, a missing word in the answer, true or false, a place on the map,
// a time in the sky, a month on the year).

async function press(testID: string) {
  await act(async () => {
    fireEvent.press(screen.getByTestId(testID));
  });
}

/** CONTINUE through learn pages ("Good to know", "Quiz time!") until a question (or a game) shows. */
export async function toQuestion() {
  for (let page = 0; page < 12 && screen.queryByTestId("learn-continue") && !screen.queryByTestId("exercise-view") && !onGame(); page += 1) {
    await press("learn-continue");
  }
}

function onGame() {
  return Boolean(screen.queryByTestId("gap-game") || screen.queryByTestId("fill-game") || screen.queryByTestId("match-game") || screen.queryByTestId("map-game") || screen.queryByTestId("sky-game") || screen.queryByTestId("month-game") || screen.queryByTestId("animal-game"));
}

function promptShown(challenge: Challenge) {
  // The longest plain piece of the prompt (a gap sentence's first piece can be one word, like "Say").
  const piece = challenge.prompt
    .split(/[^A-Za-z0-9 ,.?!]/)
    .map((part) => part.trim())
    .sort((a, b) => b.length - a.length)[0]
    ?.slice(0, 40);
  return Boolean(piece) && screen.queryAllByText(piece, { exact: false }).length > 0;
}

/** The question on screen: found by its prompt and, for tiles and gaps, by its tiles. */
export function questionOnScreen(challenges: Challenge[]) {
  if (screen.queryByTestId("fill-game")) {
    return challenges.find((challenge) => {
      const fill = fillPiece(challenge);
      return Boolean(fill) && promptShown(challenge) && fill!.options.every((word) => screen.queryAllByTestId(`choice-fill:${word}`).length > 0);
    });
  }
  if (screen.queryByTestId("choice-true") && screen.queryByTestId("choice-false")) {
    const asCheck = challenges.find((challenge) => promptShown(challenge) && !challenge.choices.some((choice) => choice.id === "true"));
    const asTrueFalse = challenges.find((challenge) => challenge.choices.every((choice) => screen.queryByTestId(`choice-${choice.id}`)) && promptShown(challenge));
    return asTrueFalse ?? asCheck;
  }
  return challenges.find((challenge) => challenge.choices.every((choice) => screen.queryByTestId(`choice-${choice.id}`)) && promptShown(challenge));
}

function answerOf(challenge: Challenge) {
  return challenge.choices.find((choice) => choice.id === challenge.correctChoiceId)?.label ?? "";
}

/** Picks the right answer to the question on screen, in whatever way it is asked (CHECK not pressed yet). */
export async function pickRight(shown: Challenge) {
  if (screen.queryByTestId("fill-game")) {
    await press(`choice-fill:${fillPiece(shown)!.piece}`);
    return;
  }
  const isCheck = !shown.choices.some((choice) => choice.id === "true") && screen.queryByTestId("choice-true") && !screen.queryByTestId(`choice-${shown.correctChoiceId}`);
  if (isCheck) {
    await press(checkCandidate(shown).id === shown.correctChoiceId ? "choice-true" : "choice-false");
    return;
  }
  await press(`choice-${shown.correctChoiceId}`);
}

/** Plays a matching round to the end, right first time, and continues. */
export async function finishMatch(challenges: Challenge[]) {
  for (let index = 0; index < challenges.length; index += 1) {
    if (screen.queryByTestId(`match-question-${index}`) && screen.queryByTestId(`match-answer-${index}`)) {
      await press(`match-question-${index}`);
      await press(`match-answer-${index}`);
    }
  }
  await press("feedback-continue");
}

/** Answers every question that comes, right, through the pages and the games, until the lesson is complete. */
export async function finishLessonRight(challenges: Challenge[]) {
  for (let turn = 0; turn < 60 && !screen.queryByTestId("lesson-complete"); turn += 1) {
    await toQuestion();
    if (screen.queryByTestId("match-game")) {
      await finishMatch(challenges);
      continue;
    }
    const shown = questionOnScreen(challenges);
    if (!shown) break;
    await pickRight(shown);
    await press("exercise-check");
    await press("feedback-continue");
  }
}
