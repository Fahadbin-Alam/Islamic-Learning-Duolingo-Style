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
import { sandboxMonetizationClient } from "./services/monetization";
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
import { playGameSound } from "./services/gameAudio";
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
  LessonSource,
  LessonSession,
  ReminderPreferences,
  SocialConnection,
  SocialHubState,
  SocialRelation,
  ShopItem,
  SupportedLanguage,
  TopicId,
  UserProfile,
  XpSummary
} from "./types";

type Screen = "path" | "lesson" | "assessment" | "shop" | "social";
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

interface AppState {
  screen: Screen;
  selectedTopic: TopicId;
  selectedBranchId?: string;
  user?: UserProfile;
  xpSummary: XpSummary[];
  activeSession?: LessonSession;
  challengeIndex: number;
  selectedChoiceId?: string;
  answerState: AnswerState;
  sessionCorrectCount: number;
  sessionMissedLessonIds: string[];
  loading: boolean;
}

type Action =
  | { type: "loaded"; user: UserProfile; xpSummary: XpSummary[] }
  | { type: "select_topic"; topicId: TopicId }
  | { type: "select_branch"; branchId: string }
  | { type: "open_assessment" }
  | { type: "close_assessment" }
  | { type: "open_shop" }
  | { type: "open_social" }
  | { type: "close_shop" }
  | { type: "close_social" }
  | { type: "start_lesson"; session: LessonSession }
  | { type: "select_choice"; choiceId: string }
  | { type: "answer"; correct: boolean; user: UserProfile; missedLessonId?: string }
  | { type: "next_challenge" }
  | { type: "finish_lesson"; user: UserProfile; xpSummary: XpSummary[] }
  | { type: "apply_user"; user: UserProfile }
  | { type: "reset_lesson" };

