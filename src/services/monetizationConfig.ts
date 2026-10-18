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

// Free learners see a short break ad after every few finished lessons, never mid-lesson.
export const LESSONS_BETWEEN_BREAK_ADS = 3;

export function shouldShowLessonBreakAd(lessonsFinishedThisSession: number, isPremium: boolean) {
  return !isPremium && lessonsFinishedThisSession > 0 && lessonsFinishedThisSession % LESSONS_BETWEEN_BREAK_ADS === 0;
}
