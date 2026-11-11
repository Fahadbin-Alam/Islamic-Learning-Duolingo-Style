import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { Animated, PanResponder, ScrollView, StyleSheet, Text, View, type LayoutChangeEvent, type NativeScrollEvent, type NativeSyntheticEvent } from "react-native";
import type { GameSoundEvent } from "../../services/gameSoundLibrary";
import { withHonorifics } from "../ArabicText";
import { GameButton } from "../GameButton";
import type { MascotMood } from "../Mascot";
import { PopIn, useShake } from "../PopIn";
import { Tappable } from "../Tappable";
import { useReduceMotion } from "../motion";
import { haptic, playUi } from "../sound";
import { colors, darken, fonts, lighten, radii, space, topicPalette } from "../theme";
import { ExerciseView, QuestionBubble, useLessonCompact, type ExerciseChoice, type ExerciseResult, type ExerciseViewProps } from "./ExerciseView";
import { answerPart, QUESTION_PART, QuestionTalkContext, useQuestionAloud } from "./questionAloud";
import { WithReadAloud } from "./ReadAloudButton";
import { ReadingContext, ReadRing } from "./ReadGlow";
import type { ReadPart } from "./useReadAloud";
import { CORRECT_TEXT, FeedbackSheet, WRONG_TEXT } from "./FeedbackSheet";
import { useMistakeVoice } from "./useMistakeVoice";
import { LessonBottomBar } from "./LessonHeader";
import { noBreakHyphens, shortWhy } from "./lessonText";
import { CHECK_FALSE, CHECK_TRUE, WRONG_BUILD, formatSeed, type FillPiece, type MatchPair } from "./questionFormats";
import { getActiveLanguage, t } from "../../i18n";
import { textScaled } from "../textScale";
import { choicePictures, type LessonPicture } from "../../data/lessonPictures";
import { AlbumThumb } from "./LessonPhoto";

// The Duolingo-style games a question can be asked as (see questionFormats): fill the gap, the answer with its
// key word missing, true or false on one choice, and a matching round. Each one reports the answer as a choice id, so the
// lesson scores it, takes a heart and shows the answer sheet exactly as it does for tiles.

type ShowProps = {
  mascotVariant: string;
  accent: string;
  /** Asked again from an earlier lesson: a small REVIEW chip; "missed": a question missed before, back again. */
  review?: boolean | "missed";
  /** 0 the first time; more when a missed question comes back. */
  attempt?: number;
  praiseSeed?: string;
  playSound?: boolean;
  continueSound?: GameSoundEvent | false;
  bottomInset?: number;
};

type AnswerProps = {
  selectedChoiceId?: string;
  result?: ExerciseResult;
  onSelect: (choiceId: string) => void;
  onCheck: () => void;
  onContinue: () => void;
};

/** A steady shuffle, never the given order when it can help it. */
function steadyShuffle<T>(items: T[], seedText: string): T[] {
  const seed = formatSeed(seedText);
  const shuffled = items
    .map((item, index) => ({ item, order: formatSeed(`${seed}:${index}`) }))
    .sort((a, b) => a.order - b.order)
    .map((each) => each.item);
  if (shuffled.length > 1 && shuffled.every((item, index) => item === items[index])) {
    shuffled.push(shuffled.shift() as T);
  }
  return shuffled;
}

type TileTone = "idle" | "picked" | "correct" | "wrong" | "used";

