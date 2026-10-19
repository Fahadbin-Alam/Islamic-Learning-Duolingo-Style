import React, { useEffect, useMemo, useReducer, useRef, useState } from "react";
import {
  Linking,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View
} from "react-native";
import {
  applyPremiumStatus,
  applyShopItem,
  canSpendGems,
  canTestOut,
  completeLesson,
  addXp,
  localDateKey,
  completeLessonCluster,
  createTestOutSession,
  didExtendStreak,
  getAssessmentXp,
  getXpToday,
  findNextPlayableNode,
  isOutOfHearts,
  testOutPassingScore,
  grantHearts,
  isPremiumUser,
  learningApi,
  loseHeart,
  prepareUserForToday,
  refillHeartsForToday
} from "./api/islamicLearningApi";
import { SOCIAL_AUTH_CONFIG } from "./config/auth";
import { COURSE, LESSONS_BY_ID, SHOP_ITEMS } from "./data/course";
import {
  DEFAULT_LANGUAGE,
  getNodeTitle,
  getTopicCopy,
  getUiStrings,
  LANGUAGE_OPTIONS,
  LANGUAGE_PICKER_ENABLED,
  normalizeLanguage
} from "./i18n";
import { localizeLessonContent } from "./services/contentLocalization";
import {
  clearLocalAuthAccount,
  createLocalAuthAccount,
  loadLocalAuthAccount,
  loginLocalAuthAccount,
  signOutLocalAuthAccount,
  updateLocalAuthAccount
} from "./services/localAuth";
import {
  BackendRequestError,
  deleteRemoteAccount,
  getSessionToken,
  hydrateRemoteSession,
  isBackendConfigured,
  loginRemoteAccount,
  logoutRemoteAccount,
  registerRemoteAccount,
  addCrewMember,
  fetchCrew,
  removeCrewMember,
  syncRemoteUser,
  type CrewMember,
  type CrewPayload
} from "./services/backendSync";
import {
  clearAccountProfile,
  clearSavedUserProfile,
  loadSavedUserProfile,
  saveUserProfile,
  stashAccountProfile,
  takeAccountProfile
} from "./services/localProgress";
import { AdBanner } from "./components/AdBanner";
import { monetizationClient } from "./services/monetization";
import { shouldShowLessonBreakAd } from "./services/monetizationConfig";
import { clearSocialHubState } from "./services/socialHub";
import {
  requestIslamicNotificationPermission,
  scheduleIslamicReminderChecks
} from "./services/islamicNotifications";
import {
  FoundationAssessmentScreen,
  PracticeComplete
} from "./components/FoundationLearning";
import {
  advanceFoundationAssessment,
  applyLessonSignalToLearnerProfile,
  createEmptyLearnerProfile,
  createFoundationAssessment,
  ensureLearnerProfile,
  finalizeFoundationAssessment,
  submitFoundationAssessmentAnswer
} from "./services/foundationAssessment";
import { playGameSound, primeGameAudio } from "./services/gameAudio";
import * as Speech from "expo-speech";
import { colors, configureUiSound, fonts, Mascot } from "./ui";
import { PortalHost } from "./ui/Portal";
import {
  AccountSheet,
  AppTopBar,
  BottomTabs,
  checkAccountFields,
  ConfirmSheet,
  CrewView,
  LanguageSheet,
  LearnPath,
  PracticeHub,
  ProfileView,
  RefillSheet,
  RewardPop,
  SettingsSheet,
  ShopView,
  TopicPicker,
  tabForScreen,
  useNotices,
  type PathItem,
  type PathUnit,
  type TabKey,
  type TopicPickerTopic
} from "./ui/screens";
import { ExerciseView, LearnCard, LessonComplete, LessonScreen, OrderGame, QuitSheet, getLessonLine, getLessonProgress, isPlayablePractice, shortWhy } from "./ui/lesson";
import { getBranchArabic, getLessonArabic, getNodeArabic, getTopicArabic } from "./data/arabicTerms";
import type {
  AccountRole,
  Challenge,
  FoundationAssessmentState,
  FoundationCategoryId,
  LearnerProfile,
  LearningBranch,
  LearningNodeView,
  LearningSection,
  LessonSession,
  PremiumStatus,
  ReminderPreferences,
  SocialRelation,
  ShopItem,
  SupportedLanguage,
  TopicId,
  UserProfile,
  XpSummary
} from "./types";

type Screen =
  | "home"
  | "topic"
  | "branch"
  | "lesson_teach"
  | "lesson_practice"
  | "lesson_question"
  | "lesson_feedback"
  | "lesson_complete"
  | "assessment"
  | "review"
  | "profile"
  | "shop"
  | "social";
type AnswerState = "correct" | "wrong" | undefined;
type AuthMode = "create" | "login";
type SocialProvider = keyof typeof SOCIAL_AUTH_CONFIG;

type JourneyRewardStop = {
  id: string;
  title: string;
  copy: string;
  gemsReward: number;
  unlocked: boolean;
  claimed: boolean;
};

type CrewState =
  | { status: "idle" | "loading" | "signed_out" }
  | { status: "ready"; payload: CrewPayload }
  | { status: "error"; message: string };

// The out-of-hearts sheet: the one free refill, or the shop. `resume` is what the learner was
// starting on the path, played once a free refill lands.
type OutOfHeartsSheet = {
  open: boolean;
  variant: "free" | "shop";
  inLesson: boolean;
  resume?: { kind: "node"; node: LearningNodeView } | { kind: "test_out"; unitId: string };
};

type TestOutResult = {
  open: boolean;
  correct: number;
  total: number;
  passingScore: number;
  unitId: string;
};

type LessonCelebration = {
  headline?: string;
  title: string;
  xp: number;
  stars: number;
  unlockedTitle?: string;
  streakDays: number;
  streakExtended?: boolean;
  gemsReward?: number;
};

interface AppState {
  screen: Screen;
  returnScreen?: Screen;
  selectedTopic: TopicId;
  selectedBranchId?: string;
  /** The shop scrolls here when it opens (a premium unit's UNLOCK). */
  shopFocus?: "premium";
  user?: UserProfile;
  xpSummary: XpSummary[];
  activeSession?: LessonSession;
  challengeIndex: number;
  selectedChoiceId?: string;
  answerState: AnswerState;
  retryingCurrentChallenge: boolean;
  lastAnswerWasRetry: boolean;
  sessionCorrectCount: number;
  sessionMissedLessonIds: string[];
  loading: boolean;
}

type Action =
  | { type: "loaded"; user: UserProfile; xpSummary: XpSummary[] }
  | { type: "go_home" }
  | { type: "show_topic" }
  | { type: "show_branch" }
  | { type: "select_topic"; topicId: TopicId }
  | { type: "select_branch"; branchId: string }
  | { type: "open_review" }
  | { type: "close_review" }
  | { type: "open_profile" }
  | { type: "close_profile" }
  | { type: "open_assessment"; returnScreen?: Screen }
  | { type: "close_assessment" }
  | { type: "open_shop"; focus?: "premium" }
  | { type: "open_social" }
  | { type: "close_shop" }
  | { type: "close_social" }
  | { type: "start_lesson"; session: LessonSession }
  | { type: "show_practice_screen" }
  | { type: "begin_lesson_questions" }
  | { type: "select_choice"; choiceId: string }
  | { type: "answer"; correct: boolean; user: UserProfile; missedLessonId?: string; scored?: boolean; retried?: boolean }
  | { type: "retry_challenge" }
  | { type: "next_challenge" }
  | { type: "finish_lesson"; user: UserProfile; xpSummary: XpSummary[] }
  | { type: "close_lesson_complete" }
  | { type: "apply_user"; user: UserProfile }
  | { type: "apply_user_latest"; update: (user: UserProfile) => UserProfile }
  | { type: "sync_premium"; premium: PremiumStatus }
  | { type: "reset_lesson" };

