from pydantic import BaseModel

class SchoolBase(BaseModel):
    name: str
    address: str
    district: str
    latitude: float
    longitude: float
    school_type: str | None = None
    phone: str | None = None

class SchoolCreate(SchoolBase):
    pass

class School(SchoolBase):
    id: int
    
    class Config:
        from_attributes = True

