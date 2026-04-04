import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Help } from '../../entities/help.entity';
import { CreateHelpDto, UpdateHelpStatusDto } from './dto';
import { HelpStatus } from '../../common/enums';

@Injectable()
export class HelpService {
  constructor(
    @InjectRepository(Help) private readonly helpRepo: Repository<Help>,
  ) {}

  async create(dto: CreateHelpDto) {
    const help = this.helpRepo.create({
      ...dto,
      status: dto.status ?? HelpStatus.PENDING,
    });
    return this.helpRepo.save(help);
  }

  async getBySchool(schoolId: number) {
    return this.helpRepo.find({
      where: [{ from_school_id: schoolId }, { to_school_id: schoolId }],
      order: { created_at: 'DESC' },
    });
  }

  async updateStatus(fromId: number, toId: number, dto: UpdateHelpStatusDto) {
    const help = await this.helpRepo.findOne({
      where: { from_school_id: fromId, to_school_id: toId },
    });
    if (!help) throw new NotFoundException('Help request not found');
    help.status = dto.status;
    return this.helpRepo.save(help);
  }
}