/** A word tile with a lip, like the answer tiles. Drag it up (or tap it) to place it, when `onDrop` is set. */
function WordTile({
  label,
  tone,
  accent,
  onPress,
  onDrop,
  disabled,
  picture,
  readPart,
  testID
}: {
  label: string;
  /** A place's small living picture beside the word (the matching game, when every answer is a place). */
  picture?: LessonPicture;
  tone: TileTone;
  accent: string;
  onPress?: () => void;
  /** Called when the tile is dragged up and let go over the sentence. */
  onDrop?: () => void;
  disabled?: boolean;
  /** The tile glows while the teacher says this part (see ReadRing). */
  readPart?: string;
  testID?: string;
}) {
  const drag = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const [dragging, setDragging] = useState(false);
  const drop = useRef(onDrop);
  drop.current = onDrop;
  const responder = useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: (_, gesture) => Boolean(drop.current) && Math.abs(gesture.dy) + Math.abs(gesture.dx) > 8,
        onPanResponderGrant: () => setDragging(true),
        onPanResponderMove: Animated.event([null, { dx: drag.x, dy: drag.y }], { useNativeDriver: false }),
        onPanResponderRelease: (_, gesture) => {
          setDragging(false);
          if (gesture.dy < -40) drop.current?.();
          Animated.spring(drag, { toValue: { x: 0, y: 0 }, friction: 6, tension: 120, useNativeDriver: false }).start();
        },
        onPanResponderTerminate: () => {
          setDragging(false);
          Animated.spring(drag, { toValue: { x: 0, y: 0 }, useNativeDriver: false }).start();
        }
      }),
    [drag]
  );
  const palette = topicPalette(accent);
  const look =
    tone === "correct"
      ? { bg: colors.correctBg, border: lighten(colors.green, 0.2), lip: colors.green, ink: CORRECT_TEXT }
      : tone === "wrong"
        ? { bg: colors.wrongBg, border: lighten(colors.heart, 0.2), lip: colors.heart, ink: WRONG_TEXT }
        : tone === "picked"
          ? { bg: lighten(palette.main, 0.88), border: palette.main, lip: darken(palette.main, 0.15), ink: colors.ink }
          : { bg: colors.white, border: colors.line, lip: colors.lineLip, ink: colors.ink };
  if (tone === "used") {
    return (
      <View style={styles.tileOuter} accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
        <View style={[styles.well, picture ? styles.tileRow : null]}>
          {picture ? <View style={{ width: TILE_PICTURE, height: TILE_PICTURE }} /> : null}
          <Text style={[styles.tileText, styles.hiddenText]}>{label}</Text>
        </View>
      </View>
    );
  }
  return (
    <Animated.View
      style={[styles.tileOuter, dragging ? styles.tileLifted : null, { transform: drag.getTranslateTransform() }]}
      {...(onDrop && !disabled ? responder.panHandlers : {})}
    >
      {readPart ? <ReadRing part={readPart} radius={14} /> : null}
      <Tappable onPress={onPress} disabled={disabled} pressScale={0.94} accessibilityLabel={label} testID={testID} style={styles.tilePress}>
        <View pointerEvents="none" style={[styles.tileLip, { backgroundColor: look.lip }]} />
        <View style={[styles.tileFace, picture ? styles.tileRow : null, { backgroundColor: look.bg, borderColor: look.border }]}>
          {picture ? <AlbumThumb picture={picture} size={TILE_PICTURE} testID={testID ? `${testID}-picture` : undefined} /> : null}
          <Text style={[styles.tileText, picture ? styles.tileTextBeside : null, { color: look.ink }]}>{withHonorifics(noBreakHyphens(label))}</Text>
        </View>
      </Tappable>
    </Animated.View>
  );
}

/** The small label over a game ("Fill in the gap", "True or false?"), with the review / try-again cues. */
export function GameCue({ label, review, attempt, accent }: { label: string; review?: boolean | "missed"; attempt?: number; accent: string }) {
  return (
    <View style={styles.cueRow} testID="game-cue">
      <View style={[styles.cue, { backgroundColor: lighten(accent, 0.85) }]}>
        <Text style={[styles.cueText, { color: darken(accent, 0.4) }]}>{label}</Text>
      </View>
      {review ? (
        <View style={[styles.cue, styles.reviewCue]}>
          <Text style={[styles.cueText, styles.reviewText]}>{t(review === "missed" ? "Missed before" : "Review")}</Text>
        </View>
      ) : null}
      {attempt && attempt > 0 ? (
        <View style={[styles.cue, styles.retryCue]}>
          <Text style={[styles.cueText, styles.retryText]}>{t("Try again!")}</Text>
        </View>
      ) : null}
    </View>
  );
}

/**
 * What a game knows of the room it is drawn in: how tall the scrolling part is (a map fills what is left of it), and a
 * way to keep a point in sight once the answer sheet comes up over the bottom of it (the right place on a map).
 */
export type GameRoom = { height: number; reveal: (contentY: number) => void };

const GameRoomContext = createContext<GameRoom>({ height: 0, reveal: () => undefined });

export function useGameRoom() {
  return useContext(GameRoomContext);
}

