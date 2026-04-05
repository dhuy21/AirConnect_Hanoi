import { AuthResponse } from './types';
import { ROLE_DASHBOARD_MAP, ROUTES } from './routes';

export const AUTH_KEYS = {
  STUDENT_TOKEN: 'student_token',
  STUDENT_ID: 'student_id',
  STUDENT_NAME: 'student_name',
  ADMIN_TOKEN: 'admin_token',
  ADMIN_ID: 'admin_id',
  ADMIN_NAME: 'admin_name',
  ADMIN_USERNAME: 'admin_username',
  SCHOOL_TOKEN: 'school_token',
  SCHOOL_ID: 'school_id',
  SCHOOL_NAME: 'school_name',
} as const;

export const isLoggedIn = (): boolean => {
  if (typeof window === 'undefined') return false;
  return !!(
    localStorage.getItem(AUTH_KEYS.STUDENT_TOKEN) ||
    localStorage.getItem(AUTH_KEYS.ADMIN_TOKEN) ||
    localStorage.getItem(AUTH_KEYS.SCHOOL_TOKEN)
  );
};

export const getUserRole = (): 'student' | 'admin' | 'school' | null => {
  if (typeof window === 'undefined') return null;
  if (localStorage.getItem(AUTH_KEYS.ADMIN_TOKEN)) return 'admin';
  if (localStorage.getItem(AUTH_KEYS.SCHOOL_TOKEN)) return 'school';
  if (localStorage.getItem(AUTH_KEYS.STUDENT_TOKEN)) return 'student';
  return null;
};

export const getDashboardRoute = (): string => {
  const role = getUserRole();
  return role ? (ROLE_DASHBOARD_MAP[role] ?? ROUTES.HOME) : ROUTES.HOME;
};

export const storeAuthData = (data: AuthResponse): void => {
  if (typeof window === 'undefined') return;
  const prefix = data.role;
  localStorage.setItem(`${prefix}_token`, data.access_token);
  localStorage.setItem(`${prefix}_id`, String(data.user_id));
  if (data.name) localStorage.setItem(`${prefix}_name`, data.name);
  if (data.username) localStorage.setItem(`${prefix}_username`, data.username);
  if (data.school_id) localStorage.setItem(AUTH_KEYS.SCHOOL_ID, String(data.school_id));
  document.cookie = `auth_token=${data.access_token}; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=Lax`;
};

export const clearAuthData = (): void => {
  if (typeof window === 'undefined') return;
  Object.values(AUTH_KEYS).forEach(key => localStorage.removeItem(key));
  document.cookie = 'auth_token=; path=/; max-age=0';
};

export const logout = (): void => {
  clearAuthData();
  window.location.href = ROUTES.HOME;
};
