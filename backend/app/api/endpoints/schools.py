from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import List
from app.db import get_db
from app.schemas.school import SchoolResponse
from app.services import school_service

router = APIRouter()

@router.get("/", response_model=List[SchoolResponse])
def get_schools(db: Session = Depends(get_db)):
    """Get all schools"""
    return school_service.get_all_schools(db)

@router.get("/nearby", response_model=List[SchoolResponse])
def get_nearby_schools(
    latitude: float = Query(..., description="Latitude of search point"),
    longitude: float = Query(..., description="Longitude of search point"),
    radius: float = Query(2000, description="Search radius in meters"),
    db: Session = Depends(get_db)
):
    """Find schools within radius (using PostGIS)"""
    return school_service.get_nearby_schools(db, latitude, longitude, radius)

