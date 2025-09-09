import { IsEmail, IsString, IsEnum, IsOptional, IsDateString, IsNumber, IsBoolean, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { EmployeeRole, DepartmentType } from '../schemas/employee.schema';

class AddressDto {
  @IsString()
  street: string;

  @IsString()
  city: string;

  @IsString()
  state: string;

  @IsString()
  zipCode: string;

  @IsString()
  country: string;
}

class EmergencyContactDto {
  @IsString()
  name: string;

  @IsString()
  relationship: string;

  @IsString()
  phoneNumber: string;

  @IsEmail()
  email: string;
}

class SalaryDto {
  @IsNumber()
  amount: number;

  @IsString()
  currency: string;

  @IsEnum(['hourly', 'monthly', 'yearly'])
  paymentFrequency: 'hourly' | 'monthly' | 'yearly';
}

class BenefitsDto {
  @IsBoolean()
  healthInsurance: boolean;

  @IsBoolean()
  dentalInsurance: boolean;

  @IsBoolean()
  visionInsurance: boolean;

  @IsBoolean()
  retirement401k: boolean;

  @IsNumber()
  paidTimeOff: number;

  @IsNumber()
  sickLeave: number;
}

class PersonalInfoDto {
  @IsOptional()
  @IsDateString()
  dateOfBirth?: Date;

  @IsOptional()
  @IsString()
  nationality?: string;

  @IsOptional()
  @IsEnum(['single', 'married', 'divorced', 'widowed'])
  maritalStatus?: 'single' | 'married' | 'divorced' | 'widowed';

  @IsOptional()
  @IsNumber()
  numberOfDependents?: number;
}

class WorkPreferencesDto {
  @IsOptional()
  @IsEnum(['office', 'remote', 'hybrid'])
  workLocation?: 'office' | 'remote' | 'hybrid';

  @IsOptional()
  @IsEnum(['email', 'slack', 'phone', 'in_person'])
  preferredCommunication?: 'email' | 'slack' | 'phone' | 'in_person';

  @IsOptional()
  @ValidateNested()
  @Type(() => Object)
  workingHours?: {
    start: string;
    end: string;
    timezone: string;
  };
}

export class CreateEmployeeDto {
  @IsEmail()
  email: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  employeeId: string;

  @IsEnum(EmployeeRole)
  role: EmployeeRole;

  @IsEnum(DepartmentType)
  department: DepartmentType;

  @IsString()
  position: string;

  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => AddressDto)
  address?: AddressDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => EmergencyContactDto)
  emergencyContact?: EmergencyContactDto;

  @IsDateString()
  startDate: Date;

  @IsOptional()
  @IsDateString()
  endDate?: Date;

  @IsOptional()
  @IsString()
  managerId?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => SalaryDto)
  salary?: SalaryDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => BenefitsDto)
  benefits?: BenefitsDto;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  skills?: string[];

  @IsOptional()
  @IsString()
  profilePicture?: string;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => PersonalInfoDto)
  personalInfo?: PersonalInfoDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => WorkPreferencesDto)
  workPreferences?: WorkPreferencesDto;
}