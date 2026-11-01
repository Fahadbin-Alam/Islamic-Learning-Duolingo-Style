import { nextPartStart, type PathUnit } from "../ui/screens/LearnPath";
import type { LearningNodeView } from "../types";

jest.mock("../services/gameAudio", () => ({ playGameSound: jest.fn(), primeGameAudio: jest.fn(() => true) }));

const node = (id: string, status: LearningNodeView["status"] = "locked") => ({ id, status } as LearningNodeView);
const unit = (nodes: LearningNodeView[]) => ({ id: "u", items: nodes.map((each) => ({ kind: "node", node: each })) } as unknown as PathUnit);

describe("I know this part: skip a story up to its review", () => {
  const nodes = [node("springs", "current"), node("the-cow"), node("hearts"), node("surah-meaning-2-review-2"), node("proof"), node("east-west")];

  it("points from the circle to play to the first circle after the part's review", () => {
    expect(nextPartStart(unit(nodes), nodes[0])?.id).toBe("proof");
  });

  it("offers nothing on a review itself, a finished circle, or when no review follows", () => {
    expect(nextPartStart(unit(nodes), node("surah-meaning-2-review-2", "current"))).toBeUndefined();
    expect(nextPartStart(unit(nodes), node("springs", "completed"))).toBeUndefined();
    expect(nextPartStart(unit([node("a", "current"), node("b")]), node("a", "current"))).toBeUndefined();
  });
});
