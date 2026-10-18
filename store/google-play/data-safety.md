# Google Play Data safety answers

For Play Console → Policy and programs → App content → Data safety. These answers match the code as of October 2026, with the ads and purchases from PR #4 ("Add subscriptions, gem purchases and ads") included. Recheck them whenever an SDK or a backend field is added.

## Where the data comes from

| Source | What it handles |
| --- | --- |
| Sira Path backend (`backend/app/models.py`) | Account (name, email, password hash, parent/learner role, language), progress, XP, gems, hearts, answers with response time and confidence, review queue, reminder settings, the accounts a user follows on the Crew screen, subscription status, sign-in tokens |
| Google Mobile Ads SDK (AdMob) | Advertising ID / app set ID, IP address (approximate location), device info, ad interactions, diagnostics |
| RevenueCat SDK | App user id, purchase history |
| On device only | Learning progress for guests, local reminders (`expo-notifications`, scheduled on the device), sound settings |

No precise location, contacts, photos, files, microphone, camera, health, messages, calendar or web browsing data is collected. Push tokens are not collected: reminders are local notifications.

## Section 1: Data collection and security

| Question | Answer |
| --- | --- |
| Does your app collect or share any of the required user data types? | **Yes** |
| Is all of the user data collected by your app encrypted in transit? | **Yes** (the production API must be HTTPS; AdMob and RevenueCat use HTTPS) |
| Do you provide a way for users to request that their data is deleted? | **Yes**. Deletion URL: `https://fahadbin-alam.github.io/Islamic-Learning-Duolingo-Style/delete-account.html` |
| Account creation methods | **Username and password** (email + password). Add "OAuth" only if Google or Facebook sign-in is switched on |
| Delete account URL (separate "Account deletion" field) | Same deletion URL as above |

## Section 2: Data types

"Collected" means it leaves the device. "Shared" means it goes to a third party that is not just processing it for us. Google treats data sent to the AdMob SDK for ads as shared; data sent to RevenueCat and our hosting provider as service providers is collected, not shared.

| Category → data type | Collected | Shared | Optional? | Purposes |
| --- | --- | --- | --- | --- |
| Personal info → Name | Yes | No | Optional (only with an account) | App functionality, Account management |
| Personal info → Email address | Yes | No | Optional (only with an account) | App functionality, Account management |
| Personal info → User IDs | Yes | No | Optional (only with an account) | App functionality, Account management |
| Personal info → Other info | Yes | No | Optional | App functionality. Covers parent or learner mode and which other accounts the user follows. A followed learner's display name, XP and streak are shown to the people who follow them |
| Financial info → Purchase history | Yes | No | Optional (only if the user buys something) | App functionality, Account management |
| Location → Approximate location | Yes | Yes | Required for free users | Advertising or marketing, Fraud prevention, security and compliance. From the IP address via AdMob |
| App activity → App interactions | Yes | Yes | Required | App functionality, Analytics, Personalization, Advertising or marketing (AdMob: ad interactions only), Fraud prevention |
| App activity → Other user-generated content | No | No | | Answers are app interactions, not free text |
| App info and performance → Crash logs | Yes | Yes | Required for free users | Analytics, Advertising or marketing (AdMob SDK diagnostics) |
| App info and performance → Diagnostics | Yes | Yes | Required for free users | Analytics, Advertising or marketing (AdMob SDK diagnostics) |
| Device or other IDs | Yes | Yes | Required for free users | Advertising or marketing, Analytics, Fraud prevention, security and compliance |

Mark everything else **Not collected**.

Notes:

- "Required" vs "Optional": Google says data is optional only if users can choose not to provide it and still use the app. Ads data is collected for every free user, so it is required. Account data is optional because the app works without an account.
- Answers include response time and the confidence rating the learner gives. They are learning analytics under App interactions; they are never sent to AdMob.
- If you add Firebase, Crashlytics, Sentry or any analytics SDK later, update Crash logs, Diagnostics and App interactions.
- Google's own guide for the ads SDK: https://developers.google.com/admob/android/privacy/play-data-disclosure.

## Other App content declarations

| Declaration | Answer |
| --- | --- |
| Privacy policy | `https://fahadbin-alam.github.io/Islamic-Learning-Duolingo-Style/privacy.html` |
| Ads | **Yes, my app contains ads** |
| App access | **All functionality is available without special access**. Premium can be tested with a Play license tester; no login is needed for core lessons |
| Content rating | See `store/content-ratings.md` |
| Target audience and content | Ages **13–15, 16–17, 18 and over**. Do not tick any age under 13 while AdMob ads are on (see `store/README.md`). "Could your app unintentionally appeal to children?" → **No**: the content is religious study for teens and adults, without child-directed characters or themes |
| News app | No |
| COVID-19 contact tracing or status | No |
| Data safety | This file |
| Government app | No |
| Financial features | My app doesn't provide any financial features |
| Health | My app does not have any health features |
| Advertising ID | **Yes**, the app uses the advertising ID, for **Advertising or marketing** and **Analytics**. `react-native-google-mobile-ads` adds the `com.google.android.gms.permission.AD_ID` permission |
