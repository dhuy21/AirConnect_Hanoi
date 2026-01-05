// Environment configuration
// These variables are loaded from .env file at project root
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || '';
const FRONTEND_URL = import.meta.env.VITE_FRONTEND_URL || '';

export { BACKEND_URL, FRONTEND_URL };

