from pydantic import BaseModel
from datetime import datetime
from app.models.enums import PostType

class PostBase(BaseModel):
    title: str
    type: PostType
    content: str

class PostCreate(PostBase):
    school_id: int
    published_at: datetime

class PostResponse(PostBase):
    id: int
    school_id: int
    published_at: datetime
    
    class Config:
        from_attributes = True

