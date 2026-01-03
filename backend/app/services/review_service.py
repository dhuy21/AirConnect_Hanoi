from sqlalchemy.orm import Session
from app.models.review import Review

def get_reviews_by_submission(db: Session, submission_id: int):
    """Get all reviews for a submission"""
    return db.query(Review).filter(
        Review.submission_id == submission_id
    ).all()

def create_review(db: Session, review_data: dict):
    """Create new review"""
    review = Review(**review_data)
    db.add(review)
    db.commit()
    db.refresh(review)
    return review

def get_reviews_by_admin(db: Session, admin_id: int):
    """Get all reviews by an admin"""
    return db.query(Review).filter(
        Review.admin_id == admin_id
    ).order_by(Review.date.desc()).all()

