import React from "react";
import { Dimensions, ScrollView, StyleSheet, Text } from "react-native";
import { act, fireEvent, render, screen } from "@testing-library/react-native";
import { NODE_ARABIC } from "../data/arabicTerms";
import {
  ExerciseView,
  FeedbackSheet,
  LearnCard,
  LessonBottomBar,
  LessonComplete,
  OrderGame,
  SCROLL_HINT_SLACK,
  SHEET_MAX_SHARE,
  attemptOrder,
  noBreakHyphens,
  sameReference,
  useScrollMore
} from "../ui/lesson";

jest.mock("../services/gameAudio", () => ({
  playGameSound: jest.fn(),
  primeGameAudio: jest.fn(() => true)
}));

const accent = "#1CB66D";
const NASKH = "NotoNaskhArabic_600SemiBold";
const choices = [
  { id: "a", label: "As-salamu alaykum" },
  { id: "b", label: "See you later" },
  { id: "c", label: "Nice to meet you" }
];
const base = {
  kind: "multiple_choice" as const,
  prompt: "What do Muslims say when they meet?",
  choices,
  mascotVariant: "girl",
  accent,
  onSelect: jest.fn(),
  onCheck: jest.fn(),
  onContinue: jest.fn()
};
const tileIds = () =>
  screen
    .getAllByRole("button")
    .map((node) => node.props.testID as string | undefined)
    .filter((id): id is string => Boolean(id?.startsWith("choice-")));

