export interface School {
  id: number;
  name: string;
  type: string;
  address: string;
  district: string | null;
  latitude: number;
  longitude: number;
  situation: string | null;
  email: string | null;
  phone: string | null;
  score_1: number;
  score_2: number;
  score_3: number;
  score_4: number;
  score_5: number;
  created_at: string;
}

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

export interface AuthResponse {
  access_token: string;
  token_type: string;
  user_id: number;
  role: string;
  email?: string;
  username?: string;
  name?: string;
  school_id?: number;
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
