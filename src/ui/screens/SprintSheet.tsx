import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react";
import { Animated, Easing, PanResponder, Platform, ScrollView, StyleSheet, Text, View, useWindowDimensions, type ViewStyle } from "react-native";
import { t } from "../../i18n";
import { comboSound } from "../../services/gameSoundLibrary";
import {
  SPRINT_BONUS_EVERY,
  SPRINT_BONUS_SECONDS,
  SPRINT_SECONDS,
  recordSprint,
  sprintRecord,
  sprintXp,
  useSprintRecord,
  type SprintCard
} from "../../services/swipeSprint";
import { getLessonPicture } from "../../data/lessonPictures";
import { withHonorifics } from "../ArabicText";
import { Confetti } from "../Confetti";
import { GameButton } from "../GameButton";
import { Icon } from "../Icon";
import { Mascot, type MascotAct } from "../Mascot";
import { useReduceMotion } from "../motion";
import { PopIn } from "../PopIn";
import { Sheet } from "../Sheet";
import { feedback } from "../sound";
import { Tappable } from "../Tappable";
import { textScaled } from "../textScale";
import { colors, darken, fonts, lighten, radii, space } from "../theme";
import { CardPicture } from "../lesson/LessonPhoto";
import { TapToPlay } from "../lesson/Teacher";
import { formatNumber } from "./FormattedCount";
import { useBackToClose } from "./sheetParts";

/** How far a card is dragged before letting go throws it. */
const SWIPE_DISTANCE = 96;
const FLING_MS = 190;
const COUNT_FROM = 3;
const COUNT_MS = 650;
/** How long the right answer to a miss stays under the buttons. */
const MISS_NOTE_MS = 3500;
const MISSES_SHOWN = 5;
/** A card this tall or taller has room for a picture of the place its question names. */
const ROOM_FOR_PICTURE = 290;
/** Phones shorter than this get a smaller teacher, buttons and note, so the card keeps its room. */
const SHORT_SCREEN = 700;
/** The room kept above the card for the tick or cross that says if an answer was right. */
const FLASH_ROOM = 60;
const FLASH_ROOM_SHORT = 44;
// A mouse dragging a card on the web would select the words under it.
const NO_SELECT = (Platform.OS === "web" ? { userSelect: "none" } : {}) as ViewStyle;

type Phase = { kind: "ready" } | { kind: "count"; left: number } | { kind: "play" } | { kind: "done" };

type Result = { right: number; xp: number; newBest: boolean; best: number; outOfCards: boolean };

export type SprintFinish = { right: number; answered: number; xp: number };

/** The answer to say after a miss: a true or false sentence's is "True" or "False" in the learner's language. */
function answerText(card: SprintCard) {
  return card.trueFalse ? t(card.answer) : card.answer;
}

/**
 * The swipe sprint: a minute of quick cards from the learner's finished lessons. Each card shows a question with one
 * answer (or a true or false sentence): swipe it to the tick if that is right, to the cross if not (or tap them).
 * Right answers in a row light a combo, and every SPRINT_BONUS_EVERY of them adds a few seconds. When time is up:
 * the score, the best on this phone, a little practice XP, and the answers to the misses, to remember.
 */
