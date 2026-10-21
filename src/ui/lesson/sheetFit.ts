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
