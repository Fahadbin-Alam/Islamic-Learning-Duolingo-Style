import React, { useEffect, useMemo, useReducer, useRef, useState } from "react";
import {
  Alert,
  Animated,
  Easing,
  Linking,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";
import {
  applyShopItem,
  completeLesson,
  completeLessonCluster,
  createTestOutSession,
  grantHearts,
  learningApi,
  loseHeart,
  refillHeartsForToday
} from "./api/islamicLearningApi";
import { SOCIAL_AUTH_CONFIG } from "./config/auth";
import { COURSE, LESSONS_BY_ID, SHOP_ITEMS } from "./data/course";
import {
  DEFAULT_LANGUAGE,
  getLanguageOption,
  getNodeTitle,
  getTopicCopy,
  getUiStrings,
  LANGUAGE_OPTIONS,
  normalizeLanguage,
  type UiStrings
} from "./i18n";
import { localizeLessonContent, translateStudyText } from "./services/contentLocalization";
import {
  clearLocalAuthAccount,
  createLocalAuthAccount,
  loadLocalAuthAccount,
  loginLocalAuthAccount,
  updateLocalAuthAccount
} from "./services/localAuth";
import {
  hydrateRemoteSession,
  loginRemoteAccount,
  logoutRemoteAccount,
  registerRemoteAccount,
  syncRemoteSocialHub,
  syncRemoteUser
} from "./services/backendSync";
import { clearSavedUserProfile, loadSavedUserProfile, saveUserProfile } from "./services/localProgress";
import { monetizationClient } from "./services/monetization";
import {
  clearSocialHubState,
  createSocialConnection,
  getSocialScore,
  loadSocialHubState,
  runBattle,
  saveSocialHubState
} from "./services/socialHub";
import {
  requestIslamicNotificationPermission,
  scheduleIslamicReminderChecks
} from "./services/islamicNotifications";
import {
  FoundationAssessmentScreen,
  FoundationDashboard
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
import type {
  AccountRole,
  AssessmentFeedback,
  BattleResult,
  Challenge,
  CharacterVariant,
  FoundationAssessmentState,
  FoundationCategoryId,
  LearningBranch,
  LearningNodeView,
  LearningSection,
  LessonPracticeActivity,
  LessonSource,
  LessonSession,
  LessonTeachingMoment,
  ReminderPreferences,
  ResourceSupportType,
  ResourceValidationStatus,
  SocialConnection,
  SocialHubState,
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
  | "lesson_intro"
  | "lesson_teach"
  | "lesson_example"
  | "lesson_practice"
  | "lesson_question"
  | "lesson_feedback"
  | "lesson_help"
  | "lesson_complete"
  | "assessment"
  | "review"
  | "profile"
  | "shop"
  | "social";
type AnswerState = "correct" | "wrong" | undefined;
type AuthMode = "create" | "login";
type SocialProvider = keyof typeof SOCIAL_AUTH_CONFIG;
type NodeGlyphKind =
  | "book_closed"
  | "book_open"
  | "book_stack"
  | "book_marked"
  | "book_seal"
  | "sparkle_badge"
  | "brain"
  | "shield_sword"
  | "home_heart";

type JourneyRewardStop = {
  id: string;
  title: string;
  copy: string;
  gemsReward: number;
  unlocked: boolean;
  claimed: boolean;
};

type LessonCelebration = {
  title: string;
  xp: number;
  stars: number;
  unlockedTitle?: string;
  streakDays: number;
  gemsReward?: number;
};

type PathTheme = {
  primary: string;
  secondary: string;
  tertiary: string;
  glow: string;
  shell: string;
  lane: string;
  reward: string;
  review: string;
  candy: string;
};

type MotionSpring = {
  speed: number;
  bounciness: number;
};

const MOTION = {
  duration: {
    progressFill: 520,
    nodePulse: 1200,
    nodeFloat: 2100,
    nodeShine: 3000,
    nodeStarPulse: 840,
    rewardGlow: 940,
    celebrationLift: 1120,
    modalFade: 280
  },
  easing: {
    smoothOut: Easing.bezier(0.22, 1, 0.36, 1),
    smoothInOut: Easing.bezier(0.4, 0, 0.2, 1),
    drift: Easing.inOut(Easing.sin)
  },
  spring: {
    hoverIn: { speed: 15, bounciness: 8 },
    hoverOut: { speed: 15, bounciness: 5 },
    pressIn: { speed: 18, bounciness: 4 },
    pressOut: { speed: 16, bounciness: 7 },
    settle: { speed: 15, bounciness: 5 },
    modalPop: { speed: 14, bounciness: 8 }
  }
} as const;

function smoothScaleSpring(value: Animated.Value, toValue: number, spring: MotionSpring) {
  return Animated.spring(value, {
    toValue,
    useNativeDriver: true,
    speed: spring.speed,
    bounciness: spring.bounciness
  });
}

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
  | { type: "show_teach_screen" }
  | { type: "show_example_screen" }
  | { type: "show_practice_screen" }
  | { type: "begin_lesson_questions" }
  | { type: "select_choice"; choiceId: string }
  | { type: "answer"; correct: boolean; user: UserProfile; missedLessonId?: string; scored?: boolean; retried?: boolean }
  | { type: "show_help_screen" }
  | { type: "retry_challenge" }
  | { type: "next_challenge" }
  | { type: "finish_lesson"; user: UserProfile; xpSummary: XpSummary[] }
  | { type: "close_lesson_complete" }
  | { type: "apply_user"; user: UserProfile }
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
        screen: "lesson_intro",
        activeSession: action.session,
        challengeIndex: 0,
        selectedChoiceId: undefined,
        answerState: undefined,
        retryingCurrentChallenge: false,
        lastAnswerWasRetry: false,
        sessionCorrectCount: 0,
        sessionMissedLessonIds: []
      };
    case "show_teach_screen":
      return {
        ...state,
        screen: "lesson_teach",
        selectedChoiceId: undefined,
        answerState: undefined,
        retryingCurrentChallenge: false,
        lastAnswerWasRetry: false
      };
    case "show_example_screen":
      return { ...state, screen: "lesson_example" };
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
    case "show_help_screen":
      return { ...state, screen: "lesson_help" };
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
  const [socialHub, setSocialHub] = useState<SocialHubState>(() => loadSocialHubState());
  const [inviteName, setInviteName] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRelation, setInviteRelation] = useState<SocialRelation>("friend");
  const [accountabilityPermissionAsked, setAccountabilityPermissionAsked] = useState(false);
  const [pendingLanguage, setPendingLanguage] = useState<SupportedLanguage>(DEFAULT_LANGUAGE);
  const [lessonCompleteSummary, setLessonCompleteSummary] = useState<LessonCelebration | undefined>(undefined);
  const [rewardCelebration, setRewardCelebration] = useState<LessonCelebration | undefined>(undefined);
  const challengeStartedAtRef = useRef(Date.now());

  useEffect(() => {
    let mounted = true;

    async function load() {
      const fallbackUser = await learningApi.getUser(1001);
      const savedUser = loadSavedUserProfile();
      const savedAccount = loadLocalAuthAccount();
      const savedSocialHub = loadSocialHubState();
      const remoteSession = await hydrateRemoteSession();
      const baseUser = withExperienceDefaults(ensureLearnerProfile(refillHeartsForToday(remoteSession?.user ?? savedUser ?? fallbackUser)));
      const accountSeed = remoteSession?.account ?? savedAccount;
      const user = accountSeed ? withExperienceDefaults(ensureLearnerProfile(applyAccountIdentity(baseUser, accountSeed))) : baseUser;
      const xpSummary = await learningApi.getXpSummaries(user);

      if (mounted) {
        setSocialHub(remoteSession?.socialHub ?? savedSocialHub);
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

        if (!user.preferredLanguage) {
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

  useEffect(() => {
    saveSocialHubState(socialHub);
    void syncRemoteSocialHub(socialHub).catch(() => undefined);
  }, [socialHub]);

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
    if (typeof window === "undefined") {
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

  const selectedNodes = useMemo(() => {
    return pathNodes
      .filter((node) => node.topicId === selectedSection.topicId && node.branchId === selectedBranch.id)
      .map((node) => ({
        ...node,
        title: getNodeTitle(node.id, node.title, currentLanguage)
      }));
  }, [currentLanguage, pathNodes, selectedBranch.id, selectedSection.topicId]);
  const selectedNextNode = useMemo(
    () => selectedNodes.find((node) => node.status === "current") ?? selectedNodes.find((node) => node.status === "available") ?? selectedNodes[0],
    [selectedNodes]
  );
  const currentTestOutCluster = useMemo(() => getCurrentTestOutCluster(selectedNodes), [selectedNodes]);

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
  const currentTeachMoment = useMemo(
    () => (currentLessonSession ? pickTeachMoment(currentLessonSession.lesson) : undefined),
    [currentLessonSession]
  );
  const currentExampleMoment = useMemo(
    () => (currentLessonSession ? pickExampleMoment(currentLessonSession.lesson) : undefined),
    [currentLessonSession]
  );
  const currentPracticeActivity = useMemo(
    () => currentLessonSession?.lesson.practiceActivities?.[0],
    [currentLessonSession]
  );

  const isInFoundationExperience =
    ((state.screen === "home" || state.screen === "topic" || state.screen === "branch" || state.screen === "review") && selectedSection.topicId === "foundation") ||
    (state.screen.startsWith("lesson_") && currentLessonSection.topicId === "foundation");
  const userStars = useMemo(() => {
    return state.user ? COURSE.sections.reduce((total, item) => total + getSectionStars(state.user!, item), 0) : 0;
  }, [state.user]);
  const userBattleRecord = useMemo(() => {
    return socialHub.battleHistory.reduce(
      (record, battle) => {
        if (battle.winner === "user") {
          record.wins += 1;
        } else {
          record.losses += 1;
        }

        return record;
      },
      { wins: 0, losses: 0 }
    );
  }, [socialHub.battleHistory]);
  const leaderboard = useMemo(() => {
    if (!state.user) {
      return [];
    }

    const me = {
      id: "me",
      name: state.user.displayName,
      relation: "you" as const,
      avatarInitials: state.user.avatarInitials,
      totalXp: state.user.totalXp,
      streakDays: state.user.streakDays,
      stars: userStars,
      wins: userBattleRecord.wins,
      losses: userBattleRecord.losses,
      score: getSocialScore({
        totalXp: state.user.totalXp,
        streakDays: state.user.streakDays,
        stars: userStars,
        wins: userBattleRecord.wins
      })
    };

    const peers = socialHub.connections.map((connection) => ({
      id: connection.id,
      name: connection.name,
      relation: connection.relation,
      avatarInitials: connection.avatarInitials,
      totalXp: connection.totalXp,
      streakDays: connection.streakDays,
      stars: connection.stars,
      wins: connection.wins,
      losses: connection.losses,
      score: getSocialScore(connection)
    }));

    return [me, ...peers].sort((left, right) => right.score - left.score);
  }, [socialHub.connections, state.user, userBattleRecord.losses, userBattleRecord.wins, userStars]);
  const accountabilityAlerts = useMemo(() => {
    return socialHub.connections.flatMap((connection) => {
      if (!connection.connectedWithAccount) {
        return [];
      }

      const alerts: Array<{
        id: string;
        connectionId: string;
        name: string;
        relation: SocialRelation;
        kind: "daily" | "weekly";
        copy: string;
      }> = [];

      if (isDailyReminderDue(connection) && connection.reminderPreferences?.dailyInactivity !== false) {
        alerts.push({
          id: `${connection.id}_daily`,
          connectionId: connection.id,
          name: connection.name,
          relation: connection.relation,
          kind: "daily",
          copy: `${connection.name} has not logged in today. Send a quick accountability nudge.`
        });
      }

      if (isWeeklyReminderDue(connection) && connection.reminderPreferences?.weeklyInactivity !== false) {
        alerts.push({
          id: `${connection.id}_weekly`,
          connectionId: connection.id,
          name: connection.name,
          relation: connection.relation,
          kind: "weekly",
          copy: `${connection.name} has been away for a week. Time for a stronger check-in.`
        });
      }

      return alerts;
    });
  }, [socialHub.connections]);

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
    playUiSound("soft_ui");

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
    playUiSound("soft_ui");
    setActiveAssessment((current) => current ? { ...current, selectedAnswer: value } : current);
  }

  function updateAssessmentConfidence(value: number) {
    setActiveAssessment((current) => current ? { ...current, confidence: value } : current);
  }

  function submitAssessmentAnswer() {
    if (!state.user || !activeAssessment || activeAssessment.feedback || activeAssessment.selectedAnswer == null) {
      return;
    }
    playUiSound("soft_ui");

    const result = submitFoundationAssessmentAnswer({
      profile: learnerProfile,
      state: activeAssessment,
      selectedAnswer: activeAssessment.selectedAnswer,
      confidence: activeAssessment.confidence,
      responseTimeMs: Date.now() - activeAssessment.questionStartedAt
    });
    const gainedXp = result.feedback.correct
      ? activeAssessment.currentQuestion.xpReward
      : Math.max(2, Math.floor(activeAssessment.currentQuestion.xpReward / 2));

    dispatch({
      type: "apply_user",
      user: ensureLearnerProfile({
        ...state.user,
        totalXp: state.user.totalXp + gainedXp,
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
    playUiSound("soft_ui");

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
    playUiSound("soft_ui");
    setActiveAssessment(undefined);
    dispatch({ type: "close_assessment" });
  }

  function skipFoundationAssessment() {
    if (!state.user) {
      return;
    }
    playUiSound("soft_ui");

    dispatch({
      type: "apply_user",
      user: withExperienceDefaults({
        ...state.user,
        foundationAssessmentSkipped: true
      })
    });
  }

  function exploreTopicsFreely() {
    playUiSound("soft_ui");
    skipFoundationAssessment();
    dispatch({ type: "select_topic", topicId: "prayer" });
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

  function goHomeScreen() {
    playUiSound("soft_ui");
    dispatch({ type: "go_home" });
  }

  function openTopicScreen(topicId: TopicId) {
    playUiSound("soft_ui");
    dispatch({ type: "select_topic", topicId });
  }

  function showSelectedTopicScreen() {
    playUiSound("soft_ui");
    dispatch({ type: "show_topic" });
  }

  function openBranchScreen(branchId: string) {
    playUiSound("soft_ui");
    dispatch({ type: "select_branch", branchId });
  }

  function showSelectedBranchScreen() {
    playUiSound("soft_ui");
    dispatch({ type: "show_branch" });
  }

  function openReviewScreen() {
    playUiSound("soft_ui");
    dispatch({ type: "open_review" });
  }

  function closeReviewScreen() {
    playUiSound("soft_ui");
    dispatch({ type: "close_review" });
  }

  function closeProfileScreen() {
    playUiSound("soft_ui");
    dispatch({ type: "close_profile" });
  }

  function openShopScreen() {
    playUiSound("soft_ui");
    dispatch({ type: "open_shop" });
  }

  function openSocialScreen() {
    playUiSound("soft_ui");
    dispatch({ type: "open_social" });
  }

  async function startLesson(node: LearningNodeView) {
    if (!state.user) {
      return;
    }

    if (selectedBranch.premiumOnly && !state.user.activeSubscriptionId) {
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

    playUiSound("node_tap");
    dispatch({ type: "apply_user", user: activeUser });
    const session = await learningApi.getLessonSession(node.firstLessonId, activeUser);
    challengeStartedAtRef.current = Date.now();
    dispatch({ type: "start_lesson", session });
  }

  async function startBranchTestOut() {
    if (!state.user) {
      return;
    }

    if (selectedBranch.premiumOnly && !state.user.activeSubscriptionId) {
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

    playUiSound("node_tap");
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
      branchId: selectedBranch.id,
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

  function startLessonFlow() {
    playUiSound("soft_ui");
    dispatch({ type: "show_teach_screen" });
  }

  function continueFromTeach() {
    playUiSound("soft_ui");
    if (currentExampleMoment) {
      dispatch({ type: "show_example_screen" });
      return;
    }

    if (currentPracticeActivity) {
      dispatch({ type: "show_practice_screen" });
      return;
    }

    challengeStartedAtRef.current = Date.now();
    dispatch({ type: "begin_lesson_questions" });
  }

  function goBackToTeach() {
    playUiSound("soft_ui");
    dispatch({ type: "show_teach_screen" });
  }

  function continueFromExample() {
    playUiSound("soft_ui");
    if (currentPracticeActivity) {
      dispatch({ type: "show_practice_screen" });
      return;
    }

    challengeStartedAtRef.current = Date.now();
    dispatch({ type: "begin_lesson_questions" });
  }

  function goBackToExample() {
    playUiSound("soft_ui");
    if (currentExampleMoment) {
      dispatch({ type: "show_example_screen" });
      return;
    }

    dispatch({ type: "show_teach_screen" });
  }

  function continueFromPractice() {
    playUiSound("soft_ui");
    challengeStartedAtRef.current = Date.now();
    dispatch({ type: "begin_lesson_questions" });
  }

  function continueFromFeedback() {
    playUiSound("soft_ui");
    if (state.answerState === "wrong" && !state.lastAnswerWasRetry) {
      dispatch({ type: "show_help_screen" });
      return;
    }

    void continueLesson();
  }

  function retryCurrentChallenge() {
    playUiSound("soft_ui");
    challengeStartedAtRef.current = Date.now();
    dispatch({ type: "retry_challenge" });
  }

  async function continueLesson() {
    if (!state.user || !state.activeSession) {
      return;
    }
    playUiSound("soft_ui");

    const lastChallenge = state.challengeIndex >= state.activeSession.lesson.challenges.length - 1;

    if (!lastChallenge) {
      if (!state.user.hearts.unlimited && state.user.hearts.current === 0 && state.answerState === "wrong") {
        if (shouldOfferReviewHeartRestore(state.user)) {
          setReviewRestoreVisible(true);
          return;
        }

        dispatch({ type: "open_shop" });
        return;
      }

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

      playUiSound("lesson_complete");
      playUiSound("unlock");
      setLessonCompleteSummary({
        title: state.activeSession.clusterTitle ?? state.activeSession.lesson.title,
        xp: clusterLessons.reduce((total, lesson) => total + lesson.xpReward, 0),
        stars: (state.activeSession.targetNodeIds ?? [])
          .map((nodeId) => getNodeStarsReward(nodeId))
          .reduce((total, value) => total + value, 0),
        unlockedTitle: unlockedNode?.title,
        streakDays: nextUser.streakDays
      });
      const xpSummary = await learningApi.getXpSummaries(nextUser);
      dispatch({ type: "finish_lesson", user: nextUser, xpSummary });
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

      playUiSound("lesson_complete");
      playUiSound("xp");
    if (unlockedNode) {
      playUiSound("unlock");
    }
    if (nextUser.streakDays > 0 && nextUser.streakDays % 7 === 0) {
      playUiSound("streak");
    }

    setLessonCompleteSummary({
      title: state.activeSession.lesson.title,
      xp: state.activeSession.lesson.xpReward,
      stars: getNodeStarsReward(state.activeSession.lesson.nodeId),
      unlockedTitle: unlockedNode?.title,
      streakDays: nextUser.streakDays
    });
    const xpSummary = await learningApi.getXpSummaries(nextUser);
    dispatch({ type: "finish_lesson", user: nextUser, xpSummary });
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

  async function useShopItem(item: ShopItem) {
    if (!state.user) {
      return;
    }
    playUiSound("soft_ui");

    if (item.type === "rewarded_ad") {
      const reward = await monetizationClient.showRewardedHeartAd(item);

      if (reward.ok) {
        dispatch({ type: "apply_user", user: grantHearts(state.user, reward.heartsGranted, true) });
      } else if (reward.message) {
        Alert.alert("Rewarded hearts are not ready yet", reward.message);
      }

      return;
    }

    const purchase = await monetizationClient.purchaseShopItem(item);

    if (purchase.ok) {
      dispatch({ type: "apply_user", user: applyShopItem(state.user, item) });
    } else if (purchase.message) {
      Alert.alert("Premium checkout is not ready yet", purchase.message);
    }
  }

  function savePreferredLanguage(language: SupportedLanguage) {
    if (!state.user) {
      return;
    }
    playUiSound("soft_ui");

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
    playUiSound("soft_ui");

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
    playUiSound("soft_ui");
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
    playUiSound("soft_ui");

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
    let nextSocialHub = socialHub;

    try {
      const remote = await registerRemoteAccount({
        name: pendingAccount.name,
        email: pendingAccount.email,
        password: pendingAccount.password,
        reminderPreferences: pendingAccount.reminderPreferences,
        user: nextUser,
        socialHub
      });

      nextUser = withExperienceDefaults(ensureLearnerProfile(refillHeartsForToday(remote.user)));
      nextSocialHub = remote.socialHub;
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
    setSocialHub(nextSocialHub);
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
    playUiSound("soft_ui");

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
        user: withExperienceDefaults(ensureLearnerProfile(refillHeartsForToday(remote.user)))
      });
      setSocialHub(remote.socialHub);
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
    playUiSound("soft_ui");

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
    playUiSound("soft_ui");

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

    clearLocalAuthAccount();
    clearSocialHubState();
    clearSavedUserProfile();
    setSocialHub({ connections: [], battleHistory: [] });
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
    Alert.alert("Logged out", "You are back in guest mode. Create an account or log in any time to save progress again.");
  }

  function handleSocialLogin(provider: SocialProvider) {
    playUiSound("soft_ui");
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

  function addConnection() {
    if (!inviteName.trim()) {
      Alert.alert("Add someone", "Enter a name for the parent or friend you want to track.");
      return;
    }

    if (inviteEmail.trim() && !isValidEmail(inviteEmail)) {
      Alert.alert("Check the email", "Use a valid email address if you want to save one.");
      return;
    }

    const normalizedEmail = inviteEmail.trim().toLowerCase();
    const duplicate = socialHub.connections.some((connection) => {
      if (normalizedEmail && connection.email) {
        return connection.email.toLowerCase() === normalizedEmail;
      }

      return connection.name.trim().toLowerCase() === inviteName.trim().toLowerCase();
    });

    if (duplicate) {
      Alert.alert("Already added", "That parent or friend is already in your crew.");
      return;
    }

    playUiSound("soft_ui");
    const nextConnection = createSocialConnection({
      name: inviteName,
      relation: inviteRelation,
      email: inviteEmail,
      connectedWithAccount: Boolean(inviteEmail.trim()),
      existingCount: socialHub.connections.length
    });

    setSocialHub((current) => ({
      ...current,
      connections: [nextConnection, ...current.connections]
    }));
    setInviteName("");
    setInviteEmail("");
    setInviteRelation("friend");
  }

  async function sendAccountabilityReminder(connection: SocialConnection, kind: "daily" | "weekly") {
    playUiSound("soft_ui");
    const title = kind === "weekly"
      ? `${connection.name} has been away for a week`
      : `${connection.name} has not logged in today`;
    const body = kind === "weekly"
      ? `Check in with your ${startCaseRelation(connection.relation).toLowerCase()} and help them return to today's lessons.`
      : `A quick accountability reminder can help your ${startCaseRelation(connection.relation).toLowerCase()} stay on track today.`;

    await notifyAccountability(title, body);
    Alert.alert("Reminder sent", `${connection.name} now has a ${kind === "weekly" ? "weekly" : "daily"} accountability reminder queued.`);
  }

  function battleConnection(connection: SocialConnection) {
    if (!state.user) {
      return;
    }
    playUiSound("soft_ui");

    const battle = runBattle({
      user: state.user,
      userStars,
      opponent: connection
    });

    setSocialHub((current) => ({
      connections: current.connections.map((item) => item.id === connection.id ? battle.updatedConnection : item),
      battleHistory: [battle.result, ...current.battleHistory].slice(0, 10)
    }));

    Alert.alert(
      battle.result.winner === "user" ? "Battle won" : "Battle finished",
      `${state.user.displayName} ${battle.result.myScore} - ${battle.result.theirScore} ${connection.name}`
    );
  }

  function claimReviewHeartRestore() {
    if (!state.user) {
      return;
    }
    playUiSound("soft_ui");

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
    playUiSound("soft_ui");
    setReviewRestoreVisible(false);
    dispatch({ type: "open_shop" });
  }

  async function notifyAccountability(title: string, body: string) {
    if (typeof window === "undefined" || typeof Notification === "undefined") {
      return;
    }

    try {
      if (Notification.permission === "granted") {
        new Notification(title, { body });
        return;
      }

      if (!accountabilityPermissionAsked && Notification.permission !== "denied") {
        setAccountabilityPermissionAsked(true);
        const permission = await Notification.requestPermission();

        if (permission === "granted") {
          new Notification(title, { body });
        }
      }
    } catch {
      // Keep accountability available even if browser notifications are not supported.
    }
  }

  if (state.loading || !state.user) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.centerPane}>
          <Text style={styles.loadingText}>{strings.loadingPath}</Text>
        </View>
      </SafeAreaView>
    );
  }

  const showTopBar = !state.screen.startsWith("lesson_") && state.screen !== "assessment";
  const canContinueToNextLesson = Boolean(
    selectedNextNode &&
    (selectedNextNode.status === "current" || selectedNextNode.status === "available")
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.appShell}>
        {showTopBar && (
          <TopBar
            user={state.user}
            strings={strings}
            languageCode={getLanguageOption(currentLanguage).code}
            dailyProgress={Math.min(1, state.user.totalXp / Math.max(1, state.user.dailyGoalXp))}
            soundEnabled={state.user.soundEffectsEnabled !== false}
            onHome={goHomeScreen}
            onReview={openReviewScreen}
            onAccount={() => openAccountPanel()}
            onLanguage={() => {
              playUiSound("soft_ui");
              setPendingLanguage(currentLanguage);
              setLanguageModalVisible(true);
            }}
            onSocial={openSocialScreen}
            onShop={openShopScreen}
            onToggleSound={toggleSoundEffects}
          />
        )}
        {state.screen === "home" && (
          <HomeScreen
            user={state.user}
            strings={strings}
            language={currentLanguage}
            section={selectedSection}
            sections={localizedSections}
            nextNode={selectedNextNode}
            onSelectTopic={openTopicScreen}
            onContinueTopic={() => openTopicScreen(selectedSection.topicId)}
            onContinueLesson={() => {
              if (selectedNextNode) {
                void startLesson(selectedNextNode);
              } else {
                openTopicScreen(selectedSection.topicId);
              }
            }}
          />
        )}
        {state.screen === "topic" && (
          <TopicScreen
            user={state.user}
            learnerProfile={learnerProfile}
            strings={strings}
            language={currentLanguage}
            section={selectedSection}
            sections={localizedSections}
            branch={selectedBranch}
            xpSummary={state.xpSummary[0]}
            onBack={goHomeScreen}
            onSelectTopic={openTopicScreen}
            onSelectBranch={openBranchScreen}
            onContinueBranch={showSelectedBranchScreen}
            onStartPlacement={() => openFoundationAssessment("placement")}
            onStartReview={() => openFoundationAssessment("review")}
            onStartDailyChallenge={() => openFoundationAssessment("daily_challenge")}
            onSkipFoundation={skipFoundationAssessment}
            onExploreTopics={exploreTopicsFreely}
          />
        )}
        {state.screen === "branch" && (
          <BranchScreen
            user={state.user}
            learnerProfile={learnerProfile}
            strings={strings}
            language={currentLanguage}
            section={selectedSection}
            branch={selectedBranch}
            branches={selectedSection.branches}
            nodes={selectedNodes}
            onBack={showSelectedTopicScreen}
            onSelectBranch={openBranchScreen}
            onStartLesson={startLesson}
            onStartTestOut={startBranchTestOut}
            onOpenShop={openShopScreen}
            onClaimReward={claimJourneyReward}
          />
        )}
        {state.screen === "lesson_intro" && currentLessonSession && (
          <LessonIntroScreen
            language={currentLanguage}
            section={currentLessonSection}
            session={currentLessonSession}
            onBack={() => {
              playUiSound("soft_ui");
              dispatch({ type: "reset_lesson" });
            }}
            onStart={startLessonFlow}
          />
        )}
        {state.screen === "lesson_teach" && currentLessonSession && currentTeachMoment && (
          <LessonTeachScreen
            language={currentLanguage}
            section={currentLessonSection}
            lessonTitle={currentLessonSession.lesson.title}
            moment={currentTeachMoment}
            onBack={() => {
              playUiSound("soft_ui");
              dispatch({ type: "reset_lesson" });
            }}
            onContinue={continueFromTeach}
            onSoftTap={() => playUiSound("soft_ui")}
            onOpenSource={(url) => {
              playUiSound("soft_ui");
              void Linking.openURL(url);
            }}
          />
        )}
        {state.screen === "lesson_example" && currentLessonSession && currentExampleMoment && (
          <LessonExampleScreen
            language={currentLanguage}
            section={currentLessonSection}
            lessonTitle={currentLessonSession.lesson.title}
            moment={currentExampleMoment}
            onBack={goBackToTeach}
            onContinue={continueFromExample}
            onSoftTap={() => playUiSound("soft_ui")}
            onOpenSource={(url) => {
              playUiSound("soft_ui");
              void Linking.openURL(url);
            }}
          />
        )}
        {state.screen === "lesson_practice" && currentLessonSession && currentPracticeActivity && (
          <LessonPracticeScreen
            language={currentLanguage}
            section={currentLessonSection}
            lessonTitle={currentLessonSession.lesson.title}
            activity={currentPracticeActivity}
            onBack={goBackToExample}
            onContinue={continueFromPractice}
            onSoftTap={() => playUiSound("soft_ui")}
            onPracticeResult={(correct) => playUiSound(correct ? "correct" : "wrong")}
          />
        )}
        {state.screen === "lesson_question" && currentLessonSession && (
          <QuestionScreen
            language={currentLanguage}
            section={currentLessonSection}
            session={currentLessonSession}
            challengeIndex={state.challengeIndex}
            selectedChoiceId={state.selectedChoiceId}
            retrying={state.retryingCurrentChallenge}
            onSelectChoice={(choiceId) => {
              playUiSound("soft_ui");
              dispatch({ type: "select_choice", choiceId });
            }}
            onAnswer={answerChallenge}
            onExit={() => {
              playUiSound("soft_ui");
              dispatch({ type: "reset_lesson" });
            }}
          />
        )}
        {state.screen === "lesson_feedback" && currentLessonSession && (
          <AnswerFeedbackScreen
            strings={strings}
            language={currentLanguage}
            session={currentLessonSession}
            challengeIndex={state.challengeIndex}
            answerState={state.answerState}
            retried={state.lastAnswerWasRetry}
            selectedChoiceId={state.selectedChoiceId}
            onContinue={continueFromFeedback}
          />
        )}
        {state.screen === "lesson_help" && currentLessonSession && (
          <LessonHelpScreen
            strings={strings}
            language={currentLanguage}
            section={currentLessonSection}
            session={currentLessonSession}
            challengeIndex={state.challengeIndex}
            onContinue={() => void continueLesson()}
            onRetry={retryCurrentChallenge}
            onOpenSource={(url) => {
              playUiSound("soft_ui");
              void Linking.openURL(url);
            }}
          />
        )}
        {state.screen === "lesson_complete" && lessonCompleteSummary && (
          <LessonCompleteScreen
            strings={strings}
            language={currentLanguage}
            section={selectedSection}
            summary={lessonCompleteSummary}
            nextNode={canContinueToNextLesson ? selectedNextNode : undefined}
            onContinue={() => {
              setLessonCompleteSummary(undefined);
              if (canContinueToNextLesson && selectedNextNode) {
                void startLesson(selectedNextNode);
                return;
              }
              dispatch({ type: "close_lesson_complete" });
            }}
            onReturnToPath={() => {
              playUiSound("soft_ui");
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
            onChangeSelectedAnswer={updateAssessmentSelection}
            onChangeConfidence={updateAssessmentConfidence}
            onSubmit={submitAssessmentAnswer}
            onContinue={continueAssessment}
            onExit={closeAssessment}
          />
        )}
        {state.screen === "review" && (
          <ReviewScreen
            user={state.user}
            learnerProfile={learnerProfile}
            language={currentLanguage}
            strings={strings}
            onBack={closeReviewScreen}
            onStartPlacement={() => openFoundationAssessment("placement")}
            onStartReview={() => openFoundationAssessment("review")}
            onStartDailyChallenge={() => openFoundationAssessment("daily_challenge")}
            onGoFoundation={() => openTopicScreen("foundation")}
          />
        )}
        {state.screen === "profile" && (
          <ProfileScreen
            user={state.user}
            strings={strings}
            learnerProfile={learnerProfile}
            onBack={closeProfileScreen}
            onOpenSettings={openSettingsModal}
            onOpenCrew={openSocialScreen}
            onOpenShop={openShopScreen}
          />
        )}
        {state.screen === "shop" && (
          <ShopScreen
            user={state.user}
            strings={strings}
            items={SHOP_ITEMS}
            section={selectedSection}
            onUseItem={useShopItem}
            onDone={() => {
              playUiSound("soft_ui");
              dispatch({ type: "close_shop" });
            }}
          />
        )}
        {state.screen === "social" && (
          <SocialScreen
            user={state.user}
            userStars={userStars}
            leaderboard={leaderboard}
            connections={socialHub.connections}
            battleHistory={socialHub.battleHistory}
            alerts={accountabilityAlerts}
            inviteName={inviteName}
            inviteEmail={inviteEmail}
            inviteRelation={inviteRelation}
            onChangeInviteName={setInviteName}
            onChangeInviteEmail={setInviteEmail}
            onChangeInviteRelation={setInviteRelation}
            onAddConnection={addConnection}
            onBattle={battleConnection}
            onSendReminder={sendAccountabilityReminder}
            onDone={() => {
              playUiSound("soft_ui");
              dispatch({ type: "close_social" });
            }}
          />
        )}
        <AdBanner hidden={state.user.hearts.unlimited || state.screen.startsWith("lesson_")} />
        <AccountModal
          visible={accountModalVisible}
          onClose={() => setAccountModalVisible(false)}
          strings={strings}
          mode={authMode}
          hasSavedAccount={hasSavedAccount}
          onChangeMode={setAuthMode}
          onCreate={createAccount}
          onLogin={loginAccount}
          onSocialLogin={handleSocialLogin}
          accountName={accountName}
          accountEmail={accountEmail}
          accountPassword={accountPassword}
          onChangeName={setAccountName}
          onChangeEmail={setAccountEmail}
          onChangePassword={setAccountPassword}
        />
        <SettingsModal
          visible={settingsModalVisible}
          strings={strings}
          language={currentLanguage}
          role={settingsRole}
          dailyReminder={settingsDailyReminder}
          weeklyReminder={settingsWeeklyReminder}
          streakReminder={settingsStreakReminder}
          islamicReminder={settingsIslamicReminder}
          soundEnabled={settingsSoundEnabled}
          reducedSound={settingsReducedSound}
          onClose={() => setSettingsModalVisible(false)}
          onSelectRole={setSettingsRole}
          onToggleDaily={() => setSettingsDailyReminder((value) => !value)}
          onToggleWeekly={() => setSettingsWeeklyReminder((value) => !value)}
          onToggleStreak={() => setSettingsStreakReminder((value) => !value)}
          onToggleIslamic={() => setSettingsIslamicReminder((value) => !value)}
          onToggleSound={() => setSettingsSoundEnabled((value) => !value)}
          onToggleReducedSound={() => setSettingsReducedSound((value) => !value)}
          onLogout={logoutAccount}
          onSave={saveAccountSettings}
        />
        <CelebrationModal
          visible={Boolean(rewardCelebration)}
          celebration={rewardCelebration}
          onClose={() => setRewardCelebration(undefined)}
        />
        <ReviewRestoreModal
          visible={reviewRestoreVisible}
          strings={strings}
          onClose={skipReviewHeartRestore}
          onRestore={claimReviewHeartRestore}
        />
        <LanguageModal
          visible={languageModalVisible}
          strings={strings}
          selectedLanguage={pendingLanguage}
          canClose={Boolean(state.user.preferredLanguage)}
          onClose={() => setLanguageModalVisible(false)}
          onSelectLanguage={setPendingLanguage}
          onSave={() => savePreferredLanguage(pendingLanguage)}
        />
      </View>
    </SafeAreaView>
  );
}

function ScreenHeader({
  title,
  subtitle,
  onBack,
  actionLabel,
  onAction
}: {
  title: string;
  subtitle?: string;
  onBack: () => void;
  actionLabel?: string;
  onAction?: () => void;
}) {
  return (
    <View style={styles.screenHeader}>
      <Pressable onPress={onBack} style={styles.screenBackButton}>
        <Text style={styles.screenBackButtonText}>Back</Text>
      </Pressable>
      <View style={styles.screenHeaderText}>
        <Text style={styles.screenHeaderTitle}>{title}</Text>
        {subtitle ? <Text style={styles.screenHeaderSubtitle}>{subtitle}</Text> : null}
      </View>
      {actionLabel && onAction ? (
        <Pressable onPress={onAction} style={styles.screenActionButton}>
          <Text style={styles.screenActionButtonText}>{actionLabel}</Text>
        </Pressable>
      ) : (
        <View style={styles.screenActionSpacer} />
      )}
    </View>
  );
}

function HomeScreen({
  user,
  strings,
  language,
  section,
  sections,
  nextNode,
  onSelectTopic,
  onContinueTopic,
  onContinueLesson
}: {
  user: UserProfile;
  strings: UiStrings;
  language: SupportedLanguage;
  section: LearningSection;
  sections: LearningSection[];
  nextNode?: LearningNodeView;
  onSelectTopic: (topicId: TopicId) => void;
  onContinueTopic: () => void;
  onContinueLesson: () => void;
}) {
  return (
    <ScrollView contentContainerStyle={styles.screenScrollContent} showsVerticalScrollIndicator={false}>
      <HeroCard
        section={section}
        strings={strings}
        language={language}
        progress={Math.min(1, user.totalXp / Math.max(1, user.dailyGoalXp))}
        gainedXp={user.totalXp}
        earnedStars={getSectionStars(user, section)}
        branchProgress={getBranchCompletionRatio(user, section, section.branches[0]?.id ?? "")}
        nextLessonTitle={nextNode?.title}
        onContinue={onContinueLesson}
      />

      <View style={styles.focusPanel}>
        <Text style={styles.focusPanelEyebrow}>Continue learning</Text>
        <Text style={styles.focusPanelTitle}>{nextNode?.title ?? section.title}</Text>
        <Text style={styles.focusPanelCopy}>
          {translateStudyText("One clear step at a time. Open your topic, pick a branch, and keep the streak alive.", language)}
        </Text>
        <View style={styles.focusPanelButtonRow}>
          <Pressable onPress={onContinueTopic} style={styles.focusPrimaryButton}>
            <Text style={styles.focusPrimaryButtonText}>{strings.continueTopic}</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.sectionHeaderSimple}>
        <Text style={styles.sectionTitle}>{strings.chooseTopic}</Text>
        <Text style={styles.sectionDescription}>{translateStudyText("Pick one world and let the path guide you.", language)}</Text>
      </View>

      <View style={styles.topicGrid}>
        {sections.map((topic) => (
          <TopicCard
            key={topic.topicId}
            section={topic}
            strings={strings}
            earnedStars={getSectionStars(user, topic)}
            selected={topic.topicId === section.topicId}
            onPress={() => onSelectTopic(topic.topicId)}
          />
        ))}
      </View>
    </ScrollView>
  );
}

function TopicScreen({
  user,
  learnerProfile,
  strings,
  language,
  section,
  sections,
  branch,
  xpSummary,
  onBack,
  onSelectTopic,
  onSelectBranch,
  onContinueBranch,
  onStartPlacement,
  onStartReview,
  onStartDailyChallenge,
  onSkipFoundation,
  onExploreTopics
}: {
  user: UserProfile;
  learnerProfile: NonNullable<UserProfile["learnerProfile"]>;
  strings: UiStrings;
  language: SupportedLanguage;
  section: LearningSection;
  sections: LearningSection[];
  branch: LearningBranch;
  xpSummary?: XpSummary;
  onBack: () => void;
  onSelectTopic: (topicId: TopicId) => void;
  onSelectBranch: (branchId: string) => void;
  onContinueBranch: () => void;
  onStartPlacement: () => void;
  onStartReview: () => void;
  onStartDailyChallenge: () => void;
  onSkipFoundation: () => void;
  onExploreTopics: () => void;
}) {
  const nextNode = section.nodes.find((node) => node.branchId === branch.id);
  const shouldRecommendFoundation = !learnerProfile.assessmentCompleted && section.topicId !== "foundation";

  return (
    <ScrollView contentContainerStyle={styles.screenScrollContent} showsVerticalScrollIndicator={false}>
      <ScreenHeader
        title={section.title}
        subtitle={translateStudyText("Choose a branch and keep moving with one guided path.", language)}
        onBack={onBack}
      />

      <HeroCard
        section={section}
        strings={strings}
        language={language}
        progress={Math.min(1, user.totalXp / Math.max(1, user.dailyGoalXp))}
        gainedXp={xpSummary?.gainedXp ?? user.totalXp}
        earnedStars={getSectionStars(user, section)}
        branchProgress={getBranchCompletionRatio(user, section, branch.id)}
        nextLessonTitle={nextNode?.title}
        onContinue={onContinueBranch}
      />

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.topicRow}>
        {sections.map((topic) => (
          <TopicCard
            key={topic.topicId}
            section={topic}
            strings={strings}
            earnedStars={getSectionStars(user, topic)}
            selected={topic.topicId === section.topicId}
            onPress={() => onSelectTopic(topic.topicId)}
          />
        ))}
      </ScrollView>

      <View style={styles.sectionHeaderSimple}>
        <Text style={styles.sectionTitle}>{strings.chooseBranch}</Text>
        <Text style={styles.sectionDescription}>{translateStudyText("Each branch is its own guided path.", language)}</Text>
      </View>

      <View style={styles.branchListColumn}>
        {section.branches.map((item) => {
          const lessonCount = section.nodes.filter((node) => node.branchId === item.id).length;
          const progress = getBranchCompletionRatio(user, section, item.id);
          const selected = item.id === branch.id;

          return (
            <Pressable
              key={item.id}
              onPress={() => onSelectBranch(item.id)}
              style={[
                styles.branchListCard,
                selected && { borderColor: section.accentColor, backgroundColor: lightenColor(section.accentColor, 0.94) }
              ]}
            >
              <View style={styles.branchListCardTop}>
                <Text style={styles.branchListTitle}>{item.title}</Text>
                <Text style={styles.branchListMeta}>{`${Math.round(progress * 100)}%`}</Text>
              </View>
              <Text style={styles.branchListCopy}>{item.description}</Text>
              <View style={styles.branchListMetaRow}>
                <Text style={styles.branchListMeta}>{`${lessonCount} ${strings.lessons}`}</Text>
                {item.premiumOnly ? <Text style={styles.branchListMeta}>Premium</Text> : null}
              </View>
              <AnimatedProgressBar progress={progress} color={section.accentColor} trackColor={lightenColor(section.accentColor, 0.92)} />
            </Pressable>
          );
        })}
      </View>

      {section.topicId === "foundation" && (
        <FoundationDashboard
          profile={learnerProfile}
          onStartPlacement={onStartPlacement}
          onStartReview={onStartReview}
          onStartDailyChallenge={onStartDailyChallenge}
          onSkipAssessment={onSkipFoundation}
          onExploreFreely={onExploreTopics}
        />
      )}

      {shouldRecommendFoundation && (
        <View style={styles.foundationFreePlayBanner}>
          <View style={styles.foundationFreePlayText}>
            <Text style={styles.foundationFreePlayTitle}>{translateStudyText("Foundation can still help", language)}</Text>
            <Text style={styles.foundationFreePlayCopy}>
              {translateStudyText("You can keep exploring, but a short placement check will sharpen the path and review system.", language)}
            </Text>
          </View>
          <Pressable onPress={onStartPlacement} style={styles.foundationFreePlayButton}>
            <Text style={styles.foundationFreePlayButtonText}>{translateStudyText("Take foundation now", language)}</Text>
          </Pressable>
        </View>
      )}
    </ScrollView>
  );
}

function BranchScreen({
  user,
  learnerProfile,
  strings,
  language,
  section,
  branch,
  branches,
  nodes,
  onBack,
  onSelectBranch,
  onStartLesson,
  onStartTestOut,
  onOpenShop,
  onClaimReward
}: {
  user: UserProfile;
  learnerProfile: NonNullable<UserProfile["learnerProfile"]>;
  strings: UiStrings;
  language: SupportedLanguage;
  section: LearningSection;
  branch: LearningBranch;
  branches: LearningBranch[];
  nodes: LearningNodeView[];
  onBack: () => void;
  onSelectBranch: (branchId: string) => void;
  onStartLesson: (node: LearningNodeView) => void;
  onStartTestOut: () => void;
  onOpenShop: () => void;
  onClaimReward: (stop: JourneyRewardStop) => void;
}) {
  const earnedStars = getSectionStars(user, section);
  const branchProgress = getBranchCompletionRatio(user, section, branch.id);
  const nextNode = nodes.find((node) => node.status === "current") ?? nodes.find((node) => node.status === "available") ?? nodes[0];
  const journeyRewards = getJourneyRewardStops(user, section, branch, nodes);
  const topicNeedsReview = topicNeedsReviewHint(section.topicId, learnerProfile);
  const currentCluster = getCurrentTestOutCluster(nodes);
  const pathTheme = getTopicPathTheme(section.topicId, section.accentColor);

  return (
    <ScrollView contentContainerStyle={styles.screenScrollContent} showsVerticalScrollIndicator={false}>
      <ScreenHeader
        title={branch.title}
        subtitle={translateStudyText("Follow the path circle by circle.", language)}
        onBack={onBack}
        actionLabel={strings.continueTopic}
        onAction={() => nextNode && onStartLesson(nextNode)}
      />

      <View style={[styles.branchHeroCard, { borderColor: lightenColor(pathTheme.primary, 0.78), backgroundColor: pathTheme.shell }]}>
        <View style={[styles.branchHeroGlow, { backgroundColor: withAlpha(pathTheme.secondary, 0.16) }]} />
        <View style={[styles.branchHeroGlow, styles.branchHeroGlowRight, { backgroundColor: withAlpha(pathTheme.candy, 0.14) }]} />
        <View style={styles.branchHeroText}>
          <Text style={styles.routeBadge}>{section.badge}</Text>
          <Text style={styles.routeTitle}>{branch.title}</Text>
          <Text style={styles.routeDescription}>{branch.description}</Text>
          <AnimatedProgressBar progress={branchProgress} color={section.accentColor} trackColor={lightenColor(section.accentColor, 0.93)} />
          <Text style={styles.branchHeroMeta}>{`${Math.round(branchProgress * 100)}% complete • ${earnedStars}/${section.starsTarget} ${strings.stars}`}</Text>
        </View>
        <GuideMascot variant={section.mascot} accentColor={section.accentColor} size={100} />
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.branchRow}>
        {branches.map((item) => (
          <Pressable
            key={item.id}
            onPress={() => onSelectBranch(item.id)}
            style={[
              styles.branchChip,
              item.id === branch.id && { borderColor: section.accentColor, backgroundColor: lightenColor(section.accentColor, 0.92) }
            ]}
          >
            <Text style={styles.branchChipText}>{item.title}</Text>
          </Pressable>
        ))}
      </ScrollView>

      <View style={[styles.focusPanelCompact, { borderColor: lightenColor(pathTheme.primary, 0.78), backgroundColor: withAlpha(pathTheme.shell, 0.96) }]}>
        <View style={[styles.focusPanelGlow, { backgroundColor: withAlpha(pathTheme.glow, 0.22) }]} />
        <Text style={styles.focusPanelEyebrow}>{translateStudyText("Recommended next step", language)}</Text>
        <Text style={styles.focusPanelTitle}>{nextNode?.title ?? branch.title}</Text>
        <Text style={styles.focusPanelCopy}>
          {topicNeedsReview
            ? translateStudyText("This branch has a few review signals, so keep the pace steady and let the path guide you.", language)
            : translateStudyText("Tap the bright lesson circle and keep the branch flowing.", language)}
        </Text>
        <View style={styles.focusPanelButtonRow}>
          <Pressable onPress={() => nextNode && onStartLesson(nextNode)} style={styles.focusPrimaryButton}>
            <Text style={styles.focusPrimaryButtonText}>{strings.continueTopic}</Text>
          </Pressable>
          <Pressable onPress={onStartTestOut} style={styles.focusSecondaryButton}>
            <Text style={styles.focusSecondaryButtonText}>{currentCluster ? `Test out ${currentCluster.label}` : "Test out"}</Text>
          </Pressable>
        </View>
      </View>

      <View style={[styles.cleanPathCard, { borderColor: lightenColor(pathTheme.primary, 0.8), backgroundColor: pathTheme.shell }]}>
        <PathBackdropDecor theme={pathTheme} topicId={section.topicId} compact />
        <View style={[styles.pathBackdropAura, { backgroundColor: withAlpha(pathTheme.glow, 0.28) }]} />
        <View style={[styles.pathBackdropShell, { backgroundColor: withAlpha(pathTheme.secondary, 0.24) }]} />
        <View style={[styles.pathBackdrop, { backgroundColor: pathTheme.lane }]} />
        <View style={styles.cleanPathLane}>
          {nodes.map((node, index) => (
            <View key={node.id}>
              <PathNode
                node={node}
                index={index}
                isLast={index === nodes.length - 1}
                accentColor={section.accentColor}
                theme={pathTheme}
                reviewNeeded={topicNeedsReview && node.kind === "review"}
                onPress={() => onStartLesson(node)}
              />
              {journeyRewards
                .filter((reward) => reward.id.endsWith(`_${index}`))
                .map((reward) => (
                  <RewardChestStop key={reward.id} reward={reward} accentColor={section.accentColor} theme={pathTheme} onPress={() => onClaimReward(reward)} />
                ))}
            </View>
          ))}
        </View>
      </View>

      {!user.hearts.unlimited && user.hearts.current <= 2 && (
        <Pressable onPress={onOpenShop} style={styles.heartsPrompt}>
          <Text style={styles.heartsPromptTitle}>Low on hearts</Text>
          <Text style={styles.heartsPromptCopy}>Recover one by watching a sponsor break or pick up a heart pack.</Text>
        </Pressable>
      )}
    </ScrollView>
  );
}

function TeachingMomentCard({
  moment,
  accentColor,
  language,
  onSoftTap,
  onOpenSource
}: {
  moment: LessonTeachingMoment;
  accentColor: string;
  language: SupportedLanguage;
  onSoftTap: () => void;
  onOpenSource: (url: string) => void;
}) {
  const [revealed, setRevealed] = useState(false);
  const tone = getTeachingMomentTone(moment.kind, accentColor);

  return (
    <View style={[styles.teachingMomentCard, { borderColor: tone.border, backgroundColor: tone.background }]}>
      <View style={styles.teachingMomentTop}>
        <Text style={[styles.teachingMomentEyebrow, { color: tone.eyebrow }]}>{moment.eyebrow}</Text>
        <View style={[styles.teachingMomentKindPill, { backgroundColor: tone.pillBackground }]}>
          <Text style={[styles.teachingMomentKindText, { color: tone.pillText }]}>{getTeachingMomentLabel(moment.kind, language)}</Text>
        </View>
      </View>
      <Text style={styles.teachingMomentTitle}>{moment.title}</Text>
      <Text style={styles.teachingMomentBody}>{moment.body}</Text>
      <View style={styles.teachingMomentActionRow}>
        {moment.actionUrl ? (
          <Pressable
            onPress={() => {
              onSoftTap();
              onOpenSource(moment.actionUrl!);
            }}
            style={[styles.teachingMomentActionButton, { backgroundColor: tone.actionBackground }]}
          >
            <Text style={[styles.teachingMomentActionText, { color: tone.actionText }]}>
              {moment.actionLabel ?? getTeachingMomentLabel(moment.kind, language)}
            </Text>
          </Pressable>
        ) : null}
        {moment.revealBody ? (
          <Pressable
            onPress={() => {
              onSoftTap();
              setRevealed((current) => !current);
            }}
            style={styles.teachingMomentGhostButton}
          >
            <Text style={styles.teachingMomentGhostText}>
              {revealed
                ? translateStudyText("Hide the takeaway", language)
                : moment.revealLabel ?? translateStudyText("Tap to reveal", language)}
            </Text>
          </Pressable>
        ) : null}
      </View>
      {revealed && moment.revealBody ? (
        <View style={styles.teachingMomentRevealCard}>
          <Text style={styles.teachingMomentRevealText}>{moment.revealBody}</Text>
        </View>
      ) : null}
    </View>
  );
}

function PracticeActivityCard({
  activity,
  accentColor,
  language,
  onSoftTap,
  onPracticeResult,
  onResolved
}: {
  activity: LessonPracticeActivity;
  accentColor: string;
  language: SupportedLanguage;
  onSoftTap: () => void;
  onPracticeResult: (correct: boolean) => void;
  onResolved?: (resolved: boolean, correct: boolean) => void;
}) {
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | undefined>(undefined);
  const [selectedOrderIds, setSelectedOrderIds] = useState<string[]>([]);
  const [checked, setChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | undefined>(undefined);

  const selectedOrderLabels = selectedOrderIds
    .map((id) => activity.options.find((option) => option.id === id)?.label)
    .filter(Boolean) as string[];

  const unusedOptions = activity.kind === "sequence"
    ? activity.options.filter((option) => !selectedOrderIds.includes(option.id))
    : activity.options;

  const readyToCheck = activity.kind === "sequence"
    ? selectedOrderIds.length === Math.max(1, activity.correctOrderIds?.length ?? activity.options.length)
    : Boolean(selectedChoiceId);

  function resetPractice() {
    onSoftTap();
    setSelectedChoiceId(undefined);
    setSelectedOrderIds([]);
    setChecked(false);
    setIsCorrect(undefined);
    onResolved?.(false, false);
  }

  function checkPractice() {
    if (!readyToCheck) {
      return;
    }

    onSoftTap();
    const correct = activity.kind === "sequence"
      ? JSON.stringify(selectedOrderIds) === JSON.stringify(activity.correctOrderIds ?? [])
      : selectedChoiceId === activity.correctChoiceId;

    setChecked(true);
    setIsCorrect(correct);
    onPracticeResult(correct);
    onResolved?.(true, correct);
  }

  return (
    <View style={[styles.practiceCard, checked && isCorrect === true && styles.practiceCardGood, checked && isCorrect === false && styles.practiceCardBad]}>
      <View style={styles.practiceCardTop}>
        <Text style={styles.practiceCardEyebrow}>{translateStudyText("Practice first", language)}</Text>
        <View style={[styles.practiceKindPill, { backgroundColor: lightenColor(accentColor, 0.9) }]}>
          <Text style={[styles.practiceKindText, { color: darkenColor(accentColor) }]}>{getPracticeActivityLabel(activity.kind, language)}</Text>
        </View>
      </View>
      <Text style={styles.practiceCardTitle}>{activity.title}</Text>
      <Text style={styles.practiceCardPrompt}>{activity.prompt}</Text>
      <Text style={styles.practiceCardInstructions}>{activity.instructions}</Text>

      {activity.kind === "sequence" ? (
        <>
          <View style={styles.sequencePreviewCard}>
            <Text style={styles.sequencePreviewLabel}>{translateStudyText("Your order", language)}</Text>
            {selectedOrderLabels.length ? (
              <View style={styles.sequenceChosenRow}>
                {selectedOrderLabels.map((label, index) => (
                  <View key={`${activity.id}_${label}_${index}`} style={[styles.sequenceChosenChip, { borderColor: lightenColor(accentColor, 0.82), backgroundColor: lightenColor(accentColor, 0.94) }]}>
                    <Text style={styles.sequenceChosenCount}>{index + 1}</Text>
                    <Text style={styles.sequenceChosenText}>{label}</Text>
                  </View>
                ))}
              </View>
            ) : (
              <Text style={styles.sequencePreviewHint}>{translateStudyText("Tap the steps in order to build the sequence.", language)}</Text>
            )}
          </View>
          <View style={styles.practiceOptionsWrap}>
            {unusedOptions.map((option) => (
              <Pressable
                key={option.id}
                disabled={checked}
                onPress={() => {
                  onSoftTap();
                  setSelectedOrderIds((current) => [...current, option.id]);
                }}
                style={[styles.practiceOptionButton, { borderColor: lightenColor(accentColor, 0.82) }]}
              >
                <Text style={styles.practiceOptionText}>{option.label}</Text>
              </Pressable>
            ))}
          </View>
        </>
      ) : (
        <View style={styles.practiceOptionsWrap}>
          {unusedOptions.map((option) => {
            const selected = option.id === selectedChoiceId;

            return (
              <Pressable
                key={option.id}
                disabled={checked}
                onPress={() => {
                  onSoftTap();
                  setSelectedChoiceId(option.id);
                }}
                style={[
                  styles.practiceOptionButton,
                  { borderColor: selected ? accentColor : "#D6E5DD", backgroundColor: selected ? lightenColor(accentColor, 0.92) : "#FFFFFF" }
                ]}
              >
                <Text style={styles.practiceOptionText}>{option.label}</Text>
              </Pressable>
            );
          })}
        </View>
      )}

      <View style={styles.practiceActionRow}>
        <Pressable onPress={resetPractice} style={styles.practiceResetButton}>
          <Text style={styles.practiceResetText}>{translateStudyText("Reset", language)}</Text>
        </Pressable>
        <Pressable
          onPress={checkPractice}
          disabled={!readyToCheck}
          style={[styles.practiceCheckButton, { backgroundColor: accentColor }, !readyToCheck && styles.primaryButtonDisabled]}
        >
          <Text style={styles.practiceCheckText}>{translateStudyText("Check practice", language)}</Text>
        </Pressable>
      </View>

      {checked && isCorrect !== undefined ? (
        <View style={[styles.practiceFeedbackCard, isCorrect ? styles.practiceFeedbackGood : styles.practiceFeedbackBad]}>
          <Text style={[styles.practiceFeedbackTitle, isCorrect ? styles.feedbackTitleGood : styles.feedbackTitleBad]}>
            {isCorrect
              ? activity.successLabel ?? translateStudyText("Nice work", language)
              : activity.retryLabel ?? translateStudyText("Try once more", language)}
          </Text>
          <Text style={styles.practiceFeedbackCopy}>{activity.explanation}</Text>
        </View>
      ) : null}
    </View>
  );
}

function LessonIntroScreen({
  language,
  section,
  session,
  onBack,
  onStart
}: {
  language: SupportedLanguage;
  section: LearningSection;
  session: LessonSession;
  onBack: () => void;
  onStart: () => void;
}) {
  const estimatedMinutes = Math.max(2, Math.ceil(session.lesson.challenges.length * 0.75));
  const difficulty = session.lesson.difficulty ?? 1;

  return (
    <View style={styles.lessonStageScreen}>
      <ScreenHeader
        title={session.lesson.title}
        subtitle={translateStudyText("One small lesson path. We teach first, then you answer.", language)}
        onBack={onBack}
      />
      <LessonStageRail currentStep={1} totalSteps={4} accentColor={section.accentColor} />
      <View style={[styles.lessonFocusCard, { borderColor: lightenColor(section.accentColor, 0.82), backgroundColor: lightenColor(section.accentColor, 0.96) }]}>
        <View style={styles.lessonFocusBadgeRow}>
          <Text style={styles.lessonStageEyebrow}>{translateStudyText("Lesson intro", language)}</Text>
          <View style={[styles.lessonFocusPill, { backgroundColor: lightenColor(section.accentColor, 0.88) }]}>
            <Text style={[styles.lessonFocusPillText, { color: darkenColor(section.accentColor) }]}>{translateStudyText("Ready", language)}</Text>
          </View>
        </View>
        <GuideMascot variant={section.mascot} accentColor={section.accentColor} size={118} />
        <Text style={styles.lessonStageTitle}>{session.lesson.title}</Text>
        <Text style={styles.lessonStageCopy}>{session.lesson.whatYouWillLearn ?? session.lesson.intro}</Text>
        <View style={styles.lessonStageMetaRow}>
          <View style={styles.lessonStageMetaChip}>
            <Text style={styles.lessonStageMetaLabel}>{translateStudyText("Difficulty", language)}</Text>
            <Text style={styles.lessonStageMetaValue}>{`Level ${difficulty}`}</Text>
          </View>
          <View style={styles.lessonStageMetaChip}>
            <Text style={styles.lessonStageMetaLabel}>{translateStudyText("Reward", language)}</Text>
            <Text style={styles.lessonStageMetaValue}>{`+${session.lesson.xpReward} XP`}</Text>
          </View>
          <View style={styles.lessonStageMetaChip}>
            <Text style={styles.lessonStageMetaLabel}>{translateStudyText("Time", language)}</Text>
            <Text style={styles.lessonStageMetaValue}>{`${estimatedMinutes} min`}</Text>
          </View>
        </View>
        <Pressable onPress={onStart} style={[styles.primaryButton, styles.lessonFocusPrimaryButton, { backgroundColor: section.accentColor }]}>
          <Text style={styles.primaryButtonText}>{translateStudyText("Start lesson", language)}</Text>
        </Pressable>
      </View>
    </View>
  );
}

function LessonTeachScreen({
  language,
  section,
  lessonTitle,
  moment,
  onBack,
  onContinue,
  onSoftTap,
  onOpenSource
}: {
  language: SupportedLanguage;
  section: LearningSection;
  lessonTitle: string;
  moment: LessonTeachingMoment;
  onBack: () => void;
  onContinue: () => void;
  onSoftTap: () => void;
  onOpenSource: (url: string) => void;
}) {
  return (
    <ScrollView contentContainerStyle={styles.lessonFlowContent} showsVerticalScrollIndicator={false}>
      <ScreenHeader
        title={lessonTitle}
        subtitle={translateStudyText("Step 1 of 3: learn one clear idea before the practice starts.", language)}
        onBack={onBack}
      />
      <LessonStageRail currentStep={2} totalSteps={4} accentColor={section.accentColor} />
      <View style={[styles.lessonTeachStageCard, { borderColor: lightenColor(section.accentColor, 0.82) }]}>
        <View style={styles.lessonFocusBadgeRow}>
          <Text style={styles.lessonStageEyebrow}>{translateStudyText("Teach", language)}</Text>
          <View style={[styles.lessonFocusPill, { backgroundColor: lightenColor(section.accentColor, 0.88) }]}>
            <Text style={[styles.lessonFocusPillText, { color: darkenColor(section.accentColor) }]}>{translateStudyText("Core idea", language)}</Text>
          </View>
        </View>
        <GuideMascot variant={section.mascot} accentColor={section.accentColor} size={104} />
        <Text style={styles.lessonTeachTitle}>{moment.title}</Text>
        <Text style={styles.lessonTeachCopy}>{moment.body}</Text>
        {moment.actionUrl ? (
          <Pressable
            onPress={() => {
              onSoftTap();
              onOpenSource(moment.actionUrl!);
            }}
            style={[styles.lessonLightLinkCard, { borderColor: lightenColor(section.accentColor, 0.82) }]}
          >
            <Text style={styles.lessonLightLinkEyebrow}>{moment.kind === "watch" ? translateStudyText("Watch this", language) : translateStudyText("Read this", language)}</Text>
            <Text style={styles.lessonLightLinkTitle}>{moment.actionLabel ?? translateStudyText("Open support", language)}</Text>
          </Pressable>
        ) : null}
        <Pressable onPress={onContinue} style={[styles.primaryButton, styles.lessonFlowPrimaryButton, { backgroundColor: section.accentColor }]}>
          <Text style={styles.primaryButtonText}>{translateStudyText("Continue", language)}</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

function LessonExampleScreen({
  language,
  section,
  lessonTitle,
  moment,
  onBack,
  onContinue,
  onSoftTap,
  onOpenSource
}: {
  language: SupportedLanguage;
  section: LearningSection;
  lessonTitle: string;
  moment: LessonTeachingMoment;
  onBack: () => void;
  onContinue: () => void;
  onSoftTap: () => void;
  onOpenSource: (url: string) => void;
}) {
  return (
    <ScrollView contentContainerStyle={styles.lessonFlowContent} showsVerticalScrollIndicator={false}>
      <ScreenHeader
        title={lessonTitle}
        subtitle={translateStudyText("Step 2 of 3: see one example before the practice screen.", language)}
        onBack={onBack}
      />
      <LessonStageRail currentStep={2} totalSteps={4} accentColor={section.accentColor} />
      <TeachingMomentCard
        moment={moment}
        accentColor={section.accentColor}
        language={language}
        onSoftTap={onSoftTap}
        onOpenSource={onOpenSource}
      />
      <Pressable onPress={onContinue} style={[styles.primaryButton, styles.lessonFlowPrimaryButton, { backgroundColor: section.accentColor }]}>
        <Text style={styles.primaryButtonText}>{translateStudyText("Try it", language)}</Text>
      </Pressable>
    </ScrollView>
  );
}

function LessonPracticeScreen({
  language,
  section,
  lessonTitle,
  activity,
  onBack,
  onContinue,
  onSoftTap,
  onPracticeResult
}: {
  language: SupportedLanguage;
  section: LearningSection;
  lessonTitle: string;
  activity: LessonPracticeActivity;
  onBack: () => void;
  onContinue: () => void;
  onSoftTap: () => void;
  onPracticeResult: (correct: boolean) => void;
}) {
  const [practiceResolved, setPracticeResolved] = useState(false);

  return (
    <ScrollView contentContainerStyle={styles.lessonFlowContent} showsVerticalScrollIndicator={false}>
      <ScreenHeader
        title={lessonTitle}
        subtitle={translateStudyText("Step 3 of 3: practice lightly, then answer for real.", language)}
        onBack={onBack}
      />
      <LessonStageRail currentStep={3} totalSteps={4} accentColor={section.accentColor} />
      <PracticeActivityCard
        activity={activity}
        accentColor={section.accentColor}
        language={language}
        onSoftTap={onSoftTap}
        onPracticeResult={onPracticeResult}
        onResolved={(resolved) => setPracticeResolved(resolved)}
      />
      <Pressable
        onPress={onContinue}
        disabled={!practiceResolved}
        style={[
          styles.primaryButton,
          styles.lessonFlowPrimaryButton,
          { backgroundColor: section.accentColor },
          !practiceResolved && styles.primaryButtonDisabled
        ]}
      >
        <Text style={styles.primaryButtonText}>{translateStudyText("Go to question", language)}</Text>
      </Pressable>
      {!practiceResolved ? (
        <Text style={styles.lessonFlowHint}>{translateStudyText("Finish one quick practice check first so the question feels easier.", language)}</Text>
      ) : null}
    </ScrollView>
  );
}

function QuestionScreen({
  language,
  section,
  session,
  challengeIndex,
  selectedChoiceId,
  retrying,
  onSelectChoice,
  onAnswer,
  onExit
}: {
  language: SupportedLanguage;
  section: LearningSection;
  session: LessonSession;
  challengeIndex: number;
  selectedChoiceId?: string;
  retrying: boolean;
  onSelectChoice: (choiceId: string) => void;
  onAnswer: () => void;
  onExit: () => void;
}) {
  const challenge = session.lesson.challenges[challengeIndex];
  const progress = (challengeIndex + 1) / session.lesson.challenges.length;

  return (
    <View style={styles.lessonStageScreen}>
      <View style={styles.lessonTop}>
        <View style={styles.lessonTopActions}>
          <Pressable onPress={onExit} style={styles.closeButton}>
            <Text style={styles.closeText}>{translateStudyText("Exit", language)}</Text>
          </Pressable>
          {retrying ? (
            <View style={styles.retryBadge}>
              <Text style={styles.retryBadgeText}>{translateStudyText("Retry", language)}</Text>
            </View>
          ) : (
            <Text style={styles.lessonStageCounter}>{`${challengeIndex + 1}/${session.lesson.challenges.length}`}</Text>
          )}
        </View>
        <View style={styles.lessonProgressTrack}>
          <AnimatedProgressBar progress={progress} color={section.accentColor} trackColor={colors.gray} height={12} />
        </View>
      </View>

      <View style={styles.lessonQuestionWrap}>
        <LessonStageRail currentStep={4} totalSteps={4} accentColor={section.accentColor} />
        <View style={styles.lessonCoachCard}>
          <GuideMascot variant={section.mascot} accentColor={section.accentColor} size={88} />
          <View style={styles.lessonSpeechBubble}>
            <Text style={styles.lessonSpeechTitle}>{translateStudyText("Now answer", language)}</Text>
            <Text style={styles.lessonSpeechCopy}>
              {retrying
                ? translateStudyText("Take the idea slowly and choose with confidence this time.", language)
                : translateStudyText("One question, one choice, and then we move forward.", language)}
            </Text>
          </View>
        </View>

        <View style={styles.promptCard}>
          <Text style={styles.eyebrow}>{translateStudyText("Question", language)}</Text>
          <Text style={styles.challengePrompt}>{challenge.prompt}</Text>
        </View>

        <View style={styles.choiceStack}>
          {challenge.choices.map((choice) => {
            const isSelected = choice.id === selectedChoiceId;

            return (
              <Pressable
                key={choice.id}
                onPress={() => onSelectChoice(choice.id)}
                style={[
                  styles.choiceButton,
                  isSelected && styles.choiceSelected
                ]}
              >
                <Text style={styles.choiceText}>{choice.label}</Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      <View style={styles.feedbackPane}>
        <Text style={styles.feedbackCopy}>{translateStudyText("Pick the best answer and then check it.", language)}</Text>
        <Pressable
          onPress={onAnswer}
          disabled={!selectedChoiceId}
          style={[styles.primaryButton, styles.checkButton, !selectedChoiceId && styles.primaryButtonDisabled]}
        >
          <Text style={styles.primaryButtonText}>{translateStudyText("Check", language)}</Text>
        </Pressable>
      </View>
    </View>
  );
}

function AnswerFeedbackScreen({
  strings,
  language,
  session,
  challengeIndex,
  answerState,
  retried,
  selectedChoiceId,
  onContinue
}: {
  strings: UiStrings;
  language: SupportedLanguage;
  session: LessonSession;
  challengeIndex: number;
  answerState: AnswerState;
  retried: boolean;
  selectedChoiceId?: string;
  onContinue: () => void;
}) {
  const challenge = session.lesson.challenges[challengeIndex];
  const selectedChoice = challenge.choices.find((choice) => choice.id === selectedChoiceId);
  const feedbackTitle = answerState === "correct"
    ? (retried ? translateStudyText("Nice recovery", language) : strings.correct)
    : strings.notQuite;
  const feedbackCopy = answerState === "correct"
    ? challenge.explanation
    : challenge.easierExplanation ?? challenge.explanation;
  const rewardText = answerState === "correct"
    ? (retried ? "Recovered and ready for the next step." : "Nice. You earned progress and kept the lesson moving.")
    : "You got the support you need, and you can try again without getting lost.";

  return (
    <View style={styles.lessonStageScreen}>
      <View style={[
        styles.feedbackStageCard,
        answerState === "correct" ? styles.feedbackGood : styles.feedbackBad
      ]}>
        <Text style={[styles.feedbackTitle, answerState === "correct" ? styles.feedbackTitleGood : styles.feedbackTitleBad]}>
          {feedbackTitle}
        </Text>
        <Text style={styles.feedbackCopyLarge}>{feedbackCopy}</Text>
        {selectedChoice ? (
          <View style={styles.answerPickedCard}>
            <Text style={styles.answerPickedEyebrow}>
              {retried ? translateStudyText("You tried again", language) : translateStudyText("Your answer", language)}
            </Text>
            <Text style={styles.answerPickedValue}>{selectedChoice.label}</Text>
          </View>
        ) : null}
        <Text style={styles.feedbackHintText}>
          {answerState === "correct"
            ? (retried
              ? translateStudyText("That extra pass helped lock the idea in.", language)
              : translateStudyText("Good. Keep the pace and move to the next step.", language))
            : (retried
              ? translateStudyText("You have the explanation now, so we will keep the lesson moving.", language)
              : translateStudyText("One quick help screen is next so the idea becomes clearer before you continue.", language))}
        </Text>
        <View style={styles.feedbackRewardStrip}>
          <SparkleIcon size={14} color={answerState === "correct" ? "#F0B90B" : "#215E98"} />
          <Text style={styles.feedbackRewardText}>{translateStudyText(rewardText, language)}</Text>
        </View>
        <Pressable onPress={onContinue} style={[styles.primaryButton, answerState === "correct" ? styles.correctButton : styles.wrongButton]}>
          <Text style={styles.primaryButtonText}>{strings.continue}</Text>
        </Pressable>
      </View>
    </View>
  );
}

function LessonHelpScreen({
  strings,
  language,
  section,
  session,
  challengeIndex,
  onContinue,
  onRetry,
  onOpenSource
}: {
  strings: UiStrings;
  language: SupportedLanguage;
  section: LearningSection;
  session: LessonSession;
  challengeIndex: number;
  onContinue: () => void;
  onRetry: () => void;
  onOpenSource: (url: string) => void;
}) {
  const challenge = session.lesson.challenges[challengeIndex];
  const primarySource = session.lesson.sources.find((source) => source.supportType === "primary") ?? session.lesson.sources[0];

  return (
    <ScrollView contentContainerStyle={styles.lessonFlowContent} showsVerticalScrollIndicator={false}>
      <ScreenHeader
        title={translateStudyText("Quick help", language)}
        subtitle={translateStudyText("A short clarification before you either retry or keep moving.", language)}
        onBack={onRetry}
      />
      <LessonStageRail currentStep={4} totalSteps={4} accentColor={section.accentColor} />

      <View style={[styles.lessonHelpCard, { borderColor: lightenColor(section.accentColor, 0.82), backgroundColor: lightenColor(section.accentColor, 0.96) }]}>
        <Text style={styles.lessonTeachEyebrow}>{translateStudyText("Clear it up", language)}</Text>
        <Text style={styles.lessonTeachTitle}>{session.lesson.title}</Text>
        <Text style={styles.lessonTeachCopy}>{challenge.easierExplanation ?? challenge.miniLesson ?? session.lesson.whyItMatters ?? challenge.explanation}</Text>
        {challenge.reviewSuggestion ? (
          <View style={styles.lessonTeachSupportCard}>
            <Text style={styles.lessonTeachSupportCopy}>{translateStudyText("Review next", language)}</Text>
            <Text style={styles.lessonTeachSupportHint}>{challenge.reviewSuggestion}</Text>
          </View>
        ) : null}
        {primarySource ? (
          <Pressable onPress={() => onOpenSource(primarySource.url)} style={[styles.watchReadCard, { borderColor: lightenColor(section.accentColor, 0.8) }]}>
            <View style={styles.watchReadText}>
              <Text style={styles.watchReadEyebrow}>{translateStudyText("Best support for this step", language)}</Text>
              <Text style={styles.watchReadTitle}>{primarySource.reference ?? primarySource.title}</Text>
              <Text style={styles.watchReadCopy}>{primarySource.teaches ?? primarySource.summary}</Text>
            </View>
            <View style={[styles.watchReadButton, { backgroundColor: section.accentColor }]}>
              <Text style={styles.watchReadButtonText}>{strings.openSource}</Text>
            </View>
          </Pressable>
        ) : null}
        <View style={styles.lessonHelpButtonRow}>
          <Pressable onPress={onRetry} style={styles.modalGhostButton}>
            <Text style={styles.modalGhostText}>{translateStudyText("Try again", language)}</Text>
          </Pressable>
          <Pressable onPress={onContinue} style={[styles.modalPrimaryButton, { backgroundColor: section.accentColor }]}>
            <Text style={styles.modalPrimaryText}>{translateStudyText("Continue", language)}</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}

function LessonStageRail({
  currentStep,
  totalSteps,
  accentColor
}: {
  currentStep: number;
  totalSteps: number;
  accentColor: string;
}) {
  return (
    <View style={styles.lessonStageRail}>
      {Array.from({ length: totalSteps }).map((_, index) => {
        const step = index + 1;
        const active = step <= currentStep;
        return (
          <View
            key={`lesson-step-${step}`}
            style={[
              styles.lessonStageDot,
              { backgroundColor: active ? accentColor : "#DCE7E1", transform: [{ scaleX: step === currentStep ? 1.12 : 1 }] }
            ]}
          />
        );
      })}
    </View>
  );
}

function LessonCompleteScreen({
  strings,
  language,
  section,
  summary,
  nextNode,
  onContinue,
  onReturnToPath
}: {
  strings: UiStrings;
  language: SupportedLanguage;
  section: LearningSection;
  summary: LessonCelebration;
  nextNode?: LearningNodeView;
  onContinue: () => void;
  onReturnToPath: () => void;
}) {
  return (
    <View style={styles.lessonStageScreen}>
      <View style={[styles.lessonCompleteCard, { borderColor: lightenColor(section.accentColor, 0.82), backgroundColor: lightenColor(section.accentColor, 0.95) }]}>
        <CelebrationBurst accentColor={section.accentColor} xp={summary.xp} stars={summary.stars} />
        <GuideMascot variant={section.mascot} accentColor={section.accentColor} size={128} />
        <Text style={styles.modalEyebrow}>Lesson complete</Text>
        <Text style={styles.lessonCompleteTitle}>{summary.title}</Text>
        <Text style={styles.lessonCompleteCopy}>{translateStudyText("You finished the lesson and pushed the path forward.", language)}</Text>
        <View style={styles.celebrationStats}>
          {summary.xp > 0 && (
            <View style={styles.celebrationStat}>
              <Text style={styles.celebrationStatValue}>{`+${summary.xp}`}</Text>
              <Text style={styles.celebrationStatLabel}>XP</Text>
            </View>
          )}
          {summary.stars > 0 && (
            <View style={styles.celebrationStat}>
              <Text style={styles.celebrationStatValue}>{`+${summary.stars}`}</Text>
              <Text style={styles.celebrationStatLabel}>Stars</Text>
            </View>
          )}
          <View style={styles.celebrationStat}>
            <Text style={styles.celebrationStatValue}>{summary.streakDays}</Text>
            <Text style={styles.celebrationStatLabel}>{strings.streak}</Text>
          </View>
        </View>
        {nextNode ? (
          <View style={styles.nextLessonCard}>
            <Text style={styles.answerPickedEyebrow}>Up next</Text>
            <Text style={styles.nextLessonTitle}>{nextNode.title}</Text>
          </View>
        ) : null}
        <View style={styles.lessonCompleteButtonRow}>
          <Pressable onPress={onReturnToPath} style={styles.modalGhostButton}>
            <Text style={styles.modalGhostText}>{strings.backToPath}</Text>
          </Pressable>
          <Pressable onPress={onContinue} style={[styles.modalPrimaryButton, { backgroundColor: section.accentColor }]}>
            <Text style={styles.modalPrimaryText}>{nextNode ? strings.continue : strings.backToPath}</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

function ReviewScreen({
  user,
  learnerProfile,
  language,
  strings,
  onBack,
  onStartPlacement,
  onStartReview,
  onStartDailyChallenge,
  onGoFoundation
}: {
  user: UserProfile;
  learnerProfile: NonNullable<UserProfile["learnerProfile"]>;
  language: SupportedLanguage;
  strings: UiStrings;
  onBack: () => void;
  onStartPlacement: () => void;
  onStartReview: () => void;
  onStartDailyChallenge: () => void;
  onGoFoundation: () => void;
}) {
  return (
    <ScrollView contentContainerStyle={styles.screenScrollContent} showsVerticalScrollIndicator={false}>
      <ScreenHeader
        title={translateStudyText("Review center", language)}
        subtitle={translateStudyText("See what needs another pass and jump back in quickly.", language)}
        onBack={onBack}
      />

      <View style={styles.reviewHeroCard}>
        <Text style={styles.reviewHeroEyebrow}>{learnerProfile.readiness_label}</Text>
        <Text style={styles.reviewHeroTitle}>{translateStudyText("Keep your foundation steady", language)}</Text>
        <Text style={styles.reviewHeroCopy}>
          {translateStudyText("The app is tracking weak spots quietly in the background. Use this screen when you want a guided review.", language)}
        </Text>
        <View style={styles.focusPanelButtonRow}>
          <Pressable onPress={onStartReview} style={styles.focusPrimaryButton}>
            <Text style={styles.focusPrimaryButtonText}>{translateStudyText("Start review", language)}</Text>
          </Pressable>
          <Pressable onPress={onStartDailyChallenge} style={styles.focusSecondaryButton}>
            <Text style={styles.focusSecondaryButtonText}>{translateStudyText("Daily challenge", language)}</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.reviewListCard}>
        <Text style={styles.sectionTitle}>{translateStudyText("Needs review", language)}</Text>
        {learnerProfile.weak_areas.length ? learnerProfile.weak_areas.map((area) => (
          <View key={area} style={styles.reviewListItem}>
            <Text style={styles.reviewListTitle}>{translateStudyText(startCaseFoundationCategory(area), language)}</Text>
            <Text style={styles.reviewListCopy}>{translateStudyText("This area has missed answers or lower confidence right now.", language)}</Text>
          </View>
        )) : (
          <Text style={styles.reviewListCopy}>{translateStudyText("No major weak area is standing out right now. Keep going and let the app keep measuring.", language)}</Text>
        )}
      </View>

      <View style={styles.reviewListCard}>
        <Text style={styles.sectionTitle}>{translateStudyText("Quick actions", language)}</Text>
        <Pressable onPress={onStartPlacement} style={styles.reviewActionButton}>
          <Text style={styles.reviewActionButtonTitle}>{translateStudyText("Retake foundation placement", language)}</Text>
          <Text style={styles.reviewActionButtonCopy}>{translateStudyText("Refresh the estimate of your level across core basics.", language)}</Text>
        </Pressable>
        <Pressable onPress={onGoFoundation} style={styles.reviewActionButton}>
          <Text style={styles.reviewActionButtonTitle}>{translateStudyText("Open foundation topic", language)}</Text>
          <Text style={styles.reviewActionButtonCopy}>{translateStudyText("Jump straight into the beginner path and guided review.", language)}</Text>
        </Pressable>
        <Text style={styles.reviewListCopy}>{`${translateStudyText("Current streak", language)}: ${user.streakDays}d`}</Text>
      </View>
    </ScrollView>
  );
}

function ProfileScreen({
  user,
  strings,
  learnerProfile,
  onBack,
  onOpenSettings,
  onOpenCrew,
  onOpenShop
}: {
  user: UserProfile;
  strings: UiStrings;
  learnerProfile: NonNullable<UserProfile["learnerProfile"]>;
  onBack: () => void;
  onOpenSettings: () => void;
  onOpenCrew: () => void;
  onOpenShop: () => void;
}) {
  return (
    <ScrollView contentContainerStyle={styles.screenScrollContent} showsVerticalScrollIndicator={false}>
      <ScreenHeader
        title={user.displayName}
        subtitle={user.hasAccount ? strings.settings : strings.save}
        onBack={onBack}
      />

      <View style={styles.profileHeroCard}>
        <View style={styles.profileAvatar}>
          <Text style={styles.profileAvatarText}>{user.avatarInitials}</Text>
        </View>
        <Text style={styles.profileHeroTitle}>{user.displayName}</Text>
        <Text style={styles.profileHeroCopy}>{learnerProfile.readiness_label}</Text>
        <View style={styles.profileStatsRow}>
          <TopMetricPill label={strings.streak} value={`${user.streakDays}d`} tint="#FFF3CF" valueColor="#A66C00" />
          <TopMetricPill label="XP" value={`${user.totalXp}`} tint="#DFF5FF" valueColor="#126A99" />
          <TopMetricPill label={strings.hearts} value={formatHearts(user, true)} tint="#FFE4E0" valueColor="#BC4336" />
        </View>
      </View>

      <View style={styles.profileActionStack}>
        <Pressable onPress={onOpenSettings} style={styles.profileActionCard}>
          <Text style={styles.profileActionTitle}>{strings.settings}</Text>
          <Text style={styles.profileActionCopy}>{translateStudyText("Manage reminders, sound, language, and account mode.", user.preferredLanguage ?? DEFAULT_LANGUAGE)}</Text>
        </Pressable>
        <Pressable onPress={onOpenCrew} style={styles.profileActionCard}>
          <Text style={styles.profileActionTitle}>{strings.crew}</Text>
          <Text style={styles.profileActionCopy}>{translateStudyText("Open your accountability and battle space.", user.preferredLanguage ?? DEFAULT_LANGUAGE)}</Text>
        </Pressable>
        <Pressable onPress={onOpenShop} style={styles.profileActionCard}>
          <Text style={styles.profileActionTitle}>{strings.heartShop}</Text>
          <Text style={styles.profileActionCopy}>{translateStudyText("See premium plans, hearts, and saved perks.", user.preferredLanguage ?? DEFAULT_LANGUAGE)}</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

function TopBar({
  user,
  strings,
  languageCode,
  dailyProgress,
  soundEnabled,
  onHome,
  onReview,
  onAccount,
  onLanguage,
  onSocial,
  onShop,
  onToggleSound
}: {
  user: UserProfile;
  strings: UiStrings;
  languageCode: string;
  dailyProgress: number;
  soundEnabled: boolean;
  onHome: () => void;
  onReview: () => void;
  onAccount: () => void;
  onLanguage: () => void;
  onSocial: () => void;
  onShop: () => void;
  onToggleSound: () => void;
}) {
  return (
    <View style={styles.topBar}>
      <View style={styles.topBarBrand}>
        <View style={styles.miniGuideWrap}>
          <GuideMascot variant="hijabi" accentColor={colors.green} size={42} />
        </View>
        <View style={styles.topBarBrandText}>
          <Text style={styles.topBarBrandTitle}>Sira Path</Text>
          <Text style={styles.topBarBrandCopy}>A guided learning path that stays light, playful, and easy to follow.</Text>
        </View>
      </View>

      <View style={styles.topBarMetricRow}>
        <TopMetricPill label={strings.streak} value={`${user.streakDays}d`} tint="#FFF5D6" valueColor="#A66C00" />
        <TopMetricPill label="XP" value={`${user.totalXp}`} tint="#E2F5FF" valueColor="#126A99" />
        <TopMetricPill label="Gems" value={`${user.gems}`} tint="#F3EBFF" valueColor="#6C3BC6" />
        <TopMetricPill label={strings.hearts} value={formatHearts(user, true)} tint="#FFE8E4" valueColor="#BC4336" />
      </View>

      <View style={styles.topBarActionRow}>
        <Pressable onPress={onHome} style={styles.dailyQuestCard}>
          <View style={styles.dailyQuestHeader}>
            <Text style={styles.metricLabel}>Today</Text>
            <Text style={styles.metricValue}>{`${Math.round(dailyProgress * 100)}%`}</Text>
          </View>
          <Text style={styles.dailyQuestCopy}>Keep the streak alive with one more lesson.</Text>
          <AnimatedProgressBar progress={dailyProgress} color={colors.gold} trackColor="rgba(23, 49, 35, 0.08)" height={10} />
        </Pressable>

        <Pressable onPress={onToggleSound} style={[styles.soundButton, !soundEnabled && styles.soundButtonMuted]}>
          <Text style={styles.metricLabel}>Sound</Text>
          <Text style={styles.soundButtonValue}>{soundEnabled ? "SFX on" : "Muted"}</Text>
        </Pressable>

        <Pressable onPress={onReview} style={styles.languageButtonSmall}>
          <Text style={styles.metricLabel}>Review</Text>
          <Text style={styles.socialButtonSmallValue}>Ready</Text>
        </Pressable>

        <Pressable onPress={onLanguage} style={styles.languageButtonSmall}>
          <Text style={styles.metricLabel}>{strings.language}</Text>
          <Text style={styles.socialButtonSmallValue}>{languageCode}</Text>
        </Pressable>
        <Pressable onPress={onSocial} style={styles.socialButtonSmall}>
          <Text style={styles.metricLabel}>{strings.crew}</Text>
          <Text style={styles.socialButtonSmallValue}>Rankings</Text>
        </Pressable>
        <Pressable onPress={onShop} style={styles.heartButton}>
          <Text style={styles.metricLabel}>Shop</Text>
          <Text style={styles.heartValue}>{formatHearts(user, true)}</Text>
        </Pressable>
        <Pressable
          onPress={onAccount}
          style={[styles.accountButton, user.hasAccount && styles.accountButtonActive]}
        >
          <View style={[styles.accountBadge, user.hasAccount && styles.accountBadgeActive]}>
            <Text style={[styles.accountBadgeText, user.hasAccount && styles.accountBadgeTextActive]}>
              {user.hasAccount ? user.avatarInitials : "AC"}
            </Text>
          </View>
          <View>
            <Text style={styles.accountLabel}>{user.hasAccount ? strings.settings : strings.save}</Text>
            <Text style={styles.accountValue}>{user.hasAccount ? user.displayName.split(" ")[0] : strings.logIn}</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}

function TopMetricPill({
  label,
  value,
  tint,
  valueColor
}: {
  label: string;
  value: string;
  tint: string;
  valueColor: string;
}) {
  return (
    <View style={[styles.topMetricPill, { backgroundColor: tint }]}>
      <Text style={styles.metricLabel}>{label}</Text>
      <Text style={[styles.metricValue, { color: valueColor }]}>{value}</Text>
    </View>
  );
}

function AnimatedProgressBar({
  progress,
  color,
  trackColor,
  height = 12
}: {
  progress: number;
  color: string;
  trackColor: string;
  height?: number;
}) {
  const fill = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fill, {
      toValue: Math.max(0.02, Math.min(1, progress || 0)),
      duration: MOTION.duration.progressFill,
      easing: MOTION.easing.smoothOut,
      useNativeDriver: false
    }).start();
  }, [fill, progress]);

  return (
    <View style={[styles.animatedTrack, { backgroundColor: trackColor, height, borderRadius: height / 2 }]}>
      <Animated.View
        style={[
          styles.animatedFill,
          {
            backgroundColor: color,
            width: fill.interpolate({
              inputRange: [0, 1],
              outputRange: ["0%", "100%"]
            }),
            borderRadius: height / 2
          }
        ]}
      />
    </View>
  );
}

function PathScreen({
  user,
  learnerProfile,
  strings,
  language,
  xpSummary,
  section,
  sections,
  branch,
  branches,
  nodes,
  selectedTopic,
  onSelectTopic,
  onSelectBranch,
  onStartLesson,
  onStartTestOut,
  onStartPlacement,
  onStartReview,
  onStartDailyChallenge,
  onSkipFoundation,
  onExploreTopics,
  onOpenShop,
  onClaimReward
}: {
  user: UserProfile;
  learnerProfile: NonNullable<UserProfile["learnerProfile"]>;
  strings: UiStrings;
  language: SupportedLanguage;
  xpSummary?: XpSummary;
  section: LearningSection;
  sections: LearningSection[];
  branch: LearningBranch;
  branches: LearningBranch[];
  nodes: LearningNodeView[];
  selectedTopic: TopicId;
  onSelectTopic: (topicId: TopicId) => void;
  onSelectBranch: (branchId: string) => void;
  onStartLesson: (node: LearningNodeView) => void;
  onStartTestOut: () => void;
  onStartPlacement: () => void;
  onStartReview: () => void;
  onStartDailyChallenge: () => void;
  onSkipFoundation: () => void;
  onExploreTopics: () => void;
  onOpenShop: () => void;
  onClaimReward: (stop: JourneyRewardStop) => void;
}) {
  const progress = Math.min(1, user.totalXp / user.dailyGoalXp);
  const nextNode = nodes.find((node) => node.status === "current") ?? nodes.find((node) => node.status === "available") ?? nodes[0];
  const earnedStars = getSectionStars(user, section);
  const branchProgress = getBranchCompletionRatio(user, section, branch.id);
  const journeyRewards = getJourneyRewardStops(user, section, branch, nodes);
  const topicNeedsReview = topicNeedsReviewHint(section.topicId, learnerProfile);
  const shouldRecommendFoundation = !learnerProfile.assessmentCompleted && section.topicId !== "foundation";
  const currentCluster = getCurrentTestOutCluster(nodes);
  const pathTheme = getTopicPathTheme(section.topicId, section.accentColor);
  const recommendedFoundationCopy = learnerProfile.weak_areas.length
    ? `We are already spotting weaker areas in ${learnerProfile.weak_areas.slice(0, 2).join(" and ")}. A quick foundation check will tune your path better.`
    : "You can explore freely now, and the app will keep estimating your level as you learn.";
  const translatedFoundationCopy = translateStudyText(recommendedFoundationCopy, language);

  return (
    <ScrollView contentContainerStyle={styles.pathContent} showsVerticalScrollIndicator={false}>
      <HeroCard
        section={section}
        strings={strings}
        language={language}
        progress={progress}
        gainedXp={xpSummary?.gainedXp ?? user.totalXp}
        earnedStars={earnedStars}
        branchProgress={branchProgress}
        nextLessonTitle={nextNode?.title}
        onContinue={() => nextNode && onStartLesson(nextNode)}
      />

      <View style={styles.journeyStatsRow}>
        <JourneyStatCard
          eyebrow="Next lesson"
          title={nextNode?.title ?? section.title}
          copy={translateStudyText("Tap the glowing circle and keep the path moving.", language)}
          accentColor={section.accentColor}
        />
        <JourneyStatCard
          eyebrow="Mastery"
          title={`${Math.round(branchProgress * 100)}% ${translateStudyText("mastery", language)}`}
          copy={translateStudyText("Every lesson builds stars, mastery, and review memory in the background.", language)}
          accentColor={colors.gold}
        />
        <JourneyStatCard
          eyebrow={topicNeedsReview ? "Needs review" : "Daily challenge"}
          title={topicNeedsReview ? translateStudyText("Weak area spotted", language) : translateStudyText("Fresh challenge ready", language)}
          copy={
            topicNeedsReview
              ? translateStudyText("This topic has concepts the learner profile wants to revisit soon.", language)
              : translateStudyText("Mix a quick challenge in with your path to keep momentum high.", language)
          }
          accentColor={topicNeedsReview ? colors.coral : "#6C3BC6"}
        />
      </View>

      <View style={styles.topicHeader}>
        <Text style={styles.sectionTitle}>{strings.chooseTopic}</Text>
        <Text style={styles.sectionDescription}>{strings.tapTopic}</Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.topicRow}>
        {sections.map((topic) => (
          <TopicCard
            key={topic.topicId}
            section={topic}
            strings={strings}
            earnedStars={getSectionStars(user, topic)}
            selected={topic.topicId === selectedTopic}
            onPress={() => onSelectTopic(topic.topicId)}
          />
        ))}
      </ScrollView>

      <View style={styles.branchHeader}>
        <Text style={styles.sectionTitle}>{strings.chooseBranch}</Text>
        <Text style={styles.sectionDescription}>{strings.tapBranch}</Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.branchRow}>
        {branches.map((item) => {
          const branchStars = getBranchStars(user, section, item.id);
          const lessonCount = section.nodes.filter((node) => node.branchId === item.id).length;
          const selected = item.id === branch.id;
          const branchMeta = item.difficultyRange ? `D${item.difficultyRange.start}-${item.difficultyRange.end}` : "D1-5";
          const sourceMeta = item.sourceReferences?.length ? `${item.sourceReferences.length} sources` : undefined;

          return (
            <Pressable
              key={item.id}
              onPress={() => onSelectBranch(item.id)}
              style={({ pressed }) => [
                styles.branchCard,
                selected && { borderColor: section.accentColor, backgroundColor: lightenColor(section.accentColor, 0.92) },
                pressed && styles.topicCardPressed
              ]}
            >
              <Text style={[styles.branchCardTitle, selected && { color: darkenColor(section.accentColor) }]}>{item.title}</Text>
              <Text style={styles.branchCardCopy}>{item.description}</Text>
              <Text style={styles.branchCardSubMeta}>{sourceMeta ? `${branchMeta} • ${sourceMeta}` : branchMeta}</Text>
              <View style={styles.branchCardMetaRow}>
                <Text style={styles.branchCardMeta}>{`${lessonCount} ${strings.lessons}`}</Text>
                <Text style={styles.branchCardMeta}>{`${branchStars}/${section.nodes.filter((node) => node.branchId === item.id).reduce((total, node) => total + node.starsReward, 0)} ${strings.stars}`}</Text>
              </View>
            </Pressable>
          );
        })}
      </ScrollView>

      {section.topicId === "foundation" && (
        <FoundationDashboard
          profile={learnerProfile}
          onStartPlacement={onStartPlacement}
          onStartReview={onStartReview}
          onStartDailyChallenge={onStartDailyChallenge}
          onSkipAssessment={onSkipFoundation}
          onExploreFreely={onExploreTopics}
        />
      )}

      {shouldRecommendFoundation && (
        <View style={styles.foundationFreePlayBanner}>
          <View style={styles.foundationFreePlayText}>
            <Text style={styles.foundationFreePlayTitle}>{translateStudyText("Explore freely", language)}</Text>
            <Text style={styles.foundationFreePlayCopy}>{translatedFoundationCopy}</Text>
          </View>
          <Pressable onPress={onStartPlacement} style={styles.foundationFreePlayButton}>
            <Text style={styles.foundationFreePlayButtonText}>{translateStudyText("Take foundation now", language)}</Text>
          </Pressable>
        </View>
      )}

      <View style={[styles.routeCard, { borderColor: lightenColor(pathTheme.primary, 0.8), backgroundColor: pathTheme.shell }]}>
        <PathBackdropDecor theme={pathTheme} topicId={section.topicId} />
        <View style={styles.routeHeader}>
          <View style={styles.routeHeaderText}>
            <Text style={styles.routeBadge}>{section.badge}</Text>
            <Text style={styles.routeTitle}>{section.title}</Text>
            <Text style={styles.routeDescription}>{section.focus}</Text>
          </View>
          <View style={styles.routeHeaderAside}>
            <GuideMascot variant={section.mascot} accentColor={section.accentColor} size={92} />
            <StarMeter earned={earnedStars} total={section.starsTarget} compact={false} strings={strings} />
          </View>
        </View>

        <View style={[styles.branchSummaryCard, { borderColor: lightenColor(pathTheme.primary, 0.84), backgroundColor: withAlpha(pathTheme.secondary, 0.08) }]}>
          <View style={styles.branchSummaryTop}>
            <View>
              <Text style={[styles.branchSummaryEyebrow, { color: section.accentColor }]}>{strings.branch}</Text>
              <Text style={styles.branchSummaryTitle}>{branch.title}</Text>
            </View>
            <View style={styles.branchProgressWrap}>
              <Text style={styles.branchProgressLabel}>{translateStudyText("Journey progress", language)}</Text>
              <Text style={styles.branchProgressValue}>{Math.round(branchProgress * 100)}%</Text>
            </View>
          </View>
          <Text style={styles.branchSummaryCopy}>{branch.description}</Text>
          <View style={styles.branchSummaryMetaRow}>
            <Text style={styles.branchSummaryMetaText}>
              {branch.difficultyRange ? `Difficulty ${branch.difficultyRange.start}-${branch.difficultyRange.end}` : "Difficulty 1-5"}
            </Text>
            {branch.sourceReferences?.length ? <Text style={styles.branchSummaryMetaText}>{`${branch.sourceReferences.length} source references`}</Text> : null}
            {branch.premiumOnly ? <Text style={styles.branchSummaryMetaText}>Premium mastery branch</Text> : null}
            {branch.surahName ? <Text style={styles.branchSummaryMetaText}>{branch.surahName}</Text> : null}
            {branch.ayahRange ? <Text style={styles.branchSummaryMetaText}>{branch.ayahRange}</Text> : null}
          </View>
          <AnimatedProgressBar progress={branchProgress} color={section.accentColor} trackColor={lightenColor(section.accentColor, 0.92)} />
          <View style={styles.branchActionRow}>
            <Pressable onPress={() => nextNode && onStartLesson(nextNode)} style={[styles.branchPrimaryAction, { backgroundColor: section.accentColor }]}>
              <Text style={styles.primaryButtonText}>{strings.continueTopic}</Text>
            </Pressable>
            <Pressable onPress={onStartTestOut} style={styles.branchSecondaryAction}>
              <Text style={styles.branchSecondaryActionText}>
                {currentCluster ? `Test out ${currentCluster.label}` : "Test out"}
              </Text>
            </Pressable>
          </View>
          {currentCluster ? (
            <Text style={styles.branchTestOutCopy}>
              {`${currentCluster.nodeIds.length} lessons in this cluster. Pass the test to unlock the next stretch.`}
            </Text>
          ) : (
            <Text style={styles.branchTestOutCopy}>This branch is fully cleared. The current cluster is already behind you.</Text>
          )}
        </View>

        <View style={styles.pathLane}>
          <View style={[styles.pathBackdropAura, { backgroundColor: withAlpha(pathTheme.glow, 0.24) }]} />
          <View style={[styles.pathBackdropShell, { backgroundColor: withAlpha(pathTheme.secondary, 0.22) }]} />
          <View style={[styles.pathBackdrop, { backgroundColor: pathTheme.lane }]} />
          {nodes.map((node, index) => (
            <View key={node.id}>
              <PathNode
                node={node}
                index={index}
                isLast={index === nodes.length - 1}
                accentColor={section.accentColor}
                theme={pathTheme}
                reviewNeeded={topicNeedsReview && node.kind === "review"}
                onPress={() => onStartLesson(node)}
              />
              {journeyRewards
                .filter((reward) => reward.id.endsWith(`_${index}`))
                .map((reward) => (
                  <RewardChestStop key={reward.id} reward={reward} accentColor={section.accentColor} theme={pathTheme} onPress={() => onClaimReward(reward)} />
                ))}
              {index === 1 && (
                <CoachCard
                  section={section}
                  title={strings.guideMoment}
                  copy={`${strings.learnTopic} ${section.title}. ${strings.guideMomentCopy}`}
                />
              )}
            </View>
          ))}
        </View>
      </View>

      {!user.hearts.unlimited && user.hearts.current <= 2 && (
        <Pressable onPress={onOpenShop} style={styles.heartsPrompt}>
          <Text style={styles.heartsPromptTitle}>Low on hearts</Text>
          <Text style={styles.heartsPromptCopy}>Recover one by watching a sponsor break or pick up a heart pack.</Text>
        </Pressable>
      )}
    </ScrollView>
  );
}

function HeroCard({
  section,
  strings,
  language,
  progress,
  gainedXp,
  earnedStars,
  branchProgress,
  nextLessonTitle,
  onContinue
}: {
  section: LearningSection;
  strings: UiStrings;
  language: SupportedLanguage;
  progress: number;
  gainedXp: number;
  earnedStars: number;
  branchProgress: number;
  nextLessonTitle?: string;
  onContinue: () => void;
}) {
  return (
    <View style={[styles.heroCard, { backgroundColor: section.accentColor }]}>
      <View style={styles.heroPatternStripe} />
      <View style={styles.heroPatternStripeSecondary} />
      <View style={styles.heroText}>
        <View style={styles.heroBadgeRow}>
          <Text style={styles.heroBadge}>{section.badge}</Text>
          <TopicIcon topicId={section.topicId} accentColor="#FFFFFF" light />
        </View>
        <Text style={styles.heroTitle}>{`${strings.learnTopic} ${section.title}`}</Text>
        <Text style={styles.heroCopy}>{section.description}</Text>
        <View style={styles.heroRewardRow}>
          <View style={styles.heroChip}>
            <Text style={styles.heroChipLabel}>{translateStudyText("Up next", language)}</Text>
            <Text style={styles.heroChipValue}>{nextLessonTitle ?? section.title}</Text>
          </View>
          <View style={styles.heroChip}>
            <Text style={styles.heroChipLabel}>{translateStudyText("Branch mastery", language)}</Text>
            <Text style={styles.heroChipValue}>{Math.round(branchProgress * 100)}%</Text>
          </View>
        </View>
        <StarMeter earned={earnedStars} total={section.starsTarget} light compact={false} strings={strings} />
        <View style={styles.heroProgressBarWrap}>
          <AnimatedProgressBar progress={progress} color={colors.white} trackColor="rgba(255,255,255,0.22)" height={12} />
        </View>
        <Text style={styles.heroProgress}>{`${gainedXp} ${strings.xpToday}`}</Text>
        <Pressable onPress={onContinue} style={styles.heroButton}>
          <Text style={styles.heroButtonText}>{strings.continueTopic}</Text>
        </Pressable>
      </View>
      <View style={styles.heroArt}>
        <GuideMascot variant={section.mascot} accentColor={lightenColor(section.accentColor)} size={136} />
      </View>
    </View>
  );
}

function JourneyStatCard({
  eyebrow,
  title,
  copy,
  accentColor
}: {
  eyebrow: string;
  title: string;
  copy: string;
  accentColor: string;
}) {
  return (
    <View style={[styles.journeyStatCard, { borderColor: lightenColor(accentColor, 0.84) }]}>
      <Text style={[styles.journeyStatEyebrow, { color: darkenColor(accentColor) }]}>{eyebrow}</Text>
      <Text style={styles.journeyStatTitle}>{title}</Text>
      <Text style={styles.journeyStatCopy}>{copy}</Text>
    </View>
  );
}

function TopicCard({
  section,
  strings,
  earnedStars,
  selected,
  onPress
}: {
  section: LearningSection;
  strings: UiStrings;
  earnedStars: number;
  selected: boolean;
  onPress: () => void;
}) {
  const topicStats = `${section.branches.length} branches • ${section.nodes.length} lessons`;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.topicCard,
        selected && { borderColor: section.accentColor, backgroundColor: lightenColor(section.accentColor, 0.9) }
        ,
        pressed && styles.topicCardPressed
      ]}
    >
      <View style={styles.topicCardIconRow}>
        <TopicIcon topicId={section.topicId} accentColor={section.accentColor} />
      </View>
      <Text style={styles.topicCardTitle}>{section.title}</Text>
      <Text style={styles.topicCardCopy}>{section.focus}</Text>
      <Text style={styles.topicCardMeta}>{topicStats}</Text>
      <StarMeter earned={earnedStars} total={section.starsTarget} compact strings={strings} />
    </Pressable>
  );
}

function TopicIcon({
  topicId,
  accentColor,
  light = false
}: {
  topicId: TopicId;
  accentColor: string;
  light?: boolean;
}) {
  const glyph = getTopicGlyph(topicId);
  const frameColor = light ? "rgba(255,255,255,0.18)" : lightenColor(accentColor, 0.9);
  const innerColor = light ? "rgba(255,255,255,0.96)" : "#FFFFFF";
  const strokeColor = light ? accentColor : darkenColor(accentColor);
  const trimColor = light ? "#FFE38C" : "#F2C94C";

  return (
    <View style={[styles.topicIconFrame, { backgroundColor: frameColor, borderColor: light ? "rgba(255,255,255,0.24)" : lightenColor(accentColor, 0.82) }]}>
      <View style={[styles.topicIconInner, { backgroundColor: innerColor }]}>
        <NodeGlyph kind={glyph} coverColor={strokeColor} pageColor={innerColor} accentColor={trimColor} />
      </View>
    </View>
  );
}

function PathBackdropDecor({
  theme,
  topicId,
  compact = false
}: {
  theme: PathTheme;
  topicId: TopicId;
  compact?: boolean;
}) {
  const scale = compact ? 0.82 : 1;
  const terrain = getPathTerrainMood(topicId);

  return (
    <View pointerEvents="none" style={styles.pathDecorLayer}>
      <View style={[styles.pathSkyWash, { backgroundColor: withAlpha(theme.tertiary, compact ? 0.18 : 0.24) }]} />
      <View style={[styles.pathAtmosphereBand, styles.pathAtmosphereBandFar, { backgroundColor: withAlpha(theme.secondary, 0.14) }]} />
      <View style={[styles.pathAtmosphereBand, styles.pathAtmosphereBandNear, { backgroundColor: withAlpha(theme.primary, 0.12) }]} />
      <View style={[styles.pathDecorBlob, styles.pathDecorBlobTopLeft, { backgroundColor: withAlpha(theme.secondary, 0.18), transform: [{ scale }] }]} />
      <View style={[styles.pathDecorBlob, styles.pathDecorBlobMiddle, { backgroundColor: withAlpha(theme.candy, 0.12), transform: [{ scale: scale * 0.92 }] }]} />
      <View style={[styles.pathDecorBlob, styles.pathDecorBlobBottomRight, { backgroundColor: withAlpha(theme.glow, 0.18), transform: [{ scale }] }]} />
      <View style={[styles.pathTerrainRidge, styles.pathTerrainRidgeFar, { backgroundColor: withAlpha(terrain.ridge, 0.28) }]} />
      <View style={[styles.pathTerrainRidge, styles.pathTerrainRidgeNear, { backgroundColor: withAlpha(terrain.ridgeSoft, 0.36) }]} />
      <View style={[styles.pathTerrainBase, { backgroundColor: withAlpha(terrain.base, compact ? 0.14 : 0.18) }]} />
      <View style={[styles.pathTerrainDune, styles.pathTerrainDuneLeft, { backgroundColor: withAlpha(terrain.dune, 0.24), transform: [{ scale: scale * 0.98 }] }]} />
      <View style={[styles.pathTerrainDune, styles.pathTerrainDuneCenter, { backgroundColor: withAlpha(terrain.duneSoft, 0.26), transform: [{ scale: scale }] }]} />
      <View style={[styles.pathTerrainDune, styles.pathTerrainDuneRight, { backgroundColor: withAlpha(terrain.base, 0.2), transform: [{ scale: scale * 0.9 }] }]} />
      {terrain.night && (
        <>
          <View style={[styles.pathStar, styles.pathStarTop, { backgroundColor: withAlpha("#FFFFFF", 0.8) }]} />
          <View style={[styles.pathStar, styles.pathStarMid, { backgroundColor: withAlpha("#FFF4B0", 0.78) }]} />
          <View style={[styles.pathStar, styles.pathStarRight, { backgroundColor: withAlpha("#FFFFFF", 0.72) }]} />
          <View style={[styles.pathMoonGlow, { backgroundColor: withAlpha(theme.glow, 0.22) }]} />
        </>
      )}
      {terrain.city && (
        <View style={styles.pathCityWrap}>
          <View style={[styles.pathCityDome, { backgroundColor: withAlpha(terrain.landmark, 0.28) }]} />
          <View style={[styles.pathCityArch, { backgroundColor: withAlpha(terrain.landmark, 0.32) }]} />
          <View style={[styles.pathCityTower, { backgroundColor: withAlpha(terrain.landmark, 0.26) }]} />
        </View>
      )}
      {terrain.mountains && (
        <View style={styles.pathMountainWrap}>
          <View style={[styles.pathMountain, styles.pathMountainLeft, { borderBottomColor: withAlpha(terrain.landmark, 0.3) }]} />
          <View style={[styles.pathMountain, styles.pathMountainCenter, { borderBottomColor: withAlpha(terrain.landmark, 0.34) }]} />
          <View style={[styles.pathMountain, styles.pathMountainRight, { borderBottomColor: withAlpha(terrain.landmark, 0.26) }]} />
        </View>
      )}
      {terrain.garden && (
        <>
          <View style={[styles.pathGardenLeaf, styles.pathGardenLeafLeft, { backgroundColor: withAlpha(terrain.landmark, 0.22) }]} />
          <View style={[styles.pathGardenLeaf, styles.pathGardenLeafRight, { backgroundColor: withAlpha(terrain.landmark, 0.2) }]} />
          <View style={[styles.pathGardenPool, { backgroundColor: withAlpha(theme.secondary, 0.18) }]} />
        </>
      )}
      {terrain.caravan && (
        <View style={styles.pathCaravanWrap}>
          <View style={[styles.pathCaravanDot, { backgroundColor: withAlpha(terrain.landmark, 0.34) }]} />
          <View style={[styles.pathCaravanDot, styles.pathCaravanDotMid, { backgroundColor: withAlpha(terrain.landmark, 0.28) }]} />
          <View style={[styles.pathCaravanDot, styles.pathCaravanDotLast, { backgroundColor: withAlpha(terrain.landmark, 0.24) }]} />
        </View>
      )}
      <View style={[styles.pathDecorDot, styles.pathDecorDotLeft, { backgroundColor: withAlpha(theme.reward, 0.36) }]} />
      <View style={[styles.pathDecorDot, styles.pathDecorDotRight, { backgroundColor: withAlpha(theme.secondary, 0.34) }]} />
      <View style={[styles.pathDecorDot, styles.pathDecorDotBottom, { backgroundColor: withAlpha(theme.candy, 0.3) }]} />
    </View>
  );
}

function CheckMarkIcon({
  size,
  color
}: {
  size: number;
  color: string;
}) {
  return (
    <View style={{ width: size, height: size, alignItems: "center", justifyContent: "center" }}>
      <View
        style={{
          position: "absolute",
          width: Math.max(2, size * 0.18),
          height: Math.max(6, size * 0.4),
          borderRadius: 999,
          backgroundColor: color,
          left: size * 0.28,
          top: size * 0.4,
          transform: [{ rotate: "-42deg" }]
        }}
      />
      <View
        style={{
          position: "absolute",
          width: Math.max(2, size * 0.18),
          height: Math.max(9, size * 0.62),
          borderRadius: 999,
          backgroundColor: color,
          left: size * 0.54,
          top: size * 0.16,
          transform: [{ rotate: "42deg" }]
        }}
      />
    </View>
  );
}

function PathNode({
  node,
  index,
  isLast,
  accentColor,
  theme,
  reviewNeeded,
  onPress
}: {
  node: LearningNodeView;
  index: number;
  isLast: boolean;
  accentColor: string;
  theme: PathTheme;
  reviewNeeded: boolean;
  onPress: () => void;
}) {
  const alignments = [styles.nodeLeft, styles.nodeCenter, styles.nodeRight];
  const visual = getNodeVisual(node.id, node.status, accentColor);
  const pulse = useRef(new Animated.Value(node.status === "current" ? 1 : 0)).current;
  const scale = useRef(new Animated.Value(1)).current;
  const float = useRef(new Animated.Value(0)).current;
  const shine = useRef(new Animated.Value(node.status === "completed" ? 1 : 0)).current;
  const starPulse = useRef(new Animated.Value(node.status === "current" ? 1 : 0)).current;
  const stateInfo = describeNodeState(node, reviewNeeded);
  const isReviewNode = node.kind === "review";
  const isRewardingNode = stateInfo.legendary || node.kind === "story";
  const nodeColor = isRewardingNode ? theme.reward : isReviewNode ? theme.review : visual.outerColor;
  const innerColor = node.status === "locked" ? "#F3F6F4" : isRewardingNode ? lightenColor(theme.reward, 0.84) : isReviewNode ? lightenColor(theme.review, 0.82) : visual.innerColor;
  const badgeColor = isRewardingNode ? theme.reward : node.status === "completed" ? theme.secondary : theme.candy;

  useEffect(() => {
    if (node.status !== "current") {
      pulse.stopAnimation();
      pulse.setValue(0);
      return;
    }

    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1,
          duration: MOTION.duration.nodePulse,
          easing: MOTION.easing.smoothInOut,
          useNativeDriver: false
        }),
        Animated.timing(pulse, {
          toValue: 0.28,
          duration: MOTION.duration.nodePulse,
          easing: MOTION.easing.smoothInOut,
          useNativeDriver: false
        })
      ])
    );

    animation.start();

    return () => {
      animation.stop();
    };
  }, [node.status, pulse]);

  useEffect(() => {
    if (node.status === "locked") {
      float.stopAnimation();
      float.setValue(0);
      return;
    }

    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(float, {
          toValue: 1,
          duration: MOTION.duration.nodeFloat + (index % 3) * 180,
          easing: MOTION.easing.drift,
          useNativeDriver: true
        }),
        Animated.timing(float, {
          toValue: 0,
          duration: MOTION.duration.nodeFloat + (index % 3) * 180,
          easing: MOTION.easing.drift,
          useNativeDriver: true
        })
      ])
    );

    animation.start();

    return () => {
      animation.stop();
    };
  }, [float, index, node.status]);

  useEffect(() => {
    if (node.status !== "completed") {
      shine.stopAnimation();
      shine.setValue(0);
      return;
    }

    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(shine, {
          toValue: 1,
          duration: MOTION.duration.nodeShine,
          easing: MOTION.easing.smoothInOut,
          useNativeDriver: true
        }),
        Animated.timing(shine, {
          toValue: 0,
          duration: MOTION.duration.nodeShine,
          easing: MOTION.easing.smoothInOut,
          useNativeDriver: true
        })
      ])
    );

    animation.start();

    return () => {
      animation.stop();
    };
  }, [node.status, shine]);

  useEffect(() => {
    if (node.status !== "current" && node.status !== "completed") {
      starPulse.stopAnimation();
      starPulse.setValue(0);
      return;
    }

    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(starPulse, {
          toValue: 1,
          duration: MOTION.duration.nodeStarPulse,
          easing: MOTION.easing.smoothInOut,
          useNativeDriver: true
        }),
        Animated.timing(starPulse, {
          toValue: 0,
          duration: MOTION.duration.nodeStarPulse,
          easing: MOTION.easing.smoothInOut,
          useNativeDriver: true
        })
      ])
    );

    animation.start();

    return () => {
      animation.stop();
    };
  }, [node.status, starPulse]);

  return (
    <View style={[styles.nodeWrap, alignments[index % alignments.length]]}>
      <View style={styles.nodeRail}>
        <Animated.View
          style={[
            styles.nodePulseHalo,
            {
              backgroundColor: withAlpha(theme.glow, 0.72),
              opacity: pulse.interpolate({ inputRange: [0, 1], outputRange: [0, 0.32] }),
              transform: [
                {
                  scale: pulse.interpolate({ inputRange: [0, 1], outputRange: [1, 1.22] })
                }
              ]
            }
          ]}
        />
        <Animated.View
          style={{
            transform: [
              {
                translateY: float.interpolate({ inputRange: [0, 1], outputRange: [0, -6] })
              },
              { scale }
            ]
          }}
        >
          <Pressable
            onPress={onPress}
            disabled={node.status === "locked"}
            onHoverIn={() => {
              smoothScaleSpring(scale, 1.055, MOTION.spring.hoverIn).start();
            }}
            onHoverOut={() => {
              smoothScaleSpring(scale, 1, MOTION.spring.hoverOut).start();
            }}
            onPressIn={() => {
              smoothScaleSpring(scale, 0.972, MOTION.spring.pressIn).start();
            }}
            onPressOut={() => {
              smoothScaleSpring(scale, 1.03, MOTION.spring.pressOut).start(() => {
                smoothScaleSpring(scale, 1, MOTION.spring.settle).start();
              });
            }}
            style={[
              styles.nodeCircle,
              node.status === "completed" && { backgroundColor: nodeColor, borderColor: darkenColor(nodeColor) },
              node.status === "current" && [styles.nodeCurrent, { backgroundColor: nodeColor, borderColor: darkenColor(nodeColor) }],
              node.status === "available" && { backgroundColor: nodeColor, borderColor: darkenColor(nodeColor) },
              node.status === "locked" && styles.nodeLocked
            ]}
          >
            <View style={[styles.nodeShadowPad, { backgroundColor: withAlpha(nodeColor, 0.22) }]} />
            <View style={[styles.nodeOuterRing, { borderColor: node.status === "locked" ? "#DBE5DF" : withAlpha(theme.glow, 0.7) }]} />
            <View style={[styles.nodeGloss, { backgroundColor: node.status === "locked" ? "rgba(255,255,255,0.18)" : withAlpha("#FFFFFF", 0.32) }]} />
            <Animated.View
              style={[
                styles.nodeShineSweep,
                {
                  opacity: node.status === "completed" ? 0.42 : 0,
                  transform: [
                    {
                      translateX: shine.interpolate({ inputRange: [0, 1], outputRange: [-72, 72] })
                    },
                    { rotate: "-18deg" }
                  ]
                }
              ]}
            />
            <View style={[styles.nodeInnerOrb, { backgroundColor: innerColor }]}>
              <View style={[styles.nodeInnerRing, { borderColor: node.status === "locked" ? "#DCE5E0" : withAlpha(theme.secondary, 0.26) }]} />
              <NodeGlyph
                kind={stateInfo.legendary ? "book_seal" : visual.glyph}
                coverColor={node.status === "locked" ? "#B6C2BC" : darkenColor(nodeColor)}
                pageColor={node.status === "locked" ? "#E0E7E3" : "#FFFFFF"}
                accentColor={stateInfo.legendary ? "#FFE38C" : node.status === "locked" ? "#C7D2CC" : "#F2C94C"}
              />
            </View>
            {(node.status === "current" || stateInfo.legendary) && (
              <>
                <View style={[styles.nodeSparkle, styles.nodeSparkleLeft]}>
                  <SparkleIcon size={11} color={colors.white} />
                </View>
                <View style={[styles.nodeSparkle, styles.nodeSparkleRight]}>
                  <SparkleIcon size={13} color="#FFE38C" />
                </View>
              </>
            )}
            {node.status === "completed" && (
              <View style={[styles.nodeCornerBadge, { backgroundColor: colors.white, borderColor: withAlpha(theme.secondary, 0.34) }]}>
                <CheckMarkIcon size={12} color={darkenColor(theme.secondary)} />
              </View>
            )}
            {isReviewNode && node.status !== "locked" && (
              <View style={[styles.nodeCornerBadge, styles.nodeCornerBadgeAlt, { backgroundColor: lightenColor(theme.review, 0.84), borderColor: withAlpha(theme.review, 0.3) }]}>
                <SparkleIcon size={10} color={darkenColor(theme.review)} />
              </View>
            )}
            <Animated.View
              style={[
                styles.nodeStarsBadge,
                {
                  backgroundColor: node.status === "locked" ? "#F8FBF9" : colors.white,
                  borderColor: withAlpha(badgeColor, 0.3),
                  transform: [
                    {
                      scale: starPulse.interpolate({ inputRange: [0, 1], outputRange: [1, 1.08] })
                    }
                  ]
                }
              ]}
            >
              <View style={styles.nodeStarsBadgeInner}>
                <SparkleIcon size={10} color={node.status === "locked" ? "#B8C2BD" : badgeColor} />
                <Text style={styles.nodeStarsText}>{`${node.starsReward}`}</Text>
              </View>
            </Animated.View>
          </Pressable>
        </Animated.View>
        {!isLast && (
          <View style={styles.nodeConnectorWrap}>
            <View style={[styles.nodeConnectorAura, { backgroundColor: withAlpha(theme.glow, 0.22) }]} />
            <View style={[styles.nodeConnectorShell, { backgroundColor: withAlpha(theme.secondary, 0.28) }]} />
            <View style={[styles.nodeConnector, { backgroundColor: theme.lane }]} />
            <View style={[styles.nodeConnectorGlow, { backgroundColor: withAlpha(theme.candy, 0.58) }]} />
            <View style={[styles.nodeConnectorDot, styles.nodeConnectorDotTop, { backgroundColor: theme.secondary }]} />
            <View style={[styles.nodeConnectorDot, styles.nodeConnectorDotMid, { backgroundColor: theme.candy }]} />
            <View style={[styles.nodeConnectorDot, styles.nodeConnectorDotBottom, { backgroundColor: theme.reward }]} />
          </View>
        )}
      </View>
      <View style={styles.nodeTextBlock}>
        <Text style={styles.nodeTitle}>{node.title}</Text>
        <View style={[styles.nodeStatePill, { backgroundColor: stateInfo.tint }]}>
          <Text style={[styles.nodeStateText, { color: stateInfo.textColor }]}>{stateInfo.label}</Text>
        </View>
        <Text style={styles.nodeMeta}>{stateInfo.meta ?? `${node.xpReward} XP`}</Text>
      </View>
    </View>
  );
}

