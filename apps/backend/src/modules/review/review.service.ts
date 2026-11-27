import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from '../../entities/review.entity';
import { Submission } from '../../entities/submission.entity';
import { ReviewDecision } from '../../common/enums';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review) private readonly reviewRepo: Repository<Review>,
    @InjectRepository(Submission)
    private readonly submissionRepo: Repository<Submission>,
  ) {}

  async getSubmissionSchoolId(submissionId: number): Promise<number> {
    const submission = await this.submissionRepo.findOne({
      select: { id: true, from_school_id: true },
      where: { id: submissionId },
    });
    if (!submission) throw new NotFoundException('Submission not found');
    return submission.from_school_id;
  }

  async getBySubmission(submissionId: number) {
    return this.reviewRepo.find({ where: { submission_id: submissionId } });
  }

  async create(data: {
    decision: ReviewDecision;
    note?: string;
    submission_id: number;
    admin_id: number;
  }) {
    const review = this.reviewRepo.create({ ...data, date: new Date() });
    return this.reviewRepo.save(review);
  }

  async getByAdmin(adminId: number) {
    return this.reviewRepo.find({
      where: { admin_id: adminId },
      order: { date: 'DESC' },
    });
  }
}
