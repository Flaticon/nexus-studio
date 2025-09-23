import { IsNotEmpty, IsString, IsOptional, IsEnum, IsArray, IsBoolean } from 'class-validator';

export class CreateChatSessionDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];
}

export class SendMessageDto {
  @IsNotEmpty()
  @IsString()
  message: string;

  @IsOptional()
  @IsEnum(['openai', 'anthropic'])
  provider?: 'openai' | 'anthropic';
}

export class UpdateChatSessionDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsBoolean()
  isArchived?: boolean;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];
}