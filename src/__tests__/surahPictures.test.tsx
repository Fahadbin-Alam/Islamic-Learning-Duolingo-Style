jest.mock("../services/gameAudio", () => ({ playGameSound: jest.fn(), primeGameAudio: jest.fn(() => true) }));

import React from "react";
import { render, screen } from "@testing-library/react-native";
import { LESSONS_BY_ID } from "../data/course";
import { surahHasDrawing, surahNumberForTitle, surahParts, surahPictureXml } from "../data/surahPictures";
import { getCatalog } from "../translations";
import { LearnCard } from "../ui/lesson";

describe("surah pictures", () => {
  test("every surah's own lesson is matched to its surah", () => {
    const titles = Object.values(LESSONS_BY_ID).filter((lesson) => /^surah\s/i.test(lesson.title)).map((lesson) => lesson.title);
    expect(titles.filter((title) => !surahNumberForTitle(title))).toEqual([]);
    expect(new Set(titles.map(surahNumberForTitle)).size).toBe(114);
    expect(surahNumberForTitle("Surah Al-Baqarah")).toBe(2);
    expect(surahNumberForTitle("Surah Ali 'Imran")).toBe(3);
    expect(surahNumberForTitle("Kind words")).toBeUndefined();
  });

  test("most names are drawn; a name that would need a person shows its Arabic letters", () => {
    expect(Array.from({ length: 114 }, (_, i) => i + 1).filter(surahHasDrawing).length).toBeGreaterThan(90);
    for (const surah of [20, 36, 47, 112, 114]) expect(surahHasDrawing(surah)).toBe(false);
    for (let surah = 1; surah <= 114; surah += 1) {
      const xml = surahPictureXml(surah);
      expect(xml.startsWith("<svg")).toBe(true);
      // Ids are unique to the surah, so two pictures never share a gradient.
      expect(xml).not.toMatch(/id="sky"/);
    }
  });

  test("the parts a surah is taught in are listed, and their names are translated", () => {
    expect(surahParts(2).slice(0, 2)).toEqual(["Guidance for the mindful", "The hypocrites"]);
    const ar = getCatalog("ar");
    expect(surahParts(3).filter((part) => !ar[part])).toEqual([]);
  });

  test("a surah's lesson opens on its picture, its meaning on it, and lists what is inside", async () => {
    await render(
      <LearnCard
        title="Surah Al-Baqarah"
        line={'Surah Al-Baqarah means "The Cow".'}
        arabic={{ ar: "سورة البقرة", translit: "Surat al-Baqarah", meaning: "The Cow" }}
        facts={["286 ayahs", "Revealed in Madinah"]}
        surah={{ number: 2, parts: surahParts(2) }}
        mascotVariant="girl"
        accent="#21B573"
        onContinue={jest.fn()}
      />
    );
    expect(screen.getByTestId("surah-cover")).toBeTruthy();
    expect(screen.getByTestId("surah-cover-meaning")).toHaveTextContent("The Cow");
    expect(screen.getByTestId("surah-parts")).toHaveTextContent(/Inside this surah.*Guidance for the mindful/);
    expect(screen.getAllByTestId("learn-fact")).toHaveLength(2);
  });
});
