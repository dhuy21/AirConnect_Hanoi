import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatsController } from './stats.controller';
import { StatsService } from './stats.service';
import { School } from '../../entities/school.entity';
import { Student } from '../../entities/student.entity';
import { Submission } from '../../entities/submission.entity';
import { Review } from '../../entities/review.entity';

@Module({
  imports: [TypeOrmModule.forFeature([School, Student, Submission, Review])],
  controllers: [StatsController],
  providers: [StatsService],
})
export class StatsModule {}
