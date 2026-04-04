import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Apply } from '../../entities/apply.entity';
import { CreateApplyDto } from './dto';

@Injectable()
export class ApplyService {
  constructor(
    @InjectRepository(Apply) private readonly applyRepo: Repository<Apply>,
  ) {}

  async create(dto: CreateApplyDto) {
    const apply = this.applyRepo.create(dto);
    return this.applyRepo.save(apply);
  }

  async getBySolution(solutionId: number) {
    return this.applyRepo.find({
      where: { solution_id: solutionId },
      order: { applied_at: 'DESC' },
    });
  }

  async getByAirQuality(aqId: number) {
    return this.applyRepo.find({
      where: { air_quality_id: aqId },
      order: { applied_at: 'DESC' },
    });
  }
}
