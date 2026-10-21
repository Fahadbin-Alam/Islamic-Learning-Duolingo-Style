import React, { useContext, useEffect, useMemo, useReducer, useRef, useState } from "react";
import {
  Linking,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View
} from "react-native";
import { SafeAreaInsetsContext, type EdgeInsets } from "react-native-safe-area-context";
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
  getJumpNodeIds,
  getNodeXp,
  getTestOutPlan,
  getTestOutXp,
  getTotalStars,
  isOutOfHearts,
  isTestLost,
  keepStreak,
  testOutPassingScore,
  grantHearts,
  isPremiumUser,
  learningApi,
  loseHeart,
  pickTestOutChallenges,
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
  acceptCrewRequest,
  declineCrewRequest,
  removeCrewMember,
  syncRemoteUser,
  type CrewMember,
  type CrewPayload
} from "./services/backendSync";
import {
  clearAccountProfile,
  clearActiveAssessment,
  clearPracticeResult,
  clearSavedUserProfile,
  loadActiveAssessment,
  loadPracticeResult,
  loadSavedUserProfile,
  saveActiveAssessment,
  savePracticeResult,
  saveUserProfile,
  stashAccountProfile,
  takeAccountProfile
} from "./services/localProgress";
import { AdBanner } from "./components/AdBanner";
import { monetizationClient } from "./services/monetization";
import {
  adAudienceFor,
  isAgeGroup,
  monetizationMode,
  rewardedGemVideosLeft,
  shouldShowLessonBreakAd,
  type AgeGroup
} from "./services/monetizationConfig";
import { getStoredItem, setStoredItem } from "./services/appStorage";
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
  submitFoundationAssessmentAnswer,
  type FoundationPracticeResult
} from "./services/foundationAssessment";
import { playGameSound, primeGameAudio } from "./services/gameAudio";
import { answerLessonStep, isLastLessonStep, startLessonQueue, type LessonStep } from "./services/lessonQueue";
import * as Speech from "expo-speech";
import { colors, configureUiSound, darken, fonts, Icon, lighten, Mascot, PopIn, radii, space } from "./ui";
import { PortalHost } from "./ui/Portal";
import {
  AccountSheet,
  AppTopBar,
  BottomTabs,
  checkAccountFields,
  ConfirmSheet,
  CrewView,
  AgeSheet,
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
import { ExerciseView, LearnCard, LessonComplete, LessonScreen, OrderGame, QuitSheet, getLessonLine, getLessonProgress, isPlayablePractice, lessonStars, shortWhy } from "./ui/lesson";
import { getBranchArabic, getLessonArabic, getNodeArabic, getTopicArabic, isFirstUseOfWord } from "./data/arabicTerms";
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

// The out-of-hearts sheet: the one free refill, or the shop. `resume` is what the learner was
// starting on the path, played once a free refill lands.
type OutOfHeartsSheet = {
  open: boolean;
  variant: "free" | "shop";
  inLesson: boolean;
  resume?: { kind: "node"; node: LearningNodeView } | { kind: "test_out"; unitId: string; attempt?: number; jumpNodeId?: string };
};

type TestOutResult = {
  open: boolean;
  correct: number;
  /** Questions answered: fewer than `total` when the test ended as soon as it could no longer be passed. */
  asked: number;
  total: number;
  passingScore: number;
  unitId: string;
  /** The try that just ended; TRY AGAIN starts the next one, with other questions. */
  attempt: number;
  /** The JUMP HERE circle the test was for, so TRY AGAIN tests for the same one. */
  jumpNodeId?: string;
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
  /** The questions to ask, in order: the lesson's own, then each miss again, until it is answered right. */
  lessonQueue: LessonStep[];
  /** Position in lessonQueue. */
  stepIndex: number;
  /** The lesson's questions that are done (answered right; in a test, answered): the progress bar. */
  doneCount: number;
  selectedChoiceId?: string;
  answerState: AnswerState;
  /** Right on the first try; a test-out passes on these. */
  sessionCorrectCount: number;
  /**
   * Questions missed on their first try. The STARS card counts them, as a test-out's pass mark does; a
   * missed question asked again costs a heart but is not counted twice.
   */
  sessionMistakes: number;
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
  | { type: "answer"; correct: boolean; user: UserProfile; missedLessonId?: string; scored?: boolean; isTest?: boolean }
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
  lessonQueue: [],
  stepIndex: 0,
  doneCount: 0,
  answerState: undefined,
  sessionCorrectCount: 0,
  sessionMistakes: 0,
  sessionMissedLessonIds: [],
  loading: true
};

// Leaving or finishing a lesson: nothing of it is kept.
const NO_LESSON = {
  activeSession: undefined,
  lessonQueue: [] as LessonStep[],
  stepIndex: 0,
  doneCount: 0,
  selectedChoiceId: undefined,
  answerState: undefined,
  sessionCorrectCount: 0,
  sessionMistakes: 0,
  sessionMissedLessonIds: [] as string[]
};

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "loaded":
      // The topic the learner had open last time, when the course still has it.
      return {
        ...state,
        user: action.user,
        xpSummary: action.xpSummary,
        loading: false,
        selectedTopic: knownTopic(action.user.lastTopicId) ?? state.selectedTopic
      };
    case "go_home":
      return { ...state, screen: "home", returnScreen: undefined };
    case "show_topic":
      return { ...state, screen: "topic", returnScreen: undefined };
    case "show_branch":
      return { ...state, screen: "branch", returnScreen: undefined };
    case "select_topic":
      // Kept on the learner, so the app opens on this topic next time.
      return {
        ...state,
        user: state.user && state.user.lastTopicId !== action.topicId ? { ...state.user, lastTopicId: action.topicId } : state.user,
        selectedTopic: action.topicId,
        selectedBranchId: undefined,
        screen: "topic",
        returnScreen: undefined
      };
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
        ...NO_LESSON,
        activeSession: action.session,
        lessonQueue: startLessonQueue(action.session.lesson.challenges.length)
      };
    case "show_practice_screen":
      return { ...state, screen: "lesson_practice" };
    case "begin_lesson_questions":
      return {
        ...state,
        screen: "lesson_question",
        selectedChoiceId: undefined,
        answerState: undefined
      };
    case "select_choice":
      return { ...state, selectedChoiceId: action.choiceId };
    case "answer":
      {
      const scored = action.scored ?? true;
      // A miss comes back at the end of the lesson until it is right; the bar moves only when a question is done.
      const step = answerLessonStep(state.lessonQueue, state.stepIndex, action.correct, Boolean(action.isTest));
      return {
        ...state,
        user: action.user,
        screen: "lesson_feedback",
        answerState: action.correct ? "correct" : "wrong",
        lessonQueue: step.queue,
        doneCount: step.done ? state.doneCount + 1 : state.doneCount,
        sessionCorrectCount: action.correct && scored ? state.sessionCorrectCount + 1 : state.sessionCorrectCount,
        sessionMistakes: action.correct || !scored ? state.sessionMistakes : state.sessionMistakes + 1,
        sessionMissedLessonIds: action.correct || !scored || !action.missedLessonId || state.sessionMissedLessonIds.includes(action.missedLessonId)
          ? state.sessionMissedLessonIds
          : [...state.sessionMissedLessonIds, action.missedLessonId]
      };
      }
    case "next_challenge":
      return {
        ...state,
        screen: "lesson_question",
        stepIndex: state.stepIndex + 1,
        selectedChoiceId: undefined,
        answerState: undefined
      };
    case "finish_lesson":
      return {
        ...state,
        screen: "lesson_complete",
        user: action.user,
        xpSummary: action.xpSummary,
        selectedChoiceId: undefined,
        answerState: undefined
      };
    case "close_lesson_complete":
      return { ...state, ...NO_LESSON, screen: "branch" };
    case "apply_user":
      return { ...state, user: action.user };
    case "apply_user_latest":
      return state.user ? { ...state, user: action.update(state.user) } : state;
    case "sync_premium":
      return state.user ? { ...state, user: applyPremiumStatus(state.user, action.premium) } : state;
    case "reset_lesson":
      return { ...state, ...NO_LESSON, screen: "branch" };
    default:
      return state;
  }
}

