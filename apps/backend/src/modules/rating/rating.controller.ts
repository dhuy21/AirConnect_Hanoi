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
import { RatingService } from './rating.service';
import { CreateRatingDto } from './dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '../../common/enums';

@ApiTags('ratings')
@Controller('ratings')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @Get('post/:postId')
  @ApiOperation({ summary: 'Get ratings for a post' })
  getByPost(@Param('postId', ParseIntPipe) postId: number) {
    return this.ratingService.getByPost(postId);
  }

  @Get('post/:postId/average')
  @ApiOperation({ summary: 'Get average rating for a post' })
  getAverageRating(@Param('postId', ParseIntPipe) postId: number) {
    return this.ratingService.getAverageRating(postId);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.STUDENT)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Rate a post (student only)' })
  rate(@Body() dto: CreateRatingDto) {
    return this.ratingService.upsert(dto);
  }
}
