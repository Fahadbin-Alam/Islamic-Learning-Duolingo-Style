import React, { useEffect, useMemo, useReducer, useRef, useState } from "react";
import {
  Alert,
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
  completeLesson,
  addXp,
  localDateKey,
  completeLessonCluster,
  createTestOutSession,
  didExtendStreak,
  getAssessmentXp,
  getXpToday,
  isOutOfHeartsAfterAnswer,
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
  updateLocalAuthAccount
} from "./services/localAuth";
import {
  BackendRequestError,
  deleteRemoteAccount,
  getSessionToken,
  hydrateRemoteSession,
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
import { clearSavedUserProfile, loadSavedUserProfile, saveUserProfile } from "./services/localProgress";
import { AdBanner } from "./components/AdBanner";
import { monetizationClient } from "./services/monetization";
import { shouldShowLessonBreakAd } from "./services/monetizationConfig";
import { clearSocialHubState } from "./services/socialHub";
import {
  requestIslamicNotificationPermission,
  scheduleIslamicReminderChecks
} from "./services/islamicNotifications";
import {
  FoundationAssessmentScreen
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
import {
  AccountSheet,
  AppTopBar,
  BottomTabs,
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
  type PathItem,
  type PathUnit,
  type TabKey,
  type TopicPickerTopic
} from "./ui/screens";
import { ExerciseView, LearnCard, LessonComplete, LessonScreen, OrderGame, QuitSheet, getLessonLine, getLessonProgress, isPlayablePractice, shortWhy } from "./ui/lesson";
import { getBranchArabic, getLessonArabic, getTopicArabic } from "./data/arabicTerms";
import type {
  AccountRole,
  Challenge,
  FoundationAssessmentState,
  FoundationCategoryId,
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

type LessonCelebration = {
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
  | { type: "open_shop" }
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
      return { ...state, returnScreen: state.screen, screen: "shop" };
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
  const [reviewRestoreVisible, setReviewRestoreVisible] = useState(false);
  const [languageModalVisible, setLanguageModalVisible] = useState(false);
  const [accountPromptShown, setAccountPromptShown] = useState(false);
  const [settingsModalVisible, setSettingsModalVisible] = useState(false);
  const [activeAssessment, setActiveAssessment] = useState<FoundationAssessmentState | undefined>(undefined);
  const [authMode, setAuthMode] = useState<AuthMode>("create");
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
  const [rewardCelebration, setRewardCelebration] = useState<LessonCelebration | undefined>(undefined);
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
      const accountSeed = remoteSession?.account ?? savedAccount;
      const user = accountSeed ? withExperienceDefaults(ensureLearnerProfile(applyAccountIdentity(baseUser, accountSeed))) : baseUser;
      const xpSummary = await learningApi.getXpSummaries(user);

      if (mounted) {
        setHasSavedAccount(Boolean(accountSeed));
        setPendingLanguage(normalizeLanguage(user.preferredLanguage));

        if (accountSeed) {
          setAccountName(accountSeed.name);
          setAccountEmail(accountSeed.email);
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
  const sectionNextNode = useMemo(
    () => sectionNodes.find((node) => node.status === "current") ?? sectionNodes.find((node) => node.status === "available"),
    [sectionNodes]
  );
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
        items.push({ kind: "node", node, arabic: getLessonArabic(node.id, branch.id), lessonNumber: index + 1 });
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

  const isInFoundationExperience =
    ((state.screen === "home" || state.screen === "topic" || state.screen === "branch" || state.screen === "review") && selectedSection.topicId === "foundation") ||
    (state.screen.startsWith("lesson_") && currentLessonSection.topicId === "foundation");
  const userStars = useMemo(() => {
    return state.user ? COURSE.sections.reduce((total, item) => total + getSectionStars(state.user!, item), 0) : 0;
  }, [state.user]);

  useEffect(() => {
    if (!state.user || state.user.hasAccount || accountPromptShown || !isInFoundationExperience) {
      return;
    }

    const timer = setTimeout(() => {
      setAccountPromptShown(true);
      setAuthMode(hasSavedAccount ? "login" : "create");
      setAccountModalVisible(true);
    }, 180000);

    return () => {
      clearTimeout(timer);
    };
  }, [accountPromptShown, hasSavedAccount, isInFoundationExperience, state.user]);

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

  function updateAssessmentConfidence(value: number) {
    setActiveAssessment((current) => current ? { ...current, confidence: value } : current);
  }

  function submitAssessmentAnswer() {
    if (!state.user || !activeAssessment || activeAssessment.feedback || activeAssessment.selectedAnswer == null) {
      return;
    }

    const result = submitFoundationAssessmentAnswer({
      profile: learnerProfile,
      state: activeAssessment,
      selectedAnswer: activeAssessment.selectedAnswer,
      confidence: activeAssessment.confidence,
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
    setActiveAssessment(undefined);
    dispatch({ type: "close_assessment" });
    Alert.alert(
      activeAssessment.mode === "placement" ? "Foundation updated" : "Session complete",
      `${finalizedProfile.readiness_label}. ${
        finalizedProfile.weak_areas.length
          ? `Needs review: ${finalizedProfile.weak_areas.slice(0, 3).join(", ")}.`
          : "No major weak area is standing out right now."
      }`
    );
  }

  function closeAssessment() {
    setActiveAssessment(undefined);
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

  async function startLesson(node: LearningNodeView) {
    if (!state.user) {
      return;
    }

    const nodeBranch = COURSE.sections.flatMap((section) => section.branches).find((branch) => branch.id === node.branchId) ?? selectedBranch;

    if (nodeBranch.premiumOnly && !state.user.activeSubscriptionId) {
      Alert.alert("Premium branch", "Upgrade to premium to unlock this advanced branch and its deeper mastery lessons.");
      dispatch({ type: "open_shop" });
      return;
    }

    if (node.status === "locked") {
      Alert.alert("Locked", "Finish the earlier circles in this topic first.");
      return;
    }

    if (!state.user.hearts.unlimited && state.user.hearts.current === 0) {
      if (shouldOfferReviewHeartRestore(state.user)) {
        setReviewRestoreVisible(true);
        return;
      }

      dispatch({ type: "open_shop" });
      return;
    }

    const activeUser = {
      ...state.user,
      lastLearningAt: new Date().toISOString()
    };

    dispatch({ type: "apply_user", user: activeUser });
    const session = await learningApi.getLessonSession(node.firstLessonId, activeUser);
    challengeStartedAtRef.current = Date.now();
    dispatch({ type: "start_lesson", session });
  }

  async function startBranchTestOut(branchId = selectedBranch.id) {
    if (!state.user) {
      return;
    }

    const testBranch = selectedSection.branches.find((branch) => branch.id === branchId) ?? selectedBranch;
    const currentTestOutCluster = getCurrentTestOutCluster(
      pathNodes.filter((node) => node.topicId === selectedSection.topicId && node.branchId === testBranch.id)
    );

    if (testBranch.premiumOnly && !state.user.activeSubscriptionId) {
      Alert.alert("Premium test out", "This mastery branch is part of premium. Upgrade to unlock its advanced lessons and tests.");
      dispatch({ type: "open_shop" });
      return;
    }

    if (!currentTestOutCluster) {
      Alert.alert("Branch cleared", "There is no active lesson cluster to test out right now.");
      return;
    }

    if (!state.user.hearts.unlimited && state.user.hearts.current === 0) {
      dispatch({ type: "open_shop" });
      return;
    }

    const activeUser = {
      ...state.user,
      lastLearningAt: new Date().toISOString()
    };

    dispatch({ type: "apply_user", user: activeUser });
    const lessons = currentTestOutCluster.lessonIds
      .map((lessonId) => LESSONS_BY_ID[lessonId])
      .filter(Boolean);

    if (!lessons.length) {
      Alert.alert("Test unavailable", "This lesson stretch is still being prepared.");
      return;
    }

    const session = createTestOutSession({
      branchTitle: currentTestOutCluster.title,
      branchId: testBranch.id,
      lessons,
      nodeIds: currentTestOutCluster.nodeIds,
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
    if (!isRetry && !correct && shouldOfferReviewHeartRestore(nextUser)) {
      setReviewRestoreVisible(true);
    }
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
    // A missed question comes straight back once, for free, so the right answer sticks.
    if (state.answerState === "wrong" && !state.lastAnswerWasRetry) {
      challengeStartedAtRef.current = Date.now();
      dispatch({ type: "retry_challenge" });
      return;
    }

    void continueLesson();
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

  async function continueLesson() {
    if (!state.user || !state.activeSession) {
      return;
    }

    const lastChallenge = state.challengeIndex >= state.activeSession.lesson.challenges.length - 1;

    if (isOutOfHeartsAfterAnswer(state.user, state.answerState)) {
      if (shouldOfferReviewHeartRestore(state.user)) {
        setReviewRestoreVisible(true);
        return;
      }

      dispatch({ type: "open_shop" });
      return;
    }

    if (!lastChallenge) {
      challengeStartedAtRef.current = Date.now();
      dispatch({ type: "next_challenge" });
      return;
    }

    if (state.activeSession.mode === "test_out") {
      const totalChallenges = state.activeSession.lesson.challenges.length;
      const passingScore = state.activeSession.passingScore ?? Math.max(3, Math.ceil(totalChallenges * 0.8));
      const passed = state.sessionCorrectCount >= passingScore;

      if (!passed) {
        const recommendedTitles = state.sessionMissedLessonIds
          .map((lessonId) => LESSONS_BY_ID[lessonId]?.title)
          .filter(Boolean)
          .slice(0, 3);
        const recommendationCopy = recommendedTitles.length
          ? `Review next: ${recommendedTitles.join(", ")}.`
          : "Review the current lesson stretch and try again.";

        Alert.alert(
          "Test out missed",
          `You got ${state.sessionCorrectCount} of ${totalChallenges}. ${recommendationCopy}`
        );
        dispatch({ type: "reset_lesson" });
        return;
      }

      const clusterLessons = (state.activeSession.targetLessonIds ?? [])
        .map((lessonId) => LESSONS_BY_ID[lessonId])
        .filter(Boolean);
      const beforeNodes = learningApi.getPathNodes(state.user);
      const nextUser = withExperienceDefaults({
        ...completeLessonCluster(state.user, clusterLessons),
        lastLearningAt: new Date().toISOString()
      });
      const afterNodes = learningApi.getPathNodes(nextUser);
      const unlockedNode = afterNodes.find((node) => {
        const previous = beforeNodes.find((item) => item.id === node.id);
        return previous?.status === "locked" && node.status !== "locked";
      });

      // LessonComplete plays the finish and XP sounds itself.
      setLessonCompleteSummary({
        title: state.activeSession.clusterTitle ?? state.activeSession.lesson.title,
        xp: nextUser.totalXp - state.user.totalXp,
        streakExtended: didExtendStreak(state.user, nextUser),
        stars: (state.activeSession.targetNodeIds ?? [])
          .filter((nodeId) => !state.user!.completedNodeIds.includes(nodeId))
          .map((nodeId) => getNodeStarsReward(nodeId))
          .reduce((total, value) => total + value, 0),
        unlockedTitle: unlockedNode?.title,
        streakDays: nextUser.streakDays
      });
      const xpSummary = await learningApi.getXpSummaries(nextUser);
      dispatch({ type: "finish_lesson", user: nextUser, xpSummary });
    maybeShowLessonBreakAd(nextUser);
      return;
    }

    const beforeNodes = learningApi.getPathNodes(state.user);
    const nextUser = withExperienceDefaults({
      ...completeLesson(state.user, state.activeSession.lesson),
      lastLearningAt: new Date().toISOString()
    });
    const afterNodes = learningApi.getPathNodes(nextUser);
    const unlockedNode = afterNodes.find((node) => {
      const previous = beforeNodes.find((item) => item.id === node.id);
      return previous?.status === "locked" && node.status !== "locked";
    });

    // LessonComplete plays the finish and XP sounds itself; only a grown streak adds its own.
    if (didExtendStreak(state.user, nextUser)) {
      playUiSound("streak");
    }

    setLessonCompleteSummary({
      title: state.activeSession.lesson.title,
      // A replayed lesson earns nothing, so show what was actually added.
      xp: nextUser.totalXp - state.user.totalXp,
      streakExtended: didExtendStreak(state.user, nextUser),
      stars: state.user.completedNodeIds.includes(state.activeSession.lesson.nodeId) ? 0 : getNodeStarsReward(state.activeSession.lesson.nodeId),
      unlockedTitle: unlockedNode?.title,
      streakDays: nextUser.streakDays
    });
    const xpSummary = await learningApi.getXpSummaries(nextUser);
    dispatch({ type: "finish_lesson", user: nextUser, xpSummary });
    maybeShowLessonBreakAd(nextUser);
  }

  function claimJourneyReward(stop: JourneyRewardStop) {
    if (!state.user) {
      return;
    }

    if (!stop.unlocked) {
      Alert.alert("Keep going", "Finish the circles before this chest to unlock the reward.");
      return;
    }

    if (stop.claimed) {
      Alert.alert("Already opened", "You already collected this branch reward.");
      return;
    }

    const claimedRewardIds = [...(state.user.claimedRewardIds ?? []), stop.id];
    const nextUser = withExperienceDefaults({
      ...state.user,
      gems: state.user.gems + stop.gemsReward,
      claimedRewardIds
    });

    playUiSound("reward_chest");
    setRewardCelebration({
      title: stop.title,
      xp: 0,
      stars: 0,
      streakDays: nextUser.streakDays,
      gemsReward: stop.gemsReward
    });
    dispatch({ type: "apply_user", user: nextUser });
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
      if (canSpendGems(state.user, item)) {
        dispatch({ type: "apply_user", user: applyShopItem(state.user, item) });
      } else {
        Alert.alert(
          "Not available right now",
          state.user.gems < item.price ? `You need ${item.price} gems. Earn more by finishing lessons and reward chests.` : "Your hearts are already full."
        );
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
          Alert.alert("Sponsor break", reward.message);
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
        Alert.alert("Purchase not completed", purchase.message);
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

      Alert.alert(
        "Restore purchases",
        result.premium?.active ? "Your premium plan is active again." : result.message ?? "No active premium plan was found."
      );
    } finally {
      setShopBusy(false);
    }
  }

  function savePreferredLanguage(language: SupportedLanguage) {
    if (!state.user) {
      return;
    }

    setPendingLanguage(language);
    updateLocalAuthAccount({ preferredLanguage: language });
    dispatch({
      type: "apply_user",
      user: {
        ...state.user,
        preferredLanguage: language
      }
    });
    setLanguageModalVisible(false);
  }

  function openSettingsModal() {
    if (!state.user || !state.user.hasAccount) {
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

  function openAccountPanel() {
    if (state.user?.hasAccount) {
      dispatch({ type: "open_profile" });
      return;
    }

    setAuthMode(hasSavedAccount ? "login" : "create");
    setAccountModalVisible(true);
  }

  async function createAccount() {
    if (!state.user) {
      return;
    }

    if (!accountName.trim() || !accountEmail.trim() || !accountPassword.trim()) {
      Alert.alert("Almost there", "Add your name, email, and password so we can create your account.");
      return;
    }

    if (!isValidEmail(accountEmail)) {
      Alert.alert("Check your email", "Please use a valid email address.");
      return;
    }

    if (accountPassword.trim().length < 8) {
      Alert.alert("Use a stronger password", "Please use at least 8 characters so your account is better protected.");
      return;
    }

    const createdAt = new Date().toISOString();
    const reminderPreferences = defaultReminderPreferences();
    const pendingAccount = {
      name: accountName.trim(),
      email: normalizeEmail(accountEmail),
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
        Alert.alert("Could not create account", error.message);
        return;
      }
    }

    createLocalAuthAccount(pendingAccount);

    dispatch({
      type: "apply_user",
      user: withExperienceDefaults(ensureLearnerProfile(nextUser))
    });
    setHasSavedAccount(true);
    setAuthMode("login");
    setAccountPromptShown(true);
    setAccountPassword("");
    setAccountModalVisible(false);
  }

  async function loginAccount() {
    if (!state.user) {
      return;
    }

    if (!accountEmail.trim() || !accountPassword.trim()) {
      Alert.alert("Welcome back", "Enter your email and password to log in.");
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

      dispatch({
        type: "apply_user",
        user: withExperienceDefaults(ensureLearnerProfile(prepareUserForToday(remote.user)))
      });
      setAccountName(remote.account.name);
      setAccountEmail(remote.account.email);
      setHasSavedAccount(true);
      setAccountPromptShown(true);
      setAccountPassword("");
      setAccountModalVisible(false);
      return;
    } catch (error) {
      if (error instanceof Error && !isBackendOfflineError(error)) {
        Alert.alert("We couldn't sign you in", error.message);
        return;
      }
    }

    const account = loginLocalAuthAccount(accountEmail, accountPassword);

    if (!account) {
      Alert.alert("We couldn't sign you in", "That email or password does not match the saved account on this device.");
      return;
    }

    dispatch({
      type: "apply_user",
      user: withExperienceDefaults(ensureLearnerProfile(applyAccountIdentity(state.user, account)))
    });
    setAccountName(account.name);
    setAccountEmail(account.email);
    setHasSavedAccount(true);
    setAccountPromptShown(true);
    setAccountPassword("");
    setAccountModalVisible(false);
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

    updateLocalAuthAccount({
      role: settingsRole,
      reminderPreferences,
      preferredLanguage: nextUser.preferredLanguage
    });
    dispatch({ type: "apply_user", user: nextUser });
    setSettingsModalVisible(false);

    if (settingsStreakReminder || settingsIslamicReminder) {
      await requestIslamicNotificationPermission();
    }
  }

  async function logoutAccount() {
    if (!state.user) {
      return;
    }

    const fallbackUser = await learningApi.getUser(1001);
    const guestUser = withExperienceDefaults(ensureLearnerProfile(refillHeartsForToday({
      ...fallbackUser,
      preferredLanguage: state.user.preferredLanguage ?? DEFAULT_LANGUAGE,
      soundEffectsEnabled: state.user.soundEffectsEnabled !== false,
      reducedSoundEffects: Boolean(state.user.reducedSoundEffects)
    })));

    try {
      await logoutRemoteAccount();
    } catch {
      // Best effort is enough here because we still clear the local session below.
    }

    resetToGuest(guestUser);
    Alert.alert("Logged out", "You are back in guest mode. Create an account or log in any time to save progress again.");
  }

  async function deleteAccount() {
    if (!state.user) {
      return;
    }

    const confirmed = await confirmDestructive(
      "Delete your account?",
      "This permanently deletes your account, XP, streak and saved progress. Active subscriptions are managed by the App Store or Google Play and must be cancelled there.",
      "Delete account"
    );

    if (!confirmed) {
      return;
    }

    if (getSessionToken()) {
      try {
        await deleteRemoteAccount();
      } catch (error) {
        Alert.alert(
          "Could not delete account",
          error instanceof Error && isBackendOfflineError(error)
            ? "Connect to the internet and try again so your account can be removed from our servers."
            : error instanceof Error ? error.message : "Please try again."
        );
        return;
      }
    }

    const fallbackUser = await learningApi.getUser(1001);
    resetToGuest(withExperienceDefaults(ensureLearnerProfile(refillHeartsForToday({
      ...fallbackUser,
      preferredLanguage: state.user.preferredLanguage ?? DEFAULT_LANGUAGE
    }))));
    Alert.alert("Account deleted", "Your account and saved progress have been removed.");
  }

  function resetToGuest(guestUser: UserProfile) {
    clearLocalAuthAccount();
    clearSocialHubState();
    clearSavedUserProfile();
    setCrew({ status: "idle" });
    setHasSavedAccount(false);
    setAccountPromptShown(false);
    setAccountName("");
    setAccountEmail("");
    setAccountPassword("");
    setAuthMode("create");
    setSettingsRole(undefined);
    setSettingsDailyReminder(true);
    setSettingsWeeklyReminder(true);
    setSettingsStreakReminder(true);
    setSettingsIslamicReminder(true);
    setSettingsSoundEnabled(guestUser.soundEffectsEnabled !== false);
    setSettingsReducedSound(Boolean(guestUser.reducedSoundEffects));
    setReviewRestoreVisible(false);
    setSettingsModalVisible(false);
    dispatch({ type: "apply_user", user: guestUser });
  }

  function handleSocialLogin(provider: SocialProvider) {
    const config = SOCIAL_AUTH_CONFIG[provider];

    if (!config.enabled) {
      const idLabel = provider === "google" ? "Google client ID" : "Facebook app ID";
      Alert.alert(
        `${provider === "google" ? "Google" : "Facebook"} sign-in is ready`,
        `Add your ${idLabel} in src/config/auth.ts to turn this button on for the real app build.`
      );
      return;
    }

    Alert.alert(
      `${provider === "google" ? "Google" : "Facebook"} sign-in`,
      "This button is wired into the app flow, but it still needs the provider redirect setup for the final mobile release."
    );
  }

  async function loadCrew() {
    if (!state.user?.hasAccount || !getSessionToken()) {
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
      Alert.alert("Check the email", "Enter the email address they use for their Sira Path account.");
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
      Alert.alert(
        "Could not add them",
        error instanceof Error && !isBackendOfflineError(error) ? error.message : "Check your connection and try again."
      );
    }
  }

  async function removeCrewFriend(member: CrewMember) {
    const confirmed = await confirmDestructive("Remove from crew?", `${member.name} will leave your leaderboard.`, "Remove");

    if (!confirmed) {
      return;
    }

    try {
      await removeCrewMember(member.id);
      setCrew((current) => current.status === "ready"
        ? { ...current, payload: { ...current.payload, friends: current.payload.friends.filter((item) => item.id !== member.id) } }
        : current);
    } catch (error) {
      Alert.alert("Could not remove them", error instanceof Error && !isBackendOfflineError(error) ? error.message : "Check your connection and try again.");
    }
  }

  function claimReviewHeartRestore() {
    if (!state.user) {
      return;
    }

    dispatch({
      type: "apply_user",
      user: grantHearts(
        {
          ...state.user,
          reviewHeartRestoreUsed: true
        },
        state.user.hearts.max,
        true
      )
    });
    setReviewRestoreVisible(false);
  }

  function skipReviewHeartRestore() {
    setReviewRestoreVisible(false);
    dispatch({ type: "open_shop" });
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
  const nextLessonNode = sectionNextNode && sectionNextNode.status !== "locked" ? sectionNextNode : undefined;
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
  const quitSheet = (
    <QuitSheet
      visible={quitLessonVisible}
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
      <View style={styles.appShell}>
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
            onTestOut={(unitId) => void startBranchTestOut(unitId)}
            onPremium={() => dispatch({ type: "open_shop" })}
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
            onSelect={(choiceId) => dispatch({ type: "select_choice", choiceId })}
            onCheck={answerChallenge}
            onContinue={continueFromFeedback}
          />
        )}
        {state.screen === "lesson_complete" && lessonCompleteSummary && (
          <LessonComplete
            title={lessonCompleteSummary.title}
            xp={lessonCompleteSummary.xp}
            stars={lessonCompleteSummary.stars}
            streakDays={lessonCompleteSummary.streakDays}
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
            confidence={activeAssessment.confidence}
            mascotVariant={selectedSection.mascot}
            onChangeSelectedAnswer={updateAssessmentSelection}
            onChangeConfidence={updateAssessmentConfidence}
            onSubmit={submitAssessmentAnswer}
            onContinue={continueAssessment}
            onExit={closeAssessment}
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
            onChangeInviteEmail={setInviteEmail}
            onChangeInviteRelation={setInviteRelation}
            onAddFriend={addCrewFriend}
            onRemoveFriend={removeCrewFriend}
            onRefresh={loadCrew}
            onCreateAccount={() => openAccountPanel()}
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
          name={accountName}
          email={accountEmail}
          password={accountPassword}
          socialProviders={enabledSocialProviders}
          onChangeMode={setAuthMode}
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
          onDeleteAccount={hasSavedAccount ? deleteAccount : undefined}
        />
        <RefillSheet
          visible={reviewRestoreVisible}
          maxHearts={state.user.hearts.max}
          mascotVariant={inLesson ? lessonMascot : selectedSection.mascot}
          onRefill={claimReviewHeartRestore}
          onShop={skipReviewHeartRestore}
        />
        <RewardPop
          visible={Boolean(rewardCelebration)}
          gems={rewardCelebration?.gemsReward ?? 0}
          onClose={() => setRewardCelebration(undefined)}
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
      </View>
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

// React Native Web has no Alert buttons, so the browser's confirm dialog stands in there.
function confirmDestructive(title: string, message: string, confirmLabel: string) {
  if (Platform.OS === "web") {
    return Promise.resolve(typeof window !== "undefined" && typeof window.confirm === "function" ? window.confirm(`${title}\n\n${message}`) : false);
  }

  return new Promise<boolean>((resolve) => {
    Alert.alert(title, message, [
      { text: "Cancel", style: "cancel", onPress: () => resolve(false) },
      { text: confirmLabel, style: "destructive", onPress: () => resolve(true) }
    ], { cancelable: true, onDismiss: () => resolve(false) });
  });
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

function getCurrentTestOutCluster(nodes: LearningNodeView[]) {
  const firstActiveNode = nodes.find((node) => node.status === "current" || node.status === "available");

  if (!firstActiveNode) {
    return undefined;
  }

  const clusterId = firstActiveNode.clusterId;
  const activeClusterNodes = nodes.filter((node) =>
    clusterId ? node.clusterId === clusterId && node.status !== "completed" && node.status !== "locked" : node.status !== "completed" && node.status !== "locked"
  );

  const nodeIds = activeClusterNodes.map((node) => node.id);
  const lessonIds = activeClusterNodes.flatMap((node) => node.lessonIds).slice(0, 5);
  const clusterIndex = clusterId
    ? Number(clusterId.split("_").pop() || "1")
    : Math.floor(nodes.findIndex((node) => node.id === firstActiveNode.id) / 5) + 1;
  const startTitle = activeClusterNodes[0]?.title ?? firstActiveNode.title;
  const endTitle = activeClusterNodes[activeClusterNodes.length - 1]?.title ?? firstActiveNode.title;

  return {
    clusterId: clusterId ?? `${firstActiveNode.branchId}_cluster_${clusterIndex}`,
    label: `cluster ${clusterIndex}`,
    title: `Test out ${startTitle}${endTitle !== startTitle ? ` to ${endTitle}` : ""}`,
    nodeIds,
    lessonIds
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

  return nodes
    .map((node, index) => {
      if ((index + 1) % rewardStride !== 0 && index !== nodes.length - 1) {
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
