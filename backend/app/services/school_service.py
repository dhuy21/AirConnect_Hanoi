from sqlalchemy.orm import Session
from sqlalchemy import func
from app.models.school import School

def get_all_schools(db: Session):
    """Get all schools with lat/lng from PostGIS"""
    schools = db.query(School).all()
    
    # Convert to dict with lat/lng for frontend
    result = []
    for school in schools:
        lat = db.query(func.ST_Y(School.location)).filter(School.id == school.id).scalar()
        lng = db.query(func.ST_X(School.location)).filter(School.id == school.id).scalar()
        result.append({
            "id": school.id,
            "name": school.name,
            "address": school.address,
            "district": school.district,
            "type": school.type,
            "school_type": str(school.type.value) if hasattr(school.type, 'value') else str(school.type),  # Alias for frontend
            "phone": school.phone,
            "situation": school.situation,
            "email": school.email,
            "score_1": school.score_1,
            "score_2": school.score_2,
            "score_3": school.score_3,
            "score_4": school.score_4,
            "score_5": school.score_5,
            "latitude": lat,
            "longitude": lng,
            "created_at": school.created_at
        })
    return result

def get_nearby_schools(db: Session, latitude: float, longitude: float, radius: float):
    """Find schools within radius using PostGIS"""
    point = func.ST_SetSRID(func.ST_MakePoint(longitude, latitude), 4326)
    
    schools = db.query(School).filter(
        func.ST_DWithin(
            func.ST_Transform(School.location, 3857),
            func.ST_Transform(point, 3857),
            radius
        )
    ).all()
    
    # Convert to dict with lat/lng for frontend
    result = []
    for school in schools:
        lat = db.query(func.ST_Y(School.location)).filter(School.id == school.id).scalar()
        lng = db.query(func.ST_X(School.location)).filter(School.id == school.id).scalar()
        result.append({
            "id": school.id,
            "name": school.name,
            "address": school.address,
            "district": school.district,
            "type": school.type,
            "school_type": str(school.type.value) if hasattr(school.type, 'value') else str(school.type),  # Alias for frontend
            "phone": school.phone,
            "situation": school.situation,
            "email": school.email,
            "score_1": school.score_1,
            "score_2": school.score_2,
            "score_3": school.score_3,
            "score_4": school.score_4,
            "score_5": school.score_5,
            "latitude": lat,
            "longitude": lng,
            "created_at": school.created_at
        })
    return result

