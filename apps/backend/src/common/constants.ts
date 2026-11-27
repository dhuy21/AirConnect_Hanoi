export const DEFAULT_QUERY_LIMIT = 100;
export const MAX_QUERY_LIMIT = 100;

/** Maximum search radius of GET /schools/nearby, in metres. */
export const MAX_NEARBY_RADIUS_M = 50_000;

/** Parse a `limit` query value: default when missing or invalid, never above MAX_QUERY_LIMIT. */
export function clampLimit(raw: unknown): number {
  const n = Number(raw);
  if (!Number.isFinite(n) || n < 1) return DEFAULT_QUERY_LIMIT;
  return Math.min(Math.floor(n), MAX_QUERY_LIMIT);
}

/**
 * Stricter per-route rate-limit for auth endpoints.
 * Applied via `@Throttle({ default: THROTTLE_AUTH })` and overrides the
 * global limit configured in AppModule (env: THROTTLE_TTL / THROTTLE_LIMIT).
 */
export const THROTTLE_AUTH = { ttl: 60_000, limit: 5 };
