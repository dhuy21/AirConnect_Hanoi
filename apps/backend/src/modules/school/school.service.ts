import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { School } from '../../entities/school.entity';

@Injectable()
export class SchoolService {
  constructor(
    @InjectRepository(School) private readonly schoolRepo: Repository<School>,
  ) {}

  private mapRawSchool(raw: Record<string, any>) {
    return {
      id: raw.school_id,
      name: raw.school_name,
      address: raw.school_address,
      district: raw.school_district,
      type: raw.school_type,
      phone: raw.school_phone,
      situation: raw.school_situation,
      email: raw.school_email,
      score_1: raw.school_score_1,
      score_2: raw.school_score_2,
      score_3: raw.school_score_3,
      score_4: raw.school_score_4,
      score_5: raw.school_score_5,
      created_at: raw.school_created_at,
      latitude: parseFloat(raw.latitude),
      longitude: parseFloat(raw.longitude),
    };
  }

  private getBaseQuery() {
    return this.schoolRepo
      .createQueryBuilder('school')
      .select([
        'school.id',
        'school.name',
        'school.address',
        'school.district',
        'school.type',
        'school.phone',
        'school.situation',
        'school.email',
        'school.score_1',
        'school.score_2',
        'school.score_3',
        'school.score_4',
        'school.score_5',
        'school.created_at',
        'ST_Y(school.location::geometry) as latitude',
        'ST_X(school.location::geometry) as longitude',
      ]);
  }

  async getAllSchools() {
    const schools = await this.getBaseQuery().getRawMany();
    return schools.map((s) => this.mapRawSchool(s));
  }

  async getNearbySchools(latitude: number, longitude: number, radius: number) {
    const schools = await this.getBaseQuery()
      .where(
        'ST_DWithin(ST_Transform(school.location::geometry, 3857), ST_Transform(ST_SetSRID(ST_MakePoint(:lng, :lat), 4326), 3857), :radius)',
        { lng: longitude, lat: latitude, radius },
      )
      .getRawMany();
    return schools.map((s) => this.mapRawSchool(s));
  }
}
