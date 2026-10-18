import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react-native";
import { NODE_ARABIC } from "../data/arabicTerms";
import { LESSONS_BY_ID } from "../data/course";
import {
  ExerciseView,
  FeedbackSheet,
  LearnCard,
  LessonComplete,
  LessonHeader,
  OOPS_WORDS,
  OrderGame,
  PRAISE_WORDS,
  QuitSheet,
  WHY_MAX,
  noBreakHyphens,
  pickOops,
  pickPraise,
  seededShuffle,
  shortWhy
} from "../ui/lesson";

jest.mock("../services/gameAudio", () => ({
  playGameSound: jest.fn(),
  primeGameAudio: jest.fn(() => true)
}));

const lesson = LESSONS_BY_ID["lesson-foundation-niyyah"];
const mc = lesson.challenges[0];
const tf = lesson.challenges[1];
const accent = "#1CB66D";

describe("lesson screens", () => {
  it("LessonHeader closes and shows hearts", async () => {
    const onClose = jest.fn();
    const { rerender } = await render(<LessonHeader progress={0.5} hearts={{ current: 5, max: 5, unlimited: false }} onClose={onClose} />);
    expect(screen.getByText("5")).toBeTruthy();
    await fireEvent.press(screen.getByRole("button", { name: "Close lesson" }));
    expect(onClose).toHaveBeenCalledTimes(1);
    await rerender(<LessonHeader progress={0.5} hearts={{ current: 4, max: 5, unlimited: false }} onClose={onClose} />);
    expect(screen.getByText("4")).toBeTruthy();
    await rerender(<LessonHeader progress={0.5} hearts={{ current: 4, max: 5, unlimited: true }} onClose={onClose} />);
    expect(screen.queryByText("4")).toBeNull();
  });

  it("LearnCard shows the Arabic word, opens the source and continues", async () => {
    const onContinue = jest.fn();
    const onOpenSource = jest.fn();
    const onPlayAudio = jest.fn();
    await render(
      <LearnCard
        title={lesson.title}
        line="Say this when you meet someone!"
        arabic={NODE_ARABIC["foundation-niyyah"]}
        source={{ label: "Riyad as-Salihin 844", url: "https://sunnah.com/riyadussalihin:844" }}
        onOpenSource={onOpenSource}
        onPlayAudio={onPlayAudio}
        mascotVariant="girl"
        accent={accent}
        onContinue={onContinue}
      />
    );
    expect(screen.getByText("NEW")).toBeTruthy();
    expect(screen.getByText(NODE_ARABIC["foundation-niyyah"].ar)).toBeTruthy();
    expect(screen.getByText(noBreakHyphens("As-salamu alaykum"))).toBeTruthy();
    // The title only repeats the transliteration, so it is not shown a second time.
    expect(screen.queryByText(lesson.title)).toBeNull();
    await fireEvent.press(screen.getByTestId("learn-audio"));
    expect(onPlayAudio).toHaveBeenCalledTimes(1);
    await fireEvent.press(screen.getByTestId("learn-source"));
    expect(onOpenSource).toHaveBeenCalledWith("https://sunnah.com/riyadussalihin:844");
    await fireEvent.press(screen.getByText("CONTINUE"));
    expect(onContinue).toHaveBeenCalledTimes(1);
  });

  it("ExerciseView selects, checks only once something is picked, and continues", async () => {
    const onSelect = jest.fn();
    const onCheck = jest.fn();
    const onContinue = jest.fn();
    const props = {
      kind: "multiple_choice" as const,
      prompt: mc.prompt,
      choices: mc.choices,
      mascotVariant: "girl",
      accent,
      onSelect,
      onCheck,
      onContinue
    };
    const { rerender } = await render(<ExerciseView {...props} />);
    expect(screen.getByText("Choose the answer")).toBeTruthy();
    await fireEvent.press(screen.getByText("CHECK"));
    expect(onCheck).not.toHaveBeenCalled();

    await fireEvent.press(screen.getByText("As-salamu alaikum"));
    expect(onSelect).toHaveBeenCalledWith("a");

    await rerender(<ExerciseView {...props} selectedChoiceId="a" />);
    await fireEvent.press(screen.getByText("CHECK"));
    expect(onCheck).toHaveBeenCalledTimes(1);

    await rerender(<ExerciseView {...props} selectedChoiceId="a" result={{ correct: true, correctLabel: "As-salamu alaikum" }} praiseSeed={mc.id} />);
    expect(screen.getByText(pickPraise(mc.id))).toBeTruthy();
    // Tiles are locked after checking.
    await fireEvent.press(screen.getByText("See you later"));
    expect(onSelect).toHaveBeenCalledTimes(1);
    await fireEvent.press(screen.getByText("CONTINUE"));
    expect(onContinue).toHaveBeenCalledTimes(1);

    // While the sheet slides away it keeps the last (correct) result instead of flipping to "wrong".
    await rerender(<ExerciseView {...props} praiseSeed={mc.id} />);
    expect(screen.getByText(pickPraise(mc.id))).toBeTruthy();
    expect(screen.queryByText(pickOops(mc.id))).toBeNull();
  });

  it("ExerciseView true/false still draws both tiles for Yes / No style choices", async () => {
    await render(
      <ExerciseView
        kind="true_false"
        prompt="Is salam for everyone?"
        choices={[
          { id: "yes", label: "Yes" },
          { id: "no", label: "No" }
        ]}
        mascotVariant="girl"
        accent={accent}
        onSelect={jest.fn()}
        onCheck={jest.fn()}
        onContinue={jest.fn()}
      />
    );
    expect(screen.getByText("Yes")).toBeTruthy();
    expect(screen.getByText("No")).toBeTruthy();
  });

  it("ExerciseView true/false shows two tiles and a wrong sheet with Why", async () => {
    const onSelect = jest.fn();
    const onContinue = jest.fn();
    const props = {
      kind: "true_false" as const,
      prompt: tf.prompt,
      choices: tf.choices,
      mascotVariant: "boy",
      accent,
      onSelect,
      onCheck: jest.fn(),
      onContinue,
      retrying: true
    };
    const { rerender } = await render(<ExerciseView {...props} />);
    expect(screen.getByText("True or false?")).toBeTruthy();
    expect(screen.getByText("Try again!")).toBeTruthy();
    await fireEvent.press(screen.getByText("False"));
    expect(onSelect).toHaveBeenCalledWith("false");

    await rerender(
      <ExerciseView
        {...props}
        selectedChoiceId="true"
        correctChoiceId="false"
        praiseSeed={tf.id}
        playSound={false}
        result={{ correct: false, correctLabel: "False", why: tf.explanation }}
      />
    );
    expect(screen.getByText(pickOops(tf.id))).toBeTruthy();
    expect(OOPS_WORDS).toContain(pickOops(tf.id));
    // The green tile shows the answer, so the sheet does not repeat it.
    expect(screen.queryByTestId("feedback-answer")).toBeNull();
    expect(screen.queryByText(tf.explanation)).toBeNull();
    await fireEvent.press(screen.getByText("Why?"));
    expect(screen.getByText(tf.explanation)).toBeTruthy();
    await fireEvent.press(screen.getByText("GOT IT"));
    expect(onContinue).toHaveBeenCalledTimes(1);
  });

  it("FeedbackSheet hides Why when there is no explanation and keeps a stable praise word", async () => {
    await render(<FeedbackSheet visible correct={false} correctLabel="Peace and warmth" onContinue={jest.fn()} />);
    expect(screen.getByTestId("feedback-answer")).toHaveTextContent("Answer: Peace and warmth");
    expect(screen.queryByText("Why?")).toBeNull();
    expect(pickPraise("q1")).toBe(pickPraise("q1"));
    expect(PRAISE_WORDS).toContain(pickPraise("anything"));
  });

  it("shortWhy keeps every course Why line short and drops filler", () => {
    const challenges = Object.values(LESSONS_BY_ID).flatMap((item) => item.challenges);
    expect(challenges.length).toBeGreaterThan(100);
    for (const challenge of challenges) {
      const correctLabel = challenge.choices.find((choice) => choice.id === challenge.correctChoiceId)?.label;
      const why = shortWhy({
        explanation: challenge.explanation,
        easierExplanation: challenge.easierExplanation,
        prompt: challenge.prompt,
        correctLabel
      });
      if (why) {
        expect(why.length).toBeLessThanOrEqual(WHY_MAX);
        expect(why).not.toMatch(/learner|stay fuzzy|this lesson|^(true|false)\b/i);
      }
    }
    expect(
      shortWhy({ explanation: "True. Prayer starts with readiness. Watch out for the opposite idea: X can stay fuzzy because the basics are already enough.", prompt: "Prayer starts with readiness." })
    ).toBeUndefined();
    expect(shortWhy({ explanation: "Salam begins with peace, and that shapes the tone of the whole meeting." })).toBe(
      "Salam begins with peace, and that shapes the tone of the whole meeting."
    );
    expect(noBreakHyphens("As-salamu")).toBe("As-\u2060salamu");
  });

  it("OrderGame: TRY AGAIN keeps the right start, right order calls onDone", async () => {
    const options = [
      { id: "hands", label: "Wash hands" },
      { id: "mouth", label: "Rinse mouth" },
      { id: "face", label: "Wash face" }
    ];
    const order = ["hands", "mouth", "face"];
    const shuffled = seededShuffle(options, order).map((o) => o.id);
    expect(shuffled).not.toEqual(order);
    expect(seededShuffle(options, order).map((o) => o.id)).toEqual(shuffled);

    const onDone = jest.fn();
    await render(<OrderGame title="Wudu" options={options} correctOrderIds={order} mascotVariant="boy" accent={accent} onDone={onDone} />);
    expect(screen.getByText("Put the steps in order!")).toBeTruthy();

    // Wrong: face, mouth, hands
    await fireEvent.press(screen.getByTestId("order-bank-face"));
    await fireEvent.press(screen.getByTestId("order-bank-mouth"));
    // Tap a placed chip to send it back, then place it again.
    await fireEvent.press(screen.getByTestId("order-placed-mouth"));
    expect(screen.queryByTestId("order-placed-mouth")).toBeNull();
    await fireEvent.press(screen.getByTestId("order-bank-mouth"));
    await fireEvent.press(screen.getByTestId("order-bank-hands"));
    await fireEvent.press(screen.getByText("CHECK"));
    expect(screen.getByText("Not quite! 2 steps are mixed up")).toBeTruthy();
    await fireEvent.press(screen.getByText("TRY AGAIN"));
    expect(screen.queryByTestId("order-placed-face")).toBeNull();

    // Second try: hands, face, mouth. "hands" is right and stays placed after TRY AGAIN.
    await fireEvent.press(screen.getByTestId("order-bank-hands"));
    await fireEvent.press(screen.getByTestId("order-bank-face"));
    await fireEvent.press(screen.getByTestId("order-bank-mouth"));
    await fireEvent.press(screen.getByText("CHECK"));
    expect(screen.getByText("Not quite! 2 steps are mixed up")).toBeTruthy();
    await fireEvent.press(screen.getByText("TRY AGAIN"));
    expect(screen.getByTestId("order-placed-hands")).toBeTruthy();
    expect(screen.queryByTestId("order-placed-face")).toBeNull();

    await fireEvent.press(screen.getByTestId("order-bank-mouth"));
    await fireEvent.press(screen.getByTestId("order-bank-face"));
    // The bank disappears once every step is placed.
    expect(screen.queryByTestId("order-bank")).toBeNull();
    await fireEvent.press(screen.getByText("CHECK"));
    expect(screen.getByText("Perfect order!")).toBeTruthy();
    await fireEvent.press(screen.getByText("CONTINUE"));
    expect(onDone).toHaveBeenCalledTimes(1);
  });

  it("LessonComplete shows the stats and both buttons", async () => {
    jest.useFakeTimers();
    const onContinue = jest.fn();
    const onBackToPath = jest.fn();
    await render(
      <LessonComplete
        title={lesson.title}
        xp={18}
        stars={3}
        streakDays={12}
        unlockedTitle="Reply with Peace"
        gemsReward={5}
        nextTitle="Reply with Peace"
        mascotVariant="girl"
        accent={accent}
        onContinue={onContinue}
        onBackToPath={onBackToPath}
      />
    );
    expect(screen.getByText("Lesson complete!")).toBeTruthy();
    expect(screen.getByLabelText("3 of 3 stars")).toBeTruthy();
    expect(screen.getByText("TOTAL XP")).toBeTruthy();
    expect(screen.getByText("STARS")).toBeTruthy();
    expect(screen.getByText("STREAK")).toBeTruthy();
    expect(screen.getByText("+5 gems")).toBeTruthy();
    await fireEvent.press(screen.getByText("NEXT LESSON"));
    expect(onContinue).toHaveBeenCalledTimes(1);
    await fireEvent.press(screen.getByText("BACK TO PATH"));
    expect(onBackToPath).toHaveBeenCalledTimes(1);
    await act(async () => {
      jest.advanceTimersByTime(3000);
    });
    jest.useRealTimers();
  });

  it("QuitSheet keeps learning or ends the lesson", async () => {
    const onKeepLearning = jest.fn();
    const onQuit = jest.fn();
    await render(<QuitSheet visible onKeepLearning={onKeepLearning} onQuit={onQuit} />);
    expect(screen.getByText("Wait, don't go!")).toBeTruthy();
    await fireEvent.press(screen.getByText("KEEP LEARNING"));
    expect(onKeepLearning).toHaveBeenCalledTimes(1);
    await fireEvent.press(screen.getByText("END LESSON"));
    expect(onQuit).toHaveBeenCalledTimes(1);
  });
});
