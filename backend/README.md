# Backend Overview

The backend is now a FastAPI application prepared for long-term product use instead of a temporary local JSON store.

## Stack

- FastAPI for the API layer
- SQLAlchemy 2.x for ORM models
- Alembic for migrations
- SQLite for local development
- PostgreSQL-ready connection support through `SIRA_DATABASE_URL`

## Main Files

- [app/main.py](app/main.py): FastAPI entrypoint
- [app/models.py](app/models.py): database models
- [app/schemas.py](app/schemas.py): request/response schemas
- [app/catalog_seed.py](app/catalog_seed.py): starter scalable content seeding
- [migrations](migrations): Alembic environment and revisions
- [scripts/bootstrap.py](scripts/bootstrap.py): migrate + seed helper

## Local Database

By default the local SQLite database is:

- [sira_path.db](data/sira_path.db)

## Commands

Run API:

```bash
python -m uvicorn backend.app.main:app --reload --port 8000
```

Run migrations:

```bash
python -m alembic -c backend/alembic.ini upgrade head
```

Seed catalog:

```bash
python -m backend.scripts.seed_content
```

Bootstrap everything:

```bash
python -m backend.scripts.bootstrap
```

## Production Direction

For production:
- set `SIRA_DATABASE_URL` to PostgreSQL
- keep running Alembic migrations
- move secret config to environment variables or a secrets manager
- replace placeholder social-login stubs with real provider verification
- wire subscription sync to RevenueCat or direct store webhooks

## Legacy Note

- [server.js](server.js) is still in the repo as the old lightweight backend, but it is now a legacy fallback, not the main direction.