export function SprintSheet({
  visible,
  onClose,
  makeCards,
  onFinish,
  mascotVariant = "girl",
  accent = colors.gem,
  topGap = 40,
  bottomInset = 0
}: {
  visible: boolean;
  onClose: () => void;
  /** A new sprint's cards (each sprint gets a new shuffle). */
  makeCards: () => SprintCard[];
  /** A sprint played to the end: the app pays its XP. Not called when the sheet is closed part way. */
  onFinish?: (finish: SprintFinish) => void;
  mascotVariant?: string;
  accent?: string;
  topGap?: number;
  bottomInset?: number;
}) {
  useBackToClose(visible, onClose);
  const reduceMotion = useReduceMotion();
  const short = useWindowDimensions().height < SHORT_SCREEN;
  const record = useSprintRecord();
  const [phase, setPhase] = useState<Phase>({ kind: "ready" });
  const [cards, setCards] = useState<SprintCard[]>([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [misses, setMisses] = useState<SprintCard[]>([]);
  const [missNote, setMissNote] = useState<SprintCard | undefined>(undefined);
  const [act, setAct] = useState<MascotAct | undefined>(undefined);
  const [flash, setFlash] = useState<{ right: boolean; key: number } | undefined>(undefined);
  const [bonusKey, setBonusKey] = useState(0);
  const [result, setResult] = useState<Result | undefined>(undefined);
  const [roomy, setRoomy] = useState(true);
  const endsAt = useRef(0);
  const finished = useRef(true);
  const scoreRef = useRef(0);
  const comboRef = useRef(0);
  const answered = useRef(0);
  const top = useRef<SwipeCardHandle>(null);
  const finishRef = useRef(onFinish);
  finishRef.current = onFinish;

  // Closed: back to the start, and a sprint left part way pays nothing.
  useEffect(() => {
    if (visible) return;
    finished.current = true;
    setPhase({ kind: "ready" });
    setResult(undefined);
    setMissNote(undefined);
    setFlash(undefined);
    setAct(undefined);
  }, [visible]);

  // 3, 2, 1, go.
  useEffect(() => {
    if (!visible || phase.kind !== "count") return undefined;
    const timer = setTimeout(() => {
      if (phase.left > 1) {
        setPhase({ kind: "count", left: phase.left - 1 });
        return;
      }
      endsAt.current = Date.now() + SPRINT_SECONDS * 1000;
      setPhase({ kind: "play" });
    }, reduceMotion ? 250 : COUNT_MS);
    return () => clearTimeout(timer);
  }, [phase, visible, reduceMotion]);

  // The tick or the cross pops over the cards for a moment; a miss's right answer stays a little longer.
  useEffect(() => {
    if (!flash) return undefined;
    const timer = setTimeout(() => setFlash(undefined), 450);
    return () => clearTimeout(timer);
  }, [flash]);
  useEffect(() => {
    if (!missNote) return undefined;
    const timer = setTimeout(() => setMissNote(undefined), MISS_NOTE_MS);
    return () => clearTimeout(timer);
  }, [missNote]);

  const start = () => {
    const next = makeCards();
    finished.current = false;
    scoreRef.current = 0;
    comboRef.current = 0;
    answered.current = 0;
    setCards(next);
    setIndex(0);
    setScore(0);
    setCombo(0);
    setMisses([]);
    setMissNote(undefined);
    setFlash(undefined);
    setResult(undefined);
    setAct(undefined);
    feedback("pop", "light");
    setPhase({ kind: "count", left: COUNT_FROM });
  };

  const finish = useCallback(
    (outOfCards: boolean) => {
      if (finished.current) return;
      finished.current = true;
      const right = scoreRef.current;
      const before = sprintRecord().best;
      const newBest = recordSprint(right) && right > 0;
      const xp = sprintXp(right);
      setResult({ right, xp, newBest, best: Math.max(before, right), outOfCards });
      setMissNote(undefined);
      setPhase({ kind: "done" });
      setAct(right > 0 ? { kind: "celebrate", key: "done" } : undefined);
      feedback(newBest ? "perfect" : "lesson_complete", "success");
      finishRef.current?.({ right, answered: answered.current, xp });
    },
    []
  );

  const onSwiped = (yes: boolean) => {
    if (phase.kind !== "play" || finished.current) return;
    const card = cards[index];
    if (!card) return;
    const good = yes === card.yes;
    answered.current += 1;
    const key = answered.current;
    if (good) {
      scoreRef.current += 1;
      comboRef.current += 1;
      setScore(scoreRef.current);
      setCombo(comboRef.current);
      setAct({ kind: "celebrate", key });
      feedback(comboSound(comboRef.current), "success");
      // Every few right in a row: a little more time.
      if (comboRef.current % SPRINT_BONUS_EVERY === 0) {
        endsAt.current += SPRINT_BONUS_SECONDS * 1000;
        setBonusKey(key);
      }
    } else {
      comboRef.current = 0;
      setCombo(0);
      setMisses((list) => [...list, card]);
      setMissNote(card);
      setAct({ kind: "no", key });
      feedback("wrong", "error");
    }
    setFlash({ right: good, key });
    setIndex(index + 1);
    if (index + 1 >= cards.length) finish(true);
  };

  const card = cards[index];
  const nextCard = cards[index + 1];

  return (
    <Sheet visible={visible} onClose={onClose} bottomInset={0} style={[styles.sheet, { top: topGap, paddingBottom: 0 }]} testID="sprint-sheet">
      <View style={styles.header}>
        <Icon name="stopwatch" size={26} />
        <Text style={styles.heading} accessibilityRole="header" numberOfLines={1}>
          {t("Swipe sprint")}
        </Text>
        <Tappable onPress={onClose} accessibilityLabel={t("Close")} testID="sprint-close" style={styles.close} hitSlop={8} pressScale={0.88}>
          <Icon name="close" size={22} color={colors.inkSoft} />
        </Tappable>
      </View>

      {phase.kind === "ready" ? (
        <ScrollView style={styles.scroll} contentContainerStyle={[styles.readyContent, { paddingBottom: 28 + bottomInset }]} showsVerticalScrollIndicator={false}>
          <View style={styles.teacherRow}>
            <TapToPlay testID="sprint-teacher">{(tapMood) => <Mascot variant={mascotVariant} accent={accent} size={92} mood={tapMood ?? "happy"} />}</TapToPlay>
            <View style={styles.bubble}>
              <Text style={styles.bubbleText}>{t("60 seconds. How many can you get right?")}</Text>
            </View>
          </View>
          <SwipeHint />
          <Text style={styles.howLine}>{t("Swipe the card to the tick if the answer is right, or to the cross if it is not.")}</Text>
          {record.best > 0 ? (
            <View style={styles.bestPill} testID="sprint-best">
              <Icon name="trophy" size={18} />
              <Text style={styles.bestText}>{t("Best: {count}", { count: formatNumber(record.best) })}</Text>
            </View>
          ) : null}
          <GameButton label={t("Start")} icon="play" fullWidth onPress={start} testID="sprint-start" />
        </ScrollView>
      ) : null}

      {phase.kind === "count" ? (
        <View style={styles.countWrap}>
          <PopIn key={`count-${phase.left}`} from="scale">
            <Text style={[styles.count, { color: accent }]} testID="sprint-count">
              {formatNumber(phase.left)}
            </Text>
          </PopIn>
        </View>
      ) : null}

      {phase.kind === "play" ? (
        <View style={[styles.play, NO_SELECT, { paddingBottom: (short ? 10 : 16) + bottomInset }]} testID="sprint-play">
          <View style={styles.playTop}>
            <Mascot variant={mascotVariant} accent={accent} size={short ? 46 : 58} mood={combo >= 3 ? "cheer" : "happy"} act={act} />
            <View style={styles.playMeters}>
              <SprintClock endsAt={endsAt} running={visible && phase.kind === "play"} onTimeUp={() => finish(false)} accent={accent} />
              <View style={styles.scoreRow}>
                <Text style={styles.score} testID="sprint-score">
                  {t("{count} right", { count: formatNumber(score) })}
                </Text>
                {combo >= 2 ? (
                  <PopIn key={`combo-${combo}`} from="scale" style={styles.combo}>
                    <Icon name="flame" size={16} />
                    <Text style={styles.comboText} testID="sprint-combo">
                      {t("{count} right in a row!", { count: formatNumber(combo) })}
                    </Text>
                  </PopIn>
                ) : null}
              </View>
            </View>
          </View>

          <View style={[styles.stack, { paddingTop: short ? FLASH_ROOM_SHORT : FLASH_ROOM }]}>
            <View style={styles.deck} onLayout={(event) => setRoomy(event.nativeEvent.layout.height >= ROOM_FOR_PICTURE)}>
              {/* The next card waits underneath, its edge showing: a deck to work through. */}
              {nextCard ? <View style={[styles.card, styles.cardBehind]} pointerEvents="none" /> : null}
              {card ? <SwipeCard key={`${card.id}-${index}`} ref={top} card={card} onSwiped={onSwiped} picture={roomy} short={short} /> : null}
              {/* Right or not, just above the card, in the room the stack keeps for it. */}
              {flash ? (
                <View style={[styles.flashWrap, { top: -(short ? FLASH_ROOM_SHORT : FLASH_ROOM) + 2 }]} pointerEvents="none">
                  <PopIn key={flash.key} from="scale" style={[styles.flash, short ? styles.flashShort : null, { backgroundColor: flash.right ? colors.green : colors.heart }]}>
                    <Icon name={flash.right ? "check" : "close"} size={short ? 24 : 30} color={colors.white} />
                  </PopIn>
                </View>
              ) : null}
            </View>
            {bonusKey ? (
              <View style={styles.bonusWrap} pointerEvents="none">
                <BonusPop key={bonusKey} />
              </View>
            ) : null}
          </View>

          <View style={[styles.answerRow, short ? styles.answerRowShort : null]}>
            <Tappable onPress={() => top.current?.fling(false)} style={[styles.round, short ? styles.roundShort : null, styles.roundNo]} pressScale={0.9} accessibilityRole="button" accessibilityLabel={t("Not right")} testID="sprint-no">
              <Icon name="close" size={short ? 28 : 34} color={colors.white} />
            </Tappable>
            <Tappable onPress={() => top.current?.fling(true)} style={[styles.round, short ? styles.roundShort : null, styles.roundYes]} pressScale={0.9} accessibilityRole="button" accessibilityLabel={t("Right")} testID="sprint-yes">
              <Icon name="check" size={short ? 28 : 34} color={colors.white} />
            </Tappable>
          </View>
          <View style={[styles.missSlot, short ? styles.missSlotShort : null]}>
            {missNote ? (
              // The card missed has gone, so the note names its question too.
              <PopIn key={`miss-${missNote.id}`} from="up">
                <View style={styles.missBox} testID="sprint-miss">
                  <Text style={[styles.missQuestion, short ? styles.missQuestionShort : null]} numberOfLines={1}>
                    {withHonorifics(missNote.prompt)}
                  </Text>
                  <Text style={[styles.missNote, short ? styles.missNoteShort : null]} numberOfLines={short ? 1 : 2}>
                    {withHonorifics(t("The right answer is: {answer}.", { answer: answerText(missNote) }))}
                  </Text>
                </View>
              </PopIn>
            ) : null}
          </View>
        </View>
      ) : null}

      {phase.kind === "done" && result ? (
        <ScrollView style={styles.scroll} contentContainerStyle={[styles.resultContent, { paddingBottom: 28 + bottomInset }]} showsVerticalScrollIndicator={false} testID="sprint-result">
          <Mascot variant={mascotVariant} accent={accent} size={96} mood={result.right > 0 ? "cheer" : "happy"} act={act} />
          <Text style={styles.resultHead}>{result.outOfCards ? t("You answered every card!") : t("Time's up!")}</Text>
          <Text style={[styles.resultScore, { color: darken(accent, 0.2) }]} testID="sprint-result-score">
            {t("{count} right", { count: formatNumber(result.right) })}
          </Text>
          {result.newBest ? (
            <PopIn from="scale" delay={250} style={styles.ribbon}>
              <View style={styles.ribbonBadge}>
                <Icon name="trophy" size={20} />
              </View>
              <Text style={styles.ribbonText} testID="sprint-new-best">
                {t("New best!")}
              </Text>
            </PopIn>
          ) : (
            <Text style={styles.resultBest} testID="sprint-result-best">
              {t("Best: {count}", { count: formatNumber(result.best) })}
            </Text>
          )}
          {result.xp > 0 ? (
            <View style={styles.xpChip} testID="sprint-xp">
              <Icon name="bolt" size={18} />
              <Text style={styles.xpText}>{t("{count} XP", { count: `+${formatNumber(result.xp)}` })}</Text>
            </View>
          ) : null}
          {misses.length ? (
            <View style={styles.misses} testID="sprint-misses">
              <Text style={styles.missesHead}>{t("To remember")}</Text>
              {misses.slice(0, MISSES_SHOWN).map((miss) => (
                <View key={miss.id} style={styles.missRow}>
                  <Text style={styles.missPrompt}>{withHonorifics(miss.prompt)}</Text>
                  <Text style={styles.missAnswer}>{withHonorifics(t("The right answer is: {answer}.", { answer: answerText(miss) }))}</Text>
                </View>
              ))}
            </View>
          ) : null}
          <View style={styles.resultButtons}>
            <GameButton label={t("Play again")} icon="repeat" fullWidth onPress={start} testID="sprint-again" />
            <GameButton label={t("Done")} variant="secondary" fullWidth onPress={onClose} testID="sprint-done" />
          </View>
          {result.newBest && !reduceMotion ? <Confetti active count={36} /> : null}
        </ScrollView>
      ) : null}
    </Sheet>
  );
}

/** The time left: a bar that runs down (red in the last ten seconds) and the seconds. Only this redraws as it ticks. */
function SprintClock({ endsAt, running, onTimeUp, accent }: { endsAt: React.MutableRefObject<number>; running: boolean; onTimeUp: () => void; accent: string }) {
  const [now, setNow] = useState(() => Date.now());
  const up = useRef(onTimeUp);
  up.current = onTimeUp;
  useEffect(() => {
    if (!running) return undefined;
    setNow(Date.now());
    const timer = setInterval(() => {
      const at = Date.now();
      setNow(at);
      if (at >= endsAt.current) up.current();
    }, 100);
    return () => clearInterval(timer);
  }, [running, endsAt]);
  const left = Math.max(0, endsAt.current - now);
  const share = Math.min(1, left / (SPRINT_SECONDS * 1000));
  const seconds = Math.ceil(left / 1000);
  const hurry = seconds <= 10;
  return (
    <View style={styles.clock} accessible accessibilityLabel={t("{count} seconds left", { count: formatNumber(seconds) })}>
      <View style={styles.clockTrack}>
        <View style={[styles.clockFill, { width: `${share * 100}%`, backgroundColor: hurry ? colors.heart : accent }]} />
      </View>
      <Text style={[styles.clockText, hurry ? styles.clockHurry : null]} testID="sprint-time">
        {formatNumber(seconds)}
      </Text>
    </View>
  );
}

/** "+3 seconds!" rising from the cards when a combo earns time. */
function BonusPop() {
  const reduceMotion = useReduceMotion();
  const rise = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (reduceMotion) return undefined;
    const run = Animated.timing(rise, { toValue: 1, duration: 1100, easing: Easing.out(Easing.quad), useNativeDriver: true });
    run.start();
    return () => run.stop();
  }, [rise, reduceMotion]);
  return (
    <Animated.View
      style={[
        styles.bonus,
        reduceMotion
          ? null
          : {
              opacity: rise.interpolate({ inputRange: [0, 0.15, 0.75, 1], outputRange: [0, 1, 1, 0] }),
              transform: [{ translateY: rise.interpolate({ inputRange: [0, 1], outputRange: [10, -36] }) }]
            }
      ]}
    >
      <Icon name="stopwatch" size={18} />
      <Text style={styles.bonusText} testID="sprint-bonus">
        {t("+{count} seconds!", { count: formatNumber(SPRINT_BONUS_SECONDS) })}
      </Text>
    </Animated.View>
  );
}

