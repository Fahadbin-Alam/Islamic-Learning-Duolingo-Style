import React from "react";
import { fireEvent, render, screen } from "@testing-library/react-native";
import { addXp, prepareUserForToday } from "../api/islamicLearningApi";
import {
  LEAGUES,
  TOP_TIER,
  leagueDaysLeft,
  leagueWeekKey,
  leagueZone,
  markLeagueResultSeen,
  nextTier,
  settleLeague,
  unseenLeagueResult
} from "../services/leagues";
import type { LeagueState } from "../types";
import { CrewView, LeagueCard, LeagueResultSheet } from "../ui/screens";
import { makeUser } from "./testUtils";

jest.mock("../services/gameAudio", () => ({
  playGameSound: jest.fn(),
  primeGameAudio: jest.fn(() => true)
}));

// 2026-10-28 is a Wednesday; its week starts on Monday 2026-10-26.
const WEDNESDAY = new Date(2026, 9, 28, 15, 0);
const NEXT_MONDAY = new Date(2026, 10, 2, 8, 0);
const SUNDAY_NIGHT = new Date(2026, 10, 1, 23, 30);

function league(overrides: Partial<LeagueState> = {}): LeagueState {
  return { tier: 0, weekStart: "2026-10-26", xp: 0, ...overrides };
}

describe("league weeks", () => {
  it("run Monday to Sunday on the learner's clock", () => {
    expect(leagueWeekKey(WEDNESDAY)).toBe("2026-10-26");
    expect(leagueWeekKey(new Date(2026, 9, 26, 0, 1))).toBe("2026-10-26");
    expect(leagueWeekKey(SUNDAY_NIGHT)).toBe("2026-10-26");
    expect(leagueWeekKey(NEXT_MONDAY)).toBe("2026-11-02");
    // Across a year end.
    expect(leagueWeekKey(new Date(2027, 0, 1))).toBe("2026-12-28");
  });

  it("count the days left, today included", () => {
    expect(leagueDaysLeft(new Date(2026, 9, 26))).toBe(7);
    expect(leagueDaysLeft(WEDNESDAY)).toBe(5);
    expect(leagueDaysLeft(SUNDAY_NIGHT)).toBe(1);
  });
});

describe("moving between leagues", () => {
  it("moves up at the up line, down under the keep line, and stays in between", () => {
    const silver = LEAGUES[1];
    expect(nextTier(1, silver.up as number)).toBe(2);
    expect(nextTier(1, (silver.up as number) - 1)).toBe(1);
    expect(nextTier(1, silver.keep)).toBe(1);
    expect(nextTier(1, silver.keep - 1)).toBe(0);
  });

  it("never drops below Bronze or climbs past Diamond", () => {
    expect(nextTier(0, 0)).toBe(0);
    expect(nextTier(TOP_TIER, 10_000)).toBe(TOP_TIER);
    expect(LEAGUES[TOP_TIER].up).toBeUndefined();
  });

  it("asks for more XP in every higher league", () => {
    for (let tier = 1; tier < TOP_TIER; tier += 1) {
      expect(LEAGUES[tier].up as number).toBeGreaterThan(LEAGUES[tier - 1].up as number);
      expect(LEAGUES[tier].keep).toBeGreaterThan(LEAGUES[tier - 1].keep);
      expect(LEAGUES[tier].keep).toBeLessThan(LEAGUES[tier].up as number);
    }
  });

  it("tells how the week is going", () => {
    expect(leagueZone({ tier: 0, xp: 0 })).toBe("safe");
    expect(leagueZone({ tier: 0, xp: 60 })).toBe("up");
    expect(leagueZone({ tier: 2, xp: 10 })).toBe("down");
  });
});

describe("settleLeague", () => {
  it("puts a new learner in Bronze for this week", () => {
    const user = settleLeague(makeUser(), WEDNESDAY);
    expect(user.league).toEqual({ tier: 0, weekStart: "2026-10-26", xp: 0 });
  });

  it("changes nothing during the same week", () => {
    const user = makeUser({ league: league({ xp: 30 }) });
    expect(settleLeague(user, SUNDAY_NIGHT)).toBe(user);
  });

  it("moves the learner up when the week ends and keeps the result to show", () => {
    const user = settleLeague(makeUser({ league: league({ xp: 75 }) }), NEXT_MONDAY);
    expect(user.league).toEqual({ tier: 1, weekStart: "2026-11-02", xp: 0, last: { weekStart: "2026-10-26", from: 0, to: 1, xp: 75 } });
    expect(unseenLeagueResult(user)).toEqual({ weekStart: "2026-10-26", from: 0, to: 1, xp: 75 });
  });

  it("moves the learner down for a quiet week, only once however long they were away", () => {
    const away = settleLeague(makeUser({ league: league({ tier: 4, xp: 5 }) }), new Date(2026, 11, 7));
    expect(away.league?.tier).toBe(3);
    expect(away.league?.weekStart).toBe("2026-12-07");
  });

  it("has nothing to tell after a Bronze week with no XP", () => {
    const user = settleLeague(makeUser({ league: league() }), NEXT_MONDAY);
    expect(user.league?.last).toBeUndefined();
    expect(unseenLeagueResult(user)).toBeUndefined();
  });

  it("ignores a clock set back to an earlier week", () => {
    const user = makeUser({ league: league({ weekStart: "2026-11-02", xp: 20 }) });
    expect(settleLeague(user, WEDNESDAY)).toBe(user);
  });

  it("treats a broken saved tier as Bronze", () => {
    const user = settleLeague(makeUser({ league: league({ tier: 42, xp: 70 }) }), NEXT_MONDAY);
    expect(user.league?.tier).toBe(1);
  });

  it("shows a result once", () => {
    const settled = settleLeague(makeUser({ league: league({ xp: 75 }) }), NEXT_MONDAY);
    const seen = markLeagueResultSeen(settled);
    expect(unseenLeagueResult(seen)).toBeUndefined();
    expect(seen.league?.last?.to).toBe(1);
    expect(markLeagueResultSeen(seen)).toBe(seen);
  });
});

