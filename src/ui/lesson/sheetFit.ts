import { useCallback, useEffect, useLayoutEffect, useRef, useState, type RefObject } from "react";
import { Platform, type ScrollView, type View } from "react-native";
import { space } from "../theme";
import { beforePaint, type ScrollHintDirection } from "./ScrollHint";

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
 * A part of a question above its green tile in the scroll content (the prompt, a tile that stays while the sheet is
 * up): where its box starts and ends, and how far up from its bottom it holds no text (a prompt's margin, a tile's lip).
 */
export type PartSpan = { top: number; bottom: number; blank?: number };

/** Air kept above a part of a question at the room's top edge when it rests scrolled (see questionStops). */
const STOP_AIR = space.sm;

/**
 * Where a question the learner left scrolled down (by hand or with the arrow) sits while the sheet is up: where its
 * green tile stays where it showed (`kept`: where the learner left the scroll, less the room that folded above the
 * green tile), or further down where the sheet needs it to (`sheetY`, see sheetScrollY), never back up past that: the
 * learner scrolled the prompt away, and the green tile does not slide down for it. Never so far that the green tile's
 * own top goes over the room's top edge (`ceiling`). Where the room's top edge would then cross the text of a part
 * above the green tile (`parts`: the prompt, a tile that stays; in order), it goes to the nearer place either way where
 * the edge falls between two parts: up so the part shows whole (no further up than `sheetY`), or down so it is wholly
 * over the edge. With no such place, or nothing kept, it goes to `sheetY`, as a question not scrolled does.
 */
export function keptScrollY(sheetY: number, kept: number | undefined, parts: PartSpan[], ceiling: number) {
  const at = kept === undefined ? undefined : Math.round(Math.min(kept, ceiling));
  if (at === undefined || at <= sheetY + AT_TARGET) {
    return sheetY;
  }
  const crossed = (y: number) => parts.find((part) => y > part.top + AT_TARGET && y < part.bottom - (part.blank ?? 0) - AT_TARGET);
  const cut = crossed(at);
  if (!cut) {
    return at;
  }
  const above = parts.slice(0, parts.indexOf(cut)).reduce((end, part) => Math.max(end, part.bottom), 0);
  const up = Math.round(Math.max(above, cut.top - STOP_AIR, 0, sheetY));
  const down = Math.round(cut.bottom);
  const upOk = !crossed(up);
  const downOk = down <= ceiling + AT_TARGET && !crossed(down);
  if (upOk && (!downOk || at - up <= down - at)) {
    return up;
  }
  return downOk ? down : sheetY;
}

/**
 * Whether a sheet `sheetHeight` tall reaches into the green tile's text, the question scrolled as far as it may go:
 * further into the tile than `textBottom`, its lip, border and padding (see tileTextBottom), by the very edge the green
 * tile is gone at once the sheet is up (not a pixel past it, nor rounded). So where this says no, the green tile stays
 * and the sheet's edge cuts none of its lines; where it says yes, the picked tile above it folds away first, where that
 * keeps the green tile's text clear.
 */
export function reachesText(layout: SheetFitLayout, sheetHeight: number, textBottom: number) {
  return sheetHeight > layout.visibleBottom - (layout.focusBottom - sheetRoom(layout).furthest) + textBottom;
}

/**
 * Whether the picked tile, above the green one, is folded away while the sheet is up: from the render `now` first
 * says so, and then for as long as the sheet stays up on that try (`tryKey`), also once the sheet grows (its Why line
 * opening) and `now` would no longer say so. A tile folded under the sheet never comes back while it is up, so the
 * green tile never moves down under it.
 */
