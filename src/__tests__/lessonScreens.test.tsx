import React from "react";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react-native";
import { NODE_ARABIC } from "../data/arabicTerms";
import { LESSONS_BY_ID } from "../data/course";
import {
  ExerciseView,
  FeedbackSheet,
  LearnCard,
  LessonComplete,
  LessonHeader,
  LESSON_LINE_MAX_WORDS,
  OrderGame,
  PRAISE_WORDS,
  PromptText,
  QuitSheet,
  WHY_MAX,
  WRONG_TITLE,
  getLessonLine,
  noBreakHyphens,
  pickPraise,
  retryOrder,
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

  it("LearnCard shows the title once when the mascot line is the title", async () => {
    await render(<LearnCard title="What breaks wudu" line={getLessonLine({ title: "What breaks wudu", intro: "" })} mascotVariant="boy" accent={accent} onContinue={jest.fn()} />);
    expect(screen.getAllByText("What breaks wudu")).toHaveLength(1);
    expect(screen.queryByText("NEW")).toBeNull();
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
    // No instruction eyebrow: the tiles make the task clear.
    expect(screen.queryByText("Choose the answer")).toBeNull();
    await fireEvent.press(screen.getByText("CHECK"));
    expect(onCheck).not.toHaveBeenCalled();

    await fireEvent.press(screen.getByText(noBreakHyphens("As-salamu alaykum")));
    expect(onSelect).toHaveBeenCalledWith("a");

    await rerender(<ExerciseView {...props} selectedChoiceId="a" />);
    await fireEvent.press(screen.getByText("CHECK"));
    expect(onCheck).toHaveBeenCalledTimes(1);

    await rerender(<ExerciseView {...props} selectedChoiceId="a" result={{ correct: true, correctLabel: "As-salamu alaykum" }} praiseSeed={mc.id} />);
    expect(screen.getByText(pickPraise(mc.id))).toBeTruthy();
    // Tiles are locked after checking.
    await fireEvent.press(screen.getByText("See you later"));
    expect(onSelect).toHaveBeenCalledTimes(1);
    await fireEvent.press(screen.getByText("CONTINUE"));
    expect(onContinue).toHaveBeenCalledTimes(1);

    // While the sheet slides away it keeps the last (correct) result instead of flipping to "wrong".
    await rerender(<ExerciseView {...props} praiseSeed={mc.id} />);
    expect(screen.getByText(pickPraise(mc.id))).toBeTruthy();
    expect(screen.queryByText(WRONG_TITLE)).toBeNull();
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
    expect(screen.queryByText("True or false?")).toBeNull();
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
    // Copy bank: "Correct answer:" and the answer itself, even though the green tile shows it too.
    expect(screen.getByText(WRONG_TITLE)).toBeTruthy();
    expect(screen.getByTestId("feedback-answer")).toHaveTextContent("False");
    expect(screen.queryByText(tf.explanation)).toBeNull();
    await fireEvent.press(screen.getByText("Why?"));
    expect(screen.getByText(tf.explanation)).toBeTruthy();
    await fireEvent.press(screen.getByText("GOT IT"));
    expect(onContinue).toHaveBeenCalledTimes(1);
  });

  it("FeedbackSheet hides Why when there is no explanation and keeps a stable praise word", async () => {
    await render(<FeedbackSheet visible correct={false} correctLabel="Peace and warmth" onContinue={jest.fn()} />);
    expect(screen.getByText("Correct answer:")).toBeTruthy();
    expect(screen.getByTestId("feedback-answer")).toHaveTextContent("Peace and warmth");
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

  it("OrderGame: a miss shows the order, TRY AGAIN keeps the right start, right order calls onDone", async () => {
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
    // The first miss already shows the right order (Duolingo style), as one numbered column.
    expect(screen.getByText("Correct order:")).toBeTruthy();
    expect(screen.getByTestId("feedback-list")).toHaveTextContent(/1Wash hands2Rinse mouth3Wash face/);
    await fireEvent.press(screen.getByText("TRY AGAIN"));
    expect(screen.queryByTestId("order-placed-face")).toBeNull();
    // The steps to place again show once the sheet has slid away.
    await waitFor(() => expect(screen.getByTestId("order-bank-hands")).toBeTruthy());

    // Second try: hands, face, mouth. "hands" is right and stays placed after TRY AGAIN.
    await fireEvent.press(screen.getByTestId("order-bank-hands"));
    await fireEvent.press(screen.getByTestId("order-bank-face"));
    await fireEvent.press(screen.getByTestId("order-bank-mouth"));
    await fireEvent.press(screen.getByText("CHECK"));
    expect(screen.getByText("Correct order:")).toBeTruthy();
    // Each step shows in the placed chips (or the bank) and once more in the sheet's list.
    expect(screen.getAllByText("Rinse mouth").length).toBe(2);
    expect(screen.getAllByText("Wash face").length).toBe(2);
    await fireEvent.press(screen.getByText("TRY AGAIN"));
    expect(screen.getByTestId("order-placed-hands")).toBeTruthy();
    expect(screen.queryByTestId("order-placed-face")).toBeNull();
    await waitFor(() => expect(screen.getByTestId("order-bank-mouth")).toBeTruthy());

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
    expect(screen.getByText("XP EARNED")).toBeTruthy();
    expect(screen.getByText("STARS")).toBeTruthy();
    expect(screen.getByText("STREAK")).toBeTruthy();
    expect(screen.getByText("+5 dates")).toBeTruthy();
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
  it("PromptText keeps the English whole and shows an ayah as its own right-aligned block", async () => {
    await render(<PromptText>{"What does this ayah mean? ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ وَٱلْعَصْرِ إِنَّ ٱلْإِنسَـٰنَ لَفِى خُسْرٍ (Quran 1:3)"}</PromptText>);
    expect(screen.getByText("What does this ayah mean?")).toBeTruthy();
    expect(screen.queryByText(/\bthis \(Quran/)).toBeNull();
    expect(screen.getByTestId("prompt-reference")).toHaveTextContent("Quran 1:3");
    expect(screen.getByTestId("prompt-arabic")).toHaveStyle({ textAlign: "right", fontFamily: "NotoNaskhArabic_600SemiBold" });
  });

  it("PromptText never swaps Arabic for the word this, and keeps ﷺ in the English line", async () => {
    const { rerender } = await render(<PromptText>{"Which tribe was Muhammad ﷺ from?"}</PromptText>);
    expect(screen.getByText("Which tribe was Muhammad ﷺ from?")).toBeTruthy();
    expect(screen.queryByText(/Muhammad this/)).toBeNull();
    expect(screen.getByText("ﷺ")).toHaveStyle({ fontFamily: "NotoNaskhArabic_600SemiBold" });

    await rerender(<PromptText>{"What does بِسْمِ اللَّهِ mean?"}</PromptText>);
    expect(screen.queryByText(/\bthis\b/)).toBeNull();
    // The Arabic stays inside the sentence, between "What does" and "mean?".
    expect(screen.getByText(/بِسْمِ اللَّهِ/)).toBeTruthy();
    expect(screen.getByText(/mean\?/)).toBeTruthy();
  });

  it("ExerciseView moves the choices on a retry", async () => {
    const props = {
      kind: "multiple_choice" as const,
      prompt: mc.prompt,
      choices: mc.choices,
      mascotVariant: "girl",
      accent,
      onSelect: jest.fn(),
      onCheck: jest.fn(),
      onContinue: jest.fn()
    };
    const ids = () => screen.getAllByRole("button").map((node) => node.props.testID).filter((id?: string) => id?.startsWith("choice-"));
    const { rerender } = await render(<ExerciseView {...props} />);
    const first = ids();
    await rerender(<ExerciseView {...props} retrying />);
    const second = ids();
    expect([...second].sort()).toEqual([...first].sort());
    second.forEach((id: string, index: number) => expect(id).not.toBe(first[index]));
    expect(retryOrder(["a", "b", "c"])).toEqual(["b", "c", "a"]);
  });

  it("getLessonLine gives one short line from the lesson's own words", () => {
    const words = (value: string) => value.split(/\s+/).filter(Boolean).length;
    expect(getLessonLine({ title: "Spread Salam", intro: "Salam is not just a phrase. It is a way to spread safety, warmth, and welcome." })).toBe(
      "Salam is a way to spread safety, warmth, and welcome."
    );
    expect(getLessonLine({ title: "As-Salamu Alaikum", intro: "One of the first Muslim habits is greeting people with peace: As-salamu alaikum." })).toBe(
      "One of the first Muslim habits is greeting people with peace."
    );
    expect(
      getLessonLine({
        title: "What khushu is",
        intro:
          "Khushu is built through presence, humility, and careful prayer rather than wishful feeling alone. Practice what khushu is with calmness, order, and awareness before the next prayer."
      })
    ).toBe("Khushu is built through presence, humility, and careful prayer.");
    // A long narration never fills the bubble.
    expect(
      getLessonLine({
        title: "Jami' at-Tirmidhi 1084",
        intro:
          'Abu Hurairah narrated that: The Messenger of Allah said: "When someone whose religion and character you are pleased with proposes to (someone under the care) of one of you, then marry to him.'
      })
    ).toBe("Let's read a hadith!");
    for (const item of Object.values(LESSONS_BY_ID)) {
      const line = getLessonLine(item);
      expect(words(line)).toBeLessThanOrEqual(LESSON_LINE_MAX_WORDS + 2);
      expect(line).not.toMatch(/\s(and|or|the|of|to|with)\.$/i);
    }
  });

  it("shortWhy picks the sentence about the question and never repeats the answer", () => {
    const note = 'Surah Al-Fatihah means "The Opener". It was revealed in Makkah. It has 7 ayahs.';
    expect(shortWhy({ explanation: note, prompt: "How many ayahs does Surah Al-Fatihah have?", correctLabel: "7" })).toBe("It has 7 ayahs.");
    expect(shortWhy({ explanation: note, prompt: "Where was Surah Al-Fatihah revealed?", correctLabel: "Makkah" })).toBe("It was revealed in Makkah.");
    // "A learner should..." is rewritten to "You should...", and still counts as repeating the answer.
    const answer = "A learner should know how to protect the fast when school, work, or friends make it awkward.";
    expect(shortWhy({ explanation: `True. ${answer}`, prompt: "What is the main point?", correctLabel: answer })).toBeUndefined();
    expect(shortWhy({ explanation: "Grade: Da'if (Darussalam)" })).toBeUndefined();
  });

  it("LessonComplete never cuts the daily goal on a small phone", async () => {
    jest.useFakeTimers();
    await render(
      <LessonComplete
        title={lesson.title}
        xp={10}
        stars={3}
        streakDays={0}
        goal={{ xpToday: 26, goalXp: 40 }}
        mascotVariant="girl"
        accent={accent}
        playSounds={false}
        onContinue={jest.fn()}
      />
    );
    await act(async () => {
      jest.advanceTimersByTime(3000);
    });
    expect(screen.getByTestId("stat-goal")).toHaveTextContent(/26\/40/);
    expect(screen.getByLabelText("26 of 40 XP today")).toBeTruthy();
    jest.useRealTimers();
  });
});