const initialState: AppState = {
  screen: "home",
  selectedTopic: "foundation",
  xpSummary: [],
  challengeIndex: 0,
  answerState: undefined,
  retryingCurrentChallenge: false,
  lastAnswerWasRetry: false,
  sessionCorrectCount: 0,
  sessionMissedLessonIds: [],
  loading: true
};

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "loaded":
      return { ...state, user: action.user, xpSummary: action.xpSummary, loading: false };
    case "go_home":
      return { ...state, screen: "home", returnScreen: undefined };
    case "show_topic":
      return { ...state, screen: "topic", returnScreen: undefined };
    case "show_branch":
      return { ...state, screen: "branch", returnScreen: undefined };
    case "select_topic":
      return { ...state, selectedTopic: action.topicId, selectedBranchId: undefined, screen: "topic", returnScreen: undefined };
    case "select_branch":
      return { ...state, selectedBranchId: action.branchId, screen: "branch", returnScreen: undefined };
    case "open_review":
      return { ...state, returnScreen: state.screen, screen: "review" };
    case "close_review":
      return { ...state, screen: state.returnScreen ?? "home", returnScreen: undefined };
    case "open_profile":
      return { ...state, returnScreen: state.screen, screen: "profile" };
    case "close_profile":
      return { ...state, screen: state.returnScreen ?? "home", returnScreen: undefined };
    case "open_assessment":
      return { ...state, screen: "assessment", returnScreen: action.returnScreen ?? state.screen };
    case "close_assessment":
      return { ...state, screen: state.returnScreen ?? "home", returnScreen: undefined };
    case "open_shop":
      return { ...state, returnScreen: state.screen, screen: "shop", shopFocus: action.focus };
    case "open_social":
      return { ...state, returnScreen: state.screen, screen: "social" };
    case "close_shop":
      return { ...state, screen: state.returnScreen ?? "home", returnScreen: undefined };
    case "close_social":
      return { ...state, screen: state.returnScreen ?? "home", returnScreen: undefined };
    case "start_lesson":
      return {
        ...state,
        // The path's node card already shows what the lesson is, so go straight to learning.
        // A test-out has nothing new to teach, so it starts with the questions.
        screen: action.session.mode === "test_out" ? "lesson_question" : "lesson_teach",
        activeSession: action.session,
        challengeIndex: 0,
        selectedChoiceId: undefined,
        answerState: undefined,
        retryingCurrentChallenge: false,
        lastAnswerWasRetry: false,
        sessionCorrectCount: 0,
        sessionMissedLessonIds: []
      };
    case "show_practice_screen":
      return { ...state, screen: "lesson_practice" };
    case "begin_lesson_questions":
      return {
        ...state,
        screen: "lesson_question",
        selectedChoiceId: undefined,
        answerState: undefined,
        retryingCurrentChallenge: false
      };
    case "select_choice":
      return { ...state, selectedChoiceId: action.choiceId };
    case "answer":
      {
      const scored = action.scored ?? true;
      return {
        ...state,
        user: action.user,
        screen: "lesson_feedback",
        answerState: action.correct ? "correct" : "wrong",
        retryingCurrentChallenge: false,
        lastAnswerWasRetry: action.retried ?? false,
        sessionCorrectCount: action.correct && scored ? state.sessionCorrectCount + 1 : state.sessionCorrectCount,
        sessionMissedLessonIds: action.correct || !scored || !action.missedLessonId || state.sessionMissedLessonIds.includes(action.missedLessonId)
          ? state.sessionMissedLessonIds
          : [...state.sessionMissedLessonIds, action.missedLessonId]
      };
      }
    case "retry_challenge":
      return {
        ...state,
        screen: "lesson_question",
        selectedChoiceId: undefined,
        answerState: undefined,
        retryingCurrentChallenge: true,
        lastAnswerWasRetry: false
      };
    case "next_challenge":
      return {
        ...state,
        screen: "lesson_question",
        challengeIndex: state.challengeIndex + 1,
        selectedChoiceId: undefined,
        answerState: undefined,
        retryingCurrentChallenge: false,
        lastAnswerWasRetry: false
      };
    case "finish_lesson":
      return {
        ...state,
        screen: "lesson_complete",
        user: action.user,
        xpSummary: action.xpSummary,
        selectedChoiceId: undefined,
        answerState: undefined,
        retryingCurrentChallenge: false,
        lastAnswerWasRetry: false
      };
    case "close_lesson_complete":
      return {
        ...state,
        screen: "branch",
        activeSession: undefined,
        challengeIndex: 0,
        selectedChoiceId: undefined,
        answerState: undefined,
        retryingCurrentChallenge: false,
        lastAnswerWasRetry: false,
        sessionCorrectCount: 0,
        sessionMissedLessonIds: []
      };
    case "apply_user":
      return { ...state, user: action.user };
    case "apply_user_latest":
      return state.user ? { ...state, user: action.update(state.user) } : state;
    case "sync_premium":
      return state.user ? { ...state, user: applyPremiumStatus(state.user, action.premium) } : state;
    case "reset_lesson":
      return {
        ...state,
        screen: "branch",
        activeSession: undefined,
        challengeIndex: 0,
        selectedChoiceId: undefined,
        answerState: undefined,
        retryingCurrentChallenge: false,
        lastAnswerWasRetry: false,
        sessionCorrectCount: 0,
        sessionMissedLessonIds: []
      };
    default:
      return state;
  }
}

