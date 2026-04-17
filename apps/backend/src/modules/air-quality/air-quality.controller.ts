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
import { AirQualityService } from './air-quality.service';
import { CreateAirQualityDto } from './dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '../../common/enums';
import { JwtPayload } from '../../common/interfaces/jwt-payload.interface';
import { DEFAULT_QUERY_LIMIT } from '../../common/constants';

@ApiTags('air-quality')
@Controller('air-quality')
export class AirQualityController {
  constructor(private readonly aqService: AirQualityService) {}

  @Get()
  @ApiOperation({ summary: 'Get all air quality measurements' })
  getAll(@Query('limit') limit: number = DEFAULT_QUERY_LIMIT) {
    return this.aqService.getAll(+limit);
  }

  @Get('school/:schoolId')
  @ApiOperation({ summary: 'Get latest air quality for a school' })
  getBySchool(@Param('schoolId', ParseIntPipe) schoolId: number) {
    return this.aqService.getBySchool(schoolId);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SCHOOL, UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Create air quality measurement (school/admin only)',
  })
  create(
    @Body() dto: CreateAirQualityDto,
    @Req() req: Request & { user: JwtPayload },
  ) {
    return this.aqService.create({
      ...dto,
      school_id:
        req.user.role === UserRole.SCHOOL ? req.user.id : dto.school_id,
    });
  }
}
