import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from '../../entities/review.entity';
import { ReviewDecision } from '../../common/enums';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review) private readonly reviewRepo: Repository<Review>,
  ) {}

  async getBySubmission(submissionId: number) {
    return this.reviewRepo.find({ where: { submission_id: submissionId } });
  }

  async create(data: { decision: ReviewDecision; note?: string; submission_id: number; admin_id: number; date?: Date }) {
    const review = this.reviewRepo.create({
      ...data,
      date: data.date ?? new Date(),
    });
    return this.reviewRepo.save(review);
  }

  async getByAdmin(adminId: number) {
    return this.reviewRepo.find({
      where: { admin_id: adminId },
      order: { date: 'DESC' },
    });
  }
}