export default function TopicApp() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [accountModalVisible, setAccountModalVisible] = useState(false);
  const [outOfHearts, setOutOfHearts] = useState<OutOfHeartsSheet | undefined>(undefined);
  const [languageModalVisible, setLanguageModalVisible] = useState(false);
  const [accountPromptShown, setAccountPromptShown] = useState(false);
  const [accountPromptDue, setAccountPromptDue] = useState(false);
  const [settingsModalVisible, setSettingsModalVisible] = useState(false);
  const [activeAssessment, setActiveAssessment] = useState<FoundationAssessmentState | undefined>(undefined);
  const [practiceResult, setPracticeResult] = useState<{ assessment: FoundationAssessmentState; profile: LearnerProfile } | undefined>(undefined);
  const [testOutResult, setTestOutResult] = useState<TestOutResult | undefined>(undefined);
  const [authMode, setAuthMode] = useState<AuthMode>("create");
  const [accountError, setAccountError] = useState<string | undefined>(undefined);
  const [hasSavedAccount, setHasSavedAccount] = useState(false);
  const [accountName, setAccountName] = useState("");
  const [accountEmail, setAccountEmail] = useState("");
  const [accountPassword, setAccountPassword] = useState("");
  const [settingsRole, setSettingsRole] = useState<AccountRole | undefined>(undefined);
  const [settingsDailyReminder, setSettingsDailyReminder] = useState(true);
  const [settingsWeeklyReminder, setSettingsWeeklyReminder] = useState(true);
  const [settingsStreakReminder, setSettingsStreakReminder] = useState(true);
  const [settingsIslamicReminder, setSettingsIslamicReminder] = useState(true);
  const [settingsSoundEnabled, setSettingsSoundEnabled] = useState(true);
  const [settingsReducedSound, setSettingsReducedSound] = useState(false);
  const [crew, setCrew] = useState<CrewState>({ status: "idle" });
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRelation, setInviteRelation] = useState<SocialRelation>("friend");
  const [pendingLanguage, setPendingLanguage] = useState<SupportedLanguage>(DEFAULT_LANGUAGE);
  const [lessonCompleteSummary, setLessonCompleteSummary] = useState<LessonCelebration | undefined>(undefined);
  // An opened chest: its gems land when the learner taps COLLECT.
  const [rewardCelebration, setRewardCelebration] = useState<{ stop: JourneyRewardStop } | undefined>(undefined);
  const [topicPickerVisible, setTopicPickerVisible] = useState(false);
  const [quitLessonVisible, setQuitLessonVisible] = useState(false);
  const challengeStartedAtRef = useRef(Date.now());
  const lessonsFinishedRef = useRef(0);
  const [storePrices, setStorePrices] = useState<Record<string, string>>({});
  const [shopBusy, setShopBusy] = useState(false);
  const monetizationUserId = state.user?.hasAccount ? String(state.user.id) : undefined;
  const hasUser = Boolean(state.user);

  // Connect the store once a learner is loaded, then let the store's record of premium override local state.
  useEffect(() => {
    if (!hasUser) {
      return;
    }

    let cancelled = false;

    (async () => {
      await monetizationClient.initialize(monetizationUserId);
      const [premium, prices] = await Promise.all([
        monetizationClient.getPremiumStatus(),
        monetizationClient.getStorePrices(SHOP_ITEMS)
      ]);

      if (cancelled) {
        return;
      }

      setStorePrices(prices);

      if (premium) {
        dispatch({ type: "sync_premium", premium });
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [hasUser, monetizationUserId]);

  useEffect(() => {
    let mounted = true;

    async function load() {
      const fallbackUser = await learningApi.getUser(1001);
      const savedUser = loadSavedUserProfile();
      const savedAccount = loadLocalAuthAccount();
      const remoteSession = await hydrateRemoteSession();
      const baseUser = withExperienceDefaults(ensureLearnerProfile(prepareUserForToday(remoteSession?.user ?? savedUser ?? fallbackUser)));
      // A logged-out account stays on the device for the next log in, but the learner plays as a guest.
      const accountSeed = remoteSession?.account ?? (savedAccount?.signedOut ? undefined : savedAccount);
      const user = accountSeed ? withExperienceDefaults(ensureLearnerProfile(applyAccountIdentity(baseUser, accountSeed))) : baseUser;
      const xpSummary = await learningApi.getXpSummaries(user);
      const knownAccount = remoteSession?.account ?? savedAccount;

      if (mounted) {
        setHasSavedAccount(Boolean(knownAccount));
        setPendingLanguage(normalizeLanguage(user.preferredLanguage));

        if (knownAccount) {
          setAccountName(knownAccount.name);
          setAccountEmail(knownAccount.email);
          setAuthMode("login");
        }

        setSettingsRole(user.accountRole);
        setSettingsDailyReminder(user.reminderPreferences?.dailyInactivity !== false);
        setSettingsWeeklyReminder(user.reminderPreferences?.weeklyInactivity !== false);
        setSettingsStreakReminder(user.reminderPreferences?.streakReminders !== false);
        setSettingsIslamicReminder(user.reminderPreferences?.islamicReminders !== false);
        setSettingsSoundEnabled(user.soundEffectsEnabled !== false);
        setSettingsReducedSound(Boolean(user.reducedSoundEffects));

        if (LANGUAGE_PICKER_ENABLED && !user.preferredLanguage) {
          setLanguageModalVisible(true);
        }

        dispatch({ type: "loaded", user, xpSummary });
      }
    }

    load();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!state.user) {
      return;
    }

    saveUserProfile(state.user);
    void syncRemoteUser(state.user).catch(() => undefined);
  }, [state.user]);


  const currentLanguage = normalizeLanguage(state.user?.preferredLanguage ?? pendingLanguage);
  const strings = useMemo(() => getUiStrings(currentLanguage), [currentLanguage]);
  const learnerProfile = state.user?.learnerProfile ?? createEmptyLearnerProfile();
  const soundPreferences = useMemo(
    () => ({
      enabled: state.user?.soundEffectsEnabled !== false,
      reduced: Boolean(state.user?.reducedSoundEffects)
    }),
    [state.user?.soundEffectsEnabled, state.user?.reducedSoundEffects]
  );

  useEffect(() => {
    // Browsers only allow audio after a user gesture; phones need no unlock.
    if (Platform.OS !== "web" || typeof window === "undefined") {
      return;
    }

    const unlock = () => {
      primeGameAudio(soundPreferences);
    };

    window.addEventListener("pointerdown", unlock, { passive: true });
    window.addEventListener("keydown", unlock);

    return () => {
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
    };
  }, [soundPreferences]);

  useEffect(() => {
    configureUiSound(soundPreferences);
  }, [soundPreferences]);

  function playUiSound(event: "soft_ui" | "node_tap" | "correct" | "wrong" | "xp" | "unlock" | "lesson_complete" | "streak" | "reward_chest") {
    primeGameAudio(event === "soft_ui" && state.user?.soundEffectsEnabled === false
      ? { enabled: false, reduced: soundPreferences.reduced }
      : soundPreferences);
    playGameSound(event, soundPreferences);
  }

  useEffect(() => {
    if (!state.user) {
      return;
    }

    return scheduleIslamicReminderChecks(state.user, currentLanguage);
  }, [
    currentLanguage,
    state.user?.id,
    state.user?.lastLearningAt,
    state.user?.lastLoginAt,
    state.user?.reminderPreferences?.streakReminders,
    state.user?.reminderPreferences?.islamicReminders
  ]);

  const pathNodes = useMemo(() => {
    return state.user ? learningApi.getPathNodes(state.user) : [];
  }, [state.user]);

  const localizedSections = useMemo(() => {
    return COURSE.sections.map((section) => {
      const topicCopy = getTopicCopy(section.topicId, currentLanguage);

      return {
        ...section,
        title: topicCopy.title,
        description: topicCopy.description,
        focus: topicCopy.focus,
        badge: topicCopy.badge
      };
    });
  }, [currentLanguage]);

  const selectedSection = useMemo(() => {
    return localizedSections.find((section) => section.topicId === state.selectedTopic) ?? localizedSections[0];
  }, [localizedSections, state.selectedTopic]);

  const selectedBranch = useMemo(() => {
    return selectedSection.branches.find((branch) => branch.id === state.selectedBranchId) ?? selectedSection.branches[0];
  }, [selectedSection, state.selectedBranchId]);
  // The Learn tab is one path through every branch of the chosen topic.
  const sectionNodes = useMemo(() => {
    return pathNodes
      .filter((node) => node.topicId === selectedSection.topicId)
      .map((node) => ({
        ...node,
        title: getNodeTitle(node.id, node.title, currentLanguage)
      }));
  }, [currentLanguage, pathNodes, selectedSection.topicId]);
  const sectionNextNode = useMemo(() => findNextPlayableNode(sectionNodes), [sectionNodes]);
  // The jump-ahead key sits on the unit of the circle to play next, when its remaining circles
  // give enough questions for a fair test.
  const testOutUnitId = useMemo(() => {
    if (!sectionNextNode) {
      return undefined;
    }

    return canTestOut(getUnitTestOut(sectionNodes, sectionNextNode.branchId).lessons) ? sectionNextNode.branchId : undefined;
  }, [sectionNextNode, sectionNodes]);
  const learnPath = useMemo(() => {
    const units: PathUnit[] = [];
    const chestStops = new Map<string, JourneyRewardStop>();

    if (!state.user) {
      return { units, chestStops };
    }

    const completed = new Set(state.user.completedNodeIds);

    for (const branch of selectedSection.branches) {
      const nodes = sectionNodes.filter((node) => node.branchId === branch.id);

      if (!nodes.length) {
        continue;
      }

      const stops = getJourneyRewardStops(state.user, selectedSection, branch, nodes);
      const items: PathItem[] = [];

      nodes.forEach((node, index) => {
        // A node's own word only: a review circle shows no Arabic rather than its unit's.
        items.push({ kind: "node", node, arabic: getNodeArabic(node.id), lessonNumber: index + 1 });
        // A chest sits right after the node that unlocks it (its id ends with that node's index).
        const stop = stops.find((item) => item.id.endsWith(`_reward_${index}`));

        if (stop) {
          chestStops.set(stop.id, stop);
          items.push({
            kind: "chest",
            chest: { id: stop.id, gemsReward: stop.gemsReward, unlocked: stop.unlocked, claimed: stop.claimed }
          });
        }
      });

      units.push({
        id: branch.id,
        number: units.length + 1,
        title: branch.title,
        arabic: getBranchArabic(branch.id),
        done: nodes.filter((node) => completed.has(node.id)).length,
        total: nodes.length,
        premiumLocked: Boolean(branch.premiumOnly && !state.user.activeSubscriptionId),
        items
      });
    }

    return { units, chestStops };
  }, [sectionNodes, selectedSection, state.user]);
  const pickerTopics = useMemo<TopicPickerTopic[]>(() => {
    const completed = new Set(state.user?.completedNodeIds ?? []);

    return localizedSections.map((section) => ({
      topicId: section.topicId,
      title: section.title,
      accent: section.accentColor,
      arabic: getTopicArabic(section.topicId),
      done: section.nodes.filter((node) => completed.has(node.id)).length,
      total: section.nodes.length
    }));
  }, [localizedSections, state.user?.completedNodeIds]);

  const currentLessonSection = useMemo(() => {
    if (!state.activeSession) {
      return selectedSection;
    }

    const section = localizedSections.find((item) => item.nodes.some((node) => node.id === state.activeSession!.lesson.nodeId));
    return section ?? selectedSection;
  }, [localizedSections, selectedSection, state.activeSession]);

  const currentLessonSession = useMemo(() => {
    if (!state.activeSession) {
      return undefined;
    }

    const localizedLesson = localizeLessonContent(
      {
        ...state.activeSession.lesson,
        title: getNodeTitle(state.activeSession.lesson.nodeId, state.activeSession.lesson.title, currentLanguage)
      },
      currentLanguage
    );

    return {
      ...state.activeSession,
      lesson: localizedLesson
    };
  }, [currentLanguage, state.activeSession]);
  // Only the real ordering games (wudu and salah steps) are worth a step; the generic
  // "pick the best response" and story-arc drills repeat the lesson in other words.
  const currentPracticeActivity = useMemo(
    () => currentLessonSession?.lesson.practiceActivities?.find(isPlayablePractice),
    [currentLessonSession]
  );

  const userStars = useMemo(() => {
    return state.user ? COURSE.sections.reduce((total, item) => total + getSectionStars(state.user!, item), 0) : 0;
  }, [state.user]);
  const { notify, confirm, sheets: noticeSheets, open: noticeOpen } = useNotices({
    mascotVariant: selectedSection.mascot,
    accent: selectedSection.accentColor
  });

  // After a few minutes a guest is asked to make an account, but never in the middle of a lesson
  // or practice: the ask waits until they are back on the Foundation path with nothing else open.
  const guestUser = Boolean(state.user && !state.user.hasAccount);
  useEffect(() => {
    if (!guestUser || accountPromptShown) {
      return;
    }

    const timer = setTimeout(() => setAccountPromptDue(true), 180000);

    return () => {
      clearTimeout(timer);
    };
  }, [accountPromptShown, guestUser]);

  const onFoundationPath =
    (state.screen === "home" || state.screen === "topic" || state.screen === "branch" || state.screen === "review") &&
    selectedSection.topicId === "foundation";
  const otherSheetOpen =
    Boolean(outOfHearts?.open || rewardCelebration || testOutResult?.open) ||
    topicPickerVisible || settingsModalVisible || languageModalVisible || noticeOpen;
  useEffect(() => {
    if (!accountPromptDue || accountPromptShown || !guestUser || !onFoundationPath || otherSheetOpen) {
      return;
    }

    setAccountPromptShown(true);
    setAccountError(undefined);
    setAuthMode(hasSavedAccount ? "login" : "create");
    setAccountModalVisible(true);
  }, [accountPromptDue, accountPromptShown, guestUser, hasSavedAccount, onFoundationPath, otherSheetOpen]);

  function openFoundationAssessment(mode: FoundationAssessmentState["mode"]) {
    if (!state.user) {
      return;
    }

    const hydratedUser = withExperienceDefaults(ensureLearnerProfile({
      ...state.user,
      foundationAssessmentSkipped: mode === "placement" ? false : state.user.foundationAssessmentSkipped
    }));

    if (hydratedUser !== state.user) {
      dispatch({ type: "apply_user", user: hydratedUser });
    }

    setActiveAssessment(createFoundationAssessment(hydratedUser.learnerProfile ?? createEmptyLearnerProfile(), mode));
    dispatch({ type: "open_assessment" });
  }

  function updateAssessmentSelection(value: string | string[] | Record<string, string> | undefined) {
    // Once an answer is checked it stays locked until the learner moves on.
    setActiveAssessment((current) => current && !current.feedback ? { ...current, selectedAnswer: value } : current);
  }

  function submitAssessmentAnswer() {
    if (!state.user || !activeAssessment || activeAssessment.feedback || activeAssessment.selectedAnswer == null) {
      return;
    }

    const result = submitFoundationAssessmentAnswer({
      profile: learnerProfile,
      state: activeAssessment,
      selectedAnswer: activeAssessment.selectedAnswer,
      responseTimeMs: Date.now() - activeAssessment.questionStartedAt
    });
    const gainedXp = getAssessmentXp(activeAssessment.mode, result.feedback.correct);

    dispatch({
      type: "apply_user",
      user: ensureLearnerProfile({
        ...addXp(state.user, gainedXp),
        learnerProfile: result.nextProfile,
        lastLearningAt: new Date().toISOString()
      })
    });
    setActiveAssessment(result.stateWithFeedback);
  }

  function continueAssessment() {
    if (!state.user || !activeAssessment || !activeAssessment.feedback) {
      return;
    }

    const nextState = advanceFoundationAssessment(learnerProfile, activeAssessment);

    if (nextState) {
      setActiveAssessment(nextState);
      return;
    }

    const finalizedProfile = finalizeFoundationAssessment(
      learnerProfile,
      activeAssessment.mode,
      activeAssessment.askedQuestionIds
    );

    dispatch({
      type: "apply_user",
      user: withExperienceDefaults(ensureLearnerProfile({
        ...state.user,
        foundationAssessmentSkipped: activeAssessment.mode === "placement" ? false : state.user.foundationAssessmentSkipped,
        learnerProfile: finalizedProfile,
        lastLearningAt: new Date().toISOString()
      }))
    });
    // The end screen stays on "assessment" until CONTINUE.
    setPracticeResult({ assessment: activeAssessment, profile: finalizedProfile });
    setActiveAssessment(undefined);
  }

  function closeAssessment() {
    setActiveAssessment(undefined);
    setPracticeResult(undefined);
    dispatch({ type: "close_assessment" });
  }

  function toggleSoundEffects() {
    if (!state.user) {
      return;
    }

    const nextUser = withExperienceDefaults({
      ...state.user,
      soundEffectsEnabled: !(state.user.soundEffectsEnabled !== false)
    });

    dispatch({ type: "apply_user", user: nextUser });

    if (nextUser.soundEffectsEnabled) {
      primeGameAudio({ enabled: true, reduced: Boolean(nextUser.reducedSoundEffects) });
      playGameSound("soft_ui", { enabled: true, reduced: Boolean(nextUser.reducedSoundEffects) });
    }
  }

  function openTopicScreen(topicId: TopicId) {
    dispatch({ type: "select_topic", topicId });
  }

  // Out of hearts: the one free refill first, then the shop. In a lesson it opens after GOT IT on
  // the wrong answer, so the learner sees the right answer and the Why? line before the sheet.
  function openOutOfHearts(user: UserProfile, inLesson: boolean, resume?: OutOfHeartsSheet["resume"]) {
    setOutOfHearts({ open: true, variant: shouldOfferReviewHeartRestore(user) ? "free" : "shop", inLesson, resume });
  }

  async function startLesson(node: LearningNodeView, user = state.user) {
    if (!user) {
      return;
    }

    const nodeBranch = COURSE.sections.flatMap((section) => section.branches).find((branch) => branch.id === node.branchId) ?? selectedBranch;

    if (nodeBranch.premiumOnly && !user.activeSubscriptionId) {
      dispatch({ type: "open_shop", focus: "premium" });
      return;
    }

    if (node.status === "locked") {
      void notify("Not yet!", "Finish the circle before it.", { mood: "think" });
      return;
    }

    if (isOutOfHearts(user)) {
      openOutOfHearts(user, false, { kind: "node", node });
      return;
    }

    const activeUser = {
      ...user,
      lastLearningAt: new Date().toISOString()
    };

    dispatch({ type: "apply_user", user: activeUser });
    const session = await learningApi.getLessonSession(node.firstLessonId, activeUser);
    challengeStartedAtRef.current = Date.now();
    dispatch({ type: "start_lesson", session });
  }

  // LearnPath asks "Jump ahead?" first and calls this on START TEST.
  async function startBranchTestOut(branchId: string, user = state.user) {
    if (!user) {
      return;
    }

    const testBranch = selectedSection.branches.find((branch) => branch.id === branchId) ?? selectedBranch;

    if (testBranch.premiumOnly && !user.activeSubscriptionId) {
      dispatch({ type: "open_shop", focus: "premium" });
      return;
    }

    const plan = getUnitTestOut(sectionNodes, testBranch.id);

    if (!canTestOut(plan.lessons)) {
      void notify("Nothing to skip yet.", undefined, { mood: "think" });
      return;
    }

    if (isOutOfHearts(user)) {
      openOutOfHearts(user, false, { kind: "test_out", unitId: testBranch.id });
      return;
    }

    const activeUser = {
      ...user,
      lastLearningAt: new Date().toISOString()
    };

    dispatch({ type: "apply_user", user: activeUser });
    const session = createTestOutSession({
      branchTitle: testBranch.title,
      branchId: testBranch.id,
      lessons: plan.lessons,
      nodeIds: plan.nodeIds,
      heartsAtStart: activeUser.hearts.current
    });

    challengeStartedAtRef.current = Date.now();
    dispatch({ type: "start_lesson", session });
  }

  function answerChallenge() {
    if (!state.user || !state.activeSession || !state.selectedChoiceId || state.answerState) {
      return;
    }

    const challenge = state.activeSession.lesson.challenges[state.challengeIndex];
    const correct = challenge.correctChoiceId === state.selectedChoiceId;
    const responseTimeMs = Math.max(900, Date.now() - challengeStartedAtRef.current);
    const isRetry = state.retryingCurrentChallenge;
    let nextUser = withExperienceDefaults({
      ...state.user,
      lastLearningAt: new Date().toISOString()
    });

    if (!isRetry) {
      const signalNodeId = challenge.sourceNodeId ?? state.activeSession.lesson.nodeId;
      const lessonSignal = buildLessonSignal(signalNodeId, challenge, state.challengeIndex, state.activeSession.lesson.challenges.length, correct, responseTimeMs);
      const nextProfile = applyLessonSignalToLearnerProfile({
        profile: learnerProfile,
        category: lessonSignal.category,
        signalId: lessonSignal.signalId,
        difficulty: lessonSignal.difficulty,
        correct,
        responseTimeMs,
        confidence: correct ? 3 : 2,
        tags: lessonSignal.tags,
        prompt: challenge.prompt,
        reviewNext: lessonSignal.reviewNext
      });
      const heartAdjustedUser = correct ? state.user : loseHeart(state.user);
      nextUser = withExperienceDefaults({
        ...heartAdjustedUser,
        learnerProfile: nextProfile,
        lastLearningAt: new Date().toISOString()
      });
    }

    playUiSound(correct ? "correct" : "wrong");
    dispatch({
      type: "answer",
      correct,
      user: nextUser,
      missedLessonId: correct ? undefined : challenge.sourceLessonId ?? state.activeSession.lesson.id,
      scored: !isRetry,
      retried: isRetry
    });
  }

  function beginLessonQuestions() {
    challengeStartedAtRef.current = Date.now();
    dispatch({ type: "begin_lesson_questions" });
  }

  // Lessons are one learn card, an optional ordering game, then the questions.
  function continueFromTeach() {
    if (currentPracticeActivity) {
      dispatch({ type: "show_practice_screen" });
      return;
    }

    beginLessonQuestions();
  }

  function continueFromFeedback() {
    if (!state.user) {
      return;
    }

    // No hearts left: no free retry and no next question until the learner refills.
    if (isOutOfHearts(state.user)) {
      openOutOfHearts(state.user, true);
      return;
    }

    resumeLesson(state.user);
  }

  function resumeLesson(user: UserProfile) {
    // A missed question comes straight back once, for free, so the right answer sticks.
    if (state.answerState === "wrong" && !state.lastAnswerWasRetry) {
      challengeStartedAtRef.current = Date.now();
      dispatch({ type: "retry_challenge" });
      return;
    }

    void continueLesson(user);
  }

  function speakArabic(text: string) {
    if (state.user?.soundEffectsEnabled === false) {
      return;
    }

    try {
      void Speech.stop();
      Speech.speak(text, { language: "ar", rate: 0.8 });
    } catch {
      // Pronunciation is a bonus; never block the lesson on it.
    }
  }

  function changeTab(tab: TabKey) {
    switch (tab) {
      case "learn":
        dispatch({ type: "show_branch" });
        return;
      case "practice":
        dispatch({ type: "open_review" });
        return;
      case "crew":
        dispatch({ type: "open_social" });
        return;
      case "shop":
        dispatch({ type: "open_shop" });
        return;
      case "me":
        dispatch({ type: "open_profile" });
        return;
    }
  }

  async function continueLesson(user = state.user) {
    if (!user || !state.activeSession) {
      return;
    }

    const lastChallenge = state.challengeIndex >= state.activeSession.lesson.challenges.length - 1;

    if (!lastChallenge) {
      challengeStartedAtRef.current = Date.now();
      dispatch({ type: "next_challenge" });
      return;
    }

    if (state.activeSession.mode === "test_out") {
      const totalChallenges = state.activeSession.lesson.challenges.length;
      const passingScore = state.activeSession.passingScore ?? testOutPassingScore(totalChallenges);
      const passed = state.sessionCorrectCount >= passingScore;

      if (!passed) {
        // A result sheet over the last question: the score, then TRY AGAIN or BACK.
        setTestOutResult({
          open: true,
          correct: state.sessionCorrectCount,
          total: totalChallenges,
          passingScore,
          unitId: state.activeSession.lesson.branchId ?? selectedBranch.id
        });
        return;
      }

      const clusterLessons = (state.activeSession.targetLessonIds ?? [])
        .map((lessonId) => LESSONS_BY_ID[lessonId])
        .filter(Boolean);
      const beforeNodes = learningApi.getPathNodes(user);
      const nextUser = withExperienceDefaults({
        ...completeLessonCluster(user, clusterLessons, state.activeSession.lesson.xpReward),
        lastLearningAt: new Date().toISOString()
      });
      const afterNodes = learningApi.getPathNodes(nextUser);
      const unlockedNode = afterNodes.find((node) => {
        const previous = beforeNodes.find((item) => item.id === node.id);
        // The circle that is now next to play, not one the test just skipped.
        return previous?.status === "locked" && node.status === "current";
      });

      // LessonComplete plays the finish, streak and XP sounds itself.
      setLessonCompleteSummary({
        headline: "You jumped ahead!",
        title: state.activeSession.clusterTitle ?? state.activeSession.lesson.title,
        xp: nextUser.totalXp - user.totalXp,
        streakExtended: didExtendStreak(user, nextUser),
        stars: (state.activeSession.targetNodeIds ?? [])
          .filter((nodeId) => !user.completedNodeIds.includes(nodeId))
          .map((nodeId) => getNodeStarsReward(nodeId))
          .reduce((total, value) => total + value, 0),
        unlockedTitle: unlockedNode ? getNodeTitle(unlockedNode.id, unlockedNode.title, currentLanguage) : undefined,
        streakDays: nextUser.streakDays
      });
      const xpSummary = await learningApi.getXpSummaries(nextUser);
      dispatch({ type: "finish_lesson", user: nextUser, xpSummary });
      maybeShowLessonBreakAd(nextUser);
      return;
    }

    const beforeNodes = learningApi.getPathNodes(user);
    const nextUser = withExperienceDefaults({
      ...completeLesson(user, state.activeSession.lesson),
      lastLearningAt: new Date().toISOString()
    });
    const afterNodes = learningApi.getPathNodes(nextUser);
    const unlockedNode = afterNodes.find((node) => {
      const previous = beforeNodes.find((item) => item.id === node.id);
      return previous?.status === "locked" && node.status === "current";
    });

    // LessonComplete plays the finish, streak and XP sounds itself, one after another.
    setLessonCompleteSummary({
      title: state.activeSession.lesson.title,
      // A replayed lesson earns nothing, so show what was actually added.
      xp: nextUser.totalXp - user.totalXp,
      streakExtended: didExtendStreak(user, nextUser),
      stars: user.completedNodeIds.includes(state.activeSession.lesson.nodeId) ? 0 : getNodeStarsReward(state.activeSession.lesson.nodeId),
      unlockedTitle: unlockedNode ? getNodeTitle(unlockedNode.id, unlockedNode.title, currentLanguage) : undefined,
      streakDays: nextUser.streakDays
    });
    const xpSummary = await learningApi.getXpSummaries(nextUser);
    dispatch({ type: "finish_lesson", user: nextUser, xpSummary });
    maybeShowLessonBreakAd(nextUser);
  }

  // The chest opens at once; its gems land when the learner taps COLLECT, so the top bar ticks up
  // as the pop closes. LearnPath plays the chest sound and answers taps on locked or opened chests.
  // Closing the app mid-pop leaves the chest ready to open again.
  function claimJourneyReward(stop: JourneyRewardStop) {
    if (!state.user || !stop.unlocked || stop.claimed || rewardCelebration) {
      return;
    }

    setRewardCelebration({ stop });
  }

  function collectJourneyReward() {
    const stop = rewardCelebration?.stop;
    setRewardCelebration(undefined);

    if (!stop) {
      return;
    }

    dispatch({
      type: "apply_user_latest",
      update: (user) => (user.claimedRewardIds ?? []).includes(stop.id)
        ? user
        : withExperienceDefaults({
            ...user,
            gems: user.gems + stop.gemsReward,
            claimedRewardIds: [...(user.claimedRewardIds ?? []), stop.id]
          })
    });
  }

  function maybeShowLessonBreakAd(user: UserProfile) {
    lessonsFinishedRef.current += 1;

    if (shouldShowLessonBreakAd(lessonsFinishedRef.current, isPremiumUser(user))) {
      void monetizationClient.showLessonBreakAd();
    }
  }

  async function useShopItem(item: ShopItem) {
    if (!state.user || shopBusy) {
      return;
    }

    if (item.currencyType === "gems") {
      // ShopView shakes a gem item the learner cannot buy yet, so only a real purchase gets here.
      if (canSpendGems(state.user, item)) {
        dispatch({ type: "apply_user", user: applyShopItem(state.user, item) });
      }
      return;
    }

    setShopBusy(true);

    try {
      if (item.type === "rewarded_ad") {
        const reward = await monetizationClient.showRewardedHeartAd(item);

        if (reward.ok) {
          dispatch({ type: "apply_user_latest", update: (user) => grantHearts(user, reward.heartsGranted, true) });
        } else if (reward.message) {
          void notify("No video right now", "Try again later.", { mood: "think" });
        }

        return;
      }

      const purchase = await monetizationClient.purchaseShopItem(item);

      if (purchase.ok) {
        dispatch({ type: "apply_user_latest", update: (user) => applyShopItem(user, item) });
        if (purchase.premium) {
          dispatch({ type: "sync_premium", premium: purchase.premium });
        }
      } else if (!purchase.cancelled && purchase.message) {
        void notify("Not bought", "Try again later.", { mood: "think" });
      }
    } finally {
      setShopBusy(false);
    }
  }

  async function restorePurchases() {
    if (shopBusy) {
      return;
    }

    setShopBusy(true);

    try {
      const result = await monetizationClient.restorePurchases();

      if (result.premium) {
        dispatch({ type: "sync_premium", premium: result.premium });
      }

      void (result.premium?.active
        ? notify("Premium is back!", undefined, { mood: "cheer" })
        : notify("Nothing to restore", undefined, { mood: "think" }));
    } finally {
      setShopBusy(false);
    }
  }

  function savePreferredLanguage(language: SupportedLanguage) {
    if (!state.user) {
      return;
    }

    setPendingLanguage(language);
    if (state.user.hasAccount) {
      updateLocalAuthAccount({ preferredLanguage: language });
    }
    dispatch({
      type: "apply_user",
      user: {
        ...state.user,
        preferredLanguage: language
      }
    });
    setLanguageModalVisible(false);
  }

  // Guests get Settings too: reminders and sound. The sheet hides "who is learning", the family
  // alerts, Log out and Delete account for them.
  function openSettingsModal() {
    if (!state.user) {
      return;
    }

    setSettingsRole(state.user.accountRole);
    setSettingsDailyReminder(state.user.reminderPreferences?.dailyInactivity !== false);
    setSettingsWeeklyReminder(state.user.reminderPreferences?.weeklyInactivity !== false);
    setSettingsStreakReminder(state.user.reminderPreferences?.streakReminders !== false);
    setSettingsIslamicReminder(state.user.reminderPreferences?.islamicReminders !== false);
    setSettingsSoundEnabled(state.user.soundEffectsEnabled !== false);
    setSettingsReducedSound(Boolean(state.user.reducedSoundEffects));
    setSettingsModalVisible(true);
  }

  function openAccountSheet(mode: AuthMode) {
    setAccountError(undefined);
    setAuthMode(mode);
    setAccountModalVisible(true);
  }

  function openAccountPanel() {
    if (state.user?.hasAccount) {
      dispatch({ type: "open_profile" });
      return;
    }

    openAccountSheet(hasSavedAccount ? "login" : "create");
  }

  // Crew needs a server session. An account made offline has none, so it logs in from here.
  function openCrewAccount() {
    if (state.user?.hasAccount) {
      openAccountSheet("login");
      return;
    }

    openAccountPanel();
  }

  async function createAccount() {
    if (!state.user || checkAccountFields("create", accountName, accountEmail, accountPassword)) {
      // AccountSheet shows its own hint for an empty or invalid field.
      return;
    }

    const email = normalizeEmail(accountEmail);
    const savedAccount = loadLocalAuthAccount();

    // This device already holds that account (logged out): log in to get its progress back.
    if (savedAccount && normalizeEmail(savedAccount.email) === email) {
      setAccountError("That email has an account. Log in!");
      return;
    }

    const createdAt = new Date().toISOString();
    const reminderPreferences = defaultReminderPreferences();
    const pendingAccount = {
      name: accountName.trim(),
      email,
      password: accountPassword,
      createdAt,
      reminderPreferences,
      preferredLanguage: state.user.preferredLanguage
    };
    let nextUser: UserProfile = withExperienceDefaults(ensureLearnerProfile(applyAccountIdentity(state.user, pendingAccount)));

    try {
      const remote = await registerRemoteAccount({
        name: pendingAccount.name,
        email: pendingAccount.email,
        password: pendingAccount.password,
        reminderPreferences: pendingAccount.reminderPreferences,
        user: nextUser,
        socialHub: { connections: [], battleHistory: [] }
      });

      nextUser = withExperienceDefaults(ensureLearnerProfile(prepareUserForToday(remote.user)));
    } catch (error) {
      if (error instanceof Error && !isBackendOfflineError(error)) {
        setAccountError(error instanceof BackendRequestError && error.status === 409 ? "That email has an account. Log in!" : "Could not sign up. Try again.");
        return;
      }
    }

    // One account per device: a new one replaces the progress an older account left here.
    clearAccountProfile();
    createLocalAuthAccount(pendingAccount);

    dispatch({
      type: "apply_user",
      user: withExperienceDefaults(ensureLearnerProfile(nextUser))
    });
    setHasSavedAccount(true);
    setAuthMode("login");
    setAccountPromptShown(true);
    setAccountPassword("");
    setAccountError(undefined);
    setAccountModalVisible(false);
    setCrew({ status: "idle" });
    void notify(`Welcome, ${firstName(pendingAccount.name)}!`, "Your progress is saved.", { mood: "cheer" });
  }

  async function loginAccount() {
    if (!state.user || checkAccountFields("login", accountName, accountEmail, accountPassword)) {
      return;
    }

    try {
      const remote = await loginRemoteAccount({
        email: normalizeEmail(accountEmail),
        password: accountPassword
      });

      createLocalAuthAccount({
        name: remote.account.name,
        email: remote.account.email,
        password: accountPassword,
        createdAt: remote.account.createdAt,
        role: remote.account.role,
        reminderPreferences: remote.account.reminderPreferences,
        preferredLanguage: remote.user.preferredLanguage
      });
      // The server copy wins over what this device kept at log out.
      takeAccountProfile(remote.account.email);

      dispatch({
        type: "apply_user",
        user: withExperienceDefaults(ensureLearnerProfile(prepareUserForToday(remote.user)))
      });
      finishLogin(remote.account.name, remote.account.email);
      return;
    } catch (error) {
      if (error instanceof Error && !isBackendOfflineError(error)) {
        setAccountError("Wrong email or password.");
        return;
      }
    }

    const account = loginLocalAuthAccount(accountEmail, accountPassword);

    if (!account) {
      setAccountError("Wrong email or password.");
      return;
    }

    // Progress this account left on the device when it logged out comes back with it.
    const savedProgress = takeAccountProfile(account.email);
    const baseUser = savedProgress ? prepareUserForToday(savedProgress) : state.user;

    dispatch({
      type: "apply_user",
      user: withExperienceDefaults(ensureLearnerProfile(applyAccountIdentity(baseUser, account)))
    });
    finishLogin(account.name, account.email);
  }

  function finishLogin(name: string, email: string) {
    setAccountName(name);
    setAccountEmail(email);
    setHasSavedAccount(true);
    setAccountPromptShown(true);
    setAccountPassword("");
    setAccountError(undefined);
    setAccountModalVisible(false);
    setCrew({ status: "idle" });
    void notify(`Welcome back, ${firstName(name)}!`, undefined, { mood: "cheer" });
  }

  async function saveAccountSettings() {
    if (!state.user) {
      return;
    }

    const reminderPreferences = {
      dailyInactivity: settingsRole ? settingsDailyReminder : false,
      weeklyInactivity: settingsRole ? settingsWeeklyReminder : false,
      streakReminders: settingsStreakReminder,
      islamicReminders: settingsIslamicReminder
    };

    const nextUser: UserProfile = {
      ...state.user,
      accountRole: settingsRole,
      reminderPreferences,
      soundEffectsEnabled: settingsSoundEnabled,
      reducedSoundEffects: settingsReducedSound
    };

    if (state.user.hasAccount) {
      updateLocalAuthAccount({
        role: settingsRole,
        reminderPreferences,
        preferredLanguage: nextUser.preferredLanguage
      });
    }
    dispatch({ type: "apply_user", user: nextUser });
    setSettingsModalVisible(false);

    if (settingsStreakReminder || settingsIslamicReminder) {
      await requestIslamicNotificationPermission();
    }
  }

  // Log out ends the session only. The account and its progress stay on this device, so logging
  // back in brings them back even when there is no server.
  async function logoutAccount() {
    if (!state.user) {
      return;
    }

    const leaving = state.user;

    if (!(await confirm("Log out?", undefined, "Log out", { cancelLabel: "Stay" }))) {
      return;
    }

    if (leaving.accountEmail) {
      stashAccountProfile(leaving.accountEmail, leaving);
    }
    signOutLocalAuthAccount();

    const fallbackUser = await learningApi.getUser(1001);
    const guestUser = withExperienceDefaults(ensureLearnerProfile(refillHeartsForToday({
      ...fallbackUser,
      preferredLanguage: leaving.preferredLanguage ?? DEFAULT_LANGUAGE,
      soundEffectsEnabled: leaving.soundEffectsEnabled !== false,
      reducedSoundEffects: Boolean(leaving.reducedSoundEffects)
    })));

    try {
      await logoutRemoteAccount();
    } catch {
      // Best effort is enough here because the session token is cleared either way.
    }

    resetToGuest(guestUser, false);
    void notify("Logged out", "Log in to pick up again.", { mood: "wave" });
  }

  async function deleteAccount() {
    if (!state.user) {
      return;
    }

    const leaving = state.user;

    if (!(await confirm("Delete account?", "This cannot be undone.", "Delete"))) {
      return;
    }

    if (getSessionToken()) {
      try {
        await deleteRemoteAccount();
      } catch (error) {
        void (error instanceof Error && isBackendOfflineError(error)
          ? notify("No internet. Try again.", undefined, { mood: "sad" })
          : notify("Could not delete it", "Try again later.", { mood: "sad" }));
        return;
      }
    }

    const fallbackUser = await learningApi.getUser(1001);
    resetToGuest(withExperienceDefaults(ensureLearnerProfile(refillHeartsForToday({
      ...fallbackUser,
      preferredLanguage: leaving.preferredLanguage ?? DEFAULT_LANGUAGE
    }))), true);
    void notify("Account deleted", undefined, { mood: "sad" });
  }

  // `forget` (Delete account) also removes the account and the progress it left on this device.
  function resetToGuest(guestUser: UserProfile, forget: boolean) {
    if (forget) {
      clearLocalAuthAccount();
      clearAccountProfile();
    }
    clearSocialHubState();
    clearSavedUserProfile();
    setCrew({ status: "idle" });
    setHasSavedAccount(!forget);
    setAccountPromptShown(false);
    setAccountPromptDue(false);
    if (forget) {
      setAccountName("");
      setAccountEmail("");
    }
    setAccountPassword("");
    setAccountError(undefined);
    setAuthMode(forget ? "create" : "login");
    setSettingsRole(undefined);
    setSettingsDailyReminder(true);
    setSettingsWeeklyReminder(true);
    setSettingsStreakReminder(true);
    setSettingsIslamicReminder(true);
    setSettingsSoundEnabled(guestUser.soundEffectsEnabled !== false);
    setSettingsReducedSound(Boolean(guestUser.reducedSoundEffects));
    setOutOfHearts(undefined);
    setSettingsModalVisible(false);
    dispatch({ type: "apply_user", user: guestUser });
  }

  // Only switched-on providers get a button; their sign-in flow is not built yet.
  function handleSocialLogin(_provider: SocialProvider) {
    void notify("Coming soon!", undefined, { mood: "think" });
  }

  async function loadCrew() {
    if (!state.user?.hasAccount) {
      setCrew({ status: "signed_out" });
      return;
    }

    // No crew server in this build: CrewView says "coming soon" instead of a retry that can't work.
    if (!isBackendConfigured()) {
      return;
    }

    if (!getSessionToken()) {
      setCrew({ status: "signed_out" });
      return;
    }

    setCrew((current) => ({ ...current, status: "loading" }));

    try {
      const payload = await fetchCrew(localDateKey());
      setCrew({ status: "ready", payload });
    } catch (error) {
      setCrew({
        status: "error",
        message: error instanceof Error && !isBackendOfflineError(error)
          ? error.message
          : "Your crew needs an internet connection. Check your connection and try again."
      });
    }
  }

  async function addCrewFriend() {
    if (!isValidEmail(inviteEmail)) {
      void notify("Check the email", undefined, { mood: "think" });
      return;
    }

    try {
      const member = await addCrewMember({ email: normalizeEmail(inviteEmail), relation: inviteRelation, today: localDateKey() });
      setCrew((current) => current.status === "ready"
        ? { ...current, payload: { ...current.payload, friends: [...current.payload.friends, member] } }
        : current);
      setInviteEmail("");
      setInviteRelation("friend");
    } catch (error) {
      void notify(crewErrorTitle(error, "add"), undefined, { mood: "sad" });
    }
  }

  // CrewView asks "Remove X?" in the friend sheet before calling this.
  async function removeCrewFriend(member: CrewMember) {
    try {
      await removeCrewMember(member.id);
      setCrew((current) => current.status === "ready"
        ? { ...current, payload: { ...current.payload, friends: current.payload.friends.filter((item) => item.id !== member.id) } }
        : current);
    } catch (error) {
      void notify(crewErrorTitle(error, "remove"), undefined, { mood: "sad" });
    }
  }

  // REFILL HEARTS: RefillSheet fills the hearts on screen first, then calls this.
  function claimReviewHeartRestore() {
    if (!state.user) {
      return;
    }

    const sheet = outOfHearts;
    const refilled = grantHearts({ ...state.user, reviewHeartRestoreUsed: true }, state.user.hearts.max, true);

    dispatch({ type: "apply_user", user: refilled });
    setOutOfHearts((current) => current && { ...current, open: false });

    if (sheet?.inLesson && state.screen === "lesson_feedback") {
      resumeLesson(refilled);
    } else if (sheet?.resume?.kind === "node") {
      void startLesson(sheet.resume.node, refilled);
    } else if (sheet?.resume?.kind === "test_out") {
      void startBranchTestOut(sheet.resume.unitId, refilled);
    }
  }

  // SHOP / GET HEARTS: a running lesson ends first, so the shop is a plain tab again.
  function openShopForHearts() {
    const sheet = outOfHearts;
    setOutOfHearts((current) => current && { ...current, open: false });

    if (sheet?.inLesson) {
      void Speech.stop();
      dispatch({ type: "reset_lesson" });
    }

    dispatch({ type: "open_shop" });
  }

  // END LESSON (or NOT NOW on the path).
  function closeOutOfHearts() {
    const sheet = outOfHearts;
    setOutOfHearts((current) => current && { ...current, open: false });

    if (sheet?.inLesson) {
      void Speech.stop();
      dispatch({ type: "reset_lesson" });
    }
  }

  function closeTestOutResult(again: boolean) {
    const result = testOutResult;
    setTestOutResult((current) => current && { ...current, open: false });
    dispatch({ type: "reset_lesson" });

    if (again && result) {
      void startBranchTestOut(result.unitId);
    }
  }


  if (state.loading || !state.user) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.centerPane}>
          <Mascot variant="hijabi" mood="wave" size={110} />
          <Text style={styles.loadingText}>{strings.loadingPath}</Text>
        </View>
      </SafeAreaView>
    );
  }

  const inLesson = state.screen.startsWith("lesson_") || state.screen === "assessment";
  const enabledSocialProviders = (Object.entries(SOCIAL_AUTH_CONFIG) as [SocialProvider, typeof SOCIAL_AUTH_CONFIG[SocialProvider]][])
    .filter(([, config]) => config.enabled)
    .map(([id, config]) => ({ id, label: config.label }));
  const activeTab = tabForScreen(state.screen);
  // With no hearts left the complete screen offers CONTINUE (back to the path), never a NEXT LESSON
  // that could not start.
  const nextLessonNode = sectionNextNode && sectionNextNode.status !== "locked" && !isOutOfHearts(state.user) ? sectionNextNode : undefined;
  const lessonSession = currentLessonSession;
  const lesson = lessonSession?.lesson;
  const lessonAccent = currentLessonSection.accentColor;
  const lessonMascot = currentLessonSection.mascot;
  const lessonArabic = lesson ? getLessonArabic(lesson.nodeId, lesson.branchId ?? findNodeById(lesson.nodeId)?.branchId) : undefined;
  const lessonSource = lesson?.sources[0];
  const challenge = lesson?.challenges[state.challengeIndex];
  const correctLabel = challenge?.choices.find((choice) => choice.id === challenge.correctChoiceId)?.label ?? "";
  const lessonProgress = getLessonProgress({
    screen: state.screen,
    hasTeach: lessonSession?.mode !== "test_out",
    hasPractice: Boolean(currentPracticeActivity),
    challengeIndex: state.challengeIndex,
    challengeCount: lesson?.challenges.length ?? 1,
    answeredCorrectly: state.answerState === "correct"
  });
  const lessonHearts = {
    current: state.user.hearts.current,
    max: state.user.hearts.max,
    unlimited: Boolean(state.user.hearts.unlimited)
  };
  // GOT IT / CONTINUE on the last answer ends the lesson: LessonComplete's fanfare is its sound.
  const continueEndsLesson =
    state.screen === "lesson_feedback" &&
    Boolean(lesson) &&
    state.challengeIndex >= (lesson?.challenges.length ?? 0) - 1 &&
    (state.answerState === "correct" || state.lastAnswerWasRetry) &&
    !isOutOfHearts(state.user);
  const quitSheet = (
    <QuitSheet
      visible={quitLessonVisible}
      mascotVariant={lessonMascot}
      accent={lessonAccent}
      onKeepLearning={() => setQuitLessonVisible(false)}
      onQuit={() => {
        setQuitLessonVisible(false);
        void Speech.stop();
        dispatch({ type: "reset_lesson" });
      }}
    />
  );
  const lessonShell = (children: React.ReactNode) => (
    <LessonScreen
      progress={lessonProgress}
      hearts={lessonHearts}
      onClose={() => setQuitLessonVisible(true)}
      overlay={quitSheet}
    >
      {children}
    </LessonScreen>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      {/* Sheets and pops draw in the host's top layer, over the top bar and tabs too. */}
      <PortalHost style={styles.appShell}>
        {!inLesson && (
          <AppTopBar
            topicId={selectedSection.topicId}
            topicTitle={selectedSection.title}
            accent={selectedSection.accentColor}
            streakDays={state.user.streakDays}
            gems={state.user.gems}
            hearts={lessonHearts}
            onOpenTopics={() => setTopicPickerVisible(true)}
            onOpenShop={() => dispatch({ type: "open_shop" })}
          />
        )}
        {activeTab === "learn" && !inLesson && (
          <LearnPath
            accent={selectedSection.accentColor}
            topicId={selectedSection.topicId}
            mascotVariant={selectedSection.mascot}
            units={learnPath.units}
            xpForNode={(node) => node.xpReward}
            onStartNode={(node) => void startLesson(node)}
            onClaimChest={(chest) => {
              const stop = learnPath.chestStops.get(chest.id);

              if (stop) {
                claimJourneyReward(stop);
              }
            }}
            onTestOut={testOutUnitId ? (unitId) => void startBranchTestOut(unitId) : undefined}
            onPremium={() => dispatch({ type: "open_shop", focus: "premium" })}
            onNextTopic={() => setTopicPickerVisible(true)}
          />
        )}
        {state.screen === "lesson_teach" && lesson && lessonShell(
          <LearnCard
            key={lesson.id}
            title={lesson.title}
            line={getLessonLine(lesson)}
            arabic={lessonArabic}
            mascotVariant={lessonMascot}
            accent={lessonAccent}
            source={lessonSource ? { label: lessonSource.reference ?? lessonSource.title, url: lessonSource.url } : undefined}
            onOpenSource={(url) => void Linking.openURL(url).catch(() => undefined)}
            onPlayAudio={lessonArabic ? () => speakArabic(lessonArabic.ar) : undefined}
            onContinue={continueFromTeach}
          />
        )}
        {state.screen === "lesson_practice" && currentPracticeActivity && lessonShell(
          <OrderGame
            key={currentPracticeActivity.id}
            title={currentPracticeActivity.title}
            options={currentPracticeActivity.options}
            correctOrderIds={currentPracticeActivity.correctOrderIds ?? currentPracticeActivity.options.map((option) => option.id)}
            mascotVariant={lessonMascot}
            accent={lessonAccent}
            onDone={beginLessonQuestions}
          />
        )}
        {(state.screen === "lesson_question" || state.screen === "lesson_feedback") && challenge && lessonShell(
          <ExerciseView
            key={`${challenge.id}-${state.retryingCurrentChallenge || state.lastAnswerWasRetry ? "retry" : "first"}`}
            kind={challenge.type}
            prompt={challenge.prompt}
            choices={challenge.choices}
            selectedChoiceId={state.selectedChoiceId}
            correctChoiceId={challenge.correctChoiceId}
            result={state.screen === "lesson_feedback"
              ? {
                  correct: state.answerState === "correct",
                  correctLabel,
                  why: shortWhy({
                    explanation: challenge.explanation,
                    easierExplanation: challenge.easierExplanation,
                    prompt: challenge.prompt,
                    correctLabel
                  })
                }
              : undefined}
            retrying={state.retryingCurrentChallenge}
            mascotVariant={lessonMascot}
            accent={lessonAccent}
            praiseSeed={challenge.id}
            playSound={false}
            continueSound={continueEndsLesson ? false : undefined}
            onSelect={(choiceId) => dispatch({ type: "select_choice", choiceId })}
            onCheck={answerChallenge}
            onContinue={continueFromFeedback}
          />
        )}
        {state.screen === "lesson_complete" && lessonCompleteSummary && (
          <LessonComplete
            headline={lessonCompleteSummary.headline}
            title={lessonCompleteSummary.title}
            xp={lessonCompleteSummary.xp}
            stars={lessonCompleteSummary.stars}
            streakDays={lessonCompleteSummary.streakDays}
            streakExtended={lessonCompleteSummary.streakExtended}
            goal={{ xpToday: getXpToday(state.user), goalXp: state.user.dailyGoalXp }}
            unlockedTitle={lessonCompleteSummary.unlockedTitle}
            gemsReward={lessonCompleteSummary.gemsReward}
            mascotVariant={lessonMascot}
            accent={lessonAccent}
            nextTitle={nextLessonNode?.title}
            onContinue={() => {
              setLessonCompleteSummary(undefined);
              if (nextLessonNode) {
                void startLesson(nextLessonNode);
                return;
              }
              dispatch({ type: "close_lesson_complete" });
            }}
            onBackToPath={() => {
              setLessonCompleteSummary(undefined);
              dispatch({ type: "close_lesson_complete" });
            }}
          />
        )}
        {state.screen === "assessment" && activeAssessment && (
          <FoundationAssessmentScreen
            assessment={activeAssessment}
            language={currentLanguage}
            selectedAnswer={activeAssessment.selectedAnswer}
            mascotVariant={selectedSection.mascot}
            onChangeSelectedAnswer={updateAssessmentSelection}
            onSubmit={submitAssessmentAnswer}
            onContinue={continueAssessment}
            onExit={closeAssessment}
          />
        )}
        {/* Practice keeps its own gem-blue mascot on every screen (hub, questions, end), so no topic accent. */}
        {state.screen === "assessment" && !activeAssessment && practiceResult && (
          <PracticeComplete
            assessment={practiceResult.assessment}
            learnerProfile={practiceResult.profile}
            mascotVariant={selectedSection.mascot}
            onContinue={closeAssessment}
          />
        )}
        {state.screen === "review" && (
          <PracticeHub
            user={state.user}
            learnerProfile={learnerProfile}
            language={currentLanguage}
            strings={strings}
            mascotVariant={selectedSection.mascot}
            onStartPlacement={() => openFoundationAssessment("placement")}
            onStartReview={() => openFoundationAssessment("review")}
            onStartDailyChallenge={() => openFoundationAssessment("daily_challenge")}
            onGoFoundation={() => openTopicScreen("foundation")}
          />
        )}
        {state.screen === "profile" && (
          <ProfileView
            user={state.user}
            strings={strings}
            learnerProfile={learnerProfile}
            stars={userStars}
            accent={selectedSection.accentColor}
            mascotVariant={selectedSection.mascot}
            soundEnabled={state.user.soundEffectsEnabled !== false}
            onToggleSound={toggleSoundEffects}
            onOpenSettings={openSettingsModal}
            onCreateAccount={() => openAccountPanel()}
          />
        )}
        {state.screen === "shop" && (
          <ShopView
            user={state.user}
            strings={strings}
            items={SHOP_ITEMS}
            storePrices={storePrices}
            busy={shopBusy}
            section={selectedSection}
            focus={state.shopFocus}
            onUseItem={useShopItem}
            onRestore={restorePurchases}
          />
        )}
        {state.screen === "social" && (
          <CrewView
            user={state.user}
            crew={crew}
            inviteEmail={inviteEmail}
            inviteRelation={inviteRelation}
            mascotVariant={selectedSection.mascot}
            accent={selectedSection.accentColor}
            unavailable={!isBackendConfigured()}
            onChangeInviteEmail={setInviteEmail}
            onChangeInviteRelation={setInviteRelation}
            onAddFriend={addCrewFriend}
            onRemoveFriend={removeCrewFriend}
            onRefresh={loadCrew}
            onCreateAccount={openCrewAccount}
          />
        )}
        <AdBanner hidden={isPremiumUser(state.user) || state.user.hearts.unlimited || inLesson} />
        {!inLesson && <BottomTabs active={activeTab} onChange={changeTab} />}
        {!inLesson && (
          <TopicPicker
            visible={topicPickerVisible}
            onClose={() => setTopicPickerVisible(false)}
            topics={pickerTopics}
            activeTopicId={selectedSection.topicId}
            onSelect={(topicId) => dispatch({ type: "select_topic", topicId: topicId as TopicId })}
          />
        )}
        <AccountSheet
          visible={accountModalVisible}
          mode={authMode}
          mascotVariant={selectedSection.mascot}
          accent={selectedSection.accentColor}
          name={accountName}
          email={accountEmail}
          password={accountPassword}
          socialProviders={enabledSocialProviders}
          error={accountError}
          onChangeMode={(mode) => {
            setAccountError(undefined);
            setAuthMode(mode);
          }}
          onChangeName={setAccountName}
          onChangeEmail={setAccountEmail}
          onChangePassword={setAccountPassword}
          onSubmit={authMode === "create" ? createAccount : loginAccount}
          onSocial={(provider: string) => handleSocialLogin(provider as SocialProvider)}
          onClose={() => setAccountModalVisible(false)}
        />
        <SettingsSheet
          visible={settingsModalVisible}
          role={settingsRole}
          streakReminder={settingsStreakReminder}
          islamicReminder={settingsIslamicReminder}
          dailyCheckIn={settingsDailyReminder}
          weeklyCheckIn={settingsWeeklyReminder}
          soundEnabled={settingsSoundEnabled}
          softSound={settingsReducedSound}
          onSelectRole={setSettingsRole}
          onToggleStreak={() => setSettingsStreakReminder((value) => !value)}
          onToggleIslamic={() => setSettingsIslamicReminder((value) => !value)}
          onToggleDaily={() => setSettingsDailyReminder((value) => !value)}
          onToggleWeekly={() => setSettingsWeeklyReminder((value) => !value)}
          onToggleSound={() => setSettingsSoundEnabled((value) => !value)}
          onToggleSoftSound={() => setSettingsReducedSound((value) => !value)}
          onSave={saveAccountSettings}
          onClose={() => setSettingsModalVisible(false)}
          onLogout={logoutAccount}
          onDeleteAccount={state.user.hasAccount ? deleteAccount : undefined}
          guest={!state.user.hasAccount}
        />
        <RefillSheet
          visible={Boolean(outOfHearts?.open)}
          variant={outOfHearts?.variant}
          maxHearts={state.user.hearts.max}
          mascotVariant={inLesson ? lessonMascot : selectedSection.mascot}
          accent={inLesson ? lessonAccent : selectedSection.accentColor}
          endLabel={outOfHearts?.inLesson === false ? "Not now" : undefined}
          onRefill={claimReviewHeartRestore}
          onShop={openShopForHearts}
          onEndLesson={closeOutOfHearts}
        />
        <ConfirmSheet
          visible={Boolean(testOutResult?.open)}
          title={`${testOutResult?.correct ?? 0} of ${testOutResult?.total ?? 0} right`}
          line={`Get ${testOutResult?.passingScore ?? 0} to jump ahead.`}
          confirmLabel="Try again"
          cancelLabel="Back"
          danger={false}
          mood="sad"
          mascotVariant={lessonMascot}
          accent={lessonAccent}
          onConfirm={() => closeTestOutResult(true)}
          onCancel={() => closeTestOutResult(false)}
          testID="test-out-result"
        />
        <RewardPop
          visible={Boolean(rewardCelebration)}
          gems={rewardCelebration?.stop.gemsReward ?? 0}
          onClose={collectJourneyReward}
        />
        <LanguageSheet
          visible={languageModalVisible}
          options={LANGUAGE_OPTIONS}
          selected={pendingLanguage}
          canClose={Boolean(state.user.preferredLanguage)}
          onSelect={(language: string) => setPendingLanguage(language as SupportedLanguage)}
          onSave={() => savePreferredLanguage(pendingLanguage)}
          onClose={() => setLanguageModalVisible(false)}
        />
        {noticeSheets}
      </PortalHost>
    </SafeAreaView>
  );
}

