import * as Application from "expo-application";
import { AppState, Platform } from "react-native";
import { getStoredItem, setStoredItem } from "./appStorage";

/**
 * Anonymous usage stats and crash reports, sent to PostHog (posthog.com) as plain HTTP so no native SDK is needed.
 *
 * What is sent: what happened (a lesson started, quit or finished, a tab opened, the app opened, a crash), the
 * lesson's id, the app version, phone type, app language and a coarse age band. Never a name, email, account,
 * family code, answer text or advertising id. Learners 13 and over get a random id made on this phone, so
 * "came back on day 7" can be counted; learners under 13 get none: each of their events counts on its own.
 * Anyone can turn usage stats off in Settings; crash reports (which carry no id at all) still go.
 *
 * Events wait on the phone (offline too) and go in batches once there is a connection. Without a key
 * (EXPO_PUBLIC_POSTHOG_KEY, set with `eas env:create`) nothing is kept or sent.
 */

// Expo only inlines EXPO_PUBLIC_* values read as a plain `process.env.NAME` expression.
const rawKey = process.env.EXPO_PUBLIC_POSTHOG_KEY;
const rawHost = process.env.EXPO_PUBLIC_POSTHOG_HOST;

export const ANALYTICS_CONFIG = {
  apiKey: (rawKey ?? "").trim(),
  host: ((rawHost ?? "").trim() || "https://us.i.posthog.com").replace(/\/+$/, ""),
  /** Oldest events are dropped past this, so a phone that is offline for months never fills up. */
  maxQueue: 300,
  batchSize: 50,
  flushEveryMs: 30_000
};

export type AgeBand = "under13" | "13-17" | "18+" | "unknown";

export type AnalyticsEvent = {
  event: string;
  properties: Record<string, string | number | boolean | null | undefined | unknown[]>;
  timestamp: string;
  /** An event with no id (crashes, under-13 learners) gets a fresh one when it is sent. */
  distinctId?: string;
};

type Settings = { installId: string; firstOpenDay: string; usageOff?: boolean };

type Context = { ageBand: AgeBand; language: string };

type Fetch = (url: string, init: { method: string; headers: Record<string, string>; body: string }) => Promise<{ ok: boolean; status: number }>;

let context: Context = { ageBand: "unknown", language: "en" };
let queue: AnalyticsEvent[] | null = null;
let sending: Promise<void> | null = null;
let fetcher: Fetch = (url, init) => fetch(url, init);

const isEnabled = () => ANALYTICS_CONFIG.apiKey.length > 0;

function randomId() {
  const hex = () => Math.floor(Math.random() * 0x10000).toString(16).padStart(4, "0");
  return `${hex()}${hex()}-${hex()}-4${hex().slice(1)}-${hex()}-${hex()}${hex()}${hex()}`;
}

const today = (now = new Date()) => now.toISOString().slice(0, 10);

function readSettings(): Settings {
  try {
    const saved = JSON.parse(getStoredItem("sira-path-analytics") ?? "null") as Settings | null;
    if (saved?.installId && saved.firstOpenDay) return saved;
  } catch {
    // A damaged entry is replaced below.
  }
  const fresh: Settings = { installId: randomId(), firstOpenDay: today() };
  setStoredItem("sira-path-analytics", JSON.stringify(fresh));
  return fresh;
}

function readQueue() {
  if (!queue) {
    try {
      const saved = JSON.parse(getStoredItem("sira-path-analytics-queue") ?? "[]");
      queue = Array.isArray(saved) ? saved : [];
    } catch {
      queue = [];
    }
  }
  return queue;
}

function saveQueue() {
  setStoredItem("sira-path-analytics-queue", JSON.stringify(readQueue()));
}

/** Usage stats are on unless turned off in Settings. */
export function isUsageStatsOn() {
  return !readSettings().usageOff;
}

export function setUsageStatsOn(on: boolean) {
  const settings = readSettings();
  setStoredItem("sira-path-analytics", JSON.stringify({ ...settings, usageOff: !on }));
  if (!on) {
    // What was waiting goes too, except crash reports.
    queue = readQueue().filter((item) => item.event === "$exception");
    saveQueue();
  }
}

export function ageBandFor(ageGroup: string | undefined, isChildAccount = false): AgeBand {
  if (isChildAccount || ageGroup === "6-9" || ageGroup === "10-12") return "under13";
  if (ageGroup === "13-17" || ageGroup === "18+") return ageGroup;
  return "unknown";
}

/** Who is learning, as far as stats go: kept up to date by the app as the age or language changes. */
export function setAnalyticsContext(next: Partial<Context>) {
  context = { ...context, ...next };
}

function baseProperties() {
  return {
    platform: Platform.OS,
    app_version: Application.nativeApplicationVersion ?? "dev",
    app_build: Application.nativeBuildVersion ?? "dev",
    language: context.language,
    age_band: context.ageBand
  };
}