function RewardChestStop({
  reward,
  accentColor,
  theme,
  onPress
}: {
  reward: JourneyRewardStop;
  accentColor: string;
  theme: PathTheme;
  onPress: () => void;
}) {
  const scale = useRef(new Animated.Value(1)).current;
  const glow = useRef(new Animated.Value(reward.unlocked && !reward.claimed ? 1 : 0)).current;

  useEffect(() => {
    if (!reward.unlocked || reward.claimed) {
      glow.stopAnimation();
      glow.setValue(0);
      return;
    }

    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(glow, {
          toValue: 1,
          duration: MOTION.duration.rewardGlow,
          easing: MOTION.easing.smoothInOut,
          useNativeDriver: true
        }),
        Animated.timing(glow, {
          toValue: 0,
          duration: MOTION.duration.rewardGlow,
          easing: MOTION.easing.smoothInOut,
          useNativeDriver: true
        })
      ])
    );

    animation.start();

    return () => {
      animation.stop();
    };
  }, [glow, reward.claimed, reward.unlocked]);

  return (
    <View style={styles.rewardStopWrap}>
      <Animated.View
        style={{
          transform: [
            {
              translateY: glow.interpolate({ inputRange: [0, 1], outputRange: [0, -3] })
            },
            { scale }
          ]
        }}
      >
        <Pressable
          onPress={onPress}
          onHoverIn={() => smoothScaleSpring(scale, 1.035, MOTION.spring.hoverIn).start()}
          onHoverOut={() => smoothScaleSpring(scale, 1, MOTION.spring.hoverOut).start()}
          style={[
            styles.rewardStopCard,
            reward.unlocked && { borderColor: accentColor, backgroundColor: lightenColor(theme.reward, 0.86) },
            reward.claimed && styles.rewardStopCardClaimed
          ]}
        >
          <Animated.View
            style={[
              styles.rewardStopHalo,
              {
                backgroundColor: withAlpha(theme.reward, 0.26),
                opacity: glow.interpolate({ inputRange: [0, 1], outputRange: [0.2, 0.62] }),
                transform: [
                  {
                    scale: glow.interpolate({ inputRange: [0, 1], outputRange: [1, 1.12] })
                  }
                ]
              }
            ]}
          />
          <View style={[styles.rewardStopChest, reward.unlocked && { backgroundColor: theme.reward }]}>
            <View style={[styles.rewardStopChestLid, reward.unlocked && { backgroundColor: darkenColor(theme.reward) }]} />
            <View style={[styles.rewardStopChestTrim, { backgroundColor: reward.unlocked ? "#FFF4B0" : "#D9E1DC" }]} />
            <SparkleIcon size={15} color={reward.unlocked ? "#FFF7D0" : "#B8C2BD"} />
          </View>
          <View style={styles.rewardStopText}>
            <Text style={styles.rewardStopTitle}>{reward.title}</Text>
            <Text style={styles.rewardStopCopy}>{reward.copy}</Text>
          </View>
          <View style={styles.rewardStopMeta}>
            <Text style={styles.rewardStopGems}>{`+${reward.gemsReward}`}</Text>
            <Text style={styles.rewardStopMetaLabel}>{reward.claimed ? "Collected" : reward.unlocked ? "Open" : "Locked"}</Text>
          </View>
        </Pressable>
      </Animated.View>
    </View>
  );
}

