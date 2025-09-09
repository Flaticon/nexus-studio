import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type EmployeeDocument = Employee & Document;

export enum EmployeeRole {
  ADMIN = 'admin',
  HR = 'hr',
  MANAGER = 'manager',
  EMPLOYEE = 'employee',
  CONTRACTOR = 'contractor'
}

export enum EmployeeStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  ON_LEAVE = 'on_leave',
  TERMINATED = 'terminated'
}

export enum DepartmentType {
  ENGINEERING = 'engineering',
  DESIGN = 'design',
  PRODUCT = 'product',
  MARKETING = 'marketing',
  SALES = 'sales',
  HR = 'hr',
  FINANCE = 'finance',
  OPERATIONS = 'operations'
}

@Schema({ timestamps: true })
export class Employee {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  employeeId: string;

  @Prop({ type: String, enum: EmployeeRole, default: EmployeeRole.EMPLOYEE })
  role: EmployeeRole;

  @Prop({ type: String, enum: EmployeeStatus, default: EmployeeStatus.ACTIVE })
  status: EmployeeStatus;

  @Prop({ type: String, enum: DepartmentType })
  department: DepartmentType;

  @Prop()
  position: string;

  @Prop()
  phoneNumber: string;

  @Prop({ type: Object })
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
  };

  @Prop({ type: Object })
  emergencyContact?: {
    name?: string;
    relationship?: string;
    phoneNumber?: string;
    email?: string;
  };

  @Prop()
  startDate: Date;

  @Prop()
  endDate?: Date;

  @Prop({ type: Types.ObjectId, ref: 'Employee' })
  managerId: Types.ObjectId;

  @Prop({ type: [Types.ObjectId], ref: 'Employee' })
  directReports: Types.ObjectId[];

  @Prop({ type: Object })
  salary?: {
    amount?: number;
    currency?: string;
    paymentFrequency?: 'hourly' | 'monthly' | 'yearly';
  };

  @Prop({ type: Object })
  benefits?: {
    healthInsurance?: boolean;
    dentalInsurance?: boolean;
    visionInsurance?: boolean;
    retirement401k?: boolean;
    paidTimeOff?: number; // days per year
    sickLeave?: number; // days per year
  };

  @Prop({ type: [String] })
  skills?: string[];

  @Prop({ type: [Object] })
  certifications?: {
    name?: string;
    issuer?: string;
    issueDate?: Date;
    expirationDate?: Date;
  }[];

  @Prop()
  profilePicture?: string;

  @Prop()
  bio?: string;

  @Prop({ default: false })
  onboardingCompleted: boolean;

  @Prop({ type: Types.ObjectId, ref: 'OnboardingProgress' })
  onboardingProgressId?: Types.ObjectId;

  @Prop({ default: true })
  isActive: boolean;

  @Prop()
  lastLoginAt?: Date;

  @Prop({ type: Object })
  personalInfo?: {
    dateOfBirth?: Date;
    nationality?: string;
    maritalStatus?: 'single' | 'married' | 'divorced' | 'widowed';
    numberOfDependents?: number;
  };

  @Prop({ type: Object })
  workPreferences?: {
    workLocation?: 'office' | 'remote' | 'hybrid';
    preferredCommunication?: 'email' | 'slack' | 'phone' | 'in_person';
    workingHours?: {
      start?: string; // "09:00"
      end?: string; // "17:00"
      timezone?: string;
    };
  };
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);

// Indexes for better query performance
EmployeeSchema.index({ email: 1 });
EmployeeSchema.index({ employeeId: 1 });
EmployeeSchema.index({ department: 1 });
EmployeeSchema.index({ managerId: 1 });
EmployeeSchema.index({ status: 1 });
EmployeeSchema.index({ role: 1 });