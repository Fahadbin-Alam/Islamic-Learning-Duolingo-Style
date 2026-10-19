"""Save the best stars per circle and the topic the learner had open last."""

import sqlalchemy as sa
from alembic import op


revision = "20261019_0003"
down_revision = "20261018_0002"
branch_labels = None
depends_on = None


def upgrade() -> None:
    inspector = sa.inspect(op.get_bind())
    existing = {column["name"] for column in inspector.get_columns("users")}

    # The initial migration builds tables from the current models, so a fresh database already has these.
    with op.batch_alter_table("users") as batch:
        if "node_stars_json" not in existing:
            batch.add_column(sa.Column("node_stars_json", sa.JSON(), nullable=False, server_default="{}"))
        if "last_topic_id" not in existing:
            batch.add_column(sa.Column("last_topic_id", sa.String(length=40), nullable=True))


def downgrade() -> None:
    with op.batch_alter_table("users") as batch:
        batch.drop_column("last_topic_id")
        batch.drop_column("node_stars_json")