function shouldOfferReviewHeartRestore(user: UserProfile) {
  return !user.hearts.unlimited && user.hearts.current === 0 && !user.reviewHeartRestoreUsed;
}

function defaultReminderPreferences(): ReminderPreferences {
  return {
    dailyInactivity: true,
    weeklyInactivity: true,
    streakReminders: true,
    islamicReminders: true
  };
}

function applyAccountIdentity(
  user: UserProfile,
  account: {
    name: string;
    email: string;
    createdAt: string;
    role?: AccountRole;
    provider?: UserProfile["accountProvider"];
    reminderPreferences?: ReminderPreferences;
    preferredLanguage?: SupportedLanguage;
  }
) {
  return {
    ...user,
    hasAccount: true,
    displayName: account.name.trim(),
    username: normalizeEmail(account.email).split("@")[0] || user.username,
    avatarInitials: getInitials(account.name),
    accountRole: account.role ?? user.accountRole,
    accountProvider: account.provider ?? user.accountProvider,
    accountEmail: normalizeEmail(account.email),
    accountCreatedAt: account.createdAt,
    lastLoginAt: new Date().toISOString(),
    reminderPreferences: account.reminderPreferences ?? user.reminderPreferences ?? defaultReminderPreferences(),
    preferredLanguage: account.preferredLanguage ?? user.preferredLanguage ?? DEFAULT_LANGUAGE
  };
}

