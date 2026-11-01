import React from "react";
import { Linking } from "react-native";
import { fireEvent, render, screen } from "@testing-library/react-native";
import { CHAIN_LINKS, CHAIN_PEOPLE, chainPerson, chainToProphet, lineageOf, teachersOf } from "../data/scholarChains";
import { SCHOLAR_TREE } from "../data/scholarUnits";
import { TopicPicker } from "../ui/screens";

jest.mock("../services/gameAudio", () => ({
  playGameSound: jest.fn(),
  primeGameAudio: jest.fn(() => true)
}));

const SCRIPT = { bn: /[ঀ-৿]/, ur: /[؀-ۿ]/, ar: /[؀-ۿ]/ } as const;

describe("chains of knowledge", () => {
  it("links only people on the tree, each link once and with a source", () => {
    const keys = CHAIN_LINKS.map((link) => `${link.teacher}>${link.student}`);
    expect(new Set(keys).size).toBe(keys.length);
    for (const link of CHAIN_LINKS) {
      expect(chainPerson(link.teacher)).toBeDefined();
      expect(chainPerson(link.student)).toBeDefined();
      expect(link.source.url).toMatch(/^https:\/\//);
      expect(link.source.reference).toBeTruthy();
      expect(link.source.summary).toBeTruthy();
      // A teacher sits above his student.
      expect(chainPerson(link.teacher)!.row).toBeLessThan(chainPerson(link.student)!.row);
    }
  });

  it("has every scholar with lessons on it", () => {
    const onTree = new Set(CHAIN_PEOPLE.map((person) => person.unitId).filter(Boolean));
    expect([...onTree].sort()).toEqual(Object.keys(SCHOLAR_TREE).sort());
  });

  it("leads the four imams and the hadith collectors back to the Prophet ﷺ, link by link", () => {
    for (const id of ["abu-hanifah", "malik", "shafii", "ahmad", "bukhari", "muslim", "abu-dawud", "tirmidhi"]) {
      const chain = chainToProphet(id)!;
      expect(chain[0]).toBe(id);
      expect(chain[chain.length - 1]).toBe("prophet");
      for (let i = 0; i < chain.length - 1; i += 1) {
        expect(teachersOf(chain[i]).map((link) => link.teacher)).toContain(chain[i + 1]);
      }
    }
    // Through a Sahabi and a Tabi'i.
    expect(chainToProphet("abu-hanifah")).toEqual(["abu-hanifah", "ata", "ibn-abbas", "prophet"]);
    expect(chainToProphet("malik")).toEqual(["malik", "nafi", "ibn-umar", "prophet"]);
  });

  it("has a name in every language, in its own script", () => {
    for (const person of CHAIN_PEOPLE) {
      expect(person.names.en).toMatch(/[A-Za-z]/);
      for (const language of ["bn", "ur", "ar"] as const) {
        expect(`${person.id} ${language}: ${SCRIPT[language].test(person.names[language])}`).toBe(`${person.id} ${language}: true`);
      }
    }
  });

  it("never puts two cards on top of each other", () => {
    for (const a of CHAIN_PEOPLE) {
      for (const b of CHAIN_PEOPLE) {
        if (a.id !== b.id && a.row === b.row) expect(Math.abs(a.col - b.col)).toBeGreaterThanOrEqual(1);
      }
    }
  });

  it("finds everyone above and below a scholar", () => {
    const { above, below } = lineageOf("ahmad");
    expect(above.has("prophet")).toBe(true);
    expect(above.has("shafii")).toBe(true);
    expect(below.has("bukhari")).toBe(true);
    expect(below.has("tirmidhi")).toBe(true);
    expect(below.has("malik")).toBe(false);
  });
});

describe("Scholars family tree", () => {
  const scholars = {
    topicId: "scholars",
    title: "Scholars",
    accent: "#8C5CE6",
    done: 2,
    total: 58,
    units: Object.entries(SCHOLAR_TREE).map(([id, tree]) => ({ id, title: id, done: id === "scholar-malik" ? 2 : 0, total: 8, tree: { row: tree.row, years: "93–179 AH", note: "Imam of Madinah." } }))
  };

  it("pans sideways and shows a scholar's chain, teachers, students and sources", async () => {
    const onSelect = jest.fn();
    const onClose = jest.fn();
    const openURL = jest.spyOn(Linking, "openURL").mockResolvedValue(true);
    await render(<TopicPicker visible onClose={onClose} onSelect={onSelect} activeTopicId="foundation" topics={[scholars]} />);
    await fireEvent.press(screen.getByTestId("topic-tile-scholars"));

    expect(screen.getByTestId("chain-tree-scroll").props.horizontal).toBe(true);
    expect(screen.getByTestId("chain-person-prophet")).toBeTruthy();

    await fireEvent.press(screen.getByTestId("chain-person-bukhari"));
    expect(screen.getByTestId("chain-person-name")).toHaveTextContent("Imam al-Bukhari");
    expect(screen.getByTestId("chain-to-prophet")).toBeTruthy();
    expect(screen.getByTestId("chain-link-humaydi")).toBeTruthy();
    expect(screen.getByTestId("chain-link-muslim")).toBeTruthy();
    expect(screen.queryByTestId("chain-open-lessons")).toBeNull();

    await fireEvent.press(screen.getByTestId("chain-source-humaydi-bukhari"));
    expect(openURL).toHaveBeenCalledWith("https://sunnah.com/bukhari:1");

    // Moving to a teacher with lessons, then opening them.
    await fireEvent.press(screen.getByTestId("chain-link-ahmad"));
    expect(screen.getByTestId("chain-person-name")).toHaveTextContent("Ahmad ibn Hanbal");
    await fireEvent.press(screen.getByTestId("chain-open-lessons"));
    expect(onSelect).toHaveBeenCalledWith("scholars", "scholar-ahmad");
    expect(onClose).toHaveBeenCalled();
    openURL.mockRestore();
  });
});
