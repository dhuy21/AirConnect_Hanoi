import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  UseGuards,
  Req,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { Request } from 'express';
import { SubmissionService } from './submission.service';
import { CreateSubmissionDto } from './dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '../../common/enums';
import { JwtPayload } from '../../common/interfaces/jwt-payload.interface';
import { DEFAULT_QUERY_LIMIT } from '../../common/constants';

@ApiTags('submissions')
@Controller('submissions')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class SubmissionController {
  constructor(private readonly subService: SubmissionService) {}

  @Get()
  @ApiOperation({ summary: 'Get all submissions' })
  getAll(@Query('limit') limit: number = DEFAULT_QUERY_LIMIT) {
    return this.subService.getAll(+limit);
  }

  @Get('school/:schoolId')
  @ApiOperation({ summary: 'Get submissions by school' })
  getBySchool(@Param('schoolId', ParseIntPipe) schoolId: number) {
    return this.subService.getBySchool(schoolId);
  }

  @Post()
  @UseGuards(RolesGuard)
  @Roles(UserRole.SCHOOL)
  @ApiOperation({ summary: 'Create a submission (school only)' })
  create(
    @Body() dto: CreateSubmissionDto,
    @Req() req: Request & { user: JwtPayload },
  ) {
    return this.subService.create({ ...dto, from_school_id: req.user.id });
  }
}
