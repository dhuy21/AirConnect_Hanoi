import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerModule, ThrottlerGuard, seconds } from '@nestjs/throttler';
import { ThrottlerStorageRedisService } from '@nest-lab/throttler-storage-redis';
import type Redis from 'ioredis';
import { getDatabaseConfig } from './config/database.config';
import { envValidationSchema } from './config/env.validation';
import { RedisModule } from './modules/redis/redis.module';
import { REDIS_CLIENT } from './modules/redis/redis.constants';
import { AuthModule } from './modules/auth/auth.module';
import { SchoolModule } from './modules/school/school.module';
import { StudentModule } from './modules/student/student.module';
import { AirQualityModule } from './modules/air-quality/air-quality.module';
import { PostModule } from './modules/post/post.module';
import { SubmissionModule } from './modules/submission/submission.module';
import { ReviewModule } from './modules/review/review.module';
import { FeedbackModule } from './modules/feedback/feedback.module';
import { StatsModule } from './modules/stats/stats.module';
import { HelpModule } from './modules/help/help.module';
import { SolutionModule } from './modules/solution/solution.module';
import { RatingModule } from './modules/rating/rating.module';
import { ApplyModule } from './modules/apply/apply.module';
import { HealthModule } from './modules/health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:
        process.env.NODE_ENV === 'production' ? undefined : '../../.env',
      validationSchema: envValidationSchema,
      validationOptions: { abortEarly: true },
    }),
    RedisModule,
    // Rate-limit storage = Redis when REDIS_URL is set (multi-replica safe),
    // in-memory fallback otherwise (single-process dev only).
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule, RedisModule],
      inject: [ConfigService, REDIS_CLIENT],
      useFactory: (config: ConfigService, redis: Redis | null) => ({
        throttlers: [
          {
            ttl: seconds(config.get<number>('THROTTLE_TTL', 60)),
            limit: config.get<number>('THROTTLE_LIMIT', 100),
          },
        ],
        storage: redis ? new ThrottlerStorageRedisService(redis) : undefined,
      }),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: getDatabaseConfig,
      inject: [ConfigService],
    }),
    AuthModule,
    SchoolModule,
    StudentModule,
    AirQualityModule,
    PostModule,
    SubmissionModule,
    ReviewModule,
    FeedbackModule,
    StatsModule,
    HelpModule,
    SolutionModule,
    RatingModule,
    ApplyModule,
    HealthModule,
  ],
  providers: [{ provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class AppModule {}