/**
 * What a card says: its topic, the living picture of a place the question names (when there is room), and the
 * question with the answer to judge, or a sentence to call true or false.
 */
function CardFace({ card, picture: roomForPicture, short }: { card: SprintCard; picture: boolean; short: boolean }) {
  const { height } = useWindowDimensions();
  const long = card.prompt.length > 100;
  const picture = roomForPicture && card.pictureId ? getLessonPicture(card.pictureId) : undefined;
  return (
    <>
      {card.topic ? (
        <View style={[styles.topicChip, { backgroundColor: lighten(card.topic.accent, 0.86) }]} testID="sprint-topic">
          <Text style={[styles.topicText, { color: darken(card.topic.accent, 0.38) }]} numberOfLines={1}>
            {card.topic.title}
          </Text>
        </View>
      ) : null}
      {picture ? <CardPicture picture={picture} height={Math.round(Math.min(124, Math.max(84, (height || 800) * 0.14)))} testID="sprint-picture" /> : null}
      {card.trueFalse ? <Text style={styles.eyebrow}>{t("True or false?")}</Text> : null}
      <Text style={[styles.prompt, short ? styles.promptShort : null, long ? (short ? styles.promptLongShort : styles.promptLong) : null]} testID="sprint-prompt">
        {withHonorifics(card.prompt)}
      </Text>
      {card.shown !== undefined ? (
        <View style={styles.shownBox}>
          <Text style={styles.shown} testID="sprint-shown">
            {withHonorifics(t("Is it “{answer}”?", { answer: card.shown }))}
          </Text>
        </View>
      ) : null}
    </>
  );
}

