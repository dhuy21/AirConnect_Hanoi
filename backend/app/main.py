import sys
from pathlib import Path

# Add backend directory to path
backend_dir = Path(__file__).parent.parent
sys.path.insert(0, str(backend_dir))

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.endpoints import schools, submissions, air_quality, posts, reviews, stats, auth

app = FastAPI(title="AirConnect Hanoi API")

# CORS - allow React frontend to call API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "AirConnect Hanoi API with PostGIS"}

app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(schools.router, prefix="/api/schools", tags=["schools"])
app.include_router(submissions.router, prefix="/api/submissions", tags=["submissions"])
app.include_router(air_quality.router, prefix="/api/air-quality", tags=["air-quality"])
app.include_router(posts.router, prefix="/api/posts", tags=["posts"])
app.include_router(reviews.router, prefix="/api/reviews", tags=["reviews"])
app.include_router(stats.router, prefix="/api/stats", tags=["stats"])