const NOTHING_TO_READ: ReadPart[] = [];
/** A gap sentence, glowing while the teacher reads it. */
const SENTENCE_PART = "sentence";

/** The frame every game shares: a scrolling body, CHECK at the bottom, the answer sheet over it. */
export function GameFrame({
  children,
  ready,
  result,
  prompt,
  praiseSeed,
  playSound,
  continueSound,
  bottomInset,
  onCheck,
  onContinue,
  aloud,
  testID
}: {
  children: React.ReactNode;
  ready: boolean;
  result?: ExerciseResult;
  prompt: string;
  /**
   * What the teacher says when the learner taps the speaker by CHECK, part by part (see questionAloudText), each part
   * glowing while it is said. None: no speaker.
   */
  aloud?: ReadPart[];
  praiseSeed?: string;
  playSound?: boolean;
  continueSound?: GameSoundEvent | false;
  bottomInset?: number;
  onCheck: () => void;
  onContinue: () => void;
  testID: string;
}) {
  const [sheetHeight, setSheetHeight] = useState(0);
  const checked = Boolean(result);
  const lastResult = useRef<ExerciseResult | undefined>(result);
  if (result) lastResult.current = result;
  const shown = lastResult.current;
  const why = shown ? (getActiveLanguage() === "en" ? shortWhy({ explanation: shown.why, prompt, correctLabel: shown.correctLabel }) : shown.why) : undefined;
  const voice = useMistakeVoice(checked, Boolean(shown?.correct), shown && !shown.correct ? shown.correctLabel : undefined, shown?.why);
  const reader = useQuestionAloud(aloud ?? NOTHING_TO_READ, checked);
  // The asking teacher's mouth moves with whichever voice is talking: the question's before CHECK, the sheet's after.
  const talkMs = checked ? voice.talkMs : reader.talkMs ?? 0;
  const scroller = useRef<ScrollView>(null);
  const scrolled = useRef(0);
  const [rootHeight, setRootHeight] = useState(0);
  const [viewHeight, setViewHeight] = useState(0);
  const revealAt = useRef<number | undefined>(undefined);
  const room = useMemo<GameRoom>(() => ({ height: viewHeight, reveal: (contentY) => (revealAt.current = contentY) }), [viewHeight]);
  // Once the answer sheet is up, the point the game asked to keep in sight scrolls up above it if the sheet covers it.
  useEffect(() => {
    if (!checked) {
      revealAt.current = undefined;
      return undefined;
    }
    const target = revealAt.current;
    if (target === undefined || !sheetHeight || !viewHeight) return undefined;
    const timer = setTimeout(() => {
      const shownBottom = scrolled.current + Math.min(viewHeight, (rootHeight || viewHeight) - sheetHeight);
      const want = target + space.md;
      if (want > shownBottom) scroller.current?.scrollTo?.({ y: scrolled.current + want - shownBottom, animated: true });
    }, 60);
    return () => clearTimeout(timer);
  }, [checked, rootHeight, sheetHeight, viewHeight]);
  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    scrolled.current = event.nativeEvent.contentOffset.y;
  };
  const onRoot = (event: LayoutChangeEvent) => setRootHeight(Math.round(event.nativeEvent.layout.height));
  const onView = (event: LayoutChangeEvent) => setViewHeight(Math.round(event.nativeEvent.layout.height));
  return (
    <View style={styles.root} testID={testID} onLayout={onRoot}>
      <ScrollView
        ref={scroller}
        style={styles.scroll}
        contentContainerStyle={[styles.content, { paddingBottom: checked && sheetHeight ? sheetHeight : space.xxl }]}
        onLayout={onView}
        onScroll={onScroll}
        scrollEventThrottle={32}
      >
        <QuestionTalkContext.Provider value={talkMs}>
          <ReadingContext.Provider value={reader.lit}>
            <GameRoomContext.Provider value={room}>{children}</GameRoomContext.Provider>
          </ReadingContext.Provider>
        </QuestionTalkContext.Provider>
      </ScrollView>
      <LessonBottomBar bottomInset={bottomInset}>
        <WithReadAloud onRead={reader.onRead} reading={reader.reading} testID="question-read-aloud">
          <GameButton label={t("Check")} fullWidth sound={false} disabled={!ready || checked} onPress={onCheck} testID="exercise-check" />
        </WithReadAloud>
      </LessonBottomBar>
      <FeedbackSheet
        visible={checked}
        correct={Boolean(shown?.correct)}
        correctLabel={shown && !shown.correct ? shown.correctLabel : undefined}
        why={why}
        source={shown?.source}
        onContinue={onContinue}
        praiseSeed={praiseSeed ?? prompt}
        playSound={playSound}
        buttonSound={continueSound}
        bottomInset={bottomInset}
        onHeight={setSheetHeight}
        onListen={voice.onListen}
        listening={voice.listening}
      />
    </View>
  );
}

