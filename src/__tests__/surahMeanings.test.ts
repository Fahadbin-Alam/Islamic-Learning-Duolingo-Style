import { COURSE, LESSONS_BY_ID } from "../data/course";
import { SURAH_MEANING_AYAHS } from "../data/surahMeaningAyahs";
import { passageAyahs, SURAH_MEANINGS, SURAH_NAMES, surahMeaningUnits } from "../data/surahMeanings";
import { quranAudioUrl, SURAH_AYAH_COUNTS } from "../services/quranAudio";
import { lessonLineWords, LESSON_LINE_MAX_WORDS } from "../ui/lesson/lessonSteps";

const quran = COURSE.sections.find((section) => section.topicId === "quran_tafseer")!;
const answerOf = (lessonId: string, index: number) => {
  const challenge = LESSONS_BY_ID[lessonId].challenges[index];
  return challenge.choices.find((choice) => choice.id === challenge.correctChoiceId)?.label;
};

describe("the meaning of whole surahs", () => {
  it("teaches every ayah of each surah once, in order", () => {
    expect(SURAH_NAMES).toHaveLength(114);
    for (const surah of SURAH_MEANINGS) {
      let next = 1;
      for (const passage of surah.passages) {
        const [from, to] = passageAyahs(passage.at);
        expect({ surah: surah.surah, at: passage.at, from }).toEqual({ surah: surah.surah, at: passage.at, from: next });
        expect(to).toBeGreaterThanOrEqual(from);
        next = to + 1;
      }
      expect({ surah: surah.surah, last: next - 1 }).toEqual({ surah: surah.surah, last: SURAH_AYAH_COUNTS[surah.surah - 1] });
    }
  });

  it("keeps every card short, with distinct names and four different choices", () => {
    const problems: string[] = [];
    for (const surah of SURAH_MEANINGS) {
      const titles = surah.passages.map((passage) => passage.title);
      if (new Set(titles).size !== titles.length) problems.push(`${surah.surah}: two passages share a title`);
      for (const passage of surah.passages) {
        const words = lessonLineWords(passage.line);
        if (passage.line.length > 64 || words < 3 || words > LESSON_LINE_MAX_WORDS) problems.push(`${surah.surah}:${passage.at} line: ${passage.line}`);
        if (passage.title.length > 30) problems.push(`${surah.surah}:${passage.at} title: ${passage.title}`);
        if (!passage.facts.length || passage.facts.length > 3 || passage.facts.some((fact) => fact.length > 40)) problems.push(`${surah.surah}:${passage.at} facts`);
        if (new Set(passage.q.slice(1)).size !== 4) problems.push(`${surah.surah}:${passage.at}: repeated choice`);
        const [from, to] = passageAyahs(passage.at);
        if (passage.ayah && (passage.ayah < from || passage.ayah > to)) problems.push(`${surah.surah}:${passage.at}: ayah ${passage.ayah} is outside it`);
      }
    }
    expect(problems).toEqual([]);
  });

  it("shows each passage's ayah in Arabic, with its recitation and its source", () => {
    for (const unit of surahMeaningUnits()) {
      for (const lesson of unit.lessons.filter((each) => each.lessonType !== "review")) {
        const saved = LESSONS_BY_ID[lesson.id];
        expect(saved.quote?.reference).toMatch(new RegExp(`^Quran ${unit.surah}:\\d+$`));
        expect(saved.quote?.text).toBe(SURAH_MEANING_AYAHS[(saved.quote?.reference ?? "").replace("Quran ", "")]);
        expect(quranAudioUrl(saved.quote?.reference)).toMatch(/\.mp3$/);
        expect(saved.learnSource?.url).toBe(`https://quran.com/${unit.surah}/${saved.ayahRange ?? ""}`);
        expect(saved.challenges.every((challenge) => challenge.resourceUrl === saved.learnSource?.url)).toBe(true);
      }
    }
  });

  it("asks what each passage says: its question, its name, and a true or false line", () => {
    const first = LESSONS_BY_ID["lesson-surah-meaning-2-1-7"];
    expect(first.learnLine).toBe("This Book has no doubt; it guides those mindful of Allah.");
    expect(first.challenges.map((challenge) => challenge.prompt)).toEqual([
      "Who does this Book guide?",
      "Ayahs 1-7: what are they about?",
      "Ayahs 1-7 say: This Book has no doubt; it guides those mindful of Allah."
    ]);
    expect(answerOf(first.id, 0)).toBe("Those mindful of Allah");
    expect(answerOf(first.id, 1)).toBe("Guidance for the mindful");
    expect(answerOf(first.id, 2)).toBe("True");
    // Every other passage's line is false for it, and its Why is its own line.
    const second = LESSONS_BY_ID["lesson-surah-meaning-2-8-20"];
    expect(answerOf(second.id, 2)).toBe("False");
    expect(second.challenges[2].explanation).toBe(second.learnLine);
  });

  it("puts all 286 ayahs of Al-Baqarah at the end of its unit, with reviews and a final quiz", () => {
    const nodes = quran.nodes.filter((node) => node.branchId === "quran-surah-baqarah");
    const meaning = nodes.filter((node) => node.id.startsWith("surah-meaning-2-"));
    expect(nodes.slice(-meaning.length)).toEqual(meaning);
    expect(meaning.filter((node) => node.kind !== "review")).toHaveLength(40);
    expect(meaning[meaning.length - 1].id).toBe("surah-meaning-2-final-quiz");
    expect(meaning.filter((node) => /-review-\d+$/.test(node.id))).toHaveLength(6);
    // Each circle opens after the one before it.
    meaning.forEach((node, index) => expect(node.requiredNodeIds).toEqual([nodes[nodes.length - meaning.length + index - 1].id]));
    const ayatAlKursi = LESSONS_BY_ID["lesson-surah-meaning-2-254-257"];
    expect(ayatAlKursi.quote?.reference).toBe("Quran 2:255");
  });
});
