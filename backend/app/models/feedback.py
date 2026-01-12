from sqlalchemy import Column, Integer, String, Text, DateTime, Boolean
from app.db import Base

class Feedback(Base):
    __tablename__ = "feedbacks"
    
    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String(255), nullable=False)
    email = Column(String(255), nullable=False)
    subject = Column(String(255), nullable=False)
    message = Column(Text, nullable=False)
    phone = Column(String(20), nullable=True)  # Optional phone number
    is_read = Column(Boolean, default=False, nullable=False)  # For admin to track read/unread
    created_at = Column(DateTime, nullable=False)
    
    def __repr__(self):
        return f"<Feedback: {self.subject} from {self.full_name}>"

