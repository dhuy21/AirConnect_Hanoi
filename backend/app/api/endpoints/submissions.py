from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import List
from app.db import get_db
from app.schemas.submission import SubmissionResponse, SubmissionCreate
from app.services import submission_service

router = APIRouter()

@router.get("/", response_model=List[SubmissionResponse])
def get_all_submissions(
    limit: int = Query(100, description="Limit results"),
    db: Session = Depends(get_db)
):
    """Get all submissions (for admin)"""
    return submission_service.get_all_submissions(db, limit)

@router.get("/school/{school_id}", response_model=List[SubmissionResponse])
def get_submissions_by_school(
    school_id: int,
    db: Session = Depends(get_db)
):
    """Get all submissions for a school"""
    return submission_service.get_submissions_by_school(db, school_id)

@router.post("/", response_model=SubmissionResponse)
def create_submission(
    submission: SubmissionCreate,
    db: Session = Depends(get_db)
):
    """Create a new submission"""
    return submission_service.create_submission(db, submission.model_dump())

