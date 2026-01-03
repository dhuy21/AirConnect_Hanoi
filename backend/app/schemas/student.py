from pydantic import BaseModel, EmailStr
from datetime import date, datetime
from app.models.enums import Sex

class StudentBase(BaseModel):
    first_name: str
    last_name: str
    sex: Sex
    birth_date: date
    email: EmailStr
    phone: str
    health_status: str

class StudentCreate(StudentBase):
    password: str
    school_id: int

class StudentResponse(StudentBase):
    id: int
    school_id: int
    created_at: datetime
    
    class Config:
        from_attributes = True

