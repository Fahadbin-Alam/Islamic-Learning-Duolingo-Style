import { act, fireEvent, screen } from "@testing-library/react-native";
import type { Challenge } from "../types";

// Drives a lesson in the app's tests: learn pages and questions in turn, then the circle's quiz.

async function press(testID: string) {
  await act(async () => {
    fireEvent.press(screen.getByTestId(testID));
  });
}

/** CONTINUE through learn pages ("Good to know", "Quiz time!") until a question shows. */
export async function toQuestion() {
  for (let page = 0; page < 12 && screen.queryByTestId("learn-continue") && !screen.queryByTestId("exercise-view"); page += 1) {
    await press("learn-continue");
  }
}

/** The question on screen: its tiles' testIDs, and the start of its prompt. */
export function questionOnScreen(challenges: Challenge[]) {
  return challenges.find(
    (challenge) =>
      challenge.choices.every((choice) => screen.queryByTestId(`choice-${choice.id}`)) &&
      screen.queryAllByText(challenge.prompt.slice(0, 40).split(/[^A-Za-z0-9 ,.?!]/)[0].trim(), { exact: false }).length > 0
  );
}

/** Answers every question that comes, right, through the pages and the quiz, until the lesson is complete. */
export async function finishLessonRight(challenges: Challenge[]) {
  for (let turn = 0; turn < 60 && !screen.queryByTestId("lesson-complete"); turn += 1) {
    await toQuestion();
    const shown = questionOnScreen(challenges);
    if (!shown) break;
    await press(`choice-${shown.correctChoiceId}`);
    await press("exercise-check");
    await press("feedback-continue");
  }
}
