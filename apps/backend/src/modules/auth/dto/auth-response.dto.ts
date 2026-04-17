import { UserRole } from '../../../common/enums';

export class AuthResponseDto {
  access_token: string;
  token_type: string;
  user_id: number;
  role: UserRole;
  email?: string;
  username?: string;
  name?: string;
  school_id?: number;
}
