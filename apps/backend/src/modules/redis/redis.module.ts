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

// Global ioredis client under REDIS_CLIENT; resolves to `null` when REDIS_URL
// is not set (local dev without Docker). `maxRetriesPerRequest: null` is
// required by throttler-storage-redis; other options = fail-fast + capped retry.
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
