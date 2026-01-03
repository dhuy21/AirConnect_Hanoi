from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from app.db import get_db
from app.schemas.post import PostResponse, PostCreate
from app.models.enums import PostType
from app.services import post_service

router = APIRouter()

@router.get("/", response_model=List[PostResponse])
def get_all_posts(
    limit: int = Query(50, description="Limit results"),
    post_type: Optional[PostType] = Query(None, description="Filter by post type"),
    db: Session = Depends(get_db)
):
    """Get recent posts"""
    posts = post_service.get_all_posts(db, limit)
    if post_type:
        posts = [p for p in posts if p.type == post_type]
    return posts

@router.get("/school/{school_id}", response_model=List[PostResponse])
def get_posts_by_school(
    school_id: int,
    db: Session = Depends(get_db)
):
    """Get all posts by a school"""
    return post_service.get_posts_by_school(db, school_id)

@router.post("/", response_model=PostResponse)
def create_post(
    post: PostCreate,
    db: Session = Depends(get_db)
):
    """Create a new post"""
    from datetime import datetime
    post_data = post.model_dump()
    if 'published_at' not in post_data or not post_data['published_at']:
        post_data['published_at'] = datetime.now()
    return post_service.create_post(db, post_data)

