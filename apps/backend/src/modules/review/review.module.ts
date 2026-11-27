import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';
import { Submission } from '../../entities/submission.entity';
import { Review } from '../../entities/review.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Review, Submission])],
  controllers: [ReviewController],
  providers: [ReviewService],
  exports: [ReviewService],
})
export class ReviewModule {}
