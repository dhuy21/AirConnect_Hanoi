import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  UseGuards,
  ParseIntPipe,
  Req,
  ForbiddenException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { Request } from 'express';
import { HelpService } from './help.service';
import { CreateHelpDto, UpdateHelpStatusDto } from './dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '../../common/enums';
import { JwtPayload } from '../../common/interfaces/jwt-payload.interface';
import { assertSchoolAccess } from '../../common/school-access';

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
  create(
    @Body() dto: CreateHelpDto,
    @Req() req: Request & { user: JwtPayload },
  ) {
    return this.helpService.create({ ...dto, from_school_id: req.user.id });
  }

  @Get('school/:schoolId')
  @ApiOperation({ summary: 'Get help requests for a school' })
  getBySchool(
    @Param('schoolId', ParseIntPipe) schoolId: number,
    @Req() req: Request & { user: JwtPayload },
  ) {
    assertSchoolAccess(req.user, schoolId);
    return this.helpService.getBySchool(schoolId);
  }

  @Patch(':fromId/:toId/status')
  @UseGuards(RolesGuard)
  @Roles(UserRole.SCHOOL)
  @ApiOperation({
    summary: 'Answer a help request (receiving school only)',
  })
  updateStatus(
    @Param('fromId', ParseIntPipe) fromId: number,
    @Param('toId', ParseIntPipe) toId: number,
    @Body() dto: UpdateHelpStatusDto,
    @Req() req: Request & { user: JwtPayload },
  ) {
    if (req.user.id !== toId) {
      throw new ForbiddenException(
        'Only the receiving school can answer this request',
      );
    }
    return this.helpService.updateStatus(fromId, toId, dto);
  }
}
