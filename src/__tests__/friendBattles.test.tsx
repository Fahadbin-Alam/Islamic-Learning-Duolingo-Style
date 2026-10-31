import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react-native";
import type { CrewMember, FriendBattle } from "../services/backendSync";
import { pickFriendBattleQuestions, seededRandom } from "../services/battleQuestions";
import { BATTLE_QUESTIONS } from "../services/ummah";
import { BattleView, CrewView } from "../ui/screens";
import { battlesWaitingOnMe, sortBattles } from "../ui/screens/CrewView";
import { makeUser } from "./testUtils";

jest.mock("../services/gameAudio", () => ({
  playGameSound: jest.fn(),
  primeGameAudio: jest.fn(() => true)
}));

jest.mock("../ui/screens/FormattedCount", () => {
  const actual = jest.requireActual("../ui/screens/FormattedCount");
  const { Text } = require("react-native");
  return { ...actual, FormattedCount: ({ value, style }: { value: number; style?: object }) => <Text style={style}>{actual.formatNumber(value)}</Text> };
});

function member(id: number, name: string, relation: CrewMember["relation"], weeklyXp: number): CrewMember {
  return { id, name, avatarInitials: name.slice(0, 2).toUpperCase(), relation, totalXp: weeklyXp * 4, weeklyXp, streakDays: 2, lastLearningAt: null };
}

function battle(id: number, extra: Partial<FriendBattle> = {}): FriendBattle {
  return { id, friend: { id: 2, name: "Yusuf Khan", avatarInitials: "YK" }, youStarted: false, status: "pending", seed: 42, yourScore: null, theyPlayed: false, ...extra };
}

const me = member(1, "Amina", "you", 300);
const yusuf = member(2, "Yusuf Khan", "friend", 500);

function renderCrew(battles: FriendBattle[], friends: CrewMember[] = [yusuf]) {
  const handlers = {
    onChangeInviteEmail: jest.fn(),
    onChangeInviteRelation: jest.fn(),
    onAddFriend: jest.fn(),
    onRemoveFriend: jest.fn(),
    onAnswerRequest: jest.fn(),
    onRefresh: jest.fn(),
    onCreateAccount: jest.fn(),
    onChallenge: jest.fn(),
    onAnswerBattle: jest.fn(),
    onPlayBattle: jest.fn(),
    onCancelBattle: jest.fn(),
    onShareApp: jest.fn()
  };
  return render(
    <CrewView user={makeUser({ hasAccount: true })} crew={{ status: "ready", payload: { me, friends } }} inviteEmail="" inviteRelation="friend" battles={battles} {...handlers} />
  ).then(() => handlers);
}

describe("friend battle questions", () => {
  it("are the same five for both friends from the same seed, and differ for another seed", () => {
    const first = pickFriendBattleQuestions(1234, "en").map((question) => question.id);
    const again = pickFriendBattleQuestions(1234, "en").map((question) => question.id);
    expect(first).toHaveLength(BATTLE_QUESTIONS);
    expect(again).toEqual(first);
    expect(pickFriendBattleQuestions(98765, "en").map((question) => question.id)).not.toEqual(first);
  });

  it("ask the same questions in another language, with choices in the same order", () => {
    const english = pickFriendBattleQuestions(77, "en");
    const bangla = pickFriendBattleQuestions(77, "bn");
    expect(bangla.map((question) => question.id)).toEqual(english.map((question) => question.id));
    expect(bangla.map((question) => question.choices.map((choice) => choice.id))).toEqual(english.map((question) => question.choices.map((choice) => choice.id)));
  });

  it("seeded numbers repeat and stay between 0 and 1", () => {
    const a = seededRandom(5);
    const b = seededRandom(5);
    const values = Array.from({ length: 50 }, () => a());
    expect(Array.from({ length: 50 }, () => b())).toEqual(values);
    expect(values.every((value) => value >= 0 && value < 1)).toBe(true);
  });
});

