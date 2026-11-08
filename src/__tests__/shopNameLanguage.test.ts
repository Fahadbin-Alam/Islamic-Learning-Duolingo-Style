jest.mock("../services/gameAudio", () => ({
  playGameSound: jest.fn(),
  primeGameAudio: jest.fn(() => true)
}));

import { SHOP_ITEMS } from "../data/course";
import { setActiveLanguage } from "../i18n";
import { displayName } from "../ui/screens/ShopView";

// The heart pack's name came from the English catalog, so the Bangla, Urdu and Arabic shops said "Heart pack".
describe("shop item names follow the app language", () => {
  afterEach(() => setActiveLanguage("en"));

  it.each([
    ["en", "Heart pack"],
    ["bn", "হার্ট প্যাক"],
    ["ur", "دلوں کا پیک"],
    ["ar", "حزمة قلوب"]
  ] as const)("%s", (language, name) => {
    setActiveLanguage(language);
    const pack = SHOP_ITEMS.find((item) => item.type === "heart_pack");
    expect(pack && displayName(pack)).toBe(name);
    for (const item of SHOP_ITEMS) {
      if (language !== "en") expect(/^[A-Za-z ]+$/.test(displayName(item))).toBe(false);
    }
  });
});
