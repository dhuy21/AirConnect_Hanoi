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
from app.models.post import Post
from app.models.submission import Submission
from app.models.review import Review
from app.models.solution import Solution
from app.models.help import Help
from app.models.view import View
from app.models.apply import Apply
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


def seed_posts(db: Session):
    """Seed post data"""
    print("\nSeeding posts...")
    data = load_json('posts_data.json')
    if not data:
        return 0
    
    count = 0
    for post_data in data:
        post = Post(
            title=post_data['title'],
            type=post_data['type'],
            description=post_data['description'],
            image=post_data['image'],
            content=post_data['content'],
            school_id=post_data['school_id'],
            published_at=datetime.fromisoformat(post_data['published_at'].replace('Z', '+00:00'))
        )
        db.add(post)
        count += 1
    
    db.commit()
    print(f"Added {count} posts")
    return count


def seed_submissions(db: Session):
    """Seed submission data"""
    print("\nSeeding submissions...")
    data = load_json('submissions_data.json')
    if not data:
        return 0
    
    count = 0
    for submission_data in data:
        submission = Submission(
            type=submission_data['type'],
            content=submission_data['content'],
            from_school_id=submission_data['from_school_id']
        )
        db.add(submission)
        count += 1
    
    db.commit()
    print(f"Added {count} submissions")
    return count


def seed_reviews(db: Session):
    """Seed review data"""
    print("\nSeeding reviews...")
    data = load_json('reviews_data.json')
    if not data:
        return 0
    
    count = 0
    for review_data in data:
        review = Review(
            submission_id=review_data['submission_id'],
            admin_id=review_data['admin_id'],
            decision=review_data['decision'],
            date=datetime.fromisoformat(review_data['date'].replace('Z', '+00:00')),
            note=review_data.get('note')
        )
        db.add(review)
        count += 1
    
    db.commit()
    print(f"Added {count} reviews")
    return count


def seed_solutions(db: Session):
    """Seed solution data"""
    print("\nSeeding solutions...")
    data = load_json('solutions_data.json')
    if not data:
        return 0
    
    count = 0
    for solution_data in data:
        solution = Solution(
            type=solution_data['type'],
            content=solution_data['content'],
            note=solution_data.get('note'),
            status=solution_data['status'],
            created_at=datetime.fromisoformat(solution_data['created_at'].replace('Z', '+00:00'))
        )
        db.add(solution)
        count += 1
    
    db.commit()
    print(f"Added {count} solutions")
    return count


def seed_help(db: Session):
    """Seed help data"""
    print("\nSeeding help...")
    data = load_json('help_data.json')
    if not data:
        return 0
    
    count = 0
    for help_data in data:
        help_record = Help(
            from_school_id=help_data['from_school_id'],
            to_school_id=help_data['to_school_id'],
            type=help_data['type'],
            content=help_data['content'],
            status=help_data['status'],
            created_at=datetime.fromisoformat(help_data['created_at'].replace('Z', '+00:00'))
        )
        db.add(help_record)
        count += 1
    
    db.commit()
    print(f"Added {count} help records")
    return count


def seed_views(db: Session):
    """Seed view data"""
    print("\nSeeding views...")
    data = load_json('views_data.json')
    if not data:
        return 0
    
    count = 0
    for view_data in data:
        view = View(
            post_id=view_data['post_id'],
            student_id=view_data['student_id'],
            rate=view_data['rate'],
            rated_at=datetime.fromisoformat(view_data['rated_at'].replace('Z', '+00:00'))
        )
        db.add(view)
        count += 1
    
    db.commit()
    print(f"Added {count} views")
    return count


def seed_apply(db: Session):
    """Seed apply data"""
    print("\nSeeding apply...")
    data = load_json('apply_data.json')
    if not data:
        return 0
    
    count = 0
    for apply_data in data:
        apply_record = Apply(
            solution_id=apply_data['solution_id'],
            air_quality_id=apply_data['air_quality_id'],
            applied_at=datetime.fromisoformat(apply_data['applied_at'].replace('Z', '+00:00'))
        )
        db.add(apply_record)
        count += 1
    
    db.commit()
    print(f"Added {count} apply records")
    return count


def seed_all():
    """Seed all data in correct order"""
    db = SessionLocal()
    try:
        print("Starting database seeding...")
        
        # Seed in order respecting foreign key dependencies
        admin_count = seed_admins(db)
        school_count = seed_schools(db)
        student_count = seed_students(db)
        air_quality_count = seed_air_qualities(db)
        
        # Seed models that depend on above
        post_count = seed_posts(db)
        submission_count = seed_submissions(db)
        solution_count = seed_solutions(db)
        
        # Seed junction tables (composite keys)
        review_count = seed_reviews(db)
        help_count = seed_help(db)
        view_count = seed_views(db)
        apply_count = seed_apply(db)
        
        print("\n" + "="*50)
        print("Seeding Summary:")
        print(f"  - Admins: {admin_count}")
        print(f"  - Schools: {school_count}")
        print(f"  - Students: {student_count}")
        print(f"  - Air Quality: {air_quality_count}")
        print(f"  - Posts: {post_count}")
        print(f"  - Submissions: {submission_count}")
        print(f"  - Solutions: {solution_count}")
        print(f"  - Reviews: {review_count}")
        print(f"  - Help: {help_count}")
        print(f"  - Views: {view_count}")
        print(f"  - Apply: {apply_count}")
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

