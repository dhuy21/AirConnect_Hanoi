import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ApplyService } from './apply.service';
import { CreateApplyDto } from './dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('applies')
@Controller('applies')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ApplyController {
  constructor(private readonly applyService: ApplyService) {}

  @Post()
  @ApiOperation({ summary: 'Apply a solution to an air quality record' })
  create(@Body() dto: CreateApplyDto) {
    return this.applyService.create(dto);
  }

  @Get('solution/:solutionId')
  @ApiOperation({ summary: 'Get applies for a solution' })
  getBySolution(@Param('solutionId', ParseIntPipe) solutionId: number) {
    return this.applyService.getBySolution(solutionId);
  }

  @Get('air-quality/:aqId')
  @ApiOperation({ summary: 'Get applies for an air quality record' })
  getByAirQuality(@Param('aqId', ParseIntPipe) aqId: number) {
    return this.applyService.getByAirQuality(aqId);
  }
}