function CelebrationBurst({
  accentColor,
  xp,
  stars
}: {
  accentColor: string;
  xp: number;
  stars: number;
}) {
  const lift = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    lift.setValue(0);
    Animated.timing(lift, {
      toValue: 1,
      duration: MOTION.duration.celebrationLift,
      easing: MOTION.easing.smoothOut,
      useNativeDriver: true
    }).start();
  }, [lift, stars, xp]);

  const chips = [
    xp > 0 ? { id: "xp", label: `+${xp} XP`, color: accentColor, left: 16 } : undefined,
    stars > 0 ? { id: "stars", label: `+${stars} stars`, color: "#F0B90B", left: 126 } : undefined,
    { id: "streak", label: "Streak up", color: "#8A63FF", left: 236 }
  ].filter(Boolean) as { id: string; label: string; color: string; left: number }[];

  return (
    <View pointerEvents="none" style={styles.celebrationBurstLayer}>
      {chips.map((chip, index) => (
        <Animated.View
          key={chip.id}
          style={[
            styles.celebrationBurstChip,
            {
              left: chip.left,
              backgroundColor: withAlpha(chip.color, 0.14),
              borderColor: withAlpha(chip.color, 0.28),
              opacity: lift.interpolate({
                inputRange: [0, 0.2, 0.75, 1],
                outputRange: [0, 1, 1, 0]
              }),
              transform: [
                {
                  translateY: lift.interpolate({
                    inputRange: [0, 1],
                    outputRange: [16 + index * 3, -34 - index * 4]
                  })
                },
                {
                  scale: lift.interpolate({
                    inputRange: [0, 0.18, 1],
                    outputRange: [0.86, 1, 1.04]
                  })
                }
              ]
            }
          ]}
        >
          <Text style={[styles.celebrationBurstText, { color: darkenColor(chip.color) }]}>{chip.label}</Text>
        </Animated.View>
      ))}
    </View>
  );
}

