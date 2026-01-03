from pydantic import BaseModel
from datetime import datetime

class AirQualityBase(BaseModel):
    aqi: float
    pm25: float | None = None
    pm10: float | None = None
    co2: float | None = None
    temp: float | None = None
    humidity: float | None = None
    wind_speed: float | None = None

class AirQualityCreate(AirQualityBase):
    school_id: int

class AirQualityResponse(AirQualityBase):
    id: int
    school_id: int
    measured_at: datetime
    
    class Config:
        from_attributes = True

