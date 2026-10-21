import React, { useEffect, useRef, useState } from "react";
import { Animated, Platform, ScrollView, StyleSheet, Text, useWindowDimensions, View, type LayoutChangeEvent } from "react-native";
import type { GameSoundEvent } from "../../services/gameSoundLibrary";
import { ArabicText, HONORIFIC_PATTERN, hasArabic, isArabicOnly, isQuranText, withHonorifics } from "../ArabicText";
import { GameButton } from "../GameButton";
import { Icon } from "../Icon";
import { Sheet } from "../Sheet";
import { Tappable } from "../Tappable";
import { feedback } from "../sound";
import { colors, darken, fonts, radii, space, withAlpha } from "../theme";
import { noBreakHyphens } from "./lessonText";
import { SCROLL_HINT_ROOM, ScrollHintGap } from "./ScrollHint";
import { nearestRowStop, nextRowStop, wholeRows, type LayoutBox, type RowSpan } from "./sheetFit";

export const PRAISE_WORDS = ["Great job!", "Nice!", "Excellent!", "Amazing!", "You got it!", "MashaAllah!"] as const;

function hashString(value: string) {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

/** Stable praise word for a seed (e.g. the question id). */
export function pickPraise(seed?: string) {
  return PRAISE_WORDS[hashString(seed ?? "praise") % PRAISE_WORDS.length];
}

/** Heading of the red sheet (copy bank: "Correct answer:" followed by the answer). */
export const WRONG_TITLE = "Correct answer:";

/** Text on the pink / mint sheets, a step darker than the tokens so it passes 4.5:1. */
export const WRONG_TEXT = darken(colors.wrongInk, 0.15);
export const CORRECT_TEXT = darken(colors.correctInk, 0.12);

const SHEET_PAD = 20 + 16;
/** A slim sheet (a short phone, under the green tile): less padding and the md button. */
const SLIM_PAD_TOP = 12;
const SLIM_PAD_BOTTOM = 8;
const SHEET_PAD_SLIM = SLIM_PAD_TOP + SLIM_PAD_BOTTOM;
/** The lg and md buttons with their 4 px lip. */
const BUTTON_LG = 58;
const BUTTON_MD = 50;
/** What a slim sheet saves: padding, a smaller button and a smaller gap above it. */
const SLIM_SAVES = SHEET_PAD - SHEET_PAD_SLIM + (BUTTON_LG - BUTTON_MD) + (space.lg - space.sm);
const SHEET_INSET = Platform.OS === "ios" ? 30 : 16;
/** The sheet never grows past this share of the window; a long answer scrolls inside it instead. */
export const SHEET_MAX_SHARE = 0.6;
/** A "correct order" list may take a little more, so an eight-step order fits on a small phone. */
const LIST_MAX_SHARE = 0.66;
const MIN_BODY = 64;
/** The body has no bottom padding, so even one hidden list row (20 px) shows the arrow. */
const BODY_SLACK = 4;
/** Above a list, outside the part that scrolls, so the part that scrolls starts on its first row. */
const LIST_TOP = space.sm;
/** One line of the Why text (styles.whyText); when it scrolls it shows whole lines only. */
export const WHY_LINE = 21;
/** Between the Why pill and its text. */
const WHY_GAP = space.sm;
/**
 * The sign ﷺ is drawn in the Naskh face, whose box reaches 1 px above its line and 5 px below it. A Why text with the
 * sign gets that much padding, so the sign is never clipped by the edge of the part that scrolls.
 */
const SIGN_ABOVE = 1;
const SIGN_BELOW = 5;
/** Scrolled less than this from an edge counts as at that edge. */
const EDGE = 2;

type ScrollState = { viewport: number; content: number; offset: number };

/** Which way the arrow under a scrolling part points: down while more is below, up once only the start is hidden. */
function arrowFor({ viewport, content, offset }: ScrollState, slack = EDGE): "down" | "up" | undefined {
  if (viewport <= 0 || content - viewport <= slack) {
    return undefined;
  }
  if (content - viewport - offset > slack) {
    return "down";
  }
  return offset > EDGE ? "up" : undefined;
}

export type FeedbackSheetProps = {
  visible: boolean;
  correct: boolean;
  correctLabel?: string;
  why?: string;
  onContinue: () => void;
  /** Picks the praise word so it stays the same across renders. */
  praiseSeed?: string;
  /** Overrides the praise word / "Correct answer:" heading. */
  title?: string;
  /** Overrides CONTINUE / GOT IT. */
  buttonLabel?: string;
  /** Sound of the button. Default the soft tap; false when the next screen plays its own (lesson end). */
  buttonSound?: GameSoundEvent | false;
  /** Shown as a numbered column instead of correctLabel. */
  correctList?: string[];
  /** Rows of correctList the learner had in another place: lit up, so the mistake shows even when the steps behind the sheet fold away. */
  missedRows?: number[];
  /** Play the correct / wrong sound + haptic when the sheet opens. Default true. */
  playSound?: boolean;
  /** Start with the Why line open (gallery / tests). */
  defaultWhyOpen?: boolean;
  bottomInset?: number;
  /**
   * The tallest the whole sheet may be (panel padding included): the room under the green tile, once the question
   * has given what it can (see useSheetFit). Default: SHEET_MAX_SHARE of the window. A sheet that is too tall first
   * goes slim (less padding, the md button); only if that is still too tall does its Why text scroll, in whole lines
   * from its top, with the arrow under it. The heading, the answer and the Why pill always show whole.
   */
  maxHeight?: number;
  /** Reports the sheet's height as shown (panel padding included) whenever it changes. */
  onHeight?: (height: number) => void;
  /** Reports the height the sheet needs to show everything at full size (Why text whole, nothing scrolling). */
  onFullHeight?: (height: number) => void;
  testID?: string;
};

/** The answer sheet that springs up after CHECK: praise when right, the correct answer when wrong. */
export function FeedbackSheet({
  visible,
  correct,
  correctLabel,
  why,
  onContinue,
  praiseSeed,
  title,
  buttonLabel,
  correctList,
  missedRows,
  buttonSound,
  playSound = true,
  defaultWhyOpen = false,
  bottomInset,
  maxHeight,
  onHeight,
  onFullHeight,
  testID = "feedback-sheet"
}: FeedbackSheetProps) {
  const [whyOpen, setWhyOpen] = useState(defaultWhyOpen);
  const { height: windowHeight } = useWindowDimensions();
  const badge = useRef(new Animated.Value(0)).current;
  const whyAnim = useRef(new Animated.Value(0)).current;
  // The icon + title row and the button always show; the part between them scrolls when it is long.
  const [headHeight, setHeadHeight] = useState(40);
  const [buttonHeight, setButtonHeight] = useState(BUTTON_LG);
  // The whole body (a list), the answer with the Why pill, and the Why text: their full heights.
  const [bodyContent, setBodyContent] = useState(0);
  const [topBlock, setTopBlock] = useState(0);
  const [whyContent, setWhyContent] = useState(0);
  const [body, setBody] = useState<ScrollState>({ viewport: 0, content: 0, offset: 0 });
  const [whyScroll, setWhyScroll] = useState<ScrollState>({ viewport: 0, content: 0, offset: 0 });
  const bodyRef = useRef<ScrollView>(null);
  const whyRef = useRef<ScrollView>(null);
  const snapTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const listSnapTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const revealWhy = useRef(false);
  // Where each row of a list sits in it, and the list's height: a long list shows and scrolls in whole rows only.
  const listKey = correctList ? correctList.join("\u0000") : "";
  const [rowState, setRowState] = useState<{ key: string; boxes: (LayoutBox | undefined)[] }>({ key: "", boxes: [] });
  const [listHeight, setListHeight] = useState(0);

  useEffect(() => {
    if (!visible) {
      setWhyOpen(false);
      return undefined;
    }
    if (playSound) {
      feedback(correct ? "correct" : "wrong", correct ? "success" : "error");
    }
    badge.setValue(0);
    const animation = Animated.spring(badge, { toValue: 1, delay: 120, friction: 4, tension: 140, useNativeDriver: true });
    animation.start();
    return () => animation.stop();
    // Only replay when the sheet opens or flips result.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, correct]);

  useEffect(() => {
    whyAnim.setValue(0);
    if (!whyOpen) {
      return undefined;
    }
    const animation = Animated.spring(whyAnim, { toValue: 1, friction: 7, tension: 120, useNativeDriver: true });
    animation.start();
    return () => animation.stop();
  }, [whyAnim, whyOpen]);

  useEffect(
    () => () => {
      clearTimeout(snapTimer.current);
      clearTimeout(listSnapTimer.current);
    },
    []
  );

  const ink = correct ? CORRECT_TEXT : WRONG_TEXT;
  const heading = title ?? (correct ? pickPraise(praiseSeed) : WRONG_TITLE);
  const label = buttonLabel ?? (correct ? "Continue" : "Got it");
  const whyText = why?.trim();
  const inset = bottomInset ?? SHEET_INSET;
  const listShown = !correct && Boolean(correctList && correctList.length > 0);
  const answerShown = !correct && !correctList && Boolean(correctLabel);
  const whyShown = !correct && Boolean(whyText);
  const whyVisible = whyShown && whyOpen;
  const signs = Boolean(whyText && HONORIFIC_PATTERN.test(whyText));
  const whyPadTop = signs ? SIGN_ABOVE : 0;
  const whyPadBottom = signs ? SIGN_BELOW : 0;
  // The Why text's lines (its height is whole lines plus that padding).
  const whyLines = Math.max(0, Math.round((whyContent - whyPadTop - whyPadBottom) / WHY_LINE));
  const hasBody = listShown || answerShown || whyShown;
  const shareMax = Math.round(windowHeight * (listShown ? LIST_MAX_SHARE : SHEET_MAX_SHARE));
  // A list keeps its share of the window; an answer sheet may take the room it is given under the green tile.
  const cap = listShown ? Math.min(maxHeight ?? shareMax, shareMax) : maxHeight ?? shareMax;

  // A list's rows, once each has said where it sits: the list, the Why pill and each line of the Why text show whole
  // or not at all. Its height is read from those parts, not from the part that scrolls (which gets room under it).
  const rowBoxes =
    listShown && correctList && rowState.key === listKey && correctList.every((_, index) => rowState.boxes[index] !== undefined)
      ? (rowState.boxes.slice(0, correctList.length) as LayoutBox[])
      : undefined;
  const listEnd = rowBoxes ? Math.max(listHeight, ...rowBoxes.map((box) => box.y + box.height)) : 0;
  const listContent = rowBoxes ? listEnd + topBlock + (whyVisible ? WHY_GAP + whyContent : 0) : bodyContent;
  const listRows: RowSpan[] = [];
  if (rowBoxes) {
    rowBoxes.forEach((box) => listRows.push({ top: box.y, bottom: box.y + box.height }));
    if (whyShown && topBlock > space.sm) {
      listRows.push({ top: listEnd + space.sm, bottom: listEnd + topBlock });
    }
    if (whyVisible) {
      const start = listEnd + topBlock + WHY_GAP + whyPadTop;
      for (let line = 0; line < whyLines; line += 1) {
        listRows.push({ top: start + line * WHY_LINE, bottom: start + (line + 1) * WHY_LINE });
      }
    }
  }

  // The sheet at full size: full padding, the lg button, the Why text whole.
  const bodyFull = listShown ? LIST_TOP + listContent : topBlock + (whyVisible ? WHY_GAP + whyContent : 0);
  const fullHeight = headHeight + (hasBody ? bodyFull : 0) + space.lg + BUTTON_LG + SHEET_PAD + inset;

  // Too tall for its room: slim first; then, only if that is still too tall, the Why text scrolls in whole lines.
  let slim = false;
  let whyMax: number | undefined;
  if (!listShown && fullHeight > cap) {
    slim = true;
    if (fullHeight - SLIM_SAVES > cap && whyVisible && whyLines > 1) {
      // Everything but the Why text's lines, with the arrow's room above the button.
      const fixed = fullHeight - whyContent + whyPadTop - space.lg + SCROLL_HINT_ROOM;
      const fullLines = Math.floor((cap - fixed) / WHY_LINE);
      // Full size while that still shows two lines; slim when it would show fewer.
      slim = fullLines < 2;
      const lines = Math.max(1, slim ? Math.floor((cap - (fixed - SHEET_PAD + SHEET_PAD_SLIM - BUTTON_LG + BUTTON_MD)) / WHY_LINE) : fullLines);
      // The part that scrolls shows whole lines: never one cut through.
      whyMax = lines < whyLines ? lines * WHY_LINE + whyPadTop : undefined;
    }
  }
  const whyScrolls = whyMax !== undefined;
  const baseGap = slim ? space.sm : space.lg;
  const fixedParts = headHeight + buttonHeight + (slim ? SHEET_PAD_SLIM : SHEET_PAD) + inset;
  // A list (or, on a tiny screen, a very long answer) scrolls as a whole. The gap above the button holds the arrow
  // while it scrolls, wherever it is scrolled: down while more is below, up at the end, never an empty gap.
  const bodyLimit = Math.max(cap, shareMax);
  const arrow = whyScrolls ? arrowFor(whyScroll, whyPadBottom + EDGE) : arrowFor(body, BODY_SLACK);
  // The furthest the Why text scrolls and still starts on a whole line.
  const whyEnd = Math.max(0, Math.floor((whyScroll.content - whyScroll.viewport) / WHY_LINE) * WHY_LINE);
  // A list with its rows placed scrolls as soon as any of it would not show: then it shows whole rows only.
  const bodyOverflows =
    !whyScrolls &&
    (arrow !== undefined ||
      (rowBoxes
        ? listContent > Math.max(MIN_BODY, bodyLimit - fixedParts - baseGap) - LIST_TOP
        : bodyContent + (listShown ? LIST_TOP : 0) > Math.max(MIN_BODY, bodyLimit - fixedParts - baseGap) + BODY_SLACK));
  const buttonGap = whyScrolls || bodyOverflows ? SCROLL_HINT_ROOM : baseGap;
  // While the Why text scrolls, the body around it never cuts it (or the answer and the pill above it): on a very
  // short screen the sheet then stays at its smallest whole size, its Why text one line.
  const whyBody = whyScrolls ? topBlock + WHY_GAP + (whyMax ?? 0) : 0;
  const bodyMax = Math.max(MIN_BODY, bodyLimit - fixedParts - buttonGap, whyBody);
  // A long list shows as many whole rows as fit, starts at its top and stops only where every row shows whole.
  const rowWindow = rowBoxes && bodyOverflows ? wholeRows(listRows, listContent, bodyMax - LIST_TOP) : undefined;
  const scrollMax = rowWindow ? rowWindow.viewport : listShown ? bodyMax - LIST_TOP : bodyMax;
  const arrowScroll = whyScrolls ? whyScroll : body;
  const onRowLayout = (index: number) => (event: LayoutChangeEvent) => {
    const box = { y: Math.round(event.nativeEvent.layout.y), height: Math.round(event.nativeEvent.layout.height) };
    setRowState((state) => {
      const same = state.key === listKey;
      const old = same ? state.boxes[index] : undefined;
      if (old && old.y === box.y && old.height === box.height) {
        return state;
      }
      const boxes = same ? state.boxes.slice() : [];
      boxes[index] = box;
      return { key: listKey, boxes };
    });
  };
  const arrowRef = whyScrolls ? whyRef : bodyRef;
  const onArrow = () => {
    const { viewport, content, offset } = arrowScroll;
    if (arrow === "up") {
      arrowRef.current?.scrollTo?.({ y: 0, animated: true });
      return;
    }
    // Down by about a screenful; the Why text by whole lines, a list by whole rows.
    const next = whyScrolls
      ? Math.min(whyEnd, Math.round(offset / WHY_LINE) * WHY_LINE + Math.max(WHY_LINE, Math.floor(viewport / WHY_LINE) * WHY_LINE))
      : rowWindow
        ? nextRowStop(rowWindow.stops, listRows, offset, rowWindow.viewport)
        : Math.min(content - viewport, offset + Math.round(viewport * 0.7));
    arrowRef.current?.scrollTo?.({ y: Math.max(0, next), animated: true });
  };

  // Opening Why in a long list scrolls it into view, at the end of the list (its last stop).
  const listEndStop = rowWindow?.end;
  useEffect(() => {
    if (revealWhy.current && listShown) {
      if (listEndStop !== undefined) {
        bodyRef.current?.scrollTo?.({ y: listEndStop, animated: true });
      } else {
        bodyRef.current?.scrollToEnd?.({ animated: true });
      }
    }
  }, [bodyMax, listEndStop, listShown]);
  // Every time it opens, the sheet starts at the top of its list (or answer).
  useEffect(() => {
    if (!visible) {
      revealWhy.current = false;
      return;
    }
    bodyRef.current?.scrollTo?.({ y: 0, animated: false });
    setBody((state) => (state.offset === 0 ? state : { ...state, offset: 0 }));
  }, [visible]);
  // A Why text that starts to scroll, or opens again, starts at its top.
  useEffect(() => {
    if (whyScrolls) {
      whyRef.current?.scrollTo?.({ y: 0, animated: false });
    }
  }, [whyOpen, whyScrolls]);
  useEffect(() => {
    if (visible) {
      onFullHeight?.(fullHeight);
    }
    // Only when the height changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fullHeight, visible]);

  const badgeScale = badge.interpolate({ inputRange: [0, 1], outputRange: [0.2, 1] });
  const badgeRotate = badge.interpolate({ inputRange: [0, 1], outputRange: ["-40deg", "0deg"] });

  return (
    <Sheet
      visible={visible}
      tone={correct ? "correct" : "wrong"}
      backdrop={false}
      dismissOnBackdrop={false}
      bottomInset={bottomInset}
      style={slim ? { paddingTop: SLIM_PAD_TOP, paddingBottom: SLIM_PAD_BOTTOM + inset } : undefined}
      testID={testID}
    >
      <View
        onLayout={(event) => onHeight?.(Math.round(event.nativeEvent.layout.height + (slim ? SHEET_PAD_SLIM : SHEET_PAD) + inset))}
        testID="feedback-content"
      >
        <View style={styles.headRow} onLayout={(event) => setHeadHeight(Math.round(event.nativeEvent.layout.height))}>
          <Animated.View
            style={[
              styles.badge,
              { backgroundColor: correct ? colors.green : colors.heart, transform: [{ scale: badgeScale }, { rotate: badgeRotate }] }
            ]}
          >
            <Icon name={correct ? "check" : "close"} size={26} color={colors.white} />
          </Animated.View>
          <Text style={[correct ? styles.praise : styles.wrongTitle, { color: ink }]} accessibilityRole="header">
            {withHonorifics(heading)}
          </Text>
        </View>

        {hasBody ? (
          <View style={[styles.bodyBox, listShown ? styles.bodyBoxList : null]}>
            <ScrollView
              ref={bodyRef}
              style={{ maxHeight: scrollMax }}
              contentContainerStyle={rowWindow?.pad ? { paddingBottom: rowWindow.pad } : undefined}
              bounces={false}
              nestedScrollEnabled
              snapToOffsets={rowWindow?.stops}
              scrollEventThrottle={32}
              testID="feedback-body"
              onLayout={(event) => {
                const viewport = Math.round(event.nativeEvent.layout.height);
                setBody((state) => (state.viewport === viewport ? state : { ...state, viewport }));
              }}
              onScroll={(event) => {
                const offset = Math.round(event.nativeEvent.contentOffset.y);
                setBody((state) => (state.offset === offset ? state : { ...state, offset }));
                // A browser has no snapping here: once a drag stops between rows, settle where every row shows whole.
                if (Platform.OS === "web" && rowWindow) {
                  const { stops } = rowWindow;
                  clearTimeout(listSnapTimer.current);
                  listSnapTimer.current = setTimeout(() => {
                    const stop = nearestRowStop(stops, offset);
                    if (Math.abs(stop - offset) > 1) {
                      bodyRef.current?.scrollTo?.({ y: stop, animated: true });
                    }
                  }, 140);
                }
              }}
              onContentSizeChange={(_width, height) => {
                const content = Math.round(height);
                setBodyContent(content);
                setBody((state) => (state.content === content ? state : { ...state, content }));
                // Opening Why scrolls it into view when the list above already fills the sheet.
                if (revealWhy.current) {
                  if (height <= scrollMax) {
                    revealWhy.current = false;
                  } else if (listEndStop !== undefined) {
                    bodyRef.current?.scrollTo?.({ y: listEndStop, animated: true });
                  } else {
                    bodyRef.current?.scrollToEnd?.({ animated: true });
                  }
                }
              }}
            >
              {listShown && correctList ? (
                <View testID="feedback-list" style={styles.list} onLayout={(event) => setListHeight(Math.round(event.nativeEvent.layout.height))}>
                  {correctList.map((item, index) => (
                    <View
                      key={`${index}-${item}`}
                      style={[styles.listItem, index > 0 ? styles.listItemNext : null, missedRows?.includes(index) ? styles.listItemMissed : null]}
                      onLayout={onRowLayout(index)}
                      accessible
                      accessibilityLabel={`${index + 1}. ${item}${missedRows?.includes(index) ? ", you had this one in another place" : ""}`}
                      testID={`feedback-row-${index}`}
                    >
                      <View style={[styles.listNumber, { backgroundColor: ink }]}>
                        <Text style={styles.listNumberText}>{index + 1}</Text>
                      </View>
                      <Text style={[styles.listText, { color: ink }]}>{withHonorifics(noBreakHyphens(item))}</Text>
                    </View>
                  ))}
                </View>
              ) : null}

              {/* The answer and the Why pill: never scrolled out of sight. */}
              <View onLayout={(event) => setTopBlock(Math.round(event.nativeEvent.layout.height))} testID="feedback-top">
                {answerShown && correctLabel ? (
                  isArabicOnly(correctLabel) ? (
                    <ArabicText
                      size={isQuranText(correctLabel) ? 21 : 26}
                      weight="bold"
                      quran={isQuranText(correctLabel)}
                      color={ink}
                      align="right"
                      style={styles.arabicAnswer}
                      testID="feedback-answer"
                    >
                      {correctLabel}
                    </ArabicText>
                  ) : (
                    <Text
                      style={[
                        styles.answer,
                        correctLabel.length > 80 ? styles.answerLong : null,
                        hasArabic(correctLabel) ? styles.answerArabicMix : null,
                        { color: ink }
                      ]}
                      testID="feedback-answer"
                    >
                      {withHonorifics(noBreakHyphens(correctLabel))}
                    </Text>
                  )
                ) : null}

                {whyShown && whyText ? (
                  <View style={styles.whyBlock}>
                    <Tappable
                      onPress={() => {
                        // Opening Why under a long list scrolls the line into view.
                        revealWhy.current = !whyOpen;
                        setWhyOpen((open) => !open);
                      }}
                      style={styles.whyButton}
                      accessibilityLabel={whyOpen ? "Hide why" : "Why?"}
                      accessibilityState={{ expanded: whyOpen }}
                      hitSlop={6}
                      testID="feedback-why"
                    >
                      <Text style={[styles.whyLabel, { color: ink }]}>Why?</Text>
                      <Icon name={whyOpen ? "chevronDown" : "chevronRight"} size={16} color={ink} />
                    </Tappable>
                  </View>
                ) : null}
              </View>

              {whyVisible && whyText ? (
                <View style={styles.whyTextBox}>
                  <ScrollView
                    ref={whyRef}
                    style={whyMax !== undefined ? { maxHeight: whyMax } : undefined}
                    scrollEnabled={whyScrolls}
                    bounces={false}
                    nestedScrollEnabled
                    showsVerticalScrollIndicator={whyScrolls}
                    snapToInterval={whyScrolls ? WHY_LINE : undefined}
                    scrollEventThrottle={32}
                    testID="feedback-why-scroll"
                    onLayout={(event) => {
                      const viewport = Math.round(event.nativeEvent.layout.height);
                      setWhyScroll((state) => (state.viewport === viewport ? state : { ...state, viewport }));
                    }}
                    onContentSizeChange={(_width, height) => {
                      const content = Math.round(height);
                      setWhyContent(content);
                      setWhyScroll((state) => (state.content === content ? state : { ...state, content }));
                    }}
                    onScroll={(event) => {
                      const offset = Math.round(event.nativeEvent.contentOffset.y);
                      setWhyScroll((state) => (state.offset === offset ? state : { ...state, offset }));
                      // A browser has no snapping here: once a drag stops between lines, settle on a whole line.
                      if (Platform.OS === "web" && whyScrolls) {
                        clearTimeout(snapTimer.current);
                        snapTimer.current = setTimeout(() => {
                          const line = Math.min(whyEnd, Math.round(offset / WHY_LINE) * WHY_LINE);
                          if (Math.abs(line - offset) > 1) {
                            whyRef.current?.scrollTo?.({ y: line, animated: true });
                          }
                        }, 140);
                      }
                    }}
                  >
                    <Animated.Text
                      style={[
                        styles.whyText,
                        signs ? { paddingTop: whyPadTop, paddingBottom: whyPadBottom } : null,
                        {
                          opacity: whyAnim,
                          transform: [{ translateY: whyAnim.interpolate({ inputRange: [0, 1], outputRange: [-6, 0] }) }]
                        }
                      ]}
                      testID="feedback-why-text"
                    >
                      {withHonorifics(noBreakHyphens(whyText), styles.whyHonorific)}
                    </Animated.Text>
                  </ScrollView>
                </View>
              ) : null}
            </ScrollView>
          </View>
        ) : null}

        {/* The arrow sits in the gap above the button, under the scrolling part, never over its text. */}
        <ScrollHintGap
          visible={arrow !== undefined}
          direction={arrow}
          onPress={onArrow}
          gap={buttonGap}
          testID={arrow === "up" ? "feedback-more-up" : "feedback-more"}
          gapTestID="feedback-gap"
        />
        <View onLayout={(event) => setButtonHeight(Math.round(event.nativeEvent.layout.height))}>
          <GameButton
            label={label}
            variant={correct ? "primary" : "danger"}
            size={slim ? "md" : "lg"}
            sound={buttonSound}
            fullWidth
            onPress={onContinue}
            testID="feedback-continue"
          />
        </View>
      </View>
    </Sheet>
  );
}

const styles = StyleSheet.create({
  headRow: {
    flexDirection: "row",
    alignItems: "center"
  },
  badge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: space.md
  },
  praise: {
    flex: 1,
    flexShrink: 1,
    fontFamily: fonts.displayHeavy,
    fontSize: 28,
    lineHeight: 34
  },
  wrongTitle: {
    flex: 1,
    flexShrink: 1,
    fontFamily: fonts.displayHeavy,
    fontSize: 22,
    lineHeight: 28
  },
  answer: {
    flexShrink: 1,
    fontFamily: fonts.bodyHeavy,
    fontSize: 18,
    lineHeight: 24,
    marginTop: space.sm
  },
  answerLong: {
    fontSize: 16,
    lineHeight: 21
  },
  answerArabicMix: {
    lineHeight: 28
  },
  arabicAnswer: {
    alignSelf: "stretch",
    marginTop: space.xs
  },
  bodyBox: {
    position: "relative"
  },
  bodyBoxList: {
    marginTop: LIST_TOP
  },
  // One row per step, top to bottom (the whole-row scroll reads the rows' tops in this order).
  list: {
    flexDirection: "column"
  },
  listItem: {
    flexDirection: "row",
    alignItems: "flex-start"
  },
  listItemNext: {
    marginTop: 4
  },
  // Same height as any row (the whole-row scroll reads the rows' boxes): only a light band behind it.
  listItemMissed: {
    backgroundColor: colors.white,
    borderRadius: radii.pill,
    marginHorizontal: -6,
    paddingHorizontal: 6
  },
  listNumber: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginRight: space.sm
  },
  listNumberText: {
    fontFamily: fonts.displayHeavy,
    fontSize: 12,
    lineHeight: 16,
    color: colors.white,
    includeFontPadding: false
  },
  listText: {
    flexShrink: 1,
    fontFamily: fonts.bodyHeavy,
    fontSize: 15,
    lineHeight: 20
  },
  whyBlock: {
    marginTop: space.sm
  },
  whyButton: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    height: 36,
    paddingHorizontal: space.md,
    borderRadius: radii.pill,
    backgroundColor: withAlpha(colors.white, 0.6)
  },
  whyLabel: {
    marginRight: 4,
    fontFamily: fonts.bodyHeavy,
    fontSize: 16,
    lineHeight: 22
  },
  whyTextBox: {
    marginTop: WHY_GAP
  },
  whyText: {
    flexShrink: 1,
    fontFamily: fonts.body,
    fontSize: 15,
    lineHeight: WHY_LINE,
    color: colors.ink
  },
  whyHonorific: {
    // The sign's own face sits higher and lower than the text's, which made its line 2 px taller. Kept to the
    // text's line, every line of the Why text is the same height, so it can scroll in whole lines.
    lineHeight: Platform.OS === "web" ? 1 : undefined
  }
});
