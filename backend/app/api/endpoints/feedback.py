from fastapi import APIRouter, Depends, Query, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.db import get_db
from app.schemas.feedback import FeedbackResponse, FeedbackCreate
from app.services import feedback_service

router = APIRouter()

@router.post("/", response_model=FeedbackResponse, status_code=201)
def create_feedback(
    feedback: FeedbackCreate,
    db: Session = Depends(get_db)
):
    """Create a new feedback"""
    from datetime import datetime
    feedback_data = feedback.model_dump()
    feedback_data['created_at'] = datetime.now()
    return feedback_service.create_feedback(db, feedback_data)

@router.get("/", response_model=List[FeedbackResponse])
def get_all_feedbacks(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=100),
    db: Session = Depends(get_db)
):
    """Get all feedbacks (for admin)"""
    return feedback_service.get_all_feedbacks(db, skip=skip, limit=limit)

@router.get("/unread", response_model=List[FeedbackResponse])
def get_unread_feedbacks(
    db: Session = Depends(get_db)
):
    """Get all unread feedbacks (for admin)"""
    return feedback_service.get_unread_feedbacks(db)

@router.get("/{feedback_id}", response_model=FeedbackResponse)
def get_feedback_by_id(
    feedback_id: int,
    db: Session = Depends(get_db)
):
    """Get feedback by id"""
    feedback = feedback_service.get_feedback_by_id(db, feedback_id)
    if not feedback:
        raise HTTPException(status_code=404, detail="Feedback not found")
    return feedback

@router.patch("/{feedback_id}/read", response_model=FeedbackResponse)
def mark_feedback_as_read(
    feedback_id: int,
    db: Session = Depends(get_db)
):
    """Mark feedback as read"""
    feedback = feedback_service.mark_as_read(db, feedback_id)
    if not feedback:
        raise HTTPException(status_code=404, detail="Feedback not found")
    return feedback

@router.delete("/{feedback_id}", status_code=204)
def delete_feedback(
    feedback_id: int,
    db: Session = Depends(get_db)
):
    """Delete feedback"""
    feedback = feedback_service.delete_feedback(db, feedback_id)
    if not feedback:
        raise HTTPException(status_code=404, detail="Feedback not found")
    return None

