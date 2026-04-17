/**
 * Injection token for the shared ioredis client.
 *
 * The provider returns `Redis | null`:
 *   - `Redis` instance when REDIS_URL is configured
 *   - `null` in local dev without Redis (throttler falls back to memory,
 *     health check reports redis as skipped)
 *
 * Consumers MUST handle the null case explicitly.
 */
export const REDIS_CLIENT = 'REDIS_CLIENT';