function getInitials(name: string) {
  return (
    name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() ?? "")
      .join("") || "SP"
  );
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizeEmail(email));
}

function firstName(name: string) {
  return name.trim().split(/\s+/)[0] || name.trim();
}

// Short titles for the crew notices; the server's own sentences are written for grown-ups.
function crewErrorTitle(error: unknown, action: "add" | "remove") {
  if (error instanceof BackendRequestError && error.status < 500) {
    if (action === "add" && error.status === 404) {
      return "No account with that email";
    }

    if (action === "add" && error.status === 400) {
      return "That's you!";
    }

    if (action === "add" && error.status === 409) {
      return "Already in your crew";
    }

    return action === "add" ? "Could not add them" : "Could not remove them";
  }

  return "No internet. Try again.";
}

function isBackendOfflineError(error: Error) {
  // A server that answered with a 4xx has a real message for the learner; anything else means "keep going offline".
  if (error instanceof BackendRequestError) {
    return error.status >= 500;
  }

  return /fetch|network|timed out|load failed/i.test(error.message);
}

function getSectionStars(user: UserProfile, section: LearningSection) {
  const completed = new Set(user.completedNodeIds);

  return section.nodes.reduce((total, node) => {
    return total + (completed.has(node.id) ? node.starsReward : 0);
  }, 0);
}

