# Monetization

Muslimo earns mainly from ads. Free learners get the whole core course and see ads; a subscription removes them.

| Who | What they get | How it earns |
| --- | --- | --- |
| Free learners | All core lessons, 5 hearts a day, gems from lessons and reward chests | A banner on the path, a short break ad after every 2nd finished lesson (at most one full-screen ad every 90 seconds), and optional videos: "Free heart" and "Free gems" (20 gems, up to 5 a day) |
| Premium (monthly or yearly) | No ads, unlimited hearts, premium branches and mastery tests | Recurring subscription revenue |
| Anyone | Heart pack ($0.99) and gem chest of 1,200 gems ($4.99); gems refill hearts for 350 | One-off in-app purchases |

Ads never appear inside a lesson or at app launch, and they are requested with the G (general audiences) content rating.

### Why this mix

- **Rewarded videos** pay the most per view because the learner chose to watch, and they never annoy. They are offered where a learner wants something: a heart when they run out, gems for a refill.
- **Break ads** after every other lesson are where most of the volume comes from. Duolingo shows one after every lesson; every other lesson with a 90-second gap keeps kids and new learners from feeling punished. Tune `LESSONS_BETWEEN_BREAK_ADS` and `MIN_MS_BETWEEN_FULL_SCREEN_ADS` in `src/services/monetizationConfig.ts` once real numbers come in.
- **Ads are preloaded.** One break ad and one video are always loading in the background, so a break never makes anyone wait and a "watch" tap plays at once. Without this, many ad opportunities are simply lost.
- **The subscription is the "no ads" option.** Its first benefit on the shop is now "No ads". Price it low enough that a parent buys it to remove ads (for example $4.99 a month or $29.99 a year) rather than as a content unlock.

### Ages and ads

The app is for ages 6 to 30, so a one-time, neutral age screen ("How old are you?": 9 or under, 10 to 12, 13 to 17, 18 or older) is shown on phones before any ad is requested. Nothing is pre-selected and the answer stays on the device.

| Answer | Ads |
| --- | --- |
| Not answered yet, 12 or under, or a Kid account | Child-directed (COPPA), under the age of consent, non-personalised, rated G |
| 13 to 17 | Under the age of consent (no consent form, no personalisation), rated G |
| 18 or older | Google's consent form where required (EEA, UK, Switzerland, some US states); personalised only on Android and only with consent; iOS stays non-personalised because there is no tracking prompt |

This is what Google Play calls a **mixed audience** app and what COPPA allows for general-audience apps with an age screen. AdMob is a Google Play Families self-certified ads SDK, so it may serve the under-13 group as long as the child-directed tag is on, which the code does.

## How it is built

