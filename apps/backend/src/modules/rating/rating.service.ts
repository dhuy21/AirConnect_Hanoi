import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rating } from '../../entities/rating.entity';
import { CreateRatingDto } from './dto';

@Injectable()
export class RatingService {
  constructor(
    @InjectRepository(Rating) private readonly ratingRepo: Repository<Rating>,
  ) {}

  async getByPost(postId: number) {
    return this.ratingRepo.find({
      where: { post_id: postId },
      order: { rated_at: 'DESC' },
    });
  }

  async upsert(dto: CreateRatingDto) {
    const existing = await this.ratingRepo.findOne({
      where: { post_id: dto.post_id, student_id: dto.student_id },
    });
    if (existing) {
      existing.rate = dto.rate;
      return this.ratingRepo.save(existing);
    }
    const rating = this.ratingRepo.create(dto);
    return this.ratingRepo.save(rating);
  }

  async getAverageRating(postId: number) {
    const result = await this.ratingRepo
      .createQueryBuilder('r')
      .select('AVG(CAST(r.rate AS int))', 'avg')
      .addSelect('COUNT(*)', 'count')
      .where('r.post_id = :postId', { postId })
      .getRawOne();
    return {
      average: parseFloat(result.avg) || 0,
      count: parseInt(result.count) || 0,
    };
  }
}
