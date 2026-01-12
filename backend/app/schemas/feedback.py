from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional

class FeedbackBase(BaseModel):
    full_name: str
    email: EmailStr
    subject: str
    message: str
    phone: Optional[str] = None

class FeedbackCreate(FeedbackBase):
    pass

class FeedbackResponse(FeedbackBase):
    id: int
    is_read: bool
    created_at: datetime
    
    class Config:
        from_attributes = True

