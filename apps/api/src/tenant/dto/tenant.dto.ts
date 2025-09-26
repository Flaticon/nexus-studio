import { IsString, IsEmail, IsEnum, IsOptional, IsObject, IsBoolean } from 'class-validator';

export class CreateTenantDto {
  @IsString()
  subdomain: string;

  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsEnum(['starter', 'professional', 'enterprise'])
  plan: 'starter' | 'professional' | 'enterprise';

  @IsOptional()
  @IsObject()
  settings?: {
    logo?: string;
    primaryColor?: string;
    companyName?: string;
    website?: string;
    industry?: string;
  };
}

export class UpdateTenantDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsEnum(['starter', 'professional', 'enterprise'])
  plan?: 'starter' | 'professional' | 'enterprise';

  @IsOptional()
  @IsEnum(['active', 'inactive', 'trial', 'suspended'])
  status?: 'active' | 'inactive' | 'trial' | 'suspended';

  @IsOptional()
  @IsObject()
  settings?: {
    logo?: string;
    primaryColor?: string;
    companyName?: string;
    website?: string;
    industry?: string;
  };

  @IsOptional()
  @IsObject()
  billing?: {
    stripeCustomerId?: string;
    stripeSubscriptionId?: string;
    currentPeriodStart?: Date;
    currentPeriodEnd?: Date;
    cancelAtPeriodEnd?: boolean;
  };
}

export class CheckSubdomainDto {
  @IsString()
  subdomain: string;
}