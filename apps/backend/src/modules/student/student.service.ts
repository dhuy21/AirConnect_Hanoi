import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from '../../entities/student.entity';
import { DEFAULT_QUERY_LIMIT } from '../../common/constants';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student) private studentRepo: Repository<Student>,
  ) {}

  private readonly safeSelect: (keyof Student)[] = [
    'id', 'first_name', 'last_name', 'email', 'phone',
    'birth_date', 'sex', 'health_status', 'school_id', 'created_at',
  ];

  async getStudentsBySchool(schoolId: number) {
    return this.studentRepo.find({
      select: this.safeSelect,
      where: { school_id: schoolId },
    });
  }

  async getStudentById(id: number) {
    return this.studentRepo.findOne({
      select: this.safeSelect,
      where: { id },
    });
  }

  async getAllStudents(limit = DEFAULT_QUERY_LIMIT) {
    return this.studentRepo.find({
      select: this.safeSelect,
      take: limit,
    });
  }
}