export type GapGameProps = ShowProps &
  AnswerProps & {
    /** The sentence, with "___" where the answer goes. */
    prompt: string;
    choices: ExerciseChoice[];
    correctChoiceId: string;
    /** A question the sentence answers: shown in the bubble in place of "Drag the right word into the gap!". */
    question?: string;
    testID?: string;
  };

/** Fill the gap: drag a word tile up into the sentence, or tap it. Tap the word in the gap to take it out. */
export function GapGame({ prompt, choices, correctChoiceId, question, testID, selectedChoiceId, result, onSelect, onCheck, onContinue, mascotVariant, accent, review, attempt, praiseSeed, playSound, continueSound, bottomInset }: GapGameProps) {
  const { compact } = useLessonCompact();
  const [before, ...rest] = prompt.split(/_{2,}/);
  const after = rest.join("____");
  const placed = choices.find((choice) => choice.id === selectedChoiceId);
  const checked = Boolean(result);
  const mood: MascotMood = !result ? "think" : result.correct ? "cheer" : "sad";
  const tiles = useMemo(() => steadyShuffle(choices, `${prompt}|${attempt ?? 0}`), [choices, prompt, attempt]);
  const { style: shakeStyle, shake } = useShake(8);
  useEffect(() => {
    if (result && !result.correct) shake();
  }, [result, shake]);
  const gapTone: TileTone = !result ? "picked" : placed?.id === correctChoiceId ? "correct" : "wrong";
  const palette = topicPalette(accent);
  return (
    <GameFrame
      ready={Boolean(placed)}
      result={result}
      prompt={question ?? prompt}
      // Read out: the question (when there is one), the sentence with a pause for its gap, then the words as they show.
      aloud={[{ key: QUESTION_PART, text: question }, { key: SENTENCE_PART, text: prompt }, ...tiles.map((choice) => ({ key: answerPart(choice.id), text: choice.label }))]}
      praiseSeed={praiseSeed}
      playSound={playSound}
      continueSound={continueSound}
      bottomInset={bottomInset}
      onCheck={onCheck}
      onContinue={onContinue}
      testID={testID ?? "gap-game"}
    >
      <GameCue label={t("Fill in the gap")} review={review} attempt={attempt} accent={accent} />
      <QuestionBubble prompt={question ?? t("Drag the right word into the gap!")} mascotVariant={mascotVariant} accent={accent} mood={mood} hideMascot={compact} pick={selectedChoiceId} />
      <PopIn from="up" delay={80}>
        <Animated.View style={[styles.sentence, shakeStyle]} testID="gap-sentence">
          <ReadRing part={SENTENCE_PART} radius={radii.tile} inset={6} />
          <Text style={styles.sentenceText}>
            {withHonorifics(noBreakHyphens(before ?? ""))}
            <Text
              onPress={placed && !checked ? () => onSelect("") : undefined}
              style={[
                styles.gap,
                placed
                  ? {
                      color: gapTone === "correct" ? CORRECT_TEXT : gapTone === "wrong" ? WRONG_TEXT : darken(palette.main, 0.35),
                      backgroundColor: gapTone === "correct" ? colors.correctBg : gapTone === "wrong" ? colors.wrongBg : lighten(palette.main, 0.85)
                    }
                  : null
              ]}
              testID="gap-slot"
            >
              {placed ? ` ${withHonorifics(placed.label)} ` : "    "}
            </Text>
            {withHonorifics(noBreakHyphens(after))}
          </Text>
        </Animated.View>
      </PopIn>
      <View style={styles.bank} testID="gap-bank">
        {tiles.map((choice) => (
          <WordTile
            key={choice.id}
            label={choice.label}
            tone={placed?.id === choice.id ? "used" : "idle"}
            accent={accent}
            disabled={checked}
            onPress={() => onSelect(choice.id)}
            onDrop={() => onSelect(choice.id)}
            readPart={answerPart(choice.id)}
            testID={`choice-${choice.id}`}
          />
        ))}
      </View>
    </GameFrame>
  );
}

