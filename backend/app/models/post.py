from sqlalchemy import Column, Integer, String, Text, Float, DateTime, ForeignKey
from sqlalchemy.types import Enum
from sqlalchemy.orm import relationship
from app.models.enums import PostType
from app.db import Base

class Post(Base):
    __tablename__ = "posts"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    type = Column(Enum(PostType), nullable=False)
    description = Column(String(255), nullable=False)
    image = Column(String(255), nullable=False)
    content = Column(Text, nullable=False)
    published_at = Column(DateTime, nullable=False)

    #Association  publish (1:N)
    school_id = Column(Integer, ForeignKey('schools.id'), nullable=False)
    school = relationship('School', back_populates='posts')

    #Association view (N:N) - Pas de cascade: View est table de jointure
    views = relationship('View', back_populates='post')

    
    def __repr__(self):
        return f"<Post: {self.title} {self.type} {self.published_at}>"