from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List

import models
import schemas
from database import engine, get_db

# Tạo tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="AirConnect Hanoi API")

# CORS - cho phép React frontend gọi API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Vite default port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "AirConnect Hanoi API"}

@app.get("/api/schools", response_model=List[schemas.School])
def get_schools(db: Session = Depends(get_db)):
    """Lấy tất cả trường học"""
    schools = db.query(models.School).all()
    return schools

