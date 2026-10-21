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
| Screenshots, feature graphic and icon, with the slot each fills | [graphics/README.md](graphics/README.md) |
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

## App changes the store answers depend on

The release builds PR (#6) covered most of these. The answers in this folder assume all of them ship.

| Requirement | Status |
| --- | --- |
| In-app account deletion (Apple 5.1.1(v), Google account deletion policy): Profile → Settings → Delete account, backed by `DELETE /api/profile/me` | Done in #6 |
| iOS ads non-personalised, since the app has no tracking prompt | Done in #6 |
| Neutral age screen before any ad; under-13s, Kid accounts and unanswered get child-directed, non-personalised ads; 13–17 under the age of consent | Done in #13 |
| Grown-up check before creating an account, buying anything and adding people to a Crew | Done in #13 |
| `ITSAppUsesNonExemptEncryption: false` so App Store Connect stops asking about export compliance | Done in #6 |
| `EXPO_PUBLIC_PRIVACY_URL` and `EXPO_PUBLIC_TERMS_URL` set to the Pages URLs above. Apple requires both links on the subscription screen | Set in `.env.example`. Copy them into the EAS environment, and they work once GitHub Pages is on |
| Production API served over HTTPS | Needed before release |
| Sign in with Apple, if Google or Facebook sign-in is ever switched on for iOS (guideline 4.8) | Not needed while they stay off |

## Audience: all ages (mixed audience)

The app is for ages 6 to 30, so both stores are answered as an all-ages app with ads:

- **Google Play:** Target audience includes the under-13 groups, so the app falls under the **Families policy**. AdMob is a Families self-certified ads SDK and the app tags under-13 requests as child-directed. See `google-play/data-safety.md`. Do not apply for Teacher Approved.
- **Apple:** primary category **Education**, not the Kids category, because Kids-category apps cannot use third-party ad networks.
- **AdMob:** mark each app as having some users under 13 if asked, block sensitive ad categories and keep the max rating at G (`docs/monetization.md`, AdMob steps).

**Open risks for an all-ages listing**, to settle before submitting:

1. The grown-up check is a sum, which is enough for Google and Apple's parental gate rules but is not COPPA "verifiable parental consent". The privacy policy therefore says a parent creates any account for a child under 13 with the parent's own email. If a learner who answered "12 or under" on the age screen can still create an account with their own email, the app is collecting a child's data without that consent. The safest fix is to hide sign-up and Crew for those age answers, or to ask for a parent's email instead.
2. On the Crew screen, anyone who knows an account's email can follow it and see the display name, XP, streak and last learning time, without the person agreeing. For a Kid account that is a stranger-safety concern under the Families policy. Consider needing the followed person to accept, or hiding Kid accounts from lookups.

## Steps that need you

1. **Fill in `site/site.config.json`** with the developer name shown on the pages (your legal name or business name), a support email you check, and the governing law (for example "the State of Texas, United States"). Or tell Claude in the project and it will fill them in. The site will not publish while any value is blank.
2. **Turn on GitHub Pages:** repository Settings → Pages → Build and deployment → Source: **GitHub Actions**. Then Actions → "Publish support and privacy pages" → Run workflow. It also runs on every merge that changes `site/`.
3. **Store accounts:** Google Play Console ($25 once) and Apple Developer Program ($99 a year). Agreements, bank and tax details are listed in `docs/monetization.md`.
4. **Google Play testing rule:** personal developer accounts created after November 2023 must run a closed test with at least 12 testers for 14 days before they can apply for production. Start this as soon as the first build is ready.
5. **Apple EU trader status:** App Store Connect asks whether you are a trader under the EU Digital Services Act. Selling subscriptions usually makes you one, which shows your address, phone and email on the EU App Store. Answer it, or remove EU countries from availability until you are ready.
6. **Paste the listings and answer the forms** from the files in this folder. Recheck `google-play/data-safety.md` and `app-store/privacy-labels.md` if any SDK is added.
7. **Graphics:** upload the files in [graphics](graphics). Its README maps each one to its store slot.
8. **AdMob `app-ads.txt`:** AdMob looks for it at the root of the developer website's domain. `fahadbin-alam.github.io/Islamic-Learning-Duolingo-Style/` is not a root, so either use a custom domain for the site or create a repository named `Fahadbin-Alam.github.io` containing only `app-ads.txt`, and use `https://fahadbin-alam.github.io` as the developer website in both stores.
9. **Lesson sources:** confirm that any Quran translation or hadith text quoted word for word in lessons is either paraphrased or from a translation whose licence allows use in an app, so you can answer "Yes" to Apple's content rights question.

The privacy policy and terms are a solid, plain-language starting point written to match what the code does, not legal advice. If the app starts earning real money, a one-time review by a lawyer is worth it.
