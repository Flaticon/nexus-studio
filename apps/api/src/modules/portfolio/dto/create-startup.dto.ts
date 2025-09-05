// apps/api/src/modules/portfolio/dto/create-startup.dto.ts
import { 
  IsString, 
  IsEnum, 
  IsArray, 
  IsOptional, 
  ValidateNested, 
  IsMongoId,
  IsUrl,
  IsDateString
} from 'class-validator';
import { Type } from 'class-transformer';
import { StartupStage, StartupStatus } from '../schemas/startup.schema';

class ResourcesDto {
  @IsOptional()
  @IsUrl()
  deck?: string;

  @IsOptional()
  @IsUrl()
  demo?: string;

  @IsOptional()
  @IsUrl()
  repository?: string;

  @IsOptional()
  @IsUrl()
  documentation?: string;
}

class KeyDatesDto {
  @IsOptional()
  @IsDateString()
  foundedDate?: string;

  @IsOptional()
  @IsDateString()
  incorporationDate?: string;

  @IsOptional()
  @IsDateString()
  firstRevenue?: string;

  @IsOptional()
  @IsDateString()
  breakEven?: string;
}

export class CreateStartupDto {
  @IsString()
  name: string;

  @IsString()
  slug: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsUrl()
  logo?: string;

  @IsOptional()
  @IsUrl()
  website?: string;

  @IsOptional()
  @IsString()
  industry?: string;

  @IsEnum(StartupStage)
  stage: StartupStage;

  @IsOptional()
  @IsEnum(StartupStatus)
  status?: StartupStatus;

  @IsMongoId()
  squadLead: string;

  @IsArray()
  @IsMongoId({ each: true })
  squadMembers: string[];

  @IsOptional()
  @ValidateNested()
  @Type(() => ResourcesDto)
  resources?: ResourcesDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => KeyDatesDto)
  keyDates?: KeyDatesDto;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];
}