export function usePickFold({ open, now, tryKey }: { open: boolean; now: boolean; tryKey: string }) {
  // Kept, not drawn: the render that first says so already folds the tile, and every later one reads this. A state
  // here would draw the question once more, before the frame, for nothing.
  const held = useRef<string | null>(null);
  useLayoutEffect(() => {
    if (!open) {
      held.current = null;
    } else if (now) {
      held.current = tryKey;
    }
  }, [now, open, tryKey]);
  return open && (now || held.current === tryKey);
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
 * goes (see sheetScrollY) when that is known: with the room folds left closed, as it is once they have closed.
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
 * throw it up the screen, past where it goes (`aim`, the room folds left closed) and back, or over the room's top edge.
 * The question scrolls up with it instead, as far as keeps the green tile where it showed, but never past where it
 * goes: from there it only goes on the same way. Without a known place to go to, it keeps the green tile where it
 * showed.
 */
export function foldScrollY(from: number, rise: number, aim: number | undefined) {
  const kept = from - rise;
  return Math.max(0, Math.min(from, aim === undefined ? kept : Math.max(kept, aim)));
}

/**
 * How much of the room tiles fold out of above the green tile a question left scrolled down can take up with its own
 * scroll, in the frame they fold: from where it sits (`at`) back as far as where it then goes (`aim`), the folds done
 * and their room closed, and never past that, so it never has to turn round on its way there. A question that goes on
 * down from where it sits takes up none: the room closes with the sheet, the same way the question goes.
 */
export function foldSoak(at: number, aim: number) {
  return Math.max(0, Math.round(at - aim));
}

/**
 * The room each tile that folds away leaves while the sheet comes up (see FoldGap), in the order the tiles sit. A
 * question the learner left scrolled down (by hand or with the arrow) scrolls up with the tiles above the green one
 * instead, in the frame they fold, as far as its scroll goes towards where it then sits (`scrolled`, what is left of
 * that: see foldSoak): the green tile stays where it showed (see foldScrollY), and only the rest of their room is
 * left, to close with the sheet's spring. Tiles under the green one leave all of theirs. Returns each tile's room and
 * what is left of the scroll.
 */
export function foldRooms(tiles: { id: string; room: number; above: boolean }[], scrolled: number) {
  let left = Math.max(0, scrolled);
  const rooms: Record<string, number> = {};
  for (const tile of tiles) {
    const taken = tile.above ? Math.min(left, tile.room) : 0;
    left -= taken;
    rooms[tile.id] = tile.room - taken;
  }
  return { rooms, left };
}

/**
 * What the room folds leave (see FoldGap) does above `top` in `within` right now, where a view can say its place at
 * once: `closed`, how much of it has closed so far (that carried the parts under it up on their glide with the sheet,
 * which no scroll is to make up for), and `held`, all of it as it opened (closed and still open), which is gone once it
 * has closed, where the question goes. `gaps`: each gap's view and its height as it opened.
 */
export function gapsAbove(gaps: { view: unknown; from: number }[], within: unknown, top: number) {
  let closed = 0;
  let held = 0;
  for (const gap of gaps) {
    const at = laidOutTop(gap.view, within);
    const now = (gap.view as { offsetHeight?: unknown } | null)?.offsetHeight;
    if (at !== undefined && at <= top && typeof now === "number") {
      closed += Math.max(0, gap.from - now);
      held += Math.max(gap.from, now);
    }
  }
  return { closed, held };
}

/** `value`, or `floor` where that is further. */
function atLeast(value: number, floor: number | undefined) {
  return floor === undefined ? value : Math.max(value, floor);
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
  // Where the question last sent itself while this sheet is up (none yet: the sheet is still coming up), whether it
  // glided there, and how long its content said it was then.
  const sent = useRef<number | undefined>(undefined);
  // Once the Why line is open the sheet has grown, and the question only goes on down from where it was sent: tiles
  // that fold above the green tile (or a prompt that wraps anew) by more than the sheet grew would otherwise send it
  // back up to a place less far, and the prompt, moved up at CHECK, would move back down. It stays where it was sent
  // instead (the green tile, risen with the fold, sits a little higher above the sheet), until the Why line is shut.
  const whyFloor = useRef<number | undefined>(undefined);
  whyFloor.current = open && whyOpened ? Math.max(whyFloor.current ?? 0, sent.current ?? 0) : undefined;
  const aim = open && ready && !settling ? atLeast(target, whyFloor.current) : undefined;
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
    setPast(false);
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
    // Once the Why line is open it never goes back to a place less far than it was sent, the fold's scroll neither.
    const y = atLeast(foldScrollY(from, rise, places.aim === undefined ? undefined : atLeast(places.aim, whyFloor.current)), whyFloor.current);
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
    // Drawn again before this frame only for what changes: a scroll on its way to where it was sent changes nothing.
    const passes = isPast !== past;
    const settles = !onItsWay && settled !== goal;
    if (passes || settles || arrived) {
      beforePaint(() => {
        if (passes) {
          setPast(isPast);
        }
        if (settles) {
          setSettled(goal);
        }
        if (arrived) {
          setArrivals((count) => count + 1);
        }
      });
    }
  };
  // Held at the place it sits (or goes to, when that is further down): the content's own length covers that place
  // again once it is there.
  const minHeight = open && viewport > 0 ? viewport + Math.max(offset.current, aim ?? 0) : undefined;
  // Where the question goes for a place worked out as `target` is: once the Why line is open, never less far than it
  // was sent (see whyFloor). What the sheet's top edge would cut is found there.
  const goesTo = (place: number) => atLeast(place, whyFloor.current);
  // Scrolled past their top by a hand (or the arrow) before CHECK too: the scroll edge never cuts them at rest.
  return { gone: past || (open && heading), onScroll, minHeight, goesTo };
}

