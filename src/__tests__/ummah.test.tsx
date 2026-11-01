import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react-native";
import { SECRET_FOUND_GEMS, SECRET_HINT_PRICE, SECRET_LESSONS, buySecretHint, findSecret, nextHintSecret } from "../data/secretLessons";
import { pickBattleQuestions } from "../services/battleQuestions";
import {
  ARENAS,
  BATTLE_QUESTIONS,
  BATTLE_WIN_GEMS,
  PROFILE_ICONS,
  activeIcon,
  applyBattle,
  arenaIndex,
  buyIcon,
  isValidNickname,
  makeNickname,
  setUmmahJoined,
  trophiesToNextArena,
  wearIcon
} from "../services/ummah";
import type { UserProfile } from "../types";
import { BattleView, CrewView, SecretContext, SecretTap, ShopView, UmmahRanks } from "../ui/screens";
import { Text } from "react-native";
import { makeUser } from "./testUtils";

jest.mock("../services/gameAudio", () => ({
  playGameSound: jest.fn(),
  primeGameAudio: jest.fn(() => true)
}));

// The counting numbers animate on timers; render them as plain text here.
jest.mock("../ui/screens/FormattedCount", () => {
  const actual = jest.requireActual("../ui/screens/FormattedCount");
  const { Text } = require("react-native");
  return { ...actual, FormattedCount: ({ value, style }: { value: number; style?: object }) => <Text style={style}>{actual.formatNumber(value)}</Text> };
});

function seeded(seed = 7) {
  let value = seed;
  return () => {
    value = (value * 16807) % 2147483647;
    return (value - 1) / 2147483646;
  };
}

const withUmmah = (ummah: Partial<NonNullable<UserProfile["ummah"]>>, extra: Partial<UserProfile> = {}) =>
  makeUser({ ...extra, ummah: { trophies: 0, best: 0, battles: 0, wins: 0, ...ummah } });

describe("arenas and battles", () => {
  it("climbs arenas by trophies", () => {
    expect(arenaIndex(0)).toBe(0);
    expect(arenaIndex(ARENAS[1].trophies)).toBe(1);
    expect(arenaIndex(ARENAS[1].trophies - 1)).toBe(0);
    expect(arenaIndex(99999)).toBe(ARENAS.length - 1);
    expect(trophiesToNextArena(40)).toBe(ARENAS[1].trophies - 40);
    expect(trophiesToNextArena(99999)).toBeUndefined();
  });

  it("wins trophies and gems for 4 or 5 right, nothing for 3, and loses some for less", () => {
    const user = withUmmah({ trophies: 150, best: 150 }, { gems: 0 });
    expect(applyBattle(user, 5).result).toMatchObject({ outcome: "win", change: 35, gems: BATTLE_WIN_GEMS });
    expect(applyBattle(user, 4).result).toMatchObject({ outcome: "win", change: 25 });
    expect(applyBattle(user, 3).result).toMatchObject({ outcome: "draw", change: 0, gems: 0 });
    const lost = applyBattle(user, 1);
    expect(lost.result).toMatchObject({ outcome: "loss", change: -15 });
    expect(lost.user.ummah).toMatchObject({ trophies: 135, battles: 1, wins: 0 });
    expect(applyBattle(user, 4).user.gems).toBe(BATTLE_WIN_GEMS);
  });

  it("never drops a learner out of the best arena they reached", () => {
    const user = withUmmah({ trophies: ARENAS[1].trophies + 5, best: ARENAS[1].trophies + 5 });
    expect(applyBattle(user, 0).user.ummah?.trophies).toBe(ARENAS[1].trophies);
  });

  it("says when a win opens a new arena", () => {
    const user = withUmmah({ trophies: ARENAS[1].trophies - 10, best: ARENAS[1].trophies - 10 });
    expect(applyBattle(user, 5).result.newArena).toBe(true);
  });

  it("picks hard questions from different lessons with one right choice each", () => {
    const questions = pickBattleQuestions({ random: seeded(3) });
    expect(questions).toHaveLength(BATTLE_QUESTIONS);
    expect(new Set(questions.map((question) => question.lessonId)).size).toBe(BATTLE_QUESTIONS);
    for (const question of questions) {
      expect(question.choices.filter((choice) => choice.id === question.correctChoiceId)).toHaveLength(1);
      expect(question.isReview).toBeFalsy();
    }
    expect(pickBattleQuestions({ young: true, random: seeded(4) })).toHaveLength(BATTLE_QUESTIONS);
  });
});

