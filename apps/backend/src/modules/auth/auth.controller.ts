import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiOkResponse } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { AuthService } from './auth.service';
import { THROTTLE_AUTH } from '../../common/constants';
import {
  LoginStudentDto,
  LoginAdminDto,
  LoginSchoolDto,
  RegisterStudentDto,
} from './dto';
import { AuthResponseDto } from './dto/auth-response.dto';

@ApiTags('auth')
@Controller('auth')
@Throttle({ default: THROTTLE_AUTH })
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login/student')
  @ApiOperation({ summary: 'Student login' })
  @ApiOkResponse({ type: AuthResponseDto })
  loginStudent(@Body() dto: LoginStudentDto): Promise<AuthResponseDto> {
    return this.authService.loginStudent(dto.email, dto.password);
  }

  @Post('login/admin')
  @ApiOperation({ summary: 'Admin login' })
  @ApiOkResponse({ type: AuthResponseDto })
  loginAdmin(@Body() dto: LoginAdminDto): Promise<AuthResponseDto> {
    return this.authService.loginAdmin(dto.username, dto.password);
  }

  @Post('login/school')
  @ApiOperation({ summary: 'School login' })
  @ApiOkResponse({ type: AuthResponseDto })
  loginSchool(@Body() dto: LoginSchoolDto): Promise<AuthResponseDto> {
    return this.authService.loginSchool(dto.email, dto.password);
  }

  @Post('register/student')
  @ApiOperation({ summary: 'Register new student' })
  @ApiOkResponse({ type: AuthResponseDto })
  registerStudent(@Body() dto: RegisterStudentDto): Promise<AuthResponseDto> {
    return this.authService.registerStudent(dto);
  }
}
