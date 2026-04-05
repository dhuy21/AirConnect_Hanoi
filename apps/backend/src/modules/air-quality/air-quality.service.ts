import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AirQuality } from '../../entities/air-quality.entity';
import { CreateAirQualityDto } from './dto';
import { DEFAULT_QUERY_LIMIT } from '../../common/constants';

@Injectable()
export class AirQualityService {
  constructor(
    @InjectRepository(AirQuality) private aqRepo: Repository<AirQuality>,
  ) {}

  async getAll(limit = DEFAULT_QUERY_LIMIT) {
    return this.aqRepo.find({
      order: { measured_at: 'DESC' },
      take: limit,
    });
  }

  async getBySchool(schoolId: number) {
    const aq = await this.aqRepo.findOne({
      where: { school_id: schoolId },
      order: { measured_at: 'DESC' },
    });
    if (!aq) throw new NotFoundException('Air quality data not found');
    return aq;
  }

  async create(dto: CreateAirQualityDto) {
    const aq = this.aqRepo.create(dto);
    return this.aqRepo.save(aq);
  }
}
