from sqlalchemy import Column, Integer, String, Text, Float, ForeignKey
from sqlalchemy.types import DateTime
from app.db import Base
from sqlalchemy.orm import relationship
from datetime import datetime


class AirQuality(Base):
    __tablename__ = "air_quality"
    
    id = Column(Integer, primary_key=True, index=True)
    aqi = Column(Float, nullable=False)
    pm25 = Column(Float, nullable=True)
    pm10 = Column(Float, nullable=True)
    co2 = Column(Float, nullable=True)
    temp = Column(Float, nullable=True)
    humidity = Column(Float, nullable=True)
    wind_speed = Column(Float, nullable=True)
    measured_at = Column(DateTime, nullable=False, default=datetime.now)

    #Association measured (1:N)
    school_id = Column(Integer, ForeignKey('schools.id'), nullable=False)
    school = relationship('School', back_populates='air_qualities')

    #Association apply (N:N) - Pas de cascade: Apply est table de jointure
    applies = relationship('Apply', back_populates='air_quality')

    def __repr__(self):
        return f"<AirQuality: {self.aqi}, {self.pm25}, {self.pm10} >"