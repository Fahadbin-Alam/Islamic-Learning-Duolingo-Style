import { COURSE } from "../data/course";
import { buildTopicSearchIndex, foldSearchText, searchTopics } from "../utils/topicSearch";

const index = buildTopicSearchIndex(COURSE.sections);
const first = (query: string) => searchTopics(index, query)[0];

describe("topic search", () => {
  it("folds case, accents, hyphens, articles and Arabic letter forms", () => {
    expect(foldSearchText("Al-Ḥusayn ibn ʿAlī")).toBe("husayn ibn ali");
    expect(foldSearchText("الْحُسَيْنُ")).toBe("حسين");
    expect(foldSearchText("آية")).toBe("ايه");
  });

  it.each(["Al Husayn", "al-husayn", "Husayn", "hussain", "Hussein", "alhusayn", "الحسين", "حسين", "হুসাইন"])("finds Al-Husayn from %s", (query) => {
    expect(first(query)).toMatchObject({ topicId: "sahabah", title: "Al-Husayn ibn Ali" });
  });

  it("puts the topic first for a topic name, in any language", () => {
    expect(first("sahabah")).toMatchObject({ kind: "topic", topicId: "sahabah" });
    expect(first("prayer")).toMatchObject({ kind: "topic", topicId: "prayer" });
  });

  it("finds a Companion by other spellings, before their lessons", () => {
    expect(first("abu bakr")).toMatchObject({ kind: "unit", unitId: "sahabi-abu-bakr" });
    expect(first("Omar")).toMatchObject({ kind: "unit", unitId: "sahabi-umar-ibn-al-khattab" });
    expect(first("Othman")).toMatchObject({ kind: "unit", unitId: "sahabi-uthman-ibn-affan" });
  });

  it("finds surahs and lessons, and gives each hit a circle to open", () => {
    expect(first("fatiha")).toMatchObject({ topicId: "quran_tafseer" });
    const hijrah = searchTopics(index, "hijrah").filter((hit) => hit.kind === "lesson");
    expect(hijrah.length).toBeGreaterThan(1);
    expect(hijrah[0].unitTitle).toBeTruthy();
    for (const hit of searchTopics(index, "a", 400)) {
      if (hit.kind !== "topic") expect(hit.nodeId).toBeTruthy();
    }
  });

  it("skips reviews and finds nothing for nonsense or blanks", () => {
    expect(searchTopics(index, "Big quiz")).toEqual([]);
    expect(searchTopics(index, "zzqxv")).toEqual([]);
    expect(searchTopics(index, "  - ")).toEqual([]);
  });
});

test("tells Al-Hasan and Al-Husayn apart", () => {
  expect(first("Hassan")).toMatchObject({ title: "Al-Hasan ibn Ali" });
  expect(first("Zainab")?.title).toMatch(/Zaynab/);
});
