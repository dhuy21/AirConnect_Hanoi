"""
Script to seed Hanoi schools data from OpenStreetMap
Run: python seed_schools.py
"""
from sqlalchemy.orm import Session
from sqlalchemy import text
from geoalchemy2.elements import WKTElement
from database import SessionLocal, engine
import models
import json


def load_schools_from_json():
    """Load schools data from JSON file"""
    try:
        with open('schools_data.json', 'r', encoding='utf-8') as f:
            return json.load(f)
    except FileNotFoundError:
        print("Error: schools_data.json not found!")
        print("Please run: python getschool.py first")
        return []

def seed_schools():
    db = SessionLocal()
    try:
        # Load schools from JSON
        schools_data = load_schools_from_json()
        
        if not schools_data:
            print("No schools data to seed")
            return
        
        print(f"Loading {len(schools_data)} schools...")
        
        # Add schools to database
        for school_data in schools_data:
            # Create PostGIS POINT from latitude/longitude
            point = WKTElement(
                f'POINT({school_data["longitude"]} {school_data["latitude"]})', 
                srid=4326
            )
            
            school = models.School(
                name=school_data["name"],
                address=school_data.get("address", "N/A"),
                district=school_data.get("district", "Unknown"),
                location=point,
                school_type=school_data.get("school_type", "School"),
                phone=school_data.get("phone")
            )
            db.add(school)
        
        db.commit()
        print(f"Added {len(schools_data)} schools to database!")
        
        # Display count by district
        from sqlalchemy import func
        districts = db.query(
            models.School.district, 
            func.count(models.School.id)
        ).group_by(models.School.district).all()
        
        print("\nSchools by district:")
        for district, count in districts:
            print(f"  - {district}: {count} schools")
            
    except Exception as e:
        print(f"Error: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    print("🚀 Starting database setup with PostGIS...")
    seed_schools()
    print("\nComplete!")
