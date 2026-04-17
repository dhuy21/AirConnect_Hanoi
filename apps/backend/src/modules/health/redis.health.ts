import { Inject, Injectable } from '@nestjs/common';
import {
  HealthCheckError,
  HealthIndicator,
  HealthIndicatorResult,
} from '@nestjs/terminus';
import type Redis from 'ioredis';
import { REDIS_CLIENT } from '../redis/redis.constants';

/**
 * Redis health indicator.
 *
 * Reports three possible states:
 *   - `up`        — PING succeeded within the timeout
 *   - `skipped`   — REDIS_URL not configured (local dev). Not a failure.
 *   - HealthCheckError — PING failed or timed out.
 *
 * A "skipped" status is represented as `status: 'up'` with `skipped: true`
 * so Terminus does not treat it as a degraded health report.
 */
@Injectable()
export class RedisHealthIndicator extends HealthIndicator {
  private static readonly PING_TIMEOUT_MS = 1_000;

  constructor(@Inject(REDIS_CLIENT) private readonly client: Redis | null) {
    super();
  }

  async pingCheck(key: string): Promise<HealthIndicatorResult> {
    if (!this.client) {
      return this.getStatus(key, true, { skipped: true });
    }

    try {
      const pong = await Promise.race<string>([
        this.client.ping(),
        new Promise<string>((_, reject) =>
          setTimeout(
            () => reject(new Error('Redis PING timed out')),
            RedisHealthIndicator.PING_TIMEOUT_MS,
          ),
        ),
      ]);

      if (pong !== 'PONG') {
        throw new Error(`Unexpected PING response: ${pong}`);
      }
      return this.getStatus(key, true);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      throw new HealthCheckError(
        'Redis check failed',
        this.getStatus(key, false, { message }),
      );
    }
  }
}
