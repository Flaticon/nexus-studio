import { IsNotEmpty, IsString, IsNumber, IsOptional, IsDate, IsObject, IsArray } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateAnalyticsMetricDto {
  @IsNotEmpty()
  @IsString()
  metricName: string;

  @IsNotEmpty()
  @IsNumber()
  value: number;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  timestamp?: Date;

  @IsNotEmpty()
  @IsString()
  source: string;

  @IsOptional()
  @IsString()
  entityId?: string;

  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>;

  @IsOptional()
  @IsObject()
  dimensions?: {
    category?: string;
    region?: string;
    segment?: string;
    [key: string]: string | undefined;
  };

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];
}