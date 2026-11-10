import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react-native";
import { comboSound } from "../services/gameSoundLibrary";
import { claimQuestChest, QUEST_CHEST_DATES, questBoard, questsFor, recordQuestEvent, resetQuestsForTests } from "../services/dailyQuests";
import { lessonRecap } from "../ui/lesson/lessonRecap";
import { listenChallenge, listenWhy, withListenQuestion, wrongMeanings, LISTEN_PROMPT } from "../ui/lesson/listenQuestion";
import { buildLessonFlow } from "../ui/lesson/lessonPages";
import { questionFormat } from "../ui/lesson/questionFormats";
import { mistakeExplanation, speakable, speakingMs } from "../services/teacherVoice";
import { NODE_ARABIC } from "../data/arabicTerms";
import { LessonComplete } from "../ui/lesson/LessonComplete";
import { FeedbackSheet } from "../ui/lesson/FeedbackSheet";
import { QuestsBanner } from "../ui/screens/DailyQuests";
import { playGameSound } from "../services/gameAudio";
import type { Challenge, Lesson } from "../types";

afterEach(() => {
  jest.useRealTimers();
});

jest.mock("../services/gameAudio", () => ({
  playGameSound: jest.fn(),
  primeGameAudio: jest.fn(() => true)
}));

const question = (id: string, prompt: string, answer: string, extra: Partial<Challenge> = {}): Challenge => ({
  id,
  type: "multiple_choice",
  prompt,
  choices: [
    { id: `${id}-a`, label: answer },
    { id: `${id}-b`, label: "Something else" }
  ],
  correctChoiceId: `${id}-a`,
  explanation: `${answer}.`,
  ...extra
});

const SOURCE = { id: "s1", title: "Sahih al-Bukhari", reference: "Sahih al-Bukhari 1", url: "https://sunnah.com/bukhari:1", site: "Sunnah.com", summary: "" } as Lesson["sources"][number];

const lesson = (challenges: Challenge[]): Lesson =>
  ({
    id: "lesson-bismillah",
    nodeId: "foundation-bismillah",
    title: "Bismillah",
    intro: "Say Bismillah before you start.",
    sources: [SOURCE],
    learnSource: SOURCE,
    challenges
  }) as unknown as Lesson;

describe("combo sounds", () => {
  it("climbs with each right answer in a row and stays at the top note", () => {
    expect(comboSound(0)).toBe("correct");
    expect(comboSound(1)).toBe("correct");
    expect(comboSound(2)).toBe("combo_2");
    expect(comboSound(5)).toBe("combo_5");
    expect(comboSound(14)).toBe("combo_6");
  });
});

describe("daily quests", () => {
  beforeEach(() => resetQuestsForTests());

  it("gives three different quests a day, the same all day, finishing two lessons always one of them", () => {
    const quests = questsFor("2026-11-10");
    expect(quests).toHaveLength(3);
    expect(new Set(quests.map((quest) => quest.kind)).size).toBe(3);
    expect(quests[0]).toEqual({ id: "lessons", kind: "lessons", target: 2 });
    expect(questsFor("2026-11-10")).toEqual(quests);
  });

  it("counts lessons and answers, says which quest just finished, and opens the chest once", () => {
    const now = new Date(2026, 10, 10, 12);
    expect(claimQuestChest(now)).toBe(0);
    for (let day = 0; day < 40; day += 1) {
      for (let n = 1; n <= 20; n += 1) recordQuestEvent({ type: "answer", correct: true, inARow: n }, now);
    }
    const first = recordQuestEvent({ type: "lesson", perfect: true, xp: 60 }, now);
    const second = recordQuestEvent({ type: "lesson", perfect: true, xp: 60 }, now);
    expect(second.map((quest) => quest.kind)).toContain("lessons");
    expect(first.map((quest) => quest.kind)).not.toContain("lessons");
    expect(questBoard(now).allDone).toBe(true);
    expect(claimQuestChest(now)).toBe(QUEST_CHEST_DATES);
    expect(claimQuestChest(now)).toBe(0);
    // A new day starts fresh.
    expect(questBoard(new Date(2026, 10, 11, 12)).doneCount).toBe(0);
  });

  it("shows on the path with its progress", async () => {
    jest.useFakeTimers();
    await render(<QuestsBanner board={questBoard()} onOpen={jest.fn()} />);
    expect(screen.getByTestId("path-quests-banner")).toBeTruthy();
    expect(screen.getByText("0 of 3 done")).toBeTruthy();
  });
});

