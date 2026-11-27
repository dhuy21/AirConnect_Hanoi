import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  ParseIntPipe,
  ForbiddenException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiOkResponse,
  ApiForbiddenResponse,
} from '@nestjs/swagger';
import { FeedbackService } from './feedback.service';
import { CreateFeedbackDto } from './dto';
import { Feedback } from '../../entities/feedback.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '../../common/enums';
import { DEFAULT_QUERY_LIMIT } from '../../common/constants';

@ApiTags('feedback')
@Controller('feedback')
export class FeedbackController {
  constructor(
    private readonly fbService: FeedbackService,
    private readonly configService: ConfigService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Send a contact message' })
  @ApiOkResponse({ type: Feedback })
  @ApiForbiddenResponse({ description: 'The contact form is disabled' })
  create(@Body() dto: CreateFeedbackDto) {
    if (!this.configService.get<boolean>('CONTACT_FORM_ENABLED', false)) {
      throw new ForbiddenException(
        'Demonstrator — forms are limited to test accounts',
      );
    }
    return this.fbService.create(dto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all feedbacks (admin only)' })
  @ApiOkResponse({ type: [Feedback] })
  getAll(
    @Query('skip') skip: number = 0,
    @Query('limit') limit: number = DEFAULT_QUERY_LIMIT,
  ) {
    return this.fbService.getAll(+skip, +limit);
  }

  @Get('unread')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get unread feedbacks (admin only)' })
  @ApiOkResponse({ type: [Feedback] })
  getUnread() {
    return this.fbService.getUnread();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get feedback by ID (admin only)' })
  @ApiOkResponse({ type: Feedback })
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.fbService.getById(id);
  }

  @Patch(':id/read')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Mark feedback as read (admin only)' })
  @ApiOkResponse({ type: Feedback })
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
