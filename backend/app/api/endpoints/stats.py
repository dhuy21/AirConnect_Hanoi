from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from app.db import get_db
from app.models.school import School
from app.models.student import Student
from app.models.submission import Submission
from app.models.review import Review
from app.models.enums import Decision
from pydantic import BaseModel

router = APIRouter()

class StatsResponse(BaseModel):
    total_schools: int
    total_students: int
    total_submissions: int
    pending_reviews: int
    approved_submissions: int
    rejected_submissions: int

@router.get("/", response_model=StatsResponse)
def get_admin_stats(db: Session = Depends(get_db)):
    """Get admin dashboard statistics"""
    total_schools = db.query(func.count(School.id)).scalar()
    total_students = db.query(func.count(Student.id)).scalar()
    total_submissions = db.query(func.count(Submission.id)).scalar()
    
    # Count reviews by decision
    pending_reviews = db.query(func.count(Review.decision)).filter(
        Review.decision == Decision.PENDING
    ).scalar() or 0
    
    approved_submissions = db.query(func.count(Review.decision)).filter(
        Review.decision == Decision.ACCEPT
    ).scalar() or 0
    
    rejected_submissions = db.query(func.count(Review.decision)).filter(
        Review.decision == Decision.REJECT
    ).scalar() or 0
    
    return StatsResponse(
        total_schools=total_schools or 0,
        total_students=total_students or 0,
        total_submissions=total_submissions or 0,
        pending_reviews=pending_reviews,
        approved_submissions=approved_submissions,
        rejected_submissions=rejected_submissions
    )

