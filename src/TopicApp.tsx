import React, { useEffect, useMemo, useReducer } from "react";
import {
  Alert,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View
} from "react-native";
import {
  applyShopItem,
  completeLesson,
  grantHearts,
  learningApi,
  loseHeart
} from "./api/islamicLearningApi";
import { COURSE, SHOP_ITEMS } from "./data/course";
import { sandboxMonetizationClient } from "./services/monetization";
import type {
  Challenge,
  CharacterVariant,
  LearningNodeView,
  LearningSection,
  LessonSession,
  ShopItem,
  TopicId,
  UserProfile,
  XpSummary
} from "./types";

type Screen = "path" | "lesson" | "shop";
type AnswerState = "correct" | "wrong" | undefined;

interface AppState {
  screen: Screen;
  selectedTopic: TopicId;
  user?: UserProfile;
  xpSummary: XpSummary[];
  activeSession?: LessonSession;
  challengeIndex: number;
  selectedChoiceId?: string;
  answerState: AnswerState;
  loading: boolean;
}

type Action =
  | { type: "loaded"; user: UserProfile; xpSummary: XpSummary[] }
  | { type: "select_topic"; topicId: TopicId }
  | { type: "open_shop" }
  | { type: "close_shop" }
  | { type: "start_lesson"; session: LessonSession }
  | { type: "select_choice"; choiceId: string }
  | { type: "answer"; correct: boolean; user: UserProfile }
  | { type: "next_challenge" }
  | { type: "finish_lesson"; user: UserProfile; xpSummary: XpSummary[] }
  | { type: "apply_user"; user: UserProfile }
  | { type: "reset_lesson" };

const initialState: AppState = {
  screen: "path",
  selectedTopic: "manners",
  xpSummary: [],
  challengeIndex: 0,
  answerState: undefined,
  loading: true
};

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "loaded":
      return { ...state, user: action.user, xpSummary: action.xpSummary, loading: false };
    case "select_topic":
      return { ...state, selectedTopic: action.topicId, screen: "path" };
    case "open_shop":
      return { ...state, screen: "shop" };
    case "close_shop":
      return { ...state, screen: "path" };
    case "start_lesson":
      return {
        ...state,
        screen: "lesson",
        activeSession: action.session,
        challengeIndex: 0,
        selectedChoiceId: undefined,
        answerState: undefined
      };
    case "select_choice":
      return { ...state, selectedChoiceId: action.choiceId };
    case "answer":
      return { ...state, user: action.user, answerState: action.correct ? "correct" : "wrong" };
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
        answerState: undefined
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
        answerState: undefined
      };
    default:
      return state;
  }
}

