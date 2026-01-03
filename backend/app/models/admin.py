from sqlalchemy import Column, Integer, String, Text, Float, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from app.db import Base
from sqlalchemy.types import Enum
from app.models.enums import AdminType
from datetime import datetime

class Admin(Base):
    __tablename__ = "admins"
    
    id = Column(Integer, primary_key=True, index=True)
    type = Column(Enum(AdminType), nullable=False)
    username = Column(String(255), nullable=False)
    password = Column(String(255), nullable=False)
    phone = Column(String(20), nullable=False)
    email = Column(String(255), nullable=False)
    created_at = Column(DateTime, nullable=False, default=datetime.now)

    #Association review (N:N) - Pas de cascade: Review est table de jointure
    reviews = relationship('Review', back_populates='admin')

    def __repr__(self):
        return f"<Admin: {self.username}>"