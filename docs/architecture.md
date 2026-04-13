# Architecture

## Product Direction

Sira Path is now structured as:
- Expo/React Native frontend
- FastAPI backend
- SQL database with migrations
- shared account and progress sync model
- subscription entitlement layer

That gives us a clean path to:
- web
- iOS
- Android

## Current Data Storage

Before this refactor, critical state lived in:
- browser localStorage
- a file-backed Node JSON backend

Now the long-term home for real product data is the SQL backend:
- users
- topics
- branches
- lessons
- questions
- lesson resources
- user progress
- question attempts
- review queue
- subscription entitlements
- analytics event logs

The frontend still uses some local persistence as a resilience layer, but the architecture is no longer trapped there.

## Database Strategy

### Local development

- SQLite
- easy bootstrap
- lives at [backend/data/sira_path.db](C:/Users/ME/Islamic-Learning-Duolingo-Style/backend/data/sira_path.db)

### Production

- PostgreSQL through `SIRA_DATABASE_URL`
- same SQLAlchemy models
- same Alembic migration flow

## Content Hierarchy

The backend content model is intentionally built for large trees:

### Topic
- `Sahabi`
- `Prayer`
- `Quran`
- and other directories

### Branch
- inside `Sahabi`: `Abu Bakr`, `Umar ibn al-Khattab`, `Uthman ibn Affan`, and more
- inside `Prayer`: `Wudu`, `Salah basics`, `Prayer times`, `Adhan and iqamah`, and more
- inside `Quran`: surah-based branches

### Lesson
- ordered progression
- difficulty
- premium flag
- mastery eligibility
- resources
- questions

This is built so branches can hold dozens or hundreds of lessons over time.

## Premium / Entitlements

Plan structure:
- `free`
- `premium_monthly` = `$9.99`
- `premium_yearly` = `$95.90`

The backend stores entitlements separately from the UI so:
- premium gating is not just cosmetic
- store sync can be verified server-side later
- RevenueCat integration has a clean landing spot

## Progress and Learning State

There are two layers now:

1. Product-safe normalized tables:
- `user_progress`
- `question_attempts`
- `review_queue`

2. Frontend compatibility snapshot state on `users`:
- learner profile JSON
- reminder preferences
- completed lesson ids
- completed node ids
- claimed reward ids

That lets the current UI keep moving while we migrate more of the live lesson delivery to API-first content.

## What Still Needs To Be Done For Full Launch

- move the frontend lesson player from local lesson definitions to backend-delivered lesson IDs
- implement secure Google/Facebook verification when provider credentials are available
- connect mobile subscriptions through RevenueCat or store-native server verification
- add admin/content import tooling
- add real background jobs for spaced review scheduling and notifications
- harden auth/session handling further for production deployment

## Why This Matters

This repo is now set up like the foundation of a product:
- content can grow
- user data persists
- subscriptions have a backend home
- migration to mobile is realistic
- swapping SQLite for PostgreSQL is straightforward
