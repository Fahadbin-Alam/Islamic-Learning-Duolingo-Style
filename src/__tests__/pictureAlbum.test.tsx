jest.mock("../services/gameAudio", () => ({
  playGameSound: jest.fn(),
  primeGameAudio: jest.fn(() => true)
}));

import React from "react";
import { render, screen } from "@testing-library/react-native";
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
});
