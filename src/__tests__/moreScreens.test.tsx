import React from "react";
import { StyleSheet } from "react-native";
import { act, fireEvent, render, screen } from "@testing-library/react-native";
import { FoundationAssessmentScreen } from "../components/FoundationLearning";
import { COURSE, SHOP_ITEMS } from "../data/course";
import { FOUNDATION_QUESTION_BANK } from "../data/foundationQuestionBank";
import { getUiStrings } from "../i18n";
import type { CrewMember } from "../services/backendSync";
import { createEmptyLearnerProfile, createFoundationAssessment } from "../services/foundationAssessment";
import { legalLinks } from "../services/monetizationConfig";
import type { LearningSection, UserProfile } from "../types";
import { CrewView, PracticeHub, ProfileView, ShopView, countStars, formatShopPrice, type CrewViewState } from "../ui/screens";
import { compactNumber } from "../ui/screens/FormattedCount";

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

const strings = getUiStrings("en");
const section = COURSE.sections[0] as LearningSection;

function makeUser(overrides: Partial<UserProfile> = {}): UserProfile {
  return {
    id: 1,
    username: "amina",
    displayName: "Amina Rahman",
    avatarInitials: "AR",
    hasAccount: true,
    accountEmail: "amina@example.com",
    streakDays: 4,
    totalXp: 12480,
    dailyGoalXp: 30,
    gems: 500,
    hearts: { current: 2, max: 5, unlimited: false, lastRefillDate: "2026-10-18" },
    completedLessonIds: [],
    completedNodeIds: [],
    ...overrides
  };
}

function member(id: number, name: string, relation: CrewMember["relation"], weeklyXp: number): CrewMember {
  return { id, name, avatarInitials: name.slice(0, 2).toUpperCase(), relation, totalXp: weeklyXp * 4, weeklyXp, streakDays: 2, lastLearningAt: null };
}

/** Answers the grown-up gate's sum. */
async function solveGate(correct = true) {
  const question = String(screen.getByTestId("grownup-question").props.children);
  const [a, b] = (question.match(/\d+/g) ?? []).map(Number);
  const answer = a * b;
  if (correct) {
    await fireEvent.press(screen.getByTestId(`grownup-option-${answer}`));
    return;
  }
  const wrong = screen.getAllByTestId(/^grownup-option-/).find((node) => node.props.testID !== `grownup-option-${answer}`)!;
  await fireEvent.press(wrong);
}

describe("PracticeHub", () => {
  const handlers = () => ({ onStartPlacement: jest.fn(), onStartReview: jest.fn(), onStartDailyChallenge: jest.fn(), onGoFoundation: jest.fn() });

  it("puts the level check first for a new learner and rests review when there is nothing to fix", async () => {
    const h = handlers();
    await render(<PracticeHub user={makeUser()} learnerProfile={createEmptyLearnerProfile()} language="en" strings={strings} {...h} />);

    await fireEvent.press(screen.getByText("START"));
    await fireEvent.press(screen.getByTestId("practice-daily"));
    // The resting review tile only wiggles, and the mascot says why.
    expect(screen.queryByText("No mistakes yet!")).toBeNull();
    await fireEvent.press(screen.getByTestId("practice-review"));
    expect(screen.getByText("No mistakes yet!")).toBeTruthy();
    await fireEvent.press(screen.getByTestId("practice-basics"));

    expect(h.onStartPlacement).toHaveBeenCalledTimes(1);
    expect(h.onStartDailyChallenge).toHaveBeenCalledTimes(1);
    expect(h.onStartReview).not.toHaveBeenCalled();
    expect(h.onGoFoundation).toHaveBeenCalledTimes(1);
  });

  it("leads with the daily challenge once placed, with review and retake tiles", async () => {
    const h = handlers();
    const profile = { ...createEmptyLearnerProfile(), assessmentCompleted: true, readiness_label: "Growing student" as const, needs_review_question_ids: ["a", "b"] };
    await render(<PracticeHub user={makeUser()} learnerProfile={profile} language="en" strings={strings} {...h} />);

    // The level is a short "Level 3", not the readiness sentence.
    expect(screen.getByTestId("practice-level")).toBeTruthy();
    expect(screen.getByLabelText("Level 3")).toBeTruthy();
    expect(screen.queryByText("Growing student")).toBeNull();
    expect(screen.getByText("2")).toBeTruthy();
    await fireEvent.press(screen.getByText("PLAY"));
    await fireEvent.press(screen.getByText("Review"));
    await fireEvent.press(screen.getByText("Retake"));

    expect(h.onStartDailyChallenge).toHaveBeenCalledTimes(1);
    expect(h.onStartReview).toHaveBeenCalledTimes(1);
    expect(h.onStartPlacement).toHaveBeenCalledTimes(1);
  });

  it("offers Play again when today's challenge is done", async () => {
    const profile = { ...createEmptyLearnerProfile(), assessmentCompleted: true, lastDailyChallengeAt: new Date().toISOString() };
    await render(<PracticeHub user={makeUser()} learnerProfile={profile} language="en" strings={strings} {...handlers()} />);
    expect(screen.getByText("PLAY AGAIN")).toBeTruthy();
  });

  it("says START for the level check even after some practice answers, since it starts over", async () => {
    const profile = { ...createEmptyLearnerProfile(), totalQuestionsAnswered: 6 };
    await render(<PracticeHub user={makeUser()} learnerProfile={profile} language="en" strings={strings} {...handlers()} />);
    expect(screen.getByText("START")).toBeTruthy();
    expect(screen.queryByText("RESUME")).toBeNull();
  });
});

