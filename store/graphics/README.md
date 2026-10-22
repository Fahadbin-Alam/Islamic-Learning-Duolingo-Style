# Store graphics

Screenshots and the feature graphic for both stores, captured from the real app (the web build, same React Native code) and framed with a caption in the app's colors. Every file is an opaque PNG at the exact size the store asks for.

To redo them after the app changes, follow the steps at the top of [`scripts/store-graphics.mjs`](../../scripts/store-graphics.mjs). Export the web build with `EXPO_PUBLIC_MONETIZATION_MODE=sandbox`: sandbox mode turns on the simulated store, so the shop shows the Premium plans and packs the store build sells, at the built-in prices. A plain export shows only the shop's "Almost every lesson is free!" note, and the script stops at `07-shop` rather than shoot it. Captions live in that script, and they leave out words like "free" and "best", which Google Play asks screenshots not to use. That rule is for the words the script adds: the shop's own labels ("Free heart", "Free gems", "SAVE 20%") are the app's real screen and show as it draws them. The frame and banner layouts are in [`source/`](source).

## Google Play (Main store listing → Graphics)

| Slot | Files | Size |
| --- | --- | --- |
| App icon | `google-play/icon-512.png` | 512 × 512 |
| Feature graphic | `google-play/feature-graphic.png` | 1024 × 500 |
| Phone screenshots (2–8) | `google-play/phone/01-learn.png` … `08-profile.png`, in order | 1080 × 1920 (9:16) |
| 7-inch tablet screenshots | `google-play/tablet/01-learn.png` … `08-profile.png` | 1440 × 2560 (9:16) |
| 10-inch tablet screenshots | the same `google-play/tablet/` files | 1440 × 2560 (9:16) |

## App Store Connect (version page → Previews and Screenshots)

| Slot | Files | Size |
| --- | --- | --- |
| iPhone 6.9" Display | `app-store/iphone-6.9/01-learn.png` … `08-profile.png`, in order | 1320 × 2868 |
| iPad 13" Display | `app-store/ipad-13/01-learn.png` … `08-profile.png`, in order | 2064 × 2752 |

App Store Connect scales the 6.9" set down for smaller iPhones and the 13" set for smaller iPads, so no other sizes are needed.

## The eight screens

| # | Screen | Caption |
| --- | --- | --- |
| 01 | Learn card of the wudu lesson Intention: the Arabic word النِّيَّةُ with its sound button and one short line | Learn Islam a few minutes a day |
| 02 | Wudu path with finished circles, START and a chest | Wudu and salah, step by step |
| 03 | The same lesson's True / False question, True picked before CHECK | One clear question at a time |
| 04 | A wrong answer ("mouth") on its fill-in question, with the Why line open, which answers that mistake (Why shows only on a wrong answer) | Answer, learn why, keep going |
| 05 | Lesson complete with XP, stars and streak | Keep your streak, earn stars |
| 06 | Topic picker as it opens, with Prayer picked; the tiles the bottom edge would cut are hidden, so it ends on whole tiles | Prayer, Quran, manners and more |
| 07 | Shop from the Premium card (Monthly and Yearly) down to Restore purchases, the renewal line, and Terms and Privacy, with as much of the shop above it as fits: all of it on the iPad, from the Hearts heading on the Android tablet, from the Gems heading on the iPhone, and only the Premium card on the Android phone. A row the top edge would cut is hidden, so the list starts at a heading or at the Premium card | Learn now, upgrade anytime |
| 08 | Me tab with streak, XP, stars and gems | See your streak, XP and stars |

The learner shown is a made-up demo account ("Aisha Khan", 24-day streak, three lessons into wudu, on the Prayer topic). One of today's five hearts is gone, so every hearts row in the shop can be used; at full hearts the refill and the heart video are muted. The shop screenshot shows the prices set in `SHOP_ITEMS` in `src/data/course.ts`; retake it if those change. For the App Store in-app purchase review screenshot, `app-store/iphone-6.9/07-shop.png` works: it shows both Premium plans ($9.99 a month, $95.90 a year), the gem chest ($4.99), the renewal line, and the Terms and Privacy links. The heart pack ($0.99) does not fit with them on a phone; `app-store/ipad-13/07-shop.png` shows the whole shop, heart pack included.

The yearly price is not final yet (`docs/monetization.md`), and $95.90 is not one of App Store Connect's USD price points (in that range they go up by $1 and end in .99, such as $95.99). An iOS build shows the price StoreKit returns, so once the yearly price is set in both stores, put the same number in `SHOP_ITEMS` and retake `07-shop` on all four sizes before you upload the App Store set. The "SAVE 20%" badge is fixed text, so check that it still matches the saving.
