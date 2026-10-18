from __future__ import annotations

import os
import tempfile
from pathlib import Path

# Point the app at a throwaway SQLite file before any backend module reads settings.
_DB_DIR = tempfile.mkdtemp(prefix="sira_path_tests_")
os.environ["SIRA_DATABASE_URL"] = f"sqlite:///{Path(_DB_DIR, 'test.db').as_posix()}"

import pytest
from fastapi.testclient import TestClient

from backend.app.catalog_seed import seed_catalog
from backend.app.db.base import Base
from backend.app.db.session import SessionLocal, engine
from backend.app.main import app
from backend.app import models  # noqa: F401  (registers tables on Base.metadata)


@pytest.fixture(scope="session", autouse=True)
def database():
    Base.metadata.create_all(engine)
    with SessionLocal() as session:
        seed_catalog(session)
    yield
    Base.metadata.drop_all(engine)
    engine.dispose()


@pytest.fixture()
def client():
    with TestClient(app) as test_client:
        yield test_client


@pytest.fixture()
def auth_headers(client):
    import uuid

    response = client.post(
        "/api/auth/register",
        json={
            "name": "Test Learner",
            "email": f"learner-{uuid.uuid4().hex[:10]}@example.com",
            "password": "correct-horse-battery",
            "user": {"totalXp": 0, "streakDays": 0, "hearts": {"current": 5, "max": 5, "unlimited": False}},
        },
    )
    assert response.status_code == 201, response.text
    return {"Authorization": f"Bearer {response.json()['token']}"}