- **Purchases:** [RevenueCat](https://www.revenuecat.com) (`react-native-purchases`) handles App Store and Google Play billing, receipt checks and the `premium` entitlement. RevenueCat is free until the app makes $2,500 a month in tracked revenue.
- **Ads:** Google AdMob (`react-native-google-mobile-ads`), with Google's consent form shown first in regions that require it (EEA, UK).
- **Backend:** `POST /api/subscriptions/revenuecat/webhook` keeps each account's premium state in sync when a plan starts, renews, is cancelled or expires. `/api/subscriptions/sync` is blocked when `SIRA_ENVIRONMENT=production` so the app cannot grant itself premium.
- **Code:** `src/services/monetization.native.ts` (phones), `src/services/monetization.ts` (web, simulated), `src/services/monetizationConfig.ts` (keys and ad rules), `src/components/AdBanner*.tsx`.

The native libraries do not run in Expo Go. Use a development build: `eas build --profile development` (install the CLI with `npm install -g eas-cli`).

### Modes

`EXPO_PUBLIC_MONETIZATION_MODE`:

- `sandbox` (default in development): simulated purchases and Google's test ads. If the RevenueCat keys are set, real store sandbox purchases are used instead.
- `live`: real purchases and real ad units. Development builds still use Google's test ads so the AdMob account is never put at risk.
- `disabled` (default in release builds when nothing is set): no purchases and no ads.

## Steps that need your own accounts

These need your logins, payment details or legal agreements, so they are yours to do.

### 1. Store accounts and agreements
1. Apple Developer Program ($99/year) and, in App Store Connect, sign the **Paid Apps agreement** and add bank and tax details. Purchases do not work until this is done.
2. Google Play Console ($25 once) and a **payments profile** with bank and tax details.

### 2. Create the products (same ids in both stores)

| Product id | Type | Suggested price |
| --- | --- | --- |
| `membership_monthly` | Auto-renewing subscription (Google: base plan `monthly`) | $9.99 / month |
| `membership_yearly` | Auto-renewing subscription (Google: base plan `yearly`) | $59.99–$95.90 / year |
| `heart_pack_small` | Consumable | $0.99 |
| `gem_pack_medium` | Consumable | $4.99 |

On Apple, put both subscriptions in one subscription group. A 7-day free trial on the yearly plan (an "introductory offer" on Apple, a "free trial offer" on Google) tends to lift conversions a lot; the app shows whatever the store returns.

### 3. RevenueCat
1. Create a project and add the iOS app (App Store Connect API key + in-app purchase key) and the Android app (Google Play service account JSON).
2. Create an entitlement called `premium` and attach both subscriptions to it.
3. Create the `default` offering with a Monthly package (`membership_monthly`) and an Annual package (`membership_yearly`).
4. Copy the public SDK keys (`appl_…` and `goog_…`) into `EXPO_PUBLIC_REVENUECAT_IOS_API_KEY` and `EXPO_PUBLIC_REVENUECAT_ANDROID_API_KEY`.
5. Under Integrations → Webhooks, point it at `https://<your-api>/api/subscriptions/revenuecat/webhook` and set the Authorization header to a long random value. Put the same value in the backend's `SIRA_REVENUECAT_WEBHOOK_AUTH`.

### 4. AdMob
1. Create an AdMob account and add the Android and iOS apps.
2. Create three ad units per app: Banner, Rewarded, Interstitial.
3. Set the app ids in `ADMOB_ANDROID_APP_ID` / `ADMOB_IOS_APP_ID` and the unit ids in the six `EXPO_PUBLIC_ADMOB_*_UNIT_ID` values.
4. In **Blocking controls**, block sensitive categories that do not fit an Islamic learning app (gambling, alcohol, dating, astrology, "get rich quick", references to sex and sexuality, and similar), turn off **personalised ads for sensitive categories**, and set the max ad content rating to **G**.
5. In **App settings → each app**, mark the app as **mixed audience / some users under 13** if AdMob asks, so its own reviews match the Play listing.
6. In **Privacy & messaging**, create a **GDPR** message and a **US states** message (both are shown by the app automatically). Skip the IDFA explainer: the app does not ask for tracking.
7. Add an `app-ads.txt` file at the root of the developer website listed in both stores (see `store/README.md`, step 8). AdMob gives you its one line under **Apps → View all apps → app-ads.txt**.
8. Payments: add your tax and bank details in AdMob. Google pays monthly once you pass $100.

### 5. Store paperwork
- Fill in Google Play **Data safety** and Apple **App Privacy** to say the app uses advertising ids and purchase history (AdMob and RevenueCat).
- The paywall links to the privacy policy and terms. They default to the GitHub Pages copies (`https://fahadbin-alam.github.io/Islamic-Learning-Duolingo-Style/privacy.html` and `terms.html`); override with `EXPO_PUBLIC_PRIVACY_URL` / `EXPO_PUBLIC_TERMS_URL` if you host them elsewhere.

### Audience note
- **Apple:** do not pick the **Kids** category. Kids-category apps cannot use third-party ad networks like AdMob. A normal category (Education) with ads is fine for all ages.
- **Google Play:** under Target audience, tick the age groups the app is really for (including under 13). That puts the app under the Families policy, which the app already meets: neutral age screen, child-directed ads for under-13s from a Families self-certified SDK, grown-up check before purchases, account creation and Crew. Do not apply for **Teacher Approved**.
- **Children's data:** when the age screen says 12 or under, sign-up asks for a **parent's** name and email, so nothing about the child is collected. On Crew, nobody sees a learner's name, XP or streak until that learner adds them back (after the grown-up check); someone who was only added sees just the email they typed.

### 6. Turn it on
Put the values from `.env.example` into the EAS environment (`eas env:create`), set `EXPO_PUBLIC_MONETIZATION_MODE=live`, build, and test with an Apple sandbox tester and a Google Play license tester before release.