const NO_INSETS: EdgeInsets = { top: 0, right: 0, bottom: 0, left: 0 };

export default function TopicApp() {
  // RN's own SafeAreaView only pads on iOS, so Android drew the top bar under the status bar.
  // These insets clear the status bar, notch and navigation bar on both.
  const insets = useContext(SafeAreaInsetsContext) ?? NO_INSETS;
  const safeArea = [
    styles.safeArea,
    { paddingTop: insets.top, paddingRight: insets.right, paddingBottom: insets.bottom, paddingLeft: insets.left }
  ];
  const [state, dispatch] = useReducer(reducer, initialState);
  const [accountModalVisible, setAccountModalVisible] = useState(false);
  const [outOfHearts, setOutOfHearts] = useState<OutOfHeartsSheet | undefined>(undefined);
  const [languageModalVisible, setLanguageModalVisible] = useState(false);
  const [accountPromptShown, setAccountPromptShown] = useState(false);
  const [accountPromptDue, setAccountPromptDue] = useState(false);
  const [settingsModalVisible, setSettingsModalVisible] = useState(false);
  const [activeAssessment, setActiveAssessment] = useState<FoundationAssessmentState | undefined>(undefined);
  // The practice end screen. `restored` is one shown again after a reload: its fanfare already played.
  const [practiceResult, setPracticeResult] = useState<(FoundationPracticeResult & { restored?: boolean }) | undefined>(undefined);
  const [testOutResult, setTestOutResult] = useState<TestOutResult | undefined>(undefined);
  const [authMode, setAuthMode] = useState<AuthMode>("create");
  const [accountError, setAccountError] = useState<string | undefined>(undefined);
  // Bumped on every failed sign up or log in, so the sheet plays its error feedback even for the same message twice.
  const [accountErrorKey, setAccountErrorKey] = useState(0);
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
  const lastFullScreenAdAtRef = useRef(0);
  // Ads are native only, so the age screen is too. Its answer stays on this device and only picks which ads may show.
  const needsAgeCheck = Platform.OS !== "web" && monetizationMode !== "disabled";
  const [ageGroup, setAgeGroup] = useState<AgeGroup | undefined>(() => {
    const saved = getStoredItem("sira-path-age-group");
    return isAgeGroup(saved) ? saved : undefined;
  });
  const adAudience = adAudienceFor(ageGroup, state.user?.accountRole === "child");
  const adsAllowedToStart = !needsAgeCheck || Boolean(ageGroup);
  const [storePrices, setStorePrices] = useState<Record<string, string>>({});
  const [shopBusy, setShopBusy] = useState(false);
  const monetizationUserId = state.user?.hasAccount ? String(state.user.id) : undefined;
  const hasUser = Boolean(state.user);

  // Set before the SDK starts (and again on a change) so not one ad is asked for with the wrong age settings.
  useEffect(() => {
    monetizationClient.setAdAudience(adAudience);
  }, [adAudience]);

  // Connect the store once a learner is loaded and the age screen is answered, then let the store's record of
  // premium override local state.
  useEffect(() => {
    if (!hasUser || !adsAllowedToStart) {
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
  }, [hasUser, monetizationUserId, adsAllowedToStart]);

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
      // A practice session cut off by a reload picks up on the same question; its clock starts again.
      const savedAssessment = loadActiveAssessment(assessmentOwner(user));

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

        if (savedAssessment) {
          setActiveAssessment({ ...savedAssessment, questionStartedAt: Date.now() });
          dispatch({ type: "open_assessment", returnScreen: "review" });
        } else {
          // A reload on a practice end screen shows it again; CONTINUE then goes to Practice.
          const savedResult = loadPracticeResult(assessmentOwner(user));

          if (savedResult) {
            setPracticeResult({ ...savedResult, restored: true });
            dispatch({ type: "open_assessment", returnScreen: "review" });
          }
        }
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

  // The running practice session, and its end screen once it is done, are kept next to the saved
  // learner, so a reload resumes the one or shows the other again.
  const assessmentOwnerKey = state.user ? assessmentOwner(state.user) : undefined;
  useEffect(() => {
    if (state.loading || !assessmentOwnerKey) {
      return;
    }

    if (activeAssessment) {
      saveActiveAssessment(assessmentOwnerKey, activeAssessment);
    } else {
      clearActiveAssessment();
    }

    if (practiceResult) {
      savePracticeResult(assessmentOwnerKey, { assessment: practiceResult.assessment, profile: practiceResult.profile });
    } else {
      clearPracticeResult();
    }
  }, [activeAssessment, assessmentOwnerKey, practiceResult, state.loading]);


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
  const completedNodeIds = state.user?.completedNodeIds;
  const subscriptionId = state.user?.activeSubscriptionId;

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
  // The circle to play next: the one the last lesson or test in this topic opened while it is still open, else
  // the path's own. NEXT LESSON plays it and the path puts START on it, so a jump into a later unit carries on
  // there, not back in a unit skipped past. It is kept on the learner, so a reload keeps it too.
  const pathFocusId = state.user?.pathFocusIds?.[selectedSection.topicId];
  const sectionNextNode = useMemo(() => {
    const focused = pathFocusId ? sectionNodes.find((node) => node.id === pathFocusId) : undefined;
    return focused && (focused.status === "current" || focused.status === "available") ? focused : findNextPlayableNode(sectionNodes);
  }, [pathFocusId, sectionNodes]);
  // Every unfinished unit the learner may open can be tested out when the circles it skips give enough
  // questions for a fair test: the open unit's banner key, and JUMP HERE on locked circles of any unit.
  // Only finished circles and premium change the plans, so a heart or XP change does not redo them.
  const testOutUnitIds = useMemo(() => {
    const ids = new Set<string>();

    if (!state.user) {
      return ids;
    }

    const user = { ...state.user, completedNodeIds: completedNodeIds ?? [], activeSubscriptionId: subscriptionId };

    for (const branch of selectedSection.branches) {
      const plan = getTestOutPlan(user, branch.id);

      if (plan && canTestOut(plan.lessons)) {
        ids.add(branch.id);
      }
    }

    return ids;
  }, [completedNodeIds, subscriptionId, selectedSection]);
  // The locked circles JUMP HERE can open: a test of the circles before each one (at most 10).
  const jumpNodeIds = useMemo(() => {
    if (!state.user) {
      return new Set<string>();
    }

    return getJumpNodeIds({ ...state.user, completedNodeIds: completedNodeIds ?? [], activeSubscriptionId: subscriptionId }, selectedSection.topicId);
  }, [completedNodeIds, subscriptionId, selectedSection]);
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
        canTestOut: testOutUnitIds.has(branch.id),
        items
      });
    }

    return { units, chestStops };
  }, [sectionNodes, selectedSection, state.user, testOutUnitIds]);
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

  // Each finished circle's best run, as its Lesson complete card showed it.
  const userStars = useMemo(() => (state.user ? getTotalStars(state.user) : 0), [state.user]);
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

  // `focus` practices one skill (a "Practice next" chip on the end screen).
  function openFoundationAssessment(mode: FoundationAssessmentState["mode"], focus?: FoundationCategoryId) {
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

    setActiveAssessment(createFoundationAssessment(hydratedUser.learnerProfile ?? createEmptyLearnerProfile(), mode, { focus }));
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
        // A finished review or daily challenge is a lesson too, so it starts or keeps the streak; the
        // Level check only measures, like its XP.
        ...(activeAssessment.mode === "placement" ? state.user : keepStreak(state.user)),
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

  // LearnPath asks "Jump ahead?" first and calls this on START TEST. A "unit" plan (the banner key)
  // finishes the unit's circles; a "jump" plan finishes the circles before the one it opens: the JUMP HERE
  // circle (`jumpNodeId`), or a locked unit's first circle. `attempt` counts the tries from 0: TRY AGAIN
  // passes the next one, so the questions change.
  async function startBranchTestOut(branchId: string, user = state.user, attempt = 0, jumpNodeId?: string) {
    if (!user) {
      return;
    }

    const testBranch = selectedSection.branches.find((branch) => branch.id === branchId) ?? selectedBranch;
    const plan = getTestOutPlan(user, testBranch.id, jumpNodeId);

    if (!plan && testBranch.premiumOnly && !user.activeSubscriptionId) {
      dispatch({ type: "open_shop", focus: "premium" });
      return;
    }

    if (!plan || !canTestOut(plan.lessons)) {
      void notify("Nothing to skip yet.", undefined, { mood: "think" });
      return;
    }

    if (isOutOfHearts(user)) {
      openOutOfHearts(user, false, { kind: "test_out", unitId: testBranch.id, attempt, jumpNodeId });
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
      heartsAtStart: activeUser.hearts.current,
      attempt,
      jumpNodeId: plan.jumpNodeId
    });

    challengeStartedAtRef.current = Date.now();
    dispatch({ type: "start_lesson", session });
  }

  function answerChallenge() {
    if (!state.user || !state.activeSession || !state.selectedChoiceId || state.answerState) {
      return;
    }

    const step = state.lessonQueue[state.stepIndex];
    const challenge = step ? state.activeSession.lesson.challenges[step.index] : undefined;

    if (!step || !challenge) {
      return;
    }

    const correct = challenge.correctChoiceId === state.selectedChoiceId;
    const responseTimeMs = Math.max(900, Date.now() - challengeStartedAtRef.current);
    // Every wrong answer costs a heart, a missed question asked again too, so tapping through cannot finish a
    // lesson (a test-out's misses only count against its pass mark: no heart). Only the first try is scored
    // and teaches the learner profile.
    const isRetry = step.attempt > 0;
    const heartAdjustedUser = correct ? state.user : loseHeart(state.user, state.activeSession);
    let nextUser = withExperienceDefaults({
      ...heartAdjustedUser,
      lastLearningAt: new Date().toISOString()
    });

    if (!isRetry) {
      const signalNodeId = challenge.sourceNodeId ?? state.activeSession.lesson.nodeId;
      const lessonSignal = buildLessonSignal(signalNodeId, challenge, step.index, state.activeSession.lesson.challenges.length, correct, responseTimeMs);
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
      isTest: isTestSession(state.activeSession)
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

    // No hearts left: no next question (and no missed one asked again) until the learner refills.
    if (isOutOfHearts(state.user)) {
      openOutOfHearts(state.user, true);
      return;
    }

    void continueLesson(state.user);
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

    // A test-out that can no longer be passed ends now, not after the questions it has left.
    const testLost = state.activeSession.mode === "test_out" && isTestLost(state.activeSession, state.sessionMistakes);

    // The queue already holds a miss that this answer sent to the end: the lesson ends only once all are right.
    if (!testLost && !isLastLessonStep(state.lessonQueue, state.stepIndex)) {
      challengeStartedAtRef.current = Date.now();
      dispatch({ type: "next_challenge" });
      return;
    }

    if (state.activeSession.mode === "test_out") {
      const totalChallenges = state.activeSession.lesson.challenges.length;
      const passingScore = state.activeSession.passingScore ?? testOutPassingScore(totalChallenges);
      const passed = !testLost && state.sessionCorrectCount >= passingScore;

      if (!passed) {
        // The last question and its sheet close first, so the sad result never sits over a cheering
        // mascot and a green answer. The sheet opens over the path: the score, then TRY AGAIN or BACK.
        void Speech.stop();
        dispatch({ type: "reset_lesson" });
        setTestOutResult({
          open: true,
          correct: state.sessionCorrectCount,
          asked: state.sessionCorrectCount + state.sessionMistakes,
          total: totalChallenges,
          passingScore,
          unitId: state.activeSession.lesson.branchId ?? selectedBranch.id,
          attempt: state.activeSession.attempt ?? 0,
          jumpNodeId: state.activeSession.jumpNodeId
        });
        return;
      }

      const clusterLessons = (state.activeSession.targetLessonIds ?? [])
        .map((lessonId) => LESSONS_BY_ID[lessonId])
        .filter(Boolean);
      const testBranchId = state.activeSession.lesson.branchId;
      const beforeNodes = learningApi.getPathNodes(user);
      const finishedUser = withExperienceDefaults({
        // Practice pay, 2 XP per right answer, never more than the skipped lessons would have paid.
        ...completeLessonCluster(user, clusterLessons, getTestOutXp(state.activeSession, state.sessionCorrectCount), lessonStars(state.sessionMistakes)),
        lastLearningAt: new Date().toISOString()
      });
      const afterNodes = learningApi.getPathNodes(finishedUser);
      // The circle that is now next to play, not one the test just skipped.
      const unlockedNode = findUnlockedNode(beforeNodes, afterNodes, testBranchId);
      const nextUser = withPathFocus(finishedUser, testBranchId, findFocusNode(afterNodes, unlockedNode, testBranchId)?.id);

      // LessonComplete plays the finish, streak and XP sounds itself.
      setLessonCompleteSummary({
        headline: "You jumped ahead!",
        title: state.activeSession.clusterTitle ?? state.activeSession.lesson.title,
        xp: nextUser.totalXp - user.totalXp,
        streakExtended: didExtendStreak(user, nextUser),
        stars: lessonStars(state.sessionMistakes),
        unlockedTitle: unlockedNode ? getNodeTitle(unlockedNode.id, unlockedNode.title, currentLanguage) : undefined,
        streakDays: nextUser.streakDays
      });
      const xpSummary = await learningApi.getXpSummaries(nextUser);
      dispatch({ type: "finish_lesson", user: nextUser, xpSummary });
      maybeShowLessonBreakAd(nextUser);
      return;
    }

    const beforeNodes = learningApi.getPathNodes(user);
    const finishedUser = withExperienceDefaults({
      // The circle keeps its best stars; this run's are on the complete card.
      ...completeLesson(user, state.activeSession.lesson, lessonStars(state.sessionMistakes)),
      lastLearningAt: new Date().toISOString()
    });
    const lessonBranchId = state.activeSession.lesson.branchId ?? findNodeById(state.activeSession.lesson.nodeId)?.branchId;
    const afterNodes = learningApi.getPathNodes(finishedUser);
    const unlockedNode = findUnlockedNode(beforeNodes, afterNodes, lessonBranchId);
    const nextUser = withPathFocus(finishedUser, lessonBranchId, findFocusNode(afterNodes, unlockedNode, lessonBranchId)?.id);

    // LessonComplete plays the finish, streak and XP sounds itself, one after another.
    setLessonCompleteSummary({
      title: state.activeSession.lesson.title,
      // A replayed lesson earns nothing, so show what was actually added.
      xp: nextUser.totalXp - user.totalXp,
      streakExtended: didExtendStreak(user, nextUser),
      // How well this run went, replays too: each question missed on its first try is a mistake.
      stars: lessonStars(state.sessionMistakes),
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

    if (shouldShowLessonBreakAd(lessonsFinishedRef.current, isPremiumUser(user), Date.now() - lastFullScreenAdAtRef.current)) {
      void monetizationClient.showLessonBreakAd().then((shown) => {
        if (shown) lastFullScreenAdAtRef.current = Date.now();
      });
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

    // ShopView mutes the heart video at full hearts too: the heart it gives stops at the most hearts, so a video
    // then would give nothing.
    if (item.type === "rewarded_ad" && !item.gemsGranted && !state.user.hearts.unlimited && state.user.hearts.current >= state.user.hearts.max) {
      return;
    }

    setShopBusy(true);

    try {
      if (item.type === "rewarded_ad") {
        const gemVideo = Boolean(item.gemsGranted);
        const today = localDateKey();
        const watched = readRewardedGemVideos();

        if (gemVideo && rewardedGemVideosLeft(watched, today) === 0) {
          void notify("That's all for today", "Come back tomorrow for more gems.", { mood: "think" });
          return;
        }

        const reward = await monetizationClient.showRewardedAd(item);

        if (reward.ok) {
          lastFullScreenAdAtRef.current = Date.now();
          if (gemVideo) {
            setStoredItem("sira-path-rewarded-gem-videos", JSON.stringify({ date: today, count: (watched?.date === today ? watched.count : 0) + 1 }));
          }
          dispatch({
            type: "apply_user_latest",
            update: (user) => {
              const withHearts = reward.heartsGranted ? grantHearts(user, reward.heartsGranted, true) : user;
              return reward.gemsGranted ? { ...withHearts, gems: withHearts.gems + reward.gemsGranted } : withHearts;
            }
          });
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

  function failAccount(message: string) {
    setAccountError(message);
    setAccountErrorKey((key) => key + 1);
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
      failAccount("That email has an account. Log in!");
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
        failAccount(error instanceof BackendRequestError && error.status === 409 ? "That email has an account. Log in!" : "Could not sign up. Try again.");
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
        failAccount("Wrong email or password.");
        return;
      }
    }

    const account = loginLocalAuthAccount(accountEmail, accountPassword);

    if (!account) {
      failAccount("Wrong email or password.");
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
    setActiveAssessment(undefined);
    setPracticeResult(undefined);
    clearActiveAssessment();
    clearPracticeResult();
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
      // Until they add back, they wait under "pending" with no stats.
      setCrew((current) => current.status === "ready"
        ? {
            ...current,
            payload: member.pending
              ? { ...current.payload, pending: [...(current.payload.pending ?? []), member] }
              : { ...current.payload, friends: [...current.payload.friends, member] }
          }
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
        ? {
            ...current,
            payload: {
              ...current.payload,
              friends: current.payload.friends.filter((item) => item.id !== member.id),
              pending: (current.payload.pending ?? []).filter((item) => item.id !== member.id)
            }
          }
        : current);
    } catch (error) {
      void notify(crewErrorTitle(error, "remove"), undefined, { mood: "sad" });
    }
  }

  // Someone added this learner: ADD BACK puts them in the race, NO removes the request. CrewView asks a grown-up first.
  async function answerCrewRequest(member: CrewMember, accept: boolean) {
    try {
      const friend = accept ? await acceptCrewRequest(member.id, localDateKey()) : undefined;
      if (!accept) await declineCrewRequest(member.id);
      setCrew((current) => current.status === "ready"
        ? {
            ...current,
            payload: {
              ...current.payload,
              friends: friend ? [...current.payload.friends, friend] : current.payload.friends,
              requests: (current.payload.requests ?? []).filter((item) => item.id !== member.id)
            }
          }
        : current);
    } catch (error) {
      void notify(crewErrorTitle(error, "answer"), undefined, { mood: "sad" });
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
      void continueLesson(refilled);
    } else if (sheet?.resume?.kind === "node") {
      void startLesson(sheet.resume.node, refilled);
    } else if (sheet?.resume?.kind === "test_out") {
      void startBranchTestOut(sheet.resume.unitId, refilled, sheet.resume.attempt, sheet.resume.jumpNodeId);
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

  // TRY AGAIN is a new try: other questions in another order, not the run whose answers were just shown.
  function closeTestOutResult(again: boolean) {
    const result = testOutResult;
    setTestOutResult((current) => current && { ...current, open: false });
    dispatch({ type: "reset_lesson" });

    if (again && result) {
      void startBranchTestOut(result.unitId, state.user, result.attempt + 1, result.jumpNodeId);
    }
  }


  if (state.loading || !state.user) {
    return (
      <View style={safeArea} testID="safe-area">
        <StatusBar barStyle="dark-content" />
        <View style={styles.centerPane}>
          <Mascot variant="hijabi" mood="wave" size={110} />
          <Text style={styles.loadingText}>{strings.loadingPath}</Text>
        </View>
      </View>
    );
  }

  const inLesson = state.screen.startsWith("lesson_") || state.screen === "assessment";
  const enabledSocialProviders = (Object.entries(SOCIAL_AUTH_CONFIG) as [SocialProvider, typeof SOCIAL_AUTH_CONFIG[SocialProvider]][])
    .filter(([, config]) => config.enabled)
    .map(([id, config]) => ({ id, label: config.label }));
  const activeTab = tabForScreen(state.screen);
  // GET HEARTS only when the shop can give some now: a store that sells heart packs or videos, or a
  // gem heart item the learner can pay for. Otherwise the out-of-hearts sheet offers PRACTICE.
  const learner = state.user;
  const canGetHearts =
    monetizationMode !== "disabled" ||
    SHOP_ITEMS.some((item) => item.currencyType === "gems" && Boolean(item.refillsHearts || item.heartsGranted) && canSpendGems(learner, item));
  // With no hearts left the complete screen offers CONTINUE (back to the path), never a NEXT LESSON
  // that could not start.
  const nextLessonNode = sectionNextNode && sectionNextNode.status !== "locked" && !isOutOfHearts(state.user) ? sectionNextNode : undefined;
  const lessonSession = currentLessonSession;
  const lesson = lessonSession?.lesson;
  const lessonAccent = currentLessonSection.accentColor;
  const lessonMascot = currentLessonSection.mascot;
  const lessonArabic = lesson ? getLessonArabic(lesson.nodeId, lesson.branchId ?? findNodeById(lesson.nodeId)?.branchId) : undefined;
  const lessonStep = state.lessonQueue[state.stepIndex];
  const challenge = lessonStep ? lesson?.challenges[lessonStep.index] : undefined;
  const correctLabel = challenge?.choices.find((choice) => choice.id === challenge.correctChoiceId)?.label ?? "";
  const inTest = isTestSession(lessonSession);
  const testPassingScore = inTest && lesson ? lessonSession?.passingScore ?? testOutPassingScore(lesson.challenges.length) : 0;
  const lessonProgress = getLessonProgress({
    screen: state.screen,
    hasTeach: !inTest,
    hasPractice: Boolean(currentPracticeActivity),
    challengeCount: lesson?.challenges.length ?? 1,
    done: state.doneCount
  });
  const lessonHearts = {
    current: state.user.hearts.current,
    max: state.user.hearts.max,
    unlimited: Boolean(state.user.hearts.unlimited)
  };
  // GOT IT / CONTINUE on the last answer ends the lesson: LessonComplete's fanfare (or the test
  // result sheet's sound) follows, so the button itself stays quiet.
  const continueEndsLesson =
    state.screen === "lesson_feedback" &&
    Boolean(lesson) &&
    (isLastLessonStep(state.lessonQueue, state.stepIndex) || (lessonSession?.mode === "test_out" && isTestLost(lessonSession, state.sessionMistakes))) &&
    !isOutOfHearts(state.user);
  // GOT IT with no hearts left opens the out-of-hearts sheet, which plays its own sound as it opens.
  const continueOpensRefill = state.screen === "lesson_feedback" && isOutOfHearts(state.user);
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
    <View style={safeArea} testID="safe-area">
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
            // What START really pays: the lesson's XP with its review bonus, nothing on a replay.
            xpForNode={(node) => getNodeXp(node, learner)}
            onStartNode={(node) => void startLesson(node)}
            onClaimChest={(chest) => {
              const stop = learnPath.chestStops.get(chest.id);

              if (stop) {
                claimJourneyReward(stop);
              }
            }}
            jumpNodeIds={jumpNodeIds}
            // START (and the scroll back to the path) on the circle NEXT LESSON would play.
            currentNodeId={sectionNextNode?.id}
            testOutGoal={(unitId, nodeId) => getTestOutGoal(learner, unitId, nodeId)}
            onTestOut={(unitId, nodeId) => void startBranchTestOut(unitId, undefined, 0, nodeId)}
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
            // NEW only the first time the topic shows this word, not on its unit's word or a word met before,
            // and not on a replay of a finished circle: the learner has met it.
            isNewWord={isFirstUseOfWord(lesson.nodeId) && !state.user.completedNodeIds.includes(lesson.nodeId)}
            facts={lesson.learnFacts}
            // The questions ask about the narration or ayah, so the card shows it in full. When its
            // reference names the same narration as the source chip, LearnCard shows them as one.
            quote={lesson.quote}
            mascotVariant={lessonMascot}
            accent={lessonAccent}
            // The chip is the one source that says what the card says, by its short reference; none, no chip.
            learnSource={lesson.learnSource}
            onOpenSource={(url) => void Linking.openURL(url).catch(() => undefined)}
            onPlayAudio={lessonArabic ? () => speakArabic(lessonArabic.ar) : undefined}
            onContinue={continueFromTeach}
          />
        )}
        {state.screen === "lesson_practice" && currentPracticeActivity && lessonShell(
          <OrderGame
            key={currentPracticeActivity.id}
            title={currentPracticeActivity.title}
            prompt={currentPracticeActivity.prompt}
            options={currentPracticeActivity.options}
            correctOrderIds={currentPracticeActivity.correctOrderIds ?? currentPracticeActivity.options.map((option) => option.id)}
            mascotVariant={lessonMascot}
            accent={lessonAccent}
            onDone={beginLessonQuestions}
          />
        )}
        {(state.screen === "lesson_question" || state.screen === "lesson_feedback") && challenge && lessonStep && lessonShell(
          <>
            {inTest ? <TestStrip passingScore={testPassingScore} total={lesson?.challenges.length ?? 0} accent={lessonAccent} /> : null}
            <ExerciseView
              // A missed question asked again at the end is a new try: a fresh view with its tiles in another order.
              key={`${challenge.id}-${lessonStep.attempt}`}
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
              attempt={lessonStep.attempt}
              review={challenge.isReview}
              mascotVariant={lessonMascot}
              accent={lessonAccent}
              praiseSeed={challenge.id}
              playSound={false}
              continueSound={continueEndsLesson || continueOpensRefill ? false : undefined}
              onSelect={(choiceId) => dispatch({ type: "select_choice", choiceId })}
              onCheck={answerChallenge}
              onContinue={continueFromFeedback}
            />
          </>
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
            accent={selectedSection.accentColor}
            onChangeSelectedAnswer={updateAssessmentSelection}
            onSubmit={submitAssessmentAnswer}
            onContinue={continueAssessment}
            onExit={closeAssessment}
          />
        )}
        {/* Practice wears the topic accent too, so the mascot looks the same as on the path and the sheets. */}
        {state.screen === "assessment" && !activeAssessment && practiceResult && (
          <PracticeComplete
            assessment={practiceResult.assessment}
            learnerProfile={practiceResult.profile}
            playSounds={!practiceResult.restored}
            mascotVariant={selectedSection.mascot}
            accent={selectedSection.accentColor}
            onContinue={closeAssessment}
            onPracticeSkill={(category) => {
              setPracticeResult(undefined);
              openFoundationAssessment("review", category);
            }}
          />
        )}
        {state.screen === "review" && (
          <PracticeHub
            user={state.user}
            learnerProfile={learnerProfile}
            language={currentLanguage}
            strings={strings}
            mascotVariant={selectedSection.mascot}
            accent={selectedSection.accentColor}
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
            hasSavedAccount={hasSavedAccount}
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
            onDone={() => changeTab("learn")}
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
            hasSavedAccount={hasSavedAccount}
            onChangeInviteEmail={setInviteEmail}
            onChangeInviteRelation={setInviteRelation}
            onAddFriend={addCrewFriend}
            onRemoveFriend={removeCrewFriend}
            onAnswerRequest={answerCrewRequest}
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
          forChild={ageGroup === "6-9" || ageGroup === "10-12"}
          error={accountError}
          errorKey={accountErrorKey}
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
          canGetHearts={canGetHearts}
          onPractice={() => {
            closeOutOfHearts();
            changeTab("practice");
          }}
          onRefill={claimReviewHeartRestore}
          onShop={openShopForHearts}
          onEndLesson={closeOutOfHearts}
        />
        <ConfirmSheet
          visible={Boolean(testOutResult?.open)}
          title={`${testOutResult?.correct ?? 0} of ${testOutResult?.asked ?? 0} right`}
          line={`Get ${testOutResult?.passingScore ?? 0} of ${testOutResult?.total ?? 0} to jump ahead.`}
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
        <AgeSheet
          visible={hasUser && needsAgeCheck && !ageGroup}
          onSave={(group) => {
            setStoredItem("sira-path-age-group", group);
            setAgeGroup(group);
          }}
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
    </View>
  );
}

function readRewardedGemVideos(): { date: string; count: number } | null {
  try {
    const parsed = JSON.parse(getStoredItem("sira-path-rewarded-gem-videos") ?? "null");
    return parsed && typeof parsed.date === "string" && typeof parsed.count === "number" ? parsed : null;
  } catch {
    return null;
  }
}

// A saved topic id the course still has, or undefined.
function knownTopic(topicId: string | undefined): TopicId | undefined {
  return COURSE.sections.find((section) => section.topicId === topicId)?.topicId;
}

// Whose practice session is saved: the account's email, or "guest".
function assessmentOwner(user: UserProfile) {
  return user.hasAccount && user.accountEmail ? user.accountEmail : "guest";
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
function crewErrorTitle(error: unknown, action: "add" | "remove" | "answer") {
  if (error instanceof BackendRequestError && error.status < 500) {
    if (action === "answer") {
      return "That request is gone";
    }

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

// A test-out asks each question once: no free retry and no missed question asked again.
function isTestSession(session: LessonSession | undefined) {
  return Boolean(session && (session.isTest || session.mode === "test_out"));
}

// The circle a finished lesson or test opened, for the "Unlocked:" line. In a library topic the next
// circle of a later unit opens as "available", not "current", so both count; one in the same unit wins.
function findUnlockedNode(beforeNodes: LearningNodeView[], afterNodes: LearningNodeView[], branchId?: string) {
  const before = new Map(beforeNodes.map((node) => [node.id, node.status]));
  const opened = afterNodes.filter(
    (node) => before.get(node.id) === "locked" && (node.status === "current" || node.status === "available")
  );

  return opened.find((node) => node.branchId === branchId) ?? opened.find((node) => node.status === "current") ?? opened[0];
}

// Where the path carries on after a lesson or test in `branchId`: the circle it opened, else the next open circle
// of that unit, else of a later unit of the same topic. Undefined: the path's own next circle.
function findFocusNode(afterNodes: LearningNodeView[], unlockedNode: LearningNodeView | undefined, branchId?: string) {
  if (unlockedNode) {
    return unlockedNode;
  }

  const section = branchId ? COURSE.sections.find((item) => item.branches.some((branch) => branch.id === branchId)) : undefined;

  if (!section) {
    return undefined;
  }

  const byId = new Map(afterNodes.map((node) => [node.id, node]));
  const from = section.branches.findIndex((branch) => branch.id === branchId);

  for (const branch of section.branches.slice(from)) {
    const open = section.nodes
      .filter((node) => node.branchId === branch.id)
      .map((node) => byId.get(node.id))
      .find((node) => node?.status === "current" || node?.status === "available");

    if (open) {
      return open;
    }
  }

  return undefined;
}

// The learner with `nodeId` as where the path of `branchId`'s topic carries on (none: the path's own next circle).
// It is saved with the learner, on this device and on the server, so START stays there after a reload.
function withPathFocus(user: UserProfile, branchId: string | undefined, nodeId: string | undefined): UserProfile {
  const topicId = branchId ? COURSE.sections.find((section) => section.branches.some((branch) => branch.id === branchId))?.topicId : undefined;

  if (!topicId || user.pathFocusIds?.[topicId] === nodeId) {
    return user;
  }

  const pathFocusIds = { ...user.pathFocusIds };

  if (nodeId) {
    pathFocusIds[topicId] = nodeId;
  } else {
    delete pathFocusIds[topicId];
  }

  return { ...user, pathFocusIds };
}

// The "Jump ahead?" sheet's goal before the test starts: its questions and how many right answers pass.
function getTestOutGoal(user: UserProfile, unitId: string, nodeId?: string) {
  const plan = getTestOutPlan(user, unitId, nodeId);
  const total = plan ? pickTestOutChallenges(plan.lessons).length : 0;

  return total > 0 ? { total, passingScore: testOutPassingScore(total) } : undefined;
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

/** Above every test-out question: it is a test, and how many right answers pass it. */
function TestStrip({ passingScore, total, accent }: { passingScore: number; total: number; accent: string }) {
  return (
    <PopIn from="up" style={styles.testStrip}>
      <View style={[styles.testChip, { backgroundColor: lighten(accent, 0.85) }]} testID="test-out-label">
        <Icon name="key" size={18} />
        <Text style={[styles.testChipText, { color: darken(accent, 0.4) }]}>TEST</Text>
      </View>
      <Text style={styles.testGoal} testID="test-out-goal">
        Get {passingScore} of {total} right
      </Text>
    </PopIn>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.snow },
  appShell: { flex: 1, backgroundColor: colors.snow },
  centerPane: { flex: 1, alignItems: "center", justifyContent: "center", gap: 12, padding: 24 },
  loadingText: { fontFamily: fonts.displayHeavy, fontSize: 20, color: colors.inkSoft },
  testStrip: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    paddingHorizontal: space.lg,
    paddingTop: space.xs
  },
  testChip: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: radii.pill,
    paddingLeft: 8,
    paddingRight: 12,
    paddingVertical: 3,
    marginRight: space.sm
  },
  testChipText: { marginLeft: 5, fontFamily: fonts.displayHeavy, fontSize: 14, lineHeight: 20, letterSpacing: 1 },
  testGoal: { flexShrink: 1, fontFamily: fonts.displayHeavy, fontSize: 15, lineHeight: 20, color: colors.inkSoft }
});
