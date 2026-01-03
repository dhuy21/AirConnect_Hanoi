from pydantic import BaseModel
from app.models.enums import SubmissionType

class SubmissionBase(BaseModel):
    type: SubmissionType
    content: str

class SubmissionCreate(SubmissionBase):
    from_school_id: int

class SubmissionResponse(SubmissionBase):
    id: int
    from_school_id: int
    
    class Config:
        from_attributes = True

