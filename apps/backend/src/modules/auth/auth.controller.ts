import { Controller, Post, Body, ForbiddenException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiForbiddenResponse,
} from '@nestjs/swagger';
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
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {}

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
  @ApiForbiddenResponse({ description: 'Registration is disabled' })
  registerStudent(@Body() dto: RegisterStudentDto): Promise<AuthResponseDto> {
    if (!this.configService.get<boolean>('REGISTRATION_ENABLED', false)) {
      throw new ForbiddenException(
        'Demonstrator — forms are limited to test accounts',
      );
    }
    return this.authService.registerStudent(dto);
  }
}
