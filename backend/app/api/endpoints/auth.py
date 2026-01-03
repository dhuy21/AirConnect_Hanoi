from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.schemas.auth import (
    StudentLogin, StudentRegister, 
    AdminLogin,
    SchoolLogin,
    TokenResponse
)
from app.models.student import Student
from app.models.admin import Admin
from app.models.school import School
import bcrypt
from datetime import datetime

router = APIRouter()

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """
    Verify a plain password against a bcrypt hashed password.
    All passwords in the database should be hashed.
    """
    if not plain_password or not hashed_password:
        return False
    
    # All passwords should be hashed with bcrypt
    if not (hashed_password.startswith("$2b$") or hashed_password.startswith("$2a$") or hashed_password.startswith("$2y$")):
        return False
    
    # bcrypt has a 72 byte limit, truncate if necessary
    password_bytes = plain_password.encode('utf-8')
    if len(password_bytes) > 72:
        plain_password = password_bytes[:72].decode('utf-8', errors='ignore')
    
    try:
        return bcrypt.checkpw(plain_password.encode('utf-8'), hashed_password.encode('utf-8'))
    except (ValueError, TypeError):
        return False
    except Exception:
        return False

def get_password_hash(password: str) -> str:
    # bcrypt has a 72 byte limit, truncate if necessary
    password_bytes = password.encode('utf-8')
    if len(password_bytes) > 72:
        password_bytes = password_bytes[:72]
        password = password_bytes.decode('utf-8', errors='ignore')
    hashed = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    return hashed.decode('utf-8')

@router.post("/login/student", response_model=TokenResponse)
def login_student(credentials: StudentLogin, db: Session = Depends(get_db)):
    student = db.query(Student).filter(Student.email == credentials.email).first()
    
    if not student or not verify_password(credentials.password, student.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )
    
    return TokenResponse(
        access_token="student_token",
        student_id=student.id,
        email=student.email,
        name=f"{student.first_name} {student.last_name}",
        student_school_id=student.school_id
    )

@router.post("/login/admin", response_model=TokenResponse)
def login_admin(credentials: AdminLogin, db: Session = Depends(get_db)):
    admin = db.query(Admin).filter(Admin.username == credentials.username).first()
    
    if not admin or not verify_password(credentials.password, admin.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid username or password"
        )
    
    return TokenResponse(
        access_token="admin_token",
        admin_id=admin.id,
        username=admin.username,
        email=admin.email,
        name=admin.username
    )

@router.post("/login/school", response_model=TokenResponse)
def login_school(credentials: SchoolLogin, db: Session = Depends(get_db)):
    school = db.query(School).filter(School.email == credentials.email).first()
    
    if not school or not verify_password(credentials.password, school.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )
    
    return TokenResponse(
        access_token="school_token",
        school_id=school.id,
        email=school.email,
        name=school.name
    )

@router.post("/register/student", response_model=TokenResponse)
def register_student(student_data: StudentRegister, db: Session = Depends(get_db)):
    try:
        # Validate school_id
        if not student_data.school_id or student_data.school_id <= 0:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid school_id"
            )
        
        # Check if email already exists
        existing = db.query(Student).filter(Student.email == student_data.email).first()
        if existing:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already registered"
            )
        
        # Hash password
        hashed_password = get_password_hash(student_data.password)
        
        # Create student
        student = Student(
            first_name=student_data.first_name,
            last_name=student_data.last_name,
            email=student_data.email,
            password=hashed_password,
            phone=student_data.phone,
            birth_date=student_data.birth_date,
            sex=student_data.sex,
            health_status=student_data.health_status,
            school_id=student_data.school_id,
            created_at=datetime.now()
        )
        
        db.add(student)
        db.commit()
        db.refresh(student)
        
        return TokenResponse(
            access_token="student_token",
            student_id=student.id,
            email=student.email,
            name=f"{student.first_name} {student.last_name}",
            student_school_id=student.school_id
        )
    except HTTPException:
        raise
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Registration failed: {str(e)}"
        )
