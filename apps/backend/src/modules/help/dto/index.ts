import {
  IsNumber,
  IsString,
  IsNotEmpty,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { HelpType, HelpStatus } from '../../../common/enums';

export class CreateHelpDto {
  @ApiProperty() @IsNumber() from_school_id: number;
  @ApiProperty() @IsNumber() to_school_id: number;
  @ApiProperty({ enum: HelpType }) @IsEnum(HelpType) type: HelpType;
  @ApiProperty() @IsString() @IsNotEmpty() content: string;
  @ApiProperty({ enum: HelpStatus, required: false })
  @IsOptional()
  @IsEnum(HelpStatus)
  status?: HelpStatus;
}

export class UpdateHelpStatusDto {
  @ApiProperty({ enum: HelpStatus }) @IsEnum(HelpStatus) status: HelpStatus;
}