type SwipeCardHandle = { fling: (yes: boolean) => void };

/**
 * The card on top: drag it sideways and it tilts, showing a green tick or a red cross; let go past SWIPE_DISTANCE (or
 * with a flick) and it flies off that way. The tick and cross buttons throw it the same way.
 */
const SwipeCard = forwardRef<SwipeCardHandle, { card: SprintCard; onSwiped: (yes: boolean) => void; picture: boolean; short: boolean }>(function SwipeCard({ card, onSwiped, picture, short }, ref) {
  const reduceMotion = useReduceMotion();
  const { width } = useWindowDimensions();
  const pan = useRef(new Animated.ValueXY()).current;
  const flying = useRef(false);
  const swiped = useRef(onSwiped);
  swiped.current = onSwiped;

  const fling = useCallback(
    (yes: boolean) => {
      if (flying.current) return;
      flying.current = true;
      if (reduceMotion) {
        swiped.current(yes);
        return;
      }
      Animated.timing(pan, { toValue: { x: (yes ? 1 : -1) * (width + 160), y: 0 }, duration: FLING_MS, easing: Easing.in(Easing.quad), useNativeDriver: false }).start(() => swiped.current(yes));
    },
    [pan, reduceMotion, width]
  );
  useImperativeHandle(ref, () => ({ fling }), [fling]);

  const responder = useMemo(() => {
    const back = () => Animated.spring(pan, { toValue: { x: 0, y: 0 }, friction: 6, tension: 90, useNativeDriver: false }).start();
    return PanResponder.create({
      onMoveShouldSetPanResponder: (_event, gesture) => !flying.current && Math.abs(gesture.dx) > 8 && Math.abs(gesture.dx) > Math.abs(gesture.dy) * 1.2,
      onPanResponderMove: (_event, gesture) => pan.setValue({ x: gesture.dx, y: gesture.dy * 0.25 }),
      onPanResponderRelease: (_event, gesture) => {
        if (Math.abs(gesture.dx) > SWIPE_DISTANCE || (Math.abs(gesture.vx) > 0.75 && Math.abs(gesture.dx) > 24)) fling(gesture.dx > 0);
        else back();
      },
      onPanResponderTerminate: back,
      onPanResponderTerminationRequest: () => false
    });
  }, [fling, pan]);

  const turn = pan.x.interpolate({ inputRange: [-width, 0, width], outputRange: ["-16deg", "0deg", "16deg"] });
  const yesShow = pan.x.interpolate({ inputRange: [0, 70], outputRange: [0, 1], extrapolate: "clamp" });
  const noShow = pan.x.interpolate({ inputRange: [-70, 0], outputRange: [1, 0], extrapolate: "clamp" });

  return (
    <PopIn from="scale" style={styles.cardSlot}>
      <Animated.View style={[styles.card, { transform: [{ translateX: pan.x }, { translateY: pan.y }, { rotate: turn }] }]} {...responder.panHandlers} testID="sprint-card">
        <CardFace card={card} picture={picture} short={short} />
        <Animated.View style={[styles.stamp, styles.stampYes, { opacity: yesShow }]} pointerEvents="none">
          <Icon name="check" size={20} color={colors.white} />
        </Animated.View>
        <Animated.View style={[styles.stamp, styles.stampNo, { opacity: noShow }]} pointerEvents="none">
          <Icon name="close" size={20} color={colors.white} />
        </Animated.View>
      </Animated.View>
    </PopIn>
  );
});

