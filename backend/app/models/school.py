from sqlalchemy import Column, Integer, String, Text, Index, ForeignKey
from sqlalchemy.types import Enum, Float, DateTime
from app.models.enums import SchoolType
from geoalchemy2 import Geometry
from app.db import Base
from sqlalchemy.orm import relationship

class School(Base):
    __tablename__ = "schools"
    
    id = Column(Integer, primary_key=True, index=True)
    type = Column(Enum(SchoolType), nullable=False)  # Elementary, Middle School, High School, etc.
    name = Column(String(255), nullable=False)

    location = Column(Geometry('POINT', srid=4326), nullable=False, index=True)
    address = Column(String(255), nullable=False)
    district = Column(String(255), nullable=True)
    
    password = Column(String(255), nullable=False)
    situation = Column(String(255), nullable=True)
    email = Column(String(255), nullable=True)
    phone = Column(String(20), nullable=True)
    score_1 = Column(Float, nullable=False)
    score_2 = Column(Float, nullable=False)
    score_3 = Column(Float, nullable=False)
    score_4 = Column(Float, nullable=False)
    score_5 = Column(Float, nullable=False)
    created_at = Column(DateTime, nullable=False)

    #Association study (1:N)
    students = relationship('Student', back_populates='school', cascade='all, delete-orphan')


    #Association envoi (1:N)
    submissions = relationship('Submission', back_populates='school', cascade='all, delete-orphan')


    #Association  publish (1:N)
    posts = relationship('Post', back_populates='school', cascade='all, delete-orphan')

    #Association help (N:N) - Pas de cascade: Help est indépendant
    helps_from = relationship('Help', back_populates='from_school', primaryjoin='School.id == Help.from_school_id', foreign_keys='[Help.from_school_id]')
    helps_to = relationship('Help', back_populates='to_school', primaryjoin='School.id == Help.to_school_id', foreign_keys='[Help.to_school_id]')

    #Association measured (1:N)
    air_qualities = relationship('AirQuality', back_populates='school', cascade='all, delete-orphan')

    # Spatial index for location
    #__table_args__ = (
    #    Index('idx_school_location', 'location', postgresql_using='gist'),
    #)
    
    def __repr__(self):
        return f"<School {self.name}>"

