from sqlalchemy import Column, Integer, String, Text, Float, ForeignKey
from sqlalchemy.types import DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from app.db import Base

class Apply(Base):
    __tablename__ = "apply"
    
    solution_id = Column(Integer, ForeignKey('solutions.id'), primary_key=True)
    air_quality_id = Column(Integer, ForeignKey('air_quality.id'), primary_key=True)
    applied_at = Column(DateTime, nullable=False, default=datetime.now)

    #Association apply (N:N)
    solution = relationship('Solution', back_populates='applies')
    air_quality = relationship('AirQuality', back_populates='applies')
    def __repr__(self):
        return f"<Apply: {self.solution_id} {self.air_quality_id} {self.applied_at}>"