from sqlalchemy import Column, Integer, String, Text, Float, DateTime, ForeignKey
from sqlalchemy.types import Enum
from sqlalchemy.orm import relationship
from app.models.enums import SubmissionType
from app.db import Base

class Submission(Base):
    __tablename__ = "submissions"
    
    id = Column(Integer, primary_key=True, index=True)
    type = Column(Enum(SubmissionType), nullable=False)
    content = Column(Text, nullable=False)

    #Association envoi (1:N)
    from_school_id = Column(Integer, ForeignKey('schools.id'), nullable=False)
    school = relationship('School', back_populates='submissions')

    #Association review (N:N) - Pas de cascade: Review est table de jointure
    reviews = relationship('Review', back_populates='submission')
    
    def __repr__(self):
        return f"<Submission: {self.type} {self.content} >"