# Usage stats and crash reports

`src/services/analytics.ts` sends a few anonymous events to [PostHog](https://posthog.com) so we can see where learners quit, which lessons get finished, how many people come back, and what crashes. It is plain HTTPS from our own code (PostHog's `/batch/` API), not an SDK, so it needs no native module and no new build setup.

## What is sent

| Event | When | Extra fields |
| --- | --- | --- |
| `app_open` | The app opens (after the age screen), and each time it comes back to the front (`resumed: true`) | |
| `lesson_start` | A lesson, test-out or Practice session starts | `lesson_id`, `unit_id`, `mode`, `questions` |
| `lesson_complete` | Its complete screen shows | the same, plus `mistakes` |
| `lesson_quit` | It ends early | the same, plus `reason` (`quit` = the X, `out_of_hearts`, `test_failed`), `screen`, `questions_done`, `mistakes` |
| `topic_open` | A topic is picked | `topic_id`, `unit_id` |
| `tab_open` | Profile, Shop, Crew, Review or the placement test opens | `tab` |
| `$exception` | A crash (`ErrorUtils` global handler) or a screen that breaks (`src/ui/CrashScreen.tsx`, which shows TRY AGAIN instead of a blank app) | message, type, stack, `fatal`, `where` |

Every event also has `platform`, `app_version`, `app_build`, `language` and `age_band` (`under13`, `13-17`, `18+`, `unknown`). 13 and over also get `days_since_install`.

Never sent: name, email, account id, answers, Family codes, the advertising ID.

## Kids and consent

- 13 and over: events carry a random id made on the phone (not the account), so retention can be counted.
- Under 13, Kid accounts, and before the age is given: no id at all. Every event gets a throwaway id, so they are only counts.
- `$process_person_profile: false` and `$geoip_disable: true` on every event: no person profiles, no location lookup.
- Settings > Share app stats turns usage stats off (and drops what was waiting). Crash reports still go; they carry no id.
- The switch only shows in builds with a key.

## Offline

Events wait on the phone (`sira-path-analytics-queue`, at most 300; crash reports are kept over usage events when it is full) and go in batches of 50 every 30 seconds, when the app goes to the background, and on the next open. A failed send keeps them.

## Turning it on (one time)

1. Make a free account at https://us.posthog.com/signup (the free plan covers 1 million events a month).
2. Project settings: copy the **Project API key** (starts with `phc_`).
3. Project settings > **Discard client IP data**: turn on.
4. On the build PC: `eas env:create --environment production --visibility plaintext --name EXPO_PUBLIC_POSTHOG_KEY --value phc_...`
5. The next build sends stats. Builds without the key send nothing.

## Useful charts in PostHog

- **Where people quit:** Insights > Trends, event `lesson_quit`, breakdown by `lesson_id` (or by `questions_done`).
- **Lesson completion:** Insights > Funnels, `lesson_start` then `lesson_complete`, breakdown by `lesson_id`.
- **Retention:** Insights > Retention, start event `app_open`, return event `app_open` (13+ only, since under 13 have no id).
- **Crashes:** Error tracking, or Trends on `$exception` broken down by `$exception_message` and `app_build`.

Native crashes (outside the JavaScript) still show in Play Console > Android vitals and App Store Connect > TestFlight crashes.