function CelebrationModal({
  visible,
  celebration,
  onClose
}: {
  visible: boolean;
  celebration?: LessonCelebration;
  onClose: () => void;
}) {
  const scale = useRef(new Animated.Value(0.88)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!visible) {
      scale.setValue(0.88);
      opacity.setValue(0);
      return;
    }

    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: MOTION.duration.modalFade,
        easing: MOTION.easing.smoothOut,
        useNativeDriver: true
      }),
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true,
        speed: MOTION.spring.modalPop.speed,
        bounciness: MOTION.spring.modalPop.bounciness
      })
    ]).start();
  }, [opacity, scale, visible]);

  if (!celebration) {
    return null;
  }

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={onClose}>
      <View style={styles.modalBackdrop}>
        <Animated.View style={[styles.celebrationCard, { opacity, transform: [{ scale }] }]}>
          <CelebrationBurst accentColor={colors.green} xp={celebration.xp} stars={celebration.stars} />
          <View style={styles.celebrationSparkle}>
            <SparkleIcon size={24} color="#FFE38C" />
          </View>
          <Text style={styles.modalEyebrow}>Lesson complete</Text>
          <Text style={styles.modalTitle}>{celebration.title}</Text>
          <Text style={styles.modalCopy}>Bright work. The path just moved forward.</Text>
          <View style={styles.celebrationStats}>
            {celebration.xp > 0 && (
              <View style={styles.celebrationStat}>
                <Text style={styles.celebrationStatValue}>{`+${celebration.xp}`}</Text>
                <Text style={styles.celebrationStatLabel}>XP</Text>
              </View>
            )}
            {celebration.stars > 0 && (
              <View style={styles.celebrationStat}>
                <Text style={styles.celebrationStatValue}>{`+${celebration.stars}`}</Text>
                <Text style={styles.celebrationStatLabel}>Stars</Text>
              </View>
            )}
            {celebration.gemsReward ? (
              <View style={styles.celebrationStat}>
                <Text style={styles.celebrationStatValue}>{`+${celebration.gemsReward}`}</Text>
                <Text style={styles.celebrationStatLabel}>Gems</Text>
              </View>
            ) : null}
            <View style={styles.celebrationStat}>
              <Text style={styles.celebrationStatValue}>{celebration.streakDays}</Text>
              <Text style={styles.celebrationStatLabel}>Streak</Text>
            </View>
          </View>
          {celebration.unlockedTitle ? (
            <View style={styles.celebrationUnlock}>
              <Text style={styles.celebrationUnlockEyebrow}>Unlocked next</Text>
              <Text style={styles.celebrationUnlockTitle}>{celebration.unlockedTitle}</Text>
            </View>
          ) : null}
          <Pressable onPress={onClose} style={styles.modalPrimaryButton}>
            <Text style={styles.modalPrimaryText}>Keep going</Text>
          </Pressable>
        </Animated.View>
      </View>
    </Modal>
  );
}

function SparkleIcon({ size, color }: { size: number; color: string }) {
  const bar = Math.max(2, Math.round(size * 0.22));
  const diamond = Math.max(6, Math.round(size * 0.62));

  return (
    <View style={{ width: size, height: size, alignItems: "center", justifyContent: "center" }}>
      <View
        style={{
          position: "absolute",
          width: bar,
          height: size,
          borderRadius: 999,
          backgroundColor: color
        }}
      />
      <View
        style={{
          position: "absolute",
          width: size,
          height: bar,
          borderRadius: 999,
          backgroundColor: color
        }}
      />
      <View
        style={{
          width: diamond,
          height: diamond,
          borderRadius: Math.max(2, Math.round(diamond * 0.18)),
          backgroundColor: color,
          transform: [{ rotate: "45deg" }]
        }}
      />
    </View>
  );
}

function NodeGlyph({
  kind,
  coverColor,
  pageColor,
  accentColor
}: {
  kind: NodeGlyphKind;
  coverColor: string;
  pageColor: string;
  accentColor: string;
}) {
  const baseBook = (
    <>
      <View style={[styles.bookCover, { backgroundColor: coverColor }]} />
      <View style={[styles.bookPageBlock, { backgroundColor: pageColor }]} />
      <View style={[styles.bookSpine, { backgroundColor: accentColor }]} />
    </>
  );

  if (kind === "book_open") {
    return (
      <View style={styles.nodeGlyphWrap}>
        <View style={[styles.bookOpenPage, styles.bookOpenLeft, { backgroundColor: pageColor, borderColor: coverColor }]} />
        <View style={[styles.bookOpenPage, styles.bookOpenRight, { backgroundColor: pageColor, borderColor: coverColor }]} />
        <View style={[styles.bookOpenCenter, { backgroundColor: coverColor }]} />
      </View>
    );
  }

  if (kind === "book_stack") {
    return (
      <View style={styles.nodeGlyphWrap}>
        <View style={[styles.bookStackBack, { backgroundColor: pageColor, borderColor: coverColor }]} />
        <View style={[styles.bookStackFront, { backgroundColor: coverColor }]} />
        <View style={[styles.bookPageBlock, styles.bookPageBlockFront, { backgroundColor: pageColor }]} />
        <View style={[styles.bookSpine, styles.bookSpineFront, { backgroundColor: accentColor }]} />
      </View>
    );
  }

  if (kind === "book_marked") {
    return (
      <View style={styles.nodeGlyphWrap}>
        {baseBook}
        <View style={[styles.bookRibbon, { backgroundColor: accentColor }]} />
      </View>
    );
  }

  if (kind === "book_seal") {
    return (
      <View style={styles.nodeGlyphWrap}>
        {baseBook}
        <View style={styles.bookSeal}>
          <SparkleIcon size={10} color={accentColor} />
        </View>
      </View>
    );
  }

  if (kind === "sparkle_badge") {
    return (
      <View style={styles.nodeGlyphWrap}>
        <View style={[styles.sparkleBadgeBase, { backgroundColor: coverColor }]} />
        <View style={styles.sparkleBadgeMark}>
          <SparkleIcon size={14} color={accentColor} />
        </View>
      </View>
    );
  }

  if (kind === "brain") {
    return (
      <View style={styles.nodeGlyphWrap}>
        <View style={[styles.brainLobe, styles.brainLobeLeft, { backgroundColor: coverColor }]} />
        <View style={[styles.brainLobe, styles.brainLobeRight, { backgroundColor: coverColor }]} />
        <View style={[styles.brainLobe, styles.brainLobeBottomLeft, { backgroundColor: coverColor }]} />
        <View style={[styles.brainLobe, styles.brainLobeBottomRight, { backgroundColor: coverColor }]} />
        <View style={[styles.brainStem, { backgroundColor: accentColor }]} />
        <View style={[styles.brainFold, styles.brainFoldTop]} />
        <View style={[styles.brainFold, styles.brainFoldBottom]} />
      </View>
    );
  }

  if (kind === "shield_sword") {
    return (
      <View style={styles.nodeGlyphWrap}>
        <View style={[styles.shieldBody, { backgroundColor: coverColor }]}>
          <View style={[styles.shieldInset, { backgroundColor: pageColor }]} />
        </View>
        <View style={[styles.swordBlade, { backgroundColor: accentColor }]} />
        <View style={[styles.swordGuard, { backgroundColor: coverColor }]} />
        <View style={[styles.swordHandle, { backgroundColor: coverColor }]} />
      </View>
    );
  }

  if (kind === "home_heart") {
    return (
      <View style={styles.nodeGlyphWrap}>
        <View style={[styles.homeRoof, { borderBottomColor: coverColor }]} />
        <View style={[styles.homeBody, { backgroundColor: coverColor }]}>
          <View style={[styles.homeDoor, { backgroundColor: pageColor }]} />
        </View>
        <View style={styles.homeHeartWrap}>
          <View style={[styles.homeHeartCircle, styles.homeHeartLeft, { backgroundColor: accentColor }]} />
          <View style={[styles.homeHeartCircle, styles.homeHeartRight, { backgroundColor: accentColor }]} />
          <View style={[styles.homeHeartPoint, { backgroundColor: accentColor }]} />
        </View>
      </View>
    );
  }

  return <View style={styles.nodeGlyphWrap}>{baseBook}</View>;
}

function CoachCard({ section, title, copy }: { section: LearningSection; title: string; copy: string }) {
  return (
    <View style={styles.coachCard}>
      <GuideMascot variant={section.mascot} accentColor={section.accentColor} size={78} />
      <View style={styles.coachBubble}>
        <Text style={styles.coachTitle}>{title}</Text>
        <Text style={styles.coachCopy}>{copy}</Text>
      </View>
    </View>
  );
}

function LessonScreen({
  section,
  strings,
  language,
  session,
  challengeIndex,
  selectedChoiceId,
  answerState,
  onSelectChoice,
  onAnswer,
  onContinue,
  onSkip,
  onExit
}: {
  section: LearningSection;
  strings: UiStrings;
  language: SupportedLanguage;
  session: LessonSession;
  challengeIndex: number;
  selectedChoiceId?: string;
  answerState: AnswerState;
  onSelectChoice: (choiceId: string) => void;
  onAnswer: () => void;
  onContinue: () => void;
  onSkip: () => void;
  onExit: () => void;
}) {
  const challenge = session.lesson.challenges[challengeIndex];
  const progress = (challengeIndex + 1) / session.lesson.challenges.length;
  const lessonStars = getNodeStarsReward(session.lesson.nodeId);

  return (
    <View style={styles.lessonScreen}>
      <View style={styles.lessonTop}>
        <View style={styles.lessonTopActions}>
          <Pressable onPress={onExit} style={styles.closeButton}>
            <Text style={styles.closeText}>Exit</Text>
          </Pressable>
          <Pressable onPress={onSkip} style={styles.skipLessonButton}>
            <Text style={styles.skipLessonText}>{session.mode === "test_out" ? "Leave test" : "Skip for now"}</Text>
          </Pressable>
        </View>
        <View style={styles.lessonProgressTrack}>
          <AnimatedProgressBar progress={progress} color={section.accentColor} trackColor={colors.gray} height={12} />
        </View>
      </View>

      <View style={styles.lessonBody}>
        <View style={styles.lessonCoachCard}>
          <GuideMascot variant={section.mascot} accentColor={section.accentColor} size={88} />
          <View style={styles.lessonSpeechBubble}>
            <Text style={styles.lessonSpeechTitle}>{section.title}</Text>
            <Text style={styles.lessonSpeechCopy}>{session.lesson.intro}</Text>
          </View>
        </View>

        <View style={styles.promptCard}>
          <Text style={styles.eyebrow}>{session.lesson.title}</Text>
          <Text style={styles.challengePrompt}>{challenge.prompt}</Text>
        </View>

        <View style={styles.choiceStack}>
          {challenge.choices.map((choice) => {
            const isSelected = choice.id === selectedChoiceId;
            const isCorrect = choice.id === challenge.correctChoiceId;
            const shouldShowCorrect = Boolean(answerState) && isCorrect;
            const shouldShowWrong = answerState === "wrong" && isSelected && !isCorrect;

            return (
              <Pressable
                key={choice.id}
                disabled={Boolean(answerState)}
                onPress={() => onSelectChoice(choice.id)}
                style={[
                  styles.choiceButton,
                  isSelected && styles.choiceSelected,
                  shouldShowCorrect && { borderColor: section.accentColor, backgroundColor: lightenColor(section.accentColor, 0.9) },
                  shouldShowWrong && styles.choiceWrong
                ]}
              >
                <Text style={styles.choiceText}>{choice.label}</Text>
              </Pressable>
            );
          })}
        </View>

        {session.lesson.sources.length > 0 && <LessonSources sources={session.lesson.sources} accentColor={section.accentColor} strings={strings} language={language} />}
      </View>

      <LessonFooter
        strings={strings}
        lesson={session.lesson}
        challenge={challenge}
        answerState={answerState}
        selectedChoiceId={selectedChoiceId}
        starsReward={lessonStars}
        onAnswer={onAnswer}
        onContinue={onContinue}
      />
    </View>
  );
}

function LessonFooter({
  strings,
  lesson,
  challenge,
  answerState,
  selectedChoiceId,
  starsReward,
  onAnswer,
  onContinue
}: {
  strings: UiStrings;
  lesson: LessonSession["lesson"];
  challenge: Challenge;
  answerState: AnswerState;
  selectedChoiceId?: string;
  starsReward: number;
  onAnswer: () => void;
  onContinue: () => void;
}) {
  if (answerState) {
    return (
      <View
        style={[
          styles.feedbackPane,
          answerState === "correct" ? styles.feedbackGood : styles.feedbackBad
        ]}
      >
        <Text style={[styles.feedbackTitle, answerState === "correct" ? styles.feedbackTitleGood : styles.feedbackTitleBad]}>
          {answerState === "correct" ? strings.correct : strings.notQuite}
        </Text>
        <Text style={styles.feedbackCopy}>{challenge.explanation}</Text>
        <View style={styles.feedbackTeachCard}>
          <Text style={styles.feedbackTeachTitle}>Mini-lesson</Text>
          <Text style={styles.feedbackTeachCopy}>{challenge.miniLesson ?? lesson.explanationContent ?? lesson.intro}</Text>
        </View>
        {answerState === "wrong" && (challenge.easierExplanation || challenge.reviewSuggestion) ? (
          <View style={styles.feedbackSupportCard}>
            {challenge.easierExplanation ? <Text style={styles.feedbackSupportCopy}>{challenge.easierExplanation}</Text> : null}
            {challenge.reviewSuggestion ? <Text style={styles.feedbackSupportHint}>{`Review next: ${challenge.reviewSuggestion}`}</Text> : null}
            {challenge.resourceUrl ? (
              <Pressable onPress={() => Linking.openURL(challenge.resourceUrl!)} style={styles.feedbackSupportLinkWrap}>
                <Text style={styles.feedbackSupportLink}>{challenge.resourceLabel ?? "Open source"}</Text>
              </Pressable>
            ) : null}
          </View>
        ) : null}
        {answerState === "correct" && (
          <View style={styles.rewardRow}>
            <View style={styles.rewardStars}>
              {Array.from({ length: Math.max(1, Math.min(starsReward, 3)) }).map((_, index) => (
                <SparkleIcon key={`reward-star-${index}`} size={14} color="#F0B90B" />
              ))}
            </View>
            <Text style={styles.rewardCopy}>{`+${starsReward} ${strings.starsForPart}`}</Text>
          </View>
        )}
        <Pressable onPress={onContinue} style={[styles.primaryButton, answerState === "correct" ? styles.correctButton : styles.wrongButton]}>
          <Text style={styles.primaryButtonText}>{strings.continue}</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.feedbackPane}>
      <Text style={styles.feedbackCopy}>{strings.pickAnswer}</Text>
      <Pressable
        onPress={onAnswer}
        disabled={!selectedChoiceId}
        style={[styles.primaryButton, styles.checkButton, !selectedChoiceId && styles.primaryButtonDisabled]}
      >
        <Text style={styles.primaryButtonText}>{strings.check}</Text>
      </Pressable>
    </View>
  );
}