export type FillGameProps = ShowProps &
  AnswerProps & {
    /** The question, shown in the bubble. */
    prompt: string;
    /** The answer with its key word missing, and the words to pick from (questionFormats.fillPiece). */
    fill: FillPiece;
    correctChoiceId: string;
  };

/**
 * The answer with its key word missing: the question in the bubble, the answer under it with a gap, and a few
 * words to tap (or drag) into the gap. One tap answers, so the learner recalls the fact, not word order.
 */
export function FillGame({ prompt, fill, correctChoiceId, result, onSelect, ...rest }: FillGameProps) {
  const choices = useMemo(() => fill.options.map((label) => ({ id: `fill:${label}`, label })), [fill]);
  const rightId = `fill:${fill.piece}`;
  const [picked, setPicked] = useState<string | undefined>(undefined);
  return (
    <GapGame
      {...rest}
      testID="fill-game"
      question={prompt}
      prompt={`${fill.before}____${fill.after}`}
      choices={choices}
      correctChoiceId={rightId}
      selectedChoiceId={picked}
      result={result}
      onSelect={(id) => {
        setPicked(id || undefined);
        onSelect(!id ? "" : id === rightId ? correctChoiceId : WRONG_BUILD);
      }}
    />
  );
}

export type CheckGameProps = Omit<ExerciseViewProps, "kind" | "choices" | "correctChoiceId" | "selectedChoiceId" | "onSelect"> & {
  /** The choice shown with the question. */
  shown: ExerciseChoice;
  /** Whether the shown choice is the right answer. */
  shownIsRight: boolean;
  /** Called with True or False (CHECK_TRUE / CHECK_FALSE). */
  onJudge: (judged: string) => void;
  judged?: string;
};

/** True or false: the question with one choice shown, "Is it ...?". */
export function CheckGame({ prompt, shown, shownIsRight, onJudge, judged, ...rest }: CheckGameProps) {
  const choices = useMemo(() => [{ id: CHECK_TRUE, label: t("True") }, { id: CHECK_FALSE, label: t("False") }], []);
  return (
    <ExerciseView
      {...rest}
      kind="true_false"
      prompt={`${prompt}\n${t("Is it “{answer}”?", { answer: shown.label })}`}
      choices={choices}
      correctChoiceId={shownIsRight ? CHECK_TRUE : CHECK_FALSE}
      selectedChoiceId={judged}
      onSelect={onJudge}
    />
  );
}

export type MatchGameProps = {
  pairs: MatchPair[];
  mascotVariant: string;
  accent: string;
  /** CONTINUE once every pair is matched. */
  onDone: () => void;
  /** Each wrong pairing (no heart: it only shakes). */
  onMiss?: () => void;
  playSound?: boolean;
  bottomInset?: number;
};

