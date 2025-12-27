"""
Script để seed dữ liệu các trường học ở Hà Nội
Chạy: python seed_schools.py
"""
from sqlalchemy.orm import Session
from database import SessionLocal, engine
import models

# Tạo tables nếu chưa có
models.Base.metadata.create_all(bind=engine)

# Dữ liệu mẫu các trường học thật ở Hà Nội
SCHOOLS_DATA = [
    # Quận Ba Đình
    {
        "name": "Trường THPT Chu Văn An",
        "address": "Số 8 Nguyễn Bỉnh Khiêm, Ngọc Khánh, Ba Đình",
        "district": "Ba Đình",
        "latitude": 21.0330,
        "longitude": 105.8115,
        "school_type": "THPT",
        "phone": "024 3845 3983"
    },
    {
        "name": "Trường THCS Nguyễn Tri Phương",
        "address": "Số 7 Nguyễn Tri Phương, Điện Biên, Ba Đình",
        "district": "Ba Đình",
        "latitude": 21.0265,
        "longitude": 105.8237,
        "school_type": "THCS"
    },
    {
        "name": "Trường Tiểu học Ngọc Hà",
        "address": "Số 50 Ông Ích Khiêm, Ngọc Hà, Ba Đình",
        "district": "Ba Đình",
        "latitude": 21.0380,
        "longitude": 105.8290,
        "school_type": "Tiểu học"
    },
    
    # Quận Hoàn Kiếm
    {
        "name": "Trường THPT Trần Phú",
        "address": "Số 1 Đinh Tiên Hoàng, Hàng Trống, Hoàn Kiếm",
        "district": "Hoàn Kiếm",
        "latitude": 21.0254,
        "longitude": 105.8507,
        "school_type": "THPT",
        "phone": "024 3824 3362"
    },
    {
        "name": "Trường THCS Lương Thế Vinh",
        "address": "Số 50 Hàng Bài, Tràng Tiền, Hoàn Kiếm",
        "district": "Hoàn Kiếm",
        "latitude": 21.0243,
        "longitude": 105.8538,
        "school_type": "THCS"
    },
    
    # Quận Đống Đa
    {
        "name": "Trường THPT Nguyễn Huệ",
        "address": "Số 42 Lê Duẩn, Khâm Thiên, Đống Đa",
        "district": "Đống Đa",
        "latitude": 21.0167,
        "longitude": 105.8289,
        "school_type": "THPT",
        "phone": "024 3852 3916"
    },
    {
        "name": "Trường THPT Việt Đức",
        "address": "Số 19 Xã Đàn, Nam Đồng, Đống Đa",
        "district": "Đống Đa",
        "latitude": 21.0130,
        "longitude": 105.8350,
        "school_type": "THPT",
        "phone": "024 3869 3594"
    },
    {
        "name": "Trường THCS Thành Công",
        "address": "Số 69 Thành Công, Ba Đình",
        "district": "Đống Đa",
        "latitude": 21.0200,
        "longitude": 105.8180,
        "school_type": "THCS"
    },
    
    # Quận Hai Bà Trưng
    {
        "name": "Trường THPT Trưng Vương",
        "address": "Số 45 Trưng Vương, Nguyễn Du, Hai Bà Trưng",
        "district": "Hai Bà Trưng",
        "latitude": 21.0190,
        "longitude": 105.8460,
        "school_type": "THPT",
        "phone": "024 3943 3616"
    },
    {
        "name": "Trường THPT Marie Curie",
        "address": "Số 10 Phan Chu Trinh, Hàng Bông, Hoàn Kiếm",
        "district": "Hai Bà Trưng",
        "latitude": 21.0245,
        "longitude": 105.8495,
        "school_type": "THPT"
    },
    {
        "name": "Trường Tiểu học Nguyễn Du",
        "address": "Ngõ 54 Nguyễn Du, Hai Bà Trưng",
        "district": "Hai Bà Trưng",
        "latitude": 21.0195,
        "longitude": 105.8485,
        "school_type": "Tiểu học"
    },
    
    # Quận Cầu Giấy
    {
        "name": "Trường THPT Cầu Giấy",
        "address": "Số 720 Láng, Láng Thượng, Đống Đa",
        "district": "Cầu Giấy",
        "latitude": 21.0280,
        "longitude": 105.8050,
        "school_type": "THPT",
        "phone": "024 3854 2385"
    },
    {
        "name": "Trường THPT Nguyễn Chí Thanh",
        "address": "Số 12 Nguyễn Chí Thanh, Láng Hạ, Đống Đa",
        "district": "Cầu Giấy",
        "latitude": 21.0240,
        "longitude": 105.8110,
        "school_type": "THPT"
    },
    
    # Quận Thanh Xuân
    {
        "name": "Trường THPT Thanh Xuân",
        "address": "Số 1 Đường Lê Trọng Tấn, Khương Mai, Thanh Xuân",
        "district": "Thanh Xuân",
        "latitude": 20.9950,
        "longitude": 105.8085,
        "school_type": "THPT",
        "phone": "024 3854 2953"
    },
    {
        "name": "Trường THCS Thanh Xuân",
        "address": "Ngõ 165 Khuất Duy Tiến, Thanh Xuân Trung, Thanh Xuân",
        "district": "Thanh Xuân",
        "latitude": 20.9985,
        "longitude": 105.8095,
        "school_type": "THCS"
    },
    
    # Quận Tây Hồ
    {
        "name": "Trường THPT Tây Hồ",
        "address": "Số 10 Xuân Diệu, Quảng An, Tây Hồ",
        "district": "Tây Hồ",
        "latitude": 21.0545,
        "longitude": 105.8235,
        "school_type": "THPT"
    },
    {
        "name": "Trường Tiểu học Quảng An",
        "address": "Đường Quảng An, Quảng An, Tây Hồ",
        "district": "Tây Hồ",
        "latitude": 21.0580,
        "longitude": 105.8210,
        "school_type": "Tiểu học"
    },
    
    # Quận Long Biên
    {
        "name": "Trường THPT Long Biên",
        "address": "Số 1 Nguyễn Văn Linh, Phúc Đồng, Long Biên",
        "district": "Long Biên",
        "latitude": 21.0380,
        "longitude": 105.8850,
        "school_type": "THPT"
    },
    {
        "name": "Trường THCS Gia Thụy",
        "address": "Gia Thụy, Long Biên",
        "district": "Long Biên",
        "latitude": 21.0450,
        "longitude": 105.9000,
        "school_type": "THCS"
    },
    
    # Quận Nam Từ Liêm
    {
        "name": "Trường THPT Mễ Trì",
        "address": "Đường Phạm Hùng, Mễ Trì, Nam Từ Liêm",
        "district": "Nam Từ Liêm",
        "latitude": 21.0090,
        "longitude": 105.7740,
        "school_type": "THPT"
    },
    {
        "name": "Trường Tiểu học Mễ Trì",
        "address": "Mễ Trì Thượng, Nam Từ Liêm",
        "district": "Nam Từ Liêm",
        "latitude": 21.0105,
        "longitude": 105.7760,
        "school_type": "Tiểu học"
    }
]

def seed_schools():
    db = SessionLocal()
    try:
        # Xóa dữ liệu cũ (nếu có)
        db.query(models.School).delete()
        db.commit()
        
        # Thêm dữ liệu mới
        for school_data in SCHOOLS_DATA:
            school = models.School(**school_data)
            db.add(school)
        
        db.commit()
        print(f"✅ Đã thêm {len(SCHOOLS_DATA)} trường học vào database!")
        
        # Hiển thị danh sách
        schools = db.query(models.School).all()
        print("\n📚 Danh sách trường học:")
        for school in schools:
            print(f"  - {school.name} ({school.district})")
            
    except Exception as e:
        print(f"❌ Lỗi: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed_schools()