function getNodeStarsReward(nodeId: string) {
  for (const section of COURSE.sections) {
    const node = section.nodes.find((item) => item.id === nodeId);

    if (node) {
      return node.starsReward;
    }
  }

  return 1;
}

function buildLessonSignal(
  nodeId: string,
  challenge: Challenge,
  challengeIndex: number,
  totalChallenges: number,
  correct: boolean,
  responseTimeMs: number
) {
  const node = findNodeById(nodeId);
  const branchNodes = node
    ? COURSE.sections
        .flatMap((section) => section.nodes)
        .filter((item) => item.topicId === node.topicId && item.branchId === node.branchId)
    : [];
  const nodePosition = Math.max(0, branchNodes.findIndex((item) => item.id === nodeId));
  const baseDifficulty = (node?.difficulty ?? Math.max(1, Math.min(5, Math.ceil(((nodePosition + 1) / Math.max(1, branchNodes.length)) * 4)))) as 1 | 2 | 3 | 4 | 5;
  const boostedDifficulty = Math.min(5, baseDifficulty + (challengeIndex >= Math.max(1, totalChallenges - 2) ? 1 : 0)) as 1 | 2 | 3 | 4 | 5;
  const difficulty = node?.kind === "review" ? (Math.min(5, boostedDifficulty + 1) as 1 | 2 | 3 | 4 | 5) : boostedDifficulty;
  const category = mapTopicToFoundationCategory(node?.topicId, node?.branchId);
  const tags = unique([
    node?.title ?? "lesson",
    node?.branchId?.replace(/-/g, " ") ?? category,
    challenge.prompt.split(" ").slice(0, 3).join(" ")
  ]).slice(0, 5);

  return {
    category,
    difficulty,
    signalId: `${nodeId}_${challenge.id}`,
    tags,
    reviewNext: node?.title ?? "Review this lesson",
    responseTimeMs,
    correct
  };
}

