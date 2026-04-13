from __future__ import annotations

from pathlib import Path
from typing import List

from pydantic import Field
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

    model_config = SettingsConfigDict(
        env_file=".env",
        env_prefix="SIRA_",
        case_sensitive=False,
        extra="ignore"
    )

    @property
    def cors_origins(self) -> List[str]:
        return [origin.strip() for origin in self.cors_origins_raw.split(",") if origin.strip()]

    @property
    def is_sqlite(self) -> bool:
        return self.database_url.startswith("sqlite")


settings = Settings()

