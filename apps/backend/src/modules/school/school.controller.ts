import { Controller, Get, Query, ParseFloatPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { SchoolService } from './school.service';

@ApiTags('schools')
@Controller('schools')
export class SchoolController {
  constructor(private readonly schoolService: SchoolService) {}

  @Get()
  @ApiOperation({ summary: 'Get all schools' })
  getAllSchools() {
    return this.schoolService.getAllSchools();
  }

  @Get('nearby')
  @ApiOperation({ summary: 'Find nearby schools using PostGIS' })
  @ApiQuery({ name: 'latitude', type: Number })
  @ApiQuery({ name: 'longitude', type: Number })
  @ApiQuery({ name: 'radius', type: Number, required: false })
  getNearbySchools(
    @Query('latitude', ParseFloatPipe) latitude: number,
    @Query('longitude', ParseFloatPipe) longitude: number,
    @Query('radius') radius: number = 2000,
  ) {
    return this.schoolService.getNearbySchools(latitude, longitude, +radius);
  }
}
