import { Controller, Get, Post, Patch, Body, Param, UseGuards, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { HelpService } from './help.service';
import { CreateHelpDto, UpdateHelpStatusDto } from './dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '../../common/enums';

@ApiTags('helps')
@Controller('helps')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class HelpController {
  constructor(private readonly helpService: HelpService) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles(UserRole.SCHOOL)
  @ApiOperation({ summary: 'Create a help request between schools' })
  create(@Body() dto: CreateHelpDto) {
    return this.helpService.create(dto);
  }

  @Get('school/:schoolId')
  @ApiOperation({ summary: 'Get help requests for a school' })
  getBySchool(@Param('schoolId', ParseIntPipe) schoolId: number) {
    return this.helpService.getBySchool(schoolId);
  }

  @Patch(':fromId/:toId/status')
  @ApiOperation({ summary: 'Update help request status' })
  updateStatus(
    @Param('fromId', ParseIntPipe) fromId: number,
    @Param('toId', ParseIntPipe) toId: number,
    @Body() dto: UpdateHelpStatusDto,
  ) {
    return this.helpService.updateStatus(fromId, toId, dto);
  }
}
