# Google Play Android Release

This repo is now prepared for the Android release path, but there are still a few console-side steps that have to happen outside the codebase.

## Current Android App Identity

- App name: `Sira Path`
- Android package: `com.islamiclearning.sirapath`
- Expo slug: `sira-path`

## What Is Already Wired In Repo

- Android package and `versionCode` in [app.json](C:/Users/ME/Islamic-Learning-Duolingo-Style/app.json)
- internal preview and production build profiles in [eas.json](C:/Users/ME/Islamic-Learning-Duolingo-Style/eas.json)
- environment variable template in [.env.example](C:/Users/ME/Islamic-Learning-Duolingo-Style/.env.example)
- FastAPI backend foundation for real accounts and saved progress
- release-safe monetization guard in [src/services/monetization.ts](C:/Users/ME/Islamic-Learning-Duolingo-Style/src/services/monetization.ts)

## Recommended Release Order

1. Host the backend over HTTPS.
2. Fill in production environment variables from [.env.example](C:/Users/ME/Islamic-Learning-Duolingo-Style/.env.example).
3. Create the Play Console app using package `com.islamiclearning.sirapath`.
4. Start with an `internal testing` release, not production.
5. Connect real Google Play Billing products before enabling premium purchases.
6. Connect real Google / Facebook mobile auth credentials before showing those buttons in release.
7. Complete Play Console store listing, app content, and data safety.
8. Build an Android App Bundle (`.aab`) with EAS.
9. Upload the first Android release.
10. Move from internal -> closed -> production when review, testing, and policy items are ready.

## Environment Variables To Fill Before Android Release

Frontend:

- `EXPO_PUBLIC_API_BASE_URL`
- `EXPO_PUBLIC_MONETIZATION_MODE`
- `EXPO_PUBLIC_PLAY_BILLING_HEART_PACK_PRODUCT_ID`
- `EXPO_PUBLIC_PLAY_BILLING_MONTHLY_PRODUCT_ID`
- `EXPO_PUBLIC_PLAY_BILLING_YEARLY_PRODUCT_ID`
- `EXPO_PUBLIC_ADMOB_BANNER_UNIT_ID`
- `EXPO_PUBLIC_ADMOB_REWARDED_UNIT_ID`
- `EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID`
- `EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID`
- `EXPO_PUBLIC_FACEBOOK_APP_ID`

Backend:

- `SIRA_DATABASE_URL`
- `SIRA_ENVIRONMENT`
- `SIRA_CORS_ORIGINS_RAW`
- any production secret/session settings you add next

## Google Play Console Checklist

### Store listing

- app name
- short description
- full description
- icon
- feature graphic
- screenshots
- category
- contact email
- privacy policy URL

### App content

- ads declaration
- app access instructions if any feature requires login
- content rating questionnaire
- target audience and content
- news declaration if applicable

### Data safety

Based on the current product structure, plan on reviewing these data areas carefully:

- email / login identifiers
- profile display name
- lesson progress
- question attempts
- review queue and learning analytics
- purchase / entitlement state

Use the real backend behavior as the source of truth before answering the console form.

## Monetization Readiness

The app now defaults to safe behavior:

- development builds use sandbox monetization flow
- non-development builds default to `disabled`
- live purchases should only be turned on when Google Play Billing is truly connected

Set:

```bash
EXPO_PUBLIC_MONETIZATION_MODE=live
```

only after:

- monthly and yearly Play products exist
- the Android purchase client is real
- entitlement sync is verified end to end

## Social Login Readiness

Google and Facebook sign-in buttons are hidden unless their credentials are configured.

That keeps Android review cleaner until:

- Google OAuth Android client is created
- Facebook app is configured
- redirect URIs and package signatures are verified

## Build Commands

Install EAS CLI if needed:

```bash
npm install --save-dev eas-cli
```

Build internal Android preview:

```bash
npx eas build --platform android --profile preview
```

Build production Android AAB:

```bash
npx eas build --platform android --profile production
```

Submit to internal track:

```bash
npx eas submit --platform android --profile internal
```

Submit to production track:

```bash
npx eas submit --platform android --profile production
```

## First Upload Notes

- Keep the first release on `internal testing`.
- If the Play Console asks for a manual first upload or extra account verification steps, finish those in the console first.
- If the app still uses placeholder billing, auth, or privacy URLs, stop before submission and finish those items first.

## Reviewer Notes To Prepare

Keep a short note ready for Google review:

- core learning path is available without login
- account creation unlocks synced progress and social features
- if a reviewer account is needed later, provide email/password and navigation steps

## Strong Next Steps

1. create real Play Console products for monthly and yearly premium
2. connect RevenueCat or store-native purchase verification
3. host a public privacy policy URL
4. install EAS CLI and run the Android preview build
