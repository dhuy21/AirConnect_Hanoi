from sqlalchemy.orm import Session
from app.models.submission import Submission

def get_submissions_by_school(db: Session, school_id: int):
    """Get all submissions for a school"""
    return db.query(Submission).filter(
        Submission.from_school_id == school_id
    ).order_by(Submission.id.desc()).all()

def get_submission_by_id(db: Session, submission_id: int):
    """Get submission by ID"""
    return db.query(Submission).filter(Submission.id == submission_id).first()

def create_submission(db: Session, submission_data: dict):
    """Create new submission"""
    submission = Submission(**submission_data)
    db.add(submission)
    db.commit()
    db.refresh(submission)
    return submission

def get_all_submissions(db: Session, limit: int = 100):
    """Get all submissions (for admin)"""
    return db.query(Submission).order_by(
        Submission.id.desc()
    ).limit(limit).all()

