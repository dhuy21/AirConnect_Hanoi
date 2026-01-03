from sqlalchemy.orm import Session
from app.models.air_quality import AirQuality

def get_air_quality_by_school(db: Session, school_id: int):
    """Get latest air quality for a school"""
    return db.query(AirQuality).filter(
        AirQuality.school_id == school_id
    ).order_by(AirQuality.measured_at.desc()).first()

def get_all_air_quality(db: Session, limit: int = 100):
    """Get recent air quality measurements"""
    return db.query(AirQuality).order_by(
        AirQuality.measured_at.desc()
    ).limit(limit).all()

def create_air_quality(db: Session, air_quality_data: dict):
    """Create new air quality measurement"""
    air_quality = AirQuality(**air_quality_data)
    db.add(air_quality)
    db.commit()
    db.refresh(air_quality)
    return air_quality