/** A matching round: tap a question, then its answer (or the other way round), until all are paired. */
export function MatchGame({ pairs, mascotVariant, accent, onDone, onMiss, playSound = true, bottomInset }: MatchGameProps) {
  const { compact } = useLessonCompact();
  const answers = useMemo(() => steadyShuffle(pairs, pairs.map((pair) => pair.right).join("|")), [pairs]);
  const [matched, setMatched] = useState<number[]>([]);
  const [question, setQuestion] = useState<number | undefined>(undefined);
  const [answer, setAnswer] = useState<number | undefined>(undefined);
  const [wrong, setWrong] = useState<{ question: number; answer: number } | undefined>(undefined);
  const [misses, setMisses] = useState(0);
  const { style: shakeStyle, shake } = useShake(8);
  const done = matched.length === pairs.length;
  const palette = topicPalette(accent);
  // Every answer a different place with a picture: each answer tile shows its place, moving.
  const pictures = useMemo(() => choicePictures(pairs.map((pair) => ({ id: String(pair.index), label: pair.right }))), [pairs]);
  // Each pair matched: the teacher jumps for joy for a moment and a "sparkle" plays (the last one gets the sheet).
  const [joy, setJoy] = useState(0);
  useEffect(() => {
    if (!joy) return undefined;
    const timer = setTimeout(() => setJoy(0), 700);
    return () => clearTimeout(timer);
  }, [joy]);

  useEffect(() => {
    if (!wrong) return undefined;
    const timer = setTimeout(() => setWrong(undefined), 600);
    return () => clearTimeout(timer);
  }, [wrong]);

  const tryPair = (q: number | undefined, a: number | undefined) => {
    if (q === undefined || a === undefined) return;
    if (q === a) {
      setMatched((list) => [...list, q]);
      setJoy((count) => count + 1);
      if (playSound && matched.length + 1 < pairs.length) playUi("sparkle");
      haptic("success");
    } else {
      haptic("error");
      setWrong({ question: q, answer: a });
      setMisses((count) => count + 1);
      shake();
      onMiss?.();
    }
    setQuestion(undefined);
    setAnswer(undefined);
  };
  const pickQuestion = (index: number) => {
    if (done || matched.includes(index)) return;
    if (answer !== undefined) tryPair(index, answer);
    else setQuestion(question === index ? undefined : index);
  };
  const pickAnswer = (index: number) => {
    if (done || matched.includes(index)) return;
    if (question !== undefined) tryPair(question, index);
    else setAnswer(answer === index ? undefined : index);
  };

  return (
    <View style={styles.root} testID="match-game">
      <ScrollView style={styles.scroll} contentContainerStyle={[styles.content, { paddingBottom: space.xxxl * 3 }]}>
        <GameCue label={t("Match the pairs")} accent={accent} />
        <QuestionBubble prompt={t("Tap a question, then its answer!")} mascotVariant={mascotVariant} accent={accent} mood={done || joy ? "cheer" : "think"} hideMascot={compact} />
        <Animated.View style={[styles.matchList, shakeStyle]}>
          {pairs.map((pair) => {
            const isMatched = matched.includes(pair.index);
            const isPicked = question === pair.index;
            const isWrong = wrong?.question === pair.index;
            return (
              <MatchPop key={pair.index} matched={isMatched}>
              <Tappable
                onPress={() => pickQuestion(pair.index)}
                disabled={isMatched}
                pressScale={0.97}
                accessibilityLabel={pair.left}
                testID={`match-question-${pair.index}`}
                style={[
                  styles.matchCard,
                  isPicked ? { borderColor: palette.main, backgroundColor: lighten(palette.main, 0.9) } : null,
                  isMatched ? styles.matchCardDone : null,
                  isWrong ? styles.matchCardWrong : null
                ]}
              >
                <Text style={styles.matchQuestion}>{withHonorifics(noBreakHyphens(pair.left))}</Text>
                {isMatched ? (
                  <PopIn from="up" distance={8} style={pictures ? styles.matchAnswerRow : undefined}>
                    {pictures ? <AlbumThumb picture={pictures[String(pair.index)]} size={MATCHED_PICTURE} testID="match-answer-picture" /> : null}
                    <Text style={[styles.matchAnswer, pictures ? styles.matchAnswerBeside : null]}>{withHonorifics(pair.right)}</Text>
                  </PopIn>
                ) : null}
              </Tappable>
              </MatchPop>
            );
          })}
        </Animated.View>
        <View style={styles.bank}>
          {answers.map((pair) => (
            <WordTile
              key={pair.index}
              label={pair.right}
              picture={pictures?.[String(pair.index)]}
              tone={matched.includes(pair.index) ? "used" : wrong?.answer === pair.index ? "wrong" : answer === pair.index ? "picked" : "idle"}
              accent={accent}
              onPress={() => pickAnswer(pair.index)}
              testID={`match-answer-${pair.index}`}
            />
          ))}
        </View>
      </ScrollView>
      <FeedbackSheet
        visible={done}
        correct
        title={misses === 0 ? t("All matched!") : t("All matched! {count} tries to get there.", { count: misses + pairs.length })}
        onContinue={onDone}
        playSound={playSound}
        bottomInset={bottomInset}
      />
    </View>
  );
}

