import { useCallback, useEffect, useLayoutEffect, useRef, useState, type RefObject } from "react";
import { Platform, type ScrollView, type View } from "react-native";
import { space } from "../theme";
import { beforePaint } from "./ScrollHint";

/** A laid-out box in its scroll content: where it starts and how tall it is. */
export type LayoutBox = { y: number; height: number };

/**
 * Where the question sits once checked, in its scroll content (lesson and practice screens alike).
 * `visibleBottom`: from the top of the scroll view down to the sheet's bottom edge (the bottom of the screen part).
 * `focusTop` / `focusBottom`: the green tile, or the answers that must stay whole above the sheet.
 */
export type SheetFitLayout = {
  visibleBottom: number;
  promptTop: number;
  focusTop: number;
  focusBottom: number;
};

/** Air kept between the green tile and the sheet's top edge. */
export const SHEET_TILE_AIR = space.sm;

/**
 * How far the question may scroll once checked (never past the prompt's top, so it stays whole, nor past the green
 * tile's own top), and the tallest the sheet may then be with the green tile still whole above it.
 */
export function sheetRoom(layout: SheetFitLayout) {
  const furthest = Math.max(0, Math.min(layout.focusTop - space.sm, layout.promptTop - space.sm));
  const room = Math.round(layout.visibleBottom - (layout.focusBottom - furthest) - SHEET_TILE_AIR);
  return { furthest, room };
}

/**
 * The space above a question that fits its screen, so it sits in the middle of the room above CHECK instead of at
 * the top. A question taller than the room gets none and scrolls as before. Scrolling once checked is unchanged:
 * it may scroll past this space, since it never scrolls past the prompt's top.
 */
export function centerSpace(roomHeight: number, questionHeight: number, bottomPad: number) {
  return Math.max(0, Math.floor((roomHeight - questionHeight - bottomPad) / 2));
}

/** Where to scroll so the green tile sits right above a sheet `sheetHeight` tall, never further than `furthest`. */
export function sheetScrollY(layout: SheetFitLayout, sheetHeight: number, furthest: number) {
  return Math.max(0, Math.min(layout.focusBottom + space.md - (layout.visibleBottom - sheetHeight), furthest));
}

/**
 * The tallest the sheet may be with its top edge still under the green tile's text, the question scrolled as far as
 * it may go: the edge then reaches no further into the tile than `textBottom`, its lip, border and padding (see
 * tileTextBottom), and cuts none of its lines.
 */
export function textRoom(layout: SheetFitLayout, textBottom: number) {
  return sheetRoom(layout).room + SHEET_TILE_AIR + textBottom;
}

/**
 * Whether the picked tile, above the green one, is folded away while the sheet is up: from the render `now` first
 * says so, and then for as long as the sheet stays up on that try (`tryKey`), also once the sheet grows (its Why line
 * opening) and `now` would no longer say so. A tile folded under the sheet never comes back while it is up, so the
 * green tile never moves down under it.
 */
export function usePickFold({ open, now, tryKey }: { open: boolean; now: boolean; tryKey: string }) {
  const [held, setHeld] = useState<string | null>(null);
  useLayoutEffect(() => {
    if (!open) {
      setHeld(null);
    } else if (now) {
      setHeld(tryKey);
    }
  }, [now, open, tryKey]);
  return open && (now || held === tryKey);
}

/** Within this of a scroll's target counts as there. */
const AT_TARGET = 0.5;

