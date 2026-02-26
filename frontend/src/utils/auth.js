import routes from '../config/routes';

/**
 * Check if user is logged in
 */
export const isLoggedIn = () => {
  return !!(
    localStorage.getItem('student_token') ||
    localStorage.getItem('admin_id') ||
    localStorage.getItem('school_token')
  );
};

/**
 * Get dashboard route based on user type
 */
export const getDashboardRoute = () => {
  if (localStorage.getItem('admin_id')) {
    return routes.adminDashboard;
  }
  if (localStorage.getItem('school_token')) {
    return routes.schoolDashboard;
  }
  if (localStorage.getItem('student_token')) {
    return routes.userDashboard;
  }
  return routes.home;
};

/**
 * Clear all authentication data from localStorage
 */
const clearAuthData = () => {
  // Student data
  localStorage.removeItem('student_token');
  localStorage.removeItem('student_id');
  localStorage.removeItem('student_name');
  
  // Admin data
  localStorage.removeItem('admin_id');
  localStorage.removeItem('admin_username');
  
  // School data
  localStorage.removeItem('school_token');
  localStorage.removeItem('school_id');
  localStorage.removeItem('school_name');
  
  // Shared data
  localStorage.removeItem('school_id');
};

/**
 * Logout user and navigate to home
 */
export const logout = (navigate) => {
  clearAuthData();
  navigate(routes.home);
};