export default function TopicApp() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    let mounted = true;

    async function load() {
      const user = await learningApi.getUser(1001);
      const xpSummary = await learningApi.getXpSummaries(user);

      if (mounted) {
        dispatch({ type: "loaded", user, xpSummary });
      }
    }

    load();

    return () => {
      mounted = false;
    };
  }, []);

  const pathNodes = useMemo(() => {
    return state.user ? learningApi.getPathNodes(state.user) : [];
  }, [state.user]);

  const selectedSection = useMemo(() => {
    return COURSE.sections.find((section) => section.topicId === state.selectedTopic) ?? COURSE.sections[0];
  }, [state.selectedTopic]);

  const selectedNodes = useMemo(() => {
    return pathNodes.filter((node) => node.topicId === selectedSection.topicId);
  }, [pathNodes, selectedSection.topicId]);

  const currentLessonSection = useMemo(() => {
    if (!state.activeSession) {
      return selectedSection;
    }

    return getSectionByNodeId(state.activeSession.lesson.nodeId) ?? selectedSection;
  }, [selectedSection, state.activeSession]);

  async function startLesson(node: LearningNodeView) {
    if (!state.user) {
      return;
    }

    if (node.status === "locked") {
      Alert.alert("Locked", "Finish the earlier circles in this topic first.");
      return;
    }

    if (!state.user.hearts.unlimited && state.user.hearts.current === 0) {
      dispatch({ type: "open_shop" });
      return;
    }

    const session = await learningApi.getLessonSession(node.firstLessonId, state.user);
    dispatch({ type: "start_lesson", session });
  }

  function answerChallenge() {
    if (!state.user || !state.activeSession || !state.selectedChoiceId || state.answerState) {
      return;
    }

    const challenge = state.activeSession.lesson.challenges[state.challengeIndex];
    const correct = challenge.correctChoiceId === state.selectedChoiceId;
    const nextUser = correct ? state.user : loseHeart(state.user);

    dispatch({ type: "answer", correct, user: nextUser });
  }

  async function continueLesson() {
    if (!state.user || !state.activeSession) {
      return;
    }

    const lastChallenge = state.challengeIndex >= state.activeSession.lesson.challenges.length - 1;

    if (!lastChallenge) {
      if (!state.user.hearts.unlimited && state.user.hearts.current === 0 && state.answerState === "wrong") {
        dispatch({ type: "open_shop" });
        return;
      }

      dispatch({ type: "next_challenge" });
      return;
    }

    const nextUser = completeLesson(state.user, state.activeSession.lesson);
    const xpSummary = await learningApi.getXpSummaries(nextUser);
    dispatch({ type: "finish_lesson", user: nextUser, xpSummary });
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

  if (state.loading || !state.user) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.centerPane}>
          <Text style={styles.loadingText}>Preparing your learning path...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.appShell}>
        <TopBar user={state.user} onShop={() => dispatch({ type: "open_shop" })} />
        {state.screen === "path" && (
          <PathScreen
            user={state.user}
            xpSummary={state.xpSummary[0]}
            section={selectedSection}
            sections={COURSE.sections}
            nodes={selectedNodes}
            selectedTopic={state.selectedTopic}
            onSelectTopic={(topicId) => dispatch({ type: "select_topic", topicId })}
            onStartLesson={startLesson}
            onOpenShop={() => dispatch({ type: "open_shop" })}
          />
        )}
        {state.screen === "lesson" && state.activeSession && (
          <LessonScreen
            section={currentLessonSection}
            session={state.activeSession}
            challengeIndex={state.challengeIndex}
            selectedChoiceId={state.selectedChoiceId}
            answerState={state.answerState}
            onSelectChoice={(choiceId) => dispatch({ type: "select_choice", choiceId })}
            onAnswer={answerChallenge}
            onContinue={continueLesson}
            onExit={() => dispatch({ type: "reset_lesson" })}
          />
        )}
        {state.screen === "shop" && (
          <ShopScreen
            user={state.user}
            items={SHOP_ITEMS}
            section={selectedSection}
            onUseItem={useShopItem}
            onDone={() => dispatch({ type: "close_shop" })}
          />
        )}
        <AdBanner hidden={state.user.hearts.unlimited || state.screen === "lesson"} />
      </View>
    </SafeAreaView>
  );
}

function TopBar({ user, onShop }: { user: UserProfile; onShop: () => void }) {
  return (
    <View style={styles.topBar}>
      <View style={styles.miniGuideWrap}>
        <GuideMascot variant="hijabi" accentColor={colors.green} size={42} />
      </View>
      <View style={styles.topMetric}>
        <Text style={styles.metricLabel}>Streak</Text>
        <Text style={styles.metricValue}>{user.streakDays} day</Text>
      </View>
      <View style={styles.topMetric}>
        <Text style={styles.metricLabel}>XP</Text>
        <Text style={styles.metricValue}>{user.totalXp}</Text>
      </View>
      <View style={styles.topMetric}>
        <Text style={styles.metricLabel}>Gems</Text>
        <Text style={styles.metricValue}>{user.gems}</Text>
      </View>
      <Pressable onPress={onShop} style={styles.heartButton}>
        <Text style={styles.metricLabel}>Hearts</Text>
        <Text style={styles.heartValue}>{formatHearts(user, true)}</Text>
      </Pressable>
    </View>
  );
}

