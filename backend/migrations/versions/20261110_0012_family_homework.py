"""Family homework: a linked parent or teacher asks a learner to finish a unit, maybe by a date."""

import sqlalchemy as sa
from alembic import op


revision = "20261110_0012"
down_revision = "20261103_0011"
branch_labels = None
depends_on = None


def upgrade() -> None:
    tables = sa.inspect(op.get_bind()).get_table_names()
    # The initial migration builds tables from the current models, so a fresh database already has it.
    if "family_homework" not in tables:
        op.create_table(
            "family_homework",
            sa.Column("id", sa.Integer(), primary_key=True, autoincrement=True),
            sa.Column("setter_id", sa.Integer(), sa.ForeignKey("users.id", ondelete="CASCADE"), nullable=False),
            sa.Column("learner_id", sa.Integer(), sa.ForeignKey("users.id", ondelete="CASCADE"), nullable=False),
            sa.Column("topic_id", sa.String(length=40), nullable=False),
            sa.Column("unit_id", sa.String(length=120), nullable=False),
            sa.Column("node_ids_json", sa.JSON(), nullable=False),
            sa.Column("due_date", sa.String(length=10), nullable=True),
            sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        )
        op.create_index("ix_family_homework_setter_id", "family_homework", ["setter_id"])
        op.create_index("ix_family_homework_learner_id", "family_homework", ["learner_id"])


def downgrade() -> None:
    op.drop_index("ix_family_homework_learner_id", table_name="family_homework")
    op.drop_index("ix_family_homework_setter_id", table_name="family_homework")
    op.drop_table("family_homework")