function ShopScreen({
  user,
  strings,
  items,
  section,
  onUseItem,
  onDone
}: {
  user: UserProfile;
  strings: UiStrings;
  items: ShopItem[];
  section: LearningSection;
  onUseItem: (item: ShopItem) => void;
  onDone: () => void;
}) {
  return (
    <ScrollView contentContainerStyle={styles.shopContent}>
      <View style={[styles.shopHero, { backgroundColor: lightenColor(section.accentColor, 0.92) }]}>
        <View style={styles.shopHeroText}>
          <Text style={styles.eyebrow}>{strings.heartShop}</Text>
          <Text style={styles.title}>{`${strings.keepLearning} ${section.title}`}</Text>
          <Text style={styles.subtitle}>
            {user.hearts.unlimited
              ? strings.membershipActive
              : `${strings.youHave} ${formatHearts(user)}.`}
          </Text>
        </View>
        <GuideMascot variant={section.mascot} accentColor={section.accentColor} size={112} />
      </View>

      <View style={styles.planCard}>
        <View style={styles.planHeaderRow}>
          <View>
            <Text style={styles.planTierEyebrow}>Free tier</Text>
            <Text style={styles.planTitle}>Start free</Text>
          </View>
          <Text style={styles.planPrice}>$0</Text>
        </View>
        <Text style={styles.planCopy}>Learn the basics, keep your streak alive, and unlock more depth when you are ready.</Text>
        {[
          "Core topic access",
          "Daily learning path",
          "Hearts, streak, and XP tracking"
        ].map((benefit) => (
          <Text key={benefit} style={styles.planBenefit}>{`• ${benefit}`}</Text>
        ))}
      </View>

      {items.map((item) => (
        <View key={item.id} style={[styles.shopItem, item.tier && styles.shopPlanCard]}>
          <View style={styles.shopItemText}>
            <View style={styles.planHeaderRow}>
              <View style={styles.planTitleWrap}>
                <Text style={styles.shopItemTitle}>{item.name}</Text>
                {item.highlightBadge ? <Text style={styles.planBadge}>{item.highlightBadge}</Text> : null}
              </View>
              <Text style={styles.planPrice}>{formatPrice(item)}</Text>
            </View>
            <Text style={styles.shopItemCopy}>{item.localizedDescription}</Text>
            {item.benefits?.map((benefit) => (
              <Text key={`${item.id}_${benefit}`} style={styles.planBenefit}>{`• ${benefit}`}</Text>
            ))}
          </View>
          <Pressable onPress={() => onUseItem(item)} style={[styles.secondaryButton, { backgroundColor: section.accentColor }]}>
            <Text style={styles.secondaryButtonText}>{item.tier ? "Upgrade" : formatPrice(item)}</Text>
          </Pressable>
        </View>
      ))}

      <Pressable onPress={onDone} style={[styles.primaryButton, { backgroundColor: section.accentColor }]}>
        <Text style={styles.primaryButtonText}>{strings.backToPath}</Text>
      </Pressable>
    </ScrollView>
  );
}

