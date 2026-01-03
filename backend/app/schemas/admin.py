from pydantic import BaseModel, EmailStr
from datetime import datetime
from app.models.enums import AdminType

class AdminBase(BaseModel):
    type: AdminType
    username: str
    phone: str
    email: EmailStr

class AdminCreate(AdminBase):
    password: str

class AdminResponse(AdminBase):
    id: int
    created_at: datetime
    
    class Config:
        from_attributes = True

