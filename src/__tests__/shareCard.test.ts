const mockCapture = jest.fn();
jest.mock("react-native-view-shot", () => ({ captureRef: (...args: unknown[]) => mockCapture(...args) }));
jest.mock("expo-sharing", () => ({ isAvailableAsync: jest.fn(async () => true), shareAsync: jest.fn(async () => undefined) }));

import { Share, type View } from "react-native";
import { shareRamadanCard } from "../services/shareCard.native";

const card = {} as View;

beforeEach(() => {
  mockCapture.mockReset();
  jest.spyOn(Share, "share").mockResolvedValue({ action: "sharedAction" });
});

it("shares the card as a picture with the invite text on iPhone", async () => {
  mockCapture.mockResolvedValue("file:///tmp/card.png");
  await shareRamadanCard(card, 5, 5);
  expect(mockCapture).toHaveBeenCalledWith(card, expect.objectContaining({ format: "png", result: "tmpfile" }));
  expect(Share.share).toHaveBeenCalledWith(expect.objectContaining({ url: "file:///tmp/card.png", message: expect.stringContaining("day 5 of Ramadan") }));
});

it("falls back to the text invite when the picture can't be made", async () => {
  mockCapture.mockRejectedValue(new Error("no view"));
  await shareRamadanCard(card, 2, 1);
  expect(Share.share).toHaveBeenCalledWith(expect.not.objectContaining({ url: expect.anything() }));
  expect(Share.share).toHaveBeenCalledWith(expect.objectContaining({ message: expect.stringContaining("day 2 of Ramadan") }));

  (Share.share as jest.Mock).mockClear();
  await shareRamadanCard(null, 3, 1);
  expect(mockCapture).toHaveBeenCalledTimes(1);
  expect(Share.share).toHaveBeenCalledWith(expect.objectContaining({ message: expect.stringContaining("day 3 of Ramadan") }));
});
