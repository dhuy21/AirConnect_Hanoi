import { client } from '@airconnect/shared-types/api';
import { AUTH_KEYS } from './auth';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';

function readStoredToken(): string | null {
  if (typeof window === 'undefined') return null;
  return (
    localStorage.getItem(AUTH_KEYS.STUDENT_TOKEN) ??
    localStorage.getItem(AUTH_KEYS.ADMIN_TOKEN) ??
    localStorage.getItem(AUTH_KEYS.SCHOOL_TOKEN)
  );
}

// Configure the generated @hey-api client once: baseUrl + auth interceptor
// + error normalisation so callers can try/catch on `Error` instances.
client.setConfig({ baseUrl: API_URL });

client.interceptors.request.use((request: Request) => {
  const token = readStoredToken();
  if (token) {
    request.headers.set('Authorization', `Bearer ${token}`);
  }
  return request;
});

client.interceptors.response.use(async (response: Response) => {
  if (response.ok) return response;
  let message = `HTTP ${response.status}`;
  try {
    const body = (await response.clone().json()) as {
      message?: string;
      detail?: string;
    };
    message = body.message ?? body.detail ?? message;
  } catch {
    // Non-JSON error body, keep the HTTP status message.
  }
  throw new Error(message);
});

export { client };
export * from '@airconnect/shared-types/api';
