const mockVoices = jest.fn();
jest.mock("expo-speech", () => ({ getAvailableVoicesAsync: () => mockVoices() }));

import { arabicLetters, findArabicVoice, recitationForArabic, resetArabicVoiceForTests } from "../services/arabicVoice";

const AUDIO = "https://cdn.islamic.network/quran/audio/128/ar.alafasy/";

beforeEach(() => {
  resetArabicVoiceForTests();
  mockVoices.mockReset();
});

describe("words that are a whole ayah play the reciter", () => {
  test("Al-hamdu lillahi rabbil-alamin is Quran 1:2, and Iyyaka na'budu is 1:5", () => {
    expect(recitationForArabic("الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ")).toBe(`${AUDIO}2.mp3`);
    expect(recitationForArabic("إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ")).toBe(`${AUDIO}5.mp3`);
  });

  test("other words and parts of an ayah get no recitation", () => {
    expect(recitationForArabic("السَّلَامُ عَلَيْكُمْ")).toBeNull();
    expect(recitationForArabic("الْحَمْدُ لِلَّهِ")).toBeNull();
  });

  test("the plain and Uthmani spellings of an ayah read as the same letters", () => {
    expect(arabicLetters("ٱلۡحَمۡدُ لِلَّهِ رَبِّ ٱلۡعَٰلَمِينَ")).toBe(arabicLetters("الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ"));
  });
});

describe("the device's Arabic voice", () => {
  test("is found when the device has one", async () => {
    mockVoices.mockResolvedValue([
      { identifier: "en-1", language: "en-US" },
      { identifier: "ar-1", language: "ar-SA" }
    ]);
    await expect(findArabicVoice()).resolves.toBe("ar-1");
  });

  test("is null on a device with only English voices, like a PC without the Arabic language pack", async () => {
    mockVoices.mockResolvedValue([{ identifier: "en-1", language: "en-US" }]);
    await expect(findArabicVoice()).resolves.toBeNull();
  });

  test("waits once for a voice list that fills late, and survives a speech engine error", async () => {
    mockVoices.mockResolvedValueOnce([]).mockResolvedValueOnce([{ identifier: "ar-2", language: "ar" }]);
    await expect(findArabicVoice()).resolves.toBe("ar-2");
    resetArabicVoiceForTests();
    mockVoices.mockImplementation(() => {
      throw new Error("no engine");
    });
    await expect(findArabicVoice()).resolves.toBeNull();
  });

  test("asks again after finding no voice, but keeps a voice once found", async () => {
    mockVoices.mockResolvedValue([{ identifier: "en-1", language: "en-US" }]);
    await expect(findArabicVoice()).resolves.toBeNull();
    mockVoices.mockResolvedValue([{ identifier: "ar-3", language: "ar_EG" }]);
    await expect(findArabicVoice()).resolves.toBe("ar-3");
    mockVoices.mockResolvedValue([]);
    await expect(findArabicVoice()).resolves.toBe("ar-3");
  });
});
