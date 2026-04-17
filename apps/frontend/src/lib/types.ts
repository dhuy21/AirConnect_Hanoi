// Re-exports for call sites that still use a friendly local name.
// Every API shape itself lives in @airconnect/shared-types (generated from
// the backend OpenAPI contract).
import type {
  AuthResponseDto,
  SchoolResponseDto,
} from '@airconnect/shared-types/api';

export type School = SchoolResponseDto;
export type AuthResponse = AuthResponseDto;
