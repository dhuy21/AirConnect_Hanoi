import { ApiProperty } from '@nestjs/swagger';
import { SchoolType } from '../../../common/enums';

export class SchoolResponseDto {
  @ApiProperty() id: number;
  @ApiProperty({ enum: SchoolType }) type: SchoolType;
  @ApiProperty() name: string;
  @ApiProperty() address: string;
  @ApiProperty({ required: false }) district: string | null;
  @ApiProperty() latitude: number;
  @ApiProperty() longitude: number;
  @ApiProperty({ required: false }) situation: string | null;
  @ApiProperty({ required: false }) email: string | null;
  @ApiProperty({ required: false }) phone: string | null;
  @ApiProperty() score_1: number;
  @ApiProperty() score_2: number;
  @ApiProperty() score_3: number;
  @ApiProperty() score_4: number;
  @ApiProperty() score_5: number;
  @ApiProperty() created_at: Date;
}