const initialState: AppState = {
  screen: "path",
  selectedTopic: "foundation",
  xpSummary: [],
  challengeIndex: 0,
  answerState: undefined,
  sessionCorrectCount: 0,
  sessionMissedLessonIds: [],
  loading: true
};

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "loaded":
      return { ...state, user: action.user, xpSummary: action.xpSummary, loading: false };
    case "select_topic":
      return { ...state, selectedTopic: action.topicId, selectedBranchId: undefined, screen: "path" };
    case "select_branch":
      return { ...state, selectedBranchId: action.branchId, screen: "path" };
    case "open_assessment":
      return { ...state, screen: "assessment" };
    case "close_assessment":
      return { ...state, screen: "path" };
    case "open_shop":
      return { ...state, screen: "shop" };
    case "open_social":
      return { ...state, screen: "social" };
    case "close_shop":
      return { ...state, screen: "path" };
    case "close_social":
      return { ...state, screen: "path" };
    case "start_lesson":
      return {
        ...state,
        screen: "lesson",
        activeSession: action.session,
        challengeIndex: 0,
        selectedChoiceId: undefined,
        answerState: undefined,
        sessionCorrectCount: 0,
        sessionMissedLessonIds: []
      };
    case "select_choice":
      return { ...state, selectedChoiceId: action.choiceId };
    case "answer":
      return {
        ...state,
        user: action.user,
        answerState: action.correct ? "correct" : "wrong",
        sessionCorrectCount: action.correct ? state.sessionCorrectCount + 1 : state.sessionCorrectCount,
        sessionMissedLessonIds: action.correct || !action.missedLessonId || state.sessionMissedLessonIds.includes(action.missedLessonId)
          ? state.sessionMissedLessonIds
          : [...state.sessionMissedLessonIds, action.missedLessonId]
      };
    case "next_challenge":
      return {
        ...state,
        challengeIndex: state.challengeIndex + 1,
        selectedChoiceId: undefined,
        answerState: undefined
      };
    case "finish_lesson":
      return {
        ...state,
        screen: "path",
        user: action.user,
        xpSummary: action.xpSummary,
        activeSession: undefined,
        challengeIndex: 0,
        selectedChoiceId: undefined,
        answerState: undefined,
        sessionCorrectCount: 0,
        sessionMissedLessonIds: []
      };
    case "apply_user":
      return { ...state, user: action.user };
    case "reset_lesson":
      return {
        ...state,
        screen: "path",
        activeSession: undefined,
        challengeIndex: 0,
        selectedChoiceId: undefined,
        answerState: undefined,
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
  const [celebration, setCelebration] = useState<LessonCelebration | undefined>(undefined);
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

  const isInFoundationExperience =
    (state.screen === "path" && selectedSection.topicId === "foundation") ||
    (state.screen === "lesson" && currentLessonSection.topicId === "foundation");
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
    setActiveAssessment((current) => current ? { ...current, selectedAnswer: value } : current);
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

  function skipFoundationAssessment() {
    if (!state.user) {
      return;
    }

    dispatch({
      type: "apply_user",
      user: withExperienceDefaults({
        ...state.user,
        foundationAssessmentSkipped: true
      })
    });
  }

  function exploreTopicsFreely() {
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
      playGameSound("soft_ui", { enabled: true, reduced: Boolean(nextUser.reducedSoundEffects) });
    }
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

    playGameSound("node_tap", soundPreferences);
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

    playGameSound("node_tap", soundPreferences);
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
    const nextUser = withExperienceDefaults({
      ...heartAdjustedUser,
      learnerProfile: nextProfile,
      lastLearningAt: new Date().toISOString()
    });

    playGameSound(correct ? "correct" : "wrong", soundPreferences);
    if (!correct && shouldOfferReviewHeartRestore(nextUser)) {
      setReviewRestoreVisible(true);
    }
    dispatch({
      type: "answer",
      correct,
      user: nextUser,
      missedLessonId: correct ? undefined : challenge.sourceLessonId ?? state.activeSession.lesson.id
    });
  }

  async function continueLesson() {
    if (!state.user || !state.activeSession) {
      return;
    }

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

      playGameSound("lesson_complete", soundPreferences);
      playGameSound("unlock", soundPreferences);
      setCelebration({
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

    playGameSound("lesson_complete", soundPreferences);
    playGameSound("xp", soundPreferences);
    if (unlockedNode) {
      playGameSound("unlock", soundPreferences);
    }
    if (nextUser.streakDays > 0 && nextUser.streakDays % 7 === 0) {
      playGameSound("streak", soundPreferences);
    }

    setCelebration({
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

    playGameSound("reward_chest", soundPreferences);
    setCelebration({
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

    if (item.type === "rewarded_ad") {
      const reward = await sandboxMonetizationClient.showRewardedHeartAd(item);

      if (reward.ok) {
        dispatch({ type: "apply_user", user: grantHearts(state.user, reward.heartsGranted, true) });
      }

      return;
    }

    const purchase = await sandboxMonetizationClient.purchaseShopItem(item);

    if (purchase.ok) {
      dispatch({ type: "apply_user", user: applyShopItem(state.user, item) });
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
      openSettingsModal();
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

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.appShell}>
        <TopBar
          user={state.user}
          strings={strings}
          languageCode={getLanguageOption(currentLanguage).code}
          dailyProgress={Math.min(1, state.user.totalXp / Math.max(1, state.user.dailyGoalXp))}
          soundEnabled={state.user.soundEffectsEnabled !== false}
          onAccount={() => openAccountPanel()}
          onLanguage={() => {
            setPendingLanguage(currentLanguage);
            setLanguageModalVisible(true);
          }}
          onSocial={() => dispatch({ type: "open_social" })}
          onShop={() => dispatch({ type: "open_shop" })}
          onToggleSound={toggleSoundEffects}
        />
        {state.screen === "path" && (
          <PathScreen
            user={state.user}
            learnerProfile={learnerProfile}
            strings={strings}
            language={currentLanguage}
            xpSummary={state.xpSummary[0]}
            section={selectedSection}
            sections={localizedSections}
            branch={selectedBranch}
            branches={selectedSection.branches}
            nodes={selectedNodes}
            selectedTopic={state.selectedTopic}
            onSelectTopic={(topicId) => dispatch({ type: "select_topic", topicId })}
            onSelectBranch={(branchId) => dispatch({ type: "select_branch", branchId })}
            onStartLesson={startLesson}
            onStartTestOut={startBranchTestOut}
            onStartPlacement={() => openFoundationAssessment("placement")}
            onStartReview={() => openFoundationAssessment("review")}
            onStartDailyChallenge={() => openFoundationAssessment("daily_challenge")}
            onSkipFoundation={skipFoundationAssessment}
            onExploreTopics={exploreTopicsFreely}
            onOpenShop={() => dispatch({ type: "open_shop" })}
            onClaimReward={claimJourneyReward}
          />
        )}
        {state.screen === "lesson" && currentLessonSession && (
          <LessonScreen
            strings={strings}
            language={currentLanguage}
            section={currentLessonSection}
            session={currentLessonSession}
            challengeIndex={state.challengeIndex}
            selectedChoiceId={state.selectedChoiceId}
            answerState={state.answerState}
            onSelectChoice={(choiceId) => dispatch({ type: "select_choice", choiceId })}
            onAnswer={answerChallenge}
            onContinue={continueLesson}
            onSkip={() => dispatch({ type: "reset_lesson" })}
            onExit={() => dispatch({ type: "reset_lesson" })}
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
        {state.screen === "shop" && (
          <ShopScreen
            user={state.user}
            strings={strings}
            items={SHOP_ITEMS}
            section={selectedSection}
            onUseItem={useShopItem}
            onDone={() => dispatch({ type: "close_shop" })}
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
            onDone={() => dispatch({ type: "close_social" })}
          />
        )}
        <AdBanner hidden={state.user.hearts.unlimited || state.screen === "lesson"} />
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
          visible={Boolean(celebration)}
          celebration={celebration}
          onClose={() => setCelebration(undefined)}
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

function TopBar({
  user,
  strings,
  languageCode,
  dailyProgress,
  soundEnabled,
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
          <Text style={styles.topBarBrandCopy}>Keep your streak glowing and tap the next lesson fast.</Text>
        </View>
      </View>

      <View style={styles.topBarMetricRow}>
        <TopMetricPill label={strings.streak} value={`${user.streakDays}d`} tint="#FFF3CF" valueColor="#A66C00" />
        <TopMetricPill label="XP" value={`${user.totalXp}`} tint="#DFF5FF" valueColor="#126A99" />
        <TopMetricPill label="Gems" value={`${user.gems}`} tint="#F0E7FF" valueColor="#6C3BC6" />
        <TopMetricPill label={strings.hearts} value={formatHearts(user, true)} tint="#FFE4E0" valueColor="#BC4336" />
      </View>

      <View style={styles.topBarActionRow}>
        <View style={styles.dailyQuestCard}>
          <View style={styles.dailyQuestHeader}>
            <Text style={styles.metricLabel}>Daily quest</Text>
            <Text style={styles.metricValue}>{Math.round(dailyProgress * 100)}%</Text>
          </View>
          <AnimatedProgressBar progress={dailyProgress} color={colors.gold} trackColor="rgba(23, 49, 35, 0.08)" height={10} />
        </View>

        <Pressable onPress={onToggleSound} style={[styles.soundButton, !soundEnabled && styles.soundButtonMuted]}>
          <Text style={styles.metricLabel}>Sound</Text>
          <Text style={styles.soundButtonValue}>{soundEnabled ? "SFX on" : "Muted"}</Text>
        </Pressable>

        <Pressable onPress={onLanguage} style={styles.languageButtonSmall}>
          <Text style={styles.metricLabel}>{strings.language}</Text>
          <Text style={styles.socialButtonSmallValue}>{languageCode}</Text>
        </Pressable>
        <Pressable onPress={onSocial} style={styles.socialButtonSmall}>
          <Text style={styles.metricLabel}>{strings.crew}</Text>
          <Text style={styles.socialButtonSmallValue}>{strings.battle}</Text>
        </Pressable>
        <Pressable onPress={onShop} style={styles.heartButton}>
          <Text style={styles.metricLabel}>{strings.hearts}</Text>
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
      duration: 420,
      easing: Easing.out(Easing.cubic),
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

      <View style={styles.routeCard}>
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

        <View style={styles.branchSummaryCard}>
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
          <View style={[styles.pathBackdrop, { backgroundColor: lightenColor(section.accentColor, 0.95) }]} />
          {nodes.map((node, index) => (
            <View key={node.id}>
              <PathNode
                node={node}
                index={index}
                isLast={index === nodes.length - 1}
                accentColor={section.accentColor}
                reviewNeeded={topicNeedsReview && node.kind === "review"}
                onPress={() => onStartLesson(node)}
              />
              {journeyRewards
                .filter((reward) => reward.id.endsWith(`_${index}`))
                .map((reward) => (
                  <RewardChestStop key={reward.id} reward={reward} accentColor={section.accentColor} onPress={() => onClaimReward(reward)} />
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

function PathNode({
  node,
  index,
  isLast,
  accentColor,
  reviewNeeded,
  onPress
}: {
  node: LearningNodeView;
  index: number;
  isLast: boolean;
  accentColor: string;
  reviewNeeded: boolean;
  onPress: () => void;
}) {
  const alignments = [styles.nodeLeft, styles.nodeCenter, styles.nodeRight];
  const visual = getNodeVisual(node.id, node.status, accentColor);
  const pulse = useRef(new Animated.Value(node.status === "current" ? 1 : 0)).current;
  const scale = useRef(new Animated.Value(1)).current;
  const stateInfo = describeNodeState(node, reviewNeeded);

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
          duration: 900,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: false
        }),
        Animated.timing(pulse, {
          toValue: 0.2,
          duration: 900,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: false
        })
      ])
    );

    animation.start();

    return () => {
      animation.stop();
    };
  }, [node.status, pulse]);

  return (
    <View style={[styles.nodeWrap, alignments[index % alignments.length]]}>
      <View style={styles.nodeRail}>
        <Animated.View
          style={[
            styles.nodePulseHalo,
            {
              backgroundColor: lightenColor(accentColor, 0.78),
              opacity: pulse.interpolate({ inputRange: [0, 1], outputRange: [0, 0.32] }),
              transform: [
                {
                  scale: pulse.interpolate({ inputRange: [0, 1], outputRange: [1, 1.22] })
                }
              ]
            }
          ]}
        />
        <Animated.View style={{ transform: [{ scale }] }}>
          <Pressable
            onPress={onPress}
            disabled={node.status === "locked"}
            onHoverIn={() => {
              Animated.spring(scale, { toValue: 1.06, useNativeDriver: true, speed: 20, bounciness: 10 }).start();
            }}
            onHoverOut={() => {
              Animated.spring(scale, { toValue: 1, useNativeDriver: true, speed: 20, bounciness: 8 }).start();
            }}
            onPressIn={() => {
              Animated.spring(scale, { toValue: 0.97, useNativeDriver: true, speed: 26, bounciness: 6 }).start();
            }}
            onPressOut={() => {
              Animated.spring(scale, { toValue: 1.04, useNativeDriver: true, speed: 20, bounciness: 10 }).start(() => {
                Animated.spring(scale, { toValue: 1, useNativeDriver: true, speed: 20, bounciness: 8 }).start();
              });
            }}
            style={[
              styles.nodeCircle,
              node.status === "completed" && { backgroundColor: visual.outerColor, borderColor: darkenColor(visual.outerColor) },
              node.status === "current" && [styles.nodeCurrent, { backgroundColor: visual.outerColor, borderColor: darkenColor(visual.outerColor) }],
              node.status === "available" && { backgroundColor: visual.outerColor, borderColor: darkenColor(visual.outerColor) },
              node.status === "locked" && styles.nodeLocked
            ]}
          >
            <View style={styles.nodeGloss} />
            <View style={[styles.nodeInnerOrb, { backgroundColor: node.status === "locked" ? "#F1F4F3" : visual.innerColor }]}>
              <NodeGlyph
                kind={stateInfo.legendary ? "book_seal" : visual.glyph}
                coverColor={node.status === "locked" ? "#B6C2BC" : darkenColor(visual.outerColor)}
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
            <View style={styles.nodeStarsBadge}>
              <View style={styles.nodeStarsBadgeInner}>
                <SparkleIcon size={10} color="#F0B90B" />
                <Text style={styles.nodeStarsText}>{`${node.starsReward}`}</Text>
              </View>
            </View>
          </Pressable>
        </Animated.View>
        {!isLast && (
          <View style={styles.nodeConnectorWrap}>
            <View style={[styles.nodeConnector, { backgroundColor: accentColor }]} />
            <View style={[styles.nodeConnectorGlow, { backgroundColor: lightenColor(accentColor, 0.86) }]} />
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
  onPress
}: {
  reward: JourneyRewardStop;
  accentColor: string;
  onPress: () => void;
}) {
  const scale = useRef(new Animated.Value(1)).current;

  return (
    <View style={styles.rewardStopWrap}>
      <Animated.View style={{ transform: [{ scale }] }}>
        <Pressable
          onPress={onPress}
          onHoverIn={() => Animated.spring(scale, { toValue: 1.04, useNativeDriver: true, speed: 20, bounciness: 8 }).start()}
          onHoverOut={() => Animated.spring(scale, { toValue: 1, useNativeDriver: true, speed: 20, bounciness: 6 }).start()}
          style={[
            styles.rewardStopCard,
            reward.unlocked && { borderColor: accentColor, backgroundColor: lightenColor(accentColor, 0.93) },
            reward.claimed && styles.rewardStopCardClaimed
          ]}
        >
          <View style={[styles.rewardStopChest, reward.unlocked && { backgroundColor: accentColor }]}>
            <View style={styles.rewardStopChestLid} />
            <SparkleIcon size={14} color={reward.unlocked ? "#FFE38C" : "#B8C2BD"} />
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
        duration: 220,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true
      }),
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true,
        speed: 18,
        bounciness: 10
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
  language
}: {
  sources: LessonSource[];
  accentColor: string;
  strings: UiStrings;
  language: SupportedLanguage;
}) {
  return (
    <View style={styles.sourcesBlock}>
      <Text style={styles.sourcesTitle}>{strings.sourceNotes}</Text>
      {sources.map((source) => (
        <Pressable key={source.id} onPress={() => Linking.openURL(source.url)} style={[styles.sourceCard, { borderColor: accentColor }]}>
          <View style={styles.sourceHeader}>
            <Text style={[styles.sourceBadge, { backgroundColor: lightenColor(accentColor, 0.88) }]}>{source.site}</Text>
            <Text style={styles.sourceCategory}>{formatSourceCategory(source.category, language)}</Text>
          </View>
          <Text style={styles.sourceTitle}>{source.title}</Text>
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
          <Text style={styles.sourceCopy}>{source.summary}</Text>
          <Text style={styles.sourceLink}>{strings.openSource}</Text>
        </Pressable>
      ))}
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
          <View style={styles.socialStack}>
            <Pressable onPress={() => onSocialLogin("google")} style={[styles.socialButton, styles.googleButton]}>
              <Text style={styles.socialButtonBrand}>G</Text>
              <Text style={styles.socialButtonText}>{SOCIAL_AUTH_CONFIG.google.label}</Text>
            </Pressable>
            <Pressable onPress={() => onSocialLogin("facebook")} style={[styles.socialButton, styles.facebookButton]}>
              <Text style={styles.socialButtonBrand}>f</Text>
              <Text style={styles.socialButtonText}>{SOCIAL_AUTH_CONFIG.facebook.label}</Text>
            </Pressable>
          </View>
          <Text style={styles.modalHint}>
            {hasSavedAccount
              ? strings.savedAccountHint
              : strings.socialHint}
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

function defaultSourceFrom(source: LessonSource) {
  if (source.site === "Quran.com") {
    return "The Quran and tafsir on Quran.com";
  }

  if (source.site === "YouTube") {
    return "YouTube video guide";
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
        : "Video";

  return translateStudyText(label, language).toUpperCase();
}

function startCaseRelation(relation: SocialRelation) {
  return relation === "parent" ? "Parent" : "Friend";
}

function startCaseAccountRole(role: AccountRole) {
  return role === "parent" ? "Parent" : "Child";
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

const colors = {
  bg: "#F4F9F6",
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
  topBar: { flexDirection: "row", flexWrap: "wrap", alignItems: "center", gap: 12, paddingHorizontal: 18, paddingVertical: 14, backgroundColor: "#FDFEFC", borderBottomWidth: 1, borderBottomColor: "#E3ECE6", shadowColor: "rgba(17,49,35,0.08)", shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.12, shadowRadius: 16, elevation: 3 },
  topBarBrand: { minWidth: 250, flexDirection: "row", alignItems: "center", gap: 12, flex: 1 },
  topBarBrandText: { flexShrink: 1 },
  topBarBrandTitle: { color: colors.ink, fontSize: 20, fontWeight: "900", letterSpacing: 0 },
  topBarBrandCopy: { color: colors.muted, fontSize: 12, lineHeight: 17, fontWeight: "700", marginTop: 2 },
  miniGuideWrap: { width: 52, height: 52, borderRadius: 16, overflow: "hidden", backgroundColor: colors.mint, borderWidth: 1, borderColor: "#BEE7CF" },
  topMetric: { minWidth: 50 },
  topBarMetricRow: { flexDirection: "row", flexWrap: "wrap", alignItems: "center", gap: 10 },
  topMetricPill: { minWidth: 82, paddingHorizontal: 12, paddingVertical: 10, borderRadius: 16, borderWidth: 1, borderColor: "rgba(27,52,39,0.06)" },
  topBarActionRow: { flexDirection: "row", flexWrap: "wrap", alignItems: "center", justifyContent: "flex-end", gap: 10, flex: 1 },
  metricLabel: { color: colors.muted, fontSize: 12, fontWeight: "700", letterSpacing: 0 },
  metricValue: { color: colors.ink, fontSize: 15, fontWeight: "800", letterSpacing: 0 },
  dailyQuestCard: { minWidth: 148, paddingHorizontal: 12, paddingVertical: 10, borderRadius: 16, borderWidth: 1, borderColor: "#F2E1A3", backgroundColor: "#FFF8DB" },
  dailyQuestHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 8 },
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
  routeCard: { alignSelf: "center", width: "100%", maxWidth: 920, borderRadius: 28, padding: 20, borderWidth: 1, borderColor: colors.line, backgroundColor: colors.white, shadowColor: "rgba(16,47,32,0.1)", shadowOffset: { width: 0, height: 14 }, shadowOpacity: 0.12, shadowRadius: 24, elevation: 3 },
  routeHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 18, marginBottom: 14, flexWrap: "wrap" },
  routeHeaderText: { flex: 1, minWidth: 260 },
  routeHeaderAside: { alignItems: "flex-end", gap: 10 },
  routeBadge: { color: colors.greenDark, fontSize: 12, fontWeight: "900", textTransform: "uppercase", letterSpacing: 0 },
  routeTitle: { color: colors.ink, fontSize: 24, lineHeight: 30, fontWeight: "900", letterSpacing: 0, marginTop: 4 },
  routeDescription: { color: colors.muted, fontSize: 14, lineHeight: 20, fontWeight: "600", letterSpacing: 0, marginTop: 4, maxWidth: 420 },
  branchSummaryCard: { marginTop: 4, marginBottom: 16, padding: 16, borderRadius: 22, borderWidth: 1, borderColor: colors.line, backgroundColor: "#F8FBF8", gap: 10 },
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
  pathLane: { width: "100%", maxWidth: 620, minHeight: 200, alignSelf: "center", marginTop: 10, paddingVertical: 10, position: "relative" },
  pathBackdrop: { position: "absolute", left: "50%", marginLeft: -7, top: 6, bottom: 6, width: 14, borderRadius: 999, opacity: 0.8 },
  nodeWrap: { width: "100%", marginVertical: 10 },
  nodeRail: { alignItems: "center" },
  nodeLeft: { alignItems: "flex-start" },
  nodeCenter: { alignItems: "center" },
  nodeRight: { alignItems: "flex-end" },
  nodePulseHalo: { position: "absolute", width: 116, height: 116, borderRadius: 58, top: -10, left: "50%", marginLeft: -58 },
  nodeCircle: { width: 98, height: 98, borderRadius: 49, alignItems: "center", justifyContent: "center", borderWidth: 5, borderColor: colors.green, backgroundColor: colors.white, position: "relative", shadowColor: "rgba(0,0,0,0.18)", shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.18, shadowRadius: 16, elevation: 5 },
  nodeGloss: { position: "absolute", top: 9, width: 62, height: 20, borderRadius: 999, backgroundColor: "rgba(255,255,255,0.28)" },
  nodeInnerOrb: { width: 66, height: 66, borderRadius: 33, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: "rgba(36,50,69,0.08)" },
  nodeConnectorWrap: { alignItems: "center", marginTop: 8, width: 24 },
  nodeConnector: { width: 8, height: 42, borderRadius: 999, opacity: 0.42 },
  nodeConnectorGlow: { position: "absolute", width: 16, height: 28, borderRadius: 999, top: 7, opacity: 0.42 },
  nodeCurrent: { backgroundColor: colors.gold, borderColor: colors.greenDark },
  nodeAvailable: { backgroundColor: colors.white },
  nodeLocked: { backgroundColor: colors.gray, borderColor: colors.line },
  nodePressed: { transform: [{ scale: 0.97 }] },
  nodeGlyphWrap: { width: 34, height: 34, alignItems: "center", justifyContent: "center" },
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
  nodeStarsBadge: { position: "absolute", bottom: -6, paddingHorizontal: 8, paddingVertical: 2, borderRadius: 999, backgroundColor: colors.white, borderWidth: 1, borderColor: colors.line },
  nodeStarsBadgeInner: { flexDirection: "row", alignItems: "center", gap: 4 },
  nodeStarsText: { color: colors.ink, fontSize: 11, fontWeight: "900", letterSpacing: 0 },
  nodeTextBlock: { width: 190, marginTop: 10, alignItems: "center" },
  nodeTitle: { color: colors.ink, fontSize: 15, fontWeight: "900", textAlign: "center", letterSpacing: 0 },
  nodeStatePill: { marginTop: 8, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 999 },
  nodeStateText: { fontSize: 11, fontWeight: "900", textTransform: "uppercase" },
  nodeMeta: { color: colors.muted, fontSize: 12, fontWeight: "700", textAlign: "center", letterSpacing: 0, marginTop: 4 },
  rewardStopWrap: { alignItems: "center", marginVertical: 8 },
  rewardStopCard: { width: 280, flexDirection: "row", alignItems: "center", gap: 12, padding: 14, borderRadius: 20, borderWidth: 1, borderColor: "#E3ECE6", backgroundColor: "#F6FAF7" },
  rewardStopCardClaimed: { opacity: 0.72 },
  rewardStopChest: { width: 52, height: 44, borderRadius: 14, backgroundColor: "#B8C2BD", alignItems: "center", justifyContent: "center", position: "relative" },
  rewardStopChestLid: { position: "absolute", top: -4, width: 44, height: 12, borderRadius: 10, backgroundColor: "#8D9A93" },
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
  skipLessonButton: { paddingVertical: 8, paddingHorizontal: 10, borderRadius: 8, borderWidth: 1, borderColor: colors.line, backgroundColor: colors.white },
  skipLessonText: { color: colors.muted, fontSize: 13, fontWeight: "800", letterSpacing: 0 },
  lessonProgressTrack: { flex: 1, height: 12, overflow: "hidden", borderRadius: 6, backgroundColor: colors.gray },
  lessonProgressFill: { height: 12 },
  lessonBody: { flex: 1, padding: 20 },
  lessonCoachCard: { flexDirection: "row", alignItems: "center", gap: 12 },
  lessonSpeechBubble: { flex: 1, padding: 14, borderRadius: 8, borderWidth: 1, borderColor: colors.line, backgroundColor: "#F8FBF8" },
  lessonSpeechTitle: { color: colors.ink, fontSize: 15, fontWeight: "900", letterSpacing: 0 },
  lessonSpeechCopy: { color: colors.muted, fontSize: 13, lineHeight: 18, fontWeight: "600", letterSpacing: 0, marginTop: 4 },
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
  sourceTitle: { color: colors.ink, fontSize: 15, fontWeight: "900", letterSpacing: 0, marginTop: 8 },
  sourceMetaStack: { gap: 6, marginTop: 10 },
  sourceMetaRow: { flexDirection: "row", alignItems: "flex-start", gap: 8 },
  sourceMetaLabel: { width: 66, color: colors.muted, fontSize: 11, fontWeight: "900", textTransform: "uppercase", letterSpacing: 0 },
  sourceMetaValue: { flex: 1, color: colors.ink, fontSize: 12, lineHeight: 17, fontWeight: "700", letterSpacing: 0 },
  sourceCopy: { color: colors.muted, fontSize: 13, lineHeight: 18, fontWeight: "600", letterSpacing: 0, marginTop: 6 },
  sourceLink: { color: colors.sky, fontSize: 12, fontWeight: "900", letterSpacing: 0, marginTop: 8 },
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
  celebrationCard: { width: "100%", maxWidth: 420, borderRadius: 24, backgroundColor: colors.white, padding: 22, borderWidth: 1, borderColor: colors.line, shadowColor: "rgba(16,47,32,0.18)", shadowOffset: { width: 0, height: 16 }, shadowOpacity: 0.2, shadowRadius: 28, elevation: 6 },
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
  adBanner: { position: "absolute", left: 12, right: 12, bottom: 10, minHeight: 56, borderRadius: 8, paddingHorizontal: 14, paddingVertical: 10, borderWidth: 1, borderColor: colors.line, backgroundColor: colors.white },
  adLabel: { color: colors.sky, fontSize: 12, fontWeight: "900", textTransform: "uppercase", letterSpacing: 0 },
  adCopy: { color: colors.muted, fontSize: 13, lineHeight: 18, fontWeight: "700", letterSpacing: 0, marginTop: 2 }
});
