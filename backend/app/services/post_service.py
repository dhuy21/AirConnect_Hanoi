from sqlalchemy.orm import Session
from app.models.post import Post

def get_posts_by_school(db: Session, school_id: int):
    """Get all posts by a school"""
    return db.query(Post).filter(
        Post.school_id == school_id
    ).order_by(Post.published_at.desc()).all()

def get_all_posts(db: Session):
    """Get recent posts"""
    return db.query(Post).order_by(
        Post.published_at.desc()
    ).all()

def get_post_by_id(db: Session, post_id: int):
    """Get a post by id"""
    return db.query(Post).filter(Post.id == post_id).first()

def create_post(db: Session, post_data: dict):
    """Create new post"""
    post = Post(**post_data)
    db.add(post)
    db.commit()
    db.refresh(post)
    return post

