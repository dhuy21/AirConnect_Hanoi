import { IsString, IsNumber, IsEnum, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ReviewDecision } from '../../../common/enums';

export class CreateReviewDto {
  @ApiProperty({ enum: ReviewDecision })
  @IsEnum(ReviewDecision)
  decision: ReviewDecision;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  note?: string;

  @ApiProperty()
  @IsNumber()
  submission_id: number;
}
