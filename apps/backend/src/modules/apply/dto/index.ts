import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateApplyDto {
  @ApiProperty() @IsNumber() solution_id: number;
  @ApiProperty() @IsNumber() air_quality_id: number;
}