export type QuestionScrollInput = {
  /** The sheet is up. */
  open: boolean;
  /** The question's scroll view. */
  scrollRef: RefObject<ScrollView | null>;
  /** Where the question sits while the sheet is up (see sheetScrollY); only read while `ready`. */
  target: number;
  /** The sheet and the question have said their sizes, so `target` can be worked out. */
  ready: boolean;
  /** A squeezed question has not yet said where it now sits (see useSheetFit), so `target` is stale. */
  settling: boolean;
  /** The learner opened the sheet's Why line (and has not shut it). */
  whyOpened: boolean;
  /** The scroll view's own height. */
  viewport: number;
  /** The scroll content's height as it last reported it, when the screen passes it on (see useQuestionScroll). */
  contentHeight?: number;
  /** Where a part above the prompt starts (the REVIEW / "Try again!" chips, practice's topic label), if there is one. */
  partTop: number | null;
  /**
   * The tiles as they are laid out right now, read before the frame is drawn (see placesNow); undefined where a view
   * cannot say its place at once. Read on every render, the sheet up or not.
   */
  placesNow?: () => QuestionPlaces | undefined;
};

/**
 * Where each tile (or the row of True / False, or the answers as a whole) starts in the scroll content as laid out
 * right now, which of them the question keeps above the sheet (`focus`: the green tile), and where the question then
 * goes (see sheetScrollY) when that is known.
 */
export type QuestionPlaces = { tops: Record<string, number>; focus?: string; aim?: number };

/** Runs `run` as the next frame is drawn, once all the work that comes before that frame is done. */
function nextFrame(run: () => void) {
  if (typeof requestAnimationFrame === "function") {
    requestAnimationFrame(() => run());
  } else {
    setTimeout(run, 0);
  }
}

/**
 * Where the question sits in the frame tiles fold away above the green tile, or its prompt wraps anew (the mascot
 * hiding): they move the green tile up in its content by `rise`, which with the scroll left where it is (`from`) would
 * throw it up the screen, past where it goes (`aim`) and back, or over the room's top edge. The question scrolls up
 * with it instead, as far as keeps the green tile where it showed, but never past where it goes: from there it only
 * goes on the same way. Without a known place to go to, it keeps the green tile where it showed.
 */
export function foldScrollY(from: number, rise: number, aim: number | undefined) {
  const kept = from - rise;
  return Math.max(0, Math.min(from, aim === undefined ? kept : Math.max(kept, aim)));
}

/**
 * The question's own scroll while the feedback sheet is up (lesson and practice screens alike), to the place that
 * keeps the green tile whole above the sheet, and back to the top once the sheet goes.
 * - It moves only once that place is known: while a squeezed question has not yet said where it now sits, it stays
 *   where it is, as a scroll to the stale place would have to turn back once the real one is known.
 * - It glides as the sheet comes up or shrinks. A sheet that grows once the learner opened its Why line has already
 *   grown when the question hears of it, so the question moves in that same frame and the green tile never shows
 *   under its edge.
 * - Until it is where it goes, its content is never shorter than the place it sits at needs (`minHeight`): tiles that
 *   fold away or a sheet that shrinks would otherwise let the browser pull it up at once to the new end, a jump.
 * - A phone can start the scroll before it has laid out the content's new length (the room under a question moved
 *   down to the middle grows as the sheet comes up) and stop it at the old end. With `contentHeight`, content that
 *   says it has grown since sends the question on to the same place, the same way, unless it is there already or a
 *   hand has turned it back since.
 * - The part above the prompt is `gone` while the question sits scrolled past its top, and also from the render that
 *   starts a scroll of its own to a place past it, so it is gone before that scroll's first frame and the scroll
 *   view's top edge never cuts it. A scroll by hand hides it from the scroll event itself, before that frame is
 *   painted. Scrolled back up to it, it shows again; a new question shows it again.
 * Pass every scroll offset to `onScroll`.
 */
