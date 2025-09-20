import { IsNotEmpty, IsString, IsObject, IsArray, IsBoolean, IsOptional } from 'class-validator';

export class CreateAlertDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  metricName: string;

  @IsNotEmpty()
  @IsObject()
  condition: {
    operator: 'greater_than' | 'less_than' | 'equals' | 'not_equals' | 'percentage_change';
    threshold: number;
    timeWindow?: string;
  };

  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  notificationChannels: string[];

  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  recipients: string[];

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsObject()
  filters?: {
    source?: string;
    entityId?: string;
    tags?: string[];
    dimensions?: Record<string, string>;
  };

  @IsOptional()
  @IsObject()
  metadata?: {
    description?: string;
    severity?: 'low' | 'medium' | 'high' | 'critical';
    category?: string;
  };
}