import {
  IsEmail,
  IsString,
  IsNotEmpty,
  IsNumber,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

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
  @ApiProperty() @IsNumber() school_id: number;
}
