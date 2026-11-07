# Hosting the Muslimo server (progress backup)

With a server, a learner who has an account gets their progress back after a reinstall or on a new phone. Without
one, everything stays on the phone (that is how builds up to v12 work).

## What runs where

| Piece | Where | Cost |
| --- | --- | --- |
| API (`backend/`, FastAPI in Docker) | [Render](https://render.com) web service from `render.yaml` | Free. It sleeps after 15 idle minutes and takes up to a minute to wake. Upgrade the plan to Starter (about $7 a month) to keep it awake once there are many learners. |
| Database (Postgres) | [Neon](https://neon.com) free project | Free (0.5 GB, plenty for tens of thousands of learners). Render's own free database is deleted after 30 days, so it is not used. |

Migrations and the lesson catalog run on every start (`backend/scripts/bootstrap.py`).

## Set it up (once)

1. **Neon**: sign up at https://console.neon.tech/signup (Continue with Google is fine). Create a project called
   `muslimo` with the default Postgres version, region **AWS US East (N. Virginia)** (Render's Virginia region is next to it). Copy the
   connection string from **Connect** (it starts with `postgresql://` and ends with `?sslmode=require`).
2. **Render**: sign up at https://dashboard.render.com/register with GitHub, and allow it to see
   `Islamic-Learning-Duolingo-Style`. Then open https://dashboard.render.com/blueprint/new, pick the repository and
   fill in:
   - `SIRA_DATABASE_URL`: the Neon connection string
   - `SIRA_GOOGLE_CLIENT_IDS_RAW`: `251398047915-1kuj45lfr88j89cvc66cc0kiv48ngsi1.apps.googleusercontent.com,251398047915-90kuv5ki9vd5j4r2pacl16cadvvnbqgp.apps.googleusercontent.com` (the web and iOS Google client ids; both are public)
   - `SIRA_REVENUECAT_WEBHOOK_AUTH`: any long random text (give RevenueCat the same text when paid plans go live)
   Pick region **Virginia** for the service.
3. When the deploy is green, open `https://muslimo-api.onrender.com/api/health` (Render shows the exact address).
   It should say `"ok": true` and `"database": "postgresql+psycopg"`.
4. **Builds**: on the PC that runs EAS,
   `npx eas-cli env:create --environment production --visibility plaintext --name EXPO_PUBLIC_API_BASE_URL --value https://muslimo-api.onrender.com`
   (and the same for `--environment preview`). The next Android and iOS builds sync; older builds stay phone-only.

## How sync behaves

- **Offline first.** Everything is saved on the phone first. When signed in, each change is also sent to the server;
  if that fails (no internet, server waking up) it is marked pending and sent again every minute and whenever the
  app comes back to the front (`src/services/backendSync.ts`).
- **New phone or reinstall.** Log in (email or Google/Apple) and the server copy loads.
- **Two phones out of step.** The server merges instead of overwriting (`apply_frontend_state` in
  `backend/app/service_layer.py`): finished lessons and claimed rewards are joined, stars, total XP and XP per day
  keep the higher number, an older streak day or league week never replaces a newer one, quiz scores keep the best.
  Gems, hearts and settings take the latest copy.
- **New profile fields need no server change.** Fields with no column of their own (review deck, quiz scores,
  Ramadan days, streak freezes, and anything later builds add) are kept in `users.progress_extra_json` (at most 40
  fields and 256 KB per learner) and sent back as they are.
- **Accounts made on phone-only builds** (v12 and earlier) move to the server the first time the learner logs in on a
  build with sync: email accounts when the password matches the one saved on the phone, Google/Apple accounts when
  the email matches. The phone's progress goes up with it.
- **The server sleeping.** The app pings `/api/health` as it opens so the server is awake by the time anyone logs
  in. Log in and sign up wait up to 60 seconds; other calls 30.

## Kids

Nothing about the kid rules changes. Under-13 accounts are in a parent's name and email; the age answer stays on
the phone; Crew shows name, XP and streak only after both sides add each other; Family codes never reach the
server. Deleting an account (Settings, or the web page) deletes the server row and everything under it.
