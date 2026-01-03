from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from app.db import get_db
from app.schemas.review import ReviewResponse, ReviewCreate
from app.services import review_service

router = APIRouter()

@router.get("/submission/{submission_id}", response_model=List[ReviewResponse])
def get_reviews_by_submission(
    submission_id: int,
    db: Session = Depends(get_db)
):
    """Get all reviews for a submission"""
    return review_service.get_reviews_by_submission(db, submission_id)

@router.post("/", response_model=ReviewResponse)
def create_review(
    review: ReviewCreate,
    db: Session = Depends(get_db)
):
    """Create a new review (admin only)"""
    from datetime import datetime
    review_data = review.model_dump()
    if 'date' not in review_data or not review_data['date']:
        review_data['date'] = datetime.now()
    return review_service.create_review(db, review_data)