function PathScreen({
  user,
  xpSummary,
  section,
  sections,
  nodes,
  selectedTopic,
  onSelectTopic,
  onStartLesson,
  onOpenShop
}: {
  user: UserProfile;
  xpSummary?: XpSummary;
  section: LearningSection;
  sections: LearningSection[];
  nodes: LearningNodeView[];
  selectedTopic: TopicId;
  onSelectTopic: (topicId: TopicId) => void;
  onStartLesson: (node: LearningNodeView) => void;
  onOpenShop: () => void;
}) {
  const progress = Math.min(1, user.totalXp / user.dailyGoalXp);
  const nextNode = nodes.find((node) => node.status === "current") ?? nodes.find((node) => node.status === "available");

  return (
    <ScrollView contentContainerStyle={styles.pathContent} showsVerticalScrollIndicator={false}>
      <HeroCard section={section} progress={progress} gainedXp={xpSummary?.gainedXp ?? user.totalXp} onContinue={() => nextNode && onStartLesson(nextNode)} />

      <View style={styles.topicHeader}>
        <Text style={styles.sectionTitle}>Choose a topic</Text>
        <Text style={styles.sectionDescription}>Tap one and move through its circles.</Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.topicRow}>
        {sections.map((topic) => (
          <TopicCard
            key={topic.topicId}
            section={topic}
            selected={topic.topicId === selectedTopic}
            onPress={() => onSelectTopic(topic.topicId)}
          />
        ))}
      </ScrollView>

      <View style={styles.routeCard}>
        <View style={styles.routeHeader}>
          <View>
            <Text style={styles.routeBadge}>{section.badge}</Text>
            <Text style={styles.routeTitle}>{section.title}</Text>
            <Text style={styles.routeDescription}>{section.focus}</Text>
          </View>
          <GuideMascot variant={section.mascot} accentColor={section.accentColor} size={92} />
        </View>
        {nodes.map((node, index) => (
          <View key={node.id}>
            <PathNode
              node={node}
              index={index}
              isLast={index === nodes.length - 1}
              accentColor={section.accentColor}
              onPress={() => onStartLesson(node)}
            />
            {index === 1 && (
              <CoachCard
                section={section}
                title="Guide moment"
                copy={`Want ${section.title.toLowerCase()} right now? Tap the bright circle and keep moving.`}
              />
            )}
          </View>
        ))}
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
  progress,
  gainedXp,
  onContinue
}: {
  section: LearningSection;
  progress: number;
  gainedXp: number;
  onContinue: () => void;
}) {
  return (
    <View style={[styles.heroCard, { backgroundColor: section.accentColor }]}>
      <View style={styles.heroText}>
        <Text style={styles.heroBadge}>{section.badge}</Text>
        <Text style={styles.heroTitle}>Learn {section.title}</Text>
        <Text style={styles.heroCopy}>{section.description}</Text>
        <View style={styles.heroTrack}>
          <View style={[styles.heroFill, { width: `${progress * 100}%` }]} />
        </View>
        <Text style={styles.heroProgress}>{gainedXp} XP today</Text>
        <Pressable onPress={onContinue} style={styles.heroButton}>
          <Text style={styles.heroButtonText}>Continue topic</Text>
        </Pressable>
      </View>
      <View style={styles.heroArt}>
        <GuideMascot variant={section.mascot} accentColor={lightenColor(section.accentColor)} size={136} />
      </View>
    </View>
  );
}

function TopicCard({
  section,
  selected,
  onPress
}: {
  section: LearningSection;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.topicCard,
        selected && { borderColor: section.accentColor, backgroundColor: lightenColor(section.accentColor, 0.9) }
      ]}
    >
      <GuideMascot variant={section.mascot} accentColor={section.accentColor} size={72} />
      <Text style={styles.topicCardTitle}>{section.title}</Text>
      <Text style={styles.topicCardCopy}>{section.focus}</Text>
    </Pressable>
  );
}

