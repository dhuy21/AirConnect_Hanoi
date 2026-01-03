from pydantic import BaseModel
from datetime import datetime
from app.models.enums import Decision

class ReviewBase(BaseModel):
    decision: Decision
    note: str | None = None

class ReviewCreate(ReviewBase):
    submission_id: int
    admin_id: int
    date: datetime

class ReviewResponse(ReviewBase):
    submission_id: int
    admin_id: int
    date: datetime
    
    class Config:
        from_attributes = True

