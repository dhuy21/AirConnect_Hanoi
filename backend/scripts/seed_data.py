"""
Script to seed all data into the database
Run: python seed_data.py
"""
import sys
import os
from pathlib import Path

# Add parent directory to path to import app modules
sys.path.insert(0, str(Path(__file__).parent.parent))

from sqlalchemy.orm import Session
from geoalchemy2.elements import WKTElement
from datetime import datetime
import json

from app.db.session import SessionLocal
from app.models.admin import Admin
from app.models.school import School
from app.models.student import Student
from app.models.air_quality import AirQuality
import bcrypt


def load_json(filepath):
    """Load data from JSON file"""
    try:
        # Path relative to backend directory
        script_dir = Path(__file__).parent
        full_path = script_dir / filepath
        with open(full_path, 'r', encoding='utf-8') as f:
            return json.load(f)
    except FileNotFoundError:
        print(f"Warning: {filepath} not found!")
        return []


def seed_admins(db: Session):
    """Seed admin data"""
    print("\nSeeding admins...")
    data = load_json('admins_data.json')
    if not data:
        return 0
    
    count = 0
    for admin_data in data:
        # Hash password before storing
        hashed_password = get_password_hash(admin_data['password'])
        
        # Skip id (auto-generated)
        admin = Admin(
            type=admin_data['type'],
            username=admin_data['username'],
            password=hashed_password,
            phone=admin_data['phone'],
            email=admin_data['email'],
            created_at=datetime.fromisoformat(admin_data['created_at'].replace('Z', '+00:00'))
        )
        db.add(admin)
        count += 1
    
    db.commit()
    print(f"Added {count} admins")
    return count


def get_password_hash(password: str) -> str:
    """Hash password using bcrypt"""
    password_bytes = password.encode('utf-8')
    if len(password_bytes) > 72:
        password_bytes = password_bytes[:72]
        password = password_bytes.decode('utf-8', errors='ignore')
    hashed = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    return hashed.decode('utf-8')


def seed_schools(db: Session):
    """Seed school data"""
    print("\nSeeding schools...")
    data = load_json('schools_data.json')
    if not data:
        return 0
    
    count = 0
    for school_data in data:
        # Create PostGIS POINT from latitude/longitude
        point = WKTElement(
            f'POINT({school_data["longitude"]} {school_data["latitude"]})',
            srid=4326
        )
        
        # Hash password before storing
        hashed_password = get_password_hash(school_data['password'])
        
        school = School(
            type=school_data['type'],
            name=school_data['name'],
            address=school_data['address'],
            district=school_data.get('district'),
            location=point,
            password=hashed_password,
            situation=school_data.get('situation'),
            email=school_data.get('email'),
            phone=school_data.get('phone'),
            score_1=school_data['score_1'],
            score_2=school_data['score_2'],
            score_3=school_data['score_3'],
            score_4=school_data['score_4'],
            score_5=school_data['score_5'],
            created_at=datetime.fromisoformat(school_data['created_at'].replace('Z', '+00:00'))
        )
        db.add(school)
        count += 1
    
    db.commit()
    print(f"Added {count} schools")
    return count


def seed_students(db: Session):
    """Seed student data"""
    print("\nSeeding students...")
    data = load_json('students_data.json')
    if not data:
        return 0
    
    count = 0
    for student_data in data:
        # Hash password before storing
        hashed_password = get_password_hash(student_data['password'])
        
        student = Student(
            first_name=student_data['first_name'],
            last_name=student_data['last_name'],
            sex=student_data['sex'],
            birth_date=datetime.fromisoformat(student_data['birth_date']).date(),
            email=student_data['email'],
            phone=student_data['phone'],
            health_status=student_data['health_status'],
            password=hashed_password,
            school_id=student_data['school_id'],
            created_at=datetime.fromisoformat(student_data['created_at'].replace('Z', '+00:00'))
        )
        db.add(student)
        count += 1
    
    db.commit()
    print(f"Added {count} students")
    return count


def seed_air_qualities(db: Session):
    """Seed air quality data"""
    print("\nSeeding air qualities...")
    data = load_json('air_qualities_data.json')
    if not data:
        return 0
    
    count = 0
    for aq_data in data:
        air_quality = AirQuality(
            school_id=aq_data['school_id'],
            aqi=aq_data['aqi'],
            pm25=aq_data.get('pm25'),
            pm10=aq_data.get('pm10'),
            co2=aq_data.get('co2'),
            temp=aq_data.get('temp'),
            humidity=aq_data.get('humidity'),
            wind_speed=aq_data.get('wind_speed'),
            measured_at=datetime.fromisoformat(aq_data['measured_at'].replace('Z', '+00:00'))
        )
        db.add(air_quality)
        count += 1
    
    db.commit()
    print(f"Added {count} air quality measurements")
    return count


def seed_all():
    """Seed all data in correct order"""
    db = SessionLocal()
    try:
        print("Starting database seeding...")
        
        # Seed in order: admins -> schools -> students -> air_qualities
        admin_count = seed_admins(db)
        school_count = seed_schools(db)
        student_count = seed_students(db)
        air_quality_count = seed_air_qualities(db)
        
        print("\n" + "="*50)
        print("Seeding Summary:")
        print(f"  - Admins: {admin_count}")
        print(f"  - Schools: {school_count}")
        print(f"  - Students: {student_count}")
        print(f"  - Air Quality: {air_quality_count}")
        print("="*50)
        print("\nSeeding complete!")
        
    except Exception as e:
        print(f"\nError: {e}")
        import traceback
        traceback.print_exc()
        db.rollback()
    finally:
        db.close()


if __name__ == "__main__":
    seed_all()

