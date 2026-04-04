import { Controller, Get, Post, Patch, Body, Param, UseGuards, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { SolutionService } from './solution.service';
import { CreateSolutionDto, UpdateSolutionDto } from './dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '../../common/enums';

@ApiTags('solutions')
@Controller('solutions')
export class SolutionController {
  constructor(private readonly solService: SolutionService) {}

  @Get()
  @ApiOperation({ summary: 'Get all solutions' })
  getAll() {
    return this.solService.getAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get solution by ID' })
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.solService.getById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a solution (admin only)' })
  create(@Body() dto: CreateSolutionDto) {
    return this.solService.create(dto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a solution (admin only)' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateSolutionDto) {
    return this.solService.update(id, dto);
  }
}
