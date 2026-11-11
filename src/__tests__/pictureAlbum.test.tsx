jest.mock("../services/gameAudio", () => ({
  playGameSound: jest.fn(),
  primeGameAudio: jest.fn(() => true)
}));

import React from "react";
import { fireEvent, render, screen } from "@testing-library/react-native";
import { ALBUM_SETS, setsFinishedBy } from "../data/albumSets";
import { getLessonPicture, LESSON_PICTURE_IDS } from "../data/lessonPictures";
import { addToAlbum, albumPictureIds, resetAlbumForTests } from "../services/pictureAlbum";
import { LessonComplete } from "../ui/lesson";
import { ALBUM_PICTURES, PictureAlbumSheet } from "../ui/screens/PictureAlbum";

beforeEach(() => resetAlbumForTests());

describe("picture album", () => {
  test("a lesson's pictures go in once; only the new ones come back, in order", () => {
    expect(addToAlbum(["kaaba", undefined, "ark", "kaaba"])).toEqual(["kaaba", "ark"]);
    expect(addToAlbum(["ark", "nile"])).toEqual(["nile"]);
    expect(addToAlbum(["nile"])).toEqual([]);
    expect(albumPictureIds()).toEqual(["kaaba", "ark", "nile"]);
  });

  test("the album can hold every lesson picture", () => {
    expect(ALBUM_PICTURES.map((picture) => picture.id)).toEqual(LESSON_PICTURE_IDS);
  });

  test("found pictures show moving; the rest are locked, and the count says how many", async () => {
    addToAlbum(["kaaba", "ark"]);
    await render(<PictureAlbumSheet visible onClose={jest.fn()} />);
    expect(screen.getAllByTestId("album-found", { includeHiddenElements: true })).toHaveLength(2);
    expect(screen.getAllByTestId("album-locked", { includeHiddenElements: true })).toHaveLength(ALBUM_PICTURES.length - 2);
    expect(screen.getByTestId("album-count", { includeHiddenElements: true }).props.children).toBe(`2 of ${ALBUM_PICTURES.length} found`);
  });

  test("the lesson complete card shows the new pictures", async () => {
    const newPictures = ["arafah", "mina", "muzdalifah", "kaaba"].map((id) => getLessonPicture(id)!);
    await render(<LessonComplete title="Hajj" xp={10} stars={3} streakDays={1} newPictures={newPictures} mascotVariant="girl" accent="#21B573" playSounds={false} onContinue={jest.fn()} />);
    expect(screen.getByText("4 new pictures for your album!", { includeHiddenElements: true })).toBeTruthy();
    expect(screen.getAllByTestId("complete-album-picture", { includeHiddenElements: true })).toHaveLength(3);
  });

  test("every picture the album can hold belongs to a set, and every set's pictures exist", () => {
    const inSets = new Set(ALBUM_SETS.flatMap((set) => set.pictures));
    expect(LESSON_PICTURE_IDS.filter((id) => !inSets.has(id))).toEqual([]);
    for (const set of ALBUM_SETS) {
      expect(set.pictures.length).toBeGreaterThanOrEqual(2);
      for (const id of set.pictures) expect(getLessonPicture(id)).toBeTruthy();
    }
  });

  test("a set counts as finished only on the lesson that finds its last picture", () => {
    const lands = ALBUM_SETS.find((set) => set.id === "lands")!;
    const [first, ...rest] = lands.pictures;
    expect(setsFinishedBy([first], [first])).toEqual([]);
    expect(setsFinishedBy(rest, lands.pictures).map((set) => set.id)).toEqual(["lands"]);
    // Found again later: no second badge.
    expect(setsFinishedBy(["kaaba"], [...lands.pictures, "kaaba"]).map((set) => set.id)).not.toContain("lands");
  });

  test("the sets above the album show what is found, and a tap shows only that set", async () => {
    const lands = ALBUM_SETS.find((set) => set.id === "lands")!;
    addToAlbum([...lands.pictures, "kaaba"]);
    await render(<PictureAlbumSheet visible onClose={jest.fn()} />);
    const count = (id: string) => screen.getByTestId(`album-set-${id}-count`, { includeHiddenElements: true }).props.children.join("");
    expect(count("lands")).toBe(`${lands.pictures.length}/${lands.pictures.length}`);
    const makkah = ALBUM_SETS.find((set) => set.id === "makkah")!;
    expect(count("makkah")).toBe(`1/${makkah.pictures.length}`);
    await fireEvent.press(screen.getByTestId("album-set-makkah", { includeHiddenElements: true }));
    expect(screen.getAllByTestId("album-found", { includeHiddenElements: true })).toHaveLength(1);
    expect(screen.getAllByTestId("album-locked", { includeHiddenElements: true })).toHaveLength(makkah.pictures.length - 1);
    await fireEvent.press(screen.getByTestId("album-set-all", { includeHiddenElements: true }));
    expect(screen.getAllByTestId("album-found", { includeHiddenElements: true })).toHaveLength(lands.pictures.length + 1);
  });

  test("the lesson complete card gives a finished set its badge", async () => {
    const lands = ALBUM_SETS.find((set) => set.id === "lands")!;
    const newPictures = lands.pictures.map((id) => getLessonPicture(id)!);
    await render(<LessonComplete title="Blessed lands" xp={10} stars={3} streakDays={1} newPictures={newPictures} finishedSets={[lands]} mascotVariant="girl" accent="#21B573" playSounds={false} onContinue={jest.fn()} />);
    expect(screen.getAllByTestId("complete-album-set", { includeHiddenElements: true })).toHaveLength(1);
    expect(screen.getByText("Set complete!", { includeHiddenElements: true })).toBeTruthy();
  });
});
