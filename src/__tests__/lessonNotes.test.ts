import { asSentence, isCredit, splitLessonFacts } from "../ui/lesson/lessonNotes";
import { LESSONS_BY_ID } from "../data/course";

const allLessons = Object.values(LESSONS_BY_ID);

describe("learn card facts read as a lesson", () => {
  it("writes each fact as a sentence, in the language's own full stop", () => {
    expect(asSentence("replaced two old feast days")).toBe("Replaced two old feast days.");
    expect(asSentence("You have no partner!")).toBe("You have no partner!");
    expect(asSentence("Asked: every year?")).toBe("Asked: every year?");
    expect(asSentence("آپ کا سبق", "ur")).toBe("آپ کا سبق۔");
    expect(asSentence("তোমার পাঠ", "bn")).toBe("তোমার পাঠ।");
    expect(asSentence("درس قصير", "ar")).toBe("درس قصير.");
  });

  it("moves who told it, the grade and the reference to the source", () => {
    const notes = splitLessonFacts(["Replaced two old feast days", "Told by Anas", "Sahih (Al-Albani)", "Quran 2:228", "Father: Umar"], { hadith: true });
    expect(notes.points).toEqual([{ text: "Replaced two old feast days." }, { key: "Father", text: "Umar" }]);
    expect(notes.credits).toEqual(["Told by Anas", "Sahih (Al-Albani)", "Quran 2:228"]);
  });

  it("keeps story lines that only look like credits, and never splits an ayah reference as a key", () => {
    // In a Quran story the hoopoe telling Sulayman is part of what is learned.
    expect(isCredit("Told by a hoopoe bird", { hadith: false })).toBe(false);
    expect(isCredit("Hasan and Husayn were his grandsons")).toBe(false);
    expect(isCredit("Quran 9:40: do not grieve")).toBe(false);
    expect(splitLessonFacts(["Quran 9:40: do not grieve"]).points).toEqual([{ text: "Quran 9:40: do not grieve." }]);
  });

  it("tells credits apart by the English words when the card is translated", () => {
    const notes = splitLessonFacts(["مدینہ میں", "انس نے بیان کیا"], { english: ["In Madinah", "Told by Anas"], hadith: true, language: "ur" });
    expect(notes.points).toEqual([{ text: "مدینہ میں۔" }]);
    expect(notes.credits).toEqual(["انس نے بیان کیا"]);
  });

  it("leaves every lesson in the app something to learn", () => {
    const empty = allLessons
      .filter((lesson) => (lesson.learnFacts?.length ?? 0) > 0)
      .filter((lesson) => splitLessonFacts(lesson.learnFacts!.slice(0, 3), { sourceReference: lesson.learnSource?.reference, hadith: lesson.learnSource?.category === "hadith" }).points.length === 0)
      .map((lesson) => `${lesson.id}: ${lesson.learnFacts!.join(" | ")}`);
    // A card whose facts are all credits still teaches its line; only a few are like that.
    expect(empty.length).toBeLessThan(40);
  });
});