function enqueue(item: AnalyticsEvent) {
  const items = readQueue();
  items.push(item);
  if (items.length > ANALYTICS_CONFIG.maxQueue) {
    // Crash reports are kept over usage events when the queue is full.
    const overflow = items.length - ANALYTICS_CONFIG.maxQueue;
    const dropAt = items.findIndex((entry) => entry.event !== "$exception");
    items.splice(dropAt === -1 ? 0 : dropAt, overflow);
  }
  saveQueue();
  if (items.length >= ANALYTICS_CONFIG.batchSize) void flushAnalytics();
}

/** One usage event: "lesson_start", "lesson_quit", ... Nothing happens without a key or with stats off. */
export function track(event: string, properties: AnalyticsEvent["properties"] = {}) {
  if (!isEnabled() || !isUsageStatsOn()) return;
  const settings = readSettings();
  // Before the age is known it is treated as under 13.
  const withId = context.ageBand === "13-17" || context.ageBand === "18+";
  enqueue({
    event,
    properties: {
      ...baseProperties(),
      ...properties,
      // Days since this phone first opened Muslimo: day 0, day 1, day 7 ... (13 and over only).
      ...(!withId
        ? {}
        : { days_since_install: Math.round((Date.parse(today()) - Date.parse(settings.firstOpenDay)) / 86_400_000) })
    },
    timestamp: new Date().toISOString(),
    distinctId: withId ? settings.installId : undefined
  });
}

/** A crash or caught error. Carries no id, so it cannot be tied to a learner, and goes even with stats off. */
export function reportError(error: unknown, extra: { fatal?: boolean; where?: string } = {}) {
  if (!isEnabled()) return;
  const err = error instanceof Error ? error : new Error(String(error));
  enqueue({
    event: "$exception",
    properties: {
      ...baseProperties(),
      $exception_list: [
        {
          type: err.name || "Error",
          value: err.message.slice(0, 500),
          mechanism: { handled: !extra.fatal, synthetic: false }
        }
      ],
      $exception_message: err.message.slice(0, 500),
      $exception_type: err.name || "Error",
      stack: (err.stack ?? "").slice(0, 4000),
      fatal: Boolean(extra.fatal),
      where: extra.where
    },
    timestamp: new Date().toISOString()
  });
}

/** Sends what is waiting. A failed send (offline, server down) keeps the events for the next try. */
export function flushAnalytics(): Promise<void> {
  if (!isEnabled()) return Promise.resolve();
  if (sending) return sending;
  sending = (async () => {
    try {
      while (readQueue().length) {
        const batch = readQueue().slice(0, ANALYTICS_CONFIG.batchSize);
        const response = await fetcher(`${ANALYTICS_CONFIG.host}/batch/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            api_key: ANALYTICS_CONFIG.apiKey,
            batch: batch.map((item) => ({
              event: item.event,
              timestamp: item.timestamp,
              properties: {
                ...item.properties,
                distinct_id: item.distinctId ?? randomId(),
                // No person profiles, no city or country from the phone's address.
                $process_person_profile: false,
                $geoip_disable: true,
                $lib: "muslimo-app"
              }
            }))
          })
        });
        // 4xx other than rate limits means the batch itself is bad: drop it rather than retry forever.
        if (!response.ok && (response.status >= 500 || response.status === 429)) return;
        queue = readQueue().slice(batch.length);
        saveQueue();
      }
    } catch {
      // Offline: try again later.
    } finally {
      sending = null;
    }
  })();
  return sending;
}

type ErrorUtilsLike = {
  getGlobalHandler: () => (error: unknown, isFatal?: boolean) => void;
  setGlobalHandler: (handler: (error: unknown, isFatal?: boolean) => void) => void;
};

let started = false;

/**
 * Called once at launch: catches crashes, sends what earlier sessions left, and sends again every 30 seconds
 * while open and whenever the app goes to the background.
 */
export function startAnalytics() {
  if (started || !isEnabled()) return () => undefined;
  started = true;
  readSettings();

  const errorUtils = (globalThis as { ErrorUtils?: ErrorUtilsLike }).ErrorUtils;
  if (errorUtils) {
    const previous = errorUtils.getGlobalHandler();
    errorUtils.setGlobalHandler((error, isFatal) => {
      try {
        reportError(error, { fatal: isFatal, where: "global" });
        if (isFatal) void flushAnalytics();
      } catch {
        // Reporting must never get in the way of the crash itself.
      }
      previous(error, isFatal);
    });
  }

  track("app_open");
  void flushAnalytics();
  const timer = setInterval(() => void flushAnalytics(), ANALYTICS_CONFIG.flushEveryMs);
  const listener = AppState.addEventListener("change", (status) => {
    if (status === "background") void flushAnalytics();
    if (status === "active") track("app_open", { resumed: true });
  });
  return () => {
    clearInterval(timer);
    listener.remove();
    started = false;
  };
}

/** Test hooks. */
export const __analyticsTesting = {
  setFetch(next: Fetch) {
    fetcher = next;
  },
  reset() {
    queue = null;
    sending = null;
    started = false;
    context = { ageBand: "unknown", language: "en" };
  },
  queued: () => [...readQueue()]
};
