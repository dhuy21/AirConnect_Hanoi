import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Solution } from '../../entities/solution.entity';
import { CreateSolutionDto, UpdateSolutionDto } from './dto';

@Injectable()
export class SolutionService {
  constructor(
    @InjectRepository(Solution) private readonly solRepo: Repository<Solution>,
  ) {}

  async getAll() {
    return this.solRepo.find({ order: { created_at: 'DESC' } });
  }

  async getById(id: number) {
    const sol = await this.solRepo.findOne({ where: { id } });
    if (!sol) throw new NotFoundException('Solution not found');
    return sol;
  }

  async create(dto: CreateSolutionDto) {
    const sol = this.solRepo.create(dto);
    return this.solRepo.save(sol);
  }

  async update(id: number, dto: UpdateSolutionDto) {
    const sol = await this.getById(id);
    Object.assign(sol, dto);
    return this.solRepo.save(sol);
  }
}
