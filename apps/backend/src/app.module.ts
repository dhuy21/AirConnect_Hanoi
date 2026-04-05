import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { getDatabaseConfig } from './config/database.config';
import { envValidationSchema } from './config/env.validation';
import { THROTTLE_GLOBAL } from './common/constants';
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
      envFilePath: '../../.env',
      validationSchema: envValidationSchema,
      validationOptions: { abortEarly: true },
    }),
    ThrottlerModule.forRoot([THROTTLE_GLOBAL]),
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
  providers: [
    { provide: APP_GUARD, useClass: ThrottlerGuard },
  ],
})
export class AppModule {}