describe("nicknames", () => {
  it("are made from the word lists only, so no real name reaches the ranking", () => {
    for (let index = 0; index < 50; index += 1) expect(isValidNickname(makeNickname())).toBe(true);
    expect(isValidNickname("Yusuf Ahmed")).toBe(false);
    expect(isValidNickname("Brave Falcon 7")).toBe(false);
  });

  it("are made when the learner joins and kept after", () => {
    const joined = setUmmahJoined(makeUser(), true);
    expect(joined.ummah?.joined).toBe(true);
    expect(isValidNickname(joined.ummah?.nickname)).toBe(true);
    expect(setUmmahJoined(setUmmahJoined(joined, false), true).ummah?.nickname).toBe(joined.ummah?.nickname);
  });
});

describe("icons and secret lessons", () => {
  it("buys an icon once, puts it on, and switches back to initials", () => {
    const icon = PROFILE_ICONS[0];
    const bought = buyIcon(makeUser({ gems: icon.price }), icon.id);
    expect(bought.gems).toBe(0);
    expect(activeIcon(bought)).toBe(icon.id);
    expect(buyIcon(bought, icon.id)).toBe(bought);
    expect(activeIcon(wearIcon(bought, undefined))).toBeUndefined();
    // Too few gems: nothing happens.
    const poor = makeUser({ gems: icon.price - 1 });
    expect(buyIcon(poor, icon.id)).toBe(poor);
  });

  it("pays gems for a secret the first time only", () => {
    const secret = SECRET_LESSONS[0];
    const found = findSecret(makeUser({ gems: 0 }), secret.id);
    expect(found.gems).toBe(SECRET_FOUND_GEMS);
    expect(findSecret(found, secret.id).gems).toBe(SECRET_FOUND_GEMS);
  });

  it("sells the clue to the next secret not found or hinted", () => {
    const user = findSecret(makeUser({ gems: SECRET_HINT_PRICE }), SECRET_LESSONS[0].id);
    const hinted = buySecretHint({ ...user, gems: SECRET_HINT_PRICE });
    expect(hinted.gems).toBe(0);
    expect(hinted.ummah?.hints).toEqual([SECRET_LESSONS[1].id]);
    expect(nextHintSecret(hinted)?.id).toBe(SECRET_LESSONS[2].id);
  });

  it("has a source, one hiding place and a clue for every secret", () => {
    expect(new Set(SECRET_LESSONS.map((secret) => secret.spot)).size).toBe(SECRET_LESSONS.length);
    for (const secret of SECRET_LESSONS) {
      expect(secret.source.url).toMatch(/^https:\/\/(sunnah\.com|islamqa\.info)\//);
      expect(secret.quote.length).toBeGreaterThan(20);
      expect(secret.clue).toMatch(/3 times/);
    }
  });

  it("finds a secret after three quick taps, not one", async () => {
    const find = jest.fn();
    await render(
      <SecretContext.Provider value={find}>
        <SecretTap spot="trophy">
          <Text>trophy</Text>
        </SecretTap>
      </SecretContext.Provider>
    );
    await fireEvent.press(screen.getByTestId("secret-trophy", { includeHiddenElements: true }));
    await fireEvent.press(screen.getByTestId("secret-trophy", { includeHiddenElements: true }));
    expect(find).not.toHaveBeenCalled();
    await fireEvent.press(screen.getByTestId("secret-trophy", { includeHiddenElements: true }));
    expect(find).toHaveBeenCalledWith("trophy");
  });
});

const ranksProps = {
  rankings: { status: "idle" as const },
  onBattle: jest.fn(),
  onJoin: jest.fn(),
  onNewNickname: jest.fn(),
  onRefresh: jest.fn(),
  onSignIn: jest.fn(),
  onOpenSecrets: jest.fn()
};

describe("Ummah tab", () => {
  it("is called Ummah and opens on Ranks, with Friends one tap away", async () => {
    await render(
      <CrewView
        user={makeUser({ hasAccount: false })}
        crew={{ status: "signed_out" }}
        inviteEmail=""
        inviteRelation="friend"
        onChangeInviteEmail={jest.fn()}
        onChangeInviteRelation={jest.fn()}
        onAddFriend={jest.fn()}
        onRemoveFriend={jest.fn()}
        onRefresh={jest.fn()}
        onCreateAccount={jest.fn()}
        ranks={{ ...ranksProps, unavailable: true }}
      />
    );
    expect(screen.getByText("Ummah")).toBeTruthy();
    expect(screen.getByTestId("ummah-ranks")).toBeTruthy();
    expect(screen.getByTestId("ummah-rank-soon")).toBeTruthy();
    await fireEvent.press(screen.getByTestId("ummah-page-friends"));
    expect(screen.getByTestId("crew-signed-out")).toBeTruthy();
  });

  it("shows nicknames and trophies, and the learner's own row below the top list", async () => {
    const user = withUmmah({ trophies: 30, joined: true, nickname: "Kind Dove 15" });
    await render(
      <UmmahRanks
        {...ranksProps}
        user={user}
        rankings={{
          status: "ready",
          rankings: { top: [{ rank: 1, nickname: "Swift Eagle 31", trophies: 500, icon: "moon" }], me: { rank: 12, nickname: "Kind Dove 15", trophies: 30 }, total: 12 }
        }}
      />
    );
    expect(screen.getByText("Swift Eagle 31")).toBeTruthy();
    expect(screen.getByText("Kind Dove 15 (you)")).toBeTruthy();
    expect(screen.getByTestId("ummah-trophies").props.children).toBe("30");
  });

  it("asks a grown-up before a child joins the ranking", async () => {
    const onJoin = jest.fn();
    await render(<UmmahRanks {...ranksProps} onJoin={onJoin} forChild user={withUmmah({})} />);
    await fireEvent.press(screen.getByTestId("ummah-join"));
    expect(onJoin).not.toHaveBeenCalled();
    expect(screen.getByTestId("grownup-question")).toBeTruthy();
  });

  it("lets a grown-up join at once", async () => {
    const onJoin = jest.fn();
    await render(<UmmahRanks {...ranksProps} onJoin={onJoin} user={withUmmah({})} />);
    await fireEvent.press(screen.getByTestId("ummah-join"));
    expect(onJoin).toHaveBeenCalledWith(true);
  });
});

describe("battle", () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  it("counts right answers and shows the trophies won", async () => {
    const questions = pickBattleQuestions({ random: seeded(11) });
    const user = withUmmah({});
    const onFinish = jest.fn((correct: number) => applyBattle(user, correct).result);
    await render(<BattleView questions={questions} onFinish={onFinish} onClose={jest.fn()} />);

    for (const question of questions) {
      const right = question.choices.findIndex((choice) => choice.id === question.correctChoiceId);
      await fireEvent.press(screen.getByTestId(`battle-choice-${right}`));
      await act(async () => {
        jest.advanceTimersByTime(1200);
      });
    }

    expect(onFinish).toHaveBeenCalledTimes(1);
    expect(onFinish).toHaveBeenCalledWith(BATTLE_QUESTIONS);
    expect(screen.getByTestId("battle-result-title").props.children).toBe("Victory!");
    expect(screen.getByTestId("battle-result-trophies").props.children).toBe("+35");
  });

  it("runs out of time on a question left alone", async () => {
    const questions = pickBattleQuestions({ random: seeded(12) });
    await render(<BattleView questions={questions} onFinish={(correct) => applyBattle(withUmmah({}), correct).result} onClose={jest.fn()} />);
    // The clock ticks four times a second.
    for (let tick = 0; tick < 82; tick += 1) {
      await act(async () => {
        jest.advanceTimersByTime(250);
      });
    }
    expect(screen.getByTestId("battle-time-up")).toBeTruthy();
  });
});

describe("shop", () => {
  it("sells icons and secret clues for gems", async () => {
    const onBuyIcon = jest.fn();
    const onBuySecretHint = jest.fn();
    await render(
      <ShopView
        user={makeUser({ gems: 500 })}
        strings={{} as never}
        items={[]}
        storePrices={{}}
        busy={false}
        section={{ mascot: "muslim_man", accentColor: "#21B573" } as never}
        onUseItem={jest.fn()}
        onRestore={jest.fn()}
        canBuyWithMoney={false}
        canWatchAds={false}
        onBuyIcon={onBuyIcon}
        onWearIcon={jest.fn()}
        onBuySecretHint={onBuySecretHint}
      />
    );
    await fireEvent.press(screen.getByTestId("shop-shelf-icons"));
    await fireEvent.press(screen.getByTestId("shop-icon-moon"));
    expect(onBuyIcon).toHaveBeenCalledWith("moon");
    await fireEvent.press(screen.getByTestId("shop-shelf-hadith"));
    await fireEvent.press(screen.getByTestId("shop-buy-secret-hint"));
    expect(onBuySecretHint).toHaveBeenCalled();
  });
});
