import { IsNotEmpty, IsString, IsArray, IsObject, IsOptional, IsDateString } from 'class-validator';

export class TrainModelDto {
  @IsNotEmpty()
  @IsString()
  modelName: string;

  @IsNotEmpty()
  @IsString()
  targetMetric: string;

  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  features: string[];

  @IsNotEmpty()
  @IsObject()
  modelConfig: {
    algorithm: string;
    hyperparameters: Record<string, any>;
  };

  @IsOptional()
  @IsDateString()
  trainingStartDate?: string;

  @IsOptional()
  @IsDateString()
  trainingEndDate?: string;

  @IsOptional()
  @IsObject()
  filters?: {
    sources?: string[];
    entityIds?: string[];
    tags?: string[];
    dimensions?: Record<string, string>;
  };

  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>;
}