/** Where a part sits on screen, or its lines of text do: from its top edge (its first line's) to its bottom (its last's). */
export type ScreenSpan = { top: number; bottom: number };

/** Whether text at `text` shows whole between `top` and `bottom` (the room's edges, the sheet's top edge). */
export function showsWhole(text: ScreenSpan, top: number, bottom: number) {
  return text.top >= top - AT_TARGET && text.bottom <= bottom + AT_TARGET;
}

/**
 * Whether a tile's text shows whole in its room as the views report their places (where none can say its place on
 * screen at once): `span`, where the tile starts and ends in the scroll content; `insets`, how far in from its top and
 * bottom edges its text sits (its border, padding and lip); `scrollY`, where the room's top edge sits in the content;
 * `room`, the room's height.
 */
export function textInRoom(span: ScreenSpan, insets: ScreenSpan, scrollY: number, room: number) {
  return showsWhole({ top: span.top + insets.top, bottom: span.bottom - insets.bottom }, scrollY, scrollY + room);
}

/**
 * Where a view's lines of text sit on screen right now (not its box: a tile's border, padding and lip hold none), where
 * a view can say it at once: on the web a view is its element, and its text is in its text nodes. Undefined elsewhere,
 * or when it holds no text.
 */
export function textOnScreen(view: unknown): ScreenSpan | undefined {
  const node = view as Node | null;
  if (Platform.OS !== "web" || !node || typeof document === "undefined" || typeof document.createTreeWalker !== "function") {
    return undefined;
  }
  const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT);
  const range = document.createRange();
  let top = Infinity;
  let bottom = -Infinity;
  for (let text = walker.nextNode(); text; text = walker.nextNode()) {
    if (!text.textContent?.trim()) {
      continue;
    }
    range.selectNodeContents(text);
    for (const rect of Array.from(range.getClientRects())) {
      if (rect.width > 0.5 && rect.height > 0.5) {
        top = Math.min(top, rect.top);
        bottom = Math.max(bottom, rect.bottom);
      }
    }
  }
  return top <= bottom ? { top, bottom } : undefined;
}

/** A view's top and bottom edges on screen right now, where a view can say them at once (see textOnScreen). */
export function edgesOnScreen(view: unknown): ScreenSpan | undefined {
  if (Platform.OS !== "web") {
    return undefined;
  }
  const rect = (view as { getBoundingClientRect?: () => { top: number; bottom: number; height: number } } | null)?.getBoundingClientRect?.();
  return rect && rect.height > 0 ? { top: rect.top, bottom: rect.bottom } : undefined;
}

/** Where the feedback sheet's top edge sits on screen right now (see edgesOnScreen); `root` holds the sheet. */
export function sheetTopOnScreen(root: unknown) {
  const holder = root as { querySelector?: (selector: string) => HTMLElement | null } | null;
  return edgesOnScreen(holder?.querySelector?.('[data-testid="feedback-content"]')?.parentElement)?.top;
}

/** Where a part's text, the room's edges and the sheet's top edge (when it is up) sit on screen. */
export type GlideRead = { text: ScreenSpan; top: number; bottom: number; sheetTop?: number };

/** Whether a part's text shows whole in its room, and above the sheet's top edge too where `sheet` says so. */
function readWhole(at: GlideRead, sheet: boolean) {
  return showsWhole(at.text, at.top, sheet && at.sheetTop !== undefined ? Math.min(at.bottom, at.sheetTop) : at.bottom);
}

/** How long the sheet takes to come up and the question to glide to its place with it, where no frame can be read. */
export const GLIDE_MS = 600;
/**
 * How long the frames are read for, at most, after the question last set off somewhere: by then it has come to rest,
 * and a tile still kept out of sight (one whose text the room's edge cuts where the question rests) is let in, as an
 * edge at rest cuts no text on its way.
 */
