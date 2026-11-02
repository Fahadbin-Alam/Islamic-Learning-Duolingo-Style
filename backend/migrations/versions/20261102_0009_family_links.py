"""Family links: a parent's account follows a child's account live, linked with a short code from the child's phone."""

import sqlalchemy as sa
from alembic import op


revision = "20261102_0009"
down_revision = "20261031_0008"
branch_labels = None
depends_on = None


def upgrade() -> None:
    tables = sa.inspect(op.get_bind()).get_table_names()
    # The initial migration builds tables from the current models, so a fresh database already has them.
    if "family_links" not in tables:
        op.create_table(
            "family_links",
            sa.Column("id", sa.Integer(), primary_key=True, autoincrement=True),
            sa.Column("parent_id", sa.Integer(), sa.ForeignKey("users.id", ondelete="CASCADE"), nullable=False),
            sa.Column("child_id", sa.Integer(), sa.ForeignKey("users.id", ondelete="CASCADE"), nullable=False),
            sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
            sa.UniqueConstraint("parent_id", "child_id", name="uq_family_link_pair"),
        )
        op.create_index("ix_family_links_parent_id", "family_links", ["parent_id"])
        op.create_index("ix_family_links_child_id", "family_links", ["child_id"])
    if "family_link_codes" not in tables:
        op.create_table(
            "family_link_codes",
            sa.Column("code", sa.String(length=12), primary_key=True),
            sa.Column("child_id", sa.Integer(), sa.ForeignKey("users.id", ondelete="CASCADE"), nullable=False),
            sa.Column("expires_at", sa.DateTime(timezone=True), nullable=False),
        )
        op.create_index("ix_family_link_codes_child_id", "family_link_codes", ["child_id"], unique=True)


def downgrade() -> None:
    op.drop_index("ix_family_link_codes_child_id", table_name="family_link_codes")
    op.drop_table("family_link_codes")
    op.drop_index("ix_family_links_child_id", table_name="family_links")
    op.drop_index("ix_family_links_parent_id", table_name="family_links")
    op.drop_table("family_links")