describe("ShopView", () => {
  function renderShop(user: UserProfile, busy = false, pendingItemId?: string) {
    const handlers = { onUseItem: jest.fn(), onRestore: jest.fn(), onOpenLink: jest.fn() };
    return render(
      <ShopView user={user} strings={strings} items={SHOP_ITEMS} storePrices={{ "heart-pack-small": "€1,09" }} busy={busy} pendingItemId={pendingItemId} section={section} {...handlers} />
    ).then(() => handlers);
  }

  it("buys gem and video items straight away, and real-money items after the grown-up gate", async () => {
    const handlers = await renderShop(makeUser());

    for (const item of SHOP_ITEMS) {
      await fireEvent.press(screen.getByTestId(`shop-buy-${item.id}`));
      if (item.currencyType !== "gems" && item.currencyType !== "rewarded_ad") {
        expect(screen.getByText("Ask a grown-up")).toBeTruthy();
        await solveGate();
      }
    }

    expect(handlers.onUseItem.mock.calls.map(([item]) => item.id)).toEqual(SHOP_ITEMS.map((item) => item.id));
    expect(screen.getByText("€1,09")).toBeTruthy();
    expect(screen.getByText(/Renews automatically/)).toBeTruthy();
    expect(screen.getByText("Monthly")).toBeTruthy();
    expect(screen.getByText("Save 20%")).toBeTruthy();
  });

  it("does not buy, restore or open links when the gate answer is wrong", async () => {
    const handlers = await renderShop(makeUser());

    await fireEvent.press(screen.getByTestId("shop-buy-membership-yearly"));
    await solveGate(false);
    await fireEvent.press(screen.getByTestId("grownup-close"));
    expect(handlers.onUseItem).not.toHaveBeenCalled();

    await fireEvent.press(screen.getByTestId("shop-restore"));
    await solveGate();
    await fireEvent.press(screen.getByText("Terms"));
    await solveGate();
    await fireEvent.press(screen.getByText("Privacy"));
    await solveGate();

    expect(handlers.onRestore).toHaveBeenCalledTimes(1);
    expect(handlers.onOpenLink).toHaveBeenNthCalledWith(1, legalLinks.terms);
    expect(handlers.onOpenLink).toHaveBeenNthCalledWith(2, legalLinks.privacy);
  });

  it("shakes an unaffordable or unneeded gem item instead of buying it; its line says why", async () => {
    const { playGameSound } = jest.requireMock("../services/gameAudio");
    let handlers = await renderShop(makeUser({ gems: 10 }));
    expect(screen.getByText("Need 340 more")).toBeTruthy();
    playGameSound.mockClear();
    await fireEvent.press(screen.getByTestId("shop-buy-gem-heart-refill"));
    expect(handlers.onUseItem).not.toHaveBeenCalled();
    expect(playGameSound).toHaveBeenCalledWith("wrong", expect.anything());
    expect(screen.getByText("Need 340 more")).toBeTruthy();

    handlers = await renderShop(makeUser({ hearts: { current: 5, max: 5, unlimited: false, lastRefillDate: "2026-10-18" } }));
    expect(screen.getByText("Hearts are full")).toBeTruthy();
    await fireEvent.press(screen.getByTestId("shop-buy-gem-heart-refill"));
    expect(handlers.onUseItem).not.toHaveBeenCalled();
  });

  it("hides what the store cannot sell (web): only gem items stay, with no plans or restore", async () => {
    const handlers = { onUseItem: jest.fn(), onRestore: jest.fn(), onOpenLink: jest.fn() };
    await render(<ShopView user={makeUser()} strings={strings} items={SHOP_ITEMS} storePrices={{}} busy={false} section={section} canBuyWithMoney={false} {...handlers} />);

    for (const item of SHOP_ITEMS) {
      if (item.currencyType === "gems") expect(screen.getByTestId(`shop-buy-${item.id}`)).toBeTruthy();
      else expect(screen.queryByTestId(`shop-buy-${item.id}`)).toBeNull();
    }
    expect(screen.queryByTestId("shop-premium")).toBeNull();
    expect(screen.queryByTestId("shop-restore")).toBeNull();
    expect(screen.queryByText(/Renews automatically/)).toBeNull();
    expect(screen.getByTestId("shop-app-hint")).toBeTruthy();
    await fireEvent.press(screen.getByText("Terms"));
    await solveGate();
    expect(handlers.onOpenLink).toHaveBeenCalledWith(legalLinks.terms);
  });

  it("celebrates when a purchase fills the hearts", async () => {
    const { playGameSound } = jest.requireMock("../services/gameAudio");
    const props = { strings, items: SHOP_ITEMS, storePrices: {}, busy: false, section, onUseItem: jest.fn(), onRestore: jest.fn() };
    const view = await render(<ShopView user={makeUser()} {...props} />);
    playGameSound.mockClear();
    await view.rerender(<ShopView user={makeUser({ gems: 150, hearts: { current: 5, max: 5, unlimited: false, lastRefillDate: "2026-10-18" } })} {...props} />);
    expect(playGameSound).toHaveBeenCalledWith("unlock", expect.anything());
    expect(screen.getByText("5/5")).toBeTruthy();
  });

  it("pauses buying while busy and spins the pending item", async () => {
    const handlers = await renderShop(makeUser(), true, "gem-pack-medium");
    expect(screen.getByTestId("shop-pending-gem-pack-medium")).toBeTruthy();
    await fireEvent.press(screen.getByTestId("shop-buy-membership-yearly"));
    await fireEvent.press(screen.getByTestId("shop-buy-gem-heart-refill"));
    await fireEvent.press(screen.getByTestId("shop-restore"));
    expect(screen.queryByTestId("grownup-question")).toBeNull();
    expect(handlers.onUseItem).not.toHaveBeenCalled();
    expect(handlers.onRestore).not.toHaveBeenCalled();
  });

  it("sells nothing to premium learners but keeps restore and manage", async () => {
    const handlers = await renderShop(makeUser({ activeSubscriptionId: "membership-yearly", hearts: { current: 5, max: 5, unlimited: true, lastRefillDate: "" } }));
    expect(screen.queryByTestId("shop-buy-gem-heart-refill")).toBeNull();
    expect(screen.getByText("Unlimited hearts!")).toBeTruthy();
    await fireEvent.press(screen.getByTestId("shop-restore"));
    await solveGate();
    await fireEvent.press(screen.getByTestId("shop-manage"));
    await solveGate();
    expect(handlers.onRestore).toHaveBeenCalledTimes(1);
    expect(handlers.onOpenLink).toHaveBeenCalledTimes(1);
  });

  it("formats prices", () => {
    const yearly = SHOP_ITEMS.find((item) => item.id === "membership-yearly")!;
    expect(formatShopPrice(yearly)).toBe("$95.90/yr");
    expect(formatShopPrice(SHOP_ITEMS.find((item) => item.currencyType === "gems")!)).toBe("350");
  });
});

