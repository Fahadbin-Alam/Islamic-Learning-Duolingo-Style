import React, { useEffect, useMemo, useState } from "react";
import { Platform, ScrollView, StyleSheet, View } from "react-native";
import { FoundationAssessmentScreen, FoundationDashboard } from "../../components/FoundationLearning";
import { COURSE, SHOP_ITEMS } from "../../data/course";
import { FOUNDATION_QUESTION_BANK } from "../../data/foundationQuestionBank";
import { getUiStrings } from "../../i18n";
import type { CrewMember } from "../../services/backendSync";
import {
  createEmptyLearnerProfile,
  createFoundationAssessment,
  submitFoundationAssessmentAnswer
} from "../../services/foundationAssessment";
import type { FoundationAssessmentState, FoundationQuestion, LearnerProfile, SocialRelation, UserProfile } from "../../types";
import { AppTopBar } from "../screens/AppTopBar";
import { BottomTabs, type TabKey } from "../screens/BottomTabs";
import { CrewView, type CrewViewState } from "../screens/CrewView";
import { PracticeHub } from "../screens/PracticeHub";
import { ProfileView } from "../screens/ProfileView";
import { ShopView } from "../screens/ShopView";
import { colors } from "../theme";

const STATES = [
  "practice-new",
  "practice-done",
  "shop",
  "shop-premium",
  "shop-busy",
  "profile-guest",
  "profile-user",
  "crew-ready",
  "crew-empty",
  "crew-guest",
  "crew-loading",
  "crew-error",
  "crew-offline",
  "foundation-new",
  "foundation-done",
  "assess",
  "assess-multi",
  "assess-multi-checked",
  "assess-order",
  "assess-match",
  "assess-right",
  "assess-wrong"
] as const;
type State = (typeof STATES)[number];

