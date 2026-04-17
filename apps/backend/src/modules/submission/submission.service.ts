import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Submission } from '../../entities/submission.entity';
import { CreateSubmissionDto } from './dto';
import { DEFAULT_QUERY_LIMIT } from '../../common/constants';

@Injectable()
export class SubmissionService {
  constructor(
    @InjectRepository(Submission) private subRepo: Repository<Submission>,
  ) {}

  async getAll(limit = DEFAULT_QUERY_LIMIT) {
    return this.subRepo.find({ order: { id: 'DESC' }, take: limit });
  }

  async getBySchool(schoolId: number) {
    return this.subRepo.find({
      where: { from_school_id: schoolId },
      order: { id: 'DESC' },
    });
  }

  async create(dto: CreateSubmissionDto & { from_school_id: number }) {
    const sub = this.subRepo.create(dto);
    return this.subRepo.save(sub);
  }
}