export function useQuestionScroll({ open, scrollRef, target, ready, settling, whyOpened, viewport, contentHeight = 0, partTop, placesNow }: QuestionScrollInput) {
  const aim = open && ready && !settling ? target : undefined;
  // Where the question last sent itself while this sheet is up (none yet: the sheet is still coming up), whether it
  // glided there, and how long its content said it was then.
  const sent = useRef<number | undefined>(undefined);
  const sentGlides = useRef(true);
  const sentLength = useRef(0);
  // A hand has scrolled the question back from where it was last sent.
  const turnedBack = useRef(false);
  const wasOpen = useRef(false);
  const offset = useRef(0);
  const [past, setPast] = useState(false);
  // The place of the last scroll of the question's own that is over: it got there, passed the part (the scroll
  // offset decides from then on), stopped short or turned back (a hand took over). A new place is a new scroll.
  const [settled, setSettled] = useState<number | undefined>(undefined);
  // Counts the times it got where it was sent, so the content gives back any length it was held at.
  const [, setArrivals] = useState(0);

  // Back to the top once the sheet goes, before the next frame is drawn: the practice screen keeps its scroll view from
  // question to question, so the next question would show for a frame where this one was scrolled to.
  useLayoutEffect(() => {
    if (open) {
      wasOpen.current = true;
      return;
    }
    if (wasOpen.current) {
      scrollRef.current?.scrollTo?.({ y: 0, animated: false });
    }
    wasOpen.current = false;
    sent.current = undefined;
    setSettled(undefined);
  }, [open, scrollRef]);

  // Where the tiles were laid out in the last frame drawn, to see a fold (or a prompt wrapping anew) move the green
  // tile up in its content. Read before the scroll of its own below, which goes on from where this leaves it.
  const placesWere = useRef<Record<string, number> | undefined>(undefined);
  // Where such a frame left the question while its new place was not known yet, until that frame is drawn.
  const foldedTo = useRef<number | undefined>(undefined);
  useLayoutEffect(() => {
    const places = placesNow?.();
    const were = placesWere.current;
    placesWere.current = places?.tops;
    const focus = places?.focus;
    if (!open || !places || !were || focus === undefined || were[focus] === undefined || places.tops[focus] === undefined) {
      return;
    }
    const rise = were[focus] - places.tops[focus];
    const from = offset.current;
    const y = foldScrollY(from, rise, places.aim);
    if (rise <= AT_TARGET || from - y <= AT_TARGET) {
      return;
    }
    scrollRef.current?.scrollTo?.({ y, animated: false });
    offset.current = y;
    // A scroll of its own under way stopped there: it goes on from here, to where the question now goes, once that
    // is known. As below, once the Why line is open the sheet has grown at once, and so does the question go on at
    // once, in this same frame (the prompt, wrapped anew, would otherwise move down here and back up on the way).
    if (aim !== undefined && Math.abs(aim - y) > AT_TARGET) {
      const atOnce = whyOpened && aim > y;
      scrollRef.current?.scrollTo?.({ y: aim, animated: !atOnce });
      offset.current = atOnce ? aim : y;
      sent.current = aim;
      sentGlides.current = !atOnce;
      sentLength.current = contentHeight;
      turnedBack.current = false;
    } else {
      sent.current = aim;
    }
    // Its new place found before this frame is drawn (the squeezed question read at once), the question goes on from
    // here the same way, at once, as from where it was last sent.
    if (aim === undefined && whyOpened) {
      foldedTo.current = y;
      nextFrame(() => {
        foldedTo.current = undefined;
      });
    }
  });

  // Sent before the frame is drawn, so the question starts on its way in the very frame the sheet starts to rise.
  useLayoutEffect(() => {
    if (!open || aim === undefined) {
      return;
    }
    if (aim === sent.current) {
      // The same place again: only content grown since sends it on, to where a scroll that stopped short still goes.
      if (contentHeight > sentLength.current && offset.current < aim - AT_TARGET && !turnedBack.current) {
        scrollRef.current?.scrollTo?.({ y: aim, animated: sentGlides.current });
      }
      sentLength.current = contentHeight;
      return;
    }
    const from = sent.current ?? foldedTo.current;
    const atOnce = whyOpened && from !== undefined && aim > from;
    foldedTo.current = undefined;
    scrollRef.current?.scrollTo?.({ y: aim, animated: !atOnce });
    sent.current = aim;
    sentGlides.current = !atOnce;
    sentLength.current = contentHeight;
    turnedBack.current = false;
    // Only a new place (or the sheet opening, or content that grew under a scroll that stopped short) moves the
    // question: it never fights a hand for nothing.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [aim, contentHeight, open]);

  const edge = partTop === null ? undefined : partTop + 0.5;
  const heading = aim !== undefined && edge !== undefined && aim > edge && settled !== aim;
  const onScroll = (y: number) => {
    const goal = sent.current ?? aim ?? 0;
    const isPast = edge !== undefined && y > edge;
    const toGo = Math.abs(goal - y);
    const onItsWay = !isPast && toGo > AT_TARGET && toGo < Math.abs(goal - offset.current) - AT_TARGET / 2;
    const arrived = toGo <= AT_TARGET && Math.abs(goal - offset.current) > AT_TARGET;
    if (toGo > Math.abs(goal - offset.current) + AT_TARGET / 2) {
      turnedBack.current = true;
    }
    offset.current = y;
    beforePaint(() => {
      setPast((value) => (value === isPast ? value : isPast));
      if (!onItsWay) {
        setSettled(goal);
      }
      if (arrived) {
        setArrivals((count) => count + 1);
      }
    });
  };
  // Held at the place it sits (or goes to, when that is further down): the content's own length covers that place
  // again once it is there.
  const minHeight = open && viewport > 0 ? viewport + Math.max(offset.current, aim ?? 0) : undefined;
  return { gone: open && (past || heading), onScroll, minHeight };
}

/**
 * Where a tile sits in a column (or a grid of `columns`) of tiles, from the heights of the tiles above it: a browser
 * reports a tile's layout again only when its size changes, so a tile moved up by the fold would keep its old place.
 * In a grid each row is as tall as its tallest tile.
 */
export function stackSpan(ids: string[], boxes: Record<string, LayoutBox | undefined>, focusId: string, gap: number, columns = 1) {
  const tile = boxes[focusId];
  const index = ids.indexOf(focusId);
  if (!tile || index < 0) {
    return undefined;
  }
  const row = Math.floor(index / columns);
  const rowHeights: (number | undefined)[] = [];
  for (let start = 0; start <= row * columns; start += columns) {
    const heights = ids.slice(start, start + columns).map((id) => boxes[id]?.height);
    rowHeights.push(heights.some((height) => height === undefined) ? undefined : Math.max(...(heights as number[])));
  }
  if (rowHeights.some((height) => height === undefined)) {
    return { top: tile.y, bottom: tile.y + tile.height };
  }
  const top = rowHeights.slice(0, row).reduce<number>((sum, height) => sum + (height ?? 0) + gap, 0);
  return { top, bottom: top + (columns > 1 ? (rowHeights[row] ?? tile.height) : tile.height) };
}

/** A tile may reach this far under the sheet's top edge (its lip's last pixel) and still count as above it. */
const TILE_EDGE = 1;

/**
 * The tiles the feedback sheet's top edge would cut, or cover, once it is up: every tile after the green one (the
 * focus) that does not sit wholly above the sheet, at `sheetTop` in the scroll content. They fade away while the
 * sheet is up, so no tile's text is ever cut by its edge. Never the green tile, nor a tile before it (those sit
 * above it). In a grid the green tile's row sits whole above the sheet, so the tile next to it stays too. With no
 * focus (the sheet's edge reaches into the green tile's text: nothing gave it its room) every tile it would cut, the
 * green one too, `edge` then being how far a tile's bottom holds no text.
 */
export function tilesUnderSheet({
  ids,
  boxes,
  focusId,
  gap,
  columns = 1,
  tilesTop,
  sheetTop,
  edge = TILE_EDGE
}: {
  ids: string[];
  boxes: Record<string, LayoutBox | undefined>;
  focusId?: string;
  gap: number;
  columns?: number;
  tilesTop: number;
  sheetTop: number;
  /** How far a tile may reach under the sheet's top edge and stay (see tileTextBottom). Default: its lip's last pixel. */
  edge?: number;
}): string[] {
  const focusIndex = focusId ? ids.indexOf(focusId) : -1;
  return ids.filter((id, index) => {
    if (index <= focusIndex) {
      return false;
    }
    const span = stackSpan(ids, boxes, id, gap, columns);
    return span !== undefined && tilesTop + span.bottom > sheetTop + edge;
  });
}

/**
 * Whether a question sitting at its top reaches past the bottom of its room, `bottom` being where its last tile ends in
 * the scroll content (its lip included): the room's edge would then cut that tile. A lip's last pixel may reach past.
 */
export function overRoom(roomHeight: number, bottom: number) {
  return bottom > roomHeight + TILE_EDGE;
}

/** A tile's lip: the room's edge may cut it (only the 3D edge under the tile's face goes) and the tile still counts as whole. */
const TILE_LIP = 4;

/**
 * How far to move a question that is too tall for its room down, so that the room's bottom edge falls between two
 * tiles: the first tile the edge would cut goes wholly below it, and every tile in sight shows whole. `tiles`: where
 * each tile (or row of tiles) starts and ends in the scroll content, in order, with no space above the question.
 */
export function wholeTilesDrop(tiles: RowSpan[], roomHeight: number) {
  const cut = tiles.find((tile) => tile.top < roomHeight && tile.bottom > roomHeight + TILE_LIP);
  return cut ? Math.ceil(roomHeight - cut.top) : 0;
}

/**
 * The steps a question too tall for its room takes, one at a time and only as far as it needs, so that every answer
 * shows whole and in sight: 1 tight tiles (less padding in each), 2 also the smaller text the tiles use for long
 * answers, 3 also a smaller prompt across the full width, 4 also smaller gaps. Each step keeps the ones before it.
 */
export const FIT_STEPS = 4;

/** What a question draws at a step of its fit (see FIT_STEPS). */
export function fitLook(step: number) {
  return { tight: step >= 1, smallText: step >= 2, smallPrompt: step >= 3, smallGaps: step >= 4 };
}

/** A question as it was just drawn, for its fit (see useQuestionFit). */
export type FitMeasure = {
  /** The try it was drawn for, and the step it was drawn with. */
  key: string;
  step: number;
  /**
   * Read before the frame was drawn (a layout effect), not reported after it (onLayout). Only then is a step tried by
   * drawing it: a step's text wraps anew, so only drawing it says how tall it is.
   */
  now: boolean;
  /** The room's height with the more-below arrow hidden, and with it shown (the bar under the room grows to hold it). */
  room: number;
  arrowRoom: number;
  /** Where the question's last tile ends in the scroll content (its lip included), with no space above the question. */
  bottom: number;
  /** How much shorter the question is at least with tight tiles: known before they are drawn (see tightSaving). */
  tightSaving: number;
  /** Where each tile (or row of tiles) starts and ends in the scroll content, in order, with no space above the question. */
  tiles?: RowSpan[];
};

export type QuestionFit = {
  key: string;
  /** The step the question is drawn with (see FIT_STEPS). */
  step: number;
  /** Decided for this try: the question is drawn so until its next try, through CHECK and the sheet. */
  settled: boolean;
  /**
   * Too tall even at the last step: the question keeps its usual look and scrolls, under the arrow, and sits `drop`
   * lower than its top, so the room's edge falls between two tiles (see wholeTilesDrop).
   */
  overflow: boolean;
  drop: number;
  /** How the question measured with its usual look, for its place once no step makes it fit. */
  usual?: FitMeasure;
};

function freshFit(key: string): QuestionFit {
  return { key, step: 0, settled: false, overflow: false, drop: 0 };
}

/**
 * The next step of a question's fit, from how it measured at the step it was drawn with: it fits (done), or the next
 * step is drawn, or none is left and it keeps its usual look, placed so every tile in sight is whole. Tight tiles fit
 * or not before they are drawn (they are lower by a known amount at least), so where a size can only be read after
 * the frame is drawn, they are the only step there is.
 */
export function nextFit(fit: QuestionFit, measure: FitMeasure): QuestionFit {
  if (fit.settled || measure.key !== fit.key || measure.step !== fit.step) {
    return fit;
  }
  const usual = fit.step === 0 ? measure : fit.usual;
  if (!overRoom(measure.room, measure.bottom)) {
    return { ...fit, settled: true };
  }
  if (fit.step === 0 && measure.tightSaving > 0 && !overRoom(measure.room, measure.bottom - measure.tightSaving)) {
    return { ...fit, step: 1, settled: true, usual };
  }
  if (measure.now && fit.step < FIT_STEPS) {
    return { ...fit, step: fit.step + 1, usual };
  }
  return { ...fit, step: 0, settled: true, overflow: true, drop: usual?.tiles ? wholeTilesDrop(usual.tiles, usual.arrowRoom) : 0, usual };
}

/** A room's height as read, and whether the bar under it held the more-below arrow then (it grows to hold it). */
export type RoomRead = { height: number; hint: boolean };
/** A question's height as read, and the try (`key`) and step of its fit it was drawn with. */
export type BlockRead = { height: number; key: string; step: number };

/** A state update that keeps the room read before when nothing changed, so a report of the same size draws nothing. */
export function sameRoom(next: RoomRead) {
  return (before: RoomRead | null) => (before && before.height === next.height && before.hint === next.hint ? before : next);
}

/** The same for a question's height. */
export function sameBlock(next: BlockRead) {
  return (before: BlockRead | null) => (before && before.height === next.height && before.key === next.key && before.step === next.step ? before : next);
}

/**
 * How a question meets its room, worked out before its first frame where a view can say its size at once (see
 * laidOutHeight): a question that fits as it is stays as it is; one too tall takes the steps of FIT_STEPS one at a
 * time, each drawn and measured before the frame is painted, and keeps the first that makes it fit; one too tall even
 * then keeps its usual look and is placed so every tile in sight is whole. Decided once a try, while unchecked, and
 * kept through CHECK and the sheet, so nothing moves when the sheet comes up; a new try (`key`) is measured again.
 * Pass each measure of the question as drawn to `measure`.
 */
export function useQuestionFit(key: string) {
  const [fit, setFit] = useState<QuestionFit>(() => freshFit(key));
  const shown = fit.key === key ? fit : freshFit(key);
  const measure = useCallback((next: FitMeasure) => setFit((state) => nextFit(state.key === next.key ? state : freshFit(next.key), next)), []);
  return { ...shown, measure };
}

/** A part of a scrolling list that shows whole or not at all: a row, the Why pill, one line of the Why text. */
export type RowSpan = { top: number; bottom: number };

/** Within this of a row's edge counts as on it. */
const ROW_EDGE = 0.5;

/**
 * How a list that is too long for `limit` shows: as many whole rows from its top as fit (`viewport`), and the places
 * it may stop when scrolled (`stops`, from 0 to `end`), each with whole rows only, at its top and at its bottom. `pad`
 * is the room to add under the last row so that the end of the scroll is the last stop. Undefined when it all fits.
 */
export function wholeRows(rows: RowSpan[], contentEnd: number, limit: number) {
  if (!rows.length || contentEnd <= limit) {
    return undefined;
  }
  const spans = rows.map((row) => ({ ...row })).sort((a, b) => a.top - b.top);
  // Any room under the last row (a sign's padding) scrolls with it.
  const last = spans[spans.length - 1];
  last.bottom = Math.max(last.bottom, contentEnd);
  const fitting = spans.filter((span) => span.bottom <= limit + ROW_EDGE);
  const viewport = fitting.length ? Math.max(...fitting.map((span) => span.bottom)) : spans[0].bottom;
  const cuts = (y: number) => spans.some((span) => span.top + ROW_EDGE < y && y < span.bottom - ROW_EDGE);
  // The last stop: the first row from which the rest shows whole.
  const ends = spans.filter((span) => span.top + viewport >= last.bottom - ROW_EDGE);
  const end = ends.length ? Math.min(...ends.map((span) => span.top)) : Math.max(0, last.bottom - viewport);
  const middle = spans.map((span) => span.top).filter((top) => top > ROW_EDGE && top < end - ROW_EDGE && !cuts(top + viewport));
  const stops = [...new Set([0, ...middle, end])].sort((a, b) => a - b);
  return { viewport, stops, end, pad: Math.max(0, Math.round(end + viewport - contentEnd)) };
}

/**
 * Where the arrow scrolls a whole-row list next: a page down, so the first row that does not show whole comes to the
 * top (or as near as a stop allows), never past the end.
 */
export function nextRowStop(stops: number[], rows: RowSpan[], offset: number, viewport: number) {
  const after = stops.filter((stop) => stop > offset + ROW_EDGE);
  if (!after.length) {
    return stops[stops.length - 1] ?? 0;
  }
  const hidden = rows.filter((row) => row.bottom > offset + viewport + ROW_EDGE).sort((a, b) => a.top - b.top)[0];
  const upTo = hidden ? after.filter((stop) => stop <= hidden.top + ROW_EDGE) : [];
  return upTo.length ? upTo[upTo.length - 1] : after[0];
}

/** The stop nearest to where a drag left the list. */
export function nearestRowStop(stops: number[], offset: number) {
  return stops.reduce((best, stop) => (Math.abs(stop - offset) < Math.abs(best - offset) ? stop : best), stops[0] ?? 0);
}

/**
 * A view's height as it is laid out right now, where the platform can say it at once: on the web a view is its element,
 * and in the New Architecture a view reads its layout from the tree React has just put in place. Read in a layout
 * effect, it places things before the frame is drawn; onLayout only tells after that frame is painted. Undefined where
 * it cannot be read (a test renderer, a view with no size yet).
 */
export function laidOutHeight(view: unknown) {
  const height = (view as { offsetHeight?: unknown } | null)?.offsetHeight;
  return typeof height === "number" && height > 0 ? Math.round(height) : undefined;
}

/** A view's place in its parent and its height as laid out right now, where the platform can say them at once (see laidOutHeight). */
export function laidOutBox(view: unknown): LayoutBox | undefined {
  const top = (view as { offsetTop?: unknown } | null)?.offsetTop;
  const height = laidOutHeight(view);
  return typeof top === "number" && height !== undefined ? { y: Math.round(top), height } : undefined;
}

/**
 * Where a view starts inside `within`, one of the views holding it, as laid out right now (transforms aside), where the
 * platform can say it at once (see laidOutHeight): the places of the views between them, added up. Undefined where it
 * cannot be read.
 */
export function laidOutTop(view: unknown, within: unknown): number | undefined {
  type Placed = { offsetTop?: unknown; offsetParent?: unknown } | null | undefined;
  let node = view as Placed;
  let top = 0;
  for (let depth = 0; node && depth < 40; depth += 1) {
    if (node === within) {
      return Math.round(top);
    }
    if (typeof node.offsetTop !== "number") {
      return undefined;
    }
    top += node.offsetTop;
    node = node.offsetParent as Placed;
  }
  return undefined;
}

/**
 * On the web, the feedback sheet's height the moment it changes, before the browser draws the frame. The sheet's own
 * report (its layout) comes in a timer after that frame, so when its Why line opens, the frame would show the taller
 * sheet over tiles the question has not yet moved or faded. Any change to the sheet is a change to its views, so it is
 * read right after each one. `root`: the question's root view, which holds the sheet. On a phone this does nothing;
 * the sheet's report is all there is.
 */
export function useSheetHeightNow({
  root,
  open,
  reported,
  onHeight
}: {
  root: RefObject<View | null>;
  open: boolean;
  /** The sheet has reported a height (so its panel is there). */
  reported: boolean;
  onHeight: (height: number) => void;
}) {
  useEffect(() => {
    if (Platform.OS !== "web" || !open || typeof MutationObserver === "undefined") {
      return undefined;
    }
    // On the web a view is its element. The sheet's panel holds its content (and its padding, as the sheet counts it).
    const holder = root.current as unknown as { querySelector?: (selector: string) => HTMLElement | null } | null;
    const panel = holder?.querySelector?.('[data-testid="feedback-content"]')?.parentElement;
    if (!panel) {
      return undefined;
    }
    // The height it has now reaches the question through the sheet's own report.
    let last = panel.offsetHeight;
    // Called once React has put a change in place, before the frame is drawn.
    const observer = new MutationObserver(() => {
      const height = panel.offsetHeight;
      if (height !== last) {
        last = height;
        beforePaint(() => onHeight(height));
      }
    });
    observer.observe(panel, { attributes: true, characterData: true, childList: true, subtree: true });
    return () => observer.disconnect();
  }, [onHeight, open, reported, root]);
}

/** How long a squeezed question may take to report its new layout before the sheet is fitted anyway. */
const SETTLE_MS = 400;

export type SheetFitInput = {
  /** The sheet is up. */
  open: boolean;
  /** The sheet's full height (Why text whole, nothing scrolling), as it reports it. */
  fullHeight: number;
  /** The room under the green tile with the question as it is now (see sheetRoom). */
  room: number | undefined;
  /** Changes whenever the question's measured layout changes (prompt, tiles). */
  layoutKey: string;
  /**
   * Squeezing moves the question in a way only its next layout tells (a mascot to hide: the prompt then takes the
   * full width and wraps anew). Grey tiles that fold away do not count: where the green tile then sits is known from
   * the heights of the tiles that stay (see stackSpan), so the sheet is told its room at once.
   */
  squeezeMoves: boolean;
};

/**
 * Makes room for the feedback sheet by taking it from the question first. While the sheet's full height (Why line
 * open, nothing scrolling) is more than the room under the green tile, the question is squeezed: the grey tiles fold
 * away and the mascot hides, until the next question. When the mascot hides, the sheet is told the room (`fitted`)
 * only once the squeezed question has reported its new layout, so it never shrinks for a stale one; only if even
 * that room is too small does the sheet go slim and, after that, let its Why text scroll.
 */
export function useSheetFit({ open, fullHeight, room, layoutKey, squeezeMoves }: SheetFitInput) {
  // The layout the question had when it was squeezed; undefined while not squeezed.
  const [squeezedAt, setSqueezedAt] = useState<string | undefined>(undefined);
  const [timedOut, setTimedOut] = useState(false);
  const tooTall = open && room !== undefined && fullHeight > 0 && fullHeight > room;
  // Before the frame is drawn, with the layout it was squeezed at: a view read at once in that same commit (the prompt
  // wrapped anew) then shows the question has settled before any frame does.
  useLayoutEffect(() => {
    if (!open) {
      setSqueezedAt(undefined);
      setTimedOut(false);
    } else if (tooTall && squeezedAt === undefined) {
      setSqueezedAt(layoutKey);
    }
  }, [layoutKey, open, squeezedAt, tooTall]);
  const squeeze = open && (squeezedAt !== undefined || tooTall);
  const settling = squeeze && squeezeMoves && !timedOut && (squeezedAt === undefined || squeezedAt === layoutKey);
  useEffect(() => {
    if (!settling) {
      return undefined;
    }
    const timer = setTimeout(() => setTimedOut(true), SETTLE_MS);
    return () => clearTimeout(timer);
  }, [settling]);
  return {
    /** Fold the grey tiles away and hide the mascot. */
    squeeze,
    /** The room may be passed to the sheet as its maxHeight. */
    fitted: open && !settling
  };
}
