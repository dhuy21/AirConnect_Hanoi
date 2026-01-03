from sqlalchemy import Column, Integer, String
from sqlalchemy.types import Enum, Date, DateTime
from app.db import Base
from sqlalchemy.orm import relationship
from app.models.enums import Sex
from sqlalchemy import ForeignKey

class Student(Base):
    __tablename__ = "students"
    
    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String(255), nullable=False)
    last_name = Column(String(255), nullable=False)
    sex = Column(Enum(Sex), nullable=False)
    birth_date = Column(Date, nullable=False)
    email = Column(String(255), nullable=False)
    phone = Column(String(20), nullable=False)
    health_status = Column(String(255), nullable=False)
    password = Column(String(255), nullable=False)
    created_at = Column(DateTime, nullable=False)

    #Association study (1:N)
    school_id = Column(Integer, ForeignKey('schools.id'), nullable=False)
    school = relationship('School', back_populates='students')

    #Association view (N:N) - Pas de cascade: View est table de jointure
    views = relationship('View', back_populates='student')

    def __repr__(self):
        return f"<Student {self.first_name} {self.last_name}>"

