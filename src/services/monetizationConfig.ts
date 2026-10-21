declare const __DEV__: boolean | undefined;

export type MonetizationMode = "disabled" | "sandbox" | "live";
export type StorePlatform = "ios" | "android" | "web";

// Expo only inlines EXPO_PUBLIC_* values that are read as literal `process.env.NAME` expressions,
// so every variable is listed here instead of being looked up by a computed key.
const env = {
  mode: process.env.EXPO_PUBLIC_MONETIZATION_MODE,
  revenueCatIosKey: process.env.EXPO_PUBLIC_REVENUECAT_IOS_API_KEY,
  revenueCatAndroidKey: process.env.EXPO_PUBLIC_REVENUECAT_ANDROID_API_KEY,
  entitlementId: process.env.EXPO_PUBLIC_REVENUECAT_ENTITLEMENT_ID,
  heartPackProductId: process.env.EXPO_PUBLIC_HEART_PACK_PRODUCT_ID,
  gemPackProductId: process.env.EXPO_PUBLIC_GEM_PACK_PRODUCT_ID,
  monthlyProductId: process.env.EXPO_PUBLIC_MONTHLY_PRODUCT_ID,
  yearlyProductId: process.env.EXPO_PUBLIC_YEARLY_PRODUCT_ID,
  androidBannerUnitId: process.env.EXPO_PUBLIC_ADMOB_ANDROID_BANNER_UNIT_ID,
  androidRewardedUnitId: process.env.EXPO_PUBLIC_ADMOB_ANDROID_REWARDED_UNIT_ID,
  androidInterstitialUnitId: process.env.EXPO_PUBLIC_ADMOB_ANDROID_INTERSTITIAL_UNIT_ID,
  iosBannerUnitId: process.env.EXPO_PUBLIC_ADMOB_IOS_BANNER_UNIT_ID,
  iosRewardedUnitId: process.env.EXPO_PUBLIC_ADMOB_IOS_REWARDED_UNIT_ID,
  iosInterstitialUnitId: process.env.EXPO_PUBLIC_ADMOB_IOS_INTERSTITIAL_UNIT_ID,
  termsUrl: process.env.EXPO_PUBLIC_TERMS_URL,
  privacyUrl: process.env.EXPO_PUBLIC_PRIVACY_URL
};

function clean(value: string | undefined) {
  return value?.trim() ?? "";
}

export function resolveMode(requested: string | undefined, isDev: boolean): MonetizationMode {
  const value = clean(requested).toLowerCase();

  if (value === "live" || value === "sandbox" || value === "disabled") {
    return value;
  }

  return isDev ? "sandbox" : "disabled";
}

const isDev = typeof __DEV__ !== "undefined" && Boolean(__DEV__);

export const monetizationMode = resolveMode(env.mode, isDev);

export const premiumEntitlementId = clean(env.entitlementId) || "premium";

export const monetizationProductIds = {
  heartPackSmall: clean(env.heartPackProductId) || "heart_pack_small",
  gemPackMedium: clean(env.gemPackProductId) || "gem_pack_medium",
  membershipMonthly: clean(env.monthlyProductId) || "membership_monthly",
  membershipYearly: clean(env.yearlyProductId) || "membership_yearly"
};

export function revenueCatApiKey(platform: StorePlatform) {
  if (platform === "ios") {
    return clean(env.revenueCatIosKey);
  }

  if (platform === "android") {
    return clean(env.revenueCatAndroidKey);
  }

  return "";
}

export interface AdUnitIds {
  banner: string;
  rewarded: string;
  interstitial: string;
}

export function liveAdUnitIds(platform: StorePlatform): AdUnitIds {
  if (platform === "ios") {
    return {
      banner: clean(env.iosBannerUnitId),
      rewarded: clean(env.iosRewardedUnitId),
      interstitial: clean(env.iosInterstitialUnitId)
    };
  }

  if (platform === "android") {
    return {
      banner: clean(env.androidBannerUnitId),
      rewarded: clean(env.androidRewardedUnitId),
      interstitial: clean(env.androidInterstitialUnitId)
    };
  }

  return { banner: "", rewarded: "", interstitial: "" };
}

export function isRealAdUnitId(value: string) {
  return /^ca-app-pub-\d+\/\d+$/.test(value) && !value.startsWith("ca-app-pub-3940256099942544/");
}

// Defaults are the pages GitHub Pages publishes from site/; Apple wants both links on the paywall.
const LEGAL_SITE = "https://fahadbin-alam.github.io/Islamic-Learning-Duolingo-Style";

export const legalLinks = {
  terms: clean(env.termsUrl) || `${LEGAL_SITE}/terms.html`,
  privacy: clean(env.privacyUrl) || `${LEGAL_SITE}/privacy.html`
};

// Ads are the main way the app earns, so free learners see a short break ad after every other finished
// lesson, never mid-lesson, and never sooner than a minute and a half after the last full-screen ad.
export const LESSONS_BETWEEN_BREAK_ADS = 2;
export const MIN_MS_BETWEEN_FULL_SCREEN_ADS = 90_000;

export function shouldShowLessonBreakAd(lessonsFinishedThisSession: number, isPremium: boolean, msSinceLastFullScreenAd = Infinity) {
  return (
    !isPremium &&
    lessonsFinishedThisSession > 0 &&
    lessonsFinishedThisSession % LESSONS_BETWEEN_BREAK_ADS === 0 &&
    msSinceLastFullScreenAd >= MIN_MS_BETWEEN_FULL_SCREEN_ADS
  );
}

// Optional "watch for gems" videos: the best-paying ad, because the learner chose it. Capped so gems keep their value.
export const DAILY_REWARDED_GEM_VIDEOS = 5;

export function rewardedGemVideosLeft(record: { date: string; count: number } | null | undefined, today: string) {
  return Math.max(0, DAILY_REWARDED_GEM_VIDEOS - (record?.date === today ? record.count : 0));
}

// The neutral age screen's answers. Under-13s get child-directed ads (COPPA, Google Play Families), under-16s are
// treated as under the age of consent (GDPR), and nothing personalised is ever asked for until an adult says so.
export type AgeGroup = "6-9" | "10-12" | "13-17" | "18+";
export type AdAudience = "child" | "teen" | "adult";

export const AGE_GROUPS: AgeGroup[] = ["6-9", "10-12", "13-17", "18+"];

export function isAgeGroup(value: unknown): value is AgeGroup {
  return typeof value === "string" && (AGE_GROUPS as string[]).includes(value);
}

/** Not answered yet, or a Kid account, counts as a child: the safest ads until we know better. */
export function adAudienceFor(ageGroup: AgeGroup | null | undefined, isKidAccount = false): AdAudience {
  if (isKidAccount || !ageGroup || ageGroup === "6-9" || ageGroup === "10-12") {
    return "child";
  }

  return ageGroup === "13-17" ? "teen" : "adult";
}

export interface AdAudienceSettings {
  tagForChildDirectedTreatment: boolean;
  tagForUnderAgeOfConsent: boolean;
  requestNonPersonalizedAdsOnly: boolean;
}

// iOS never asks for App Tracking Transparency, so its ads are always non-personalised.
export function adSettingsFor(audience: AdAudience, platform: StorePlatform): AdAudienceSettings {
  return {
    tagForChildDirectedTreatment: audience === "child",
    tagForUnderAgeOfConsent: audience !== "adult",
    requestNonPersonalizedAdsOnly: audience !== "adult" || platform === "ios"
  };
}
