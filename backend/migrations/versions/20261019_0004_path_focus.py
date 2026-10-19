"""Save, per topic, the circle the path puts START on, so a jump ahead survives a reload."""

import sqlalchemy as sa
from alembic import op


revision = "20261019_0004"
down_revision = "20261019_0003"
branch_labels = None
depends_on = None


def upgrade() -> None:
    inspector = sa.inspect(op.get_bind())
    existing = {column["name"] for column in inspector.get_columns("users")}

    # The initial migration builds tables from the current models, so a fresh database already has it.
    with op.batch_alter_table("users") as batch:
        if "path_focus_json" not in existing:
            batch.add_column(sa.Column("path_focus_json", sa.JSON(), nullable=False, server_default="{}"))


def downgrade() -> None:
    with op.batch_alter_table("users") as batch:
        batch.drop_column("path_focus_json")