function SocialScreen({
  user,
  userStars,
  leaderboard,
  connections,
  battleHistory,
  alerts,
  inviteName,
  inviteEmail,
  inviteRelation,
  onChangeInviteName,
  onChangeInviteEmail,
  onChangeInviteRelation,
  onAddConnection,
  onBattle,
  onSendReminder,
  onDone
}: {
  user: UserProfile;
  userStars: number;
  leaderboard: Array<{
    id: string;
    name: string;
    relation: "you" | SocialRelation;
    avatarInitials: string;
    totalXp: number;
    streakDays: number;
    stars: number;
    wins: number;
    losses: number;
    score: number;
  }>;
  connections: SocialConnection[];
  battleHistory: BattleResult[];
  alerts: Array<{
    id: string;
    connectionId: string;
    name: string;
    relation: SocialRelation;
    kind: "daily" | "weekly";
    copy: string;
  }>;
  inviteName: string;
  inviteEmail: string;
  inviteRelation: SocialRelation;
  onChangeInviteName: (value: string) => void;
  onChangeInviteEmail: (value: string) => void;
  onChangeInviteRelation: (value: SocialRelation) => void;
  onAddConnection: () => void;
  onBattle: (connection: SocialConnection) => void;
  onSendReminder: (connection: SocialConnection, kind: "daily" | "weekly") => void;
  onDone: () => void;
}) {
  const userScore = leaderboard.find((entry) => entry.id === "me")?.score ?? getSocialScore({ totalXp: user.totalXp, streakDays: user.streakDays, stars: userStars, wins: 0 });

  return (
    <ScrollView contentContainerStyle={styles.socialContent} showsVerticalScrollIndicator={false}>
      <View style={styles.socialHero}>
        <View style={styles.socialHeroText}>
          <Text style={styles.eyebrow}>Crew</Text>
          <Text style={styles.title}>Parents, friends, and battles</Text>
          <Text style={styles.subtitle}>Add people to follow each other, race on the leaderboard, and battle live score against score.</Text>
          {user.accountRole && (
            <View style={styles.socialRolePill}>
              <Text style={styles.socialRolePillText}>{`You are a ${startCaseAccountRole(user.accountRole)}`}</Text>
            </View>
          )}
        </View>
        <View style={styles.socialHeroScore}>
          <Text style={styles.socialHeroScoreLabel}>Your score</Text>
          <Text style={styles.socialHeroScoreValue}>{userScore}</Text>
        </View>
      </View>

      <View style={styles.socialCard}>
        <Text style={styles.socialCardTitle}>Add a parent or friend</Text>
        <Text style={styles.socialCardCopy}>Invite someone into your circle so you can track progress, challenge each other, and keep accountability.</Text>
        <View style={styles.relationRow}>
          <Pressable
            onPress={() => onChangeInviteRelation("friend")}
            style={[styles.relationButton, inviteRelation === "friend" && styles.relationButtonActive]}
          >
            <Text style={[styles.relationButtonText, inviteRelation === "friend" && styles.relationButtonTextActive]}>Friend</Text>
          </Pressable>
          <Pressable
            onPress={() => onChangeInviteRelation("parent")}
            style={[styles.relationButton, inviteRelation === "parent" && styles.relationButtonActive]}
          >
            <Text style={[styles.relationButtonText, inviteRelation === "parent" && styles.relationButtonTextActive]}>Parent</Text>
          </Pressable>
        </View>
        <TextInput
          value={inviteName}
          onChangeText={onChangeInviteName}
          placeholder={inviteRelation === "parent" ? "Parent name" : "Friend name"}
          placeholderTextColor={colors.muted}
          style={styles.input}
        />
        <TextInput
          value={inviteEmail}
          onChangeText={onChangeInviteEmail}
          placeholder="Email address (optional)"
          autoCapitalize="none"
          keyboardType="email-address"
          placeholderTextColor={colors.muted}
          style={styles.input}
        />
        <Pressable onPress={onAddConnection} style={[styles.primaryButton, styles.socialAddButton]}>
          <Text style={styles.primaryButtonText}>Add to crew</Text>
        </Pressable>
      </View>

      <View style={styles.socialCard}>
        <Text style={styles.socialCardTitle}>Accountability reminders</Text>
        <Text style={styles.socialCardCopy}>If someone misses today or goes quiet for a week, you can send a quick reminder.</Text>
        {alerts.length === 0 ? (
          <View style={styles.emptySocialState}>
            <Text style={styles.emptySocialTitle}>Everyone is on track</Text>
            <Text style={styles.emptySocialCopy}>No reminder is due right now. Once someone slips on daily or weekly activity, they will show up here.</Text>
          </View>
        ) : (
          <View style={styles.alertStack}>
            {alerts.map((alert) => {
              const connection = connections.find((item) => item.id === alert.connectionId);

              if (!connection) {
                return null;
              }

              return (
                <View key={alert.id} style={styles.alertCard}>
                  <View style={styles.alertTextWrap}>
                    <Text style={styles.alertTitle}>{`${alert.name} - ${alert.kind === "weekly" ? "Weekly reminder" : "Daily reminder"}`}</Text>
                    <Text style={styles.alertCopy}>{alert.copy}</Text>
                  </View>
                  <Pressable onPress={() => onSendReminder(connection, alert.kind)} style={styles.remindButton}>
                    <Text style={styles.remindButtonText}>Notify</Text>
                  </Pressable>
                </View>
              );
            })}
          </View>
        )}
      </View>

      <View style={styles.socialCard}>
        <Text style={styles.socialCardTitle}>Leaderboard</Text>
        <Text style={styles.socialCardCopy}>Everyone can see the score and where they stand.</Text>
        <View style={styles.leaderboardStack}>
          {leaderboard.map((entry, index) => (
            <View key={entry.id} style={styles.leaderboardRow}>
              <View style={styles.leaderboardRank}>
                <Text style={styles.leaderboardRankText}>{index + 1}</Text>
              </View>
              <View style={[styles.leaderboardAvatar, entry.relation === "you" && styles.leaderboardAvatarUser]}>
                <Text style={[styles.leaderboardAvatarText, entry.relation === "you" && styles.leaderboardAvatarTextUser]}>{entry.avatarInitials}</Text>
              </View>
              <View style={styles.leaderboardMain}>
                <Text style={styles.leaderboardName}>{entry.name}</Text>
                <Text style={styles.leaderboardMeta}>
                  {entry.relation === "you" ? "You" : startCaseRelation(entry.relation)} - {entry.totalXp} XP - {entry.streakDays} day streak - {entry.stars} stars
                </Text>
              </View>
              <View style={styles.leaderboardScore}>
                <Text style={styles.leaderboardScoreValue}>{entry.score}</Text>
                <Text style={styles.leaderboardScoreLabel}>score</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.socialCard}>
        <Text style={styles.socialCardTitle}>Battle someone</Text>
        <Text style={styles.socialCardCopy}>Tap battle and the live match score is posted right here.</Text>
        {connections.length === 0 ? (
          <View style={styles.emptySocialState}>
            <Text style={styles.emptySocialTitle}>Your crew is empty</Text>
            <Text style={styles.emptySocialCopy}>Add a parent or friend above and the battle board will light up.</Text>
          </View>
        ) : (
          <View style={styles.socialRoster}>
            {connections.map((connection) => (
              <View key={connection.id} style={styles.connectionCard}>
                <View style={styles.connectionHeader}>
                  <View style={styles.connectionAvatar}>
                    <Text style={styles.connectionAvatarText}>{connection.avatarInitials}</Text>
                  </View>
                  <View style={styles.connectionText}>
                    <Text style={styles.connectionName}>{connection.name}</Text>
                    <Text style={styles.connectionMeta}>{startCaseRelation(connection.relation)} - {connection.totalXp} XP - {connection.stars} stars</Text>
                  </View>
                  <Pressable onPress={() => onBattle(connection)} style={styles.battleButton}>
                    <Text style={styles.battleButtonText}>Battle</Text>
                  </Pressable>
                </View>
                <Text style={styles.connectionRecord}>
                  {`Record ${connection.wins}-${connection.losses} - Last active ${formatRelativeTime(connection.lastActiveAt)}${connection.connectedWithAccount ? " - Connected account" : ""}`}
                </Text>
              </View>
            ))}
          </View>
        )}
      </View>

      <View style={styles.socialCard}>
        <Text style={styles.socialCardTitle}>Recent battle scores</Text>
        <Text style={styles.socialCardCopy}>Every match score stays visible so everyone knows who edged ahead.</Text>
        {battleHistory.length === 0 ? (
          <View style={styles.emptySocialState}>
            <Text style={styles.emptySocialTitle}>No battles yet</Text>
            <Text style={styles.emptySocialCopy}>Once you battle a friend or parent, the score lands here.</Text>
          </View>
        ) : (
          <View style={styles.battleHistoryStack}>
            {battleHistory.map((battle) => (
              <View key={battle.id} style={styles.battleHistoryRow}>
                <View style={styles.battleHistoryText}>
                  <Text style={styles.battleHistoryTitle}>{`You vs ${battle.opponentName}`}</Text>
                  <Text style={styles.battleHistoryMeta}>
                    {battle.winner === "user" ? "You won" : `${battle.opponentName} won`} - {startCaseRelation(battle.opponentRelation)} - {formatRelativeTime(battle.createdAt)}
                  </Text>
                </View>
                <View style={styles.battleScorePill}>
                  <Text style={styles.battleScoreText}>{`${battle.myScore} - ${battle.theirScore}`}</Text>
                </View>
              </View>
            ))}
          </View>
        )}
      </View>

      <Pressable onPress={onDone} style={[styles.primaryButton, styles.socialDoneButton]}>
        <Text style={styles.primaryButtonText}>Back to path</Text>
      </Pressable>
    </ScrollView>
  );
}

function LessonSources({
  sources,
  accentColor,
  strings,
  language,
  limit,
  onOpenSource
}: {
  sources: LessonSource[];
  accentColor: string;
  strings: UiStrings;
  language: SupportedLanguage;
  limit?: number;
  onOpenSource?: (url: string) => void;
}) {
  const visibleSources = limit ? sources.slice(0, limit) : sources;

  return (
    <View style={styles.sourcesBlock}>
      <Text style={styles.sourcesTitle}>{strings.sourceNotes}</Text>
      {visibleSources.map((source) => {
        const statusTone = getSourceValidationTone(source.validationStatus ?? "needs_review");

        return (
          <Pressable
            key={source.id}
            onPress={() => onOpenSource ? onOpenSource(source.url) : Linking.openURL(source.url)}
            style={[styles.sourceCard, { borderColor: accentColor }]}
          >
            <View style={styles.sourceHeader}>
              <Text style={[styles.sourceBadge, { backgroundColor: lightenColor(accentColor, 0.88) }]}>{source.site}</Text>
              <Text style={styles.sourceCategory}>{formatSourceCategory(source.category, language)}</Text>
              {source.reviewed ? (
                <View style={styles.sourceReviewedPill}>
                  <Text style={styles.sourceReviewedText}>{translateStudyText("Reviewed", language)}</Text>
                </View>
              ) : null}
              <View style={[styles.sourceStatusPill, { backgroundColor: statusTone.background }]}>
                <Text style={[styles.sourceStatusText, { color: statusTone.text }]}>{formatSourceValidationStatus(source.validationStatus ?? "needs_review", language)}</Text>
              </View>
            </View>
            <Text style={styles.sourceTitle}>{source.title}</Text>
            <View style={styles.sourceSupportRow}>
              <Text style={[styles.sourceSupportPill, { color: darkenColor(accentColor), backgroundColor: lightenColor(accentColor, 0.93) }]}>
                {formatSourceSupportType(source.supportType ?? "support", language)}
              </Text>
            </View>
            <View style={styles.sourceMetaStack}>
              <View style={styles.sourceMetaRow}>
                <Text style={styles.sourceMetaLabel}>{strings.reference}</Text>
                <Text style={styles.sourceMetaValue}>{source.reference ?? source.title}</Text>
              </View>
              <View style={styles.sourceMetaRow}>
                <Text style={styles.sourceMetaLabel}>{strings.from}</Text>
                <Text style={styles.sourceMetaValue}>{source.from ?? defaultSourceFrom(source)}</Text>
              </View>
              <View style={styles.sourceMetaRow}>
                <Text style={styles.sourceMetaLabel}>{strings.grade}</Text>
                <Text style={styles.sourceMetaValue}>{source.grade ?? defaultSourceGrade(source)}</Text>
              </View>
            </View>
            {source.teaches ? (
              <View style={styles.sourceTeachingCard}>
                <Text style={styles.sourceTeachingLabel}>{translateStudyText("What it teaches", language)}</Text>
                <Text style={styles.sourceTeachingCopy}>{source.teaches}</Text>
              </View>
            ) : null}
            <Text style={styles.sourceCopy}>{source.summary}</Text>
            {source.whyAttached ? (
              <View style={styles.sourceAttachmentCard}>
                <Text style={styles.sourceAttachmentLabel}>{translateStudyText("Why this is attached", language)}</Text>
                <Text style={styles.sourceAttachmentCopy}>{source.whyAttached}</Text>
              </View>
            ) : null}
            <Text style={styles.sourceLink}>{strings.openSource}</Text>
          </Pressable>
        );
      })}
      {limit && sources.length > visibleSources.length ? (
        <Text style={styles.sourceListHint}>{translateStudyText("More lesson evidence appears after the question review.", language)}</Text>
      ) : null}
    </View>
  );
}

function StarMeter({
  earned,
  total,
  strings,
  compact = false,
  light = false
}: {
  earned: number;
  total: number;
  strings: UiStrings;
  compact?: boolean;
  light?: boolean;
}) {
  return (
    <View style={[styles.starMeter, compact && styles.starMeterCompact]}>
      <View style={styles.starMeterValueRow}>
        <SparkleIcon size={12} color={light ? "#FFF1A8" : "#F0B90B"} />
        <Text style={[styles.starMeterValue, light && styles.starMeterValueLight]}>{`${earned}/${total} ${strings.stars}`}</Text>
      </View>
      {!compact && <Text style={[styles.starMeterLabel, light && styles.starMeterLabelLight]}>{strings.starsInPart}</Text>}
    </View>
  );
}

function AccountModal({
  visible,
  onClose,
  strings,
  mode,
  hasSavedAccount,
  onChangeMode,
  onCreate,
  onLogin,
  onSocialLogin,
  accountName,
  accountEmail,
  accountPassword,
  onChangeName,
  onChangeEmail,
  onChangePassword
}: {
  visible: boolean;
  onClose: () => void;
  strings: UiStrings;
  mode: AuthMode;
  hasSavedAccount: boolean;
  onChangeMode: (mode: AuthMode) => void;
  onCreate: () => void;
  onLogin: () => void;
  onSocialLogin: (provider: SocialProvider) => void;
  accountName: string;
  accountEmail: string;
  accountPassword: string;
  onChangeName: (value: string) => void;
  onChangeEmail: (value: string) => void;
  onChangePassword: (value: string) => void;
}) {
  const enabledSocialProviders = (Object.entries(SOCIAL_AUTH_CONFIG) as [SocialProvider, typeof SOCIAL_AUTH_CONFIG[SocialProvider]][])
    .filter(([, config]) => config.enabled);

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.modalBackdrop}>
        <View style={styles.modalCard}>
          <Text style={styles.modalEyebrow}>{strings.keepYourProgress}</Text>
          <Text style={styles.modalTitle}>{mode === "create" ? strings.havingFun : strings.welcomeBack}</Text>
          <Text style={styles.modalCopy}>
            {mode === "create"
              ? strings.createCopy
              : strings.loginCopy}
          </Text>
          <View style={styles.authModeRow}>
            <Pressable
              onPress={() => onChangeMode("create")}
              style={[styles.authModeButton, mode === "create" && styles.authModeButtonActive]}
            >
              <Text style={[styles.authModeText, mode === "create" && styles.authModeTextActive]}>{strings.createAccount}</Text>
            </Pressable>
            <Pressable
              onPress={() => onChangeMode("login")}
              style={[styles.authModeButton, mode === "login" && styles.authModeButtonActive]}
            >
              <Text style={[styles.authModeText, mode === "login" && styles.authModeTextActive]}>{strings.logIn}</Text>
            </Pressable>
          </View>
          {mode === "create" && (
            <TextInput
              value={accountName}
              onChangeText={onChangeName}
              placeholder={strings.yourName}
              placeholderTextColor={colors.muted}
              style={styles.input}
            />
          )}
          <TextInput
            value={accountEmail}
            onChangeText={onChangeEmail}
            placeholder={strings.emailAddress}
            autoCapitalize="none"
            keyboardType="email-address"
            placeholderTextColor={colors.muted}
            style={styles.input}
          />
          <TextInput
            value={accountPassword}
            onChangeText={onChangePassword}
            placeholder={mode === "create" ? strings.createPassword : strings.password}
            autoCapitalize="none"
            secureTextEntry
            placeholderTextColor={colors.muted}
            style={styles.input}
          />
          {enabledSocialProviders.length > 0 && (
            <View style={styles.socialStack}>
              {enabledSocialProviders.map(([provider, config]) => (
                <Pressable
                  key={provider}
                  onPress={() => onSocialLogin(provider)}
                  style={[styles.socialButton, provider === "google" ? styles.googleButton : styles.facebookButton]}
                >
                  <Text style={styles.socialButtonBrand}>{provider === "google" ? "G" : "f"}</Text>
                  <Text style={styles.socialButtonText}>{config.label}</Text>
                </Pressable>
              ))}
            </View>
          )}
          <Text style={styles.modalHint}>
            {hasSavedAccount
              ? strings.savedAccountHint
              : enabledSocialProviders.length > 0
                ? strings.socialHint
                : "Email and password are ready now. Google and Facebook will appear here once their mobile app credentials are connected."}
          </Text>
          <View style={styles.modalActions}>
            <Pressable onPress={onClose} style={styles.modalGhostButton}>
              <Text style={styles.modalGhostText}>{strings.later}</Text>
            </Pressable>
            <Pressable onPress={mode === "create" ? onCreate : onLogin} style={styles.modalPrimaryButton}>
              <Text style={styles.modalPrimaryText}>{mode === "create" ? strings.createAccount : strings.logIn}</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

function SettingsModal({
  visible,
  strings,
  language,
  role,
  dailyReminder,
  weeklyReminder,
  streakReminder,
  islamicReminder,
  soundEnabled,
  reducedSound,
  onClose,
  onSelectRole,
  onToggleDaily,
  onToggleWeekly,
  onToggleStreak,
  onToggleIslamic,
  onToggleSound,
  onToggleReducedSound,
  onLogout,
  onSave
}: {
  visible: boolean;
  strings: UiStrings;
  language: SupportedLanguage;
  role?: AccountRole;
  dailyReminder: boolean;
  weeklyReminder: boolean;
  streakReminder: boolean;
  islamicReminder: boolean;
  soundEnabled: boolean;
  reducedSound: boolean;
  onClose: () => void;
  onSelectRole: (role?: AccountRole) => void;
  onToggleDaily: () => void;
  onToggleWeekly: () => void;
  onToggleStreak: () => void;
  onToggleIslamic: () => void;
  onToggleSound: () => void;
  onToggleReducedSound: () => void;
  onLogout: () => void;
  onSave: () => void;
}) {
  const options: Array<{
    id: "adult" | AccountRole;
    title: string;
    copy: string;
  }> = [
    {
      id: "adult",
      title: strings.regularLearner,
      copy: strings.regularLearnerCopy
    },
    {
      id: "child",
      title: strings.childMode,
      copy: strings.childModeCopy
    },
    {
      id: "parent",
      title: strings.parentMode,
      copy: strings.parentModeCopy
    }
  ];

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.modalBackdrop}>
        <View style={styles.modalCard}>
          <Text style={styles.modalEyebrow}>{strings.settings}</Text>
          <Text style={styles.modalTitle}>{strings.accountSettingsTitle}</Text>
          <Text style={styles.modalCopy}>{strings.accountSettingsCopy}</Text>

          <View style={styles.settingsOptionStack}>
            {options.map((option) => {
              const selected = option.id === (role ?? "adult");

              return (
                <Pressable
                  key={option.id}
                  onPress={() => onSelectRole(option.id === "adult" ? undefined : option.id)}
                  style={[styles.settingsOptionCard, selected && styles.settingsOptionCardActive]}
                >
                  <Text style={[styles.settingsOptionTitle, selected && styles.settingsOptionTitleActive]}>{option.title}</Text>
                  <Text style={[styles.settingsOptionCopy, selected && styles.settingsOptionCopyActive]}>{option.copy}</Text>
                </Pressable>
              );
            })}
          </View>

          {role && (
            <View style={styles.settingsReminderCard}>
              <Text style={styles.settingsReminderTitle}>{strings.reminderSettings}</Text>
              <Pressable onPress={onToggleDaily} style={styles.settingsToggleRow}>
                <View style={styles.settingsToggleTextWrap}>
                  <Text style={styles.settingsToggleLabel}>{strings.dailyReminder}</Text>
                </View>
                <View style={[styles.settingsTogglePill, dailyReminder && styles.settingsTogglePillActive]}>
                  <View style={[styles.settingsToggleKnob, dailyReminder && styles.settingsToggleKnobActive]} />
                </View>
              </Pressable>
              <Pressable onPress={onToggleWeekly} style={styles.settingsToggleRow}>
                <View style={styles.settingsToggleTextWrap}>
                  <Text style={styles.settingsToggleLabel}>{strings.weeklyReminder}</Text>
                </View>
                <View style={[styles.settingsTogglePill, weeklyReminder && styles.settingsTogglePillActive]}>
                  <View style={[styles.settingsToggleKnob, weeklyReminder && styles.settingsToggleKnobActive]} />
                </View>
              </Pressable>
            </View>
          )}

          <View style={styles.settingsReminderCard}>
            <Text style={styles.settingsReminderTitle}>{strings.personalReminderSettings}</Text>
            <Pressable onPress={onToggleStreak} style={styles.settingsToggleRow}>
              <View style={styles.settingsToggleTextWrap}>
                <Text style={styles.settingsToggleLabel}>{strings.streakReminder}</Text>
              </View>
              <View style={[styles.settingsTogglePill, streakReminder && styles.settingsTogglePillActive]}>
                <View style={[styles.settingsToggleKnob, streakReminder && styles.settingsToggleKnobActive]} />
              </View>
            </Pressable>
            <Pressable onPress={onToggleIslamic} style={styles.settingsToggleRow}>
              <View style={styles.settingsToggleTextWrap}>
                <Text style={styles.settingsToggleLabel}>{strings.islamicReminder}</Text>
              </View>
              <View style={[styles.settingsTogglePill, islamicReminder && styles.settingsTogglePillActive]}>
                <View style={[styles.settingsToggleKnob, islamicReminder && styles.settingsToggleKnobActive]} />
              </View>
            </Pressable>
            <Text style={styles.settingsReminderHelp}>{strings.notificationHelp}</Text>
          </View>

          <View style={styles.settingsReminderCard}>
            <Text style={styles.settingsReminderTitle}>{translateStudyText("Game feel", language)}</Text>
            <Pressable onPress={onToggleSound} style={styles.settingsToggleRow}>
              <View style={styles.settingsToggleTextWrap}>
                <Text style={styles.settingsToggleLabel}>{translateStudyText("Sound effects", language)}</Text>
              </View>
              <View style={[styles.settingsTogglePill, soundEnabled && styles.settingsTogglePillActive]}>
                <View style={[styles.settingsToggleKnob, soundEnabled && styles.settingsToggleKnobActive]} />
              </View>
            </Pressable>
            <Pressable onPress={onToggleReducedSound} style={styles.settingsToggleRow}>
              <View style={styles.settingsToggleTextWrap}>
                <Text style={styles.settingsToggleLabel}>{translateStudyText("Reduced sound mode", language)}</Text>
              </View>
              <View style={[styles.settingsTogglePill, reducedSound && styles.settingsTogglePillActive]}>
                <View style={[styles.settingsToggleKnob, reducedSound && styles.settingsToggleKnobActive]} />
              </View>
            </Pressable>
            <Text style={styles.settingsReminderHelp}>{translateStudyText("Keep the cute feedback, or soften it if you want a calmer session.", language)}</Text>
          </View>

          <View style={styles.modalActions}>
            <Pressable onPress={onLogout} style={styles.modalDangerButton}>
              <Text style={styles.modalDangerText}>{translateStudyText("Log out", language)}</Text>
            </Pressable>
          </View>

          <View style={styles.modalActions}>
            <Pressable onPress={onClose} style={styles.modalGhostButton}>
              <Text style={styles.modalGhostText}>{strings.later}</Text>
            </Pressable>
            <Pressable onPress={onSave} style={styles.modalPrimaryButton}>
              <Text style={styles.modalPrimaryText}>{strings.saveSettings}</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

function ReviewRestoreModal({
  visible,
  strings,
  onClose,
  onRestore
}: {
  visible: boolean;
  strings: UiStrings;
  onClose: () => void;
  onRestore: () => void;
}) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.modalBackdrop}>
        <View style={styles.modalCard}>
          <Text style={styles.modalEyebrow}>{strings.firstHeartReset}</Text>
          <Text style={styles.modalTitle}>{strings.outOfHearts}</Text>
          <Text style={styles.modalCopy}>{strings.reviewCopy}</Text>
          <View style={styles.reviewRestoreCard}>
            <Text style={styles.reviewRestoreTitle}>{strings.oneTimeRefill}</Text>
            <Text style={styles.reviewRestoreCopy}>{strings.reviewRestoreCopy}</Text>
          </View>
          <View style={styles.modalActions}>
            <Pressable onPress={onClose} style={styles.modalGhostButton}>
              <Text style={styles.modalGhostText}>{strings.maybeLater}</Text>
            </Pressable>
            <Pressable onPress={onRestore} style={styles.modalPrimaryButton}>
              <Text style={styles.modalPrimaryText}>{strings.iLeft5Stars}</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

function LanguageModal({
  visible,
  strings,
  selectedLanguage,
  canClose,
  onClose,
  onSelectLanguage,
  onSave
}: {
  visible: boolean;
  strings: UiStrings;
  selectedLanguage: SupportedLanguage;
  canClose: boolean;
  onClose: () => void;
  onSelectLanguage: (language: SupportedLanguage) => void;
  onSave: () => void;
}) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={canClose ? onClose : onSave}>
      <View style={styles.modalBackdrop}>
        <View style={styles.modalCard}>
          <Text style={styles.modalEyebrow}>{strings.languageEyebrow}</Text>
          <Text style={styles.modalTitle}>{strings.languageTitle}</Text>
          <Text style={styles.modalCopy}>{strings.languageCopy}</Text>
          <View style={styles.languageGrid}>
            {LANGUAGE_OPTIONS.map((option) => {
              const selected = option.id === selectedLanguage;
              return (
                <Pressable
                  key={option.id}
                  onPress={() => onSelectLanguage(option.id)}
                  style={[styles.languageOption, selected && styles.languageOptionActive]}
                >
                  <Text style={[styles.languageOptionCode, selected && styles.languageOptionCodeActive]}>{option.code}</Text>
                  <Text style={[styles.languageOptionNative, selected && styles.languageOptionNativeActive]}>{option.nativeLabel}</Text>
                  <Text style={[styles.languageOptionLabel, selected && styles.languageOptionLabelActive]}>{option.label}</Text>
                </Pressable>
              );
            })}
          </View>
          <View style={styles.modalActions}>
            {canClose && (
              <Pressable onPress={onClose} style={styles.modalGhostButton}>
                <Text style={styles.modalGhostText}>{strings.later}</Text>
              </Pressable>
            )}
            <Pressable onPress={onSave} style={styles.modalPrimaryButton}>
              <Text style={styles.modalPrimaryText}>{strings.saveLanguage}</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

function AdBanner({ hidden }: { hidden: boolean }) {
  if (hidden) {
    return null;
  }

  return (
    <View style={styles.adBanner}>
      <Text style={styles.adLabel}>Sponsor</Text>
      <Text style={styles.adCopy}>A short sponsor helps keep today's lessons moving.</Text>
    </View>
  );
}

function GuideMascot({
  variant,
  accentColor,
  size
}: {
  variant: CharacterVariant;
  accentColor: string;
  size: number;
}) {
  const headSize = size * 0.28;
  const faceBottom = size * 0.4;
  const skin = "#E8B18A";
  const outline = "#1F2C3B";
  const robe = lightenColor(accentColor, 0.78);
  const eyeWidth = headSize * 0.16;
  const eyeHeight = headSize * 0.13;
  const eyeHighlight = headSize * 0.04;
  const cheekSize = headSize * 0.16;
  const smileWidth = headSize * 0.44;
  const smileHeight = headSize * 0.2;

  return (
    <View style={{ width: size, height: size, alignItems: "center", justifyContent: "flex-end" }}>
      <View
        style={{
          position: "absolute",
          bottom: size * 0.03,
          width: size * 0.58,
          height: size * 0.1,
          borderRadius: 999,
          backgroundColor: "rgba(19,38,29,0.10)"
        }}
      />
      <View
        style={{
          position: "absolute",
          bottom: size * 0.11,
          width: size * 0.5,
          height: size * 0.34,
          borderTopLeftRadius: size * 0.16,
          borderTopRightRadius: size * 0.16,
          borderBottomLeftRadius: size * 0.12,
          borderBottomRightRadius: size * 0.12,
          backgroundColor: accentColor
        }}
      />
      <View
        style={{
          position: "absolute",
          bottom: size * 0.18,
          width: size * 0.56,
          height: size * 0.14,
          borderRadius: 999,
          backgroundColor: robe
        }}
      />
      <View
        style={{
          position: "absolute",
          bottom: size * 0.18,
          left: size * 0.18,
          width: size * 0.12,
          height: size * 0.08,
          borderRadius: 999,
          backgroundColor: accentColor,
          transform: [{ rotate: "-30deg" }]
        }}
      />
      <View
        style={{
          position: "absolute",
          bottom: size * 0.18,
          right: size * 0.18,
          width: size * 0.12,
          height: size * 0.08,
          borderRadius: 999,
          backgroundColor: accentColor,
          transform: [{ rotate: "30deg" }]
        }}
      />

      {variant === "hijabi" ? (
        <>
          <View
            style={{
              position: "absolute",
              bottom: faceBottom - size * 0.03,
              width: headSize * 1.28,
              height: headSize * 1.4,
              borderRadius: headSize * 0.72,
              backgroundColor: "#324F73"
            }}
          />
          <View
            style={{
              position: "absolute",
              bottom: faceBottom + headSize * 0.06,
              width: headSize * 0.9,
              height: headSize * 0.18,
              borderRadius: 999,
              backgroundColor: "#243C56"
            }}
          />
          <View
            style={{
              position: "absolute",
              bottom: faceBottom - size * 0.03,
              width: headSize * 1.02,
              height: headSize * 0.92,
              borderBottomLeftRadius: headSize * 0.42,
              borderBottomRightRadius: headSize * 0.42,
              borderTopLeftRadius: headSize * 0.2,
              borderTopRightRadius: headSize * 0.2,
              backgroundColor: "#243C56"
            }}
          />
        </>
      ) : (
        <>
          <View
            style={{
              position: "absolute",
              bottom: faceBottom + headSize * 0.62,
              width: headSize * 0.94,
              height: headSize * 0.22,
              borderTopLeftRadius: headSize * 0.16,
              borderTopRightRadius: headSize * 0.16,
              borderBottomLeftRadius: headSize * 0.08,
              borderBottomRightRadius: headSize * 0.08,
              backgroundColor: "#F5F7FA",
              borderWidth: 1,
              borderColor: "#D6DEE6"
            }}
          />
          <View
            style={{
              position: "absolute",
              bottom: faceBottom + headSize * 0.42,
              width: headSize * 0.98,
              height: headSize * 0.2,
              borderRadius: 999,
              backgroundColor: outline
            }}
          />
          <View
            style={{
              position: "absolute",
              bottom: faceBottom - headSize * 0.06,
              width: headSize * 0.94,
              height: headSize * 0.42,
              borderBottomLeftRadius: headSize * 0.34,
              borderBottomRightRadius: headSize * 0.34,
              borderTopLeftRadius: headSize * 0.2,
              borderTopRightRadius: headSize * 0.2,
              backgroundColor: outline
            }}
          />
        </>
      )}

      <View
        style={{
          position: "absolute",
          bottom: faceBottom,
          width: headSize,
          height: headSize * 1.04,
          borderRadius: headSize * 0.5,
          backgroundColor: skin
        }}
      />
      <View
        style={{
          position: "absolute",
          bottom: faceBottom - headSize * 0.08,
          width: headSize * 0.28,
          height: headSize * 0.12,
          borderRadius: 999,
          backgroundColor: skin
        }}
      />
      <View
        style={{
          position: "absolute",
          bottom: faceBottom + headSize * 0.42,
          left: size * 0.39,
          width: eyeWidth,
          height: eyeHeight,
          borderRadius: 999,
          backgroundColor: outline
        }}
      />
      <View
        style={{
          position: "absolute",
          bottom: faceBottom + headSize * 0.42,
          left: size * 0.405,
          width: eyeHighlight,
          height: eyeHighlight,
          borderRadius: 999,
          backgroundColor: "#F8FBFF",
          opacity: 0.92
        }}
      />
      <View
        style={{
          position: "absolute",
          bottom: faceBottom + headSize * 0.42,
          right: size * 0.39,
          width: eyeWidth,
          height: eyeHeight,
          borderRadius: 999,
          backgroundColor: outline
        }}
      />
      <View
        style={{
          position: "absolute",
          bottom: faceBottom + headSize * 0.42,
          right: size * 0.405,
          width: eyeHighlight,
          height: eyeHighlight,
          borderRadius: 999,
          backgroundColor: "#F8FBFF",
          opacity: 0.92
        }}
      />
      <View
        style={{
          position: "absolute",
          bottom: faceBottom + headSize * 0.2,
          width: headSize * 0.14,
          height: headSize * 0.03,
          borderRadius: 999,
          backgroundColor: "#B37A5A"
        }}
      />
      <View
        style={{
          position: "absolute",
          bottom: faceBottom + headSize * 0.14,
          left: size * 0.325,
          width: cheekSize,
          height: cheekSize,
          borderRadius: 999,
          backgroundColor: "rgba(247, 139, 151, 0.28)"
        }}
      />
      <View
        style={{
          position: "absolute",
          bottom: faceBottom + headSize * 0.14,
          right: size * 0.325,
          width: cheekSize,
          height: cheekSize,
          borderRadius: 999,
          backgroundColor: "rgba(247, 139, 151, 0.28)"
        }}
      />
      <View
        style={{
          position: "absolute",
          bottom: faceBottom + headSize * 0.02,
          width: smileWidth,
          height: smileHeight,
          borderRadius: 999,
          borderBottomWidth: Math.max(3, size * 0.022),
          borderColor: "#C95A67"
        }}
      />
    </View>
  );
}

function getTopicGlyph(topicId: TopicId): NodeGlyphKind {
  if (topicId === "prayer") {
    return "book_open";
  }

  if (topicId === "aqidah") {
    return "book_seal";
  }

  if (topicId === "fasting") {
    return "sparkle_badge";
  }

  if (topicId === "zakat") {
    return "book_stack";
  }

  if (topicId === "hajj") {
    return "book_marked";
  }

  if (topicId === "manners") {
    return "brain";
  }

  if (topicId === "marriage") {
    return "home_heart";
  }

  if (topicId === "sahabah") {
    return "shield_sword";
  }

  if (topicId === "prophets") {
    return "book_seal";
  }

  if (topicId === "women_of_the_book") {
    return "book_marked";
  }

  if (topicId === "quran_tafseer") {
    return "book_open";
  }

  return "sparkle_badge";
}

function getNodeVisual(nodeId: string, status: LearningNodeView["status"], accentColor: string) {
  const visualMap: Record<string, { glyph: NodeGlyphKind; outerColor: string; innerColor: string }> = {
    "foundation-niyyah": { glyph: "sparkle_badge", outerColor: "#FFC928", innerColor: "#FFE58A" },
    "foundation-guidance": { glyph: "sparkle_badge", outerColor: "#7ED7FF", innerColor: "#DDF5FF" },
    "foundation-bismillah": { glyph: "sparkle_badge", outerColor: "#4ED7A5", innerColor: "#DDFBF1" },
    "foundation-sneeze": { glyph: "sparkle_badge", outerColor: "#A98BFF", innerColor: "#EFE8FF" },
    "foundation-character": { glyph: "sparkle_badge", outerColor: "#FF9D7A", innerColor: "#FFD7C8" },
    "prayer-wudu-why": { glyph: "sparkle_badge", outerColor: "#4AA9F5", innerColor: "#DFF3FF" },
    "prayer-wudu-steps": { glyph: "sparkle_badge", outerColor: "#58C5F4", innerColor: "#DFF8FF" },
    "prayer-wudu-ready": { glyph: "sparkle_badge", outerColor: "#6B8DFF", innerColor: "#E8EEFF" },
    "prayer-salah-open": { glyph: "book_open", outerColor: "#32B4F2", innerColor: "#DDF5FF" },
    "prayer-salah-recite": { glyph: "book_marked", outerColor: "#4B9BFF", innerColor: "#DFEAFF" },
    "prayer-salah-ruku": { glyph: "book_seal", outerColor: "#5F87F8", innerColor: "#E3E9FF" },
    "prayer-salah-sujud": { glyph: "book_stack", outerColor: "#7E7BF3", innerColor: "#ECE9FF" },
    "prayer-salah-tashahhud": { glyph: "book_closed", outerColor: "#5C6DEB", innerColor: "#E3E7FF" },
    "prayer-salah-flow": { glyph: "book_open", outerColor: "#2A90E0", innerColor: "#DCEFFF" },
    "manners-salam": { glyph: "brain", outerColor: "#49C38F", innerColor: "#CFF5E2" },
    "manners-truthful": { glyph: "brain", outerColor: "#34C8B8", innerColor: "#D5FBF6" },
    "manners-parents": { glyph: "brain", outerColor: "#7CCF65", innerColor: "#E4F8DC" },
    "manners-mother": { glyph: "brain", outerColor: "#F5A26C", innerColor: "#FFE9D9" },
    "manners-service": { glyph: "brain", outerColor: "#C47CF2", innerColor: "#F1E3FF" },
    "manners-mercy": { glyph: "brain", outerColor: "#F3A84E", innerColor: "#FFF0D8" },
    "manners-eating": { glyph: "brain", outerColor: "#F46F67", innerColor: "#FFE5E2" },
    "marriage-purpose": { glyph: "home_heart", outerColor: "#E9778B", innerColor: "#FFE3E8" },
    "marriage-choose": { glyph: "home_heart", outerColor: "#D95E74", innerColor: "#FFDCE4" },
    "marriage-kindness": { glyph: "home_heart", outerColor: "#C56BC9", innerColor: "#F7E1FA" },
    "marriage-clothing": { glyph: "home_heart", outerColor: "#A86BE8", innerColor: "#EDE2FF" },
    "marriage-mercy": { glyph: "home_heart", outerColor: "#F08C5C", innerColor: "#FFE9DD" },
    "sahabah-abubakr": { glyph: "shield_sword", outerColor: "#1FC1A3", innerColor: "#D7FBF4" },
    "sahabah-umar": { glyph: "shield_sword", outerColor: "#2AB7A6", innerColor: "#D7F7F3" },
    "sahabah-uthman": { glyph: "shield_sword", outerColor: "#3DB5C8", innerColor: "#DDF6FB" },
    "sahabah-ali": { glyph: "shield_sword", outerColor: "#2D9AE0", innerColor: "#DCEEFF" },
    "sahabah-bilal": { glyph: "shield_sword", outerColor: "#5EC0A7", innerColor: "#DDF7EF" },
    "quran-fatiha": { glyph: "book_open", outerColor: "#40A8FF", innerColor: "#DDF0FF" },
    "quran-ikhlas": { glyph: "book_marked", outerColor: "#6AA4FF", innerColor: "#E2ECFF" },
    "quran-kursi": { glyph: "book_seal", outerColor: "#6A7FFF", innerColor: "#E7EBFF" },
    "quran-asr": { glyph: "book_closed", outerColor: "#4A78E8", innerColor: "#DDE7FF" },
    "quran-tafseer": { glyph: "book_stack", outerColor: "#7D8CFF", innerColor: "#E7E9FF" }
    ,
    "prophets-adam": { glyph: "book_seal", outerColor: "#F0A53E", innerColor: "#FFF0D8" },
    "prophets-nuh": { glyph: "book_seal", outerColor: "#48A5D9", innerColor: "#DDF2FF" },
    "prophets-ibrahim": { glyph: "book_seal", outerColor: "#D97B2D", innerColor: "#FFE8D4" },
    "prophets-yusuf": { glyph: "book_seal", outerColor: "#7CCB6A", innerColor: "#E6F8E0" },
    "prophets-musa": { glyph: "book_seal", outerColor: "#27B3A2", innerColor: "#D8F7F2" },
    "prophets-isa": { glyph: "book_seal", outerColor: "#7C92FF", innerColor: "#E7EBFF" },
    "prophets-muhammad": { glyph: "book_seal", outerColor: "#F47C5D", innerColor: "#FFE4DB" },
    "women-hawwa": { glyph: "book_marked", outerColor: "#EE7D92", innerColor: "#FFE6EB" },
    "women-mother-musa": { glyph: "book_marked", outerColor: "#F39A74", innerColor: "#FFEBDD" },
    "women-asiyah": { glyph: "book_seal", outerColor: "#D45A86", innerColor: "#FFE1EC" },
    "women-maryam": { glyph: "book_open", outerColor: "#B66CE8", innerColor: "#F0E2FF" },
    "women-khadijah": { glyph: "book_stack", outerColor: "#F06B7A", innerColor: "#FFE1E5" },
    "women-aishah": { glyph: "book_open", outerColor: "#8D7BFF", innerColor: "#ECE8FF" },
    "women-hafsah": { glyph: "book_seal", outerColor: "#C15FA9", innerColor: "#FBE2F5" }
  };
  const fallback = { glyph: "book_closed" as NodeGlyphKind, outerColor: accentColor, innerColor: lightenColor(accentColor, 0.88) };
  const selected = visualMap[nodeId] ?? fallback;

  if (status === "locked") {
    return {
      glyph: selected.glyph,
      outerColor: "#E2E8E5",
      innerColor: "#F3F6F4"
    };
  }

  return selected;
}

function formatPrice(item: ShopItem) {
  if (item.currencyType === "rewarded_ad") {
    return "Watch";
  }

  if (item.currencyType === "gems") {
    return `${item.price} gems`;
  }

  return `$${item.price.toFixed(2)}`;
}

function formatHearts(user: UserProfile, compact = false) {
  if (user.hearts.unlimited) {
    return "Unlimited";
  }

  if (user.hearts.current > user.hearts.max) {
    return compact ? `${user.hearts.current}` : `${user.hearts.current} hearts`;
  }

  return compact ? `${user.hearts.current}/${user.hearts.max}` : `${user.hearts.current} of ${user.hearts.max} hearts`;
}

function shouldOfferReviewHeartRestore(user: UserProfile) {
  return !user.hearts.unlimited && user.hearts.current === 0 && !user.reviewHeartRestoreUsed;
}

function pickTeachMoment(lesson: LessonSession["lesson"]) {
  return lesson.teachingMoments?.find((moment) => moment.kind === "learn")
    ?? lesson.teachingMoments?.find((moment) => moment.kind === "takeaway")
    ?? lesson.teachingMoments?.[0];
}

function pickExampleMoment(lesson: LessonSession["lesson"]) {
  return lesson.teachingMoments?.find((moment) => ["story", "watch", "read", "reveal"].includes(moment.kind))
    ?? lesson.teachingMoments?.find((moment) => moment.kind === "takeaway");
}

function defaultSourceFrom(source: LessonSource) {
  if (source.site === "Quran.com") {
    return "The Quran and tafsir on Quran.com";
  }

  if (source.site === "YouTube") {
    return "YouTube video guide";
  }

  if (source.site === "Yaqeen Institute") {
    return "Yaqeen Institute explainer";
  }

  return "Hadith collection on Sunnah.com";
}

function defaultSourceGrade(source: LessonSource) {
  if (source.site === "Quran.com") {
    return "Quran / tafsir";
  }

  if (source.site === "YouTube") {
    return "Visual guide";
  }

  if (source.site === "Yaqeen Institute") {
    return "Reviewed explainer";
  }

  return "See source";
}

function defaultReminderPreferences(): ReminderPreferences {
  return {
    dailyInactivity: true,
    weeklyInactivity: true,
    streakReminders: true,
    islamicReminders: true
  };
}

function formatSourceCategory(category: LessonSource["category"], language: SupportedLanguage) {
  const label =
    category === "hadith"
      ? "Hadith"
      : category === "tafsir"
        ? "Tafsir"
        : category === "biography"
          ? "Biography"
          : category === "article"
            ? "Article"
            : category === "beginner_explainer"
              ? "Beginner explainer"
              : "Video";

  return translateStudyText(label, language).toUpperCase();
}

function formatSourceValidationStatus(status: ResourceValidationStatus, language: SupportedLanguage) {
  const label =
    status === "exact_match"
      ? "Exact match"
      : status === "strong_support"
        ? "Strong support"
        : status === "weak_support"
          ? "Broader support"
          : "Needs review";

  return translateStudyText(label, language);
}

function formatSourceSupportType(type: ResourceSupportType, language: SupportedLanguage) {
  return translateStudyText(type === "primary" ? "Primary evidence" : "Support material", language);
}

function getSourceValidationTone(status: ResourceValidationStatus) {
  if (status === "exact_match") {
    return { background: "#DFF7E8", text: colors.greenDark };
  }

  if (status === "strong_support") {
    return { background: "#E5F2FF", text: "#215E98" };
  }

  if (status === "weak_support") {
    return { background: "#FFF1D6", text: "#996100" };
  }

  return { background: "#FFE4E2", text: "#B5392D" };
}

function getTeachingMomentLabel(kind: LessonTeachingMoment["kind"], language: SupportedLanguage) {
  const label =
    kind === "watch"
      ? "Watch"
      : kind === "read"
        ? "Read"
        : kind === "story"
          ? "Story"
          : kind === "reveal"
            ? "Reveal"
            : kind === "takeaway"
              ? "Carry it"
              : "Learn";

  return translateStudyText(label, language);
}

function getTeachingMomentTone(kind: LessonTeachingMoment["kind"], accentColor: string) {
  if (kind === "watch") {
    return {
      background: "#EEF5FF",
      border: "#C7DAFA",
      eyebrow: "#235D95",
      pillBackground: "#DCEBFF",
      pillText: "#235D95",
      actionBackground: "#2E8BC0",
      actionText: colors.white
    };
  }

  if (kind === "story") {
    return {
      background: "#FFF7E6",
      border: "#F5D38A",
      eyebrow: "#9B6700",
      pillBackground: "#FFE7B3",
      pillText: "#8C5D00",
      actionBackground: "#F2C94C",
      actionText: colors.ink
    };
  }

  if (kind === "reveal" || kind === "takeaway") {
    return {
      background: lightenColor(accentColor, 0.96),
      border: lightenColor(accentColor, 0.8),
      eyebrow: darkenColor(accentColor),
      pillBackground: lightenColor(accentColor, 0.9),
      pillText: darkenColor(accentColor),
      actionBackground: accentColor,
      actionText: colors.white
    };
  }

  return {
    background: "#F7FBF8",
    border: "#D7E7DE",
    eyebrow: colors.greenDark,
    pillBackground: "#E7F6ED",
    pillText: colors.greenDark,
    actionBackground: accentColor,
    actionText: colors.white
  };
}

function getPracticeActivityLabel(kind: LessonPracticeActivity["kind"], language: SupportedLanguage) {
  return translateStudyText(kind === "sequence" ? "Tap in order" : "Choose the best fit", language);
}

function getPathTerrainMood(topicId: TopicId) {
  switch (topicId) {
    case "sahabah":
      return { ridge: "#7CBFA7", ridgeSoft: "#A6D9C8", base: "#DDBA74", dune: "#E6C98B", duneSoft: "#F1DFC0", landmark: "#8F6C3B", caravan: true, city: false, mountains: false, garden: false, night: false };
    case "prayer":
      return { ridge: "#88C5F2", ridgeSoft: "#B4E1FF", base: "#D8E7F3", dune: "#DCEFFE", duneSoft: "#ECF7FF", landmark: "#7AA2C0", caravan: false, city: true, mountains: false, garden: false, night: false };
    case "quran_tafseer":
      return { ridge: "#5F8ED6", ridgeSoft: "#8CB5F2", base: "#A5D6C0", dune: "#CBEAD9", duneSoft: "#E7F8EF", landmark: "#F3E4A2", caravan: false, city: false, mountains: false, garden: false, night: true };
    case "prophets":
      return { ridge: "#9B8F65", ridgeSoft: "#C6B88D", base: "#D8C69A", dune: "#E8D7AF", duneSoft: "#F4E7C8", landmark: "#7A6B4A", caravan: true, city: false, mountains: true, garden: false, night: false };
    case "women_of_the_book":
    case "marriage":
      return { ridge: "#B8D79C", ridgeSoft: "#D5E8B9", base: "#E7D3B8", dune: "#F1E0C8", duneSoft: "#FAEFE2", landmark: "#B85F7A", caravan: false, city: false, mountains: false, garden: true, night: false };
    case "fasting":
      return { ridge: "#6A86B6", ridgeSoft: "#93ACD6", base: "#CAB998", dune: "#D9C8A5", duneSoft: "#E9DCBF", landmark: "#FFF0B3", caravan: false, city: false, mountains: false, garden: false, night: true };
    case "hajj":
      return { ridge: "#C3B189", ridgeSoft: "#E0D0AA", base: "#E7D4AA", dune: "#F1E1BE", duneSoft: "#F8EDD5", landmark: "#8E7A58", caravan: true, city: true, mountains: false, garden: false, night: false };
    case "manners":
      return { ridge: "#96D8B9", ridgeSoft: "#BFEBD7", base: "#DCE8C6", dune: "#EBF5D7", duneSoft: "#F6FAE8", landmark: "#5EA47D", caravan: false, city: false, mountains: false, garden: true, night: false };
    default:
      return { ridge: "#92D7C2", ridgeSoft: "#BDECDD", base: "#DDEBCB", dune: "#EBF6DA", duneSoft: "#F7FBEA", landmark: "#6AAB91", caravan: false, city: false, mountains: false, garden: true, night: false };
  }
}

function startCaseRelation(relation: SocialRelation) {
  return relation === "parent" ? "Parent" : "Friend";
}

function startCaseAccountRole(role: AccountRole) {
  return role === "parent" ? "Parent" : "Child";
}

function startCaseFoundationCategory(category: FoundationCategoryId) {
  switch (category) {
    case "shahadah":
      return "Shahadah";
    case "salah":
      return "Salah";
    case "taharah":
      return "Wudu and Taharah";
    case "fasting":
      return "Fasting";
    case "zakat":
      return "Zakat";
    case "hajj":
      return "Hajj";
    case "iman":
      return "Pillars of Iman";
    case "manners":
      return "Daily manners and phrases";
    case "quran":
      return "Quran literacy";
    case "seerah":
      return "Prophets and seerah";
    default:
      return category;
  }
}

function formatRelativeTime(value: string) {
  const diffMs = Date.now() - new Date(value).getTime();
  const diffMinutes = Math.max(0, Math.floor(diffMs / 60000));

  if (diffMinutes < 1) {
    return "just now";
  }

  if (diffMinutes < 60) {
    return `${diffMinutes}m ago`;
  }

  const diffHours = Math.floor(diffMinutes / 60);

  if (diffHours < 24) {
    return `${diffHours}h ago`;
  }

  return `${Math.floor(diffHours / 24)}d ago`;
}

function isDailyReminderDue(connection: SocialConnection) {
  return Date.now() - new Date(connection.lastActiveAt).getTime() >= 24 * 60 * 60 * 1000;
}

function isWeeklyReminderDue(connection: SocialConnection) {
  return Date.now() - new Date(connection.lastActiveAt).getTime() >= 7 * 24 * 60 * 60 * 1000;
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

function isBackendOfflineError(error: Error) {
  return /fetch|network|failed|load|backend request failed with 5/i.test(error.message);
}

function getSectionStars(user: UserProfile, section: LearningSection) {
  const completed = new Set(user.completedNodeIds);

  return section.nodes.reduce((total, node) => {
    return total + (completed.has(node.id) ? node.starsReward : 0);
  }, 0);
}

function getBranchStars(user: UserProfile, section: LearningSection, branchId: string) {
  const completed = new Set(user.completedNodeIds);

  return section.nodes.reduce((total, node) => {
    if (node.branchId !== branchId) {
      return total;
    }

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

function getBranchCompletionRatio(user: UserProfile, section: LearningSection, branchId: string) {
  const branchNodes = section.nodes.filter((node) => node.branchId === branchId);

  if (!branchNodes.length) {
    return 0;
  }

  const completed = new Set(user.completedNodeIds);
  const completedCount = branchNodes.filter((node) => completed.has(node.id)).length;
  return completedCount / branchNodes.length;
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

function topicNeedsReviewHint(topicId: TopicId, learnerProfile: NonNullable<UserProfile["learnerProfile"]>) {
  const watch = new Set(
    topicId === "prayer"
      ? ["salah", "taharah"]
      : topicId === "aqidah"
        ? ["iman"]
        : topicId === "fasting"
          ? ["fasting"]
          : topicId === "zakat"
            ? ["zakat"]
            : topicId === "hajj"
              ? ["hajj"]
      : topicId === "quran_tafseer"
        ? ["quran"]
        : topicId === "prophets" || topicId === "women_of_the_book" || topicId === "sahabah"
          ? ["seerah"]
          : ["manners", "iman"]
  );

  return learnerProfile.weak_areas.some((area) => watch.has(area));
}

function describeNodeState(node: LearningNodeView, reviewNeeded: boolean) {
  if (node.status === "locked") {
    return {
      label: "Locked",
      meta: "Finish the earlier circles first",
      tint: "#E8EEEA",
      textColor: "#607267",
      legendary: false
    };
  }

  if (reviewNeeded) {
    return {
      label: "Review needed",
      meta: "This checkpoint is worth revisiting",
      tint: "#FFE5E2",
      textColor: "#B5392D",
      legendary: false
    };
  }

  if (node.kind === "review" && node.status === "completed") {
    return {
      label: "Legendary",
      meta: "Mastery checkpoint cleared",
      tint: "#FFF3CF",
      textColor: "#A66C00",
      legendary: true
    };
  }

  if (node.kind === "review") {
    return {
      label: node.status === "current" ? "Checkpoint" : "Quiz ready",
      meta: `${node.xpReward} XP`,
      tint: "#E9E3FF",
      textColor: "#6C3BC6",
      legendary: false
    };
  }

  if (node.status === "completed") {
    return {
      label: "Complete",
      meta: "Bright and cleared",
      tint: "#DCF7E8",
      textColor: "#167144",
      legendary: false
    };
  }

  if (node.status === "current") {
    return {
      label: "Start here",
      meta: "Recommended next lesson",
      tint: "#DFF5FF",
      textColor: "#126A99",
      legendary: false
    };
  }

  return {
    label: "Ready",
    meta: `${node.xpReward} XP`,
    tint: "#E8F7EF",
    textColor: "#167144",
    legendary: false
  };
}

function lightenColor(hex: string, ratio = 0.82) {
  const amount = (channel: number) => Math.round(channel + (255 - channel) * (1 - ratio));
  const [r, g, b] = hexToRgb(hex);
  return `rgb(${amount(r)}, ${amount(g)}, ${amount(b)})`;
}

function darkenColor(hex: string) {
  const [r, g, b] = hexToRgb(hex);
  const amount = (channel: number) => Math.max(0, Math.round(channel * 0.76));
  return `rgb(${amount(r)}, ${amount(g)}, ${amount(b)})`;
}

function withAlpha(hex: string, alpha: number) {
  const [r, g, b] = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${Math.max(0, Math.min(1, alpha))})`;
}

function hexToRgb(hex: string) {
  const clean = hex.replace("#", "");
  const normalized = clean.length === 3
    ? clean.split("").map((char) => `${char}${char}`).join("")
    : clean;
  const parsed = Number.parseInt(normalized, 16);

  return [
    (parsed >> 16) & 255,
    (parsed >> 8) & 255,
    parsed & 255
  ] as const;
}

function unique<T>(items: T[]) {
  return Array.from(new Set(items));
}

function getTopicPathTheme(topicId: TopicId, accentColor: string): PathTheme {
  const themes: Record<TopicId, PathTheme> = {
    foundation: {
      primary: "#1FC78D",
      secondary: "#2AD0C5",
      tertiary: "#6DE0FF",
      glow: "#8AF6D7",
      shell: "#F7FFFB",
      lane: "#28C6B9",
      reward: "#FFC83D",
      review: "#4AA8FF",
      candy: "#FF92B2"
    },
    prayer: {
      primary: "#31A8F5",
      secondary: "#3FD2FF",
      tertiary: "#6D8FFF",
      glow: "#9CE9FF",
      shell: "#F7FBFF",
      lane: "#35B7F0",
      reward: "#FFD447",
      review: "#4E7FFF",
      candy: "#7A8BFF"
    },
    quran_tafseer: {
      primary: "#22B17A",
      secondary: "#4BC3A5",
      tertiary: "#57B5FF",
      glow: "#9BF3CC",
      shell: "#FAFFFC",
      lane: "#2BBE92",
      reward: "#FFCF52",
      review: "#5E8CFF",
      candy: "#C28CFF"
    },
    manners: {
      primary: "#35C98E",
      secondary: "#5FD2B6",
      tertiary: "#B7E86E",
      glow: "#9CF0C8",
      shell: "#FBFFFC",
      lane: "#40C7A2",
      reward: "#FFC44D",
      review: "#57B0FF",
      candy: "#FF8D7D"
    },
    sahabah: {
      primary: "#20C3A2",
      secondary: "#38D0C3",
      tertiary: "#4DA3F5",
      glow: "#95F0E2",
      shell: "#F8FFFE",
      lane: "#2EC7B0",
      reward: "#FFD451",
      review: "#48A8FF",
      candy: "#8E83FF"
    },
    prophets: {
      primary: "#F2A63F",
      secondary: "#FFBF5C",
      tertiary: "#5BC5F3",
      glow: "#FFE1A2",
      shell: "#FFFDF8",
      lane: "#F4B452",
      reward: "#FFD451",
      review: "#50A3FF",
      candy: "#FF8C74"
    },
    women_of_the_book: {
      primary: "#EA7396",
      secondary: "#F58EB0",
      tertiary: "#C17DFF",
      glow: "#FFD3E2",
      shell: "#FFF9FB",
      lane: "#EE7DAB",
      reward: "#FFD053",
      review: "#8B83FF",
      candy: "#FFAC7B"
    },
    marriage: {
      primary: "#EE7695",
      secondary: "#F08DA9",
      tertiary: "#F4A17C",
      glow: "#FFD2DD",
      shell: "#FFF9FA",
      lane: "#EB7C95",
      reward: "#FFCF56",
      review: "#B47BFF",
      candy: "#FF9F7E"
    },
    fasting: {
      primary: "#35B59A",
      secondary: "#56C9AD",
      tertiary: "#7FB5FF",
      glow: "#AFF5DB",
      shell: "#F8FFFD",
      lane: "#36C5A5",
      reward: "#FFCE4D",
      review: "#5E90FF",
      candy: "#FF9B73"
    },
    zakat: {
      primary: "#29B476",
      secondary: "#52C887",
      tertiary: "#75B6FF",
      glow: "#A6F1BF",
      shell: "#F9FFFB",
      lane: "#30C285",
      reward: "#FFCF4F",
      review: "#4AA9FF",
      candy: "#C591FF"
    },
    hajj: {
      primary: "#F0A856",
      secondary: "#FFC56C",
      tertiary: "#6DBDF5",
      glow: "#FFE0AD",
      shell: "#FFFDF8",
      lane: "#F1B064",
      reward: "#FFD454",
      review: "#4CA9FF",
      candy: "#FF9279"
    },
    aqidah: {
      primary: "#47B090",
      secondary: "#64C6A8",
      tertiary: "#66A5FF",
      glow: "#A9F0D1",
      shell: "#F8FFFC",
      lane: "#4AC09C",
      reward: "#FFCF52",
      review: "#5D88FF",
      candy: "#A08EFF"
    }
  };

  return themes[topicId] ?? {
    primary: accentColor,
    secondary: "#62CBE9",
    tertiary: "#88ACFF",
    glow: "#B5F1E1",
    shell: "#FBFFFD",
    lane: accentColor,
    reward: "#FFCF52",
    review: "#58A6FF",
    candy: "#FF9A82"
  };
}

const colors = {
  bg: "#EEF7F4",
  ink: "#183126",
  muted: "#607267",
  line: "#D7E4DD",
  white: "#FFFFFF",
  green: "#24A965",
  greenDark: "#167144",
  mint: "#E1F6EB",
  sky: "#2E8BC0",
  skySoft: "#DDEFF8",
  coral: "#E85C4A",
  coralSoft: "#FCE3DF",
  gold: "#F2C94C",
  gray: "#E8EEE9"
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.bg },
  appShell: { flex: 1, backgroundColor: colors.bg },
  centerPane: { flex: 1, alignItems: "center", justifyContent: "center", padding: 24 },
  loadingText: { color: colors.ink, fontSize: 18, fontWeight: "700", letterSpacing: 0 },
  topBar: { flexDirection: "row", flexWrap: "wrap", alignItems: "center", gap: 12, paddingHorizontal: 18, paddingVertical: 14, backgroundColor: "#FCFFFD", borderBottomWidth: 1, borderBottomColor: "#DDEBE2", shadowColor: "rgba(17,49,35,0.10)", shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.14, shadowRadius: 20, elevation: 4 },
  topBarBrand: { minWidth: 250, flexDirection: "row", alignItems: "center", gap: 12, flex: 1 },
  topBarBrandText: { flexShrink: 1 },
  topBarBrandTitle: { color: colors.ink, fontSize: 20, fontWeight: "900", letterSpacing: 0 },
  topBarBrandCopy: { color: colors.muted, fontSize: 12, lineHeight: 17, fontWeight: "700", marginTop: 2 },
  miniGuideWrap: { width: 54, height: 54, borderRadius: 18, overflow: "hidden", backgroundColor: colors.mint, borderWidth: 1, borderColor: "#BEE7CF" },
  topMetric: { minWidth: 50 },
  topBarMetricRow: { flexDirection: "row", flexWrap: "wrap", alignItems: "center", gap: 10 },
  topMetricPill: { minWidth: 82, paddingHorizontal: 12, paddingVertical: 10, borderRadius: 18, borderWidth: 1, borderColor: "rgba(27,52,39,0.06)", shadowColor: "rgba(17,49,35,0.08)", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.12, shadowRadius: 10, elevation: 2 },
  topBarActionRow: { flexDirection: "row", flexWrap: "wrap", alignItems: "center", justifyContent: "flex-end", gap: 10, flex: 1 },
  metricLabel: { color: colors.muted, fontSize: 11, fontWeight: "900", textTransform: "uppercase", letterSpacing: 0 },
  metricValue: { color: colors.ink, fontSize: 15, fontWeight: "900", letterSpacing: 0, marginTop: 4 },
  dailyQuestCard: { minWidth: 184, paddingHorizontal: 14, paddingVertical: 12, borderRadius: 18, borderWidth: 1, borderColor: "#F2E1A3", backgroundColor: "#FFF8DB" },
  dailyQuestHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 8 },
  dailyQuestCopy: { color: colors.ink, fontSize: 12, lineHeight: 17, fontWeight: "700", marginBottom: 10 },
  soundButton: { minWidth: 92, paddingHorizontal: 12, paddingVertical: 10, borderRadius: 16, borderWidth: 1, borderColor: "#D7E9DE", backgroundColor: "#EEF8F2" },
  soundButtonMuted: { borderColor: "#E6D8D8", backgroundColor: "#F8EEEE" },
  soundButtonValue: { color: colors.greenDark, fontSize: 14, fontWeight: "900", letterSpacing: 0 },
  accountButton: { flexDirection: "row", alignItems: "center", gap: 8, minHeight: 50, paddingHorizontal: 12, borderRadius: 16, borderWidth: 1, borderColor: colors.line, backgroundColor: "#F8FBF8" },
  accountButtonActive: { borderColor: "#B7E3C8", backgroundColor: "#EAF8F0" },
  accountBadge: { width: 32, height: 32, borderRadius: 16, alignItems: "center", justifyContent: "center", backgroundColor: colors.white },
  accountBadgeActive: { backgroundColor: colors.green },
  accountBadgeText: { color: colors.greenDark, fontSize: 11, fontWeight: "900", letterSpacing: 0 },
  accountBadgeTextActive: { color: colors.white },
  accountLabel: { color: colors.muted, fontSize: 10, fontWeight: "800", letterSpacing: 0, textTransform: "uppercase" },
  accountValue: { color: colors.ink, fontSize: 13, fontWeight: "900", letterSpacing: 0, marginTop: 1 },
  languageButtonSmall: { minWidth: 82, paddingHorizontal: 12, paddingVertical: 10, borderRadius: 16, borderWidth: 1, borderColor: "#D8D6F7", backgroundColor: "#F3F0FF" },
  socialButtonSmall: { minWidth: 82, paddingHorizontal: 12, paddingVertical: 10, borderRadius: 16, borderWidth: 1, borderColor: "#CBE4D6", backgroundColor: "#EEF8F2" },
  socialButtonSmallValue: { color: colors.greenDark, fontSize: 15, fontWeight: "800", letterSpacing: 0 },
  heartButton: { minWidth: 92, paddingHorizontal: 12, paddingVertical: 10, borderRadius: 16, borderWidth: 1, borderColor: "#F1D0C9", backgroundColor: "#FFF5F2" },
  heartValue: { color: colors.coral, fontSize: 15, fontWeight: "800", letterSpacing: 0 },
  pathContent: { padding: 20, paddingBottom: 144, gap: 2 },
  heroCard: { flexDirection: "row", alignItems: "center", overflow: "hidden", borderRadius: 24, padding: 22, minHeight: 248, position: "relative", shadowColor: "rgba(16,47,32,0.2)", shadowOffset: { width: 0, height: 18 }, shadowOpacity: 0.18, shadowRadius: 24, elevation: 5 },
  heroPatternStripe: { position: "absolute", width: 220, height: 220, borderRadius: 48, backgroundColor: "rgba(255,255,255,0.08)", right: -42, top: -52, transform: [{ rotate: "22deg" }] },
  heroPatternStripeSecondary: { position: "absolute", width: 160, height: 160, borderRadius: 40, backgroundColor: "rgba(255,255,255,0.08)", left: -44, bottom: -66, transform: [{ rotate: "-18deg" }] },
  heroText: { flex: 1, paddingRight: 12 },
  heroArt: { width: 144, alignItems: "center", justifyContent: "center" },
  heroBadgeRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  heroBadge: { color: "#DFF7EE", fontSize: 12, fontWeight: "900", textTransform: "uppercase", letterSpacing: 0 },
  heroTitle: { color: colors.white, fontSize: 30, lineHeight: 35, fontWeight: "900", letterSpacing: 0, marginTop: 4 },
  heroCopy: { color: "#EAF8F2", fontSize: 15, lineHeight: 21, fontWeight: "700", letterSpacing: 0, marginTop: 6 },
  heroRewardRow: { flexDirection: "row", flexWrap: "wrap", gap: 10, marginTop: 14, marginBottom: 4 },
  heroChip: { minWidth: 120, paddingHorizontal: 12, paddingVertical: 10, borderRadius: 16, backgroundColor: "rgba(255,255,255,0.16)", borderWidth: 1, borderColor: "rgba(255,255,255,0.18)" },
  heroChipLabel: { color: "#DFF7EE", fontSize: 11, fontWeight: "900", textTransform: "uppercase" },
  heroChipValue: { color: colors.white, fontSize: 14, fontWeight: "900", marginTop: 4 },
  starMeter: { marginTop: 10, alignSelf: "flex-start", borderRadius: 999, paddingHorizontal: 12, paddingVertical: 6, backgroundColor: "rgba(255,255,255,0.18)" },
  starMeterCompact: { marginTop: 10, paddingHorizontal: 10, paddingVertical: 5, backgroundColor: "#FFF7DA" },
  starMeterValueRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  starMeterValue: { color: colors.ink, fontSize: 13, fontWeight: "900", letterSpacing: 0 },
  starMeterValueLight: { color: colors.white },
  starMeterLabel: { color: colors.muted, fontSize: 11, fontWeight: "700", letterSpacing: 0, marginTop: 2 },
  starMeterLabelLight: { color: "#EAF8F2" },
  animatedTrack: { overflow: "hidden", width: "100%" },
  animatedFill: { height: "100%" },
  heroProgressBarWrap: { marginTop: 16 },
  heroTrack: { height: 12, borderRadius: 6, overflow: "hidden", backgroundColor: "rgba(255,255,255,0.28)", marginTop: 16 },
  heroFill: { height: 12, backgroundColor: colors.white },
  heroProgress: { color: "#EAF8F2", fontSize: 13, fontWeight: "800", letterSpacing: 0, marginTop: 8 },
  heroButton: { minHeight: 50, paddingHorizontal: 18, borderRadius: 16, alignSelf: "flex-start", alignItems: "center", justifyContent: "center", backgroundColor: colors.white, marginTop: 16, shadowColor: "rgba(0,0,0,0.16)", shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.18, shadowRadius: 14, elevation: 3 },
  heroButtonText: { color: colors.greenDark, fontSize: 15, fontWeight: "900", letterSpacing: 0 },
  journeyStatsRow: { flexDirection: "row", flexWrap: "wrap", gap: 12, marginTop: 18, marginBottom: 8 },
  journeyStatCard: { flexGrow: 1, flexBasis: 220, minHeight: 120, padding: 16, borderRadius: 20, borderWidth: 1, backgroundColor: colors.white, shadowColor: "rgba(16,47,32,0.08)", shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.12, shadowRadius: 16, elevation: 2 },
  journeyStatEyebrow: { fontSize: 11, fontWeight: "900", textTransform: "uppercase" },
  journeyStatTitle: { color: colors.ink, fontSize: 18, fontWeight: "900", marginTop: 6 },
  journeyStatCopy: { color: colors.muted, fontSize: 13, lineHeight: 18, fontWeight: "600", marginTop: 6 },
  topicHeader: { marginTop: 24 },
  sectionTitle: { color: colors.ink, fontSize: 22, lineHeight: 27, fontWeight: "900", letterSpacing: 0 },
  sectionDescription: { color: colors.muted, fontSize: 14, lineHeight: 20, fontWeight: "600", letterSpacing: 0, marginTop: 4 },
  topicRow: { gap: 12, paddingVertical: 16, paddingRight: 18 },
  branchHeader: { marginTop: 4 },
  branchRow: { gap: 12, paddingVertical: 14, paddingRight: 18 },
  branchCard: { width: 240, minHeight: 132, padding: 16, borderRadius: 20, borderWidth: 1, borderColor: colors.line, backgroundColor: colors.white, shadowColor: "rgba(16,47,32,0.08)", shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.1, shadowRadius: 16, elevation: 2 },
  branchCardTitle: { color: colors.ink, fontSize: 16, fontWeight: "900", letterSpacing: 0 },
  branchCardCopy: { color: colors.muted, fontSize: 13, lineHeight: 18, fontWeight: "600", letterSpacing: 0, marginTop: 6 },
  branchCardSubMeta: { color: colors.greenDark, fontSize: 11, fontWeight: "800", letterSpacing: 0, marginTop: 8 },
  branchCardMetaRow: { flexDirection: "row", justifyContent: "space-between", gap: 8, marginTop: 10 },
  branchCardMeta: { color: colors.greenDark, fontSize: 12, fontWeight: "800", letterSpacing: 0 },
  topicCard: { width: 178, padding: 14, borderRadius: 20, borderWidth: 1, borderColor: colors.line, backgroundColor: colors.white, shadowColor: "rgba(16,47,32,0.08)", shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.1, shadowRadius: 16, elevation: 2 },
  topicCardPressed: { transform: [{ scale: 0.98 }, { translateY: 2 }] },
  topicCardIconRow: { minHeight: 64, justifyContent: "center" },
  topicIconFrame: { width: 58, height: 58, borderRadius: 18, borderWidth: 1, alignItems: "center", justifyContent: "center" },
  topicIconInner: { width: 42, height: 42, borderRadius: 14, alignItems: "center", justifyContent: "center" },
  topicCardTitle: { color: colors.ink, fontSize: 16, fontWeight: "900", letterSpacing: 0, marginTop: 8 },
  topicCardCopy: { color: colors.muted, fontSize: 13, lineHeight: 18, fontWeight: "600", letterSpacing: 0, marginTop: 4 },
  topicCardMeta: { color: colors.greenDark, fontSize: 11, fontWeight: "800", letterSpacing: 0, marginTop: 8 },
  foundationFreePlayBanner: { flexDirection: "row", flexWrap: "wrap", alignItems: "center", gap: 12, marginTop: 4, marginBottom: 14, padding: 16, borderRadius: 20, borderWidth: 1, borderColor: "#CFE2D5", backgroundColor: "#F5FBF7" },
  foundationFreePlayText: { flex: 1, minWidth: 220 },
  foundationFreePlayTitle: { color: colors.ink, fontSize: 18, fontWeight: "900" },
  foundationFreePlayCopy: { color: colors.muted, fontSize: 13, lineHeight: 18, fontWeight: "600", marginTop: 4 },
  foundationFreePlayButton: { minHeight: 46, paddingHorizontal: 16, borderRadius: 14, alignItems: "center", justifyContent: "center", backgroundColor: colors.green },
  foundationFreePlayButtonText: { color: colors.white, fontSize: 14, fontWeight: "900" },
  routeCard: { alignSelf: "center", width: "100%", maxWidth: 920, borderRadius: 30, padding: 20, borderWidth: 1, borderColor: colors.line, backgroundColor: colors.white, shadowColor: "rgba(16,47,32,0.12)", shadowOffset: { width: 0, height: 16 }, shadowOpacity: 0.16, shadowRadius: 26, elevation: 4, overflow: "hidden" },
  routeHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 18, marginBottom: 14, flexWrap: "wrap" },
  routeHeaderText: { flex: 1, minWidth: 260 },
  routeHeaderAside: { alignItems: "flex-end", gap: 10 },
  routeBadge: { color: colors.greenDark, fontSize: 12, fontWeight: "900", textTransform: "uppercase", letterSpacing: 0 },
  routeTitle: { color: colors.ink, fontSize: 24, lineHeight: 30, fontWeight: "900", letterSpacing: 0, marginTop: 4 },
  routeDescription: { color: colors.muted, fontSize: 14, lineHeight: 20, fontWeight: "600", letterSpacing: 0, marginTop: 4, maxWidth: 420 },
  branchSummaryCard: { marginTop: 4, marginBottom: 16, padding: 18, borderRadius: 24, borderWidth: 1, borderColor: colors.line, backgroundColor: "#F8FBF8", gap: 10, overflow: "hidden" },
  branchSummaryTop: { flexDirection: "row", justifyContent: "space-between", gap: 10, alignItems: "flex-start" },
  branchSummaryEyebrow: { fontSize: 11, fontWeight: "900", textTransform: "uppercase", letterSpacing: 0 },
  branchSummaryTitle: { color: colors.ink, fontSize: 18, fontWeight: "900", letterSpacing: 0, marginTop: 4 },
  branchSummaryCopy: { color: colors.muted, fontSize: 13, lineHeight: 18, fontWeight: "600", letterSpacing: 0, marginTop: 4 },
  branchSummaryMetaRow: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginTop: 2 },
  branchSummaryMetaText: { color: colors.greenDark, fontSize: 11, fontWeight: "800", letterSpacing: 0 },
  branchProgressWrap: { alignItems: "flex-end", minWidth: 88 },
  branchProgressLabel: { color: colors.muted, fontSize: 11, fontWeight: "800", textTransform: "uppercase" },
  branchProgressValue: { color: colors.ink, fontSize: 18, fontWeight: "900", marginTop: 4 },
  branchActionRow: { flexDirection: "row", flexWrap: "wrap", gap: 10, marginTop: 4 },
  branchPrimaryAction: { minHeight: 46, paddingHorizontal: 16, borderRadius: 14, alignItems: "center", justifyContent: "center" },
  branchSecondaryAction: { minHeight: 46, paddingHorizontal: 16, borderRadius: 14, borderWidth: 1, borderColor: colors.line, backgroundColor: colors.white, alignItems: "center", justifyContent: "center" },
  branchSecondaryActionText: { color: colors.greenDark, fontSize: 14, fontWeight: "900" },
  branchTestOutCopy: { color: colors.muted, fontSize: 12, lineHeight: 18, fontWeight: "700", marginTop: 2 },
  pathLane: { width: "100%", maxWidth: 620, minHeight: 220, alignSelf: "center", marginTop: 10, paddingVertical: 18, position: "relative" },
  pathDecorLayer: { ...StyleSheet.absoluteFillObject },
  pathDecorBlob: { position: "absolute", borderRadius: 999 },
  pathDecorBlobTopLeft: { width: 220, height: 220, left: -110, top: -28 },
  pathDecorBlobMiddle: { width: 180, height: 180, right: -76, top: 180 },
  pathDecorBlobBottomRight: { width: 240, height: 240, right: -126, bottom: -54 },
  pathDecorDot: { position: "absolute", borderRadius: 999 },
  pathDecorDotLeft: { width: 12, height: 12, left: 70, top: 180 },
  pathDecorDotRight: { width: 16, height: 16, right: 72, top: 114 },
  pathDecorDotBottom: { width: 10, height: 10, left: 140, bottom: 88 },
  pathSkyWash: { position: "absolute", left: 12, right: 12, top: 10, height: 120, borderRadius: 28 },
  pathAtmosphereBand: { position: "absolute", left: 24, right: 24, borderRadius: 999 },
  pathAtmosphereBandFar: { top: 88, height: 54 },
  pathAtmosphereBandNear: { top: 124, height: 44 },
  pathTerrainRidge: { position: "absolute", left: 18, right: 18, borderRadius: 999 },
  pathTerrainRidgeFar: { top: 140, height: 72 },
  pathTerrainRidgeNear: { top: 170, height: 84 },
  pathTerrainBase: { position: "absolute", left: 10, right: 10, bottom: 12, height: 118, borderTopLeftRadius: 54, borderTopRightRadius: 54, borderBottomLeftRadius: 26, borderBottomRightRadius: 26 },
  pathTerrainDune: { position: "absolute", bottom: 24, borderRadius: 999 },
  pathTerrainDuneLeft: { width: 210, height: 76, left: -24 },
  pathTerrainDuneCenter: { width: 280, height: 104, left: "50%", marginLeft: -140 },
  pathTerrainDuneRight: { width: 190, height: 72, right: -26 },
  pathStar: { position: "absolute", width: 6, height: 6, borderRadius: 999 },
  pathStarTop: { top: 36, left: 112 },
  pathStarMid: { top: 66, right: 126 },
  pathStarRight: { top: 98, right: 68 },
  pathMoonGlow: { position: "absolute", width: 74, height: 74, borderRadius: 37, right: 34, top: 24 },
  pathCityWrap: { position: "absolute", right: 28, top: 134, width: 92, height: 64, alignItems: "center", justifyContent: "flex-end" },
  pathCityDome: { position: "absolute", bottom: 16, width: 40, height: 22, borderTopLeftRadius: 22, borderTopRightRadius: 22, borderBottomLeftRadius: 6, borderBottomRightRadius: 6 },
  pathCityArch: { position: "absolute", bottom: 12, left: 8, width: 24, height: 28, borderTopLeftRadius: 14, borderTopRightRadius: 14, borderBottomLeftRadius: 6, borderBottomRightRadius: 6 },
  pathCityTower: { position: "absolute", bottom: 14, right: 10, width: 12, height: 34, borderTopLeftRadius: 7, borderTopRightRadius: 7, borderBottomLeftRadius: 4, borderBottomRightRadius: 4 },
  pathMountainWrap: { position: "absolute", left: 22, top: 138, width: 156, height: 72 },
  pathMountain: { position: "absolute", width: 0, height: 0, borderLeftWidth: 26, borderRightWidth: 26, borderBottomWidth: 56, borderLeftColor: "transparent", borderRightColor: "transparent" },
  pathMountainLeft: { left: 0, top: 14 },
  pathMountainCenter: { left: 42, borderLeftWidth: 32, borderRightWidth: 32, borderBottomWidth: 66 },
  pathMountainRight: { left: 96, top: 18, borderLeftWidth: 24, borderRightWidth: 24, borderBottomWidth: 50 },
  pathGardenLeaf: { position: "absolute", width: 44, height: 20, borderRadius: 999, bottom: 118, transform: [{ rotate: "-18deg" }] },
  pathGardenLeafLeft: { left: 32 },
  pathGardenLeafRight: { right: 28, transform: [{ rotate: "18deg" }] },
  pathGardenPool: { position: "absolute", left: "50%", marginLeft: -34, bottom: 102, width: 68, height: 18, borderRadius: 999 },
  pathCaravanWrap: { position: "absolute", left: 34, bottom: 92, width: 64, height: 22, flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  pathCaravanDot: { width: 12, height: 12, borderRadius: 999 },
  pathCaravanDotMid: { width: 10, height: 10 },
  pathCaravanDotLast: { width: 8, height: 8 },
  pathBackdropAura: { position: "absolute", left: "50%", marginLeft: -18, top: -8, bottom: -8, width: 36, borderRadius: 999 },
  pathBackdropShell: { position: "absolute", left: "50%", marginLeft: -11, top: -2, bottom: -2, width: 22, borderRadius: 999 },
  pathBackdrop: { position: "absolute", left: "50%", marginLeft: -6, top: 6, bottom: 6, width: 12, borderRadius: 999, opacity: 0.94 },
  nodeWrap: { width: "100%", marginVertical: 12 },
  nodeRail: { alignItems: "center" },
  nodeLeft: { alignItems: "flex-start" },
  nodeCenter: { alignItems: "center" },
  nodeRight: { alignItems: "flex-end" },
  nodePulseHalo: { position: "absolute", width: 134, height: 134, borderRadius: 67, top: -13, left: "50%", marginLeft: -67 },
  nodeCircle: { width: 108, height: 108, borderRadius: 54, alignItems: "center", justifyContent: "center", borderWidth: 5, borderColor: colors.green, backgroundColor: colors.white, position: "relative", shadowColor: "rgba(0,0,0,0.22)", shadowOffset: { width: 0, height: 12 }, shadowOpacity: 0.22, shadowRadius: 18, elevation: 6, overflow: "hidden" },
  nodeShadowPad: { position: "absolute", width: 108, height: 108, borderRadius: 54, top: 8, opacity: 0.82 },
  nodeOuterRing: { position: "absolute", inset: 5, borderRadius: 999, borderWidth: 2 },
  nodeGloss: { position: "absolute", top: 10, width: 72, height: 22, borderRadius: 999, backgroundColor: "rgba(255,255,255,0.28)" },
  nodeShineSweep: { position: "absolute", width: 26, height: 128, top: -10, backgroundColor: "rgba(255,255,255,0.26)" },
  nodeInnerOrb: { width: 72, height: 72, borderRadius: 36, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: "rgba(36,50,69,0.08)", overflow: "hidden" },
  nodeInnerRing: { position: "absolute", inset: 4, borderRadius: 999, borderWidth: 1 },
  nodeConnectorWrap: { alignItems: "center", marginTop: 8, width: 36, height: 62 },
  nodeConnectorAura: { position: "absolute", width: 26, height: 60, borderRadius: 999, top: 0 },
  nodeConnectorShell: { position: "absolute", width: 16, height: 60, borderRadius: 999, top: 0 },
  nodeConnector: { width: 10, height: 60, borderRadius: 999, opacity: 0.96 },
  nodeConnectorGlow: { position: "absolute", width: 20, height: 30, borderRadius: 999, top: 14, opacity: 0.42 },
  nodeConnectorDot: { position: "absolute", width: 8, height: 8, borderRadius: 999, borderWidth: 2, borderColor: colors.white, shadowColor: "rgba(0,0,0,0.12)", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.16, shadowRadius: 4, elevation: 1 },
  nodeConnectorDotTop: { top: 8 },
  nodeConnectorDotMid: { top: 26 },
  nodeConnectorDotBottom: { bottom: 8 },
  nodeCurrent: { backgroundColor: colors.gold, borderColor: colors.greenDark },
  nodeAvailable: { backgroundColor: colors.white },
  nodeLocked: { backgroundColor: colors.gray, borderColor: colors.line },
  nodePressed: { transform: [{ scale: 0.97 }] },
  nodeGlyphWrap: { width: 38, height: 38, alignItems: "center", justifyContent: "center" },
  bookCover: { position: "absolute", width: 22, height: 28, borderRadius: 5, left: 7, top: 3 },
  bookPageBlock: { position: "absolute", width: 13, height: 24, borderRadius: 4, right: 6, top: 5 },
  bookPageBlockFront: { right: 5, top: 6 },
  bookSpine: { position: "absolute", width: 5, height: 28, borderRadius: 4, left: 7, top: 3 },
  bookSpineFront: { left: 8, top: 4 },
  bookRibbon: { position: "absolute", width: 5, height: 15, borderBottomLeftRadius: 3, borderBottomRightRadius: 3, top: 1, right: 8 },
  bookSeal: { position: "absolute", right: 2, top: 2 },
  bookOpenPage: { position: "absolute", top: 6, width: 14, height: 22, borderRadius: 4, borderWidth: 2 },
  bookOpenLeft: { left: 3, transform: [{ rotate: "-6deg" }] },
  bookOpenRight: { right: 3, transform: [{ rotate: "6deg" }] },
  bookOpenCenter: { position: "absolute", width: 4, height: 20, borderRadius: 999, top: 7 },
  bookStackBack: { position: "absolute", width: 20, height: 24, borderRadius: 5, borderWidth: 2, left: 4, top: 4 },
  bookStackFront: { position: "absolute", width: 22, height: 26, borderRadius: 5, left: 9, top: 8 },
  sparkleBadgeBase: { width: 22, height: 22, borderRadius: 11, alignItems: "center", justifyContent: "center" },
  sparkleBadgeMark: { position: "absolute" },
  brainLobe: { position: "absolute", width: 13, height: 13, borderRadius: 7 },
  brainLobeLeft: { left: 6, top: 6 },
  brainLobeRight: { right: 6, top: 6 },
  brainLobeBottomLeft: { left: 8, top: 14 },
  brainLobeBottomRight: { right: 8, top: 14 },
  brainStem: { position: "absolute", width: 6, height: 10, borderRadius: 4, bottom: 2 },
  brainFold: { position: "absolute", width: 2, height: 12, borderRadius: 999, backgroundColor: "rgba(255,255,255,0.75)" },
  brainFoldTop: { top: 8, left: 16 },
  brainFoldBottom: { top: 14, right: 16 },
  shieldBody: { position: "absolute", width: 22, height: 26, left: 6, top: 5, borderTopLeftRadius: 10, borderTopRightRadius: 10, borderBottomLeftRadius: 12, borderBottomRightRadius: 12, transform: [{ rotate: "-6deg" }], overflow: "hidden" },
  shieldInset: { position: "absolute", left: 5, top: 4, width: 12, height: 15, borderTopLeftRadius: 7, borderTopRightRadius: 7, borderBottomLeftRadius: 8, borderBottomRightRadius: 8, opacity: 0.95 },
  swordBlade: { position: "absolute", width: 4, height: 22, borderRadius: 999, right: 8, top: 6, transform: [{ rotate: "26deg" }] },
  swordGuard: { position: "absolute", width: 10, height: 4, borderRadius: 999, right: 7, top: 18, transform: [{ rotate: "26deg" }] },
  swordHandle: { position: "absolute", width: 4, height: 9, borderRadius: 999, right: 6, top: 23, transform: [{ rotate: "26deg" }] },
  homeRoof: { position: "absolute", top: 4, left: 6, width: 0, height: 0, borderLeftWidth: 11, borderRightWidth: 11, borderBottomWidth: 11, borderLeftColor: "transparent", borderRightColor: "transparent" },
  homeBody: { position: "absolute", width: 22, height: 16, borderRadius: 5, left: 6, top: 14, alignItems: "center", justifyContent: "flex-end" },
  homeDoor: { width: 6, height: 8, borderTopLeftRadius: 3, borderTopRightRadius: 3, marginBottom: 1 },
  homeHeartWrap: { position: "absolute", top: 2, right: 1, width: 13, height: 13 },
  homeHeartCircle: { position: "absolute", width: 7, height: 7, borderRadius: 4 },
  homeHeartLeft: { left: 1, top: 0 },
  homeHeartRight: { right: 1, top: 0 },
  homeHeartPoint: { position: "absolute", width: 8, height: 8, left: 2.5, top: 3.5, transform: [{ rotate: "45deg" }] },
  nodeSparkle: { position: "absolute", top: 9 },
  nodeSparkleLeft: { left: 12 },
  nodeSparkleRight: { right: 12 },
  nodeCornerBadge: { position: "absolute", top: 7, right: 8, width: 24, height: 24, borderRadius: 12, alignItems: "center", justifyContent: "center", borderWidth: 1 },
  nodeCornerBadgeAlt: { top: 8, left: 8, right: undefined },
  nodeStarsBadge: { position: "absolute", bottom: -7, paddingHorizontal: 9, paddingVertical: 3, borderRadius: 999, backgroundColor: colors.white, borderWidth: 1, borderColor: colors.line, shadowColor: "rgba(0,0,0,0.12)", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.16, shadowRadius: 8, elevation: 2 },
  nodeStarsBadgeInner: { flexDirection: "row", alignItems: "center", gap: 4 },
  nodeStarsText: { color: colors.ink, fontSize: 11, fontWeight: "900", letterSpacing: 0 },
  nodeTextBlock: { width: 206, marginTop: 12, alignItems: "center" },
  nodeTitle: { color: colors.ink, fontSize: 15, fontWeight: "900", textAlign: "center", letterSpacing: 0 },
  nodeStatePill: { marginTop: 8, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 999 },
  nodeStateText: { fontSize: 11, fontWeight: "900", textTransform: "uppercase" },
  nodeMeta: { color: colors.muted, fontSize: 12, fontWeight: "700", textAlign: "center", letterSpacing: 0, marginTop: 4 },
  rewardStopWrap: { alignItems: "center", marginVertical: 12 },
  rewardStopCard: { width: 304, flexDirection: "row", alignItems: "center", gap: 12, padding: 15, borderRadius: 22, borderWidth: 1, borderColor: "#E3ECE6", backgroundColor: "#F6FAF7", shadowColor: "rgba(15,39,30,0.08)", shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.12, shadowRadius: 16, elevation: 2, position: "relative", overflow: "hidden" },
  rewardStopCardClaimed: { opacity: 0.72 },
  rewardStopHalo: { position: "absolute", left: 8, top: 4, width: 76, height: 76, borderRadius: 38 },
  rewardStopChest: { width: 58, height: 48, borderRadius: 16, backgroundColor: "#B8C2BD", alignItems: "center", justifyContent: "center", position: "relative" },
  rewardStopChestLid: { position: "absolute", top: -4, width: 48, height: 13, borderRadius: 10, backgroundColor: "#8D9A93" },
  rewardStopChestTrim: { position: "absolute", width: 10, height: 44, borderRadius: 999, left: 24, top: 1 },
  rewardStopText: { flex: 1 },
  rewardStopTitle: { color: colors.ink, fontSize: 15, fontWeight: "900" },
  rewardStopCopy: { color: colors.muted, fontSize: 12, lineHeight: 17, fontWeight: "600", marginTop: 4 },
  rewardStopMeta: { alignItems: "flex-end" },
  rewardStopGems: { color: "#6C3BC6", fontSize: 18, fontWeight: "900" },
  rewardStopMetaLabel: { color: colors.muted, fontSize: 11, fontWeight: "800", marginTop: 4, textTransform: "uppercase" },
  coachCard: { flexDirection: "row", alignItems: "center", gap: 12, paddingVertical: 8, paddingHorizontal: 6, marginVertical: 6 },
  coachBubble: { flex: 1, padding: 14, borderRadius: 20, borderWidth: 1, borderColor: colors.line, backgroundColor: "#F7FBF8" },
  coachTitle: { color: colors.ink, fontSize: 15, fontWeight: "900", letterSpacing: 0 },
  coachCopy: { color: colors.muted, fontSize: 13, lineHeight: 18, fontWeight: "600", letterSpacing: 0, marginTop: 4 },
  heartsPrompt: { marginTop: 18, padding: 16, borderRadius: 20, borderWidth: 1, borderColor: "#F1C7C1", backgroundColor: colors.coralSoft },
  heartsPromptTitle: { color: colors.ink, fontSize: 16, fontWeight: "900", letterSpacing: 0 },
  heartsPromptCopy: { color: colors.muted, fontSize: 14, lineHeight: 19, fontWeight: "600", letterSpacing: 0, marginTop: 4 },
  lessonScreen: { flex: 1, backgroundColor: colors.white },
  lessonTop: { flexDirection: "row", alignItems: "center", gap: 12, padding: 16, borderBottomWidth: 1, borderBottomColor: colors.line },
  lessonTopActions: { flexDirection: "row", alignItems: "center", gap: 8 },
  closeButton: { paddingVertical: 8, paddingHorizontal: 10, borderRadius: 8, backgroundColor: colors.gray },
  closeText: { color: colors.ink, fontWeight: "900", letterSpacing: 0 },
  retryBadge: { paddingHorizontal: 10, paddingVertical: 8, borderRadius: 999, backgroundColor: "#FFF3CF" },
  retryBadgeText: { color: "#A66C00", fontSize: 12, fontWeight: "900", letterSpacing: 0 },
  skipLessonButton: { paddingVertical: 8, paddingHorizontal: 10, borderRadius: 8, borderWidth: 1, borderColor: colors.line, backgroundColor: colors.white },
  skipLessonText: { color: colors.muted, fontSize: 13, fontWeight: "800", letterSpacing: 0 },
  lessonProgressTrack: { flex: 1, height: 12, overflow: "hidden", borderRadius: 6, backgroundColor: colors.gray },
  lessonProgressFill: { height: 12 },
  lessonBody: { flex: 1, padding: 20 },
  lessonQuestionWrap: { flex: 1, width: "100%", maxWidth: 640, alignSelf: "center", paddingHorizontal: 4, paddingVertical: 18 },
  lessonCoachCard: { flexDirection: "row", alignItems: "center", gap: 12 },
  lessonSpeechBubble: { flex: 1, padding: 14, borderRadius: 8, borderWidth: 1, borderColor: colors.line, backgroundColor: "#F8FBF8" },
  lessonSpeechTitle: { color: colors.ink, fontSize: 15, fontWeight: "900", letterSpacing: 0 },
  lessonSpeechCopy: { color: colors.muted, fontSize: 13, lineHeight: 18, fontWeight: "600", letterSpacing: 0, marginTop: 4 },
  questionPrepCard: { marginTop: 16, padding: 14, borderRadius: 18, borderWidth: 1, borderColor: "#D6E7DE", backgroundColor: "#F7FBF8" },
  questionPrepEyebrow: { color: colors.greenDark, fontSize: 11, fontWeight: "900", textTransform: "uppercase" },
  questionPrepCopy: { color: colors.ink, fontSize: 13, lineHeight: 19, fontWeight: "700", marginTop: 5 },
  questionPrepLink: { alignSelf: "flex-start", marginTop: 8, paddingHorizontal: 10, paddingVertical: 8, borderRadius: 999, backgroundColor: "#E6F0FB" },
  questionPrepLinkText: { color: colors.sky, fontSize: 12, fontWeight: "900" },
  promptCard: { marginTop: 24 },
  eyebrow: { color: colors.greenDark, fontSize: 13, fontWeight: "900", textTransform: "uppercase", letterSpacing: 0 },
  challengePrompt: { color: colors.ink, fontSize: 28, lineHeight: 34, fontWeight: "900", letterSpacing: 0, marginTop: 8 },
  choiceStack: { marginTop: 24, gap: 12 },
  choiceButton: { minHeight: 58, borderRadius: 8, borderWidth: 2, borderColor: colors.line, backgroundColor: colors.white, paddingHorizontal: 16, alignItems: "flex-start", justifyContent: "center" },
  choiceSelected: { borderColor: colors.sky, backgroundColor: colors.skySoft },
  choiceWrong: { borderColor: colors.coral, backgroundColor: colors.coralSoft },
  choiceText: { color: colors.ink, fontSize: 16, lineHeight: 22, fontWeight: "800", letterSpacing: 0 },
  sourcesBlock: { marginTop: 24, gap: 10 },
  sourcesTitle: { color: colors.ink, fontSize: 17, fontWeight: "900", letterSpacing: 0 },
  sourceCard: { borderRadius: 8, borderWidth: 1, backgroundColor: "#FBFDFC", padding: 14 },
  sourceHeader: { flexDirection: "row", alignItems: "center", gap: 8 },
  sourceBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 999, color: colors.ink, fontSize: 11, fontWeight: "900", overflow: "hidden" },
  sourceCategory: { color: colors.muted, fontSize: 11, fontWeight: "800", textTransform: "uppercase", letterSpacing: 0 },
  sourceReviewedPill: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 999, backgroundColor: "#E9F7EF" },
  sourceReviewedText: { color: colors.greenDark, fontSize: 10, fontWeight: "900", textTransform: "uppercase" },
  sourceTitle: { color: colors.ink, fontSize: 15, fontWeight: "900", letterSpacing: 0, marginTop: 8 },
  sourceStatusPill: { marginLeft: "auto", paddingHorizontal: 8, paddingVertical: 4, borderRadius: 999 },
  sourceStatusText: { fontSize: 10, fontWeight: "900", textTransform: "uppercase" },
  sourceSupportRow: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginTop: 10 },
  sourceSupportPill: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 999, fontSize: 11, fontWeight: "900", overflow: "hidden" },
  sourceMetaStack: { gap: 6, marginTop: 10 },
  sourceMetaRow: { flexDirection: "row", alignItems: "flex-start", gap: 8 },
  sourceMetaLabel: { width: 66, color: colors.muted, fontSize: 11, fontWeight: "900", textTransform: "uppercase", letterSpacing: 0 },
  sourceMetaValue: { flex: 1, color: colors.ink, fontSize: 12, lineHeight: 17, fontWeight: "700", letterSpacing: 0 },
  sourceTeachingCard: { marginTop: 10, padding: 12, borderRadius: 14, backgroundColor: "#F4FBF7" },
  sourceTeachingLabel: { color: colors.greenDark, fontSize: 11, fontWeight: "900", textTransform: "uppercase" },
  sourceTeachingCopy: { color: colors.ink, fontSize: 13, lineHeight: 18, fontWeight: "700", marginTop: 5 },
  sourceCopy: { color: colors.muted, fontSize: 13, lineHeight: 18, fontWeight: "600", letterSpacing: 0, marginTop: 6 },
  sourceAttachmentCard: { marginTop: 10, padding: 12, borderRadius: 14, backgroundColor: "#FFF8EA" },
  sourceAttachmentLabel: { color: "#996100", fontSize: 11, fontWeight: "900", textTransform: "uppercase" },
  sourceAttachmentCopy: { color: colors.ink, fontSize: 13, lineHeight: 18, fontWeight: "700", marginTop: 5 },
  sourceLink: { color: colors.sky, fontSize: 12, fontWeight: "900", letterSpacing: 0, marginTop: 8 },
  sourceListHint: { color: colors.muted, fontSize: 12, lineHeight: 17, fontWeight: "700" },
  feedbackPane: { padding: 18, gap: 12, borderTopWidth: 1, borderTopColor: colors.line, backgroundColor: colors.white },
  feedbackGood: { backgroundColor: "#DCF7E8" },
  feedbackBad: { backgroundColor: colors.coralSoft },
  feedbackTitle: { color: colors.ink, fontSize: 18, fontWeight: "900", letterSpacing: 0 },
  feedbackTitleGood: { color: colors.greenDark },
  feedbackTitleBad: { color: "#B5392D" },
  feedbackCopy: { color: colors.muted, fontSize: 15, lineHeight: 21, fontWeight: "700", letterSpacing: 0 },
  feedbackTeachCard: { padding: 12, borderRadius: 12, backgroundColor: "rgba(255,255,255,0.7)", borderWidth: 1, borderColor: "rgba(24,49,38,0.06)" },
  feedbackTeachTitle: { color: colors.ink, fontSize: 12, fontWeight: "900", textTransform: "uppercase" },
  feedbackTeachCopy: { color: colors.ink, fontSize: 14, lineHeight: 20, fontWeight: "700", marginTop: 6 },
  feedbackSupportCard: { padding: 12, borderRadius: 12, backgroundColor: "rgba(255,255,255,0.82)", borderWidth: 1, borderColor: "rgba(24,49,38,0.06)" },
  feedbackSupportCopy: { color: colors.ink, fontSize: 13, lineHeight: 18, fontWeight: "700" },
  feedbackSupportHint: { color: colors.muted, fontSize: 12, lineHeight: 17, fontWeight: "800", marginTop: 6 },
  feedbackSupportLinkWrap: { alignSelf: "flex-start", marginTop: 8 },
  feedbackSupportLink: { color: colors.sky, fontSize: 13, fontWeight: "900" },
  rewardRow: { flexDirection: "row", alignItems: "center", gap: 10, paddingHorizontal: 12, paddingVertical: 10, borderRadius: 8, backgroundColor: "rgba(255,255,255,0.72)" },
  rewardStars: { flexDirection: "row", alignItems: "center", gap: 4 },
  rewardCopy: { color: colors.ink, fontSize: 14, fontWeight: "800", letterSpacing: 0 },
  primaryButton: { minHeight: 52, borderRadius: 8, alignItems: "center", justifyContent: "center" },
  primaryButtonDisabled: { backgroundColor: colors.line },
  checkButton: { backgroundColor: colors.green },
  correctButton: { backgroundColor: colors.green },
  wrongButton: { backgroundColor: "#D84B3E" },
  primaryButtonText: { color: colors.white, fontSize: 16, fontWeight: "900", letterSpacing: 0 },
  shopContent: { padding: 18, paddingBottom: 128, gap: 14 },
  shopHero: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 12, padding: 16, borderRadius: 8 },
  shopHeroText: { flex: 1 },
  planCard: { borderRadius: 14, borderWidth: 1, borderColor: colors.line, backgroundColor: colors.white, padding: 16 },
  planHeaderRow: { flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", gap: 12 },
  planTitleWrap: { flex: 1, gap: 6 },
  planTierEyebrow: { color: colors.greenDark, fontSize: 11, fontWeight: "900", textTransform: "uppercase" },
  planTitle: { color: colors.ink, fontSize: 18, fontWeight: "900", marginTop: 4 },
  planPrice: { color: colors.ink, fontSize: 20, fontWeight: "900" },
  planCopy: { color: colors.muted, fontSize: 14, lineHeight: 20, fontWeight: "600", marginTop: 8 },
  planBenefit: { color: colors.ink, fontSize: 13, lineHeight: 18, fontWeight: "700", marginTop: 8 },
  planBadge: { alignSelf: "flex-start", paddingHorizontal: 8, paddingVertical: 4, borderRadius: 999, backgroundColor: "#FFF3CF", color: "#A66C00", fontSize: 11, fontWeight: "900", overflow: "hidden" },
  shopPlanCard: { alignItems: "flex-start" },
  socialContent: { padding: 18, paddingBottom: 128, gap: 14 },
  socialHero: { flexDirection: "row", alignItems: "stretch", gap: 12, padding: 18, borderRadius: 8, backgroundColor: "#DCF7E8" },
  socialHeroText: { flex: 1 },
  socialHeroScore: { width: 108, borderRadius: 8, backgroundColor: colors.white, alignItems: "center", justifyContent: "center", padding: 12 },
  socialHeroScoreLabel: { color: colors.muted, fontSize: 12, fontWeight: "800", textTransform: "uppercase", letterSpacing: 0 },
  socialHeroScoreValue: { color: colors.greenDark, fontSize: 28, lineHeight: 32, fontWeight: "900", letterSpacing: 0, marginTop: 6 },
  socialRolePill: { alignSelf: "flex-start", marginTop: 12, borderRadius: 999, paddingHorizontal: 10, paddingVertical: 6, backgroundColor: "rgba(255,255,255,0.72)" },
  socialRolePillText: { color: colors.greenDark, fontSize: 12, fontWeight: "900", letterSpacing: 0, textTransform: "uppercase" },
  socialCard: { borderRadius: 8, borderWidth: 1, borderColor: colors.line, backgroundColor: colors.white, padding: 16 },
  socialCardTitle: { color: colors.ink, fontSize: 19, fontWeight: "900", letterSpacing: 0 },
  socialCardCopy: { color: colors.muted, fontSize: 14, lineHeight: 20, fontWeight: "600", letterSpacing: 0, marginTop: 4, marginBottom: 12 },
  relationRow: { flexDirection: "row", gap: 10, marginBottom: 2 },
  relationButton: { flex: 1, minHeight: 42, borderRadius: 8, borderWidth: 1, borderColor: colors.line, backgroundColor: "#F7FBF8", alignItems: "center", justifyContent: "center" },
  relationButtonActive: { borderColor: colors.green, backgroundColor: colors.mint },
  relationButtonText: { color: colors.muted, fontSize: 14, fontWeight: "800", letterSpacing: 0 },
  relationButtonTextActive: { color: colors.greenDark },
  socialAddButton: { marginTop: 14, backgroundColor: colors.green },
  alertStack: { gap: 10 },
  alertCard: { flexDirection: "row", alignItems: "center", gap: 12, borderRadius: 8, backgroundColor: "#F9FCFA", padding: 14 },
  alertTextWrap: { flex: 1 },
  alertTitle: { color: colors.ink, fontSize: 15, fontWeight: "900", letterSpacing: 0 },
  alertCopy: { color: colors.muted, fontSize: 12, lineHeight: 17, fontWeight: "700", letterSpacing: 0, marginTop: 4 },
  remindButton: { minWidth: 78, minHeight: 40, borderRadius: 8, alignItems: "center", justifyContent: "center", backgroundColor: colors.sky },
  remindButtonText: { color: colors.white, fontSize: 13, fontWeight: "900", letterSpacing: 0 },
  leaderboardStack: { gap: 10 },
  leaderboardRow: { flexDirection: "row", alignItems: "center", gap: 10, paddingVertical: 10, borderTopWidth: 1, borderTopColor: "#EEF3EF" },
  leaderboardRank: { width: 28, alignItems: "center", justifyContent: "center" },
  leaderboardRankText: { color: colors.greenDark, fontSize: 15, fontWeight: "900", letterSpacing: 0 },
  leaderboardAvatar: { width: 36, height: 36, borderRadius: 18, alignItems: "center", justifyContent: "center", backgroundColor: "#EEF4F0" },
  leaderboardAvatarUser: { backgroundColor: colors.green },
  leaderboardAvatarText: { color: colors.greenDark, fontSize: 12, fontWeight: "900", letterSpacing: 0 },
  leaderboardAvatarTextUser: { color: colors.white },
  leaderboardMain: { flex: 1 },
  leaderboardName: { color: colors.ink, fontSize: 15, fontWeight: "900", letterSpacing: 0 },
  leaderboardMeta: { color: colors.muted, fontSize: 12, lineHeight: 17, fontWeight: "700", letterSpacing: 0, marginTop: 2 },
  leaderboardScore: { minWidth: 70, alignItems: "flex-end" },
  leaderboardScoreValue: { color: colors.ink, fontSize: 18, fontWeight: "900", letterSpacing: 0 },
  leaderboardScoreLabel: { color: colors.muted, fontSize: 11, fontWeight: "800", textTransform: "uppercase", letterSpacing: 0 },
  emptySocialState: { borderRadius: 8, backgroundColor: "#F7FBF8", padding: 14 },
  emptySocialTitle: { color: colors.ink, fontSize: 15, fontWeight: "900", letterSpacing: 0 },
  emptySocialCopy: { color: colors.muted, fontSize: 13, lineHeight: 18, fontWeight: "600", letterSpacing: 0, marginTop: 4 },
  socialRoster: { gap: 10 },
  connectionCard: { borderRadius: 8, backgroundColor: "#F9FCFA", padding: 14 },
  connectionHeader: { flexDirection: "row", alignItems: "center", gap: 10 },
  connectionAvatar: { width: 40, height: 40, borderRadius: 20, alignItems: "center", justifyContent: "center", backgroundColor: "#E9F6EE" },
  connectionAvatarText: { color: colors.greenDark, fontSize: 13, fontWeight: "900", letterSpacing: 0 },
  connectionText: { flex: 1 },
  connectionName: { color: colors.ink, fontSize: 15, fontWeight: "900", letterSpacing: 0 },
  connectionMeta: { color: colors.muted, fontSize: 12, lineHeight: 17, fontWeight: "700", letterSpacing: 0, marginTop: 2 },
  connectionRecord: { color: colors.muted, fontSize: 12, lineHeight: 17, fontWeight: "700", letterSpacing: 0, marginTop: 10 },
  battleButton: { minWidth: 82, minHeight: 40, borderRadius: 8, alignItems: "center", justifyContent: "center", backgroundColor: colors.green },
  battleButtonText: { color: colors.white, fontSize: 13, fontWeight: "900", letterSpacing: 0 },
  battleHistoryStack: { gap: 10 },
  battleHistoryRow: { flexDirection: "row", alignItems: "center", gap: 10, borderRadius: 8, backgroundColor: "#F9FCFA", padding: 14 },
  battleHistoryText: { flex: 1 },
  battleHistoryTitle: { color: colors.ink, fontSize: 15, fontWeight: "900", letterSpacing: 0 },
  battleHistoryMeta: { color: colors.muted, fontSize: 12, lineHeight: 17, fontWeight: "700", letterSpacing: 0, marginTop: 4 },
  battleScorePill: { minWidth: 86, borderRadius: 999, paddingHorizontal: 12, paddingVertical: 8, alignItems: "center", justifyContent: "center", backgroundColor: "#EAF8F0" },
  battleScoreText: { color: colors.greenDark, fontSize: 15, fontWeight: "900", letterSpacing: 0 },
  socialDoneButton: { backgroundColor: colors.green },
  title: { color: colors.ink, fontSize: 28, lineHeight: 34, fontWeight: "900", letterSpacing: 0, marginTop: 4 },
  subtitle: { color: colors.muted, fontSize: 15, lineHeight: 21, fontWeight: "600", letterSpacing: 0, marginTop: 6 },
  shopItem: { flexDirection: "row", alignItems: "center", gap: 12, padding: 14, borderRadius: 8, borderWidth: 1, borderColor: colors.line, backgroundColor: colors.white },
  shopItemText: { flex: 1 },
  shopItemTitle: { color: colors.ink, fontSize: 17, lineHeight: 22, fontWeight: "900", letterSpacing: 0 },
  shopItemCopy: { color: colors.muted, fontSize: 14, lineHeight: 20, fontWeight: "600", letterSpacing: 0, marginTop: 4 },
  secondaryButton: { minWidth: 84, minHeight: 44, alignItems: "center", justifyContent: "center", borderRadius: 8 },
  secondaryButtonText: { color: colors.white, fontWeight: "900", letterSpacing: 0 },
  modalBackdrop: { flex: 1, backgroundColor: "rgba(20,37,27,0.45)", alignItems: "center", justifyContent: "center", padding: 24 },
  modalCard: { width: "100%", maxWidth: 420, borderRadius: 8, backgroundColor: colors.white, padding: 18, borderWidth: 1, borderColor: colors.line },
  celebrationCard: { width: "100%", maxWidth: 420, borderRadius: 24, backgroundColor: colors.white, padding: 22, borderWidth: 1, borderColor: colors.line, shadowColor: "rgba(16,47,32,0.18)", shadowOffset: { width: 0, height: 16 }, shadowOpacity: 0.2, shadowRadius: 28, elevation: 6, overflow: "hidden" },
  celebrationBurstLayer: { position: "absolute", left: 0, right: 0, top: 6, height: 88 },
  celebrationBurstChip: { position: "absolute", top: 22, minWidth: 82, paddingHorizontal: 10, paddingVertical: 7, borderRadius: 999, borderWidth: 1, alignItems: "center" },
  celebrationBurstText: { fontSize: 11, fontWeight: "900", letterSpacing: 0 },
  celebrationSparkle: { alignSelf: "center", marginBottom: 8 },
  celebrationStats: { flexDirection: "row", flexWrap: "wrap", gap: 10, marginBottom: 14 },
  celebrationStat: { flexGrow: 1, minWidth: 80, paddingVertical: 12, paddingHorizontal: 10, borderRadius: 16, backgroundColor: "#F7FBF8", alignItems: "center" },
  celebrationStatValue: { color: colors.ink, fontSize: 20, fontWeight: "900" },
  celebrationStatLabel: { color: colors.muted, fontSize: 11, fontWeight: "800", textTransform: "uppercase", marginTop: 3 },
  celebrationUnlock: { marginBottom: 16, padding: 14, borderRadius: 18, backgroundColor: "#FFF8DB" },
  celebrationUnlockEyebrow: { color: "#A66C00", fontSize: 11, fontWeight: "900", textTransform: "uppercase" },
  celebrationUnlockTitle: { color: colors.ink, fontSize: 17, fontWeight: "900", marginTop: 4 },
  modalEyebrow: { color: colors.greenDark, fontSize: 12, fontWeight: "900", textTransform: "uppercase", letterSpacing: 0 },
  modalTitle: { color: colors.ink, fontSize: 26, lineHeight: 31, fontWeight: "900", letterSpacing: 0, marginTop: 6 },
  modalCopy: { color: colors.muted, fontSize: 14, lineHeight: 20, fontWeight: "600", letterSpacing: 0, marginTop: 8, marginBottom: 14 },
  authModeRow: { flexDirection: "row", gap: 8, marginBottom: 2 },
  authModeButton: { flex: 1, minHeight: 40, alignItems: "center", justifyContent: "center", borderRadius: 8, borderWidth: 1, borderColor: colors.line, backgroundColor: "#F8FBF8" },
  authModeButtonActive: { borderColor: colors.green, backgroundColor: colors.mint },
  authModeText: { color: colors.muted, fontSize: 13, fontWeight: "800", letterSpacing: 0 },
  authModeTextActive: { color: colors.greenDark },
  settingsOptionStack: { gap: 10 },
  settingsOptionCard: { borderRadius: 8, borderWidth: 1, borderColor: colors.line, backgroundColor: "#F8FBF8", padding: 14 },
  settingsOptionCardActive: { borderColor: colors.green, backgroundColor: colors.mint },
  settingsOptionTitle: { color: colors.ink, fontSize: 15, fontWeight: "900", letterSpacing: 0 },
  settingsOptionTitleActive: { color: colors.greenDark },
  settingsOptionCopy: { color: colors.muted, fontSize: 13, lineHeight: 18, fontWeight: "600", letterSpacing: 0, marginTop: 4 },
  settingsOptionCopyActive: { color: colors.greenDark },
  settingsReminderCard: { marginTop: 14, borderRadius: 8, borderWidth: 1, borderColor: colors.line, backgroundColor: "#F7FBF8", padding: 14, gap: 12 },
  settingsReminderTitle: { color: colors.ink, fontSize: 15, fontWeight: "900", letterSpacing: 0 },
  settingsToggleRow: { flexDirection: "row", alignItems: "center", gap: 12 },
  settingsToggleTextWrap: { flex: 1 },
  settingsToggleLabel: { color: colors.ink, fontSize: 13, lineHeight: 18, fontWeight: "700", letterSpacing: 0 },
  settingsTogglePill: { width: 48, height: 28, borderRadius: 999, backgroundColor: "#D8E6DD", padding: 3, justifyContent: "center" },
  settingsTogglePillActive: { backgroundColor: colors.green },
  settingsToggleKnob: { width: 22, height: 22, borderRadius: 999, backgroundColor: colors.white },
  settingsToggleKnobActive: { alignSelf: "flex-end" },
  settingsReminderHelp: { color: colors.muted, fontSize: 12, lineHeight: 17, fontWeight: "600", letterSpacing: 0 },
  input: { minHeight: 48, borderRadius: 8, borderWidth: 1, borderColor: colors.line, backgroundColor: "#FBFDFC", paddingHorizontal: 14, color: colors.ink, marginTop: 10 },
  socialStack: { gap: 10, marginTop: 14 },
  socialButton: { minHeight: 48, borderRadius: 8, paddingHorizontal: 14, borderWidth: 1, alignItems: "center", flexDirection: "row", gap: 10 },
  googleButton: { borderColor: "#C7D8F0", backgroundColor: "#F4F8FE" },
  facebookButton: { borderColor: "#BFD2FF", backgroundColor: "#EEF3FF" },
  socialButtonBrand: { width: 24, textAlign: "center", color: colors.ink, fontSize: 18, fontWeight: "900", letterSpacing: 0 },
  socialButtonText: { color: colors.ink, fontSize: 14, fontWeight: "800", letterSpacing: 0 },
  modalHint: { color: colors.muted, fontSize: 12, lineHeight: 17, fontWeight: "600", letterSpacing: 0, marginTop: 10 },
  languageGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10, marginTop: 2 },
  languageOption: { width: "48%", minHeight: 86, borderRadius: 8, borderWidth: 1, borderColor: colors.line, backgroundColor: "#F8FBF8", paddingHorizontal: 12, paddingVertical: 10, justifyContent: "center" },
  languageOptionActive: { borderColor: colors.green, backgroundColor: colors.mint },
  languageOptionCode: { color: colors.greenDark, fontSize: 11, fontWeight: "900", letterSpacing: 0, textTransform: "uppercase" },
  languageOptionCodeActive: { color: colors.greenDark },
  languageOptionNative: { color: colors.ink, fontSize: 17, fontWeight: "900", letterSpacing: 0, marginTop: 4 },
  languageOptionNativeActive: { color: colors.greenDark },
  languageOptionLabel: { color: colors.muted, fontSize: 12, fontWeight: "700", letterSpacing: 0, marginTop: 3 },
  languageOptionLabelActive: { color: colors.greenDark },
  modalActions: { flexDirection: "row", gap: 10, marginTop: 16 },
  modalGhostButton: { flex: 1, minHeight: 48, borderRadius: 8, alignItems: "center", justifyContent: "center", backgroundColor: colors.gray },
  modalGhostText: { color: colors.ink, fontSize: 14, fontWeight: "900", letterSpacing: 0 },
  modalPrimaryButton: { flex: 1, minHeight: 48, borderRadius: 8, alignItems: "center", justifyContent: "center", backgroundColor: colors.green },
  modalPrimaryText: { color: colors.white, fontSize: 14, fontWeight: "900", letterSpacing: 0 },
  modalDangerButton: {
    flex: 1,
    minHeight: 46,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF1F1",
    borderWidth: 1,
    borderColor: "#F4C7C7"
  },
  modalDangerText: { color: "#B42318", fontSize: 14, fontWeight: "900", letterSpacing: 0 },
  reviewRestoreCard: { marginTop: 2, borderRadius: 8, backgroundColor: "#F7FBF8", padding: 14 },
  reviewRestoreTitle: { color: colors.ink, fontSize: 15, fontWeight: "900", letterSpacing: 0 },
  reviewRestoreCopy: { color: colors.muted, fontSize: 13, lineHeight: 18, fontWeight: "600", letterSpacing: 0, marginTop: 4 },
  screenScrollContent: { padding: 18, paddingBottom: 128, gap: 14 },
  screenHeader: { flexDirection: "row", alignItems: "center", gap: 12, paddingTop: 4, paddingBottom: 6 },
  screenBackButton: { minWidth: 68, minHeight: 40, paddingHorizontal: 12, borderRadius: 12, alignItems: "center", justifyContent: "center", backgroundColor: colors.gray },
  screenBackButtonText: { color: colors.ink, fontSize: 13, fontWeight: "900" },
  screenHeaderText: { flex: 1 },
  screenHeaderTitle: { color: colors.ink, fontSize: 24, fontWeight: "900" },
  screenHeaderSubtitle: { color: colors.muted, fontSize: 13, lineHeight: 18, fontWeight: "700", marginTop: 2 },
  screenActionButton: { minHeight: 40, paddingHorizontal: 14, borderRadius: 12, alignItems: "center", justifyContent: "center", backgroundColor: colors.green },
  screenActionButtonText: { color: colors.white, fontSize: 13, fontWeight: "900" },
  screenActionSpacer: { width: 68 },
  sectionHeaderSimple: { marginTop: 2 },
  topicGrid: { flexDirection: "row", flexWrap: "wrap", gap: 12 },
  focusPanel: { padding: 18, borderRadius: 22, borderWidth: 1, borderColor: "#DCE8E0", backgroundColor: colors.white, shadowColor: "rgba(16,47,32,0.08)", shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.1, shadowRadius: 16, elevation: 2 },
  focusPanelCompact: { padding: 18, borderRadius: 22, borderWidth: 1, borderColor: "#DCE8E0", backgroundColor: "#FBFDFC", overflow: "hidden" },
  focusPanelGlow: { position: "absolute", width: 180, height: 180, borderRadius: 90, right: -38, top: -56 },
  focusPanelEyebrow: { color: colors.greenDark, fontSize: 11, fontWeight: "900", textTransform: "uppercase" },
  focusPanelTitle: { color: colors.ink, fontSize: 24, fontWeight: "900", marginTop: 6 },
  focusPanelCopy: { color: colors.muted, fontSize: 14, lineHeight: 20, fontWeight: "700", marginTop: 6 },
  focusPanelButtonRow: { flexDirection: "row", flexWrap: "wrap", gap: 10, marginTop: 14 },
  focusPrimaryButton: { minHeight: 48, paddingHorizontal: 16, borderRadius: 14, alignItems: "center", justifyContent: "center", backgroundColor: colors.green },
  focusPrimaryButtonText: { color: colors.white, fontSize: 14, fontWeight: "900" },
  focusSecondaryButton: { minHeight: 48, paddingHorizontal: 16, borderRadius: 14, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: colors.line, backgroundColor: colors.white },
  focusSecondaryButtonText: { color: colors.greenDark, fontSize: 14, fontWeight: "900" },
  branchListColumn: { gap: 12 },
  branchListCard: { padding: 16, borderRadius: 20, borderWidth: 1, borderColor: colors.line, backgroundColor: colors.white },
  branchListCardTop: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 12 },
  branchListTitle: { color: colors.ink, fontSize: 17, fontWeight: "900" },
  branchListMeta: { color: colors.greenDark, fontSize: 12, fontWeight: "800" },
  branchListCopy: { color: colors.muted, fontSize: 13, lineHeight: 18, fontWeight: "700", marginTop: 6 },
  branchListMetaRow: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginTop: 10, marginBottom: 10 },
  branchHeroCard: { flexDirection: "row", alignItems: "center", gap: 14, padding: 18, borderRadius: 24, borderWidth: 1, borderColor: colors.line, backgroundColor: colors.white, overflow: "hidden" },
  branchHeroGlow: { position: "absolute", width: 180, height: 180, borderRadius: 90, left: -36, top: -58 },
  branchHeroGlowRight: { right: -46, top: 24 },
  branchHeroText: { flex: 1 },
  branchHeroMeta: { color: colors.muted, fontSize: 12, fontWeight: "800", marginTop: 8 },
  branchChip: { minHeight: 42, paddingHorizontal: 14, borderRadius: 999, borderWidth: 1, borderColor: colors.line, backgroundColor: colors.white, alignItems: "center", justifyContent: "center" },
  branchChipText: { color: colors.ink, fontSize: 13, fontWeight: "800" },
  cleanPathCard: { width: "100%", maxWidth: 700, alignSelf: "center", paddingVertical: 14, paddingHorizontal: 14, borderRadius: 32, borderWidth: 1, borderColor: colors.line, backgroundColor: colors.white, position: "relative", overflow: "hidden", shadowColor: "rgba(22,52,39,0.12)", shadowOffset: { width: 0, height: 14 }, shadowOpacity: 0.18, shadowRadius: 28, elevation: 4 },
  cleanPathLane: { width: "100%", alignSelf: "center", paddingVertical: 22, minHeight: 260 },
  lessonStageScreen: { flex: 1, backgroundColor: colors.bg, padding: 18 },
  lessonStageCard: { flex: 1, alignItems: "center", justifyContent: "center", gap: 10, padding: 24, borderRadius: 24, borderWidth: 1, backgroundColor: colors.white },
  lessonStageEyebrow: { color: colors.greenDark, fontSize: 12, fontWeight: "900", textTransform: "uppercase" },
  lessonStageTitle: { color: colors.ink, fontSize: 28, lineHeight: 34, fontWeight: "900", textAlign: "center" },
  lessonStageCopy: { color: colors.muted, fontSize: 15, lineHeight: 21, fontWeight: "700", textAlign: "center", maxWidth: 520 },
  lessonFlowContent: { padding: 18, paddingBottom: 128, gap: 14 },
  lessonFlowHint: { color: colors.muted, fontSize: 12, lineHeight: 17, fontWeight: "700", textAlign: "center" },
  lessonFocusCard: { alignItems: "center", gap: 14, padding: 22, borderRadius: 26, borderWidth: 1, backgroundColor: colors.white },
  lessonFocusBadgeRow: { width: "100%", flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 10, flexWrap: "wrap" },
  lessonFocusPill: { paddingHorizontal: 12, paddingVertical: 7, borderRadius: 999 },
  lessonFocusPillText: { fontSize: 12, fontWeight: "900", letterSpacing: 0 },
  lessonFocusPrimaryButton: { width: "100%", maxWidth: 320, marginTop: 4 },
  lessonStageRail: { flexDirection: "row", alignItems: "center", gap: 8, alignSelf: "center", marginTop: -2, marginBottom: 2 },
  lessonStageDot: { width: 56, height: 8, borderRadius: 999 },
  lessonStageMetaRow: { flexDirection: "row", flexWrap: "wrap", gap: 10, justifyContent: "center", marginTop: 8, marginBottom: 8 },
  lessonStageMetaChip: { minWidth: 96, paddingHorizontal: 12, paddingVertical: 10, borderRadius: 16, backgroundColor: "#F7FBF8", alignItems: "center" },
  lessonStageMetaLabel: { color: colors.muted, fontSize: 11, fontWeight: "900", textTransform: "uppercase" },
  lessonStageMetaValue: { color: colors.ink, fontSize: 14, fontWeight: "900", marginTop: 4 },
  lessonGuideHeroCard: { padding: 18, borderRadius: 26, borderWidth: 1, gap: 14, backgroundColor: colors.white },
  lessonGuideHeroTop: { flexDirection: "row", alignItems: "center", gap: 14 },
  lessonGuideHeroText: { flex: 1, minWidth: 220 },
  lessonGuideHeroTitle: { textAlign: "left", fontSize: 26, lineHeight: 31 },
  lessonGuideHeroCopy: { textAlign: "left" },
  lessonGuideInfoGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  lessonGuideInfoCard: { flexGrow: 1, minWidth: 220, padding: 14, borderRadius: 18, backgroundColor: "rgba(255,255,255,0.72)" },
  lessonGuideInfoEyebrow: { color: colors.greenDark, fontSize: 11, fontWeight: "900", textTransform: "uppercase" },
  lessonGuideInfoCopy: { color: colors.ink, fontSize: 14, lineHeight: 20, fontWeight: "700", marginTop: 6 },
  storyMomentCard: { padding: 16, borderRadius: 20, backgroundColor: "rgba(255,255,255,0.76)", borderWidth: 1, borderColor: "rgba(24,49,38,0.06)" },
  storyMomentEyebrow: { color: colors.greenDark, fontSize: 11, fontWeight: "900", textTransform: "uppercase" },
  storyMomentCopy: { color: colors.ink, fontSize: 14, lineHeight: 21, fontWeight: "700", marginTop: 6 },
  watchReadCard: { flexDirection: "row", alignItems: "center", gap: 12, padding: 16, borderRadius: 20, borderWidth: 1, backgroundColor: "#FFFFFF" },
  watchReadText: { flex: 1 },
  watchReadEyebrow: { color: colors.greenDark, fontSize: 11, fontWeight: "900", textTransform: "uppercase" },
  watchReadTitle: { color: colors.ink, fontSize: 16, fontWeight: "900", marginTop: 4 },
  watchReadCopy: { color: colors.muted, fontSize: 13, lineHeight: 18, fontWeight: "700", marginTop: 5 },
  watchReadButton: { minWidth: 78, minHeight: 42, paddingHorizontal: 12, borderRadius: 14, alignItems: "center", justifyContent: "center" },
  watchReadButtonText: { color: colors.white, fontSize: 13, fontWeight: "900" },
  lessonMomentStack: { gap: 12 },
  teachingMomentCard: { padding: 16, borderRadius: 22, borderWidth: 1, gap: 10 },
  teachingMomentTop: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 10, flexWrap: "wrap" },
  teachingMomentEyebrow: { fontSize: 11, fontWeight: "900", textTransform: "uppercase" },
  teachingMomentKindPill: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 999 },
  teachingMomentKindText: { fontSize: 11, fontWeight: "900" },
  teachingMomentTitle: { color: colors.ink, fontSize: 19, lineHeight: 24, fontWeight: "900" },
  teachingMomentBody: { color: colors.ink, fontSize: 14, lineHeight: 20, fontWeight: "700" },
  teachingMomentActionRow: { flexDirection: "row", flexWrap: "wrap", gap: 10, marginTop: 2 },
  teachingMomentActionButton: { minHeight: 42, paddingHorizontal: 14, borderRadius: 14, alignItems: "center", justifyContent: "center" },
  teachingMomentActionText: { fontSize: 13, fontWeight: "900" },
  teachingMomentGhostButton: { minHeight: 42, paddingHorizontal: 14, borderRadius: 14, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: colors.line, backgroundColor: "#FFFFFF" },
  teachingMomentGhostText: { color: colors.ink, fontSize: 13, fontWeight: "900" },
  teachingMomentRevealCard: { padding: 14, borderRadius: 16, backgroundColor: "rgba(255,255,255,0.82)", borderWidth: 1, borderColor: "rgba(24,49,38,0.06)" },
  teachingMomentRevealText: { color: colors.ink, fontSize: 14, lineHeight: 20, fontWeight: "700" },
  practiceCard: { padding: 16, borderRadius: 22, borderWidth: 1, borderColor: "#DCE9E1", backgroundColor: "#FFFFFF", gap: 10 },
  practiceCardGood: { borderColor: "#A2D7B7", backgroundColor: "#F3FCF6" },
  practiceCardBad: { borderColor: "#F5C7C0", backgroundColor: "#FFF8F7" },
  practiceCardTop: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 10, flexWrap: "wrap" },
  practiceCardEyebrow: { color: colors.greenDark, fontSize: 11, fontWeight: "900", textTransform: "uppercase" },
  practiceKindPill: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 999 },
  practiceKindText: { fontSize: 11, fontWeight: "900" },
  practiceCardTitle: { color: colors.ink, fontSize: 18, fontWeight: "900" },
  practiceCardPrompt: { color: colors.ink, fontSize: 14, lineHeight: 20, fontWeight: "800" },
  practiceCardInstructions: { color: colors.muted, fontSize: 13, lineHeight: 18, fontWeight: "700" },
  sequencePreviewCard: { padding: 14, borderRadius: 18, backgroundColor: "#F7FBF8", gap: 8 },
  sequencePreviewLabel: { color: colors.greenDark, fontSize: 11, fontWeight: "900", textTransform: "uppercase" },
  sequencePreviewHint: { color: colors.muted, fontSize: 13, lineHeight: 18, fontWeight: "700" },
  sequenceChosenRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  sequenceChosenChip: { flexDirection: "row", alignItems: "center", gap: 6, paddingHorizontal: 10, paddingVertical: 8, borderRadius: 999, borderWidth: 1 },
  sequenceChosenCount: { color: colors.greenDark, fontSize: 11, fontWeight: "900" },
  sequenceChosenText: { color: colors.ink, fontSize: 12, fontWeight: "800" },
  practiceOptionsWrap: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  practiceOptionButton: { minHeight: 48, paddingHorizontal: 14, borderRadius: 16, borderWidth: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#FFFFFF" },
  practiceOptionText: { color: colors.ink, fontSize: 13, lineHeight: 18, fontWeight: "800" },
  practiceActionRow: { flexDirection: "row", flexWrap: "wrap", gap: 10, marginTop: 4 },
  practiceResetButton: { minHeight: 42, paddingHorizontal: 14, borderRadius: 14, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: colors.line, backgroundColor: "#FFFFFF" },
  practiceResetText: { color: colors.ink, fontSize: 13, fontWeight: "900" },
  practiceCheckButton: { minHeight: 42, paddingHorizontal: 16, borderRadius: 14, alignItems: "center", justifyContent: "center" },
  practiceCheckText: { color: colors.white, fontSize: 13, fontWeight: "900" },
  practiceFeedbackCard: { padding: 14, borderRadius: 18, borderWidth: 1 },
  practiceFeedbackGood: { borderColor: "#B8E2C8", backgroundColor: "#EDF9F1" },
  practiceFeedbackBad: { borderColor: "#F2C7C1", backgroundColor: "#FFF3F1" },
  practiceFeedbackTitle: { fontSize: 14, fontWeight: "900" },
  practiceFeedbackCopy: { color: colors.ink, fontSize: 13, lineHeight: 19, fontWeight: "700", marginTop: 6 },
  lessonStartButton: { marginTop: 4 },
  lessonStartHint: { color: colors.muted, fontSize: 12, lineHeight: 17, fontWeight: "700", textAlign: "center", marginTop: -4 },
  lessonStageCounter: { color: colors.greenDark, fontSize: 13, fontWeight: "900" },
  feedbackStageCard: { flex: 1, alignItems: "center", justifyContent: "center", gap: 14, padding: 26, borderRadius: 24 },
  feedbackCopyLarge: { color: colors.ink, fontSize: 16, lineHeight: 23, fontWeight: "700", textAlign: "center", maxWidth: 540 },
  feedbackHintText: { color: colors.muted, fontSize: 13, lineHeight: 18, fontWeight: "700", textAlign: "center", maxWidth: 460 },
  feedbackRewardStrip: { flexDirection: "row", alignItems: "center", gap: 8, paddingHorizontal: 12, paddingVertical: 10, borderRadius: 999, backgroundColor: "rgba(255,255,255,0.74)" },
  feedbackRewardText: { color: colors.ink, fontSize: 13, lineHeight: 18, fontWeight: "800" },
  answerPickedCard: { width: "100%", maxWidth: 420, padding: 16, borderRadius: 18, backgroundColor: "rgba(255,255,255,0.72)" },
  answerPickedEyebrow: { color: colors.muted, fontSize: 11, fontWeight: "900", textTransform: "uppercase" },
  answerPickedValue: { color: colors.ink, fontSize: 17, fontWeight: "900", marginTop: 4 },
  lessonTeachContent: { padding: 18, paddingBottom: 128, gap: 14 },
  lessonTeachCard: { padding: 18, borderRadius: 24, borderWidth: 1, borderColor: colors.line, backgroundColor: colors.white, gap: 12 },
  lessonTeachStageCard: { padding: 20, borderRadius: 24, borderWidth: 1, backgroundColor: colors.white, gap: 14, alignItems: "center" },
  lessonTeachEyebrow: { color: colors.greenDark, fontSize: 12, fontWeight: "900", textTransform: "uppercase" },
  lessonTeachTitle: { color: colors.ink, fontSize: 26, fontWeight: "900" },
  lessonTeachCopy: { color: colors.ink, fontSize: 15, lineHeight: 22, fontWeight: "700" },
  lessonTeachSupportCard: { padding: 14, borderRadius: 18, backgroundColor: "#F7FBF8" },
  lessonTeachSupportCopy: { color: colors.ink, fontSize: 14, lineHeight: 20, fontWeight: "700" },
  lessonTeachSupportHint: { color: colors.muted, fontSize: 12, lineHeight: 18, fontWeight: "800", marginTop: 6 },
  lessonLightLinkCard: { width: "100%", padding: 14, borderRadius: 18, borderWidth: 1, backgroundColor: "#FFFFFF" },
  lessonLightLinkEyebrow: { color: colors.greenDark, fontSize: 11, fontWeight: "900", textTransform: "uppercase" },
  lessonLightLinkTitle: { color: colors.ink, fontSize: 15, fontWeight: "900", marginTop: 5 },
  lessonFlowPrimaryButton: { width: "100%", marginTop: 2 },
  lessonHelpCard: { padding: 18, borderRadius: 24, borderWidth: 1, gap: 12 },
  lessonHelpButtonRow: { flexDirection: "row", gap: 10, marginTop: 4 },
  lessonCompleteCard: { flex: 1, alignItems: "center", justifyContent: "center", padding: 26, borderRadius: 24, borderWidth: 1, borderColor: colors.line, backgroundColor: colors.white, overflow: "hidden" },
  lessonCompleteTitle: { color: colors.ink, fontSize: 28, fontWeight: "900", marginTop: 8, textAlign: "center" },
  lessonCompleteCopy: { color: colors.muted, fontSize: 15, lineHeight: 21, fontWeight: "700", textAlign: "center", marginTop: 6, maxWidth: 520 },
  nextLessonCard: { width: "100%", maxWidth: 420, padding: 16, borderRadius: 18, backgroundColor: "#F7FBF8", marginBottom: 16 },
  nextLessonTitle: { color: colors.ink, fontSize: 18, fontWeight: "900", marginTop: 4 },
  lessonCompleteButtonRow: { width: "100%", flexDirection: "row", gap: 10, marginTop: 4 },
  reviewHeroCard: { padding: 20, borderRadius: 24, backgroundColor: "#EAF8F0", borderWidth: 1, borderColor: "#CDEBD8" },
  reviewHeroEyebrow: { color: colors.greenDark, fontSize: 11, fontWeight: "900", textTransform: "uppercase" },
  reviewHeroTitle: { color: colors.ink, fontSize: 24, fontWeight: "900", marginTop: 6 },
  reviewHeroCopy: { color: colors.muted, fontSize: 14, lineHeight: 20, fontWeight: "700", marginTop: 6 },
  reviewListCard: { padding: 18, borderRadius: 22, borderWidth: 1, borderColor: colors.line, backgroundColor: colors.white, gap: 10 },
  reviewListItem: { paddingVertical: 8, borderTopWidth: 1, borderTopColor: "#EEF3EF" },
  reviewListTitle: { color: colors.ink, fontSize: 15, fontWeight: "900" },
  reviewListCopy: { color: colors.muted, fontSize: 13, lineHeight: 18, fontWeight: "700" },
  reviewActionButton: { padding: 14, borderRadius: 18, backgroundColor: "#F7FBF8", borderWidth: 1, borderColor: "#E4EEE8" },
  reviewActionButtonTitle: { color: colors.ink, fontSize: 15, fontWeight: "900" },
  reviewActionButtonCopy: { color: colors.muted, fontSize: 12, lineHeight: 18, fontWeight: "700", marginTop: 4 },
  profileHeroCard: { alignItems: "center", padding: 22, borderRadius: 24, borderWidth: 1, borderColor: colors.line, backgroundColor: colors.white },
  profileAvatar: { width: 80, height: 80, borderRadius: 40, alignItems: "center", justifyContent: "center", backgroundColor: colors.green },
  profileAvatarText: { color: colors.white, fontSize: 24, fontWeight: "900" },
  profileHeroTitle: { color: colors.ink, fontSize: 24, fontWeight: "900", marginTop: 10 },
  profileHeroCopy: { color: colors.muted, fontSize: 14, fontWeight: "700", marginTop: 4 },
  profileStatsRow: { flexDirection: "row", flexWrap: "wrap", justifyContent: "center", gap: 10, marginTop: 16 },
  profileActionStack: { gap: 12 },
  profileActionCard: { padding: 18, borderRadius: 20, borderWidth: 1, borderColor: colors.line, backgroundColor: colors.white },
  profileActionTitle: { color: colors.ink, fontSize: 16, fontWeight: "900" },
  profileActionCopy: { color: colors.muted, fontSize: 13, lineHeight: 18, fontWeight: "700", marginTop: 5 },
  adBanner: { position: "absolute", left: 12, right: 12, bottom: 10, minHeight: 56, borderRadius: 8, paddingHorizontal: 14, paddingVertical: 10, borderWidth: 1, borderColor: colors.line, backgroundColor: colors.white },
  adLabel: { color: colors.sky, fontSize: 12, fontWeight: "900", textTransform: "uppercase", letterSpacing: 0 },
  adCopy: { color: colors.muted, fontSize: 13, lineHeight: 18, fontWeight: "700", letterSpacing: 0, marginTop: 2 }
});
