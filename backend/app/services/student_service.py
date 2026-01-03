from sqlalchemy.orm import Session
from app.models.student import Student

def get_students_by_school(db: Session, school_id: int):
    """Get all students in a school"""
    return db.query(Student).filter(
        Student.school_id == school_id
    ).all()

def get_student_by_id(db: Session, student_id: int):
    """Get student by ID"""
    return db.query(Student).filter(Student.id == student_id).first()

def create_student(db: Session, student_data: dict):
    """Create new student"""
    student = Student(**student_data)
    db.add(student)
    db.commit()
    db.refresh(student)
    return student

def get_all_students(db: Session, limit: int = 100):
    """Get all students (for admin)"""
    return db.query(Student).limit(limit).all()

