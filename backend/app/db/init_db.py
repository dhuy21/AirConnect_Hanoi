"""Initialize database with PostGIS extension"""
import sys
from pathlib import Path

# Add backend directory to path
backend_dir = Path(__file__).parent.parent.parent
sys.path.insert(0, str(backend_dir))

from sqlalchemy import text
from app.db import engine, Base
from app.models import school, student, admin, air_quality, post, submission, review, solution, help, view, apply

def init_db():
    """Create PostGIS extension and all tables"""
    with engine.connect() as conn:
        # Enable PostGIS extension
        conn.execute(text("CREATE EXTENSION IF NOT EXISTS postgis"))
        conn.commit()
        print("PostGIS extension enabled")
    
    # Create all tables
    Base.metadata.drop_all(bind=engine)  # Drop old tables
    Base.metadata.create_all(bind=engine)  # Create new ones
    print("Tables created with PostGIS!")

if __name__ == "__main__":
    init_db()