function PathNode({
  node,
  index,
  isLast,
  accentColor,
  onPress
}: {
  node: LearningNodeView;
  index: number;
  isLast: boolean;
  accentColor: string;
  onPress: () => void;
}) {
  const alignments = [styles.nodeLeft, styles.nodeCenter, styles.nodeRight];

  return (
    <View style={[styles.nodeWrap, alignments[index % alignments.length]]}>
      <View style={styles.nodeRail}>
        <Pressable
          onPress={onPress}
          disabled={node.status === "locked"}
          style={({ pressed }) => [
            styles.nodeCircle,
            node.status === "completed" && { backgroundColor: accentColor, borderColor: darkenColor(accentColor) },
            node.status === "current" && styles.nodeCurrent,
            node.status === "available" && styles.nodeAvailable,
            node.status === "locked" && styles.nodeLocked,
            pressed && node.status !== "locked" && styles.nodePressed
          ]}
        >
          <Text style={[styles.nodeMark, node.status === "locked" && styles.nodeMarkLocked]}>
            {node.status === "completed" ? "OK" : getTopicMark(node.topicId)}
          </Text>
        </Pressable>
        {!isLast && <View style={[styles.nodeConnector, { backgroundColor: accentColor }]} />}
      </View>
      <View style={styles.nodeTextBlock}>
        <Text style={styles.nodeTitle}>{node.title}</Text>
        <Text style={styles.nodeMeta}>
          {node.status === "locked" ? "Locked" : node.status === "current" ? "Start here" : `${node.xpReward} XP`}
        </Text>
      </View>
    </View>
  );
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
  session,
  challengeIndex,
  selectedChoiceId,
  answerState,
  onSelectChoice,
  onAnswer,
  onContinue,
  onExit
}: {
  section: LearningSection;
  session: LessonSession;
  challengeIndex: number;
  selectedChoiceId?: string;
  answerState: AnswerState;
  onSelectChoice: (choiceId: string) => void;
  onAnswer: () => void;
  onContinue: () => void;
  onExit: () => void;
}) {
  const challenge = session.lesson.challenges[challengeIndex];
  const progress = (challengeIndex + 1) / session.lesson.challenges.length;

  return (
    <View style={styles.lessonScreen}>
      <View style={styles.lessonTop}>
        <Pressable onPress={onExit} style={styles.closeButton}>
          <Text style={styles.closeText}>Exit</Text>
        </Pressable>
        <View style={styles.lessonProgressTrack}>
          <View style={[styles.lessonProgressFill, { width: `${progress * 100}%`, backgroundColor: section.accentColor }]} />
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
      </View>

      <LessonFooter
        challenge={challenge}
        answerState={answerState}
        selectedChoiceId={selectedChoiceId}
        accentColor={section.accentColor}
        onAnswer={onAnswer}
        onContinue={onContinue}
      />
    </View>
  );
}

function LessonFooter({
  challenge,
  answerState,
  selectedChoiceId,
  accentColor,
  onAnswer,
  onContinue
}: {
  challenge: Challenge;
  answerState: AnswerState;
  selectedChoiceId?: string;
  accentColor: string;
  onAnswer: () => void;
  onContinue: () => void;
}) {
  if (answerState) {
    return (
      <View
        style={[
          styles.feedbackPane,
          answerState === "correct" ? { backgroundColor: lightenColor(accentColor, 0.9) } : styles.feedbackBad
        ]}
      >
        <Text style={styles.feedbackTitle}>{answerState === "correct" ? "That fits" : "Review this one"}</Text>
        <Text style={styles.feedbackCopy}>{challenge.explanation}</Text>
        <Pressable onPress={onContinue} style={[styles.primaryButton, { backgroundColor: accentColor }]}>
          <Text style={styles.primaryButtonText}>Continue</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.feedbackPane}>
      <Text style={styles.feedbackCopy}>Pick the answer that matches best.</Text>
      <Pressable
        onPress={onAnswer}
        disabled={!selectedChoiceId}
        style={[styles.primaryButton, { backgroundColor: accentColor }, !selectedChoiceId && styles.primaryButtonDisabled]}
      >
        <Text style={styles.primaryButtonText}>Check</Text>
      </Pressable>
    </View>
  );
}

