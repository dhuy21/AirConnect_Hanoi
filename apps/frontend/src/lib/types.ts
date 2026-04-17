// Some types now come from the single source of truth (`@airconnect/shared-types`),
// generated from the backend OpenAPI contract.
//
// The remaining interfaces below describe endpoints whose controllers still
// lack `@ApiOkResponse({ type: ... })` decorators. They will be removed once
// those controllers are annotated in a follow-up PR — see CONTRIBUTING.md.
import type {
  SchoolResponseDto,
  AuthResponseDto,
} from '@airconnect/shared-types/api';

export type School = SchoolResponseDto;
export type AuthResponse = AuthResponseDto;

export interface StudentData {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  school_id: number;
}

export interface AirQualityData {
  id: number;
  aqi: number;
  pm25: number | null;
  pm10: number | null;
  co2: number | null;
  temp: number | null;
  humidity: number | null;
  wind_speed: number | null;
  school_id: number;
  measured_at: string;
}

export interface PostData {
  id: number;
  title: string;
  type: string;
  description: string;
  image: string;
  content: string;
  school_id: number;
  published_at: string;
}

export interface SubmissionData {
  id: number;
  type: string;
  content: string;
  from_school_id: number;
}

export interface ReviewData {
  submission_id: number;
  admin_id: number;
  decision: string;
  date: string;
  note: string | null;
}

export interface StatsData {
  total_schools: number;
  total_students: number;
  total_submissions: number;
  pending_reviews: number;
  approved_submissions: number;
  rejected_submissions: number;
}

export interface FeedbackData {
  id: number;
  full_name: string;
  email: string;
  subject: string;
  message: string;
  phone: string | null;
  is_read: boolean;
  created_at: string;
}
