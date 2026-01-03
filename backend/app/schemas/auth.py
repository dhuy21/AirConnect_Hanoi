from pydantic import BaseModel, EmailStr
from datetime import date
from app.models.enums import Sex

class StudentLogin(BaseModel):
    email: EmailStr
    password: str

class StudentRegister(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr
    password: str
    phone: str
    birth_date: date
    sex: Sex
    health_status: str
    school_id: int

class TokenResponse(BaseModel):
    access_token: str
    student_id: int
    email: str
    name: str

