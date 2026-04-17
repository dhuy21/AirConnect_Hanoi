import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Student } from '../../entities/student.entity';
import { Admin } from '../../entities/admin.entity';
import { School } from '../../entities/school.entity';
import { RegisterStudentDto } from './dto';
import { UserRole } from '../../common/enums';

const BCRYPT_SALT_ROUNDS = 10;

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepo: Repository<Student>,
    @InjectRepository(Admin) private readonly adminRepo: Repository<Admin>,
    @InjectRepository(School) private readonly schoolRepo: Repository<School>,
    private readonly jwtService: JwtService,
  ) {}

  private async verifyPassword(
    plain: string,
    hashed: string,
  ): Promise<boolean> {
    if (!plain || !hashed) return false;
    const validPrefixes = ['$2b$', '$2a$', '$2y$'];
    if (!validPrefixes.some((p) => hashed.startsWith(p))) return false;
    try {
      return await bcrypt.compare(plain, hashed);
    } catch {
      return false;
    }
  }

  private generateToken(payload: {
    sub: number;
    role: UserRole;
    email?: string;
    username?: string;
  }): string {
    return this.jwtService.sign(payload);
  }

  private buildAuthResponse(
    token: string,
    userId: number,
    role: UserRole,
    extra: Record<string, any> = {},
  ) {
    return {
      access_token: token,
      token_type: 'bearer',
      user_id: userId,
      role,
      ...extra,
    };
  }

  async loginStudent(email: string, password: string) {
    const student = await this.studentRepo
      .createQueryBuilder('s')
      .addSelect('s.password')
      .where('s.email = :email', { email })
      .getOne();
    if (!student || !(await this.verifyPassword(password, student.password))) {
      throw new UnauthorizedException('Invalid email or password');
    }
    const token = this.generateToken({
      sub: student.id,
      role: UserRole.STUDENT,
      email: student.email,
    });
    return this.buildAuthResponse(token, student.id, UserRole.STUDENT, {
      email: student.email,
      name: `${student.first_name} ${student.last_name}`,
      school_id: student.school_id,
    });
  }

  async loginAdmin(username: string, password: string) {
    const admin = await this.adminRepo
      .createQueryBuilder('a')
      .addSelect('a.password')
      .where('a.username = :username', { username })
      .getOne();
    if (!admin || !(await this.verifyPassword(password, admin.password))) {
      throw new UnauthorizedException('Invalid username or password');
    }
    const token = this.generateToken({
      sub: admin.id,
      role: UserRole.ADMIN,
      username: admin.username,
    });
    return this.buildAuthResponse(token, admin.id, UserRole.ADMIN, {
      email: admin.email,
      username: admin.username,
      name: admin.username,
    });
  }

  async loginSchool(email: string, password: string) {
    const school = await this.schoolRepo
      .createQueryBuilder('s')
      .addSelect('s.password')
      .where('s.email = :email', { email })
      .getOne();
    if (!school || !(await this.verifyPassword(password, school.password))) {
      throw new UnauthorizedException('Invalid email or password');
    }
    const token = this.generateToken({
      sub: school.id,
      role: UserRole.SCHOOL,
      email: school.email,
    });
    return this.buildAuthResponse(token, school.id, UserRole.SCHOOL, {
      email: school.email,
      name: school.name,
    });
  }

  async registerStudent(dto: RegisterStudentDto) {
    if (!dto.school_id || dto.school_id <= 0) {
      throw new BadRequestException('Invalid school_id');
    }

    const schoolExists = await this.schoolRepo.findOne({
      where: { id: dto.school_id },
    });
    if (!schoolExists) {
      throw new BadRequestException('School not found');
    }

    const existing = await this.studentRepo.findOne({
      where: { email: dto.email },
    });
    if (existing) {
      throw new BadRequestException('Email already registered');
    }

    const hashedPassword = await bcrypt.hash(dto.password, BCRYPT_SALT_ROUNDS);
    const student = this.studentRepo.create({
      ...dto,
      password: hashedPassword,
    });
    await this.studentRepo.save(student);

    const token = this.generateToken({
      sub: student.id,
      role: UserRole.STUDENT,
      email: student.email,
    });
    return this.buildAuthResponse(token, student.id, UserRole.STUDENT, {
      email: student.email,
      name: `${student.first_name} ${student.last_name}`,
      school_id: student.school_id,
    });
  }
}