function ShopScreen({
  user,
  items,
  section,
  onUseItem,
  onDone
}: {
  user: UserProfile;
  items: ShopItem[];
  section: LearningSection;
  onUseItem: (item: ShopItem) => void;
  onDone: () => void;
}) {
  return (
    <ScrollView contentContainerStyle={styles.shopContent}>
      <View style={[styles.shopHero, { backgroundColor: lightenColor(section.accentColor, 0.92) }]}>
        <View style={styles.shopHeroText}>
          <Text style={styles.eyebrow}>Heart shop</Text>
          <Text style={styles.title}>Keep learning {section.title}</Text>
          <Text style={styles.subtitle}>
            {user.hearts.unlimited
              ? "Membership is active. Hearts stay full."
              : `You have ${formatHearts(user)}.`}
          </Text>
        </View>
        <GuideMascot variant={section.mascot} accentColor={section.accentColor} size={112} />
      </View>

      {items.map((item) => (
        <View key={item.id} style={styles.shopItem}>
          <View style={styles.shopItemText}>
            <Text style={styles.shopItemTitle}>{item.name}</Text>
            <Text style={styles.shopItemCopy}>{item.localizedDescription}</Text>
          </View>
          <Pressable onPress={() => onUseItem(item)} style={[styles.secondaryButton, { backgroundColor: section.accentColor }]}>
            <Text style={styles.secondaryButtonText}>{formatPrice(item)}</Text>
          </Pressable>
        </View>
      ))}

      <Pressable onPress={onDone} style={[styles.primaryButton, { backgroundColor: section.accentColor }]}>
        <Text style={styles.primaryButtonText}>Back to path</Text>
      </Pressable>
    </ScrollView>
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
  const head = size * 0.33;
  const headBottom = size * 0.39;
  const skin = "#F6C7A8";
  const dark = "#27313B";

  return (
    <View style={{ width: size, height: size, alignItems: "center", justifyContent: "flex-end" }}>
      <View style={{ position: "absolute", bottom: size * 0.04, width: size * 0.48, height: size * 0.11, borderRadius: size * 0.06, backgroundColor: "rgba(20,37,27,0.10)" }} />
      <View style={{ position: "absolute", bottom: size * 0.02, width: size * 0.7, height: size * 0.14, borderRadius: 999, backgroundColor: "#FFFFFF" }} />
      <View style={{ position: "absolute", bottom: size * 0.14, width: size * 0.4, height: size * 0.1, borderRadius: 999, backgroundColor: "#EDF3F1" }} />
      <View style={{ position: "absolute", bottom: size * 0.14, width: size * 0.46, height: size * 0.34, borderRadius: size * 0.18, backgroundColor: accentColor }} />

      {variant === "hijabi" ? (
        <>
          <View style={{ position: "absolute", bottom: headBottom - size * 0.04, width: head * 1.2, height: head * 1.28, borderRadius: head * 0.64, backgroundColor: "#24394F" }} />
          <View style={{ position: "absolute", bottom: headBottom - size * 0.05, width: head * 1.02, height: head * 0.72, borderBottomLeftRadius: head * 0.5, borderBottomRightRadius: head * 0.5, borderTopLeftRadius: head * 0.22, borderTopRightRadius: head * 0.22, backgroundColor: "#24394F" }} />
        </>
      ) : (
        <>
          <View style={{ position: "absolute", bottom: headBottom + head * 0.34, width: head * 0.95, height: head * 0.34, borderTopLeftRadius: head * 0.24, borderTopRightRadius: head * 0.24, borderBottomLeftRadius: head * 0.12, borderBottomRightRadius: head * 0.12, backgroundColor: dark }} />
          <View style={{ position: "absolute", bottom: headBottom - head * 0.18, width: head * 0.88, height: head * 0.46, borderBottomLeftRadius: head * 0.3, borderBottomRightRadius: head * 0.3, borderTopLeftRadius: head * 0.2, borderTopRightRadius: head * 0.2, backgroundColor: dark }} />
          <View style={{ position: "absolute", bottom: headBottom + head * 0.08, left: size * 0.22, width: head * 0.18, height: head * 0.18, borderRadius: 999, backgroundColor: dark }} />
          <View style={{ position: "absolute", bottom: headBottom + head * 0.08, right: size * 0.22, width: head * 0.18, height: head * 0.18, borderRadius: 999, backgroundColor: dark }} />
        </>
      )}

      <View style={{ position: "absolute", bottom: headBottom, width: head, height: head, borderRadius: head / 2, backgroundColor: skin }} />
      <View style={{ position: "absolute", bottom: headBottom + head * 0.56, width: head * 0.75, height: head * 0.16, borderRadius: 999, backgroundColor: variant === "hijabi" ? "#24394F" : dark }} />
      <View style={{ position: "absolute", bottom: headBottom + head * 0.36, left: size * 0.39, width: head * 0.08, height: head * 0.08, borderRadius: 999, backgroundColor: dark }} />
      <View style={{ position: "absolute", bottom: headBottom + head * 0.36, right: size * 0.39, width: head * 0.08, height: head * 0.08, borderRadius: 999, backgroundColor: dark }} />
      <View style={{ position: "absolute", bottom: headBottom + head * 0.18, width: head * 0.16, height: head * 0.03, borderRadius: 999, backgroundColor: "#BC8A70" }} />
      <View style={{ position: "absolute", bottom: headBottom + head * 0.1, width: head * 0.22, height: head * 0.05, borderRadius: 999, backgroundColor: "#C77068" }} />
    </View>
  );
}

function getTopicMark(topicId: TopicId) {
  switch (topicId) {
    case "manners":
      return "MN";
    case "sahabah":
      return "SH";
    case "quran_tafseer":
      return "QT";
    default:
      return "GO";
  }
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

function getSectionByNodeId(nodeId: string) {
  return COURSE.sections.find((section) => section.nodes.some((node) => node.id === nodeId));
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
  topBar: { flexDirection: "row", alignItems: "center", gap: 10, paddingHorizontal: 16, paddingVertical: 12, backgroundColor: colors.white, borderBottomWidth: 1, borderBottomColor: colors.line },
  miniGuideWrap: { width: 42, height: 42, borderRadius: 8, overflow: "hidden", backgroundColor: colors.mint },
  topMetric: { minWidth: 50 },
  metricLabel: { color: colors.muted, fontSize: 12, fontWeight: "700", letterSpacing: 0 },
  metricValue: { color: colors.ink, fontSize: 15, fontWeight: "800", letterSpacing: 0 },
  heartButton: { marginLeft: "auto", minWidth: 84, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8, borderWidth: 1, borderColor: colors.line, backgroundColor: colors.white },
  heartValue: { color: colors.coral, fontSize: 15, fontWeight: "800", letterSpacing: 0 },
  pathContent: { padding: 18, paddingBottom: 128 },
  heroCard: { flexDirection: "row", alignItems: "center", overflow: "hidden", borderRadius: 8, padding: 18 },
  heroText: { flex: 1, paddingRight: 12 },
  heroArt: { width: 144, alignItems: "center", justifyContent: "center" },
  heroBadge: { color: "#DFF7EE", fontSize: 12, fontWeight: "900", textTransform: "uppercase", letterSpacing: 0 },
  heroTitle: { color: colors.white, fontSize: 30, lineHeight: 35, fontWeight: "900", letterSpacing: 0, marginTop: 4 },
  heroCopy: { color: "#EAF8F2", fontSize: 15, lineHeight: 21, fontWeight: "700", letterSpacing: 0, marginTop: 6 },
  heroTrack: { height: 12, borderRadius: 6, overflow: "hidden", backgroundColor: "rgba(255,255,255,0.28)", marginTop: 16 },
  heroFill: { height: 12, backgroundColor: colors.white },
  heroProgress: { color: "#EAF8F2", fontSize: 13, fontWeight: "800", letterSpacing: 0, marginTop: 8 },
  heroButton: { minHeight: 46, paddingHorizontal: 16, borderRadius: 8, alignSelf: "flex-start", alignItems: "center", justifyContent: "center", backgroundColor: colors.white, marginTop: 16 },
  heroButtonText: { color: colors.greenDark, fontSize: 15, fontWeight: "900", letterSpacing: 0 },
  topicHeader: { marginTop: 24 },
  sectionTitle: { color: colors.ink, fontSize: 22, lineHeight: 27, fontWeight: "900", letterSpacing: 0 },
  sectionDescription: { color: colors.muted, fontSize: 14, lineHeight: 20, fontWeight: "600", letterSpacing: 0, marginTop: 4 },
  topicRow: { gap: 12, paddingVertical: 16, paddingRight: 18 },
  topicCard: { width: 168, padding: 14, borderRadius: 8, borderWidth: 1, borderColor: colors.line, backgroundColor: colors.white },
  topicCardTitle: { color: colors.ink, fontSize: 16, fontWeight: "900", letterSpacing: 0, marginTop: 8 },
  topicCardCopy: { color: colors.muted, fontSize: 13, lineHeight: 18, fontWeight: "600", letterSpacing: 0, marginTop: 4 },
  routeCard: { borderRadius: 8, padding: 16, borderWidth: 1, borderColor: colors.line, backgroundColor: colors.white },
  routeHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 10 },
  routeBadge: { color: colors.greenDark, fontSize: 12, fontWeight: "900", textTransform: "uppercase", letterSpacing: 0 },
  routeTitle: { color: colors.ink, fontSize: 24, lineHeight: 30, fontWeight: "900", letterSpacing: 0, marginTop: 4 },
  routeDescription: { color: colors.muted, fontSize: 14, lineHeight: 20, fontWeight: "600", letterSpacing: 0, marginTop: 4, maxWidth: 220 },
  nodeWrap: { width: "100%", marginVertical: 8 },
  nodeRail: { alignItems: "center" },
  nodeLeft: { alignItems: "flex-start" },
  nodeCenter: { alignItems: "center" },
  nodeRight: { alignItems: "flex-end" },
  nodeCircle: { width: 78, height: 78, borderRadius: 39, alignItems: "center", justifyContent: "center", borderWidth: 4, borderColor: colors.green, backgroundColor: colors.white },
  nodeConnector: { width: 6, height: 34, borderRadius: 999, opacity: 0.25, marginTop: 6 },
  nodeCurrent: { backgroundColor: colors.gold, borderColor: colors.greenDark },
  nodeAvailable: { backgroundColor: colors.white },
  nodeLocked: { backgroundColor: colors.gray, borderColor: colors.line },
  nodePressed: { transform: [{ scale: 0.97 }] },
  nodeMark: { color: colors.ink, fontWeight: "900", fontSize: 18, letterSpacing: 0 },
  nodeMarkLocked: { color: colors.muted },
  nodeTextBlock: { width: 164, marginTop: 8 },
  nodeTitle: { color: colors.ink, fontSize: 15, fontWeight: "900", textAlign: "center", letterSpacing: 0 },
  nodeMeta: { color: colors.muted, fontSize: 12, fontWeight: "700", textAlign: "center", letterSpacing: 0, marginTop: 2 },
  coachCard: { flexDirection: "row", alignItems: "center", gap: 12, paddingVertical: 8, paddingHorizontal: 6, marginVertical: 6 },
  coachBubble: { flex: 1, padding: 14, borderRadius: 8, borderWidth: 1, borderColor: colors.line, backgroundColor: "#F7FBF8" },
  coachTitle: { color: colors.ink, fontSize: 15, fontWeight: "900", letterSpacing: 0 },
  coachCopy: { color: colors.muted, fontSize: 13, lineHeight: 18, fontWeight: "600", letterSpacing: 0, marginTop: 4 },
  heartsPrompt: { marginTop: 18, padding: 16, borderRadius: 8, borderWidth: 1, borderColor: colors.line, backgroundColor: colors.coralSoft },
  heartsPromptTitle: { color: colors.ink, fontSize: 16, fontWeight: "900", letterSpacing: 0 },
  heartsPromptCopy: { color: colors.muted, fontSize: 14, lineHeight: 19, fontWeight: "600", letterSpacing: 0, marginTop: 4 },
  lessonScreen: { flex: 1, backgroundColor: colors.white },
  lessonTop: { flexDirection: "row", alignItems: "center", gap: 12, padding: 16, borderBottomWidth: 1, borderBottomColor: colors.line },
  closeButton: { paddingVertical: 8, paddingHorizontal: 10, borderRadius: 8, backgroundColor: colors.gray },
  closeText: { color: colors.ink, fontWeight: "900", letterSpacing: 0 },
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
  feedbackPane: { padding: 18, gap: 12, borderTopWidth: 1, borderTopColor: colors.line, backgroundColor: colors.white },
  feedbackBad: { backgroundColor: colors.coralSoft },
  feedbackTitle: { color: colors.ink, fontSize: 18, fontWeight: "900", letterSpacing: 0 },
  feedbackCopy: { color: colors.muted, fontSize: 15, lineHeight: 21, fontWeight: "700", letterSpacing: 0 },
  primaryButton: { minHeight: 52, borderRadius: 8, alignItems: "center", justifyContent: "center" },
  primaryButtonDisabled: { backgroundColor: colors.line },
  primaryButtonText: { color: colors.white, fontSize: 16, fontWeight: "900", letterSpacing: 0 },
  shopContent: { padding: 18, paddingBottom: 128, gap: 14 },
  shopHero: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 12, padding: 16, borderRadius: 8 },
  shopHeroText: { flex: 1 },
  title: { color: colors.ink, fontSize: 28, lineHeight: 34, fontWeight: "900", letterSpacing: 0, marginTop: 4 },
  subtitle: { color: colors.muted, fontSize: 15, lineHeight: 21, fontWeight: "600", letterSpacing: 0, marginTop: 6 },
  shopItem: { flexDirection: "row", alignItems: "center", gap: 12, padding: 14, borderRadius: 8, borderWidth: 1, borderColor: colors.line, backgroundColor: colors.white },
  shopItemText: { flex: 1 },
  shopItemTitle: { color: colors.ink, fontSize: 17, lineHeight: 22, fontWeight: "900", letterSpacing: 0 },
  shopItemCopy: { color: colors.muted, fontSize: 14, lineHeight: 20, fontWeight: "600", letterSpacing: 0, marginTop: 4 },
  secondaryButton: { minWidth: 84, minHeight: 44, alignItems: "center", justifyContent: "center", borderRadius: 8 },
  secondaryButtonText: { color: colors.white, fontWeight: "900", letterSpacing: 0 },
  adBanner: { position: "absolute", left: 12, right: 12, bottom: 10, minHeight: 56, borderRadius: 8, paddingHorizontal: 14, paddingVertical: 10, borderWidth: 1, borderColor: colors.line, backgroundColor: colors.white },
  adLabel: { color: colors.sky, fontSize: 12, fontWeight: "900", textTransform: "uppercase", letterSpacing: 0 },
  adCopy: { color: colors.muted, fontSize: 13, lineHeight: 18, fontWeight: "700", letterSpacing: 0, marginTop: 2 }
});
