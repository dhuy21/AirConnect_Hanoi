from sqlalchemy import Column, Integer, String, Text, Float, DateTime, ForeignKey
from sqlalchemy.types import Enum
from sqlalchemy.orm import relationship
from app.models.enums import Decision
from app.db import Base

class Review(Base):
    __tablename__ = "review"
    
    decision = Column(Enum(Decision), nullable=False)
    date = Column(DateTime, nullable=False)
    note = Column(Text, nullable=True)

    #Association review (N:N)
    submission_id = Column(Integer, ForeignKey('submissions.id'), primary_key=True)
    admin_id = Column(Integer, ForeignKey('admins.id'), primary_key=True)
    admin = relationship('Admin', back_populates='reviews')
    submission = relationship('Submission', back_populates='reviews')


    def __repr__(self):
        return f"<Review: {self.decision} {self.date} {self.note}>"