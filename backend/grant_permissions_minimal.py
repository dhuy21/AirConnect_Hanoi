"""Grant MINIMAL necessary permissions to airconnect_user on Railway
"""
import os
from pathlib import Path
from sqlalchemy import create_engine, text
from dotenv import load_dotenv

# Get the project root directory
project_root = Path(__file__).parent.parent
env_file = project_root / ".env"

# Load environment variables
load_dotenv(dotenv_path=env_file)

# Use postgres superuser URL from environment variable
POSTGRES_URL = os.getenv("POSTGRES_SUPERUSER_URL")

if not POSTGRES_URL:
    raise ValueError(
        "POSTGRES_SUPERUSER_URL is not set in .env file.\n"
        "Please add it like:\n"
        "POSTGRES_SUPERUSER_URL=postgresql://postgres:YOUR_PASSWORD@host:port/dbname?sslmode=require"
    )

engine = create_engine(POSTGRES_URL)

with engine.connect() as conn:
    print("Connected as postgres superuser...")
    print("Granting MINIMAL privileges (following Principle of Least Privilege)...\n")
    
    # Grant USAGE on schema (required to access objects in schema)
    conn.execute(text("GRANT USAGE ON SCHEMA public TO airconnect_user"))
    conn.commit()
    print("✓ Granted USAGE on schema public")
    
    # Grant ONLY necessary privileges on tables: SELECT, INSERT, UPDATE, DELETE
    # Explicitly EXCLUDE: DROP, TRUNCATE, ALTER, REFERENCES
    conn.execute(text("""
        GRANT SELECT, INSERT, UPDATE, DELETE 
        ON ALL TABLES IN SCHEMA public 
        TO airconnect_user
    """))
    conn.commit()
    print("✓ Granted SELECT, INSERT, UPDATE, DELETE on all tables")
    print("  ℹ️  Excluded: DROP, TRUNCATE, ALTER (safer for production)")
    
    # Grant USAGE and SELECT on sequences (needed for auto-increment IDs)
    conn.execute(text("""
        GRANT USAGE, SELECT 
        ON ALL SEQUENCES IN SCHEMA public 
        TO airconnect_user
    """))
    conn.commit()
    print("✓ Granted USAGE, SELECT on all sequences")
    
    # Set default privileges for FUTURE tables
    conn.execute(text("""
        ALTER DEFAULT PRIVILEGES IN SCHEMA public 
        GRANT SELECT, INSERT, UPDATE, DELETE 
        ON TABLES TO airconnect_user
    """))
    conn.commit()
    print("✓ Set default privileges for future tables")
    
    # Set default privileges for FUTURE sequences
    conn.execute(text("""
        ALTER DEFAULT PRIVILEGES IN SCHEMA public 
        GRANT USAGE, SELECT 
        ON SEQUENCES TO airconnect_user
    """))
    conn.commit()
    print("✓ Set default privileges for future sequences")
    
    print("\n" + "="*60)
    print("✅ Minimal permissions granted successfully!")
    print("="*60)
    print("\n📋 Permissions Summary:")
    print("  ✅ SELECT   - Read data")
    print("  ✅ INSERT   - Create new records")
    print("  ✅ UPDATE   - Modify existing records")
    print("  ✅ DELETE   - Remove records")
    print("  ✅ USAGE    - Use sequences for auto-increment")
    print("\n  ❌ DROP     - NOT granted (cannot delete tables)")
    print("  ❌ TRUNCATE - NOT granted (cannot delete all rows)")
    print("  ❌ ALTER    - NOT granted (cannot modify table structure)")
    print("  ❌ CREATE   - NOT granted (cannot create new tables)")
    print("\n🔒 This follows the Principle of Least Privilege for better security!")

