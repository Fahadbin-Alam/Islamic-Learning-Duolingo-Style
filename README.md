# Sira Path

Sira Path is an Islamic learning platform with a Duolingo-style path UI and a production-minded backend foundation for web today and Expo/iOS/Android next.

## What Changed

This repo is no longer just a frontend demo plus a JSON file backend.

It now includes:
- Expo/React Native frontend for web, iOS, and Android direction
- FastAPI backend in [backend/app/main.py](C:/Users/ME/Islamic-Learning-Duolingo-Style/backend/app/main.py)
- SQLAlchemy models for users, topics, branches, lessons, questions, resources, progress, review queue, subscriptions, and analytics
- Alembic migrations in [backend/migrations](C:/Users/ME/Islamic-Learning-Duolingo-Style/backend/migrations)
- SQLite for local development
- PostgreSQL-ready database configuration through `SIRA_DATABASE_URL`
- content seeding for large topic trees, including `Sahabi`, `Prayer`, `Quran`, and more

## Project Layout

- [src](C:/Users/ME/Islamic-Learning-Duolingo-Style/src): current app UI, shared learning logic, client sync layer
- [backend/app](C:/Users/ME/Islamic-Learning-Duolingo-Style/backend/app): FastAPI app, models, config, routes, seeding
- [backend/migrations](C:/Users/ME/Islamic-Learning-Duolingo-Style/backend/migrations): Alembic migration environment and revision history
- [backend/scripts](C:/Users/ME/Islamic-Learning-Duolingo-Style/backend/scripts): bootstrap and seed helpers
- [backend/data](C:/Users/ME/Islamic-Learning-Duolingo-Style/backend/data): local SQLite database lives here in development
- [api/islamic-learning.swagger.yaml](C:/Users/ME/Islamic-Learning-Duolingo-Style/api/islamic-learning.swagger.yaml): API contract starter

## Local Development

Install frontend dependencies:

```bash
npm install
```

Run the Expo app:

```bash
npm run start
```

Run the backend API:

```bash
npm run backend
```

Bootstrap the database from scratch:

```bash
npm run backend:bootstrap
```

Run migrations only:

```bash
npm run backend:migrate
```

Seed catalog content only:

```bash
npm run backend:seed
```

Legacy JSON backend, if you need it temporarily:

```bash
npm run backend:legacy
```

## Database

Local development uses SQLite by default:

- [backend/data/sira_path.db](C:/Users/ME/Islamic-Learning-Duolingo-Style/backend/data/sira_path.db)

To switch to PostgreSQL, set:

```bash
SIRA_DATABASE_URL=postgresql+psycopg://user:password@localhost:5432/sira_path
```

and run:

```bash
npm run backend:migrate
```

## Current Backend Surface

Main routes now include:
- `/api/auth/register`
- `/api/auth/login`
- `/api/auth/logout`
- `/api/session`
- `/api/profile/me`
- `/api/topics`
- `/api/topics/{topic_slug}/branches`
- `/api/branches/{branch_slug}/lessons`
- `/api/lessons/{lesson_slug}`
- `/api/lessons/{lesson_slug}/completion`
- `/api/questions/{question_id}/attempts`
- `/api/review-queue`
- `/api/subscriptions/plans`
- `/api/subscriptions/entitlements`
- `/api/subscriptions/sync`
- `/api/analytics/events`

## Content Scaling

The content model now supports:
- many branches per topic
- many lessons per branch
- free vs premium lessons
- review and mastery lessons
- surah-based Quran organization
- deep `Sahabi` branches
- deep `Prayer` branches including `Wudu`

The current seed data intentionally creates large trees so the app stops behaving like a tiny prototype.

## Important Notes

- The frontend still carries local lesson presentation and path rendering logic while the backend catalog foundation is brought online.
- User accounts, synced profile state, entitlement tables, review queue, and analytics-ready event logging now have a real backend home.
- Social login still needs provider credentials and secure verification before it should be turned on in production.
- RevenueCat is not wired yet, but the backend entitlement model is structured so we can add that cleanly next.

## More Docs

- [backend/README.md](C:/Users/ME/Islamic-Learning-Duolingo-Style/backend/README.md)
- [docs/architecture.md](C:/Users/ME/Islamic-Learning-Duolingo-Style/docs/architecture.md)
- [docs/google-play-android-release.md](C:/Users/ME/Islamic-Learning-Duolingo-Style/docs/google-play-android-release.md)
- [docs/privacy-policy.md](C:/Users/ME/Islamic-Learning-Duolingo-Style/docs/privacy-policy.md)
