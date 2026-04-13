from __future__ import annotations

import subprocess
import sys


def main() -> None:
    commands = [
        [sys.executable, "-m", "alembic", "-c", "backend/alembic.ini", "upgrade", "head"],
        [sys.executable, "-m", "backend.scripts.seed_content"],
    ]
    for command in commands:
        subprocess.check_call(command)


if __name__ == "__main__":
    main()
