from enum import Enum

class SchoolType(str, Enum):
    PRIMARY = "primary"
    SECONDARY = "secondary"
    HIGH_SCHOOL = "high_school"
    UNIVERSITY = "university"

class AdminType(str, Enum):
    SUPER = "super"
    NORMAL = "normal"

class HelpType(str, Enum):
    REQUEST = "request"
    OFFER = "offer"
    OTHER = "other"


class HelpStatus(str, Enum):
    PENDING = "pending"
    ACCEPTED = "accepted"
    REJECTED = "rejected"
    OTHER = "other"

class PostType(str, Enum):
    CASE_STUDY = "case_study"
    BEST_PRACTICE = "best_practice"
    RESEARCH = "research"
    NEWS = "news"
    GUIDE = "guide"
    OTHER = "other"

class Decision(str, Enum):
    PENDING = "pending"
    ACCEPT = "accepted"
    REJECT = "rejected"
    OTHER = "other"

class SolutionType(str, Enum):
    IMPROVING_FACILITIES = "improving_facilities"

    RESEARCH_AND_DEVELOPMENT = "research_and_development"
    OTHER = "other"

class SolutionStatus(str, Enum):
    NORMAL = "normal"
    IMPORTANT = "important"
    CRITICAL = "critical"
    OTHER = "other"


class Sex(str, Enum):
    MALE = "male"
    FEMALE = "female"

class SubmissionType(str, Enum):
    REQUEST = "request"
    OFFER = "offer"
    OTHER = "other"

class RateStar(str, Enum):
    ONE = "1"
    TWO = "2"
    THREE = "3"
    FOUR = "4"
    FIVE = "5"