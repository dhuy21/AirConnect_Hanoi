export const DEFAULT_QUERY_LIMIT = 100;

/**
 * Stricter per-route rate-limit for auth endpoints.
 * Applied via `@Throttle({ default: THROTTLE_AUTH })` and overrides the
 * global limit configured in AppModule (env: THROTTLE_TTL / THROTTLE_LIMIT).
 */
export const THROTTLE_AUTH = { ttl: 60_000, limit: 5 };
