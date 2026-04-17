import { Controller, Get, Query, ParseFloatPipe } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiQuery,
  ApiOkResponse,
} from '@nestjs/swagger';
import { SchoolService } from './school.service';
import { SchoolResponseDto } from './dto/school-response.dto';

@ApiTags('schools')
@Controller('schools')
export class SchoolController {
  constructor(private readonly schoolService: SchoolService) {}

  @Get()
  @ApiOperation({ summary: 'Get all schools' })
  @ApiOkResponse({ type: [SchoolResponseDto] })
  getAllSchools(): Promise<SchoolResponseDto[]> {
    return this.schoolService.getAllSchools();
  }

  @Get('nearby')
  @ApiOperation({ summary: 'Find nearby schools using PostGIS' })
  @ApiQuery({ name: 'latitude', type: Number })
  @ApiQuery({ name: 'longitude', type: Number })
  @ApiQuery({ name: 'radius', type: Number, required: false })
  @ApiOkResponse({ type: [SchoolResponseDto] })
  getNearbySchools(
    @Query('latitude', ParseFloatPipe) latitude: number,
    @Query('longitude', ParseFloatPipe) longitude: number,
    @Query('radius') radius: number = 2000,
  ): Promise<SchoolResponseDto[]> {
    return this.schoolService.getNearbySchools(latitude, longitude, +radius);
  }
}
