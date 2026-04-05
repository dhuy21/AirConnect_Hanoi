import { Controller, Get, Post, Body, Param, UseGuards, Req, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { Request } from 'express';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '../../common/enums';
import { JwtPayload } from '../../common/interfaces/jwt-payload.interface';

@ApiTags('reviews')
@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get('submission/:submissionId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get reviews for a submission' })
  getBySubmission(@Param('submissionId', ParseIntPipe) submissionId: number) {
    return this.reviewService.getBySubmission(submissionId);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a review (admin only)' })
  create(@Body() dto: CreateReviewDto, @Req() req: Request & { user: JwtPayload }) {
    return this.reviewService.create({
      ...dto,
      admin_id: req.user.id,
      date: dto.date ? new Date(dto.date) : undefined,
    });
  }
}
