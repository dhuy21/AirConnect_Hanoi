import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { FeedbackService } from './feedback.service';
import { CreateFeedbackDto } from './dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '../../common/enums';
import { DEFAULT_QUERY_LIMIT } from '../../common/constants';

@ApiTags('feedback')
@Controller('feedback')
export class FeedbackController {
  constructor(private readonly fbService: FeedbackService) {}

  @Post()
  @ApiOperation({ summary: 'Create feedback (public)' })
  create(@Body() dto: CreateFeedbackDto) {
    return this.fbService.create(dto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all feedbacks (admin only)' })
  getAll(@Query('skip') skip: number = 0, @Query('limit') limit: number = DEFAULT_QUERY_LIMIT) {
    return this.fbService.getAll(+skip, +limit);
  }

  @Get('unread')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get unread feedbacks (admin only)' })
  getUnread() {
    return this.fbService.getUnread();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get feedback by ID (admin only)' })
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.fbService.getById(id);
  }

  @Patch(':id/read')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Mark feedback as read (admin only)' })
  markAsRead(@Param('id', ParseIntPipe) id: number) {
    return this.fbService.markAsRead(id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete feedback (admin only)' })
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.fbService.delete(id);
  }
}
