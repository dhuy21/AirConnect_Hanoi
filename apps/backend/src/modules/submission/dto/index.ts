import { IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { SubmissionType } from '../../../common/enums';

export class CreateSubmissionDto {
  @IsEnum(SubmissionType)
  type: SubmissionType;

  @IsString()
  @IsNotEmpty()
  content: string;
}
