from pydantic import BaseModel
from datetime import datetime

class ApplyBase(BaseModel):
    pass

class ApplyCreate(BaseModel):
    solution_id: int
    air_quality_id: int
    applied_at: datetime | None = None

class ApplyResponse(BaseModel):
    solution_id: int
    air_quality_id: int
    applied_at: datetime
    
    class Config:
        from_attributes = True

