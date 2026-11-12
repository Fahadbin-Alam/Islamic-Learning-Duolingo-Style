import { useCallback, useEffect, useRef, useState } from "react";
import { playAyah, stopAyah } from "../../services/ayahPlayer";
import { useAyahPlayback } from "./AyahListen";

/** A passage being recited ayah by ayah: its recitations, the one asked for, and how often each is said. */
export type AyahQueue = {
  urls: readonly string[];
  /** The ayah being recited, from 0. */
  at: number;
  /** How many times it has been said already. */
  heard: number;
  /** How many times each ayah is said before the next one: 1 to listen, more to say it after the reciter. */
  times: number;
};

/**
 * Recites ayahs one after another on the shared ayah player, each `times` times. The queue ends after the last ayah,
 * when a recitation cannot load, when another recitation takes over, with stop(), or when the screen using it goes.
 * Nothing starts by itself: only play() starts it.
 */
export function useAyahQueue() {
  const playback = useAyahPlayback();
  const [queue, setQueue] = useState<AyahQueue | null>(null);
  // How many times a passage was recited to its very end (not stopped): a screen can cheer when it goes up.
  const [ended, setEnded] = useState(0);
  const queueRef = useRef(queue);
  queueRef.current = queue;
  // The ayah asked for has begun (loading or playing), so its going quiet means it ended.
  const started = useRef(false);

  useEffect(() => {
    if (!queue) return;
    const url = queue.urls[queue.at];
    if (playback.url !== url) {
      // Another recitation started after this one had begun: the passage stops here.
      if (started.current) {
        started.current = false;
        setQueue(null);
      }
      return;
    }
    if (playback.status === "playing" || playback.status === "loading") {
      started.current = true;
      return;
    }
    if (playback.status === "error") {
      started.current = false;
      setQueue(null);
      return;
    }
    if (!started.current) return;
    // The ayah ended: once more, the next ayah, or the end of the passage.
    started.current = false;
    if (queue.heard + 1 < queue.times) {
      setQueue({ ...queue, heard: queue.heard + 1 });
      playAyah(url, { once: true });
    } else if (queue.at + 1 < queue.urls.length) {
      setQueue({ ...queue, at: queue.at + 1, heard: 0 });
      playAyah(queue.urls[queue.at + 1], { once: true });
    } else {
      setQueue(null);
      setEnded((count) => count + 1);
    }
  }, [playback, queue]);

  // Leaving the screen stops the recitation.
  useEffect(
    () => () => {
      const current = queueRef.current;
      if (current) stopAyah(current.urls[current.at]);
    },
    []
  );

  /** Recites `urls` from ayah `from` (counted from 0) to the end, each `times` times. */
  const play = useCallback((urls: readonly string[], from = 0, times = 1) => {
    const url = urls[from];
    if (!url) return;
    started.current = false;
    setQueue({ urls, at: from, heard: 0, times: Math.max(1, Math.floor(times)) });
    playAyah(url, { once: true });
  }, []);

  const stop = useCallback(() => {
    const current = queueRef.current;
    started.current = false;
    setQueue(null);
    if (current) stopAyah(current.urls[current.at]);
  }, []);

  /** Each ayah from now on is said this many times. */
  const setTimes = useCallback((times: number) => {
    setQueue((current) => (current ? { ...current, times: Math.max(1, Math.floor(times)) } : current));
  }, []);

  return { queue, playback, ended, play, stop, setTimes };
}
