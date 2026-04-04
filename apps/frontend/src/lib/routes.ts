export const ROUTES = {
  HOME: '/',
  AUTH: '/auth',
  MAP: '/map',
  RESOURCES: '/resources',
  FEEDBACK: '/feedback',

  DASHBOARD_ADMIN: '/dashboard/admin',
  DASHBOARD_SCHOOL: '/dashboard/school',
  DASHBOARD_SCHOOL_SUBMISSION: '/dashboard/school/submission',
  DASHBOARD_USER: '/dashboard/user',
} as const;

export const PUBLIC_PATHS = [
  ROUTES.HOME,
  ROUTES.AUTH,
  ROUTES.MAP,
  ROUTES.RESOURCES,
  ROUTES.FEEDBACK,
] as const;

export const ROLE_DASHBOARD_MAP: Record<string, string> = {
  admin: ROUTES.DASHBOARD_ADMIN,
  school: ROUTES.DASHBOARD_SCHOOL,
  student: ROUTES.DASHBOARD_USER,
};
