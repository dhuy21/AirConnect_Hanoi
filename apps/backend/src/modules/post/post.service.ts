import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../../entities/post.entity';
import { CreatePostDto } from './dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private readonly postRepo: Repository<Post>,
  ) {}

  async getAll() {
    return this.postRepo.find({ order: { published_at: 'DESC' } });
  }

  async getBySchool(schoolId: number) {
    return this.postRepo.find({
      where: { school_id: schoolId },
      order: { published_at: 'DESC' },
    });
  }

  async getById(id: number) {
    const post = await this.postRepo.findOne({ where: { id } });
    if (!post) throw new NotFoundException('Post not found');
    return post;
  }

  async create(dto: CreatePostDto) {
    const post = this.postRepo.create({
      ...dto,
      published_at: dto.published_at ? new Date(dto.published_at) : new Date(),
    });
    return this.postRepo.save(post);
  }
}