describe("ProfileView", () => {
  it("opens settings and toggles sound as a switch", async () => {
    const handlers = { onOpenSettings: jest.fn(), onToggleSound: jest.fn(), onCreateAccount: jest.fn() };
    await render(<ProfileView user={makeUser()} strings={strings} learnerProfile={createEmptyLearnerProfile()} soundEnabled {...handlers} />);

    await fireEvent.press(screen.getByTestId("profile-settings"));
    await fireEvent.press(screen.getByRole("switch"));

    expect(handlers.onOpenSettings).toHaveBeenCalledTimes(1);
    expect(handlers.onToggleSound).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("switch").props.accessibilityState).toMatchObject({ checked: true });
    expect(screen.queryByText("SIGN UP")).toBeNull();
    expect(screen.getByText("Amina")).toBeTruthy();
    expect(screen.getByText("@amina")).toBeTruthy();
    expect(screen.queryByText("amina@example.com")).toBeNull();
    expect(screen.getByText("12,480")).toBeTruthy();
  });

  it("asks a guest to save progress", async () => {
    const onCreateAccount = jest.fn();
    // A guest keeps the starter "New Learner" profile: never show that as a name.
    const guest = makeUser({ hasAccount: false, displayName: "New Learner", avatarInitials: "NL", username: "learner" });
    await render(<ProfileView user={guest} strings={strings} learnerProfile={createEmptyLearnerProfile()} onOpenSettings={jest.fn()} onCreateAccount={onCreateAccount} />);

    expect(screen.getByTestId("profile-name").props.children).toBe("Guest");
    expect(screen.queryByText("New")).toBeNull();
    expect(screen.queryByText("NL")).toBeNull();
    expect(screen.queryByText("@learner")).toBeNull();
    expect(screen.queryByTestId("profile-sound")).toBeNull();
    await fireEvent.press(screen.getByText("SIGN UP"));
    expect(onCreateAccount).toHaveBeenCalledTimes(1);
  });

  it("gives a long first name a smaller size and room for two lines", async () => {
    await render(<ProfileView user={makeUser({ displayName: "Muhammad-Abdurrahman Ibn Khalid" })} strings={strings} learnerProfile={createEmptyLearnerProfile()} onOpenSettings={jest.fn()} />);
    const name = screen.getByTestId("profile-name");
    expect(name.props.children).toBe("Muhammad-Abdurrahman");
    expect(name.props.numberOfLines).toBe(2);
    expect(StyleSheet.flatten(name.props.style).fontSize).toBeLessThanOrEqual(20);
  });

  it("counts stars and shortens big numbers", () => {
    const nodes = COURSE.sections[0].nodes.slice(0, 2);
    expect(countStars(nodes.map((node) => node.id))).toBe(nodes[0].starsReward + nodes[1].starsReward);
    expect(compactNumber(12480)).toBe("12,480");
    expect(compactNumber(123456)).toBe("123k");
  });
});

