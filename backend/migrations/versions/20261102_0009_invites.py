"""Invite codes: a new learner types a friend's code and both get dates."""

import sqlalchemy as sa
from alembic import op


revision = "20261102_0009"
down_revision = "20261031_0008"
branch_labels = None
depends_on = None


def upgrade() -> None:
    inspector = sa.inspect(op.get_bind())
    # The initial migration builds tables from the current models, so a fresh database already has it.
    if "invites" in inspector.get_table_names():
        return
    op.create_table(
        "invites",
        sa.Column("id", sa.Integer(), primary_key=True, autoincrement=True),
        sa.Column("inviter_id", sa.Integer(), sa.ForeignKey("users.id", ondelete="CASCADE"), nullable=False),
        sa.Column("invitee_id", sa.Integer(), sa.ForeignKey("users.id", ondelete="CASCADE"), nullable=False, unique=True),
        sa.Column("inviter_rewarded", sa.Boolean(), nullable=False, server_default=sa.false()),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
    )
    op.create_index("ix_invites_inviter_id", "invites", ["inviter_id"])


def downgrade() -> None:
    op.drop_index("ix_invites_inviter_id", table_name="invites")
    op.drop_table("invites")
