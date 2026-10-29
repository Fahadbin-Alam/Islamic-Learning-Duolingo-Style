import * as Application from "expo-application";
import { Linking, Platform } from "react-native";
import { APP_STORE_URL, PLAY_STORE_URL } from "./shareApp";

/**
 * The newest build out in each store, published with the support pages (site/app-version.json). The app has
 * no server yet, so this small file is how a phone learns an update exists. Raise a number only after that
 * build is live in its store, or the banner sends people to a store page with nothing new on it.
 */
export const LATEST_BUILD_URL = "https://fahadbin-alam.github.io/Islamic-Learning-Duolingo-Style/app-version.json";
/** Apple's public lookup for the App Store version (empty until the iPhone app is live). */
export const APP_STORE_LOOKUP_URL = "https://itunes.apple.com/lookup?id=6828072104";

type Fetch = (url: string) => Promise<{ ok: boolean; json: () => Promise<unknown> }>;

export type InstalledApp = { os: string; version: string | null; build: string | null };

const installedApp = (): InstalledApp => ({
  os: Platform.OS,
  version: Application.nativeApplicationVersion,
  build: Application.nativeBuildVersion
});

/** -1, 0 or 1, comparing "1.2.10" with "1.2.9" part by part. */
export function compareVersions(a: string, b: string) {
  const left = a.split(".").map((part) => parseInt(part, 10) || 0);
  const right = b.split(".").map((part) => parseInt(part, 10) || 0);

  for (let i = 0; i < Math.max(left.length, right.length); i += 1) {
    const diff = (left[i] ?? 0) - (right[i] ?? 0);
    if (diff !== 0) return diff > 0 ? 1 : -1;
  }
  return 0;
}

async function readJson(fetcher: Fetch, url: string) {
  try {
    const response = await fetcher(url);
    return response.ok ? ((await response.json()) as Record<string, any>) : null;
  } catch {
    return null;
  }
}

/**
 * True when the store has a newer Muslimo than this phone runs. Any failure (offline, no store build yet,
 * a web or dev build) counts as no update, so the banner never shows by mistake.
 */
export async function isUpdateAvailable(app: InstalledApp = installedApp(), fetcher: Fetch = fetch as unknown as Fetch) {
  const build = parseInt(app.build ?? "", 10);
  if ((app.os !== "android" && app.os !== "ios") || !Number.isFinite(build)) return false;

  const latest = await readJson(fetcher, `${LATEST_BUILD_URL}?t=${Date.now()}`);
  const latestBuild = Number(latest?.[app.os]?.build);
  if (Number.isFinite(latestBuild) && latestBuild > build) return true;

  // On iPhone, Apple also says which version is live, so a new version shows even before the file is raised.
  if (app.os === "ios" && app.version) {
    const lookup = await readJson(fetcher, `${APP_STORE_LOOKUP_URL}&t=${Date.now()}`);
    const storeVersion = lookup?.results?.[0]?.version;
    if (typeof storeVersion === "string" && compareVersions(storeVersion, app.version) > 0) return true;
  }

  return false;
}

export const storeUrl = (os: string = Platform.OS) => (os === "ios" ? APP_STORE_URL : PLAY_STORE_URL);

/** Opens Muslimo's own page in the Play Store or App Store, where the Update button is. */
export function openStore(os: string = Platform.OS) {
  const url = os === "ios" ? "itms-apps://apps.apple.com/app/id6828072104" : "market://details?id=com.islamiclearning.muslimo";
  return Linking.openURL(url).catch(() => Linking.openURL(storeUrl(os)).catch(() => undefined));
}
