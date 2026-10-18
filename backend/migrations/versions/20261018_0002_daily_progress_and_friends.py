"""Save daily XP, streak date and XP history; add friendships."""

import sqlalchemy as sa
from alembic import op


revision = "20261018_0002"
down_revision = "20260412_0001"
branch_labels = None
depends_on = None


def upgrade() -> None:
    inspector = sa.inspect(op.get_bind())
    existing = {column["name"] for column in inspector.get_columns("users")}

    # The initial migration builds tables from the current models, so a fresh database already has these.
    with op.batch_alter_table("users") as batch:
        if "last_streak_date" not in existing:
            batch.add_column(sa.Column("last_streak_date", sa.String(length=10), nullable=True))
        if "daily_xp_date" not in existing:
            batch.add_column(sa.Column("daily_xp_date", sa.String(length=10), nullable=True))
        if "daily_xp" not in existing:
            batch.add_column(sa.Column("daily_xp", sa.Integer(), nullable=False, server_default="0"))
        if "xp_history_json" not in existing:
            batch.add_column(sa.Column("xp_history_json", sa.JSON(), nullable=False, server_default="{}"))

    if "friendships" not in inspector.get_table_names():
        op.create_table(
            "friendships",
            sa.Column("id", sa.Integer(), primary_key=True, autoincrement=True),
            sa.Column("user_id", sa.Integer(), sa.ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True),
            sa.Column("friend_id", sa.Integer(), sa.ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True),
            sa.Column("relation", sa.String(length=20), nullable=False, server_default="friend"),
            sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
            sa.UniqueConstraint("user_id", "friend_id", name="uq_friendship_pair"),
        )


def downgrade() -> None:
    op.drop_table("friendships")
    with op.batch_alter_table("users") as batch:
        batch.drop_column("xp_history_json")
        batch.drop_column("daily_xp")
        batch.drop_column("daily_xp_date")
        batch.drop_column("last_streak_date")
