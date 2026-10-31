import { COURSE, LESSONS_BY_ID } from "../data/course";
import { SURAH_MEANING_AYAHS } from "../data/surahMeaningAyahs";
import { DEEP_PASSAGES, passageAyahs, SURAH_MEANINGS, SURAH_NAMES, surahMeaningUnits } from "../data/surahMeanings";
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
    expect(first.challenges.slice(0, 3).map((challenge) => challenge.prompt)).toEqual([
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

  it("puts all 286 ayahs of Al-Baqarah in its unit, its topics among them, with reviews and a final quiz", () => {
    const nodes = quran.nodes.filter((node) => node.branchId === "quran-surah-baqarah");
    const meaning = nodes.filter((node) => node.id.startsWith("surah-meaning-2-"));
    expect(meaning.filter((node) => node.kind !== "review")).toHaveLength(40);
    expect(nodes[nodes.length - 1].id).toBe("surah-meaning-2-final-quiz");
    expect(meaning.filter((node) => /-review-\d+$/.test(node.id))).toHaveLength(6);
    // Each topic comes right after the passage that holds its ayah.
    const ids = nodes.map((node) => node.id);
    expect(ids.slice(ids.indexOf("surah-meaning-2-254-257"), ids.indexOf("surah-meaning-2-254-257") + 2)).toEqual(["surah-meaning-2-254-257", "quran-surah-baqarah-ayat-al-kursi"]);
    // Each circle opens after the one before it.
    nodes.forEach((node, index) => index && expect(node.requiredNodeIds).toEqual([nodes[index - 1].id]));
    const ayatAlKursi = LESSONS_BY_ID["lesson-surah-meaning-2-254-257"];
    expect(ayatAlKursi.quote?.reference).toBe("Quran 2:255");
  });
  it("goes through each surah unit's topics and passages in ayah order, each opening after the one before", () => {
    const problems: string[] = [];
    for (const unit of surahMeaningUnits()) {
      const nodes = quran.nodes.filter((node) => node.branchId === unit.branchId);
      // The order a learner meets the ayahs in, from each skill's own Quran.com source.
      const ayahs = nodes
        .filter((node) => node.kind === "skill" && !node.id.startsWith("notes-") && !node.id.startsWith("deep-"))
        .map((node) => {
          const lesson = LESSONS_BY_ID[node.lessonIds[0]];
          const cited = new RegExp(`quran\\.com/${unit.surah}[/:](\\d+)`).exec(lesson.learnSource?.url ?? "")?.[1];
          return { id: node.id, ayah: Number(cited ?? /^(\d+)/.exec(lesson.ayahRange ?? "")?.[1]) };
        })
        .filter(({ ayah }) => ayah > 0);
      ayahs.forEach(({ id, ayah }, index) => {
        if (index && ayah < ayahs[index - 1].ayah) problems.push(`${id} (ayah ${ayah}) comes after ayah ${ayahs[index - 1].ayah}`);
      });
      nodes.forEach((node, index) => {
        if (index && !node.requiredNodeIds.includes(nodes[index - 1].id)) problems.push(`${node.id} does not open after ${nodes[index - 1].id}`);
      });
    }
    expect(problems).toEqual([]);
    const imran = quran.nodes.filter((node) => node.branchId === "quran-surah-ali-imran").map((node) => node.id);
    expect(imran.indexOf("quran-surah-ali-imran-dialogue-and-clarity")).toBeLessThan(imran.indexOf("quran-surah-ali-imran-steadfastness"));
  });
});

describe("Al-Baqarah in depth", () => {
  const baqarah = SURAH_MEANINGS.find((surah) => surah.surah === 2)!;
  const deep = DEEP_PASSAGES[2];

  it("explains every passage of Al-Baqarah: its meaning, what to take home, and harder questions", () => {
    expect(Object.keys(deep)).toEqual(baqarah.passages.map((passage) => passage.at));
    const problems: string[] = [];
    for (const [at, each] of Object.entries(deep)) {
      if (each.meaning.length < 2 || each.meaning.length > 3 || each.meaning.some((line) => line.length > 112)) problems.push(`${at} meaning`);
      if (each.takeaway.length > 95) problems.push(`${at} takeaway`);
      if (each.story && each.story.length > 200) problems.push(`${at} story`);
      if (each.q.length !== 2) problems.push(`${at}: two questions`);
      for (const [prompt, ...choices] of each.q) {
        if (prompt.length > 70) problems.push(`${at} prompt: ${prompt}`);
        if (new Set(choices).size !== 4 || choices.some((choice) => choice.length > 42)) problems.push(`${at} choices: ${prompt}`);
      }
    }
    expect(problems).toEqual([]);
  });

  it("shows the meaning, the story and the take-home line on the card, with the tafsir books as sources", () => {
    const adam = LESSONS_BY_ID["lesson-surah-meaning-2-30-39"];
    expect(adam.learnDeeper?.meaning).toEqual(deep["30-39"].meaning);
    expect(adam.learnDeeper?.story).toMatch(/Iblis was too proud/);
    expect(adam.learnDeeper?.takeaway).toBe(deep["30-39"].takeaway);
    expect(adam.learnDeeper?.sources.map((source) => [source.reference, source.url])).toEqual([
      ["Tafsir Ibn Kathir 2:30-39", "https://quran.com/2:30/tafsirs/en-tafisr-ibn-kathir"],
      ["Tafsir as-Sa'di 2:30-39", "https://quran.com/2:30/tafsirs/ar-tafseer-al-saddi"]
    ]);
    // A surah not yet taught in depth keeps its short card.
    expect(LESSONS_BY_ID["lesson-surah-meaning-3-1-9"]?.learnDeeper).toBeUndefined();
  });

  it("asks two harder questions after the card's own three, each answered on the card and sourced", () => {
    for (const passage of baqarah.passages) {
      const lesson = LESSONS_BY_ID[`lesson-surah-meaning-2-${passage.at}`];
      const hard = lesson.challenges.slice(3);
      expect(hard.map((challenge) => challenge.prompt)).toEqual(deep[passage.at].q.map(([prompt]) => prompt));
      const card = [...lesson.learnDeeper!.meaning, lesson.learnDeeper!.story ?? "", lesson.learnDeeper!.takeaway ?? ""];
      for (const challenge of hard) {
        expect(card).toContain(challenge.explanation);
        expect(challenge.source?.url).toMatch(/^https:\/\/(quran\.com\/2:\d+\/tafsirs\/en-tafisr-ibn-kathir|sunnah\.com\/bukhari:5009)$/);
      }
    }
    // The last two ayahs at night: the hadith that says it is the question's source.
    expect(LESSONS_BY_ID["lesson-surah-meaning-2-284-286"].challenges[3].source?.reference).toBe("Sahih al-Bukhari 5009");
  });

  it("gets harder through the surah", () => {
    const levels = baqarah.passages.map((passage) => LESSONS_BY_ID[`lesson-surah-meaning-2-${passage.at}`].difficulty ?? 0);
    expect(levels).toEqual([...levels].sort((left, right) => left - right));
    expect(levels[0]).toBe(1);
    expect(levels[levels.length - 1]).toBe(5);
  });
});
