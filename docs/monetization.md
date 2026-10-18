# Monetization

Sira Path uses a Duolingo-style freemium model:

| Who | What they get | How it earns |
| --- | --- | --- |
| Free learners | All core lessons, 5 hearts a day, gems from lessons and reward chests | A banner ad on the path, a short break ad after every 3rd finished lesson, optional "watch to earn a heart" ads |
| Premium (monthly or yearly subscription) | Unlimited hearts, no ads, premium branches and mastery tests | Recurring subscription revenue |
| Anyone | Heart pack ($0.99) and gem chest of 1,200 gems ($4.99); gems refill hearts for 350 | One-off in-app purchases |

Ads never appear inside a lesson, and they are requested with the G (general audiences) content rating.

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
4. In **Blocking controls**, block sensitive categories that do not fit an Islamic learning app (gambling, alcohol, dating, astrology and similar), and set the max ad content rating to G.
5. In **Privacy & messaging**, create a GDPR consent message (the app already shows it) and, for iOS, an IDFA explainer if you later add App Tracking Transparency.
6. Add an `app-ads.txt` file to the website listed in the store listings.

### 5. Store paperwork
- Fill in Google Play **Data safety** and Apple **App Privacy** to say the app uses advertising ids and purchase history (AdMob and RevenueCat).
- Host the privacy policy (`docs/privacy-policy.md`) and set `EXPO_PUBLIC_PRIVACY_URL`. Optionally set `EXPO_PUBLIC_TERMS_URL` (defaults to Apple's standard terms).

### Audience note
Do not list the app in Apple's **Kids** category or Google Play's **Designed for Families / Teacher Approved** programs while ads are on: those programs ban or heavily restrict third-party ads. Target ages 13+ in the store questionnaires, or ask for the ads to be switched to child-directed mode first.

### 6. Turn it on
Put the values from `.env.example` into the EAS environment (`eas env:create`), set `EXPO_PUBLIC_MONETIZATION_MODE=live`, build, and test with an Apple sandbox tester and a Google Play license tester before release.