function mapTopicToFoundationCategory(topicId?: TopicId, branchId?: string): FoundationCategoryId {
  if (topicId === "prayer") {
    return branchId?.includes("wudu") || branchId?.includes("taharah") ? "taharah" : "salah";
  }

  if (topicId === "aqidah") {
    return "iman";
  }

  if (topicId === "fasting") {
    return "fasting";
  }

  if (topicId === "zakat") {
    return "zakat";
  }

  if (topicId === "hajj") {
    return "hajj";
  }

  if (topicId === "quran_tafseer") {
    return "quran";
  }

  if (topicId === "prophets" || topicId === "women_of_the_book" || topicId === "sahabah") {
    return "seerah";
  }

  if (topicId === "foundation" || topicId === "manners" || topicId === "marriage") {
    return "manners";
  }

  return "iman";
}

function findNodeById(nodeId: string) {
  for (const section of COURSE.sections) {
    const node = section.nodes.find((item) => item.id === nodeId);

    if (node) {
      return node;
    }
  }

  return undefined;
}

// A unit's test-out covers every circle still to do in it, locked ones too: jumping past them is the point.
function getUnitTestOut(nodes: LearningNodeView[], branchId: string) {
  const remaining = nodes.filter((node) => node.branchId === branchId && node.status !== "completed");

  return {
    nodeIds: remaining.map((node) => node.id),
    lessons: remaining.flatMap((node) => node.lessonIds).map((lessonId) => LESSONS_BY_ID[lessonId]).filter(Boolean)
  };
}

