import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { School } from '../../entities/school.entity';
import { Student } from '../../entities/student.entity';
import { Submission } from '../../entities/submission.entity';
import { Review } from '../../entities/review.entity';
import { ReviewDecision } from '../../common/enums';
import { StatsResponseDto } from './dto/stats-response.dto';

@Injectable()
export class StatsService {
  constructor(
    @InjectRepository(School) private readonly schoolRepo: Repository<School>,
    @InjectRepository(Student)
    private readonly studentRepo: Repository<Student>,
    @InjectRepository(Submission)
    private readonly subRepo: Repository<Submission>,
    @InjectRepository(Review) private readonly reviewRepo: Repository<Review>,
  ) {}

  async getStats(): Promise<StatsResponseDto> {
    const [totalSchools, totalStudents, totalSubmissions] = await Promise.all([
      this.schoolRepo.count(),
      this.studentRepo.count(),
      this.subRepo.count(),
    ]);

    const [pendingReviews, approvedSubmissions, rejectedSubmissions] =
      await Promise.all([
        this.reviewRepo.count({ where: { decision: ReviewDecision.PENDING } }),
        this.reviewRepo.count({ where: { decision: ReviewDecision.ACCEPTED } }),
        this.reviewRepo.count({ where: { decision: ReviewDecision.REJECTED } }),
      ]);

    return {
      total_schools: totalSchools,
      total_students: totalStudents,
      total_submissions: totalSubmissions,
      pending_reviews: pendingReviews,
      approved_submissions: approvedSubmissions,
      rejected_submissions: rejectedSubmissions,
    };
  }
}
