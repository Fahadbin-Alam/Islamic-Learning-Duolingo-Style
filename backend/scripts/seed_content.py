from __future__ import annotations

from backend.app.catalog_seed import seed_catalog
from backend.app.db.session import SessionLocal


def main() -> None:
    with SessionLocal() as session:
        totals = seed_catalog(session)
    print(
        "Seeded catalog:",
        f"topics={totals['topics']}",
        f"branches={totals['branches']}",
        f"lessons={totals['lessons']}",
        f"questions={totals['questions']}",
        f"resources={totals['resources']}",
    )


if __name__ == "__main__":
    main()