/** The how-to: a little card leaning to the tick, then to the cross. */
function SwipeHint() {
  const reduceMotion = useReduceMotion();
  const sway = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (reduceMotion) return undefined;
    const ease = Easing.inOut(Easing.quad);
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(sway, { toValue: 1, duration: 700, easing: ease, useNativeDriver: true }),
        Animated.delay(250),
        Animated.timing(sway, { toValue: 0, duration: 500, easing: ease, useNativeDriver: true }),
        Animated.timing(sway, { toValue: -1, duration: 700, easing: ease, useNativeDriver: true }),
        Animated.delay(250),
        Animated.timing(sway, { toValue: 0, duration: 500, easing: ease, useNativeDriver: true })
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [sway, reduceMotion]);
  return (
    <View style={styles.hint} accessible={false} importantForAccessibility="no-hide-descendants">
      <View style={styles.hintSide}>
        <View style={[styles.miniRound, styles.roundNo]}>
          <Icon name="close" size={22} color={colors.white} />
        </View>
        <Text style={styles.hintLabel}>{t("Not right")}</Text>
      </View>
      <Animated.View
        style={[
          styles.hintCard,
          {
            transform: [
              { translateX: sway.interpolate({ inputRange: [-1, 1], outputRange: [-34, 34] }) },
              { rotate: sway.interpolate({ inputRange: [-1, 1], outputRange: ["-12deg", "12deg"] }) }
            ]
          }
        ]}
      >
        <View style={styles.hintLine} />
        <View style={[styles.hintLine, styles.hintLineShort]} />
        <Text style={styles.hintMark}>?</Text>
      </Animated.View>
      <View style={styles.hintSide}>
        <View style={[styles.miniRound, styles.roundYes]}>
          <Icon name="check" size={22} color={colors.white} />
        </View>
        <Text style={styles.hintLabel}>{t("Right")}</Text>
      </View>
    </View>
  );
}

