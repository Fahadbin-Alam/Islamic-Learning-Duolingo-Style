"""Save the learner's weekly league, so it follows them to a new phone."""

import sqlalchemy as sa
from alembic import op


revision = "20261028_0005"
down_revision = "20261019_0004"
branch_labels = None
depends_on = None


def upgrade() -> None:
    inspector = sa.inspect(op.get_bind())
    existing = {column["name"] for column in inspector.get_columns("users")}

    # The initial migration builds tables from the current models, so a fresh database already has it.
    with op.batch_alter_table("users") as batch:
        if "league_json" not in existing:
            batch.add_column(sa.Column("league_json", sa.JSON(), nullable=False, server_default="{}"))


def downgrade() -> None:
    with op.batch_alter_table("users") as batch:
        batch.drop_column("league_json")
