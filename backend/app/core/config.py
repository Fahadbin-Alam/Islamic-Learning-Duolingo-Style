from __future__ import annotations

from pathlib import Path
from typing import List

from pydantic import Field, field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


ROOT_DIR = Path(__file__).resolve().parents[3]
DEFAULT_SQLITE_PATH = ROOT_DIR / "backend" / "data" / "sira_path.db"


class Settings(BaseSettings):
    app_name: str = "Sira Path API"
    api_prefix: str = "/api"
    environment: str = "development"
    database_url: str = Field(default=f"sqlite:///{DEFAULT_SQLITE_PATH.as_posix()}")
    session_ttl_hours: int = 24 * 30
    cors_origins_raw: str = "http://localhost:8082,http://localhost:19006,http://localhost:3000"
    trusted_social_login: bool = False
    # Shared secret RevenueCat sends in the Authorization header of every webhook call.
    revenuecat_webhook_auth: str = ""

    model_config = SettingsConfigDict(
        env_file=".env",
        env_prefix="SIRA_",
        case_sensitive=False,
        extra="ignore"
    )

    @field_validator("database_url")
    @classmethod
    def use_psycopg_driver(cls, value: str) -> str:
        # Render, Railway and Heroku hand out postgres:// URLs; SQLAlchemy needs the psycopg driver named.
        for prefix in ("postgres://", "postgresql://"):
            if value.startswith(prefix):
                return "postgresql+psycopg://" + value[len(prefix):]
        return value

    @property
    def cors_origins(self) -> List[str]:
        return [origin.strip() for origin in self.cors_origins_raw.split(",") if origin.strip()]

    @property
    def is_sqlite(self) -> bool:
        return self.database_url.startswith("sqlite")


settings = Settings()

