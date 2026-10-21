import { useEffect, useState } from "react";
import { space } from "../theme";

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

/** Where to scroll so the green tile sits right above a sheet `sheetHeight` tall, never further than `furthest`. */
export function sheetScrollY(layout: SheetFitLayout, sheetHeight: number, furthest: number) {
  return Math.max(0, Math.min(layout.focusBottom + space.md - (layout.visibleBottom - sheetHeight), furthest));
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
 * above it). In a grid the green tile's row sits whole above the sheet, so the tile next to it stays too.
 */
export function tilesUnderSheet({
  ids,
  boxes,
  focusId,
  gap,
  columns = 1,
  tilesTop,
  sheetTop
}: {
  ids: string[];
  boxes: Record<string, LayoutBox | undefined>;
  focusId?: string;
  gap: number;
  columns?: number;
  tilesTop: number;
  sheetTop: number;
}): string[] {
  const focusIndex = focusId ? ids.indexOf(focusId) : -1;
  return ids.filter((id, index) => {
    if (index <= focusIndex) {
      return false;
    }
    const span = stackSpan(ids, boxes, id, gap, columns);
    return span !== undefined && tilesTop + span.bottom > sheetTop + TILE_EDGE;
  });
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
  /** Squeezing changes the layout (there are grey tiles to fold, or a mascot to hide). */
  squeezeMoves: boolean;
};

/**
 * Makes room for the feedback sheet by taking it from the question first. While the sheet's full height (Why line
 * open, nothing scrolling) is more than the room under the green tile, the question is squeezed: the grey tiles fold
 * away and the mascot hides, until the next question. Only once the squeezed question has reported its new layout
 * is the sheet told the room (`fitted`), so it never shrinks for a stale one; only if even that room is too small
 * does the sheet go slim and, after that, let its Why text scroll.
 */
export function useSheetFit({ open, fullHeight, room, layoutKey, squeezeMoves }: SheetFitInput) {
  // The layout the question had when it was squeezed; undefined while not squeezed.
  const [squeezedAt, setSqueezedAt] = useState<string | undefined>(undefined);
  const [timedOut, setTimedOut] = useState(false);
  const tooTall = open && room !== undefined && fullHeight > 0 && fullHeight > room;
  useEffect(() => {
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