const CARD_SHADOW = "#D5DEE8";

const styles = textScaled(
  StyleSheet.create({
    sheet: {
      bottom: 0
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      paddingHorizontal: space.lg,
      paddingTop: space.md,
      paddingBottom: space.sm
    },
    heading: {
      flex: 1,
      minWidth: 0,
      fontFamily: fonts.displayHeavy,
      fontSize: 22,
      color: colors.ink
    },
    close: {
      width: 40,
      height: 40,
      borderRadius: 20,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.mist
    },
    scroll: {
      flex: 1
    },
    readyContent: {
      paddingHorizontal: space.lg,
      paddingTop: space.sm,
      gap: space.md
    },
    teacherRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: space.sm
    },
    bubble: {
      flex: 1,
      minWidth: 0,
      paddingVertical: 12,
      paddingHorizontal: 14,
      borderRadius: radii.lg,
      borderWidth: 2,
      borderColor: colors.line,
      backgroundColor: colors.white
    },
    bubbleText: {
      fontFamily: fonts.bodyHeavy,
      fontSize: 17,
      lineHeight: 23,
      color: colors.ink
    },
    howLine: {
      fontFamily: fonts.bodyBold,
      fontSize: 15,
      lineHeight: 21,
      color: colors.inkSoft,
      textAlign: "center"
    },
    hint: {
      direction: "ltr",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: space.sm,
      paddingVertical: space.sm
    },
    hintSide: {
      alignItems: "center",
      gap: 6,
      width: 84
    },
    hintLabel: {
      fontFamily: fonts.bodyHeavy,
      fontSize: 13,
      color: colors.inkSoft,
      textAlign: "center"
    },
    hintCard: {
      width: 92,
      height: 112,
      borderRadius: 14,
      borderWidth: 2,
      borderBottomWidth: 4,
      borderColor: colors.line,
      backgroundColor: colors.white,
      alignItems: "center",
      justifyContent: "center",
      gap: 8
    },
    hintLine: {
      width: 56,
      height: 8,
      borderRadius: 4,
      backgroundColor: colors.line
    },
    hintLineShort: {
      width: 36
    },
    hintMark: {
      fontFamily: fonts.displayHeavy,
      fontSize: 26,
      color: colors.gem
    },
    miniRound: {
      width: 44,
      height: 44,
      borderRadius: 22,
      alignItems: "center",
      justifyContent: "center",
      borderBottomWidth: 4
    },
    bestPill: {
      alignSelf: "center",
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      paddingHorizontal: 14,
      paddingVertical: 6,
      borderRadius: radii.pill,
      backgroundColor: lighten(colors.gold, 0.8)
    },
    bestText: {
      fontFamily: fonts.bodyHeavy,
      fontSize: 15,
      color: darken(colors.gold, 0.45)
    },
    countWrap: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      paddingBottom: 80
    },
    count: {
      fontFamily: fonts.displayHeavy,
      fontSize: 96
    },
    play: {
      flex: 1,
      paddingHorizontal: space.lg
    },
    playTop: {
      flexDirection: "row",
      alignItems: "center",
      gap: space.sm
    },
    playMeters: {
      flex: 1,
      minWidth: 0,
      gap: 6
    },
    clock: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8
    },
    clockTrack: {
      flex: 1,
      height: 14,
      borderRadius: 7,
      overflow: "hidden",
      backgroundColor: colors.line
    },
    clockFill: {
      height: "100%",
      borderRadius: 7
    },
    clockText: {
      minWidth: 30,
      fontFamily: fonts.displayHeavy,
      fontSize: 18,
      color: colors.ink,
      textAlign: "center"
    },
    clockHurry: {
      color: colors.heart
    },
    scoreRow: {
      flexDirection: "row",
      alignItems: "center",
      flexWrap: "wrap",
      gap: 8
    },
    score: {
      fontFamily: fonts.displayHeavy,
      fontSize: 18,
      color: colors.ink
    },
    combo: {
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
      paddingHorizontal: 8,
      paddingVertical: 2,
      borderRadius: radii.pill,
      backgroundColor: lighten(colors.flame, 0.82)
    },
    comboText: {
      fontFamily: fonts.bodyHeavy,
      fontSize: 12,
      color: darken(colors.flame, 0.35)
    },
    stack: {
      flex: 1,
      minHeight: 200,
      justifyContent: "center"
    },
    deck: {
      flex: 1,
      maxHeight: 340
    },
    cardSlot: {
      flex: 1
    },
    card: {
      flex: 1,
      borderRadius: radii.lg,
      borderWidth: 2,
      borderBottomWidth: 6,
      borderColor: colors.line,
      borderBottomColor: CARD_SHADOW,
      backgroundColor: colors.white,
      paddingHorizontal: space.lg,
      paddingVertical: space.lg,
      alignItems: "center",
      justifyContent: "center",
      gap: 10
    },
    topicChip: {
      maxWidth: "70%",
      paddingHorizontal: 10,
      paddingVertical: 3,
      borderRadius: radii.pill
    },
    topicText: {
      fontFamily: fonts.bodyHeavy,
      fontSize: 13,
      lineHeight: 18
    },
    cardBehind: {
      position: "absolute",
      top: 14,
      bottom: -10,
      left: 12,
      right: 12,
      opacity: 0.55,
      transform: [{ scale: 0.95 }]
    },
    eyebrow: {
      fontFamily: fonts.bodyHeavy,
      fontSize: 13,
      letterSpacing: 0.6,
      color: colors.gem,
      textTransform: "uppercase"
    },
    prompt: {
      fontFamily: fonts.displayHeavy,
      fontSize: 22,
      lineHeight: 29,
      color: colors.ink,
      textAlign: "center"
    },
    promptLong: {
      fontSize: 18,
      lineHeight: 25
    },
    promptShort: {
      fontSize: 19,
      lineHeight: 25
    },
    promptLongShort: {
      fontSize: 16,
      lineHeight: 22
    },
    shownBox: {
      alignSelf: "stretch",
      paddingVertical: 10,
      paddingHorizontal: 12,
      borderRadius: radii.md,
      backgroundColor: lighten(colors.gem, 0.88)
    },
    shown: {
      fontFamily: fonts.bodyHeavy,
      fontSize: 18,
      lineHeight: 24,
      color: darken(colors.gem, 0.4),
      textAlign: "center"
    },
    stamp: {
      position: "absolute",
      top: 12,
      width: 36,
      height: 36,
      borderRadius: 18,
      alignItems: "center",
      justifyContent: "center"
    },
    stampYes: {
      left: 12,
      backgroundColor: colors.green
    },
    stampNo: {
      right: 12,
      backgroundColor: colors.heart
    },
    flashWrap: {
      position: "absolute",
      left: 0,
      right: 0,
      alignItems: "center"
    },
    flash: {
      width: 52,
      height: 52,
      borderRadius: 26,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 3,
      borderColor: colors.white
    },
    flashShort: {
      width: 40,
      height: 40,
      borderRadius: 20
    },
    bonusWrap: {
      position: "absolute",
      bottom: 24,
      left: 0,
      right: 0,
      alignItems: "center"
    },
    bonus: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: radii.pill,
      backgroundColor: colors.white,
      borderWidth: 2,
      borderColor: colors.gem
    },
    bonusText: {
      fontFamily: fonts.bodyHeavy,
      fontSize: 15,
      color: darken(colors.gem, 0.3)
    },
    answerRow: {
      direction: "ltr",
      flexDirection: "row",
      justifyContent: "center",
      gap: 48,
      marginTop: space.lg
    },
    answerRowShort: {
      gap: 40,
      marginTop: 10
    },
    round: {
      width: 72,
      height: 72,
      borderRadius: 36,
      alignItems: "center",
      justifyContent: "center",
      borderBottomWidth: 5
    },
    roundShort: {
      width: 60,
      height: 60,
      borderRadius: 30,
      borderBottomWidth: 4
    },
    roundYes: {
      backgroundColor: colors.green,
      borderBottomColor: darken(colors.green, 0.22)
    },
    roundNo: {
      backgroundColor: colors.heart,
      borderBottomColor: darken(colors.heart, 0.22)
    },
    missSlot: {
      minHeight: 54,
      justifyContent: "center",
      marginTop: space.sm
    },
    missSlotShort: {
      minHeight: 46,
      marginTop: 6
    },
    missBox: {
      alignSelf: "center",
      maxWidth: "100%",
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: radii.md,
      backgroundColor: colors.wrongBg
    },
    missQuestion: {
      fontFamily: fonts.bodyBold,
      fontSize: 13,
      lineHeight: 18,
      color: colors.inkSoft,
      textAlign: "center"
    },
    missNote: {
      fontFamily: fonts.bodyHeavy,
      fontSize: 14,
      lineHeight: 19,
      color: colors.wrongInk,
      textAlign: "center"
    },
    missQuestionShort: {
      fontSize: 12,
      lineHeight: 16
    },
    missNoteShort: {
      fontSize: 13,
      lineHeight: 18
    },
    resultContent: {
      alignItems: "center",
      paddingHorizontal: space.lg,
      paddingTop: space.sm,
      gap: space.sm
    },
    resultHead: {
      fontFamily: fonts.displayHeavy,
      fontSize: 24,
      color: colors.ink,
      textAlign: "center"
    },
    resultScore: {
      fontFamily: fonts.displayHeavy,
      fontSize: 40,
      textAlign: "center"
    },
    resultBest: {
      fontFamily: fonts.bodyHeavy,
      fontSize: 16,
      color: colors.inkSoft
    },
    ribbon: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: radii.pill,
      backgroundColor: colors.gold
    },
    ribbonBadge: {
      width: 30,
      height: 30,
      borderRadius: 15,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.white
    },
    ribbonText: {
      fontFamily: fonts.displayHeavy,
      fontSize: 18,
      color: "#5A3B00"
    },
    xpChip: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      paddingHorizontal: 12,
      paddingVertical: 5,
      borderRadius: radii.pill,
      backgroundColor: lighten(colors.gold, 0.82)
    },
    xpText: {
      fontFamily: fonts.bodyHeavy,
      fontSize: 15,
      color: darken(colors.gold, 0.45)
    },
    misses: {
      alignSelf: "stretch",
      marginTop: space.sm,
      padding: space.md,
      gap: space.sm,
      borderRadius: radii.lg,
      borderWidth: 2,
      borderColor: colors.line,
      backgroundColor: colors.white
    },
    missesHead: {
      fontFamily: fonts.displayHeavy,
      fontSize: 17,
      color: colors.ink
    },
    missRow: {
      gap: 2,
      paddingTop: space.sm,
      borderTopWidth: 1,
      borderTopColor: colors.line
    },
    missPrompt: {
      fontFamily: fonts.bodyBold,
      fontSize: 14,
      lineHeight: 19,
      color: colors.inkSoft
    },
    missAnswer: {
      fontFamily: fonts.bodyHeavy,
      fontSize: 15,
      lineHeight: 20,
      color: darken(colors.green, 0.25)
    },
    resultButtons: {
      alignSelf: "stretch",
      gap: space.sm,
      marginTop: space.md
    }
  })
);
