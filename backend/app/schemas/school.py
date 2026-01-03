from pydantic import BaseModel, EmailStr
from datetime import datetime
from app.models.enums import SchoolType

class SchoolBase(BaseModel):
    type: SchoolType
    name: str
    address: str
    district: str | None = None
    latitude: float  # For frontend usage
    longitude: float
    situation: str | None = None
    email: EmailStr | None = None
    phone: str | None = None
    score_1: float
    score_2: float
    score_3: float
    score_4: float
    score_5: float

class SchoolCreate(SchoolBase):
    password: str

class SchoolResponse(SchoolBase):
    id: int
    created_at: datetime
    
    class Config:
        from_attributes = True

