from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import List
from app.db import get_db
from app.schemas.air_quality import AirQualityResponse, AirQualityCreate
from app.services import air_quality_service

router = APIRouter()

@router.get("/", response_model=List[AirQualityResponse])
def get_all_air_quality(
    limit: int = Query(100, description="Limit results"),
    db: Session = Depends(get_db)
):
    """Get recent air quality measurements"""
    return air_quality_service.get_all_air_quality(db, limit)

@router.get("/school/{school_id}", response_model=AirQualityResponse)
def get_air_quality_by_school(
    school_id: int,
    db: Session = Depends(get_db)
):
    """Get latest air quality for a school"""
    air_quality = air_quality_service.get_air_quality_by_school(db, school_id)
    if not air_quality:
        from fastapi import HTTPException
        raise HTTPException(status_code=404, detail="Air quality data not found")
    return air_quality

@router.post("/", response_model=AirQualityResponse)
def create_air_quality(
    air_quality: AirQualityCreate,
    db: Session = Depends(get_db)
):
    """Create new air quality measurement"""
    return air_quality_service.create_air_quality(db, air_quality.model_dump())