describe("CrewView", () => {
  function renderCrew(crew: CrewViewState, user = makeUser(), inviteEmail = "") {
    const handlers = {
      onChangeInviteEmail: jest.fn(),
      onChangeInviteRelation: jest.fn(),
      onAddFriend: jest.fn(),
      onRemoveFriend: jest.fn(),
      onRefresh: jest.fn(),
      onCreateAccount: jest.fn()
    };
    return render(<CrewView user={user} crew={crew} inviteEmail={inviteEmail} inviteRelation="friend" {...handlers} />).then(() => handlers);
  }

  it("shows the weekly race; a friend's card asks before removing them", async () => {
    const yusuf = member(2, "Yusuf Abdur-Rahman", "friend", 500);
    const handlers = await renderCrew({ status: "ready", payload: { me: member(1, "Amina", "you", 300), friends: [yusuf] } });

    expect(screen.getByText("You're #2 this week!")).toBeTruthy();
    expect(screen.getByText("Amina (you)")).toBeTruthy();
    expect(screen.queryByTestId("crew-remove-2")).toBeNull();
    await fireEvent.press(screen.getByTestId("crew-row-2"));
    // The big button is the friendly one; Remove is a small link that asks first.
    expect(screen.getByTestId("crew-friend-ok")).toBeTruthy();
    expect(screen.queryByTestId("crew-remove-2")).toBeNull();
    await fireEvent.press(screen.getByTestId("crew-ask-remove-2"));
    expect(screen.getByText("Remove Yusuf?")).toBeTruthy();
    await fireEvent.press(screen.getByText("KEEP"));
    expect(screen.getByTestId("crew-friend-ok")).toBeTruthy();
    expect(handlers.onRemoveFriend).not.toHaveBeenCalled();
    await fireEvent.press(screen.getByTestId("crew-ask-remove-2"));
    await fireEvent.press(screen.getByTestId("crew-remove-2"));
    expect(handlers.onRemoveFriend).toHaveBeenCalledWith(yusuf);

    await act(async () => screen.getByTestId("crew-view").props.refreshControl.props.onRefresh());
    expect(handlers.onRefresh).toHaveBeenCalledTimes(1);
  });

  it("invites a friend by email only after the grown-up gate", async () => {
    const handlers = await renderCrew({ status: "ready", payload: { me: member(1, "Amina", "you", 300), friends: [] } }, makeUser(), "y@example.com");

    await fireEvent.press(screen.getByText("INVITE"));
    expect(screen.getByText("Ask a grown-up")).toBeTruthy();
    await solveGate();
    await fireEvent.changeText(screen.getByTestId("crew-email"), "y@example.com");
    await fireEvent.press(screen.getByTestId("crew-relation-parent"));
    await fireEvent.press(screen.getByText("ADD"));

    expect(handlers.onChangeInviteEmail).toHaveBeenCalledWith("y@example.com");
    expect(handlers.onChangeInviteRelation).toHaveBeenCalledWith("parent");
    expect(handlers.onAddFriend).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId("crew-relation-friend").props.accessibilityState).toMatchObject({ checked: true });
  });

  it("adds a friend when Enter is pressed in the email field", async () => {
    const handlers = await renderCrew({ status: "ready", payload: { me: member(1, "Amina", "you", 300), friends: [] } }, makeUser(), "y@example.com");
    await fireEvent.press(screen.getByText("INVITE"));
    await solveGate();
    await fireEvent(screen.getByTestId("crew-email"), "submitEditing");
    expect(handlers.onAddFriend).toHaveBeenCalledTimes(1);
  });

  it("asks guests to sign up", async () => {
    const handlers = await renderCrew({ status: "signed_out" }, makeUser({ hasAccount: false }));
    await fireEvent.press(screen.getByText("SIGN UP"));
    expect(handlers.onCreateAccount).toHaveBeenCalledTimes(1);
  });

  it("retries when offline or on error without showing server text, and loads when idle", async () => {
    let handlers = await renderCrew({ status: "error", message: "Your crew needs an internet connection. Check your connection and try again." });
    expect(screen.getByText("No internet")).toBeTruthy();
    await fireEvent.press(screen.getByText("TRY AGAIN"));
    expect(handlers.onRefresh).toHaveBeenCalledTimes(1);
    // The tap shows it is trying, even when the answer comes back at once.
    expect(screen.getByTestId("crew-offline-busy")).toBeTruthy();
    expect(screen.queryByText("TRY AGAIN")).toBeNull();

    handlers = await renderCrew({ status: "error", message: "HTTP 500: upstream exploded" });
    expect(screen.getByText("Oops!")).toBeTruthy();
    expect(screen.queryByText(/upstream/)).toBeNull();
    await fireEvent.press(screen.getByText("TRY AGAIN"));
    expect(handlers.onRefresh).toHaveBeenCalledTimes(1);

    await renderCrew({ status: "loading" });
    expect(screen.getByTestId("crew-loading")).toBeTruthy();

    handlers = await renderCrew({ status: "idle" });
    expect(handlers.onRefresh).toHaveBeenCalledTimes(1);
  });

  it("says Crew is coming soon when the build has no server, with nothing to retry", async () => {
    const handlers = {
      onChangeInviteEmail: jest.fn(),
      onChangeInviteRelation: jest.fn(),
      onAddFriend: jest.fn(),
      onRemoveFriend: jest.fn(),
      onRefresh: jest.fn(),
      onCreateAccount: jest.fn()
    };
    await render(<CrewView user={makeUser()} crew={{ status: "idle" }} inviteEmail="" inviteRelation="friend" unavailable {...handlers} />);
    expect(screen.getByText("Crew is coming soon!")).toBeTruthy();
    expect(screen.queryByText("TRY AGAIN")).toBeNull();
    expect(screen.queryByText("No internet")).toBeNull();
    expect(handlers.onRefresh).not.toHaveBeenCalled();
  });
});

