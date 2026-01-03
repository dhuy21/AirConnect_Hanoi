from pydantic import BaseModel
from datetime import datetime
from app.models.enums import RateStar

class ViewBase(BaseModel):
    rate: RateStar

class ViewCreate(ViewBase):
    post_id: int
    student_id: int
    rated_at: datetime | None = None

class ViewResponse(ViewBase):
    post_id: int
    student_id: int
    rated_at: datetime
    
    class Config:
        from_attributes = True

