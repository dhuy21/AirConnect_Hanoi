import {
  Controller,
  Get,
  Param,
  Query,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { StudentService } from './student.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '../../common/enums';
import { DEFAULT_QUERY_LIMIT } from '../../common/constants';

@ApiTags('students')
@Controller('students')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.SCHOOL, UserRole.ADMIN)
@ApiBearerAuth()
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get()
  @ApiOperation({ summary: 'Get all students' })
  getAllStudents(@Query('limit') limit: number = DEFAULT_QUERY_LIMIT) {
    return this.studentService.getAllStudents(+limit);
  }

  @Get('school/:schoolId')
  @ApiOperation({ summary: 'Get students by school' })
  getStudentsBySchool(@Param('schoolId', ParseIntPipe) schoolId: number) {
    return this.studentService.getStudentsBySchool(schoolId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get student by ID' })
  getStudentById(@Param('id', ParseIntPipe) id: number) {
    return this.studentService.getStudentById(id);
  }
}