describe("lesson ui (round 2)", () => {
  it("attemptOrder is fixed per try, moves every tile and swaps two", () => {
    expect(attemptOrder(["a", "b", "c"], 0)).toEqual(["a", "b", "c"]);
    expect(attemptOrder(["a", "b", "c"], 1)).toEqual(["b", "c", "a"]);
    expect(attemptOrder(["a", "b", "c"], 2)).toEqual(["c", "a", "b"]);
    expect(attemptOrder(["a", "b", "c"], 3)).toEqual(["b", "c", "a"]);
    expect(attemptOrder(["true", "false"], 1)).toEqual(["false", "true"]);
    expect(attemptOrder(["true", "false"], 2)).toEqual(["false", "true"]);
    expect(attemptOrder(["a", "b", "c", "d"], 1)).toEqual(attemptOrder(["a", "b", "c", "d"], 1));
  });

  it("ExerciseView keeps the retry order and the Try again chip through CHECK and the sheet", async () => {
    const { rerender } = await render(<ExerciseView {...base} />);
    const first = tileIds();
    // The old flow: retrying on the second try, dropped by the reducer the moment CHECK answers.
    await rerender(<ExerciseView {...base} retrying selectedChoiceId="a" />);
    const retry = tileIds();
    retry.forEach((id, index) => expect(id).not.toBe(first[index]));
    expect(screen.getByText("Try again!")).toBeTruthy();

    await rerender(<ExerciseView {...base} retrying={false} selectedChoiceId="a" correctChoiceId="a" result={{ correct: true, correctLabel: "As-salamu alaykum" }} />);
    expect(tileIds()).toEqual(retry);
    expect(screen.getByText("Try again!")).toBeTruthy();

    // A new question starts over in its own order.
    const next = [
      { id: "x", label: "Peace" },
      { id: "y", label: "War" }
    ];
    await rerender(<ExerciseView {...base} prompt="Salam means?" choices={next} retrying={false} />);
    expect(tileIds()).toEqual(["choice-x", "choice-y"]);
    expect(screen.queryByText("Try again!")).toBeNull();
  });

  it("ExerciseView attempt swaps True and False and holds them while the sheet is up", async () => {
    const tf = {
      ...base,
      kind: "true_false" as const,
      prompt: "Salam means peace.",
      choices: [
        { id: "true", label: "True" },
        { id: "false", label: "False" }
      ]
    };
    const { rerender } = await render(<ExerciseView {...tf} attempt={0} />);
    expect(tileIds()).toEqual(["choice-true", "choice-false"]);
    await rerender(<ExerciseView {...tf} attempt={1} />);
    expect(tileIds()).toEqual(["choice-false", "choice-true"]);
    await rerender(<ExerciseView {...tf} attempt={0} selectedChoiceId="true" result={{ correct: true, correctLabel: "True" }} />);
    expect(tileIds()).toEqual(["choice-false", "choice-true"]);
  });

  it("ExerciseView shows a REVIEW chip for a question from an earlier lesson", async () => {
    const { rerender } = await render(<ExerciseView {...base} />);
    expect(screen.queryByText("REVIEW")).toBeNull();
    await rerender(<ExerciseView {...base} review />);
    expect(screen.getByTestId("exercise-review")).toHaveTextContent("REVIEW");
  });

  it("LearnCard hides NEW for a known word, draws ﷺ in the Naskh face and shows facts and a full quote", async () => {
    const onOpenSource = jest.fn();
    // Made-up test text and book, so no narration is misquoted.
    const quote = {
      text: "A long test narration that names the Prophet (ﷺ) and keeps going so that it has to wrap onto more lines.",
      reference: "Test Collection 12a"
    };
    await render(
      <LearnCard
        title="Learn and teach"
        line="Let's read a hadith!"
        arabic={{ ar: "مُحَمَّد ﷺ", translit: "Muhammad ﷺ", meaning: "The final Messenger" }}
        isNewWord={false}
        facts={["Father: Abdullah", "Born in Makkah", "Mother: Aminah", "One too many"]}
        quote={quote}
        source={{ label: "Collection 12a", url: "https://example.org/collection:12a" }}
        onOpenSource={onOpenSource}
        mascotVariant="boy"
        accent={accent}
        onContinue={jest.fn()}
      />
    );
    expect(screen.queryByText("NEW")).toBeNull();
    // Every ﷺ on the card (Arabic word, transliteration, quote) uses the Naskh face.
    for (const sign of screen.getAllByText("ﷺ")) {
      expect(sign).toHaveStyle({ fontFamily: NASKH });
    }
    expect(screen.getAllByText("ﷺ").length).toBeGreaterThanOrEqual(3);
    // Up to three chips; "Father:" is the soft key of the first one.
    expect(screen.getByTestId("learn-facts")).toHaveTextContent(/Father: Abdullah.*Born in Makkah.*Mother: Aminah/);
    expect(screen.queryByText("One too many")).toBeNull();
    // The quote is shown in full, and its reference doubles as the source link (not said twice).
    expect(screen.getByTestId("learn-quote-text")).toHaveTextContent(quote.text);
    expect(screen.getAllByTestId("learn-source")).toHaveLength(1);
    expect(screen.getByTestId("learn-source")).toHaveTextContent("Test Collection 12a");
    await fireEvent.press(screen.getByTestId("learn-source"));
    expect(onOpenSource).toHaveBeenCalledWith("https://example.org/collection:12a");
  });

  it("LearnCard keeps NEW for a new word and shows a different source next to the quote reference", async () => {
    await render(
      <LearnCard
        title={NODE_ARABIC["foundation-niyyah"].translit}
        line="Say this when you meet someone!"
        arabic={NODE_ARABIC["foundation-niyyah"]}
        quote={{ text: "A short test line.", reference: "Test Book 54" }}
        source={{ label: "Other Book 844", url: "https://example.org/other:844" }}
        mascotVariant="girl"
        accent={accent}
        onContinue={jest.fn()}
      />
    );
    expect(screen.getByText("NEW")).toBeTruthy();
    expect(screen.getByTestId("learn-quote-reference")).toHaveTextContent("Test Book 54");
    expect(screen.getByTestId("learn-source")).toHaveTextContent("Other Book 844");
  });

  it("sameReference matches the same narration written two ways", () => {
    expect(sameReference("Sahih Muslim 1400a", "Muslim 1400a")).toBe(true);
    expect(sameReference("Jami' at-Tirmidhi 1084 (Da'if, Darussalam)", "Tirmidhi 1084")).toBe(true);
    expect(sameReference("Sunan Ibn Majah 1855", "Ibnmajah 1855")).toBe(true);
    expect(sameReference("Mishkat al-Masabih 3096", "Mishkat 3096")).toBe(true);
    expect(sameReference("Sahih Muslim 54", "Riyad as-Salihin 844")).toBe(false);
    expect(sameReference("Sahih Muslim 54", "Muslim 55")).toBe(false);
  });

  it("FeedbackSheet caps the scrolling answer at 60% of the window and lists the order in one column", async () => {
    const long = "A very long right answer that keeps going. ".repeat(14).trim();
    const { rerender } = await render(<FeedbackSheet visible correct={false} correctLabel={long} why="Because it says so." onContinue={jest.fn()} />);
    const body = screen.getByTestId("feedback-body");
    const maxHeight = StyleSheet.flatten(body.props.style).maxHeight as number;
    expect(maxHeight).toBeGreaterThan(0);
    expect(maxHeight).toBeLessThan(Dimensions.get("window").height * SHEET_MAX_SHARE);
    // The title and the button are outside the scrolling part, so they always show.
    expect(screen.getByTestId("feedback-answer")).toHaveTextContent(noBreakHyphens(long));
    expect(screen.getByText("Correct answer:")).toBeTruthy();
    expect(screen.getByTestId("feedback-continue")).toBeTruthy();

    await rerender(<FeedbackSheet visible correct={false} title="Correct order:" correctList={["One", "Two", "Three"]} onContinue={jest.fn()} />);
    const list = screen.getByTestId("feedback-list");
    expect(StyleSheet.flatten(list.props.style).flexDirection ?? "column").toBe("column");
    expect(list).toHaveTextContent(/1One2Two3Three/);
  });

  it("OrderGame shows the right order on the first wrong CHECK", async () => {
    const options = [
      { id: "a", label: "First step" },
      { id: "b", label: "Second step" }
    ];
    await render(
      <OrderGame title="Steps" options={options} correctOrderIds={["a", "b"]} initialPlacedIds={["b", "a"]} initialChecked mascotVariant="boy" accent={accent} onDone={jest.fn()} />
    );
    expect(screen.getByText("Correct order:")).toBeTruthy();
    expect(screen.getByTestId("feedback-list")).toHaveTextContent(/1First step2Second step/);
  });

  it("LessonComplete draws ﷺ in the Unlocked pill and sizes card labels without adjustsFontSizeToFit", async () => {
    jest.useFakeTimers();
    await render(
      <LessonComplete
        headline="You jumped ahead!"
        title="Lut"
        xp={20}
        stars={3}
        streakDays={2}
        unlockedTitle="Muhammad ﷺ"
        mascotVariant="boy"
        accent={accent}
        playSounds={false}
        onContinue={jest.fn()}
      />
    );
    expect(screen.getByText("You jumped ahead!")).toBeTruthy();
    expect(screen.getByText("ﷺ")).toHaveStyle({ fontFamily: NASKH });
    expect(screen.getByText(/Unlocked:/)).toBeTruthy();
    for (const label of ["TOTAL XP", "STARS", "STREAK"]) {
      expect(screen.getByText(label).props.adjustsFontSizeToFit).toBeUndefined();
    }
    await act(async () => {
      jest.advanceTimersByTime(3000);
    });
    jest.useRealTimers();
  });

  it("the scroll hint sits in the bottom bar and shows only when more than a little is hidden", async () => {
    function Harness() {
      const { ref, scrollProps, more, scrollDown } = useScrollMore();
      return (
        <>
          <ScrollView ref={ref} testID="harness-scroll" {...scrollProps}>
            <Text>Content</Text>
          </ScrollView>
          <LessonBottomBar scrollHint={{ visible: more, onPress: scrollDown }}>
            <Text>Bar</Text>
          </LessonBottomBar>
        </>
      );
    }
    await render(<Harness />);
    const scroll = screen.getByTestId("harness-scroll");
    await fireEvent(scroll, "layout", { nativeEvent: { layout: { x: 0, y: 0, width: 320, height: 400 } } });
    await fireEvent(scroll, "contentSizeChange", 320, 400 + SCROLL_HINT_SLACK - 10);
    expect(screen.queryByTestId("scroll-more")).toBeNull();
    await fireEvent(scroll, "contentSizeChange", 320, 400 + SCROLL_HINT_SLACK + 30);
    expect(screen.getByTestId("scroll-more")).toBeTruthy();
    expect(screen.getByLabelText("Scroll down")).toBeTruthy();
    await fireEvent.scroll(scroll, { nativeEvent: { contentOffset: { x: 0, y: 60 }, contentSize: { width: 320, height: 470 }, layoutMeasurement: { width: 320, height: 400 } } });
    expect(screen.queryByTestId("scroll-more")).toBeNull();
  });
});
