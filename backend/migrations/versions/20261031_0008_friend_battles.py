"""Quiz battles between two friends: one asks, the other says yes, both answer the same questions."""

import sqlalchemy as sa
from alembic import op


revision = "20261031_0008"
down_revision = "20261031_0007"
branch_labels = None
depends_on = None


def upgrade() -> None:
    inspector = sa.inspect(op.get_bind())
    # The initial migration builds tables from the current models, so a fresh database already has it.
    if "friend_battles" in inspector.get_table_names():
        return
    op.create_table(
        "friend_battles",
        sa.Column("id", sa.Integer(), primary_key=True, autoincrement=True),
        sa.Column("challenger_id", sa.Integer(), sa.ForeignKey("users.id", ondelete="CASCADE"), nullable=False),
        sa.Column("opponent_id", sa.Integer(), sa.ForeignKey("users.id", ondelete="CASCADE"), nullable=False),
        sa.Column("status", sa.String(length=20), nullable=False, server_default="pending"),
        sa.Column("seed", sa.Integer(), nullable=False),
        sa.Column("challenger_score", sa.Integer(), nullable=True),
        sa.Column("opponent_score", sa.Integer(), nullable=True),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
    )
    op.create_index("ix_friend_battles_challenger_id", "friend_battles", ["challenger_id"])
    op.create_index("ix_friend_battles_opponent_id", "friend_battles", ["opponent_id"])


def downgrade() -> None:
    op.drop_index("ix_friend_battles_opponent_id", table_name="friend_battles")
    op.drop_index("ix_friend_battles_challenger_id", table_name="friend_battles")
    op.drop_table("friend_battles")
