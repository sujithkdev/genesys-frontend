// ─────────────────────────────────────────────
// GENESYS — Shared TypeScript Types
// ─────────────────────────────────────────────

export type UserRole = 'admin' | 'instructor' | 'student';
export type UserStatus = 'active' | 'inactive' | 'suspended' | 'pending_verification';
export type CourseStatus = 'draft' | 'published' | 'archived';
export type CourseLevel = 'beginner' | 'intermediate' | 'advanced';
export type LessonType = 'video' | 'pdf' | 'quiz' | 'text';
export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'refunded';

// ── User
export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  full_name?: string;
  avatar_url?: string;
  role: UserRole;
  status: UserStatus;
  bio?: string;
  phone?: string;
  email_verified: boolean;
  last_login_at?: string;
  created_at: string;
}

// ── Auth
export interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

// ── Category
export interface Category {
  id: string;
  name: string;
  slug: string;
  icon?: string;
}

// ── Course
export interface Course {
  id: string;
  instructor_id: string;
  instructor_name: string;
  instructor_avatar?: string;
  instructor_bio?: string;
  category_id?: string;
  category_name?: string;
  category_slug?: string;
  title: string;
  slug: string;
  description: string;
  short_description?: string;
  thumbnail_url?: string;
  preview_video_url?: string;
  price: number;
  discount_price?: number;
  currency: string;
  level: CourseLevel;
  language: string;
  status: CourseStatus;
  is_free: boolean;
  duration_hours?: number;
  total_lessons: number;
  total_students: number;
  avg_rating: number;
  total_reviews: number;
  requirements?: string[];
  what_you_learn?: string[];
  tags?: string[];
  sections?: Section[];
  created_at: string;
  updated_at: string;
}

// ── Section
export interface Section {
  id: string;
  course_id: string;
  title: string;
  description?: string;
  order_index: number;
  lessons: Lesson[];
}

// ── Lesson
export interface Lesson {
  id: string;
  section_id: string;
  course_id: string;
  title: string;
  description?: string;
  type: LessonType;
  order_index: number;
  duration_seconds?: number;
  is_preview: boolean;
  s3_key?: string;
  hls_playlist_key?: string;
  video_status?: 'pending' | 'processing' | 'ready' | 'failed';
  pdf_s3_key?: string;
  content?: Record<string, any>;
}

// ── Progress
export interface LessonProgress {
  lesson_id: string;
  is_completed: boolean;
  watch_time_seconds: number;
  last_position_secs: number;
  completed_at?: string;
}

export interface CourseProgress {
  lessons: LessonProgress[];
  completion_percent: number;
}

// ── Enrollment
export interface Enrollment {
  enrollment_id: string;
  course_id: string;
  title: string;
  slug: string;
  thumbnail_url?: string;
  instructor_name: string;
  total_lessons: number;
  completed_lessons: number;
  completion_percent: number;
  enrolled_at: string;
  last_activity?: string;
  status: 'active' | 'completed' | 'refunded';
}

// ── Payment
export interface Payment {
  id: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  razorpay_payment_id?: string;
  course_title: string;
  course_slug: string;
  thumbnail_url?: string;
  created_at: string;
}

// ── Review
export interface Review {
  id: string;
  student_name: string;
  avatar_url?: string;
  rating: number;
  comment?: string;
  created_at: string;
}

// ── Razorpay (window)
export interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  order_id: string;
  name: string;
  description: string;
  image?: string;
  prefill?: { name?: string; email?: string; contact?: string };
  theme?: { color?: string };
  handler: (response: RazorpayResponse) => void;
  modal?: { ondismiss?: () => void };
}

export interface RazorpayResponse {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

// ── Pagination
export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

// ── API Error
export interface ApiError {
  error: string;
  errors?: { msg: string; param: string }[];
}
