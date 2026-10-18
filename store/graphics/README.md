# Store graphics

Screenshots and the feature graphic for both stores, captured from the real app (the web build, same React Native code) and framed with a caption in the app's colors. Every file is an opaque PNG at the exact size the store asks for.

To redo them after the app changes, follow the steps at the top of [`scripts/store-graphics.mjs`](../../scripts/store-graphics.mjs). Captions live in that script; the frame and banner layouts are in [`source/`](source).

## Google Play (Main store listing → Graphics)

| Slot | Files | Size |
| --- | --- | --- |
| App icon | `google-play/icon-512.png` | 512 × 512 |
| Feature graphic | `google-play/feature-graphic.png` | 1024 × 500 |
| Phone screenshots (2–8) | `google-play/phone/01-home.png` … `08-profile.png`, in order | 1080 × 1920 (9:16) |
| 7-inch tablet screenshots | `google-play/tablet/01-home.png` … `08-profile.png` | 1440 × 2560 (9:16) |
| 10-inch tablet screenshots | the same `google-play/tablet/` files | 1440 × 2560 (9:16) |

## App Store Connect (version page → Previews and Screenshots)

| Slot | Files | Size |
| --- | --- | --- |
| iPhone 6.9" Display | `app-store/iphone-6.9/01-home.png` … `08-profile.png`, in order | 1320 × 2868 |
| iPad 13" Display | `app-store/ipad-13/01-home.png` … `08-profile.png`, in order | 2064 × 2752 |

App Store Connect scales the 6.9" set down for smaller iPhones and the 13" set for smaller iPads, so no other sizes are needed.

## The eight screens

| # | Screen | Caption |
| --- | --- | --- |
| 01 | Home with streak, XP, gems and hearts | Learn Islam a few minutes a day |
| 02 | Wudu lesson path with completed circles | Wudu and salah, step by step |
| 03 | A lesson question | One clear question at a time |
| 04 | Correct-answer feedback | Answer, learn why, keep going |
| 05 | Lesson complete with XP, stars and streak | Keep your streak, earn rewards |
| 06 | Topic picker | Quran, Sahabah, manners and more |
| 07 | Shop with free tier and premium plans | Start free, upgrade anytime |
| 08 | Profile | Watch your progress grow |

The learner shown is a made-up demo account ("Aisha Khan", 23-day streak). The shop screenshot shows the prices set in `SHOP_ITEMS` in `src/data/course.ts`; retake it if those change. For the App Store in-app purchase review screenshot, `app-store/iphone-6.9/07-shop.png` works.