describe("battles on the Friends page", () => {
  it("puts battles waiting on the learner first and counts them", () => {
    const list = [battle(1, { status: "done", outcome: "win", yourScore: 4, theirScore: 3, theyPlayed: true }), battle(2, { youStarted: true }), battle(3, { status: "accepted" }), battle(4)];
    expect(sortBattles(list).map((item) => item.id)).toEqual([4, 3, 2, 1]);
    expect(battlesWaitingOnMe(list)).toBe(2);
  });

  it("asks a friend to battle from their card", async () => {
    const handlers = await renderCrew([]);
    expect(screen.getByText("Tap a friend to battle them.")).toBeTruthy();
    await fireEvent.press(screen.getByTestId("crew-row-2"));
    await fireEvent.press(screen.getByTestId("crew-challenge-2"));
    expect(handlers.onChallenge).toHaveBeenCalledWith(yusuf);
  });

  it("does not offer a second battle with a friend while one is open", async () => {
    await renderCrew([battle(9, { youStarted: true })]);
    await fireEvent.press(screen.getByTestId("crew-row-2"));
    expect(screen.queryByTestId("crew-challenge-2")).toBeNull();
    expect(screen.getByTestId("crew-friend-battle-open")).toHaveTextContent("You already have a battle with Yusuf.");
  });

  it("shows each state with the one button that moves it on", async () => {
    const handlers = await renderCrew([
      battle(1),
      battle(2, { youStarted: true }),
      battle(3, { status: "accepted", theyPlayed: true }),
      battle(4, { status: "accepted", yourScore: 3 }),
      battle(5, { status: "done", yourScore: 4, theirScore: 2, theyPlayed: true, outcome: "win" }),
      battle(6, { status: "done", yourScore: 1, theirScore: 5, theyPlayed: true, outcome: "loss" })
    ]);
    expect(screen.getByTestId("battle-line-1")).toHaveTextContent("Wants to battle you!");
    expect(screen.getByTestId("battle-line-2")).toHaveTextContent("Waiting for Yusuf to say yes");
    expect(screen.getByTestId("battle-line-3")).toHaveTextContent("Yusuf played. Your turn!");
    expect(screen.getByTestId("battle-line-4")).toHaveTextContent("You got 3. Waiting for Yusuf.");
    expect(screen.getByTestId("battle-line-5")).toHaveTextContent("You won 4 to 2!");
    expect(screen.getByTestId("battle-line-6")).toHaveTextContent("They won 5 to 1");

    await fireEvent.press(screen.getByTestId("battle-accept-1"));
    expect(handlers.onAnswerBattle).toHaveBeenLastCalledWith(expect.objectContaining({ id: 1 }), true);
    await fireEvent.press(screen.getByTestId("battle-decline-1"));
    expect(handlers.onAnswerBattle).toHaveBeenLastCalledWith(expect.objectContaining({ id: 1 }), false);
    await fireEvent.press(screen.getByTestId("battle-cancel-2"));
    expect(handlers.onCancelBattle).toHaveBeenCalledWith(expect.objectContaining({ id: 2 }));
    await fireEvent.press(screen.getByTestId("battle-play-3"));
    expect(handlers.onPlayBattle).toHaveBeenCalledWith(expect.objectContaining({ id: 3 }));
    expect(screen.queryByTestId("battle-play-4")).toBeNull();
  });

  it("shares Muslimo from the Friends page with no grown-up question", async () => {
    const handlers = await renderCrew([]);
    await fireEvent.press(screen.getByTestId("crew-share"));
    expect(screen.queryByTestId("grownup-question")).toBeNull();
    expect(handlers.onShareApp).toHaveBeenCalledTimes(1);
  });
});

describe("a friend battle", () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  async function playAll(rightAnswers: number) {
    const questions = pickFriendBattleQuestions(42, "en");
    const onFinish = jest.fn(() => undefined);
    const view = await render(<BattleView questions={questions} onFinish={onFinish} onClose={jest.fn()} versus={{ name: "Yusuf", battle: battle(1, { status: "accepted" }) }} />);
    expect(screen.getByTestId("battle-versus")).toHaveTextContent("vs Yusuf");
    for (const [at, question] of questions.entries()) {
      const right = question.choices.findIndex((choice) => choice.id === question.correctChoiceId);
      const wrong = question.choices.findIndex((choice) => choice.id !== question.correctChoiceId);
      await fireEvent.press(screen.getByTestId(`battle-choice-${at < rightAnswers ? right : wrong}`));
      await act(async () => {
        jest.advanceTimersByTime(1200);
      });
    }
    return { onFinish, view, questions };
  }

  it("waits for the friend, then shows both scores once they have played", async () => {
    const { onFinish, view, questions } = await playAll(4);
    expect(onFinish).toHaveBeenCalledWith(4);
    expect(screen.getByTestId("battle-friend-mine")).toHaveTextContent("4");
    expect(screen.getByTestId("battle-friend-theirs")).toHaveTextContent("?");
    expect(screen.getByTestId("battle-friend-waiting")).toHaveTextContent("Waiting for Yusuf to play.");
    expect(screen.queryByTestId("battle-result-trophies")).toBeNull();

    await view.rerender(
      <BattleView
        questions={questions}
        onFinish={onFinish}
        onClose={jest.fn()}
        versus={{ name: "Yusuf", battle: battle(1, { status: "done", yourScore: 4, theirScore: 3, theyPlayed: true, outcome: "win" }) }}
      />
    );
    expect(screen.getByTestId("battle-friend-title")).toHaveTextContent("You beat Yusuf!");
    expect(screen.getByTestId("battle-friend-theirs")).toHaveTextContent("3");
  });
});
