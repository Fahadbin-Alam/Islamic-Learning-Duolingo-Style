import React from "react";
import { act, render, screen } from "@testing-library/react-native";
import { COURSE } from "../data/course";
import type { LearningNodeView } from "../types";
import { playGameSound } from "../services/gameAudio";
import { LearnPath, type PathUnit } from "../ui/screens";
import { resetPathOpeningsForTests } from "../ui/screens/LearnPath";

jest.mock("../services/gameAudio", () => ({
  playGameSound: jest.fn(),
  primeGameAudio: jest.fn(() => true)
}));

const foundation = COURSE.sections.find((section) => section.topicId === "foundation")!;
// The circle's parts are drawn whether or not they are on screen yet.
const ALL = { includeHiddenElements: true };

/** A unit of four circles: the ones before `at` done, `at` to play next, the rest locked. */
function unitsAt(at: number): PathUnit[] {
  const view = (index: number): LearningNodeView => {
    const node = foundation.nodes[index];
    const status = index < at ? "completed" : index === at ? "current" : "locked";
    return { ...node, status, firstLessonId: node.lessonIds[0] };
  };
  return [
    {
      id: "unit-a",
      number: 1,
      title: "Greetings and replies",
      done: at,
      total: 4,
      items: [0, 1, 2, 3].map((index) => ({ kind: "node" as const, node: view(index), lessonNumber: index + 1 }))
    }
  ];
}

function path(at: number, topicId = "foundation", covered = false) {
  return (
    <LearnPath
      accent={foundation.accentColor}
      topicId={topicId}
      mascotVariant="hijabi"
      units={unitsAt(at)}
      xpForNode={(node) => node.xpReward}
      onStartNode={jest.fn()}
      onClaimChest={jest.fn()}
      covered={covered}
    />
  );
}

async function showPath(at: number, topicId = "foundation", covered = false) {
  return render(path(at, topicId, covered));
}

async function wait(ms: number) {
  await act(async () => {
    jest.advanceTimersByTime(ms);
  });
}

beforeEach(() => {
  resetPathOpeningsForTests();
  (playGameSound as jest.Mock).mockClear();
  jest.useFakeTimers();
});

afterEach(() => {
  jest.useRealTimers();
});

describe("the next circle opening on the path", () => {
  it("shows shut for a moment after a lesson, then pops open with a chime and sparkles, once", async () => {
    const first = await showPath(0);
    expect(screen.queryByTestId("path-node-shut", ALL)).toBeNull();
    await first.unmount();

    // The learner finished the first circle's lesson and comes back to the path.
    const second = await showPath(1);
    expect(screen.getByTestId("path-node-shut", ALL)).toBeTruthy();
    expect(screen.queryByTestId("path-node-opened", ALL)).toBeNull();
    expect(playGameSound).not.toHaveBeenCalledWith("unlock", expect.anything());

    await wait(700);
    expect(screen.queryByTestId("path-node-shut", ALL)).toBeNull();
    expect(screen.getByTestId("path-node-opened", ALL)).toBeTruthy();
    expect(playGameSound).toHaveBeenCalledWith("unlock", expect.anything());

    await wait(1200);
    expect(screen.queryByTestId("path-node-opened", ALL)).toBeNull();
    await second.unmount();

    // Back again with nothing new finished: it stays as it is.
    await showPath(1);
    expect(screen.queryByTestId("path-node-shut", ALL)).toBeNull();
    await wait(1000);
    expect(screen.queryByTestId("path-node-opened", ALL)).toBeNull();
  });

  it("leaves the circles as they are the first time a path shows, on another topic, and when START moves back", async () => {
    const first = await showPath(2);
    expect(screen.queryByTestId("path-node-shut", ALL)).toBeNull();
    await first.unmount();

    const other = await showPath(3, "prayer");
    expect(screen.queryByTestId("path-node-shut", ALL)).toBeNull();
    await other.unmount();

    // START went back (the circle after it is not done): nothing opened.
    await showPath(1);
    expect(screen.queryByTestId("path-node-shut", ALL)).toBeNull();
    await wait(1000);
    expect(screen.queryByTestId("path-node-opened", ALL)).toBeNull();
  });

  // The bug hunt: back from the first lesson, today's ayah and hadith came up over the path and hid the opening.
  it("waits shut while a sheet is over the path, and opens once the path shows again", async () => {
    const first = await showPath(0);
    await first.unmount();

    const view = await showPath(1, "foundation", true);
    await wait(3000);
    expect(screen.getByTestId("path-node-shut", ALL)).toBeTruthy();
    expect(playGameSound).not.toHaveBeenCalledWith("unlock", expect.anything());

    // The sheet goes away: the moment plays as it would have.
    await view.rerender(path(1));
    expect(screen.getByTestId("path-node-shut", ALL)).toBeTruthy();
    await wait(700);
    expect(screen.getByTestId("path-node-opened", ALL)).toBeTruthy();
    expect(playGameSound).toHaveBeenCalledWith("unlock", expect.anything());

    // A sheet coming up after it opened does not shut it again; it finishes once the path is back.
    await view.rerender(path(1, "foundation", true));
    await wait(3000);
    expect(screen.queryByTestId("path-node-shut", ALL)).toBeNull();
    await view.rerender(path(1));
    await wait(1900);
    expect(screen.queryByTestId("path-node-opened", ALL)).toBeNull();
    expect((playGameSound as jest.Mock).mock.calls.filter(([sound]) => sound === "unlock")).toHaveLength(1);
  });

  it("opens on the same path when a finished lesson moves START while it is on screen", async () => {
    const view = await showPath(0);
    await view.rerender(
      <LearnPath
        accent={foundation.accentColor}
        topicId="foundation"
        mascotVariant="hijabi"
        units={unitsAt(1)}
        xpForNode={(node) => node.xpReward}
        onStartNode={jest.fn()}
        onClaimChest={jest.fn()}
      />
    );
    expect(screen.getByTestId("path-node-shut", ALL)).toBeTruthy();
    await wait(700);
    expect(screen.getByTestId("path-node-opened", ALL)).toBeTruthy();
  });
});
