# Store paperwork for Sira Path

Everything Google Play and the App Store ask for besides the app build itself.

| What | File |
| --- | --- |
| Google Play listing text, settings and graphics list | [google-play/listing.en-US.md](google-play/listing.en-US.md) |
| Google Play Data safety and other App content answers | [google-play/data-safety.md](google-play/data-safety.md) |
| Google Play reviewer notes | [google-play/reviewer-notes.md](google-play/reviewer-notes.md) |
| App Store listing text, app information and IAP names | [app-store/listing.en-US.md](app-store/listing.en-US.md) |
| App Store privacy labels | [app-store/privacy-labels.md](app-store/privacy-labels.md) |
| App Review notes | [app-store/review-notes.md](app-store/review-notes.md) |
| Content rating answers for both stores | [content-ratings.md](content-ratings.md) |
| Public support, privacy policy, terms of use and account deletion pages | [../site](../site) |

The pages in `site/` replace the draft in `docs/privacy-policy.md`.

## Public URLs (once GitHub Pages is on)

| Page | URL |
| --- | --- |
| Support (both stores) | https://fahadbin-alam.github.io/Islamic-Learning-Duolingo-Style/ |
| Privacy policy (both stores, and in the app) | https://fahadbin-alam.github.io/Islamic-Learning-Duolingo-Style/privacy.html |
| Terms of use (App Store description, and in the app) | https://fahadbin-alam.github.io/Islamic-Learning-Duolingo-Style/terms.html |
| Account deletion (Google Play Data safety) | https://fahadbin-alam.github.io/Islamic-Learning-Duolingo-Style/delete-account.html |

If you later buy a domain (for example `sirapath.app`), point it at GitHub Pages under Settings → Pages → Custom domain and update these URLs in the files above and in the app's environment.

## Must be fixed in the app before submitting

These are app or backend changes, so they belong with the builds work, not this paperwork.

1. **In-app account deletion.** Apple (guideline 5.1.1(v)) and Google both require apps that create accounts to let people delete them from inside the app. There is no delete endpoint or button yet. Needed: `DELETE /api/profile/me` that removes the user (the models already cascade), a "Delete account" button under Profile → Account with a confirmation, and a reminder that subscriptions are cancelled in the store. The pages and review notes already describe it at that path.
2. **iOS ad tracking.** Without Apple's tracking prompt, iOS ad requests must ask AdMob for non-personalised ads, or the privacy label in `app-store/privacy-labels.md` is wrong. See the table there.
3. **Privacy and terms links in the app.** Set `EXPO_PUBLIC_PRIVACY_URL` and `EXPO_PUBLIC_TERMS_URL` to the URLs above. Apple requires both links on the subscription screen.
4. **Sign in with Apple.** If Google or Facebook sign-in is ever switched on for iOS, Apple requires Sign in with Apple as well (guideline 4.8). Keep them off for launch, as they are now.
5. **"Child" account role.** The sign-up form offers parent and child roles. Child-directed accounts would pull the app into COPPA and Google's Families policy, which do not allow AdMob's normal ads. Either relabel the role "Learner" or keep accounts 13+ as the privacy policy says.
6. **Production API on HTTPS**, and `usesNonExemptEncryption: false` under `ios.config` in `app.json` so App Store Connect stops asking about export compliance on every build.

## Steps that need you

1. **Fill in `site/site.config.json`** with the developer name shown on the pages (your legal name or business name), a support email you check, and the governing law (for example "the State of Texas, United States"). Or tell Claude in the project and it will fill them in. The site will not publish while any value is blank.
2. **Turn on GitHub Pages:** repository Settings → Pages → Build and deployment → Source: **GitHub Actions**. Then Actions → "Publish support and privacy pages" → Run workflow. It also runs on every merge that changes `site/`.
3. **Store accounts:** Google Play Console ($25 once) and Apple Developer Program ($99 a year). Agreements, bank and tax details are listed in `docs/monetization.md`.
4. **Google Play testing rule:** personal developer accounts created after November 2023 must run a closed test with at least 12 testers for 14 days before they can apply for production. Start this as soon as the first build is ready.
5. **Apple EU trader status:** App Store Connect asks whether you are a trader under the EU Digital Services Act. Selling subscriptions usually makes you one, which shows your address, phone and email on the EU App Store. Answer it, or remove EU countries from availability until you are ready.
6. **Paste the listings and answer the forms** from the files in this folder. Recheck `google-play/data-safety.md` and `app-store/privacy-labels.md` if any SDK is added.
7. **Graphics:** a 1024 × 500 feature graphic for Google Play, and phone and iPad screenshots for both stores (sizes in the listing files).
8. **AdMob `app-ads.txt`:** AdMob looks for it at the root of the developer website's domain. `fahadbin-alam.github.io/Islamic-Learning-Duolingo-Style/` is not a root, so either use a custom domain for the site or create a repository named `Fahadbin-Alam.github.io` containing only `app-ads.txt`, and use `https://fahadbin-alam.github.io` as the developer website in both stores.
9. **Lesson sources:** confirm that any Quran translation or hadith text quoted word for word in lessons is either paraphrased or from a translation whose licence allows use in an app, so you can answer "Yes" to Apple's content rights question.

The privacy policy and terms are a solid, plain-language starting point written to match what the code does, not legal advice. If the app starts earning real money, a one-time review by a lawyer is worth it.
