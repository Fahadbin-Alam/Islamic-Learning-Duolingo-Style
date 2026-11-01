import React from "react";
import { render, screen } from "@testing-library/react-native";
import { LESSONS_BY_ID } from "../data/course";
import { getLessonPicture, pictureForLesson, pictureForPage, pictureForText } from "../data/lessonPictures";
import { LearnCard } from "../ui/lesson";
import { talkTime, teacherFor } from "../ui/lesson/Teacher";

jest.mock("../services/gameAudio", () => ({
  playGameSound: jest.fn(),
  primeGameAudio: jest.fn(() => true)
}));

const LESSONS = Object.values(LESSONS_BY_ID);
// The page's parts slide in from nothing; the test reads them before they have.
const ALL = { includeHiddenElements: true };

describe("the lesson's teacher", () => {
  it("is the camel for the Quran and the stories, and the kid dressed for the rest", () => {
    expect(teacherFor("quran_tafseer")).toEqual({ character: "camel", outfit: "reader" });
    expect(teacherFor("prophets")).toEqual({ character: "camel", outfit: "traveler" });
    expect(teacherFor("sahabah")).toEqual({ character: "camel", outfit: "traveler" });
    expect(teacherFor("scholars")).toEqual({ character: "kid", outfit: "scholar" });
    expect(teacherFor("hajj")).toEqual({ character: "kid", outfit: "ihram" });
    expect(teacherFor("akhirah")).toEqual({ character: "kid", outfit: "lantern" });
    expect(teacherFor("foundation")).toEqual({ character: "kid", outfit: "plain" });
    expect(teacherFor(undefined)).toEqual({ character: "kid", outfit: "plain" });
  });

  it("talks about as long as the words take, never for ever", () => {
    expect(talkTime("")).toBe(0);
    expect(talkTime("Hello there")).toBeGreaterThan(500);
    expect(talkTime("word ".repeat(400))).toBeLessThanOrEqual(5200);
  });

  const lesson = LESSONS.find((item) => item.lessonType === "surah" && item.learnDeeper?.story && item.learnDeeper.takeaway && item.learnFacts?.length)!;
  const props = {
    title: lesson.title,
    line: "A short line.",
    facts: lesson.learnFacts,
    deeper: lesson.learnDeeper,
    learnSource: lesson.learnSource,
    mascotVariant: "girl",
    teacher: teacherFor("quran_tafseer"),
    accent: "#58CC02",
    onContinue: () => undefined
  };

  it("stands on every page of the lesson and says what the page is about", async () => {
    for (const [page, intro] of [
      ["facts", "Here is what you learn."],
      ["meaning", "Let me explain what it means."],
      ["story", "Let me tell you the story."],
      ["takeaway", "Take this home with you."]
    ] as const) {
      await render(<LearnCard {...props} page={page} />);
      expect([page, screen.getByTestId("learn-teacher-line", ALL).props.children]).toEqual([page, intro]);
      expect(screen.getAllByTestId("lesson-teacher", ALL).length).toBe(1);
    }
    for (const page of ["start", "quiz"] as const) {
      await render(<LearnCard {...props} page={page} quizCount={3} />);
      expect([page, screen.getAllByTestId("lesson-teacher", ALL).length]).toEqual([page, 1]);
    }
    await render(<LearnCard {...props} page="teach" teach={{ lines: ["Uthman was from Quraysh."], answer: "Quraysh" }} />);
    expect(screen.getAllByTestId("lesson-teacher", ALL).length).toBe(1);
  });

  it("opens tafsir in English: an Arabic-only tafsir link is left off when an English one is there", async () => {
    const sources = [
      { reference: "Tafsir Ibn Kathir 2:1-7", url: "https://quran.com/2:1/tafsirs/en-tafisr-ibn-kathir" },
      { reference: "Tafsir as-Sa'di 2:1-7", url: "https://quran.com/2:1/tafsirs/ar-tafseer-al-saddi" }
    ];
    await render(<LearnCard {...props} deeper={{ meaning: ["A meaning."], sources }} page="meaning" />);
    const chips = screen.getAllByTestId("learn-deeper-source", ALL);
    expect(chips.length).toBe(1);
    expect(chips[0]).toHaveTextContent("Tafsir Ibn Kathir 2:1-7");
  });
});

describe("pictures of what a page teaches", () => {
  it("shows the bridge, the scales and the Pool, and keeps the Straight Path out of it", () => {
    expect(pictureForText("What is the bridge? It is set over Jahannam.")?.id).toBe("sirat");
    expect(pictureForText("As-Sirat. The bridge")?.id).toBe("sirat");
    expect(pictureForText("Guide us to as-Sirat al-Mustaqim, the straight path")).toBeUndefined();
    expect(pictureForText("Deeds are weighed on the scales.")?.id).toBe("mizan");
    expect(pictureForText("Adh-Dhahabi wrote Mizan al-I'tidal.")?.id).not.toBe("mizan");
    expect(pictureForText("The Pool of al-Kawthar is whiter than milk.")?.id).toBe("kawthar");
    expect(pictureForText("Nuh built the ark as Allah told him.")?.id).toBe("ark");
    expect(pictureForText("Its leaves were like the ears of elephants.")).toBeUndefined();
  });

  it("says the unseen things of the Last Day are only a picture to help imagine them", () => {
    for (const id of ["sirat", "mizan", "kawthar", "book-deeds", "gathering", "jannah"]) {
      expect([id, getLessonPicture(id)?.credit.note]).toEqual([id, "unseen"]);
    }
  });

  it("shows a page's picture once a lesson", () => {
    const lesson = {
      title: "Every deed",
      learnLine: "Every deed counts.",
      learnFacts: ["Deeds are weighed on the scales."],
      learnDeeper: { meaning: ["The scales are exact."], story: "Nuh built the ark.", sources: [] }
    };
    expect(pictureForLesson(lesson)).toBeUndefined();
    expect(pictureForPage(lesson, "facts")?.id).toBe("mizan");
    expect(pictureForPage(lesson, "meaning", ["start", "facts"])).toBeUndefined();
    expect(pictureForPage(lesson, "story", ["start", "facts", "meaning"])?.id).toBe("ark");
  });
});
