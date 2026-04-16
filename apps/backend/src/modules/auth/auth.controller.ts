import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { AuthService } from './auth.service';
import { THROTTLE_AUTH } from '../../common/constants';
import {
  LoginStudentDto,
  LoginAdminDto,
  LoginSchoolDto,
  RegisterStudentDto,
} from './dto';

@ApiTags('auth')
@Controller('auth')
@Throttle({ default: THROTTLE_AUTH })
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login/student')
  @ApiOperation({ summary: 'Student login' })
  loginStudent(@Body() dto: LoginStudentDto) {
    return this.authService.loginStudent(dto.email, dto.password);
  }

  @Post('login/admin')
  @ApiOperation({ summary: 'Admin login' })
  loginAdmin(@Body() dto: LoginAdminDto) {
    return this.authService.loginAdmin(dto.username, dto.password);
  }

  @Post('login/school')
  @ApiOperation({ summary: 'School login' })
  loginSchool(@Body() dto: LoginSchoolDto) {
    return this.authService.loginSchool(dto.email, dto.password);
  }

  @Post('register/student')
  @ApiOperation({ summary: 'Register new student' })
  registerStudent(@Body() dto: RegisterStudentDto) {
    return this.authService.registerStudent(dto);
  }
}