describe("league XP", () => {
  it("counts every XP the learner earns this week", () => {
    const once = addXp(makeUser({ league: league({ xp: 10 }) }), 12, WEDNESDAY);
    expect(once.league?.xp).toBe(22);
    expect(once.totalXp).toBe(makeUser().totalXp + 12);
  });

  it("ends last week before counting XP earned in a new one", () => {
    const user = addXp(makeUser({ league: league({ xp: 70 }) }), 8, NEXT_MONDAY);
    expect(user.league).toMatchObject({ tier: 1, weekStart: "2026-11-02", xp: 8 });
  });

  it("ends a finished week when the app opens", () => {
    const user = prepareUserForToday(makeUser({ league: league({ tier: 2, xp: 150 }) }), NEXT_MONDAY);
    expect(user.league?.tier).toBe(3);
  });
});

describe("LeagueCard", () => {
  it("shows the league, the week's XP and what it takes to move up", async () => {
    await render(<LeagueCard league={league({ xp: 20 })} now={WEDNESDAY} />);
    expect(screen.getByTestId("league-title").props.children).toBe("Bronze League");
    expect(screen.getByTestId("league-xp").props.children).toBe("20");
    expect(screen.getByTestId("league-days").props.children).toBe("5 days left");
    expect(screen.getByTestId("league-zone").props.children).toBe("40 XP to move up");
  });

  it("warns when the learner would drop, and cheers when they would climb", async () => {
    const { rerender } = await render(<LeagueCard league={league({ tier: 2, xp: 15 })} now={SUNDAY_NIGHT} />);
    expect(screen.getByTestId("league-zone").props.children).toBe("25 XP to stay");
    expect(screen.getByTestId("league-days").props.children).toBe("Ends today");
    await rerender(<LeagueCard league={league({ tier: 2, xp: 140 })} now={SUNDAY_NIGHT} />);
    expect(screen.getByTestId("league-zone").props.children).toBe("You're moving up!");
  });

  it("says the learner is on top in Diamond", async () => {
    await render(<LeagueCard league={league({ tier: TOP_TIER, xp: 130 })} now={WEDNESDAY} />);
    expect(screen.getByTestId("league-title").props.children).toBe("Diamond League");
    expect(screen.getByTestId("league-zone").props.children).toBe("You're on top!");
  });

  it("sits on top of Crew, even in a build with no crew server, and shows no one else", async () => {
    const handlers = {
      onChangeInviteEmail: jest.fn(),
      onChangeInviteRelation: jest.fn(),
      onAddFriend: jest.fn(),
      onRemoveFriend: jest.fn(),
      onRefresh: jest.fn(),
      onCreateAccount: jest.fn()
    };
    await render(<CrewView user={makeUser()} crew={{ status: "idle" }} inviteEmail="" inviteRelation="friend" unavailable league={league({ xp: 20 })} {...handlers} />);
    expect(screen.getByTestId("league-card")).toBeTruthy();
    expect(screen.getByText("Friends are coming soon!")).toBeTruthy();
  });
});

describe("LeagueResultSheet", () => {
  it("cheers a move up", async () => {
    const onClose = jest.fn();
    await render(<LeagueResultSheet result={{ weekStart: "2026-10-26", from: 0, to: 1, xp: 75 }} onClose={onClose} />);
    expect(screen.getByTestId("league-result-title").props.children).toBe("You moved up!");
    expect(screen.getByTestId("league-result-league").props.children).toBe("Silver League");
    expect(screen.getByTestId("league-result-line").props.children).toBe("75 XP last week");
    fireEvent.press(screen.getByTestId("league-result-close"));
    expect(onClose).toHaveBeenCalled();
  });

  it("is kind about a move down and says how to climb back", async () => {
    await render(<LeagueResultSheet result={{ weekStart: "2026-10-26", from: 2, to: 1, xp: 10 }} onClose={jest.fn()} />);
    expect(screen.getByTestId("league-result-title").props.children).toBe("New week, new start!");
    expect(screen.getByTestId("league-result-line").props.children).toBe("Earn 100 XP this week to move back up!");
  });

  it("shows nothing without a result", async () => {
    await render(<LeagueResultSheet onClose={jest.fn()} />);
    expect(screen.queryByTestId("league-result-title")).toBeNull();
  });
});
