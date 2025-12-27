# AirConnect Hanoi - Backend

Backend API cho dự án AirConnect Hanoi sử dụng FastAPI + PostgreSQL.

## Cài đặt

### 1. Cài đặt PostgreSQL

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install postgresql postgresql-contrib

# Khởi động PostgreSQL
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

### 2. Tạo Database

```bash
# Đăng nhập vào PostgreSQL
sudo -u postgres psql

# Trong PostgreSQL console:
CREATE DATABASE airconnect_hanoi;
CREATE USER airconnect_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE airconnect_hanoi TO airconnect_user;
\q
```

### 3. Cấu hình Environment

```bash
# Copy file .env.example
cp .env.example .env

# Sửa file .env với thông tin database của bạn
# DATABASE_URL=postgresql://airconnect_user:your_password@localhost:5432/airconnect_hanoi
```

### 4. Cài đặt Python Dependencies

```bash
# Tạo virtual environment
python3 -m venv venv

# Kích hoạt virtual environment
source venv/bin/activate  # Linux/Mac
# hoặc
venv\Scripts\activate  # Windows

# Cài đặt packages
pip install -r requirements.txt
```

### 5. Seed Database với dữ liệu trường học

```bash
python seed_schools.py
```

### 6. Chạy Backend Server

```bash
uvicorn main:app --reload --port 8000
```

Server sẽ chạy tại: http://localhost:8000

## API Endpoints

- `GET /` - Health check
- `GET /api/schools` - Lấy danh sách tất cả trường học
- `GET /api/schools/{id}` - Lấy thông tin một trường học
- `POST /api/schools` - Thêm trường học mới

## API Documentation

Sau khi chạy server, truy cập:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Cấu trúc thư mục

```
backend/
├── main.py           # Entry point, FastAPI app
├── database.py       # Database connection
├── models.py         # SQLAlchemy models
├── schemas.py        # Pydantic schemas
├── seed_schools.py   # Script để seed dữ liệu
├── requirements.txt  # Python dependencies
└── .env             # Environment variables (không commit)
```

## Testing

```bash
# Test API bằng curl
curl http://localhost:8000/api/schools

# Hoặc mở browser tại http://localhost:8000/docs để test interactive
```