describe("end-of-lesson recap", () => {
  it("puts missed questions first and leaves out true/false, gaps, reviews and listening", () => {
    const items = lessonRecap(
      [
        question("q1", "Who was first?", "Adam"),
        question("q2", "Is it true?", "True"),
        question("q3", "He said ___ first.", "Bismillah"),
        question("q4", "Which city?", "Makkah"),
        question("q5", "From before?", "Madinah", { isReview: true }),
        question("q6", LISTEN_PROMPT, "In Allah's name", { listen: { ar: "بِسْمِ اللَّهِ", translit: "Bismillah" } })
      ],
      ["q4"]
    );
    expect(items.map((item) => item.answer)).toEqual(["Makkah", "Adam"]);
    expect(items[0].missed).toBe(true);
  });

  it("shows the perfect ribbon, the recap and the quest just done, with their sounds", async () => {
    jest.useFakeTimers();
    jest.mocked(playGameSound).mockClear();
    await render(
      <LessonComplete
        title="Wudu"
        xp={12}
        stars={3}
        streakDays={2}
        perfect
        accuracy={100}
        bestInARow={6}
        recap={[{ question: "Who was first?", answer: "Adam", missed: false }]}
        questsDone={["Finish 2 lessons"]}
        mascotVariant="boy"
        accent="#21B573"
        onContinue={jest.fn()}
      />
    );
    await act(async () => {
      jest.advanceTimersByTime(6000);
    });
    expect(jest.mocked(playGameSound).mock.calls.map(([event]) => event)).toEqual(expect.arrayContaining(["lesson_complete", "perfect", "quest"]));
    expect(screen.getByText("Perfect lesson!")).toBeTruthy();
    expect(screen.getByTestId("perfect-ribbon")).toBeTruthy();
    expect(screen.getByTestId("lesson-recap")).toBeTruthy();
    expect(screen.getByText("Best run: 6 in a row")).toBeTruthy();
    expect(screen.getByText("Quest done: Finish 2 lessons")).toBeTruthy();
  });
});

describe("listening questions", () => {
  it("asks what the learn card's checked Arabic word means, with fair wrong answers and the lesson's source", () => {
    const listen = listenChallenge(lesson([question("q1", "Say it when?", "Before eating")]), "foundation-bismillah")!;
    expect(listen.prompt).toBe(LISTEN_PROMPT);
    expect(listen.choices).toHaveLength(4);
    const right = listen.choices.find((choice) => choice.id === listen.correctChoiceId)!;
    expect(right.label).toBe(NODE_ARABIC["foundation-bismillah"].meaning);
    expect(new Set(listen.choices.map((choice) => choice.label.toLowerCase())).size).toBe(4);
    expect(listen.source).toBe(SOURCE);
    expect(listen.listen?.ar).toBe(NODE_ARABIC["foundation-bismillah"].ar);
    expect(listenWhy(listen, "en")).toContain("In Allah's name");
  });

  it("never offers a wrong meaning that shares a word with the right one", () => {
    for (const nodeId of Object.keys(NODE_ARABIC).slice(0, 80)) {
      const term = NODE_ARABIC[nodeId];
      const words = (text: string) => text.toLowerCase().replace(/[^a-z' ]/g, " ").split(/\s+/).filter((word) => word.length > 3);
      for (const wrong of wrongMeanings(term, nodeId)) {
        expect(words(wrong).filter((word) => words(term.meaning).includes(word))).toEqual([]);
      }
    }
  });

  it("is skipped for a lesson without a checked word or a source", () => {
    expect(listenChallenge(lesson([]), "not-a-node")).toBeUndefined();
    expect(listenChallenge({ ...lesson([]), sources: [], learnSource: undefined }, "foundation-bismillah")).toBeUndefined();
  });

  it("comes after the lesson's own questions, before reviews, as a plain tap question with no page before it", () => {
    const base = lesson([question("q1", "Say it when?", "Before eating"), question("r1", "From before?", "Madinah", { isReview: true })]);
    const withListen = withListenQuestion(base, "foundation-bismillah");
    expect(withListen.challenges.map((challenge) => challenge.id)).toEqual(["q1", "lesson-bismillah-listen", "r1"]);
    expect(withListenQuestion(withListen, "foundation-bismillah")).toBe(withListen);
    const listen = withListen.challenges[1];
    expect(questionFormat(listen)).toBe("choose");
    const flow = buildLessonFlow(withListen);
    const at = flow.findIndex((step) => "index" in step && step.index === 1 && !("kind" in step));
    expect(at).toBeGreaterThan(0);
    const before = flow[at - 1];
    expect("kind" in before && before.kind === "learn" && before.page === "teach").toBe(false);
  });
});

describe("the teacher explains a mistake out loud", () => {
  it("says the right answer and why, ﷺ in words, and no Arabic letters to an English voice", () => {
    const text = mistakeExplanation("Muhammad ﷺ", "He ﷺ said بِسْمِ اللَّهِ before eating.", "en");
    expect(text).toBe("The right answer is: Muhammad peace be upon him. He peace be upon him said before eating.");
    expect(speakable("بِسْمِ اللَّهِ", "ar")).toBe("بِسْمِ اللَّهِ");
    expect(speakingMs(text)).toBeGreaterThan(2000);
  });

  it("shows a speaker on a wrong answer's sheet only", async () => {
    jest.useFakeTimers();
    const onListen = jest.fn();
    const { rerender } = await render(<FeedbackSheet visible correct={false} correctLabel="Adam" why="He was first." onContinue={jest.fn()} onListen={onListen} playSound={false} />);
    fireEvent.press(screen.getByTestId("feedback-listen"));
    expect(onListen).toHaveBeenCalled();
    await rerender(<FeedbackSheet visible correct onContinue={jest.fn()} onListen={onListen} playSound={false} />);
    expect(screen.queryByTestId("feedback-listen")).toBeNull();
  });
});
