from pydantic import BaseModel
from datetime import datetime
from app.models.enums import HelpType, HelpStatus

class HelpBase(BaseModel):
    type: HelpType
    content: str
    status: HelpStatus

class HelpCreate(HelpBase):
    from_school_id: int
    to_school_id: int
    created_at: datetime

class HelpResponse(HelpBase):
    from_school_id: int
    to_school_id: int
    created_at: datetime
    
    class Config:
        from_attributes = True

