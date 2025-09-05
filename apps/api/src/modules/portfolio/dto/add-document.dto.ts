// apps/api/src/modules/portfolio/dto/add-document.dto.ts
import { IsString, IsEnum, IsOptional, IsNumber } from 'class-validator';
import { DocumentType } from '../schemas/startup.schema';

export class AddDocumentDto {
  @IsString()
  name: string;

  @IsString()
  url: string;

  @IsEnum(DocumentType)
  type: DocumentType;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  size?: number;

  @IsOptional()
  @IsString()
  mimeType?: string;
}