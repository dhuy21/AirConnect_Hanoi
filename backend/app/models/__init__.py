"""Import all models for Alembic and init_db"""
from app.models import (
    school,
    student,
    admin,
    air_quality,
    post,
    submission,
    review,
    solution,
    help,
    view,
    apply
)

__all__ = [
    "school",
    "student",
    "admin",
    "air_quality",
    "post",
    "submission",
    "review",
    "solution",
    "help",
    "view",
    "apply"
]

