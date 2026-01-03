from pydantic import BaseModel
from datetime import datetime
from app.models.enums import SolutionType, SolutionStatus

class SolutionBase(BaseModel):
    type: SolutionType
    content: str
    note: str | None = None
    status: SolutionStatus

class SolutionCreate(SolutionBase):
    created_at: datetime

class SolutionResponse(SolutionBase):
    id: int
    created_at: datetime
    
    class Config:
        from_attributes = True

