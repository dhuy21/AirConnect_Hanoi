from sqlalchemy import Column, Integer, String, Text, Float, DateTime
from app.db import Base
from sqlalchemy.orm import relationship
from app.models.enums import SolutionType, SolutionStatus
from sqlalchemy.types import Enum

class Solution(Base):
    __tablename__ = "solutions"
    
    id = Column(Integer, primary_key=True, index=True)
    type = Column(Enum(SolutionType), nullable=False)
    content = Column(Text, nullable=False)
    note = Column(Text, nullable=True)
    created_at = Column(DateTime, nullable=False)
    status = Column(Enum(SolutionStatus), nullable=False)

    #Association apply (N:N) - Pas de cascade: Apply est table de jointure
    applies = relationship('Apply', back_populates='solution')

    def __repr__(self):
        return f"<Solution: {self.type} {self.content} >"