function withExperienceDefaults(user: UserProfile): UserProfile {
  return {
    ...user,
    foundationAssessmentSkipped: Boolean(user.foundationAssessmentSkipped),
    soundEffectsEnabled: user.soundEffectsEnabled !== false,
    reducedSoundEffects: Boolean(user.reducedSoundEffects),
    claimedRewardIds: Array.isArray(user.claimedRewardIds) ? user.claimedRewardIds : []
  };
}

function getJourneyRewardStops(user: UserProfile, section: LearningSection, branch: LearningBranch, nodes: LearningNodeView[]): JourneyRewardStop[] {
  const completed = new Set(user.completedNodeIds);
  const claimed = new Set(user.claimedRewardIds ?? []);
  const rewardStride = nodes.length > 14 ? 5 : nodes.length > 8 ? 4 : 2;
  const last = nodes.length - 1;

  return nodes
    .map((node, index) => {
      // A chest every few circles and one at the end, with at least two circles between any two chests.
      if (index !== last && ((index + 1) % rewardStride !== 0 || last - index < 2)) {
        return null;
      }

      const rewardId = `${section.id}_${branch.id}_reward_${index}`;
      const unlockNodeIds = nodes.slice(0, index + 1).map((item) => item.id);
      const unlocked = unlockNodeIds.every((nodeId) => completed.has(nodeId));

      return {
        id: rewardId,
        title: index === nodes.length - 1 ? "Branch treasure" : "Reward chest",
        copy: index === nodes.length - 1 ? "A tidy little gem drop for finishing this stretch of the path." : "Open this after clearing the path up to here.",
        gemsReward: index === nodes.length - 1 ? 25 : 12,
        unlocked,
        claimed: claimed.has(rewardId)
      };
    })
    .filter(Boolean) as JourneyRewardStop[];
}

function unique<T>(items: T[]) {
  return Array.from(new Set(items));
}


const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.snow },
  appShell: { flex: 1, backgroundColor: colors.snow },
  centerPane: { flex: 1, alignItems: "center", justifyContent: "center", gap: 12, padding: 24 },
  loadingText: { fontFamily: fonts.displayHeavy, fontSize: 20, color: colors.inkSoft }
});
