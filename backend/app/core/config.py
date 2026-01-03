import os
from pathlib import Path
from dotenv import load_dotenv

# Get the project root directory (where .env is located)
# config.py is in: backend/app/core/config.py
# So we need to go up 3 levels to reach project root
project_root = Path(__file__).parent.parent.parent.parent
env_file = project_root / ".env"

# Load .env file from project root
load_dotenv(dotenv_path=env_file)

DATABASE_URL = os.getenv("DATABASE_URL")
BACKEND_URL = os.getenv("BACKEND_URL")
FRONTEND_URL = os.getenv("FRONTEND_URL")

if not DATABASE_URL:
    raise ValueError("DATABASE_URL environment variable is not set")

