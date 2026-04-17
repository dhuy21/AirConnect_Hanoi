import { IsString, IsNotEmpty, IsEnum, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { SolutionType, SolutionStatus } from '../../../common/enums';

export class CreateSolutionDto {
  @ApiProperty({ enum: SolutionType }) @IsEnum(SolutionType) type: SolutionType;
  @ApiProperty() @IsString() @IsNotEmpty() content: string;
  @ApiProperty({ required: false }) @IsOptional() @IsString() note?: string;
  @ApiProperty({ enum: SolutionStatus })
  @IsEnum(SolutionStatus)
  status: SolutionStatus;
}

export class UpdateSolutionDto {
  @ApiProperty({ required: false }) @IsOptional() @IsString() content?: string;
  @ApiProperty({ required: false }) @IsOptional() @IsString() note?: string;
  @ApiProperty({ enum: SolutionStatus, required: false })
  @IsOptional()
  @IsEnum(SolutionStatus)
  status?: SolutionStatus;
}
