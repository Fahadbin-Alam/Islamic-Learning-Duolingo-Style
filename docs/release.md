# Releasing Muslimo to Google Play and the App Store

The code is ready to build for both stores. What is left needs your own accounts, payment details or signatures, so it is listed here as steps for you.

## What the app already has

| Store requirement | Where it lives |
| --- | --- |
| Bundle ids `com.islamiclearning.muslimo` (iOS and Android) | `app.json` |
| Version `1.0.0`; build numbers are managed by EAS and bumped on every production build | `app.json`, `eas.json` (`appVersionSource: remote`, `autoIncrement`) |
| App icon, Android adaptive icon (green background), splash screen | `assets/` |
| In-app account deletion (Profile → Settings → Delete account), removing the account and all progress from the server | `src/TopicApp.tsx`, `DELETE /api/profile/me` |
| iOS privacy manifest and export-compliance flag (no non-exempt encryption) | `app.json` → `ios` |
| iOS ads are non-personalised, so no App Tracking Transparency prompt is needed; SKAdNetwork ids for AdMob | `src/services/monetization.native.ts`, `app.config.js` |
| No microphone, background audio, overlay or storage permissions (blocked even though libraries ask for them) | `app.json` → `android.blockedPermissions`, `expo-audio` plugin options |
| Works fully offline when no API address is set, and never calls `localhost` from a release build | `src/config/backend.ts` |
| Production API image and a one-click Render deployment (database on Neon) | `backend/Dockerfile`, `render.yaml` |
| CI checks: typecheck, app tests, backend tests, Android/iOS bundles, release config | `.github/workflows/ci.yml`, `scripts/check-release-config.mjs` |

Store listing text, privacy policy, terms, the account-deletion web page, Data safety and App Privacy answers are being written separately under `store/` and `site/`.

## Steps only you can do

### 1. Accounts (one time)

1. **Expo** account (free) at expo.dev. Install the CLI once with `npm install -g eas-cli`, then run `eas login`.
2. **Apple Developer Program** ($99 a year). In App Store Connect sign the Paid Apps agreement and add bank and tax details, otherwise purchases will not work.
3. **Google Play Console** ($25 once). Complete identity verification and the payments profile.
   - New personal Play accounts must run a **closed test with at least 12 testers for 14 days** before Google allows a production release. Start this early.

### 2. Link the project to your Expo account

From the repository folder:

```bash
eas init        # creates the EAS project and writes its id into app.json; commit that change
```

### 3. Deploy the API (optional for the first release)

The app works without a server: progress and the account stay on the phone. A server adds cloud backup, sign-in on other devices and premium sync from RevenueCat.

Step-by-step (free Render web service + free Neon Postgres): [docs/hosting.md](hosting.md).

1. On render.com: **New → Blueprint**, pick this repository. It creates the `muslimo-api` web service from `render.yaml`.
2. When asked, set `SIRA_DATABASE_URL` to the Neon connection string, `SIRA_GOOGLE_CLIENT_IDS_RAW` to the Google client ids, and `SIRA_REVENUECAT_WEBHOOK_AUTH` to a long random value (the same one you give RevenueCat).
3. When it is live, open `https://<your-service>.onrender.com/api/health`; it should say `"ok": true`.
4. Optional: add a custom domain such as `api.yourdomain.com` in Render.

Any host that runs Docker works the same way: `docker build -f backend/Dockerfile .` and set `SIRA_DATABASE_URL` to a Postgres URL. Migrations and the lesson catalog run automatically on start.

### 4. Set the build settings in EAS

Each value goes in once with `eas env:create --environment production --visibility plaintext --name NAME --value VALUE`. `.env.example` lists every name.

| Name | Value |
| --- | --- |
| `EXPO_PUBLIC_API_BASE_URL` | The API address from step 3, e.g. `https://muslimo-api.onrender.com`. Leave unset for an offline-only build. |
| `EXPO_PUBLIC_PRIVACY_URL`, `EXPO_PUBLIC_TERMS_URL` | Only if the policy and terms live somewhere other than the GitHub Pages site (the default once Pages is turned on). |
| `EXPO_PUBLIC_MONETIZATION_MODE` | `live` once RevenueCat and AdMob are set up (see `docs/monetization.md`), otherwise leave unset and the release ships with no ads or purchases. |
| RevenueCat and AdMob keys | As listed in `docs/monetization.md`. |

### 5. Build

```bash
eas build --platform all --profile production
```

EAS asks to create the signing credentials the first time. Say yes to both: it generates and stores the Android upload keystore and, after you sign in with your Apple ID, the iOS distribution certificate and provisioning profile. Keep the Apple ID login handy.

To try the app on your own phone first: `eas build --platform android --profile preview` gives an installable APK, and `eas build --profile development` gives a development build that runs real ads and purchases in test mode.

### 6. Submit

**Google Play**

1. Create the app in Play Console with package `com.islamiclearning.muslimo`.
2. Upload the first `.aab` by hand (Play Console → Testing → Internal testing → Create release). Google requires the very first upload to be manual.
3. For later builds, create a Google Cloud service account with Play Console access, download its JSON key to `secrets/google-play-service-account.json` (ignored by git), and run `eas submit --platform android --profile production`. It uploads to the internal track as a draft.
4. Fill in App content: ads (yes), target audience 13+ (keep the app out of Designed for Families while ads are on), content rating, Data safety, privacy policy URL, and the account-deletion URL.

**App Store**

1. `eas submit --platform ios --profile production`. The first run creates the App Store Connect record for `com.islamiclearning.muslimo` if it does not exist.
2. In App Store Connect: screenshots (6.9" and 6.5" iPhone, 13" iPad because the app supports iPad), App Privacy answers, age rating, the privacy policy URL, and the review notes from `store/`.
3. Submit the in-app purchases together with the first version, or Apple will reject the paywall.

## Release checklist

- [ ] `eas init` committed
- [ ] Privacy policy and account-deletion pages hosted, URLs set
- [ ] API deployed and `EXPO_PUBLIC_API_BASE_URL` set, or a deliberate offline-only first release
- [ ] Monetization mode decided (`live` with real keys, or unset)
- [ ] Tested a production build on a real Android phone and iPhone (TestFlight)
- [ ] Play closed test running with 12 testers for 14 days (new personal accounts)
- [ ] Store listings, screenshots, ratings and privacy forms filled in

## Shipping an update

Bump `version` in `app.json` (for example `1.0.1`), commit, then run the build and submit commands again. Build numbers increase on their own.

### Tell phones about the update

Once the new build is live in the store (not just uploaded), raise its build number in `site/app-version.json` (`android` is the Play version code, `ios` is the App Store build number) and merge it. Phones on an older build then show "A new update is ready!" under the top bar, with an Update button that opens the store page. Keep `ios` at 0 until the iPhone app is on the App Store.
