// apps/api/src/modules/portfolio/dto/create-startup.dto.ts
import { IsString, IsEnum, IsArray, IsOptional, ValidateNested, IsMongoId } from 'class-validator';
import { Type } from 'class-transformer';

enum StartupStage {
  IDEA = 'idea',
  VALIDATION = 'validation',
  PMF = 'pmf',
  GROWTH = 'growth',
  SCALE = 'scale'
}

class ResourcesDto {
  @IsOptional()
  @IsString()
  deck?: string;

  @IsOptional()
  @IsString()
  demo?: string;

  @IsOptional()
  @IsString()
  repository?: string;
}

export class CreateStartupDto {
  @IsString()
  name: string;

  @IsString()
  slug: string;

  @IsEnum(StartupStage)
  stage: StartupStage;

  @IsMongoId()
  squadLead: string;

  @IsArray()
  @IsMongoId({ each: true })
  squadMembers: string[];

  @IsOptional()
  @ValidateNested()
  @Type(() => ResourcesDto)
  resources?: ResourcesDto;
}