function readState(): State {
  if (Platform.OS !== "web" || typeof window === "undefined") return "practice-new";
  const suffix = window.location.hash.replace(/^#gallery-more-?/, "");
  return (STATES as readonly string[]).includes(suffix) ? (suffix as State) : "practice-new";
}

const strings = getUiStrings("en");
const foundation = COURSE.sections.find((section) => section.topicId === "foundation") ?? COURSE.sections[0];
const prayer = COURSE.sections.find((section) => section.topicId === "prayer") ?? COURSE.sections[0];
const today = new Date().toISOString();
const daysAgo = (days: number) => new Date(Date.now() - days * 86400000).toISOString();

function makeUser(kind: "guest" | "user" | "premium"): UserProfile {
  const completed = kind === "guest" ? foundation.nodes.slice(0, 2) : [...foundation.nodes.slice(0, 5), ...prayer.nodes.slice(0, 4)];
  return {
    id: 1,
    username: kind === "guest" ? "guest" : "amina",
    displayName: kind === "guest" ? "Learner" : "Amina Rahman-Abdullah",
    avatarInitials: kind === "guest" ? "L" : "AR",
    hasAccount: kind !== "guest",
    accountEmail: kind === "guest" ? undefined : "amina.rahman.abdullah@example.com",
    streakDays: kind === "guest" ? 2 : 47,
    totalXp: kind === "guest" ? 85 : 12480,
    dailyGoalXp: 30,
    gems: kind === "guest" ? 120 : kind === "premium" ? 2350 : 505,
    hearts: kind === "premium" ? { current: 5, max: 5, unlimited: true, lastRefillDate: today } : { current: 3, max: 5, unlimited: false, lastRefillDate: today },
    completedLessonIds: [],
    completedNodeIds: completed.map((node) => node.id),
    activeSubscriptionId: kind === "premium" ? "membership-yearly" : undefined,
    soundEffectsEnabled: true
  };
}

function placedProfile(): LearnerProfile {
  return {
    ...createEmptyLearnerProfile(),
    assessmentCompleted: true,
    readiness_label: "Growing student",
    overall_level: "developing",
    totalQuestionsAnswered: 14,
    weak_areas: ["taharah", "zakat"],
    needs_review_question_ids: ["a", "b", "c"],
    lastDailyChallengeAt: today,
    category_levels: Object.fromEntries(
      Object.entries(createEmptyLearnerProfile().category_levels).map(([key, value], index) => [
        key,
        { ...value, questionsAttempted: 4, questionsAnsweredCorrectly: (index % 4) + 1, accuracyPercentage: 25 * ((index % 4) + 1), confidenceScore: 0.6 }
      ])
    ) as LearnerProfile["category_levels"]
  };
}

function member(id: number, name: string, initials: string, relation: CrewMember["relation"], weeklyXp: number, streakDays: number, last: string | null): CrewMember {
  return { id, name, avatarInitials: initials, relation, totalXp: weeklyXp * 9, weeklyXp, streakDays, lastLearningAt: last };
}

const me = member(1, "Amina", "AR", "you", 340, 47, today);
const friends: CrewMember[] = [
  member(2, "Yusuf Abdur-Rahman Al-Khwarizmi", "YA", "friend", 520, 12, today),
  member(3, "Mum", "M", "parent", 210, 3, daysAgo(2)),
  member(4, "Bilal", "B", "friend", 95, 0, daysAgo(5)),
  member(5, "Maryam", "MS", "friend", 40, 1, null)
];

function assessmentFor(type: FoundationQuestion["type"] | undefined, answer?: "right" | "wrong"): FoundationAssessmentState {
  const profile = createEmptyLearnerProfile();
  const base = createFoundationAssessment(profile, "placement");
  const question = (type && FOUNDATION_QUESTION_BANK.find((candidate) => candidate.type === type)) || base.currentQuestion;
  const state: FoundationAssessmentState = { ...base, currentQuestion: question, questionNumber: 3 };
  if (type === "multi_select" && question.options) {
    if (answer) {
      return submitFoundationAssessmentAnswer({ profile, state, selectedAnswer: question.options.slice(0, 2), confidence: 3, responseTimeMs: 4000 }).stateWithFeedback;
    }
    return { ...state, selectedAnswer: question.options.slice(0, 2), confidence: 3 };
  }
  if (type === "correct_order" && question.orderItems) {
    return { ...state, selectedAnswer: question.orderItems.slice(0, 2), confidence: 2 };
  }
  if (type === "match_pairs" && question.pairs && question.options) {
    return { ...state, selectedAnswer: { [question.pairs[0].left]: question.options[0] }, confidence: 2 };
  }
  if (!answer) {
    return { ...state, selectedAnswer: question.options?.[1], confidence: 3 };
  }
  const correct = typeof question.correctAnswer === "string" ? question.correctAnswer : question.options?.[0] ?? "";
  const pick = answer === "right" ? correct : question.options?.find((option) => option !== correct) ?? "";
  return submitFoundationAssessmentAnswer({ profile, state, selectedAnswer: pick, confidence: 3, responseTimeMs: 4000 }).stateWithFeedback;
}

const noop = () => undefined;

function TabFrame({ tab, user, children }: { tab: TabKey; user: UserProfile; children: React.ReactNode }) {
  return (
    <View style={styles.root}>
      <AppTopBar
        topicId="foundation"
        topicTitle={foundation.title}
        accent={foundation.accentColor}
        streakDays={user.streakDays}
        gems={user.gems}
        hearts={user.hearts}
        onOpenTopics={noop}
        onOpenShop={noop}
      />
      <View style={styles.body}>{children}</View>
      <BottomTabs active={tab} onChange={noop} />
    </View>
  );
}

function CrewDemo({ state }: { state: State }) {
  const [email, setEmail] = useState("");
  const [relation, setRelation] = useState<SocialRelation>("friend");
  const user = makeUser(state === "crew-guest" ? "guest" : "user");
  const crew: CrewViewState =
    state === "crew-guest"
      ? { status: "signed_out" }
      : state === "crew-loading"
        ? { status: "loading" }
        : state === "crew-error"
          ? { status: "error", message: "Could not load your crew." }
          : state === "crew-offline"
            ? { status: "error", message: "Your crew needs an internet connection. Check your connection and try again." }
            : { status: "ready", payload: { me, friends: state === "crew-empty" ? [] : friends } };
  return (
    <TabFrame tab="crew" user={user}>
      <CrewView
        user={user}
        crew={crew}
        inviteEmail={email}
        inviteRelation={relation}
        onChangeInviteEmail={setEmail}
        onChangeInviteRelation={setRelation}
        onAddFriend={noop}
        onRemoveFriend={noop}
        onRefresh={noop}
        onCreateAccount={noop}
      />
    </TabFrame>
  );
}

function AssessDemo({ state }: { state: State }) {
  const initial = useMemo(() => {
    if (state === "assess-multi") return assessmentFor("multi_select");
    if (state === "assess-multi-checked") return assessmentFor("multi_select", "wrong");
    if (state === "assess-order") return assessmentFor("correct_order");
    if (state === "assess-match") return assessmentFor("match_pairs");
    if (state === "assess-right") return assessmentFor("multiple_choice", "right");
    if (state === "assess-wrong") return assessmentFor("multiple_choice", "wrong");
    return assessmentFor("multiple_choice");
  }, [state]);
  const [selected, setSelected] = useState(initial.selectedAnswer);
  const [confidence, setConfidence] = useState(initial.confidence);
  return (
    <View style={styles.root}>
      <FoundationAssessmentScreen
        assessment={initial}
        language="en"
        selectedAnswer={selected}
        confidence={confidence}
        onChangeSelectedAnswer={setSelected}
        onChangeConfidence={setConfidence}
        onSubmit={noop}
        onContinue={noop}
        onExit={noop}
        mascotVariant={foundation.mascot}
      />
    </View>
  );
}

function Screen({ state }: { state: State }) {
  if (state.startsWith("practice")) {
    const user = makeUser("user");
    const profile = state === "practice-done" ? placedProfile() : createEmptyLearnerProfile();
    return (
      <TabFrame tab="practice" user={user}>
        <PracticeHub
          user={user}
          learnerProfile={profile}
          language="en"
          strings={strings}
          onStartPlacement={noop}
          onStartReview={noop}
          onStartDailyChallenge={noop}
          onGoFoundation={noop}
          mascotVariant={foundation.mascot}
          accent={prayer.accentColor}
        />
      </TabFrame>
    );
  }
  if (state.startsWith("shop")) {
    const user = makeUser(state === "shop-premium" ? "premium" : "guest");
    return (
      <TabFrame tab="shop" user={user}>
        <ShopView
          user={user}
          strings={strings}
          items={SHOP_ITEMS}
          storePrices={{}}
          busy={state === "shop-busy"}
          pendingItemId={state === "shop-busy" ? "gem-pack-medium" : undefined}
          section={foundation}
          onUseItem={noop}
          onRestore={noop}
          onOpenLink={noop}
        />
      </TabFrame>
    );
  }
  if (state.startsWith("profile")) {
    const user = makeUser(state === "profile-guest" ? "guest" : "user");
    return (
      <TabFrame tab="me" user={user}>
        <ProfileView
          user={user}
          strings={strings}
          learnerProfile={state === "profile-guest" ? createEmptyLearnerProfile() : placedProfile()}
          onOpenSettings={noop}
          onCreateAccount={noop}
          soundEnabled={state !== "profile-guest"}
          onToggleSound={noop}
          accent={state === "profile-guest" ? foundation.accentColor : prayer.accentColor}
          mascotVariant={state === "profile-guest" ? foundation.mascot : prayer.mascot}
        />
      </TabFrame>
    );
  }
  if (state.startsWith("crew")) {
    return <CrewDemo state={state} />;
  }
  if (state.startsWith("foundation")) {
    const profile = state === "foundation-done" ? placedProfile() : createEmptyLearnerProfile();
    return (
      <ScrollView style={styles.root} contentContainerStyle={styles.pad}>
        <FoundationDashboard
          profile={profile}
          onStartPlacement={noop}
          onStartReview={noop}
          onStartDailyChallenge={noop}
          onSkipAssessment={noop}
          onExploreFreely={noop}
          mascotVariant={foundation.mascot}
        />
      </ScrollView>
    );
  }
  return <AssessDemo state={state} />;
}

/** More-tabs gallery. States: #gallery-more-<state>, see STATES. */
export default function MoreGallery() {
  const [state, setState] = useState<State>(readState);

  useEffect(() => {
    if (Platform.OS !== "web" || typeof window === "undefined") return undefined;
    const onChange = () => setState(readState());
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);

  return <Screen key={state} state={state} />;
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.snow
  },
  body: {
    flex: 1
  },
  pad: {
    padding: 16
  }
});
