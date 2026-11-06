from __future__ import annotations

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.app.api.routes.admin import router as admin_router
from backend.app.api.routes.analytics import router as analytics_router
from backend.app.api.routes.auth import router as auth_router
from backend.app.api.routes.battles import router as battles_router
from backend.app.api.routes.catalog import router as catalog_router
from backend.app.api.routes.family import router as family_router
from backend.app.api.routes.friends import router as friends_router
from backend.app.api.routes.invites import router as invites_router
from backend.app.api.routes.ummah import router as ummah_router
from backend.app.api.routes.learning import router as learning_router
from backend.app.api.routes.profile import router as profile_router
from backend.app.api.routes.subscriptions import router as subscriptions_router
from backend.app.core.config import settings


STATS_PAGE_ORIGIN = "https://fahadbin-alam.github.io"

app = FastAPI(title=settings.app_name, version="2.0.0")

app.add_middleware(
    CORSMiddleware,
    # The owner's stats page (site/stats.html) lives on GitHub Pages, so that origin is always allowed.
    allow_origins=[*settings.cors_origins, STATS_PAGE_ORIGIN],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/health")
def health():
    return {
        "ok": True,
        "service": "sira-path-fastapi",
        "database": settings.database_url.split("://", 1)[0],
    }


app.include_router(auth_router, prefix="/api")
app.include_router(profile_router, prefix="/api")
app.include_router(friends_router, prefix="/api")
app.include_router(family_router, prefix="/api")
app.include_router(ummah_router, prefix="/api")
app.include_router(battles_router, prefix="/api")
app.include_router(invites_router, prefix="/api")
app.include_router(catalog_router, prefix="/api")
app.include_router(learning_router, prefix="/api")
app.include_router(subscriptions_router, prefix="/api")
app.include_router(analytics_router, prefix="/api")
app.include_router(admin_router, prefix="/api")
