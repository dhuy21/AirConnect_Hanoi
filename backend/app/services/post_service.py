from sqlalchemy.orm import Session
from app.models.post import Post

def get_posts_by_school(db: Session, school_id: int):
    """Get all posts by a school"""
    return db.query(Post).filter(
        Post.school_id == school_id
    ).order_by(Post.published_at.desc()).all()

def get_all_posts(db: Session, limit: int = 50):
    """Get recent posts"""
    return db.query(Post).order_by(
        Post.published_at.desc()
    ).limit(limit).all()

def create_post(db: Session, post_data: dict):
    """Create new post"""
    post = Post(**post_data)
    db.add(post)
    db.commit()
    db.refresh(post)
    return post