export const GLIDE_WATCH_MS = 2000;
const NONE: string[] = [];

/**
 * The tiles kept out of sight while the feedback sheet comes up. A tile whose text did not show whole in the room as
 * CHECK was tapped (out of sight under the room's bottom edge or over its top, as a question too tall for its room
 * rests, or cut by one of them after a hand scroll) glides into sight with the question, and on its way the room's edge
 * would cut its lines. It is gone instead, from the very frame the sheet opens, and fades in once it shows whole: each
 * frame is read before it is drawn, where a view can say its place at once (elsewhere it fades in once the sheet has
 * come up), so no frame shows its text cut; one the room's edge still cuts where the question comes to rest fades in
 * then (see GLIDE_WATCH_MS). The sheet's "Correct answer" line names the right one meanwhile.
 * `ids`: the tiles that stay while the sheet is up, as CHECK is tapped; `read`: where a tile's text and the edges it
 * must show whole between sit on screen right now, undefined where that cannot be read (or the tile has gone);
 * `laidOut`: where it cannot, whether a tile's text shows whole in its room as the views report their places (see
 * textInRoom); `moves`: changes whenever the question sets off somewhere new (the sheet grows as its Why line opens),
 * so its frames are read again. `tryKey`: the question and its try; a new try shows every tile again.
 */