describe("FoundationAssessmentScreen", () => {
  const base = createFoundationAssessment(createEmptyLearnerProfile(), "placement");
  const feedback = {
    correct: false,
    explanationShort: "Short why.",
    explanationLong: "",
    whyThisMatters: "It matters.",
    misconceptionNotes: [],
    wrongAnswerReasons: [],
    reviewNext: "Shahadah",
    confidenceLabel: "",
    reflectionPrompt: ""
  };
  const makeHandlers = () => ({ onChangeSelectedAnswer: jest.fn(), onSubmit: jest.fn(), onContinue: jest.fn(), onExit: jest.fn() });

  it("picks an answer, checks, and asks before closing", async () => {
    const question = FOUNDATION_QUESTION_BANK.find((candidate) => candidate.type === "multiple_choice")!;
    const handlers = makeHandlers();
    await render(<FoundationAssessmentScreen assessment={{ ...base, currentQuestion: question }} language="en" selectedAnswer={question.options![0]} {...handlers} />);

    // No "How sure?" step.
    expect(screen.queryByText("How sure?")).toBeNull();
    await fireEvent.press(screen.getByText(question.options![1]));
    await fireEvent.press(screen.getByText("CHECK"));
    await fireEvent.press(screen.getByLabelText("Close"));
    expect(handlers.onExit).not.toHaveBeenCalled();
    await fireEvent.press(screen.getByTestId("quit-end"));

    expect(handlers.onChangeSelectedAnswer).toHaveBeenCalledWith(question.options![1]);
    expect(handlers.onSubmit).toHaveBeenCalledTimes(1);
    expect(handlers.onExit).toHaveBeenCalledTimes(1);
  });

  it("freezes the answer tiles after CHECK", async () => {
    const question = FOUNDATION_QUESTION_BANK.find((candidate) => candidate.type === "multiple_choice")!;
    const handlers = makeHandlers();
    await render(<FoundationAssessmentScreen assessment={{ ...base, currentQuestion: question, feedback }} language="en" selectedAnswer={question.options![0]} {...handlers} />);

    await fireEvent.press(screen.getByText(question.options![1]));
    expect(handlers.onChangeSelectedAnswer).not.toHaveBeenCalled();
  });

  it("toggles multi-select boxes", async () => {
    const question = FOUNDATION_QUESTION_BANK.find((candidate) => candidate.type === "multi_select")!;
    const handlers = makeHandlers();
    await render(<FoundationAssessmentScreen assessment={{ ...base, currentQuestion: question }} language="en" selectedAnswer={[question.options![0]]} {...handlers} />);

    expect(screen.getByText("Pick all that fit")).toBeTruthy();
    await fireEvent.press(screen.getByText(question.options![1]));
    await fireEvent.press(screen.getByText(question.options![0]));
    expect(handlers.onChangeSelectedAnswer).toHaveBeenNthCalledWith(1, [question.options![0], question.options![1]]);
    expect(handlers.onChangeSelectedAnswer).toHaveBeenNthCalledWith(2, []);
  });

  it("pairs a phrase with a meaning by tapping one from each column", async () => {
    const question = FOUNDATION_QUESTION_BANK.find((candidate) => candidate.type === "match_pairs")!;
    const handlers = makeHandlers();
    const pair = question.pairs![0];
    await render(<FoundationAssessmentScreen assessment={{ ...base, currentQuestion: question }} language="en" selectedAnswer={undefined} {...handlers} />);

    expect(screen.getByText(question.prompt)).toBeTruthy();
    await fireEvent.press(screen.getByTestId(`match-left-${pair.left}`));
    await fireEvent.press(screen.getByTestId(`match-right-${pair.right}`));
    expect(handlers.onChangeSelectedAnswer).toHaveBeenCalledWith({ [pair.left]: pair.right });
  });

  it("fills numbered order slots", async () => {
    const question = FOUNDATION_QUESTION_BANK.find((candidate) => candidate.type === "correct_order")!;
    const handlers = makeHandlers();
    await render(<FoundationAssessmentScreen assessment={{ ...base, currentQuestion: question }} language="en" selectedAnswer={[]} {...handlers} />);

    expect(screen.getByLabelText(`Slot ${question.orderItems!.length}`)).toBeTruthy();
    await fireEvent.press(screen.getByText(question.orderItems![1]));
    expect(handlers.onChangeSelectedAnswer).toHaveBeenCalledWith([question.orderItems![1]]);
  });

  it("continues after feedback", async () => {
    const onContinue = jest.fn();
    const question = base.currentQuestion;
    await render(<FoundationAssessmentScreen assessment={{ ...base, feedback: { ...feedback, explanationShort: "The Shahadah is the first pillar." } }} language="en" selectedAnswer={undefined} onChangeSelectedAnswer={jest.fn()} onSubmit={jest.fn()} onContinue={onContinue} onExit={jest.fn()} />);

    // The lesson sheet: "Correct answer:" and the answer, one short Why line, no teacher notes.
    expect(screen.getByText("Correct answer:")).toBeTruthy();
    expect(screen.getByTestId("feedback-answer").props.children).toBe(String(question.correctAnswer));
    await fireEvent.press(screen.getByTestId("feedback-why"));
    expect(screen.getByTestId("feedback-why-text")).toBeTruthy();
    expect(screen.queryByText("It matters.")).toBeNull();
    await fireEvent.press(screen.getByText("GOT IT"));
    expect(onContinue).toHaveBeenCalledTimes(1);
  });
});
