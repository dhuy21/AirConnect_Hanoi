from sqlalchemy import Column, Integer, String, Text, Float, DateTime, ForeignKey
from sqlalchemy.types import Enum
from app.models.enums import RateStar
from sqlalchemy.orm import relationship
from datetime import datetime
from app.db import Base

class View(Base):
    __tablename__ = "view"
    
    rate = Column(Enum(RateStar), nullable=False)
    rated_at = Column(DateTime, nullable=False, default=datetime.now)

    #Association view (N:N)
    post_id = Column(Integer, ForeignKey('posts.id'), primary_key=True)
    student_id = Column(Integer, ForeignKey('students.id'), primary_key=True)
    student = relationship('Student', back_populates='views')
    post = relationship('Post', back_populates='views')


    def __repr__(self):
        return f"<View: {self.rate} >"