// apps/api/src/modules/portfolio/dto/portfolio-filter.dto.ts
import { IsOptional, IsEnum, IsArray, IsString, IsDateString, IsMongoId } from 'class-validator';
import { StartupStage, StartupStatus } from '../schemas/startup.schema';

export class PortfolioFilterDto {
  @IsOptional()
  @IsEnum(StartupStage)
  stage?: StartupStage;

  @IsOptional()
  @IsEnum(StartupStatus)
  status?: StartupStatus;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @IsOptional()
  @IsString()
  industry?: string;

  @IsOptional()
  @IsMongoId()
  squadLead?: string;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;

  @IsOptional()
  @IsString()
  sortBy?: string;

  @IsOptional()
  @IsEnum(['asc', 'desc'])
  sortOrder?: 'asc' | 'desc';

  @IsOptional()
  page?: number;

  @IsOptional()
  limit?: number;
}