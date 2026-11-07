"""Keep the rest of the app's profile (quiz scores, Ramadan days, review deck, streak freezes) on the server."""

import sqlalchemy as sa
from alembic import op


revision = "20261031_0007"
down_revision = "20261029_0006"
branch_labels = None
depends_on = None


def upgrade() -> None:
    inspector = sa.inspect(op.get_bind())
    existing = {column["name"] for column in inspector.get_columns("users")}

    # The initial migration builds tables from the current models, so a fresh database already has it.
    with op.batch_alter_table("users") as batch:
        if "progress_extra_json" not in existing:
            batch.add_column(sa.Column("progress_extra_json", sa.JSON(), nullable=False, server_default="{}"))


def downgrade() -> None:
    with op.batch_alter_table("users") as batch:
        batch.drop_column("progress_extra_json")
