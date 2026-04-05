import { UserRole } from '../enums';

export interface JwtPayload {
  id: number;
  role: UserRole;
  email?: string;
  username?: string;
}
