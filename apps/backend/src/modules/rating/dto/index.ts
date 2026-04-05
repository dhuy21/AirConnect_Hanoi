import { IsNumber, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { RateStar } from '../../../common/enums';

export class CreateRatingDto {
  @ApiProperty() @IsNumber() post_id: number;
  @ApiProperty() @IsNumber() student_id: number;
  @ApiProperty({ enum: RateStar }) @IsEnum(RateStar) rate: RateStar;
}
