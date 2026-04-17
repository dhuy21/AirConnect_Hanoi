import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Feedback } from '../../entities/feedback.entity';
import { CreateFeedbackDto } from './dto';
import { DEFAULT_QUERY_LIMIT } from '../../common/constants';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectRepository(Feedback) private fbRepo: Repository<Feedback>,
  ) {}

  async create(dto: CreateFeedbackDto) {
    const feedback = this.fbRepo.create(dto);
    return this.fbRepo.save(feedback);
  }

  async getAll(skip = 0, limit = DEFAULT_QUERY_LIMIT) {
    return this.fbRepo.find({
      order: { created_at: 'DESC' },
      skip,
      take: limit,
    });
  }

  async getById(id: number) {
    const fb = await this.fbRepo.findOne({ where: { id } });
    if (!fb) throw new NotFoundException('Feedback not found');
    return fb;
  }

  async getUnread() {
    return this.fbRepo.find({
      where: { is_read: false },
      order: { created_at: 'DESC' },
    });
  }

  async markAsRead(id: number) {
    const fb = await this.getById(id);
    fb.is_read = true;
    return this.fbRepo.save(fb);
  }

  async delete(id: number) {
    const fb = await this.getById(id);
    return this.fbRepo.remove(fb);
  }
}
