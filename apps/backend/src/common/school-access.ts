import { ForbiddenException } from '@nestjs/common';
import { UserRole } from './enums';
import { JwtPayload } from './interfaces/jwt-payload.interface';

/** Allow administrators, or the school account whose id is `schoolId`. */
export function assertSchoolAccess(user: JwtPayload, schoolId: number): void {
  if (user.role === UserRole.ADMIN) return;
  if (user.role === UserRole.SCHOOL && user.id === schoolId) return;
  throw new ForbiddenException('Not allowed for this school');
}
