import {
  Global,
  Inject,
  Logger,
  Module,
  OnModuleDestroy,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import Redis from 'ioredis';
import { REDIS_CLIENT } from './redis.constants';

/**
 * Global Redis module.
 *
 * Exposes a singleton `ioredis` client under the REDIS_CLIENT token. If
 * REDIS_URL is not configured (typical local dev without Docker), the
 * provider resolves to `null`; downstream code must handle both cases.
 *
 * Connection options:
 *   - `lazyConnect: false`: fail fast on boot when REDIS_URL IS set
 *     (staging / production) instead of on first command.
 *   - bounded retry strategy (exponential back-off, cap 2s) to avoid
 *     hot-looping on transient network blips.
 *   - `maxRetriesPerRequest: null`: required by throttler-storage-redis
 *     because its pipelined commands do not tolerate per-request caps.
 */
@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: REDIS_CLIENT,
      inject: [ConfigService],
      useFactory: (config: ConfigService): Redis | null => {
        const url = config.get<string>('REDIS_URL');
        const logger = new Logger('Redis');
        if (!url) {
          logger.warn(
            'REDIS_URL not set — running without Redis. Throttler will use in-memory storage (single-instance only).',
          );
          return null;
        }

        const client = new Redis(url, {
          lazyConnect: false,
          maxRetriesPerRequest: null,
          enableReadyCheck: true,
          retryStrategy: (times) => Math.min(times * 200, 2_000),
        });

        client.on('ready', () => logger.log('Redis ready'));
        client.on('error', (err) =>
          logger.error(`Redis error: ${err.message}`),
        );
        client.on('reconnecting', (delay: number) =>
          logger.warn(`Redis reconnecting in ${delay}ms`),
        );

        return client;
      },
    },
  ],
  exports: [REDIS_CLIENT],
})
export class RedisModule implements OnModuleDestroy {
  constructor(@Inject(REDIS_CLIENT) private readonly client: Redis | null) {}

  async onModuleDestroy(): Promise<void> {
    if (this.client && this.client.status !== 'end') {
      await this.client.quit();
    }
  }
}
