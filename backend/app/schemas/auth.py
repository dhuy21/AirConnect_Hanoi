from pydantic import BaseModel, EmailStr
from datetime import date
from typing import Optional
from app.models.enums import Sex, AdminType

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

class AdminLogin(BaseModel):
    username: str
    password: str

class SchoolLogin(BaseModel):
    email: EmailStr
    password: str

class TokenResponse(BaseModel):
    access_token: str
    student_id: Optional[int] = None
    admin_id: Optional[int] = None
    school_id: Optional[int] = None
    email: Optional[str] = None
    username: Optional[str] = None
    name: Optional[str] = None
    student_school_id: Optional[int] = None

