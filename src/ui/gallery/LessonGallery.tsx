import React, { useEffect, useState } from "react";
import { Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { getLessonArabic, NODE_ARABIC } from "../../data/arabicTerms";
import { COURSE, LESSONS_BY_ID } from "../../data/course";
import type { Challenge, Lesson } from "../../types";
import { ExerciseView, LearnCard, LessonComplete, LessonScreen, OrderGame, QuitSheet, getLessonLine, shortWhy, type LessonHearts } from "../lesson";
import { colors, fonts, space } from "../theme";

// Dev gallery for the lesson screens. #gallery-lesson shows every state stacked in phone frames;
// #gallery-lesson-STATE shows one state full screen.

const FOUNDATION = COURSE.sections.find((section) => section.id === "foundation");
const PRAYER = COURSE.sections.find((section) => section.id === "prayer-expansion");
const FOUNDATION_ACCENT = FOUNDATION?.accentColor ?? colors.green;
const PRAYER_ACCENT = PRAYER?.accentColor ?? colors.gem;

const salam = LESSONS_BY_ID["lesson-foundation-niyyah"] as Lesson;
const wudu = LESSONS_BY_ID["lesson-prayer-wudu-steps"] as Lesson;
const allLessons = Object.values(LESSONS_BY_ID) as Lesson[];
const plainLesson =
  allLessons.find((lesson) => lesson.id.startsWith("lesson-sahabi") && !getLessonArabic(lesson.nodeId, lesson.branchId)) ??
  allLessons.find((lesson) => !getLessonArabic(lesson.nodeId, lesson.branchId)) ??
  salam;
const allChallenges = allLessons.flatMap((lesson) => lesson.challenges);
const forgiveQuestion =
  allChallenges.find((challenge) => challenge.prompt.startsWith("Forgiveness can be a sign of strength")) ?? salam.challenges[1];
const longQuestion =
  allLessons.flatMap((lesson) => lesson.challenges).sort((a, b) => b.prompt.length - a.prompt.length)[0] ?? salam.challenges[0];
// Quran ayah prompts ("What does this ayah mean? <ayah> (Quran 1:3)"), shortest and a long one.
const ayahQuestions = allChallenges.filter((challenge) => challenge.prompt.startsWith("What does this ayah mean?")).sort((a, b) => a.prompt.length - b.prompt.length);
const ayahQuestion = ayahQuestions[0] ?? salam.challenges[0];
const longAyahQuestion = ayahQuestions[Math.floor(ayahQuestions.length * 0.9)] ?? ayahQuestion;
// "Which tribe was Muhammad ﷺ from?": the honorific stays inside the English line.
const honorificQuestion = allChallenges.find((challenge) => /\uFDFA/.test(challenge.prompt) && challenge.choices.length >= 4) ?? salam.challenges[0];
// Four long answers: the short-phone layout and the "more below" hint.
const longChoicesQuestion =
  allChallenges
    .filter((challenge) => challenge.type === "multiple_choice" && challenge.choices.length >= 4)
    .sort((a, b) => b.choices.reduce((sum, choice) => sum + choice.label.length, 0) - a.choices.reduce((sum, choice) => sum + choice.label.length, 0))
    .find((challenge) => challenge.choices.every((choice) => choice.label.length < 140)) ?? salam.challenges[0];
const muhammad = (allLessons.find((lesson) => getLessonArabic(lesson.nodeId, lesson.branchId)?.ar.includes("\uFDFA")) ?? salam) as Lesson;
const hadithLesson = (allLessons.find((lesson) => lesson.id.startsWith("lesson-notes-hadith")) ?? salam) as Lesson;

function firstSource(lesson: Lesson) {
  const source = lesson.sources[0];
  return source ? { label: source.reference ?? source.title, url: source.url } : undefined;
}

const ARABIC_QUESTION: Challenge = {
  id: "gallery-arabic-choices",
  type: "multiple_choice",
  prompt: `Which one means "${NODE_ARABIC["foundation-niyyah"].meaning}"?`,
  choices: [
    { id: "a", label: NODE_ARABIC["foundation-bismillah"].ar },
    { id: "b", label: NODE_ARABIC["foundation-niyyah"].ar },
    { id: "c", label: NODE_ARABIC["foundation-guidance"].ar }
  ],
  correctChoiceId: "b",
  explanation: "As-salamu alaykum means peace be upon you."
};

const ARABIC_PROMPT: Challenge = {
  id: "gallery-arabic-prompt",
  type: "multiple_choice",
  prompt: `What does ${NODE_ARABIC["foundation-bismillah"].ar} mean?`,
  choices: [
    { id: "a", label: NODE_ARABIC["foundation-bismillah"].meaning },
    { id: "b", label: NODE_ARABIC["foundation-guidance"].meaning },
    { id: "c", label: NODE_ARABIC["foundation-niyyah"].meaning }
  ],
  correctChoiceId: "a",
  explanation: "We say it before we start."
};

const WUDU_STEPS = [
  { id: "bismillah", label: "Say Bismillah" },
  { id: "hands", label: "Wash hands" },
  { id: "mouth", label: "Rinse mouth" },
  { id: "nose", label: "Rinse nose" },
  { id: "face", label: "Wash face" },
  { id: "arms", label: "Wash arms to the elbows" },
  { id: "head", label: "Wipe head and ears" },
  { id: "feet", label: "Wash feet" }
];
const WUDU_ORDER = WUDU_STEPS.map((step) => step.id);

const FULL_HEARTS: LessonHearts = { current: 5, max: 5, unlimited: false };
const noop = () => undefined;

function ExerciseDemo({
  challenge,
  accent = FOUNDATION_ACCENT,
  initialSelected,
  checkNow,
  retrying,
  whyOpen,
  progress = 0.4
}: {
  challenge: Challenge;
  accent?: string;
  initialSelected?: string;
  checkNow?: boolean;
  retrying?: boolean;
  whyOpen?: boolean;
  progress?: number;
}) {
  const [selected, setSelected] = useState<string | undefined>(initialSelected);
  const [checked, setChecked] = useState(Boolean(checkNow));
  const [hearts, setHearts] = useState<LessonHearts>(FULL_HEARTS);
  const correctLabel = challenge.choices.find((choice) => choice.id === challenge.correctChoiceId)?.label ?? "";
  const correct = selected === challenge.correctChoiceId;
  // What TopicApp should pass as `why`: one short, useful sentence (or nothing).
  const why = shortWhy({
    explanation: challenge.explanation,
    easierExplanation: challenge.easierExplanation,
    prompt: challenge.prompt,
    correctLabel
  });

  useEffect(() => {
    // Shows the heart drop animation for a pre-checked wrong answer.
    if (checkNow && initialSelected !== challenge.correctChoiceId) {
      const timer = setTimeout(() => setHearts((value) => ({ ...value, current: value.current - 1 })), 400);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [challenge.correctChoiceId, checkNow, initialSelected]);

  return (
    <LessonScreen progress={checked && correct ? progress + 0.1 : progress} hearts={hearts} onClose={noop}>
      <ExerciseView
        kind={challenge.type}
        prompt={challenge.prompt}
        choices={challenge.choices}
        selectedChoiceId={selected}
        correctChoiceId={challenge.correctChoiceId}
        result={checked ? { correct, correctLabel, why } : undefined}
        retrying={retrying}
        mascotVariant="girl"
        accent={accent}
        praiseSeed={challenge.id}
        defaultWhyOpen={whyOpen}
        onSelect={setSelected}
        onCheck={() => {
          setChecked(true);
          if (selected !== challenge.correctChoiceId) {
            setHearts((value) => ({ ...value, current: Math.max(0, value.current - 1) }));
          }
        }}
        onContinue={() => {
          setChecked(false);
          setSelected(undefined);
        }}
      />
    </LessonScreen>
  );
}

function QuitDemo() {
  const [visible, setVisible] = useState(true);
  return (
    <LessonScreen
      progress={0.3}
      hearts={FULL_HEARTS}
      onClose={() => setVisible(true)}
      overlay={<QuitSheet visible={visible} onKeepLearning={() => setVisible(false)} onQuit={() => setVisible(false)} mascotVariant="boy" accent={PRAYER_ACCENT} />}
    >
      <ExerciseView
        kind="multiple_choice"
        prompt={salam.challenges[2].prompt}
        choices={salam.challenges[2].choices}
        mascotVariant="boy"
        accent={PRAYER_ACCENT}
        onSelect={noop}
        onCheck={noop}
        onContinue={noop}
      />
    </LessonScreen>
  );
}

type State = { id: string; render: () => React.ReactElement };

const STATES: State[] = [
  {
    id: "learn",
    render: () => (
      <LessonScreen progress={0.08} hearts={FULL_HEARTS} onClose={noop}>
        <LearnCard
          title={salam.title}
          line={getLessonLine(salam)}
          arabic={getLessonArabic(salam.nodeId, salam.branchId)}
          onPlayAudio={noop}
          source={firstSource(salam)}
          mascotVariant="girl"
          accent={FOUNDATION_ACCENT}
          onContinue={noop}
          onOpenSource={noop}
        />
      </LessonScreen>
    )
  },
  {
    id: "learn-plain",
    render: () => (
      <LessonScreen progress={0.08} hearts={{ current: 3, max: 5, unlimited: false }} onClose={noop}>
        <LearnCard
          title={plainLesson.title}
          line={getLessonLine(plainLesson)}
          source={firstSource(plainLesson)}
          mascotVariant="boy"
          accent={COURSE.sections.find((section) => section.id === "sahabah-expansion")?.accentColor ?? colors.green}
          onContinue={noop}
          onOpenSource={noop}
        />
      </LessonScreen>
    )
  },
  {
    id: "learn-honorific",
    render: () => (
      <LessonScreen progress={0.08} hearts={FULL_HEARTS} onClose={noop}>
        <LearnCard
          title={muhammad.title}
          line={getLessonLine(muhammad)}
          arabic={getLessonArabic(muhammad.nodeId, muhammad.branchId)}
          onPlayAudio={noop}
          source={firstSource(muhammad)}
          mascotVariant="boy"
          accent={COURSE.sections.find((section) => section.topicId === "prophets")?.accentColor ?? colors.gem}
          onContinue={noop}
          onOpenSource={noop}
        />
      </LessonScreen>
    )
  },
  {
    id: "learn-hadith",
    render: () => (
      <LessonScreen progress={0.08} hearts={FULL_HEARTS} onClose={noop}>
        <LearnCard
          title={hadithLesson.title}
          line={getLessonLine(hadithLesson)}
          source={firstSource(hadithLesson)}
          mascotVariant="boy"
          accent={colors.gem}
          onContinue={noop}
          onOpenSource={noop}
        />
      </LessonScreen>
    )
  },
  { id: "mc", render: () => <ExerciseDemo challenge={salam.challenges[0]} progress={0.25} /> },
  { id: "mc-selected", render: () => <ExerciseDemo challenge={salam.challenges[0]} initialSelected="a" progress={0.25} /> },
  { id: "mc-correct", render: () => <ExerciseDemo challenge={salam.challenges[0]} initialSelected="a" checkNow progress={0.25} /> },
  { id: "mc-wrong", render: () => <ExerciseDemo challenge={salam.challenges[2]} initialSelected="b" checkNow whyOpen progress={0.55} /> },
  { id: "tf-wrong", render: () => <ExerciseDemo challenge={forgiveQuestion} initialSelected="false" checkNow whyOpen progress={0.5} /> },
  { id: "tf", render: () => <ExerciseDemo challenge={salam.challenges[1]} initialSelected="false" progress={0.4} /> },
  { id: "tf-retry", render: () => <ExerciseDemo challenge={salam.challenges[1]} retrying progress={0.4} /> },
  { id: "arabic", render: () => <ExerciseDemo challenge={ARABIC_QUESTION} initialSelected="b" progress={0.7} /> },
  { id: "arabic-prompt", render: () => <ExerciseDemo challenge={ARABIC_PROMPT} progress={0.7} /> },
  { id: "long", render: () => <ExerciseDemo challenge={longQuestion} accent={colors.gem} initialSelected="true" progress={0.85} /> },
  { id: "long-choices", render: () => <ExerciseDemo challenge={longChoicesQuestion} accent={colors.gem} progress={0.6} /> },
  {
    id: "long-choices-wrong",
    render: () => (
      <ExerciseDemo
        challenge={longChoicesQuestion}
        accent={colors.gem}
        initialSelected={longChoicesQuestion.choices.find((choice) => choice.id !== longChoicesQuestion.correctChoiceId)?.id}
        checkNow
        progress={0.6}
      />
    )
  },
  { id: "ayah", render: () => <ExerciseDemo challenge={ayahQuestion} accent={colors.gem} progress={0.5} /> },
  { id: "ayah-long", render: () => <ExerciseDemo challenge={longAyahQuestion} accent={colors.gem} progress={0.5} /> },
  { id: "honorific", render: () => <ExerciseDemo challenge={honorificQuestion} accent={colors.gem} progress={0.3} /> },
  {
    id: "order",
    render: () => (
      <LessonScreen progress={0.3} hearts={FULL_HEARTS} onClose={noop}>
        <OrderGame
          title={wudu.title}
          options={WUDU_STEPS}
          correctOrderIds={WUDU_ORDER}
          mascotVariant="boy"
          accent={PRAYER_ACCENT}
          initialPlacedIds={["bismillah", "hands", "mouth"]}
          onDone={noop}
        />
      </LessonScreen>
    )
  },
  {
    id: "order-wrong",
    render: () => (
      <LessonScreen progress={0.3} hearts={FULL_HEARTS} onClose={noop}>
        <OrderGame
          title={wudu.title}
          options={WUDU_STEPS}
          correctOrderIds={WUDU_ORDER}
          mascotVariant="boy"
          accent={PRAYER_ACCENT}
          initialPlacedIds={["bismillah", "hands", "face", "mouth", "nose", "arms", "head", "feet"]}
          initialChecked
          onDone={noop}
        />
      </LessonScreen>
    )
  },
  {
    id: "order-shown",
    render: () => (
      <LessonScreen progress={0.3} hearts={FULL_HEARTS} onClose={noop}>
        <OrderGame
          title={wudu.title}
          options={WUDU_STEPS}
          correctOrderIds={WUDU_ORDER}
          mascotVariant="boy"
          accent={PRAYER_ACCENT}
          initialPlacedIds={["bismillah", "mouth", "hands", "nose", "face", "head", "arms", "feet"]}
          initialChecked
          initialMisses={2}
          onDone={noop}
        />
      </LessonScreen>
    )
  },
  {
    id: "order-correct",
    render: () => (
      <LessonScreen progress={0.35} hearts={FULL_HEARTS} onClose={noop}>
        <OrderGame
          title={wudu.title}
          options={WUDU_STEPS}
          correctOrderIds={WUDU_ORDER}
          mascotVariant="boy"
          accent={PRAYER_ACCENT}
          initialPlacedIds={WUDU_ORDER}
          initialChecked
          onDone={noop}
        />
      </LessonScreen>
    )
  },
  {
    id: "complete",
    render: () => (
      <LessonComplete
        title={salam.title}
        xp={salam.xpReward + 10}
        stars={3}
        streakDays={12}
        unlockedTitle={LESSONS_BY_ID["lesson-foundation-character"]?.title ?? "Wa Alaikum As-Salam"}
        gemsReward={5}
        nextTitle="Next"
        mascotVariant="girl"
        accent={FOUNDATION_ACCENT}
        playSounds={false}
        onContinue={noop}
        onBackToPath={noop}
      />
    )
  },
  {
    id: "complete-goal",
    render: () => (
      <LessonComplete
        title={salam.title}
        xp={10}
        stars={3}
        streakDays={0}
        goal={{ xpToday: 26, goalXp: 40 }}
        unlockedTitle={LESSONS_BY_ID["lesson-foundation-character"]?.title ?? "Wa Alaikum As-Salam"}
        nextTitle="Next"
        mascotVariant="girl"
        accent={FOUNDATION_ACCENT}
        playSounds={false}
        onContinue={noop}
        onBackToPath={noop}
      />
    )
  },
  { id: "quit", render: () => <QuitDemo /> }
];

function readHash() {
  if (Platform.OS !== "web" || typeof window === "undefined") {
    return "";
  }
  return window.location.hash;
}

export default function LessonGallery() {
  const [hash, setHash] = useState(readHash);

  useEffect(() => {
    if (Platform.OS !== "web" || typeof window === "undefined") {
      return undefined;
    }
    const onChange = () => setHash(readHash());
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);

  const stateId = hash.replace(/^#gallery-lesson-?/, "");
  const single = STATES.find((state) => state.id === stateId);
  if (single) {
    return (
      <View style={styles.full} key={single.id}>
        {single.render()}
      </View>
    );
  }

  return (
    <ScrollView style={styles.full} contentContainerStyle={styles.list}>
      {STATES.map((state) => (
        <View key={state.id} style={styles.frameBlock}>
          <Text style={styles.caption}>{state.id}</Text>
          <View style={styles.frame}>{state.render()}</View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  full: {
    flex: 1,
    backgroundColor: colors.snow
  },
  list: {
    paddingVertical: space.lg,
    backgroundColor: colors.mist
  },
  frameBlock: {
    marginBottom: space.xxl
  },
  caption: {
    fontFamily: fonts.bodyHeavy,
    fontSize: 13,
    color: colors.inkSoft,
    paddingHorizontal: space.lg,
    marginBottom: space.xs
  },
  frame: {
    height: 760,
    backgroundColor: colors.snow,
    overflow: "hidden"
  }
});
