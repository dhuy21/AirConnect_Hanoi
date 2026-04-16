import {
  Controller,
  Get,
  Post as HttpPost,
  Body,
  Param,
  UseGuards,
  Req,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { Request } from 'express';
import { PostService } from './post.service';
import { CreatePostDto } from './dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '../../common/enums';
import { JwtPayload } from '../../common/interfaces/jwt-payload.interface';

@ApiTags('posts')
@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  @ApiOperation({ summary: 'Get all posts' })
  getAll() {
    return this.postService.getAll();
  }

  @Get('school/:schoolId')
  @ApiOperation({ summary: 'Get posts by school' })
  getBySchool(@Param('schoolId', ParseIntPipe) schoolId: number) {
    return this.postService.getBySchool(schoolId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get post by ID' })
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.postService.getById(id);
  }

  @HttpPost()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SCHOOL)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a post (school only)' })
  create(
    @Body() dto: CreatePostDto,
    @Req() req: Request & { user: JwtPayload },
  ) {
    return this.postService.create({ ...dto, school_id: req.user.id });
  }
}
