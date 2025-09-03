// apps/api/src/modules/dashboard/dto/dashboard-filter.dto.ts
import { IsOptional, IsDateString, IsArray, IsEnum } from 'class-validator';

export class DashboardFilterDto {
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;

  @IsOptional()
  @IsArray()
  startupIds?: string[];

  @IsOptional()
  @IsEnum(['day', 'week', 'month', 'quarter', 'year'])
  period?: string;
}