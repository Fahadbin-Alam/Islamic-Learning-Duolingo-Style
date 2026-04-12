# Sira Path

A Duolingo-style Islamic learning app scaffold for iOS and Android. The first build includes a circular lesson path, Islamic topics such as manners and Sahabah, short challenge sessions, hearts, rewarded ad recovery, paid heart packs, and monthly membership state.

The app uses Expo and React Native so one codebase can target iOS and Android.

## Run

Install Node.js 20.19 or newer first.

```bash
npm install
npm run start
```

Then press `i` for iOS Simulator, `a` for Android Emulator, or scan the Expo QR code from a phone.

For store builds:

```bash
npx eas build -p ios --profile production
npx eas build -p android --profile production
```

## What is included

- A path screen with locked, current, available, and completed circular lesson nodes.
- Starter lessons for manners, Sahabah, prayer, Quran, and daily review.
- Challenge sessions with correct/wrong feedback and XP rewards.
- A daily hearts model with wrong-answer heart loss.
- A shop with rewarded-ad hearts, paid heart packs, and a monthly membership state.
- A typed local API layer modeled after the linked Duolingo OpenAPI shape: users, shop items, subscriptions, and XP summaries.
- `api/islamic-learning.swagger.yaml` as a backend contract starter.

## Monetization

`src/services/monetization.ts` currently uses a sandbox client so the app can run without App Store, Play Store, or AdMob credentials. For production:

1. Create App Store Connect and Google Play in-app products for `heart_pack_small` and `membership_monthly`.
2. Add a purchase provider such as RevenueCat or `react-native-iap`.
3. Create AdMob rewarded and banner ad units.
4. Replace `sandboxMonetizationClient` with a real monetization client that calls those SDKs and verifies purchases server-side.

## API reference

The local Swagger file borrows the endpoint shape from `igorskh/duolingo-api`, especially `shop-items`, `subscriptions`, and `xp_summaries`, but this app is not affiliated with Duolingo.
