import { SchoolType } from '../../../common/enums';

export class SchoolResponseDto {
  id: number;
  type: SchoolType;
  name: string;
  address: string;
  district: string | null;
  latitude: number;
  longitude: number;
  situation: string | null;
  email: string | null;
  phone: string | null;
  score_1: number;
  score_2: number;
  score_3: number;
  score_4: number;
  score_5: number;
  created_at: Date;
}
