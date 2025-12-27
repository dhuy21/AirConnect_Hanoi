from sqlalchemy import Column, Integer, String, Float, Text
from database import Base

class School(Base):
    __tablename__ = "schools"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    address = Column(Text, nullable=False)
    district = Column(String(100), nullable=False)
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    school_type = Column(String(50))  # Tiểu học, THCS, THPT, etc.
    phone = Column(String(20), nullable=True)
    
    def __repr__(self):
        return f"<School {self.name}>"
