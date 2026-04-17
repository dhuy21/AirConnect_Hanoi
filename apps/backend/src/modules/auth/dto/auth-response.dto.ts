import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../../../common/enums';

export class AuthResponseDto {
  @ApiProperty() access_token: string;
  @ApiProperty() token_type: string;
  @ApiProperty() user_id: number;
  @ApiProperty({ enum: UserRole }) role: UserRole;
  @ApiProperty({ required: false }) email?: string;
  @ApiProperty({ required: false }) username?: string;
  @ApiProperty({ required: false }) name?: string;
  @ApiProperty({ required: false }) school_id?: number;
}
