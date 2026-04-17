import { IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAirQualityDto {
  @ApiProperty()
  @IsNumber()
  aqi: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  pm25?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  pm10?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  co2?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  temp?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  humidity?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  wind_speed?: number;

  @ApiProperty()
  @IsNumber()
  school_id: number;
}
