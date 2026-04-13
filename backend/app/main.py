from __future__ import annotations

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.app.api.routes.analytics import router as analytics_router
from backend.app.api.routes.auth import router as auth_router
from backend.app.api.routes.catalog import router as catalog_router
from backend.app.api.routes.learning import router as learning_router
from backend.app.api.routes.profile import router as profile_router
from backend.app.api.routes.subscriptions import router as subscriptions_router
from backend.app.core.config import settings


app = FastAPI(title=settings.app_name, version="2.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
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
app.include_router(catalog_router, prefix="/api")
app.include_router(learning_router, prefix="/api")
app.include_router(subscriptions_router, prefix="/api")
app.include_router(analytics_router, prefix="/api")
