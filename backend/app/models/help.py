from sqlalchemy import Column, Integer, String, Text, Index, ForeignKey
from sqlalchemy.orm import relationship
from app.models.enums import HelpType, HelpStatus
from app.db import Base
from sqlalchemy.types import Enum, DateTime

class Help(Base):
    __tablename__ = "help"
    
    type = Column(Enum(HelpType), nullable=False)
    content = Column(Text, nullable=False)
    status = Column(Enum(HelpStatus), nullable=False)
    created_at = Column(DateTime, nullable=False)

    #Association help (N:N)
    from_school_id = Column(Integer, ForeignKey('schools.id'), primary_key=True)
    to_school_id = Column(Integer, ForeignKey('schools.id'), primary_key=True)
    from_school = relationship('School', back_populates='helps_from', foreign_keys=[from_school_id])
    to_school = relationship('School', back_populates='helps_to', foreign_keys=[to_school_id])

    def __repr__(self):
        return f"<Help {self.type} {self.content} {self.status} {self.created_at}>"