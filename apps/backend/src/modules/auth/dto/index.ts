import { IsEmail, IsString, IsNotEmpty, IsNumber, IsEnum, IsDateString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Sex } from '../../../common/enums';

export class LoginStudentDto {
  @ApiProperty() @IsEmail() email: string;
  @ApiProperty() @IsString() @IsNotEmpty() password: string;
}

export class LoginAdminDto {
  @ApiProperty() @IsString() @IsNotEmpty() username: string;
  @ApiProperty() @IsString() @IsNotEmpty() password: string;
}

export class LoginSchoolDto {
  @ApiProperty() @IsEmail() email: string;
  @ApiProperty() @IsString() @IsNotEmpty() password: string;
}

export class RegisterStudentDto {
  @ApiProperty() @IsString() @IsNotEmpty() first_name: string;
  @ApiProperty() @IsString() @IsNotEmpty() last_name: string;
  @ApiProperty() @IsEmail() email: string;
  @ApiProperty() @IsString() @MinLength(8) password: string;
  @ApiProperty() @IsString() @IsNotEmpty() phone: string;
  @ApiProperty() @IsDateString() birth_date: string;
  @ApiProperty({ enum: Sex }) @IsEnum(Sex) sex: Sex;
  @ApiProperty() @IsString() @IsNotEmpty() health_status: string;
  @ApiProperty() @IsNumber() school_id: number;
}
