import { IsOptional, IsString, IsEnum, IsBoolean } from 'class-validator';

export class GenerateInsightsDto {
  @IsOptional()
  @IsString()
  startupId?: string;

  @IsOptional()
  @IsEnum(['openai', 'anthropic', 'both'])
  provider?: 'openai' | 'anthropic' | 'both';
}

export class GetInsightsDto {
  @IsOptional()
  @IsEnum(['opportunity', 'risk', 'trend', 'prediction'])
  type?: 'opportunity' | 'risk' | 'trend' | 'prediction';

  @IsOptional()
  @IsEnum(['low', 'medium', 'high', 'critical'])
  priority?: 'low' | 'medium' | 'high' | 'critical';

  @IsOptional()
  @IsString()
  startupId?: string;

  @IsOptional()
  @IsBoolean()
  isRead?: boolean;

  @IsOptional()
  @IsString()
  page?: string;

  @IsOptional()
  @IsString()
  limit?: string;
}

export class AnalyzeStartupDto {
  @IsOptional()
  @IsEnum(['openai', 'anthropic', 'both'])
  provider?: 'openai' | 'anthropic' | 'both';
}