export function useGlideIn({
  open,
  tryKey,
  ids,
  read,
  laidOut,
  moves
}: {
  open: boolean;
  tryKey: string;
  ids: string[];
  read: (id: string) => GlideRead | undefined;
  laidOut?: (id: string) => boolean | undefined;
  moves?: string;
}) {
  const [held, setHeld] = useState<{ key: string; ids: string[] } | null>(null);
  const readRef = useRef(read);
  readRef.current = read;
  // The try it was read for while the sheet is up.
  const decided = useRef<string | null>(null);
  // Read once, as the sheet opens, before that frame is drawn: where the learner left the question in its room (the
  // sheet is still under the screen's edge). Nothing is drawn again for it when every tile shows whole.
  useLayoutEffect(() => {
    if (!open) {
      decided.current = null;
      return;
    }
    if (decided.current === tryKey) {
      return;
    }
    decided.current = tryKey;
    const away = ids.filter((id) => {
      const at = readRef.current(id);
      return at !== undefined ? !readWhole(at, false) : laidOut?.(id) === false;
    });
    if (away.length > 0 || held?.key === tryKey) {
      setHeld({ key: tryKey, ids: away });
    }
    // Only as the sheet opens on a try: what is kept out of sight then is let in by the frames below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, tryKey]);
  const hidden = open && held?.key === tryKey ? held.ids : NONE;
  const hiddenKey = hidden.join("\u0000");
  useEffect(() => {
    if (!hidden.length) {
      return undefined;
    }
    const letIn = (shown: string[]) =>
      beforePaint(() => setHeld((was) => (was && was.key === tryKey ? { key: tryKey, ids: was.ids.filter((id) => !shown.includes(id)) } : was)));
    // Where no frame can say where a tile sits, it fades in once the sheet has come up and the question with it.
    if (typeof requestAnimationFrame !== "function" || hidden.every((id) => readRef.current(id) === undefined)) {
      const timer = setTimeout(() => letIn(hidden), GLIDE_MS);
      return () => clearTimeout(timer);
    }
    const started = Date.now();
    let frame = 0;
    const tick = () => {
      const rested = Date.now() - started >= GLIDE_WATCH_MS;
      const shown = rested
        ? hidden
        : hidden.filter((id) => {
            const at = readRef.current(id);
            // A tile that has gone (folded away) is let go of too.
            return at === undefined || readWhole(at, true);
          });
      if (shown.length) {
        letIn(shown);
      }
      if (shown.length < hidden.length) {
        frame = requestAnimationFrame(tick);
      }
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hiddenKey, tryKey, moves]);
  return hidden;
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
export const TILE_LIP = 4;

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
 * Where a question too tall for its room even at the last step of its fit rests when the arrow scrolls it, so that
 * every part of it in sight there is whole: its top (placed so the room's bottom edge falls between two tiles, see
 * wholeTilesDrop), its end, and between them the places where both edges of the room fall between two parts. Each
 * place but the top has the room's top edge just above a part (the chips, the prompt, a tile or a row of tiles), with
 * a little air when the gap above it allows. The end is the first such place from which the rest shows whole: the
 * question's content reaches just so far under it (`end` + `viewport`), so a hand can scroll it no further either.
 * `rows`: where each part starts and ends in the scroll content, in order (a tile's lip included); `viewport`: the
 * room's height with the arrow's room taken, which it keeps all through the try; `contentEnd`: where the question ends
 * in the scroll content (the space under its last tile included), which shows at the end too, so the scroll can stop
 * there and nowhere further. Undefined when it all shows at its top.
 */
export function questionStops(rows: RowSpan[], viewport: number, contentEnd = 0) {
  // Parts side by side (a grid of tiles) make one row.
  const spans: RowSpan[] = [];
  for (const row of rows.filter((entry) => entry.bottom > entry.top).sort((a, b) => a.top - b.top)) {
    const before = spans[spans.length - 1];
    if (before && row.top < before.bottom - ROW_EDGE) {
      before.bottom = Math.max(before.bottom, row.bottom);
    } else {
      spans.push({ ...row });
    }
  }
  if (!spans.length || viewport <= 0) {
    return undefined;
  }
  const last = spans[spans.length - 1];
  const shows = (stop: number) => last.bottom <= stop + viewport + TILE_LIP && contentEnd <= stop + viewport + ROW_EDGE;
  if (shows(0)) {
    return undefined;
  }
  const places = spans.slice(1).map((row, index) => Math.round(Math.max(spans[index].bottom, row.top - STOP_AIR)));
  const cutsBottom = (y: number) => spans.some((row) => row.top < y - ROW_EDGE && row.bottom > y + TILE_LIP);
  const end = places.find(shows) ?? Math.max(0, Math.round(Math.max(last.bottom, contentEnd) - viewport));
  const middle = places.filter((stop) => stop > ROW_EDGE && stop < end - ROW_EDGE && !cutsBottom(stop + viewport));
  return { stops: [...new Set([0, ...middle, end])].sort((a, b) => a - b), end, rows: spans, viewport };
}

export type QuestionStops = NonNullable<ReturnType<typeof questionStops>>;

/**
 * The more-below arrow of a question too tall for its room even at the last step of its fit (see questionStops): its
 * room stays in the bar all through the try, so the room above never changes its height (and a scroll at its end is
 * never pulled back as the arrow goes). A tap scrolls a page down to the next place where every part in sight is
 * whole; at the end it turns to point up, and a tap goes back to the top. `key`: the question and its try; a new one
 * starts at the top. Pass every scroll offset to `onScroll`.
 */
export function useStopsArrow({ key, stops, scrollRef }: { key: string; stops: QuestionStops | undefined; scrollRef: RefObject<ScrollView | null> }) {
  // Where it is scrolled to, and whether that is its end (only that draws anew).
  const offset = useRef({ key, y: 0 });
  const [endOf, setEndOf] = useState<string | undefined>(undefined);
  const atEnd = stops !== undefined && endOf === key;
  const onScroll = (y: number) => {
    offset.current = { key, y };
    const end = stops !== undefined && y >= stops.end - ROW_EDGE;
    setEndOf((before) => (end ? key : before === key ? undefined : before));
  };
  const onPress = () => {
    if (!stops) {
      return;
    }
    const y = offset.current.key === key ? offset.current.y : 0;
    scrollRef.current?.scrollTo?.({ y: atEnd ? 0 : nextRowStop(stops.stops, stops.rows, y, stops.viewport), animated: true });
  };
  return { direction: (atEnd ? "up" : "down") as ScrollHintDirection, onScroll, onPress };
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
  // The layout the question had when it was squeezed; undefined while not squeezed. Kept, not drawn: the render that
  // first finds the sheet too tall already squeezes, and every later one reads this (a state would draw the question
  // once more, before the frame, for nothing).
  const squeezed = useRef<string | undefined>(undefined);
  const squeezedAt = open ? squeezed.current : undefined;
  const [timedOut, setTimedOut] = useState(false);
  const tooTall = open && room !== undefined && fullHeight > 0 && fullHeight > room;
  // Before the frame is drawn, with the layout it was squeezed at: a view read at once in that same commit (the prompt
  // wrapped anew) then shows the question has settled before any frame does.
  useLayoutEffect(() => {
    if (!open) {
      squeezed.current = undefined;
      if (timedOut) {
        setTimedOut(false);
      }
    } else if (tooTall && squeezed.current === undefined) {
      squeezed.current = layoutKey;
    }
  }, [layoutKey, open, timedOut, tooTall]);
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
