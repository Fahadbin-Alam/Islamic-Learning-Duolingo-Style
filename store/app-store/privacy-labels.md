# App Store privacy labels ("App Privacy")

For App Store Connect → your app → App Privacy. These answers match the code as of October 2026, with the ads and purchases from PR #4 included. Sources of data are listed in `store/google-play/data-safety.md`.

## Do you or your third-party partners collect data from this app?

**Yes.**

## Tracking

Apple calls it tracking when data from this app is linked with data from other companies' apps or websites for targeted ads, or shared with a data broker.

The app does not show Apple's App Tracking Transparency (ATT) prompt, so iOS gives AdMob no advertising identifier (IDFA), and iOS ad requests ask for non-personalised ads (`adRequestOptions` in `src/services/monetization.native.ts`). That is the first row below, so **Data Used to Track You: none**.

| iOS ads setup | Answer |
| --- | --- |
| **Current build:** no ATT prompt, and iOS ad requests ask for non-personalised ads (`requestNonPersonalizedAdsOnly: true`) | **Data Used to Track You: none.** Use the table below as written |
| ATT prompt added (`expo-tracking-transparency`) and personalised ads shown to people who allow tracking | Move **Device ID**, **Advertising Data** and **Coarse Location** to "Used to Track You" for Third-Party Advertising |

Apple rejects apps that track without the prompt, so do not ship personalised iOS ads without ATT.

## Data types to declare

For each type, pick the purposes shown, then answer "Linked to the user's identity?" and "Used for tracking?".

| Data type | Purposes | Linked to user | Tracking |
| --- | --- | --- | --- |
| Contact Info → Name | App Functionality | Yes | No |
| Contact Info → Email Address | App Functionality | Yes | No |
| Other Data → Other Data Types | App Functionality (which accounts a user follows on the Crew screen; the email typed to find them is not stored) | Yes | No |
| Identifiers → User ID | App Functionality | Yes | No |
| Identifiers → Device ID | Third-Party Advertising, Analytics | No | No (see Tracking) |
| Purchases → Purchase History | App Functionality | Yes | No |
| Location → Coarse Location | Third-Party Advertising | No | No |
| Usage Data → Product Interaction | App Functionality, Analytics, Product Personalization, Third-Party Advertising (ad taps only) | Yes | No |
| Usage Data → Advertising Data | Third-Party Advertising, Analytics | No | No |
| Diagnostics → Crash Data | Analytics | No | No |
| Diagnostics → Performance Data | Analytics | No | No |
| Diagnostics → Other Diagnostic Data | Analytics, Third-Party Advertising | No | No |
| Other Data → Other Data Types | App Functionality (parent or learner mode, reminder and sound settings) | Yes | No |

The age group from the age screen stays on the device, so it is not declared. Not collected: Health and Fitness, Financial Info (card numbers stay with Apple), Precise Location, Sensitive Info, Contacts (the address book), User Content, Browsing History, Search History.

Notes:

- "Product Interaction" is linked because lesson progress and answers are stored on the user's account. The AdMob part of it is not linked to identity.
- Server sync (docs/hosting.md) stores the same account data already declared above (linked to the user). No label changes.
- Product Personalization covers choosing question difficulty and review from past answers. It is not used for ads.
- Apple's guide: https://developer.apple.com/app-store/app-privacy-details/. Google's guide for the ads SDK on iOS: https://developers.google.com/admob/ios/privacy/data-disclosure. RevenueCat's: https://www.revenuecat.com/docs/platform-resources/apple-platform-resources/apple-app-privacy.

## Privacy manifest

Apple also needs a privacy manifest (`PrivacyInfo.xcprivacy`) in the build. `react-native-google-mobile-ads`, `react-native-purchases` and Expo modules ship their own; Expo merges them. Declare any extra required-reason APIs in `app.json` under `ios.privacyManifests` if the build warns about them. That belongs to the app builds work, not this paperwork.