/** A card that just got its answer gives a happy little bounce. */
function MatchPop({ matched, children }: { matched: boolean; children: React.ReactNode }) {
  const reduceMotion = useReduceMotion();
  const scale = useRef(new Animated.Value(1)).current;
  const was = useRef(matched);
  useEffect(() => {
    if (matched === was.current) return undefined;
    was.current = matched;
    if (!matched || reduceMotion) return undefined;
    scale.setValue(0.94);
    const run = Animated.spring(scale, { toValue: 1, friction: 3, tension: 200, useNativeDriver: true });
    run.start();
    return () => run.stop();
  }, [matched, reduceMotion, scale]);
  return <Animated.View style={{ transform: [{ scale }] }}>{children}</Animated.View>;
}

const TILE_LIP = 4;
/** A place's picture on an answer tile, and beside a matched answer. */
const TILE_PICTURE = 40;
const MATCHED_PICTURE = 28;

const styles = textScaled(StyleSheet.create({
  root: { flex: 1, position: "relative", backgroundColor: colors.snow },
  scroll: { flex: 1 },
  content: { paddingHorizontal: space.lg, paddingTop: space.sm },
  cueRow: { flexDirection: "row", flexWrap: "wrap", gap: 6, marginBottom: space.sm },
  cue: { borderRadius: radii.pill, paddingHorizontal: 10, paddingVertical: 3 },
  cueText: { fontFamily: fonts.bodyHeavy, fontSize: 13, letterSpacing: 0.4, textTransform: "uppercase" },
  reviewCue: { backgroundColor: lighten(colors.gem, 0.85) },
  reviewText: { color: darken(colors.gem, 0.45) },
  retryCue: { backgroundColor: lighten(colors.flame, 0.85) },
  retryText: { color: darken(colors.flame, 0.3) },
  sentence: {
    marginTop: space.md,
    borderWidth: 2,
    borderColor: colors.line,
    borderRadius: radii.tile,
    backgroundColor: colors.mist,
    padding: space.md
  },
  sentenceText: { fontFamily: fonts.bodyBold, fontSize: 19, lineHeight: 30, color: colors.ink },
  gap: {
    fontFamily: fonts.bodyHeavy,
    textDecorationLine: "underline",
    textDecorationStyle: "dashed",
    backgroundColor: colors.white
  },
  bank: { marginTop: space.lg, flexDirection: "row", flexWrap: "wrap", justifyContent: "center" },
  tileOuter: { margin: 4, maxWidth: "100%" },
  tileLifted: { zIndex: 10, elevation: 6 },
  tilePress: { position: "relative", paddingBottom: TILE_LIP, maxWidth: "100%" },
  tileLip: { position: "absolute", left: 0, right: 0, top: TILE_LIP, bottom: 0, borderRadius: 14 },
  tileFace: { borderWidth: 2, borderRadius: 14, paddingHorizontal: 14, paddingVertical: 8, minHeight: 46, justifyContent: "center", maxWidth: "100%" },
  tileText: { fontFamily: fonts.bodyHeavy, fontSize: 17, lineHeight: 22 },
  tileRow: { flexDirection: "row", alignItems: "center", gap: 8, paddingLeft: 6 },
  tileTextBeside: { flexShrink: 1 },
  hiddenText: { color: "transparent" },
  well: {
    borderRadius: 14,
    backgroundColor: colors.locked,
    borderWidth: 2,
    borderColor: colors.locked,
    paddingHorizontal: 14,
    paddingVertical: 8,
    minHeight: 46,
    marginTop: TILE_LIP,
    justifyContent: "center"
  },
  matchList: { marginTop: space.md, gap: space.sm },
  matchCard: {
    borderWidth: 2,
    borderColor: colors.line,
    borderBottomWidth: 4,
    borderRadius: radii.tile,
    backgroundColor: colors.white,
    paddingHorizontal: space.md,
    paddingVertical: space.sm
  },
  matchCardDone: { borderColor: lighten(colors.green, 0.2), backgroundColor: colors.correctBg },
  matchCardWrong: { borderColor: lighten(colors.heart, 0.2), backgroundColor: colors.wrongBg },
  matchQuestion: { fontFamily: fonts.bodyBold, fontSize: 16, lineHeight: 22, color: colors.ink },
  matchAnswer: { marginTop: 4, fontFamily: fonts.bodyHeavy, fontSize: 16, lineHeight: 21, color: CORRECT_TEXT },
  matchAnswerRow: { flexDirection: "row", alignItems: "center", gap: 8, marginTop: 4 },
  matchAnswerBeside: { marginTop: 0, flexShrink: 1 }
}));
