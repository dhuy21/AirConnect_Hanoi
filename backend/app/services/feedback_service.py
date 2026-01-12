from sqlalchemy.orm import Session
from app.models.feedback import Feedback
from datetime import datetime

def create_feedback(db: Session, feedback_data: dict):
    """Create new feedback"""
    # Add created_at if not provided
    if 'created_at' not in feedback_data or not feedback_data['created_at']:
        feedback_data['created_at'] = datetime.now()
    
    feedback = Feedback(**feedback_data)
    db.add(feedback)
    db.commit()
    db.refresh(feedback)
    return feedback

def get_all_feedbacks(db: Session, skip: int = 0, limit: int = 100):
    """Get all feedbacks (for admin)"""
    return db.query(Feedback).order_by(
        Feedback.created_at.desc()
    ).offset(skip).limit(limit).all()

def get_feedback_by_id(db: Session, feedback_id: int):
    """Get feedback by id"""
    return db.query(Feedback).filter(Feedback.id == feedback_id).first()

def get_unread_feedbacks(db: Session):
    """Get all unread feedbacks"""
    return db.query(Feedback).filter(
        Feedback.is_read == False
    ).order_by(Feedback.created_at.desc()).all()

def mark_as_read(db: Session, feedback_id: int):
    """Mark feedback as read"""
    feedback = db.query(Feedback).filter(Feedback.id == feedback_id).first()
    if feedback:
        feedback.is_read = True
        db.commit()
        db.refresh(feedback)
    return feedback

def delete_feedback(db: Session, feedback_id: int):
    """Delete feedback"""
    feedback = db.query(Feedback).filter(Feedback.id == feedback_id).first()
    if feedback:
        db.delete(feedback)
        db.commit()
    return feedback

