import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiOkResponse,
} from '@nestjs/swagger';
import { AirQualityService } from './air-quality.service';
import { CreateAirQualityDto } from './dto';
import { AirQuality } from '../../entities/air-quality.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '../../common/enums';
import { DEFAULT_QUERY_LIMIT, clampLimit } from '../../common/constants';

@ApiTags('air-quality')
@Controller('air-quality')
export class AirQualityController {
  constructor(private readonly aqService: AirQualityService) {}

  @Get()
  @ApiOperation({ summary: 'Get all air quality measurements' })
  @ApiOkResponse({ type: [AirQuality] })
  getAll(@Query('limit') limit: number = DEFAULT_QUERY_LIMIT) {
    return this.aqService.getAll(clampLimit(limit));
  }

  @Get('school/:schoolId')
  @ApiOperation({ summary: 'Get latest air quality for a school' })
  @ApiOkResponse({ type: AirQuality })
  getBySchool(@Param('schoolId', ParseIntPipe) schoolId: number) {
    return this.aqService.getBySchool(schoolId);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create air quality measurement (admin only)' })
  @ApiOkResponse({ type: AirQuality })
  create(@Body() dto: CreateAirQualityDto) {
    return this.aqService.create(dto);
  }
}
