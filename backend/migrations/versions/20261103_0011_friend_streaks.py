"""Friend streaks: days in a row on which two friends both finished a lesson."""

import sqlalchemy as sa
from alembic import op


revision = "20261103_0011"
down_revision = "20261102_0010"
branch_labels = None
depends_on = None


def upgrade() -> None:
    tables = sa.inspect(op.get_bind()).get_table_names()
    # The initial migration builds tables from the current models, so a fresh database already has it.
    if "friend_streaks" not in tables:
        op.create_table(
            "friend_streaks",
            sa.Column("id", sa.Integer(), primary_key=True, autoincrement=True),
            sa.Column("user_low_id", sa.Integer(), sa.ForeignKey("users.id", ondelete="CASCADE"), nullable=False),
            sa.Column("user_high_id", sa.Integer(), sa.ForeignKey("users.id", ondelete="CASCADE"), nullable=False),
            sa.Column("days", sa.Integer(), server_default="0", nullable=False),
            sa.Column("last_day", sa.String(length=10), nullable=True),
            sa.Column("best_days", sa.Integer(), server_default="0", nullable=False),
            sa.UniqueConstraint("user_low_id", "user_high_id", name="uq_friend_streak_pair"),
        )
        op.create_index("ix_friend_streaks_user_low_id", "friend_streaks", ["user_low_id"])
        op.create_index("ix_friend_streaks_user_high_id", "friend_streaks", ["user_high_id"])


def downgrade() -> None:
    op.drop_index("ix_friend_streaks_user_high_id", table_name="friend_streaks")
    op.drop_index("ix_friend_streaks_user_low_id", table_name="friend_streaks")
    op.drop_table("friend_streaks")
