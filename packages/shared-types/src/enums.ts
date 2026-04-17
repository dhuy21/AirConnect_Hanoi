// Single source of truth for enums shared between backend and frontend.
// Values are lower-case strings matching the Postgres enum types defined in
// TypeORM entities. Do NOT rename values without writing a migration.

export enum SchoolType {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  HIGH_SCHOOL = 'high_school',
  UNIVERSITY = 'university',
}

export enum AdminType {
  SUPER = 'super',
  NORMAL = 'normal',
}

export enum Sex {
  MALE = 'male',
  FEMALE = 'female',
}

export enum PostType {
  CASE_STUDY = 'case_study',
  BEST_PRACTICE = 'best_practice',
  RESEARCH = 'research',
  NEWS = 'news',
  GUIDE = 'guide',
  OTHER = 'other',
}

export enum SubmissionType {
  REQUEST = 'request',
  OFFER = 'offer',
  OTHER = 'other',
}

export enum ReviewDecision {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
  OTHER = 'other',
}

export enum SolutionType {
  IMPROVING_FACILITIES = 'improving_facilities',
  RESEARCH_AND_DEVELOPMENT = 'research_and_development',
  OTHER = 'other',
}

export enum SolutionStatus {
  NORMAL = 'normal',
  IMPORTANT = 'important',
  CRITICAL = 'critical',
  OTHER = 'other',
}

export enum HelpType {
  REQUEST = 'request',
  OFFER = 'offer',
  OTHER = 'other',
}

export enum HelpStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
  OTHER = 'other',
}

export enum RateStar {
  ONE = '1',
  TWO = '2',
  THREE = '3',
  FOUR = '4',
  FIVE = '5',
}

export enum UserRole {
  STUDENT = 'student',
  ADMIN = 'admin',
  SCHOOL = 'school',
}
